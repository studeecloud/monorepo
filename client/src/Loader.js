import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, createLocalTracks } from 'twilio-video';

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
        console.log(`Successfully joined a Room: ${room}`);
        setChatRoom(room);
      });
  }, [token]);

  return (
    <>
      {token !== '' && chatRoom !== null && (
        <App userName={userName} chatRoom={chatRoom} />
      )}
    </>
  );
}

export default Loader;
