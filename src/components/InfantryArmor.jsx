import { useState } from 'react';
import images from '../lib/imagestrings.json';

export default function InfantryArmor() {
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
      <p className='tooltip-title'>Infantry Armor Upgrades</p>
      {visibleTech === 1 &&
      <div className='scale-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Scale Mail Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 100 <img src={images.food}/>)</span>
        <p className='tooltip-text'>Infantry have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='chain-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Chain Mail Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 200 <img src={images.food}/> 100 <img src={images.gold}/>)</span>
        <p className='tooltip-text'>Infantry have +1 normal/+1 pierce armor.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='plate-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Plate Mail Armor</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 300 <img src={images.food}/> 150 <img src={images.gold}/>)</span>
        <p className='tooltip-text'>Infantry have +1 normal/+2 pierce armor.</p>
      </div>
      }
    </div>
  )
}