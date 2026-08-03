'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage33() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 33';
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
          第33課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 33 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Thể mệnh lệnh (Imperative) và Thể cấm chỉ (Prohibitive)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Dùng để ra lệnh bắt buộc ai đó làm gì (Mệnh lệnh) hoặc cấm đoán tuyệt đối không được làm gì (Cấm chỉ)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "<strong>Thể mệnh lệnh:</strong><br />- <strong>Nhóm I:</strong> Chuyển âm cuối hàng <code>い</code> sang hàng <code>え</code>. (Ví dụ: <code>行きます</code> -> <code>行け</code>).<br />- <strong>Nhóm II:</strong> Bỏ <code>ます</code> thêm <code>ろ</code>. (Ví dụ: <code>寝ます</code> -> <code>寝ろ</code>).<br />- <strong>Nhóm III:</strong> <code>します</code> -> <code>しろ</code>, <code>来ます</code> -> <code>こい</code>.<br /><strong>Thể cấm chỉ:</strong> Động từ thể từ điển + <strong>な</strong>. (Ví dụ: <code>入るな</code>: Cấm vào, <code>話すな</code>: Cấm nói)." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Có sắc thái áp đặt cực kỳ mạnh mẽ nên phạm vi sử dụng rất hạn chế: Nam giới lớn tuổi nói với cấp dưới/con cái, cổ vũ thể thao, biển báo nơi công cộng, hoặc các trường hợp cực kỳ khẩn cấp." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "早く動け！" }} />
            <div className="translation">Di chuyển nhanh lên! (Ra lệnh khẩn cấp)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ここに車を止める<strong>な</strong>。" }} />
            <div className="translation">Cấm đỗ xe ở chỗ này. (Biển báo cấm chỉ)</div>
          </li>
        </ul>

        <h3>2. Giải nghĩa chữ viết, biển báo: ～と書いてあります / ～と読みます</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "- <strong>～と書いてあります:</strong> Có viết là...<br />- <strong>～と読みます:</strong> Đọc là..." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Nội dung + <strong>と書いてあります</strong> / <strong>と読みます</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Thường dùng để hỏi hoặc giải thích ý nghĩa biển báo, chữ Hán viết trên bảng." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "あの看板に「立入禁止」<strong>と書いてあります</strong>。" }} />
            <div className="translation">Trên tấm biển kia có viết là 'Cấm vào'.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "この漢字は「たちいりきんし」<strong>と読みます</strong>。" }} />
            <div className="translation">Chữ Hán này được đọc là 'Tachi-iri kinshi'.</div>
          </li>
        </ul>

        <h3>3. Định nghĩa ý nghĩa: X は Y という意味 (いみ) です</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Giải thích định nghĩa: 'X có nghĩa là Y'." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Chủ đề X + <strong>は</strong> + Nội dung Y + <strong>という意味です</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Dùng để hỏi ý nghĩa từ vựng hoặc giải thích biển báo cho người khác." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "このマークは「駐車禁止」<strong>という意味です</strong>。" }} />
            <div className="translation">Ký hiệu này có nghĩa là 'Cấm đỗ xe'.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "「無料」は「お金がいらない」<strong>という意味です</strong>。" }} />
            <div className="translation">Chữ 'Miễn phí' nghĩa là 'không cần tốn tiền'.</div>
          </li>
        </ul>

        <h3>4. Truyền đạt lại lời nói: Thể thông thường + と言っていました</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Dùng để truyền đạt, tường thuật lại lời nói của một người thứ ba cho người nghe: 'Ai đó đã nói rằng...'." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Người nói + <strong>は</strong> + Thể thông thường + <strong>と言っていました</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Khác với <code>～と言いました</code> (chỉ kể lại việc đã nói), <code>～と言っていました</code> nhấn mạnh vào việc truyền tin nhắn." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "田中さんは明日休む<strong>と言っていました</strong>。" }} />
            <div className="translation">Anh Tanaka đã nói là ngày mai anh ấy xin nghỉ.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ワンさんは日本語 của 测试難しかった<strong>と言っていました</strong>。" }} />
            <div className="translation">Bạn Wang đã nói rằng bài kiểm tra tiếng Nhật rất khó.</div>
          </li>
        </ul>

        <h3>5. Nhờ truyền tin nhắn lịch sự: Thể thông thường + と伝えていただけませんか</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Nhờ vả người nghe truyền đạt lại lời nhắn cho một người khác giúp mình một cách lịch sự: 'Làm ơn nhắn lại giúp tôi rằng...'." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Thể thông thường + <strong>と伝えていただけませんか</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Dùng nhiều trong công việc hoặc giao tiếp qua điện thoại khi người cần gặp vắng mặt." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "鈴木さんに会議は3時からだ<strong>と伝えていただけませんか</strong>。" }} />
            <div className="translation">Làm ơn nhắn lại với anh Suzuki giúp tôi rằng cuộc họp bắt đầu từ 3 giờ được không?</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 33)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>以</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>DĨ</td>
              <td>イ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "以上 (Trở lên)<br />以下 (Trở xuống)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>質</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CHẤT</td>
              <td>シツ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "質問 (Câu hỏi)<br />品質 (Chất lượng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>葉</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>DIỆP</td>
              <td>ヨウ / は</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "言葉 (Từ vựng, từ ngữ)<br />紅葉 (Lá đỏ)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>注</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CHÚ</td>
              <td>チュウ / そそ(ぐ)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "注意 (Chú ý)<br />注文 (Đặt hàng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>閉</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>BẾ</td>
              <td>ヘイ / し(める), と(じる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "閉める (Đóng cửa)<br />閉じる (Nhắm mắt, gấp sách)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>番</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHIÊN</td>
              <td>バン</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "番号 (Số thứ tự)<br />一番 (Nhất)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>号</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HIỆU</td>
              <td>ゴウ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "番号 (Số thứ tự)<br />信号 (Đèn tín hiệu)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>交</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>GIAO</td>
              <td>コウ / まじ(わる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "交番 (Đồn cảnh sát)<br />交通 (Giao thông)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>危</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>NGUY</td>
              <td>キ / あぶ(ない)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "危ない (Nguy hiểm)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 33 (語彙リスト)</h2>
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
              <td>逃げます</td>
              <td>chạy trốn, chạy thoát</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>騒ぎます</td>
              <td>làm ồn, làm loạn lên</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>あきらめます</td>
              <td>từ bỏ, đầu hàng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>投げます</td>
              <td>ném</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>守ります</td>
              <td>bảo vệ, tuân thủ, giữ (lời hứa)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>上げます</td>
              <td>raise, lift up</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>下げます</td>
              <td>lower, pull down</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>伝えます</td>
              <td>truyền đạt, truyền lại</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>注意します</td>
              <td>chú ý, đề phòng [ô tô ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>外します</td>
              <td>rời [chỗ ngồi ~] / tháo, cởi</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>でんぽう》を～ I</td>
              <td>send [a telegram]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>pass away, die</td>
              <td>pass away, die</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>use</td>
              <td>use</td>
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
              <td>だめな</td>
              <td>no good, not permitted, impossible</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>～<ruby>以内<rt>いない</rt></ruby></td>
              <td>within ～</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>sorrow, sadness</td>
              <td>sorrow, sadness</td>
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
              <td>車に～</td>
              <td>[車に～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>席を～</td>
              <td>[席を～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>席</td>
              <td>chỗ ngồi</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>ファイト</td>
              <td>cố lên (fight)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>マーク</td>
              <td>ký hiệu, nhãn hiệu (mark)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>ボール</td>
              <td>quả bóng (ball)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>洗濯機</td>
              <td>máy giặt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>～機</td>
              <td>～ machine</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>規則</td>
              <td>quy tắc, nội quy</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>使用禁止</td>
              <td>cấm sử dụng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>立入禁止</td>
              <td>cấm vào</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>入口</td>
              <td>entrance</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>出口</td>
              <td>exit</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>非常口</td>
              <td>lối thoát hiểm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>無料</td>
              <td>miễn phí</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td>本日休業</td>
              <td>closed today</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>営業中</td>
              <td>open for business</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>使用中</td>
              <td>đang sử dụng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td>～中</td>
              <td>～ ing</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>**どういう ～**</td>
              <td>what kind of ～</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>**もう**</td>
              <td>(not) any longer (used with negatives)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>**あと ～**</td>
              <td>～ left</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td><ruby>駐車違反<rt>ちゅうしゃいはん</rt></ruby></td>
              <td>đỗ xe sai quy định</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td>そりゃあ</td>
              <td>well</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td><ruby>警察<rt>けいさつ</rt></ruby></td>
              <td>cảnh sát</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td><ruby>罰金<rt>ばっきん</rt></ruby></td>
              <td>tiền phạt</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>Tiếng Anh</td>
              <td>Tiếng Anh</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>telegram</td>
              <td>telegram</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>people</td>
              <td>people</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>urgent business</td>
              <td>urgent business</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td>telegram charge</td>
              <td>telegram charge</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td>as much as possible</td>
              <td>as much as possible</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td>shortly, briefly</td>
              <td>shortly, briefly</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>and</td>
              <td>and</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>for example</td>
              <td>for example</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>in a critical condition</td>
              <td>in a critical condition</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td>びょうき》</td>
              <td>serious illness</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>38</td>
              <td>tomorrow</td>
              <td>tomorrow</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>39</td>
              <td>absence</td>
              <td>absence</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>40</td>
              <td>looking after a house during the owner's absence</td>
              <td>looking after a house during the owner's absence</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>41</td>
              <td>celebration</td>
              <td>celebration</td>
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
