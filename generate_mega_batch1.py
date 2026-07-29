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
        .title-slide h1 {{ color: var(--primary); font-weight: 800; font-size: 2.5em; }}
        .title-slide h3 {{ color: #555; font-size: 1.2em; }}
        
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
            border: 2px dashed var(--primary);
            padding: 25px;
            border-radius: 12px;
            text-align: left;
            margin-bottom: 20px;
        }}
        .quiz-title {{ font-weight: bold; color: var(--primary); margin-bottom: 15px; font-size: 1.2em; }}
        .quiz-q {{ font-size: 1.1em; margin-bottom: 15px; }}
        
        .answer-btn {{
            background: var(--primary);
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
        .answer-btn:hover {{ background: #3a5bde; }}
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
        
        ruby {{ font-size: 1em; }}
        rt {{ font-size: 0.5em; color: var(--primary); font-weight: bold; }}
        
        /* Floating Vocab Box */
        #vocabBox {{
            position: fixed;
            top: 20px; right: 20px;
            width: 250px;
            background: rgba(255, 255, 255, 0.95);
            border-left: 4px solid var(--primary);
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            padding: 15px;
            z-index: 1000;
            font-size: 0.4em;
            text-align: left;
            cursor: grab;
            display: none;
            backdrop-filter: blur(10px);
            max-height: 80vh;
            overflow-y: auto;
        }}
        #vocabBox h4 {{ margin: 0 0 10px 0; color: var(--primary); font-size: 1.2em; border-bottom: 1px solid #eee; padding-bottom: 5px; }}
        #vocabList {{ list-style: none; padding: 0; margin: 0; }}
        #vocabList li {{ margin-bottom: 8px; border-bottom: 1px dashed #ddd; padding-bottom: 5px; display: flex; justify-content: space-between; }}
        #vocabList li:last-child {{ border-bottom: none; }}
        .v-jp {{ font-weight: bold; color: #333; }}
        .v-vi {{ color: #666; font-size: 0.9em; }}
        
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

    <div id="vocabBox">
        <h4>📚 Từ vựng Slide này</h4>
        <ul id="vocabList"></ul>
    </div>

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
            backgroundTransition: 'fade'
        }});

        const furiganaDict = {furigana_json};
        const vocabDict = {vocab_json};

        // Add furigana dynamically
        document.querySelectorAll('p, .trans, .box-highlight, .answer-content, h1, h2, h3, li').forEach(el => {{
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
                btn.style.background = "var(--primary)";
            }} else {{
                content.style.display = "block";
                btn.innerText = "Ẩn đáp án";
                btn.style.background = "var(--danger)";
            }}
        }}

        const vocabBox = document.getElementById('vocabBox');
        const vocabList = document.getElementById('vocabList');
        
        Reveal.on('slidechanged', event => {{
            updateVocab(event.currentSlide);
        }});
        Reveal.on('ready', event => {{
            updateVocab(event.currentSlide);
        }});

        function updateVocab(slide) {{
            let text = slide.innerText;
            let found = false;
            vocabList.innerHTML = '';
            
            for (let word in vocabDict) {{
                if (text.includes(word)) {{
                    found = true;
                    let li = document.createElement('li');
                    li.innerHTML = `<span class="v-jp">${{word}}</span> <span class="v-vi">${{vocabDict[word]}}</span>`;
                    vocabList.appendChild(li);
                }}
            }}
            
            vocabBox.style.display = found ? 'block' : 'none';
        }}

        // Draggable Vocab Box
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        vocabBox.addEventListener("mousedown", dragStart);
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", drag);

        function dragStart(e) {{
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === vocabBox || vocabBox.contains(e.target)) {{
                isDragging = true;
            }}
        }}
        function dragEnd(e) {{
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }}
        function drag(e) {{
            if (isDragging) {{
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                setTranslate(currentX, currentY, vocabBox);
            }}
        }}
        function setTranslate(xPos, yPos, el) {{
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }}
    </script>
</body>
</html>
"""

lessons = {
    "bai29": {
        "title": "Bài 29 (Chi tiết)",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 29</h1>
                <h3>Minna No Nihongo II - Tự Động Từ & Vて しまいました</h3>
                <p>💡 Phiên bản nâng cấp - Tương tác siêu cấp!</p>
            </section>""",
            
            """<section>
                <h2>1. Ôn tập: Tự Động Từ & Tha Động Từ</h2>
                <div class="grammar-example fragment">
                    <p><strong>Tha động từ (他動詞 - Tadoushi):</strong> Hành động có chủ đích tác động lên tân ngữ (Dùng trợ từ を).</p>
                    <p style="color:var(--primary)">例：私が窓を開けます。(Tôi mở cửa sổ)</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Tự động từ (自動詞 - Jidoushi):</strong> Trạng thái tự nhiên xảy ra, không có tác động có ý thức (Dùng trợ từ が).</p>
                    <p style="color:var(--primary)">例：風で窓が開きます。(Cửa sổ tự mở do gió)</p>
                </div>
                <div class="box-highlight fragment">
                    🔑 Mẹo nhớ: Tha động từ đi với を (Người làm). Tự động từ đi với が (Vật tự nó thế).
                </div>
            </section>""",

            """<section>
                <h2>2. Tự động từ + て います (Trạng thái)</h2>
                <div class="box-highlight">
                    N が Tự động từ + て います
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả trạng thái của một sự vật sau khi hành động đã xảy ra và kết quả vẫn đang tồn tại trước mắt.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>窓が開いています。</p>
                    <span class="trans">Cửa sổ đang mở. (Trạng thái cửa mở vẫn đang duy trì)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>パソコンが壊れています。</p>
                    <span class="trans">Máy tính đang bị hỏng.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このコップは割れています。</p>
                    <span class="trans">Cái cốc này bị vỡ rồi.</span>
                </div>
            </section>""",
            
            """<section>
                <h2>🗣 Hội thoại ứng dụng (Kaiwa)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">田中：あっ、あそこのスーパー、電気が消えていますね。</p>
                    <span class="trans">Tanaka: A, cái siêu thị đằng kia, điện đang tắt kìa.</span>
                    <br>
                    <p class="dialogue-p2">佐藤：本当ですね。もう閉まっていますよ。</p>
                    <span class="trans">Satou: Thật nhỉ. Nó đóng cửa mất rồi.</span>
                    <br>
                    <p class="dialogue-p1">田中：残念ですね。じゃ、コンビニへ行きましょう。</p>
                    <span class="trans">Tanaka: Tiếc quá. Vậy đi combini thôi.</span>
                </div>
            </section>""",

            """<section>
                <h2>📝 Bài tập Trắc nghiệm (Quiz)</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Điền trợ từ và chia động từ thích hợp vào chỗ trống:</p>
                    <p>「ドア ___ （閉まる）__________。」 (Cửa đang đóng)</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: ドア <strong>が</strong> <strong>閉まっています</strong>。<br>
                        (Dùng trợ từ が đi với tự động từ 閉まる).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn câu ĐÚNG:</p>
                    <p>A. コップを割れています。</p>
                    <p>B. コップが割れています。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B</strong>.<br>
                        "Cái cốc đang bị vỡ" là trạng thái, dùng tự động từ 割れる đi với が.
                    </div>
                </div>
            </section>""",

            """<section>
                <h2>3. Vて しまいました (Lỡ / Hoàn thành)</h2>
                <div class="box-highlight">
                    Vて しまいました<br>
                    Vて しまいます
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 1 (Tiếc nuối):</strong> Diễn tả việc lỡ làm sai, gây ra kết quả xấu, mang tâm trạng hối hận, tiếc nuối.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>パスポートを落としてしまいました。</p>
                    <span class="trans">Tôi lỡ làm rơi hộ chiếu mất rồi. 😭</span>
                </div>
                <div class="grammar-example fragment">
                    <p>電車に傘を忘れてしまいました。</p>
                    <span class="trans">Tôi lỡ để quên ô trên tàu điện mất rồi.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vて しまいました (Tiếp)</h2>
                <div class="grammar-example">
                    <p><strong>Cách dùng 2 (Hoàn thành):</strong> Diễn tả việc làm xong toàn bộ một việc gì đó (nhấn mạnh sự hoàn tất).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>漢字の宿題はもうやってしまいました。</p>
                    <span class="trans">Bài tập chữ Hán thì tôi đã làm XONG HẾT rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この本は全部読んでしまいました。</p>
                    <span class="trans">Cuốn sách này tôi đã đọc xong toàn bộ rồi.</span>
                </div>
            </section>""",
            
            """<section>
                <h2>🗣 Hội thoại ứng dụng (Kaiwa)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：どうしたんですか。</p>
                    <span class="trans">A: Có chuyện gì thế?</span>
                    <br>
                    <p class="dialogue-p2">B：昨日買ったばかりのスマホを落としてしまったんです。</p>
                    <span class="trans">B: Tôi lỡ làm rơi mất cái điện thoại vừa mua hôm qua.</span>
                    <br>
                    <p class="dialogue-p1">A：えっ、それは大変ですね。交番へ行きましたか。</p>
                    <span class="trans">A: Ế, vậy gay to nhỉ. Cậu đã đến đồn cảnh sát chưa?</span>
                </div>
            </section>""",

            """<section>
                <h2>📝 Bài tập Trắc nghiệm (Quiz)</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Dịch câu sau sang tiếng Nhật:</p>
                    <p>Tôi lỡ uống hết rượu của bố mất rồi.</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        父のお酒を飲んでしまいました。
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn câu ĐÚNG:</p>
                    <p>A. レポートは明日までに書いてしまいます。</p>
                    <p>B. レポートは明日までに書いてしまいました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A</strong>.<br>
                        (Việc sẽ hoàn thành trong tương lai dùng Vてしまいます).
                    </div>
                </div>
            </section>"""
        ],
        "furigana": {
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "開け": "<ruby>開<rt>あ</rt></ruby>け",
            "開け": "<ruby>開<rt>あ</rt></ruby>け",
            "風": "<ruby>風<rt>かぜ</rt></ruby>",
            "開いて": "<ruby>開<rt>あ</rt></ruby>いて",
            "開きます": "<ruby>開<rt>あ</rt></ruby>きます",
            "壊れて": "<ruby>壊<rt>こわ</rt></ruby>れて",
            "割れて": "<ruby>割<rt>わ</rt></ruby>れて",
            "電気": "<ruby>電気<rt>でんき</rt></ruby>",
            "消えて": "<ruby>消<rt>き</rt></ruby>えて",
            "本当": "<ruby>本当<rt>ほんとう</rt></ruby>",
            "閉まって": "<ruby>閉<rt>し</rt></ruby>まって",
            "残念": "<ruby>残念<rt>ざんねん</rt></ruby>",
            "行きましょう": "<ruby>行<rt>い</rt></ruby>きましょう",
            "落として": "<ruby>落<rt>お</rt></ruby>して",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "傘": "<ruby>傘<rt>かさ</rt></ruby>",
            "忘れて": "<ruby>忘<rt>わす</rt></ruby>れて",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "全部": "<ruby>全部<rt>ぜんぶ</rt></ruby>",
            "読んで": "<ruby>読<rt>よ</rt></ruby>んで",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "大変": "<ruby>大変<rt>たいへん</rt></ruby>",
            "交番": "<ruby>交番<rt>こうばん</rt></ruby>",
            "行きました": "<ruby>行<rt>い</rt></ruby>きました",
            "父": "<ruby>父<rt>ちち</rt></ruby>",
            "酒": "<ruby>酒<rt>さけ</rt></ruby>",
            "飲んで": "<ruby>飲<rt>の</rt></ruby>んで",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて"
        },
        "vocab": {
            "開きます": "Mở (tự động)",
            "閉まります": "Đóng (tự động)",
            "消えます": "Tắt (tự động)",
            "壊れます": "Hỏng",
            "割れます": "Vỡ",
            "落とします": "Làm rơi",
            "交番": "Đồn cảnh sát",
            "傘": "Cái ô"
        }
    },
    
    "bai30": {
        "title": "Bài 30 (Chi tiết)",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 30</h1>
                <h3>Minna No Nihongo II - Vて あります & Vて おきます</h3>
                <p>💡 Phiên bản nâng cấp - Tương tác siêu cấp!</p>
            </section>""",
            
            """<section>
                <h2>1. Vて あります (Trạng thái có mục đích)</h2>
                <div class="box-highlight">
                    N が Tha động từ + て あります
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả trạng thái của sự vật là KẾT QUẢ của một hành động CÓ CHỦ ĐÍCH do ai đó đã làm.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>机の上に本が置いてあります。</p>
                    <span class="trans">Trên bàn CÓ ĐẶT (sẵn) quyển sách.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>壁にカレンダーが掛けてあります。</p>
                    <span class="trans">Trên tường CÓ TREO (sẵn) tờ lịch.</span>
                </div>
            </section>""",

            """<section>
                <h2>Phân biệt: Vています vs Vてあります</h2>
                <div class="grammar-example fragment">
                    <p><strong>Vています (Tự động từ):</strong> Chỉ nói về trạng thái khách quan trước mắt.</p>
                    <p>窓が開いています。 (Cửa sổ đang mở - Không rõ ai mở, chỉ thấy nó đang mở).</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Vてあります (Tha động từ):</strong> Có yếu tố con người tác động vào.</p>
                    <p>窓が開けてあります。 (Cửa sổ được mở sẵn - Do ai đó cố tình mở để cho mát mẻ, thoáng khí).</p>
                </div>
            </section>""",
            
            """<section>
                <h2>🗣 Hội thoại ứng dụng (Kaiwa)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：パーティーの準備はもう終わりましたか。</p>
                    <span class="trans">A: Chuẩn bị tiệc xong chưa?</span>
                    <br>
                    <p class="dialogue-p2">B：はい、飲み物はもう冷蔵庫に入れてあります。</p>
                    <span class="trans">B: Vâng, đồ uống tôi đã (cho người) cất sẵn vào tủ lạnh rồi.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。グラスも並べてありますね。</p>
                    <span class="trans">A: Ra vậy. Cốc cũng được xếp sẵn rồi nhỉ.</span>
                </div>
            </section>""",

            """<section>
                <h2>📝 Bài tập Trắc nghiệm (Quiz)</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Chọn đáp án ĐÚNG điền vào chỗ trống:</p>
                    <p>壁に絵が _________________。</p>
                    <p>A. 掛かっています</p>
                    <p>B. 掛けてあります</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        <strong>Cả 2 đều đúng!</strong><br>
                        A: Bức tranh đang treo (Khách quan).<br>
                        B: Bức tranh được treo sẵn (Có ai đó cố tình treo để trang trí).
                    </div>
                </div>
            </section>""",

            """<section>
                <h2>2. Vて おきます (Chuẩn bị trước)</h2>
                <div class="box-highlight">
                    Vて おきます
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 1:</strong> Chuẩn bị sẵn sàng trước một việc gì đó.</p>
                    <p>旅行の前に、切符を買っておきます。</p>
                    <span class="trans">Trước khi đi du lịch, tôi sẽ mua sẵn vé.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 2:</strong> Xử lý công việc sau khi hoàn thành.</p>
                    <p>ハサミを使ったら、元の所に戻しておいてください。</p>
                    <span class="trans">Sau khi dùng kéo xong, hãy để lại chỗ cũ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng 3:</strong> Giữ nguyên trạng thái (Cứ để đó).</p>
                    <p>窓を開けておいてください。</p>
                    <span class="trans">Hãy cứ để cửa sổ mở sẵn như thế.</span>
                </div>
            </section>""",

            """<section>
                <h2>📝 Bài tập Trắc nghiệm (Quiz)</h2>
                <div class="quiz-box">
                    <p class="quiz-q">Dịch câu sau sang tiếng Nhật:</p>
                    <p>Ngày mai tôi có bài kiểm tra nên tối nay tôi sẽ học bài sẵn.</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        明日はテストがありますから、今晩勉強しておきます。
                    </div>
                </div>
            </section>"""
        ],
        "furigana": {
            "机": "<ruby>机<rt>つくえ</rt></ruby>",
            "上": "<ruby>上<rt>うえ</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "置いて": "<ruby>置<rt>お</rt></ruby>いて",
            "壁": "<ruby>壁<rt>かべ</rt></ruby>",
            "掛けて": "<ruby>掛<rt>か</rt></ruby>けて",
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "開いて": "<ruby>開<rt>あ</rt></ruby>いて",
            "開けて": "<ruby>開<rt>あ</rt></ruby>けて",
            "準備": "<ruby>準備<rt>じゅんび</rt></ruby>",
            "終わりました": "<ruby>終<rt>お</rt></ruby>わりました",
            "飲み物": "<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>",
            "冷蔵庫": "<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>",
            "入れて": "<ruby>入<rt>い</rt></ruby>れて",
            "並べて": "<ruby>並<rt>なら</rt></ruby>べて",
            "絵": "<ruby>絵<rt>え</rt></ruby>",
            "掛かって": "<ruby>掛<rt>か</rt></ruby>かって",
            "旅行": "<ruby>旅行<rt>りょこう</rt></ruby>",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "切符": "<ruby>切符<rt>きっぷ</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "使ったら": "<ruby>使<rt>つか</rt></ruby>ったら",
            "元": "<ruby>元<rt>もと</rt></ruby>",
            "所": "<ruby>所<rt>ところ</rt></ruby>",
            "戻して": "<ruby>戻<rt>もど</rt></ruby>して",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "今晩": "<ruby>今晩<rt>こんばん</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>"
        },
        "vocab": {
            "置きます": "Đặt, để",
            "掛けます": "Treo",
            "冷蔵庫": "Tủ lạnh",
            "並べます": "Xếp hàng, bày biện",
            "戻します": "Để lại (chỗ cũ)",
            "切符": "Vé",
            "準備": "Chuẩn bị"
        }
    },
    
    "bai31": {
        "title": "Bài 31 (Chi tiết)",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 31</h1>
                <h3>Minna No Nihongo II - Thể Ý Định (Vよう) & つもりです</h3>
                <p>💡 Phiên bản nâng cấp - Tương tác siêu cấp!</p>
            </section>""",
            
            """<section>
                <h2>1. Thể Ý Định (意向形 - Ikoukei)</h2>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 1 (Cột I → Cột O + う):</strong></p>
                    <p>行きます → 行こう</p>
                    <p>飲みます → 飲もう</p>
                    <p>買います → 買おう</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + よう):</strong></p>
                    <p>食べます → 食べよう</p>
                    <p>見ます → 見よう</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <p>します → しよう</p>
                    <p>来ます → 来よう（こよう）</p>
                </div>
            </section>""",

            """<section>
                <h2>2. Ứng dụng Thể Ý Định</h2>
                <div class="box-highlight">
                    Vよう (Rủ rê trong văn nói thân mật)
                </div>
                <div class="grammar-example fragment">
                    <p>Cách nói thân mật của "~ましょう".</p>
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
                <h2>🗣 Hội thoại ứng dụng (Kaiwa)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：今週末、海へ行かない？</p>
                    <span class="trans">A: Cuối tuần này đi biển không?</span>
                    <br>
                    <p class="dialogue-p2">B：いいね。行こう！</p>
                    <span class="trans">B: Tuyệt đấy. Đi thôi!</span>
                    <br>
                    <p class="dialogue-p1">A：じゃ、弁当を作って行こうね。</p>
                    <span class="trans">A: Vậy làm bento rồi đi nhé.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vよう と思っています (Dự định)</h2>
                <div class="box-highlight">
                    Vよう と思っています。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Tôi dự định... (Dự định này đã được nhen nhóm từ trước và hiện tại vẫn đang nghĩ về nó).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>将来、自分の会社を作ろうと思っています。</p>
                    <span class="trans">Tương lai, tôi dự định lập công ty riêng.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>週末はデパートへ行こうと思っています。</p>
                    <span class="trans">Cuối tuần tôi định đi bách hóa.</span>
                </div>
            </section>""",

            """<section>
                <h2>4. つもりです (Dự định chắc chắn)</h2>
                <div class="box-highlight">
                    Vる つもりです。<br>
                    Vない つもりです。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Dự định chắc chắn, quyết tâm cao hơn "Vよう と思っています".</p>
                </div>
                <div class="grammar-example fragment">
                    <p>来年、結婚するつもりです。</p>
                    <span class="trans">Tôi dự định sẽ kết hôn vào năm sau.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>タバコを吸わないつもりです。</p>
                    <span class="trans">Tôi định sẽ không hút thuốc.</span>
                </div>
            </section>""",

            """<section>
                <h2>📝 Bài tập Trắc nghiệm (Quiz)</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Chọn phương án chia đúng Thể ý định:</p>
                    <p>頑張ります ➔ _________________。</p>
                    <p>A. 頑張ろう</p>
                    <p>B. 頑張よう</p>
                    <p>C. 頑張ろ</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A</strong> (頑張ろう). Vì đây là động từ nhóm 1 (Cột I đổi sang Cột O + う).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch câu sau:</p>
                    <p>Kỳ nghỉ hè năm nay, tôi định sẽ không đi đâu cả.</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        今年の夏休みはどこも行かないつもりです。
                    </div>
                </div>
            </section>"""
        ],
        "furigana": {
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "行こう": "<ruby>行<rt>い</rt></ruby>こう",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "飲もう": "<ruby>飲<rt>の</rt></ruby>もう",
            "買います": "<ruby>買<rt>か</rt></ruby>います",
            "買おう": "<ruby>買<rt>か</rt></ruby>おう",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "食べよう": "<ruby>食<rt>た</rt></ruby>べよう",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見よう": "<ruby>見<rt>み</rt></ruby>よう",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "来よう": "<ruby>来<rt>こ</rt></ruby>よう",
            "疲れた": "<ruby>疲<rt>つか</rt></ruby>れた",
            "休もう": "<ruby>休<rt>やす</rt></ruby>もう",
            "一緒に": "<ruby>一緒<rt>いっしょ</rt></ruby>に",
            "今週末": "<ruby>今週末<rt>こんしゅうまつ</rt></ruby>",
            "海": "<ruby>海<rt>うみ</rt></ruby>",
            "行かない": "<ruby>行<rt>い</rt></ruby>かない",
            "弁当": "<ruby>弁当<rt>べんとう</rt></ruby>",
            "作って": "<ruby>作<rt>つく</rt></ruby>って",
            "思っています": "<ruby>思<rt>おも</rt></ruby>っています",
            "将来": "<ruby>将来<rt>しょうらい</rt></ruby>",
            "自分": "<ruby>自分<rt>じぶん</rt></ruby>",
            "会社": "<ruby>会社<rt>かいしゃ</rt></ruby>",
            "週末": "<ruby>週末<rt>しゅうまつ</rt></ruby>",
            "来年": "<ruby>来年<rt>らいねん</rt></ruby>",
            "結婚する": "<ruby>結婚<rt>けっこん</rt></ruby>する",
            "吸わない": "<ruby>吸<rt>す</rt></ruby>わない",
            "頑張ります": "<ruby>頑張<rt>がんば</rt></ruby>ります",
            "頑張ろう": "<ruby>頑張<rt>がんば</rt></ruby>ろう",
            "今年": "<ruby>今年<rt>ことし</rt></ruby>",
            "夏休み": "<ruby>夏休み<rt>なつやすみ</rt></ruby>"
        },
        "vocab": {
            "疲れます": "Mệt mỏi",
            "将来": "Tương lai",
            "自分": "Tự bản thân",
            "結婚します": "Kết hôn",
            "吸います": "Hút",
            "頑張ります": "Cố gắng"
        }
    }
}

for lesson_id, data in lessons.items():
    folder_path = os.path.join(base_dir, lesson_id)
    os.makedirs(folder_path, exist_ok=True)
    
    html_content = template.format(
        lesson=data["title"],
        slides_content="\n            ".join(data["slides"]),
        furigana_json=json.dumps(data["furigana"], ensure_ascii=False),
        vocab_json=json.dumps(data["vocab"], ensure_ascii=False)
    )
    
    file_path = os.path.join(folder_path, "index.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"Generated {file_path}")

print("Mega Batch 1 (Lessons 29-31) generated successfully!")
