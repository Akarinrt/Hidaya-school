import React from 'react';
import Link from 'next/link';

export default async function ClassLessonsPage() {
  const specialLessons = [
    { id: 26, title: 'Bài 26', desc: 'Thể thông thường + んです', hasPrint: true },
    { id: 27, title: 'Bài 27', desc: 'Thể khả năng & Chỉ', hasPrint: true },
    { id: 28, title: 'Bài 28', desc: 'Vừa... vừa & Thói quen', hasPrint: true },
  ];

  const regularLessons = Array.from({ length: 50 - 29 + 1 }, (_, i) => {
    const num = 29 + i;
    return { id: num, title: `Bài ${num}`, desc: `Giáo án & Bài giảng tương tác Bài ${num}`, hasPrint: false };
  });

  return (
    <div>
      <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>📖 Danh sách Bài học & Giáo án</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Lựa chọn bài học để đọc giáo án cuộn dọc (đầy đủ nét chữ, cách nhớ Kanji) hoặc tải tài liệu tóm tắt A4 in ấn.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Special Lessons */}
        {specialLessons.map(lesson => (
          <div key={lesson.id} className="card hover-scale" style={{ padding: '20px', borderLeft: '4px solid #ff9800', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>{lesson.title}</h3>
                <span style={{ fontSize: '12px', background: 'rgba(255, 152, 0, 0.15)', color: '#ff9800', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>N4</span>
              </div>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{lesson.desc}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`/slides/bai${lesson.id}/kanji.html`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#ab47bc', color: 'white', padding: '8px 0', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  漢 Chữ Hán
                </a>
                <a href={`/slides/bai${lesson.id}/nguphap.html`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#42a5f5', color: 'white', padding: '8px 0', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  文 Ngữ pháp
                </a>
              </div>
              {lesson.hasPrint && (
                <Link href={`/materials/bai-${lesson.id}/print`} target="_blank" style={{ textAlign: 'center', background: 'var(--primary)', color: 'white', padding: '8px 0', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  🖨 Tóm tắt & In A4
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Regular Lessons */}
        {regularLessons.map(lesson => (
          <div key={lesson.id} className="card hover-scale" style={{ padding: '20px', borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>{lesson.title}</h3>
                <span style={{ fontSize: '12px', background: 'rgba(0, 82, 204, 0.1)', color: 'var(--primary)', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>N4</span>
              </div>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{lesson.desc}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <a href={`/slides/bai${lesson.id}/index.html`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--primary-light)', padding: '8px 0', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                ▶ Xem bài giảng
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
