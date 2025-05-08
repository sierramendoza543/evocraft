'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function FinalActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/simulator/traits')}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Try Again
      </motion.button>
    </div>
  );
} 