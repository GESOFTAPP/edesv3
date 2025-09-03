#
#    En el apartado "Definir SQL" se pondr�n las tablas en orden en que se quieran las opciones y los campos dentro de la tabla en el orden que 
# quieras que aparezca en las fichas aunque posteriormente se podr�n mover.
#
#    En la definici�n del SQL hay que tener en cuenta que cualquier campo por el que se quiera buscar de forma transparente ha de estar creado como
# "NOT NULL" y los campos de b�squeda mas frecuentes con �ndice.
#
# Nombre de campos "cd_" / "nm_".  Esto permite facilidad de relaci�n en tablas auxiliares que con el nombre el motor eDes sabe encontrarlas.
#
# Si antes del label ponemos una "," el campo se situar� a la derecha del anterior.
#
#		#Tab: Expedientes
#		#Forder:
#		CREATE TABLE prueba (        # Nombre carpeta: "Prueba"
#			campo01 char(2),          # Label campo01: Descripci�n si hace falta
#			campo02 char(2),          #,Label campo02: Descripci�n si hace falta
#			...
#			PRIMARY KEY (campo01),
#			...
#		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
#
# El "Nombre carpeta" se utiliza adem�s para el t�tulo de la ficha/listado pudiendo poner "/" para indicar el plural
#
# Si se quiere crear menus sin crear la tabla se utilizar� el comando "#Menu: NombreMenu : NombreScript".
#
# Para que los DF a generar esten en directorios determinados: #DIR: / #FOLDER:

#DIR: xxxyyyxx
#Tab: Autonom�a

create table auto (                         #Gesti�n Autonom�as
    cd_auto char(2) NOT NULL,               #C�digo
    nm_auto char(40) NOT NULL,              #Nombre
    tf_distrito char(1),                    #Tiene distrito
    PRIMARY KEY (cd_auto),
    KEY nm_auto (nm_auto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;