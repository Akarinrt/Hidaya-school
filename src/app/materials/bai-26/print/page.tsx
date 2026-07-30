'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage26() {
  useEffect(() => {
    document.title = 'Tài liệu In ấn - Bài 26';
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
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24pt' }}>Tài liệu Học tập - Bài 26</h1>
        <p style={{ margin: 0, fontStyle: 'italic' }}>Chủ đề: Thể thông thường + んです</p>
      </header>

      <section>
        <h2 className="section-title">I. Tóm tắt Ngữ pháp</h2>
        
        <h3>1. ~ んです (Giải thích, nhấn mạnh lý do)</h3>
        <p><strong>Ý nghĩa:</strong> Dùng để nhấn mạnh, giải thích, hoặc thuyết minh lý do cho một hành động, trạng thái. Thường dùng trong văn nói hàng ngày.</p>
        <p><strong>Cách chia:</strong> Động từ/Tính từ/Danh từ ở <strong>Thể thông thường (Plain form)</strong> + んです. (Chú ý: Tính từ -na và Danh từ thêm <strong>な</strong> + んです).</p>
        <ul>
          <li>行きます ➔ 行くんです</li>
          <li>寒いです ➔ 寒いんです</li>
          <li>暇です ➔ 暇なんです</li>
          <li>雨です ➔ 雨なんです</li>
        </ul>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>どうして遅れたんですか。(Tại sao em lại đi muộn thế?)</li>
          <li>バスが muộn (遅れた) んです。(Tại vì xe buýt đến muộn ạ)</li>
        </ul>

        <h3>2. ~ ていただけませんか (Yêu cầu lịch sự)</h3>
        <p><strong>Ý nghĩa:</strong> Yêu cầu, nhờ vả ai đó làm gì giúp mình một cách lịch sự, nhẹ nhàng hơn so với ~てください.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>日本語を教えていただけませんか。(Anh/chị có thể dạy tiếng Nhật cho tôi được không?)</li>
          <li>塩を取っていただけませんか。(Anh/chị làm ơn lấy giúp tôi lọ muối được không?)</li>
        </ul>

        <h3>3. ~ んですが、~たらいいですか (Xin lời khuyên)</h3>
        <p><strong>Ý nghĩa:</strong> Trình bày tình huống hiện tại rồi hỏi xin ý kiến, lời khuyên (Tôi nên làm thế nào thì tốt?).</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>パスポートをなくしたんですが、 làm thế nào (どうしたら) いいですか。(Tôi bị mất hộ chiếu rồi, giờ tôi nên làm thế nào thì tốt?)</li>
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
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>悪</td>
              <td>Ác</td>
              <td>アク / わる(い)</td>
              <td>悪い (Xấu, tồi)<br/>悪口 (Nói xấu)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>急</td>
              <td>Cấp</td>
              <td>キュウ / いそ(ぐ)</td>
              <td>急ぐ (Vội vã)<br/>急行 (Tàu tốc hành)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>去</td>
              <td>Khứ</td>
              <td>キョ、コ / さ(る)</td>
              <td>去年 (Năm ngoái)<br/>過去 (Quá khứ)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>紙</td>
              <td>Chỉ</td>
              <td>シ / かみ</td>
              <td>紙 (Giấy)<br/>手紙 (Thư tay)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>首</td>
              <td>Thủ</td>
              <td>シュ / くび</td>
              <td>首 (Cổ)<br/>首都 (Thủ đô)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>県</td>
              <td>Huyện</td>
              <td>ケン / —</td>
              <td>Tỉnh (Đơn vị hành chính Nhật)<br/>県知事 (Tỉnh trưởng)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>都</td>
              <td>Đô</td>
              <td>ト、ツ / みやこ</td>
              <td>都市 (Đô thị)<br/>京都 (Kyoto)</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold' }}>速</td>
              <td>Tốc</td>
              <td>ソク / はや(い)</td>
              <td>速い (Nhanh)<br/>速度 (Tốc độ)</td>
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
