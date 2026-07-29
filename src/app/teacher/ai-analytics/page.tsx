'use client';
import { useState, useEffect } from 'react';
import styles from './ai-analytics.module.css';

export default function AIAnalyticsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    // Lấy danh sách học sinh
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setStudents(data.filter((u: any) => u.role === 'STUDENT'));
      });
  }, []);

  const handleAnalyze = async () => {
    if (!selectedStudent) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch('/api/ai/analyze-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: selectedStudent.id })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      alert("Lỗi khi gọi AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🤖 DeepSeek AI Analytics</h1>
        <p className="text-gray-500">Phân tích kết quả học tập và tạo bài tập cá nhân hóa tự động.</p>
      </div>

      <div className={styles.layout}>
        {/* Cột Danh sách Học sinh */}
        <div className={styles.studentListCard}>
          <h3>Danh sách Học sinh</h3>
          {students.map(st => (
            <div 
              key={st.id} 
              className={`${styles.studentItem} ${selectedStudent?.id === st.id ? styles.active : ''}`}
              onClick={() => { setSelectedStudent(st); setAnalysis(null); }}
            >
              <div className={styles.avatar}>{st.fullName.charAt(0)}</div>
              <div>
                <div className="font-bold">{st.fullName}</div>
                <div className="text-xs text-gray-500">@{st.username}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Cột Phân tích AI */}
        <div className={styles.analysisCard}>
          {!selectedStudent ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>👈</div>
              <p>Vui lòng chọn một học sinh để AI bắt đầu phân tích</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="text-xl font-bold">Báo cáo của: {selectedStudent.fullName}</h2>
                <button 
                  className={styles.analyzeBtn} 
                  onClick={handleAnalyze} 
                  disabled={loading}
                >
                  {loading ? '⏳ AI Đang phân tích...' : '✨ Phân tích bằng DeepSeek AI'}
                </button>
              </div>

              {analysis && (
                <div className={styles.reportBox}>
                  <div className={styles.section}>
                    <h4>🔍 Phân Tích Điểm Yếu</h4>
                    <p>{analysis.analysis.weaknesses}</p>
                  </div>

                  <div className={`${styles.section} ${styles.advice}`}>
                    <h4>💡 Đề Xuất Khắc Phục</h4>
                    <p>{analysis.analysis.advice}</p>
                  </div>

                  {analysis.analysis.testCreated && (
                    <div className={styles.generatedTest}>
                      <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '15px' }}>
                        📝 Bài Trắc Nghiệm Đề Xuất (Tạo bởi AI)
                      </h4>
                      {analysis.suggestedQuestions.map((q: any, i: number) => (
                        <div key={i} className={styles.questionItem}>
                          <p>Câu {i+1}: {q.q}</p>
                          <div className={styles.options}>
                            {q.options.map((opt: string, idx: number) => (
                              <span key={idx} className={`${styles.option} ${idx === q.ans ? styles.correct : ''}`}>
                                {String.fromCharCode(65 + idx)}. {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button className="btn-primary" style={{ marginTop: '15px' }}>Giao bài tập này cho học sinh</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
