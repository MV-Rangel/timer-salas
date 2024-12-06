function calculateTimeDifference(reservationTime) {
  const [selectedHours, selectedMinutes] = reservationTime
    .split(":")
    .map(Number);

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const selectedTimeInMinutes = selectedHours * 60 + selectedMinutes;
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  let timeDifferenceInMinutes = selectedTimeInMinutes - currentTimeInMinutes;

  if (timeDifferenceInMinutes < 0) {
    timeDifferenceInMinutes += 24 * 60; // Ajusta para o próximo dia
  }

  return timeDifferenceInMinutes * 60; // Retorna o tempo em segundos
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function startEndCountdown(duration, element) {
  let timeLeftInSeconds = duration;

  function updateCountdown() {
    if (timeLeftInSeconds <= 0) {
      clearInterval(endCountdownInterval);
      element.innerText = "Reserva termina em: 00:00 minutos.";
    } else if (timeLeftInSeconds < 60) {
      element.innerText = `Reserva termina em: ${timeLeftInSeconds} segundos.`;
    } else {
      element.innerText = `Reserva termina em: ${formatTime(timeLeftInSeconds)} minutos.`;
    }
    timeLeftInSeconds--;
  }

  updateCountdown();
  const endCountdownInterval = setInterval(updateCountdown, 1000);
}

function startCountdown(reservationTime, element, endCountdownElement) {
  function updateCountdown() {
    const now = new Date();
    const reservationDate = new Date();
    const [hours, minutes] = reservationTime.split(":").map(Number);
    reservationDate.setHours(hours, minutes, 0, 0);

    const timeDifferenceInSeconds = Math.floor((reservationDate - now) / 1000);
    let displayTime;

    if (timeDifferenceInSeconds <= 0) {
      clearInterval(countdownInterval); // Para a contagem regressiva
      displayTime = "00:00";
      element.innerText = `Reserva começa em: ${displayTime} minutos.`;
      startEndCountdown(3600, endCountdownElement); // Inicia a contagem regressiva de uma hora
    } else if (timeDifferenceInSeconds < 60) {
      displayTime = `${timeDifferenceInSeconds} segundos`;
    } else {
      displayTime = formatTime(timeDifferenceInSeconds);
    }

    element.innerText = `Reserva começa em: ${displayTime}.`;
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Defina a função displayReservation fora de insertReservationOnFormSubmit para que ela esteja no escopo global
function displayReservation(reservation) {
  const div = document.createElement("div");
  div.classList.add("reservations");

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("reservation_details");
  detailsDiv.innerHTML = `
    <p>Sala ${reservation.room} reservada para ${reservation.studentName} - ${reservation.registration} às ${reservation.reservedTime}.</p>
    <p class="countdown">Reserva começa em: ${formatTime(calculateTimeDifference(reservation.reservedTime))}.</p>
    <p class="end-countdown">Reserva termina em: 60:00 minutos.</p>
  `;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("reservation_buttons");

  const remove_button = document.createElement("button");
  remove_button.innerText = "Remover reserva";
  buttonsDiv.appendChild(remove_button);

  

  div.appendChild(detailsDiv);
  div.appendChild(buttonsDiv);

  const reservationsContainer = document.querySelector(".reservations_scroll");
  reservationsContainer.appendChild(div);

  const countdownElement = detailsDiv.querySelector(".countdown");
  const endCountdownElement = detailsDiv.querySelector(".end-countdown");
  startCountdown(reservation.reservedTime, countdownElement, endCountdownElement);

  remove_button.addEventListener("click", () => {
    div.remove();
    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedReservations = allReservations.filter(r => r.room !== reservation.room);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  });
}

const insertReservationOnFormSubmit = () => {
  const form = document.querySelector("#reservationForm");
  const studentNameInput = document.querySelector("#student_name");
  const registrationInput = document.querySelector("#registration");
  const roomInput = document.querySelector("#room");
  const reservationTimeInput = document.querySelector("#reservation_time");
  const cancelButton = document.querySelector(".cancel_button");

  // No evento submit, chame a função displayReservation
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newReservation = {
      room: roomInput.value,
      studentName: studentNameInput.value,
      registration: registrationInput.value,
      reservedTime: reservationTimeInput.value,
      timeToStart: calculateTimeDifference(reservationTimeInput.value) * 60,
    };

    // Recuperar reservas existentes ou criar uma nova lista
    const allReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    allReservations.push(newReservation);
    localStorage.setItem("reservations", JSON.stringify(allReservations));
    displayReservation(newReservation);
    form.reset();
  });

  cancelButton.addEventListener("click", () => {
    form.reset();
  });
};
// script.js

document.addEventListener("DOMContentLoaded", () => {
  const storedReservations =
    JSON.parse(localStorage.getItem("reservations")) || [];
  storedReservations.forEach((reservation) => {
    displayReservation(reservation);
  });
});

// script.js
document.addEventListener("DOMContentLoaded", function() {
  const timeInput = document.getElementById('reservation_time');

  if (timeInput) {
    // Função para ajustar o valor do input de tempo para horários inteiros
    function setTimeToWholeHours() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      timeInput.value = `${hours}:00`;
    }

    // Adiciona um evento para ajustar o horário ao se interagir com o input
    timeInput.addEventListener('input', function() {
      const [hours, minutes] = timeInput.value.split(':');
      timeInput.value = `${hours}:00`;
    });

    // Define o horário inicial
    setTimeToWholeHours();
  } else {
    console.error("Elemento 'time' não encontrado.");
  }
});


// script.js
document.addEventListener("DOMContentLoaded", function() {
  const timeInput = document.getElementById('reservation_time');
  const submitBtn = document.getElementById('submitBtn');

  if (timeInput) {
    function setMinimumTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      timeInput.min = currentTime;
    }

    function validateTime() {
      const now = new Date();
      const [selectedHours, selectedMinutes] = timeInput.value.split(":").map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(selectedHours, selectedMinutes, 0, 0);

      if (selectedTime < now) {
        console.log("Por favor, selecione um horário futuro.");
        return false;
      }
      return true;
    }

    // Defina o valor mínimo quando a página é carregada
    setMinimumTime();

    // Atualize o valor mínimo a cada minuto para garantir que sempre é um horário futuro
    setInterval(setMinimumTime, 60000);

    submitBtn.addEventListener("click", () => {
      if (validateTime()) {
        // Submeter o formulário ou fazer outras ações se o horário for válido
        console.log("Horário válido! Submissão bem-sucedida.");
      } 
    });
  } else {
    console.error("Elemento 'time' não encontrado.");
  }
});



insertReservationOnFormSubmit();
