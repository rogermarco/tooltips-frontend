import { useState } from 'react';
import images from '../lib/imagestrings.json';

export default function ArcherArmor() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = padded, 2 = leather, 3 = ring

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
      <p className='tooltip-title'>Archer Armor Upgrades</p>
      {visibleTech === 1 &&
      <div className='padded-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Padded Archer Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 100 <img src={images.food} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers and cavalry archers have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='leather-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Leather Archer Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 150 <img src={images.food} style={{verticalAlign: '-17%'}} /> 150 <img src={images.gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers and cavalry archers have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='ring-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} /> 
          <p className='tooltip-tech-name'>Ring Archer Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 250 <img src={images.food} style={{verticalAlign: '-17%'}} /> 250 <img src={images.gold} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Archers and cavalry archers have +1 normal/+2 pierce armor.</p>
      </div>
      }
    </div>
  )
}