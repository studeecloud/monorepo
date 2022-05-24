import { Component, useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  light
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function TitlePanel(props) {
  const {
    roomName, //used in displaying roomName
    joinRoomLink,
  } = props;

  return (
    <section className="dashboard__panel relative border bg-meringue py-4">
      <div className="h-full flex flex-col justify-end">
        <div className="my-auto">
          <h1 className="mt-3 mb-5 font-display text-5xl text-center">
            StudeeCloud
          </h1>

          <h2 className="font-header text-3xl text-center">
            Collaborative
            <br />
            Study Environment
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <h3 className="font-body text-2xl">
            <strong>Room: </strong>
            {roomName}
          </h3>

          <button
            type="button"
            className="text-body text-xl border p-2 m-3 rounded"
            onClick={() => navigator.clipboard.writeText(joinRoomLink)}
          >
            Copy room link
          </button>
        </div>

        <h3 className="font-body text-2xl text-center">
          Share your room link with your team!
        </h3>

        <PomodoroTimer />
      </div>
    </section>
  );
}
