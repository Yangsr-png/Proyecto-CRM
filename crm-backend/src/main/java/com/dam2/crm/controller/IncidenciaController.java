package com.dam2.crm.controller;

import com.dam2.crm.model.Incidencia;
import com.dam2.crm.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidencias")
@CrossOrigin(origins = "http://localhost:4200") // Permite que Angular se conecte
public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

    // 1. LISTAR
    @GetMapping
    public List<Incidencia> listar() {
        return incidenciaService.findAll();
    }

    // 2. CREAR
    @PostMapping
    public ResponseEntity<Incidencia> crear(@RequestBody Incidencia incidencia) {
        Incidencia nueva = incidenciaService.save(incidencia);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    // 3. ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> actualizar(@PathVariable Long id, @RequestBody Incidencia incidencia) {
        Incidencia existente = incidenciaService.findById(id);
        if (existente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // Aseguramos que el ID sea el correcto
        // (Podrías añadir aquí lógica para actualizar campo a campo si quisieras)
        // incidencia.setId(id); // A veces es necesario forzar el ID
        
        Incidencia actualizada = incidenciaService.save(incidencia);
        return new ResponseEntity<>(actualizada, HttpStatus.OK);
    }

    // 4. ELIMINAR (¡Este es el que te faltaba!)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Incidencia existente = incidenciaService.findById(id);
        if (existente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        incidenciaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}