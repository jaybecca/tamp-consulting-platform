FROM nginx:alpine

# --------------------------------------------------
# Security: update Alpine packages at BUILD time
# --------------------------------------------------
RUN apk update \
    && apk upgrade \
    && apk add --no-cache libexpat \
    && apk upgrade --no-cache util-linux libuuid \
    && rm -rf /var/cache/apk/*
# --------------------------------------------------
# Remove default Nginx configuration and entrypoint
# --------------------------------------------------
RUN rm -f /etc/nginx/conf.d/default.conf \
    && rm -rf /docker-entrypoint.d

# --------------------------------------------------
# Custom Nginx configuration
# --------------------------------------------------
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# --------------------------------------------------
# Website — copy only production assets
# --------------------------------------------------
COPY public/index.html public/404.html public/blog.html public/blog.css public/blog.js public/script.js public/robots.txt public/sitemap.xml public/site.webmanifest /usr/share/nginx/html/
COPY public/css/ /usr/share/nginx/html/css/
COPY public/images/ /usr/share/nginx/html/images/

# --------------------------------------------------
# Remove default Nginx error page
# --------------------------------------------------
RUN rm -f /usr/share/nginx/html/50x.html

# --------------------------------------------------
# Non-root ownership + immutable application files
# --------------------------------------------------
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R a-w /usr/share/nginx/html

# --------------------------------------------------
# Run as non-root
# --------------------------------------------------
USER nginx

EXPOSE 8080

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]