import images from '../lib/imagestrings.json';
import { useTextContent } from '../hooks/useTextContent';

export default function Bloodlines() {

  const { data: text, isLoading } = useTextContent();
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