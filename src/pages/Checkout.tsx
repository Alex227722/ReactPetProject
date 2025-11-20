import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContext';

function Checkout() {
  const { cartItems, clearCart } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => { // ФІКС tsx
    e.preventDefault();
    alert(`✅ Замовлення оформлено!\n${formData.name}, чекайте дзвінка!`);
    clearCart(); 
    window.location.href = '/';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // ФІКС tsx
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="checkout">
      <div className="container">
        <h2>Оформлення замовлення</h2>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="margin-0">🛒 Кошик порожній</p>
            <RouterLink to="/" className="btn btn-primary">Додати товари</RouterLink>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="checkout-items">
              <h3>Ваші товари ({cartItems.length})</h3>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={`/assets/images/sliders/${item.previewImg}`}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-variant">{item.variant}</span>
                    </div>
                  </li>
                ))}
              </ul>
             <button className="btn btn-secondary width-100" onClick={clearCart}>
                Очистити кошик
              </button>
            </div>

            <div className="checkout-form">
              <h3>Дані для доставки</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="ПІБ *"
                  value={formData.name}
                  onChange={handleChange}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="name"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Місто"
                  value={formData.city}
                  onChange={handleChange}
                />
                <textarea
                  name="address"
                  placeholder="Адреса доставки"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                />
                <button type="submit" className="btn btn-success width-100">
                  Підтвердити замовлення
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;