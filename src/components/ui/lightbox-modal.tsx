"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function LightboxModal({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!open || images.length === 0) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-none bg-black/95 p-0 sm:p-2 text-white overflow-hidden flex flex-col justify-center items-center h-[90vh]">
        <DialogTitle className="sr-only">Image Gallery Preview</DialogTitle>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X className="size-6" />
        </button>

        <div className="relative w-full flex-1 flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2.5 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2.5 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>
            <div className="py-2 text-xs font-medium text-white/70">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
