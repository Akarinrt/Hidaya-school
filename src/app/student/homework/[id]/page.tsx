import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import QuizTaker from './QuizTaker';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

async function getStudentId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try { return (jwt.verify(token, getJwtSecret()) as { id: string }).id; }
  catch { return null; }
}

export default async function HomeworkDetailPage({ params }: { params: any }) {
  const { id } = await params;
  const studentId = await getStudentId();
  if (!studentId) return <div>Vui lòng đăng nhập</div>;

  const hw = await prisma.homework.findUnique({
    where: { id },
    include: {
      teacher: true,
      submissions: { where: { studentId } }
    }
  });

  if (!hw) return <div>Không tìm thấy bài tập</div>;

  const submission = hw.submissions[0];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{hw.title} {hw.isExam ? '⏱️ (Thi thử JLPT)' : ''}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{hw.description}</p>
      
      {submission ? (
        <div className="card" style={{ padding: '20px', background: 'var(--success-bg)', borderLeft: '5px solid var(--success)' }}>
          <h3>✅ Bạn đã nộp bài</h3>
          <p>Điểm số: {submission.score !== null ? `${submission.score} / ${hw.maxScore}` : 'Đang chờ chấm'}</p>
          {submission.feedback && <p>Nhận xét: {submission.feedback}</p>}
        </div>
      ) : (
        <div className="card" style={{ padding: '20px', position: 'relative' }}>
          {hw.quizData ? (
            <QuizTaker 
              hwId={hw.id} 
              quizData={hw.quizData} 
              maxScore={hw.maxScore} 
              timeLimit={hw.timeLimit} 
              audioUrl={hw.audioUrl} 
              isExam={hw.isExam}
            />
          ) : (
            <form action={`/api/submit/${hw.id}`} method="POST">
              <textarea name="content" placeholder="Nhập câu trả lời..." style={{ width: '100%', padding: '10px', height: '100px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} required />
              <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📤 Nộp bài</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
