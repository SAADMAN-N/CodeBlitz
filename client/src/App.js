import React from 'react';
import Split from 'react-split';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <Split
      sizes={[50, 50]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      className="split"
    >
      <div className="LeftPane">
        {/* Left pane content can go here */}
      </div>
      <div className="CodeEditorContainer">
        <CodeEditor />
      </div>
    </Split>
  );
}

export default App;