import { useTechstrings } from '../hooks/helpers';
import food from '../public/food.png';
import gold from '../public/gold.png';
import wood from '../public/wood.png';

const images = {
  food,
  wood,
  gold,
};

export default function Bloodlines() {

  const { data: text, isLoading } = useTechstrings();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>{text.bloodlines.title}</p>
      <span className='tooltip-cost'>
        Cost: {text.bloodlines.cost.map((item, index) => (
          <span key={index}>
            {item.amount} <img src={images[item.resource]} alt={item.resource} />
            {index < text.bloodlines.cost.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
      <p className='tooltip-text'>{text.bloodlines.description}</p>
    </div>
  )
}