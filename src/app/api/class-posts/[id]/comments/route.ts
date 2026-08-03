import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: any }) {
  try {
    const { id: postId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string };
    const { content } = await req.json();

    if (!content) return NextResponse.json({ message: 'Thiếu nội dung' }, { status: 400 });

    const comment = await prisma.postComment.create({
      data: {
        content,
        postId,
        authorId: decoded.id
      },
      include: {
        author: { select: { id: true, fullName: true, avatar: true, role: true } }
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
