'use client';
import React, { useEffect } from 'react';

export default function MaterialPrintPage() {
  useEffect(() => {
    document.title = 'Tài liệu Học tập & In ấn (A4) - Bài 27';
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
          <ruby>第<rt>だい</rt></ruby>27<ruby>課<rt>か</rt></ruby> - <ruby>学<rt>がく</rt></ruby><ruby>習<rt>しゅう</rt></ruby>テキスト
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14pt', fontWeight: 'bold' }}>Chủ đề: Thể Khả Năng (可能形), Sự Khác Biệt Giữa Giác Quan &amp; Trợ Từ Đối Lập</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11pt', fontStyle: 'italic', color: '#555' }}>Tài liệu giảng dạy chuẩn hóa - Minna no Nihongo II</p>
      </header>

      <section>
        <h2 style={{marginTop: '0'}}>I. Phân Tích Ngữ Pháp Chi Tiết (文法解説)</h2>
        
        <h3>1. Thể Khả năng (<ruby>可能形<rt>かのうけい</rt></ruby> - Kanoukei)</h3>
        <p>
          <strong>Ý nghĩa:</strong> Diễn tả khả năng hay năng lực của một người trong việc thực hiện hành động nào đó (Ví dụ: Biết bơi, nói được tiếng Nhật) hoặc biểu thị điều kiện hoàn cảnh cho phép thực hiện hành động (Ví dụ: Tại siêu thị này có thể mua bằng thẻ tín dụng).
        </p>
        <p><strong>Quy tắc chia chi tiết:</strong></p>
        <ul>
          <li>
            <strong>Nhóm I:</strong> Chuyển nguyên âm hàng <code>[i]</code> trước <code>ます</code> thành nguyên âm hàng <code>[e]</code> rồi cộng thêm <code>ます</code>.
            <div style={{ marginLeft: '15px', fontStyle: 'italic', margin: '5px 0' }}>
              - <ruby>書<rt>か</rt></ruby>きます (Viết) ➔ <ruby>書<rt>か</rt></ruby>けます (Có thể viết)<br />
              - <ruby>泳<rt>およ</rt></ruby>ぎます (Bơi) ➔ <ruby>泳<rt>およ</rt></ruby>げます (Có thể bơi)<br />
              - <ruby>話<rt>はな</rt></ruby>します (Nói) ➔ <ruby>話<rt>はな</rt></ruby>せます (Có thể nói)<br />
              - <ruby>待<rt>ま</rt></ruby>ちます (Chờ) ➔ <ruby>待<rt>ま</rt></ruby>てます (Có thể chờ)<br />
              - <ruby>読<rt>よ</rt></ruby>みます (Đọc) ➔ <ruby>読<rt>よ</rt></ruby>めます (Có thể đọc)
            </div>
          </li>
          <li>
            <strong>Nhóm II:</strong> Bỏ đuôi <code>ます</code> rồi cộng thêm đuôi <code>られます</code>.
            <div style={{ marginLeft: '15px', fontStyle: 'italic', margin: '5px 0' }}>
              - <ruby>食<rt>た</rt></ruby>べます (Ăn) ➔ <ruby>食<rt>た</rt></ruby>べられます (Có thể ăn)<br />
              - <ruby>見<rt>み</rt></ruby>ます (Xem) ➔ <ruby>見<rt>み</rt></ruby>られます (Có thể xem)<br />
              - <ruby>寝<rt>ね</rt></ruby>ます (Ngủ) ➔ <ruby>寝<rt>ね</rt></ruby>られます (Có thể ngủ)
            </div>
            <div style={{ fontSize: '10.5pt', color: '#555', marginTop: '5px' }}>
              * <em>Lưu ý thực tế (ら抜き言葉 - Lược bỏ chữ "ra"):</em> Trong hội thoại đời thường, người Nhật thường nói tắt <code>食べられます</code> thành <code>食べれます</code>, <code>見られます</code> thành <code>見れます</code>. Tuy nhiên trong thi cử viết hoặc văn phong trang trọng, vẫn bắt buộc viết đủ là <code>られます</code>.
            </div>
          </li>
          <li>
            <strong>Nhóm III:</strong> Các trường hợp đặc biệt biến đổi hoàn toàn.
            <div style={{ marginLeft: '15px', fontStyle: 'italic', margin: '5px 0' }}>
              - します (Làm) ➔ できます (Có thể làm)<br />
              - <ruby>来<rt>き</rt></ruby>ます (Đến) ➔ <ruby>来<rt>こ</rt></ruby>られます (Có thể đến)
            </div>
          </li>
        </ul>

        <div className="note-box">
          <strong>⚠️ Thay đổi trợ từ cực kỳ quan trọng:</strong><br />
          Khi chuyển câu văn sang thể khả năng, đối tượng trực tiếp nhận tác động của hành động vốn đi với trợ từ <strong>を</strong> sẽ được đổi thành trợ từ <strong>が</strong>. Các trợ từ khác như <code>に</code>, <code>で</code>, <code>へ</code>, <code>から</code> vẫn được giữ nguyên.
          <br />
          - <ruby>日本語<rt>にほんご</rt></ruby><strong>を</strong><ruby>話<rt>はな</rt></ruby>します。 (Tôi nói tiếng Nhật.) ➔ <ruby>日本語<rt>にほんご</rt></ruby><strong>が</strong><ruby>話<rt>はな</rt></ruby>せます。 (Tôi có thể nói tiếng Nhật.)
        </div>

        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>私は<ruby>漢字<rt>かんじ</rt></ruby>が100<ruby>字<rt>じ</rt></ruby>ぐらい<ruby>書<rt>か</rt></ruby>けます。</div>
            <div className="translation">Tôi có thể viết được khoảng 100 chữ Hán tự.</div>
          </li>
          <li className="example-item">
            <div><ruby>忙<rt>いそが</rt></ruby>しいですから、<ruby>旅行<rt>りょこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>けません。</div>
            <div className="translation">Vì bận rộn nên tôi không thể đi du lịch được.</div>
          </li>
          <li className="example-item">
            <div><ruby>簡単<rt>かんたん</rt></ruby>な<ruby>料理<rt>りょうり</rt></ruby>なら、<ruby>自分<rt>じぶん</rt></ruby>で<ruby>作<rt>つく</rt></ruby>れます。</div>
            <div className="translation">Nếu là món ăn đơn giản thì tôi có thể tự mình nấu được.</div>
          </li>
          <li className="example-item">
            <div>この<ruby>銀行<rt>ぎんこう</rt></ruby>でドルがチェンジできます。</div>
            <div className="translation">Ở ngân hàng này có thể đổi được đồng Đô-la.</div>
          </li>
        </ul>

        <div className="page-break" />

        <h3>2. Phân biệt: 見えます/聞こえます (Giác quan tự nhiên) và 見られます/聞けます (Thể khả năng)</h3>
        <p>
          Đây là cặp ngữ pháp học sinh hay nhầm lẫn nhất. Bản chất khác biệt nằm ở <strong>ý chí của con người và nguồn gốc âm thanh/hình ảnh</strong>:
        </p>
        
        <table style={{marginTop: '10px'}}>
          <thead>
            <tr>
              <th style={{ width: '50%' }}><ruby>見<rt>み</rt></ruby>えます / <ruby>聞こ<rt>きこ</rt></ruby>えます (Tự nhiên)</th>
              <th style={{ width: '50%' }}><ruby>見<rt>み</rt></ruby>られます / <ruby>聞<rt>き</rt></ruby>けます (Ý chí/Điều kiện)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                - Âm thanh/Hình ảnh lọt vào tai/mắt một cách <strong>khách quan, tự nhiên</strong> mà người nghe không cần nỗ lực hay có ý định từ trước.<br />
                - Do cơ quan giác quan hoạt động bình thường.<br />
                - <em>Ví dụ:</em> Đứng trong phòng nghe tiếng chim hót ngoài vườn.
              </td>
              <td>
                - Việc xem/nghe có thực hiện được hay không phụ thuộc vào <strong>ý muốn chủ quan, hành động hoặc điều kiện hoàn cảnh cho phép</strong>.<br />
                - Muốn xem/nghe thì phải hành động hoặc có phương tiện.<br />
                - <em>Ví dụ:</em> Có vé mới xem được phim, có internet mới nghe được nhạc.
              </td>
            </tr>
          </tbody>
        </table>

        <p><strong>Các ví dụ đối chiếu trực quan:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div><ruby>窓<rt>まど</rt></ruby>から<ruby>綺麗<rt>きれい</rt></ruby>な<ruby>海<rt>うみ</rt></ruby>が<strong><ruby>見<rt>み</rt></ruby>えます</strong>。</div>
            <div className="translation">Từ cửa sổ có thể nhìn thấy bãi biển đẹp. (Bãi biển tự lọt vào tầm mắt khi mở cửa sổ ra).</div>
          </li>
          <li className="example-item">
            <div>ベトナムではこの<ruby>映画<rt>えいが</rt></ruby>が<strong><ruby>見<rt>み</rt></ruby>られます</strong>。</div>
            <div className="translation">Ở Việt Nam có thể xem được bộ phim này. (Phải ra rạp chiếu phim hoặc mở tivi lên mới xem được).</div>
          </li>
          <li className="example-item">
            <div><ruby>雨<rt>あめ</rt></ruby>の<ruby>音<rt>おと</rt></ruby>が<strong><ruby>聞こ<rt>きこ</rt></ruby>えます</strong>。</div>
            <div className="translation">Tôi nghe thấy tiếng mưa rơi. (Tiếng mưa tự lọt vào tai một cách tự nhiên).</div>
          </li>
          <li className="example-item">
            <div>ラジオで<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>が<strong><ruby>聞<rt>き</rt></ruby>けます</strong>。</div>
            <div className="translation">Có thể nghe thấy bài giảng tiếng Nhật qua đài Radio. (Phải bật đài và có ý muốn nghe).</div>
          </li>
        </ul>

        <h3>3. Giới hạn chỉ có: ~ しか ~ ません</h3>
        <p>
          <strong>Ý nghĩa:</strong> Biểu thị giới hạn duy nhất, mang sắc thái cảm xúc tiêu cực là <strong>chê ít, không đủ, tiếc nuối</strong> so với kỳ vọng ban đầu.
        </p>
        <p>
          <strong>Cách dùng:</strong> <code>しか</code> luôn đứng trước động từ dạng <strong>phủ định (ません)</strong>. Trợ từ <code>が</code> và <code>を</code> khi đi kèm <code>しか</code> bắt buộc bị lược bỏ. Các trợ từ khác đứng trước <code>しか</code>.
        </p>
        <div className="note-box">
          <strong>So sánh giữa しか (Phủ định) và だけ (Khẳng định):</strong><br />
          - <code>だけ</code> đi kèm khẳng định: Diễn tả sự thật khách quan (Ví dụ: "Tôi có 100 Yên." - bình thường).<br />
          - <code>しか</code> đi kèm phủ định: Nhấn mạnh sự ít ỏi (Ví dụ: "Tôi chỉ có 100 Yên thôi." - cảm giác quá ít, không đủ mua gì).
        </div>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>私はひらがな<strong>しか</strong><ruby>書<rt>か</rt></ruby>け<strong>ません</strong>。</div>
            <div className="translation">Tôi chỉ có thể viết được chữ Hiragana mà thôi. (Kanji và Katakana tôi không thể viết được, tự thấy tiếc).</div>
          </li>
          <li className="example-item">
            <div><ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>に<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>が１つ<strong>しか</strong>あり<strong>ません</strong>。</div>
            <div className="translation">Trong tủ lạnh chỉ còn lại đúng một hộp sữa thôi. (Không đủ cho cả nhà uống).</div>
          </li>
          <li className="example-item">
            <div><ruby>日曜日<rt>にちようび</rt></ruby><strong>しか</strong><ruby>休<rt>やす</rt></ruby>め<strong>ません</strong>。</div>
            <div className="translation">Tôi chỉ có thể được nghỉ ngơi vào mỗi ngày Chủ Nhật. (Công việc quá bận rộn).</div>
          </li>
        </ul>

        <div className="page-break" />

        <h3>4. Trợ từ đối lập: は...が、は... (So sánh tương phản)</h3>
        <p>
          <strong>Ý nghĩa:</strong> Đặt hai sự việc có tính tương phản, đối lập lên bàn cân để làm rõ sự khác biệt. Trợ từ <code>は</code> được đưa vào để nhấn mạnh chủ thể đối chiếu.
        </p>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div>ひらがな<strong>は</strong><ruby>書<rt>か</rt></ruby>けます<strong>が</strong>、<ruby>漢字<rt>かんじ</rt></ruby><strong>は</strong><ruby>書<rt>か</rt></ruby>けません。</div>
            <div className="translation">Chữ Hiragana thì tôi viết được, nhưng chữ Kanji thì tôi không thể viết được.</div>
          </li>
          <li className="example-item">
            <div>お<ruby>酒<rt>さけ</rt></ruby><strong>は</strong><ruby>飲<rt>の</rt></ruby>めます<strong>が</strong>、ビール<strong>は</strong><ruby>飲<rt>の</rt></ruby>めません。</div>
            <div className="translation">Rượu thì tôi uống được, nhưng bia thì tôi không thể uống nổi.</div>
          </li>
          <li className="example-item">
            <div>テニス<strong>は</strong>できます<strong>が</strong>、スキー<strong>は</strong>できません。</div>
            <div className="translation">Tennis thì tôi chơi được, chứ trượt tuyết thì tôi chịu.</div>
          </li>
        </ul>

        <h3>5. Động từ <ruby>完成<rt>かんせい</rt></ruby> nghĩa là "xây xong / hoàn thành": できます</h3>
        <p>
          Ngoài nghĩa là thể khả năng của <code>します</code>, động từ <code>できます</code> khi đi cùng danh từ còn mang ý nghĩa là một công trình, sự vật hay một trạng thái mới <strong>đã được hoàn thành, xây dựng xong hoặc hình thành</strong>.
        </p>
        <p><strong>Các ví dụ mở rộng:</strong></p>
        <ul className="example-list">
          <li className="example-item">
            <div><ruby>駅<rt>えき</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>新<rt>あたら</rt></ruby>しいスーパーが<strong>できました</strong>。</div>
            <div className="translation">Trước nhà ga đã xây xong một siêu thị mới tinh.</div>
          </li>
          <li className="example-item">
            <div>もうすぐ<ruby>宿題<rt>しゅくだい</rt></ruby>が<strong>できます</strong>。</div>
            <div className="translation">Tôi sắp làm xong bài tập về nhà rồi.</div>
          </li>
          <li className="example-item">
            <div><ruby>大学<rt>だいがく</rt></ruby>でいい<ruby>友達<rt>ともだち</rt></ruby>がたくさん<strong>できました</strong>。</div>
            <div className="translation">Tôi đã kết bạn được với rất nhiều người bạn tốt ở trường đại học.</div>
          </li>
        </ul>
      </section>

      <div className="page-break" />

      <section>
        <h2 className="section-title">II. Danh Sách Kanji (Hán tự Bài 27)</h2>
        <p style={{margin: '5px 0 15px 0', fontSize: '11pt', color: '#444'}}>
          Học viên cần ghi nhớ âm Hán Việt, cách đọc âm On/Kun và ngữ cảnh ứng dụng của từng Hán tự dưới đây:
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
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>空</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>KHÔNG</td>
              <td>クウ<br />そら、あ(く)</td>
              <td>
                <strong><ruby>空気<rt>くうき</rt></ruby> (Không khí)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: この<ruby>部屋<rt>へや</rt></ruby>は<ruby>空気<rt>くうき</rt></ruby>がとてもきれいです。<br />
                  (Không khí của phòng này vô cùng trong lành.)
                </div>
                <strong><ruby>空<rt>そら</rt></ruby> (Bầu trời)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>青<rt>あお</rt></ruby>い<ruby>空<rt>そら</rt></ruby>に<ruby>鳥<rt>とり</rt></ruby>がたくさん<ruby>飛<rt>と</rt></ruby>んでいます。<br />
                  (Trên bầu trời xanh có rất nhiều chim đang bay.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>業</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>NGHIỆP</td>
              <td>ギョウ<br />わざ</td>
              <td>
                <strong><ruby>授業<rt>じゅぎょう</rt></ruby> (Giờ học)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: もうすぐ<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>が<ruby>始<rt>はじ</rt></ruby>まります。<br />
                  (Giờ học tiếng Nhật chuẩn bị bắt đầu rồi.)
                </div>
                <strong><ruby>工業<rt>こうぎょう</rt></ruby> (Công nghiệp)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: 日本は<ruby>工業<rt>こうぎょう</rt></ruby>がとても<ruby>進<rt>すす</rt></ruby>んでいる<ruby>国<rt>くに</rt></ruby>です。<br />
                  (Nhật Bản là một đất nước có nền công nghiệp rất phát triển.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>鳥</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐIỂU</td>
              <td>チョウ<br />とり</td>
              <td>
                <strong><ruby>鳥<rt>とり</rt></ruby> (Con chim)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>朝<rt>あさ</rt></ruby>早くから<ruby>鳥<rt>とり</rt></ruby>が<ruby>鳴<rt>な</rt></ruby>いています。<br />
                  (Chim đang hót từ sáng sớm tinh mơ.)
                </div>
                <strong><ruby>小鳥<rt>ことり</rt></ruby> (Chim non)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>庭<rt>にわ</rt></ruby>の<ruby>木<rt>き</rt></ruby>で<ruby>小鳥<rt>ことり</rt></ruby>が<ruby>歌<rt>うた</rt></ruby>っています。<br />
                  (Ngoài cây trong vườn, chú chim non đang líu lo hót.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>通</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>THÔNG</td>
              <td>ツウ<br />とお(る)、かよ(う)</td>
              <td>
                <strong><ruby>交通<rt>こうつう</rt></ruby> (Giao thông)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: ベトナムは<ruby>朝<rt>あさ</rt></ruby>の<ruby>交通<rt>こうつう</rt></ruby>がとても<ruby>複雑<rt>ふくざつ</rt></ruby>です。<br />
                  (Giao thông ở Việt Nam vào buổi sáng rất phức tạp.)
                </div>
                <strong><ruby>通<rt>とお</rt></ruby>る (Đi qua)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: このバスは<ruby>駅<rt>えき</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>を<ruby>通<rt>とお</rt></ruby>ります。<br />
                  (Tuyến xe buýt này đi qua khu vực trước nhà ga.)
                </div>
                <strong><ruby>通<rt>かよ</rt></ruby>う (Đi học / Đi làm thường xuyên)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: 私は毎日バイクで<ruby>大学<rt>だいがく</rt></ruby>に<ruby>通<rt>かよ</rt></ruby>っています。<br />
                  (Tôi đi học đại học bằng xe máy hằng ngày.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>運</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VẬN</td>
              <td>ウン<br />はこ(ぶ)</td>
              <td>
                <strong><ruby>運動<rt>うんどう</rt></ruby> (Vận động)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>体<rt>からだ</rt></ruby>のために<ruby>毎日<rt>まいにち</rt></ruby><ruby>運動<rt>うんどう</rt></ruby>したほうがいいです。<br />
                  (Bạn nên vận động mỗi ngày để tốt cho cơ thể.)
                </div>
                <strong><ruby>運<rt>はこ</rt></ruby>ぶ (Vận chuyển)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: このテーブルを<ruby>二階<rt>にかい</rt></ruby>へ<ruby>運<rt>はこ</rt></ruby>んでください。<br />
                  (Xin hãy vận chuyển giúp tôi cái bàn này lên tầng 2.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>転</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>CHUYỂN</td>
              <td>テン<br />ころ(がる)</td>
              <td>
                <strong><ruby>運転<rt>うんてん</rt></ruby> (Lái xe)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>彼<rt>かれ</rt></ruby>は<ruby>車<rt>くるま</rt></ruby>の<ruby>運転<rt>うんてん</rt></ruby>がとても上手です。<br />
                  (Anh ấy lái xe ô tô rất giỏi.)
                </div>
                <strong><ruby>自転車<rt>じてんしゃ</rt></ruby> (Xe đạp)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: 毎日<ruby>自転車<rt>じてんしゃ</rt></ruby>で<ruby>学校<rt>がっこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。<br />
                  (Hằng ngày tôi đến trường bằng xe đạp.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>力</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>LỰC</td>
              <td>リョク、リキ<br />ちから</td>
              <td>
                <strong><ruby>力<rt>ちから</rt></ruby> (Sức lực)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: <ruby>力<rt>ちから</rt></ruby>を合わせて、この<ruby>仕事<rt>しごと</rt></ruby>をやりましょう。<br />
                  (Chúng ta hãy cùng chung sức để hoàn thành công việc này.)
                </div>
                <strong><ruby>電力<rt>でんりょく</rt></ruby> (Điện lực)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>夏<rt>なつ</rt></ruby>は<ruby>電力<rt>でんりょく</rt></ruby>が<ruby>不足<rt>ふそく</rt></ruby>しやすいです。<br />
                  (Vào mùa hè điện lực thường rất dễ bị thiếu hụt.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>色</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>SẮC</td>
              <td>ショク、シキ<br />いろ</td>
              <td>
                <strong><ruby>色<rt>いろ</rt></ruby> (Màu sắc)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: このシャツはとてもいい<ruby>色<rt>いろ</rt></ruby>をしていますね。<br />
                  (Chiếc áo sơ mi này có màu sắc thật là đẹp.)
                </div>
                <strong><ruby>景色<rt>けしき</rt></ruby> (Phong cảnh)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: <ruby>山<rt>やま</rt></ruby>の上から<ruby>見<rt>み</rt></ruby>る<ruby>景色<rt>けしき</rt></ruby>はすばらしいです。<br />
                  (Phong cảnh nhìn từ đỉnh núi xuống thật là tuyệt vời.)
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '26pt', fontWeight: 'bold' }}>味</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>VỊ</td>
              <td>ミ<br />あじ</td>
              <td>
                <strong><ruby>味<rt>あじ</rt></ruby> (Mùi vị)</strong>
                <div className="translation" style={{ marginLeft: '10px', marginBottom: '8px' }}>
                  例: この<ruby>料理<rt>りょうり</rt></ruby>はどんな<ruby>味<rt>あじ</rt></ruby>がしますか。<br />
                  (Món ăn này có mùi vị như thế nào?)
                </div>
                <strong><ruby>意味<rt>いみ</rt></ruby> (Ý nghĩa)</strong>
                <div className="translation" style={{ marginLeft: '10px' }}>
                  例: この<ruby>言葉<rt>ことば</rt></ruby>の<ruby>意味<rt>いみ</rt></ruby>を<ruby>辞書<rt>じしょ</rt></ruby>で<ruby>調<rt>しら</rt></ruby>べました。<br />
                  (Tôi đã tra từ điển để tìm hiểu ý nghĩa của từ này.)
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
