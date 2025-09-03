# Changelog

## [Unreleased]

    - Habilitado en la interfaz de escritorio un buscador de scripts u opciones, permitiendo localizar y ejecutar scripts en función del título definido en cada uno.


## [2024-05-25]

### Added

    - Se ha incorporado la configuración de la base de datos a través de la variable de entorno MAIL_KEYCODE, permitiendo su uso tanto en formato abierto como encriptado.
    - Los ficheros exportados incorporan de forma oculta una marca con la fecha y hora de generación, el usuario que realizó la exportación, el modo utilizado y el script que la generó.

### Fixed

    - Se ha solucionado un error que se producía al activar la variable System.SearchWithLike, la cual permite realizar búsquedas en campos de texto aplicando automáticamente comodines (*) al inicio y al final de la cadena. Esta funcionalidad también afectaba indebidamente a los campos de tipo select, lo cual ha sido corregido excluyendo dichos campos del alcance de la variable.
    - Soluciando un problema con las cookies que empiezan por "seedKey"


## [2024-08-05]

### Added

	- Nuevo Api para el control de acceso
	- Se ha incorporado la opción de al salir de la aplicación mostrando una página de agradecimiento
	- Se ha incorporado la opción de que la pantalla del login caduque
    - Se ha incorporado la opción de autentificación via email
    - Las campos de tipo select se les puede poner el color y el background del option mediante el atributo "s-neon"
    - La etiqueta [ForUser] se ha añadido la definición de un permiso especial
    - Se ha incorporado, en el fichero de configuración, la opción de chequear si los ficheros que se suben a la aplicación tienen una webshell
    - Se puede configurar el "breadcrumb"
    - Opción de ampliar la vida de la sesión
    - Configuración global o por campo de que se despliegue el select al tener el foco
    - Nuevo parámetro "type=button" en la etiqueta "[View]" para mostrar botones en lugar de iconos
    - En la etiqueta [Format] se ha añadido la posibilidad de ejecutar eShell() mediante la variable $_CellsStyle
    - Nueva gestión de los permisos de exportación
    - Los screenshot mantinenen su proporción original
    - Al definir el PHISHING se puede usar miles
    - Se ha añadido la variable booleana $_CSVWITHHEADER para al exportar un csv que en la primera linea ponga las label de las columnas, por defecto es false
    - Al descargar un fichero si existe la función de usuario "modifyFileToDownload($file)" se la llamará antes de la descarga para hacer cualquier tipo de operacíon.
    - Todas las exportaciones de listados a fichero se marcan para poder identificarlas

### Fixed

	- Solucionado un error en el label [MaxRec] FULL
	- Se acepta cualquier nombre de fichero que no contenga [^$%&|<>#]
    - Al configurar la impresora se veía la página en blando
    - Solucionado el problema cuando se definia la etiqueta [Preview] sin un campo en [Field]
    - Se ha solucionado un problema identificado en la etiqueta [FieldBrowser]
    - Corregido bug al buscar con la condición "not in" cuando solo hay un dato dentro del "not in"
    - Alineación de los TH por defecto
    - Solucionado el problema de sacar un listado mediante un DBRange y luego exportarlo
    - Solucionado un problema al mostrar decimales en el pdf


## [2024-02-20]

### Added

	- Se puede configurar si se muestran de forma distintas las filas de los listados cuando haces click.
	- Configurable la forma de los cursores.
	- Al mostrar el listado de conexiones o conexiones distintas si no se ha logeado el usuario mostrar texto no el nombre en blanco.
	- Opción de poder ver los totales de los listados también en la primera fila.
	- Opción para individualmente ver los listados divididos por columna aunque tenga la configuración general desactivado.
	- Para los desarrolladores si en el servidor de desarrollo tienes memorizado el login y password y creas la cookie "eDesAutoRun=on" entrarás directamente en la aplicación.

### Fixed

	- Formato en Markdown para editar la ayuda.
	- Entrar directamente al editor sin pasar por el desktop.
	- La primera opción en el listado de favoritos tenía el mismo color que el fondo.
	- En "[MaxRec] Full" en algunas circunstancias se interceptaba en la búsqueda la tecla "c" de activar la calculadora.
	- Se ha quitado en los listados paginados al servidor las opciones de “Buscar” y “Filtrar por columna” al no tener sentido por buscar solo en la pagina actual y no en todo el listado.


## [2024-02-06]

### Fixed

    - Arreglo de opciones de conexión cuando hay database del sistema


## [2024-02-03]

### Added

   - Incorporación de un spinner

### Fixed

    - Al subir ficheros en segundo plano ya no se bloquea la sesión
    - En la barra de las utilidades cuando el listado es mas ancho que el explorador lo botones que están a la derecha ahora flotan alineados a la derecha
    - Refactorizadas las opciones de: "Recordar clave", "Resetear clave" y "Modificar clave"
    - Arreglago un bug en la regeneración del fichero de sesiones
    - Añadido un atributo a la regla #PROGRESFILE
    - Cambios en textos


## [2024-01-28]

### Added

    - Nueva gestión de la internacionalización

### Fixed

    - alter table mibms_desa.gs_language modify cd_gs_language varchar(5)
    - Nueva opción de restaurar copias desde el editor
    - Solucionado problema en la generación de xls


## [2023-12-10]

### Added

    - Nueva etiqueta [PointNotRem]

### Fixed

    - Subventana de ordenación de la columna de un listado
    - Arreglos varios en javascript con "substr()"


## [2023-12-08]

### Added

    - Nuevos atributos css

### Fixed

    - Etiqueta [View]
    - Refactolizar las funciones eBar(), eShell() y eBadge()
    - Título de subventana


## [2023-12-05]

### Added

    - Poder configurar los colores del checkbox en los listados
    - Nueva etiqueta {slFormatExe} para controlar la salida en las SubList
    - Se carga automaticamente los ficheros externos de lenguaje

### Fixed

    - Chequeo en el cliente de si la sesión ha caducado


## [2023-11-02]

### Added

    - El nombre del campo de relacion en una iSubList puede ser diferente.
    - Las columnas de los listados al definir un ancho máximo si el texto lo sobrepasa cortará el texto poniendo unos puntos suspensivos.

### Fixed

    - Visualizar los botones de avance y retroceso de página de las iSubList al cargar la ficha.


## [2023-10-29]

### Added

    - Se ha añadido a la etiqueta "{sfFormat}" código multilinea para poder definir el aspecto de cada tr y td de la sublist.
    - En las sublist se puede configurar la fila de totales siempre visible


## [2023-10-23]

### Added

    - Parametro de configuración para que memorice el login.
    - Nueva etiqueta [Preview]


## [2023-10-09]

### Added

    - En [UploadFile] asynchronous se ha añadido el parámetro nombre de fichero en la llamada al script del usuario, así como la incorporación de la etiqueta [DB] si la tabla está en otro diccionario.


## [2023-10-08]

### Added

    - Los desarrolladores pueden memorizar el login y password en el icono de ver el password
    - Al descargar ficheros de forma asincrona ejecutar un fichero de usuario al terminar
    - Browser de mas de 50.000 registros con búsqueda interactiva

### Fixed

    - Download desde el editor
    - Arreglado un error al grabar ficheros editados desde la shell del editor


## [2023-09-10]

### Added

    - Nueva variable de configuración "InactivityMaxLife" para bloquear el sistema si hay un periodo de inactividad determinado.
    - Desde gsShell se puede hacer un preview de imagenes y svg

### Fixed

    - Label [Header]
    - Label [THColSpan] en la salida a pdf
    - Espaciado en los listados
    - Al conmutar la selección de registro en la ventana actual o en subventana se hace directamente desde el menú
    
### Removed

    - Todo lo relacionado con las tablas gs_pc y gs_pc_inventory


## [2023-08-07]

### Added

    - Se puede cambiar de SubTab con la rueda del ratón
    - Se controla el cierre de sessión directa en los casos de upload en background sin terminar

### Fixed

    - Upload de ficheros en background en modo modificación
    - Tipo de dato number en la clase badge y badgeAsync
    - Se ha modificado el atributo "e-asynchronos" por "e-async"
    - Se han añadido casos de uso a SYS::removeRem()


## [2023-08-04]

### Added

    - Implementación de subida de ficheros de forma asincrona
    - Opción de poder borrar una entrada de idioma desde el formulario

### Fixed

    - Corregido error al abrir editores que ya estaban abiertos
    - Al localizar el fichero de idiomas para las condiciones


## [2023-07-24]

### Fixed

    - Tamaño de objetos


## [2023-07-20]

### Added

    - Icono desde el desktop para el acceso a las últimas descargas y acceder a los procesos ejecutados en segundo plano, la ventana se llama "Download center"
    - Método estático S::multiplePage() para poder ejecutar/conmutar entre multiples páginas
    - Ejecución de múltiples llamadas en segundo plano mediante el metodo S::runBackground()
    - Las fichas de consulta ejecutadas en la ventana de trabajo se podrán ejecutar en segundo plano desde el submenú 
    - Las fichas de consulta ejecutadas en la ventana de trabajo se podrán ejecutar directamente como exportación desde el submenú 

### Fixed

    - Nuevo algoritmo en el desktop para avisar que la sessión caduca
    - grupo de fichas cuando los tag {Z} y {tab} estan consecutivos

## [2023-06-29]

### Added

    - Nueva prestación desde el desktop de opciones en cascada de culquier opción mediante la pulsación de [command/window+click]

### Fixed

    - En los listados error al marcar columna de ordenación
    - Quitado el icono de Modo subWindow en listados directos

## [2023-06-20]

### Fixed

    - Gestión de usuarios
    - Mejoras en el desktop

## [2023-06-18]

### Added

    - Nueva etiqueta [Target] para condicionar la salida en función del número de registros

### Fixed

    - Exportación a formato pdf con tcpdf en versión php8
    - Formatos de exportación

## [2023-06-10]

### Added

    - Se ha añadido la posibilidad de sufijo de imagenes con extensión

## [2023-06-01]

### Added

    - Nueva funcionalidad para refrescar una SubList con eSubListRefresh()
    - Opción para tener una fuente de iconos propios

### Fixed

    - Solucionado el problema exporádico de perder la sesión nada mas entrar, cuando es la primera entrada del dia
    - Validez de la cookie en horas

## [2023-05-21]

### Added

    - Minieditor de [Language] desde el editor con F2
    - Utilidad de tracear el valor de fields y attributes, con posibilidad de hacer debug
    - Las sublistas se pueden ordenar haciendo click en el th

### Fixed

    - Solucionado un error al grabar desde el editor cuando estaba customizado los checkbox

## [2023-05-16]

### Added

    - Se puede definir los dos valores del checkbox

### Fixed

    -Subsanado un problema de javascript con campos con nombre "name"

## [2023-05-07]

### Added

    - La etiqueta [RelationSubList] soporta nombres de campos distintos del padre y del hijo, así como una función de usuario
    - Nueva clase streamerClient() para enviar mensajes desde el servidor al cliente
    - Select y subselect con tablas del motor en un diccionario independiente

### Fixed

    - Solucionado la perdida de sesión
    - Solucionado la creación de sesión con crc erroneo
    - Solucionado la visualización de varios {Tab} consecutivos
    - Idioma base distinto del español
    - Eliminado un pixel de separación entre los tab

### Changed
### Removed


## [2023-03-30]

### Added

    - Opción de poder poner todas las tablas del motor en un database independiente
    - Filtro dinámico de opciones desde el desktop
    - Vista previa en las opciones del desktop
    - Opciones favoritas
    - Opción de comprimir/expandir cabecera del desktop
    - Opción de fijar o no el menú de opciones del desktop
    - Desde las Migas se puede ver y ejecutar el submenú donde está incluido la opción actual
    - Desde el login en el caso de ser el servidor de desarrollo se puede memorizar el login y el password
    - Opción en el editor de abrir la ayuda en un tab nuevo
    - Los select y subselect en los modos de consulta y confirmar la baja puedes llevar o no tolas las opciones
    - Incorporación en el editor de una etiqueta para usar Mermaid
    - Incorporación en la ventana de selección de icono para las opciones de un buscador interactivo, así como una columna de preselección y otra de los iconos usados en el árbol de opciones
    - Crear app desde la linea de comandos
    - Login en dos pasos

### Fixed

    - Solucionado un error en la grabación de los usuarios de desarrollo
    
### Changed

    - Mejorada la seguridad en el login
    - Eliminación del uso de cookies
    - Se ha cambiado las variables de sesión por la clase SESS
    - Se ha cambiado las variables de configuración por la clase SETUP

### Removed