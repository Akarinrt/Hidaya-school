import os
import json

base_dir = r"d:\Giáo án\japanese-lms\public\slides"

template = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ngữ Pháp {lesson}</title>
    
    <!-- Reveal.js & Theme -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/theme/simple.min.css">
    
    <style>
        :root {{
            --primary: #4A6CF7;
            --danger: #DC3D3D;
            --success: #1D9A5C;
            --surface: #ffffff;
            --bg: #F7F5F2;
        }}
        body {{ background: var(--bg); font-family: 'Noto Sans JP', sans-serif; }}
        .title-slide h1 {{ color: var(--primary); font-weight: 800; font-size: 2.5em; text-transform: uppercase; }}
        .title-slide h3 {{ color: #555; font-size: 1.2em; }}
        
        .section-title {{
            color: var(--primary); font-weight: bold; font-size: 1.8em; margin-bottom: 20px;
            border-bottom: 3px solid var(--primary); display: inline-block; padding-bottom: 5px;
        }}
        
        .box-highlight {{
            background: var(--surface);
            border-left: 8px solid var(--primary);
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: left;
        }}
        
        .grammar-example {{
            background: var(--surface);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
            text-align: left;
            font-size: 1.1em;
        }}
        
        .grammar-example p {{ margin: 10px 0; font-size: 1.2em; }}
        .grammar-example .trans {{ color: #666; font-size: 0.85em; font-style: italic; display: block; margin-top: 5px; }}
        
        .quiz-box {{
            background: #FAFAFA;
            border: 2px dashed var(--danger);
            padding: 25px;
            border-radius: 12px;
            text-align: left;
            margin-bottom: 20px;
        }}
        .quiz-title {{ font-weight: bold; color: var(--danger); margin-bottom: 15px; font-size: 1.3em; }}
        .quiz-q {{ font-size: 1.1em; margin-bottom: 15px; font-weight: bold; }}
        
        .answer-btn {{
            background: var(--danger);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9em;
            margin-top: 10px;
            transition: 0.2s;
            font-weight: bold;
        }}
        .answer-btn:hover {{ opacity: 0.8; transform: scale(1.05); }}
        .answer-content {{
            display: none;
            color: var(--success);
            font-weight: bold;
            margin-top: 15px;
            padding: 15px;
            background: #eef9f2;
            border-radius: 8px;
            font-size: 1.1em;
            border-left: 4px solid var(--success);
        }}
        
        .vocab-grid {{
            display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: left;
        }}
        .vocab-item {{
            background: white; padding: 10px 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            font-size: 1.1em;
        }}
        .vocab-item strong {{ color: var(--primary); }}
        
        ruby {{ font-size: 1em; }}
        rt {{ font-size: 0.5em; color: var(--primary); font-weight: bold; }}
        
        .dialogue-box {{
            background: #fdfdfd;
            border-left: 5px solid #ff9800;
            padding: 20px;
            margin-bottom: 20px;
            text-align: left;
            border-radius: 0 12px 12px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }}
        .dialogue-p1 {{ color: #1976d2; font-weight: bold; margin-bottom: 5px !important; }}
        .dialogue-p2 {{ color: #e64a19; font-weight: bold; margin-bottom: 5px !important; }}
    </style>
</head>
<body>

    <div class="reveal">
        <div class="slides">
            {slides_content}
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.js"></script>
    <script>
        Reveal.initialize({{
            hash: true,
            slideNumber: true,
            transition: 'fade',
            backgroundTransition: 'fade',
            width: 1080,
            height: 720,
            margin: 0.1
        }});

        const furiganaDict = {furigana_json};

        // Add furigana dynamically
        document.querySelectorAll('p, .trans, .box-highlight, .answer-content, h1, h2, h3, li, strong, .vocab-item').forEach(el => {{
            let html = el.innerHTML;
            for (let kanji in furiganaDict) {{
                let re = new RegExp(kanji, "g");
                html = html.replace(re, furiganaDict[kanji]);
            }}
            el.innerHTML = html;
        }});

        function toggleAnswer(btn) {{
            let content = btn.nextElementSibling;
            if (content.style.display === "block") {{
                content.style.display = "none";
                btn.innerText = "Kiểm tra đáp án";
                btn.style.background = "var(--danger)";
            }} else {{
                content.style.display = "block";
                btn.innerText = "Ẩn đáp án";
                btn.style.background = "var(--success)";
            }}
        }}
    </script>
</body>
</html>
"""

lessons = {
    "bai36": {
        "title": "Bài 36",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 36 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: ようにする (Cố gắng) & ようになる (Trở nên)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 35)</p>
                    <p class="quiz-q">1. Chuyển sang thể Điều kiện (ば):<br>
                    ① 急ぎます (Nhanh lên) ➔ _________________<br>
                    ② 安い (Rẻ) ➔ _________________</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        ① <strong>急げば</strong> (Nếu nhanh lên)<br>
                        ② <strong>安ければ</strong> (Nếu rẻ)
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    明日、雨 ( A. なら / B. ければ ) 試合はありません。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. なら</strong><br>
                        (Vì 雨 là Danh từ, đi với なら).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 36)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>届きます</strong> (とどきます) : Đến nơi, được giao đến</div>
                    <div class="vocab-item"><strong>出ます</strong> (でます) : Tham gia (trận đấu)</div>
                    <div class="vocab-item"><strong>打ちます</strong> (うちます) : Đánh (máy chữ, đàn)</div>
                    <div class="vocab-item"><strong>貯金します</strong> (ちょきんします) : Tiết kiệm tiền</div>
                    <div class="vocab-item"><strong>太ります</strong> (ふとります) : Béo lên</div>
                    <div class="vocab-item"><strong>やせます</strong> : Gầy đi</div>
                    <div class="vocab-item"><strong>硬い</strong> (かたい) : Cứng</div>
                    <div class="vocab-item"><strong>軟らかい</strong> (やわらかい) : Mềm</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Vる / Vない + ように しています</h2>
                <div class="box-highlight">
                    Vる / Vない ように しています
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> "Cố gắng làm (hoặc không làm) việc gì đó đều đặn". Diễn tả một nỗ lực, thói quen tốt mà người nói đang duy trì hàng ngày.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日、運動する<strong>ようにしています</strong>。</p>
                    <span class="trans">Mỗi ngày tôi ĐỀU CỐ GẮNG vận động.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>甘い物を食べない<strong>ようにしています</strong>。</p>
                    <span class="trans">Tôi ĐANG CỐ GẮNG không ăn đồ ngọt.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. Vる / Vない + ように してください</h2>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Lời yêu cầu, khuyên bảo nhẹ nhàng nhưng mang tính chất dài hạn. "Xin hãy cố gắng làm / không làm V (từ nay về sau)".</p>
                </div>
                <div class="grammar-example fragment">
                    <p>もっと野菜を食べる<strong>ようにしてください</strong>。</p>
                    <span class="trans">Xin hãy cố gắng ăn nhiều rau hơn. (Lời khuyên của bác sĩ).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>絶対にパスポートをなくさない<strong>ようにしてください</strong>。</p>
                    <span class="trans">Tuyệt đối hãy cố gắng đừng làm mất hộ chiếu nhé.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Khuyên bảo</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">医者：最近、疲れやすいですか。</p>
                    <span class="trans">Bác sĩ: Dạo này anh dễ bị mệt à?</span>
                    <br>
                    <p class="dialogue-p2">患者：ええ、少し太りましたし…。</p>
                    <span class="trans">Bệnh nhân: Vâng, với lại cũng béo lên chút...</span>
                    <br>
                    <p class="dialogue-p1">医者：じゃ、毎日少し運動する<strong>ようにしてください</strong>。</p>
                    <span class="trans">Bác sĩ: Vậy thì mỗi ngày hãy CỐ GẮNG vận động một chút đi.</span>
                    <br>
                    <p class="dialogue-p2">患者：はい、明日から歩く<strong>ようにします</strong>。</p>
                    <span class="trans">Bệnh nhân: Vâng, từ mai tôi sẽ CỐ GẮNG đi bộ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. V(Khả năng) ように なります</h2>
                <div class="box-highlight">
                    Động từ Thể Khả năng + ように なります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả SỰ THAY ĐỔI trạng thái. Từ chỗ "Không thể" trở thành "CÓ THỂ" làm được việc gì đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>日本へ来てから、刺身が食べられる<strong>ようになりました</strong>。</p>
                    <span class="trans">Từ sau khi đến Nhật, tôi ĐÃ CÓ THỂ ăn được sashimi. (Ngày xưa không ăn được).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日練習すれば、泳げる<strong>ようになりますよ</strong>。</p>
                    <span class="trans">Nếu luyện tập mỗi ngày, bạn SẼ CÓ THỂ bơi được đấy.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">4. Vなくなります (Không thể làm được nữa)</h2>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Trái ngược với 出来るようになる, mẫu này diễn tả việc từ chỗ "Có thể" biến thành "KHÔNG THỂ" (hoặc từ hay làm thành không hay làm nữa).</p>
                    <p style="color:var(--danger)">Cách chia: Vない → Bỏ ない + なります</p>
                </div>
                <div class="grammar-example fragment">
                    <p>年を取ると、小さい字が読め<strong>なくなります</strong>。</p>
                    <span class="trans">Khi có tuổi, sẽ KHÔNG THỂ đọc được chữ nhỏ nữa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>最近、忙しくて、テレビを見<strong>なくなりました</strong>。</p>
                    <span class="trans">Dạo này bận quá, tôi KHÔNG CÒN xem TV nữa.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền ようにしています hay ようにしてください:<br>
                    A: 先生、薬はいつ飲みますか。<br>
                    B: 食事のあとで飲む (_______________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>ようにしてください</strong>.<br>
                        (Đây là lời dặn dò của bác sĩ dành cho bệnh nhân).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chia động từ trong ngoặc (Thể khả năng):<br>
                    日本語が ( 話す ) ______________ ようになりました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: 日本語が <strong>話せる</strong> ようになりました。<br>
                        (Đã có thể nói được tiếng Nhật).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 36</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vる/Vない ように しています:</strong> Đang cố gắng (duy trì) làm / không làm V.</li>
                        <li style="margin-bottom:15px;"><strong>Vる/Vない ように してください:</strong> Yêu cầu ai đó cố gắng làm / không làm V.</li>
                        <li style="margin-bottom:15px;"><strong>V(Khả năng) ように なります:</strong> Trở nên có thể làm được.</li>
                        <li style="margin-bottom:15px;"><strong>V-なくなります:</strong> Không thể / Không còn làm V nữa.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 36! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Nhớ phân biệt ようにします (cố gắng) và ようになります (trở nên có thể) nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "急ぎます": "<ruby>急<rt>いそ</rt></ruby>ぎます",
            "急げば": "<ruby>急<rt>いそ</rt></ruby>げば",
            "安い": "<ruby>安<rt>やす</rt></ruby>い",
            "安ければ": "<ruby>安<rt>やす</rt></ruby>ければ",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "試合": "<ruby>試合<rt>しあい</rt></ruby>",
            "届きます": "<ruby>届<rt>とど</rt></ruby>きます",
            "出ます": "<ruby>出<rt>で</rt></ruby>ます",
            "打ちます": "<ruby>打<rt>う</rt></ruby>ちます",
            "貯金": "<ruby>貯金<rt>ちょきん</rt></ruby>",
            "太ります": "<ruby>太<rt>ふと</rt></ruby>ります",
            "硬い": "<ruby>硬<rt>かた</rt></ruby>い",
            "軟らかい": "<ruby>軟<rt>やわ</rt></ruby>らかい",
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "運動": "<ruby>運動<rt>うんどう</rt></ruby>",
            "甘い": "<ruby>甘<rt>あま</rt></ruby>い",
            "物": "<ruby>物<rt>もの</rt></ruby>",
            "食べない": "<ruby>食<rt>た</rt></ruby>べない",
            "野菜": "<ruby>野菜<rt>やさい</rt></ruby>",
            "食べる": "<ruby>食<rt>た</rt></ruby>べる",
            "絶対": "<ruby>絶対<rt>ぜったい</rt></ruby>",
            "医者": "<ruby>医者<rt>いしゃ</rt></ruby>",
            "最近": "<ruby>最近<rt>さいきん</rt></ruby>",
            "疲れ": "<ruby>疲<rt>つか</rt></ruby>れ",
            "患者": "<ruby>患者<rt>かんじゃ</rt></ruby>",
            "太り": "<ruby>太<rt>ふと</rt></ruby>り",
            "歩く": "<ruby>歩<rt>ある</rt></ruby>く",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "来て": "<ruby>来<rt>き</rt></ruby>て",
            "刺身": "<ruby>刺身<rt>さしみ</rt></ruby>",
            "食べられる": "<ruby>食<rt>た</rt></ruby>べられる",
            "練習": "<ruby>練習<rt>れんしゅう</rt></ruby>",
            "泳げる": "<ruby>泳<rt>およ</rt></ruby>げる",
            "年": "<ruby>年<rt>とし</rt></ruby>",
            "取ると": "<ruby>取<rt>と</rt></ruby>ると",
            "小さい": "<ruby>小<rt>ちい</rt></ruby>さい",
            "字": "<ruby>字<rt>じ</rt></ruby>",
            "読め": "<ruby>読<rt>よ</rt></ruby>め",
            "忙しくて": "<ruby>忙<rt>いそが</rt></ruby>しくて",
            "見": "<ruby>見<rt>み</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "食事": "<ruby>食事<rt>しょくじ</rt></ruby>",
            "飲む": "<ruby>飲<rt>の</rt></ruby>む",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "話す": "<ruby>話<rt>はな</rt></ruby>す",
            "話せる": "<ruby>話<rt>はな</rt></ruby>せる"
        }
    },
    
    "bai37": {
        "title": "Bài 37",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 37 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Thể Bị Động (受身形)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 36)</p>
                    <p class="quiz-q">1. Điền ようにします hay ようになります?<br>
                    毎日練習して、泳げる (_______________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        泳げる <strong>ようになります</strong>。<br>
                        (Sự biến đổi khả năng: Đã có thể bơi được).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Xin hãy cố gắng không hút thuốc."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        タバコを <strong>吸わないようにしてください</strong>。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 37)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>褒めます</strong> (ほめます) : Khen</div>
                    <div class="vocab-item"><strong>しかります</strong> : Mắng</div>
                    <div class="vocab-item"><strong>誘います</strong> (さそいます) : Mời, rủ rê</div>
                    <div class="vocab-item"><strong>起こします</strong> (おこします) : Đánh thức</div>
                    <div class="vocab-item"><strong>頼みます</strong> (たのみます) : Nhờ vả</div>
                    <div class="vocab-item"><strong>踏みます</strong> (ふみます) : Giẫm lên</div>
                    <div class="vocab-item"><strong>壊します</strong> (こわします) : Phá hỏng</div>
                    <div class="vocab-item"><strong>汚します</strong> (よごします) : Làm bẩn</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Bị Động (受身形 - Ukemikei)</h2>
                <p style="font-size: 1.2em; margin-bottom: 20px;">Cách chia Động từ sang Thể Bị Động (Bị / Được):</p>
                <div class="grammar-example">
                    <p><strong>Nhóm 1 (Cột I → Cột A + れます):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>書きます → 書かれます (Bị/được viết)</li>
                        <li>踏みます → 踏まれます (Bị giẫm)</li>
                        <li>言います → 言われます (Bị/được nói)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + られます):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>褒めます → 褒められます (Được khen)</li>
                        <li>見ます → 見られます (Bị/được nhìn)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>します → されます (Bị/được làm)</li>
                        <li>来ます → 来られます (Bị đến)</li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Cấu trúc Bị Động (Dạng 1)</h2>
                <div class="box-highlight">
                    Người(1) は Người(2) に V(bị động)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Người 1 (Chủ ngữ) BỊ hoặc ĐƯỢC Người 2 tác động vào.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は先生<strong>に</strong>褒められました。</p>
                    <span class="trans">Tôi ĐƯỢC giáo viên khen. (Hành động tốt -> dịch là "Được").</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は母<strong>に</strong>しかられました。</p>
                    <span class="trans">Tôi BỊ mẹ mắng. (Hành động xấu -> dịch là "Bị").</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">3. Cấu trúc Bị Động (Dạng 2 - Đồ vật)</h2>
                <div class="box-highlight">
                    Người(1) は Người(2) に Danh-từ を V(bị động)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Người 1 BỊ Người 2 tác động vào [Danh từ] (thường là một bộ phận cơ thể hoặc đồ vật sở hữu), gây ra SỰ PHIỀN TOÁI.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は弟に パソコン<strong>を</strong>壊されました。</p>
                    <span class="trans">Tôi bị em trai làm hỏng MÁY TÍNH (của tôi).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は犬に 手<strong>を</strong>かまれました。</p>
                    <span class="trans">Tôi bị chó cắn vào TAY.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Gặp nạn</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：どうしたんですか。</p>
                    <span class="trans">A: Cậu sao thế?</span>
                    <br>
                    <p class="dialogue-p2">B：昨日、電車の中で 誰か<strong>に</strong> 足<strong>を</strong> 踏まれたんです。</p>
                    <span class="trans">B: Hôm qua trên tàu điện, tôi BỊ ai đó giẫm vào CHÂN.</span>
                    <br>
                    <p class="dialogue-p1">A：それは大変でしたね。痛かったでしょう。</p>
                    <span class="trans">A: Thế thì khổ nhỉ. Chắc đau lắm.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. Cấu trúc Bị Động (Dạng 3 - Tác phẩm/Vật)</h2>
                <div class="box-highlight">
                    Vật/Việc は (Tác giả によって) V(bị động)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Nhấn mạnh vào bản thân Sự vật/Sự việc (khi không cần thiết nói rõ ai làm, hoặc nói về một tác phẩm nổi tiếng do ai tạo ra).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>フランス語は いろいろな国で 話されています。</p>
                    <span class="trans">Tiếng Pháp ĐƯỢC NÓI ở nhiều quốc gia. (Chủ ngữ là Tiếng Pháp).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>電話は ベル<strong>によって</strong> 発明されました。</p>
                    <span class="trans">Điện thoại ĐƯỢC PHÁT MINH <strong>BỞI</strong> ông Bell. (Dùng によって cho tác giả).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chuyển sang câu Bị động:<br>
                    泥棒が私の自転車をとりました。 (Tên trộm đã lấy xe đạp của tôi).<br>
                    ➔ 私は泥棒 (_____) 自転車 (_____) __________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        私は泥棒 <strong>に</strong> 自転車 <strong>を</strong> <strong>とられました</strong>。<br>
                        (Dạng 2: Bị tác động vào đồ vật sở hữu).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    この絵は ピカソ ( A. に / B. によって ) 描かれました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. によって</strong><br>
                        (Chỉ TÁC GIẢ của một tác phẩm nghệ thuật, phát minh thì dùng によって).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 37</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Dạng 1 (Người bị tác động):</strong> N1 は N2 に V(bị động). (Tôi được cô giáo khen).</li>
                        <li style="margin-bottom:15px;"><strong>Dạng 2 (Vật bị tác động):</strong> N1 は N2 に Danh-từ を V(bị động). (Tôi bị chó cắn tay).</li>
                        <li style="margin-bottom:15px;"><strong>Dạng 3 (Chủ ngữ là vật):</strong> Vật は V(bị động). Nếu có tác giả thì dùng <strong>によって</strong>. (Điện thoại được phát minh bởi Bell).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 37! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Thể Bị động rất hay xuất hiện trong đời sống. Hãy luyện tập chia động từ thật tốt!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "練習": "<ruby>練習<rt>れんしゅう</rt></ruby>",
            "泳げる": "<ruby>泳<rt>およ</rt></ruby>げる",
            "吸わない": "<ruby>吸<rt>す</rt></ruby>わない",
            "褒めます": "<ruby>褒<rt>ほ</rt></ruby>めます",
            "誘います": "<ruby>誘<rt>さそ</rt></ruby>います",
            "起こします": "<ruby>起<rt>お</rt></ruby>こします",
            "頼みます": "<ruby>頼<rt>たの</rt></ruby>みます",
            "踏みます": "<ruby>踏<rt>ふ</rt></ruby>みます",
            "壊します": "<ruby>壊<rt>こわ</rt></ruby>します",
            "汚します": "<ruby>汚<rt>よご</rt></ruby>します",
            "書きます": "<ruby>書<rt>か</rt></ruby>きます",
            "書かれます": "<ruby>書<rt>か</rt></ruby>かれます",
            "踏まれます": "<ruby>踏<rt>ふ</rt></ruby>まれます",
            "言います": "<ruby>言<rt>い</rt></ruby>ます",
            "言われます": "<ruby>言<rt>い</rt></ruby>われます",
            "褒められます": "<ruby>褒<rt>ほ</rt></ruby>められます",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見られます": "<ruby>見<rt>み</rt></ruby>られます",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "来られます": "<ruby>来<rt>こ</rt></ruby>られます",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "弟": "<ruby>弟<rt>おとうと</rt></ruby>",
            "壊されました": "<ruby>壊<rt>こわ</rt></ruby>されました",
            "犬": "<ruby>犬<rt>いぬ</rt></ruby>",
            "手": "<ruby>手<rt>て</rt></ruby>",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "中": "<ruby>中<rt>なか</rt></ruby>",
            "誰": "<ruby>誰<rt>だれ</rt></ruby>",
            "足": "<ruby>足<rt>あし</rt></ruby>",
            "踏まれた": "<ruby>踏<rt>ふ</rt></ruby>まれた",
            "大変": "<ruby>大変<rt>たいへん</rt></ruby>",
            "痛かった": "<ruby>痛<rt>いた</rt></ruby>かった",
            "国": "<ruby>国<rt>くに</rt></ruby>",
            "話されて": "<ruby>話<rt>はな</rt></ruby>されて",
            "電話": "<ruby>電話<rt>でんわ</rt></ruby>",
            "発明": "<ruby>発明<rt>はつめい</rt></ruby>",
            "泥棒": "<ruby>泥棒<rt>どろぼう</rt></ruby>",
            "自転車": "<ruby>自転車<rt>じてんしゃ</rt></ruby>",
            "絵": "<ruby>絵<rt>え</rt></ruby>",
            "描かれました": "<ruby>描<rt>か</rt></ruby>かれました"
        }
    },

    "bai38": {
        "title": "Bài 38",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 38 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Danh từ hóa Động từ (Vる + の)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 37)</p>
                    <p class="quiz-q">1. Chuyển sang thể Bị Động:<br>
                    ① 母が私をしかりました。➔ 私は母 (____) _________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        私は母 <strong>に</strong> <strong>しかられました</strong>。<br>
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn trợ từ đúng:<br>
                    この本は 山田さん ( A. に / B. によって ) 書かれました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. によって</strong><br>
                        (Vì Yamada là tác giả của tác phẩm "Quyển sách").
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 38)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>参加します</strong> (さんかします) : Tham gia</div>
                    <div class="vocab-item"><strong>育てます</strong> (そだてます) : Nuôi dưỡng</div>
                    <div class="vocab-item"><strong>運びます</strong> (はこびます) : Vận chuyển</div>
                    <div class="vocab-item"><strong>入院します</strong> (にゅういんします) : Nhập viện</div>
                    <div class="vocab-item"><strong>退院します</strong> (たいいんします) : Xuất viện</div>
                    <div class="vocab-item"><strong>整理します</strong> (せいりします) : Sắp xếp</div>
                    <div class="vocab-item"><strong>うそ</strong> : Lời nói dối</div>
                    <div class="vocab-item"><strong>気分がいい</strong> (きぶんがいい) : Tâm trạng tốt</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Vる ＋ のは ＋ Tính từ</h2>
                <div class="box-highlight">
                    Vる ＋ の は ＋ Tính từ
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Bằng cách thêm <strong>の</strong> sau Vる, ta biến Cụm động từ đó thành Chủ ngữ (Danh từ). Phía sau thường đi với các tính từ như: 楽しい, 難しい, 面白い, 危険だ...</p>
                </div>
                <div class="grammar-example fragment">
                    <p>音楽を聞く<strong>のは</strong>楽しいです。</p>
                    <span class="trans">VIỆC nghe nhạc <strong>THÌ</strong> rất vui. (Biến "nghe nhạc" thành danh từ làm chủ ngữ).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>日本語を勉強する<strong>のは</strong>難しいです。</p>
                    <span class="trans">VIỆC học tiếng Nhật <strong>THÌ</strong> rất khó.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Vる ＋ のが ＋ Tính từ</h2>
                <div class="box-highlight">
                    Vる ＋ の が ＋ Tính từ (Chỉ Sở thích / Khả năng)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để nói về Sở thích (好き, 嫌い) hoặc Khả năng (上手, 下手, 早い, 遅い) đối với một hành động nào đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は絵を描く<strong>のが</strong>好きです。</p>
                    <span class="trans">Tôi thích VIỆC vẽ tranh.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>田中さんは走る<strong>のが</strong>速いです。</p>
                    <span class="trans">Anh Tanaka THÌ VIỆC chạy rất nhanh. (Anh ấy chạy nhanh).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Sở thích</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：木村さんはスポーツを見る<strong>のが</strong>好きですか。</p>
                    <span class="trans">A: Anh Kimura có thích XEM thể thao không?</span>
                    <br>
                    <p class="dialogue-p2">B：いいえ。見る<strong>のは</strong>好きじゃありませんが、する<strong>のは</strong>好きです。</p>
                    <span class="trans">B: Không. Việc XEM thì tôi không thích, nhưng việc CHƠI thì tôi thích.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。どんなスポーツをする<strong>のが</strong>上手ですか。</p>
                    <span class="trans">A: Ra vậy. Anh CHƠI giỏi môn thể thao nào?</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vる ＋ のを 忘れました (Quên mất việc...)</h2>
                <div class="box-highlight">
                    Vる ＋ の を 忘れました
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để diễn tả việc bản thân ĐÃ QUÊN MẤT không làm một hành động nào đó đáng lẽ phải làm.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>薬を飲む<strong>のを</strong>忘れました。</p>
                    <span class="trans">Tôi đã quên mất VIỆC uống thuốc.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>車の窓を閉める<strong>のを</strong>忘れました。</p>
                    <span class="trans">Tôi đã quên VIỆC đóng cửa sổ xe ô tô.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. ～ のを 知っていますか (Có biết việc... không?)</h2>
                <div class="box-highlight">
                    Câu (Thể thông thường) ＋ の を 知っていますか
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Hỏi xem đối phương CÓ BIẾT về một thông tin / sự việc nào đó hay không.</p>
                    <p style="color:var(--danger)">*Chú ý: Danh từ / Tính từ な ➔ Bỏ だ ＋ な</p>
                </div>
                <div class="grammar-example fragment">
                    <p>田中さんが結婚した<strong>のを</strong>知っていますか。</p>
                    <span class="trans">Bạn CÓ BIẾT (VIỆC) anh Tanaka đã kết hôn không?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>A：いいえ、知りませんでした。</p>
                    <span class="trans">A: Không, tôi ĐÃ không biết. (Lưu ý trả lời bằng 知りませんでした, không dùng 知っていません).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền は / が / を vào chỗ trống:<br>
                    私は 漢字を覚える (____) 下手です。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>のが</strong>.<br>
                        (Vì "下手" chỉ khả năng kém, nên dùng のが).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Sắp xếp câu:<br>
                    [ 忘れました / のを / 買う / 牛乳を ]</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        <strong>牛乳を買うのを忘れました。</strong><br>
                        (Tôi đã quên việc mua sữa).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 38</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vるのは ＋ Tính từ:</strong> Việc V thì... (Nhấn mạnh chủ ngữ).</li>
                        <li style="margin-bottom:15px;"><strong>Vるのが ＋ 好き/嫌い/上手/下手:</strong> Thích/Ghét/Giỏi/Kém việc làm V.</li>
                        <li style="margin-bottom:15px;"><strong>Vるのを 忘れました:</strong> Quên mất việc làm V.</li>
                        <li style="margin-bottom:15px;"><strong>～のを 知っていますか:</strong> Có biết việc... không? (Trả lời KHÔNG: いいえ、知りませんでした).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 38! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Từ giờ bạn đã có thể biến Động từ thành Danh từ bằng chữ "の" rồi đấy!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "書かれました": "<ruby>書<rt>か</rt></ruby>かれました",
            "参加": "<ruby>参加<rt>さんか</rt></ruby>",
            "育てます": "<ruby>育<rt>そだ</rt></ruby>てます",
            "運びます": "<ruby>運<rt>はこ</rt></ruby>びます",
            "入院": "<ruby>入院<rt>にゅういん</rt></ruby>",
            "退院": "<ruby>退院<rt>たいいん</rt></ruby>",
            "整理": "<ruby>整理<rt>せいり</rt></ruby>",
            "気分": "<ruby>気分<rt>きぶん</rt></ruby>",
            "音楽": "<ruby>音楽<rt>おんがく</rt></ruby>",
            "聞く": "<ruby>聞<rt>き</rt></ruby>く",
            "楽しい": "<ruby>楽<rt>たの</rt></ruby>しい",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "難しい": "<ruby>難<rt>むずか</rt></ruby>しい",
            "絵": "<ruby>絵<rt>え</rt></ruby>",
            "描く": "<ruby>描<rt>か</rt></ruby>く",
            "好き": "<ruby>好<rt>す</rt></ruby>き",
            "走る": "<ruby>走<rt>はし</rt></ruby>る",
            "速い": "<ruby>速<rt>はや</rt></ruby>い",
            "見る": "<ruby>見<rt>み</rt></ruby>る",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "飲む": "<ruby>飲<rt>の</rt></ruby>む",
            "忘れました": "<ruby>忘<rt>わす</rt></ruby>れました",
            "車": "<ruby>車<rt>くるま</rt></ruby>",
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "閉める": "<ruby>閉<rt>し</rt></ruby>める",
            "結婚": "<ruby>結婚<rt>けっこん</rt></ruby>",
            "知って": "<ruby>知<rt>し</rt></ruby>って",
            "知りませんでした": "<ruby>知<rt>し</rt></ruby>りませんでした",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "覚える": "<ruby>覚<rt>おぼ</rt></ruby>える",
            "下手": "<ruby>下手<rt>へた</rt></ruby>",
            "買う": "<ruby>買<rt>か</rt></ruby>う",
            "牛乳": "<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>"
        }
    },
    
    "bai39": {
        "title": "Bài 39",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 39 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Chỉ Nguyên nhân (Vて / ので)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 38)</p>
                    <p class="quiz-q">1. Điền trợ từ: 私は本を読む (_____) 好きです。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        私は本を読む <strong>のが</strong> 好きです。<br>
                        (Vì "好き" biểu đạt Sở thích).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Bạn có biết việc anh Suzuki sẽ đến không?"</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        鈴木さんが来る <strong>のを知っていますか</strong>。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 39)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>答えます</strong> (こたえます) : Trả lời</div>
                    <div class="vocab-item"><strong>倒れます</strong> (たおれます) : Đổ, ngã</div>
                    <div class="vocab-item"><strong>焼けます</strong> (やけます) : Cháy, nướng (thịt, nhà)</div>
                    <div class="vocab-item"><strong>通ります</strong> (とおります) : Đi qua</div>
                    <div class="vocab-item"><strong>死みます</strong> (しにます) : Chết</div>
                    <div class="vocab-item"><strong>びっくりします</strong> : Giật mình, bất ngờ</div>
                    <div class="vocab-item"><strong>がっかりします</strong> : Thất vọng</div>
                    <div class="vocab-item"><strong>安心します</strong> (あんしんします) : An tâm</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Vて (Chỉ nguyên nhân / Lý do)</h2>
                <div class="box-highlight">
                    Vて / Vなくて ＋ Vế sau (Cảm xúc / Khả năng / Quá khứ)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng Thể て để nối 2 vế câu, trong đó Vế 1 là NGUYÊN NHÂN dẫn đến Vế 2. <br>
                    <span style="color:var(--danger)">*Hạn chế: Vế sau KHÔNG ĐƯỢC chứa ý chí, mệnh lệnh, rủ rê (như ~ましょう, ~てください).</span></p>
                </div>
                <div class="grammar-example fragment">
                    <p>ニュースを聞い<strong>て</strong>、びっくりしました。</p>
                    <span class="trans">Bởi vì nghe tin tức, nên tôi đã GIẬT MÌNH. (Vế sau là Động từ chỉ cảm xúc).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>家族に会え<strong>なくて</strong>、寂しいです。</p>
                    <span class="trans">Bởi vì KHÔNG THỂ gặp gia đình, nên tôi BUỒN. (Vế sau là Tính từ chỉ cảm xúc).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Tính từ / Danh từ + で (Chỉ nguyên nhân)</h2>
                <div class="grammar-example">
                    <p>Cách chia Tương tự như nối câu:</p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>Tính từ đuôi い → <strong>～くて</strong> (忙しくて)</li>
                        <li>Tính từ đuôi な → <strong>～で</strong> (暇で)</li>
                        <li>Danh từ → <strong>～で</strong> (病気で)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p>忙し<strong>くて</strong>、テレビを見ることができません。</p>
                    <span class="trans">VÌ bận quá, nên không THỂ xem TV được. (Vế sau là Khả năng).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>事故<strong>で</strong>、電車が遅れました。</p>
                    <span class="trans">DO tai nạn, nên tàu điện đã bị trễ. (Danh từ đi với で thường là sự cố tự nhiên/tai nạn).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: ～て (Nguyên nhân)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：どうしたんですか。元気がないですね。</p>
                    <span class="trans">A: Cậu sao thế? Trông thiếu sức sống quá.</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、昨日テストに落ち<strong>て</strong>、がっかりしているんです。</p>
                    <span class="trans">B: Vâng, hôm qua VÌ thi trượt nên tôi đang RẤT THẤT VỌNG.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。次は頑張ってくださいね。</p>
                    <span class="trans">A: Vậy à. Lần tới cố gắng lên nhé.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. ～ ので (Bởi vì - Lịch sự)</h2>
                <div class="box-highlight">
                    Thể thông thường ＋ ので
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Giống với "から" (Bởi vì), nhưng "ので" mang sắc thái NHẸ NHÀNG, KHÁCH QUAN, LỊCH SỰ hơn. Thường dùng để trình bày lý do một cách từ tốn để xin lỗi hoặc nhờ vả.</p>
                    <p style="color:var(--danger)">*Chú ý: Danh từ / Tính từ な ➔ ＋ な ＋ ので</p>
                </div>
                <div class="grammar-example fragment">
                    <p>用事がある<strong>ので</strong>、お先に失礼します。</p>
                    <span class="trans">VÌ có việc bận, nên tôi xin phép về trước ạ. (Xin phép lịch sự).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>日本語が下手<strong>なので</strong>、英語で話してもいいですか。</p>
                    <span class="trans">VÌ tiếng Nhật của tôi kém, nên tôi nói bằng tiếng Anh có được không ạ? (Xin phép).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn đáp án đúng (Chú ý quy tắc Vế sau của thể て):<br>
                    頭が痛くて、( A. 病院へ行きましょう / B. 何も食べられません )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 何も食べられません</strong>.<br>
                        (Vì Vế sau của thể て KHÔNG được dùng câu Rủ rê/Mệnh lệnh như A).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Điền trợ từ nối đúng (ので hay なので):<br>
                    明日テスト(____________)、今日は早く帰ります。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        明日テスト <strong>なので</strong>、今日は早く帰ります。<br>
                        (Vì テスト là Danh từ -> Thêm な ので).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 39</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vて / ~くて / ~で:</strong> Bởi vì (Vế sau KHÔNG có chủ ý, thường là 3 trường hợp: Cảm xúc, Khả năng, Quá khứ sự việc).</li>
                        <li style="margin-bottom:15px;"><strong>Danh từ tai nạn + で:</strong> Do (tai nạn, hỏa hoạn, động đất...). VD: 地震で家が倒れました。</li>
                        <li style="margin-bottom:15px;"><strong>～ので:</strong> Bởi vì (Dùng như から nhưng mềm mỏng, lịch sự hơn, hay dùng để xin phép/nhờ vả). Nhớ Danh từ/Tính từ な phải thêm な ので.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 39! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Chỉ còn hơn 10 bài nữa là kết thúc N4 rồi, tiến lên!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "読む": "<ruby>読<rt>よ</rt></ruby>む",
            "好き": "<ruby>好<rt>す</rt></ruby>き",
            "鈴木": "<ruby>鈴木<rt>すずき</rt></ruby>",
            "来る": "<ruby>来<rt>く</rt></ruby>る",
            "知って": "<ruby>知<rt>し</rt></ruby>って",
            "答えます": "<ruby>答<rt>こた</rt></ruby>えます",
            "倒れます": "<ruby>倒<rt>たお</rt></ruby>れます",
            "焼けます": "<ruby>焼<rt>や</rt></ruby>けます",
            "通ります": "<ruby>通<rt>とお</rt></ruby>ります",
            "死みます": "<ruby>死<rt>し</rt></ruby>にます",
            "安心": "<ruby>安心<rt>あんしん</rt></ruby>",
            "聞いて": "<ruby>聞<rt>き</rt></ruby>いて",
            "家族": "<ruby>家族<rt>かぞく</rt></ruby>",
            "会えなくて": "<ruby>会<rt>あ</rt></ruby>えなくて",
            "寂しい": "<ruby>寂<rt>さび</rt></ruby>しい",
            "忙しくて": "<ruby>忙<rt>いそが</rt></ruby>しくて",
            "見る": "<ruby>見<rt>み</rt></ruby>る",
            "事故": "<ruby>事故<rt>じこ</rt></ruby>",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "遅れました": "<ruby>遅<rt>おく</rt></ruby>れました",
            "元気": "<ruby>元気<rt>げんき</rt></ruby>",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "落ちて": "<ruby>落<rt>お</rt></ruby>ちて",
            "次": "<ruby>次<rt>つぎ</rt></ruby>",
            "頑張って": "<ruby>頑張<rt>がんば</rt></ruby>って",
            "用事": "<ruby>用事<rt>ようじ</rt></ruby>",
            "先": "<ruby>先<rt>さき</rt></ruby>",
            "失礼": "<ruby>失礼<rt>しつれい</rt></ruby>",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "下手": "<ruby>下手<rt>へた</rt></ruby>",
            "英語": "<ruby>英語<rt>えいご</rt></ruby>",
            "話して": "<ruby>話<rt>はな</rt></ruby>して",
            "頭": "<ruby>頭<rt>あたま</rt></ruby>",
            "痛くて": "<ruby>痛<rt>いた</rt></ruby>くて",
            "病院": "<ruby>病院<rt>びょういん</rt></ruby>",
            "行きましょう": "<ruby>行<rt>い</rt></ruby>きましょう",
            "何も": "<ruby>何<rt>なに</rt></ruby>も",
            "食べられません": "<ruby>食<rt>た</rt></ruby>べられません",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "帰ります": "<ruby>帰<rt>かえ</rt></ruby>ります",
            "地震": "<ruby>地震<rt>じしん</rt></ruby>",
            "家": "<ruby>家<rt>いえ</rt></ruby>",
            "倒れました": "<ruby>倒<rt>たお</rt></ruby>れました"
        }
    }
}

for lesson_id, data in lessons.items():
    folder_path = os.path.join(base_dir, lesson_id)
    os.makedirs(folder_path, exist_ok=True)
    
    html_content = template.format(
        lesson=data["title"],
        slides_content="\n            ".join(data["slides"]),
        furigana_json=json.dumps(data["furigana"], ensure_ascii=False)
    )
    
    file_path = os.path.join(folder_path, "index.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"Generated {file_path}")

print("Super Mega Batch 3 (Lessons 36-39) generated successfully!")
