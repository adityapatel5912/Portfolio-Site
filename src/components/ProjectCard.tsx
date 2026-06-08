import React, { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onSelect: (hash: string) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Respect user's system accessibility choices
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Center of card is origin
    const xPct = (x / width) - 0.5; // range: -0.5 to +0.5
    const yPct = (y / height) - 0.5; // range: -0.5 to +0.5

    // Multiplier max 16deg gives rotation boundaries of -8deg to +8deg
    const rotateY = xPct * 16;
    const rotateX = -yPct * 16;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={cardRef}
      id={`project-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(`#/projects/${project.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-secondary p-1 backdrop-blur-md transition-all duration-300 hover:border-accent-warm hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s" }}
    >
      <div className="relative flex flex-col h-full overflow-hidden rounded-xl bg-bg-primary p-6 sm:p-8">
        
        {/* Subtle radial inner glow on hover */}
        <div 
          className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-warm/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ pointerEvents: "none" }}
        />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-accent-warm animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a8478]">
              {project.category}
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-secondary group-hover:text-text-primary group-hover:border-accent-warm group-hover:scale-105 transition duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Visual Product Mockup Block incorporating Ken Burns scaling zoom */}
        <div className="ken-burns-container relative flex items-center justify-center rounded-xl bg-bg-secondary min-h-[160px] sm:min-h-[190px] border border-border mb-6 px-4 overflow-hidden">
          {/* Mockup visual with Ken Burns class */}
          <div className="ken-burns-element absolute inset-0 bg-gradient-to-b from-bg-elevated to-bg-primary opacity-60" />
          
          {/* Tech background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,228,220,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(232,228,220,0.015)_1px,_transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

          {/* Static high-contrast informative mockup contents */}
          <div className="relative z-10 text-center select-none py-4">
            <div className="inline-flex items-center space-x-1 border border-border bg-bg-elevated px-2.5 py-1 rounded-full text-[9px] font-mono text-accent-warm shadow-sm mb-3">
              <Sparkles className="h-2.5 w-2.5" />
              <span>{project.techStack[0]} // {project.techStack[1]}</span>
            </div>
            <p className="text-[11px] font-mono leading-relaxed text-[#8a8478] max-w-[240px] italic">
              "{project.visualPrompt}"
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-text-primary group-hover:text-accent-warm transition duration-300 mb-2">
              {project.title}
            </h3>
            <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-text-secondary group-hover:text-text-primary transition duration-300 mb-6">
              {project.tagline}
            </p>
          </div>

          <div>
            {/* Tech Stack list */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] text-text-secondary bg-bg-elevated border border-border px-2 py-0.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4b. Sliding Overlay panel: slides up from the bottom boundaries when hovered over */}
        <div 
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-elevated to-transparent h-12 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-widest text-[#b8965a] uppercase">Explore Deep Specs →</span>
        </div>

      </div>
    </div>
  );
}
