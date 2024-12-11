# Usa una imagen base de Node.js ligera
FROM node:18
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias necesarias
RUN npm install --production

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto que usará el servidor
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
