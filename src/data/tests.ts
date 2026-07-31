export interface Question {
  id: string;
  type: 'multiple_choice' | 'text_input';
  section?: string; // Phần thi (VD: "もんだい1 漢字読み", "もんだい2 文法", ...)
  skill?: string; // Phân loại kỹ năng để phân tích Gap Analysis (VD: 'Kanji', 'Từ vựng', 'Trợ từ', 'Động/Tính từ', 'Đọc hiểu')
  text: string;
  passage?: string; // Đoạn văn đọc hiểu (nếu có)

  // Dành cho trắc nghiệm
  options?: { id: string; text: string }[];
  correctOptionId?: string;

  // Dành cho tự luận / điền từ
  correctAnswers?: string[]; // Danh sách các đáp án được chấp nhận

  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  level: string;
  durationMinutes: number;
  sections?: { id: string; title: string; description: string }[];
  questions: Question[];
}

export const testsData: Test[] = [
  // ====================================================
  // BÀI THI N5 (40 CÂU - DẠNG JLPT)
  // ====================================================
  {
    id: 'n5-comprehensive',
    title: '模擬試験 N5 (Đề thi thử N5)',
    description: 'Đề thi thử theo chuẩn JLPT N5 gồm 40 câu chia 4 phần: Chữ Hán, Từ vựng, Ngữ pháp và Đọc hiểu.',
    level: 'N5',
    durationMinutes: 45,
    sections: [
      { id: 'sec1', title: 'もんだい１　文字（ふりがな）', description: 'Đọc cách đọc từ in đậm bằng Hiragana.' },
      { id: 'sec2', title: 'もんだい２　語彙（ごい）', description: 'Chọn từ hoặc chữ Hán phù hợp với nghĩa.' },
      { id: 'sec3', title: 'もんだい３　文法（ぶんぽう）', description: 'Điền trợ từ, chọn cách chia động từ, cấu trúc câu đúng.' },
      { id: 'sec4', title: 'もんだい４　読解（どっかい）', description: 'Đọc đoạn văn ngắn và trả lời câu hỏi.' },
    ],
    questions: [
      // ─────────────────────────────────────────────
      // PHẦN 1: もんだい１ 文字・ふりがな (10 câu)
      // ─────────────────────────────────────────────
      {
        id: 'n5_q01', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「今日、山田先生に 会いました。」',
        options: [{ id: 'a', text: 'きょう・やまださんせい' }, { id: 'b', text: 'こんにち・やまだせんせい' }, { id: 'c', text: 'きょう・やまだせんせい' }, { id: 'd', text: 'こんにち・やまださんせい' }],
        correctOptionId: 'c', explanation: '今日 đọc là きょう (kyou), 先生 đọc là せんせい (sensei).'
      },
      {
        id: 'n5_q02', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「毎朝、六時に 起きます。」',
        options: [{ id: 'a', text: 'まいあさ・ろくじ' }, { id: 'b', text: 'まいあさ・むじ' }, { id: 'c', text: 'まいちょう・ろくじ' }, { id: 'd', text: 'まいちょう・むじ' }],
        correctOptionId: 'a', explanation: '毎朝 đọc là まいあさ (maisasa), 六時 đọc là ろくじ (rokuji).'
      },
      {
        id: 'n5_q03', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「この 水は 冷たいです。」',
        options: [{ id: 'a', text: 'すい・さむたい' }, { id: 'b', text: 'みず・つめたい' }, { id: 'c', text: 'みず・さむたい' }, { id: 'd', text: 'すい・つめたい' }],
        correctOptionId: 'b', explanation: '水 đọc là みず (mizu), 冷たい đọc là つめたい (tsumetai).'
      },
      {
        id: 'n5_q04', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「駅の 右に 銀行が あります。」',
        options: [{ id: 'a', text: 'えき・みぎ・ぎんこ' }, { id: 'b', text: 'えき・ひだり・ぎんこう' }, { id: 'c', text: 'えき・みぎ・ぎんこう' }, { id: 'd', text: 'たつみ・みぎ・ぎんこう' }],
        correctOptionId: 'c', explanation: '駅=えき, 右=みぎ, 銀行=ぎんこう.'
      },
      {
        id: 'n5_q05', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「父は 会社員です。」',
        options: [{ id: 'a', text: 'ちち・かいしゃいん' }, { id: 'b', text: 'ちち・かいしゃしゃいん' }, { id: 'c', text: 'おとうさん・かいしゃいん' }, { id: 'd', text: 'はは・かいしゃいん' }],
        correctOptionId: 'a', explanation: '父 (ちち) là "bố" dùng khi nói về bố mình. 会社員 (かいしゃいん) là nhân viên công ty.'
      },
      {
        id: 'n5_q06', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「この 映画は 長くて、おもしろかったです。」',
        options: [{ id: 'a', text: 'えいが・みじかくて' }, { id: 'b', text: 'えいが・ながくて' }, { id: 'c', text: 'えいが・ちょうくて' }, { id: 'd', text: 'えいえい・ながくて' }],
        correctOptionId: 'b', explanation: '映画=えいが, 長くて=ながくて (dài).'
      },
      {
        id: 'n5_q07', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「来月、友達の 結婚式に 行きます。」',
        options: [{ id: 'a', text: 'らいつき・ゆうじん・けっこんしき' }, { id: 'b', text: 'らいげつ・ともだち・けっこんしき' }, { id: 'c', text: 'らいげつ・ゆうじん・けっこんしき' }, { id: 'd', text: 'らいつき・ともだち・けっこんしき' }],
        correctOptionId: 'b', explanation: '来月=らいげつ, 友達=ともだち, 結婚式=けっこんしき.'
      },
      {
        id: 'n5_q08', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「外は 雨が 降っています。」',
        options: [{ id: 'a', text: 'そと・あめ・ふって' }, { id: 'b', text: 'うち・あめ・ふって' }, { id: 'c', text: 'そと・ゆき・ふって' }, { id: 'd', text: 'がい・あめ・くだって' }],
        correctOptionId: 'a', explanation: '外=そと (bên ngoài), 雨=あめ (mưa), 降っています=đang rơi/đang mưa.'
      },
      {
        id: 'n5_q09', type: 'multiple_choice', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「図書館で 本を 読みました。」',
        options: [{ id: 'a', text: 'としょかん・ほん・よみました' }, { id: 'b', text: 'としょかん・ほん・みました' }, { id: 'c', text: 'としょかん・ほん・かきました' }, { id: 'd', text: 'としょくん・ほん・よみました' }],
        correctOptionId: 'a', explanation: '図書館=としょかん, 本=ほん, 読みました=よみました (đã đọc).'
      },
      {
        id: 'n5_q10', type: 'multiple_choice', skill: 'Kanji', section: 'もんだい１　文字（ふりがな）',
        text: '＿＿の ことばは どう よみますか？\n「先週、新聞に 大きい 記事が ありました。」',
        options: [{ id: 'a', text: 'せんしゅう・しんぶん・おきい・きじ' }, { id: 'b', text: 'せんしゅう・しんぶん・おおきい・きじ' }, { id: 'c', text: 'らいしゅう・しんぶん・おおきい・きじ' }, { id: 'd', text: 'せんしゅう・しんぶん・おおきい・きい' }],
        correctOptionId: 'b', explanation: '先週=せんしゅう, 新聞=しんぶん, 大きい=おおきい, 記事=きじ.'
      },
      // ─────────────────────────────────────────────
      // PHẦN 2: もんだい２ 語彙 - Từ vựng (10 câu)
      // ─────────────────────────────────────────────
      {
        id: 'n5_q11', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '「しずか」の 意味として ただしいのは どれですか？',
        options: [{ id: 'a', text: 'うるさい (ồn ào)' }, { id: 'b', text: 'にぎやか (náo nhiệt)' }, { id: 'c', text: 'しずか (yên tĩnh)' }, { id: 'd', text: 'あつい (nóng)' }],
        correctOptionId: 'c', explanation: 'しずか (静か) nghĩa là "yên tĩnh, im lặng". Đây là tính từ đuôi な.'
      },
      {
        id: 'n5_q12', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「スーパーで　やさいと　（　　）を　かいました。」',
        options: [{ id: 'a', text: 'くだもの' }, { id: 'b', text: 'えんぴつ' }, { id: 'c', text: 'くすり' }, { id: 'd', text: 'きって' }],
        correctOptionId: 'a', explanation: 'Đi mua rau ở siêu thị thì cũng hay mua thêm くだもの (trái cây).'
      },
      {
        id: 'n5_q13', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「あたまが　いたいので、（　　）を　のみました。」',
        options: [{ id: 'a', text: 'おちゃ' }, { id: 'b', text: 'くすり' }, { id: 'c', text: 'みず' }, { id: 'd', text: 'ぎゅうにゅう' }],
        correctOptionId: 'b', explanation: 'Vì đau đầu nên uống くすり (thuốc).'
      },
      {
        id: 'n5_q14', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '「あの　えきまで　あるいて　なんぷんですか。」という　ぶんの　「あるいて」の　いみは？',
        options: [{ id: 'a', text: 'Đi xe đạp' }, { id: 'b', text: 'Đi bộ' }, { id: 'c', text: 'Đi xe buýt' }, { id: 'd', text: 'Đi ô tô' }],
        correctOptionId: 'b', explanation: 'あるいて là thể て của あるく (歩く) = đi bộ.'
      },
      {
        id: 'n5_q15', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '「ちかい」の　はんたいは　なんですか？',
        options: [{ id: 'a', text: 'あぶない' }, { id: 'b', text: 'とおい' }, { id: 'c', text: 'ちいさい' }, { id: 'd', text: 'ひろい' }],
        correctOptionId: 'b', explanation: 'ちかい (gần) ↔ とおい (xa). Đây là cặp tính từ trái nghĩa.'
      },
      {
        id: 'n5_q16', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「ちょっと　まって　ください。いま　（　　）です。」',
        options: [{ id: 'a', text: 'いそがしい' }, { id: 'b', text: 'たのしい' }, { id: 'c', text: 'うれしい' }, { id: 'd', text: 'かなしい' }],
        correctOptionId: 'a', explanation: '"Chờ một chút. Bây giờ tôi đang いそがしい (bận)."'
      },
      {
        id: 'n5_q17', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: 'つぎの　ぶんと　ちかい　いみの　ぶんは　どれですか？\n「わたしは　テニスが　じょうずでは　ありません。」',
        options: [{ id: 'a', text: 'テニスが　すきです。' }, { id: 'b', text: 'テニスが　へたです。' }, { id: 'c', text: 'テニスが　たのしいです。' }, { id: 'd', text: 'テニスが　きらいです。' }],
        correctOptionId: 'b', explanation: 'じょうず (giỏi) ↔ へた (tệ, kém). Không giỏi = kém.'
      },
      {
        id: 'n5_q18', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「まいにち　（　　）で　かいしゃに　いきます。」',
        options: [{ id: 'a', text: 'でんしゃ' }, { id: 'b', text: 'でんわ' }, { id: 'c', text: 'でんき' }, { id: 'd', text: 'でんち' }],
        correctOptionId: 'a', explanation: 'Phương tiện đi làm hàng ngày: でんしゃ (xe điện/tàu điện).'
      },
      {
        id: 'n5_q19', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '「きのう　えいがを　みました」の　「きのう」の　いみは？',
        options: [{ id: 'a', text: 'Hôm nay' }, { id: 'b', text: 'Ngày mai' }, { id: 'c', text: 'Hôm qua' }, { id: 'd', text: 'Ngày kia' }],
        correctOptionId: 'c', explanation: 'きのう (昨日) = hôm qua.'
      },
      {
        id: 'n5_q20', type: 'multiple_choice', skill: 'Từ vựng', section: 'もんだい２　語彙（ごい）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「この　へやは　（　　）て、きれいです。」',
        options: [{ id: 'a', text: 'せまくて' }, { id: 'b', text: 'ひろく' }, { id: 'c', text: 'きたなく' }, { id: 'd', text: 'みじかく' }],
        correctOptionId: 'b', explanation: 'Phòng rộng và đẹp: ひろくて (thể て của ひろい - rộng).'
      },
      // ─────────────────────────────────────────────
      // PHẦN 3: もんだい３ 文法 - Ngữ pháp (12 câu)
      // ─────────────────────────────────────────────
      {
        id: 'n5_q21', type: 'multiple_choice', skill: 'Trợ từ', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「わたしは　まいにち　コーヒー（　　）のみます。」',
        options: [{ id: 'a', text: 'が' }, { id: 'b', text: 'を' }, { id: 'c', text: 'に' }, { id: 'd', text: 'で' }],
        correctOptionId: 'b', explanation: 'Trợ từ を đi với tân ngữ của động từ: コーヒーを のみます (uống cà phê).'
      },
      {
        id: 'n5_q22', type: 'multiple_choice', skill: 'Trợ từ', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「つくえ（　　）うえ　に　ほんが　あります。」',
        options: [{ id: 'a', text: 'を' }, { id: 'b', text: 'が' }, { id: 'c', text: 'の' }, { id: 'd', text: 'に' }],
        correctOptionId: 'c', explanation: 'Chỉ sở hữu/vị trí: つくえ の うえ (trên mặt bàn).'
      },
      {
        id: 'n5_q23', type: 'multiple_choice', skill: 'Trợ từ', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「きのう　ともだち（　　）えいがを　みました。」',
        options: [{ id: 'a', text: 'に' }, { id: 'b', text: 'で' }, { id: 'c', text: 'と' }, { id: 'd', text: 'が' }],
        correctOptionId: 'c', explanation: 'と chỉ "cùng với ai": ともだち と (cùng bạn bè).'
      },
      {
        id: 'n5_q24', type: 'multiple_choice', skill: 'Trợ từ', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「A：すきやきは　どう　でしたか。　B：（　　）、おいしかったです。」',
        options: [{ id: 'a', text: 'はじめて' }, { id: 'b', text: 'はじめまして' }, { id: 'c', text: 'はじめての' }, { id: 'd', text: 'はじめ' }],
        correctOptionId: 'a', explanation: 'はじめて (lần đầu tiên). "Đây là lần đầu, (tôi thấy) ngon!"'
      },
      {
        id: 'n5_q25', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「えきから　うちまで　（　　）で　じゅっぷんです。」',
        options: [{ id: 'a', text: 'あるき' }, { id: 'b', text: 'あるいて' }, { id: 'c', text: 'あるく' }, { id: 'd', text: 'あるいた' }],
        correctOptionId: 'b', explanation: 'あるいて（歩いて）= đi bộ. Cách tính thời gian di chuyển: 〜て〜ふん。'
      },
      {
        id: 'n5_q26', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「すみません、（　　）を　おしえて　いただけますか。」',
        options: [{ id: 'a', text: 'じかん' }, { id: 'b', text: 'じかんの' }, { id: 'c', text: 'なんじ' }, { id: 'd', text: 'いつ' }],
        correctOptionId: 'c', explanation: 'Hỏi giờ: なんじ ですか / なんじ を おしえて ください。'
      },
      {
        id: 'n5_q27', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: 'ただしい　ぶんは　どれですか？',
        options: [{ id: 'a', text: 'わたしは　ねこが　すきです。' }, { id: 'b', text: 'わたしが　ねこを　すきです。' }, { id: 'c', text: 'わたしに　ねこは　すきです。' }, { id: 'd', text: 'わたしを　ねこが　すきです。' }],
        correctOptionId: 'a', explanation: '～が すきです là cấu trúc cố định. Chủ ngữ dùng は, thứ thích dùng が.'
      },
      {
        id: 'n5_q28', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「ははは　りょうりが（　　）。」（Mẹ nấu ăn giỏi）',
        options: [{ id: 'a', text: 'じょうずです' }, { id: 'b', text: 'じょうずに　します' }, { id: 'c', text: 'じょうずが　あります' }, { id: 'd', text: 'じょうずで　います' }],
        correctOptionId: 'a', explanation: 'りょうりが　じょうずです = nấu ăn giỏi. Dùng が với じょうず.'
      },
      {
        id: 'n5_q29', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「A：たばこを　（　　）か。　B：いいえ、すいません。」',
        options: [{ id: 'a', text: 'すいません' }, { id: 'b', text: 'すいます' }, { id: 'c', text: 'すいましょう' }, { id: 'd', text: 'すって　もいいです' }],
        correctOptionId: 'b', explanation: 'Hỏi "Anh có hút thuốc không?" dùng: V-ます + か (câu hỏi礼儀).'
      },
      {
        id: 'n5_q30', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「わたしは　にほんご（　　）べんきょう　して　います。」',
        options: [{ id: 'a', text: 'が' }, { id: 'b', text: 'を' }, { id: 'c', text: 'に' }, { id: 'd', text: 'で' }],
        correctOptionId: 'b', explanation: 'べんきょうする là ngoại động từ, tân ngữ dùng を: にほんごをべんきょうします.'
      },
      {
        id: 'n5_q31', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: '（　　）に　はいる　ことばは　どれですか？\n「きょうは　やすみです（　　）、どこかへ　いきましょう！」',
        options: [{ id: 'a', text: 'でも' }, { id: 'b', text: 'だから' }, { id: 'c', text: 'でした' }, { id: 'd', text: 'では' }],
        correctOptionId: 'b', explanation: 'だから = "vì vậy, cho nên". Hôm nay nghỉ → vì vậy hãy đi chơi đâu đó!'
      },
      {
        id: 'n5_q32', type: 'multiple_choice', skill: 'Ngữ pháp', section: 'もんだい３　文法（ぶんぽう）',
        text: 'ただしい　ぶんは　どれですか？\n（ Dịch: "Người kia là người Hàn Quốc hay người Trung Quốc?" ）',
        options: [{ id: 'a', text: 'あの　ひとは　かんこくじんや　ちゅうごくじんですか。' }, { id: 'b', text: 'あの　ひとは　かんこくじんか　ちゅうごくじんですか。' }, { id: 'c', text: 'あの　ひとは　かんこくじんと　ちゅうごくじんですか。' }, { id: 'd', text: 'あの　ひとは　かんこくじんが　ちゅうごくじんですか。' }],
        correctOptionId: 'b', explanation: '～か～ですか là cấu trúc câu hỏi "lựa chọn" = "A hay B?"'
      },
      // ─────────────────────────────────────────────
      // PHẦN 4: もんだい４ 読解 - Đọc hiểu (8 câu / 2 đoạn văn)
      // ─────────────────────────────────────────────
      {
        id: 'n5_q33', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        passage: '【文章①】\nわたしの　なまえは　タン　です。ベトナムから　きました。いまは　とうきょうの　だいがくで　にほんごを　べんきょう　して　います。まいにち　バスで　がっこうへ　いきます。がっこうは　うちから　ちかいですが、バスで　じゅっぷん　かかります。\n\nやすみの　ひは　たいてい　としょかんへ　いきます。としょかんで　にほんごの　ほんを　よんだり、インターネットを　したり　します。にほんご　は　むずかしいですが、たのしいです。',
        text: '①　タンさんは　いま　どこで　にほんごを　べんきょう　して　いますか。',
        options: [{ id: 'a', text: 'ベトナムの　だいがく' }, { id: 'b', text: 'とうきょうの　だいがく' }, { id: 'c', text: 'としょかん' }, { id: 'd', text: 'タンさんの　うち' }],
        correctOptionId: 'b', explanation: 'Trong bài có câu: 「とうきょうの　だいがくで　にほんごを　べんきょう　しています。」'
      },
      {
        id: 'n5_q34', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '②　がっこうまで　どうやって　いきますか。',
        options: [{ id: 'a', text: 'でんしゃで　いきます。' }, { id: 'b', text: 'くるまで　いきます。' }, { id: 'c', text: 'バスで　いきます。' }, { id: 'd', text: 'あるいて　いきます。' }],
        correctOptionId: 'c', explanation: '「まいにち　バスで　がっこうへ　いきます。」'
      },
      {
        id: 'n5_q35', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '③　タンさんは　やすみの　ひに　たいてい　なにを　しますか。',
        options: [{ id: 'a', text: 'うちで　べんきょう　します。' }, { id: 'b', text: 'としょかんへ　いきます。' }, { id: 'c', text: 'ベトナムに　かえります。' }, { id: 'd', text: 'ともだちと　あそびます。' }],
        correctOptionId: 'b', explanation: '「やすみの　ひは　たいてい　としょかんへ　いきます。」'
      },
      {
        id: 'n5_q36', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '④　この　ぶんしょうの　ないようと　あっている　ものは　どれですか。',
        options: [{ id: 'a', text: 'タンさんは　にほんごが　むずかしくて、つまらないと　おもっています。' }, { id: 'b', text: 'タンさんの　うちは　がっこうから　とおいです。' }, { id: 'c', text: 'タンさんは　にほんごが　むずかしいですが、たのしいと　おもっています。' }, { id: 'd', text: 'タンさんは　やすみの　ひに　えいがを　みます。' }],
        correctOptionId: 'c', explanation: '「にほんごは　むずかしいですが、たのしいです。」'
      },
      {
        id: 'n5_q37', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        passage: '【文章②】\n＜メール＞\nあてさき：かとうさん\nけんめい：こんしゅうの　パーティー\n\nかとうさん、こんにちは。\nこんしゅうの　どようびに　わたしの　うちで　パーティーを　します。じかんは　ごごの　さんじからです。たべものや　のみものは　わたしが　よういします。かとうさんは　なにも　もってこなくても　いいです。\nよかったら、きて　ください。\n\nやまだ',
        text: '⑤　パーティーは　いつですか。',
        options: [{ id: 'a', text: 'こんしゅうの　きんようびの　ごごさんじ' }, { id: 'b', text: 'こんしゅうの　どようびの　ごごさんじ' }, { id: 'c', text: 'らいしゅうの　どようびの　ごごさんじ' }, { id: 'd', text: 'こんしゅうの　どようびの　ごぜんさんじ' }],
        correctOptionId: 'b', explanation: '「こんしゅうの　どようびに　... じかんは　ごごの　さんじからです。」'
      },
      {
        id: 'n5_q38', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '⑥　パーティーは　どこで　しますか。',
        options: [{ id: 'a', text: 'レストラン' }, { id: 'b', text: 'かとうさんの　うち' }, { id: 'c', text: 'やまださんの　うち' }, { id: 'd', text: 'がっこう' }],
        correctOptionId: 'c', explanation: '「わたしの　うちで　パーティーを　します。」 Người viết mail là やまだ.'
      },
      {
        id: 'n5_q39', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '⑦　かとうさんは　パーティーに　なにを　もって　いきますか。',
        options: [{ id: 'a', text: 'たべものと　のみもの' }, { id: 'b', text: 'たべものだけ' }, { id: 'c', text: 'のみものだけ' }, { id: 'd', text: 'なにも　もっていかなくても　いいです' }],
        correctOptionId: 'd', explanation: '「かとうさんは　なにも　もってこなくても　いいです。」 (Không cần mang gì cả)'
      },
      {
        id: 'n5_q40', type: 'multiple_choice', skill: 'Đọc hiểu', section: 'もんだい４　読解（どっかい）',
        text: '⑧　この　メールの　ないようで　ただしいのは　どれですか。',
        options: [{ id: 'a', text: 'やまださんは　かとうさんの　うちで　パーティーを　します。' }, { id: 'b', text: 'かとうさんが　たべものと　のみものを　よういします。' }, { id: 'c', text: 'パーティーは　ごごさんじから　はじまります。' }, { id: 'd', text: 'かとうさんは　パーティーに　たべものを　もっていきます。' }],
        correctOptionId: 'c', explanation: '「じかんは　ごごの　さんじからです。」 Đây là đáp án đúng. やまだ chuẩn bị đồ ăn, không phải かとう.'
      },
    ]
  },

  // ====================================================
  // BÀI KIỂM TRA BÀI 26 (10 câu)
  // ====================================================
  {
    id: 'lesson-26',
    title: 'Bài Kiểm Tra Bài 26',
    description: 'Kiểm tra mẫu câu ～んです, ～ていただけませんか, ～たらいいですか.',
    level: 'N4',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chọn cách chia đúng với ～んです: 「明日、テストが（　　）んです。」',
        options: [{ id: 'a', text: 'あります' }, { id: 'b', text: 'ある' }, { id: 'c', text: 'あった' }, { id: 'd', text: 'あり' }],
        correctOptionId: 'b', explanation: 'Trước んです là thể thông thường (普通形). あります → ある.'
      },
      {
        id: 'q2', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Dịch câu sau sang tiếng Nhật: "Bạn có thể chỉ cho tôi cách đi đến nhà ga được không?"',
        options: [{ id: 'a', text: '駅の行き方を 教えても いいですか。' }, { id: 'b', text: '駅の行き方を 教えていただけませんか。' }, { id: 'c', text: '駅の行き方を 教えなければなりませんか。' }, { id: 'd', text: '駅の行き方を 教えるんですか。' }],
        correctOptionId: 'b', explanation: 'Mẫu câu ～ていただけませんか dùng để nhờ vả một cách lịch sự.'
      },
      {
        id: 'q3', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Điền vào chỗ trống: カメラを買いたいんですが、どこで（　　）いいですか。',
        options: [{ id: 'a', text: '買った' }, { id: 'b', text: '買えば' }, { id: 'c', text: '買ったら' }, { id: 'd', text: '買うと' }],
        correctOptionId: 'c', explanation: 'Mẫu câu hỏi lời khuyên: Từ để hỏi + V-たら いいですか。'
      },
      {
        id: 'q4', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Điền vào chỗ trống: わたしは 日本語が（　　）んですが、...',
        options: [{ id: 'a', text: '下手' }, { id: 'b', text: '下手だ' }, { id: 'c', text: '下手な' }, { id: 'd', text: '下手の' }],
        correctOptionId: 'c', explanation: 'Tính từ đuôi な + んです → なんです. 下手な → 下手なんです.'
      },
      {
        id: 'q5', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chia đúng: パスポートを（　　）んですが、どうしたらいいですか。',
        options: [{ id: 'a', text: 'なくす' }, { id: 'b', text: 'なくした' }, { id: 'c', text: 'なくして' }, { id: 'd', text: 'なくさない' }],
        correctOptionId: 'b', explanation: 'Đã làm mất hộ chiếu nên dùng quá khứ: なくした.'
      },
      {
        id: 'q6', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Khi thấy bạn mình có vẻ mệt, bạn hỏi:',
        options: [{ id: 'a', text: 'どうしたんですか。' }, { id: 'b', text: 'どうしますか。' }, { id: 'c', text: 'どうなるんですか。' }, { id: 'd', text: 'どうしてですか。' }],
        correctOptionId: 'a', explanation: 'どうしたんですか là mẫu câu hỏi thăm khi thấy ai đó có vẻ không ổn.'
      },
      {
        id: 'q7', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Câu nào dưới đây dùng đúng んです?',
        options: [{ id: 'a', text: '雨がふります んです。' }, { id: 'b', text: '雨がふる んです。' }, { id: 'c', text: '雨がふりました んです。' }, { id: 'd', text: '雨がふって んです。' }],
        correctOptionId: 'b', explanation: 'Động từ thể thông thường + んです: ふる んです.'
      },
      {
        id: 'q8', type: 'text_input', skill: 'Ngữ pháp',
        text: 'Dịch sang tiếng Nhật: "Tôi đang bị đau bụng, tôi phải làm thế nào đây?" (Dùng んです và たらいいですか)',
        correctAnswers: ['おなかが　いたいんですが、どうしたらいいですか。', 'おなかがいたいんですが、どうしたらいいですか。', 'おなかが いたいんですが、どうしたら いいですか。'],
        explanation: 'Cấu trúc: いたい (tính từ い) + んですが + どうしたら いいですか.'
      },
      {
        id: 'q9', type: 'multiple_choice', skill: 'Ngữ pháp',
        passage: 'アリさんは　日本語の　クラスで　先生に　聞きました。\n「先生、ちょっと　いいですか。わたしは　来月　日本へ　行くんですが、電車の　乗り方が　わからないんです。どう　したら　いいでしょうか。」\n「まず、みどりの　窓口で　きっぷを　かって　ください。ひょうじを　よく　みたら　いいですよ。」',
        text: '会話の内容と合っているのはどれですか。',
        options: [{ id: 'a', text: 'アリさんは　日本の　電車に　のった　ことが　あります。' }, { id: 'b', text: 'アリさんは　電車の　乗り方が　わかりません。' }, { id: 'c', text: '先生は　みどりの　窓口へ　行きます。' }, { id: 'd', text: 'アリさんは　来月　日本を　出ます。' }],
        correctOptionId: 'b', explanation: '「電車の　乗り方が　わからないんです。」 → アリさんは電車の乗り方が分からない.'
      },
      {
        id: 'q10', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: '先生の　アドバイスは　なんですか。',
        options: [{ id: 'a', text: '先生に　きく' }, { id: 'b', text: 'じぶんで　しらべる' }, { id: 'c', text: 'みどりの　窓口で　きっぷを　かって、ひょうじを　みる。' }, { id: 'd', text: 'タクシーを　つかう' }],
        correctOptionId: 'c', explanation: '「みどりの　窓口で　きっぷを　かって　ください。ひょうじを　よく　みたら　いいですよ。」'
      },
    ]
  },

  // ====================================================
  // BÀI KIỂM TRA BÀI 27 - PHẦN 1 (10 câu - chỉ 可能動詞)
  // ====================================================
  {
    id: 'lesson-27-part1',
    title: 'Bài Kiểm Tra Bài 27 (Nửa bài đầu)',
    description: 'Kiểm tra chia động từ khả năng (可能動詞) — Nhóm 1, 2, 3 và cách dùng trong câu.',
    level: 'N4',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chia động từ sang thể Khả năng: 泳ぎます (Nhóm 1) → ?',
        options: [{ id: 'a', text: '泳がれます' }, { id: 'b', text: '泳げます' }, { id: 'c', text: '泳ぎられます' }, { id: 'd', text: '泳げられます' }],
        correctOptionId: 'b', explanation: 'Động từ nhóm 1: Đổi âm hàng い sang hàng え rồi thêm ます. ぎ→げ: 泳ぎます → 泳げます.'
      },
      {
        id: 'q2', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chia động từ sang thể Khả năng: 食べます (Nhóm 2) → ?',
        options: [{ id: 'a', text: '食べれます' }, { id: 'b', text: '食べられます' }, { id: 'c', text: '食べえます' }, { id: 'd', text: '食べさせます' }],
        correctOptionId: 'b', explanation: 'Động từ nhóm 2: bỏ ます rồi thêm られます. 食べ + られます = 食べられます.'
      },
      {
        id: 'q3', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chia động từ sang thể Khả năng: します (Nhóm 3) → ?',
        options: [{ id: 'a', text: 'されます' }, { id: 'b', text: 'せられます' }, { id: 'c', text: 'できます' }, { id: 'd', text: 'しられます' }],
        correctOptionId: 'c', explanation: 'します (Nhóm 3) biến đổi thành できます (quy tắc bất quy tắc).'
      },
      {
        id: 'q4', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chia động từ sang thể Khả năng: 来ます (Nhóm 3) → ?',
        options: [{ id: 'a', text: '来れます' }, { id: 'b', text: '来られます' }, { id: 'c', text: '来えます' }, { id: 'd', text: '来させます' }],
        correctOptionId: 'b', explanation: '来ます (くる/Nhóm 3) → 来られます (こられます).'
      },
      {
        id: 'q5', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Chọn trợ từ đúng: わたしは 漢字（　　）読めます。',
        options: [{ id: 'a', text: 'を' }, { id: 'b', text: 'に' }, { id: 'c', text: 'が' }, { id: 'd', text: 'で' }],
        correctOptionId: 'c', explanation: 'Tân ngữ "を" đổi thành "が" khi dùng với động từ khả năng: 漢字が 読めます.'
      },
      {
        id: 'q6', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Câu nào đúng ngữ pháp? (Bạn có thể nói tiếng Anh không?)',
        options: [{ id: 'a', text: '英語が 話しますか。' }, { id: 'b', text: '英語が 話せますか。' }, { id: 'c', text: '英語を 話せますか。' }, { id: 'd', text: '英語に 話せますか。' }],
        correctOptionId: 'b', explanation: '動詞可能形 + が: 英語が 話せますか。 (tân ngữ dùng が khi dùng khả năng)'
      },
      {
        id: 'q7', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Dịch sang tiếng Nhật: "Vì bận nên tôi không thể đi chơi được."',
        options: [{ id: 'a', text: '忙しいですから、遊びに行けません。' }, { id: 'b', text: '忙しいですから、遊びに行きません。' }, { id: 'c', text: '忙しいですから、遊びに行かない。' }, { id: 'd', text: '忙しいですから、遊びに行けました。' }],
        correctOptionId: 'a', explanation: '行きます → 行けます (có thể đi) → 行けません (không thể đi).'
      },
      {
        id: 'q8', type: 'multiple_choice', skill: 'Ngữ pháp',
        text: 'Trợ từ nào không thay đổi khi dùng động từ khả năng?',
        options: [{ id: 'a', text: 'を → が' }, { id: 'b', text: 'に giữ nguyên' }, { id: 'c', text: 'で giữ nguyên' }, { id: 'd', text: 'Cả B và C đều đúng' }],
        correctOptionId: 'd', explanation: 'Chỉ có tân ngữ を mới đổi thành が. Các trợ từ khác như に, へ, で, と đều giữ nguyên.'
      },
      {
        id: 'q9', type: 'text_input', skill: 'Ngữ pháp',
        text: 'Chia sang thể khả năng và điền vào chỗ trống: 書きます → この漢字（　　）。 (Điền: trợ từ + động từ khả năng)',
        correctAnswers: ['が書けます', 'が　書けます', 'がかけます'],
        explanation: 'この漢字が 書けます。 Tân ngữ を → が, 書きます → 書けます (nhóm 1: き→け).'
      },
      {
        id: 'q10', type: 'multiple_choice', skill: 'Ngữ pháp',
        passage: 'アンさんは　ベトナム人です。日本語を　１年　勉強しました。今は　ひらがなと　カタカナが　読めます。簡単な　漢字も　少し　読めます。でも、まだ　日本語で　手紙が　書けません。これから　もっと　練習したいです。',
        text: 'アンさんが　今　できないことは　何ですか。',
        options: [
          { id: 'a', text: 'ひらがなを　読むこと' },
          { id: 'b', text: 'カタカナを　読むこと' },
          { id: 'c', text: '簡単な　漢字を　読むこと' },
          { id: 'd', text: '日本語で　手紙を　書くこと' }
        ],
        correctOptionId: 'd', explanation: '「まだ　日本語で　手紙が　書けません」→ 手紙を書くことが　まだ　できません。'
      },
    ]
  },
  {
    id: "lesson-27-part2",
    title: "Bài Kiểm Tra Bài 27 (Nửa bài sau)",
    description: "Kiểm tra kiến thức: 見えます, 聞こえます, しか...ません, できます.",
    level: "N4",
    durationMinutes: 10,
    questions: [
      {
        id: "l27_p2_q1",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "富士山が（　　）ます。",
        options: [
          {
            id: "a",
            text: "見え"
          },
          {
            id: "b",
            text: "見られ"
          },
          {
            id: "c",
            text: "見せ"
          },
          {
            id: "d",
            text: "見"
          }
        ],
        correctOptionId: "a",
        explanation: "Nhìn thấy (một cách tự nhiên) dùng 見えます."
      },
      {
        id: "l27_p2_q2",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "波の音が（　　）ます。",
        options: [
          {
            id: "a",
            text: "聞け"
          },
          {
            id: "b",
            text: "聞こえ"
          },
          {
            id: "c",
            text: "聞かせ"
          },
          {
            id: "d",
            text: "聞き"
          }
        ],
        correctOptionId: "b",
        explanation: "Nghe thấy (âm thanh đập vào tai tự nhiên) dùng 聞こえます."
      },
      {
        id: "l27_p2_q3",
        type: "multiple_choice",
        skill: "Trợ từ (Particles)",
        text: "ローマ字（　　）書けません。",
        options: [
          {
            id: "a",
            text: "だけ"
          },
          {
            id: "b",
            text: "しか"
          },
          {
            id: "c",
            text: "が"
          },
          {
            id: "d",
            text: "を"
          }
        ],
        correctOptionId: "b",
        explanation: "しか đi với phủ định (ません) mang nghĩa 'chỉ'."
      },
      {
        id: "l27_p2_q4",
        type: "multiple_choice",
        skill: "Trợ từ (Particles)",
        text: "駅の前に大きいスーパー（　　）できました。",
        options: [
          {
            id: "a",
            text: "を"
          },
          {
            id: "b",
            text: "で"
          },
          {
            id: "c",
            text: "が"
          },
          {
            id: "d",
            text: "に"
          }
        ],
        correctOptionId: "c",
        explanation: "Hoàn thành, được xây lên dùng ができます."
      },
      {
        id: "l27_p2_q5",
        type: "multiple_choice",
        skill: "Động từ Khả năng",
        text: "わたしは ひらがな（　　）わかります。",
        options: [
          {
            id: "a",
            text: "だけ"
          },
          {
            id: "b",
            text: "しか"
          },
          {
            id: "c",
            text: "も"
          },
          {
            id: "d",
            text: "で"
          }
        ],
        correctOptionId: "a",
        explanation: "だけ đi với khẳng định (わかります) mang nghĩa 'chỉ'."
      },
      {
        id: "l27_p2_q6",
        type: "multiple_choice",
        skill: "Động/Tính từ (Verbs/Adj)",
        text: "ワインは 飲みますが、ビールは（　　）。",
        options: [
          {
            id: "a",
            text: "飲みます"
          },
          {
            id: "b",
            text: "飲みません"
          },
          {
            id: "c",
            text: "飲めます"
          },
          {
            id: "d",
            text: "飲めません"
          }
        ],
        correctOptionId: "b",
        explanation: "Đối chiếu: rượu thì uống nhưng bia thì KHÔNG uống (không dùng thể khả năng ở đây vì là thói quen)."
      },
      {
        id: "l27_p2_q7",
        type: "multiple_choice",
        skill: "Trợ từ (Particles)",
        text: "あの店では いいワイン（　　）買えません。",
        options: [
          {
            id: "a",
            text: "だけ"
          },
          {
            id: "b",
            text: "しか"
          },
          {
            id: "c",
            text: "が"
          },
          {
            id: "d",
            text: "は"
          }
        ],
        correctOptionId: "b",
        explanation: "しか + phủ định: Chỉ có thể mua... (không mua được cái khác)."
      },
      {
        id: "l27_p2_q8",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Chuyển sang dùng しか...ません: \nローマ字だけ わかります。 \n👉 ローマ字しか （　　　　　）。",
        correctAnswers: [
          "わかりません",
          "わかりません。"
        ],
        explanation: "しか đi với động từ phủ định."
      },
      {
        id: "l27_p2_q9",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Hoàn thành câu: \nここから 山（　） 見えます。",
        correctAnswers: [
          "が"
        ],
        explanation: "見えます đi với trợ từ が."
      },
      {
        id: "l27_p2_q10",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "鳥の（　　）が聞こえます。",
        options: [
          {
            id: "a",
            text: "声"
          },
          {
            id: "b",
            text: "音"
          },
          {
            id: "c",
            text: "歌"
          },
          {
            id: "d",
            text: "言葉"
          }
        ],
        correctOptionId: "a",
        explanation: "Tiếng động vật/người dùng 声 (こえ), tiếng đồ vật dùng 音 (おと)."
      }
    ]
  },
  {
    id: "lesson-27-part2-hw",
    title: "Bài Tập Về Nhà Bài 27 (Nửa bài sau)",
    description: "Bài tập củng cố kiến thức cuối bài 27.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l27_hw_q1",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "新しい駅が(　)。",
        options: [
          { id: "a", text: "できました" },
          { id: "b", text: "つくりました" },
          { id: "c", text: "ひらきました" },
          { id: "d", text: "はじめました" }
        ],
        correctOptionId: "a",
        explanation: "Xây xong/hoàn thành dùng できました."
      },
      {
        id: "l27_hw_q2",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "漢字が 少し(　)。",
        options: [
          { id: "a", text: "読めます" },
          { id: "b", text: "読みます" },
          { id: "c", text: "読ませます" },
          { id: "d", text: "読まれます" }
        ],
        correctOptionId: "a",
        explanation: "Thể khả năng của 読みます là 読めます (có thể đọc)."
      },
      {
        id: "l27_hw_q3",
        type: "multiple_choice",
        skill: "Trợ từ (Particles)",
        text: "私は 日本語(　) 話せます。",
        options: [
          { id: "a", text: "を" },
          { id: "b", text: "が" },
          { id: "c", text: "に" },
          { id: "d", text: "で" }
        ],
        correctOptionId: "b",
        explanation: "Trợ từ を chuyển thành が khi dùng động từ thể khả năng."
      },
      {
        id: "l27_hw_q4",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "ここから 富士山が(　)。",
        options: [
          { id: "a", text: "見られます" },
          { id: "b", text: "見えます" },
          { id: "c", text: "見ます" },
          { id: "d", text: "見せます" }
        ],
        correctOptionId: "b",
        explanation: "見えます (nhìn thấy tự nhiên, không cần cố gắng) phù hợp khi nói về phong cảnh đập vào mắt."
      },
      {
        id: "l27_hw_q5",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "隣の 部屋から 変な声が(　)。",
        options: [
          { id: "a", text: "聞かれます" },
          { id: "b", text: "聞こえます" },
          { id: "c", text: "聞けます" },
          { id: "d", text: "聞きます" }
        ],
        correctOptionId: "b",
        explanation: "聞こえます (nghe thấy tự nhiên) phù hợp khi âm thanh vô tình lọt vào tai."
      },
      {
        id: "l27_hw_q6",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "ローマ字(　) 書けません。",
        options: [
          { id: "a", text: "だけ" },
          { id: "b", text: "しか" },
          { id: "c", text: "も" },
          { id: "d", text: "が" }
        ],
        correctOptionId: "b",
        explanation: "しか + phủ định (chỉ... ngoài ra không). しか書けません = chỉ có thể viết..."
      },
      {
        id: "l27_hw_q7",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "日曜日(　) 休みます。",
        options: [
          { id: "a", text: "しか" },
          { id: "b", text: "だけ" },
          { id: "c", text: "でも" },
          { id: "d", text: "まで" }
        ],
        correctOptionId: "b",
        explanation: "だけ + khẳng định. だけ休みます = chỉ nghỉ ngày Chủ nhật."
      },
      {
        id: "l27_hw_q8",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "この店は(　)が いいですね。",
        options: [
          { id: "a", text: "けしき" },
          { id: "b", text: "どうぐ" },
          { id: "c", text: "マンション" },
          { id: "d", text: "ペット" }
        ],
        correctOptionId: "a",
        explanation: "景色 (けしき - phong cảnh) phù hợp ngữ cảnh khen nhà hàng/quán ăn có view đẹp."
      },
      {
        id: "l27_hw_q9",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "ワインは(　)が、ビールは(　)。",
        options: [
          { id: "a", text: "飲みます／飲みます" },
          { id: "b", text: "飲みません／飲みません" },
          { id: "c", text: "飲みます／飲みません" },
          { id: "d", text: "飲みません／飲みます" }
        ],
        correctOptionId: "c",
        explanation: "Dùng は...が、は... để so sánh đối lập. Rượu thì uống, nhưng bia thì không uống."
      },
      {
        id: "l27_hw_q10",
        type: "multiple_choice",
        skill: "Động từ Khả năng",
        text: "来ます -> (Thể khả năng)?",
        options: [
          { id: "a", text: "きれます" },
          { id: "b", text: "こられます" },
          { id: "c", text: "これます" },
          { id: "d", text: "きられます" }
        ],
        correctOptionId: "b",
        explanation: "来ます (kimasu) nhóm 3, thể khả năng là こられます (koraremasu)."
      },
      {
        id: "l27_hw_q11",
        type: "text_input",
        skill: "Trợ từ (Particles)",
        text: "Điền trợ từ thích hợp: ２０メートル（　）泳げます。",
        correctAnswers: ["まで", "ぐらい"],
        explanation: "Có thể bơi ĐẾN 20 mét (まで), hoặc KHOẢNG 20 mét (ぐらい)."
      },
      {
        id: "l27_hw_q12",
        type: "multiple_choice",
        skill: "Ngữ pháp (Grammar)",
        text: "新宿(　) 映画が見られます。",
        options: [
          { id: "a", text: "に" },
          { id: "b", text: "を" },
          { id: "c", text: "で" },
          { id: "d", text: "が" }
        ],
        correctOptionId: "c",
        explanation: "Địa điểm + で + Động từ (có thể làm gì ở đâu)."
      },
      {
        id: "l27_hw_q13",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Chuyển sang thể khả năng: 歌います -> ?",
        correctAnswers: ["歌えます", "うたえます"],
        explanation: "歌います nhóm 1, đổi đuôi い thành え -> 歌えます."
      },
      {
        id: "l27_hw_q14",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Chuyển sang thể khả năng: 食べます -> ?",
        correctAnswers: ["食べられます", "たべられます"],
        explanation: "食べます nhóm 2, thêm られます -> 食べられます."
      },
      {
        id: "l27_hw_q15",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "クリーニング屋は(　)です。",
        options: [
          { id: "a", text: "どこ" },
          { id: "b", text: "いつ" },
          { id: "c", text: "どれ" },
          { id: "d", text: "だれ" }
        ],
        correctOptionId: "a",
        explanation: "Tiệm giặt ủi (クリーニング屋) thì ở đâu (どこ)."
      },
      {
        id: "l27_hw_q16",
        type: "multiple_choice",
        skill: "Kanji",
        text: "Chữ 交通 đọc là gì?",
        options: [
          { id: "a", text: "こうつう" },
          { id: "b", text: "きょうつう" },
          { id: "c", text: "こうどう" },
          { id: "d", text: "きょうどう" }
        ],
        correctOptionId: "a",
        explanation: "交通 (Giao thông) đọc là こうつう."
      },
      {
        id: "l27_hw_q17",
        type: "multiple_choice",
        skill: "Kanji",
        text: "Chữ 自転車 đọc là gì?",
        options: [
          { id: "a", text: "じどうしゃ" },
          { id: "b", text: "じてんしゃ" },
          { id: "c", text: "じどうてん" },
          { id: "d", text: "じてんしゃ" }
        ],
        correctOptionId: "b",
        explanation: "自転車 (Xe đạp - Tự chuyển xa) đọc là じてんしゃ."
      },
      {
        id: "l27_hw_q18",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Điền trợ từ: 鳥の声（　）聞こえます。",
        correctAnswers: ["が"],
        explanation: "Nghe thấy (聞こえます) tự nhiên, dùng trợ từ が."
      },
      {
        id: "l27_hw_q19",
        type: "multiple_choice",
        skill: "Từ vựng (Vocabulary)",
        text: "家を(　)。",
        options: [
          { id: "a", text: "たちます" },
          { id: "b", text: "たてます" },
          { id: "c", text: "たのみます" },
          { id: "d", text: "たしかめます" }
        ],
        correctOptionId: "b",
        explanation: "建てます (たてます) là xây nhà."
      },
      {
        id: "l27_hw_q20",
        type: "text_input",
        skill: "Ngữ pháp (Grammar)",
        text: "Dịch sang tiếng Nhật (chỉ dùng Hiragana/Kanji, không có Romaji): Tôi chỉ có thể nói một chút tiếng Nhật.",
        correctAnswers: ["日本語が少ししか話せません", "日本語がすこししか話せません", "にほんごがすこししかはなせません", "日本語は少ししか話せません", "日本語は少しだけ話せます"],
        explanation: "少ししか話せません (chỉ có thể nói một chút) hoặc 少しだけ話せます."
      }
,

    // Exercise 1: Potential form conjugation
  {
    id: "l27_wb_1_1",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển động từ thể khả năng dạng Masu sang thể thường: 見られます -> ?",
    correctAnswers: ["見られる", "みられる"],
    explanation: "見られます (thể khả năng dạng Masu) chuyển sang thể thường là 見られる."
  },
  {
    id: "l27_wb_1_2",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển sang thể khả năng dạng Masu: 建てます -> ?",
    correctAnswers: ["建てられます", "たてられます"],
    explanation: "建てます (Nhóm 2) chuyển sang thể khả năng dạng Masu là 建てられます."
  },
  {
    id: "l27_wb_1_3",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển động từ thể khả năng dạng thường sang dạng Masu: 走れる -> ?",
    correctAnswers: ["走れます", "はしれます"],
    explanation: "走れる (thể khả năng dạng thường) chuyển sang dạng Masu là 走れます."
  },
  {
    id: "l27_wb_1_4",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển sang thể khả năng dạng Masu: 借ります -> ?",
    correctAnswers: ["借りられます", "かりられます"],
    explanation: "借ります (Nhóm 2) chuyển sang thể khả năng dạng Masu là 借りられます."
  },
  {
    id: "l27_wb_1_5",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển động từ thể khả năng dạng Masu sang thể thường: 捜せます -> ?",
    correctAnswers: ["捜せる", "さがせる"],
    explanation: "捜せます (thể khả năng dạng Masu) chuyển sang thể thường là 捜せる."
  },
  {
    id: "l27_wb_1_6",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển sang thể khả năng dạng Masu: 連絡します -> ?",
    correctAnswers: ["連絡できます", "れんらくできます"],
    explanation: "連絡します (Nhóm 3) chuyển sang thể khả năng dạng Masu là 連絡できます."
  },
  {
    id: "l27_wb_1_7",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển sang thể khả năng dạng Masu: 起きます -> ?",
    correctAnswers: ["起きられます", "おきられます"],
    explanation: "起きます (Nhóm 2) chuyển sang thể khả năng dạng Masu là 起きられます."
  },
  {
    id: "l27_wb_1_8",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển động từ thể khả năng dạng Masu sang thể thường: 置けます -> ?",
    correctAnswers: ["置ける", "おける"],
    explanation: "置けます (thể khả năng dạng Masu) chuyển sang thể thường là 置ける."
  },
  {
    id: "l27_wb_1_9",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển động từ thể khả năng dạng thường sang dạng Masu: 開ける -> ?",
    correctAnswers: ["開けられます", "あけられます"],
    explanation: "開ける (thể khả năng dạng thường) chuyển sang dạng Masu là 開けられます."
  },
  {
    id: "l27_wb_1_10",
    type: "text_input",
    skill: "Ngữ pháp (Thể khả năng)",
    text: "Chuyển sang thể khả năng dạng Masu: 来ます -> ?",
    correctAnswers: ["こられます", "来られます"],
    explanation: "来ます (Nhóm 3) chuyển sang thể khả năng dạng Masu là こられます."
  },
  
  // Exercise 2: Combine sentences
  {
    id: "l27_wb_2_1",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Chia động từ trong ngoặc sang thể khả năng phủ định: 簡単な料理だったら、自分で (作ります -> ...)",
    correctAnswers: ["作れません", "つくれません"],
    explanation: "作ります -> thể khả năng phủ định là 作れません (không thể làm)."
  },
  {
    id: "l27_wb_2_2",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Chia động từ trong ngoặc sang thể khả năng phủ định: 早く漢字を覚えたいですが、なかなか (覚えます -> ...)",
    correctAnswers: ["覚えられません", "おぼえられません"],
    explanation: "覚えます -> thể khả năng phủ định là 覚えられません (không thể nhớ)."
  },
  {
    id: "l27_wb_2_3",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Chia động từ trong ngoặc sang thể khả năng nghi vấn: また会いたいですね。今度いつ (会います -> ...)？",
    correctAnswers: ["会えますか", "あえますか"],
    explanation: "会います -> thể khả năng nghi vấn là 会えますか (có thể gặp không?)."
  },
  {
    id: "l27_wb_2_4",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Chia động từ trong ngoặc sang thể khả năng phủ định quá khứ: 去年は忙しかったですから、長い旅行に (行きます -> ...)",
    correctAnswers: ["行けませんでした", "いけませんでした"],
    explanation: "行きます -> thể khả năng phủ định quá khứ là 行けませんでした (đã không thể đi)."
  },

  // Exercise 3: Rewrite ことができます -> potential
  {
    id: "l27_wb_3_1",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Viết lại câu dùng thể khả năng thay cho ことができます: 自分で自転車を修理することができますか。",
    correctAnswers: ["自分で自転車が修理できますか", "自分で自転車を修理できますか", "じぶんでじてんしゃがしゅうりできますか"],
    explanation: "修理することができます -> 修理できます. Trợ từ を có thể giữ nguyên hoặc đổi thành が."
  },
  {
    id: "l27_wb_3_2",
    type: "text_input",
    skill: "Ngữ pháp",
    text: "Viết lại câu dùng thể khả năng thay cho ことができます: あの人の名前を思い出すことができません。",
    correctAnswers: ["あの人の名前が思い出せません", "あのひとのなまえがおもいだせません", "あの人の名前を思い出せません"],
    explanation: "思い出すことができません -> 思い出せません."
  },
  
  // Exercise 4: Particles
  {
    id: "l27_wb_4_1",
    type: "text_input",
    skill: "Trợ từ",
    text: "Điền 2 trợ từ liên tiếp (cách nhau bởi dấu phẩy): 駅の近く(　) 大きいマンション(　) できました。",
    correctAnswers: ["に,が", "に, が", "に、が"],
    explanation: "駅の近く【に】 大きいマンション【が】 できました (Ở gần nhà ga đã xây xong một chung cư lớn)."
  },
  {
    id: "l27_wb_4_2",
    type: "text_input",
    skill: "Trợ từ",
    text: "Điền 2 trợ từ liên tiếp (cách nhau bởi dấu phẩy): 2階の窓(　) お祭りの花火(　) 見えます。",
    correctAnswers: ["から,が", "から, が", "から、が"],
    explanation: "窓【から】 花火【が】 見えます (Từ cửa sổ nhìn thấy pháo hoa)."
  },
  {
    id: "l27_wb_4_3",
    type: "text_input",
    skill: "Trợ từ",
    text: "Điền trợ từ: ここは波の音(　) よく聞こえます。",
    correctAnswers: ["が"],
    explanation: "波の音【が】 聞こえます (Nghe thấy tiếng sóng biển)."
  },
  {
    id: "l27_wb_4_4",
    type: "text_input",
    skill: "Trợ từ",
    text: "Điền trợ từ: すみませんが、もう少し大きい声(　) 話していただけませんか。",
    correctAnswers: ["で"],
    explanation: "大きい声【で】 話す (Nói BẰNG giọng lớn hơn)."
  },
  {
    id: "l27_wb_4_5",
    type: "text_input",
    skill: "Trợ từ",
    text: "Điền 2 trợ từ liên tiếp (cách nhau bởi dấu phẩy): 時計の修理(　) いつできますか。…3日後(　) できます。",
    correctAnswers: ["は,に", "は, に", "は、に"],
    explanation: "時計の修理【は】 いつできますか。…3日後【に】 できます."
  },

  // Exercise 5: shika ... masen
  {
    id: "l27_wb_5_1",
    type: "text_input",
    skill: "Ngữ pháp (しか)",
    text: "Dùng しか...ません để trả lời: 冷蔵庫に卵がいくつありますか。…2つ(　)。",
    correctAnswers: ["しかありません"],
    explanation: "2つしかありません (Chỉ có 2 quả)."
  },
  {
    id: "l27_wb_5_2",
    type: "text_input",
    skill: "Ngữ pháp (しか)",
    text: "Dùng しか...ません để trả lời: どんな料理が作れますか。…カレー(　)。",
    correctAnswers: ["しか作れません", "しかつれません"],
    explanation: "カレーしか作れません (Chỉ có thể làm món cà ri)."
  },
  {
    id: "l27_wb_5_3",
    type: "text_input",
    skill: "Ngữ pháp (しか)",
    text: "Dùng しか...ません để trả lời: きのうの晩はよく寝られましたか。…いいえ、2時間ぐらい(　)。",
    correctAnswers: ["しか寝られませんでした", "しかねられませんでした"],
    explanation: "2時間ぐらいしか寝られませんでした (Chỉ có thể ngủ được khoảng 2 tiếng)."
  },

  // Exercise 6: Wa... ga, wa...
  {
    id: "l27_wb_6_1",
    type: "text_input",
    skill: "Ngữ pháp (So sánh đối lập は)",
    text: "Viết lại thành câu so sánh đối lập (dùng は...が、...は...): 木村さんの住所と電話番号がわかりますか。（住所…〇　電話番号…✖）",
    correctAnswers: ["住所はわかりますが、電話番号はわかりません", "じゅうしょはわかりますが、でんわばんごうはわかりません"],
    explanation: "住所はわかりますが、電話番号はわかりません (Địa chỉ thì biết, nhưng số điện thoại thì không biết)."
  },
  {
    id: "l27_wb_6_2",
    type: "text_input",
    skill: "Ngữ pháp (So sánh đối lập は)",
    text: "Viết lại thành câu so sánh đối lập: スポーツが好きですか。（ゴルフ…〇　ほかのスポーツ…✖）",
    correctAnswers: ["ゴルフは好きですが、ほかのスポーツは好きじゃありません", "ゴルフは好きですが、ほかのスポーツは好きではありません"],
    explanation: "ゴルフは好きですが、ほかのスポーツは好きじゃありません (Golf thì thích, nhưng môn khác thì không)."
  }
]
  },
  {
    id: "lesson-28",
    title: "Bài kiểm tra Bài 28",
    description: "Kiểm tra ngữ pháp cấu trúc ながら (vừa... vừa), ています (thói quen), và し (liệt kê lý do).",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l28_q1",
        type: "multiple_choice",
        text: "Chọn từ thích hợp điền vào chỗ trống: 音楽を聞き（　）勉強します。",
        options: [
          { id: "a", text: "ながら" },
          { id: "b", text: "て" },
          { id: "c", text: "で" },
          { id: "d", text: "から" }
        ],
        correctOptionId: "a",
        explanation: "V-masu + ながら + V2: Vừa làm V1 vừa làm V2 (hành động chính đứng sau)."
      },
      {
        id: "l28_q2",
        type: "multiple_choice",
        text: "Diễn tả thói quen chạy bộ mỗi sáng: 毎朝ジョギングを（　）。",
        options: [
          { id: "a", text: "します" },
          { id: "b", text: "しています" },
          { id: "c", text: "しました" },
          { id: "d", text: "する" }
        ],
        correctOptionId: "b",
        explanation: "V-te imasu dùng để diễn tả một hành động, thói quen lặp đi lặp lại thường xuyên."
      },
      {
        id: "l28_q3",
        type: "multiple_choice",
        text: "Chọn từ nối lý do thích hợp: この店は値段も安い（　）、味もいいから、いつも混んでいます。",
        options: [
          { id: "a", text: "し" },
          { id: "b", text: "て" },
          { id: "c", text: "から" },
          { id: "d", text: "と" }
        ],
        correctOptionId: "a",
        explanation: "Cấu trúc Thể thông thường + し để liệt kê các lý do bổ sung cho nhau."
      },
      {
        id: "l28_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 彼は頭がいいし、（　）優しいから、人気があります。",
        options: [
          { id: "a", text: "それに" },
          { id: "b", text: "それで" },
          { id: "c", text: "だから" },
          { id: "d", text: "しかし" }
        ],
        correctOptionId: "a",
        explanation: "それに (hơn thế nữa, vả lại) dùng để bổ sung thông tin hoặc lý do tích cực/tiêu cực cùng chiều."
      },
      {
        id: "l28_q5",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: お腹が痛いし、熱があるし、（　）学校を休みました。",
        options: [
          { id: "a", text: "それで" },
          { id: "b", text: "それに" },
          { id: "c", text: "chậm" },
          { id: "d", text: "また" }
        ],
        correctOptionId: "a",
        explanation: "それで (vì thế, do đó) đứng đầu câu để chỉ kết quả dẫn ra từ các nguyên nhân đã nói trước đó."
      },
      {
        id: "l28_q6",
        type: "text_input",
        skill: "Ngữ pháp (ながら)",
        text: "Điền từ thích hợp: 歩き(　)話します。 (Vừa đi bộ vừa nói chuyện)",
        correctAnswers: ["ながら"],
        explanation: "歩きます bỏ ます + ながら."
      },
      {
        id: "l28_q7",
        type: "text_input",
        skill: "Ngữ pháp (ながら)",
        text: "Điền từ thích hợp: 働き(　)大学に通っています。 (Vừa đi làm vừa đi học đại học)",
        correctAnswers: ["ながら"],
        explanation: "働きます bỏ ます + ながら."
      },
      {
        id: "l28_q8",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền từ thích hợp diễn tả thói quen: 毎晩牛乳を飲んで(　)。 (Mỗi tối tôi đều uống sữa)",
        correctAnswers: ["います"],
        explanation: "V-te imasu diễn tả thói quen hàng ngày."
      },
      {
        id: "l28_q9",
        type: "multiple_choice",
        text: "Chọn cách chia đúng: 食べます + し ➔ （　）",
        options: [
          { id: "a", text: "食べるし" },
          { id: "b", text: "食べし" },
          { id: "c", text: "食べますし" },
          { id: "d", text: "食べだし" }
        ],
        correctOptionId: "a",
        explanation: "Động từ chia về thể từ điển (Thông thường) + し."
      },
      {
        id: "l28_q10",
        type: "multiple_choice",
        text: "Chọn cách chia đúng cho tính từ đuôi -na: 親切です + し ➔ （　）",
        options: [
          { id: "a", text: "親切だし" },
          { id: "b", text: "親切し" },
          { id: "c", text: "親切いし" },
          { id: "d", text: "親切なし" }
        ],
        correctOptionId: "a",
        explanation: "Tính từ đuôi -na / Danh từ + だ + し."
      }
    ]
  },
  {
    id: "lesson-28-hw",
    title: "Bài tập về nhà Bài 28 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 28: Cấu trúc ながら, ています, し, và trạng từ liên kết.",
    level: "N4",
    durationMinutes: 30,
    questions: [
      {
        id: "l28_hw_1_1", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 本を (　) ながらバスを待っていました。 (Vừa đọc sách vừa đợi xe buýt - dùng động từ 読みます)",
        correctAnswers: ["読み", "よみ"], explanation: "読みます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_2", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: ガムを (　) ながら運転すると、あまり眠くなりません。 (Vừa nhai kẹo cao su vừa lái xe - dùng động từ かみます)",
        correctAnswers: ["かみ"], explanation: "かみます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_3", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 彼女 là ngân hàng. (Cô ấy vừa làm việc ở ngân hàng vừa viết tiểu thuyết - dùng động từ 働きます)",
        correctAnswers: ["働き", "はたらき"], explanation: "働きます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_4", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 彼はアルバイトを (　) ながら大学に通っています。 (Anh ấy vừa làm thêm vừa đi học đại học - dùng động từ します)",
        correctAnswers: ["し"], explanation: "します bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_5", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: いつm bạn bè ăn trưa. (Tôi luôn vừa ăn trưa với bạn bè vừa nói chuyện - dùng động từ 食べます)",
        correctAnswers: ["食べ", "たべ"], explanation: "食べます bỏ ます + ながら."
      },
      {
        id: "l28_hw_2_1", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ điền vào chỗ trống diễn tả thói quen: 毎朝8時15分の電車に（　）が、けさは8時の電車に乗りました。 (Mỗi sáng tôi đều đi tàu 8h15 - dùng động từ 乗ります)",
        correctAnswers: ["乗っています", "のっています"], explanation: "V-te imasu diễn tả thói quen lặp đi lặp lại thường xuyên."
      },
      {
        id: "l28_hw_2_2", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ điền vào chỗ trống diễn tả thói quen: パンはいつも駅の前のパン屋で（　）が、きのうは siêu thị. (Bánh mì tôi luôn mua ở trước ga - dùng động từ 買います)",
        correctAnswers: ["買っています", "かっています"], explanation: "V-te imasu diễn tả thói quen."
      },
      {
        id: "l28_hw_2_3", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen trong quá khứ: 国ではよくドラマを（　）が、日本へ来てから、ニュースしか見ません。 (Ở nước tôi thì thường xem phim truyền hình - dùng động từ 見ます)",
        correctAnswers: ["見ていました", "みていました"], explanation: "V-te imashita diễn tả thói quen trong quá khứ đã chấm dứt."
      },
      {
        id: "l28_hw_2_4", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen trong quá khứ: 学生のとき、よく小説を（　）が、会社に入ってから、あまり読みません。 (Hồi sinh viên tôi thường đọc tiểu thuyết - dùng động từ 読みます)",
        correctAnswers: ["読んでいました", "よんでいました"], explanation: "V-te imashita diễn tả thói quen trong quá khứ."
      },
      {
        id: "l28_hw_2_5", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen: 休みの日はたいていプールで泳いだり、テニスを（　）が、きのうは何もしませんでした。 (Ngày nghỉ tôi thường chơi tennis - dùng động từ します)",
        correctAnswers: ["しています"], explanation: "V-te imasu diễn tả thói quen trong hiện tại."
      },
      {
        id: "l28_hw_3_1a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: わたしは経験も (　) し, 日本語もあまり話せないし、この仕事は無理です。 (dùng động từ ありません)",
        correctAnswers: ["ない"], explanation: "Thể thông thường của ありません là ない."
      },
      {
        id: "l28_hw_3_1b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: わたしは経験もないし、日本語もあまり (　) し、この仕事は無理です。 (dùng động từ 話せません)",
        correctAnswers: ["話せない", "はなせない"], explanation: "Thể thông thường của 話せません là 話せない."
      },
      {
        id: "l28_hw_3_2a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 彼女は (　) し, 熱心だし、早く日本語が上手になると思います。 (dùng tính từ まじめ (nghiêm túc))",
        correctAnswers: ["まじめだ"], explanation: "Tính từ đuôi -na chia thể thông thường để nối vế bằng し là [tính từ] + だ."
      },
      {
        id: "l28_hw_3_2b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 彼女はまじめだし、(　) し, 早く日本語が上手になると思います。 (dùng tính từ 熱心 (nhiệt tình))",
        correctAnswers: ["熱心だ", "ねっしんだ"], explanation: "Tính từ đuôi -na chia [tính từ] + だ + し."
      },
      {
        id: "l28_hw_3_3a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 駅から (　) し, 新しくて、きれいだし、ペット cũng nuôi được. (dùng tính từ 近い (gần))",
        correctAnswers: ["近い", "ちかい"], explanation: "Tính từ đuôi -i chia thể thông thường + し."
      },
      {
        id: "l28_hw_3_3b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 駅から近いし, 新しくて、(　) し, ペットも飼えるんです。 (dùng tính từ きれい (sạch sẽ))",
        correctAnswers: ["きれいだ"], explanation: "Tính từ đuôi -na chia [tính từ] + だ + し."
      },
      {
        id: "l28_hw_4_1", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp điền vào chỗ trống:\nA：よくこの料理を作るんですか。(おいしい/簡単)\nB：ええ。おいしいし、簡単だし、（　）子どもも好きなんです。",
        options: [{ id: "a", text: "それに" }, { id: "b", text: "それで" }],
        correctOptionId: "a", explanation: "それに dùng để bổ sung thêm lý do, thông tin đồng chiều."
      },
      {
        id: "l28_hw_4_2", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp:\nA：このコート、いかがですか。(形がいい/色がきれいです)\nB：そうですね。形もいいし、色 cũng đẹp, ( ) size cũng vừa vặn.",
        options: [{ id: "a", text: "それに" }, { id: "b", text: "それで" }],
        correctOptionId: "a", explanation: "それに bổ sung thêm tính chất tích cực."
      },
      {
        id: "l28_hw_4_3", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp:\nA：どうしてこの店はよく売れるんですか。(値段が安い/店の人がとても親切)\nB：値段も安いし、店の人も rất thân thiện.\nA：（　）いつも人が多いんですね。",
        options: [{ id: "a", text: "それで" }, { id: "b", text: "それに" }],
        correctOptionId: "a", explanation: "それで (vì thế) dùng chỉ kết quả dẫn ra từ các lý do trước."
      },
      {
        id: "l28_hw_4_4", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp:\nA：ワットさんはいい先生ですね。(教え方上手/ユーモアがある)\nB：ええ。教え方も上手だし、ユーモアもあるし、それにとても熱心なんです。\nC：（　）学生に人気があるんですね。",
        options: [{ id: "a", text: "それで" }, { id: "b", text: "それに" }],
        correctOptionId: "a", explanation: "Với các lý do trước, ta dùng それ để đưa ra kết quả."
      },
      {
        id: "l28_hw_5_1", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: 頭 (　) 痛いし、熱 (　) あるし、たぶんかぜだと思います。 (Điền 2 trợ từ, cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も,xo", "も、も"], explanation: "Khi liệt kê bằng し, ta dùng trợ từ も để nhấn mạnh các yếu tố song hành."
      },
      {
        id: "l28_hw_5_2", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: おなか (　) すいたし、のど (　) かわいたし、あのレストランに入りませんか。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も,xo", "も、も"], explanation: "Nhấn mạnh song hành: bụng cũng đói, họng cũng khát."
      },
      {
        id: "l28_hw_5_3", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: ここは駅から (　) 遠いし、店 (　) ないし、とても不便です. (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も,xo", "も、も"], explanation: "Nhấn mạnh lý do tiêu cực: từ ga cũng xa, cửa hàng cũng không có."
      },
      {
        id: "l28_hw_6_1", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (a. 食べます) -> みんな花を見ながら(　)たり、飲んだりしていました。",
        correctAnswers: ["食べ", "たべ"], explanation: "食べます chia sang thể た + り -> 食べたり."
      },
      {
        id: "l28_hw_6_2", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (b. します) -> 食べたり、飲んだり(　)ていました。",
        correctAnswers: ["し"], explanation: "しています -> していました."
      },
      {
        id: "l28_hw_6_3", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (c. 歌います) -> 歌い(　)ながら踊っている人もいました。",
        correctAnswers: ["ながら", "いながら"], explanation: "V-masu + ながら: vừa hát vừa nhảy."
      }
    ]
  }
];
