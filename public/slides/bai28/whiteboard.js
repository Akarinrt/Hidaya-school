
const wbCss = `
    .reveal .controls { z-index: 10001 !important; pointer-events: auto !important; }
    .wb-toolbar { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.95); padding: 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000; backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.05); }
    .wb-btn { background: #f0f4f8; border: none; width: 40px; height: 40px; border-radius: 10px; font-size: 1.3rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; color: #0b1f38; padding: 0; }
    .wb-btn:hover { background: #e0eaf5; transform: scale(1.1); }
    .wb-btn.active { background: #0052cc; color: white; box-shadow: 0 4px 10px rgba(0,82,204,0.3); }
    .wb-colors { display: none; flex-direction: column; gap: 5px; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px; align-items: center; }
    .wb-color { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
    .wb-color.active { border: 2px solid #333; transform: scale(1.1); }
    
    .wb-slide-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none; }
    .wb-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: auto; }
    .wb-text-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; }
    
    .wb-text-input { position: absolute; background: rgba(255,255,255,0.9); border: 2px dashed #0052cc; outline: none; font-size: 2rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: bold; pointer-events: auto; padding: 5px 10px; border-radius: 5px; min-width: 150px; z-index: 10000; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .wb-text-box { position: absolute; font-size: 2rem; font-weight: bold; font-family: 'Plus Jakarta Sans', sans-serif; pointer-events: auto; cursor: move; padding: 5px 10px; border: 1px solid transparent; border-radius: 5px; background: transparent; user-select: none; }
    .wb-text-box:hover { border: 1px dashed #aaa; background: rgba(255,255,255,0.5); }
    .wb-text-box::after { content: " (Nháy đúp: Sửa | Cuộn: Chỉnh size | Chuột phải: Xóa)"; font-size: 0.8rem; color: #999; opacity: 0; transition: opacity 0.2s; position:absolute; top:-25px; left:0; white-space:nowrap; pointer-events:none; }
    .wb-text-box:hover::after { opacity: 1; }
    .wb-text-box.dragging { opacity: 0.8; border: 1px dashed #0052cc; cursor: grabbing; }
    
    @media print {
        .wb-text-box::after { display: none !important; }
        .wb-text-box { border: none !important; background: transparent !important; }
    }
`;

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = wbCss;
    document.head.appendChild(style);

    const wbHtml = `
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

    // Don't initialize whiteboard tools if in print mode
    if (window.location.search.match(/print-pdf/gi)) {
        document.querySelector('.wb-toolbar').style.display = 'none';
        return;
    }

    setTimeout(initWhiteboard, 1000); // Wait for Reveal.js to initialize
});

function initWhiteboard() {
    let isWhiteboardActive = false;
    let mode = 'none';
    let currentColor = '#d32f2f';
    let isDrawing = false;
    
    // Auto turn off when navigating
    document.addEventListener('keydown', (e) => {
        const navKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Space', 'PageDown', 'PageUp'];
        if (isWhiteboardActive && navKeys.includes(e.code) && e.target.tagName !== 'INPUT') {
            deactivateWhiteboard();
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
            updateActiveSlideLayer();
        }
    });

    function deactivateWhiteboard() {
        if (!isWhiteboardActive) return;
        isWhiteboardActive = false;
        mode = 'none';
        document.getElementById('wb-tools').style.display = 'none';
        document.querySelectorAll('.wb-btn').forEach(b => b.classList.remove('active'));
        disablePointerEventsOnAllLayers();
    }

    function setMode(newMode, btnId) {
        mode = newMode;
        document.querySelectorAll('.wb-btn').forEach(b => {
            if(b.id !== 'wb-toggle') b.classList.remove('active');
        });
        document.getElementById(btnId).classList.add('active');
        
        if (mode === 'pen' || mode === 'eraser') {
            document.getElementById('wb-color-picker').style.display = (mode === 'pen') ? 'flex' : 'none';
        } else if (mode === 'text') {
            document.getElementById('wb-color-picker').style.display = 'flex';
        }
        updateActiveSlideLayer();
    }

    document.getElementById('wb-pen').addEventListener('click', () => setMode('pen', 'wb-pen'));
    document.getElementById('wb-eraser').addEventListener('click', () => setMode('eraser', 'wb-eraser'));
    document.getElementById('wb-text').addEventListener('click', () => setMode('text', 'wb-text'));

    document.querySelectorAll('.wb-color').forEach(c => {
        c.addEventListener('click', (e) => {
            document.querySelectorAll('.wb-color').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentColor = e.currentTarget.dataset.color;
        });
    });

    // --- Slide-local Layer Management ---
    function disablePointerEventsOnAllLayers() {
        document.querySelectorAll('.wb-slide-layer').forEach(layer => {
            layer.style.pointerEvents = 'none';
            layer.querySelector('.wb-canvas').style.pointerEvents = 'none';
            layer.querySelector('.wb-text-layer').style.pointerEvents = 'none';
        });
    }

    function updateActiveSlideLayer() {
        disablePointerEventsOnAllLayers();
        if (!isWhiteboardActive) return;

        const slide = document.querySelector('.reveal .slides section.present');
        if (!slide) return;

        let layer = slide.querySelector('.wb-slide-layer');
        if (!layer) {
            layer = createLayerForSlide(slide);
        }

        layer.style.pointerEvents = 'auto';
        if (mode === 'pen' || mode === 'eraser') {
            layer.querySelector('.wb-canvas').style.pointerEvents = 'auto';
            layer.querySelector('.wb-text-layer').style.pointerEvents = 'none';
        } else if (mode === 'text') {
            layer.querySelector('.wb-canvas').style.pointerEvents = 'none';
            layer.querySelector('.wb-text-layer').style.pointerEvents = 'auto';
        }
    }

    Reveal.on('slidechanged', () => {
        if (isWhiteboardActive) {
            updateActiveSlideLayer();
        }
    });

    function createLayerForSlide(slide) {
        // Find actual dimensions of slide. Default to 960x700 or whatever reveal config is.
        const config = Reveal.getConfig();
        const width = config.width || 1400;
        const height = config.height || 900;

        const layer = document.createElement('div');
        layer.className = 'wb-slide-layer';
        
        const canvas = document.createElement('canvas');
        canvas.className = 'wb-canvas';
        canvas.width = width;
        canvas.height = height;
        
        const textLayer = document.createElement('div');
        textLayer.className = 'wb-text-layer';

        layer.appendChild(canvas);
        layer.appendChild(textLayer);
        slide.appendChild(layer);

        // Attach drawing events to canvas
        const ctx = canvas.getContext('2d');
        let undoStack = [];
        
        // Attach undo and clear specifically to current layer via closure?
        // Since buttons are global, we override their onclick
        document.getElementById('wb-undo').onclick = () => {
            if (undoStack.length > 0) {
                undoStack.pop();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (undoStack.length > 0) {
                    const img = new Image();
                    img.onload = () => ctx.drawImage(img, 0, 0);
                    img.src = undoStack[undoStack.length - 1];
                }
            }
        };

        document.getElementById('wb-clear').onclick = () => {
            undoStack.push(canvas.toDataURL());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            textLayer.innerHTML = '';
        };

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const scale = Reveal.getScale();
            let clientX = e.clientX;
            let clientY = e.clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }
            return {
                x: (clientX - rect.left) / scale,
                y: (clientY - rect.top) / scale
            };
        }

        function startPos(e) {
            if (mode === 'pen' || mode === 'eraser') {
                isDrawing = true;
                if (undoStack.length === 0) {
                    undoStack.push(canvas.toDataURL());
                }
                draw(e);
            }
        }

        function endPos() {
            if (isDrawing) {
                isDrawing = false;
                ctx.beginPath();
                undoStack.push(canvas.toDataURL());
            }
        }

        function draw(e) {
            if (!isDrawing) return;
            const pos = getMousePos(e);
            
            ctx.lineWidth = mode === 'eraser' ? 30 : 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            if (mode === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = currentColor;
            }
            
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        canvas.addEventListener('mousedown', startPos);
        canvas.addEventListener('mouseup', endPos);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPos(e); }, {passive: false});
        canvas.addEventListener('touchend', (e) => { e.preventDefault(); endPos(); }, {passive: false});
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, {passive: false});

        // Attach text events
        textLayer.addEventListener('mousedown', (e) => {
            if (mode === 'text' && e.target === textLayer) {
                const pos = getMousePos(e);
                createTextInput(pos.x, pos.y, null, textLayer);
            }
        });
        
        // Return the created layer
        return layer;
    }

    function createTextInput(x, y, existingDiv, textLayer) {
        if (textLayer.querySelector('.wb-text-input')) {
            textLayer.querySelector('.wb-text-input').focus();
            return;
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'wb-text-input';
        
        if (existingDiv) {
            input.style.left = existingDiv.style.left;
            input.style.top = existingDiv.style.top;
            input.style.color = existingDiv.style.color;
            input.style.fontSize = existingDiv.style.fontSize || '2rem';
            input.value = existingDiv.innerText;
            existingDiv.style.display = 'none';
        } else {
            input.style.left = x + 'px';
            input.style.top = y + 'px';
            input.style.color = currentColor;
            input.style.fontSize = '2rem';
        }
        
        input.placeholder = "Gõ chữ...";
        textLayer.appendChild(input);
        setTimeout(() => input.focus(), 50);

        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                let div = existingDiv;
                if (!div) {
                    div = document.createElement('div');
                    div.className = 'wb-text-box';
                    textLayer.appendChild(div);
                    attachTextBoxEvents(div, textLayer);
                }
                div.style.display = 'block';
                div.style.left = input.style.left;
                div.style.top = input.style.top;
                div.style.color = input.style.color;
                div.style.fontSize = input.style.fontSize;
                div.innerText = input.value;
            } else if (existingDiv) {
                existingDiv.remove();
            }
            input.remove();
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
        });
    }

    function attachTextBoxEvents(div, textLayer) {
        div.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            div.remove();
        });
        
        div.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            createTextInput(0, 0, div, textLayer);
        });

        div.addEventListener('wheel', (e) => {
            if (mode !== 'text') return;
            e.preventDefault();
            let size = parseFloat(div.style.fontSize) || 2;
            if (e.deltaY < 0) size += 0.2;
            else size = Math.max(0.5, size - 0.2);
            div.style.fontSize = size + 'rem';
        });

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        const getMousePos = (e) => {
            const rect = textLayer.getBoundingClientRect();
            const scale = Reveal.getScale();
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;
            return {
                x: (clientX - rect.left) / scale,
                y: (clientY - rect.top) / scale
            };
        };

        const onMouseDown = (e) => {
            if (mode !== 'text') return;
            isDragging = true;
            const pos = getMousePos(e);
            startX = pos.x;
            startY = pos.y;
            initialLeft = parseFloat(div.style.left) || 0;
            initialTop = parseFloat(div.style.top) || 0;
            div.classList.add('dragging');
            e.stopPropagation();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const pos = getMousePos(e);
            let dx = pos.x - startX;
            let dy = pos.y - startY;
            div.style.left = (initialLeft + dx) + 'px';
            div.style.top = (initialTop + dy) + 'px';
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                div.classList.remove('dragging');
            }
        };

        div.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        div.addEventListener('touchstart', onMouseDown, {passive: false});
        window.addEventListener('touchmove', onMouseMove, {passive: false});
        window.addEventListener('touchend', onMouseUp);
    }
}
