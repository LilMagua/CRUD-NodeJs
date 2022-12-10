const socket = io(); //io(); acepta un parametro, el cual es el servidor websocket al que se desea conectar,  al no tener un valor entre los parentesis, lo conecta con el servidor de donde fue servido


const guardarNota = (title, text, idFrontend) => {
    if(idFrontend == ""){
        console.log("Identifica que debe crear una nueva nota");
        socket.emit("client:newnote", {
            title: title,
            text: text
        });
    }else{
        console.log("Identifica que se esta editando una nota");
        socket.emit("client:dataeditnote", {
            title: title,
            text: text,
            id: idFrontend
        });
    }
    
};

socket.on("server:newnote", crearNota);
//socket.on("server:newnote", crearNota(nota));

socket.on("server:shownotes", mostrarNotas);

const eliminarNota = (idNota) => {
    socket.emit("client:removenote", idNota)
};


const editarNota = (idNota) => {
    socket.emit("client:editnote", idNota)
};

socket.on("server:selectednote", notaSeleccionada);