'use client';
import { useState } from 'react';

export default function FlashcardClient({ decks }: { decks: any[] }) {
  const [activeDeck, setActiveDeck] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!activeDeck) {
    return (
      <div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>🃏 Luyện từ vựng (Flashcards)</h2>
        {decks.length === 0 ? (
          <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Giáo viên chưa tải lên bộ thẻ từ vựng nào.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {decks.map(deck => (
              <div key={deck.id} className="card hover-scale" style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => { setActiveDeck(deck); setCurrentIndex(0); setIsFlipped(false); }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗂️</div>
                <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>{deck.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{deck.cards.length} thẻ bài</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentCard = activeDeck.cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < activeDeck.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
    }
  };

  return (
    <div>
      <button onClick={() => setActiveDeck(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '20px', fontSize: '16px' }}>
        ← Quay lại danh sách
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-main)', margin: 0 }}>{activeDeck.title}</h2>
        <div style={{ color: 'var(--text-muted)' }}>Thẻ {currentIndex + 1} / {activeDeck.cards.length}</div>
      </div>

      <div style={{ perspective: '1000px', width: '100%', maxWidth: '500px', margin: '0 auto', height: '300px' }} onClick={() => setIsFlipped(!isFlipped)}>
        <div style={{
          width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', cursor: 'pointer'
        }}>
          {/* Front */}
          <div className="card" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            {currentCard?.front}
          </div>
          {/* Back */}
          <div className="card" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'var(--success)',
            background: 'var(--surface-hover)', border: '2px solid var(--success)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            {currentCard?.back}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--surface-hover)', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}>Trước</button>
        <button onClick={handleNext} disabled={currentIndex === activeDeck.cards.length - 1} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: currentIndex === activeDeck.cards.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>Tiếp theo</button>
      </div>
    </div>
  );
}
