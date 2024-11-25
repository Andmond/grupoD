var url = "http://localhost:8081/api/usuario";

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
 
function convertirFormDataAJSON(formData) {
    var loginForm = formData.serializeArray();
    var loginFormObject = {};
    $.each(loginForm,
        function(i, v) {
        loginFormObject[v.name] = v.value;
    });
    return JSON.stringify(loginFormObject);
}

function listar_usuarios(){
    
    console.log("Ejecutar Listar usuarios");
    var data = [];
    var success = function (response) {
        console.log(response);

        var items = [];
        $.each(response,function(index, usuario){
            items.push(
                "<tr><td>"+usuario.id+"</td><td>"+usuario.correo+"</td><td>"+usuario.identificacion+"</td><td>"+usuario.nombre+"</td> <td>"+usuario.telefono+"</td>   <td><a class='btn btn-primary' href='editarUsuarios.html?id="+usuario.id+"'>Editar</a> <a class='btn btn-danger' href='eliminarUsuario.html?id="+usuario.id+"'>Eliminar</a></td></tr>");
        });
        $("#listar_usuarios").html("<table class='table table-hover'><thead><tr><th>ID</th><th>CORREO</th><th>IDENTIFICACION</th><th>NOMBRE</th><th>TELEFONO</th><th colspan='2'>OPCIONES</th></tr></thead><tbody>"+items.join("")+"</tbody></table>");
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

function editar_usuario(id) {
    console.log("llamado editar usuario");
    var url2 = url + "/" + id;
    var data = [];
    var success = function (response) {
        console.log(response); 
        $("#formEditar #id").val(response.id);
        $("#formEditar #correo").val(response.correo);
        $("#formEditar #identificacion").val(response.identificacion);
        $("#formEditar #nombre").val(response.nombre);
        $("#formEditar #telefono").val(response.telefono);
              
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

function actualizar_usuario(){
    console.log("llamado a actualizar usuario");
    var data = convertirFormDataAJSON($("#formEditar"));
    var success = function (response) {
        alert("El usuario fue actualizado");
        window.location.href = "UsuariosListado.html";
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

function nuevo_usuario(){
    console.log("llamado a nuevo usuario");
    var data = convertirFormDataAJSON($("#formRegistrar"));
    var success = function (response) {
        alert("El usuario fue registrado");
        window.location.href = "UsuariosListado.html";
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

function pre_eliminar_usuario(id) {
    console.log("llamado pre eliminar usuario");
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

function eliminar_usuario(){
    console.log("llamado a eliminar usuario");
    var data = [];
    var id = $("#formEliminar #id").val();
    var url2 = url + "/" + id;
    var success = function (response) {
        alert("El usuario fue eliminado");
        window.location.href = "UsuariosListado.html";
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


function buscar_usuarios(){
    
    console.log("Ejecutar Buscar usuarios");
    //var nombre = $("#formBuscar #texto_buscado").val();
    var data = convertirFormDataAJSON($("#formBuscar"));
    var success = function (response) {
        var items = [];
        $.each(response,function(index, usuario){
            items.push("<tr><td>"+usuario.id+"</td><td>"+usuario.nombre+"</td><td>"+usuario.precio+"</td><td>"+usuario.vencimiento+"</td> <td>"+usuario.unidadesId.nombre+"</td>  <td>"+usuario.categoriasId.nombre+"</td> <td>"+usuario.cantidad+"</td>   <td><a class='btn btn-success' href='actualizar.html?id="+usuario.id+"'>Editar</a> <a class='btn btn-danger' href='eliminar.html?id="+usuario.id+"'>Eliminar</a></td></tr>");
        });
        $("#listar_usuarios").html("<table class='table table-hover'><thead><tr><th>ID</th><th>NOMBRE</th><th>PRECIO</th><th>VENCIMIENTO</th><th>UNIDAD</th><th>CATEGORIA</th><th>CANTIDAD</th><th colspan='2'>OPCIONES</th></tr></thead><tbody>"+items.join("")+"</tbody></table>");
    };

    $.ajax({
        type: "PATCH",
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
// Categorias


function listar_categorias(){
    
    console.log("Ejecutar Listar Categorias");
    var data = [];
    var success = function (response) {
        var items = [];
        $.each(response,function(index, categoria){
            items.push("<option value='"+categoria.id+"'>"+categoria.nombre+"</option>");
        });
        $("#listar_categorias").html("<select class='form-select' id='categoriasId' name='categoriasId'>"+items.join("")+"</select>");
    };

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: urlC,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
    
}

// Unidades

function listar_unidades(){
    
    console.log("Ejecutar Listar Unidades");
    var data = [];
    var success = function (response) {
        var items = [];
        $.each(response,function(index, unidad){
            items.push("<option value='"+unidad.id+"'>"+unidad.nombre+"</option>");
        });
        $("#listar_unidades").html("<select class='form-select' id='unidadesId' name='unidadesId'>"+items.join("")+"</select>");
    };

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: urlU,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
    
}