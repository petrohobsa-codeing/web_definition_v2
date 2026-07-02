"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Animates a numeric value up from 0 when it scrolls into view.
 * Preserves any non-numeric prefix/suffix in `value`
 * (e.g. "+1.6 M", "93%", "24/7" -> non-numeric strings render as-is).
 */
export default function CountUp({ value, duration = 1800, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Parse "+1.6 M" -> { prefix:"+", num:1.6, suffix:" M", decimals:1 }
  const match = value.match(/^(\D*)([\d.,]+)([\s\S]*)$/);

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const rawNum = match[2].replace(/,/g, "");
    const suffix = match[3];
    const target = parseFloat(rawNum);
    const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;

    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(`${prefix}${target.toFixed(decimals)}${suffix}`);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
