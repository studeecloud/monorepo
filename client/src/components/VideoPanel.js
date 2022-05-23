import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack,
} from 'twilio-video';

export default function VideoPanel({
  onSelect,
  chatRoom,
  showVideos,
  toggleShowVideos,
}) {
  // TODO -- Update this so the Big Heads aren't regenerated on each click to this panel

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
