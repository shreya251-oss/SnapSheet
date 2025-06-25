"use client";

import { useEffect } from 'react';

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Web Vitals monitoring for Core Web Vitals optimization
export function WebVitals() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid loading in development
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Core Web Vitals
      getCLS((metric) => {
        console.log('CLS:', metric);
        // Send to analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000),
            custom_parameter_1: metric.rating,
          });
        }
      });

      getFID((metric) => {
        console.log('FID:', metric);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
          });
        }
      });

      getLCP((metric) => {
        console.log('LCP:', metric);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
          });
        }
      });

      // Additional metrics
      getFCP((metric) => {
        console.log('FCP:', metric);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
          });
        }
      });

      getTTFB((metric) => {
        console.log('TTFB:', metric);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
          });
        }
      });
    }).catch((error) => {
      console.warn('Web Vitals library not available:', error);
    });
  }, []);

  return null;
}

// SEO Analytics tracking
export function SEOAnalytics() {
  useEffect(() => {
    // Track page view with SEO context
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        content_group1: 'OCR Tool',
        content_group2: 'SnapSheet',
        custom_parameter_1: 'organic_seo',
      });
    }

    // Track scroll depth for engagement
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${scrollPercent}%`,
            value: scrollPercent,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);

  return null;
}

// Conversion tracking for OCR usage
export function ConversionTracking() {
  useEffect(() => {
    // Track file upload events
    const trackFileUpload = (event: CustomEvent) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'file_upload', {
          event_category: 'conversion',
          event_label: 'image_uploaded',
          value: 1,
        });
      }
    };

    // Track conversion events
    const trackConversion = (event: CustomEvent) => {
      const { format, success } = event.detail;
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          event_category: 'ocr_conversion',
          event_label: format,
          value: success ? 1 : 0,
        });
      }
    };

    // Listen for custom events
    window.addEventListener('snapsheet_file_upload', trackFileUpload as EventListener);
    window.addEventListener('snapsheet_conversion', trackConversion as EventListener);

    return () => {
      window.removeEventListener('snapsheet_file_upload', trackFileUpload as EventListener);
      window.removeEventListener('snapsheet_conversion', trackConversion as EventListener);
    };
  }, []);

  return null;
}

// Combined monitoring component
export function SEOMonitoring() {
  return (
    <>
      <WebVitals />
      <SEOAnalytics />
      <ConversionTracking />
    </>
  );
}
