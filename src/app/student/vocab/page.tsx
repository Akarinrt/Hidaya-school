'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './vocab.module.css';

// Kanji + Vocabulary data from N4 lessons
const CATEGORIES = {
  'kanji_n4_bai26': {
    name: '🀄 Kanji Bài 26 (N4)',
    color: '#42a5f5',
    items: [
      { front: '若い', back: 'わかい (wakai)\nTrẻ tuổi', type: 'kanji' },
      { front: '年寄り', back: 'としより (toshiyori)\nNgười già', type: 'kanji' },
      { front: '病気', back: 'びょうき (byōki)\nBệnh tật', type: 'kanji' },
      { front: '元気', back: 'げんき (genki)\nKhỏe mạnh / Năng động', type: 'kanji' },
      { front: '運動', back: 'うんどう (undō)\nVận động / Thể dục', type: 'kanji' },
      { front: '練習', back: 'れんしゅう (renshū)\nLuyện tập', type: 'kanji' },
      { front: '着る', back: 'きる (kiru)\nMặc (áo)', type: 'kanji' },
      { front: '泳ぐ', back: 'およぐ (oyogu)\nBơi', type: 'kanji' },
    ]
  },
  'vocab_n4_bai27': {
    name: '📚 Từ vựng Bài 27 (N4)',
    color: '#ff9800',
    items: [
      { front: 'もし', back: 'Nếu (giả định)', type: 'vocab' },
      { front: '〜たら', back: 'Nếu... / Khi... (điều kiện)', type: 'grammar' },
      { front: '〜ば', back: 'Nếu... (điều kiện giả định)', type: 'grammar' },
      { front: '安全', back: 'あんぜん (anzen)\nAn toàn', type: 'kanji' },
      { front: '危険', back: 'きけん (kiken)\nNguy hiểm', type: 'kanji' },
      { front: '困る', back: 'こまる (komaru)\nGặp khó khăn', type: 'kanji' },
      { front: '遅れる', back: 'おくれる (okureru)\nBị trễ / Đến muộn', type: 'kanji' },
      { front: '間に合う', back: 'まにあう (maniau)\nKịp giờ', type: 'kanji' },
    ]
  },
  'kanji_n4_bai28': {
    name: '🀄 Kanji Bài 28 (N4)',
    color: '#ab47bc',
    items: [
      { front: '盗む', back: 'ぬすむ (nusumu)\nĂn trộm', type: 'kanji' },
      { front: '壊す', back: 'こわす (kowasu)\nPhá vỡ', type: 'kanji' },
      { front: '叱る', back: 'しかる (shikaru)\nMắng / La rầy', type: 'kanji' },
      { front: '褒める', back: 'ほめる (homeru)\nKhen ngợi', type: 'kanji' },
      { front: '選ぶ', back: 'えらぶ (erabu)\nLựa chọn', type: 'kanji' },
      { front: '集める', back: 'あつめる (atsumeru)\nThu thập / Tập hợp', type: 'kanji' },
      { front: '調べる', back: 'しらべる (shiraberu)\nKiểm tra / Tra cứu', type: 'kanji' },
      { front: '直す', back: 'なおす (naosu)\nSửa chữa', type: 'kanji' },
    ]
  },
  'vocab_n5_basic': {
    name: '📖 Từ vựng N5 Cơ bản',
    color: '#66bb6a',
    items: [
      { front: '食べる', back: 'たべる (taberu)\nĂn', type: 'kanji' },
      { front: '飲む', back: 'のむ (nomu)\nUống', type: 'kanji' },
      { front: '見る', back: 'みる (miru)\nNhìn / Xem', type: 'kanji' },
      { front: '聞く', back: 'きく (kiku)\nNghe / Hỏi', type: 'kanji' },
      { front: '話す', back: 'はなす (hanasu)\nNói chuyện', type: 'kanji' },
      { front: '書く', back: 'かく (kaku)\nViết', type: 'kanji' },
      { front: '読む', back: 'よむ (yomu)\nĐọc', type: 'kanji' },
      { front: '来る', back: 'くる (kuru)\nĐến / Đi đến', type: 'kanji' },
    ]
  }
};

type CategoryKey = keyof typeof CATEGORIES;
type Mode = 'menu' | 'flashcard' | 'quiz';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function VocabGamePage() {
  const [mode, setMode] = useState<Mode>('menu');
  const [category, setCategory] = useState<CategoryKey>('kanji_n4_bai26');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizItems, setQuizItems] = useState<typeof CATEGORIES[CategoryKey]['items']>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const cat = CATEGORIES[category];
  const items = cat.items;

  const generateOptions = useCallback((currentItems: typeof items, idx: number) => {
    const correct = currentItems[idx].back;
    const others = shuffle(
      Object.values(CATEGORIES).flatMap(c => c.items).filter(i => i.back !== correct).map(i => i.back)
    ).slice(0, 3);
    return shuffle([correct, ...others]);
  }, []);

  const startQuiz = () => {
    const shuffled = shuffle(items);
    setQuizItems(shuffled);
    setQuizIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setOptions(generateOptions(shuffled, 0));
    setMode('quiz');
  };

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === quizItems[quizIndex].back) setScore(s => s + 1);
    setTimeout(() => {
      const nextIdx = quizIndex + 1;
      if (nextIdx >= quizItems.length) {
        setFinished(true);
      } else {
        setQuizIndex(nextIdx);
        setOptions(generateOptions(quizItems, nextIdx));
        setSelected(null);
      }
    }, 1200);
  };

  const scorePercent = quizItems.length > 0 ? Math.round((score / quizItems.length) * 100) : 0;

  if (mode === 'flashcard') {
    const card = items[cardIndex];
    return (
      <div className={styles.container}>
        <button onClick={() => setMode('menu')} className={styles.back}>← Quay lại</button>
        <h2 className={styles.catTitle}>{cat.name} — Flashcard</h2>
        <p className={styles.progress}>{cardIndex + 1} / {items.length}</p>

        <div className={`${styles.card} ${flipped ? styles.flipped : ''}`} onClick={() => setFlipped(f => !f)}>
          <div className={styles.cardFront}>
            <div className={styles.cardChar}>{card.front}</div>
            <div className={styles.tapHint}>Bấm để xem nghĩa</div>
          </div>
          <div className={styles.cardBack}>
            <div className={styles.cardMeaning}>{card.back}</div>
          </div>
        </div>

        <div className={styles.navBtns}>
          <button onClick={() => { setCardIndex(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={cardIndex === 0} className={styles.navBtn}>← Trước</button>
          <button onClick={() => { setCardIndex(i => Math.min(items.length - 1, i + 1)); setFlipped(false); }} disabled={cardIndex === items.length - 1} className={styles.navBtn}>Tiếp →</button>
        </div>
        <button onClick={startQuiz} className={styles.quizBtn}>🎯 Làm quiz ngay!</button>
      </div>
    );
  }

  if (mode === 'quiz') {
    if (finished) {
      return (
        <div className={styles.container}>
          <div className={styles.result}>
            <div className={styles.resultEmoji}>{scorePercent >= 80 ? '🏆' : scorePercent >= 50 ? '👍' : '💪'}</div>
            <h2 className={styles.resultTitle}>Kết quả</h2>
            <div className={styles.resultScore}>{score}/{quizItems.length}</div>
            <div className={styles.resultPercent} style={{ color: scorePercent >= 80 ? '#66bb6a' : scorePercent >= 50 ? '#ff9800' : '#ef5350' }}>
              {scorePercent}%
            </div>
            <p className={styles.resultMsg}>
              {scorePercent >= 80 ? 'Xuất sắc! Bạn đã nắm vững bộ từ vựng này rồi!' : scorePercent >= 50 ? 'Không tệ! Hãy ôn lại thêm một lần nữa nhé.' : 'Cố lên! Xem lại flashcard và thử lại!'}
            </p>
            <div className={styles.resultActions}>
              <button onClick={startQuiz} className={styles.retryBtn}>🔄 Làm lại</button>
              <button onClick={() => setMode('menu')} className={styles.menuBtn}>← Về menu</button>
            </div>
          </div>
        </div>
      );
    }

    const current = quizItems[quizIndex];
    return (
      <div className={styles.container}>
        <button onClick={() => setMode('menu')} className={styles.back}>← Thoát</button>
        <div className={styles.quizHeader}>
          <div className={styles.quizProgress}>Câu {quizIndex + 1}/{quizItems.length}</div>
          <div className={styles.quizScore}>⭐ {score} điểm</div>
        </div>
        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${((quizIndex) / quizItems.length) * 100}%` }} /></div>
        <div className={styles.question}>{current.front}</div>
        <div className={styles.options}>
          {options.map(opt => {
            let cls = styles.option;
            if (selected) {
              if (opt === current.back) cls = `${styles.option} ${styles.correct}`;
              else if (opt === selected) cls = `${styles.option} ${styles.wrong}`;
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)} className={cls} disabled={!!selected}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Menu
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎮 Luyện tập Kanji & Từ vựng</h1>
      <p className={styles.subtitle}>Chọn bộ thẻ và phương thức học!</p>

      <div className={styles.catGrid}>
        {(Object.entries(CATEGORIES) as [CategoryKey, typeof CATEGORIES[CategoryKey]][]).map(([key, cat]) => (
          <div
            key={key}
            className={`${styles.catCard} ${category === key ? styles.selected : ''}`}
            style={{ borderColor: category === key ? cat.color : 'transparent' }}
            onClick={() => setCategory(key)}
          >
            <div className={styles.catName}>{cat.name}</div>
            <div className={styles.catCount}>{cat.items.length} thẻ</div>
          </div>
        ))}
      </div>

      <div className={styles.modeButtons}>
        <button onClick={() => { setCardIndex(0); setFlipped(false); setMode('flashcard'); }} className={styles.flashcardBtn}>
          🃏 Học Flashcard
          <span>Lật thẻ để xem nghĩa</span>
        </button>
        <button onClick={startQuiz} className={styles.quizStartBtn}>
          🎯 Làm Quiz trắc nghiệm
          <span>4 lựa chọn, tính điểm</span>
        </button>
      </div>
    </div>
  );
}
