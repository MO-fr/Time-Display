# ⏳ Time Display  

A sleek, minimalist timer built with React and Vite. Displays elapsed time in **HH:MM:SS** format with start, pause, and reset functionality.  

---

## 🚀 Features  
- Start, pause, and reset the timer with a simple UI.  
- Smooth and modern design using **Lucide Icons**.  
- Fully responsive and optimized.  
- Switch between **Stopwatch** and **Timer** modes.  
- Input fields for setting custom countdown times in **Timer** mode.  
- Real-time countdown with automatic stop at zero.  

---

## 🛠 Tech Stack  
- ⚛ **React** (Vite-based setup)  
- 🎨 **CSS** (Custom styling)  
- 🔗 **Lucide Icons** (For play, pause, reset, and mode-switch buttons)  
- ☁ **Vercel** (For hosting)  

---

## 📥 Installation & Running  
```
npm install
```

```
npm run dev
```

# 🕹 How to Use  

## Stopwatch Mode  
- Click the **Play** button to start the stopwatch.  
- Click the **Pause** button to pause the stopwatch.  
- Click the **Reset** button to reset the stopwatch to 00:00:00.  

## Timer Mode  
- Switch to **Timer** mode by clicking the "Switch to Timer" button.  
- Enter the desired countdown time using the **HH:MM:SS** input fields.  
- Click the **Start Timer** button to begin the countdown.  
- The timer will automatically stop when it reaches 00:00:00.  
- Use the **Reset** button to reset the timer.  

---

## ❗❗ Announcements
- The settings and menu tab point to nothing for the time being, i will add updates later making them more useful.

# 🔮 Future Updates  

Exciting features planned for upcoming versions:  

- ⏲ **Preset Timers** – Add predefined timer presets for quick access (e.g., 5 minutes, 10 minutes).  
- 📊 **History Log** – Track and display past timer sessions for reference.  

Stay tuned for more enhancements! 🚀  

---

# 📜 License  
- MIT License

---

# ❗❗ Timer Logic component updates 

🔹 **Handles time updates** – Starts, stops, and resets the timer.  
🔹 **Switches between stopwatch & countdown** – Lets users pick a mode.  
🔹 **Manages user input** – Takes hours, minutes, and seconds for countdown mode.  
🔹 **Keeps track of running state** – Controls whether the timer is running or paused.  
🔹 **Uses `useEffect`** – Updates the timer every second when running.  

💡 **Why It's Better?**  
✅ Groups related states together (time, isRunning, isStopwatch).  
✅ Uses one function to update input fields dynamically.  
✅ Makes the code shorter and easier to maintain.  

---

# ❗❗ Timer UI component updates 

🔹 **Shows the formatted time** – Displays the time in HH:MM:SS format.  
🔹 **Provides input fields** – Allows users to enter hours, minutes, and seconds.  
🔹 **Has control buttons** – Start, pause, reset, and switch modes easily.  
🔹 **Uses icons** – Play, pause, reset, and switch mode icons for better UX.  

💡 **Why It's Better?**  
✅ Fewer props – Uses `timerState` and `inputTime` instead of passing many values.  
✅ Cleaner and easier to understand.  
✅ Works perfectly with `TimerLogic.jsx`.

---

# 🏆 Achievements Feature

The achievements feature allows users to unlock various achievements based on their usage of the timer. Each achievement has a unique icon and description.

## Achievements Component

The `Achievements` component displays a list of achievements with their respective icons and descriptions. Locked achievements are shown with a lock icon.

```jsx
import React from 'react';
import { Clock, Award, Star, Target, Zap, Timer, Heart, Medal, Trophy, AlertTriangle } from 'lucide-react';
import { useAchievements } from '../../context/AchievementsContext';

const Achievements = () => {
  const { achievements } = useAchievements();

  const getIcon = (iconName) => {
    const icons = {
      Clock: <Clock className="icon-blue" />,
      Award: <Award className="icon-purple" />,
      Star: <Star className="icon-yellow" />,
      Target: <Target className="icon-red" />,
      Zap: <Zap className="icon-orange" />,
      Timer: <Timer className="icon-indigo" />,
      Heart: <Heart className="icon-pink" />,
      Medal: <Medal className="icon-green" />,
      Trophy: <Trophy className="icon-amber" />,
      AlertTriangle: <AlertTriangle className="icon-teal" />,
    };
    return icons[iconName];
  };

  return (
    <div className="achievements-container">
      <div className="achievements-content">
        <h1 className="achievements-title">Achievements</h1>
        <div className="achievements-list">
          {Object.values(achievements).map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="achievement-icon-container">
                {getIcon(achievement.icon)}
              </div>
              <div className="achievement-details">
                <h2 className="achievement-title">{achievement.title}</h2>
                <p className="achievement-description">
                  {achievement.description}
                </p>
              </div>
              {!achievement.unlocked && (
                <div className="lock-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;

```

