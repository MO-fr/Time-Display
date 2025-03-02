import React from 'react';
import ThemeDropdown from './components/Themes/ThemeDropdown.jsx'; // Import the ThemeDropdown component
import ToastNoti from './components/NotIfacation/ToastNoti.jsx';
import Timerpage from './components/Timer/Timerlogic.jsx'; // Your main component
import MenuButtonWithSlider from './components/Settings/MenuButton.jsx'; // Import the Menu Button Component

const App = () => {
  return (

    <div className="min-h-screen p-8">

      {/* Add the Menu Button with Slider */}
      <MenuButtonWithSlider />

      {/* Add the ThemeDropdown */}
      <ThemeDropdown />

      {/* Add the Toast component */}
      <ToastNoti position="bottom-right" richcolors />

      {/* Your existing app content */}
      <h1 className="text-4xl font-bold text-center mt-10">The Focus Tracker!</h1>
      <Timerpage /> {/* Your main app logic */}

    </div>
  );
};

//

export default App;