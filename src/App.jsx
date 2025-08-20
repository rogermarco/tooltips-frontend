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
} from './components';
import CivTooltip from './components/CivTooltip.jsx';
import NoticeBox from './components/NoticeBox.jsx';
import { supabase } from './lib/db.js';
// import profiles from './public/profiles.json';
import { useProfiles } from './hooks/helpers';

function App() {
  const [displayResolution, setDisplayResolution] = useState({
    width: 0,
    height: 0,
  }); // Viewers stream window resolution
  const [ratio, setRatio] = useState(1); // Aspect ratio of the viewers stream window
  const [streamUrl, setStreamUrl] = useState(''); // What stream is being viewed
  // eslint-disable-next-line no-unused-vars
  const [profile, setProfile] = useState(profiles.defaultProfile); // Which coordinates to use // Some streamers have different CaptureAge layouts
  const [showNotice, setShowNotice] = useState(true);

  const twitch = window.Twitch.ext;
  const profiles = useProfiles();

  // const fetchCivs = async (streamUrl) => {
  //   try {
  //     const { data: response } = await supabase
  //       .from('streamdata')
  //       .select('civ_data')
  //       .eq('broadcaster_name', streamUrl)
  //       .single();
  //     const convertedArray = JSON.parse(response.civ_data);

  //     if (!showNotice) {
  //       setShowNotice(true);
  //     }

  //     return convertedArray;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  // const { data: civs } = useQuery({
  //   queryKey: ['civs', streamUrl],
  //   queryFn: () => fetchCivs(streamUrl),
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchInterval: 180000, // 3 minutes
  //   cacheTime: 180000,
  //   enabled: !!streamUrl,
  // });
  // DEBUG TESTING
  const civs = ['khitans', 'shu'];

  const componentsLeft = [
    <Ballistics key='ballistics' />,
    <Bloodlines key='bloodlines' />,
    <ArcherAttack key='archer-attack' />,
    <InfCavAttack key='inf-cav-attack' />,
    <Lumbercamp key='lumbercamp' />,
    // If civ is khitans, use khitans tech descriptions
    <Mill key='mill' civ={civs?.[0] === 'khitans' ? civs[0] : null} />,
    <ArcherArmor key='archer-armor' />,
    <CavalryArmor key='cavalry-armor' />,
    <InfantryArmor key='infantry-armor' />,
    <VillUpgrades key='vill-upgrades' />,
  ];
    const componentsRight = [
    <Ballistics key='ballistics' />,
    <Bloodlines key='bloodlines' />,
    <ArcherAttack key='archer-attack' />,
    <InfCavAttack key='inf-cav-attack' />,
    <Lumbercamp key='lumbercamp' />,
    // If civ is khitans, use khitans tech descriptions
    <Mill key='mill' civ={civs?.[1] === 'khitans' ? civs[1] : null} />,
    <ArcherArmor key='archer-armor' />,
    <CavalryArmor key='cavalry-armor' />,
    <InfantryArmor key='infantry-armor' />,
    <VillUpgrades key='vill-upgrades' />,
  ];

  // Resize observer to track window size
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;

        setDisplayResolution({
          width,
          height,
        });
      }),
    []
  );

  useEffect(() => {
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver]);

  // Fetch streamer from Twitch context
  useEffect(() => {
    twitch.onContext((context) => {
      if (context.playerChannel !== streamUrl) {
        const stream = context.playerChannel;
        setStreamUrl(stream);

        // If current streamer has a separate profile, use that profile
        if (profiles[stream]) {
          setProfile(profiles[stream]);
        } else setProfile(profiles.defaultProfile);
      }
    });
  }, [twitch, streamUrl, profiles]);

  // Keep track of aspect ratio of the viewers stream window. Keeps elements in proportion
  useEffect(() => {
    if (displayResolution.height !== 0) {
      // CHECK PLAYER WINDOW ASPECT RATIO
      const aspectRatio = displayResolution.width / displayResolution.height;
      if (aspectRatio > 1.78) {
        if (ratio >= 1.409) {
          setRatio(1.409);
        }
      } else {
        setRatio(1920 / displayResolution.width);
      }
    }
  }, [displayResolution, ratio]);

  return (
    <div>
      {/* skip rendering entirely if no civs // blocks elements from staying on stream at all times */}
      {civs?.length > 0 && (
        <>
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
            <NoticeBox show={showNotice} />
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
        </>
      )}
    </div>
  );
}

export default App;
