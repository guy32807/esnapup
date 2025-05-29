// Add this function to create a more professional placeholder for your profile
function createFounderPlaceholder(filename) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5048E5;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#3D32C4;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#grad)" />
    <circle cx="400" cy="300" r="140" fill="#7E78E8" />
    <rect x="260" y="440" width="280" height="300" rx="20" fill="#7E78E8" />
    <text x="400" y="720" dominant-baseline="middle" text-anchor="middle" 
          font-family="Arial" font-size="36" font-weight="bold" fill="white">Auguste Dubuisson</text>
    <text x="400" y="760" dominant-baseline="middle" text-anchor="middle" 
          font-family="Arial" font-size="24" fill="white">Founder & CEO</text>
  </svg>`;
  
  fs.writeFileSync(filename, svg);
  console.log(`Created founder image: ${filename}`);
}

// Call this function to create your profile image placeholder
createFounderPlaceholder(path.join('public/images/team', 'auguste-dubuisson.jpg'));