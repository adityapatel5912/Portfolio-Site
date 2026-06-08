import { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function MagneticButton({ children, className, asChild, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    // Disable on touch devices roughly
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Max pull is 12px
    const pullX = (middleX / (width / 2)) * 12;
    const pullY = (middleY / (height / 2)) * 12;
    
    // Limit to max pull
    x.set(Math.max(-12, Math.min(12, pullX)));
    y.set(Math.max(-12, Math.min(12, pullY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative magnetic-target p-2 -m-2"
      style={{ x, y }}
    >
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </motion.div>
  );
}
