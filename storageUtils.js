// Salva as reservas no localStorage
export function saveReservationsToLocalStorage(reservations) {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }
  
  // Carrega as reservas do localStorage
  export function loadReservationsFromLocalStorage() {
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  }