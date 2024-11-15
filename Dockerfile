# Usa la imagen base de Node.js
FROM node:18

# Crea y configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

ENV PORT=80

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Configura el comando de inicio
CMD ["npm", "start"]
