'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage26() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 26';
  }, []);

  return (
    <div style={{ fontFamily: '"Times New Roman", serif', color: '#000', background: '#fff', padding: '10px', maxWidth: '850px', margin: '0 auto', fontSize: '13pt', lineHeight: 1.6 }}>
      {/* CSS for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          table { page-break-inside: avoid; }
        }
        @page { margin: 1.5cm; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; vertical-align: middle; }
        th { background-color: #f5f5f5; font-weight: bold; font-size: 11pt; }
        h1, h2, h3 { color: #000; margin-top: 25px; margin-bottom: 10px; }
        h1 { font-size: 26pt; font-weight: bold; text-align: center; }
        h2 { font-size: 18pt; border-bottom: 2px solid #000; padding-bottom: 5px; margin-top: 35px; }
        h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; color: #111; }
        ul, ol { margin-top: 5px; margin-bottom: 15px; padding-left: 25px; }
        li { margin-bottom: 6px; }
        rt {
          font-size: 0.55em;
          color: #333;
          user-select: none;
        }
        ruby {
          ruby-position: over;
          padding: 0 1px;
        }
        .note-box {
          border: 1px dashed #000;
          padding: 15px;
          margin: 15px 0;
          background-color: #fafafa;
          border-radius: 4px;
        }
        .example-list {
          list-style-type: none;
          padding-left: 10px;
        }
        .example-item {
          margin-bottom: 12px;
          padding-left: 15px;
          border-left: 3px solid #666;
        }
        .translation {
          font-style: italic;
          color: #444;
          font-size: 11.5pt;
          margin-top: 2px;
        }
      `}} />

      {/* Control buttons (hidden in print) */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '30px', padding: '25px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <p style={{fontFamily: 'sans-serif', margin: '0 0 12px 0', fontSize: '14px', color: '#475569', fontWeight: '500'}}>
          Màn hình này được thiết kế tối ưu cho việc in ấn học tập hoặc lưu trữ PDF (Khổ dọc A4).
        </p>
        <button 
          onClick={() => window.print()} 
          style={{ 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            padding: '12px 28px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
            transition: 'all 0.2s'
          }}
        >
          🖨️ In Tài liệu / Lưu thành file PDF
        </button>
      </div>

      <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '26pt', fontFamily: '"Times New Roman", serif' }}>
          <ruby>第<rt>だい</rt></ruby>26<ruby>課<rt>か</rt></ruby> - <ruby>学<rt>がく</rt></ruby><ruby>習<rt>しゅう</rt></ruby>テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Chủ đề: Thể Thông Thường + んです, Nhờ Vả Lịch Sự &amp; Xin Lời Khuyên</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Minna no Nihongo II</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        
        <h3>1. Cấu trúc giải thích, nhấn mạnh lý do: ~ んです (Plain form + んです)</h3>
        <p>
          <strong>Ý nghĩa:</strong> Dùng để nhấn mạnh, giải thích nguyên nhân, lý do của hành động, trạng thái hoặc thuyết minh một hoàn cảnh. Cấu trúc này mang sắc thái biểu cảm cao và được dùng vô cùng phổ biến trong hội thoại giao tiếp hàng ngày thay cho mẫu câu <code>~ます</code> đơn thuần.
        </p>
        <p><strong>Quy tắc kết hợp chi tiết:</strong></p>
        <ul>
          <li><strong>Động từ (V):</strong> Thể thông thường (Plain form) + <code>んです</code>. (VD: 行く ➔ 行くんです)</li>
          <li><strong>Tính từ đuôi -i:</strong> Thể thông thường (Plain form) + <code>んです</code>. (VD: 寒い ➔ 寒いんです)</li>
          <li><strong>Tính từ đuôi -na:</strong> Thể thông thường (bỏ だ) + <code>な</code> + <code>んです</code>. (VD: 暇だ ➔ 暇なんです)</li>
          <li><strong>Danh từ (N):</strong> Danh từ (bỏ だ) + <code>な</code> + <code>んです</code>. (VD: 雨だ ➔ 雨なんです)</li>
        </ul>

        <div className="note-box">
          <strong>💡 Các ngữ cảnh sử dụng tiêu biểu của 「んです」:</strong><br />
          1. <strong>Trả lời lý do:</strong> Dùng để trả lời cho câu hỏi <code>どうして ~んですか</code> (Tại sao?).<br />
          2. <strong>Thuyết minh hoàn cảnh:</strong> Dùng để mở đầu câu chuyện trước khi đưa ra đề nghị, nhờ vả, giải thích.<br />
          3. <strong>Hỏi thăm chi tiết:</strong> Khi nhìn thấy một hiện tượng lạ hoặc biểu cảm của đối phương và muốn dò hỏi lý do sâu xa (VD: <code>どうしたんですか</code> - Có chuyện gì xảy ra với anh thế?).
        </div>

        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>「どうして<ruby>遅<rt>おく</rt></ruby>れたんですか。」「バスが<ruby>来<rt>こ</rt></ruby>なかったんです。」</div>
            <div className="translation">"Tại sao em lại đi muộn thế?" - "Tại vì xe buýt đã không tới ạ." (Giải thích nguyên nhân khách quan).</div>
          </li>
          <li className="example-item">
            <div>「どうしたんですか。」「ちょっと<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いんです。」</div>
            <div className="translation">"Mặt anh trông làm sao thế?" - "Tại vì tôi hơi đau đầu một chút." (Giải thích biểu cảm mệt mỏi).</div>
          </li>
          <li className="example-item">
            <div><ruby>渡辺<rt>わたなべ</rt></ruby>さんは時々<ruby>大阪<rt>おおさか</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>を使いますね。<ruby>大阪<rt>おおさか</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでいたんですか。</div>
            <div className="translation">Anh Watanabe thỉnh thoảng dùng tiếng vùng Osaka nhỉ. Có phải anh đã từng sống ở Osaka không? (Muốn làm rõ phỏng đoán).</div>
          </li>
        </ul>

        <div className="page-break" />

        <h3>2. Yêu cầu nhờ vả lịch sự cao: ~ ていただけませんか</h3>
        <p>
          <strong>Ý nghĩa:</strong> Đề nghị, nhờ vả người khác làm giúp mình một việc gì đó một cách lịch sự, kính trọng và nhẹ nhàng. Mẫu câu này có độ lịch sự cao hơn nhiều so với <code>~てください</code> và <code>~てくださいませんか</code>.
        </p>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div><ruby>日本語<rt>にほんご</rt></ruby>で<ruby>手紙<rt>てがみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>いたんですが、ちょっと<ruby>見<rt>み</rt></ruby>ていただけませんか。</div>
            <div className="translation">Tôi đã viết một bức thư bằng tiếng Nhật, anh/chị làm ơn xem qua giúp tôi một chút được không?</div>
          </li>
          <li className="example-item">
            <div>とてもいい<ruby>カメラ<rt>かめら</rt></ruby>ですね。どこで<ruby>買<rt>か</rt></ruby>ったか<ruby>教<rt>おし</rt></ruby>えていただけませんか。</div>
            <div className="translation">Chiếc máy ảnh đẹp quá nhỉ. Anh/chị có thể vui lòng chỉ giúp tôi đã mua ở đâu được không?</div>
          </li>
          <li className="example-item">
            <div>すみませんが、もう<ruby>一度<rt>いちど</rt></ruby><ruby>説明<rt>せつめい</rt></ruby>していただけませんか。</div>
            <div className="translation">Xin lỗi, anh/chị có thể giải thích lại một lần nữa giúp tôi được không ạ?</div>
          </li>
        </ul>

        <h3>3. Hỏi xin lời khuyên, hướng giải quyết: ~ んですが、~ たらいいですか</h3>
        <p>
          <strong>Ý nghĩa:</strong> Người nói nêu ra một tình huống thực tế khó khăn mình đang đối mặt (đi với <code>んですが</code> làm lời dẫn), sau đó đặt câu hỏi xin ý kiến hoặc lời khuyên từ người nghe (Nên làm thế nào thì tốt?).
        </p>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>パスポートをなくしたんですが、どうしたらいいですか。</div>
            <div className="translation">Tôi bị mất hộ chiếu rồi, giờ tôi nên làm thế nào thì tốt hả anh/chị?</div>
          </li>
          <li className="example-item">
            <div><ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>したいんですが、どの<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>ったらいいですか。</div>
            <div className="translation">Tôi muốn tự học tiếng Nhật, tôi nên mua cuốn sách nào thì tốt nhất?</div>
          </li>
          <li className="example-item">
            <div><ruby>歌舞伎<rt>かぶき</rt></ruby>を<ruby>見<rt>み</rt></ruby>たいんですが、どこで<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>ったらいいですか。</div>
            <div className="translation">Tôi muốn đi xem kịch Kabuki, tôi nên mua vé ở đâu thì tốt?</div>
          </li>
        </ul>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 26)</h2>
        <p style={{margin: '5px 0 15px 0', fontSize: '11pt', color: '#444'}}>
          Học viên cần ghi nhớ âm Hán Việt, cách đọc âm On/Kun và các câu ví dụ minh họa của từng Hán tự dưới đây:
        </p>
        <table>
          <thead>
            <tr>
              <th style={{ width: '12%', textAlign: 'center' }}>Hán tự</th>
              <th style={{ width: '13%', textAlign: 'center' }}>Hán Việt</th>
              <th style={{ width: '25%' }}>Onyomi / Kunyomi</th>
              <th style={{ width: '50%' }}>Từ vựng tiêu biểu &amp; Câu ví dụ minh họa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>悪</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ÁC</td>
              <td>アク<br />わる(い)</td>
              <td>
                <strong><ruby>悪<rt>わる</rt></ruby>い (Xấu / Tồi)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: このごろ、<ruby>体<rt>からだ</rt></ruby>の<ruby>調子<rt>ちょうし</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>いです。<br />
                  (Dạo gần đây, tình trạng sức khỏe của tôi không được tốt.)
                </div>
                <strong><ruby>悪口<rt>わるぐち</rt></ruby> (Nói xấu)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>人<rt>ひと</rt></ruby>の<ruby>悪口<rt>わるぐち</rt></ruby>を<ruby>言<rt>い</rt></ruby>ってはいけません。<br />
                  (Không được đi nói xấu người khác.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>急</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CẤP</td>
              <td>キュウ<br />いそ(ぐ)</td>
              <td>
                <strong><ruby>急<rt>いそ</rt></ruby>ぐ (Vội vã / Khẩn trương)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>時間<rt>じかん</rt></ruby>がありませんから、<ruby>急<rt>いそ</rt></ruby>ぎましょう。<br />
                  (Vì không còn nhiều thời gian nữa, chúng ta hãy khẩn trương lên nào.)
                </div>
                <strong><ruby>急行<rt>きゅうこう</rt></ruby> (Tàu tốc hành)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>急行<rt>きゅうこう</rt></ruby>に<ruby>乗<rt>の</rt></ruby>れば30<ruby>分<rt>ぷん</rt></ruby>で<ruby>着<rt>つ</rt></ruby>きます。<br />
                  (Nếu đi bằng tàu tốc hành thì chỉ 30 phút là đến nơi.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>去</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KHỨ</td>
              <td>キョ、コ<br />さ(る)</td>
              <td>
                <strong><ruby>去年<rt>きょねん</rt></ruby> (Năm ngoái)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>去年<rt>きょねん</rt></ruby>ベトナムから日本へ<ruby>来<rt>き</rt></ruby>ました。<br />
                  (Tôi đã từ Việt Nam sang Nhật Bản vào năm ngoái.)
                </div>
                <strong><ruby>過去<rt>かこ</rt></ruby> (Quá khứ)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>過去<rt>かこ</rt></ruby>のことは<ruby>忘<rt>わす</rt></ruby>れて、<ruby>将来<rt>しょうらい</rt></ruby>を<ruby>考<rt>かんが</rt></ruby>えましょう。<br />
                  (Hãy quên chuyện quá khứ đi để nghĩ về tương lai.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>紙</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CHỈ</td>
              <td>シ<br />かみ</td>
              <td>
                <strong><ruby>紙<rt>かみ</rt></ruby> (Giấy)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: すみませんが、コピーの<ruby>紙<rt>かみ</rt></ruby>をください。<br />
                  (Xin lỗi, hãy cho tôi xin ít giấy sao chụp photo.)
                </div>
                <strong><ruby>手紙<rt>てがみ</rt></ruby> (Thư tay)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>国<rt>くに</rt></ruby>の<ruby>両親<rt>りょうしん</rt></ruby>に<ruby>手紙<rt>てがみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>きました。<br />
                  (Tôi đã viết thư tay gửi cho bố mẹ ở quê nhà.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>首</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THỦ</td>
              <td>シュ<br />くび</td>
              <td>
                <strong><ruby>首<rt>くび</rt></ruby> (Cổ)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>寒<rt>さむ</rt></ruby>いですから、<ruby>首<rt>くび</rt></ruby>にマフラーを<ruby>巻<rt>ま</rt></ruby>きます。<br />
                  (Vì trời lạnh nên tôi quàng khăn vào cổ.)
                </div>
                <strong><ruby>首都<rt>しゅと</rt></ruby> (Thủ đô)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: ベトナムの<ruby>首都<rt>しゅと</rt></ruby>はハノイです。<br />
                  (Thủ đô của Việt Nam là Hà Nội.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>県</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HUYỆN</td>
              <td>ケン<br />—</td>
              <td>
                <strong><ruby>県<rt>けん</rt></ruby> (Tỉnh - Đơn vị hành chính Nhật Bản)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 日本には43の<ruby>県<rt>けん</rt></ruby>があります。<br />
                  (Nhật Bản có tất cả 43 tỉnh.)
                </div>
                <strong><ruby>県知事<rt>けんちじ</rt></ruby> (Tỉnh trưởng)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>彼<rt>かれ</rt></ruby>はあの<ruby>県<rt>けん</rt></ruby>の<ruby>県知事<rt>けんちじ</rt></ruby>です。<br />
                  (Anh ấy là tỉnh trưởng của tỉnh đó.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>都</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐÔ</td>
              <td>ト、ツ<br />みやこ</td>
              <td>
                <strong><ruby>都市<rt>とし</rt></ruby> (Đô thị / Thành phố)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 東京は世界で最も大きい<ruby>都市<rt>とし</rt></ruby>の一つです。<br />
                  (Tokyo là một trong những đô thị lớn nhất thế giới.)
                </div>
                <strong><ruby>京都<rt>きょうと</rt></ruby> (Cố đô Kyoto)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>京都<rt>きょうと</rt></ruby>には古いお<ruby>寺<rt>てら</rt></ruby>がたくさんあります。<br />
                  (Cố đô Kyoto có rất nhiều ngôi chùa cổ kính.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>速</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỐC</td>
              <td>ソク<br />はや(い)</td>
              <td>
                <strong><ruby>速<rt>はや</rt></ruby>い (Nhanh - Tốc độ)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: あの<ruby>人<rt>ひと</rt></ruby>は<ruby>走<rt>はし</rt></ruby>るのがとても<ruby>速<rt>はや</rt></ruby>いです。<br />
                  (Người kia chạy bộ cực kỳ nhanh.)
                </div>
                <strong><ruby>速度<rt>そくど</rt></ruby> (Tốc độ)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: ここからは<ruby>車<rt>くるま</rt></ruby>の<ruby>速度<rt>そくど</rt></ruby>を落としてください。<br />
                  (Từ chỗ này xin hãy giảm tốc độ của xe ô tô lại.)
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <footer style={{ marginTop: '40px', borderTop: '1px solid #000', paddingTop: '15px', fontSize: '10pt', textAlign: 'center', color: '#444' }}>
        <p>© Tài liệu giảng dạy Minna no Nihongo II - Lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
