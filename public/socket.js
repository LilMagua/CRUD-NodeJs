const socket = io(); //io(); acepta un parametro, el cual es el servidor websocket al que se desea conectar,  al no tener un valor entre los parentesis, lo conecta con el servidor de donde fue servido
/*
const guardarNota = (title, text) => {
    socket.emit("client:newnote", {
        title: title,
        text: text
    });
};
*/
const guardarNota = (title, text, idFrontend) => {
    if(idFrontend == ""){
        socket.emit("client:newnote", {
            title: title,
            text: text
        });
    }else{
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