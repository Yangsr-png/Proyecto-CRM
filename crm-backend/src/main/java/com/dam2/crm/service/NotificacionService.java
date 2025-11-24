// Archivo: crm-backend/src/main/java/com/dam2/crm/service/NotificacionService.java

package com.dam2.crm.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class NotificacionService {

    // 1. Creamos un Pool de hilos. 
    // newFixedThreadPool(3) significa que tenemos 3 "obreros" listos para enviar correos simultáneamente.
    private final ExecutorService executor = Executors.newFixedThreadPool(3);

    public void enviarNotificacionBienvenida(String email, String nombre) {
        
        // 2. Le mandamos una tarea al executor (submit).
        // Usamos una lambda () -> { ... } que es un Runnable.
        executor.submit(() -> {
            try {
                // 3. Simulamos que enviar un correo tarda 3 segundos (Thread.sleep)
                System.out.println(">>> INICIANDO envío de correo a: " + email + " en el hilo: " + Thread.currentThread().getName());
                
                Thread.sleep(3000); // Pausa de 3 segundos (simulada)
                
                System.out.println(">>> ✅ CORREO ENVIADO a " + nombre + " (" + email + ")");
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.err.println("Error enviando correo: " + e.getMessage());
            }
        });
    }
}