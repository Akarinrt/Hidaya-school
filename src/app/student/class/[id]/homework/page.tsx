import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function ClassHomeworkPage({ params }: { params: any }) {
  const { id } = await params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let studentId = '';
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
      studentId = decoded.id;
    } catch {}
  }

  const homeworks = await prisma.homework.findMany({
    where: { classId: id },
    include: {
      submissions: { where: { studentId } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>📝 Bài tập & Kiểm tra</h2>
      
      {homeworks.length === 0 ? (
        <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Chưa có bài tập nào cho lớp này.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {homeworks.map(hw => {
            const sub = hw.submissions[0];
            return (
              <div key={hw.id} className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-main)' }}>{hw.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Hạn nộp: {hw.deadline ? new Date(hw.deadline).toLocaleString() : 'Không có'} • 
                    Loại: {hw.type === 'QUIZ' ? 'Trắc nghiệm' : 'Tự luận'}
                  </div>
                  {sub && (
                    <div style={{ marginTop: '10px', display: 'inline-block', padding: '5px 10px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                      Điểm: {sub.score !== null ? `${sub.score}/${hw.maxScore}` : 'Đang chờ chấm'}
                    </div>
                  )}
                </div>
                
                <Link href={`/student/homework/${hw.id}`} style={{ background: sub ? 'var(--surface-hover)' : 'var(--primary)', color: sub ? 'var(--text-main)' : 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: sub ? '1px solid var(--border)' : 'none' }}>
                  {sub ? 'Xem chi tiết' : (hw.type === 'QUIZ' ? 'Làm bài thi' : 'Nộp bài')}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
