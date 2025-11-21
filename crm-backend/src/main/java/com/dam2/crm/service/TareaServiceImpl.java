package com.dam2.crm.service;

import com.dam2.crm.model.Tarea;
import com.dam2.crm.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaServiceImpl implements TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Override
    public List<Tarea> findAll() {
        return tareaRepository.findAll();
    }

    @Override
    public List<Tarea> findByUsuario(Long usuarioId) {
        return tareaRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public List<Tarea> findByCliente(Long clienteId) {
        return tareaRepository.findByClienteId(clienteId);
    }

    @Override
    public Optional<Tarea> findById(Long id) {
        return tareaRepository.findById(id);
    }

    @Override
    public Tarea save(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    public void deleteById(Long id) {
        tareaRepository.deleteById(id);
    }
}