<?PHP
date_default_timezone_set('Europe/Madrid');
define( '_ERROR_REPORTING', 5 );
error_reporting( _ERROR_REPORTING );
define( '_TRACK_ERRORS', false );
ini_set( 'track_errors', false );
foreach( $_GET  as $k=>$v ) $GLOBALS[$k] = $v;
foreach( $_POST as $k=>$v ) $GLOBALS[$k] = $v;
if( !function_exists('eEnd') ){
function eEnd(){
global $_HndDB;
if( $_HndDB ){
qFree();
qEnd();
}
if( S::$handleSys ){
S::qFree();
S::qEnd();
}
exit;
}
}
$_FileSession = str_replace('\\', '/', session_save_path());
if( mb_substr($_FileSession,-1)!='/' ) $_FileSession .= '/';
if( eSubstrCount( $_FileSession, ';' ) > 0 ){
list($nNivel,$_FileSession) = explode(';',$_FileSession);
for( $n=0; $n<$nNivel; $n++ ) $_FileSession .= mb_substr($_GET['SS'],$n,1).'/';
}
$_FileSession .= 'sess_'.$_GET['SS'];
$_Tron = false;
if( $_Tron ) error_log('QUERY_STRING: '.$_SERVER['QUERY_STRING']."\n",3,'_download.info');
$DirApli = GetCWD();
$DirApli = str_replace( '\\', '/', $DirApli );
$DirApli = str_replace( REM, '/', $DirApli );
if( mb_substr($DirApli,-1)=='/' ) $DirApli = mb_substr($DirApli,0,-1);
$tmp = explode('/',$DirApli);
$DirApli = $tmp[count($tmp)-2];
$Dir_ = dirname(__FILE__).'/';
$NomFile = $_GET['FILE'];
$oFile   = $_GET['FILE'];
if( $NomFile=='tEsT.mDb' ){
$File = file_get_contents(DIREDES.'a/test.mdb');
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Length: ".mb_strlen($File));
echo $File;
eEnd();
}
if( $_Tron ) error_log('DirApli: '.$DirApli."\n",3,'_download.info');
if( mb_substr($NomFile,0,2)==REM ){
if( $_Tron ) error_log('Tipo: '.REM."\n",3,'_download.info');
$NomFile = '../../'.$DirApli.'.file'.mb_substr($NomFile,1);
}else if( $NomFile[0]=='=' ){
$NomFile = str_replace('\\','/',$NomFile);
$NomFile = str_replace('../','',$NomFile);
$NomFile = '../../'.mb_substr($NomFile,1);
}else if( $NomFile[0]=='/' ){
if( $_Tron ) error_log('Tipo: '.'/'."\n",3,'_download.info');
if( eSubstrCount($NomFile, '/_bak_/update/_update_.')==1 ){
include_once('../_d_/cfg/edes.ini');
if( isset($_DevelopmentEMailFrom) && $_DevelopmentEMailFrom!='' ){
if( !function_exists('qQuery') ){
$txt = trim(@file_get_contents('../_datos/config/sql.ini'));
if( mb_substr($txt,0,2)!='<'.'?' ){
eval(gzuncompress($txt));
}else{
eval(mb_substr($txt, ((mb_strtoupper(mb_substr($txt,0,5))=='<'.'?PHP')? 5 : 2), -2 ));
}
include_once(DIREDES.$_DirEDes.$_Sql.'.inc');
}
qQuery("select distinct email from {$_ENV['eDesDictionary']}gs_activity as c where c.script='{$NomFile}' and c.edes='F' and c.cdi_ftp is null");
$r = qRow();
if( trim($r[0])!="" ){
$mail_to = trim($r[0]);
$mail_subject = 'Development: Package Update';
$mail_message = '';
$mail_from = $_DevelopmentEMailFrom;
$mail_cc = '';
$mail_cco = '';
if( !eMail($mail_to, $mail_subject, $mail_message, $mail_from) ){
}
}
}
}
$NomFile = '..'.$NomFile;
}else if( $NomFile[0]=='$' ){
if( mb_substr($NomFile,0,11)=='$t/edes.key' ||
mb_substr($NomFile,0, 7)=='$t/lng/'     ||
mb_substr($NomFile,0,10)=='$t/manual/' ){
if( $_Tron ) error_log('Tipo: $1'."\n",3,'_download.info');
$NomFile = DIREDES.mb_substr($NomFile,1);
}else if( mb_substr($NomFile,0,6)=='$Excel' ||
mb_substr($NomFile,0,5)=='$Word'  ||
mb_substr($NomFile,0,8)=='$Outlook' ){
if( $_Tron ) error_log('Tipo: $2'."\n",3,'_download.info');
$NomFile = DIREDES.str_replace( '$', '/t/dll/microsoft.office.interop.', mb_strtolower($NomFile) ).'.dll';
}else if( mb_substr($NomFile,0,6)=='$adodb' ||
mb_substr($NomFile,0,5)=='$adox' ){
if( $_Tron ) error_log('Tipo: $2'."\n",3,'_download.info');
$NomFile = DIREDES.str_replace( '$', '/t/dll/interop.', mb_strtolower($NomFile) ).'.dll';
}else{
if( $_Tron ) error_log('Tipo: $3'."\n",3,'_download.info');
if( $_Tron ) error_log('IDSRV: '._IDSRV().' = '.$_GET['IDSRV']."\n",3,'_download.info');
if( _IDSRV()<>$_GET['IDSRV'] ) exit;
if( $_Tron ) error_log(filemtime(DIREDES.mb_substr($NomFile,1)).' '.DIREDES.mb_substr($NomFile,1)."\n",3,'_download.info');
if( $_Tron ) error_log(filemtime('../../edes.v3.motor/edes.v3/'.mb_substr($NomFile,1)).' '.'../../edes.v3.motor/edes.v3/'.mb_substr($NomFile,1)."\n",3,'_download.info');
if( filemtime(DIREDES.mb_substr($NomFile,1)) < filemtime('../../edes.v3.motor/edes.v3/'.mb_substr($NomFile,1)) ){
$NomFile = '../../edes.v3.motor/edes.v3/'.mb_substr($NomFile,1);
}else{
$NomFile = DIREDES.mb_substr($NomFile,1);
}
}
}else if( mb_substr($NomFile,0,4)=='LNG,' ){
_LngLoad($NomFile, DIREDES.'lng/desktop.js');
}else{
if( $_Tron ) error_log('Tipo: else'."\n",3,'_download.info');
$NomFile = '../d/'.$NomFile;
}
if( $_Tron ) error_log('File Real: '.$NomFile."\n",3,'_download.info');
if( $_Tron ) error_log('WATERMARK: '.$WATERMARK."\n",3,'_download.info');
if( $WATERMARK==1 ){
function eScript2($File){
if( mb_substr($File,0,2)==REM ){
}else if( $File[0]=='/' ){
$File = '..'.$File;
}
return $File;
}
$_NoEjecutar = true;
include(DIREDES.'watermark.gs');
eFileGetVar('ImgEdit', true);
if( $ImgWatermark!='' ){
$ImgWatermark = eScript2($ImgWatermark);
eImgWatermark($NomFile, $ImgWatermark, $ImgMarginRight, $ImgMarginBottom);
}
}
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
if( eSubstrCount($NomFile,'/crypt/')>0 ){
$oFile = $NomFile;
$dFile = '../_tmp/zip/'.rand(10000,99999).'.zip';
$dDir = '../_tmp/zip/';
list( $Clave, $Ext ) = _UnPath( $oFile );
$Clave = md5($Clave);
@unlink($dFile);
copy( $NomFile, $dFile );
$df = fopen( $dFile, 'r+' );
fwrite( $df, 'PK' );
fclose( $df );
if( LINUX_OS ){
$ExeZip = "unzip -P {$Clave} -d {$dDir} ".$dFile;
}else{
$ExeZip = eScript('$win/unzip.exe')." -P {$Clave} -d {$dDir} ".$dFile;
}
$Dim = array();
exec( $ExeZip, $Dim );
@unlink($dFile);
$tmp = explode('/',$oFile);
$NomFile = $dDir.$tmp[count($tmp)-1];
header("Content-Length: ".filesize($NomFile));
readFile($NomFile);
@unlink($NomFile);
}else{
header("Content-Length: ".filesize($NomFile));
readFile($NomFile);
}
exit;
function _UnPath( $txt ){
$Dim = explode('/',str_replace('\\','/',$txt));
$Ext = explode('.',$txt);
return array( $Dim[count($Dim)-2].'/'.$Dim[count($Dim)-1], $Ext[count($Ext)-1] );
}
function _LngLoad( $tipo, $File ){
list( , $LngUser, $_Language ) = explode(',',$tipo);
$tmp = file( $File.'.lng' );
list(,$Lngs) = explode(']',$tmp[0]);
list($Lngs) = explode('|',$Lngs);
$tmp4 = explode( ',', str_replace(' ','',$Lngs) );
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$LngUser ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_Language ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for( $n=1; $n<count($tmp); $n++ ){
list( $tmp[$n] ) = explode('~',$tmp[$n]);
$tmp[$n] = trim($tmp[$n]);
$tmp2 = explode('|',$tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"','&quot;',trim($txt));
$k = $k*1;
$mk = max( $mk, $k );
$Dim[$k] = $v;
}
$txt = '';
for( $n=0; $n<$mk+1; $n++ ){
$txt .= str_replace(CHR92.'n','<br>',$Dim[$n]).'|';
}
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: text/html; charset=UTF-8");
header("Content-Length: ".mb_strlen($txt));
echo $txt;
exit;
}
?>