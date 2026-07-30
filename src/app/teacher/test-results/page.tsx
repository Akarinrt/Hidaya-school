'use client';

import { useState, useEffect, useCallback } from 'react';
import { testsData } from '../../../data/tests';

interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
}

export default function TestResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState<string>('all');

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const url = selectedTestId === 'all'
        ? '/api/test-results'
        : `/api/test-results?testId=${selectedTestId}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTestId]);

  useEffect(() => { fetchResults(); }, [fetchResults]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
  };

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return '#2e7d32';
    if (pct >= 60) return '#f57f17';
    return '#c62828';
  };

  const getScoreBg = (pct: number) => {
    if (pct >= 80) return '#e8f5e9';
    if (pct >= 60) return '#fffde7';
    return '#ffebee';
  };

  // Stats
  const avgScore = results.length
    ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)
    : 0;
  const passed = results.filter(r => r.percentage >= 60).length;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a237e', marginBottom: '5px' }}>📊 Kết quả Bài kiểm tra</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Xem điểm học sinh sau khi nộp bài</p>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap' }}>
        <label style={{ fontWeight: 'bold', color: '#333' }}>Lọc theo bài:</label>
        <select
          value={selectedTestId}
          onChange={e => setSelectedTestId(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', color: '#333', background: '#fff' }}
        >
          <option value="all">Tất cả bài kiểm tra</option>
          {testsData.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
        <button
          onClick={fetchResults}
          style={{ padding: '8px 20px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🔄 Làm mới
        </button>
      </div>

      {/* Thống kê nhanh */}
      {results.length > 0 && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <div style={{ background: '#e3f2fd', padding: '20px 30px', borderRadius: '10px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1565c0' }}>{results.length}</div>
            <div style={{ color: '#555', fontSize: '0.9rem' }}>Lượt nộp bài</div>
          </div>
          <div style={{ background: '#e8f5e9', padding: '20px 30px', borderRadius: '10px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32' }}>{avgScore}%</div>
            <div style={{ color: '#555', fontSize: '0.9rem' }}>Điểm trung bình</div>
          </div>
          <div style={{ background: '#fff3e0', padding: '20px 30px', borderRadius: '10px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e65100' }}>{passed}/{results.length}</div>
            <div style={{ color: '#555', fontSize: '0.9rem' }}>Đạt (≥60%)</div>
          </div>
        </div>
      )}

      {/* Bảng kết quả */}
      {loading ? (
        <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>⏳ Đang tải...</p>
      ) : results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📭</div>
          <h3 style={{ color: '#555' }}>Chưa có học sinh nào nộp bài</h3>
          <p style={{ color: '#888' }}>Gửi link bài kiểm tra cho học sinh và kết quả sẽ xuất hiện tại đây.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a237e', color: 'white' }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>Học sinh</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>Bài kiểm tra</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600' }}>Điểm</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600' }}>Kết quả</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '600' }}>Thời gian nộp</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1a237e' }}>
                    👤 {r.studentName}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#555', fontSize: '0.9rem' }}>{r.testTitle}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                    {r.score}/{r.totalQuestions}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      background: getScoreBg(r.percentage),
                      color: getScoreColor(r.percentage),
                    }}>
                      {r.percentage}% {r.percentage >= 80 ? '🏆' : r.percentage >= 60 ? '✅' : '❌'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#888', fontSize: '0.85rem' }}>
                    {formatDate(r.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
