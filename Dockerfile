# FROM composer:latest as build_stage
# COPY . /src
# WORKDIR /src
# RUN composer update
# RUN composer install
# RUN php artisan

# COPY . .
# RUN chmod -R 777 storage/

# FROM nginx:1.21.3-alpine as production-stage
# COPY --from=build_stage /src /sipelaku
# RUN  chmod -R 777 /sipelaku/storage/
# COPY --from=build_stage /src/dockerfiles/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM php:8.1.0-fpm

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN sed -i "s/user = www-data/user = root/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = root/g" /usr/local/etc/php-fpm.d/www.conf
RUN echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]