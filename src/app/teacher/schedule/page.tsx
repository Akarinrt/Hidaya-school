import { PrismaClient } from '@prisma/client';
import styles from './schedule.module.css';
import ScheduleGrid from './ScheduleGrid';

const prisma = new PrismaClient();

export default async function SchedulePage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    include: { teacher: true },
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📅 Lịch dạy theo tuần</h1>
      <p className={styles.subtitle}>Kéo thả để đổi lịch, ấn vào lịch để chỉnh sửa</p>
      <ScheduleGrid initialSchedules={schedules} />
    </div>
  );
}
