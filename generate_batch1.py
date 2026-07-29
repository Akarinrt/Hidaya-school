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
        
        .grammar-example p {{ margin: 10px 0; }}
        .grammar-example .trans {{ color: #666; font-size: 0.9em; font-style: italic; display: block; margin-top: 5px; }}
        
        .quiz-box {{
            background: #FAFAFA;
            border: 2px dashed var(--primary);
            padding: 25px;
            border-radius: 12px;
            text-align: left;
        }}
        .quiz-title {{ font-weight: bold; color: var(--primary); margin-bottom: 15px; font-size: 1.2em; }}
        
        .answer-btn {{
            background: var(--primary);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.8em;
            margin-top: 10px;
            transition: 0.2s;
        }}
        .answer-btn:hover {{ background: #3a5bde; }}
        .answer-content {{
            display: none;
            color: var(--success);
            font-weight: bold;
            margin-top: 10px;
            padding: 10px;
            background: #eef9f2;
            border-radius: 8px;
        }}
        
        ruby {{ font-size: 1em; }}
        rt {{ font-size: 0.5em; color: var(--primary); }}
        
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
            transition: 'slide'
        }});

        const furiganaDict = {furigana_json};
        const vocabDict = {vocab_json};

        // Auto apply Furigana
        document.querySelectorAll('p, .trans, .box-highlight, .answer-content, h1, h3').forEach(el => {{
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
                btn.innerText = "Xem đáp án";
            }} else {{
                content.style.display = "block";
                btn.innerText = "Ẩn đáp án";
            }}
        }}

        // Floating Vocab logic
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
        "title": "Bài 29",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 29</h1>
                <h3>Minna No Nihongo II - Tự động từ & Trạng thái</h3>
            </section>""",
            
            """<section>
                <h2>1. Tự động từ & Tha động từ</h2>
                <div class="box-highlight">
                    [Danh từ] が [Tự động từ]
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Khái niệm:</strong> Tự động từ (Jidoushi) diễn tả hành động tự thân nó xảy ra, hoặc một trạng thái tự nhiên, không có sự tác động trực tiếp của ai đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>ドアが開きます。</p>
                    <span class="trans">Cửa mở. (Tự động từ - Không rõ ai mở, chỉ mô tả trạng thái cửa đang mở ra)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私がドアを開けます。</p>
                    <span class="trans">Tôi mở cửa. (Tha động từ - Rõ chủ thể hành động là "Tôi")</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vて います (Trạng thái)</h2>
                <div class="box-highlight">
                    N が V(tự động từ) て います。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả một trạng thái là kết quả của một hành động đã xảy ra và hiện tại vẫn đang lưu giữ kết quả đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>窓が割れています。</p>
                    <span class="trans">Cửa sổ đang bị vỡ. (Ai đó đã làm vỡ hoặc tự vỡ, nhưng giờ trạng thái là "đang vỡ")</span>
                </div>
                <div class="grammar-example fragment">
                    <p>電気がついています。</p>
                    <span class="trans">Điện đang sáng.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このパソコンは壊れています。</p>
                    <span class="trans">Cái máy tính này đang bị hỏng.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vて しまいました / しまいます</h2>
                <div class="box-highlight">
                    Vて しまいました。<br>
                    Vて しまいます。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nghĩa 1:</strong> Đã hoàn thành xong hoàn toàn một việc gì đó (nhấn mạnh sự hoàn tất).</p>
                    <p>漢字の宿題はもうしてしまいました。</p>
                    <span class="trans">Bài tập Kanji thì tôi đã làm xong hết rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nghĩa 2:</strong> Thể hiện sự nuối tiếc, hối hận hoặc một việc lỡ xảy ra ngoài ý muốn.</p>
                    <p>パスポートを落としてしまいました。</p>
                    <span class="trans">Tôi lỡ đánh rơi mất hộ chiếu rồi.</span>
                </div>
            </section>""",

            """<section>
                <h2>4. Luyện tập (Quiz)</h2>
                <div class="quiz-box fragment">
                    <div class="quiz-title">✍️ Điền từ vào chỗ trống:</div>
                    <div class="fragment" style="margin-bottom: 15px;">
                        <p>1. Cửa sổ đang mở. (Tự động từ: 開く - あく)</p>
                        <p>窓が ( _____ ) います。</p>
                        <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                        <div class="answer-content">→ 窓が開いています。 (あいています)</div>
                    </div>
                    <div class="fragment" style="margin-bottom: 15px;">
                        <p>2. Tôi lỡ làm hỏng điện thoại mất rồi. (壊す - こわす)</p>
                        <p>スマホを ( _____ )。</p>
                        <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                        <div class="answer-content">→ スマホを壊してしまいました。</div>
                    </div>
                </div>
            </section>"""
        ],
        "furigana": {
            "開きます": "<ruby>開<rt>あ</rt></ruby>きます",
            "開けます": "<ruby>開<rt>あ</rt></ruby>けます",
            "割れています": "<ruby>割<rt>わ</rt></ruby>れています",
            "電気": "<ruby>電気<rt>でんき</rt></ruby>",
            "壊れています": "<ruby>壊<rt>こわ</rt></ruby>れています",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "落として": "<ruby>落<rt>お</rt></ruby>として",
            "壊して": "<ruby>壊<rt>こわ</rt></ruby>して"
        },
        "vocab": {
            "開きます": "Mở (Tự động từ)",
            "開けます": "Mở (Tha động từ)",
            "割れます": "Vỡ",
            "壊れます": "Hỏng",
            "落とします": "Làm rơi, đánh rơi",
            "窓": "Cửa sổ",
            "電気": "Điện, đèn điện"
        }
    },
    
    "bai30": {
        "title": "Bài 30",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 30</h1>
                <h3>Minna No Nihongo II - Vてあります & Vておきます</h3>
            </section>""",
            
            """<section>
                <h2>1. Vて あります</h2>
                <div class="box-highlight">
                    N が V(tha động từ) て あります。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Khái niệm:</strong> Diễn tả một trạng thái là kết quả của một hành động có chủ ý của ai đó (thường để chuẩn bị cho việc gì).</p>
                    <p><em>*Chú ý: Luôn dùng với Tha động từ.</em></p>
                </div>
                <div class="grammar-example fragment">
                    <p>机の上に本が置いてあります。</p>
                    <span class="trans">Trên bàn có đặt quyển sách. (Ai đó đã cố tình đặt nó ở đó)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>カレンダーに予定が書いてあります。</p>
                    <span class="trans">Trên lịch có ghi sẵn lịch trình.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. So sánh Vて います & Vて あります</h2>
                <div class="grammar-example fragment">
                    <p><strong>Vて います (Tự động từ):</strong> Nhấn mạnh VÀO TRẠNG THÁI HIỆN TẠI, không quan tâm ai làm.</p>
                    <p>窓が閉まっています。</p>
                    <span class="trans">Cửa sổ đang đóng. (Nhìn thấy nó đóng thì nói, có thể gió thổi đóng)</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Vて あります (Tha động từ):</strong> Nhấn mạnh VÀO MỤC ĐÍCH/KẾT QUẢ HÀNH ĐỘNG CÓ CHỦ Ý.</p>
                    <p>窓が閉めてあります。</p>
                    <span class="trans">Cửa sổ (đã được ai đó cố tình) đóng lại. (Ví dụ: để bật điều hòa)</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vて おきます</h2>
                <div class="box-highlight">
                    Vて おきます。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nghĩa 1: Làm trước để chuẩn bị</strong></p>
                    <p>旅行の前に、切符を買っておきます。</p>
                    <span class="trans">Trước khi đi du lịch, tôi sẽ mua vé sẵn.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nghĩa 2: Xử lý tạm thời sau một hành động khác</strong></p>
                    <p>はさみを使ったら、元の所に戻しておいてください。</p>
                    <span class="trans">Dùng kéo xong thì hãy để lại vị trí cũ nhé.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nghĩa 3: Giữ nguyên trạng thái (Cứ để đó)</strong></p>
                    <p>明日会議がありますから、いすはこのままにしておいてください。</p>
                    <span class="trans">Ngày mai có cuộc họp nên ghế cứ để nguyên như vậy đi.</span>
                </div>
            </section>""",
            
            """<section>
                <h2>4. Luyện tập (Quiz)</h2>
                <div class="quiz-box fragment">
                    <div class="quiz-title">✍️ Chọn đúng Vて います hay Vて あります:</div>
                    <div class="fragment" style="margin-bottom: 15px;">
                        <p>1. 壁にカレンダーが ( 掛かっています / 掛けてあります )。</p>
                        <p><em>Gợi ý: Lịch thì phải có ai đó cố tình treo lên.</em></p>
                        <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                        <div class="answer-content">→ 掛けてあります (Vてあります)</div>
                    </div>
                    <div class="fragment" style="margin-bottom: 15px;">
                        <p>2. Khách sắp đến nên tôi đã dọn dẹp phòng sẵn.</p>
                        <p>お客さんが来ますから、部屋を掃除して ( _______ )。</p>
                        <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                        <div class="answer-content">→ おきます (掃除しておきます)</div>
                    </div>
                </div>
            </section>"""
        ],
        "furigana": {
            "机": "<ruby>机<rt>つくえ</rt></ruby>",
            "上": "<ruby>上<rt>うえ</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "置いて": "<ruby>置<rt>お</rt></ruby>いて",
            "予定": "<ruby>予定<rt>よてい</rt></ruby>",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて",
            "閉まって": "<ruby>閉<rt>し</rt></ruby>まって",
            "閉めて": "<ruby>閉<rt>し</rt></ruby>めて",
            "旅行": "<ruby>旅行<rt>りょこう</rt></ruby>",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "切符": "<ruby>切符<rt>きっぷ</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "使ったら": "<ruby>使<rt>つか</rt></ruby>ったら",
            "元": "<ruby>元<rt>もと</rt></ruby>",
            "所": "<ruby>所<rt>ところ</rt></ruby>",
            "戻して": "<ruby>戻<rt>もど</rt></ruby>して",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "壁": "<ruby>壁<rt>かべ</rt></ruby>",
            "掛かって": "<ruby>掛<rt>か</rt></ruby>かって",
            "掛けて": "<ruby>掛<rt>か</rt></ruby>けて",
            "客": "<ruby>客<rt>きゃく</rt></ruby>",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "部屋": "<ruby>部屋<rt>へや</rt></ruby>",
            "掃除": "<ruby>掃除<rt>そうじ</rt></ruby>"
        },
        "vocab": {
            "置きます": "Đặt, để",
            "予定": "Dự định, kế hoạch",
            "閉まります": "Đóng (Tự động từ)",
            "閉めます": "Đóng (Tha động từ)",
            "切符": "Vé",
            "戻します": "Để lại, trả lại",
            "会議": "Cuộc họp",
            "壁": "Bức tường",
            "掃除": "Dọn dẹp"
        }
    },
    
    "bai31": {
        "title": "Bài 31",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 31</h1>
                <h3>Minna No Nihongo II - Thể Ý Định & つもりです</h3>
            </section>""",
            
            """<section>
                <h2>1. Thể Ý định (意向形 - Ikoukei)</h2>
                <div class="grammar-example fragment">
                    <p><strong>Cách chia:</strong></p>
                    <p><strong>Nhóm 1 (Cột I → Cột O + う):</strong> 行きます → 行こう / 飲みます → 飲もう</p>
                    <p><strong>Nhóm 2 (Bỏ ます + よう):</strong> 食べます → 食べよう / 見ます → 見よう</p>
                    <p><strong>Nhóm 3:</strong> します → しよう / 来ます（きます） → 来よう（こよう）</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Ý nghĩa:</strong> Là thể thông thường của ~ましょう (Cùng làm nhé / Để tôi làm cho).</p>
                    <p>ちょっと休もう。</p>
                    <span class="trans">Nghỉ một lát đi. (Nói với bạn bè)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>手伝おうか。</p>
                    <span class="trans">Để tớ giúp một tay nhé?</span>
                </div>
            </section>""",

            """<section>
                <h2>2. V(ý định) と 思っています</h2>
                <div class="box-highlight">
                    V(ý định) と 思っています。<br>
                    (Tôi định...)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả một ý định đã được suy nghĩ từ trước và hiện tại vẫn đang có ý định đó. Dùng được cho cả ngôi thứ 3.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>週末は海へ行こうと思っています。</p>
                    <span class="trans">Cuối tuần tôi định đi biển.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>彼は外国で働こうと思っています。</p>
                    <span class="trans">Anh ấy định làm việc ở nước ngoài.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vる / Vない + つもりです</h2>
                <div class="box-highlight">
                    Vる つもりです。<br>
                    Vない つもりです。<br>
                    (Dự định...)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Thể hiện ý định mạnh mẽ và chắc chắn hơn so với "と 思っています".</p>
                </div>
                <div class="grammar-example fragment">
                    <p>来年結婚するつもりです。</p>
                    <span class="trans">Năm sau tôi dự định kết hôn. (Đã quyết định chắc chắn)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>明日からはたばこを吸わないつもりです。</p>
                    <span class="trans">Từ ngày mai tôi định sẽ không hút thuốc nữa.</span>
                </div>
            </section>""",
            
            """<section>
                <h2>4. N / Vる + 予定です</h2>
                <div class="box-highlight">
                    N の 予定です。<br>
                    Vる 予定です。<br>
                    (Kế hoạch / Lịch trình...)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Lịch trình đã được quyết định chính thức, không phụ thuộc vào ý chí cá nhân.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>出張は１週間ぐらいの予定です。</p>
                    <span class="trans">Chuyến công tác theo kế hoạch là khoảng 1 tuần.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>７月の終わりにドイツへ出張する予定です。</p>
                    <span class="trans">Cuối tháng 7 tôi có lịch đi công tác Đức.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "休もう": "<ruby>休<rt>やす</rt></ruby>もう",
            "手伝おう": "<ruby>手伝<rt>てつだ</rt></ruby>おう",
            "思っています": "<ruby>思<rt>おも</rt></ruby>っています",
            "週末": "<ruby>週末<rt>しゅうまつ</rt></ruby>",
            "海": "<ruby>海<rt>うみ</rt></ruby>",
            "行こう": "<ruby>行<rt>い</rt></ruby>こう",
            "彼": "<ruby>彼<rt>かれ</rt></ruby>",
            "外国": "<ruby>外国<rt>がいこく</rt></ruby>",
            "働こう": "<ruby>働<rt>はたら</rt></ruby>こう",
            "来年": "<ruby>来年<rt>らいねん</rt></ruby>",
            "結婚する": "<ruby>結婚<rt>けっこん</rt></ruby>する",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "吸わない": "<ruby>吸<rt>す</rt></ruby>わない",
            "予定": "<ruby>予定<rt>よてい</rt></ruby>",
            "出張": "<ruby>出張<rt>しゅっちょう</rt></ruby>",
            "週間": "<ruby>週間<rt>しゅうかん</rt></ruby>",
            "終わり": "<ruby>終<rt>お</rt></ruby>わり"
        },
        "vocab": {
            "週末": "Cuối tuần",
            "外国": "Nước ngoài",
            "結婚します": "Kết hôn",
            "吸います": "Hút (thuốc)",
            "出張": "Chuyến công tác"
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

print("All Batch 1 lessons generated successfully!")
