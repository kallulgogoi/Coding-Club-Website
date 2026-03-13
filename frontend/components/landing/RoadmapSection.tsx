"use client";
import { motion, Variants } from "framer-motion";
import {
  Code2,
  Trophy,
  Zap,
  GraduationCap,
  Swords,
  Info,
  Globe,
  Images,
} from "lucide-react";

const sectionVar: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const eventTimeline = [
  { name: "Code Cauldron", icon: Code2, date: "Day 1" },
  { name: "Quant League", icon: Trophy, date: "Day 2" },
  { name: "Type Racing", icon: Zap, date: "Day 2" },
  { name: "Get Hired", icon: GraduationCap, date: "Day 3" },
  { name: "Lockout", icon: Swords, date: "Day 3" },
  { name: "Bit by Byte Quiz", icon: Info, date: "Day 4" },
  { name: "Goblin Gamble", icon: Globe, date: "Day 4" },
  { name: "Capture the Flag", icon: Images, date: "Day 5" },
];

export default function RoadmapSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVar}
      className="py-24 px-4 relative bg-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-black text-white uppercase font-custom mb-24 tracking-tighter">
          Mission <span className="text-yellow-400">Roadmap</span>
        </h2>

        {/* MOBILE LAYOUT: Zig-Zag Timeline */}
        <div className="relative md:hidden flex flex-col items-center space-y-12">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-yellow-400/20" />

          {eventTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center w-full ${isLeft ? "justify-end pr-[50%]" : "justify-start pl-[50%]"}`}
              >
                {/* Content Box */}
                <div
                  className={`flex flex-col ${isLeft ? "items-end text-right pr-8" : "items-start text-left pl-8"}`}
                >
                  <span className="text-yellow-400 font-black text-[10px] tracking-widest font-custom">
                    {item.date.toUpperCase()}
                  </span>
                  <h3 className="text-white font-bold text-sm uppercase leading-tight mt-1 max-w-[120px]">
                    {item.name}
                  </h3>
                </div>

                {/* Central Icon Container */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <item.icon size={20} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[8px] font-black rounded-full flex items-center justify-center border-2 border-black">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT: Snake Grid (Remains Unchanged) */}
        <div className="relative hidden md:grid grid-cols-4 gap-y-20 gap-x-4">
          <div className="absolute top-20 left-10 right-10 bottom-0 pointer-events-none">
            <svg width="100%" height="100%" className="opacity-20">
              <path
                d="M 50 40 L 950 40 Q 1000 40 1000 120 L 1000 180 Q 1000 260 950 260 L 50 260 Q 0 260 0 340 L 0 400"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          {eventTimeline.map((item, index) => {
            const isTop = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center group"
              >
                <div
                  className={`text-center mb-8 flex flex-col items-center ${!isTop ? "order-last mt-8 mb-0" : ""}`}
                >
                  <span className="text-yellow-400 font-black text-sm tracking-widest font-custom mb-1">
                    {item.date.toUpperCase()}
                  </span>
                  <h3 className="text-white font-bold text-lg uppercase leading-tight max-w-[150px]">
                    {item.name}
                  </h3>
                </div>
                <div className="relative">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-yellow-400/40 ${isTop ? "h-12 top-full" : "h-12 bottom-full"}`}
                  />
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-[0_0_30px_rgba(250,204,21,0.4)] group-hover:scale-110 transition-transform duration-300 z-10">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
