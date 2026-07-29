import { PrismaClient } from '@prisma/client';
import styles from './schedule.module.css';

const prisma = new PrismaClient();

export default async function StudentSchedulePage() {
  const schedules = await prisma.schedule.findMany({ orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }] });
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const today = new Date().getDay();
  const days = [1, 2, 3, 4, 5, 6, 0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📅 Lịch học của tôi</h1>
      <p className={styles.subtitle}>Xem lịch học tuần này và link vào lớp</p>
      <div className={styles.weekGrid}>
        {days.map(day => {
          const daySchedules = schedules.filter(s => s.dayOfWeek === day);
          const isToday = day === today;
          return (
            <div key={day} className={`${styles.dayColumn} ${isToday ? styles.todayCol : ''}`}>
              <div className={`${styles.dayHeader} ${isToday ? styles.todayHeader : ''}`}>
                {isToday ? '⭐ ' : ''}{dayNames[day]}
              </div>
              {daySchedules.length === 0 ? <div className={styles.noClass}>Nghỉ</div> : (
                daySchedules.map(s => (
                  <div key={s.id} className={styles.classCard} style={{ borderTopColor: s.color || '#64b4ff' }}>
                    <div className={styles.className}>{s.title}</div>
                    <div className={styles.classTime}>{s.startTime} – {s.endTime}</div>
                    <div className={styles.classLoc}>📍 {s.location}</div>
                    {s.meetLink && <a href={s.meetLink} target="_blank" rel="noreferrer" className={styles.joinBtn}>🎥 Vào lớp</a>}
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
