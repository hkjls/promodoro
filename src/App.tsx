import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Menu from './components/Menu';
import { PromodoreProvider } from './Context/promodoreContext';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <PromodoreProvider>
        <div id="container">
            <Menu />
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
      </PromodoreProvider>
    </BrowserRouter>
  );
}

// function MenuWrapper() {
//   const location = useLocation();
//   let active: 'home' | 'settings' | 'user' = 'user';
//   if (location.pathname === '/settings') {
//     active = 'settings';
//   } else if (location.pathname === '/home') {
//     active = 'home';
//   }
//   return <Menu active={active} />;
// }
