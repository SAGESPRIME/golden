'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative size-16 overflow-hidden rounded-lg border-2 transition-colors',
                activeIndex === index ? 'border-primary' : 'border-transparent',
              )}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
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
