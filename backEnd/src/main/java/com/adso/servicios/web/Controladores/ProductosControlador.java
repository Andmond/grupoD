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

import com.adso.servicios.web.Entidades.Productos;
import com.adso.servicios.web.Servicios.Interfaces.ProductosInt;

@RestController
@RequestMapping("/api/productos")
public class ProductosControlador {

    @Autowired
    private ProductosInt servicio;

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<?> listarProductos(){
        return ResponseEntity.ok(servicio.findAll());
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<?> listarProductoById(@PathVariable(value="id") Integer id){
        Optional<Productos> producto = servicio.findByID(id);
        if(producto.isPresent()){
            return ResponseEntity.ok(producto);
        } 
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody Productos producto){
        return ResponseEntity.ok(servicio.save(producto));
    }

    

    @CrossOrigin(origins = "*")
    @PutMapping
    public ResponseEntity<?> editarProducto(@RequestBody Productos producto){
        return ResponseEntity.ok(servicio.save(producto));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable(value="id") Integer id){
        Optional<Productos> producto = servicio.findByID(id);
        if(producto.isPresent()){
            servicio.delete(id);
            return ResponseEntity.ok(producto);
        } 
        return ResponseEntity.notFound().build();
    }

}