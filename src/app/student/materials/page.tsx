'use client';
import Link from 'next/link';
import { LESSONS_DATA } from '@/data/lessons';

export default function StudentMaterialsPage() {
  // Danh sách tất cả các bài N4 (26-50)
  const lessons = Object.values(LESSONS_DATA)
    .filter(l => l.level === 'N4')
    .map(l => ({
      id: l.id.replace('bai-', ''),
      name: l.title,
      desc: l.content
    }));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '10px' }}>📖 Tài liệu In ấn (Ngữ pháp & Kanji)</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Tài liệu tóm tắt được thiết kế tối ưu cho khổ giấy A4. Hãy nhấp vào từng bài để xem và in hoặc lưu thành file PDF.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {lessons.map(lesson => (
          <div key={lesson.id} className="glass-panel" style={{ padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent)' }}>{lesson.name}</h3>
            <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.5 }}>{lesson.desc}</p>
            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
              <Link 
                href={`/materials/bai-${lesson.id}/print`}
                target="_blank"
                style={{ 
                  background: 'var(--primary)', color: 'white', padding: '10px 15px', borderRadius: '8px', 
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', flex: 1 
                }}
              >
                🖨 Xem & In Tài liệu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}