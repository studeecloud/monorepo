import { Component, useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function TitlePanel(props) {
  const {
    onSelect, //used in onSelect Function
    roomName, //used in displaying roomName
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

        <h3 className="font-body text-2xl text-center">
          <strong>Room: </strong>
          {roomName}
        </h3>
      </div>
    </section>
  );
}
