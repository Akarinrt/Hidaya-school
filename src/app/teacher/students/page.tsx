import { PrismaClient } from '@prisma/client';
import styles from './students.module.css';
import ClassManager from './ClassManager';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export default async function StudentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  // In a real app we'd decode token. For now let's find a mock teacher
  let currentUser = await prisma.user.findFirst({ where: { role: 'TEACHER' } });

  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👥 Quản lý Lớp học & Điểm danh</h1>
      {currentUser && (
        <ClassManager currentUser={currentUser} initialStudents={students} />
      )}
    </div>
  );
}
