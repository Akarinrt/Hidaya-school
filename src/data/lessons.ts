export interface Lesson {
  id: string;
  title: string;
  level: string;
  content: string;
}

export const LESSONS_DATA: Record<string, Lesson> = {};

const titles: Record<number, string> = {
    28: "Vừa làm V1 vừa làm V2 (～ながら)",
    29: "Tự động từ & V-てしまいます",
    30: "Tha động từ (～てあります) & V-ておきます",
    31: "Thể ý định (～よう) & Dự định",
    32: "Lời khuyên & Phỏng đoán (～でしょう)",
    33: "Thể mệnh lệnh, Cấm chỉ & Truyền đạt",
    34: "Theo như (～とおりに) & Sau khi",
    35: "Thể điều kiện (～ば, ～なら)",
    36: "Mục đích (～ように) & Sự thay đổi",
    37: "Thể bị động (～れます / ～られます)",
    38: "Danh từ hóa (～のは / ～のが)",
    39: "Nguyên nhân, lý do (～て / ～ので)",
    40: "Câu hỏi lồng ghép (～か) & Thử làm (～てみます)",
    41: "Cho nhận Kính ngữ (いただきます)",
    42: "Mục đích (～ために) & Mục đích sử dụng",
    43: "Trông có vẻ (～そうです) & Đi rồi về",
    44: "Quá mức (～すぎます) & Dễ/Khó (～やすい)",
    45: "Trường hợp (～場合は) & Mặc dù (～のに)",
    46: "Vừa mới (～ところです) & Chắc chắn (～はず)",
    47: "Nghe nói (～そうです) & Hình như (～ようです)",
    48: "Thể sai khiến (～せます / ～させます)",
    49: "Tôn kính ngữ (そんけいご)",
    50: "Khiêm nhường ngữ (けんじょうご)"
};

// Generate lessons 1 to 50
for (let i = 1; i <= 50; i++) {
  const id = `bai-${i}`;
  const level = i <= 25 ? 'N5' : 'N4';
  
  let title = `Bài ${i}`;
  if (titles[i]) {
      title = `Bài ${i} – ${titles[i]}`;
  } else if (i === 26 || i === 27) {
      title = `Bài ${i} – Ngữ pháp N4`;
  } else {
      title = `Bài ${i} – Nội dung đang cập nhật`;
  }

  LESSONS_DATA[id] = {
    id,
    title,
    level,
    content: 'Nhấn vào để xem chi tiết giáo án và giải thích ngữ pháp.'
  };
}