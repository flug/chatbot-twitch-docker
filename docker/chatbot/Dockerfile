ARG PHP_VERSION=7.4

FROM php:${PHP_VERSION}-cli-alpine

WORKDIR /usr/svr/chatbot

RUN set -eux; \
            apk add --no-cache git ; \
            docker-php-ext-install sockets json ctype iconv ;  
    

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY ./chatbot . 

RUN composer install -vvv --profile --no-dev

COPY docker/chatbot/entrypoint.sh /opt/entrypoint.sh

RUN chmod +x /opt/entrypoint.sh

ENTRYPOINT ["/opt/entrypoint.sh"]

CMD ["bin/console", "chatbot:run", "-vvv"]
