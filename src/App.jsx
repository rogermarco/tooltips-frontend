/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ArcherArmor, ArcherAttack, CavalryArmor, InfantryArmor, InfCavAttack, Lumbercamp, Mill, Ballistics, Bloodlines, VillUpgrades } from './components';
import CivTooltip from './components/CivTooltip';

// const fetchCoords = async (streamUrl) => {
//   const response = await axios.get(`https://tooltips-backend.fly.dev/coordinates/${streamUrl}`);
//   return response.data;
// };

const fetchCivs = async (streamUrl) => {
  const response = await axios.get(`https://tooltips-backend.fly.dev/twitch/${streamUrl}`);
  return response.data;
};

const defaultProfile = {"coordinatesRight":{"ballistics.png":[1854,5,14],"bloodlines.png":[1886,5,15],"fletching.png":[1854,48,19],
  "forging.png":[1755,48,16],"bit_axe.png":[1755,5,11],"horsecollar.png":[1787,5,12],"pad_arch_arm.png":[1886,48,20],
  "scale_bard_arm.png":[1787,48,17],"scale_mail_arm.png":[1819,48,18],"wheelbarrow.png":[1819,5,13]},
  "coordinatesLeft":{"ballistics.png":[104,5,4],"bloodlines.png":[136,5,5],"fletching.png":[104,48,9],
  "forging.png":[5,48,6],"bit_axe.png":[5,5,1],"horsecollar.png":[37,5,2],"pad_arch_arm.png":[136,48,10],
  "scale_bard_arm.png":[37,48,7],"scale_mail_arm.png":[69,48,8],"wheelbarrow.png":[69,5,3]}, 
  shiftNumX: 0, shiftNumY: 0, leftCivBox: [650,0], rightCivBox: [1050,0]}

// const t90Profile = {"coordinates":{"ballistics.png":[1854,5],"bloodlines.png":[1886,5],"fletching.png":[1854,48],
//   "forging.png":[1755,48],"bit_axe.png":[1755,5],"horsecollar.png":[1787,5],"pad_arch_arm.png":[1886,48],
//   "scale_bard_arm.png":[1787,48],"scale_mail_arm.png":[1819,48],"wheelbarrow.png":[1819,5], "castle_tech":[1918,5], "imp_tech":[1918,48]}, 
//   shiftNumX: 32, shiftNumY: 53}

function App() {
  const [displayResolution, setDisplayResolution] = useState(null); // Viewers stream window resolution
  const [ratio, setRatio] = useState(1); // Aspect ratio of the viewers stream window
  const [streamUrl, setStreamUrl] = useState(null); // What stream is being viewed
  // eslint-disable-next-line no-unused-vars
  const [profile, setProfile] = useState(defaultProfile); // Which coordinates to use
  // console.log('DISPLAYRESOLUTION => ', displayResolution, 'WIDTHRATIO => ', ratio);

  const twitch = window.Twitch.ext;

  const components = [<Ballistics key='ballistics'/>, <Bloodlines key='bloodlines'/>, <ArcherAttack key='archer-attack'/>, 
                      <InfCavAttack key='inf-cav-attack'/>, <Lumbercamp key='lumbercamp'/>, <Mill key='mill'/>, 
                      <ArcherArmor key='archer-armor'/>, <CavalryArmor key='cavalry-armor'/>, 
                      <InfantryArmor key='infantry-armor'/>, <VillUpgrades key='vill-upgrades'/>]

  const { data: civs } = useQuery({
    queryKey: ['civs', streamUrl],
    queryFn: () => fetchCivs(streamUrl),
  });

  // const civs = ["ethiopians", "sicilians"]
  /*
  // LIST EXAMPLE //
  "britons": "<b>Foot Archer civilization</b><br>\n<br>\n<ul><li>Town Centers cost -50% wood starting in the Castle Age</li>
  <li>Foot archers (except skirmishers) +1 range in Castle and Imperial Age (+2 total)</li><li>Shepherds work 25% faster</li>
  </ul><br>\n<b>Unique Unit:</b><br>\nLongbowman (archer)<br>\n<br><b>Unique Techs:</b><ul><li>Yeomen (+1 foot archer range; +2 tower attack)</li>
  <li>Warwolf (Trebuchets do blast damage)</li></ul><br>\n<b>Team Bonus:</b> <br>\nArchery Ranges work 10% faster",
  */

  useEffect(() => {
    twitch.onContext((context) => {
      // console.log(context);
      if (!streamUrl) {
        setStreamUrl(context.playerChannel);
      }
    });
  }, [twitch, streamUrl]);
  
  useEffect(() => {
    twitch.onContext((context) => {
      if (context.displayResolution !== displayResolution) {
        setDisplayResolution(context.displayResolution);
      }
    });
  }, [twitch, displayResolution]);

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
  }, [displayResolution]);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['coordinates', streamUrl],
  //   queryFn: () => fetchCoords(streamUrl),
  //   refetchInterval: 60000,
  //   enabled: !!streamUrl,
  // });

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

  // const displayResolution = useDisplayResolution(twitch);
  // const { widthRatio, heightRatio } = useResolutionRatios(displayResolution);

  // function useDisplayResolution(twitch) {
  //   const subscribe = (callback) => {
  //     let currentResolution = null;
  
  //     const handleContext = (context) => {
  //       if (context.displayResolution !== currentResolution) {
  //         currentResolution = context.displayResolution;
  //         callback(currentResolution);
  //       }
  //     }; 
  //     twitch.onContext(handleContext);
  //     return () => {
  //     };
  //   };
  //   const getSnapshot = () => {
  //     return null;
  //   }; 
  //   return useSyncExternalStore(subscribe, getSnapshot);
  // }
  
  // function useResolutionRatios(displayResolution) {
  //   return useMemo(() => {
  //     if (!displayResolution) {
  //       return { widthRatio: 1, heightRatio: 1 };
  //     }
  //     const [width, height] = displayResolution.split('x').map(Number);
  //     return {
  //       widthRatio: 1920 / width,
  //       heightRatio: 1080 / height
  //     };
  //   }, [displayResolution]);
  // }