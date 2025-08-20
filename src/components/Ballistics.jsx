import images from '../lib/imagestrings.json';
import { useTechstrings } from '../hooks/helpers';

export default function Ballistics() {

  const { data: text, isLoading } = useTechstrings();
  if (isLoading) return null;

  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>{text.ballistics.title}</p> 
      <span className='tooltip-cost'>
        Cost: {text.ballistics.cost.map((item, index) => (
          <span key={index}>
            {item.amount} <img src={images[item.resource]} alt={item.resource} />
            {index < text.ballistics.cost.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
      <p className='tooltip-text'>{text.ballistics.description}</p>
    </div>
  )
}