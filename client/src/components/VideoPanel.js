import React, { Component } from 'react';
import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function VideoPanel({ onSelect, chatRoom }) {
  // EXPECTED PROPS:
  // onSelect:Function

  // TODO -- Update this so the Big Heads aren't regenerated on each click to this panel

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
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
      // onClick={onSelect}
    >
      <button type="button" className="flex mx-6" onClick={onSelect}>
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="font-display mb-6 text-4xl text-black text-center">
        Squad
      </h1>

      <div className="grid grid-rows-2 grid-cols-2 gap-3">
        <div
          id="local-media-div"
          className="w-48 border-2 border-dark-gray mx-auto"
        >
          <div className="flex flex-col items-center">
            <BigHead className="w-1/2 mb-3" />
            GONZO
          </div>
        </div>

        <div
          id="remote-media-div"
          className="w-48 border-2 border-dark-gray mx-auto"
        >
          <div className="flex flex-col items-center">
            <BigHead className="w-1/2 mb-3" />
            LISA
          </div>
        </div>

        <div className="w-48 border-2 border-dark-gray mx-auto">
          <div className="flex flex-col items-center">
            <BigHead className="w-1/2 mb-3" />
            KEHAN
          </div>
        </div>

        <div className="w-48 border-2 border-dark-gray mx-auto">
          <div className="flex flex-col items-center">
            <BigHead className="w-1/2 mb-3" />
            GONZO
          </div>
        </div>
      </div>
      {/* <div>
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

        <button
          type="button"
          name="disconnect"
          onClick={() => chatRoom.disconnect()}
        >
          <FontAwesomeIcon icon={solid('phone-slash')} />
        </button>
      </div> */}
    </section>
  );
}
