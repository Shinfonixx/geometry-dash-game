# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "src/index.js" ]