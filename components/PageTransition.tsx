"use client";
import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}   // 初始：下移20px，透明
      animate={{ y: 0, opacity: 1 }}    // 结束：原位，不透明
      transition={{ ease: "easeOut", duration: 0.8 }}  // 缓动曲线
    >
      {children}
    </motion.div>
  );
}