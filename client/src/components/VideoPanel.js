import React, { Component } from 'react';

export default function VideoPanel({ onSelect }) {
  // EXPECTED PROPS:
  // onSelect:Function

  return (
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
      onClick={onSelect}
    >
      <h1 className="font-display text-4xl text-black text-center">Squad</h1>

      <div className="grid grid-rows-2 grid-cols-2 gap-3">
        <div className="border-2 border-teal" style={{ height: '10rem' }}>
          KEHAN
        </div>
        <div className="border-2 border-teal" style={{ height: '10rem' }}>
          LISA
        </div>
        <div className="border-2 border-teal" style={{ height: '10rem' }}>
          GONZO
        </div>
        <div className="border-2 border-teal" style={{ height: '10rem' }}>
          JAKE
        </div>
      </div>
    </section>
  );
}
