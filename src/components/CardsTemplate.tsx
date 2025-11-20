import React from 'react';
import ProductCard from './ProductCard';
import { fontStyles } from './fontStyles';

type CardsTemplateProps = {
  title?: string;
  sectionId?: string;
};

const CardsTemplate: React.FC<CardsTemplateProps> = ({ title, sectionId }) => {
  if (!fontStyles || fontStyles.length === 0) {
    return <div>Немає доступних стилів шрифтів</div>;
  }

  return (
    <section className="block-indent" id={sectionId}>
      <div className="container">
        {title && <div className="section__title">{title}</div>}
        <div className="cards-grid">
          {fontStyles.map((style) => (
            <ProductCard
              key={style.id}
              productId={style.id}
              name={style.name}
              variant={style.variant}
              previewImg={style.previewImg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsTemplate;