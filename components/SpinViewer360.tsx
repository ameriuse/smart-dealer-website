'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface SpinFrame {
  url: string;
  frameIndex: number;
}

interface SpinViewer360Props {
  frames: SpinFrame[];
  vehicleName: string;
}

/**
 * 360° exterior spin viewer — drag left/right to rotate, or use auto-spin.
 */
export default function SpinViewer360({ frames, vehicleName }: SpinViewer360Props) {
  const sorted = [...frames].sort((a, b) => a.frameIndex - b.frameIndex);
  const total = sorted.length;

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const dragFrameStart = useRef(0);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrentFrame((f) => (f + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(advance, 80);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, advance]);

  const handleDragStart = useCallback((clientX: number) => {
    if (isPlaying) setIsPlaying(false);
    dragStartX.current = clientX;
    dragFrameStart.current = currentFrame;
  }, [isPlaying, currentFrame]);

  const handleDragMove = useCallback((clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    // full 360 spin over ~300px of drag
    const framesPerPx = total / 300;
    const frameDelta = Math.round(delta * framesPerPx);
    const newFrame = ((dragFrameStart.current - frameDelta) % total + total) % total;
    setCurrentFrame(newFrame);
  }, [total]);

  const handleDragEnd = useCallback(() => {
    dragStartX.current = null;
  }, []);

  const currentUrl = sorted[currentFrame]?.url;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">360° Exterior View</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {total} frames
          </span>
        </div>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          {isPlaying ? (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Auto-Spin
            </>
          )}
        </button>
      </div>

      {/* Viewer */}
      <div
        className="relative aspect-[16/9] bg-gray-950 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => { if (dragStartX.current !== null) handleDragMove(e.clientX); }}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); handleDragMove(e.touches[0].clientX); }}
        onTouchEnd={handleDragEnd}
      >
        {currentUrl && (
          <Image
            src={currentUrl}
            alt={`${vehicleName} 360° view frame ${currentFrame + 1}`}
            fill
            className="object-contain pointer-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            priority={currentFrame === 0}
            draggable={false}
          />
        )}

        {/* 360° badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-xs font-bold">360°</span>
        </div>

        {/* Drag hint — fades after first interaction via pointer-events-none */}
        {!isPlaying && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-medium pointer-events-none">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            Drag to rotate
          </div>
        )}

        {/* Frame dot indicators (shown when ≤36 frames) */}
        {total <= 36 && (
          <div className="absolute bottom-3 right-3 flex gap-0.5">
            {sorted.map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-all ${
                  idx === currentFrame
                    ? 'w-2 h-2 bg-white'
                    : 'w-1.5 h-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
