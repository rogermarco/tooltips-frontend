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

export default function InfCavAttack() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = forging, 2 = iron casting, 3 = blast furnace

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
      <p className='tooltip-title'>{text.infantryCavalryAttack.title}</p>
      {visibleTech === 1 &&
      <div className='forging-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryCavalryAttack.tierOne.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryCavalryAttack.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryCavalryAttack.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryCavalryAttack.tierOne.description}</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='ironcasting-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryCavalryAttack.tierTwo.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryCavalryAttack.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryCavalryAttack.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryCavalryAttack.tierTwo.description}</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='blastfurnace-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.infantryCavalryAttack.tierThree.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.infantryCavalryAttack.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.infantryCavalryAttack.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.infantryCavalryAttack.tierThree.description}</p>
      </div>
      }
    </div>
  )
}