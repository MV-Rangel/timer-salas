import { loadReservationsFromLocalStorage } from "./storageUtils.js";
import { addReservationToDOM } from "./domUtils.js";
import { handleFormSubmit } from "./formHandler.js";

const form = document.querySelector("#reservationForm");
const reservationsContainer = document.querySelector(".reservations_scroll");

let reservationsList = loadReservationsFromLocalStorage();

// Renderiza todas as reservas salvas no localStorage ao carregar a página
function renderReservations() {
 reservationsContainer.innerHTML=""
 reservationsList.forEach((reservation,index)=>{
 addReservationToDOM(reservation,index,reservationsContainer ,removeReservation)
})
}

// Remove uma reserva pelo índice e atualiza o localStorage e o DOM
function removeReservation(index){
 reservationsList.splice(index ,1)
 renderReservations()
}

// Inicializa o sistema 
renderReservations()
handleFormSubmit(form,reservationsList ,addReservationToDOM,reservationsContainer)
