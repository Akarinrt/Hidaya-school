// Load Fabric.js dynamically so we don't need to change template.html
function loadFabric(callback) {
    if (window.fabric) {
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

const wbCss = `
    .reveal .controls { z-index: 10001 !important; pointer-events: auto !important; }
    .wb-toolbar { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.95); padding: 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000; backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.05); }
    .wb-btn { background: #f0f4f8; border: none; width: 40px; height: 40px; border-radius: 10px; font-size: 1.3rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; color: #0b1f38; padding: 0; }
    .wb-btn:hover { background: #e0eaf5; transform: scale(1.1); }
    .wb-btn.active { background: #0052cc; color: white; box-shadow: 0 4px 10px rgba(0,82,204,0.3); }
    
    .wb-tools-container { display: none; flex-direction: column; gap: 8px; margin-top: 8px; }
    
    .wb-size-slider-container { display: flex; flex-direction: column; align-items: center; border-top: 1px solid #ddd; padding-top: 8px; margin-top: 5px; }
    .wb-size-slider-container label { font-size: 0.7rem; color: #555; margin-bottom: 3px; font-weight: bold; }
    .wb-size-slider { width: 100%; cursor: pointer; }
    
    .wb-colors { display: flex; flex-direction: column; gap: 5px; margin-top: 5px; border-top: 1px solid #ddd; padding-top: 8px; align-items: center; }
    .wb-color { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
    .wb-color.active { border: 2px solid #333; transform: scale(1.1); }
    
    .wb-slide-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none; }
    .canvas-container { pointer-events: auto !important; }
`;

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = wbCss;
    document.head.appendChild(style);

    const wbHtml = `
        <div class="wb-toolbar">
            <button class="wb-btn" id="wb-toggle" title="Bật/Tắt Bảng Trắng">🖍️</button>
            <div id="wb-tools" class="wb-tools-container">
                <button class="wb-btn" id="wb-select" title="Chọn & Di chuyển (Pointer)">🖱️</button>
                <button class="wb-btn" id="wb-pen" title="Bút vẽ">✏️</button>
                <button class="wb-btn" id="wb-text" title="Gõ chữ (Text)">T</button>
                <button class="wb-btn" id="wb-clear" title="Xóa toàn bộ trang">🗑️</button>
                
                <div class="wb-size-slider-container">
                    <label>Size</label>
                    <input type="range" id="wb-size" class="wb-size-slider" min="1" max="20" value="5">
                </div>
                
                <div class="wb-colors" id="wb-color-picker">
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

    loadFabric(() => {
        setTimeout(initWhiteboard, 1000); // Wait for Reveal.js to initialize
    });
});

let fabricCanvases = {}; // mapping slide section to fabric canvas

function initWhiteboard() {
    let isWhiteboardActive = false;
    let mode = 'none'; // 'select', 'pen', 'text'
    let currentColor = '#d32f2f';
    let currentSize = 5;
    
    // Keybinds: Delete key to remove selected objects
    document.addEventListener('keydown', (e) => {
        const navKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp'];
        if (isWhiteboardActive && navKeys.includes(e.code) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            deactivateWhiteboard();
        }
        
        if (isWhiteboardActive && (e.code === 'Delete' || e.code === 'Backspace')) {
            // Check if we're not inside an active text editing session
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            let canvas = getActiveCanvas();
            if (canvas) {
                const activeObjects = canvas.getActiveObjects();
                if (activeObjects.length) {
                    activeObjects.forEach(obj => canvas.remove(obj));
                    canvas.discardActiveObject();
                    canvas.requestRenderAll();
                }
            }
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
        
        let canvas = getActiveCanvas();
        if (canvas) {
            applyModeToCanvas(canvas);
        }
    }

    document.getElementById('wb-select').addEventListener('click', () => setMode('select', 'wb-select'));
    document.getElementById('wb-pen').addEventListener('click', () => setMode('pen', 'wb-pen'));
    document.getElementById('wb-text').addEventListener('click', () => setMode('text', 'wb-text'));
    
    document.getElementById('wb-clear').addEventListener('click', () => {
        let canvas = getActiveCanvas();
        if (canvas) {
            if (confirm('Bạn có chắc muốn xóa sạch toàn bộ nội dung vẽ trên trang này?')) {
                canvas.clear();
            }
        }
    });

    document.querySelectorAll('.wb-color').forEach(c => {
        c.addEventListener('click', (e) => {
            document.querySelectorAll('.wb-color').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentColor = e.currentTarget.dataset.color;
            updateBrushSettings();
            
            // If objects are selected, change their color
            let canvas = getActiveCanvas();
            if (canvas) {
                const activeObjects = canvas.getActiveObjects();
                activeObjects.forEach(obj => {
                    if (obj.type === 'i-text') {
                        obj.set('fill', currentColor);
                    } else if (obj.type === 'path') {
                        obj.set('stroke', currentColor);
                    }
                });
                canvas.requestRenderAll();
            }
        });
    });
    
    document.getElementById('wb-size').addEventListener('input', (e) => {
        currentSize = parseInt(e.target.value, 10);
        updateBrushSettings();
    });

    function getActiveCanvas() {
        const slide = document.querySelector('.reveal .slides section.present');
        if (!slide) return null;
        const slideId = slide.dataset.wbId;
        if (!slideId) return null;
        return fabricCanvases[slideId];
    }
    
    function updateBrushSettings() {
        let canvas = getActiveCanvas();
        if (canvas && canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = currentColor;
            canvas.freeDrawingBrush.width = currentSize;
        }
    }

    function applyModeToCanvas(canvas) {
        if (mode === 'pen') {
            canvas.isDrawingMode = true;
            updateBrushSettings();
        } else {
            canvas.isDrawingMode = false;
        }
        
        if (mode === 'text') {
            canvas.defaultCursor = 'text';
        } else if (mode === 'select') {
            canvas.defaultCursor = 'default';
        }
    }

    // --- Slide-local Layer Management ---
    function disablePointerEventsOnAllLayers() {
        document.querySelectorAll('.wb-slide-layer').forEach(layer => {
            layer.style.pointerEvents = 'none';
            // Disable pointer events on fabric wrapper
            const wrapper = layer.querySelector('.canvas-container');
            if (wrapper) wrapper.style.pointerEvents = 'none';
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
        const wrapper = layer.querySelector('.canvas-container');
        if (wrapper) wrapper.style.pointerEvents = 'auto';
        
        let canvas = getActiveCanvas();
        if (canvas) {
            applyModeToCanvas(canvas);
        }
    }

    function createLayerForSlide(slide) {
        const layer = document.createElement('div');
        layer.className = 'wb-slide-layer';
        
        // Generate a unique ID for this slide if it doesn't have one
        if (!slide.dataset.wbId) {
            slide.dataset.wbId = 'slide_' + Math.random().toString(36).substr(2, 9);
        }
        
        const canvasEl = document.createElement('canvas');
        canvasEl.id = 'canvas_' + slide.dataset.wbId;
        layer.appendChild(canvasEl);
        slide.appendChild(layer);
        
        // Initialize Fabric Canvas
        const width = slide.offsetWidth || window.innerWidth;
        const height = slide.offsetHeight || window.innerHeight;
        
        const fabricCanvas = new fabric.Canvas(canvasEl.id, {
            width: width,
            height: height,
            isDrawingMode: false,
            selection: true // enable group selection
        });
        
        fabricCanvases[slide.dataset.wbId] = fabricCanvas;
        
        // Handle text insertion
        fabricCanvas.on('mouse:down', function(options) {
            if (mode === 'text' && !options.target) {
                // Add text at click position
                const pointer = fabricCanvas.getPointer(options.e);
                const text = new fabric.IText('Nhập chữ...', {
                    left: pointer.x,
                    top: pointer.y,
                    fontFamily: 'Plus Jakarta Sans',
                    fill: currentColor,
                    fontSize: 40 * (currentSize / 5) // Scale initial font size based on slider
                });
                fabricCanvas.add(text);
                fabricCanvas.setActiveObject(text);
                text.enterEditing();
                text.selectAll();
                
                // Switch back to select mode automatically after placing text
                setMode('select', 'wb-select');
            }
        });
        
        // Fix coordinates on window resize (simple approach)
        window.addEventListener('resize', () => {
            const newWidth = slide.offsetWidth || window.innerWidth;
            const newHeight = slide.offsetHeight || window.innerHeight;
            fabricCanvas.setWidth(newWidth);
            fabricCanvas.setHeight(newHeight);
        });

        return layer;
    }

    Reveal.on('slidechanged', () => {
        if (isWhiteboardActive) {
            updateActiveSlideLayer();
        }
    });
}
