const form = document.querySelector("#reservationForm");

const checkFormFieldsValues = () => {
  const reservations = document.querySelector("#reservations");
  const student_name = document.querySelector("#student_name");
  const registration = document.querySelector("#registration");
  const room = document.querySelector("#room");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const createSpan = (className, textContent) => {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = textContent;
      return span;
    };

    const paragraph = document.createElement("p");

    paragraph.appendChild(document.createTextNode("Sala "));
    paragraph.appendChild(createSpan("room_number", room.value));
    paragraph.appendChild(document.createTextNode(" reservada para "));
    paragraph.appendChild(createSpan("reserved_to", student_name.value));
    paragraph.appendChild(document.createTextNode(" - "));
    paragraph.appendChild(
      createSpan("student_registration", registration.value)
    );

    reservations.appendChild(paragraph);
    form.reset();
  });
  const cancel_button = document.querySelector(".cancel_button");
  cancel_button.addEventListener("click", () => {
    form.reset();
  });
};
checkFormFieldsValues();
