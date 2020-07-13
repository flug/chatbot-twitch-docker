#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
        set -- php-fpm "$@"
fi

if [ "$1" = 'php' ] || [ "$1" = 'bin/console' ]; then

        mkdir -p var/cache var/log

        if [ "$APP_ENV" != 'prod' ] && [ -f /certs/localCA.crt ]; then
                ln -sf /certs/localCA.crt /usr/local/share/ca-certificates/localCA.crt
                update-ca-certificates
        fi

        if [ "$APP_ENV" != 'prod' ]; then
                composer install --prefer-dist --no-progress --no-suggest --no-interaction
        fi

fi

exec docker-php-entrypoint "$@"

