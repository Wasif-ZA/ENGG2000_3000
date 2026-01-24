"use client";
import React from "react";
import { motion } from "framer-motion";

const CodeExplanation: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative border border-cyan-900/30 bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] overflow-hidden">

        {/* Background Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
            <h2 className="text-2xl font-mono uppercase tracking-widest text-cyan-400">
              Technical Schematics
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-gray-500 uppercase tracking-wider">
            Ref: CCP.java // Protocol: UDP
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

          {/* Column 1: System Architecture */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Architecture Card */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4 uppercase tracking-wider">
                <span className="text-cyan-500">01.</span> Distributed Nodes
              </h3>
              <p className="text-gray-400 mb-6 font-light leading-relaxed">
                The system implements a distributed control pattern, delegating specific responsibilities to three primary nodes for optimal latency and fail-safety.
              </p>

              <ul className="space-y-3">
                <NodeItem
                  label="MCP (Master)"
                  desc="Central orchestrator. Handles routing, collision avoidance, and global emergency stops."
                />
                <NodeItem
                  label="CCP (Client)"
                  desc="Java-based carriage brain. Manages local state (doors/motors) and sensors."
                />
                <NodeItem
                  label="ESP32 (Hardware)"
                  desc="Embedded layer. Translates digital commands into raw motor voltage & IR signals."
                />
              </ul>
            </div>

            {/* Protocol Card */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4 uppercase tracking-wider">
                <span className="text-cyan-500">02.</span> JSON Protocol
              </h3>
              <p className="text-gray-400 mb-4 font-light text-sm">
                Stateless UDP communication payload structure.
              </p>
              <CodeBlock
                filename="payload.json"
                code={`{
  "client_type": "ccp",
  "message": "STRQ",      // Status Request
  "client_id": "BR12",    // Unit Identifier
  "timestamp": "2026-01-24T14:30:00"
}`}
              />
            </div>
          </motion.div>

          {/* Column 2: Engineering Patterns (Code Logic) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 border border-white/10 rounded-lg p-6 hover:border-cyan-500/30 transition-colors"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6 uppercase tracking-wider">
              <span className="text-cyan-500">03.</span> Core Logic Patterns
            </h3>

            <div className="space-y-8">
              {/* Pattern 1 */}
              <div>
                <h4 className="text-cyan-300 font-mono text-sm font-bold mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-cyan-600 rounded-sm"></span>
                  Finite State Machine
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Strict transitions in <code className="text-orange-400">CCP.java</code> prevent hardware hazards (e.g., locking motors while doors are open).
                </p>
                <CodeBlock
                  filename="CCP.java"
                  code={`if (stateManager.getCurrentState() != CCPState.STOPPED) {
    // Force transition before door actuation
    stateManager.updateState(CCPState.STOPPED);
    updateLEDState();
}`}
                />
              </div>

              {/* Pattern 2 */}
              <div>
                <h4 className="text-cyan-300 font-mono text-sm font-bold mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-600 rounded-sm"></span>
                  Async Concurrency
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Utilizes <code className="text-orange-400">ScheduledExecutorService</code> for non-blocking heartbeats, ensuring the main thread remains responsive to UDP packets.
                </p>
                <CodeBlock
                  filename="CCP.java"
                  code={`heartbeatExecutor.scheduleAtFixedRate(() -> {
    try {
        sendHeartbeat(); // UDP Packet Dispatch
    } catch (Exception e) {
        logError(e);
    }
}, 0, 2, TimeUnit.SECONDS);`}
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- Helper Components ---

const NodeItem: React.FC<{ label: string; desc: string }> = ({ label, desc }) => (
  <div className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
    <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-xs rotate-45 shrink-0" />
    <div>
      <strong className="block text-gray-200 font-mono text-sm">{label}</strong>
      <span className="text-gray-500 text-xs">{desc}</span>
    </div>
  </div>
);

const CodeBlock: React.FC<{ code: string; filename: string }> = ({ code, filename }) => (
  <div className="rounded overflow-hidden border border-white/10 bg-[#0d0d0d]">
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
      </div>
      <span className="ml-2 font-mono text-[10px] text-gray-500">{filename}</span>
    </div>
    <pre className="p-4 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodeExplanation;
