/**
 * Script para generar iconos PWA desde favicon.ico
 * Requiere: sharp (npm install sharp --save-dev)
 * 
 * Uso: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Tamaños requeridos para PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Crear iconos SVG básicos como placeholders
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0066cc"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">SF</text>
</svg>`;
};

// Generar iconos SVG
sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const svgPath = path.join(__dirname, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✓ Generado icon-${size}x${size}.svg`);
});

console.log('\nNota: Estos son iconos SVG de placeholder.');
console.log('Para producción, convierte estos SVG a PNG o genera iconos desde tu diseño.');
console.log('\nPuedes convertir SVG a PNG usando herramientas como:');
console.log('- ImageMagick: convert icon-192x192.svg icon-192x192.png');
console.log('- Online: https://cloudconvert.com/svg-to-png');

