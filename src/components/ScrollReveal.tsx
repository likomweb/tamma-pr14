'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  stagger?: boolean; // stagger children with 80ms delays
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  onClick,
  stagger = false,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      onClick={onClick}
    >
      {stagger && React.Children.map(children, (child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              initial: { y: shouldReduceMotion ? 0 : 18 },
              whileInView: { y: 0 },
              viewport: { once: true, margin: '-80px' },
              transition: {
                duration: shouldReduceMotion ? 0.01 : 0.5,
                delay: shouldReduceMotion ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              },
            })
          : child
      )}
      {!stagger && children}
    </motion.div>
  );
}
