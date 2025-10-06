/* eslint-disable react/prop-types */
// import food from '../public/food.png';
// import gold from '../public/gold.png';
// import wood from '../public/wood.png';
// import stone from '../public/stone.png';
import { buildCivTechTree } from '../lib/buildCivTechTree';
import castle from '../assets/techtree/castle.png';
import castleTech from '../assets/techtree/unique_tech_1.png';
import imperialTech from '../assets/techtree/unique_tech_2.png';
import cross from '../assets/techtree/cross.png';

// const images = {
//   food,
//   wood,
//   gold,
//   stone
// };

export default function TechTree({ civ }) {
  const civData = buildCivTechTree(civ);
  console.log(civData);
  
  const { techTree, uniques } = civData;

  return (
    <div className="tech-tree">

      {Object.entries(techTree).map(([building, data]) => (
        <section key={building} className={`${building} tech-tree-section`}>
          <img src={data.icon} alt={building} className="building-icon" />

          <div className="icons-grid">
            {Object.entries(data.lines).map(([line, unit]) => (
              <div key={line} className="tech-icon-wrapper">
                <img
                  src={unit.icon}
                  alt={unit.current}
                  className={`tech-icon ${unit.disabled ? "disabled" : ""}`}
                />
                {unit.disabled && (
                  <img src={cross} alt="disabled" className="disabled-icon-overlay" />
                )}
              </div>
            ))}

            {Object.entries(data.techs).map(([tech, tdata]) => (
              <div key={tech} className="tech-icon-wrapper">
                <img
                  src={tdata.icon}
                  alt={tdata.current}
                  className={`tech-icon ${tdata.disabled ? "disabled" : ""}`}
                />
                {tdata.disabled && (
                  <img src={cross} alt="disabled" className="disabled-icon-overlay" />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {uniques.unit && (
        <section className="uniques">
          <img src={castle} alt="castle" className="building-icon" />
          <img src={uniques.unit.icon} alt={uniques.unit.name} className="tech-icon" />
          <img src={castleTech} alt={civData.uniqueTechs.castle.title} className="tech-icon" />
          <img src={imperialTech} alt={civData.uniqueTechs.imperial.title} className="tech-icon" />
        </section>
      )}
    </div>
  );
}