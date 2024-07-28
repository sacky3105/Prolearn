import React, {useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import LearningContent from './components/LearningContent';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ProLearn Code Editor</h1>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <main className="App-main">
        <CodeEditor />
        <LearningContent />
      </main>
    </div>
  );
}

export default App;
