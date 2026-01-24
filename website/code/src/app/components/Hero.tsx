"use client";
import React, { useEffect, useState } from "react";
import { useAnimate, motion } from "framer-motion";

const Hero: React.FC = () => {
  const [scope, animate] = useAnimate();
  const [size, setSize] = useState<{ columns: number; rows: number }>({
    columns: 0,
    rows: 0,
  });

  useEffect(() => {
    generateGridCount();
    window.addEventListener("resize", generateGridCount);
    return () => window.removeEventListener("resize", generateGridCount);
  }, []);

  const generateGridCount = () => {
    const columns = Math.floor(document.body.clientWidth / 50);
    const rows = Math.floor(document.body.clientHeight / 50);

    setSize({
      columns,
      rows,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = `#${(e.target as HTMLDivElement).id}`;
    animate(id, { backgroundColor: "rgba(6, 182, 212, 0)" }, { duration: 2 });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = `#${(e.target as HTMLDivElement).id}`;
    animate(id, { backgroundColor: "rgba(6, 182, 212, 1)" }, { duration: 0 });
  };

  const scrollToDemo = () => {
    // Smooth scroll to the demo section if it exists on the page
    const demoSection = document.getElementById("code-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      {/* Grid Layer */}
      <div
        ref={scope}
        className="absolute inset-0 grid w-full h-full pointer-events-auto"
        style={{
          gridTemplateColumns: `repeat(${size.columns}, 1fr)`,
          gridTemplateRows: `repeat(${size.rows}, 1fr)`,
        }}
      >
        {[...Array(size.rows * size.columns)].map((_, i) => (
          <div
            key={i}
            id={`square-${i}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="h-full w-full border-[1px] border-white/[0.05] hover:border-transparent transition-colors"
          />
        ))}
      </div>

      {/* Vignette & Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

      {/* Content Layer */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 z-10">

        {/* Main Title */}
        <h1 className="text-center text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 filter drop-shadow-[0_0_35px_rgba(6,182,212,0.3)] mb-4">
          Blade Runner
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-2xl text-center text-lg md:text-xl font-light text-slate-400">
          Distributed Carriage Control System (CCP)
        </p>

        {/* System Specs HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-4xl px-4">
          <TelemetryCard label="Core Logic" value="Java CCP" delay={0.1} />
          <TelemetryCard label="Orchestration" value="MCP Master" delay={0.2} />
          <TelemetryCard label="Protocol" value="UDP / JSON" delay={0.3} />
          <TelemetryCard label="Hardware" value="ESP32 S3" delay={0.4} />
        </div>

        {/* Interactive Button */}
        <motion.button
          onClick={scrollToDemo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto group relative px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-wider overflow-hidden clip-path-slant"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            Initialize System <span className="text-lg">→</span>
          </span>
        </motion.button>
      </div>
    </div>
  );
};

// Helper Component for the HUD Cards
const TelemetryCard: React.FC<{ label: string; value: string; delay: number }> = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-sm flex flex-col items-center justify-center group hover:border-cyan-500/50 transition-colors"
  >
    <span className="text-xs text-slate-500 uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">{label}</span>
    <span className="text-white font-mono font-bold text-lg">{value}</span>
  </motion.div>
);

export default Hero;
