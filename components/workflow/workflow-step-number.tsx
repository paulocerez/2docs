import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StepNumber({ number }: { number: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-6 h-6 rounded-full",
        "flex items-center justify-center",
        "bg-blue-100"
      )}
    >
      <span className="text-sm font-semibold text-blue-600">{number}</span>
    </motion.div>
  );
}
