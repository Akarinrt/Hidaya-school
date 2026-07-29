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
    "bai48": {
        "title": "Bài 48",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 48</h1>
                <h3>Minna No Nihongo II - Thể Sai Khiến (使役形)</h3>
            </section>""",
            
            """<section>
                <h2>1. Cách chia Động từ Thể Sai Khiến</h2>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 1 (Cột I → Cột A + せます):</strong></p>
                    <p>書きます → 書かせます</p>
                    <p>急ぎます → 急がせます</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + させます):</strong></p>
                    <p>食べます → 食べさせます</p>
                    <p>調べます → 調べさせます</p>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <p>します → させます</p>
                    <p>来ます → 来させます（こさせます）</p>
                </div>
            </section>""",

            """<section>
                <h2>2. Câu Sai Khiến (Bắt/Cho phép ai đó làm gì)</h2>
                <div class="box-highlight">
                    Tự động từ: A は B を V(sai khiến)<br>
                    Tha động từ: A は B に N を V(sai khiến)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Tự động từ (Dùng を):</strong></p>
                    <p>部長は私を大阪へ出張させました。</p>
                    <span class="trans">Trưởng phòng đã bắt tôi đi công tác Osaka.</span>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Tha động từ (Dùng に):</strong></p>
                    <p>先生は学生に宿題をさせました。</p>
                    <span class="trans">Thầy giáo đã bắt học sinh làm bài tập.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>母は娘にピアノを習わせます。</p>
                    <span class="trans">Mẹ cho phép/bắt con gái học piano.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Xin phép (Cho tôi làm... có được không?)</h2>
                <div class="box-highlight">
                    V(sai khiến)て いただけませんか。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Xin phép người đối diện cho mình làm việc gì đó một cách lịch sự.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>すみません、明日は休ませていただけませんか。</p>
                    <span class="trans">Xin lỗi, ngày mai cho phép tôi nghỉ được không ạ?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>早く帰らせていただけませんか。</p>
                    <span class="trans">Xin cho phép tôi về sớm có được không?</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "書かせます": "<ruby>書<rt>か</rt></ruby>かせます",
            "急がせます": "<ruby>急<rt>いそ</rt></ruby>がせます",
            "食べさせます": "<ruby>食<rt>た</rt></ruby>べさせます",
            "調べさせます": "<ruby>調<rt>しら</rt></ruby>べさせます",
            "来させます": "<ruby>来<rt>こ</rt></ruby>させます",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "大阪": "<ruby>大阪<rt>おおさか</rt></ruby>",
            "出張": "<ruby>出張<rt>しゅっちょう</rt></ruby>",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "学生": "<ruby>学生<rt>がくせい</rt></ruby>",
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "母": "<ruby>母<rt>はは</rt></ruby>",
            "娘": "<ruby>娘<rt>むすめ</rt></ruby>",
            "習わせます": "<ruby>習<rt>なら</rt></ruby>わせます",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "休ませて": "<ruby>休<rt>やす</rt></ruby>ませて",
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "帰らせて": "<ruby>帰<rt>かえ</rt></ruby>らせて"
        },
        "vocab": {
            "急ぎます": "Vội vàng, gấp",
            "出張します": "Đi công tác",
            "習います": "Học (có người dạy)",
            "休ませます": "Cho phép nghỉ",
            "帰らせます": "Cho phép về"
        }
    },
    
    "bai49": {
        "title": "Bài 49",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 49</h1>
                <h3>Minna No Nihongo II - Tôn Kính Ngữ (尊敬語)</h3>
            </section>""",
            
            """<section>
                <h2>1. Tôn kính ngữ - Động từ đặc biệt</h2>
                <div class="grammar-example fragment">
                    <p>行きます / 来ます / います ➔ いらっしゃいます</p>
                    <p>食べます / 飲みます ➔ 召し上がります</p>
                    <p>言います ➔ おっしゃいます</p>
                    <p>します ➔ なさいます</p>
                    <p>見ます ➔ ご覧になります（ごらんになります）</p>
                    <p>知っています ➔ ご存じです（ごぞんじです）</p>
                    <p>くれます ➔ くださいます</p>
                </div>
            </section>""",

            """<section>
                <h2>2. Tôn kính ngữ (お/ご ～ になります)</h2>
                <div class="box-highlight">
                    お V(bỏ ます) になります<br>
                    ご N(Hán Việt) になります
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Dùng cho những động từ KHÔNG CÓ dạng tôn kính đặc biệt.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>社長はもうお帰りになりました。</p>
                    <span class="trans">Giám đốc đã về rồi ạ. (帰ります → お帰りになります)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>先生はこの本をお読みになりましたか。</p>
                    <span class="trans">Thầy đã đọc cuốn sách này chưa ạ?</span>
                </div>
            </section>""",

            """<section>
                <h2>3. Tôn kính ngữ (Chia giống Thể Bị Động)</h2>
                <div class="box-highlight">
                    V(bị động) れる / られる
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Chia động từ y hệt thể Bị động, nhưng mang ý nghĩa Tôn kính (mức độ kính trọng nhẹ hơn dạng đặc biệt và お/ご).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>部長は明日アメリカへ出張されます。</p>
                    <span class="trans">Ngày mai Trưởng phòng sẽ đi công tác Mỹ. (出張します → 出張されます)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>先生は何時に来られますか。</p>
                    <span class="trans">Thầy giáo mấy giờ sẽ đến ạ?</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "召し上がります": "<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がります",
            "ご覧になります": "ご<ruby>覧<rt>らん</rt></ruby>になります",
            "存じです": "<ruby>存<rt>ぞん</rt></ruby>じです",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "帰りになりました": "<ruby>帰<rt>かえ</rt></ruby>りになりました",
            "先生": "<ruby>先生<rt>せんせい</rt></ruby>",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "読みになりました": "<ruby>読<rt>よ</rt></ruby>みになりました",
            "部長": "<ruby>部長<rt>ぶちょう</rt></ruby>",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "出張されます": "<ruby>出張<rt>しゅっちょう</rt></ruby>されます",
            "何時": "<ruby>何時<rt>なんじ</rt></ruby>",
            "来られますか": "<ruby>来<rt>こ</rt></ruby>られますか"
        },
        "vocab": {
            "いらっしゃいます": "Đi, đến, ở (tôn kính)",
            "召し上がります": "Ăn, uống (tôn kính)",
            "おっしゃいます": "Nói (tôn kính)",
            "なさいます": "Làm (tôn kính)",
            "ご覧になります": "Nhìn, xem (tôn kính)",
            "ご存じです": "Biết (tôn kính)"
        }
    },
    
    "bai50": {
        "title": "Bài 50",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 50</h1>
                <h3>Minna No Nihongo II - Khiêm Nhường Ngữ (謙譲語)</h3>
            </section>""",
            
            """<section>
                <h2>1. Khiêm nhường ngữ - Động từ đặc biệt</h2>
                <div class="grammar-example fragment">
                    <p>行きます / 来ます ➔ 参ります（まいります）</p>
                    <p>います ➔ おります</p>
                    <p>食べます / 飲みます / もらいます ➔ いただきます</p>
                    <p>言います ➔ 申します（もうします）</p>
                    <p>します ➔ いたします</p>
                    <p>見ます ➔ 拝見します（はいけんします）</p>
                    <p>知っています ➔ 存じております（ぞんじております）</p>
                    <p>会います ➔ お目にかかります（おめにかかります）</p>
                </div>
            </section>""",

            """<section>
                <h2>2. Khiêm nhường ngữ (お/ご ～ します)</h2>
                <div class="box-highlight">
                    お V(bỏ ます) します<br>
                    ご N(Hán Việt) します
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Hạ mình xuống khi người thực hiện hành động là BẢN THÂN MÌNH, và hành động đó tác động tới người bề trên.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>重いですね。私がお持ちします。</p>
                    <span class="trans">Nặng quá nhỉ. Để tôi cầm giúp cho ạ. (持ちます → お持ちします)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>明日、社長をご案内します。</p>
                    <span class="trans">Ngày mai, tôi sẽ hướng dẫn cho Giám đốc.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>今日の予定をご説明します。</p>
                    <span class="trans">Tôi xin phép giải thích về lịch trình hôm nay.</span>
                </div>
            </section>""",

            """<section>
                <h2>🎉 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH 🎉</h2>
                <div class="box-highlight" style="text-align: center; border-left: none; border-bottom: 8px solid var(--primary); background: #eef9f2;">
                    <h3 style="color: var(--success); font-weight: bold;">MINNA NO NIHONGO II (BÀI 50)</h3>
                    <p>Bạn đã hoàn thành chặng đường gian nan nhất của N4!</p>
                </div>
                <div class="grammar-example fragment" style="text-align: center;">
                    <p>これから、N3の勉強も頑張ってください！</p>
                    <p>Hãy tiếp tục cố gắng trên con đường chinh phục N3 nhé!</p>
                </div>
            </section>"""
        ],
        "furigana": {
            "参ります": "<ruby>参<rt>まい</rt></ruby>ります",
            "申します": "<ruby>申<rt>もう</rt></ruby>します",
            "拝見します": "<ruby>拝見<rt>はいけん</rt></ruby>します",
            "存じております": "<ruby>存<rt>ぞん</rt></ruby>じております",
            "目に": "<ruby>目<rt>め</rt></ruby>に",
            "重い": "<ruby>重<rt>おも</rt></ruby>い",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "持ちします": "<ruby>持<rt>も</rt></ruby>ちします",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "社長": "<ruby>社長<rt>しゃちょう</rt></ruby>",
            "案内": "<ruby>案内<rt>あんない</rt></ruby>",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "予定": "<ruby>予定<rt>よてい</rt></ruby>",
            "説明": "<ruby>説明<rt>せつめい</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "頑張って": "<ruby>頑張<rt>がんば</rt></ruby>って"
        },
        "vocab": {
            "参ります": "Đi, đến (khiêm nhường)",
            "おります": "Ở (khiêm nhường)",
            "いただきます": "Ăn, uống, nhận (khiêm nhường)",
            "申します": "Nói, tên là (khiêm nhường)",
            "いたします": "Làm (khiêm nhường)",
            "拝見します": "Xem, nhìn (khiêm nhường)",
            "存じております": "Biết (khiêm nhường)",
            "お目にかかります": "Gặp gỡ (khiêm nhường)",
            "案内します": "Hướng dẫn",
            "説明します": "Giải thích"
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

print("All Batch 6 (Final) lessons generated successfully!")
