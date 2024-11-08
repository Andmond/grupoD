package com.adso.servicios.web.Entidades;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="proveedores")
public class Proveedores {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name ="codigo", nullable = false , length = 45 )
@NonNull
    private String codigo;

    @Column(name ="nombre", nullable = false , length = 45 )
@NonNull
    private String nombre;

@Column(name ="numero", nullable = false , length = 45 )
@NonNull
    private String numero;

    @Column(name ="correo", nullable = false , length = 45 )
@NonNull
    private String correo;

   
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    






}
