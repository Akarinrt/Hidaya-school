import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise<{ homeworkId: string }> }) {
  try {
    const { homeworkId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string };
    if (decoded.role !== 'STUDENT') return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });

    const hw = await prisma.homework.findUnique({ where: { id: homeworkId }, include: { teacher: true } });
    if (!hw) return NextResponse.json({ message: 'Không tìm thấy bài tập' }, { status: 404 });

    // Handle quiz auto-grading
    let finalScore = null;
    let finalStatus = 'PENDING';
    let finalContent = '';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      
      if (body.answers && hw.quizData) {
        let questions = [];
        try { questions = JSON.parse(hw.quizData); } catch (e) {}
        
        let correctCount = 0;
        questions.forEach((q: any) => {
          const studentAnswer = body.answers[q.id];
          if (!studentAnswer) return;

          if (q.type === 'multiple_choice') {
            if (studentAnswer === q.correctOptionId) {
              correctCount++;
            }
          } else if (q.type === 'text_input') {
            const cleanAns = String(studentAnswer).trim().toLowerCase();
            const hasMatch = q.correctAnswers && q.correctAnswers.some((ans: string) => String(ans).trim().toLowerCase() === cleanAns);
            if (hasMatch) {
              correctCount++;
            }
          }
        });

        finalScore = Math.round((correctCount / questions.length) * hw.maxScore);
        finalStatus = 'GRADED';
        finalContent = JSON.stringify(body.answers); // save selected options
      } else {
        finalContent = body.content || '';
      }
    } else {
      const formData = await req.formData();
      finalContent = formData.get('content') as string || '';
    }

    const existing = await prisma.submission.findFirst({
      where: { homeworkId: homeworkId, studentId: decoded.id }
    });
    if (existing) return NextResponse.json({ message: 'Bạn đã nộp bài này rồi' }, { status: 400 });

    const submission = await prisma.submission.create({
      data: { 
        content: finalContent, 
        homeworkId: homeworkId, 
        studentId: decoded.id,
        status: finalStatus,
        score: finalScore,
        gradedById: finalStatus === 'GRADED' ? hw.teacherId : null,
        gradedAt: finalStatus === 'GRADED' ? new Date() : null,
        feedback: finalStatus === 'GRADED' ? '🤖 Hệ thống tự động chấm điểm' : null
      },
    });

    // Notify teacher
    if (finalStatus === 'PENDING') {
      const student = await prisma.user.findUnique({ where: { id: decoded.id } });
      await prisma.notification.create({
        data: {
          title: `📨 Bài nộp mới từ ${student?.fullName}`,
          body: `${student?.fullName} vừa nộp bài: ${hw.title}`,
          type: 'HOMEWORK',
          link: `/teacher/grading?homeworkId=${hw.id}`,
          userId: hw.teacherId,
        }
      });
    }

    // Return appropriate response based on content type
    if (contentType.includes('application/json')) {
      return NextResponse.json({ success: true, message: 'Nộp bài thành công' }, { status: 200 });
    } else {
      // Use 303 See Other to ensure the browser makes a GET request to the redirect URL
      return NextResponse.redirect(new URL('/student/homework', req.url), 303);
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi', error: error.message }, { status: 500 });
  }
}
