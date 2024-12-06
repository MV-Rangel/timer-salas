import { startCountdown, startEndCountdown } from "./timeUtils.js";

export function addReservationToDOM(
  { room, studentName, registration, reservationTimeInput, timeToStart },
  index,
  reservationsContainer,
  removeReservationCallback
) {
  const reservationElement = document.createElement("div");
  reservationElement.classList.add("reservations");

  let timeToEnd = "60:00"; // Inicializa com uma hora (em formato MM:SS)

  const paragraph = `<div class="reservations_text">
          <p>Sala <span class="room_number">${room}</span> reservada para ${studentName} - ${registration}</p>
          <p> Horário de reserva: ${reservationTimeInput}. Reserva inicia em: <span class="time_to_start">${Math.floor(
    timeToStart / 60
  )}</span> minutos</p>
          <p> Reserva termina em: <span class="time_to_end">${timeToEnd}</span>.</p>
      </div>`;
      
  // Botão de remover reserva
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove_button");
  removeButton.innerText = "Remover";

  // Adiciona evento de clique ao botão de remover
  removeButton.addEventListener("click", () => {
    removeReservationCallback(index); // Chama a função para remover a reserva
    localStorage.removeItem(`reservation_${index}_start`);
    localStorage.removeItem(`reservation_${index}_end`);
  });
  reservationElement.innerHTML = paragraph;

  reservationsContainer.appendChild(reservationElement);
  reservationElement.appendChild(removeButton);

  startCountdown(
    reservationElement.querySelector(".time_to_start"),
    timeToStart,
    reservationElement.querySelector(".time_to_end"),
    index
  );
}
