"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AnimatedStepProps {
  id: string;
  title: string;
  description: string;
  index: number;
}

export function AnimatedStep({
  id,
  title,
  description,
  index,
}: AnimatedStepProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 w-72 border border-gray-200 hover:border-blue-300 transition-colors duration-300"
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
          <span className="text-white font-bold text-lg">{id}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
    </motion.div>
  );
}
