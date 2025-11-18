# 🚀 CRM Empresarial Full Stack (Proyecto DAM2)

## 🎯 1. Resumen y Objetivo del Proyecto

El proyecto consiste en el desarrollo de un **CRM (Customer Relationship Management)** empresarial Full Stack que cubre todos los módulos de gestión.

| Bloque | Componentes Clave | Propósito |
| :--- | :--- | :--- |
| **Tecnología Principal** | **Angular 20 / Spring Boot (Java 21)** | Arquitectura multicapa moderna. |
| **Persistencia** | **MySQL** | Base de datos elegida para el proyecto. |
| **Innovación** | **Git Rulesets & Concurrencia** | Control de calidad del código y gestión de procesos asíncronos. |

***

## 2. Arquitectura, Stack Tecnológico y Alcance Funcional

El sistema está diseñado bajo una arquitectura de servicios REST con enfoque en la modularidad y el rendimiento.

### 2.1. Stack Tecnológico

| Capa | Tecnología | Características Clave |
| :--- | :--- | :--- |
| **Frontend** | **Angular 20 (Signals, Tailwind CSS)** | Uso de **Angular Signals** para reactividad fina y **Tailwind CSS** para un diseño responsivo. |
| **Backend** | **Spring Boot (Java 21, JPA)** | Arquitectura RESTful, **Spring Security** para JWT. |
| **Concurrencia** | **Java `ExecutorService`** | Aplicación de hilos para tareas programadas (notificaciones, recordatorios). |

### 2.2. Alcance Total del Proyecto (21 Issues)

El proyecto se estructura en **17 Issues obligatorios** y **4 Issues de Extensión Opcional**.

| Tipo de Issue | Módulos Principales Cubiertos | Puntos del Checklist Cubiertos |
| :--- | :--- | :--- |
| **17 Issues Obligatorios** | Clientes, Contactos, Tareas, Seguridad, Concurrencia, Dashboard. | Cobertura del 100% de la funcionalidad mínima requerida. |
| **4 Issues de Extensión** | Reportes PDF, Tiempo Real (WebSockets), Modo Offline (PWA), Integración API Externa. | Valor añadido y demostración de dominio avanzado. |

***

## 👥 3. Equipo y Colaboración

El equipo de 4 compañeros opera bajo una estructura horizontal, con asignación cruzada de tareas para asegurar la experiencia Full Stack de todos.

| Compañero | Enfoque Inicial | Carga (Issues Asignados) |
| :--- | :--- | :--- |
| **Jean** | Backend | 5 Issues |
| **Sergio** | Frontend | 4 Issues |
| **Grillete** | Backend | 4 Issues |
| **Javi** | Frontend | 4 Issues |

***

## 🔒 4. Flujo de Trabajo y Estándares de Calidad

El control de calidad es la principal innovación metodológica, impuesta mediante un **Ruleset de Protección de Ramas** en GitHub.

### 4.1. Reglas de Ruleset

Para garantizar la calidad y la revisión, el código solo puede ingresar a `develop` si cumple con:

* **Pull Request Obligatorio:** El código solo puede fusionarse en `develop` mediante un PR.
* **Revisión Cruzada:** Todo PR requiere **1 aprobación de otro compañero** antes de fusionarse.
* **Integridad del Código:** Las aprobaciones se anulan si el autor del PR sube nuevos *commits*, forzando al Revisor a verificar el cambio final.

### 4.2. Flujo de Ramas

* **`main`**: Producción / Entrega Final.
* **`develop`**: Rama de integración estable y probada.
* **`feature/*`**: Ramas de trabajo aisladas para cada Issue.

***

## 5. Instrucciones de Ejecución

### 5.1. Prerrequisitos

* Java 21 JDK y Maven.
* Node.js (LTS) y Angular CLI.
* Servidor **MySQL** funcionando con la base de datos **`crm_db`** creada.

### 5.2. Ejecutar Backend (Spring Boot)

1.  Abre la carpeta `crm-backend`.
2.  Asegúrate de que tus credenciales en `application.properties` sean correctas.
3.  Ejecuta la aplicación:
    ```bash
    ./mvnw spring-boot:run
    ```

### 5.3. Ejecutar Frontend (Angular)

1.  Abre el proyecto `crm-frontend`.
2.  Instala las dependencias: `npm install`.
3.  Inicia el servidor de desarrollo: `ng serve`.
