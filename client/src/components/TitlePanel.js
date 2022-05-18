import React, { Component } from 'react';

export default function TitlePanel({ title, bodyText, onSelect }) {
  // EXPECTED PROPS:
  // title:String, bodyText:String, onSelect:Function

  return (
    <section
      className="dashboard__panel"
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
    </section>
  );
}
