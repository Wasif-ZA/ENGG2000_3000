"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Overview", href: "#project-overview" },
    { name: "Simulation", href: "#code-demo" },
    { name: "Architecture", href: "#architecture" },
    { name: "Setup", href: "#installation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-6 py-3 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:border-cyan-500/30">

          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="h-2 w-2 bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-transform group-hover:scale-150" />
            <span className="font-mono text-lg font-bold tracking-widest text-gray-100 transition-colors group-hover:text-cyan-400">
              BR // CCP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative font-mono text-xs uppercase tracking-wider text-gray-400 transition-colors hover:text-cyan-400"
                  >
                    <span className="mr-1 text-cyan-900">//</span>
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* GitHub CTA */}
              <li>
                <a
                  href="https://github.com/Wasif-ZA/BladeRunner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs font-bold uppercase text-white transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="group relative ml-auto h-8 w-8 lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col items-end gap-1.5">
              <span className={`h-0.5 w-6 bg-cyan-500 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-4 bg-cyan-500 transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-cyan-500 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-2 rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-mono text-sm uppercase tracking-wider text-gray-300 hover:text-cyan-400"
                    >
                      <span className="mr-2 text-cyan-800">&gt;</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;