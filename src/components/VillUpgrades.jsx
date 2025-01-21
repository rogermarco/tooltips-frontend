import { useState } from 'react';
import images from '../lib/imagestrings.json';

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
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Wheelbarrow</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 175 <img src={images.food} style={{verticalAlign: '-17%'}} /> 50 <img src={images.wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers work more efficiently by moving 10% faster and carrying 25% more resources.</p>
      </div>
      :
      <div className='handcart-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Hand Cart</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 300 <img src={images.food} style={{verticalAlign: '-17%'}} /> 200 <img src={images.wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Villagers work more efficiently by moving 10% faster and carrying 50% more resources.</p>
      </div>
      }
    </div>
  )
}