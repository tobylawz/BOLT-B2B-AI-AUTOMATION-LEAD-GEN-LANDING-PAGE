import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView as useFramerInView, useAnimation, animate } from "framer-motion";

// Helper for count up animation
function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useFramerInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const CTAButton = ({
  size = "default",
  className = "",
}: {
  size?: "default" | "large";
  className?: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`group relative inline-flex items-center gap-3 bg-white text-black font-semibold tracking-tight rounded-full transition-all duration-300 hover:bg-neutral-100 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] ${
      size === "large" ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"
    } ${className}`}
  >
    Request an Automation Audit
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8M6 2l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </motion.button>
);

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Mouse Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.04), transparent 40%)`,
        }}
      />

      {/* Aurora Blobs */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-emerald-900/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[100px]"
        />
      </div>

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect
                  x="8"
                  y="8"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#0a0a0a"
                  opacity="0.4"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white relative overflow-hidden group">
              Meridian Systems
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-emerald-500 transform -translate-x-full transition-transform group-hover:translate-x-0" />
            </span>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-all duration-200 border border-neutral-700 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] rounded-full px-5 py-2.5">
            Request Audit
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden z-10">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-neutral-400 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-full px-4 py-2 mb-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI Automation Agency
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              Your operations
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-300 animate-gradient-x">shouldn't run on</span>
              <br />
              manual effort.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Most businesses aren't missing technology — they're missing a
              coherent system. We design automations that fit how your business
              actually works, not how a software vendor thinks it should.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          >
            <CTAButton size="large" />
            <p className="mt-5 text-sm text-neutral-600">
              No commitment. No sales call. Just clarity.
            </p>
          </motion.div>
          
          {/* Animated workflow nodes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16 flex justify-center items-center gap-4 relative max-w-lg mx-auto"
          >
             <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-800 -z-10" />
             {[
               { icon: "📄", label: "Invoice" },
               { icon: "⚡", label: "Process", highlight: true },
               { icon: "📊", label: "CRM" }
             ].map((node, i) => (
               <motion.div
                 key={node.label}
                 whileHover={{ y: -5, scale: 1.05 }}
                 className={`flex flex-col items-center gap-2 p-3 rounded-xl border backdrop-blur-sm ${
                   node.highlight 
                    ? "bg-emerald-900/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                    : "bg-neutral-900/40 border-neutral-800"
                 }`}
               >
                 <span className="text-xl">{node.icon}</span>
                 <span className="text-xs font-mono text-neutral-400">{node.label}</span>
               </motion.div>
             ))}
             {/* Moving data dot */}
             <motion.div 
               className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
               animate={{ left: ["10%", "50%", "90%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               style={{ top: "calc(50% - 4px)" }}
             />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="text-xs tracking-widest uppercase text-neutral-500">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent" />
        </motion.div>
      </section>

      <Divider />

      {/* ── WHO IT'S FOR / NOT FOR ── */}
      <section className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
              Fit
            </span>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
              <h2 className="relative text-4xl sm:text-5xl font-bold tracking-tight">
                This is built for a specific kind of business.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FOR */}
            <AnimatedSection delay={100}>
              <motion.div
                whileHover={{ rotateX: 2, rotateY: -2, zIndex: 10 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="group relative bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 lg:p-10 h-full transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              >
                <div className="flex items-center gap-3 mb-8 transform translate-z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-emerald-400">
                      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">This is for you if…</h3>
                </div>
                <ul className="space-y-5 transform translate-z-5">
                  {[
                    { title: "You run a real operation", desc: "You have processes, people, and workflows — not just an idea." },
                    { title: "Your team does repetitive manual work", desc: "Data entry, report generation, handoffs, follow-ups — tasks that happen on a schedule." },
                    { title: "You want clarity before committing", desc: "You're not looking to spend blindly. You want to understand what's possible first." },
                    { title: "Your tools don't talk to each other", desc: "You're copying data between systems, or relying on people to bridge the gaps." },
                  ].map((item, i) => (
                    <motion.li 
                      key={item.title} 
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 group-hover:shadow-[0_0_8px_#10b981] transition-shadow" />
                      <div>
                        <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                        <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>

            {/* NOT FOR */}
            <AnimatedSection delay={200}>
               <motion.div
                whileHover={{ rotateX: 2, rotateY: 2, zIndex: 10 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="group relative bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/50 rounded-2xl p-8 lg:p-10 h-full transition-all duration-300 hover:border-neutral-600 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-center gap-3 mb-8 transform translate-z-10">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neutral-400">
                      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-400">This isn't for you if…</h3>
                </div>
                <ul className="space-y-5 transform translate-z-5">
                  {[
                    { title: "You're looking for a magic button", desc: "Automation is engineering, not a shortcut. It requires understanding your system first." },
                    { title: "It's a hobby project or experiment", desc: "We work with businesses where the stakes are real and the workflows are established." },
                    { title: "You expect instant results", desc: "Good systems take time to design correctly. We won't rush something that needs to last." },
                    { title: "You want someone to decide for you", desc: "We provide recommendations. You make the call. We don't push, and we don't oversell." },
                  ].map((item, i) => (
                    <motion.li 
                      key={item.title} 
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0" />
                      <div>
                        <p className="text-neutral-400 font-medium text-sm mb-1">{item.title}</p>
                        <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
              Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
              How we approach it.
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              No proprietary frameworks. No jargon. Just a structured way of
              understanding your business before touching anything.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Understand the current system",
                desc: "We map how work actually flows through your business — not how it's supposed to, but how it does.",
              },
              {
                step: "02",
                title: "Identify bottlenecks and waste",
                desc: "We look for the places where time, attention, and money are being spent on things that don't require a human.",
              },
              {
                step: "03",
                title: "Design practical automations",
                desc: "We propose specific, scoped solutions — not a platform overhaul. Each automation has a clear purpose and measurable outcome.",
              },
              {
                step: "04",
                title: "Decide together what makes sense",
                desc: "You review the recommendations. We answer questions. You choose what to move forward with, if anything.",
              },
            ].map((item, i) => (
              <AnimatedSection
                key={item.step}
                delay={i * 150}
                className="relative"
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-2xl p-7 h-full hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs font-mono text-neutral-700 mb-5 block group-hover:text-emerald-500 transition-colors">
                    {item.step}
                  </span>
                  <h3 className="text-white font-semibold text-base mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-neutral-700 z-10 overflow-hidden">
                    <motion.div 
                      className="w-full h-full bg-emerald-500" 
                      animate={{ x: ["-100%", "100%"] }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                    />
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── CREDIBILITY ── */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
              Background
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Built on systems experience,
              <br />
              not theory.
            </h2>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={100}>
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800">
                {[
                  { value: 8, suffix: "+", label: "Years working with operational systems" },
                  { value: 120, suffix: "+", label: "Automations running in production today" },
                  { value: 14, suffix: "", label: "Industries worked across" },
                  { value: 0, suffix: "", label: "Automations built without a clear brief" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-neutral-900/80 backdrop-blur-md p-8 text-center transition-colors hover:bg-neutral-900"
                  >
                    <div className="text-4xl font-bold text-white mb-2">
                      <Counter to={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-xs text-neutral-500 leading-relaxed">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Industry tags */}
          <AnimatedSection delay={200} className="text-center mt-12">
            <p className="text-sm text-neutral-600 mb-5 tracking-wide">
              Work across sectors including
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Professional Services",
                "E-commerce",
                "Healthcare Admin",
                "Logistics",
                "Financial Operations",
                "SaaS",
                "Real Estate",
                "Manufacturing",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="text-xs text-neutral-500 border border-neutral-800 rounded-full px-4 py-2 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>

          {/* Animated mini-diagnostics */}
          <AnimatedSection delay={300} className="mt-16">
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 text-neutral-400">
                  <div className="flex items-end gap-1 h-6">
                     <motion.div className="w-1.5 bg-neutral-700 rounded-t-sm" animate={{ height: ["40%", "80%", "40%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                     <motion.div className="w-1.5 bg-neutral-700 rounded-t-sm" animate={{ height: ["70%", "30%", "70%"] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} />
                     <motion.div className="w-1.5 bg-neutral-700 rounded-t-sm" animate={{ height: ["30%", "90%", "30%"] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full w-12" />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-neutral-700 mt-4">
              Client logos available upon request
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Divider />

      {/* ── AUDIT OFFER ── */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
              The Offer
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Free Automation Audit.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A structured review of your current workflows — where time is
              being lost, where handoffs break down, and where automation would
              actually make a difference.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald-400">
                    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Workflow Review",
                desc: "We examine how work moves through your business — inputs, outputs, and everything in between.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald-400">
                    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Opportunity Mapping",
                desc: "We identify specific points where automation would reduce friction, cost, or error.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald-400">
                    <path d="M4 14l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
                title: "Clear Recommendations",
                desc: "You receive a written summary of findings — useful regardless of whether we work together.",
              },
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                delay={i * 100}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-7 text-center hover:border-emerald-500/50 transition-colors duration-300 h-full group"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/80 group-hover:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300} className="bg-neutral-900/30 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-transparent opacity-50" />
            <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mx-auto relative z-10">
              The audit is genuinely useful on its own. If you take the findings
              and implement them yourself, or work with someone else — that's
              completely fine. We'd rather give you something valuable than
              waste your time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Divider />

      {/* ── WHAT HAPPENS NEXT ── */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-4 block">
              After You Submit
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Here's exactly what happens.
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-neutral-800" />
            <motion.div 
              className="absolute left-[19px] sm:left-[23px] top-0 w-px bg-emerald-500 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div className="space-y-10">
              {[
                {
                  num: "1",
                  title: "We review your submission",
                  desc: "Within 48 hours, we'll look at what you've shared and confirm we're a good fit for the audit.",
                  note: null,
                },
                {
                  num: "2",
                  title: "Short intro call — 20 minutes",
                  desc: "We ask questions about your workflows, team, and where you feel the most friction. You ask us anything you want.",
                  note: "No pitch. No deck. Just a conversation.",
                },
                {
                  num: "3",
                  title: "We do the audit",
                  desc: "Based on what we learn, we map your current workflows and identify automation opportunities. This takes 3–5 business days.",
                  note: null,
                },
                {
                  num: "4",
                  title: "You receive the findings",
                  desc: "A clear, written summary of what we found — what's worth automating, what isn't, and why.",
                  note: null,
                },
                {
                  num: "5",
                  title: "You decide what to do next",
                  desc: "If you want to move forward with us, we'll talk about scope and approach. If not, the audit is yours to keep and use however you like.",
                  note: "No pressure. No follow-up sequence.",
                },
              ].map((item, i) => (
                <AnimatedSection key={item.num} delay={i * 150}>
                  <div className="flex gap-6 sm:gap-8 group">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center z-10 group-hover:border-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-emerald-400 transition-colors">
                        {item.num}
                      </span>
                    </div>
                    <div className="pt-2 pb-2">
                      <h3 className="text-white font-semibold text-base mb-2 group-hover:text-emerald-50 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-2">
                        {item.desc}
                      </p>
                      {item.note && (
                        <span className="inline-block text-xs text-neutral-600 border border-neutral-800 rounded-full px-3 py-1">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-600 mb-6 block">
              Get Started
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
              Start with
              <br />
              <span className="text-neutral-500">a conversation.</span>
            </h2>
            <p className="text-neutral-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Request a free Automation Audit. We'll review your workflows,
              identify what's worth automating, and give you a clear picture of
              what's possible — no strings attached.
            </p>
            <CTAButton size="large" />
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-neutral-600">
              {[
                "No commitment required",
                "No sales pressure",
                "Findings are yours to keep",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-emerald-500/70"
                  >
                    <path
                      d="M2 6l2.5 2.5L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-neutral-900 py-10 px-6 relative z-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#0a0a0a" opacity="0.4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-neutral-500 relative overflow-hidden">
              Meridian Systems
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-emerald-500 transform -translate-x-full transition-transform group-hover:translate-x-0" />
            </span>
          </div>
          <p className="text-xs text-neutral-700">
            © {new Date().getFullYear()} Meridian Systems. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
