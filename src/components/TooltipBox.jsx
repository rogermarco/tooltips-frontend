// /* eslint-disable react/prop-types */
// import { useRef, useEffect } from 'react';

// export default function TooltipBox({ ratio, value }) {

//   const tooltipRef = useRef(null);

//   useEffect(() => {
//     if (tooltipRef.current) {
//       tooltipRef.current.style.width = `${28 / ratio}px`;
//       tooltipRef.current.style.height = `${28 / ratio}px`;
//       tooltipRef.current.style.left = `${value[0] / ratio}px`;
//       tooltipRef.current.style.top = `${value[1] / ratio}px`;
//     }
//   }, [ratio, value]);

//   return <div ref={tooltipRef} className='tooltip-box'></div>;
// }