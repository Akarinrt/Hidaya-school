'use client';

import { useState } from 'react';
import styles from '../lessons/lessons.module.css';
import { testsData } from '../../../data/tests';
import Link from 'next/link';

export default function TestsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (testId: string) => {
    const url = `${window.location.origin}/test/${testId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(testId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📑 Quản lý Bài Kiểm Tra</h1>
          <p className={styles.subtitle}>Tạo link gửi cho học sinh làm bài trực tuyến tự động chấm điểm.</p>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: '20px' }}>
        {testsData.map(test => (
          <div key={test.id} className={styles.card} style={{ borderLeft: '4px solid #ef5350' }}>
            <div className={styles.cardTop}>
              <span className={styles.level} style={{ background: '#ef535022', color: '#ef5350' }}>
                {test.level}
              </span>
              <span className={styles.badge} style={{ background: '#f5f5f5', color: '#555' }}>
                ⏱ {test.durationMinutes} phút
              </span>
            </div>
            <h3 className={styles.cardTitle}>{test.title}</h3>
            <p className={styles.cardLesson}>{test.questions.length} câu hỏi</p>
            <p className={styles.cardDesc}>{test.description}</p>
            
            <div className={styles.cardFooter} style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', width: '100%' }}>
              <Link href={`/test/${test.id}`} target="_blank" rel="noreferrer" className={styles.downloadBtn} style={{ background: '#f0f0f0', color: '#333' }}>
                👀 Xem trước
              </Link>
              <button 
                onClick={() => copyToClipboard(test.id)}
                className={styles.downloadBtn}
                style={{ background: copiedId === test.id ? '#4caf50' : '#42a5f5', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                {copiedId === test.id ? '✅ Đã copy' : '🔗 Copy Link'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
