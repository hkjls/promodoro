import React, { useState } from 'react';
import { usePromodoreContext } from '../Context/promodoreContext';
import { playNotificationSound } from '../utils/playAudio';
import chimieAelrt from "../audio/chime-alert-demo-309545.mp3";
import notification1 from "../audio/new-notification-09-352705.mp3";
import notification2 from "../audio/new-notification-022-370046.mp3";
import notification3 from "../audio/new-notification-026-380249.mp3"

const Settings = () => {
  const { workDuration, setWorkDuration, shortBreak, setShortBreak, longBreak, setLongBreak, setSelectedNotificationPath } = usePromodoreContext();
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
  interface Notification {
    name: string;
    path: string;
    index: number;
  }

  const notification_array: Notification[] = [
    {
      name: "chimieAlert",
      path: chimieAelrt,
      index: 1
    },
    {
      name: "notification 1",
      path: notification1,
      index: 2
    },
    {
      name: "notification 2",
      path: notification2,
      index: 3
    },
    {
      name: "notification 3",
      path: notification3,
      index: 4
    }
  ];

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
            {notification_array.map((notification, arrayIndex) => (
              <label key={arrayIndex} className="toggle-item">
                <span className="toggle-label">{notification.name}</span>
                <input
                  type="radio"
                  name="notification"
                  checked={selectedNotification === arrayIndex}
                  onChange={() => {
                    setSelectedNotification(arrayIndex);
                    setSelectedNotificationPath(notification.path);
                    playNotificationSound(notification.path);
                  }}
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
