<?PHP
global $php_errormsg, $_Include, $Opcion, $_eParseError;
$_eParseError++;
if( $php_errormsg!='' ){
eInit();
list(,$Eti) = explode('_',mb_strtoupper($_Include));
$xError = '"['.$Eti.'] '.$Opcion.'" '.$php_errormsg;
if( SESS::$_D_!='' ){
if( $ConTron ) eTron(date('Y-m-d H:i:s').' '.$xError.' ('.$_eParseError.')');
eTrace($xError.' ('.$_eParseError.')');
}else{
$CodError = mb_chr(rand(65,90)).mb_chr(rand(65,90)).mb_chr(rand(65,90));
eTron(date('Y-m-d H:i:s').' '.$CodError.': '.$xError.' ('.$_eParseError.')');
eTrace('ERROR INTERNO "'.$CodError.'"');
}
eEnd();
}
?>