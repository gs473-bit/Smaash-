import React, { useState, useEffect } from 'react';
import { useInView, motion } from 'motion/react';

export function StatCounter({ target, label, numberColor = "text-electric-blue", labelColor = "text-navy" }: { target: number; label: string; numberColor?: string; labelColor?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const duration = 1500;
      const step = Math.max(1, Math.floor(target / (duration / 16)));
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          setIsFinished(true);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col">
      <motion.span 
        animate={isFinished ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`font-heading text-4xl md:text-5xl font-black origin-left ${numberColor}`}
      >
        {count}+
      </motion.span>
      <span className={`font-sans font-bold uppercase tracking-wider text-sm mt-1 ${labelColor}`}>{label}</span>
    </div>
  );
}
