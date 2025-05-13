import { useState } from 'react';
import images from '../lib/imagestrings.json';
import PropTypes from 'prop-types';

Mill.propTypes = {
  civ: PropTypes.string.isRequired
}

export default function Mill({ civ }) {
  const [visibleTech, setVisibleTech] = useState(1);
  const isKhitans = civ === 'khitans';

  // 1 = horse collar, 2 = heavy plow, 3 = crop rotation
  // for Khitans: 1 = domestication, 2 = pastoralism, 3 = transhumance

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
      {/* MILL UPGRADES */}
      {!isKhitans && visibleTech === 1 &&
      <div className='horsecollar-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Horse Collar</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 75 <img src={images.food}/> 75 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>Farms produce +75 food so they last longer before you must rebuild them.</p>
      </div>
      }
      {!isKhitans && visibleTech === 2 &&
      <div className='heavyplow-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Heavy Plow</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 125 <img src={images.food}/> 125 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>Farms produce +125 food so they last longer before you must rebuild them. Farmers carry +1 food each trip.</p>
      </div>
      }
      {!isKhitans && visibleTech === 3 &&
      <div className='croprotation-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Crop Rotation</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 250 <img src={images.food}/> 250 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>Farms produce +175 food so they last longer before you must rebuild them.</p>
      </div>
      }
      {/* PASTURE UPGRADES */}
      {isKhitans && visibleTech === 1 &&
      <div className='domestication-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Domestication</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 50 <img src={images.food}/> 100 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>New Pastures provide +1 animal.</p>
      </div>
      }
      {isKhitans && visibleTech === 2 &&
      <div className='pastoralism-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Pastoralism</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 100 <img src={images.food}/> 150 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>New Pastures provide +2 animals.</p>
      </div>
      }
      {isKhitans && visibleTech === 3 &&
      <div className='transhumance-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>Transhumance</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>(Cost: 175 <img src={images.food}/> 325 <img src={images.wood}/>)</span>
        <p className='tooltip-text'>New Pastures provide +3 animals.</p>
      </div>
      }
    </div>
  )
}