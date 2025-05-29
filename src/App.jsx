import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeDropdown from './components/Themes/ThemeDropdown.jsx';
import ToastProvider from './components/NotIfacation/ToastTypes.jsx';
import Timerpage from './components/Timer/Timerlogic.jsx';// Your main component
import MenuButtonWithSlider from './components/Settings/MenuButton.jsx'; // Import the Menu Button Component
import AchievementsPage from './components/Achievements/Achievements.jsx'; // Import the AchievementsPage component
import { AchievementsProvider } from './context/AchievementsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {  return (
    <AchievementsProvider>
      <AnalyticsProvider>
        <ThemeProvider>
          <Router>
            <div className="app-container">
              {/* Navigation Controls */}
              <nav style={{ 
                position: 'fixed', 
                top: '1rem', 
                left: '1rem', 
                right: '1rem',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div className="nav-left">
                  <MenuButtonWithSlider />
                </div>
                <div className="nav-right">
                  <ThemeDropdown />
                </div>
              </nav>

              <div className="main-content">
                {/* Main Content */}
                <Routes>
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/" element={<Timerpage />} />                </Routes>
                
                {/* Notifications */}
                <ToastProvider />
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </AnalyticsProvider>
    </AchievementsProvider>
  );
};

export default App;