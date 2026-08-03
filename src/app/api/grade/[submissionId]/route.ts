import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };
    if (decoded.role !== 'TEACHER') return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });

    const formData = await req.formData();
    const score = parseInt(formData.get('score') as string);
    const feedback = formData.get('feedback') as string;

    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        score,
        feedback,
        status: 'GRADED',
        gradedById: decoded.id,
        gradedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
