<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Users API

API RESTful construida con **NestJS** y **MongoDB**, preparada para desarrollo local mediante **Docker**.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- TypeScript
- Yarn


## Descripcion del proyecto

Este proyecto es un API RESTful para la gestión de usuarios, desarrollada con NestJS y MongoDB. Incluye validaciones y documentación automática con Swagger. Preparada para desarrollo y despliegue mediante Docker.



## Configuración local con Docker

### 1. Clonar el repositorio

```bash
git clone https://github.com/jimmydmd/user_api.git
cd user_api
```
### 2. Agregar variables de entorno

```bash
cp .env.example .env
```

### 3. Levantar el entorno local con Docker
```bash
docker-compose -f local.yml up --build
```

### 4. Documentación Swagger

Este proyecto cuenta con documentación automática de la API generada con **Swagger**.

### Acceso a Swagger UI

Una vez corras la aplicación (localmente o con Docker), accede a:

http://localhost:3000/documentation 

Desde allí podrás:

- Explorar los endpoints disponibles
- Probar peticiones directamente desde la interfaz
- Ver los parámetros y respuestas esperadas

## 5. Opcional Colección de Postman

Para facilitar las pruebas de esta API, puedes importar la siguiente colección en [Postman](https://www.postman.com/):



👉 [Descargar colección Postman](./dev.users.api.postman_collection.json)

Una vez importada, asegúrate de ajustar el entorno base (por ejemplo, `http://localhost:3000`).
