'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage30() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 30';
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
          第30課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 30 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Trạng thái kết quả của hành động có mục đích: N が V-te あります</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả trạng thái hiện tại của sự vật phát sinh do có hành động có chủ ý của con người nhằm chuẩn bị trước." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Chủ ngữ (sự vật) đi kèm trợ từ <strong>が</strong>, tha động từ chia thể <strong>て あります</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br><strong>Phân biệt với V-te います (Bài 29):</strong><br />- <code>窓が開いています</code>: Cửa sổ mở (chỉ miêu tả trạng thái hiện tại khách quan, không quan tâm ai làm).<br />- <code>窓が開けてあります</code>: Cửa sổ được mở sẵn (nhấn mạnh có ai đó đã mở vì mục đích nào đó như cho thoáng khí)." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "机の上に本が<strong>置いてあります</strong>。" }} />
            <div className="translation">Quyển sách được đặt sẵn ở trên bàn (ai đó đã đặt sẵn ở đó).</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "カレンダーに予定が<strong>書いてあります</strong>。" }} />
            <div className="translation">Lịch trình được viết sẵn trên tờ lịch.</div>
          </li>
        </ul>

        <h3>2. Làm sẵn, chuẩn bị trước: V-te おきます (Làm sẵn trước...)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Dùng để diễn tả:<br />1. Thực hiện một hành động chuẩn bị trước cho một mục tiêu cụ thể ở tương lai.<br />2. Xử lý sau khi kết thúc một hành động (như dọn dẹp để trả về chỗ cũ).<br />3. Giữ nguyên trạng thái hiện tại (để mặc đấy)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ chia thể <strong>て</strong> + <strong>おきます</strong> (hiện tại/tương lai) / <strong>おきました</strong> (quá khứ)." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Trong hội thoại thường ngày, <code>～ておきます</code> hay được nói tắt thành <code>～ときます</code>." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "旅行の前に、ホテルを<strong>予約しておきます</strong>。" }} />
            <div className="translation">Trước khi đi du lịch, tôi sẽ đặt trước khách sạn. (Chuẩn bị)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ハサミを使ったら、元の所に<strong>戻しておいてください</strong>。" }} />
            <div className="translation">Dùng kéo xong thì hãy để lại chỗ cũ giúp tôi. (Dọn dẹp)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "寒いから、窓を閉めたままに<strong>しておきます</strong>。" }} />
            <div className="translation">Vì lạnh nên tôi cứ để cửa sổ đóng nguyên như vậy. (Giữ nguyên trạng thái)</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 30)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>横</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HOÀNH</td>
              <td>オウ / よこ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "横 (Bên cạnh, chiều ngang)<br />横断歩道 (Vạch sang đường)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>橋</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KIỀU</td>
              <td>キョウ / はし</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "橋 (Cây cầu)<br />歩道橋 (Cầu vượt đi bộ)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>決</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>QUYẾT</td>
              <td>ケツ / き(める), き(まる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "決める (Quyết định)<br />決して (Tuyệt đối không)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>相</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TƯƠNG / TƯỚNG</td>
              <td>ソウ, ショウ / あい</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "相談 (Bàn bạc, thảo luận)<br />首相 (Thủ tướng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>談</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐÀM</td>
              <td>ダン</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "相談 (Thảo luận)<br />会談 (Hội đàm)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>忘</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VONG</td>
              <td>ボウ / わす(れる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "忘れる (Quên)<br />忘れ物 (Đồ bỏ quên)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>置</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TRÍ</td>
              <td>チ / お(く)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "置く (Đặt, để)<br />位置 (Vị trí)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>授</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THỤ</td>
              <td>ジュ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "授業 (Giờ học, tiết học)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>苦</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KHỔ</td>
              <td>ク / くる(しい), にが(い)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "苦しい (Đau đớn, khổ cực)<br />にがい (Đắng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>労</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LAO</td>
              <td>ロウ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "労働 (Lao động)<br />ご苦労さま (Anh đã vất vả rồi)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>希</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HY</td>
              <td>キ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "希望 (Hy vọng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>望</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VỌNG</td>
              <td>ボウ / のぞ(む)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "希望 (Hy vọng)<br />失望 (Thất vọng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>復</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHỤC</td>
              <td>フک / フク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "復習 (Ôn tập)<br />回復 (Hồi phục)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>植</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THỰC</td>
              <td>ショク / う(える), う(わる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "植える (Trồng cây)<br />植物 (Thực vật)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>机</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KỶ</td>
              <td>つくえ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "机 (Cái bàn)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 30 (語彙リスト)</h2>
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
              <td>はります</td>
              <td>dán, dán lên</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td><ruby>掛<rt>か</rt></ruby>けます</td>
              <td>treo [lịch ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td><ruby>飾<rt>かざ</rt></ruby>ります</td>
              <td>trang trí, trang hoàng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td><ruby>並<rt>なら</rt></ruby>べます</td>
              <td>xếp, bày biện</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td><ruby>植<rt>う</rt></ruby>えます</td>
              <td>trồng [cây ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td><ruby>戻<rt>もど</rt></ruby>します</td>
              <td>đưa về, trả lại [chỗ cũ]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>まとめます</td>
              <td>thu dọn, gộp lại, tóm tắt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td><ruby>片<rt>かた</rt></ruby>づけます</td>
              <td>dọn dẹp, sắp xếp</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>しまいます</td>
              <td>cất đi, cất vào</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td><ruby>決<rt>き</rt></ruby>めます</td>
              <td>quyết định</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td><ruby>知<rt>し</rt></ruby>らせます</td>
              <td>inform</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td><ruby>相<rt>そう</rt></ruby>《談</td>
              <td>bàn bạc, thảo luận</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td><ruby>予<rt>よ</rt></ruby>《習</td>
              <td>chuẩn bị bài mới</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td><ruby>復<rt>ふく</rt></ruby>《習</td>
              <td>ôn tập bài cũ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>そのままに します</td>
              <td>để nguyên như thế</td>
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
              <td><ruby>案<rt>あん</rt></ruby>《内</td>
              <td>sách hướng dẫn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>真ん中</td>
              <td>chính giữa, trung tâm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>何か ご希望がありますか。</td>
              <td>Do you have any requests?</td>
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
              <td>Kanji / Furigana</td>
              <td>English</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>お<ruby>子<rt>こ</rt></ruby>さん</td>
              <td>(someone else's) child</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td><ruby>授<rt>じゅ</rt></ruby>《業</td>
              <td>giờ học, tiết học</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td><ruby>講<rt>こう</rt></ruby>《義</td>
              <td>bài giảng, giờ thuyết giảng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>ミーティング</td>
              <td>cuộc họp</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td><ruby>予<rt>よ</rt></ruby>《定</td>
              <td>てい》</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>お<ruby>知<rt>し</rt></ruby>らせ</td>
              <td>notice</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>カレンダー</td>
              <td>lịch</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>ポスター</td>
              <td>tờ áp phích, poster</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>ごみ<ruby>箱<rt>ばこ</rt></ruby></td>
              <td>thùng rác</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td><ruby>人<rt>にん</rt></ruby>《形</td>
              <td>búp bê, con rối</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td><ruby>花<rt>か</rt></ruby>《瓶</td>
              <td>bình hoa, lọ hoa</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td><ruby>鏡<rt>かがみ</rt></ruby></td>
              <td>cái gương</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td><ruby>引<rt>ひ</rt></ruby>き《出</td>
              <td>ngăn kéo</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td><ruby>玄<rt>げん</rt></ruby>《関</td>
              <td>lối vào, cửa vào (nhà kiểu Nhật)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td><ruby>廊<rt>ろう</rt></ruby>《下</td>
              <td>hành lang</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td><ruby>壁<rt>かべ</rt></ruby></td>
              <td>bức tường</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>池</td>
              <td>cái ao</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td>交番</td>
              <td>đồn cảnh sát</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>元の 所</td>
              <td>chỗ cũ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>周り</td>
              <td>xung quanh</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>隅</td>
              <td>góc</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td>まだ</td>
              <td>still</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td>〜ほど</td>
              <td>about ~</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td>予定表</td>
              <td>schedule</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td>ご苦労様</td>
              <td>Thank you for your hard work. (used by a superior or older person to express appreciation for a subordinate's work)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>希望</td>
              <td>hope, request</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>ミュージカル</td>
              <td>musical</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>それは いいですね。</td>
              <td>That's a good idea./That sounds nice.</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>※ブロードウェイ</td>
              <td>Broadway</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td>丸い</td>
              <td>vòng tròn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td>月</td>
              <td>mặt trăng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td>ある 〜</td>
              <td>one ~, a certain ~</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>地球</td>
              <td>trái đất</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>うれしい</td>
              <td>vui mừng, hạnh phúc</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>嫌な</td>
              <td>chán, ghét, không thích</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td>すると</td>
              <td>and, then</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>38</td>
              <td>目が覚めます II</td>
              <td>wake up</td>
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
