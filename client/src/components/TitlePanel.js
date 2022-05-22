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
      className="dashboard__panel relative bg-gold"
      style={{ border: '1px solid black' }}
    >
      <button
        type="button"
        className="mt-3 absolute"
        style={{ width: '93%' }}
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="mt-3 mb-5 font-display text-4xl text-black text-center">
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
