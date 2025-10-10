import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Carrinho Vazio | BeautyCosmetics</title>
        </Head>
        <div className="text-center py-16">
          <FiShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-600 mb-8">Parece que você ainda não adicionou nenhum produto ao carrinho.</p>
          <Link href="/produtos" className="btn-primary inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Continuar Comprando
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Carrinho de Compras | BeautyCosmetics</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Carrinho de Compras</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de Produtos */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Produtos</h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                  >
                    <FiTrash2 className="mr-1" />
                    Limpar Carrinho
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row items-center">
                    <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="sm:ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <span className="font-bold text-primary-600 mr-4">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/produtos" className="text-primary-600 hover:underline flex items-center">
                <FiArrowLeft className="mr-2" />
                Continuar Comprando
              </Link>
            </div>
          </div>
          
          {/* Resumo do Pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span>R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="btn-primary w-full text-center block">
                Finalizar Compra
              </Link>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>Ao finalizar sua compra, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
              </div>
            </div>
            
            {/* Cupom de Desconto */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h3 className="text-md font-semibold mb-3">Cupom de Desconto</h3>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Digite seu cupom" 
                  className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-r-md transition-colors">
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;