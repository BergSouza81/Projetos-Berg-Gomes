import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FiSend, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como posso ajudar você hoje?', sender: 'agent', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Simular resposta do atendente
  const simulateResponse = (userMessage) => {
    setIsTyping(true);
    
    // Respostas automáticas baseadas em palavras-chave
    let response = '';
    const lowerCaseMessage = userMessage.toLowerCase();
    
    setTimeout(() => {
      if (lowerCaseMessage.includes('entrega') || lowerCaseMessage.includes('prazo')) {
        response = 'Nosso prazo de entrega é de 2-7 dias úteis, dependendo da sua localização. Você pode acompanhar seu pedido na seção "Meus Pedidos".';
      } else if (lowerCaseMessage.includes('troca') || lowerCaseMessage.includes('devolução')) {
        response = 'Para solicitar uma troca ou devolução, acesse a seção "Meus Pedidos" e selecione a opção "Solicitar Troca/Devolução". Você tem até 7 dias após o recebimento para fazer essa solicitação.';
      } else if (lowerCaseMessage.includes('pagamento') || lowerCaseMessage.includes('pagar')) {
        response = 'Aceitamos diversas formas de pagamento: cartão de crédito, boleto bancário, PIX e transferência bancária.';
      } else if (lowerCaseMessage.includes('produto') || lowerCaseMessage.includes('qualidade')) {
        response = 'Todos os nossos produtos são de alta qualidade e passam por rigorosos testes antes de chegarem até você. Se tiver algum problema específico, por favor, nos informe para que possamos ajudar.';
      } else {
        response = 'Obrigado pelo seu contato. Um de nossos atendentes irá analisar sua mensagem e retornar em breve. Você também pode ligar para (11) 9999-9999 para um atendimento mais rápido.';
      }
      
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: response,
        sender: 'agent',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simular resposta após o envio da mensagem do usuário
    simulateResponse(newMessage);
  };

  // Rolar para a mensagem mais recente quando as mensagens são atualizadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Formatar timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Head>
        <title>Chat de Suporte | BeautyCosmetics</title>
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
            {/* Cabeçalho do Chat */}
            <div className="bg-primary-600 text-white p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 mr-3">
                  <FiUser size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Atendimento BeautyCosmetics</h2>
                  <p className="text-xs text-primary-100">Online - Tempo médio de resposta: 5 min</p>
                </div>
              </div>
            </div>
            
            {/* Área de Mensagens */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-primary-600 text-white rounded-br-none' 
                        : 'bg-white shadow rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p 
                      className={`text-xs mt-1 text-right ${
                        message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white shadow rounded-lg rounded-bl-none p-3 max-w-xs md:max-w-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Formulário de Envio */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..." 
                  className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  <FiSend />
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>
              Horário de atendimento: Segunda a Sexta, das 9h às 18h. 
              Fora desse horário, suas mensagens serão respondidas no próximo dia útil.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;