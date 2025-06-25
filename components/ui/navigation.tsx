"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="design-container">
        <div className="flex items-center justify-between h-12 sm:h-auto">
          {/* Logo - Mobile Optimized */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
              {/* Original OCR logo icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="url(#logo-gradient)"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="url(#logo-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="url(#logo-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Snap<span className="gradient-text-green">Sheet</span>
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Theme Toggle - Desktop First */}
            <ThemeToggle />
            
            <a
              href="https://github.com/shreya251-oss/SnapSheet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cursor-purple transition-colors duration-300 font-medium opacity-60 hover:opacity-100 flex items-center gap-2 text-sm lg:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden lg:inline">GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 -mr-3 hover:text-cursor-purple transition-colors duration-300 touch-action-manipulation"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 pt-3 border-t border-white-10"
            style={{ borderColor: 'var(--border-primary)' } as React.CSSProperties}
          >
            <div className="flex flex-col space-y-1">
              {/* Theme Toggle - Mobile First */}
              <div className="py-3 px-2 flex items-center justify-between">
                <span 
                  className="font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Theme
                </span>
                <ThemeToggle />
              </div>
              
              <a
                href="https://github.com/shreya251-oss/SnapSheet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cursor-purple transition-colors duration-300 font-medium opacity-60 hover:opacity-100 py-3 px-2 rounded-lg hover:bg-white-10 active:bg-white-20 flex items-center gap-3 touch-action-manipulation"
                style={{ 
                  color: 'var(--text-secondary)',
                  '--hover-bg': 'var(--glass-bg)'
                } as React.CSSProperties}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}; 