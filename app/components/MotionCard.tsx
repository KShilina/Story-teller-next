"use client";

import { motion } from "framer-motion";
import React from "react";

interface MotionCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const MotionCard: React.FC<MotionCardProps> = ({
  title,
  children,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ scale: 1.03 }}
    viewport={{ once: true }}
    className="flex-1 flex"
  >
    <div
      className="bg-white border border-[#C9D8C1] rounded-2xl shadow-md hover:shadow-lg
                 transition-all duration-300 p-6 w-full"
    >
      <h3 className="font-semibold text-[#3D4635] mb-3 text-center">{title}</h3>
      {children}
    </div>
  </motion.div>
);

export default MotionCard;
