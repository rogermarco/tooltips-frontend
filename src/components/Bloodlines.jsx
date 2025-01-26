import images from '../lib/imagestrings.json';

export default function Bloodlines() {
  return (
    <div className='tooltip-bg'>
      <p className='tooltip-single-tech-name'>Bloodlines</p> 
      <span className='tooltip-cost'>(Cost: 150 <img src={images.food}/> 100 <img src={images.gold}/>)</span>
      <p className='tooltip-text'>Mounted units have +20 hit points.</p>
    </div>
  )
}