import { PrismaClient } from '@prisma/client';
import styles from './lessons.module.css';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function LessonsPage() {
  const lessons = await prisma.lessonPlan.findMany({
    orderBy: { createdAt: 'desc' },
    include: { teacher: true },
  });

  const levelColors: Record<string, string> = {
    'N5': '#66bb6a', 'N4': '#42a5f5', 'N3': '#ab47bc', 'N2': '#ef5350',
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📂 Kho Giáo án</h1>
          <p className={styles.subtitle}>{lessons.length} giáo án đã lưu trữ</p>
        </div>
        <Link href="/teacher/lessons/new" className={styles.addBtn}>+ Thêm giáo án</Link>
      </div>

      <div className={styles.grid}>
        {lessons.map(lesson => (
          <div key={lesson.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.level} style={{ background: `${levelColors[lesson.level] || '#ff9800'}22`, color: levelColors[lesson.level] || '#ff9800' }}>
                {lesson.level}
              </span>
              <span className={`${styles.badge} ${lesson.isPublic ? styles.public : styles.private}`}>
                {lesson.isPublic ? '🌐 Công khai' : '🔒 Riêng tư'}
              </span>
            </div>
            <h3 className={styles.cardTitle}>{lesson.title}</h3>
            <p className={styles.cardLesson}>{lesson.lesson}</p>
            {lesson.description && <p className={styles.cardDesc}>{lesson.description}</p>}
            <div className={styles.cardFooter}>
              <span className={styles.teacher}>👤 {lesson.teacher.fullName}</span>
              {lesson.fileUrl && (
                <a href={lesson.fileUrl} target="_blank" rel="noreferrer" className={styles.downloadBtn}>
                  📥 Tải xuống
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
