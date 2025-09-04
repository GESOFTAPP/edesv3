# 🚀 Crear una nueva APP con edesv3 en local (Mac + Portainer)

Este proyecto permite generar y desplegar APPS basadas en **edesv3** de forma automática usando Docker y Portainer.  

Funciona en **Mac local con Docker Desktop** y luego se puede replicar en servidores Linux con Portainer.

---

## Instalación

### Instalar Docker Desktop (Mac)
- Descarga desde [Docker Desktop Mac](https://www.docker.com/products/docker-desktop/).
- Instálalo y asegúrate de que funciona, si ya lo tienes instalado pasa al siguiente paso.
  ```bash
  docker --version

### Instalar Portainer en local

### Crear volumen en local

  ```bash
docker volume create portainer_data
  
### Levantar Portainer en el puerto 9000

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
## Accede a Portainer en tu navegador con el usuario admin:
  ```
👉 http://localhost:9000
  ```
## Clonar el repositorio en local para generar los ficheros de instalación y creación de APPS
	1. colocate en un directorio de trabajo local para la desxcarga del repositorio
  ```bash
	git clone https://github.com/GESOFTAPP/edesv3.git
	cd edesv3/new_app  // situate en el directorio new_app para generar la app
	chmod +x create_app.sh // Da permisos al script: 
```bash
	2. Crear una APP
	#### En el directorio edesv3/new_app hay 2 ficheros create_app.sh  y var.env


	 ./create_intranet.sh app01 app01.local app01_db

Eesto genera
  ```bash
app01/
├── docker-compose.yml
└── .env

# Configurar el dominio en /etc/hosts

127.0.0.1 app01.local

## Subir el stack a Portainer

Ir a Stacks > Add stack

Nombre: app01

copia contenido de  docker-compose.yml y cargar el fichero .env

Desplegar


---

### 🔑 Clave aquí:
En el README, **no confundes `new_app/` con un stack real**  

- `new_app/` = carpeta con el script + README (la "fábrica de stacks").  
- `app01/`, `app02/`… = carpetas que genera el script y que son **los stacks reales** para Portainer.  

---

👉 ejemplo de directorios:

edesv3/                        ← Repositorio Git principal
└── new_app/                   ← Carpeta “fábrica de stacks”
    ├── create_intranet.sh     ← Script que genera intranets nuevas
    └── README.md              ← Manual paso a paso (instalar Docker, Portainer, usar el script)

# Cuando ejecutas el script se crean carpetas nuevas (stacks reales):

app01/                          ← Stack real generado (ejemplo 1)
├── docker-compose.yml
└── .env

app02/                          ← Stack real generado (ejemplo 2)
├── docker-compose.yml
└── .env

app03/                          ← Stack real generado (ejemplo 3)
├── docker-compose.yml
└── .env


Acceder en navegador http://app01.local
