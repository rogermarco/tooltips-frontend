import { useState } from 'react';
import images from '../lib/imagestrings.json';
import { useTextContent } from '../hooks/useTextContent';

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

  const { data: text, isLoading } = useTextContent();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-title'>{text.villUpgrades.title}</p>
      {visibleTech === 1 ?
      <div className='wheelbarrow-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.villUpgrades.tierOne.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.villUpgrades.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.villUpgrades.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.villUpgrades.tierOne.description}</p>
      </div>
      :
      <div className='handcart-container'>
        <div className='tooltip-container'>
          <img src={images.buttonL} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.villUpgrades.tierTwo.name}</p>
          <img src={images.buttonR} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.villUpgrades.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.villUpgrades.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.villUpgrades.tierTwo.description}</p>
      </div>
      }
    </div>
  )
}