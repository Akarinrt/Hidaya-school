export interface Question {
  id: string;
  type: 'multiple_choice';
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  level: string;
  durationMinutes: number;
  questions: Question[];
}

export const testsData: Test[] = [
  {
    id: 'n5-comprehensive',
    title: 'Bài Kiểm Tra Kiến Thức N5',
    description: 'Kiểm tra tổng hợp kiến thức cơ bản cấp độ N5 (Trợ từ, chia động từ, đọc hiểu ngắn).',
    level: 'N5',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Chon trợ từ thích hợp: わたしは スーパー（　　）行きます。',
        options: [
          { id: 'a', text: 'で' },
          { id: 'b', text: 'へ' },
          { id: 'c', text: 'を' },
          { id: 'd', text: 'が' },
        ],
        correctOptionId: 'b',
        explanation: 'Trợ từ "へ" (hoặc "に") dùng để chỉ phương hướng di chuyển (Đi đến siêu thị).',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Chia động từ: 食べる → Thể từ điển (Jisho-kei) là gì?',
        options: [
          { id: 'a', text: 'たべない' },
          { id: 'b', text: 'たべた' },
          { id: 'c', text: 'たべる' },
          { id: 'd', text: 'たべて' },
        ],
        correctOptionId: 'c',
        explanation: '食べる (Taberu) là thể từ điển (thể nguyên dạng).',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'Tình huống giao tiếp: Bạn muốn mượn bút của bạn bè. Bạn sẽ nói thế nào?',
        options: [
          { id: 'a', text: 'ペンを 貸してください。' },
          { id: 'b', text: 'ペンを 借りてください。' },
          { id: 'c', text: 'ペンを 貸しても いいですか。' },
          { id: 'd', text: 'ペンを 借りては いけません。' },
        ],
        correctOptionId: 'a',
        explanation: '貸してください (Kashite kudasai) nghĩa là "Hãy cho tôi mượn".',
      }
    ]
  },
  {
    id: 'lesson-26',
    title: 'Bài Kiểm Tra Bài 26',
    description: 'Kiểm tra mẫu câu ～んです, ～ていただけませんか, ～たらいいですか.',
    level: 'N4',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Chọn cách chia đúng với ～んです: 「明日、テストが（　　）んです。」',
        options: [
          { id: 'a', text: 'あります' },
          { id: 'b', text: 'ある' },
          { id: 'c', text: 'あった' },
          { id: 'd', text: 'あり' },
        ],
        correctOptionId: 'b',
        explanation: 'Trước んです là thể thông thường (普通形). あります → ある.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Dịch câu sau sang tiếng Nhật: "Bạn có thể chỉ cho tôi cách đi đến nhà ga được không?"',
        options: [
          { id: 'a', text: '駅の行き方を 教えても いいですか。' },
          { id: 'b', text: '駅の行き方を 教えていただけませんか。' },
          { id: 'c', text: '駅の行き方を 教えなければなりませんか。' },
          { id: 'd', text: '駅の行き方を 教えるんですか。' },
        ],
        correctOptionId: 'b',
        explanation: 'Mẫu câu ～ていただけませんか dùng để nhờ vả một cách lịch sự.',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'Điền vào chỗ trống: カメラを買いたいんですが、どこで（　　）いいですか。',
        options: [
          { id: 'a', text: '買った' },
          { id: 'b', text: '買えば' },
          { id: 'c', text: '買ったら' },
          { id: 'd', text: '買うと' },
        ],
        correctOptionId: 'c',
        explanation: 'Mẫu câu hỏi lời khuyên: Từ để hỏi + V-たら いいですか。',
      }
    ]
  },
  {
    id: 'lesson-27-part1',
    title: 'Bài Kiểm Tra Bài 27 (Nửa bài đầu)',
    description: 'Kiểm tra chia động từ khả năng (可能動詞) và phân biệt 見えます / 聞こえます.',
    level: 'N4',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Chia động từ sang thể Khả năng (可能動詞): 泳ぎます → ?',
        options: [
          { id: 'a', text: '泳がれます' },
          { id: 'b', text: '泳げます' },
          { id: 'c', text: '泳ぎられます' },
          { id: 'd', text: '泳げられます' },
        ],
        correctOptionId: 'b',
        explanation: 'Động từ nhóm 1: Đổi hàng い sang hàng え + ます. (泳ぎます → 泳げます)',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Chọn trợ từ đúng: わたしは 漢字（　　）読めます。',
        options: [
          { id: 'a', text: 'を' },
          { id: 'b', text: 'に' },
          { id: 'c', text: 'が' },
          { id: 'd', text: 'で' },
        ],
        correctOptionId: 'c',
        explanation: 'Trong câu dùng động từ khả năng, tân ngữ "を" thường được đổi thành "が".',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'Phân biệt: Ở tầng 2 có thể nghe thấy tiếng chim hót (tự lọt vào tai).',
        options: [
          { id: 'a', text: '2階から 鳥の声が 聞けます。' },
          { id: 'b', text: '2階から 鳥の声が 聞きます。' },
          { id: 'c', text: '2階から 鳥の声が 聞こえます。' },
          { id: 'd', text: '2階から 鳥の声を 聞こえます。' },
        ],
        correctOptionId: 'c',
        explanation: 'Âm thanh tự nhiên lọt vào tai dùng 聞こえます đi với trợ từ が.',
      }
    ]
  }
];
