import { useState, useEffect } from 'react';
import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack,
} from 'twilio-video';

export default function VideoPanel({ onSelect, chatRoom, focused }) {
  // TODO -- Update this so the Big Heads aren't regenerated on each click to this panel
  const [showVideos, setShowVideos] = useState(true);

  const toggleShowVideos = () => {
    if (showVideos) {
      setShowVideos(false);
      return;
    }
    setShowVideos(true);
  };

  // Display a local camera preview
  createLocalVideoTrack().then((track) => {
    if (document.getElementById('local-media-div')) {
      const localMediaContainer = document.getElementById('local-media-div');
      localMediaContainer.replaceChild(
        track.attach(),
        localMediaContainer.firstChild
      );
    }
  });

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

  useEffect(() => {
    // Iterate over remote participants in the room
    chatRoom.participants.forEach((participant) => {
      // Iterate over media tracks for the participant
      participant.tracks.forEach((publication) => {
        // If the media track is published, display it
        if (publication.track) {
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

        // When a new media track is subscribed, attach the listeners to it
        publication.on('subscribed', handleTrackDisabled);
        publication.on('subscribed', handleTrackEnabled);

        publication.on('unsubscribed', () => {
          // TODO - render Big Heads avatar
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
        if (remoteMediaContainer) {
          remoteMediaContainer.replaceChild(
            track.attach(),
            remoteMediaContainer.firstChild
          );
        }

        participant.tracks.forEach((publication) => {});
      });
    });
  }, [chatRoom, focused, showVideos]);

  // When a new participant connects, display their published media tracks
  chatRoom.on('participantConnected', (participant) => {
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

  // Call control buttons for local participant
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
    <section className="dashboard__panel relative border bg-meringue">
      <button
        type="button"
        className="absolute"
        style={{ top: '3.5%', right: '2%' }}
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>

      <button
        type="button"
        className="absolute"
        style={{ bottom: '3.5%', left: '2%' }}
        onClick={toggleShowVideos}
      >
        <FontAwesomeIcon icon={solid('rectangle')} className="h-7" />
      </button>

      {!showVideos && (
        <div className="flex flex-col justify-center h-full w-fit mx-auto">
          <h1 className="mt-3 mb-5 font-display text-4xl text-center">
            Focus Mode Engaged
          </h1>

          <h1 className="mt-3 mb-5 font-display text-4xl text-center">
            It's Time For Work!
          </h1>
        </div>
      )}

      {showVideos && (
        <>
          <h1 className="mt-3 mb-5 font-display mb-6 text-4xl text-center">
            Squad
          </h1>

          <div className="grid grid-rows-2 grid-cols-2 gap-3">
            <div className="w-48 mx-auto flex flex-col items-center border-2 border-dark-gray">
              <div id="local-media-div">
                <div className="flex flex-col items-center">
                  <BigHead className="w-1/2 mb-3" />
                  YOU
                </div>
              </div>
              <div
                id="callControlPanel"
                className="w-48 mt-2 mb-1 flex justify-around"
              >
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

                <button
                  type="button"
                  name="micOff"
                  onClick={() => muteAudio(chatRoom)}
                >
                  <FontAwesomeIcon icon={solid('microphone-slash')} />
                </button>

                <button
                  type="button"
                  name="micOn"
                  onClick={() => enableAudio(chatRoom)}
                >
                  <FontAwesomeIcon icon={solid('microphone')} />
                </button>

                {/* <button
              type="button"
              name="disconnect"
              onClick={() => chatRoom.disconnect()}
            >
              <FontAwesomeIcon icon={solid('phone-slash')} />
            </button> */}
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
        </>
      )}
    </section>
  );
}
