# API REST con autenticación JWT

Backend desarrollado con **Node.js y Express** como parte de la actividad de Ingeniería de Software de la Universidad Anáhuac Mayab.

El proyecto implementa una API REST que permite registrar usuarios, iniciar sesión mediante autenticación JWT y administrar tareas mediante operaciones CRUD protegidas.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- bcrypt para el cifrado de contraseñas
- dotenv para la gestión de variables de entorno

## Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB o una instancia de MongoDB Atlas.

## Instalación

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

2. Entrar al directorio del proyecto:

```bash
cd NOMBRE_DEL_PROYECTO
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Configurar las siguientes variables de entorno:

```env
PORT=5000
JWT_SECRET=tu_clave_secreta
MONGO_URI=tu_cadena_de_conexion
```

**Importante:** No compartir ni subir el archivo `.env` al repositorio. Las credenciales y claves secretas deben mantenerse privadas.

## Ejecución

Para iniciar el servidor, ejecutar:

```bash
npm start
```

Si el proyecto utiliza nodemon para desarrollo, ejecutar:

```bash
npm run dev
```

Una vez iniciado, la API estará disponible en:

```text
http://localhost:5000
```

## Endpoints disponibles

### Usuarios

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| POST | `/api/users` | Registrar un usuario | No |
| POST | `/api/users/login` | Iniciar sesión y obtener JWT | No |
| GET | `/api/users/datos` | Obtener los datos del usuario autenticado | Sí |

### Tareas

Todas las rutas de tareas requieren autenticación mediante Bearer Token.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tareas` | Obtener las tareas del usuario autenticado |
| POST | `/api/tareas` | Crear una nueva tarea |
| PUT | `/api/tareas/:id` | Actualizar una tarea propia |
| DELETE | `/api/tareas/:id` | Eliminar una tarea propia |

## Autenticación JWT

La API utiliza JSON Web Tokens (JWT) para proteger las rutas que requieren autenticación.

Después de iniciar sesión correctamente, el servidor devuelve un token que debe enviarse en el header `Authorization` de las solicitudes protegidas.

Ejemplo:

```http
Authorization: Bearer TU_TOKEN_JWT
```

## Seguridad y aislamiento de datos

El proyecto implementa las siguientes medidas de seguridad:

- Las contraseñas se almacenan utilizando hashing con bcrypt.
- La autenticación se realiza mediante JWT.
- Las rutas de tareas están protegidas mediante un middleware de autenticación.
- El identificador del usuario se obtiene del token validado.
- Cada tarea está asociada al usuario que la creó.
- Las consultas de tareas filtran los resultados por el identificador del usuario autenticado.
- Un usuario no puede consultar, modificar ni eliminar tareas pertenecientes a otro usuario.

## Autor

**Ricardo Vargas Rodríguez**

Ingeniería de Software  
Universidad Anáhuac Mayab
