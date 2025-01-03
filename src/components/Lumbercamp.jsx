import food from '/food.png';
import wood from '/wood.png';
import leftArrow from '/button_left_normal.png';
import rightArrow from '/button_right_normal.png';
import { useState } from 'react';
import './styles.css';

export default function Lumbercamp() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = bit axe, 2 = bow saw, 3 = two man saw

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
      <p className='tooltip-title'>Lumber Camp Upgrades</p>
      {visibleTech === 1 &&
      <div className='bitaxe-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Double-Bit Axe</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 100 <img src={food} style={{verticalAlign: '-17%'}} /> 50 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers chop wood 20% faster.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='bowsaw-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Bow Saw</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 150 <img src={food} style={{verticalAlign: '-17%'}} /> 100 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers chop wood 20% faster.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='twoman-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Two-Man Saw</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 300 <img src={food} style={{verticalAlign: '-17%'}} /> 200 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers chop wood 10% faster.</p>
      </div>
      }
    </div>
  )
}