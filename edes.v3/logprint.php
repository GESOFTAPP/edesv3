<?PHP
if( !function_exists('qQuery') ){
eval(qSetup());
include_once(DIREDES.$_Sql.'.inc');
}
$_TITULO = str_replace( ' onclick="_SetCaption(\'TD\')"', '', $_POST['_TITULO'] );
$_TITULO = eEntityDecode($_TITULO, false);
$_IMPRIMIR = eEntityDecode($_POST['_IMPRIMIR'], false);
$_TREG = $_POST['_TREG'];
$ePagina = str_replace("\n", ' ', $_POST['_TITULOTXT']);
$ePagina = str_replace("\r", ' ', $ePagina);
$Quitar = array(
array('onresize='		,'on_resize='),
array('onmouseleave='	,'on_mouseleave='),
array('onmousemove='	,'on_mousemove'),
array('onmousedown='	,'on_mousedown'),
array('oncontextmenu='	,'on_contextmenu'),
array('onclick='		,'on_click')
);
for($n=0; $n<count($Quitar); $n++) $_IMPRIMIR = str_replace( $Quitar[$n][0], $Quitar[$n][1], $_IMPRIMIR );
$txt = eHTML('$logprint.php', "", "", true);
$txt .= <<<EOT
<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/list.css' TYPE='text/css'>
<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/list_print.css' TYPE='text/css' MEDIA='print'>
</HEAD>
<BODY>
{$_TITULO}
{$_IMPRIMIR}
</BODY>
</HTML>
EOT;
$sFile = '../_tmp/log/lst_'.S::$_User.'.htm';
file_put_contents($sFile, $txt);
if( SESS::$sql['statistics'] ){
if( SETUP::$LogTrace["D*"] || SETUP::$LogTrace["DPRN"] ){
sql_Inserta("{$_ENV['eDesDictionary']}gs_acceso",
'cd_gs_toperacion,				  conexion      , objeto, modo, edf, tabla, parametros,   pagina   , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      ,'".SESS::$_Connection_."',   'D' , 'l' , '' , 'PRN',     ''    ,'{$ePagina}',     ''   , {$_TREG} , '{$_User}', '".SESS::$_Node."', '".date('Y-m-d H:i:s')."'", 'num_acceso' );
$SerialDOC = qId();
$Dir = eGetCWD();
if( LINUX_OS ){
$ExeZip = "zip -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($sFile);
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($sFile);
}
$Dim = array();
exec($ExeZip, $Dim);
}
if( SETUP::$LogHistory['LogGsAccessFile']!='' ){
error_log(
date('Y-m-d H:i:s')."|{$_User}|".SESS::$_Node."|".SESS::$_Connection_."|Imprimir listado\n"
,3
,SETUP::$LogHistory['LogGsAccessFile']
);
}
}
echo "ok";
eEnd();
?>