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
        id: 'q1', type: 'multiple_choice',
        text: 'Chon trợ từ thích hợp: わたしは スーパー（　　）行きます。',
        options: [{ id: 'a', text: 'で' }, { id: 'b', text: 'へ' }, { id: 'c', text: 'を' }, { id: 'd', text: 'が' }],
        correctOptionId: 'b', explanation: 'Trợ từ "へ" (hoặc "に") dùng để chỉ phương hướng di chuyển (Đi đến siêu thị).'
      },
      {
        id: 'q2', type: 'multiple_choice',
        text: 'Chia động từ: 食べる → Thể từ điển (Jisho-kei) là gì?',
        options: [{ id: 'a', text: 'たべない' }, { id: 'b', text: 'たべた' }, { id: 'c', text: 'たべる' }, { id: 'd', text: 'たべて' }],
        correctOptionId: 'c', explanation: '食べる (Taberu) là thể từ điển (thể nguyên dạng).'
      },
      {
        id: 'q3', type: 'multiple_choice',
        text: 'Tình huống giao tiếp: Bạn muốn mượn bút của bạn bè. Bạn sẽ nói thế nào?',
        options: [{ id: 'a', text: 'ペンを 貸してください。' }, { id: 'b', text: 'ペンを 借りてください。' }, { id: 'c', text: 'ペンを 貸しても いいですか。' }, { id: 'd', text: 'ペンを 借りては いけません。' }],
        correctOptionId: 'a', explanation: '貸してください (Kashite kudasai) nghĩa là "Hãy cho tôi mượn".'
      },
      {
        id: 'q4', type: 'multiple_choice',
        text: 'Chon trợ từ thích hợp: 箸（　　）ご飯を食べます。',
        options: [{ id: 'a', text: 'に' }, { id: 'b', text: 'で' }, { id: 'c', text: 'と' }, { id: 'd', text: 'を' }],
        correctOptionId: 'b', explanation: 'Trợ từ "で" chỉ phương tiện, công cụ (ăn bằng đũa).'
      },
      {
        id: 'q5', type: 'multiple_choice',
        text: 'Chia động từ: 書く → Thể phủ định quá khứ (Nai-kei) là gì?',
        options: [{ id: 'a', text: '書かない' }, { id: 'b', text: '書かなかった' }, { id: 'c', text: '書きました' }, { id: 'd', text: '書いた' }],
        correctOptionId: 'b', explanation: '書かない (không viết) -> quá khứ là 書かなかった (đã không viết).'
      },
      {
        id: 'q6', type: 'multiple_choice',
        text: 'Dịch sang tiếng Nhật: "Quyển sách này không đắt".',
        options: [{ id: 'a', text: 'この本は 高いじゃないです。' }, { id: 'b', text: 'この本は 高くありません。' }, { id: 'c', text: 'この本は 高くないでした。' }, { id: 'd', text: 'この本は 高いです。' }],
        correctOptionId: 'b', explanation: 'Tính từ đuôi い khi phủ định đổi い thành くない hoặc くありません.'
      },
      {
        id: 'q7', type: 'multiple_choice',
        text: 'Điền từ thích hợp: （　　）に 本が あります。',
        options: [{ id: 'a', text: '机の 上' }, { id: 'b', text: '机の 中' }, { id: 'c', text: '机の 下' }, { id: 'd', text: 'Tất cả đều đúng' }],
        correctOptionId: 'd', explanation: 'Tất cả các vị trí trên đều dùng được với trợ từ に và あります.'
      },
      {
        id: 'q8', type: 'multiple_choice',
        text: 'Chia động từ sang thể て: 泳ぐ → ?',
        options: [{ id: 'a', text: '泳ぎて' }, { id: 'b', text: '泳いで' }, { id: 'c', text: '泳って' }, { id: 'd', text: '泳んで' }],
        correctOptionId: 'b', explanation: 'Động từ kết thúc bằng ぐ đổi thành いで.'
      },
      {
        id: 'q9', type: 'multiple_choice',
        text: 'Mẫu câu V-たい: "Tôi muốn uống nước" nói như thế nào?',
        options: [{ id: 'a', text: '水が 飲みたいです。' }, { id: 'b', text: '水を 飲みたいです。' }, { id: 'c', text: 'Cả A và B đều đúng' }, { id: 'd', text: 'Cả A và B đều sai' }],
        correctOptionId: 'c', explanation: 'Với động từ V-たい, tân ngữ có thể dùng を hoặc が.'
      },
      {
        id: 'q10', type: 'multiple_choice',
        text: 'Tình huống: Xin phép về sớm.',
        options: [{ id: 'a', text: '早く 帰っても いいですか。' }, { id: 'b', text: '早く 帰らなければ なりません。' }, { id: 'c', text: '早く 帰らないで ください。' }, { id: 'd', text: '早く 帰ってから、行きます。' }],
        correctOptionId: 'a', explanation: 'V-ても いいですか dùng để xin phép làm gì đó.'
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
        id: 'q1', type: 'multiple_choice',
        text: 'Chọn cách chia đúng với ～んです: 「明日、テストが（　　）んです。」',
        options: [{ id: 'a', text: 'あります' }, { id: 'b', text: 'ある' }, { id: 'c', text: 'あった' }, { id: 'd', text: 'あり' }],
        correctOptionId: 'b', explanation: 'Trước んです là thể thông thường (普通形). あります → ある.'
      },
      {
        id: 'q2', type: 'multiple_choice',
        text: 'Dịch câu sau sang tiếng Nhật: "Bạn có thể chỉ cho tôi cách đi đến nhà ga được không?"',
        options: [{ id: 'a', text: '駅の行き方を 教えても いいですか。' }, { id: 'b', text: '駅の行き方を 教えていただけませんか。' }, { id: 'c', text: '駅の行き方を 教えなければなりませんか。' }, { id: 'd', text: '駅の行き方を 教えるんですか。' }],
        correctOptionId: 'b', explanation: 'Mẫu câu ～ていただけませんか dùng để nhờ vả một cách lịch sự.'
      },
      {
        id: 'q3', type: 'multiple_choice',
        text: 'Điền vào chỗ trống: カメラを買いたいんですが、どこで（　　）いいですか。',
        options: [{ id: 'a', text: '買った' }, { id: 'b', text: '買えば' }, { id: 'c', text: '買ったら' }, { id: 'd', text: '買うと' }],
        correctOptionId: 'c', explanation: 'Mẫu câu hỏi lời khuyên: Từ để hỏi + V-たら いいですか。'
      },
      {
        id: 'q4', type: 'multiple_choice',
        text: 'Điền vào chỗ trống: わたしは 日本語が（　　）んですが、...',
        options: [{ id: 'a', text: '下手' }, { id: 'b', text: '下手だ' }, { id: 'c', text: '下手な' }, { id: 'd', text: '下手の' }],
        correctOptionId: 'c', explanation: 'Tính từ đuôi な và Danh từ khi kết hợp với んです sẽ biến thành なんです.'
      },
      {
        id: 'q5', type: 'multiple_choice',
        text: 'Cách dùng nào của んです sau đây là đúng?',
        options: [{ id: 'a', text: 'Nhấn mạnh lý do' }, { id: 'b', text: 'Hỏi thêm thông tin, xin lời khuyên' }, { id: 'c', text: 'Thu hút sự chú ý trước khi trình bày' }, { id: 'd', text: 'Tất cả đều đúng' }],
        correctOptionId: 'd', explanation: 'んです có rất nhiều cách dùng bao gồm cả 3 phương án trên.'
      },
      {
        id: 'q6', type: 'multiple_choice',
        text: 'Mẫu câu: どこで そのかばんを （　　）んですか。',
        options: [{ id: 'a', text: '買った' }, { id: 'b', text: '買う' }, { id: 'c', text: '買って' }, { id: 'd', text: '買いたい' }],
        correctOptionId: 'a', explanation: 'Hỏi thông tin về việc ĐÃ MUA ở đâu nên phải dùng quá khứ 買った.'
      },
      {
        id: 'q7', type: 'multiple_choice',
        text: 'Chia đúng: パスポートを（　　）んですが、どうしたらいいですか。',
        options: [{ id: 'a', text: 'なくす' }, { id: 'b', text: 'なくした' }, { id: 'c', text: 'なくして' }, { id: 'd', text: 'なくさない' }],
        correctOptionId: 'b', explanation: 'Đã làm mất hộ chiếu nên dùng なくした.'
      },
      {
        id: 'q8', type: 'multiple_choice',
        text: 'Dịch sang tiếng Nhật: "Tôi muốn đi xem hoa anh đào, bạn có thể giới thiệu cho tôi chỗ nào đẹp không?"',
        options: [{ id: 'a', text: '桜を見に行きたいんですが、いい所を教えていただけませんか。' }, { id: 'b', text: '桜を見に行くですが、いい所を教えたらいいですか。' }, { id: 'c', text: '桜を見に行きたいんですが、いい所を教えますか。' }, { id: 'd', text: '桜を見に行ったんですが、いい所を教えてもいいですか。' }],
        correctOptionId: 'a', explanation: 'V-たいんですが、V-ていただけませんか là cặp mẫu câu kinh điển.'
      },
      {
        id: 'q9', type: 'multiple_choice',
        text: 'Điền vào chỗ trống: 頭が 痛い（　　）、帰ってもいいですか。',
        options: [{ id: 'a', text: 'な' }, { id: 'b', text: 'の' }, { id: 'c', text: 'ん' }, { id: 'd', text: 'だ' }],
        correctOptionId: 'c', explanation: '痛い (tính từ đuôi い) + んです.'
      },
      {
        id: 'q10', type: 'multiple_choice',
        text: 'Khi thấy bạn mình có vẻ mệt, bạn hỏi:',
        options: [{ id: 'a', text: 'どうしたんですか。' }, { id: 'b', text: 'どうしますか。' }, { id: 'c', text: 'どうなるんですか。' }, { id: 'd', text: 'どうしてですか。' }],
        correctOptionId: 'a', explanation: 'どうしたんですか là mẫu câu dùng để hỏi thăm người khác có chuyện gì.'
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
        id: 'q1', type: 'multiple_choice',
        text: 'Chia động từ sang thể Khả năng (可能動詞): 泳ぎます → ?',
        options: [{ id: 'a', text: '泳がれます' }, { id: 'b', text: '泳げます' }, { id: 'c', text: '泳ぎられます' }, { id: 'd', text: '泳げられます' }],
        correctOptionId: 'b', explanation: 'Động từ nhóm 1: Đổi hàng い sang hàng え + ます. (泳ぎます → 泳げます)'
      },
      {
        id: 'q2', type: 'multiple_choice',
        text: 'Chọn trợ từ đúng: わたしは 漢字（　　）読めます。',
        options: [{ id: 'a', text: 'を' }, { id: 'b', text: 'に' }, { id: 'c', text: 'が' }, { id: 'd', text: 'で' }],
        correctOptionId: 'c', explanation: 'Trong câu dùng động từ khả năng, tân ngữ "を" thường được đổi thành "が".'
      },
      {
        id: 'q3', type: 'multiple_choice',
        text: 'Phân biệt: Ở tầng 2 có thể nghe thấy tiếng chim hót (tự lọt vào tai).',
        options: [{ id: 'a', text: '2階から 鳥の声が 聞けます。' }, { id: 'b', text: '2階から 鳥の声が 聞きます。' }, { id: 'c', text: '2階から 鳥の声が 聞こえます。' }, { id: 'd', text: '2階から 鳥の声を 聞こえます。' }],
        correctOptionId: 'c', explanation: 'Âm thanh tự nhiên lọt vào tai dùng 聞こえます đi với trợ từ が.'
      },
      {
        id: 'q4', type: 'multiple_choice',
        text: 'Chia động từ khả năng Nhóm 2: 食べます → ?',
        options: [{ id: 'a', text: '食べれます' }, { id: 'b', text: '食べられます' }, { id: 'c', text: '食べえます' }, { id: 'd', text: '食べさせます' }],
        correctOptionId: 'b', explanation: 'Động từ nhóm 2 bỏ ます thêm られます.'
      },
      {
        id: 'q5', type: 'multiple_choice',
        text: 'Chia động từ khả năng Nhóm 3: きます (Đến) → ?',
        options: [{ id: 'a', text: 'こられます' }, { id: 'b', text: 'きれます' }, { id: 'c', text: 'きます' }, { id: 'd', text: 'こさせます' }],
        correctOptionId: 'a', explanation: '来ます chia sang khả năng là 来られます (こられます).'
      },
      {
        id: 'q6', type: 'multiple_choice',
        text: 'Điền từ: この銀行で ドル（　　）換えられます。',
        options: [{ id: 'a', text: 'を' }, { id: 'b', text: 'が' }, { id: 'c', text: 'に' }, { id: 'd', text: 'で' }],
        correctOptionId: 'b', explanation: 'Tân ngữ đi với động từ khả năng dùng が (Có thể đổi Đô la).'
      },
      {
        id: 'q7', type: 'multiple_choice',
        text: 'Dịch: "Vì bận nên tôi không thể đi chơi được."',
        options: [{ id: 'a', text: '忙しいですから、遊びに行けません。' }, { id: 'b', text: '忙しいですから、遊びに行きません。' }, { id: 'c', text: '忙しいですから、遊びに行かない。' }, { id: 'd', text: '忙しいですから、遊びに行きませんでした。' }],
        correctOptionId: 'a', explanation: '行きます → 行けます (Có thể đi), thể phủ định là 行けません (Không thể đi).'
      },
      {
        id: 'q8', type: 'multiple_choice',
        text: 'Phân biệt 見えます / 見られます: "Vì trời tối nên không nhìn thấy gì cả (tự nhiên không thấy)".',
        options: [{ id: 'a', text: '暗いですから、何も 見られません。' }, { id: 'b', text: '暗いですから、何も 見えません。' }, { id: 'c', text: '暗いですから、何も 見ません。' }, { id: 'd', text: '暗いですから、何も 見ませんでしょう。' }],
        correctOptionId: 'b', explanation: 'Tình trạng không nhìn thấy do điều kiện (trời tối) dùng 見えません.'
      },
      {
        id: 'q9', type: 'multiple_choice',
        text: 'Phân biệt 見えます / 見られます: "Ở rạp chiếu phim có thể xem được phim mới".',
        options: [{ id: 'a', text: '映画館で 新しい映画が 見られます。' }, { id: 'b', text: '映画館で 新しい映画が 見えます。' }, { id: 'c', text: '映画館で 新しい映画を 見えます。' }, { id: 'd', text: '映画館で 新しい映画が 見させます。' }],
        correctOptionId: 'a', explanation: 'Chủ động đi xem một bộ phim, dùng động từ khả năng bình thường là 見られます.'
      },
      {
        id: 'q10', type: 'multiple_choice',
        text: 'Chọn câu ĐÚNG:',
        options: [{ id: 'a', text: 'わたしは 日本語が 分かれます。' }, { id: 'b', text: 'わたしは 日本語が 分かりません。' }, { id: 'c', text: 'わたしは 日本語を 分かれます。' }, { id: 'd', text: 'わたしは 日本語を 分かります。' }],
        correctOptionId: 'b', explanation: 'Động từ 分かります không chia sang thể khả năng vì bản thân nó đã mang nghĩa trạng thái. Tân ngữ dùng が.'
      }
    ]
  }
];
