package com.dam2.crm.repository;

import com.dam2.crm.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    // Buscar tareas de un usuario concreto
    List<Tarea> findByUsuarioId(Long usuarioId);
    
    // Buscar tareas asociadas a un cliente
    List<Tarea> findByClienteId(Long clienteId);
    
    // Buscar por estado
    List<Tarea> findByEstado(String estado);
}