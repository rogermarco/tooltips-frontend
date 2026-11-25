import { useEffect, useState } from 'react';
import { useTechstrings } from '../hooks/helpers';

const SHOW_FOR_MS = 8000;

/** Shown for 8 seconds each time the overlay appears. */
export default function NoticeBox({ ratio }: { ratio: number }) {
  const [isVisible, setIsVisible] = useState(true);
  const { data: text } = useTechstrings();

  // Starting the timer on mount (with cleanup) also works under StrictMode's
  // double effect run in dev, so no local-test workaround is needed.
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), SHOW_FOR_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !text?.noticeBox?.text) return null;

  return (
    <div className='notice-box' style={{ top: 150 / ratio, left: 960 / ratio }}>
      {text.noticeBox.text}
    </div>
  );
}
