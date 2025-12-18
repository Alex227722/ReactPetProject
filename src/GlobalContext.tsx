import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  variant: string;
  previewImg: string;
};

// 1 тип для модалок!
type ActiveModal = null | 'cart' | 'auth' | 'action';

type GlobalContextType = {
  // Header
  headerHeight: number;
  setHeaderHeight: (height: number) => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Comparison & Favorites
  comparisonList: string[];
  favoritesList: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;

  // 1 поле + 1 функція для ВСІХ модалок!
  activeModal: ActiveModal;
  setActiveModal: (modal: ActiveModal) => void;
  actionMessage: string;

  // Старий openActionModal (для зворотної сумісності)
  openActionModal: (message: string) => void;

  isNight: boolean;
  toggleNight: () => void;
};


const GlobalContext = createContext<GlobalContextType>({
  headerHeight: 0,
  setHeaderHeight: () => { },
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  comparisonList: [],
  favoritesList: [],
  addToComparison: () => { },
  removeFromComparison: () => { },
  addToFavorites: () => { },
  removeFromFavorites: () => { },
  activeModal: null,
  setActiveModal: () => { },
  actionMessage: '',
  openActionModal: () => { },
  isNight: false,
  toggleNight: () => { },
});



export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base states
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [isNight, setIsNight] = useState<boolean>(false);

  // 1 стан для ВСІХ модалок!
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedComparison = localStorage.getItem('comparisonList');
      if (savedComparison) setComparisonList(JSON.parse(savedComparison));

      const savedFavorites = localStorage.getItem('favoritesList');
      if (savedFavorites) setFavoritesList(JSON.parse(savedFavorites));
    } catch (e) {
      console.warn('Помилка завантаження з localStorage:', e);
    }
  }, []);  // ПУСТИЙ масив — тільки раз при монтуванні

  // Cart functions
  const addToCart = (product: CartItem) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    openActionModal('Кошик очищено');
  };

  // Comparison & Favorites
  const addToComparison = (productId: string) => {
    setComparisonList((prev) => [...prev, productId]);
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((id) => id !== productId));
  };

  const addToFavorites = (productId: string) => {
    setFavoritesList((prev) => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavoritesList((prev) => prev.filter((id) => id !== productId));
  };

  const toggleNight = () => {
    setIsNight(prev => !prev);
  };

  useEffect(() => {
    if (isNight) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isNight]);


  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const nightMode = savedTheme === 'night';
        setIsNight(nightMode);
      }
    } catch (error) {
      console.warn('Cannot load theme from localStorage:', error);
      setIsNight(false);
    }
  }, []);


  // Збереження кошика
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems'); // Якщо очистили — видаляємо ключ
    }
  }, [cartItems]);

  // Збереження порівняння
  useEffect(() => {
    if (comparisonList.length > 0) {
      localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
    } else {
      localStorage.removeItem('comparisonList');
    }
  }, [comparisonList]);

  // Збереження улюбленого
  useEffect(() => {
    if (favoritesList.length > 0) {
      localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
    } else {
      localStorage.removeItem('favoritesList');
    }
  }, [favoritesList]);

  // 1 функція для відкриття модалок!
  const openCartModal = () => setActiveModal('cart');
  const openAuthModal = () => setActiveModal('auth');

  const openActionModal = (message: string) => {
    setActionMessage(message);
    setActiveModal('action');
  };

  const closeModal = () => setActiveModal(null);

  return (
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        comparisonList,
        favoritesList,
        addToComparison,
        removeFromComparison,
        addToFavorites,
        removeFromFavorites,
        activeModal,
        setActiveModal,
        actionMessage,
        openActionModal,
        isNight,
        toggleNight,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContext.Provider');
  }
  return context;
};

export default GlobalContext;