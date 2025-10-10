# Sistema de Gerenciamento Clínica Vida+

Sistema completo para gerenciamento de pacientes, controle de acesso e fila de atendimento para a Clínica Vida+.

## Funcionalidades Principais

### Gestão de Pacientes
- Cadastro completo de pacientes com validações
- Busca por ID ou nome
- Atualização de dados
- Visualização de lista completa

### Controle de Acesso
- Verificação de elegibilidade para consultas normais e emergências
- Implementação de regras de negócio com expressões lógicas
- Visualização de tabela de regras
- Análise estatística das regras

### Fila de Atendimento
- Adição de pacientes à fila
- Chamada do próximo paciente
- Visualização da fila atual
- Finalização de atendimentos com registro de tempo

### Estatísticas
- Estatísticas de pacientes
- Análise de tempo de atendimento
- Análise das regras de acesso

## Estrutura do Projeto

- `models.py`: Classes de modelo (Patient, Statistics, QueueNode)
- `services.py`: Serviço de gerenciamento de pacientes
- `queue_manager.py`: Sistema de fila de atendimento
- `access_control.py`: Controle de acesso com regras de negócio
- `menu_interface.py`: Interface de usuário com menus interativos
- `clinica_vida_plus.py`: Arquivo principal para execução do sistema

## Requisitos

- Python 3.6 ou superior
- Não requer bibliotecas externas além das padrão do Python

## Como Executar

1. Certifique-se de ter o Python instalado
2. Execute o arquivo principal:
   ```
   python clinica_vida_plus.py
   ```

## Regras de Negócio

O sistema implementa as seguintes regras de acesso:

- **Consulta Normal**: (A ∧ B ∧ C) ∨ (B ∧ C ∧ D)
- **Emergência**: C ∧ (B ∨ D)

Onde:
- A = Tem agendamento marcado
- B = Documentos em dia
- C = Médico disponível
- D = Pagamentos em dia

## Persistência de Dados

Os dados dos pacientes são salvos em formato JSON no arquivo `pacientes.json`, com backup automático a cada operação de salvamento.

## Logs

O sistema mantém logs detalhados de todas as operações em `clinica_vida_plus.log`.