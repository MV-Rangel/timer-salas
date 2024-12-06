// Calcula a diferença de tempo em minutos entre o horário atual e o horário da reserva
export function calculateTimeDifference(reservationTime) {
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
  
  // Inicia uma contagem regressiva para o início da reserva
  // Inicia a contagem regressiva para o início da reserva
export function startCountdown(
    timeToStartSpan,
    timeRemaining,
    timeToEndSpan,
    reservationId
  ) {
    const key = `reservation_${reservationId}_start`;
  
    // Verifica se há um horário final salvo no localStorage
    let endTime = getEndTimeFromLocalStorage(key);
  
    if (!endTime) {
      // Calcula o horário final e salva no localStorage
      endTime = Date.now() + timeRemaining * 1000;
      saveEndTimeToLocalStorage(key, endTime);
    }
  
    function updateCountdown() {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      ); // Tempo restante em segundos
  
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
  
      timeToStartSpan.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  
      if (remainingTime <= 0) {
        clearInterval(interval);
        
        localStorage.removeItem(key); // Remove a chave do localStorage quando a contagem termina
  
        // Inicia a contagem regressiva de "Termina em:"
        startEndCountdown(timeToEndSpan, 3600, reservationId);
      }
    }
  
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
  
  // Inicia a contagem regressiva para o término da reserva (1 hora)
export function startEndCountdown(timeToEndSpan, timeRemaining, reservationId) {
    const key = `reservation_${reservationId}_end`;
  
    // Verifica se há um horário final salvo no localStorage
    let endTime = getEndTimeFromLocalStorage(key);
  
    if (!endTime) {
      // Calcula o horário final e salva no localStorage
      endTime = Date.now() + timeRemaining * 1000;
      saveEndTimeToLocalStorage(key, endTime);
    }
  
    function updateEndCountdown() {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      ); // Tempo restante em segundos
  
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
  
      timeToEndSpan.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  
      if (remainingTime <= 0) {
        clearInterval(interval);
        timeToEndSpan.innerText = "The reservation has ended!";
        localStorage.removeItem(key); // Remove a chave do localStorage quando a contagem termina
      }
    }
  
    const interval = setInterval(updateEndCountdown, 1000);
    updateEndCountdown();
  }
  // Salva o horário final no localStorage
export function saveEndTimeToLocalStorage(key, endTime) {
    localStorage.setItem(key, endTime);
  }
  
  // Recupera o horário final do localStorage
  export function getEndTimeFromLocalStorage(key) {
    const endTime = localStorage.getItem(key);
    return endTime ? parseInt(endTime, 10) : null;
  }