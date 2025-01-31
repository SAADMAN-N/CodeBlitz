import React from 'react';
import Split from 'react-split';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <button className="NavbarButton">
          <i className="fas fa-play" style={{ color: 'white', marginRight: '10px' }}></i>
          Run
        </button>
        <button className="NavbarButton">
          <i className="fas fa-cloud" style={{ color: 'rgb(15, 187, 15)', marginRight: '10px' }}></i>
          Submit
        </button>
      </div>
      <Split
        sizes={[50, 50]}
        minSize={100}
        gutterSize={5}  // Smaller gutter size for horizontal split
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="split-horizontal"
      >
        <div className="LeftPane">
          <div className="LeftHeader">
            <span className="LeftIcon">{'</>'}</span> Questions
          </div>
          {/* Questions content can go here */}
        </div>
        <div className="RightPane">
          <Split
            sizes={[50, 50]}
            minSize={100}
            gutterSize={5}  // Smaller gutter size for vertical split
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="vertical"
            cursor="row-resize"
            className="split-vertical"
          >
            <div className="EditorPane">
              <div className="EditorHeader">
                <span className="CodeIcon">{'</>'}</span> Code
              </div>
              {/* Editor content can go here */}
            </div>
            <div className="TestingPane">
              <div className="TestingHeader">
                <span className="TestingIcon">{'</>'}</span> Testing
              </div>
              {/* Testing content can go here */}
            </div>
          </Split>
        </div>
      </Split>
    </div>
  );
}

export default App;