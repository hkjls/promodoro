import React, { useState, useEffect, useRef } from 'react';
import RotateCcwIcon from '../images/rotate-ccw.png';
import PlayIcon from '../images/play.png';
import PauseIcon from '../images/pause.png';
import SkipForwardIcon from '../images/skip-forward.png';
import './Tasks.css';

const Tasks = () => {
  const [time, setTime] = useState(0.5 * 60); // 25 minutes
  const [pauseTime, setPauseTime] = useState(0.5 * 60); // 5 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [currentTask, setCurrentTask] = useState('Current Task');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            if (phase === 'focus') {
              setPhase('break');
              setTime(pauseTime);
              // Advance to next task after focus completion
              const nextIndex = currentTaskIndex + 1;
              if (nextIndex < tasks.length) {
                setCurrentTaskIndex(nextIndex);
                setCurrentTask(tasks[nextIndex].text);
              }
            } else {
              setPhase('focus');
              setTime(25 * 60);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, phase, pauseTime, currentTaskIndex, tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handlePlayPause = () => {
    if (!isRunning) {
      if (currentTask === 'Current Task') {
        setCurrentTask('Task 1');
      }
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPhase('focus');
    setTime(25 * 60);
    setCurrentTask('Current Task');
    setCurrentTaskIndex(0);
    setIsRunning(false);
  };

  return (
    <div className="tasks-page">
      <div id="PromodorTime">
        <div>
          {/* Time Section */}
            <div className="timer-section">
              <div className="timer-circle">
                <div className="timer-display">{formatTime(time)}</div>
                <div className="timer-label">{phase === 'focus' ? 'Focus' : 'Break'}</div>
              </div>
            </div>
          {/* Current Task Section */}
            <div className="current-task-section">
              <h3>{currentTask}</h3>
              <div className="controls">
                  <button onClick={handleReset}>
                    <img src={RotateCcwIcon} alt="Reset" className="control-icon" />
                  </button>
                  <button onClick={handlePlayPause}>
                    <img src={isRunning ? PauseIcon : PlayIcon} alt={isRunning ? "Pause" : "Play"} className="control-icon" />
                  </button>
                  <button onClick={handlePlayPause}>
                    <img src={SkipForwardIcon} alt="Next" className="control-icon" />
                  </button>
              </div>
            </div>
        </div>

        <div className="tasks-section">
          <h2>Tasks</h2>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)} 
                />
                <span className={task.completed ? 'completed' : ''}>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        Made by Ariman Joelas
      </footer>
    </div>
  );
};

export default Tasks;
