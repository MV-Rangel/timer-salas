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
    timeDifferenceInMinutes += 24 * 60; // Se for negativo, ajusta para considerar o próximo dia
  }

  return timeDifferenceInMinutes;
}

const insertReservationOnFormSubmit = () => {
  const form = document.querySelector("#reservationForm"); //Seleciona o form

  //Seleciona os campos do form
  const student_name = document.querySelector("#student_name");
  const registration = document.querySelector("#registration");
  const room = document.querySelector("#room");
  const reservation_time = document.querySelector("#reservation_time");

  const cancel_button = document.querySelector(".cancel_button"); // Seleciona o botão de cancelar

  //Função para adicionar reservas
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const reservations = document.createElement("div");
    const reservations_container = document.querySelector(".reservations_scroll");
    const time_to_start = calculateTimeDifference(reservation_time.value) * 60;
    const time_to_end = 0;
    reservations.classList.add("reservations");
    const paragraph = `<div class="reservations_text">
        <p>Sala <span class="room_number">${room.value}</span> reservada para ${student_name.value} - ${registration.value}</p>
        <p> Reserva inicia em: <span class="time_to_start">${time_to_start}</span> minutos.
        Reserva termina em: ${time_to_end} minutos.</p>
    </div>`;
    
    const timeout_button = document.createElement("button");
    timeout_button.classList.add("timeout_button");
    timeout_button.innerText = "Tempo Esgotado";
    
    reservations.innerHTML = paragraph;
    const reservations_buttons = document.createElement("div");
    reservations_buttons.classList.add("reservations_buttons");
    
    reservations_container.appendChild(reservations);
    reservations.appendChild(reservations_buttons);
    reservations_buttons.appendChild(timeout_button);

    // Corrigindo a seleção do span
    const time_to_start_span = reservations.querySelector('span.time_to_start');
    let time_remaining = time_to_start;
    
    // Função para atualizar o texto a cada segundo
    function atualizarContagemRegressiva() {
        // Calcula os minutos e segundos restantes
        const minutos = Math.floor(time_remaining / 60);
        const segundos = time_remaining % 60;
        time_to_start_span.innerText = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        
        time_remaining--;
        
        if (time_remaining < 0) {
            clearInterval(intervalo);
            
        }
    }
    
    // Configura a função para ser chamada a cada segundo (1000 milissegundos)
    const intervalo = setInterval(atualizarContagemRegressiva, 1000);
    
    // Chamada inicial para exibir o estado inicial sem atraso
    atualizarContagemRegressiva();

    form.reset();
});

// Função para cancelar o form
cancel_button

};
insertReservationOnFormSubmit();
