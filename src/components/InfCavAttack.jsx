import food from '/food.png';
import gold from '/gold.png';
import leftArrow from '/button_left_normal.png';
import rightArrow from '/button_right_normal.png';
import { useState } from 'react';
import './styles.css';

export default function InfCavAttack() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = forging, 2 = iron casting, 3 = blast furnace

  const toggleTechLeft = () => {
    if (visibleTech === 2 || visibleTech === 3) {
      setVisibleTech(visibleTech - 1);
    } 
  }

  const toggleTechRight = () => {
    if (visibleTech === 1 || visibleTech === 2) {
      setVisibleTech(visibleTech + 1);
    }
  }

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>Infantry & Cavalry Attack Upgrades</p>
      {visibleTech === 1 &&
      <div className='forging-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Forging</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 150 <img src={food} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Infantry and cavalry have +1 attack.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='ironcasting-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Iron Casting</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 220 <img src={food} style={{verticalAlign: '-17%'}} /> 120 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Infantry and cavalry have +1 attack.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='blastfurnace-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Blast Furnace</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 275 <img src={food} style={{verticalAlign: '-17%'}} /> 225 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Infantry and cavalry have +2 attack.</p>
      </div>
      }
    </div>
  )
}