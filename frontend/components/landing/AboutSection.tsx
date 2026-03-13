"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const sectionVar: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
};

export default function AboutSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVar}
      className="relative py-24 px-6 -mt-30 sm:-mt-30 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_bg.png"
          alt="Section Background"
          fill
          className="object-cover opacity-20 grayscale"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 items-center relative z-10">
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-custom tracking-tighter">
            About <span className="text-yellow-400">TownHall</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400" />
          <p className="text-white/70 text-2xl leading-relaxed max-w-2xl font-custom font-medium">
            TownHall is the premier annual technical symposium of{" "}
            <span className="text-yellow-400">Coding Club NIT Silchar</span>. It
            serves as a battleground for innovation, bringing together the
            sharpest minds for high-stakes challenges, collaborative learning,
            and technological excellence.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <div className="p-8 bg-[#080808] shadow-2xl">
            <Image
              src="/images/about_image.png"
              alt="About TownHall"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
