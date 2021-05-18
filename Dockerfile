FROM nginx:1.20-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY storybook-static /usr/share/nginx/html