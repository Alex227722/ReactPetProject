import React from 'react';
import { fontStyles } from './fontStyles';

type SliderTemplateProps = {
  title?: string;
  sectionId?: string;
};

const SliderTemplate: React.FC<SliderTemplateProps> = ({ title, sectionId }) => {
  if (!fontStyles || fontStyles.length === 0) {
    return <div>Немає доступних стилів шрифтів</div>;
  }

  return (
    <>
      {title && <div className="section__title">{title}</div>}
      <section className="swiper-wrapper">
        {fontStyles.map((style) => (
          <div className="swiper-slide" key={style.id}>
            <div className="swiper-inner">
              <div className="swiper-info">
                <a className="swiper-title" href={sectionId ? `#${sectionId}` : '#section-cards'}>
                  {style.name}
                </a>
                <div className="swiper-price-count">
                  <span className="swiper-price-new">{style.variant}</span>
                </div>
              </div>
              <div className="swiper-img-bg">
                <img
                  className="swiper-img"
                  src={`${import.meta.env.BASE_URL}assets/images/sliders/${style.previewImg}`}
                  alt={`${style.name} ${style.variant}`}
                  onError={(e) => (e.currentTarget.src = `${import.meta.env.BASE_URL}assets/images/placeholder.png`)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default SliderTemplate;