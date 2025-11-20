import { createContext, useContext, useState } from 'react';

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
};

const GlobalContext = createContext<GlobalContextType>({
  headerHeight: 0,
  setHeaderHeight: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  comparisonList: [],
  favoritesList: [],
  addToComparison: () => {},
  removeFromComparison: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  activeModal: null,
  setActiveModal: () => {},
  actionMessage: '',
  openActionModal: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base states
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  
  // 1 стан для ВСІХ модалок!
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [actionMessage, setActionMessage] = useState('');

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