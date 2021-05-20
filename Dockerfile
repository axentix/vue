FROM nginx:1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY storybook-static /usr/share/nginx/html