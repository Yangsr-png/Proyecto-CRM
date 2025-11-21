package com.dam2.crm.service;

import com.dam2.crm.model.Contacto;
import java.util.List;
import java.util.Optional;

public interface ContactoService {
    List<Contacto> findAll();
    List<Contacto> findByCliente(Long clienteId); 
    Optional<Contacto> findById(Long id);
    Contacto save(Contacto contacto);
    void deleteById(Long id);
}