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
    "bai36": {
        "title": "Bài 36",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 36</h1>
                <h3>Minna No Nihongo II - Vようになります / Vるようにしています</h3>
            </section>""",
            
            """<section>
                <h2>1. V1(khả năng) ように、V2(mục đích)</h2>
                <div class="box-highlight">
                    Vる / Vない ように、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> ĐỂ (có thể) làm được V1 thì làm V2.</p>
                    <p><em>*Chú ý: V1 thường là Động từ chỉ Khả năng (Vえる), Tự động từ hoặc Vない.</em></p>
                </div>
                <div class="grammar-example fragment">
                    <p>早く泳げるように、毎日練習しています。</p>
                    <span class="trans">Để có thể bơi nhanh được, ngày nào tôi cũng luyện tập.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>忘れないように、メモします。</p>
                    <span class="trans">Để không bị quên, tôi sẽ ghi chú lại.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vる ように なりました</h2>
                <div class="box-highlight">
                    Vる(khả năng) ようになります
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Sự biến đổi trạng thái từ KHÔNG THỂ thành CÓ THỂ (hoặc thói quen chưa có thành có).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日練習して、泳げるようになりました。</p>
                    <span class="trans">Mỗi ngày tôi đều luyện tập nên đã có thể bơi được rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>日本へ来てから、刺身を食べるようになりました。</p>
                    <span class="trans">Từ sau khi đến Nhật, tôi đã bắt đầu ăn Sashimi. (Trước đây không ăn)</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vる ように しています</h2>
                <div class="box-highlight">
                    Vる / Vない ようにしています。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Cố gắng (duy trì) làm một việc gì đó như một thói quen.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日運動するようにしています。</p>
                    <span class="trans">Tôi đang cố gắng mỗi ngày đều vận động.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>甘い物を食べないようにしています。</p>
                    <span class="trans">Tôi đang cố gắng không ăn đồ ngọt.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "泳げる": "<ruby>泳<rt>およ</rt></ruby>げる",
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "練習": "<ruby>練習<rt>れんしゅう</rt></ruby>",
            "忘れない": "<ruby>忘<rt>わす</rt></ruby>れない",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "来て": "<ruby>来<rt>き</rt></ruby>て",
            "刺身": "<ruby>刺身<rt>さしみ</rt></ruby>",
            "食べる": "<ruby>食<rt>た</rt></ruby>べる",
            "運動する": "<ruby>運動<rt>うんどう</rt></ruby>する",
            "甘い": "<ruby>甘<rt>あま</rt></ruby>い",
            "物": "<ruby>物<rt>もの</rt></ruby>"
        },
        "vocab": {
            "泳ぎます": "Bơi",
            "練習": "Luyện tập",
            "忘れます": "Quên",
            "刺身": "Cá sống, sashimi",
            "甘い": "Ngọt",
            "運動します": "Vận động"
        }
    },
    
    "bai37": {
        "title": "Bài 37",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 37</h1>
                <h3>Minna No Nihongo II - Thể Bị Động (受身形 - Ukemi)</h3>
            </section>""",
            
            """<section>
                <h2>1. Chia Động từ Thể Bị Động</h2>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 1 (Cột I → Cột A + れます):</strong></p>
                    <p>書きます → 書かれます</p>
                    <p>踏みます → 踏まれます</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + られます):</strong></p>
                    <p>褒めます → 褒められます</p>
                    <p>見ます → 見られます</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <p>します → されます</p>
                    <p>来ます → 来られます（こられます）</p>
                </div>
            </section>""",

            """<section>
                <h2>2. Câu Bị Động Trực Tiếp</h2>
                <div class="box-highlight">
                    N1 (Người nhận hành động) は N2 (Người làm) に V(bị động)
                </div>
                <div class="grammar-example fragment">
                    <p>先生は私を褒めました。(Chủ động)</p>
                    <span class="trans">Thầy giáo đã khen tôi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は先生に褒められました。(Bị động)</p>
                    <span class="trans">Tôi được thầy giáo khen.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は母に叱られました。</p>
                    <span class="trans">Tôi bị mẹ mắng.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Câu Bị Động Khó Chịu (Bị thiệt hại)</h2>
                <div class="box-highlight">
                    N1(Chủ thể) は N2(Kẻ gây ra) に N3(Bộ phận/Vật sở hữu) を V(bị động)
                </div>
                <div class="grammar-example fragment">
                    <p>私は電車の中で足を踏まれました。</p>
                    <span class="trans">Tôi bị dẫm vào chân ở trong tàu điện.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は犬に手をかまれました。</p>
                    <span class="trans">Tôi bị chó cắn vào tay.</span>
                </div>
            </section>""",

            """<section>
                <h2>4. Sự vật/Sự việc làm Chủ ngữ</h2>
                <div class="box-highlight">
                    Sự vật/Sự việc が/は V(bị động)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Không quan tâm ai làm, chỉ nói về sự thật khách quan, lịch sử, sản xuất.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>フランスで昔の日本の絵が発見されました。</p>
                    <span class="trans">Bức tranh Nhật Bản cổ đã được phát hiện tại Pháp.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この車は日本で造られました。</p>
                    <span class="trans">Chiếc xe này được sản xuất tại Nhật Bản.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "書かれます": "<ruby>書<rt>か</rt></ruby>かれます",
            "踏みます": "<ruby>踏<rt>ふ</rt></ruby>みます",
            "踏まれます": "<ruby>踏<rt>ふ</rt></ruby>まれます",
            "褒めます": "<ruby>褒<rt>ほ</rt></ruby>めます",
            "見られます": "<ruby>見<rt>み</rt></ruby>られます",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "叱られました": "<ruby>叱<rt>しか</rt></ruby>られました",
            "電車": "<ruby>電車<rt>でんしゃ</rt></ruby>",
            "中": "<ruby>中<rt>なか</rt></ruby>",
            "足": "<ruby>足<rt>あし</rt></ruby>",
            "犬": "<ruby>犬<rt>いぬ</rt></ruby>",
            "手": "<ruby>手<rt>て</rt></ruby>",
            "昔": "<ruby>昔<rt>むかし</rt></ruby>",
            "絵": "<ruby>絵<rt>え</rt></ruby>",
            "発見": "<ruby>発見<rt>はっけん</rt></ruby>",
            "車": "<ruby>車<rt>くるま</rt></ruby>",
            "造られました": "<ruby>造<rt>つく</rt></ruby>られました"
        },
        "vocab": {
            "褒めます": "Khen ngợi",
            "叱ります": "Mắng",
            "踏みます": "Dẫm, đạp",
            "発見します": "Phát hiện",
            "造ります": "Sản xuất, chế tạo"
        }
    },
    
    "bai38": {
        "title": "Bài 38",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 38</h1>
                <h3>Minna No Nihongo II - Danh Từ Hóa với "の"</h3>
            </section>""",
            
            """<section>
                <h2>1. Danh Từ Hóa Động Từ (Vるのは / Vるのが)</h2>
                <div class="box-highlight">
                    Vる の は Adj です。<br>
                    Vる の が Adj です。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Ý nghĩa:</strong> Biến một cụm Động từ thành Danh từ để làm Chủ ngữ trong câu. Dùng "の" thay thế cho "こと".</p>
                </div>
                <div class="grammar-example fragment">
                    <p>音楽を聞くのは楽しいです。</p>
                    <span class="trans">Việc nghe nhạc thì vui.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は絵を描くのが好きです。</p>
                    <span class="trans">Tôi thích việc vẽ tranh.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>星を見るのが好きです。</p>
                    <span class="trans">Tôi thích ngắm sao.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vる のを 忘れました (Quên làm việc gì)</h2>
                <div class="box-highlight">
                    Vる のを 忘れました。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả việc lỡ quên thực hiện một hành động nào đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>薬を飲むのを忘れました。</p>
                    <span class="trans">Tôi đã quên uống thuốc mất rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>窓を閉めるのを忘れました。</p>
                    <span class="trans">Tôi quên đóng cửa sổ rồi.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Thể Thông Thường + のを 知っていますか</h2>
                <div class="box-highlight">
                    Thể thông thường + のを知っていますか。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Hỏi xem đối phương có biết thông tin/sự việc gì đó không.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>鈴木さんが結婚したのを知っていますか。</p>
                    <span class="trans">Bạn có biết chuyện anh Suzuki đã kết hôn không?</span>
                    <p>いいえ、知りませんでした。</p>
                    <span class="trans">Không, tôi không biết.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "音楽": "<ruby>音楽<rt>おんがく</rt></ruby>",
            "聞く": "<ruby>聞<rt>き</rt></ruby>く",
            "楽しい": "<ruby>楽<rt>たの</rt></ruby>しい",
            "絵": "<ruby>絵<rt>え</rt></ruby>",
            "描く": "<ruby>描<rt>か</rt></ruby>く",
            "好き": "<ruby>好<rt>す</rt></ruby>き",
            "星": "<ruby>星<rt>ほし</rt></ruby>",
            "見る": "<ruby>見<rt>み</rt></ruby>る",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "飲む": "<ruby>飲<rt>の</rt></ruby>む",
            "忘れました": "<ruby>忘<rt>わす</rt></ruby>れました",
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "閉める": "<ruby>閉<rt>し</rt></ruby>める",
            "結婚した": "<ruby>結婚<rt>けっこん</rt></ruby>した",
            "知って": "<ruby>知<rt>し</rt></ruby>って"
        },
        "vocab": {
            "音楽": "Âm nhạc",
            "楽しい": "Vui vẻ",
            "描きます": "Vẽ",
            "星": "Ngôi sao",
            "忘れます": "Quên",
            "知っています": "Biết (trạng thái)"
        }
    },
    
    "bai39": {
        "title": "Bài 39",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 39</h1>
                <h3>Minna No Nihongo II - Vて (Nguyên nhân, Lý do)</h3>
            </section>""",
            
            """<section>
                <h2>1. Vて / Vなくて (Vì...)</h2>
                <div class="box-highlight">
                    Vて、～ (Mệnh đề 2)<br>
                    Vなくて、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> "Vて" chỉ nguyên nhân của sự việc phía sau. Mệnh đề 2 thường là các từ chỉ <strong>Cảm xúc, Trạng thái, Khả năng</strong> (không được dùng câu Mệnh lệnh, Ý chí ở mệnh đề 2).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>ニュースを聞いて、びっくりしました。</p>
                    <span class="trans">Nghe tin tức xong, tôi giật mình (Vì nghe tin nên...).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>お金がなくて、パソコンが買えません。</p>
                    <span class="trans">Vì không có tiền nên tôi không thể mua máy tính. (Chỉ khả năng)</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Tính từ / Danh từ chỉ Nguyên nhân</h2>
                <div class="box-highlight">
                    A(い)くて、～<br>
                    A(な)で、～<br>
                    N で、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Tương tự Vて, biểu thị nguyên nhân do Tính từ hoặc Danh từ (Động đất, Tai nạn, Hỏa hoạn...)</p>
                </div>
                <div class="grammar-example fragment">
                    <p>頭が痛くて、勉強できません。</p>
                    <span class="trans">Vì đau đầu nên tôi không thể học được.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>地震でビルが倒れました。</p>
                    <span class="trans">Vì động đất nên tòa nhà bị đổ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>病気で会社を休みました。</p>
                    <span class="trans">Vì bị ốm nên tôi đã nghỉ làm.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "聞いて": "<ruby>聞<rt>き</rt></ruby>いて",
            "金": "<ruby>金<rt>かね</rt></ruby>",
            "買えません": "<ruby>買<rt>か</rt></ruby>えません",
            "頭": "<ruby>頭<rt>あたま</rt></ruby>",
            "痛くて": "<ruby>痛<rt>いた</rt></ruby>くて",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "地震": "<ruby>地震<rt>じしん</rt></ruby>",
            "倒れました": "<ruby>倒<rt>たお</rt></ruby>れました",
            "病気": "<ruby>病気<rt>びょうき</rt></ruby>",
            "会社": "<ruby>会社<rt>かいしゃ</rt></ruby>",
            "休みました": "<ruby>休<rt>やす</rt></ruby>みました"
        },
        "vocab": {
            "びっくりします": "Giật mình, ngạc nhiên",
            "痛い": "Đau",
            "地震": "Động đất",
            "倒れます": "Đổ, ngã",
            "病気": "Ốm, bệnh"
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

print("All Batch 3 lessons generated successfully!")
