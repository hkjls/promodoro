import React from 'react';
import TimerSection from '../components/TimerSection';
import TaskSection from '../components/TaskSection';

const Tasks = () => {
  return (
    <div className="tasks-page">
      <div id="PromodorTime">
        <TimerSection />
        <TaskSection />
      </div>

      {/* Footer */}
      <footer className="footer">
        Made by Ariman Joelas
      </footer>
    </div>
  );
};

export default Tasks;
