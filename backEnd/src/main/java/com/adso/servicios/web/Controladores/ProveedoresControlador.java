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

import com.adso.servicios.web.Entidades.Proveedores;
import com.adso.servicios.web.Servicios.Interfaces.ProveedoresInt;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping( "/api/proveedores")
public class ProveedoresControlador {
    
    @Autowired
    private ProveedoresInt servicio ;




    @CrossOrigin (origins="*")
    @GetMapping
public ResponseEntity<?> listarProveedoresEntity() {
    return ResponseEntity.ok(servicio.findAll());
}
@CrossOrigin(origins = "*")
@RequestMapping("/{id}")
public ResponseEntity<?> ListaProveedoresById(@PathVariable(value = "id") Integer id) {
    Optional<Proveedores> proveedores = servicio.findByID(id);
    if (proveedores.isPresent()) {
        return ResponseEntity.ok(proveedores);
    }
    return ResponseEntity.notFound().build();
}

        
@CrossOrigin(origins="*")
@PostMapping 
public ResponseEntity <?> crearProveedores(@RequestBody Proveedores proveedores){
    return ResponseEntity.status(HttpStatus.CREATED).body(servicio.save(proveedores));
    }

    
    @CrossOrigin(origins="http://localhost:8081")
    @PutMapping("/{id}")
public ResponseEntity<?> editarProveedores(@PathVariable Integer id, @RequestBody Proveedores nuevosDatosProveedor) {
    // Verifica si el proveedor existe
    Optional<Proveedores> proveedorExistente = servicio.findByID(id);
    if (!proveedorExistente.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proveedor no encontrado");
    }

    // Actualiza solo los campos permitidos, dejando `codigo` sin cambios
    Proveedores proveedor = proveedorExistente.get();
    proveedor.setCorreo(nuevosDatosProveedor.getCorreo());
    proveedor.setNombre(nuevosDatosProveedor.getNombre());
    proveedor.setNumero(nuevosDatosProveedor.getNumero());
    // No actualiza `codigo`

    Proveedores proveedorActualizado = servicio.save(proveedor);
    return ResponseEntity.ok(proveedorActualizado);
}
     
        @CrossOrigin(origins="*")
        @DeleteMapping
        public ResponseEntity <?> eliminarProveedores(@PathVariable(value="id")Integer id){
            Optional<Proveedores> proveedores =servicio.findByID(id);
            if (proveedores.isPresent()){
                servicio.delete(id);
                return ResponseEntity.ok(null);
                

            }

            return ResponseEntity .notFound().build();
}
}
 