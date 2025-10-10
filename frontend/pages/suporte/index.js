import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiMessageSquare, FiHelpCircle, FiFileText, FiPhone } from 'react-icons/fi';

const SupportPage = () => {
  return (
    <>
      <Head>
        <title>Central de Suporte | BeautyCosmetics</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Central de Suporte</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Estamos aqui para ajudar você com qualquer dúvida ou problema. Escolha uma das opções abaixo para receber assistência.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Chat ao Vivo */}
          <Link href="/suporte/chat" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiMessageSquare className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat ao Vivo</h3>
              <p className="text-gray-600 mb-4">
                Converse em tempo real com nossa equipe de atendimento.
              </p>
              <span className="text-primary-600 font-medium">Iniciar Chat</span>
            </div>
          </Link>
          
          {/* FAQ */}
          <Link href="/suporte/faq" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiHelpCircle className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Perguntas Frequentes</h3>
              <p className="text-gray-600 mb-4">
                Encontre respostas para as dúvidas mais comuns.
              </p>
              <span className="text-primary-600 font-medium">Ver FAQ</span>
            </div>
          </Link>
          
          {/* Tickets de Suporte */}
          <Link href="/suporte/tickets" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiFileText className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tickets de Suporte</h3>
              <p className="text-gray-600 mb-4">
                Abra um ticket para problemas mais complexos.
              </p>
              <span className="text-primary-600 font-medium">Abrir Ticket</span>
            </div>
          </Link>
          
          {/* Contato */}
          <Link href="/suporte/contato" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiPhone className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Contato Direto</h3>
              <p className="text-gray-600 mb-4">
                Entre em contato por telefone ou email.
              </p>
              <span className="text-primary-600 font-medium">Ver Contatos</span>
            </div>
          </Link>
        </div>
        
        {/* Perguntas Frequentes em Destaque */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">Como rastrear meu pedido?</h3>
              <p className="text-gray-600">
                Você pode rastrear seu pedido acessando a seção "Meus Pedidos" na sua conta. Lá você encontrará o código de rastreio e um link direto para acompanhar a entrega.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">Qual é o prazo de entrega?</h3>
              <p className="text-gray-600">
                O prazo de entrega varia de acordo com a sua localização. Geralmente, entregamos em capitais e regiões metropolitanas em 2-3 dias úteis, e para outras localidades em 3-7 dias úteis após a confirmação do pagamento.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">Como solicitar uma troca ou devolução?</h3>
              <p className="text-gray-600">
                Para solicitar uma troca ou devolução, acesse a seção "Meus Pedidos", selecione o pedido em questão e clique em "Solicitar Troca/Devolução". Você terá até 7 dias após o recebimento para realizar esta solicitação.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/suporte/faq" className="btn-outline">
              Ver Todas as Perguntas
            </Link>
          </div>
        </div>
        
        {/* Contato Direto */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ainda precisa de ajuda?</h2>
            <p className="text-gray-600 text-center mb-8">
              Nossa equipe de atendimento está disponível para ajudar você de segunda a sexta, das 9h às 18h.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-primary-600">suporte@beautycosmetics.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-primary-600">(11) 9999-9999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;