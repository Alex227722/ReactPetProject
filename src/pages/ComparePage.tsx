import React from 'react';
import { useGlobalContext } from '../GlobalContext';
import { fontStyles } from '../components/fontStyles';
import ProductCard from '../components/ProductCard';

function ComparePage() {
  const { comparisonList, removeFromComparison } = useGlobalContext();

  // Фільтруємо fontStyles, щоб отримати тільки ті шрифти, які є в comparisonList
  const comparisonItems = fontStyles.filter((font) =>
    comparisonList.includes(font.id)
  );

  // Функція для очищення списку порівняння
  const clearComparisonList = () => {
    comparisonList.forEach((id) => removeFromComparison(id));
  };

  return (
    <section id="compare">
      <div className="container">
        <h2>Порівняння</h2>
        {comparisonItems.length === 0 ? (
          <p>Немає товарів для порівняння</p>
        ) : (
          <>
            <button className="clear-button" onClick={clearComparisonList}>
              Очистити список порівняння
            </button>
            <div className="product-card-list">
              {comparisonItems.map((font) => (
                <ProductCard
                  key={font.id}
                  productId={font.id}
                  name={font.name}
                  variant={font.variant}
                  previewImg={font.previewImg}
                  showActions="comparison"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ComparePage;