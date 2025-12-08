import React from 'react';
import Modal from 'react-modal';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';

const CartModal: React.FC = () => {
 const { cartItems, removeFromCart, activeModal, setActiveModal } = useGlobalContext();
 const closeModal = () => setActiveModal(null);

  return (
    <Modal
      isOpen={activeModal === 'cart'}                               
      onRequestClose={closeModal}
      className={{
        base: 'cart-popup',
        afterOpen: 'cart-popup--after-open',
        beforeClose: 'cart-popup--before-close',
      }}
      overlayClassName={{
        base: 'cart-overlay',
        afterOpen: 'cart-overlay--after-open',
        beforeClose: 'cart-overlay--before-close',
      }}
      closeTimeoutMS={300}
      aria={{
        labelledby: 'cart-title',
        describedby: 'cart-content',
      }}
    >
      <div id="cart-content">
        <div className="cart-top">
          <h2 id="cart-title">Кошик</h2>
          <button className="cart-close" onClick={closeModal}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M13.2754 1.60863C13.5195 1.36455 13.5195 0.968823 13.2754 0.724745C13.0313 0.480668 12.6356 0.480668 12.3915 0.724745L7.00009 6.11615L1.60869 0.724748C1.36461 0.48067 0.968884 0.48067 0.724806 0.724748C0.480729 0.968825 0.480729 1.36455 0.724806 1.60863L6.11621 7.00003L0.724829 12.3914C0.480751 12.6355 0.480751 13.0312 0.724829 13.2753C0.968906 13.5194 1.36463 13.5194 1.60871 13.2753L7.00009 7.88392L12.3915 13.2753C12.6355 13.5194 13.0313 13.5194 13.2754 13.2753C13.5194 13.0312 13.5194 12.6355 13.2754 12.3914L7.88397 7.00003L13.2754 1.60863Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="margin-0">Кошик порожній</p>
        ) : (
          <>
            <p>У кошику {cartItems.length} товар(ів)</p>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/sliders/${item.previewImg}`}
                    alt={`${item.name} ${item.variant}`}
                    className="cart-item-img"
                    onError={(e) => (e.currentTarget.src = '/assets/images/placeholder.png')}
                  />
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-variant">{item.variant}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="cart-item-remove">
                    <div className="cart-close-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M13.2754 1.60863C13.5195 1.36455 13.5195 0.968823 13.2754 0.724745C13.0313 0.480668 12.6356 0.480668 12.3915 0.724745L7.00009 6.11615L1.60869 0.724748C1.36461 0.48067 0.968884 0.48067 0.724806 0.724748C0.480729 0.968825 0.480729 1.36455 0.724806 1.60863L6.11621 7.00003L0.724829 12.3914C0.480751 12.6355 0.480751 13.0312 0.724829 13.2753C0.968906 13.5194 1.36463 13.5194 1.60871 13.2753L7.00009 7.88392L12.3915 13.2753C12.6355 13.5194 13.0313 13.5194 13.2754 13.2753C13.5194 13.0312 13.5194 12.6355 13.2754 12.3914L7.88397 7.00003L13.2754 1.60863Z"
                          fill="#ff4a1c"
                        />
                      </svg>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <RouterLink to="/checkout" className="btn btn-primary width-100" onClick={closeModal}>
                Оформити замовлення
            </RouterLink>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;