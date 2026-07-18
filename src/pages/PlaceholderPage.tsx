import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export function PlaceholderPage({ title }: { title: string }) {
  const location = useLocation();
  
  return (
    <div className="pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-xl font-medium text-navy/60">
          Route: <span className="text-electric-blue font-mono">{location.pathname}</span>
        </p>
        <div className="mt-8 bg-navy-10 border-2 border-dashed border-navy/20 p-8 rounded-xl max-w-2xl mx-auto">
          <p className="font-bold text-navy/80 uppercase tracking-widest">Page coming soon in next iteration</p>
        </div>
      </motion.div>
    </div>
  );
}
