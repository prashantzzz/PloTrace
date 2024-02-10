// Get the theme button element
const themeButton = document.getElementById('theme');

// Define available themes
const themes = ['light', 'dark', 'valentine', 'coffee', 'forest', 'retro'];

// Function to toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length; // Loop through themes
  const nextTheme = themes[nextIndex];
  document.documentElement.setAttribute('data-theme', nextTheme);
}

// Add click event listener to the theme button
themeButton.addEventListener('click', toggleTheme);
