'use client';
import { useState } from 'react';

// =====================
// VOCABULARY DATA
// =====================
const VOCAB_DATA: Record<string, { title: string; lesson: number; groups: { name: string; items: { ja: string; kana: string; vi: string }[] }[] }> = {
  'bai-26': {
    title: 'Bài 26 – Thể thông thường + んです',
    lesson: 26,
    groups: [
      {
        name: '動詞 Động từ',
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
        name: '形容詞 Tính từ / 副詞 Phó từ',
        items: [
          { ja: 'ずいぶん', kana: 'ずいぶん', vi: 'cực kỳ, khá là' },
          { ja: '直接', kana: 'ちょくせつ', vi: 'trực tiếp' },
          { ja: 'いつでも', kana: 'いつでも', vi: 'bất kỳ lúc nào' },
          { ja: 'どこでも', kana: 'どこでも', vi: 'bất kỳ nơi đâu' },
          { ja: 'だれでも', kana: 'だれでも', vi: 'bất kỳ ai' },
          { ja: '何でも', kana: 'なんでも', vi: 'bất kỳ cái gì' },
        ]
      },
      {
        name: '指示詞 Từ chỉ thị',
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
        name: '動詞 Động từ',
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
        name: '名詞 Danh từ',
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
        name: '動詞 Động từ',
        items: [
          { ja: '売れます', kana: 'うれます', vi: 'bán chạy, được bán [パンが~]' },
          { ja: '踊ります', kana: 'おどります', vi: 'nhảy, khiêu vũ' },
          { ja: 'かみます', kana: 'かみます', vi: 'nhai, cắn' },
          { ja: '選びます', kana: 'えらびます', vi: 'chọn, lựa chọn' },
          { ja: '違います', kana: 'ちがいます', vi: 'khác, khác biệt' },
          { ja: '通います', kana: 'かよいます', vi: 'đi học, đi làm (đi về thường xuyên)' },
          { ja: 'メモします', kana: 'メモします', vi: 'ghi chép, ghi nhớ' },
          { ja: 'おしゃべりします', kana: 'おしゃべりします', vi: 'trò chuyện, tán ngẫu' },
        ]
      },
      {
        name: '形容詞 Tính từ',
        items: [
          { ja: 'まじめ [な]', kana: 'まじめ', vi: 'nghiêm túc, ngoan ngoãn, chăm chỉ' },
          { ja: '熱心 [な]', kana: 'ねっしん', vi: 'nhiệt tình, nhiệt huyết, tận tâm' },
          { ja: '優しい', kana: 'やさしい', vi: 'hiền lành, tốt bụng, dịu dàng' },
          { ja: '偉い', kana: 'えらい', vi: 'vĩ đại, đáng kính, giỏi giang' },
          { ja: 'ちょうどいい', kana: 'ちょうどいい', vi: 'vừa vặn, vừa khéo, vừa khít' },
        ]
      },
      {
        name: '名詞 Danh từ',
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
        name: '副詞・接続詞 Phó từ & Liên từ',
        items: [
          { ja: 'しばらく', kana: 'しばらく', vi: 'một lát, một khoảng thời gian ngắn' },
          { ja: 'たいてい', kana: 'たいてい', vi: 'thông thường, hầu hết, nhìn chung' },
          { ja: 'それに', kana: 'それに', vi: 'hơn nữa, thêm vào đó, vả lại' },
          { ja: 'それで', kana: 'それで', vi: 'vì thế, cho nên, do đó' },
        ]
      },
    ]
  }
};

// =====================
// FLASHCARD MODAL
// =====================
function FlashcardModal({ items, onClose }: { items: { ja: string; kana: string; vi: string }[]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = items[index];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '30px', maxWidth: '500px',
        width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Thẻ {index + 1} / {items.length}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#eee', borderRadius: '4px', height: '6px', marginBottom: '30px' }}>
          <div style={{ background: '#2563EB', width: `${((index + 1) / items.length) * 100}%`, height: '100%', borderRadius: '4px', transition: 'width 0.3s' }} />
        </div>

        {/* Card */}
        <div
          onClick={() => setFlipped(!flipped)}
          style={{
            cursor: 'pointer', minHeight: '200px', borderRadius: '16px', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: flipped ? '#f0fff4' : '#eff6ff',
            border: flipped ? '2px solid #86efac' : '2px solid #93c5fd',
            transition: 'all 0.3s', padding: '30px', textAlign: 'center', gap: '10px'
          }}
        >
          {!flipped ? (
            <>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1d4ed8', lineHeight: 1.3 }}>{card.ja}</div>
              <div style={{ fontSize: '18px', color: '#64748b' }}>{card.kana}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>👆 Nhấn để xem nghĩa</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a' }}>{card.vi}</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>🇯🇵 {card.ja} ({card.kana})</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>👆 Nhấn để lật lại</div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
          <button
            onClick={() => { setFlipped(false); setIndex(i => i - 1); }}
            disabled={index === 0}
            style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px',
              background: index === 0 ? '#f1f5f9' : '#e2e8f0', color: index === 0 ? '#cbd5e1' : '#334155',
              cursor: index === 0 ? 'not-allowed' : 'pointer'
            }}
          >← Trước</button>
          {index < items.length - 1 ? (
            <button
              onClick={() => { setFlipped(false); setIndex(i => i + 1); }}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px', background: '#2563EB', color: 'white', cursor: 'pointer' }}
            >Tiếp →</button>
          ) : (
            <button
              onClick={() => { setFlipped(false); setIndex(0); }}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px', background: '#16a34a', color: 'white', cursor: 'pointer' }}
            >🔄 Học lại</button>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================
// MAIN PAGE
// =====================
export default function VocabPage({ lessonId }: { lessonId: string }) {
  const data = VOCAB_DATA[lessonId];
  const [studyItems, setStudyItems] = useState<null | { ja: string; kana: string; vi: string }[]>(null);

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
        <h1 style={{ color: '#dc2626' }}>Không tìm thấy bài học "{lessonId}"</h1>
        <p>Vui lòng kiểm tra lại đường link.</p>
      </div>
    );
  }

  const allItems = data.groups.flatMap(g => g.items);

  return (
    <>
      {studyItems && <FlashcardModal items={studyItems} onClose={() => setStudyItems(null)} />}

      <div style={{
        minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f0fdf4 100%)',
        fontFamily: '"Inter", "Noto Sans JP", sans-serif', padding: '0 0 60px 0'
      }}>
        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          padding: '40px 20px', color: 'white', textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.75, marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            📚 Minna no Nihongo II
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, margin: '0 0 10px 0', lineHeight: 1.2 }}>
            {data.title}
          </h1>
          <p style={{ opacity: 0.85, margin: '0 0 25px 0', fontSize: '16px' }}>
            {allItems.length} từ vựng · Hidaya School N4
          </p>
          <button
            onClick={() => setStudyItems([...allItems].sort(() => Math.random() - 0.5))}
            style={{
              background: 'white', color: '#1e40af', border: 'none', borderRadius: '12px',
              padding: '12px 28px', fontWeight: 700, fontSize: '16px', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'transform 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🎯 Học toàn bộ {allItems.length} từ vựng
          </button>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '30px 16px' }}>
          {data.groups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '35px' }}>
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h2 style={{
                  fontSize: '18px', fontWeight: 700, color: '#1e40af',
                  margin: 0, display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <span style={{ background: '#dbeafe', padding: '4px 10px', borderRadius: '20px', fontSize: '14px' }}>
                    {group.items.length} từ
                  </span>
                  {group.name}
                </h2>
                <button
                  onClick={() => setStudyItems([...group.items].sort(() => Math.random() - 0.5))}
                  style={{
                    background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px',
                    padding: '7px 14px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  📖 Học nhóm này
                </button>
              </div>

              {/* Vocab table */}
              <div style={{
                background: 'white', borderRadius: '14px', overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
              }}>
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr',
                      padding: '12px 18px', borderBottom: ii < group.items.length - 1 ? '1px solid #f1f5f9' : 'none',
                      alignItems: 'center', gap: '12px',
                      background: ii % 2 === 0 ? '#fff' : '#fafbff',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#eff6ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = ii % 2 === 0 ? '#fff' : '#fafbff')}
                  >
                    <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '13px', textAlign: 'center' }}>
                      {ii + 1}
                    </span>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', fontFamily: '"Noto Sans JP", serif' }}>
                      {item.ja}
                    </span>
                    <span style={{ fontSize: '14px', color: '#475569', fontFamily: '"Noto Sans JP", serif' }}>
                      {item.kana}
                    </span>
                    <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.4 }}>
                      {item.vi}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer CTA */}
          <div style={{
            background: 'white', borderRadius: '16px', padding: '30px', textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '16px' }}>
              Đã xem xong danh sách? Luyện tập bằng thẻ lật để ghi nhớ tốt hơn nhé!
            </p>
            <button
              onClick={() => setStudyItems([...allItems].sort(() => Math.random() - 0.5))}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white',
                border: 'none', borderRadius: '12px', padding: '14px 32px',
                fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(37,99,235,0.3)'
              }}
            >
              🚀 Bắt đầu học ngay ({allItems.length} từ)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
