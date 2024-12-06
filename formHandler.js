import { calculateTimeDifference } from "./timeUtils.js";
import { saveReservationsToLocalStorage } from "./storageUtils.js";

// Manipula o envio do formulário e adiciona uma nova reserva à lista
export function handleFormSubmit(form, reservationsList, addReservationToDOM, reservationsContainer) {
  
 form.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentNameInput = document.querySelector("#student_name");
    const registrationInput = document.querySelector("#registration");
    const roomInput = document.querySelector("#room");
    const reservationTimeInput = document.querySelector("#reservation_time");

    const newReservation = {
      room: roomInput.value,
      studentName: studentNameInput.value,
      registration: registrationInput.value,
      reservationTimeInput:reservationTimeInput.value,
      timeToStart: calculateTimeDifference(reservationTimeInput.value) * 60,
    };

    reservationsList.push(newReservation);
    saveReservationsToLocalStorage(reservationsList);

    addReservationToDOM(newReservation,reservationsList.length -1,reservationsContainer)
    
    
 form.reset()
});
}