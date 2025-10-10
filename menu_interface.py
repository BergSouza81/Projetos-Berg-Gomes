import os
import time
import logging
from typing import Dict, List, Optional
from models import Patient
from services import PatientService
from queue_manager import QueueManager
from access_control import AccessControl

logger = logging.getLogger('ClinicaVidaPlus')

class MenuInterface:
    def __init__(self):
        self.patient_service = PatientService()
        self.queue_manager = QueueManager(self.patient_service)
        self.access_control = AccessControl()
        self.running = True
    
    def limpar_tela(self):
        """Limpa a tela do console."""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def exibir_cabecalho(self):
        """Exibe o cabeçalho do sistema."""
        self.limpar_tela()
        print("=" * 60)
        print("                SISTEMA CLÍNICA VIDA+                ")
        print("=" * 60)
        print("Gerenciamento de Pacientes e Atendimentos")
        print("-" * 60)
    
    def exibir_menu_principal(self):
        """Exibe o menu principal do sistema."""
        self.exibir_cabecalho()
        print("\nMENU PRINCIPAL:")
        print("1. Gestão de Pacientes")
        print("2. Fila de Atendimento")
        print("3. Controle de Acesso")
        print("4. Estatísticas")
        print("0. Sair do Sistema")
        print("-" * 60)
    
    def exibir_menu_pacientes(self):
        """Exibe o menu de gestão de pacientes."""
        self.exibir_cabecalho()
        print("\nGESTÃO DE PACIENTES:")
        print("1. Cadastrar Novo Paciente")
        print("2. Buscar Paciente")
        print("3. Listar Todos os Pacientes")
        print("4. Atualizar Dados de Paciente")
        print("0. Voltar ao Menu Principal")
        print("-" * 60)
    
    def exibir_menu_fila(self):
        """Exibe o menu de gestão da fila de atendimento."""
        self.exibir_cabecalho()
        print("\nFILA DE ATENDIMENTO:")
        print("1. Adicionar Paciente à Fila")
        print("2. Chamar Próximo Paciente")
        print("3. Visualizar Fila Atual")
        print("4. Finalizar Atendimento")
        print("0. Voltar ao Menu Principal")
        print("-" * 60)
    
    def exibir_menu_acesso(self):
        """Exibe o menu de controle de acesso."""
        self.exibir_cabecalho()
        print("\nCONTROLE DE ACESSO:")
        print("1. Verificar Elegibilidade para Consulta Normal")
        print("2. Verificar Elegibilidade para Emergência")
        print("3. Visualizar Tabela de Regras")
        print("0. Voltar ao Menu Principal")
        print("-" * 60)
    
    def exibir_menu_estatisticas(self):
        """Exibe o menu de estatísticas."""
        self.exibir_cabecalho()
        print("\nESTATÍSTICAS:")
        print("1. Estatísticas de Pacientes")
        print("2. Estatísticas de Tempo de Atendimento")
        print("3. Análise de Regras de Acesso")
        print("0. Voltar ao Menu Principal")
        print("-" * 60)
    
    def cadastrar_paciente(self):
        """Interface para cadastro de novo paciente."""
        self.exibir_cabecalho()
        print("\nCADASTRO DE NOVO PACIENTE:")
        print("-" * 60)
        
        try:
            nome = input("Nome completo: ")
            idade = int(input("Idade: "))
            telefone = input("Telefone: ")
            email = input("Email: ")
            
            print("\nEndereço:")
            rua = input("Rua: ")
            numero = input("Número: ")
            bairro = input("Bairro: ")
            cidade = input("Cidade: ")
            estado = input("Estado: ")
            cep = input("CEP: ")
            
            endereco = {
                'rua': rua,
                'numero': numero,
                'bairro': bairro,
                'cidade': cidade,
                'estado': estado,
                'cep': cep
            }
            
            documentos_em_dia = input("Documentos em dia? (S/N): ").upper() == 'S'
            pagamentos_em_dia = input("Pagamentos em dia? (S/N): ").upper() == 'S'
            
            paciente = self.patient_service.cadastrar_paciente(nome, idade, telefone, email, endereco)
            
            if paciente:
                # Atualizar status de documentos e pagamentos
                self.patient_service.atualizar_paciente(paciente.id, {
                    'documentos_em_dia': documentos_em_dia,
                    'pagamentos_em_dia': pagamentos_em_dia
                })
                
                print("\nPaciente cadastrado com sucesso!")
                print(f"ID do paciente: {paciente.id}")
            else:
                print("\nErro ao cadastrar paciente. Verifique os dados informados.")
        
        except ValueError as e:
            print(f"\nErro de valor: {str(e)}")
        except Exception as e:
            print(f"\nErro inesperado: {str(e)}")
        
        input("\nPressione ENTER para continuar...")
    
    def buscar_paciente(self):
        """Interface para busca de pacientes."""
        self.exibir_cabecalho()
        print("\nBUSCA DE PACIENTES:")
        print("-" * 60)
        
        print("1. Buscar por ID")
        print("2. Buscar por Nome")
        opcao = input("\nEscolha uma opção: ")
        
        if opcao == '1':
            id_paciente = input("Digite o ID do paciente: ")
            paciente = self.patient_service.buscar_paciente_por_id(id_paciente)
            
            if paciente:
                self.exibir_dados_paciente(paciente)
            else:
                print("\nPaciente não encontrado.")
        
        elif opcao == '2':
            nome = input("Digite o nome (ou parte do nome) do paciente: ")
            pacientes = self.patient_service.buscar_paciente_por_nome(nome)
            
            if pacientes:
                print(f"\nEncontrados {len(pacientes)} pacientes:")
                for i, p in enumerate(pacientes, 1):
                    print(f"{i}. {p.nome} (ID: {p.id})")
                
                try:
                    escolha = int(input("\nDigite o número do paciente para ver detalhes (0 para cancelar): "))
                    if 1 <= escolha <= len(pacientes):
                        self.exibir_dados_paciente(pacientes[escolha-1])
                except ValueError:
                    print("Opção inválida.")
            else:
                print("\nNenhum paciente encontrado com esse nome.")
        
        input("\nPressione ENTER para continuar...")
    
    def exibir_dados_paciente(self, paciente: Patient):
        """Exibe os dados detalhados de um paciente."""
        print("\nDADOS DO PACIENTE:")
        print("-" * 60)
        print(f"ID: {paciente.id}")
        print(f"Nome: {paciente.nome}")
        print(f"Idade: {paciente.idade}")
        print(f"Telefone: {paciente.telefone}")
        print(f"Email: {paciente.email}")
        
        print("\nEndereço:")
        endereco = paciente.endereco
        print(f"  {endereco.get('rua', 'N/A')}, {endereco.get('numero', 'N/A')}")
        print(f"  {endereco.get('bairro', 'N/A')}, {endereco.get('cidade', 'N/A')} - {endereco.get('estado', 'N/A')}")
        print(f"  CEP: {endereco.get('cep', 'N/A')}")
        
        print("\nStatus:")
        print(f"Documentos em dia: {'Sim' if paciente.documentos_em_dia else 'Não'}")
        print(f"Pagamentos em dia: {'Sim' if paciente.pagamentos_em_dia else 'Não'}")
    
    def listar_pacientes(self):
        """Lista todos os pacientes cadastrados."""
        self.exibir_cabecalho()
        print("\nLISTA DE PACIENTES:")
        print("-" * 60)
        
        pacientes = self.patient_service.listar_todos_pacientes()
        
        if pacientes:
            print(f"Total de pacientes: {len(pacientes)}\n")
            print(f"{'ID':<10} {'Nome':<30} {'Idade':<8} {'Telefone':<15}")
            print("-" * 65)
            
            for p in pacientes:
                print(f"{p.id:<10} {p.nome:<30} {p.idade:<8} {p.telefone:<15}")
        else:
            print("Nenhum paciente cadastrado.")
        
        input("\nPressione ENTER para continuar...")
    
    def atualizar_paciente(self):
        """Interface para atualização de dados de paciente."""
        self.exibir_cabecalho()
        print("\nATUALIZAÇÃO DE DADOS DE PACIENTE:")
        print("-" * 60)
        
        id_paciente = input("Digite o ID do paciente: ")
        paciente = self.patient_service.buscar_paciente_por_id(id_paciente)
        
        if not paciente:
            print("\nPaciente não encontrado.")
            input("\nPressione ENTER para continuar...")
            return
        
        self.exibir_dados_paciente(paciente)
        
        print("\nSelecione o campo que deseja atualizar:")
        print("1. Nome")
        print("2. Idade")
        print("3. Telefone")
        print("4. Email")
        print("5. Endereço")
        print("6. Status de Documentos")
        print("7. Status de Pagamentos")
        print("0. Cancelar")
        
        opcao = input("\nEscolha uma opção: ")
        
        dados = {}
        
        if opcao == '1':
            dados['nome'] = input("Novo nome: ")
        elif opcao == '2':
            try:
                dados['idade'] = int(input("Nova idade: "))
            except ValueError:
                print("Idade inválida.")
                return
        elif opcao == '3':
            dados['telefone'] = input("Novo telefone: ")
        elif opcao == '4':
            dados['email'] = input("Novo email: ")
        elif opcao == '5':
            endereco = {}
            endereco['rua'] = input("Nova rua: ")
            endereco['numero'] = input("Novo número: ")
            endereco['bairro'] = input("Novo bairro: ")
            endereco['cidade'] = input("Nova cidade: ")
            endereco['estado'] = input("Novo estado: ")
            endereco['cep'] = input("Novo CEP: ")
            dados['endereco'] = endereco
        elif opcao == '6':
            dados['documentos_em_dia'] = input("Documentos em dia? (S/N): ").upper() == 'S'
        elif opcao == '7':
            dados['pagamentos_em_dia'] = input("Pagamentos em dia? (S/N): ").upper() == 'S'
        elif opcao == '0':
            return
        else:
            print("Opção inválida.")
            return
        
        if self.patient_service.atualizar_paciente(id_paciente, dados):
            print("\nDados atualizados com sucesso!")
        else:
            print("\nErro ao atualizar dados.")
        
        input("\nPressione ENTER para continuar...")
    
    def adicionar_paciente_fila(self):
        """Adiciona um paciente à fila de atendimento."""
        self.exibir_cabecalho()
        print("\nADICIONAR PACIENTE À FILA:")
        print("-" * 60)
        
        id_paciente = input("Digite o ID do paciente: ")
        paciente = self.patient_service.buscar_paciente_por_id(id_paciente)
        
        if not paciente:
            print("\nPaciente não encontrado.")
            input("\nPressione ENTER para continuar...")
            return
        
        print("\nTipo de consulta:")
        print("1. Consulta Normal")
        print("2. Emergência")
        tipo_opcao = input("\nEscolha uma opção: ")
        
        tipo_consulta = "NORMAL" if tipo_opcao == '1' else "EMERGENCIA"
        
        elegivel, mensagem = self.access_control.verificar_elegibilidade_atendimento(tipo_consulta, paciente)
        
        print(f"\n{mensagem}")
        
        if elegivel:
            if self.queue_manager.adicionar_paciente_fila(id_paciente):
                print("\nPaciente adicionado à fila com sucesso!")
            else:
                print("\nErro ao adicionar paciente à fila.")
        
        input("\nPressione ENTER para continuar...")
    
    def chamar_proximo_paciente(self):
        """Chama o próximo paciente da fila."""
        self.exibir_cabecalho()
        print("\nCHAMAR PRÓXIMO PACIENTE:")
        print("-" * 60)
        
        atendimento = self.queue_manager.chamar_proximo_atendimento()
        
        if atendimento:
            paciente = atendimento['paciente']
            print(f"\nPróximo paciente: {paciente.nome}")
            print(f"ID: {paciente.id}")
            print(f"Início do atendimento: {atendimento['inicio_atendimento']}")
        else:
            print("\nNão há pacientes na fila de espera.")
        
        input("\nPressione ENTER para continuar...")
    
    def visualizar_fila(self):
        """Visualiza a fila atual de atendimento."""
        self.exibir_cabecalho()
        print("\nFILA ATUAL DE ATENDIMENTO:")
        print("-" * 60)
        
        fila = self.queue_manager.visualizar_fila()
        
        if fila:
            print(f"Total de pacientes na fila: {len(fila)}\n")
            print(f"{'Posição':<10} {'ID':<10} {'Nome':<30} {'Idade':<8}")
            print("-" * 60)
            
            for i, p in enumerate(fila, 1):
                print(f"{i:<10} {p.id:<10} {p.nome:<30} {p.idade:<8}")
        else:
            print("Fila vazia.")
        
        input("\nPressione ENTER para continuar...")
    
    def finalizar_atendimento(self):
        """Finaliza o atendimento de um paciente."""
        self.exibir_cabecalho()
        print("\nFINALIZAR ATENDIMENTO:")
        print("-" * 60)
        
        id_paciente = input("Digite o ID do paciente: ")
        
        atendimento = self.queue_manager.finalizar_atendimento(id_paciente)
        
        if atendimento:
            paciente = atendimento['paciente']
            print(f"\nAtendimento finalizado para: {paciente.nome}")
            print(f"Duração: {atendimento['duracao_minutos']:.2f} minutos")
        else:
            print("\nNão foi encontrado atendimento em andamento para este paciente.")
        
        input("\nPressione ENTER para continuar...")
    
    def verificar_elegibilidade(self, tipo_consulta: str):
        """Verifica a elegibilidade de um paciente para atendimento."""
        self.exibir_cabecalho()
        print(f"\nVERIFICAR ELEGIBILIDADE PARA {tipo_consulta}:")
        print("-" * 60)
        
        id_paciente = input("Digite o ID do paciente: ")
        paciente = self.patient_service.buscar_paciente_por_id(id_paciente)
        
        if not paciente:
            print("\nPaciente não encontrado.")
            input("\nPressione ENTER para continuar...")
            return
        
        elegivel, mensagem = self.access_control.verificar_elegibilidade_atendimento(tipo_consulta, paciente)
        
        print(f"\n{mensagem}")
        
        input("\nPressione ENTER para continuar...")
    
    def visualizar_tabela_regras(self):
        """Visualiza a tabela de regras de acesso."""
        self.exibir_cabecalho()
        print("\nTABELA DE REGRAS DE ACESSO:")
        print("-" * 60)
        
        print("Legenda:")
        print("A = Tem agendamento marcado")
        print("B = Documentos em dia")
        print("C = Médico disponível")
        print("D = Pagamentos em dia")
        print("\nRegras:")
        print("CONSULTA_NORMAL = (A ∧ B ∧ C) ∨ (B ∧ C ∧ D)")
        print("EMERGENCIA = C ∧ (B ∨ D)")
        
        print("\nTabela Verdade:")
        print(f"{'A':<5} {'B':<5} {'C':<5} {'D':<5} | {'NORMAL':<10} {'EMERGÊNCIA':<10}")
        print("-" * 45)
        
        tabela = self.access_control.gerar_tabela_verdade()
        
        for linha in tabela:
            a = "V" if linha['A'] else "F"
            b = "V" if linha['B'] else "F"
            c = "V" if linha['C'] else "F"
            d = "V" if linha['D'] else "F"
            normal = "Permitido" if linha['CONSULTA_NORMAL'] else "Negado"
            emergencia = "Permitido" if linha['EMERGENCIA'] else "Negado"
            
            print(f"{a:<5} {b:<5} {c:<5} {d:<5} | {normal:<10} {emergencia:<10}")
        
        input("\nPressione ENTER para continuar...")
    
    def exibir_estatisticas_pacientes(self):
        """Exibe estatísticas sobre os pacientes cadastrados."""
        self.exibir_cabecalho()
        print("\nESTATÍSTICAS DE PACIENTES:")
        print("-" * 60)
        
        stats = self.patient_service.calcular_estatisticas()
        
        print(f"Total de pacientes: {stats.total_pacientes}")
        print(f"Média de idade: {stats.media_idade:.1f} anos")
        print(f"Pacientes com documentos em dia: {stats.documentos_em_dia} ({stats.percentual_documentos_em_dia:.1f}%)")
        print(f"Pacientes com pagamentos em dia: {stats.pagamentos_em_dia} ({stats.percentual_pagamentos_em_dia:.1f}%)")
        
        input("\nPressione ENTER para continuar...")
    
    def exibir_estatisticas_tempo(self):
        """Exibe estatísticas sobre o tempo de atendimento."""
        self.exibir_cabecalho()
        print("\nESTATÍSTICAS DE TEMPO DE ATENDIMENTO:")
        print("-" * 60)
        
        stats = self.queue_manager.estatisticas_tempo_espera()
        
        print(f"Total de atendimentos: {stats['total_atendimentos']}")
        
        if stats['total_atendimentos'] > 0:
            print(f"Tempo médio de atendimento: {stats['tempo_medio']:.2f} minutos")
            print(f"Tempo mínimo de atendimento: {stats['tempo_minimo']:.2f} minutos")
            print(f"Tempo máximo de atendimento: {stats['tempo_maximo']:.2f} minutos")
        else:
            print("Não há dados de atendimento para análise.")
        
        input("\nPressione ENTER para continuar...")
    
    def exibir_analise_regras(self):
        """Exibe análise das regras de acesso."""
        self.exibir_cabecalho()
        print("\nANÁLISE DE REGRAS DE ACESSO:")
        print("-" * 60)
        
        analise = self.access_control.analisar_tabela_verdade()
        
        print(f"Total de combinações possíveis: {analise['total_combinacoes']}")
        print(f"Consultas normais permitidas: {analise['normal_permitido']} ({analise['porcentagem_normal']:.1f}%)")
        print(f"Emergências permitidas: {analise['emergencia_permitida']} ({analise['porcentagem_emergencia']:.1f}%)")
        print(f"Cenários críticos (emergência negada): {analise['cenarios_criticos']}")
        
        input("\nPressione ENTER para continuar...")
    
    def executar_menu_principal(self):
        """Executa o menu principal."""
        while self.running:
            self.exibir_menu_principal()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == '1':
                self.executar_menu_pacientes()
            elif opcao == '2':
                self.executar_menu_fila()
            elif opcao == '3':
                self.executar_menu_acesso()
            elif opcao == '4':
                self.executar_menu_estatisticas()
            elif opcao == '0':
                self.running = False
                print("\nEncerrando o sistema...")
                time.sleep(1)
            else:
                print("\nOpção inválida!")
                time.sleep(1)
    
    def executar_menu_pacientes(self):
        """Executa o menu de gestão de pacientes."""
        while True:
            self.exibir_menu_pacientes()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == '1':
                self.cadastrar_paciente()
            elif opcao == '2':
                self.buscar_paciente()
            elif opcao == '3':
                self.listar_pacientes()
            elif opcao == '4':
                self.atualizar_paciente()
            elif opcao == '0':
                break
            else:
                print("\nOpção inválida!")
                time.sleep(1)
    
    def executar_menu_fila(self):
        """Executa o menu de gestão da fila de atendimento."""
        while True:
            self.exibir_menu_fila()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == '1':
                self.adicionar_paciente_fila()
            elif opcao == '2':
                self.chamar_proximo_paciente()
            elif opcao == '3':
                self.visualizar_fila()
            elif opcao == '4':
                self.finalizar_atendimento()
            elif opcao == '0':
                break
            else:
                print("\nOpção inválida!")
                time.sleep(1)
    
    def executar_menu_acesso(self):
        """Executa o menu de controle de acesso."""
        while True:
            self.exibir_menu_acesso()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == '1':
                self.verificar_elegibilidade("NORMAL")
            elif opcao == '2':
                self.verificar_elegibilidade("EMERGENCIA")
            elif opcao == '3':
                self.visualizar_tabela_regras()
            elif opcao == '0':
                break
            else:
                print("\nOpção inválida!")
                time.sleep(1)
    
    def executar_menu_estatisticas(self):
        """Executa o menu de estatísticas."""
        while True:
            self.exibir_menu_estatisticas()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == '1':
                self.exibir_estatisticas_pacientes()
            elif opcao == '2':
                self.exibir_estatisticas_tempo()
            elif opcao == '3':
                self.exibir_analise_regras()
            elif opcao == '0':
                break
            else:
                print("\nOpção inválida!")
                time.sleep(1)
    
    def iniciar(self):
        """Inicia a execução do sistema."""
        self.executar_menu_principal()