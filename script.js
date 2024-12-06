function calculateTimeDifference(reservationTime) {
  const [selectedHours, selectedMinutes] = reservationTime.split(":").map(Number);

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const selectedTimeInMinutes = selectedHours * 60 + selectedMinutes;
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  let timeDifferenceInMinutes = selectedTimeInMinutes - currentTimeInMinutes;

  if (timeDifferenceInMinutes < 0) {
    timeDifferenceInMinutes += 24 * 60; // Ajusta para o próximo dia
  }

  return timeDifferenceInMinutes;
}

const insertReservationOnFormSubmit = () => {
  const form = document.querySelector("#reservationForm");

  const studentNameInput = document.querySelector("#student_name");
  const registrationInput = document.querySelector("#registration");
  const roomInput = document.querySelector("#room");
  const reservationTimeInput = document.querySelector("#reservation_time");

  const cancelButton = document.querySelector(".cancel_button");
  const reservationsContainer = document.querySelector(".reservations_scroll");

  function saveReservationsToLocalStorage(reservations) {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }

  function loadReservationsFromLocalStorage() {
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  }

  function renderReservations(reservations) {
    reservationsContainer.innerHTML = "";
    reservations.forEach((reservation, index) => {
      addReservationToDOM(reservation, index);
    });
  }

  function addReservationToDOM({ room, studentName, registration, timeToStart }, index) {
    const reservationElement = document.createElement("div");
    reservationElement.classList.add("reservations");

    let timeToEnd = "60:00"; // Inicializa com uma hora (em formato MM:SS)

    const paragraph = `<div class="reservations_text">
        <p>Sala <span class="room_number">${room}</span> reservada para ${studentName} - ${registration}</p>
        <p> Reserva inicia em: <span class="time_to_start">${timeToStart}</span> minutos.</p>
        <p> Reserva termina em: <span class="time_to_end">${timeToEnd}</span>.</p>
    </div>`;

    // Botão de remover reserva
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove_button");
    removeButton.innerText = "Remover";

    // Adiciona evento de clique ao botão de remover
    removeButton.addEventListener("click", () => {
      removeReservation(index); // Chama a função para remover a reserva
    });

    reservationElement.innerHTML = paragraph;
    const reservationsButtons = document.createElement("div");
    reservationsButtons.classList.add("reservations_buttons");

    reservationsContainer.appendChild(reservationElement);
    reservationElement.appendChild(reservationsButtons);
    reservationsButtons.appendChild(removeButton);

    startCountdown(reservationElement.querySelector(".time_to_start"), timeToStart);
    startEndCountdown(reservationElement.querySelector(".time_to_end"), timeToStart);
  }

  function startCountdown(timeToStartSpan, timeRemaining) {
    function updateCountdown() {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timeToStartSpan.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      timeRemaining--;

      if (timeRemaining < 0) {
        clearInterval(interval);
        
      }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  function startEndCountdown(timeToEndSpan, timeRemaining) {
    setTimeout(() => {
      let endTimeRemaining = 60 * 60; // Uma hora em segundos

      function updateEndCountdown() {
        const minutes = Math.floor(endTimeRemaining / 60);
        const seconds = endTimeRemaining % 60;
        timeToEndSpan.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        endTimeRemaining--;

        if (endTimeRemaining < 0) {
          clearInterval(endInterval);
          timeToEndSpan.innerText = "The reservation has ended!";
        }
      }

      const endInterval = setInterval(updateEndCountdown, 1000);
      updateEndCountdown();
    }, timeRemaining * 1000); // Aguarda até que a reserva comece
  }

  // Função para remover uma reserva
  function removeReservation(index) {
    reservationsList.splice(index, 1); // Remove a reserva da lista pelo índice
    saveReservationsToLocalStorage(reservationsList); // Atualiza o localStorage
    renderReservations(reservationsList); // Re-renderiza as reservas na tela
  }

  let reservationsList = loadReservationsFromLocalStorage();
  renderReservations(reservationsList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newReservation = {
      room: roomInput.value,
      studentName: studentNameInput.value,
      registration: registrationInput.value,
      timeToStart: calculateTimeDifference(reservationTimeInput.value) * 60,
    };

    reservationsList.push(newReservation);
    saveReservationsToLocalStorage(reservationsList);

    addReservationToDOM(newReservation, reservationsList.length - 1);

    form.reset();
  });

  cancelButton.addEventListener("click", () => {
    form.reset();
  });
};

insertReservationOnFormSubmit();