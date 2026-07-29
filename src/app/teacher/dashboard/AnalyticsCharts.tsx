'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsCharts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu thống kê...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
      {/* Biểu đồ Điểm danh */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px', color: 'var(--text-main)' }}>📊 Tỉ lệ Điểm danh</h3>
        {data.attendanceStats.every((s:any) => s.value === 0) ? (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chưa có dữ liệu điểm danh
          </div>
        ) : (
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.attendanceStats} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {data.attendanceStats.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Biểu đồ Bài tập */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px', color: 'var(--text-main)' }}>📈 Điểm trung bình (5 Bài gần nhất)</h3>
        {data.scoreStats.length === 0 ? (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chưa có bài kiểm tra nào được chấm
          </div>
        ) : (
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.scoreStats}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="average" fill="var(--primary)" name="Điểm TB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
