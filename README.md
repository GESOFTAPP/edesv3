# 🚀 Crear una nueva APP con edesv3 en local (Mac + Portainer)

Este proyecto permite generar y desplegar APPS basadas en **edesv3** de forma automática usando Docker y Portainer.  

Funciona en **Mac local con Docker Desktop** y luego se puede replicar en servidores Linux con Portainer.

---

## Instalación

* ### Instalar Docker Desktop (Mac)
	* Descarga desde [Docker Desktop Mac](https://www.docker.com/products/docker-desktop/).
 	* Instálalo y asegúrate de que funciona, si ya lo tienes instalado pasa al siguiente paso.
	```
  		docker --version
	```
* ### Instalar Portainer en local

	* Crear volumen en local

  	```
		docker volume create portainer_data
  	```
	* Levantar Portainer en el puerto 9000
  	```
		docker run -d \
		  -p 9000:9000 \
		  -p 8000:8000 \
		  --name=portainer \
		  --restart=always \
		  -v /var/run/docker.sock:/var/run/docker.sock \
		  -v portainer_data:/data \
		  portainer/portainer-ce:latest
  	```
	* Accede a Portainer en tu navegador con el usuario admin:
  	```
		👉 http://localhost:9000
  	```
	##### Cambia la clave y dejalo pendiente para crear el primer STACK

* ### Clonar el repositorio en local para generar los ficheros de instalación y creación de APPS

	* colocate en un directorio de trabajo local para la descarga del repositorio
	```
		git clone https://github.com/GESOFTAPP/edesv3.git
		cd edesv3/new_app  // situate en el directorio new_app para generar la app
		chmod +x create_app.sh // Da permisos al script: 
	```
	##### En el directorio edesv3/new_app hay 2 ficheros create_app.sh  y var.env
	* Ejecuta el siguiente Script
	```
		./create_app.sh app01 app01.local app01_db
	```
  	> El script tiene 3 parametros: *la apicación* , *url local* y *base de datos* y genera el un directorio con el nombre de la aplicación con dos ficheros, **docker_compose.yml** que debes copiar en Portainer y **var.env* con las variables de entorno que debes exportar
	```
		app01/
		├── docker_compose.yml
		└── var.env
	```

* ### Crear el STACK en Portainer
	* Entra en portainer y crea un stack por ejemplo app01
 	* Copia el contenido del fichero docker_compose.yml
```
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
      - app01_data:/var/www/html
    ports:
      - "${SSH_PORT}:22"
      - "${XDEBUG_PORT}:9003"
      - "${HTTP_PORT}:80"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${APP_NAME}.rule=Host(`${APP_DOMAIN}`)"
      - "traefik.http.routers.${APP_NAME}.entrypoints=web,websecure"
      - "traefik.http.routers.${APP_NAME}.tls.certresolver=myresolver"
      - "traefik.http.services.${APP_NAME}.loadbalancer.server.port=80"
    networks:
      - traefik-net

volumes:
  app01_data:
    external:
      name: app01_data

networks:
  traefik-net:
    external: true
```
>> 👉 A tener en cuenta en Portainer los tabuladores...

  	* Carga las variables de entorno subiendo el fichero var.env

>> Las variables son creadas por defecto pero se debn modificar para cada proyecto  	
  ```
	APP_NAME=app01
	APP_DOMAIN=app01.local
	DOC_ROOT=/var/www/html

	MYSQL_HOST=mysql.remoto.com
	MYSQL_PORT=3306
	MYSQL_DATABASE=app01_db
	MYSQL_USER=app01_user
	MYSQL_PASSWORD=+9nr9jveVwSUGFxR

	PHP_MEMORY_LIMIT=512M
	PHP_UPLOAD_MAX_FILESIZE=64M

	SSH_PORT=2238
	XDEBUG_PORT=9033
	VOLUME_NAME=app01_data

  ```	
 	* despliega

  
* ### Configurar el dominio en /etc/hosts
	* Edita el fichero /etc/hosts con permisos de administración y crea la siguiente linea al final del fichero
    ```
		127.0.0.1 app01.local
	```
	* Prueba que la url funciona
    ```
		http://app01.local
	```

---
* ### Instalar la primera aplicación en el repositorio creado

---

### 🔑 Clave aquí:
En el README, **no confundes `new_app/` con un stack real**  

- `new_app/` = carpeta con el script + README (la "fábrica de stacks").  
- `app01/`, `app02/`… = carpetas que genera el script y que son **los stacks reales** para Portainer.  

---

👉 ejemplo de directorios:

edesv3/                        ← Repositorio Git principal
└── new_app/                   ← Carpeta “fábrica de stacks”
    ├── create_app.sh 		   ← Script que genera intranets nuevas
    └── README.md              ← Manual paso a paso (instalar Docker, Portainer, usar el script)

# Cuando ejecutas el script se crean carpetas nuevas (stacks reales):

app01/                          ← Stack real generado (ejemplo 1)
├── docker_compose.yml
└── .env

app02/                          ← Stack real generado (ejemplo 2)
├── docker_compose.yml
└── .env

app03/                          ← Stack real generado (ejemplo 3)
├── docker_compose.yml
└── .env


Acceder en navegador http://app01.local
