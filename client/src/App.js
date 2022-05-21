import './App.css';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack,
} from 'twilio-video';
// import { useTimer } from 'use-timer';
import TimerTest from './components/TimerTests';
import PomodoroTimer from './components/PomodoroTimer';

import Login from './pages/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import Panel from './components/Panel';
import TitlePanel from './components/TitlePanel';
import VideoPanel from './components/VideoPanel';
import ChatPanel from './components/ChatPanel';

//Sounds
import Ghibli from './components/Ghibli';
import DiscoSound from './components/DiscoSound';
import Rain from './components/Rain';

function App() {
  // Display a local camera preview

  createLocalVideoTrack().then((track) => {
    const localMediaContainer = document.getElementById('local-media-div');
    localMediaContainer.replaceChild(
      track.attach(),
      localMediaContainer.firstChild
    );
  });

  const queryParams = new URLSearchParams(window.location.search);

  const userName = queryParams.get('username');
  const roomName = queryParams.get('room');

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

  let token = null;
  let chatRoom = null;
  axios
    .get(`http://localhost:8080/video/token/${userName}/${roomName}`)
    .then((res) => {
      token = res.data;
      createLocalTracks({
        audio: true,
        video: { width: 640 },
      })
        .then((localTracks) => {
          // Use the unique user token to connect to the given room name with the given local media tracks
          return connect(token, {
            tracks: localTracks,
          });
        })
        .then(
          (room) => {
            // If we are in here, we successfully joined the room.

            // If we receive an event indicating a track was disabled, execute the code inside
            function handleTrackDisabled(track) {
              track.on('disabled', () => {
                console.log('Track disabled:');
                console.log(track);
              });
            }
            // If we receive an event indicating a track was enabled, execute the code inside
            function handleTrackEnabled(track) {
              track.on('enabled', () => {
                console.log('Track enabled:');
                console.log(track);
              });
            }

            // Grab the room object so we can use it outside of this function
            chatRoom = room;
            console.log(`Successfully joined a Room: ${room}`);

            room.participants.forEach((participant) => {
              participant.tracks.forEach((publication) => {
                // Display the media tracks of participants that are already in the room
                if (publication.track) {
                  document
                    .getElementById('remote-media-div')
                    .appendChild(publication.track.attach());
                }
                // Attach the listeners to every subscribed media track
                if (publication.isSubscribed) {
                  handleTrackEnabled(publication.track);
                  handleTrackDisabled(publication.track);
                }
                // When a new media track is subscribed, attach the listeners to it
                publication.on('subscribed', handleTrackDisabled);
                publication.on('subscribed', handleTrackEnabled);

                publication.on('unsubscribed', () => {
                  console.log('Publication unsubscribed:');
                  console.log(publication);
                });

                publication.on('subscribed', () => {
                  console.log('Publication subscribed:');
                  console.log(publication);
                });
              });
              // Display any new media tracks that are subscribed by participants in the room
              participant.on('trackSubscribed', (track) => {
                const remoteMediaContainer =
                  document.getElementById('remote-media-div');
                remoteMediaContainer.replaceChild(
                  track.attach(),
                  remoteMediaContainer.firstChild
                );
              });
            });

            // When a new participant connects, display their published media tracks
            room.on('participantConnected', (participant) => {
              console.log(`A remote Participant connected: ${participant}`);

              // When a participant joins, we iterate over the possible media tracks that they might be broadcasting at the time that they join the Room
              participant.tracks.forEach((publication) => {
                // If a given media track is being broadcast, we grab it and use it to replace the existing child of 'remote-media-div'
                if (publication.isSubscribed) {
                  const track = publication.track;
                  const remoteMediaContainer =
                    document.getElementById('remote-media-div');
                  remoteMediaContainer.replaceChild(
                    track.attach(),
                    remoteMediaContainer.firstChild
                  );
                }
              });

              // If a participant begins broadcasting a media track that they were not broadcasting when they joined the call, this event is triggered
              participant.on('trackSubscribed', (track) => {
                // When that happens, we use it to replace the existing child of 'remote-media-div'
                const remoteMediaContainer =
                  document.getElementById('remote-media-div');
                remoteMediaContainer.replaceChild(
                  track.attach(),
                  remoteMediaContainer.firstChild
                );
              });
            });
            // When a participant disconnects, detach their media tracks
            room.on('participantDisconnected', (participant) => {
              participant.tracks.forEach((publication) => {
                console.log(
                  'Participant "%s" disconnected',
                  participant.identity
                );
                // TODO: Find the correct code for clearing the media track div, or just replace with avatar
              });
            });

            room.on('disconnected', (room) => {
              // Detach local media elements
              room.localParticipant.tracks.forEach((publication) => {
                const attachedElements = publication.track.detach();
                attachedElements.forEach((element) => element.remove());
              });
            });
          },
          (error) => {
            console.error(`Unable to connect to Room: ${error.message}`);
          }
        );
    });

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

  // Take the array of panel data and make an array of panel elements
  const panels = panelData
    .filter(
      (panel) => panelState.focused === null || panelState.focused === panel.id
    )
    .map((panel) => {
      if (panel.id === 1)
        return <TitlePanel key={1} onSelect={() => selectPanel(1)} />;
      else if (panel.id === 2)
        return (
          <VideoPanel
            key={2}
            chatRoom={chatRoom}
            onSelect={() => selectPanel(2)}
          />
        );
      else if (panel.id === 3)
        return <ChatPanel key={3} onSelect={() => selectPanel(3)} />;
      else
        return (
          <Panel
            key={panel.id}
            {...panel}
            onSelect={() => selectPanel(panel.id)}
          />
        );
    });

  return <main className={dashboardClasses}>{panels}</main>;
}

export default App;
