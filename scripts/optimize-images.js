#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP and AVIF formats with retina support
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

// Note: This is a placeholder. In production, you would use sharp:
// const sharp = require('sharp');

const inputDir = path.join(__dirname, '../images');
const outputFormats = ['webp', 'avif'];
const sizes = [1, 2]; // 1x, 2x for retina

console.log('🖼️  Image Optimization Starting...');
console.log('=====================================\n');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.warn('⚠️  Sharp not installed. Install it with: npm install sharp');
  console.warn('⚠️  Image optimization will be skipped.\n');
  process.exit(0);
}

async function optimizeImages() {
  // Check if images directory exists
  if (!fs.existsSync(inputDir)) {
    console.log('✓ Images directory not found. Creating placeholder...');
    fs.mkdirSync(inputDir, { recursive: true });
    console.log('✓ Created images directory at:', inputDir);
    return;
  }

  // Get all image files
  const files = fs.readdirSync(inputDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  if (files.length === 0) {
    console.log('✓ No images found to optimize.\n');
    return;
  }

  console.log(`Found ${files.length} image(s) to optimize:\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    console.log(`\n📸 Processing: ${file}`);

    try {
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

      // Generate WebP and AVIF versions at different sizes
      for (const format of outputFormats) {
        for (const size of sizes) {
          const suffix = size > 1 ? `@${size}x` : '';
          const outputPath = path.join(inputDir, `${baseName}${suffix}.${format}`);

          const targetWidth = size === 2 ? metadata.width * 2 : metadata.width;

          await sharp(inputPath)
            .resize({
              width: Math.min(targetWidth, 2400), // Max 2400px width
              fit: 'inside',
              withoutEnlargement: true,
            })
            .toFormat(format, {
              quality: 85,
              effort: 6, // Higher effort = better compression
            })
            .toFile(outputPath);

          const stats = fs.statSync(outputPath);
          const sizeKB = (stats.size / 1024).toFixed(2);
          console.log(`   ✓ Generated ${baseName}${suffix}.${format} (${sizeKB} KB)`);
          successCount++;
        }
      }
    } catch (error) {
      console.error(`   ✗ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n=====================================');
  console.log(`✓ Optimization complete!`);
  console.log(`  Success: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`  Errors: ${errorCount} files`);
  }
  console.log('=====================================\n');
}

// Run optimization
optimizeImages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
