import { useUniquestrings } from '../hooks/helpers';
import PropTypes from 'prop-types';
import food from '../public/food.png';
import gold from '../public/gold.png';
import wood from '../public/wood.png';

const images = {
  food,
  wood,
  gold,
};

CastleTech.propTypes = {
  civ: PropTypes.string
}

export default function CastleTech({ civ }) {
  
  const { data: text, isLoading } = useUniquestrings();
  const civKey = text[civ];
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>{civKey.castle.title}</p>
      <span className='tooltip-cost'>
        Cost: {civKey.castle.cost.map((item, index) => (
          <span key={index}>
            {item.amount} <img src={images[item.resource]} alt={item.resource} />
            {index < civKey.castle.cost.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
      <p className='tooltip-text'>{civKey.castle.description}</p>
    </div>
  )
}