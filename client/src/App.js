import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack,
} from 'twilio-video';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

function App() {
  // Display a local camera preview
  createLocalVideoTrack().then((track) => {
    const localMediaContainer = document.getElementById('local-media-div');
    localMediaContainer.appendChild(track.attach());
  });

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const [data, setData] = useState([]);

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

  const headNum = 5;
  const headArray = [];

  for (let i = 1; i <= headNum; i++) {
    headArray.push(
      <div style={{ width: '5rem' }} key={i.toString()}>
        <BigHead />
      </div>
    );
  }

  let chatRoom = null;
  // Create the media tracks that this user will be broadcasting to the Room with the 'audio' and 'video' keys in the object that is sent to createLocalTracks()
  createLocalTracks({
    audio: true,
    video: { width: 640 },
  }).then((localTracks) => {
    // Use the unique user token to connect to the given room name with the given local media tracks
    return connect(token, {
      name: 'DailyStandup',
      tracks: localTracks,
    }).then(
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
            document
              .getElementById('remote-media-div')
              .appendChild(track.attach());
          });
        });

        // The code in here executes when a new participant joins the call
        room.on('participantConnected', (participant) => {
          console.log(`A remote Participant connected: ${participant}`);

          // When a participant joins, we iterate over the possible media tracks that they might be broadcasting at the time that they join the Room
          participant.tracks.forEach((publication) => {
            // If a given media track is being broadcast, we grab it and append it to the 'remote-media-div'
            if (publication.isSubscribed) {
              const track = publication.track;
              document
                .getElementById('remote-media-div')
                .appendChild(track.attach());
            }
          });

          // If a participant begins broadcasting a media track that they were not broadcasting when they joined the call, this event is triggered
          participant.on('trackSubscribed', (track) => {
            // When that happens, we append it to the 'remote-media-div', same as above
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

  const muteAudio = (room) => {
    room.localParticipant.audioTracks.forEach((publication) => {
      publication.track.disable();
    });
  };

  const muteVideo = (room) => {
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.disable();
    });
  };

  const enableAudio = (room) => {
    room.localParticipant.audioTracks.forEach((publication) => {
      publication.track.enable();
    });
  };

  const enableVideo = (room) => {
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.enable();
    });
  };

  return (
    <main style={{ margin: '0 0 0 1rem' }}>
      <h1>StudeeCloud App</h1>
      <form action="" method="get">
        <input type="text" name="token" style={{ border: '1px solid blue' }} />
        <input type="submit" value="Submit" />
      </form>

      <div
        id="remote-media-div"
        style={{
          display: 'inline-block',
          border: '2px solid red',
          width: '12rem',
          height: '9rem',
        }}
      ></div>

      <div
        id="local-media-div"
        style={{
          display: 'inline-block',
          border: '2px solid green',
          width: '6rem',
          height: '4.5rem',
        }}
      ></div>

      <div>
        <button
          type="button"
          name="videoOff"
          onClick={() => muteVideo(chatRoom)}
        >
          <FontAwesomeIcon icon={solid('video-slash')} />
        </button>

        <button
          type="button"
          name="videoOn"
          onClick={() => enableVideo(chatRoom)}
        >
          <FontAwesomeIcon icon={solid('video')} />
        </button>

        <button type="button" name="micOff" onClick={() => muteAudio(chatRoom)}>
          <FontAwesomeIcon icon={solid('microphone-slash')} />
        </button>

        <button
          type="button"
          name="micOn"
          onClick={() => enableAudio(chatRoom)}
        >
          <FontAwesomeIcon icon={solid('microphone')} />
        </button>
      </div>
    </main>
  );
}

export default App;
