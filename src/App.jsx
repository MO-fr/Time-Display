import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeDropdown from './components/Themes/ThemeDropdown.jsx'; // Import the ThemeDropdown component
import ToastNoti from './components/NotIfacation/ToastTypes.jsx';
import Timerpage from './components/Timer/Timerlogic.jsx'; // Your main component
import MenuButtonWithSlider from './components/Settings/MenuButton.jsx'; // Import the Menu Button Component
import AchievementsPage from './components/Achievements/Achievements.jsx'; // Import the AchievementsPage component
import { AchievementsProvider } from './context/AchievementsContext'; // Import the AchievementsProvider
import { AnalyticsProvider } from './context/AnalyticsContext';

const App = () => {
  return (
    <AchievementsProvider>
      <AnalyticsProvider>
        <Router>
          <div className="min-h-screen p-8">
            {/* Add the Menu Button with Slider */}
            <MenuButtonWithSlider />

            {/* Add the ThemeDropdown */}
            <ThemeDropdown />

            {/* Add the Toast component */}
            <ToastNoti position="bottom-right" richcolors />

            {/* Your existing app content */}
            <h1 className="text-4xl font-bold text-center mt-10"></h1>

            <Routes>
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/" element={<Timerpage />} />
            </Routes>
          </div>
        </Router>
      </AnalyticsProvider>
    </AchievementsProvider>
  );
};

export default App;