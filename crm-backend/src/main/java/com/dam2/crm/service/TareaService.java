package com.dam2.crm.service;

import com.dam2.crm.model.Tarea;
import java.util.List;
import java.util.Optional;

public interface TareaService {
    List<Tarea> findAll();
    List<Tarea> findByUsuario(Long usuarioId);
    List<Tarea> findByCliente(Long clienteId);
    Optional<Tarea> findById(Long id);
    Tarea save(Tarea tarea);
    void deleteById(Long id);
}