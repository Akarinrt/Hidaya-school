'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboardClient({ studentId }: { studentId: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: '16px', padding: '30px', color: 'white', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0, 82, 204, 0.2)' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>Trang tổng quan Học tập</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Theo dõi sự tiến bộ và vị trí của bạn trong lớp học.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Biểu đồ cá nhân */}
        <div className="card" style={{ padding: '25px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📈 Biểu đồ điểm số (5 bài gần nhất)
          </h2>
          {data.personalStats.length === 0 ? (
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Chưa có dữ liệu bài tập
            </div>
          ) : (
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.personalStats}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5, fill: 'var(--primary)' }} name="Điểm số" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Bảng Xếp Hạng */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.keys(data.leaderboards).length === 0 ? (
            <div className="card" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Bạn chưa tham gia lớp học nào
            </div>
          ) : (
            Object.keys(data.leaderboards).map(classId => {
              const cls = data.leaderboards[classId];
              return (
                <div key={classId} className="card" style={{ padding: '25px', borderRadius: '16px' }}>
                  <h2 style={{ fontSize: '18px', color: 'var(--warning)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏆 Bảng Vàng: {cls.className}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cls.rankings.slice(0, 5).map((rank: any, idx: number) => {
                      let medal = '';
                      if (idx === 0) medal = '🥇';
                      else if (idx === 1) medal = '🥈';
                      else if (idx === 2) medal = '🥉';
                      
                      const isMe = rank.id === studentId;
                      
                      return (
                        <div key={rank.id} style={{ 
                          display: 'flex', alignItems: 'center', padding: '12px 15px', 
                          background: isMe ? 'var(--primary-light)' : 'var(--surface-hover)', 
                          border: isMe ? '2px solid var(--primary)' : '1px solid var(--border)',
                          borderRadius: '10px'
                        }}>
                          <div style={{ width: '40px', fontSize: '20px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                            {medal || `#${idx + 1}`}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{rank.name} {isMe && '(Bạn)'}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@{rank.username}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '18px' }}>{rank.xp} XP</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
