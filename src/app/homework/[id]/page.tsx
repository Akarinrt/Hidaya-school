import { PrismaClient } from '@prisma/client';
import PublicHomeworkClient from './PublicHomeworkClient';

const prisma = new PrismaClient();

export default async function PublicHomeworkPage({ params }: { params: any }) {
  const { id } = await params;

  const hw = await prisma.homework.findUnique({
    where: { id },
    include: { teacher: { select: { fullName: true } } }
  });

  if (!hw) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
        <h1 style={{ color: '#dc2626' }}>Không tìm thấy bài tập</h1>
        <p style={{ color: '#64748b' }}>Vui lòng kiểm tra lại đường link.</p>
      </div>
    );
  }

  let questions: any[] = [];
  if (hw.quizData) {
    try { questions = JSON.parse(hw.quizData); } catch {}
  }

  return (
    <PublicHomeworkClient
      title={hw.title}
      description={hw.description || ''}
      teacherName={hw.teacher?.fullName || 'Giáo viên'}
      questions={questions}
      audioUrl={hw.audioUrl || null}
      isExam={hw.isExam || false}
      timeLimit={hw.timeLimit || null}
    />
  );
}
