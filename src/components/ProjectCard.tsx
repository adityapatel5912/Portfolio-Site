import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  className?: string;
  delay?: number;
}

export function ProjectCard({
  number,
  title,
  description,
  tags,
  className,
  delay = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    // disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
      initial={{ y: 50, opacity: 0, rotate: -1 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative flex flex-col bg-bg-card border border-border-color p-8 cursor-pointer transition-all duration-400 ease-[0.16,1,0.3,1]",
        "hover:-translate-y-2 hover:shadow-lg hover:border-gold hover:bg-bg-elevated cursor-hover-target",
        className
      )}
    >
      <div className="flex flex-col h-full space-y-6 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
        <div className="text-text-faint font-mono text-xs tracking-widest">{number}</div>
        
        <div className="space-y-4 flex-1">
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-text-primary">
            {title}
          </h3>
          <p className="font-body font-light text-sm md:text-base text-text-secondary leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-green-light/50 text-green-accent border border-green-light rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1.5 group-hover:scale-110 transition-transform duration-300 ease-[0.16,1,0.3,1]" />
        </div>
      </div>
      
      {/* Decorative gradient on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-dim/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
