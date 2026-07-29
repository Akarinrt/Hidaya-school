import { PrismaClient } from '@prisma/client';
import StudentProfileView from './StudentProfileView';

const prisma = new PrismaClient();

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const student = await prisma.user.findUnique({
    where: { id },
    include: {
      attendances: true,
      submissions: {
        include: { homework: true }
      }
    }
  });

  if (!student) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Không tìm thấy học viên</div>;
  }

  return (
    <div>
      <StudentProfileView student={student} />
    </div>
  );
}
