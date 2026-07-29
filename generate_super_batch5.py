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
    "bai44": {
        "title": "Bài 44",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 44 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: すぎます (Quá) & やすい/にくい (Dễ/Khó)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 43)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    雨が ( A. 降って / B. 降り ) そうですね。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 降り</strong><br>
                        (Động từ bỏ ます + そうです: Trông có vẻ sắp...).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Điền từ: ちょっと タバコを買って (_________)。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        タバコを買って <strong>きます</strong>。<br>
                        (Đi mua rồi quay lại ngay).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 44)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>泣きます</strong> (なきます) : Khóc</div>
                    <div class="vocab-item"><strong>笑います</strong> (わらいます) : Cười</div>
                    <div class="vocab-item"><strong>乾きます</strong> (かわきます) : Khô</div>
                    <div class="vocab-item"><strong>濡れます</strong> (ぬれます) : Ướt</div>
                    <div class="vocab-item"><strong>滑ります</strong> (すべります) : Trượt (chân)</div>
                    <div class="vocab-item"><strong>起きます</strong> (おきます) : Xảy ra (tai nạn)</div>
                    <div class="vocab-item"><strong>安全な</strong> (あんぜんな) : An toàn</div>
                    <div class="vocab-item"><strong>濃い / 薄い</strong> (こい / うすい) : Đậm / Nhạt</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～すぎます (Quá...)</h2>
                <div class="box-highlight">
                    V (Bỏ ます) + すぎます<br>
                    Tính từ い (Bỏ い) + すぎます<br>
                    Tính từ な (Bỏ な) + すぎます
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Một trạng thái hay hành động vượt QUÁ mức độ cho phép. Thường mang ý nghĩa TIÊU CỰC (không tốt).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>昨日、お酒を 飲み<strong>すぎました</strong>。</p>
                    <span class="trans">Hôm qua tôi đã uống QUÁ nhiều rượu. (Hậu quả: hôm nay đau đầu).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>このパソコンは 高<strong>すぎます</strong>。</p>
                    <span class="trans">Cái máy tính này đắt QUÁ. (Vượt quá ngân sách, không mua được).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. Vやすい / Vにくい (Dễ / Khó)</h2>
                <div class="box-highlight">
                    V (Bỏ ます) + やすいです (Dễ làm V)<br>
                    V (Bỏ ます) + にくいです (Khó làm V)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả tính chất của một sự vật là DỄ hay KHÓ để thực hiện một hành động nào đó.</p>
                    <p style="color:var(--danger)">*Lưu ý: やすい/にくい chia như Tính từ đuôi い.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>この薬は 飲み<strong>やすいです</strong>。</p>
                    <span class="trans">Thuốc này DỄ uống.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この漢字は 覚え<strong>にくいです</strong>。</p>
                    <span class="trans">Chữ Hán này KHÓ nhớ.</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Dễ và Khó</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：この靴、歩き<strong>やすいですか</strong>。</p>
                    <span class="trans">A: Đôi giày này đi (bộ) CÓ DỄ không?</span>
                    <br>
                    <p class="dialogue-p2">B：ええ、とても軽くて、歩き<strong>やすいですよ</strong>。</p>
                    <span class="trans">B: Vâng, rất nhẹ và DỄ đi lắm.</span>
                    <br>
                    <p class="dialogue-p1">A：じゃ、買います。前の靴は 滑り<strong>やすくて</strong>、危なかったんです。</p>
                    <span class="trans">A: Vậy tôi mua. Đôi giày trước DỄ bị trơn trượt, nguy hiểm lắm. (やすい chia thể て ➔ やすくて).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Làm cho trở thành: く/に します</h2>
                <div class="box-highlight">
                    Tính từ い (Bỏ い) + く します<br>
                    Tính từ な (Bỏ な) + に します<br>
                    Danh từ + に します
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Chủ ngữ TÁC ĐỘNG vào sự vật, LÀM CHO nó biến đổi trạng thái (Làm cho to lên, nhỏ đi, sạch sẽ...).</p>
                </div>
                <div class="grammar-example fragment">
                    <p>音が大きいですから、小ちいさ<strong>く してください</strong>。</p>
                    <span class="trans">Vì âm thanh to quá, xin hãy LÀM CHO nhỏ lại.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>部屋を きれい<strong>に します</strong>。</p>
                    <span class="trans">Tôi LÀM CHO căn phòng trở nên sạch sẽ. (Tức là Dọn dẹp).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chuyển sang mẫu câu すぎます:<br>
                    この問題は 複雑 ( Phức tạp ) ______________________。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        この問題は 複雑 <strong>すぎます</strong>。<br>
                        (Vấn đề này quá phức tạp - Tính từ な bỏ な).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    ズボンが長いですから、( A. 短く / B. 短いに ) してください。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 短く</strong><br>
                        (Tính từ đuôi い: Bỏ い + く します).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 44</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>～すぎます:</strong> Quá... (thường mang ý tiêu cực). (Bỏ ます, い, な).</li>
                        <li style="margin-bottom:15px;"><strong>～やすい / ～にくい:</strong> Dễ làm / Khó làm (Bỏ ます). Có thể coi như tính từ đuôi い.</li>
                        <li style="margin-bottom:15px;"><strong>～く/に します:</strong> Làm cho... trở thành (Tác động vào sự vật). (Adj-い ➔ くします, Adj-な/N ➔ にします).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 44! 🏆
                </div>
            </section>"""
        ],
        "furigana": {
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降って": "<ruby>降<rt>ふ</rt></ruby>って",
            "降り": "<ruby>降<rt>ふ</rt></ruby>り",
            "買って": "<ruby>買<rt>か</rt></ruby>って",
            "泣きます": "<ruby>泣<rt>な</rt></ruby>きます",
            "笑います": "<ruby>笑<rt>わら</rt></ruby>います",
            "乾きます": "<ruby>乾<rt>かわ</rt></ruby>きます",
            "濡れます": "<ruby>濡<rt>ぬ</rt></ruby>れます",
            "滑ります": "<ruby>滑<rt>すべ</rt></ruby>ります",
            "起きます": "<ruby>起<rt>お</rt></ruby>きます",
            "安全": "<ruby>安全<rt>あんぜん</rt></ruby>",
            "濃い": "<ruby>濃<rt>こ</rt></ruby>い",
            "薄い": "<ruby>薄<rt>うす</rt></ruby>い",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "酒": "<ruby>酒<rt>さけ</rt></ruby>",
            "飲み": "<ruby>飲<rt>の</rt></ruby>み",
            "高": "<ruby>高<rt>たか</rt></ruby>",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "漢字": "<ruby>漢字<rt>かんじ</rt></ruby>",
            "覚え": "<ruby>覚<rt>おぼ</rt></ruby>え",
            "靴": "<ruby>靴<rt>くつ</rt></ruby>",
            "歩き": "<ruby>歩<rt>ある</rt></ruby>き",
            "軽く": "<ruby>軽<rt>かる</rt></ruby>くて",
            "買います": "<ruby>買<rt>か</rt></ruby>います",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "滑り": "<ruby>滑<rt>すべ</rt></ruby>り",
            "危なかった": "<ruby>危<rt>あぶ</rt></ruby>なかった",
            "音": "<ruby>音<rt>おと</rt></ruby>",
            "大きい": "<ruby>大<rt>おお</rt></ruby>きい",
            "小": "<ruby>小<rt>ちい</rt></ruby>",
            "部屋": "<ruby>部屋<rt>へや</rt></ruby>",
            "問題": "<ruby>問題<rt>もんだい</rt></ruby>",
            "複雑": "<ruby>複雑<rt>ふくざつ</rt></ruby>",
            "長い": "<ruby>長<rt>なが</rt></ruby>い",
            "短く": "<ruby>短<rt>みじか</rt></ruby>く",
            "短い": "<ruby>短<rt>みじか</rt></ruby>い"
        }
    },
    
    "bai45": {
        "title": "Bài 45",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 45 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: 場合は (Trong trường hợp) & のに (Mặc dù)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 44)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    このペンは とても ( A. 書きやすい / B. 書くやすい ) です。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. 書きやすい</strong><br>
                        (Động từ bỏ ます + やすい: Dễ viết).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Dịch: "Xin hãy làm cho đồ ăn rẻ hơn một chút."</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        料理を 少し <strong>安くしてください</strong>。<br>
                        (Tính từ い ➔ Bỏ い + く します).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 45)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>信じます</strong> (しんじます) : Tin tưởng</div>
                    <div class="vocab-item"><strong>キャンセルします</strong> : Hủy bỏ</div>
                    <div class="vocab-item"><strong>知らせます</strong> (しらせます) : Thông báo</div>
                    <div class="vocab-item"><strong>保証書</strong> (ほしょうしょ) : Giấy bảo hành</div>
                    <div class="vocab-item"><strong>領収書</strong> (りょうしゅうしょ) : Hóa đơn</div>
                    <div class="vocab-item"><strong>キャンプ</strong> : Cắm trại</div>
                    <div class="vocab-item"><strong>中止</strong> (ちゅうし) : Dừng, hoãn lại</div>
                    <div class="vocab-item"><strong>無理に</strong> (むりに) : Một cách vô lý, gượng ép</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～場合は (Trong trường hợp...)</h2>
                <div class="box-highlight">
                    Thể thông thường / Adj-な / N-の + 場合は、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Giả định một tình huống (thường là tình huống rủi ro, khẩn cấp, vấn đề). Vế sau là cách giải quyết, đối ứng.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>パスポートをなくした<strong>場合は</strong>、どうしたらいいですか。</p>
                    <span class="trans">TRONG TRƯỜNG HỢP đánh mất hộ chiếu, tôi nên làm thế nào? (Giả định rủi ro).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>火事の<strong>場合は</strong>、エレベーターを使わないでください。</p>
                    <span class="trans">TRONG TRƯỜNG HỢP hỏa hoạn (Danh từ + の), xin đừng dùng thang máy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">2. ～のに (Mặc dù... thế mà...)</h2>
                <div class="box-highlight">
                    Thể thông thường + のに、～
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Diễn tả sự đối lập: MẶC DÙ vế trước xảy ra, nhưng kết quả ở vế sau lại TRÁI NGƯỢC với lẽ thường. Thường chứa đựng sự bất mãn, tiếc nuối hoặc bất ngờ của người nói.</p>
                    <p style="color:var(--danger)">* Tính từ な / Danh từ ➔ ＋ な ＋ のに</p>
                </div>
                <div class="grammar-example fragment">
                    <p>薬を飲んだ<strong>のに</strong>、熱が下がりません。</p>
                    <span class="trans">MẶC DÙ đã uống thuốc, THẾ MÀ vẫn không hạ sốt. (Tiếc nuối/Bất thường).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>今日は 日曜日な<strong>のに</strong>、働かなければなりません。</p>
                    <span class="trans">MẶC DÙ hôm nay là chủ nhật (Danh từ + なのに), THẾ MÀ tôi vẫn phải làm việc. (Bất mãn).</span>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">🗣 Hội thoại: Trái với mong đợi (のに)</h2>
                <div class="dialogue-box">
                    <p class="dialogue-p1">A：この時計、昨日買ったばかりな<strong>のに</strong>、もう壊れてしまいました。</p>
                    <span class="trans">A: Cái đồng hồ này, MẶC DÙ vừa mới mua hôm qua, THẾ MÀ đã hỏng mất tiêu rồi. (Sự bất mãn).</span>
                    <br>
                    <p class="dialogue-p2">B：えっ、本当ですか。買った店に 持って行ったほうがいいですよ。</p>
                    <span class="trans">B: Ơ, thật á. Cậu nên mang đến cửa hàng đã mua đi.</span>
                    <br>
                    <p class="dialogue-p1">A：ええ、そうします。</p>
                    <span class="trans">A: Ừ, tớ sẽ làm vậy.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🔍 So sánh: ～のに vs ～が / ～ても</h2>
                <div class="grammar-example">
                    <p style="color:var(--primary); font-weight:bold;">1. ～が / けれども (Nhưng):</p>
                    <p>Chỉ nối 2 vế đối lập khách quan. KHÔNG chứa cảm xúc (bất mãn/bất ngờ).<br>
                    Ví dụ: 日本語は難しいですが、面白いです。 (Tiếng Nhật khó NHƯNG thú vị).</p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--success); font-weight:bold;">2. ～ても (Dù...):</p>
                    <p>Là câu GIẢ ĐỊNH. Dù việc A CÓ THỂ xảy ra, thì vẫn làm B.<br>
                    Ví dụ: 雨が降っても、行きます。 (DÙ trời CÓ mưa, tôi VẪN đi).</p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--danger); font-weight:bold;">3. ～のに (Mặc dù... thế mà):</p>
                    <p>Việc A ĐÃ XẢY RA THẬT, nhưng kết quả B trái với quy luật, kèm theo cảm xúc MẠNH MẼ (bất mãn, thất vọng).<br>
                    Ví dụ: 一生懸命勉強したのに、不合格でした。 (MẶC DÙ ĐÃ học chăm chỉ, THẾ MÀ vẫn rớt).</p>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Điền từ (場合は hay のに):<br>
                    約束をした (_______________)、彼は 来ませんでした。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        約束をした <strong>のに</strong>、彼は 来ませんでした。<br>
                        (MẶC DÙ đã hẹn, THẾ MÀ anh ta không đến - Sự bất mãn).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    病気の ( A. な / B. の ) 場合は、会社に連絡してください。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. の</strong><br>
                        (Danh từ + の + 場合は).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 45</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>～場合は:</strong> Trong trường hợp... (Dùng như một Danh từ bình thường Nの). Hay giả định điều không hay.</li>
                        <li style="margin-bottom:15px;"><strong>～のに:</strong> Mặc dù... thế mà... (Diễn tả sự trái ngược với lẽ thường, CÓ chứa cảm xúc bất mãn, ngạc nhiên). Nhớ quy tắc: Danh từ/Tính từ な ➔ なのに.</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 45! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Từ giờ bạn đã biết cách "than vãn" bằng のに rồi nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "書きやすい": "<ruby>書<rt>か</rt></ruby>きやすい",
            "書くやすい": "<ruby>書<rt>か</rt></ruby>くやすい",
            "料理": "<ruby>料理<rt>りょうり</rt></ruby>",
            "少し": "<ruby>少<rt>すこ</rt></ruby>し",
            "安くして": "<ruby>安<rt>やす</rt></ruby>くして",
            "信じます": "<ruby>信<rt>しん</rt></ruby>じます",
            "知らせます": "<ruby>知<rt>し</rt></ruby>らせます",
            "保証書": "<ruby>保証書<rt>ほしょうしょ</rt></ruby>",
            "領収書": "<ruby>領収書<rt>りょうしゅうしょ</rt></ruby>",
            "中止": "<ruby>中止<rt>ちゅうし</rt></ruby>",
            "無理": "<ruby>無理<rt>むり</rt></ruby>",
            "場合": "<ruby>場合<rt>ばあい</rt></ruby>",
            "火事": "<ruby>火事<rt>かじ</rt></ruby>",
            "使わないで": "<ruby>使<rt>つか</rt></ruby>わないで",
            "薬": "<ruby>薬<rt>くすり</rt></ruby>",
            "飲んだ": "<ruby>飲<rt>の</rt></ruby>んだ",
            "熱": "<ruby>熱<rt>ねつ</rt></ruby>",
            "下がりません": "<ruby>下<rt>さ</rt></ruby>がりません",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "日曜日": "<ruby>日曜日<rt>にちようび</rt></ruby>",
            "働かなければなりません": "<ruby>働<rt>はたら</rt></ruby>かなければなりません",
            "時計": "<ruby>時計<rt>とけい</rt></ruby>",
            "昨日": "<ruby>昨日<rt>きのう</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "壊れて": "<ruby>壊<rt>こわ</rt></ruby>れて",
            "本当": "<ruby>本当<rt>ほんとう</rt></ruby>",
            "店": "<ruby>店<rt>みせ</rt></ruby>",
            "持って行った": "<ruby>持<rt>も</rt></ruby>って<ruby>行<rt>い</rt></ruby>った",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "難しい": "<ruby>難<rt>むずか</rt></ruby>しい",
            "面白い": "<ruby>面白<rt>おもしろ</rt></ruby>い",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "降っても": "<ruby>降<rt>ふ</rt></ruby>っても",
            "行きます": "<ruby>行<rt>い</rt></ruby>きます",
            "一生懸命": "<ruby>一生懸命<rt>いっしょうけんめい</rt></ruby>",
            "勉強した": "<ruby>勉強<rt>べんきょう</rt></ruby>した",
            "不合格": "<ruby>不合格<rt>ふごうかく</rt></ruby>",
            "約束": "<ruby>約束<rt>やくそく</rt></ruby>",
            "彼": "<ruby>彼<rt>かれ</rt></ruby>",
            "来ませんでした": "<ruby>来<rt>き</rt></ruby>ませんでした",
            "病気": "<ruby>病気<rt>びょうき</rt></ruby>",
            "会社": "<ruby>会社<rt>かいしゃ</rt></ruby>",
            "連絡して": "<ruby>連絡<rt>れんらく</rt></ruby>して"
        }
    },
    
    "bai46": {
        "title": "Bài 46",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 46 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: ところです (Sắp/Đang/Vừa) & はずです (Chắc chắn)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 45)</p>
                    <p class="quiz-q">1. Chọn đáp án đúng:<br>
                    勉強した ( A. ので / B. のに )、試験に 落ちました。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. のに</strong><br>
                        (MẶC DÙ đã học, THẾ MÀ vẫn rớt -> Sự thất vọng).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Điền trợ từ: 雨の (_____) 場合は、試合を中止します。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        雨の <strong>(の)</strong> 場合は...<br>
                        (Danh từ + の + 場合は).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 46)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>渡します</strong> (わたします) : Trao, đưa cho</div>
                    <div class="vocab-item"><strong>帰って来ます</strong> (かえってきます) : Trở về</div>
                    <div class="vocab-item"><strong>出発します</strong> (しゅっぱつします) : Xuất phát</div>
                    <div class="vocab-item"><strong>向かいます</strong> (むかいます) : Hướng đến, đi đến</div>
                    <div class="vocab-item"><strong>ちょうど</strong> : Vừa đúng (lúc)</div>
                    <div class="vocab-item"><strong>たった今</strong> (たったいま) : Vừa mới (tức thì)</div>
                    <div class="vocab-item"><strong>原因</strong> (げんいん) : Nguyên nhân</div>
                    <div class="vocab-item"><strong>半月</strong> (はんつき) : Nửa tháng</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～ところです (Nhấn mạnh thời điểm)</h2>
                <div class="grammar-example">
                    <p>Mẫu câu này chia làm 3 thì khác nhau, dùng để CHỈ RÕ MỘT THỜI ĐIỂM CHÍNH XÁC của hành động:</p>
                </div>
                
                <div class="grammar-example fragment">
                    <p style="color:var(--primary); font-weight:bold;">1. Vる ＋ ところです (Sắp sửa / Chuẩn bị làm)</p>
                    <p>会議は もう 始まりましたか。<br>
                    ➔ いいえ、<strong>これから 始まる ところです</strong>。<br>
                    <span class="trans">(Chưa bắt đầu). Không, TỪ BÂY GIỜ SẮP SỬA bắt đầu.</span></p>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～ところです (Tiếp)</h2>
                <div class="grammar-example">
                    <p style="color:var(--success); font-weight:bold;">2. Vている ＋ ところです (Đang làm giữa chừng)</p>
                    <p>今、故障の原因を <strong>調べている ところです</strong>。<br>
                    <span class="trans">Bây giờ, chúng tôi ĐANG TRONG LÚC điều tra nguyên nhân hỏng. (Nhấn mạnh việc đang diễn ra ngay lúc nói).</span></p>
                </div>
                
                <div class="grammar-example fragment">
                    <p style="color:var(--danger); font-weight:bold;">3. Vた ＋ ところです (Vừa mới hoàn thành tức thì)</p>
                    <p>バスは <strong>たった今 出発した ところです</strong>。<br>
                    <span class="trans">Xe buýt VỪA MỚI xuất phát TỨC THÌ. (Chỉ cách đây vài giây / vài phút, có thể vẫn nhìn thấy bóng xe buýt).</span></p>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. Vた ＋ ばかりです (Vừa mới - Theo cảm giác)</h2>
                <div class="box-highlight">
                    Vた ＋ ばかりです
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Cũng dịch là "Vừa mới làm xong", NHƯNG khác với Vたところです (tức thì). "ばかりです" dựa trên <strong>CẢM GIÁC THỜI GIAN NGẮN</strong> của người nói. Dù việc đó xảy ra 1 tháng trước, nhưng người nói thấy ngắn thì vẫn dùng được.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>私は 先月 日本へ 来た<strong>ばかりです</strong>。</p>
                    <span class="trans">Tôi VỪA MỚI đến Nhật vào tháng trước. (Không thể dùng Vたところです cho "tháng trước").</span>
                </div>
                <div class="grammar-example fragment">
                    <p>この時計は 先週 買った<strong>ばかりなのに</strong>、もう壊れました。</p>
                    <span class="trans">Cái đồng hồ này VỪA MỚI mua tuần trước (vẫn còn mới), thế mà đã hỏng.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. ～はずです (Chắc chắn là...)</h2>
                <div class="box-highlight">
                    Thể thông thường + はずです<br>
                    (Tính từ な + な / Danh từ + の)
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Phán đoán "Chắc chắn là...", "Hiển nhiên là...". Người nói hoàn toàn tự tin vào phán đoán của mình vì DỰA TRÊN MỘT CĂN CỨ rất logic và rõ ràng.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>田中さんは 10年間 アメリカに住んでいましたから、英語が話せる<strong>はずです</strong>。</p>
                    <span class="trans">Anh Tanaka đã sống ở Mỹ 10 năm nên CHẮC CHẮN LÀ anh ấy có thể nói tiếng Anh. (Căn cứ logic).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>今日は 日曜日ですから、銀行は 休みの<strong>はずです</strong>。</p>
                    <span class="trans">Hôm nay là chủ nhật nên CHẮC CHẮN LÀ ngân hàng nghỉ. (Danh từ + の).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn ところです hay ばかりです:<br>
                    半月前に、結婚した ( A. ところです / B. ばかりです )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. ばかりです</strong>.<br>
                        (Vì "nửa tháng trước" là một khoảng thời gian dài, nhưng người nói cảm thấy ngắn -> Dùng ばかり. "ところ" chỉ dùng cho "tức thì").
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    山田さんは 病気ですから、今日は 来ない ( A. かもしれません / B. はずです )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. はずです</strong><br>
                        (Bị ốm là một căn cứ rất logic để CHẮC CHẮN là không đến).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 46</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Vる ところです:</strong> Sắp sửa làm... (Chưa làm)</li>
                        <li style="margin-bottom:15px;"><strong>Vている ところです:</strong> Đang làm... (Ngay lúc này)</li>
                        <li style="margin-bottom:15px;"><strong>Vた ところです:</strong> Vừa mới làm xong TỨC THÌ (vài giây trước).</li>
                        <li style="margin-bottom:15px;"><strong>Vた ばかりです:</strong> Vừa mới làm (Dựa trên cảm giác thời gian ngắn, có thể là 1 tháng/1 năm).</li>
                        <li style="margin-bottom:15px;"><strong>～はずです:</strong> Chắc chắn là... (Dựa trên căn cứ logic vững chắc).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 46! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Sự phân biệt giữa ところ và ばかり rất quan trọng nhé!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "勉強した": "<ruby>勉強<rt>べんきょう</rt></ruby>した",
            "試験": "<ruby>試験<rt>しけん</rt></ruby>",
            "落ちました": "<ruby>落<rt>お</rt></ruby>ちました",
            "雨": "<ruby>雨<rt>あめ</rt></ruby>",
            "場合": "<ruby>場合<rt>ばあい</rt></ruby>",
            "試合": "<ruby>試合<rt>しあい</rt></ruby>",
            "中止": "<ruby>中止<rt>ちゅうし</rt></ruby>します",
            "渡します": "<ruby>渡<rt>わた</rt></ruby>します",
            "帰って": "<ruby>帰<rt>かえ</rt></ruby>って",
            "来ます": "<ruby>来<rt>き</rt></ruby>ます",
            "出発": "<ruby>出発<rt>しゅっぱつ</rt></ruby>します",
            "向かいます": "<ruby>向<rt>むか</rt></ruby>います",
            "今": "<ruby>今<rt>いま</rt></ruby>",
            "原因": "<ruby>原因<rt>げんいん</rt></ruby>",
            "半月": "<ruby>半月<rt>はんつき</rt></ruby>",
            "会議": "<ruby>会議<rt>かいぎ</rt></ruby>",
            "始まりましたか": "<ruby>始<rt>はじ</rt></ruby>まりましたか",
            "始まる": "<ruby>始<rt>はじ</rt></ruby>まる",
            "故障": "<ruby>故障<rt>こしょう</rt></ruby>",
            "調べている": "<ruby>調<rt>しら</rt></ruby>べている",
            "出発した": "<ruby>出発<rt>しゅっぱつ</rt></ruby>した",
            "私": "<ruby>私<rt>わたし</rt></ruby>",
            "先月": "<ruby>先月<rt>せんげつ</rt></ruby>",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "来た": "<ruby>来<rt>き</rt></ruby>た",
            "時計": "<ruby>時計<rt>とけい</rt></ruby>",
            "先週": "<ruby>先週<rt>せんしゅう</rt></ruby>",
            "買った": "<ruby>買<rt>か</rt></ruby>った",
            "壊れました": "<ruby>壊<rt>こわ</rt></ruby>れました",
            "田中": "<ruby>田中<rt>たなか</rt></ruby>",
            "年間": "<ruby>年間<rt>ねんかん</rt></ruby>",
            "住んでいました": "<ruby>住<rt>す</rt></ruby>んでいました",
            "英語": "<ruby>英語<rt>えいご</rt></ruby>",
            "話せる": "<ruby>話<rt>はな</rt></ruby>せる",
            "今日": "<ruby>今日<rt>きょう</rt></ruby>",
            "日曜日": "<ruby>日曜日<rt>にちようび</rt></ruby>",
            "銀行": "<ruby>銀行<rt>ぎんこう</rt></ruby>",
            "休み": "<ruby>休<rt>やす</rt></ruby>み",
            "前": "<ruby>前<rt>まえ</rt></ruby>",
            "結婚した": "<ruby>結婚<rt>けっこん</rt></ruby>した",
            "山田": "<ruby>山田<rt>やまだ</rt></ruby>",
            "病気": "<ruby>病気<rt>びょうき</rt></ruby>",
            "来ない": "<ruby>来<rt>こ</rt></ruby>ない"
        }
    },
    
    "bai47": {
        "title": "Bài 47",
        "slides": [
            """<section class="title-slide">
                <h1>BÀI 47 - MINNA NO NIHONGO II</h1>
                <h3>Ngữ pháp: そうです (Nghe nói) & ようです (Có vẻ như)</h3>
                <p>⏳ Thời lượng dự kiến: 120 Phút</p>
            </section>""",
            
            """<section>
                <h2 class="section-title">🎯 Khởi động & Kiểm tra bài cũ</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Mini Test (Bài 46)</p>
                    <p class="quiz-q">1. Điền từ thích hợp:<br>
                    バスは たった今 出発した (____________)。(Chỉ vừa mới xảy ra tức thì).</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        出発した <strong>ところです</strong>。<br>
                        (Tức thì dùng ところです, không dùng ばかりです).
                    </div>
                </div>
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn đáp án đúng:<br>
                    彼は 日本に10年住んでいましたから、日本語が 上手な ( A. でしょう / B. はずです )。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. はずです</strong><br>
                        (Vì có căn cứ rất logic là sống ở Nhật 10 năm -> Chắc chắn giỏi).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Từ vựng Trọng tâm (Bài 47)</h2>
                <div class="vocab-grid">
                    <div class="vocab-item"><strong>集まります</strong> (あつまります) : Tập trung, tụ tập</div>
                    <div class="vocab-item"><strong>別れます</strong> (わかれます) : Chia tay</div>
                    <div class="vocab-item"><strong>長生きします</strong> (ながいきします) : Sống thọ</div>
                    <div class="vocab-item"><strong>します</strong> : Có (âm thanh, mùi vị)</div>
                    <div class="vocab-item"><strong>ひどい</strong> : Tồi tệ, khủng khiếp</div>
                    <div class="vocab-item"><strong>実験</strong> (じっけん) : Thực nghiệm, thí nghiệm</div>
                    <div class="vocab-item"><strong>婚約します</strong> (こんやくします) : Đính hôn</div>
                    <div class="vocab-item"><strong>恋人</strong> (こいびと) : Người yêu</div>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">1. ～そうです (Nghe nói là / Truyền đạt)</h2>
                <div class="box-highlight">
                    Thể thông thường + そうです
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Dùng để TRUYỀN ĐẠT lại một thông tin mà mình nghe được, đọc được từ một nguồn khác (không phải ý kiến cá nhân). Thường đi với mẫu "N(nguồn) によると...そうです" (Theo như N thì...).</p>
                    <p style="color:var(--danger)">* Tính từ な / Danh từ ➔ Giữ nguyên だ ＋ そうです</p>
                </div>
                <div class="grammar-example fragment">
                    <p>天気予報<strong>によると</strong>、明日は 寒くなる <strong>そうです</strong>。</p>
                    <span class="trans">THEO NHƯ dự báo thời tiết, NGHE NÓI LÀ ngày mai sẽ trở lạnh.</span>
                </div>
                <div class="grammar-example fragment">
                    <p>ニュース<strong>によると</strong>、アメリカで 地震が あった <strong>そうです</strong>。</p>
                    <span class="trans">THEO NHƯ tin tức, NGHE NÓI LÀ đã có động đất ở Mỹ.</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">🔍 So sánh: 2 loại "そうです"</h2>
                <div class="grammar-example">
                    <p style="color:var(--primary); font-weight:bold;">1. そうです (Nhìn bề ngoài - Bài 43):</p>
                    <p>Cách chia: BỎ ます / BỎ い / BỎ な.<br>
                    Ý nghĩa: "Trông có vẻ". (Đánh giá bằng MẮT).<br>
                    Ví dụ: 料理が <strong>おいしそうです</strong>。 (Món ăn TRÔNG CÓ VẺ ngon - chưa ăn thử).</p>
                </div>
                <div class="grammar-example fragment">
                    <p style="color:var(--success); font-weight:bold;">2. そうです (Nghe nói - Bài 47):</p>
                    <p>Cách chia: THỂ THÔNG THƯỜNG (Giữ nguyên だ / い).<br>
                    Ý nghĩa: "Nghe nói là". (Truyền đạt bằng TAI).<br>
                    Ví dụ: 料理が <strong>おいしいそうです</strong>。 (NGHE NÓI LÀ món ăn ngon - nghe ai đó kể lại).</p>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">2. ～ようです (Có vẻ như - Suy đoán)</h2>
                <div class="box-highlight">
                    Thể thông thường + ようです<br>
                    (Tính từ な ➔ な / Danh từ ➔ の) + ようです
                </div>
                <div class="grammar-example">
                    <p><strong>Ý nghĩa:</strong> Suy đoán mang tính chủ quan của người nói, dựa trên một <strong>CĂN CỨ DO CÁC GIÁC QUAN (Tai, Mắt, Mũi...)</strong> cảm nhận được.</p>
                </div>
                <div class="grammar-example fragment">
                    <p>隣の部屋に 誰か いる <strong>ようです</strong>。</p>
                    <span class="trans">CÓ VẺ NHƯ có ai đó ở phòng bên cạnh. (Căn cứ bằng Tai: Nghe thấy tiếng động).</span>
                </div>
                <div class="grammar-example fragment">
                    <p>人が たくさん集まっていますね。事故の <strong>ようです</strong>。</p>
                    <span class="trans">Mọi người đang tập trung đông nhỉ. CÓ VẺ NHƯ là một vụ tai nạn. (Căn cứ bằng Mắt).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">3. Danh từ (Chỉ giác quan) ＋ が します</h2>
                <div class="grammar-example">
                    <p>Dùng để diễn tả việc bản thân NHẬN THẤY / CẢM THẤY một kích thích từ các giác quan (Âm thanh, Mùi vị, Giọng nói...).</p>
                    <ul style="font-size: 1.1em; line-height: 1.8;">
                        <li><strong>音 (おと) が します:</strong> Có âm thanh / tiếng động.</li>
                        <li><strong>声 (こえ) が します:</strong> Có giọng nói.</li>
                        <li><strong>におい が します:</strong> Có mùi.</li>
                        <li><strong>味 (あじ) が します:</strong> Có vị.</li>
                    </ul>
                </div>
                <div class="grammar-example fragment">
                    <p>変な <strong>においが します</strong>ね。</p>
                    <span class="trans">Có mùi lạ nhỉ. (Ngửi thấy).</span>
                </div>
            </section>""",

            """<section>
                <h2 class="section-title">📝 Bài tập Cuối bài (Tổng hợp)</h2>
                <div class="quiz-box">
                    <p class="quiz-title">Quiz Tổng hợp</p>
                    <p class="quiz-q">1. Chọn đáp án đúng (Phân biệt 2 loại そうです):<br>
                    山田さんは ケーキが好き ( A. だ / B. な ) そうです。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>A. だ</strong>.<br>
                        (Vì "Nghe nói là" đi với Thể thông thường. Tính từ な giữ nguyên だ. Câu này nghĩa là: NGHE NÓI anh Yamada thích bánh kem).
                    </div>
                </div>
                
                <div class="quiz-box fragment">
                    <p class="quiz-q">2. Chọn từ thích hợp:<br>
                    外で 犬の ( A. 音 / B. 声 ) がします。</p>
                    <button class="answer-btn" onclick="toggleAnswer(this)">Kiểm tra đáp án</button>
                    <div class="answer-content">
                        Đáp án: <strong>B. 声 (こえ)</strong><br>
                        (Âm thanh do động vật, con người phát ra từ miệng dùng 声. Âm thanh đồ vật dùng 音).
                    </div>
                </div>
            </section>""",
            
            """<section>
                <h2 class="section-title">📚 Tổng kết Bài 47</h2>
                <div class="grammar-example">
                    <ul>
                        <li style="margin-bottom:15px;"><strong>Thể thông thường + そうです:</strong> Nghe nói là (Truyền đạt lại thông tin).</li>
                        <li style="margin-bottom:15px;"><strong>Thể thông thường + ようです:</strong> Có vẻ như (Suy đoán dựa trên chứng cứ giác quan thu thập được).</li>
                        <li style="margin-bottom:15px;"><strong>(音/声/におい/味) + が します:</strong> Có âm thanh/tiếng/mùi/vị (Cảm nhận bằng giác quan).</li>
                    </ul>
                </div>
                <div class="box-highlight fragment" style="text-align:center;">
                    🏆 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI 47! 🏆<br>
                    <span style="font-size:0.7em; font-weight:normal;">Chỉ còn 3 bài nữa là kết thúc 50 bài Minna no Nihongo!</span>
                </div>
            </section>"""
        ],
        "furigana": {
            "出発した": "<ruby>出発<rt>しゅっぱつ</rt></ruby>した",
            "彼": "<ruby>彼<rt>かれ</rt></ruby>",
            "日本": "<ruby>日本<rt>にほん</rt></ruby>",
            "年": "<ruby>年<rt>ねん</rt></ruby>",
            "住んでいました": "<ruby>住<rt>す</rt></ruby>んでいました",
            "日本語": "<ruby>日本語<rt>にほんご</rt></ruby>",
            "上手": "<ruby>上手<rt>じょうず</rt></ruby>",
            "集まります": "<ruby>集<rt>あつま</rt></ruby>ります",
            "別れます": "<ruby>別<rt>わか</rt></ruby>れます",
            "長生きします": "<ruby>長生<rt>ながい</rt></ruby>きします",
            "実験": "<ruby>実験<rt>じっけん</rt></ruby>",
            "婚約": "<ruby>婚約<rt>こんやく</rt></ruby>",
            "恋人": "<ruby>恋人<rt>こいびと</rt></ruby>",
            "天気予報": "<ruby>天気予報<rt>てんきよほう</rt></ruby>",
            "明日": "<ruby>明日<rt>あした</rt></ruby>",
            "寒くなる": "<ruby>寒<rt>さむ</rt></ruby>くなる",
            "地震": "<ruby>地震<rt>じしん</rt></ruby>",
            "料理": "<ruby>料理<rt>りょうり</rt></ruby>",
            "隣": "<ruby>隣<rt>となり</rt></ruby>",
            "部屋": "<ruby>部屋<rt>へや</rt></ruby>",
            "誰か": "<ruby>誰<rt>だれ</rt></ruby>か",
            "人": "<ruby>人<rt>ひと</rt></ruby>",
            "集まっています": "<ruby>集<rt>あつま</rt></ruby>っています",
            "事故": "<ruby>事故<rt>じこ</rt></ruby>",
            "音": "<ruby>音<rt>おと</rt></ruby>",
            "声": "<ruby>声<rt>こえ</rt></ruby>",
            "味": "<ruby>味<rt>あじ</rt></ruby>",
            "変": "<ruby>変<rt>へん</rt></ruby>",
            "山田": "<ruby>山田<rt>やまだ</rt></ruby>",
            "好き": "<ruby>好<rt>す</rt></ruby>き",
            "外": "<ruby>外<rt>そと</rt></ruby>",
            "犬": "<ruby>犬<rt>いぬ</rt></ruby>"
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

print("Super Mega Batch 5 (Lessons 44-47) generated successfully!")
