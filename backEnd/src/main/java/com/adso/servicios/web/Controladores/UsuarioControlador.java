package com.adso.servicios.web.Controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioInt servicio;

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<?> listarUsuarios(){
        return ResponseEntity.ok(servicio.findAll());
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<?> listarusuarioById(@PathVariable(value="id") Integer id){
        Optional<Usuario> usuario = servicio.findByID(id);
        if(usuario.isPresent()){
            return ResponseEntity.ok(usuario);
        } 
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<?> crearusuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok(servicio.save(usuario));
    }

    

    @CrossOrigin(origins = "*")
    @PutMapping
    public ResponseEntity<?> editarusuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok(servicio.save(usuario));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable(value="id") Integer id){
        Optional<Usuario> usuario = servicio.findByID(id);
        if(usuario.isPresent()){
            servicio.delete(id);
            return ResponseEntity.ok(usuario);
        } 
        return ResponseEntity.notFound().build();
    }

}
