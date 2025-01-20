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
            <div className="w-full max-w-3xl px-4 py-8 space-y-16">
              <div className="flex flex-col items-center space-y-8 text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
                  {currentStep}
                </h1>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Please wait while we process the API documentation.
                  <br />
                  This can take up to a few minutes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-8">
                <motion.div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 10,
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
