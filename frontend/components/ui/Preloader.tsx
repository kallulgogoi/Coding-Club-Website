"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const battlePhrases = [
  "INITIALIZING...",
  "3... 2... 1...",
  "GO SHOOT!",
  "LET IT RIP!",
  "OVERDRIVE",
];

const codingLogs = [
  "[SYS] Kernel initialized",
  "[NET] Arena handshake complete",
  "[PWR] Spin-motor at 100%",
  "[DEB] Bit-beast layer loaded",
  "[SEC] Encryption bypassed",
  "[RUN] Executing launch protocol",
];

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Safe state for window width to avoid SSR error
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window size only after mounting on client
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    if (isVisible) document.body.style.overflow = "hidden";
    else {
      const timer = setTimeout(
        () => (document.body.style.overflow = "unset"),
        1000,
      );
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % codingLogs.length);
    }, 1200);
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % battlePhrases.length);
    }, 1000);
    return () => {
      clearInterval(logInterval);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505] overflow-hidden font-['JetBrains_Mono',monospace]"
        >
          {/* TECH GRID OVERLAY */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[linear-gradient(rgba(250,204,21,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className="relative z-10 w-full max-w-6xl px-4 md:px-10 flex flex-col items-center">
            <div className="w-full flex justify-between items-start mb-8 md:mb-12 border-l-2 border-yellow-400 pl-4">
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs font-bold text-yellow-400 uppercase tracking-widest">
                  Protocol: CODING_CLUB PRESENTS
                </p>
                <p className="text-lg md:text-2xl font-black text-white font-custom">
                  TOWNHALL 2026
                </p>
              </div>
            </div>

            <div className="relative w-full py-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-full text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentPhrase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl md:text-3xl font-black text-white italic font-custom"
                  >
                    {battlePhrases[currentPhrase]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* BEYBLADE LEFT */}
              <motion.div
                animate={{ x: [0, progress / 3, 0], rotate: 360 }}
                transition={{
                  rotate: { repeat: Infinity, duration: 0.4, ease: "linear" },
                }}
                className="relative z-20"
              >
                <BeybladeSVG
                  color="#ff3366"
                  glow="#ffcc00"
                  size={isMobile ? 140 : 220}
                />
              </motion.div>

              <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl"
                />
                <span className="text-white font-black text-2xl md:text-4xl italic z-10 animate-pulse">
                  VS
                </span>
              </div>

              {/* BEYBLADE RIGHT */}
              <motion.div
                animate={{ x: [0, -(progress / 3), 0], rotate: -360 }}
                transition={{
                  rotate: { repeat: Infinity, duration: 0.4, ease: "linear" },
                }}
                className="relative z-20"
              >
                <BeybladeSVG
                  color="#00ccff"
                  glow="#00ffaa"
                  size={isMobile ? 140 : 220}
                />
              </motion.div>
            </div>

            <div className="w-full mt-12 space-y-6">
              <div className="flex justify-between items-end">
                <div className="text-right">
                  <span className="text-3xl md:text-5xl font-black text-yellow-400 font-custom tracking-tighter">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-yellow-600 to-yellow-300"
                />
              </div>
            </div>

            {/* TERMINAL LOGS */}
            <div className="absolute bottom-6 left-6 hidden md:block w-64 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
              <div className="space-y-1">
                {codingLogs.slice(0, 4).map((log, i) => (
                  <p
                    key={i}
                    className={`text-[10px] ${i === logIndex ? "text-yellow-400" : "text-white/20"}`}
                  >
                    {">"} {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BeybladeSVG({ color, glow, size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id={`grad-${color}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="2 2"
        opacity="0.3"
      />
      {[0, 72, 144, 216, 288].map((r) => (
        <path
          key={r}
          d="M50 2 L60 20 H40 Z"
          fill={color}
          transform={`rotate(${r} 50 50)`}
        />
      ))}
      <rect
        x="35"
        y="35"
        width="30"
        height="30"
        rx="4"
        fill="#111"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="8" fill={`url(#grad-${color})`} />
    </svg>
  );
}
