package com.adso.servicios.web.Servicios.Implementaciones;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adso.servicios.web.Entidades.Proveedores;
import com.adso.servicios.web.Repositorios.ProveedoresRepository;
import com.adso.servicios.web.Servicios.Interfaces.ProveedoresInt;


@Service
public class ProveedoresImp implements ProveedoresInt{

    @Autowired
    private ProveedoresRepository repositorio ;


    @Override
    public List <Proveedores> findAll(){
        return repositorio.findAll();
    }


    @Override
    public Optional<Proveedores> findByID(Integer id) {
       return repositorio .findById(id); 
    }


    @Override
    public Proveedores save(Proveedores proveedores) {
        return repositorio.save(proveedores);
    }


    @Override
    public void delete(Integer id) {
        repositorio .deleteById(id);
    }

}
