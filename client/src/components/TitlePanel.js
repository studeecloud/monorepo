import React, { Component } from 'react';
import PomodoroTimer from './PomodoroTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function TitlePanel({ onSelect }) {
  // EXPECTED PROPS:
  // onSelect:Function

  return (
    <section
      className="dashboard__panel bg-gold"
      style={{ border: '1px solid black' }}
      // onClick={onSelect}
    >
      <button type="button" className="flex mx-6" onClick={onSelect}>
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="font-display text-4xl text-black text-center">
        StudeeCloud
      </h1>
      <h2 className="font-header text-2xl text-center">
        Collaborative
        <br />
        Study Environment
      </h2>
      <div className="w-1/6">
        <PomodoroTimer />
      </div>
    </section>
  );
}
