# 📑 Resumen del Proyecto CRM Empresarial

## 1. Resumen y Objetivo del Proyecto

[cite_start]El proyecto consiste en el desarrollo, en grupo, de un **CRM (Customer Relationship Management)** Full Stack que cubra los módulos de clientes, contactos, tareas comerciales y métricas de rendimiento[cite: 5].

| Bloque | Componentes Clave | Propósito |
| :--- | :--- | :--- |
| **Tecnología Principal** | **Angular 20 / Spring Boot (Java 21)** | [cite_start]Arquitectura multicapa moderna[cite: 6, 7, 8]. |
| **Objetivo Funcional** | Gestión de Clientes, Tareas, Contactos y Métricas | [cite_start]Cubrir el alcance mínimo definido [cite: 26-33]. |
| **Hito 1ª Entrega** | **7 Issues Finalizados** | Cubre la Arquitectura, Seguridad, y el 40% del proyecto total. |

---

## 2. Arquitectura del Sistema y Stack Tecnológico

| Capa | Tecnología | Características Obligatorias |
| :--- | :--- | :--- |
| **Frontend** | **Angular 20** (TypeScript, RxJS) | [cite_start]Diseño responsivo e interfaces dinámicas[cite: 7]. [cite_start]Gestión asíncrona con RxJS[cite: 55]. |
| **Backend** | **Spring Boot (Java 21)** | [cite_start]Arquitectura MVC + REST, Controladores JSON[cite: 46, 47]. |
| **Concurrencia** | **Java `ExecutorService`** | [cite_start]Aplicación de hilos y procesos para tareas programadas (notificaciones, recordatorios)[cite: 43, 49]. |
| **Persistencia** | JPA / Hibernate | [cite_start]Modelado de entidades con relaciones 1:N y N:M[cite: 50, 60]. |
| **Seguridad** | Spring Security / JWT | [cite_start]Sistema de autenticación y autorización[cite: 42, 51]. |

---

## 3. Flujo de Trabajo y Estándares de Calidad

El proyecto se gestiona con una metodología ágil en **GitHub Projects**.

### 👥 Equipo y Distribución Equitativa (17 Issues)

La carga se distribuye para que todos obtengan experiencia Full Stack.

| Compañero | Enfoque Inicial | Total Issues |
| :--- | :--- | :--- |
| **Jean** | Backend | 5 |
| **Sergio** | Frontend | 4 |
| **Grillete** | Backend | 4 |
| **Javi** | Frontend | 4 |

### 🔒 Reglas de Ruleset (Definición de 'Terminado')

[cite_start]Las ramas `main` y `develop` están protegidas para forzar el flujo de calidad y la revisión cruzada[cite: 81].

* [cite_start]**PR Requerido:** El código solo puede fusionarse mediante un Pull Request[cite: 71].
* **Aprobación Cruzada:** Todo PR requiere **1 aprobación de otro compañero** antes de fusionarse.
* **Integridad del Código:** Las aprobaciones se descartan si hay nuevos *commits*, y todas las conversaciones deben ser resueltas antes de la fusión.

---

## 4. Alcance Mínimo de Entrega (40%)

La primera entrega requiere la finalización de los siguientes Issues para superar el 40% del proyecto:

* **Issues #1 a #6:** Cobertura total de Arquitectura, Seguridad, y el CRUD de Clientes.
* **Issue #7:** Inicio del modelado de Contactos.
