# Sobre el respositorio
En este proyecto, construí una **aplicacion de control de catalogos**. Mi unico objetivo detras de este proyecto es aprender. Por ello, en el combino diferentes arquitecturas y patrones de diseño. Entre estos:
* Arquitectura de API REST
* Arquitectura MVC (Model View Controller)
* Inyeccion de dependencias

## Tecnologias usadas en la aplicacion
La aplicacion esta construida con Node.js y Javascrist. Ademas, implementa algunas otras tecnologias.
* [mySQL2](https://www.npmjs.com/package/mysql2)
* [Zod](https://zod.dev/)
* [Express](https://expressjs.com/es/)

## Inicializar la aplicacion
Para inicializar el proyecto en modo desarrollador, ejecutar lo siguiente:

```
npm run start-server *db_name*
```
> Allowed *db_name*'s: local, sql

La API esta alojada en la ruta */products*.

<br/>
Luego, para desplegar el proyecto en modo produccion, ejecutar lo siguiente:

```
npm start
```
