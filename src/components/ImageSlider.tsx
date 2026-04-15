'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  name: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageSlider({ images, name, className = "", aspectRatio = "aspect-square" }: ImageSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${aspectRatio} ${className}`}>
        <span className="text-gray-400 text-xs">No image</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full group/slider overflow-hidden ${aspectRatio} ${className}`}>
      {/* Images container */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${name} - Angle ${idx + 1}`} 
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/slider:opacity-100 transition-opacity z-20">
            <button 
              onClick={prev}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={next}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          {/* Progress Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${currentIdx === idx ? 'bg-primary w-4' : 'bg-primary/30 hover:bg-primary/50'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
