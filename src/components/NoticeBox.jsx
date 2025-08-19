import { useEffect, useState, useRef } from 'react'
import { useTextContent } from '../hooks/useTextContent';

export default function NoticeBox(show) {
  const [isVisible, setIsVisible] = useState(false);
  const prevShowRef = useRef(false);
  const mountedRef = useRef(false);
  const { data: text, isLoading } = useTextContent();

  useEffect(() => {
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
  if (isLoading) return null;

  return (
    <div className='notice-box'>{text.noticeBox.text}</div>
  )
}