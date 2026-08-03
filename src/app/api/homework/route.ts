import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };
    if (decoded.role !== 'TEACHER') return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });

    const { title, description, type, deadline, maxScore, classId, quizData, isExam, timeLimit, audioUrl } = await req.json();
    if (!title) return NextResponse.json({ message: 'Vui lòng nhập tiêu đề' }, { status: 400 });

    const homework = await prisma.homework.create({
      data: {
        title,
        description: description || null,
        type: type || 'HOMEWORK',
        deadline: deadline ? new Date(deadline) : null,
        maxScore: parseInt(maxScore) || 100,
        teacherId: decoded.id,
        classId: classId || null,
        quizData: quizData || null,
        isExam: isExam === 'true' || isExam === true,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        audioUrl: audioUrl || null
      },
    });

    return NextResponse.json(homework, { status: 201 });
  } catch (error: any) {
    console.error('Homework create error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };

    let whereClause = {};
    if (decoded.role === 'TEACHER') {
      whereClause = { teacherId: decoded.id };
    } else if (decoded.role === 'STUDENT') {
      // Find classes student is enrolled in
      const enrollments = await prisma.classEnrollment.findMany({ where: { studentId: decoded.id } });
      const classIds = enrollments.map(e => e.classId);
      
      whereClause = {
        OR: [
          { classId: { in: classIds } },
          { classId: null } // Backward compatibility: if no class assigned, everyone sees it
        ]
      };
    }

    const homeworks = await prisma.homework.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: { teacher: true, class: true, _count: { select: { submissions: true } } },
    });
    return NextResponse.json(homeworks);
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
