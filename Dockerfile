# Use nginx alpine for lightweight production image
FROM nginx:alpine

# Add metadata
LABEL maintainer="ControlForge Systems <hello@controlforge.dev>"
LABEL description="ControlForge Website - Production Docker Image"
LABEL version="1.1.0"

# Note: Brotli module disabled due to version mismatch
# nginx:alpine latest = 1.29.x, nginx-mod-http-brotli = 1.28.x
# Pre-compressed .br files still generated for future use

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
