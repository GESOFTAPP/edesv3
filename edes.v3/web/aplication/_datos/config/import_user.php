<?PHP

// Este script se ejecuta al importar un fichero Excel por el usuario
// Para ejecutar cualquier script se debe hacer en modo "a" y con el parámetro "_IMPORT" ej: Opción | w#a:script&_IMPORT
// Se recomienda poner el parametro "w" en el inicio de la petición para que se ejecute siempre en la ventana central.


function importRecmb_ord( $Table, &$Values, $ok ){								// Record
	return true;
}

function importIni( $Table, &$DimSeek, &$SqlInsert ){						// Definition: #F# / #V#  ( Fields / Values )
}

function importEnd( $Table, $TableTmp ){									// End
}

?>