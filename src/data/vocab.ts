export type VocabItem = {
  ja: string;
  kana: string;
  vi: string;
};

export type VocabGroup = {
  name: string;
  items: VocabItem[];
};

export type LessonVocab = {
  title: string;
  lesson: number;
  groups: VocabGroup[];
};

export const VOCAB_DATA: Record<string, LessonVocab> = {
  'bai-26': {
    title: 'Bài 26 – Thể thông thường + んです',
    lesson: 26,
    groups: [
      {
        name: 'Động từ',
        items: [
          { ja: '診ます', kana: 'みます', vi: 'xem, khám (bệnh)' },
          { ja: '探します', kana: 'さがします', vi: 'tìm, tìm kiếm' },
          { ja: '遅れます', kana: 'おくれます', vi: 'trễ, muộn (giờ)' },
          { ja: '間に合います', kana: 'まにあいます', vi: 'kịp (giờ)' },
          { ja: 'やります', kana: 'やります', vi: 'làm, thực hiện' },
          { ja: '拾います', kana: 'ひろいます', vi: 'nhặt được, lượm' },
          { ja: '連絡します', kana: 'れんらくします', vi: 'liên lạc' },
        ]
      },
      {
        name: 'Tính từ / Phó từ',
        items: [
          { ja: 'ずいぶん', kana: 'ずいぶん', vi: 'cực kỳ, khá là' },
          { ja: '直接', kana: 'ちょくせつ', vi: 'trực tiếp' },
          { ja: 'いつでも', kana: 'いつでも', vi: 'bất kỳ lúc nào' },
          { ja: 'どこでも', kana: 'どこでも', vi: 'bất kỳ nơi đâu' },
          { ja: 'だれでも', kana: 'だれでも', vi: 'bất kỳ ai' },
          { ja: '何でも', kana: 'なんden', vi: 'bất kỳ cái gì' },
        ]
      },
      {
        name: 'Từ chỉ thị',
        items: [
          { ja: 'こんな', kana: 'こんな', vi: 'như thế này (gần người nói)' },
          { ja: 'そんな', kana: 'そんな', vi: 'như thế đó (gần người nghe)' },
          { ja: 'あんな', kana: 'あんな', vi: 'như thế kia (xa cả hai)' },
        ]
      },
    ]
  },
  'bai-27': {
    title: 'Bài 27 – Thể khả năng & しか～ません',
    lesson: 27,
    groups: [
      {
        name: 'Động từ',
        items: [
          { ja: '飼います', kana: 'かいます', vi: 'nuôi (động vật)' },
          { ja: '建てます', kana: 'たてます', vi: 'xây dựng' },
          { ja: '走ります', kana: 'はしります', vi: 'chạy' },
          { ja: '見えます', kana: 'みえます', vi: 'nhìn thấy (tự nhiên thấy được)' },
          { ja: '聞こえます', kana: 'きこえます', vi: 'nghe thấy (tự nhiên nghe được)' },
          { ja: 'できます', kana: 'できます', vi: 'có thể làm, hoàn thành' },
          { ja: '開きます', kana: 'ひらきます', vi: 'mở, tổ chức (hội nghị, lớp học)' },
        ]
      },
      {
        name: 'Danh từ',
        items: [
          { ja: 'ペット', kana: 'ペット', vi: 'thú cưng' },
          { ja: '鳥', kana: 'とり', vi: 'chim' },
          { ja: '声', kana: 'こえ', vi: 'tiếng, giọng nói' },
          { ja: '波', kana: 'なみ', vi: 'sóng (biển)' },
          { ja: '花火', kana: 'はなび', vi: 'pháo hoa' },
          { ja: '道具', kana: 'どうぐ', vi: 'dụng cụ, công cụ' },
          { ja: 'クリーニング', kana: 'クリーニング', vi: 'giặt là, tiệm giặt' },
          { ja: 'マンション', kana: 'マンション', vi: 'căn hộ chung cư cao cấp' },
          { ja: 'キッチン', kana: 'キッチン', vi: 'nhà bếp' },
        ]
      },
    ]
  },
  'bai-28': {
    title: 'Bài 28 – Vừa...vừa (ながら) & Liệt kê lý do (し)',
    lesson: 28,
    groups: [
      {
        name: 'Động từ',
        items: [
          { ja: '売れます', kana: 'うれます', vi: 'bán chạy, được bán [パンが~]' },
          { ja: '踊ります', kana: 'おどります', vi: 'nhảy, khiêu vũ' },
          { ja: 'かみます', kana: 'かみます', vi: 'nhai, cắn' },
          { ja: '選びます', kana: 'えらびます', vi: 'chọn, lựa chọn' },
          { ja: '違います', kana: 'ちがいます', vi: 'khác, khác biệt' },
          { ja: '通います', kana: 'kâyoimasu', vi: 'đi học, đi làm (đi về thường xuyên)' },
          { ja: 'メモします', kana: 'メモします', vi: 'ghi chép, ghi nhớ' },
          { ja: 'おしゃべりします', kana: 'おしゃべりします', vi: 'trò chuyện, tán ngẫu' },
        ]
      },
      {
        name: 'Tính từ',
        items: [
          { ja: 'まじめ [な]', kana: 'まじめ', vi: 'nghiêm túc, ngoan ngoãn, chăm chỉ' },
          { ja: '熱心 [な]', kana: 'ねっしん', vi: 'nhiệt tình, nhiệt huyết, tận tâm' },
          { ja: '優しい', kana: 'やさしい', vi: 'hiền lành, tốt bụng, dịu dàng' },
          { ja: '偉い', kana: 'えらい', vi: 'vĩ đại, đáng kính, giỏi giang' },
          { ja: 'ちょうどいい', kana: 'ちょうどいい', vi: 'vừa vặn, vừa khéo, vừa khít' },
        ]
      },
      {
        name: 'Danh từ',
        items: [
          { ja: '習慣', kana: 'しゅうかん', vi: 'thói quen, tập quán' },
          { ja: '経験', kana: 'けいけん', vi: 'kinh nghiệm' },
          { ja: '力', kana: 'ちから', vi: 'sức lực, sức mạnh' },
          { ja: '人気', kana: 'にんき', vi: 'sự nổi tiếng, được yêu thích [～があります]' },
          { ja: '形', kana: 'かたち', vi: 'hình dáng, hình dạng' },
          { ja: '色', kana: 'いろ', vi: 'màu sắc' },
          { ja: '味', kana: 'あじ', vi: 'mùi vị, hương vị' },
          { ja: 'ガム', kana: 'ガム', vi: 'kẹo cao su (chewing gum)' },
          { ja: '品物', kana: 'しなもの', vi: 'hàng hóa, sản phẩm, vật phẩm' },
          { ja: '値段', kana: 'ねだん', vi: 'giá cả, giá tiền' },
          { ja: '給料', kana: 'きゅうりょう', vi: 'lương' },
          { ja: 'ボーナス', kana: 'ボーナス', vi: 'tiền thưởng, tiền bonus' },
          { ja: '番組', kana: 'ばんぐみ', vi: 'chương trình (TV, radio)' },
          { ja: 'ドラマ', kana: 'ドラマ', vi: 'kịch, phim truyền hình' },
          { ja: '小説', kana: 'しょうせつ', vi: 'tiểu thuyết' },
          { ja: '小説家', kana: 'しょうせつか', vi: 'nhà văn, tiểu thuyết gia' },
          { ja: '歌手', kana: 'かしゅ', vi: 'ca sĩ' },
          { ja: '管理人', kana: 'かんりにん', vi: 'người quản lý, người coi nhà' },
          { ja: '息子', kana: 'むすこ', vi: 'con trai (của mình)' },
          { ja: '息子さん', kana: 'むすこさん', vi: 'con trai (của người khác)' },
          { ja: '娘', kana: 'むすめ', vi: 'con gái (của mình)' },
          { ja: '娘さん', kana: 'むすめさん', vi: 'con gái (của người khác)' },
          { ja: '自分', kana: 'じぶん', vi: 'bản thân, tự mình' },
          { ja: '将来', kana: 'しょうらい', vi: 'tương lai' },
        ]
      },
      {
        name: 'Phó từ & Liên từ',
        items: [
          { ja: 'しばらく', kana: 'しばらく', vi: 'một lát, một khoảng thời gian ngắn' },
          { ja: 'たいてい', kana: 'たいてい', vi: 'thông thường, hầu hết, nhìn chung' },
          { ja: 'それに', kana: 'それに', vi: 'hơn nữa, thêm vào đó, vả lại' },
          { ja: 'それで', kana: 'それで', vi: 'vì thế, cho nên, do đó' },
        ]
      },
    ]
  }
  'bai-27': {
    title: 'Bài 27 – Thể khả năng',
    lesson: 27,
    groups: [
      {
        name: 'Từ vựng chung',
        items: [
          { ja: '飼います', kana: 'かいます', vi: 'nuôi (động vật)' },
          { ja: '建てます', kana: 'たてます', vi: 'xây dựng' },
          { ja: '走ります', kana: 'はしります', vi: 'chạy (trên đường)' },
          { ja: '取ります', kana: 'とります', vi: 'lấy (nghỉ phép)' },
          { ja: '見えます', kana: 'みえます', vi: 'có thể nhìn thấy' },
          { ja: '聞こえます', kana: 'きこえます', vi: 'có thể nghe thấy' },
          { ja: 'できます', kana: 'できます', vi: 'được hoàn thành, được xây lên' },
          { ja: '開きます', kana: 'ひらきます', vi: 'mở (lớp học, tổ chức)' },
          { ja: '', kana: 'ペット', vi: 'thú cưng' },
          { ja: '鳥', kana: 'とり', vi: 'chim' },
          { ja: '声', kana: 'こえ', vi: 'giọng nói' },
          { ja: '波', kana: 'なみ', vi: 'sóng' },
          { ja: '花火', kana: 'はなび', vi: 'pháo hoa' },
          { ja: '景色', kana: 'けしき', vi: 'phong cảnh' },
          { ja: '昼間', kana: 'ひるま', vi: 'ban ngày' },
          { ja: '昔', kana: 'むかし', vi: 'ngày xưa' },
          { ja: '道具', kana: 'どうぐ', vi: 'dụng cụ' },
          { ja: '自動販売機', kana: 'じどうはんばいき', vi: 'máy bán hàng tự động' },
          { ja: '通信販売', kana: 'つうしんはんばい', vi: 'mua sắm qua mạng/thư tín' },
          { ja: '', kana: 'クリーニング', vi: 'giặt là' },
          { ja: '', kana: 'マンション', vi: 'chung cư' },
          { ja: '台所', kana: 'だいどころ', vi: 'nhà bếp' },
          { ja: '教室', kana: 'きょうしつ', vi: 'lớp học' },
          { ja: '', kana: 'パーティールーム', vi: 'phòng tiệc' },
          { ja: '後', kana: 'ご', vi: 'sau (khoảng thời gian)' },
          { ja: '', kana: 'しか', vi: 'chỉ (dùng với phủ định)' },
          { ja: '', kana: 'ほかの', vi: 'khác' },
          { ja: '材料', kana: 'ざいりょう', vi: 'nguyên liệu' },
          { ja: '石', kana: 'いし', vi: 'đá' },
          { ja: '', kana: 'ピラミッド', vi: 'kim tự tháp' },
          { ja: '', kana: 'データ', vi: 'dữ liệu' },
          { ja: '', kana: 'ファイル', vi: 'tệp tin' },
          { ja: '', kana: 'ある', vi: 'một cái ~ nào đó' },
          { ja: '一生懸命', kana: 'いっしょうけんめい', vi: 'cố gắng hết sức' },
          { ja: '', kana: 'なぜ', vi: 'tại sao' },
          { ja: '国連', kana: 'こくれん', vi: 'Liên Hợp Quốc' },
          { ja: '', kana: 'エリーゼのために', vi: 'bản Für Elise' },
          { ja: '', kana: 'ベートーベン', vi: 'Beethoven' },
          { ja: '', kana: 'ポーランド', vi: 'Ba Lan' },
        ]
      }
    ]
  },
};
