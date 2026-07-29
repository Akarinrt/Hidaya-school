'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';

export default function NewHomeworkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [classes, setClasses] = useState<any[]>([]);
  const [type, setType] = useState('HOMEWORK');

  // Quiz state
  const [questions, setQuestions] = useState([{ q: '', options: ['', '', '', ''], correct: 0 }]);

  useEffect(() => {
    fetch('/api/classes')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setClasses(data);
      })
      .catch(console.error);
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { q: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any, optionIndex?: number) => {
    const newQs = [...questions];
    if (field === 'q') newQs[index].q = value;
    if (field === 'correct') newQs[index].correct = value;
    if (field === 'option' && optionIndex !== undefined) {
      newQs[index].options[optionIndex] = value;
    }
    setQuestions(newQs);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Append quiz data if applicable
    if (type === 'QUIZ') {
      data.quizData = JSON.stringify(questions);
    }

    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/teacher/homework');
      } else {
        const d = await res.json();
        setError(d.message || 'Có lỗi xảy ra');
      }
    } catch {
      setError('Không thể kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📝 Tạo bài tập / bài test mới</h1>

      <form onSubmit={handleSubmit} className={`glass-panel ${styles.form}`}>
        <div className={styles.field}>
          <label>Loại</label>
          <div className={styles.typeToggle}>
            <label className={styles.radio}>
              <input type="radio" name="type" value="HOMEWORK" checked={type === 'HOMEWORK'} onChange={() => setType('HOMEWORK')} />
              <span>📝 Bài tập tự luận</span>
            </label>
            <label className={styles.radio}>
              <input type="radio" name="type" value="TEST" checked={type === 'TEST'} onChange={() => setType('TEST')} />
              <span>📋 Kiểm tra tự luận</span>
            </label>
            <label className={styles.radio}>
              <input type="radio" name="type" value="QUIZ" checked={type === 'QUIZ'} onChange={() => setType('QUIZ')} />
              <span>🎯 Trắc nghiệm (Tự chấm)</span>
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Lớp học (Tùy chọn)</label>
          <select name="classId" className={styles.input}>
            <option value="">-- Giao cho toàn bộ học sinh --</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Tiêu đề *</label>
          <input name="title" placeholder="VD: Bài tập Bài 28" required className={styles.input} />
        </div>

        <div className={styles.field}>
          <label>Mô tả / Đề bài</label>
          <textarea name="description" placeholder="Mô tả yêu cầu bài tập..." className={styles.textarea} rows={3} />
        </div>

        {type === 'QUIZ' && (
          <div style={{ background: 'var(--surface-hover)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--primary)' }}>Tạo câu hỏi Trắc nghiệm</h3>
            {questions.map((q, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Câu {idx + 1}</strong>
                  {questions.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(idx)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>✖ Xóa câu này</button>
                  )}
                </div>
                <input 
                  placeholder="Nhập nội dung câu hỏi..." 
                  value={q.q} 
                  onChange={(e) => updateQuestion(idx, 'q', e.target.value)} 
                  className={styles.input} 
                  style={{ marginBottom: '10px' }} 
                  required 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="radio" 
                        name={`correct-${idx}`} 
                        checked={q.correct === oIdx} 
                        onChange={() => updateQuestion(idx, 'correct', oIdx)}
                        title="Tick nếu đây là đáp án đúng"
                      />
                      <input 
                        placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`} 
                        value={opt} 
                        onChange={(e) => updateQuestion(idx, 'option', e.target.value, oIdx)} 
                        className={styles.input} 
                        style={{ padding: '8px' }} 
                        required 
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddQuestion} style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Thêm câu hỏi
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px' }}>
          <div className={styles.field} style={{ flex: 1 }}>
            <label>Hạn nộp bài</label>
            <input name="deadline" type="datetime-local" className={styles.input} />
          </div>
          <div className={styles.field} style={{ flex: 1 }}>
            <label>Điểm tối đa</label>
            <input name="maxScore" type="number" defaultValue={100} min={0} max={100} className={styles.input} />
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Hủy</button>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Đang lưu...' : '💾 Tạo bài'}
          </button>
        </div>
      </form>
    </div>
  );
}
