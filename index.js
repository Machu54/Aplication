const express = require('express');
const cors = require('cors');
const mongo = require('./conection');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/productos', async (req, res) => {
  try {
    const docs = await mongo.coleccionmodelo.find({});
    console.log(docs);
    res.json(docs);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: 'Error al consultar productos' });
  }
});


app.get('/productos/:id', async(req,res)=>{
try{
 const docs = await mongo.coleccionmodelo.findById({});
 
    res.json(docs);
}catch(err){
  console.error("Error al obtener productos:", err);
res.status(500).json({error:'Error al consultar productos' });
}

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
