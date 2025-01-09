import wood from '/wood.png';
import gold from '/gold.png';

export default function Ballistics() {
  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>Ballistics</p> 
      <span className='tooltip-cost'>(Cost: 300 <img src={wood} style={{verticalAlign: '-17%'}} /> 175 <img src={gold} style={{verticalAlign: '-17%'}} />)</span>
      <p className='tooltip-text'>Archers, Town Centers, Castles, Galleys, Unique Naval Units, and Mounted Archers fire more accurately at moving targets.</p>
    </div>
  )
}