package com.dam2.crm.repository;

import com.dam2.crm.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByNombreContainingIgnoreCase(String nombre);

    List<Cliente> findByEstado(String estado);

    List<Cliente> findByNombreContainingIgnoreCaseAndEstado(String nombre, String estado);

    long countByEstado(String estado);
}