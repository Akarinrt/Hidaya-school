import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };
    if (decoded.role !== 'TEACHER') {
      return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });
    }

    const teacherId = decoded.id;

    // Lấy thống kê số lượng lớp học, học viên
    const classes = await prisma.class.findMany({
      where: { teacherId },
      include: {
        _count: { select: { students: true } }
      }
    });

    const totalClasses = classes.length;
    const totalStudents = classes.reduce((sum, c) => sum + c._count.students, 0);

    // Lấy thống kê Điểm danh (Tỉ lệ có mặt, đi muộn, vắng)
    const attendances = await prisma.attendance.findMany({
      where: {
        class: { teacherId }
      }
    });

    let present = 0, late = 0, absent = 0;
    attendances.forEach(a => {
      if (a.status === 'PRESENT') present++;
      else if (a.status === 'LATE') late++;
      else if (a.status === 'ABSENT') absent++;
    });
    const attendanceStats = [
      { name: 'Có mặt', value: present, fill: '#4ade80' },
      { name: 'Đi muộn', value: late, fill: '#facc15' },
      { name: 'Vắng', value: absent, fill: '#f87171' }
    ];

    // Lấy thống kê Bài tập (Điểm trung bình các bài test gần nhất)
    const recentHomeworks = await prisma.homework.findMany({
      where: { teacherId, type: 'TEST' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { submissions: true }
    });

    const scoreStats = recentHomeworks.reverse().map(hw => {
      const graded = hw.submissions.filter(s => s.score !== null);
      const avg = graded.length > 0 
        ? graded.reduce((sum, s) => sum + (s.score || 0), 0) / graded.length 
        : 0;
      return {
        name: hw.title.substring(0, 15) + '...',
        average: Math.round(avg)
      };
    });

    return NextResponse.json({
      totalClasses,
      totalStudents,
      attendanceStats,
      scoreStats
    });

  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 });
  }
}
