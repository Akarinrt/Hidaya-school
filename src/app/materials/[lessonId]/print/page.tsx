'use client';
import React, { useEffect, useMemo } from 'react';
import { LESSONS_DATA } from '@/data/lessons';
import { notFound } from 'next/navigation';

// Dữ liệu ngữ pháp tóm tắt cho từng bài (từ giáo án Minna no Nihongo II)
const grammarSummaries: Record<number, { grammar: string[]; examples: { jp: string; vi: string }[]; vocab: { jp: string; vi: string }[] }> = {
  29: {
    grammar: [
      "N が V( tự động từ ) て います: Diễn tả trạng thái còn lưu lại sau một hành động đã xảy ra.",
      "V て しまいました: Diễn tả sự hoàn thành trọn vẹn hành động (mang sắc thái tiếc nuối / xong xuôi)."
    ],
    examples: [
      { jp: "窓が閉まっています。", vi: "Cửa sổ đang đóng (trạng thái)." },
      { jp: "パスポートをなくしてしまいました。", vi: "Tôi lỡ làm mất hộ chiếu rồi." }
    ],
    vocab: [
      { jp: "開きます", vi: "Mở (cửa tự mở)" },
      { jp: "閉まります", vi: "Đóng (cửa tự đóng)" },
      { jp: "壊れます", vi: "Hỏng" },
      { jp: "割れます", vi: "Vỡ" }
    ]
  },
  30: {
    grammar: [
      "V て あります: Diễn tả trạng thái kết quả của một hành động có chủ ý (ai đó đã làm).",
      "V て おきます: Diễn tả hành động chuẩn bị trước cho một mục đích nào đó."
    ],
    examples: [
      { jp: "壁にカレンダーがかけてあります。", vi: "Tờ lịch được treo trên tường." },
      { jp: "旅行の前に、切符を買っておきます。", vi: "Trước chuyến đi, tôi mua sẵn vé." }
    ],
    vocab: [
      { jp: "かけます", vi: "Treo" },
      { jp: "かざります", vi: "Trang trí" },
      { jp: "かたづけます", vi: "Dọn dẹp" },
      { jp: "そうだんします", vi: "Bàn bạc, tư vấn" }
    ]
  },
  31: {
    grammar: [
      "Thể ý định V ましょう / V よう: Mời cùng làm, rủ rê.",
      "V つもりです: Dự định (ý định của người nói).",
      "V 予定です (よてい): Kế hoạch, dự định."
    ],
    examples: [
      { jp: "いっしょに昼ごはんを食べましょう。", vi: "Cùng ăn trưa nào." },
      { jp: "来年、日本へ留学するつもりです。", vi: "Năm sau tôi dự định du học Nhật Bản." }
    ],
    vocab: [
      { jp: "意見", vi: "Ý kiến" },
      { jp: "予定", vi: "Kế hoạch, dự định" },
      { jp: "留学", vi: "Du học" },
      { jp: "連絡", vi: "Liên lạc" }
    ]
  },
  32: {
    grammar: [
      "V たほうがいいです: Nên làm gì đó (lời khuyên).",
      "V ないほうがいいです: Không nên làm gì đó.",
      "～でしょう: Phỏng đoán, chắc là."
    ],
    examples: [
      { jp: "薬を飲んだほうがいいですよ。", vi: "Anh nên uống thuốc thì hơn." },
      { jp: "あしたは雨が降るでしょう。", vi: "Ngày mai chắc trời sẽ mưa." }
    ],
    vocab: [
      { jp: "薬", vi: "Thuốc" },
      { jp: "熱", vi: "Sốt" },
      { jp: "咳", vi: "Ho" },
      { jp: "天気予報", vi: "Dự báo thời tiết" }
    ]
  },
  33: {
    grammar: [
      "Thể mệnh lệnh V なさい: Ra lệnh cho cấp dưới, trẻ em.",
      "Thể cấm chỉ V な: Không được làm gì.",
      "Truyền đạt: ～と言っていました: Nói rằng..."
    ],
    examples: [
      { jp: "早く寝なさい。", vi: "Đi ngủ sớm đi!" },
      { jp: "ここで写真を撮るな。", vi: "Không được chụp ảnh ở đây." },
      { jp: "先生はあした試験があると言っていました。", vi: "Thầy giáo nói rằng ngày mai có bài kiểm tra." }
    ],
    vocab: [
      { jp: "命令", vi: "Mệnh lệnh" },
      { jp: "禁止", vi: "Cấm chỉ" },
      { jp: "伝えます", vi: "Truyền đạt" },
      { jp: "規則", vi: "Quy tắc" }
    ]
  },
  34: {
    grammar: [
      "N のとおりに / V とおりに: Theo như, đúng như.",
      "V てから: Sau khi làm gì đó."
    ],
    examples: [
      { jp: "私の言うとおりにしてください。", vi: "Hãy làm theo đúng như tôi nói." },
      { jp: "仕事が終わってから、飲みに行きます。", vi: "Sau khi làm xong việc, tôi đi uống nước." }
    ],
    vocab: [
      { jp: "とおり", vi: "Theo như" },
      { jp: "説明書", vi: "Sách hướng dẫn" },
      { jp: "方法", vi: "Phương pháp" },
      { jp: "終わります", vi: "Kết thúc" }
    ]
  },
  35: {
    grammar: [
      "Thể điều kiện V ば: Nếu... thì (điều kiện).",
      "～なら: Nếu như (giả định)."
    ],
    examples: [
      { jp: "春になれば、花が咲きます。", vi: "Nếu mùa xuân đến, hoa sẽ nở." },
      { jp: "安ければ、買います。", vi: "Nếu rẻ thì tôi mua." }
    ],
    vocab: [
      { jp: "春", vi: "Mùa xuân" },
      { jp: "夏", vi: "Mùa hè" },
      { jp: "秋", vi: "Mùa thu" },
      { jp: "冬", vi: "Mùa đông" }
    ]
  },
  36: {
    grammar: [
      "V(辞書形/ない形) ように、V: Để mà (mục đích).",
      "V ように なります: Trở nên có thể / ようになりました (đã trở thành).",
      "V ように しています: Cố gắng, tập thói quen."
    ],
    examples: [
      { jp: "速く泳げるように、毎日練習しています。", vi: "Tôi luyện tập mỗi ngày để có thể bơi nhanh." },
      { jp: "日本語が話せるようになりました。", vi: "Tôi đã có thể nói được tiếng Nhật." }
    ],
    vocab: [
      { jp: "練習", vi: "Luyện tập" },
      { jp: "健康", vi: "Sức khỏe" },
      { jp: "なる", vi: "Trở nên" },
      { jp: "できる", vi: "Có thể" }
    ]
  },
  37: {
    grammar: [
      "Thể bị động V れます/られます: Bị làm gì đó.",
      "Cách chia: Nhóm I ～ます → ～されます; Nhóm II → ～られます."
    ],
    examples: [
      { jp: "蚊にさされました。", vi: "Tôi bị muỗi đốt." },
      { jp: "先生にほめられました。", vi: "Tôi được thầy khen." }
    ],
    vocab: [
      { jp: "蚊", vi: "Con muỗi" },
      { jp: "ほめます", vi: "Khen" },
      { jp: "しかられます", vi: "Bị mắng" },
      { jp: "誘われます", vi: "Được mời" }
    ]
  },
  38: {
    grammar: [
      "V のは + こと/形容詞: Danh từ hóa động từ.",
      "V のが 上手です/好きです: Giỏi/Thích làm gì đó."
    ],
    examples: [
      { jp: "日本語を勉強するのは楽しいです。", vi: "Học tiếng Nhật thật vui." },
      { jp: "絵をかくのが上手です。", vi: "Anh ấy vẽ tranh rất giỏi." }
    ],
    vocab: [
      { jp: "趣味", vi: "Sở thích" },
      { jp: "楽しい", vi: "Vui vẻ" },
      { jp: "上手", vi: "Giỏi" },
      { jp: "下手", vi: "Kém" }
    ]
  },
  39: {
    grammar: [
      "V て / いadj て / なadj で / N で: Nêu nguyên nhân, lý do.",
      "普通形 + ので: Vì... (giải thích lý do mang tính khách quan)."
    ],
    examples: [
      { jp: "風邪をひいて、学校を休みました。", vi: "Vì bị cảm nên tôi nghỉ học." },
      { jp: "頭が痛いので、早く帰ります。", vi: "Vì đau đầu nên tôi về sớm." }
    ],
    vocab: [
      { jp: "風邪", vi: "Cảm cúm" },
      { jp: "頭痛", vi: "Đau đầu" },
      { jp: "理由", vi: "Lý do" },
      { jp: "残業", vi: "Tăng ca" }
    ]
  },
  40: {
    grammar: [
      "Câu hỏi lồng ghép: ～か 知っていますか / わかりません.",
      "V てみます: Thử làm gì đó."
    ],
    examples: [
      { jp: "あの人が誰か知っていますか。", vi: "Bạn có biết người kia là ai không?" },
      { jp: "新しい料理を作ってみました。", vi: "Tôi đã thử làm món ăn mới." }
    ],
    vocab: [
      { jp: "誰", vi: "Ai" },
      { jp: "料理", vi: "Nấu ăn, món ăn" },
      { jp: "試す", vi: "Thử" },
      { jp: "経験", vi: "Kinh nghiệm" }
    ]
  },
  41: {
    grammar: [
      "いただきます: Khiêm nhường của もらいます (xin nhận).",
      "Cho nhận kính ngữ: ～て いただきます / ～て いただけませんか."
    ],
    examples: [
      { jp: "先生に日本語を教えていただきました。", vi: "Tôi đã được thầy giáo dạy tiếng Nhật." },
      { jp: "この本を貸していただけませんか。", vi: "Anh cho tôi mượn quyển sách này được không?" }
    ],
    vocab: [
      { jp: "いただきます", vi: "Xin nhận" },
      { jp: "貸します", vi: "Cho mượn" },
      { jp: "教えます", vi: "Dạy" },
      { jp: "お願い", vi: "Xin nhờ" }
    ]
  },
  42: {
    grammar: [
      "V ために: Để, vì (mục đích).",
      "N の ために: Vì lợi ích của...",
      "V のに 使います: Dùng cho việc gì."
    ],
    examples: [
      { jp: "日本語を勉強するために、辞書を買いました。", vi: "Tôi mua từ điển để học tiếng Nhật." },
      { jp: "この紙はプレゼントを包むのに使います。", vi: "Loại giấy này dùng để gói quà." }
    ],
    vocab: [
      { jp: "辞書", vi: "Từ điển" },
      { jp: "包みます", vi: "Gói" },
      { jp: "使います", vi: "Dùng" },
      { jp: "家族", vi: "Gia đình" }
    ]
  },
  43: {
    grammar: [
      "いadj (stem) そうです / なadj + そうです: Trông có vẻ.",
      "V てきます: Đi rồi về (hành động đi và quay lại)."
    ],
    examples: [
      { jp: "このケーキはおいしそうです。", vi: "Cái bánh này trông có vẻ ngon." },
      { jp: "ちょっとコーヒーを買ってきます。", vi: "Tôi đi mua cà phê một chút rồi về." }
    ],
    vocab: [
      { jp: "ケーキ", vi: "Bánh ngọt" },
      { jp: "おいしい", vi: "Ngon" },
      { jp: "元気", vi: "Khỏe mạnh" },
      { jp: "帰ります", vi: "Trở về" }
    ]
  },
  44: {
    grammar: [
      "V すぎます: Làm gì đó quá mức.",
      "いadj stem + すぎます / なadj + すぎます: Quá...",
      "V やすいです: Dễ làm gì.",
      "V にくいです: Khó làm gì."
    ],
    examples: [
      { jp: "食べすぎました。", vi: "Tôi đã ăn quá nhiều." },
      { jp: "この辞書は使いやすいです。", vi: "Quyển từ điển này dễ sử dụng." }
    ],
    vocab: [
      { jp: "食べます", vi: "Ăn" },
      { jp: "使いやすい", vi: "Dễ dùng" },
      { jp: "書きにくい", vi: "Khó viết" },
      { jp: "複雑", vi: "Phức tạp" }
    ]
  },
  45: {
    grammar: [
      "V 場合は: Trong trường hợp...",
      "V のに: Mặc dù... nhưng (diễn tả sự tiếc nuối, bất ngờ)."
    ],
    examples: [
      { jp: "熱がある場合は、学校に来ないでください。", vi: "Trong trường hợp bị sốt, xin đừng đến trường." },
      { jp: "雨が降っているのに、外で遊んでいます。", vi: "Trời đang mưa vậy mà vẫn chơi ngoài trời." }
    ],
    vocab: [
      { jp: "場合", vi: "Trường hợp" },
      { jp: "熱", vi: "Sốt" },
      { jp: "遊びます", vi: "Chơi" },
      { jp: "残念", vi: "Tiếc" }
    ]
  },
  46: {
    grammar: [
      "V たところです: Vừa mới làm xong.",
      "V ところです: Đang làm dở.",
      "V るところです: Sắp làm."
    ],
    examples: [
      { jp: "今、ご飯を食べたところです。", vi: "Tôi vừa mới ăn cơm xong." },
      { jp: "今、宿題をしているところです。", vi: "Tôi đang làm bài tập." }
    ],
    vocab: [
      { jp: "ところ", vi: "Lúc, chỗ" },
      { jp: "ご飯", vi: "Cơm, bữa ăn" },
      { jp: "宿題", vi: "Bài tập về nhà" },
      { jp: "出かけます", vi: "Ra ngoài" }
    ]
  },
  47: {
    grammar: [
      "普通形 + そうです: Nghe nói là... (truyền đạt thông tin).",
      "普通形 + ようです: Hình như, dường như (phỏng đoán)."
    ],
    examples: [
      { jp: "田中さんは結婚するそうです。", vi: "Nghe nói anh Tanaka sắp kết hôn." },
      { jp: "誰か来たようです。", vi: "Hình như có ai đó vừa đến." }
    ],
    vocab: [
      { jp: "結婚", vi: "Kết hôn" },
      { jp: "噂", vi: "Tin đồn" },
      { jp: "誰か", vi: "Ai đó" },
      { jp: "様子", vi: "Vẻ, dáng vẻ" }
    ]
  },
  48: {
    grammar: [
      "Thể sai khiến V せます/させます: Bắt, khiến, cho làm gì.",
      "Nhóm I: ～ます → ～せます; Nhóm II: ～ます → ～させます.",
      "～させてください: Cho phép tôi làm gì."
    ],
    examples: [
      { jp: "部長は部下に資料をコピーさせました。", vi: "Trưởng phòng bảo nhân viên phô tô tài liệu." },
      { jp: "少し考えさせてください。", vi: "Xin hãy để tôi suy nghĩ một chút." }
    ],
    vocab: [
      { jp: "資料", vi: "Tài liệu" },
      { jp: "コピー", vi: "Phô tô" },
      { jp: "考えます", vi: "Suy nghĩ" },
      { jp: "許可", vi: "Cho phép" }
    ]
  },
  49: {
    grammar: [
      "Tôn kính ngữ (そんけいご): Dùng để tôn trọng hành động của người khác.",
      "Cấu trúc: お V になります / V られます."
    ],
    examples: [
      { jp: "社長は来週アメリカへ行かれます。", vi: "Giám đốc sẽ đi Mỹ vào tuần sau." },
      { jp: "どうぞ、お入りください。", vi: "Mời anh vào." }
    ],
    vocab: [
      { jp: "社長", vi: "Giám đốc" },
      { jp: "いらっしゃいます", vi: "Đến (kính ngữ)" },
      { jp: "召し上がります", vi: "Ăn, uống (kính ngữ)" },
      { jp: "ご覧になります", vi: "Xem (kính ngữ)" }
    ]
  },
  50: {
    grammar: [
      "Khiêm nhường ngữ (けんじょうご): Dùng để hạ mình khi nói về hành động của bản thân.",
      "Cấu trúc: お V します / ご N します."
    ],
    examples: [
      { jp: "私がお荷物をお持ちします。", vi: "Tôi xin phép xách hành lý giúp anh." },
      { jp: "私はミラーと申します。", vi: "Tôi tên là Miller." }
    ],
    vocab: [
      { jp: "申します", vi: "Tên là (khiêm nhường)" },
      { jp: "参ります", vi: "Đi, đến (khiêm nhường)" },
      { jp: "いただきます", vi: "Nhận (khiêm nhường)" },
      { jp: "お目にかかります", vi: "Gặp (khiêm nhường)" }
    ]
  }
};

export default function MaterialPrintPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const [lessonId, setLessonId] = React.useState<string | null>(null);
  const resolvedParams = React.use(params);

  React.useEffect(() => {
    if (resolvedParams) {
      setLessonId(resolvedParams.lessonId);
    }
  }, [resolvedParams]);

  const lessonNum = lessonId ? parseInt(lessonId.replace('bai-', ''), 10) : NaN;
  const lesson = lessonNum > 0 ? LESSONS_DATA[`bai-${lessonNum}` as keyof typeof LESSONS_DATA] : undefined;

  const data = useMemo(() => grammarSummaries[lessonNum], [lessonNum]);

  useEffect(() => {
    if (lesson && lessonNum >= 29) {
      document.title = `Tài liệu Học tập & In ấn (A4) - Bài ${lessonNum}`;
    }
  }, [lesson, lessonNum]);

  // Chỉ bài 36+ dùng trang động này; bài 26-35 có trang tĩnh riêng
  if (lessonNum >= 26 && lessonNum <= 35) {
    if (typeof window !== 'undefined') {
      window.location.href = `/materials/bai-${lessonNum}/print`;
    }
    return null;
  }

  if (!lesson || !data || isNaN(lessonNum)) {
    notFound();
  }

  return (
    <div className="print-container">
      <style dangerouslySetInnerHTML={{__html: `
        .print-container {
          font-family: "Times New Roman", Times, serif;
          color: #000;
          background: #fff;
          padding: 20px;
          max-width: 850px;
          margin: 0 auto;
          font-size: 13pt;
          line-height: 1.6;
        }
        @media print {
          html, body {
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          .print-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 12pt;
          }
          h2, h3 { page-break-after: avoid !important; }
          tr { page-break-inside: avoid !important; }
          li { page-break-inside: avoid !important; }
        }
        @page { margin: 1.2cm 1.5cm; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 15px; }
        th, td { border: 1px solid #000; padding: 6px 10px; text-align: left; vertical-align: middle; }
        th { background-color: #f5f5f5; font-weight: bold; font-size: 11pt; }
        h1, h2, h3 { color: #000; margin-top: 15px; margin-bottom: 8px; }
        h1 { font-size: 22pt; font-weight: bold; text-align: center; }
        h2 { font-size: 16pt; border-bottom: 2px solid #000; padding-bottom: 3px; margin-top: 22px; }
        h3 { font-size: 12pt; font-weight: bold; margin-top: 15px; color: #111; }
        ul, ol { margin-top: 4px; margin-bottom: 10px; padding-left: 20px; }
        li { margin-bottom: 4px; }
        rt { font-size: 0.55em; color: #333; user-select: none; }
        ruby { ruby-position: over; padding: 0 1px; }
        .note-box {
          border: 1px dashed #000;
          padding: 15px;
          margin: 15px 0;
          background-color: #fafafa;
          border-radius: 4px;
        }
        .example-list { list-style-type: none; padding-left: 10px; }
        .example-item {
          margin-bottom: 12px;
          padding-left: 15px;
          border-left: 3px solid #666;
        }
        .translation { font-style: italic; color: #444; font-size: 11.5pt; margin-top: 2px; }
      `}} />

      <div className="no-print" style={{ textAlign: 'center', marginBottom: '30px', padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <p style={{fontFamily: 'sans-serif', margin: '0 0 12px 0', fontSize: '14px', color: '#475569', fontWeight: '500'}}>
          Màn hình này được thiết kế tối ưu cho việc in ấn học tập hoặc lưu trữ PDF (Khổ dọc A4).
        </p>
        <button 
          onClick={() => window.print()} 
          style={{ 
            background: '#2563eb', color: 'white', border: 'none', padding: '12px 28px', 
            borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(37,99,235,0.2)', transition: 'all 0.2s'
          }}
        >
          🖨️ In Tài liệu / Lưu thành file PDF
        </button>
      </div>

      <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '26pt', fontFamily: '"Times New Roman", serif' }}>
          Bài {lessonNum} - Minna no Nihongo II
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>{lesson.title}</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{ marginTop: '0' }}>I. Ngữ Pháp Trọng Tâm (文法)</h2>
        <p style={{ marginBottom: '10px' }}>{lesson.content}</p>
        <ul>
          {data.grammar.map((g, i) => (
            <li key={i} style={{ marginBottom: '8px' }}><strong>{g}</strong></li>
          ))}
        </ul>

        <h3>Ví dụ minh họa:</h3>
        <ul className="example-list">
          {data.examples.map((ex, i) => (
            <li key={i} className="example-item">
              <div>{ex.jp}</div>
              <div className="translation">{ex.vi}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-break">
        <h2 className="section-title">II. Từ Vựng Trọng Tâm (語彙)</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
              <th style={{ width: '45%' }}>Từ vựng</th>
              <th style={{ width: '45%' }}>Ý nghĩa Tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            {data.vocab.map((v, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{i + 1}</td>
                <td><strong>{v.jp}</strong></td>
                <td>{v.vi}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="note-box">
          <strong>💡 Ghi chú:</strong> Học viên cần ôn tập và ghi nhớ các mẫu câu, từ vựng trọng tâm. Xem thêm slide bài giảng tương tác tại mục "Giáo Án Ngữ Pháp" trên trang chủ.
        </div>
      </section>
    </div>
  );
}