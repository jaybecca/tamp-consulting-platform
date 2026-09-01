FROM nginx:alpine

# --------------------------------------------------
# Security: update Alpine packages at BUILD time
# --------------------------------------------------
RUN apk update \
    && apk upgrade \
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
# Website
# --------------------------------------------------
COPY . /usr/share/nginx/html

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