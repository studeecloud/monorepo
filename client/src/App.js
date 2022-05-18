import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

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

  const headNum = 5;
  const headArray = [];

  for (let i = 1; i <= headNum; i++) {
    headArray.push(
      <div style={{ width: '5rem' }} key={i.toString()}>
        <BigHead />
      </div>
    );
  }

  return (
    <main style={{ margin: '0 0 0 1rem' }}>
      <h1 className="font-display text-5xl text-center">StudeeCloud</h1>
      <h2 className="font-header text-4xl text-center">
        Collaborative
        <br />
        Study Environment
      </h2>

      <p className="font-body text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent
        taciti sociosqu ad litora!
      </p>

      <button className="btn btn-primary font-header text-3xl">SIGN IN</button>
      <FontAwesomeIcon icon={solid('user-secret')} />
      <FontAwesomeIcon icon={regular('coffee')} />
      <div>{headArray}</div>
    </main>
  );
}

export default App;
