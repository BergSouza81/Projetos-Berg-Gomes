import json
import os
import re
import logging
from typing import List, Dict, Optional
from models import Patient, Statistics

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='clinica_vida_plus.log'
)
logger = logging.getLogger('ClinicaVidaPlus')

# Classe para serviço de pacientes
class PatientService:
    def __init__(self, data_file: str = 'pacientes.json'):
        self.data_file = data_file
        self.patients = []
        self.load_data()
    
    def load_data(self):
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.patients = [Patient.from_dict(p) for p in data]
                    logger.info(f"Dados carregados: {len(self.patients)} pacientes")
            else:
                logger.info("Arquivo de dados não encontrado. Iniciando com lista vazia.")
        except Exception as e:
            logger.error(f"Erro ao carregar dados: {str(e)}")
            self.patients = []
    
    def save_data(self):
        try:
            # Criar backup antes de salvar
            if os.path.exists(self.data_file):
                backup_file = f"{self.data_file}.bak"
                with open(self.data_file, 'r', encoding='utf-8') as src:
                    with open(backup_file, 'w', encoding='utf-8') as dst:
                        dst.write(src.read())
                logger.info(f"Backup criado: {backup_file}")
            
            # Salvar dados atuais
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump([p.to_dict() for p in self.patients], f, ensure_ascii=False, indent=2)
            logger.info(f"Dados salvos: {len(self.patients)} pacientes")
            return True
        except Exception as e:
            logger.error(f"Erro ao salvar dados: {str(e)}")
            return False
    
    def validar_cpf(self, cpf: str) -> bool:
        # Remove caracteres não numéricos
        cpf = re.sub(r'\D', '', cpf)
        
        # Verifica se tem 11 dígitos
        if len(cpf) != 11:
            return False
        
        # Verifica se todos os dígitos são iguais
        if cpf == cpf[0] * 11:
            return False
        
        # Validação do primeiro dígito verificador
        soma = 0
        for i in range(9):
            soma += int(cpf[i]) * (10 - i)
        resto = soma % 11
        digito1 = 0 if resto < 2 else 11 - resto
        
        if digito1 != int(cpf[9]):
            return False
        
        # Validação do segundo dígito verificador
        soma = 0
        for i in range(10):
            soma += int(cpf[i]) * (11 - i)
        resto = soma % 11
        digito2 = 0 if resto < 2 else 11 - resto
        
        return digito2 == int(cpf[10])
    
    def validar_telefone(self, telefone: str) -> bool:
        # Remove caracteres não numéricos
        telefone = re.sub(r'\D', '', telefone)
        
        # Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
        return 10 <= len(telefone) <= 11
    
    def validar_email(self, email: str) -> bool:
        # Padrão básico de validação de email
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
    
    def cadastrar_paciente(self, nome: str, idade: int, telefone: str, email: str, endereco: Dict) -> Optional[Patient]:
        try:
            # Validações
            if not nome or len(nome) < 3:
                logger.warning(f"Nome inválido: {nome}")
                return None
            
            if not self.validar_telefone(telefone):
                logger.warning(f"Telefone inválido: {telefone}")
                return None
            
            if not self.validar_email(email):
                logger.warning(f"Email inválido: {email}")
                return None
            
            # Criar paciente
            patient = Patient(nome, idade, telefone, email, endereco)
            self.patients.append(patient)
            logger.info(f"Paciente cadastrado: {patient.id} - {patient.nome}")
            
            # Salvar dados
            self.save_data()
            return patient
        except Exception as e:
            logger.error(f"Erro ao cadastrar paciente: {str(e)}")
            return None
    
    def buscar_paciente_por_id(self, id: str) -> Optional[Patient]:
        for patient in self.patients:
            if patient.id == id:
                return patient
        return None
    
    def buscar_paciente_por_nome(self, nome: str) -> List[Patient]:
        # Busca fuzzy simples (case insensitive e contém)
        nome = nome.lower()
        return [p for p in self.patients if nome in p.nome.lower()]
    
    def listar_todos_pacientes(self) -> List[Patient]:
        return self.patients
    
    def atualizar_paciente(self, id: str, dados: Dict) -> Optional[Patient]:
        patient = self.buscar_paciente_por_id(id)
        if not patient:
            logger.warning(f"Paciente não encontrado: {id}")
            return None
        
        try:
            # Atualizar campos
            if 'nome' in dados:
                patient.nome = dados['nome']
            if 'idade' in dados:
                patient.idade = dados['idade']
            if 'telefone' in dados and self.validar_telefone(dados['telefone']):
                patient.telefone = dados['telefone']
            if 'email' in dados and self.validar_email(dados['email']):
                patient.email = dados['email']
            if 'endereco' in dados:
                patient.endereco = dados['endereco']
            if 'documentos_em_dia' in dados:
                patient.documentos_em_dia = dados['documentos_em_dia']
            if 'pagamentos_em_dia' in dados:
                patient.pagamentos_em_dia = dados['pagamentos_em_dia']
            
            logger.info(f"Paciente atualizado: {patient.id} - {patient.nome}")
            self.save_data()
            return patient
        except Exception as e:
            logger.error(f"Erro ao atualizar paciente: {str(e)}")
            return None
    
    def calcular_estatisticas(self) -> Statistics:
        return Statistics(self.patients)