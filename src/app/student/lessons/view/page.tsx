'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './view.module.css';
import Link from 'next/link';

function SlideViewer() {
  const params = useSearchParams();
  const url = params.get('url') || '';
  const title = params.get('title') || 'Bài giảng';

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <Link href="/student/lessons" className={styles.backBtn}>← Quay lại</Link>
        <h1 className={styles.title}>{title}</h1>
        <a href={url} target="_blank" rel="noreferrer" className={styles.openBtn}>↗ Mở toàn màn hình</a>
      </div>
      <iframe src={url} className={styles.frame} title={title} allowFullScreen />
    </div>
  );
}

export default function ViewLessonPage() {
  return (
    <Suspense fallback={<div style={{color:'#fff',padding:'20px'}}>Đang tải bài giảng...</div>}>
      <SlideViewer />
    </Suspense>
  );
}
