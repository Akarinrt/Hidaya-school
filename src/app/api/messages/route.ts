import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function getDecoded(req?: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try { return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string }; }
  catch { return null; }
}

export async function GET() {
  const decoded = await getDecoded();
  if (!decoded) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

  // Find conversation partner (teacher if student, all students if teacher)
  let messages;
  if (decoded.role === 'STUDENT') {
    const teacher = await prisma.user.findFirst({ where: { role: 'TEACHER' } });
    if (!teacher) return NextResponse.json({ messages: [], myId: decoded.id });
    messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: decoded.id, receiverId: teacher.id },
          { senderId: teacher.id, receiverId: decoded.id },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { fullName: true, role: true } } },
    });
  } else {
    // Teacher sees all messages
    messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { fullName: true, role: true } }, receiver: { select: { fullName: true, role: true } } },
      take: 100,
    });
  }

  return NextResponse.json({ messages, myId: decoded.id });
}

export async function POST(req: Request) {
  const decoded = await getDecoded();
  if (!decoded) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

  const { content, receiverId } = await req.json();
  if (!content?.trim()) return NextResponse.json({ message: 'Nội dung trống' }, { status: 400 });

  let targetId = receiverId;
  if (!targetId) {
    if (decoded.role === 'STUDENT') {
      const teacher = await prisma.user.findFirst({ where: { role: 'TEACHER' } });
      targetId = teacher?.id;
    }
  }
  if (!targetId) return NextResponse.json({ message: 'Không tìm thấy người nhận' }, { status: 400 });

  const message = await prisma.message.create({
    data: { content: content.trim(), senderId: decoded.id, receiverId: targetId },
    include: { sender: { select: { fullName: true, role: true } } },
  });

  // Create notification for receiver
  await prisma.notification.create({
    data: {
      title: `💬 Tin nhắn mới từ ${message.sender.fullName}`,
      body: content.trim().slice(0, 80),
      type: 'INFO',
      link: decoded.role === 'STUDENT' ? '/teacher/students' : '/student/messages',
      userId: targetId,
    },
  });

  return NextResponse.json(message, { status: 201 });
}
