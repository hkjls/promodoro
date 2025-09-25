import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface PromodoreContextType {
  workDuration: number;
  setWorkDuration: (duration: number) => void;
  shortBreak: number;
  setShortBreak: (duration: number) => void;
  longBreak: number;
  setLongBreak: (duration: number) => void;
  currentTask: string;
  currentTaskId: number | null;
  setCurrentTask: (task: string) => void;
  setCurrentTaskId: (id: number | null) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  phase: 'focus' | 'break';
  setPhase: (phase: 'focus' | 'break') => void;
}

const PromodoreContext = createContext<PromodoreContextType | undefined>(undefined);

export const usePromodoreContext = () => {
  const context = useContext(PromodoreContext);
  if (context === undefined) {
    throw new Error('usePromodoreContext must be used within a PromodoreProvider');
  }
  return context;
};

interface PromodoreProviderProps {
  children: ReactNode;
}

export const PromodoreProvider: React.FC<PromodoreProviderProps> = ({ children }) => {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false },
  ]);

  const [phase, setPhase] = useState<'focus' | 'break'>('focus');


  useEffect(() => {
    const savedPhase = localStorage.getItem('promodoroPhase');
    if (savedPhase && ['focus', 'break'].includes(savedPhase)) {
      setPhase(savedPhase as 'focus' | 'break');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('promodoroPhase', phase);
  }, [phase]);

  return (
    <PromodoreContext.Provider value={{
      workDuration, setWorkDuration,
      shortBreak, setShortBreak,
      longBreak, setLongBreak,
      currentTask, setCurrentTask,
      currentTaskId, setCurrentTaskId,
      tasks, setTasks,
      phase, setPhase
    }}>
      {children}
    </PromodoreContext.Provider>
  );
};
