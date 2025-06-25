"use client";

import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Software Application Schema for SnapSheet
export const snapsheetSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SnapSheet",
  "description": "AI-powered OCR tool that transforms images into structured spreadsheets using Gemini AI. Convert screenshots, documents, and images to CSV or Excel format for Busy accounting software with 97%+ accuracy.",
  "url": "https://snapsheet.heyadrsh.tech",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "creator": {
    "@type": "Person",
    "name": "Shreya",
    "url": "https://github.com/shreya251-oss"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SnapSheet",
    "url": "https://snapsheet.heyadrsh.tech"
  },
  "featureList": [
    "OCR table converter",
    "Image to CSV conversion",
    "Image to Excel conversion",
    "Busy accounting software integration",
    "GST invoice processing",
    "AI-powered data extraction",
    "Drag and drop file upload",
    "Real-time preview",
    "Multiple file format support"
  ],
  "screenshot": "https://snapsheet.heyadrsh.tech/og-image.jpg",
  "softwareVersion": "1.0.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "keywords": "OCR, table converter, image to CSV, image to Excel, Busy accounting, GST invoice, data extraction, AI OCR",
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "softwareRequirements": "Web browser with JavaScript support",
  "memoryRequirements": "Minimal",
  "storageRequirements": "No local storage required"
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SnapSheet",
  "url": "https://snapsheet.heyadrsh.tech",
  "logo": "https://snapsheet.heyadrsh.tech/icon-512.png",
  "description": "AI-powered OCR tool for converting images to structured spreadsheets",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Shreya",
    "url": "https://github.com/shreya251-oss"
  },
  "sameAs": [
    "https://github.com/shreya251-oss"
  ]
};

// WebSite Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SnapSheet",
  "url": "https://snapsheet.heyadrsh.tech",
  "description": "Transform images into structured spreadsheets using Gemini AI",
  "publisher": {
    "@type": "Organization",
    "name": "SnapSheet"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://snapsheet.heyadrsh.tech/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// BreadcrumbList Schema
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://snapsheet.heyadrsh.tech"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "OCR Table Converter",
      "item": "https://snapsheet.heyadrsh.tech"
    }
  ]
};

// HowTo Schema for conversion process
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Convert Images to Excel with SnapSheet",
  "description": "Step-by-step guide to convert images to CSV or Excel format using SnapSheet OCR converter",
  "image": "https://snapsheet.heyadrsh.tech/og-image.jpg",
  "totalTime": "PT2M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Image file (JPEG, PNG, GIF, BMP, WebP)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "SnapSheet OCR Converter"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Upload Image",
      "text": "Drag and drop your image file or click to browse and select an image containing tabular data.",
      "image": "https://snapsheet.heyadrsh.tech/step1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Choose Format",
      "text": "Select either CSV for general use or Excel (Busy) for accounting software integration.",
      "image": "https://snapsheet.heyadrsh.tech/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Convert & Download",
      "text": "Click convert and download your structured data file or copy to clipboard.",
      "image": "https://snapsheet.heyadrsh.tech/step3.jpg"
    }
  ]
};

// FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SnapSheet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SnapSheet is an AI-powered OCR tool that transforms images into structured spreadsheets using Gemini AI. It converts screenshots, documents, and images to CSV or Excel format with 97%+ accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Does SnapSheet support Busy accounting software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SnapSheet has specialized Excel format conversion optimized for Busy accounting software, including GST invoice processing and Indian accounting standards."
      }
    },
    {
      "@type": "Question",
      "name": "What file formats does SnapSheet support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SnapSheet supports JPEG, PNG, GIF, BMP, and WebP image formats up to 10MB in size."
      }
    },
    {
      "@type": "Question",
      "name": "Is SnapSheet free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SnapSheet is completely free to use with no signup required. Simply upload your image and convert it to CSV or Excel format instantly."
      }
    }
  ]
};
