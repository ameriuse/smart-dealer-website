'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Photo {
  url: string;
  label?: string | null;
}

interface PhotoGalleryProps {
  photos: Photo[];
  vehicleName: string;
}

/**
 * Interactive photo gallery with main image, thumbnail strip, and full-screen lightbox.
 */
export default function PhotoGallery({ photos, vehicleName }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = photos.length;
  const current = photos[currentIndex];

  const goTo = useCallback((index: number) => setCurrentIndex(index), []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : total - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
  }, [total]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, goPrev, goNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  if (total === 0) {
    return (
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
        <span className="text-6xl">🚗</span>
        <p className="text-sm text-gray-400 mt-3">No photos available</p>
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* Main Image */}
      <div
        className="relative aspect-[16/9] bg-gray-900 overflow-hidden cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        {current ? (
          <Image
            src={current.url}
            alt={current.label ?? `${vehicleName} photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🚗</span>
          </div>
        )}

        {/* Expand icon */}
        <div className="absolute top-3 right-14 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </div>

        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold">
          {currentIndex + 1} / {total}
        </div>

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {total > 1 && (
        <div className="thumb-strip flex gap-2 overflow-x-auto p-3 bg-gray-900">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                idx === currentIndex
                  ? 'border-white opacity-100 ring-2 ring-blue-400'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={photo.url}
                alt={photo.label ?? `${vehicleName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/60 text-sm font-medium">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image */}
          <div
            className="flex-1 relative min-h-0 mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            {current && (
              <Image
                src={current.url}
                alt={current.label ?? `${vehicleName} photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}
          </div>

          {/* Lightbox nav arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Lightbox thumbnail strip */}
          {total > 1 && (
            <div
              className="shrink-0 flex gap-2 overflow-x-auto px-4 py-3 justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`relative shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                    idx === currentIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Photo ${idx + 1}`}
                >
                  <Image
                    src={photo.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
