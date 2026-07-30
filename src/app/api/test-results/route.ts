import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Học sinh nộp bài
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, testTitle, studentName, score, totalQuestions, answers } = body;

    if (!testId || !studentName || score === undefined) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    const result = await prisma.testResult.create({
      data: {
        testId,
        testTitle,
        studentName: studentName.trim(),
        score,
        totalQuestions,
        percentage,
        answers: JSON.stringify(answers),
      },
    });

    return NextResponse.json({ success: true, id: result.id, percentage });
  } catch (error) {
    console.error('Error saving test result:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// GET: Giáo viên xem kết quả
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const testId = searchParams.get('testId');

    const where = testId ? { testId } : {};

    const results = await prisma.testResult.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching test results:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
