package com.adso.servicios.web.Servicios.Interfaces;

import java.util.List;
import java.util.Optional;

import com.adso.servicios.web.Entidades.Usuario;

public interface UsuarioInt {

public List<Usuario>  findAll ( );
public Optional <Usuario> findByID (Integer id) ;
public Usuario save (Usuario usuario) ;
public void delete (Integer id) ;
public Object buscar(Object getusuario);

}
