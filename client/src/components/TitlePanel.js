import React, { Component } from 'react';
import PomodoroTimer from './PomodoroTimer';

export default function TitlePanel({ onSelect }) {
  // EXPECTED PROPS:
  // onSelect:Function

  return (
    <section
      className="dashboard__panel bg-gold"
      style={{ border: '1px solid black' }}
      onClick={onSelect}
    >
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
      <form action="" method="get">
        <input type="text" name="token" style={{ border: '1px solid blue' }} />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}
