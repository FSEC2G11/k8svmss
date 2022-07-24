FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY /build/* ./
COPY /build/static ./static
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001