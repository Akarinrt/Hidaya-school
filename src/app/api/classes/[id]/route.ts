import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
  try {
    const { id } = await params;
    const classDetails = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: true,
        students: {
          include: { student: true }
        },
        schedules: true
      }
    });

    if (!classDetails) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json(classDetails);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch class details' }, { status: 500 });
  }
}

// Add student to class
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
  try {
    const { id: classId } = await params;
    const body = await request.json();
    const { studentId } = body;

    const enrollment = await prisma.classEnrollment.create({
      data: {
        classId,
        studentId
      }
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    // Might fail if already enrolled (unique constraint)
    return NextResponse.json({ error: 'Failed to enroll student, they might already be in this class.' }, { status: 400 });
  }
}
