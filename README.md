# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

Recordar que se deben reconstruir los módulos de node con el comando

```
npm install
```

Para correr localmente el proyecto debe ejecutar el comando
```
node sever/server
```
o
```
npm run start
```

Finalmente acceder a:
```
localhost:3000
```

# Funcionalidad
La aplicación consta de dos vistas sencillas, la primera un formulario que pide ingresar un nombre de usuario y el nombre para un sala, una vez ingresados estos datos se accederá al chat.

Si otro usuario desea ingresar a algún chat previamente creado, deberá especificar el mismo nombre de sala y de esta manera todos los usuarios concetados a la misma sala podrán interactuar.

Por ejemplo: 
- El usuario 'Juan' se concta a la sala 'Juegos'
- Luego, el usuario 'Pedro' iingresa a la sala 'Juegos'
- Los usuarios 'Juan' y 'Pedro' se encuentran en la misma sala y podrán chatear.



La aplicación guarda los mensajes enviados, junto con la información del usuario que envía el mensaje y la hora exacta del envío, en una base de datos creada en MongoDB Atlas (https://www.mongodb.com/cloud).

La aplicación funciona con:
- NodeJS
- Express
- Sockets
- MongoDB

Para simular los clientes web y la parte front de la manera mas sencilla posible se usó vanilla JS, jquery y html, sin nigún framework.

