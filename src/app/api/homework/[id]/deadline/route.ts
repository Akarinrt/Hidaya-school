import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try { return (jwt.verify(token, getJwtSecret()) as { id: string, role: string }); }
  catch { return null; }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserId();
    if (!user || user.role !== 'TEACHER') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    
    const resolvedParams = await params;
    const { deadline } = await request.json();

    const hw = await prisma.homework.update({
      where: { id: resolvedParams.id },
      data: { deadline: deadline ? new Date(deadline) : null }
    });

    return NextResponse.json({ message: 'Cập nhật thành công', homework: hw });
  } catch (error: any) {
    console.error('Lỗi cập nhật hạn nộp:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
