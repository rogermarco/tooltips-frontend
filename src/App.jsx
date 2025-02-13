/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip.jsx'
import { useQuery } from '@tanstack/react-query'
import { ArcherArmor, ArcherAttack, CavalryArmor, InfantryArmor, InfCavAttack, Lumbercamp, Mill, Ballistics, Bloodlines, VillUpgrades } from './components';
import CivTooltip from './components/CivTooltip.jsx';
import NoticeBox from './components/NoticeBox.jsx';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdnizyznpnafddhacchf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const fetchCivs = async (streamUrl) => {
  try {
    const { data: response } = await supabase
      .from('streamdata')
      .select('civ_data')
      .eq('broadcaster_name', streamUrl)
      .single();
    const convertedArray = JSON.parse(response.civ_data);
    return convertedArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Default CaptureAge layout
const defaultProfile = {"coordinatesRight":{"ballistics.png":[1854,5,14],"bloodlines.png":[1886,5,15],"fletching.png":[1854,48,19],
  "forging.png":[1755,48,16],"bit_axe.png":[1755,5,11],"horsecollar.png":[1787,5,12],"pad_arch_arm.png":[1886,48,20],
  "scale_bard_arm.png":[1787,48,17],"scale_mail_arm.png":[1819,48,18],"wheelbarrow.png":[1819,5,13]},
  "coordinatesLeft":{"ballistics.png":[104,5,4],"bloodlines.png":[136,5,5],"fletching.png":[104,48,9],
  "forging.png":[5,48,6],"bit_axe.png":[5,5,1],"horsecollar.png":[37,5,2],"pad_arch_arm.png":[136,48,10],
  "scale_bard_arm.png":[37,48,7],"scale_mail_arm.png":[69,48,8],"wheelbarrow.png":[69,5,3]}, 
  shiftNumX: 0, shiftNumY: 0, leftCivBox: [650,0], rightCivBox: [1050,0]}

function App() {
  const [displayResolution, setDisplayResolution] = useState(null); // Viewers stream window resolution
  const [ratio, setRatio] = useState(1); // Aspect ratio of the viewers stream window
  const [streamUrl, setStreamUrl] = useState(''); // What stream is being viewed
  // eslint-disable-next-line no-unused-vars
  const [profile, setProfile] = useState(defaultProfile); // Which coordinates to use // Some streamers have different CaptureAge layouts
  const [showNotice, ] = useState(false);

  const twitch = window.Twitch.ext;  

  const components = [<Ballistics key='ballistics'/>, <Bloodlines key='bloodlines'/>, <ArcherAttack key='archer-attack'/>, 
                      <InfCavAttack key='inf-cav-attack'/>, <Lumbercamp key='lumbercamp'/>, <Mill key='mill'/>, 
                      <ArcherArmor key='archer-armor'/>, <CavalryArmor key='cavalry-armor'/>, 
                      <InfantryArmor key='infantry-armor'/>, <VillUpgrades key='vill-upgrades'/>]

  const { data: civs } = useQuery({
    queryKey: ['civs', streamUrl],
    queryFn: () => fetchCivs(streamUrl),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 300000, // 5 minutes
    cacheTime: 300000,
    enabled: !!streamUrl,
  });
  // DEBUG TESTING
  // const civs = ["ethiopians", "sicilians"]
  
  // Fetch viewer information from Twitch context
  useEffect(() => {
    twitch.onContext((context) => {
      if (context.displayResolution !== displayResolution) {
        setDisplayResolution(context.displayResolution);
      }
      if (context.playerChannel !== streamUrl) {
        setStreamUrl(context.playerChannel);
      }
    });
  }, [twitch, displayResolution, streamUrl]);
  
  // Keep track of aspect ratio of the viewers stream window. Keeps elements in proportion
  useEffect(() => {
    if (displayResolution) {
      const width = displayResolution.split('x').shift(Number);
      // CHECK PLAYER WINDOW ASPECT RATIO
      const height = displayResolution.split('x').pop(Number);
      const ratioSetter = width / height;

      if (ratioSetter > 1.78) {
        if (ratio >= 1.409) {
          setRatio(1.409);
        } 
      } else {
        setRatio(1920 / width);
      }
    }
  }, [displayResolution, ratio]);

  return (
    <div>
      {profile?.coordinatesLeft && Object.keys(profile.coordinatesLeft).length > 0 &&
        Object.entries(profile.coordinatesLeft).map(([, value], i) => {
          return (
            <Tooltip key={value[2]}>
              <TooltipTrigger asChild={true}>
                <div className='tooltip-box' style={{
                  width: 28 / ratio, 
                  height: 28 / ratio, 
                  left: value[0] / ratio, 
                  top: value[1] / ratio,
                }}></div>
              </TooltipTrigger>
              <TooltipContent>
                {components[i]}
              </TooltipContent>  
            </Tooltip>
          )
        })
      }
      {profile?.coordinatesRight && Object.keys(profile.coordinatesRight).length > 0 &&
        Object.entries(profile.coordinatesRight).map(([, value], i) => {
          return (
            <Tooltip key={value[2]}>
              <TooltipTrigger asChild={true}>
                <div className='tooltip-box' style={{
                  width: 28 / ratio, 
                  height: 28 / ratio, 
                  left: value[0] / ratio, 
                  top: value[1] / ratio,
                }}></div>
              </TooltipTrigger>
              <TooltipContent>
                {components[i]}
              </TooltipContent>  
            </Tooltip>
          )
        })
      }
      {civs?.length > 0 &&
        <div>
          <NoticeBox show={showNotice} />
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <div className='tooltip-box' style={{
              width: 220 / ratio, 
              height: 50 / ratio, 
              left: (defaultProfile.leftCivBox[0] / ratio),
              top: (defaultProfile.leftCivBox[1] / ratio),
              }}></div>
            </TooltipTrigger>
            <TooltipContent>
              <CivTooltip civ={civs[0]} />
            </TooltipContent>  
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <div className='tooltip-box' style={{
                width: 220 / ratio, 
                height: 50 / ratio, 
                left: (defaultProfile.rightCivBox[0] / ratio),
                top: (defaultProfile.rightCivBox[1] / ratio),
              }}></div>
            </TooltipTrigger>
            <TooltipContent>
              <CivTooltip civ={civs[1]} />
            </TooltipContent>  
          </Tooltip>
        </div>
      }
    </div>
  )
}

export default App