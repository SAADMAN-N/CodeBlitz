import React, { useCallback, useState, useEffect } from 'react';
import { create } from '@codemirror-toolkit/react';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import axios from 'axios';
import { io } from 'socket.io-client';

const { setContainer, setConfig } = create();
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

  const ref = useCallback((node) => {
    setContainer(node);
    if (node) {
      setConfig({
        doc: code,
        extensions: [javascript(), oneDark],
      });
    }
  }, [code]);

  return (
    <div>
      <div ref={ref} style={{ height: '200px' }} />
      <button onClick={runCode}>Run</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;