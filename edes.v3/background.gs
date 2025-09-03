<?PHP
define('_ERROR_REPORTING', 5);
define('DIREDES' , __DIR__.'/');
error_reporting( _ERROR_REPORTING );
date_default_timezone_set('Europe/Madrid');
ini_set('track_errors', false);
set_time_limit(0);
if( !defined('SYS')   ) define('SYS'  , '!' );
if( !defined('SETUP') ) define('SETUP', '.' );
if( !defined('DF') 	  ) define('DF'   , '_' );
$sg = gettimeofday();
$_SecondINI = (int)$sg["sec"];
if( $argv[3][0]=="'" && mb_substr($argv[3],-1)=="'" ) $argv[3] = mb_substr($argv[3],1,-1);
if( $argv[3][0]=='"' && mb_substr($argv[3],-1)=='"' ) $argv[3] = mb_substr($argv[3],1,-1);
$argv[3] = str_replace('{36}','$',$argv[3]);
$FileInfo = '../_tmp/_background.info';
if( $argv[3]=='phpinfo' ){
if( file_exists($FileInfo) ) @unlink( $FileInfo );
error_log( 'HOST NAME: '.php_uname('n')."\n", 3, $FileInfo );
error_log( 'Directorio actual: '.getCWD()."\n", 3, $FileInfo );
error_log( "argv\n", 3, $FileInfo );
foreach( $argv as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "argc\n", 3, $FileInfo );
foreach( $argc as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_SERVER\n", 3, $FileInfo );
foreach( $_SERVER as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_GLOBALS\n", 3, $FileInfo );
foreach( $_GLOBALS as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_GET\n", 3, $FileInfo );
foreach( $_GET as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_POST\n", 3, $FileInfo );
foreach( $_POST as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_FILE\n", 3, $FileInfo );
foreach( $_FILE as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_REQUEST\n", 3, $FileInfo );
foreach( $_REQUEST as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
$Dim = ini_get_all();
error_log( "ini_get_all():\n", 3, $FileInfo );
foreach( $Dim as $kp=>$vp ){
error_log( "\t".$kp.":\n", 3, $FileInfo );
foreach( $vp as $k=>$v ) error_log( "\t\t".$k.' = '.$v."\n", 3, $FileInfo );
}
exit;
}
if( !function_exists('eTron') ){
$_GET = array();
$_BKG = $argv[1];
$_User = $argv[2];
$_File = $argv[3];
$_GET['_DB'] = $argv[4];
}
$GLOBALS['PHP_SELF'] = $_File;
$GLOBALS['SCRIPT_NAME'] = $_File;
$GLOBALS['PATH_TRANSLATED'] = $_File;
$_SERVER['SCRIPT_FILENAME'] = $_File;
$_SERVER['PHP_SELF'] = $_File;
$_SERVER['SCRIPT_NAME'] = $_File;
$_SERVER['SCRIPT_FILENAME'] = $_File;
$_SERVER['PATH_TRANSLATED'] = $_File;
for($i=4; $i<$argc; $i++){
$Parametro = $argv[$i];
$p = mb_strpos($Parametro, '=');
if( $p>0 ){
$k = mb_substr($Parametro, 0, $p);
$v = mb_substr($Parametro, $p+1);
$GLOBALS[$k] = $v;
$_GET[$k] = $v;
}else{
}
}
unset( $_SERVER['argv'] );
unset( $_SERVER['argc'] );
unset( $argc );
unset( $argv );
unset( $Parametro );
unset( $i );
unset( $p );
if( $_GET['_DB']!='' ){
$FileIni = '../_datos/config/'.$_GET['_DB'].'.ini';
}else{
$FileIni = '../_datos/config/sql.ini';
}
$txt = trim( @file_get_contents( $FileIni ) );
if( mb_substr($txt,0,2)!='<'.'?' ){
eval( gzuncompress($txt) );
}else{
eval( mb_substr( $txt, ( ( mb_strtoupper(mb_substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -4 ) );
}
unset( $txt );
list($_File) = explode(' ',trim($_File));
if( !function_exists('eTron') ){
include_once( DIREDES.'background2.inc' );
}else{
eTrace( 'File: '.eScript($_File) );
}
include_once(DIREDES.$_Sql.'.inc' );
if( $_File=='$report.gs' ){
$NomFile = '../_tmp/ext/bkg_var.'.$_User;
}else{
$NomFile = '../_tmp/ext/bkg_post.'.$_User;
}
$Dim = file($NomFile);
for($n=0; $n<count($Dim); $n++){
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
}else if( $k=='_PathCSS' ){
SESS::$_PathCSS = $v;
}else{
$_POST[$k] = $v;
}
}
}
@unlink($NomFile);
switch( $__iSql ){
case 'mysql':
eInclude('mysql.class');
$_db = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$_db = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$_db = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$_db = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$_db = new ePdo();
break;
}
$_db->qConnect('sql');
$_db->qQuery( "update {$_ENV['eDesDictionary']}gs_bkg set bkg_pid=".getmypid()." where cd_gs_bkg={$_BKG}" );
$_db->qEnd();
include( eScript($_File) );
exit;
function qConnectSystem($nomSql='', $fileIni='', $GetPuntero=false){
if( $nomSql=='' ){
$nomSql = SESS::$sql['driver'];
$fileIni = '.';
}
eInclude($nomSql.'.class');
switch( $nomSql ){
case 'mysql':
if( $GetPuntero ) return new eMySql();
S::$handleSys = new eMySql();
break;
case 'mysqli':
if( $GetPuntero ) return new eMySqli();
S::$handleSys = new eMySqli();
break;
case 'informix':
if( $GetPuntero ) return new eInformix();
S::$handleSys = new eInformix();
break;
case 'oracle':
if( $GetPuntero ) return new eOracle();
S::$handleSys = new eOracle();
break;
case 'pdo':
if( $GetPuntero ) return new ePdo();
S::$handleSys = new ePdo();
break;
}
S::$handleSys->qConnect($fileIni);
}
function eBkgError( $Txt ){
global $_db;
$CDIFin = date('Y-m-d H:i:s');
$_db->qConnect('sql');
$_db->qQuery( "update {$_ENV['eDesDictionary']}gs_bkg set bkg_status='e', y2s_end='{$CDIFin}' where cd_gs_bkg={$_BKG}" );
eBkgEnd( 'E', $Txt, false );
}
function eBkgNote( $Txt ){
global $_db;
global $_BKG;
$Txt = str_replace('"','\"',str_replace("'","\'",$Txt));
$_db->qQuery( "update {$_ENV['eDesDictionary']}gs_bkg set
y2s_note='".date('Y-m-d H:i:s')."',
note='".$Txt."' where cd_gs_bkg={$_BKG}" );
}
function eBkgEnd( $Estado='F', $uError='', $Conectar=true ){
global $_db;
global $_BKG;
if( $Conectar ) $_db->qConnect('sql');
$_db->qQuery( "select y2s_start from {$_ENV['eDesDictionary']}gs_bkg where cd_gs_bkg={$_BKG}" );
list( $CDIIni ) = $_db->qRow();
$sCDIFin = $CDIFin = date('Y-m-d H:i:s');
$CDIIni = str_replace(' ','-',str_replace(':','-',$CDIIni));
$CDIFin = str_replace(' ','-',str_replace(':','-',$CDIFin));
list( $iA, $iM, $iD, $ih, $im, $is ) = explode('-',$CDIIni );
list( $fA, $fM, $fD, $fh, $fm, $fs ) = explode('-',$CDIFin );
$n = mktime( $fh, $fm, $fs, $fM, $fD, $fA ) - mktime( $ih, $im, $is, $iM, $iD, $iA );
$TotalTime = date('H:i:s',$n-3600);
$File = "../_tmp/err/{$_BKG}.bkg";
$TxtError = @file_get_contents( $File );
if( $TxtError=='' && $uError!='' ) $TxtError = $uError;
$TxtError = str_replace('"','\"',str_replace("'","\'",trim($TxtError)));
$TxtError = str_replace( CHR13, CHR10, $TxtError );
$TxtError = str_replace( CHR10.CHR10, CHR10, $TxtError );
$TxtError = str_replace( CHR10, '~', $TxtError );
$BkgSTime = $BkgTime = '';
if( LINUX_OS ){
$xSalida = shell_exec( 'ps -F -p '.getmypid() );
$DimPS = explode("\n",$xSalida);
for( $n=0; $n<count($DimPS); $n++ ){
$txt = trim($DimPS[$n]);
while( eSubstrCount($txt,'  ') > 0 ) $txt = str_replace('  ',' ',$txt);
if( trim($txt)=='' ) continue;
$Dim = explode(' ',$txt);
if( count($Dim)<11 ) continue;
$xPID = $Dim[1];
if( $xPID=='PID' ) continue;
$BkgSTime = $Dim[7];
$BkgTime = $Dim[9];
$xCMD = $Dim[10];
break;
}
}
$_db->qQuery( "update {$_ENV['eDesDictionary']}gs_bkg set bkg_status='{$Estado}', txt_error='{$TxtError}', bkg_stime='{$BkgSTime}', bkg_time='{$BkgTime}', total_time='{$TotalTime}', y2s_end='{$sCDIFin}' where cd_gs_bkg={$_BKG}" );
@unlink( $File );
$_BKG = -1;
$_db->qEnd();
exit;
}
if( !function_exists('eScript') ){
function eScript($File, &$Bak=NULL, &$EsEdes=NULL){
global $Dir_;
$EsEdes = false;
$Bak = '';
$File = trim(eFileClearGet($File));
list($File) = explode(mb_chr(0), $File);
while( $File[0]=='.' ) $File = mb_substr($File, 1);
$File = eReplaceAll(
array('\\', '...', '../', '$/', '$.', '=/', '=.', '..', ':')
,array('/' , '..' , ''   , '$' , '$' , '=' , '=' , ''  , '' )
,$File
);
$iFile = $File[0];
$File = eReplaceAll(REM, '/', mb_substr($File, 1));
$File = $iFile.$File;
try{
if( mb_strlen($File)>250 ){
throw new Exception(1);
}
$noDir = array("/etc/", "/var/log/", "/edes.v3/", "/_datos/config/");
for($i=0; $i<2; $i++){
if( eSubstrCount($File, $noDir[$i])>0 ){
throw new Exception(2);
}
}
} catch (Exception $e){
_hackerLog("ReadFile: {$e->getMessage()} : {$File}");
}
switch( $File[0] ){
case '/':
if( mb_substr($File,0,2)==REM ){
$Bak  = '../_bak_.file/'.mb_substr($File,2);
$File = DIRAPPFILE.mb_substr($File,2);
}else{
$Bak  = '../_bak_/'.mb_substr($File,1);
$File = '../'.mb_substr($File,1);
}
break;
case '$':
$Bak  = DIREDES.'m/_bak_/'.mb_substr($File, 1);
$File = DIREDES.mb_substr($File, 1);
$EsEdes = true;
break;
case '^': case '>':
$File = mb_substr($File, 1);
if( !preg_match('^http:?\/\/u', $File) ){
_hackerLog("ReadFile: 3 : {$File}");
}
break;
case '=':
$File = mb_substr($File, 1);
$Bak  = '../_bak_/'.$File;
$File = '../../'.$File;
break;
case '?':
_hackerLog("ReadFile: 4 : {$File}");
break;
case '*':
_hackerLog("ReadFile: 5 : {$File}");
$txt = explode('/', mb_substr($File, 1));
$File = '../../'.mb_substr($File, 1);
if( !file_exists('../../'.$txt[0].'/http/edes.php') ) eEnd('ERROR:32Q');
return $File;
default:
$Bak  = '../_bak_/d/'.$File;
$File = '../d/'.$File;
}
$Bak = trim($Bak);
return trim($File);
}
}
?>