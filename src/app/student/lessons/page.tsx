import { PrismaClient } from '@prisma/client';
import styles from './lessons.module.css';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function StudentLessonsPage() {
  const lessons = await prisma.lessonPlan.findMany({
    where: { isPublic: true },
    orderBy: [{ level: 'asc' }, { lesson: 'asc' }],
  });

  const grouped: Record<string, typeof lessons> = {};
  for (const l of lessons) {
    if (!grouped[l.level]) grouped[l.level] = [];
    grouped[l.level].push(l);
  }

  const levelColors: Record<string, string> = { N5: '#66bb6a', N4: '#42a5f5', N3: '#ab47bc' };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📖 Bài giảng</h1>
      <p className={styles.subtitle}>Xem lại toàn bộ giáo án và slide bài giảng của giáo viên.</p>

      {Object.entries(grouped).map(([level, levelLessons]) => (
        <div key={level} className={styles.section}>
          <div className={styles.levelHeader} style={{ borderLeftColor: levelColors[level] || '#ff9800' }}>
            <span className={styles.levelBadge} style={{ background: `${levelColors[level] || '#ff9800'}22`, color: levelColors[level] || '#ff9800' }}>{level}</span>
            <span className={styles.levelTitle}>Trình độ {level}</span>
          </div>
          <div className={styles.grid}>
            {levelLessons.map(lesson => (
              <div key={lesson.id} className={styles.card}>
                <div className={styles.cardIcon}>
                  {lesson.title.includes('Kanji') ? '🀄' : lesson.title.includes('Ôn tập') ? '📚' : '📋'}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardLesson}>{lesson.lesson}</div>
                  <div className={styles.cardTitle}>{lesson.title}</div>
                </div>
                {lesson.slideUrl ? (
                  <Link href={`/student/lessons/view?url=${encodeURIComponent(lesson.slideUrl)}&title=${encodeURIComponent(lesson.title)}`} className={styles.viewBtn}>
                    ▶ Xem slide
                  </Link>
                ) : (
                  <span className={styles.comingSoon}>Sắp có</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
