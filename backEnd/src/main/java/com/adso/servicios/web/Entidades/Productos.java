package com.adso.servicios.web.Entidades;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="productos")
public class Productos  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "codigo_proveedor", nullable = false, length = 45)
    @JsonProperty("codigo_proveedor")
    private String codigoProveedor;

    @Column(name = "codigo_producto", nullable = false, length = 11)
    @JsonProperty("codigo_producto")
    private Integer codigoProducto;

    @Column(name = "producto", nullable = false, length = 200)
    @JsonProperty("producto")
    private String producto;

    @Column(name = "precio_costo", nullable = false, length = 11)
    @JsonProperty("precio_costo")
    private Integer precioCosto;

    @Column(name = "precio_venta", nullable = false, length = 11)
    @JsonProperty("precio_venta")
    private Integer precioVenta;

    @Column(name = "cantidad", nullable = false, length = 11)
    @JsonProperty("cantidad")
    private Integer cantidad;

    @Column(name = "cantidad_minima", nullable = false, length = 11)
    @JsonProperty("cantidad_minima")
    private Integer cantidadMinima;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigoProveedor() {
        return codigoProveedor;
    }

    public void setCodigoProveedor(String codigoProveedor) {
        this.codigoProveedor = codigoProveedor;
    }

    public Integer getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(Integer codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public Integer getPrecioCosto() {
        return precioCosto;
    }

    public void setPrecioCosto(Integer precioCosto) {
        this.precioCosto = precioCosto;
    }

    public Integer getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(Integer precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getCantidadMinima() {
        return cantidadMinima;
    }

    public void setCantidadMinima(Integer cantidadMinima) {
        this.cantidadMinima = cantidadMinima;
    }

   
    
    
     
}


