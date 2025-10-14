/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { buildCivTechTree } from '../lib/buildCivTechTree';
import castle from '../assets/techtree/castle.png';
import { TechIcon } from './TechIcon.jsx';

export default function TechTree({ civ }) {
  const civData = useMemo(() => buildCivTechTree(civ), [civ]);
  // console.log(civData);
  
  const { techTree, uniques, uniqueTechs } = civData;

  return (
    <div className="tech-tree">
      {/* buildings */}
      {Object.entries(techTree).map(([building, data]) => (
        <section key={building} className={`${building} tech-tree-section`}>
          <img src={data.icon} alt={building} className="building-icon" />

          {/* units */}
          <div className="icons-grid">
            {Object.entries(data.lines).map(([line, unit]) => (
              <TechIcon key={line} data={unit} name={unit.current} type="unit" />
            ))}
            
            {/* techs */}
            {Object.entries(data.techs).map(([tech, tdata]) => (
              <TechIcon key={tech} data={tdata} name={tech} type="tech" />
            ))}
          </div>
        </section>
      ))}
      {/* uniques */}
      <section className="castle tech-tree-section">
        <img src={castle} alt="castle" className="building-icon" />
        <div className="icons-grid">
          <TechIcon data={uniques.unit} name={uniques.unit.name} type="unit" />
          {uniques.hero && (
            <TechIcon data={uniques.hero} name={uniques.hero.name} type="unit" />
          )}
          <TechIcon data={uniqueTechs.castle} name={uniqueTechs.castle.title} type="tech" />
          <TechIcon data={uniqueTechs.imperial} name={uniqueTechs.imperial.title} type="tech" />
        </div>
      </section>
    </div>
  );
}