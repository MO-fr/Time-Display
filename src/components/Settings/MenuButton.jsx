import React, { useState } from 'react';

const MenuSlider = () => {
  // This keeps track of whether the menu is open or closed. It starts as false (closed).
  const [isOpen, setIsOpen] = useState(false);
  
  // This keeps track of the slider value. It starts at 50 (like a volume slider halfway).
  const [sliderValue, setSliderValue] = useState(50);

  // These are the items that will show up in the menu, like "Home" and "Settings."
  const menuItems = [
    { name: 'Home', path: 'src\components\Timer' }, // These here are for the time being, they dont do anything yet
    { name: 'Settings', path: '#' },
    {name: ' Feedback', path: '#'}

  ];

  return (
    <>
      {/* This is the button you click to open or close the menu. */}
      <button
        onClick={() => setIsOpen(!isOpen)} // When you click, it toggles the menu open/closed.
        className="menu-trigger-button"
      >
        {/* If the menu is open, show the "X" icon. If it's closed, show the hamburger icon. */}
        {isOpen ? (
          // This is the "X" icon.
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /> {/* This is one line of the "X." */}
            <line x1="6" y1="6" x2="18" y2="18" /> {/* This is the other line of the "X." */}
          </svg>
        ) : (
          // This is the hamburger icon (three lines).
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" /> {/* Top line */}
            <line x1="3" y1="6" x2="21" y2="6" />   {/* Middle line */}
            <line x1="3" y1="18" x2="21" y2="18" /> {/* Bottom line */}
          </svg>
        )}
      </button>

      {/* If the menu is open, show the menu backdrop and panel. */}
      {isOpen && (
        <div className="menu-backdrop" onClick={() => setIsOpen(false)}>
          {/* This is the actual menu panel. Clicking inside it won't close the menu. */}
          <div className="menu-panel" onClick={e => e.stopPropagation()}>
            <div className="menu-header">
              <h2 className="menu-title">Menu</h2> {/* This is the title at the top of the menu. */}
              {/* This is the close button inside the menu panel. */}
              <button
                onClick={() => setIsOpen(false)} // Clicking this closes the menu.
                className="menu-close-button"
              >
                {/* This is another "X" icon for closing the menu. */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* These are the navigation links, like "Home" and "Settings." */}
            <div className="menu-navigation">
              {menuItems.map((item) => (
                <a 
                  key={item.name} // This helps React keep track of each item.
                  href={item.path}
                  className="menu-item"
                >
                  <span className="menu-item-text">{item.name}</span> {/* This shows the item name. */}
                </a>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default MenuSlider;