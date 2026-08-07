"use client";

import { useState } from "react";
import Image from "next/image";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { Sparkles, Maximize2 } from "lucide-react";

const GALLERY_CATEGORIES = ["All", "Suites", "Dining", "Spa & Wellness", "Activities", "Resort Grounds"];

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Resort Grounds",
    title: "Infinity Pool Overlooking Mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Suites",
    title: "Presidential Horizon Villa",
  },
  {
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Suites",
    title: "Deluxe King Bedroom",
  },
  {
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Dining",
    title: "The Pavilion Tasting Room",
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Spa & Wellness",
    title: "Aromatherapy Sanctuary",
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Activities",
    title: "Private Mountain Excursions",
  },
  {
    url: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Suites",
    title: "Private Terrace Pool Suite",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Resort Grounds",
    title: "Sunset Lounge Terrace",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const filtered = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const allUrls = filtered.map((img) => img.url);

  function openLightbox(index: number) {
    setInitialIndex(index);
    setLightboxOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Visual Journey</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Resort Photo Gallery</h1>
        <p className="mt-3 text-muted-foreground font-light">Explore the architectural elegance, lush grounds, and serene spaces awaiting your arrival.</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/60 text-foreground hover:bg-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((img, idx) => (
          <div
            key={img.url + idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl cursor-pointer shadow-md bg-muted"
          >
            <Image
              src={img.url}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold mb-1">{img.category}</span>
              <h3 className="font-heading text-lg font-bold flex items-center justify-between">
                {img.title}
                <Maximize2 className="size-4 shrink-0" />
              </h3>
            </div>
          </div>
        ))}
      </div>

      <LightboxModal
        images={allUrls}
        initialIndex={initialIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
