import { useMemo } from 'react';
import { buildCivTechTree } from '../lib/buildCivTechTree';
import { useAllTechtreeData } from '../hooks/helpers';
import castle from '../assets/techtree/castle.webp';
import { TechIcon } from './TechIcon';

export default function TechTree({ civ }: { civ: string }) {
  const { data } = useAllTechtreeData();

  const civData = useMemo(() => {
    if (!data) return null;
    const { civStrings, uniqueStrings, techTree } = data;
    return buildCivTechTree(civ, civStrings, uniqueStrings, techTree);
  }, [civ, data]);

  // Also covers loading and error states, where data is undefined
  if (!civData) return null;

  const { techTree, uniques, uniqueTechs } = civData;

  return (
    <div className='tech-tree'>
      {/* buildings */}
      {Object.entries(techTree)
        .filter(([building]) => building !== 'castle')
        .map(([building, data]) => (
          <section key={building} className={`${building} tech-tree-section`}>
            <img src={data.icon} alt={building} className='building-icon' />

            <div className='icons-grid'>
              {/* units */}
              {Object.entries(data.lines).map(([line, unit]) => (
                <TechIcon key={line} data={unit} name={unit.current} type='unit' />
              ))}

              {/* techs */}
              {Object.entries(data.techs).map(([tech, tdata]) => (
                <TechIcon key={tech} data={tdata} name={tech} type='tech' />
              ))}
            </div>
          </section>
        ))}
      {/* uniques */}
      <section className='castle tech-tree-section'>
        <img src={castle} alt='castle' className='building-icon' />
        <div className='icons-grid'>
          <TechIcon data={uniques.unit} name={uniques.unit.name} type='unit' />
          {uniques.hero && <TechIcon data={uniques.hero} name={uniques.hero.name} type='unit' />}
          {uniqueTechs && (
            <>
              <TechIcon data={uniqueTechs.castle} name={uniqueTechs.castle.title} type='tech' />
              <TechIcon
                data={uniqueTechs.imperial}
                name={uniqueTechs.imperial.title}
                type='tech'
              />
            </>
          )}
          {techTree.castle?.techs.hoardings && (
            <TechIcon data={techTree.castle.techs.hoardings} name='Hoardings' type='tech' />
          )}
        </div>
      </section>
    </div>
  );
}
