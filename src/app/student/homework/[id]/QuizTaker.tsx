'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizTaker({ 
  hwId, 
  quizData, 
  maxScore, 
  timeLimit, 
  audioUrl, 
  isExam 
}: { 
  hwId: string, 
  quizData: string, 
  maxScore: number, 
  timeLimit?: number | null, 
  audioUrl?: string | null, 
  isExam?: boolean 
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Map question ID -> student answer
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(timeLimit ? timeLimit * 60 : null);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  let questions: any[] = [];
  try {
    questions = JSON.parse(quizData);
  } catch {
    return <div>Dữ liệu bài tập bị lỗi.</div>;
  }

  const handleSubmit = async (autoSubmit: boolean = false) => {
    if (!autoSubmit && Object.keys(answers).length < questions.length) {
      setError('Vui lòng hoàn thành tất cả các câu hỏi trước khi nộp bài!');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/submit/${hwId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (res.ok) {
        alert(autoSubmit ? 'Hết giờ! Bài của bạn đã được tự động nộp.' : 'Nộp bài thành công!');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Lỗi khi nộp bài');
      }
    } catch {
      setError('Không thể kết nối tới máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isExam && (
        <div style={{ position: 'sticky', top: '10px', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--danger)', color: 'white', padding: '15px 20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 5px 20px rgba(255,0,0,0.3)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>⚠️ Kỳ thi Mô phỏng JLPT</div>
          {timeLeft !== null && (
            <div style={{ fontSize: '1.8em', fontWeight: '900', fontFamily: 'monospace' }}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}
        </div>
      )}

      {audioUrl && (
        <div className="card" style={{ padding: '20px', marginBottom: '25px', background: 'var(--surface-hover)', border: '2px solid var(--primary)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--primary)' }}>🎧 Bài nghe (Choukai)</h4>
          <audio controls controlsList="nodownload" style={{ width: '100%' }}>
            <source src={audioUrl} />
            Trình duyệt của bạn không hỗ trợ thẻ audio.
          </audio>
          <div style={{ fontSize: '12px', color: 'var(--warning)', marginTop: '10px' }}>* Lưu ý: Trong kỳ thi thật, bạn chỉ được nghe 1 lần duy nhất. Hãy tập trung cao độ!</div>
        </div>
      )}

      <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Bài tập Trắc nghiệm & Tự luận ({questions.length} câu)</h3>
      
      {questions.map((q: any, idx: number) => (
        <div key={q.id || idx} style={{ marginBottom: '25px', padding: '20px', background: 'var(--surface-hover)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1em', color: 'var(--text-main)' }}>
            Câu {idx + 1}: {q.text || q.q}
          </div>
          
          {q.type === 'multiple_choice' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {q.options && q.options.map((opt: any, oIdx: number) => {
                const optId = opt.id || String(oIdx);
                const optText = opt.text || opt;
                const isSelected = answers[q.id] === optId;
                return (
                  <label 
                    key={optId} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      padding: '12px 15px', 
                      background: isSelected ? 'rgba(0, 82, 204, 0.08)' : 'var(--surface)', 
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`q-${q.id}`} 
                      checked={isSelected} 
                      onChange={() => setAnswers(prev => ({ ...prev, [q.id]: optId }))} 
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '1em', color: 'var(--text-main)' }}>{optText}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div>
              <input 
                type="text" 
                value={answers[q.id] || ''} 
                onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} 
                placeholder="Nhập câu trả lời bằng Hiragana / Kanji..." 
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)', 
                  background: 'var(--surface)',
                  color: 'var(--text-main)',
                  fontSize: '1em',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}
        </div>
      ))}

      {error && <div style={{ color: 'var(--danger)', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

      <button 
        onClick={() => handleSubmit(false)} 
        disabled={loading}
        style={{ width: '100%', background: 'var(--primary)', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontSize: '1.1em', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,82,204,0.3)' }}
      >
        {loading ? 'Đang chấm điểm...' : '🚀 Nộp bài & Chấm điểm'}
      </button>
    </div>
  );
}
