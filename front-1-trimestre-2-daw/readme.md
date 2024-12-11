# Guia Instalación

Instalar gulp: npm install -g gulp 

Instalar sass: npm install -g sass

Instalar gulp-sass: npm install -g gulp-sass


# Instrucciones en primera instalacion

1º Instalar todo lo anterior

2º Poner comando npm init

3º Poner comando npm install gulp --save-dev


# Extensiones Utiles

Material Icon Theme

Live Server


# Ejecutar comandos SASS

Ejecutar el .scss para hacer los cambios en el .css:  "sass source/main.scss build/css/index.css"


# Posibles errores

sass : No se puede cargar el archivo C:\Users\Lenovo\AppData\Roaming\npm\sass.ps1. El archivo C:\Users\Lenovo\AppData\Roaming\npm\sass.ps1 no está firmado digitalmente. No se puede ejecutar este script en el sistema actual.

Solucion: Abrir PowerShell como administrador y poner el siguiente comando: Set-ExecutionPolicy RemoteSigned, al darle enter, te saldra varias opciones, dale que SI


# Actualizar el css desde scss

sass source/main.scss build/css/index.css