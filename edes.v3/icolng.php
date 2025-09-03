<?PHP
$File = eScript( $_SERVER['QUERY_STRING'] );
$NomExt = mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1));
$xFile = str_replace('_es.', '_'.$_COOKIE["e-language"].'.', $File);
if( $xFile!=$File && file_exists( $xFile ) ){
$File = $xFile;
}else{
$xFile = mb_substr( $File, 0, (mb_strlen($NomExt)+1)*-1 ) .'_'.$_COOKIE["e-language"].'.'.$NomExt;
if( file_exists( $xFile ) ){
$File = $xFile;
}
}
if( (class_exists('SESS') && SESS::$_D_=='~') || eSubstrCount(',pdf,xls,doc,',",{$NomExt},") > 0 ){
$Cachear = false;
}else if( $_SERVER['QUERY_STRING'][0]=='$' ){
$Cachear = true;
}else{
$Cachear = true;
}
if( $Cachear ){
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y 23:59:59 T"));
header("Cache-Control: max-age");
}else{
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y H:i:s T"));
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
}
switch( $NomExt ){
case 'gif':
header("Content-Type: image/gif");
break;
case 'jpg': case 'jpeg':
header("Content-Type: image/jpeg");
break;
case 'png':
header("Content-Type: image/png");
break;
case 'js':
case 'css':
case 'txt':
header("Content-Type: text/plain");
break;
case 'pdf':
if( $_gsTron ) eTron('{I} [desktop.ini]');
include_once('../_datos/config/desktop.ini');
header( "Content-Type: application/pdf" );
header( "Pragma: no-cache" );
if( eFileGetVar("System.ZipDownload") ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec( "gzip {$File}", $a, $a1 );
$File .= '.gz';
header( "Content-Encoding: gzip" );
}
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=documento.{$NomExt}" );
break;
case 'xls':
header( "Content-Type: application/ms1" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=excel.{$NomExt}" );
break;
case 'doc':
header( "Content-Type: application/msword" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=word.{$NomExt}" );
break;
case 'pps':
case 'ppt':
header( "Content-Type: application/vnd.ms-powerpoint" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=powerpoint.{$NomExt}" );
break;
case 'wav':
header("Content-type: audio/x-wav");
break;
case 'swf':
header("Content-Type: application/x-oleobject");
break;
case 'gs': case 'inc': case 'php': case 'php4': case 'lp':
die('Error:3');
break;
default:
header("Content-Type: text/html; charset=UTF-8");
if( !file_exists($File) ){
if( mb_substr($File,0,13) == $Dir_.'h/' ){
?>
<SCRIPT type="text/javascript">
document.title = 'HELP eDes';
if( window.name != 'AYUDA' ) window.moveTo(screen.width,0);
top.eAlert( S.lng(209), 'No existe la ayuda sobre:\n"<?= $File; ?>".', 'A', 'W' );
if( window.name != 'AYUDA' ) window.close();
</SCRIPT>
<?PHP
}else{
$sFile = explode('/',$File);
$sFile = explode('.',$sFile[count($sFile)-1]);
eTrace( '', true );
eTrace( "No existe la ayuda sobre: '{$sFile[0]}'", true );
}
if( $_gsTron ) eTron('{20"}'.$File.' ['.mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1)).']');
exit;
}
}
if( $_gsTron ) eTron('{20}'.$File.' ['.mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1)).']');
if( $_Tree!='' ){
if( $_Sql=='' ){
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
_ShowError($php_errormsg, $tmpFile);
}
if( class_exists('SESS') && SESS::$sql['statistics'] && $NomExt<>'gif' && $NomExt<>'jpg' && $NomExt<>'jpeg' && $NomExt<>'png' ){
if( SETUP::$LogTrace["D*"] || SETUP::$LogTrace["D".$NomExt] ){
include_once($Dir_.$_Sql.'.inc');
$NomExt = str_replace("'",'"',mb_strtoupper($NomExt));
$ePagina = str_replace("'",'"',$_SERVER['QUERY_STRING']);
sql_Inserta("{$_ENV['eDesDictionary']}gs_acceso",
'cd_gs_toperacion,         conexion        , objeto, modo,     edf    , tabla, parametros,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      , '".SESS::$_Connection_."',   'D' ,  '' , '{$NomExt}',  ''  , '{$File}' ,'{$ePagina}',     ''   ,     1    , '{$_User}', '".SESS::$_Node."', '".date('Y-m-d H:i:s')."'", 'num_acceso' );
qEnd();
}
if( SETUP::$LogHistory['LogGsAccessFile']!='' ) error_log( date('Y-m-d H:i:s')."|{$_User}|".SESS::$_Node."|".SESS::$_Connection_."|{$_SERVER['QUERY_STRING']}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
readfile($File);
eEnd();
?>