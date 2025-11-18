package com.dam2.crm.service;

import com.dam2.crm.model.Cliente;
import com.dam2.crm.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Anotación @Service para que Spring lo reconozca como un componente de servicio
@Service
public class ClienteServiceImpl implements ClienteService {

    // Inyectamos el Repositorio para poder usarlo
    // Esto es "Inyección de Dependencias"
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> findAll() {
        // Simplemente llamamos al método del repositorio
        return clienteRepository.findAll();
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        // 'Optional' es un objeto que puede contener un valor o no (para evitar nulls)
        return clienteRepository.findById(id);
    }

    @Override
    public Cliente save(Cliente cliente) {
        // El método save() sirve tanto para crear (si el ID es null) 
        // como para actualizar (si el ID ya existe)
        return clienteRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> update(Long id, Cliente clienteActualizado) {
        // 1. Buscar si el cliente existe por su ID
        Optional<Cliente> clienteExistenteOpt = clienteRepository.findById(id);

        // 2. Comprobar si existe
        if (clienteExistenteOpt.isPresent()) {
            Cliente clienteExistente = clienteExistenteOpt.get();
            
            // 3. Actualizar los campos del cliente existente
            //    (Gracias a @Data de Lombok, tenemos los setters)
            clienteExistente.setNombre(clienteActualizado.getNombre());
            clienteExistente.setCif(clienteActualizado.getCif());
            clienteExistente.setDireccion(clienteActualizado.getDireccion());
            clienteExistente.setEmail(clienteActualizado.getEmail());
            clienteExistente.setTelefono(clienteActualizado.getTelefono());
            
            // 4. Guardar los cambios en la BBDD y devolver el cliente guardado
            return Optional.of(clienteRepository.save(clienteExistente));
        } else {
            // 5. Si no existe, devolver un Optional vacío
            return Optional.empty();
        }
    }

    @Override
    public void deleteById(Long id) {
        // Simplemente llamamos al método del repositorio
        clienteRepository.deleteById(id);
    }
}