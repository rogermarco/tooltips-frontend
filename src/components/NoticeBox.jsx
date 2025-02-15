import { useEffect, useState, useRef } from 'react'

export default function NoticeBox(show) {
  const [isVisible, setIsVisible] = useState(false);
  const prevShowRef = useRef(false);
  // const mountedRef = useRef(false);

  useEffect(() => {
    // Skips first mount in Strict Mode
    // if (!mountedRef.current) {
    //   mountedRef.current = true;
    //   return;
    // }
    let timer;

    if (show && !prevShowRef.current) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10 seconds
    }

    prevShowRef.current = show;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className='notice-box'>You can mouseover tech icons and player name boxes to see more info!</div>
  )
}