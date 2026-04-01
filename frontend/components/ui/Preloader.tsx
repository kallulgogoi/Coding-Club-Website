"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 600);
          return 100;
        }
        // Eased progress: starts fast, slows near end
        const increment = prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.04)_0%,transparent_70%)]" />

          {/* Floating particles */}
          <FloatingParticles />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated logo ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 112 112" className="w-full h-full">
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="50%" stopColor="#facc15" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="56"
                    cy="56"
                    r="52"
                    fill="none"
                    stroke="url(#ring-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>


              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-3 rounded-full border border-yellow-400/20"
              />


              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
                className="relative z-10"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" opacity="0.5" />
                </svg>
              </motion.div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-custom text-2xl md:text-3xl tracking-[0.3em] text-white/90">
                TOWNHALL
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mt-2"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-yellow-400/50 text-[10px] tracking-[0.5em] mt-3 font-mono"
              >
                CODING CLUB
              </motion.p>
            </motion.div>

            {/* progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-48 flex flex-col items-center gap-3"
            >
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-yellow-400/80 to-yellow-400 rounded-full"
                  style={{
                    boxShadow: "0 0 12px rgba(250, 204, 21, 0.4)",
                  }}
                />
              </div>

              <span className="text-white/50 text-xs font-mono tracking-widest w-16 text-center tabular-nums">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: 0,
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 15}vh`, `${p.y}vh`],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-yellow-400"
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}