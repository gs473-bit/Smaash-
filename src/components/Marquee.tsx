import React from 'react';

export function Marquee({ text, speed = 20 }: { text: string, speed?: number }) {
  // Repeating text multiple times to ensure continuous flow
  const repeats = Array(8).fill(text);

  return (
    <div className="w-full overflow-hidden bg-navy text-shuttle-lime py-3 border-y-2 border-navy flex whitespace-nowrap -rotate-1 origin-center scale-105 my-8">
      <div 
        className="animate-marquee font-heading font-black text-lg md:text-2xl uppercase tracking-widest flex items-center shrink-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {repeats.map((t, i) => (
          <React.Fragment key={i}>
            <span className="mx-4">{t}</span>
            <span className="mx-4 text-vivid-teal">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
