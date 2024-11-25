package com.adso.servicios.web.Servicios.Implementaciones;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adso.servicios.web.Entidades.Usuario;
import com.adso.servicios.web.Repositorios.UsuarioRepository;
import com.adso.servicios.web.Servicios.Interfaces.UsuarioInt;

@Service
public class UsuariosImp  implements UsuarioInt{

     @Autowired
    private UsuarioRepository repositorio ;


    @Override
    public List <Usuario> findAll(){
        return repositorio .findAll();
    }


    @Override
    public Optional<Usuario> findByID(Integer id) {
       return repositorio .findById(id); 
    }


    @Override
    public Usuario save(Usuario usuario) {
        return repositorio .save(usuario);
    }


    @Override
    public void delete(Integer id) {
        repositorio .deleteById(id);
    }


    @Override
    public Object buscar(Object getusuario) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'buscar'");
    }

}
