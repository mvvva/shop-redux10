import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cart);

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCloseCart = () => {
    navigate('/context-provider'); 
  };

  if (items.length === 0) {
    return navigate('/context-provider'); 
  }

  return (
    <div className="cart-container mt-20">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-actions">
          <button onClick={handleClearCart} className="cart-action-btn">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button onClick={handleCloseCart} className="cart-action-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image_url} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">{item.price}$</p>
              <div className="cart-item-controls">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                  disabled={item.quantity <= 1}
                  className="quantity-btn"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="remove-item-btn"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
