import React from 'react';
import { usePromodoreContext } from '../Context/promodoreContext';

const TaskSection = () => {
  const { tasks, setTasks } = usePromodoreContext();

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
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
      <div id="tasksCrud">
        <ul>
            <li className="btn-crud">add</li>
            <li className="btn-crud">update</li>
            <li className="btn-crud">delete</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskSection;