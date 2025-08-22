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

export default function Lumbercamp() {
  const [visibleTech, setVisibleTech] = useState(1);
  // 1 = bit axe, 2 = bow saw, 3 = two man saw

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
      <p className='tooltip-title'>{text.lumbercamp.title}</p>
      {visibleTech === 1 &&
      <div className='bitaxe-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.lumbercamp.tierOne.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.lumbercamp.tierOne.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.lumbercamp.tierOne.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.lumbercamp.tierOne.description}</p>
      </div>
      }
      {visibleTech === 2 &&
      <div className='bowsaw-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.lumbercamp.tierTwo.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.lumbercamp.tierTwo.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.lumbercamp.tierTwo.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.lumbercamp.tierTwo.description}</p>
      </div>
      }
      {visibleTech === 3 &&
      <div className='twoman-container'>
        <div className='tooltip-container'>
          <img src={buttonLeft} className='tooltip-arrow-left' onClick={toggleTechLeft} />
          <p className='tooltip-tech-name'>{text.lumbercamp.tierThree.name}</p>
          <img src={buttonRight} className='tooltip-arrow-right' onClick={toggleTechRight} />
        </div>
        <span className='tooltip-cost'>
          Cost: {text.lumbercamp.tierThree.cost.map((item, index) => (
            <span key={index}>
              {item.amount} <img src={images[item.resource]} alt={item.resource} />
              {index < text.lumbercamp.tierThree.cost.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
        <p className='tooltip-text'>{text.lumbercamp.tierThree.description}</p>
      </div>
      }
    </div>
  )
}