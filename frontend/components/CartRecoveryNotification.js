import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import { FiShoppingCart, FiX } from 'react-icons/fi';

const CartRecoveryNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { cart } = useContext(CartContext);
  
  if (!isVisible || cart.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6 rounded-md flex items-center justify-between">
      <div className="flex items-center">
        <FiShoppingCart className="text-primary-600 mr-3" size={20} />
        <div>
          <p className="font-medium text-primary-800">
            Recuperamos seu carrinho de compras!
          </p>
          <p className="text-sm text-primary-700">
            Você tem {cart.length} {cart.length === 1 ? 'item' : 'itens'} no seu carrinho.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/carrinho" className="btn-primary text-sm py-1 px-3">
          Ver Carrinho
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartRecoveryNotification;