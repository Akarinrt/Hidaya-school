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
    "bai44": {
        "title": "Bài 44",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 44</h1>
                <h3>Minna No Nihongo II - Vすぎます / やすい / にくい</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ すぎます (Quá mức)</h2>
                <div class="box-highlight">
                    V(bỏ ます) + すぎます<br>
                    A(bỏ い) / A(bỏ な) + すぎます
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Biểu thị sự vượt quá giới hạn thông thường, thường mang ý nghĩa TIÊU CỰC, không tốt.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>きのうはお酒を飲みすぎました。</p>
                    <span class="trans">Hôm qua tôi đã uống quá nhiều rượu.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このパソコンは高すぎます。</p>
                    <span class="trans">Cái máy tính này quá đắt.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. ~ やすいです / にくいです</h2>
                <div class="box-highlight">
                    V(bỏ ます) + やすいです (Dễ làm V)<br>
                    V(bỏ ます) + にくいです (Khó làm V)
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Biểu thị một việc gì đó dễ dàng hay khó khăn để thực hiện, hoặc một vật có tính chất dễ/khó bị biến đổi.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>この薬は甘くて、飲みやすいです。</p>
                    <span class="trans">Thuốc này ngọt nên rất dễ uống.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>東京は人が多くて、住みにくいです。</p>
                    <span class="trans">Tokyo đông người nên khó sống.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>白いシャツは汚れやすいです。</p>
                    <span class="trans">Áo sơ mi trắng rất dễ bị bẩn.</span>
                </div>
            </section>""",

            """<section>
                <h2>3. N に します (Quyết định chọn N)</h2>
                <div class="box-highlight">
                    N に します
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Biểu thị sự lựa chọn, quyết định lấy một cái gì đó (thường dùng khi gọi món ăn, mua sắm, chọn ngày giờ).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>コーヒーにします。</p>
                    <span class="trans">Tôi chọn cà phê (Khi gọi món).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>会議は明日にします。</p>
                    <span class="trans">Tôi quyết định chọn cuộc họp vào ngày mai.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "酒": "<ruby>酒<rt>さけ</rt></ruby>",
            "飲みすぎました": "<ruby>飲<rt>の</rt></ruby>みすぎました",
            "高すぎます": "<ruby>高<rt>たか</rt></ruby>すぎます",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "甘くて": "<ruby>甘<rt>あま</rt></ruby>くて",
            "飲みやすいです": "<ruby>飲<rt>の</rt></ruby>みやすいです",
            "東京": "<ruby>東京<rt>とうきょう</rt></ruby>",
            "人": "<ruby>人<rt>ひと</rt></ruby>",
            "多くて": "<ruby>多<rt>おお</rt></ruby>くて",
            "住みにくいです": "<ruby>住<rt>す</rt></ruby>みにくいです",
            "白い": "<ruby>白<rt>しろ</rt></ruby>い",
            "汚れやすいです": "<ruby>汚<rt>よご</rt></ruby>れやすいです",
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "明日": "<ruby>明日<rt>あした</rt></ruby>"
        },
        "vocab": {
            "飲みます": "Uống",
            "高い": "Đắt, cao",
            "住みます": "Sinh sống",
            "汚れます": "Bị bẩn",
            "甘い": "Ngọt"
        }
    },
    
    "bai45": {
        "title": "Bài 45",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 45</h1>
                <h3>Minna No Nihongo II - 場合は / のに</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ 場合は (Trong trường hợp...)</h2>
                <div class="box-highlight">
                    Vる / Vた / Vない 場合は、～<br>
                    Aい / Aな 場合は、～<br>
                    Nの 場合は、～
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Giả định một tình huống khẩn cấp, bất ngờ hoặc có thể xảy ra trong tương lai, và đưa ra cách giải quyết (giống với たら, nhưng trang trọng hơn).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>地震が起きた場合は、エレベーターを使わないでください。</p>
                    <span class="trans">Trong trường hợp xảy ra động đất, xin đừng dùng thang máy.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>パスポートをなくした場合は、どうしたらいいですか。</p>
                    <span class="trans">Trong trường hợp làm mất hộ chiếu thì nên làm thế nào?</span>
                </div>
            </section>""",

            """<section>
                <h2>2. ~ のに (Mặc dù... thế mà...)</h2>
                <div class="box-highlight">
                    Thể thông thường + のに、～<br>
                    <em>* Aな / N + な + のに</em>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Diễn đạt sự ĐỐI LẬP, trái với dự đoán thông thường. Thường chứa đựng sự bất mãn, ngạc nhiên, nuối tiếc của người nói.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日日本語を勉強しているのに、全然上手になりません。</p>
                    <span class="trans">Mặc dù ngày nào cũng học tiếng Nhật, thế mà tôi chả giỏi lên tí nào.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>今日は日曜日なのに、仕事をしなければなりません。</p>
                    <span class="trans">Hôm nay là Chủ nhật thế mà tôi vẫn phải làm việc.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "地震": "<ruby>地震<rt>じしん</rt></ruby>",
            "起きた": "<ruby>起<rt>お</rt></ruby>きた",
            "使わないでください": "<ruby>使<rt>つか</rt></ruby>わないでください",
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "全然": "<ruby>全然<rt>ぜんぜん</rt></ruby>",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "日曜日": "<ruby>日曜日<rt>にちようび</rt></ruby>",
            "仕事": "<ruby>仕事<rt>しごと</rt></ruby>"
        },
        "vocab": {
            "地震": "Động đất",
            "起きます": "Xảy ra, thức dậy",
            "パスポート": "Hộ chiếu",
            "全然": "Hoàn toàn (không)",
            "上手": "Giỏi"
        }
    },
    
    "bai46": {
        "title": "Bài 46",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 46</h1>
                <h3>Minna No Nihongo II - ところです / ばかりです</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ ところです (Thời điểm xảy ra hành động)</h2>
                <div class="box-highlight">
                    Vる ところです。(Chuẩn bị làm, sắp làm)<br>
                    Vて いる ところです。(Đang làm)<br>
                    Vた ところです。(Vừa mới làm xong tức thì)
                </div>
                <div class="grammar-example fragment">
                    <p>会議はもう始まりましたか。<br>いいえ、今から始まるところです。</p>
                    <span class="trans">Cuộc họp đã bắt đầu chưa? / Chưa, bây giờ SẮP/CHUẨN BỊ bắt đầu đây.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>故障の原因がわかりましたか。<br>いいえ、今調べているところです。</p>
                    <span class="trans">Đã biết nguyên nhân hỏng chưa? / Chưa, bây giờ ĐANG điều tra.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>バスは出ましたか。<br>はい、たった今出たところです。</p>
                    <span class="trans">Xe buýt đi chưa? / Vâng, VỪA MỚI đi xong.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. Vた ばかりです (Vừa mới...)</h2>
                <div class="box-highlight">
                    Vた ばかりです。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Biểu thị việc gì đó VỪA MỚI xảy ra. So với "Vた ところです" (vừa mới tức thì 1-2 phút), "Vた ばかりです" phụ thuộc vào cảm giác của người nói, có thể là 1 tháng, 1 năm trước vẫn dùng được nếu thấy là "mới".</p>
                </div>
                <div class="grammar-example fragment">
                    <p>先月日本へ来たばかりです。</p>
                    <span class="trans">Tôi vừa mới đến Nhật tháng trước. (Không dùng ところです được)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このビデオカメラは先週買ったばかりなのに、調子がおかしいです。</p>
                    <span class="trans">Cái máy quay này vừa mới mua tuần trước thế mà tình trạng đã có vấn đề rồi.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "始まりました": "<ruby>始<rt>はじ</rt></ruby>まりました",
            "今": "<ruby>今<rt>いま</rt></ruby>",
            "始まる": "<ruby>始<rt>はじ</rt></ruby>まる",
            "故障": "<ruby>故障<rt>こしょう</rt></ruby>",
            "原因": "<ruby>原因<rt>げんいん</rt></ruby>",
            "調べている": "<ruby>調<rt>しら</rt></ruby>べている",
            "出ました": "<ruby>出<rt>で</rt></ruby>ました",
            "出た": "<ruby>出<rt>で</rt></ruby>た",
            "先月": "<ruby>先月<rt>せんげつ</rt></ruby>",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "来た": "<ruby>来<rt>き</rt></ruby>た",
            "先週": "<ruby>先週<rt>せんしゅう</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "調子": "<ruby>調子<rt>ちょうし</rt></ruby>"
        },
        "vocab": {
            "会議": "Cuộc họp",
            "始まります": "Bắt đầu",
            "故障": "Sự hỏng hóc",
            "原因": "Nguyên nhân",
            "調べます": "Điều tra",
            "先月": "Tháng trước",
            "先週": "Tuần trước",
            "調子": "Tình trạng"
        }
    },
    
    "bai47": {
        "title": "Bài 47",
        "slides": [
            """<section class="title-slide">
                <h1>Ngữ Pháp Bài 47</h1>
                <h3>Minna No Nihongo II - そうです (Nghe nói) & ようです (Có vẻ)</h3>
            </section>""",
            
            """<section>
                <h2>1. ~ そうです (Nghe nói là...)</h2>
                <div class="box-highlight">
                    Thể thông thường + そうです。
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Truyền đạt lại thông tin nghe được từ nguồn khác (báo chí, người khác kể) mà không thêm ý kiến cá nhân. Thường đi với "～によると" (Theo như...).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>天気予報によると、明日は寒くなるそうです。</p>
                    <span class="trans">Theo dự báo thời tiết, NGHE NÓI ngày mai trời sẽ trở lạnh.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>クララさんは子供の時、フランスに住んでいたそうです。</p>
                    <span class="trans">Nghe nói hồi bé bạn Clara đã từng sống ở Pháp.</span>
                </div>
            </section>""",

            """<section>
                <h2>2. ~ ようです (Hình như / Có vẻ như...)</h2>
                <div class="box-highlight">
                    Thể thông thường + ようです。<br>
                    <em>* Aな / N + の + ようです</em>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Cách dùng:</strong> Phán đoán mang tính chủ quan của người nói thông qua 5 giác quan (nhìn, nghe, ngửi, sờ, nếm) hoặc qua quan sát hoàn cảnh.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>咳も出るし、頭も痛い。どうも風邪を引いたようです。</p>
                    <span class="trans">Vừa bị ho, vừa đau đầu. HÌNH NHƯ tôi bị cảm rồi.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>人が大勢集まっていますね。事故のようです。</p>
                    <span class="trans">Người ta đang tập trung đông quá nhỉ. CÓ VẺ NHƯ là một vụ tai nạn.</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "天気予報": "<ruby>天気予報<rt>てんきよほう</rt></ruby>",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "寒くなる": "<ruby>寒<rt>さむ</rt></ruby>くなる",
            "子供": "<ruby>子供<rt>こども</rt></ruby>",
            "時": "<ruby>時<rt>とき</rt></ruby>",
            "住んでいた": "<ruby>住<rt>す</rt></ruby>んでいた",
            "咳": "<ruby>咳<rt>せき</rt></ruby>",
            "出る": "<ruby>出<rt>で</rt></ruby>る",
            "頭": "<ruby>頭<rt>あたま</rt></ruby>",
            "痛い": "<ruby>痛<rt>いた</rt></ruby>い",
            "風邪": "<ruby>風邪<rt>かぜ</rt></ruby>",
            "引いた": "<ruby>引<rt>ひ</rt></ruby>いた",
            "人": "<ruby>人<rt>ひと</rt></ruby>",
            "大勢": "<ruby>大勢<rt>おおぜい</rt></ruby>",
            "集まって": "<ruby>集<rt>あつ</rt></ruby>まって",
            "事故": "<ruby>事故<rt>じこ</rt></ruby>"
        },
        "vocab": {
            "天気予報": "Dự báo thời tiết",
            "寒くなります": "Trở lạnh",
            "咳": "Ho",
            "風邪を引きます": "Bị cảm",
            "大勢": "Nhiều người",
            "集まります": "Tập trung",
            "事故": "Tai nạn"
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

print("All Batch 5 lessons generated successfully!")
