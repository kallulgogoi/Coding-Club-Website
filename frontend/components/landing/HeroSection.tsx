"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const titleContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const letterAnim: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-yellow-400/10 rounded-full"
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
          animate={{ y: [0, -200], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute inset-0 z-0 w-full h-[670px] md:w-full md:h-[1000px]">
        <Image
          src="/images/hero.gif"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60 bg-linear-to-b from-black via-transparent to-black" />
      </div>
      <ParticleBackground />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-yellow-400/[0.02] rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center z-10 -mt-23 md:-mt-50">
        <motion.div
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.img
            variants={letterAnim}
            src="/images/logo.png"
            alt="TOWNHALL 2026 Logo"
            className="mx-auto h-auto sm:-mb-2 sm:-mt-15 w-auto max-w-[99%] md:max-w-[79%] lg:max-w-[59%] drop-shadow-[0_0_25px_rgba(250,204,21,0.4)]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: -150, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="relative flex justify-center z-20 mt-3 sm:-mt-30 lg:-mt-40"
        >
          <Image
            src="/images/ash.png"
            alt="Hero"
            width={600}
            height={600}
            unoptimized
            className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.9)]"
          />
          <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-black to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
