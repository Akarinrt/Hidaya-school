'use client';

import { useState, use } from 'react';
import { testsData } from '../../../data/tests';
import Link from 'next/link';

export default function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const resolvedParams = use(params);
  const testData = testsData.find(t => t.id === resolvedParams.testId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  if (!testData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h2>❌ Không tìm thấy bài kiểm tra</h2>
        <p>Link bài kiểm tra không hợp lệ hoặc đã bị xóa.</p>
      </div>
    );
  }

  const handleOptionChange = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < testData.questions.length) {
      if (!confirm('Bạn chưa trả lời hết các câu hỏi. Vẫn nộp bài?')) {
        return;
      }
    }
    
    let correctCount = 0;
    testData.questions.forEach(q => {
      if (q.type === 'multiple_choice') {
        if (answers[q.id] === q.correctOptionId) {
          correctCount++;
        }
      } else if (q.type === 'text_input') {
        const userAnswer = (answers[q.id] || '').trim().replace(/\s+/g, '');
        const isCorrect = q.correctAnswers?.some(ans => 
          ans.replace(/\s+/g, '') === userAnswer
        );
        if (isCorrect) correctCount++;
      }
    });
    
    setScore(correctCount);
    setSubmitted(true);
  };

  if (!hasStarted) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', color: '#333', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '10px' }}>{testData.title}</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>{testData.description}</p>
        
        <div style={{ background: '#e3f2fd', color: '#333', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <p><strong>Cấp độ:</strong> {testData.level}</p>
          <p><strong>Thời gian làm bài:</strong> {testData.durationMinutes} phút</p>
          <p><strong>Số câu hỏi:</strong> {testData.questions.length}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>Nhập họ tên của bạn:</label>
          <input 
            type="text" 
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', color: '#333', backgroundColor: '#fff' }}
          />
          <button 
            onClick={() => {
              if (!studentName.trim()) {
                alert('Vui lòng nhập tên của bạn!');
                return;
              }
              setHasStarted(true);
            }}
            style={{ background: '#1976d2', color: 'white', border: 'none', padding: '14px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'white', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px', position: 'sticky', top: '10px', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#333', fontSize: '1.4rem' }}>{testData.title}</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>Học viên: <strong>{studentName}</strong></p>
        </div>
        {!submitted && (
          <div style={{ background: '#e0f7fa', color: '#006064', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' }}>
            ⏱ Đang làm bài
          </div>
        )}
      </div>

      {testData.questions.map((q, index) => {
        const isAnswered = answers[q.id] !== undefined;
        let isCorrect = false;
        
        if (q.type === 'multiple_choice') {
          isCorrect = answers[q.id] === q.correctOptionId;
        } else if (q.type === 'text_input') {
          const userAnswer = (answers[q.id] || '').trim().replace(/\s+/g, '');
          isCorrect = q.correctAnswers?.some(ans => ans.replace(/\s+/g, '') === userAnswer) || false;
        }
        
        return (
          <div key={q.id} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)', marginBottom: '25px', border: submitted ? (isCorrect ? '2px solid #4caf50' : '2px solid #f44336') : '2px solid transparent' }}>
            
            {q.passage && (
              <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #9c27b0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#9c27b0' }}>📖 Đoạn văn:</h4>
                <p style={{ margin: 0, color: '#333', lineHeight: '1.6', fontSize: '1.05rem' }}>{q.passage}</p>
              </div>
            )}

            <h3 style={{ marginTop: 0, color: '#333', fontSize: '1.1rem', lineHeight: '1.5' }}>
              <span style={{ color: '#1976d2', marginRight: '8px' }}>Câu {index + 1}:</span>
              {q.text}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
              {q.type === 'multiple_choice' && q.options?.map(opt => {
                const isSelected = answers[q.id] === opt.id;
                let bgColor = isSelected ? '#e3f2fd' : '#f5f5f5';
                let borderColor = isSelected ? '#2196f3' : '#e0e0e0';
                
                if (submitted) {
                  if (opt.id === q.correctOptionId) {
                    bgColor = '#e8f5e9';
                    borderColor = '#4caf50';
                  } else if (isSelected && !isCorrect) {
                    bgColor = '#ffebee';
                    borderColor = '#ef5350';
                  }
                }
                
                return (
                  <label 
                    key={opt.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px',
                      padding: '15px 20px', 
                      borderRadius: '8px', 
                      border: `1px solid ${borderColor}`,
                      background: bgColor,
                      cursor: submitted ? 'default' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`question_${q.id}`} 
                      value={opt.id}
                      checked={isSelected}
                      onChange={() => handleOptionChange(q.id, opt.id)}
                      disabled={submitted}
                      style={{ width: '18px', height: '18px', cursor: submitted ? 'default' : 'pointer' }}
                    />
                    <span style={{ fontSize: '1.05rem', color: '#333' }}>{opt.text}</span>
                  </label>
                );
              })}

              {q.type === 'text_input' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleOptionChange(q.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Nhập câu trả lời của bạn..."
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '8px',
                      border: submitted ? (isCorrect ? '1px solid #4caf50' : '1px solid #f44336') : '1px solid #ccc',
                      fontSize: '1.1rem',
                      color: '#333',
                      backgroundColor: submitted ? (isCorrect ? '#e8f5e9' : '#ffebee') : '#fff',
                    }}
                  />
                </div>
              )}
            </div>
            
            {submitted && (
              <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? '#e8f5e9' : '#fff3e0', color: '#333' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: isCorrect ? '#2e7d32' : '#e65100' }}>
                  {isCorrect ? '✅ Trả lời đúng!' : `❌ Trả lời sai (Đáp án đúng: ${q.type === 'multiple_choice' ? q.options?.find(o => o.id === q.correctOptionId)?.text : q.correctAnswers?.join(' / ')})`}
                </p>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.95rem' }}>
                  <strong>Giải thích:</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
          <button 
            onClick={handleSubmit}
            style={{ background: '#4caf50', color: 'white', border: 'none', padding: '15px 50px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)' }}
          >
            Nộp bài
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', color: score >= testData.questions.length / 2 ? '#4caf50' : '#f44336', margin: '0 0 15px 0' }}>
            {score >= testData.questions.length / 2 ? '🎉 Chúc mừng!' : '📚 Cố gắng hơn nhé!'}
          </h2>
          <p style={{ fontSize: '1.5rem', color: '#333', margin: 0 }}>
            Điểm của bạn: <strong style={{ fontSize: '2.5rem', color: '#1976d2' }}>{score}</strong> / {testData.questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
