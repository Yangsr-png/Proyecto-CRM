package com.dam2.crm.service;

import com.dam2.crm.model.Incidencia;
import com.dam2.crm.repository.IncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Override
    public List<Incidencia> findAll() {
        return incidenciaRepository.findAll();
    }

    @Override
    public Incidencia findById(Long id) {
        return incidenciaRepository.findById(id).orElse(null);
    }

    @Override
    public Incidencia save(Incidencia incidencia) {
        return incidenciaRepository.save(incidencia);
    }

    @Override
    public void delete(Long id) {
        incidenciaRepository.deleteById(id);
    }
}