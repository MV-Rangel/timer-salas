const form = document.querySelector('#reservationForm')

const checkFormFieldsValues = ()=>{
    const student_name = document.querySelector("#student_name")
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log(student_name.value)
       
    })
}
checkFormFieldsValues();