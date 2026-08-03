import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function StudentClassesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/login');
  
  let studentId = '';
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { id: string };
    studentId = decoded.id;
  } catch {
    redirect('/login');
  }

  const enrollments = await prisma.classEnrollment.findMany({
    where: { studentId },
    include: { class: { include: { teacher: true } } }
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>🏫 Các lớp học của tôi</h1>
      
      {enrollments.length === 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Bạn chưa được xếp vào lớp học nào.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {enrollments.map(e => (
            <Link key={e.classId} href={`/student/class/${e.classId}`} style={{ textDecoration: 'none' }}>
              <div className="card hover-scale" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
                  🎓
                </div>
                <div style={{ padding: '20px', flex: 1 }}>
                  <h2 style={{ margin: '0 0 10px 0', color: 'var(--text-main)', fontSize: '20px' }}>{e.class.name}</h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>👨‍🏫 GV: {e.class.teacher?.fullName}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
