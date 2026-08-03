'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage35() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 35';
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
          第35課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 35 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Thể điều kiện (Conditional form - ば形)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả giả định 'Nếu... thì...' làm tiền đề cần thiết cho một sự việc xảy ra." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- <strong>Động từ:</strong> Nhóm I chuyển âm cuối hàng <code>い</code> sang hàng <code>え</code> + <code>ば</code>. Nhóm II bỏ <code>ます</code> + <code>れば</code>. Nhóm III: <code>します</code> -> <code>すれば</code>, <code>来ます</code> -> <code>くれば</code>.<br />- <strong>Tính từ đuôi -i:</strong> Bỏ <code>い</code> + <code>ければ</code>. (Ví dụ: <code>安ければ</code>).<br />- <strong>Tính từ đuôi -na / Danh từ:</strong> Cộng thêm <strong>nara</strong>. (Ví dụ: <code>便利なら</code>, <code>雨なら</code>)." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Nếu chủ ngữ của vế trước và vế sau là một, thì cả hai vế không được cùng chứa động từ thể hiện ý chí (như rủ rê, nhờ vả, ra lệnh). Khi đó ta phải dùng cấu trúc <code>～たら</code> của Bài 25." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "ボタンを押せ<strong>ば</strong>, 窓が開きます。" }} />
            <div className="translation">Nếu ấn nút này thì cửa sổ sẽ mở ra.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "安けれ<strong>ば</strong>, このパソコンを買います。" }} />
            <div className="translation">Nếu rẻ thì tôi sẽ mua chiếc máy tính này.</div>
          </li>
        </ul>

        <h3>2. Đưa gợi ý dựa trên đề tài: N なら、～</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Dùng khi người nói đưa ra lời khuyên hoặc phương án gợi ý dựa trên thông tin hoặc đề tài do đối phương vừa đưa ra trước đó." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Danh từ + <strong>nara</strong> + Vế gợi ý/lời khuyên." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Rất tự nhiên để đưa ra các đề xuất du lịch, ẩm thực." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "日本の温泉に行きたいんですが...<br />ー温泉<strong>なら</strong>、箱根がいいですよ。" }} />
            <div className="translation">Tôi muốn đi suối nước nóng ở Nhật...<br />ーNếu là suối nước nóng thì vùng Hakone tuyệt lắm đấy.</div>
          </li>
        </ul>

        <h3>3. Xin lời khuyên lịch sự: Từ để hỏi + V thể điều kiện + いいですか</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Mẫu câu dùng để hỏi xin lời khuyên hoặc ý kiến chỉ dẫn từ đối phương: 'Tôi nên... làm thế nào thì tốt ạ?'." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Từ để hỏi + Động từ chia thể điều kiện (ば形) + <strong>いいですか</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Lịch sự và có sắc thái lựa chọn hơn cấu trúc <code>～たらいいですか</code> học ở Bài 26." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "日本語が上手になりたいんですが、どうすれ<strong>ばいいですか</strong>。" }} />
            <div className="translation">Tôi muốn giỏi tiếng Nhật, tôi nên làm thế nào thì tốt ạ?</div>
          </li>
        </ul>

        <h3>4. Mẫu câu so sánh lũy tiến: V-ba V-ru ほど / A-ba A-i ほど (Càng... càng...)</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả sự tăng tiến song song: Khi mức độ của vế trước tăng lên thì mức độ ở vế sau cũng tăng theo tương ứng." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ/Tính từ chia thể điều kiện + Động từ thể từ điển / Tính từ nguyên dạng + <strong>ほど</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Cùng một động từ hoặc tính từ sẽ được lặp lại ở hai vế." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "日本語は勉強すれ<strong>ば</strong>勉強する<strong>ほど</strong>、難しくなります。" }} />
            <div className="translation">Tiếng Nhật càng học thì càng trở nên khó hơn.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "歌は簡単なら簡単な<strong>ほど</strong>, 歌いやすいです。" }} />
            <div className="translation">Bài hát càng đơn giản thì càng dễ hát.</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 35)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>工</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CÔNG</td>
              <td>コウ, ク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "工場 (Nhà máy, công xưởng)<br />工事 (Công sự, công trình)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>村</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THÔN</td>
              <td>ソン / むら</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "村 (Ngôi làng)<br />農村 (Nông thôn)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>所</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>SỞ</td>
              <td>SỞ / ところ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "住所 (Địa chỉ)<br />場所 (Địa điểm)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>暑</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THỬ</td>
              <td>ショ / あつ(い)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "暑い (Nóng - thời tiết)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>寒</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HÀN</td>
              <td>カン / さむ(い)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "寒い (Lạnh - thời tiết)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>便</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TIỆN</td>
              <td>ベン, ビン / たよ(り)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "便利 (Tiện lợi)<br />郵便局 (Bưu điện)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>利</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LỢI</td>
              <td>リ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "便利 (Tiện lợi)<br />利用 (Sử dụng, lợi dụng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>泳</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VỊNH</td>
              <td>エイ / およ(ぐ)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "泳ぐ (Bơi)<br />水泳 (Môn bơi lội)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>活</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>HOẠT</td>
              <td>カツ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "生活 (Sinh hoạt, cuộc sống)<br />活動 (Hoạt động)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 35 (語彙リスト)</h2>
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
              <td>咲きます</td>
              <td>nở [hoa ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>変わります</td>
              <td>thay đổi [màu ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>困ります</td>
              <td>gặp khó khăn, rắc rối</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>付けます</td>
              <td>vẽ [vòng tròn ~], đánh dấu / lắp, ghép</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>拾います</td>
              <td>nhặt, lượm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>掛かります</td>
              <td>khóa [cửa ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td><ruby>交わります<rt>まじわります</rt></ruby> I</td>
              <td>keep company with</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td><ruby>仲よくします<rt>なかよくします</rt></ruby> III</td>
              <td>be on good terms with</td>
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
              <td>［花が〜］</td>
              <td>［花が〜］</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>楽［な］</td>
              <td>comfortable, easy</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>正しい</td>
              <td>đúng, chính xác</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>珍しい</td>
              <td>hiếm, lạ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>港</td>
              <td>cảng, bến cảng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>それなら</td>
              <td>nếu vậy thì</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td><ruby>必要<rt>ひつよう</rt></ruby> な</td>
              <td>necessary, essential</td>
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
              <td>［色が〜］</td>
              <td>［色が〜］</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>［丸を〜］</td>
              <td>［丸を〜］</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>［電話が〜］</td>
              <td>［電話が〜］</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>方</td>
              <td>hướng, phương</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>向こう</td>
              <td>phía đối diện, bên kia</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>島</td>
              <td>hòn đảo</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>村</td>
              <td>ngôi làng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>近所</td>
              <td>hàng xóm, vùng lân cận</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>屋上</td>
              <td>sân thượng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>海外</td>
              <td>hải ngoại, nước ngoài</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>山登り</td>
              <td>leo núi (danh từ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>ハイキング</td>
              <td>đi dã ngoại (hiking)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>機会</td>
              <td>cơ hội</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>許可</td>
              <td>cho phép, sự cho phép</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>丸</td>
              <td>vòng tròn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td>操作</td>
              <td>thao tác, điều khiển</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>方法</td>
              <td>phương pháp, cách thức</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>Hán tự</td>
              <td>Ý nghĩa (English)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td><ruby>設備<rt>せつび</rt></ruby></td>
              <td>thiết bị, cơ sở vật chất</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>カーテン</td>
              <td>rèm cửa</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>ひも</td>
              <td>sợi dây</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>ふた</td>
              <td>cái nắp</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td><ruby>葉<rt>は</rt></ruby></td>
              <td>lá cây</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td><ruby>曲<rt>きょく</rt></ruby></td>
              <td>bài hát, khúc nhạc</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td><ruby>楽しみ<rt>たのしみ</rt></ruby></td>
              <td>niềm vui, sự mong đợi</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td><ruby>初めに<rt>はじめに</rt></ruby></td>
              <td>đầu tiên</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>※<ruby>箱根<rt>はこね</rt></ruby></td>
              <td>resort in Kanagawa Prefecture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>※<ruby>日光<rt>にっこう</rt></ruby></td>
              <td>tourist spot in Tochigi Prefecture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>※<ruby>白馬<rt>はくば</rt></ruby></td>
              <td>resort in Nagano Prefecture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>※アフリカ</td>
              <td>Africa</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td><ruby>夜行<rt>やこう</rt></ruby>バス</td>
              <td>xe buýt đêm</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td><ruby>旅行社<rt>りょこうしゃ</rt></ruby></td>
              <td>công ty du lịch</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td><ruby>詳しい<rt>くわしい</rt></ruby></td>
              <td>chi tiết, tường tận</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>スキー<ruby>場<rt>じょう</rt></ruby></td>
              <td>khu trượt tuyết</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>※<ruby>草津<rt>くさつ</rt></ruby></td>
              <td>resort in Gunma Prefecture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>※<ruby>志賀高原<rt>しがこうげん</rt></ruby></td>
              <td>national park in Nagano Prefecture</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td><ruby>朱<rt>しゅ</rt></ruby></td>
              <td>màu đỏ son</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>38</td>
              <td>ことわざ</td>
              <td>tục ngữ</td>
            </tr>
          </tbody>
        </table>

        <h3>4. Phó từ, liên từ &amp; khác</h3>
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
              <td>もっと</td>
              <td>hơn nữa, thêm chút nữa</td>
            </tr>
          </tbody>
        </table>      </section>

      <footer style={{marginTop: '40px', borderTop: '1px solid #000', paddingTop: '15px', fontSize: '10pt', textAlign: 'center', color: '#444'}}>
        <p>© Tài liệu giảng dạy Minna no Nihongo II - Lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
