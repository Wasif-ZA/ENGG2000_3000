"use client";
import React from "react";
import { motion } from "framer-motion";

const TableOfContents: React.FC = () => {
  const sections = [
    { id: "project-overview", label: "00 // System Abstract", desc: "Overview & Telemetry" },
    { id: "code-demo", label: "01 // Live Simulation", desc: "Interactive CCP Terminal" },
    { id: "architecture", label: "02 // Directory Tree", desc: "File Structure & Modules" },
    { id: "requirements", label: "03 // Prerequisites", desc: "Hardware & Software Specs" },
    { id: "installation", label: "04 // Deployment", desc: "Setup Protocols" },
    // You can add more sections here if needed
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative border-y border-white/10 bg-black/20 backdrop-blur-sm py-10">

        {/* Decorative background scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 px-4">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />
          <h2 className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap">
            System Navigation Index
          </h2>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />
        </div>

        {/* Navigation Grid */}
        <nav>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 relative z-10">
            {sections.map((section, idx) => (
              <motion.li
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <a
                  href={`#${section.id}`}
                  className="group flex flex-col p-4 border border-white/5 hover:border-cyan-500/30 bg-white/[0.02] hover:bg-cyan-900/10 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Hover Corner Accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-transparent group-hover:border-r-cyan-500/50 transition-all duration-300" />

                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-gray-500 group-hover:text-cyan-400 text-xs transition-colors uppercase tracking-wider">
                      {section.label}
                    </span>
                    <span className="text-cyan-800 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      →
                    </span>
                  </div>

                  <span className="text-gray-300 text-sm font-light group-hover:text-white transition-colors">
                    {section.desc}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

      </div>
    </section>
  );
};

export default TableOfContents;