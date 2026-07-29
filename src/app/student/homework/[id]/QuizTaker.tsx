'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizTaker({ hwId, quizData, maxScore }: { hwId: string, quizData: string, maxScore: number }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let questions = [];
  try {
    questions = JSON.parse(quizData);
  } catch {
    return <div>Dữ liệu bài tập bị lỗi.</div>;
  }

  const handleSelect = (qIdx: number, oIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
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
        alert('Nộp bài thành công!');
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
      <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Bài tập Trắc nghiệm ({questions.length} câu)</h3>
      
      {questions.map((q: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '25px', padding: '15px', background: 'var(--surface-hover)', borderRadius: '10px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1em' }}>Câu {idx + 1}: {q.q}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {q.options.map((opt: string, oIdx: number) => (
              <label 
                key={oIdx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  padding: '10px', 
                  background: answers[idx] === oIdx ? 'var(--primary-light)' : 'var(--surface)', 
                  border: answers[idx] === oIdx ? '2px solid var(--primary)' : '1px solid var(--border)', 
                  borderRadius: '8px', 
                  cursor: 'pointer' 
                }}
              >
                <input 
                  type="radio" 
                  name={`q-${idx}`} 
                  checked={answers[idx] === oIdx} 
                  onChange={() => handleSelect(idx, oIdx)} 
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '1em' }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {error && <div style={{ color: 'var(--danger)', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

      <button 
        onClick={handleSubmit} 
        disabled={loading}
        style={{ width: '100%', background: 'var(--primary)', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontSize: '1.1em', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,82,204,0.3)' }}
      >
        {loading ? 'Đang chấm điểm...' : '🚀 Nộp bài & Chấm điểm'}
      </button>
    </div>
  );
}
