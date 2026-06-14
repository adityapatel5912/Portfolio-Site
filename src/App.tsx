import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Command, 
  Github, 
  Instagram, 
  Mail, 
  FileText, 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Compass, 
  Zap, 
  Cpu, 
  Globe, 
  SquareTerminal, 
  Check, 
  CheckCircle2, 
  ArrowUpRight,
  ArrowDown,
  Linkedin,
  AtSign,
  Sun,
  Moon
} from "lucide-react";

import { PROJECTS, SKILLS, TECH_STACK } from "./data";
import { Project } from "./types";
import ProjectCard from "./components/ProjectCard";
import ProjectDetail from "./components/ProjectDetail";
import CommandMenu from "./components/CommandMenu";

// 3b. Action brand elements: Scramble letter generator on hover for navigational buttons
interface InteractiveNavLinkProps {
  label: string;
  onClick: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

function InteractiveNavLink({ label, onClick, buttonRef }: InteractiveNavLinkProps) {
  const [displayText, setDisplayText] = useState(label);
  const isScrambling = useRef(false);
  
  const triggerScramble = () => {
    if (isScrambling.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    isScrambling.current = true;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        label
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return label[index];
            }
            if (char === " " || char === "/") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      iterations += 1 / 3;
      if (iterations >= label.length) {
        clearInterval(interval);
        setDisplayText(label);
        isScrambling.current = false;
      }
    }, 25);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={triggerScramble}
      className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-accent-warm transition duration-200 cursor-pointer relative py-2"
    >
      {displayText}
    </button>
  );
}

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom theme state
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }
    return "dark";
  });

  // Theme synchronization effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Custom interactive state for the contact form
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderSubject, setSenderSubject] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Resume selection dialog state
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Custom high-end state additions
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);
  const [navShrunk, setNavShrunk] = useState(false);

  // Navigation indicator tracker metrics
  const [activeSection, setActiveSection] = useState("hero");
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null);
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Magnetic copy element reference
  const emailRef = useRef<HTMLDivElement>(null);

  // Custom Cursor variables
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const currentMouse = useRef({ x: -100, y: -100 });
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const [cursorClicks, setCursorClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Page load splitting sequencers initial trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSiteLoaded(true);
      document.body.classList.add("site-loaded");
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Detect touch devices
  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    if (!hasTouch) {
      document.body.classList.add("hide-default-cursor");
    }
  }, []);

  // Scroll down navigation shrink monitor
  useEffect(() => {
    const handleScroll = () => {
      setNavShrunk(window.scrollY > 40);
      
      // Dynamic section visibility section underline sync
      const sections = ["about", "projects", "skills", "contact"];
      let currentVisible = "hero";
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentVisible = s;
            break;
          }
        }
      }
      setActiveSection(currentVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute navigation underline alignment
  const updateUnderlineCoordinates = () => {
    const activeEl = navRefs.current[activeSection];
    if (activeEl) {
      const parent = activeEl.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = activeEl.getBoundingClientRect();
        setActiveRect({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    } else {
      setActiveRect(null);
    }
  };

  useEffect(() => {
    updateUnderlineCoordinates();
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener("resize", updateUnderlineCoordinates);
    return () => window.removeEventListener("resize", updateUnderlineCoordinates);
  }, [activeSection]);

  // Synchronize hash updates
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Close menus on navigation
      setIsMobileMenuOpen(false);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Keyboard shortcut listener for Command Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. Scroll Trigger reveals observer configuration
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            
            // Draw horizontal decoration line left -> right on view entry
            const line = entry.target.querySelector(".draw-line-container");
            if (line) {
              line.classList.add("draw-line-active");
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("section").forEach((s) => {
      s.classList.add("scroll-reveal-element");
      observer.observe(s);
    });

    return () => observer.disconnect();
  }, [currentHash]);

  // Custom cursor lerping tracking logic
  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      currentMouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setCursorClicks((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    // Frame lerping animation loop
    let frameId: number;
    const lerpRing = () => {
      const dx = currentMouse.current.x - ringPos.current.x;
      const dy = currentMouse.current.y - ringPos.current.y;

      ringPos.current.x += dx * 0.16;
      ringPos.current.y += dy * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }
      frameId = requestAnimationFrame(lerpRing);
    };
    lerpRing();

    // Link/CTA action hover bindings (scale ring to 60px + color invert)
    const handleMouseOverInteractive = () => setIsCursorHovered(true);
    const handleMouseOutInteractive = () => setIsCursorHovered(false);

    const bindHovers = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOverInteractive);
        el.removeEventListener("mouseleave", handleMouseOutInteractive);
        el.addEventListener("mouseenter", handleMouseOverInteractive);
        el.addEventListener("mouseleave", handleMouseOutInteractive);
      });
    };

    bindHovers();

    const mutObserver = new MutationObserver(bindHovers);
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(frameId);
      mutObserver.disconnect();
    };
  }, [isTouchDevice]);

  // Email magnetic hover computation logic
  const handleEmailMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = emailRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;

    el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
  };

  const handleEmailMouseLeave = () => {
    const el = emailRef.current;
    if (!el) return;
    el.style.transform = `translate3d(0, 0, 0)`;
  };

  const handleRouteNavigate = (hash: string) => {
    window.location.hash = hash;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("adityapatel5912@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) {
      alert("Please check required input parameters: Name, Email & Message body are needed.");
      return;
    }
    
    // Construct rich mailto link to encourage real interaction
    const mailtoSubject = encodeURIComponent(senderSubject || `Portfolio Connect from ${senderName}`);
    const mailtoBody = encodeURIComponent(
      `Hello Aditya,\n\n${senderMessage}\n\nBest regards,\n${senderName}\nEmail: ${senderEmail}`
    );
    
    window.open(`mailto:adityapatel5912@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSenderName("");
      setSenderEmail("");
      setSenderSubject("");
      setSenderMessage("");
    }, 4000);
  };

  // 1b. Name/hero text letters generator with staggering delay timing offsets
  const renderHeroTextStagger = (literal: string) => {
    return literal.split("").map((letter, idx) => (
      <span
        key={idx}
        className="letter-reveal text-text-primary uppercase font-display"
        style={{ animationDelay: `${idx * 40}ms` }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  // Determine active project if routes match #/projects/:id
  const projectDetailMatch = currentHash.match(/^#\/projects\/([a-zA-Z0-9_-]+)$/);
  const activeProjectId = projectDetailMatch ? projectDetailMatch[1] : null;
  const activeProject = PROJECTS.find((p) => p.id === activeProjectId);

  // Icon chooser helper for Skills component
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "SquareTerminal": return <SquareTerminal className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "Globe": return <Globe className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "Cpu": return <Cpu className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "Layers": return <Layers className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "Compass": return <Compass className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      case "Zap": return <Zap className="h-5 w-5 text-accent-warm group-hover:scale-110 transition" />;
      default: return <Code2Icon />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans relative text-text-primary flex flex-col justify-between selection:bg-accent-muted selection:text-text-primary">
      
      {/* 5. Desktop-only Custom Cursor */}
      {!isTouchDevice && (
        <>
          <div 
            ref={dotRef}
            className="fixed top-0 left-0 w-[10px] h-[10px] bg-accent-warm rounded-full pointer-events-none z-[10000] mix-blend-difference" 
            style={{ transform: "translate3d(-100px, -100px, 0)", pointerEvents: "none" }}
          />
          <div 
            ref={ringRef}
            className={`fixed top-0 left-0 rounded-full border border-accent-warm pointer-events-none z-[9999] transition-[width,height,background-color,margin] duration-300 ease-out ${
              isCursorHovered 
                ? "w-[60px] h-[60px] bg-accent-warm/15 mix-blend-difference border-transparent" 
                : "w-[36px] h-[36px]"
            }`}
            style={{ 
              transform: "translate3d(-100px, -100px, 0)",
              pointerEvents: "none",
              marginTop: isCursorHovered ? "-12px" : "0px",
              marginLeft: isCursorHovered ? "-12px" : "0px",
            }}
          />
          {cursorClicks.map((click) => (
            <div
              key={click.id}
              className="fixed w-4 h-4 rounded-full border border-accent-warm pointer-events-none z-[10001] animate-ping"
              style={{
                left: click.x - 8,
                top: click.y - 8,
                pointerEvents: "none",
                animationDuration: "0.5s"
              }}
              onAnimationEnd={() => {
                setCursorClicks((prev) => prev.filter((c) => c.id !== click.id));
              }}
            />
          ))}
        </>
      )}

      {/* 1. Page Load Splitting panels */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="split-loader-panel loader-panel-top" />
        <div className="split-loader-panel loader-panel-bottom" />
      </div>

      {/* Background Orbs desaturated & Tech Grid */}
      <div className="absolute inset-x-0 top-0 h-[1000px] pointer-events-none overflow-hidden z-0">
        <div className="absolute left-[15%] top-[10%] h-[350px] w-[350px] rounded-full bg-accent-warm/5 blur-[130px]" />
        <div className="absolute right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-accent-muted/3 blur-[150px]" />
        <div className="absolute top-[75%] left-[25%] h-[350px] w-[350px] rounded-full bg-accent-warm/3 blur-[140px]" />
        
        {/* Crisp Matte Technical Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(138,132,120,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(138,132,120,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_5%2Ctransparent_70%2Ctransparent_100%)]" />
      </div>

      {/* 3. Floating Navigation Header */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        navShrunk 
          ? "bg-bg-secondary/85 border-border shadow-lg" 
          : "bg-transparent border-transparent"
      }`}>
        <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navShrunk ? "h-12" : "h-20"
        }`}>
          
          {/* Logo / Title */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleRouteNavigate("#")}
              className="group cursor-pointer font-display text-base font-bold tracking-tight text-text-primary flex items-center space-x-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-text-primary text-bg-primary font-semibold text-xs tracking-none transform group-hover:scale-105 transition">
                AP
              </div>
              <span className="hidden sm:inline-block hover:text-accent-warm transition">Aditya Patel</span>
            </button>
            <span className="font-mono text-[9px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded-full border border-border">
              FOUNDER-STATION // v1.1
            </span>
          </div>

          {/* Desktop Navigation incorporating sliding underline indicator and scrambled characters */}
          <nav className="hidden md:flex items-center space-x-8 relative py-2">
            {activeRect && (
              <div 
                className="absolute bottom-[-1px] h-[1.5px] bg-accent-warm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  left: `${activeRect.left}px`,
                  width: `${activeRect.width}px`
                }}
              />
            )}
            <InteractiveNavLink 
              label="/ About" 
              onClick={() => handleRouteNavigate("#about")} 
              buttonRef={(el) => { navRefs.current["about"] = el; }}
            />
            <InteractiveNavLink 
              label="/ Projects" 
              onClick={() => handleRouteNavigate("#projects")} 
              buttonRef={(el) => { navRefs.current["projects"] = el; }}
            />
            <InteractiveNavLink 
              label="/ Competencies" 
              onClick={() => handleRouteNavigate("#skills")} 
              buttonRef={(el) => { navRefs.current["skills"] = el; }}
            />
            <InteractiveNavLink 
              label="/ Contact" 
              onClick={() => handleRouteNavigate("#contact")} 
              buttonRef={(el) => { navRefs.current["contact"] = el; }}
            />
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-bg-secondary text-text-secondary hover:text-text-primary hover:border-accent-warm transition duration-200 outline-none cursor-pointer"
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-accent-warm" /> : <Moon className="h-4.5 w-4.5 text-accent-warm" />}
            </button>

            {/* Command Trigger Button */}
            <button
              onClick={() => setIsCommandMenuOpen(true)}
              className="flex items-center space-x-2 rounded-xl border border-border bg-bg-secondary px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:border-accent-warm transition duration-200 outline-none"
            >
              <Command className="h-3.5 w-3.5 text-accent-warm" />
              <span className="hidden sm:inline">Search Terminal</span>
              <kbd className="hidden md:inline-flex items-center bg-bg-elevated px-1.5 py-0.5 text-[9px] font-mono text-text-secondary border border-border rounded">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary hover:text-text-primary transition duration-200 outline-none"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Customization */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-bg-secondary px-6 py-6 space-y-4"
            >
              <button 
                onClick={() => { handleRouteNavigate("#about"); setIsMobileMenuOpen(false); }}
                className="block w-full text-left font-display text-lg font-medium text-text-secondary hover:text-text-primary"
              >
                About
              </button>
              <button 
                onClick={() => { handleRouteNavigate("#projects"); setIsMobileMenuOpen(false); }}
                className="block w-full text-left font-display text-lg font-medium text-text-secondary hover:text-text-primary"
              >
                Top Projects
              </button>
              <button 
                onClick={() => { handleRouteNavigate("#skills"); setIsMobileMenuOpen(false); }}
                className="block w-full text-left font-display text-lg font-medium text-text-secondary hover:text-text-primary"
              >
                Competencies
              </button>
              <button 
                onClick={() => { handleRouteNavigate("#contact"); setIsMobileMenuOpen(false); }}
                className="block w-full text-left font-display text-lg font-medium text-text-secondary hover:text-text-primary"
              >
                Get in Touch
              </button>
              
              <div className="pt-4 border-t border-border flex space-x-4">
                <a href="https://github.com/adityapatel5912" target="_blank" className="text-text-secondary hover:text-text-primary"><Github className="h-4 w-4" /></a>
                <a href="https://www.linkedin.com/in/adityapatel5912/" target="_blank" className="text-text-secondary hover:text-text-primary"><Linkedin className="h-4 w-4" /></a>
                <a href="https://www.instagram.com/_aditya_patel__9/" target="_blank" className="text-text-secondary hover:text-text-primary"><Instagram className="h-4 w-4" /></a>
                <a href="https://www.threads.net/@_aditya_patel__9_" target="_blank" className="text-text-secondary hover:text-text-primary"><AtSign className="h-4 w-4" /></a>
                <a href="mailto:adityapatel5912@gmail.com" className="text-text-secondary hover:text-text-primary"><Mail className="h-4 w-4" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Dynamic View wrapper */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {activeProject ? (
            /* PROJECT SPECIFIC DETAIL CARD VIEW */
            <ProjectDetail 
              key={`detail-${activeProject.id}`}
              project={activeProject} 
              onBack={() => handleRouteNavigate("#projects")} 
              onNavigate={handleRouteNavigate}
            />
          ) : (
            /* CORE LANDING APP CONTENT */
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* HERO SECTION */}
              <section id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-16 sm:pb-24">
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                  
                  {/* Glowing startup-style launch badge */}
                  <div className="stagger-child inline-flex items-center space-x-2 rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3.5 py-1 text-xs font-mono text-accent-warm">
                    <Sparkles className="h-3 w-3 animate-pulse text-accent-warm" />
                    <span>BUILDING AI-POWERED PRODUCTS & DIGITAL EXPERIENCES</span>
                  </div>

                  {/* 1. Name/hero text animates in letter-by-letter with a 40ms stagger */}
                  <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-text-primary uppercase sm:leading-none block h-[1.1em]">
                    {renderHeroTextStagger("Aditya Patel")}
                  </h1>

                  {/* Tagline fades up 300ms after name completes (total ~780ms shift) */}
                  <p 
                    className="font-display text-xl sm:text-3xl font-light text-text-secondary leading-normal max-w-2xl mx-auto opacity-0"
                    style={{
                      opacity: 0,
                      animation: "revealLetter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: "780ms"
                    }}
                  >
                    Software Engineer • Student Developer
                  </p>

                  <p 
                    className="font-sans text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed opacity-0"
                    style={{
                      opacity: 0,
                      animation: "revealLetter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: "900ms"
                    }}
                  >
                    I build high-performance web applications, scalable backend systems, and responsive digital frameworks.
                  </p>

                  {/* Styled buttons */}
                  <div 
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 max-w-md mx-auto opacity-0"
                    style={{
                      opacity: 0,
                      animation: "revealLetter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: "980ms"
                    }}
                  >
                    <button
                      onClick={() => handleRouteNavigate("#projects")}
                      className="shimmer-trigger group w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-accent-warm hover:bg-[#c9a96e] text-bg-primary px-6 py-3 text-xs font-bold tracking-wide transition duration-200 cursor-pointer"
                    >
                      <span className="text-bg-primary">Explore Projects</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform text-bg-primary" />
                    </button>
                    
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm text-text-primary px-6 py-3 text-xs font-semibold tracking-wide transition duration-200 cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5 text-accent-warm" />
                      <span>Download Resume</span>
                    </button>

                    <button
                      onClick={() => handleRouteNavigate("#contact")}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm text-text-primary px-6 py-3 text-xs font-semibold tracking-wide transition duration-200 cursor-pointer"
                    >
                      <span>Contact Me</span>
                    </button>
                  </div>

                  {/* Elegant floating arrow down */}
                  <div className="pt-16 sm:pt-24 flex justify-center animate-bounce">
                    <button 
                      onClick={() => handleRouteNavigate("#about")}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary text-text-secondary hover:text-accent-warm hover:border-accent-warm transition"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </section>

              {/* 6. Section Transition decoration line draws itself when section enters view */}
              <div className="draw-line-container my-4"><div className="draw-line-decor" /></div>

              {/* ABOUT SECTION */}
              <section id="about" className="bg-bg-secondary bg-opacity-70 py-20 sm:py-28 relative">
                <div className="absolute inset-0 bg-bg-primary/30 pointer-events-none" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Visual profile detail */}
                    <div className="lg:col-span-5 space-y-6 stagger-child">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-accent-warm">
                        // THE ADITYA SPECS
                      </div>
                      
                      {/* 6b. Block headings masked reveal */}
                      <div className="masked-reveal-box">
                        <h2 className="masked-reveal-text font-display text-3xl sm:text-4.5xl font-black text-text-primary tracking-tight uppercase leading-none">
                          Fusing tech <br/>and commerce
                        </h2>
                      </div>
                      
                      <div className="p-6 rounded-2xl border border-border bg-bg-secondary/40 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-secondary font-mono">Location</span>
                          <span className="text-text-primary font-sans">Surat, Gujarat, India</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-secondary font-mono">Affiliation</span>
                          <span className="text-text-primary font-sans">Student Developer & Founder</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-secondary font-mono">Core Focus</span>
                          <span className="text-text-primary font-sans">Full-Stack Systems & Web Core</span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Narrative */}
                    <div className="lg:col-span-7 space-y-6 text-text-secondary font-sans leading-relaxed text-sm sm:text-base font-light stagger-child">
                      <p className="text-lg font-sans text-text-primary font-medium">
                        I'm Aditya Patel, a student developer and software engineer focused on designing robust backend infrastructures, clean API design patterns, and responsive user interfaces.
                      </p>
                      
                      <p>
                        My interests sit at the intersection of modern system languages, RESTful microservices, and client-centric application development. I focus on structural integrity, clean code abstractions, and elegant performance optimizations.
                      </p>
                      
                      <p>
                        Currently, I'm refining my competencies across Python, Java, and C/C++ while architecting clean cloud environments and relational database structures. I value performant clean code pipelines, robust API routing, and scalable full-stack applications.
                      </p>
                      
                      {/* Linear styled specs banner */}
                      <div className="pt-4 flex flex-wrap gap-4 items-center font-mono text-[11px] text-text-secondary">
                        <span className="flex items-center"><Check className="mr-1 h-3.5 w-3.5 text-accent-warm" /> High-Performance APIs</span>
                        <span className="flex items-center"><Check className="mr-1 h-3.5 w-3.5 text-accent-warm" /> Relational Data Modeling</span>
                        <span className="flex items-center"><Check className="mr-1 h-3.5 w-3.5 text-accent-warm" /> Pre-Flight Automated DevOps</span>
                      </div>
                    </div>

                  </div>

                </div>
              </section>

              {/* 6. Section Transition decoration line draws itself when section enters view */}
              <div className="draw-line-container my-4"><div className="draw-line-decor" /></div>

              {/* FEATURED PROJECTS SECTION */}
              <section id="projects" className="py-20 sm:py-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header text */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
                  <div className="stagger-child">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1b3] mb-2">
                      // DEVELOPED PROJECTS & INITIATIVES
                    </div>
                    
                    {/* 6b. Block headings masked reveal */}
                    <div className="masked-reveal-box">
                      <h2 className="masked-reveal-text font-display text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
                        Top Projects
                      </h2>
                    </div>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-md mt-4 sm:mt-0 leading-relaxed font-light stagger-child">
                    Each card represents a completed project showcasing actual performance metrics, software architectural plans, and engineering timelines.
                  </p>
                </div>

                {/* Grid incorporating card 3D tilt effects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-child">
                  {PROJECTS.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onSelect={(hash) => handleRouteNavigate(hash)}
                    />
                  ))}
                </div>

              </section>

              {/* 6. Section Transition decoration line draws itself when section enters view */}
              <div className="draw-line-container my-4"><div className="draw-line-decor" /></div>

              {/* SKILLS SECTION */}
              <section id="skills" className="bg-bg-secondary bg-opacity-80 py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  {/* Header */}
                  <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3 stagger-child">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent-warm">
                      // ENGINEERING COMPETENCIES
                    </div>
                    
                    {/* 6b. Block headings masked reveal */}
                    <div className="masked-reveal-box">
                      <h2 className="masked-reveal-text font-display text-3xl sm:text-4.5xl font-black text-text-primary uppercase tracking-tight">
                        Architectural Abilities
                      </h2>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Fusing software design patterns, server side scripting, data modeling, with highly creative rapid prototyping.
                    </p>
                  </div>

                  {/* Skills premium grid cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-child">
                    {SKILLS.map((skill, index) => (
                      <div
                        id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        key={index}
                        className="group p-6 rounded-2xl border border-border bg-bg-secondary/60 hover:bg-bg-elevated hover:border-accent-warm transition duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-primary border border-border group-hover:border-accent-warm transition duration-300">
                            {getSkillIcon(skill.icon)}
                          </div>
                          <div>
                            <h3 className="font-display text-[15px] font-semibold text-text-primary">
                              {skill.name}
                            </h3>
                            <p className="font-sans text-xs text-text-secondary mt-1 lines-clamp-3 leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Power meter */}
                        <div className="pt-6">
                          <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary mb-1.5">
                            <span>Adaptation Capacity</span>
                            <span className="text-text-primary font-semibold">{skill.level}%</span>
                          </div>
                          <div className="h-1 w-full bg-bg-primary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full bg-accent-warm rounded-full"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* 6. Section Transition decoration line draws itself when section enters view */}
              <div className="draw-line-container my-4"><div className="draw-line-decor" /></div>

              {/* TECH STACK & INTEGRATIONS */}
              <section id="stack" className="py-20 sm:py-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-border">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Column Text */}
                  <div className="lg:col-span-5 space-y-4 stagger-child">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent-warm">
                      // DEVELOPMENT INTEGRATIONS
                    </div>
                    
                    {/* 6b. Block headings masked reveal */}
                    <div className="masked-reveal-box">
                      <h2 className="masked-reveal-text font-display text-3xl sm:text-4.5xl font-black text-text-primary uppercase tracking-tight">
                        Tech Stack & Tooling
                      </h2>
                    </div>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
                      My selected software competencies and tools. I optimize each project to guarantee high initial render scores and type-safe backend integrations.
                    </p>
                    
                    <div className="p-5 rounded-2xl bg-bg-secondary border border-border hidden sm:block">
                      <div className="flex items-center space-x-2 text-xs font-mono text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
                        <span>VERIFIED COMPATIBILITY OVER MODERN RUNTIMES</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Grid */}
                  <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-child">
                    {TECH_STACK.map((tech, index) => (
                      <div
                        id={`tech-${tech.name.toLowerCase()}`}
                        key={index}
                        className="p-4 rounded-xl border border-border bg-bg-secondary/80 flex items-center justify-between hover:bg-bg-elevated hover:border-accent-warm transition duration-200"
                      >
                        <div>
                          <p className="font-display text-xs font-bold text-text-primary">{tech.name}</p>
                          <p className="font-mono text-[9px] text-text-secondary uppercase mt-0.5">{tech.category}</p>
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary select-none">⚙</span>
                      </div>
                    ))}
                  </div>

                </div>

              </section>

              {/* 6. Section Transition decoration line draws itself when section enters view */}
              <div className="draw-line-container my-4"><div className="draw-line-decor" /></div>

              {/* CONTACT & CONNECT */}
              <section id="contact" className="border-t border-border bg-bg-primary py-20 sm:py-28 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left details with custom Email Magnetic Pull element */}
                    <div className="lg:col-span-5 space-y-6 stagger-child">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1b4] mb-2">
                          // DIRECT CONNECTION
                        </div>
                        
                        {/* 6b. Block headings masked reveal */}
                        <div className="masked-reveal-box">
                          <h2 className="masked-reveal-text font-display text-3xl sm:text-5xl font-black text-text-primary uppercase tracking-tight">
                            Let's Collaborate
                          </h2>
                        </div>
                      </div>
                      
                      <p className="font-sans text-sm text-text-secondary font-light leading-relaxed">
                        Whether you are looking to audit checkout conversions, launch robust SaaS platforms, build responsive ML-vision algorithms, or simply want to chat product strategy — reach out.
                      </p>

                      <div className="space-y-4 pt-4">
                        
                        {/* 7. Direct mail action link with Magnetic Hover Pull effect */}
                        <div 
                          ref={emailRef}
                          onMouseMove={handleEmailMouseMove}
                          onMouseLeave={handleEmailMouseLeave}
                          onClick={handleCopyEmail}
                          className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm transition-all ease-out duration-300 cursor-pointer group"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-primary border border-border text-text-secondary group-hover:text-text-primary group-hover:border-accent-warm transition">
                              <Mail className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-sans text-xs text-text-secondary font-mono uppercase tracking-tight">Email</p>
                              <p className="font-mono text-xs sm:text-sm text-text-primary">adityapatel5912@gmail.com</p>
                            </div>
                          </div>
                          
                          <span className="font-mono text-[9px] text-text-secondary bg-bg-primary border border-border px-2 py-0.5 rounded uppercase">
                            {isCopied ? "Copied!" : "Copy Link"}
                          </span>
                        </div>

                        {/* Social Links Panel */}
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            href="https://github.com/adityapatel5912"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm transition duration-200 group"
                          >
                            <Github className="h-4 w-4 text-text-secondary group-hover:text-text-primary transition" />
                            <span className="font-mono text-[11px] text-text-primary">GitHub</span>
                            <ArrowUpRight className="h-3 w-3 text-text-secondary ml-auto" />
                          </a>

                          <a
                            href="https://www.linkedin.com/in/adityapatel5912/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm transition duration-200 group"
                          >
                            <Linkedin className="h-4 w-4 text-text-secondary group-hover:text-text-primary transition" />
                            <span className="font-mono text-[11px] text-text-primary">LinkedIn</span>
                            <ArrowUpRight className="h-3 w-3 text-text-secondary ml-auto" />
                          </a>

                          <a
                            href="https://www.instagram.com/_aditya_patel__9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm transition duration-200 group"
                          >
                            <Instagram className="h-4 w-4 text-text-secondary group-hover:text-text-primary transition" />
                            <span className="font-mono text-[11px] text-text-primary">Instagram</span>
                            <ArrowUpRight className="h-3 w-3 text-text-secondary ml-auto" />
                          </a>

                          <a
                            href="https://www.threads.net/@_aditya_patel__9_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-elevated hover:border-accent-warm transition duration-200 group"
                          >
                            <AtSign className="h-4 w-4 text-text-secondary group-hover:text-text-primary transition" />
                            <span className="font-mono text-[11px] text-text-primary">Threads</span>
                            <ArrowUpRight className="h-3 w-3 text-text-secondary ml-auto" />
                          </a>
                        </div>

                        <button
                          onClick={() => setShowResumeModal(true)}
                          className="shimmer-trigger w-full flex items-center justify-center space-x-2 rounded-xl bg-bg-secondary hover:bg-bg-elevated text-text-primary px-5 py-3 text-xs font-semibold tracking-wide border border-border transition duration-200 cursor-pointer"
                        >
                          <FileText className="h-4 w-4 text-accent-warm" />
                          <span>Obtain Aditya's Resume Package</span>
                        </button>

                      </div>
                    </div>

                    {/* Right feedback form with Shimmer sweeps on hover of Submit Button */}
                    <div className="lg:col-span-7 bg-bg-secondary border border-border p-6 sm:p-10 rounded-3xl relative stagger-child">
                      <div className="absolute top-4 right-4 text-[10px] font-mono text-text-secondary select-none">
                        SESSION_SECURE_PROTOCOLLING
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary mb-6 uppercase tracking-tight">
                        Transmit Dispatch
                      </h3>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">Sender Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="Alexis Patel"
                              value={senderName}
                              onChange={(e) => setSenderName(e.target.value)}
                              className="w-full rounded-xl border border-border bg-bg-primary p-3 font-sans text-xs sm:text-sm text-text-primary outline-none focus:border-accent-warm transition"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">Return Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="alexis@brand.com"
                              value={senderEmail}
                              onChange={(e) => setSenderEmail(e.target.value)}
                              className="w-full rounded-xl border border-border bg-bg-primary p-3 font-sans text-xs sm:text-sm text-text-primary outline-none focus:border-accent-warm transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">Subject Header</label>
                          <input
                            type="text"
                            placeholder="Collaboration Inquiry - Product Specs"
                            value={senderSubject}
                            onChange={(e) => setSenderSubject(e.target.value)}
                            className="w-full rounded-xl border border-border bg-bg-primary p-3 font-sans text-xs sm:text-sm text-text-primary outline-none focus:border-accent-warm transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">Dispatch Details *</label>
                          <textarea
                            rows={4}
                            required
                            placeholder="Describe your project, timeline, constraints or product ambitions..."
                            value={senderMessage}
                            onChange={(e) => setSenderMessage(e.target.value)}
                            className="w-full rounded-xl border border-border bg-bg-primary p-3 font-sans text-xs sm:text-sm text-text-primary outline-none focus:border-accent-warm transition resize-none"
                          />
                        </div>

                        {/* 7b. CTA Button: Shimmer sweep glare glare animation */}
                        <button
                          type="submit"
                          className="shimmer-trigger w-full flex items-center justify-center space-x-2 rounded-xl bg-accent-warm hover:bg-[#c9a96e] text-bg-primary py-3 text-xs font-bold tracking-wider uppercase transition duration-200 cursor-pointer"
                        >
                          <span className="text-bg-primary">Transmit Request</span>
                          <ArrowRight className="h-3.5 w-3.5 text-bg-primary" />
                        </button>
                      </form>

                      {/* Submitted status indicator overlay */}
                      <AnimatePresence>
                        {formSubmitted && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-bg-primary/95 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-warm/20 text-accent-warm border border-accent-warm/40 mb-4">
                              <CheckCircle2 className="h-8 w-8 text-accent-warm" />
                            </div>
                            <h4 className="font-display text-xl font-bold text-text-primary tracking-tight">TRANSMISSION READY</h4>
                            <p className="font-sans text-xs text-text-secondary max-w-sm mt-2 leading-relaxed">
                              An email composer trigger has been initialized with your custom message parameters. Verify details in your native mail system & send away!
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                  </div>

                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-border bg-bg-primary py-12 md:py-16 text-text-secondary relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-accent-warm" />
              <span>CRAFTED BY ADITYA PATEL // 2026 UTC</span>
            </div>

            <div className="flex flex-wrap gap-4 sm:space-x-6 text-xs font-mono justify-center">
              <a href="https://github.com/adityapatel5912" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">Github</a>
              <a href="https://www.linkedin.com/in/adityapatel5912/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">LinkedIn</a>
              <a href="https://www.instagram.com/_aditya_patel__9/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">Instagram</a>
              <a href="https://www.threads.net/@_aditya_patel__9_" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">Threads</a>
              <a href="mailto:adityapatel5912@gmail.com" className="hover:text-text-primary transition">Inquire</a>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono gap-4">
            <p>DESIGN INSPIRED BY STRIPE + APPLE + LINEAR PLATFORMS</p>
            <p className="text-[#8a8478]">v1.1.0 • SURAT, GUJARAT, INDIA</p>
          </div>
        </div>
      </footer>

      {/* POPUP COMMAND MENU */}
      <CommandMenu 
        isOpen={isCommandMenuOpen} 
        onClose={() => setIsCommandMenuOpen(false)} 
        onNavigate={handleRouteNavigate}
      />

      {/* POPUP INTERACTIVE RESUME SPEC DIALOG */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumeModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-3xl flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-secondary text-left shadow-2xl z-10 max-h-[85vh]"
            >
              {/* Header Sticky */}
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border bg-bg-secondary z-20 shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-warm/10 text-accent-warm border border-accent-warm/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-tight">Aditya Patel's Resume</h3>
                    <p className="font-mono text-[10px] text-text-secondary">FULL_STACK_ARCHITECT // SURAT_IND</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="text-text-secondary hover:text-text-primary transition outline-none p-2 rounded-lg hover:bg-bg-elevated"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Document Area */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar bg-bg-primary">
                
                {/* 1. Header Profile */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h1 className="font-display text-3xl font-bold text-text-primary uppercase tracking-tight">Aditya Patel</h1>
                    <p className="font-mono text-sm text-accent-warm mt-1">Student Developer & Software Engineer</p>
                  </div>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-2xl font-light">
                    Analytical and detail-oriented systems programmer and full-stack software engineer specializing in web application development, server-side APIs, and high-performance databases. Passionate about engineering clean, robust code architecture, safe models, and fluid user interfaces.
                  </p>
                </div>

                {/* 2. Professional Experience */}
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-text-secondary uppercase tracking-widest border-b border-border pb-2 mb-6">Experience & Projects</h4>
                  <div className="space-y-8">
                    
                    <div className="relative pl-4 border-l border-border">
                      <div className="absolute w-2 h-2 rounded-full bg-accent-warm -left-[4.5px] top-1"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h5 className="font-display text-base font-bold text-text-primary">Anime Simulator</h5>
                        <span className="font-mono text-[10px] text-text-secondary">Feb 2026 - Present</span>
                      </div>
                      <p className="text-xs text-accent-warm mb-3 uppercase tracking-tight">Lead Developer & Founder</p>
                      <ul className="list-disc list-inside space-y-1.5 font-sans text-[13px] text-text-secondary">
                        <li>Architected an immersive text-based RPG universe acting dynamically on LLM generation (Gemini AI).</li>
                        <li>Engineered strict contextual prompts matching source lore to limit hallucinations to &lt;2%.</li>
                        <li>Handled real-time resource (cursed energy) database syncing over Supabase for 3,500+ active players.</li>
                      </ul>
                    </div>

                    <div className="relative pl-4 border-l border-border">
                      <div className="absolute w-2 h-2 rounded-full bg-accent-warm/40 -left-[4.5px] top-1"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h5 className="font-display text-base font-bold text-text-primary">Cinematch</h5>
                        <span className="font-mono text-[10px] text-text-secondary">Oct 2025 - Dec 2025</span>
                      </div>
                      <p className="text-xs text-accent-warm mb-3 uppercase tracking-tight">Co-Founder & Tech Lead</p>
                      <ul className="list-disc list-inside space-y-1.5 font-sans text-[13px] text-text-secondary">
                        <li>Built a semantic discovery engine mapping natural language queries to high-fidelity metadata APIs.</li>
                        <li>Implemented a sleek, cinematic dual-panel layout, dropping static load times to 0.4s.</li>
                        <li>Generated 94% match-rate satisfaction over 8,200 curated film recommendations.</li>
                      </ul>
                    </div>

                    <div className="relative pl-4 border-l border-border">
                      <div className="absolute w-2 h-2 rounded-full bg-accent-warm/40 -left-[4.5px] top-1"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h5 className="font-display text-base font-bold text-text-primary">FitnessOS</h5>
                        <span className="font-mono text-[10px] text-text-secondary">Jan 2026 - Present</span>
                      </div>
                      <p className="text-xs text-accent-warm mb-3 uppercase tracking-tight">Lead Software Architect</p>
                      <ul className="list-disc list-inside space-y-1.5 font-sans text-[13px] text-text-secondary">
                        <li>Developed real-time skeletal path-tracing and joint telemetry tracking running via WebCam logic.</li>
                        <li>Built custom audio-driven AI coaching systems operating alongside offline-first SQLite synchronization.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3. Education & Core Focus */}
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-text-secondary uppercase tracking-widest border-b border-border pb-2 mb-6">Education & Core Focus</h4>
                  <div className="relative pl-4 border-l border-border">
                      <div className="absolute w-2 h-2 rounded-full border border-border bg-bg-primary -left-[4.5px] top-1"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h5 className="font-display text-base font-bold text-text-primary">Student / Independent Research</h5>
                      <span className="font-mono text-[10px] text-text-secondary">Surat, Gujarat</span>
                    </div>
                    <p className="font-sans text-[13px] text-text-secondary mt-2">
                      Continuously learning and experimenting with next-gen architectures, including Web3 concepts, AI integration, serverless full-stack web applications, and direct-to-consumer optimization models.
                    </p>
                  </div>
                </div>

                {/* 4. Technical Proficiencies */}
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-text-secondary uppercase tracking-widest border-b border-border pb-2 mb-6">System Capabilities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h6 className="font-display text-xs text-text-primary font-semibold mb-2">Frontend</h6>
                      <ul className="font-mono text-[10px] text-text-secondary space-y-1">
                        <li>React / Next.js</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>Framer Motion</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-display text-xs text-text-primary font-semibold mb-2">Backend</h6>
                      <ul className="font-mono text-[10px] text-text-secondary space-y-1">
                        <li>Node.js / Express</li>
                        <li>Python</li>
                        <li>REST APIs</li>
                        <li>Supabase / SQL</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-display text-xs text-text-primary font-semibold mb-2">AI & Math</h6>
                      <ul className="font-mono text-[10px] text-text-secondary space-y-1">
                        <li>LLM App Development</li>
                        <li>Prompt Engineering</li>
                        <li>Gemini / OpenAI</li>
                        <li>Algorithmic Systems</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-display text-xs text-text-primary font-semibold mb-2">Design & Ops</h6>
                      <ul className="font-mono text-[10px] text-text-secondary space-y-1">
                        <li>Figma UI/UX</li>
                        <li>Wireframing</li>
                        <li>Git / CI-CD</li>
                        <li>Vercel / Cloud Run</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-border bg-bg-secondary z-20 shrink-0">
                <a
                  href="mailto:adityapatel5912@gmail.com?subject=Inquiry: Collaboration & Resume Request"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-accent-warm hover:bg-[#c9a96e] text-bg-primary px-5 py-2.5 text-xs font-bold tracking-wide transition"
                >
                  <Mail className="h-3.5 w-3.5 text-bg-primary" />
                  <span className="text-bg-primary">Connect via Email</span>
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="w-full sm:w-auto rounded-xl border border-border bg-bg-primary px-5 py-2.5 text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-accent-warm transition"
                >
                  Close Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Minimal fallback icon components 
function Code2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-text-secondary">
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}
