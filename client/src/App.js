import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Testing ability to generate Big Head
  const Example = () => (
    <div style={{ width: '4rem' }}>
      <BigHead />
    </div>
  );

  const headNum = 5;
  const headArray = [];

  for (let i = 0; i < headNum; i++) {
    headArray.push(Example());
  }

  return (
    <main>
      <h1>StudeeCloud App</h1>

      {headArray}
    </main>
  );
}

export default App;
