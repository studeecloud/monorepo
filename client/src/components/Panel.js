import React, { Component } from 'react';

export default function Panel({ title, bodyText, onSelect }) {
  // EXPECTED PROPS:
  // title:String, bodyText:String, onSelect:Function

  return (
    <section
      className="dashboard__panel"
      style={{ border: '1px solid black' }}
      onClick={onSelect}
    >
      <h1>{title}</h1>
      <p>{bodyText}</p>
    </section>
  );
}
