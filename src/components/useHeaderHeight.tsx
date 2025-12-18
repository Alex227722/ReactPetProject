import { useState, useEffect, useRef, useLayoutEffect } from 'react';

function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerTopRef = useRef<HTMLDivElement>(null);

  const updateHeaderHeight = () => {
    if (headerTopRef.current) {
      const height = headerTopRef.current.offsetHeight;
      setHeaderHeight(height);
      // console.log('useHeaderHeight updated:', height);
    } else {
      // console.log('headerTopRef.current is null');
    }
  };

  // Синхронне вимірювання після рендерингу
  useLayoutEffect(() => {
    updateHeaderHeight();
    // Одноразовий виклик після повного рендерингу
    const raf = requestAnimationFrame(updateHeaderHeight);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Відстеження resize і load
  useEffect(() => {
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('load', updateHeaderHeight);
    };
  }, []);

  return { headerHeight, headerTopRef };
}

export default useHeaderHeight;