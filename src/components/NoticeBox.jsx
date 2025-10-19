import { useEffect, useState, useRef } from 'react'
import { useTechstrings } from '../hooks/helpers';

// eslint-disable-next-line react/prop-types
export default function NoticeBox({ show, ratio }) {
  const [isVisible, setIsVisible] = useState(false);
  const prevShowRef = useRef(false);
  // LOCAL TESTS
  const mountedRef = useRef(false);
  const { data: text, isLoading } = useTechstrings();  

  useEffect(() => {
    // LOCAL TESTS
    // Skips first mount in Strict Mode
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    let timer;

    if (show && !prevShowRef.current) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000000); // 10 seconds
    }

    prevShowRef.current = show;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [show]);

  if (!isVisible) return null;
  if (isLoading) return null;

  return (
    <>
    <div className="left-tech-box" style={{width: 175 / ratio, height: 85 / ratio}}></div>
    <div className="left-civ-box" style={{width: 260 / ratio, height: 45 / ratio, left: 650 / ratio}}></div>
    <div className='notice-box'style={{left: 990 / ratio, top: 120 / ratio,}}>Tooltips active!</div>
    <div className="right-civ-box" style={{width: 260 / ratio, height: 45 / ratio, right: 650 / ratio}}></div>
    <div className="right-tech-box" style={{width: 175 / ratio, height: 85 / ratio}}></div>
    </>
  )
}