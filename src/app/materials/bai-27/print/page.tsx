import React from 'react';

export const metadata = {
  title: 'Tài liệu In ấn - Bài 27',
};

export default function MaterialPrintPage() {
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
        .furigana { font-size: 0.6em; }
        ruby { ruby-align: center; }
      `}} />

      {/* Control buttons (hidden in print) */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '20px', padding: '20px', background: '#f5f7fa', borderRadius: '8px', border: '1px solid #ddd' }}>
        <p style={{fontFamily: 'sans-serif', margin: '0 0 10px 0'}}>Màn hình này được thiết kế tối ưu cho việc in ấn (Khổ A4).</p>
        <button onClick={() => window.print()} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
          🖨 In Tài liệu / Lưu PDF
        </button>
      </div>

      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24pt' }}>Tài liệu Học tập - Bài 27</h1>
        <p style={{ margin: 0, fontStyle: 'italic' }}>Chủ đề: Năng lực & Giao thông</p>
      </header>

      <section>
        <h2 className="section-title">I. Tóm tắt Ngữ pháp</h2>
        
        <h3>1. Thể Khả năng (可能形 - Kanoukei)</h3>
        <p><strong>Ý nghĩa:</strong> Thể hiện khả năng làm một việc gì đó (Có thể làm...).</p>
        <p><strong>Cách chia:</strong></p>
        <ul>
          <li><strong>Nhóm 1:</strong> Đổi đuôi [i]masu ➔ [e]masu. (VD: 飲みます ➔ 飲めます)</li>
          <li><strong>Nhóm 2:</strong> Bỏ masu ➔ + raremasu. (VD: 食べます ➔ 食べられます)</li>
          <li><strong>Nhóm 3:</strong> します ➔ できます | 来(き)ます ➔ 来(こ)られます</li>
        </ul>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>私は日本語が話せます。(Tôi có thể nói tiếng Nhật)</li>
          <li>刺身が食べられません。(Tôi không thể ăn sashimi)</li>
        </ul>

        <h3>2. ~しか ~ません (Chỉ ~)</h3>
        <p><strong>Ý nghĩa:</strong> Dùng với phủ định để nhấn mạnh sự ít ỏi, không đủ (Chỉ có...).</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>ローマ字しか書けません。(Tôi <strong>chỉ</strong> có thể viết được chữ Romaji - ngoài ra không viết được chữ khác)</li>
          <li>時間が10分しかありません。(<strong>Chỉ</strong> có 10 phút thôi - Cảm giác quá ít)</li>
        </ul>

        <h3>3. 見えます (miemasu) & 聞こえます (kikoemasu)</h3>
        <p><strong>Ý nghĩa:</strong></p>
        <ul>
          <li>見えます: Đập vào mắt, nhìn thấy một cách tự nhiên (không cần cố gắng).</li>
          <li>聞こえます: Lọt vào tai, nghe thấy một cách tự nhiên (không cần cố gắng).</li>
        </ul>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>窓から山が見えます。(Từ cửa sổ có thể nhìn thấy núi)</li>
          <li>隣の部屋から声が聞こえます。(Có thể nghe thấy tiếng nói từ phòng bên cạnh)</li>
        </ul>

        <h3>4. Trợ từ đối lập は...が、は...</h3>
        <p><strong>Ý nghĩa:</strong> So sánh đối lập giữa hai sự vật, sự việc.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>ひらがな<strong>は</strong>書けます<strong>が</strong>、漢字<strong>は</strong>書けません。(Hiragana <strong>thì</strong> viết được, <strong>nhưng</strong> Kanji <strong>thì</strong> không viết được)</li>
        </ul>

        <h3>5. できます (Hoàn thành / Xây xong / Được tạo ra)</h3>
        <p><strong>Ý nghĩa:</strong> Sự vật mới được hình thành, hoàn thành, xuất hiện.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>駅の前に大きいスーパーができました。(Một siêu thị lớn đã được xây xong ở trước nhà ga)</li>
          <li>晩ご飯ができました。(Bữa tối đã nấu xong rồi)</li>
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
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>空</td>
              <td>Không</td>
              <td>クウ / そら、あ(く)</td>
              <td>空気 (Không khí)<br/>空 (Bầu trời)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>業</td>
              <td>Nghiệp</td>
              <td>ギョウ / わざ</td>
              <td>授業 (Giờ học)<br/>工業 (Công nghiệp)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>鳥</td>
              <td>Điểu</td>
              <td>チョウ / とり</td>
              <td>鳥 (Con chim)<br/>小鳥 (Chim non)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>通</td>
              <td>Thông</td>
              <td>ツウ / とお(る)</td>
              <td>交通 (Giao thông)<br/>通る (Đi qua)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>運</td>
              <td>Vận</td>
              <td>ウン / はこ(ぶ)</td>
              <td>運動 (Vận động)<br/>運ぶ (Vận chuyển)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>転</td>
              <td>Chuyển</td>
              <td>テン / ころ(がる)</td>
              <td>自転車 (Xe đạp)<br/>運転 (Lái xe)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>力</td>
              <td>Lực</td>
              <td>リョク / ちから</td>
              <td>力 (Sức lực)<br/>電力 (Điện lực)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>色</td>
              <td>Sắc</td>
              <td>ショク / いろ</td>
              <td>色 (Màu sắc)<br/>景色 (Phong cảnh)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>味</td>
              <td>Vị</td>
              <td>ミ / あじ</td>
              <td>味 (Vị)<br/>意味 (Ý nghĩa)</td>
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
