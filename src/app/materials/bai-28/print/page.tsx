'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage28() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 28';
  }, []);

  return (
    <div style={{ fontFamily: '"Times New Roman", serif', color: '#000', background: '#fff', padding: '10px', maxWidth: '850px', margin: '0 auto', fontSize: '13pt', lineHeight: 1.6 }}>
      {/* CSS for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          table { page-break-inside: avoid; }
        }
        @page { margin: 1.5cm; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; vertical-align: middle; }
        th { background-color: #f5f5f5; font-weight: bold; font-size: 11pt; }
        h1, h2, h3 { color: #000; margin-top: 25px; margin-bottom: 10px; }
        h1 { font-size: 26pt; font-weight: bold; text-align: center; }
        h2 { font-size: 18pt; border-bottom: 2px solid #000; padding-bottom: 5px; margin-top: 35px; }
        h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; color: #111; }
        ul, ol { margin-top: 5px; margin-bottom: 15px; padding-left: 25px; }
        li { margin-bottom: 6px; }
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

      {/* Control buttons (hidden in print) */}
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
          <ruby>第<rt>だい</rt></ruby>28<ruby>課<rt>か</rt></ruby> - <ruby>学<rt>がく</rt></ruby><ruby>習<rt>しゅう</rt></ruby>テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Chủ đề: Hành Động Song Song, Thói Quen Hằng Ngày &amp; Liệt Kê Nguyên Nhân</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Minna no Nihongo II</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        
        <h3>1. Hành động song song đồng thời: V1-masu ながら V2 (Vừa làm V1 vừa làm V2)</h3>
        <p>
          <strong>Ý nghĩa:</strong> Diễn tả một chủ thể thực hiện đồng thời hai hành động trong cùng một khoảng thời gian.
        </p>
        <p>
          <strong>Cách chia:</strong> Động từ thứ nhất bỏ đuôi <code>ます</code> rồi cộng thêm đuôi <code>ながら</code>, đi kèm sau đó là động từ thứ hai.
        </p>
        <div className="note-box">
          <strong>⚠️ Chú ý về thứ tự động từ:</strong><br />
          Động từ đứng phía sau (<strong>V2</strong>) luôn là <strong>hành động chính</strong>, được người nói tập trung nhiều năng lượng hoặc ý chí vào đó hơn. Động từ đứng trước (<strong>V1</strong>) đóng vai trò là hành động phụ, kèm theo.
        </div>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>私はいつも<ruby>音楽<rt>おんがく</rt></ruby>を<strong>聞きながら</strong><ruby>勉強<rt>べんきょう</rt></ruby>します。</div>
            <div className="translation">Tôi luôn vừa nghe nhạc vừa học bài. (Việc học bài là chính, việc nghe nhạc chỉ là phụ trợ giải tỏa căng thẳng).</div>
          </li>
          <li className="example-item">
            <div><ruby>働<rt>はたら</rt></ruby><strong>きながら</strong><ruby>大学<rt>だいがく</rt></ruby>に<ruby>通<rt>かよ</rt></ruby>っています。</div>
            <div className="translation">Tôi vừa đi làm vừa đi học đại học. (Liệt kê một nếp sống thường nhật trong một khoảng thời gian dài).</div>
          </li>
          <li className="example-item">
            <div><ruby>運転<rt>うんてん</rt></ruby>し<strong>ながら</strong>スマホを<ruby>見<rt>み</rt></ruby>てはいけません。</div>
            <div className="translation">Không được phép vừa lái xe vừa nhìn màn hình điện thoại.</div>
          </li>
        </ul>

        <h3>2. Thói quen thường xuyên: V-te います</h3>
        <p>
          <strong>Ý nghĩa:</strong> Diễn tả một hành động, nếp sống hoặc một thói quen được lặp đi lặp lại thường xuyên hàng ngày như sở thích, nghề nghiệp, hoạt động tuần hoàn lâu dài của con người.
        </p>
        <div className="note-box">
          <strong>💡 Phân biệt 2 ý nghĩa của 「V-te います」:</strong><br />
          1. <strong>Đang diễn ra:</strong> Diễn tả hành động đang thực hiện ngay lúc nói. (VD: <code>今、本を読んでいます</code> - Bây giờ tôi đang đọc sách).<br />
          2. <strong>Thói quen:</strong> Diễn tả thói quen định kỳ lặp lại. (VD: <code>暇なとき、いつも本を読んでいます</code> - Khi rảnh rỗi tôi thường hay đọc sách).
        </div>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div><ruby>健康<rt>けんこう</rt></ruby>のために、<ruby>毎朝<rt>まいあさ</rt></ruby>ジョギングを<strong>しています</strong>。</div>
            <div className="translation">Vì sức khỏe, mỗi buổi sáng tôi đều chạy bộ.</div>
          </li>
          <li className="example-item">
            <div><ruby>週末<rt>しゅうまつ</rt></ruby>はいつもテニスを<strong>しています</strong>。</div>
            <div className="translation">Vào dịp cuối tuần, tôi thường đi đánh tennis.</div>
          </li>
          <li className="example-item">
            <div><ruby>暇<rt>ひま</rt></ruby>なとき、コーヒーを<ruby>飲<rt>の</rt></ruby>みながら本を<strong>読んでいます</strong>。</div>
            <div className="translation">Khi rảnh rỗi, tôi thường vừa nhâm nhi cà phê vừa đọc sách.</div>
          </li>
        </ul>

        <div className="page-break" />

        <h3>3. Liệt kê nhiều thuộc tính, lý do: Thể thông thường + し, Thể thông thường + し, ~</h3>
        <p>
          <strong>Ý nghĩa:</strong> Dùng để liệt kê nhiều thuộc tính, nguyên nhân, lý do của một sự vật, sự việc nào đó (thường từ 2 lý do trở lên) để từ đó dẫn tới một kết luận hoặc một sự đánh giá khách quan.
        </p>
        <p>
          <strong>Cách chia:</strong> Động từ, Tính từ đuôi -i ở thể thông thường (Plain form) + <code>し</code>. Tính từ đuôi -na và Danh từ ở thể thông thường đi kèm với <code>だ</code> + <code>し</code>.
        </p>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>このスーパーは<ruby>値段<rt>ねだん</rt></ruby>も<strong>安いし</strong>、<ruby>魚<rt>さかな</rt></ruby>も<strong>新鮮<rt>しんせん</rt>だし</strong>、いつもここで<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>をします。</div>
            <div className="translation">Siêu thị này giá cả vừa rẻ, cá lại tươi ngon, nên tôi lúc nào cũng đi chợ mua sắm ở đây.</div>
          </li>
          <li className="example-item">
            <div><ruby>彼<rt>かれ</rt></ruby>は<ruby>頭<rt>あたま</rt></ruby>も<strong>いいし</strong>、<ruby>親切<rt>しんせつ</rt>だし</strong>、それにスポーツもできますから、<ruby>人気<rt>にんき</rt></ruby>があります。</div>
            <div className="translation">Anh ấy vừa thông minh, vừa tốt bụng, thêm vào đó lại chơi được thể thao nên rất được mọi người yêu mến.</div>
          </li>
          <li className="example-item">
            <div>ここは<ruby>駅<rt>えき</rt></ruby>から<strong>近いし</strong>、<ruby>部屋<rt>へや</rt></ruby>も<strong>広いし</strong>、とてもいいマンションです。</div>
            <div className="translation">Căn hộ chung cư này vừa gần ga tàu, phòng ốc lại rộng rãi, đúng là một nơi ở lý tưởng.</div>
          </li>
        </ul>

        <h3>4. Trạng từ liên kết câu: それに (Hơn nữa) và それで (Vì thế)</h3>
        <ul>
          <li>
            <strong>それに (Hơn nữa / Thêm vào đó):</strong> Dùng để bổ sung thêm một lý do hoặc một thuộc tính tích cực/tiêu cực đồng nhất vào câu văn trước đó.
            <div style={{ marginLeft: '15px', fontStyle: 'italic', margin: '5px 0' }}>
              - この<ruby>店<rt>みせ</rt></ruby>は<ruby>料理<rt>りょうり</rt></ruby>が美味しいです。<strong>それに</strong>、<ruby>値段<rt>ねだん</rt></ruby>も安いです。<br />
              (Nhà hàng này đồ ăn rất ngon. Hơn thế nữa, giá cả lại vô cùng phải chăng.)
            </div>
          </li>
          <li>
            <strong>それで (Vì vậy / Do đó):</strong> Dùng để kết nối mối quan hệ nguyên nhân - kết quả. Câu đi trước là nguyên nhân, câu đi sau từ nối <code>それで</code> là kết quả dẫn tới.
            <div style={{ marginLeft: '15px', fontStyle: 'italic', margin: '5px 0' }}>
              - <ruby>昨日<rt>きのう</rt></ruby>は<ruby>風邪<rt>かぜ</rt></ruby>をひきました。<strong>それで</strong>、学校を<ruby>休<rt>やす</rt></ruby>みました。<br />
              (Ngày hôm qua tôi bị mắc cảm cúm. Do đó, tôi đã xin phép nghỉ học.)
            </div>
          </li>
        </ul>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 28)</h2>
        <p style={{margin: '5px 0 15px 0', fontSize: '11pt', color: '#444'}}>
          Học viên cần ghi nhớ âm Hán Việt, cách đọc âm On/Kun và các câu ví dụ minh họa của từng Hán tự dưới đây:
        </p>
        <table>
          <thead>
            <tr>
              <th style={{ width: '12%', textAlign: 'center' }}>Hán tự</th>
              <th style={{ width: '13%', textAlign: 'center' }}>Hán Việt</th>
              <th style={{ width: '25%' }}>Onyomi / Kunyomi</th>
              <th style={{ width: '50%' }}>Từ vựng tiêu biểu &amp; Câu ví dụ minh họa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>勝</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THẮNG</td>
              <td>ショウ<br />か(つ)</td>
              <td>
                <strong><ruby>勝<rt>か</rt></ruby>つ (Chiến thắng)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 今日の試合は絶対に<ruby>勝<rt>か</rt></ruby>ちます。<br />
                  (Trận thi đấu ngày hôm nay chúng tôi nhất định sẽ giành chiến thắng.)
                </div>
                <strong><ruby>決勝<rt>けっしょう</rt></ruby> (Vòng chung kết)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: いよいよ明日、サッカーの<ruby>決勝<rt>けっしょう</rt></ruby>が行われます。<br />
                  (Cuối cùng thì ngày mai trận chung kết bóng đá sẽ được diễn ra.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>負</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>PHỤ</td>
              <td>フ<br />ま(ける)</td>
              <td>
                <strong><ruby>負<rt>ま</rt></ruby>ける (Thất bại / Thua cuộc)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 試合に<ruby>負<rt>ま</rt></ruby>けて、とても悔しかったです。<br />
                  (Vì thua cuộc trong trận đấu nên tôi đã vô cùng nuối tiếc.)
                </div>
                <strong><ruby>勝負<rt>しょうぶ</rt></ruby> (Thắng thua / Phân tài cao thấp)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: どちらが勝つか、最後まで<ruby>勝負<rt>しょうぶ</rt></ruby>がわかりません。<br />
                  (Ai thắng ai bại, cho đến phút cuối vẫn chưa thể phân tài cao thấp.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>野</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>DÃ</td>
              <td>ヤ<br />の</td>
              <td>
                <strong><ruby>分野<rt>ぶんや</rt></ruby> (Lĩnh vực)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 彼はITの<ruby>分野<rt>ぶんや</rt></ruby>で働いています。<br />
                  (Anh ấy đang làm việc trong lĩnh vực công nghệ thông tin.)
                </div>
                <strong><ruby>野原<rt>のはら</rt></ruby> (Cánh đồng / Thảo nguyên)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>野原<rt>のはら</rt></ruby>に美しい花がたくさん咲いています。<br />
                  (Trên cánh đồng có rất nhiều loài hoa đẹp đang đua nhau nở.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>菜</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THÁI</td>
              <td>サイ<br />な</td>
              <td>
                <strong><ruby>野菜<rt>やさい</rt></ruby> (Rau củ quả)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: 健康のために、毎日たくさん<ruby>野菜<rt>やさい</rt></ruby>を食べます。<br />
                  (Để tốt cho sức khỏe, tôi ăn thật nhiều rau xanh mỗi ngày.)
                </div>
                <strong><ruby>青菜<rt>あおな</rt></ruby> (Rau xanh nói chung)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>市場<rt>いちば</rt></ruby>で新鮮な<ruby>青菜<rt>あおな</rt></ruby>を買いました。<br />
                  (Tôi đã mua rau xanh tươi ngon ở khu chợ.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>投</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐẦU</td>
              <td>トウ<br />な(げる)</td>
              <td>
                <strong><ruby>投<rt>な</rt></ruby>げる (Ném đi / Quăng đi)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: ボールを遠くへ<ruby>投<rt>な</rt></ruby>げてください。<br />
                  (Làm ơn hãy ném quả bóng đi thật xa ra kia.)
                </div>
                <strong><ruby>投手<rt>とうしゅ</rt></ruby> (Cầu thủ ném bóng - Bóng chày)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: 彼は高校野球の有名な<ruby>投手<rt>とうしゅ</rt></ruby>です。<br />
                  (Cậu ấy là cầu thủ ném bóng nổi tiếng của đội bóng chày cấp ba.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>打</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐẢ</td>
              <td>ダ<br />う(つ)</td>
              <td>
                <strong><ruby>打<rt>う</rt></ruby>つ (Đánh / Gõ phím)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: パソコンでメールを<ruby>打<rt>う</rt></ruby>っています。<br />
                  (Tôi đang gõ bàn phím viết thư điện tử trên máy tính.)
                </div>
                <strong><ruby>打楽器<rt>だがっき</rt></ruby> (Nhạc cụ gõ - Trống...)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: ドラムは<ruby>代表的<rt>だいひょうてき</rt></ruby>な<ruby>打楽器<rt>だがっき</rt></ruby>です。<br />
                  (Trống là nhạc cụ gõ tiêu biểu nhất.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>路</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LỘ</td>
              <td>ロ<br />じ</td>
              <td>
                <strong><ruby>道路<rt>どうろ</rt></ruby> (Đường đi / Đường lộ)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>日本<rt>にほん</rt></ruby>の<ruby>道路<rt>どうろ</rt></ruby>はきれいですね。<br />
                  (Đường sá của Nhật Bản thật là sạch đẹp.)
                </div>
                <strong><ruby>線路<rt>せんろ</rt></ruby> (Đường ray tàu hỏa)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>危<rt>あぶ</rt></ruby>ないですから、<ruby>線路<rt>せんろ</rt></ruby>に入ってはいけません。<br />
                  (Vì rất nguy hiểm nên tuyệt đối không được phép đi vào đường ray tàu.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>旅</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LỮ</td>
              <td>リョ<br />たび</td>
              <td>
                <strong><ruby>旅行<rt>りょこう</rt></ruby> (Du lịch)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>夏休み<rt>なつやすみ</rt></ruby>に北海道へ<ruby>旅行<rt>りょこう</rt></ruby>します。<br />
                  (Kỳ nghỉ hè tôi sẽ đi du lịch đến vùng Hokkaido.)
                </div>
                <strong><ruby>旅人<rt>たびびと</rt></ruby> (Lữ khách / Khách lãng du)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: 昔、多くの<ruby>旅人<rt>たびびと</rt></ruby>がこの道を通りました。<br />
                  (Ngày xưa, rất nhiều lữ khách đã đi qua con đường này.)
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <footer style={{ marginTop: '40px', borderTop: '1px solid #000', paddingTop: '15px', fontSize: '10pt', textAlign: 'center', color: '#444' }}>
        <p>© Tài liệu giảng dạy Minna no Nihongo II - Lưu hành nội bộ - Hidaya School</p>
      </footer>
    </div>
  );
}
