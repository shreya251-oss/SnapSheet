"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export function Toast({ message, isVisible, type = 'success', duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, duration]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          borderColor: 'rgba(16, 185, 129, 0.3)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          iconColor: '#10B981',
          textColor: '#6EE7B7'
        };
      case 'error':
        return {
          borderColor: 'rgba(248, 113, 113, 0.3)',
          backgroundColor: 'rgba(248, 113, 113, 0.1)',
          iconColor: '#F87171',
          textColor: '#FCA5A5'
        };
      case 'info':
        return {
          borderColor: 'rgba(59, 130, 246, 0.3)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          iconColor: '#3B82F6',
          textColor: '#93C5FD'
        };
      default:
        return {
          borderColor: 'rgba(16, 185, 129, 0.3)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          iconColor: '#10B981',
          textColor: '#6EE7B7'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.3
          }}
          className="fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md"
        >
          <div 
            className="glass-card px-4 sm:px-6 py-3 sm:py-4 w-full"
            style={{
              borderColor: styles.borderColor,
              backgroundColor: styles.backgroundColor,
            }}
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                {type === 'success' && (
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke={styles.iconColor} 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {type === 'error' && (
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke={styles.iconColor} 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {type === 'info' && (
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke={styles.iconColor} 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              {/* Message */}
              <span 
                className="text-sm sm:text-body font-medium flex-1 leading-relaxed"
                style={{ color: styles.textColor }}
              >
                {message}
              </span>

              {/* Close Button - Enhanced Touch Target */}
              <button
                onClick={() => setShow(false)}
                className="flex-shrink-0 p-2 -mr-2 rounded-md hover:bg-white-10 active:bg-white-20 transition-colors duration-200 touch-action-manipulation"
                aria-label="Close notification"
              >
                <svg 
                  className="w-4 h-4 text-white-30 hover:text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Bar - Mobile Optimized */}
            <motion.div
              className="mt-2 sm:mt-3 h-1 bg-white-10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: styles.iconColor } as React.CSSProperties}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 