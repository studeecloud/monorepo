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
import TitlePanel from './components/TitlePanel';
import VideoPanel from './components/VideoPanel';
import ChatPanel from './components/ChatPanel';
import SoundPanel from './components/SoundPanel';

function App({ userName, token, chatRoom }) {
  const [showVideos, setShowVideos] = useState(true);

  const toggleShowVideos = () => {
    if (showVideos) {
      setShowVideos(false);
      return;
    }
    setShowVideos(true);
  };

  const roomName = chatRoom.name;

  // const [data, setData] = useState([]); // TODO -- old code, remove
  const [panelState, setPanelState] = useState({ focused: null });

  const selectPanel = (id) => {
    setPanelState((prev) => ({
      focused: prev.focused ? null : id,
    }));
  };

  // TODO -- delete the 9 lines of code below this -- we're not using the headArray anymore, that was for testing
  // const headNum = 5;
  // const headArray = [];
  // for (let i = 1; i <= headNum; i++) {
  //   headArray.push(
  //     <div style={{ width: '5rem' }} key={i.toString()}>
  //       <BigHead />
  //     </div>
  //   );
  // }

  // If we receive an event indicating a track was disabled, execute the code inside
  function handleTrackDisabled(track) {
    track.on('disabled', () => {
      // TODO - render Big Head avatar
      console.log('Track disabled:');
      console.log(track);
    });
  }
  // If we receive an event indicating a track was enabled, execute the code inside
  function handleTrackEnabled(track) {
    track.on('enabled', () => {
      // TODO - render Big Head avatar
      console.log('Track enabled:');
      console.log(track);
    });
  }

  chatRoom.participants.forEach((participant) => {
    // Display any new media tracks that are subscribed by participants in the room
    participant.on('trackSubscribed', (track) => {
      const remoteMediaContainer = document.getElementById('remote-media-div');
      if (remoteMediaContainer) {
        remoteMediaContainer.replaceChild(
          track.attach(),
          remoteMediaContainer.firstChild
        );
      }
    });

    participant.tracks.forEach((publication) => {
      // When a new media track is subscribed, attach the listeners to it
      publication.on('subscribed', handleTrackDisabled);
      publication.on('subscribed', handleTrackEnabled);

      publication.on('unsubscribed', () => {
        // TODO - render Big Heads avatar
        console.log('Publication unsubscribed:');
        console.log(publication);
      });

      publication.on('subscribed', () => {
        // TODO - render Big Heads avatar
        console.log('Publication subscribed:');
        console.log(publication);
      });
    });
  });

  useEffect(() => {
    chatRoom.participants.forEach((participant) => {
      participant.tracks.forEach((publication) => {
        // Display the media tracks of participants that are already in the room
        if (publication.track && document.getElementById('remote-media-div')) {
          const remoteMediaContainer =
            document.getElementById('remote-media-div');
          if (remoteMediaContainer) {
            remoteMediaContainer.replaceChild(
              publication.track.attach(),
              remoteMediaContainer.firstChild
            );
          }
        }
        // Attach the listeners to every subscribed media track
        if (publication.isSubscribed) {
          handleTrackEnabled(publication.track);
          handleTrackDisabled(publication.track);
        }
      });
    });
  }, [chatRoom.participants, showVideos]);

  // When a new participant connects, display their published media tracks
  chatRoom.on('participantConnected', (participant) => {
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
      const remoteMediaContainer = document.getElementById('remote-media-div');
      if (remoteMediaContainer) {
        remoteMediaContainer.replaceChild(
          track.attach(),
          remoteMediaContainer.firstChild
        );
      }
    });
  });
  // When a participant disconnects, detach their media tracks
  chatRoom.on('participantDisconnected', (participant) => {
    participant.tracks.forEach((publication) => {
      console.log('Participant "%s" disconnected', participant.identity);
      // TODO: Find the correct code for clearing the media track div, or just replace with avatar
    });
  });

  chatRoom.on('disconnected', (room) => {
    // Detach local media elements
    room.localParticipant.tracks.forEach((publication) => {
      const attachedElements = publication.track.detach();
      attachedElements.forEach((element) => element.remove());
    });
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
        return (
          <TitlePanel
            key={1}
            roomName={roomName}
            onSelect={() => selectPanel(1)}
          />
        );
      else if (panel.id === 2)
        return (
          <VideoPanel
            key={2}
            chatRoom={chatRoom}
            onSelect={() => selectPanel(2)}
            showVideos={showVideos}
            toggleShowVideos={toggleShowVideos}
          />
        );
      else if (panel.id === 3)
        return (
          <ChatPanel
            key={3}
            onSelect={() => selectPanel(3)}
            userName={userName}
          />
        );
      else if (panel.id === 4)
        return <SoundPanel key={4} onSelect={() => selectPanel(4)} />;
    });

  return <main className={dashboardClasses}>{panels}</main>;
}

export default App;
