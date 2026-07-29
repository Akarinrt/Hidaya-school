import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId } = body;

    if (!studentId) {
      return NextResponse.json({ error: "Missing studentId" }, { status: 400 });
    }

    // Lấy thông tin học sinh
    const student = await prisma.user.findUnique({
      where: { id: studentId, role: "STUDENT" },
      include: {
        submissions: {
          include: { homework: true },
          orderBy: { submittedAt: 'desc' },
          take: 5
        },
        vocabScores: {
          orderBy: { playedAt: 'desc' },
          take: 5
        }
      }
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Format data để gửi cho AI
    let contextData = `Học sinh: ${student.fullName}\n`;
    contextData += `Lịch sử làm bài tập gần đây:\n`;
    student.submissions.forEach(sub => {
      contextData += `- Bài: ${sub.homework.title} | Điểm: ${sub.score || 'Chưa chấm'}/${sub.homework.maxScore} | Phản hồi: ${sub.feedback || 'Không có'}\n`;
    });
    contextData += `Lịch sử luyện từ vựng:\n`;
    student.vocabScores.forEach(vs => {
      contextData += `- Danh mục: ${vs.category} | Điểm: ${vs.score}/${vs.total}\n`;
    });

    // Mô phỏng gọi DeepSeek API (Vì chưa có API Key thực tế trong .env)
    // Nếu có API Key thực tế:
    // const res = await fetch('https://api.deepseek.com/v1/chat/completions', { ... })
    console.log("Gửi Data cho DeepSeek:", contextData);
    
    // Giả lập độ trễ của API AI
    await new Promise(resolve => setTimeout(resolve, 2000));

    const simulatedAIResponse = {
      weaknesses: "Dựa trên dữ liệu, học sinh có điểm số từ vựng (Bài 46, 47) khá thấp (dưới 50%). Điểm ngữ pháp bài tập cũng thường xuyên sai ở các mẫu câu Sai Khiến (Bài 48). Khả năng ghi nhớ từ vựng chữ Hán yếu.",
      advice: "Cần tăng cường luyện tập từ vựng chữ Hán qua flashcard. Yêu cầu học sinh ôn lại bảng chia Động từ thể Sai Khiến (Nhóm 1 và 2) và làm các bài tập phân biệt Tự Động Từ - Tha Động Từ.",
      testCreated: true,
      questions: [
        { q: "Mẹ bắt con ăn rau (野菜を ___).", options: ["食べます", "食べさせます", "食べられます"], ans: 1 },
        { q: "Giám đốc đã về (社長は もう お帰り ___).", options: ["しました", "になりました", "されました"], ans: 1 },
      ]
    };

    // Lưu kết quả phân tích vào DB
    const analysis = await prisma.aIAnalysis.create({
      data: {
        studentId: student.id,
        weaknesses: simulatedAIResponse.weaknesses,
        advice: simulatedAIResponse.advice,
        testCreated: simulatedAIResponse.testCreated
      }
    });

    return NextResponse.json({
      analysis,
      suggestedQuestions: simulatedAIResponse.questions
    });

  } catch (error) {
    console.error("Lỗi AI Analysis:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
