import { useEffect, useState, useRef } from 'react'
import { useTechstrings } from '../hooks/helpers';

// eslint-disable-next-line react/prop-types
export default function NoticeBox({ show, ratio }) {
  const [isVisible, setIsVisible] = useState(false);
  const prevShowRef = useRef(false);
  // UNCOMMENT FOR LOCAL TESTS
  // const mountedRef = useRef(false);
  // ***
  const { data: text, isLoading } = useTechstrings();

  useEffect(() => {
    // Skips first mount in Strict Mode
    // UNCOMMENT FOR LOCAL TESTS
    // if (!mountedRef.current) {
    //   mountedRef.current = true;
    //   return;
    // }
    // ***
    let timer;

    if (show && !prevShowRef.current) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000); // 8 seconds
    }

    prevShowRef.current = show;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [show]);

  if (!isVisible || isLoading) return null;

  // Do i even want this?
  // const layoutConfig = {
  //   t90official: {
  //     tech: { top: 50, width: 200, height: 90 },
  //     civLeft: { width: 260, height: 45, left: 650 },
  //     civRight: { width: 260, height: 45, right: 650 },
  //   },
  //   chpy: {
  //     tech: { top: 50, width: 150, height: 70 },
  //     civLeft: { width: 200, height: 40, left: 500 },
  //     civRight: { width: 200, height: 40, right: 600 },
  //   },
  //   // etc
  // };
  // const selectedLayout = layoutConfig[streamUrl] || {};
  // const techStyle = selectedLayout.tech;
  // const civLeftStyle = selectedLayout.civLeft;
  // const civRightStyle = selectedLayout.civRight;

  return (
    <>
    {/* <div className="left-tech-box" style={techStyle}></div>
    <div className="left-civ-box" style={civLeftStyle}></div> */}
    <div className='notice-box'style={{top: 150 / ratio, left: 960 / ratio}}>{text.noticeBox.text}</div>
    {/* <div className="right-civ-box" style={civRightStyle}></div>
    <div className="right-tech-box" style={techStyle}></div> */}
    </>
  )
}