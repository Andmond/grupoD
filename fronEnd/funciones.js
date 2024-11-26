var url = "http://localhost:8081/api/productos";


class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const cartItem = this.items.find(item => item.product.id === product.id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            this.items.push({ product: product, quantity: quantity });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    updateItemQuantity(productId, quantity) {
        const cartItem = this.items.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
            if (cartItem.quantity <= 0) {
                this.removeItem(productId);
            }
        } else {
            console.error("Producto no encontrado en el carrito");
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    generateInvoice() {
        const total = this.calculateTotal();
        const invoice = {
            items: this.items,
            total: total,
            date: new Date().toISOString()
        };
        return invoice;
    }

    clearCart() {
        this.items = [];
    }
}

function convertirFormDataAJSON(formData) {
    var loginForm = formData.serializeArray();
    var loginFormObject = {};
    $.each(loginForm,
        function(i, v) {
        loginFormObject[v.name] = v.value;
    });
    return JSON.stringify(loginFormObject);
}


function listar_productos(){
    
    console.log("Ejecutar Listar Productos");
    var data = [];
    var success = function (response) {
        console.log(response);
        var items = [];
        $.each(response,function(index, producto){
            items.push("<tr><td>"+producto.id+"</td><td>"+producto.codigo_proveedor +"</td><td>"+producto.codigo_producto+"</td><td>"+producto.producto+"</td> <td>"+producto.precio_costo+"</td>  <td>"+producto.precio_venta+"</td> <td>"+producto.cantidad+"</td> <td>"+producto.cantidad_minima+"</td>  <td><a class='btn btn-primary' href='editar.html?id="+producto.id+"'>Editar</a> <a class='btn btn-danger' href='eliminar.html?id="+producto.id+"'>Eliminar</a></td></tr>");
        });
        $("#listar_productos").html("<table class='table table-hover'><thead><tr><th>ID</th><th>CODIGO PROVEEDOR</th><th>CODIGO PRODUCTO</th><th>PRODUCTO</th><th>PRECIO COSTO</th><th>PRECIO VENTA</th><th>CANTIDAD</th> <th>CANTIDAD MINIMA</th><th colspan='2'>OPCIONES</th></tr></thead><tbody>"+items.join("")+"</tbody></table>");
    };

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
    
}
function editar_producto(id) {
    console.log("llamado editar producto");
    var url2 = url + "/" + id;
    var data = [];
    var success = function (response) {
        console.log(response); 
        $("#formEditar  #id").val(response.id);
        $("#formEditar  #codigo_proveedor").val(response.codigoProveedor);
        $("#formEditar  #codigo_producto").val(response.codigoProducto);
        $("#formEditar  #nombre_producto").val(response.producto);
        $("#formEditar  #precio_costo").val(response.precioCosto);
        $("#formEditar  #precio_venta").val(response.precioVenta);
        $("#formEditar  #cantidad").val(response.cantidad);
        $("#formEditar  #cantidad_minima").val(response.cantidadMinima);


    }


    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });

}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

function actualizar_producto(){
    console.log("llamado a actualizar producto");
    var data = convertirFormDataAJSON($("#formEditar"));
    var success = function (response) {
        alert("El producto fue actualizado");
        window.location.href = "inventario.html";
    }
console.log(data);
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}



function nuevo_producto(){
    console.log("llamado a nuevo producto");
    var data = convertirFormDataAJSON($("#formRegistrar"));
    console.log("Datos que se enviarán al servidor:", JSON.stringify(data)); 
    var success = function (response) {
        console.log(response); 
    
        alert("El producto fue registrado");
        window.location.href = "inventario.html";
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}

function cancelarRegistro() {
    alert("Registro cancelado");
}

function eliminar_producto(){
    console.log("llamado a eliminar producto");
    var data = [];
    var id = $("#formEliminar #id").val();
    var url2 = url + "/" + id;
    var success = function (response) {
        alert("El producto fue eliminado");
        window.location.href = "listar.html";
    }

    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}

function pre_eliminar_producto(id) {
    console.log("llamado pre eliminar producto");
    var url2 = url + "/" + id;
    var data = [];
    var success = function (response) {
        console.log(response); 
        $("#formEliminar #id").val(response.id);
        $("#formEliminar #nombre").html("<b>"+response.nombre+"</b>");      
    }

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}






