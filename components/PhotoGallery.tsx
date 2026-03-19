'use client';

import { useState, useCallback } from 'react';
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
 * Interactive photo gallery with main image and thumbnail strip.
 */
export default function PhotoGallery({ photos, vehicleName }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = photos[currentIndex];
  const total = photos.length;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : total - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
  }, [total]);

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
      <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden">
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

        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold">
          {currentIndex + 1} / {total}
        </div>

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
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
    </div>
  );
}
