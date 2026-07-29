import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string };
    if (decoded.role !== 'TEACHER') {
      return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });
    }

    const { studentId } = await req.json();
    if (!studentId) return NextResponse.json({ message: 'Thiếu studentId' }, { status: 400 });

    // 1. Thu thập dữ liệu học viên
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        attendances: true,
        submissions: {
          include: { homework: true }
        }
      }
    });

    if (!student) return NextResponse.json({ message: 'Không tìm thấy học viên' }, { status: 404 });

    // Tính toán thống kê
    let present = 0, late = 0, absent = 0;
    student.attendances.forEach(a => {
      if (a.status === 'PRESENT') present++;
      if (a.status === 'LATE') late++;
      if (a.status === 'ABSENT') absent++;
    });

    const homeworkCount = student.submissions.length;
    const gradedCount = student.submissions.filter(s => s.status === 'GRADED').length;
    const avgScore = gradedCount > 0 
      ? student.submissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedCount 
      : 0;

    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    // Nếu chưa có API Key, dùng Mock Data
    if (!apiKey || apiKey === 'your_key_here') {
      const mockResult = `### Phân tích Học viên: ${student.fullName} (AI Giả lập)
- **Chuyên cần**: Học viên có ${absent} buổi vắng và ${late} buổi đi muộn. Cần cải thiện thái độ đi học đúng giờ.
- **Điểm số**: Điểm trung bình là ${Math.round(avgScore)}/100.
- **Đánh giá & Đề xuất**:
  - Học sinh có vẻ đang gặp khó khăn ở các bài kiểm tra gần đây.
  - Giáo viên nên giao thêm bài tập phụ đạo phần Kanji hoặc Ngữ pháp cơ bản.
*(Lưu ý: Đây là dữ liệu AI giả lập do bạn chưa điền DEEPSEEK_API_KEY trong file .env)*`;
      
      return NextResponse.json({ analysis: mockResult });
    }

    // 2. Nếu có API Key, gọi DeepSeek API
    const prompt = `
Bạn là một chuyên gia giáo dục phân tích dữ liệu học sinh. Dưới đây là thông tin của học viên tiếng Nhật:
Tên học sinh: ${student.fullName}
Số buổi học có mặt: ${present}
Số buổi học đi muộn: ${late}
Số buổi học vắng mặt: ${absent}
Số bài tập đã nộp: ${homeworkCount} (Đã chấm ${gradedCount})
Điểm số trung bình: ${avgScore.toFixed(1)} / 100

Dựa vào dữ liệu trên, hãy viết một báo cáo phân tích ngắn gọn gọn (khoảng 3-4 gạch đầu dòng) bằng tiếng Việt, bao gồm:
1. Nhận xét thái độ học tập (chuyên cần).
2. Nhận xét năng lực (dựa trên điểm số).
3. Đưa ra lời khuyên cho giáo viên nên làm gì tiếp theo với học viên này.
`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful education assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const aiData = await response.json();
    
    if (aiData.choices && aiData.choices.length > 0) {
      return NextResponse.json({ analysis: aiData.choices[0].message.content });
    } else {
      return NextResponse.json({ message: 'Lỗi từ API DeepSeek', details: aiData }, { status: 500 });
    }

  } catch (error: any) {
    console.error('AI Analysis error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ', error: error.message }, { status: 500 });
  }
}
