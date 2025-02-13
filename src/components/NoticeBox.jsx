import { useState, useEffect } from 'react'

export default function NoticeBox(show) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className='notice-box'>You can mouseover the player name boxes to see civ tooltips!</div>
  )
}