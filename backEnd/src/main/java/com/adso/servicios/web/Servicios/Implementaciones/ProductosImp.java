package com.adso.servicios.web.Servicios.Implementaciones;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adso.servicios.web.Entidades.Productos;
import com.adso.servicios.web.Repositorios.ProductosRepository;
import com.adso.servicios.web.Servicios.Interfaces.ProductosInt;

@Service
public class ProductosImp implements ProductosInt {


@Autowired
    private ProductosRepository repositorio ;


    @Override
    public List <Productos> findAll(){
        return repositorio .findAll();
    }


    @Override
    public Optional<Productos> findByID(Integer id) {
       return repositorio .findById(id); 
    }


    @Override
    public Productos save(Productos producto) {
        return repositorio .save(producto);
    }


    @Override
    public void delete(Integer id) {
        repositorio .deleteById(id);
    }



}
