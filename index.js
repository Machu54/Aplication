const express = require('express');
const cors=require('cors');

const app = express();
app.use(cors());

app.use(express.json());
    const db=require('./conection');

//pruebas de clase 
app.get("/api/prueba", async(request, response)=>{
try{const resultado= await db.query("select* from personajes");
console.log(error);
}catch(error){
    console.log(error);
}
response.send("respuesta");
});

app.get("/api/saludo", (request, response)=>{
    response.json({mensaje:
        "hola mundo"
    });
    });
    
    app.get("/api/dato/:nombre", (request, response) => {
        const nombre = request.params.nombre; 
        response.json({ mensaje: "Hola" + nombre });
    });


    app.post("/api/post", (request, response) => {
        const { Nombre, Apellido, Edad } = request.body;
        console.log(request.body);
        response.json({ mensaje: "Hola, tu nombre es " + Nombre + " " + Apellido + ", tu edad es de " + Edad });
    });


        



//optener informacion de todos 

app.get ("/api/personajes", async (req , res)=>{
    try{
const resultado= await db.query("Select* from personajes");
res.json(resultado.rows);
} catch (error) {
    console.error("Error al obtener personajes:", error);
    }
} ); 

app.get ("/api/participantes", async (req , res)=>{
    try{
const resultado= await db.query("Select* from participantes");
res.json(resultado.rows);
} catch (error) {
    console.error("Error al obtener participantes:", error);
    }
} ); 

// solo por el id 

app.get ("/api/personajes/:id", async (req , res)=>{
    const {id} =req.params;
    try{
        const resultado = await db.query("SELECT * FROM personajes WHERE id = $1", [id]);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener personaje:", error);
        res.send("Error en el servidor");
    }  

});


app.get ("/api/participantes/:id", async (req , res)=>{
    const {id} =req.params;
    try{
        const resultado = await db.query("SELECT * FROM participantes WHERE id = $1", [id]);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener participantes:", error);
        response.send("Error en el servidor");
    }  

});




// Insertar personajes y participantes 


app.post("/api/personajesinsertar", async (req, res) => {
    const { nombre, edad, habilidad, origen, descripcion } = req.body;
    try {
        const resultado = await db.query(
            "INSERT INTO personajes (nombre, edad, habilidad, origen, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, edad, habilidad, origen, descripcion]
        );
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al insertar personaje:", error);
        res.send("Error en el servidor");
    }
});

app.post("/api/participantesin", async (req, res) => {
    const { nombre, edad, fecha_registro, rol, activo } = req.body;
    try {
        const resultado = await db.query(
            "INSERT INTO participantes (nombre, edad, fecha_registro, rol, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, edad, fecha_registro, rol, activo]
        );
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al insertar personaje:", error);
        res.send("Error en el servidor");
    }
});


//actualizar 

app.put("/api/personajes/:id", async (request, response) => {
    const { id } = request.params;
    const { nombre, edad, habilidad, origen, descripcion } = request.body;
    try {
        const resultado = await db.query(
            "UPDATE personajes SET nombre=$1, edad=$2, habilidad=$3, origen=$4, descripcion=$5 WHERE id=$6 ",
            [nombre, edad, habilidad, origen, descripcion, id]
        );
        response.json(resultado.rows[0]);
    } catch (error) {
        console.error("Error al actualizar personaje:", error);
        response.send("Error en el servidor");
    }
});


app.put("/api/participantes/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, fecha_registro, rol, activo } = req.body;
    try {
        const resultado = await db.query(
            "UPDATE participantes SET nombre=$1, edad=$2, fecha_registro=$3, rol=$4, activo=$5 WHERE id=$6",
            [nombre, edad, fecha_registro, rol, activo, id]
        );
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al actualizar participante:", error);
        res.send("Error en el servidor");
    }
});

//eliminar 

app.delete("/api/personajes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM personajes WHERE id = $1", [id]);
        res.send("Personaje eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar personaje:", error);
        res.send("Error en el servidor");
    }
});


app.delete("/api/participantes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM participantes WHERE id = $1", [id]);
        res.send("Participante eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar participante:", error);
        res.send("Error en el servidor");
    }
});
app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});