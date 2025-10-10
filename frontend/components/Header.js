import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useContext(CartContext);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            BeautyCosmetics
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/produtos" className="text-gray-700 hover:text-primary-600 transition-colors">
              Produtos
            </Link>
            <Link href="/categorias" className="text-gray-700 hover:text-primary-600 transition-colors">
              Categorias
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contato
            </Link>
          </nav>
          
          {/* Search, Cart and User Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 transition-colors">
              <FiSearch size={20} />
            </button>
            <Link href="/carrinho" className="text-gray-700 hover:text-primary-600 transition-colors relative">
              <FiShoppingCart size={20} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            <Link href="/conta" className="text-gray-700 hover:text-primary-600 transition-colors">
              <FiUser size={20} />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;