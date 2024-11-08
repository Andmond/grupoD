package com.adso.servicios.web.Servicios.Interfaces;

import java.util.List;
import java.util.Optional;

import com.adso.servicios.web.Entidades.Productos;

public interface ProductosInt {
    
public List<Productos>  findAll ( );
public Optional <Productos> findByID (Integer id) ;
public Productos save (Productos producto) ;
public void delete (Integer id) ;

}
