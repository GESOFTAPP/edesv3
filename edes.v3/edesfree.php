<?PHP
switch($Objeto[0]){
case 'R':
if( isset($_GET["_LOGDOWN"]) && is_numeric($_GET["_LOGDOWN"]) ){
$downloadCenter = $_GET["_LOGDOWN"];
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_download where cd_download={$downloadCenter}");
$r = S::qArray();
if( $r["cd_gs_user"]!=S::$_User ){
eInit();
die("");
}
S::qQuery("update {$_ENV['eDesDictionary']}gs_download set total_download=total_download+1 where cd_download={$downloadCenter}");
}
list($NomScript) = explode("&", $NomScript."&");
eFileCheck($NomScript, true);
$File   = eScript(eFileClearGet($NomScript));
$NomExt = mb_strtolower(eFileType($File));
$handle = finfo_open(FILEINFO_MIME);
$mimeType = finfo_file($handle, $File);
finfo_close($handle);
header("Content-Type: {$mimeType}");
if( SESS::$_D_=='~' || eSubstrCount(',pdf,xls,doc,', ",{$NomExt},")>0 ){
$Cachear = false;
}else if( $NomScript[0]=='$' ){
$Cachear = true;
}else{
$Cachear = $_CachePc;
}
if( $_ENV[SYS]['localhost'] ){
$Cachear = false;
}
if( !SETUP::$_DevelopmentSrv && ($Cachear || $NomExt=='js') ){
$Cachear = true;
}
if( $Cachear ){
$sgCache = 3600;
header('Expires: '.gmdate('D, d M Y H:i:s', time()+$sgCache).' GMT');
header('Pragma: cache');
header("Cache-Control: max-age={$sgCache}");
}else{
header('Last-Modified: '.gmdate('D, d M Y H:i:s T'));
header('Expires: '.gmdate('D, d M Y H:i:s T'));
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
}
switch( $NomExt ){
case 'pdf':
if( $_gsTron ) eTron('{I} [desktop.ini]');
include_once('../_datos/config/desktop.ini');
header("Pragma: no-cache");
if( eFileGetVar("System.ZipDownload") ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec("gzip {$File}", $a, $a1);
$File .= '.gz';
header("Content-Encoding: gzip");
}
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=documento.{$NomExt}");
break;
case 'xls':
header("Pragma: no-cache");
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=excel.{$NomExt}");
break;
case 'doc':
header("Pragma: no-cache");
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=word.{$NomExt}");
break;
case 'pps':
case 'ppt':
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=powerpoint.{$NomExt}" );
break;
case 'gs': case 'inc': case 'php': case 'php4': case 'lp':
die('Error:3');
break;
default:
if( !file_exists($File) ){
if( mb_substr($File,0,13)==$Dir_.'h/' ){
?>
<SCRIPT type="text/javascript">
document.title = 'HELP eDes';
if( window.name!='AYUDA' ) window.moveTo(screen.width,0);
top.eAlert(S.lng(209), 'No existe la ayuda sobre:\n"<?= $File; ?>".', 'A', 'W');
if( window.name!='AYUDA' ) window.close();
</SCRIPT>
<?PHP
}else{
$sFile = explode('/',$File);
$sFile = explode('.',$sFile[count($sFile)-1]);
eTrace('', true);
eTrace("No existe la ayuda sobre: '{$sFile[0]}-{$File}'", true);
}
if( $_gsTron ) eTron('{20"}'.$File.' ['.mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1)).']');
eEnd();
}
}
if( $_gsTron ) eTron('{20}'.$File.' ['.mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1)).']');
if( $_Tree!='' ){
if( SESS::$sql['statistics'] && $NomScript[0]!='$' ){
$NomExt = mb_strtoupper($NomExt);
if( SETUP::$LogTrace["D*"] || SETUP::$LogTrace["D".$NomExt] ){
$_Sql 				= SESS::$sql['driver'];
$_SqlHostName 		= SESS::$sql['hostname'];
$_SqlDiccionario 	= SESS::$sql['database'];
$_SqlUsuario 		= SESS::$sql['user'];
$_SqlPassword 		= SESS::$sql['password'];
$_SqlTransaction 	= SESS::$sql['transaction'];
$_SqlInit 			= SESS::$sql['init'];
$_SqlPDOType 		= SESS::$sql['pdoType'];
$_SqlPDOConnect 	= SESS::$sql['pdoConnect'];
include_once($Dir_.$_Sql.'.inc');
$NomExt = str_replace("'",'"',$NomExt);
list($NomExt) = explode('?',$NomExt);
list($NomExt) = explode('&',$NomExt);
$ePagina = str_replace("'",'"',$_SERVER['QUERY_STRING']);
sql_Inserta("{$_ENV['eDesDictionary']}gs_acceso",
'cd_gs_toperacion, conexion, objeto, modo,				 edf		   , tabla, parametros,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      ,		''	 ,   'D' , '' , '".mb_substr($NomExt,0,250)."',  ''  , '{$File}' ,'{$ePagina}',     ''   ,     1    , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."'"
);
qEnd();
}
if( SETUP::$LogHistory['LogGsAccessFile']!='' ) error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
if( isset($_GET["_LOGDOWN"]) && is_numeric($_GET["_LOGDOWN"]) ){
$txt = file_get_contents($File);
preg_match('/(name=eDes>\/\/)(.*)(\n)/u', $txt, $match);
$txt = str_replace($match[2], $_GET["_SESS_"], $txt);
echo $txt;
}else{
readfile($File);
}
if( SESS::$_D_!="" && mb_substr($_SERVER["QUERY_STRING"],0,17)=='R:$t/developer.js' ){
SESS::$_Development = true;
if( SESS::$_D_=="~" ){
echo "top._gsAddMenu=[['-'],['Show Trace', '', [[top.S.session.logCallAnswer?'<b>Answer</b>':'Answer','','6'],[top.S.session.logCallSrv?'<b>Requests</b>':'Requests','','5']]],['CSS Create Var','','2a'],['-'],['To update', '', [['Packages','','edes.php?Ll:&#36;a/u/activity_pack'],['Scripts','','edes.php?Fc:&#36;a/u/activity'],['-'],['Setup HTTP','','edes.php?E:&#36;a/u/_http.gs']]]];";
}else if( SESS::$_D_=='A' ){
if( file_exists("../_d_/".S::$_User.".dvl") ){
@include("../_d_/".S::$_User.".dvl");
}
if( SESS::$_D_=='A' ){
echo "top._gsAddMenu=[['CSS Create Var','','2a'],['-'],['To update', '', [['Packages','','edes.php?Ll:&#36;a/u/activity_pack'],['Scripts','','edes.php?Fc:&#36;a/u/activity'],]]];";
}else if( file_exists("../_d_/usr/opdv.".S::$_User) ){
$txt = "";
$dim = file("../_d_/usr/opdv.".S::$_User);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])!="" ){
$i = (($dim[$n]*1)-123)/S::$_User;
switch( $i ){
case 12:
if( $txt!="" ) $txt .= ",";
$txt .= "['Packages','','edes.php?Ll:&#36;a/u/activity_pack']";
break;
case 23:
if( $txt!="" ) $txt .= ",";
$txt .= "['Scripts','','edes.php?Fc:&#36;a/u/activity']";
break;
}
}
}
if( $txt!="" ){
echo "top._gsAddMenu=[['To update', '', [".$txt.",]]];";
}
}
}
$icono = '<span class="CUR-CONTEXT" onclick="top.gsTools()" oncontextmenu="top.gsMenu()" on-contextmenu="_AccesosDirectos()" style="position:absolute; bottom:2px; right:2px; z-index:9999" title="Menu eDes" -title="eDes<br><br>Click Izq: Menú Tools<br>Click Dch: Menú Rápido">';
if( SESS::$_Development ){
$icono .= '<i class="ICONDESKTOP CUR-CONTEXT" style="color:#257086;margin:0px;">&#176;</i><i class="ICONDESKTOP CUR-CONTEXT" style="color:#63a1b3;margin:0px;">&#177;</i>';
}else{
$icono .= '<i class="ICONDESKTOP CUR-CONTEXT" style="color:#bd454b;margin:0px;">&#176;</i><i class="ICONDESKTOP CUR-CONTEXT" style="color:#ec8084;margin:0px;">&#177;</i>';
}
$icono .= '</span>';
echo "top._Master=".((SESS::$_D_=='~')?'true':'false')."; top._M_='".SESS::$_D_."'; top.S(top.S.createHTML(S.replace('{$icono}','<br>','\\n'))).nodeEnd(top.document.body);";
?>
if( S.is("eDesTree", document.cookie) ) top.S.info("Loading Tree...");
if( S.is("eDesTreePersonal=", document.cookie) )top.S.toDo('top.S.info("Loading PersonalTree...",3);top.eIWorkLocation("edes.php?E:$t/ed.gs&Development=Personal");');
if( S.is("eDesTreeSystem=", document.cookie) ) top.S.toDo('top.S.info("Loading SystemTree...",3);top.eIWorkLocation("edes.php?E:$t/ed.gs&Development=Tree");');
if( S.is("eDesTree", document.cookie) ) top.S.toDo('top.S.info();');
setTimeout(function(){ top.S.toDo(); });
<?PHP
}
break;
case 'H':
header("Content-Type: text/html; charset=UTF-8");
list($NomScript) = explode('&', mb_strtolower($NomScript));
$NomScript = str_replace(array("[","]","."), array("","","_"), $NomScript);
$File = $Dir_."h/".$NomScript.".htm";
if( !file_exists($File) ){
eTrace("No existe la ayuda sobre: '{$NomScript}'", true);
}else{
$txt = file_get_contents($File);
$txt = str_replace('<LINK REL="stylesheet" HREF="edes.php?R:$h/i/label.css" TYPE="text/css">', '<style>'.file_get_contents($Dir_."h/i/label.css").'</style>', $txt);
$txt = str_replace('<LINK REL="stylesheet" HREF="edes.php?R:$h/i/edesweb.css" TYPE="text/css">', '<style>'.file_get_contents($Dir_."h/i/edesweb.css").'</style>', $txt);
echo $txt;
}
break;
case 'V':
$tmp = explode('&',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = mb_substr( $_SERVER['QUERY_STRING'], mb_strpos($_SERVER['QUERY_STRING'],'&')+1 );
array_shift($argv);
array_shift($_GET);
list($NomScript) = explode('&', $NomScript );
$File = eScript( $NomScript );
$NomExt = mb_strtolower(mb_substr($File,mb_strrpos($File,'.')+1));
if( $_CachePc=='' || eSubstrCount(',pdf,xls,doc,',",{$NomExt},") > 0 ){
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y H:i:s T"));
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
}else{
header("Last-Modified: ".gmdate("D, d M Y 00:00:01 T"));
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
include($Dir_.'visor.inc');
break;
case 'B':
_TraceDevelopment();
include( $Dir_.'background.inc' );
break;
case 'X':
include($Dir_.'_tabla.gs');
case 'A':
list($file) = explode('&', urldecode($_SERVER['QUERY_STRING']).'&');
$file = mb_substr($file, 2);
if( $file[0]=="$" ){
$file = mb_substr($file, 1);
$file = __DIR__.'/lng/help/'.$file;
if( file_exists($file."_".SESS::$_LANGUAGE_) ){
$file .= "_".SESS::$_LANGUAGE_;
}else if( file_exists($file."_".SESS::$_LanguageDefault) ){
$file .= "_".SESS::$_LanguageDefault;
}
}else if( $file[0]=="/" ){
$file = "..".$file;
}else{
$file = '../help/tip/'.$file;
}
if( mb_strpos($file, ".")===false ){
if( file_exists($file.".".SESS::$_LANGUAGE_) ){
$file .= ".".SESS::$_LANGUAGE_;
}else if( file_exists($file.".".SESS::$_LanguageDefault) ){
$file .= ".".SESS::$_LanguageDefault;
}
}else if( mb_strpos($file, "@")!==false ){
$fileLanguage = str_replace("@", "_".SESS::$_LANGUAGE_, $file);
$fileDefault  = str_replace("@", "_".SESS::$_LanguageDefault, $file);
$fileNeutro   = str_replace("@", "", $file);
if( file_exists($fileLanguage) ){
$file = $fileLanguage;
}else if( file_exists($fileDefault) ){
$file = $fileDefault;
}else if( file_exists($fileNeutro) ){
$file = $fileNeutro;
}
}
$txt = file_get_contents($file);
if( mb_substr($file,-5)=='.mark' ){
include_once(__DIR__.'/markdown.inc');
$txt = eMarkdown($txt);
}
die($txt);
case 'i':
include($Dir_.'t/ei.gs');
break;
case 'u':
$__='{#}eDes{#}';
$_SERVER["QUERY_STRING"] = SESS::$QueryString;
SESS::$QueryString = "";
include($Dir_.'login.gs');
break;
case 'w':
include($Dir_.'alerts_update.inc');
break;
case '-':
include($Dir_.'file_delete.inc');
break;
case 'r':
list($NomScript) = explode('&', $NomScript);
if( eSubstrCount($NomScript, '&_PSOURCE=')>0 ) $NomScript = mb_substr($NomScript,0,mb_strpos($NomScript,'&_PSOURCE='));
$File = eScript($NomScript);
header("Content-Type: text/html; charset=UTF-8");
list($File) = explode('?', $File);
readfile($File);
break;
case 'D':
_TraceDevelopment();
$tmp = explode(':', $_Accion);
$conDown = (($_GET["_DOWN"]==0) ? "" : " && false");
if( $tmp[1][0]=='*' ){
$b64 = str_replace('%20',' ',mb_substr($tmp[1],1));
$tmp = explode('|',$b64);
if( eSubstrCount($tmp[0],'.')>0 ) list(,$tmp[0]) = explode('.',$tmp[0]);
if( eSubstrCount($tmp[1],' ')>0 ) list($tmp[1]) = explode(' ',$tmp[1]);
if( eSubstrCount($tmp[2],'.')>0 ) list(,$tmp[2]) = explode('.',$tmp[2]);
qQuery("select {$tmp[0]} from {$tmp[1]} where {$tmp[2]}='{$tmp[3]}'");
$_DBMEMO[$tmp[0]] = true;
$r = qArray();
if( !empty($r[$tmp[0]]) ){
$Ext = explode('.',$tmp[4]);
$filename = $tmp[4];
$FileReal = S::$_User.'.'.$Ext[count($Ext)-1];
@unlink("../_tmp/php/{$FileReal}");
file_put_contents("../_tmp/php/{$FileReal}", $r[$tmp[0]]);
?>
<script type="text/javascript">
if( /(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i.test("<?=$FileReal?>") <?=$conDown?> ){
top.S.window("edes.php?E:$img.php<?=(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"")?>&IMG=/_tmp/php/<?=$FileReal?>");
}else{
top.eCallSrv(window, "edes.php?D:/_tmp/php/<?=$FileReal?><?=(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"")?>&FILE=<?=$filename?>");
}
</script>
<?PHP
eEnd();
}
}else if( $tmp[1][0]=='!' ){
$b64 = mb_substr($tmp[1],1);
$b64 = base64_decode(mb_substr($b64,0,10).mb_substr($b64,20));
$tmp = explode(',',$b64);
if( isset($_DB) ){
include("../_datos/config/{$_DB}.inc");
if( $_DB=='oracle' ) $_DBMEMO[$tmp[0]] = true;
}
qQuery("select {$tmp[0]} from {$tmp[1]} where {$tmp[2]}='{$tmp[3]}'");
$r = qArray();
if( $r[$tmp[0]]!='' ){
$filename = $tmp[5];
$FileReal = S::$_User.'.'.$tmp[4];
@unlink("../_tmp/php/{$FileReal}");
file_put_contents("../_tmp/php/{$FileReal}",$r[$tmp[0]]);
?>
<script type="text/javascript">
if( /(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i.test("<?=$FileReal?>") <?=$conDown?> ){
top.S.window("edes.php?E:$img.php&IMG=/_tmp/php/<?=$FileReal?>");
}else{
top.eCallSrv(window, "edes.php?D:/_tmp/php/<?=$FileReal?>&FILE=<?=$filename?>");
}
</script>
<?PHP
eEnd();
}
}else if( $tmp[1][0]=='-' ){
}else if( false ){
$pk = $tmp[1];
$tmp[1] = eContext2FileGet($tmp[1]);
if( $_GET["_CONTEXT"]==$pk && $_GET["_FILE"] ){
if( !preg_match('/^[0-9]*$/u', $_GET["_FILE"]) ){
_hackerLog("_FILE no valido");
}
if( !function_exists("qQuery") ){
$fileIni = '../_datos/config/'.SESS::$sql['file'].'.ini';
include($fileIni);
$fileDriver = DIREDES.$_Sql.'.inc';
include($fileDriver);
}
$sql = $_GET["_IN_SQL_"];
if( preg_match('/[\s\t]*where[\s\t]*/iu', $sql) ){
$sql .= " and ";
}else{
$sql .= " where ";
}
$sql .= $_GET["_ALIAS_"].$_GET["_SERIAL_"]."=".$_GET["_FILE"];
qQuery($sql);
$r = qRow();
eExplodeLast($r[1], ".", $iz, $ext);
$file = $_GET["_DIR_"].$r[0].".".$ext;
$tmp[1] = $file;
}
}
$downloadCenter = "";
if( is_numeric($tmp[1]) ){
$downloadCenter = trim($tmp[1]);
}
$sFile = str_replace('%20', ' ', $tmp[1]);
if( $File=='../d/undefined' ) $File = '/_tmp/pdf/lst_'.$_User.'.pdf';
if( $tmp[1]!='' ) $tmp[1] = eScript($tmp[1]);
$File = $tmp[1];
if( eSubstrCount($File,'.')>0 ){
$Extension = mb_substr($File, mb_strrpos($File,'.')+1);
}else if( isset($_FILEPDF) ){
$Extension = 'pdf';
}
if( eFileGetVar("System.ZipDownload") ){
if( $Extension!='zip' && $Extension!='gz' && $Extension!='cab' ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec("gzip {$File}", $a, $a1);
$File .= '.gz';
$Extension = 'gz';
}
}
if( isset($WHO) ){
$_SAVETRACE = true;
SESS::$_Development = false;
Estadistica('DWN', 1);
}
if( $Extension=='cab' ){
$DimFile = str_replace('\\','/',$File);
$DimFile = explode('/',$DimFile);
$DimFile = $DimFile[count($DimFile)-1];
list($DimFile) = explode('.',$DimFile);
$FILE = trim($DimFile);
}
if( isset($FILE) ){
$FILE = urlencode($FILE);
}else{
$FILE = 'archivo.'.$Extension;
}
if( eSubstrCount($FILE,'.')==0 ) $FILE .= '.'.$Extension;
$SerialDOC = "";
if( SESS::$sql['statistics'] && !isset($_GET['_NoLog_']) ){
$sExtension = mb_strtoupper($Extension);
if( SETUP::$LogTrace["D*"] || SETUP::$LogTrace["D".$sExtension] ){
$_Source = str_replace("'",'"',$_Source);
$_TReg = ((isset($_GET['_TReg'])) ? $_GET['_TReg'] : 1);
$_Type = ((isset($_GET['_Type'])) ? $_GET['_Type'] : $sExtension);
if( isset($_GET['_Mode']) ) $_SubMode = $_GET['_Mode'];
$ePagina = ((isset($_GET['_Doc'])) ? $_GET['_Doc'] : '');
$ePagina = eEntityEncode($_SERVER['QUERY_STRING']);
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_acceso
(cd_gs_toperacion,     conexion     , objeto,         modo  ,				edf			  ,    tabla  , parametros,    pagina  , parametro, registros , cd_gs_user, cd_gs_node,             cdi          ) values
(     'DOC'      , '{$_Connection_}',   'D' ,  '{$_SubMode}', '".mb_substr($_Source,0,250)."', '{$_Type}', '{$FILE}' ,'{$ePagina}',     ''   , '{$_TReg}', '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."')"
);
$SerialDOC = S::qId();
}
if( !empty(SETUP::$LogHistory['LogGsAccessFile']) ){
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
if( is_numeric($downloadCenter) ){
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_download where cd_download={$downloadCenter}");
$r = S::qArray();
if( $r["cd_gs_user"]!=S::$_User ){
eInit();
die("");
}
S::qQuery("update {$_ENV['eDesDictionary']}gs_download set total_download=total_download+1 where cd_download={$downloadCenter}");
$sFile = "/_tmp/pdf/{$downloadCenter}.".trim($r["type_file"]);
$xNameFile = trim($r["nm_download"]).".".trim($r["type_file"]);
}else if( pathinfo($File, PATHINFO_DIRNAME)."/"=="../_tmp/pdf/" ){
$pk = eFileName($File);
S::qQuery("update {$_ENV['eDesDictionary']}gs_download set total_download=total_download+1 where cd_download={$pk}");
}
ob_end_clean();
ob_implicit_flush(1);
if( isset($_CACHEFILESRV) && file_exists(eScript($_CACHEFILESRV)) ){
$sFile = $_CACHEFILESRV;
}else if( isset($_FILEPDF) ){
list($Ini, $Fin) = explode(',',$_FILEPDF);
$oNomFile = '/_tmp/pdf/lst_'.$_User.'.pdf';
$txt = '..'.$oNomFile;
for($n=1; $n<=$Fin; $n++){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) $txt .= ' ../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf';
}
if( eSubstrCount($txt,' ')>0 ) exec("gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile={$txt}");
for($n=1; $n<=$Fin; $n++){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) @unlink( '../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf' );
}
if( $_CACHEFILESRV!='' ){
copy(eScript($oNomFile), eScript($_CACHEFILESRV));
$oNomFile = $_CACHEFILESRV;
}
$File = $oNomFile;
if( !file_exists(eScript($sFile)) ) copy(eScript($oNomFile), eScript($sFile));
if( $sFile=='' ){
$sFile = '..'.$oNomFile;
$Extension = 'pdf';
}else if( $sFile=='undefined' ){
$sFile = '..'.$oNomFile;
$FILE = 'archivo';
$Extension = 'pdf';
}
}
if( SESS::$sql['statistics'] && !empty(SETUP::$LogDownload['LogFileDownload']) && !isset($_GET['_NoLog_']) && $SerialDOC!="" ){
if( $Extension!='zip' ){
$Dim = array();
$Dir = eGetCWD();
if( LINUX_OS ){
$ExeZip = "zip -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($sFile);
exec($ExeZip, $Dim);
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".SETUP::$LogDownload['LogFileDownload'].$SerialDOC." ".eScript($sFile);
eZipFile(SETUP::$LogDownload['LogFileDownload'].$SerialDOC.".zip", eScript($sFile));
}
}else{
copy(eScript($sFile), SETUP::$LogDownload['LogFileDownload'].$SerialDOC.'.'.$Extension);
}
}
$txt = file_get_contents('../_datos/config/empty_page.htm');
$txt = mb_substr($txt, 0, mb_strripos($txt, "</body>"));
if( SESS::$_Development ) $txt = str_replace(' oncontextmenu="return false;"','',$txt);
$FILE = str_replace("'", '', str_replace('"', '',$FILE));
if( ".{$Extension}"==mb_substr( $FILE, -mb_strlen(".{$Extension}")) ) $FILE = mb_substr($FILE, 0, -mb_strlen(".{$Extension}"));
if( $FILE=='archivo' ) $FILE = 'Doc·'.date('H·i·s');
if( empty($_TemporaryCopyTo) && file_exists('../_datos/usr/'.S::$_User.'.pth') ) $_TemporaryCopyTo = trim(file_get_contents('../_datos/usr/'.S::$_User.'.pth'));
$NameFile = "{$FILE}.{$Extension}";
$NameFile = str_replace("·", "-", $NameFile);
$NameFile = urldecode($NameFile);
if( !empty($_GET['_FILENAME']) ) $NameFile = $_GET['_FILENAME'];
if( !empty($_GET['_TARGETPATH']) ){
$_GET['_TARGETPATH'] = str_replace( '/','\\',$_GET['_TARGETPATH']);
if( mb_substr($_GET['_TARGETPATH'],-1)!='\\' ) $_GET['_TARGETPATH'] .= '\\';
$_GET['_TARGETPATH'] = str_replace( '\\','\\\\',$_GET['_TARGETPATH']);
}
$NameFile = str_replace('+', ' ', $NameFile);
$NameFile = urldecode($NameFile);
if( is_numeric($downloadCenter) ){
$NameFile = $xNameFile;
}
if( eSubstrCount($sFile, '!')>0 ) $sFile = eSplitPath($sFile);
$ok = true;
if( eFileType($sFile)=="txt" && !file_exists(eScript($sFile)) ){
$sFile = str_replace(["/pdf/",".txt"], ["/zip/",".zip"], $sFile);
}
if( eFileType($sFile)=="csv" && !file_exists(eScript($sFile)) ){
$sFile = str_replace(["/pdf/",".csv"], ["/zip/",".zip"], $sFile);
}
if(	!empty(SETUP::$LogDownload['LogFileDownload']) && eSubstrCount($sFile, SETUP::$LogDownload['LogFileDownload'])>0 && $_GET['_Type']=='MDB' ){
$Dir = '../_tmp/zip/';
if( LINUX_OS ){
$ExeZip = "unzip -d {$Dir} ".eScript($sFile);
}else{
$ExeZip = eScript('$win/unzip.exe')." -d {$Dir} ".eScript($sFile);
}
$Dim = array();
$zip = zip_open(eScript($sFile));
if( !is_resource($zip) ){
exit;
}else{
$entry = zip_read($zip);
$entries = zip_entry_name($entry);
$sFile = '/_tmp/zip/'.$entries;
}
zip_close($zip);
exec($ExeZip, $Dim);
eUpload($sFile, date('H·i·s'));
}elseif( !isset($_GET['_ASYNC']) ){
if( file_exists(eScript($sFile)) ){
if( preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/iu', $sFile) && !isset($_GET["_DOWN"]) ){
$url = 'edes.php?E:$img.php'.(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"").'&IMG='.$sFile.'&_FILEDIRECT=1';
if( isset($_GET["_FILEDIRECT"]) ){
?>
<script>
location.href = top.S.urlAdd("<?=$url?>");
</script>
<?PHP
}else{
?>
<script>
top.S.window("<?=$url?>");
</script>
<?PHP
}
}else{
eUpload($sFile, $NameFile);
}
eEnd();
?>
<?PHP
}else $ok = false;
}else{
if( file_exists(eScript($sFile)) ){
eUpload($sFile, $NameFile);
}else $ok = false;
}
if( !$ok ){
eJS("top.S.error('File {$sFile} does not exist')");
exit;
}
eEnd();
case 'o':
$_DF = __DIR__.'/itm/'.str_replace(array('.','&','/',CHR92), array('','','',''), $_DF).'.inc';
if( file_exists($_DF) ) include($_DF);
eEnd();
default:
exit;
}
eEnd();
?>