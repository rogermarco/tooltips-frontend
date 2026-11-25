import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';
import TieredTech from './components/TieredTech';
import { SingleTech, UniqueTech } from './components/SingleTech';
import CivTooltip from './components/CivTooltip';
import NoticeBox from './components/NoticeBox';
import { useProfiles, useStreamCivs } from './hooks/helpers';
import type { Coordinate } from './types/techTypes';

// Tooltip content for each icon in a profile's coordinates, keyed by the
// icon name used in profiles.json. Unknown names are skipped.
const TECH_TOOLTIPS: Record<string, (civ: string | undefined) => ReactNode> = {
  'ballistics.png': () => <SingleTech techKey='ballistics' />,
  'bloodlines.png': () => <SingleTech techKey='bloodlines' />,
  'fletching.png': () => <TieredTech techKey='archerAttack' />,
  'forging.png': () => <TieredTech techKey='infantryCavalryAttack' />,
  'bit_axe.png': () => <TieredTech techKey='lumbercamp' />,
  'horsecollar.png': (civ) => <TieredTech techKey={civ === 'khitans' ? 'pasture' : 'mill'} />,
  'pad_arch_arm.png': () => <TieredTech techKey='archerArmor' />,
  'scale_bard_arm.png': () => <TieredTech techKey='cavalryArmor' />,
  'scale_mail_arm.png': () => <TieredTech techKey='infantryArmor' />,
  'wheelbarrow.png': () => <TieredTech techKey='villUpgrades' />,
  'castle.png': (civ) => <UniqueTech civ={civ} age='castle' />,
  'imperial.png': (civ) => <UniqueTech civ={civ} age='imperial' />,
};

/** Width/height of the hover boxes, in 1920px-wide stream coordinates */
const TECH_BOX_SIZE = 28;
const CIV_BOX_SIZE = { width: 220, height: 50 };

interface HoverBoxProps {
  left: number;
  top: number;
  width: number;
  height: number;
  ratio: number;
  children: ReactNode;
}

/** An invisible box over the stream that shows a tooltip on hover. */
function HoverBox({ left, top, width, height, ratio, children }: HoverBoxProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <div
          className='tooltip-box'
          style={{
            width: width / ratio,
            height: height / ratio,
            left: left / ratio,
            top: top / ratio,
          }}
        ></div>
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}

interface PlayerTooltipsProps {
  civ: string | undefined;
  coordinates: Record<string, Coordinate> | undefined;
  civBox: [number, number];
  ratio: number;
}

/** All hover boxes for one player's side of the stream. */
function PlayerTooltips({ civ, coordinates, civBox, ratio }: PlayerTooltipsProps) {
  return (
    <>
      {Object.entries(coordinates ?? {}).map(([icon, [left, top, id]]) => {
        const render = TECH_TOOLTIPS[icon];
        if (!render) return null;
        return (
          <HoverBox
            key={id}
            left={left}
            top={top}
            width={TECH_BOX_SIZE}
            height={TECH_BOX_SIZE}
            ratio={ratio}
          >
            {render(civ)}
          </HoverBox>
        );
      })}
      <HoverBox left={civBox[0]} top={civBox[1]} {...CIV_BOX_SIZE} ratio={ratio}>
        <CivTooltip civ={civ} />
      </HoverBox>
    </>
  );
}

/** Scale factor from 1920px stream coordinates to the viewer's player size. */
function useStreamRatio() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  return useMemo(() => {
    if (!size.width || !size.height) return 1;
    const widthRatio = 1920 / size.width;
    // Wider than 16:9 means letterboxing at the sides
    return size.width / size.height > 1.78 ? Math.min(widthRatio, 1.409) : widthRatio;
  }, [size]);
}

/** Which channel is being watched, and whether it's playing AoE2. */
function useTwitchContext() {
  const [stream, setStream] = useState('');
  const [isAoe2, setIsAoe2] = useState(false);

  useEffect(() => {
    // Twitch has no way to remove an onContext listener, so this must only be
    // registered once; the setters keep it free of stale closures.
    window.Twitch?.ext.onContext((context) => {
      const playingAoe2 =
        typeof context?.game === 'string' && context.game.includes('Age of Empires II');
      setIsAoe2(playingAoe2);
      if (playingAoe2 && context?.playerChannel) setStream(context.playerChannel);
    });
  }, []);

  return { stream, isAoe2 };
}

function App() {
  const { data: profiles } = useProfiles();
  const { stream, isAoe2 } = useTwitchContext();
  const { data: civs } = useStreamCivs(stream, isAoe2);
  const ratio = useStreamRatio();

  // Some streamers have different CaptureAge layouts
  const profile = profiles[stream] ?? profiles.defaultProfile;

  // skip rendering entirely if not playing aoe2 or no civs in db
  if (!isAoe2 || !civs?.length) return null;

  return (
    <div>
      <PlayerTooltips
        civ={civs[0]}
        coordinates={profile.coordinatesLeft}
        civBox={profile.leftCivBox}
        ratio={ratio}
      />
      <PlayerTooltips
        civ={civs[1]}
        coordinates={profile.coordinatesRight}
        civBox={profile.rightCivBox}
        ratio={ratio}
      />
      <NoticeBox ratio={ratio} />
    </div>
  );
}

export default App;
