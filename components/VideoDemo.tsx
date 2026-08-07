"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

export const VideoDemo = ({ videoUrl, appName }: { videoUrl: string; appName: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative">
      {!isPlaying ? (
        <motion.div
          className="relative aspect-video bg-black brutalist-border brutalist-shadow overflow-hidden cursor-pointer group"
          onClick={() => setIsPlaying(true)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <motion.div
                className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
              >
                <Play size={40} fill="white" />
              </motion.div>
              <span className="font-bold text-xl">WATCH DEMO</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      ) : (
        <div className="relative aspect-video brutalist-border brutalist-shadow overflow-hidden">
          <iframe
            src={`${videoUrl}?autoplay=1`}
            title={`${appName} demo video`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 bg-black text-white p-2"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
