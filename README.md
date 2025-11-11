📑 Resumen del Proyecto CRM Empresarial
1. Resumen del Proyecto
El proyecto consiste en el desarrollo, en grupo, de un CRM (Customer Relationship Management) empresarial Full Stack. Este sistema permitirá a una empresa gestionar su cartera de clientes, contactos, incidencias, tareas comerciales y métricas de rendimiento.



2. Stack Tecnológico
El sistema se basa en una arquitectura multicapa moderna:


Frontend: Desarrollado en Angular 20 con diseño responsivo e interfaces dinámicas. Utiliza TypeScript, RxJS.





Backend: Implementado en Spring Boot (Java 21), usando controladores REST, servicios y repositorios.



Base de Datos: Elegida por el grupo (MySQL, PostgreSQL, MongoDB, etc.).


3. Arquitectura del Sistema
La arquitectura está claramente dividida:


Backend (Spring Boot): Utiliza la arquitectura MVC + REST. Implementa servicios concurrentes (ExecutorService) para tareas en segundo plano (notificaciones, recordatorios). La persistencia se gestiona con JPA/Hibernate.




Frontend (Angular 20): Estructura modular. Gestiona estados y asincronía con observables (RxJS) y HttpClient para consumir la API REST.


4. Alcance Funcional Mínimo
El proyecto requiere la implementación de los siguientes módulos obligatorios:


Gestión de clientes: CRUD completo (alta, baja, modificación, listado, búsqueda por filtros).


Gestión de contactos e incidencias: Relación cliente-contacto-incidencia (1:N) y notificaciones automáticas por cambios de estado.


Gestión de tareas comerciales: Creación y asignación de tareas, control de estado, fechas y prioridad.


Gestión de usuarios y roles: Sistema de autenticación y autorización (Spring Security / JWT).



Dashboard y estadísticas: Representación gráfica de métricas clave (clientes activos, incidencias, tareas completadas).

5. Flujo de Trabajo y Control de Versiones
El equipo de 4 personas utiliza un flujo de trabajo ágil gestionado por GitHub Projects.


Flujo de Ramas: Se utiliza el modelo Gitflow simplificado: main (producción) y develop (integración estable).

Feature Branches: Todo el desarrollo se realiza en ramas feature/NUMERO-ISSUE-... creadas a partir de develop.

Asignación: El trabajo se divide en 17 Issues de forma equitativa para que todos adquieran experiencia Full Stack (tocando Frontend y Backend).

6. Estándares de Calidad (Ruleset)
Para garantizar la integridad del código y la Revisión Cruzada, se implementó un Ruleset estricto en las ramas main y develop:

Pull Request Obligatorio: El código solo puede fusionarse mediante un PR.

Revisión Cruzada Obligatoria: Todo PR requiere 1 aprobación de otro compañero antes de fusionarse.

Control de Historial: Se bloquean los force pushes y se anulan las aprobaciones si se suben nuevos commits, forzando al Revisor a verificar el cambio final.

Resolución de Conversaciones: Todos los comentarios de la revisión deben ser resueltos antes de la fusión.

7. Alcance Mínimo de Entrega (40%)
Para la primera entrega del proyecto, el equipo debe completar 7 Issues (Issues #1 a #7), lo que cubre más del 40% del proyecto total. Esto asegura la funcionalidad completa de la Arquitectura, Seguridad, Módulo de Clientes y el modelado base de Contactos.
