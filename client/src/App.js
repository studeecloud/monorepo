import './App.css';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import Panel from './components/Panel';

function App() {
  const [data, setData] = useState([]);
  const [panelState, setPanelState] = useState({ focused: null });

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/users')
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const selectPanel = (id) => {
    setPanelState((prev) => ({
      focused: prev.focused ? null : id,
    }));
  };

  const headNum = 5;
  const headArray = [];

  for (let i = 1; i <= headNum; i++) {
    headArray.push(
      <div style={{ width: '5rem' }} key={i.toString()}>
        <BigHead />
      </div>
    );
  }

  // Test data for panels
  const panelData = [
    {
      id: 1,
      title: 'Pomodoro',
      bodyText: '07:23',
    },
    {
      id: 2,
      title: 'Videos',
      bodyText: 'VIDEOFEED',
    },
    {
      id: 3,
      title: 'Chat',
      bodyText: 'BLAHBLAH',
    },
    {
      id: 4,
      title: 'Soundboard',
      bodyText: 'BOOP BEEP SOUNDSOUND',
    },
  ];

  const dashboardClasses = classnames('dashboard', {
    'dashboard--focused': panelState.focused,
  });

  console.log('BEFORE THE FILTER');
  console.log('LOGGING "panelData":', panelData);
  console.log('LOGGING "panelState":', panelState);

  // Take the array of panel data and make an array of panel elements
  const panels = panelData
    .filter(
      (panel) => panelState.focused === null || panelState.focused === panel.id
    )
    .map((panel) => {
      return (
        <Panel
          key={panel.id}
          {...panel}
          onSelect={() => selectPanel(panel.id)}
        />
      );
    });

  console.log('LOGGING "panels":', panels);

  return <main className={dashboardClasses}>{panels}</main>;
}

export default App;
