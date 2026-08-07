"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const ScreenshotGallery = ({
  screenshots,
  appName,
}: {
  screenshots: string[];
  appName: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          layoutId="main-screenshot"
          className="relative aspect-[9/16] md:aspect-video brutalist-border brutalist-shadow overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <motion.img
            key={selectedIndex}
            src={screenshots[selectedIndex]}
            alt={`${appName} screenshot ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
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
              key={index}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-24 h-40 brutalist-border overflow-hidden ${
                selectedIndex === index ? "ring-4 ring-red-500" : ""
              }`}
            >
              <img
                src={screenshot}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white p-4 hover:bg-white/20"
            >
              <ChevronLeft size={40} />
            </button>

            <motion.img
              key={selectedIndex}
              src={screenshots[selectedIndex]}
              alt={`${appName} screenshot ${selectedIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain brutalist-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white p-4 hover:bg-white/20"
            >
              <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`w-3 h-3 ${selectedIndex === index ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
