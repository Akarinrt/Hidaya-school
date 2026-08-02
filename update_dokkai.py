import codecs
import re

file_path = r'd:\Giáo án\japanese-lms\public\slides\bai28\nguphap.html'
try:
    with codecs.open(file_path, 'r', 'utf-8') as f:
        content = f.read()

    new_dokkai = '''<div class="quiz-box fragment">
    <div class="quiz-title" style="font-size: 1.4em; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-bottom: 20px;">
        Vừa học vừa làm (働きながら勉強します)
        <button class="answer-btn" style="float: right; margin-top: -5px;" onclick="toggleFurigana()">👁 Furigana</button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="border-right: 1px dashed #ccc; padding-right: 20px; font-size: 1.1em; line-height: 1.8;">
            <p><ruby>私<rt>わたし</rt></ruby>は<ruby>留学生<rt>りゅうがくせい</rt></ruby>です。<ruby>毎日<rt>まいにち</rt></ruby>とても<ruby>忙<rt>いそが</rt></ruby>しいです。<br><ruby>毎朝<rt>まいあさ</rt></ruby>6<ruby>時<rt>じ</rt></ruby>に<ruby>起<rt>お</rt></ruby>きて、ご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べ<span style='color:#d32f2f; font-weight:bold;'>ながら</span><ruby>日本語<rt>にほんご</rt></ruby>のニュースを<ruby>見<rt>み</rt></ruby>ています。<br>7<ruby>時<rt>じ</rt></ruby>から12<ruby>時<rt>じ</rt></ruby>まで<ruby>大学<rt>だいがく</rt></ruby>で<ruby>勉強<rt>べんきょう</rt></ruby>して、<ruby>午後<rt>ごご</rt></ruby>から<ruby>喫茶店<rt>きっさてん</rt></ruby>でアルバイトをしています。<br>この<ruby>喫茶店<rt>きっさてん</rt></ruby>はコーヒーもおいしい<span style='color:#d32f2f; font-weight:bold;'>し</span>、ケーキも<ruby>安<rt>やす</rt></ruby>い<span style='color:#d32f2f; font-weight:bold;'>し</span>、いつもお<ruby>客<rt>きゃく</rt></ruby>さんが<ruby>多<rt>おお</rt></ruby>いです。<br>お<ruby>客<rt>きゃく</rt></ruby>さんは<ruby>優<rt>やさ</rt></ruby>しい<span style='color:#d32f2f; font-weight:bold;'>し</span>、よく<ruby>私<rt>わたし</rt></ruby>と<ruby>話<rt>はな</rt></ruby>しますから、アルバイトをし<span style='color:#d32f2f; font-weight:bold;'>ながら</span><ruby>日本語<rt>にほんご</rt></ruby>の<ruby>練習<rt>れんしゅう</rt></ruby>ができます。<ruby>店長<rt>てんちょう</rt></ruby>もまじめだ<span style='color:#d32f2f; font-weight:bold;'>し</span>、とても<ruby>親切<rt>しんせつ</rt></ruby>な<ruby>人<rt>ひと</rt></ruby>です。<br><ruby>毎晩<rt>まいばん</rt></ruby>、<ruby>家<rt>いえ</rt></ruby>へ<ruby>帰<rt>かえ</rt></ruby>ってから、<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>き<span style='color:#d32f2f; font-weight:bold;'>ながら</span><ruby>宿題<rt>しゅくだい</rt></ruby>をします。<br><ruby>働<rt>はたら</rt></ruby>き<span style='color:#d32f2f; font-weight:bold;'>ながら</span><ruby>勉強<rt>べんきょう</rt></ruby>するのは<ruby>大変<rt>たいへん</rt></ruby>ですが、<ruby>新<rt>あたら</rt></ruby>しい<ruby>友達<rt>ともだち</rt></ruby>がたくさんできますから、<ruby>毎日<rt>まいにち</rt></ruby>とても<ruby>楽<rt>たの</rt></ruby>しいです。<br><ruby>将来<rt>しょうらい</rt></ruby>、<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>先生<rt>せんせい</rt></ruby>になりたいですから、<ruby>今<rt>いま</rt></ruby><ruby>一生懸命<rt>いっしょうけんめい</rt></ruby>がんばっています。</p>
        </div>
        <div>
            <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin-bottom: 5px;">1. 毎朝 何を しながら 何を しますか。<br><span style="font-size:0.8em; font-weight:normal; color:#666;">(Mỗi sáng vừa làm gì vừa làm gì?)</span></p>
                <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                <div class="answer-content">→ ご飯を 食べながら 日本語の ニュースを 見ます。</div>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin-bottom: 5px;">2. どうして 喫茶店は お客さんが 多いですか。<br><span style="font-size:0.8em; font-weight:normal; color:#666;">(Tại sao quán cà phê lại đông khách?)</span></p>
                <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                <div class="answer-content">→ コーヒーも おいしいし、ケーキも 安いからです。</div>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin-bottom: 5px;">3. どうして 毎日 楽しいですか。<br><span style="font-size:0.8em; font-weight:normal; color:#666;">(Tại sao mỗi ngày đều vui?)</span></p>
                <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
                <div class="answer-content">→ 新しい 友達が たくさん できるからです。</div>
            </div>
        </div>
    </div>
</div>'''

    pattern = re.compile(r'<div class="quiz-box fragment">\s*<div class="quiz-title".*?Vừa học vừa làm \(働きながら勉強します\).*?</div>.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
    pattern2 = re.compile(r'<section>(?:(?!</section>).)*?Vừa học vừa làm \(働きながら勉強します\).*?</section>', re.DOTALL)
    
    match = pattern2.search(content)
    if match:
        new_section = '<section>\n' + new_dokkai + '\n</section>'
        new_content = content[:match.start()] + new_section + content[match.end():]
        with codecs.open(file_path, 'w', 'utf-8') as f:
            f.write(new_content)
        print('Updated public/slides/bai28/nguphap.html successfully!')
    else:
        print('Could not find dokkai section in nguphap.html')
except Exception as e:
    print('Error:', e)
