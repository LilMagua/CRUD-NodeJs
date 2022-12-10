const crearNota = (note) => {
    console.log("Lo que llega del server es: ");
    console.log(note);
    document.getElementById("ubicar").innerHTML += `
    <div class="container mt-3 mb-3 animate__animated  animate__fadeInUp" id="notas">
        <h5 class="mt-3">${note[0].Titulo}</h5>
        <h6>${note[0].Texto}</h6>
        <button data-id="${note[0].Id}" class="button_submit_note mb-3 Notas Notas Eliminar">Eliminar</button>
        <button data-id="${note[0].Id}" class="button_submit_note Notas Editar">Editar</button>
    </div>
    `;
    obtenerIdFrontend();
}

const mostrarNotas = (notas) => {
    document.getElementById("ubicar").innerHTML = "";
    console.log("Existe una o mas notas");
    for(let i = 0; i < notas.length; i++){
        document.getElementById("ubicar").innerHTML += `
        <div class="container mt-3 mb-3 animate__animated  animate__fadeInUp" id="notas">
            <h5 class="mt-3">${notas[i].Titulo}</h5>
            <h6>${notas[i].Texto}</h6>
            <button data-id="${notas[i].Id}" class="button_submit_note mb-3 Notas Eliminar">Eliminar</button>
            <button data-id="${notas[i].Id}" class="button_submit_note Notas Editar">Editar</button>
        </div>
        `;
    }
    obtenerIdFrontend();
    document.getElementById("title").focus();
}

const notaSeleccionada = (notaSeleccionada) => {
    console.log(notaSeleccionada);
    document.getElementById("title").value = notaSeleccionada[0].Titulo;
    document.getElementById("text").value = notaSeleccionada[0].Texto;
    document.getElementById("title").focus();
};