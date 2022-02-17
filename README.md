### Documentación:

##### Comandos a ejecutar
1. Para compilar de TS a JS
```bash
npm run build
```
2. Ejecutar el proyecto
```bash
npm run dev-ts
```
o
```bash
npm run dev-js
```
#### Rutas API:
##### Productos
- GET: `/api/productos`
- GET: ``/api/productos/2``
- POST: ``/api/productos``
- PUT: ``/api/productos``
- DEL: ``/api/productos/2``

- POST: ``/api/productos?admin=true``
- PUT: ``/api/productos?admin=true``
- DEL: ``/api/productos/2?admin=true``
##### Carrito

- GET: ``/api/carrito/1/productos``
- POST: ``/api/carrito``
- DEL: ``/api/carrito/1/productos/2``
- DEL: ``/api/carrito/4``
- POST: ``/api/carrito/2/productos``

#### Rutas para la vista:

##### Auth
- Inicio - Login: `http://localhost:8080/auth/login`
- Registro: `http://localhost:8080/auth/register`
- Productos - Solo si estas logueado: `http://localhost:8080/productos`
#### Recursos utilizados

Como usar Typescript con NodeJS:
https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/
https://dev.to/roycechua/setup-a-node-express-api-with-typescript-2021-11o1

Mongoose:
https://github.com/Automattic/mongoose/issues/10632
https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

Errores Solucionados:
https://stackoverflow.com/questions/48481433/typescript-does-not-load-handlebar-files
https://stackoverflow.com/questions/59708405/css-not-rendered-on-all-routes-with-express-handlebars
