const fs = require('fs');
const path = require('path');

// Ensure directories exist
const aboutDir = path.join(process.cwd(), 'public/images/about');
const teamDir = path.join(process.cwd(), 'public/images/team');

if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}

if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Helper function to create SVG placeholder files
function generateSvgPlaceholder(filename, title, bgColor, textColor = '#ffffff') {
  const svg = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(bgColor, -30)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${title}</text>
</svg>
  `;
  
  fs.writeFileSync(filename, svg);
  console.log(`Created: ${filename}`);
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  const cleanHex = color.replace('#', '');
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  
  const newR = Math.max(0, Math.min(255, r + amount));
  const newG = Math.max(0, Math.min(255, g + amount));
  const newB = Math.max(0, Math.min(255, b + amount));
  
  return '#' + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
}

// Generate person placeholder
function generatePersonPlaceholder(filename, name, role) {
  const svg = `
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="background" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5048E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3D32C4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#background)" />
  <circle cx="400" cy="250" r="180" fill="#7E78E8" />
  <rect x="200" y="430" width="400" height="350" rx="20" fill="#7E78E8" />
  <text x="400" y="650" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">${name}</text>
  <text x="400" y="720" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, sans-serif" font-size="32" fill="white">${role}</text>
</svg>
  `;
  
  fs.writeFileSync(filename, svg);
  console.log(`Created: ${filename}`);
}

// Generate About page images
generateSvgPlaceholder(
  path.join(aboutDir, 'team-meeting.jpg'),
  'Team Collaboration',
  '#2563EB'
);

generateSvgPlaceholder(
  path.join(aboutDir, 'placeholder-about.jpg'),
  'About ESnapup',
  '#5048E5'
);

generateSvgPlaceholder(
  path.join(aboutDir, 'office.jpg'),
  'Modern Office Space',
  '#10B981'
);

generateSvgPlaceholder(
  path.join(aboutDir, 'placeholder-office.jpg'),
  'ESnapup Office',
  '#10B981'
);

generateSvgPlaceholder(
  path.join(aboutDir, 'values.jpg'),
  'Our Core Values',
  '#F59E0B'
);

generateSvgPlaceholder(
  path.join(aboutDir, 'placeholder-values.jpg'),
  'Company Values',
  '#F59E0B'
);

// Generate team member images
generatePersonPlaceholder(
  path.join(teamDir, 'auguste-dubuisson.jpg'),
  'Auguste Dubuisson',
  'Founder & CEO'
);

generatePersonPlaceholder(
  path.join(teamDir, 'placeholder-profile.jpg'),
  'Team Member',
  'ESnapup'
);

console.log('All About page images have been generated successfully!');