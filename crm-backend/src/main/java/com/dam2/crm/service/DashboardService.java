package com.dam2.crm.service;

import com.dam2.crm.dto.DashboardMetricsDTO;
import com.dam2.crm.repository.ClienteRepository;
import com.dam2.crm.repository.ContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ContactoRepository contactoRepository;

    public DashboardMetricsDTO getMetrics() {

        long totalClientes = clienteRepository.count();
        long clientesActivos = clienteRepository.countByEstado("ACTIVO");

        long totalContactos = contactoRepository.count();

        long totalIncidencias = 0;
        long tareasPendientes = 0;

        return new DashboardMetricsDTO(
                totalClientes,
                clientesActivos,
                totalContactos,
                totalIncidencias,
                tareasPendientes);
    }
}