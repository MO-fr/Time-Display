import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import ThemeDropdown from './components/Themes/ThemeDropdown.jsx'; // Import the ThemeDropdown component
import ToastNoti from './components/NotIfacation/ToastTypes.jsx'; // Import the Toast component
import Timerpage from './components/Timer/Timerlogic.jsx'; // Import the Timer page
import MenuButtonWithSlider from './components/Settings/MenuButton.jsx'; // Import the Menu Button Component
import Achievements from './components/Achievements/Achievements.jsx'; // Import the Achievements page

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-8">
        {/* Add the Menu Button with Slider */}
        <MenuButtonWithSlider />

        {/* Add the ThemeDropdown */}
        <ThemeDropdown />

        {/* Add the Toast component */}
        <ToastNoti position="bottom-right" richcolors />

        {/* Define Routes */}
        <Routes>
          {/* Route for the Timer page (default) */}
          <Route path="/" element={<Timerpage />} />

          {/* Route for the Achievements page */}
          <Route path="/achievements" element={<Achievements />} />

          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;