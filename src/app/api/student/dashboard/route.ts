import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string };
    if (decoded.role !== 'STUDENT') {
      return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });
    }

    const studentId = decoded.id;

    // 1. Tìm các lớp học sinh này đang tham gia
    const enrollments = await prisma.classEnrollment.findMany({
      where: { studentId },
      include: { class: true }
    });

    const classIds = enrollments.map(e => e.classId);

    // 2. Tính Leaderboard cho từng lớp
    const leaderboards: Record<string, any[]> = {};
    
    for (const cls of enrollments) {
      const classId = cls.classId;
      // Tìm tất cả học sinh trong lớp này
      const classStudents = await prisma.classEnrollment.findMany({
        where: { classId },
        include: {
          student: {
            include: {
              submissions: { where: { status: 'GRADED' } },
              attendances: { where: { classId } }
            }
          }
        }
      });

      const ranked = classStudents.map(cs => {
        const totalScore = cs.student.submissions.reduce((sum, s) => sum + (s.score || 0), 0);
        const presentCount = cs.student.attendances.filter(a => a.status === 'PRESENT').length;
        const xp = totalScore + (presentCount * 10);
        
        return {
          id: cs.student.id,
          name: cs.student.fullName,
          username: cs.student.username,
          xp: xp,
          totalScore,
          presentCount
        };
      });

      // Sắp xếp giảm dần theo XP
      ranked.sort((a, b) => b.xp - a.xp);
      leaderboards[classId] = {
        className: cls.class.name,
        rankings: ranked
      };
    }

    // 3. Phân tích cá nhân (5 bài kiểm tra/bài tập gần nhất)
    const recentSubmissions = await prisma.submission.findMany({
      where: { studentId, status: 'GRADED' },
      include: { homework: true },
      orderBy: { gradedAt: 'desc' },
      take: 5
    });

    const personalStats = recentSubmissions.reverse().map(sub => ({
      name: sub.homework.title.substring(0, 15) + '...',
      score: sub.score || 0
    }));

    return NextResponse.json({
      leaderboards,
      personalStats
    });

  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ', error: error.message }, { status: 500 });
  }
}
