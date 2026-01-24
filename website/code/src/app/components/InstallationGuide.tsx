"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const InstallationGuide: React.FC = () => {
  return (
    <section id="installation" className="max-w-4xl mx-auto py-12 px-4">
      <div className="border border-cyan-900/30 bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)]">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <h2 className="text-2xl font-mono uppercase tracking-widest text-cyan-400">
            Deployment Protocols
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          <Step
            number="01"
            title="Clone Repository"
            description="Retrieve the latest source code from the central VCS."
          >
            <CommandBlock command="git clone https://github.com/Wasif-ZA/BladeRunner.git" />
          </Step>

          <Step
            number="02"
            title="Initialize CCP Directory"
            description="Navigate to the Carriage Control Program sector."
          >
            <CommandBlock command="cd BladeRunner/CCP" />
          </Step>

          <Step
            number="03"
            title="Environment Setup"
            description="Configure the Java Runtime Environment and dependencies."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <CheckItem label="Install Java Extension Pack (VS Code)" />
              <CheckItem label="Add JSON-20240303.jar to Classpath" />
              <CheckItem label="Verify UDP Port 3000 Access" />
            </div>
          </Step>
        </div>

      </div>
    </section>
  );
};

// Helper: Individual Step Component
const Step: React.FC<{ number: string; title: string; description: string; children: React.ReactNode }> = ({ number, title, description, children }) => (
  <div className="relative pl-12 border-l border-cyan-900/30 pb-2 last:border-0">
    <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 border border-cyan-500/50 text-[10px] font-bold text-cyan-500 font-mono">
      {number}
    </span>
    <h3 className="text-lg font-bold text-gray-200 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-4 font-light">{description}</p>
    {children}
  </div>
);

// Helper: Interactive Command Block
const CommandBlock: React.FC<{ command: string }> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex items-center justify-between bg-neutral-950 border border-white/10 rounded px-4 py-3 font-mono text-sm">
      <div className="flex items-center overflow-x-auto text-gray-300">
        <span className="text-cyan-500 mr-3 select-none">$</span>
        <span>{command}</span>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 p-1.5 rounded hover:bg-white/10 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
        title="Copy to clipboard"
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
};

// Helper: Checklist Item
const CheckItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-2 rounded border border-transparent hover:border-cyan-900/50 transition-colors">
    <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full" />
    {label}
  </div>
);

export default InstallationGuide;
