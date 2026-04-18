'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  name: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageSlider({ images, name, className = "", aspectRatio = "aspect-square" }: ImageSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync index on mobile scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIdx = Math.round(scrollLeft / clientWidth);
      if (newIdx !== currentIdx) setCurrentIdx(newIdx);
    }
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = currentIdx === 0 ? images.length - 1 : currentIdx - 1;
    setCurrentIdx(newIdx);
    scrollRef.current?.scrollTo({ left: newIdx * scrollRef.current.clientWidth, behavior: 'smooth' });
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = currentIdx === images.length - 1 ? 0 : currentIdx + 1;
    setCurrentIdx(newIdx);
    scrollRef.current?.scrollTo({ left: newIdx * scrollRef.current.clientWidth, behavior: 'smooth' });
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
      {/* Images container - Swipeable on mobile, static controlled on desktop */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-none transition-transform duration-500 ease-out md:transition-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        <div 
          className="flex h-full w-full md:transition-transform md:duration-500 md:ease-out"
          style={{ transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateX(-${currentIdx * 100}%)` : 'none' }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 snap-center">
              <img 
                src={img} 
                alt={`${name} - Angle ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls - Desktop Only */}
      {images.length > 1 && (
        <>
          <div className="hidden md:flex absolute inset-0 items-center justify-between p-2 opacity-0 group-hover/slider:opacity-100 transition-opacity z-20">
            <button 
              onClick={prev}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg transition-colors border border-gray-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={next}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg transition-colors border border-gray-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          {/* Progress Dots - Styled for better mobile visibility */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIdx === idx ? 'bg-primary w-4' : 'bg-primary/20 backdrop-blur-md'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
