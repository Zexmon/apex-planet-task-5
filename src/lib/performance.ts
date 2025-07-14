// Performance optimization utilities

export const lazyLoad = (callback: () => void, delay = 0) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

// Intersection Observer for scroll animations
export const createScrollObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options);
};

// Image lazy loading
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preconnect';
  fontLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(fontLink);

  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
  document.head.appendChild(criticalCSS);
};

// Web Vitals optimization
export const optimizeWebVitals = () => {
  // Reduce layout shifts
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Handle resize events to prevent layout shifts
      entry.target.setAttribute('data-resized', 'true');
    }
  });

  // Observe critical elements
  document.querySelectorAll('img, video, iframe').forEach((el) => {
    observer.observe(el);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};