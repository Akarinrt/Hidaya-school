import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const classId = url.searchParams.get('classId');
    if (!classId) return NextResponse.json({ message: 'Thiếu classId' }, { status: 400 });

    const posts = await prisma.classPost.findMany({
      where: { classId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, fullName: true, avatar: true, role: true } },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            author: { select: { id: true, fullName: true, avatar: true, role: true } }
          }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ', error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    const { classId, content } = await req.json();

    if (!classId || !content) return NextResponse.json({ message: 'Thiếu dữ liệu' }, { status: 400 });

    const post = await prisma.classPost.create({
      data: {
        content,
        classId,
        authorId: decoded.id
      },
      include: {
        author: { select: { id: true, fullName: true, avatar: true, role: true } },
        comments: true
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ', error: error.message }, { status: 500 });
  }
}
