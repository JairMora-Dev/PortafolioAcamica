# SprintProject2 (Api restaurante Delilah Restó - persistente)

Proyecto tipo API para el cliente hipotético "Delilah Restó" en el cual como administrador de dicha API podrás:

1. Agregar, actualizar y eliminar **productos** y **medios de pago**

2. Acceder y modificar a los estados de las ordenes de los usuarios registrados en tu restaurante tales como **pendiente**, **confirmada**, **en preparación**, **enviada** y **entregada** con el fin de que los usuarios tengan acceso a en que punto se encuentra su pedido.

Como usuario podrás:

1. Crear una cuenta y recibir un **token** para acceder a los productos y servicios que te ofrece Delilah Restó.

2. Realizar pedidos (ver, agregar, modificar y eliminar productos de tu pedido), puedes tambien **seleccionar medios de pago**  y que lleguen esas ordenes a cualquiera de tu agenda personalizable de direcciones.

## Recursos 

- Node.js
- Express.js
- Swagger
- Helmet
- Bcrypt
- Dotenv
- Jsonwebtoken
- MySQL
- Redis
- Sequelize
- Chai
- Chai-http
- Mocha

## Instalación 

1. Accede a la instancia EC2 de AWS con ayuda del archivo **UbuntuS3.pem** enviado junto con el proyecto. Ubicandose al mismo nivel de carpetas donde se encuentra el archivo antes mencionado, ejecuta:
```bash
ssh -i UbuntuS3.pem ubuntu@'Dirección IPv4 pública de la instancia en AWS'
```

2. De no contar con el proyecto descarga el [repositorio](https://github.com/JairMora-Dev/PortafolioAcamica/tree/main/Sprint3) en el anterior link e instala el contenido del package.json como se muestra en el siguiente comando, con el fin de tener los recursos necesarios para API. El archivo **.env** lo puede solicitar a mi contacto por correo electronico.   

```bash
npm install
```

## Uso
1. Una vez dentro de la instancia, dirijase a la siguiente ruta dentro del sistema operativo 
```bash
/home/ubuntu/Desktop/PortafolioAcamica/Sprint3
```

2. El proyecto cuenta con dos ecosistemas de ejecucion: **Modo desarrollador** y **Modo para producción**, teniendo en cuenta esto puede ejecutar, segun corresponda:   
```bash
pm2 ecosystem.config.js --env local --watch
```
o

```bash
pm2 ecosystem.config.js --env production --watch
```

3. La API tambien cuenta con un comando para realizar breves *test* para el registro de usuarios en los servicios de la misma, para ello ejecute:

```bash
npm run test 
```

3. Accede a la documentacion de este proyecto con ayuda de Swagger, usando el siguiente [link](https://mydevpageapi.tk/api-docs/), recuerde verificar que el puerto este siendo escuchado, para esto se recomienda la ejecucion via **pm2**. Además la pagina cuanta con un certificado HTTPS y su dominio propio.

4. En Swagger estan todos los parametros establecidos para ADMIN y el User por defecto. Mas sin embargo a continuacion se muestra los correos de acceso y claves para AMIN y USER defaults: 

|                |ADMIN                          |USER                         |
|----------------|-------------------------------|-----------------------------|
|Email           | delilah_resto@gmail.com       |lenny_music@gmail.com        |
|Password        |    delilahKey1234             | elpapuNigga                 |


5. Con esto es suficiente para poder empezar a utilizar los diferentes EndPoints que aparecen en la API.

**ALGO IMPORTANTE** es que concidero que los usuarios deben poder acceder a obtener los medios de pagos dispoibles en la API, por esta razon deje abierta esa validacion para usuarios registrados en Delilha Resto, ademas de esto el proyecto no tiene username de usuario, con el fin de que la validacion de datos ingresados sea **unica** para cada nuevo usuario, el projecto cuenta con un middleware que impide que existan **emails** duplicados y por tanto, usuarios con informacion duplicada. 


## GitHub e Email del autor 
[Alvaro Jair Agudelo Mora - portafolio BackEnd Acamica](https://github.com/JairMora-Dev/PortafolioAcamica)

jairmora07@gmail.com