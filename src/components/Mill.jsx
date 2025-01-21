import { useState } from 'react';
import images from '../lib/imagestrings.json';

export default function Mill() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = horse collar, 2 = heavy plow, 3 = crop rotation

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
      <p className='tooltip-title'>Farm Upgrades</p>
      {visibleTech === 1 &&
      <div className='horsecollar-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Horse Collar</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 75 <img src={images.food} style={{verticalAlign: '-17%'}} /> 75 <img src={images.wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +75 food so they last longer before you must rebuild them.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='heavyplow-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Heavy Plow</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 125 <img src={images.food} style={{verticalAlign: '-17%'}} /> 125 <img src={images.wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +125 food so they last longer before you must rebuild them. Farmers carry +1 food each trip.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='croprotation-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Crop Rotation</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 250 <img src={images.food} style={{verticalAlign: '-17%'}} /> 250 <img src={images.wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +175 food so they last longer before you must rebuild them.</p>
      </div>
      }
    </div>
  )
}