## Descarga repositorio Git
Debe seguir los siguientes pasos para clonar el repositorio y ejecutar en local:
```bash
git clone https://github.com/Libardomo10/inventory-system.git
cd inventory-system
```

## Backend
Se debe realizar la descarga completa del repositorio y ejecutar el Query
que se encuentra en la base de este repositorio con nombre QueryDataBase.sql
la cual tiene creación de la base de datos, tabla e inserción de datos.

```bash
cd backend/Inventory.API
dotnet restore
dotnet run
```

## Frontend
Para el proyecto frontend debe ubicarse en el proyecto inventory-ui por terminal
(preferiblemente git bash) y ejecutar los siguientes comandos:

```bash
cd inventory-system/frontend/inventory-ui
npm install
npm start 
```

## Versiones
El proyecto esta en las siguientes versiones.
.Net: 9
Angular CLI: 20.3.25
Node: 20.20.0

Para ingresar al sistema por interfaz normal se encuentran las siguientes credenciales:

{
  "username": "admin",
  "password": "Admin123!"
}
