'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage34() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 34';
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
          第34課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 34 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Thực hiện hành động theo khuôn mẫu: V1とおりに V2 / Nのとおりに V2</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Thực hiện hành động V2 đúng theo như những gì V1 (nghe, thấy, đọc) hoặc theo mẫu danh từ N." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- Động từ 1 (thể từ điển hoặc thể た) + <strong>とおりに</strong> + Động từ 2.<br />- Danh từ + <strong>の</strong> + <strong>とおりに</strong> + Động từ 2." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Sử dụng thể từ điển khi V1 là hành động sẽ thực hiện trong tương lai, dùng thể た khi V1 đã hoàn thành." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "私が言う<strong>とおりに</strong>、書いてください。" }} />
            <div className="translation">Hãy viết lại đúng theo những gì tôi nói nhé.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "この図<strong>のとおりに</strong>、紙u折ってください。" }} />
            <div className="translation">Hãy gấp giấy theo đúng sơ đồ này.</div>
          </li>
        </ul>

        <h3>2. Thứ tự thời gian rõ ràng: V1た あto de V2 / Nの あto de V2</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả việc hành động V2 được thực hiện sau khi hành động V1 hoặc sự kiện N kết thúc." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- Động từ 1 thể <strong>た</strong> + <strong>hồi nãy あとで</strong> + Động từ 2.<br />- Danh từ + <strong>の</strong> + <strong>あとで</strong> + Động từ 2." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Rõ ràng hơn cấu trúc <code>～て</code> về thứ tự trước sau của hành động." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "仕事が終わった<strong>あとで</strong>、飲みに行きます。" }} />
            <div className="translation">Sau khi làm xong việc, tôi sẽ đi uống nước.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "食事の<strong>あとで</strong>、薬を飲みます。" }} />
            <div className="translation">Uống thuốc sau khi ăn cơm xong.</div>
          </li>
        </ul>

        <h3>3. Hành động đi kèm: V1て V2 / V1ないで V2</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả hành động V2 được thực hiện trong trạng thái đi kèm hoặc phương thức V1." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- Động từ 1 chia thể <strong>て</strong> + Động từ 2.<br />- Động từ 1 chia thể <strong>ないde</strong> + Động từ 2." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>V1 và V2 phải có cùng một chủ ngữ thực hiện." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "しょうゆを<strong>つけて</strong>食べます。" }} />
            <div className="translation">Tôi ăn kèm chấm với nước tương.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "砂糖を<strong>入れないで</strong>コーヒーを飲みます。" }} />
            <div className="translation">Tôi uống cà phê mà không cho đường vào.</div>
          </li>
        </ul>

        <h3>4. Lựa chọn thay thế: V1-nai de, V2 (Không làm V1, làm V2)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả việc người nói lựa chọn thực hiện hành động V2 thay vì thực hiện hành động V1." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ 1 thể <strong>ないで</strong> + Động từ 2." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Mang ý nghĩa lựa chọn thay thế giữa hai việc không thể thực hiện đồng thời." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "エレベーターに乗ら<strong>ないで</strong>、階段を使います。" }} />
            <div className="translation">Tôi không đi thang máy mà sử dụng cầu thang bộ.</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 34)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>具</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CỤ</td>
              <td>グ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "道具 (Dụng cụ, công cụ)<br />家具 (Gia cụ, đồ gỗ)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>席</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỊCH</td>
              <td>セキ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "席 (Chỗ ngồi)<br />出席 (Tham dự)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>払</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHẤT</td>
              <td>はら(う)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "払う (Trả tiền)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>無</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VÔ</td>
              <td>ム, ブ / な(い)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "無料 (Miễn phí)<br />無理 (Quá sức)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>失</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THẤT</td>
              <td>シツ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "失敗 (Thất bại)<br />失礼 (Thất lễ, xin lỗi)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>礼</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LỄ</td>
              <td>レイ, ライ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "お礼 (Cảm ơn)<br />失礼 (Thất lễ)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>黄</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HOÀNG</td>
              <td>コウ / き</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "黄色 (Màu vàng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>非</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHI</td>
              <td>ヒ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "非常口 (Lối thoát hiểm)<br />非常に (Rất, cực kỳ)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>常</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THƯỜNG</td>
              <td>ジョウ / つね</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "日常 (Hàng ngày)<br />非常時 (Lúc khẩn cấp)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>逃</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐÀO</td>
              <td>トウ / に(げる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "逃げる (Chạy trốn)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>規</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>QUY</td>
              <td>キ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "規則 (Quy tắc, nội quy)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>則</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TẮC</td>
              <td>ソク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "規則 (Quy tắc)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>守</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THỦ</td>
              <td>シュ, ス / まも(る)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "守る (Bảo vệ, giữ lời)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>歯</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>XỈ</td>
              <td>シ / は</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "Răng (Nha khoa)<br />歯科 (Nha khoa)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>並</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TINH / BÍNH</td>
              <td>ヘイ / なら(ぶ)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "並ぶ (Xếp hàng)<br />並べる (Sắp xếp, bày biện)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 34 (語彙リスト)</h2>
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
              <td>磨きます</td>
              <td>mài, chải [răng ~], đánh [giày ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>組み立てます</td>
              <td>lắp ráp, lắp đặt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>折ります</td>
              <td>gãy, gập, bẻ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>気が つきます</td>
              <td>nhận ra, phát hiện</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>つけます</td>
              <td>vẽ [vòng tròn ~], đánh dấu / lắp, ghép / chấm nước sốt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>見つかります</td>
              <td>được tìm thấy [chìa khóa ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>します</td>
              <td>put on, wear [a tie]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>質問します</td>
              <td>hỏi, chất vấn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>make green tea</td>
              <td>make green tea</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>place on, load onto</td>
              <td>place on, load onto</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>put on the stove</td>
              <td>put on the stove</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>cook, boil</td>
              <td>cook, boil</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>be cooked, be boiled</td>
              <td>be cooked, be boiled</td>
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
              <td>pan, pot</td>
              <td>cái nồi</td>
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
              <td>歯を〜</td>
              <td>[歯を〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>忘れ物に〜</td>
              <td>[忘れ物に〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>しょうゆを〜</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>かぎが〜</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>ネクタイを〜</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>細い</td>
              <td>thin (of small diameter)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>太い</td>
              <td>thick (of large diameter)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>盆踊り</td>
              <td>Bon Festival dance</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>スポーツクラブ</td>
              <td>câu lạc bộ thể thao</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>家具</td>
              <td>furniture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>キー</td>
              <td>key</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>シートベルト</td>
              <td>seat belt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>説明書</td>
              <td>sách hướng dẫn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>図</td>
              <td>bản đồ, đồ thị, hình vẽ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>線</td>
              <td>đường kẻ, đường ray</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td>矢印</td>
              <td>dấu mũi tên</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>黒</td>
              <td>màu đen (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>白</td>
              <td>màu trắng (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td>赤</td>
              <td>màu đỏ (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>青</td>
              <td>màu xanh da trời (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>紺</td>
              <td>màu xanh lam đậm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>黄色</td>
              <td>màu vàng (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td>茶色</td>
              <td>màu nâu (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td>Tiếng Việt (Nghĩa tiếng Anh trong ảnh)</td>
              <td>Tiếng Việt (Nghĩa tiếng Anh trong ảnh)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td>soya, soy sauce</td>
              <td>soya, soy sauce</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td>sauce, Worcestershire sauce</td>
              <td>nước sốt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>～ or ～</td>
              <td>～ or ～</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>last night</td>
              <td>tối qua</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>a short while ago</td>
              <td>vừa nãy</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>tea ceremony</td>
              <td>tea ceremony</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td>first (when doing something before something else)</td>
              <td>first (when doing something before something else)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td>Is this all right?</td>
              <td>Is this all right?</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td>bitter</td>
              <td>bitter</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>a bowl of cooked rice with chicken and egg</td>
              <td>a bowl of cooked rice with chicken and egg</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>material, ingredient</td>
              <td>material, ingredient</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>portion for ～ (used for indicating quantity)</td>
              <td>portion for ～ (used for indicating quantity)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td>chicken</td>
              <td>chicken</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>38</td>
              <td>－ gram</td>
              <td>gram</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>39</td>
              <td>(counter for small objects)</td>
              <td>(counter for small objects)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>40</td>
              <td>onion</td>
              <td>hành tây</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>41</td>
              <td>one fourth</td>
              <td>one fourth</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>42</td>
              <td>seasoning, flavoring</td>
              <td>seasoning, flavoring</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>43</td>
              <td>fire, heating</td>
              <td>fire, heating</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>44</td>
              <td>ceramic bowl</td>
              <td>cái bát to</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>45</td>
              <td>Ghi chú</td>
              <td>Các con số 34 và 53 ở bên phải trang là số trang hoặc mã bài học.*</td>
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
