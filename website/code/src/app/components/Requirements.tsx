"use client";
import React from "react";
import { motion } from "framer-motion";

const Requirements: React.FC = () => {
  return (
    <section id="requirements" className="h-full">
      <div className="h-full border border-cyan-900/30 bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)] flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="w-3 h-3 rounded-sm bg-cyan-900 border border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] rotate-45" />
          <h2 className="text-xl font-mono uppercase tracking-widest text-cyan-400">
            System Prerequisites
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">

          {/* Hardware Module */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-l-2 border-cyan-500/50 pl-3">
              Hardware Specifications
            </h3>
            <div className="space-y-3">
              <SpecCard
                title="Microcontroller"
                value="ESP32 S3"
                desc="Primary carriage control unit & networking node."
              />
              <SpecCard
                title="Sensors"
                value="IR Photodiodes"
                desc="Required for track alignment & checkpoint detection."
              />
              <SpecCard
                title="Actuators"
                value="DC Motors / Servos"
                desc="Door actuation and main drive train."
              />
            </div>
          </div>

          {/* Software Module */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-l-2 border-blue-500/50 pl-3">
              Software Environment
            </h3>
            <div className="space-y-3">
              <RequirementItem label="Java Development Kit" value="JDK 11+" />
              <RequirementItem label="IDE Platform" value="VS Code + Java Ext" />
              <RequirementItem label="Dependency" value="org.json Library" highlight />
              <RequirementItem label="Network" value="2.4GHz Wi-Fi" />
              <RequirementItem label="Embedded Toolchain" value="Arduino IDE / PlatformIO" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Helper Components ---

const SpecCard: React.FC<{ title: string; value: string; desc: string }> = ({ title, value, desc }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="bg-white/5 border border-white/10 p-4 rounded group hover:border-cyan-500/30 transition-colors"
  >
    <div className="flex justify-between items-start mb-1">
      <span className="text-xs text-gray-500 font-mono uppercase">{title}</span>
      <span className="text-cyan-300 font-bold font-mono text-sm">{value}</span>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
      {desc}
    </p>
  </motion.div>
);

const RequirementItem: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className={`font-mono text-xs px-2 py-1 rounded ${highlight ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/30' : 'bg-black text-gray-300 border border-white/10'}`}>
      {value}
    </span>
  </div>
);

export default Requirements;