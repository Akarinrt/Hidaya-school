'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function StudentProfileView({ student }: { student: any }) {
  const router = useRouter();
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  let present = 0, late = 0, absent = 0;
  student.attendances?.forEach((a: any) => {
    if (a.status === 'PRESENT') present++;
    if (a.status === 'LATE') late++;
    if (a.status === 'ABSENT') absent++;
  });

  const gradedSubs = student.submissions?.filter((s: any) => s.status === 'GRADED') || [];
  const avgScore = gradedSubs.length > 0 
    ? gradedSubs.reduce((sum: number, s: any) => sum + (s.score || 0), 0) / gradedSubs.length 
    : 0;

  const handleAnalyze = async () => {
    setLoading(true);
    setAiReport(null);
    try {
      const res = await fetch('/api/ai/analyze-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student.id })
      });
      const data = await res.json();
      if (res.ok) {
        setAiReport(data.analysis);
      } else {
        alert(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      alert('Không thể kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold' }}>
        ← Quay lại
      </button>

      <div className="card" style={{ padding: '30px', marginBottom: '20px', background: 'linear-gradient(135deg, var(--surface), #f8fafc)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
            {student.fullName.charAt(0)}
          </div>
          <div>
            <h1 style={{ margin: 0, color: 'var(--text-main)' }}>{student.fullName}</h1>
            <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)' }}>@{student.username}</p>
          </div>
          
          <button 
            onClick={handleAnalyze} 
            disabled={loading}
            style={{ marginLeft: 'auto', padding: '12px 24px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,82,204,0.3)' }}
          >
            {loading ? '⏳ Đang phân tích...' : '✨ Phân tích với DeepSeek AI'}
          </button>
        </div>
      </div>

      {aiReport && (
        <div className="card" style={{ padding: '30px', marginBottom: '20px', borderLeft: '6px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.05)' }}>
          <h3 style={{ color: '#8b5cf6', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🤖 AI Đánh giá & Khuyến nghị
          </h3>
          <div style={{ lineHeight: '1.6', color: 'var(--text-main)', fontSize: '15px' }}>
            <ReactMarkdown>{aiReport}</ReactMarkdown>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '15px' }}>📈 Thống kê Học tập</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Điểm trung bình:</span> <strong>{Math.round(avgScore)} / 100</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bài tập đã nộp:</span> <strong>{student.submissions?.length || 0}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Đã được chấm:</span> <strong>{gradedSubs.length}</strong></li>
          </ul>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '15px' }}>📅 Chuyên cần</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Có mặt:</span> <strong style={{ color: 'var(--success)' }}>{present} buổi</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Đi muộn:</span> <strong style={{ color: 'var(--warning)' }}>{late} buổi</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vắng mặt:</span> <strong style={{ color: 'var(--danger)' }}>{absent} buổi</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
