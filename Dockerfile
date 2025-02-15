FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY my-app/ /var/www/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]