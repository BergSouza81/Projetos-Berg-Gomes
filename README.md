# Plataforma Full Stack de Gestão de Investimentos Pessoais

Uma aplicação completa para gerenciar seus investimentos pessoais, com backend em Django e frontend em React.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: API RESTful desenvolvida com Django e Django REST Framework
- **Frontend**: Interface de usuário desenvolvida com React

## Requisitos

- Python 3.8+
- Node.js 14+
- npm ou yarn

## Configuração do Backend

1. Navegue até a pasta do backend:
```
cd backend
```

2. Crie e ative um ambiente virtual (opcional, mas recomendado):
```
python -m venv venv
# No Windows
venv\Scripts\activate
# No Linux/Mac
source venv/bin/activate
```

3. Instale as dependências:
```
pip install -r requirements.txt
```

4. Execute as migrações do banco de dados:
```
python manage.py migrate
```

5. Crie um superusuário para acessar o painel administrativo:
```
python manage.py createsuperuser
```

6. Inicie o servidor de desenvolvimento:
```
python manage.py runserver
```

O backend estará disponível em http://localhost:8000/

## Configuração do Frontend

1. Navegue até a pasta do frontend:
```
cd frontend
```

2. Instale as dependências:
```
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```
npm start
# ou
yarn start
```

O frontend estará disponível em http://localhost:3000/

## Funcionalidades

- **Autenticação**: Login e registro de usuários com JWT
- **Dashboard**: Visão geral do portfólio com gráficos e estatísticas
- **Ativos**: Gerenciamento de ativos financeiros
- **Transações**: Registro de compras e vendas de ativos
- **Portfólio**: Visualização detalhada do portfólio com cálculos de retorno

## API Endpoints

- `/api/token/`: Obter token JWT
- `/api/token/refresh/`: Renovar token JWT
- `/api/assets/`: Gerenciar ativos
- `/api/transactions/`: Gerenciar transações
- `/api/portfolio/`: Visualizar portfólio
- `/api/portfolio/summary/`: Obter resumo do portfólio

## Tecnologias Utilizadas

### Backend
- Django
- Django REST Framework
- Simple JWT
- SQLite (desenvolvimento) / PostgreSQL (produção)

### Frontend
- React
- React Router
- Axios
- Styled Components
- Recharts (gráficos)

## Próximos Passos

- Implementar cotações em tempo real
- Adicionar suporte a diferentes tipos de ativos (FIIs, Renda Fixa, etc.)
- Desenvolver relatórios de desempenho
- Implementar alertas de preço