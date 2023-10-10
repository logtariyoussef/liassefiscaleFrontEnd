# Étape 1 : Construire l'application Node.js
#FROM node:16.17 as builder

# Créer un répertoire de travail
#WORKDIR /app

# Copier le code source de votre application dans l'image
#COPY . .

# Installer les dépendances et construire l'application
#RUN npm install
#RUN npm run build --prod

# Étape 2 : Construire l'image finale avec NGINX
#FROM nginx:latest
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/dist/projet-liasse-fiscale .
#EXPOSE 80
#ENTRYPOINT ["nginx", "-g", "daemon off;"]


# Utilisez une image de base Node.js pour construire l'application Angular
FROM node:16.17 as build

# Répertoire de travail
WORKDIR /app

# Copiez le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez les fichiers de l'application dans le conteneur
COPY . .

# Construisez l'application Angular
RUN npm run build

# Utilisez une image de base Nginx pour servir l'application
FROM nginx:alpine

# Copiez les fichiers construits de l'application Angular dans le répertoire d'Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exposez le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]



