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

import com.adso.servicios.web.Entidades.Productos;
import com.adso.servicios.web.Servicios.Interfaces.ProductosInt;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping( "/api/productos")
public class ProductosControlador {
    
    @Autowired
    private ProductosInt servicio ;
    @CrossOrigin (origins="*")

    @GetMapping
public ResponseEntity<?> listarProductoEntity() {
    return ResponseEntity.ok(servicio.findAll());
}
    @CrossOrigin (origins="*")
    @GetMapping("/{id}")
    public ResponseEntity <?> ListaProductoByI(@PathVariable(value=  "id")Integer id){
        java.util.Optional<Productos> producto = servicio.findByID(id);
        if (producto.isPresent()){
            return ResponseEntity .ok(producto);
        }

        return ResponseEntity.notFound () .build();
       

         }


        
 @CrossOrigin(origins="*")
 @PostMapping ("/crear-producto")
 public ResponseEntity <?> crearProducto(@RequestBody Productos producto){
    System.out.println(producto.getId());
    System.out.println(producto.getCantidad());
    return ResponseEntity.status(HttpStatus.CREATED).body(servicio.save(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarProducto(@PathVariable(value = "id") Integer id, @RequestBody Productos producto) {
        Optional<Productos> existingProducto = servicio.findByID(id);
        if (!existingProducto.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        producto.setId(id);  
        return ResponseEntity.status(HttpStatus.OK).body(servicio.save(producto)); 
    }
     
 @CrossOrigin(origins="*")
        @DeleteMapping("/{id}")
        public ResponseEntity <?> eliminarProducto(@PathVariable(value="id")Integer id){
            Optional<Productos> producto =servicio.findByID(id);
            if (producto.isPresent()){
                servicio.delete(id);
                return ResponseEntity.ok("Producto eliminado correctamente");
                

            }

            return ResponseEntity .notFound().build();
}
}
 