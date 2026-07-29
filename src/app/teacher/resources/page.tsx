'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherResourcesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setClasses(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        alert('Đã thêm tài liệu thành công!');
        router.refresh();
        e.currentTarget.reset();
      } else {
        alert('Lỗi khi thêm tài liệu');
      }
    } catch {
      alert('Không thể kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)' }}>📚 Quản lý Tài liệu Lớp học</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Chia sẻ PDF bài giảng, đề thi, âm thanh MP3 trực tiếp cho học viên theo từng lớp.</p>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Tên Tài Liệu *</label>
          <input name="title" required placeholder="VD: Đề thi thử JLPT N4 số 1" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Đường dẫn (URL) *</label>
          <input name="url" required type="url" placeholder="VD: https://drive.google.com/..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '5px' }}>Tải file lên Google Drive hoặc OneDrive và dán link vào đây.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Lớp học *</label>
            <select name="classId" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <option value="">-- Chọn lớp --</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Định dạng *</label>
            <select name="type" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <option value="PDF">📕 Tài liệu văn bản (PDF, DOCX)</option>
              <option value="AUDIO">🎧 File âm thanh (MP3, WAV)</option>
              <option value="LINK">🔗 Liên kết trang web</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
          {loading ? 'Đang lưu...' : '📤 Tải tài liệu lên lớp học'}
        </button>
      </form>
    </div>
  );
}
