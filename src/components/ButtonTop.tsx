import { useState, useEffect } from 'react';

function ButtonTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`btn-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        opacity: isVisible ? 0.7 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s, visibility 0.3s'
      }}
      aria-label="Scroll to top">
      <svg width="20" height="20" viewBox="0 0 8 4" fill="none">
        <path
          d="M3.69874 0.482176L0.489295 2.61754C0.243938 2.78094 0.175368 3.12271 0.339296 3.36806C0.502688 3.61288 0.845548 3.68147 1.09144 3.51808L3.99982 1.58306L6.90819 3.51808C7.15408 3.68147 7.49642 3.61288 7.66034 3.36806C7.82427 3.12271 7.7557 2.78094 7.51035 2.61754L4.30089 0.482176C4.12089 0.362712 3.87874 0.362712 3.69874 0.482176Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default ButtonTop;



