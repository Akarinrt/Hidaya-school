import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function ClassFeedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Lấy dữ liệu học sinh trong lớp để làm Bảng xếp hạng
  const classStudents = await prisma.classEnrollment.findMany({
    where: { classId: id },
    include: {
      student: {
        include: {
          submissions: { where: { status: 'GRADED' } },
          attendances: { where: { classId: id } }
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
      xp: xp
    };
  });

  ranked.sort((a, b) => b.xp - a.xp);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
      <div>
        <div className="card" style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>📢 Thông báo lớp học</h2>
          <div style={{ padding: '20px', background: 'var(--surface-hover)', borderRadius: '10px', color: 'var(--text-muted)' }}>
            Hiện chưa có thông báo mới nào từ giáo viên.
          </div>
        </div>
      </div>

      <div>
        <div className="card" style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--warning)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏆 Bảng Xếp Hạng
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ranked.slice(0, 5).map((rank, idx) => {
              let medal = '';
              if (idx === 0) medal = '🥇';
              else if (idx === 1) medal = '🥈';
              else if (idx === 2) medal = '🥉';
              
              return (
                <div key={rank.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ width: '30px', fontSize: '18px', fontWeight: 'bold' }}>{medal || `#${idx + 1}`}</div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{rank.name}</div>
                  </div>
                  <div style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '14px' }}>{rank.xp} XP</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
