import { useState } from 'react';
import buttonLeft from '../public/button_left.webp';
import buttonRight from '../public/button_right.webp';
import { useTechstrings } from '../hooks/helpers';
import type { TieredTechKey } from '../types/techTypes';
import ArrowButton from './ArrowButton';
import CostList from './CostList';

const TIERS = ['tierOne', 'tierTwo', 'tierThree'] as const;

/** An upgrade line (e.g. archer armor) whose tiers are cycled with arrows. */
export default function TieredTech({ techKey }: { techKey: TieredTechKey }) {
  const [index, setIndex] = useState(0);
  const { data: text } = useTechstrings();

  const upgrade = text?.[techKey];
  if (!upgrade) return null;

  const tiers = TIERS.flatMap((key) => upgrade[key] ?? []);
  const tier = tiers[Math.min(index, tiers.length - 1)];

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>{upgrade.title}</p>
      <div className='tooltip-container'>
        <ArrowButton
          direction='left'
          icon={buttonLeft}
          label='Previous tier'
          atEnd={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        />
        <p className='tooltip-tech-name'>{tier.name}</p>
        <ArrowButton
          direction='right'
          icon={buttonRight}
          label='Next tier'
          atEnd={index === tiers.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        />
      </div>
      <span className='tooltip-cost'>
        Cost: <CostList cost={tier.cost} />
      </span>
      <p className='tooltip-text'>{tier.description}</p>
    </div>
  );
}
