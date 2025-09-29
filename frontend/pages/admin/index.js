import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaChartLine, FaCommentDots } from 'react-icons/fa';
import Head from 'next/head';

// Componente de Sidebar para o Admin
const AdminSidebar = ({ active }) => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">Admin Panel</div>
      <nav>
        <Link href="/admin">
          <a className={`flex items-center p-3 mb-2 rounded ${active === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FaChartLine className="mr-3" /> Dashboard
          </a>
        </Link>
        <Link href="/admin/produtos">
          <a className={`flex items-center p-3 mb-2 rounded ${active === 'produtos' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FaBoxOpen className="mr-3" /> Produtos
          </a>
        </Link>
        <Link href="/admin/pedidos">
          <a className={`flex items-center p-3 mb-2 rounded ${active === 'pedidos' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FaShoppingCart className="mr-3" /> Pedidos
          </a>
        </Link>
        <Link href="/admin/clientes">
          <a className={`flex items-center p-3 mb-2 rounded ${active === 'clientes' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FaUsers className="mr-3" /> Clientes
          </a>
        </Link>
        <Link href="/admin/suporte">
          <a className={`flex items-center p-3 mb-2 rounded ${active === 'suporte' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FaCommentDots className="mr-3" /> Suporte
          </a>
        </Link>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Link href="/">
          <a className="block text-center py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            Voltar para Loja
          </a>
        </Link>
      </div>
    </div>
  );
};

// Página principal do Admin
const AdminDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 15750.85,
    totalOrders: 124,
    totalCustomers: 89,
    totalProducts: 57
  });
  const [recentOrders, setRecentOrders] = useState([
    { id: 'PED-1234', customer: 'Maria Silva', date: '15/05/2023', total: 189.90, status: 'Completo' },
    { id: 'PED-1235', customer: 'João Santos', date: '14/05/2023', total: 245.50, status: 'Pendente' },
    { id: 'PED-1236', customer: 'Ana Oliveira', date: '14/05/2023', total: 78.90, status: 'Processando' },
    { id: 'PED-1237', customer: 'Carlos Ferreira', date: '13/05/2023', total: 312.75, status: 'Completo' },
    { id: 'PED-1238', customer: 'Juliana Costa', date: '12/05/2023', total: 156.40, status: 'Cancelado' }
  ]);

  useEffect(() => {
    // Verificar autenticação (simplificado para desenvolvimento)
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.push('/login?redirect=/admin');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Painel Administrativo | Cosméticos E-commerce</title>
      </Head>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar active="dashboard" />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-indigo-100 mr-4">
                  <FaChartLine className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Vendas Totais</h3>
                  <p className="text-2xl font-bold">R$ {stats.totalSales.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-gray-100 mr-4">
                  <FaShoppingCart className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Total de Pedidos</h3>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-green-100 mr-4">
                  <FaUsers className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Clientes</h3>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-red-100 mr-4">
                  <FaBoxOpen className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Produtos</h3>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pedidos Recentes */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Pedidos Recentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Cliente</th>
                    <th className="py-3 px-6 text-left">Data</th>
                    <th className="py-3 px-6 text-left">Valor</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6">{order.id}</td>
                      <td className="py-3 px-6">{order.customer}</td>
                      <td className="py-3 px-6">{order.date}</td>
                      <td className="py-3 px-6">R$ {order.total.toFixed(2)}</td>
                      <td className="py-3 px-6">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          order.status === 'Completo' ? 'bg-green-200 text-green-800' :
                          order.status === 'Pendente' ? 'bg-yellow-200 text-yellow-800' :
                          order.status === 'Processando' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <Link href={`/admin/pedidos/${order.id}`}>
                          <a className="text-blue-600 hover:text-blue-900">Ver detalhes</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <Link href="/admin/produtos/novo">
                  <a className="block w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
                    Adicionar Produto
                  </a>
                </Link>
                <Link href="/admin/pedidos">
                  <a className="block w-full py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 text-center">
                    Ver Todos os Pedidos
                  </a>
                </Link>
                <Link href="/admin/suporte">
                  <a className="block w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 text-center">
                    Verificar Tickets de Suporte
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h3 className="font-bold text-lg mb-4">Resumo de Vendas</h3>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-gray-500">Hoje</p>
                  <p className="text-xl font-bold">R$ 1.250,00</p>
                </div>
                <div>
                  <p className="text-gray-500">Esta Semana</p>
                  <p className="text-xl font-bold">R$ 5.840,75</p>
                </div>
                <div>
                  <p className="text-gray-500">Este Mês</p>
                  <p className="text-xl font-bold">R$ 15.750,85</p>
                </div>
              </div>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Gráfico de vendas (simulado)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Definir displayName para identificação no _app.js
AdminDashboard.displayName = 'AdminPage';

export default AdminDashboard;