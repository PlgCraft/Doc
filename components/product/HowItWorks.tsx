"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { X, ZoomIn } from "lucide-react";
import type { HowItWorks as HowItWorksData, HowItWorksImage } from "@/lib/data.type";

const ImageFrame = ({
  image,
  onExpand,
}: {
  image: HowItWorksImage;
  onExpand: (image: HowItWorksImage) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onExpand(image)}
      className="group brutalist-border brutalist-shadow-sm bg-white overflow-hidden w-full cursor-zoom-in text-left"
      style={{ maxWidth: `${image.width}px` }}
    >
      <div className="flex items-center justify-between gap-1.5 px-3 py-2 border-b-2 border-black bg-gray-50">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-black transition-colors">
          <ZoomIn size={12} />
          Enlarge
        </span>
      </div>
      <div className="relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 90vw, 800px"
          className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </button>
  );
};

const ImageLightbox = ({
  image,
  onClose,
}: {
  image: HowItWorksImage;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close enlarged image"
        className="absolute top-4 right-4 text-white p-2 hover:bg-white/20"
      >
        <X size={32} />
      </button>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="90vw"
        className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain brutalist-border bg-white"
        onClick={(e) => e.stopPropagation()}
        priority
      />
    </div>
  );
};

export const HowItWorks = ({
  data,
  accentColor,
}: {
  data: HowItWorksData;
  accentColor: string;
}) => {
  const [expandedImage, setExpandedImage] = useState<HowItWorksImage | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div
          className="text-center mb-16 reveal-up"
          style={{ ["--delay" as never]: "0ms" } as CSSProperties}
        >
          <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
            {data.eyebrow.toUpperCase()}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            {data.heading}{" "}
            <span className="text-stroke text-transparent">{data.headingAccent}</span>
          </h2>
          {data.intro && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          )}
        </div>

        <ol>
          {data.steps.map((step, index) => {
            const isLast = index === data.steps.length - 1;
            return (
              <li
                key={step.title}
                className="relative flex gap-5 md:gap-8 reveal-up"
                style={{ ["--delay" as never]: `${index * 70}ms` } as CSSProperties}
              >
                {/* Rail: number badge + connector, confined to its own
                    column so it never runs behind the step's text. */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div
                    className="relative z-10 w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-full border-4 border-black bg-white flex items-center justify-center font-mono font-black text-sm md:text-base"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div
                      className="w-[3px] flex-1 my-2 min-h-12"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-10 md:pb-12"}`}>
                  <div className="brutalist-border brutalist-shadow-sm bg-white p-6 md:p-8">
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3"
                      style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
                    >
                      {step.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
                      {step.description}
                    </p>

                    <div
                      className={
                        step.images.length > 1
                          ? "grid sm:grid-cols-2 gap-6 items-start"
                          : "flex"
                      }
                    >
                      {step.images.map((image) => (
                        <ImageFrame key={image.src} image={image} onExpand={setExpandedImage} />
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {data.closing && (
          <div
            className="text-center mt-20 reveal-up"
            style={{ ["--delay" as never]: `${data.steps.length * 70}ms` } as CSSProperties}
          >
            <h3 className="text-2xl md:text-3xl font-black mb-3">{data.closing.title}</h3>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
              {data.closing.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.closing.badges.map((badge) => (
                <span
                  key={badge}
                  className="brutalist-border bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {expandedImage && (
        <ImageLightbox image={expandedImage} onClose={() => setExpandedImage(null)} />
      )}
    </section>
  );
};
