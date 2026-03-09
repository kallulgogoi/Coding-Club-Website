"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  Zap,
  Swords,
  Users,
  Trophy,
  Code2,
  Globe,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

// --- Styled Components ---

const BeybladeHero = ({ size = 180 }) => (
  <div className="relative flex items-center justify-center animate-spin-slow">
    <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full animate-pulse" />
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]"
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="#facc15"
        strokeWidth="1"
        strokeDasharray="8 4"
        opacity="0.3"
      />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <path
          key={i}
          d="M60 10 L75 55 L60 65 L45 55 Z"
          fill="#facc15"
          transform={`rotate(${a} 60 60)`}
          opacity={i % 2 === 0 ? 0.9 : 0.4}
        />
      ))}
      <circle
        cx="60"
        cy="60"
        r="12"
        fill="#1a1a1a"
        stroke="#facc15"
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="4" fill="#facc15" />
    </svg>
  </div>
);

const StatCard = ({ icon: Icon, value, label }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group hover:border-yellow-400/30 transition-all duration-300">
    <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
    <h3 className="text-3xl font-black text-white mb-1 font-['Orbitron']">
      {value}
    </h3>
    <p className="text-white/40 text-xs uppercase tracking-widest font-bold font-['Rajdhani']">
      {label}
    </p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-[#1e1e1e] border border-white/5 p-8 rounded-3xl hover:bg-[#222222] transition-all group">
    <div className="w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
      <Icon className="w-7 h-7 text-yellow-400 group-hover:text-black transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-white uppercase mb-3 font-['Orbitron']">
      {title}
    </h3>
    <p className="text-white/50 text-sm leading-relaxed font-['Rajdhani']">
      {desc}
    </p>
  </div>
);

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/[0.03] rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 font-['Orbitron']">
                Arena Live: Session 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 font-['Orbitron']">
              TOWN
              <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                HALL
              </span>
              <br />
              <span className="text-white/90">ARENA</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 font-['Rajdhani'] font-medium leading-relaxed mx-auto lg:mx-0">
              The official battleground of{" "}
              <span className="text-white font-bold">
                Coding Club NIT Silchar
              </span>
              . Enter the stadium, join elite developer squads, and dominate the
              leaderboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={isAuthenticated ? "/profile" : "/auth"}
                className="px-10 py-4 bg-yellow-400 text-black font-black uppercase text-sm tracking-widest rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 fill-black" />
                {isAuthenticated ? "Enter Dashboard" : "Join the Arena"}
              </Link>
              <Link
                href="/events"
                className="px-10 py-4 border border-white/10 text-white font-bold uppercase text-sm tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <Swords className="w-4 h-4" />
                View Battles
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <BeybladeHero size={450} />
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Users} value="800+" label="Bladers Registered" />
            <StatCard icon={Trophy} value="45+" label="Battles Completed" />
            <StatCard icon={Code2} value="120K+" label="Lines of Code" />
            <StatCard
              icon={GraduationCap}
              value="12+"
              label="Years of Legacy"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase font-['Orbitron'] mb-4">
              Core Modules
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Swords}
              title="Coding Battles"
              desc="Timed competitive programming contests with real-time leaderboard updates."
            />
            <FeatureCard
              icon={Globe}
              title="Open Source"
              desc="Contribute to the official club projects and improve the NITS ecosystem."
            />
            <FeatureCard
              icon={Zap}
              title="Speed Sprints"
              desc="Ultra-fast mini-challenges designed to test your core language fundamentals."
            />
            <FeatureCard
              icon={Users}
              title="Crew Systems"
              desc="Form permanent teams (Crews) to compete in major seasonal tournaments."
            />
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-6 font-['Orbitron'] uppercase tracking-widest">
            Let it Rip.
          </h2>
          <p className="text-white/40 font-['Rajdhani'] uppercase tracking-[0.4em] text-xs">
            Official Platform // Coding Club NIT Silchar
          </p>
        </div>
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest hover:gap-4 transition-all"
        >
          Initiate Connection <ChevronRight className="w-4 h-4" />
        </Link>
      </footer>
    </main>
  );
}
