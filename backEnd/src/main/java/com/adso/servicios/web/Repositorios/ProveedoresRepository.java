package com.adso.servicios.web.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adso.servicios.web.Entidades.Proveedores;



@Repository
public interface ProveedoresRepository extends JpaRepository<Proveedores, Integer> {

}
