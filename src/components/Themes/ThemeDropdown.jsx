import React, { useState } from 'react'; // Import React and the useState hook
import { Palette, Moon, Sun, Droplet, Sparkles, ChevronDown, X } from 'lucide-react'; // Import cool icons

const ThemeSelector = ({ onThemeChange }) => {
  // State to track if the theme dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // State to track the currently selected theme
  const [theme, setTheme] = useState('default');

  // List of themes with their names, colors, and icons
  const themes = [
    {
      name: 'Default', // Theme name
      value: 'default', // Theme ID
      background: 'bg-red-800', // Background color (dark red)
      text: 'text-white', // Text color (white)
      icon: <Sun className="w-4 h-4" />, // Sun icon for this theme
    },
    {
      name: 'Sunset',
      value: 'sunset',
      background: 'bg-gradient-to-r from-orange-400 to-pink-600', // Gradient background (orange to pink)
      text: 'text-white',
      icon: <Palette className="w-4 h-4" />, // Palette icon
    },
    {
      name: 'Ocean',
      value: 'ocean',
      background: 'bg-gradient-to-r from-blue-500 to-teal-400', // Gradient background (blue to teal)
      text: 'text-white',
      icon: <Droplet className="w-4 h-4" />, // Droplet icon
    },
    {
      name: 'Forest',
      value: 'forest',
      background: 'bg-gradient-to-r from-green-600 to-emerald-500', // Gradient background (green to emerald)
      text: 'text-white',
      icon: <Moon className="w-4 h-4" />, // Moon icon
    },
    {
      name: 'Galaxy',
      value: 'galaxy',
      background: 'bg-gradient-to-r from-purple-800 to-indigo-900', // Gradient background (purple to indigo)
      text: 'text-white',
      icon: <Sparkles className="w-4 h-4" />, // Sparkles icon
    },
    {
      name: 'Candy',
      value: 'candy',
      background: 'bg-gradient-to-r from-pink-400 to-yellow-300', // Gradient background (pink to yellow)
      text: 'ffffff', // Text color (dark gray)
      icon: <Palette className="w-4 h-4" />, // Palette icon
    },
  ];

  // Function to change the theme when a theme is clicked
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme); // Update the selected theme
    document.body.className = `${selectedTheme}-theme`; // Apply the theme to the whole page
    setIsOpen(false); // Close the dropdown after selecting a theme
    onThemeChange(selectedTheme); // Notify parent component of the theme change
  };

  return (
    <>
      {/* Button to open the theme dropdown */}
      <button
        onClick={() => setIsOpen(true)} // Open the dropdown when clicked
        className="trigger-button"
      >
        <Palette className="w-5 h-5 text-gray-700" /> {/* Palette icon */}
        <span className="text-sm font-medium text-gray-700">Themes</span> {/* Button text */}
      </button>

      {/* Show the dropdown only if isOpen is true */}
      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}> {/* Close dropdown when clicking outside */}
          <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Prevent clicks inside the dropdown from closing it */}
            <div className="modal-header">
              <h2 className="modal-title">Choose Theme</h2> {/* Dropdown title */}
              <button
                onClick={() => setIsOpen(false)} // Close the dropdown when X is clicked
                className="close-button"
              >
                <X className="w-5 h-5 text-gray-500" /> {/* X icon */}
              </button>
            </div>

            {/* Grid to display all the theme options */}
            <div className="theme-grid">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value} // Unique key for each theme
                  onClick={() => handleThemeChange(themeOption.value)} // Change theme when clicked
                  className={`theme-button ${themeOption.background} ${themeOption.text}`} // Apply theme colors
                >
                  <span className="text-sm font-medium">{themeOption.name}</span> {/* Theme name */}
                  {themeOption.icon} {/* Theme icon */}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;