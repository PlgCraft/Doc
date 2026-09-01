"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ImageOff,
  Play,
} from "lucide-react";
import Image from "next/image";

const MotionImage = motion.create(Image);

// Stable no-op subscription: we only need useSyncExternalStore for its
// client/server snapshot split (true once hydrated, false during SSR), not
// for any actual external updates.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export const ScreenshotGallery = ({
  screenshots,
  appName,
  videoUrl,
}: {
  screenshots: readonly string[];
  appName: string;
  videoUrl?: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null);

  // Portal target isn't available during SSR, and mounting only on the
  // client also keeps the portal out of any transformed/clipped ancestor
  // (e.g. the .reveal-up scroll animations) so "fixed" truly means fixed.
  const isMounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  // The demo video, when present, leads the gallery, followed by every screenshot.
  const media: MediaItem[] = videoUrl
    ? [{ type: "video", src: videoUrl }, ...screenshots.map((src) => ({ type: "image" as const, src }))]
    : screenshots.map((src) => ({ type: "image" as const, src }));

  const hasMedia = media.length > 0;
  const selected = media[selectedIndex];

  const nextMedia = () => {
    setNaturalSize(null);
    setVideoSize(null);
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setNaturalSize(null);
    setVideoSize(null);
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const closeModal = () => setIsModalOpen(false);

  // Escape to close, arrow keys to navigate, and lock body scroll while open.
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
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

  // No screenshots and no video
  if (!hasMedia) {
    return (
      <div className="relative w-full max-w-187.5 aspect-40/21 mx-auto brutalist-border brutalist-shadow overflow-hidden bg-muted/40 flex items-center justify-center">
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
      <div className="space-y-3">
        {/* Main media */}
        <motion.div
          layoutId="main-screenshot"
          className="relative w-full max-w-187.5 aspect-40/21 mx-auto brutalist-border brutalist-shadow overflow-hidden cursor-pointer bg-muted/40 flex items-center justify-center"
          onClick={() => {
            setNaturalSize(null);
            setIsModalOpen(true);
          }}
        >
          {selected.type === "video" ? (
            <video
              key={selected.src}
              src={selected.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <MotionImage
              key={selected.src}
              src={selected.src}
              alt={`${appName} screenshot ${selectedIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              priority={selectedIndex === 0}
            />
          )}

          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 hover:opacity-100 text-white font-bold bg-black px-4 py-2 flex items-center gap-2">
              {selected.type === "video" ? (
                <>
                  <Play size={16} fill="white" /> CLICK TO WATCH
                </>
              ) : (
                "CLICK TO EXPAND"
              )}
            </span>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-2 w-full max-w-187.5 mx-auto">
          {media.map((item, index) => (
            <motion.button
              key={item.src}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative shrink-0 w-40 h-24 brutalist-border overflow-hidden ${selectedIndex === index ? "ring-4 ring-red-500" : ""
                }`}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play size={14} fill="black" className="ml-0.5" />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  priority={index === 0}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
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

                {media.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevMedia();
                    }}
                    className="absolute left-1 md:left-4 z-10 text-white p-2 md:p-4 hover:bg-white/20"
                    aria-label="Previous item"
                  >
                    <ChevronLeft size={32} />
                  </button>
                )}

                {selected.type === "video" ? (
                  <motion.div
                    className="relative flex items-center justify-center"
                    style={{
                      width: videoSize ? `min(${videoSize.width}px, 90vw)` : "min(1280px, 90vw)",
                      height: videoSize ? `min(${videoSize.height}px, 80vh)` : "min(720px, 80vh)",
                    }}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                      key={selected.src}
                      src={selected.src}
                      autoPlay
                      controls
                      playsInline
                      className="w-full h-full object-contain brutalist-border bg-black"
                      onLoadedMetadata={(e) => {
                        const vid = e.currentTarget;
                        setVideoSize({ width: vid.videoWidth, height: vid.videoHeight });
                      }}
                    />
                  </motion.div>
                ) : (
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
                      key={selected.src}
                      src={selected.src}
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
                )}

                {media.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextMedia();
                    }}
                    className="absolute right-1 md:right-4 z-10 text-white p-2 md:p-4 hover:bg-white/20"
                    aria-label="Next item"
                  >
                    <ChevronRight size={32} />
                  </button>
                )}

                {media.length > 1 && (
                  <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2 max-w-full px-4">
                    {media.map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNaturalSize(null);
                          setSelectedIndex(index);
                        }}
                        aria-label={`Go to item ${index + 1}`}
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
