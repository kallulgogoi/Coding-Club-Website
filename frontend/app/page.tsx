"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import RoadmapSection from "@/components/landing/RoadmapSection";
import GallerySection from "@/components/landing/GallerySection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden font-custom">
      <HeroSection />

      <AboutSection />

      <RoadmapSection />

      <GallerySection onImageClick={setSelectedImage} />

      <Footer />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src={selectedImage}
                alt="Enlarged"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
