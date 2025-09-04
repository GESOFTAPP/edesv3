#!/bin/bash
# Script para crear una nueva intranet con stack Docker + Portainer
# Uso: ./create_app.sh <APP_NAME> <APP_DOMAIN> <MYSQL_DATABASE>
# Ejemplo: ./create_app.sh iu84 appiu84.local iu84_db

if [ $# -lt 3 ]; then
  echo "❌ Uso: $0 <APP_NAME> <APP_DOMAIN> <MYSQL_DATABASE>"
  exit 1
fi

APP_NAME=$1
APP_DOMAIN=$2
MYSQL_DATABASE=$3

# Configuración por defecto (ajusta según tu entorno)
MYSQL_HOST="mysql.remoto.com"
MYSQL_PORT="3306"
MYSQL_USER="${APP_NAME}_user"
MYSQL_PASSWORD="$(openssl rand -base64 12)" # password aleatoria segura
SSH_PORT=$((2200 + RANDOM % 100))     # rango 2200-2299
XDEBUG_PORT=$((9000 + RANDOM % 100))  # rango 9000-9099


# Crear carpeta del proyecto
mkdir -p ${APP_NAME}
cd ${APP_NAME}

# Generar archivo .env
cat > var.env <<EOF
APP_NAME=${APP_NAME}
APP_DOMAIN=${APP_DOMAIN}
DOC_ROOT=/var/www/html

MYSQL_HOST=${MYSQL_HOST}
MYSQL_PORT=${MYSQL_PORT}
MYSQL_DATABASE=${MYSQL_DATABASE}
MYSQL_USER=${MYSQL_USER}
MYSQL_PASSWORD=${MYSQL_PASSWORD}

PHP_MEMORY_LIMIT=512M
PHP_UPLOAD_MAX_FILESIZE=64M

SSH_PORT=${SSH_PORT}
XDEBUG_PORT=${XDEBUG_PORT}
VOLUME_NAME=${APP_NAME}_data
EOF

# Generar docker-compose.yml compatible con Portainer
cat > docker-compose.yml <<'EOF'
version: "3.9"

services:
  app:
    image: gesoft/grs:local
    container_name: ${APP_NAME}
    restart: always
    environment:
      MYSQL_HOST: ${MYSQL_HOST}
      MYSQL_PORT: ${MYSQL_PORT}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      PHP_MEMORY_LIMIT: ${PHP_MEMORY_LIMIT}
      PHP_UPLOAD_MAX_FILESIZE: ${PHP_UPLOAD_MAX_FILESIZE}
      DOC_ROOT: ${DOC_ROOT}
    volumes:
      - ${VOLUME_NAME}:${DOC_ROOT}
    ports:
      - "${SSH_PORT}:22"
      - "${XDEBUG_PORT}:9003"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${APP_NAME}.rule=Host(`${APP_DOMAIN}`)"
      - "traefik.http.routers.${APP_NAME}.entrypoints=web,websecure"
      - "traefik.http.routers.${APP_NAME}.tls.certresolver=myresolver"
      - "traefik.http.services.${APP_NAME}.loadbalancer.server.port=80"
    networks:
      - traefik-net

volumes:
  default_volume:
    name: ${VOLUME_NAME}
    external: true

networks:
  traefik-net:
    external: true
EOF

# Crear volumen externo si no existe
if ! docker volume inspect ${APP_NAME}_data >/dev/null 2>&1; then
  docker volume create ${APP_NAME}_data
  echo "📦 Volumen externo ${APP_NAME}_data creado"
else
  echo "ℹ️ Volumen externo ${APP_NAME}_data ya existe"
fi

# Crear red traefik-net si no existe
if ! docker network inspect traefik-net >/dev/null 2>&1; then
  docker network create traefik-net
  echo "🌐 Red traefik-net creada"
else
  echo "ℹ️ Red traefik-net ya existe"
fi

echo ""
echo "✅ Proyecto ${APP_NAME} creado en $(pwd)"
echo "   - Dominio: ${APP_DOMAIN}"
echo "   - Base de datos: ${MYSQL_DATABASE}"
echo "   - Usuario DB: ${MYSQL_USER}"
echo "   - Password DB: ${MYSQL_PASSWORD}"
echo "   - SSH Port: ${SSH_PORT}, Xdebug Port: ${XDEBUG_PORT}"
echo "   - Volumen: ${APP_NAME}_data"
echo "   - Red: traefik-net"

echo ""
echo "👉 Recuerda añadir al /etc/hosts en tu Mac:"
echo "   127.0.0.1 ${APP_DOMAIN}"

echo ""
echo "👉 Para subir a Portainer:"
echo "   - Ve a Stacks > Add stack"
echo "   - Sube docker-compose.yml y .env de la carpeta ${APP_NAME}"

