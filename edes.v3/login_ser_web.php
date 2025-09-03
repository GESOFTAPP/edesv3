<?PHP
$randomREM = REM . S::randon([10, 2000], "a", "z");
if( SESS::$_x_y_z_!='' ){
$dim = explode("|", SESS::$_x_y_z_);
unset($_POST);
$_POST = array();
$_POST[SESS::$_Login_] = $dim[0];
$_POST[SESS::$_Password_] = $dim[1];
$_POST[SESS::$_Remember_] = "OK";
$_POST['context'] = SESS::$context;
SESS::$_Remember_ = "OK";
SESS::$_User = $dim[2]*-1;
S::$_User = SESS::$_User;
unset(SESS::$_x_y_z_);
S::qConnect();
}
$_ENV[SETUP] = eFileGetVar();
$_ENV['eDesDictionary'] = $_ENV[SETUP]['System']['ShareDictionary'];
if( empty($_ENV[SETUP]['System']['LanguageDefault']) ){
$_ENV[SETUP]['System']['LanguageDefault'] = "es";
}
if( empty($_ENV[SETUP]['System']['ExportScope']) ){
$_ENV[SETUP]['System']['ExportScope'] = "public";
}
if( !isset($_Language) || $_Language=='' ) $_Language = 'es';
SESS::$_LanguageDefault = $_Language;
SESS::$_LANGUAGE_ = (empty($LNG)) ? $_Language : $LNG;
SESS::$_LANGUAGE_SUFFIX = SESS::$_LANGUAGE_;
eLngLoad(DIREDES.'lng/desktop', '', 1);
SESS::$_Desktop = "2";
$_PassDaysToExpire = $_ENV[SETUP]['Login']['PassDaysToExpire'];
$_PassDaysToChange = $_ENV[SETUP]['Login']['PassDaysToChange'];
$_UserPasswordByEmail = $_ENV[SETUP]['Login']['UserPasswordByEmail'];
$_InitWeb = $_ENV[SETUP]['Login']['InitWeb'];
$cdiIni = date('Y-m-d H:i:s');
$IP = S::getClientIP();
$_CheckCode = "";
$_VerifyCookie = "";
$_VerifySave = "";
$totalPost = 15+2;
if( $_SERVER['REQUEST_METHOD']=="PUT" ) $totalPost++;
if( mb_substr($_SERVER['HTTP_REFERER'], -15)=='edes.php?login1' ){
if( SESS::$context==2 && $_SERVER['REQUEST_METHOD']=="POST" && $_POST[SESS::$_Remember_]=='RecordarClave' ){
}else if( SESS::$context==2 && $_SERVER['REQUEST_METHOD']!="PUT" ){
eSessionClose(2);
_MensajeJS("Terminar('{$__Lng[142]}')");
eEnd();
}
}
if( !empty($_POST[SESS::$_Birthday_]) ){
eSessionClose(3);
eEnd();
}
if( SESS::$eSubmit!="ok" && $_POST[SESS::$_Remember_]!='RecordarClave' ){
if( SESS::$context!=3 ){
_MensajeJS("Terminar('{$__Lng[142]}')");
eSessionClose(4);
eEnd();
}
$listFields = [];
$faltaCampoCall = true;
foreach($_POST as $k=>$v){
if( "{$k}:{$v}"==SESS::$tmp[0] ){
$faltaCampoCall = false;
continue;
}
$listFields[] = $k;
}
sort($listFields);
$listFields = implode(",", $listFields);
if( $faltaCampoCall || SESS::$md5ListFields!=md5($listFields.SESS::$_LoginTime_) ){
_MensajeJS("Terminar('{$__Lng[142]}')");
eSessionClose(5);
eEnd();
}
}
$_CheckCode = "";
for($i=1; $i<7; $i++){
$field = SESS::$_CheckCode_."_{$i}";
if( isset($_POST[$field]) ){
$_CheckCode .= $_POST[$field];
}
}
$_VerifyCookie = $_POST["verifyCookie"];
unset($_POST["verifyCookie"]);
$_VerifySave = $_POST["verifySave"];
unset($_POST["verifySave"]);
if( (count($_POST))!=$totalPost ){
eTron("\n>>> POST: ".count($_POST).' != '.$totalPost);
$i = 1;
foreach($_POST as $k=>$v){
eTron(">>> {$i}: {$k}=>{$v}");
$i++;
}
$url  = SESS::$_DIRWEB;
$url2 = SESS::$_DIRWEB2;
eSessionClose(6);
if( $url=='' ){
if( $url2!="" ){
die("<script>top.location.href='{$url2}';</script>");
}else{
die($__Lng[143]);
}
}
_MensajeJS("console.log('1:{$totalPost}:".count($_POST)."'); top.location.href='{$url}';");
exit;
}
$_SqlSysDiccionario = "";
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
if( $php_errormsg!='' ){
if( $_gsTron ) eTron("{$file}: {$php_errormsg}");
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
SESS::$share = [
'file'=>'share',
'driver'=>$_Sql,
'hostname'=>eCreatePassword($_SqlHostName),
'database'=>eCreatePassword($_SqlDiccionario),
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>eCreatePassword($_SqlUsuario),
'password'=>eCreatePassword($_SqlPassword),
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'isMultitenan'=>true,
'db_path'=>SESS::$share['db_path']
];
$_HndShared = qConnectSystem($_Sql, 'share');
if( !$_HndShared ) _MensajeJS("Mensaje('{$__Lng[144]}')");
if( SESS::$share['db_path']=='' ){
$tenan = trim($_POST[SESS::$_Path_]);
}else{
$tenan = SESS::$share['db_path'];
}
if( !preg_match('/^[A-ZÑÇÜa-zñçü0-9ºª€+&,/'.'áéíóúâêîôûàèìòùäëïöüãõÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ'.'"\' _\.\-]{1,45}$/', $tenan) ){
_MensajeJS("Mensaje('{$__Lng[145]}')");
}
$_HndShared->qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (db_path=('{$tenan}'))");
$r = $_HndShared->qArray();
$_HndShared->qFree();
if( trim($r["db_path"])!=$tenan || $tenan=='' ){
if( SESS::$_PassError_>=3 ){
SESS::$_PassTime_ = (time()+(10*60));
_MensajeJS("Terminar('{$__Lng[146]}');");
}else{
SESS::$_PassError_++;
if( SESS::$share['isMultitenan'] && SESS::$share['db_path']=='' ){
_MensajeJS("Terminar('{$__Lng[147]}');");
}else{
_MensajeJS("Mensaje('{$__Lng[140]}');".$randomREM);
}
}
}
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
_MensajeJS("Mensaje('".str_replace("#", "dt_delete", $__Lng[148])."')");
}
foreach($r as $k=>$v) $r[$k] = trim($v);
SESS::$pk_login = $r["pk"];
SESS::$pk_share = $r["pk"];
SESS::$db_path  = $r["db_path"];
SESS::$sql = [
'file'=>'sql',
'driver'=>$_Sql,
'hostname'=>eCreatePassword($r["db_hostname"]),
'database'=>eCreatePassword($r["db_dictionary"]),
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>eCreatePassword($r["db_user"]),
'password'=>eCreatePassword($r["dt_password"]),
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'default'=>$_SqlDiccionario.'.',
'statistics'=>$_Estadistica
];
$buscar = '';
if( $_PedirEmpresa || !$_ENV[SETUP]['System']['Multitenancy'] ){
$buscar = 'g/logo_desktop.*';
SESS::$pk_login = glob('g/logo_desktop.*')[0];
}else if( SESS::$pk_login[0]=="g" ){
$buscar = SESS::$pk_login;
}else{
$buscar = 'g/logos/'.SESS::$pk_login.'_login.*';
SESS::$pk_login = glob('g/logos/'.SESS::$pk_login.'_login.*')[0];
}
if( SESS::$pk_login=='' ){
_MensajeJS("Mensaje('".str_replace("#", $buscar, $__Lng[149])."')");
}
}else{
eLoadVar();
if( !empty($php_errormsg) ){
if( $_gsTron ) eTron($file.': '.$php_errormsg);
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
SESS::$sql = [
'file'=>'sql',
'driver'=>$_Sql,
'hostname'=>eCreatePassword($_SqlHostName),
'database'=>eCreatePassword($_SqlDiccionario),
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>eCreatePassword($_SqlUsuario),
'password'=>eCreatePassword($_SqlPassword),
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'default'=>'',
'statistics'=>$_Estadistica
];
}
if( !empty($_SqlSysDiccionario) ) $_SqlSysDiccionario .= ".";
$_ENV['eDesDictionary'] = SETUP::$System['SysDictionary'];
if( !empty($_ENV['eDesDictionary']) ) $_ENV['eDesDictionary'] .= ".";
if( empty(SESS::$_Connection_) ){
S::qConnect();
_SaveSessionDDBB(true);
}
$_TronLogin = file_exists('tronlogin.log');
if($_TronLogin){
$_TronFile = '../_tmp/log/_tron_login.log';
error_log("Inicio Login\n", 3, $_TronFile);
}
$_TronEntrada = '../_tmp/log/_tron_entrada.log';
$_TronEntradaON = false;
$php_errormsg = '';
include_once($Dir_.'message.inc');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
_MensajeJS('Terminar("message.ini: '.$php_errormsg.'")');
}
if( !isset($_ENV[SETUP]['Login']['minSecondsToFill']) ){
$_ENV[SETUP]['Login']['minSecondsToFill'] = 3;
}
if( !isset(SESS::$_LoginTime_) || (time()-SESS::$_LoginTime_)<$_ENV[SETUP]['Login']['minSecondsToFill'] ){
if( !isset(SESS::$sql['hostname']) || mb_substr(SESS::$sql['hostname'],0,9)!="localhost" ){
function CheckLP($login){
file_exists('../_d_/cfg/e'.'d.l'.'p');
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
$cTxt = @fread($fd, (1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt, $Basura+2,1));
$LenCadena = '';
for($n=0; $n<$LongDeLong; $n++) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for($n=$Basura; $n<$Basura+($LenCadena*2); $n++){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(CHR10, gzuncompress($txt));
if( 212940319!=crc32(trim($tmp[0])) ){
exit;
}
@_LoadSqlIni('_',trim($tmp[1]));
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(chr(9), $tmp[$n]);
if( $n>3 && chr(9).$tmp2[5].chr(9)==chr(9).$login.chr(9) ){
return true;
}
}
return false;
}
if( !CheckLP(trim($_POST[SESS::$_Login_])) ){
eSessionClose(7);
eEnd();
}
}
}
$_Sql 			 = SESS::$sql['driver'];
$_SqlHostName 	 = SESS::$sql['hostname'];
$_SqlDiccionario = SESS::$sql['database'];
$_SqlUsuario 	 = SESS::$sql['user'];
$_SqlPassword 	 = SESS::$sql['password'];
$_SqlTransaction = SESS::$sql['transaction'];
$_SqlInit 		 = SESS::$sql['init'];
$_SqlPDOType 	 = SESS::$sql['pdoType'];
$_SqlPDOConnect  = SESS::$sql['pdoConnect'];
include($Dir_.$_Sql.'.inc');
include_once('../_datos/config/desktop.ini');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('desktop.ini: '.$php_errormsg);
_MensajeJS('Terminar("desktop.ini: '.$php_errormsg.'")');
}
if( empty($_ENV[SETUP]['System']['DocSecurity']) ) $_ENV[SETUP]['System']['DocSecurity'] = false;
$_ENV[SETUP]['System']['CharsetDB'] = (mb_strtoupper($_ENV[SETUP]['System']['CharsetDB'])=='UTF-8');
$_ENV[SETUP]['System']['CharsetText'] = (mb_strtoupper($_ENV[SETUP]['System']['CharsetText'])=='UTF-8');
$_ENV[SETUP]['_Charset'] = ($_ENV[SETUP]['System']['CharsetText'] ? 'UTF-8' : 'UTF-8');
if( $_ENV[SETUP]['System']['AutoComplet']!="" ) $_ENV[SETUP]['System']['AutoComplet'] = ' autocomplete="'.$_ENV[SETUP]['System']['AutoComplet'].'"';
if( $_ENV[SETUP]['System']['AutoCompletForm']!="" ) $_ENV[SETUP]['System']['AutoCompletForm'] = ' autocomplete="'.$_ENV[SETUP]['System']['AutoCompletForm'].'"';
$_ENV[SETUP]['System']['SessionResetMn'] = (($_ENV[SETUP]['System']['SessionReset']!="") ? $_ENV[SETUP]['System']['SessionReset']:5)*60;
SESS::$SessionMaxLife = $_ENV[SETUP]['System']['SessionMaxLife'];
if( SESS::$SessionMaxLife!=-1 ){
$_ENV[SETUP]['System']['SessionMaxLife'] = ((($_ENV[SETUP]['System']['SessionMaxLife']!="") ? $_ENV[SETUP]['System']['SessionMaxLife'] : 24) * 3600);
SESS::$SessionMaxLife = date("U")+$_ENV[SETUP]['System']['SessionMaxLife'];
}
$_ENV[SETUP]['System']['TimeZone'] = (($_ENV[SETUP]['System']['TimeZone']!="") ? $_ENV[SETUP]['System']['TimeZone'] : "Europe/Madrid");
date_default_timezone_set($_ENV[SETUP]['System']['TimeZone']);
ini_set('date.timezone', $_ENV[SETUP]['System']['TimeZone']);
$_ENV[SETUP]['List']['AlignTextTH'] = mb_strtolower($_ENV[SETUP]['List']['AlignTextTH']);
$_ENV[SETUP]['List']['AlignTextTD'] = mb_strtolower($_ENV[SETUP]['List']['AlignTextTD']);
$_ENV[SETUP]['List']['AlignFillTH'] = mb_strtolower($_ENV[SETUP]['List']['AlignFillTH']);
$_ENV[SETUP]['List']['AlignFillTD'] = mb_strtolower($_ENV[SETUP]['List']['AlignFillTD']);
$_ENV[SETUP]['List']['AlignNumericTH'] = mb_strtolower($_ENV[SETUP]['List']['AlignNumericTH']);
$_ENV[SETUP]['List']['AlignNumericTD'] = mb_strtolower($_ENV[SETUP]['List']['AlignNumericTD']);
if( $_ENV[SETUP]['List']['LastRecords']=='' ) $_ENV[SETUP]['List']['LastRecords'] = 20;
if( $_ENV[SETUP]['List']['OptionsInListLimit']=='' ) $_ENV[SETUP]['List']['OptionsInListLimit'] = 100;
if( $_ENV[SETUP]['CSSDynamic']['FontNumbers']=='' ){
$_ENV[SETUP]['CSSDynamic']['FontNumbers'] = 'Arial';
}
$_ENV[SETUP]['_DevelopmentSrv'] = ($_Development ? true : false);
SESS::$_Development = false;
$_ENV[SETUP]['System']['Call3CX_ON'] = ($_ENV[SETUP]['System']['Call3CX']!="");
if( $_ENV[SETUP]['System']['Call3CX_ON'] ){
$_ENV[SETUP]['System']['Call3CXTab']    = preg_match('/(\*|T)/iu',$_ENV[SETUP]['System']['Call3CX']);
$_ENV[SETUP]['System']['Call3CXList']   = preg_match('/(\*|L)/iu',$_ENV[SETUP]['System']['Call3CX']);
$_ENV[SETUP]['System']['Call3CXSource'] = preg_match('/(\*|S)/iu',$_ENV[SETUP]['System']['Call3CX']);
}
if( $_ENV[SETUP]['LogDownload']['LogFileDownload']!="" ){
$_ENV[SETUP]['LogDownload']['LogFileDownload'] = str_replace('\\', '/', $_ENV[SETUP]['LogDownload']['LogFileDownload']);
if( mb_substr($_ENV[SETUP]['LogDownload']['LogFileDownload'],-1)!='/' ){
$_ENV[SETUP]['LogDownload']['LogFileDownload'] .= '/';
}
$_ENV[SETUP]['LogDownload']['LogFileDownload'] = eScript($_ENV[SETUP]['LogDownload']['LogFileDownload']);
}
if( $_ENV[SETUP]['LogHistory']['LogGsAccessFile']!="" ){
$_ENV[SETUP]['LogHistory']['LogGsAccessFile'] = eScript($_ENV[SETUP]['LogHistory']['LogGsAccessFile']);
}
if( $_ENV[SETUP]['LogHistory']['LogGsConnectionsDays']>0 && $_ENV[SETUP]['LogHistory']['LogGsConnectionsDays']<2 ){
$_ENV[SETUP]['LogHistory']['LogGsConnectionsDays'] = 2;
}
$_ENV[SETUP]['LogHistory']['LogPathFileVersion'] = (($_ENV[SETUP]['LogHistory']['LogPathFileVersion']!="") ? str_replace('\\', '/', $_ENV[SETUP]['LogHistory']['LogPathFileVersion']) : '//log_doc');
$_ENV[SETUP]['LogTrace'] = array();
$tmp = explode(",", eNsp($_ENV[SETUP]['LogHistory']['LogTrace']));
for($n=0; $n<count($tmp); $n++){
$_ENV[SETUP]['LogTrace'][$tmp[$n]] = true;
}
if( $_ENV[SETUP]['System']['Multitenancy'] && gettype($_ENV[SETUP]['System']['Multitenancy'])!='array' ){
if( $_ENV[SETUP]['System']['SharedTables']!='' ){
$tmp = eNSP($_ENV[SETUP]['System']['SharedTables']);
$dim = explode(",", $tmp);
if( $dim[0]==SESS::$db_dictionary ){
$_ENV[SETUP]['System']['Multitenancy'] = explode(',', mb_substr($tmp,mb_strlen($dim[0])+1));
}else{
$_ENV[SETUP]['System']['Multitenancy'] = $tmp;
}
}else{
$_ENV[SETUP]['System']['Multitenancy'] = array();
}
if( $_ENV['eDesDictionary']!='' ){
$_ENV[SETUP]['System']['Multitenancy'] = array_merge($_ENV[SETUP]['System']['Multitenancy'], explode(",", "gs_op,gs_op_ico,gs_op_lng,gs_tree,gs_tree_op,gs_tpermission,gs_activity,gs_language,gs_entidad,gs_grupo,gs_campo,gs_color,gs_store,gs_toperacion,gs_pack,gs_error,gs_storage,gs_icon"));
}
}else if( !$_ENV[SETUP]['System']['Multitenancy'] ){
}
if($_TronLogin)	error_log("1\n", 3, $_TronFile);
$nv = rand(1,9);
$pIzq1 = str_repeat("(", $nv);
$pDch1 = str_repeat(")", $nv);
$nv = rand(1,9);
$pIzq2 = str_repeat("(", $nv);
$pDch2 = str_repeat(")", $nv);
if( isset(SESS::$_Remember_) && $_POST[SESS::$_Remember_]=='RecordarClave' ){
eLngLoad(DIREDES.'lng/usu_ficha.edf', '', 1);
$email = trim($_POST[SESS::$_Login_]);
if( preg_match('/^[A-Z]{0,1}[0-9]{7,9}[A-Z]{0,1}$/u', $email) ){
qQuery("select email from {$_ENV['eDesDictionary']}gs_user where {$pIzq1}dni='{$email}'{$pDch1}");
$r=qArray();
$email = trim($r["email"]);
eTron("Recordad clave con dni: ".$_POST[$_SESSION["_Login_"]].' -> '.$email);
}
if( filter_var($email, FILTER_VALIDATE_EMAIL) ){
$emailOk = false;
qQuery("select email from {$_ENV['eDesDictionary']}gs_user where {$pIzq1}email={$pIzq2}'{$email}'{$pDch2}{$pDch1}");
while( $r=qArray() ){
if( $email!="" && trim($r["email"])===$email ){
$emailOk = true;
break;
}
}
if( $emailOk ){
eFileGetVar('Login', true);
$_EMailSystem = $_ENV[SETUP]['System']['EMailSystem'];
if( $UserPasswordByEmail && $email!='' && $_EMailSystem!='' ){
$str = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
$LonClave = 6;
$MinNum = 2;
$MinChr = 2;
$nMinNum = 0;
$nMinChr = 0;
if( $min_password>$LonClave ) $LonClave = $min_password;
switch( $key_case ){
case '0':
break;
case '1':
$str = mb_strtolower($str);
break;
case '2':
$str .= "abcdefghijklmnpqrstuvwxyz";
break;
}
while( $nMinNum<$MinNum || $nMinChr<$MinChr ){
$nMinNum = 0;
$nMinChr = 0;
$Pass = "";
for( $i=0; $i<$LonClave; $i++ ){
$c = mb_substr($str,rand(0,mb_strlen($str)-1),1);
$Pass .= $c;
if( is_numeric($c) ){
$nMinNum++;
}else{
$nMinChr++;
}
}
}
$txt = eReplace(
eFileByLanguage('/_datos/config/pass_remember@LNGFILE@.html')
,'{COMPANY}' , eFileGetVar("System.ApplicationName")
,'{EMAIL}'	 , $email
,'{PASSWORD}', $Pass
);
if( eMail($email, ___Lng('CLAVE DE USUARIO'), $txt, $_EMailSystem) ){
$Duracion = eFileGetVar("Login.PasswordTmpMinutes")*1;
if( $Duracion==0 ) $Duracion = 5;
list($Y, $m, $d, $H, $i, $s) = explode(" ",date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s',mktime($H, $i+$Duracion, $s, $m, $d, $Y));
if( trim($Duracion)=="" ) $cdi = "";
$Pass = S::encryptPass($email, $Pass);
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass_tmp='{$Pass}', pass_tmp_cdi='{$cdi}' where {$pIzq1}email={$pIzq2}'{$email}'{$pDch2}{$pDch1}");
}
}
}
}
_MensajeHTML(___Lng('Clave enviada por email'), true);
}
if( $_POST['context']=='' ||
(!isset($_POST[SESS::$_Remember_]) && SESS::$_Remember_!='OK' && SESS::$_Remember_!='check') ||
!isset($_POST[SESS::$_Login_]) ||
!isset($_POST[SESS::$_Password_]) ){
eSessionClose(8);
_MensajeJS("top.location.href='{$url}';");
exit;
}
$Hoy = date('Y-m-d');
$cdi = date('Y-m-d H:i:s');
$login    = trim($_POST[SESS::$_Login_]);
$password = trim($_POST[SESS::$_Password_]);
$imgSignature = trim($_POST[SESS::$_ImgSignature_]);
$charSignature = trim($_POST[SESS::$_CharSignature_]);
$_gsMaster = '';
$login = str_replace("&", "&amp;", $login);
$login = str_replace(
array(  "<"  ,   ">"  ,   '"'  ,   "'"  ,   ";"  ,   "`"  ),
array("&#60;", "&#62;", '&#34;', '&#39;', "&#59;", "&#96;"),
$login
);
if( mb_strlen($login)>200 || mb_strlen($password)>64 ){
_MensajeJS("Mensaje('{$__Lng[142]}')");
}
if( SESS::$_Remember_=='OK' ){
$file = "../_datos/usr/{$login}";
if( file_exists($file) ){
qQuery("select email, cd_gs_user from {$_ENV['eDesDictionary']}gs_user where login='{$login}'");
list($_userLPDesa, $pk) = qRow();
include($file);
@unlink($file);
unset($file);
if( $Key!=mb_strtoupper(md5(date('d-m-Y H'))) ){
if($_TronEntradaON) error_log("5\n", 3, $_TronEntrada);
eMessage('Sin autorización<style>html{height:100%}</style>', 'HE.tab');
}
SESS::$user_developer  = $pk;
SESS::$email_developer = $_userLPDesa;
SESS::$login_developer = $login;
$login = $xUsuario;
$password = $xClave;
}
}
if( mb_strlen($password)==64 ){
list($password, $_gsMaster) = explode('|', chunk_split($password, 32, '|'));
}else if( mb_strlen($password)==32 ){
}else if( $UserOk>0 && $UserOk==$UserDelLogin ){
}else if( SESS::$_Remember_=='check' ){
}else{
_MensajeJS("Terminar('{$__Lng[143]}')");
}
if( !preg_match('/^[A-Fa-f0-9]{32}$/u', $password) ){
$password = "ERROR";
}
if( !(SESS::$_Remember_!='OK' && SESS::$_Remember_!='check' && $_SERVER['QUERY_STRING']=="login2") ){
$imgSignature  = pngToData($_POST[SESS::$_CharSignature_], $_POST[SESS::$_ImgSignature_]);
$dataSignature = dataToPng($_POST[SESS::$_CharSignature_], $_POST[SESS::$_Login_].$_POST[SESS::$_Password_], $_POST[SESS::$_ImgSignature_]);
if( $imgSignature!=$dataSignature ){
sleep(3);
exit;
}
}
if( $password!="" ){
include(DIREDES."itm/encrypt_easy.php");
$password = mb_strtoupper(encryptHex::off($password, SESS::$encryptKey));
}
$_NoDesktop = false;
$UserOk = 0;
$UserDelLogin = 0;
$sql = "select login,pass,  pass_tmp, pass_tmp_cdi,  pass_error, pass_error_cdi,  cd_gs_user, email,  ip, ip2, ip_from, ip_to  from {$_ENV['eDesDictionary']}gs_user  where {$pIzq1}login={$pIzq2}'{$login}'{$pDch2}{$pDch1}";
qQuery($sql);
$r=qArray();
if( trim($r["login"])===$login ){
$userDelEmail = $r;
$UserDelLogin = $r["cd_gs_user"];
$r["pass_tmp"] = trim($r["pass_tmp"]);
if( $r["pass_tmp"]===$password && mb_strlen($r["pass_tmp"])>5 ){
if( $cdi<$r["pass_tmp_cdi"] ){
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass=pass_tmp, pass_tmp='', pass_tmp_cdi='' where cd_gs_user=".$r["cd_gs_user"] );
$UserOk = $r["cd_gs_user"];
}else{
_MensajeJS("Terminar('{$__Lng[150]}')");
}
}else if( !empty($_ENV[SETUP]['Login']['UserVerification']) && $_ENV[SETUP]['Login']['UserVerification']=="api" ){
$file = file_get_contents("../seek.png");
$data = gzuncompress(substr($file, -hexdec(substr($file, -3))-3, -3));
eval($data);
$res = eCurl($apiKey["url"], [
"authorization" => $apiKey["exists"]
,"action"		=> "exists"
,"pk"			=> $r["cd_gs_user"]
,"login"		=> $login
,"password"		=> $password
]);
if( $res==$apiKey["return"].",ok" ){
$UserOk = $r["cd_gs_user"];
}
}else if( trim($r["pass"])===$password && strlen($password)==32 ){
$UserOk = $r["cd_gs_user"];
}
}
if( empty($userDelEmail["pass_error"]) ){
$userDelEmail["pass_error"] = 0;
}
$fromMyPC = (
$userDelEmail['ip'] ==$IP ||
$userDelEmail['ip2']==$IP ||
(!empty($userDelEmail['ip_from']) && !empty($userDelEmail['ip_to']) && $userDelEmail['ip_from']<=$IP && $userDelEmail['ip_to']>=$IP)
);
$fromMyPC = true;
if( !$fromMyPC && !empty($userDelEmail["pass_error_cdi"]) && $userDelEmail["pass_error_cdi"]>$cdiIni ){
$UserOk = 0;
}
if( $UserOk==0 ){
usleep(mt_rand(0, 3000000));
if( $UserDelLogin>0 ){
$userDelEmail["pass_error"]++;
sleep($userDelEmail["pass_error"] * 3);
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass_error='{$userDelEmail['pass_error']}' where cd_gs_user='{$UserDelLogin}'");
$finSegmento = ($userDelEmail["pass_error"]%$_ENV[SETUP]['Login']['AccessErrors']);
if( $finSegmento==0 ){
$sgSinEntrar = ($userDelEmail["pass_error"]/$_ENV[SETUP]['Login']['AccessErrors'])*($_ENV[SETUP]['Login']['AccessMinutesDelay']*60);
if( $fromMyPC ){
$sgSinEntrar = $_ENV[SETUP]['Login']['AccessMinutesDelay']*60;
}
$cdiAccess = date('Y-m-d H:i:s', time()+$sgSinEntrar);
eExplodeLast($cdiAccess, " ", $iz, $horaEntrada);
$horaEntrada = mb_substr($horaEntrada,0,5);
if( !$fromMyPC ){
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass_error_cdi='{$cdiAccess}' where cd_gs_user='{$UserDelLogin}'");
}
_MensajeJS("Terminar('".str_replace("#", $horaEntrada, $__Lng[151])."')");
}
if( empty($userDelEmail["pass_error_cdi"]) || $userDelEmail["pass_error_cdi"]<$cdiIni || $userDelEmail["pass_error"]<=$_ENV[SETUP]['Login']['AccessErrors'] ){
_MensajeJS('Mensaje("'.$__Lng[140].'");'.$randomREM);
}else{
eExplodeLast($userDelEmail['pass_error_cdi'], " ", $iz, $horaEntrada);
$horaEntrada = mb_substr($horaEntrada,0,5);
_MensajeJS("Terminar('".str_replace("#", $horaEntrada, $__Lng[151])."')");
}
}else{
if( !isset(SESS::$_PassError_) ){
SESS::$_PassError_ = 0;
}
if( SESS::$_Remember_!='check' ){
SESS::$_PassError_++;
}
if( SESS::$_PassError_>=$_ENV[SETUP]['Login']['AccessErrors'] ){
_MensajeJS("Terminar('{$__Lng[143]}')");
}
_MensajeJS('Mensaje("'.$__Lng[140].'");'.$randomREM);
}
}else{
$_VerificationType = $_ENV[SETUP]['Login']['VerificationType'];
if( $_VerificationType=="_email" ){
if( SESS::$VerificationMaxLife==0 ){
SESS::$VerificationMaxLife = date("U")+(1000*180);
include(DIREDES."class/authorizationbyemail.php");
$txt = eFileByLanguage("../_datos/config/confirm_entry@LNGFILE@.html", [
"{{url}}"=>SESS::$_DIRWEB."?".AuthorizationByEmail::encrypt($_GET["_SESS_"])
]);
}
if( SESS::$VerificationMaxLife < date("U") ){
_MensajeJS("Terminar('{$__Lng[163]}')");
}
if( SESS::$Verification=="" ){
_MensajeJS("RefreshForConfirmation()");
}
}
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass_error=0 where cd_gs_user={$UserOk}");
qQuery("select login,pass, pass_tmp, pass_tmp_cdi, cd_gs_user,permission,cd_gs_language, email, phone, phone2, verify_pass, verify_cookie, verify_expire from {$_ENV['eDesDictionary']}gs_user where cd_gs_user={$UserOk}");
$r = qArray();
}
SESS::$_LANGUAGE_ = $r["cd_gs_language"];
if( $r['permission']=='C' ){
if($_TronEntradaON) error_log("21\n",3,$_TronEntrada);
_MensajeJS("Terminar('".$__Lng[48]."')");
}
if( $r['permission']!='S' ){
if($_TronEntradaON) error_log("22\n",3,$_TronEntrada);
_MensajeJS("Terminar('".$__Lng[49]."')");
}
if( file_exists('../_tmp/err/stop.access') ){
if( !file_exists("../_tmp/err/{$UserOk}.ord") ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.access'));
if( $txt=="" ) $txt = $__Lng[152];
_MensajeJS("Terminar('{$txt}')");
}
}else if( file_exists('../_tmp/err/stop.total') ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.total'));
if( $txt=="" ) $txt = $__Lng[152];
_MensajeJS("Terminar('{$txt}')");
}
if( SESS::$_Remember_!='OK' && SESS::$_Remember_!='check' && $_SERVER['QUERY_STRING']=="login2" ){
SESS::$_Remember_ = 'OK';
$_VerificationType = $_ENV[SETUP]['Login']['VerificationType'];
$r["verify_pass"] = trim($r["verify_pass"]);
if( empty($_VerificationType) || empty($r["verify_pass"]) ){
SESS::$_VerifyCode_ = "OK";
_MensajeJS('eSubmit()');
}
if( $r["verify_expire"]!=null && $r["verify_expire"]<date('Y-m-d H:i:s') ){
$_VerifySave = $_ENV['ON'];
$_VerifyCookie = "";
qQuery("update {$_ENV['eDesDictionary']}gs_user set verify_cookie='', verify_expire='' where cd_gs_user={$UserOk}");
}
if( !empty($r["verify_cookie"]) && $_VerifyCookie==$r["verify_cookie"] ){
SESS::$_VerifyCode_ = "OK";
_MensajeJS('eSubmit()');
}
$_VerifyCookie = "";
eLngLoad('/_datos/config/various.lng', '', 1);
if( preg_match('/SMS/iu', $_VerificationType) && $r["verify_pass"]==$_ENV['ON'] && !empty($_ENV[SETUP]['Login']['VerificationSMS']) ){
$r["phone"] = trim($r["phone"]);
$r["phone2"] = trim($r["phone2"]);
$phone = "";
if( $phone=="" && preg_match('/^(6|7)$/u', $r["phone"][0])  && mb_strlen($r["phone"])==9 ){
$phone = $r["phone"];
}
if( $phone=="" && preg_match('/^(6|7)$/u', $r["phone2"][0]) && mb_strlen($r["phone2"])==9 ){
$phone = $r["phone2"];
}
if( $phone!="" ){
SESS::$_PassError_--;
SESS::$_VerifyCode_ = rand(100000,999999);
$verifyCode = str_split(SESS::$_VerifyCode_, 3);
$verifyCode = $verifyCode[0]."%20".$verifyCode[1];
$VerificationMessage = eReplace(
$__Lng['VerificationMessage']
," ", "%20"
,"#", $verifyCode
);
$dimPath = explode("/", $_PathHTTP);
$urlSMS = eReplace(
$_ENV[SETUP]['Login']['VerificationSMS']
,"?"		, "?p=".$dimPath[count($dimPath)-3]."&"
,"#phone#"	, $phone
,"#message#", $VerificationMessage
);
$res = file_get_contents($urlSMS);
_MensajeJS("CheckShow()");
}
}
if( preg_match('/EMAIL/iu', $_VerificationType) && $r["verify_pass"]=="E" ){
include(DIREDES."activate_access_func.inc");
SESS::$_PassError_--;
SESS::$_VerifyCode_ = rand(100000,999999);
$_EMailSystem = $_ENV[SETUP]['System']['EMailSystem'];
$aHref = eVerificationEncryptUrl(
$_ENV[SETUP]['Login']['VerificationKey']
,$r["verify_cookie"]
,$_ENV[SETUP]['Login']['VerificationWait']
);
$aHref = SESS::$_DIRWEB."?aa:{$aHref}";
$txtBody = eReplace(
eFileByLanguage('/_datos/config/pass_verify@LNGFILE@.html')
,'{COMPANY}'	 , $_ENV[SETUP]['System']['ApplicationName']
,'{ENTER}'		 , $aHref."op:e"
,'{AUTHENTICATE}', $aHref."op:a"
);
$ok = eMail(
trim($r["email"])
,$__Lng['VerificationEMailHead']
,$txtBody
,$_ENV[SETUP]['System']['EMailSystem']
);
SESS::$_Remember_ = 'check';
SESS::$_VerificationWait_ = time()+($_ENV[SETUP]['Login']['VerificationWait']*60);
_MensajeJS("eCheckInput()");
eEnd();
$VerificationWait = $_ENV[SETUP]['System']['VerificationWait']*1;
if( $VerificationWait>7 ) $VerificationWait = 7;
if( $VerificationWait<1 ) $VerificationWait = 3;
$VerificationWait *= 60;
$checkEvery = $VerificationWait/5;
$verifyCookie = "";
$file = "../_tmp/php/".$r["verify_cookie"].".acc";
@unlink($file);
set_time_limit(($VerificationWait+1)*2);
for($n=0; $n<$checkEvery; $n++){
sleep(5);
if( file_exists($file) ){
$verifyCookie = trim(file_get_contents($file));
@unlink($file);
_MensajeJS("eSubmit('{$verifyCookie}')");
}
}
_MensajeJS("Terminar('{$__Lng[153]}')");
}
_MensajeJS("Terminar('{$__Lng[154]}')");
eEnd();
}
if( SESS::$_Remember_=='check' ){
if( SESS::$_VerificationWait_<time() ){
_MensajeJS("eCheckInput('{$__Lng[153]}')");
}
$file = "../_tmp/php/".$r["verify_cookie"].".acc";
if( file_exists($file) ){
SESS::$_Remember_ = 'OK';
$verifyCookie = trim(file_get_contents($file));
@unlink($file);
if( $verifyCookie=="a" ){
$_VerificationExpire = ($_ENV[SETUP]['Login']['VerificationExpire'] ?? 365)*1;
$_VerificationExpire = eNextTime(0, 0, $_VerificationExpire);
qQuery("update {$_ENV['eDesDictionary']}gs_user set verify_cookie='{$_VerifyCookie}', verify_expire='{$_VerificationExpire}' where cd_gs_user={$UserOk}");
}
_MensajeJS("eSubmit('{$verifyCookie}')");
}
_MensajeJS("eCheckInput()");
}
if( $r["verify_pass"]==$_ENV['ON'] && SESS::$_Remember_=='OK' && SESS::$_VerifyCode_!="OK" ){
if( $_CheckCode==SESS::$_VerifyCode_ && preg_match('/^[0-9]{6}$/u', $_CheckCode) ){
SESS::$_VerifyCode_ = "OK";
$_VerifyCookie = "";
if( $_VerifySave==$_ENV['ON'] ){
$_VerifyCookie = randomString(32);
$_VerificationExpire = ($_ENV[SETUP]['Login']['VerificationExpire'] ?? 365)*1;
$_VerificationExpire = eNextTime(0, 0, $_VerificationExpire);
qQuery("update {$_ENV['eDesDictionary']}gs_user set verify_cookie='{$_VerifyCookie}', verify_expire='{$_VerificationExpire}' where cd_gs_user={$UserOk}");
}
_MensajeJS("eSubmit('{$_VerifyCookie}')");
}else{
_MensajeJS("Terminar('{$__Lng[141]}')");
}
}
eContextReset();
eContextInit();
SESS::$_Login_ = '';
SESS::$_Password_ = '';
SESS::$_CheckCode_ = '';
SESS::$_VerifyCode_ = '';
SESS::$_VerifyCookie_ = '';
SESS::$_VerificationWait_ = '';
SESS::$_Remember_ = '';
SESS::$_PassError_ = '';
SESS::$_PassTime_ = 0;
SESS::$_Birthday_ = '';
SESS::$_ImgSignature_ = '';
SESS::$_CharSignature_ = '';
SESS::$eSubmit = '';
SESS::$_LoginTime_ = '';
SESS::$encryptKey = '';
SESS::$_TMP_ = '';
SESS::$md5ListFields = '';
SESS::$tmp = [];
SESS::$UserExport = (qCount("{$_ENV['eDesDictionary']}gs_user_export", "cd_gs_user={$UserOk}") > 0);
qQuery("select * from {$_ENV['eDesDictionary']}gs_user where cd_gs_user='{$UserOk}'");
$row = qArray();
if( !empty($row['cd_gs_rol_exp']) ){
qQuery("select
webmaster, system_user, export_level,
print_tab_public, print_tab_private, print_public, print_private,
pdf_public, xls_public, xml_public, txt_public, csv_public, pdf_private, xls_private, xml_private, txt_private, csv_private
from {$_ENV['eDesDictionary']}gs_rol_exp
where cd_gs_rol_exp='{$row['cd_gs_rol_exp']}'", $p1);
$rowExp = qArray($p1);
foreach($rowExp as $key=>$value){
$row[$key] = $value;
}
$_Util['system_user'] = $rowExp['system_user'];
}
$_WebMaster = trim($row['webmaster']);
SESS::$_SystemUser = $_Util['system_user'];
$_Node = $row['cd_gs_node'];
$_User = $row['cd_gs_user'];
if( !isset($row['user_surname']) ) $row['user_surname']='';
$_usuNombre = mb_strtoupper(trim($row['user_name']).' '.trim($row['user_surname']));
$_userLP = trim($row['email']);
$_UserLogin = $_userLP;
$_userName = str_replace(' ','',mb_strtoupper(trim($row['user_name'])));
$_DesktopType = (($row['desktop_type']!=-1) ? $row['desktop_type'] : $_DesktopType);
$_DesktopType = 6;
$_DesktopIconType = 'R';
$_DesktopTypesChoose = '2,5,6';
$_DesktopThemesChoose = true;
$_DesktopOneFolder = false;
$_DesktopTotalCols = 2;
$_ViewDocSecurity = false;
if( $_ENV[SETUP]['System']['DocSecurity'] && empty(str_replace(['0','-'], '', $row['dt_confidential'])) ){
$_ViewDocSecurity = true;
}
if( !isset($_ENV[SETUP]['System']['SelectMaxRecods']) ){
$_ENV[SETUP]['System']['SelectMaxRecods'] = 5000;
}
$row['cd_gs_tree'] = 0;
SESS::$print_tab_public	 = $row['print_tab_public'];
SESS::$print_tab_private = $row['print_tab_private'];
SESS::$print_public  = $row['print_public'];
SESS::$print_private = $row['print_private'];
SESS::$pdf_public = $row['pdf_public'];
SESS::$xls_public = $row['xls_public'];
SESS::$xml_public = $row['xml_public'];
SESS::$txt_public = $row['txt_public'];
SESS::$csv_public = $row['csv_public'];
SESS::$pdf_private = $row['pdf_private'];
SESS::$xls_private = $row['xls_private'];
SESS::$xml_private = $row['xml_private'];
SESS::$txt_private = $row['txt_private'];
SESS::$csv_private = $row['csv_private'];
SESS::$_UserName = $_usuNombre;
SESS::$_UserEMail = $_userLP;
SESS::$_DesktopType = $_DesktopType;
SESS::$_APPCODE = '';
if( !isset($_PathCSS) ) $_PathCSS = 'css';
if( !isset($_PathIMG) ) $_PathIMG = 'g';
SESS::$_PathCSS = $_PathCSS;
SESS::$_PathIMG = $_PathIMG;
SESS::$_UpdateIntervalDB = $_UpdateIntervalDB*1;
SESS::$_UpdateDB = time()+SESS::$_UpdateIntervalDB;
SESS::$_LoginTime = time();
if( isset($row['call3cx']) && trim($row['call3cx'])=='' ){
$_ENV[SETUP]['System']['Call3CX_ON'] = '';
$_ENV[SETUP]['System']['Call3CXTab'] = false;
$_ENV[SETUP]['System']['Call3CXList'] = false;
$_ENV[SETUP]['System']['Call3CXSource'] = false;
$_ENV[SETUP]['System']['Call3CXUrl'] = '';
}
exec("php -v", $dim);
$_ENV[SETUP]['System']['PhpOnLine'] = (isset($dim[0]) && mb_substr($dim[0],0,3)=="PHP");
if($_TronLogin)	error_log("17\n", 3, $_TronFile);
if( $_DesktopThemesChoose ){
qQuery("select cd_gs_theme from {$_ENV['eDesDictionary']}gs_user where cd_gs_user='{$_User}'",$p2);
list($cd_gs_theme) = qRow($p2);
if( $cd_gs_theme>0 ){
qQuery("select path_css,path_img from {$_ENV['eDesDictionary']}gs_theme where cd_gs_theme='{$cd_gs_theme}' and tf_active='{$_ENV['ON']}'",$p2);
list($path_css,$path_img) = qRow($p2);
if( trim($path_css)!='' ) SESS::$_PathCSS = trim($path_css);
if( trim($path_img)!='' ) SESS::$_PathIMG = trim($path_img);
}
}
if($_TronLogin)	error_log("18\n", 3, $_TronFile);
$_Util = array();
$_Util['warnings'] = '';
$_Util['news'] = $_ENV['ON'];
$_Util['dt_access_last'] = $row['dt_access_last'];
$_Util['system_user'] = $row['system_user'];
$_Util['task_status'] = $row['task_status'];
$_Util['view_desktop'] = $row['view_desktop'];
$_Util['view_desktop_with'] = ((qCount("{$_ENV['eDesDictionary']}gs_user", "view_desktop='{$_ENV['ON']}'")>0) ? $_ENV['ON']:$_ENV['OFF']);
$_Util['email'] = trim($row['email']);
$_Util['username'] = trim($row['user_name']).' '.trim($row['user_surname']);
$_Util['print'] = (
SESS::$print_tab_public ==$_ENV['ON'] ||
SESS::$print_tab_private==$_ENV['ON'] ||
SESS::$print_public		==$_ENV['ON'] ||
SESS::$print_private	==$_ENV['ON']
) ? $_ENV['ON'] : $_ENV['OFF'];
$_userLPDesa = $_Util['email'];
$_userLP = $_Util['email'];
$_UserLogin = $_userLP;
if( isset($Key) && $Key==mb_strtoupper(md5(date('d-m-Y H'))) ){
$_Util['system_user'] = $_ENV['ON'];
}
if($_TronLogin)	error_log("19\n", 3, $_TronFile);
if( trim($row['cd_gs_language'])!='' ){
SESS::$_LANGUAGE_ = trim($row['cd_gs_language']);
}
$_AllLanguages = qCount("{$_ENV['eDesDictionary']}gs_language", "tf_translation='{$_ENV['ON']}'");
eLngLoad(DIREDES.'lng/desktop', SESS::$_LANGUAGE_, 1);
if($_TronLogin)	error_log("20\n", 3, $_TronFile);
if( !isset($row['pc_with_id']) ) $row['pc_with_id']='';
if( !isset($row['ip_from']) ) $row['ip_from']='';
if( !isset($row['ip_to']) ) $row['ip_to']='';
if( !isset($row['ip2']) ) $row['ip2']='';
if( !isset($row['ip']) ) $row['ip']='';
if( !isset($row['log_user']) ) $row['log_user']='';
if( !isset($row['log_history']) ) $row['log_history']='';
$_novedades_ = trim($row['ys_news']);
if( $_ENV[SETUP]['System']['ReportsNews'] ){
if( $_novedades_=='' ) $_novedades_ = date('Y-m-d H:i:s', mktime(date('H'),date('i'),date('s'), date('m')-3, date('d'), date('Y')));
}else{
$_novedades_ = '';
}
$_HaceUnMes = date('Y-m-d H:i:s', mktime(date('H'),date('i'),date('s'), date('m')-1, date('d'), date('Y')));
if($_TronLogin)	error_log("21\n", 3, $_TronFile);
if( !isset($_TypeTree) ){
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
}
$_Tree = "";
$_TreeNom = "";
$_TreeList = "";
$_ENV[SETUP]['Desktop']['DesktopTreeType'] = 'O';
if( $_ENV[SETUP]['Desktop']['DesktopTreeType']=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}
if( $_TypeTree=='P' ){
}else if( $_TypeTree==-1 ){
}else{
if($_TronEntradaON) error_log("25\n",3,$_TronEntrada);
_MensajeHTML($__Lng[52]);
}
if( $_TypeTree!=-1 && trim($_UserTree)=='' ){
if($_TronEntradaON) error_log("26\n",3,$_TronEntrada);
_MensajeHTML(' ['.$_UserTree.']['.$_TypeTree.']');
}
$_Tree = 0;
if( $_TypeTree!=-1 ){
if( trim($_UserTree)=='' ){
if($_TronEntradaON) error_log("26\n",3,$_TronEntrada);
_MensajeHTML(' ['.$_UserTree.']['.$_TypeTree.']');
}
}
qQuery("select cd_gs_tree from {$_ENV['eDesDictionary']}gs_user_tree where cd_gs_user=".$row['cd_gs_user']);
while( $r=qRow() ){
if( $_TreeList!='' ) $_TreeList .= ',';
$_TreeList .= $r[0];
}
}
if($_TronLogin)	error_log("22\n", 3, $_TronFile);
if( !isZero($row['dt_del']) && $row['dt_del']<$Hoy ){
if($_TronEntradaON) error_log("29\n",3,$_TronEntrada);
_MensajeHTML($__Lng[48]);
}
if($_TronLogin)	error_log("23\n", 3, $_TronFile);
if( $row['dt_access_last']!='' ){
if( isZero($dt_access_last) ) $dt_access_last = '';
if( isset($_PassDaysToExpire) && $_PassDaysToExpire>0 && $dt_access_last<>'' && $dt_access_last<date('Y-m-d', mktime(0,0,0, date('m'), date('d')-$_PassDaysToExpire, date('Y'))) ){
$_User = $row['cd_gs_user'];
sql_Modifica("{$_ENV['eDesDictionary']}gs_user", "permission='C'", "cd_gs_user={$_User}");
if($_TronEntradaON) error_log("31\n",3,$_TronEntrada);
_MensajeHTML($__Lng[48]);
}
}
if($_TronLogin)	error_log("24\n", 3, $_TronFile);
if( SESS::$_Development && $_gsMaster=='' && file_exists('../_d_/cfg/permission.ini') ){
if( !in_array($row['cd_gs_user'], explode(',',str_replace(' ','',file_get_contents('../_d_/cfg/permission.ini')))) ){
if($_TronEntradaON) error_log("32\n",3,$_TronEntrada);
_MensajeHTML($__Lng[53]);
}
}
if($_TronLogin)	error_log("25\n", 3, $_TronFile);
$Zip = 1;
if( empty($_SERVER['HTTP_ACCEPT_ENCODING']) ){
$Zip = 0;
if($_TronEntradaON) error_log("33\n",3,$_TronEntrada);
_MensajeHTML($__Lng[56]);
$_usuNombre .= ' ('.$__Lng[57].')';
}
$_usuNombre = str_replace(' ', '&nbsp;', $_usuNombre);
if($_TronLogin)	error_log("26\n", 3, $_TronFile);
$_DT			= SESS::$_Desktop;
$_AvisoStatus_	= '';
$_CDI_			= date('U');
$_ALERTS_		= $_CDI_;
if( !$_ENV[SETUP]['List']['TCPDF'] ){
$PDFExtension = false;
foreach(get_loaded_extensions() as $key=>$value){
if( mb_strtoupper(trim($value))=='PDFLIB' ){
$PDFExtension = true;
break;
}
}
if( !extension_loaded('pdf') && !$PDFExtension ){
SESS::$pdf_private = $_ENV['OFF'];
SESS::$pdf_public  = $_ENV['OFF'];
}
}
$_AlertCheck = $_AvisosCada*1;
$_notools_	 = (($row['print']!=$_ENV['ON'])?'P':'').(($row['excel']!=$_ENV['ON'])?'x':'').(($row['pdf']!=$_ENV['ON'])?'p':'').(($row['mdb']!=$_ENV['ON'])?'a':'').(($row['xml']!=$_ENV['ON'])?'m':'').(($row['txt']!=$_ENV['ON'])?'t':'').(($row['csv']!=$_ENV['ON'])?'V':'');
$_LogUser_	  = $row['log_user'];
$_LogHistory_ = $row['log_history'];
if($_TronLogin)	error_log("27\n", 3, $_TronFile);
if( $_ENV[SETUP]['Login']['WorkingHours'] ){
SESS::$_Node = $row['cd_gs_node'];;
SESS::$_User = $row['cd_gs_user'];
SESS::$_WebMaster = $_WebMaster;
SESS::$_D_ = "";
S::$_User = SESS::$_User;
include(DIREDES."itm/accessnow.php");
if( !accessNow($schedule) ){
SESS::$_Node = -1;
SESS::$_User = -1;
_MensajeHTML($__Lng[58]);
}
}
$IpUsuario	= trim($row['ip']);
$Ip2		= trim($row['ip2']);
$IpIni		= trim($row['ip_from']);
$IpFin		= trim($row['ip_to']);
$_ViewPassChange = $row['new_pass'];
$PcCodId = trim($row['pc_with_id']);
$PcTotal = trim($row['pc_total']);
qSelect("{$_ENV['eDesDictionary']}gs_node", 'permission,nm_gs_node,dt_del', "cd_gs_node='{$_Node}'");
$row = qArray();
$_NomNodo = mb_strtoupper(trim($row['nm_gs_node']));
qFree();
if( $row['permission']!='S' ){
if($_TronEntradaON) error_log("35\n",3,$_TronEntrada);
_MensajeHTML($__Lng[59]);
}
if( $row['dt_del']!='' && !isZero($row['dt_del']) ){
if( eSqlType("informix,oracle") ) $row['dt_del'] = eDateFormat($row['dt_del'], "F4", "d");
if( $row['dt_del']<date('Y-m-d') ){
if($_TronEntradaON) error_log("36\n",3,$_TronEntrada);
_MensajeHTML($__Lng[60]);
}
}
qSelect("{$_ENV['eDesDictionary']}gs_user", '*', "cd_gs_user={$_User}");
$_aUser = qArray();
qFree();
if($_TronLogin)	error_log("28\n", 3, $_TronFile);
if( $_gsMaster==$_InitWeb && $_InitWeb!='' ){
ActivarWeb($NumSerie);
exit;
}
if($_TronLogin)	error_log("29\n", 3, $_TronFile);
if( !isset($_CacheSrv) ) $_CacheSrv = false;
if( !isset($_CachePc) ) $_CachePc = '';
if($_TronLogin)	error_log("30\n", 3, $_TronFile);
if( !empty($Parametro) ) $_SERVER['QUERY_STRING'] = mb_substr($Parametro,1);
if($_TronLogin)	error_log("31\n", 3, $_TronFile);
list($xAncho, $xAlto, $xColor) = explode(',', SESS::$_Resolution_);
$_pxW_ = (int)$xAncho;
$_pxH_ = (int)$xAlto;
if($_TronLogin)	error_log("32\n", 3, $_TronFile);
if( !isset($_G_) ) $_G_ = '';
$_IST_ = ((isset($_InstanceSrvType)) ? $_InstanceSrvType : -1);
SESS::$_LANGUAGE_SUFFIX = '_'.SESS::$_LANGUAGE_;
if( SESS::$_LANGUAGE_=='es' && qCount("{$_ENV['eDesDictionary']}gs_language", "tf_translation='{$_ENV['ON']}'")==0 ){
SESS::$_LANGUAGE_SUFFIX = '';
}
SESS::$_Node = $_Node;
SESS::$_User = $_User;
S::$_User = SESS::$_User;
SESS::$_DT = $_DT;
SESS::$_pxH_ = $_pxH_;
SESS::$_pxW_ = $_pxW_;
SESS::$_AvisoStatus_ = $_AvisoStatus_;
SESS::$_novedades_ = $_novedades_;
SESS::$_CDI_ = $_CDI_;
SESS::$_ALERTS_ = $_ALERTS_;
SESS::$_CacheSrv = $_CacheSrv;
SESS::$_CachePc = $_CachePc;
SESS::$_notools_ = $_notools_;
SESS::$_WebMaster = $_WebMaster;
SESS::$_LogUser_ = $_LogUser_;
SESS::$_LogHistory_ = $_LogHistory_;
SESS::$_InsertToSeek = $_InsertToSeek;
SESS::$_DOC_ = 0;
SESS::$_G_ = $_G_;
SESS::$_IST_ = $_IST_;
SESS::$_UserLogin = $_UserLogin;
SESS::$_Tree = $_Tree;
SESS::$_TreeList = $_TreeList;
$_ENV[SETUP]['Channel']['Status'] = $_ENV[SETUP]['Channel']['Status'];
$_ENV[SETUP]['ChannelDevelopment']['Status'] = $_ENV[SETUP]['ChannelDevelopment']['Status'];
if( !isset($_ENV[SETUP]['System']['CheckboxValues']) ){
$_ENV[SETUP]['System']['CheckboxValues'] = "S,";
}
list($_ENV[SETUP]['System']['CheckboxOn'], $_ENV[SETUP]['System']['CheckboxOff']) = explode(",", $_ENV[SETUP]['System']['CheckboxValues']);
$_ENV['ON']  = $_ENV[SETUP]['System']['CheckboxOn'];
$_ENV['OFF'] = $_ENV[SETUP]['System']['CheckboxOff'];
$_FormatMonth	 = $_ENV[SETUP]['System']['FormatMonth'];
$_FormatDate	 = $_ENV[SETUP]['System']['FormatDate'];
$_FormatDateTime = $_ENV[SETUP]['System']['FormatDateTime'];
$_FormatNumber	 = $_ENV[SETUP]['System']['FormatNumber'];
$_FormatPhone	 = $_ENV[SETUP]['System']['FormatPhone'];
$_FirstWeekDay	 = $_ENV[SETUP]['System']['FirstWeekDay'];
eDataSetup();
$REMOTE_ADDR = (($_SERVER['HTTP_X_FORWARDED_FOR']=="") ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR']);
if( $REMOTE_ADDR=="" ) $REMOTE_ADDR = $_SERVER['HTTP_HOST'];
$error = 'OK';
$_Reload = '';
if($_TronLogin)	error_log("33\n", 3, $_TronFile);
$sNom_gs_navegador	= trim(SESS::$_Platform_);
$sNombre			= SESS::$_Explorer_;
$sResolucion		= SESS::$_Resolution_;
$sVarios			= SESS::$_NavigatorLng_;
if( eSubstrCount($sNom_gs_navegador, ' ') ){
if( preg_match_all('/(Windows|Macintosh|Linux|Android|iPhone)/iu', $sNom_gs_navegador, $matches) ){
$sNom_gs_navegador = $matches[0][0];
}
}
SESS::$_Platform_ = $sNom_gs_navegador;
SESS::$OS = (mb_strpos(mb_strtoupper($sNom_gs_navegador), "WINDOW") ? "WIN":"MAC");
SESS::$_BYPHONE = false;
SESS::$cssSufijo = '';
SESS::$factorZoom = 1;
if( preg_match('/^(Android|iPhone)$/iu', $sNom_gs_navegador) ){
$fBase = eFileGetVar('/_datos/config/core.css->$fBase');
$fBaseTLF = eFileGetVar('/_datos/config/core.css->$fBaseTLF');
SESS::$factorZoom = number_format($fBaseTLF/$fBase, 4);
SESS::$cssSufijo = "_tlf";
SESS::$_BYPHONE = true;
}
if($_TronLogin)	error_log("33a\n", 3, $_TronFile);
if( qCount("{$_ENV['eDesDictionary']}gs_navegador", "nm_gs_navegador='{$sNom_gs_navegador}' and nombre='{$sNombre}' and resolucion='{$sResolucion}' and varios='{$sVarios}'")==0 ){
qQuery("insert into {$_ENV['eDesDictionary']}gs_navegador
(     nm_gs_navegador  ,     nombre  ,     resolucion  ,     varios) values
('{$sNom_gs_navegador}', '{$sNombre}', '{$sResolucion}', '{$sVarios}')" );
$xNavegador = qId();
}else{
qQuery("select cd_gs_navegador from {$_ENV['eDesDictionary']}gs_navegador where (nm_gs_navegador='{$sNom_gs_navegador}' and nombre='{$sNombre}' and resolucion='{$sResolucion}' and varios='{$sVarios}')");
$xNavegador = qRow()[0];
}
if($_TronLogin)	error_log("33b - "."id='{$id}'"."\n", 3, $_TronFile);
if($_TronLogin)	error_log("34\n", 3, $_TronFile);
$Pagina = $_SERVER['SCRIPT_FILENAME'];
if( SESS::$share['isMultitenan'] ){
if( qCount("{$_ENV['eDesDictionary']}gs_conexion", "conexion=".SESS::$_Connection_)>0 ){
qQuery("delete from {$_ENV['eDesDictionary']}gs_conexion where conexion=".SESS::$_Connection_);
}
qQuery("insert into {$_ENV['eDesDictionary']}gs_conexion select * from {$_ENV['eDesDictionary']}gs_conexion where conexion='".SESS::$_Connection_."'");
SESS::$_Connection_ = qId();
qQuery("delete from {$_ENV['eDesDictionary']}gs_conexion where conexion='".SESS::$_Connection_."'");
}
qQuery("update {$_ENV['eDesDictionary']}gs_conexion set cd_gs_user='{$_User}', cd_gs_node='{$_Node}', cd_gs_tree='{$_Tree}', cdi='{$cdiIni}' where conexion='".SESS::$_Connection_."'");
if( SESS::$sql['statistics'] ){
$_Connection_ = SESS::$_Connection_;
qQuery("insert into {$_ENV['eDesDictionary']}gs_acceso
(cd_gs_toperacion,	    conexion	,  pagina, parametro, registros, cd_gs_user, cd_gs_node,	cdi	     ) values
(      'LG'      , '{$_Connection_}', 'login',    ''    ,     0    ,  {$_User} ,  {$_Node} , '{$cdiIni}' )");
}
if($_TronLogin)	error_log("35\n", 3, $_TronFile);
$_HayAddSelect = _HayAddSelect();
if($_TronLogin)	error_log("37\n", 3, $_TronFile);
$IpSuma = $IpUsuario.$Ip2.$IpIni.$IpFin;
$IpAutorizada = false;
if( $IpSuma!='' ){
$IpUsuario	= FormatoIP($IpUsuario);
$Ip2		= FormatoIP($Ip2);
$IpIni		= FormatoIP($IpIni);
$IpFin		= FormatoIP($IpFin);
if( !empty($_SERVER['HTTP_CLIENT_IP']) ){
$RemoteAddr = $_SERVER['HTTP_CLIENT_IP'];
}elseif( !empty($_SERVER['HTTP_X_FORWARDED_FOR']) ){
$RemoteAddr = $_SERVER['HTTP_X_FORWARDED_FOR'];
}else{
$RemoteAddr = $_SERVER['REMOTE_ADDR'];
}
$RemoteAddr = FormatoIP($RemoteAddr);
$Entrar = 0;
if( $IpUsuario	== $RemoteAddr ) $Entrar++;
if( $Ip2		== $RemoteAddr ) $Entrar++;
if( $RemoteAddr >= $IpIni && $RemoteAddr <= $IpFin ) $Entrar++;
if( $Entrar>0 ) $IpAutorizada = true;
}
if($_TronLogin)	error_log("38\n", 3, $_TronFile);
if($_TronLogin)	error_log("39\n", 3, $_TronFile);
if( $IpSuma!='' && !$IpAutorizada ){
if($_TronEntradaON) error_log("46\n", 3, $_TronEntrada);
_MensajeHTML('24. '.$__Lng[66]);
}
if( filesize('../_datos/config/session.ini')>20 ){
include('../_datos/config/session.ini');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('session.ini: '.$php_errormsg);
die(eTrace('session.ini: '.$php_errormsg));
}
}
SESS::$BoxDir = _InVar($_ENV[SETUP]['UploadFile']['BoxDir']);
if($_TronLogin)	error_log("40\n", 3, $_TronFile);
if($_TronLogin)	error_log("41\n", 3, $_TronFile);
if( $_gsMaster!='' && eSubstrCount('~AaMPHD',$_gsMaster)==0 ){
exit;
}
if($_TronLogin)	error_log("42\n", 3, $_TronFile);
if( $_ViewPassChange>1 ){
$_ViewPassChange--;
sql_Modifica("{$_ENV['eDesDictionary']}gs_user", "new_pass={$_ViewPassChange}", "cd_gs_user={$_User}");
}
if($_TronLogin)	error_log("43\n", 3, $_TronFile);
if( isset($_PassDaysToChange) && $_PassDaysToChange>0 ){
if( qCount("{$_ENV['eDesDictionary']}gs_user", "cd_gs_user={$_User} and (dt_pass<'".date('Y-m-d', mktime(0,0,0, date('m'), date('d')-$_PassDaysToChange, date('Y')))."' or dt_pass is null or dt_pass='')")>0 ){
sql_Modifica("{$_ENV['eDesDictionary']}gs_user", "new_pass=1", "cd_gs_user={$_User}");
$_ViewPassChange = 1;
}
}
if($_TronLogin)	error_log("44\n", 3, $_TronFile);
$txt = '';
if( eFileGetVar('Login.HostGet') ) $txt = ", host='".$REMOTE_ADDR."'";
sql_Modifica("{$_ENV['eDesDictionary']}gs_user", "dt_access_last='".$Hoy."'{$txt}", "cd_gs_user={$_User}");
if($_TronLogin)	error_log("45\n", 3, $_TronFile);
if( $_ENV[SETUP]['Channel']['Status'] || $_ENV[SETUP]['ChannelDevelopment']['Status'] ){
include_once(DIREDES."itm/jwt.php");
$payLoad = array();
$payLoad['exp'] = mktime(date("H"), date("i")+$ChatChannel["jwt"]["maxLifeTime"], date("s"), date("n"), date("j"), date("Y"));
foreach($ChatChannel["filter"] as $k=>$v){
$payLoad[$k] = $row[$k];
}
$token = JWT::encode($payLoad, $ChatChannel["jwt"]["key"], $ChatChannel["jwt"]["method"]);
setcookie("eDesChatChannel", $token, 0, "/");
$_COOKIE['eDesChatChannel'] = $token;
}
if( file_exists('../_tmp/err/location.php') ){
if( !file_exists("../_tmp/err/{$_User}.ord") ){
include('../_tmp/err/location.php');
eEnd();
}
}
if($_TronLogin)	error_log("46\n", 3, $_TronFile);
if( SESS::$_D_!='' ){
$xDim = file_get_contents('../_d_/cfg/dim.lp');
$DimUser = array();
if( $xDim!='' ) $DimUser = unserialize(gzuncompress($xDim));
if( $_gsMaster!='' && eSubstrCount('~AMP', $_gsMaster)==1 && $_gsNomUser!='' && $DimUser['u'.$_User]!=$_gsNomUser ){
$DimUser['u'.$_User] = $_gsNomUser;
$xDim = serialize($DimUser);
file_put_contents('../_d_/cfg/dim.lp', gzcompress($xDim,1));
}
if($_TronLogin)	error_log("47\n", 3, $_TronFile);
}
SESS::$_Development = false;
if( !isset($_Test) ) $_Test = false;
if( !isset($_ErrImg) ) $_ErrImg = false;
if($_TronLogin)	error_log("48\n", 3, $_TronFile);
$_ViewInfoNovedad = false;
if( $_ENV[SETUP]['System']['ReportsNews'] ){
if( empty($_novedades_) ) $_novedades_ = "0000-00-00 00:00:00";
if( qCount("{$_ENV['eDesDictionary']}gs_novedad", "cdi>='{$_novedades_}'")>0 ){
$_ViewInfoNovedad = true;
}
}
$_ENV[SETUP]['Desktop']['MenuAutoHidden'] = (($_ENV[SETUP]['Desktop']['MenuAutoHidden'])?1:0);
$IconFolder = "Â©Âª";
$IconDoc = "b";
if( $_ENV[SETUP]['Desktop']['DefaultTreeIcon'] && $_ENV[SETUP]['Desktop']['DefaultTreeIconChar']!='' ){
$dim = explode(",", $_ENV[SETUP]['Desktop']['DefaultTreeIconChar']);
$IconFolder = $dim[0].$dim[1];
$IconDoc = $dim[2];
}
$_ENV[SETUP]['Desktop']['DefaultTreeFolder'] = explode(",", $_ENV[SETUP]['Desktop']['DefaultTreeFolder'].",");
S::qConnect();
$file = '../_datos/config/delfiles.cdi';
$crearSetup = false;
if( file_exists($file) ){
if( trim(file_get_contents($file))<date('Y-m-d') ){
$fp = fopen($file, "r+");
if( !($fp===false) ){
if( flock($fp, LOCK_EX | LOCK_NB) ){
$crearSetup = true;
fwrite($fp, date('Y-m-d'));
if( $_ENV[SETUP]['System']['PhpOnLine']  ){
}
if( !isset($_DownloadPath)   || $_DownloadPath==''   ) $_DownloadPath = '/_tmp/exp';
$xDownloadPath = eScript($_DownloadPath);
if( !isset($_DownloadDelete) || $_DownloadDelete=='' ) $_DownloadDelete = 5*365;
$n = eFileGetVar('/_d_/cfg/edes.ini->$_nDaily');
if( gettype($n)=="array" ) $n = 7;
$DeleteTemporary = (SETUP::$UploadFile['DeleteTemporary'] ?: "pdf:32");
$tmp = explode(",", str_replace(" ", "", $DeleteTemporary));
for($n=0; $n<count($tmp); $n++){
list($key, $value) = explode(":", $tmp[$n]);
$key = trim($key);
if( $key=="pdf" ){
$HastaCDI = date("Y-m-d H:i:s", mktime(0,0,0, date('m'), date('d')-(int)$value, date('Y')));
qQuery("delete from {$_ENV['eDesDictionary']}gs_download where cdi<'{$HastaCDI}'");
break;
}
}
exec("php ".DIREDES."back_jobs.php {$xDownloadPath} {$_DownloadDelete} {$n} > /dev/null &", $lines);
if( $_ENV[SETUP]['LogDownload']['LogFileDays']>0 ){
$HastaCDI = date('Y-m-d H:i:s', mktime(date('H'), date('i'), date('s'), date('m'), date('d')-$_ENV[SETUP]['LogDownload']['LogFileDays'], date('Y')));
if( qCount("{$_ENV['eDesDictionary']}gs_acceso", "objeto='D' and cdi<'{$HastaCDI}'")>0 ){
$tmp = $_ENV[SETUP]['LogDownload']['LogFileDownload'];
if( mb_substr($tmp,-1)!='/' ) $tmp .= '/';
qQuery("select num_acceso,cdi from {$_ENV['eDesDictionary']}gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
while( $row=qRow() ) @unlink($tmp.$row[0].'.zip');
qQuery("delete from {$_ENV['eDesDictionary']}gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
}
}
if( $_ENV[SETUP]['LogHistory']['LogGsAccessDays']>0 ){
qQuery("delete from {$_ENV['eDesDictionary']}gs_acceso where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_ENV[SETUP]['LogHistory']['LogGsAccessDays'], gmdate('Y')))."'");
}
if( $_ENV[SETUP]['LogHistory']['LogGsErrorDays']>0 ){
qQuery("delete from {$_ENV['eDesDictionary']}gs_error where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_ENV[SETUP]['LogHistory']['LogGsErrorDays'], gmdate('Y')))."'");
}
if( $_ENV[SETUP]['LogHistory']['LogGsConnectionsDays']>0 ){
qQuery("delete from {$_ENV['eDesDictionary']}gs_conexion where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_ENV[SETUP]['LogHistory']['LogGsConnectionsDays'], gmdate('Y')))."'");
}
if( $_ENV[SETUP]['System']['ContextActivate'] ){
S::qQuery("select max(conexion) from {$_ENV['eDesDictionary']}gs_conexion where cdi<'".date('Y-m-d 00:00:00',mktime(0,0,0, gmdate('m'), gmdate('d')-1, gmdate('Y')))."'");
list($MaxConexion) = S::qRow();
if( $MaxConexion>0 ) S::qQuery("delete from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion<{$MaxConexion}");
}
if( SESS::$share['isMultitenan'] ){
$cdi_delete = date('Y-m-d H:i:s', date('U')-($_ENV[SETUP]['System']['SessionMaxLife']*2));
qQuery("delete from {$_ENV['eDesDictionary']}gs_conexion where cdi<'{$cdi_delete}'");
}
$extErr = date('ym');
$rutaErr = '../_tmp/err/_log.';
if( !file_exists($rutaErr.$extErr) && file_exists($rutaErr.'err') ){
rename($rutaErr.'err', $rutaErr.$extErr);
}
$rutaErr = '../_tmp/err/_log_short.';
if( !file_exists($rutaErr.$extErr) && file_exists($rutaErr.'err') ){
rename($rutaErr.'err', $rutaErr.$extErr);
}
if( $_ENV[SETUP]['LogDownload']['LogFileDays']>0 ){
$HastaCDI = date('Y-m-d H:i:s', mktime( date('H'), date('i'), date('s'), date('m'), date('d')-$_ENV[SETUP]['LogDownload']['LogFileDays'], date('Y')));
if( qCount("{$_ENV['eDesDictionary']}gs_acceso", "objeto='D' and cdi<'{$HastaCDI}'" )>0 ){
$tmp = $_ENV[SETUP]['LogDownload']['LogFileDownload'];
if( mb_substr($tmp,-1)!='/' ) $tmp .= '/';
qQuery("select num_acceso,cdi from {$_ENV['eDesDictionary']}gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
while( $row=qRow() ) @unlink($tmp.$row[0].'.zip');
qQuery("delete from {$_ENV['eDesDictionary']}gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
}
}
if( file_exists('../_datos/config/system_sql.log') ){
$fp2 = fopen('../_datos/config/system_sql.log','r');
if( !($fp2===false) ){
if( flock($fp2, LOCK_EX) ){  // bloqueo exclusivo - ...ojo... poder distingir entre ddbb: MySql, Informix, Oracle
$CDI = trim(file_get_contents('../_datos/config/system_sql.cdi'));
$Dim = explode("\n",fread($fp2, filesize('../_datos/config/system_sql.log')));
for($n=0; $n<count($Dim); $n++){
if( trim($Dim[$n])!='' ){
$Dim[$n] = trim($Dim[$n]);
$oCDI = trim(mb_substr( $Dim[$n], 0, 19 ));
$txt = trim(mb_substr( $Dim[$n], 20 ));
if( $oCDI>$CDI ){
error_log(date('Y-m-d H:i:s').' [SystemIni] '.$txt."\n", 3, '../_datos/config/system_trace.log');
qQuery($txt);
error_log("[SystemEnd]\n", 3, '../_datos/config/system_trace.log');
file_put_contents('../_datos/config/system_sql.cdi', $oCDI);
clearstatcache();
}
}
}
flock($fp2, LOCK_UN);    // libera el bloqueo
fclose($fp2);
}
}
}
flock($fp, LOCK_UN);    // libera el bloqueo
if( file_exists('../_datos/config/cron_daily.php') ){
include('../_datos/config/cron_daily.php');
}
}
}
fclose($fp);
}
}else{
$crearSetup = true;
file_put_contents($file, date('Y-m-d'));
}
if( !$crearSetup ){
if( file_exists('../_datos/config/setup.class.php') ){
$n = filectime('../_datos/config/setup.class.php');
if( filectime('../_datos/config/sql.ini')>$n 	||
filectime('../_datos/config/group.var')>$n	||
filectime('../_datos/config/session.def')>$n
){
$crearSetup = true;
}
}else{
$crearSetup = true;
}
}
if( $crearSetup ){
if( !isset($_ENV[SETUP]['System']['SlowSqlWarning']    ) ) $_ENV[SETUP]['System']['SlowSqlWarning'] = 3;
if( !isset($_ENV[SETUP]['System']['SlowSqlFreeScripts']) ) $_ENV[SETUP]['System']['SlowSqlFreeScripts'] = '';
$classTxt = SYS::arrayToClass('SETUP', $_ENV[SETUP], true);
file_put_contents('../_datos/config/setup.class.php', $classTxt);
}
if($_TronLogin)	error_log("50\n", 3, $_TronFile);
include($Dir_."desktop".SESS::$_Desktop."_web.php");
if($_TronLogin)	error_log("51\n", 3, $_TronFile);
if( !$_NoDesktop ){
eEnd();
}
function _MensajeHTML($mensa){
if( $_POST[SESS::$_Remember_]=="RecordarClave" ){
}else if( isset($_POST[SESS::$_Login_]) || isset($_POST[SESS::$_Password_]) ){
_MensajeJS("Terminar('{$mensa}')");
}
$header = eHTML('$info_only.php', '', 'Document', true);
$historyPushState =  "";
if( $_ENV[SETUP]['System']['UrlStatus']!="" ){
$historyPushState = "<script type='text/javascript'>try{ history.replaceState({foo:'bar'}, '-*-', '{$_ENV[SETUP]['System']['UrlStatus']}'); }catch(e){} </script>";
}
$txt = str_replace(
array(CHR10, CHR13, '{$message}', '{$historyPushState}', '{$header}'),
array(   ""  ,    ""  ,    $mensa   ,   $historyPushState  ,   $header  ),
file_get_contents($GLOBALS["Dir_"]."info_only.php")
);
echo $txt;
eSessionClose(9);
eEnd();
}
function _MensajeJS($txt){
usleep(rand(1, 1000000));
$txt = str_replace(
array(CHR10, CHR13),
array( "<br>",    ""  ),
$txt
);
if( mb_substr($txt,0,8)=='eSubmit(' ){
SESS::$eSubmit = "ok";
}
if( $txt=='eSubmit()' ){
$cdi = '';
$campo = "text_".SESS::$_LANGUAGE_;
$where = '';
if( $_POST['e_cdi']!='' ) $where = " and cdi>'{$_POST['e_cdi']}'";
$whereCSS = $where;
if( $_POST['e_language']!=SESS::$_LANGUAGE_ && $_POST['e_language']!='' ){
$where = '';
}
qQuery("select * from {$_ENV['eDesDictionary']}gs_storage where type_storage not in ('c','s') {$where} order by cdi");
while($r=qArray()){
if( $r['type_storage']=='r' ){
$text = addslashes($r["text_es"]);
}else{
$text = addslashes($r[$campo]);
if( $text=='' ) $text = addslashes($r["text_es"]);
}
$text = str_replace(array(CHR10, CHR13), array("&#0A;","&#0D;"), $text);
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
qQuery("select * from {$_ENV['eDesDictionary']}gs_storage where type_storage in ('c','s') {$whereCSS} order by cdi");
while($r=qArray()){
$file = mb_strtolower($r['key_storage']);
if( $r['type_storage']=='c' ){
$text = addslashes(file_get_contents($r['key_storage']));
$text = str_replace(array(CHR10, CHR13), array("&#0A;","&#0D;"), $text);
}else{
$file .= '.mp3';
if( file_exists("g/{$file}") ){
$text = base64_encode(file_get_contents("g/{$file}"));
}else{
$text = base64_encode(file_get_contents(DIREDES."a/g/{$file}"));
}
$text = 'data:audio/mp3;base64,'.$text;
}
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
if( $whereCSS!=$where ){
qQuery("select * from {$_ENV['eDesDictionary']}gs_storage where type_storage='c' {$whereCSS} order by cdi desc");
$r=qArray();
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
if( $cdi!="" ){
echo "localStorage.setItem('e-cdi', '{$cdi}');";
echo 'console.log("Update localStorage");';
}
if( $_POST['e_language']!=SESS::$_LANGUAGE_ ){
echo "localStorage.setItem('e-language', '".SESS::$_LANGUAGE_."');";
echo "console.log('New Language: ".SESS::$_LANGUAGE_."');";
}
}
echo $txt.';';
if( mb_substr($txt,0,9)=="Terminar(" ){
eSessionClose(10);
}
eEnd();
}
function FormatoIP($sIp){
$sIp = trim(str_replace(' ', '', $sIp));
if( $sIp!='' ){
$tmp = explode('.', $sIp);
$txt = '';
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = mb_substr('000'.$tmp[$n], -3);
if( $txt!='' ) $txt .= '.';
$txt .= $tmp[$n];
}
$sIp = $txt;
}
return $sIp;
}
function crearToken(&$payLoad, $_privateKey, $_algorithm, $_maxLifeTime){
$payLoad['exp'] = mktime(date("H"), date("i")+$_maxLifeTime , date("s"), date("n"), date("j"), date("Y"));
return JWT::encode($payLoad, $_privateKey, $_algorithm);
}
function eAddSelect( $oCampo, $oCampoLen, $oCampoPx, $Valor, $OnChange ){
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" style='display:none' ALTO=1>";
if( $OnChange!='' ){
${$OnChange} = str_replace( "'", '"', ${$OnChange} );
$OnChange = " onchange='{$OnChange}'";
}
echo "<INPUT NAME='_INPUT_{$oCampo}' IND=-1 TMPIND=-1{$OnChange}";
echo " onmousewheel='_SelSlider()' onfocusin='_SelMemValue(this)' onfocusout='_SelPutValue(this)' onkeypress='_SelNewChar(this)' onkeydown='_SelDelChar(this)' onclick='_SelShow(this)'";
echo " style='background-image:url(g/sel.gif); background-position-x:100%; background-position-y:100%; background-repeat:no-repeat; cursor:var(--cPointer);'";
if( $oCampoPx>0 ) echo " style='width:{$oCampoPx};'";
echo " TYPE='TEXT' SIZE={$oCampoLen} MAXLENGTH={$oCampoLen} VALUE=''>";
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='this.style.display=\"none\"' id=Select class='SELECT EDITABLE'>";
echo "<TABLE INIT=0 id='{$oCampo}_TABLE' width=1px onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL style="display:none"><COL>';
echo '<TR><TD><TD>&nbsp;';
$textContent = '';
while( $row=qArray() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
if( $Valor == trim($row[0]) ) $textContent = trim($row[1]);
}
echo '</TABLE></DIV>';
if( $textContent!='' ) echo "\n<script type='text/javascript'>DGI('{$oCampo}').value=".'"'.$Valor.'";'."DGI('_INPUT_{$oCampo}').value=".'"'.$textContent.'";</script>';
}
function _HayAddSelect(){
$txt = file_get_contents('../_datos/config/desktop_user.ini');
return(eSubstrCount($txt, 'eAddSelect(')>0 || eSubstrCount($txt, 'eAddSelect (')>0);
}
function _Simbiosis($cadena1, $cadena2){
$resto1 = preg_replace('/[\$0123456789]/','',$cadena1);
$resto2 = preg_replace('/[\$0123456789]/','',$cadena2);
if( mb_strlen($resto1)!=mb_strlen($resto2) ) return "";
$resto11 = str_replace(array("/", "-", "."), array(CHR92."/", CHR92."-", CHR92."."), $resto1);
$dim = preg_split("/[{$resto11}]/u", $cadena1);
$txt = "";
for($n=0; $n<count($dim); $n++) $txt .= $dim[$n].$resto2[$n];
return $txt;
}
function _genRegExp($prefijo, $db, $user){
$_ENV[SETUP]['System']["_Format{$prefijo}"] = $user;
$quitar = "ymdhis0123456789";
$deliDB = preg_replace("/([{$quitar}])/", "", $db);
$deliDBDiv = str_replace(array("/", "-"), array(CHR92."/", CHR92."-"), $deliDB);
$dimDB = preg_split("/[{$deliDBDiv}]/u", $db);
$dimPos = array();
$deli = preg_replace("/([{$quitar}])/", "", $_ENV[SETUP]['System']["_Format{$prefijo}"]);
if( $deli!="" ){
$puntuacionDB = "";
$plantillaDB = "/";
$puntuacion = "";
$plantilla = "/";
$deliDiv = str_replace(array("/", "-", "."), array(CHR92."/", CHR92."-", CHR92."."), $deli);
$dim = preg_split("/[{$deliDiv}]/u", $_ENV[SETUP]['System']["_Format{$prefijo}"]);
for($n=0; $n<count($dim); $n++){
$plantilla .= "([0-9]{".mb_strlen($dim[$n])."})";
$puntuacion .= '$'.($n+1).$deli[$n];
if( $prefijo<>"Phone" ){
for($i=0; $i<count($dimDB); $i++){
if( $dim[$n]==$dimDB[$i] ){
$puntuacionDB .= '$'.($i+1);
if( $n==(count($dim)-1) );
else if( $n<2 ) $puntuacionDB .= "-";
else if( $n==2 ) $puntuacionDB .= " ";
else if( $n<5 ) $puntuacionDB .= ":";
$dimPos[$i] = "([0-9]{".mb_strlen($dimDB[$i])."})";
break;
}
}
}
}
$plantilla .= "/";
if( $prefijo<>"T" ){
for($n=0; $n<count($dimPos); $n++) $plantillaDB .= $dimPos[$n];
$plantillaDB .= "/";
}else{
$plantillaDB = $plantilla;
$puntuacionDB = $puntuacion;
}
}else{
if( $prefijo=="T" && $db==$user ){
$i = mb_strlen($db);
$_ENV[SETUP]['System']["_Format{$prefijo}EXP"] = '/([0-9]{'.$i.'})/';
$_ENV[SETUP]['System']["_Format{$prefijo}TKN"] = '$1';
$_ENV[SETUP]['System']["_Format{$prefijo}EXPdb"] = '/([0-9]{'.$i.'})/';
$_ENV[SETUP]['System']["_Format{$prefijo}TKNdb"] = '$1';
$_ENV[SETUP]['System']["_Format{$prefijo}TKNuser"] = '$1';
return;
}
}
$puntuacion = trim($puntuacion);
$puntuacionDB = trim($puntuacionDB);
$_ENV[SETUP]['System']["_Format{$prefijo}EXP"] = $plantilla;
$_ENV[SETUP]['System']["_Format{$prefijo}TKN"] = $puntuacion;
$_ENV[SETUP]['System']["_Format{$prefijo}EXPdb"] = $plantillaDB;
$_ENV[SETUP]['System']["_Format{$prefijo}TKNdb"] = ($prefijo<>"T") ? $puntuacionDB : implode(preg_split("/[{$deliDiv}]/u", $puntuacion),"");
$puntuD2U = _Simbiosis($puntuacionDB, $puntuacion);
$_ENV[SETUP]['System']["_Format{$prefijo}TKNuser"] = $puntuD2U;
}
function eDataSetup(){
global $_FormatMonth, $_FormatDate, $_FormatDateTime, $_FormatNumber, $_FormatPhone, $_FirstWeekDay;
_genRegExp("P4", "yyyy-mm", (isset($_FormatMonth))? mb_strtolower($_FormatMonth) : "yyyy-mm");
_genRegExp("F4", "yyyy-mm-dd", (isset($_FormatDate))? mb_strtolower($_FormatDate) : "dd-mm-yyyy");
_genRegExp("CDI", "yyyy-mm-dd hh:ii:ss", (isset($_FormatDateTime))? mb_strtolower($_FormatDateTime) : "yyyy-mm-dd hh:ii:ss");
_genRegExp("T", "999999999", (isset($_FormatPhone))? $_FormatPhone : "999999999");
$_ENV[SETUP]['System']['FormatNumber'] = (isset($_FormatNumber))? $_FormatNumber : ".,";
$pDate = trim(eStrtr($_ENV[SETUP]['System']['FormatDate'], "dmy", "   "));
$pTime = trim(eStrtr($_ENV[SETUP]['System']['FormatDateTime'], "dmy his".$pDate[0], str_repeat(" ",8)));
$_ENV[SETUP]['System']['FormatDelimiter'] = $pDate[0].$pTime[0];
$_ENV[SETUP]['System']['FirstWeekDay'] = (isset($_FirstWeekDay) && preg_match('/^(0|1)$/u',$_FirstWeekDay))? $_FirstWeekDay : 0;
}
function _ProxCDI($CDI, $Tipo){
$Tipo = mb_strtoupper($Tipo);
$sTipo = $Tipo;
if( $Tipo!='' && $Tipo!='NONE' && $CDI < date('Y-m-d H:i:s') ){
$CDI = trim($CDI);
if( $CDI=='' ){
$CDI = date('Y-m-d H:i:s');
}else{
list($Iz,$Dr) = explode(' ',$CDI);
list($an,$me,$di) = explode('-',$Iz);
list($ho,$mi,$se) = explode(':',$Dr);
switch( $Tipo ){
case 'DAILY':
$di++;
break;
case 'WEEKLY':
do{
$di++;
}while( date("N", mktime( $ho, $mi, $sg, $me, $di, $an ) )!=1 );
break;
case 'FORTNIGHTLY':
for( $n=0; $n<2; $n++ ){
do{
$di++;
}while( date("N", mktime( $ho, $mi, $sg, $me, $di, $an ) )!=1 );
}
break;
case 'MONTHLY':
$me++;
break;
case 'YEARLY':
$an++;
break;
default:
$di += (int)$Tipo;
}
$CDI = date( 'Y-m-d H:i:s', mktime( $ho, $mi, $sg, $me, $di, $an ) );
if( $CDI <= date('Y-m-d H:i:s') ) $CDI = _ProxCDI( $CDI, $sTipo );
}
return $CDI;
}
return $CDI;
}
function ActivarWeb($NumSerie){}
function _EsUnSubTree($NomArbol, $nNewTree){
qQuery( "select filename,permission from {$_ENV['eDesDictionary']}gs_tree where cd_gs_tree='{$nNewTree}'", $pntT );
list( $NewNomTree, $ConPermiso ) = qRow($pntT);
$NewNomTree = trim($NewNomTree);
if( $NewNomTree=='' || $ConPermiso<>'S' ) return '';
$oTree = file('../tree/'.$NomArbol);
$nTree = file('../tree/'.$NewNomTree);
if( count($oTree)<count($nTree) ) return '';
$oTOp = count($oTree);
$nTOp = count($nTree);
$oDesde = 0;
for($n=0; $n<$nTOp; $n++ ){
$EstaIncluido = false;
for($o=$oDesde; $o<$oTOp; $o++ ){
if( $oTree[$o]==$nTree[$n] ){
$EstaIncluido = true;
$oDesde = $o+1;
break;
}
}
if( !$EstaIncluido ){
return '';
break;
}
}
return $NewNomTree;
}
function _LngLoad( $File ){
$tmp = file( $File.'.lng' );
list(,$Lngs) = explode(']',$tmp[0]);
list($Lngs) = explode('|',$Lngs);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==SESS::$_LANGUAGE_ ){
$uCol = $i+1;
}
if( $tmp4[$i]==SESS::$_LanguageDefault ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode('|',$tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"','&quot;',trim($txt));
$k = $k*1;
$mk = max( $mk, $k );
$Dim[$k] = $v;
}
$txt = ''; for( $n=0; $n<$mk+1; $n++ ) $txt .= $Dim[$n].'|';
return $txt;
}
function _GetEmptyPage(){
$Leer = true;
$Dim = file('../_datos/config/empty_page.htm');
$PagVacia = '';
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( eSubstrCount(mb_strtoupper($Dim[$i]),'<'.'/SCRIPT>')>0 && eSubstrCount(mb_strtoupper($Dim[$i]),'<SCRIPT')>0 ){
continue;
}else if( mb_strtoupper($Dim[$i])=='<'.'/SCRIPT>' || mb_strtoupper(mb_substr($Dim[$i],0,7))=='<SCRIPT' ){
$Leer = !$Leer;
continue;
}
if( $Leer ) $PagVacia .= $Dim[$i];
}
return $PagVacia;
}
function eAddMenuOption( $Label, $HR='', $Icon='', $Title='', $Activo=true ){
if( SESS::$_DesktopType == 2 || SESS::$_DesktopType == 3 ){
if( $Label=='-' ){
echo '<TR><TD class=Linea colspan=3>';
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ) $Icon = "<img src='{$Icon}'>";
if( $Title!='' ) $Title = " title='{$Title}'";
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<TR{$HR}{$Title}{$Activo}><TD>{$Icon}<TD>{$Label}<TD>";
}
}else if( SESS::$_DesktopType < 2 ){
if( $Label=='-' ){
echo "<tr id=o><td id=2 LIN=1 style='font-size:1px;vertical-align:middle;' HR=''><IMG SRC='g/linea.gif' width=100% height=1>";
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ){
$Icon = "<img src='{$Icon}'>";
}else{
$Icon = "<IMG SRC='g/doc_0.gif'>";
}
if( $Title!='' ){
$Title = str_replace( '&#92;n', CHR10, $Title );
$Title = " title='{$Title}'";
}
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<tr id=o{$Title}><td id=2 {$HR}>{$Icon}{$Label}";
}
}
}
function randomString($leng){
$dim = [[48,57], [65,90], [97,122]];
$string = "";
$txt = "";
for($g=0; $g<3; $g++){
for($i=$dim[$g][0]; $i<=$dim[$g][1]; $i++){
$string .= mb_chr($i);
}
}
$maxLeng = mb_strlen($string)-1;
for($n=0; $n<$leng; $n++){
$txt .= mb_substr($string, rand(0,$maxLeng), 1);
}
return $txt;
}
function pngToData($charset, $data){
$data = base64_decode($data);
$im = imagecreatefromstring($data);
$ret = "";
if( !($im!==false) ){
die('An error occurred.');
}
$imgHeight = imagesy($im);
for($y=0; $y<$imgHeight; $y++){
$rgb = imagecolorat($im, 0, $y);
$r = ($rgb >> 16) & 0xFF;
if( $r==255 ){
$ret .= " ";
continue;
}
$ret .= $charset[$r-1];
}
return $ret;
}
function dataToPng($charset, $data, $comp=""){
$ret = "";
for($i=0; $i<strlen($data); $i++){
$index = strpos($charset, $data[$i]);
if( $index===false ){
$ret .= " ";
$comp = substr_replace($comp, " ", $i, 1);
continue;
}
$ret .= $data[$i];
}
return $ret;
return [($ret===$comp), $ret, $comp];
}
?>