import { PrismaClient } from '@prisma/client';
import styles from './lessons.module.css';
import Link from 'next/link';
import CopyLinkButton from '../CopyLinkButton';

const prisma = new PrismaClient();

export default async function LessonsPage() {
  const lessons = await prisma.lessonPlan.findMany({
    orderBy: { createdAt: 'desc' },
    include: { teacher: true },
  });

  const levelColors: Record<string, string> = {
    'N5': '#66bb6a', 'N4': '#42a5f5', 'N3': '#ab47bc', 'N2': '#ef5350',
  };

  // Special lessons 26, 27, 28 and regular lessons 29 to 50
  const specialLessons = [26, 27, 28];
  const interactiveLessons = Array.from({ length: 50 - 29 + 1 }, (_, i) => 29 + i);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📂 Kho Giáo án</h1>
          <p className={styles.subtitle}>Giáo án lưu trữ & Bài giảng tương tác thông minh</p>
        </div>
        <Link href="/teacher/lessons/new" className={styles.addBtn}>+ Thêm giáo án DB</Link>
      </div>

      <h2 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-color)', borderBottom: '2px solid var(--primary-color)', display: 'inline-block' }}>
        ✨ Bài giảng tương tác (N4 - Minna no Nihongo)
      </h2>
      
      <div className={styles.grid}>
        {/* Special Lessons 26, 27, 28 */}
        {specialLessons.map(lessonNumber => (
          <div key={`bai${lessonNumber}`} className={styles.card} style={{ borderLeft: '4px solid #ff9800' }}>
            <div className={styles.cardTop}>
              <span className={styles.level} style={{ background: 'rgba(66, 165, 245, 0.22)', color: '#42a5f5' }}>
                N4
              </span>
              <span className={`${styles.badge} ${styles.public}`}>
                ✨ Giáo án
              </span>
            </div>
            <h3 className={styles.cardTitle}>Bài {lessonNumber}</h3>
            <p className={styles.cardLesson}>Giáo án Minna II - Bài {lessonNumber}</p>
            <div className={styles.cardFooter} style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '8px' }}>
              <a href={`/slides/bai${lessonNumber}/kanji.html`} target="_blank" rel="noreferrer" className={styles.downloadBtn} style={{ flex: 1, textAlign: 'center', background: '#ab47bc', color: 'white', border: 'none' }}>
                漢字 Kanji
              </a>
              <a href={`/slides/bai${lessonNumber}/nguphap.html`} target="_blank" rel="noreferrer" className={styles.downloadBtn} style={{ flex: 1, textAlign: 'center', background: '#42a5f5', color: 'white', border: 'none' }}>
                文法 Ngữ pháp
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <CopyLinkButton path={`/slides/bai${lessonNumber}/kanji.html`} label="Copy Kanji" style={{ flex: 1, justifyContent: 'center' }} />
                <CopyLinkButton path={`/slides/bai${lessonNumber}/nguphap.html`} label="Copy Ngữ pháp" style={{ flex: 1, justifyContent: 'center' }} />
              </div>
              <CopyLinkButton path={`/materials/bai-${lessonNumber}/print`} label="Copy Link in ấn A4" style={{ width: '100%', justifyContent: 'center' }} />
            </div>
          </div>
        ))}

        {/* Regular Lessons 29-50 */}
        {interactiveLessons.map(lessonNumber => (
          <div key={`bai${lessonNumber}`} className={styles.card} style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <div className={styles.cardTop}>
              <span className={styles.level} style={{ background: 'rgba(66, 165, 245, 0.22)', color: '#42a5f5' }}>
                N4
              </span>
              <span className={`${styles.badge} ${styles.public}`}>
                ✨ Tương tác
              </span>
            </div>
            <h3 className={styles.cardTitle}>Bài {lessonNumber}</h3>
            <p className={styles.cardLesson}>Ngữ pháp Minna II - Bài {lessonNumber}</p>
            <div className={styles.cardFooter} style={{ marginBottom: '8px' }}>
              <span className={styles.teacher}>🤖 Auto-generated</span>
              <a href={`/slides/bai${lessonNumber}/index.html`} target="_blank" rel="noreferrer" className={styles.downloadBtn}>
                ▶️ Giáo án
              </a>
            </div>
            <CopyLinkButton path={`/slides/bai${lessonNumber}/index.html`} label="Copy Link slide" style={{ width: '100%', justifyContent: 'center' }} />
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '15px', color: '#555' }}>
        📁 Tài liệu tải lên (Database)
      </h2>

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
              <div style={{ display: 'flex', gap: '8px' }}>
                {lesson.fileUrl && (
                  <a href={lesson.fileUrl} target="_blank" rel="noreferrer" className={styles.downloadBtn}>
                    📥 Tải xuống
                  </a>
                )}
                {lesson.slideUrl && (
                  <a href={lesson.slideUrl} target="_blank" rel="noreferrer" className={styles.downloadBtn} style={{ background: '#42a5f5', border: 'none', color: 'white' }}>
                    ▶️ Trình chiếu
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
