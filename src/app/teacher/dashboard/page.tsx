import { PrismaClient } from '@prisma/client';
import styles from './dashboard.module.css';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function TeacherDashboard() {
  const [teachers, students, homeworks, submissions, schedules] = await Promise.all([
    prisma.user.count({ where: { role: 'TEACHER' } }),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.homework.count(),
    prisma.submission.count({ where: { status: 'PENDING' } }),
    prisma.schedule.findMany({ orderBy: { dayOfWeek: 'asc' }, take: 3, include: { teacher: true } }),
  ]);

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Xin chào, Giáo viên! 👋</h1>
          <p className={styles.subtitle}>Đây là bảng tổng quan hoạt động của Hidaya School hôm nay.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.orange}`}>
          <div className={styles.statIcon}>👩‍🏫</div>
          <div className={styles.statValue}>{teachers}</div>
          <div className={styles.statLabel}>Giáo viên</div>
        </div>
        <div className={`${styles.statCard} ${styles.blue}`}>
          <div className={styles.statIcon}>👨‍🎓</div>
          <div className={styles.statValue}>{students}</div>
          <div className={styles.statLabel}>Học viên</div>
        </div>
        <div className={`${styles.statCard} ${styles.green}`}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statValue}>{homeworks}</div>
          <div className={styles.statLabel}>Bài tập / Bài test</div>
        </div>
        <div className={`${styles.statCard} ${styles.red}`}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statValue}>{submissions}</div>
          <div className={styles.statLabel}>Bài chờ chấm</div>
        </div>
      </div>

      {/* Quick links */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>⚡ Thao tác nhanh</h2>
        <div className={styles.quickLinks}>
          <Link href="/teacher/homework/new" className={styles.quickCard}>
            <span>📝</span>
            <span>Giao bài tập mới</span>
          </Link>
          <Link href="/teacher/grading" className={styles.quickCard}>
            <span>✅</span>
            <span>Chấm bài nộp</span>
          </Link>
          <Link href="/teacher/lessons" className={styles.quickCard}>
            <span>📂</span>
            <span>Kho giáo án</span>
          </Link>
          <Link href="/teacher/schedule" className={styles.quickCard}>
            <span>📅</span>
            <span>Lịch dạy tuần này</span>
          </Link>
        </div>
      </div>

      {/* Upcoming schedule */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📅 Lịch dạy sắp tới</h2>
        <div className={styles.scheduleList}>
          {schedules.map(s => (
            <div key={s.id} className={styles.scheduleItem} style={{ borderLeftColor: s.color || '#ff9800' }}>
              <div className={styles.scheduleDay}>{dayNames[s.dayOfWeek]}</div>
              <div className={styles.scheduleInfo}>
                <div className={styles.scheduleTitle}>{s.title}</div>
                <div className={styles.scheduleMeta}>{s.startTime} – {s.endTime} · {s.location}</div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/teacher/schedule" className={styles.viewAll}>Xem toàn bộ lịch →</Link>
      </div>
    </div>
  );
}
