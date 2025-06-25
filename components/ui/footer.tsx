"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="glass-nav border-t mt-16" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="design-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 relative flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#footer-logo-gradient)" />
                  <path d="M2 17L12 22L22 17" stroke="url(#footer-logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="url(#footer-logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Snap<span className="gradient-text-green">Sheet</span>
              </h3>
            </div>
            <p className="text-caption mb-4">
              Transform images into structured spreadsheets using Gemini AI with 97%+ accuracy.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-h3 mb-4" style={{ color: 'var(--text-primary)' }}>Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-caption hover:text-cursor-purple transition-colors">
                  OCR Table Converter
                </Link>
              </li>
              <li>
                <Link href="/busy-excel" className="text-caption hover:text-cursor-purple transition-colors">
                  Busy Excel Integration
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-caption hover:text-cursor-purple transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-h3 mb-4" style={{ color: 'var(--text-primary)' }}>Features</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-caption">Image to CSV Free</span>
              </li>
              <li>
                <span className="text-caption">Image to Excel Converter</span>
              </li>
              <li>
                <span className="text-caption">GST Invoice OCR</span>
              </li>
              <li>
                <span className="text-caption">AI-Powered Data Extraction</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-h3 mb-4" style={{ color: 'var(--text-primary)' }}>Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/shreya251-oss/SnapSheet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caption hover:text-cursor-purple transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://ai.google.dev/gemini-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caption hover:text-cursor-purple transition-colors"
                >
                  Gemini API
                </a>
              </li>
              <li>
                <a 
                  href="https://vercel.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caption hover:text-cursor-purple transition-colors"
                >
                  Powered by Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center" style={{ borderColor: 'var(--border-primary)' }}>
          <p className="text-caption mb-4 sm:mb-0">
            © 2024 SnapSheet. Built with ❤️ by{" "}
            <a 
              href="https://github.com/shreya251-oss" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cursor-purple hover:underline"
            >
              Shreya
            </a>
          </p>
          <div className="flex space-x-6">
            <span className="text-caption">Privacy-First</span>
            <span className="text-caption">No Data Storage</span>
            <span className="text-caption">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
