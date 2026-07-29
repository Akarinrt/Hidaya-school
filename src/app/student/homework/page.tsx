import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import styles from './homework.module.css';

const prisma = new PrismaClient();

async function getStudentId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try { return (jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string }).id; }
  catch { return null; }
}

export default async function StudentHomeworkPage() {
  const studentId = await getStudentId();
  const homeworks = await prisma.homework.findMany({
    where: { isPublished: true },
    orderBy: { deadline: 'asc' },
    include: {
      submissions: studentId ? { where: { studentId } } : false,
      teacher: true,
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📝 Bài tập & Kiểm tra</h1>
      <p className={styles.subtitle}>Nộp bài và xem kết quả chấm điểm</p>
      <div className={styles.list}>
        {homeworks.map((hw: any) => {
          const submission = hw.submissions?.[0];
          const isOverdue = hw.deadline && new Date(hw.deadline) < new Date();
          return (
            <div key={hw.id} className={`${styles.card} ${hw.type === 'TEST' ? styles.testCard : ''}`}>
              <div className={styles.cardTop}>
                <span className={hw.type === 'TEST' ? styles.testBadge : styles.hwBadge}>
                  {hw.type === 'TEST' ? '📋 Kiểm tra' : '📝 Bài tập'}
                </span>
                {submission ? (
                  <span className={submission.status === 'GRADED' ? styles.graded : styles.submitted}>
                    {submission.status === 'GRADED' ? `✅ Đã chấm: ${submission.score}đ` : '🕐 Đã nộp - chờ chấm'}
                  </span>
                ) : (
                  <span className={isOverdue ? styles.overdue : styles.pending}>
                    {isOverdue ? '⚠️ Quá hạn' : '⏳ Chưa nộp'}
                  </span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{hw.title}</h3>
              {hw.description && <p className={styles.cardDesc}>{hw.description}</p>}
              {hw.deadline && (
                <p className={`${styles.deadline} ${isOverdue ? styles.overdueTxt : ''}`}>
                  📅 Hạn nộp: {new Date(hw.deadline).toLocaleDateString('vi-VN')}
                </p>
              )}
              {submission?.feedback && (
                <div className={styles.feedback}>
                  💬 Nhận xét GV: <span>{submission.feedback}</span>
                </div>
              )}
              {!submission && studentId && (
                <form action={`/api/submit/${hw.id}`} method="POST" className={styles.submitForm} encType="multipart/form-data">
                  <textarea name="content" placeholder="Nhập câu trả lời của bạn..." className={styles.textarea} rows={3} />
                  <button type="submit" className={styles.submitBtn}>
                    {hw.type === 'TEST' ? '🚀 Nộp bài kiểm tra' : '📤 Nộp bài tập'}
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
