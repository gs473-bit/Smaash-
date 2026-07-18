import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function RotatingBanner({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="bg-navy text-shuttle-lime text-center py-2 border-b border-navy text-sm font-bold uppercase tracking-widest relative overflow-hidden h-9 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
