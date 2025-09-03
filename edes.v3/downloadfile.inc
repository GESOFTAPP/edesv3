<?PHP
include_once(DIREDES.'message.inc');
if( !isset($_POST['_SendDocByMail']) ) $_POST['_SendDocByMail'] = "";
if( !isset($_POST['_doc_password_']) ) $_POST['_doc_password_'] = "";
if( !isset($_SystemCopyTo) ) $_SystemCopyTo = "";
if( !isset($_CACHEFILESRV) ) $_CACHEFILESRV = "";
if( function_exists("modifyFileToDownload") ){
modifyFileToDownload($NomFile);
}
if( eFileGetVar("LogDownload.SaveInfo") && (mb_substr($NomFile,-3)=="pdf" || mb_substr($NomFile,-3)=="xls") ){
function getUserIpAddress(){
foreach(['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'] as $key){
if( array_key_exists($key, $_SERVER) ){
foreach(array_map('trim', explode(',', $_SERVER[$key])) as $ip){
if( filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)!==false ){
return $ip;
}
}
}
}
return '?'; // Retornamos '?' si no hay ninguna IP o no pase el filtro
}
$txt = '|'.S::$_User.'|'.SESS::$_Node.'|'.date('YmdHis').'|'.$_SourceScript.'|'.$_TReg.'|'.getUserIpAddress();
$txt .= "|POST|POST"; foreach($_POST as $k=>$v) $txt .= "|{$k}|{$v}";
$txt .= "|GET|GET"; foreach($_GET as $k=>$v) $txt .= "|{$k}|{$v}";
$txt .= '|';
$txt = gzcompress($txt);
$txt = str_pad(mb_strlen($txt)-7, 4, "0", STR_PAD_LEFT).$txt;
$fp = fopen(eScript($NomFile), "a");
fwrite($fp, $txt);
fclose($fp);
}
if( !empty($_CACHEFILESRV) ){
copy(eScript($NomFile), eScript($_CACHEFILESRV));
}
if( function_exists('uFileSupport') ){
uFileSupport($NomFile);
}
if( !empty($_SystemCopyTo) ){
copy(eScript($NomFile), $_SystemCopyTo);
}
$ConRemoto = (isset($_REMOTE_)) ? "R" : "";
eFileGetVar("LogFile", true);
$typeFile = mb_strtolower($Extension);
$_User = S::$_User;
$totalSeconds = ceil(time()-abs(($_ENV[SYS]['IniSg'])));
if( $totalSeconds==0 ) $totalSeconds = 1;
if( $_TITLE[0]=="=" ) $_TITLE = trim(mb_substr($_TITLE,1));
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_download
(nm_download,   type_file  , status, total_sleep,  total_seconds , total_download, records , cd_gs_user,             cdi          ) values
('{$_TITLE}', '{$typeFile}',   'D' ,      0     , {$totalSeconds},      0        , {$_TReg}, '{$_User}', '".date('Y-m-d H:i:s')."')"
);
$idFile = S::qId();
$oldFile = eScript($NomFile);
$newFile = eScript(pathinfo($NomFile, PATHINFO_DIRNAME))."/{$idFile}.".eFileType($NomFile);
copy($oldFile, $newFile);
$NomFile = mb_substr($newFile, 2);
$_xLogFile = "";
if( isset($_LOGFILE) && in_array($Extension, $_LOGFILE[0]) && ($_LOGFILE[1]==0 || $_TReg>=$_LOGFILE[1]) ){
$_xLogFile = '&_LOG=1';
}
if( ($TypeFile=="*" || mb_strtoupper($TypeFile)==$Extension) && ($MinRecords*1==0 || $_TReg>=$MinRecords) ){
$SaveTables = explode(",", str_replace(" ", "", $SaveTables));
if( in_array(trim(explode(" ", trim($_DBTABLE))[0]), $SaveTables) ) $_xLogFile = '&_LOG=1';
$SavePaths = explode(",", str_replace(" ", "", $SavePaths));
if( in_array(explode("/", $OriFichero)[0], $SavePaths) ) $_xLogFile = '&_LOG=1';
}
global $_TITLETOEXTRACT;
if( $_TITLETOEXTRACT[0]=='=' ) $_TITLETOEXTRACT = mb_substr($_TITLETOEXTRACT,1);
$GLOBALS["_LOGREQUEST"]["title"] = $_TITLETOEXTRACT;
$_TITLETOEXTRACT = str_replace(array('<br>','<BR>'), array(' ',' '),$_TITLETOEXTRACT);
if( SESS::$sql['statistics'] && ((($_POST['_SendDocByMail']==1 || !empty($_POST['_doc_password_'])) && (SETUP::$LogTrace["D*"] || SETUP::$LogTrace["D".$Extension])) || !empty($_xLogFile)) ){
include(DIREDES.'itm/filetolog.php');
eFileToLog($NomFile, $_TReg, $Password, $Path);
}
if( $_POST['_SendDocByMail']==1 && isset($_POST['_doc_password_']) && $_POST['_doc_password_']=='-' ){
include(DIREDES.'generatekey.php');
$_POST['_doc_password_'] = eGenerateKey();
}
if( !empty($_POST['_doc_password_']) ){
include(DIREDES.'itm/zip_pass.php');
eZipWithPasswmb_ord($NomFile, $OriFichero, $_TReg, $_SubModo, $_TITLETOEXTRACT);
eEnd();
}
if( $_POST['_SendDocByMail']==1 ){
include(DIREDES.'itm/senddocmail.php');
eSendDocByMail($NomFile);
eEnd();
}
$addGet = "";
if( eSubstrCount($_DownloadPDF, "&_DOWN=1")>0 ){
$addGet = '&_DOWN=1';
}else{
}
eMessage('~'.$Extension, 'HS', '', 'top.S("#_DOWNLOADCENTER").class("-OFF"); try{_WOPENER.eHideBusy();}catch(e){}; location.href = "edes.php?'
.$ConRemoto
.'D:'.$NomFile
.$addGet
.'&_CONTEXT='.((!empty(SESS::$_eDes_)) ? SESS::$_eDes_ : "")
.'&_Source='.$OriFichero
.'&_TReg='.$_TReg
.'&_SubMode='.$_SubModo
.$_xLogFile
.eSessionAddUrl()
.'"+(S.url(window, "_FILEDIRECT")!=null ? "&_FILEDIRECT=1":"");'
);
eEnd();
?>