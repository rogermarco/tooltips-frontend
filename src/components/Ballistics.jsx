import images from '../lib/imagestrings.json';

export default function Ballistics() {
  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>Ballistics</p> 
      <span className='tooltip-cost'>(Cost: 300 <img src={images.wood}/> 175 <img src={images.gold}/>)</span>
      <p className='tooltip-text'>Archers, Town Centers, Castles, Galleys, Unique Naval Units, and Mounted Archers fire more accurately at moving targets.</p>
    </div>
  )
}