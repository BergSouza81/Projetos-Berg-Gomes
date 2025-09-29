# E-commerce de Cosméticos

Plataforma de e-commerce para venda de cosméticos de marca própria, com sistema completo de assistência pós-venda e recuperação de carrinho.

## 📋 Funcionalidades Implementadas

### Área do Cliente
- **Sistema de Autenticação**: Login, registro e recuperação de senha
- **Perfil do Usuário**: Gerenciamento de informações pessoais, pedidos e preferências
- **Catálogo de Produtos**: Listagem com filtros por categoria, preço e disponibilidade
- **Página de Produto**: Visualização detalhada com descrição, benefícios, ingredientes e instruções de uso
- **Carrinho de Compras**: Adição, remoção e atualização de produtos
- **Checkout**: Processo de pagamento com opções de cartão de crédito e PIX
- **Confirmação de Pedido**: Resumo da compra e status do pedido

### Painel Administrativo
- **Dashboard**: Visão geral de vendas, pedidos, clientes e produtos
- **Gerenciamento de Produtos**: Listagem, adição, edição e remoção de produtos
- **Gerenciamento de Pedidos**: Acompanhamento e atualização de status
- **Gerenciamento de Clientes**: Visualização de dados dos clientes

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Next.js, Tailwind CSS
- **Gerenciamento de Estado**: Context API
- **Estilização**: Tailwind CSS, React Icons
- **Formulários**: Validação nativa
- **Notificações**: React Toastify
- **Backend**: Node.js, Express (planejado)
- **Banco de Dados**: MongoDB (planejado)
- **Autenticação**: JWT (planejado)
- **Pagamentos**: API de pagamentos (a definir)

## 📦 Estrutura do Projeto

```
cosmeticos-ecommerce/
├── frontend/
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # Contextos para gerenciamento de estado
│   ├── pages/            # Páginas da aplicação
│   │   ├── admin/        # Páginas do painel administrativo
│   │   ├── perfil/       # Páginas de perfil do usuário
│   │   ├── produtos/     # Páginas de produtos
│   │   └── ...           # Outras páginas
│   ├── styles/           # Estilos globais
│   ├── next.config.js    # Configuração do Next.js
│   ├── package.json      # Dependências do projeto
│   └── tailwind.config.js # Configuração do Tailwind CSS
```

## 🔧 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cosmeticos-ecommerce.git
   cd cosmeticos-ecommerce
   ```

2. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

## 📱 Páginas Principais

### Área do Cliente
- **Login**: `/login`
- **Registro**: `/registro`
- **Perfil do Usuário**: `/perfil`
- **Listagem de Produtos**: `/produtos`
- **Detalhes do Produto**: `/produtos/[id]`
- **Checkout**: `/checkout`
- **Confirmação de Pedido**: `/pedido-confirmado`

### Painel Administrativo
- **Dashboard**: `/admin`
- **Gerenciamento de Produtos**: `/admin/produtos`
- **Adicionar Produto**: `/admin/produtos/novo`
- **Gerenciamento de Pedidos**: `/admin/pedidos`

## 🚧 Próximos Passos

- Integração com backend real
- Implementação de sistema de pagamento real
- Otimização de SEO
- Testes automatizados
- Implementação de PWA