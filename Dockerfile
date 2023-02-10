# Build environment
FROM node:16-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm install && \
    npm run build && \
    cp `ls build/static/css/*.css | head -1` build/static/css/style.css

# Server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=builder /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
