
const wbCss = `
    .reveal .controls { z-index: 10001 !important; pointer-events: auto !important; }
    .wb-toolbar { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.95); padding: 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000; backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.05); }
    .wb-btn { background: #f0f4f8; border: none; width: 40px; height: 40px; border-radius: 10px; font-size: 1.3rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; color: #0b1f38; padding: 0; }
    .wb-btn:hover { background: #e0eaf5; transform: scale(1.1); }
    .wb-btn.active { background: #0052cc; color: white; box-shadow: 0 4px 10px rgba(0,82,204,0.3); }
    .wb-colors { display: none; flex-direction: column; gap: 5px; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px; align-items: center; }
    .wb-color { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
    .wb-color.active { border: 2px solid #333; transform: scale(1.1); }
    #wb-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none; }
    #wb-text-layer { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; pointer-events: none; overflow: hidden; }
    .wb-text-input { position: absolute; background: rgba(255,255,255,0.9); border: 2px dashed #0052cc; outline: none; font-size: 2rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: bold; pointer-events: auto; padding: 5px 10px; border-radius: 5px; min-width: 150px; z-index: 10000; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .wb-text-box { position: absolute; font-size: 2rem; font-weight: bold; font-family: 'Plus Jakarta Sans', sans-serif; pointer-events: auto; cursor: pointer; padding: 5px 10px; border: 1px solid transparent; border-radius: 5px; background: transparent; }
    .wb-text-box:hover { border: 1px dashed #aaa; background: rgba(255,255,255,0.5); }
    .wb-text-box::after { content: " (Click phải để xóa)"; font-size: 0.8rem; color: #999; opacity: 0; transition: opacity 0.2s; position:absolute; top:-20px; left:0; white-space:nowrap; }
    .wb-text-box:hover::after { opacity: 1; }
`;

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = wbCss;
    document.head.appendChild(style);

    const wbHtml = `
        <div id="wb-text-layer"></div>
        <canvas id="wb-canvas"></canvas>
        <div class="wb-toolbar">
            <button class="wb-btn" id="wb-toggle" title="Bật/Tắt Bảng Trắng">🖍️</button>
            <div id="wb-tools" style="display:none; flex-direction:column; gap:8px; margin-top:8px;">
                <button class="wb-btn" id="wb-pen" title="Bút vẽ">✏️</button>
                <button class="wb-btn" id="wb-eraser" title="Tẩy nét">🧽</button>
                <button class="wb-btn" id="wb-text" title="Gõ chữ">T</button>
                <button class="wb-btn" id="wb-undo" title="Undo (Hoàn tác)">↩️</button>
                <button class="wb-btn" id="wb-clear" title="Xóa toàn bộ trang">🗑️</button>
                <div class="wb-colors" id="wb-color-picker" style="display:flex;">
                    <div class="wb-color active" style="background:#d32f2f;" data-color="#d32f2f"></div>
                    <div class="wb-color" style="background:#0052cc;" data-color="#0052cc"></div>
                    <div class="wb-color" style="background:#388e3c;" data-color="#388e3c"></div>
                    <div class="wb-color" style="background:#fbc02d;" data-color="#fbc02d"></div>
                    <div class="wb-color" style="background:#222;" data-color="#222"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', wbHtml);

    initWhiteboard();
});

function initWhiteboard() {
    const canvas = document.getElementById('wb-canvas');
    const ctx = canvas.getContext('2d');
    const textLayer = document.getElementById('wb-text-layer');
    
    let isDrawing = false;
    let mode = 'none'; // 'pen', 'eraser', 'text'
    let currentColor = '#d32f2f';
    let isWhiteboardActive = false;
    
    let undoStack = []; // stores data URLs

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        loadSlideData();
    }
    window.addEventListener('resize', resize);
    resize();
    
    function saveStateForUndo() {
        undoStack.push(canvas.toDataURL());
        if(undoStack.length > 20) undoStack.shift(); // limit history
        saveSlideData();
    }

    // Turn off whiteboard helper
    function deactivateWhiteboard() {
        if (!isWhiteboardActive) return;
        isWhiteboardActive = false;
        mode = 'none';
        canvas.style.pointerEvents = 'none';
        textLayer.style.pointerEvents = 'none';
        document.getElementById('wb-tools').style.display = 'none';
        document.querySelectorAll('.wb-btn').forEach(b => b.classList.remove('active'));
    }

    // Auto turn off when navigating
    document.addEventListener('keydown', (e) => {
        const navKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Space', 'PageDown', 'PageUp'];
        if (isWhiteboardActive && navKeys.includes(e.code) && e.target.tagName !== 'INPUT') {
            deactivateWhiteboard();
            // Allow event to propagate to Reveal.js
        }
    });

    document.getElementById('wb-toggle').addEventListener('click', (e) => {
        if (isWhiteboardActive) {
            deactivateWhiteboard();
        } else {
            isWhiteboardActive = true;
            e.currentTarget.classList.add('active');
            document.getElementById('wb-tools').style.display = 'flex';
            document.getElementById('wb-pen').click();
            textLayer.style.pointerEvents = 'auto'; // allow text clicks
        }
    });

    function setMode(newMode, btnId) {
        mode = newMode;
        document.querySelectorAll('.wb-btn').forEach(b => {
            if(b.id !== 'wb-toggle') b.classList.remove('active');
        });
        document.getElementById(btnId).classList.add('active');
        
        if (mode === 'pen' || mode === 'eraser') {
            canvas.style.pointerEvents = 'auto';
            textLayer.style.pointerEvents = 'none'; // click goes to canvas
            document.getElementById('wb-color-picker').style.display = (mode === 'pen') ? 'flex' : 'none';
        } else if (mode === 'text') {
            canvas.style.pointerEvents = 'none';
            textLayer.style.pointerEvents = 'auto'; // click goes to text layer
            document.getElementById('wb-color-picker').style.display = 'flex';
        }
    }

    document.getElementById('wb-pen').addEventListener('click', () => setMode('pen', 'wb-pen'));
    document.getElementById('wb-eraser').addEventListener('click', () => setMode('eraser', 'wb-eraser'));
    document.getElementById('wb-text').addEventListener('click', () => setMode('text', 'wb-text'));

    document.getElementById('wb-undo').addEventListener('click', () => {
        if (undoStack.length > 0) {
            const lastState = undoStack.pop();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // If we popped the last state, we need to show the state *before* it.
            // Actually, undo stack contains states *including* the current one if we save after drawing.
            // Better logic: undoStack stores previous states.
            
            if (undoStack.length > 0) {
                const img = new Image();
                img.onload = () => ctx.drawImage(img, 0, 0);
                img.src = undoStack[undoStack.length - 1];
            }
            saveSlideData(); // sync to session
        }
    });

    document.getElementById('wb-clear').addEventListener('click', () => {
        saveStateForUndo(); // save before clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textLayer.innerHTML = '';
        saveSlideData();
    });

    document.querySelectorAll('.wb-color').forEach(c => {
        c.addEventListener('click', (e) => {
            document.querySelectorAll('.wb-color').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentColor = e.currentTarget.dataset.color;
        });
    });

    // Drawing Logic
    canvas.addEventListener('mousedown', startPos);
    canvas.addEventListener('mouseup', endPos);
    canvas.addEventListener('mousemove', draw);
    
    // For touch devices
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPos(e.touches[0]); }, {passive: false});
    canvas.addEventListener('touchend', (e) => { e.preventDefault(); endPos(); }, {passive: false});
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); }, {passive: false});

    function startPos(e) {
        if (mode === 'pen' || mode === 'eraser') {
            isDrawing = true;
            if (undoStack.length === 0) {
                undoStack.push(canvas.toDataURL()); // push initial blank state
            }
            draw(e);
        }
    }

    function endPos() {
        if (isDrawing) {
            isDrawing = false;
            ctx.beginPath();
            saveStateForUndo();
        }
    }

    function draw(e) {
        if (!isDrawing) return;
        
        ctx.lineWidth = mode === 'eraser' ? 30 : 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (mode === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)'; // color doesn't matter for destination-out
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
        }
        
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    // Text Logic
    textLayer.addEventListener('mousedown', (e) => {
        if (mode === 'text' && e.target === textLayer) {
            createTextInput(e.clientX, e.clientY);
        }
    });

    function createTextInput(x, y) {
        // If an input already exists, focus it instead of making a new one
        if (textLayer.querySelector('.wb-text-input')) {
            textLayer.querySelector('.wb-text-input').focus();
            return;
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'wb-text-input';
        input.style.left = x + 'px';
        input.style.top = y + 'px';
        input.style.color = currentColor;
        input.placeholder = "Gõ chữ...";
        textLayer.appendChild(input);
        
        setTimeout(() => input.focus(), 50); // delay focus to avoid instant blur

        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                const div = document.createElement('div');
                div.className = 'wb-text-box';
                div.style.left = input.style.left;
                div.style.top = input.style.top;
                div.style.color = input.style.color;
                div.innerText = input.value;
                
                div.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    div.remove();
                    saveSlideData();
                });
                
                textLayer.appendChild(div);
            }
            input.remove();
            saveSlideData();
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
        });
    }

    // Storage Logic per Slide
    function getSlideId() {
        const indices = Reveal.getIndices();
        return `slide_${indices.h}_${indices.v}`;
    }

    function saveSlideData() {
        const id = getSlideId();
        const data = {
            image: canvas.toDataURL(),
            texts: textLayer.innerHTML
        };
        sessionStorage.setItem(id, JSON.stringify(data));
    }

    function loadSlideData() {
        const id = getSlideId();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textLayer.innerHTML = '';
        undoStack = [];
        
        const stored = sessionStorage.getItem(id);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.image) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    undoStack.push(canvas.toDataURL());
                };
                img.src = data.image;
            } else {
                undoStack.push(canvas.toDataURL());
            }
            if (data.texts) {
                textLayer.innerHTML = data.texts;
                textLayer.querySelectorAll('.wb-text-box').forEach(div => {
                    div.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        div.remove();
                        saveSlideData();
                    });
                });
            }
        } else {
            undoStack.push(canvas.toDataURL());
        }
    }

    Reveal.on('slidechanged', () => {
        loadSlideData();
    });
}
