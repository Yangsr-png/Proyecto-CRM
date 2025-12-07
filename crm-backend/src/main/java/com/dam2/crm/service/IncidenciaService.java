package com.dam2.crm.service;

import com.dam2.crm.model.Incidencia;
import java.util.List;

public interface IncidenciaService {
    List<Incidencia> findAll();
    Incidencia findById(Long id);
    Incidencia save(Incidencia incidencia);
    void delete(Long id);
}