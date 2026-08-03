# TÀI LIỆU KHUNG GIAO DIỆN PREMUM (E-LEARNING DESIGN SYSTEM)

Tài liệu này tổng hợp toàn bộ các "Khối lắp ráp" (Modules) và các hàm chức năng của bộ giáo án chuẩn Premium. 
**Mục đích:** Khi bạn có nội dung văn bản thô của các bài giảng tiếp theo (Bài 27, 28...), Trợ lý AI chỉ cần gọi tên các khối này để tự động "đúc" ra slide hoàn hảo 100% mà không bao giờ bị vỡ giao diện.

---

## I. HỆ THỐNG MODULES GIAO DIỆN (UI COMPONENTS)

### 1. Slide Tiêu đề (Title Slide)
Dùng cho trang mở đầu bài giảng.
```html
<section class="title-slide">
    <h1>Tiêu đề chính (Ví dụ: Ngữ Pháp Bài 26)</h1>
    <h3>Tiêu đề phụ (Tiếng Nhật N4)</h3>
</section>
```

### 2. Khối Cấu trúc Ngữ pháp (Grammar Box)
Dùng để đóng khung công thức ngữ pháp, có đường viền xanh lam rất to bên trái.
```html
<div class="box-highlight">
    N1 は V(khẳng định) が、 N2 は V(phủ định).
</div>
```

### 3. Khối Ví dụ Ngữ pháp (Example Block)
Khung chứa câu ví dụ tiếng Nhật và câu dịch tiếng Việt (có nền trắng, viền mờ, đổ bóng nổi lên).
```html
<div class="grammar-example fragment">
    <p><strong>1. Mô tả cách dùng:</strong></p>
    <p>日本語が話せます。</p> <!-- Chữ Kanji sẽ tự động được AI gắn Furigana -->
    <span class="trans">Tôi có thể nói tiếng Nhật.</span>
</div>
```

### 4. Khối Luyện tập & Câu hỏi (Quiz Box)
Dùng cho các bài tập tương tác. Học sinh trả lời xong giáo viên bấm nút để hiện đáp án.
```html
<div class="quiz-box fragment">
    <div class="quiz-title">✍️ Dịch sang tiếng Nhật:</div>
    <div class="fragment" style="margin-bottom: 15px;">
        <p>1. Tôi không thể uống rượu.</p>
        <button class="answer-btn" onclick="toggleAnswer(this)">Xem đáp án</button>
        <div class="answer-content">→ お酒が飲めません。</div>
    </div>
</div>
```

### 5. Khối Thẻ Kanji 3D (Flashcard Kanji)
Dùng bên file `kanji.html`. Dạng thẻ bồng bềnh, hover vào sẽ nổi lên.
```html
<div class="kanji-grid">
    <div class="kanji-card fragment">
        <div class="kanji-char-box" onclick='showModal("悪", "Ác", "<p>Phân tích bộ thủ...</p>")'>
            <div class="kanji-svg-container"><span>悪</span></div>
            <div class="kanji-meaning">Ác</div>
        </div>
        <div class="kanji-details">
            <div class="kanji-reading">
                <span class="badge on">ON</span> アク <br>
                <span class="badge kun">KUN</span> わる(い)
            </div>
            <div class="kanji-ex">悪い (Xấu xa)</div>
        </div>
    </div>
</div>
```

---

## II. HỆ THỐNG CÁC HÀM TỰ ĐỘNG (JAVASCRIPT LOGIC)

Đây là các thuật toán tự động chạy ngầm, AI không cần phải code lại cho từng bài:

1. **Hệ thống Auto-Furigana (`furiganaDict`):**
   - **Cơ chế:** Mọi chữ Hán trong bài sẽ được quét và tự động cõng phiên âm (Furigana) trên đầu.
   - **Ứng dụng:** Trợ lý AI chỉ cần viết `furiganaDict = {"富士山": "<ruby>富士山<rt>ふじさん</rt></ruby>"}` ở cuối file. Trong các thẻ `<p>`, chỉ cần viết chữ Hán bình thường `富士山`, không cần viết mã `<ruby>` lằng nhằng rắc rối.

2. **Hộp Từ Vựng Thông Minh (`vocabDict` & Draggable):**
   - **Cơ chế:** Khi chuyển sang slide nào, hộp từ vựng bên phải màn hình sẽ tự quét các chữ trong slide đó và chỉ hiện nghĩa của đúng những từ xuất hiện trên màn hình. Hộp này có thể dùng chuột kéo thả đi chỗ khác nếu bị che mất nội dung.
   - **Ứng dụng:** Trợ lý AI chỉ cần cung cấp `vocabDict = {"富士山": "Núi Phú Sĩ"}` ở cuối file.

3. **Bảng Trắng Tương Tác (`whiteboard.js`):**
   - Tính năng Bút vẽ màu (Pen), Tẩy (Eraser), Gõ chữ (Text) và Undo. Tự động lưu theo từng trang slide độc lập. Đã được modul hóa ra file riêng, không bao giờ cần động vào code HTML nữa.

4. **Nút Toàn màn hình (Fullscreen):**
   - Hàm `toggleFullScreen()` tích hợp ở góc trái dưới cùng.

> [!TIP]
> **Hướng dẫn Trợ lý AI (Prompt cho các bài sau):**
> 
> Lần tới khi cần làm bài mới, bạn chỉ cần ném nội dung thô (Word/PDF) cho tôi và ra lệnh: 
> *"Hãy soạn bài Ngữ pháp 28 theo đúng cấu trúc của file **Slide_Framework_Premium.md** trong thư mục Template, nhớ tạo đủ các khối grammar-example, quiz-box và cung cấp furiganaDict/vocabDict ở cuối file."* 
> 
> Tôi sẽ tự động lắp ráp nội dung vào đúng các khối này, tạo ra file HTML hoàn hảo chỉ trong 1 nốt nhạc!
