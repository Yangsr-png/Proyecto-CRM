package com.dam2.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardMetricsDTO {

    private long totalClientes;
    private long clientesActivos;

    private long totalContactos;

    private long totalIncidencias;
    private long tareasPendientes;
}