import React, { useState, useEffect, useRef } from 'react';
import RotateCcwIcon from '../images/rotate-ccw.png';
import PlayIcon from '../images/play.png';
import PauseIcon from '../images/pause.png';
import SkipForwardIcon from '../images/skip-forward.png';
import './Tasks.css';

const Tasks = () => {
  const FOCUS_TIME = 0.5 * 60;
  const BREAK_TIME = 0.5 * 60;
  const [time, setTime] = useState(FOCUS_TIME);
  const [breakTimeState, setBreakTimeState] = useState(BREAK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
  ]);

  const intervalRef = useRef<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const selectCurrentTask = () => {
    let lastIncomplete = null;
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (!tasks[i].completed) {
        lastIncomplete = tasks[i];
        break;
      }
    }
    if (lastIncomplete) {
      setCurrentTask(lastIncomplete.text);
      setCurrentTaskId(lastIncomplete.id);
    } else {
      setCurrentTask('No tasks left');
      setCurrentTaskId(null);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            if (phase === 'focus') {
              if (currentTaskId !== null) {
                setTasks((prevTasks) =>
                  prevTasks.map((task) =>
                    task.id === currentTaskId ? { ...task, completed: true } : task
                  )
                );
              }
              setPhase('break');
              setTime(breakTimeState);
            } else {
              setPhase('focus');
              setTime(FOCUS_TIME);
              selectCurrentTask();
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
  }, [isRunning, phase, breakTimeState, currentTaskId, tasks]);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
    if (id === currentTaskId) {
      selectCurrentTask();
    }
  };

  const handlePlayPause = () => {
    if (!isRunning) {
      if (phase === 'focus' && currentTaskId === null) {
        const hasIncompleteTask = tasks.some(task => !task.completed);
        if (!hasIncompleteTask) {
          return;
        }
        selectCurrentTask();
      }
    }
    setIsRunning((prev) => !prev);
  };

  const handleSkip = () => {
    if (phase !== 'focus' || currentTaskId === null) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === currentTaskId ? { ...task, completed: true } : task))
    );
    selectCurrentTask();
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPhase('focus');
    setTime(FOCUS_TIME);
    setCurrentTask('');
    setCurrentTaskId(null);
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
              <h3>{phase === 'focus' ? currentTask : 'Break Time'}</h3>
              <div className="controls">
                  <button onClick={handleReset}>
                    <img src={RotateCcwIcon} alt="Reset" className="control-icon" />
                  </button>
                  <button onClick={handlePlayPause}>
                    <img src={isRunning ? PauseIcon : PlayIcon} alt={isRunning ? "Pause" : "Play"} className="control-icon" />
                  </button>
                  <button onClick={handleSkip}>
                    <img src={SkipForwardIcon} alt="Skip" className="control-icon" />
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
