import { PrismaClient } from '@prisma/client';
import styles from './students.module.css';

const prisma = new PrismaClient();

export default async function StudentsPage() {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    orderBy: { createdAt: 'asc' },
    include: {
      _count: { select: { submissions: true } },
    },
  });

  const teachers = await prisma.user.findMany({
    where: { role: 'TEACHER' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👥 Quản lý Thành viên</h1>

      {/* Teachers section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>👩‍🏫 Giáo viên</span>
          <span className={styles.count}>{teachers.length}</span>
        </h2>
        <div className={styles.grid}>
          {teachers.map(t => (
            <div key={t.id} className={`${styles.card} ${styles.teacherCard}`}>
              <div className={styles.avatar}>{t.fullName.charAt(0)}</div>
              <div className={styles.info}>
                <div className={styles.name}>{t.fullName}</div>
                <div className={styles.username}>@{t.username}</div>
                {t.email && <div className={styles.email}>{t.email}</div>}
              </div>
              <span className={styles.roleBadge}>Giáo viên</span>
            </div>
          ))}
        </div>
      </section>

      {/* Students section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>👨‍🎓 Học viên</span>
          <span className={styles.count}>{students.length}</span>
        </h2>
        <div className={styles.grid}>
          {students.map(s => (
            <div key={s.id} className={styles.card}>
              <div className={`${styles.avatar} ${styles.studentAvatar}`}>{s.fullName.charAt(0)}</div>
              <div className={styles.info}>
                <div className={styles.name}>{s.fullName}</div>
                <div className={styles.username}>@{s.username}</div>
                {s.email && <div className={styles.email}>{s.email}</div>}
                <div className={styles.submissions}>📨 {s._count.submissions} bài đã nộp</div>
              </div>
              <span className={styles.studentBadge}>Học viên</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
