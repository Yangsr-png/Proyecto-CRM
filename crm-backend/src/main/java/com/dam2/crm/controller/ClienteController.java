package com.dam2.crm.controller;

import com.dam2.crm.model.Cliente;
import com.dam2.crm.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @RestController = @Controller + @ResponseBody
// Indica que esto es un controlador REST y que los métodos devolverán JSON
@RestController
// @RequestMapping define la URL base para todos los métodos de este controlador
// Ej: http://localhost:8080/api/clientes
@RequestMapping("/api/clientes")
public class ClienteController {

    // Inyectamos el Servicio (la interfaz, no la implementación)
    @Autowired
    private ClienteService clienteService;

    // --- Endpoint para OBTENER TODOS los clientes (GET) ---
    // GET /api/clientes
    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.findAll();
    }

    // --- Endpoint para OBTENER UN cliente por ID (GET) ---
    // GET /api/clientes/5
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        // @PathVariable extrae el "id" de la URL

        Optional<Cliente> cliente = clienteService.findById(id);

        if (cliente.isPresent()) {
            // Si se encuentra, devuelve 200 OK y el cliente en el cuerpo
            return new ResponseEntity<>(cliente.get(), HttpStatus.OK);
        } else {
            // Si no se encuentra, devuelve 404 Not Found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // --- Endpoint para CREAR un nuevo cliente (POST) ---
    // POST /api/clientes
    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        // @RequestBody coge el JSON del cuerpo de la petición 
        // y lo convierte en un objeto Cliente
        
        Cliente nuevoCliente = clienteService.save(cliente);
        // Devuelve 201 Created y el nuevo cliente en el cuerpo
        return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
    }

    // --- Endpoint para ACTUALIZAR un cliente (PUT) ---
    // PUT /api/clientes/5
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteActualizado) {
        
        Optional<Cliente> cliente = clienteService.update(id, clienteActualizado);

        if (cliente.isPresent()) {
            // Si se actualiza, devuelve 200 OK y el cliente actualizado
            return new ResponseEntity<>(cliente.get(), HttpStatus.OK);
        } else {
            // Si no se encuentra, devuelve 404 Not Found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // --- Endpoint para BORRAR un cliente (DELETE) ---
    // DELETE /api/clientes/5
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        
        // Comprobamos si existe antes de borrar para dar una respuesta adecuada
        if (clienteService.findById(id).isPresent()) {
            clienteService.deleteById(id);
            // Si se borra, devuelve 204 No Content (éxito sin cuerpo)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Si no se encuentra, devuelve 404 Not Found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}