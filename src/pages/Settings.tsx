import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [notifications, setNotifications] = useState([false, false, false, false]);

  const toggleNotification = (index:any) => {
    const newNotifications = [...notifications];
    newNotifications[index] = !newNotifications[index];
    setNotifications(newNotifications);
  };

  return (
    <div id="settings-page">
      <div className="settings-content">
        <div className="duration-section">
          <div className="duration-item">
            <label>Work duration</label>
            <div className="slider-container">
              <input 
                type="range" 
                min="1" 
                max="60" 
                value={workDuration} 
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="slider"
              />
              <span className="duration-value">{workDuration} min</span>
            </div>
          </div>

          <div className="duration-item">
            <label>Short break</label>
            <div className="slider-container">
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={shortBreak} 
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="slider"
              />
              <span className="duration-value">{shortBreak} min</span>
            </div>
          </div>

          <div className="duration-item">
            <label>Long break</label>
            <div className="slider-container">
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={longBreak} 
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className="slider"
              />
              <span className="duration-value">{longBreak} min</span>
            </div>
          </div>
        </div>

        <div className="notification-section">
          <h2>Notifications</h2>
          <div className="toggles">
            {notifications.map((enabled, index) => (
              <label key={index} className="toggle-item">
                <span className="toggle-label">Notification {index + 1}</span>
                <input 
                  type="checkbox" 
                  checked={enabled} 
                  onChange={() => toggleNotification(index)}
                  className="toggle"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        Arimanan
      </footer>
    </div>
  );
};

export default Settings;
