import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function ClassLayout({ children, params }: { children: React.ReactNode, params: any }) {
  const { id } = await params;
  
  const classData = await prisma.class.findUnique({
    where: { id }
  });

  if (!classData) return <div>Không tìm thấy Lớp học</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', color: 'white', padding: '40px 30px', borderRadius: '16px', marginBottom: '20px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '32px' }}>{classData.name}</h1>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>Không gian học tập & rèn luyện tiếng Nhật</p>
        <div style={{ position: 'absolute', right: '30px', top: '20px', fontSize: '80px', opacity: 0.2 }}>🎓</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', borderBottom: '2px solid var(--border)' }}>
        <Link href={`/student/class/${id}`} style={{ padding: '12px 24px', fontWeight: 'bold', color: 'var(--text-main)', textDecoration: 'none', borderBottom: '3px solid var(--primary)' }}>
          🏠 Bảng tin
        </Link>
        <Link href={`/student/class/${id}/homework`} style={{ padding: '12px 24px', fontWeight: 'bold', color: 'var(--text-muted)', textDecoration: 'none' }}>
          📝 Bài tập
        </Link>
        <Link href={`/student/class/${id}/resources`} style={{ padding: '12px 24px', fontWeight: 'bold', color: 'var(--text-muted)', textDecoration: 'none' }}>
          📚 Tài liệu
        </Link>
        <Link href={`/student/class/${id}/flashcards`} style={{ padding: '12px 24px', fontWeight: 'bold', color: 'var(--text-muted)', textDecoration: 'none' }}>
          🃏 Từ vựng
        </Link>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
