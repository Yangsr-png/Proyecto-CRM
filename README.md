#  Proyecto Intermodular: CRM Empresarial Full Stack

##  Resumen del Proyecto

Este proyecto consiste en el desarrollo de un **CRM (Customer Relationship Management)** empresarial de arquitectura multicapa, diseñado para que una organización pueda gestionar eficientemente su cartera de clientes, contactos, incidencias, y el rendimiento de sus tareas comerciales.

El CRM es un producto **Full Stack** desarrollado en el marco del Proyecto Intermodular de **DAM2**.

---

##  Stack Tecnológico

El sistema ha sido diseñado con una arquitectura moderna que separa claramente las capas de presentación, lógica de negocio y persistencia.

| Capa | Tecnología | Características Clave |
| :--- | :--- | :--- |
| **Frontend** | **Angular 20+** | Interfaces dinámicas, diseño responsivo, RxJS para asincronía. |
| **Backend** | **Spring Boot (Java 21)** | Arquitectura MVC + REST, Controladores REST, Servicios concurrentes. |
| **Persistencia** | [Elegir: **MySQL** / **PostgreSQL** / **MongoDB**] | Modelado de entidades (JPA/Hibernate para relacionales). |
| **Concurrencia** | **Java Threads / ExecutorService** | Tareas programadas, notificaciones, procesamiento en segundo plano. |
| **Seguridad** | **Spring Security / JWT** | Autenticación basada en tokens o sesiones, gestión de roles. |

---

##  Arquitectura del Sistema

### 1. Backend (Spring Boot / Java 21)

* **Arquitectura:** MVC (Modelo-Vista-Controlador) enfocada en exponer **APIs REST** (JSON).
* **Controladores:** Utilización de `@RestController` para la gestión de *endpoints*.
* **Concurrencia:** Implementación de **`ExecutorService`** y `ScheduledExecutorService` para la gestión eficiente de hilos y tareas programadas (e.g., envío de recordatorios, generación de informes).
* **Persistencia:** Utilización de **JPA / Hibernate** para la abstracción y gestión de datos a través de repositorios y entidades.
* **Autenticación:** Implementación de una API de seguridad mediante **JWT** (JSON Web Tokens) o sesiones.

### 2. Frontend (Angular 20+)

* **Estructura:** Modular con componentes, servicios y sistema de *routing* avanzado.
* **Comunicación:** Consumo de la API REST del Backend mediante `HttpClient`.
* **Gestión de Estados:** Manejo de la asincronía y flujo de datos con **Observables (RxJS)** y `async/await`.
* **Diseño:** Interfaz **responsiva** y usable, implementada con [Elegir: **Angular Material** / **Bootstrap**]
* **Visualización:** Uso de librerías de *charts* (Angular Charts) para el Dashboard.

---

## ⚙️ Alcance Funcional (Módulos Mínimos)

El sistema debe cubrir los siguientes módulos funcionales, cumpliendo con la definición de CRUD (Create, Read, Update, Delete) y la lógica de negocio requerida:

| Módulo | Descripción Funcional | Elementos Técnicos Clave |
| :--- | :--- | :--- |
| **Gestión de Clientes** | CRUD completo, incluyendo listado, filtros de búsqueda y paginación. | Entidades de JPA / Modelos TypeScript. |
| **Contactos e Incidencias** | Relación jerárquica: Cliente (1) -> Contacto (N) -> Incidencia (N). Incluye notificaciones automáticas por cambio de estado. | Procesos concurrentes para notificaciones. |
| **Tareas Comerciales** | Creación, asignación de tareas a usuarios, control de estados, fechas y niveles de prioridad. | Autenticación y Autorización (Roles). |
| **Dashboard y Estadísticas** | Representación gráfica de métricas clave (clientes activos, incidencias abiertas, tareas completadas). | Angular Charts, Endpoints REST de Spring para métricas. |
| **Usuarios y Roles** | Sistema robusto de autenticación y autorización para diferenciar accesos. | Spring Security, roles de usuario, JWT. |
| **Procesamiento Concurrente** | Tareas programadas en segundo plano (e.g., envío de emails de recordatorio, backups periódicos, generación de informes pesados). | Implementación de `ExecutorService` o *Scheduling* en Java. |

---

###  Flujo de Trabajo y Control de Versiones

Utilizamos una metodología ágil gestionada por **GitHub Projects** con un modelo de Sprints.

#### 1. Estándares de Codificación
* **Convención de Ramas:** Toda nueva funcionalidad o corrección debe ser creada a partir de la rama `develop` bajo el formato: `feature/NUMERO-ISSUE-descripcion` (Ej: `feature/5-crud-clientes`).
* **Cierre de Tareas:** Los Pull Requests (PRs) deben incluir en su descripción el comando `Closes #NUMERO-ISSUE` para automatizar el cierre.

#### 2. Definición de 'Terminado' (DoD) y Revisión Cruzada
Una tarea (Issue) se considera **"Terminada" (DONE)** solo si cumple con los siguientes puntos de **Responsabilidad Compartida**:

1.  El código cumple con todos los criterios de aceptación del Issue.
2.  Se ha abierto un **Pull Request (PR)** para la rama `develop`.
3.  El PR ha sido revisado y **aprobado por otro compañero** 
4.  El código ha sido fusionado a la rama `develop` y pasa las pruebas locales.

---


#### Alcance Mínimo (40% para la 1ª Entrega)
La primera entrega obligatoria corresponde a la finalización de los siguientes módulos esenciales (7 Issues, cubriendo más del 40% del proyecto):

Arquitectura y Seguridad (Setup, JWT, Login/AuthGuard).

Módulo Clientes (CRUD Completo).

Inicio del Módulo Contactos (Modelado y CRUD base).




### 1. Configuración del Backend

1.  Clonar el repositorio:
    ```bash
    git clone [https://aws.amazon.com/es/what-is/repo/](https://aws.amazon.com/es/what-is/repo/)
    cd crm-backend
    ```
2.  Configurar la conexión a la base de datos en `src/main/resources/application.properties` (o `application.yml`).
3.  Compilar y ejecutar la aplicación Spring Boot:
    ```bash
    ./mvnw spring-boot:run
