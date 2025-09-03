<?PHP
eInclude( 'message' );
$Mensaje = urldecode($Mensaje);
$Mensaje = str_replace(CHR13.CHR10,'<br>',$Mensaje);
if( $Mensaje[0]==CHR92 ) $Mensaje = mb_substr($Mensaje,2,-2);
eMessage( $Mensaje, $Accion.'HS', $Sg );
?>