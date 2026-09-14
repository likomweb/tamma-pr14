'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function CountUp({
  end,
  duration = 1.6,
  start = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  triggerOnce = true,
}: CountUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<number>(start);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = ref.current;
    if (!node) return;

    if (shouldReduceMotion) {
      setValue(end);
      return;
    }

    let animationFrame: number | null = null;
    const animate = () => {
      if (hasAnimated.current && triggerOnce) return;
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = easeOut(progress);
        setValue(start + (end - start) * eased);
        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else {
          hasAnimated.current = true;
        }
      };
      animationFrame = requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      animate();
      return () => {
        if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            if (triggerOnce) observer.disconnect();
          } else if (!triggerOnce) {
            hasAnimated.current = false;
            setValue(start);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate();
      if (triggerOnce) observer.disconnect();
    }
    return () => {
      observer.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, start, shouldReduceMotion, triggerOnce]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
