import { useState } from 'react';
import images from '../lib/imagestrings.json';
import { useTechstrings } from '../hooks/helpers';

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

  const { data: text, isLoading } = useTechstrings();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>{text.infantryArmor.title}</p>
      {visibleTech === 1 &&
      <div className='scale-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryArmor.tierOne.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryArmor.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryArmor.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryArmor.tierOne.description}</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='chain-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryArmor.tierTwo.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryArmor.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryArmor.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryArmor.tierTwo.description}</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='plate-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryArmor.tierThree.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryArmor.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryArmor.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryArmor.tierThree.description}</p>
      </div>
      }
    </div>
  )
}