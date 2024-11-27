package com.adso.servicios.web.Repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adso.servicios.web.Entidades.Usuario;






public interface  UsuarioRepository extends JpaRepository<Usuario, Integer>{

    Optional<List<Usuario>> findBynombre( String texto);

}
