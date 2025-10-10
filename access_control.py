import logging
from typing import Dict, List, Tuple
from models import Patient

logger = logging.getLogger('ClinicaVidaPlus')

class AccessControl:
    def __init__(self):
        self.medicos_disponiveis = True  # Simplificação para demonstração
    
    def verificar_elegibilidade_atendimento(self, tipo_consulta: str, paciente: Patient) -> Tuple[bool, str]:
        """
        Verifica se o paciente é elegível para atendimento baseado nas regras de negócio.
        
        CONSULTA_NORMAL = (A ∧ B ∧ C) ∨ (B ∧ C ∧ D)
        EMERGENCIA = C ∧ (B ∨ D)
        
        Onde:
        A = Tem agendamento marcado
        B = Documentos em dia
        C = Médico disponível
        D = Pagamentos em dia
        """
        # Simplificação: assumimos que A (agendamento) é True para demonstração
        A = True  # Tem agendamento marcado
        B = paciente.documentos_em_dia  # Documentos em dia
        C = self.medicos_disponiveis  # Médico disponível
        D = paciente.pagamentos_em_dia  # Pagamentos em dia
        
        resultado = False
        mensagem = ""
        
        if tipo_consulta == "NORMAL":
            resultado = (A and B and C) or (B and C and D)
            if resultado:
                mensagem = "Paciente elegível para consulta normal."
            else:
                mensagem = self._gerar_mensagem_nao_elegivel(A, B, C, D, tipo_consulta)
        
        elif tipo_consulta == "EMERGENCIA":
            resultado = C and (B or D)
            if resultado:
                mensagem = "Paciente elegível para atendimento de emergência."
            else:
                mensagem = self._gerar_mensagem_nao_elegivel(A, B, C, D, tipo_consulta)
        
        else:
            mensagem = f"Tipo de consulta inválido: {tipo_consulta}"
        
        logger.info(f"Verificação de elegibilidade: {paciente.nome}, {tipo_consulta}, resultado: {resultado}")
        return resultado, mensagem
    
    def _gerar_mensagem_nao_elegivel(self, A: bool, B: bool, C: bool, D: bool, tipo_consulta: str) -> str:
        """Gera uma mensagem explicativa sobre por que o paciente não é elegível."""
        razoes = []
        
        if not A:
            razoes.append("não possui agendamento marcado")
        if not B:
            razoes.append("está com documentos pendentes")
        if not C:
            razoes.append("não há médicos disponíveis no momento")
        if not D:
            razoes.append("está com pagamentos pendentes")
        
        if razoes:
            return f"Paciente não elegível para {tipo_consulta.lower()} porque {', '.join(razoes)}."
        return f"Paciente não elegível para {tipo_consulta.lower()} devido às regras da clínica."
    
    def gerar_tabela_verdade(self) -> List[Dict]:
        """
        Gera uma tabela verdade para as regras de elegibilidade.
        """
        tabela = []
        
        for A in [True, False]:
            for B in [True, False]:
                for C in [True, False]:
                    for D in [True, False]:
                        consulta_normal = (A and B and C) or (B and C and D)
                        emergencia = C and (B or D)
                        
                        tabela.append({
                            'A': A,
                            'B': B,
                            'C': C,
                            'D': D,
                            'CONSULTA_NORMAL': consulta_normal,
                            'EMERGENCIA': emergencia
                        })
        
        return tabela
    
    def analisar_tabela_verdade(self) -> Dict:
        """
        Analisa a tabela verdade e retorna estatísticas.
        """
        tabela = self.gerar_tabela_verdade()
        
        # Contar combinações onde atendimento é permitido
        normal_permitido = sum(1 for linha in tabela if linha['CONSULTA_NORMAL'])
        emergencia_permitida = sum(1 for linha in tabela if linha['EMERGENCIA'])
        
        # Identificar cenários críticos (quando emergência não é permitida)
        cenarios_criticos = [linha for linha in tabela if not linha['EMERGENCIA']]
        
        return {
            'total_combinacoes': len(tabela),
            'normal_permitido': normal_permitido,
            'emergencia_permitida': emergencia_permitida,
            'cenarios_criticos': len(cenarios_criticos),
            'porcentagem_normal': (normal_permitido / len(tabela)) * 100,
            'porcentagem_emergencia': (emergencia_permitida / len(tabela)) * 100
        }