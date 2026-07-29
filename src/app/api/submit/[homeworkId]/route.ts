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

    // Form data for file upload support
    const contentType = req.headers.get('content-type') || '';
    let content = '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      content = body.content;
    } else {
      const formData = await req.formData();
      content = formData.get('content') as string || '';
    }

    const existing = await prisma.submission.findFirst({
      where: { homeworkId: homeworkId, studentId: decoded.id }
    });
    if (existing) return NextResponse.json({ message: 'Bạn đã nộp bài này rồi' }, { status: 400 });

    const submission = await prisma.submission.create({
      data: { content, homeworkId: homeworkId, studentId: decoded.id },
    });

    // Notify teacher
    const hw = await prisma.homework.findUnique({ where: { id: homeworkId }, include: { teacher: true } });
    if (hw) {
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

    // Redirect back to homework page
    return NextResponse.redirect(new URL('/student/homework', req.url));
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi', error: error.message }, { status: 500 });
  }
}
