import { useState, useEffect } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'

function App() {

  const twitch = window.Twitch.ext;
  const images = ['Double Bit Axe', 'Ballistics', 'Bloodlines', 'Fletching', 'Forging', 
  'Horse Collar', 'Padded Archer Armor', 'Scale Barding Armor', 'Scale Mail Armor', 'Wheelbarrow']

  const coords = {
    'axe.png': [1755, 6],
    'ball.png': [1854, 6],
    'blood.png': [1886, 6],
    'fletch.png': [1854, 49],
    'forge.png': [1755, 48],
    'hc.png': [1788, 5],
    'paa.png': [1886, 50],
    'sbard.png': [1787, 49],
    'smail.png': [1820, 49],
    'wb.png': [1819, 6]
  }

  const [displayResolution, setDisplayResolution] = useState(null);
  const [ratio, setRatio] = useState(1);

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

  return (
    <div>
      {
        Object.entries(coords).map(([, value], i) => {
          return (
              <Tooltip key={i}>
                <TooltipTrigger asChild={true}>
                  <div style={{
                    position: 'absolute', 
                    width: 28 / ratio, 
                    height: 28 / ratio, 
                    left: value[0] / ratio, 
                    top: value[1] / ratio,
                    border: '1px solid red',
                  }}></div>
                </TooltipTrigger>
                <TooltipContent style={{backgroundColor: 'black', width: '150px', height: '100px', textAlign: 'center'}}>
                  This is {images[i]}
                </TooltipContent>  
              </Tooltip>
          )
        })
      }
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