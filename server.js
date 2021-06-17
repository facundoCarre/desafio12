const express = require('express');
const app = express();
const http = require('http');

const server = http.Server(app);
const io = require('socket.io')(server);

const handlebars = require('express-handlebars');
const productos = require('./api/productos');

// establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos las rutas http
const productosRouter = express.Router(); 
app.use('/api', productosRouter);

/* -------------------- HTTP endpoints ---------------------- */

// TODO completar con lo realizado en entregas anteriores
productosRouter.get('/productos/listar', (req, res) => {
    return res.send(productos.listar());
  });
  
  productosRouter.get('/productos/listar/:id', (req, res) => {
    return res.json(productos.listarPorId(req.params.id));
  });
  
  productosRouter.post('/productos/guardar', (req, res) => {
    return res.json(productos.guardar(req.body))
  });
  productosRouter.delete('/productos/borrar/:id', (req, res) => {
      return res.json(productos.borrar(req.params.id));
  });
  
  productosRouter.put('/productos/actualizar/:id', (req, res) => { 
      return res.json(productos.actualizar(req.params.id, req.body));
  });
  
  productosRouter.get('/productos/vista', (req, res) => {
    let lista = productos.listar();
    if(!lista.error){
        res.render('list', { productos: lista, hayProductos: true , titulo: "todos los productos"});
      }else{
        res.render('list', { hayProductos: false , titulo: "todos los productos"});
      }
  });


/* -------------------- Web Sockets ---------------------- */

io.on('connection', socket => {
  socket.on('listar', () =>{
    io.sockets.emit('productos', productos.listar())
  })
    // TODO enviar los productos al cliente que se conectó
    // TODO escuchar el mensaje enviado por el cliente y propagar a todos los conectados
});

/* ------------------------------------------------------- */

const PORT = 8080;

const srv = server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

srv.on("error", error => console.log(`Error en servidor ${error}`))
