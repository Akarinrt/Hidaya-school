const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  const teacher = await prisma.user.upsert({
    where: { username: 'teacher' },
    update: {},
    create: {
      username: 'teacher',
      password: teacherPassword,
      role: 'TEACHER',
      fullName: 'Giáo viên Hồng Khuông',
      email: 'teacher@hidaya.edu.vn',
    },
  });

  await prisma.user.upsert({
    where: { username: 'student' },
    update: {},
    create: {
      username: 'student',
      password: studentPassword,
      role: 'STUDENT',
      fullName: 'Nguyễn Văn A',
      email: 'student@hidaya.edu.vn',
    },
  });

  // Seed weekly schedule
  const days = [
    { title: 'Lớp N4 - Thứ 2', dayOfWeek: 1, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#ff9800' },
    { title: 'Lớp N4 - Thứ 4', dayOfWeek: 3, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#ff9800' },
    { title: 'Lớp N5 - Thứ 3', dayOfWeek: 2, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#2196f3' },
    { title: 'Lớp N5 - Thứ 5', dayOfWeek: 4, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#2196f3' },
  ];

  for (const d of days) {
    await prisma.schedule.create({
      data: { ...d, teacherId: teacher.id }
    });
  }

  // Seed lesson plans
  const plans = [
    { title: 'Ngữ pháp Bài 26 - Thể Khả Năng', lesson: 'Bài 26', level: 'N4', isPublic: true },
    { title: 'Ngữ pháp Bài 27 - Thể Điều Kiện', lesson: 'Bài 27', level: 'N4', isPublic: true },
    { title: 'Ngữ pháp Bài 28 - Thể Bị Động', lesson: 'Bài 28', level: 'N4', isPublic: true },
    { title: 'Ôn tập tổng hợp N5', lesson: 'Tổng ôn', level: 'N5', isPublic: true },
  ];

  for (const p of plans) {
    await prisma.lessonPlan.create({
      data: { ...p, teacherId: teacher.id }
    });
  }

  // Seed homework
  await prisma.homework.create({
    data: {
      title: 'Bài tập Bài 28 - Chia động từ',
      description: 'Chia các động từ sau sang thể bị động và thể sai khiến bị động.',
      type: 'HOMEWORK',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      teacherId: teacher.id,
    }
  });

  await prisma.homework.create({
    data: {
      title: 'Kiểm tra giữa kỳ N4 - Bài 26-28',
      description: 'Kiểm tra ngữ pháp và từ vựng từ Bài 26 đến Bài 28.',
      type: 'TEST',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      teacherId: teacher.id,
    }
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
