import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack,
} from 'twilio-video';

import App from './App';

function Loader() {
  const [token, setToken] = useState('');
  const [chatRoom, setChatRoom] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const userName = queryParams.get('username');
  const roomName = queryParams.get('room');

  useEffect(() => {
    if (userName !== '' && roomName !== '') {
      axios
        .get(`http://localhost:8080/video/token/${userName}/${roomName}`)
        .then((res) => {
          setToken(res.data);
        });
    }
  }, []);

  useEffect(() => {
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
      .then((room) => {
        setChatRoom(room);
      });
  }, [token]);

  // createLocalTracks({
  //   audio: true,
  //   video: { width: 640 },
  // });
  // .then((localTracks) => {
  //   // Use the unique user token to connect to the given room name with the given local media tracks
  //   return connect(token, {
  //     tracks: localTracks,
  //   });
  // })
  // .then((room) => {
  //   setChatRoom(room);
  // });

  return (
    <>
      {token !== '' && chatRoom !== null && (
        <App
          userName={userName}
          roomName={roomName}
          token={token}
          chatRoom={chatRoom}
        />
      )}
    </>
  );
}

export default Loader;
