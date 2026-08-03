'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage32() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 32';
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
          第32課 - 学習テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Bài 32 - Minna no Nihongo II</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Hidaya School</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        <h3>1. Đưa ra lời khuyên nên/không nên: V-ta / V-nai + ほうがいいです</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Khuyên bảo người nghe nên thực hiện hoặc không nên thực hiện một hành động cụ thể nào đó." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "- <strong>Nên làm:</strong> Động từ thể た + <strong>ほうがいいです</strong>.<br />- <strong>Không nên làm:</strong> Động từ thể ない + <strong>ほうがいいです</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Mẫu câu này mang sắc thái khuyên bảo rất mạnh mẽ, có tính áp đặt ý kiến cá nhân. Vì vậy, tránh dùng với cấp trên hoặc người lớn tuổi, trừ khi họ chủ động hỏi xin ý kiến." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "毎日運動した<strong>ほうがいいです</strong>よ。" }} />
            <div className="translation">Anh nên vận động thể thao mỗi ngày thì tốt hơn đấy.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "風邪のときは、お風呂に入らない<strong>ほうがいいです</strong>。" }} />
            <div className="translation">Khi bị cảm cúm thì không nên tắm bồn.</div>
          </li>
        </ul>

        <h3>2. Phỏng đoán có căn cứ: Thể thông thường + でしょう</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả sự phỏng đoán của người nói về một sự việc dựa trên các thông tin, căn cứ gián tiếp (chắc là, có lẽ là)." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ, Tính từ đuôi -i chia thể thông thường + <strong>でしょう</strong>. Tính từ đuôi -na và Danh từ bỏ <code>だ</code> + <strong>でしょう</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Cuối câu <code>でしょう</code> thường hạ giọng. Nếu lên giọng ở cuối câu, câu nói sẽ biến thành câu hỏi xác nhận sự đồng tình của người nghe." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "明日は雨が降る<strong>でしょう</strong>。" }} />
            <div className="translation">Ngày mai chắc trời sẽ mưa.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "北海道はもう寒い<strong>でしょう</strong>。" }} />
            <div className="translation">Vùng Hokkaido chắc bây giờ đã lạnh rồi nhỉ.</div>
          </li>
        </ul>

        <h3>3. Phỏng đoán khả năng thấp: Thể thông thường + かもしれません</h3>
        <p><strong>Ý nghĩa:</strong> <span dangerouslySetInnerHTML={{ __html: "Diễn tả sự phỏng đoán về khả năng xảy ra sự việc với mức độ tin cậy thấp (chỉ khoảng 50% hoặc thấp hơn), 'có lẽ / không chừng'." }} /></p>
        <p><strong>Cách chia:</strong> <span dangerouslySetInnerHTML={{ __html: "Động từ, Tính từ đuôi -i chia thể thông thường + <strong>かもしれません</strong>. Tính từ đuôi -na và Danh từ bỏ <code>だ</code> + <strong>かもしれません</strong>." }} /></p>
        <div className="note-box" dangerouslySetInnerHTML={{ __html: "<strong>💡 Ghi chú:</strong><br>Đôi khi đi kèm phó từ <code>もしかしたら</code> ở đầu câu để nhấn mạnh khả năng phỏng đoán." }} />
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "約束の時間に間に合わない<strong>かもしれません</strong>。" }} />
            <div className="translation">Có lẽ tôi sẽ không kịp giờ hẹn mất.</div>
          </li>
          <li className="example-item">
            <div dangerouslySetInnerHTML={{ __html: "もしかしたら、明日は雪<strong>かもしれません</strong>よ。" }} />
            <div className="translation">Biết đâu chừng ngày mai trời lại có tuyết rơi đấy.</div>
          </li>
        </ul>

      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 32)</h2>
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>晴</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TÌNH</td>
              <td>セイ / は(れる)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "晴れ (Trời nắng)<br />晴れる (Nắng, quang đãng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>星</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TINH</td>
              <td>セイ / ほし</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "星 (Ngôi sao)<br />火星 (Sao Hỏa)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>熱</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>NHIỆT</td>
              <td>ネツ / あつ(i)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "熱 (Sốt)<br />熱い (Nóng - nhiệt độ vật)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>約</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ƯỚC</td>
              <td>ヤク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "約束 (Lời hứa, hẹn)<br />約 (Khoảng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>束</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THÚC</td>
              <td>ソク / たば</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "約束 (Lời hứa, hẹn)<br />花束 (Bó hoa)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>辞</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỪ</td>
              <td>ジ / や(める)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "辞書 (Từ điển)<br />辞める (Từ chức, nghỉ việc)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>練</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LUYỆN</td>
              <td>レン</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "練習 (Luyện tập)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>返</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHẢN</td>
              <td>ヘン / かえ(す)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "返事 (Trả lời)<br />返す (Trả lại)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>最</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỐI</td>
              <td>サイ / もっと(も)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "最近 (Gần đây)<br />最初 (Đầu tiên)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>続</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỰC</td>
              <td>ゾク / つづ(u), つづ(ける)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "続ける (Tiếp tục)<br />手続き (Thủ tục)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>客</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KHÁCH</td>
              <td>キャク</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "乗客 (Hành khách)<br />お客さん (Khách hàng)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>角</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>GIÁC</td>
              <td>カク / かど</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "角 (Góc đường)<br />三角 (Tam giác)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>治</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TRỊ</td>
              <td>ジ, チ / なお(る)</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "治る (Khỏi bệnh)<br />政治 (Chính trị)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>格</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CÁCH</td>
              <td>カク, コウ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "合格 (Thi đỗ, thông qua)<br />資格 (Tư cách, bằng cấp)" }} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>卒</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TỐT</td>
              <td>ソツ</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: "卒業 (Tốt nghiệp)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">III. Danh Sách Từ Vựng Bài 32 (語彙リスト)</h2>
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
              <td>運動します</td>
              <td>vận động, tập thể thao</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>成功します</td>
              <td>thành công</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>失敗します</td>
              <td>thất bại [thi trượt ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>合格します</td>
              <td>đỗ, thi đậu [thi đỗ ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>戻ります</td>
              <td>quay lại, trở lại</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>やみます</td>
              <td>tạnh, ngừng [mưa ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>晴れます</td>
              <td>nắng, trời quang đãng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>曇ります</td>
              <td>nhiều mây, u ám</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>吹きます</td>
              <td>thổi [gió ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>治ります、直ります</td>
              <td>khỏi [bệnh ~], sửa xong [hỏng hóc ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>続きます</td>
              <td>tiếp tục [sốt ~]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>ひきます</td>
              <td>bị [cảm]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>冷やします</td>
              <td>làm lạnh</td>
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
              <td>心配な</td>
              <td>lo lắng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>十分な</td>
              <td>đầy đủ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>おかしい</td>
              <td>kỳ lạ, buồn cười, có vấn đề</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>うるさい</td>
              <td>ồn ào, phiền phức</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>南</td>
              <td>phía nam</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>こんなに</td>
              <td>như thế này</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>そんなに</td>
              <td>như thế đó (không đến mức như thế)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>あんなに</td>
              <td>như thế kia</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>星占い</td>
              <td>bói toán chòm sao</td>
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
              <td>試験に～</td>
              <td>[an examination]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>2</td>
              <td>雨が～</td>
              <td>[雨が～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>3</td>
              <td>風が～</td>
              <td>[風が～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>4</td>
              <td>病気が～</td>
              <td>[病気が～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>5</td>
              <td>故障が～</td>
              <td>be fixed, be repaired</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>6</td>
              <td>熱が～</td>
              <td>[熱が～]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>7</td>
              <td>かぜを～</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>8</td>
              <td>やけど</td>
              <td>bỏng (～をします: bị bỏng)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>9</td>
              <td>けが</td>
              <td>vết thương (～をします: bị thương)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>10</td>
              <td>せき</td>
              <td>chỗ ngồi</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>11</td>
              <td>インフルエンザ</td>
              <td>cúm dịch (influenza)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>12</td>
              <td>空</td>
              <td>sky</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>13</td>
              <td>太陽</td>
              <td>mặt trời</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>14</td>
              <td>星</td>
              <td>ngôi sao</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>15</td>
              <td>月</td>
              <td>mặt trăng</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>16</td>
              <td>風</td>
              <td>gió</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>17</td>
              <td>北</td>
              <td>phía bắc</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>18</td>
              <td>西</td>
              <td>phía tây</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>19</td>
              <td>東</td>
              <td>phía đông</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>20</td>
              <td>水道</td>
              <td>nước máy</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>21</td>
              <td>エンジン</td>
              <td>động cơ (engine)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>22</td>
              <td>チーム</td>
              <td>đội, nhóm (team)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>23</td>
              <td>今夜</td>
              <td>tối nay</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>24</td>
              <td>夕方</td>
              <td>chiều tối</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>25</td>
              <td>まえ</td>
              <td>trước</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>26</td>
              <td>遅く</td>
              <td>muộn, trễ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>27</td>
              <td>それは いけませんね。</td>
              <td>That's too bad.</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>28</td>
              <td>※オリンピック</td>
              <td>Olympic Games</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>29</td>
              <td>元気</td>
              <td>vigor</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>30</td>
              <td>胃</td>
              <td>dạ dày</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>31</td>
              <td>働きすぎ</td>
              <td>làm việc quá sức</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>32</td>
              <td>ストレス</td>
              <td>căng thẳng (stress)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>33</td>
              <td>無理を します Ⅲ</td>
              <td>work more than one's capacity</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>34</td>
              <td>ゆっくり します Ⅲ</td>
              <td>take one's time</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>35</td>
              <td>牡牛座</td>
              <td>chòm sao Kim Ngưu</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>36</td>
              <td>困ります Ⅰ</td>
              <td>be in trouble, have a problem</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>37</td>
              <td>宝くじ</td>
              <td>vé số</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>38</td>
              <td>当たります 宝くじが～ Ⅰ</td>
              <td>win [a lottery]</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>39</td>
              <td>健康</td>
              <td>sức khỏe</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>40</td>
              <td>恋愛</td>
              <td>tình yêu, lãng mạn</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>41</td>
              <td>恋人</td>
              <td>người yêu</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>42</td>
              <td>お金持ち</td>
              <td>rich person</td>
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
              <td>もしかしたら</td>
              <td>có lẽ, biết đâu là</td>
            </tr>
          </tbody>
        </table>      </section>

      <footer style={{marginTop: '40px', borderTop: '1px solid #000', paddingTop: '15px', fontSize: '10pt', textAlign: 'center', color: '#444'}}>
        <p>© Tài liệu giảng dạy Minna no Nihongo II - Lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
