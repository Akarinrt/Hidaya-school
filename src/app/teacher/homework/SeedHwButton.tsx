'use client';

import { useState } from 'react';
import styles from './homework.module.css';

export default function SeedHwButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    if (!confirm('Bạn có muốn khởi tạo nhanh bộ Bài tập và Bài kiểm tra mẫu (Bài 26, 27, 28) cho tất cả các lớp học không?')) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/seed-hw');
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Khởi tạo thành công!');
        window.location.reload();
      } else {
        alert('Có lỗi xảy ra: ' + data.error);
      }
    } catch (e) {
      alert('Không thể kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSeed} 
      disabled={loading}
      className={styles.addBtn}
      style={{ background: 'var(--success)', border: 'none', marginLeft: '10px', color: 'white' }}
    >
      {loading ? 'Đang tạo...' : '✨ Tạo Bài tập mẫu'}
    </button>
  );
}
