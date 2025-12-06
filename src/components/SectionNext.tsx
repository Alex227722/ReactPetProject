import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import SectionCards from './SectionCards';
import { fontStyles } from './fontStyles';

import '../../node_modules/swiper/swiper-bundle.min.css';
import '../../node_modules/swiper/modules/navigation.css';
import '../../node_modules/swiper/modules/navigation.css';

const SectionNext: React.FC = () => {
  const swiperSmallRef = useRef<Swiper | null>(null);
  const swiperBigRef = useRef<Swiper | null>(null);

  useEffect(() => {
    const swiperBox = document.querySelector('#swiper-box');
    const swiperBigBox = document.querySelector('#swiper-big-box');

    if (!swiperBox || !swiperBigBox) {
      console.error('Swiper elements not found:', { swiperBox, swiperBigBox });
      return;
    }

    swiperSmallRef.current = new Swiper('#swiper-box', {
      modules: [Navigation, Pagination, Controller],
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 10,
      loop: false,
      pagination: {
        el: '#swiper-box .swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '#swiper-box .swiper-button-next',
        prevEl: '#swiper-box .swiper-button-prev',
      },
    });

    swiperBigRef.current = new Swiper('#swiper-big-box', {
      modules: [Controller],
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 10,
      loop: false,
    });

    if (swiperSmallRef.current && swiperBigRef.current) {
      swiperSmallRef.current.controller.control = swiperBigRef.current;
      swiperBigRef.current.controller.control = swiperSmallRef.current;
    }

    return () => {
      if (swiperSmallRef.current) swiperSmallRef.current.destroy();
      if (swiperBigRef.current) swiperBigRef.current.destroy();
    };
  }, []);

  return (
    <section className="block-indent" id="section-next">
      <div className="container">
        <div className="section__title">Havryl Family Font</div>
        <div className="top__box">
          <div className="sliders-two decor-box">
            <div className="swiper-box-main">
              <div className="swiper-box" id="swiper-box">
                <SectionCards isSlider={true} sectionId="section-cards" />
                <div className="swiper-nav-box">
                  <div className="swiper-pagination"></div>
                  <div className="swiper-button-box">
                    <div className="swiper-button-prev" id="cart__slider-prev-top">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path
                          d="M5.10655 1.27724C5.35172 1.03426 5.35348 0.638533 5.1105 0.393368C4.86751 0.148204 4.47178 0.146439 4.22662 0.389425L2.73101 1.87175C2.1677 2.43003 1.7073 2.88633 1.3808 3.29288C1.04127 3.71565 0.795498 4.14477 0.729843 4.65986C0.701055 4.88572 0.701055 5.11428 0.729843 5.34014C0.795498 5.85523 1.04127 6.28435 1.3808 6.70712C1.70731 7.11368 2.1677 7.56997 2.73102 8.12826L4.22662 9.61058C4.47178 9.85356 4.86751 9.8518 5.11049 9.60663C5.35348 9.36147 5.35172 8.96574 5.10655 8.72276L3.63741 7.26667C3.04117 6.67572 2.63216 6.26902 2.35541 5.92441C2.26547 5.81242 2.1953 5.71383 2.14082 5.625H14.6666C15.0118 5.625 15.2916 5.34518 15.2916 5C15.2916 4.65482 15.0118 4.375 14.6666 4.375H2.14082C2.1953 4.28617 2.26547 4.18758 2.35541 4.07559C2.63216 3.73098 3.04116 3.32428 3.63741 2.73333L5.10655 1.27724Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="swiper-button-next" id="cart__slider-next-top">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path
                          d="M11.7732 0.389425C11.5281 0.146439 11.1323 0.148204 10.8893 0.393368C10.6464 0.638533 10.6481 1.03426 10.8933 1.27724L12.3624 2.73333C12.9587 3.32428 13.3677 3.73098 13.6444 4.07559C13.7344 4.18758 13.8045 4.28617 13.859 4.375L1.33325 4.375C0.988074 4.375 0.708252 4.65482 0.708252 5C0.708252 5.34518 0.988074 5.625 1.33325 5.625L13.859 5.625C13.8045 5.71383 13.7344 5.81242 13.6444 5.92441C13.3677 6.26902 12.9587 6.67572 12.3624 7.26667L10.8933 8.72276C10.6481 8.96574 10.6464 9.36147 10.8893 9.60663C11.1323 9.8518 11.5281 9.85356 11.7732 9.61058L13.2688 8.12825C13.8321 7.56996 14.2925 7.11368 14.619 6.70712C14.9586 6.28435 15.2043 5.85523 15.27 5.34014C15.2844 5.22721 15.2916 5.1136 15.2916 5C15.2916 4.8864 15.2844 4.77279 15.27 4.65987C15.2043 4.14477 14.9586 3.71565 14.619 3.29288C14.2925 2.88632 13.8321 2.43003 13.2688 1.87174L11.7732 0.389425Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slider-big">
              <div className="swiper-big-box" id="swiper-big-box">
                <div className="swiper-wrapper">
                  {fontStyles.map((style, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="swiper-big-inner">
                        <img
                          className="swiper-big-img"
                          src={`${import.meta.env.BASE_URL}assets/images/sliders-2/${style.fullImg}`}
                          alt={`${style.name} ${style.variant}`}
                          onError={(e) => (e.currentTarget.style.display = 'none')}  // Ховаємо, якщо 404
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNext;