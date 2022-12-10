console.clear();

//Modulos requeridos
const moduleNodeServer = require("http");
const express = require("express");
const webSocket = require("socket.io");
const generateId = require("uuid");
const mysql = require("mysql");


const expressApp = express();
const server = moduleNodeServer.createServer(expressApp);
const io = new webSocket.Server(server);

expressApp.use(express.static(__dirname + "/public"));

//Configuración para la base de datos
const conect_mysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Notas",
});




//Se utiliza varias veces la query "SELECT * FROM Notas" seria bastante util realizar una funcion que me devuelva el retorno de la query,lo intente realizar sin exito :(
//Para evitar ataques de inyección SQL , siempre debe escapar de los datos proporcionados por el usuario antes de usarlos dentro de una consulta SQL. Puede hacerlo utilizando los métodos mysql.escape(), connection.escape()o pool.escape():
let datos;
conect_mysql.connect(function(err){
    if(err){
        console.log("Ha ocurrido un error al conectarse a la base de datos");
    }else{
        console.log("¡Se ha conectado correctamente!");
        conect_mysql.query("SELECT * FROM Notas",function(err, results, fields){
            console.log(results);
            datos = results;
            //console.log(datos[3]);
        });
    }
});


io.on("connection", (socket) => {
    console.log("Se creo una nueva conexion: " + socket.id);
    //console.log(datos);
    if(datos.length > 0){
        io.emit("server:shownotes", datos);
    }


    socket.on("client:newnote",(data) => {
        console.log("NUEVO REGISTRO");
        data.id = generateId.v4();
        let nuevaNota;
        conect_mysql.query("INSERT INTO Notas(Id, Titulo, Texto) VALUES ('"+data.id+"','"+data.title+"','"+data.text+"')");
        conect_mysql.query("SELECT * FROM Notas WHERE Id='"+data.id+"'",function(err,results,fields){
            nuevaNota = results;
            console.log(nuevaNota);
            io.emit("server:newnote", nuevaNota);
        });
    });


    socket.on("client:removenote", (idNota) => {
        conect_mysql.query("DELETE FROM Notas WHERE Id='"+idNota+"'");
        conect_mysql.query("SELECT * FROM Notas",function(err,results,fields){
            io.emit("server:shownotes", results);
        });
    })

    socket.on("client:editnote", (idNota) => {
        conect_mysql.query("SELECT * FROM Notas WHERE Id='"+idNota+"'",function(err,results,fields){
            console.log(results);
            socket.emit("server:selectednote",results);
        });
    })

    socket.on("client:dataeditnote",(data) => {
        conect_mysql.query("UPDATE Notas SET Titulo='"+data.title+"',Texto='"+data.text+"' WHERE Id='"+data.id+"'");
        conect_mysql.query("SELECT * FROM Notas",function(err,results,fields){
            io.emit("server:shownotes", results);
        });
    });
});

//Activar servidor en el puerto 3000
server.listen(3000, () => {
    console.log("El servidor esta activo rey");
});