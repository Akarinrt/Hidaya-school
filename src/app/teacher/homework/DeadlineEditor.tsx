'use client';

import { useState } from 'react';

export default function DeadlineEditor({ homeworkId, currentDeadline }: { homeworkId: string, currentDeadline: Date | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deadline, setDeadline] = useState(
    currentDeadline ? new Date(currentDeadline).toISOString().slice(0, 16) : ''
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/homework/${homeworkId}/deadline`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deadline: deadline || null }),
      });
      if (res.ok) {
        window.location.reload(); // Reload to show updated deadline
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (e) {
      alert('Lỗi máy chủ');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)} 
        style={{ marginLeft: '10px', padding: '2px 8px', fontSize: '12px', background: '#e3f2fd', color: '#1976d2', border: '1px solid #90caf9', borderRadius: '15px', cursor: 'pointer' }}
      >
        ⏱ Sửa hạn
      </button>
    );
  }

  return (
    <div style={{ marginTop: '10px', display: 'flex', gap: '5px', alignItems: 'center' }}>
      <input 
        type="datetime-local" 
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSave} disabled={loading} style={{ background: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
        Lưu
      </button>
      <button onClick={() => setIsEditing(false)} style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
        Hủy
      </button>
    </div>
  );
}
