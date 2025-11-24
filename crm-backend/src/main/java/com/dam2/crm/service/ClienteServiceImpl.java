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

    // INYECCIÓN DEL SERVICIO DE NOTIFICACIONES (Hilos)
    @Autowired
    private NotificacionService notificacionService;

    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    public List<Cliente> buscarClientes(String nombre, String estado) {
        if (nombre != null && !nombre.isEmpty() && estado != null && !estado.isEmpty()) {
            return clienteRepository.findByNombreContainingIgnoreCaseAndEstado(nombre, estado);
        } else if (nombre != null && !nombre.isEmpty()) {
            return clienteRepository.findByNombreContainingIgnoreCase(nombre);
        } else if (estado != null && !estado.isEmpty()) {
            return clienteRepository.findByEstado(estado);
        } else {
            return clienteRepository.findAll();
        }
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    // --- AQUÍ ESTÁ LA LÓGICA ASÍNCRONA ---
    @Override
    public Cliente save(Cliente cliente) {
        // 1. Guardar en BD
        Cliente clienteGuardado = clienteRepository.save(cliente);

        // 2. Enviar notificación en segundo plano (Hilo separado)
        if (clienteGuardado.getEmail() != null) {
            notificacionService.enviarNotificacionBienvenida(
                clienteGuardado.getEmail(),
                clienteGuardado.getNombre()
            );
        }

        return clienteGuardado;
    }
    // --------------------------------------

    @Override
    public Optional<Cliente> update(Long id, Cliente clienteActualizado) {
        return clienteRepository.findById(id).map(clienteExistente -> {
            clienteExistente.setNombre(clienteActualizado.getNombre());
            clienteExistente.setCif(clienteActualizado.getCif());
            clienteExistente.setDireccion(clienteActualizado.getDireccion());
            clienteExistente.setEmail(clienteActualizado.getEmail());
            clienteExistente.setTelefono(clienteActualizado.getTelefono());
            clienteExistente.setEstado(clienteActualizado.getEstado());
            return clienteRepository.save(clienteExistente);
        });
    }

    @Override
    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }
}