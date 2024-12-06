# Timer para agendamento de salas da Biblioteca

O operador insere as seguintes informações: Nome do Usuário, Matrícula, Número da Sala e Horário de Reserva.

A reserva é adicionada com esses dados e armazenada usando localStorage().

A reserva exibe dois botões: Remover, que exclui a reserva da lista, e Editar, que permite ao operador modificar as informações.

Um temporizador verifica o horário do agendamento em relação ao horário atual e inicia uma contagem regressiva até o início da reserva.

Após essa contagem regressiva, um cronômetro regressivo de uma hora começa.

Ao término dessa hora, um botão "Tempo Esgotado" aparece.

### todo:

- [ ] Criar um banco de dados para armazenar as informações inseridas ao invés do localStorage()
- [ ] Melhorar UI/UX de forma que animações sejam inseridas, melhores cores. Que as informações exibidas sejam claras e entendidas imediatamente.
