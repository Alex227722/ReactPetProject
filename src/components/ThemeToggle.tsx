
import React, { useState, useEffect } from 'react'

const ThemeToggle: React.FC = () => {
  const [isNight, setIsNight] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [wipeStyle, setWipeStyle] = useState({
    clipPath: 'circle(0px at 0px 0px)',
    opacity: 0,
    background: '#ffffff'
  })

  // Завантажуємо тему при старті
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme')
      const nightMode = savedTheme === 'night'
      setIsNight(nightMode)
    } catch (error) {
      // Fallback якщо localStorage недоступний
      setIsNight(false)
    }
  }, [])

  // Застосовуємо тему до body (єдине виключення для глобальних стилів)
  useEffect(() => {
    if (isNight) {
      document.body.classList.add('active')
      document.getElementById('fullpage')?.classList.add('night')
    } else {
      document.body.classList.remove('active')
      document.getElementById('fullpage')?.classList.remove('night')
    }
  }, [isNight])

  const toggleTheme = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    
    // Вибираємо стартову позицію залежно від поточної теми
    const startX = isNight ? 0 : window.innerWidth
    const startY = isNight ? 0 : window.innerHeight
    
    // Встановлюємо фон оверлею як НОВУ тему (ту, на яку переходимо)
    const newThemeBackground = isNight ? '#ffffff' : '#1a1a1a'
    
    // Показуємо оверлей з НОВОЮ темою
    setWipeStyle({
      clipPath: 'circle(0px at 0px 0px)',
      opacity: 1,
      background: newThemeBackground
    })

    // НЕ міняємо тему одразу! Почекаємо поки заливка покриє екран
    const newNightMode = !isNight

    // Запускаємо анімацію і передаємо нову тему
    requestAnimationFrame(() => animateWipe(startX, startY, newNightMode))
  }

  const animateWipe = (x: number, y: number, newNightMode: boolean) => {
    const duration = 1500
    const startTime = performance.now()
    const diagonal = Math.hypot(window.innerWidth, window.innerHeight)
    const maxSize = diagonal * 1.2
    let themeChanged = false

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-out для плавного розповзання
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentSize = easeOut * maxSize

      // Коли заливка покрила ~50% екрану - міняємо тему
      if (!themeChanged && progress > 0.5) {
        themeChanged = true
        setIsNight(newNightMode)
        
        // Застосовуємо тему до DOM
        if (newNightMode) {
          document.body.classList.add('active')
          document.getElementById('fullpage')?.classList.add('night')
        } else {
          document.body.classList.remove('active')
          document.getElementById('fullpage')?.classList.remove('night')
        }
        
        // Зберігаємо в localStorage
        try {
          localStorage.setItem('theme', newNightMode ? 'night' : 'day')
        } catch (error) {
          console.warn('Cannot save theme to localStorage:', error)
        }
      }

      // Оновлюємо стиль через React state
      setWipeStyle(prev => ({
        ...prev,
        clipPath: `circle(${currentSize}px at ${x}px ${y}px)`
      }))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        completeTransition()
      }
    }

    animate(performance.now())
  }

  const completeTransition = () => {
    // Спочатку плавно зменшуємо прозорість
    setWipeStyle(prev => ({
      ...prev,
      opacity: 0  // transition: 'opacity 0.3s ease' зробить це плавно
    }))
    
    // Через 300ms (після завершення fade-out) ховаємо повністю
    setTimeout(() => {
      setWipeStyle({
        clipPath: 'circle(0px at 0px 0px)',
        opacity: 0,
        background: '#ffffff'
      })
      setIsTransitioning(false)
    }, 300) // Чекаємо поки opacity transition завершиться
  }

  return (
    <>
      {/* Оверлей для анімації - рендериться через React */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.3s ease',
          ...wipeStyle
        }}
      />

      {/* Кнопка перемикання */}
      <div 
        className={`time-circle ${isNight ? 'switched' : ''}`}
        onClick={toggleTheme}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: isNight ? '#333' : '#fff',
          border: '2px solid #ccc',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // transition: 'all 0.2s ease',
          marginRight: 0,
          opacity: isTransitioning ? 0.5 : 1,
          position: 'relative',
          zIndex: 10000,
        }}
      >
        {isNight ? '🌙' : '☀️'}
      </div>
    </>
  )
}

export default ThemeToggle

// import { useState, useEffect } from 'react'

// function ThemeToggle() {
//   const [isNight, setIsNight] = useState(false)

//   // Завантажуємо тему з localStorage при старті
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme')
//     const nightMode = savedTheme === 'night'
//     setIsNight(nightMode)
    
//     // Додаємо/знімаємо класи
//     if (nightMode) {
//       document.body.classList.add('active')
//       document.getElementById('fullpage')?.classList.add('night')
//     }
//   }, [])

//   // Перемикання теми
//   const toggleTheme = () => {
//     const newNightMode = !isNight
//     setIsNight(newNightMode)
    
//     if (newNightMode) {
//       document.body.classList.add('active')
//       document.getElementById('fullpage')?.classList.add('night')
//       localStorage.setItem('theme', 'night')
//     } else {
//       document.body.classList.remove('active')
//       document.getElementById('fullpage')?.classList.remove('night')
//       localStorage.setItem('theme', 'day')
//     }
//   }

//   return (
//     <div 
//       className={`time-circle ${isNight ? 'switched' : ''}`}
//       onClick={toggleTheme}
//       style={{
//         width: '36px',
//         height: '36px',
//         borderRadius: '50%',
//         backgroundColor: isNight ? '#333' : '#fff',
//         border: '2px solid #ccc',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         transition: 'all 0.3s ease',
//         marginRight: 0,
//       }}
//     >
//       {isNight ? '🌙' : '☀️'}
//     </div>
//   )
// }

// export default ThemeToggle