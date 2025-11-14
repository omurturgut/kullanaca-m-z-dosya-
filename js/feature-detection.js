/**
 * Feature Detection & Progressive Enhancement
 * Posthumane - Browser Capability Detection
 * Version: 2.0.0
 */

class FeatureDetector {
  constructor() {
    this.features = {};
    this.detect();
    this.applyClasses();
    this.setupPolyfills();
  }

  detect() {
    console.log('[Features] Detecting browser capabilities...');

    // Image Format Support
    this.features.webp = this.supportsWebP();
    this.features.avif = this.supportsAVIF();

    // Modern Web APIs
    this.features.serviceWorker = 'serviceWorker' in navigator;
    this.features.intersectionObserver = 'IntersectionObserver' in window;
    this.features.resizeObserver = 'ResizeObserver' in window;
    this.features.mutationObserver = 'MutationObserver' in window;

    // Storage APIs
    this.features.localStorage = this.supportsLocalStorage();
    this.features.sessionStorage = this.supportsSessionStorage();
    this.features.indexedDB = 'indexedDB' in window;

    // Graphics & Media
    this.features.webgl = this.supportsWebGL();
    this.features.webgl2 = this.supportsWebGL2();
    this.features.canvas = this.supportsCanvas();
    this.features.webrtc = this.supportsWebRTC();

    // CSS Features
    this.features.cssGrid = this.supportsCSSGrid();
    this.features.cssFlexbox = this.supportsCSSFlexbox();
    this.features.cssVariables = this.supportsCSSVariables();
    this.features.backdropFilter = this.supportsBackdropFilter();

    // Network APIs
    this.features.fetch = 'fetch' in window;
    this.features.beacon = 'sendBeacon' in navigator;
    this.features.networkInfo = 'connection' in navigator;

    // Performance APIs
    this.features.performanceObserver = 'PerformanceObserver' in window;
    this.features.navigationTiming = 'performance' in window && 'timing' in performance;

    // Device Capabilities
    this.features.touchEvents = this.supportsTouchEvents();
    this.features.pointerEvents = 'PointerEvent' in window;
    this.features.deviceOrientation = 'DeviceOrientationEvent' in window;

    // Modern JavaScript Features
    this.features.promiseWithResolvers = typeof Promise.withResolvers === 'function';
    this.features.asyncAwait = this.supportsAsyncAwait();
    this.features.modules = 'noModule' in document.createElement('script');

    // PWA Features
    this.features.beforeInstallPrompt = 'BeforeInstallPromptEvent' in window;
    this.features.notification = 'Notification' in window;
    this.features.pushManager = 'PushManager' in window;

    // Clipboard API
    this.features.clipboard = navigator.clipboard !== undefined;

    // Battery API
    this.features.battery = 'getBattery' in navigator;

    // Geolocation
    this.features.geolocation = 'geolocation' in navigator;

    // Screen Wake Lock
    this.features.wakeLock = 'wakeLock' in navigator;

    // Web Share API
    this.features.share = navigator.share !== undefined;

    // Payment Request API
    this.features.paymentRequest = 'PaymentRequest' in window;

    // Detect dark mode preference
    this.features.darkMode = this.prefersDarkMode();

    // Detect reduced motion preference
    this.features.reducedMotion = this.prefersReducedMotion();

    // Detect high contrast mode
    this.features.highContrast = this.prefersHighContrast();

    this.logFeatures();
  }

  // ========== IMAGE FORMAT DETECTION ==========

  supportsWebP() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }

  supportsAVIF() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    }
    return false;
  }

  // ========== STORAGE DETECTION ==========

  supportsLocalStorage() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  supportsSessionStorage() {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ========== GRAPHICS DETECTION ==========

  supportsWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      );
    } catch (e) {
      return false;
    }
  }

  supportsWebGL2() {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    } catch (e) {
      return false;
    }
  }

  supportsCanvas() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  supportsWebRTC() {
    return !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      (window.RTCPeerConnection || window.webkitRTCPeerConnection)
    );
  }

  // ========== CSS FEATURE DETECTION ==========

  supportsCSSGrid() {
    return CSS.supports('display', 'grid');
  }

  supportsCSSFlexbox() {
    return CSS.supports('display', 'flex');
  }

  supportsCSSVariables() {
    return CSS.supports('--custom-property', 'value');
  }

  supportsBackdropFilter() {
    return (
      CSS.supports('backdrop-filter', 'blur(10px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
    );
  }

  // ========== DEVICE DETECTION ==========

  supportsTouchEvents() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // ========== PREFERENCES DETECTION ==========

  prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  prefersHighContrast() {
    return window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches;
  }

  // ========== JAVASCRIPT DETECTION ==========

  supportsAsyncAwait() {
    try {
      eval('(async () => {})');
      return true;
    } catch (e) {
      return false;
    }
  }

  // ========== APPLY CLASSES ==========

  applyClasses() {
    const html = document.documentElement;
    const classes = [];

    // Image formats
    classes.push(this.features.webp ? 'webp' : 'no-webp');
    classes.push(this.features.avif ? 'avif' : 'no-avif');

    // APIs
    if (this.features.serviceWorker) classes.push('service-worker');
    if (this.features.intersectionObserver) classes.push('intersection-observer');
    if (this.features.localStorage) classes.push('local-storage');

    // Graphics
    if (this.features.webgl) classes.push('webgl');
    if (this.features.webgl2) classes.push('webgl2');

    // CSS
    if (this.features.cssGrid) classes.push('css-grid');
    if (this.features.cssFlexbox) classes.push('css-flexbox');
    if (this.features.backdropFilter) classes.push('backdrop-filter');

    // Device
    if (this.features.touchEvents) classes.push('touch');
    if (this.features.pointerEvents) classes.push('pointer');

    // Preferences
    if (this.features.darkMode) classes.push('dark-mode');
    if (this.features.reducedMotion) classes.push('reduced-motion');
    if (this.features.highContrast) classes.push('high-contrast');

    // Apply all classes
    html.classList.add(...classes);

    console.log('[Features] Applied classes:', classes.join(', '));
  }

  // ========== POLYFILLS ==========

  setupPolyfills() {
    // IntersectionObserver polyfill (basic implementation)
    if (!this.features.intersectionObserver) {
      console.warn('[Features] IntersectionObserver not supported. Implementing fallback...');

      // Simple fallback: load all lazy images immediately
      document.querySelectorAll('[data-lazy]').forEach((el) => {
        if (el.dataset.src) {
          el.src = el.dataset.src;
        }
      });
    }

    // Fetch polyfill fallback
    if (!this.features.fetch) {
      console.warn('[Features] Fetch API not supported. Using XMLHttpRequest fallback...');
      // Implement XMLHttpRequest wrapper if needed
    }

    // localStorage fallback
    if (!this.features.localStorage) {
      console.warn('[Features] localStorage not supported. Using memory storage...');
      // Implement in-memory storage if needed
    }

    // Backdrop filter fallback
    if (!this.features.backdropFilter) {
      console.warn('[Features] backdrop-filter not supported. Applying fallback styles...');
      document.documentElement.classList.add('no-backdrop-filter');
    }
  }

  // ========== LOGGING ==========

  logFeatures() {
    console.groupCollapsed('%c[Features] Browser Capabilities', 'color: #7dd3c0; font-weight: bold;');

    console.log('%cImage Formats:', 'font-weight: bold;');
    console.log('  WebP:', this.features.webp ? '✓' : '✗');
    console.log('  AVIF:', this.features.avif ? '✓' : '✗');

    console.log('%cWeb APIs:', 'font-weight: bold;');
    console.log('  Service Worker:', this.features.serviceWorker ? '✓' : '✗');
    console.log('  IntersectionObserver:', this.features.intersectionObserver ? '✓' : '✗');
    console.log('  LocalStorage:', this.features.localStorage ? '✓' : '✗');
    console.log('  IndexedDB:', this.features.indexedDB ? '✓' : '✗');

    console.log('%cGraphics:', 'font-weight: bold;');
    console.log('  WebGL:', this.features.webgl ? '✓' : '✗');
    console.log('  WebGL 2:', this.features.webgl2 ? '✓' : '✗');
    console.log('  Canvas:', this.features.canvas ? '✓' : '✗');

    console.log('%cCSS Features:', 'font-weight: bold;');
    console.log('  CSS Grid:', this.features.cssGrid ? '✓' : '✗');
    console.log('  CSS Flexbox:', this.features.cssFlexbox ? '✓' : '✗');
    console.log('  CSS Variables:', this.features.cssVariables ? '✓' : '✗');
    console.log('  Backdrop Filter:', this.features.backdropFilter ? '✓' : '✗');

    console.log('%cDevice:', 'font-weight: bold;');
    console.log('  Touch Events:', this.features.touchEvents ? '✓' : '✗');
    console.log('  Pointer Events:', this.features.pointerEvents ? '✓' : '✗');

    console.log('%cPreferences:', 'font-weight: bold;');
    console.log('  Dark Mode:', this.features.darkMode ? '✓' : '✗');
    console.log('  Reduced Motion:', this.features.reducedMotion ? '✓' : '✗');
    console.log('  High Contrast:', this.features.highContrast ? '✓' : '✗');

    console.groupEnd();
  }

  // ========== PUBLIC API ==========

  isSupported(feature) {
    return this.features[feature] === true;
  }

  getFeatures() {
    return { ...this.features };
  }
}

// ========== INITIALIZATION ==========

const featureDetector = new FeatureDetector();

// Expose to window for debugging
window.featureDetector = featureDetector;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FeatureDetector;
}
