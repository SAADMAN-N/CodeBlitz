import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter, linter } from '@codemirror/lint';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; // Correct the import path

const socket = io('http://localhost:5000');

const CodeEditor = forwardRef((props, ref) => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      toast.success('Connected to the server');
      console.log('connected to server');
    });

    socket.on('disconnect', () => {
      toast.error('Disconnected from the server');
      console.log('disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useImperativeHandle(ref, () => ({
    runCode,
  }));

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
        theme={oneDark}
        extensions={[javascript(), autocompletion(), lintGutter(), linter()]}
        onChange={(value) => {
          setCode(value);
        }}
      />
      <pre>{output}</pre>
    </div>
  );
});

export default CodeEditor;