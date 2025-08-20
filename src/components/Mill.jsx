import { useState } from 'react';
import images from '../lib/imagestrings.json';
import PropTypes from 'prop-types';
import { useTechstrings } from '../hooks/helpers';

Mill.propTypes = {
  civ: PropTypes.string
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

  const { data: text, isLoading } = useTechstrings();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>{isKhitans ? 'Pasture Upgrades' : 'Farm Upgrades'}</p>
      {/* MILL UPGRADES */}
      {!isKhitans && visibleTech === 1 &&
      <div className='horsecollar-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.mill.tierOne.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.mill.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.mill.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.mill.tierOne.description}</p>
      </div>
      }
      {!isKhitans && visibleTech === 2 &&
      <div className='heavyplow-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.mill.tierTwo.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.mill.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.mill.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.mill.tierTwo.description}</p>
      </div>
      }
      {!isKhitans && visibleTech === 3 &&
      <div className='croprotation-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.mill.tierThree.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.mill.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.mill.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.mill.tierThree.description}</p>
      </div>
      }
      {/* PASTURE UPGRADES */}
      {isKhitans && visibleTech === 1 &&
      <div className='domestication-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.pasture.tierOne.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.pasture.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.pasture.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.pasture.tierOne.description}</p>
      </div>
      }
      {isKhitans && visibleTech === 2 &&
      <div className='pastoralism-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.pasture.tierTwo.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.pasture.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.pasture.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.pasture.tierTwo.description}</p>
      </div>
      }
      {isKhitans && visibleTech === 3 &&
      <div className='transhumance-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.pasture.tierThree.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.pasture.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.pasture.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.pasture.tierThree.description}</p>
      </div>
      }
    </div>
  )
}