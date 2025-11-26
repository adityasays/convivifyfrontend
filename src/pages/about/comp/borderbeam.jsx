'use client';

import { motion } from 'framer-motion';

export const BorderBeam = ({
  size = 60,
  duration = 8,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  reverse = false,
  className = '',
  style,
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={{
        border: '1px solid transparent',
        maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
        ...style,
      }}
    >
      <motion.div
        className={`absolute ${className}`}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
        initial={{ offsetDistance: '0%' }}
        animate={{
          offsetDistance: reverse ? ['100%', '-100%'] : ['0%', '100%'],
        }}
        transition={{
          duration,
          delay,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  );
};