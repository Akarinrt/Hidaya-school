'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';

export default function NewHomeworkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

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
              <input type="radio" name="type" value="HOMEWORK" defaultChecked />
              <span>📝 Bài tập về nhà</span>
            </label>
            <label className={styles.radio}>
              <input type="radio" name="type" value="TEST" />
              <span>📋 Bài kiểm tra</span>
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Tiêu đề *</label>
          <input name="title" placeholder="VD: Bài tập Bài 28 - Chia động từ bị động" required className={styles.input} />
        </div>

        <div className={styles.field}>
          <label>Mô tả / Đề bài</label>
          <textarea name="description" placeholder="Mô tả yêu cầu bài tập..." className={styles.textarea} rows={4} />
        </div>

        <div className={styles.field}>
          <label>Hạn nộp bài</label>
          <input name="deadline" type="datetime-local" className={styles.input} />
        </div>

        <div className={styles.field}>
          <label>Điểm tối đa</label>
          <input name="maxScore" type="number" defaultValue={100} min={0} max={100} className={styles.input} />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Hủy</button>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Đang lưu...' : '💾 Tạo bài tập'}
          </button>
        </div>
      </form>
    </div>
  );
}
