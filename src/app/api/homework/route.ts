import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string };
    if (decoded.role !== 'TEACHER') return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });

    const { title, description, type, deadline, maxScore } = await req.json();
    if (!title) return NextResponse.json({ message: 'Vui lòng nhập tiêu đề' }, { status: 400 });

    const homework = await prisma.homework.create({
      data: {
        title,
        description: description || null,
        type: type || 'HOMEWORK',
        deadline: deadline ? new Date(deadline) : null,
        maxScore: parseInt(maxScore) || 100,
        teacherId: decoded.id,
      },
    });

    return NextResponse.json(homework, { status: 201 });
  } catch (error: any) {
    console.error('Homework create error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const homeworks = await prisma.homework.findMany({
    orderBy: { createdAt: 'desc' },
    include: { teacher: true, _count: { select: { submissions: true } } },
  });
  return NextResponse.json(homeworks);
}
