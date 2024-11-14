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
    var data = [];
    
    var success = function(response) {
        var items = [];
        $.each(response, function(index, producto) {
            items.push(
                "<tr>" +
                "<td>" + producto.id + "</td>" +
                "<td>" + producto.codigo_proveedor + "</td>" +
                "<td>" + producto.codigo_producto + "</td>" +
                "<td>" + producto.producto + "</td>" +
                "<td>" + producto.cantidad + "</td>" +
                "<td>" + producto.cantidad_minima + "</td>" +
                "<td>" +
                "<a href='editar.html?id="+producto.id+"' style='margin-right: 5px;'>" +
                "<button class='btn btn-primary edit-button'>✎ Editar</button></a>" +
                "<a href='eliminar.html?id="+producto.id+"' style='margin-right: 5px;'>" +
                "<button type='button' class='btn btn-danger delete-button'>Eliminar</button>" +
                "</td>" +
                "</tr>"



            );
        });
        
        $("#Listar_Productos").html(
            "<table><thead><tr><th>Id</th><th>Proveedor</th><th>CodigoProducto</th><th>articulo</th><th>cantidad</th><th>cantidad minima</th><th>Acciones</th></tr></thead><tbody>" +
            items.join("") +
            "</tbody></table>"
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
        $("#formEditar  #codigo_proveedor").val (response.codigo_proveedor);
        $("#formEditar  #nombre_producto").val (response.nombre_producto);
        $("#formEditar  #precio_costo").val (response.precio_costo);
        $("#formEditar  #precio_venta").val (response.precio_venta);
        $("#formEditar  #cantidad").val (response.cantidad);
        $("#formEditar  #cantidad_minima").val (response.cantidad_minima);
        $("#formEditar  #producto").val (response.producto);

    }


    $.ajax ({
        type : "GET",
        headers :{
             'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context : data,
        data: data ,
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

function nuevo_producto (){
    console.log("llamado a nuevo producto");
    var data = convertirFormDataAJSON ($("#formEditar"));
    var success = function (response){
        alert("nuevo producto creado");
        Listar_Productos();
        $("#boton-cerrar").click();


        $.ajax({
            type: "POST",
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
}



function eliminar_Productos (id ){
    console.log("llamado a eliminar productos");
    var data = [];
    var url2 = url + "/" + id ;
    var success = function (response){
        alert("El producto fue eliminado");
        Listar_Pro();
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



    

        


