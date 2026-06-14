import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Sparkles, Clock, User, CheckCircle2, ChevronRight, Share2, Clipboard } from "lucide-react";
import { Project } from "../types";
import { PROJECTS } from "../data";

interface ProjectDetailProps {
  key?: string | number;
  project: Project;
  onBack: () => void;
  onNavigate: (hash: string) => void;
}

export default function ProjectDetail({ project, onBack, onNavigate }: ProjectDetailProps) {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Project URL copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20"
    >
      {/* Back navigation and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-16">
        <button
          onClick={onBack}
          className="group flex items-center space-x-2 text-sm font-sans text-zinc-400 hover:text-white transition duration-200 outline-none w-fit"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Top Projects</span>
        </button>

        <div className="flex items-center space-x-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded-lg border border-accent-warm bg-accent-warm/10 px-3 py-1.5 text-xs font-sans text-accent-warm hover:bg-accent-warm hover:text-bg-primary transition duration-200"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-sans text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
          <a
            href="mailto:adityapatel5912@gmail.com"
            className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-sans text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          >
            <span>Inquire About Launch</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Hero Category + Title */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#a8a8b3]">
            {project.category}
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-100 mb-4 max-w-3xl leading-none">
          {project.title}
        </h1>
        <p className="font-sans text-lg sm:text-xl text-zinc-400 max-w-3xl font-light">
          {project.tagline}
        </p>
      </div>

      {/* Giant Visualization Backdrop */}
      <div className={`relative rounded-3xl bg-gradient-to-br ${project.mockupBg} border border-zinc-800 p-8 sm:p-12 mb-12 sm:mb-16 min-h-[300px] flex flex-col justify-between overflow-hidden shadow-2xl`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />

        {/* Graphic interface elements */}
        <div className="relative z-10 flex flex-wrap gap-2.5 max-w-xl">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] sm:text-[10px] text-zinc-300 bg-black bg-opacity-70 border border-zinc-750 px-3 py-1 rounded-full shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Dynamic product frame */}
        <div className="relative z-10 mt-16 max-w-xl">
          <div className="inline-flex items-center space-x-2 border border-zinc-800 bg-black/90 p-2.5 rounded-xl shadow-lg mb-4">
            <Sparkles className="h-4 w-4 text-zinc-300" />
            <span className="font-mono text-[11px] text-zinc-400">ACTIVE FLUID PROTOCOL IMPLEMENTED</span>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl bg-black bg-opacity-95 border border-zinc-850">
            <h4 className="font-display text-md sm:text-lg font-semibold text-white mb-2">Prompt Strategy Representation</h4>
            <p className="font-mono text-xs text-zinc-500 italic leading-relaxed">
              "{project.visualPrompt}"
            </p>
          </div>
        </div>
      </div>

      {/* Spec Grid / Role Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-zinc-900 pb-12 mb-12">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h5 className="font-sans text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">My Role</h5>
            <div className="flex items-center text-sm font-sans text-zinc-300">
              <User className="mr-1.5 h-4 w-4 text-zinc-500" />
              <span>{project.role}</span>
            </div>
          </div>
          <div>
            <h5 className="font-sans text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Timeline</h5>
            <div className="flex items-center text-sm font-sans text-zinc-300">
              <Clock className="mr-1.5 h-4 w-4 text-zinc-500" />
              <span>{project.timeline}</span>
            </div>
          </div>
          <div>
            <h5 className="font-sans text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">URL Reference</h5>
            {project.liveUrl ? (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-mono text-accent-warm hover:underline inline-flex items-center gap-1"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3 w-3 text-accent-warm" />
              </a>
            ) : (
              <div className="text-sm font-mono text-zinc-400">
                {project.url}
              </div>
            )}
          </div>
        </div>

        {/* Long Description and Narrative */}
        <div className="md:col-span-3 space-y-6">
          <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Project Architecture
          </h4>
          <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-zinc-300 font-light text-justify">
            {project.longDescription}
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-zinc-400">
            {project.description}
          </p>
        </div>
      </div>

      {/* Key Features & Metrics Dashboard split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* Features Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Core Engineering Completed
          </h3>
          <ul className="space-y-4">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <span className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-zinc-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spec performance dials */}
        <div className="lg:col-span-5 bg-zinc-950 bg-opacity-40 border border-[#16161d] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">
              SYSTEM DIAGNOSTICS & METRICS
            </h4>
            <div className="space-y-6">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-[#121217] pb-4 last:border-0 last:pb-0">
                  <span className="font-sans text-xs text-zinc-400">{metric.label}</span>
                  <span className="font-mono text-sm sm:text-base font-semibold text-slate-100">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Verified Environment</span>
            <span className="text-zinc-400">Production Live</span>
          </div>
        </div>

      </div>

      {/* Next Project Footer Switcher */}
      <div className="border-t border-[#1a1a24] pt-12 mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950 bg-opacity-70 p-6 sm:p-8 hover:border-zinc-800 transition duration-300">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Up Next
            </span>
            <h4 className="font-display text-lg sm:text-xl font-bold text-slate-100 mt-1">
              {nextProject.title} — {nextProject.category}
            </h4>
          </div>

          <button
            onClick={() => {
              onNavigate(`#/projects/${nextProject.id}`);
            }}
            className="group flex items-center space-x-1.5 rounded-xl bg-zinc-100 px-4 py-2.5 text-xs font-sans font-semibold text-black hover:bg-white transition duration-200 outline-none cursor-pointer"
          >
            <span>Next Project Case Study</span>
            <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
