import DiscoSound from './DiscoSound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function TitlePanel({ onSelect }) {
  return (
    <section
      className="dashboard__panel bg-gold"
      style={{ border: '1px solid black' }}
    >
      <button type="button" className="flex mx-6" onClick={onSelect}>
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>

      <h1 className="font-display text-4xl text-black text-center">
        StudeeCloud
      </h1>
      <h2 className="font-header text-2xl text-center">
        Disco
        <br />
        Inferno
      </h2>
      <DiscoSound />
    </section>
  );
}
