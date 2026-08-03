export interface Lesson {
  id: string;
  title: string;
  level: string;
  content: string;
}

export const LESSONS_DATA: Record<string, Lesson> = {};

const titles: Record<number, string> = {
    26: "Thể thông thường + んです/ので",
    27: "Thể khả năng (～られます) & 見えます/聞こえます",
    28: "Vừa làm V1 vừa làm V2 (～ながら) & Thói quen",
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

// Tóm tắt nội dung chính của từng bài (lấy từ giáo án Minna no Nihongo II)
const contents: Record<number, string> = {
    26: "Học cách dùng thể thông thường kết hợp với んです (giải thích lý do, nhấn mạnh) và ので (nêu nguyên nhân, lý do lịch sự).",
    27: "Học cách chia động từ thể khả năng (～られます, ～けます, ～できます) và cách dùng 見えます (nhìn thấy), 聞こえます (nghe thấy), できます (có thể, được xây dựng).",
    28: "Học cấu trúc V1ます-form + ながら + V2 (vừa làm V1 vừa làm V2), Vて います (thói quen) và plain form + し、～ (liệt kê lý do).",
    29: "Học sự khác biệt giữa tự động từ (自動詞) và tha động từ (他動詞), cấu trúc Nが V(自動詞) て います (trạng thái) và Vて しまいました (hoàn thành/tiếc nuối).",
    30: "Học tha động từ với ～てあります (trạng thái kết quả của hành động có chủ ý) và Vて おきます (chuẩn bị trước).",
    31: "Học thể ý định ～よう (hãy cùng làm) và cách diễn đạt dự định với ～つもりです, ～予定です.",
    32: "Học cách đưa ra lời khuyên với ～たほうがいいです và phỏng đoán với ～でしょう.",
    33: "Học thể mệnh lệnh (～なさい), thể cấm chỉ (～な) và cách truyền đạt lời nói (～と言っていました).",
    34: "Học cấu trúc ～とおりに (theo như) và ～てから (sau khi làm gì).",
    35: "Học thể điều kiện ～ば và ～なら (nếu như) cùng cách dùng trong câu điều kiện.",
    36: "Học mục đích với ～ように (để mà) và sự thay đổi với ～ようになる/～ようになった (trở nên có thể).",
    37: "Học thể bị động ～れます/～られます (bị làm gì) và cách dùng trong câu bị động.",
    38: "Học cách danh từ hóa động từ với ～のは/～のが và cấu trúc ～のは～です (nhấn mạnh).",
    39: "Học cách nêu nguyên nhân, lý do với ～て/～で và ～ので (vì, bởi vì).",
    40: "Học câu hỏi lồng ghép ～か (có biết... không) và cấu trúc thử làm ～てみます.",
    41: "Học cách cho nhận và kính ngữ với いただきます (nhận, xin) trong giao tiếp lịch sự.",
    42: "Học mục đích với ～ために (để, vì) và cách diễn đạt mục đích sử dụng của vật.",
    43: "Học cách diễn đạt phỏng đoán trông có vẻ ～そうです và hành động đi rồi về ～てきます.",
    44: "Học cách diễn đạt quá mức ～すぎます và tính từ chỉ sự dễ/khó ～やすい/～にくい.",
    45: "Học cấu trúc ～場合は (trong trường hợp) và mặc dù ～のに (dù... nhưng).",
    46: "Học cách diễn đạt vừa mới ～たところです và sự chắc chắn ～はずです.",
    47: "Học cách diễn đạt nghe nói ～そうです (nghe đồn) và hình như ～ようです.",
    48: "Học thể sai khiến ～せます/～させます (bắt, khiến làm gì).",
    49: "Học tôn kính ngữ そんけいご (kính ngữ dành cho người khác).",
    50: "Học khiêm nhường ngữ けんじょうご (khiêm tốn khi nói về bản thân)."
};

// Generate lessons 1 to 50
for (let i = 1; i <= 50; i++) {
  const id = `bai-${i}`;
  const level = i <= 25 ? 'N5' : 'N4';

  let title = `Bài ${i}`;
  if (titles[i]) {
      title = `Bài ${i} – ${titles[i]}`;
  } else if (i <= 25) {
      title = `Bài ${i} – Sơ cấp N5`;
  } else {
      title = `Bài ${i} – Nội dung đang cập nhật`;
  }

  LESSONS_DATA[id] = {
    id,
    title,
    level,
    content: contents[i] || 'Nhấn vào để xem chi tiết giáo án và giải thích ngữ pháp.'
  };
}