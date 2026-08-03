'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage31() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 31';
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
          第31課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 31 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Thể ý định (Volitional Form - 意向形)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Thể thông thường (Plain style) của cấu trúc rủ rê, đề nghị <code>～ましょう</code>." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- <strong>Nhóm I:</strong> Chuyển âm cuối hàng <code>い</code> sang hàng <code>オ</code> rồi cộng thêm <code>う</code>. (Ví dụ: <code>行きます</code> -> <code>行こう</code>).<br />- <strong>Nhóm II:</strong> Bỏ <code>ます</code> rồi thêm <code>よう</code>. (Ví dụ: <code>食べます</code> -> <code>食べよう</code>).<br />- <strong>Nhóm III:</strong> <code>します</code> -> <code>しよう</code>, <code>来ます</code> -> <code>来よう (こよう)</code>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Thường dùng trong hội thoại thân mật giữa bạn bè, người thân hoặc khi tự nhủ bản thân làm gì đó." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ちょっと<strong>休もう</strong>。" }} />
            <div className="translation">Nghỉ một chút nào! (Thân mật của 休むましょう)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "明日10時に<strong>来よう</strong>。" }} />
            <div className="translation">Ngày mai tầm 10 giờ hãy đến nhé.</div>
          </li>
        </ul>

        <h3>2. Diễn tả ý định, nguyện vọng: V thể ý định + と思っています</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Bày tỏ ý định, dự định làm một việc gì đó của người nói (ý định này đã được nung nấu từ trước thời điểm nói và hiện tại vẫn giữ dự định đó)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ chia thể ý định + <strong>と思っています</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Phân biệt với <code>V thể ý định + と思います</code>: <code>と思います</code> diễn tả ý định chợt nảy ra ngay lúc đang nói, còn <code>と思っています</code> là dự định có từ trước." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "将来、日本で働こう<strong>と思っています</strong>。" }} />
            <div className="translation">Tôi dự định tương lai sẽ làm việc tại Nhật Bản. (Dự định lâu dài)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "今週末 là 家で nghỉ ngơi thong thả<strong>と思っています</strong>。" }} />
            <div className="translation">Cuối tuần này tôi định sẽ nghỉ ngơi thong thả ở nhà.</div>
          </li>
        </ul>

        <h3>3. Dự định chắc chắn làm gì: V từ điển / V-nai + つもりです</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả một ý định, quyết tâm thực hiện một hành động nào đó đã được quyết định rõ ràng." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- <strong>Làm:</strong> Động từ thể từ điển + <strong>つもりです</strong>.<br />- <strong>Không làm:</strong> Động từ thể ない + <strong>つもりです</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>So với <code>と思っています</code>, mẫu câu <code>つもりです</code> thể hiện ý chí mạnh mẽ và độ chắc chắn cao hơn nhiều." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "来年、大学を受験する<strong>つもりです</strong>。" }} />
            <div className="translation">Năm sau tôi dự định sẽ thi vào đại học. (Quyết tâm cao)</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "タバコはもう吸わない<strong>つもりです</strong>。" }} />
            <div className="translation">Tôi định sẽ không hút thuốc lá nữa.</div>
          </li>
        </ul>

        <h3>4. Kế hoạch, lịch trình đã định: V từ điển / N の + 予定です (よていです)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả một kế hoạch, chương trình hay lịch trình đã được quyết định chính thức hoặc định sẵn (thường là sự kiện công việc, lịch làm việc của cơ quan, lịch chạy tàu xe...)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ thể từ điển / Danh từ + <strong>の</strong> + <strong>予定 (よてい) です</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Mang tính khách quan, thường là lịch trình bên ngoài hơn là dự định cá nhân thuần túy." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "出張は1週間ぐらいの<strong>予定です</strong>。" }} />
            <div className="translation">Chuyến đi công tác dự kiến kéo dài khoảng một tuần.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "今日の午後、会議がある<strong>予定です</strong>。" }} />
            <div className="translation">Chiều ngày hôm nay theo kế hoạch là sẽ có cuộc họp.</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 31)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>東</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐÔNG</td>
              <td>トウ / ひがし</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "東 (Phía đông)<br />東京 (Tokyo)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>西</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TÂY</td>
              <td>セイ, サイ / にし</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "西 (Phía tây)<br />関西 (Vùng Kansai)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>南</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>NAM</td>
              <td>ナン / みなみ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "南 (Phía nam)<br />東南アジア (Đông Nam Á)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>北</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>BẮC</td>
              <td>ホク / きた</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "北 (Phía bắc)<br />北海道 (Hokkaido)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>雨</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VŨ</td>
              <td>ウ / あめ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "雨 (Mưa)<br />大雨 (Mưa lớn)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>風</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHONG</td>
              <td>フウ / かぜ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "風 (Cơn gió)<br />台風 (Bão)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>夕</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỊCH</td>
              <td>セキ / ゆう</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "夕方 (Chiều tối)<br />夕日 (Hoàng hôn)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>服</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHỤC</td>
              <td>PHỤC / フク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "服 (Quần áo)<br />和服 (Trang phục Nhật)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>予</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>DỰ</td>
              <td>ヨ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "予定 (Kế hoạch)<br />予約 (Đặt trước)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 31 (語彙リスト)</h2>
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
              <td>始まります</td>
              <td>bắt đầu [buổi lễ ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>続けます</td>
              <td>tiếp tục</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>見つけます</td>
              <td>tìm thấy</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>受けます</td>
              <td>dự [thi]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>入学します</td>
              <td>enter [a university]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>卒業します</td>
              <td>tốt nghiệp</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>出席します</td>
              <td>tham dự, có mặt [họp ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>休憩します</td>
              <td>take a break, take a rest</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>remain, be left</td>
              <td>remain, be left</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>close</td>
              <td>close</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>gather</td>
              <td>gather</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>notice, become aware of</td>
              <td>notice, become aware of</td>
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
              <td>hateful, disagreeable</td>
              <td>hateful, disagreeable</td>
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
              <td>式が〜</td>
              <td>[式が〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>試験を〜</td>
              <td>[試験を〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>大学に〜</td>
              <td>[大学に〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>大学を〜</td>
              <td>[大学を〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>会議に〜</td>
              <td>[会議に〜]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>連休</td>
              <td>kỳ nghỉ dài ngày</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>作文</td>
              <td>bài văn, tập làm văn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>展覧会</td>
              <td>triển lãm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>結婚式</td>
              <td>wedding ceremony</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>お葬式</td>
              <td>funeral</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>式</td>
              <td>buổi lễ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>本社</td>
              <td>trụ sở chính, công ty mẹ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>支店</td>
              <td>branch office</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>教会</td>
              <td>nhà thờ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>大学院</td>
              <td>cao học (sau đại học)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td>動物園</td>
              <td>vườn bách thú</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>温泉</td>
              <td>suối nước nóng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>お客さん</td>
              <td>khách hàng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td>だれか</td>
              <td>ai đó</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>〜の 方</td>
              <td>place toward 〜, direction of 〜</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>Tiếng Anh</td>
              <td>Tiếng Anh</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>all the time</td>
              <td>suốt, mãi, hơn nhiều</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td>Pablo Picasso, Spanish painter (1881-1973)</td>
              <td>Pablo Picasso, Spanish painter (1881-1973)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td>の》《公</td>
              <td>こう》《園</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td>per month</td>
              <td>per month</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td>つう》の</td>
              <td>ordinary, common, usual</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>Internet</td>
              <td>Internet</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>village</td>
              <td>village</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>が》《館</td>
              <td>かん》</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>sky</td>
              <td>sky</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td>かい》</td>
              <td>city</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td>children</td>
              <td>children</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td>ゆう》に</td>
              <td>freely</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>かい》《中</td>
              <td>じゅう》</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>beautiful</td>
              <td>beautiful</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>ぜん》</td>
              <td>nature</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td>goodness, virtue</td>
              <td>sự tuyệt vời</td>
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
