'use client';

import { useState } from 'react';
import styles from './schedule.module.css';

type Schedule = {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  location: string | null;
  meetLink: string | null;
  color: string | null;
};

export default function ScheduleGrid({ initialSchedules }: { initialSchedules: Schedule[] }) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const days = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetDay: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Optimistic update
    const prevSchedules = [...schedules];
    setSchedules(prevSchedules.map(s => s.id === draggedItem ? { ...s, dayOfWeek: targetDay } : s));

    const itemToUpdate = prevSchedules.find(s => s.id === draggedItem);
    setDraggedItem(null);

    if (itemToUpdate && itemToUpdate.dayOfWeek !== targetDay) {
      try {
        await fetch('/api/schedule', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: itemToUpdate.id,
            dayOfWeek: targetDay,
            startTime: itemToUpdate.startTime,
            endTime: itemToUpdate.endTime
          })
        });
      } catch (err) {
        console.error(err);
        setSchedules(prevSchedules); // Revert on failure
        alert('Có lỗi xảy ra khi cập nhật lịch!');
      }
    }
  };

  return (
    <div className={styles.weekGrid}>
      {days.map(day => {
        const daySchedules = schedules.filter(s => s.dayOfWeek === day);
        return (
          <div 
            key={day} 
            className={styles.dayColumn}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, day)}
          >
            <div className={styles.dayHeader}>{dayNames[day]}</div>
            <div className={styles.daySlots}>
              {daySchedules.length === 0 ? (
                <div className={styles.noClass}>Chưa có lịch</div>
              ) : (
                daySchedules.map(s => (
                  <div 
                    key={s.id} 
                    className={styles.classCard} 
                    style={{ borderTopColor: s.color || '#ff9800', cursor: 'grab' }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, s.id)}
                  >
                    <div className={styles.className}>{s.title}</div>
                    <div className={styles.classTime}>{s.startTime} – {s.endTime}</div>
                    <div className={styles.classLocation}>📍 {s.location || 'Chưa cập nhật'}</div>
                    {s.meetLink && (
                      <a href={s.meetLink} target="_blank" rel="noreferrer" className={styles.meetLink} onClick={e => e.stopPropagation()}>
                        🎥 Vào lớp
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
