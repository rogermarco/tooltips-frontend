/* eslint-disable react/prop-types */
import civs from '../public/civstrings.json';

export default function CivTooltip({ civ }) {

  // const civstrings = civs[civ];
  const requiredCiv = civs[civ];

  return (
    <div className='civ-tooltip'>
      <div className='civ-tooltip-text' dangerouslySetInnerHTML={{ __html: requiredCiv }}></div>
    </div>
  );
}