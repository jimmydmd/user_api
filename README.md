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
- Aws
- Ubuntu server 24.04


## Descripcion del proyecto

Este proyecto es un API RESTful para la gestión de usuarios, desarrollada con NestJS y MongoDB. Incluye validaciones y documentación automática con Swagger. Preparada para desarrollo y despliegue mediante Docker. Inicialmente se consume un API para obtener el listado de los usuarios pero se implementa una base de datos NoSQl donde se poblan los datos desde el API consumida y se crea un CRUD con todas las opciones de gestion para los usuarios.



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

### 3. Desplegar el proyecto entorno local con Docker
```bash
docker-compose -f local.yml up --build
```

### 4. Desplegar el proyecto en ambiente de produccion
```bash
yarn install
yarn global add @nestjs/cli
yarn build


sudo docker compose -f production.yml build
sudo docker compose -f production.yml up
```

### 4. Documentación Swagger

Este proyecto cuenta con documentación automática de la API generada con **Swagger**.

### Acceso a Swagger UI

Una vez corras la aplicación (localmente o con Docker), accede a:

Localmente:
```bash
http://localhost:3000/documentation 
```

Produccion:
```bash
http://44.202.73.136:3000/documentation
```

Desde allí podrás:

- Explorar los endpoints disponibles
- Probar peticiones directamente desde la interfaz
- Ver los parámetros y respuestas esperadas

## 5. Opcional Colección de Postman

Para facilitar las pruebas de esta API, puedes importar la siguiente colección en [Postman](https://www.postman.com/):



👉 [Descargar colección Postman](./users_api.postman_collection.json)

En dicha colección se encuentra las peticiones para los dos ambientes (local, produccion) con las que se pueden realizar pruebas del ApiRest.

