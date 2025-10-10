import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiDollarSign, FiSettings, 
         FiLogOut, FiMenu, FiX, FiArrowLeft, FiUpload, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Categorias disponíveis
const categories = [
  'Cuidados Faciais',
  'Cabelos',
  'Proteção Solar',
  'Maquiagem',
  'Corpo',
  'Perfumaria'
];

const NewProductPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    ingredients: '',
    benefits: '',
    howToUse: '',
    images: []
  });
  
  // Verificar se o usuário está autenticado e é administrador
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=admin/produtos/novo');
      return;
    }
    
    // Simulação de verificação de admin
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);
  
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Verificando credenciais...</p>
      </div>
    );
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e) => {
    // Simulação de upload de imagem
    const files = Array.from(e.target.files);
    
    // Criar URLs temporárias para visualização
    const newImages = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };
  
  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };
  
  const validateForm = () => {
    const requiredFields = ['name', 'description', 'category', 'price', 'stock'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    
    if (formData.images.length === 0) {
      toast.error('Por favor, adicione pelo menos uma imagem do produto');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      toast.success('Produto adicionado com sucesso!');
      setLoading(false);
      router.push('/admin/produtos');
    }, 1500);
  };
  
  return (
    <>
      <Head>
        <title>Adicionar Produto | BeautyCosmetics</title>
      </Head>
      
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar para desktop */}
        <div className={`bg-primary-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
          <div className="flex items-center justify-between px-4">
            <div className="text-xl font-bold">BeautyCosmetics</div>
            <button className="md:hidden" onClick={toggleSidebar}>
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-10">
            <Link href="/admin" className="flex items-center py-2 px-4 text-white hover:bg-primary-700 rounded-md">
              <FiHome className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/admin/produtos" className="flex items-center mt-5 py-2 px-4 bg-primary-700 text-white rounded-md">
              <FiBox className="mr-3 h-5 w-5" />
              Produtos
            </Link>
            <Link href="/admin/pedidos" className="flex items-center mt-5 py-2 px-4 text-white hover:bg-primary-700 rounded-md">
              <FiShoppingCart className="mr-3 h-5 w-5" />
              Pedidos
            </Link>
            <Link href="/admin/clientes" className="flex items-center mt-5 py-2 px-4 text-white hover:bg-primary-700 rounded-md">
              <FiUsers className="mr-3 h-5 w-5" />
              Clientes
            </Link>
            <Link href="/admin/vendas" className="flex items-center mt-5 py-2 px-4 text-white hover:bg-primary-700 rounded-md">
              <FiDollarSign className="mr-3 h-5 w-5" />
              Vendas
            </Link>
            <Link href="/admin/configuracoes" className="flex items-center mt-5 py-2 px-4 text-white hover:bg-primary-700 rounded-md">
              <FiSettings className="mr-3 h-5 w-5" />
              Configurações
            </Link>
            
            <div className="border-t border-primary-700 my-7"></div>
            
            <button 
              onClick={() => {
                // Lógica de logout
                router.push('/');
              }}
              className="flex items-center mt-5 py-2 px-4 text-white hover:bg-primary-700 rounded-md w-full text-left"
            >
              <FiLogOut className="mr-3 h-5 w-5" />
              Sair
            </button>
          </nav>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden">
                  <FiMenu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 ml-4">Adicionar Novo Produto</h1>
              </div>
              
              <div className="flex items-center">
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <span className="text-gray-700">{user?.name || 'Admin'}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <div className="mb-6">
              <Link href="/admin/produtos" className="inline-flex items-center text-primary-600 hover:underline">
                <FiArrowLeft className="mr-2" />
                Voltar para Lista de Produtos
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações do Produto</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome do produto */}
                    <div className="md:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Produto *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Categoria */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Preço */}
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Preço (R$) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Estoque */}
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                        Estoque *
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Descrição */}
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição do Produto *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      ></textarea>
                    </div>
                    
                    {/* Benefícios */}
                    <div className="md:col-span-2">
                      <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                        Benefícios
                      </label>
                      <textarea
                        id="benefits"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    {/* Ingredientes */}
                    <div className="md:col-span-2">
                      <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredientes
                      </label>
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    {/* Modo de Uso */}
                    <div className="md:col-span-2">
                      <label htmlFor="howToUse" className="block text-sm font-medium text-gray-700 mb-1">
                        Modo de Uso
                      </label>
                      <textarea
                        id="howToUse"
                        name="howToUse"
                        value={formData.howToUse}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    {/* Upload de imagens */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagens do Produto *
                      </label>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        {formData.images.map((image) => (
                          <div key={image.id} className="relative w-24 h-24 border rounded-md overflow-hidden">
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FiTrash className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        
                        <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                          <FiUpload className="h-6 w-6 text-gray-400" />
                          <span className="mt-2 text-xs text-gray-500">Adicionar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            multiple
                          />
                        </label>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <Link href="/admin/produtos" className="btn-outline mr-3">
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? 'Salvando...' : 'Salvar Produto'}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default NewProductPage;