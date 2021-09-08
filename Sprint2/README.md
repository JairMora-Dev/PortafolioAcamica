# SprintProject2 (Api restaurante Delilah Restó - persistente)

Projecto tipo API para el cliente hipotético "Delilah Restó" en el cual como administrador de dicha API podrás:

1. Agregar, actualizar y eliminar **productos** y **medios de pago**

2. Acceder y modificar a los estados de las ordenes de los usuarios registrados en tu restaurante tales como **pendiente**, **confirmada**, **en preparación**, **enviada** y **entregada** con el fin de que los usuarios tengan acceso a en que punto se encuentra su pedido.

Como usuario podrás:

1. Crear una cuenta y recibir un **token** para acceder a los productos y servicios que te ofrece Delilah Restó.

2. Realizar pedidos (ver, agregar, modificar y eliminar productos de tu pedido), puedes tambien **seleccionar medios de pago**  y que lleguen esas ordenes a cualquiera de tu agenda personalizable de direcciones.

## Recursos 

- Node.js
- Express.js
- Swagger
- Express Basic Auth
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

1. Crea una base de datos en tu MySQL con el nombre **DelilahS2_DB**

2. Descarga el [repositorio](https://github.com/jairMora007/PortafolioAcamica/tree/main) en el anterior link e instala el package como se muestra a continuación, con el fin de tener los recursos necesarios para API. El archivo **.env** es enviado en formato .zip junto con todo el proyecto.  

```bash
npm install
```

## Uso
1. Ejecuta el proyecto con el siguiente comando en la terminar. 
```bash
npm run dev
``` 
o si no posee nodemon puede ejecutar el proyecto con el comando:
```bash
node src/index.js
``` 
Al momento de ejecutar el comando, el codigo automaticamente generara las tablas (users, products, addresses, operations, orders y payMethods con sus respectivas ForeingKey) dentro de la base de datos, con dos usuarios por defecto en la tabla **users**, uno ADMIN y el otro user. 

2. Una vez ejecutado exitosamente el proyecto, en la carpeta **src/seeds** existe un script formato SQL, el cual debe ser ejecutado desde la interfaz de terminal de MySQL usando el comando (para reconocer que usted estan en la interfaz de terminal de MySQL en la temrinal debe aparecer **mysql>** ): 

```bash
source /ruta comlpleta de la ubicacion del archivo SQL
```
Esto generara automaticamente un llenado en la tablas de datos de products, addresses y payMethods.

**NOTA:** El script solo debe ser ejecutado una vez, para no duplicar datos en la base de datos. Si no sabe como realizar la ejecucion de este formato de scripts con MySQL porfavor, dirijase al siguiente [tutorial](https://www.youtube.com/watch?v=SGSzBqz30Rs).  

3. Accede a la documentacion de este proyecto con ayuda de Swagger, usando el siguiente [link](http://localhost:5000/api-docs), recuerde verificar que el puerto este siendo escuchado, para esto se recomienda la ejecucion via **nodemon**.

4. En Swagger estan todos los parametros establecidos para ADMIN y el User por defecto. Mas sin embargo a continuacion se muestra los correos de acceso y claves para AMIN y USER defaults: 

|                |ADMIN                          |USER                         |
|----------------|-------------------------------|-----------------------------|
|Email           | delilah_resto@gmail.com       |lenny_music@gmail.com        |
|Password        |    delilahKey1234             | elpapuNigga                 |


5. Con esto es suficiente para poder empezar a utilizar los diferentes EndPoints que aparecen en la API.


## GitLab e Email del autor 
[Alvaro Jair Agudelo Mora - portafolio BackEnd Acamica](https://github.com/jairMora007)

jairmora07@gmail.com