import { useEffect, useRef, useState } from "react";

// Тип для параметрів сніжинки
interface Snowflake {
  id: number;
  top: number;
  left: number;
  leftX: number;
  leftRadius: number;
  leftSpeed: number;
  crds: number;
  color: string;
  fontSize: number;
  letter: string;
  isHovered: boolean;
}

// Тип для параметрів конфігурації
interface SnowFallsConfig {
  count: number;
  color: string[];
  minSize: number;
  maxSize: number;
  letter: string[];
  speed: number;
}

const defaultConfig: SnowFallsConfig = {
  count: 30,
  color: ["#FF4A1C", "#1b275f", "#D4E4ED"],
  minSize: 12,
  maxSize: 44,
  letter: [
    ..."АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  ],
  speed: 1,
};

function MusicButton() {
  const musicRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const animationRef = useRef<number | null>(null);
  const width = Math.max(document.body.clientWidth, window.innerWidth);
  const height = Math.max(document.body.clientHeight, window.innerHeight);

  // Ініціалізація сніжинок
  const initializeSnowflakes = () => {
    const newSnowflakes: Snowflake[] = Array.from({ length: defaultConfig.count }, (_, i) => ({
      id: i,
      top: -Math.random() * height,
      left: 0,
      leftX: Math.floor(Math.random() * width),
      leftRadius: Math.random() * (15 - 5) + 5,
      leftSpeed: 0.00001 + Math.random() / 55,
      crds: 0,
      color: defaultConfig.color[Math.floor(Math.random() * defaultConfig.color.length)],
      fontSize: Math.floor(
        Math.random() * (defaultConfig.maxSize - defaultConfig.minSize) + defaultConfig.minSize
      ),
      letter: defaultConfig.letter[Math.floor(Math.random() * defaultConfig.letter.length)],
      isHovered: false,
    }));
    setSnowflakes(newSnowflakes);
  };

  // Анімація сніжинок
  const animateSnowflakes = () => {
    setSnowflakes((prevSnowflakes) =>
      prevSnowflakes.map((snowflake) => {
        if (snowflake.isHovered) return snowflake;

        const newCrds = snowflake.crds + snowflake.leftSpeed;
        const newLeft = snowflake.leftX + snowflake.leftRadius * Math.sin(newCrds);
        let newTop = snowflake.top + defaultConfig.speed;

        if (newTop > height) {
          newTop = -50;
          return {
            ...snowflake,
            top: newTop,
            left: Math.floor(Math.random() * width),
            crds: newCrds,
          };
        }

        return {
          ...snowflake,
          top: newTop,
          left: newLeft,
          crds: newCrds,
        };
      })
    );

    animationRef.current = requestAnimationFrame(animateSnowflakes);
  };

  // Функція для плавної зміни гучності
  const fadeMusic = (play: boolean) => {
    const step = 0.05;
    const duration = 2000;
    const steps = 1 / step;
    const intervalTime = duration / steps;
    let volume = play ? 0 : 1;
    const audio = musicRef.current;

    if (!audio) return;

    if (play) {
      audio.volume = 0;
      audio.play();
    }

    const interval = setInterval(() => {
      if (!audio) return;

      if (play) {
        if (volume < 1) {
          volume += step;
          audio.volume = Math.min(volume, 1);
        } else {
          clearInterval(interval);
        }
      } else {
        if (volume > 0) {
          volume -= step;
          audio.volume = Math.max(volume, 0);
        } else {
          clearInterval(interval);
          audio.pause();
        }
      }
    }, intervalTime);
  };

  // Обробка натискання кнопки
  const togglePlay = () => {
    const play = !isPlaying;
    setIsPlaying(play);
    fadeMusic(play);

    if (play) {
      initializeSnowflakes();
      animateSnowflakes();
    } else {
      setSnowflakes([]);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  // Обробка прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Обробка руху миші
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((snowflake) => {
          const el = document.getElementById(`snowflake-${snowflake.id}`);
          if (!el) return snowflake;

          const rect = el.getBoundingClientRect();
          const elCenterX = rect.left + rect.width / 2;
          const elCenterY = rect.top + rect.height / 2;
          const dx = elCenterX - e.clientX;
          const dy = elCenterY - e.clientY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          return {
            ...snowflake,
            isHovered: distance < 50,
          };
        })
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [snowflakes]);

  // Очистка анімації при розмонтуванні
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <button
        id="play"
        onClick={togglePlay}
        aria-label="Toggle music and snowfall"
        style={{
          opacity: showButton ? 0.7 : 0,
          visibility: showButton ? "visible" : "hidden",
          pointerEvents: showButton ? "auto" : "none",
        }}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
              fill="#1C274C"
            />
            <path
              d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
              fill="#1C274C"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
              fill="#ffffff"
            />
          </svg>
        )}
      </button>

      <audio ref={musicRef} id="music" src="assets/images/music.mp3" loop />

      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          id={`snowflake-${snowflake.id}`}
          className="snowflake"
          style={{
            position: "fixed",
            top: `${snowflake.top}px`,
            left: `${snowflake.left}px`,
            color: snowflake.color,
            fontSize: `${snowflake.fontSize}px`,
            opacity: 1,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {snowflake.letter}
        </div>
      ))}
    </>
  );
}

export default MusicButton;