import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { testsData } from "@/data/tests";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch all classes in the database
    const classes = await prisma.class.findMany();
    if (classes.length === 0) {
      return NextResponse.json({ error: "Chưa có lớp học nào trong hệ thống để gán bài tập." }, { status: 400 });
    }

    // 2. Fetch the first teacher in the database
    const teacher = await prisma.user.findFirst({
      where: { role: "TEACHER" }
    });
    if (!teacher) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản Giáo viên nào." }, { status: 400 });
    }

    // 3. Define homework and tests to seed
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
      }
    ];

    let createdCount = 0;

    // 4. Loop through each class and seed the items
    for (const cls of classes) {
      for (const item of itemsToSeed) {
        const sourceTest = testsData.find(t => t.id === item.sourceTestId);
        if (!sourceTest) continue;

        // Check if this homework/test already exists for this class
        const existing = await prisma.homework.findFirst({
          where: {
            classId: cls.id,
            title: item.title
          }
        });

        if (!existing) {
          await prisma.homework.create({
            data: {
              title: item.title,
              description: item.description,
              type: item.type,
              maxScore: 100,
              isPublished: true,
              classId: cls.id,
              teacherId: teacher.id,
              deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days deadline
              quizData: JSON.stringify(sourceTest.questions)
            }
          });
          createdCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã khởi tạo thành công ${createdCount} bài tập/bài kiểm tra cho ${classes.length} lớp học.`,
      classesCount: classes.length,
      seededItemsCount: createdCount
    });
  } catch (error: any) {
    console.error("Lỗi khi seed bài tập:", error);
    return NextResponse.json({ error: error.message || "Lỗi server" }, { status: 500 });
  }
}
