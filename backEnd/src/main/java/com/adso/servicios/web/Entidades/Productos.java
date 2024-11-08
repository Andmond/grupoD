package com.adso.servicios.web.Entidades;

import io.micrometer.common.lang.NonNull;
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
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name ="codigo_proveedor", nullable = false , length = 45 )
@NonNull
    private String codigoProveedor;

    @Column(name ="codigo_producto", nullable = false , length = 11 )
@NonNull
    private int codigoProducto;

    @Column(name ="producto", nullable = false , length = 200 )
    @NonNull
    private String producto;

    @Column(name ="precio_costo", nullable = false , length = 11 )
    @NonNull
    private int precioCosto;

    @Column(name ="precio_venta", nullable = false , length = 11 )
    @NonNull
    private int precioVenta;

    @Column(name ="cantidad", nullable = false , length = 11 )
    @NonNull
    private int cantidad;

    @Column(name ="cantidad_minima", nullable = false , length = 11 )
    @NonNull
    private int cantidadMinima;

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

    public int getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(int codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public int getPrecioCosto() {
        return precioCosto;
    }

    public void setPrecioCosto(int precioCosto) {
        this.precioCosto = precioCosto;
    }

    public int getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(int precioVenta) {
        this.precioVenta = precioVenta;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getCantidadMinima() {
        return cantidadMinima;
    }

    public void setCantidadMinima(int cantidadMinima) {
        this.cantidadMinima = cantidadMinima;
    }
    

    
     
}


