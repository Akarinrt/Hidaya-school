import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Chưa đăng nhập' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { role: string };
    if (decoded.role !== 'TEACHER') return NextResponse.json({ message: 'Không có quyền' }, { status: 403 });

    const { text } = await req.json();
    if (!text) return NextResponse.json({ message: 'Vui lòng cung cấp văn bản' }, { status: 400 });

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      // Mock mode if no API key
      return NextResponse.json([
        { front: '先生', back: 'せんせい - Giáo viên' },
        { front: '学校', back: 'がっこう - Trường học' },
        { front: '勉強', back: 'べんきょう - Học tập' }
      ]);
    }

    const prompt = `
      Hãy đóng vai một chuyên gia ngôn ngữ Nhật. Trích xuất các Kanji hoặc Từ vựng quan trọng từ đoạn văn bản sau.
      Chỉ lấy tối đa 20 từ quan trọng nhất.
      Trả về kết quả chuẩn ĐỊNH DẠNG JSON là một mảng (array) các đối tượng (object).
      Mỗi đối tượng có 2 trường:
      - "front": Chứa từ Kanji hoặc từ vựng gốc.
      - "back": Chứa cách đọc Hiragana và Nghĩa tiếng Việt (Ví dụ: "がっこう - Trường học").

      Tuyệt đối KHÔNG trả về thêm bất kỳ văn bản nào ngoài chuỗi JSON.

      Văn bản:
      ${text}
    `;

    const aiRes = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      })
    });

    if (!aiRes.ok) {
      return NextResponse.json({ message: 'Lỗi khi gọi AI' }, { status: 500 });
    }

    const aiData = await aiRes.json();
    let resultText = aiData.choices[0].message.content;
    
    // Clean up potential markdown formatting from AI response
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(resultText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('AI Flashcard Error:', error);
    return NextResponse.json({ message: 'Lỗi xử lý', error: error.message }, { status: 500 });
  }
}
