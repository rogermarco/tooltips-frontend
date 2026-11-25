import { memo, Fragment } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import CostList from './CostList';
import cross from '../assets/techtree/cross.webp';
import { prettifyText } from '../hooks/helpers';
import type { Cost } from '../types/techTypes';

export interface TechIconData {
  icon: string | null;
  cost: Cost[];
  disabled?: boolean;
  description?: string;
  progression?: string[];
  availableProgression?: string[];
}

// Names that prettifyText can't hyphenate/capitalise correctly
const DISPLAY_NAMES: Record<string, string> = {
  'man-at-arms': 'Man-at-Arms',
  'two-handed-swordsman': 'Two-handed Swordsman',
};

interface TechIconProps {
  data: TechIconData;
  name: string;
  type: 'unit' | 'tech';
}

export const TechIcon = memo(function TechIcon({ data, name, type }: TechIconProps) {
  const availableCount = data.availableProgression?.length ?? 0;

  return (
    <div className='tech-icon-wrapper'>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div style={{ position: 'relative' }}>
            <img
              src={data.icon ?? undefined}
              alt={name}
              className={`tech-icon ${data.disabled ? 'disabled' : ''}`}
            />
            {data.disabled && (
              <img src={cross} alt='disabled' className='disabled-icon-overlay' />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className={`tech-tree-tooltip-${type}`}>
            <div className={`tech-tree-tooltip-name-${type}`}>
              {DISPLAY_NAMES[name] ?? prettifyText(name)}
            </div>
            <div className='tech-tree-tooltip-cost'>
              <CostList cost={data.cost} />
            </div>
            {data.progression && (
              <div className='tech-tree-progression-container'>
                <div className='progression-title'>Progression</div>
                <div className='tech-tree-tooltip-progression'>
                  {data.progression.map((unit, index) => (
                    <Fragment key={`${index}-${unit}`}>
                      <span
                        className={`progression-icon ${index < availableCount ? 'unlocked' : 'locked'}`}
                      />
                      {index < data.progression!.length - 1 && (
                        <span className='progression-separator'>·</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
            {data.description && <p className='tech-tree-tooltip-text'>{data.description}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});
