function calculateTimeDifference(reservationTime) {
  // Divide a string de tempo em horas e minutos e converte para números
  const [selectedHours, selectedMinutes] = reservationTime.split(":").map(Number);

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Calcula o tempo selecionado e o tempo atual em minutos
  const selectedTimeInMinutes = selectedHours * 60 + selectedMinutes;
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  let timeDifferenceInMinutes = selectedTimeInMinutes - currentTimeInMinutes;

  // Ajusta para o próximo dia se a diferença for negativa
  if (timeDifferenceInMinutes < 0) {
    timeDifferenceInMinutes += 24 * 60;
  }

  return timeDifferenceInMinutes;
}

const insertReservationOnFormSubmit = () => {
  const form = document.querySelector("#reservationForm"); // Seleciona o form

  // Seleciona os campos do form
  const studentNameInput = document.querySelector("#student_name");
  const registrationInput = document.querySelector("#registration");
  const roomInput = document.querySelector("#room");
  const reservationTimeInput = document.querySelector("#reservation_time");

  const cancelButton = document.querySelector(".cancel_button"); // Seleciona o botão de cancelar

  // Função para adicionar reservas
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const reservationElement = document.createElement("div");
    const reservationsContainer = document.querySelector(".reservations_scroll");
    const timeToStart = calculateTimeDifference(reservationTimeInput.value) * 60; // Converte para segundos
    const timeToEnd = 0;
    reservationElement.classList.add("reservations");
    
    // Cria o parágrafo com as informações da reserva
    const paragraph = `<div class="reservations_text">
        <p>Sala <span class="room_number">${roomInput.value}</span> reservada para ${studentNameInput.value} - ${registrationInput.value}</p>
        <p> Reserva inicia em: <span class="time_to_start">${timeToStart}</span> minutos.
        Reserva termina em: ${timeToEnd} minutos.</p>
    </div>`;
    
    const timeoutButton = document.createElement("button");
    timeoutButton.classList.add("timeout_button");
    timeoutButton.innerText = "Tempo Esgotado";
    
    reservationElement.innerHTML = paragraph;
    const reservationsButtons = document.createElement("div");
    reservationsButtons.classList.add("reservations_buttons");
    
    reservationsContainer.appendChild(reservationElement);
    reservationElement.appendChild(reservationsButtons);
    reservationsButtons.appendChild(timeoutButton);

    // Seleciona o span que mostra o tempo restante
    const timeToStartSpan = reservationElement.querySelector('span.time_to_start');
    let timeRemaining = timeToStart;
    
    // Função para atualizar o texto a cada segundo
    function updateCountdown() {
        // Calcula os minutos e segundos restantes
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeToStartSpan.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        timeRemaining--;
        
        if (timeRemaining < 0) {
            clearInterval(interval);
            
        }
    }
    
    // Configura a função para ser chamada a cada segundo (1000 milissegundos)
    const interval = setInterval(updateCountdown, 1000);
    
    // Chamada inicial para exibir o estado inicial sem atraso
    updateCountdown();

    form.reset();
  });

  // Função para cancelar o form
  cancelButton.addEventListener("click", () => {
      form.reset();
  });
};

insertReservationOnFormSubmit();