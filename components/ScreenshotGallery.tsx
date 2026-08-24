"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ImageOff,
} from "lucide-react";
import Image from "next/image";

const MotionImage = motion(Image);

export const ScreenshotGallery = ({
  screenshots,
  appName,
}: {
  screenshots: readonly string[];
  appName: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Portal target isn't available during SSR, and mounting only on the
  // client also keeps the portal out of any transformed/clipped ancestor
  // (e.g. the .reveal-up scroll animations) so "fixed" truly means fixed.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasScreenshots = screenshots.length > 0;

  const nextImage = () => {
    setNaturalSize(null);
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setNaturalSize(null);
    setSelectedIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  const closeModal = () => setIsModalOpen(false);

  // Escape to close, arrow keys to navigate, and lock body scroll while open.
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // No screenshots
  if (!hasScreenshots) {
    return (
      <div className="relative aspect-9/16 md:aspect-video brutalist-border brutalist-shadow overflow-hidden bg-muted/40 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
          <div className="w-20 h-20 brutalist-border bg-background flex items-center justify-center">
            <ImageOff
              size={40}
              strokeWidth={2}
              className="text-muted-foreground"
            />
          </div>

          <div>
            <p className="font-black text-lg uppercase tracking-tight">
              No screenshots yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Screenshots for {appName} are coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          layoutId="main-screenshot"
          className="relative aspect-9/16 md:aspect-video brutalist-border brutalist-shadow overflow-hidden cursor-pointer"
          onClick={() => {
            setNaturalSize(null);
            setIsModalOpen(true);
          }}
        >
          <MotionImage
            key={screenshots[selectedIndex]}
            src={screenshots[selectedIndex]}
            alt={`${appName} screenshot ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            priority={selectedIndex === 0}
          />

          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 hover:opacity-100 text-white font-bold bg-black px-4 py-2">
              CLICK TO EXPAND
            </span>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <motion.button
              key={screenshot}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative shrink-0 w-40 h-24 brutalist-border overflow-hidden ${selectedIndex === index ? "ring-4 ring-red-500" : ""
                }`}
            >
              <Image
                src={screenshot}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal, portaled to <body> so it's never clipped or mispositioned by
          a transformed/overflow-hidden ancestor like the hero's .reveal-up */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 md:p-10"
                onClick={closeModal}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 text-white p-2 hover:bg-white/20"
                  aria-label="Close gallery"
                >
                  <X size={28} />
                </button>

                {screenshots.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-1 md:left-4 z-10 text-white p-2 md:p-4 hover:bg-white/20"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={32} />
                  </button>
                )}

                <motion.div
                  className="relative flex items-center justify-center"
                  style={{
                    width: naturalSize ? `min(${naturalSize.width}px, 90vw)` : "90vw",
                    height: naturalSize ? `min(${naturalSize.height}px, 80vh)` : "80vh",
                  }}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    key={screenshots[selectedIndex]}
                    src={screenshots[selectedIndex]}
                    alt={`${appName} screenshot ${selectedIndex + 1}`}
                    fill
                    sizes="90vw"
                    quality={95}
                    className="object-contain brutalist-border bg-white"
                    priority
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
                    }}
                  />
                </motion.div>

                {screenshots.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-1 md:right-4 z-10 text-white p-2 md:p-4 hover:bg-white/20"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={32} />
                  </button>
                )}

                {screenshots.length > 1 && (
                  <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2 max-w-full px-4">
                    {screenshots.map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNaturalSize(null);
                          setSelectedIndex(index);
                        }}
                        aria-label={`Go to screenshot ${index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${selectedIndex === index
                            ? "bg-white"
                            : "bg-white/40"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
