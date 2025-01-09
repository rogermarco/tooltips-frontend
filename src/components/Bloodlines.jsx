import food from '/food.png';
import gold from '/gold.png';

export default function Bloodlines() {
  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>Bloodlines</p> 
      <span className='tooltip-cost'>(Cost: 150 <img src={food} style={{verticalAlign: '-17%'}} /> 100 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
      <p className='tooltip-text'>Mounted units have +20 hit points.</p>
    </div>
  )
}