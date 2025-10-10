import datetime
import logging
from typing import List, Dict, Optional
from models import Patient, QueueNode
from services import PatientService

logger = logging.getLogger('ClinicaVidaPlus')

# Classe para fila de atendimento
class AttendanceQueue:
    def __init__(self):
        self.inicio = None
        self.fim = None
        self.tamanho = 0
    
    def enqueue(self, paciente: Patient) -> None:
        novo_node = QueueNode(paciente)
        
        if self.is_empty():
            self.inicio = novo_node
        else:
            self.fim.proximo = novo_node
        
        self.fim = novo_node
        self.tamanho += 1
        logger.info(f"Paciente adicionado à fila: {paciente.nome}")
    
    def dequeue(self) -> Optional[Patient]:
        if self.is_empty():
            return None
        
        node = self.inicio
        self.inicio = self.inicio.proximo
        
        if self.inicio is None:
            self.fim = None
        
        self.tamanho -= 1
        logger.info(f"Paciente removido da fila: {node.paciente.nome}")
        return node.paciente
    
    def peek(self) -> Optional[Patient]:
        if self.is_empty():
            return None
        return self.inicio.paciente
    
    def is_empty(self) -> bool:
        return self.inicio is None
    
    def size(self) -> int:
        return self.tamanho
    
    def list_all(self) -> List[Patient]:
        result = []
        current = self.inicio
        
        while current:
            result.append(current.paciente)
            current = current.proximo
        
        return result

# Classe para gerenciamento da fila
class QueueManager:
    def __init__(self, patient_service: PatientService):
        self.queue = AttendanceQueue()
        self.patient_service = patient_service
        self.atendimentos = []  # Lista para registrar tempos de atendimento
    
    def adicionar_paciente_fila(self, id_paciente: str) -> bool:
        paciente = self.patient_service.buscar_paciente_por_id(id_paciente)
        if not paciente:
            logger.warning(f"Paciente não encontrado para adicionar à fila: {id_paciente}")
            return False
        
        self.queue.enqueue(paciente)
        return True
    
    def chamar_proximo_atendimento(self) -> Optional[Dict]:
        paciente = self.queue.dequeue()
        if not paciente:
            return None
        
        atendimento = {
            'paciente': paciente,
            'inicio_atendimento': datetime.datetime.now().isoformat()
        }
        self.atendimentos.append(atendimento)
        return atendimento
    
    def finalizar_atendimento(self, id_paciente: str) -> Optional[Dict]:
        for atendimento in self.atendimentos:
            if atendimento['paciente'].id == id_paciente and 'fim_atendimento' not in atendimento:
                atendimento['fim_atendimento'] = datetime.datetime.now().isoformat()
                inicio = datetime.datetime.fromisoformat(atendimento['inicio_atendimento'])
                fim = datetime.datetime.fromisoformat(atendimento['fim_atendimento'])
                duracao = (fim - inicio).total_seconds() / 60  # Duração em minutos
                atendimento['duracao_minutos'] = duracao
                logger.info(f"Atendimento finalizado: {id_paciente}, duração: {duracao:.2f} minutos")
                return atendimento
        
        return None
    
    def visualizar_fila(self) -> List[Patient]:
        return self.queue.list_all()
    
    def estatisticas_tempo_espera(self) -> Dict:
        if not self.atendimentos:
            return {
                'tempo_medio': 0,
                'tempo_minimo': 0,
                'tempo_maximo': 0,
                'total_atendimentos': 0
            }
        
        atendimentos_finalizados = [a for a in self.atendimentos if 'duracao_minutos' in a]
        
        if not atendimentos_finalizados:
            return {
                'tempo_medio': 0,
                'tempo_minimo': 0,
                'tempo_maximo': 0,
                'total_atendimentos': 0
            }
        
        tempos = [a['duracao_minutos'] for a in atendimentos_finalizados]
        
        return {
            'tempo_medio': sum(tempos) / len(tempos),
            'tempo_minimo': min(tempos),
            'tempo_maximo': max(tempos),
            'total_atendimentos': len(atendimentos_finalizados)
        }