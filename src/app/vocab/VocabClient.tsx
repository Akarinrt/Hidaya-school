'use client';
import { useState } from 'react';
import { VOCAB_DATA } from '../../data/vocab';

// =====================
// FLASHCARD MODAL
// =====================
type VocabItem = {
  ja: string;
  kana: string;
  vi: string;
};

function FlashcardModal({ items, onClose }: { items: VocabItem[]; onClose: () => void }) {
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
  const [studyItems, setStudyItems] = useState<null | VocabItem[]>(null);

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
      <style>{`
        @media (max-width: 600px) {
          .vocab-row {
            grid-template-columns: 35px 1fr !important;
            grid-template-rows: auto auto auto !important;
            gap: 4px 8px !important;
            padding: 10px 14px !important;
          }
          .vocab-index {
            grid-row: 1 / span 3 !important;
            align-self: start !important;
            margin-top: 4px !important;
          }
          .vocab-ja {
            grid-column: 2 !important;
            font-size: 18px !important;
          }
          .vocab-kana {
            grid-column: 2 !important;
            color: #64748b !important;
            font-size: 13px !important;
          }
          .vocab-vi {
            grid-column: 2 !important;
            font-size: 14px !important;
            margin-top: 4px !important;
            border-top: 1px dashed #f1f5f9;
            padding-top: 4px;
          }
        }
      `}</style>
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
                    className="vocab-row"
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
                    <span className="vocab-index" style={{ color: '#94a3b8', fontWeight: 600, fontSize: '13px', textAlign: 'center' }}>
                      {ii + 1}
                    </span>
                    <span className="vocab-ja" style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', fontFamily: '"Noto Sans JP", serif' }}>
                      {item.ja}
                    </span>
                    <span className="vocab-kana" style={{ fontSize: '14px', color: '#475569', fontFamily: '"Noto Sans JP", serif' }}>
                      {item.kana}
                    </span>
                    <span className="vocab-vi" style={{ fontSize: '14px', color: '#374151', lineHeight: 1.4 }}>
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
