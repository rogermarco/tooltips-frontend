import { useState } from 'react';
import buttonLeft from '../public/button_left.png';
import buttonRight from '../public/button_right.png';
import food from '../public/food.png';
import gold from '../public/gold.png';
import wood from '../public/wood.png';
import { useTechstrings } from '../hooks/helpers';

const images = {
  food,
  wood,
  gold,
};

export default function ArcherAttack() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = fletching, 2 = bodkin, 3 = bracer

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
      <p className='tooltip-title'>{text.archerAttack.title}</p>
      {visibleTech === 1 &&
      <div className='fletching-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.archerAttack.tierOne.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.archerAttack.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.archerAttack.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.archerAttack.tierOne.description}</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='bodkin-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.archerAttack.tierTwo.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.archerAttack.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.archerAttack.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.archerAttack.tierTwo.description}</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='bracer-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.archerAttack.tierThree.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.archerAttack.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.archerAttack.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.archerAttack.tierThree.description}</p>
      </div>
      }
    </div>
  )
}