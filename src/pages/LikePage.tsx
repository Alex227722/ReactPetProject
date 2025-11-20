import React from 'react';
import { useGlobalContext } from '../GlobalContext';
import { fontStyles } from '../components/fontStyles';
import ProductCard from '../components/ProductCard';

function LikePage() {
  const { favoritesList, removeFromFavorites } = useGlobalContext();

  // Фільтруємо fontStyles, щоб отримати тільки ті шрифти, які є в favoritesList
  const favoriteItems = fontStyles.filter((font) =>
    favoritesList.includes(font.id)
  );

  // Функція для очищення списку улюблених
  const clearFavoritesList = () => {
    favoritesList.forEach((id) => removeFromFavorites(id));
  };

  return (
    <section id="like">
      <div className="container">
        <h2>Улюблене</h2>
        {favoriteItems.length === 0 ? (
          <p>Немає улюблених товарів</p>
        ) : (
          <>
            <button className="clear-button" onClick={clearFavoritesList}>
              Очистити список улюблених
            </button>
            <div className="product-card-list">
              {favoriteItems.map((font) => (
                <ProductCard
                  key={font.id}
                  productId={font.id}
                  name={font.name}
                  variant={font.variant}
                  previewImg={font.previewImg}
                  showActions="favorites"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default LikePage;