"use client";
import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="text-4xl font-bold text-sky-500 dark:text-sky-400">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;