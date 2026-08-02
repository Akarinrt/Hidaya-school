import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
