import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import styles from './dashboard.module.css';

const prisma = new PrismaClient();

async function getStudentId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    return decoded.id;
  } catch { return null; }
}

export default async function StudentDashboard() {
  const studentId = await getStudentId();

  const [notifications, schedules, homeworks] = await Promise.all([
    studentId ? prisma.notification.findMany({ where: { userId: studentId }, orderBy: { createdAt: 'desc' }, take: 5 }) : [],
    prisma.schedule.findMany({ orderBy: { dayOfWeek: 'asc' } }),
    prisma.homework.findMany({ where: { isPublished: true }, orderBy: { deadline: 'asc' }, take: 3 }),
  ]);

  const today = new Date().getDay();
  const todaySchedules = schedules.filter(s => s.dayOfWeek === today);
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Xin chào, Học viên! 🌸</h1>
          <p className={styles.subtitle}>Tiếp tục hành trình chinh phục tiếng Nhật của bạn.</p>
        </div>
        {unreadCount > 0 && (
          <Link href="/student/messages" className={styles.notifBell}>
            🔔 <span className={styles.badge}>{unreadCount}</span>
          </Link>
        )}
      </div>

      {/* Today's Class */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📅 Lớp học hôm nay ({dayNames[today]})</h2>
        {todaySchedules.length === 0 ? (
          <div className={styles.noClass}>Hôm nay không có lớp học. Hãy ôn bài nhé! 📚</div>
        ) : (
          <div className={styles.todayCards}>
            {todaySchedules.map(s => (
              <div key={s.id} className={styles.todayCard} style={{ borderLeftColor: s.color || '#64b4ff' }}>
                <div className={styles.todayTitle}>{s.title}</div>
                <div className={styles.todayTime}>{s.startTime} – {s.endTime}</div>
                {s.meetLink && <a href={s.meetLink} target="_blank" rel="noreferrer" className={styles.joinBtn}>🎥 Vào lớp ngay</a>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>🔔 Thông báo mới</h2>
        <div className={styles.notifList}>
          {notifications.length === 0 && <div className={styles.empty}>Chưa có thông báo nào.</div>}
          {notifications.map(n => (
            <Link key={n.id} href={n.link || '#'} className={`${styles.notifItem} ${!n.isRead ? styles.unread : ''}`}>
              <span className={styles.notifIcon}>
                {n.type === 'TEST' ? '📋' : n.type === 'HOMEWORK' ? '📝' : n.type === 'MATERIAL' ? '📂' : '🔔'}
              </span>
              <div className={styles.notifContent}>
                <div className={styles.notifTitle}>{n.title}</div>
                <div className={styles.notifBody}>{n.body}</div>
              </div>
              {!n.isRead && <span className={styles.dot}></span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>⚡ Truy cập nhanh</h2>
        <div className={styles.quickGrid}>
          <Link href="/student/lessons" className={styles.quickCard}>
            <span>📖</span><span>Xem bài giảng</span>
          </Link>
          <Link href="/student/vocab" className={styles.quickCard}>
            <span>🎮</span><span>Game từ vựng</span>
          </Link>
          <Link href="/student/homework" className={styles.quickCard}>
            <span>📝</span><span>Bài tập</span>
          </Link>
          <Link href="/student/messages" className={styles.quickCard}>
            <span>💬</span><span>Nhắn tin GV</span>
          </Link>
        </div>
      </div>

      {/* Upcoming homework */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📝 Bài tập sắp đến hạn</h2>
        <div className={styles.hwList}>
          {homeworks.map(hw => (
            <Link key={hw.id} href="/student/homework" className={styles.hwItem}>
              <span className={hw.type === 'TEST' ? styles.testBadge : styles.hwBadge}>
                {hw.type === 'TEST' ? '📋 Test' : '📝 Bài tập'}
              </span>
              <span className={styles.hwTitle}>{hw.title}</span>
              <span className={styles.hwDeadline}>
                {hw.deadline ? `Hạn: ${new Date(hw.deadline).toLocaleDateString('vi-VN')}` : 'Không giới hạn'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
