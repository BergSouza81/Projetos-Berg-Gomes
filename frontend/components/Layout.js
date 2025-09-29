import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartRecoveryNotification from './CartRecoveryNotification';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Layout = ({ children }) => {
  const { isCartRecovered, cart } = useContext(CartContext);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isCartRecovered && cart.length > 0 && <CartRecoveryNotification />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;