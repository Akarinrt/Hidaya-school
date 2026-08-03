import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
    const submissions = await prisma.submission.findMany({
      orderBy: { submittedAt: 'desc' },
      take: 10,
      include: {
        student: { select: { fullName: true, username: true } },
        homework: { select: { title: true } }
      }
    });

    const testResults = await prisma.testResult.findMany({
      orderBy: { submittedAt: 'desc' },
      take: 10
    });

    return NextResponse.json({
      submissions,
      testResults
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
