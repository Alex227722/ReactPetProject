import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ButtonTop from './components/ButtonTop';
import MusicButton from './components/MusicButton';
import JokeButton from './components/JokeButton';
import CartModal from './CartModal';
import ActionModal from './components/ActionModal';
import AuthModal from './components/AuthModal';
import { useGlobalContext } from './GlobalContext';

function Layout() {
  const {
    headerHeight,
    setHeaderHeight,
    activeModal,
    setActiveModal,
    actionMessage,
  } = useGlobalContext();

  useEffect(() => {
    if (activeModal === null) {
      document.body.classList.remove('ReactModal__Body--open');
    }
  }, [activeModal]);

 
    return (
      <>
       
          <Header setHeaderHeight={setHeaderHeight} />
          <main className="bg-main">
            <Outlet />
            <JokeButton />
          </main>
          <ButtonTop />
          <MusicButton />
          <Footer />

          {activeModal === 'cart' && <CartModal />}
          {activeModal === 'auth' && <AuthModal />}
          {activeModal === 'action' && (
            <ActionModal
              isOpen={true}
              message={actionMessage}
              onClose={() => setActiveModal(null)}
            />
          )}
      
      </>
    );
  }

export default Layout;