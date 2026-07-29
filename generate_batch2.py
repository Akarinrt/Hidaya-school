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
    "bai32": {
        "title": "Bài 32",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 32</h1>
                <h3>Minna No Nihongo II - Đưa ra lời khuyên (ほうがいいです)</h3>
            </section>""",
            
            """<section>
                <h2>1. Lời khuyên (ほうがいいです)</h2>
                <div class="box-highlight">
                    Vた ほうがいいです。<br>
                    Vない ほうがいいです。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Khuyên ai đó "nên" hoặc "không nên" làm gì. Thể hiện sự so sánh giữa hai lựa chọn, làm V sẽ tốt hơn.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日運動したほうがいいです。</p>
                    <span class="trans">Mỗi ngày nên vận động thì tốt hơn.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>熱があるから、お風呂に入らないほうがいいです。</p>
                    <span class="trans">Vì đang bị sốt nên không vào bồn tắm thì tốt hơn.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Phỏng đoán (でしょう / かもしれません)</h2>
                <div class="box-highlight">
                    Thể thông thường + でしょう<br>
                    Thể thông thường + かもしれません
                </div>
                <div class="grammar-example fragment">
                    <p><strong>~でしょう:</strong> Chắc là... (Độ chắc chắn khoảng 70-80%).</p>
                    <p>明日は雨が降るでしょう。</p>
                    <span class="trans">Ngày mai chắc là trời sẽ mưa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>~かもしれません:</strong> Có lẽ là... (Độ chắc chắn thấp, khoảng 50%).</p>
                    <p>約束の時間に間に合わないかもしれません。</p>
                    <span class="trans">Có lẽ tôi sẽ không kịp giờ hẹn mất.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "運動した": "<ruby>運動<rt>うんどう</rt></ruby>した",
            "熱": "<ruby>熱<rt>ねつ</rt></ruby>",
            "風呂": "<ruby>風呂<rt>ふろ</rt></ruby>",
            "入らない": "<ruby>入<rt>はい</rt></ruby>らない",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降る": "<ruby>降<rt>ふ</rt></ruby>る",
            "約束": "<ruby>約束<rt>やくそく</rt></ruby>",
            "時間": "<ruby>時間<rt>じかん</rt></ruby>",
            "間に合わない": "<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>わない"
        },
        "vocab": {
            "毎日": "Mỗi ngày",
            "運動します": "Vận động",
            "熱": "Sốt",
            "お風呂": "Bồn tắm",
            "約束": "Cuộc hẹn, lời hứa",
            "間に合います": "Kịp giờ"
        }
    },
    
    "bai33": {
        "title": "Bài 33",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 33</h1>
                <h3>Minna No Nihongo II - Thể Mệnh Lệnh & Thể Cấm Đoán</h3>
            </section>""",
            
            """<section>
                <h2>1. Thể Mệnh Lệnh (命令形) & Cấm Đoán (禁止形)</h2>
                <div class="grammar-example fragment">
                    <p><strong>Mệnh Lệnh:</strong></p>
                    <p>Nhóm 1 (Cột I → Cột E): 書きます → 書け / 読みます → 読め</p>
                    <p>Nhóm 2 (Bỏ ます + ろ): 見ます → 見ろ / 起きます → 起きろ</p>
                    <p>Nhóm 3: します → しろ / 来ます → 来い（こい）</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cấm Đoán:</strong> Vる + な (Áp dụng mọi nhóm)</p>
                    <p>飲むな (Cấm uống), 食べるな (Cấm ăn), するな (Cấm làm)</p>
                </div>
            </section>""",

            """<section>
                <h2>2. ～と読みます / ～という意味です</h2>
                <div class="box-highlight">
                    ~ と読みます。<br>
                    ~ という意味です。
                </div>
                <div class="grammar-example fragment">
                    <p>あの漢字は何と読みますか。</p>
                    <span class="trans">Chữ Kanji kia đọc là gì thế?</span>
                    <p>「あく」と読みます。</p>
                    <span class="trans">Đọc là "Aku".</span>
                </div>
                <div class="grammar-example fragment">
                    <p>「立入禁止」はどんな意味ですか。</p>
                    <span class="trans">"Tachiiri-kinshi" nghĩa là gì vậy?</span>
                    <p>入るなという意味です。</p>
                    <span class="trans">Nghĩa là cấm vào.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "書きます": "<ruby>書<rt>か</rt></ruby>きます",
            "書け": "<ruby>書<rt>か</rt></ruby>け",
            "読みます": "<ruby>読<rt>よ</rt></ruby>みます",
            "読め": "<ruby>読<rt>よ</rt></ruby>め",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見ろ": "<ruby>見<rt>み</rt></ruby>ろ",
            "起きます": "<ruby>起<rt>お</rt></ruby>きます",
            "起きろ": "<ruby>起<rt>お</rt></ruby>きろ",
            "飲む": "<ruby>飲<rt>の</rt></ruby>む",
            "食べる": "<ruby>食<rt>た</rt></ruby>べる",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "立入禁止": "<ruby>立入禁止<rt>たちいりきんし</rt></ruby>",
            "意味": "<ruby>意味<rt>いみ</rt></ruby>",
            "入る": "<ruby>入<rt>はい</rt></ruby>る"
        },
        "vocab": {
            "読みます": "Đọc",
            "意味": "Ý nghĩa",
            "立入禁止": "Cấm vào",
            "漢字": "Chữ Hán"
        }
    },
    
    "bai34": {
        "title": "Bài 34",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 34</h1>
                <h3>Minna No Nihongo II - Vとおりに / Vたあとで</h3>
            </section>""",
            
            """<section>
                <h2>1. Vる / Vた / Nの + とおりに</h2>
                <div class="box-highlight">
                    Vる / Vた とおりに、～<br>
                    Nの とおりに、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Làm một việc gì đó ĐÚNG THEO như (ai đó đã làm, đã nói, sách hướng dẫn...).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私が言うとおりに、書いてください。</p>
                    <span class="trans">Hãy viết đúng theo như những gì tôi nói.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>線のとおりに、紙を切ってください。</p>
                    <span class="trans">Hãy cắt giấy đúng theo đường kẻ.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vた / Nの + あとで</h2>
                <div class="box-highlight">
                    Vた あとで、～<br>
                    Nの あとで、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> SAU KHI làm V1 thì làm V2.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>仕事のあとで、飲みに行きませんか。</p>
                    <span class="trans">Sau khi xong việc, đi uống chút không?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>新しい時計を買ったあとで、なくした時計が見つかりました。</p>
                    <span class="trans">Sau khi mua đồng hồ mới xong thì lại tìm thấy cái đồng hồ bị mất.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "言う": "<ruby>言<rt>い</rt></ruby>う",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて",
            "線": "<ruby>線<rt>せん</rt></ruby>",
            "紙": "<ruby>紙<rt>かみ</rt></ruby>",
            "切って": "<ruby>切<rt>き</rt></ruby>って",
            "仕事": "<ruby>仕事<rt>しごと</rt></ruby>",
            "飲み": "<ruby>飲<rt>の</rt></ruby>み",
            "行きませんか": "<ruby>行<rt>い</rt></ruby>きませんか",
            "新しい": "<ruby>新<rt>あたら</rt></ruby>しい",
            "時計": "<ruby>時計<rt>とけい</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "見つかりました": "<ruby>見<rt>み</rt></ruby>つかりました"
        },
        "vocab": {
            "線": "Đường thẳng, đường kẻ",
            "紙": "Giấy",
            "切ります": "Cắt",
            "仕事": "Công việc",
            "時計": "Đồng hồ",
            "見つかります": "Được tìm thấy"
        }
    },
    
    "bai35": {
        "title": "Bài 35",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 35</h1>
                <h3>Minna No Nihongo II - Thể Điều kiện (ば)</h3>
            </section>""",
            
            """<section>
                <h2>1. Thể Điều Kiện (条件形)</h2>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 1 (Cột I → Cột E + ば):</strong> 行きます → 行けば / 飲みます → 飲めば</p>
                    <p><strong>Nhóm 2 (Bỏ ます + れば):</strong> 食べます → 食べれば / 見ます → 見れば</p>
                    <p><strong>Nhóm 3:</strong> します → すれば / 来ます → 来れば（くれば）</p>
                    <p><strong>Tính từ / Danh từ:</strong> い → ければ / な・N → なら</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> NẾU... thì... (Chỉ điều kiện tất yếu hoặc lời khuyên).</p>
                    <p>春になれば、桜が咲きます。</p>
                    <span class="trans">Nếu mùa xuân đến, hoa anh đào sẽ nở.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. V(điều kiện) ば いいですか</h2>
                <div class="box-highlight">
                    Từ để hỏi + Vば いいですか。<br>
                    (Tôi nên làm... thì được?)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Dùng để xin lời khuyên hoặc hướng dẫn từ người khác.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>パスポートを落としてしまったんですが、どうすればいいですか。</p>
                    <span class="trans">Tôi lỡ làm rơi hộ chiếu rồi, giờ tôi nên làm thế nào ạ?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>日本語が上手になりたいんですが、どうしたらいいですか。(hoặc どうすればいいですか)</p>
                    <span class="trans">Tôi muốn giỏi tiếng Nhật thì phải làm sao?</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "春": "<ruby>春<rt>はる</rt></ruby>",
            "桜": "<ruby>桜<rt>さくら</rt></ruby>",
            "咲きます": "<ruby>咲<rt>さ</rt></ruby>きます",
            "落として": "<ruby>落<rt>お</rt></ruby>して",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>"
        },
        "vocab": {
            "春": "Mùa xuân",
            "桜": "Hoa anh đào",
            "咲きます": "Nở (hoa)",
            "落とします": "Làm rơi",
            "上手": "Giỏi"
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

print("All Batch 2 lessons generated successfully!")
