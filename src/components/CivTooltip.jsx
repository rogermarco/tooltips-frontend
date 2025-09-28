/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useCivstrings } from "../hooks/helpers";
import arrowLeft from '../public/arrow_left.png';
import arrowRight from '../public/arrow_right.png';
import TechTree from './TechTree';

export default function CivTooltip({ civ }) {
  const [visiblePage, setVisiblePage] = useState(1);
  // 1 = overview, 2 = techtree

  const togglePageLeft = () => {
    if (visiblePage === 2) {
      setVisiblePage(1);
    } 
  }

  const togglePageRight = () => {
    if (visiblePage === 1) {
      setVisiblePage(2);
    }
  }

  const { data: civs, isLoading } = useCivstrings();
  if (isLoading) return null;
  
  // const civstrings = civs[civ];
  const requiredCiv = civs[civ];

  return (
    <div className='civ-tooltip'>
      <div className='page-buttons'>
        <img src={arrowLeft} className='tooltip-arrow-left' onClick={togglePageLeft} style={{marginRight: '10px'}} />
        <img src={arrowRight} className='tooltip-arrow-right' onClick={togglePageRight} />
      </div>
      {visiblePage === 1 ?
      <div className='civ-tooltip-text' dangerouslySetInnerHTML={{ __html: requiredCiv }}></div>
      :
      <TechTree />
      }
    </div>
  );
}