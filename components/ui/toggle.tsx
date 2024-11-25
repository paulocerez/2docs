import { motion } from "framer-motion";

export default function Toggle({ condition }: { condition: boolean }) {
  return (
    <div
      className={`relative mx-2 w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${
        condition ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <motion.div
        className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-md"
        animate={{
          x: condition ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </div>
  );
}
