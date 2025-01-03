import food from '/food.png';
import gold from '/gold.png';
import leftArrow from '/button_left_normal.png';
import rightArrow from '/button_right_normal.png';
import { useState } from 'react';
import './styles.css';

export default function ArcherAttack() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = fletching, 2 = bodkin, 3 = bracer

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
      <p className='tooltip-title'>Archer Attack & Range Upgrades</p>
      {visibleTech === 1 &&
      <div className='fletching-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Fletching</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 100 <img src={food} style={{verticalAlign: '-17%'}} /> 50 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers, galleys, Castles, and towers have +1 attack and +1 range. Town Centers have +1 attack.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='bodkin-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Bodkin Arrow</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 200 <img src={food} style={{verticalAlign: '-17%'}} /> 100 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers, galleys, Castles, and towers have +1 attack and +1 range. Town Centers have +1 attack.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='bracer-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Bracer</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 300 <img src={food} style={{verticalAlign: '-17%'}} /> 200 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers, galleys, Castles, and towers have +1 attack and +1 range. Town Centers have +1 attack.</p>
      </div>
      }
    </div>
  )
}