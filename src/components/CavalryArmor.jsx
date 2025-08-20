import { useState } from 'react';
import images from '../lib/imagestrings.json';
import { useTechstrings } from '../hooks/helpers';

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

  const { data: text, isLoading } = useTechstrings();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>{text.cavalryArmor.title}</p>
      {visibleTech === 1 &&
      <div className='scale-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.cavalryArmor.tierOne.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.cavalryArmor.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.cavalryArmor.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.cavalryArmor.tierOne.description}</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='chain-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.cavalryArmor.tierTwo.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.cavalryArmor.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.cavalryArmor.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.cavalryArmor.tierTwo.description}</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='plate-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.cavalryArmor.tierThree.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.cavalryArmor.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.cavalryArmor.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.cavalryArmor.tierThree.description}</p>
      </div>
      }
    </div>
  )
}