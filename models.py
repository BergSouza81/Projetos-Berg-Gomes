import uuid
import datetime
from typing import List, Dict, Optional

# Classe para representar um paciente
class Patient:
    def __init__(self, nome: str, idade: int, telefone: str, email: str, endereco: Dict, 
                 id: str = None, documentos_em_dia: bool = False, pagamentos_em_dia: bool = False):
        self.id = id if id else str(uuid.uuid4())
        self.nome = nome
        self.idade = idade
        self.telefone = telefone
        self.email = email
        self.endereco = endereco
        self.data_cadastro = datetime.datetime.now().isoformat()
        self.historico_consultas = []
        self.documentos_em_dia = documentos_em_dia
        self.pagamentos_em_dia = pagamentos_em_dia
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'nome': self.nome,
            'idade': self.idade,
            'telefone': self.telefone,
            'email': self.email,
            'endereco': self.endereco,
            'data_cadastro': self.data_cadastro,
            'historico_consultas': self.historico_consultas,
            'documentos_em_dia': self.documentos_em_dia,
            'pagamentos_em_dia': self.pagamentos_em_dia
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'Patient':
        patient = cls(
            nome=data['nome'],
            idade=data['idade'],
            telefone=data['telefone'],
            email=data['email'],
            endereco=data['endereco'],
            id=data['id']
        )
        patient.data_cadastro = data['data_cadastro']
        patient.historico_consultas = data['historico_consultas']
        patient.documentos_em_dia = data['documentos_em_dia']
        patient.pagamentos_em_dia = data['pagamentos_em_dia']
        return patient

# Classe para estatísticas de pacientes
class Statistics:
    def __init__(self, patients: List[Patient]):
        self.patients = patients
    
    def total_pacientes(self) -> int:
        return len(self.patients)
    
    def idade_media(self) -> float:
        if not self.patients:
            return 0
        return sum(p.idade for p in self.patients) / len(self.patients)
    
    def paciente_mais_novo(self) -> Optional[Patient]:
        if not self.patients:
            return None
        return min(self.patients, key=lambda p: p.idade)
    
    def paciente_mais_velho(self) -> Optional[Patient]:
        if not self.patients:
            return None
        return max(self.patients, key=lambda p: p.idade)
    
    def distribuicao_por_faixa_etaria(self) -> Dict:
        faixas = {
            "0-18": 0,
            "19-30": 0,
            "31-50": 0,
            "51-65": 0,
            "65+": 0
        }
        
        for p in self.patients:
            if p.idade <= 18:
                faixas["0-18"] += 1
            elif p.idade <= 30:
                faixas["19-30"] += 1
            elif p.idade <= 50:
                faixas["31-50"] += 1
            elif p.idade <= 65:
                faixas["51-65"] += 1
            else:
                faixas["65+"] += 1
        
        return faixas

# Classe para nó da fila
class QueueNode:
    def __init__(self, paciente: Patient):
        self.paciente = paciente
        self.proximo = None
        self.timestamp = datetime.datetime.now()