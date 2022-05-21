import React, { Component } from 'react';
// import ExpandButton from './ExpandButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Panel({ title, bodyText, onSelect }) {
  // EXPECTED PROPS:
  // title:String, bodyText:String, onSelect:Function

  return (
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
    >
      <button
        type='button'
        className="flex mx-6"
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="font-display text-4xl text-black text-center">{title}</h1>
      <p className="font-body">{bodyText}</p>
    </section>
  );
}
