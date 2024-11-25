package com.adso.servicios.web.Entidades;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="usuario")
public class Usuario {

     @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name ="correo", nullable = false , length = 45 )
@NonNull
    private String correo;

    @Column(name ="identificacion", nullable = false , length = 45 )
@NonNull
    private String identificacion;


    @Column(name ="nombre", nullable = false , length = 45 )
@NonNull
    private String nombre;

    @Column(name ="telefono", nullable = false , length = 45 )
@NonNull
    private String 	telefono;

    public Integer getId() {
        return id;
    
}
    public void setId(Integer id) {
        this.id = id;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getnombre() {
        return nombre;
    }

    public void setnombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
   

}