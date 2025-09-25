import React, { useState, useEffect, useRef } from 'react';
import { usePromodoreContext } from '../Context/promodoreContext';
import { formatTime } from '../utils/formatTime';
import RotateCcwIcon from '../images/rotate-ccw.png';
import PlayIcon from '../images/play.png';
import PauseIcon from '../images/pause.png';
import SkipForwardIcon from '../images/skip-forward.png';

const TimerSection = () => {
  const { 
    workDuration,
    shortBreak,
    longBreak,
    currentTask, 
    currentTaskId, 
    tasks, 
    setTasks, 
    setCurrentTask, 
    setCurrentTaskId,
    phase,
    setPhase
  } = usePromodoreContext();

  const [time, setTime] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showTaskFinished, setShowTaskFinished] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === 'focus') {
      setTime(workDuration * 60);
    } else {
      setTime(shortBreak * 60);
    }
  }, [phase, workDuration, shortBreak]);

  const selectCurrentTask = () => {
    let firstIncomplete = null;
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].completed) {
        firstIncomplete = tasks[i];
        break;
      }
    }
    if (firstIncomplete) {
      setCurrentTask(firstIncomplete.text);
      setCurrentTaskId(firstIncomplete.id);
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
              setShowTaskFinished(true);
            } else {
              setPhase('focus');
              setTime(workDuration * 60);
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
  }, [isRunning, phase, currentTaskId, tasks, workDuration, shortBreak, longBreak]);

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
    setIsRunning(!isRunning);
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
    setTime(workDuration * 60);
    setCurrentTask('');
    setCurrentTaskId(null);
    setIsRunning(false);
    setShowTaskFinished(false);
  };

  const handleTaskFinished = (finished: boolean) => {
    setShowTaskFinished(false);
    if (finished && currentTaskId !== null) {
      const allTasksCompleted = tasks.filter(task => !task.completed).length === 1;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTaskId ? { ...task, completed: true } : task
        )
      );
      setPhase('break');
      setTime(allTasksCompleted ? longBreak * 60 : shortBreak * 60);
      setIsRunning(true);
    } else {
      setPhase('break');
      setTime(shortBreak * 60);
      setIsRunning(true);
    }
  };

  return (
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

        <div id="isTaskFinished" style={{ display: showTaskFinished ? 'block' : 'none' }}>
          <p>Is the task finished?</p>
          <div id="confirm">
            <button className="confirm" onClick={() => handleTaskFinished(true)}>Yes</button>
            <button className="confirm" onClick={() => handleTaskFinished(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;