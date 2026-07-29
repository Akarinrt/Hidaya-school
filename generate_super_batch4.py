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
    "bai40": {
        "title": "Bài 40",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 40 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Câu hỏi lồng ghép & Vてみます (Thử làm)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 39)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    危ないですから、( A. 機械に触らなくて / B. 機械に触らないで ) ください。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 機械に触らないで</strong><br>
                        (Vì vế sau là câu yêu cầu/mệnh lệnh, không dùng thể て để chỉ nguyên nhân).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Nối câu dùng ので:<br>
                    日曜日だ。 / 銀行は休みです。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        日曜日 <strong>なので</strong>、銀行は休みです。<br>
                        (Danh từ + なので).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 40)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>数えます</strong> (かぞえます) : Đếm</div>
                    <div class="vocab-item"><strong>測ります</strong> (はかります) : Đo, cân</div>
                    <div class="vocab-item"><strong>確かめます</strong> (たしかめます) : Xác nhận</div>
                    <div class="vocab-item"><strong>合います</strong> (あいます) : Vừa, hợp (kích cỡ)</div>
                    <div class="vocab-item"><strong>出発します</strong> (しゅっぱつします) : Xuất phát</div>
                    <div class="vocab-item"><strong>到着します</strong> (とうちゃくします) : Đến nơi</div>
                    <div class="vocab-item"><strong>酔います</strong> (よいます) : Say (rượu)</div>
                    <div class="vocab-item"><strong>うまくいきます</strong> : Thuận lợi, tốt đẹp</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～か、～ (Câu hỏi lồng ghép có nghi vấn từ)</h2>
                <div class="box-highlight">
                    Nghi vấn từ + Thể thông thường + か、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để lồng ghép một câu hỏi (CÓ nghi vấn từ như 何、どこ、いつ...) vào trong một câu khác lớn hơn.</p>
                    <p style="color:var(--danger)">* Tính từ な / Danh từ ➔ Bỏ だ ＋ か</p>
                </div>
                <div class="grammar-example fragment">
                    <p>会議は 何時に終わる<strong>か</strong>、分かりません。</p>
                    <span class="trans">Tôi không biết (rằng) cuộc họp sẽ kết thúc lúc MẤY GIỜ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>どこで ケータイをなくした<strong>か</strong>、覚えていません。</p>
                    <span class="trans">Tôi không nhớ (rằng) mình đã làm mất điện thoại Ở ĐÂU.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. ～かどうか、～ (Có hay không)</h2>
                <div class="box-highlight">
                    Thể thông thường + かどうか、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Lồng ghép câu hỏi (KHÔNG CÓ nghi vấn từ) vào trong câu. Có nghĩa là "Có... hay không".</p>
                    <p style="color:var(--danger)">* Tính từ な / Danh từ ➔ Bỏ だ ＋ かどうか</p>
                </div>
                <div class="grammar-example fragment">
                    <p>その話は 本当<strong>かどうか</strong>、分かりません。</p>
                    <span class="trans">Tôi không biết chuyện đó CÓ thật HAY KHÔNG. (本当 là Tính từ な -> bỏ だ).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>間違いがない<strong>かどうか</strong>、確かめてください。</p>
                    <span class="trans">Hãy xác nhận xem CÓ lỗi sai HAY KHÔNG.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Lồng ghép câu hỏi</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：すみません、この電車は 京都へ 行く<strong>かどうか</strong>、教えてください。</p>
                    <span class="trans">A: Xin lỗi, làm ơn chỉ giúp tôi tàu này CÓ đi Kyoto HAY KHÔNG?</span>
                    <br>
                    <p class="dialogue-p2">B：ええと、行きませんよ。</p>
                    <span class="trans">B: À ừm, không đi đâu.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。じゃ、京都へ行く電車は 何番線<strong>か</strong>、分かりますか。</p>
                    <span class="trans">A: Vậy à. Thế anh có biết tàu đi Kyoto là sân ga SỐ MẤY không?</span>
                    <br>
                    <p class="dialogue-p2">B：3番線ですよ。</p>
                    <span class="trans">B: Sân ga số 3 nhé.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vて みます (Thử làm V)</h2>
                <div class="box-highlight">
                    Vて みます
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Làm THỬ một việc gì đó (để xem kết quả thế nào). Tương đương với "try doing something" trong tiếng Anh.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>新しい靴を買いました。ちょっと履い<strong>てみます</strong>。</p>
                    <span class="trans">Tôi vừa mua đôi giày mới. Tôi sẽ đi THỬ xem sao.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>おいしそうですね。食べ<strong>てみてもいいですか</strong>。</p>
                    <span class="trans">Trông ngon quá. Tôi ăn THỬ có được không?</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền か hay かどうか?<br>
                    私たちが いつ結婚する (_____)、まだ 決めていません。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>か</strong>.<br>
                        (Vì trong câu có nghi vấn từ "いつ" - bao giờ).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    服を買う前に、着て ( A. します / B. みます )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. みます</strong><br>
                        (Thử mặc quần áo: 着てみます).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 40</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>~か:</strong> Dùng khi có nghi vấn từ (何、いつ、どこ...).</li>
                        <li style="margin-bottom:15px;"><strong>~かどうか:</strong> Dùng khi KHÔNG có nghi vấn từ (Dịch: Có hay không).</li>
                        <li style="margin-bottom:15px;"><strong>Vて みます:</strong> Thử làm một việc gì đó xem sao.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 40! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Từ bài 40 trở đi, ngữ pháp sẽ ngày càng thú vị và linh hoạt hơn!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "危ない": "<ruby>危<rt>あぶ</rt></ruby>ない",
            "機械": "<ruby>機械<rt>きかい</rt></ruby>",
            "触らなくて": "<ruby>触<rt>さわ</rt></ruby>らなくて",
            "触らないで": "<ruby>触<rt>さわ</rt></ruby>らないで",
            "日曜日": "<ruby>日曜日<rt>にちようび</rt></ruby>",
            "銀行": "<ruby>銀行<rt>ぎんこう</rt></ruby>",
            "休み": "<ruby>休<rt>やす</rt></ruby>み",
            "数えます": "<ruby>数<rt>かぞ</rt></ruby>えます",
            "測ります": "<ruby>測<rt>はか</rt></ruby>ります",
            "確かめます": "<ruby>確<rt>たし</rt></ruby>かめます",
            "合います": "<ruby>合<rt>あ</rt></ruby>います",
            "出発": "<ruby>出発<rt>しゅっぱつ</rt></ruby>",
            "到着": "<ruby>到着<rt>とうちゃく</rt></ruby>",
            "酔います": "<ruby>酔<rt>よ</rt></ruby>います",
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "何時": "<ruby>何時<rt>なんじ</rt></ruby>",
            "終わる": "<ruby>終<rt>お</rt></ruby>わる",
            "分かりません": "<ruby>分<rt>わ</rt></ruby>かりません",
            "覚えて": "<ruby>覚<rt>おぼ</rt></ruby>えて",
            "本当": "<ruby>本当<rt>ほんとう</rt></ruby>",
            "間違い": "<ruby>間違<rt>まちが</rt></ruby>い",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "京都": "<ruby>京都<rt>きょうと</rt></ruby>",
            "行く": "<ruby>行<rt>い</rt></ruby>く",
            "教えて": "<ruby>教<rt>おし</rt></ruby>えて",
            "行きません": "<ruby>行<rt>い</rt></ruby>きません",
            "何番線": "<ruby>何番線<rt>なんばんせん</rt></ruby>",
            "分かります": "<ruby>分<rt>わ</rt></ruby>かります",
            "番線": "<ruby>番線<rt>ばんせん</rt></ruby>",
            "新しい": "<ruby>新<rt>あたら</rt></ruby>しい",
            "靴": "<ruby>靴<rt>くつ</rt></ruby>",
            "買いました": "<ruby>買<rt>か</rt></ruby>いました",
            "履いて": "<ruby>履<rt>は</rt></ruby>いて",
            "食べて": "<ruby>食<rt>た</rt></ruby>べて",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "結婚": "<ruby>結婚<rt>けっこん</rt></ruby>",
            "決めて": "<ruby>決<rt>き</rt></ruby>めて",
            "服": "<ruby>服<rt>ふく</rt></ruby>",
            "買う": "<ruby>買<rt>か</rt></ruby>う",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "着て": "<ruby>着<rt>き</rt></ruby>て"
        }
    },
    
    "bai41": {
        "title": "Bài 41",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 41 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Cho & Nhận (Tôn kính / Khiêm nhường)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 40)</p>
                    <p class="quiz-q">1. Điền từ thích hợp: このりんごがおいしい (__________)、食べてみます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        おいしい <strong>かどうか</strong>、食べてみます。<br>
                        (Vì không có nghi vấn từ).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Sửa lỗi sai: どこへ行くかどうか、分かりません。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Sửa lại: どこへ行く <strong>か</strong>、分かりません。<br>
                        (Vì có "どこ" là nghi vấn từ, chỉ dùng "か").
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 41)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>いただきます</strong> : Nhận (Khiêm nhường của もらいます)</div>
                    <div class="vocab-item"><strong>くださいます</strong> : Cho tôi (Tôn kính của くれます)</div>
                    <div class="vocab-item"><strong>やります</strong> : Cho (Dùng cho người dưới, động vật, thực vật)</div>
                    <div class="vocab-item"><strong>上げます</strong> (あげます) : Tăng lên</div>
                    <div class="vocab-item"><strong>下げます</strong> (さげます) : Giảm xuống</div>
                    <div class="vocab-item"><strong>親切にします</strong> (しんせつにします) : Đối xử tử tế</div>
                    <div class="vocab-item"><strong>お祝い</strong> (おいわい) : Quà mừng</div>
                    <div class="vocab-item"><strong>お年玉</strong> (おとしだま) : Tiền mừng tuổi</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Tôi nhận: いただきます</h2>
                <div class="box-highlight">
                    私 は Người bề trên に N を いただきます
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Tôi nhận từ ai đó (Người bề trên: Giám đốc, giáo viên, người lớn tuổi...). Đây là cách nói khiêm nhường của もらいます.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は社長<strong>に</strong>時計を<strong>いただきました</strong>。</p>
                    <span class="trans">Tôi ĐÃ NHẬN chiếc đồng hồ từ Giám đốc.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は先生<strong>に</strong>本を<strong>いただきました</strong>。</p>
                    <span class="trans">Tôi ĐÃ NHẬN quyển sách từ thầy giáo.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Ai đó cho tôi: くださいます</h2>
                <div class="box-highlight">
                    Người bề trên は 私 に N を くださいます
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Ai đó (Người bề trên) CHO tôi. Đây là cách nói tôn kính của くれます.</p>
                    <p style="color:var(--danger)">Lưu ý: Chủ ngữ phải là Người bề trên.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>社長は私<strong>に</strong>時計を<strong>くださいました</strong>。</p>
                    <span class="trans">Giám đốc ĐÃ CHO tôi chiếc đồng hồ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>先生は妹<strong>に</strong>お菓子を<strong>くださいました</strong>。</p>
                    <span class="trans">Thầy giáo ĐÃ CHO em gái tôi bánh kẹo. (Em gái được coi như phe của "Tôi").</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">3. Tôi cho (người dưới): やります</h2>
                <div class="box-highlight">
                    私 は (Người dưới / Động vật / Thực vật) に N を やります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Tôi CHO ai đó ở bậc thấp hơn hẳn (con cái, em út), hoặc cho động vật ăn, tưới nước cho cây.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は息子<strong>に</strong>おもちゃを<strong>やりました</strong>。</p>
                    <span class="trans">Tôi đã cho con trai đồ chơi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は犬<strong>に</strong>えさを<strong>やります</strong>。</p>
                    <span class="trans">Tôi CHO chó ăn (Cho đồ ăn).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は花<strong>に</strong>水を<strong>やります</strong>。</p>
                    <span class="trans">Tôi tưới nước CHO hoa.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Quà tặng</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：きれいなお皿ですね。</p>
                    <span class="trans">A: Cái đĩa đẹp quá nhỉ.</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、結婚のお祝いに 部長が <strong>くださった</strong>んです。</p>
                    <span class="trans">B: Vâng, trưởng phòng đã CHO tôi làm quà mừng kết hôn đấy.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。よかったですね。</p>
                    <span class="trans">A: Vậy à. Tuyệt quá nhỉ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. Vて いただきます / くださいます / やります</h2>
                <div class="grammar-example">
                    <p>Áp dụng tương tự cho hành động (Làm V cho ai):</p>
                    <ul style="line-height:1.6;">
                        <li><strong>Vて いただきます:</strong> Được bề trên làm V cho (Tôi được Giám đốc chỉ lỗi sai cho).<br>
                            ➔ 私は社長に間違いを直していただきました。
                        </li>
                        <li class="fragment"><strong>Vて くださいます:</strong> Bề trên làm V cho tôi (Cô giáo giải thích cho tôi).<br>
                            ➔ 先生は私に説明してくださいました。
                        </li>
                        <li class="fragment"><strong>Vて やります:</strong> Làm V cho người dưới (Tôi đọc sách cho con gái).<br>
                            ➔ 私は娘に本を読んでやります。
                        </li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn động từ đúng:<br>
                    私は 課長に 京都へ 連れて行って ( A. いただきました / B. くださいました )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. いただきました</strong>.<br>
                        (Vì Chủ ngữ là "私 は" - Tôi NHẬN ĐƯỢC hành động).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn động từ đúng:<br>
                    孫の誕生日に 本を買って ( A. あげました / B. やりました )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. やりました</strong><br>
                        (孫 - Cháu, là người dưới hẳn, nên dùng やります).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 41</h2>
                <div class="grammar-example">
                    <p style="font-weight:bold; color:var(--primary);">Hệ thống Tôn kính / Khiêm nhường của CHO & NHẬN:</p>
                    <ul>
                        <li style="margin-bottom:15px;"><strong>もらいます ➔ いただきます</strong> (Tôi nhận từ bề trên)</li>
                        <li style="margin-bottom:15px;"><strong>くれます ➔ くださいます</strong> (Bề trên cho tôi)</li>
                        <li style="margin-bottom:15px;"><strong>あげます ➔ やります</strong> (Tôi cho người dưới / động, thực vật)</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 41! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Luôn chú ý Chủ ngữ là "Ai" để chọn từ cho đúng nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "食べる": "<ruby>食<rt>た</rt></ruby>べる",
            "行く": "<ruby>行<rt>い</rt></ruby>く",
            "分かりません": "<ruby>分<rt>わ</rt></ruby>かりません",
            "上げます": "<ruby>上<rt>あ</rt></ruby>げます",
            "下げます": "<ruby>下<rt>さ</rt></ruby>げます",
            "親切": "<ruby>親切<rt>しんせつ</rt></ruby>",
            "祝い": "<ruby>祝<rt>いわ</rt></ruby>い",
            "年玉": "<ruby>年玉<rt>としだま</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "時計": "<ruby>時計<rt>とけい</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "妹": "<ruby>妹<rt>いもうと</rt></ruby>",
            "菓子": "<ruby>菓子<rt>かし</rt></ruby>",
            "息子": "<ruby>息子<rt>むすこ</rt></ruby>",
            "犬": "<ruby>犬<rt>いぬ</rt></ruby>",
            "花": "<ruby>花<rt>はな</rt></ruby>",
            "水": "<ruby>水<rt>みず</rt></ruby>",
            "皿": "<ruby>皿<rt>さら</rt></ruby>",
            "結婚": "<ruby>結婚<rt>けっこん</rt></ruby>",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "間違い": "<ruby>間違<rt>まちが</rt></ruby>い",
            "直して": "<ruby>直<rt>なお</rt></ruby>して",
            "説明して": "<ruby>説明<rt>せつめい</rt></ruby>して",
            "娘": "<ruby>娘<rt>むすめ</rt></ruby>",
            "読んで": "<ruby>読<rt>よ</rt></ruby>んで",
            "課長": "<ruby>課長<rt>かちょう</rt></ruby>",
            "京都": "<ruby>京都<rt>きょうと</rt></ruby>",
            "連れて": "<ruby>連<rt>つ</rt></ruby>れて",
            "行って": "<ruby>行<rt>い</rt></ruby>って",
            "孫": "<ruby>孫<rt>まご</rt></ruby>",
            "誕生日": "<ruby>誕生日<rt>たんじょうび</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って"
        }
    },
    
    "bai42": {
        "title": "Bài 42",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 42 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: ために (Để/Vì) & のに (Tiêu tốn/Mục đích)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 41)</p>
                    <p class="quiz-q">1. Chọn từ đúng:<br>
                    猫に 魚を ( A. やりました / B. いただきました )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. やりました</strong><br>
                        (Cho động vật ăn thì dùng やります).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch câu: "Giám đốc đã mua quà cho tôi."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        社長は（私に）お土産を買って <strong>くださいました</strong>。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 42)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>包みます</strong> (つつみます) : Bọc, gói</div>
                    <div class="vocab-item"><strong>沸かします</strong> (わかします) : Đun sôi</div>
                    <div class="vocab-item"><strong>混ぜます</strong> (まぜます) : Trộn</div>
                    <div class="vocab-item"><strong>計算します</strong> (けいさんします) : Tính toán</div>
                    <div class="vocab-item"><strong>並びます</strong> (ならびます) : Xếp hàng</div>
                    <div class="vocab-item"><strong>丈夫な</strong> (じょうぶな) : Bền, chắc</div>
                    <div class="vocab-item"><strong>弁護士</strong> (べんごし) : Luật sư</div>
                    <div class="vocab-item"><strong>音楽家</strong> (おんがくか) : Nhạc sĩ</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～ために (Để làm gì...)</h2>
                <div class="box-highlight">
                    Vる / N の ＋ ために、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Biểu thị MỤC ĐÍCH của hành động (làm việc A là ĐỂ ĐẠT ĐƯỢC việc B). Thường đi với động từ chỉ ý chí.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>自分の店を持つ<strong>ために</strong>、貯金しています。</p>
                    <span class="trans">Tôi đang tiết kiệm tiền ĐỂ sở hữu một cửa hàng của riêng mình.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>家族<strong>のために</strong>、うちを建てます。</p>
                    <span class="trans">Tôi xây nhà VÌ/ĐỂ CHO gia đình. (N + のために).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🔍 So sánh: ように vs ために</h2>
                <div class="grammar-example">
                    <p style="color:var(--danger); font-weight:bold;">ように (Bài 36): ĐỂ (Vế trước KHÔNG mang ý chí)</p>
                    <p>家が買えるように、貯金しています。<br>
                    <span class="trans">Để CÓ THỂ mua được nhà (V khả năng), tôi đang tiết kiệm tiền.</span></p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--primary); font-weight:bold;">ために (Bài 42): ĐỂ (Vế trước CÓ MANG ý chí mạnh mẽ)</p>
                    <p>家を買うために、貯金しています。<br>
                    <span class="trans">Để MUA nhà, tôi đang tiết kiệm tiền. (Mua là hành động có chủ đích rõ ràng).</span></p>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Mục đích</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：毎日、日本語を勉強していますね。</p>
                    <span class="trans">A: Ngày nào cậu cũng học tiếng Nhật nhỉ.</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、日本で働く<strong>ために</strong>、勉強しているんです。</p>
                    <span class="trans">B: Vâng, tôi học ĐỂ làm việc ở Nhật mà.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。頑張ってください。</p>
                    <span class="trans">A: Thế à. Cố lên nhé.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Vる / N ＋ のに (Sử dụng/Tiêu tốn để...)</h2>
                <div class="box-highlight">
                    Vる / N ＋ のに ＋ 使います / いいです / かかります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Chỉ mục đích sử dụng (Dùng cái này ĐỂ làm V), đánh giá (Cái này tốt ĐỂ làm V), hoặc tiêu tốn (Mất bao lâu/bao tiền ĐỂ làm V).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>このはさみは 花を切る<strong>のに</strong>使います。</p>
                    <span class="trans">Cái kéo này dùng ĐỂ cắt hoa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このかばんは 大きくて、旅行<strong>のに</strong>便利です。</p>
                    <span class="trans">Cái túi này to nên rất tiện LỢI ĐỂ đi du lịch.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>家を建てる<strong>のに</strong>、３０００万円かかります。</p>
                    <span class="trans">ĐỂ xây nhà, tốn mất 30 triệu yên.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền ように hay ために?<br>
                    大学に ( A. 入る_____ / B. 入れる_____ ) 勉強しています。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        A: 入る <strong>ために</strong> (Chủ ý).<br>
                        B: 入れる <strong>ように</strong> (Khả năng).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    この辞書は、漢字を ( A. 調べるために / B. 調べるのに ) 役に立ちます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 調べるのに</strong><br>
                        (Vì vế sau là đánh giá công dụng "役に立ちます" - Hữu ích để làm gì).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 42</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vる / Nの + ために:</strong> ĐỂ (Chỉ mục đích rõ ràng, ý chí mạnh mẽ).</li>
                        <li style="margin-bottom:15px;"><strong>Vる + ように:</strong> ĐỂ (Chỉ sự mong mỏi, trạng thái, khả năng - Không có ý chí chủ động).</li>
                        <li style="margin-bottom:15px;"><strong>Vる + のに:</strong> ĐỂ (Đi kèm với các từ đánh giá tiện ích, công dụng như: 使います, 便利だ, 役に立つ, かかる).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 42! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Sự khác nhau giữa ために và ように rất hay thi JLPT, hãy lưu ý nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "猫": "<ruby>猫<rt>ねこ</rt></ruby>",
            "魚": "<ruby>魚<rt>さかな</rt></ruby>",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "土産": "<ruby>土産<rt>みやげ</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "包みます": "<ruby>包<rt>つつ</rt></ruby>みます",
            "沸かします": "<ruby>沸<rt>わ</rt></ruby>かします",
            "混ぜます": "<ruby>混<rt>ま</rt></ruby>ぜます",
            "計算": "<ruby>計算<rt>けいさん</rt></ruby>",
            "並びます": "<ruby>並<rt>なら</rt></ruby>びます",
            "丈夫": "<ruby>丈夫<rt>じょうぶ</rt></ruby>",
            "弁護士": "<ruby>弁護士<rt>べんごし</rt></ruby>",
            "音楽家": "<ruby>音楽家<rt>おんがくか</rt></ruby>",
            "自分": "<ruby>自分<rt>じぶん</rt></ruby>",
            "店": "<ruby>店<rt>みせ</rt></ruby>",
            "持つ": "<ruby>持<rt>も</rt></ruby>つ",
            "貯金して": "<ruby>貯金<rt>ちょきん</rt></ruby>して",
            "家族": "<ruby>家族<rt>かぞく</rt></ruby>",
            "建てます": "<ruby>建<rt>た</rt></ruby>てます",
            "家": "<ruby>家<rt>いえ</rt></ruby>",
            "買える": "<ruby>買<rt>か</rt></ruby>える",
            "買う": "<ruby>買<rt>か</rt></ruby>う",
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "勉強して": "<ruby>勉強<rt>べんきょう</rt></ruby>して",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "働く": "<ruby>働<rt>はたら</rt></ruby>く",
            "頑張って": "<ruby>頑張<rt>がんば</rt></ruby>って",
            "花": "<ruby>花<rt>はな</rt></ruby>",
            "切る": "<ruby>切<rt>き</rt></ruby>る",
            "使います": "<ruby>使<rt>つか</rt></ruby>います",
            "大きくて": "<ruby>大<rt>おお</rt></ruby>きくて",
            "旅行": "<ruby>旅行<rt>りょこう</rt></ruby>",
            "便利": "<ruby>便利<rt>べんり</rt></ruby>",
            "建てる": "<ruby>建<rt>た</rt></ruby>てる",
            "万円": "<ruby>万円<rt>まんえん</rt></ruby>",
            "大学": "<ruby>大学<rt>だいがく</rt></ruby>",
            "入る": "<ruby>入<rt>はい</rt></ruby>る",
            "入れる": "<ruby>入<rt>はい</rt></ruby>れる",
            "辞書": "<ruby>辞書<rt>じしょ</rt></ruby>",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "調べる": "<ruby>調<rt>しら</rt></ruby>べる",
            "役": "<ruby>役<rt>やく</rt></ruby>",
            "立ちます": "<ruby>立<rt>た</rt></ruby>ちます"
        }
    },
    
    "bai43": {
        "title": "Bài 43",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 43 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: そうです (Trông có vẻ) & てきます (Đi rồi về)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 42)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    健康の ( A. ために / B. ように )、毎朝走っています。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. ために</strong><br>
                        (Vì "健康" - Sức khỏe là Danh từ, đi với のために).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Tôi dùng dao để thái thịt."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        ナイフは肉を切る<strong>のに</strong>使います。<br>
                        (Mục đích sử dụng công cụ: のに).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 43)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>増えます</strong> (ふえます) : Tăng lên</div>
                    <div class="vocab-item"><strong>減ります</strong> (へります) : Giảm đi</div>
                    <div class="vocab-item"><strong>上がります</strong> (あがります) : Tăng (giá)</div>
                    <div class="vocab-item"><strong>下がります</strong> (さがります) : Giảm (giá)</div>
                    <div class="vocab-item"><strong>切れます</strong> (きれます) : Đứt (sợi dây)</div>
                    <div class="vocab-item"><strong>とれます</strong> : Tuột (cái cúc áo)</div>
                    <div class="vocab-item"><strong>落ちます</strong> (おちます) : Rơi (hành lý)</div>
                    <div class="vocab-item"><strong>なくなります</strong> : Hết (xăng, tiền)</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～そうです (Trông có vẻ - Nhìn bề ngoài)</h2>
                <div class="box-highlight">
                    V (Bỏ ます) + そうです<br>
                    Tính từ い (Bỏ い) + そうです<br>
                    Tính từ な (Bỏ な) + そうです
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Đánh giá, phán đoán một sự việc, trạng thái dựa trên <strong>NHÃN QUAN (nhìn bằng mắt)</strong> ngay tại thời điểm đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>今にも 雨が 降り<strong>そうです</strong>。</p>
                    <span class="trans">Bầu trời đen kịt, TRÔNG CÓ VẺ như trời sắp mưa đến nơi rồi. (Động từ).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この料理は 辛<strong>そうです</strong>。</p>
                    <span class="trans">Món ăn này TRÔNG CÓ VẺ cay. (Tính từ).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">1. ～そうです (Đặc biệt)</h2>
                <div class="grammar-example">
                    <p style="color:var(--danger); font-weight:bold;">* Các trường hợp đặc biệt cần nhớ:</p>
                    <ul style="font-size: 1.2em; line-height: 1.8;">
                        <li>いい ➔ <strong>よさそうです</strong> (Trông có vẻ tốt)</li>
                        <li>ない ➔ <strong>なさそうです</strong> (Trông có vẻ không có)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p>このパソコンは <strong>よさそうです</strong>ね。</p>
                    <span class="trans">Cái máy tính này TRÔNG CÓ VẺ tốt nhỉ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>彼は お金が <strong>なさそうです</strong>。</p>
                    <span class="trans">Anh ta TRÔNG CÓ VẺ không có tiền.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Đánh giá bằng mắt</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：わあ、このケーキ、おいし<strong>そうですね</strong>。</p>
                    <span class="trans">A: Oa, cái bánh kem này TRÔNG ngon thế.</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、昨日オープンした店のケーキですよ。</p>
                    <span class="trans">B: Ừ, bánh của tiệm mới mở hôm qua đấy.</span>
                    <br>
                    <p class="dialogue-p1">A：でも、ちょっと高<strong>そうですね</strong>。</p>
                    <span class="trans">A: Nhưng TRÔNG CÓ VẺ hơi đắt nhỉ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Vて きます (Đi làm V rồi quay lại)</h2>
                <div class="box-highlight">
                    Địa điểm へ行ってきます。(Đi đến Địa điểm rồi quay lại)<br>
                    Vて きます (Đi làm V rồi quay lại)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả việc đi đến một nơi nào đó, hoặc làm một việc gì đó, SAU ĐÓ SẼ QUAY TRỞ LẠI chỗ cũ.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>ちょっとタバコを買っ<strong>てきます</strong>。</p>
                    <span class="trans">Tôi đi mua thuốc lá một chút RỒI QUAY LẠI NGAY.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>スーパーへ行っ<strong>てきます</strong>。</p>
                    <span class="trans">Tôi đi siêu thị một lát RỒI VỀ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chia từ trong ngoặc theo mẫu そうです:<br>
                    荷物が ( 落ちる ) ___________________よ。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        荷物が <strong>落ちそうです</strong>よ。<br>
                        (Cẩn thận kìa, hành lý TRÔNG CÓ VẺ sắp rơi xuống đó).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    トイレへ ( A. 行って / B. 来て ) きます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 行って</strong><br>
                        (Đi vệ sinh rồi quay lại: 行ってきます).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 43</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>V(bỏ ます) / Adj(bỏ い, な) + そうです:</strong> Trông có vẻ (Phán đoán bằng mắt).
                        <br><i>Lưu ý:</i> いい ➔ よさそうです / ない ➔ なさそうです.</li>
                        <li style="margin-bottom:15px;"><strong>Vて きます:</strong> Đi làm việc gì đó rồi quay lại ngay (Thường có chữ ちょっと - một chút).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 43! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Còn 7 bài nữa thôi, cố lên!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "健康": "<ruby>健康<rt>けんこう</rt></ruby>",
            "毎朝": "<ruby>毎朝<rt>まいあさ</rt></ruby>",
            "走って": "<ruby>走<rt>はし</rt></ruby>って",
            "肉": "<ruby>肉<rt>にく</rt></ruby>",
            "切る": "<ruby>切<rt>き</rt></ruby>る",
            "使います": "<ruby>使<rt>つか</rt></ruby>います",
            "増えます": "<ruby>増<rt>ふ</rt></ruby>えます",
            "減ります": "<ruby>減<rt>へ</rt></ruby>ります",
            "上がります": "<ruby>上<rt>あ</rt></ruby>がります",
            "下がります": "<ruby>下<rt>さ</rt></ruby>がります",
            "切れます": "<ruby>切<rt>き</rt></ruby>れます",
            "落ちます": "<ruby>落<rt>お</rt></ruby>ちます",
            "今": "<ruby>今<rt>いま</rt></ruby>",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降り": "<ruby>降<rt>ふ</rt></ruby>り",
            "料理": "<ruby>料理<rt>りょうり</rt></ruby>",
            "辛": "<ruby>辛<rt>から</rt></ruby>",
            "彼": "<ruby>彼<rt>かれ</rt></ruby>",
            "金": "<ruby>金<rt>かね</rt></ruby>",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "店": "<ruby>店<rt>みせ</rt></ruby>",
            "高": "<ruby>高<rt>たか</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "行って": "<ruby>行<rt>い</rt></ruby>って",
            "荷物": "<ruby>荷物<rt>にもつ</rt></ruby>",
            "落ちる": "<ruby>落<rt>お</rt></ruby>ちる",
            "来て": "<ruby>来<rt>き</rt></ruby>て"
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

print("Super Mega Batch 4 (Lessons 40-43) generated successfully!")
