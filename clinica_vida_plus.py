#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Sistema de Gerenciamento Clínica Vida+
Desenvolvido para gerenciar pacientes, filas de atendimento e controle de acesso.
"""

import logging
from menu_interface import MenuInterface

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='clinica_vida_plus.log'
)
logger = logging.getLogger('ClinicaVidaPlus')

def main():
    """Função principal que inicia o sistema."""
    logger.info("Iniciando Sistema Clínica Vida+")
    
    try:
        # Inicializa a interface do menu
        interface = MenuInterface()
        
        # Inicia a execução do sistema
        interface.iniciar()
        
    except Exception as e:
        logger.error(f"Erro ao executar o sistema: {str(e)}")
    finally:
        logger.info("Sistema encerrado")

if __name__ == "__main__":
    main()