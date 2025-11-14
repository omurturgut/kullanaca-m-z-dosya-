#!/usr/bin/env node

/**
 * Bundle Size Analyzer
 * Analyzes the size of all CSS and JS bundles
 * Usage: node scripts/bundle-analyzer.js
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Bundle Size Analysis');
console.log('=====================================\n');

// File size limits (in KB)
const SIZE_LIMITS = {
  css: 100, // 100 KB
  js: 150, // 150 KB
  image: 500, // 500 KB
};

// Files to analyze
const bundles = [
  { path: 'css/style.css', type: 'css', name: 'Main CSS' },
  { path: 'js/script.js', type: 'js', name: 'Main JS' },
  { path: 'js/translations.js', type: 'js', name: 'Translations' },
  { path: 'js/monitoring.js', type: 'js', name: 'Performance Monitor' },
  { path: 'js/feature-detection.js', type: 'js', name: 'Feature Detection' },
  { path: 'sw.js', type: 'js', name: 'Service Worker' },
  { path: 'index.html', type: 'html', name: 'HTML' },
];

// Helper functions
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function getGzipEstimate(bytes) {
  // Rough estimate: gzip typically reduces by 60-80%
  const gzipRatio = 0.3; // 70% reduction
  return Math.round(bytes * gzipRatio);
}

function analyzeBundle(bundlePath, type, name) {
  const fullPath = path.join(__dirname, '..', bundlePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${name}: File not found`);
    return null;
  }

  const stats = fs.statSync(fullPath);
  const sizeBytes = stats.size;
  const sizeKB = sizeBytes / 1024;
  const gzipBytes = getGzipEstimate(sizeBytes);
  const gzipKB = gzipBytes / 1024;

  const limit = SIZE_LIMITS[type] || 200;
  const status = sizeKB > limit ? '❌ TOO LARGE' : '✅ OK';
  const percentage = ((sizeKB / limit) * 100).toFixed(0);

  console.log(`${status} ${name}`);
  console.log(`   File: ${bundlePath}`);
  console.log(`   Size: ${formatBytes(sizeBytes)} (${sizeKB.toFixed(2)} KB)`);
  console.log(`   Gzip: ~${formatBytes(gzipBytes)} (${gzipKB.toFixed(2)} KB)`);
  console.log(`   Limit: ${limit} KB (${percentage}% used)`);

  if (sizeKB > limit) {
    console.log(`   ⚠️  Exceeds limit by ${(sizeKB - limit).toFixed(2)} KB`);
  }

  console.log('');

  return {
    name,
    path: bundlePath,
    size: sizeBytes,
    sizeKB,
    gzipKB,
    limit,
    status: sizeKB <= limit,
  };
}

// Analyze all bundles
const results = [];
let totalSize = 0;
let totalGzip = 0;
let failed = 0;

bundles.forEach(({ path: bundlePath, type, name }) => {
  const result = analyzeBundle(bundlePath, type, name);
  if (result) {
    results.push(result);
    totalSize += result.size;
    totalGzip += result.gzipKB * 1024;
    if (!result.status) {
      failed++;
    }
  }
});

// Summary
console.log('=====================================');
console.log('📊 Summary\n');
console.log(`Total Size: ${formatBytes(totalSize)}`);
console.log(`Total Gzip: ~${formatBytes(totalGzip)}`);
console.log(`Files Analyzed: ${results.length}`);
console.log(`Files OK: ${results.length - failed}`);

if (failed > 0) {
  console.log(`Files Too Large: ${failed}`);
  console.log('\n⚠️  WARNING: Some bundles exceed size limits!');
  console.log('Consider:');
  console.log('  - Minifying CSS/JS files');
  console.log('  - Removing unused code');
  console.log('  - Code splitting');
  console.log('  - Lazy loading non-critical resources');
} else {
  console.log('\n✅ All bundles are within size limits!');
}

console.log('=====================================\n');

// Recommendations
console.log('💡 Recommendations:\n');

results.forEach((result) => {
  const usage = (result.sizeKB / result.limit) * 100;

  if (usage > 80) {
    console.log(`⚠️  ${result.name}: ${usage.toFixed(0)}% of limit used`);
    console.log('   Consider optimization\n');
  }
});

// Exit with error if any bundle is too large
if (failed > 0) {
  process.exit(1);
}
