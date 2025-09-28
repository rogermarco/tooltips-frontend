import food from '../public/food.png';
import gold from '../public/gold.png';
import wood from '../public/wood.png';
import stone from '../public/stone.png';

const images = {
  food,
  wood,
  gold,
  stone
};

export default function TechTree() {

  return (
    <div className='tech-tree'>
      <b>Technology Tree</b>
      <section id="rax"></section>
      <section id="range"></section>
      <section id="siege"></section>
      <section id="dock"></section>
      <section id="university"></section>
      <section id="monastery"></section>
      <section id="uniques"></section>
    </div>
  );
}