'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      className={`relative bg-bg-card border border-border rounded-xl overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
    >
      {/* Gold top accent */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light"
        initial={{ width: '40%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
