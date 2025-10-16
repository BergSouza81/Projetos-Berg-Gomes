import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { portfolioService } from '../../services/api';

const PortfolioContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0 0 1rem 0;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
`;

const CardValue = styled.div`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
`;

const PositiveValue = styled.span`
  color: #27ae60;
`;

const NegativeValue = styled.span`
  color: #e74c3c;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  color: #2c3e50;
`;

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState({
    totalValue: 0,
    totalInvested: 0,
    totalReturn: 0,
    totalReturnPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dados simulados para demonstração
  const mockPortfolio = [
    { 
      asset_ticker: 'PETR4', 
      asset_name: 'Petrobras', 
      asset_type: 'STOCK',
      quantity: 150, 
      average_price: 29.75, 
      current_price: 32.10,
      total_invested: 4462.50,
      market_value: 4815.00,
      return_value: 352.50,
      return_percentage: 7.90
    },
    { 
      asset_ticker: 'VALE3', 
      asset_name: 'Vale', 
      asset_type: 'STOCK',
      quantity: 50, 
      average_price: 68.75, 
      current_price: 72.40,
      total_invested: 3437.50,
      market_value: 3620.00,
      return_value: 182.50,
      return_percentage: 5.31
    },
    { 
      asset_ticker: 'ITUB4', 
      asset_name: 'Itaú', 
      asset_type: 'STOCK',
      quantity: 200, 
      average_price: 32.40, 
      current_price: 30.85,
      total_invested: 6480.00,
      market_value: 6170.00,
      return_value: -310.00,
      return_percentage: -4.78
    }
  ];

  const mockSummary = {
    totalValue: 14605.00,
    totalInvested: 14380.00,
    totalReturn: 225.00,
    totalReturnPercentage: 1.56
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Integração com a API real
        // Descomente estas linhas quando o backend estiver pronto
        /*
        const portfolioData = await portfolioService.getPortfolio();
        const summaryData = await portfolioService.getSummary();
        setPortfolio(portfolioData);
        setSummary(summaryData);
        */
        
        // Usando dados simulados para demonstração
        setPortfolio(mockPortfolio);
        setSummary(mockSummary);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Erro ao carregar dados do portfólio');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PortfolioContainer>Carregando...</PortfolioContainer>;
  }

  if (error) {
    return <PortfolioContainer>{error}</PortfolioContainer>;
  }

  return (
    <PortfolioContainer>
      <Header>
        <Title>Meu Portfólio</Title>
      </Header>

      <Summary>
        <SummaryCard>
          <CardTitle>Valor Total</CardTitle>
          <CardValue>
            {summary.totalValue.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </CardValue>
        </SummaryCard>

        <SummaryCard>
          <CardTitle>Total Investido</CardTitle>
          <CardValue>
            {summary.totalInvested.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </CardValue>
        </SummaryCard>

        <SummaryCard>
          <CardTitle>Retorno Total</CardTitle>
          <CardValue>
            {summary.totalReturn >= 0 ? (
              <PositiveValue>
                {summary.totalReturn.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </PositiveValue>
            ) : (
              <NegativeValue>
                {summary.totalReturn.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </NegativeValue>
            )}
          </CardValue>
        </SummaryCard>

        <SummaryCard>
          <CardTitle>Retorno Percentual</CardTitle>
          <CardValue>
            {summary.totalReturnPercentage >= 0 ? (
              <PositiveValue>
                +{summary.totalReturnPercentage.toFixed(2)}%
              </PositiveValue>
            ) : (
              <NegativeValue>
                {summary.totalReturnPercentage.toFixed(2)}%
              </NegativeValue>
            )}
          </CardValue>
        </SummaryCard>
      </Summary>

      <Table>
        <thead>
          <tr>
            <Th>Ativo</Th>
            <Th>Tipo</Th>
            <Th>Quantidade</Th>
            <Th>Preço Médio</Th>
            <Th>Preço Atual</Th>
            <Th>Total Investido</Th>
            <Th>Valor de Mercado</Th>
            <Th>Retorno</Th>
            <Th>Retorno %</Th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item, index) => (
            <tr key={index}>
              <Td>{item.asset_ticker} - {item.asset_name}</Td>
              <Td>{item.asset_type === 'STOCK' ? 'Ação' : item.asset_type}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                {item.average_price.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </Td>
              <Td>
                {item.current_price.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </Td>
              <Td>
                {item.total_invested.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </Td>
              <Td>
                {item.market_value.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </Td>
              <Td>
                {item.return_value >= 0 ? (
                  <PositiveValue>
                    {item.return_value.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    })}
                  </PositiveValue>
                ) : (
                  <NegativeValue>
                    {item.return_value.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    })}
                  </NegativeValue>
                )}
              </Td>
              <Td>
                {item.return_percentage >= 0 ? (
                  <PositiveValue>+{item.return_percentage.toFixed(2)}%</PositiveValue>
                ) : (
                  <NegativeValue>{item.return_percentage.toFixed(2)}%</NegativeValue>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PortfolioContainer>
  );
};

export default Portfolio;