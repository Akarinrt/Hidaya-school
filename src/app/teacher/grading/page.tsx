import { PrismaClient } from '@prisma/client';
import styles from './grading.module.css';

const prisma = new PrismaClient();

export default async function GradingPage({ searchParams }: { searchParams: Promise<{ homeworkId?: string }> }) {
  const params = await searchParams;
  const where = params.homeworkId
    ? { homeworkId: params.homeworkId }
    : {};

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { submittedAt: 'desc' },
    include: {
      student: true,
      homework: true,
    },
  });

  const homeworks = await prisma.homework.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>✅ Chấm bài nộp</h1>
          <p className={styles.subtitle}>{submissions.length} bài tập đã nộp</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📭</div>
          <p>Chưa có bài nộp nào. Học viên sẽ nộp bài tại đây sau khi bạn giao bài tập.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {submissions.map(sub => (
            <div key={sub.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <div className={styles.meta}>
                  <span className={styles.student}>👨‍🎓 {sub.student.fullName}</span>
                  <span className={styles.hwTitle}>📝 {sub.homework.title}</span>
                  <span className={styles.date}>
                    {new Date(sub.submittedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {sub.content && <div className={styles.answer}>"{sub.content}"</div>}
                {sub.fileUrl && (
                  <a href={sub.fileUrl} target="_blank" rel="noreferrer" className={styles.viewFile}>
                    🖼 Xem bài nộp
                  </a>
                )}
              </div>
              <div className={styles.gradeArea}>
                {sub.status === 'GRADED' ? (
                  <div className={styles.graded}>
                    <div className={styles.score}>{sub.score}/{sub.homework.maxScore}</div>
                    <div className={styles.feedback}>💬 {sub.feedback}</div>
                    <span className={styles.gradedBadge}>✅ Đã chấm</span>
                  </div>
                ) : (
                  <form action={`/api/grade/${sub.id}`} method="POST" className={styles.gradeForm}>
                    <input name="score" type="number" placeholder="Điểm (0-100)" min={0} max={100} className={styles.scoreInput} required />
                    <textarea name="feedback" placeholder="Nhận xét của giáo viên..." className={styles.feedbackInput} rows={2} />
                    <button type="submit" className={styles.submitGrade}>💾 Chấm điểm</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
