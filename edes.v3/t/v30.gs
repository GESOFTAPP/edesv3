<?php
die("Sin uso #1");
date_default_timezone_set('Europe/Madrid');
define( '_ERROR_REPORTING', 5 );
error_reporting( _ERROR_REPORTING );
define( '_TRACK_ERRORS', false );
ini_set( 'track_errors', false );
foreach( $_GET  as $k=>$v ) $GLOBALS[$k] = $v;
foreach( $_POST as $k=>$v ) $GLOBALS[$k] = $v;
list( $_GET['SC'] ) = explode( '&', $_GET['SC'] );
$_UFT8 = ( mb_strlen($_utf8_)==2 );
$_DirEDes = $_PathHTTP;
$tmp = explode('/',$_DirEDes);
$_DirApli = ''; for( $n=0; $n<count($tmp)-2; $n++ ) $_DirApli .= $tmp[$n].'/';
$_DirEDes = ''; for( $n=0; $n<count($tmp)-3; $n++ ) $_DirEDes .= $tmp[$n].'/';
$_DirBase = $_DirEDes;
$_DirEDes .= 'edes.v3/';
$Dir_ = $_DirEDes;
$_DirFileApli = mb_substr($_DirApli,0,-1).'.file/';
if( isset($_GET['SC']) && $_GET['SC'][0]=='>' ) $_GET['SC'] = mb_substr($_GET['SC'],1);
if( $_GET['AP']=='$' && $_GET['TE']==1 && $_GET['SS']==2 && $_GET['SC']<>'' && $_GET['IDSRV']<>'' ){
if( _IDSRV()<>$_GET['IDSRV'] ) die('ERROR');
if( !function_exists('qQuery') ){
eval(qSetup());
include_once( $_DirEDes.$_Sql.'.inc' );
}
list( $NomFile, $Ext ) = explode( '.', $_GET['SC'] );
$_User = 1;
$Cdi = date('Y-m-d H:i:s');
sql_Query("insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$NomFile}.{$Ext}', '{$_ENV['ON']}', '".SESS::$_UserEMail."')");
sql_Query("insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$NomFile}.info'  , '{$_ENV['ON']}', '".SESS::$_UserEMail."')");
sql_Desconecta();
die('OK');
}
if( $_GET['OWNER']!='' ){
if( !function_exists('qQuery') ){
eval(qSetup());
include_once( $_DirEDes.$_Sql.'.inc' );
}
QueDesarrollador( $_GET['OWNER'] );
eEnd();
}
if( $_GET['US']!=S::$_User ){
error_log( date('H:i:').str_pad( sprintf( "%2.6f", (date('s')+mb_substr(microtime(),0,8)) ), 9 ,'0',STR_PAD_LEFT )." Usuario de sesión diferente: [".$_GET['US'].'!='.S::$_User."] \n", 3, '../_tmp/log/vb.'.$_GET['US'] );
eEnd();
}
$FR = '';
$_RecentFiles = 15;
$TE	 = $_GET['TE'];
$sSC	 = $_GET['SC'];
$SC	 = mb_strtolower($_GET['SC']);
$_User = $_GET['US'];
SESS::$_gsACCESO = $_GET['DV'];
$__DDBB = '';
if( $SC[0]=='*' ){
$txt = explode( '/', str_replace( CHR92, '/', mb_substr($SC,1) ) );
if( !file_exists('../../'.$txt[0].'/http/edes.php') ){
composeResult( '0', 'ERROR:33Q', $SC );
sendFR();
exit;
}
$SC = '../../'.mb_substr($SC,1);
}
if( isset($TE) ){
_TraceDevelopment();
if( $TE=='DLL' ){
EnvioInfoDLL();
}elseif( $TE=='DOWN' || $TE=='E' || $TE=='V' ){
sendFile( $SC, false );
}elseif( $TE=='BIN' ){
sendFile( $SC, true );
}elseif( $TE=='EDF' ){
$SC = trim($sSC);
if( eSubstrCount($SC,'.') > 0  ){
list( $xDDBB, $SC, $DBPropietario ) = explode('.',$SC);
if( $DBPropietario!='' ){
$_DDBB_OWNER = $xDDBB;
$xDDBB = $SC;
$SC = $DBPropietario;
}
$__DDBB = $xDDBB;
if( eSubstrCount($xDDBB,'.') == 0 ) $xDDBB .= '.ini';
include_once('../_datos/config/'.$xDDBB);
}else{
eval(qSetup());
}
include_once( $_DirEDes.$_Sql.'.inc' );
crearEDF( trim($SC) );
}elseif( $TE=='SDF' ){
$SC = trim($sSC);
if( eSubstrCount($SC,'.') > 0  ){
list( $xDDBB, $SC, $DBPropietario ) = explode('.',$SC);
if( $DBPropietario!='' ){
$_DDBB_OWNER = $xDDBB;
$xDDBB = $SC;
$SC = $DBPropietario;
}
if( eSubstrCount($xDDBB,'.') == 0 ) $xDDBB .= '.ini';
include_once('../_datos/config/'.$xDDBB);
}else{
eval(qSetup());
}
include_once( $_DirEDes.$_Sql.'.inc' );
crearSDF( $SC );
}elseif( $TE=='SubList' ){
$SC = trim($sSC);
list( $TablaPadre, $TABLA, $sScript ) = explode( ',', $_GET['SC'] );
if( eSubstrCount($TABLA,'.') > 0  ){
$TABLA = trim($TABLA);
list( $xDDBB, $SC, $DBPropietario ) = explode('.',$TABLA);
if( $DBPropietario!='' ){
$_DDBB_OWNER = $xDDBB;
$xDDBB = $SC;
$SC = $DBPropietario;
}
if( eSubstrCount($xDDBB,'.') == 0 ) $xDDBB .= '.ini';
include_once('../_datos/config/'.$xDDBB);
$_GET['SC'] = "{$TablaPadre},{$SC},{$sScript}";
$SC = $_GET['SC'];
}else{
eval(qSetup());
}
include_once( $_DirEDes.$_Sql.'.inc' );
crearSubList( $SC );
}elseif( $TE=='DELTRON' ){
@unlink( "../_tmp/__tron.".S::$_User );
}elseif( $TE=='DELSQL' ){
@unlink("../_tmp/log/sql.".S::$_User);
}elseif( $TE=='9' || $TE=='10' ){
sendInfo( $SC );
}elseif( $TE=='SAVE' ){
saveFile( $SC );
}elseif( $TE=='INT' ){
exeScript();
}elseif( $TE=='SQL' ){
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
$NomFile = '../_tmp/edes_'.$_GET['SC'].'.'.$_GET['US'];
file_put_contents( $NomFile, $content );
eval(qSetup());
$FUENTE = $content;
include_once( DIREDES.'t/v35.gs' );
}else if( $TE=='STRUCTURE' ){
if( $DDBB=='' ){
eval(qSetup());
}else{
$_OtroDiccionario = true;
$DDBB = str_replace(' ','',$DDBB);
if( eSubstrCount($DDBB,',') == 0 ){
if( $DDBB[0]=='>' ) $DDBB = trim(mb_substr($DDBB,1));
$_DB = $DDBB;
if( eSubstrCount(str_replace('\\','/',$DDBB),'/')==0 ) $DDBB = '/_datos/config/'.$DDBB;
if( eSubstrCount($DDBB,'.')==0 ) $DDBB .= '.ini';
if( $DDBB[0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$DDBB);
}else{
$_SqdDefinitionFile = eScript($DDBB);
}
include( $_SqdDefinitionFile );
}else{
list( $_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect ) = explode( ',',$DDBB);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = $$_SqlHostName;
}
list( $_Sql, $_SqlPDOType ) = explode( ':', str_replace(' ','',$_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
include_once( $_DirEDes.$_Sql.'.inc' );
$STRUCTURE = $SC;
include_once( DIREDES.'t/vtools_mysql.gs' );
}else if( $TE=='LASTSCR' ){
$Dim = file( '../_d_/usr/recientes.'.S::$_User );
$tf = 0;
for( $i=0; $i<count($Dim); $i++ ) if( trim($Dim[$i])!='' ) $tf++;
if( $tf > 0 ){
echo ",FICHEROS RECIENTES";
for( $i=0; $i<count($Dim); $i++ ) if( $i < $_RecentFiles && trim($Dim[$i])!='' ) echo "\n".trim($Dim[$i]);
}
}else if( $TE=='$h/help.gs' ){
include_once( $_DirEDes.'h/help.gs' );
}else if( $TE=='SEEKTXT' ){
BuscaTxt( $_GET['SEEKTXT'] );
}else if( $TE=='SEEKFILE' ){
BuscaFile( $_GET['SEEKFILE'] );
}else if( $TE=='TOOLS' ){
include( $_DirEDes.'t/u/'.$SC );
}else if( $TE=='CONFIG' ){
LoadConfig();
}else if( $TE=='gsShell' ){
$_gsID = getmypid();
include( $_DirEDes.'t/vsh.gs' );
}
}
eEnd();
function exeScript(){
global $content, $_FileSession, $_UFT8;
global $_DirEDes, $_Sql;
global $_SqlPDOType, $_SqlPDOConnect;
global $_SqlTransaction, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOConnect;
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
$NomFile = '../_tmp/edes_'.$_GET['SC'].'.'.$_GET['US'];
$txt = $content;
if( mb_strtoupper(mb_substr($txt,0,3))=='DB:' ){
$n = mb_strpos( $txt, ';' );
$i = mb_strpos( $txt, CHR10 );
if( $n>0 && $i>0 ) $n = min($n,$i);
$Comando = mb_substr($txt,0,$n);
$txt = mb_substr($txt,$n+1);
list(,$tmp2) = explode(':',$Comando);
$tmp2 = trim($tmp2);
if( eSubstrCount(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( eSubstrCount($tmp2,'.')==0 ) $tmp2 .= '.ini';
include( eScript($tmp2) );
if( eSubstrCount(',mysql,informix,oracle,pdo,',"{$_Sql}," ) == 0 ) die("ERROR: Controlador '{$_Sql}' no implantado");
include_once( $_DirEDes.$_Sql.'.inc' );
list( $_SqlPDOType ) = explode( ':', $_SqlPDOConnect );
}else{
eval(qSetup());
include_once( $_DirEDes.$_Sql.'.inc' );
}
if( 	 eregi("^SAVE:", $txt) ){
$Dim = explode("\n",$txt);
$txt = mb_substr($txt,mb_strlen($Dim[0]));
$NomSave = trim(mb_substr($Dim[0],5));
file_put_contents( '../_d_/usr/'.$NomSave.'_php.'.$_GET['US'], $txt );
}elseif( eregi("^LOAD:", $txt) ){
$Dim = explode("\n",$txt);
$txt = mb_substr($txt,mb_strlen($Dim[0]));
$NomSave = trim(mb_substr($Dim[0],5));
echo file_get_contents( '../_d_/usr/'.$NomSave.'_php.'.$_GET['US'] );
eEnd();
}elseif( eregi("^RM:", $txt) ){
$Dim = explode("\n",$txt);
$txt = mb_substr($txt,mb_strlen($Dim[0]));
$NomSave = trim(mb_substr($Dim[0],3));
@unlink( '../_d_/usr/'.$NomSave.'_php.'.$_GET['US'] );
echo 'Fichero "'.$NomSave.'" borrado';
eEnd();
}elseif( eregi("^LS:", $txt) ){
$MisFiles = '_php.'.$_GET['US'];
$Long = mb_strlen($MisFiles)*-1;
$df = opendir('../_d_/usr/');
echo '<TABLE border=0 cellspacing=3 cellpadding=1>';
echo '<col><col style="text-align:right">';
echo '<TR><TH style="border-bottom:solid 1px #000000">FICHERO</TH><TH style="border-bottom:solid 1px #000000">BYTS</TH><TH style="border-bottom:solid 1px #000000">FECHA</TH></TR>';
while( $dir = readdir($df) ){
if( $dir!='.' && $dir!='..' && !is_dir($dir) && mb_substr($dir,$Long)==$MisFiles ){
echo '<TR><TD>'.mb_substr($dir,0,$Long).'</TD><TD>'.eNumberFormat(filesize('../_d_/usr/'.$dir)).'</TD><TD>'.date('Y-m-d H:i:s', filemtime('../_d_/usr/'.$dir)).'</TD></TR>';
}
}
closedir($df);
echo '</TABLE>';
eEnd();
}
file_put_contents( $NomFile, $txt );
include_once( $NomFile );
eEnd();
}
function saveFile( $f ){
global $content, $_RecentFiles, $_UFT8, $_DirApli, $_DirEDes;
securityCheck($f);
if( eSubstrCount( mb_substr($DL,0,5), ':' ) > 0 ){
$f = explode(':',$DL);
$DL = $f[1];
}
if( SESS::$_D_!='~' && $f[0]=='$' ){
echo "2|Sin permisos de modificación|";
eEnd();
}
$OriFile = $f;
$EsTree = false;
switch( $OriFile ){
case '$t/__edes.arb':
case '$t/__analista.arb':
case '$t/__master.arb':
case '$t/__programador.arb':
$EsTree = true;
break;
default:
if( mb_substr($OriFile,0,17)=='/tree/__personal.' ) $EsTree = true;
}
$f = mb_strtolower($f);
$fPath = NomFile( $f, $fPathBak );
if( $_GET['MD5']!='' && file_exists($fPath) && md5_file($fPath)<>$_GET['MD5'] ){
echo "2|Archivo modificado por otro usuario. ({$f})|{$f}";
eEnd();
}
CrearDirectorios( $_DirApli.'_bak_/_daily/' );
$Dim = explode('/',$fPath);
$i = (int)eGetMicrotime();
$Cdi = date('Y-m-d H:i:s',$i);
copy( $fPath, $_DirApli.'_bak_/_daily/'.$Dim[count($Dim)-1].'.'.$i );
CrearDirectorios($fPathBak);
$_nBackup = eFileGetVar('../_d_/cfg/edes.ini->$_nBackup');
if( $_nBackup!='' && $_nBackup!='0' ){
if( $_nBackup==-2 ){
error_log( ((file_exists($fPathBak)) ? CHR13.CHR10:'').str_repeat('·',75).'[Bak] '.date('Y-m-d H:i:s').CHR13.CHR10.file_get_contents($fPath), 3, $fPathBak );
}else if( $_nBackup==-1 ){
copy( $fPath, $fPathBak.'.'.date('Ymd') );
}else if( $_nBackup > 0 ){
$Sufijo = date('z') % $_nBackup;
copy( $fPath, $fPathBak.'.'.$Sufijo );
}
}
$txt = $content;
if( trim($txt)=='' ){
@unlink( $fPath );
clearstatcache();
echo "1|Archivo borrado. ({$f})|{$f}|".md5_file($fPath);
gsActivity( $fPath, $Cdi );
eEnd();
}
if( $EsTree ){
$txt = trim(mb_substr( $fPath, mb_strrpos($fPath,'/')+1)) ."\n". $txt;
$r = file_put_contents( $fPath, gzcompress($txt,1) );
}else{
if( eSubstrCount($fPath,'/_datos/config/sql.ini')>0 && mb_substr($txt,0,2)!='<'.'?' ){
$r = file_put_contents( $fPath, gzcompress($txt,1) );
}else{
if( $_DirEDes==mb_substr($fPath,0,mb_strlen($_DirEDes)) && SESS::$_D_=='~' ){
copy( $fPath, $fPath.'.___' );
}
$r = file_put_contents( $fPath, $txt );
}
}
if( $r===false ){
echo "0|Error grabando archivo: {$f}|{$f}";
}else{
clearstatcache();
echo "1|Archivo grabado correctamente. ({$f})|{$f}|".md5_file($fPath);
$Recientes = '../_d_/usr/recientes.'.S::$_User;
$Dim = [];
if( file_exists($Recientes) ){
$Dim = file($Recientes);
}
$txt = $OriFile."\n";
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( $OriFile != $Dim[$i] && $Dim[$i] != '' ) $txt .= $Dim[$i]."\n";
if( $i > $_RecentFiles ) break;
}
file_put_contents( $Recientes, $txt );
gsActivity( $fPath );
}
eEnd();
}
function securityCheck( $f ){
}
function sendFile( $DL, $Binario ){
if( eSubstrCount( mb_substr($DL,0,5), ':' ) > 0 ){
$f = explode(':',$DL);
$DL = $f[1];
}
$EsTree = false;
switch( $DL ){
case "/http/css/desktop2.css":
case "/http/css/desktop".SESS::$_Desktop.".css":
case "/http/".SESS::$_PathCSS."/desktop1.css":
case "/http/".SESS::$_PathCSS."/desktop2.css":
case "/http/".SESS::$_PathCSS."/desktop".SESS::$_Desktop.".css":
include_once('../_datos/config/desktop.ini');
$DL = "/http/".SESS::$_PathCSS."/desktop".SESS::$_Desktop.".css";
break;
case '$t/__edes.arb':
case '$t/__analista.arb':
case '$t/__master.arb':
case '$t/__programador.arb':
$EsTree = true;
break;
default:
if( mb_substr($DL,0,17)=='/tree/__personal.' ) $EsTree = true;
}
securityCheck($DL);
$fPath = NomFile($DL);
if( $EsTree ) $fPath = mb_strtolower($fPath);
switch( mb_substr($fPath,-3) ){
case 'edf':
case 'gdf':
case 'sdf':
case 'ldf':
case 'fdf':
case 'txt':
case 'php':
$FileNuevo = true;
break;
default:
$FileNuevo = false;
}
if( file_exists( $fPath ) ){
if( eSubstrCount($fPath,'/_datos/config/sql.ini')>0 ){
$txt = trim(@file_get_contents( $fPath ));
if( mb_substr($txt,0,2)!='<'.'?' ){
echo gzuncompress($txt);
}else{
echo $txt;
}
}else if( $EsTree ){
$Todo = gzuncompress( file_get_contents( $fPath ) );
$Todo = mb_substr( $Todo, mb_strpos($Todo,"\n") + 1 );
echo $Todo;
}else if( $Binario ){
echo file_get_contents( $fPath );
}else{
echo file_get_contents( $fPath );
}
}else{
if( $FileNuevo ){
eEnd();
}else{
composeResult( '0', 'El archivo solicitado no existe.', $DL );
sendFR();
}
}
eEnd();
}
function sendInfo($HR){
global $FR;
if( eSubstrCount( mb_substr($HR,0,5), ':' ) > 0 ){
$f = explode(':',$HR);
$HR = $f[1];
}
$fPath = NomFile($HR);
securityCheck($HR);
switch( mb_substr($fPath,-3) ){
case 'edf':
case 'gdf':
case 'ldf':
case 'fdf':
case 'sdf':
case 'txt':
case 'php':
$FileNuevo = true;
break;
case 'css':
$FileNuevo = true;
break;
default:
$FileNuevo = false;
}
if( $FileNuevo || file_exists( $fPath ) ){
$a=array();
$a['name'] = $HR;
$a['path'] = $fPath;
$a['lang'] = _TipoFile( $fPath );
$a['canBeSaved'] = ( (mb_substr(file_get_contents($fPath),0,4)!='Zend') ? 'true' : 'false' );
$a['canBeSavedLocally'] = 'false';
$afilestosend[] = $a;
getAditionalFilesToSend( $fPath, $afilestosend );
composeResult( '1', 'El archivo solicitado sí existe.', $HR );
$a=array();
foreach( $afilestosend as $k=>$v ){
$MD5 = md5_file(eScript($v['name']));
$a[] = "<file name=\"{$v['name']}\" lang=\"{$v['lang']}\" canBeSaved=\"{$v['canBeSaved']}\" canBeSavedLocally=\"{$v['canBeSavedLocally']}\" canMD5=\"{$MD5}\"></file>";
}
$FR .= "<files>".implode('',$a)."</files>";
sendFR();
}else{
composeResult( '0', 'El archivo solicitado no existe.', $f );
sendFR();
}
eEnd();
}
function _TipoFile( $fPath ){
switch( mb_substr($fPath,-3) ){
case 'edf':
case 'gdf':
case 'ldf':
case 'fdf':
case 'idf':
case 'zdf':
case 'lst':
$TipoFile = 'edes';
break;
case 'sdf':
case 'txt':
case 'php':
case '.gs':
$TipoFile = 'php';
break;
case 'css':
$TipoFile = 'css';
break;
default:
$TipoFile = 'php';
}
return $TipoFile;
}
function crearEDF( $TABLA ){
global $_DirEDes, $_Sql, $_SqlPDOType;
if( $TABLA<>"" ){
include( "{$_DirEDes}t/credf.inc" );
if( $_Sql=='mysql' ){
$Todo = CreaFCHMySql( $TABLA );
}else if( $_Sql=='mysqli' ){
$Todo = CreaFCHMySqli( $TABLA );
}else if( $_Sql=='informix' || ($_Sql=='pdo' && $_SqlPDOType=='informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( $_Sql=='oracle' ){
$Todo = CreaFCHOracle( $TABLA );
}else{
eEnd();
}
echo $Todo;
}
}
function sendFR(){
global $FR;
sendHeaders();
echo '<gsedit>';
echo $FR;
echo '</gsedit>';
eEnd();
}
function composeResult( $errorCode, $message, $filename ){
global $FR;
$FR.= "<result>
<code>{$errorCode}</code>
<message>{$message}</message>
<file>{$filename}</file>
</result>";
}
function sendHeaders(){
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
echo '<'.'?xml version="1.0" encoding="UTF-8"?'.'>';
}
function getAditionalFilesToSend( $fPath, &$afilestosend ){
list( $fPath ) = explode( '&', $fPath );
$len = mb_strlen( $fPath );
$ext = mb_substr( $fPath, -3 );
if( $ext!='edf' && $ext!='gdf' ) return array();
$af = file($fPath);
if( !count($af) ) return array();
foreach($af as $k=>$lin){
$lin = trim($lin);
if( $lin[0]!='[' && $lin[0]!='¿' ) continue;
if( $lin[0]=='¿' ) list( ,$lin ) = explode('?',$lin);
$l = trim($lin);
if( mb_substr($l,-7)=='-NoZone' ) $l = trim(mb_substr($l,0,-7));
if( mb_strtolower(mb_substr($l,0,5))=='[tab]' ){
list($l) = explode(REM,$l);
list(,$l) = explode(']',$l);
$f=explode('|',$l);
$a=array();
$a['name'] = trim( $f[2] );
if( $a['name'][0]=='-' ) $a['name'] = mb_substr($a['name'],1);
if( mb_strrchr( $a['name'],'.')==false ){
$a['name'] .= '.edf';
}
$a['lang'] = _TipoFile( $a['name'] );
$a['canBeSaved'] = ( (mb_substr(file_get_contents($name),0,4)!='Zend') ? 'true' : 'false' );
$a['canBeSavedLocally'] = 'false';
$afilestosend[] = $a;
}else if( mb_strtolower(mb_substr($l,0,9))=='[loadini]' ){
list($l) = explode(REM,$l);
list(,$l) = explode(']',$l);
$tmp = explode(',',$l);
for( $n=0; $n<count($tmp); $n++ ){
$a=array();
$a['name'] = trim($tmp[$n]);
if( mb_strrchr( $a['name'],'.')==false ){
$a['name'] .= '.edf';
}
$a['lang'] = _TipoFile( $a['name'] );
$a['canBeSaved'] = ( (mb_substr(file_get_contents($name),0,4)!='Zend') ? 'true' : 'false' );
$a['canBeSavedLocally'] = 'false';
$afilestosend[] = $a;
}
}
}
}
function LoadConfig(){
echo '<'.'?xml version="1.0" encoding="UTF-8"?'.'>';
echo '<gsEdit>';
$DimCSS['desktop0.css'] = 1;
$DimCSS['desktop1.css'] = 1;
$DimCSS['desktop2.css'] = 1;
$DimCSS['desktop3.css'] = 1;
$DimCSS['desktop4.css'] = 1;
$DimCSS['desktop5.css'] = 1;
$DimCSS['desktop6.css'] = 1;
$DimCSS['tab.css'] = 1;
$DimCSS['list.css'] = 1;
$DimCSS['list_print.css'] = 1;
$DimCSS['ficha.css'] = 1;
$DimCSS['lista.css'] = 1;
$DimCSS['lista_print.css'] = 1;
$DimCSS['splano.css'] = 1;
$DimCSS['auxiliar.css'] = 1;
$DimCSS['about.css'] = 1;
$DimCSS['calendario.css'] = 1;
$DimCSS['listados_def.css'] = 1;
$DimCSS['extraer.css'] = 1;
$DimCSS['login.css'] = 1;
$DimCSS['main.css'] = 1;
$DimCSS['mapa.css'] = 1;
$DimCSS['menu.css'] = 1;
$DimCSS['nan.css'] = 1;
$DimCSS['flotante.css'] = 1;
$DimCSS['visor.css'] = 1;
$DimCSS['xls.css'] = 1;
$DimCSS['pdf.css'] = 1;
$DimCSS['tree.css'] = 1;
$DimCSS['help_htm.css'] = 1;
$DimNewCss = array();
$df = opendir(SESS::$_PathCSS.'/');
while( $dir = readdir($df) ){
if( $dir != '.' && $dir != '..' && !is_dir($dir) && $DimCSS[$dir]!=1 && mb_substr($dir,-4)=='.css' ){
$DimNewCss[] = mb_substr($dir,0,-4);
}
}
closedir($df);
sort($DimNewCss);
echo '<css>';
for( $n=0; $n<count($DimNewCss); $n++ ) echo '<file>'.$DimNewCss[$n].'</file>';
echo '</css>';
echo '</gsEdit>';
}
function NomFile( $NomFile, &$Bak ){
global $_DirEDes, $_DirApli;
list( $NomFile ) = explode('&',$NomFile);
$NomFile = trim($NomFile);
if( mb_substr($NomFile,0,9)=='/ l i b /' ){
$Bak = '../../lib.bak/'.mb_substr($NomFile,9);
$NomFile = '../../lib/'.mb_substr($NomFile,9);
}else if( mb_substr($NomFile,0,2)==REM ){
$Bak = mb_substr($_DirApli,0,-1).'.file/_bak_/'.mb_substr($NomFile,2);
$NomFile = mb_substr($_DirApli,0,-1).'.file/'.mb_substr($NomFile,2);
}else if( $NomFile[0]=='/' ){
if( mb_substr($NomFile,0,2)=='/$' && SESS::$_D_=='~' ){
$Bak = $_DirEDes.'_bak_/'.mb_substr($NomFile,2);
$NomFile = $_DirEDes.mb_substr($NomFile,2);
}else{
$Bak = $_DirApli.'_bak_/'.mb_substr($NomFile,1);
$NomFile = $_DirApli.mb_substr($NomFile,1);
}
}else if( $NomFile[0]=='$' ){
$Bak = $_DirEDes.'m/_bak/'.mb_substr($NomFile,1);
$NomFile = $_DirEDes.mb_substr($NomFile,1);
}else{
$Bak = $_DirApli.'_bak_/d/'.$NomFile;
$NomFile = $_DirApli.'d/'.$NomFile;
}
return $NomFile;
}
function EnvioInfoDLL(){
global $FR, $_DirEDes;
composeResult( '1', 'El archivo solicitado sí existe.', '' );
$FR .= "\n".'<files>
<file>
<FileSize>'.filesize($_DirEDes.'t/dll/gsedit.dll').'</FileSize>
<FileVersion>2.0.0.0</FileVersion>
<FileTrademarks>'.trim(file_get_contents($_DirEDes.'t/dll/gsedit.info')).'</FileTrademarks>
<source>$t/dll/gsedit.dll</source>
<target>{dir}gsedit.dll</target>
</file>
<file>
<FileSize>'.filesize($_DirEDes.'t/dll/qwhale.common.dll').'</FileSize>
<FileVersion>1.62.4100.20297</FileVersion>
<source>$t/dll/qwhale.common.dll</source>
<target>{dir}qwhale.common.dll</target>
</file>
<file>
<FileSize>'.filesize($_DirEDes.'t/dll/qwhale.editor.dll').'</FileSize>
<FileVersion>1.62.4100.20299</FileVersion>
<source>$t/dll/qwhale.editor.dll</source>
<target>{dir}qwhale.editor.dll</target>
</file>
<file>
<FileSize>'.filesize($_DirEDes.'t/dll/qwhale.syntax.dll').'</FileSize>
<FileVersion>1.62.4100.20297</FileVersion>
<source>$t/dll/qwhale.syntax.dll</source>
<target>{dir}qwhale.syntax.dll</target>
</file>
<file>
<FileSize>'.filesize($_DirEDes.'t/dll/qwhale.syntax.parsers.dll').'</FileSize>
<FileVersion>1.62.4100.20298</FileVersion>
<source>$t/dll/qwhale.syntax.parsers.dll</source>
<target>{dir}qwhale.syntax.parsers.dll</target>
</file>';
$di = opendir( $_DirEDes.'t/dll/' );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") && mb_substr($file,-4)=='.xml' ){
if( $file[0]=='_' ) continue;
$FR .= "\n".'<file>
<FileSize>'.filesize($_DirEDes.'t/dll/'.$file).'</FileSize>
<FileVersion></FileVersion>
<source>$t/dll/'.$file.'</source>
<target>{dir}'.$file.'</target>
</file>';
}
}
$di = opendir( $_DirEDes.'t/manual/' );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") && mb_substr($file,-4)=='.chm' ){
$FR .= "\n".'<file>
<FileSize>'.filesize($_DirEDes.'t/manual/'.$file).'</FileSize>
<FileVersion></FileVersion>
<source>$t/manual/'.$file.'</source>
<target>{dirbase}\edes.v3\t\manual\\'.$file.'</target>
</file>';
}
}
$FR .= "\n".'<file>
<FileSize>'.filesize($_DirEDes.'t/edes.key').'</FileSize>
<FileVersion></FileVersion>
<source>$t/edes.key</source>
<target>{dirbase}\edes.v3\t\edes.key</target>
</file>';
$FR .= "\n".'</files>';
sendFR();
eEnd();
}
function FormateaTexto2( $txt ){
$EsFields = false;
$Formato = array();
$NumLinea = array();
$Dim = explode("\n",$txt);
for( $n=0; $n<count($Dim); $n++ ){
if( $Dim[$n][0] == '[' ){
if( mb_strtoupper(mb_substr($Dim[$n],0,8)) == '[FIELDS]' ){
if( $EsFields ){
ReajustaFields2( $Dim, $Formato, $NumLinea );
$Formato = array();
$NumLinea = array();
}
$EsFields = true;
}else{
if( $EsFields ){
ReajustaFields2( $Dim, $Formato, $NumLinea );
$Formato = array();
$NumLinea = array();
}
$EsFields = false;
}
}else if( $EsFields ){
if( eSubstrCount( $Dim[$n], '|' ) == 9 ){
$Formato[] = explode('|',$Dim[$n]);
$NumLinea[] = $n;
}else{
$Formato[] = $Dim[$n];
$NumLinea[] = $n;
}
}
}
if( $EsFields ) ReajustaFields2( $Dim, $Formato, $NumLinea );
$txt = '';
for( $n=count($Dim)-1; $n>0; $n-- ){
if( trim($Dim[$n]) != '' ){
break;
}else{
unset($Dim[$n]);
}
}
for( $n=0; $n<count($Dim); $n++ ){
$txt .= rtrim($Dim[$n])."\n";
}
return $txt;
}
function ReajustaFields2( &$Dim, $Formato, $NumLinea ){
$Ancho = array_pad( $Ancho, count($Formato), 0 );
for( $n=0; $n<count($Formato); $n++ ){
if( count($Formato[$n]) == 10 ){
for( $i=0; $i<count($Formato[$n]); $i++ ){
$Formato[$n][$i] = trim($Formato[$n][$i]);
if( $i==0 ){
switch( $Formato[$n][0][0] ){
case ',':
case '<':
if( mb_substr($Formato[$n][0],1,1)==' ' ) $Formato[$n][0] = $Formato[$n][0][0].trim(mb_substr($Formato[$n][0],1));
if( mb_substr($Formato[$n][0],1,1)==']' ){
if( mb_substr($Formato[$n][0],2,1) == ' ' ) $Formato[$n][0] = mb_substr($Formato[$n][0],0,2).' '.trim(mb_substr($Formato[$n][0],2));
$Formato[$n][0] = '  '.$Formato[$n][0][0].trim(mb_substr($Formato[$n][0],1));
}else{
$Formato[$n][0] = '   '.$Formato[$n][0][0].trim(mb_substr($Formato[$n][0],1));
}
break;
case ']':
case '-':
case '=':
$Formato[$n][0] = '   '.$Formato[$n][0][0].trim(mb_substr($Formato[$n][0],1));
break;
case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
$Formato[$n][0] = '  '.$Formato[$n][0][0].' '.trim(mb_substr($Formato[$n][0],1));
break;
case '#':
case '¿': case '?':
case '{': case '}':
break;
case '+':
$Formato[$n][0] = $Formato[$n][0][0].trim(mb_substr($Formato[$n][0],1));
if( mb_substr($Formato[$n][0],2,1) == ' ' ) $Formato[$n][0] = mb_substr($Formato[$n][0],0,2).' '.trim(mb_substr($Formato[$n][0],2));
$Formato[$n][0] = ' '.$Formato[$n][0];
break;
case '.':
break;
default:
$Formato[$n][0] = '    '.$Formato[$n][0];
}
}
if( $i == 5 ){
if( $Formato[$n][$i][0]==',' ){
$Ancho[$i] = max( $Ancho[$i], mb_strlen($Formato[$n][$i])-1 );
}else{
$Ancho[$i] = max( $Ancho[$i], mb_strlen($Formato[$n][$i]) );
}
}else{
$Ancho[$i] = max( $Ancho[$i], mb_strlen($Formato[$n][$i]) );
}
}
}else{
$Formato[$n] = trim($Formato[$n]);
if( $Formato[$n]=='-' ) $Formato[$n] = '   -';
}
}
$MaxComas = 0;
for( $n=0; $n<count($Formato); $n++ ){
if( eSubstrCount( $Formato[$n][4], ',' ) > $MaxComas ) $MaxComas = eSubstrCount( $Formato[$n][4], ',' );
}
if( $MaxComas > 0 ){
$sFormato = array();
$sAncho = array();
for( $c=0; $c<$MaxComas; $c++ ) $sAncho[$c] = 0;
for( $n=0; $n<count($Formato); $n++ ){
for( $c=0; $c<$MaxComas; $c++ ) $sFormato[$n][$c] = 0;
if( eSubstrCount( $Formato[$n][4], ',' ) > 0 ){
$Formato[$n][4] = str_replace(' ','',$Formato[$n][4]);
$tmp = explode(',',$Formato[$n][4]);
for( $c=0; $c<count($tmp); $c++ ) if( mb_strlen(trim($tmp[$c])) > $sAncho[$c] ) $sAncho[$c] = mb_strlen(trim($tmp[$c]));
}else{
if( mb_strlen(trim($Formato[$n][4])) > $sAncho[0] ) $sAncho[0] = mb_strlen(trim($Formato[$n][4]));
}
}
}
for( $n=0; $n<count($Formato); $n++ ){
if( count($Formato[$n]) == 10 ){
$txt = '';
for( $i=0; $i<count($Formato[$n]); $i++ ){
if( $Ancho[$i] > 0 ){
if( $i == 5 ){
if( $Formato[$n][$i][0]==',' ){
$txt .= str_pad( $Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}else{
$txt .= str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}
}else if( $i == 44 ){
$txt .= str_pad( $Formato[$n][$i],$Ancho[$i]+2,' ',STR_PAD_BOTH);
}else if( $i == 4 ){
switch( $MaxComas ){
case 0:
$stxt = str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ', STR_PAD_LEFT );
break;
case 1:
$tmp = explode(',',$Formato[$n][$i]);
$stxt = ' '.str_pad( $tmp[0],$sAncho[0],' ', STR_PAD_LEFT ).','.
str_pad( $tmp[1],$sAncho[1],'#', STR_PAD_LEFT ).
' ';
$stxt = str_replace( ','.str_repeat('#',$sAncho[1]), str_repeat(' ',$sAncho[1]+1), $stxt );
$stxt = str_replace('#',' ',$stxt);
break;
case 2:
$tmp = explode(',',$Formato[$n][$i]);
$stxt = ' '.str_pad( $tmp[0],$sAncho[0],' ', STR_PAD_LEFT).','.
str_pad( $tmp[1],$sAncho[1],'#', STR_PAD_LEFT).','.
str_pad( $tmp[2],$sAncho[2],'@', STR_PAD_LEFT).
' ';
$stxt = str_replace( ','.str_repeat('@',$sAncho[2]),' '.str_repeat(' ',$sAncho[2]), $stxt );
$stxt = str_replace( ','.str_repeat('#',$sAncho[1]),' '.str_repeat(' ',$sAncho[1]), $stxt );
$stxt = str_replace('#',' ',$stxt);
$stxt = str_replace('@',' ',$stxt);
break;
default:
$stxt = str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}
$txt .= $stxt;
}else if( $i > 0 ){
$txt .= str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}else{
$txt .= str_pad( $Formato[$n][$i].' ',$Ancho[$i]+1,' ');
}
}
$txt .= ($i<9) ? '|':'';
}
$Dim[$NumLinea[$n]] = $txt;
}else{
$Dim[$NumLinea[$n]] = $Formato[$n];
}
}
}
function BuscaTxt( $Buscar ){
global $_ExternalApps;
$WDirBase = str_replace('\\','/',getCWD());
$WDirBase = explode('/',$WDirBase);
$WDirBase = $WDirBase[count($WDirBase)-2];
$EditExe = $_ExternalApps[0][1];
$EditExe = str_replace( '\\', '/', $EditExe );
$EditExe = str_replace( '//', '/', $EditExe );
chdir('..');
if( mb_substr($Buscar,0,2) == '{/' && eSubstrCount($Buscar,'/}') == 1 ){
$tmp = explode('/}',$Buscar);
$nDir = mb_substr($tmp[0],2);
if( $nDir=='' ){
$Buscar = $tmp[1];
if( LINUX_OS ) $DirBase = '/';
else $NomDir = $WDirBase;
}else if( is_dir($nDir) ){
$Buscar = $tmp[1];
if( LINUX_OS ){
chdir( $nDir );
$nDir .= '/';
$DirBase = '/'.$nDir;
}else{
$NomDir = $WDirBase.'/'.$nDir;
$nDir = '/'.$nDir.'/';
}
}else{
if( LINUX_OS ){
$nDir = 'd/';
chdir('d');
$DirBase = '';
}else{
$NomDir = $WDirBase.'/d';
}
}
}else{
if( LINUX_OS ){
$nDir = 'd/';
chdir('d');
$DirBase = '';
}else{
$NomDir = $WDirBase.'/d';
$DirBase = '';
$nDir = 'd/';
}
}
?>
<!DOCTYPE HTML>
<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>RESULTADO DE LA BÚSQUEDA</TITLE>
<style>
TABLE {
FONT-FAMILY: Monospace;
background: #CCCCCC;
}
TH {
FONT-FAMILY: ARIAL;
FONT-SIZE: 12;
color: #000099;
background: #d5dce0;
border-bottom:1 solid #85A5B3;
}
TD {
color: #000099;
background: #F5F5F5;
WHITE-SPACE: nowrap;
FONT-SIZE: 12;
}
</style>
<SCRIPT type="text/javascript">
function VerFile(){
var Obj = event.srcElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName == 'I' ) Obj = Obj.parentElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex > 0 ) return;
if( Obj.parentElement.cells.length != 3 ) return
if( Obj.rowSpan == 1 ){
var num = Obj.parentElement.cells[1].innerText+',';
}else{
var f = Obj.parentElement.rowIndex;
var t = Obj.parentElement.parentElement.parentElement;
var num = t.rows[f].cells[1].innerText+',';
for( var n=f+1; n<f+Obj.rowSpan; n++ ){
num = num + t.rows[n].cells[0].innerText+',';
}
}
var NomFile = Obj.innerText.replace('<B>','').replace('</B>','').replace(/ /g,'');
Obj.innerHTML = '<B style="color:red">'+NomFile+'</B>';
var NomWin = 'view_'+NomFile.replace(/\s+$/g, '').replace(/\//g,'_').replace(/\./g,'_');
NomWin = 'ut';
window.external.EditaScript('<?= $nDir; ?>'+NomFile);
}
function EditFile(){
var Obj = event.srcElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName == 'I' ) Obj = Obj.parentElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex > 0 ) return;
if( Obj.parentElement.cells.length != 3 ) return;
var NomFile = Obj.innerText.replace('<B>','').replace('</B>','').replace('<I>','').replace('</I>','').replace(/ /g,'');
Obj.innerHTML = '<I><B style="color:red">'+NomFile+'</B></I>';
NomFile = document.getElementById('OBJETO').DIRF+NomFile;
try{
if( (event.ctrlKey || event.altKey) && event.shiftLeft ){
window.external.EditaScript('<?= $nDir; ?>'+NomFile);
}else{
if( event.ctrlKey || event.altKey ){
}else{
window.external.EditaScript('<?= $nDir; ?>'+NomFile);
}
}
}catch(e){}
}
function ScrollTH( obj ){
obj.rows[0].style.top = document.body.scrollTop;
if( obj.rows[0].style.top*1 != document.body.scrollTop ) obj.rows[0].style.top = document.body.scrollTop;
if( document.body.scrollTop != 0 ) obj.rows[0].style.top = parseInt(obj.rows[0].style.top) - 1;
}
function eClearEvent(){
try{
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
}catch(e){}
return false;
}
function PonScroll(){
document.body.scroll = ( ( document.body.scrollHeight > document.body.clientHeight || document.body.scrollWidth != document.body.clientWidth ) ? 'yes':'no' );
}
document.onselectstart = new Function("return false");
document.onkeydown = eClearEvent;
window.focus();
function gsHELP( help ){
eClearEvent();
return false;
}
</SCRIPT>
</HEAD>
<BODY style='margin:0px' onload='PonScroll()' onscroll="ScrollTH(OBJETO)" scroll=no onhelp='gsHELP("Seek_gsEdit")' oncontextmenu='return false'>
<img onclick='window.print()' src='edes.php?R:$t/g/s/print.gif' style='cursor:hand;z-index:9;position:absolute;left:expression(screen.width-45+document.body.scrollLeft);top:expression(document.body.scrollTop+0)' title='Imprimir'>
<table id=OBJETO DIRF="<?= $DirBase; ?>" border=0 cellspacing=1 cellpadding=1 <?= ( ( eSubstrCount('~AMP',$GLOBALS['_TipoUsu'])==1 ) ? 'oncontextmenu="EditFile()"':''); ?> onclick="VerFile()">
<col style="cursor:hand;width:1"><col style="cursor:default" align=right><col style="cursor:default;width:100%">
<TR style="position:relative; top:OBJETO.scrollTop"><TH>FICHERO<TH>LINEA<TH>CONTENIDO
<?PHP
if( $Buscar[0]=='|' ){
$Buscar = mb_substr( $Buscar, 1 );
$EsUnCampo = true;
}else{
$EsUnCampo = false;
}
$Buscar = str_replace( '?','\?',$Buscar);
$Buscar = str_replace( '+','\+',$Buscar);
$Buscar = str_replace( '{','\{',$Buscar);
$Buscar = str_replace( '|','\|',$Buscar);
$Buscar = str_replace( '[','\[',$Buscar);
$Buscar = str_replace( ']','\]',$Buscar);
$Buscar = str_replace( '/','\\/',$Buscar);
if( WINDOW_OS ){
chdir('../edes.v3/win/');
exec( "grep -r -i -n '{$Buscar}' ../../{$NomDir}/", $Dim, $error );
}else{
exec( "grep -r -i -n '{$Buscar}' *", $Dim, $error );
}
sort( $Dim );
$TDim = count($Dim);
$Long = mb_strlen($TDim.'');
$Long = 5;
$Ceros = str_repeat('0',$Long);
$Mem = array();
for( $n=0; $n<$TDim; $n++ ){
$tmp = explode(':',$Dim[$n]);
$tmp[0] = trim($tmp[0]);
if( WINDOW_OS ) $tmp[0] = str_replace("../../{$NomDir}/",'',$tmp[0]);
if( $tmp[0]!='donde' ){
$SubDir = explode('/',$tmp[0]);
if( $SubDir[0] != '_bak_' && $SubDir[0] != '_tmp' ){
if( $EsUnCampo && eSubstrCount( $tmp[2], '|' ) != 9 ){
$Dim[$n] = '';
continue;
}
$Dim[$n] = $tmp[0].':'.mb_substr(($Ceros.$tmp[1]),-$Long).':'.$tmp[2];
for( $i=3; $i<count($tmp); $i++ ) $Dim[$n] .= ':'.$tmp[$i];
$Ext = mb_substr( $tmp[0], mb_strrpos($tmp[0],'.')+1);
if( $Ext != 'bak' && $Ext != 'old' && $Ext != 'zip' && $Ext != 'log' ){
if( $Mem[$tmp[0]] == '' ){
$Mem[$tmp[0]] = 1;
}else{
$Mem[$tmp[0]]++;
}
}
}
}
}
sort( $Dim );
$nVeces = 0;
for( $n=0; $n<count($Dim); $n++ ){
if( $Dim[$n]=='' ) continue;
$tmp = explode(':',$Dim[$n]);
$tmp[0] = trim($tmp[0]);
if( $tmp[0]!='donde' ){
$SubDir = explode('/',$tmp[0]);
if( $SubDir[0] != '_bak_' && $SubDir[0] != '_tmp' ){
$Ext = mb_substr( $tmp[0], mb_strrpos($tmp[0],'.')+1);
if( $Ext != 'bak' && $Ext != 'old' ){
$nVeces++;
$Ori = str_replace('<','&lt;',$tmp[2]);
$Ori = str_replace('>','&gt;',$Ori);
$tmp[1] = $tmp[1]*1;
if( $Mem[$tmp[0]] == '' ){
echo '<tr><td>'.$tmp[1].'<td>'.$Ori;
}else if( $Mem[$tmp[0]] == 1 ){
echo '<tr><td>'.$tmp[0].'<td>'.$tmp[1].'<td>'.$Ori;
}else{
echo '<tr><td rowspan='.$Mem[$tmp[0]].'>'.$tmp[0].'<td>'.$tmp[1].'<td>'.$Ori;
$Mem[$tmp[0]] = '';
}
}
}
}
}
if( $nVeces == 0 ) echo '<tr><td colspan=3 align=center style="color:#CC0000;width:expression(screen.width)">Cadena no encontrada';
echo '</table></BODY></HTML>';
}
function BuscaFile( $Buscar ){
global $_ExternalApps;
$EditExe = $_ExternalApps[0][1];
$EditExe = str_replace( '\\', '/', $EditExe );
$EditExe = str_replace( '//', '/', $EditExe );
$DirActual = GetCWD();
chdir('..');
?>
<!DOCTYPE HTML>
<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>RESULTADO DE LA BÚSQUEDA</TITLE>
<style>
TABLE {
FONT-FAMILY: Monospace;
background: #CCCCCC;
}
TH {
FONT-FAMILY: ARIAL;
FONT-SIZE: 12;
color: #000099;
background: #d5dce0;
border-bottom:1 solid #85A5B3;
}
TD {
color: #000099;
background: #F5F5F5;
WHITE-SPACE: nowrap;
FONT-SIZE: 12;
}
</style>
<SCRIPT type="text/javascript">
function VerFile(){
var Obj = event.srcElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName == 'I' ) Obj = Obj.parentElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex > 0 ) return;
if( Obj.rowSpan == 1 ){
var num = Obj.parentElement.cells[0].innerText+',';
}else{
var f = Obj.parentElement.rowIndex;
var t = Obj.parentElement.parentElement.parentElement;
var num = t.rows[f].cells[1].innerText+',';
for( var n=f+1; n<f+Obj.rowSpan; n++ ){
num = num + t.rows[n].cells[0].innerText+',';
}
}
var NomFile = Obj.innerText.replace('<B>','').replace('</B>','').replace(/ /g,'');
Obj.innerHTML = '<B>'+NomFile+'</B>';
var NomWin = 'view_'+NomFile.replace(/\s+$/g, '').replace(/\//g,'_').replace(/\./g,'_');
NomWin = 'ut';
window.external.EditaScript('<?= $nDir; ?>'+NomFile);
}
function EditFile(){
var Obj = event.srcElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName == 'I' ) Obj = Obj.parentElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex > 0 ) return;
var NomFile = Obj.innerText.replace('<B>','').replace('</B>','').replace('<I>','').replace('</I>','').replace(/ /g,'');
Obj.innerHTML = '<I><B>'+NomFile+'</B></I>';
NomFile = document.getElementById('OBJETO').DIRF+NomFile;
try{
if( (event.ctrlKey || event.altKey) && event.shiftLeft ){
window.opener.FSOLeer( '<?=$EditExe?>', NomFile );
}else{
if( event.ctrlKey || event.altKey ){
}else{
window.external._JSDesktop( 'gsEditor("/'+NomFile+'")' );
}
}
}catch(e){}
}
function ScrollTH( obj ){
obj.rows[0].style.top = document.body.scrollTop;
if( obj.rows[0].style.top*1 != document.body.scrollTop ) obj.rows[0].style.top = document.body.scrollTop;
if( document.body.scrollTop != 0 ) obj.rows[0].style.top = parseInt(obj.rows[0].style.top) - 1;
}
function eClearEvent(){
try{
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
}catch(e){}
return false;
}
function PonScroll(){
document.body.scroll = ( ( document.body.scrollHeight > document.body.clientHeight || document.body.scrollWidth != document.body.clientWidth ) ? 'yes':'no' );
}
document.onselectstart = new Function("return false");
document.onkeydown = eClearEvent;
window.focus();
function gsHELP( help ){
eClearEvent();
return false;
}
</SCRIPT>
</HEAD>
<BODY style='margin:0px' onload='PonScroll()' onscroll="ScrollTH(OBJETO)" scroll=no onhelp='gsHELP("Seek_gsEdit")' oncontextmenu='return false'>
<img onclick='window.print()' src='edes.php?R:$t/g/s/print.gif' style='cursor:hand; z-index:9; position:absolute; left:expression(screen.width-45+document.body.scrollLeft); top:expression(document.body.scrollTop+0)' title='Imprimir'>
<table id=OBJETO DIRF="<?= $DirBase; ?>" width=100% border=0 cellspacing=1 cellpadding=1 <?= ( ( eSubstrCount('~AM',$GLOBALS['_TipoUsu'])==1 ) ? 'oncontextmenu="EditFile()"':''); ?> onclick="VerFile()">
<col style="cursor:hand;width:100%">
<TR style="position:relative; top:OBJETO.scrollTop"><TH>LISTA DE FICHEROS
<?PHP
$Buscar = str_replace( '?','\?',$Buscar);
$Buscar = str_replace( '+','\+',$Buscar);
$Buscar = str_replace( '{','\{',$Buscar);
$Buscar = str_replace( '|','\|',$Buscar);
$Buscar = str_replace( '[','\[',$Buscar);
$Buscar = str_replace( ']','\]',$Buscar);
$Buscar = str_replace( '/','\\/',$Buscar);
$DimSalida = array();
$Dim = array();
if( WINDOW_OS ){
$NomDir = str_replace('\\','/',getCWD());
$NomDir = explode('/',$NomDir);
$NomDir = $NomDir[count($NomDir)-1];
chdir('../edes.v3/win/');
$resultado = exec('find ../../'.$NomDir.' -name '.$Buscar.' -print', $DimSalida);
}else{
$resultado = exec('find . -name '.$Buscar.' -print', $DimSalida);
}
for( $n=0; $n<count($DimSalida); $n++ ){
if( eSubstrCount($DimSalida[$n],'/_bak_/') == 0 ){
if( WINDOW_OS ){
$Dim[] = str_replace('../../'.$NomDir.'/','/',$DimSalida[$n]);
}else{
$Dim[] = str_replace('./','/',$DimSalida[$n]);
}
}
}
chdir($DirActual);
chdir('..');
sort($Dim);
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = mb_substr($Dim[$n],1);
if( !is_dir($Dim[$n]) ){
if( mb_substr($Dim[$n],0,3)=='/d/' ) $Dim[$n] = mb_substr( $Dim[$n], 3 );
echo '<tr><td>'.$Dim[$n];
}
}
if( count($Dim)==0 ) echo '<tr><td align=center style="color:#CC0000;width:expression(screen.width)">Fichero no encontrado';
echo '</table></BODY></HTML>';
}
function CrearSubList( $SUBLIST ){
global $_DirEDes, $_Sql, $_SqlPDOType;
list( $TablaPadre, $TABLA, $sScript ) = explode( ',', $_GET['SC'] );
include( "{$_DirEDes}t/credf.inc" );
if( $_Sql=='mysql' ){
$Todo = CreaFCHMySql( $TablaPadre );
}else if( $_Sql=='mysqli' ){
$Todo = CreaFCHMySqli( $TablaPadre );
}else if( $_Sql=='informix' || ($_Sql=='pdo' && $_SqlPDOType=='informix') ){
$Todo = CreaFCHInformix( $TablaPadre );
}else if( $_Sql=='oracle' ){
$Todo = CreaFCHOracle( $TablaPadre );
}else{
eEnd();
}
ob_end_clean(); ob_start();
$sTodo = $Todo;
list(,$pDBIndex) = explode('[DBIndex]',$Todo); list($pDBIndex) = explode("\n",$pDBIndex); $pDBIndex = trim($pDBIndex);
if( $_Sql=='mysql' ){
$Todo = CreaFCHMySql( $TABLA );
}else if( $_Sql=='mysqli' ){
$Todo = CreaFCHMySqli( $TABLA );
}else if( $_Sql=='informix' || ($_Sql=='pdo' && $_SqlPDOType=='informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( $_Sql=='oracle' ){
$Todo = CreaFCHOracle( $TABLA );
}else{
eEnd();
}
ob_end_clean(); ob_start();
$sTodo = $Todo;
list(,$DBIndex) = explode('[DBIndex]',$Todo); list($DBIndex) = explode("\n",$DBIndex); $DBIndex = trim($DBIndex);
list(,$DBOrder) = explode('[DBOrder]',$Todo); list($DBOrder) = explode("\n",$DBOrder); $DBOrder = trim($DBOrder);
list(,$DBSerial) = explode('[DBSerial]',$Todo); list($DBSerial) = explode("\n",$DBSerial); $DBSerial = trim($DBSerial);
list($Todo,$sNotas) = explode('[Note]',$Todo);
list(,$Todo) = explode('[Fields]',$Todo);
$Todo = trim($Todo);
$Dim = explode("\n",$Todo);
$LonObj = mb_strlen("[__{$TABLA}]");
$sTodo = rtrim( file_get_contents( eScript($sScript) ) );
list($sTodo,$sNotas) = explode('[Note]',$sTodo);
echo rtrim($sTodo)."\n";
echo "#(a,mR,bR,cR)¿"."\n";
echo "   - | SUBFICHA \"__{$TABLA}\"\n";
$Dim[0] = '    '.$Dim[0];
$Field = array();
for( $n=0; $n<count($Dim); $n++ ){
$Fila = explode('|',rtrim($Dim[$n]));
$Field[] = $Fila;
if( trim($Fila[1])==$DBIndex ) continue;
if( trim($Fila[1])==$pDBIndex ) continue;
for( $c=0; $c<count($Fila); $c++ ){
if( $c==1 ){
$l = mb_strlen($Fila[$c])+1;
if( $LonObj > $l ) $l = $LonObj;
if( mb_substr(trim($Fila[3]),0,1)=='S' ){
echo ' '.str_pad( '_'.trim($Fila[$c]).':'.trim($Fila[1]).' ', $l );
}else{
echo ' '.str_pad( '_'.trim($Fila[$c]), $l );
}
}else{
if( $c==6 ) $Fila[$c] = str_replace('A','M',$Fila[$c]);
echo $Fila[$c];
}
if( $c<9 ) echo '|';
}
echo "\n";
}
echo "   - | LISTADO \"{$TABLA}\"\n";
$l = mb_strlen($Fila[0]);
$Fila = explode('|',rtrim($Dim[0]));
for( $c=0; $c<count($Fila); $c++ ){
$l = mb_strlen($Fila[$c]);
if( $c==1 ){
$l++;
echo ' '.str_pad( "[__{$TABLA}]", $l );
}else if( $c==2 ){
echo str_pad( ' o', $l );
}else if( $c==2 ){
echo str_pad( ' M', $l );
}else if( $c==3 || $c==4 || $c==6 || $c==8 ){
echo str_pad( ' ', $l );
}else{
echo str_pad( ' ', $l-1 );
}
if( $c<9 ) echo '|';
}
$Ancho = 7;
for( $c=0; $c<count($Field); $c++ ){
if( $Ancho < mb_strlen(trim($Field[$c][1])) ) $Ancho = mb_strlen(trim($Field[$c][1]));
}
echo "\n?\n";
echo "\n\n";
echo "[SubList] a,mR,bR,cR | __{$TABLA}\n";
echo str_pad("{slGL} Sql",$Ancho+3,' ',STR_PAD_RIGHT);
echo " | Align | ColsWidth | TypeData | Format | ColsOp | ".str_pad('Fields',mb_strlen($Field[0][1])-1)." | TH\n";
echo str_pad("   ''",20-11)."  |   L   |   48\\25   |          |        |        | ".str_pad('IMG',mb_strlen($Field[0][1])-1)." | [i]\\\n";
for( $c=0; $c<count($Field); $c++ ){
if( trim($Field[$c][1])==$pDBIndex ) continue;
if( trim($Field[$c][1])=='Field' ) continue;
if( trim($Field[$c][1])==$DBIndex ){
echo '  .';
echo str_pad(trim($Field[$c][1]),$Ancho,' ',STR_PAD_RIGHT).' | ';
}else{
echo '   ';
echo str_pad(trim($Field[$c][1]),$Ancho,' ',STR_PAD_RIGHT).' | ';
}
if( eSubstrCount($Field[$c][4],',') == 1 ){
echo str_pad('D',6,' ',STR_PAD_BOTH);
}else{
echo str_pad('I',6,' ',STR_PAD_BOTH);
}
echo '|           |';
echo str_pad($Field[$c][2],10,' ',STR_PAD_BOTH);
echo '|        |';
echo '        | ';
echo str_pad('_'.trim($Field[$c][1]),mb_strlen($Field[$c][1]));
echo '| '; if( trim($Field[$c][1])!=$DBIndex ) echo mb_strtoupper(trim($Field[$c][0]));
echo "\n";
}
echo "{slSql} select # from {$TABLA} where {$pDBIndex}='{{$pDBIndex}}' order by {$DBOrder}";
if( $DBSerial!='' ) echo ' | '.$DBSerial;
echo "\n";
echo "{slMenu}  a,mR | Borrar:d, Consultar:v, Insertar:i, Modificar:u | # || FormOnLine | [d][v][u]";
echo "{slMenu} cR,bR |           Consultar:v                          | # || FormOnLine |\n";
echo "{slIcon}  a,mR | [d][v][u]\n";
echo "{slIcon} cR,bR | [v]\n";
echo "{slWin} ,6\n";
if( trim($sNotas)!='' )	echo "\n\n[Note]".$sNotas;
$Todo = ob_get_contents();
ob_end_clean(); ob_start();
echo $Todo;
}
function CrearSDF( $Datos ){
global $_DirEDes, $_Sql;
list( $tabla, $sdf, $edf, $origen_1,$destino_1, $origen_2,$destino_2, $origen_3,$destino_3, $origen_4,$destino_4, $origen_5,$destino_5 ) = explode( ',', $Datos );
$_POST['tabla'] = $tabla;
$_POST['sdf'] = $sdf;
$_POST['edf'] = $edf;
$_POST['origen_1'] = $origen_1;
$_POST['destino_1'] = $destino_1;
$_POST['origen_2'] = $origen_2;
$_POST['destino_2'] = $destino_2;
$_POST['origen_3'] = $origen_3;
$_POST['destino_3'] = $destino_3;
$_POST['origen_4'] = $origen_4;
$_POST['destino_4'] = $destino_4;
$_POST['origen_5'] = $origen_5;
$_POST['destino_5'] = $destino_5;
include( "{$_DirEDes}t/sdf.gs" );
}
function CrearDirectorios($BakFile){
global $_DirBase;
$tmp = explode('/', $BakFile);
$sDir = '';
for($n=0; $n<count($tmp)-1; $n++){
$sDir .= $tmp[$n].'/';
if( mb_substr($tmp[$n],-1)==':' ) continue;
if( $tmp[$n]=='' ) continue;
if( eSubstrCount($sDir,$_DirBase)==0 || $sDir==$_DirBase ) continue;
if( !is_dir($sDir) ) mkdir($sDir, 0777);
if( !is_writeable($sDir) ){
if( !chmod($sDir, 0777) ){
echo "0|Error creando directorio de bak: [{$sDir}] de [{$BakFile}]|";
eEnd();
}
}
}
}
$_eLogIniFile = '';
$_eLogIniWidth = 0;
$_eLogMicroTime = 0;
$_eLogIMicroTime = 0;
function gsUpdateFile( $File ){
global $_DirEDes, $_Sql;
if( !function_exists('qQuery') ){
eval(qSetup());
include_once( $_DirEDes.$_Sql.'.inc' );
}
$Cdi = date('Y-m-d H:i:s');
if( $File[0]=='$' ){
sql_Query( "insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values (".S::$_User.", '{$Cdi}', '{$File}', '{$_ENV['ON']}' , '".SESS::$_UserEMail."')");
}else{
sql_Query( "insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values (".S::$_User.", '{$Cdi}', '{$File}', '{$_ENV['OFF']}', '".SESS::$_UserEMail."')");
}
echo '<span style="color:red;font-size:25px;text-decoration:underline">Actualización "'.$File.'" generada</span>';
eEnd();
}
function gsUpdateScript( $Time, $File, $Op, $NewText, $De, $Desde='', $Hasta='', $Test=true ){
if( $Test ){
$NewText = '<span style="color:red">'.$NewText.'</span>';
eTrace( 'Fichero: '.$File );
}
$xFile = trim(file_get_contents( $File ));
switch( $Op ){
case 'S':
$xFile = $NewText . $xFile;
break;
case 'B':
if( eSubstrCount( mb_strtoupper($xFile), mb_strtoupper($De) ) > 0 ){
$i = mb_strpos( mb_strtoupper($xFile), mb_strtoupper($De) );
$xFile = mb_substr( $xFile, 0, $i ) . $NewText . mb_substr( $xFile, $i );
}
break;
case 'I':
if( eSubstrCount( mb_strtoupper($xFile), mb_strtoupper($De) ) > 0 ){
$i = mb_strpos( mb_strtoupper($xFile), mb_strtoupper($De) );
if( $Desde!='' ){
$i = mb_strpos( mb_strtoupper($xFile), mb_strtoupper($Desde), $i ) + mb_strlen($Desde);
}
if( $Hasta!='' ){
$f = mb_strpos( mb_strtoupper($xFile), mb_strtoupper($Hasta), $i );
}
$xFile = mb_substr( $xFile, 0, $i ) . $NewText . mb_substr( $xFile, $f );
}
break;
case 'A':
if( eSubstrCount( mb_strtoupper($xFile), mb_strtoupper($De) ) > 0 ){
$i = mb_strpos( mb_strtoupper($xFile), mb_strtoupper($De) ) + mb_strlen($De);
$xFile = mb_substr( $xFile, 0, $i ) . $NewText . mb_substr( $xFile, $i );
}
break;
case 'E':
$xFile = $xFile."\n".$NewText;
break;
}
if( $Test ){
echo '<pre>['.$xFile.']</pre>';
}else{
file_put_contents( $File, $xFile );
}
if( !$Test ){
global $_UFT8, $_DirEDes, $_Sql;
$NomFile = '../_tmp/edes_'.$_GET['SC'].'.'.$_GET['US'];
$xActualizar = trim(file_get_contents( $NomFile ));
$i = mb_strpos( $xActualizar, 'gsUpdateScript' );
$i = mb_strpos( $xActualizar, '#', $i );
$Time = date('Y-m-d H:i:s');
$xActualizar = mb_substr( $xActualizar, 0, $i ) .$Time. mb_substr( $xActualizar, $i+1 );
$tmp = explode( "\n", $xActualizar );
$xActualizar = '';
$TodoOk = false;
for( $n=0; $n<count($tmp); $n++ ){
$x = trim($tmp[$n]);
if( $n==0 && mb_substr($x,0,2)=='<'.'?' ) continue;
if( $n==count($tmp)-1 && mb_substr($x,0,2)=='?'.'>' ) continue;
if( $x=='<<<EOD' ) $TodoOk = true;
if( $x=='EOD' ) $TodoOk = false;
if( $TodoOk ){
$xActualizar .= $tmp[$n]."\n";
}else if(		  $x=='' ){
}else if( mb_substr($x,0,2)=='//' ){
}else if( mb_substr($x,0,2)=='/'.'*' ){
for( $i=$n+1; $i<count($tmp); $i++ ){
$x = trim($tmp[$i]);
if( mb_substr($x,0,2)=='*'.'/' ){
$n = $i;
break;
}
}
}else{
$xActualizar .= $tmp[$n]."\n";
}
}
if( !function_exists('qQuery') ){
eval(qSetup());
include_once( $_DirEDes.$_Sql.'.inc' );
}
if( file_exists('../_datos/config/update.log') ){
$Update = trim(file_get_contents('../_datos/config/update.log'));
$Update = mb_substr( $Update, 5 );
$Update = trim(mb_substr( $Update, 0, -2 ));
$Update .= "\n\n";
}
$Update = '<'.'?PHP'."\n\n".$Update.$xActualizar."\n?".'>';
file_put_contents( '../_datos/config/update.log', $Update );
$Cdi = date('Y-m-d H:i:s');
sql_Query( "insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values (".S::$_User.", '{$Cdi}', '/_datos/config/update.log', NULL, '".SESS::$_UserEMail."')");
file_put_contents( '../_datos/config/update.cdi', $Time );
clearstatcache();
echo '<span style="color:red;font-size:25;text-decoration:underline">Actualización generada</span><BR><BR>';
highlight_string( $xActualizar );
eEnd();
}
}
$_eLogEMicroTime = 0;
function QueDesarrollador($Script){
list($Buscar) = explode('&', $Script);
$Buscar = str_replace('edes.php?','',$Buscar);
if( eSubstrCount( $Buscar, ':' ) > 0 ){
list( $Modo, $Buscar ) = explode(':',$Buscar);
if( eSubstrCount( $Buscar, '.' )==0 ){
if( eSubstrCount( $Modo, '#' )>0 || eSubstrCount( $Modo, 'F' )>0 || eSubstrCount( $Modo, 'L' )>0 ) $Buscar .= 'edf';
else $Buscar .= 'gdf';
}
}
$Dim = array();
$nMax = 0;
qQuery( "select cd_gs_user,count(*) from {$_ENV['eDesDictionary']}gs_activity where script='{$Buscar}' group by 1 order by 2 desc" );
while( $r=qRow() ){
qQuery( "select user_name,user_surname from {$_ENV['eDesDictionary']}gs_user where cd_gs_user={$r[0]}", $p1 );
list( $Nombre, $Apel ) = qRow($p1);
qQuery( "select max(cdi) from {$_ENV['eDesDictionary']}gs_activity where script='{$Buscar}' and cd_gs_user={$r[0]}", $p1 );
list( $cdi ) =qRow($p1);
$Dim[] = $cdi.'|'.$r[1].'|'.trim($Nombre).' '.trim($Apel);
if( $nMax < $r[1] ) $nMax = $r[1];
}
sort($Dim);
$txt = '';
for( $n=count($Dim)-1; $n>=0; $n-- ){
$tmp = explode('|',$Dim[$n]);
if( $txt!='' ) $txt .= '<br>';
$txt .= str_pad( $tmp[1], mb_strlen($nMax.''), '0', STR_PAD_LEFT).' | '.$tmp[0].' | '.$tmp[2];
}
echo 'SCRIPT: '.$Buscar.'<br><br>'.$txt;
eEnd();
}
?>