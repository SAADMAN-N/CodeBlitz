import React from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CodeBlitz</h1>
        <CodeEditor />
      </header>
    </div>
  );
}

export default App;
