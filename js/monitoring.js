/**
 * Advanced Performance Monitoring for Posthumane
 * Real User Monitoring (RUM) + Core Web Vitals Tracking
 * Version: 2.0.0
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.enabled = true;
    this.reportingEndpoint = null; // Set this to your analytics endpoint
    this.init();
  }

  init() {
    if (!this.enabled) return;

    console.log('[Monitor] Initializing performance monitoring...');

    // Core Web Vitals
    this.measureCLS();
    this.measureFID();
    this.measureLCP();
    this.measureTTFB();
    this.measureFCP();
    this.measureINP();

    // Custom metrics
    this.measurePageLoadTime();
    this.measureResourceTiming();
    this.detectSlowConnections();
    this.monitorErrors();
    this.monitorMemoryUsage();
    this.trackNavigationType();

    // Report on page unload
    this.setupReporting();
  }

  // ========== CORE WEB VITALS ==========

  /**
   * Cumulative Layout Shift (CLS)
   * Target: < 0.1 (Good), < 0.25 (Needs Improvement), > 0.25 (Poor)
   */
  measureCLS() {
    let clsValue = 0;
    let clsEntries = [];
    let sessionValue = 0;
    let sessionEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          // If the entry occurred less than 1 second after the previous entry
          // and less than 5 seconds after the first entry in the session,
          // include the entry in the current session. Otherwise, start a new session.
          if (
            sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          // If the current session value is larger than the current CLS value,
          // update CLS and the entries contributing to it.
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
          }
        }
      }

      this.metrics.cls = clsValue;
      this.report('CLS', clsValue, this.getMetricRating('cls', clsValue));
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  }

  /**
   * First Input Delay (FID)
   * Target: < 100ms (Good), < 300ms (Needs Improvement), > 300ms (Poor)
   */
  measureFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        this.metrics.fid = fid;
        this.report('FID', fid, this.getMetricRating('fid', fid));
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
  }

  /**
   * Largest Contentful Paint (LCP)
   * Target: < 2.5s (Good), < 4s (Needs Improvement), > 4s (Poor)
   */
  measureLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.renderTime || lastEntry.loadTime;

      this.metrics.lcp = lcp;
      this.report('LCP', lcp, this.getMetricRating('lcp', lcp));
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  /**
   * Time to First Byte (TTFB)
   * Target: < 800ms (Good), < 1800ms (Needs Improvement), > 1800ms (Poor)
   */
  measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.metrics.ttfb = ttfb;
      this.report('TTFB', ttfb, this.getMetricRating('ttfb', ttfb));
    }
  }

  /**
   * First Contentful Paint (FCP)
   * Target: < 1.8s (Good), < 3s (Needs Improvement), > 3s (Poor)
   */
  measureFCP() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.report('FCP', entry.startTime, this.getMetricRating('fcp', entry.startTime));
        }
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  }

  /**
   * Interaction to Next Paint (INP)
   * Target: < 200ms (Good), < 500ms (Needs Improvement), > 500ms (Poor)
   */
  measureINP() {
    let maxINP = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const inp = entry.processingEnd - entry.startTime;
        if (inp > maxINP) {
          maxINP = inp;
          this.metrics.inp = inp;
          this.report('INP', inp, this.getMetricRating('inp', inp));
        }
      }
    });

    try {
      observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch (e) {
      // INP not supported in this browser
      console.warn('[Monitor] INP not supported');
    }
  }

  // ========== CUSTOM METRICS ==========

  measurePageLoadTime() {
    window.addEventListener('load', () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        this.metrics.pageLoadTime = loadTime;
        this.report('PageLoadTime', loadTime, this.getMetricRating('pageLoadTime', loadTime));
      }
    });
  }

  measureResourceTiming() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter((r) => r.duration > 1000);

      if (slowResources.length > 0) {
        this.metrics.slowResourceCount = slowResources.length;
        this.report('SlowResources', {
          count: slowResources.length,
          resources: slowResources.slice(0, 5).map((r) => ({
            name: r.name.split('/').pop(),
            duration: Math.round(r.duration),
            size: r.transferSize,
            type: r.initiatorType,
          })),
        });
      }

      // Calculate total resource size
      const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      this.metrics.totalResourceSize = totalSize;
      this.report('TotalResourceSize', Math.round(totalSize / 1024) + ' KB');
    });
  }

  detectSlowConnections() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      this.metrics.connection = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };

      this.report('NetworkInfo', this.metrics.connection);

      // Mark slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.documentElement.classList.add('slow-connection');
        this.report('SlowConnection', connection.effectiveType, 'poor');
      }

      // Listen for connection changes
      connection.addEventListener('change', () => {
        this.report('ConnectionChange', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        });
      });
    }
  }

  monitorErrors() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.report('JSError', {
        message: event.message,
        filename: event.filename?.split('/').pop(),
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack?.split('\n').slice(0, 3).join('\n'),
      }, 'error');
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.report('UnhandledRejection', {
        reason: event.reason?.toString(),
        promise: event.promise,
      }, 'error');
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.report('ResourceError', {
          tagName: event.target.tagName,
          src: event.target.src || event.target.href,
        }, 'error');
      }
    }, true);
  }

  monitorMemoryUsage() {
    if (performance.memory) {
      setInterval(() => {
        const memory = {
          usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576),
          totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576),
          jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
        };

        this.metrics.memory = memory;

        // Warn if memory usage is high
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercent > 80) {
          this.report('HighMemoryUsage', memory, 'warning');
        }
      }, 30000); // Check every 30 seconds
    }
  }

  trackNavigationType() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      this.metrics.navigationType = navigationEntry.type;
      this.report('NavigationType', navigationEntry.type);
    }
  }

  // ========== HELPERS ==========

  getMetricRating(metric, value) {
    const thresholds = {
      cls: { good: 0.1, needsImprovement: 0.25 },
      fid: { good: 100, needsImprovement: 300 },
      lcp: { good: 2500, needsImprovement: 4000 },
      ttfb: { good: 800, needsImprovement: 1800 },
      fcp: { good: 1800, needsImprovement: 3000 },
      inp: { good: 200, needsImprovement: 500 },
      pageLoadTime: { good: 3000, needsImprovement: 5000 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'info';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  report(metric, value, rating = 'info') {
    const colors = {
      good: '#7dd3c0',
      'needs-improvement': '#FFA500',
      poor: '#ff6b6b',
      warning: '#FFA500',
      error: '#ff6b6b',
      info: '#4A9EFF',
    };

    const icons = {
      good: '✓',
      'needs-improvement': '⚠',
      poor: '✗',
      warning: '⚠',
      error: '✗',
      info: 'ℹ',
    };

    const displayValue = typeof value === 'number' ? Math.round(value) : value;

    console.log(
      `%c${icons[rating]} [${metric}] %c${typeof value === 'object' ? JSON.stringify(displayValue) : displayValue}`,
      `color: ${colors[rating]}; font-weight: bold;`,
      'color: inherit;'
    );

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', metric, {
        event_category: 'Performance',
        event_label: rating,
        value: typeof value === 'number' ? Math.round(value) : 0,
        non_interaction: true,
      });
    }

    // Send to custom endpoint if configured
    if (this.reportingEndpoint) {
      this.sendToEndpoint(metric, value, rating);
    }
  }

  sendToEndpoint(metric, value, rating) {
    const data = {
      metric,
      value,
      rating,
      url: location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
    };

    // Use sendBeacon for reliability (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.reportingEndpoint, JSON.stringify(data));
    } else {
      // Fallback to fetch
      fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {}); // Silent fail
    }
  }

  setupReporting() {
    // Report summary on page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportSummary();
      }
    });

    // Also report on pagehide
    window.addEventListener('pagehide', () => {
      this.reportSummary();
    });
  }

  reportSummary() {
    console.groupCollapsed('[Monitor] Performance Summary');
    console.table(this.metrics);
    console.groupEnd();

    // Send batch report
    if (this.reportingEndpoint) {
      this.sendToEndpoint('PerformanceSummary', this.metrics, 'info');
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('performance_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('performance_session_id', sessionId);
    }
    return sessionId;
  }

  getReport() {
    return { ...this.metrics };
  }

  disable() {
    this.enabled = false;
    console.log('[Monitor] Performance monitoring disabled');
  }

  enable() {
    this.enabled = true;
    console.log('[Monitor] Performance monitoring enabled');
  }
}

// ========== INITIALIZATION ==========

// Initialize monitor only if not in development mode or explicitly enabled
const shouldMonitor =
  !window.location.hostname.includes('localhost') &&
  !window.location.hostname.includes('127.0.0.1') ||
  localStorage.getItem('enable_monitoring') === 'true';

if (shouldMonitor || true) { // Always enabled for now
  const monitor = new PerformanceMonitor();

  // Expose to window for debugging
  window.performanceMonitor = monitor;

  // Log startup
  console.log(
    '%c[Posthumane] %cPerformance Monitoring Active',
    'color: #7dd3c0; font-weight: bold; font-size: 14px;',
    'color: inherit;'
  );
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}
