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
  },
    {
    id: "l27_dokkai_1",
    type: "multiple_choice",
    skill: "Đọc hiểu",
    passage: "【ペット】\n\n《日本|にほん》では、マンションで《犬|いぬ》や《猫|ねこ》などのペットを《飼|か》う《人|ひと》が《増|ふ》えています。\nしかし、マンションの《規則|きそく》でペットを《飼|か》ってはいけないところもあります。\n《私|わたし》が《住|す》んでいるマンションもペットが《飼|か》えません。\nですから、《私|わたし》はペットが《飼|か》える《家|いえ》に《住|す》みたいです。\n《将来|しょうらい》、《庭|にわ》のある《家|いえ》を《建|た》てて、《犬|いぬ》を《飼|か》いたいです。",
    text: "Q1: この《文章|ぶんしょう》は《何|なに》について《書|か》かれていますか。",
    options: [
      { id: "a", text: "《日本|にほん》のペットの《事情|じじょう》と《筆者|ひっしゃ》の《夢|ゆめ》" },
      { id: "b", text: "マンションでの《犬|いぬ》や《猫|ねこ》の《飼|か》い《方|かた》" },
      { id: "c", text: "《庭|にわ》のある《家|いえ》の《建|た》て《方|かた》" },
      { id: "d", text: "マンションの《厳|きび》しい《規則|きそく》について" }
    ],
    correctOptionId: "a",
    explanation: "この文章は、日本のマンションにおけるペットの状況と、筆者が将来庭のある家を建てて犬を飼いたいという夢について書かれています。"
  },
  {
    id: "l27_dokkai_2",
    type: "multiple_choice",
    skill: "Đọc hiểu",
    passage: "【ペット】\n\n《日本|にほん》では、マンションで《犬|いぬ》や《猫|ねこ》などのペットを《飼|か》う《人|ひと》が《増|ふ》えています。\nしかし、マンションの《規則|きそく》でペットを《飼|か》ってはいけないところもあります。\n《私|わたし》が《住|す》んでいるマンションもペットが《飼|か》えません。\nですから、《私|わたし》はペットが《飼|か》える《家|いえ》に《住|す》みたいです。\n《将来|しょうらい》、《庭|にわ》のある《家|いえ》を《建|た》てて、《犬|いぬ》を《飼|か》いたいです。",
    text: "Q2: 《筆者|ひっしゃ》はなぜペットが《飼|か》える《家|いえ》に《住|す》みたいのですか。",
    options: [
      { id: "a", text: "マンションに《住|す》むのが《嫌|きら》いだから" },
      { id: "b", text: "今のマンションではペットが《飼|か》えないから" },
      { id: "c", text: "《広|ひろ》い《庭|にわ》が《欲|ほ》しいから" },
      { id: "d", text: "マンションでペットを《飼|か》うと《金|かね》がかかるから" }
    ],
    correctOptionId: "b",
    explanation: "文章の中に「私が住んでいるマンションもペットが飼えません。ですから、私はペットが飼える家に住みたいです」と書かれています。"
  },
  {
    id: "l27_dokkai_3",
    type: "multiple_choice",
    skill: "Đọc hiểu",
    passage: "【ペット】\n\n《日本|にほん》では、マンションで《犬|いぬ》や《猫|ねこ》などのペットを《飼|か》う《人|ひと》が《増|ふ》えています。\nしかし、マンションの《規則|きそく》でペットを《飼|か》ってはいけないところもあります。\n《私|わたし》が《住|す》んでいるマンションもペットが《飼|か》えません。\nですから、《私|わたし》はペットが《飼|か》える《家|いえ》に《住|す》みたいです。\n《将来|しょうらい》、《庭|にわ》のある《家|いえ》を《建|た》てて、《犬|いぬ》を《飼|か》いたいです。",
    text: "Q3: 《筆者|ひっしゃ》は《将来|しょうらい》《何|なに》をしたいですか。",
    options: [
      { id: "a", text: "《庭|にわ》のある《家|いえ》を《建|た》てて、《犬|いぬ》を《飼|か》う" },
      { id: "b", text: "《新|あたら》しいマンションを《買|か》う" },
      { id: "c", text: "《外国|がいこく》へ《旅行|りょこう》する" },
      { id: "d", text: "かわいい《猫|ねこ》を《飼|か》う" }
    ],
    correctOptionId: "a",
    explanation: "文章の最後に「将来、庭のある家を建てて、犬を飼いたいです」と書かれています。"
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
        correctAnswers: ["読み", "よみ"],
        explanation: "読みます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_2", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: ガムガムを (　) ながら運転すると、あまり眠くなりません。 (Vừa nhai kẹo cao su vừa lái xe - dùng động từ かみます)",
        correctAnswers: ["かみ"],
        explanation: "かみます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_3", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 彼女は銀行で (　) ながら小説を書いています。 (Cô ấy vừa làm việc ở ngân hàng vừa viết tiểu thuyết - dùng động từ 働きます)",
        correctAnswers: ["働き", "はたらき"],
        explanation: "働きます bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_4", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 彼はアルバイトを (　) ながら大学に通っています。 (Anh ấy vừa làm thêm vừa đi học đại học - dùng động từ します)",
        correctAnswers: ["し"],
        explanation: "します bỏ ます + ながら."
      },
      {
        id: "l28_hw_1_5", type: "text_input", skill: "Ngữ pháp (ながら)",
        text: "Chia động từ điền vào chỗ trống: 私はいつも友達と昼ご飯を (　) ながら話しています。 (Tôi luôn vừa ăn trưa với bạn bè vừa nói chuyện - dùng động từ 食べます)",
        correctAnswers: ["食べ", "たべ"],
        explanation: "食べます bỏ ます + ながら."
      },
      {
        id: "l28_hw_2_1", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ điền vào chỗ trống diễn tả thói quen: 毎朝8時15分の電車に（　）が、けさは8時の電車に乗りました。 (Mỗi sáng tôi đều đi tàu 8h15 - dùng động từ 乗ります)",
        correctAnswers: ["乗っています", "のっています"],
        explanation: "V-te imasu diễn tả thói quen lặp đi lặp lại thường xuyên."
      },
      {
        id: "l28_hw_2_2", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ điền vào chỗ trống diễn tả thói quen: パンはいつも駅の前のパン屋で（　）が、きのうはスーパーで買いました。 (Bánh mì tôi luôn mua ở trước ga - dùng động từ 買います)",
        correctAnswers: ["買っています", "かっています"],
        explanation: "V-te imasu diễn tả thói quen."
      },
      {
        id: "l28_hw_2_3", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen trong quá khứ: 国ではよくドラマを（　）が、日本へ来てから、ニュースしか見ません。 (Ở nước tôi thì thường xem phim truyền hình - dùng động từ 見ます)",
        correctAnswers: ["見ていました", "みていました"],
        explanation: "V-te imashita diễn tả thói quen trong quá khứ đã chấm dứt."
      },
      {
        id: "l28_hw_2_4", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen trong quá khứ: 学生のとき、よく小説を（　）が、会社に入ってから、あまり読みません。 (Hồi sinh viên tôi thường đọc tiểu thuyết - dùng động từ 読みます)",
        correctAnswers: ["読んでいました", "よんでいました"],
        explanation: "V-te imashita diễn tả thói quen trong quá khứ."
      },
      {
        id: "l28_hw_2_5", type: "text_input", skill: "Ngữ pháp (ています)",
        text: "Chia động từ diễn tả thói quen: 休みの日はたいていプールで泳いだり、テニスを（　）が、きのうは何もしませんでした。 (Ngày nghỉ tôi thường chơi tennis - dùng động từ します)",
        correctAnswers: ["しています"],
        explanation: "V-te imasu diễn tả thói quen trong hiện tại."
      },
      {
        id: "l28_hw_3_1a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: わたしは経験も (　) し, 日本語もあまり話せないし、この仕事は無理です。 (dùng động từ ありません)",
        correctAnswers: ["ない"],
        explanation: "Thể thông thường của ありません là ない."
      },
      {
        id: "l28_hw_3_1b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: わたしは経験もないし、日本語もあまり (　) し, この仕事は無理です。 (dùng động từ 話せません)",
        correctAnswers: ["話せない", "はなせない"],
        explanation: "Thể thông thường của 話せません là 話せない."
      },
      {
        id: "l28_hw_3_2a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 彼女は (　) し, 熱心だし、早く日本語が上手になると思います。 (dùng tính từ まじめ (nghiêm túc))",
        correctAnswers: ["まじめだ"],
        explanation: "Tính từ đuôi -na chia thể thông thường để nối vế bằng し là [tính từ] + だ."
      },
      {
        id: "l28_hw_3_2b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 彼女はまじめだし、(　) し, 早く日本語が上手になると思います。 (dùng tính từ 熱心 (nhiệt tình))",
        correctAnswers: ["熱心だ", "ねっしんだ"],
        explanation: "Tính từ đuôi -na chia [tính từ] + だ + し."
      },
      {
        id: "l28_hw_3_3a", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 駅から (　) し, 新しくて、きれいだし、ペットも飼えるんです. (dùng tính từ 近い (gần))",
        correctAnswers: ["近い", "ちかい"],
        explanation: "Tính từ đuôi -i chia thể thông thường + し."
      },
      {
        id: "l28_hw_3_3b", type: "text_input", skill: "Ngữ pháp (し)",
        text: "Điền dạng đúng của từ nối vế: 駅から近いし, 新しくて、(　) し, ペットも飼えるんです。 (dùng tính từ きれい (sạch sẽ))",
        correctAnswers: ["きれいだ"],
        explanation: "Tính từ đuôi -na chia [tính từ] + だ + し."
      },
      {
        id: "l28_hw_4_1", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp điền vào chỗ trống:\\nA：よくこの料理を作るんですか。(おいしい/簡単)\\nB：ええ。おいしいし、簡単だし、（　）子どもも好きなんです。",
        options: [{"id": "a", "text": "それに"}, {"id": "b", "text": "それで"}],
        correctOptionId: "a",
        explanation: "それに dùng để bổ sung thêm lý do, thông tin đồng chiều."
      },
      {
        id: "l28_hw_4_2", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp điền vào chỗ trống:\\nA：このコート、いかがですか。\\nB：ええ。形もいいし, 色もきれいだし、（　）サイズもちょうどいいんです。 (Mẫu mã tốt, màu đẹp, hơn nữa size cũng vừa vặn)",
        options: [{"id": "a", "text": "それに"}, {"id": "b", "text": "それで"}],
        correctOptionId: "a",
        explanation: "それに bổ sung thêm tính chất tích cực."
      },
      {
        id: "l28_hw_4_3", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp điền vào chỗ trống:\\nA：どうしてこの店はよく売れるんですか。\\nB：値段も安いし、店の人も親切ですし。\\nA：（　）いつも人が多いんですね。 (Vì thế lúc nào cũng đông khách)",
        options: [{"id": "a", "text": "それで"}, {"id": "b", "text": "それに"}],
        correctOptionId: "a",
        explanation: "Với các lý do trước, ta dùng それ để đưa ra kết quả."
      },
      {
        id: "l28_hw_4_4", type: "multiple_choice", skill: "Ngữ pháp (それに/それで)",
        text: "Chọn từ thích hợp:\\nA：ワットさんはいい先生ですね。(教え方上手/ユーモアがある)\\nB：ええ。教え方も上手だし、ユーモアもあるし、それにとても熱心なんです。\\nC：（　）学生に人気があるんですね。",
        options: [{"id": "a", "text": "それで"}, {"id": "b", "text": "それに"}],
        correctOptionId: "a",
        explanation: "Với các lý do trước, ta dùng それ để đưa ra kết quả."
      },
      {
        id: "l28_hw_5_1", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: 頭 (　) 痛いし, 熱 (　) あるし, たぶんかぜだと思います。 (Điền 2 trợ từ, cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も、も"],
        explanation: "Khi liệt kê bằng し, ta dùng trợ từ も để nhấn mạnh các yếu tố song hành."
      },
      {
        id: "l28_hw_5_2", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: おなか (　) すいたし, のど (　) かわいたし, あのレストランに入りませんか. (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も、も"],
        explanation: "Nhấn mạnh song hành: bụng cũng đói, họng cũng khát."
      },
      {
        id: "l28_hw_5_3", type: "text_input", skill: "Ngữ pháp (Trợ từ も)",
        text: "Điền trợ từ thích hợp: ここは駅から (　) 遠いし, 店 (　) ないし, とても不便です。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: も, も)",
        correctAnswers: ["も, も", "も、も"],
        explanation: "Nhấn mạnh lý do tiêu cực: từ ga cũng xa, cửa hàng cũng không có."
      },
      {
        id: "l28_hw_6_1", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (a. 食べます) -> みんな花を見ながら食べたり、飲んだりしていました。",
        correctAnswers: ["食べ", "たべ"],
        explanation: "食べます chia sang thể た + り -> 食べたり."
      },
      {
        id: "l28_hw_6_2", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (b. します) -> 食べたり、飲んだり(　)ていました。",
        correctAnswers: ["し"],
        explanation: "しています -> していました."
      },
      {
        id: "l28_hw_6_3", type: "text_input", skill: "Ngữ pháp (Chia động từ tổng hợp)",
        text: "Điền dạng đúng của động từ: (c. 歌います) -> 歌い(　)ながら踊っている人もいました。",
        correctAnswers: ["ながら", "いながら"],
        explanation: "V-masu + ながら: vừa hát vừa nhảy."
      },
      {
        id: "l28_hw_7_1", type: "text_input", skill: "Đọc hiểu",
        passage: "《私|わたし》は《留学生|りゅうがくせい》です。《毎日|まいにち》とても《忙|いそが》しいです。\\n《毎朝|まいあさ》6《時|じ》に《起|お》きて、ご《飯|はん》を《食|た》べながら《日本語|にほんご》のニュースを《見|み》ています。\\n7《時|じ》から12《時|じ》まで《大学|だいがく》で《勉強|べんきょう》して、《午後|ごご》から《喫茶店|きっさてん》でアルバイトをしています。\\nこの《喫茶店|きっさてん》はコーヒーもおいしいし、ケーキも《安|やす》いし、いつもお《客|きゃく》さんが《多|おお》いです。\\nお《客|きゃく》さんは《優|やさ》しいし、よく《私|わたし》と《話|はな》しますから、アルバイトをしながら《日本語|にほんご》の《練習|れんしゅう》ができます。《店長|てんちょう》もまじめだし、とても《親切|しんせつ》な《人|ひと》です。\\n《毎晩|まいばん》、《家|いえ》へ《帰|かえ》ってから、《音楽|おんがく》を《聞|き》きながら《宿題|しゅくだい》をします。\\n《働|はたら》きながら《勉強|べんきょう》するのは《大変|たいへん》ですが、《新|あたら》しい《友達|ともだち》がたくさんできますから、《毎日|まいにち》とても《楽|たの》しいです。\\n《将来|しょうらい》、《日本語|にほんご》の《先生|せんせい》になりたいですから、《今|いま》《一生懸命|いっしょうけんめい》がんばっています。",
        text: "Trả lời câu hỏi dựa trên bài đọc:\\n毎朝 何を しながら 何を しますか。 (Mỗi sáng vừa làm gì vừa làm gì?)",
        correctAnswers: ["ご飯を食べながら日本語のニュースを見ます", "ご飯を食べながら日本語のニュースを見ています", "ごはんをたべながらにほんごのニュースをみます"],
        explanation: "Trong bài đọc có câu: 毎朝6時に起きて、ご飯を食べながら日本語のニュースを見ています。"
      },
      {
        id: "l28_hw_7_2", type: "text_input", skill: "Đọc hiểu",
        passage: "《私|わたし》は《留学生|りゅうがくせい》です。《毎日|まいにち》とても《忙|いそが》しいです。\\n《毎朝|まいあさ》6《時|じ》に《起|お》きて、ご《飯|はん》を《食|た》べながら《日本語|にほんご》のニュースを《見|み》ています。\\n7《時|じ》から12《時|じ》まで《大学|だいがく》で《勉強|べんきょう》して、《午後|ごご》から《喫茶店|きっさてん》でアルバイトをしています。\\nこの《喫茶店|きっさてん》はコーヒーもおいしいし、ケーキも《安|やす》いし、いつもお《客|きゃく》さんが《多|おお》いです。\\nお《客|きゃく》さんは《優|やさ》しいし、よく《私|わたし》と《話|はな》しますから、アルバイトをしながら《日本語|にほんご》の《練習|れんしゅう》ができます。《店長|てんちょう》もまじめだし、とても《親切|しんせつ》な《人|ひと》です。\\n《毎晩|まいばん》、《家|いえ》へ《帰|かえ》ってから、《音楽|おんがく》を《聞|き》きながら《宿題|しゅくだい》をします。\\n《働|はたら》きながら《勉強|べんきょう》するのは《大変|たいへん》ですが、《新|あたら》しい《友達|ともだち》がたくさんできますから、《毎日|まいにち》とても《楽|たの》しいです。\\n《将来|しょうらい》、《日本語|にほんご》の《先生|せんせい》になりたいですから、《今|いま》《一生懸命|いっしょうけんめい》がんばっています。",
        text: "Trả lời câu hỏi dựa trên bài đọc:\\nどうして 喫茶店は お客さんが 多いですか。 (Tại sao quán cà phê lại đông khách?)",
        correctAnswers: ["コーヒーもおいしいし、ケーキも安いからです", "コーヒーもおいしいし、ケーキも安いし、いつもお客さんが多いです", "コーヒーもおいしいし、ケーキも安いし"],
        explanation: "Trong bài có câu: この喫茶店はコーヒーもおいしいし、ケーキも安いし、いつもお客さんが多いです。"
      },
      {
        id: "l28_hw_7_3", type: "text_input", skill: "Đọc hiểu",
        passage: "《私|わたし》は《留学生|りゅうがくせい》です。《毎日|まいにち》とても《忙|いそが》しいです。\\n《毎朝|まいあさ》6《時|じ》に《起|お》きて、ご《飯|はん》を《食|た》べながら《日本語|にほんご》のニュースを《見|み》ています。\\n7《時|じ》から12《時|じ》まで《大学|だいがく》で《勉強|べんきょう》して、《午後|ごご》から《喫茶店|きっさてん》でアルバイトをしています。\\nこの《喫茶店|きっさてん》はコーヒーもおいしいし、ケーキも《安|やす》いし、いつもお《客|きゃく》さんが《多|おお》いです。\\nお《客|きゃく》さんは《優|やさ》しいし、よく《私|わたし》と《話|はな》しますから、アルバイトをしながら《日本語|にほんご》の《練習|れんしゅう》ができます。《店長|てんちょう》もまじめだし、とても《親切|しんせつ》な《人|ひと》です。\\n《毎晩|まいばん》、《家|いえ》へ《帰|かえ》ってから、《音楽|おんがく》を《聞|き》きながら《宿題|しゅくだい》をします。\\n《働|はたら》きながら《勉強|べんきょう》するのは《大変|たいへん》ですが、《新|あたら》しい《友達|ともだち》がたくさんできますから、《毎日|まいにち》とても《楽|たの》しいです。\\n《将来|しょうらい》、《日本語|にほんご》の《先生|せんせい》になりたいですから、《今|いま》《一生懸命|いっしょうけんめい》がんばっています。",
        text: "Trả lời câu hỏi dựa trên bài đọc:\\nどうして 毎日 楽しいですか。 (Tại sao mỗi ngày đều vui?)",
        correctAnswers: ["新しい友達がたくさんできますから", "新しい友達がたくさんできるからです", "新しいともだちがたくさんできるからです"],
        explanation: "Trong bài có câu: 働きながら勉強するのは大変ですが、新しい友達がたくさんできますから、毎日とても楽しいです。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 29
  // ====================================================
  {
    id: "lesson-29",
    title: "Bài kiểm tra Bài 29",
    description: "Kiểm tra ngữ pháp cấu trúc Vて-form います (trạng thái), Vて-form しまいました (tiếc nuối/hoàn thành).",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l29_q1",
        type: "multiple_choice",
        text: "Chọn từ thích hợp điền vào chỗ trống: 窓が（　）います。",
        options: [{"id": "a", "text": "開いて"}, {"id": "b", "text": "開けて"}, {"id": "c", "text": "閉めて"}, {"id": "d", "text": "つけて"}],
        correctOptionId: "a",
        explanation: "窓が開いています: Cửa sổ đang mở (tự động từ + ています)."
      },
      {
        id: "l29_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp điền vào chỗ trống: パスポートを（　）しまいました。",
        options: [{"id": "a", "text": "なくして"}, {"id": "b", "text": "なくって"}, {"id": "c", "text": "忘れて"}, {"id": "d", "text": "落として"}],
        correctOptionId: "a",
        explanation: "パスポートをなくしてしまいました: Tôi lỡ làm mất hộ chiếu rồi (tiếc nuối)."
      },
      {
        id: "l29_q3",
        type: "multiple_choice",
        text: "Chọn tự động từ thích hợp: コップが（　）います。",
        options: [{"id": "a", "text": "割れて"}, {"id": "b", "text": "割って"}, {"id": "c", "text": "壊して"}, {"id": "d", "text": "折れて"}],
        correctOptionId: "a",
        explanation: "コップが割れています: Cái cốc bị vỡ (tự động từ 割れる)."
      },
      {
        id: "l29_q4",
        type: "multiple_choice",
        text: "Chọn động từ thích hợp: 漢字の宿題はもう（　）しまいました。",
        options: [{"id": "a", "text": "やって"}, {"id": "b", "text": "し"}, {"id": "c", "text": "書き"}, {"id": "d", "text": "終り"}],
        correctOptionId: "a",
        explanation: "宿題はもうやってしまいました: Đã làm xong bài tập rồi (hoàn thành)."
      },
      {
        id: "l29_q5",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: どこかで財布を（　）しまいました。",
        options: [{"id": "a", "text": "落として"}, {"id": "b", "text": "落ちて"}, {"id": "c", "text": "なくって"}, {"id": "d", "text": "忘れて"}],
        correctOptionId: "a",
        explanation: "財布を落としてしまいました: Tôi lỡ làm rơi ví ở đâu mất rồi."
      },
      {
        id: "l29_q6",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền dạng đúng của động từ: 電気が（　）います。 (Đèn đang tắt - dùng động từ 消えます)",
        correctAnswers: ["消えて", "きえて"],
        explanation: "消えます (tự động từ nhóm II) -> 消えて."
      },
      {
        id: "l29_q7",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền dạng đúng của động từ: ドアが（　）います。 (Cửa đang đóng - dùng động từ 閉まります)",
        correctAnswers: ["閉まって", "しまって"],
        explanation: "閉まります (tự động từ nhóm I) -> 閉まって."
      },
      {
        id: "l29_q8",
        type: "text_input",
        skill: "Ngữ pháp (てしまいました)",
        text: "Điền dạng đúng của động từ: 電車に傘を（　）しまいました。 (Tôi lỡ để quên ô trên tàu mất rồi - dùng động từ 忘れます)",
        correctAnswers: ["忘れて", "わすれて"],
        explanation: "忘れます -> 忘れて + しまいました."
      },
      {
        id: "l29_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Cái túi bị bẩn':",
        options: [{"id": "a", "text": "袋が汚れています。"}, {"id": "b", "text": "袋が汚してあります。"}, {"id": "c", "text": "袋を汚しています。"}, {"id": "d", "text": "袋が破れています。"}],
        correctOptionId: "a",
        explanation: "袋が汚れています: Cái túi đang bị bẩn."
      },
      {
        id: "l29_q10",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: どこ（　）財布をなくしてしまいました。",
        options: [{"id": "a", "text": "かで"}, {"id": "b", "text": "かに"}, {"id": "c", "text": "を"}, {"id": "d", "text": "で"}],
        correctOptionId: "a",
        explanation: "どこかで: làm mất ở đâu đó (xảy ra hành động tại địa điểm nào đó)."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 29 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-29-hw",
    title: "Bài tập về nhà Bài 29 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 29: Cấu trúc Vて います, Vて しまいました, và trợ từ.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l29_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: このスーパー（　）夜9時（　）開いています。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: は, まで)",
        correctAnswers: ["は, まで", "は、まで"],
        explanation: "スーパーは: chủ ngữ; 9時まで: đến 9 giờ."
      },
      {
        id: "l29_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: 電車（　）網棚（　）忘れ物（　）してしまいました。 (Điền 3 trợ từ cách nhau bởi dấu phẩy, VD: の, に, を)",
        correctAnswers: ["の, に, を", "の、に、を"],
        explanation: "電車の網棚に (trên giá lưới của tàu) 忘れ物を (đồ bỏ quên)."
      },
      {
        id: "l29_hw_1_3",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: このかばん（　）はポケット（　）たくさん付いています。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: に, が)",
        correctAnswers: ["に, が", "に、が"],
        explanation: "かばんには (ở chiếc cặp này thì) ポケットがたくさん付いています (được gắn nhiều túi)."
      },
      {
        id: "l29_hw_1_4",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: どこか（　）ちょっと休みませんか。 (Chúng ta nghỉ một lát ở đâu đó nhé?)",
        correctAnswers: ["で"],
        explanation: "Nghỉ ngơi tại một địa điểm dùng trợ từ で (どこかで)."
      },
      {
        id: "l29_hw_2_1",
        type: "text_input",
        skill: "Từ vựng (Tự/Tha động từ)",
        text: "Chọn từ thích hợp điền vào chỗ trống: 木の（　）が折れています。 (Cành cây đang bị gãy)",
        correctAnswers: ["枝", "えだ"],
        explanation: "木の枝 (cành cây) が折れています (đang gãy)."
      },
      {
        id: "l29_hw_2_2",
        type: "text_input",
        skill: "Từ vựng (Tự/Tha động từ)",
        text: "Chọn từ thích hợp điền vào chỗ trống: シャツが（　）てしまいました。 (Áo sơ mi bị rách mất rồi - dùng động từ 破れます)",
        correctAnswers: ["破れ", "やぶれ"],
        explanation: "破れます -> 破れてしまいました."
      },
      {
        id: "l29_hw_2_3",
        type: "text_input",
        skill: "Từ vựng (Tự/Tha động từ)",
        text: "Chọn từ thích hợp điền vào chỗ trống: ボタンが（　）ていますよ。 (Cái cúc áo đang bị tuột kìa - dùng động từ 外れます)",
        correctAnswers: ["外れ", "はずれ"],
        explanation: "外れます -> 外れています."
      },
      {
        id: "l29_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền dạng đúng của động từ: エアコンが（　）から、窓を開けないでください。 (Vì điều hòa đang bật - dùng động từ つきます)",
        correctAnswers: ["ついている", "ついています"],
        explanation: "エアコンがついている (điều hòa đang bật)."
      },
      {
        id: "l29_hw_3_2",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền dạng đúng của động từ: コップが（　）から、洗ってください。 (Vì cái cốc đang bị bẩn - dùng động từ よごれます)",
        correctAnswers: ["汚れている", "よごれている", "汚れています", "よごれています"],
        explanation: "コップが汚れている (cốc đang bẩn)."
      },
      {
        id: "l29_hw_3_3",
        type: "text_input",
        skill: "Ngữ pháp (ています)",
        text: "Điền dạng đúng của động từ: 隣のうちは電気が（　）から、だれもいないと思います。 (Vì nhà bên cạnh đang tắt đèn - dùng động từ きえます)",
        correctAnswers: ["消えている", "きえている", "消えています", "きえています"],
        explanation: "電気が消えている (đèn đang tắt)."
      },
      {
        id: "l29_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (てしまいます)",
        text: "Điền dạng đúng của động từ: ミラーさんにもらったケーキはもう全部（　）しまいました。 (Bánh ngọt Miller cho tôi đã ăn sạch mất rồi - dùng động từ 食べます)",
        correctAnswers: ["食べて", "たべて"],
        explanation: "食べてしまいました (đã ăn sạch rồi)."
      },
      {
        id: "l29_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (てしまいます)",
        text: "Điền dạng đúng của động từ: その本はもう（　）しまいましたから、貸しましょうか。 (Quyển sách đó tôi đã đọc xong rồi - dùng động từ 読みます)",
        correctAnswers: ["読めて", "よめて", "読んで", "よんで"],
        explanation: "読んでしまいました (đã đọc xong rồi)."
      },
      {
        id: "l29_hw_5_1",
        type: "text_input",
        skill: "Ngữ pháp (てしまいました - tiếc nuối)",
        text: "Điền dạng đúng của động từ: わたしが結婚したかった人は、ほかの人と（　）しまいました。 (Người tôi muốn kết hôn đã đi kết hôn với người khác mất rồi - dùng động từ 結婚します)",
        correctAnswers: ["結婚して", "けっこんして"],
        explanation: "結婚してしまいました (tiếc nuối)."
      },
      {
        id: "l29_hw_5_2",
        type: "text_input",
        skill: "Ngữ pháp (てしまいました - tiếc nuối)",
        text: "Điền dạng đúng của động từ: どこかで財布を（　）しまったんです。 (Tôi lỡ làm rơi ví ở đâu đó mất rồi - dùng động từ おとします)",
        correctAnswers: ["落として", "おとして"],
        explanation: "落としてしまいました (lỡ làm rơi)."
      },
      {
        id: "l29_hw_6_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: この人は昨日、どこに何を忘れましたか。 (Mỗi sáng vừa làm gì vừa làm gì?)",
        passage: "昨日、電車に傘を忘れてしまいました。駅員に聞きましたが、見つかりませんでした。今日は雨が降っていますから、とても困っています。それから、さっきスマホを落としてしまいました。画面が割れています。今日は本当に運が悪い日です。",
        correctAnswers: ["電車に傘を忘れてしまいました", "電車に傘を忘れた", "電車に傘を忘れたこと"],
        explanation: "Trong bài đọc có câu: 昨日、電車に傘を忘れてしまいました。"
      },
      {
        id: "l29_hw_6_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 駅員に聞いて、傘は見つかりましたか。 (Tìm thấy ô chưa?)",
        passage: "昨日、電車に傘を忘れてしまいました。駅員に聞きましたが、見つかりませんでした。今日は雨が降っていますから、とても困っています。それから、さっきスマホを落としてしまいました。画面が割れています。今日は本当に運が悪い日です。",
        correctAnswers: ["いいえ、見つかりませんでした", "見つかりませんでした", "いいえ、みつかりませんでした"],
        explanation: "Trong bài đọc có câu: 駅員に聞きましたが、見つかりませんでした。"
      },
      {
        id: "l29_hw_6_3",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: スマホはどうなっていますか。 (Điện thoại bị làm sao?)",
        passage: "昨日、電車に傘を忘れてしまいました。駅員に聞きましたが、見つかりませんでした。今日は雨が降っていますから、とても困っています。それから、さっきスマホを落としてしまいました。画面が割れています。今日は本当に運が悪い日です。",
        correctAnswers: ["画面が割れています", "がめんがわれています", "画面が割れている"],
        explanation: "Trong bài đọc có câu: 画面が割れています。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 30
  // ====================================================
  {
    id: "lesson-30",
    title: "Bài kiểm tra Bài 30",
    description: "Kiểm tra cấu trúc Vてあります, Vておきます, まだ Vています.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l30_q1",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 壁にカレンダーが（　）あります。",
        options: [{"id": "a", "text": "掛けて"}, {"id": "b", "text": "掛けてい"}, {"id": "c", "text": "掛かる"}, {"id": "d", "text": "掛かって"}],
        correctOptionId: "a",
        explanation: "Vてあります dùng với tha động từ chỉ trạng thái có chủ ý."
      },
      {
        id: "l30_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 旅行の前に、切符を（　）おきます。",
        options: [{"id": "a", "text": "買って"}, {"id": "b", "text": "買いて"}, {"id": "c", "text": "買わ"}, {"id": "d", "text": "買い"}],
        correctOptionId: "a",
        explanation: "Vておきます: chuẩn bị sẵn trước một việc."
      },
      {
        id: "l30_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: はさみを使ったら、元の所に（　）おいてください。",
        options: [{"id": "a", "text": "戻して"}, {"id": "b", "text": "戻り"}, {"id": "c", "text": "戻って"}, {"id": "d", "text": "戻そう"}],
        correctOptionId: "a",
        explanation: "戻して置いてください: cất về chỗ cũ."
      },
      {
        id: "l30_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: まだ雨が（　）います。",
        options: [{"id": "a", "text": "降って"}, {"id": "b", "text": "降りて"}, {"id": "c", "text": "降ら"}, {"id": "d", "text": "降る"}],
        correctOptionId: "a",
        explanation: "まだ + Vています: vẫn đang làm gì."
      },
      {
        id: "l30_q5",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: テーブルの上にきれいな花が（　）あります。",
        options: [{"id": "a", "text": "飾って"}, {"id": "b", "text": "飾り"}, {"id": "c", "text": "飾る"}, {"id": "d", "text": "飾ってい"}],
        correctOptionId: "a",
        explanation: "花が飾ってあります (hoa được trang trí)."
      },
      {
        id: "l30_q6",
        type: "text_input",
        skill: "Ngữ pháp (てあります)",
        text: "Điền dạng đúng của động từ: 交番に町の地図が（　）あります。 (Bản đồ thị trấn đang được dán ở bốt cảnh sát - dùng động từ はります)",
        correctAnswers: ["はって", "貼って"],
        explanation: "はります -> はって."
      },
      {
        id: "l30_q7",
        type: "text_input",
        skill: "Ngữ pháp (ておきます)",
        text: "Điền dạng đúng của động từ: 授業の前に、（　）おきます。 (Trước giờ học tôi chuẩn bị bài trước - dùng động từ 予習します)",
        correctAnswers: ["予習して", "よしゅうして"],
        explanation: "予習します -> 予習して."
      },
      {
        id: "l30_q8",
        type: "text_input",
        skill: "Ngữ pháp (ておきます)",
        text: "Điền dạng đúng của động từ: 予定表に来月の予定を（　）おきます。 (Ghi sẵn lịch tháng sau vào lịch trình - dùng động từ 書きます)",
        correctAnswers: ["書いて", "かいて"],
        explanation: "書きます -> 書いて."
      },
      {
        id: "l30_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Cái gương được treo ở sảnh':",
        options: [{"id": "a", "text": "玄関に鏡が掛けてあります。"}, {"id": "b", "text": "玄関に鏡が掛かっています。"}, {"id": "c", "text": "玄関に鏡が掛けておきます。"}, {"id": "d", "text": "玄関に鏡が掛けています。"}],
        correctOptionId: "a",
        explanation: "Trạng thái có chủ ý dùng NがVてあります."
      },
      {
        id: "l30_q10",
        type: "multiple_choice",
        text: "Chọn trợ từ thích hợp: テーブル（　）上に予定表が置いてあります。",
        options: [{"id": "a", "text": "の"}, {"id": "b", "text": "に"}, {"id": "c", "text": "が"}, {"id": "d", "text": "は"}],
        correctOptionId: "a",
        explanation: "N1 の N2: sở hữu/vị trí."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 30 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-30-hw",
    title: "Bài tập về nhà Bài 30 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 30: Cấu trúc Vてあります, Vておきます, まだ Vています.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l30_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: 授業（　）まえに、予習しておきます。",
        correctAnswers: ["の"],
        explanation: "授業(の)まえに."
      },
      {
        id: "l30_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: 予定表（　）来月の予定（　）書いておきます。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: に, が)",
        correctAnswers: ["に, を", "に、を"],
        explanation: "予定表に (vào lịch trình) 予定を (kế hoạch)."
      },
      {
        id: "l30_hw_1_3",
        type: "text_input",
        skill: "Ngữ pháp (Trợ từ)",
        text: "Điền trợ từ thích hợp: 廊下（　）壁（　）お知らせがはってあります。 (Điền 2 trợ từ cách nhau bởi dấu phẩy, VD: の, に)",
        correctAnswers: ["の, に", "の、に"],
        explanation: "廊下の壁に (trên tường hành lang)."
      },
      {
        id: "l30_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (てあります)",
        text: "Điền dạng đúng của động từ: 部屋の真ん中にテーブルが（　）あります。 (Ở giữa phòng có đặt cái bàn - dùng động từ 置きます)",
        correctAnswers: ["置いて", "おいて"],
        explanation: "置きます -> 置いて."
      },
      {
        id: "l30_hw_2_2",
        type: "text_input",
        skill: "Ngữ pháp (てあります)",
        text: "Điền dạng đúng của động từ: 壁にポスターが（　）あります。 (Trên tường có treo tấm áp phích - dùng động từ はります)",
        correctAnswers: ["はって", "貼って"],
        explanation: "はります -> はって."
      },
      {
        id: "l30_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (てあります)",
        text: "Điền dạng đúng của động từ: 会議の資料はあの箱に（　）あります。 (Tài liệu họp đã được cất trong hộp đó - dùng động từ 入れます)",
        correctAnswers: ["入れて", "いれて"],
        explanation: "入れます -> 入れて."
      },
      {
        id: "l30_hw_3_2",
        type: "text_input",
        skill: "Ngữ pháp (ておきます)",
        text: "Điền dạng đúng của động từ: 友達が来るまえに、部屋を（　）おきます。 (Trước khi bạn đến, tôi dọn phòng sẵn - dùng động từ 掃除します)",
        correctAnswers: ["掃除して", "そうじして"],
        explanation: "掃除します -> 掃除して."
      },
      {
        id: "l30_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (ておきます)",
        text: "Điền dạng đúng của động từ: 使わない部屋の電気は（　）おいてください。 (Đèn phòng không dùng hãy tắt đi sẵn - dùng động từ 消します)",
        correctAnswers: ["消して", "けして"],
        explanation: "消します -> 消して."
      },
      {
        id: "l30_hw_5_1",
        type: "text_input",
        skill: "Ngữ pháp (まだ)",
        text: "Điền dạng đúng: まだ雨が（　）いますから、傘を持っていきます。 (Trời vẫn đang mưa - dùng động từ 降ります)",
        correctAnswers: ["降って", "ふって"],
        explanation: "まだ + 降っています."
      },
      {
        id: "l30_hw_5_2",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 新幹線の時間を調べて（　）ましょう。 (Hãy tra sẵn giờ tàu đi - dùng động từ おきます)",
        correctAnswers: ["おき"],
        explanation: "調べておきましょう."
      },
      {
        id: "l30_hw_6_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 今晩どこでパーティーがありますか。 (Tối nay tiệc ở đâu?)",
        passage: "今晩うちでパーティーがありますから、昼ごはんのあとで部屋を掃除しておきました。飲み物はもう冷蔵庫に入れてあります。テーブルの上にはきれいな花が飾ってあります。",
        correctAnswers: ["うちで", "うちであります", "家で", "いえで"],
        explanation: "Trong bài đọc có câu: 今晩うちでパーティーがありますから..."
      },
      {
        id: "l30_hw_6_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 飲み物はどうしてありますか。 (Đồ uống được chuẩn bị thế nào?)",
        passage: "今晩うちでパーティーがありますから、昼ごはんのあとで部屋を掃除しておきました。飲み物はもう冷蔵庫に入れてあります。テーブルの上にはきれいな花が飾ってあります。",
        correctAnswers: ["冷蔵庫に入れてあります", "れいぞうこにいれてあります"],
        explanation: "Trong bài đọc có câu: 飲み物はもう冷蔵庫に入れてあります。"
      },
      {
        id: "l30_hw_6_3",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: テーブルの上には何が飾ってありますか。 (Cái gì được trang trí trên bàn?)",
        passage: "今晩うちでパーティーがありますから、昼ごはんのあとで部屋を掃除しておきました。飲み物はもう冷蔵庫に入れてあります。テーブルの上にはきれいな花が飾ってあります。",
        correctAnswers: ["きれいな花が飾ってあります", "きれいなはながかざってあります", "きれいな花", "花"],
        explanation: "Trong bài đọc có câu: テーブルの上にはきれいな花が飾ってあります。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 31
  // ====================================================
  {
    id: "lesson-31",
    title: "Bài kiểm tra Bài 31",
    description: "Kiểm tra Thể ý định (Volitional form), と思っています, つもりです, 予定です.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l31_q1",
        type: "multiple_choice",
        text: "Chọn thể ý định của 休む: 疲れたから、ちょっと（　）。",
        options: [{"id": "a", "text": "休もう"}, {"id": "b", "text": "休めば"}, {"id": "c", "text": "休みよう"}, {"id": "d", "text": "休むそう"}],
        correctOptionId: "a",
        explanation: "Động từ nhóm I: đuôi u -> o + う -> 休もう."
      },
      {
        id: "l31_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 将来自分の会社を作（　）と思っています。",
        options: [{"id": "a", "text": "ろう"}, {"id": "b", "text": "りましょう"}, {"id": "c", "text": "る"}, {"id": "d", "text": "った"}],
        correctOptionId: "a",
        explanation: "V意向形 + と思っています: định làm gì."
      },
      {
        id: "l31_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 明日からはたばこを（　）つもりです。",
        options: [{"id": "a", "text": "吸わない"}, {"id": "b", "text": "吸う"}, {"id": "c", "text": "吸わなくて"}, {"id": "d", "text": "吸おう"}],
        correctOptionId: "a",
        explanation: "Vないつもりです: định không làm gì."
      },
      {
        id: "l31_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 来週の月曜日に日本へ行く（　）です。",
        options: [{"id": "a", "text": "予定"}, {"id": "b", "text": "つもり"}, {"id": "c", "text": "思う"}, {"id": "d", "text": "こと"}],
        correctOptionId: "a",
        explanation: "Vる予定です: có kế hoạch, lịch trình cụ thể."
      },
      {
        id: "l31_q5",
        type: "multiple_choice",
        text: "Chọn thể ý định đúng của 食べる: ",
        options: [{"id": "a", "text": "食べよう"}, {"id": "b", "text": "食べろう"}, {"id": "c", "text": "食べるよう"}, {"id": "d", "text": "食べましょう"}],
        correctOptionId: "a",
        explanation: "Động từ nhóm II: bỏ masu + よう -> 食べよう."
      },
      {
        id: "l31_q6",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền thể ý định của động từ: 買い（　）。 (Định mua - dùng động từ 買います)",
        correctAnswers: ["よう"],
        explanation: "買います -> 買おう."
      },
      {
        id: "l31_q7",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền thể ý định của động từ: 勉強し（　）。 (Định học - dùng động từ 勉強します)",
        correctAnswers: ["よう"],
        explanation: "勉強します -> 勉強しよう."
      },
      {
        id: "l31_q8",
        type: "text_input",
        skill: "Ngữ pháp (つもりです)",
        text: "Điền dạng đúng của động từ: 週末はどこへも（　）つもりです。 (Cuối tuần tôi định không đi đâu cả - dùng động từ 行きます)",
        correctAnswers: ["行かない", "いかない"],
        explanation: "行かないつもりです."
      },
      {
        id: "l31_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Tôi dự định kết hôn vào năm sau':",
        options: [{"id": "a", "text": "来年結婚する予定です。"}, {"id": "b", "text": "来年結婚しよう予定です。"}, {"id": "c", "text": "来年結婚するつもりと思っています。"}, {"id": "d", "text": "来年結婚する予定です。"}],
        correctOptionId: "a",
        explanation: "Dự định/kế hoạch cụ thể dùng Vる予定です."
      },
      {
        id: "l31_q10",
        type: "multiple_choice",
        text: "Chọn thể ý định đúng của 来る (きます):",
        options: [{"id": "a", "text": "来よう"}, {"id": "b", "text": "来ろう"}, {"id": "c", "text": "こよう"}, {"id": "d", "text": "きよう"}],
        correctOptionId: "c",
        explanation: "きます -> こよう."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 31 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-31-hw",
    title: "Bài tập về nhà Bài 31 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 31: Thể ý định, つもり, 予定.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l31_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền thể ý định của động từ: 続けます -> （　）",
        correctAnswers: ["続けよう", "つづけよう"],
        explanation: "続けます -> 続けよう (Nhóm II)."
      },
      {
        id: "l31_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền thể ý định của động từ: 戻します -> （　）",
        correctAnswers: ["戻そう", "もどそう"],
        explanation: "戻します -> 戻そう (Nhóm I)."
      },
      {
        id: "l31_hw_1_3",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền thể ý định của động từ: 来ます -> （　）",
        correctAnswers: ["来よう", "こよう"],
        explanation: "来ます -> こよう (Nhóm III)."
      },
      {
        id: "l31_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (Thể ý định)",
        text: "Điền dạng đúng: 時間がありませんから、急ぎ（　）。 (Vì không có thời gian chúng ta hãy vội lên nào - dùng thể ý định)",
        correctAnswers: ["ましょう", "よう"],
        explanation: "急ごう."
      },
      {
        id: "l31_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (と思っています)",
        text: "Điền dạng đúng: 会社をやめて、もう一度大学で（　）と思っています。 (Tôi định nghỉ việc và học đại học lần nữa - dùng động từ 勉強します)",
        correctAnswers: ["勉強しよう", "べんきょうしよう"],
        explanation: "勉強しようと思っています."
      },
      {
        id: "l31_hw_3_2",
        type: "text_input",
        skill: "Ngữ pháp (と思っています)",
        text: "Điền dạng đúng: 今度の休みは子どもを動物園へ（　）と思っています。 (Nghỉ tới định dẫn con đi vườn bách thú - dùng động từ 連れて行きます)",
        correctAnswers: ["連れて行こう", "つれていこう"],
        explanation: "連れて行こうと思っています."
      },
      {
        id: "l31_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (つもりです)",
        text: "Điền dạng đúng: 疲れたから、明日は何もし（　）つもりです。 (Vì mệt nên ngày mai định không làm gì - dùng động từ します)",
        correctAnswers: ["ない"],
        explanation: "何もしないつもりです."
      },
      {
        id: "l31_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (つもりです)",
        text: "Điền dạng đúng: お金がありませんから、車は（　）つもりです。 (Không có tiền nên định không mua xe - dùng động từ 買います)",
        correctAnswers: ["買わない", "かわない"],
        explanation: "買わないつもりです."
      },
      {
        id: "l31_hw_5_1",
        type: "text_input",
        skill: "Ngữ pháp (予定です)",
        text: "Điền dạng đúng: 出張は1週間ぐらいの（　）です。 (Chuyến công tác dự kiến khoảng 1 tuần - dùng danh từ 予定)",
        correctAnswers: ["予定", "よてい"],
        explanation: "予定です."
      },
      {
        id: "l31_hw_5_2",
        type: "text_input",
        skill: "Ngữ pháp (予定です)",
        text: "Điền dạng đúng: 午後から会議が（　）予定です。 (Chiều nay dự kiến có cuộc họp - dùng động từ あります)",
        correctAnswers: ["ある"],
        explanation: "ある予定です."
      },
      {
        id: "l31_hw_6_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: この人は大学を卒業したら、どうしようと思っていますか。 (Định làm gì sau tốt nghiệp?)",
        passage: "大学を卒業したら、日本の会社で働こうと思っています。ですから、今一生懸命日本語を勉強しています。来年日本語能力試験のN3を受ける予定です。日本で5年ぐらい働いてから、ベトナムへ帰って日本語の先生になるつもりです。",
        correctAnswers: ["日本の会社で働こうと思っています", "日本の会社で働くこと", "にほんのかいしゃではたらこうとおもっています"],
        explanation: "Trong bài đọc có câu: 大学を卒業したら、日本の会社で働こうと思っています。"
      },
      {
        id: "l31_hw_6_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 来年何をする予定ですか。 (Kế hoạch năm sau là gì?)",
        passage: "大学を卒業したら、日本の会社で働こうと思っています。ですから、今一生懸命日本語を勉強しています。来年日本語能力試験のN3を受ける予定です。日本で5年ぐらい働いてから、ベトナムへ帰って日本語の先生になるつもりです。",
        correctAnswers: ["日本語能力試験のN3を受ける予定です", "にほんごのうりょくしけんのN3をうけるよていです"],
        explanation: "Trong bài đọc có câu: 来年日本語能力試験のN3を受ける予定です。"
      },
      {
        id: "l31_hw_6_3",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: ベトナムへ帰ってから、何になるつもりですか。 (Về Việt Nam định làm nghề gì?)",
        passage: "大学を卒業したら、日本の会社で働こうと思っています。ですから、今一生懸命日本語を勉強しています。来年日本語能力試験 of N3を受ける予定です。日本で5年ぐらい働いてから、ベトナムへ帰って日本語の先生になるつもりです。",
        correctAnswers: ["日本語の先生になるつもりです", "にほんごのせんせいになるつもりです"],
        explanation: "Trong bài đọc có câu: ベトナムへ帰って日本語の先生になるつもりです。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 32
  // ====================================================
  {
    id: "lesson-32",
    title: "Bài kiểm tra Bài 32",
    description: "Kiểm tra cấu trúc Vた/Vないほうがいいです, でしょう, かもしれません.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l32_q1",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 熱があるなら、早く（　）ほうがいいですよ。",
        options: [{"id": "a", "text": "休んだ"}, {"id": "b", "text": "休む"}, {"id": "c", "text": "休んで"}, {"id": "d", "text": "休むの"}],
        correctOptionId: "a",
        explanation: "Khuyên nên làm gì: Vたほうがいいです."
      },
      {
        id: "l32_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 明日は天気が（　）でしょう。",
        options: [{"id": "a", "text": "いい"}, {"id": "b", "text": "よく"}, {"id": "c", "text": "いいの"}, {"id": "d", "text": "よければ"}],
        correctOptionId: "a",
        explanation: "Dự đoán chắc chắn cao: Thể thông thường + でしょう."
      },
      {
        id: "l32_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 約束の時間に（　）かもしれません。",
        options: [{"id": "a", "text": "間に合わない"}, {"id": "b", "text": "間に合おう"}, {"id": "c", "text": "間に合う"}, {"id": "d", "text": "間に合って"}],
        correctOptionId: "a",
        explanation: "Có lẽ là (dự báo thấp): Thể thông thường + かもしれません."
      },
      {
        id: "l32_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 無理を（　）ほうがいいです。",
        options: [{"id": "a", "text": "しない"}, {"id": "b", "text": "した"}, {"id": "c", "text": "しなくて"}, {"id": "d", "text": "しなかった"}],
        correctOptionId: "a",
        explanation: "Khuyên không nên làm gì: Vないほうがいいです."
      },
      {
        id: "l32_q5",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 明日は雪が（　）かもしれません。",
        options: [{"id": "a", "text": "降る"}, {"id": "b", "text": "降って"}, {"id": "c", "text": "降り"}, {"id": "d", "text": "降ら"}],
        correctOptionId: "a",
        explanation: "Có lẽ tuyết sẽ rơi: 降るかもしれません."
      },
      {
        id: "l32_q6",
        type: "text_input",
        skill: "Ngữ pháp (ほうがいいです)",
        text: "Điền dạng đúng: タバコは（　）ほうがいいです。 (Nên bỏ thuốc lá đi - dùng động từ やめます)",
        correctAnswers: ["やめた"],
        explanation: "やめます -> やめた."
      },
      {
        id: "l32_q7",
        type: "text_input",
        skill: "Ngữ pháp (ほうがいいです)",
        text: "Điền dạng đúng: お酒を飲みすぎ（　）ほうがいいです。 (Không nên uống quá nhiều rượu - dùng động từ ない)",
        correctAnswers: ["ない"],
        explanation: "飲みすぎないほうがいいです."
      },
      {
        id: "l32_q8",
        type: "text_input",
        skill: "Ngữ pháp (かもしれません)",
        text: "Điền dạng đúng: 午後から雨が（　）かもしれません。 (Chiều có thể trời sẽ mưa - dùng động từ 降ります)",
        correctAnswers: ["降る", "ふる"],
        explanation: "降るかもしれません."
      },
      {
        id: "l32_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Ngày mai có lẽ sẽ lạnh':",
        options: [{"id": "a", "text": "明日は寒くなるでしょう。"}, {"id": "b", "text": "明日は寒いでしょう。"}, {"id": "c", "text": "明日は寒くになるでしょう。"}, {"id": "d", "text": "明日は寒ければいいでしょう。"}],
        correctOptionId: "b",
        explanation: "寒いです (tính từ đuôi i) -> 寒いでしょう."
      },
      {
        id: "l32_q10",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 駅まで30分ですから、歩いて行（　）ほうがいいです。",
        options: [{"id": "a", "text": "った"}, {"id": "b", "text": "く"}, {"id": "c", "text": "き"}, {"id": "d", "text": "くの"}],
        correctOptionId: "a",
        explanation: "歩いて行ったほうがいいです (nên đi bộ)."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 32 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-32-hw",
    title: "Bài tập về nhà Bài 32 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 32: Cấu trúc ほうがいいです, でしょう, かもしれません.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l32_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (ほうがいいです)",
        text: "Điền dạng đúng: 体の調子が悪い時は、無理を（　）ほうがいいです。 (Khi người không khỏe thì không nên quá sức - dùng động từ しません)",
        correctAnswers: ["しない"],
        explanation: "無理をしないほうがいいです."
      },
      {
        id: "l32_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (ほうがいいです)",
        text: "Điền dạng đúng: パソコンを買う前に、よく（　）ほうがいいです。 (Trước khi mua máy tính nên tìm hiểu kỹ - dùng động từ 調べます)",
        correctAnswers: ["調べた", "しらべた"],
        explanation: "調べたほうがいいです."
      },
      {
        id: "l32_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (でしょう)",
        text: "Điền dạng đúng: 明日は北の風が（　）でしょう。 (Ngày mai gió phương bắc có lẽ sẽ mạnh - dùng tính từ 強い)",
        correctAnswers: ["強い", "つよい"],
        explanation: "強いでしょう."
      },
      {
        id: "l32_hw_2_2",
        type: "text_input",
        skill: "Ngữ pháp (でしょう)",
        text: "Điền dạng đúng: 今夜の月は（　）でしょう。 (Trăng đêm nay chắc sẽ tròn - dùng tính từ 丸い)",
        correctAnswers: ["丸い", "まるい"],
        explanation: "丸いでしょう."
      },
      {
        id: "l32_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (かもしれません)",
        text: "Điền dạng đúng: 約束の時間に（　）かもしれません。 (Có lẽ tôi sẽ không kịp giờ hẹn - dùng động từ 間に合いません)",
        correctAnswers: ["間に合わない", "まにあわない"],
        explanation: "間に合わないかもしれません."
      },
      {
        id: "l32_hw_3_2",
        type: "text_input",
        skill: "Ngữ pháp (かもしれません)",
        text: "Điền dạng đúng: 故障かもしれないから、電気屋に（　）ほうがいいです。 (Vì có thể bị hỏng nên hãy liên hệ thợ điện - dùng động từ 見せます)",
        correctAnswers: ["見せた", "みせた"],
        explanation: "見せたほうがいいです."
      },
      {
        id: "l32_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 寒いですから、コートを（　）ほうがいいですよ。 (Lạnh nên mặc áo khoác vào đi - dùng động từ 着ます)",
        correctAnswers: ["着た", "きた"],
        explanation: "着たほうがいい."
      },
      {
        id: "l32_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 忘れるかもしれないから、メモを（　）おいてください。 (Có thể sẽ quên nên hãy ghi chép lại sẵn - dùng động từ 書きます)",
        correctAnswers: ["書いて", "かいて"],
        explanation: "書いておいてください."
      },
      {
        id: "l32_hw_5_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 明日の朝の天気はどうなるでしょう。 (Thời tiết sáng mai thế nào?)",
        passage: "天気予報によると、明日は朝から雨が降るでしょう。午後からは風も強くなるかもしれませんから、外出する時は注意したほうがいいです。夜には雨がやむでしょうが、気温が下がって寒くなりますから、暖かい服を着て出かけたほうがいいです。",
        correctAnswers: ["雨が降るでしょう", "あめがふるでしょう"],
        explanation: "Trong bài đọc có câu: 明日は朝から雨が降るでしょう。"
      },
      {
        id: "l32_hw_5_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: どうして午後から外出する時に注意したほうがいいですか。 (Tại sao chiều mai ra ngoài nên chú ý?)",
        passage: "天気予報によると、明日は朝から雨が降るでしょう。午後からは風も強くなるかもしれませんから、外出する時は注意したほうがいいです。夜には雨がやむでしょうg...",
        correctAnswers: ["風が強くなるかもしれないからです", "かぜがつよくなるかもしれないからです"],
        explanation: "Trong bài đọc có câu: 午後からは風も強くなるかもしれませんから..."
      },
      {
        id: "l32_hw_5_3",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 夜に出かける時はどんな服を着たほうがいいですか。 (Tối mai đi nên mặc đồ thế nào?)",
        passage: "天気予報によると、明日は朝から雨が降るでしょう。午後からは風も強くなるかもしれませんから、外出する時は注意したほうがいいです。夜には雨がやむでしょうが、気温が下がって寒くなりますから、暖かい服を着て出かけたほうがいいです。",
        correctAnswers: ["暖かい服を着たほうがいいです", "あたたかいふくをきたほうがいいです"],
        explanation: "Trong bài đọc có câu: 暖かい服を着て出かけたほうがいいです。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 33
  // ====================================================
  {
    id: "lesson-33",
    title: "Bài kiểm tra Bài 33",
    description: "Kiểm tra Thể mệnh lệnh, Thể cấm chỉ, ~という意味です, ~と書いてあります.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l33_q1",
        type: "multiple_choice",
        text: "Chọn thể mệnh lệnh đúng của 走る: ",
        options: [{"id": "a", "text": "走れ"}, {"id": "b", "text": "走ろ"}, {"id": "c", "text": "走りなさい"}, {"id": "d", "text": "走れな"}],
        correctOptionId: "a",
        explanation: "Động từ nhóm I: u -> e -> 走れ."
      },
      {
        id: "l33_q2",
        type: "multiple_choice",
        text: "Chọn thể cấm chỉ đúng của 食べる: ",
        options: [{"id": "a", "text": "食べるな"}, {"id": "b", "text": "食べな"}, {"id": "c", "text": "食べろな"}, {"id": "d", "text": "食べ禁止"}],
        correctOptionId: "a",
        explanation: "Thể cấm chỉ = Thể từ điển + な."
      },
      {
        id: "l33_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: あそこに「止まれ」と（　）あります。",
        options: [{"id": "a", "text": "書いて"}, {"id": "b", "text": "書き"}, {"id": "c", "text": "書く"}, {"id": "d", "text": "書かれてい"}],
        correctOptionId: "a",
        explanation: "Nと書いてあります (được viết là N)."
      },
      {
        id: "l33_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: すみませんが、山田さんに明日会議があると（　）いただけませんか。",
        options: [{"id": "a", "text": "伝えて"}, {"id": "b", "text": "話し"}, {"id": "c", "text": "言う"}, {"id": "d", "text": "言わせて"}],
        correctOptionId: "a",
        explanation: "Vと伝えていただけませんか (nhắn lại giúp tôi...)."
      },
      {
        id: "l33_q5",
        type: "multiple_choice",
        text: "Chọn thể cấm chỉ đúng của する: ",
        options: [{"id": "a", "text": "するな"}, {"id": "b", "text": "しな"}, {"id": "c", "text": "しろな"}, {"id": "d", "text": "せよな"}],
        correctOptionId: "a",
        explanation: "する -> するな."
      },
      {
        id: "l33_q6",
        type: "text_input",
        skill: "Ngữ pháp (Thể mệnh lệnh)",
        text: "Điền thể mệnh lệnh của động từ: がんばります -> （　）。 (Cố lên - dùng thể mệnh lệnh)",
        correctAnswers: ["がんばれ"],
        explanation: "がんばります -> がんばれ."
      },
      {
        id: "l33_q7",
        type: "text_input",
        skill: "Ngữ pháp (Thể cấm chỉ)",
        text: "Điền thể cấm chỉ của động từ: 捨てます -> （　）。 (Cấm vứt - dùng thể cấm chỉ)",
        correctAnswers: ["捨てるな", "すてるな"],
        explanation: "捨てます -> 捨てるな."
      },
      {
        id: "l33_q8",
        type: "text_input",
        skill: "Ngữ pháp (という意味です)",
        text: "Điền dạng đúng: 「使用禁止」は「使（　）」という意味です。 (Cấm dùng nghĩa là không được dùng - dùng thể cấm chỉ)",
        correctAnswers: ["うな"],
        explanation: "使う -> 使うな."
      },
      {
        id: "l33_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Biển báo kia viết là lối thoát hiểm':",
        options: [{"id": "a", "text": "あそこに「非常口」と書いてあります。"}, {"id": "b", "text": "あそこに「非常口」と書いておきます。"}, {"id": "c", "text": "あそこに「非常口」と書いています。"}, {"id": "d", "text": "あそこに「非常口」と書かれています。"}],
        correctOptionId: "a",
        explanation: "Nと書いてあります."
      },
      {
        id: "l33_q10",
        type: "multiple_choice",
        text: "Chọn thể mệnh lệnh đúng của 来る (きます):",
        options: [{"id": "a", "text": "来い"}, {"id": "b", "text": "こい"}, {"id": "c", "text": "こさせ"}, {"id": "d", "text": "きよう"}],
        correctOptionId: "b",
        explanation: "きます -> こい."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 33 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-33-hw",
    title: "Bài tập về nhà Bài 33 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 33: Thể mệnh lệnh, Thể cấm chỉ, ~という意味です, ~と伝えていただけませんか.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l33_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (Mệnh lệnh)",
        text: "Điền thể mệnh lệnh của động từ: 逃げます -> （　）",
        correctAnswers: ["逃げろ", "にげろ"],
        explanation: "逃げます -> 逃げろ (Nhóm II)."
      },
      {
        id: "l33_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (Mệnh lệnh)",
        text: "Điền thể mệnh lệnh của động từ: 泳ぎます -> （　）",
        correctAnswers: ["泳げ", "およげ"],
        explanation: "泳ぎます -> 泳げ (Nhóm I)."
      },
      {
        id: "l33_hw_1_3",
        type: "text_input",
        skill: "Ngữ pháp (Cấm chỉ)",
        text: "Điền thể cấm chỉ của động từ: 運転します -> （　）",
        correctAnswers: ["運転するな", "うんてんするな"],
        explanation: "運転します -> 運転するな."
      },
      {
        id: "l33_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (という意味です)",
        text: "Điền dạng đúng: 「立入禁止」は「ここに入る（　）」という意味です。 (Lập nhập cấm chỉ nghĩa là cấm vào đây - dùng trợ từ thể cấm chỉ)",
        correctAnswers: ["な"],
        explanation: "入るな."
      },
      {
        id: "l33_hw_2_2",
        type: "text_input",
        skill: "Ngữ pháp (という意味です)",
        text: "Điền dạng đúng: 「無料」は「お金がいら（　）」という意味です。 (Miễn phí có nghĩa là không cần tiền - dùng động từ あります)",
        correctAnswers: ["ない", "ないの"],
        explanation: "いらないという意味です."
      },
      {
        id: "l33_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (伝えていただけませんか)",
        text: "Điền dạng đúng: 山田さんに、「3時までに事務所に来てください」と（　）いただけませんか。 (Nhắn hộ Yamada là hãy đến văn phòng trước 3h - dùng động từ 伝えます)",
        correctAnswers: ["伝えて", "つたえて"],
        explanation: "伝えていただけませんか."
      },
      {
        id: "l33_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 信号が赤ですから、あそこを（　）な。 (Đèn đỏ nên cấm đi qua đó - dùng động từ 渡ります)",
        correctAnswers: ["渡る", "わたる"],
        explanation: "渡るな."
      },
      {
        id: "l33_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 遅れますから、もっと早く（　）なさい。 (Sắp muộn rồi hãy đi nhanh lên - dùng động từ 走ります)",
        correctAnswers: ["走り", "はしり"],
        explanation: "走りなさい (yêu cầu nhẹ nhàng)."
      },
      {
        id: "l33_hw_5_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 道路の横に何と書いてありますか。 (Bên đường viết gì?)",
        passage: "道路の横に「工事中」と書いてあります。これは「今道路を直していますから、入るな」という意味です。車はここを通ることができませんから、向こうの道を通りなさい。",
        correctAnswers: ["工事中と書いてあります", "こうじちゅうとかいてあります"],
        explanation: "Trong bài đọc có câu: 道路の横に「工事中」と書いてあります。"
      },
      {
        id: "l33_hw_5_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 「工事中」はどういう意味ですか。 (Nghĩa của nó là gì?)",
        passage: "道路の横に「工事中」と書いてあります。これは「今道路を直していますから、入るな」という意味です。車はここを通ることができませんから、向こうの道を通りなさい。",
        correctAnswers: ["今道路を直していますから入るなという意味です", "いまどうろをなおしていますから、はいるなという意味です"],
        explanation: "Trong bài đọc có câu: これは「今道路を直していますから、入るな」という意味です。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 34
  // ====================================================
  {
    id: "lesson-34",
    title: "Bài kiểm tra Bài 34",
    description: "Kiểm tra cấu trúc V1とおりに V2, V1あとで V2, V1て/ないで V2.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l34_q1",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 私が言う（　）に、書いてください。",
        options: [{"id": "a", "text": "とおり"}, {"id": "b", "text": "あとで"}, {"id": "c", "text": "とおりで"}, {"id": "d", "text": "まま"}],
        correctOptionId: "a",
        explanation: "V1とおりに V2: làm V2 theo như V1."
      },
      {
        id: "l34_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 仕事が終わった（　）、飲みに行きましょう。",
        options: [{"id": "a", "text": "あとで"}, {"id": "b", "text": "まえに"}, {"id": "c", "text": "ときに"}, {"id": "d", "text": "とおりに"}],
        correctOptionId: "a",
        explanation: "Vたあとで V2: làm V2 sau khi làm V1."
      },
      {
        id: "l34_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 砂糖を（　）コーヒーを飲みます。",
        options: [{"id": "a", "text": "入れないで"}, {"id": "b", "text": "入れて"}, {"id": "c", "text": "入れなく"}, {"id": "d", "text": "入れない"}],
        correctOptionId: "a",
        explanation: "V1ないで V2: làm V2 mà không làm V1 (trạng thái đi kèm)."
      },
      {
        id: "l34_q4",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 説明書（　）に、ロボットを組み立てました。",
        options: [{"id": "a", "text": "のとおり"}, {"id": "b", "text": "とおり"}, {"id": "c", "text": "のとおりで"}, {"id": "d", "text": "とおりの"}],
        correctOptionId: "a",
        explanation: "N のとおりに V: theo như N."
      },
      {
        id: "l34_q5",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: ご飯を食べた（　）、薬を飲みます。",
        options: [{"id": "a", "text": "あとで"}, {"id": "b", "text": "まえに"}, {"id": "c", "text": "とおりに"}, {"id": "d", "text": "ときに"}],
        correctOptionId: "a",
        explanation: "Vたあとで (sau khi)."
      },
      {
        id: "l34_q6",
        type: "text_input",
        skill: "Ngữ pháp (とおりに)",
        text: "Điền dạng đúng: 先生が書いた（　）に、書いてください。 (Hãy viết theo như giáo viên đã viết - dùng danh từ とおり)",
        correctAnswers: ["とおり"],
        explanation: "書いたとおりに."
      },
      {
        id: "l34_q7",
        type: "text_input",
        skill: "Ngữ pháp (あとで)",
        text: "Điền dạng đúng: スポーツの（　）で、シャワーを浴びます。 (Sau khi chơi thể thao tôi đi tắm - dùng danh từ あと)",
        correctAnswers: ["あと"],
        explanation: "スポーツのあとで."
      },
      {
        id: "l34_q8",
        type: "text_input",
        skill: "Ngữ pháp (ないで)",
        text: "Điền dạng đúng: 昨夜は傘を持た（　）出かけました。 (Tối qua tôi ra ngoài mà không mang ô - dùng từ cản/phủ định)",
        correctAnswers: ["ないで"],
        explanation: "持たないで出かけました."
      },
      {
        id: "l34_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Hãy gấp giấy theo đường vẽ':",
        options: [{"id": "a", "text": "線のとおりに紙を折ってください。"}, {"id": "b", "text": "線とおりに紙を折ってください。"}, {"id": "c", "text": "線に折ってください。"}, {"id": "d", "text": "線のあとで紙を折ってください。"}],
        correctOptionId: "a",
        explanation: "線のとおりに (theo như đường vẽ)."
      },
      {
        id: "l34_q10",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 醤油を（　）寿司を食べました。",
        options: [{"id": "a", "text": "つけないで"}, {"id": "b", "text": "つけて"}, {"id": "c", "text": "つけなく"}, {"id": "d", "text": "つけるな"}],
        correctOptionId: "a",
        explanation: "醤油をつけないで (không chấm nước tương)."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 34 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-34-hw",
    title: "Bài tập về nhà Bài 34 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 34: Cấu trúc とおりに, あとで, ないで.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l34_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (とおりに)",
        text: "Điền dạng đúng: 図の（　）に、紙を折ってください。 (Hãy gấp giấy theo như hình vẽ - dùng danh từ とおり)",
        correctAnswers: ["とおり"],
        explanation: "図のとおりに."
      },
      {
        id: "l34_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (とおりに)",
        text: "Điền dạng đúng: わたしがやった（　）に、やってください。 (Hãy làm theo đúng những gì tôi làm - dùng danh từ とおり)",
        correctAnswers: ["とおり"],
        explanation: "やったとおりに."
      },
      {
        id: "l34_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (あとで)",
        text: "Điền dạng đúng: 仕事の（　）で、飲みに行きましょう。 (Sau công việc chúng ta đi uống nhé - dùng từ chỉ sau)",
        correctAnswers: ["あと"],
        explanation: "仕事のあとで."
      },
      {
        id: "l34_hw_2_2",
        type: "text_input",
        skill: "Ngữ pháp (あとで)",
        text: "Điền dạng đúng: ご飯を（　）あとで、歯を磨きます。 (Sau khi ăn cơm xong tôi đánh răng - dùng động từ 食べます)",
        correctAnswers: ["食べた", "たべた"],
        explanation: "食べたあとで."
      },
      {
        id: "l34_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (ないで)",
        text: "Điền dạng đúng: 今日はエレベーターを使わ（　）階段を登りました。 (Hôm nay tôi leo thang bộ mà không dùng thang máy - dùng trợ từ)",
        correctAnswers: ["ないで"],
        explanation: "使わないで階段を登りました."
      },
      {
        id: "l34_hw_3_2",
        type: "text_input",
        skill: "Ngữ pháp (ないで)",
        text: "Điền dạng đúng: 醤油を（　）寿司を食べました。 (Tôi ăn sushi mà không chấm xì dầu - dùng động từ つけます)",
        correctAnswers: ["つけないで"],
        explanation: "つけないで."
      },
      {
        id: "l34_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: シャワーを（　）あとで、ビールを飲みました。 (Sau khi tắm xong tôi đã uống bia - dùng động từ 浴びます)",
        correctAnswers: ["浴びた", "あびた"],
        explanation: "浴びたあとで."
      },
      {
        id: "l34_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 傘を（　）で出かけましたから、濡れてしまいました。 (Tôi ra ngoài mà không mang ô nên bị ướt - dùng động từ 持ちます)",
        correctAnswers: ["持たない", "もたない"],
        explanation: "持たないで出かけました."
      },
      {
        id: "l34_hw_5_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 寿司を作る時、最初に何を作りますか。 (Khi làm sushi đầu tiên làm gì?)",
        passage: "日本の寿司を作る時は、まず酢と砂糖を混ぜてご飯を作ります。そのあとで、ご飯を小さく丸めます。ご飯の上にわさびを少しのせてから、魚の刺身をのせます。",
        correctAnswers: ["酢と砂糖を混ぜてご飯を作ります", "すとおさとうをまぜてごはんをつくります"],
        explanation: "Trong bài đọc có câu: 寿司を作る時は、まず酢と砂糖を混ぜてご飯を作ります。"
      },
      {
        id: "l34_hw_5_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: ご飯を丸めたあとで、何をしますか。 (Sau khi nặn cơm xong làm gì?)",
        passage: "日本の寿司を作る時は、まず酢と砂糖を混ぜてご飯を作ります。そのあとで、ご飯を小さく丸めます。ご飯の上にわさびを少しのせてから、魚の刺身をのせます。",
        correctAnswers: ["わさびを少しのせて魚の刺身をのせます", "わさびを少しのせて魚のさしみをのせます", "わさびをのせて魚をのせます"],
        explanation: "Trong bài đọc có câu: ご飯を小さく丸めます。ご飯の上にわさびを少しのせてから、魚の刺身をのせます。"
      }
    ]
  },
  // ====================================================
  // BÀI KIỂM TRA BÀI 35
  // ====================================================
  {
    id: "lesson-35",
    title: "Bài kiểm tra Bài 35",
    description: "Kiểm tra Thể điều kiện (ば-form), Nなら, VばVるほど.",
    level: "N4",
    durationMinutes: 15,
    questions: [
      {
        id: "l35_q1",
        type: "multiple_choice",
        text: "Chọn dạng chia đúng thể điều kiện của 安い: ",
        options: [{"id": "a", "text": "安ければ"}, {"id": "b", "text": "安かったら"}, {"id": "c", "text": "安いなら"}, {"id": "d", "text": "安くれば"}],
        correctOptionId: "a",
        explanation: "Tính từ đuôi i: bỏ i + ければ -> 安ければ."
      },
      {
        id: "l35_q2",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: 日本語は話せ（　）話すほど上手になります。",
        options: [{"id": "a", "text": "ば"}, {"id": "b", "text": "たら"}, {"id": "c", "text": "なら"}, {"id": "d", "text": "ると"}],
        correctOptionId: "a",
        explanation: "Vば Vるほど: càng... càng..."
      },
      {
        id: "l35_q3",
        type: "multiple_choice",
        text: "Chọn từ thích hợp: カメラを買う（　）、秋葉原がいいですよ。",
        options: [{"id": "a", "text": "なら"}, {"id": "b", "text": "たら"}, {"id": "c", "text": "ば"}, {"id": "d", "text": "と"}],
        correctOptionId: "a",
        explanation: "Nなら: đưa ra gợi ý/lời khuyên về chủ đề N."
      },
      {
        id: "l35_q4",
        type: "multiple_choice",
        text: "Chọn dạng chia đúng thể điều kiện của いい: ",
        options: [{"id": "a", "text": "よければ"}, {"id": "b", "text": "いいければ"}, {"id": "c", "text": "よければいい"}, {"id": "d", "text": "よければ"}],
        correctOptionId: "a",
        explanation: "いい -> よければ (Bất quy tắc)."
      },
      {
        id: "l35_q5",
        type: "multiple_choice",
        text: "Chọn dạng chia đúng thể điều kiện của 行く: ",
        options: [{"id": "a", "text": "行けば"}, {"id": "b", "text": "行こう"}, {"id": "c", "text": "行くなら"}, {"id": "d", "text": "行ったら"}],
        correctOptionId: "a",
        explanation: "Động từ nhóm I: u -> e + ば -> 行けば."
      },
      {
        id: "l35_q6",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền thể điều kiện của động từ: あります -> （　）。 (Nếu có - dùng thể điều kiện)",
        correctAnswers: ["あれば"],
        explanation: "あります -> あれば."
      },
      {
        id: "l35_q7",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền thể điều kiện của động từ: 読みます -> （　）。 (Nếu đọc - dùng thể điều kiện)",
        correctAnswers: ["読めば", "よめば"],
        explanation: "読みます -> 読めば."
      },
      {
        id: "l35_q8",
        type: "text_input",
        skill: "Ngữ pháp (Nなら)",
        text: "Điền dạng đúng SUGGESTION: 日本料理を食べる（　）、あの店が有名ですよ。 (Nếu ăn món Nhật thì tiệm kia nổi tiếng đó - dùng trợ từ điều kiện)",
        correctAnswers: ["なら"],
        explanation: "Nなら (Nếu là N)."
      },
      {
        id: "l35_q9",
        type: "multiple_choice",
        text: "Chọn câu đúng nghĩa 'Càng học càng thấy thú vị':",
        options: [{"id": "a", "text": "勉強すれば勉強するほどおもしろくなります。"}, {"id": "b", "text": "勉強するならおもしろくなります。"}, {"id": "c", "text": "勉強すればおもしろいになります。"}, {"id": "d", "text": "勉強すれば勉強するおもしろいになります。"}],
        correctOptionId: "a",
        explanation: "Vば Vるほど (Càng học càng thú vị)."
      },
      {
        id: "l35_q10",
        type: "multiple_choice",
        text: "Chọn thể điều kiện đúng của する: ",
        options: [{"id": "a", "text": "すれば"}, {"id": "b", "text": "するば"}, {"id": "c", "text": "しれば"}, {"id": "d", "text": "しよう"}],
        correctOptionId: "a",
        explanation: "する -> すれば."
      }
    ]
  },
  // ====================================================
  // BÀI TẬP VỀ NHÀ BÀI 35 (TRỌN BỘ MONDAI & RENSHUU)
  // ====================================================
  {
    id: "lesson-35-hw",
    title: "Bài tập về nhà Bài 35 (Trọn bộ Mondai & Renshuu)",
    description: "Trọn bộ bài tập về nhà theo sát sách bài tập Minna no Nihongo Bài 35: Cấu trúc thể điều kiện Vば, Nなら, Vば Vるほど.",
    level: "N4",
    durationMinutes: 20,
    questions: [
      {
        id: "l35_hw_1_1",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền thể điều kiện của động từ: 走ります -> （　）",
        correctAnswers: ["走れば", "はしれば"],
        explanation: "走ります -> 走れば."
      },
      {
        id: "l35_hw_1_2",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền thể điều kiện của động từ: 覚えます -> （　）",
        correctAnswers: ["覚えれば", "おぼえれば"],
        explanation: "覚えます -> 覚えれば (Nhóm II)."
      },
      {
        id: "l35_hw_1_3",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền thể điều kiện của động từ: 来ます -> （　）",
        correctAnswers: ["来れば", "くれば"],
        explanation: "来ます -> 来れば (Nhóm III)."
      },
      {
        id: "l35_hw_2_1",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền dạng đúng: 天気が（　）ば、山に登りましょう。 (Nếu thời tiết đẹp chúng ta cùng leo núi - dùng tính từ いい)",
        correctAnswers: ["よけれ"],
        explanation: "いい -> よければ."
      },
      {
        id: "l35_hw_2_2",
        type: "text_input",
        skill: "Ngữ pháp (Thể điều kiện)",
        text: "Điền dạng đúng: 安（　）ば、もう一台買います。 (Nếu rẻ tôi mua thêm chiếc nữa - dùng tính từ 安い)",
        correctAnswers: ["けれ"],
        explanation: "安い -> 安ければ."
      },
      {
        id: "l35_hw_3_1",
        type: "text_input",
        skill: "Ngữ pháp (Nなら)",
        text: "Điền dạng đúng: 日本旅行（　）、春か秋がいいですよ。 (Nếu du lịch Nhật Bản thì mùa xuân hay mùa thu là đẹp - dùng trợ từ)",
        correctAnswers: ["なら"],
        explanation: "Nなら (Nếu là...)."
      },
      {
        id: "l35_hw_4_1",
        type: "text_input",
        skill: "Ngữ pháp (ば～ほど)",
        text: "Điền dạng đúng: パソコンは使えば（　）ほど、上手になります。 (Máy tính càng dùng nhiều càng thành thạo - dùng động từ 使い)",
        correctAnswers: ["使う", "つかう"],
        explanation: "使えば使うほど."
      },
      {
        id: "l35_hw_4_2",
        type: "text_input",
        skill: "Ngữ pháp (Tổng hợp)",
        text: "Điền dạng đúng: 時間が（　）ば、旅行に行きたいです。 (Nếu có thời gian tôi muốn đi du lịch - dùng động từ あります)",
        correctAnswers: ["あれ"],
        explanation: "あれば."
      },
      {
        id: "l35_hw_5_1",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 日本へ旅行に行くなら、いつ行けばいいですか。 (Nên đi du lịch Nhật vào khi nào?)",
        passage: "日本へ旅行に行くなら、春か秋に行けばいいと思います。春なら桜がきれいですし、秋なら紅葉が美しいからです。もし冬に行けば、北海道でスキーができます。",
        correctAnswers: ["春か秋に行けばいいと思います", "春か秋", "はるかあきにいけばいいとおもいます"],
        explanation: "Trong bài đọc có câu: 日本へ旅行に行くなら、春か秋に行けばいいと思います。"
      },
      {
        id: "l35_hw_5_2",
        type: "text_input",
        skill: "Đọc hiểu",
        text: "Trả lời câu hỏi dựa trên bài đọc: 安く旅行したければ、どうしたほうがいいですか。 (Muốn đi rẻ thì nên làm gì?)",
        passage: "日本へ旅行に行くなら、春か秋に行けばいいと思います。春なら桜がきれいですし、秋なら紅葉が美しいからです。もし冬に行けば、北海道でスキーができます。安く旅行したければ、LCCの飛行機を早く予約したほうがいいです。",
        correctAnswers: ["LCCの飛行機を早く予約したほうがいいです", "LCCのひこうきをはやくよやくしたほうがいいです"],
        explanation: "Trong bài đọc có câu: 安く旅行したければ、LCCの飛行機を早く予約したほうがいいです。"
      }
    ]
  }
];
