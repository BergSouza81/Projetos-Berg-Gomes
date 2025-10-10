import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartRecovered, setIsCartRecovered] = useState(false);

  // Recuperar carrinho do cookie ao carregar a página
  useEffect(() => {
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        setIsCartRecovered(true);
      } catch (error) {
        console.error('Erro ao recuperar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no cookie sempre que for atualizado
  useEffect(() => {
    if (cart.length > 0) {
      Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Expira em 7 dias
    }
  }, [cart]);

  // Adicionar produto ao carrinho
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Atualizar quantidade se o produto já estiver no carrinho
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Adicionar novo produto ao carrinho
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    
    // Se o carrinho ficar vazio, remover o cookie
    if (cart.length === 1) {
      Cookies.remove('cart');
    }
  };

  // Atualizar quantidade de um produto no carrinho
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart([]);
    Cookies.remove('cart');
  };

  // Calcular total do carrinho
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcular quantidade total de itens no carrinho
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal, 
        getCartItemsCount,
        isCartRecovered
      }}
    >
      {children}
    </CartContext.Provider>
  );
};