import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const dateStr = searchParams.get('date');

    if (!classId || !dateStr) {
      return NextResponse.json({ error: 'Missing classId or date' }, { status: 400 });
    }

    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);

    const attendances = await prisma.attendance.findMany({
      where: {
        classId,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    return NextResponse.json(attendances);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // expected body: { classId: string, date: string, attendances: { studentId: string, status: string }[] }
    const { classId, date, attendances } = body;

    const targetDate = new Date(date);
    targetDate.setHours(12, 0, 0, 0); // Normalized time

    // Upsert each attendance
    const results = [];
    for (const record of attendances) {
      const { studentId, status } = record;
      
      const upserted = await prisma.attendance.upsert({
        where: {
          classId_studentId_date: {
            classId,
            studentId,
            date: targetDate
          }
        },
        update: { status },
        create: {
          classId,
          studentId,
          date: targetDate,
          status
        }
      });
      results.push(upserted);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
  }
}
