package com.dam2.crm.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "incidencias")
public class Incidencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String asunto;
    private String descripcion;
    private String ubicacion;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    private Prioridad prioridad; // Enum: ALTA, MEDIA, BAJA
    
    @Enumerated(EnumType.STRING)
    private EstadoIncidencia estado; // Enum: PENDIENTE, EN_CURSO, RESUELTO

    private LocalDate fecha;

 

    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private User tecnicoAsignado;

    // GETTERS Y SETTERS
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { 
        this.cliente = cliente; 
        if(cliente != null) {
            this.ubicacion = cliente.getDireccion();
        }
    }
}