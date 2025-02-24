import React from 'react';
import ThemeDropdown from './components/ThemeDropdown.jsx'; // Import the ThemeDropdown component
import Timerpage from './components/Timer/Timerlogic.jsx'; // Your main component

const App = () => {
  return (
    <div className="min-h-screen p-8">
      {/* Add the ThemeDropdown */}
      <ThemeDropdown />
                        
      {/* Your existing app content */}
      <h1 className="text-4xl font-bold text-center mt-10">The Focus Tracker!</h1>
      <Timerpage /> {/* Your main app logic */}
    </div>
  );
};

export default App;