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
    "bai48": {
        "title": "Bài 48",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 48 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Thể Sai Khiến (使役形)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 47)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    山田さんは ピアノが 上手 ( A. だそうです / B. なそうです )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. だそうです</strong><br>
                        (Nghe nói là: Dùng Thể thông thường, Tính từ な giữ nguyên だ).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Điền từ: 外で 変な ( 音 / 声 / におい ) がしますね。(Mùi lạ)</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        外で 変な <strong>におい</strong> がしますね。<br>
                        (Cảm nhận bằng khứu giác).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 48)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>降ろします</strong> (おろします) : Cho xuống (xe)</div>
                    <div class="vocab-item"><strong>届けます</strong> (とどけます) : Giao đến, chuyển đến</div>
                    <div class="vocab-item"><strong>世話をします</strong> (せわをします) : Chăm sóc</div>
                    <div class="vocab-item"><strong>録音します</strong> (ろくおんします) : Ghi âm</div>
                    <div class="vocab-item"><strong>嫌な</strong> (いやな) : Chán ghét, không thích</div>
                    <div class="vocab-item"><strong>塾</strong> (じゅく) : Lớp học thêm</div>
                    <div class="vocab-item"><strong>生徒</strong> (せいと) : Học sinh</div>
                    <div class="vocab-item"><strong>ファイル</strong> : File, tài liệu</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Sai Khiến (使役形 - Shiekikei)</h2>
                <p style="font-size: 1.2em; margin-bottom: 20px;">Cách chia Động từ sang Thể Sai Khiến (Bắt/Cho phép ai đó làm):</p>
                <div class="grammar-example">
                    <p><strong>Nhóm 1 (Cột I → Cột A + せます):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>書きます → 書かせます (Bắt/Cho viết)</li>
                        <li>飲みます → 飲ませます (Bắt/Cho uống)</li>
                        <li>待ちます → 待たせます (Bắt đợi)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + させます):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>食べます → 食べさせます (Bắt/Cho ăn)</li>
                        <li>見ます → 見させます (Bắt/Cho xem)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>します → させます (Bắt/Cho làm)</li>
                        <li>来ます → 来させます (Bắt/Cho đến)</li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Cấu trúc Sai Khiến (Tự Động Từ)</h2>
                <div class="box-highlight">
                    Người(1) は Người(2) を V(sai khiến - tự động từ)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Người 1 BẮT (ép buộc) hoặc CHO PHÉP Người 2 thực hiện một TỰ ĐỘNG TỪ (Đi, đứng, khóc, cười, nghỉ ngơi...).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>部長は 田中さん<strong>を</strong> 出張に 行かせました。</p>
                    <span class="trans">Trưởng phòng đã BẮT anh Tanaka đi công tác. (Ép buộc).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>母は 娘<strong>を</strong> 休ませました。</p>
                    <span class="trans">Mẹ đã CHO PHÉP con gái nghỉ ngơi. (Cho phép).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">3. Cấu trúc Sai Khiến (Tha Động Từ)</h2>
                <div class="box-highlight">
                    Người(1) は Người(2) に Danh-từ を V(sai khiến - tha động từ)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Vì Tha động từ đã có trợ từ <strong>を</strong> đi kèm tân ngữ, nên Người bị sai khiến (Người 2) bắt buộc phải dùng trợ từ <strong>に</strong>.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>先生は 生徒<strong>に</strong> 本<strong>を</strong> 読ませました。</p>
                    <span class="trans">Giáo viên đã BẮT học sinh ĐỌC SÁCH.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は 弟<strong>に</strong> 部屋<strong>を</strong> 掃除させました。</p>
                    <span class="trans">Tôi đã BẮT em trai DỌN PHÒNG.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Nuôi dạy con</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：お子さんは もう 英語を 勉強していますか。</p>
                    <span class="trans">A: Con của bạn đã học tiếng Anh chưa?</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、週に2回 英語の塾へ 行かせています。</p>
                    <span class="trans">B: Vâng, mỗi tuần 2 lần tôi CHO PHÉP cháu đi học trung tâm tiếng Anh (Tự động từ đi với を).</span>
                    <br>
                    <p class="dialogue-p1">A：偉いですね。家でも 勉強させていますか。</p>
                    <span class="trans">A: Giỏi nhỉ. Ở nhà bạn có BẮT cháu học không?</span>
                    <br>
                    <p class="dialogue-p2">B：いいえ、家では 好きなことを させています。</p>
                    <span class="trans">B: Không, ở nhà tôi CHO PHÉP cháu làm những việc cháu thích.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. Vさせて いただけませんか (Xin phép lịch sự)</h2>
                <div class="box-highlight">
                    V(sai khiến)て いただけませんか
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> "Có thể CHO PHÉP TÔI làm V được không ạ?". Đây là cách xin phép cực kỳ lịch sự, thường dùng với cấp trên hoặc đối tác.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>すみません、明日 休ま<strong>せて いただけませんか</strong>。</p>
                    <span class="trans">Xin lỗi, ngày mai có thể CHO PHÉP TÔI NGHỈ được không ạ?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この コピー機を 使わ<strong>せて いただけませんか</strong>。</p>
                    <span class="trans">Có thể CHO PHÉP TÔI SỬ DỤNG máy photocopy này được không ạ?</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn trợ từ đúng:<br>
                    母は 妹 ( A. を / B. に ) ピアノを 習わせます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. に</strong><br>
                        (Vì "học piano" là tha động từ đã có を, nên đối tượng bị bắt phải đi với に).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chuyển sang câu xin phép lịch sự:<br>
                    早く ( 帰ります ) ______________________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        早く <strong>帰らせて いただけませんか</strong>。<br>
                        (Có thể CHO PHÉP TÔI VỀ SỚM được không ạ).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 48</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Thể Sai Khiến:</strong> Bắt ép / Cho phép người dưới làm gì.</li>
                        <li style="margin-bottom:15px;"><strong>Cấu trúc Tự Động Từ:</strong> N1 は N2 <span style="color:red">を</span> V(tự động từ).</li>
                        <li style="margin-bottom:15px;"><strong>Cấu trúc Tha Động Từ:</strong> N1 は N2 <span style="color:red">に</span> N3 <span style="color:red">を</span> V(tha động từ).</li>
                        <li style="margin-bottom:15px;"><strong>Vさせて いただけませんか:</strong> Xin phép CHO TÔI LÀM (Lịch sự).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 48! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Thể Sai Khiến rất quan trọng để thể hiện mối quan hệ trên dưới trong tiếng Nhật!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "山田": "<ruby>山田<rt>やまだ</rt></ruby>",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>",
            "外": "<ruby>外<rt>そと</rt></ruby>",
            "変": "<ruby>変<rt>へん</rt></ruby>",
            "音": "<ruby>音<rt>おと</rt></ruby>",
            "声": "<ruby>声<rt>こえ</rt></ruby>",
            "降ろします": "<ruby>降<rt>お</rt></ruby>ろします",
            "届けます": "<ruby>届<rt>とど</rt></ruby>けます",
            "世話": "<ruby>世話<rt>せわ</rt></ruby>",
            "録音": "<ruby>録音<rt>ろくおん</rt></ruby>",
            "嫌": "<ruby>嫌<rt>いや</rt></ruby>",
            "塾": "<ruby>塾<rt>じゅく</rt></ruby>",
            "生徒": "<ruby>生徒<rt>せいと</rt></ruby>",
            "書きます": "<ruby>書<rt>か</rt></ruby>きます",
            "書かせます": "<ruby>書<rt>か</rt></ruby>かせます",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "飲ませます": "<ruby>飲<rt>の</rt></ruby>ませます",
            "待ちます": "<ruby>待<rt>ま</rt></ruby>ちます",
            "待たせます": "<ruby>待<rt>ま</rt></ruby>たせます",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "食べさせます": "<ruby>食<rt>た</rt></ruby>させます",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見させます": "<ruby>見<rt>み</rt></ruby>させます",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "来させます": "<ruby>来<rt>こ</rt></ruby>させます",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "田中": "<ruby>田中<rt>たなか</rt></ruby>",
            "出張": "<ruby>出張<rt>しゅっちょう</rt></ruby>",
            "行かせました": "<ruby>行<rt>い</rt></ruby>かせました",
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "娘": "<ruby>娘<rt>むすめ</rt></ruby>",
            "休ませました": "<ruby>休<rt>やす</rt></ruby>ませました",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "読ませました": "<ruby>読<rt>よ</rt></ruby>ませました",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "弟": "<ruby>弟<rt>おとうと</rt></ruby>",
            "部屋": "<ruby>部屋<rt>へや</rt></ruby>",
            "掃除": "<ruby>掃除<rt>そうじ</rt></ruby>",
            "子": "<ruby>子<rt>こ</rt></ruby>",
            "英語": "<ruby>英語<rt>えいご</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "週": "<ruby>週<rt>しゅう</rt></ruby>",
            "回": "<ruby>回<rt>かい</rt></ruby>",
            "行かせています": "<ruby>行<rt>い</rt></ruby>かせています",
            "偉い": "<ruby>偉<rt>えら</rt></ruby>い",
            "家": "<ruby>家<rt>いえ</rt></ruby>",
            "勉強させています": "<ruby>勉強<rt>べんきょう</rt></ruby>させています",
            "好き": "<ruby>好<rt>す</rt></ruby>き",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "休ませて": "<ruby>休<rt>やす</rt></ruby>ませて",
            "機": "<ruby>機<rt>き</rt></ruby>",
            "使わせて": "<ruby>使<rt>つか</rt></ruby>わせて",
            "妹": "<ruby>妹<rt>いもうと</rt></ruby>",
            "習わせます": "<ruby>習<rt>なら</rt></ruby>わせます",
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "帰ります": "<ruby>帰<rt>かえ</rt></ruby>ります",
            "帰らせて": "<ruby>帰<rt>かえ</rt></ruby>らせて"
        }
    },
    
    "bai49": {
        "title": "Bài 49",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 49 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Tôn Kính Ngữ (尊敬語)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 48)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    母は 私 ( A. を / B. に ) 買い物に 行かせました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. を</strong><br>
                        (Vì "行く" là Tự động từ, nên người bị sai khiến đi với を).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch câu: "Xin phép cho tôi sử dụng điện thoại."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        電話を <strong>使わせて いただけませんか</strong>。<br>
                        (Xin phép lịch sự: Vさせて いただけませんか).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tôn Kính Ngữ Đặc Biệt (Bài 49)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>いらっしゃいます</strong> : Đi, đến, ở (行きます, 来ます, います)</div>
                    <div class="vocab-item"><strong>召し上がります</strong> (めしあがります) : Ăn, uống (食べます, 飲みます)</div>
                    <div class="vocab-item"><strong>おっしゃいます</strong> : Nói (言います)</div>
                    <div class="vocab-item"><strong>なさいます</strong> : Làm (します)</div>
                    <div class="vocab-item"><strong>ご覧になります</strong> (ごらんになります) : Xem (見ます)</div>
                    <div class="vocab-item"><strong>ご存じです</strong> (ごぞんじです) : Biết (知っています)</div>
                    <div class="vocab-item"><strong>部長</strong> (ぶちょう) : Trưởng phòng</div>
                    <div class="vocab-item"><strong>社長</strong> (しゃちょう) : Giám đốc</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Tôn Kính Ngữ là gì?</h2>
                <div class="grammar-example">
                    <p><strong>Khái niệm:</strong> Tôn Kính Ngữ (尊敬語 - Sonkeigo) là cách nói nhằm <strong>TÔN TRỌNG, NÂNG CAO HÀNH ĐỘNG CỦA NGƯỜI ĐỐI DIỆN</strong> (Thường là sếp, thầy cô, người lớn tuổi, khách hàng).</p>
                    <p style="color:var(--danger)">*TUYỆT ĐỐI KHÔNG dùng Tôn kính ngữ cho hành động của BẢN THÂN mình.</p>
                </div>
                
                <div class="grammar-example fragment">
                    <p style="font-weight:bold; color:var(--primary);">Cách 1: Dùng các Động từ Đặc biệt (Xem slide trước)</p>
                    <p>社長は パンを <strong>召し上がります</strong>。</p>
                    <span class="trans">Giám đốc ĂN bánh mì. (Tôn kính của 食べます).</span>
                    <br>
                    <p>先生は 今 会議室に <strong>いらっしゃいます</strong>。</p>
                    <span class="trans">Thầy giáo hiện đang Ở phòng họp. (Tôn kính của います).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Cách 2: お V(bỏ ます) に なります</h2>
                <div class="box-highlight">
                    お ＋ V (Bỏ ます) ＋ に なります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng cho những động từ Nhóm 1, 2 KHÔNG CÓ dạng đặc biệt.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>社長は もう お帰り<strong>になりました</strong>。</p>
                    <span class="trans">Giám đốc ĐÃ VỀ rồi ạ. (帰ります ➔ お帰りになります).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>先生は この本を お読み<strong>になりました</strong>か。</p>
                    <span class="trans">Thầy ĐÃ ĐỌC cuốn sách này chưa ạ? (読みます ➔ お読みになります).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Cách 3: Chia giống Thể Bị Động</h2>
                <div class="box-highlight">
                    V (Chia giống thể Bị động: れます / られます)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Cách này cũng là Tôn kính ngữ, nhưng mức độ tôn trọng THẤP HƠN Cách 1 và Cách 2 một chút. Dễ sử dụng nhất vì chia giống hệt thể Bị động.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>部長は 何時に <strong>来られます</strong>か。</p>
                    <span class="trans">Trưởng phòng lúc mấy giờ sẽ ĐẾN ạ? (来ます ➔ 来られます).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>お客様は タバコを <strong>吸われます</strong>か。</p>
                    <span class="trans">Quý khách có HÚT thuốc không ạ? (吸います ➔ 吸われます).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Đón khách</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">社員：社長、コーヒーを <strong>召し上がります</strong>か。</p>
                    <span class="trans">Nhân viên: Giám đốc có DÙNG/UỐNG cà phê không ạ?</span>
                    <br>
                    <p class="dialogue-p2">社長：ありがとう。いただきます。</p>
                    <span class="trans">Giám đốc: Cảm ơn. Tôi xin. (Giám đốc dùng khiêm nhường ngữ cho mình).</span>
                    <br>
                    <p class="dialogue-p1">社員：今日の新聞は もう <strong>ご覧になりました</strong>か。</p>
                    <span class="trans">Nhân viên: Giám đốc đã XEM báo hôm nay chưa ạ?</span>
                    <br>
                    <p class="dialogue-p2">社長：いいえ、まだです。</p>
                    <span class="trans">Giám đốc: Chưa, tôi chưa xem.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. お/ご ＋ V (Xin mời làm V)</h2>
                <div class="box-highlight">
                    お ＋ V(bỏ ます) ＋ ください<br>
                    ご ＋ Danh từ (Nhóm 3) ＋ ください
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Biến thể rất lịch sự của Vてください (Xin mời / Xin hãy làm V).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>こちらに <strong>お座り ください</strong>。</p>
                    <span class="trans">Xin mời NGỒI ở đây ạ. (座ります ➔ お座りください).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>少々 <strong>お待ち ください</strong>。</p>
                    <span class="trans">Xin vui lòng CHỜ một chút ạ. (待ちます ➔ お待ちください).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>こちらに <strong>ご注意 ください</strong>。</p>
                    <span class="trans">Xin vui lòng CHÚ Ý ở điểm này. (Nhóm 3: 漢字 ➔ ご 注意ください).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chuyển sang Tôn kính ngữ (Từ đặc biệt):<br>
                    先生は 何を ( 食べます ) ____________________か。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        何を <strong>召し上がります</strong>か。<br>
                        (Thầy ăn gì ạ?).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chuyển sang mẫu お～になります:<br>
                    社長は ( 帰りました ) もう ____________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        もう <strong>お帰りになりました</strong>。<br>
                        (Giám đốc ĐÃ VỀ).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 49</h2>
                <div class="grammar-example">
                    <p><strong>Tôn Kính Ngữ (Nâng hành động của NGƯỜI KHÁC lên):</strong></p>
                    <ul>
                        <li style="margin-bottom:15px;"><strong>C1: Từ đặc biệt:</strong> 召し上がる(Ăn,Uống), いらっしゃる(Đi,Đến,Ở), おっしゃる(Nói)...</li>
                        <li style="margin-bottom:15px;"><strong>C2: お V(bỏ ます) に なります:</strong> (Dùng cho N1, N2 không có dạng đặc biệt).</li>
                        <li style="margin-bottom:15px;"><strong>C3: Chia giống Bị động:</strong> Vられます (Mức độ nhẹ nhất).</li>
                        <li style="margin-bottom:15px;"><strong>Mẫu xin mời:</strong> お/ご V ください (お待ちください).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 49! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Hãy thuộc lòng các Động từ Tôn Kính đặc biệt nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "買": "<ruby>買<rt>か</rt></ruby>い",
            "物": "<ruby>物<rt>もの</rt></ruby>",
            "行かせました": "<ruby>行<rt>い</rt></ruby>かせました",
            "電話": "<ruby>電話<rt>でんわ</rt></ruby>",
            "使わせて": "<ruby>使<rt>つか</rt></ruby>わせて",
            "召し上がります": "<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がります",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "言います": "<ruby>言<rt>い</rt></ruby>ます",
            "ご覧になります": "<ruby>ご覧<rt>ごらん</rt></ruby>になります",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "存じです": "<ruby>存<rt>ぞん</rt></ruby>じです",
            "知っています": "<ruby>知<rt>し</rt></ruby>っています",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "今": "<ruby>今<rt>いま</rt></ruby>",
            "会議室": "<ruby>会議室<rt>かいぎしつ</rt></ruby>",
            "帰り": "<ruby>帰<rt>かえ</rt></ruby>り",
            "帰ります": "<ruby>帰<rt>かえ</rt></ruby>ります",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "読み": "<ruby>読<rt>よ</rt></ruby>み",
            "読みます": "<ruby>読<rt>よ</rt></ruby>みます",
            "何時": "<ruby>何時<rt>なんじ</rt></ruby>",
            "来られます": "<ruby>来<rt>こ</rt></ruby>られます",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "お客様": "<ruby>お客様<rt>おきゃくさま</rt></ruby>",
            "吸われます": "<ruby>吸<rt>す</rt></ruby>われます",
            "吸います": "<ruby>吸<rt>す</rt></ruby>います",
            "社員": "<ruby>社員<rt>しゃいん</rt></ruby>",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "新聞": "<ruby>新聞<rt>しんぶん</rt></ruby>",
            "座り": "<ruby>座<rt>すわ</rt></ruby>り",
            "座ります": "<ruby>座<rt>すわ</rt></ruby>ります",
            "少々": "<ruby>少々<rt>しょうしょう</rt></ruby>",
            "待ち": "<ruby>待<rt>ま</rt></ruby>ち",
            "待ちます": "<ruby>待<rt>ま</rt></ruby>ちます",
            "注意": "<ruby>注意<rt>ちゅうい</rt></ruby>",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "何": "<ruby>何<rt>なに</rt></ruby>",
            "帰りました": "<ruby>帰<rt>かえ</rt></ruby>りました"
        }
    },
    
    "bai50": {
        "title": "Bài 50 (BÀI CUỐI)",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 50 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Khiêm Nhường Ngữ (謙譲語)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
                <h4 style="color:var(--danger); margin-top:20px;">🎉 BÀI HỌC CUỐI CÙNG 🎉</h4>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 49)</p>
                    <p class="quiz-q">1. Chọn Tôn kính ngữ đúng của 食べます:<br>
                    社長は もう 昼ごはんを ( A. お食べになりました / B. 召し上がりました )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 召し上がりました</strong><br>
                        (Vì "Ăn" có động từ đặc biệt, phải ưu tiên dùng từ đặc biệt).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Xin vui lòng đợi một chút." (Sử dụng お～ください)</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        少々 <strong>お待ちください</strong>。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Khiêm Nhường Ngữ Đặc Biệt (Bài 50)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>参ります</strong> (まいります) : Đi, đến (行きます, 来ます)</div>
                    <div class="vocab-item"><strong>おります</strong> : Ở (います)</div>
                    <div class="vocab-item"><strong>いただきます</strong> : Ăn, uống, nhận (食べます, 飲みます, もらいます)</div>
                    <div class="vocab-item"><strong>申します</strong> (もうします) : Nói, tên là (言います)</div>
                    <div class="vocab-item"><strong>いたします</strong> : Làm (します)</div>
                    <div class="vocab-item"><strong>拝見します</strong> (はいけんします) : Xem (見ます)</div>
                    <div class="vocab-item"><strong>存じております</strong> (ぞんじております) : Biết (知っています)</div>
                    <div class="vocab-item"><strong>伺います</strong> (うかがいます) : Hỏi, đến thăm (聞きます, 行きます)</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Khiêm Nhường Ngữ là gì?</h2>
                <div class="grammar-example">
                    <p><strong>Khái niệm:</strong> Khiêm Nhường Ngữ (謙譲語 - Kenjougo) là cách nói <strong>HẠ THẤP HÀNH ĐỘNG CỦA BẢN THÂN MÌNH XUỐNG</strong>, qua đó gián tiếp tôn trọng người đối diện.</p>
                    <p style="color:var(--danger)">*TUYỆT ĐỐI CHỈ DÙNG cho hành động của "TÔI" hoặc người trong nhóm của mình (Gia đình, Công ty mình).</p>
                </div>
                
                <div class="grammar-example fragment">
                    <p style="font-weight:bold; color:var(--primary);">Cách 1: Dùng các Động từ Đặc biệt (Xem slide trước)</p>
                    <p>私 は ベトナムから <strong>参りました</strong>。</p>
                    <span class="trans">TÔI ĐẾN từ Việt Nam. (Khiêm nhường của 来ました).</span>
                    <br>
                    <p>私 は マイクと <strong>申します</strong>。</p>
                    <span class="trans">TÔI TÊN LÀ (nói) Mike. (Khiêm nhường của 言います).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Cách 2: お V(bỏ ます) します</h2>
                <div class="box-highlight">
                    お ＋ V (Bỏ ます) ＋ します<br>
                    ご ＋ Danh từ (Nhóm 3) ＋ します
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng cho những động từ không có dạng đặc biệt. Hành động NÀY CỦA TÔI là làm cho/ảnh hưởng đến ĐỐI TÁC.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>重そうですね。私が <strong>お持ち します</strong>。</p>
                    <span class="trans">Trông nặng nhỉ. Để TÔI CẦM GIÚP cho. (持ちます ➔ お持ちします).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>明日の 予定を <strong>ご説明 します</strong>。</p>
                    <span class="trans">TÔI XIN GIẢI THÍCH lịch trình ngày mai. (説明します ➔ ご説明します).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🔍 Tổng hợp Tôn Kính vs Khiêm Nhường</h2>
                <div class="grammar-example">
                    <p style="text-align:center; font-weight:bold; color:var(--primary); font-size:1.3em;">BẢNG SO SÁNH ĐỐI CHIẾU</p>
                    <table style="width:100%; font-size:0.9em; border-collapse: collapse; text-align:left;">
                        <tr style="background:#4A6CF7; color:white;">
                            <th style="padding:10px; border:1px solid #ccc;">Động từ thường</th>
                            <th style="padding:10px; border:1px solid #ccc;">Tôn Kính (Ngài làm)</th>
                            <th style="padding:10px; border:1px solid #ccc;">Khiêm Nhường (Tôi làm)</th>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">行きます / 来ます</td>
                            <td style="padding:10px; border:1px solid #ccc;">いらっしゃいます</td>
                            <td style="padding:10px; border:1px solid #ccc;">参ります</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">います (Ở)</td>
                            <td style="padding:10px; border:1px solid #ccc;">いらっしゃいます</td>
                            <td style="padding:10px; border:1px solid #ccc;">おります</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">食べます / 飲みます</td>
                            <td style="padding:10px; border:1px solid #ccc;">召し上がります</td>
                            <td style="padding:10px; border:1px solid #ccc;">いただきます</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">言います (Nói)</td>
                            <td style="padding:10px; border:1px solid #ccc;">おっしゃいます</td>
                            <td style="padding:10px; border:1px solid #ccc;">申します</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">見ます (Xem)</td>
                            <td style="padding:10px; border:1px solid #ccc;">ご覧になります</td>
                            <td style="padding:10px; border:1px solid #ccc;">拝見します</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">知っています</td>
                            <td style="padding:10px; border:1px solid #ccc;">ご存じです</td>
                            <td style="padding:10px; border:1px solid #ccc;">存じております</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #ccc;">します (Làm)</td>
                            <td style="padding:10px; border:1px solid #ccc;">なさいます</td>
                            <td style="padding:10px; border:1px solid #ccc;">いたします</td>
                        </tr>
                    </table>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Điện thoại Công việc</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：はい、IMCで <strong>ございます</strong>。</p>
                    <span class="trans">A: Vâng, đây là công ty IMC. (ございます là Thể lịch sự của です).</span>
                    <br>
                    <p class="dialogue-p2">B：パワー電気の シュミットと <strong>申します</strong>。ミラーさん は <strong>いらっしゃいます</strong>か。</p>
                    <span class="trans">B: TÔI TÊN LÀ Schmidt của Điện lực Power. Anh Miller CÓ Ở ĐÓ không ạ? (Tôn kính).</span>
                    <br>
                    <p class="dialogue-p1">A：申し訳ありません。ミラーは 今 外出 して<strong>おります</strong>。</p>
                    <span class="trans">A: Xin lỗi anh. Anh Miller hiện TÔI ĐANG ĐI VẮNG ạ. (Nhân viên dùng Khiêm nhường 'おります' cho Miller vì cùng phe công ty).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn từ Khiêm nhường đúng:<br>
                    初めまして。山田と ( A. おっしゃいます / B. 申します )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 申します</strong>.<br>
                        (Vì nói về TÊN CỦA MÌNH nên phải dùng Khiêm nhường).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chuyển sang Khiêm nhường ngữ:<br>
                    先生の写真を ( 見ました ) ___________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        先生の写真を <strong>拝見しました</strong>。<br>
                        (Tôi đã vinh hạnh được XEM ảnh của thầy).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 50</h2>
                <div class="grammar-example">
                    <p><strong>Khiêm Nhường Ngữ (Hạ TÔI xuống để Tôn trọng NGÀI):</strong></p>
                    <ul>
                        <li style="margin-bottom:15px;"><strong>C1: Từ đặc biệt:</strong> 参る(Đi/Đến), おる(Ở), 申す(Nói), 拝見する(Xem), 伺う(Hỏi/Thăm)...</li>
                        <li style="margin-bottom:15px;"><strong>C2: お V(bỏ ます) します:</strong> Dùng cho động từ thường (お持ちします - Để tôi cầm cho).</li>
                        <li style="margin-bottom:15px;"><strong>Thể lịch sự của です/あります:</strong> でございます / ございます.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center; background:#ffeb3b; border-left-color:#e65100; color:#e65100;">
                    🎉 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH TOÀN BỘ 50 BÀI MINNA NO NIHONGO! 🎉<br>
                    <span style="font-size:0.7em; font-weight:normal; color:#333;">Bạn đã chinh phục thành công trình độ N4. Hãy tự hào về bản thân và tiếp tục cố gắng nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "昼": "<ruby>昼<rt>ひる</rt></ruby>",
            "食べになりました": "<ruby>食<rt>た</rt></ruby>べになりました",
            "召し上がりました": "<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がりました",
            "少々": "<ruby>少々<rt>しょうしょう</rt></ruby>",
            "待ちください": "<ruby>待<rt>ま</rt></ruby>ちください",
            "参ります": "<ruby>参<rt>まい</rt></ruby>ります",
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "申します": "<ruby>申<rt>もう</rt></ruby>します",
            "言います": "<ruby>言<rt>い</rt></ruby>ます",
            "拝見します": "<ruby>拝見<rt>はいけん</rt></ruby>します",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "存じております": "<ruby>存<rt>ぞん</rt></ruby>じております",
            "知っています": "<ruby>知<rt>し</rt></ruby>っています",
            "伺います": "<ruby>伺<rt>うかが</rt></ruby>います",
            "聞きます": "<ruby>聞<rt>き</rt></ruby>きます",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "来ました": "<ruby>来<rt>き</rt></ruby>ました",
            "重そうですね": "<ruby>重<rt>おも</rt></ruby>そうですね",
            "持ち": "<ruby>持<rt>も</rt></ruby>ち",
            "持ちます": "<ruby>持<rt>も</rt></ruby>ちます",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "予定": "<ruby>予定<rt>よてい</rt></ruby>",
            "説明": "<ruby>説明<rt>せつめい</rt></ruby>",
            "電気": "<ruby>電気<rt>でんき</rt></ruby>",
            "申し訳ありません": "<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ありません",
            "今": "<ruby>今<rt>いま</rt></ruby>",
            "外出": "<ruby>外出<rt>がいしゅつ</rt></ruby>",
            "初めまして": "<ruby>初<rt>はじ</rt></ruby>めまして",
            "山田": "<ruby>山田<rt>やまだ</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "写真": "<ruby>写真<rt>しゃしん</rt></ruby>",
            "見ました": "<ruby>見<rt>み</rt></ruby>ました",
            "拝見しました": "<ruby>拝見<rt>はいけん</rt></ruby>しました"
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

print("Super Mega Batch 6 (Lessons 48-50) generated successfully! ALL 50 LESSONS COMPLETED!")
