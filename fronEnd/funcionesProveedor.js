var url  = "http://localhost:8081/api/proveedores";



function Listar_Proveedores() {
    console.log("Ejecutar Listar Proveedores");
    var data = [];
    
    var success = function(response) {
        var items = [];
        $.each(response, function(index, proveedores) {
            items.push(
                "<tr>" +
                "<td>" + proveedores.id + "</td>" +
                "<td>" + proveedores.codigo + "</td>" +
                "<td>" + proveedores.nombre + "</td>" +
                "<td>" + proveedores.numero + "</td>" +
                "<td>" + proveedores.correo + "</td>" +
                "<td>" +
                "<a href='EditarProveedores.html?id="+proveedores.id+"' style='margin-right: 5px;'>" +
                "<button class='btn btn-primary edit-button'>✎ Editar</button></a>" +
                "<a href='eliminarproveedores.html?id="+proveedores.id+"' style='margin-right: 5px;'>" +
                "<button type='button' class='btn btn-danger delete-button'>Eliminar</button>" +
                "</td>" +
                "</tr>"
                
            );
        });

        $("#Listar_Proveedores").html(
            "<table><thead><tr><th>ID</th><th>Codigo</th><th>Nombre</th><th>Numero</th><th>Correo</th><th>Acciones</th></tr></thead><tbody>" +
            items.join("") +
            "</tbody></table>"
        );
    };

    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/proveedores", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error al listar los proveedores.");
        }
    });
}
function editar_Proveedores(id){
    console.log ("llamado a editar proveedores") ;
    var url2 = url + "/" + id ;
    var data = [] ;
    var success = function (response){
        $("#formEditar  #id").val (response.id);
        $("#formEditar  #codigo").val (response.codigo);
        $("#formEditar  #nombre").val (response.nombre);
        $("#formEditar  #numero").val (response.numero);
        $("#formEditar  #correo").val (response.correo);
        $("#formEditar  #direccion").val (response.direccion);
       

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

function actualizar_Proveedores(){
    console.log("llamado a actualizar proveedores");
    var data = convertirFormDataAJSON ($("#formEditar"));
    var success = function (response){
        alert("proveedores actualizado");
        Listar_Proveedores();
        window.location.href = "proveedores.html"
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
 function eliminar_Proveedores (id ){
    console.log("llamado a eliminar proveedores");
    var data = [];
    var url2 = url + "/" + id ;
    var success = function (response){
        alert("El porvedor fue eliminado");
        Listar_Proveedores();
    }

    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:ur2,
        context: data ,
        data: data,
        dataType: "json",
        success: success

    });

}

function actualizar_Proveedores(){
    console.log("llamado a actualizar proveedores");
    var data = convertirFormDataAJSON ($("#formEditar"));
    var success = function (response){
        alert("proveedor actualizado");
        Listar_Productos();
        window.location.href = "proveedores.html"
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
function nuevo_proveedor (){
    console.log("llamado a nuevo proveedor");
    var data = convertirFormDataAJSON ($("#formEditar"));
    var success = function (response){
        alert("nuevo proveedor creado");
        window.location.href = "inventario.html";
    }
        


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


// Función para convertir los datos del formulario a un objeto JSON
function convertirFormDataAJSON($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}