// Performance monitoring utilities

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startTimer(name) {
    this.metrics.set(name, performance.now());
  }

  endTimer(name) {
    const startTime = this.metrics.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      this.metrics.delete(name);
      return duration;
    }
  }

  measureAsync(name, asyncFn) {
    return async (...args) => {
      this.startTimer(name);
      try {
        const result = await asyncFn(...args);
        this.endTimer(name);
        return result;
      } catch (error) {
        this.endTimer(name);
        throw error;
      }
    };
  }

  measureRender(componentName, renderFn) {
    return (...args) => {
      this.startTimer(`${componentName}-render`);
      const result = renderFn(...args);
      // Use nextTick to measure after DOM update
      this.$nextTick(() => {
        this.endTimer(`${componentName}-render`);
      });
      return result;
    };
  }

  // Memory usage monitoring
  logMemoryUsage(label = 'Memory Usage') {
    if (performance.memory) {
      const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
      console.log(`📊 ${label}:`, {
        used: `${(usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      });
    }
  }

  // Bundle size analysis
  analyzeBundleSize() {
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Bundle Analysis: Run `npm run build --report` to analyze bundle size');
    }
  }
}

// Debounce utility for search and filters
export function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle utility for scroll events
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading utility
export function createLazyLoader(threshold = 0.1) {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.dispatchEvent(new CustomEvent('lazy-load'));
      }
    });
  }, { threshold });
}

// Performance-optimized array operations
export const ArrayUtils = {
  // Chunked processing for large arrays
  processInChunks(array, chunkSize, processor) {
    return new Promise((resolve) => {
      let index = 0;
      const results = [];
      
      function processChunk() {
        const chunk = array.slice(index, index + chunkSize);
        results.push(...processor(chunk));
        index += chunkSize;
        
        if (index < array.length) {
          setTimeout(processChunk, 0); // Allow UI to update
        } else {
          resolve(results);
        }
      }
      
      processChunk();
    });
  },

  // Efficient filtering with early exit
  fastFilter(array, predicate, maxResults = Infinity) {
    const results = [];
    for (let i = 0; i < array.length && results.length < maxResults; i++) {
      if (predicate(array[i], i)) {
        results.push(array[i]);
      }
    }
    return results;
  }
};

export default new PerformanceMonitor();