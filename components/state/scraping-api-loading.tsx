"use client";

import { motion } from "framer-motion";

const shapeVariants = {
  initial: { y: 0, opacity: 0 },
  animate: (i: number) => ({
    y: [-20, 20],
    opacity: [0, 1, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut",
        delay: i * 0.2,
      },
      opacity: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    },
  }),
};

export default function ScrapingApiLoading() {
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
                  Scraping API Docs
                </h1>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Please wait while we process the API documentation. This can
                  take up to a few minutes.
                </p>
                <div className="relative w-24 h-24">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center"
                      custom={i}
                      variants={shapeVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <div
                        className={`w-8 h-8 ${
                          i === 0
                            ? "bg-blue-500"
                            : i === 1
                            ? "bg-green-500"
                            : "bg-purple-500"
                        } rounded-full`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="h-full bg-blue-500"
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
  );
}
