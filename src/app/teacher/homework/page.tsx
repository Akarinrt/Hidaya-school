import { PrismaClient } from '@prisma/client';
import styles from './homework.module.css';
import Link from 'next/link';
import DeadlineEditor from './DeadlineEditor';
import SeedHwButton from './SeedHwButton';

const prisma = new PrismaClient();

export default async function HomeworkPage() {
  const homeworks = await prisma.homework.findMany({
    where: { type: 'HOMEWORK' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { submissions: true } },
      teacher: true,
    },
  });

  const formatDate = (d: Date | null) => d ? new Date(d).toLocaleDateString('vi-VN') : 'Không giới hạn';
  const isOverdue = (d: Date | null) => d && new Date(d) < new Date();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📝 Bài tập về nhà</h1>
          <p className={styles.subtitle}>{homeworks.length} bài đã tạo</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/teacher/homework/new" className={styles.addBtn}>+ Tạo bài mới</Link>
          <SeedHwButton />
        </div>
      </div>

      <div className={styles.list}>
        {homeworks.map(hw => (
          <div key={hw.id} className={styles.card}>
            <div className={styles.cardLeft}>
              <span className={`${styles.typeBadge} ${hw.type === 'TEST' ? styles.test : styles.homework}`}>
                {hw.type === 'TEST' ? '📋 Bài test' : '📝 Bài tập'}
              </span>
              <h3 className={styles.cardTitle}>{hw.title}</h3>
              {hw.description && <p className={styles.cardDesc}>{hw.description}</p>}
              <div className={styles.cardMeta}>
                <span className={isOverdue(hw.deadline) ? styles.overdue : styles.deadline}>
                  📅 Hạn nộp: {formatDate(hw.deadline)}
                </span>
                <DeadlineEditor homeworkId={hw.id} currentDeadline={hw.deadline} />
                <span className={styles.metaItem}>👤 {hw.teacher.fullName}</span>
                <span className={styles.metaItem}>📨 {hw._count.submissions} bài đã nộp</span>
              </div>
            </div>
            <div className={styles.cardRight}>
              <Link href={`/teacher/grading?homeworkId=${hw.id}`} className={styles.gradeBtn}>
                Chấm bài ({hw._count.submissions})
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
