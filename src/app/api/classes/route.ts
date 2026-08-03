import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { error } = await requireAuth();
    if (error) return error;
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');

    const classes = await prisma.class.findMany({
      where: teacherId ? { teacherId } : undefined,
      include: {
        _count: {
          select: { students: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
    const body = await request.json();
    const { name, description, teacherId } = body;

    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        teacherId
      }
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}
