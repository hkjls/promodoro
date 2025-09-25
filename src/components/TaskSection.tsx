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
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Done</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                </td>
                <td className={task.completed ? 'completed' : ''}>{task.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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