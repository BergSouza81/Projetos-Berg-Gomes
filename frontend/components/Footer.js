import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <h3 className="text-xl font-bold text-primary-600 mb-4">BeautyCosmetics</h3>
            <p className="text-gray-600 mb-4">
              Cosméticos de alta qualidade para realçar sua beleza natural.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos" className="text-gray-600 hover:text-primary-600">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-600 hover:text-primary-600">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-gray-600 hover:text-primary-600">
                  Ofertas Especiais
                </Link>
              </li>
              <li>
                <Link href="/novidades" className="text-gray-600 hover:text-primary-600">
                  Novidades
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Informações */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-primary-600">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary-600">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-600 hover:text-primary-600">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-condicoes" className="text-gray-600 hover:text-primary-600">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Atendimento */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <strong>Email:</strong> contato@beautycosmetics.com
              </li>
              <li className="text-gray-600">
                <strong>Telefone:</strong> (11) 9999-9999
              </li>
              <li className="text-gray-600">
                <strong>Horário:</strong> Seg-Sex, 9h às 18h
              </li>
              <li>
                <Link href="/suporte" className="text-primary-600 hover:underline">
                  Central de Suporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} BeautyCosmetics. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;