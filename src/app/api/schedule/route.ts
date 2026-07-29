import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { teacher: true, class: true },
    });
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, dayOfWeek, startTime, endTime } = body;

    const updated = await prisma.schedule.update({
      where: { id },
      data: {
        dayOfWeek,
        startTime,
        endTime
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}
