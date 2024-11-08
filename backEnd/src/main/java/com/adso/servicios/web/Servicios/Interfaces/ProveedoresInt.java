package com.adso.servicios.web.Servicios.Interfaces;

import java.util.List;
import java.util.Optional;

import com.adso.servicios.web.Entidades.Proveedores;


public interface ProveedoresInt {
    
public List<Proveedores>  findAll ( );
public Optional <Proveedores> findByID (Integer id) ;
public Proveedores save (Proveedores proveedores) ;
public void delete (Integer id) ;

}
