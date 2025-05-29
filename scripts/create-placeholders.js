// scripts/create-placeholders.js
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const portfolioDir = path.join(process.cwd(), 'public/images/portfolio');
const teamDir = path.join(process.cwd(), 'public/images/team');
const aboutDir = path.join(process.cwd(), 'public/images/about');

[portfolioDir, teamDir, aboutDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Function to create a simple SVG placeholder
function createPlaceholder(filename, color, text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="${color}"/>
    <text x="400" y="300" font-family="Arial" font-size="36" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  
  fs.writeFileSync(filename, svg);
  console.log(`Created ${filename}`);
}

// Create portfolio placeholders
const portfolioItems = [
  { id: 'healthcare', color: '#4A90E2', text: 'Healthcare Portal' },
  { id: 'ecommerce', color: '#FF6B6B', text: 'E-commerce App' },
  { id: 'fintech', color: '#50C878', text: 'Fintech Dashboard' },
  { id: 'logistics', color: '#FFD700', text: 'Logistics System' },
  { id: 'travel', color: '#9370DB', text: 'Travel App' },
  { id: 'educational', color: '#FF7F50', text: 'Educational Platform' },
  { id: 'iot', color: '#6495ED', text: 'IoT Dashboard' },
  { id: 'social', color: '#DA70D6', text: 'Social Platform' },
  { id: 'project', color: '#5048E5', text: 'Project' } // Generic placeholder
];

portfolioItems.forEach(item => {
  createPlaceholder(
    path.join(portfolioDir, `placeholder-${item.id}.jpg`), // Keep .jpg extension for simplicity
    item.color,
    item.text
  );
});

// Create team member placeholders
const teamMembers = [
  { id: 'member-1', color: '#4A90E2', text: 'Team Member 1' },
  { id: 'member-2', color: '#50C878', text: 'Team Member 2' },
  { id: 'member-3', color: '#FF6B6B', text: 'Team Member 3' },
  { id: 'member-4', color: '#9370DB', text: 'Team Member 4' }
];

teamMembers.forEach(member => {
  createPlaceholder(
    path.join(teamDir, `${member.id}.jpg`), // Keep .jpg extension for simplicity
    member.color,
    member.text
  );
});

// Create about placeholders
createPlaceholder(
  path.join(aboutDir, 'team.jpg'), // Keep .jpg extension for simplicity
  '#10B981',
  'Our Team'
);

createPlaceholder(
  path.join(aboutDir, 'office.jpg'), // Keep .jpg extension for simplicity
  '#6366F1',
  'Our Office'
);

console.log('All placeholder images created successfully!');