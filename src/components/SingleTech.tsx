import { useTechstrings, useUniquestrings } from '../hooks/helpers';
import type { SingleTechKey, SingleUpgrade } from '../types/techTypes';
import CostList from './CostList';

function SingleTechCard({ title, cost, description }: SingleUpgrade) {
  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>{title}</p>
      <span className='tooltip-cost'>
        Cost: <CostList cost={cost} />
      </span>
      <p className='tooltip-text'>{description}</p>
    </div>
  );
}

/** A single upgrade from techstrings.json, e.g. Ballistics. */
export function SingleTech({ techKey }: { techKey: SingleTechKey }) {
  const { data: text } = useTechstrings();
  const tech = text?.[techKey];
  return tech ? <SingleTechCard {...tech} /> : null;
}

/** A civ's Castle or Imperial Age unique tech. */
export function UniqueTech({ civ, age }: { civ: string | undefined; age: 'castle' | 'imperial' }) {
  const { data: uniques } = useUniquestrings();
  const tech = civ ? uniques[civ]?.[age] : undefined;
  return tech ? <SingleTechCard {...tech} /> : null;
}
