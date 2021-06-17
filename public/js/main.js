let socket = io.connect();

// TODO al recibir los productos, agregarlos al HTML usando antes la funcion data2TableJS(productos);
socket.on('productos', function (productos) {
    document.getElementById("datos").innerHTML = data2TableJS(productos)
});

const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault()
    // TODO armar el objeto con los datos del formulario
    const data = {title: form[0].value, price: form[1].value, thumbnail: form[2].value}

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        // cuando guarde el producto, limpio el formulario y emito el evento de OK
        form.reset()
        socket.emit('listar', 'ok')
        socket.emit('update', 'ok');
    })
    .catch(error => console.error(error))
})

function data2TableJS(productos) {
    let res = ''
    if (productos.length) {
        res += `
        <style>
            .table td, .table th {
                vertical-align : middle;
            }
        </style>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th> </tr>
        `
        res += productos.map(producto => `
                <tr>
                    <td>${producto.title}</td>
                    <td>$${producto.price}</td>
                    <td><img width="50" src="${producto.thumbnail}" alt="not found"></td>
                </tr>
        `).join(' ')
        res += `
            </table>
        </div>`
    }
    return res
}

function data2TableHBS(productos, cb) {

    fetch('plantillas/tabla.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            var template = Handlebars.compile(plantilla);
            let html = template({ productos:productos , hayProductos:true  })
            console.log(html)

            cb(html)
        })
}
