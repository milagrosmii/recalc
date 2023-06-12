# Imagen base
FROM nginx:latest

# Etiqueta con el nombre del autor
LABEL manteiner="grupo11"

# Copiar archivo index.html dentro del contenedor
COPY index.html /usr/share/nginx/html/
