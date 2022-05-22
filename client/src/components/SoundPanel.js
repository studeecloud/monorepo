import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

import DiscoSound from './DiscoSound';
import RainSound from './RainSound';
import GhibliSound from './GhibliSound';

export default function TitlePanel({ onSelect }) {
  return (
    <section
      className="dashboard__panel relative bg-meringue"
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
        Soundboard
      </h1>
      <h2 className="font-body text-lg text-center">SFX</h2>
      <DiscoSound />
      <RainSound />
      <GhibliSound />
    </section>
  );
}
