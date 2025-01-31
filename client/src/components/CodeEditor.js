import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter, linter } from '@codemirror/lint';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/run', { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error running code');
    }
  };

  return (
    <div className="CodeEditorContainer">
      <CodeMirror
        value={code}
        height="100%"
        extensions={[javascript(), oneDark, autocompletion(), lintGutter(), linter()]}
        onChange={(value) => {
          setCode(value);
        }}
      />
      <button onClick={runCode}>Run</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;