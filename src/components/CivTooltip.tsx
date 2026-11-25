import { useState } from 'react';
import { useCivstrings } from '../hooks/helpers';
import arrowLeft from '../public/arrow_left.webp';
import arrowRight from '../public/arrow_right.webp';
import ArrowButton from './ArrowButton';
import TechTree from './TechTree';

/** Two pages: the civ overview text, then its tech tree. */
export default function CivTooltip({ civ }: { civ: string | undefined }) {
  const [page, setPage] = useState<'overview' | 'techtree'>('overview');
  const { data: civs } = useCivstrings();

  const requiredCiv = civ ? civs?.[civ] : undefined;
  if (!civ || !requiredCiv) return null;

  return (
    <div className='civ-tooltip'>
      <div className='page-buttons'>
        <ArrowButton
          direction='left'
          icon={arrowLeft}
          label='Civ overview'
          atEnd={page === 'overview'}
          onClick={() => setPage('overview')}
        />
        <ArrowButton
          direction='right'
          icon={arrowRight}
          label='Tech tree'
          atEnd={page === 'techtree'}
          onClick={() => setPage('techtree')}
        />
      </div>
      {page === 'overview' ? (
        <div
          className='civ-tooltip-text'
          dangerouslySetInnerHTML={{ __html: requiredCiv.string }}
        ></div>
      ) : (
        <TechTree civ={civ} />
      )}
    </div>
  );
}
