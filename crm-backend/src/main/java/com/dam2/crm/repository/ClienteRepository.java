package com.dam2.crm.repository;

import com.dam2.crm.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // ↓↓↓ AÑADIR ESTO, SIN BORRAR NADA ↓↓↓

    // Buscar clientes cuyo nombre contenga un texto (ignorando mayúsculas/minúsculas)
    java.util.List<Cliente> findByNombreContainingIgnoreCase(String nombre);

    // Buscar clientes por estado exacto (ACTIVO, INACTIVO, etc.)
    java.util.List<Cliente> findByEstado(String estado);

    // Buscar por nombre + estado al mismo tiempo
    java.util.List<Cliente> findByNombreContainingIgnoreCaseAndEstado(String nombre, String estado);
}
