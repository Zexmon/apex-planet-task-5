import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { 
  preloadCriticalResources, 
  optimizeWebVitals, 
  registerServiceWorker,
  lazyLoadImages 
} from './lib/performance'
import { addPolyfills } from './lib/responsive'

// Add cross-browser compatibility
addPolyfills();

// Performance optimizations
preloadCriticalResources();
optimizeWebVitals();

// Register service worker for caching
registerServiceWorker();

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
});

createRoot(document.getElementById("root")!).render(<App />);
