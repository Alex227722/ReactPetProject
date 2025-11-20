import { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';

function Footer() {
  const { headerHeight } = useGlobalContext();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  useEffect(() => {
    console.log('Footer headerHeight:', headerHeight);
  }, [headerHeight]);

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="header__top-inner">
            {isHomePage && headerHeight > 0 ? (
              <ScrollLink
                to="section-top"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                spy={true}
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
                  {isHomePage && headerHeight > 0 ? (
                    <ScrollLink
                      to="section-write"
                      smooth={true}
                      duration={500}
                      offset={-headerHeight}
                      spy={true}
                      className="next-block"
                    >
                      Візуалізація
                    </ScrollLink>
                  ) : (
                    <RouterLink to="/#section-write" className="next-block">
                      Візуалізація
                    </RouterLink>
                  )}
                </li>
                <li>
                  {isHomePage && headerHeight > 0 ? (
                    <ScrollLink
                      to="section-description"
                      smooth={true}
                      duration={500}
                      offset={-headerHeight}
                      spy={true}
                      className="next-block"
                    >
                      Опис
                    </ScrollLink>
                  ) : (
                    <RouterLink to="/#section-description" className="next-block">
                      Опис
                    </RouterLink>
                  )}
                </li>
                <li>
                  {isHomePage && headerHeight > 0 ? (
                    <ScrollLink
                      to="section-profit"
                      smooth={true}
                      duration={500}
                      offset={-headerHeight}
                      spy={true}
                      className="next-block"
                    >
                      Переваги
                    </ScrollLink>
                  ) : (
                    <RouterLink to="/#section-profit" className="next-block">
                      Переваги
                    </RouterLink>
                  )}
                </li>
                <li>
                  {isHomePage && headerHeight > 0 ? (
                    <ScrollLink
                      to="section-characteristics"
                      smooth={true}
                      duration={500}
                      offset={-headerHeight}
                      spy={true}
                      className="next-block"
                    >
                      Характеристики
                    </ScrollLink>
                  ) : (
                    <RouterLink to="/#section-characteristics" className="next-block">
                      Характеристики
                    </RouterLink>
                  )}
                </li>
                <li>
                  {isHomePage && headerHeight > 0 ? (
                    <ScrollLink
                      to="section-download"
                      smooth={true}
                      duration={500}
                      offset={-headerHeight}
                      spy={true}
                      className="next-block"
                    >
                      Завантажити
                    </ScrollLink>
                  ) : (
                    <RouterLink to="/#section-download" className="next-block">
                      Завантажити
                    </RouterLink>
                  )}
                </li>
                <li>
                  <RouterLink to="/about" className="next-block">
                    Про нас
                  </RouterLink>
                </li>
              </ul>
            </nav>
            <div className="footer__item">
              <a className="footer__item-tel footer__link" href="mailto:HAVRYL@font">
                HAVRYL@font
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;