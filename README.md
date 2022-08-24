## Roles:
* "ADMIN"
* "CLIENTE"

## Descripcion:
EL usuario con rol "ADMIN" esta creado en base de datos con las siguientes credenciales:
* usuario: "admin@gmail.com"
* password: "1234"

Hay un archivo ```.json``` en el root de proyecto con el nombre ```Api-Proyecto-Final-Nodejs.json``` donde tiene todas las colecciones de API para ser ejecutado desde Postman, ordenados en carpetas segun el modelo(productos,carritos,mensajes,ordenes,usuarios). 
Se hizo desploy de la misma en la siguiente url: "https://ecommerce-nodejs-final.herokuapp.com/".

## Rol ADMIN:
1) en ruta "/api/info" tiene permisos luego de Login a la informacion solicitada, credenciales para verificar el envio de email con Ethereal Email.
2) tiene acceso a guardar, editar y borrar productos.

## Rol CLIENTE:
1) crear usuario desde api POST-"/api/users" con rol "CLIENTE" se notificara con envio de email su respuesta y confirmacion de registro.
2) Login para tener session y acceso POST-"/api/auth/login" con su correspondiente usuario y password. Luego para editar PUT-"/api/users/:id_usuario" y para obtener informacion de usuario es GET-"/api/users"
3) obtener productos:
* id - GET-"/api/productos/:id"
* todos - GET-"/api/productos"
* categoria (guitarras,teclados,baterias) - GET-"/api/productos/categoria/:categoria"
4) crear carrito desde POST-"/api/carrito"
5) agregar productos al carrito - POST-"/api/carrito/:id_carrito/productos", id_carrito que se obtiene de la respuesta de crear carrito, y en el body tiene el id del producto agregar.
6) borrar productos del carrito - DELETE-"/api/carrito/:id_carrito/productos/:id_producto"
7) listar todos los productos del carrito - GET-"/api/carrito/:id_carrito/productos" se podra ver todos los productos agregados al carrito.
8) borrar carrito DELETE-"/api/carrito/:id_carrito" en donde se borrar por completo el carrito.
9) Luego de tener carrito con productos viene crear la orden POST-"/api/orden" donde atomaticamente enviar un email con el detalle de la compra y se borra el carrito.
10) obtener ordenes segun el usuario GET-"/api/orden"

## Mensajes:
1) crear mensajes POST-"/api/chats" segun el usuario en session se guarda el tipo de mensaje si es "sistema" (ADMIN) o "usuario" (CLIENTE).
2) para obtener los mensajes segun el usuario es GET-"/api/chats/:email_usuario"