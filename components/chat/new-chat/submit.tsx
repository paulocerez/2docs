"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

interface ParticleEffectSubmitButtonProps {
  isFormValid: boolean;
  isAiResponding: boolean;
  onClick: () => void;
}

const Particle = ({
  x,
  y,
  radius,
  color,
}: {
  x: number;
  y: number;
  radius: number;
  color: string;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      x,
      y,
      width: radius * 2,
      height: radius * 2,
      backgroundColor: color,
    }}
    initial={{ opacity: 1 }}
    animate={{
      y: y - 50,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    }}
  />
);

export default function SubmitButton({
  isFormValid,
  isAiResponding,
  onClick,
}: ParticleEffectSubmitButtonProps) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; radius: number; color: string }>
  >([]);
  const controls = useAnimation();

  const createParticle = useCallback((x: number, y: number) => {
    const radius = Math.random() * 3 + 1;
    const color = ["#FFD700", "#FF6347", "#00CED1", "#FF69B4"][
      Math.floor(Math.random() * 4)
    ];
    return { x, y, radius, color };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isFormValid && !isAiResponding) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setParticles((prevParticles) => [
          ...prevParticles,
          createParticle(x, y),
        ]);
      }
    },
    [isFormValid, isAiResponding, createParticle]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prevParticles) => prevParticles.slice(1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAiResponding) {
      controls.start({
        boxShadow: [
          "0 0 0 0 rgba(66, 153, 225, 0.5)",
          "0 0 0 10px rgba(66, 153, 225, 0)",
          "0 0 0 0 rgba(66, 153, 225, 0)",
        ],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      controls.stop();
    }
  }, [isAiResponding, controls]);

  return (
    <motion.button
      onClick={onClick}
      disabled={!isFormValid || isAiResponding}
      className={`
        relative overflow-hidden text-sm py-3 px-6 rounded-full font-medium
        transition-all duration-300 ease-in-out
        ${
          isFormValid && !isAiResponding
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
      `}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={controls}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isAiResponding ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Crafting Workflow
          </>
        ) : (
          <>
            Create Workflow
            <Sparkles className="w-5 h-5" />
          </>
        )}
      </div>
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
    </motion.button>
  );
}
