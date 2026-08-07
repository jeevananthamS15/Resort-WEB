"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE, imageUrl } from "./RoomCard";
import type { RoomImage } from "@/types/backend";

export function RoomGallery({ images, alt }: { images: RoomImage[]; alt: string }) {
  const urls = images.length > 0 ? images.map((i) => imageUrl(i.s3Key)) : [FALLBACK_IMAGE];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-16/10 overflow-hidden rounded-xl">
        <Image
          src={urls[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      {urls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {urls.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                i === active ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
