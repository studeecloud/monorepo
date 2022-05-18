import React, { Component } from 'react';

export default function Panel({ title, bodyText, onSelect }) {
  // EXPECTED PROPS:
  // title:String, bodyText:String, onSelect:Function

  return (
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
      onClick={onSelect}
    >
      <h1 className="font-display text-4xl text-black text-center">{title}</h1>
      <p className="font-body">{bodyText}</p>
    </section>
  );
}
