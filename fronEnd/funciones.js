var url  = "http://localhost:8081/api/productos";


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

function convertirFormDataAJSON (formData){
    var loginForm = formData.serializeArray();
    var loginFormObject = {};
    $.each (loginForm,
        function (i , v){
            loginFormObject[v.name] = v.value;
        });
        return JSON.stringify (loginFormObject);
    }


    function Listar_Productos() {
        console.log("Ejecutar Listar Productos");
        
        var success = function(response) {
            console.log(response); 
            
            var items = [];
            
            $.each(response, function(index, producto) {
                console.log(producto); 
                
                
                items.push(
                    "<tr>" +
                    "<td>" + (producto.id || 'N/A') + "</td>" +
                    "<td>" + (producto.codigoProveedor || 'N/A') + "</td>" +
                    "<td>" + (producto.codigoProducto || 'N/A') + "</td>" +
                    "<td>" + (producto.producto || 'N/A') + "</td>" +
                    "<td>" + (producto.cantidad || 'N/A') + "</td>" +
                    "<td>" + (producto.cantidadMinima || 'N/A') + "</td>" +
                    "<td>" +
                    "<a href='editar.html?id=" + producto.id + "' style='margin-right: 5px;'>" +
                    "<button class='btn btn-primary'>✎ Editar</button>" +
                    "</a>" +
                    "<a href='eliminar.html?id=" + producto.id + "'>" +
                    "<button type='button' class='btn btn-danger'>Eliminar</button>" +
                    "</a>" +
                    "</td>" +
                    "</tr>"
                );
            });
            
            
            $("#Listar_Productos").html(
                "<table class='table table-striped'>" +
                "<thead>" +
                    "<tr>" +
                        "<th>Id</th>" +
                        "<th>Proveedor</th>" +
                        "<th>Código Producto</th>" +
                        "<th>Artículo</th>" +
                        "<th>Cantidad</th>" +
                        "<th>Cantidad Mínima</th>" +
                        "<th>Acciones</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" +
                    items.join("") +
                "</tbody>" +
                "</table>"
            );
        };

    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/productos", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error al listar los productos.");
        }
    });
}
function editar_producto(id){
    console.log ("llamado a editar producto") ;
    var url2 = url + "/" + id ;
    var data = [] ;
    var success = function (response){
        $("#formEditar  #id").val (response.id);
        $("#formEditar  #codigo_proveedor").val (response.codigoProveedor);
        $("#formEditar  #nombre_producto").val (response.producto);
        $("#formEditar  #precio_costo").val (response.precioCosto);
        $("#formEditar  #precio_venta").val (response.precioVenta);
        $("#formEditar  #cantidad").val (response.cantidad);
        $("#formEditar  #cantidad_minima").val (response.cantidadMinima);
        

    }


    $.ajax ({
        type : "GET",
        headers :{
             'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        
        dataType : "json",
        success:success
    });

}

function getQueryVariable (variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++){
        var pair = vars[i].split("=");
        if (pair[0] == variable){
            return pair[1];
        }

    }
    return false ;


}

function actualizar_producto(){
    console.log("llamado a actualizar producto");
    var data = convertirFormDataAJSON ($("#formEditar"));
    var success = function (response){
        alert("producto actualizado");
        Listar_Productos();
        window.location.href = "inventario.html"
    }

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:url,
        context: data ,
        data: data,
        dataType: "json",
        success: success

    });
}



function nuevo_producto() {
    console.log("Llamado a nuevo producto");
    var data = convertirFormDataAJSON($("#formEditar"));
    
    var success = function (response) {
        alert("Nuevo producto creado");
        Listar_Productos(); 
        $("#boton-cerrar").click(); 
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8081/api/productos/crear-producto", // Cambia por la URL correcta
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        dataType: "json",
        success: success,
        error: function (error) {
            console.error("Error al crear el producto:", error);
            alert("Error al registrar el producto");
        }
    });
}


function eliminar_Productos (id ){
    console.log("llamado a eliminar productos");
    var data = [];
    var url2 = url + "/" + id ;
    var success = function (response){
        alert("El producto fue eliminado");
        Listar_Productos();
    }

    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:url2,
        context: data ,
        data: data,
        dataType: "json",
        success: success

    });

}



    

        


