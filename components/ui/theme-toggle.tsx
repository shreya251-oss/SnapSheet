"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 animate-pulse" />
    );
  }

  // Component to render after mounting
  return <MountedThemeToggle />;
};

const MountedThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const iconStyle: React.CSSProperties = {
    color: theme === 'light' ? '#F59E0B' : '#60A5FA',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:scale-110 active:scale-95 transition-all duration-300 touch-action-manipulation"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6 sm:w-7 sm:h-7">
        {/* Sun Icon - Light Mode */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={iconStyle}
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <circle cx="12" cy="12" r="5" strokeWidth={2.5} />
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth={2.5} />
        </motion.svg>

        {/* Moon Icon - Dark Mode */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={iconStyle}
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth={1.5} />
        </motion.svg>
      </div>
    </button>
  );
}; 