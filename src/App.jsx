/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ArcherArmor, ArcherAttack, CavalryArmor, InfantryArmor, InfCavAttack, Lumbercamp, Mill, Ballistics, Bloodlines, VillUpgrades } from './components';

const fetchCoords = async (streamUrl) => {
  const response = await axios.get(`https://tooltips-backend.fly.dev/coordinates/${streamUrl}`);
  return response.data;
};

function App() {
  const [displayResolution, setDisplayResolution] = useState(null);
  const [ratio, setRatio] = useState(1);
  const [streamUrl, setStreamUrl] = useState(null);

  const twitch = window.Twitch.ext;

  const components = [<Ballistics key='ballistics'/>, <Bloodlines key='bloodlines'/>, <ArcherAttack key='archer-attack'/>, <InfCavAttack key='inf-cav-attack'/>, <Lumbercamp key='lumbercamp'/>,
                      <Mill key='mill'/>, <ArcherArmor key='archer-armor'/>, <CavalryArmor key='cavalry-armor'/>, <InfantryArmor key='infantry-armor'/>, <VillUpgrades key='vill-upgrades'/>]

  const data = {"coordinates":{"ballistics.png":[1854,6],"bloodlines.png":[1886,5],"fletching.png":[1854,49],"forging.png":[1755,49],"bit_axe.png":[1755,6],"horsecollar.png":[1787,5],"pad_arch_arm.png":[1886,50],"scale_bard_arm.png":[1787,49],"scale_mail_arm.png":[1819,49],"wheelbarrow.png":[1819,6]},"status":"success"}

  useEffect(() => {
    twitch.onContext((context) => {
      if (!streamUrl) {
        setStreamUrl(context.playerChannel);
      }
    });
  }, [twitch, streamUrl]);
  
  useEffect(() => {
    twitch.onContext((context) => {
      // console.log(context);
      if (context.displayResolution !== displayResolution) {
        setDisplayResolution(context.displayResolution);
      }
    });
  }, [twitch, displayResolution]);

  useEffect(() => {
    if (displayResolution) {
      const width = displayResolution.split('x').shift(Number);
      setRatio(1920 / width);
    }
  }, [displayResolution]);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['coordinates', streamUrl],
  //   queryFn: () => fetchCoords(streamUrl),
  //   refetchInterval: 60000,
  //   enabled: !!streamUrl,
  // });

  // if (!streamUrl) {
  //   return <div>
  //     <div>Waiting for stream URL...</div>
  //     <div>{streamUrl}</div>
  //   </div>
  // }

  // if (isLoading) {
  //   return <div>
  //     <div>Loading coordinates...</div>
  //     <div>{streamUrl}</div>
  //   </div>
  // }

  // if (error) {
  //   return <div>
  //     <div>Error fetching coordinates: {error.message}</div>
  //     <div>{streamUrl}</div>
  //   </div>
  // }

  return (
    <div>
      {data?.coordinates && Object.keys(data.coordinates).length > 0 &&
        Object.entries(data.coordinates).map(([, value], i) => {
          return (
              <Tooltip key={i}>
                <TooltipTrigger asChild={true}>
                  <div style={{
                    position: 'absolute', 
                    width: 28 / ratio, 
                    height: 28 / ratio, 
                    left: value[0] / ratio, 
                    top: value[1] / ratio,
                    // border: '1px solid red',
                  }}></div>
                </TooltipTrigger>
                <TooltipContent>
                  {components[i]}
                </TooltipContent>  
              </Tooltip>
          )
        })
      }
      {/* <div style={{display: 'grid', padding: '2px', gap: '30px', gridTemplateColumns: 'auto auto auto'}}>
        <ArcherArmor />
        <ArcherAttack />
        <CavalryArmor />
        <InfantryArmor />
        <InfCavAttack />
        <Lumbercamp />
        <Mill />
        <Ballistics />
        <Bloodlines />
        <VillUpgrades />
      </div> */}
    </div>
  )
}

export default App

/* <Tooltip>
  <TooltipTrigger>My trigger</TooltipTrigger>
  <TooltipContent>My tooltip</TooltipContent>
</Tooltip> */

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

  //            {/* <p style={{backgroundColor: 'grey'}}>img = {key} & coords = ({value[0]}, {value[1]})</p> */}

  //TODO: VARIABLE ROUTING
  // let stream;

  // window.Twitch.ext.onAuthorized((auth) => {
  //   console.log(auth.channelId);
  // });



  // const { isPending, error, data } = useQuery({
  //   queryKey: ['coordinates'],
  //   queryFn: async () =>
  //     await axios.get(`http://localhost:5000/scan`).then((res) => res.data)
  //   })

  // if (isPending) return 'Waiting...'
  // if (error) return 'An error has occurred: ' + error.message

  // const coords = {
  //   'axe.png': [1755, 6],
  //   'ball.png': [1854, 6],
  //   'blood.png': [1886, 6],
  //   'fletch.png': [1854, 49],
  //   'forge.png': [1755, 48],
  //   'hc.png': [1788, 5],
  //   'paa.png': [1886, 50],
  //   'sbard.png': [1787, 49],
  //   'smail.png': [1820, 49],
  //   'wb.png': [1819, 6]
  // }