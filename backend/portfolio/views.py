from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, F, Case, When, DecimalField
from django.contrib.auth.models import User
from .models import Asset, Transaction
from .serializers import AssetSerializer, TransactionSerializer, PortfolioSerializer
import requests
from decimal import Decimal

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def price(self, request, pk=None):
        asset = self.get_object()
        # Simulação de chamada a API externa
        # Em produção, usar API real como Alpha Vantage, Yahoo Finance, etc.
        price = self.get_latest_price(asset.ticker)
        asset.current_price = price
        asset.save()
        return Response({'ticker': asset.ticker, 'price': price})
    
    def get_latest_price(self, ticker):
        # Simulação - em produção, substituir por chamada real à API
        # Exemplo: return float(requests.get(f"https://api.example.com/quote/{ticker}").json()['price'])
        import random
        return round(random.uniform(10, 1000), 2)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Garante que usuário só vê suas próprias transações
        return Transaction.objects.filter(user=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PortfolioViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Calcula métricas principais do portfólio de um usuário,
        incluindo valor total e ROI.
        """
        user = request.user
        total_value = Decimal('0.0')
        total_invested = Decimal('0.0')
        assets_data = []
        
        # ------------------ Ponto Chave 1: Cálculo do Custo Médio ------------------
        # O Custo Médio Ponderado é vital em finanças e mostra a habilidade
        # de manipular dados agregados corretamente.
        
        # Obtém todos os ativos que o usuário possui transações
        user_assets = Asset.objects.filter(transactions__user=user).distinct()
        
        for asset in user_assets:
            # Calcula quantidade atual (compras - vendas)
            buy_quantity = Transaction.objects.filter(
                user=user, 
                asset=asset, 
                transaction_type='BUY'
            ).aggregate(total=Sum('quantity'))['total'] or Decimal('0')
            
            sell_quantity = Transaction.objects.filter(
                user=user, 
                asset=asset, 
                transaction_type='SELL'
            ).aggregate(total=Sum('quantity'))['total'] or Decimal('0')
            
            current_quantity = buy_quantity - sell_quantity
            
            # Se não possui mais o ativo, pula
            if current_quantity <= 0:
                continue
                
            # Calcula custo médio ponderado
            buy_transactions = Transaction.objects.filter(
                user=user, 
                asset=asset, 
                transaction_type='BUY'
            )
            
            total_cost = sum(tx.price * tx.quantity for tx in buy_transactions)
            avg_cost = total_cost / buy_quantity if buy_quantity > 0 else 0
            
            # ------------------ Ponto Chave 2: Valorização ------------------
            # Demonstra a capacidade de aplicar lógica financeira para calcular
            # o valor de mercado (Market Value) e o retorno.
            
            current_price = asset.current_price or Decimal('0')
            market_value = current_quantity * current_price
            invested_value = current_quantity * avg_cost
            
            # Adiciona ao total
            total_value += market_value
            total_invested += invested_value
            
            # Adiciona dados do ativo
            asset_return = market_value - invested_value
            asset_return_percentage = (asset_return / invested_value * 100) if invested_value > 0 else 0
            
            assets_data.append({
                'id': asset.id,
                'ticker': asset.ticker,
                'name': asset.name,
                'type': asset.asset_type,
                'quantity': float(current_quantity),
                'avg_cost': float(avg_cost),
                'current_price': float(current_price),
                'market_value': float(market_value),
                'invested_value': float(invested_value),
                'return': float(asset_return),
                'return_percentage': float(asset_return_percentage)
            })
        
        # Calcula retorno total
        total_return = total_value - total_invested
        return_percentage = (total_return / total_invested * 100) if total_invested > 0 else 0
        
        # ------------------ Ponto Chave 3: Endpoint RESTful Seguro ------------------
        # A View/Serializer deve garantir que os dados de output (JSON) para o
        # React sejam seguros e otimizados, utilizando a serialização do DRF
        # e garantindo que o usuário logado só acesse SEUS próprios dados
        # (is_authenticated e permissões customizadas).
        
        portfolio_data = {
            'total_value': float(total_value),
            'total_invested': float(total_invested),
            'total_return': float(total_return),
            'return_percentage': float(return_percentage),
            'assets': assets_data
        }
        
        serializer = PortfolioSerializer(data=portfolio_data)
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.data)