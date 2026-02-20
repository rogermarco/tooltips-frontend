import { useState, useEffect, useMemo } from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './components/Tooltip.jsx';
import { useQuery } from '@tanstack/react-query';
import {
  ArcherArmor,
  ArcherAttack,
  CavalryArmor,
  InfantryArmor,
  InfCavAttack,
  Lumbercamp,
  Mill,
  Ballistics,
  Bloodlines,
  VillUpgrades,
  CastleTech,
  ImperialTech,
} from './components';
import CivTooltip from './components/CivTooltip.jsx';
import NoticeBox from './components/NoticeBox.jsx';
import { useProfiles } from './hooks/helpers';

function App() {
  const { data: profiles } = useProfiles();

  const [displayResolution, setDisplayResolution] = useState({
    width: 0,
    height: 0,
  }); // Viewers stream window resolution
  const [streamUrl, setStreamUrl] = useState(''); // What stream is being viewed
  const [profile, setProfile] = useState(profiles.defaultProfile); // Which coordinates to use // Some streamers have different CaptureAge layouts
  const [showNotice, setShowNotice] = useState(false);
  const [isAoe2, setIsAoe2] = useState(false); // DEBUG set to true

  const twitch = window.Twitch.ext;

  const fetchCivs = async (streamUrl) => {
    try {
      const response = await fetch(`https://rogermarco.work/civs/${streamUrl}`); // Worker URL
      const data = await response.json();

      if (!showNotice) {
        setShowNotice(true);
      }
      // Return the civ_data array
      return data;
    } catch (error) {
      console.error('error fetching civs', error);
      return null;
    }
  };

  const { data: civs } = useQuery({
    queryKey: ['civs', streamUrl],
    queryFn: () => fetchCivs(streamUrl),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 120000, // 2 minutes
    refetchIntervalInBackground: true,
    cacheTime: 240000, // 4 minutes
    enabled: !!streamUrl && isAoe2,
  });
  // DEBUG TESTING
  // const civs = ['muisca', 'tupi'];

  function buildComponents(civ) {
    return [
      <Ballistics key='ballistics' />,
      <Bloodlines key='bloodlines' />,
      <ArcherAttack key='archer-attack' />,
      <InfCavAttack key='inf-cav-attack' />,
      <Lumbercamp key='lumbercamp' />,
      <Mill key='mill' civ={civ === 'khitans' ? civ : null} />,
      <ArcherArmor key='archer-armor' />,
      <CavalryArmor key='cavalry-armor' />,
      <InfantryArmor key='infantry-armor' />,
      <VillUpgrades key='vill-upgrades' />,
      <CastleTech key='castle-tech' civ={civ} />,
      <ImperialTech key='imperial-tech' civ={civ} />,
    ];
  }

  // DEBUG dont usememo
  // const componentsLeft = buildComponents(civs?.[0]);
  // const componentsRight = buildComponents(civs?.[1]);

  const componentsLeft = useMemo(() => buildComponents(civs?.[0]), [civs]);
  const componentsRight = useMemo(() => buildComponents(civs?.[1]), [civs]);

  // Resize observer to track window size
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDisplayResolution({
        width,
        height,
      });
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dep array since we don't need to recreate it

  // Fetch streamer from Twitch context
  useEffect(() => {
    twitch.onContext((context) => {
      const stream = context.playerChannel;
      const currentGame = context.game;
      // only do stuff if streamer is playing aoe2
      const playingAoe2 = currentGame.includes('Age of Empires II');
      setIsAoe2(playingAoe2);

      if (playingAoe2 && stream && stream !== streamUrl) {
        setStreamUrl(stream);
        setProfile(profiles[stream] ?? profiles.defaultProfile);
      }
    });
  }, [twitch, streamUrl, profiles]);

  // Keep track of aspect ratio of the viewers stream window. Keeps elements in proportion
  const ratio = useMemo(() => {
    if (displayResolution.height === 0) return 1;

    const aspectRatio = displayResolution.width / displayResolution.height;
    if (aspectRatio > 1.78) {
      return Math.min(ratio, 1.409);
    }
    return 1920 / displayResolution.width;
  }, [displayResolution]);

  // skip rendering entirely if not playing aoe2 or no civs in db
  if (!isAoe2) return null;
  if (!civs?.length) return null;

  return (
    <div>
      {profile.coordinatesLeft &&
        Object.entries(profile.coordinatesLeft).map(([, value], i) => (
          <Tooltip key={value[2]}>
            <TooltipTrigger asChild={true}>
              <div
                className='tooltip-box'
                style={{
                  width: 28 / ratio,
                  height: 28 / ratio,
                  left: value[0] / ratio,
                  top: value[1] / ratio,
                }}
              ></div>
            </TooltipTrigger>
            <TooltipContent>{componentsLeft[i]}</TooltipContent>
          </Tooltip>
        ))}
      {profile.coordinatesRight &&
        Object.entries(profile.coordinatesRight).map(([, value], i) => (
          <Tooltip key={value[2]}>
            <TooltipTrigger asChild={true}>
              <div
                className='tooltip-box'
                style={{
                  width: 28 / ratio,
                  height: 28 / ratio,
                  left: value[0] / ratio,
                  top: value[1] / ratio,
                }}
              ></div>
            </TooltipTrigger>
            <TooltipContent>{componentsRight[i]}</TooltipContent>
          </Tooltip>
        ))}
      <div>
        <NoticeBox show={showNotice} ratio={ratio} />
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div
              className='tooltip-box'
              style={{
                width: 220 / ratio,
                height: 50 / ratio,
                left: profile.leftCivBox[0] / ratio,
                top: profile.leftCivBox[1] / ratio,
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <CivTooltip civ={civs[0]} />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div
              className='tooltip-box'
              style={{
                width: 220 / ratio,
                height: 50 / ratio,
                left: profile.rightCivBox[0] / ratio,
                top: profile.rightCivBox[1] / ratio,
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <CivTooltip civ={civs[1]} />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
