function calculateTimeDifference(reservationTime) {
  if (!reservationTime) return 0;
  
  try {
    const [selectedHours, selectedMinutes] = reservationTime.split(":").map(Number);
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    const selectedTimeInMinutes = selectedHours * 60 + selectedMinutes;
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    
    let timeDifferenceInMinutes = selectedTimeInMinutes - currentTimeInMinutes;
    
    if (timeDifferenceInMinutes < 0) {
      timeDifferenceInMinutes += 24 * 60;
    }
    
    return timeDifferenceInMinutes * 60;
  } catch (error) {
    console.error("Erro ao calcular diferença de tempo:", error);
    return 0;
  }
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
      element.innerText = `Reserva começa em: ${displayTime}.`;
      startEndCountdown(3600, endCountdownElement); // Inicia a contagem regressiva de uma hora
    } else if (timeDifferenceInSeconds < 60) {
      displayTime = `${timeDifferenceInSeconds} segundos`;
    } else {
      displayTime = formatTime(timeDifferenceInSeconds);
    }

    element.innerText = `Reserva começa em: ${displayTime} minutos.`;
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
    <p class="countdown">Reserva começa em: ${formatTime(calculateTimeDifference(reservation.reservedTime))} minutos.</p>
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

// Função para salvar reserva no localStorage
function saveReservation(reservation) {
  const allReservations = JSON.parse(localStorage.getItem("reservations")) || [];
  allReservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(allReservations));
}

// Função para carregar reservas do localStorage
function loadReservations() {
  try {
    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    storedReservations.forEach((reservation) => {
      if (reservation && reservation.reservedTime) {
        displayReservation(reservation);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar reservas:", error);
    localStorage.removeItem("reservations"); // Limpa dados corrompidos
  }
}

// Declare as variáveis no escopo global
let studentNameInput, registrationInput, roomInput, reservationTimeInput;

const insertReservationOnFormSubmit = () => {
  // Inicialize as variáveis quando a função é chamada
  const form = document.querySelector("#reservationForm");
  studentNameInput = document.querySelector("#student_name");
  registrationInput = document.querySelector("#registration");
  roomInput = document.querySelector("#room");
  reservationTimeInput = document.querySelector("#reservation_time");
  const cancelButton = document.querySelector(".cancel_button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const newReservation = {
      room: roomInput.value,
      studentName: studentNameInput.value,
      registration: registrationInput.value,
      reservedTime: reservationTimeInput.value,
      timeToStart: calculateTimeDifference(reservationTimeInput.value) * 60,
    };

    const allReservations = JSON.parse(localStorage.getItem("reservations")) || [];
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

// Modifique o evento DOMContentLoaded
/*document.addEventListener("DOMContentLoaded", () => {
  loadReservations();
  insertReservationOnFormSubmit();
});*/

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


document.addEventListener("DOMContentLoaded", function() {
  const timeSelect = document.getElementById('reservation_time');
  const submitBtn = document.getElementById('submitBtn');

  if (timeSelect) {
    function disablePassedTimes() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Percorre todas as opções do select
      Array.from(timeSelect.options).forEach(option => {
        const [hours] = option.value.split(':').map(Number);
        
        // Desabilita opções de horários que já passaram
        if (hours < currentHour || (hours === currentHour && currentMinutes > 0)) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });

      // Seleciona automaticamente o próximo horário disponível
      const firstAvailableOption = Array.from(timeSelect.options).find(option => !option.disabled);
      if (firstAvailableOption) {
        timeSelect.value = firstAvailableOption.value;
      }
    }

    function validateTime() {
      const now = new Date();
      const [selectedHours] = timeSelect.value.split(':').map(Number);
      const currentHour = now.getHours();

      if (selectedHours < currentHour) {
        console.log("Por favor, selecione um horário futuro.");
        return false;
      }
      return true;
    }

    // Executa a validação inicial
    disablePassedTimes();

    // Atualiza a cada minuto
    setInterval(disablePassedTimes, 60000);

    submitBtn.addEventListener("click", (e) => {
      if (!validateTime()) {
        e.preventDefault();
      } else {
        console.log("Horário válido! Submissão bem-sucedida.");
      }
    });
  } else {
    console.error("Elemento 'select' não encontrado.");
  }
});




insertReservationOnFormSubmit();
