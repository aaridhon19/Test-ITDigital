# Gunakan base image node versi LTS
FROM node:lts-alpine

# Set working directory di dalam container
WORKDIR /usr/src/app

# Install dependensi aplikasi
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 4000

# Command untuk menjalankan aplikasi saat container dijalankan
CMD [ "npm", "start" ]
