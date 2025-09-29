import React, { useContext } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };
  
  return (
    <div className="card group">
      <Link href={`/produtos/${product.id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-primary-600">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <FiStar className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="font-bold text-lg text-primary-600 mb-3">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
          <button 
            onClick={handleAddToCart}
            className="w-full btn-primary flex items-center justify-center"
          >
            <FiShoppingCart className="mr-2" />
            Adicionar
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;