// Responsive design utilities and browser compatibility helpers

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const getCurrentBreakpoint = () => {
    const width = window.innerWidth;
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  return {
    getCurrentBreakpoint,
    isMobile: () => window.innerWidth < breakpoints.md,
    isTablet: () => window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
    isDesktop: () => window.innerWidth >= breakpoints.lg,
  };
};

// Browser compatibility checks
export const browserSupport = {
  supportsWebP: () => {
    const elem = document.createElement('canvas');
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },
  
  supportsIntersectionObserver: () => {
    return 'IntersectionObserver' in window;
  },
  
  supportsServiceWorker: () => {
    return 'serviceWorker' in navigator;
  },
  
  supportsLocalStorage: () => {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
  
  supportsTouch: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
};

// CSS feature detection
export const cssSupport = {
  supportsGrid: () => {
    const div = document.createElement('div');
    div.style.display = 'grid';
    return div.style.display === 'grid';
  },
  
  supportsFlexbox: () => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    return div.style.display === 'flex';
  },
  
  supportsCustomProperties: () => {
    return window.CSS && window.CSS.supports && window.CSS.supports('--test', '0');
  },
  
  supportsBackdropFilter: () => {
    return CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
  },
};

// Device detection
export const deviceInfo = {
  getUserAgent: () => navigator.userAgent,
  
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  
  isAndroid: () => /Android/.test(navigator.userAgent),
  
  isSafari: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  
  isChrome: () => /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  
  isFirefox: () => /Firefox/.test(navigator.userAgent),
  
  isEdge: () => /Edge/.test(navigator.userAgent),
};

// Performance helpers for different devices
export const performanceOptimizations = {
  // Reduce animations on low-end devices
  shouldReduceMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Adapt quality based on connection
  getConnectionQuality: () => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (!connection) return 'unknown';
    
    const effectiveType = connection.effectiveType;
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'poor';
      case '3g':
        return 'good';
      case '4g':
        return 'excellent';
      default:
        return 'unknown';
    }
  },
  
  // Memory-based optimizations
  getDeviceMemory: () => {
    return (navigator as any).deviceMemory || 4; // Default to 4GB
  },
  
  // CPU core count
  getCPUCores: () => {
    return navigator.hardwareConcurrency || 4; // Default to 4 cores
  },
};

// Accessibility helpers
export const a11ySupport = {
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },
  
  prefersDarkMode: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  
  supportsScreenReader: () => {
    return window.speechSynthesis !== undefined;
  },
};

// Cross-browser polyfills
export const addPolyfills = () => {
  // IntersectionObserver polyfill for older browsers
  if (!browserSupport.supportsIntersectionObserver()) {
    console.warn('IntersectionObserver not supported, consider adding a polyfill');
  }
  
  // Add smooth scroll fallback for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Simple smooth scroll implementation
    const smoothScrollTo = (element: Element) => {
      const start = window.pageYOffset;
      const target = element.getBoundingClientRect().top + start;
      const duration = 1000;
      const startTime = performance.now();
      
      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        
        window.scrollTo(0, start + (target - start) * ease);
        
        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };
      
      requestAnimationFrame(scroll);
    };
    
    // Override smooth scroll behavior
    (Element.prototype as any).scrollIntoView = function(options: any) {
      if (options && options.behavior === 'smooth') {
        smoothScrollTo(this);
      } else {
        // Use native implementation for instant scroll
        Element.prototype.scrollIntoView.call(this, options);
      }
    };
  }
};