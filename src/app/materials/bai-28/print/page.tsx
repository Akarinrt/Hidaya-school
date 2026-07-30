'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage28() {
  useEffect(() => {
    document.title = 'Tài liệu In ấn - Bài 28';
  }, []);

  return (
    <div style={{ fontFamily: '"Times New Roman", serif', color: '#000', background: '#fff', padding: '0', maxWidth: '800px', margin: '0 auto', fontSize: '12pt', lineHeight: 1.5 }}>
      {/* CSS for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          table { page-break-inside: avoid; }
        }
        @page { margin: 2cm; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        h1, h2, h3 { color: #000; margin-top: 20px; margin-bottom: 10px; }
        .section-title { border-bottom: 2px solid #000; padding-bottom: 5px; }
      `}} />

      {/* Control buttons (hidden in print) */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '20px', padding: '20px', background: '#f5f7fa', borderRadius: '8px', border: '1px solid #ddd' }}>
        <p style={{fontFamily: 'sans-serif', margin: '0 0 10px 0'}}>Màn hình này được thiết kế tối ưu cho việc in ấn (Khổ A4).</p>
        <button onClick={() => window.print()} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
          🖨 In Tài liệu / Lưu PDF
        </button>
      </div>

      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24pt' }}>Tài liệu Học tập - Bài 28</h1>
        <p style={{ margin: 0, fontStyle: 'italic' }}>Chủ đề: Vừa... vừa & Thói quen</p>
      </header>

      <section>
        <h2 className="section-title">I. Tóm tắt Ngữ pháp</h2>
        
        <h3>1. V1-masu ながら V2 (Vừa làm V1 vừa làm V2)</h3>
        <p><strong>Ý nghĩa:</strong> Thực hiện đồng thời hai hành động trong cùng một khoảng thời gian. Hành động V2 là hành động chính.</p>
        <p><strong>Cách chia:</strong> Động từ 1 bỏ <strong>ます</strong> + ながら + Động từ 2.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>音楽を聞き<strong>ながら</strong>勉強します。(Tôi vừa nghe nhạc vừa học bài - việc học bài là chính)</li>
          <li>働き<strong>ながら</strong>大学に通っています。(Tôi vừa đi làm vừa đi học đại học)</li>
        </ul>

        <h3>2. V-te います (Thói quen thường xuyên)</h3>
        <p><strong>Ý nghĩa:</strong> Diễn tả một hành động, thói quen lặp đi lặp lại thường xuyên hàng ngày (như nghề nghiệp, sở thích, nếp sống).</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>毎朝ジョギングを<strong>しています</strong>。(Sáng nào tôi cũng chạy bộ)</li>
          <li>暇なとき, 本を読んで<strong>います</strong>。(Lúc rảnh rỗi tôi thường đọc sách)</li>
        </ul>

        <h3>3. Thể thông thường + し, Thể thông thường + し, ~ (Vừa... vừa... lại còn)</h3>
        <p><strong>Ý nghĩa:</strong> Liệt kê các lý do, thuộc tính của sự vật, sự việc (thường từ 2 lý do trở lên để dẫn tới một kết luận).</p>
        <p><strong>Lưu ý:</strong> Tính từ đuôi -na và Danh từ đi kèm với <strong>だ</strong> + し.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>ここは値段も安い<strong>し</strong>, 魚も新鮮だ<strong>し</strong>, よく買いに来ます。(Ở đây giá vừa rẻ, cá lại tươi ngon, nên tôi thường xuyên tới mua)</li>
          <li>彼は親切だ<strong>し</strong>, Đầu óc cũng thông minh (頭もいい) <strong>し</strong>, 人気があります。(Anh ấy vừa thân thiện lại vừa thông minh nên rất được yêu thích)</li>
        </ul>

        <h3>4. それに (Hơn nữa, ngoài ra) & それで (Vì thế, do đó)</h3>
        <p><strong>Ý nghĩa:</strong></p>
        <ul>
          <li><strong>それに:</strong> Dùng để bổ sung thêm thông tin, lý do (Hơn thế nữa).</li>
          <li><strong>それで:</strong> Dùng để kết nối nguyên nhân - kết quả (Vì vậy, cho nên).</li>
        </ul>
      </section>

      <section>
        <h2 className="section-title">II. Kanji (Hán tự)</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '15%', textAlign: 'center' }}>Kanji</th>
              <th style={{ width: '20%' }}>Âm Hán Việt</th>
              <th style={{ width: '30%' }}>Onyomi / Kunyomi</th>
              <th style={{ width: '35%' }}>Ví dụ / Từ vựng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>勝</td>
              <td>Thắng</td>
              <td>ショウ / か(つ)</td>
              <td>勝つ (Thắng)<br/>決勝 (Trận chung kết)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>負</td>
              <td>Phụ</td>
              <td>フ / ま(ける)</td>
              <td>負ける (Thua)<br/>勝負 (Thắng thua)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>願</td>
              <td>Nguyện</td>
              <td>ガン / ねが(う)</td>
              <td>願う (Cầu nguyện)<br/>お願い (Yêu cầu, làm ơn)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>座</td>
              <td>Tọa</td>
              <td>ザ / すわ(る)</td>
              <td>座る (Ngồi)<br/>座席 (Chỗ ngồi)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>眠</td>
              <td>Miên</td>
              <td>ミン / ねむ(る)</td>
              <td>眠る (Ngủ thiếp đi)<br/>居眠り (Ngủ gật)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>狭</td>
              <td>Hiệp</td>
              <td>キョウ / せま(い)</td>
              <td>狭い (Hẹp)<br/>狭い部屋 (Phòng hẹp)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>甘</td>
              <td>Cam</td>
              <td>カン / あま(い)</td>
              <td>甘い (Ngọt)<br/>甘やかす (Chiều chuộng)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>辛</td>
              <td>Tân</td>
              <td>シン / から(い)</td>
              <td>辛い (Cay)<br/>辛口 (Vị cay, khắt khe)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>卵</td>
              <td>Noãn</td>
              <td>ラン / たまご</td>
              <td>卵 (Quả trứng)<br/>卵焼き (Trứng cuộn)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>申</td>
              <td>Thân</td>
              <td>シン / もう(す)</td>
              <td>申す (Nói - khiêm nhường)<br/>申し込む (Đăng ký)</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <footer style={{ marginTop: '50px', borderTop: '1px solid #ddd', paddingTop: '10px', fontSize: '10pt', textAlign: 'center', color: '#666' }}>
        <p>Tài liệu lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
