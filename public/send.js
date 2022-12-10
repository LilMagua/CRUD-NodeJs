const titulo = document.getElementById("title");
const text = document.getElementById("text");

const formulario = document.getElementById("formulario");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    guardarNota(titulo.value, text.value, idFrontend);
    idFrontend = "";
});



// Obtener id de la nota presioanada, se podria optimizar, ya que la funcion obtenerIdFrontend agrega el event listener a todos los elementos con la clase "Notas" cuando podria hacerlo solo a la nota que es nueva.
let idFrontend  = "";
const obtenerIdFrontend = () => {
    const notasFrontend = document.getElementsByClassName("Notas");
    for(let i = 0; i < notasFrontend.length; i++){
        notasFrontend[i].addEventListener("click", (event) => {
            idFrontend = (event.target.dataset.id);

            if(event.target.classList.contains("Eliminar")){
                eliminarNota(idFrontend);
                idFrontend = "";
            }else if (event.target.classList.contains("Editar")){
                console.log("Ocurre el evento");
                editarNota(idFrontend);
            }else{
                console.log("Ha ocurrido un error");
            }
        });
    } 
    titulo.value = "";
    text.value = "";
};