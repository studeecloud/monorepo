import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  console.log('LOGGING "token":', token);

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

  createLocalTracks({
    audio: true,
    video: { width: 640 },
  }).then((localTracks) => {
    return connect(token, {
      name: 'DailyStandup',
      tracks: localTracks,
    }).then(
      (room) => {
        console.log(`Successfully joined a Room: ${room}`);
        room.on('participantConnected', (participant) => {
          console.log(`A remote Participant connected: ${participant}`);

          // Attach the Participant's Media to a <div> element
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const track = publication.track;
              document
                .getElementById('remote-media-div')
                .appendChild(track.attach());
            }
          });

          participant.on('trackSubscribed', (track) => {
            document
              .getElementById('remote-media-div')
              .appendChild(track.attach());
          });
        });
      },
      (error) => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );
  });

  return (
    <main>
      <h1>StudeeCloud App</h1>

      <h3>Token: {token}</h3>

      <form action="" method="get">
        <input type="text" name="token" style={{ border: '1px solid blue' }} />
        <input type="submit" value="Submit" />
      </form>

      <div id="remote-media-div" style={{ border: '2px solid red' }}></div>

      {headArray}
    </main>
  );
}

export default App;
