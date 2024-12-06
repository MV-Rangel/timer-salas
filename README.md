# Timer para agendamento de salas da Biblioteca

O operador insere as informações: Nome do Usuário, Matrícula, número da sala, horário de reserva.

Uma reserva é adicionada com esses dados. A reserva é guardada com localStorage(), no momento.

A reserva também mostra o botão Remover, que remove a reserva da lista e o botão Editar, que permite ao operador editar as informações.

Um timer verifica o horário que foi feito o agendamento com o horário atual e faz uma contagem regressiva para o tempo que falta para a reserva começar.

Um timer regressivo de uma hora inicia, assim que o tempo para começar, terminar.

Um botão "Tempo Esgotado" surge assim que a contagem regressiva de uma hora terminar.

### todo:

- [ ] Criar um banco de dados para armazenar as informações inseridas ao invés do localStorage()
- [ ] Melhorar UI/UX de forma que animações sejam inseridas, melhores cores. Que as informações exibidas sejam claras e entendidas imediatamente.
