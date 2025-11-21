package com.dam2.crm.controller;

import com.dam2.crm.model.Tarea;
import com.dam2.crm.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "http://localhost:4200") // Importante para Angular
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    public List<Tarea> getAllTareas() {
        return tareaService.findAll();
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Tarea> getTareasByUsuario(@PathVariable Long usuarioId) {
        return tareaService.findByUsuario(usuarioId);
    }
    
    @GetMapping("/cliente/{clienteId}")
    public List<Tarea> getTareasByCliente(@PathVariable Long clienteId) {
        return tareaService.findByCliente(clienteId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarea> getTareaById(@PathVariable Long id) {
        return tareaService.findById(id)
                .map(tarea -> new ResponseEntity<>(tarea, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Tarea> createTarea(@RequestBody Tarea tarea) {
        // Aquí podrías validar que el cliente y usuario existen si no vienen completos
        return new ResponseEntity<>(tareaService.save(tarea), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> updateTarea(@PathVariable Long id, @RequestBody Tarea tareaDetails) {
        return tareaService.findById(id)
                .map(tarea -> {
                    tarea.setTitulo(tareaDetails.getTitulo());
                    tarea.setDescripcion(tareaDetails.getDescripcion());
                    tarea.setFechaVencimiento(tareaDetails.getFechaVencimiento());
                    tarea.setEstado(tareaDetails.getEstado());
                    tarea.setCliente(tareaDetails.getCliente());
                    // No solemos cambiar el usuario asignado en un update simple, pero se podría
                    return new ResponseEntity<>(tareaService.save(tarea), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        if (tareaService.findById(id).isPresent()) {
            tareaService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}