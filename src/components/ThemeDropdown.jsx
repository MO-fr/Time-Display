import React, { useState } from 'react';
import { Palette, Moon, Sun, Droplet, Sparkles, ChevronDown, X } from 'lucide-react';

const ThemeDropdown = () => {
  // State to control whether the theme menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // State to store the currently selected theme
  const [theme, setTheme] = useState('default');

  // List of themes, all with a name, styling, and an icon
  const themes = [
    {
      name: 'Default', // Theme name
      value: 'default', // Theme identifier
      background: 'bg-red-800', // Background color (dark red)
      text: 'text-white', // Text color (white)
      icon: <Sun className="w-4 h-4" />, // Sun icon representing the default theme
    },
    {
      name: 'Sunset',
      value: 'sunset',
      background: 'bg-gradient-to-r from-orange-400 to-pink-600', 
      text: 'text-white',
      icon: <Palette className="w-4 h-4" />, 
    },
    {
      name: 'Ocean',
      value: 'ocean',
      background: 'bg-gradient-to-r from-blue-500 to-teal-400', 
      text: 'text-white',
      icon: <Droplet className="w-4 h-4" />, 
    },
    {
      name: 'Forest',
      value: 'forest',
      background: 'bg-gradient-to-r from-green-600 to-emerald-500', 
      text: 'text-white',
      icon: <Moon className="w-4 h-4" />, 
    },
    {
      name: 'Galaxy',
      value: 'galaxy',
      background: 'bg-gradient-to-r from-purple-800 to-indigo-900', 
      text: 'text-white',
      icon: <Sparkles className="w-4 h-4" />, 
    },
    {
      name: 'Candy',
      value: 'candy',
      background: 'bg-gradient-to-r from-pink-400 to-yellow-300', 
      text: 'text-gray-900', 
      icon: <Palette className="w-4 h-4" />, 
    },
  ];

  // Function to change the theme when a user clicks on an option
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme); // Update the theme state with the selected one
    document.body.className = `${selectedTheme}-theme`; // Apply the selected theme to the webpage
    setIsOpen(false); // Close the theme menu after selecting
  };

  return (
    <>
      {/* Button that opens the theme selection menu */}
      <button onClick={() => setIsOpen(true)} className="trigger-button">
        <Palette className="w-5 h-5 text-gray-700" /> {/* Theme selection icon */}
        <span className="text-sm font-medium text-gray-700">Themes</span> {/* Button text */}
        <ChevronDown className="w-4 h-4 text-gray-700" /> {/* Small down arrow icon */}
      </button>

      {/* Only show the theme selection menu if isOpen is true */}
      {isOpen && (
        <>
          {/* Dark background overlay (closes the menu when clicked outside) */}
          <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>

          {/* The actual theme selection popup */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header of the theme menu */}
            <div className="modal-header">
              <h2 className="modal-title">Choose a Theme!</h2> {/* Title text */}
              <button onClick={() => setIsOpen(false)} className="close-button">
                <X className="w-5 h-5 text-gray-500" /> {/* X icon for closing the menu */}
              </button>
            </div>

            {/* Container for the list of themes */}
            <div className="theme-grid">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value} // Each button needs a unique key
                  onClick={() => handleThemeChange(themeOption.value)} // Call function to change theme
                  className={`theme-button ${themeOption.background} ${themeOption.text}`} // Apply theme colors
                >
                  <span className="text-sm font-medium">{themeOption.name}</span> {/* Display theme name */}
                  {themeOption.icon} {/* Display theme icon */}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ThemeDropdown;
