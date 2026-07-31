'use client';

import { useState, useEffect } from 'react';

type Question = {
  id: string;
  type: 'multiple_choice' | 'text_input';
  text?: string;
  q?: string;
  explanation?: string;
  hint?: string;
  options?: { id: string; text: string }[];
  correctOptionId?: string;
  correctAnswers?: string[];
};

type Props = {
  title: string;
  description: string;
  teacherName: string;
  questions: Question[];
  audioUrl: string | null;
  isExam: boolean;
  timeLimit: number | null;
};

export default function PublicHomeworkClient({ title, description, teacherName, questions, audioUrl, isExam, timeLimit }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(timeLimit ? timeLimit * 60 : null);

  useEffect(() => {
    if (timeLeft === null || submitted) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft(p => (p !== null && p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const answeredCount = Object.keys(answers).length;

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (!ans) return;
      if (q.type === 'multiple_choice' && ans === q.correctOptionId) correct++;
      if (q.type === 'text_input' && q.correctAnswers?.some(a => a.trim().toLowerCase() === ans.trim().toLowerCase())) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getOptionResult = (q: Question, optId: string) => {
    if (!submitted) return 'neutral';
    if (optId === q.correctOptionId) return 'correct';
    if (answers[q.id] === optId && optId !== q.correctOptionId) return 'wrong';
    return 'neutral';
  };

  const isTextCorrect = (q: Question) =>
    q.correctAnswers?.some(a => a.trim().toLowerCase() === (answers[q.id] || '').trim().toLowerCase());

  const percent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      fontFamily: '"Inter", "Noto Sans JP", sans-serif', paddingBottom: '60px'
    }}>
      {/* Header */}
      <div style={{
        background: isExam
          ? 'linear-gradient(135deg, #7f1d1d, #dc2626)'
          : 'linear-gradient(135deg, #1e3a8a, #2563eb)',
        padding: '30px 20px', color: 'white'
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', opacity: 0.75, marginBottom: '6px', letterSpacing: '1px' }}>
            {isExam ? '⏱️ BÀI THI MÔ PHỎNG JLPT' : '📝 BÀI TẬP VỀ NHÀ'} · {teacherName}
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 800, margin: '0 0 8px 0', lineHeight: 1.3 }}>
            {title}
          </h1>
          {description && (
            <p style={{ opacity: 0.85, margin: '0 0 16px 0', fontSize: '15px', lineHeight: 1.5 }}>{description}</p>
          )}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', opacity: 0.8 }}>
            <span>📋 {questions.length} câu hỏi</span>
            {timeLimit && <span>⏱️ {timeLimit} phút</span>}
            <span>🔓 Không cần đăng nhập</span>
          </div>
        </div>
      </div>

      {/* Timer bar (exam) */}
      {isExam && timeLeft !== null && !submitted && (
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#dc2626', padding: '10px 20px', display: 'flex', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.4em', fontFamily: 'monospace' }}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>
      )}

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Result card */}
        {submitted && (
          <div style={{
            background: percent >= 80 ? '#f0fdf4' : percent >= 50 ? '#fffbeb' : '#fef2f2',
            border: `2px solid ${percent >= 80 ? '#86efac' : percent >= 50 ? '#fde68a' : '#fca5a5'}`,
            borderRadius: '16px', padding: '24px', marginBottom: '28px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>
              {percent >= 80 ? '🏆' : percent >= 50 ? '📈' : '💪'}
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: percent >= 80 ? '#16a34a' : percent >= 50 ? '#d97706' : '#dc2626' }}>
              {score} / {questions.length} câu
            </div>
            <div style={{ fontSize: '18px', color: '#64748b', marginTop: '4px' }}>
              {percent >= 80 ? 'Xuất sắc! 🎉' : percent >= 50 ? 'Tốt! Cần ôn thêm một chút.' : 'Cần luyện tập thêm nhé!'} ({percent}%)
            </div>
            <button
              onClick={() => { setAnswers({}); setSubmitted(false); setScore(0); if (timeLimit) setTimeLeft(timeLimit * 60); window.scrollTo({ top: 0 }); }}
              style={{ marginTop: '16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >🔄 Làm lại từ đầu</button>
          </div>
        )}

        {/* Audio */}
        {audioUrl && (
          <div style={{ background: 'white', borderRadius: '14px', padding: '20px', marginBottom: '20px', border: '2px solid #93c5fd', boxShadow: '0 2px 10px rgba(37,99,235,0.08)' }}>
            <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '10px' }}>🎧 Bài nghe (Choukai)</div>
            <audio controls style={{ width: '100%' }}>
              <source src={audioUrl} />
            </audio>
          </div>
        )}

        {/* Progress (not submitted) */}
        {!submitted && questions.length > 0 && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${(answeredCount / questions.length) * 100}%`, height: '100%', background: '#2563eb', borderRadius: '99px', transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', fontWeight: 600 }}>
              {answeredCount} / {questions.length} câu
            </span>
          </div>
        )}

        {/* Questions */}
        {questions.map((q, idx) => {
          const isAns = !!answers[q.id];
          const qText = q.text || q.q || '';
          const isCorrectText = submitted && q.type === 'text_input' && isTextCorrect(q);
          const isWrongText = submitted && q.type === 'text_input' && !isTextCorrect(q) && isAns;

          return (
            <div
              key={q.id}
              style={{
                background: 'white', borderRadius: '14px', padding: '22px', marginBottom: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: submitted
                  ? (q.type === 'multiple_choice'
                    ? (answers[q.id] === q.correctOptionId ? '2px solid #86efac' : '2px solid #fca5a5')
                    : (isCorrectText ? '2px solid #86efac' : isWrongText ? '2px solid #fca5a5' : '1px solid #e2e8f0'))
                  : '1px solid #e2e8f0'
              }}
            >
              {/* Q header */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  minWidth: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '14px', flexShrink: 0,
                  background: submitted
                    ? (q.type === 'multiple_choice' ? (answers[q.id] === q.correctOptionId ? '#dcfce7' : '#fee2e2') : (isCorrectText ? '#dcfce7' : '#fee2e2'))
                    : (isAns ? '#dbeafe' : '#f1f5f9'),
                  color: submitted
                    ? (q.type === 'multiple_choice' ? (answers[q.id] === q.correctOptionId ? '#16a34a' : '#dc2626') : (isCorrectText ? '#16a34a' : '#dc2626'))
                    : '#475569'
                }}>
                  {idx + 1}
                </span>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b', lineHeight: 1.5 }}>{qText}</div>
              </div>

              {/* Multiple choice */}
              {q.type === 'multiple_choice' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt) => {
                    const result = getOptionResult(q, opt.id);
                    return (
                      <label
                        key={opt.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 14px', borderRadius: '10px', cursor: submitted ? 'default' : 'pointer',
                          border: result === 'correct' ? '2px solid #16a34a' : result === 'wrong' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                          background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : answers[q.id] === opt.id ? '#eff6ff' : '#fafafa',
                          transition: 'all 0.15s'
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[q.id] === opt.id}
                          onChange={() => !submitted && setAnswers(p => ({ ...p, [q.id]: opt.id }))}
                          style={{ transform: 'scale(1.2)', accentColor: '#2563eb' }}
                          disabled={submitted}
                        />
                        <span style={{ fontSize: '14px', color: result === 'correct' ? '#166534' : result === 'wrong' ? '#991b1b' : '#334155', fontWeight: result !== 'neutral' ? 600 : 400 }}>
                          {result === 'correct' ? '✅ ' : result === 'wrong' ? '❌ ' : ''}{opt.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Text input */}
              {q.type === 'text_input' && (
                <div>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={e => !submitted && setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                    placeholder="Nhập câu trả lời (Hiragana / Kanji)..."
                    disabled={submitted}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box',
                      border: submitted ? (isCorrectText ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                      background: submitted ? (isCorrectText ? '#f0fdf4' : '#fef2f2') : 'white',
                      color: '#1e293b', outline: 'none'
                    }}
                  />
                  {submitted && !isCorrectText && answers[q.id] && (
                    <div style={{ marginTop: '8px', fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                      ✅ Đáp án đúng: {q.correctAnswers?.join(' / ')}
                    </div>
                  )}
                </div>
              )}

              {/* Hint/Explanation */}
              {q.hint && !submitted && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#6366f1', padding: '8px 12px', background: '#eef2ff', borderRadius: '8px' }}>
                  💡 Gợi ý: {q.hint}
                </div>
              )}
              {q.explanation && submitted && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#0369a1', padding: '10px 14px', background: '#f0f9ff', borderRadius: '8px', lineHeight: 1.6 }}>
                  📖 Giải thích: {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Submit button */}
        {!submitted && questions.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {answeredCount < questions.length && (
              <div style={{ textAlign: 'center', color: '#f59e0b', fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>
                ⚠️ Còn {questions.length - answeredCount} câu chưa trả lời
              </div>
            )}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%', padding: '16px', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
                background: answeredCount === questions.length
                  ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
                  : '#94a3b8',
                color: 'white', boxShadow: answeredCount === questions.length ? '0 4px 20px rgba(37,99,235,0.35)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {answeredCount === questions.length ? '🚀 Nộp bài & Xem kết quả' : `📋 Nộp bài (${answeredCount}/${questions.length} câu)`}
            </button>
          </div>
        )}

        {/* Empty state */}
        {questions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
            <p>Bài tập này là dạng tự luận – vui lòng liên hệ giáo viên để nộp bài.</p>
          </div>
        )}
      </div>
    </div>
  );
}
