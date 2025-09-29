import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

// Dados de exemplo para demonstração
const featuredProducts = [
  {
    id: 1,
    name: 'Hidratante Facial',
    price: 89.90,
    image: 'https://via.placeholder.com/300x300',
    category: 'Skincare',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Batom Matte',
    price: 45.90,
    image: 'https://via.placeholder.com/300x300',
    category: 'Maquiagem',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Sérum Vitamina C',
    price: 129.90,
    image: 'https://via.placeholder.com/300x300',
    category: 'Skincare',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Máscara de Cílios',
    price: 59.90,
    image: 'https://via.placeholder.com/300x300',
    category: 'Maquiagem',
    rating: 4.7,
  },
];

const categories = [
  { id: 1, name: 'Skincare', image: 'https://via.placeholder.com/200x200' },
  { id: 2, name: 'Maquiagem', image: 'https://via.placeholder.com/200x200' },
  { id: 3, name: 'Cabelos', image: 'https://via.placeholder.com/200x200' },
  { id: 4, name: 'Corpo & Banho', image: 'https://via.placeholder.com/200x200' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>BeautyCosmetics - Cosméticos de Qualidade</title>
        <meta name="description" content="Loja de cosméticos com produtos de alta qualidade para realçar sua beleza natural." />
      </Head>

      {/* Banner Principal */}
      <section className="relative">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-96 rounded-lg flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-4">Realce sua beleza natural</h1>
              <p className="text-white text-lg mb-6">
                Descubra nossa linha exclusiva de cosméticos desenvolvidos para valorizar sua beleza.
              </p>
              <Link href="/produtos" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors">
                Ver Produtos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categorias/${category.id}`} className="group">
                <div className="card overflow-hidden transition-transform group-hover:scale-105">
                  <div className="relative h-48">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Produtos em Destaque</h2>
            <Link href="/produtos" className="text-primary-600 hover:underline font-medium">
              Ver Todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="mt-16 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Por que escolher BeautyCosmetics?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos Naturais</h3>
              <p className="text-gray-600">Formulações com ingredientes naturais e sustentáveis, livres de parabenos e sulfatos.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Não Testamos em Animais</h3>
              <p className="text-gray-600">Comprometidos com a ética, todos os nossos produtos são cruelty-free.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Enviamos seu pedido em até 24 horas após a confirmação do pagamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary-600 rounded-lg py-10 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Inscreva-se em nossa newsletter</h2>
              <p className="text-primary-100 mb-6">Receba novidades, dicas de beleza e ofertas exclusivas diretamente no seu email.</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Seu melhor email" 
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}