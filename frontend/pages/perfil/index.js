import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const renderProfileInfo = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="btn-primary"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
          >
            <FiEdit className="mr-1" /> Editar
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
            </div>
            
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.phone || 'Não informado'}
              </dd>
            </div>
            
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Endereço</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.address || 'Não informado'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    // Simulação de pedidos
    const orders = [
      { id: '1001', date: '15/05/2023', status: 'Entregue', total: 'R$ 189,90' },
      { id: '1002', date: '28/06/2023', status: 'Em processamento', total: 'R$ 245,50' }
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Meus Pedidos</h3>
        
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Entregue' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/perfil/pedidos/${order.id}`} className="text-primary-600 hover:text-primary-900">
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Você ainda não realizou nenhum pedido.</p>
            <Link href="/produtos" className="mt-4 inline-block btn-primary">
              Explorar produtos
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderWishlist = () => {
    // Simulação de lista de desejos vazia
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Minha Lista de Desejos</h3>
        
        <div className="text-center py-8">
          <p className="text-gray-500">Sua lista de desejos está vazia.</p>
          <Link href="/produtos" className="mt-4 inline-block btn-primary">
            Explorar produtos
          </Link>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Configurações da Conta</h3>
        
        <div className="space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Preferências de Email</h4>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                  <p className="text-gray-500">Receba novidades e promoções exclusivas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="order_updates"
                    name="order_updates"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="order_updates" className="font-medium text-gray-700">Atualizações de pedidos</label>
                  <p className="text-gray-500">Receba notificações sobre seus pedidos</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Segurança</h4>
            <button className="btn-outline">
              Alterar senha
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Excluir conta</h4>
            <p className="text-sm text-gray-500 mb-3">
              Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm">
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Meu Perfil | BeautyCosmetics</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'info' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FiUser className="mr-3 h-5 w-5" />
                    Informações Pessoais
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'orders' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FiShoppingBag className="mr-3 h-5 w-5" />
                    Meus Pedidos
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'wishlist' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FiHeart className="mr-3 h-5 w-5" />
                    Lista de Desejos
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'settings' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FiSettings className="mr-3 h-5 w-5" />
                    Configurações
                  </button>
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut className="mr-3 h-5 w-5" />
                    Sair
                  </button>
                </nav>
              </div>
              
              {/* Main content */}
              <div className="flex-1 p-6">
                {activeTab === 'info' && renderProfileInfo()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'wishlist' && renderWishlist()}
                {activeTab === 'settings' && renderSettings()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;