"use client";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484417894907-623942c8ea29?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=600&auto=format&fit=crop",
];

const InfiniteScrollRow = ({
  images,
  direction = "left",
  onImageClick,
}: any) => {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: { ease: "linear", duration: 35, repeat: Infinity },
    });
  }, [controls, direction]);

  return (
    <div
      className="relative w-full overflow-hidden py-12"
      style={{
        perspective: "1000px",
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div
        className="flex space-x-6 px-4"
        animate={controls}
        style={{
          transformStyle: "preserve-3d",
          rotateY: direction === "left" ? "5deg" : "-5deg",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, translateZ: "50px" }}
            className="flex-shrink-0 w-80 h-56 relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-yellow-400/50 transition-all duration-300"
            onClick={() => onImageClick(src)}
          >
            <Image
              src={src}
              alt="Gallery"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function GallerySection({
  onImageClick,
}: {
  onImageClick: (src: string) => void;
}) {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-custom tracking-tighter">
          Photo <span className="text-yellow-400">Gallery</span>
        </h2>
      </div>
      <div className="space-y-[-2rem]">
        <InfiniteScrollRow
          images={galleryImages}
          direction="left"
          onImageClick={onImageClick}
        />
        <InfiniteScrollRow
          images={galleryImages}
          direction="right"
          onImageClick={onImageClick}
        />
      </div>
    </section>
  );
}
