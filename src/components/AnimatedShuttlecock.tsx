import React from 'react';
import { motion } from 'motion/react';

export function AnimatedShuttlecock() {
  return (
    <motion.div
      initial={{ x: '-10vw', y: 50, rotate: -45, opacity: 0 }}
      whileInView={{ 
        x: '110vw', 
        y: [-20, -100, 20, -50, 50],
        rotate: [-45, 0, 45, 90, 135],
        opacity: [0, 1, 1, 1, 0]
      }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ 
        duration: 4, 
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-0 pointer-events-none z-0"
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
        <path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8" />
        <path d="m14 2-8 8" />
        <path d="m6 10 4-4" />
        <path d="m10 14 4-4" />
        <path d="m14 18 4-4" />
        <path d="m18 22 4-4" />
        <path d="m8 6 8 8" />
        <path d="m6 8 8 8" />
        <path d="m4 10 8 8" />
      </svg>
    </motion.div>
  );
}
