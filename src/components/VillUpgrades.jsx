import food from '/food.png';
import wood from '/wood.png';
import leftArrow from '/button_left_normal.png';
import rightArrow from '/button_right_normal.png';
import { useState } from 'react';

export default function VillUpgrades() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = wheelbarrow, 2 = handcart

  const toggleTechLeft = () => {
    if (visibleTech === 2) {
      setVisibleTech(1);
    } 
  }

  const toggleTechRight = () => {
    if (visibleTech === 1) {
      setVisibleTech(2);
    }
  }

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>Villager Upgrades</p>
      {visibleTech === 1 ?
      <div className='wheelbarrow-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Wheelbarrow</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 175 <img src={food} style={{verticalAlign: '-17%'}} /> 50 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers work more efficiently by moving 10% faster and carrying 25% more resources.</p>
      </div>
      :
      <div className='handcart-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Hand Cart</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 300 <img src={food} style={{verticalAlign: '-17%'}} /> 200 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers work more efficiently by moving 10% faster and carrying 50% more resources.</p>
      </div>
      }
    </div>
  )
}