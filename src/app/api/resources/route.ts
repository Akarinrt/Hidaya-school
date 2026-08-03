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

    const { title, url, type, classId } = await req.json();

    if (!title || !url || !type || !classId) {
      return NextResponse.json({ message: 'Vui lòng nhập đủ thông tin' }, { status: 400 });
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        url,
        type,
        classId
      }
    });

    return NextResponse.json(resource);
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
