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

    const { title, classId, cards } = await req.json();

    if (!title || !classId || !cards || !Array.isArray(cards)) {
      return NextResponse.json({ message: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    const deck = await prisma.flashcardDeck.create({
      data: {
        title,
        classId,
        cards: {
          create: cards.map(c => ({
            front: c.front,
            back: c.back
          }))
        }
      }
    });

    return NextResponse.json(deck);
  } catch (error: any) {
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
