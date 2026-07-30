'use client';

import { useState, useEffect, useCallback } from 'react';
import { testsData } from '../../../data/tests';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: string;
  submittedAt: string;
}

export default function TestResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState<string>('all');
  const [detailResult, setDetailResult] = useState<TestResult | null>(null);

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

  const getScoreColor = (pct: number) => pct >= 80 ? '#2e7d32' : pct >= 60 ? '#f57f17' : '#c62828';
  const getScoreBg = (pct: number) => pct >= 80 ? '#e8f5e9' : pct >= 60 ? '#fffde7' : '#ffebee';

  const avgScore = results.length
    ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)
    : 0;
  const passed = results.filter(r => r.percentage >= 60).length;

  // --- Detail Modal ---
  const DetailModal = ({ result }: { result: TestResult }) => {
    const testData = testsData.find(t => t.id === result.testId);
    const answers: Record<string, string> = JSON.parse(result.answers || '{}');

    return (
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        onClick={() => setDetailResult(null)}
      >
        <div
          style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '750px', maxHeight: '85vh', overflowY: 'auto', padding: '30px', color: '#333' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, color: '#1a237e' }}>👤 {result.studentName}</h2>
              <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.9rem' }}>{result.testTitle} — {formatDate(result.submittedAt)}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%', border: `4px solid ${getScoreColor(result.percentage)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                background: getScoreBg(result.percentage)
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getScoreColor(result.percentage) }}>{result.score}/{result.totalQuestions}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: getScoreColor(result.percentage), fontWeight: 'bold', marginTop: '4px' }}>{result.percentage}%</div>
            </div>
          </div>

          <hr style={{ margin: '0 0 20px', border: 'none', borderTop: '1px solid #eee' }} />

          {!testData ? (
            <p style={{ color: '#888', textAlign: 'center' }}>Không tìm thấy dữ liệu bài kiểm tra.</p>
          ) : (
            <>
              {/* GAP ANALYSIS SECTION */}
              {(() => {
                const skillStats: Record<string, { total: number; correct: number }> = {};
                testData.questions.forEach(q => {
                  const skill = q.skill || 'Khác';
                  if (!skillStats[skill]) skillStats[skill] = { total: 0, correct: 0 };
                  skillStats[skill].total++;
                  
                  const studentAnswer = answers[q.id];
                  let isCorrect = false;
                  if (q.type === 'multiple_choice') {
                    isCorrect = studentAnswer === q.correctOptionId;
                  } else if (q.type === 'text_input') {
                    const ua = (studentAnswer || '').trim().replace(/\s+/g, '');
                    isCorrect = q.correctAnswers?.some(a => a.replace(/\s+/g, '') === ua) || false;
                  }
                  if (isCorrect) skillStats[skill].correct++;
                });

                const radarData = Object.keys(skillStats).map(skill => ({
                  skill,
                  'Điểm': Math.round((skillStats[skill].correct / skillStats[skill].total) * 100),
                  fullMark: 100,
                }));
                
                const weakSkills = radarData.filter(d => d['Điểm'] < 60).map(d => d.skill);

                return (
                  <div style={{ marginBottom: '30px', background: '#f8f9fa', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ margin: '0 0 15px', color: '#1a237e', textAlign: 'center' }}>🎯 Phân tích Lỗ hổng Kiến thức</h3>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '300px', height: '250px', margin: '0 auto' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" tick={{ fill: '#555', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                            <Radar name="Tỷ lệ đúng (%)" dataKey="Điểm" stroke="#1976d2" fill="#2196f3" fillOpacity={0.5} />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                          <h4 style={{ margin: '0 0 10px', color: '#333' }}>🤖 Nhận xét tự động:</h4>
                          {weakSkills.length === 0 ? (
                            <p style={{ color: '#2e7d32', margin: 0, lineHeight: 1.5 }}>
                              ✨ Học sinh nắm rất vững các kiến thức trong bài kiểm tra này. Không phát hiện lỗ hổng lớn nào (các kỹ năng đều đạt ≥60%).
                            </p>
                          ) : (
                            <p style={{ color: '#c62828', margin: 0, lineHeight: 1.5 }}>
                              ⚠️ Học sinh đang gặp khó khăn ở kỹ năng: <strong>{weakSkills.join(', ')}</strong>. Cần giao thêm bài tập phụ trợ hoặc ôn tập lại lý thuyết phần này.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <h3 style={{ borderBottom: '2px solid #1a237e', paddingBottom: '10px', color: '#1a237e', marginBottom: '20px' }}>Chi tiết câu trả lời</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {testData.questions.map((q, i) => {
                const studentAnswer = answers[q.id];
                let isCorrect = false;

                if (q.type === 'multiple_choice') {
                  isCorrect = studentAnswer === q.correctOptionId;
                } else if (q.type === 'text_input') {
                  const ua = (studentAnswer || '').trim().replace(/\s+/g, '');
                  isCorrect = q.correctAnswers?.some(a => a.replace(/\s+/g, '') === ua) || false;
                }

                const correctText = q.type === 'multiple_choice'
                  ? q.options?.find(o => o.id === q.correctOptionId)?.text
                  : q.correctAnswers?.[0];

                const studentText = q.type === 'multiple_choice'
                  ? q.options?.find(o => o.id === studentAnswer)?.text
                  : studentAnswer;

                return (
                  <div key={q.id} style={{
                    padding: '16px 18px', borderRadius: '10px',
                    border: `1px solid ${isCorrect ? '#a5d6a7' : '#ef9a9a'}`,
                    background: isCorrect ? '#f1f8e9' : '#fff8f8',
                  }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', minWidth: '24px' }}>{isCorrect ? '✅' : '❌'}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 10px', fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#1976d2', marginRight: '6px' }}>Câu {i + 1}:</span>
                          {q.text}
                        </p>

                        {/* All options with highlight */}
                        {q.type === 'multiple_choice' && q.options && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                            {q.options.map(opt => {
                              const isStudentPick = opt.id === studentAnswer;
                              const isCorrectOpt = opt.id === q.correctOptionId;
                              let bg = 'transparent', border = '1px solid #ddd', color = '#555';
                              if (isCorrectOpt) { bg = '#e8f5e9'; border = '1px solid #4caf50'; color = '#2e7d32'; }
                              if (isStudentPick && !isCorrectOpt) { bg = '#ffebee'; border = '1px solid #ef5350'; color = '#c62828'; }
                              return (
                                <div key={opt.id} style={{ padding: '6px 12px', borderRadius: '6px', background: bg, border, color, fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                  {isStudentPick && !isCorrectOpt && <span>👆</span>}
                                  {isCorrectOpt && <span>✔</span>}
                                  {!isStudentPick && !isCorrectOpt && <span style={{ opacity: 0 }}>○</span>}
                                  {opt.text}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Text input answer */}
                        {q.type === 'text_input' && (
                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: isCorrect ? '#e8f5e9' : '#ffebee', border: `1px solid ${isCorrect ? '#4caf50' : '#ef5350'}`, fontSize: '0.9rem', marginBottom: '4px' }}>
                              <strong>Học sinh viết:</strong> {studentText || <em style={{ color: '#999' }}>(Bỏ trống)</em>}
                            </div>
                            {!isCorrect && (
                              <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#e8f5e9', border: '1px solid #4caf50', fontSize: '0.9rem' }}>
                                <strong>Đáp án đúng:</strong> {correctText}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Explanation */}
                        <p style={{ margin: 0, fontSize: '0.82rem', color: '#777', fontStyle: 'italic' }}>
                          💡 {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </>
          )}

          <button
            onClick={() => setDetailResult(null)}
            style={{ marginTop: '25px', width: '100%', padding: '12px', background: '#1a237e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      {detailResult && <DetailModal result={detailResult} />}

      <h1 style={{ color: '#1a237e', marginBottom: '5px' }}>📊 Kết quả Bài kiểm tra</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Click vào hàng học sinh để xem chi tiết từng câu</p>

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

      {/* Stats */}
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

      {/* Table */}
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
                <th style={{ padding: '14px 16px', textAlign: 'left' }}>Học sinh</th>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}>Bài kiểm tra</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>Điểm</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>Kết quả</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Thời gian nộp</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={r.id}
                  onClick={() => setDetailResult(r)}
                  style={{
                    borderBottom: '1px solid #eee',
                    background: i % 2 === 0 ? '#fff' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#e8eaf6')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa')}
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
                      display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
                      fontWeight: 'bold', fontSize: '0.9rem',
                      background: getScoreBg(r.percentage), color: getScoreColor(r.percentage),
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
          <p style={{ margin: 0, padding: '10px 16px', color: '#aaa', fontSize: '0.8rem', textAlign: 'center', borderTop: '1px solid #eee' }}>
            👆 Click vào hàng để xem chi tiết từng câu trả lời
          </p>
        </div>
      )}
    </div>
  );
}
