'use client';
import { useState, useEffect } from 'react';

interface Card {
  id: string;
  front: string;
  back: string;
}

interface Deck {
  id: string;
  title: string;
  cards: Card[];
}

export default function FlashcardClient({ decks }: { decks: Deck[] }) {
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [mode, setMode] = useState<'study' | 'test'>('study');
  
  // Study state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Test state
  const [testQuestions, setTestQuestions] = useState<{ card: Card; options: string[] }[]>([]);
  const [testIndex, setTestIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [savedScores, setSavedScores] = useState<any[]>([]);
  const [savingScore, setSavingScore] = useState(false);

  // Load scores when active deck changes or test finishes
  useEffect(() => {
    if (activeDeck) {
      fetchScores(activeDeck.id);
    }
  }, [activeDeck, testFinished]);

  const fetchScores = async (deckId: string) => {
    try {
      const res = await fetch(`/api/student/vocab-score?category=deck_${deckId}`);
      const data = await res.json();
      if (res.ok && data.scores) {
        setSavedScores(data.scores);
      }
    } catch (e) {
      console.error('Failed to fetch scores', e);
    }
  };

  if (!activeDeck) {
    return (
      <div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>🃏 Luyện từ vựng (Flashcards)</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Chọn một bộ thẻ từ vựng bên dưới để bắt đầu học và thực hiện bài kiểm tra tính điểm.
        </p>
        {decks.length === 0 ? (
          <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Giáo viên chưa tải lên bộ thẻ từ vựng nào.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {decks.map(deck => (
              <div 
                key={deck.id} 
                className="card hover-scale" 
                style={{ padding: '25px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '16px' }} 
                onClick={() => { 
                  setActiveDeck(deck); 
                  setCurrentIndex(0); 
                  setIsFlipped(false);
                  setMode('study');
                  setTestFinished(false);
                }}
              >
                <div style={{ fontSize: '45px', marginBottom: '15px' }}>📖</div>
                <h3 style={{ margin: '0 0 10px 0', textAlign: 'center', color: 'var(--text-main)' }}>{deck.title}</h3>
                <span style={{ fontSize: '13px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                  {deck.cards.length} thẻ bài
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Generate test questions
  const startTest = () => {
    if (!activeDeck || activeDeck.cards.length < 4) {
      alert('Cần ít nhất 4 từ vựng trong bộ thẻ để thực hiện bài test trắc nghiệm.');
      return;
    }

    // Pick 10 random cards (or all if less than 10)
    const shuffledCards = [...activeDeck.cards].sort(() => 0.5 - Math.random());
    const testSize = Math.min(10, shuffledCards.length);
    const selectedCards = shuffledCards.slice(0, testSize);

    // Create options for each card
    const questions = selectedCards.map(card => {
      // Correct option is card.back
      const wrongOptions = activeDeck.cards
        .filter(c => c.id !== card.id)
        .map(c => c.back)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [card.back, ...wrongOptions].sort(() => 0.5 - Math.random());
      return { card, options };
    });

    setTestQuestions(questions);
    setTestIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTestFinished(false);
    setMode('test');
  };

  const handleSelectOption = (opt: string) => {
    if (selectedOption !== null) return; // Answered already
    setSelectedOption(opt);
    
    const isCorrect = opt === testQuestions[testIndex].card.back;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Go to next question after delay
    setTimeout(() => {
      if (testIndex < testQuestions.length - 1) {
        setTestIndex(testIndex + 1);
        setSelectedOption(null);
      } else {
        finishTest();
      }
    }, 1500);
  };

  const finishTest = async () => {
    setTestFinished(true);
    setSavingScore(true);
    try {
      await fetch('/api/student/vocab-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: `deck_${activeDeck.id}`,
          score: score + (selectedOption === testQuestions[testIndex]?.card.back ? 1 : 0), // Include last question score
          total: testQuestions.length
        })
      });
    } catch (e) {
      console.error('Failed to save score', e);
    } finally {
      setSavingScore(false);
    }
  };

  const currentCard = activeDeck.cards[currentIndex];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button 
        onClick={() => setActiveDeck(null)} 
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '20px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}
      >
        ← Quay lại danh sách bộ thẻ
      </button>

      <div className="card" style={{ padding: '25px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '35px' }}>
        <h2 style={{ color: 'var(--text-main)', margin: '0 0 15px 0', fontSize: '1.5rem', textAlign: 'center' }}>{activeDeck.title}</h2>
        
        {/* Toggle Modes */}
        <div style={{ display: 'flex', background: 'var(--surface-hover)', borderRadius: '10px', padding: '4px', marginBottom: '25px' }}>
          <button 
            onClick={() => setMode('study')}
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
              background: mode === 'study' ? 'white' : 'transparent',
              color: mode === 'study' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: mode === 'study' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            📖 Thẻ học
          </button>
          <button 
            onClick={startTest}
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
              background: mode === 'test' ? 'white' : 'transparent',
              color: mode === 'test' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: mode === 'test' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            📋 Kiểm tra thẻ
          </button>
        </div>

        {/* STUDY MODE */}
        {mode === 'study' && (
          <div>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '15px', fontWeight: 'bold' }}>
              Thẻ {currentIndex + 1} / {activeDeck.cards.length}
            </div>

            <div 
              style={{ perspective: '1000px', width: '100%', height: '280px', margin: '0 auto', cursor: 'pointer' }} 
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div style={{
                width: '100%', height: '100%', position: 'relative', transition: 'transform 0.4s', transformStyle: 'preserve-3d', 
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}>
                {/* Front */}
                <div className="card" style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', border: '2px solid #cce4ff',
                  boxShadow: '0 8px 25px rgba(0, 82, 204, 0.08)', borderRadius: '16px', background: '#f8fbff',
                  padding: '20px', boxSizing: 'border-box'
                }}>
                  <div style={{ textAlign: 'center' }}>{currentCard?.front}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '20px', fontWeight: 'normal' }}>
                    💡 Bấm vào thẻ để xem nghĩa
                  </div>
                </div>
                {/* Back */}
                <div className="card" style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '22px', fontWeight: 'bold', color: 'var(--success)', border: '2px solid #d4edda',
                  boxShadow: '0 8px 25px rgba(40, 167, 69, 0.08)', borderRadius: '16px', background: '#f8fff9',
                  padding: '20px', boxSizing: 'border-box'
                }}>
                  <div style={{ textAlign: 'center' }}>{currentCard?.back}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '20px', fontWeight: 'normal' }}>
                    🇯🇵 {currentCard?.front}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
              <button 
                onClick={() => { setIsFlipped(false); setCurrentIndex(currentIndex - 1); }} 
                disabled={currentIndex === 0} 
                style={{ padding: '12px 25px', borderRadius: '8px', border: 'none', background: 'var(--surface-hover)', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                Trước
              </button>
              <button 
                onClick={() => { setIsFlipped(false); setCurrentIndex(currentIndex + 1); }} 
                disabled={currentIndex === activeDeck.cards.length - 1} 
                style={{ padding: '12px 25px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: currentIndex === activeDeck.cards.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        )}

        {/* TEST MODE */}
        {mode === 'test' && !testFinished && testQuestions.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '15px', fontWeight: 'bold' }}>
              <span>Câu hỏi {testIndex + 1} / {testQuestions.length}</span>
              <span style={{ color: 'var(--success)' }}>Điểm hiện tại: {score}</span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', marginBottom: '25px', overflow: 'hidden' }}>
              <div style={{ width: `${((testIndex + 1) / testQuestions.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
            </div>

            {/* Question Card */}
            <div className="card" style={{ padding: '30px', textAlign: 'center', background: '#f8fbff', border: '1px solid #cce4ff', borderRadius: '16px', marginBottom: '25px', fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {testQuestions[testIndex].card.front}
            </div>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {testQuestions[testIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === testQuestions[testIndex].card.back;
                
                let btnStyle: React.CSSProperties = {
                  width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid var(--border)',
                  background: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '16px', fontWeight: 'bold',
                  transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                };

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle.background = '#d4edda';
                    btnStyle.borderColor = '#c3e6cb';
                    btnStyle.color = '#155724';
                  } else if (isSelected) {
                    btnStyle.background = '#f8d7da';
                    btnStyle.borderColor = '#f5c6cb';
                    btnStyle.color = '#721c24';
                  } else {
                    btnStyle.opacity = 0.6;
                  }
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    disabled={selectedOption !== null}
                    style={btnStyle}
                  >
                    <span>{idx + 1}. {opt}</span>
                    {selectedOption !== null && isCorrect && <span style={{ color: 'var(--success)' }}>✓ Đúng</span>}
                    {selectedOption !== null && isSelected && !isCorrect && <span style={{ color: 'var(--danger)' }}>✗ Sai</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TEST FINISHED SCREEN */}
        {mode === 'test' && testFinished && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>🏆</div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '0 0 10px 0' }}>Kiểm tra hoàn tất!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px' }}>
              Bạn đạt được <strong style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{score} / {testQuestions.length}</strong> điểm.
            </p>

            <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '8px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', margin: '0 auto 30px auto' }}>
              {Math.round((score / testQuestions.length) * 100)}%
            </div>

            <button 
              onClick={startTest}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              🔄 Làm lại bài test
            </button>
          </div>
        )}
      </div>

      {/* High Scores History */}
      {savedScores.length > 0 && (
        <div className="card" style={{ padding: '25px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Lịch sử Điểm cao
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedScores.map((s, idx) => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 15px', background: 'var(--surface-hover)', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '14px' }}>
                <span style={{ fontWeight: 'bold' }}>Lần thử #{savedScores.length - idx}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{s.score} / {s.total} điểm</span>
                <span style={{ color: 'var(--text-muted)' }}>{new Date(s.playedAt).toLocaleDateString('vi-VN')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
