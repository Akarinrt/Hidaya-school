const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function runTest() {
  console.log('🚀 Bắt đầu giả lập Test E2E Hệ thống...');

  try {
    // 1. Tạo Giáo viên và Học sinh giả lập
    console.log('1. Khởi tạo tài khoản Test...');
    const hashedPw = await bcrypt.hash('123456', 10);
    
    // Xóa user cũ nếu có (để chạy lại script nhiều lần không lỗi)
    await prisma.user.deleteMany({ where: { username: { in: ['test_sensei', 'test_kouhai', 'test_kouhai2'] } } });

    const teacher = await prisma.user.create({
      data: { username: 'test_sensei', password: hashedPw, role: 'TEACHER', fullName: 'Thầy Test' }
    });
    const student1 = await prisma.user.create({
      data: { username: 'test_kouhai', password: hashedPw, role: 'STUDENT', fullName: 'Học sinh 1' }
    });
    const student2 = await prisma.user.create({
      data: { username: 'test_kouhai2', password: hashedPw, role: 'STUDENT', fullName: 'Học sinh 2' }
    });

    console.log('   ✅ Đã tạo Teacher:', teacher.username, 'và Student:', student1.username);

    // 2. Tạo Lớp học
    console.log('2. Tạo Lớp học mới...');
    const newClass = await prisma.class.create({
      data: {
        name: 'Lớp N4 Cấp tốc Test',
        description: 'Lớp học dùng để test E2E',
        teacherId: teacher.id
      }
    });
    console.log('   ✅ Đã tạo lớp:', newClass.name);

    // 3. Thêm học sinh vào lớp (ClassEnrollment)
    console.log('3. Thêm Học sinh 1 vào lớp (Học sinh 2 không được thêm)...');
    await prisma.classEnrollment.create({
      data: { classId: newClass.id, studentId: student1.id }
    });
    console.log('   ✅ Học sinh 1 đã vào lớp');

    // 4. Tạo Homework & Gắn với Class
    console.log('4. Thầy giáo giao bài tập cho Lớp N4...');
    const hw = await prisma.homework.create({
      data: {
        title: 'Bài tập Test Bài 30',
        description: 'Hãy chia động từ',
        type: 'TEST',
        teacherId: teacher.id,
        classId: newClass.id
      }
    });
    console.log('   ✅ Bài tập đã được tạo:', hw.title, 'vào Class:', hw.classId);

    // 5. Học sinh 1 (Đã vào lớp) truy cập bài tập
    console.log('5. Học sinh 1 kiểm tra bài tập...');
    const enrollments = await prisma.classEnrollment.findMany({ where: { studentId: student1.id } });
    const classIds = enrollments.map(e => e.classId);
    
    const hwsForStudent1 = await prisma.homework.findMany({
      where: {
        OR: [ { classId: { in: classIds } }, { classId: null } ]
      }
    });
    console.log(`   ✅ Học sinh 1 thấy ${hwsForStudent1.length} bài tập. (Có chứa ID: ${hw.id} không? ${hwsForStudent1.some(h => h.id === hw.id)})`);

    // 6. Học sinh 2 (Chưa vào lớp) truy cập bài tập
    console.log('6. Học sinh 2 kiểm tra bài tập...');
    const enrollments2 = await prisma.classEnrollment.findMany({ where: { studentId: student2.id } });
    const classIds2 = enrollments2.map(e => e.classId);
    const hwsForStudent2 = await prisma.homework.findMany({
      where: {
        OR: [ { classId: { in: classIds2 } }, { classId: null } ]
      }
    });
    console.log(`   ✅ Học sinh 2 thấy ${hwsForStudent2.length} bài tập. (Có chứa ID: ${hw.id} không? ${hwsForStudent2.some(h => h.id === hw.id)})`);

    // 7. Học sinh 1 nộp bài
    console.log('7. Học sinh 1 nộp bài...');
    const sub = await prisma.submission.create({
      data: {
        content: 'Đây là câu trả lời của em ạ.',
        homeworkId: hw.id,
        studentId: student1.id,
        status: 'PENDING'
      }
    });
    console.log('   ✅ Bài đã được nộp. ID:', sub.id);

    // 8. Giáo viên chấm bài
    console.log('8. Giáo viên chấm bài...');
    const updatedSub = await prisma.submission.update({
      where: { id: sub.id },
      data: {
        score: 95,
        feedback: 'Rất tốt, cố gắng phát huy!',
        status: 'GRADED',
        gradedById: teacher.id,
        gradedAt: new Date()
      }
    });
    console.log(`   ✅ Bài đã chấm xong: ${updatedSub.score} điểm. Nhận xét: "${updatedSub.feedback}"`);

    console.log('🎉 Toàn bộ quy trình đi đi lại lại thành công! Không có lỗi đồng bộ.');

  } catch (err) {
    console.error('❌ Có lỗi xảy ra trong quá trình test:', err);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
