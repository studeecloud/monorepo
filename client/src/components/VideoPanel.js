import React, { Component } from 'react';
import { BigHead } from '@bigheads/core';

export default function VideoPanel({ onSelect }) {
  // EXPECTED PROPS:
  // onSelect:Function

  // TODO -- Update this so the Big Heads aren't regenerated on each click to this panel

  return (
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
      onClick={onSelect}
    >
      <h1 className="font-display mb-2 text-4xl text-black text-center">
        Squad
      </h1>

      <div className="grid grid-rows-2 grid-cols-2 gap-3">
        <div className="border-2 border-coral flex flex-col items-center">
          <div
            id="remote-media-div"
            style={{
              display: 'inline-block',
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
        <div className="border-2 border-coral flex flex-col items-center">
          <BigHead className="w-1/3 mb-3" />
          LISA
        </div>
        <div className="border-2 border-coral flex flex-col items-center">
          <BigHead className="w-1/3 mb-3" />
          GONZO
        </div>
        <div className="border-2 border-coral flex flex-col items-center">
          <BigHead className="w-1/3 mb-3" />
          JAKE
        </div>
      </div>
    </section>
  );
}
