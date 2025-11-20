import React from 'react';
import { useGlobalContext } from '../GlobalContext';

type ProductActionsProps = {
  productId: string;
  name: string;
  variant: string;
  previewImg: string;
  showActions?: 'comparison' | 'favorites' | 'both';
};

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  name,
  variant,
  previewImg,
  showActions = 'both',
}) => {
  const {
    addToComparison,
    removeFromComparison,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    removeFromCart,
    comparisonList,
    favoritesList,
    cartItems,
    openActionModal,
  } = useGlobalContext();

  const isInComparison = comparisonList.includes(productId);
  const isInFavorites = favoritesList.includes(productId);
  const isInCart = cartItems.some((item) => item.id === productId);

  const handleComparisonClick = () => {
    if (isInComparison) {
      removeFromComparison(productId);
      openActionModal('Успішно видалено з порівняння');
    } else {
      addToComparison(productId);
      openActionModal('Успішно додано до порівняння');
    }
  };

  const handleFavoritesClick = () => {
    if (isInFavorites) {
      removeFromFavorites(productId);
      openActionModal('Успішно видалено з улюблених');
    } else {
      addToFavorites(productId);
      openActionModal('Успішно додано до улюблених');
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(productId);
      openActionModal('Успішно видалено з кошика');
    } else {
      addToCart({ id: productId, name, variant, previewImg });
      openActionModal('Успішно додано до кошика');
    }
  };

  return (
    <div className="product-actions">
      {(showActions === 'comparison' || showActions === 'both') && (
        <button
          title={isInComparison ? 'Видалити з порівняння' : 'Додати до порівняння'}
          onClick={handleComparisonClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="7"
              height="18"
              fill={isInComparison ? '#28a745' : '#FF4A1C'}
              stroke={isInComparison ? '#28a745' : '#FF4A1C'}
              strokeWidth="2"
            />
            <rect
              x="14"
              y="8"
              width="7"
              height="13"
              fill={isInComparison ? '#28a745' : '#FF4A1C'}
              stroke={isInComparison ? '#28a745' : '#FF4A1C'}
              strokeWidth="2"
            />
          </svg>
        </button>
      )}
      {(showActions === 'favorites' || showActions === 'both') && (
        <button
          title={isInFavorites ? 'Видалити з улюблених' : 'Додати в улюблене'}
          onClick={handleFavoritesClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-6-4.35-9-8.5C-1 6 5-1 12 5c7-6 13 1 9 7.5C18 16.65 12 21 12 21z"
              stroke={isInFavorites ? '#28a745' : '#FF4A1C'}
              strokeWidth="2"
              fill={isInFavorites ? '#28a745' : 'none'}
            />
          </svg>
        </button>
      )}
      <button
        title={isInCart ? 'Видалити з кошика' : 'Додати в кошик'}
        onClick={handleCartClick}
        className="cart-button"
      >
        <svg width="18" height="18" viewBox="0 0 20 19" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0002 0.208313C7.56563 0.208313 5.55537 2.02372 5.24895 4.37498L4.6968 4.37498C3.86706 4.37495 3.17899 4.37493 2.63898 4.45038C2.07128 4.52971 1.56117 4.70485 1.17323 5.13828C0.785284 5.57172 0.667542 6.09805 0.651398 6.67104C0.63604 7.21608 0.712047 7.89994 0.803701 8.7246L1.06028 11.0338C1.25197 12.7591 1.40252 14.1141 1.65823 15.1673C1.92033 16.2468 2.31015 17.0893 3.03386 17.737C3.75826 18.3854 4.64283 18.6794 5.75065 18.8206C6.83227 18.9583 8.20572 18.9583 9.95558 18.9583H10.0448C11.7946 18.9583 13.1681 18.9583 14.2497 18.8206C15.3575 18.6794 16.2421 18.3854 16.9665 17.737C17.6902 17.0893 18.08 16.2468 18.3421 15.1673C18.5978 14.1141 18.7484 12.7591 18.9401 11.0338L19.1967 8.72458C19.2883 7.89995 19.3643 7.21607 19.349 6.67104C19.3328 6.09805 19.2151 5.57172 18.8271 5.13828C18.4392 4.70485 17.9291 4.52971 17.3614 4.45038C16.8214 4.37493 16.1333 4.37495 15.3036 4.37498L14.7514 4.37498C14.4451 2.02378 12.4347 0.208313 10.0002 0.208313ZM10.0002 1.45831C11.7429 1.45831 13.1918 2.71719 13.4869 4.37498H6.51343C6.80849 2.71724 8.25746 1.45831 10.0002 1.45831ZM2.10464 5.97194C2.21356 5.85024 2.3864 5.74782 2.81196 5.68836C3.25523 5.62642 3.85523 5.62498 4.74292 5.62498H15.2574C16.1451 5.62498 16.7451 5.62642 17.1884 5.68836C17.614 5.74782 17.7868 5.85024 17.8957 5.97194C18.0047 6.09363 18.0874 6.27673 18.0995 6.70625C18.1121 7.15365 18.0472 7.75013 17.9492 8.6324L17.7027 10.8512C17.505 12.6308 17.362 13.9061 17.1274 14.8724C16.897 15.8214 16.5956 16.3914 16.1329 16.8056C15.6708 17.2192 15.0682 17.4562 14.0918 17.5806C13.0983 17.7071 11.8044 17.7083 10.0002 17.7083C8.196 17.7083 6.9021 17.7071 5.9086 17.5806C4.93213 17.4562 4.32961 17.2192 3.86751 16.8056C3.40473 16.3914 3.10336 15.8214 2.87294 14.8724C2.63832 13.9061 2.49541 12.6308 2.29769 10.8512L2.05115 8.6324C1.95312 7.75014 1.8883 7.15365 1.9009 6.70625C1.913 6.27673 1.99571 6.09363 2.10464 5.97194Z"
            fill={isInCart ? '#28a745' : '#FF4A1C'}
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductActions;