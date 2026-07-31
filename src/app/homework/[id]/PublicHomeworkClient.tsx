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

// ── Furigana parser ──────────────────────────────────────────────
// Supports two syntaxes in question text:
//   《漢字|かんじ》  →  <ruby>漢字<rt>かんじ</rt></ruby>
//   [漢字|かんじ]    →  same
function parseFurigana(text: string): React.ReactNode[] {
  const pattern = /[《\[]([\s\S]+?)[|｜]([\s\S]+?)[》\]]/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <ruby key={key++}>
        {match[1]}
        <rt style={{ fontSize: '0.6em', color: '#7c3aed', fontWeight: 500 }}>{match[2]}</rt>
      </ruby>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Strip furigana markers to get plain text (for hint button check)
function stripFurigana(text: string): string {
  return text.replace(/[《\[]([\s\S]+?)[|｜]([\s\S]+?)[》\]]/g, '$1');
}

function hasFuriganaMarkers(text: string): boolean {
  return /[《\[]([\s\S]+?)[|｜]([\s\S]+?)[》\]]/.test(text);
}

// Renders text with furigana when showFurigana=true, plain when false
function JapaneseText({ text, showFurigana }: { text: string; showFurigana: boolean }) {
  if (showFurigana && hasFuriganaMarkers(text)) {
    return <span>{parseFurigana(text)}</span>;
  }
  return <span>{stripFurigana(text)}</span>;
}

export default function PublicHomeworkClient({
  title, description, teacherName, questions, audioUrl, isExam, timeLimit
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(timeLimit ? timeLimit * 60 : null);
  const [globalFurigana, setGlobalFurigana] = useState(false);
  const [hintOpen, setHintOpen] = useState<Record<string, boolean>>({});

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

  const toggleHint = (qid: string) => {
    setHintOpen(p => ({ ...p, [qid]: !p[qid] }));
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

  // check if any question has furigana markers
  const anyFurigana = questions.some(q => hasFuriganaMarkers(q.text || q.q || '') ||
    q.options?.some(o => hasFuriganaMarkers(o.text)));

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '"Inter","Noto Sans JP",sans-serif', paddingBottom: '60px' }}>

      {/* ── Hero header ── */}
      <div style={{
        background: isExam
          ? 'linear-gradient(135deg,#7f1d1d,#dc2626)'
          : 'linear-gradient(135deg,#1e3a8a,#2563eb)',
        padding: '28px 20px', color: 'white'
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {isExam ? '⏱️ BÀI THI MÔ PHỎNG JLPT' : '📝 BÀI TẬP VỀ NHÀ'} · {teacherName}
          </div>
          <h1 style={{ fontSize: 'clamp(18px,4vw,28px)', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.3 }}>
            {title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', opacity: 0.8 }}>
            <span>📋 {questions.length} câu</span>
            {timeLimit && <span>⏱️ {timeLimit} phút</span>}
            <span>🔓 Không cần đăng nhập</span>
          </div>
        </div>
      </div>

      {/* ── Timer bar ── */}
      {isExam && timeLeft !== null && !submitted && (
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#dc2626', padding: '8px 20px', display: 'flex', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.4em', fontFamily: 'monospace' }}>⏱️ {formatTime(timeLeft)}</span>
        </div>
      )}

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '20px 16px' }}>

        {/* ── Result card ── */}
        {submitted && (
          <div style={{
            background: percent >= 80 ? '#f0fdf4' : percent >= 50 ? '#fffbeb' : '#fef2f2',
            border: `2px solid ${percent >= 80 ? '#86efac' : percent >= 50 ? '#fde68a' : '#fca5a5'}`,
            borderRadius: '16px', padding: '24px', marginBottom: '24px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '44px', marginBottom: '6px' }}>
              {percent >= 80 ? '🏆' : percent >= 50 ? '📈' : '💪'}
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: percent >= 80 ? '#16a34a' : percent >= 50 ? '#d97706' : '#dc2626' }}>
              {score} / {questions.length} câu
            </div>
            <div style={{ fontSize: '16px', color: '#64748b', marginTop: '4px' }}>
              {percent >= 80 ? 'Xuất sắc! 🎉' : percent >= 50 ? 'Tốt! Cần ôn thêm một chút.' : 'Cần luyện tập thêm nhé!'} ({percent}%)
            </div>
            <button
              onClick={() => { setAnswers({}); setSubmitted(false); setScore(0); setHintOpen({}); if (timeLimit) setTimeLeft(timeLimit * 60); window.scrollTo({ top: 0 }); }}
              style={{ marginTop: '14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 22px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >🔄 Làm lại từ đầu</button>
          </div>
        )}

        {/* ── Toolbar row ── */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          {/* Global furigana toggle — only shown if questions actually have furigana */}
          {anyFurigana && (
            <button
              onClick={() => setGlobalFurigana(v => !v)}
              style={{
                padding: '8px 14px', borderRadius: '20px', border: `2px solid ${globalFurigana ? '#7c3aed' : '#c4b5fd'}`,
                background: globalFurigana ? '#7c3aed' : 'white', color: globalFurigana ? 'white' : '#7c3aed',
                fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              {globalFurigana ? '🈳 Ẩn furigana' : '🈳 Hiện furigana'}
            </button>
          )}

          {/* Progress */}
          {!submitted && questions.length > 0 && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
              <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '99px', height: '7px', overflow: 'hidden' }}>
                <div style={{ width: `${(answeredCount / questions.length) * 100}%`, height: '100%', background: '#2563eb', borderRadius: '99px', transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', fontWeight: 600 }}>
                {answeredCount}/{questions.length}
              </span>
            </div>
          )}
        </div>

        {/* ── Audio ── */}
        {audioUrl && (
          <div style={{ background: 'white', borderRadius: '14px', padding: '18px', marginBottom: '16px', border: '2px solid #93c5fd' }}>
            <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '8px' }}>🎧 Bài nghe (Choukai)</div>
            <audio controls style={{ width: '100%' }}>
              <source src={audioUrl} />
            </audio>
          </div>
        )}

        {/* ── Questions ── */}
        {questions.map((q, idx) => {
          const qText = q.text || q.q || '';
          const showHint = hintOpen[q.id] || globalFurigana;
          const hasHint = !!(q.hint);
          const hasFuri = hasFuriganaMarkers(qText) || q.options?.some(o => hasFuriganaMarkers(o.text));
          const correctTextResult = submitted && q.type === 'text_input' && isTextCorrect(q);
          const wrongTextResult  = submitted && q.type === 'text_input' && !isTextCorrect(q) && !!answers[q.id];

          const cardBorder = submitted
            ? (q.type === 'multiple_choice'
              ? (answers[q.id] === q.correctOptionId ? '2px solid #86efac' : answers[q.id] ? '2px solid #fca5a5' : '1px solid #e2e8f0')
              : (correctTextResult ? '2px solid #86efac' : wrongTextResult ? '2px solid #fca5a5' : '1px solid #e2e8f0'))
            : '1px solid #e2e8f0';

          const numberBg = submitted
            ? (q.type === 'multiple_choice' ? (answers[q.id] === q.correctOptionId ? '#dcfce7' : '#fee2e2') : (correctTextResult ? '#dcfce7' : '#fee2e2'))
            : (answers[q.id] ? '#dbeafe' : '#f1f5f9');
          const numberColor = submitted
            ? (q.type === 'multiple_choice' ? (answers[q.id] === q.correctOptionId ? '#16a34a' : '#dc2626') : (correctTextResult ? '#16a34a' : '#dc2626'))
            : '#475569';

          return (
            <div key={q.id} style={{ background: 'white', borderRadius: '14px', padding: '20px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: cardBorder }}>

              {/* Q header row */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ minWidth: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0, background: numberBg, color: numberColor }}>
                  {idx + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b', lineHeight: 1.6 }}>
                    <JapaneseText text={qText} showFurigana={showHint} />
                  </div>
                </div>

                {/* Hint / furigana toggle button per question */}
                {(hasHint || hasFuri) && !submitted && (
                  <button
                    onClick={() => toggleHint(q.id)}
                    title="Xem gợi ý / furigana"
                    style={{
                      padding: '5px 10px', borderRadius: '20px', border: `1.5px solid ${hintOpen[q.id] ? '#f59e0b' : '#fde68a'}`,
                      background: hintOpen[q.id] ? '#fef3c7' : 'white', color: '#b45309',
                      fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                      transition: 'all 0.15s'
                    }}
                  >
                    💡 {hintOpen[q.id] ? 'Ẩn' : 'Gợi ý'}
                  </button>
                )}
              </div>

              {/* Hint text (below question, shown when toggled) */}
              {hasHint && showHint && (
                <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#fef9ec', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '13px', color: '#92400e', lineHeight: 1.7 }}>
                  💡 {q.hint}
                </div>
              )}

              {/* Multiple choice */}
              {q.type === 'multiple_choice' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {q.options.map(opt => {
                    const res = getOptionResult(q, opt.id);
                    return (
                      <label
                        key={opt.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 14px', borderRadius: '10px', cursor: submitted ? 'default' : 'pointer',
                          border: res === 'correct' ? '2px solid #16a34a' : res === 'wrong' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                          background: res === 'correct' ? '#f0fdf4' : res === 'wrong' ? '#fef2f2' : answers[q.id] === opt.id ? '#eff6ff' : '#fafafa',
                          transition: 'all 0.15s'
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[q.id] === opt.id}
                          onChange={() => !submitted && setAnswers(p => ({ ...p, [q.id]: opt.id }))}
                          style={{ transform: 'scale(1.2)', accentColor: '#2563eb', flexShrink: 0 }}
                          disabled={submitted}
                        />
                        <span style={{ fontSize: '14px', color: res === 'correct' ? '#166534' : res === 'wrong' ? '#991b1b' : '#334155', fontWeight: res !== 'neutral' ? 600 : 400 }}>
                          {res === 'correct' ? '✅ ' : res === 'wrong' ? '❌ ' : ''}
                          <JapaneseText text={opt.text} showFurigana={showHint} />
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
                      border: submitted ? (correctTextResult ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                      background: submitted ? (correctTextResult ? '#f0fdf4' : '#fef2f2') : 'white',
                      color: '#1e293b', outline: 'none'
                    }}
                  />
                  {submitted && !correctTextResult && answers[q.id] && (
                    <div style={{ marginTop: '7px', fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                      ✅ Đáp án đúng: {q.correctAnswers?.join(' / ')}
                    </div>
                  )}
                </div>
              )}

              {/* Explanation (after submit) */}
              {q.explanation && submitted && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#0369a1', padding: '10px 14px', background: '#f0f9ff', borderRadius: '8px', lineHeight: 1.6 }}>
                  📖 {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* ── Submit button ── */}
        {!submitted && questions.length > 0 && (
          <div style={{ marginTop: '18px' }}>
            {answeredCount < questions.length && (
              <div style={{ textAlign: 'center', color: '#f59e0b', fontWeight: 600, marginBottom: '10px', fontSize: '13px' }}>
                ⚠️ Còn {questions.length - answeredCount} câu chưa trả lời
              </div>
            )}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%', padding: '16px', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
                background: answeredCount === questions.length
                  ? 'linear-gradient(135deg,#2563eb,#7c3aed)'
                  : '#94a3b8',
                color: 'white',
                boxShadow: answeredCount === questions.length ? '0 4px 20px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {answeredCount === questions.length ? '🚀 Nộp bài & Xem kết quả' : `📋 Nộp bài (${answeredCount}/${questions.length} câu)`}
            </button>
          </div>
        )}

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
