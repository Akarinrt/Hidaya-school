'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { MousePointer2, Pen, Type, Undo2, Trash2 } from 'lucide-react';

export default function WhiteboardOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<any>(null);
  
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'select' | 'pen' | 'text'>('select');
  const [color, setColor] = useState('#d32f2f');
  const [brushSize, setBrushSize] = useState(5);
  
  const undoStackRef = useRef<any[]>([]);
  const isUndoingRef = useRef(false);

  // Initialize fabric when script loads
  const initFabric = () => {
    if (!(window as any).fabric || !canvasRef.current) return;
    
    // Check if already initialized
    if (fabricCanvas) return;
    
    const canvas = new (window as any).fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      isDrawingMode: false,
      selection: true,
    });

    canvas.on('object:added', (e: any) => {
      if (isUndoingRef.current) return;
      if (e.target && (e.target.type === 'path' || e.target.type === 'i-text')) {
        undoStackRef.current.push({ type: 'added', object: e.target });
      }
    });

    canvas.on('mouse:down', (options: any) => {
      if (mode === 'text' && !options.target) {
        const pointer = canvas.getPointer(options.e);
        const text = new (window as any).fabric.IText('Nhập chữ...', {
          left: pointer.x,
          top: pointer.y,
          fontFamily: 'Plus Jakarta Sans',
          fill: color,
          fontSize: 40 * (brushSize / 5),
          lineHeight: 1.2,
          objectCaching: false
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
        
        // Auto switch to select mode
        setMode('select');
      }
    });

    setFabricCanvas(canvas);

    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };
    window.addEventListener('resize', handleResize);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Delete' || e.code === 'Backspace') {
        if (fabricCanvas) {
          const activeObjects = fabricCanvas.getActiveObjects();
          if (activeObjects.length) {
            activeObjects.forEach((obj: any) => fabricCanvas.remove(obj));
            fabricCanvas.discardActiveObject();
            fabricCanvas.requestRenderAll();
          }
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        performUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, fabricCanvas]);

  // Update canvas mode when state changes
  useEffect(() => {
    if (!fabricCanvas) return;

    if (mode === 'pen') {
      fabricCanvas.isDrawingMode = true;
      if (fabricCanvas.freeDrawingBrush) {
          fabricCanvas.freeDrawingBrush.color = color;
          fabricCanvas.freeDrawingBrush.width = brushSize;
      }
    } else {
      fabricCanvas.isDrawingMode = false;
    }
    
    if (mode === 'text') {
      fabricCanvas.defaultCursor = 'text';
    } else {
      fabricCanvas.defaultCursor = 'default';
    }
  }, [mode, fabricCanvas, color, brushSize]);

  // Update color of selected objects
  useEffect(() => {
    if (!fabricCanvas) return;
    if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = color;
        fabricCanvas.freeDrawingBrush.width = brushSize;
    }
    const activeObjects = fabricCanvas.getActiveObjects();
    activeObjects.forEach((obj: any) => {
      if (obj.type === 'i-text') obj.set('fill', color);
      else if (obj.type === 'path') obj.set('stroke', color);
    });
    fabricCanvas.requestRenderAll();
  }, [color, brushSize, fabricCanvas]);

  const performUndo = () => {
    if (!fabricCanvas) return;
    const stack = undoStackRef.current;
    if (stack.length > 0) {
      const lastAction = stack.pop();
      isUndoingRef.current = true;
      if (lastAction.type === 'added') {
        fabricCanvas.remove(lastAction.object);
      }
      isUndoingRef.current = false;
      fabricCanvas.requestRenderAll();
    }
  };

  const clearCanvas = () => {
    if (!fabricCanvas) return;
    if (window.confirm('Bạn có chắc muốn xóa sạch toàn bộ nội dung vẽ?')) {
      fabricCanvas.clear();
      undoStackRef.current = [];
    }
  };

  const colors = ['#d32f2f', '#0052cc', '#388e3c', '#fbc02d', '#222'];

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js" 
        strategy="lazyOnload"
        onLoad={initFabric}
      />
      
      {/* Canvas Layer */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99998,
          pointerEvents: isActive ? (mode !== 'select' ? 'auto' : 'none') : 'none'
        }}
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Toolbar Layer */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: 'rgba(255,255,255,0.95)',
          padding: '10px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 99999,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <button 
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) setMode('pen');
            else setMode('select');
          }}
          title="Bật/Tắt Bảng Trắng"
          style={{
            background: isActive ? '#0052cc' : '#f0f4f8',
            color: isActive ? 'white' : '#0b1f38',
            border: 'none', width: '40px', height: '40px', borderRadius: '10px', fontSize: '1.3rem', cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s'
          }}
        >
          🖍️
        </button>

        {isActive && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <button 
              onClick={() => setMode('select')}
              title="Chọn & Di chuyển"
              style={btnStyle(mode === 'select')}
            >
              <MousePointer2 size={20} />
            </button>
            <button 
              onClick={() => setMode('pen')}
              title="Bút vẽ"
              style={btnStyle(mode === 'pen')}
            >
              <Pen size={20} />
            </button>
            <button 
              onClick={() => setMode('text')}
              title="Chữ"
              style={btnStyle(mode === 'text')}
            >
              <Type size={20} />
            </button>
            <button onClick={performUndo} title="Hoàn tác" style={btnStyle(false)}>
              <Undo2 size={20} />
            </button>
            <button onClick={clearCanvas} title="Xóa tất cả" style={btnStyle(false)}>
              <Trash2 size={20} />
            </button>
            
            {/* Size & Colors */}
            <div style={{ marginTop: '5px', borderTop: '1px solid #ddd', paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <input 
                type="range" 
                min="1" max="30" 
                value={brushSize} 
                onChange={(e) => setBrushSize(parseInt(e.target.value))} 
                style={{ width: '100%', cursor: 'pointer' }}
                title="Độ lớn nét vẽ"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                {colors.map(c => (
                  <div 
                    key={c}
                    onClick={() => setColor(c)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', background: c,
                      border: color === c ? '2px solid #333' : '2px solid transparent',
                      transform: color === c ? 'scale(1.1)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const btnStyle = (active: boolean): React.CSSProperties => ({
  background: active ? '#0052cc' : '#f0f4f8',
  color: active ? 'white' : '#0b1f38',
  border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  boxShadow: active ? '0 4px 10px rgba(0,82,204,0.3)' : 'none',
  transition: 'all 0.2s'
});
