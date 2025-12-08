import React, { useEffect, useRef, useState } from 'react';
import './styles-games.css';
import './fonts.css';

// Імпорти зображень
import img_gif from './img/degendojo-dojodegen.gif';
import img_m from './img/mario.png';
import img_1 from './img/img-1.png';
import img_2 from './img/img-2.png';
import img_3 from './img/img-3.png';
import way from './img/bg.jpg';
import img_p from './img/princese.png';
import img_c from './img/img-win.jpg';
import trail_1 from './img/mariomouse/mario-s.png';
import trail_b from './img/mariomouse/mario-b.png';
import mario from './img/mariomouse/mario-b.png';
import bg_t from './img/bg-t.png';

// Імпорти аудіо
import audio1 from './img/super-mario-saundtrek.mp3';
import audio2 from './img/super-mario-fanfara.mp3';
import audio3 from './img/mp3.mp3';
import audio4 from './img/mario-error.mp3';
import audio5 from './img/rock.mp3';

function Games() {
  const [activeTrail, setActiveTrail] = useState<number>(0);
  const [isOffTrail, setIsOffTrail] = useState<boolean>(false);
  const [isOffEnd, setIsOffEnd] = useState<boolean>(false);
  const [isFigureActive, setIsFigureActive] = useState<boolean>(false);
  const [isSnowActive, setIsSnowActive] = useState<boolean>(false);
  const [isTrail, setTrail] = useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);

  const audioRefs = {
    'myAudio': useRef<HTMLAudioElement>(null),
    'myAudio-1': useRef<HTMLAudioElement>(null),
    'myAudio-3': useRef<HTMLAudioElement>(null),
    'myAudio-4': useRef<HTMLAudioElement>(null),
    'myAudio-5': useRef<HTMLAudioElement>(null),
  } as const;

  const snowContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const marikRef = useRef<HTMLImageElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([...Array(8)].map(() => null));

  // Один обробник для mouseenter і mouseleave
  useEffect(() => {
    const elements = [marikRef.current, ...trailRefs.current].filter(Boolean) as (HTMLImageElement | HTMLDivElement)[];
    const cleanupFns: (() => void)[] = [];

    elements.forEach((el) => {
      if (!el) return;
      const isTrail8 = el.classList.contains('trail-8');
      const isTrailElement = el.classList.contains('trail');

      // При наведенні: мутити error звук
      const handleEnter = () => {
        if (isTrailElement && audioRefs['myAudio-4']?.current) {
          audioRefs['myAudio-4'].current.muted = true;
        }
      };

      // При виході: грати error звук (якщо не trail-8)
      const handleLeave = () => {
        if (isTrailElement && !isTrail8 && audioRefs['myAudio-4']?.current) {
          audioRefs['myAudio-4'].current.muted = false;
          audioRefs['myAudio-4'].current.play().catch(() => {});
        }
      };

      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);

      cleanupFns.push(() => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => cleanupFns.forEach(fn => fn());
  }, []);

  // Керування музикою залежно від activeTrail
  useEffect(() => {
    let targetMusic: string | null = null;

    // Визначаємо яка музика має грати
    if (activeTrail >= 1 && activeTrail <= 3) {
      targetMusic = 'myAudio-3'; // Звук кроку
    } else if (activeTrail >= 4 && activeTrail <= 5) {
      targetMusic = 'myAudio'; // Саундтрек рівня
    } else if (activeTrail >= 6 && activeTrail <= 8) {
      targetMusic = 'myAudio-1'; // Фанфара перемоги
    }

    // Перемикаємо музику тільки якщо змінилась
    if (targetMusic && targetMusic !== currentMusic) {
      // Зупинити попередню музику
      if (currentMusic) {
        const prevAudio = audioRefs[currentMusic as keyof typeof audioRefs]?.current;
        if (prevAudio) {
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }

      // Запустити нову музику
      const newAudio = audioRefs[targetMusic as keyof typeof audioRefs]?.current;
      if (newAudio) {
        newAudio.currentTime = 0;
        newAudio.play().catch(() => {});
      }

      setCurrentMusic(targetMusic);
    }

    // Зупинити всю музику якщо activeTrail = 0
    if (activeTrail === 0 && currentMusic) {
      const audio = audioRefs[currentMusic as keyof typeof audioRefs]?.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setCurrentMusic(null);
    }
  }, [activeTrail, currentMusic]);

  useEffect(() => {
    setIsOffTrail(activeTrail > 0);
  }, [activeTrail]);

  useEffect(() => {
    setIsOffEnd(activeTrail === 8);
  }, [activeTrail]);

  // Логіка снігу
  useEffect(() => {
    if (!isSnowActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (snowContainerRef.current) {
        snowContainerRef.current.innerHTML = '';
      }
      audioRefs['myAudio-5']?.current?.pause();
      return;
    }

    const flakes: { el: HTMLDivElement; top: number; left_x: number; crds: number; left_radius: number; left_sped: number }[] = [];
    const param = { count: 100, color: ['blue', 'green'], minSize: 12, maxSize: 44, speed: 0.5 };
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < param.count; i++) {
      const flake = document.createElement('div');
      flake.innerHTML = '*';
      flake.style.position = 'fixed';
      flake.style.top = '-50px';
      flake.style.left = '0';
      flake.style.color = param.color[Math.floor(Math.random() * param.color.length)];
      flake.style.fontSize = `${Math.floor(Math.random() * (param.maxSize - param.minSize) + param.minSize)}px`;
      flake.style.opacity = '1';
      flake.style.pointerEvents = 'auto';
      flake.style.cursor = 'pointer';
      flake.style.zIndex = '1000';
      flake.classList.add('snowflake');
      snowContainerRef.current?.appendChild(flake);

      flakes.push({
        el: flake,
        top: -Math.random() * height,
        left_x: Math.random() * width,
        crds: 0,
        left_radius: Math.random() * 10 + 5,
        left_sped: 0.00001 + Math.random() / 55,
      });
    }

    audioRefs['myAudio-5']?.current?.play().catch(() => {});

    const animate = () => {
      flakes.forEach((flake) => {
        flake.crds += flake.left_sped;
        flake.el.style.left = `${flake.left_x + flake.left_radius * Math.sin(flake.crds)}px`;
        flake.top += param.speed;
        if (flake.top > height) {
          flake.top = -50;
          flake.left_x = Math.random() * width;
        }
        flake.el.style.top = `${flake.top}px`;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audioRefs['myAudio-5']?.current?.pause();
    };
  }, [isSnowActive]);

  const handleTrail = () => {
    setTrail(prev => !prev);
  };

  const handleSnowToggle = () => {
    setIsSnowActive((prev) => !prev);
    if (!isFigureActive) {
      setTimeout(() => {
        setIsFigureActive(true);
        setTimeout(() => setIsFigureActive(false), 7000);
      }, 7000);
    }
  };

  const handleTrailHover = (index: number) => {
    setActiveTrail(index);
  };

  const cursorStyle = { cursor: `url(${trail_1}) 16 16, pointer` };
  const cursorStyleBig = { cursor: `url(${trail_b}) 32 32, pointer` };

  return (
    <div className="box-mario">
      <div ref={snowContainerRef} />

      <audio ref={audioRefs.myAudio} src={audio1} />
      <audio ref={audioRefs['myAudio-1']} src={audio2} />
      <audio ref={audioRefs['myAudio-3']} src={audio3} />
      <audio ref={audioRefs['myAudio-4']} src={audio4} />
      <audio ref={audioRefs['myAudio-5']} src={audio5} />

      <div className={`way ${isTrail ? 'cheat' : ''}`} style={{ backgroundImage: `url(${way})` }}>
        <figure className={`figure ${isFigureActive ? 'figure-active' : ''}`}>
          <img src={img_gif} width="250" alt="Dojo" />
        </figure>

        <div className={`buttons buttons-m ${isOffTrail || isOffEnd ? 'off-3 off-2' : ''}`} id="blink">
          Click on mario !!!
          <svg viewBox="0 0 24 24" style={{ width: '50px', transform: 'rotate(45deg)' }}>
            <g>
              <circle cx="12" cy="12" r="10" style={{ fill: '#ece4b7' }} />
              <path d="M15 16h-4a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1z" style={{ fill: '#ff8e31' }} />
              <path d="M12 13H8a1 1 0 0 1 0-2h3V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1z" style={{ fill: '#ff8e31' }} />
            </g>
          </svg>
        </div>

        <button
          className={`buttons button-c ${isTrail ? 'on' : ''} ${isOffTrail ? 'off-3' : ''}`}
          type="button"
          onClick={handleTrail}>
          Cheat on/off
        </button>

        <button
          className={`buttons ${isSnowActive ? 'on' : ''} ${isOffTrail ? 'off-3' : ''}`}
          type="button"
          onClick={handleSnowToggle}>
          Hard level on/off
        </button>

        <img ref={marikRef} className={`marik hover-element ${isOffTrail ? 'off-3' : ''}`} src={img_m} width="50" height="50" alt="Mario" />

        <div
          ref={(el) => (trailRefs.current[0] = el)}
          className={`trail-1 trail hover-element ${activeTrail >= 1 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(1)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 1 && <img src={bg_t} alt="image" />}
        </div>

        <div
          ref={(el) => (trailRefs.current[1] = el)}
          className={`trail-2 trail hover-element ${activeTrail >= 2 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(2)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 2 && <img src={bg_t} alt="image" />}
        </div>

        <div
          ref={(el) => (trailRefs.current[2] = el)}
          className={`trail-3 trail hover-element ${activeTrail >= 3 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(3)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 3 && <img src={bg_t} alt="image" />}
        </div>

        <img className={`pos-absolute-3 off ${isOffTrail ? 'off-3' : ''} ${isOffEnd ? 'off-2' : ''}`} src={img_3} alt="Obstacle 3" />

        <div
          ref={(el) => (trailRefs.current[3] = el)}
          className={`trail-4 trail hover-element ${activeTrail >= 4 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(4)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 4 && <img src={bg_t} alt="image" />}
        </div>

        <img className={`pos-absolute-2 off ${isOffTrail ? 'off-3' : ''} ${isOffEnd ? 'off-2' : ''}`} src={img_2} alt="Obstacle 2" />

        <div
          ref={(el) => (trailRefs.current[4] = el)}
          className={`trail-5 trail hover-element ${activeTrail >= 5 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(5)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 5 && <img src={bg_t} alt="image" />}
        </div>

        <img className={`pos-absolute off ${isOffTrail ? 'off-3' : ''} ${isOffEnd ? 'off-2' : ''}`} src={img_1} alt="Obstacle 1" />

        <div
          ref={(el) => (trailRefs.current[5] = el)}
          className={`trail-6 trail hover-element ${activeTrail >= 6 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(6)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 6 && <img src={bg_t} alt="image" />}
        </div>

        <div
          ref={(el) => (trailRefs.current[6] = el)}
          className={`trail-7 trail hover-element ${activeTrail >= 7 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(7)}
          onMouseLeave={() => handleTrailHover(0)}
          style={cursorStyle}>
          {activeTrail >= 7 && <img src={bg_t} alt="image" />}
        </div>

        <div
          ref={(el) => (trailRefs.current[7] = el)}
          className={`trail-8 trail hover-element ${activeTrail >= 8 ? 'active' : ''}`}
          onMouseEnter={() => handleTrailHover(8)}
          onMouseLeave={() => handleTrailHover(0)}
          style={{ position: 'relative', ...cursorStyleBig }}>
          {activeTrail >= 8 && (
            <>
              <img src={bg_t} alt="image" />
              <img className='mario' src={mario} alt="image" />
              <img className='princess' src={img_p} alt="Princess"/>
            </>
          )}
        </div>

        <img className="marik-f" src={img_c} alt="Win" />
      </div>
    </div>
  );
}

export default Games;