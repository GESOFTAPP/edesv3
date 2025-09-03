#
#    In "Defining SQL" tables will in order that they want the options and fields within the table in the order
#  want to appear on the cards but then can be moved.
#
#    In the SQL definition must take into account that any field that is transparently wants to search must be created as
#  "NOT NULL" and the most common search fields with index.
#
# Field Name "cd_" / "nm_". This allows easy connection on side tables with the name eDes engine knows find.
#
# If we put a label before "," the field will be located to the right of the previous.
#
#		#Tab: Expedientes
#		#Forder:
#		CREATE TABLE prueba (        # Folder name: "Prueba"
#			campo01 char(2),          # Label campo01: Description if needed
#			campo02 char(2),          #,Label campo02: Description if needed
#			...
#			PRIMARY KEY (campo01),
#			...
#		);
#
# The "Folder Name" is also used for the title of the form / List can add "/" to indicate the plural
#
# If you want to create menus without creating the table use the command "# Menu: NombreMenu: NombreScript".
#