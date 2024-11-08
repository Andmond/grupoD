package com.adso.servicios.web.Controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adso.servicios.web.Entidades.Usuario;
import com.adso.servicios.web.Servicios.Interfaces.UsuarioInt;



@RestController
@RequestMapping( "/api/usuario")
public class UsuarioControlador {
    
    @Autowired
    private UsuarioInt servicio ;
    @CrossOrigin (origins="*")

    @GetMapping
public ResponseEntity<?> listarUsuariosEntity() {
    return ResponseEntity.ok(servicio.findAll());
}
    @CrossOrigin (origins="*")
    @RequestMapping("/api/usuario")
    public ResponseEntity <?> ListaUsuariosByI(@PathVariable(value=  "id")Integer id){
        java.util.Optional<Usuario> usuario = servicio.findByID(id);
        if (usuario.isPresent()){
            return ResponseEntity .ok(usuario);
        }

        return ResponseEntity.notFound () .build();
       

         }

        
@CrossOrigin(origins="*")
@PostMapping 
public ResponseEntity <?> crearProveedores(@RequestBody Usuario usuario){
    return ResponseEntity.status(HttpStatus.CREATED).body(servicio.save(usuario));
    }

    @CrossOrigin(origins="*")
    @PutMapping
    public ResponseEntity <?> editarProveedores(@RequestBody Usuario usuario){
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.save(usuario));
        }
     
        @CrossOrigin(origins="*")
        @DeleteMapping
        public ResponseEntity <?> eliminarProveedores(@PathVariable(value="id")Integer id){
            Optional<Usuario> usuario =servicio.findByID(id);
            if (usuario.isPresent()){
                servicio.delete(id);
                return ResponseEntity.ok(null);
                

            }

            return ResponseEntity .notFound().build();
}
}
 