"use client";
import { motion } from "framer-motion";

export default function NeonButton({
  text,
  onClick,
  color = "blue",
  type = "button",
  disabled,
}: any) {
  const base =
    "px-6 py-2 border-2 uppercase font-bold tracking-widest transition-all rounded bg-transparent";
  const colors = {
    blue: "border-neon-blue text-neon-blue hover:shadow-[0_0_20px_#00f3ff]",
    red: "border-neon-red text-neon-red hover:shadow-[0_0_20px_#ff003c]",
    purple:
      "border-neon-purple text-neon-purple hover:shadow-[0_0_20px_#b026ff]",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${colors[color as keyof typeof colors]} ${disabled ? "opacity-50" : ""}`}
    >
      {text}
    </motion.button>
  );
}
