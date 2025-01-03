import food from '/food.png';
import wood from '/wood.png';
import leftArrow from '/button_left_normal.png';
import rightArrow from '/button_right_normal.png';
import { useState } from 'react';
import './styles.css';

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
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Horse Collar</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 75 <img src={food} style={{verticalAlign: '-17%'}} /> 75 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +75 food so they last longer before you must rebuild them.</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='heavyplow-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Heavy Plow</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 125 <img src={food} style={{verticalAlign: '-17%'}} /> 125 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +125 food so they last longer before you must rebuild them. Farmers carry +1 food each trip.</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='croprotation-container'>
        <div className='tooltip-container'>
          <img src={leftArrow} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Crop Rotation</p>
          <img src={rightArrow} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 250 <img src={food} style={{verticalAlign: '-17%'}} /> 250 <img src={wood} style={{verticalAlign: '-17%'}} />)</span>
        <p className='tooltip-text'>Farms produce +175 food so they last longer before you must rebuild them.</p>
      </div>
      }
    </div>
  )
}