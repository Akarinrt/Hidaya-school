const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

function loadTestsData() {
  const tsPath = path.join(__dirname, '../src/data/tests.ts');
  if (!fs.existsSync(tsPath)) {
    return [];
  }
  let tsContent = fs.readFileSync(tsPath, 'utf8');
  const lines = tsContent.split('\n');
  // Slice out the first 28 lines of interface definitions
  const cleanLines = lines.slice(28);
  let jsContent = cleanLines.join('\n');
  
  // Replace export const testsData: Test[] = with module.exports =
  jsContent = jsContent.replace(/export\s+const\s+testsData\s*:\s*\w+\[\]\s*=\s*/, 'module.exports = ');
  jsContent = jsContent.replace(/:\s*Question\[\]/g, '');
  jsContent = jsContent.replace(/as\s+const/g, '');
  
  const tempPath = path.join(__dirname, 'temp_tests.js');
  fs.writeFileSync(tempPath, jsContent);
  let data = [];
  try {
    data = require(tempPath);
    fs.unlinkSync(tempPath);
  } catch (e) {
    console.error("Error parsing tests.ts inside seed.js:", e);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
  return data;
}

async function main() {
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  const teacher = await prisma.user.upsert({
    where: { username: 'teacher' },
    update: { fullName: 'Giáo viên Hồng Khương' },
    create: { username: 'teacher', password: teacherPassword, role: 'TEACHER', fullName: 'Giáo viên Hồng Khương', email: 'teacher@hidaya.edu.vn' },
  });

  const student = await prisma.user.upsert({
    where: { username: 'student' },
    update: {},
    create: { username: 'student', password: studentPassword, role: 'STUDENT', fullName: 'Nguyễn Văn A', email: 'student@hidaya.edu.vn' },
  });

  // Default Class
  const defaultClass = await prisma.class.upsert({
    where: { id: 'default-class-id' },
    update: {},
    create: {
      id: 'default-class-id',
      name: 'Lớp N4 - Sáng T3/5',
      description: 'Lớp học N4 Minna no Nihongo nâng cao',
      teacherId: teacher.id
    }
  });

  // Enroll student
  await prisma.classEnrollment.upsert({
    where: {
      classId_studentId: {
        classId: defaultClass.id,
        studentId: student.id
      }
    },
    update: {},
    create: {
      classId: defaultClass.id,
      studentId: student.id
    }
  });

  // Schedules
  const existingSchedules = await prisma.schedule.count();
  if (existingSchedules === 0) {
    const days = [
      { title: 'Lớp N4 - Thứ 2', dayOfWeek: 1, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#ff9800' },
      { title: 'Lớp N4 - Thứ 4', dayOfWeek: 3, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#ff9800' },
      { title: 'Lớp N5 - Thứ 3', dayOfWeek: 2, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#2196f3' },
      { title: 'Lớp N5 - Thứ 5', dayOfWeek: 4, startTime: '18:00', endTime: '20:00', location: 'Phòng học Online', color: '#2196f3' },
    ];
    for (const d of days) await prisma.schedule.create({ data: { ...d, teacherId: teacher.id } });
  }

  // Lesson plans with slideUrl
  const existingPlans = await prisma.lessonPlan.count();
  if (existingPlans === 0) {
    const plans = [
      { title: 'Ngữ pháp Bài 26 - Thể Khả Năng', lesson: 'Bài 26', level: 'N4', isPublic: true, slideUrl: '/slides/bai26/nguphap.html' },
      { title: 'Kanji Bài 26', lesson: 'Bài 26', level: 'N4', isPublic: true, slideUrl: '/slides/bai26/kanji.html' },
      { title: 'Ngữ pháp Bài 27 - Thể Điều Kiện', lesson: 'Bài 27', level: 'N4', isPublic: true, slideUrl: '/slides/bai27/nguphap.html' },
      { title: 'Kanji Bài 27', lesson: 'Bài 27', level: 'N4', isPublic: true, slideUrl: '/slides/bai27/kanji.html' },
      { title: 'Ngữ pháp Bài 28 - Thể Bị Động', lesson: 'Bài 28', level: 'N4', isPublic: true, slideUrl: '/slides/bai28/nguphap.html' },
      { title: 'Kanji Bài 28', lesson: 'Bài 28', level: 'N4', isPublic: true, slideUrl: '/slides/bai28/kanji.html' },
      { title: 'Ôn tập tổng hợp N5', lesson: 'Tổng ôn', level: 'N5', isPublic: true, slideUrl: '/slides/ontap_n5/ontap_n5.html' },
    ];
    for (const p of plans) await prisma.lessonPlan.create({ data: { ...p, teacherId: teacher.id } });
  }

  // Load testsData dynamically
  const testsData = loadTestsData();

  // Homework & Tests
  const existingHw = await prisma.homework.count();
  if (existingHw <= 2) { // Seed if database is clean or contains only old simple seed homeworks
    // Delete existing simple seed homeworks to rebuild them cleanly with class association
    await prisma.homework.deleteMany({
      where: { classId: null }
    });

    const itemsToSeed = [
      {
        slug: "lesson-26-quiz",
        title: "Bài kiểm tra trắc nghiệm Bài 26",
        description: "Kiểm tra kiến thức ngữ pháp thể thông thường + んです, ていただけませんか.",
        type: "TEST",
        sourceTestId: "lesson-26",
      },
      {
        slug: "lesson-27-part1-quiz",
        title: "Bài kiểm tra trắc nghiệm Bài 27 (Nửa bài đầu)",
        description: "Kiểm tra chia động từ thể khả năng và cấu trúc câu khả năng.",
        type: "TEST",
        sourceTestId: "lesson-27-part1",
      },
      {
        slug: "lesson-27-part2-quiz",
        title: "Bài kiểm tra trắc nghiệm Bài 27 (Nửa bài sau)",
        description: "Kiểm tra kiến thức miemasu, kikoemasu, shika...masen.",
        type: "TEST",
        sourceTestId: "lesson-27-part2",
      },
      {
        slug: "lesson-27-workbook-hw",
        title: "Bài tập về nhà Bài 27 (Trọn bộ Mondai & Renshuu)",
        description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 27: Điền trợ từ, viết lại câu với しか, thể khả năng.",
        type: "HOMEWORK",
        sourceTestId: "lesson-27-part2-hw",
      },
      {
        slug: "lesson-28-quiz",
        title: "Bài kiểm tra trắc nghiệm Bài 28",
        description: "Kiểm tra ngữ pháp cấu trúc ながら, ています, và し.",
        type: "TEST",
        sourceTestId: "lesson-28",
      },
      {
        slug: "lesson-28-workbook-hw",
        title: "Bài tập về nhà Bài 28 (Trọn bộ Mondai & Renshuu)",
        description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 28: Cấu trúc ながら, ています, し, và trạng từ liên kết.",
        type: "HOMEWORK",
        sourceTestId: "lesson-28-hw",
      }
    ];

    for (const item of itemsToSeed) {
      const sourceTest = testsData.find(t => t.id === item.sourceTestId);
      if (!sourceTest) continue;

      await prisma.homework.create({
        data: {
          title: item.title,
          description: item.description,
          type: item.type,
          maxScore: 100,
          isPublished: true,
          classId: defaultClass.id,
          teacherId: teacher.id,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          quizData: JSON.stringify(sourceTest.questions)
        }
      });
    }
  }

  // Welcome notification for student
  const existingNotif = await prisma.notification.count();
  if (existingNotif === 0) {
    await prisma.notification.create({
      data: { title: '🎉 Chào mừng đến Hidaya School!', body: 'Tài khoản của bạn đã được kích hoạt. Hãy bắt đầu học ngay nhé!', type: 'INFO', userId: student.id }
    });
    await prisma.notification.create({
      data: { title: '📝 Bài tập mới: Bài 28', body: 'Giáo viên vừa giao bài tập về nhà Bài 28. Hạn nộp: 7 ngày.', type: 'HOMEWORK', link: '/student/homework', userId: student.id }
    });
  }

  // Welcome message
  const existingMsg = await prisma.message.count();
  if (existingMsg === 0) {
    await prisma.message.create({
      data: { content: 'Xin chào! Chào mừng bạn đến với Hidaya School. Nếu có câu hỏi gì hãy nhắn tin cho tôi nhé! 😊', senderId: teacher.id, receiverId: student.id }
    });
  }

  // Seeding Flashcards
  const vocabDecks = [
    {
      title: "Từ vựng Bài 26: Thể thông thường + んです",
      cards: [
        { front: "診ます (みます)", back: "xem, khám (bệnh)" },
        { front: "探します (さがします)", back: "tìm, tìm kiếm" },
        { front: "遅れます (おくれます)", back: "trễ, muộn (giờ)" },
        { front: "間に合います (まにあいます)", back: "kịp (giờ)" },
        { front: "やります", back: "làm" },
        { front: "拾います (ひろいます)", back: "nhặt được, lượm" },
        { front: "連絡します (れんらくします)", back: "liên lạc" },
        { front: "ずいぶん", back: "cực kỳ, khá là" },
        { front: "直接 (ちょくせつ)", back: "trực tiếp" },
        { front: "いつでも", back: "bất kỳ lúc nào" },
        { front: "どこدهも", back: "bất kỳ nơi đâu" },
        { front: "だれでも", back: "bất kỳ ai" },
        { front: "何でも (なんでも)", back: "bất kỳ cái gì" },
        { front: "こんな", back: "như thế này" },
        { front: "そんな", back: "như thế đó" },
        { front: "あんな", back: "như thế kia" }
      ]
    },
    {
      title: "Từ vựng Bài 27: Thể khả năng & Chỉ",
      cards: [
        { front: "飼います (かいます)", back: "nuôi (động vật)" },
        { front: "建てます (たてます)", back: "xây dựng" },
        { front: "走ります (はしります)", back: "chạy" },
        { front: "見えます (みえます)", back: "nhìn thấy, có thể nhìn thấy" },
        { front: "聞こえます (きこえます)", back: "nghe thấy, có thể nghe thấy" },
        { front: "できます", back: "hoàn thành, có thể làm" },
        { front: "開きます (ひらきます)", back: "mở, tổ chức (lớp học)" },
        { front: "ペット", back: "thú cưng" },
        { front: "鳥 (とり)", back: "chim" },
        { front: "声 (こえ)", back: "tiếng, giọng nói" },
        { front: "波 (なみ)", back: "sóng" },
        { front: "花火 (はなび)", back: "pháo hoa" },
        { front: "道具 (どうぐ)", back: "dụng cụ, công cụ" },
        { front: "クリーニング", back: "giặt là" },
        { front: "マンション", back: "căn hộ chung cư" },
        { front: "キッチン", back: "nhà bếp" }
      ]
    },
    {
      title: "Từ vựng Bài 28: Vừa... vừa & Thói quen",
      cards: [
        { front: "売れます (うれます) [パンが~]", back: "bán chạy, bán được (bánh mì)" },
        { front: "踊ります (おどります)", back: "nhảy, khiêu vũ" },
        { front: "かみます", back: "nhai, cắn" },
        { front: "選びます (えらびます)", back: "chọn, lựa chọn" },
        { front: "違います (ちがいます)", back: "khác, khác biệt" },
        { front: "通います (かよいます) [大学に~]", back: "đi học, đi làm (đi đi về về) [trường đại học]" },
        { front: "まじめ [na]", back: "nghiêm túc, ngoan ngoãn" },
        { front: "熱心 (ねっしん) [na]", back: "nhiệt tình, nhiệt huyết" },
        { front: "優しい (やさしい)", back: "hiền lành, dịu dàng, tốt bụng" },
        { front: "偉い (えらい)", back: "vĩ đại, giỏi giang" },
        { front: "習慣 (しゅうかん)", back: "thói quen, tập quán" },
        { front: "経験 (けいけん)", back: "kinh nghiệm" },
        { front: "力 (ちから)", back: "sức mạnh, lực" },
        { front: "人気 (にんき) [が あります]", back: "được yêu thích, phổ biến" },
        { front: "値段 (ねだん)", back: "giá cả, giá tiền" },
        { front: "給料 (きゅうりょう)", back: "lương" },
        { front: "番組 (ばんぐみ)", back: "chương trình (TV)" },
        { front: "歌手 (かしゅ)", back: "ca sĩ" }
      ]
    }
  ];

  vocabDecks[0].cards[10].front = "どこでも";

  for (const d of vocabDecks) {
    const existing = await prisma.flashcardDeck.findFirst({
      where: { title: d.title, classId: defaultClass.id }
    });
    if (!existing) {
      const createdDeck = await prisma.flashcardDeck.create({
        data: {
          title: d.title,
          classId: defaultClass.id,
        }
      });
      for (const card of d.cards) {
        await prisma.flashcardCard.create({
          data: {
            front: card.front,
            back: card.back,
            deckId: createdDeck.id
          }
        });
      }
    }
  }

  // ── Migration: replace "Thể từ điển" → "Thể thường" in all homework quizData ──
  const allHomework = await prisma.homework.findMany({ select: { id: true, quizData: true } });
  let migratedCount = 0;
  for (const hw of allHomework) {
    if (!hw.quizData) continue;
    if (!hw.quizData.includes('Thể từ điển') && !hw.quizData.includes('thể từ điển')) continue;
    const updated = hw.quizData
      .replace(/Thể từ điển/g, 'Thể thường')
      .replace(/thể từ điển/g, 'thể thường');
    await prisma.homework.update({ where: { id: hw.id }, data: { quizData: updated } });
    migratedCount++;
  }
  if (migratedCount > 0) console.log(`✅ Migrated ${migratedCount} homework(s): "Thể từ điển" → "Thể thường"`);

  console.log('✅ Database seeded successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
