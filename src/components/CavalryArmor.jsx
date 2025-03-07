import { useState } from 'react';
import images from '../lib/imagestrings.json';

export default function CavalryArmor() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = scale, 2 = chain, 3 = plate

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
      <p className='tooltip-title'>Cavalry Armor Upgrades</p>
      {visibleTech === 1 &&
      <div className='scale-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Scale Barding Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 150 <img src={images.food}/>)</span>
        <p className='tooltip-text'>Cavalry have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='chain-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Chain Barding Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 250 <img src={images.food}/> 150 <img src={images.gold}/>)</span>
        <p className='tooltip-text'>Cavalry have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='plate-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Plate Barding Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 350 <img src={images.food}/> 200 <img src={images.gold}/>)</span>
        <p className='tooltip-text'>Cavalry have +1 normal/+2 pierce armor.</p>
      </div>
      }
    </div>
  )
}