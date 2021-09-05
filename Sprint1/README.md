# SprintProject1 (Api restaurante Delilah Restó)

Projecto tipo API para el cliente hipotético "Delilah Restó" en el cual como administrador de dicha API podrás:

1. Agregar, actualizar y eliminar **productos** y **medios de pago**

2. Acceder y modificar a los estados de los pedidos de los usuarios registrados en tu restaurante tales como **pendiente**, **confirmado**, **en preparación** y **entregado** con el fin de que tus usuarios tengan acceso a en que punto se encuentra su pedido.

Como usuario podrás:

1. Crear una cuenta y acceder a los productos que te ofrece Delilah Restó.

2. Realizar pedidos (ver, agregar, modificar y eliminar productos de tu pedido), puedes tambien **seleccionar medios de pago**  y que lleguen a la puerta de tu casa. También podrás tener un historial de todas las ordenes que ya fueron **confirmadas**.

## Recursos 

- Node.js
- Express.js
- Swagger
- Express Basic Auth

## Instalación 

Descarga el [repositorio](https://gitlab.com/JairAMora1995/sprints-acamica) en el anterior link e instala el package como se muestra a continuación, para tener todos los recursos para que funcione la API.

```bash
npm install
```

## Uso
1. Ejecuta el proyecto con el siguiente comando en la terminar. 
```bash
nodemon src/index.js
``` 
2. Accede a la documentacion de este proyecto con ayuda de Swagger, usando el siguiente [link](http://localhost:5000/api-docs), recuerde verificar que el puerto este siendo escuchado, para esto se recomienda la ejecucion vida **nodemon**.

3. El usuario **administrador** es **Delilah1** con su correspondiente clave **del0al10**, con este usuario tienes a todas las rutas de la API (es importante en el botón Autorize loguearse con el usuario con el que se va a trabajar), incluye los EndPoints terminados en (Admin) en las rutas Swagger.

## Rutas habilitadas para el usuario
En el endpoint de **"Registro"** para Swagger puedes crear gratis una cuenta nueva cumpliendo todos los items requeridos como se muestra en el siguiente ejemplo, mas sin embargo la documentación ya incluye los ejemplos:

```json
{
  "usuario": "JayM7",
  "nombre": "Jay Anderson Park",
  "password": "1234",
  "email": "jay_s@gmail.com",
  "direccion": "Call 134 No 13 -12",
  "telefono": 2345445
}
```
Luego de esto puedes logearte en la ruta POST/singup/logIn. Ya verificado el exitoso Logueo puedes autorizar los diferentes endpoints con un usuario y contraseña. De esta manera ya esta listo para usar y verificar la API para el cliente "Delilah Restó". 

## GitLab e Email del autor 
[Alvaro Jair Agudelo Mora - ruta BackEnd Acamica](https://gitlab.com/JairAMora1995)

jairmora07@gmail.com