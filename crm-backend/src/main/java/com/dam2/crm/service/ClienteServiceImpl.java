package com.dam2.crm.service;

import com.dam2.crm.model.Cliente;
import com.dam2.crm.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // --- NUEVA IMPLEMENTACIÓN DE BÚSQUEDA ---
    @Override
    public List<Cliente> buscarClientes(String nombre, String estado) {
        // Caso 1: Si vienen ambos filtros
        if (nombre != null && !nombre.isEmpty() && estado != null && !estado.isEmpty()) {
            return clienteRepository.findByNombreContainingIgnoreCaseAndEstado(nombre, estado);
        } 
        // Caso 2: Si solo viene el nombre
        else if (nombre != null && !nombre.isEmpty()) {
            return clienteRepository.findByNombreContainingIgnoreCase(nombre);
        } 
        // Caso 3: Si solo viene el estado
        else if (estado != null && !estado.isEmpty()) {
            return clienteRepository.findByEstado(estado);
        } 
        // Caso 4: Si no viene nada, devolver todos
        else {
            return clienteRepository.findAll();
        }
    }
    // -----------------------------------------

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> update(Long id, Cliente clienteActualizado) {
        Optional<Cliente> clienteExistenteOpt = clienteRepository.findById(id);

        if (clienteExistenteOpt.isPresent()) {
            Cliente clienteExistente = clienteExistenteOpt.get();
            
            clienteExistente.setNombre(clienteActualizado.getNombre());
            clienteExistente.setCif(clienteActualizado.getCif());
            clienteExistente.setDireccion(clienteActualizado.getDireccion());
            clienteExistente.setEmail(clienteActualizado.getEmail());
            clienteExistente.setTelefono(clienteActualizado.getTelefono());
            clienteExistente.setEstado(clienteActualizado.getEstado()); // Aseguramos actualizar estado también
            
            return Optional.of(clienteRepository.save(clienteExistente));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }
}