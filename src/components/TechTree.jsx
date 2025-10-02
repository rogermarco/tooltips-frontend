// import food from '../public/food.png';
// import gold from '../public/gold.png';
// import wood from '../public/wood.png';
// import stone from '../public/stone.png';
import TechIcon from './TechIcon';

// const images = {
//   food,
//   wood,
//   gold,
//   stone
// };

export default function TechTree() {
 
  return (
    <div className='tech-tree'>
      <b>Technology Tree</b>
      <section id="rax" style={{marginTop:"20px"}}>
        <TechIcon name="rax" />
      </section>
      <section id="range">
        <TechIcon name="range" />
      </section>
      <section id="stable">
        <TechIcon name="stable" />
      </section>
      <section id="siege">
        <TechIcon name="siege" />
      </section>
      <section id="dock">
        <TechIcon name="dock" />
      </section>
      <section id="university">
        <TechIcon name="uni" />
      </section>
      <section id="monastery">
        <TechIcon name="monastery" />
      </section>
      <section id="uniques"></section>
    </div>
  );
}