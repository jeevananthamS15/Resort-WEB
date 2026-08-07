"use client";

import { useState } from "react";
import Image from "next/image";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { Maximize2 } from "lucide-react";

export function RoomGallery({ images, alt }: { images: { s3Key: string }[]; alt: string }) {
  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?fm=jpg&q=80&w=1600&auto=format&fit=crop";

  function imageUrl(s3Key: string): string {
    return `http://localhost:3000/dev-uploads/${s3Key}`;
  }

  const urls = images.length > 0 ? images.map((i) => imageUrl(i.s3Key)) : [FALLBACK_IMAGE];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl group shadow-md bg-muted">
        <Image
          src={urls[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 bottom-4 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white shadow-lg flex items-center gap-1.5 hover:bg-black/80 transition-colors"
        >
          <Maximize2 className="size-3.5" />
          View Full Screen ({urls.length})
        </button>
      </div>

      {urls.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {urls.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === active ? "border-primary shadow-sm scale-95" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <LightboxModal
        images={urls}
        initialIndex={active}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
