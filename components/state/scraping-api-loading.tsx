"use client";

import { motion } from "framer-motion";

interface WorkflowLoadingStepsProps {
  currentStep: string;
}

const hexagonPath = "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z";

const pulseVariants = {
  initial: { scale: 0.8, opacity: 0.5 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const rotateVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function ScrapingApiLoading({
  currentStep,
}: WorkflowLoadingStepsProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50 pt-16">
      <div className="flex-grow overflow-y-auto pt-4 pb-16">
        <div className="mx-auto px-4 w-full max-w-4xl">
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl px-4 py-8 space-y-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-8 text-center"
              >
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
                  Cooking your workflow 👨🏻‍🍳
                </h1>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Please wait while we process the API documentation.
                  <br />
                  This can take up to a few minutes.
                </p>
                <div className="relative w-48 h-48">
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    variants={rotateVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.path
                      d={hexagonPath}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <svg
                      className="w-12 h-12 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              <div className="flex flex-col items-center space-y-8">
                <p className="mt-2 text-center text-gray-400 text-sm">
                  {currentStep}
                </p>
                <motion.div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
