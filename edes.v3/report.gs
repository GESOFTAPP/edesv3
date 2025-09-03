<?PHP
$NomFile = '../_tmp/ext/bkg_var.'.$_User;
$Dim = file($NomFile);
for( $n=0; $n<count($Dim); $n++ ){
list($k,$v) = explode('|',$Dim[$n]);
$v = trim($v);
${$k} = $v;
if( $k=='SCRIPT_FILENAME' ){
$_SERVER['SCRIPT_FILENAME'] = $v;
}else{
if( $k=='_DB' ){
$_GET[$k] = $v;
}else if( $k=='_iSql' ){
$__iSql = $v;
}else{
$_POST[$k] = $v;
}
}
}
@unlink( $NomFile );
$__='{#}eDes{#}';
$_ObjetoIni = 'L';
$OriFichero = DIREDES.'a/d/report_gen.zdf';
$FicheroD = $_DF = DIREDES.'a/d/report_gen.zdf';
$_Accion = 'l:'.DIREDES.'a/d/report_gen.zdf';
$_SubModo = 'l';
$Opcion = $_Modo = $_SubModo;
SESS::$_pxW_ = 1024;
SESS::$_PathCSS = 'css';
SESS::$_User = $_User;
S::$_User = SESS::$_User;
$_gsID = getmypid();
$Dir_ = DIREDES;
$_BackgroundReport = true;
include(DIREDES.'_lista_bkg.gs');
eEnd();
?>