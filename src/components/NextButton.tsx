import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation } from 'react-router-dom';

interface NextButtonProps {
  targetId?: string;
  offset?: number;
  nthSection?: number;
}

function NextButton({ targetId, offset = 0, nthSection = 1 }: NextButtonProps) {
  const [dynamicTargetId, setDynamicTargetId] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation(); // Відстежуємо зміни маршруту

  // Знаходимо ID n-ї секції в <main>
  useEffect(() => {
    // Скидаємо стан при зміні маршруту
    setIsReady(false);
    setDynamicTargetId('');
    
    // Якщо targetId передано явно, використовуємо його
    if (targetId) {
      // Перевіряємо, чи існує елемент
      const checkElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          setDynamicTargetId(targetId);
          setIsReady(true);
          return true;
        }
        return false;
      };

      if (!checkElement()) {
        const timeoutId = setTimeout(checkElement, 100);
        return () => clearTimeout(timeoutId);
      }
      return;
    }

    // Інакше шукаємо автоматично
    const findTarget = () => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return false;

      const sections = mainElement.querySelectorAll('section[id]');
      if (sections.length >= nthSection) {
        const targetSection = sections[nthSection - 1];
        const sectionId = targetSection.getAttribute('id');
        if (sectionId) {
          setDynamicTargetId(sectionId);
          setIsReady(true);
          return true;
        }
      }
      return false;
    };

    // Спробуємо знайти одразу
    if (!findTarget()) {
      // Якщо не вдалося, спробуємо кілька разів з затримкою
      let attempts = 0;
      const maxAttempts = 5;
      
      const intervalId = setInterval(() => {
        attempts++;
        if (findTarget() || attempts >= maxAttempts) {
          clearInterval(intervalId);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [targetId, nthSection, location.pathname]); // Додали location.pathname

  // Логіка для активного стану кнопки
  useEffect(() => {
    if (!dynamicTargetId || !isReady) return;

    const setActiveLink = () => {
      const targetSection = document.getElementById(dynamicTargetId);
      if (targetSection) {
        const rect = targetSection.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top <= window.innerHeight / 2;
        setIsActive(isInView);
      }
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
    
    return () => window.removeEventListener('scroll', setActiveLink);
  }, [dynamicTargetId, isReady]);

  const handleSetActive = () => setIsActive(true);
  const handleSetInactive = () => setIsActive(false);
  const handleMouseEnter = () => document.querySelector('.fill')?.classList.add('active');
  const handleMouseLeave = () => document.querySelector('.fill')?.classList.remove('active');
  
  // Додаткова перевірка перед кліком
  const handleClick = () => {
    const targetElement = document.getElementById(dynamicTargetId);
    if (!targetElement) {
      console.warn(`Target element "${dynamicTargetId}" not found`);
      return false; // Скасовує скрол у react-scroll
    }
  };

  // Не рендеримо, якщо цільова секція не знайдена
  if (!dynamicTargetId || !isReady) {
    return null;
  }

  return (
    <ScrollLink
      to={dynamicTargetId}
      smooth={true}
      duration={500}
      offset={offset}
      className={`next-block next-block-arrow ${isActive ? 'active' : ''}`}
      onSetActive={handleSetActive}
      onSetInactive={handleSetInactive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <svg
        role="presentation"
        className="arrow-svg"
        style={{ fill: '#f7f7f7', width: '38.417px' }}
        height="18.592px"
        viewBox="0 0 38.417 18.592"
      >
        <g>
          <path d="M19.208,18.592c-0.241,0-0.483-0.087-0.673-0.261L0.327,1.74c-0.408-0.372-0.438-1.004-0.066-1.413c0.372-0.409,1.004-0.439,1.413-0.066L19.208,16.24L36.743,0.261c0.411-0.372,1.042-0.342,1.413,0.066c0.372,0.408,0.343,1.041-0.065,1.413L19.881,18.332C19.691,18.505,19.449,18.592,19.208,18.592z"></path>
        </g>
      </svg>
    </ScrollLink>
  );
}

export default NextButton;