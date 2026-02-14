# Use nginx alpine pinned to version matching Alpine's brotli module
# When Alpine updates nginx-mod-http-brotli to 1.29+, update to nginx:alpine
FROM nginx:1.28.2-alpine

# Add metadata
LABEL maintainer="ControlForge Systems <hello@controlforge.dev>"
LABEL description="ControlForge Website - Production Docker Image"
LABEL version="1.2.0"

# Install brotli module (version must match nginx exactly)
RUN apk add --no-cache nginx-mod-http-brotli

# Load brotli modules into nginx
RUN sed -i '1i load_module modules/ngx_http_brotli_filter_module.so;' /etc/nginx/nginx.conf && \
    sed -i '2i load_module modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf

# Copy built static files
COPY build/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx/ /etc/nginx/conf.d/

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/nginx-health || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
