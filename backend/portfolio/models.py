from django.db import models
from django.contrib.auth.models import User

class Asset(models.Model):
    ASSET_TYPES = (
        ('STOCK', 'Ação'),
        ('CRYPTO', 'Criptomoeda'),
        ('FUND', 'Fundo'),
    )
    
    ticker = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES)
    current_price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.ticker} - {self.name}"

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('BUY', 'Compra'),
        ('SELL', 'Venda'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES)
    quantity = models.DecimalField(max_digits=15, decimal_places=6)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.transaction_type} {self.quantity} {self.asset.ticker} @ {self.price}"
    
    @property
    def total_value(self):
        return self.quantity * self.price