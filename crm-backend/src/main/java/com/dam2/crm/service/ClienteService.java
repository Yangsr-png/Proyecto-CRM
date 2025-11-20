package com.dam2.crm.service;

import com.dam2.crm.model.Cliente;
import java.util.List;
import java.util.Optional;

public interface ClienteService {

    List<Cliente> findAll();
    
    // NUEVO: Método para filtrar
    List<Cliente> buscarClientes(String nombre, String estado);
    
    Optional<Cliente> findById(Long id);
    
    Cliente save(Cliente cliente);
    
    Optional<Cliente> update(Long id, Cliente cliente);
    
    void deleteById(Long id);
}