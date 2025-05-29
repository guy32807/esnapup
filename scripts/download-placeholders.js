// scripts/download-placeholders.js
const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories
const portfolioDir = path.join(process.cwd(), 'public/images/portfolio');
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// List of projects with their image URLs
const projects = [
  { id: 'card-connect', url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'standards-insight', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'tea-delights', url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'performance-surge', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'healthcare-census', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'restaurant-finder', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'tech-explorer', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'careassist-pro', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
];

// Function to create a SVG placeholder if downloading fails
function createSvgPlaceholder(filename, text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#4A90E2"/>
    <text x="400" y="300" font-family="Arial" font-size="36" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  
  fs.writeFileSync(filename, svg);
  console.log(`Created SVG placeholder for ${filename}`);
}

// Also create a generic placeholder
createSvgPlaceholder(path.join(portfolioDir, 'placeholder-project.jpg'), 'Project');

// Download all images
projects.forEach(project => {
  const filename = path.join(portfolioDir, `${project.id}.jpg`);
  
  // Don't download if file exists
  if (fs.existsSync(filename)) {
    console.log(`${filename} already exists, skipping...`);
    return;
  }
  
  console.log(`Downloading ${project.url} to ${filename}`);
  
  const file = fs.createWriteStream(filename);
  
  https.get(project.url, response => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
      });
    } else {
      file.close();
      fs.unlink(filename, () => {}); // Delete the file if download failed
      console.error(`Failed to download ${project.url}, status: ${response.statusCode}`);
      
      // Create placeholder instead
      createSvgPlaceholder(filename, project.id.replace('-', ' ').toUpperCase());
    }
  }).on('error', err => {
    file.close();
    fs.unlink(filename, () => {}); // Delete the file if download failed
    console.error(`Error downloading ${project.url}: ${err.message}`);
    
    // Create placeholder instead
    createSvgPlaceholder(filename, project.id.replace('-', ' ').toUpperCase());
  });
});

console.log('Image download/creation process initiated!');