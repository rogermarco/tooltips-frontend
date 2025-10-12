/* eslint-disable react/prop-types */
// import food from '../public/food.png';
// import gold from '../public/gold.png';
// import wood from '../public/wood.png';
// import stone from '../public/stone.png';
import { useMemo } from 'react';
import { buildCivTechTree } from '../lib/buildCivTechTree';
import castle from '../assets/techtree/castle.png';
import castleTech from '../assets/techtree/unique_tech_1.png';
import imperialTech from '../assets/techtree/unique_tech_2.png';
import { TechIcon } from './TechIcon.jsx';

// const images = {
//   food,
//   wood,
//   gold,
//   stone
// };

export default function TechTree({ civ }) {
  const civData = useMemo(() => buildCivTechTree(civ), [civ]);
  // console.log(civData);
  
  const { techTree, uniques } = civData;

  return (
    <div className="tech-tree">
      {/* buildings */}
      {Object.entries(techTree).map(([building, data]) => (
        <section key={building} className={`${building} tech-tree-section`}>
          <img src={data.icon} alt={building} className="building-icon" />

          {/* units */}
          <div className="icons-grid">
            {Object.entries(data.lines).map(([line, unit]) => (
              <TechIcon key={line} data={unit} name={unit.current} />
            ))}
            
            {/* techs */}
            {Object.entries(data.techs).map(([tech, tdata]) => (
              <TechIcon key={tech} data={tdata} name={tech} />
            ))}
          </div>
        </section>
      ))}
      {/* uniques */}
      <section className="uniques">
        <img src={castle} alt="castle" className="building-icon" />
        <img src={uniques.unit.icon} alt={uniques.unit.name} className="tech-icon" />
        <img src={castleTech} alt={civData.uniqueTechs.castle.title} className="tech-icon" />
        <img src={imperialTech} alt={civData.uniqueTechs.imperial.title} className="tech-icon" />
      </section>
    </div>
  );
}