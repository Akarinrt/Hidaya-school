import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import StudentDashboardClient from './StudentDashboardClient';
import { redirect } from 'next/navigation';
import { getJwtSecret } from '@/lib/auth';

export default async function StudentDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) redirect('/login');
  
  let studentId = '';
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };
    if (decoded.role !== 'STUDENT') redirect('/login');
    studentId = decoded.id;
  } catch {
    redirect('/login');
  }

  return (
    <div style={{ padding: '20px' }}>
      <StudentDashboardClient studentId={studentId} />
    </div>
  );
}
