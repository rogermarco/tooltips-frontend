/* eslint-disable react/prop-types */
// import civs from '../public/civstrings.json';
import { useCivstrings } from "../hooks/helpers";

export default function CivTooltip({ civ }) {
  const { data: civs, isLoading } = useCivstrings();
  if (isLoading) return null;
  
  // const civstrings = civs[civ];
  const requiredCiv = civs[civ];

  return (
    <div className='civ-tooltip'>
      <div className='civ-tooltip-text' dangerouslySetInnerHTML={{ __html: requiredCiv }}></div>
    </div>
  );
}