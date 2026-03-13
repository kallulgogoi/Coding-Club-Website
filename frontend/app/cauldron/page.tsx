"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Flame,
  Users,
  Code2,
  ExternalLink,
  Target,
  ArrowRight,
  Shield,
  Star,
} from "lucide-react";

export default function CauldronPage() {
  const sectionVar = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVar = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hallOfFame = [
    {
      name: "Smitkri",
      handle: "@smitkri",
      rank: "Master",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Tourist",
      handle: "@tourist",
      rank: "Legendary Grandmaster",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Radewoosh",
      handle: "@Radewoosh",
      rank: "Legendary Grandmaster",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-black overflow-x-hidden font-custom">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0  w-full h-[670px] md:w-full md:h-[1000px]">
          <Image
            src="/images/cauldron.gif"
            alt="Cauldron Hero Background"
            fill
            priority
            className="object-cover opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60 bg-linear-to-b from-black via-transparent to-black" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center space-y-8 mt-12 md:-mt-50">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter font-custom flex items-center justify-center"
          >
            <span className="text-yellow-400 ">CAULDR</span>
            <Image
              src="/images/beyblade1.png"
              alt="O"
              width={120}
              height={120}
              className="w-[0.8em] h-[0.8em] object-contain mx-1 "
            />
            <span className="text-yellow-400 ">N</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-400 max-w-2xl font-medium"
          >
            The Ultimate Competitive Programming Showdown. Forge your legacy in
            the crucible of algorithmic excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto"
          >
            <a
              href="https://forms.gle/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <Target className="w-5 h-5" />
              Apply Now
            </a>
            <a
              href="https://codeforces.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              Codeforces Announcement
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVar}
        className="py-24 px-6 bg-[#050505] border-y border-white/5 relative"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 text-yellow-400">
              <Code2 className="w-4 h-4" />
              <span className="text-xs uppercase font-bold tracking-wider">
                Organized by Coding Club NIT Silchar
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-custom tracking-tighter">
              What is <span className="text-yellow-400">Cauldron?</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400" />

            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed font-medium">
              Cauldron is an annual flagship competitive programming contest
              that challenges the brightest minds to solve complex algorithmic
              puzzles under immense pressure. It is a grueling test of logic,
              mathematics, and optimization, designed to push participants to
              their absolute limits.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-4 hover:border-yellow-400/30 transition-colors">
                <Target className="w-8 h-8 text-yellow-400" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Global Stage
                  </h4>
                  <p className="text-sm text-gray-500">
                    Compete on Codeforces with top talents from around the
                    world.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-4 hover:border-yellow-400/30 transition-colors">
                <Shield className="w-8 h-8 text-yellow-400" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    High Stakes
                  </h4>
                  <p className="text-sm text-gray-500">
                    Exciting cash prizes and the ultimate bragging rights await.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full" />
            <div className="relative z-10 p-2 sm:p-4 border border-white/10 rounded-3xl bg-black/50 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
                alt="Competitive Programming"
                className="rounded-2xl w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats & Previous Year Links */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVar}
        className="py-24 px-6 relative bg-black"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-custom tracking-tighter">
              Legacy of <span className="text-yellow-400">Excellence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Participated by top Codeforces Masters & Grandmasters globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Total Participants", value: "3,500+", icon: Users },
              { label: "Countries Represented", value: "50+", icon: Target },
              { label: "CF Grandmasters", value: "20+", icon: Star },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#080808] border border-white/5 text-center flex flex-col items-center gap-4 hover:border-yellow-400/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-4xl font-black text-white font-custom">
                  {stat.value}
                </h3>
                <p className="text-gray-500 uppercase font-bold tracking-widest text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <h3 className="text-2xl font-black text-white uppercase font-custom">
                Dive Into The Archives
              </h3>
              <p className="text-gray-400">
                Want to test your mettle? Try out the problems from last
                year&apos;s Cauldron.
              </p>
            </div>
            <a
              href="https://codeforces.com/contest/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-4 bg-white/5 hover:bg-yellow-400 hover:text-black border border-white/20 hover:border-yellow-400 text-white font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 group"
            >
              View Previous Contest
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Hall of Fame */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVar}
        className="py-32 px-6 bg-[#050505] border-y border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 justify-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">
                Champions
              </span>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-custom tracking-tighter">
              Hall of <span className="text-yellow-400">Fame</span>
            </h2>
            <p className="text-gray-400 text-lg uppercase tracking-widest">
              The legends who conquered the Cauldron
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8"
          >
            {hallOfFame.map((winner, idx) => (
              <motion.div
                variants={childVar}
                key={idx}
                className="relative group mt-8 sm:mt-0"
              >
                <div
                  className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${idx === 1 ? "bg-yellow-400/40" : "bg-white/20"}`}
                />
                <div
                  className={`relative p-8 rounded-3xl bg-[#080808] border ${idx === 1 ? "border-yellow-400/50 scale-105 z-10 shadow-[0_0_30px_rgba(250,204,21,0.15)] md:-translate-y-6" : "border-white/10"} flex flex-col items-center text-center h-full transition-transform duration-300`}
                >
                  {idx === 1 && (
                    <div className="absolute -top-5 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                      Grand Champion
                    </div>
                  )}

                  <div className="relative w-32 h-32 mb-6">
                    <img
                      src={winner.img}
                      alt={winner.name}
                      className={`w-full h-full object-cover rounded-full border-4 ${idx === 1 ? "border-yellow-400" : "border-white/20"}`}
                    />
                    <div
                      className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#080808] ${idx === 1 ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}`}
                    >
                      <span className="font-black font-custom">
                        {idx === 1 ? "1" : idx === 0 ? "2" : "3"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1 font-custom">
                    {winner.name}
                  </h3>
                  <p className="text-yellow-400 font-medium mb-3">
                    {winner.handle}
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                    {winner.rank}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Area padding */}
      <div className="h-24 bg-black" />
    </main>
  );
}
