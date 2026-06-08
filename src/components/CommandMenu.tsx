import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Command, ArrowRight, Sparkles, Folder, ExternalLink, Mail, Github, Instagram, FileText } from "lucide-react";
import { PROJECTS } from "../data";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (hash: string) => void;
}

export default function CommandMenu({ isOpen, onClose, onNavigate }: CommandMenuProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // wait, we want to toggle
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const items = [
    ...PROJECTS.map(p => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: p.category,
      category: "Products",
      action: () => {
        onNavigate(`#/projects/${p.id}`);
        onClose();
      },
      icon: Folder
    })),
    {
      id: "nav-projects",
      title: "View All Projects",
      subtitle: "Jump to the product-market catalog",
      category: "Navigation",
      action: () => {
        onNavigate("#projects");
        onClose();
      },
      icon: Folder
    },
    {
      id: "nav-skills",
      title: "Explore Core Competencies",
      subtitle: "AI, Python, Automation & SaaS",
      category: "Navigation",
      action: () => {
        onNavigate("#skills");
        onClose();
      },
      icon: Sparkles
    },
    {
      id: "nav-stack",
      title: "Inspect Tech Stack",
      subtitle: "Dev Ops, Frameworks, Integrations",
      category: "Navigation",
      action: () => {
        onNavigate("#stack");
        onClose();
      },
      icon: Sparkles
    },
    {
      id: "nav-about",
      title: "Read Founder Story",
      subtitle: "Aditya's experiences & product vision",
      category: "Navigation",
      action: () => {
        onNavigate("#about");
        onClose();
      },
      icon: FileText
    },
    {
      id: "action-resume",
      title: "Download Resume",
      subtitle: "Academic profile, projects & tech experience",
      category: "Quick Actions",
      action: () => {
        window.open("mailto:adityapatel5912@gmail.com?subject=Requesting Resume - Aditya Patel", "_blank");
        onClose();
      },
      icon: FileText
    },
    {
      id: "action-email",
      title: "Email Aditya Patel",
      subtitle: "adityapatel5912@gmail.com",
      category: "Quick Actions",
      action: () => {
        window.open("mailto:adityapatel5912@gmail.com", "_blank");
        onClose();
      },
      icon: Mail
    },
    {
      id: "action-github",
      title: "Explore GitHub",
      subtitle: "github.com/adityapatel5912",
      category: "Links",
      action: () => {
        window.open("https://github.com/adityapatel5912", "_blank");
        onClose();
      },
      icon: Github
    },
    {
      id: "action-instagram",
      title: "Follow Instagram",
      subtitle: "@_aditya_patel__9",
      category: "Links",
      action: () => {
        window.open("https://www.instagram.com/_aditya_patel__9/", "_blank");
        onClose();
      },
      icon: Instagram
    }
  ];

  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cmd-menu" className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-x-0 inset-y-0 bg-black/70 backdrop-blur-md"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-luxury-border bg-black bg-opacity-95 text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Input wrap */}
            <div className="flex items-center border-b border-luxury-border px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, skills, social links, actions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-transparent text-[15px] font-sans text-slate-100 outline-none placeholder:text-slate-500"
              />
              <div className="hidden sm:flex items-center space-x-1 rounded bg-zinc-920 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 border border-zinc-800">
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-none">
              {filteredItems.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500">
                  No matches found for <span className="text-slate-300">"{search}"</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Categorize */}
                  {Array.from(new Set(filteredItems.map(i => i.category))).map(cat => (
                    <div key={cat} className="space-y-1">
                      <div className="px-3 py-1 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                        {cat}
                      </div>
                      {filteredItems
                        .filter(i => i.category === cat)
                        .map(item => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={item.action}
                              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left transition duration-150 hover:bg-zinc-900 focus:bg-zinc-900 group outline-none"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-slate-400 group-hover:text-slate-100 group-hover:border-zinc-700 transition">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="text-[14px] font-sans font-medium text-slate-200 group-hover:text-slate-100">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] font-sans text-slate-400 group-hover:text-slate-300">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                            </button>
                          );
                        })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-luxury-border px-4 py-2.5 bg-zinc-950 text-[10px] font-mono text-slate-500">
              <span className="flex items-center">
                Use <code className="mx-1 text-slate-400">↑↓</code> to browse, <code className="mx-1 text-slate-400">Enter</code> to select
              </span>
              <span>ESC to exit</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
