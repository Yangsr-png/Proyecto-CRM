package com.dam2.crm.controller;

import com.dam2.crm.model.Contacto;
import com.dam2.crm.service.ClienteService;
import com.dam2.crm.service.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contactos")
@CrossOrigin(origins = "http://localhost:4200") 
public class ContactoController {

    @Autowired
    private ContactoService contactoService;

    @Autowired
    private ClienteService clienteService; 

    @GetMapping
    public List<Contacto> getAllContactos() {
        return contactoService.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Contacto> getContactosByCliente(@PathVariable Long clienteId) {
        return contactoService.findByCliente(clienteId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contacto> getContactoById(@PathVariable Long id) {
        return contactoService.findById(id)
                .map(contacto -> new ResponseEntity<>(contacto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/cliente/{clienteId}")
    public ResponseEntity<Contacto> createContacto(@PathVariable Long clienteId, @RequestBody Contacto contacto) {
        
        return clienteService.findById(clienteId).map(cliente -> {
            contacto.setCliente(cliente); 
            Contacto nuevoContacto = contactoService.save(contacto);
            return new ResponseEntity<>(nuevoContacto, HttpStatus.CREATED);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contacto> updateContacto(@PathVariable Long id, @RequestBody Contacto contactoDetalles) {
        return contactoService.findById(id).map(contactoExistente -> {
            contactoExistente.setNombre(contactoDetalles.getNombre());
            contactoExistente.setApellido(contactoDetalles.getApellido());
            contactoExistente.setEmail(contactoDetalles.getEmail());
            contactoExistente.setTelefono(contactoDetalles.getTelefono());
            contactoExistente.setCargo(contactoDetalles.getCargo());
            
            return new ResponseEntity<>(contactoService.save(contactoExistente), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContacto(@PathVariable Long id) {
        if (contactoService.findById(id).isPresent()) {
            contactoService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}