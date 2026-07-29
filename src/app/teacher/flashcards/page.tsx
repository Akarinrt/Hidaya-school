'use client';
import { useState, useEffect } from 'react';

export default function AIFlashcardGeneratorPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/classes')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setClasses(d); });
  }, []);

  const handleGenerate = async () => {
    if (!text) return alert('Vui lòng nhập văn bản');
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (res.ok) {
        setCards(data);
      } else {
        alert(data.message || 'Lỗi sinh từ vựng');
      }
    } catch {
      alert('Không thể kết nối API DeepSeek');
    } finally {
      setLoading(false);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title || !classId || cards.length === 0) return alert('Vui lòng điền đủ Tiêu đề, Lớp và phải có ít nhất 1 thẻ bài');
    setSaving(true);
    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, classId, cards })
      });
      if (res.ok) {
        alert('Lưu bộ thẻ thành công!');
        setText('');
        setTitle('');
        setCards([]);
      } else {
        alert('Lỗi lưu thẻ');
      }
    } catch {
      alert('Lỗi kết nối');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)' }}>✨ Trợ lý AI Tạo Flashcard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Dán một đoạn văn bản tiếng Nhật vào đây, DeepSeek AI sẽ tự động bóc tách Kanji và từ vựng khó để tạo thành bộ thẻ lật 3D.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '30px' }}>
        <div className="glass-panel" style={{ padding: '25px' }}>
          <h3 style={{ marginTop: 0 }}>Bước 1: Cung cấp Dữ liệu</h3>
          <textarea 
            rows={6} 
            placeholder="Dán đoạn báo NHK, bài đọc hiểu JLPT hoặc đoạn hội thoại vào đây..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '15px', resize: 'vertical' }}
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading || !text}
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {loading ? '🤖 AI đang phân tích...' : '✨ Bắt đầu Trích xuất Từ vựng'}
          </button>
        </div>

        {cards.length > 0 && (
          <div className="card" style={{ padding: '25px', border: '2px solid var(--primary-light)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Bước 2: Chỉnh sửa & Lưu trữ ({cards.length} thẻ)</h3>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tên Bộ thẻ *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="VD: Từ vựng Bài đọc số 1" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Phân bổ cho Lớp *</label>
                <select value={classId} onChange={e => setClassId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <option value="">-- Chọn lớp --</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto', padding: '10px', background: 'var(--surface-hover)', borderRadius: '10px' }}>
              {cards.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'var(--surface)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>#{idx + 1}</div>
                  <input 
                    value={c.front} 
                    onChange={e => updateCard(idx, 'front', e.target.value)} 
                    placeholder="Mặt trước (Kanji)" 
                    style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid var(--border)' }} 
                  />
                  <input 
                    value={c.back} 
                    onChange={e => updateCard(idx, 'back', e.target.value)} 
                    placeholder="Mặt sau (Hiragana - Nghĩa)" 
                    style={{ flex: 2, padding: '8px', borderRadius: '5px', border: '1px solid var(--border)' }} 
                  />
                  <button onClick={() => removeCard(idx)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑</button>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSave} 
              disabled={saving || !title || !classId}
              style={{ width: '100%', background: 'var(--success)', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
            >
              {saving ? 'Đang lưu...' : '💾 Xuất bản Bộ thẻ cho Lớp học'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
