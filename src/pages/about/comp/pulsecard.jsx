'use client';

import { motion } from 'framer-motion';

const VARIANTS = {
  emerald: { color: 'rgb(34 197 94)' },
  blue: { color: 'rgb(59 130 246)' },
  purple: { color: 'rgb(168 85 247)' },
  amber: { color: 'rgb(251 146 60)' },
  rose: { color: 'rgb(244 63 94)' },
};

const SIZES = {
  sm: { padding: 'p-6 pt-12', icon: 'h-5 w-5', title: 'text-sm', desc: 'text-xs' },
  md: { padding: 'p-8 pt-16', icon: 'h-6 w-6', title: 'text-base', desc: 'text-[15px]' },
  lg: { padding: 'p-10 pt-20', icon: 'h-8 w-8', title: 'text-xl', desc: 'text-base' },
};

export function CardHoverEffect({
  icon,
  title,
  description,
  variant = 'emerald',
  size = 'md',
  glowEffect = false,
  hoverScale = 1.02,
  interactive = true,
  className = '',
}) {
  const config = VARIANTS[variant] || VARIANTS.emerald;
  const sz = SIZES[size];
  const Div = interactive ? motion.div : 'div';
  const IconWrap = interactive ? motion.span : 'span';

  return (
    <Div
      whileHover={interactive ? { scale: hoverScale } : {}}
      transition={{ duration: 0.3 }}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl ${sz.padding} bg-white/80 backdrop-blur-3xl shadow-lg hover:shadow-2xl transition-all ${className}`}
      style={{ '--card-color': config.color }}
    >
      {/* Animated border */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ padding: '2px', mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}>
        <div
          className="absolute inset-[-200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 340deg, var(--card-color) 360deg)`,
            animation: 'spin 4s linear infinite',
          }}
        />
      </div>

      {/* Icon */}
      <IconWrap className="relative z-10 inline-block rounded-xl" whileHover={interactive ? { scale: 1.15 } : {}}>
        <span className="absolute inset-1 rounded-[inherit] bg-gradient-to-b from-black/5 to-black/10 dark:from-white/10 dark:to-white/5" />
        <span className={`relative z-10 block text-black/60 group-hover:text-[var(--card-color)] dark:text-zinc-400 transition-colors ${sz.icon}`}>
          {icon}
        </span>
      </IconWrap>

      {/* Text */}
      <div className="relative z-10 mt-4">
        <h3 className={`font-medium text-black/80 group-hover:text-[var(--card-color)] dark:text-white/90 transition-colors ${sz.title}`}>
          {title}
        </h3>
        <p className={`mt-2 text-black/60 dark:text-white/50 transition-colors ${sz.desc}`}>
          {description}
        </p>
      </div>

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div
          className="absolute bottom-[55%] left-1/2 aspect-square w-[200%] -translate-x-1/2 rounded-full"
          style={{
            background: `conic-gradient(from 205deg, transparent 0deg, ${config.color} 20deg, ${config.color}40 280deg)`,
            filter: 'blur(40px)',
            opacity: 0.8,
          }}
        />
      </div>
    </Div>
  );
}