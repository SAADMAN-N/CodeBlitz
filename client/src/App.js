import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import Login from './components/Login';
import Register from './components/Register';
import SkillSelection from './components/SkillSelection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>CodeBlitz</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/skills" element={<SkillSelection />} />
            <Route path="/" element={<CodeEditor />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
