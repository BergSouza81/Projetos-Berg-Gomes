from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Asset, Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'ticker', 'name', 'asset_type', 'current_price', 'last_update']
        read_only_fields = ['id', 'last_update']

class TransactionSerializer(serializers.ModelSerializer):
    asset_ticker = serializers.CharField(source='asset.ticker', read_only=True)
    asset_name = serializers.CharField(source='asset.name', read_only=True)
    
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'asset', 'asset_ticker', 'asset_name', 'transaction_type', 
                 'quantity', 'price', 'date', 'created_at', 'total_value']
        read_only_fields = ['id', 'created_at', 'total_value', 'asset_ticker', 'asset_name']

class PortfolioSerializer(serializers.Serializer):
    total_value = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_invested = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_return = serializers.DecimalField(max_digits=15, decimal_places=2)
    return_percentage = serializers.DecimalField(max_digits=15, decimal_places=2)
    assets = serializers.ListField()