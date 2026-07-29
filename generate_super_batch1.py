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
    "bai29": {
        "title": "Bài 29",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 29 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Tự động từ & Vて しまいました</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 28)</p>
                    <p class="quiz-q">1. Chuyển câu sau sang tiếng Nhật sử dụng mẫu Vながら：<br>
                    "Tôi vừa uống cà phê vừa đọc báo."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        コーヒーを飲みながら、新聞を読みます。<br>
                        (Chú ý: Hành động chính để ở vế sau).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    休みの日は ( A. 掃除したり / B. 掃除しながら )、洗濯したり しています。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 掃除したり</strong><br>
                        Mẫu Vたり Vたり します dùng để liệt kê hành động.
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 29)</h2>
                <p>Hãy cùng đọc to các từ vựng sau trước khi vào bài nhé:</p>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>開きます</strong> (あきます) : Mở (cửa mở)</div>
                    <div class="vocab-item"><strong>閉まります</strong> (しまります) : Đóng (cửa đóng)</div>
                    <div class="vocab-item"><strong>つきます</strong> (電気が) : Bật (điện sáng)</div>
                    <div class="vocab-item"><strong>消えます</strong> (きえます) : Tắt (điện tắt)</div>
                    <div class="vocab-item"><strong>壊れます</strong> (こわれます) : Hỏng</div>
                    <div class="vocab-item"><strong>割れます</strong> (われます) : Vỡ</div>
                    <div class="vocab-item"><strong>落とします</strong> (おとします) : Làm rơi</div>
                    <div class="vocab-item"><strong>間違えます</strong> (まちがえます) : Nhầm, sai</div>
                </div>
                <p class="fragment" style="margin-top:20px; color:var(--primary); font-weight:bold;">👉 Chú ý: Đa số từ vựng bài này là TỰ ĐỘNG TỪ.</p>
            </section>""",

            """<section>
                <h2 class="section-title">1. Tự Động Từ & Tha Động Từ</h2>
                <div class="grammar-example">
                    <p><strong>Tha động từ (他動詞):</strong> Có chủ ngữ (con người) tác động vào tân ngữ. Trợ từ <strong>を</strong>.</p>
                    <p style="color:var(--primary)">例：私が窓を<ruby>開<rt>あ</rt></ruby>けます。(Tôi mở cửa sổ)</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Tự động từ (自動詞):</strong> Nhấn mạnh vào sự thay đổi trạng thái của vật, không đề cập đến ai tác động. Trợ từ <strong>が</strong>.</p>
                    <p style="color:var(--danger)">例：窓が<ruby>開<rt>あ</rt></ruby>きます。(Cửa sổ mở)</p>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">Bài tập phản xạ: Tha ↔ Tự</h2>
                <div class="quiz-box">
                    <p class="quiz-q">Giáo viên sẽ đọc Tha động từ, học viên hãy đọc Tự động từ tương ứng:</p>
                    <ul>
                        <li>開けます (Mở) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">開きます</span></li>
                        <li>閉めます (Đóng) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">閉まります</span></li>
                        <li>つけます (Bật) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">つきます</span></li>
                        <li>消します (Tắt) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">消えます</span></li>
                        <li>壊します (Làm hỏng) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">壊れます</span></li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. N が Tự động từ + て います</h2>
                <div class="box-highlight">
                    N が V(Tự động từ) て います
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả một TRẠNG THÁI đang hiện hữu trước mắt. Hành động đã xảy ra trong quá khứ và kết quả của nó vẫn còn lưu lại đến hiện tại.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>窓が開いています。</p>
                    <span class="trans">Cửa sổ đang mở. (Trạng thái)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このパソコンは壊れています。</p>
                    <span class="trans">Máy tính này đang hỏng. (Đã hỏng từ trước và giờ vẫn chưa sửa xong).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Trạng thái</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">田中：あ、スーパーの電気が消えていますね。</p>
                    <span class="trans">Tanaka: A, điện của siêu thị đang tắt kìa.</span>
                    <br>
                    <p class="dialogue-p2">佐藤：本当ですね。もう閉まっていますよ。</p>
                    <span class="trans">Satou: Thật nhỉ. Đóng cửa mất rồi.</span>
                    <br>
                    <p class="dialogue-p1">田中：残念ですね。コンビニは開いていますか。</p>
                    <span class="trans">Tanaka: Tiếc thế. Combini có đang mở không?</span>
                    <br>
                    <p class="dialogue-p2">佐藤：ええ、あそこのコンビニは開いていますよ。</p>
                    <span class="trans">Satou: Có, combini đằng kia đang mở cửa đấy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Luyện tập: ています</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Điền trợ từ và chia động từ:</p>
                    <p>電車 ___ （込む）_________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        電車 <strong>が</strong> <strong>込んでいます</strong>。<br>
                        (Tàu điện đang đông người - Trạng thái).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Sửa lỗi sai trong câu sau:</p>
                    <p>「このお皿を割れています。」</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Sửa: このお皿 <strong>が</strong> 割れています。<br>
                        (Vì "割れる" là tự động từ, nên phải đi với "が", không dùng "を").
                    </div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vて しまいました (Tiếc nuối / Lỡ)</h2>
                <div class="box-highlight">
                    Vて しまいました
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa 1:</strong> Diễn tả một sự việc không may xảy ra, mang tâm trạng <strong>tiếc nuối, hối hận, xin lỗi</strong>.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>パスポートを落としてしまいました。</p>
                    <span class="trans">Tôi lỡ làm rơi hộ chiếu mất rồi. 😭</span>
                </div>
                <div class="grammar-example fragment">
                    <p>電車に傘を忘れてしまいました。</p>
                    <span class="trans">Tôi lỡ để quên cái ô trên tàu mất rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>道に迷ってしまいました。</p>
                    <span class="trans">Tôi lỡ bị lạc đường mất rồi.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vて しまいました (Hoàn thành)</h2>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa 2:</strong> Nhấn mạnh việc đã hoàn thành xong XONG TOÀN BỘ một việc gì đó (không còn sót lại chút nào).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>漢字の宿題はもう全部やってしまいました。</p>
                    <span class="trans">Bài tập chữ Hán tôi đã làm xong HẾT sạch rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この本は全部読んでしまいました。</p>
                    <span class="trans">Cuốn sách này tôi đã đọc xong toàn bộ rồi.</span>
                </div>
                <div class="box-highlight fragment">
                    <strong>* Vて しまいます:</strong> Nhấn mạnh ý chí SẼ làm xong toàn bộ trong tương lai.<br>
                    昼ごはんまでに、このレポートを書いてしまいます。 (Trước bữa trưa, tôi sẽ viết xong báo cáo này).
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Lỡ làm gì đó</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：どうしたんですか。元気がないですね。</p>
                    <span class="trans">A: Cậu sao thế? Trông buồn vậy.</span>
                    <br>
                    <p class="dialogue-p2">B：実は、昨日買ったばかりのスマホを落としてしまったんです。</p>
                    <span class="trans">B: Thật ra là, tôi lỡ làm rơi mất cái điện thoại vừa mua hôm qua.</span>
                    <br>
                    <p class="dialogue-p1">A：えっ、それは大変ですね。交番へ行きましたか。</p>
                    <span class="trans">A: Ế, thế thì gay go nhỉ. Đã đến đồn cảnh sát báo chưa?</span>
                    <br>
                    <p class="dialogue-p2">B：はい、行きましたが、まだ見つかっていません。</p>
                    <span class="trans">B: Tôi đi rồi, nhưng vẫn chưa tìm thấy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn đáp án đúng cho tình huống: "Thấy cốc cà phê bị đổ ra bàn và muốn báo cho bạn biết".</p>
                    <p>A. コーヒーがこぼしていますよ。</p>
                    <p>B. コーヒーがこぼれていますよ。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B</strong>.<br>
                        Đây là trạng thái tự nhiên, nên phải dùng Tự động từ (こぼれる).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chia động từ trong ngoặc: どこかで財布を（落とす）__________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: 落としてしまいました。<br>
                        (Mang ý nghĩa lỡ đánh rơi, tiếc nuối).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 29</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>N が Tự động từ + て います:</strong><br> Mô tả trạng thái hiện hữu (Cửa đang mở: 窓が開いています).</li>
                        <li style="margin-bottom:15px;"><strong>Vて しまいました (Tiếc nuối):</strong><br> Lỡ làm hỏng việc gì (Quên ô: 傘を忘れてしまいました).</li>
                        <li style="margin-bottom:15px;"><strong>Vて しまいました (Hoàn thành):</strong><br> Làm xong toàn bộ (Uống hết rượu: お酒を全部飲んでしまいました).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 29! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Hãy ôn tập thật kỹ từ vựng và làm bài tập trong sách nhé.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "開きます": "<ruby>開<rt>あ</rt></ruby>きます",
            "閉まります": "<ruby>閉<rt>し</rt></ruby>まります",
            "消えます": "<ruby>消<rt>き</rt></ruby>えます",
            "壊れます": "<ruby>壊<rt>こわ</rt></ruby>れます",
            "割れます": "<ruby>割<rt>わ</rt></ruby>れます",
            "落とします": "<ruby>落<rt>お</rt></ruby>します",
            "間違えます": "<ruby>間違<rt>まちが</rt></ruby>えます",
            "開け": "<ruby>開<rt>あ</rt></ruby>け",
            "壊れて": "<ruby>壊<rt>こわ</rt></ruby>れて",
            "開いて": "<ruby>開<rt>あ</rt></ruby>いて",
            "電気": "<ruby>電気<rt>でんき</rt></ruby>",
            "消えて": "<ruby>消<rt>き</rt></ruby>えて",
            "本当": "<ruby>本当<rt>ほんとう</rt></ruby>",
            "閉まって": "<ruby>閉<rt>し</rt></ruby>まって",
            "残念": "<ruby>残念<rt>ざんねん</rt></ruby>",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "皿": "<ruby>皿<rt>さら</rt></ruby>",
            "傘": "<ruby>傘<rt>かさ</rt></ruby>",
            "忘れて": "<ruby>忘<rt>わす</rt></ruby>れて",
            "道": "<ruby>道<rt>みち</rt></ruby>",
            "迷って": "<ruby>迷<rt>まよ</rt></ruby>って",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "全部": "<ruby>全部<rt>ぜんぶ</rt></ruby>",
            "読んで": "<ruby>読<rt>よ</rt></ruby>んで",
            "昼": "<ruby>昼<rt>ひる</rt></ruby>",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて",
            "元気": "<ruby>元気<rt>げんき</rt></ruby>",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "交番": "<ruby>交番<rt>こうばん</rt></ruby>",
            "行きました": "<ruby>行<rt>い</rt></ruby>きました",
            "見つかって": "<ruby>見<rt>み</rt></ruby>つかって",
            "財布": "<ruby>財布<rt>さいふ</rt></ruby>"
        }
    },
    
    "bai30": {
        "title": "Bài 30",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 30 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Vて あります & Vて おきます</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 29)</p>
                    <p class="quiz-q">1. Dịch câu sau sang tiếng Nhật sử dụng mẫu Vてしまいました:<br>
                    "Tôi đã lỡ để quên hộ chiếu ở trên taxi mất rồi."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        タクシーにパスポートを忘れてしまいました。
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Điền trợ từ: このコップ (     ) 割れていますから、危ないですよ。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>が</strong><br>
                        (Vì "割れる" là tự động từ, mô tả trạng thái cốc đang vỡ).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 30)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>貼ります</strong> (はります) : Dán</div>
                    <div class="vocab-item"><strong>掛けます</strong> (かけます) : Treo</div>
                    <div class="vocab-item"><strong>飾ります</strong> (かざります) : Trang trí</div>
                    <div class="vocab-item"><strong>並べます</strong> (ならべます) : Xếp thành hàng</div>
                    <div class="vocab-item"><strong>植えます</strong> (うえます) : Trồng (cây)</div>
                    <div class="vocab-item"><strong>戻します</strong> (もどします) : Đưa về chỗ cũ</div>
                    <div class="vocab-item"><strong>まとめます</strong> : Gom lại, tóm tắt</div>
                    <div class="vocab-item"><strong>しまいます</strong> : Cất vào</div>
                </div>
                <p class="fragment" style="margin-top:20px; color:var(--primary); font-weight:bold;">👉 Chú ý: Từ vựng bài này chủ yếu là THA ĐỘNG TỪ.</p>
            </section>""",

            """<section>
                <h2 class="section-title">1. Vて あります (Trạng thái có mục đích)</h2>
                <div class="box-highlight">
                    N1 に N2 が Tha động từ + て あります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả trạng thái của sự vật là <strong>kết quả của một hành động có chủ ý</strong> do ai đó (không cần biết là ai) đã làm trước đó và để lại trạng thái đến bây giờ.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>机の上に本が置いてあります。</p>
                    <span class="trans">Trên bàn CÓ ĐẶT (sẵn) quyển sách. (Ai đó đã đặt nó ở đó với mục đích để đọc hoặc trưng bày).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>壁にカレンダーが掛けてあります。</p>
                    <span class="trans">Trên tường CÓ TREO (sẵn) tờ lịch.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🔍 So sánh: Vています vs Vてあります</h2>
                <div class="grammar-example">
                    <p style="color:var(--danger); font-weight:bold;">Vています (Tự động từ)</p>
                    <p>窓が開いています。<br>
                    <span class="trans">Cửa sổ đang mở. (Chỉ phản ánh thực tế khách quan đập vào mắt, không quan tâm vì sao mở).</span></p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--primary); font-weight:bold;">Vてあります (Tha động từ)</p>
                    <p>窓が開けてあります。<br>
                    <span class="trans">Cửa sổ được mở sẵn. (Nhấn mạnh có người cố tình mở cửa để phòng thoáng khí, mát mẻ - CÓ MỤC ĐÍCH).</span></p>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Vてあります</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">田中：パーティーの準備はもう終わりましたか。</p>
                    <span class="trans">Tanaka: Chuẩn bị tiệc xong hết chưa?</span>
                    <br>
                    <p class="dialogue-p2">佐藤：はい、飲み物はもう冷蔵庫に入れてあります。</p>
                    <span class="trans">Satou: Vâng, đồ uống tôi đã (cho người) cất sẵn vào tủ lạnh rồi.</span>
                    <br>
                    <p class="dialogue-p1">田中：そうですか。お皿やコップはどうですか。</p>
                    <span class="trans">Tanaka: Ra vậy. Thế còn đĩa và cốc thì sao?</span>
                    <br>
                    <p class="dialogue-p2">佐藤：テーブルの上に並べてありますよ。</p>
                    <span class="trans">Satou: Đã được xếp sẵn trên bàn rồi ạ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Vて おきます (Chuẩn bị trước)</h2>
                <div class="box-highlight">
                    Vて おきます
                </div>
                <div class="grammar-example">
                    <p><strong>Cách dùng 1:</strong> Chuẩn bị hoàn tất một việc gì đó TRƯỚC một thời điểm quy định.</p>
                    <p>旅行の前に、切符を買っておきます。</p>
                    <span class="trans">Trước khi đi du lịch, tôi sẽ mua vé sẵn.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 2:</strong> Xử lý công việc SAU KHI kết thúc một việc khác (dọn dẹp, cất đi).</p>
                    <p>ハサミを使ったら、元の所に戻しておいてください。</p>
                    <span class="trans">Sau khi dùng kéo xong, hãy để lại chỗ cũ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 3:</strong> Giữ nguyên trạng thái hiện tại (Cứ để mặc đó).</p>
                    <p>窓を開けておいてください。</p>
                    <span class="trans">Hãy cứ để cửa sổ mở sẵn như thế.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz: Điền Vてあります hay Vておきます?</p>
                    <p class="quiz-q">1. (Hành động sẽ làm): 明日はテストですから、今晩漢字を勉強して (______________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>おきます</strong>.<br>
                        (Chuẩn bị trước cho ngày mai -> Vておきます).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. (Trạng thái kết quả): 黒板に今月の予定が書いて (______________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>あります</strong>.<br>
                        (Lịch trình đang được viết sẵn trên bảng -> Trạng thái có mục đích).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 30</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>N が Tha động từ + て あります:</strong><br> Mô tả trạng thái do ai đó CỐ TÌNH làm để lại (Lịch được treo trên tường: カレンダーが掛けてあります).</li>
                        <li style="margin-bottom:15px;"><strong>Vて おきます:</strong><br> 
                        - Chuẩn bị trước (Mua vé trước).<br>
                        - Xử lý sau khi dùng (Cất đồ về chỗ cũ).<br>
                        - Cứ để nguyên đó (Để nguyên cửa mở).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 30! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Nhớ làm bài tập ngữ pháp để phân biệt rõ Tự động từ và Tha động từ nhé.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "貼ります": "<ruby>貼<rt>は</rt></ruby>ります",
            "掛けます": "<ruby>掛<rt>か</rt></ruby>けます",
            "飾ります": "<ruby>飾<rt>かざ</rt></ruby>ります",
            "並べます": "<ruby>並<rt>なら</rt></ruby>べます",
            "植えます": "<ruby>植<rt>う</rt></ruby>えます",
            "戻します": "<ruby>戻<rt>もど</rt></ruby>します",
            "机": "<ruby>机<rt>つくえ</rt></ruby>",
            "上": "<ruby>上<rt>うえ</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "置いて": "<ruby>置<rt>お</rt></ruby>いて",
            "壁": "<ruby>壁<rt>かべ</rt></ruby>",
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "開いて": "<ruby>開<rt>あ</rt></ruby>いて",
            "開けて": "<ruby>開<rt>あ</rt></ruby>けて",
            "準備": "<ruby>準備<rt>じゅんび</rt></ruby>",
            "終わりました": "<ruby>終<rt>お</rt></ruby>わりました",
            "飲み物": "<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>",
            "冷蔵庫": "<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>",
            "入れて": "<ruby>入<rt>い</rt></ruby>れて",
            "皿": "<ruby>皿<rt>さら</rt></ruby>",
            "旅行": "<ruby>旅行<rt>りょこう</rt></ruby>",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "切符": "<ruby>切符<rt>きっぷ</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "使ったら": "<ruby>使<rt>つか</rt></ruby>ったら",
            "元": "<ruby>元<rt>もと</rt></ruby>",
            "所": "<ruby>所<rt>ところ</rt></ruby>",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "今晩": "<ruby>今晩<rt>こんばん</rt></ruby>",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "黒板": "<ruby>黒板<rt>こくばん</rt></ruby>",
            "今月": "<ruby>今月<rt>こんげつ</rt></ruby>",
            "予定": "<ruby>予定<rt>よてい</rt></ruby>",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて"
        }
    },
    
    "bai31": {
        "title": "Bài 31",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 31 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Thể Ý Định (Vよう) & つもりです</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 30)</p>
                    <p class="quiz-q">1. Điền thể đúng của động từ: 窓が ( 閉める ) ________________ あります。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        窓が <strong>閉めて</strong> あります。<br>
                        (Cửa sổ được đóng sẵn có mục đích).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    明日会議がありますから、今日 イスを 並べて ( A. あります / B. おきます )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. おきます</strong><br>
                        (Hành động "xếp ghế" được chuẩn bị TRƯỚC cho ngày mai).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 31)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>始まります</strong> (はじまります) : Bắt đầu</div>
                    <div class="vocab-item"><strong>続けます</strong> (つづけます) : Tiếp tục</div>
                    <div class="vocab-item"><strong>見つけます</strong> (みつけます) : Tìm thấy</div>
                    <div class="vocab-item"><strong>受けます</strong> (うけます) : Nhận, thi (kỳ thi)</div>
                    <div class="vocab-item"><strong>入学します</strong> (にゅうがくします) : Nhập học</div>
                    <div class="vocab-item"><strong>卒業します</strong> (そつぎょうします) : Tốt nghiệp</div>
                    <div class="vocab-item"><strong>出席します</strong> (しゅっせきします) : Tham dự</div>
                    <div class="vocab-item"><strong>休憩します</strong> (きゅうけいします) : Giải lao</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Ý Định (意向形 - Ikoukei)</h2>
                <p style="font-size: 1.2em; margin-bottom: 20px;">Cách chia từ Thể ます sang Thể Ý định:</p>
                <div class="grammar-example">
                    <p><strong>Nhóm 1 (Cột I → Cột O + う):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>行きます → <span style="color:var(--primary); font-weight:bold;">行こう</span></li>
                        <li>飲みます → <span style="color:var(--primary); font-weight:bold;">飲もう</span></li>
                        <li>急ぎます → <span style="color:var(--primary); font-weight:bold;">急ごう</span></li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + よう):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>食べます → <span style="color:var(--primary); font-weight:bold;">食べよう</span></li>
                        <li>見ます → <span style="color:var(--primary); font-weight:bold;">見よう</span></li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>します → <span style="color:var(--primary); font-weight:bold;">しよう</span></li>
                        <li>来ます → <span style="color:var(--primary); font-weight:bold;">来よう（こよう）</span></li>
                    </ul>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. Ứng dụng: Dùng để Rủ rê</h2>
                <div class="box-highlight">
                    Vよう (Văn nói thân mật)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Đây là cách nói thông thường, suồng sã của "～ましょう". Dùng với bạn bè, người trong gia đình.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>疲れたから、ちょっと休もう。</p>
                    <span class="trans">Mệt rồi, nghỉ một chút thôi. (=休みましょう)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>一緒にビールを飲もう。</p>
                    <span class="trans">Cùng uống bia đi. (= 飲みましょう)</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Rủ rê</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：今週末、海へ行かない？</p>
                    <span class="trans">A: Cuối tuần này đi biển không?</span>
                    <br>
                    <p class="dialogue-p2">B：いいね。行こう！</p>
                    <span class="trans">B: Tuyệt đấy. Đi thôi!</span>
                    <br>
                    <p class="dialogue-p1">A：じゃ、弁当を作って行こうね。</p>
                    <span class="trans">A: Vậy làm bento rồi mang đi nhé.</span>
                    <br>
                    <p class="dialogue-p2">B：うん、そうしよう。</p>
                    <span class="trans">B: Ừ, quyết định vậy đi.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vよう と思っています (Dự định)</h2>
                <div class="box-highlight">
                    Vよう と思っています。
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Tôi dự định... (Thể hiện dự định đã được nhen nhóm từ trước và tại thời điểm nói vẫn đang nghĩ về nó).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>将来、自分の会社を作ろうと思っています。</p>
                    <span class="trans">Tương lai, tôi dự định lập công ty riêng.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>週末はデパートへ行こうと思っています。</p>
                    <span class="trans">Cuối tuần tôi định đi bách hóa.</span>
                </div>
                <div class="box-highlight fragment" style="font-size: 0.9em; padding: 10px 20px;">
                    * Lưu ý: Khác với "Vよう と思います" (Dự định bộc phát ngay lúc nói).
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. つもりです (Dự định chắc chắn)</h2>
                <div class="box-highlight">
                    Vる つもりです。<br>
                    Vない つもりです。
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dự định chắc chắn, sự quyết tâm thực hiện một việc gì đó (Mức độ chắc chắn cao hơn so với Vようと思っています).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>来年、結婚するつもりです。</p>
                    <span class="trans">Tôi dự định sẽ kết hôn vào năm sau.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>明日からはタバコを吸わないつもりです。</p>
                    <span class="trans">Từ ngày mai tôi định sẽ không hút thuốc nữa.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chuyển câu rủ rê sau sang văn nói thân mật (dùng thể Ý định):<br>
                    「一緒に帰りましょう。」</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        一緒に<strong>帰ろう</strong>。<br>
                        (帰ります thuộc nhóm 1 -> 帰ろう).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    国へ帰っても、日本語の勉強を ( A. 続ける / B. 続けよう ) つもりです。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 続ける</strong><br>
                        (Cấu trúc là Vる つもりです, không dùng thể Ý định với つもり).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 31</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Cách chia Vよう (Thể ý định):</strong> Nhóm 1 (おう), Nhóm 2 (よう), Nhóm 3 (しよう / こよう).</li>
                        <li style="margin-bottom:15px;"><strong>Vよう:</strong> Rủ rê bạn bè thân thiết.</li>
                        <li style="margin-bottom:15px;"><strong>Vようと思っています:</strong> Dự định đã nhen nhóm từ trước.</li>
                        <li style="margin-bottom:15px;"><strong>Vる / Vない + つもりです:</strong> Dự định chắc chắn (Kế hoạch vững vàng).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 31! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Đã qua giai đoạn khởi đầu của Minna II rồi, tiếp tục phát huy nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "閉める": "<ruby>閉<rt>し</rt></ruby>める",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "並べて": "<ruby>並<rt>なら</rt></ruby>べて",
            "始まります": "<ruby>始<rt>はじ</rt></ruby>まります",
            "続けます": "<ruby>続<rt>つづ</rt></ruby>けます",
            "見つけます": "<ruby>見<rt>み</rt></ruby>つけます",
            "受けます": "<ruby>受<rt>う</rt></ruby>けます",
            "入学": "<ruby>入学<rt>にゅうがく</rt></ruby>",
            "卒業": "<ruby>卒業<rt>そつぎょう</rt></ruby>",
            "出席": "<ruby>出席<rt>しゅっせき</rt></ruby>",
            "休憩": "<ruby>休憩<rt>きゅうけい</rt></ruby>",
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "行こう": "<ruby>行<rt>い</rt></ruby>こう",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "飲もう": "<ruby>飲<rt>の</rt></ruby>もう",
            "急ぎます": "<ruby>急<rt>いそ</rt></ruby>きます",
            "急ごう": "<ruby>急<rt>いそ</rt></ruby>ごう",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "食べよう": "<ruby>食<rt>た</rt></ruby>べよう",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見よう": "<ruby>見<rt>み</rt></ruby>よう",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "疲れた": "<ruby>疲<rt>つか</rt></ruby>れた",
            "休もう": "<ruby>休<rt>やす</rt></ruby>もう",
            "一緒に": "<ruby>一緒<rt>いっしょ</rt></ruby>に",
            "今週末": "<ruby>今週末<rt>こんしゅうまつ</rt></ruby>",
            "海": "<ruby>海<rt>うみ</rt></ruby>",
            "弁当": "<ruby>弁当<rt>べんとう</rt></ruby>",
            "作って": "<ruby>作<rt>つく</rt></ruby>って",
            "思って": "<ruby>思<rt>おも</rt></ruby>って",
            "将来": "<ruby>将来<rt>しょうらい</rt></ruby>",
            "自分": "<ruby>自分<rt>じぶん</rt></ruby>",
            "会社": "<ruby>会社<rt>かいしゃ</rt></ruby>",
            "週末": "<ruby>週末<rt>しゅうまつ</rt></ruby>",
            "来年": "<ruby>来年<rt>らいねん</rt></ruby>",
            "結婚": "<ruby>結婚<rt>けっこん</rt></ruby>",
            "吸わない": "<ruby>吸<rt>す</rt></ruby>わない",
            "帰りましょう": "<ruby>帰<rt>かえ</rt></ruby>りましょう",
            "国": "<ruby>国<rt>くに</rt></ruby>",
            "帰って": "<ruby>帰<rt>かえ</rt></ruby>って",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>"
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

print("Super Mega Batch 1 (Lessons 29-31) generated successfully!")
