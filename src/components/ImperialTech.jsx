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

ImperialTech.propTypes = {
  civ: PropTypes.string
}

export default function ImperialTech({ civ }) {

  const { data: text, isLoading } = useUniquestrings();
  const civKey = text[civ];
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>{civKey.imperial.title}</p>
      <span className='tooltip-cost'>
        Cost: {civKey.imperial.cost.map((item, index) => (
          <span key={index}>
            {item.amount} <img src={images[item.resource]} alt={item.resource} />
            {index < civKey.imperial.cost.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
      <p className='tooltip-text'>{civKey.imperial.description}</p>
    </div>
  )
}