import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cart);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isClearCart, setIsClearCart] = useState(false);

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setIsModalOpen(true);
    setIsClearCart(false);
  };

  const handleClearCartClick = () => {
    setIsModalOpen(true);
    setIsClearCart(true);
  };

  const handleConfirmRemove = () => {
    if (isClearCart) {
      dispatch(clearCart());
    } else {
      dispatch(removeItem({ id: itemToRemove }));
    }
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity }));
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
          <button onClick={handleClearCartClick} className="cart-action-btn">
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
              <p className="cart-item-price">{item.price * item.quantity}$</p>
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
                  onClick={() => handleRemoveClick(item.id)}
                  className="remove-item-btn"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleConfirmRemove} 
        onCancel={handleCancelRemove} 
        message={isClearCart ? "Are you sure you want to clear the entire cart?" : "Are you sure you want to delete this item?"}
      />
    </div>
  );
}

export default Cart;
