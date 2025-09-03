<?PHP
date_default_timezone_set('Europe/Madrid');
define( '_ERROR_REPORTING', 5 );
error_reporting( _ERROR_REPORTING );
foreach( $_GET  as $k=>$v ) $GLOBALS[$k] = $v;
foreach( $_POST as $k=>$v ) $GLOBALS[$k] = $v;
$ConRastro = false;
if( $ConRastro ) eTron('A');
$_User = $FILE;
if( !isset($HOJAS) ) $HOJAS = 1;
if( !function_exists('eGetMicroTime') ){
function eGetMicroTime(){
list($milisegundos,$segundos) = explode(' ',microtime());
return number_format(((float)$milisegundos + (float)$segundos ),6,'.','');
}
}
if( !function_exists('eGetInterval') ){
function eGetInterval(){
return number_format(eGetMicrotime() - $_ENV[SYS]['IniSg'], 2, '.', '');
}
}
if( !function_exists('_LoadSqlIni') ){
function _LoadSqlIni( $_Diccionario ){
$txt = trim(@file_get_contents($_Diccionario));
if( mb_substr($txt,0,2)!='<'.'?' ){
return gzuncompress($txt);
}else{
return mb_substr($txt, ((mb_strtoupper(mb_substr($txt,0,5))=='<'.'?PHP') ? 5 : 2), -2);
}
}
}
if( !function_exists('qSetup') ){
function qSetup(){
return _LoadSqlIni('../_datos/config/sql.ini');
}
}
eval(qSetup());
include_once(DIREDES.$_Sql.'.inc' );
$_PDFSCREENSHOT = true;
if( !SETUP::$List['TCPDF'] ){
include(DIREDES.'letterhead.inc');
}else{
include(DIREDES.'letterhead_tc.inc');
}
if( $ConRastro ) eTron('B');
$NomFile = "../_tmp/pdf/printtab_{$_User}.pdf";
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Length: ".filesize($NomFile));
readFile( $NomFile );
if( $ConRastro ) eTron('C');
if( SESS::$sql['statistics'] ){
if( SETUP::$LogTrace["D*"] || SETUP::$LogTrace["DSRC"] ){
$NomExt = 'PDF';
$ePagina = str_replace("'",'"',$_SERVER['QUERY_STRING']);
$ePagina = '(pantalla)';
qQuery("select cd_gs_node from {$_ENV['eDesDictionary']}gs_user where cd_gs_user={$_User}");
list($_Node) = qRow();
sql_Inserta("{$_ENV['eDesDictionary']}gs_acceso",
'cd_gs_toperacion,             conexion	, objeto, modo,    edf  , tabla, parametros,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      , '".SESS::$_Connection_."',   'D' , 'S' , 'screen', 'PDF', '{$File}' ,'{$ePagina}',     ''   ,     1    , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."'", 'num_acceso' );
if( SETUP::$LogDownload['LogFileDownload']!='' ){
$Dir_ = dirname(__FILE__).'/';
SESS::$_D_ = '';
$SerialDOC = qId();
$eFile = $NomFile;
$Dir = str_replace('\\','/',getcwd());
if( LINUX_OS ){
$ExeZip = "zip -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($eFile);
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($eFile);
}
$Dim = array();
exec($ExeZip, $Dim);
}
}
if( SETUP::$LogHistory['LogGsAccessFile']!='' ) error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|".SESS::$_Connection_."|{$_SERVER['QUERY_STRING']}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
eEnd();
?>