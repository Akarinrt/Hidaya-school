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
    "bai40": {
        "title": "Bài 40",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 40</h1>
                <h3>Minna No Nihongo II - Câu nghi vấn lồng ghép & Vてみます</h3>
            </section>""",
            
            """<section>
                <h2>1. Từ để hỏi ~ か、わかりますか</h2>
                <div class="box-highlight">
                    Từ để hỏi (いつ, どこ, 誰...) + Thể thông thường + か、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Lồng ghép một câu nghi vấn CÓ từ để hỏi vào làm một bộ phận của câu lớn.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>会議はいつ終わるか、わかりません。</p>
                    <span class="trans">Tôi không biết cuộc họp khi nào kết thúc.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>箱の中身は何だか、調べてください。</p>
                    <span class="trans">Hãy kiểm tra xem bên trong cái hộp là cái gì.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. ～かどうか、わかりますか</h2>
                <div class="box-highlight">
                    Thể thông thường + かどうか、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Lồng ghép câu nghi vấn KHÔNG CÓ từ để hỏi (Có... hay không) vào câu lớn.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>その話は本当かどうか、わかりません。</p>
                    <span class="trans">Câu chuyện đó có thật hay không thì tôi không biết.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>荷物が着いたかどうか、確かめてください。</p>
                    <span class="trans">Hãy xác nhận xem hành lý đã đến hay chưa.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Vて みます (Thử làm gì đó)</h2>
                <div class="box-highlight">
                    Vて みます
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Thử thực hiện một hành động nào đó xem sao.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>もう一度考えてみます。</p>
                    <span class="trans">Tôi sẽ thử suy nghĩ thêm một lần nữa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このズボンをはいてみてもいいですか。</p>
                    <span class="trans">Tôi mặc thử cái quần này có được không?</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "終わる": "<ruby>終<rt>お</rt></ruby>わる",
            "箱": "<ruby>箱<rt>はこ</rt></ruby>",
            "中身": "<ruby>中身<rt>なかみ</rt></ruby>",
            "何": "<ruby>何<rt>なん</rt></ruby>",
            "調べて": "<ruby>調<rt>しら</rt></ruby>べて",
            "話": "<ruby>話<rt>はなし</rt></ruby>",
            "本当": "<ruby>本当<rt>ほんとう</rt></ruby>",
            "荷物": "<ruby>荷物<rt>にもつ</rt></ruby>",
            "着いた": "<ruby>着<rt>つ</rt></ruby>いた",
            "確かめて": "<ruby>確<rt>たし</rt></ruby>かめて",
            "一度": "<ruby>一度<rt>いちど</rt></ruby>",
            "考えて": "<ruby>考<rt>かんが</rt></ruby>えて"
        },
        "vocab": {
            "終わります": "Kết thúc",
            "中身": "Nội dung, bên trong",
            "調べます": "Kiểm tra, điều tra",
            "本当": "Sự thật",
            "荷物": "Hành lý",
            "確かめます": "Xác nhận",
            "考えます": "Suy nghĩ"
        }
    },
    
    "bai41": {
        "title": "Bài 41",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 41</h1>
                <h3>Minna No Nihongo II - Cho và Nhận (Kính ngữ)</h3>
            </section>""",
            
            """<section>
                <h2>1. Tôn kính ngữ (Nhận từ bề trên)</h2>
                <div class="box-highlight">
                    私 は Người bề trên に N を いただきます。<br>
                    私 は Người bề trên に Vて いただきます。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Thay thế cho もらいます khi nhận cái gì đó/nhận hành động từ người bề trên (Giám đốc, Thầy giáo...).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は社長に時計をいただきました。</p>
                    <span class="trans">Tôi đã nhận được cái đồng hồ từ Giám đốc.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は先生に漢字を教えていただきました。</p>
                    <span class="trans">Tôi đã được thầy giáo dạy Kanji cho.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Tôn kính ngữ (Bề trên cho tôi)</h2>
                <div class="box-highlight">
                    Người bề trên は 私 に N を くださいます。<br>
                    Người bề trên は 私 に Vて くださいます。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Thay thế cho くれます. (Ai đó bề trên cho tôi / làm gì cho tôi).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>部長が私にお土産をくださいました。</p>
                    <span class="trans">Trưởng phòng đã cho tôi quà lưu niệm.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>先生が手紙を直してくださいました。</p>
                    <span class="trans">Thầy giáo đã sửa bức thư cho tôi.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Khiêm nhường (Cho người bề dưới / Động vật)</h2>
                <div class="box-highlight">
                    私 は Người bề dưới (hoặc Động vật/Cây) に N を やります。<br>
                    私 は Người bề dưới (hoặc Động vật/Cây) に Vて やります。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Thay cho あげます khi đối tượng là em trai/gái, thú cưng hoặc cây cối.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は犬にえさをやります。</p>
                    <span class="trans">Tôi cho chó ăn (cho đồ ăn).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>私は妹に宿題を手伝ってやりました。</p>
                    <span class="trans">Tôi đã giúp em gái làm bài tập.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "時計": "<ruby>時計<rt>とけい</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "教えて": "<ruby>教<rt>おし</rt></ruby>えて",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "土産": "<ruby>土産<rt>みやげ</rt></ruby>",
            "手紙": "<ruby>手紙<rt>てがみ</rt></ruby>",
            "直して": "<ruby>直<rt>なお</rt></ruby>して",
            "犬": "<ruby>犬<rt>いぬ</rt></ruby>",
            "妹": "<ruby>妹<rt>いもうと</rt></ruby>",
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "手伝って": "<ruby>手伝<rt>てつだ</rt></ruby>って"
        },
        "vocab": {
            "いただきます": "Nhận (khiêm nhường của もらいます)",
            "くださいます": "Cho tôi (tôn kính của くれます)",
            "やります": "Cho (bề dưới, động vật)",
            "社長": "Giám đốc",
            "部長": "Trưởng phòng",
            "直します": "Sửa chữa",
            "手伝います": "Giúp đỡ",
            "えさ": "Thức ăn cho động vật"
        }
    },
    
    "bai42": {
        "title": "Bài 42",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 42</h1>
                <h3>Minna No Nihongo II - Vるために / のに</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ ために (Để, vì lợi ích của...)</h2>
                <div class="box-highlight">
                    Vる ために、～<br>
                    N の ために、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn tả MỤC ĐÍCH hoặc LỢI ÍCH. Khác với ように ở chỗ ために đòi hỏi động từ phải có ý chí (chủ động làm được).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>家を買うために、貯金しています。</p>
                    <span class="trans">Tôi đang tiết kiệm tiền ĐỂ mua nhà.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>健康のために、毎朝走っています。</p>
                    <span class="trans">Vì sức khỏe, mỗi sáng tôi đều chạy bộ.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. ~ のに (Để dùng cho việc gì / Tốn bao nhiêu cho việc gì)</h2>
                <div class="box-highlight">
                    Vる のに ～ (使います/かかります/役に立ちます)<br>
                    N に ～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Dùng để diễn đạt MỤC ĐÍCH SỬ DỤNG, đánh giá (tốt/xấu cho việc gì) hoặc tốn thời gian/tiền bạc cho việc gì.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>このはさみは花を切るのに使います。</p>
                    <span class="trans">Cái kéo này dùng để cắt hoa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このかばんは大きくて、旅行に便利です。</p>
                    <span class="trans">Cái túi này to, rất tiện lợi cho việc đi du lịch.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>家を建てるのに、３千万円かかりました。</p>
                    <span class="trans">Để xây nhà, tôi đã tốn mất 3000 vạn Yên.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "家": "<ruby>家<rt>いえ</rt></ruby>",
            "買う": "<ruby>買<rt>か</rt></ruby>う",
            "貯金": "<ruby>貯金<rt>ちょきん</rt></ruby>",
            "健康": "<ruby>健康<rt>けんこう</rt></ruby>",
            "毎朝": "<ruby>毎朝<rt>まいあさ</rt></ruby>",
            "走って": "<ruby>走<rt>はし</rt></ruby>って",
            "花": "<ruby>花<rt>はな</rt></ruby>",
            "切る": "<ruby>切<rt>き</rt></ruby>る",
            "使います": "<ruby>使<rt>つか</rt></ruby>います",
            "旅行": "<ruby>旅行<rt>りょこう</rt></ruby>",
            "便利": "<ruby>便利<rt>べんり</rt></ruby>",
            "建てる": "<ruby>建<rt>た</rt></ruby>てる",
            "千万円": "<ruby>千万円<rt>せんまんえん</rt></ruby>"
        },
        "vocab": {
            "貯金します": "Tiết kiệm tiền",
            "健康": "Sức khỏe",
            "毎朝": "Mỗi sáng",
            "走ります": "Chạy",
            "使います": "Sử dụng",
            "便利": "Tiện lợi",
            "建てます": "Xây dựng"
        }
    },
    
    "bai43": {
        "title": "Bài 43",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 43</h1>
                <h3>Minna No Nihongo II - Trông có vẻ (そうです) / Vて来ます</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ そうです (Trông có vẻ...)</h2>
                <div class="box-highlight">
                    V(bỏ ます) + そうです<br>
                    A(bỏ い) / A(bỏ な) + そうです<br>
                    <em>*Ngoại lệ: いい → よさそうです</em>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Phán đoán sự việc thông qua thị giác (nhìn thấy thế nào thì đoán thế ấy).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>雨が降りそうです。</p>
                    <span class="trans">Trời trông có vẻ sắp mưa.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この料理は辛そうですね。</p>
                    <span class="trans">Món ăn này trông có vẻ cay nhỉ.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>彼女は頭がよさそうです。</p>
                    <span class="trans">Cô ấy trông có vẻ thông minh.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vて 来ます (Đi làm gì đó rồi quay lại)</h2>
                <div class="box-highlight">
                    Vて 来ます。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Đi đến một nơi nào đó, thực hiện hành động V, rồi quay trở lại vị trí ban đầu.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>ちょっとたばこを買って来ます。</p>
                    <span class="trans">Tôi đi mua thuốc lá một chút rồi về.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>郵便局へ行って来ます。</p>
                    <span class="trans">Tôi đi bưu điện một lát (rồi quay lại).</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降り": "<ruby>降<rt>ふ</rt></ruby>り",
            "料理": "<ruby>料理<rt>りょうり</rt></ruby>",
            "辛": "<ruby>辛<rt>から</rt></ruby>",
            "彼女": "<ruby>彼女<rt>かのじょ</rt></ruby>",
            "頭": "<ruby>頭<rt>あたま</rt></ruby>",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "郵便局": "<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>",
            "行って": "<ruby>行<rt>い</rt></ruby>って"
        },
        "vocab": {
            "降ります": "Rơi (mưa, tuyết)",
            "料理": "Món ăn",
            "辛い": "Cay",
            "頭がいい": "Thông minh",
            "郵便局": "Bưu điện"
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

print("All Batch 4 lessons generated successfully!")
