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
    "bai32": {
        "title": "Bài 32",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 32 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Lời khuyên & Phỏng đoán</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 31)</p>
                    <p class="quiz-q">1. Chuyển sang thể Ý định: 今週末、デパートへ ( 行く ) _________________と思っています。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        <strong>行こう</strong>と思っています。<br>
                        (Dự định làm gì: Thể ý định + と思っています).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    来年、日本へ ( A. 留学しよう / B. 留学する ) つもりです。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 留学する</strong><br>
                        (Cấu trúc Vる つもりです).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 32)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>運動します</strong> (うんどうします) : Vận động</div>
                    <div class="vocab-item"><strong>成功します</strong> (せいこうします) : Thành công</div>
                    <div class="vocab-item"><strong>失敗します</strong> (しっぱいします) : Thất bại</div>
                    <div class="vocab-item"><strong>合格します</strong> (ごうかくします) : Thi đỗ</div>
                    <div class="vocab-item"><strong>晴れます</strong> (はれます) : Nắng, quang đãng</div>
                    <div class="vocab-item"><strong>曇ります</strong> (くもります) : Có mây</div>
                    <div class="vocab-item"><strong>無理な</strong> (むりな) : Quá sức, vô lý</div>
                    <div class="vocab-item"><strong>エンジン</strong> : Động cơ</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Vた / Vない + ほうがいいです</h2>
                <div class="box-highlight">
                    Vた ほうがいいです (Nên làm V)<br>
                    Vない ほうがいいです (Không nên làm V)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Đưa ra lời khuyên một cách cụ thể, mang tính cảnh báo nếu không làm thì sẽ có hậu quả.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>毎日運動したほうがいいです。</p>
                    <span class="trans">Nên vận động mỗi ngày. (Khuyên nhủ vì sức khỏe).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>熱がありますから、お風呂に入らないほうがいいです。</p>
                    <span class="trans">Vì bị sốt nên KHÔNG NÊN đi tắm.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Lời khuyên</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：最近、少し太りました。</p>
                    <span class="trans">A: Dạo này, tôi béo lên một chút.</span>
                    <br>
                    <p class="dialogue-p2">B：そうですか。じゃ、毎日運動したほうがいいですよ。</p>
                    <span class="trans">B: Vậy à. Thế thì mỗi ngày cậu nên vận động đi.</span>
                    <br>
                    <p class="dialogue-p1">A：ええ。それから、甘い物をたくさん食べないほうがいいですね。</p>
                    <span class="trans">A: Vâng. Hơn nữa, cũng không nên ăn nhiều đồ ngọt nhỉ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Luyện tập: ほうがいいです</h2>
                <div class="quiz-box">
                    <p class="quiz-q">Chia động từ trong ngoặc để đưa ra lời khuyên:</p>
                    <p>1. 明日テストですから、早く (寝る) __________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        早く <strong>寝たほうがいいです</strong>。
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. 咳が出ますから、タバコを (吸う) __________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        タバコを <strong>吸わないほうがいいです</strong>。<br>
                        (Đang bị ho nên khuyên "không nên").
                    </div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. ～でしょう (Phỏng đoán % cao)</h2>
                <div class="box-highlight">
                    Thể thông thường + でしょう<br>
                    (Tính từ な / Danh từ: Bỏ だ)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> "Chắc là...", "Có lẽ là...". Người nói phỏng đoán một việc gì đó với mức độ chắc chắn khoảng 70-80% (thường dựa trên thông tin có căn cứ).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>明日は雨が降るでしょう。</p>
                    <span class="trans">Ngày mai chắc là trời sẽ mưa. (Dựa vào bản tin thời tiết).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>タワポンさんは合格するでしょう。</p>
                    <span class="trans">Anh Thawaphon chắc là sẽ đỗ thôi. (Vì anh ấy học rất giỏi).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">3. ～かもしれません (Phỏng đoán % thấp)</h2>
                <div class="box-highlight">
                    Thể thông thường + かもしれません<br>
                    (Tính từ な / Danh từ: Bỏ だ)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> "Có thể là...", "Biết đâu là...". Phỏng đoán với mức độ chắc chắn rất thấp (khoảng 30-50%).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>午後は雪が降るかもしれません。</p>
                    <span class="trans">Buổi chiều CÓ THỂ sẽ có tuyết rơi. (Không chắc lắm).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>約束の時間に間に合わないかもしれません。</p>
                    <span class="trans">Tôi CÓ THỂ sẽ không kịp giờ hẹn. (Đường đang tắc).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Phỏng đoán</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：木村さんはパーティーに来ますか。</p>
                    <span class="trans">A: Anh Kimura có đến dự tiệc không?</span>
                    <br>
                    <p class="dialogue-p2">B：うーん、来ないかもしれません。最近、忙しいと言っていましたから。</p>
                    <span class="trans">B: Ưm, CÓ THỂ là không đến đâu. Vì dạo này anh ấy bảo là đang bận.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですか。でも、山田さんは来るでしょう。</p>
                    <span class="trans">A: Vậy à. Nhưng chị Yamada thì CHẮC LÀ sẽ đến thôi.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền でしょう hay かもしれません?<br>
                    山田さんは毎日10時間も勉強していますから、試験に合格する (______________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>でしょう</strong>.<br>
                        (Học 10 tiếng/ngày là căn cứ rất mạnh -> Tỷ lệ đỗ rất cao).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    明日は ( A. 暇な / B. 暇 ) かもしれません。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 暇</strong><br>
                        (Tính từ đuôi な kết hợp với かもしれません / でしょう thì phải BỎ な / だ).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 32</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vた ほうがいいです:</strong> Nên làm (lời khuyên cụ thể).</li>
                        <li style="margin-bottom:15px;"><strong>Vない ほうがいいです:</strong> Không nên làm.</li>
                        <li style="margin-bottom:15px;"><strong>〜でしょう:</strong> Chắc là (Phỏng đoán 70-80%, căn cứ rõ).</li>
                        <li style="margin-bottom:15px;"><strong>〜かもしれません:</strong> Có thể là (Phỏng đoán 30-50%, linh cảm/khả năng thấp).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 32! 🏆
                </div>
            </section>"""
        ],
        "furigana": {
            "今週末": "<ruby>今週末<rt>こんしゅうまつ</rt></ruby>",
            "来年": "<ruby>来年<rt>らいねん</rt></ruby>",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "留学": "<ruby>留学<rt>りゅうがく</rt></ruby>",
            "運動": "<ruby>運動<rt>うんどう</rt></ruby>",
            "成功": "<ruby>成功<rt>せいこう</rt></ruby>",
            "失敗": "<ruby>失敗<rt>しっぱい</rt></ruby>",
            "合格": "<ruby>合格<rt>ごうかく</rt></ruby>",
            "晴れ": "<ruby>晴<rt>は</rt></ruby>れ",
            "曇り": "<ruby>曇<rt>くも</rt></ruby>り",
            "無理": "<ruby>無理<rt>むり</rt></ruby>",
            "毎日": "<ruby>毎日<rt>まいにち</rt></ruby>",
            "熱": "<ruby>熱<rt>ねつ</rt></ruby>",
            "風呂": "<ruby>風呂<rt>ふろ</rt></ruby>",
            "入らない": "<ruby>入<rt>はい</rt></ruby>らない",
            "最近": "<ruby>最近<rt>さいきん</rt></ruby>",
            "太り": "<ruby>太<rt>ふと</rt></ruby>り",
            "甘い": "<ruby>甘<rt>あま</rt></ruby>い",
            "物": "<ruby>物<rt>もの</rt></ruby>",
            "食べない": "<ruby>食<rt>た</rt></ruby>べない",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "寝る": "<ruby>寝<rt>ね</rt></ruby>る",
            "咳": "<ruby>咳<rt>せき</rt></ruby>",
            "出ます": "<ruby>出<rt>で</rt></ruby>ます",
            "吸う": "<ruby>吸<rt>す</rt></ruby>う",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降る": "<ruby>降<rt>ふ</rt></ruby>る",
            "午後": "<ruby>午後<rt>ごご</rt></ruby>",
            "雪": "<ruby>雪<rt>ゆき</rt></ruby>",
            "約束": "<ruby>約束<rt>やくそく</rt></ruby>",
            "時間": "<ruby>時間<rt>じかん</rt></ruby>",
            "間に合わない": "<ruby>間に合<rt>まにあ</rt></ruby>わない",
            "忙しい": "<ruby>忙<rt>いそが</rt></ruby>しい",
            "言って": "<ruby>言<rt>い</rt></ruby>って",
            "来る": "<ruby>来<rt>く</rt></ruby>る",
            "勉強": "<ruby>勉強<rt>べんきょう</rt></ruby>",
            "試験": "<ruby>試験<rt>しけん</rt></ruby>",
            "暇": "<ruby>暇<rt>ひま</rt></ruby>"
        }
    },
    
    "bai33": {
        "title": "Bài 33",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 33 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Thể Mệnh lệnh & Cấm đoán</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 32)</p>
                    <p class="quiz-q">1. Chuyển sang câu khuyên nhủ:<br>
                    「お酒を (飲む) ________________ ほうがいいですよ。」 (Không nên uống rượu đâu)</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        お酒を <strong>飲まない</strong> ほうがいいですよ。<br>
                        (Khuyên không nên làm: Vない ほうがいい).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    あのレストランは ( A. おいしい / B. おいしいだ ) でしょう。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. おいしい</strong><br>
                        (Tính từ đuôi い giữ nguyên + でしょう).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 33)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>逃げます</strong> (にげます) : Chạy trốn</div>
                    <div class="vocab-item"><strong>騒ぎます</strong> (さわぎます) : Làm ồn, làm rùm beng</div>
                    <div class="vocab-item"><strong>あきらめます</strong> : Từ bỏ</div>
                    <div class="vocab-item"><strong>投げます</strong> (なげます) : Ném</div>
                    <div class="vocab-item"><strong>守ります</strong> (まもります) : Tuân thủ, bảo vệ</div>
                    <div class="vocab-item"><strong>注意します</strong> (ちゅういします) : Chú ý</div>
                    <div class="vocab-item"><strong>外します</strong> (はずします) : Rời (chỗ)</div>
                    <div class="vocab-item"><strong>規則</strong> (きそく) : Quy tắc, kỷ luật</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Mệnh lệnh (命令形)</h2>
                <div class="grammar-example">
                    <p><strong>Cách chia: Dùng để ra lệnh gay gắt (nam giới hay dùng hoặc trong khẩn cấp).</strong></p>
                    <ul style="line-height:1.6;">
                        <li><strong>Nhóm 1 (Cột I → Cột E):</strong> 行きます → <span style="color:var(--danger)">行け</span> (Đi mau!) / 飲みます → <span style="color:var(--danger)">飲め</span></li>
                        <li><strong>Nhóm 2 (Bỏ ます + ろ):</strong> 食べます → <span style="color:var(--danger)">食べろ</span> / 見ます → <span style="color:var(--danger)">見ろ</span></li>
                        <li><strong>Nhóm 3:</strong> します → <span style="color:var(--danger)">しろ</span> / 来ます → <span style="color:var(--danger)">来い（こい）</span></li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p>早く寝ろ！</p>
                    <span class="trans">Ngủ mau lên! (Bố ra lệnh cho con)</span>
                </div>
                <div class="grammar-example fragment">
                    <p>逃げろ！</p>
                    <span class="trans">Chạy trốn đi! (Trường hợp khẩn cấp như hỏa hoạn)</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. Thể Cấm đoán (禁止形)</h2>
                <div class="grammar-example">
                    <p><strong>Cách chia: Dùng để cấm tuyệt đối không được làm.</strong></p>
                    <p style="font-size:1.3em; font-weight:bold; color:var(--primary); text-align:center;">Vる + な</p>
                </div>
                <div class="grammar-example fragment">
                    <ul style="line-height:1.6;">
                        <li>行く → <span style="color:var(--danger)">行くな</span> (Cấm đi!)</li>
                        <li>飲む → <span style="color:var(--danger)">飲むな</span> (Cấm uống!)</li>
                        <li>入る → <span style="color:var(--danger)">入るな</span> (Cấm vào!)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p>ここでタバコを吸うな。</p>
                    <span class="trans">Cấm hút thuốc ở đây.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🗣 Hội thoại: Khẩn cấp / Cổ vũ</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：あ、火事だ！</p>
                    <span class="trans">A: Á, hỏa hoạn!</span>
                    <br>
                    <p class="dialogue-p2">B：危ない！早く逃げろ！</p>
                    <span class="trans">B: Nguy hiểm! Mau chạy đi! (Mệnh lệnh)</span>
                    <br>
                    <p class="dialogue-p1">A：エレベーターを使いますか。</p>
                    <span class="trans">A: Có dùng thang máy không?</span>
                    <br>
                    <p class="dialogue-p2">B：だめだ！エレベーターを使うな！階段で行け！</p>
                    <span class="trans">B: Không được! Cấm dùng thang máy! Chạy bằng cầu thang bộ đi! (Cấm đoán + Mệnh lệnh)</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập: Mệnh lệnh & Cấm đoán</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Chia sang thể Mệnh lệnh:</p>
                    <ul>
                        <li>急ぎます (Nhanh lên) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">急げ</span></li>
                        <li>頑張ります (Cố lên) ➔ <span class="fragment" style="color:var(--success); font-weight:bold;">頑張れ</span></li>
                    </ul>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chia sang thể Cấm đoán:</p>
                    <ul>
                        <li>触ります (Cấm sờ) ➔ <span class="fragment" style="color:var(--danger); font-weight:bold;">触るな</span></li>
                        <li>負けます (Cấm thua) ➔ <span class="fragment" style="color:var(--danger); font-weight:bold;">負けるな</span></li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. ～と 書いてあります (Viết là)</h2>
                <div class="box-highlight">
                    "Câu / Chữ" + と書いてあります
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để trích dẫn nội dung được viết trên biển báo, nhãn mác, thông báo.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>あそこに「止まれ」と書いてあります。</p>
                    <span class="trans">Đằng kia CÓ VIẾT LÀ "Dừng lại".</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この箱に「注意」と書いてあります。</p>
                    <span class="trans">Trên cái hộp này CÓ VIẾT LÀ "Chú ý".</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">4. X は Y という 意味です (X nghĩa là Y)</h2>
                <div class="box-highlight">
                    X は [Câu ở Thể thông thường] と いう 意味です。
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để giải thích ý nghĩa của một từ ngữ, ký hiệu X.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>「立入禁止」は、ここに入るなという意味です。</p>
                    <span class="trans">"Tachiiri-kinshi" (Cấm vào) NGHĨA LÀ cấm không được vào đây.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このマークは、洗濯機で洗えるという意味です。</p>
                    <span class="trans">Ký hiệu này có NGHĨA LÀ có thể giặt bằng máy giặt.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Trả lời câu hỏi:<br>
                    A: この漢字はどういう意味ですか。<br>
                    B: 使ってはいけない (_______________) 意味です。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>という</strong>.<br>
                        (Cấu trúc X は Yという 意味です).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    あそこに車を ( A. 止めるな / B. 止めるない ) と書いてあります。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 止めるな</strong><br>
                        (Cấm đoán là Vる + な).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 33</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Mệnh lệnh (Vえ / Vろ):</strong> Ra lệnh gay gắt (行け - Đi đi).</li>
                        <li style="margin-bottom:15px;"><strong>Cấm đoán (Vるな):</strong> Cấm tuyệt đối (行くな - Cấm đi).</li>
                        <li style="margin-bottom:15px;"><strong>～と書いてあります:</strong> Trích dẫn chữ viết trên biển báo.</li>
                        <li style="margin-bottom:15px;"><strong>X は Y という意味です:</strong> Giải thích ý nghĩa của X.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 33! 🏆
                </div>
            </section>"""
        ],
        "furigana": {
            "逃げます": "<ruby>逃<rt>に</rt></ruby>げます",
            "騒ぎます": "<ruby>騒<rt>さわ</rt></ruby>ぎます",
            "投げます": "<ruby>投<rt>な</rt></ruby>げます",
            "守ります": "<ruby>守<rt>まも</rt></ruby>ります",
            "注意": "<ruby>注意<rt>ちゅうい</rt></ruby>",
            "外します": "<ruby>外<rt>はず</rt></ruby>します",
            "規則": "<ruby>規則<rt>きそく</rt></ruby>",
            "酒": "<ruby>酒<rt>さけ</rt></ruby>",
            "飲む": "<ruby>飲<rt>の</rt></ruby>む",
            "飲まない": "<ruby>飲<rt>の</rt></ruby>まない",
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "行け": "<ruby>行<rt>い</rt></ruby>け",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "飲め": "<ruby>飲<rt>の</rt></ruby>め",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "食べろ": "<ruby>食<rt>た</rt></ruby>べろ",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見ろ": "<ruby>見<rt>み</rt></ruby>ろ",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "早く": "<ruby>早<rt>はや</rt></ruby>く",
            "寝ろ": "<ruby>寝<rt>ね</rt></ruby>ろ",
            "逃げろ": "<ruby>逃<rt>に</rt></ruby>げろ",
            "行く": "<ruby>行<rt>い</rt></ruby>く",
            "行くな": "<ruby>行<rt>い</rt></ruby>くな",
            "飲むな": "<ruby>飲<rt>の</rt></ruby>むな",
            "入る": "<ruby>入<rt>はい</rt></ruby>る",
            "入るな": "<ruby>入<rt>はい</rt></ruby>るな",
            "吸うな": "<ruby>吸<rt>す</rt></ruby>うな",
            "火事": "<ruby>火事<rt>かじ</rt></ruby>",
            "危ない": "<ruby>危<rt>あぶ</rt></ruby>ない",
            "使います": "<ruby>使<rt>つか</rt></ruby>います",
            "使うな": "<ruby>使<rt>つか</rt></ruby>うな",
            "階段": "<ruby>階段<rt>かいだん</rt></ruby>",
            "急ぎます": "<ruby>急<rt>いそ</rt></ruby>ぎます",
            "急げ": "<ruby>急<rt>いそ</rt></ruby>げ",
            "頑張ります": "<ruby>頑張<rt>がんば</rt></ruby>ります",
            "頑張れ": "<ruby>頑張<rt>がんば</rt></ruby>れ",
            "触ります": "<ruby>触<rt>さわ</rt></ruby>ります",
            "触るな": "<ruby>触<rt>さわ</rt></ruby>るな",
            "負けます": "<ruby>負<rt>ま</rt></ruby>けます",
            "負けるな": "<ruby>負<rt>ま</rt></ruby>けるな",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて",
            "止まれ": "<ruby>止<rt>と</rt></ruby>まれ",
            "箱": "<ruby>箱<rt>はこ</rt></ruby>",
            "意味": "<ruby>意味<rt>いみ</rt></ruby>",
            "立入禁止": "<ruby>立入禁止<rt>たちいりきんし</rt></ruby>",
            "洗濯機": "<ruby>洗濯機<rt>せんたくき</rt></ruby>",
            "洗える": "<ruby>洗<rt>あら</rt></ruby>える",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "使って": "<ruby>使<rt>つか</rt></ruby>って",
            "車": "<ruby>車<rt>くるま</rt></ruby>",
            "止めるな": "<ruby>止<rt>と</rt></ruby>めるな"
        }
    },
    
    "bai34": {
        "title": "Bài 34",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 34 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Vとおりに & Vたあとで</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 33)</p>
                    <p class="quiz-q">1. Chuyển sang thể Mệnh lệnh và Cấm đoán của động từ 走る (Chạy):</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Mệnh lệnh: <strong>走れ</strong> (Chạy đi!)<br>
                        Cấm đoán: <strong>走るな</strong> (Cấm chạy!)
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch câu: Ký hiệu này có nghĩa là "Cấm chụp ảnh".</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        このマークは「写真を撮るな」<strong>という意味です</strong>。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 34)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>磨きます</strong> (みがきます) : Đánh (răng), mài</div>
                    <div class="vocab-item"><strong>組み立てます</strong> (くみたてます) : Lắp ráp</div>
                    <div class="vocab-item"><strong>折ります</strong> (おります) : Gấp, gập, bẻ gãy</div>
                    <div class="vocab-item"><strong>気づきます</strong> (きづきます) : Nhận ra, để ý</div>
                    <div class="vocab-item"><strong>つけます</strong> : Chấm (nước tương)</div>
                    <div class="vocab-item"><strong>見つかります</strong> (みつかります) : Được tìm thấy</div>
                    <div class="vocab-item"><strong>質問します</strong> (しつもんします) : Hỏi</div>
                    <div class="vocab-item"><strong>説明書</strong> (せつめいしょ) : Sách hướng dẫn</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～とおりに (Theo như / Đúng như)</h2>
                <div class="box-highlight">
                    V1 (る / た) ＋ とおりに、V2<br>
                    N の ＋ とおりに、V2
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Làm V2 THEO ĐÚNG NHƯ những gì V1 / Danh từ thể hiện (không sai lệch).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私が言う<strong>とおりに</strong>、書いてください。</p>
                    <span class="trans">Hãy viết THEO ĐÚNG NHƯ những gì tôi nói.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>説明書の<strong>とおりに</strong>、組み立てました。</p>
                    <span class="trans">Tôi đã lắp ráp THEO ĐÚNG NHƯ sách hướng dẫn.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: ～とおりに</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：この料理、おいしいですね。どうやって作ったんですか。</p>
                    <span class="trans">A: Món này ngon thế. Cậu làm thế nào vậy?</span>
                    <br>
                    <p class="dialogue-p2">B：テレビで見たとおりに、作ったんですよ。</p>
                    <span class="trans">B: Tớ làm THEO ĐÚNG NHƯ những gì đã xem trên TV đó.</span>
                    <br>
                    <p class="dialogue-p1">A：すごい！まるでプロの料理ですね。</p>
                    <span class="trans">A: Giỏi quá! Cứ như đồ ăn của đầu bếp chuyên nghiệp vậy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập: ～とおりに</h2>
                <div class="quiz-box">
                    <p class="quiz-q">1. Điền từ thích hợp vào chỗ trống:</p>
                    <p>線の (__________), 紙を切ってください。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        線の <strong>とおりに</strong>, 紙を切ってください。<br>
                        (Vì 線 là Danh từ nên phải có の).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Hãy làm đúng như tôi đã làm".</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        私が <strong>やったとおりに</strong>、やってください。<br>
                        (Đã làm -> Vた).
                    </div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. ～あとで (Sau khi)</h2>
                <div class="box-highlight">
                    Vた ＋ あとで、V2<br>
                    N の ＋ あとで、V2
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả hành động V2 xảy ra SAU KHI hành động V1 / Danh từ kết thúc.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>仕事が終わった<strong>あとで</strong>、飲みに行きませんか。</p>
                    <span class="trans">SAU KHI công việc kết thúc, đi nhậu không?</span>
                </div>
                <div class="grammar-example fragment">
                    <p>食事の<strong>あとで</strong>、歯を磨きます。</p>
                    <span class="trans">SAU BỮA ĂN (Sau khi ăn), tôi đánh răng.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🔍 So sánh: Vてから vs Vたあとで</h2>
                <div class="grammar-example">
                    <p>Cả hai đều có nghĩa là "Sau khi", nhưng:</p>
                    <p style="color:var(--primary); font-weight:bold;">Vてから:</p>
                    <p>Nhấn mạnh SỰ LIÊN TỤC VỀ THỜI GIAN (Làm V1 xong là làm V2 luôn). Dùng để chỉ dẫn thứ tự (Làm A rồi làm B nhé).</p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--danger); font-weight:bold;">Vたあとで:</p>
                    <p>CHỈ NHẤN MẠNH MỐI QUAN HỆ TRƯỚC/SAU. Khoảng cách thời gian có thể dài. Danh từ phải dùng Nのあとで (Không có Nてから).</p>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Vて / Vないで (Làm trong trạng thái kèm theo)</h2>
                <div class="box-highlight">
                    V1て、V2<br>
                    V1ないで、V2
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Thực hiện hành động chính (V2) TRONG TRẠNG THÁI CÓ (hoặc KHÔNG CÓ) kèm theo hành động phụ (V1).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>しょうゆをつけて、食べます。</p>
                    <span class="trans">CHẤM xì dầu rồi ăn. (Ăn trong trạng thái có chấm xì dầu).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>メガネをかけないで、本を読みます。</p>
                    <span class="trans">Tôi đọc sách mà KHÔNG ĐEO kính.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">4. V1ないで、V2 (Lựa chọn 1 trong 2)</h2>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Đáng lẽ ra phải làm V1, nhưng không làm V1 mà LỰA CHỌN làm V2 thay thế.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>日曜日はどこも行かないで、家で休みます。</p>
                    <span class="trans">Chủ nhật tôi KHÔNG ĐI đâu cả MÀ CHỌN nghỉ ở nhà.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>エレベーターに乗らないで、階段を使います。</p>
                    <span class="trans">Tôi KHÔNG ĐI thang máy MÀ CHỌN dùng cầu thang bộ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn Vて hay Vないで:<br>
                    昨夜はとても暑かったですから、エアコンを ( A. つけて / B. つけないで ) 寝ました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. つけて</strong>.<br>
                        (Trời nóng nên ngủ trong trạng thái CÓ bật điều hòa).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    映画を ( A. 見た / B. 見る ) あとで、食事しましょう。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 見た</strong><br>
                        (Cấu trúc Vた ＋ あとで).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 34</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vる/Vた/Nの + とおりに:</strong> Làm theo đúng như...</li>
                        <li style="margin-bottom:15px;"><strong>Vた/Nの + あとで:</strong> Sau khi...</li>
                        <li style="margin-bottom:15px;"><strong>Vて + Hành động chính:</strong> Làm trong trạng thái CÓ kèm theo...</li>
                        <li style="margin-bottom:15px;"><strong>Vないで + Hành động chính:</strong> Làm trong trạng thái KHÔNG kèm theo... (hoặc: Chọn làm V2 thay vì V1).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 34! 🏆
                </div>
            </section>"""
        ],
        "furigana": {
            "走る": "<ruby>走<rt>はし</rt></ruby>る",
            "走れ": "<ruby>走<rt>はし</rt></ruby>れ",
            "写真": "<ruby>写真<rt>しゃしん</rt></ruby>",
            "撮るな": "<ruby>撮<rt>と</rt></ruby>るな",
            "意味": "<ruby>意味<rt>いみ</rt></ruby>",
            "磨きます": "<ruby>磨<rt>みが</rt></ruby>きます",
            "組み立てます": "<ruby>組<rt>く</rt></ruby>み<ruby>立<rt>た</rt></ruby>てます",
            "折ります": "<ruby>折<rt>お</rt></ruby>ります",
            "気づきます": "<ruby>気<rt>き</rt></ruby>づきます",
            "見つかります": "<ruby>見<rt>み</rt></ruby>つかります",
            "質問": "<ruby>質問<rt>しつもん</rt></ruby>",
            "説明書": "<ruby>説明書<rt>せつめいしょ</rt></ruby>",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "言う": "<ruby>言<rt>い</rt></ruby>う",
            "書いて": "<ruby>書<rt>か</rt></ruby>いて",
            "料理": "<ruby>料理<rt>りょうり</rt></ruby>",
            "作った": "<ruby>作<rt>つく</rt></ruby>った",
            "見": "<ruby>見<rt>み</rt></ruby>",
            "線": "<ruby>線<rt>せん</rt></ruby>",
            "紙": "<ruby>紙<rt>かみ</rt></ruby>",
            "切って": "<ruby>切<rt>き</rt></ruby>って",
            "仕事": "<ruby>仕事<rt>しごと</rt></ruby>",
            "終わった": "<ruby>終<rt>お</rt></ruby>わった",
            "飲み": "<ruby>飲<rt>の</rt></ruby>み",
            "行きません": "<ruby>行<rt>い</rt></ruby>きません",
            "食事": "<ruby>食事<rt>しょくじ</rt></ruby>",
            "歯": "<ruby>歯<rt>は</rt></ruby>",
            "磨きます": "<ruby>磨<rt>みが</rt></ruby>きます",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "本": "<ruby>本<rt>ほん</rt></ruby>",
            "読みます": "<ruby>読<rt>よ</rt></ruby>みます",
            "日曜日": "<ruby>日曜日<rt>にちようび</rt></ruby>",
            "家": "<ruby>家<rt>いえ</rt></ruby>",
            "休みます": "<ruby>休<rt>やす</rt></ruby>みます",
            "乗らない": "<ruby>乗<rt>の</rt></ruby>らない",
            "階段": "<ruby>階段<rt>かいだん</rt></ruby>",
            "使います": "<ruby>使<rt>つか</rt></ruby>います",
            "昨夜": "<ruby>昨夜<rt>ゆうべ</rt></ruby>",
            "暑かった": "<ruby>暑<rt>あつ</rt></ruby>かった",
            "寝ました": "<ruby>寝<rt>ね</rt></ruby>ました",
            "映画": "<ruby>映画<rt>えいが</rt></ruby>"
        }
    },

    "bai35": {
        "title": "Bài 35",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 35 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: Thể Điều Kiện (Nếu... thì...)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 34)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    しょうゆを ( A. つける / B. つけて )、食べます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. つけて</strong><br>
                        (Ăn trong trạng thái kèm theo xì dầu).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch câu: "Sau khi làm xong bài tập, tôi đã chơi game."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        宿題を<strong>したあとで</strong>、ゲームをしました。
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 35)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>咲きます</strong> (さきます) : Nở (hoa)</div>
                    <div class="vocab-item"><strong>変わります</strong> (かわります) : Thay đổi</div>
                    <div class="vocab-item"><strong>困ります</strong> (こまります) : Rắc rối, khó khăn</div>
                    <div class="vocab-item"><strong>付けます</strong> (つけます) : Khoanh tròn, đánh dấu</div>
                    <div class="vocab-item"><strong>拾います</strong> (ひろいます) : Nhặt, lượm</div>
                    <div class="vocab-item"><strong>交わります</strong> (まじわります) : Giao lưu, kết giao</div>
                    <div class="vocab-item"><strong>楽な</strong> (らくな) : Nhàn, thoải mái</div>
                    <div class="vocab-item"><strong>正しい</strong> (ただしい) : Đúng, chính xác</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Điều Kiện (条件形 - ば)</h2>
                <p style="font-size: 1.2em; margin-bottom: 20px;">Cách chia Động từ sang Thể Điều Kiện (NẾU):</p>
                <div class="grammar-example">
                    <p><strong>Nhóm 1 (Cột I → Cột E + ば):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>行きます → 行けば (Nếu đi)</li>
                        <li>飲みます → 飲めば (Nếu uống)</li>
                        <li>待ちます → 待てば (Nếu đợi)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 2 (Bỏ ます + れば):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>食べます → 食べれば (Nếu ăn)</li>
                        <li>見ます → 見れば (Nếu xem)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Nhóm 3:</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>します → すれば (Nếu làm)</li>
                        <li>来ます → 来れば (Nếu đến)</li>
                    </ul>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. Thể Điều Kiện (Tính từ & Danh từ)</h2>
                <p style="font-size: 1.2em; margin-bottom: 20px;">Cách chia Tính từ và Danh từ:</p>
                <div class="grammar-example">
                    <p><strong>Tính từ đuôi い (Bỏ い + ければ):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>安い → 安ければ (Nếu rẻ)</li>
                        <li>いい → よければ (Nếu tốt)</li>
                        <li><span style="color:var(--danger)">Phủ định:</span> 買わない → 買わなければ (Nếu không mua)</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p><strong>Tính từ đuôi な / Danh từ (Bỏ だ + なら):</strong></p>
                    <ul style="font-size: 1.1em; line-height: 1.5;">
                        <li>暇だ → 暇なら (Nếu rảnh)</li>
                        <li>雨だ → 雨なら (Nếu trời mưa)</li>
                    </ul>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. Cách sử dụng ～ば / ～なら</h2>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Đặt ra một ĐIỀU KIỆN. NẾU điều kiện đó xảy ra THÌ vế sau sẽ diễn ra.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>ボタンを押せば、窓が開きます。</p>
                    <span class="trans">NẾU bấm nút thì cửa sổ sẽ mở. (Điều kiện tự nhiên / Máy móc).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>安ければ、買います。</p>
                    <span class="trans">NẾU rẻ thì tôi sẽ mua.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>明日、雨なら、行きません。</p>
                    <span class="trans">NẾU ngày mai trời mưa, tôi sẽ không đi.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: ～ば</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：日本語がなかなか上手になりません。</p>
                    <span class="trans">A: Tiếng Nhật của tôi mãi không giỏi lên được.</span>
                    <br>
                    <p class="dialogue-p2">B：日本人の友達と話せば、上手になりますよ。</p>
                    <span class="trans">B: NẾU cậu nói chuyện với bạn người Nhật, cậu sẽ giỏi lên đấy.</span>
                    <br>
                    <p class="dialogue-p1">A：そうですね。頑張ります！</p>
                    <span class="trans">A: Đúng vậy nhỉ. Tôi sẽ cố gắng!</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Danh từ ＋ なら (Gợi ý / Đưa thông tin)</h2>
                <div class="box-highlight">
                    N なら、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để tiếp nhận thông tin từ người đối diện, từ đó ĐƯA RA GỢI Ý hoặc lời khuyên liên quan đến chủ đề đó.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>A：温泉に行きたいんですが…</p>
                    <p>B：温泉<strong>なら</strong>、箱根がいいですよ。</p>
                    <span class="trans">A: Tôi muốn đi tắm suối nước nóng...<br>
                    B: NẾU LÀ suối nước nóng THÌ Hakone là tốt nhất đấy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chia từ trong ngoặc sang thể Điều kiện:<br>
                    道が ( 分からない ) ________________、人に聞きます。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        道が <strong>分からなければ</strong>、人に聞きます。<br>
                        (Đuôi ない chia giống tính từ đuôi い: Bỏ い + ければ).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Đưa ra gợi ý bằng なら:<br>
                    A: パソコンを買いたいんですが…<br>
                    B: パソコン (_______)、秋葉原が安いですよ。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        パソコン <strong>なら</strong>、秋葉原が安いですよ。<br>
                        (NẾU LÀ máy tính thì...).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 35</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Cách chia V-ば:</strong> Nhóm 1 (Cột E + ば), Nhóm 2 (れば), Nhóm 3 (すれば/くれば).</li>
                        <li style="margin-bottom:15px;"><strong>Tính từ A-ければ / N-なら:</strong> Nếu rẻ (安ければ) / Nếu rảnh (暇なら).</li>
                        <li style="margin-bottom:15px;"><strong>Phủ định V-なければ:</strong> Nếu không làm...</li>
                        <li style="margin-bottom:15px;"><strong>N なら:</strong> Tiếp nhận thông tin để đưa ra gợi ý (Nếu là N thì...).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 35! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Hãy luyện tập chia Thể Điều Kiện thật nhuần nhuyễn nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "宿題": "<ruby>宿題<rt>しゅくだい</rt></ruby>",
            "咲きます": "<ruby>咲<rt>さ</rt></ruby>きます",
            "変わります": "<ruby>変<rt>か</rt></ruby>わります",
            "困ります": "<ruby>困<rt>こま</rt></ruby>ります",
            "付けます": "<ruby>付<rt>つ</rt></ruby>けます",
            "拾います": "<ruby>拾<rt>ひろ</rt></ruby>います",
            "交わります": "<ruby>交<rt>まじ</rt></ruby>わります",
            "楽": "<ruby>楽<rt>らく</rt></ruby>",
            "正しい": "<ruby>正<rt>ただ</rt></ruby>しい",
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "行けば": "<ruby>行<rt>い</rt></ruby>けば",
            "飲みます": "<ruby>飲<rt>の</rt></ruby>みます",
            "飲めば": "<ruby>飲<rt>の</rt></ruby>めば",
            "待ちます": "<ruby>待<rt>ま</rt></ruby>ちます",
            "待てば": "<ruby>待<rt>ま</rt></ruby>てば",
            "食べます": "<ruby>食<rt>た</rt></ruby>べます",
            "食べれば": "<ruby>食<rt>た</rt></ruby>べれば",
            "見ます": "<ruby>見<rt>み</rt></ruby>ます",
            "見れば": "<ruby>見<rt>み</rt></ruby>れば",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "来れば": "<ruby>来<rt>く</rt></ruby>れば",
            "安い": "<ruby>安<rt>やす</rt></ruby>い",
            "安ければ": "<ruby>安<rt>やす</rt></ruby>ければ",
            "買わない": "<ruby>買<rt>か</rt></ruby>わない",
            "買わなければ": "<ruby>買<rt>か</rt></ruby>わなければ",
            "暇": "<ruby>暇<rt>ひま</rt></ruby>",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "押せば": "<ruby>押<rt>お</rt></ruby>せば",
            "窓": "<ruby>窓<rt>まど</rt></ruby>",
            "開きます": "<ruby>開<rt>あ</rt></ruby>きます",
            "買います": "<ruby>買<rt>か</rt></ruby>います",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "行きません": "<ruby>行<rt>い</rt></ruby>きません",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>",
            "日本人": "<ruby>日本人<rt>にほんじん</rt></ruby>",
            "友達": "<ruby>友達<rt>ともだち</rt></ruby>",
            "話せば": "<ruby>話<rt>はな</rt></ruby>せば",
            "頑張ります": "<ruby>頑張<rt>がんば</rt></ruby>ります",
            "温泉": "<ruby>温泉<rt>おんせん</rt></ruby>",
            "行きたい": "<ruby>行<rt>い</rt></ruby>きたい",
            "箱根": "<ruby>箱根<rt>はこね</rt></ruby>",
            "道": "<ruby>道<rt>みち</rt></ruby>",
            "分からない": "<ruby>分<rt>わ</rt></ruby>からない",
            "分からなければ": "<ruby>分<rt>わ</rt></ruby>からなければ",
            "人": "<ruby>人<rt>ひと</rt></ruby>",
            "聞きます": "<ruby>聞<rt>き</rt></ruby>きます",
            "買いたい": "<ruby>買<rt>か</rt></ruby>いたい",
            "秋葉原": "<ruby>秋葉原<rt>あきはばら</rt></ruby>"
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

print("Super Mega Batch 2 (Lessons 32-35) generated successfully!")
