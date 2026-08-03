'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage29() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 29';
  }, []);

  return (
    <div className="print-container">
      <style dangerouslySetInnerHTML={{__html: `
        .print-container {
          font-family: "Times New Roman", Times, serif;
          color: #000;
          background: #fff;
          padding: 20px;
          max-width: 850px;
          margin: 0 auto;
          font-size: 13pt;
          line-height: 1.6;
        }
        @media print {
          html, body {
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          .print-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 12pt;
          }
          h2, h3 { page-break-after: avoid !important; }
          tr { page-break-inside: avoid !important; }
          li { page-break-inside: avoid !important; }
        }
        @page { margin: 1.2cm 1.5cm; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 15px; }
        th, td { border: 1px solid #000; padding: 6px 10px; text-align: left; vertical-align: middle; }
        th { background-color: #f5f5f5; font-weight: bold; font-size: 11pt; }
        h1, h2, h3 { color: #000; margin-top: 15px; margin-bottom: 8px; }
        h1 { font-size: 22pt; font-weight: bold; text-align: center; }
        h2 { font-size: 16pt; border-bottom: 2px solid #000; padding-bottom: 3px; margin-top: 22px; }
        h3 { font-size: 12pt; font-weight: bold; margin-top: 15px; color: #111; }
        ul, ol { margin-top: 4px; margin-bottom: 10px; padding-left: 20px; }
        li { margin-bottom: 4px; }
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
          第29課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 29 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Trạng thái kết quả của tự động từ: N が V-te います (N đang... / trạng thái của N)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả trạng thái hiện tại của sự vật, là kết quả của một hành động xảy ra trong quá khứ và hiện còn lưu lại." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Chủ ngữ (sự vật) đi kèm trợ từ <strong>が</strong>, tự động từ chia ở thể <strong>て います</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Phân biệt với hành động đang diễn ra (V-te います của tha động từ). Ví dụ: <code>ドアが開いています</code> là cửa đang mở (trạng thái), còn <code>ドアを開けています</code> là tôi đang mở cửa (hành động)." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "窓が<strong>閉まっています</strong>。" }} />
            <div className="translation">Cửa sổ đang đóng (trạng thái cửa sổ đang đóng).</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "この自動販売機は<strong>壊れています</strong>。" }} />
            <div className="translation">Cái máy bán hàng tự động này đang bị hỏng.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "会議室の電気が<strong>消えています</strong>よ。" }} />
            <div className="translation">Điện của phòng họp đang tắt đấy nhé.</div>
          </li>
        </ul>

        <h3>2. Đưa trạng thái vật lên làm chủ đề: N は V-te います</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Khi muốn đưa sự vật cụ thể lên làm chủ đề của câu nói (người nghe và người nói đều đã biết vật đó), ta dùng trợ từ <strong>は</strong> thay cho <strong>gá</strong>." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Sự vật + <strong>は</strong> + Tự động từ thể <strong>て います</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Thường dùng trong các câu miêu tả khi có định ngữ chỉ thị như <code>この</code>, <code>その</code>, hoặc danh từ riêng." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "このコップは<strong>割れています</strong>。" }} />
            <div className="translation">Cái cốc này bị vỡ rồi.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ミラーさんの袋は<strong>破れています</strong>。" }} />
            <div className="translation">Cái túi của anh Miller bị rách rồi.</div>
          </li>
        </ul>

        <h3>3. Lỡ làm / Đã hoàn thành xong: V-te しまいました / V-te しまいます</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Mẫu câu này có hai sắc thái biểu cảm chính:<br />1. <strong>Đã hoàn thành xong</strong> toàn bộ hành động (thường đi với <code>mou</code> hoặc <code>全部</code>).<br />2. <strong>Lỡ làm gì đó</strong> (thể hiện sự tiếc nuối, hối hận hoặc bối rối trước một sự việc không mong muốn xảy ra)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ chia thể <strong>て</strong> + <strong>しまいました</strong> (quá khứ, đã lỡ) hoặc <strong>しまいます</strong> (tương lai, sẽ hoàn thành)." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Khi nói về sự tiếc nuối, sắc thái biểu cảm rất cao, thể hiện tâm trạng buồn bã hoặc hối lỗi." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "漢字の宿題はもう<strong>やってしまいました</strong>。" }} />
            <div className="translation">Tôi đã làm xong hết toàn bộ bài tập chữ Hán rồi. (Hoàn thành)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "パスポートを<strong>なくしてしまいました</strong>。" }} />
            <div className="translation">Tôi lỡ làm mất hộ chiếu mất rồi. (Tiếc nuối)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "電車にお土産を<strong>忘れてしまいました</strong>。" }} />
            <div className="translation">Tôi lỡ bỏ quên quà lưu niệm trên tàu mất rồi.</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 29)</h2>
        <p style={{margin: '5px 0 15px 0', fontSize: '11pt', color: '#444'}}>Học viên cần ghi nhớ âm Hán Việt, cách đọc âm On/Kun và các câu ví dụ minh họa của từng Hán tự dưới đây:</p>
        <table>
          <thead>
            <tr>
              <th style={{width: '12%', textAlign: 'center'}}>Hán tự</th>
              <th style={{width: '13%', textAlign: 'center'}}>Hán Việt</th>
              <th style={{width: '25%'}}>Onyomi / Kunyomi</th>
              <th style={{width: '50%'}}>Từ vựng tiêu biểu &amp; Câu ví dụ minh họa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>地</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐỊA</td>
              <td>チ, ジ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "地図 (Bản đồ)<br />地震 (Động đất)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>走</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TẨU</td>
              <td>ソウ / はし(る)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "走る (Chạy)<br />ごchơisou (Chiêu đãi, yến tiệc)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>集</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TẬP</td>
              <td>シュウ / あつ(まる), あつ(める)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "集める (Thu thập, sưu tầm)<br />集まり (Cuộc tụ họp)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>研</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>NGHIÊN</td>
              <td>ケン</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "研究 (Nghiên cứu)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>究</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CỨU</td>
              <td>CỨU / キュウ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "研究 (Nghiên cứu)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>曜</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>DIỆU</td>
              <td>ヨウ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "曜日 (Ngày trong tuần)<br />水曜日 (Thứ tư)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>重</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TRỌNG</td>
              <td>ジュウ, チョウ / おも(い)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "重い (Nặng)<br />体重 (Thể trọng, cân nặng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>池</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TRÌ</td>
              <td>チ / いけ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "池 (Cái ao)<br />電池 (Pin)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>形</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HÌNH</td>
              <td>ケイ, ギョウ / かたち</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "形 (Hình dáng)<br />人形 (Búp bê)<br />て形 (Thể て)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 29 (語彙リスト)</h2>
        <p style={{margin: '5px 0 15px 0', fontSize: '11pt', color: '#444'}}>Bảng từ vựng tổng hợp đầy đủ chữ Kanji, phiên âm Furigana và nghĩa tiếng Việt chi tiết:</p>

        <h3>1. Động từ (動詞 - Doushi)</h3>
        <table>
          <thead>
            <tr>
              <th style={{width: '10%', textAlign: 'center'}}>STT</th>
              <th style={{width: '45%'}}>Từ vựng (Kanji / Hiragana)</th>
              <th style={{width: '45%'}}>Ý nghĩa Tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>1</td>
              <td>閉きます</td>
              <td>mở [cửa ~] (tự động từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>閉まります</td>
              <td>đóng [cửa ~] (tự động từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td><ruby>電気<rt>でんき</rt></ruby>が〜</td>
              <td>sáng, bật [điện ~] / đính, kèm theo</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td><ruby>消<rt>き</rt></ruby>えます</td>
              <td>tắt [điện ~] (tự động từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td><ruby>込<rt>こ</rt></ruby>みます</td>
              <td>đông, tắc [đường ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td><ruby>道<rt>みち</rt></ruby>が〜</td>
              <td>vắng, thoáng [đường ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td><ruby>壊<rt>こわ</rt></ruby>れます</td>
              <td>hỏng [ghế ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td><ruby>割<rt>わ</rt></ruby>れます</td>
              <td>vỡ [cốc ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td><ruby>折<rt>お</rt></ruby>れます</td>
              <td>gãy [cây ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td><ruby>破<rt>やぶ</rt></ruby>れます</td>
              <td>rách [giấy ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td><ruby>汚<rt>よご</rt></ruby>れます</td>
              <td>bẩn [quần áo ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td><ruby>付<rt>つ</rt></ruby>きます</td>
              <td>đính, gắn, có [túi ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td><ruby>外<rt>はず</rt></ruby>れます</td>
              <td>tuột, bung [cúc áo ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td><ruby>止<rt>と</rt></ruby>まります</td>
              <td>dừng [thang máy ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>まちがえます</td>
              <td>nhầm lẫn, sai</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td><ruby>落<rt>お</rt></ruby>とします</td>
              <td>đánh rơi, làm mất</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td><ruby>掛<rt>か</rt></ruby>かります</td>
              <td>khóa [cửa ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td><ruby>指<rt>さ</rt></ruby>します Ⅰ</td>
              <td>point</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td><ruby>倒<rt>たお</rt></ruby>れます Ⅱ</td>
              <td>fall down</td>
            </tr>
          </tbody>
        </table>

        <h3>2. Tính từ (形容詞 - Keiyoushi)</h3>
        <table>
          <thead>
            <tr>
              <th style={{width: '10%', textAlign: 'center'}}>STT</th>
              <th style={{width: '45%'}}>Từ vựng (Kanji / Hiragana)</th>
              <th style={{width: '45%'}}>Ý nghĩa Tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>1</td>
              <td><ruby>網棚<rt>あみだな</rt></ruby></td>
              <td>giá để hành lý</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Danh từ (名詞 - Meishi)</h3>
        <table>
          <thead>
            <tr>
              <th style={{width: '10%', textAlign: 'center'}}>STT</th>
              <th style={{width: '45%'}}>Từ vựng (Kanji / Hiragana)</th>
              <th style={{width: '45%'}}>Ý nghĩa Tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>1</td>
              <td><ruby>お皿<rt>さら</rt></ruby></td>
              <td>cái đĩa</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>おちゃわん</td>
              <td>cái bát (chén) cơm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>コップ</td>
              <td>cái cốc (ly)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>Ý nghĩa (Tiếng Anh)</td>
              <td>Ý nghĩa (Tiếng Anh)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>glass (material)</td>
              <td>thủy tinh, kính</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>bag</td>
              <td>bag</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>wallet, purse</td>
              <td>wallet, purse</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>branch, twig</td>
              <td>branch, twig</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>station employee</td>
              <td>station employee</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>this neighborhood, around here</td>
              <td>this neighborhood, around here</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>the place around 〜</td>
              <td>the place around 〜</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>about this size</td>
              <td>khoảng ngần này, cỡ này</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>After you./Go ahead, please.</td>
              <td>After you./Go ahead, please.</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>Thank goodness! (used to express a feeling of relief)</td>
              <td>Thank goodness! (used to express a feeling of relief)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td><ruby>今<rt>いま</rt></ruby>の <ruby>電車<rt>でんしゃ</rt></ruby></td>
              <td>chuyến tàu vừa rồi</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td><ruby>忘<rt>わす</rt></ruby>れ<ruby>物<rt>もの</rt></ruby></td>
              <td>đồ bỏ quên</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>〜<ruby>側<rt>がわ</rt></ruby></td>
              <td>〜 side</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>ポケット</td>
              <td>túi (áo, quần)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td><ruby>覚<rt>おぼ</rt></ruby>えていません。</td>
              <td>I don't remember.</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td><ruby>確<rt>たし</rt></ruby>か</td>
              <td>chắc là, hình như</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>※<ruby>四ツ谷<rt>よつや</rt></ruby></td>
              <td>name of a station in Tokyo</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td><ruby>地震<rt>じしん</rt></ruby></td>
              <td>động chất / động đất</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td><ruby>壁<rt>かべ</rt></ruby></td>
              <td>bức tường</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td><ruby>針<rt>はり</rt></ruby></td>
              <td>kim (đồng hồ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td><ruby>駅前<rt>えきまえ</rt></ruby></td>
              <td>khu vực trước ga</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td><ruby>西<rt>にし</rt></ruby></td>
              <td>phía tây</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td><ruby>方<rt>ほう</rt></ruby></td>
              <td>hướng, phương</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>※<ruby>三宮<rt>さんのみや</rt></ruby></td>
              <td>name of a place in Kobe</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer style={{marginTop: '40px', borderTop: '1px solid #000', paddingTop: '15px', fontSize: '10pt', textAlign: 'center', color: '#444'}}>
        <p>© Tài liệu giảng dạy Minna no Nihongo II - Lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
