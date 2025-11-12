# 📑 Resumen del Proyecto CRM Empresarial

## 1. Resumen y Objetivo del Proyecto

El proyecto consiste en el desarrollo, en grupo, de un **CRM (Customer Relationship Management)** Full Stack que cubra los módulos de clientes, contactos, tareas comerciales y métricas de rendimiento.

| Bloque | Componentes Clave | Propósito |
| :--- | :--- | :--- |
| **Tecnología Principal** | **Angular 20 / Spring Boot (Java 21)** | Arquitectura multicapa moderna. |
| **Objetivo Funcional** | Gestión de Clientes, Tareas, Contactos y Métricas | Cubrir el alcance mínimo definido. |
| **Hito 1ª Entrega** | **7 Issues Finalizados** | Cubre la Arquitectura, Seguridad, y el 40% del proyecto total. |

---

## 2. Arquitectura del Sistema y Stack Tecnológico

| Capa | Tecnología | Características Obligatorias |
| :--- | :--- | :--- |
| **Frontend** | **Angular 20** (TypeScript, RxJS) | Diseño responsivo e interfaces dinámicas. Gestión asíncrona con RxJS. |
| **Backend** | **Spring Boot (Java 21)** | Arquitectura MVC + REST, Controladores JSON. |
| **Concurrencia** | **Java `ExecutorService`** | Aplicación de hilos y procesos para tareas programadas (notificaciones, recordatorios). |
| **Persistencia** | JPA / Hibernate | Modelado de entidades con relaciones 1:N y N:M. |
| **Seguridad** | Spring Security / JWT | Sistema de autenticación y autorización. |

---

## 3. Flujo de Trabajo y Estándares de Calidad

El proyecto se gestiona con una metodología ágil en **GitHub Projects**.


### 🔒 Reglas de Ruleset (Definición de 'Terminado')

Las ramas `main` y `develop` están protegidas para forzar el flujo de calidad y la revisión cruzada.

* **PR Requerido:** El código solo puede fusionarse mediante un Pull Request.
* **Aprobación Cruzada:** Todo PR requiere **1 aprobación de otro compañero** antes de fusionarse.
* **Integridad del Código:** Las aprobaciones se descartan si hay nuevos *commits*, y todas las conversaciones deben ser resueltas antes de la fusión.

---

## 4. Alcance Mínimo de Entrega (40%)

La primera entrega requiere la finalización de los siguientes Issues para superar el 40% del proyecto:

* **Issues #1 a #6:** Cobertura total de Arquitectura, Seguridad, y el CRUD de Clientes.
* **Issue #7:** Inicio del modelado de Contactos.
