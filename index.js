const express = require('express');
const cors = require('cors');
const mongo = require('./conection');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/api/productos', async (req, res) => {
  try {
    const docs = await mongo.coleccionmodelo.find({});
        console.log(docs);
    res.json(docs);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: 'Error al consultar productos' });
  }
});

app.get('/api/productos/:id', async (req, res) => {
  try {
        const id= req.params.id;
    const docs = await mongo.coleccionmodelo.findOne({_id:id});
    res.json(docs);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ error: 'Error al consultar producto' });
  }
});


app.post('/api/productosinser', async (req, res) => {
  try {
    const dato = req.body;
    const docs = new mongo.coleccionmodelo(dato);
    const resultado = await docs.save();
    res.status(201).json(resultado);
  } catch (err) {
    console.error("Error al insertar producto:", err);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

app.put('/api/productosup/:id',async(req,res)=>{
  try{
      const id = req.params.id;
    const datos = req.body;

    const docs = await mongo.coleccionmodelo.findByIdAndUpdate(
      id,
      { $set: datos },
      { new: true }
    );
    res.json(docs);
    } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ error: 'Error al consultar producto' });
}});




app.delete('/api/productosdel/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const docs = await mongo.coleccionmodelo.findByIdAndDelete(id);
    res.json(docs);
    }catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
