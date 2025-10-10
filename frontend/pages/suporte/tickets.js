import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft, FiSend } from 'react-icons/fi';

const TicketPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: '',
    category: 'pedido',
    message: '',
    attachments: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para enviar o ticket para o backend
    console.log('Ticket enviado:', formData);
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Ticket Enviado | BeautyCosmetics</title>
        </Head>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link href="/suporte" className="inline-flex items-center text-primary-600 hover:underline">
                <FiArrowLeft className="mr-2" />
                Voltar para Central de Suporte
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Ticket Enviado com Sucesso!</h1>
              <p className="text-gray-600 mb-6">
                Recebemos seu ticket e responderemos o mais breve possível. 
                Um email de confirmação foi enviado para {formData.email}.
              </p>
              <p className="text-gray-600 mb-6">
                <strong>Número do Ticket:</strong> #{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/suporte" className="btn-primary">
                  Voltar para Suporte
                </Link>
                <Link href="/" className="btn-outline">
                  Ir para Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>Abrir Ticket de Suporte | BeautyCosmetics</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/suporte" className="inline-flex items-center text-primary-600 hover:underline">
              <FiArrowLeft className="mr-2" />
              Voltar para Central de Suporte
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary-600 text-white p-4">
              <h1 className="text-xl font-semibold">Abrir Ticket de Suporte</h1>
              <p className="text-sm text-primary-100">
                Preencha o formulário abaixo para enviar sua solicitação
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Pedido (se aplicável)
                  </label>
                  <input 
                    type="text" 
                    id="orderNumber" 
                    name="orderNumber" 
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select 
                    id="category" 
                    name="category" 
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="pedido">Pedido</option>
                    <option value="produto">Produto</option>
                    <option value="entrega">Entrega</option>
                    <option value="pagamento">Pagamento</option>
                    <option value="troca">Troca/Devolução</option>
                    <option value="conta">Conta</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto *
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">
                  Anexos (opcional)
                </label>
                <input 
                  type="file" 
                  id="attachments" 
                  name="attachments" 
                  onChange={handleFileChange}
                  multiple
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Você pode anexar até 3 arquivos (máx. 5MB cada). Formatos aceitos: JPG, PNG, PDF.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn-primary flex items-center"
                >
                  <FiSend className="mr-2" />
                  Enviar Ticket
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3">Tempo de Resposta</h2>
            <p className="text-gray-600">
              Nossa equipe responde a maioria dos tickets em até 24 horas úteis. 
              Para assuntos urgentes, recomendamos utilizar nosso chat ao vivo durante o horário comercial.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketPage;