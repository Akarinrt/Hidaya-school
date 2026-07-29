import { PrismaClient } from '@prisma/client';
import styles from './schedule.module.css';

const prisma = new PrismaClient();

export default async function SchedulePage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    include: { teacher: true },
  });

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const days = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📅 Lịch dạy theo tuần</h1>
      <p className={styles.subtitle}>Xem lịch học của tất cả các lớp trong tuần</p>

      <div className={styles.weekGrid}>
        {days.map(day => {
          const daySchedules = schedules.filter(s => s.dayOfWeek === day);
          return (
            <div key={day} className={styles.dayColumn}>
              <div className={styles.dayHeader}>{dayNames[day]}</div>
              <div className={styles.daySlots}>
                {daySchedules.length === 0 ? (
                  <div className={styles.noClass}>Không có lớp</div>
                ) : (
                  daySchedules.map(s => (
                    <div key={s.id} className={styles.classCard} style={{ borderTopColor: s.color || '#ff9800' }}>
                      <div className={styles.className}>{s.title}</div>
                      <div className={styles.classTime}>{s.startTime} – {s.endTime}</div>
                      <div className={styles.classLocation}>📍 {s.location}</div>
                      {s.meetLink && (
                        <a href={s.meetLink} target="_blank" rel="noreferrer" className={styles.meetLink}>
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
    </div>
  );
}
