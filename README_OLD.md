# Edesv3

Este repositorio contiene el framework **edesv3** y una guía completa para desplegarlo en tu entorno de desarrollo.

---

##  Tabla de contenido

- [Descripción del Proyecto](#descripción-del-proyecto)  
- [Flujo de Instalación y Despliegue](#flujo-de-instalación-y-despliegue)  
  - [Fase 1: Portainer en local (Docker)](#fase-1-portainer-en-local-docker)  
  - [Fase 2: Despliegue del stack GRS vía Portainer](#fase-2-despliegue-del-stack-grs-vía-portainer)  
  - [Fase 3: Descargar y preparar el entorno `edesv3`](#fase-3-descargar-y-preparar-el-entorno-edesv3)  
  - [Fase 4: Ejecutar el script de instalación de `edesv3`](#fase-4-ejecutar-el-script-de-instalación-de-edesv3)  
- [Contribuciones y Notas](#contribuciones-y-notas)  
- [Licencia](#licencia)  

---

##  Descripción del Proyecto

Este repositorio te provee de un framework **edesv3** completamente funcional, listo para desplegarse mediante un entorno Docker accesible vía Portainer. El flujo automatiza:

1. Instalación de Portainer en local para gestionar contenedores.
2. Despliegue del stack tecnológico **GRS** desde Portainer.
3. Clonado del repositorio `edesv3`.
4. Ejecución del script de instalación final para preparar el entorno.

La guía está pensada para que puedas replicar el entorno y facilitar el onboarding de nuevos desarrolladores.

---

##  Flujo de Instalación y Despliegue

### Fase 1: Portainer en local (Docker)

```bash
# Crear volumen persistente para Portainer
docker volume create portainer_data

# Iniciar Portainer CE en modo seguro (HTTPS)
docker run -d \
  -p 8000:8000 -p 9443:9443 \
  --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:lts
# Esta es la version v3 de edes 
# La última versión con conexión nativa a Maysql, informix y Oracle
# No tiene sentias preparadas
