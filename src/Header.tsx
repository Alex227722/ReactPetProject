import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import NextButton from './components/NextButton';
import useHeaderHeight from './components/useHeaderHeight';
import CartHeader from './components/CartHeader';
import { useGlobalContext } from './GlobalContext';

type HeaderProps = {
  setHeaderHeight: (height: number) => void;
};

function Header({ setHeaderHeight }: HeaderProps) {
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const isGamePage = pathname === '/about';
  const isCompare = pathname === '/compare';
  const isLike = pathname === '/like';
   const isCheckout = pathname === '/checkout';
  const { headerHeight, headerTopRef } = useHeaderHeight();
  const { cartItems, comparisonList, favoritesList, setActiveModal } = useGlobalContext();

  useEffect(() => {
    if (typeof setHeaderHeight === 'function') {
      setHeaderHeight(headerHeight);
    } else {
      console.error('setHeaderHeight is not a function');
    }
  }, [headerHeight, setHeaderHeight]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        menuRef.current?.contains(e.target as Node) === false &&
        btnRef.current?.contains(e.target as Node) === false
      ) {
        setMenuActive(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('noscroll', menuActive);
  }, [menuActive]);

  return (
    <>
      <header className={`header ${isGamePage || isCompare || isLike || isCheckout ? 'header--small' : ''}`} id="section-top">
        {/* <img 
          className="header__top-img header__top-img-1" 
          src={`${import.meta.env.BASE_URL}images/index/img-top-1.png`} 
          alt="img" 
          onError={(e) => (e.currentTarget.style.display = 'none')} 
        />
        <img 
          className="header__top-img header__top-img-2" 
          src={`${import.meta.env.BASE_URL}images/index/img-top-2.png`} 
          alt="img" 
          onError={(e) => (e.currentTarget.style.display = 'none')} 
        /> */}

        <div className="fill">
          <div className="header__top" ref={headerTopRef}>
            <div className="container container-top">
              <div className="header__top-inner">
                {isHomePage ? (
                  <ScrollLink
                    to="section-top"
                    smooth={true}
                    duration={500}
                    offset={-headerHeight}
                    className="logo next-block"
                  >
                    HAVRYL
                  </ScrollLink>
                ) : (
                  <RouterLink to="/" className="logo next-block">
                    HAVRYL
                  </RouterLink>
                )}

                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li>
                      {isHomePage ? (
                        <ScrollLink
                          to="section-write"
                          smooth={true}
                          duration={500}
                          offset={-headerHeight}
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Візуалізація
                        </ScrollLink>
                      ) : (
                        <RouterLink to="/#section-write" className="next-block" onClick={() => setMenuActive(false)}>
                          Візуалізація
                        </RouterLink>
                      )}
                    </li>
                    <li>
                      {isHomePage ? (
                        <ScrollLink
                          to="section-description"
                          smooth={true}
                          duration={500}
                          offset={-headerHeight}
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Опис
                        </ScrollLink>
                      ) : (
                        <RouterLink to="/#section-description" className="next-block" onClick={() => setMenuActive(false)}>
                          Опис
                        </RouterLink>
                      )}
                    </li>
                    <li>
                      {isHomePage ? (
                        <ScrollLink
                          to="section-profit"
                          smooth={true}
                          duration={500}
                          offset={-headerHeight}
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Переваги
                        </ScrollLink>
                      ) : (
                        <RouterLink to="/#section-profit" className="next-block" onClick={() => setMenuActive(false)}>
                          Переваги
                        </RouterLink>
                      )}
                    </li>
                    <li>
                      {isHomePage ? (
                        <ScrollLink
                          to="section-characteristics"
                          smooth={true}
                          duration={500}
                          offset={-headerHeight}
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Характеристики
                        </ScrollLink>
                      ) : (
                        <RouterLink
                          to="/#section-characteristics"
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Характеристики
                        </RouterLink>
                      )}
                    </li>
                    <li>
                      {isHomePage ? (
                        <ScrollLink
                          to="section-download"
                          smooth={true}
                          duration={500}
                          offset={-headerHeight}
                          className="next-block"
                          onClick={() => setMenuActive(false)}
                        >
                          Завантажити
                        </ScrollLink>
                      ) : (
                        <RouterLink to="/#section-download" className="next-block" onClick={() => setMenuActive(false)}>
                          Завантажити
                        </RouterLink>
                      )}
                    </li>
                    <li>
                      <RouterLink to="/about" className="next-block games-link" onClick={() => setMenuActive(false)}>
                        Гра
                      </RouterLink>
                    </li>
                  </ul>
                </nav>

                <div className="header__box header__box-decktop">
                  <RouterLink to="/compare" onClick={() => setMenuActive(false)}>
                    <div className="comparison-icon cart-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="7" height="18" stroke="#FF4A1C" strokeWidth="2" />
                        <rect x="14" y="8" width="7" height="13" stroke="#FF4A1C" strokeWidth="2" />
                      </svg>
                      {comparisonList.length > 0 && (
                        <span className="cart-badge">{comparisonList.length}</span>
                      )}
                    </div>
                  </RouterLink>

                  <RouterLink to="/like" onClick={() => setMenuActive(false)}>
                    <div className="favorites-icon cart-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21s-6-4.35-9-8.5C-1 6 5-1 12 5c7-6 13 1 9 7.5C18 16.65 12 21 12 21z"
                          stroke="#FF4A1C"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      {favoritesList.length > 0 && (
                        <span className="cart-badge">{favoritesList.length}</span>
                      )}
                    </div>
                  </RouterLink>

                  <CartHeader />

                  <button className="header-icon cart-icon" onClick={() => setActiveModal('auth')}>
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.99984 0.041687C4.81371 0.041687 3.0415 1.81389 3.0415 4.00002C3.0415 6.18615 4.81371 7.95835 6.99984 7.95835C9.18597 7.95835 10.9582 6.18615 10.9582 4.00002C10.9582 1.81389 9.18597 0.041687 6.99984 0.041687ZM4.2915 4.00002C4.2915 2.50425 5.50407 1.29169 6.99984 1.29169C8.49561 1.29169 9.70817 2.50425 9.70817 4.00002C9.70817 5.49579 8.49561 6.70835 6.99984 6.70835C5.50407 6.70835 4.2915 5.49579 4.2915 4.00002Z" fill="#FF4A1C"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.49984 9.20835C2.31371 9.20835 0.541504 10.9806 0.541504 13.1667C0.541504 15.3528 2.31371 17.125 4.49984 17.125H9.49984C11.686 17.125 13.4582 15.3528 13.4582 13.1667C13.4582 10.9806 11.686 9.20835 9.49984 9.20835H4.49984ZM1.7915 13.1667C1.7915 11.6709 3.00407 10.4584 4.49984 10.4584H9.49984C10.9956 10.4584 12.2082 11.6709 12.2082 13.1667C12.2082 14.6625 10.9956 15.875 9.49984 15.875H4.49984C3.00407 15.875 1.7915 14.6625 1.7915 13.1667Z" fill="#FF4A1C"></path>
                    </svg>
                  </button>
                  <ThemeToggle />
                </div>

                <button
                  className="header__burg-btn"
                  type="button"
                  ref={btnRef}
                  onClick={() => setMenuActive(prev => !prev)}>
                  <svg width="30px" height="30px" viewBox="0 0 12 12">
                    <g>
                      <rect fill="#ffffff" height="1" width="11" x="0.5" y="5.5" />
                      <rect fill="#ffffff" height="1" width="11" x="0.5" y="2.5" />
                      <rect fill="#ffffff" height="1" width="11" x="0.5" y="8.5" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="header__top-title-box">
            <h1 className="header__top-title">HAVRYL</h1>
          </div>

          {/* {isHomePage && <NextButton targetId="section-next" offset={-headerHeight} />} */}
          <NextButton offset={-headerHeight} nthSection={1} />
        </div>
      </header>

      <div className={`header__burger-menu ${menuActive ? 'active' : ''}`} ref={menuRef}>
        <div className="header__burger-menu-rel">
          <div className="header__burger-menu-top">
            <div className="header__burger-top">
              {isHomePage ? (
                <ScrollLink
                  to="section-top"
                  smooth={true}
                  duration={500}
                  offset={-headerHeight}
                  className="logo next-block"
                >
                  HAVRYL
                </ScrollLink>
              ) : (
                <RouterLink to="/" className="logo next-block">
                  HAVRYL
                </RouterLink>
              )}
              <button className="header__burg-btn-close" type="button" onClick={() => setMenuActive(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="header__burg-scroll">
            <div className="header__box header__box-mob">
              <div className="comparison-icon cart-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="18" stroke="#FF4A1C" strokeWidth="2" />
                  <rect x="14" y="8" width="7" height="13" stroke="#FF4A1C" strokeWidth="2" />
                </svg>
                {comparisonList.length > 0 && (
                  <span className="cart-badge">{comparisonList.length}</span>
                )}
              </div>
              <div className="favorites-icon cart-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-6-4.35-9-8.5C-1 6 5-1 12 5c7-6 13 1 9 7.5C18 16.65 12 21 12 21z"
                    stroke="#FF4A1C"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                {favoritesList.length > 0 && (
                  <span className="cart-badge">{favoritesList.length}</span>
                )}
              </div>
            </div>
            <div className="header__top-inner">
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li>
                    {isHomePage ? (
                      <ScrollLink
                        to="section-write"
                        smooth={true}
                        duration={500}
                        offset={-headerHeight}
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Візуалізація
                      </ScrollLink>
                    ) : (
                      <RouterLink to="/#section-write" className="next-block" onClick={() => setMenuActive(false)}>
                        Візуалізація
                      </RouterLink>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <ScrollLink
                        to="section-description"
                        smooth={true}
                        duration={500}
                        offset={-headerHeight}
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Опис
                      </ScrollLink>
                    ) : (
                      <RouterLink to="/#section-description" className="next-block" onClick={() => setMenuActive(false)}>
                        Опис
                      </RouterLink>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <ScrollLink
                        to="section-profit"
                        smooth={true}
                        duration={500}
                        offset={-headerHeight}
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Переваги
                      </ScrollLink>
                    ) : (
                      <RouterLink to="/#section-profit" className="next-block" onClick={() => setMenuActive(false)}>
                        Переваги
                      </RouterLink>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <ScrollLink
                        to="section-characteristics"
                        smooth={true}
                        duration={500}
                        offset={-headerHeight}
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Характеристики
                      </ScrollLink>
                    ) : (
                      <RouterLink
                        to="/#section-characteristics"
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Характеристики
                      </RouterLink>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <ScrollLink
                        to="section-download"
                        smooth={true}
                        duration={500}
                        offset={-headerHeight}
                        className="next-block"
                        onClick={() => setMenuActive(false)}
                      >
                        Завантажити
                      </ScrollLink>
                    ) : (
                      <RouterLink to="/#section-download" className="next-block" onClick={() => setMenuActive(false)}>
                        Завантажити
                      </RouterLink>
                    )}
                  </li>
                  <li>
                    <RouterLink to="/about" className="next-block" onClick={() => setMenuActive(false)}>
                      Про нас
                    </RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;