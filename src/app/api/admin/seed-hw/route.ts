import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { testsData } from "@/data/tests";

const prisma = new PrismaClient();

const cardsL28 = [
  { front: "売れます [パンが~]", back: "bán chạy, bán được (bánh mì)" },
  { front: "踊ります", back: "nhảy, khiêu vũ" },
  { front: "かみます", back: "nhai, cắn" },
  { front: "選びます", back: "chọn, lựa chọn" },
  { front: "違います", back: "khác, khác biệt" },
  { front: "通います [大学に~]", back: "đi học, đi làm (đi đi về về)" },
  { front: "メモします", back: "ghi chép, ghi nhớ" },
  { front: "まじめ[na]", back: "nghiêm túc, ngoan ngoãn" },
  { front: "熱心[na]", back: "nhiệt tình, nhiệt huyết" },
  { front: "優しい", back: "hiền lành, dịu dàng, tốt bụng" },
  { front: "偉い", back: "vĩ đại, đáng kính" },
  { front: "ちょうどいい", back: "vừa vặn, vừa khéo" },
  { front: "習慣", back: "thói quen, tập quán" },
  { front: "経験", back: "kinh nghiệm" },
  { front: "力", back: "sức mạnh, lực" },
  { front: "人気", back: "được yêu thích, nổi tiếng" },
  { front: "形", back: "hình dáng, hình dạng" },
  { front: "色", back: "màu sắc" },
  { front: "味", back: "mùi vị, hương vị" },
  { front: "ガム", back: "kẹo cao su, chewing gum" },
  { front: "品物", back: "hàng hóa, phẩm vật" },
  { front: "値段", back: "giá cả" },
  { front: "給料", back: "lương" },
  { front: "ボーナス", back: "tiền thưởng" },
  { front: "番組", back: "chương trình (TV, radio...)" },
  { front: "ドラマ", back: "phim truyền hình" },
  { front: "小説", back: "tiểu thuyết" },
  { front: "小説家", back: "nhà văn, tiểu thuyết gia" },
  { front: "歌手", back: "ca sĩ" },
  { front: "管理人", back: "người quản lý" },
  { front: "息子", back: "con trai (của mình)" },
  { front: "息子さん", back: "con trai (của người khác)" },
  { front: "娘", back: "con gái (của mình)" },
  { front: "娘さん", back: "con gái (của người khác)" },
  { front: "自分", back: "bản thân, tự mình" },
  { front: "将来", back: "tương lai" },
  { front: "しばらく", back: "một loáng, một lát, một khoảng thời gian ngắn" },
  { front: "たいてい", back: "thông thường, hầu hết" },
  { front: "それに", back: "hơn nữa, vả lại" },
  { front: "それで", back: "vì thế, do đó" },
  { front: "会話", back: "hội thoại" },
  { front: "おしゃべりします", back: "trò chuyện, tán ngẫu" },
  { front: "お知らせ", back: "thông báo" },
  { front: "日にち", back: "ngày tháng" },
  { front: "体育館", back: "nhà thi đấu thể thao" },
  { front: "無料", back: "miễn phí" }
];

const cardsL27 = [
  { front: "飼います", back: "nuôi (động vật)" },
  { front: "建てます", back: "xây dựng" },
  { front: "走ります [道を~]", back: "chạy (trên đường)" },
  { front: "見えます [山が~]", back: "nhìn thấy (núi)" },
  { front: "聞こえます [音が~]", back: "nghe thấy (âm thanh)" },
  { front: "できます [空港が~]", back: "hoàn thành, được làm xong (sân bay)" },
  { front: "開きます [教室を~]", back: "mở (lớp học)" },
  { front: "ペット", back: "thú cưng" },
  { front: "鳥", back: "chim" },
  { front: "声", back: "tiếng, giọng nói" },
  { front: "波", back: "sóng" },
  { front: "花火", back: "pháo hoa" },
  { front: "道具", back: "dụng cụ, công cụ" },
  { front: "クリーニング", back: "giặt là, giặt ủi" },
  { front: "家", back: "nhà" },
  { front: "マンション", back: "chung cư" },
  { front: "キッチン", back: "bếp" },
  { front: "教室", back: "lớp học" },
  { front: "パーティールーム", back: "phòng tiệc" },
  { front: "〜後", back: "sau ~ (thời gian)" },
  { front: "〜しか", back: "chỉ ~ (đi với phủ định)" },
  { front: "ほかの", back: "khác" },
  { front: "はっきり", back: "rõ ràng" },
  { front: "家具", back: "đồ gia dụng, nội thất" },
  { front: "本棚", back: "kệ sách, giá sách" },
  { front: "いつか", back: "một lúc nào đó, khi nào đó" },
  { front: "素晴らしい", back: "tuyệt vời" },
  { front: "子どもたち", back: "trẻ em, con cái" },
  { front: "大好きな", back: "rất thích" },
  { front: "主人公", back: "nhân vật chính" },
  { front: "形", back: "hình dáng" },
  { front: "不思議な", back: "kỳ lạ, kỳ bí" },
  { front: "ポケット", back: "túi áo, túi quần" },
  { front: "例えば", back: "ví dụ" },
  { front: "付けます", back: "lắp đặt, đeo vào" },
  { front: "自由に", back: "tự do" },
  { front: "空", back: "bầu trời" },
  { front: "飛びます", back: "bay" },
  { front: "昔", back: "ngày xưa" },
  { front: "自分", back: "bản thân" },
  { front: "将来", back: "tương lai" }
];

export async function GET(req: NextRequest) {
  try {
    const classes = await prisma.class.findMany();
    if (classes.length === 0) {
      return NextResponse.json({ error: "Chưa có lớp học nào trong hệ thống để gán bài tập." }, { status: 400 });
    }

    const teacher = await prisma.user.findFirst({
      where: { role: "TEACHER" }
    });
    if (!teacher) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản Giáo viên nào." }, { status: 400 });
    }

    const itemsToSeed = [
      {
        slug: "lesson-26-quiz",
        title: "Bài kiểm tra trắc nghiệm Bài 26",
        description: "Kiểm tra kiến thức ngữ pháp thể thông thường + んđể, ていただけませんか.",
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

    let createdHwCount = 0;
    let createdDecksCount = 0;

    for (const cls of classes) {
      // 1. Seed Homework/Tests
      for (const item of itemsToSeed) {
        const sourceTest = testsData.find(t => t.id === item.sourceTestId);
        if (!sourceTest) continue;

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
              deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              quizData: JSON.stringify(sourceTest.questions)
            }
          });
          createdHwCount++;
        }
      }

      // 2. Seed Flashcard Decks
      // Deck L27
      const existingDeck27 = await prisma.flashcardDeck.findFirst({
        where: { classId: cls.id, title: "Từ vựng Bài 27: Thể khả năng & Chỉ" }
      });
      if (!existingDeck27) {
        await prisma.flashcardDeck.create({
          data: {
            title: "Từ vựng Bài 27: Thể khả năng & Chỉ",
            classId: cls.id,
            cards: {
              create: cardsL27.map(c => ({ front: c.front, back: c.back }))
            }
          }
        });
        createdDecksCount++;
      }

      // Deck L28
      const existingDeck28 = await prisma.flashcardDeck.findFirst({
        where: { classId: cls.id, title: "Từ vựng Bài 28: Vừa... vừa & Thói quen" }
      });
      if (!existingDeck28) {
        await prisma.flashcardDeck.create({
          data: {
            title: "Từ vựng Bài 28: Vừa... vừa & Thói quen",
            classId: cls.id,
            cards: {
              create: cardsL28.map(c => ({ front: c.front, back: c.back }))
            }
          }
        });
        createdDecksCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Khởi tạo thành công ${createdHwCount} bài tập và ${createdDecksCount} bộ thẻ từ vựng (Bài 27, 28) cho các lớp học.`,
      classesCount: classes.length,
      seededHwCount: createdHwCount,
      seededDecksCount: createdDecksCount
    });
  } catch (error: any) {
    console.error("Lỗi khi seed bài tập & từ vựng:", error);
    return NextResponse.json({ error: error.message || "Lỗi server" }, { status: 500 });
  }
}
