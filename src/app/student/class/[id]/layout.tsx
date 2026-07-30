import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ClassTabs from './ClassTabs';

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
        <div style={{ position: 'absolute', right: '30px', top: '20px', fontSize: '80px', opacity: 0.2 }}>🏫</div>
      </div>

      {/* Dynamic Tabs */}
      <ClassTabs classId={id} />

      <div>
        {children}
      </div>
    </div>
  );
}
