console.clear();

const moduleNodeServer = require("http");
const express = require("express");
const webSocket = require("socket.io");
const generateId = require("uuid");


const expressApp = express();
const server = moduleNodeServer.createServer(expressApp);
const io = new webSocket.Server(server);

expressApp.use(express.static(__dirname + "/public"));

//Esto sera reemplazado con una base de datos, de momento, se guarda en un array "notas"
let notas = [];

io.on("connection", (socket) => {
    console.log("Se creo una nueva conexion: " + socket.id);
    if(notas.length > 0){
        io.emit("server:shownotes", notas);
    }


    socket.on("client:newnote",(data) => {
        console.log(data);
        console.log("NUEVO REGISTRO");
        data.id = generateId.v4();
        const nota = data;
        notas.push(data);
        
        io.emit("server:newnote", nota);
        console.log(notas); 
    });


    socket.on("client:removenote", (idNota) => {
        notas = notas.filter((e) => e.id !== idNota);
        io.emit("server:shownotes", notas);
    })


    socket.on("client:editnote", (idNota) => {
        for(let i = 0; i < notas.length; i++){
            if(notas[i].id === idNota){
                console.log(notas[i]);
                socket.emit("server:selectednote", notas[i]);
            }
        }
    })

    socket.on("client:dataeditnote",(data) => {
        for(let i = 0; i < notas.length; i++){
            if(notas[i].id === data.id ){
                notas[i].title = data.title;
                notas[i].text = data.text;
                console.log(notas);
                io.emit("server:shownotes", notas);
            }
        }
    });
});



//Servidor activo
server.listen(3000, () => {
    console.log("El servidor esta activo rey");
});




