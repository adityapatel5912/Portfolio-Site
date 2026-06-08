import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { CustomCursor } from "./components/Cursor";
import { MagneticButton } from "./components/MagneticButton";
import { ProjectCard } from "./components/ProjectCard";
import { ArrowUpRight, Check } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Nav scroll check and Active Section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const sections = ["about", "projects", "stack", "content", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Cinematic intro wait
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("adityapatel5912@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.045, delayChildren: 2.1 } 
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.085 }
    }
  };

  const titleMaskVariants = {
    hidden: { y: "120%" },
    visible: { 
      y: "0%", 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-gold-light/40 overflow-x-hidden">
      <CustomCursor />

      {/* Cinematic Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col justify-center items-center pointer-events-none"
          >
             <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gold origin-center w-full max-w-[400px]"
             />
             <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gold origin-center w-full max-w-[400px] mt-12"
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-50 pointer-events-none drop-shadow-[0_0_8px_rgba(193,154,107,0.8)]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.4 }} // After intro
        className={`fixed top-0 w-full z-40 transition-all duration-500 ease-[0.16,1,0.3,1] ${
          scrolled ? "backdrop-blur-xl bg-bg/95 py-4 border-b border-border-color" : "py-8"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-display font-medium text-2xl tracking-tighter">AP</div>
          <div className="hidden md:flex items-center space-x-10 text-sm font-light mt-1">
            {["About", "Projects", "Stack", "Contact"].map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a 
                  key={item} 
                  href={`#${id}`}
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-gold' : 'hover:text-gold'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-400 ease-[0.16,1,0.3,1] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
            <MagneticButton asChild>
               <a 
                 href="https://github.com/adityapatel5912" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center p-2 rounded-full hover:bg-gold/10 transition-colors"
               >
                 <ArrowUpRight className="w-4 h-4 text-blue" />
               </a>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-[1120px] mx-auto px-6 md:px-12">
        {/* HERO SECTION */}
        <section className="relative h-[100svh] flex flex-col justify-center bg-dot-pattern">
          <div className="relative z-10 w-full">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex overflow-hidden pb-4">
              {"ADITYA PATEL".split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={nameVariants}
                  className={`font-display text-[clamp(72px,11vw,130px)] font-light leading-none tracking-[-0.02em] ${char === " " ? "w-[3vw]" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gold origin-left w-full max-w-[800px] mb-8"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.9 }}
              className="space-y-2 md:space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-light text-text-primary">
                Developer. Designer. Founder.
              </h2>
              <p className="font-display italic tracking-wide text-2xl md:text-3xl text-text-secondary">
                Building things people feel, not just use.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="absolute bottom-12 right-6 md:right-12 flex items-center space-x-3 bg-bg-card/80 backdrop-blur-md border border-border-color shadow-sm px-4 py-2 rounded-full"
          >
            <div className="w-2.5 h-2.5 bg-green rounded-full relative">
              <span className="absolute inset-0 rounded-full bg-green animate-ping opacity-75 duration-[1.5s]" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">Open to Work</span>
          </motion.div>

          {/* Animated bouncy chevron */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
            />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="py-[clamp(80px,10vw,140px)] border-t border-border-color"
        >
          <div className="flex items-center space-x-4 mb-20 overflow-hidden">
             <motion.div variants={titleMaskVariants} className="uppercase font-mono text-[10px] tracking-[0.2em] text-gold">01 — About</motion.div>
             <motion.div 
               whileInView={{ scaleX: 1 }} 
               initial={{ scaleX: 0 }} 
               transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
               className="h-px bg-gold flex-1 origin-left opacity-30" 
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
            <div className="absolute left-[-16px] top-0 bottom-0 w-[2px] bg-blue-light/50 hidden md:block" />
            
            <div className="space-y-12">
              <div className="space-y-6 text-text-secondary font-light leading-[1.85] text-lg">
                <p>
                  I'm a Gen-Z founder building premium digital experiences and AI-powered products. With an obsession for cinematic web design and motion-first interfaces, I help brands and founders translate ambitious concepts into highly refined, high-performance platforms.
                </p>
                <p>
                  Beyond writing code, I create developer and founder content on Instagram, sharing the journey of building fast, shipping clean, and designing premium.
                </p>
              </div>

              <div>
                <h3 className="font-mono uppercase text-xs tracking-widest text-text-faint mb-4">Core Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Python", "Supabase", "Vercel", "GSAP", "Framer Motion", "Three.js"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono bg-green-light/30 text-green-accent rounded-full border border-green/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start md:items-end md:text-right">
              <div className="font-display italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-gold-dim max-w-sm mb-12">
                "I don't just write code — I craft experiences."
              </div>
              
              <div className="flex flex-wrap gap-6 md:justify-end">
                {[
                  { name: "GitHub", url: "https://github.com/adityapatel5912" },
                  { name: "LinkedIn", url: "https://linkedin.com/in/aditya-patel-166b5640b" },
                  { name: "Instagram", url: "https://instagram.com/_aditya_patel__9" },
                  { name: "Threads", url: "https://threads.net/@_aditya_patel__9" },
                ].map((social, i) => (
                  <MagneticButton key={social.name} asChild>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-text-primary hover:text-blue-accent transition-colors duration-300 relative group"
                    >
                      {social.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="py-[clamp(80px,10vw,140px)]"
        >
          <div className="flex items-center space-x-4 mb-20 overflow-hidden">
             <motion.div variants={titleMaskVariants} className="uppercase font-mono text-[10px] tracking-[0.2em] text-gold">02 — Projects</motion.div>
             <motion.div 
               whileInView={{ scaleX: 1 }} 
               initial={{ scaleX: 0 }} 
               transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
               className="h-px bg-gold flex-1 origin-left opacity-30" 
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            <ProjectCard 
              delay={0.1}
              className="md:col-span-7 h-[400px] md:h-[500px]"
              number="01"
              title="One8 Sportswear"
              description="Cinematic redesign of Virat Kohli's premium sportswear brand website. Motion-first, dark luxury aesthetic with GSAP animations."
              tags={["Web Design", "GSAP", "Motion"]}
            />
            <ProjectCard 
              delay={0.2}
              className="md:col-span-5 h-[400px] md:h-[500px]"
              number="02"
              title="ApexF1"
              description="F1 companion platform with live race data, driver stats, standings, and race insights for Formula 1 fans."
              tags={["Web App", "Data", "Racing"]}
            />
            
            <ProjectCard 
              delay={0.3}
              className="md:col-span-4 h-[400px]"
              number="03"
              title="FitnessOS"
              description="Premium fitness tracking and workout management platform. Clean dashboard UI with progress analytics and routine builder."
              tags={["Dashboard", "Health", "SaaS"]}
            />
            <ProjectCard 
              delay={0.4}
              className="md:col-span-4 h-[400px]"
              number="04"
              title="Cinematch"
              description="A sleek movie discovery and tracking platform. Browse, search, and curate watchlists with cinematic UI design."
              tags={["Web App", "Entertainment", "UI"]}
            />
            <ProjectCard 
              delay={0.5}
              className="md:col-span-4 h-[400px]"
              number="05"
              title="Travel Planner"
              description="Smart travel planning platform to build itineraries, discover destinations, and organize trips in one place."
              tags={["Web App", "Travel", "Planning"]}
            />

            <div className="md:col-span-3 hidden md:block" />
            <ProjectCard 
              delay={0.6}
              className="md:col-span-6 h-[400px]"
              number="06"
              title="Personal Portfolio"
              description="This website — built with a light luxury editorial aesthetic, custom cursor, cinematic animations, and a refined color system."
              tags={["Portfolio", "Design", "Motion"]}
            />
          </div>
        </motion.section>
        
        {/* STACK SECTION */}
        <motion.section 
          id="stack"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="py-[clamp(80px,10vw,140px)] border-t border-border-color"
        >
          <div className="flex items-center space-x-4 mb-20 overflow-hidden">
             <motion.div variants={titleMaskVariants} className="uppercase font-mono text-[10px] tracking-[0.2em] text-gold">03 — Stack</motion.div>
             <motion.div 
               whileInView={{ scaleX: 1 }} 
               initial={{ scaleX: 0 }} 
               transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
               className="h-px bg-gold flex-1 origin-left opacity-30" 
             />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 w-full max-w-4xl mx-auto">
            <div className="space-y-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold pb-4 border-b border-border-color">Frontend</h4>
              <ul className="space-y-4 font-light text-text-secondary">
                {["Next.js", "TypeScript", "React", "HTML & CSS", "Tailwind CSS"].map(i => <li key={i} className="hover:text-gold transition-colors duration-300">{i}</li>)}
              </ul>
            </div>
            <div className="space-y-8 sm:border-l sm:border-border-color sm:pl-6 md:pl-12">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold pb-4 border-b border-border-color">Backend</h4>
              <ul className="space-y-4 font-light text-text-secondary">
                {["Python", "Supabase", "Node.js", "REST APIs", "Vercel"].map(i => <li key={i} className="hover:text-gold transition-colors duration-300">{i}</li>)}
              </ul>
            </div>
            <div className="space-y-8 sm:border-l sm:border-border-color sm:pl-6 md:pl-12">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold pb-4 border-b border-border-color">Design & Motion</h4>
              <ul className="space-y-4 font-light text-text-secondary">
                {["GSAP", "Framer Motion", "Three.js / R3F", "Figma", "Adobe Suite"].map(i => <li key={i} className="hover:text-gold transition-colors duration-300">{i}</li>)}
              </ul>
            </div>
          </div>
        </motion.section>

      </main>

      {/* CONTENT SECTION */}
      <motion.section 
        id="content"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12%" }}
        className="py-[clamp(80px,10vw,140px)] bg-bg-subtle relative"
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full">
          <div className="flex items-center space-x-4 mb-20 overflow-hidden">
             <motion.div variants={titleMaskVariants} className="uppercase font-mono text-[10px] tracking-[0.2em] text-gold">04 — Content</motion.div>
             <motion.div 
               whileInView={{ scaleX: 1 }} 
               initial={{ scaleX: 0 }} 
               transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
               className="h-px bg-gold flex-1 origin-left opacity-30" 
             />
          </div>

          <div className="flex flex-col items-center text-center space-y-12">
            <div className="overflow-hidden p-2">
              <motion.h2 
                variants={titleMaskVariants}
                className="font-display text-[clamp(44px,6vw,82px)] tracking-[-0.01em] text-text-primary mb-2"
              >
                @_aditya_patel__9
              </motion.h2>
              <p className="font-light text-lg md:text-xl text-text-secondary mt-2">
                Hinglish dev content for Gen-Z founders & developers
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton asChild>
                <a 
                  href="https://instagram.com/_aditya_patel__9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 rounded-full bg-gold text-[#faf8f3] font-mono text-xs uppercase tracking-widest hover:bg-gold-bright hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-200">Instagram</span>
                </a>
              </MagneticButton>
              <MagneticButton asChild>
                 <a 
                  href="https://threads.net/@_aditya_patel__9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 rounded-full bg-blue text-[#ffffff] font-mono text-xs uppercase tracking-widest hover:bg-blue-accent hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-200">Threads</span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section 
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12%" }}
        className="py-[clamp(80px,10vw,140px)] border-t border-border-color bg-bg"
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
          <div className="flex items-center w-full justify-center space-x-4 mb-20 max-w-sm mx-auto overflow-hidden">
             <motion.div whileInView={{ scaleX: 1 }} initial={{ scaleX: 0 }} transition={{ duration: 1.1, delay: 0.2 }} className="h-px bg-gold w-8 origin-right opacity-30" />
             <motion.div variants={titleMaskVariants} className="uppercase font-mono text-[10px] tracking-[0.2em] text-gold">05 — Contact</motion.div>
             <motion.div whileInView={{ scaleX: 1 }} initial={{ scaleX: 0 }} transition={{ duration: 1.1, delay: 0.2 }} className="h-px bg-gold flex-1 origin-left opacity-30" />
          </div>

          <div className="overflow-hidden pb-4">
             <motion.h2 
                variants={titleMaskVariants}
                className="font-display text-[clamp(44px,7vw,96px)] tracking-tight leading-none mb-6"
             >
               Let's Build Something.
             </motion.h2>
          </div>
          
          <p className="font-light text-text-secondary text-lg mb-16 max-w-md mx-auto">
            Open to freelance, collabs, and interesting projects.
          </p>

          <div className="mb-20">
            <MagneticButton asChild>
              <button 
                onClick={handleCopyEmail}
                className={`font-display text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight transition-colors duration-300 block cursor-none ${copied ? 'text-success' : 'hover:text-gold'}`}
              >
                adityapatel5912@gmail.com
              </button>
            </MagneticButton>
          </div>

          <MagneticButton asChild>
            <a 
              href="mailto:adityapatel5912@gmail.com"
              className="inline-flex items-center px-10 py-4 font-mono text-sm uppercase tracking-widest bg-gold text-[#faf8f3] rounded-full group transition-all duration-300 hover:bg-gold-bright hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-200">Get In Touch</span>
            </a>
          </MagneticButton>

          <div className="mt-32 flex flex-wrap justify-center gap-12 sm:gap-16">
            {[
              { name: "GitHub", url: "https://github.com/adityapatel5912", color: "hover:text-blue-accent" },
              { name: "LinkedIn", url: "https://linkedin.com/in/aditya-patel-166b5640b", color: "hover:text-blue-accent" },
              { name: "Instagram", url: "https://instagram.com/_aditya_patel__9", color: "hover:text-gold" },
              { name: "Threads", url: "https://threads.net/@_aditya_patel__9", color: "hover:text-gold" },
            ].map(social => (
              <MagneticButton key={social.name} asChild>
                <a 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 opacity-80 text-text-secondary ${social.color}`}
                >
                  {social.name}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border-color text-center pb-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-faint flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2025 Aditya Patel</span>
          <span className="hidden sm:inline">·</span>
          <span>Designed & Built with intention.</span>
        </p>
      </footer>

      {/* CLIPBOARD TOAST */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: -16 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-gold text-[#faf8f3] px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest z-[200] shadow-xl flex items-center space-x-3 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
            >
              <Check className="w-4 h-4 text-[#faf8f3]" />
            </motion.div>
            <span>Email copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

