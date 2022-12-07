const crearNota = (note) => {
    document.getElementById("ubicar").innerHTML += `
    <div class="container mt-3 mb-3 animate__animated  animate__fadeInUp" id="notas">
        <h5 class="mt-3">${note.title}</h5>
        <h6>${note.text}</h6>
        <button data-id="${note.id}" class="button_submit_note mb-3 Notas Notas Eliminar">Eliminar</button>
        <button data-id="${note.id}" class="button_submit_note Notas Editar">Editar</button>
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
            <h5 class="mt-3">${notas[i].title}</h5>
            <h6>${notas[i].text}</h6>
            <button data-id="${notas[i].id}" class="button_submit_note mb-3 Notas Eliminar">Eliminar</button>
            <button data-id="${notas[i].id}" class="button_submit_note Notas Editar">Editar</button>
        </div>
        `;
    }
    obtenerIdFrontend();
    document.getElementById("title").focus();
}

const notaSeleccionada = (notaSeleccionada) => {
    console.log(notaSeleccionada);
    document.getElementById("title").value = notaSeleccionada.title;
    document.getElementById("text").value = notaSeleccionada.text;
    document.getElementById("title").focus();
};





