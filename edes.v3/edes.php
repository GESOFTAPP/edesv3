<?PHP
if( file_exists('edes.php.log') ){
list($i) = explode(' ',microtime());
error_log(date('Y-m-d H:i:s:').mb_substr($i,2,8).': '.$_SERVER["QUERY_STRING"]."\n",3, 'edes.php.log');
}
SYS::define();
SYS::iniSet();
IsAnAuthorization();
function IsAnAuthorization(){
if( $_SERVER['REQUEST_METHOD']!="GET" || isset($_GET['_SESS_']) || mb_substr($_SERVER["QUERY_STRING"],0,11)=='E:$t/ed.gs/' ){
return;
}
$nParam = 0;
$xParam = 0;
foreach($_GET as $key=>$v){
$nParam++;
if( empty($v) ){
$xParam++;
}
}
if( !($nParam==1 && $xParam==1) ){
return;
}
include(DIREDES."class/authorizationbyemail.php");
$file = '../_tmp/sess/'.AuthorizationByEmail::session($key);
if( !file_exists($file) ){
exit;
}
$_ENV[SYS]['fileSession'] = $file;
$_ENV[SYS]['fpFileSession'] = false;
SYS::readSession();
if( SESS::$VerificationMaxLife < date("U") ){
exit;
}
SESS::$Verification = "ok";
$_ENV[SYS]['MD5Session'] = "";
eEnd();
}
if( !empty(apache_request_headers()['eDesKey']) ){
include(DIREDES."itm/uptime_get.php");
}
if( $_SERVER["QUERY_STRING"]=='r:$nocompatible.htm' ){
include(DIREDES.'nocompatible.htm');
exit;
}
if( !empty(getenv('MAIL_KEYCODE')) ){
$_SqlTransaction	= true;
$dim = explode("|", ePassword(getenv('MAIL_KEYCODE')));
for($n=0; $n<count($dim); $n++){
$command = trim($dim[$n]);
eExplodeOne($command, "=", $key, $value);
if( $key=="SqlInit" ){
if( !isset($GLOBALS["_{$key}"]) || !is_array($GLOBALS["_{$key}"]) ){
$GLOBALS["_{$key}"] = array();
}
array_push($GLOBALS["_{$key}"], $value);
continue;
}
$GLOBALS["_{$key}"] = $value;
}
$_Development = ($_Development=="true");
unset($dim);
}
if( ISCLI ){
$id = $argv[1];
$_ENV["PHPCLI-ID"] = $id;
$_ENV[SYS]['IniSg'] = microtime(true);
$data = unserialize(file_get_contents("../_tmp/php/".$id));
$_SERVER["HTTP_X_FORWARDED_FOR"] = $data[0];
$_SERVER['HTTP_USER_AGENT'] = $data[1];
$_SERVER['REQUEST_METHOD'] = $data[2];
$_GET = $data[3];
$_POST = $data[4];
$n = time()+(60*60);
while( S::loadAverage()[0]>0.75 && $n<time() ){
sleep(30);
}
$_ENV["PHPCLI-SLEEP"] = microtime(true)-$_ENV[SYS]['IniSg'];
$txt = "";
$n=0;
foreach($_GET as $key=>$value){
if( $n>0 ){
$txt .= "&";
$txt .= "{$key}={$value}";
}else{
$txt .= "{$key}";
}
$n++;
}
$_SERVER["QUERY_STRING"] = $txt;
}
if( mb_substr($_SERVER["QUERY_STRING"],0,11)=='E:$keyhelp/' ){
include(DIREDES."keyhelp.php");
}
$_ENV[SYS]	= array();
$_ENV[DF]	= array();
$_ENV["mode"] = "";
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ){
file_put_contents('_debug_ini.txt', 'PHP Ini '.date('H:i:s').mb_substr(microtime(),1,7));
}
$_ENV[SYS]['RegisterShutdown'] = false;
$_ENV['user'] = -1;
$_gsTron = false;
$_ENV[SYS]['version'] = '25.151.21';
$_ENV[SYS]['IniSg'] = eGetMicrotime();
$_ENV[SYS]['MD5Session'] = null;
$_ENV[SYS]['fpFileSession'] = false;
$_ENV[SYS]['SlowSqlWarning'] = 0;
$_ENV[SYS]['AddFilter'] = array();
list(, $_ENV[SYS]['iEDes']) = explode('.', $_ENV[SYS]['IniSg']);
$_ENV[SYS]['queryString'] = (string)$_SERVER['QUERY_STRING'];
list($_ENV[SYS]['command']) = explode("?", $_ENV[SYS]['queryString']);
list($_ENV[SYS]['command']) = explode("&", $_ENV[SYS]['command']);
$_ENV[SYS]['fileType'] = eFileType($_ENV[SYS]['command']);
$_ENV[SYS]['localhost'] = ($_SERVER['SERVER_NAME']=="localhost");
$_ENV[SYS]['checkSession'] = (mb_substr($_ENV[SYS]['queryString'],0,2)!='R:');
$_gsID = getmypid();
$_getPhpStart = [];
$_Empresa = "";
$pedirlogin = false;
if( preg_match('/(\/edes\.php|\/edes\.php\?login1|\/edes\.php\?login2)$/u', $_SERVER['REQUEST_URI']) ){
if( isset($_POST['_SESS_']) ){
$_GET['_SESS_'] = $_POST['_SESS_'];
}
$pedirlogin = true;
}
if( $_SERVER['REQUEST_METHOD']=="PUT" ){
if( mb_substr($_SERVER['HTTP_REFERER'], -15)=='edes.php?login1' ){
include(DIREDES."itm/put2post.php");
}
if( empty($_SERVER['QUERY_STRING']) ){
include(DIREDES."itm/put2post.php");
$_ENV["_LoginNewField"] = true;
}
}
if( isset($_GET['_SESS_']) ){
SYS::sessionLog(__FUNCTION__, "Inicio cargar SESS: ".$_GET['_SESS_']);
list($key, $sess, $cont) = explode("-", $_GET['_SESS_']."--");
$_GET['_SESS_'] = "{$key}-{$sess}";
if( empty($_GET["_CONTEXT"]) ){
if( !preg_match('/^[0-9]*$/u', $cont) ){
SYS::sessionLog(__FUNCTION__, "CONTEXT: Contenido erroneo: ".$_GET["_CONTEXT"]);
exit;
}
$_GET['_CONTEXT'] = $cont;
}
if( !preg_match('/^['.preg_quote(S::$sessionChars).'\-]{45,65}$/u', $_GET['_SESS_']) ){
if(S::$__tronSession) eTronSession("1- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "SESS: Contenido erroneo: ".$_GET['_SESS_']);
exit;
}
if( !_SessionCheck() ){
if(S::$__tronSession) eTronSession("2- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "SESS: CRC");
exit;
}
$IP = S::getClientIP();
_IpCheck($IP, $key, $sess);
if(S::$__tronSession) eTronSession("1) ============================================= ".$_ENV[SYS]['queryString']);
$_ENV[SYS]['fileSession'] = '../_tmp/sess/'.$_GET['_SESS_'];
if( !file_exists($_ENV[SYS]['fileSession']) ){
if(S::$__tronSession) eTronSession("4- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "SESS: Not file - ".$_ENV[SYS]['fileSession']);
include(DIREDES.'sess_not_found.php');
exit;
}
if( ISCLI || gettype(strpos($_SERVER["QUERY_STRING"], "cluster&_AJAX=1&"))!="boolean" ){
$_ENV[SYS]['checkSession'] = false;
}
if( $_ENV[SYS]['checkSession'] ){
if(S::$__tronSession) eTronSession("   bloqueo (ini) ".$_ENV[SYS]['command'].' - Type['.$_ENV[SYS]['fileType'].']');
SYS::readSession();
}else{
if(S::$__tronSession) eTronSession("   bloqueo (NO) ".$_ENV[SYS]['command'].' - Type['.$_ENV[SYS]['fileType'].']');
include($_ENV[SYS]['fileSession']);
S::$_User = SESS::$_User;
$_ENV['user'] = SESS::$_User;
}
if( empty($_SERVER['HTTP_USER_AGENT']) || SESS::$MyExplorer!=md5($IP.$_SERVER['HTTP_USER_AGENT']) ){
if(S::$__tronSession) eTronSession("5- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "SESS: No Explorer");
exit;
}
if( isset(SESS::$SessionMaxLife) ){
if( SESS::$SessionMaxLife==-1 ){
}else if( SESS::$SessionMaxLife<date('U') ){
if( SESS::$SessionMaxLife==SESS::$_LoginTime ){
if(S::$__tronSession) eTronSession("6- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "SESS: logged out ".SESS::$SessionMaxLife.'=='.SESS::$_LoginTime);
exit;
}
include(DIREDES.'m/expire.inc');
}
}
SYS::sessionToMD5();
SYS::sessionLog(__FUNCTION__, "SESS: ok");
if( ISCLI ){
list(,,,$pk) = explode("-", $_ENV["PHPCLI-ID"]);
S::qQuery("update {$_ENV['eDesDictionary']}gs_download set status='G' where cd_download={$pk}");
}
}else{
if(S::$__tronSession) eTronSession("0) ============================================= ".$_ENV[SYS]['queryString'], !true);
if( mb_substr($_SERVER["QUERY_STRING"],0,11)=='E:$t/ed.gs/' ){
S::$_User = -2;
include(DIREDES."t/ed.gs");
exit;
}
}
if( isset($_ENV["_LoginNewField"]) && $_ENV["_LoginNewField"] ){
$name  = S::randon(32, '/^[a-zA-Z0-9]$/');
$value = S::randon(32, '/^[a-zA-Z0-9]$/');
SESS::$tmp[0] = "{$name}:{$value}";
echo "_prueba = {'{$name}':'{$value}'}; _entrar = true;";
eEnd();
}
@include_once('../_datos/config/setup.class.php');
$_ENV['ON']  = SETUP::$System["CheckboxOn"];
$_ENV['OFF'] = SETUP::$System["CheckboxOff"];
$_ENV['eDesDictionary'] = SETUP::$System['SysDictionary'];
if( !empty($_ENV['eDesDictionary']) ) $_ENV['eDesDictionary'] .= ".";
if( !isset(SETUP::$System["XMLASXLS"]) ) SETUP::$System["XMLASXLS"] = false;
date_default_timezone_set( SETUP::$System['TimeZone']);
ini_set('date.timezone'  , SETUP::$System['TimeZone']);
ini_set('default_charset', SETUP::$_Charset);
if( file_exists('../_tmp/log/url.on') ){
list($i) = explode(' ',microtime());
error_log(date('Y-m-d H:i:s:').mb_substr($i,2,8).': '.str_pad($_SERVER['HTTP_SEC_FETCH_DEST'],8).' : '.$_SERVER["QUERY_STRING"]."\n", 3, '../_tmp/log/url.txt');
}
include(DIREDES."context.php");
if( isset($_GET["_RUNBACKGROUND"]) ){
S::triggerBackground();
}
list($_Accion) = explode('&', $_SERVER['QUERY_STRING']);
$_oAccion = $_Accion;
if( !$pedirlogin && S::$_User>0 && SETUP::$System['Cache'] && mb_substr($_oAccion,-2)=='df' ){
$fileCch = eScriptToCache();
if( file_exists($fileCch) ){
$_SAVETRACE = SETUP::$LogTrace['cch'];
Estadistica('cch', 0, '', '');
_HeaderAdd();
readfile($fileCch);
exit;
}
}
$_PathHTTP = str_replace(CHR92,'/',getCWD());
if( mb_substr($_PathHTTP, -1)!='/' ) $_PathHTTP .= '/';
if( mb_substr($_SERVER["QUERY_STRING"],0,3)=='aa:' ){
include(__DIR__.'/activate_access.inc');
}
if( mb_substr($_SERVER["QUERY_STRING"],0,12)=='UPLOAD&FILE=' ){
include(__DIR__.'/up.inc'); exit;
}else if( mb_substr($_SERVER["QUERY_STRING"],0,14)=='DOWNLOAD&FILE=' ){
include(__DIR__.'/down.inc'); exit;
}else if( mb_substr($_SERVER["QUERY_STRING"],0,13)=='PHPLOAD&FILE=' ){
include(__DIR__.'/printtab.gs'); exit;
}else if( mb_substr($_SERVER["QUERY_STRING"],0,8)=='session=' ){
include(__DIR__.'/session.php');
}else if( $_SERVER["QUERY_STRING"]=="~EXE~" ){
$dim = getallheaders();
foreach($dim as $k=>$v){
list(,$kk,$nom) = explode("~",$k);
if( $k=="" ) continue;
$GLOBALS["_".$kk][$nom] = $v;
if( $kk=="SERVER" ) list(,$_SERVER[$nom]) = explode("?",$v);
}
unset($_GET["~EXE~"]);
if( !file_exists("../_tmp/php/curl_".$_GET['_SESS_']) ) exit;
@unlink("../_tmp/php/curl_".$_GET['_SESS_']);
}else if( isset($_GET["AP"]) && $_GET["AP"]!='' ){
if( $_GET["AP"][0]=='$' && $_GET["TE"]!="" && $_GET["SS"]<>"" ){
include(__DIR__.'/t/v30.gs'); exit;
}
}else if( isset($_GET["IC"]) && $_GET["IC"]!='' && $_GET["IC"][0]=='$' ){
if( mb_substr($_GET["IC"],-3)=='gif' ){
header("Content-Type: image/gif");
header("Last-Modified: ".gmdate("D, d M Y 00:00:01 T"));
header("Expires: ".gmdate("D, d M Y 23:50:50 T"));
header("Cache-Control: max-age");
die(file_get_contents(__DIR__.'/'.mb_substr($_GET["IC"],1)));
}
}
if( !empty($_SERVER["QUERY_STRING"]) ){
$tmp = explode("&_CONTEXT=", $_SERVER["QUERY_STRING"]);
if($_SERVER["QUERY_STRING"][0]=="~" && mb_strlen($tmp[0])==64) include(__DIR__.'/m/current_ver.inc');
if($_SERVER['QUERY_STRING']==mb_chr(71).'e'.mb_chr(83).'o'.'ft'.date('Ym')) die('Tecnología eDes Versión 2022-05, Copyright GeSoft SL. © 2001');
}
_HeaderAdd();
$_BinaryMode = array("i"=>"a", "I"=>"A",  "d"=>"b", "dR"=>"bR", "D"=>"B",   "v"=>"c", "vR"=>"cR",   "u"=>"m", "uR"=>"mR", "U"=>"M",   "dl"=>"bl", "vl"=>"cl", "ul"=>"mp");
list($Objeto, $NomScript) = explode(':', $_SERVER['QUERY_STRING'].":");
$Objeto = str_replace('_Accion=', '', $Objeto);
list($Objeto) = explode('&', $Objeto);
$_Mode = mb_substr($Objeto, 1);
if( !empty($_BinaryMode[$_Mode]) ) $_Mode = $_BinaryMode[$_Mode];
list($Objeto) = explode('&', $Objeto."&");
list($_DF) = preg_split("/(\?|\&)/u", $NomScript);
$_Object = mb_substr($Objeto, 0, 1);
$_SqlStart = false;
$_DBRLOCK = true;
$_ENV["_SqlStartSystem"] = true;
$_ENV["_CompressedPages"] = true;
$_ENV[SYS]["Object"] = $Objeto;
$_ENV[SYS]["DF"] = $_DF;
$_LOGFULLSTATUS = false;
function eSanitizeIn($txt){
if( empty($txt) ) return $txt;
return str_replace(
array(  "<"  ,   ">"  ),
array("&#60;", "&#62;"),
trim($txt)
);
}
function eSanitizeVar($txt){
if( empty($txt) ) return $txt;
if( gettype($txt)=="string" && mb_strlen($txt)>1 ){
if( ($txt[0]=='"' || $txt[0]=="'") && $txt[0]==mb_substr($txt, -1) ){
$txt = mb_substr($txt, 1, -1);
}
}
return str_replace(
array(  "<"  ,   ">"  ,   '"'  ,   "'"  ,   "`"  ),
array("&#60;", "&#62;", '&#34;', '&#39;', "&#96;"),
$txt
);
}
function eEntityEncode($v, $enter=true){
if( empty($v) ) return $v;
if( $enter ){
return str_replace(
array(  '"'  ,   "'"  ,   "`"  ,   '<'  ,   '>'  , CHR92 , CHR13, CHR10 , mb_chr(0)),
array('&#34;', '&#39;', '&#96;', '&#60;', '&#62;',  '&#92;',  '&#13;', '&#10;',    '' ),
$v
);
}else{
return str_replace(
array(  '"'  ,   "'"  ,   "`"  ,   '<'  ,   '>'  , CHR92 ),
array('&#34;', '&#39;', "&#96;", '&#60;', '&#62;',  '&#92;'),
$v
);
}
}
function eEntityDecode($v, $enter=true){
if( empty($v) ) return $v;
if( $enter ){
return str_replace(
array('&#34;', '&#39;', "&#96;", '&#60;', '&#62;', '&#92;', CHR13  , CHR10  ),
array(  '"'  ,   "'"  ,   "`"  ,   '<'  ,   '>'  , CHR92  , '&#13;', '&#10;'),
$v
);
}else{
return str_replace(
array('&#34;', '&#39;', "&#96;", '&#60;', '&#62;',  '&#92;'),
array(  '"'  ,   "'"  ,   "`"  ,   '<'  ,   '>'  , CHR92 ),
$v
);
}
}
foreach($_POST as $k=>$v){
if( preg_match('/^(_ENV|_SETUP|_SESS|_SYS|_EDF)$/u', $k) ){
die("Variable \"{$k}\" not supported by POST");
}
if( $k=="fuente" && eSubstrCount($_SERVER["QUERY_STRING"],'E:$t/ed.gs&')>0 ){
continue;
}
if( empty($v) ){
continue;
}
if( gettype($_POST[$k])!="array" ){
$v = $_POST[$k];
$total = 1;
if( preg_match('/^(cR|bR|mR|cl|bl|ml|l)$/u', $_Mode) ){
$pk = explode('|', '<>|<=|>=|!=|<|>|===|==|=');
$item = preg_split('/('.implode('|', $pk).')/u', $v, 0, PREG_SPLIT_DELIM_CAPTURE);
$total = count($item);
if( ($v[0]==")" && mb_substr($v, -1)=="(") || ($v[0]=="(" && mb_substr($v, -1)==")") ){
$total = -1;
}
}
if( $total>1 ){
for($n=0; $n<$total; $n++){
if( !in_array($item[$n], $pk) ){
$item[$n] = eEntityEncode($item[$n]);
}
}
$v = implode("", $item);
}else if( $total==-1 ){
$v = eSanitizeIn($v);
}else{
$v = eEntityEncode($v);
}
}
$_POST[$k]	 = $v;
${$k} 		 = $v;
$GLOBALS[$k] = $v;
}
if( !empty($_POST['_FIELDSWITHFILES']) ){
$nf = 0;
$tmp = explode('|', $_POST["_FIELDSWITHFILES"]);
for($n=0; $n<count($tmp)-1; $n++){
if( empty($_POST[$tmp[$n]]) ){
continue;
}
if( $_POST[$tmp[$n]]=='(uploading...)' ){
unset($_POST["_FILE_".$tmp[$n]]);
$tmp[$n] = "*";
$_ENV["SendSerialFile"] = true;
$nf++;
}else{
$FileTmp = '../_tmp/zip/'.S::$_User.'_'.$nf;
$nf++;
$_FILES[$tmp[$n]]['tmp_name'] = $FileTmp;
$GLOBALS[$tmp[$n].'_tmp_name'] = $FileTmp;
}
}
$_POST["_FIELDSWITHFILES"] = str_replace("*|", "", implode("|", $tmp));
}
foreach($_GET as $k=>$v){
if( $k=="_FILTER" ){
}
if( preg_match('/^(_ENV|_SETUP|_SESS|_SYS|_EDF)$/u', $k) ){
if( !(preg_match('/E\:\$t\/translate.php/u', $_SERVER["QUERY_STRING"]) && preg_match('/^\/_datos\/config\/(login|various)\.lng$/u', $_GET["_EDF"])) ){
}
}
if( !empty($v) && $v[0]==CHR92 ){
$v = str_replace(mb_substr($v,0,2), mb_substr($v,1,1), $v);
}
if( !empty($v) && ($v[0]=='"' || $v[0]=="'") && $v[0]==mb_substr($v,-1) ){
$v = mb_substr($v,1,-1);
}
$v = eEntityEncode($v);
$_GET[$k]	 = $v;
${$k}		 = $v;
$GLOBALS[$k] = $v;
if( $k=='_SEEK' ) $_SEEK = true;
if( $k=='_CALL' ) $_CALL = true;
}
$_LOGFULLTYPE = SETUP::$LogHistory['LogFullType'];
if( $_LOGFULLTYPE>0 ){
$_LOGFULLSTATUS = true;
$_LOGREQUEST = array("object"=>$_Object, "mode"=>$_Mode, "script"=>$_DF, "get"=>$_GET, "post"=>$_POST);
$_LOGANSWER = array();
}
if( isset($_GET['_SEEK']) ) $_SEEK = true;
if( isset($_GET['_CALL']) ) $_CALL = true;
if( !isset($_GET['_PSOURCE']) ) $_GET['_PSOURCE'] = "WWORK";
if( !isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ) $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'es';
$argv[0] = $_SERVER['QUERY_STRING'];
$Dir_ = __DIR__.'/';
if( WINDOW_OS ) $Dir_ = str_replace('\\','/',$Dir_);
if( isset($_TRON_) && $_TRON_==1 ){
$argv[0] = '';
$_gsTron = true;
$_SERVER['QUERY_STRING'] = str_replace('_TRON_=1', '', $_SERVER['QUERY_STRING']);
if( mb_substr($_SERVER['QUERY_STRING'],-1)=='&' ) $_SERVER['QUERY_STRING'] = mb_substr($_SERVER['QUERY_STRING'], 0, -1);
}
if( $_SERVER["QUERY_STRING"]=='UPLOAD' ){
include($Dir_.'upload.gs');
eEnd();
}
$_WidthField = array();
$_IntranetPrefix = '';
$_pxH_ = '';
$_pxW_ = '';
$_Trace = array();
$_CheckBox = array();
$_CheckBox['H']['ON']  = '<img src=g/tf_1.gif>';
$_CheckBox['H']['OFF'] = '';
$_CheckBox['P']['ON']  = 'S';
$_CheckBox['P']['OFF'] = '';
$_CheckBox['X']['ON']  = 'S';
$_CheckBox['X']['OFF'] = '';
$_IconsSubmit = array(
'I'=>array('','g/op_insert.gif'),
'D'=>array('','g/op_delete.gif'),
'V'=>array('','g/op_view.gif'),
'U'=>array('','g/op_update.gif'),
'Q'=>array('','g/op_seek.gif'),
'C'=>array('','g/op_close.gif')
);
$_Include = '';
$_TmpInclude = '';
$_TmpPhpFile = 0;
$php_errormsg = '';
$_SqlInit = array();
$_DEBUG = 0;
$_TRACELABEL = '';
$_CheckBoxSave = [$_ENV['ON'], $_ENV['OFF'], '<>'.$_ENV['ON']];
$_EOD = '';
$eDes = new eDes();
$_STOP = isset($_GET['_STOP']);
$_NOBUTTON = isset($_GET['_NOBUTTON']);
$__Lng = array('');
$_Lng = array();
$_LanguageAdd = false;
$_LanguageTron = '';
if( isset($__) ) unset($__);
$_RastrearSESS = false;
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==4 ) eLogDebugIni('[HTML Ini]');
if( $_gsTron ){
eTron('-> Query:['.$_SERVER['QUERY_STRING'].']');
}
$_eDesTitle = ((mb_substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2)=='es') ? 'Tecnología eDes' : 'eDes Technology');
if( $_SERVER['QUERY_STRING']!='' && $_SERVER['QUERY_STRING'][0]==mb_chr(126) ){
if( mb_substr($_SERVER['QUERY_STRING'],1,1)=='E' ) include($Dir_.'emisor.gs');
if( mb_substr($_SERVER['QUERY_STRING'],1,1)=='R' ) include($Dir_.'receptor.gs');
}
if( preg_match('/^(gsmain|gscreate)/u', $_SERVER['QUERY_STRING']) ){
$app = explode("/", $_SERVER['QUERY_STRING'])[0];
if( preg_match('/^(gsmain|gscreate)$/u', $app) ){
include(__DIR__.'/m/'.$app.'.inc');
}
}
$__Enter = "\n";
$_DimDebug = array();
$_SAVETRACE = false;
$_LimitOn = false;
$_TReg = 0;
$_Records = &$_TReg;
$_Result = '';
$_HndDB = false;
$_Conexion = &$_HndDB;
$_IdInsert = array();
$_IdRegistro = array();
$_InsertId = &$_IdRegistro;
$_Fila = array();
$_vF = array();
if( $_SERVER['REQUEST_METHOD']=='POST' ) $_vF = $_POST;
$_ObjetoIni = '';
$_SQL_ = '';
$_MacroField = array();
$_TypeField = array();
$_ePermission = array();
$__eLINE__ = 0;
$__iSCRIPT__ = '';
$__iniSCRIPT__ = '';
$__EVAL__ = '';
$__DIR__ = eGetCWD();
$_ContextReadOnly = '';
$_ContextFieldsMD5 = array();
$_ContextFieldsADD = array();
$_FILE_PHPSTART = array();
$_PLUGIN = array();
if( mb_substr($_SERVER['QUERY_STRING'],0,2)!='R:' ){
$CheckDB = true;
ob_start();
ob_implicit_flush(0);
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=".SETUP::$_Charset);
$dim = explode(',', 'Fa,FA,Fb,FbR,FB,Fc,FcR,Fm,FmR,FM,Ga,GA,Gb,GbR,GB,Gc,GcR,Gm,GmR,GM,L,Ll,Lbl,Lcl,Lml,Lgl,E,S');
if( !$pedirlogin && empty($_GET['_DB']) && in_array(explode(':', $_ENV[SYS]['queryString'])[0], $dim) ){
if( !class_exists('SESS') ){
SYS::sessionLog(__FUNCTION__, "SESS no definida");
exit;
}
$_Sql 				= SESS::$sql['driver'];
$_SqlHostName 		= SESS::$sql['hostname'];
$_SqlDiccionario 	= SESS::$sql['database'];
$_SqlUsuario 		= SESS::$sql['user'];
$_SqlPassword 		= SESS::$sql['password'];
$_SqlTransaction 	= SESS::$sql['transaction'];
$_SqlInit 			= SESS::$sql['init'];
$_SqlPDOType 		= SESS::$sql['pdoType'];
$_SqlPDOConnect 	= SESS::$sql['pdoConnect'];
include(DIREDES.$_Sql.'.inc');
}
unset($dim);
}else{
$CheckDB = false;
}
if( isset($_POST['pp']) ){
SESS::$_User = 0;
S::$_User = 0;
$_SERVER['QUERY_STRING'] = str_replace('~', '&', $_POST['pp']);
$_SERVER['QUERY_STRING'] = str_replace('__SD__=', '', $_SERVER['QUERY_STRING']);
}
$_PathCSS = 'css';
$_PathIMG = 'g';
if( class_exists('SESS') ){
if( SESS::$_DEBUGSQL ) $_DEBUG = 4;
$_PathCSS = SESS::$_PathCSS;
$_PathIMG = SESS::$_PathIMG;
if( $_ENV[SYS]['checkSession'] ){
if( SESS::$sql['driver'] ){
eSerialAdd();
}
}
}
if( $pedirlogin ){
SYS::sessionLog(__FUNCTION__, ">>> Pedir login");
include(__DIR__.'/login.inc');
}else{
$_User = SESS::$_User;
$_Node = SESS::$_Node;
$_Tree = SESS::$_Tree;
$_Connection_ = SESS::$_Connection_;
}
define('_LABEL'		,  0);
define('_FIELD'		,  1);
define('_EDITION'	,  2);
define('_CONTROL'	,  3);
define('_SIZE'		,  4);
define('_WIDTH'		,  5);
define('_MODE'		,  6);
define('_DEFAULT'	,  7);
define('_CONDITION'	,  8);
define('_MESSAGE'	,  9);
define('_TAB'		, 10);
define('_STATUS'	, 11);
define('_OFIELD'	, 12);
define('_ALIAS'		, 13);
define('_SQL'		, 14);
define('_VALUE'		, 15);
define('_OOFIELD'	, 17);
define('_CONSTANTE'	, 18);
define('_PLUGIN'	, 19);
$_User = SESS::$_User;
$_Node = SESS::$_Node;
$_Connection_ = SESS::$_Connection_;
$_Tree = SESS::$_Tree;
$_Development = SESS::$_Development;
$_DevelopmentSrv = SETUP::$_DevelopmentSrv;
$_CURRENT_PATH = eGetCWD();
$_PKSeek = '';
$_CallLabel = '';
if( !isset(SETUP::$System['Call3CXTab']) ){
SETUP::$System['Call3CXTab'] = false;
}
$_CSSNO = false;
$_CSSFontSize = "";
if( isset($_GET["ChartXML"]) ){
include(__DIR__.'/m/chart_swf.inc');
}
if( $Objeto!='R' && $Objeto[0]=='R' && mb_substr($Objeto,1,1)!=':' ){
include(__DIR__.'/m/remotesrv.inc');
}
if( $_gsTron ) eTron("[ {$Objeto} ][ {$_Accion} ][ {$NomScript} ][ {$_SERVER['QUERY_STRING']} ]");
if(		  mb_strtoupper($Objeto)=='PLG' ){
$_SERVER['QUERY_STRING'] = mb_substr( $_SERVER['QUERY_STRING'], mb_strpos($_SERVER['QUERY_STRING'],':')+1 );
if( eSubstrCount($NomScript,'&') > 0 ) $NomScript = mb_substr( $NomScript, 0, mb_strpos($NomScript,'&') );
if( $_gsTron ) eTron('{19}'.$Dir_.'plg/'.$NomScript);
include($Dir_.'plg/'.$NomScript);
eEnd();
}else if( mb_strtoupper($Objeto)=='LNG' ){
echo 'var _lng = {'.eLngLoad(eScript($NomScript),'',3).'}';
eEnd();
}else if( mb_strtoupper($Objeto)=='IMG' ){
include($Dir_.'ver_img.gs');
exit;
}else if( mb_substr($Objeto,0,8)=='Desktop=' ){
$__='{#}eDes{#}';
include($Dir_.'login_tab.gs');
eEnd();
}else if( $Objeto=='JSON' ){
ob_end_clean();
ob_implicit_flush(1);
header('Content-type: application/json; charset=utf-8');
list($NomScript) = explode('&',$NomScript);						    //echo json_encode($jsondata);
readfile(eScript($NomScript).'.json');
exit;
}else if( $Objeto=='cluster222' ){
$file = "../_tmp/zip/prueba.pdf";
$fo = fopen($file, 'wb');
fwrite($fo, $_POST['content']);
fclose($fo);
clearstatcache();
echo "ok";
eEnd();
}else if( $Objeto=='cluster-ok' ){
$oFile = eScript($_POST["file"]);
if( $_POST["position"]==1 ){
if( mb_substr($_POST["content"], 0, 22)=="data:image/png;base64," ){
$_POST["content"] = mb_substr($_POST["content"], 22);
}
@unlink($oFile);
@unlink($oFile.'.tmp');
}
$fo = fopen($oFile.'.tmp', 'ab');
fwrite($fo, base64_decode($_POST["content"]));
fclose($fo);
if( $_POST["position"]==$_POST["total"] ){
clearstatcache();
@rename($oFile.'.tmp', $oFile);
}
echo "ok";
eEnd();
}else if( $Objeto=='cluster' ){
$oFile		 = eScript($_POST["file"]);
$type		 = $_POST['type'];
$chunkNumber = $_POST['position']*1;
$chunkTotal  = $_POST['total']*1;
$content	 = $_POST['content'];
$id			 = $_POST['id'];
if( $type=="async" ){
$fileCheck = DIRTMP."{$_ENV['user']}_{$id}.file";
if( !file_exists($fileCheck) ){
eTron("cluster: exit 1");
echo "exit";
SYS::sessionRemove();
}
$dataCheck = file($fileCheck, FILE_IGNORE_NEW_LINES);
}
$tempFile   = $_FILES["content"]["tmp_name"];
$fileTarget = $oFile;
if( $chunkNumber==1 ){
@unlink($fileTarget);
if( !empty($tempFile) ){
move_uploaded_file($tempFile, $fileTarget);
}else{
list($type, $data) = explode(';', $content);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);
file_put_contents($fileTarget, $data);
}
}else{
if( !is_readable($tempFile) ){
error_log(date('Y-m-d H:i:s: ')."1\n", 3, '_cluster.txt');
eTron("1 no se puede leer {$tempFile}");
sleep(3);
}
if( !is_readable($fileTarget) ){
error_log(date('Y-m-d H:i:s: ')."2\n", 3, '_cluster.txt');
eTron("2 no se puede leer {$fileTarget}");
sleep(3);
}
$buffer = file_get_contents($tempFile);
if( gettype($buffer)=="boolean" ){
error_log(date('Y-m-d H:i:s: ')."3\n", 3, '_cluster.txt');
eTron("3 no se puede leer {$tempFile}");
sleep(5);
$buffer = file_get_contents($tempFile);
if( gettype($buffer)=="boolean" ){
error_log(date('Y-m-d H:i:s: ')."4\n", 3, '_cluster.txt');
eTron("4 no se puede leer {$tempFile}");
sleep(5);
$buffer = file_get_contents($tempFile);
}
}
try{
$fp = fopen($fileTarget, "a+");
fwrite($fp, $buffer);
fclose($fp);
} catch (Exception $e) {
error_log(date('Y-m-d H:i:s: ')."5\n", 3, '_cluster.txt');
error_log(date('Y-m-d H:i:s: ').$e->getMessage()."\n", 3, '_cluster.txt');
}
if( $type=="async" && ($_POST['field']!=$dataCheck[0] || filesize($fileTarget) > ((int)$dataCheck[1]+2024)) ){
eTron("cluster: exit 2");
echo "exit";
SYS::sessionRemove();
}
}
if( $type=="async" && $chunkNumber==$chunkTotal ){
include(DIREDES."async_file.php");
}
echo "ok";
eEnd();
}
if( !isset($_GET['_SPIDER_']) ) $_GET['_SPIDER_'] = "";
if( $_GET['_SPIDER_']=='E' ) include(__DIR__.'/m/spider_e.inc');
else if( SESS::$spider['opcion']=='E' ) include(__DIR__.'/m/spider_op_e.inc');
$_SANITIZE = array(
"_CONTEXT" 	=> 'int'
,"_ACCESS"  	=> '/^[0-9\/]*$/u'
,"_CACHE_"		=> 'int'
,"_SESS_"		=> '/^[a-zA-Z0-9\-\_\,\:\;\=\*\(\)\[\]\{\}\#\@\|]{41,60}$/u'
,"_DB"			=> '/^[a-zA-Z0-9\_\-]{3,30}$/u'
,"_PSOURCE" 	=> '/^[a-zA-Z0-9\$\:\_\.\/]{1,60}$/u'
,"_PERSISTENTDB"=> '/^[a-zA-Z0-9\_\-]{3,30}$/u'
,"_PERSISTENTVAR"=> '/^[a-zA-Z0-9\_\-]{3,30}$/u'
,"_PSCRIPT"		=> '/^[a-zA-Z0-9\_\-\.\:\/]{3,60}$/u'
,"_SHOWFILTER"	=> '/^(0|1)$/u'
,"_ASSIGN"		=> '/^[0-1abcmr]{1}$/u'
,"_SEEK"		=> '/^[a-zA-Z1]{0,2}$/u'
,"_TRANSPARENT"	=> '/^(1)$/u'
,"_IWORK"		=> '/^(2)$/u'
,"_BAK"			=> '/^(1)$/u'
,"_WSList"		=> '/^(1)$/u'
,"_NEWIFRAME"	=> '/^(1)$/u'
,"_SUBINSERT"	=> '/^(1)$/u'
,"_RECALCOPTIONSINLIST"	=> '/^(1)$/u'
,"_FORMBUTTONS"	=> '/^[a-zA-Z]{1,10}$/u'
,"_ISUBLIST"	=> '1'
,"_CSSBIG"		=> 'int'
,"_ISLBlankRecords"=> 'int'
,"_NOEVENT"		=> '1'
,"_EXPORTLIST"	=> '/^[A-Z]{3,5}$/u'
,"_gs_formato_" => '/^(PDF|X|P|A|T|M|V)$/u'
);
$_DBINSERTONLY = false;
switch($Objeto[0]){
case 's':
$_DesdeEditList = true;
case 'S':
$_LOGFULLSTATUS = false;
eContextGet();
if( $Objeto=='ST' ) include(__DIR__.'/st.inc');
if( eSubstrCount($_Accion,'.')==0 ) $_Accion .= '.ldf';
$NomScript = 'sub_select.gs';
if( $_CacheSrv=='S' ){
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
break;
case 'T':
case 'F':
SYS::seedKey();
if( empty($_Mode) ) $_Mode = "c";
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'F';
if( eSubstrCount($_Accion,'.')==0 ){
$_Accion .= '.edf';
$_DF .= '.edf';
}
$NomScript = '_ficha.gs';
break;
case 'L':
SYS::seedKey();
if( empty($_Mode) ) $_Mode = "l";
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'L';
if( eSubstrCount($_Accion,'.')==0 ){
$_Accion .= '.edf';
$_DF .= '.edf';
}
$NomScript = '_lista.gs';
break;
case 'G':
SYS::seedKey();
if( empty($_Mode) ) $_Mode = "c";
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'G';
if( eSubstrCount($_Accion,'.')==0 ){
$_Accion .= '.gdf';
$_DF .= '.gdf';
}
$NomScript = '_gficha.gs';
break;
case 'P':
header("Cache-control: private, max-age=$expires, pre-check=$expires");
header('Pragma: private');
header("Expires: Mon, 18 May 1959 18:05:59 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header('Content-Type: text/plain;');
case 'I':
case 'E':
if( SESS::$_D_!='' && mb_substr($_SERVER["QUERY_STRING"],0,10)=='E:$t/ed.gs' ){
}else if( $_SERVER["QUERY_STRING"]!='E:$estadistica.gs&F=1' ) eContextGet();
_TraceDevelopment();
if( SESS::$_CacheSrv=='S' && isset($_GET['_CACHE']) ){
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
if( mb_substr($NomScript,0,8)=='CallSrv=' ){
include($Dir_.'callsrv.gs');
eEnd();
}
if( count($_POST)==1 && $_POST["_PK_MULTISELECT_"]<>"" ){
include($Dir_.'listmulti.inc');
}
$xQUERY = $_SERVER['QUERY_STRING'];
$oQUERY = $_SERVER['QUERY_STRING'];
if( eSubstrCount($xQUERY, '.sdf')>0 && eSubstrCount($xQUERY, '$t/31.gs')==0 && mb_substr($_SERVER["QUERY_STRING"],0,10)!='E:$t/ed.gs' ){
$SelInfoWidthTab = true;
include($Dir_.'selinfo.gs');
eEnd();
}
if( eSubstrCount($_SERVER['QUERY_STRING'], '_REMOTE_')>0 ){
list($_SERVER['QUERY_STRING']) = explode('_REMOTE_', $_SERVER['QUERY_STRING']);
if( mb_substr($_SERVER['QUERY_STRING'],-1)=='&' ) $_SERVER['QUERY_STRING'] = mb_substr($_SERVER['QUERY_STRING'],0,-1);
}
list(,$_SERVER['QUERY_STRING']) = explode(':', $_SERVER['QUERY_STRING']);
if( mb_substr($_SERVER['QUERY_STRING'],0,3)=='$t/' ){
$__='{#}eDes{#}';
}
if( eSubstrCount($_SERVER['QUERY_STRING'], '?')>0 ){
list($NomScript,) = explode('?',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = mb_substr( $_SERVER['QUERY_STRING'], mb_strpos($_SERVER['QUERY_STRING'],'?')+1 );
$oNomScript = $NomScript;
$NomScript = eScript( $NomScript );
}else if( eSubstrCount($_SERVER['QUERY_STRING'], '&')>0 ){
$tmp = explode('&',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = mb_substr( $_SERVER['QUERY_STRING'], mb_strpos($_SERVER['QUERY_STRING'],'&')+1 );
array_shift($argv);
array_shift($_GET);
$oNomScript = $NomScript;
$NomScript = eScript( $tmp[0] );
}else{
$_SERVER['QUERY_STRING'] = '';
for($i=0; $i<count($argv)-1; $i++) $argv[$i] = $argv[$i+1];
array_pop($argv);
$oNomScript = $NomScript;
$NomScript = eScript( $NomScript );
}
if( $_gsTron ) eTron('{8}'.$NomScript);
if( eSubstrCount($NomScript,'&')>0 ){
list($NomScript) = explode('&',$NomScript);
}
if( !file_exists($NomScript) ){
if( mb_substr($NomScript,-5)=='.test' ){
echo "if(top.gsEdit) top.gsEdit(window, '{$NomScript}');";
}else{
if( $_gsTron ) eTron('{E8}'.$NomScript);
eTrace('Fichero '.((SESS::$_D_=="")?"":"'{$NomScript}' ").'no encontrado.');
KeyEditFile($oNomScript);
}
eEnd();
}
if( SESS::$sql['statistics'] && mb_substr($xQUERY,0,3)!='E:$' ){
if( SETUP::$LogTrace[$Objeto[0]] ){
$xQUERY = mb_substr($xQUERY,2);
if( eSubstrCount($xQUERY,'&_PSOURCE=')>0 ) $xQUERY = mb_substr($xQUERY, 0, mb_strpos($xQUERY, '&_PSOURCE='));
$xQUERY = str_replace("'",'"',$xQUERY);
S::qQuery("
insert into {$_ENV['eDesDictionary']}gs_acceso
(cd_gs_toperacion,      conexion    , objeto, modo,					edf		   , tabla,   parametros  , pagina, parametro, registros, cd_gs_user, cd_gs_node,             cdi           )
values
(     'EXE'      , '{$_Connection_}',   'E' ,  '' , '".mb_substr($xQUERY,0,250)."',   '' , '{$NomScript}',   ''  ,    ''    ,     1    , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."' )"
);
}
if( isset(SETUP::$LogHistory['LogGsAccessFile']) && SETUP::$LogHistory['LogGsAccessFile']!='' ){
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$oQUERY}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
if( $Objeto[0]!='P' ) eInit();
if(!$_ENV[SYS]['RegisterShutdown']){
register_shutdown_function('_ExitPHP');
$_ENV[SYS]['RegisterShutdown'] = true;
}
$_Include = $NomScript;
$_SourceScript = $NomScript;
if( isset($_GET["_FILTERSUBLIST"]) ){
include(DIREDES."sublist_filter.php");
}else{
include($NomScript);
}
eEnd();
case 'Y':
include($Dir_.'selinfo.gs');
eEnd();
case 'M':
include($Dir_.'relation.inc');
eEnd();
case 'C':
eContextGet();
include( $Dir_.'chart_multiple.inc' );
case 'U':
_TraceDevelopment();
$__='{#}eDes{#}';
$NomScript = 'login_ser.gs';
break;
default:
include(DIREDES."edesfree.php");
eEnd();
}
$_Accion = mb_substr($_Accion, 1);
if( $_gsTron ) eTron('{19}'.$Dir_.$NomScript);
include(DIREDES.$NomScript);
eEnd();
function eSubstrCount($here, $seek=''){
if( $here==null ) return 0;
if( empty($seek) || $seek==null ) return 0;
return mb_substr_count($here, $seek);
}
function eInclude(){
global $Dir_;
error_reporting(_ERROR_REPORTING);
for($i=0; $i<func_num_args(); $i++){
$File = mb_strtolower(func_get_arg($i));
if( mb_substr($_SERVER['HTTP_HOST'],0,9)=="localhost" && file_exists($Dir_."{$File}.enc") ){
if( !function_exists("_zipSource") ){
include_once($Dir_."itm/zipsource.php");
}
$txt = _zipSource($Dir_."{$File}.enc");
$txt = gzcompress($txt, 6);
file_put_contents($Dir_."{$File}.enz", mb_substr($txt,18).mb_substr($txt,0,18));
}
if( file_exists($Dir_."{$File}.enz") ){
$txt = file_get_contents($Dir_."{$File}.enz");
eval(gzuncompress(mb_substr($txt,-18).mb_substr($txt,0,-18)));
continue;
}
if( !mb_strstr($File,'.') || (mb_substr($File,-6)=='.class' && eSubstrCount($File,'.')==1) ){
$File .= '.inc';
include_once($Dir_.$File);
}else{
include_once(eScript($File));
}
}
}
function gsInclude(){
global $Dir_;
for($i=0; $i<func_num_args(); $i++){
$File = mb_strtolower(func_get_arg($i));
if( !mb_strstr($File,'.') ) $File .= '.inc';
include_once($Dir_.$File);
}
}
function eRun(){
$Para1 = func_get_arg(0);
list($File, $Func) = explode('.', trim($Para1));
if( $Func=='' ) $Func = $File;
include_once($GLOBALS["Dir_"].'itm/'.mb_strtolower($File).'.php');
$DimArg = array(); for($i=1; $i<func_num_args(); $i++) $DimArg[] = func_get_arg($i);
call_user_func_array(str_replace('.','',$Para1), $DimArg);
}
function eExecute($url, $post=array(), $get=array()){
eInclude('itm/execute');
return _eExecute($url, $post, $get);
}
function eQuote($Dim){
if( is_Array($Dim) ){
foreach($Dim as $k=>$v){
if( is_string($v) ) $Dim[$k] = addslashes(trim($v));
}
return $Dim;
}else{
return addslashes(trim($Dim));
}
}
function qSetup(){
return _LoadSqlIni('../_datos/config/sql.ini');
}
function qOpen($sql="sql", $class=false){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit, $_SqlTransaction;
include("../_datos/config/{$sql}.ini");
if( $class ){
$pnt = qConnectSystem(true);
$pnt->qConnect($sql);
return $pnt;
}else{
$sufi = ($class)? '.class':'';
include_once(__DIR__."/{$_Sql}{$sufi}.inc");
}
}
function _LoadSqlIni($_Diccionario, $TipoDB=''){
global $Dir_, $_gsTron;
if( $_Diccionario=='_') return;
$txt = trim(@file_get_contents( $_Diccionario ));
if( mb_substr($txt,0,2)!='<'.'?' ){
return gzuncompress($txt);
}else{
return mb_substr($txt, ((mb_strtoupper(mb_substr($txt,0,5))=='<'.'?PHP') ? 5 : 2), -2);
}
}
function KeyEditFile($fch, $verIFrame=true){
include(__DIR__.'/m/keyeditfile.inc');
}
function _ShowCallSrv(){
eJS('if( window.frameElement.name=="TLF" ) top.S(window.frameElement).block();');
}
function eStripTags($txt, $print=false){
$txt = str_replace(
array("<="	  ,	"< "	, " >="	   , "<>"	     , "< "    ),
array("&#60;=", "&#60; ", " &#62;=", "&#60;&#62;", "&#60; "),
$txt
);
$txt = strip_tags($txt);
$txt = str_replace(
array("&#60;=", "&#60; ", " &#62;=", "&#60;&#62;", "&#60; "),
array("<="	  ,	"< "	, " >="	   , "<>"	     , "< "    ),
$txt
);
if( $print ){
$txt = str_replace(
array('&#92;', '&#43;', '&#39;', '&#60;','&lt;', '&#62;', '&gt;'),
array('\\'   , '+'    , "'"    , "<"    , "<"  , ">"    , ">"   ),
$txt
);
}
return $txt;
}
function OpenDF($File, $Check=1){
global $_CryptDF, $_Script_;
$_Script_ = $File;
if( $_CryptDF ){
return gzfile($File);
}else{
if( $Check ){
if( file_exists($File)!=1 ){
echo "No existe el fichero".((SESS::$_D_!='') ? " [{$File}]":"...");
if( eSubstrCount($File,'/edes.v3/')==1 ){
list(,$fch) = explode('/edes.v3/',$File);
$fch = '$'.$fch;
}else{
list(,$fch) = explode('/d/',$File);
}
KeyEditFile($fch);
exit;
}
if( is_readable($File)!=1 ) die('5.No se puede leer'.(($GLOBALS['_Tree']==1) ? " [$File]":''));
}
if( mb_substr($File,-4)=='.zdf' ){
$txt = file_get_contents($File);
if( mb_substr($txt,0,5)=='eDes ' ){
return explode("\n", gzuncompress(mb_substr($txt,5)));
}else{
return explode("\n", $txt);
}
}else{
if( SESS::$spider['opcion']!="" ){
include_once($Dir_."itm/spider.php");
if( SESS::$spider['opcion']=="S" ) __SpiderScript($File);
}
return file($File);
}
}
}
function ePF(){
include_once(__DIR__.'/epf.php');
call_user_func_array("_PF", func_get_args());
}
function ePPF(){
include_once(__DIR__.'/epf.php');
call_user_func_array('_PPF', func_get_args());
}
function eHide($field, $nivel, $ocultar=true, $window=''){
$ocultar = ($ocultar)? 'true':'false';
eJS("{$window}eHide('{$field}', '{$nivel}', {$ocultar});");
}
function ePHide($field, $nivel, $ocultar=true){ eHide($field, $nivel, $ocultar, "window.frameElement.WOPENER."); }
function eShow($field, $nivel, $ocultar=true, $window=''){
$ocultar = ($ocultar)? 'true':'false';
eJS("{$window}eShow('{$field}', '{$nivel}', {$ocultar});");
}
function ePShow($field, $nivel, $ocultar=true){ eShow($field, $nivel, $ocultar, "window.frameElement.WOPENER."); }
function eEF($field, $on, $css='', $imgOn='', $window=''){
if( gettype($on)=='boolean' ) $on = ($on)? 'true':'false';
if( $imgOn!='' ){
if( gettype($imgOn)=='boolean' ) $imgOn = ",".(($imgOn)? 'true':'false');
}
eJS("{$window}eEF('{$field}', {$on}, '{$css}' {$imgOn});");
}
function ePEF($field, $on, $css='', $imgOn=''){
eEF($field, $on, $css, $imgOn, "window.frameElement.WOPENER.");
}
function eJS($txt){
echo "<script type='text/javascript'>{$txt}</script>";
}
function eExeScript($txt){
eJSAnswer($txt);
}
function eJSAnswer($txt){
$charset = SETUP::$_Charset;
eInit();
echo "<!DOCTYPE HTML><HTML><HEAD><META http-equiv='Content-Type' content='text/html; charset={$charset}'></HEAD><BODY><SCRIPT type='text/javascript'>";
echo "var win = window.frameElement.WOPENER; if(win.eHideBusy) win.eHideBusy();";
echo $txt;
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
function eHTML($script='', $op='', $title='', $ret=false){
global $_eDesTitle, $__Enter;
if( SESS::$_D_=='' || (SESS::$_D_!='~' && $script!='' && $script[0]=='$') ) $script = '';
if($ret) $__Enter = '';
$charset = SETUP::$_Charset;
header("X-Frame-Options: SAMEORIGIN");
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1;mode=block');
$lng = "";
if( isset(SESS::$_LANGUAGE_) && !empty(SESS::$_LANGUAGE_) ) $lng = SESS::$_LANGUAGE_;
if( empty($lng) && !empty($_COOKIE["e-language"]) ) $lng = $_COOKIE["e-language"];
if( empty($lng) && isset(SESS::$_LanguageDefault) && !empty(SESS::$_LanguageDefault) ) $lng = SESS::$_LanguageDefault;
if( empty($lng) && isset(SETUP::$LanguageDefault) ) $lng = SETUP::$LanguageDefault;
$txt = "<!DOCTYPE HTML><HTML lang='{$lng}'><HEAD>".
"<META http-equiv='Content-Type' content='text/html; charset={$charset}'>".$__Enter.
"<META NAME=eDes gsScript='{$script}' gsOp='{$op}'>".$__Enter.
"<META http-equiv='imagetoolbar' CONTENT='no'>".$__Enter.
"<META NAME='Generator' CONTENT='{$_eDesTitle}'>".$__Enter.
"<META NAME='Copyright' CONTENT='".SETUP::$System['CopyRight']."'>".$__Enter.
"<TITLE>{$title}</TITLE>".$__Enter;
if($ret){
return $txt;
}
echo $txt;
}
function eSubListInsert($subList, $dim, $padre){
if( $padre<>"" && mb_substr($padre,-1)<>"." ) $padre.=".";
echo $padre."eSubListInsert('{$subList}', Array(";
for($n=0; $n<count($dim); $n++){
if( $n>0 ) echo ",";
echo "'".AddSlashes($dim[$n])."'";
}
echo "));";
}
function eMid($txt, $ci, $cf, $apostro=true){
$i = mb_strpos($txt,$ci); if( $i===false ) return NULL;
if( is_string($cf) ){
$f = mb_strpos($txt, $cf, $i+1);
}else{
$f = mb_strpos($txt, $cf, $i);
if( $f===false ) return NULL;
}
$i += mb_strlen($ci);
$f--;
$txt = mb_substr($txt, $i, $f-$i+1);
if( !$apostro && ($txt[0]=='"' || $txt[0]=="'")) $txt = mb_substr($txt,1,-1);
return $txt;
}
function eLeft($txt, $ci){
if( gettype($ci)=="string" ){
$i = mb_strpos($txt, $ci); if( $i===false ) return NULL;
$i++;
}else $i = $ci;
return mb_substr($txt, 0, $i);
}
function eRight($txt, $ci){
if( gettype($ci)=="string" ){
$i = mb_strpos($txt, $ci); if( $i===false ) return NULL;
$i++;
}else $i = $ci;
return mb_substr($txt, $i);
}
function qConnectSystem($nomSql='', $fileIni='', $GetPuntero=false){
if( $nomSql=='' ){
$nomSql = SESS::$sql['driver'];
$fileIni = '.';
}
if( !class_exists("SETUP") ){
@include_once('../_datos/config/setup.class.php');
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
return S::$handleSys;
}
function Estadistica($Operacion, $TReg, $xParametros='', $xTabla='', $xSubModo=''){
global $_REMOTE_, $_L_;
global $_Node, $_User, $_Trace, $_SAVETRACE;
$_Connection_ = SESS::$_Connection_;
$Objeto = $Modo = $EDF = $Parametros = '';
$tmp = mb_substr($_SERVER['QUERY_STRING'], 0, 4);
if( eSubstrCount($tmp, ':')>0 ){
$Objeto = $tmp[0];
$Modo   = mb_substr($tmp,1,mb_strpos($tmp,':')-1);
if( $xSubModo!='' ) $Modo = $xSubModo;
$i = mb_strpos($_SERVER['QUERY_STRING'],':')+1;
if( eSubstrCount( $_SERVER['QUERY_STRING'], '?' ) > 0 ){
$p = mb_strpos( $_SERVER['QUERY_STRING'], '?' );
$EDF = mb_substr( $_SERVER['QUERY_STRING'], $i, $p-$i );
$Parametros = mb_substr( $_SERVER['QUERY_STRING'], $p+1 );
}else if( eSubstrCount( $_SERVER['QUERY_STRING'], '&' ) > 0 ){
$p = mb_strpos( $_SERVER['QUERY_STRING'], '&' );
$EDF = mb_substr( $_SERVER['QUERY_STRING'], $i, $p-$i );
$Parametros = mb_substr( $_SERVER['QUERY_STRING'], $p+1 );
}else{
$EDF = mb_substr( $_SERVER['QUERY_STRING'], $i );
}
if( $Modo=='' && mb_substr($tmp,0,2)=='D:' ){
$Parametros = str_replace( 'WHO=1', '' , $Parametros );
$Parametros = str_replace( 'FILE=', '' , $Parametros );
$Parametros = trim($Parametros);
if( $Parametros[0]=='&' ) $Parametros = mb_substr( $Parametros, 1 );
}
$Parametros = urldecode($Parametros);
$Parametros = str_replace( "'", '"' , $Parametros );
$Parametros = str_replace( CHR92, '' , $Parametros );
$Parametros = trim(mb_substr( $Parametros,0, 250 ));
if( $xParametros!='' ) $Parametros = $xParametros;
}
if( $_L_!='' ){
$tmp = $_SERVER['QUERY_STRING'];
if( eSubstrCount($tmp,'?')>0 ) list($tmp) = explode('?',$tmp);
if( eSubstrCount($tmp,'&')>0 ) list($tmp) = explode('&',$tmp);
gsLogear('FW', 'u', $tmp);
}
if( !SETUP::$LogTrace["*"] && !SESS::$sql['statistics'] && !$_SAVETRACE ) return;
$sObjeto = mb_substr($_SERVER['QUERY_STRING'],0,1);
$sOp = mb_substr($_SERVER['QUERY_STRING'],1);
$sOp = mb_substr($sOp,0,mb_strpos($sOp,':'));
if( $xSubModo!='' ) $sOp = $xSubModo;
if( !SETUP::$LogTrace["*"] && !$_SAVETRACE && !SETUP::$LogTrace[$sObjeto.$sOp] ) return;
if( $Parametros=='' ){
$eQuery = $_SERVER['QUERY_STRING'];
}else{
$eQuery = $Parametros;
}
$eQuery = stripslashes($eQuery);
$eQuery = urldecode($eQuery);
$eQuery = str_replace('=', '#', $eQuery);
$eQuery = str_replace("'", '' , $eQuery);
$eQuery = str_replace(",", '.', $eQuery);
$eQuery = str_replace(CHR92, '/' , $eQuery);
$eQuery = trim(mb_substr($eQuery, 0, 250));
$Parametros = mb_substr(str_replace("'",'"',$Parametros),0,255);
$ePagina = '';
$EDF = str_replace("'",'"',$EDF);
$ePagina = str_replace("'",'"',$ePagina);
$Parametros = _ClearArgs($Parametros);
$ePagina = _ClearArgs($ePagina);
$eQuery = _ClearArgs($eQuery);
if( SETUP::$LogHistory['LogGsAccessFile']=='' ){
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_acceso
( cd_gs_toperacion,      conexion    ,    objeto  ,   modo  ,			edf			 ,     tabla  ,    parametros  ,    pagina  ,  parametro , registros, cd_gs_user, cd_gs_node,             cdi           ) values
( '{$Operacion}'  , '{$_Connection_}', '{$Objeto}','{$Modo}','".mb_substr($EDF,0,250)."', '{$xTabla}', '{$Parametros}','{$ePagina}', '{$eQuery}',  {$TReg} , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."' )"
);
}else{
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
function _ClearArgs($txt){
$dim = ["_SESS_", "_CACHE_", "_ACCESS", "_PSOURCE", "_CONTEXT", "_CSSBIG", "_FORMBUTTONS"];
$txt = "&".$txt."&";
for($i=0; $i<count($dim); $i++){
$dim[$i] = "&".$dim[$i]."=";
if( eSubstrCount($txt, $dim[$i]) ){
$ini = mb_strpos($txt, $dim[$i]);
$end = mb_strpos($txt."&", "&", $ini+1);
$txt = mb_substr($txt, 0, $ini).mb_substr($txt, $end);
}
}
return mb_substr($txt, 1, -1);
}
function eSqlType($tipo){
global $_Sql, $_SqlPDOType;
$tipo = implode("|", explode(",",eNsp($tipo)));
return(preg_match("/^({$tipo})$/u", $_Sql) || preg_match("/^({$tipo})$/u", $_SqlPDOType) || preg_match("/^({$tipo})$/u", $_Sql.".".$_SqlPDOType));
}
function eSqlConcat(){
global $_Sql, $_SqlPDOType;
$t = func_num_args();
$dim = func_get_args();
if( eSqlType('mysql,mysqli') ){
$txt = "concat(";
for($i=0; $i<$t; $i++){
$x = trim($dim[$i]);
if( $i>0 ) $txt .= ",";
if( $x=="" || !preg_match('/^[A-Za-z]$/u', $x[0]) ){
$txt .= "'".$dim[$i]."'";
}else{
$txt .= $dim[$i];
}
}
$txt .= ")";
}else{
$txt = "";
for($i=0; $i<$t; $i++){
$x = trim($dim[$i]);
if( $i>0 ) $txt .= "||";
if( $x=="" || !preg_match('/^[A-Za-z]$/u', $x[0]) ){
$txt .= "'".$dim[$i]."'";
}else{
$txt .= $dim[$i];
}
}
}
return $txt;
}
function TieneGZip(){
if( !headers_sent() ){
if( mb_strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'x-gzip')!==false) return "x-gzip";
if( mb_strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip')!==false) return "gzip";
}
return 0;
}
function EnviaGZip($level=1, $debug=false){
global $_Mode, $_LogUsuario, $_User, $_D_, $_DEBUG, $php_errormsg;
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:11");
if( ISCLI ){
global $_TITLE, $_TReg;
if( $_TITLE[0]=="=" ) $_TITLE = trim(mb_substr($_TITLE,1));
$totalSeconds = ceil(time()-abs($_ENV[SYS]['IniSg']+$_ENV['PHPCLI-SLEEP']));
if( $totalSeconds<1 ) $totalSeconds = 1;
list(,,,$pk) = explode("-", $_ENV["PHPCLI-ID"]);
S::qQuery("update {$_ENV['eDesDictionary']}gs_download set
nm_download='{$_TITLE}'
,records={$_TReg}
,total_sleep='{$_ENV['PHPCLI-SLEEP']}'
,total_seconds='{$totalSeconds}'
,status='T'
where cd_download={$pk}"
);
$Contents = ob_get_contents();
file_put_contents("../_tmp/pdf/{$pk}.html", $Contents);
exit;
}
if( $_ENV["_CompressedPages"] && !$debug ){
$ENCODING = TieneGZip();
if( $ENCODING ) $Contents = ob_get_contents();
}
$dim = error_get_last();
if( !empty($dim["message"]) ){
}
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:12");
if( $php_errormsg!='' ) exit;
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:13");
if( $_DEBUG==16 ){
file_put_contents('../_tmp/log/'.date('dHis').'.'.$_User.".html", ob_get_contents());
}
if( false && $_ENV["_CompressedPages"] && $ENCODING && !$debug ){
ob_end_clean();
header("Content-Encoding: {$ENCODING}");
print "\x1f\x8b\x08\x00\x00\x00\x00\x00";
$Size = mb_strlen($Contents);
$Crc = crc32($Contents);
$Contents = gzcompress($Contents, $level);
$Contents = mb_substr($Contents, 0, mb_strlen($Contents)-4);
print $Contents;
print pack('V',$Crc);
print pack('V',$Size);
if( isset($_ENV[DF]["cache"]) ){
file_put_contents($_ENV[DF]["cache"], "\x1f\x8b\x08\x00\x00\x00\x00\x00".ob_get_contents().pack('V',$Crc).pack('V',$Size));
}
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:14");
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
file_put_contents('../_tmp/log/'.date('dHis').'.'.$_User, "\x1f\x8b\x08\x00\x00\x00\x00\x00".$Contents.pack('V',$Crc).pack('V',$Size));
}
}else{
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:15");
if( isset($_ENV[DF]["cache"]) ){
file_put_contents($_ENV[DF]["cache"], ob_get_contents());
}
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
file_put_contents('../_tmp/log/'.date('dHis').'.'.$_User, ob_get_contents());
}
}
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:16");
if( $_ENV["_CompressedPages"] ) while(ob_get_level()>0) ob_end_flush();
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:17");
if( $_DEBUG==4 ) eLogDebug("HTML End");
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ) file_put_contents('_debug_end.txt', 'PHP End '.date('H:i:s').mb_substr(microtime(),1,7));
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:END");
if(S::$__tronSession) eTronSession("   exit[".S::$_User."] ".$_ENV[SYS]['queryString']);
SYS::sessionSave();
exit;
}
function _gsLastInsert($indice, $pk=null){
global $_DBSERIAL, $_DBINDEX, $_vF;
if( isset($_DBSERIAL[1]) ){
$indice = $_DBSERIAL[1]."=".$_vF[$_DBSERIAL[1]];
}elseif( $_DBINDEX!="" && eSubstrCount($_DBINDEX,",")==0 ){
$indice = $_DBINDEX."=".$_vF[$_DBINDEX];
}else{
return;
}
if( SETUP::$List['LastRecords']==0 || eSubstrCount(" and ", $indice)>0 ) return;
$cdi = date('Y-m-d H:i:s');
$script = explode("&", $_SERVER["QUERY_STRING"]."&")[0];
$obj = $script[0];
$action = mb_substr($script,1,1);
$return = $script[0].mb_strtolower($action)."R";
$script = $GLOBALS["_FileDF"];
if( $obj=="G" ) $script = $GLOBALS["DFichero"][0];
list($db_field,$db_value) = explode("=",$indice);
$db_field = trim($db_field);
$db_value = trim($db_value);
if( $db_value[0]=="'" || $db_value[0]=='"' ) $db_value =  mb_substr($db_value,1,-1);
if( $db_value=="" && $pk<>null ) $db_value = $pk;
$sSql = $GLOBALS["_SQL_"];
qQuery("insert into {$_ENV['eDesDictionary']}gs_last values (".S::$_User.", '{$cdi}', '{$action}', '{$return}', '{$script}', '{$db_field}', '{$db_value}')", $p);
$n = 0;
qQuery("select cdi, action from {$_ENV['eDesDictionary']}gs_last where cd_gs_user=".S::$_User." and script='{$script}' order by cdi desc", $p);
while($r=qRow($p)){
if( $r[1]!="B" ){
if( ++$n>SETUP::$List['LastRecords'] ) break;
$cdi = $r[0];
}
}
if( $n>SETUP::$List['LastRecords'] ){
qQuery("delete from {$_ENV['eDesDictionary']}gs_last where cd_gs_user=".S::$_User." and script='{$script}' and cdi<'{$cdi}'", $p);
}
$GLOBALS["_SQL_"] = $sSql;
}
function eInit($ConEdes=false, $ConCabecera=false){
if( !$_ENV["_CompressedPages"] ) ePrintR("Error: eInit() is overridden");
ob_end_clean(); ob_start();
_HeaderAdd();
if( $ConEdes || $ConCabecera ){
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
if( $txt<>"" ){
if( mb_substr($txt,0,5)=="../d/" ) $txt = mb_substr($txt,5);
}
eHTML($txt);
}
if( $ConEdes ) echo '<script>top.S.edes(window);</script>';
if( isset( $GLOBALS['_gsTRACE'] ) ){
global $_gsTRACE;
for($i=0; $i<count($_gsTRACE); $i++){
echo '<span style="font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;"><B>:'.eSanitizeVar($_gsTRACE[$i]).'</B></span><br>';
}
}
}
function eSetup($index){
$res = SETUP::$System;
$tmp = explode(".", $index);
for($n=0; $n<count($tmp); $n++){
$res = $res[$tmp[$n]];
}
return $res;
}
function eSessionClose($desde=0){
$file = '../_tmp/sess/'.$_GET['_SESS_'];
SESS::$SessionMaxLife = SESS::$_LoginTime;
eLogError("SESS", "logout [{$desde}] ".SESS::$SessionMaxLife.' = '.SESS::$_LoginTime);
}
function eErrorExit($txt){
eInit();
die($txt);
}
function eEnd($MsgError=''){
global $_DEBUG, $_HndDB, $_SqlStart, $_LOGREQUEST, $_LOGANSWER, $_LOGFULLSTATUS, $_LOGFULLTYPE;
global $_Mode, $_D_, $_User;
$_ENV[SYS]['exit'] = true;
if(S::$__tronSession) eTronSession("   eEnd()");
if( S::$_User>0 ){
$_User = S::$_User*1;
$_D_   = SESS::$_D_;
}
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:1");
if( $MsgError!='' ){
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:5");
eInit();
eError($MsgError);
die("<script type='text/javascript'>top.S.error('ERROR CRÍTICO<br><br>{$MsgError}');</script>");
}
if( $_SqlStart ){
$_SqlStart = false;
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==1 ){
$_LOGFULLSTATUS = preg_match('/(A|mR|M|bR|B)/u', $_Mode);
}
if( $_LOGFULLSTATUS && $_LOGFULLTYPE>0 and !preg_match('/(\$a\/d\/logfull.edf|\$t\/ed.gs)/u', $_LOGREQUEST["script"]) ){
foreach($_LOGREQUEST as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGREQUEST[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGREQUEST[$k][$k2] as $k3=>$v3){
$_LOGREQUEST[$k][$k2][$k3] = eEntityEncode($v3);
}
}else{
$_LOGREQUEST[$k][$k2] = eEntityEncode($v2);
}
}
}else{
$_LOGREQUEST[$k] = eEntityEncode($v);
}
}
foreach($_LOGANSWER as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGANSWER[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGANSWER[$k][$k2] as $k3=>$v3){
$_LOGANSWER[$k][$k2][$k3] = eEntityEncode($v3);
}
}else{
$_LOGANSWER[$k][$k2] = eEntityEncode($v2);
}
}
}else{
$_LOGANSWER[$k] = eEntityEncode($v);
}
}
foreach($_LOGREQUEST as $k=>$v){
if( !empty($v) ){
$_LOGREQUEST[$k] = addslashes($v);
}
}
$_LOGREQUEST = json_encode($_LOGREQUEST);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit(); die("Error en JSON _LOGREQUEST: ".json_last_error());
}
if( !empty($_LOGANSWER) ){
$_LOGANSWER = addslashes($_LOGANSWER);
}
$_LOGANSWER = json_encode($_LOGANSWER);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit(); die("Error en JSON _LOGANSWER: ".json_last_error());
}
if( !isset($_User) ) $_User = -1;
qQuery("insert into {$_ENV['eDesDictionary']}gs_logfull (cd_gs_user, request, answer) values ({$_User}, '{$_LOGREQUEST}', '{$_LOGANSWER}')");
}
qEnd();
}
if( $_DEBUG==31 ) file_put_contents('../_tmp/log/'.$_User.'_'.date('dHis').'.htm', ob_get_contents());
if( $_D_!='' && preg_match('/edes.php\?(F|G|L):\$/u', $_SERVER["REQUEST_URI"]) ){
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:6");
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
file_put_contents('../_tmp/log/'.$_User.'_'.str_replace(array('/',':'),array('_','_'),$txt), ob_get_contents());
if( SESS::$spider['opcion']=="S" ){
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:7");
include_once($Dir_."itm/spider.php");
__SpiderSaveHtml($txt);
}
}
if( $_DEBUG==9 ){
global $_DimDebug;
echo "\n<div>";
for($i=0; $i<count($_DimDebug); $i++){
if( mb_substr($_DimDebug[$i],0,3)=='[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1px solid #00009C; text-align:left;font-size:12px"><A HREF="javascript:{}">';
eTrace($_DimDebug[$i]);
echo '</A>';
}else{
eTrace($_DimDebug[$i], 1);
}
}
echo '</div>';
echo '<SCRIPT type="text/javascript">setTimeout("document.body.scrollTop=document.body.scrollHeight;",500);</SCRIPT>';
}else if( $_DEBUG==11 ){
global $_DimDebug;
for($i=0; $i<count($_DimDebug); $i++) eTron($_DimDebug[$i]);
}
if( !empty(SESS::$_SP_) ) echo '<SCRIPT type="text/javascript">top.eInfo(window,"~ AVISO: Ejecutando DDBB de Procesos ~",-1);</SCRIPT>';
if( isset($_POST["_FIELDSWITHFILES"]) && $_POST["_FIELDSWITHFILES"]!='' ){
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:8");
_FileDeleteTemp();
}
SYS::sessionSave();
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:9");
if( $_DEBUG==7 || SESS::$_Development ){
EnviaGZip(0, true);
}else{
EnviaGZip(9, false);
}
if(S::$__tronEntrar) eTron(date('His: ')."eEnd:10");
}
function eOkMode($Opcion, $cModo, $_SubModo=''){
if( $cModo=='' ) return false;
if( $cModo=='l' && $cModo==mb_substr($Opcion,-1) ) return true;
$cModo = trim(str_replace(
array(',*R,'	  ,',?R,'	   , ',*l,'		 , ',?l,'	   , ',?,'	  , ',F,'			    , ',T,'			      , ',L,'         ),
array(',cR,bR,mR,',',cR,bR,mR,', ',cl,bl,ml,', ',cl,bl,ml,', ',c,b,m,', ',c,b,m,a,cR,bR,mR,', ',c,b,m,a,cR,bR,mR,', ',l,cl,bl,ml,'),
eNsp(','.$cModo.',')
));
$cModo = mb_substr($cModo,1,-1);
return (
$cModo==$Opcion ||
eSubstrCount(",{$cModo},", ",{$Opcion},")>0 ||
$cModo=='*' ||
(mb_strlen($Opcion)==2 && mb_substr($Opcion,1,2)=='R' && eSubstrCount(",{$cModo},", ',*R,')>0) ||
($cModo=='?' && eSubstrCount(',c,b,m,', ",{$Opcion},")>0) ||
($_SubModo!='' && eSubstrCount(",{$cModo},", ",{$_SubModo},")>0));
}
function _ModeHelp($tmp){
$tmp = explode(",",eNsp($tmp));
$comb = array(
"*"=>"lqt",
"a"=>"t", "?R"=>"t", "*R"=>"t", "bR"=>"t", "cR"=>"t", "mR"=>"t", "F"=>"t",
"?"=>"q", "b"=>"q", "c"=>"q", "m"=>"q",
"l"=>"l", "?l"=>"l", "*l"=>"l", "bl"=>"l", "cl"=>"l", "ml"=>"l"
);
$modo = array();
for($n=0; $n<count($tmp); $n++) $modo[$comb[$tmp[$n]]] = 1;
$txt = "";
foreach($modo as $k=>$v) $txt .= $k;
$txt = explode(",", wordwrap($txt,1,",",1));
sort($txt);
return implode('', $txt);
}
function eMultitenancy(&$Tabla){
if( $_ENV['eDesDictionary']!='' ){
$Tabla = trim($Tabla);
if( eSubstrCount($Tabla, " ")>0 ){
list(,$tmp3) = explode(" from ", $Tabla);
list($tmp3) = explode(" where ", $tmp3);
list($tmp3) = explode(" order by ", $tmp3);
$tmp4 = trim($tmp3);
if( in_array($tmp4, SETUP::$System['Multitenancy']) ){
$tmp4 = $_ENV['eDesDictionary'].$tmp4;
$Tabla = str_replace(" ".trim($tmp3)." ", " ".$tmp4." ", $Tabla);
}
}else{
if( in_array($Tabla, SETUP::$System['Multitenancy']) ){
$Tabla = $_ENV['eDesDictionary'].$Tabla;
}else if( mb_substr($Tabla,0,3)=="gs_" ){
$Tabla = $_ENV['eDesDictionary'].$Tabla;
}
}
}
}
function eGetOpcions(){
list($url) = explode("&", $_SERVER["QUERY_STRING"]);
list($url, $ext) = explode(".", $url);
list(,$patron) = explode(":", $url);
$file = '../_tmp/php/'.SESS::$_G_.'menu.'.S::$_User;
if( !file_exists($file) ){
return [];
}
$dim = file($file);
$dimOp = array();
$patron = '/(F|G|L){1}(a|b|c|m|bl|cl|ml){1,2}:'.str_replace("/", CHR92."/",$patron).':/u';
for($n=0; $n<count($dim); $n++){
list($url,  $icon) = explode("|",trim($dim[$n]));
list($txt) = explode(".", $url);
if( preg_match($patron, $txt.":") ){
$modo = mb_substr($url,1,1);
if( !isset($dimOp[$modo]) ) $dimOp[$modo] = $icon;
}
}
return $dimOp;
}
function _AjustaTamposToJS($_CalcularAnchos, $_eAlign, $_Form, $_CARDSHOW, $_DEBUG){
echo 'function _AjustaCampos(){';
$dim = $_CalcularAnchos;
for($n=0; $n<count($_CalcularAnchos); $n++){
$dim[$n] = [$_CalcularAnchos[$n], str_replace(
["_AnchoField(", "_AnchoHasta(", "DGI(", ")", "'", '"', " ", ";"],
[""			   , ""			   , ""	   , "" ,  "", "" , "" , "" ],
$_CalcularAnchos[$n]
), ""];
$tmp = explode(",", $dim[$n][1]);
$dim[$n][1] = $tmp[0];
$dim[$n][2] = $tmp[1];
}
for($n=0; $n<count($dim); $n++){
for($i=$n+1; $i<count($dim); $i++){
if( $dim[$n][1]==$dim[$i][2] ){
list($dim[$n], $dim[$i]) = [$dim[$i], $dim[$n]];
$n--;
break;
}
}
}
for($n=0; $n<count($dim); $n++){
$_CalcularAnchos[$n] = $dim[$n][0];
}
if( !$_CARDSHOW ){
if( $_DEBUG==99 ) echo 'top.eTron("Calcula Anchos... ON");';
if( count($_CalcularAnchos)>0 ){
for($n=0; $n<count($_CalcularAnchos); $n++){
echo $_CalcularAnchos[$n].$__Enter;
}
}
if( count($_eAlign)>0 ){
$_PosField = array();
for($n=0; $n<count($_Form); $n++) $_PosField[$_Form[$n][1]] = $n;
$tmpAlign = array();
for($n=0; $n<count($_eAlign); $n++){
$op = $_eAlign[$n][1][0];
if( $_eAlign[$n][1][1]==$op ) $op .= $op;
$campo = mb_substr($_eAlign[$n][1], mb_strlen($op));
$tmpAlign[] = str_pad($_PosField[$campo],3,'0',STR_PAD_LEFT).'|'.$campo.'|'.$_eAlign[$n][0].'|'.$op.'|'.$_eAlign[$n][2];
}
sort($tmpAlign);
for($n=0; $n<count($tmpAlign); $n++){
$DAlign = explode('|', $tmpAlign[$n]);
echo 'eAlign("'.$DAlign[2].'","'.$DAlign[3].'","'.$DAlign[1].'");';
}
}
if( $_DEBUG==99 ) echo 'top.eTron("Calcula Anchos... OFF");';
}
echo '}';
}
function _hackerLog($mesagge, $salir=true){
include(__DIR__.'/m/_hacker.inc');
}
function ePrintTron(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eprinttron.inc');
}
function ePrintR(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eprintr.inc');
}
function eBacktrace(){
eInit();
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre>';
call_user_func_array("ePrintR", $funcGetArgs);
}
function _Debug($tmp){
include(__DIR__.'/m/_debug.inc');
}
function eTron($para='', $caja=false, $borrar=false){
include(__DIR__.'/m/etron.inc');
}
function eLogError($error, $mesagge){
$dim = array();
$dim[] = date("Y-m-d H:i:s")." [{$error}]";
$dim[] = "ERROR.......: {$mesagge}";
$dim[] = "USER........: ".S::$_User;
$dim[] = "QUERY_STRING: ".$_SERVER['QUERY_STRING'];
$dim[] = "REQUEST_URI.: ".$_SERVER['REQUEST_URI'];
$dim[] = "HTTP_REFERER: ".$_SERVER['HTTP_REFERER'];
$dim[] = "REMOTE_ADDR.: ".$_SERVER['REMOTE_ADDR'];
$txt = implode("\r\n\t", $dim);
eErrorToFile($txt);
}
function eErrorToFile($errorShort, $errorLength=""){
$file = '../_tmp/err/_log';
error_log($errorShort."\r\n", 3, "{$file}_short.err");
if( empty($errorLength) ) $errorLength = $errorShort;
error_log($errorLength."\r\n", 3, "{$file}.err");
}
function eTronSession($txt, $borrar=false){
if( $borrar ) @unlink('../_tmp/__tron.txt');
error_log(date('H:i:s.'.eGetMicroTime(true)).' '.$txt."\n", 3, '../_tmp/__tron.txt');
}
function eTrace($para="", $Alert=false, $Caja=''){
include(__DIR__.'/m/etrace.inc');
}
function eTronSql($txt){
eLogDebug($txt);
}
function _SlowSqlWarning($sql=null){
if( $sql==null ){
$_ENV[SYS]['SlowSqlWarning'] = microtime(true);
return;
}
$time = microtime(true)-$_ENV[SYS]['SlowSqlWarning'];
if( $time>SETUP::$System['SlowSqlWarning'] ){
return;
}
$query = $_SERVER["REQUEST_URI"];
if( eSubstrCount($query, "?") ){
$query = eMid($query."&", "?", "&");
}else{
list($query) = explode('&_ACCESS=', $query.'&_ACCESS=');
}
$SlowSqlFreeScripts = str_replace("/", "\\/", SETUP::$System['SlowSqlFreeScripts']);
if( preg_match('/('.$SlowSqlFreeScripts.')/u', $query) ){
return;
}
$txt = number_format($time, 4, '.', '')." - ".date('Y-m-d H:i:s')." - {$query}\n\t{$sql}\n";
foreach($_POST as $k=>$v) if( !empty($v) ) $txt .= "\t\t{$k}={$v}\n";
error_log("{$txt}\n", 3, "../_tmp/err/slow.sql");
if( !SETUP::$_DevelopmentSrv && !empty(SETUP::$System['EMailSystem']) ){
eMail(SETUP::$System['EMailSystem'], "SLOW SQL", "Application name: ".SETUP::$System['ApplicationName']."\n".SESS::$_UserName, SESS::$_UserEMail);
}
}
function _PrintBoolean($cnd){
return($cnd?"true":"false");
}
function gsLogear($Apli, $Modo, $File){
include(__DIR__.'/m/gslogear.inc');
}
function ePlugin(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eplugin.inc');
}
function _addBuffer(&$buffer, &$nDimFCH, $_DimEDF){
while( mb_substr($buffer, -1)=="|" ){
$nDimFCH++;
list($txt) = explode(REM, $_DimEDF[$nDimFCH]);
$txt = trim($txt);
if( empty($txt) ){
break;
}else if( $txt[0]=="[" ){
$nDimFCH--;
break;
}else{
$buffer .= $txt;
}
}
}
$_LeeDFEsRem = false;
function LeeDF(&$buffer, $DimOpcion, &$_Variable, &$SaltarLinea, &$_Form, &$Chr_1, &$_FIELDSET, &$_TmpFieldSet, &$_EnLinea, &$_TmpEnLinea, &$_EnColumna, &$_TmpEnColumna, &$TipoEntrada, $ElPuntoEsRem=true, &$nextLine="", $nHoja=1){
global $_LeeDFEsRem, $_User, $_Node, $_Tree, $_WebMaster, $_DEBUG, $_EOD;
$prefijo = (SESS::$_Development) ? mb_substr($buffer, 0, mb_strlen($buffer)-mb_strlen(ltrim($buffer))) : '';
$buffer = trim($buffer);
if( isset($_ENV[SYS]["NOREM"]) ) $ElPuntoEsRem = false;
if( $nextLine!='' ){
if( $buffer[0]=='.' || mb_substr($buffer,0,2)==REM ) return false;
$buffer = $nextLine." ".$buffer;
$nextLine = '';
}
if( $buffer=='' ){
$Chr_1 = '';
if( SESS::$_Development ){
$buffer = CHR13;
return true;
}
$Chr_1 = mb_substr($TipoEntrada,0,3);
if( $_DEBUG==2 && !$_LeeDFEsRem && ($Chr_1=='_PH' || $Chr_1=='_JS' || $Chr_1=='_DB') ){
$buffer = '';
return true;
}
return false;
}
$Chr_3 = mb_substr($buffer,0,3);
$Chr_2 = mb_substr($Chr_3,0,2);
$Chr_1 = mb_substr($Chr_3,0,1);
if( mb_strpos($buffer, "eDesDictionary")!==false ){
$buffer = str_replace(
['{$_ENV['."'eDesDictionary'".']}', "{".'$'."_ENV['eDesDictionary']}"]
,[$_ENV['eDesDictionary']		   , $_ENV['eDesDictionary']]
,$buffer
);
}
if( mb_strpos($buffer, REM)!==false ){
if( eSubstrCount(mb_strtoupper($buffer), '[UPLOADFILE]')==1 ){
$p = mb_strpos($buffer, REM);
if( $p!==false ){
if( count(explode('|', mb_substr($buffer,0,$p)))>3 ){
$buffer = trim(mb_substr($buffer,0,$p));
}else{
$p = mb_strpos($buffer, REM, $p+1);
if( $p!==false && count(explode('|', mb_substr($buffer,0,$p)))>3 ){
$buffer = trim(mb_substr($buffer,0,$p));
}
}
}
}else{
$p = mb_strpos($buffer, REM);
if( mb_substr($buffer, $p-1,1)!='\\' ){
if( eSubstrCount(mb_chr(39).'":', mb_substr($buffer, $p-1, 1))==0 ) $buffer = chop(mb_substr($buffer, 0, $p));
}
}
}
if( $Chr_2=='/'.'*' && eSubstrCount($buffer, '*'.'/')==0 ){
$_LeeDFEsRem = true;
}else if( $_LeeDFEsRem && eSubstrCount($buffer, '*'.'/')>0 ){
$_LeeDFEsRem = false;
$buffer = trim(mb_substr($buffer,mb_strpos($buffer, '*'.'/')+2 ));
if( $buffer=='' ) return false;
}
if( $_LeeDFEsRem ) return false;
if( ($Chr_1=='.' && $ElPuntoEsRem) || $Chr_2=='/'.'/' ) return false;
if( mb_substr($buffer,-1)=='_' && (mb_substr($buffer,-2,1)==' ' || mb_substr($buffer,-2,1)==mb_chr(9) || mb_substr($buffer,-2,1)=='|') ){
$nextLine = trim(mb_substr($buffer,0,-1));
return false;
}
if( $Chr_1=='¿' ){
list($tmp) = explode('?', $buffer);
$tmp = trim(mb_substr($tmp, 1));
$buffer = trim(mb_substr($buffer, mb_strpos($buffer, '?')+1));
if( mb_substr($tmp,0,2)=='#(' ){
list($tmp) = explode(')',mb_substr($tmp,2));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = (count(array_intersect($cModo, $DimOpcion))>0 );
}else if( mb_substr($tmp,0,3)=='#!(' ){
list( $tmp ) = explode(')',mb_substr($tmp,3));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = !( count( array_intersect($cModo, $DimOpcion))>0 );
}else if( mb_substr($tmp,0,2)=='#!' ){
$acc = !( $_Variable[str_replace('!','',$tmp)] );
}else if( $tmp[0]=='#' ){
if(  eSubstrCount($tmp, ',')==0 ){
$acc = ($_Variable[$tmp]);
}else{
$tmp2 = explode(",", eNsp($tmp));
for($i=0; $i<count($tmp2); $i++){
$acc = ($_Variable[$tmp2[$i]]);
if( $acc ) break;
}
}
}else{
if( $TipoEntrada=='_PHPSTART' && $buffer[0]=='[' ){
$TipoEntrada = '-1';
return true;
}
$acc = _ExeEval($tmp, $buffer);
}
if( $buffer=="" || $buffer=="¿" ){
if( !$acc ) $SaltarLinea = true;
return false;
}else{
if( $buffer[0]=='[' ) $TipoEntrada = '';
if( !$acc ){
$Chr_1 = $buffer[0];
return false;
}
}
$Chr_3 = mb_substr($buffer,0,3);
$Chr_2 = mb_substr($Chr_3,0,2);
$Chr_1 = $buffer[0];
}else if( $Chr_1=='?' ){
if( $Chr_2=='?¿' ){
$SaltarLinea = !$SaltarLinea;
return false;
}else if( mb_strlen($buffer)>2 ){
}else if( $Chr_2!='?'.'>' ){
$SaltarLinea = false;
return false;
}
}
if( $SaltarLinea ) return false;
if( $Chr_1=='#' ){
if( eSubstrCount($buffer, '¿')>0 ){
$ConSalto = true;
}
if( $Chr_2=='#P' || $Chr_3=='#!P' ){
if( mb_substr($buffer,0,3)=='#P(' || mb_substr($buffer,0,4)=='#!P(' || mb_strtoupper(mb_substr($buffer,0,12))=='#PERMISSION(' || mb_strtoupper(mb_substr($buffer,0,13))=='#!PERMISSION(' ){
$i = mb_strpos($buffer,'(')+1;
$Label = trim(mb_substr($buffer,$i,mb_strpos($buffer,')')-$i));
$Label_2 = '';
if( eSubstrCount($Label,'"')+eSubstrCount($Label,"'")>2 ){
$i = mb_strpos($Label,$Label[0],1)+1;
$Label_1 = mb_substr($Label,0,$i);
$i = mb_strpos($Label,mb_substr($Label,-1),$i);
$Label_2 = mb_substr($Label,$i);
}
$buffer = ltrim(mb_substr($buffer,mb_strpos($buffer,')')+1));
if( $Label_2<>'' ){
$res = (ePermission($Label_1) || ePermission($Label_2));
}else{
$res = ePermission($Label);
}
if( mb_substr($Chr_2,1)=='!' ) $res = !$res;
if( $buffer[0]=='¿' ) $SaltarLinea = !$res;
if( $buffer[0]=='[' ) $TipoEntrada = '';
return $res;
}
}
if( $Chr_2!='#(' && $Chr_2!='#!' && $ConSalto ){
list($tmp) = explode('¿', $buffer.'¿');
$tmp = trim($tmp);
if( eSubstrCount($tmp, ',')==0 ){
$SaltarLinea = !$_Variable[$tmp];
}else{
$tmp2 = explode(",", eNsp($tmp));
for($i=0; $i<count($tmp2); $i++){
$SaltarLinea = !($_Variable[$tmp2[$i]]);
if( !$SaltarLinea ) break;
}
}
return false;
}else if( $Chr_2=='#(' || $Chr_2=='#!' ){
$i = mb_strpos($buffer, '(')+1;
if( $i>1 ){
$cModo = trim(mb_substr($buffer, $i, mb_strpos($buffer,')')-$i));
if( $cModo[0]=='$' ){
$Chr_1 = '[';
$acc = _ExeEval($cModo, $buffer);
$buffer = trim(mb_substr($buffer, mb_strpos($buffer, (($ConSalto)?'¿':')'))+1));
if( $buffer[0]=='[' ) $TipoEntrada = '';
return $acc;
}
$buffer = trim(mb_substr($buffer, mb_strpos($buffer, (($ConSalto)?'¿':')') )+1));
if( $buffer[0]=='[' ) $TipoEntrada = '';
$cModo = str_replace('"', "'", $cModo);
if( mb_strpos($cModo,"'")==0 ){
$cModo = explode(',', eNsp($cModo));
if( gettype($DimOpcion)!='array' ){
$acc = 0;
}else{
$acc = (count(array_intersect($cModo, $DimOpcion))>0);
}
}
if( $Chr_2!='#(' ) $acc = !$acc;
}else if( $Chr_2=='#!' ){
list($acc) = explode('¿', $buffer);
$acc = '#'.trim(mb_substr($acc,2));
$acc = !$_Variable[$acc];
$buffer = '';
}
if( $acc ){
if( $ConSalto && $buffer=='' ) return false;
}else{
if( $ConSalto ) $SaltarLinea = true;
return false;
}
$Chr_1 = $buffer[0];
}else{
list($tmp) = explode('¿', $buffer);
$tmp = trim($tmp);
if( $tmp[0]=='#' ){
foreach($_Variable as $k=>$v){
if( $k==$tmp ){
$acc = ($_Variable[$tmp]);
if( $acc ){
$SaltarLinea = false;
return false;
}else{
$SaltarLinea = true;
return false;
}
break;
}
}
}
}
}
if( $Chr_1=='{' && $TipoEntrada=='_FIELDS' && $DimOpcion[0]!='l' ){
if( $GLOBALS['_LNGCOL']>-1 && !(mb_strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++){
$buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
}
foreach($_LngPublic as $k=>$v){
$buffer = str_replace($k, $v, $buffer);
}
}
if( mb_substr($buffer,0,5)=='{FS}{' ){
list(,, $_TmpFieldSet[0]) = explode('{',$buffer);
list($_TmpFieldSet[0], $_TmpFieldSet[3]) = explode('|',$_TmpFieldSet[0]);
$_TmpFieldSet[0] = trim($_TmpFieldSet[0]);
$_TmpFieldSet[1] = true;
$_TmpFieldSet[4] = count($_Form);
return false;
}else if( mb_substr($buffer,0,5)=='{FR}{' ){
list(,, $_TmpEnLinea[0]) = explode('{',$buffer);
$_TmpEnLinea[0] = trim($_TmpEnLinea[0]);
$_TmpEnLinea[1] = '+';
$_TmpEnLinea[3] = count($_Form);
return false;
}else if( mb_substr($buffer,0,5)=='{FC}{' ){
list(,, $_TmpEnColumna[0]) = explode('{',$buffer);
$_TmpEnColumna[0] = trim($_TmpEnColumna[0]);
$_TmpEnColumna[1] = '+';
$_TmpEnColumna[3] = count($_Form);
return false;
}else if( mb_strtoupper(mb_substr($buffer,0,10))=='{COLUMNS}{' ){
global $_TmpNColumnas;
list(,,$_TmpNColumnas[0]) = explode('{',$buffer);
$_TmpNColumnas[0] = trim($_TmpNColumnas[0]);
$_TmpNColumnas[1] = '+';
$_TmpNColumnas[2] = "";
$_TmpNColumnas[3] = count($_Form);
return false;
}else if( mb_strtoupper(mb_substr($buffer,0,5))=='{TAB}' ){
list(,$tmp) = explode('|', mb_substr($buffer,5));
if( gettype($tmp)=='array' ){
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
}
return true;
}else if( mb_strtoupper(mb_substr($buffer,0,9))=='{ISUBLIST}' ){
return true;
}else if( mb_strtoupper(mb_substr($buffer,0,6))=='{CARD}' ){
return true;
}
}else if( $buffer=='}' && $TipoEntrada=='_FIELDS' ){
global $_NewNColumnas, $_TmpNColumnas;
if( $_TmpEnLinea[1] ){
$_TmpEnLinea[2] = $_Form[count($_Form)-1][1];
if( eSubstrCount( $_TmpEnLinea[2], '{' )==1 ) list( $_TmpEnLinea[2] ) = explode( '{', $_TmpEnLinea[2] );
if( eSubstrCount( $_TmpEnLinea[2], ':' )==1 ) list( $_TmpEnLinea[2] ) = explode( ':', $_TmpEnLinea[2] );
$_EnLinea[$_TmpEnLinea[1]]['I'] = $_EnLinea[$_TmpEnLinea[2]]['F'] = true;
$_EnLinea[$_TmpEnLinea[1]]['S'] = $_TmpEnLinea[0];
for($i=count($_Form)-1; $i>$_TmpEnLinea[3]; $i--){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpEnLinea[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || mb_strtoupper(mb_substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnLinea = array('','','');
return false;
}else if( $_TmpEnColumna[1] ){
$_TmpEnColumna[2] = $_Form[count($_Form)-1][1];
if( eSubstrCount( $_TmpEnColumna[2], '{' )==1 ) list( $_TmpEnColumna[2] ) = explode( '{', $_TmpEnColumna[2] );
if( eSubstrCount( $_TmpEnColumna[2], ':' )==1 ) list( $_TmpEnColumna[2] ) = explode( ':', $_TmpEnColumna[2] );
$_EnColumna[$_TmpEnColumna[1]]['I'] = $_EnColumna[$_TmpEnColumna[2]]['F'] = true;
$_EnColumna[$_TmpEnColumna[1]]['S'] = $_TmpEnColumna[0];
for( $i=count($_Form)-1; $i>$_TmpEnColumna[3]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpEnColumna[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || mb_strtoupper(mb_substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnColumna = array('','','');
return false;
}else if( $_TmpNColumnas[1] ){
$_TmpNColumnas[2] = $_Form[count($_Form)-1][1];
if( count($_Form)>$_TmpNColumnas[3] ){
list($_TmpNColumnas[2]) = explode('{', $_TmpNColumnas[2]);
list($_TmpNColumnas[2]) = explode(':', $_TmpNColumnas[2]);
$_NewNColumnas[$_TmpNColumnas[1]]['I'] = true;
$_NewNColumnas[$_TmpNColumnas[2]]['F'] = true;
$_NewNColumnas[$_TmpNColumnas[1]]['NC'] = $_TmpNColumnas[0];
}else{
}
$_TmpNColumnas = array('','','','');
return false;
}else if( $_TmpFieldSet[1] ){
$_TmpFieldSet[2] = $_Form[count($_Form)-1][1];
if( eSubstrCount( $_TmpFieldSet[2], '{' )==1 ) list( $_TmpFieldSet[2] ) = explode( '{', $_TmpFieldSet[2] );
if( eSubstrCount( $_TmpFieldSet[2], ':' )==1 ) list( $_TmpFieldSet[2] ) = explode( ':', $_TmpFieldSet[2] );
$_FIELDSET[$_TmpFieldSet[1]]['I'] = $_FIELDSET[$_TmpFieldSet[2]]['F'] = ($_TmpFieldSet[1]!='+');
$_FIELDSET[$_TmpFieldSet[1]]['T'] = $_TmpFieldSet[0];
$_FIELDSET[$_TmpFieldSet[1]]['S'] = $_TmpFieldSet[3];
for( $i=count($_Form)-1; $i>$_TmpFieldSet[4]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpFieldSet[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || mb_strtoupper(mb_substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpFieldSet = array('','','','');
return false;
}
}
if( $buffer!='' ){
if( $_DEBUG==9 || $_DEBUG==11 ){
global $_DimDebug;
$_DimDebug[] = $buffer;
}
if( mb_strpos($buffer, "S::")!==false || mb_strpos($buffer, "SETUP::")!==false ){
$buffer = _InVar($buffer);
}
$c = mb_substr($TipoEntrada,0,3);
if( $GLOBALS['_LNGCOL']>-1 && !(mb_strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++){
$buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
}
foreach($_LngPublic as $k=>$v){
$buffer = str_replace($k, $v, $buffer);
}
}
$buffer = str_replace("location.href(", "eUrl(", $buffer);
$buffer = _AddFilterParse($buffer);
if( mb_strpos($buffer, '<<<')!==false ){
$_EOD = explode(" ", explode('<<<',$buffer)[1]." ")[0].";";
}
if( SESS::$_Development && $buffer[0]!="[" ){
if( $buffer!=$_EOD ){
$buffer = $prefijo.$buffer;
}else{
$_EOD = "";
}
}
return true;
}else if( SESS::$_Development ){
$buffer = CHR13;
return true;
}
return false;
}
function _AddFilterParse($linea){
return $linea;
$DimNmFunc = array();
$item = preg_split("/(S\.addFilter\s?\()/u", $linea, -1, PREG_SPLIT_DELIM_CAPTURE);
if( count($item)==1 ) return $linea;
while( true ){
$sql = trim($item[2]);
$comilla = $sql[0];
$tmp = explode($comilla, $sql);
$sqlWhere = trim($tmp[1]);
if( eSubstrCount($sqlWhere, "#")==0 ){
return;
}
$pk = eSerialAdd();
$posIni = mb_strpos($linea, $item[1]);
$posEnd = $posIni+mb_strlen($item[1]);
$item[1] = "__".str_replace("add", "add__", $item[1])."__";
$DimNmFunc[] = $item[1];
$linea = mb_substr($linea, 0, $posIni).$item[1].mb_substr($linea,$posEnd);
if( $sqlWhere=="+optional" ){
$sqlReplaceWhere = $item[1];
$sqlWhere = "";
$linea = str_replace($sqlReplaceWhere, $item[1].$pk.",", $linea);
}else{
$sqlReplaceWhere = $comilla.$tmp[1].$comilla;
$linea = str_replace($sqlReplaceWhere, $pk, $linea);
}
$tmp = explode('+optional', $linea);
if( count($tmp)>1 ){
$posIni = mb_strpos($linea, '+optional')-1;
$posEnd = mb_strpos($linea, ')', $posIni);
for($n=$posIni; $n<mb_strlen($linea); $n--){
if( $linea[$n]=="," ){
$posIni = $n;
break;
}
}
$linea = mb_substr($linea,0,$posIni).mb_substr($linea,$posEnd);
$tmp2 = explode(')', $tmp[1]);
$tmp3 = explode(",", $tmp2[0]);
$nParametro = 0;
$dimField = array();
$dimVarSession = array();
for($n=1; $n<count($tmp3); $n++){
$tmp3[$n] = trim($tmp3[$n]);
if( $tmp3[$n][0]=="'" || $tmp3[$n][0]=='"' ){
$nParametro++;
}
$tmp3[$n] = str_replace(array("'", '"'), "", $tmp3[$n]);
if( $nParametro==1 ){
$dimField[] = $tmp3[$n];
}else{
$dimVarSession[] = $tmp3[$n];
}
}
$dimAddFilter = array();
for($n=0; $n<count($dimField); $n++){
if( !empty(SESS::${$dimVarSession[$n]}) ){
$dimAddFilter[] = $dimField[$n]."='".SESS::${$dimVarSession[$n]}."'";
}
}
$txtAddFilter = implode(" and ", $dimAddFilter);
if( !empty($txtAddFilter) ){
if( !empty($sqlWhere) ) $sqlWhere .= " and ";
$sqlWhere .= $txtAddFilter;
}
}
eCacheSqlPut("where", $sqlWhere);
$item = preg_split("/(S\.addFilter\s?\()/u", $linea, -1, PREG_SPLIT_DELIM_CAPTURE);
if( count($item)==1 ) break;
}
for($n=0; $n<count($DimNmFunc); $n++){
$linea = str_replace($DimNmFunc[$n], str_replace("__", "", $DimNmFunc[$n]), $linea);
}
return $linea;
}
function _AddFilterSql(){
$varAddFilter = explode("|", $_GET["_ADDFILTER"]);
if( is_numeric($varAddFilter[0]) ){
$sqlWhere = eCacheSqlGet("where", $varAddFilter[0])["data"];
}else{
$dim = explode(",", eNsp($varAddFilter[0]));
for($n=0; $n<count($dim); $n++){
$dim[$n] = $dim[$n]."='#'";
}
$sqlWhere = implode(" and ", $dim);
}
$tmp = explode("#", $sqlWhere);
for($n=0; $n<count($tmp)-1; $n++){
$tmp[$n] .= eSanitizeVar($varAddFilter[$n+1]);
}
return implode("", $tmp);
}
function gsActivity($File){
global $_User, $Dir_, $_Sql;
if( eSubstrCount($File,'/_tmp/__tron.')==1 ) return;
if( eSubstrCount($File,'/edes.v3/')==1 ){
list(,$File) = explode('/edes.v3/',$File);
$File = '$'.$File;
}else if( eSubstrCount($File,'/d/')==1 ){
list(,$File) = explode('/d/',$File);
}else{
if( mb_substr($File,0,3)=='../' ) $File = mb_substr($File,2);
}
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
include($Dir_.$_Sql.'.inc');
}else{
qConnect();
}
$_Include = '';
$tipo = "F";
if( eSubstrCount($File, "/tree/")>0 || eSubstrCount($File, "/config/")>0 ) $tipo = "C";
$Cdi = date('Y-m-d H:i:s');
$esEDes = (($File[0]=='$') ? "'{$_ENV['ON']}'":"NULL");
sql_Query("insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values (".S::$_User.", '{$Cdi}', '{$File}', {$esEDes}, '".SESS::$_UserEMail."')");
}
function eGetCWD(){
return str_replace('\\', '/', getcwd());
}
function eScript($File, &$Bak=NULL, &$EsEdes=NULL){
global $Dir_;
$EsEdes = false;
$Bak = '';
$File = trim(eFileClearGet($File));
if( eSubstrCount(mb_chr(0), $File)>0 ){
_hackerLog("ReadFile: 0 : {$File}");
}
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
break;
}
$Bak  = '../_bak_/'.mb_substr($File,1);
$File = '../'.mb_substr($File,1);
break;
case '$':
$Bak  = DIREDES.'m/_bak_/'.mb_substr($File, 1);
$File = DIREDES.mb_substr($File, 1);
$EsEdes = true;
break;
case '^': case '>':
$File = mb_substr($File, 1);
if( !preg_match('/^http:?\/\/u', $File) ){
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
function gsCambiaComa2($Valor){
if( eSubstrCount($Valor, '{')==0 ) return $Valor;
$txt = '';
$Cambiar = false;
for($n=0; $n<mb_strlen($Valor); $n++){
$c = mb_substr($Valor,$n,1);
if( $c=='{' ) $Cambiar = true;
if( $c=='}' ) $Cambiar = false;
$txt .= ($Cambiar && $c==',') ? '|' : $c;
}
return $txt;
}
function eGetStyle($file, $class){
$txt = file_get_contents($file);
$txt = trim(eMid($txt, $class, "}") );
return trim(str_replace("\n","",mb_substr($txt, 1)));
}
function eNumberFormat($val, $nDeci=0, $conMiles=true){
$miles = ($conMiles)? SETUP::$System['FormatNumber'][0]: "";
return number_format((float)$val, $nDeci, SETUP::$System['FormatNumber'][1], $miles);
}
function isZero($val){
return (preg_replace('/[0\.\-\,\/: ]/', '', $val)=="");
}
function eDataFormat($val, $tipo, $dir="u"){
if( gettype($tipo)=="integer" || is_numeric($tipo) ){
if( $dir=="u" ){
return eNumberFormat($val, $tipo);
}else{
return number_format((float)str_replace(array(SETUP::$System['FormatNumber'][0],SETUP::$System['FormatNumber'][1]), array("","."), $val), $tipo, ".", "");
}
}
if( preg_match('/^(P4|F4|CDI)$/u', $tipo) ){
if( preg_replace('/['.CHR92.implode(CHR92,str_split(SETUP::$System['FormatDelimiter'])).'0 ]/u','',$val)=="" ) return "";
}
switch($dir){
case "u":
return preg_replace(SETUP::$System["_Format{$tipo}EXPdb"], SETUP::$System["_Format{$tipo}TKNuser"], preg_replace('([^0-9])', '', $val));
case "d":
return preg_replace(SETUP::$System["_Format{$tipo}EXP"], SETUP::$System["_Format{$tipo}TKNdb"], preg_replace('([^0-9])', '', $val));
case "U":
return preg_replace(SETUP::$System["_Format{$tipo}EXP"], SETUP::$System["_Format{$tipo}TKN"], preg_replace('([^0-9])', '', $val));
}
}
function _SanitizeGET($_pField=array(), $_SanitizarGet=array()){
if( count($_SanitizarGet)==0 ) return;
if( isset($_SanitizarGet) ){
foreach($_SanitizarGet as $k=>$v){
if( isset($_pField[$k]) ){
eCheckGet($v, $_pField[$k][2], $_pField[$k][4], $_pField[$k][3], true, $k);
}
}
}
foreach($_GET as $k=>$v){
$error = false;
if( isset($_pField[$k]) ){
eCheckGet($v, $_pField[$k][2], $_pField[$k][4], $_pField[$k][3], true, $k);
}else if( isset($GLOBALS["_SANITIZE"]) && isset($GLOBALS["_SANITIZE"][$k]) ){
$cond = $GLOBALS["_SANITIZE"][$k];
list($type, $leng) = explode(",", $cond);
$type = trim($type);
if( $type[0]=="/" ){
$error = !preg_match($cond, $v);
}else if( preg_match('/^(int|float|string|date|month)$/u', $type) ){
switch( $type ){
case 'int':
$error = !preg_match('/^[0-9\-]*$/u', $v);
break;
case 'float':
$error = !preg_match('/^[0-9\.\-]*$/u', $v);
break;
case 'date':
$error = !preg_match('/^([1-2]{1}[0-9]{3})-([0-1]{1}[0-9]{1})-([0-3]{1}[0-9]{1})$/u', $v);
break;
case 'month':
$error = !preg_match('/^([1-2]{1}[0-9]{3})-([0-1]{1}[0-9]{1})$/u', $v);
break;
case 'email':
$error = !preg_match('/^[a-zA-Z0-9\._\%\+\-@ñÑçÇ'.$lower.$upper.']{4,}$/', $v);
break;
default:
$error = !preg_match('/^[a-zA-Z0-9ñÑçÇ\-\_]{1,'.$leng.'}$/', $v);
}
}else{
$error = !preg_match('/^('.$cond.')$/u', $v);
}
}else{
}
if( $error ){
$message = 'Sanitize data error';
if( !empty(SESS::$_D_) ){
$message .= " [{$k}]=[{$v}] check[{$GLOBALS['_SANITIZE'][$k]}] type[{$type}] cond[{$cond}]";
}
eMessage($message, "HSE", 30);
}
}
}
function eCheckGet($value, $edition, $leng, $type="", $viewError=false, $nmField=""){
$ok = false;
if( preg_match('/^(A|H)$/u', $type) ){
$viewError = true;
$edition = "ERROR";
}
if( $type[0]=="S" ){
$tmp = explode(",", $leng);
$leng = $tmp[0]*1;
}
$value = eSanitizeVar($value);
switch( $edition ){
case '+':
case '0':
case '*':
case '-':
case '+,':
case '-,':
if( is_numeric($value) ) $ok = true;
break;
case 'F4':
if(
$value=="NULL"  ||
is_null($value) ||
preg_match('/^([1-2]{1}[0-9]{3})-([0-1]{1}[0-9]{1})-([0-3]{1}[0-9]{1})$/u', $value) ){
$ok = true;
}
break;
case 'P4':
if( preg_match('/^([1-2]{1}[0-9]{3})-([0-1]{1}[0-9]{1})$/u', $value) ) $ok = true;
break;
case 'ERROR':
break;
default:
$ok = true;
}
if( $ok ){
if( mb_strlen((string)$value)>$leng ) $ok = false;
}
if( !$ok && $viewError ){
$message = 'Sanitize data error';
if( !empty(SESS::$_D_) ){
$message .= " [{$nmField}]=[{$value}] [{$type}] [{$leng}]";
}
eMessage($message, "HSE", 30);
}
return false;
}
$_gsWarning = '';
function eCheckAlert(){
$_CDI_ = date('U')-100;
}
function eAlertIcon($NomIcono, $Mensaje, $Avisa=1){
global $_gsWarning;
if( !$Avisa ) $Avisa = 0;
$_gsWarning .= "{$NomIcono},{$Avisa},{$Mensaje};";
}
function eAddEvent($Id, $HoraAviso, $Momento, $Descripcion, $Href, $Titulo, $Tabla){
global $_eAddEvento;
$_eAddEvento[] = array($Id, $HoraAviso, $Momento, $Descripcion, $Href, $Titulo, $Tabla);
}
function CodeHELP($Script, $Modo){
if( !isset($GLOBALS['_HelpActive']) || !$GLOBALS['_HelpActive'] ) return '';
switch( $GLOBALS['_HelpType'] ){
case 1:
break;
case 2:
$Script .= '_'.$Modo[0];
break;
case 3:
$Script .= '_'.$Modo;
break;
default:
return '';
}
return 'top.gsHelp("'.$Script.'",event);';
}
$_eParseError = 0;
function eParseError($ConTron=false){
include(__DIR__.'/m/eparseerror.inc');
}
function _ShowError($xErrorMsg, $tmpFile, $LenDoc=0, $Macro='', $EditFile=''){
include(__DIR__.'/m/_showerror.inc');
}
function _Error($pk){
include(__DIR__.'/m/_error.inc');
}
function eError($Error){
include(__DIR__.'/m/eerror.inc');
}
function qErrorFile($TxtError, $sql, &$pkError=""){
include(__DIR__.'/m/qerrorfile.inc');
return $TxtError;
}
function FormStaticError(){
include(__DIR__.'/m/formstaticerror.inc');
}
function _ErrorToUser($sql, $TxtError, $ScriptSys, $NumSqlError_){
if( SESS::$_Development || SESS::$_D_!="" || $_ENV[SYS]["localhost"] ){
eTrace('[SCRIPT]'); eTrace( $GLOBALS['OriFichero'] );
echo '<hr>'; eTrace('[SQL]'); eTrace($sql); eTrace('[ERROR]'); eTrace($TxtError);
echo '<hr>'; eTrace('[_GET]' ); foreach($_GET  as $k=>$v) eTrace($k.' = '.$v);
echo '<hr>'; eTrace('[_POST]'); foreach($_POST as $k=>$v) eTrace($k.' = '.$v);
echo '<hr>';
if( SESS::$_D_=='~' || $_ENV[SYS]["localhost"] ){
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre><hr>';
}
if( function_exists('KeyEditFile') ) KeyEditFile( $GLOBALS['OriFichero'] );
}else{
if($ScriptSys){
eTrace('[SQL]');eTrace($sql.'<br>');eTrace('[ERROR]');eTrace($TxtError);
}else eTrace('[ ERROR SQL ]');
echo '<script type="text/javascript">top.eLoading(false,window); if(top.eIsWindow(window))top.eSWView(window);</SCRIPT>';
}
if( $NumSqlError_ ){
if( SESS::$_D_=="" ){
eInit();
echo '<script type="text/javascript">top.S.errorHidden(window, "ERROR: '.$pkError.'");</SCRIPT>';
}
eEnd();
}
$NumSqlError_ = true;
return $NumSqlError_;
}
function _ExitPHP(){
global $_Include, $php_errormsg, $__DIR__, $OriFichero, $_HndDB, $_TmpInclude;
chdir($__DIR__);
$txt = ob_get_contents();
if( !isset($_ENV[SYS]['exit']) && mb_strlen($txt)==0 && empty($php_errormsg) ){
$pkError = rand(1000, 9999);
$dim = array();
$dim[] = date("Y-m-d H:i:s");
$dim[] = "ERROR.......: {$pkError} Unknown error, last include ".$_Include;
$dim[] = "USER........: ".S::$_User;
$dim[] = "QUERY_STRING: ".$_SERVER['QUERY_STRING'];
$dim[] = "REQUEST_URI.: ".$_SERVER['REQUEST_URI'];
$dim[] = "HTTP_REFERER: ".$_SERVER['HTTP_REFERER'];
$dim[] = "REMOTE_ADDR.: ".$_SERVER['REMOTE_ADDR'];
$lastError = error_get_last();
$dim[] = "   type.....: ".$lastError["type"];
$dim[] = "   message..: ".$lastError["message"];
$dim[] = "   file.....: ".$lastError["file"];
$dim[] = "   line.....: ".$lastError["line"];
$txt = implode("\r\n\t", $dim);
eErrorToFile($txt);
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
if( !empty(SESS::$_D_) ){
echo "<pre>";
echo $txt;
echo "</pre>";
}else{
echo '<span style="color:red;"> ERROR INTERNO "'.$pkError.'"</span>';
}
exit;
}
if( eSubstrCount($txt, 'xdebug-error xe-')>0 ){
eInit();
$p = mb_strpos($txt, 'xdebug-error xe-');
$p = mb_strrpos(mb_substr($txt,0,$p), '<table ');
$f = mb_strpos($txt, '</table>', $p)+8;
echo mb_substr($txt, $p, $f-$p);
echo "<script type='text/javascript'>document.body.oncontextmenu = function(){top.gsEdit(window, '{$OriFichero}');}</script>";
exit;
}
if( eSubstrCount($txt, '<b>Parse error</b>')>0 || eSubstrCount($txt, '<b>Fatal error</b>:')>0 ){
if( !empty(SESS::$_D_) ){
file_put_contents(
"../_tmp/err/_parse_error.".S::$_User
,date('Y-m-d H:i:s')." [Parse error]\n".$txt
);
}
$Dim = explode("\n", $txt);
for($n=0; $n<count($Dim); $n++){
if( eSubstrCount($Dim[$n], 'Parse error')>0 || eSubstrCount($Dim[$n], 'Fatal error')>0 ){
$php_errormsg = trim($Dim[$n]);
$php_errormsg = str_replace('<br />', '', $php_errormsg);
$php_errormsg = str_replace(array('<b>', '</b>'), array('<B>', '</B>'), $php_errormsg);
$OriFichero = $_Include;
if( eSubstrCount($_Include, 'edes/t/31.gs')>0 ) exit;
_ShowError($php_errormsg, $__DIR__.'/'.$_Include);
return;
}
}
echo "<script type='text/javascript'>alert('ERROR en script \"{$_Include}\"');</script>";
}
if( !isset($php_errormsg) || $php_errormsg=='' ) return;
if( $_Include=='' ) exit;
_ShowError($php_errormsg, $__DIR__.'/'.$_TmpInclude);
if( $_HndDB ) qEnd();
}
function _ExeEval($Exe, $Buffer, $Saltar=false){
global $__EVAL__, $_Modo, $_SubModo, $_Mode, $Opcion, $_vF, $_Sql, $_Variable;
$__EVAL__ = $Buffer;
if( !$Saltar && ($Exe[0]=='&' || $Exe[0]=='<' || $Exe[0]=='(') ) return $Exe;
foreach($_GET as $k=>$v) ${$k} = $v;
foreach($_POST as $k=>$v) ${$k} = $v;
foreach($GLOBALS as $k=>$v) if( !is_array($v) ) ${$k} = $v;
if( mb_substr($Exe,-1)==';') $Exe = rtrim(mb_substr($Exe,0,-1));
$Long = mb_strlen(ob_get_contents());
if( mb_substr($Exe,0,7)=='select ' || mb_substr($Exe,0,7)=='qCount(' ){
if( !function_exists('qQuery') ){
include_once($GLOBALS['Dir_'].$_Sql.'.inc');
}
if( mb_substr($Exe,0,7)=='select ' ){
$txt = _InVar($Exe);
qQuery($txt);
$r=qRow();
return($r[0]<>0);
}else $Exe = _InVar($Exe);
}
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return ('.$Exe.');');
$txt = eval('return ('.$Exe.');');
if( eSubstrCount(mb_substr(ob_get_contents(),$Long), '<b>Parse error</b>')==1 ) _ShowError('*', '_eval_');
$__EVAL__ = '';
if( is_bool($txt) ) return $txt*1;
return $txt;
}
function _InVar($txt, &$Valor='', $conIcon=false){
$dimProp = array("SETUP::", "SESS::", "S::");
for($n=0; $n<3; $n++){
while( eSubstrCount($txt, '{'.$dimProp[$n].'$')>0 && eSubstrCount($txt, '}')>0 ){
$nomPropiedad = $dimProp[$n].eMid($txt, "{".$dimProp[$n], "}");
$Valor = trim(eval("return {$nomPropiedad};"));
$txt = str_replace('{'.$nomPropiedad.'}', $Valor, $txt);
}
}
while( eSubstrCount($txt, '{$')>0 && eSubstrCount($txt, '}')>0 ){
$Ini = mb_strpos($txt,'{$');
$Fin = mb_strpos($txt,'}');
$var = mb_substr($txt, $Ini, $Fin-$Ini+1);
$var2 = eMid($txt,'{$','}',false);
if( eSubstrCount($var2,'][')==1 ){
list($tmp) = explode('[',$var2);
eval('global $'.$tmp.';');
$Valor = eval(';return $'."{$var2};");
}else if( isset($GLOBALS[$var2]) ){
$Valor = trim($GLOBALS[$var2]);
if( $Valor=='' && isset($GLOBALS['_vF'][$var2]) ) $Valor = $GLOBALS['_vF'][$var2];
}else{
if( mb_substr($var2,0,4)=='_vF[' ){
$Valor = $GLOBALS['_vF'][eMid($var2,"[","]",false)];
}else if( mb_substr($var2,0,6)=='_SESS[' ){
$Valor = SESS::${eMid($var2,"[","]",false)};
}else if( mb_substr($var2,0,6)=='_POST[' ){
$Valor = $_POST[eMid($var2,"[","]",false)];
}else if( mb_substr($var2,0,5)=='_GET[' ){
$Valor = $_GET[eMid($var2,"[","]",false)];
}else if( mb_substr($var2,0,5)=='_ENV[' ){
$Valor = $_ENV[eMid($var2,"[","]",false)];
}else if( mb_substr($var2,0,7)=='_SETUP[' ){
$Valor = SETUP::$System[eMid($var2,"[","]",false)];
}else if( mb_substr($var2,0,8)=='GLOBALS[' ){
$var2 = eMid($var2,"[","]",false);
if( $var2[0]=="'" || $var2[0]=='"' ) $var2 = eMid($var2,1,-1);
$Valor = $GLOBALS[$var2];
}else{
$Valor = $GLOBALS['_vF'][$var2];
}
}
$txt = str_replace($var, trim($Valor), $txt);
}
if( isset($txt[0]) && $txt[0]=='$' ){
if( isset($GLOBALS[mb_substr($txt,1)]) ){
$txt = $GLOBALS[mb_substr($txt,1)];
}
}
if( $conIcon ){
while( eSubstrCount($txt, "[")>0 && eSubstrCount($txt, "]")>0 ){
$desde = mb_strpos($txt,"[");
$hasta = mb_strpos($txt,"]");
$iz = mb_substr($txt,0,$desde);
$dch = mb_substr($txt,$hasta+1);
$Macro = trim(mb_substr($txt, $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
if( $dentro!="" ) $dentro = ' title="'.str_replace(array('"',"'"), array("&#34;","&#39;"), $dentro).'"';
$txt = eIcon(trim($icono), $dentro);
$txt = $iz.$txt.$dch;
}
}
return $txt;
}
function _InFunction($buffer){
$Inicio = '<'.'?';
$Final = '?'.'>';
if( eSubstrCount($buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
for($n=0; $n<2; $n++){
$Inicio = ($n==0) ? '<'.'?=' : '<'.'?';
while( eSubstrCount($buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
$desde = mb_strpos($buffer,$Inicio);
$hasta = mb_strpos($buffer,$Final);
$Macro = trim(mb_substr($buffer, $desde+mb_strlen($Inicio), $hasta-$desde-mb_strlen($Inicio)));
$oEti = _ExeEval($Macro, $buffer);
if( mb_substr($Macro,0,11)=='ePermission' || mb_substr($Macro,0,12)=='!ePermission' ) $oEti = (($oEti)?'true':'false');
$buffer = mb_substr($buffer, 0, $desde).$oEti.mb_substr($buffer, $hasta+2);
}
}
}
return $buffer;
}
function _CreateVar(&$_Form=NULL){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
$p = 0;
foreach($_CREATEVAR as $k=>$v){
for($nf=0; $nf<count($_Form); $nf++){
for($c=0; $c<count($_Form[$nf]); $c++){
while( ($p=mb_strpos($_Form[$nf][$c], $k, $p))!==false ){
$sc = mb_substr($_Form[$nf][$c], $p+mb_strlen($k), 1);
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$_Form[$nf][$c] = mb_substr($_Form[$nf][$c], 0, $p).$v.mb_substr($_Form[$nf][$c], $p+mb_strlen($k));
}
$p++;
}
}
}
}
}
function _CreateVarOne(&$Dato=NULL){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
$p = 0;
foreach($_CREATEVAR as $k=>$v){
while( ($p = mb_strpos($Dato, $k, $p))!==false ){
$sc = mb_substr($Dato, $p+mb_strlen($k), 1);
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$Dato = mb_substr($Dato, 0, $p).$v.mb_substr($Dato, $p+mb_strlen($k));
}
$p++;
}
}
}
function ePermission($Label, $uDF=''){
global $_DF, $_User, $_ePermission, $_Sql;
if( $uDF=='' ) $uDF = $_DF;
$Label = trim($Label);
if( $Label[0]=="'" || $Label[0]=='"' ) $Label = mb_substr($Label,1,-1);
if( !function_exists('qQuery') ){
include('../_datos/config/sql.ini');
if( SESS::$spider['opcion']=="E" ) $_Sql = "spider";
include_once(__DIR__.'/'.$GLOBALS['_Sql'].'.inc');
}
$tmp = explode(',', $Label);
if( count(array_intersect($tmp, $_ePermission))>0 ) return true;
$Label = '';
for($n=0; $n<count($tmp); $n++){
if( in_array($tmp[$n], $_ePermission)==0 ){
if( $Label!='' ) $Label .= ',';
$Label .= $tmp[$n];
}
}
$Label = "'".str_replace(',',"','",$Label)."'";
qQuery("select script from {$_ENV['eDesDictionary']}gs_tpermission where nm_gs_tpermission in ( {$Label} ) and active='{$_ENV['ON']}'", $p1);
list($sDF) = qRow($p1);
if( trim($sDF)=='' ){
$Condi = '';
}else{
$Condi = " and t.script='{$uDF}'";
}
if( eSqlType('mysql,mysqli') ){
qQuery("select count(*) as n from {$_ENV['eDesDictionary']}gs_tpermission as t left join {$_ENV['eDesDictionary']}gs_permission as p on p.cd_gs_tpermission=t.cd_gs_tpermission
where p.cd_gs_user={$_User} {$Condi} and t.nm_gs_tpermission in ( {$Label} ) and t.active='{$_ENV['ON']}'", $p1);
}else{
qQuery("select count(*) n from {$_ENV['eDesDictionary']}gs_tpermission t, {$_ENV['eDesDictionary']}gs_permission p
where p.cd_gs_user={$_User} {$Condi} and t.nm_gs_tpermission in ( {$Label} ) and t.active='{$_ENV['ON']}' and p.cd_gs_tpermission=t.cd_gs_tpermission", $p1);
}
list($n) = qRow($p1);
return($n>0);
}
function ePermissionOption($nOp){
if( SETUP::$Desktop['DesktopTreeType']!="O" ) return false;
$dimPrefijo = array();
foreach(SETUP::$System['Multitenancy'] as $k=>$v){
$dimPrefijo[$v] = $_ENV['eDesDictionary'];
}
qQuery("select mode from {$dimPrefijo['gs_op']}gs_op where cd_gs_op={$nOp} and type='O'");
list($uMode) = qRow();
if( $uMode=="" ) return false;
$TieneElArbol   = (qCount($dimPrefijo["gs_user_tree"]."gs_user_tree",  "cd_gs_user=".S::$_User." and cd_gs_tree in (select cd_gs_tree from {$dimPrefijo['gs_tree_op']}gs_tree_op where cd_gs_op={$nOp}) and (mode like '%,{$uMode},%' or mode='{$uMode}')")>0);
$TieneLaOpcion  = (qCount($dimPrefijo["gs_user_op"]."gs_user_op", "cd_gs_op={$nOp} and action='I'")>0);
$OpcionDenegada = (qCount($dimPrefijo["gs_user_op"]."gs_user_op", "cd_gs_op={$nOp} and action='D'")>0);
return (($TieneElArbol || $TieneLaOpcion) && !$OpcionDenegada);
}
function _IncludeJsHtml(&$txt, $label, $conDef=true){
global $_vF, $__EVAL__, $_DEBUG, $_TRACELABEL;
$EsJS = (mb_strtoupper(mb_substr($label,0,2))=='JS');
$EsHTML = (mb_strtoupper(mb_substr($label,0,2))=='HT');
$traceConConsole = $traceConVar = false;
if( $_DEBUG==2 && ($label==$_TRACELABEL || $_TRACELABEL=="JS") && $EsJS ){
global $__eLINE__;
if( $GLOBALS["_TRACECONSOLE"] ) $traceConConsole = true;
else $traceConVar = true;
}
$dim = explode("\n", $txt);
$txt = null;
unset($txt);
if( $EsJS ){
if( $conDef ) echo "<SCRIPT name='{$label}'>S.public(1);\n";
}else{
echo "\n";
}
foreach($_GET as $k=>$v) ${$k} = $v;
foreach($_POST as $k=>$v) ${$k} = $v;
foreach($_vF as $k=>$v) ${$k} = $v;
$inicio = array('<'.'?=', '<'.'?');
$final = '?'.'>';
$t = count($dim);
$txt = "";
for($n=0; $n<$t; $n++){
$linea = $dim[$n];
if( $traceConConsole ) echo 'console.log('.$n.'.'.(++$__eLINE__).");\n";
else if( $traceConVar ) echo '__eLINE__ = '.(++$__eLINE__).";\n";
if( $EsHTML && mb_substr($linea,0,5)=='&#46;' ) $linea = '.'.mb_substr($linea,5);
if( preg_match('/^include(/u', $linea) ){
$res = eMid($linea, '(', ')', false);
echo file_get_contents(trim($res));
continue;
}
do{
if( ($res=eMid($linea, '{$', '}', false))<>null ){
if( eSubstrCount($res, "[")>0 ){
$arg1 = explode("[", $res)[0];
$arg2 = eMid($res, '[', ']', false);
switch($arg1){
case '_POST':
$valor = $_POST[$arg2];
break;
case '_GET':
$valor = $_GET[$arg2];
break;
case '_SESS':
$valor = SESS::${$arg2};
break;
case '_vF':
$valor = $_vF[$arg2];
break;
default:
$valor = $GLOBALS[$arg1][$arg2];
}
}else{
$valor = $GLOBALS[$res];
}
$linea = str_replace('{$'.$res.'}', $valor, $linea);
}
}while( $res<>NULL );
for($i=0; $i<2; $i++){
do{
if( ($res=eMid($linea, $inicio[$i], $final, false))<>null ){
$sres = $res;
$res = trim($res);
if( mb_substr($res,-1)==';') $res = trim(mb_substr($res,0,-1));
$__EVAL__ = $res;
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return('.$res.');');
$valor = eval('return('.$res.');');
if( $valor=="" && preg_match('/^[$]{1}[_A-Za-z]{1,35}$/u', $res) ){
$valor = $GLOBALS[mb_substr($res,1)];
}
if( mb_substr($res,0,11)=='ePermission' || mb_substr($res,0,12)=='!ePermission' ) $valor = (($valor)?'true':'false');
$linea = str_replace($inicio[$i].$sres.$final, $valor, $linea);
}
}while( $res<>NULL );
}
echo $linea."\n";
}
if( $EsJS ){
if( $conDef ) echo "\nS.public();</SCRIPT>\n";
}else{
echo "\n";
}
}
function eCheckUser(){
global $__DIR__, $_gsID, $__iniSCRIPT__;
if( S::$_User==-1 || $_gsID!=getmypid() ){
eInit();
die('Acceso no autorizado');
}
$File = debug_backtrace();
$File = str_replace('\\','/',$File[0]['file']);
$Quitar = str_replace('/http', '/d/', $__DIR__);
$__iniSCRIPT__ = str_replace($Quitar, '', $File);
}
function eUnSet($txt){
global $_ContextFieldsADD;
$tmp = explode(',', eNsp($txt));
for($n=0; $n<count($tmp); $n++){
$NmVar = $tmp[$n];
unset($GLOBALS[$NmVar]);
unset($_POST[$NmVar]);
unset($_REQUEST[$NmVar]);
unset($_GET[$NmVar]);
unset($_SERVER[$NmVar]);
$_ContextFieldsADD[$NmVar] = 1;
}
}
function eGetMicroTime($mili=false){
if( !$mili ){
return number_format(microtime(true), 6, '.', '');
}
list($milisegundos) = explode(' ', microtime());
return mb_substr($milisegundos, 2, 9);
}
function eGetInterval(){
return number_format(eGetMicrotime() - $_ENV[SYS]['IniSg'], 2, '.', '');
}
function eGetCDI(){
return date('Y-m-d H:i:s');
}
function _MicroSg(){
return date('H:i:').str_pad(sprintf( "%2.6f", (date('s')+mb_substr(microtime(),0,8))), 9 ,'0',STR_PAD_LEFT);
}
$_eLogIniFile = '';
$_eLogIniWidth = 0;
$_eLogMicroTime = 0;
$_eLogIMicroTime = 0;
$_eLogEMicroTime = 0;
function eLogIni($File, $AnchoIz=2){
$File = '../_tmp/'.$File;
@unlink($File);
$GLOBALS['_eLogIniFile'] = $File;
$GLOBALS['_eLogIniWidth'] = $AnchoIz+3;
$GLOBALS['_eLogMicroTime'] = eGetMicrotime();
$GLOBALS['_eLogIMicroTime'] = $GLOBALS['_eLogMicroTime'];
eLogTxt('START '.date('Y-m-d H:i:s'));
}
function eLogTxt($txt){
if( $GLOBALS['_eLogIniFile']!='' ){
error_log(
str_pad(number_format(eGetMicrotime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), $GLOBALS['_eLogIniWidth'], ' ', STR_PAD_LEFT).
str_pad(number_format(eGetMicrotime()-$GLOBALS['_eLogIMicroTime'],2,',',''), 3, ' ', STR_PAD_LEFT).
" {$txt}\n", 3, $GLOBALS['_eLogIniFile'] );
$GLOBALS['_eLogIMicroTime'] = eGetMicrotime();
}
}
function eLogEnd(){
eLogTxt('FINISH '.date('Y-m-d H:i:s'));
}
function eLogDebugIni($txt){
if( $GLOBALS['_eLogMicroTime']==0 ){
error_log(date('Y-m-d H:i:s')." {$txt}\n", 3, '../_tmp/log/sql.'.S::$_User);
$GLOBALS['_eLogMicroTime'] = eGetMicroTime();
$GLOBALS['_eLogEMicroTime'] = $GLOBALS['_eLogMicroTime'];
}else{
error_log(str_repeat(" ",20)."{$txt}\n", 3, '../_tmp/log/sql.'.S::$_User);
}
}
function eLogDebug($txt){
include(__DIR__.'/m/elogdebug.inc');
}
function _SaveSessionDDBB($inicio=false){
global $Dir_, $_Sql, $_User, $_Node, $_Connection_, $_Tree;
$id = $_GET['_SESS_'];
list($Y, $m, $d, $H, $i, $s) = explode(" ", date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s', mktime($H-24, $i, $s, $m, $d, $Y));
$IP = S::getClientIP();
S::qConnect();
if( S::qCount("{$_ENV['eDesDictionary']}gs_conexion", "id='{$id}' and cdi>'{$cdi}' and cdi_fin is null")==0 || $inicio ){
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_conexion
(cd_gs_navegador, exe,    id  ,    ip  ,cd_gs_tree,cd_gs_user,zip,cd_gs_node,access,			cdi		 	 )
values
(      '0'      , 'W', '{$id}', '{$IP}',    '0'   ,    '0',    '',    '0'   ,   1  ,'".date('Y-m-d H:i:s')."')"
);
SESS::$_Connection_ = S::qId();
if(S::$__tronSession) eTronSession("   SYS-1 >>> _Connection_ = ".SESS::$_Connection_);
}else if( empty(SESS::$_Connection_) ){
S::qQuery("select conexion from {$_ENV['eDesDictionary']}gs_conexion where id='{$id}' and cdi>'{$cdi}'");
$r = S::qArray();
SESS::$_Connection_ = $r["conexion"];
if(S::$__tronSession) eTronSession("   SYS-2 >>> _Connection_ = ".SESS::$_Connection_);
}
S::qQuery("update {$_ENV['eDesDictionary']}gs_conexion set access='".eContextPK()."' where conexion=".SESS::$_Connection_);
}
function _EsIntruso(){
S::qConnect();
if( SESS::$spider['opcion']!="" && SESS::$_IST_!=0 && S::qCount("{$_ENV['eDesDictionary']}gs_conexion", "id='{$_GET['_SESS_']}' and conexion=".SESS::$_Connection_." and exe='-'")>0 ){
include(__DIR__.'/itm/intruder.php');
}
}
function eNextTime($an=0, $me=0, $di=0, $ho=0, $mi=0, $se=0){
return date('Y-m-d H:i:s', mktime( date('H')+$ho, date('i')+$mi, date('s')+$se,  date('m')+$me, date('d')+$di, date('Y')+$an));
}
function _IDSRV(){
global $_SqlHostName, $_Sql, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword;
$dim = eFileGetVar("System");
if( !$dim["Multitenancy"] ){
if( $_Sql==null || $_Sql!='' ){
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
}
}else{
$tmpFile = '../_datos/config/share.ini';
include($tmpFile);
}
return mb_strtoupper(md5($_SqlHostName.'|'.$_Sql.'|'.$_SqlDiccionario.'|'.$_SqlUsuario.'|'.$_SqlPassword));
}
function eFillSelect($NmField, $Dim, $AddAtributo=""){
$NCol = 2;
if( count($Dim)>0 ) $NCol = count($Dim[0]);
echo "<TABLE INIT=0 id='{$NmField}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' border=0 cellspacing=0 cellpadding=2px cols={$NCol}>";
echo '<COL id=o><COL>';
if( is_string($AddAtributo) && $AddAtributo<>"" ){
echo "<COL id=o NM_ATRIBUTE={$AddAtributo}>";
}else if( is_array($AddAtributo) ){
for( $f=0; $f<count($AddAtributo); $f++ ) echo "<COL id=o NM_ATRIBUTE=".$AddAtributo[$f].">";
}
for( $n=2; $n<$NCol; $n++ ) echo '<COL id=o>';
for( $f=0; $f<count($Dim); $f++ ){
echo '<TR>';
for( $c=0; $c<count($Dim[$f]); $c++ ){
if( $c==1 ){
if( $Dim[$f][$c]=='' ){
$Dim[$f][$c] = '&nbsp;';
}else if( $Dim[$f][$c]=='-' ){
echo '<TD id=Line>';
continue;
}
}
echo '<TD>'.$Dim[$f][$c];
}
}
echo '</TABLE>';
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
_WOPENER.CopySubSelect(Array('<?=$NmField?>=<?=$NmField?>'), DGI("<?=$NmField?>_TABLE"), "");
_WOPENER.DGI("<?=$NmField?>").value = '';
</SCRIPT>
<?PHP
}
function eFileGetVar($Clave='', $Publicar=false){
$oldClave = $Clave;
if( eSubstrCount($Clave,'->')==0 ){
list($Clave, $Variable) = explode('.', $Clave.".");
$Clave = trim($Clave);
$Variable = trim($Variable);
if( !empty($Variable) ){
return SETUP::${$Clave}[$Variable];
}else if( class_exists("SETUP") && isset(SETUP::$System[$Clave]) ){
if( $Publicar ){
foreach(SETUP::$System[$Clave] as $k=>$v){
$GLOBALS[$k] = $v;
}
}
return SETUP::$System[$Clave];
}
}
if( !function_exists('GetValor') ){
function GetValor($Valor){
if( mb_strlen($Valor)>=2 ) if( $Valor[0]==mb_substr($Valor,-1) && ($Valor=='"' || $Valor="'") ) $Valor = mb_substr($Valor,1,-1);
if( mb_strtoupper($Valor)=='FALSE' || mb_strtoupper($Valor)=='TRUE' ) $Valor = mb_strtoupper($Valor)=='TRUE';
if( $Valor==NULL ) $Valor = '';
return $Valor;
}
}
if( !function_exists('quitaRem') ){
function quitaRem($txt){
$p = mb_strpos($txt, REM);
if( $p!==false ){
if( mb_substr($txt,$p-1,1)=="=" || mb_substr($txt,$p-2,1)=="=" || mb_substr($txt,$p-1,1)==":" ){
$p = mb_strpos($txt, REM, $p+1);
if( $p!==false ){
$txt = mb_substr($txt,0,$p);
}
}else{
$txt = mb_substr($txt,0,$p);
}
}
return $txt;
}
}
$NmFile = '../_datos/config/group.var';
$VarDentroGrupo = true;
$Variable = '';
$DimVar = array();
$RetornaDim = true;
$Valor = "";
if( eSubstrCount($Clave,'->')>0 ){
list($NmFile, $Variable) = explode('->',$Clave);
$NmFile = eScript(trim($NmFile));
$Variable = trim($Variable);
$VarDentroGrupo = false;
$Clave = $Variable;
}
if( eSubstrCount($Clave,'.')==1 ){
list($Clave, $Variable) = explode('.', $Clave.".");
$Clave = trim($Clave);
$Variable = trim($Variable);
$VarDentroGrupo = true;
$RetornaDim = false;
}
if( !empty($Clave) ){
$Clave = mb_strtoupper(trim($Clave));
if( mb_substr($Clave,-1)!=':' ) $Clave .= ':';
}
$nv = 0;
if( eSubstrCount($NmFile, '/_datos/config/sql.ini')>0 ){
$txt = trim(@file_get_contents($NmFile));
if( mb_substr($txt,0,2)!='<'.'?' ){
$txt = gzuncompress($txt);
$Divide = ((eSubstrCount($txt,CHR10)>=eSubstrCount($txt,CHR13)) ? CHR10 : CHR13 );
$Dim = explode($Divide,$txt);
}else{
$Dim = file($NmFile);
}
}else{
$Dim = file($NmFile);
}
$signoIgual = '=';
if( eFileType($NmFile)=='css' ) $signoIgual = ':';
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = quitaRem($Dim[$n]);
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=='' ) continue;
if( ($Clave=='' && mb_substr($Dim[$n],-1)==':') || mb_strtoupper($Dim[$n])==$Clave || !$VarDentroGrupo ){
$keyGroup = mb_substr($Dim[$n],0,-1);
if( !$VarDentroGrupo ) $n = -1;
for($i=$n+1; $i<count($Dim); $i++){
$key = quitaRem($Dim[$i]);
$key = trim($key);
if( $key!='' && $key[0]!='.' ){
if( mb_substr($key,-1)==':' ){
if( $Clave=="" ) break;
else break 2;
}
$nv++;
if( !empty($oldClave) && mb_substr($key, -1)==';' ){
$key = trim(mb_substr($key, 0, -1));
}
$p = mb_strpos($key, $signoIgual);
if( $p!==false ){
$NmVar = trim(mb_substr($key,0,$p));
$Valor = trim(mb_substr($key,$p+1));
if( !$VarDentroGrupo ){
$Valor = quitaRem($Valor);
$Valor = trim($Valor);
if( mb_substr($Valor,-1)==';' ) $Valor = trim(mb_substr($Valor,0,-1));
}
if( mb_strlen($Valor)>=2 ) if( $Valor[0]==mb_substr($Valor,-1) && ($Valor[0]=='"' || $Valor[0]=="'") ) $Valor = trim(mb_substr($Valor,1,-1));
if( mb_strtoupper($Valor)=='FALSE' || mb_strtoupper($Valor)=='TRUE' ) $Valor = (mb_strtoupper($Valor)=='TRUE');
if( mb_strtoupper($Valor)=='!FALSE' || mb_strtoupper($Valor)=='!TRUE' ) $Valor = (mb_strtoupper($Valor)=='!FALSE');
if( $Variable!='' ){
if( $Variable==$NmVar ) return $Valor;
}else{
if( $Clave=='' ){
$DimVar[$keyGroup][$NmVar] = $Valor;
}else{
$DimVar[$NmVar] = $Valor;
if( $Publicar ) $GLOBALS[$NmVar] = $Valor;
}
}
}
}
}
if( $Clave!='' ) break;
}
}
if( $nv>1 )
if( $RetornaDim ) return $DimVar;
return '';
}
function eExplodeOne($txt, $Char, &$iz=NULL, &$dch=NULL, $saveChar=false){
if( $Char=='' ){
$p = mb_strpos($txt, REM);
}else{
$p = mb_strpos($txt, $Char);
}
if( $p===false ){
$iz = $txt;
$dch = '';
}else{
$iz = mb_substr($txt, 0, $p);
if( $Char=='' ) $p--;
$dch = mb_substr($txt, $p+1);
if( mb_strlen(rtrim($iz))<mb_strlen($iz) ){
$dch = mb_substr($iz, mb_strlen(rtrim($iz))-mb_strlen($iz)).$dch;
}
$iz = rtrim($iz);
if( $saveChar ) $iz .= $Char;
}
return [$iz, $dch];
}
function eExplodeLast($txt, $Char, &$iz=NULL, &$dch=NULL){
if( $Char=='' ){
$p = mb_strrpos($txt, REM);
}else{
$p = mb_strrpos($txt, $Char);
}
if( $p===false ){
$iz = $txt;
$dch = "";
}else{
$iz = mb_substr($txt, 0, $p);
if( $Char=="" ) $p--;
$dch = mb_substr($txt, $p+1);
if( mb_strlen(rtrim($iz))<mb_strlen($iz) ){
$dch = mb_substr($iz, mb_strlen(rtrim($iz))-mb_strlen($iz)).$dch;
}
$iz = rtrim($iz);
}
}
function eFilePutVar($File, $Dim){
if( $File=='group.var' ) $File = '/_datos/config/group.var';
$EsGroupVar = ($File=='/_datos/config/group.var');
$grupo = "";
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i][0] = trim($Dim[$i][0]);
if( !$EsGroupVar && $Dim[$i][0][0]!='$' ) $Dim[$i][0] = '$'.$Dim[$i][0];
}
$text = '';
$EsRem = false;
$Lineas = file(eScript($File));
for($n=0; $n<count($Lineas); $n++){
$Linea = trim($Lineas[$n]);
if( $Linea=='/'.'*'){
$EsRem = true;
}else if( $Linea=='*'.'/'){
$EsRem = false;
}else if( !$EsRem && $Linea[0]!='/' && ($Linea[0]=='$' || $EsGroupVar) && eSubstrCount($Lineas[$n],'=')>0 ) {
eExplodeOne($Lineas[$n], '=', $Variable, $Valor);
$FinLinea = (($EsGroupVar)?'':';');
for($i=0; $i<count($Dim); $i++){
if( $grupo.trim($Variable)==$Dim[$i][0] ){
if( $EsGroupVar ){
eExplodeOne($Valor, '', $oValor, $Rem);
}else{
eExplodeOne($Valor, ';', $oValor, $Rem);
}
$oValor = trim($oValor);
if( ($oValor[0]=='"' && mb_substr($oValor,-1)=='"') || ($oValor[0]=="'" && mb_substr($oValor,-1)=="'") ){
$Lineas[$n] = rtrim($Variable).' = '.$oValor[0].$Dim[$i][1].$oValor[0].';'.$Rem;
}else if( is_bool($Dim[$i][1]) ){
$Lineas[$n] = rtrim($Variable).' = '.(($Dim[$i][1]==true)? 'true':'false').$FinLinea.$Rem;
}else{
$Lineas[$n] = rtrim($Variable).' = '.$Dim[$i][1].$FinLinea.$Rem;
}
break;
}
}
}else{
if( $EsGroupVar && mb_substr($Linea,-1)==":" ) $grupo = mb_substr($Linea,0,-1).".";
}
$text .= $Lineas[$n];
if( mb_substr($Lineas[$n],-1)!="\n" ) $text .= "\n";
}
copy(eScript($File), eScript($File.'.bak'));
return file_put_contents(eScript($File), trim($text));
}
function qRecordMD5($xTabla, $NTX, $DBRLOCKNOFIELD=""){
if( !is_array($xTabla) ) $xTabla = array($xTabla);
$sRLOCK = SESS::$_Connection_;
if( trim($NTX)!='' ) $NTX = ' where '.$NTX;
for($n=0; $n<count($xTabla); $n++){
$sTabla = '';
if( eSubstrCount($xTabla[$n], ", {$_ENV['eDesDictionary']}gs_dct zz ")>0 ){
list($sTabla) = explode(", {$_ENV['eDesDictionary']}gs_dct zz ", $xTabla[$n]);
$sTabla = trim($sTabla).'.';
}
qQuery("select {$sTabla}* from ".$xTabla[$n].$NTX, $p1);
$r = qArray($p1);
if( is_array($r) ) foreach($r as $key=>$val){
if( !is_numeric($key) && eSubstrCount($DBRLOCKNOFIELD, ",{$key},")==0 ){
if( !is_object($val) ){
$sRLOCK .= $key.$val;
}else{
$sRLOCK .= $key.$val->load();
}
}
}
}
return md5($sRLOCK);
}
function _CheckDir($dir){
if( !file_exists(eScript($dir)) && !file_exists($dir) ){
eTron('El directorio "'.eScript($dir).'" - "'.$dir.'" no existe', "HSE");
eMessage('El directorio "'.$dir.'" no existe', "HSE");
}
}
function qDBAddFilter($campo, $sql="", $incluido=false, $valor=NULL){
global $_DBADDFILTER;
if( gettype($valor)=="NULL" && gettype($_POST[$campo])=="NULL" ) return;
$condi = qCondition($campo, $sql, $incluido, $valor);
if( $condi<>"" ){
if( $_DBADDFILTER<>"" ) $_DBADDFILTER .= " and ";
$_DBADDFILTER .= $condi;
}
}
function qCondition($campo, $sql="", $incluido=false, $valor=NULL){
if( !function_exists('CondiSQLOracle') ) include_once(__DIR__.'/condicion.inc');
$condi = '';
if( gettype($campo)=='array' ){
for($n=0; $n<count($campo); $n++){
$txt = qCondition($campo[$n][0], $campo[$n][1], $campo[$n][2], $campo[$n][3]);
if( $txt<>'' ){
if( $condi<>'' ) $condi .= ' and ';
$condi .= $txt;
}
}
return $condi;
}
$condi = '';
$val = ($valor==NULL)? trim($_POST[$campo]) : $valor;
if( $val<>"" ){
if( $incluido && !preg_match("/[<>=]/u", $val) ){
$val = str_replace("**", "*", "*{$val}*");
}
if( eSqlType('oracle') ){
$condi = CondiSQLOracle($campo, $val);
}else{
$condi = CondiSQL($campo, $val);
}
}
if( $condi<>"" && $sql<>"" ) $condi = str_replace("#", $condi, $sql);
return $condi;
}
function ___Lng($buffer){
if( $GLOBALS['_LNGCOL']>-1 && !(mb_strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++){
$buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
}
foreach($_LngPublic as $k=>$v){
$buffer = str_replace($k, $v, $buffer);
}
}
return $buffer;
}
function eLngReplaze($buffer){
if( $GLOBALS['_LNGCOL']>-1 ){
global $__Lng;
$sbuffer = '';
while( $sbuffer!=$buffer && eSubstrCount($buffer, '@')>1 ){;
$sbuffer = $buffer;
$Dim = explode('@', $buffer);
for($i=1; $i<count($Dim); $i++){
$txt = $Dim[$i];
if( $__Lng[$txt]<>'' ){
$buffer = str_replace('@'.$txt.'@', $__Lng[$txt], $buffer);
break;
}
}
}
}
return str_replace(array("'",'"'), array('&#39;','&#34;'), $buffer);
}
function eLng($i, $v1='', $v2='', $v3=''){
$txt = $GLOBALS['_Lng'][$i];
if( $txt=='' ){
global $_LANGUAGE, $_LngPublic;
$buffer = '@'.$i.'@';
for($n=0; $n<count($_LANGUAGE); $n++){
if( !(mb_strpos($buffer, $_LANGUAGE[$n][0])===false) ){
$txt = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
break;
}
}
if( $txt=='' ){
foreach($_LngPublic as $k=>$v){
if( !(mb_strpos($buffer, $k)===false) ){
$txt = str_replace($k, $v, $buffer);
break;
}
}
}
if( $GLOBALS['__Lng'][$i]!="" ) $txt = $GLOBALS['__Lng'][$i];
if( $txt=='' ) return '';
}
$txt = str_replace('&#','{~}',$txt);
if( $v3!='' ) $txt = str_replace('#3', $v3, $txt);
if( $v2!='' ) $txt = str_replace('#2', $v2, $txt);
if( $v1!='' ){
$txt = str_replace('#1', $v1, $txt);
$txt = str_replace('#', $v1, $txt);
}
$txt = str_replace('{~}','&#',$txt);
return $txt;
}
function eLngs($str, $value){
$dim = explode("~", $str);
if( $value>1 ) $value = 2;
return trim($dim[$value]);
}
function eLngLoad($File='', $Ext='', $Tipo=0){
global $_Lng, $__Lng, $_LngPublic, $_LANGUAGE, $JsTxtm, $_LanguageTables;
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
$Dim = debug_backtrace();
if( $Tipo==2 ){
if( $GLOBALS['_LanguageAdd'] ) return;
$GLOBALS['_LanguageAdd'] = true;
}
if( $Ext=='' ) $Ext = SESS::$_LANGUAGE_;
else if( $Ext=='*' ) $Lng = array();
if( $File=='' ){
if( $Dim[0]['args'][1]=='' && (mb_substr($Dim[0]['file'],-4)<>'.tmp' || $GLOBALS['E:CallSrv']<>'' ) ){
$File = $Dim[0]['file'];
$xFile = str_replace(CHR92,'/',$File);
}else{
eInit();
die( 'ERROR: La función "eLngLoad()" no es necesaria en ficheros "DF"' );
}
}else if( $File[0]=='*' ){
$File = '../../'.mb_substr($File,1);
}else if( $File[0]=='/' || $File[0]=='$' ) $File = eScript($File);
if( mb_substr($File,-4)!='.lng' ) $File .= '.lng';
$uCol = 1; $dCol = 1;
if( !file_exists($File) ){
if( $Tipo==2 ) return '';
eTrace('ERROR: Fichero "'.$File.'" no encontrado');
}
$tmp2 = file($File);
for($n=0; $n<count($tmp2); $n++){
list( $txt ) = explode('~',$tmp2[$n]);
$tmp = explode('|',$txt);
$Cod = trim($tmp[0]);
if( $Cod=='' || $Cod[0]=='.' ) continue;
if( $Cod[0]=='[' ){
list(,$Lngs) = explode(']',$tmp[0]);
$tmp4 = explode(',', trim(eNsp($Lngs)));
if( $Ext=='*' ) continue;
for($i=0; $i<count($tmp4); $i++){
if( $tmp4[$i]==$Ext ){
$uCol = $i+1;
}else if( $tmp4[$i]==SESS::$_LanguageDefault ){
$dCol = $i+1;
}
}
$Cod = 'LNGFILE';
$_Lng[$Cod] = '_'.SESS::$_LANGUAGE_;
$__Lng[$Cod] = '_'.SESS::$_LANGUAGE_;
$_LngPublic['@'.$Cod.'@'] = '_'.SESS::$_LANGUAGE_;
$_LngPublic['@LNG@'] = SESS::$_LANGUAGE_;
continue;
}
if( $Ext=='*' ){
for($i=0; $i<count($tmp4); $i++){
$txt = trim($tmp[$i+1]);
if( $txt=='' ) $txt = trim($tmp[0]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
if( SETUP::$System['CharsetText'] ){
$Lng[$tmp4[$i]][$Cod] = eAsciiToCode($txt);
}else{
$Lng[$tmp4[$i]][$Cod] = $txt;
}
}
}else{
$txt = trim($tmp[$uCol]);
if( $txt=='' ) $txt = trim($tmp[$dCol]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
if( SETUP::$System['CharsetText'] ){
$txt = eAsciiToCode($txt);
}
switch( $Tipo ){
case 0: $_Lng[$Cod] = $txt; break;
case 1: $__Lng[$Cod] = $txt; break;
case 2: $_LngPublic['@'.$Cod.'@'] = $txt; break;
case 3:
if( $JsTxt!='' ) $JsTxt .= ',';
if( !is_numeric($Cod) ) $Cod = "'{$Cod}'";
$txt = str_replace("'",CHR92."'",$txt);
$JsTxt .= "{$Cod}:'{$txt}'"; break;
}
}
}
if( $Tipo==3 ) return $JsTxt;
if( $Ext=='*' ) return $Lng;
}
function eMail($sPara, $sAsunto, $sTexto, $sDe, $nmFrom='', $cc='', $bcc='', $ConFiles=true, $SoloUno=true){
if( file_exists('../_datos/config/mail.inc') ){
if( !function_exists('eMailSmtp') ) include_once('../_datos/config/mail.inc');
if( is_bool($ConFiles) && $ConFiles ){
$ConFiles = array();
foreach($_FILES as $vAdjunto){
@unlink($vAdjunto['name']);
copy($vAdjunto['tmp_name'], $vAdjunto['name']);
$ConFiles[] = $vAdjunto['name'];
}
}else if( is_string($ConFiles) ){
if( $ConFiles=='' ){
$ConFiles = array();
}else{
$ConFiles = array($ConFiles);
}
}else if( is_array($ConFiles) ){
}
return eMailSmtp($sPara, $sAsunto, $sTexto, $sDe, $nmFrom, $cc, $bcc, $ConFiles);
}
if( !function_exists('eMail_') ) include_once(eScript('$email.inc'));
return eMail_($sPara, $sAsunto, $sTexto, $sDe, $nmFrom, $cc, $bcc, $ConFiles, $SoloUno);
}
function eOpCheck($NOp){
if( !function_exists('eOpCheck_') ) include_once( eScript('$itm/eopcheck.php') );
return eOpCheck_( $NOp );
}
function eExportSrvTable($t, $z){
if( !function_exists('eExportSrvTable_') ) include_once(eScript('$itm/ex_srv_tb.php'));
return eExportSrvTable_($t,$z);
}
function eNodeSend($records){
if( !function_exists('eNodeSend_') ){
eIncludeFileGlobal("../_datos/config/node_config.php");
include_once(eScript('$itm/enodesend.php'));
}
return eNodeSend_($records);
}
function eIncludeFileGlobal($file){
require($file);
foreach(get_defined_vars() as $k=>$v) $GLOBALS[$k] = $v;
}
function _PedirLogin(){
global $_RastrearSESS;
if( !function_exists('_PedirLogin_') ) include_once(eScript('$pedirlogin.php'));
_PedirLogin_();
}
function eUnEscape($txt, $AlReves=false){
$Dim = array(
array('&','&amp;'),
array('+','&#43;'),
array('<','&lt;'),
array('>','&gt;'),
array(CHR92,'&#92;'),
array('"','&quot;'),
array("'",'&#39;')
);
$p=0; $s=1;
if( $AlReves ){
$p=1; $s=0;
}
for($n=0; $n<count($Dim); $n++) $txt = str_replace($Dim[$n][$p], $Dim[$n][$s], $txt);
return $txt;
}
function eStrTranslater(&$Dim){
if( is_array($Dim) ){
foreach($Dim as $k=>$v) $Dim[$k] = eUnEscape($v, true);
}else{
$Dim = eUnEscape($Dim, true);
}
}
if( !function_exists('mb_str_split') ){
function mb_str_split($str){
return preg_split('~~u', $str, null, PREG_SPLIT_NO_EMPTY);;
}
}
function mb_strtr($str, $from, $to){
return str_replace(mb_str_split($from), mb_str_split($to), $str);
}
function eStrUpper($txt){
return mb_strtr(mb_strtoupper($txt), 'ñçáéíóúàèìòùâêîôûäëïöüãõ', 'ÑÇÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÃÕ');
}
function eStrLower($txt){
return mb_strtr(mb_strtolower($txt), 'ÑÇÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ', 'ñçáéíóúâêîôûàèìòùäëïöüãõ');
}
function eUcFirst($txt){
$txt = eStrLower($txt);
return eStrUpper($txt[0]).mb_substr($txt,1);
}
function eStrtr($inputStr, $from, $to){
$inputStrLength = mb_strlen($inputStr);
$translated = '';
for($i = 0; $i < $inputStrLength; $i++){
$currentChar = mb_substr($inputStr, $i, 1);
$translatedCharPos = mb_strpos($from, $currentChar, 0);
if($translatedCharPos === false){
$translated .= $currentChar;
}else{
$translated .= mb_substr($to, $translatedCharPos, 1);
}
}
return $translated;
}
function eTitleTransform($title){
switch(SETUP::$System['TitleTransform']){
case 'upper':
$title = eStrUpper($title);
break;
case 'lower':
$title = eStrLower($title);
break;
case 'capitalize':
$title = ucfirst($title);
break;
}
return $title;
}
function eClearAccent($string){
return preg_replace('~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml|caron);~i', '$1', htmlentities($string, ENT_QUOTES, 'UTF-8'));
}
function eCleanFilename($txt){
return preg_replace('([^A-Za-z0-9\.\s_-])', '', strtr(eClearAccent($txt), "Ççºª", "Ccoa"));
}
function eScriptToCache($script=''){
$txt = '';
foreach($_GET as $k=>$v) if( !preg_match('/^(_CONTEXT|_CACHE_|_ACCESS|_PKS)$/u', $k) ) $txt .= $k.'='.$v;
foreach($_POST as $k=>$v) if( $k[0]!="_" ) $txt .= $k.'='.$v;
return '../_tmp/cch/'.eStrtr(mb_strtolower(preg_replace("/['\"]/", "", (($script=='')? $GLOBALS["_oAccion"] : '').'~'.md5($txt))), ':/&=', '____');
}
function eBoolean($valor){
return (($valor)?"true":"false");
}
function eIn($esto, $aqui, $divide=NULL){
if( gettype($esto)=="array" ) $esto = implode("|", $esto);
if( $divide<>NULL ) $esto = str_replace($divide,"|",$esto);
$esto = str_replace(["[","]","-","+"], ["\[","\]","\-","\+"], $esto);
return preg_match("/[".$esto."]/u", $aqui);
}
function eIs($esto, $aqui, $divide=NULL){
if( gettype($aqui)=="array" ) $aqui = implode('|',$aqui);
if( $divide<>NULL ) $aqui = str_replace($divide,"|",$aqui);
$aqui = str_replace(["[","]","+","-"], ["\\[","\\]","\\+","\\+"], $aqui);
return preg_match('/^('.$aqui.')$/u', $esto);
}
function eNsp($v){
return trim(str_replace(array(" ","\t"),array("",""),$v));
}
function eLast($dim, $index=0){
$total = count($dim);
return $dim[$total-1+$index];
}
function eAsciiToCode($txt, $code=true){
$as = array(  "'"  ,   '"'   ,   "á"   ,   "é"	 ,   "í"   ,   "ó"   ,    "ú"  ,   "ü"   ,	 "Á"   ,   "É"	 ,   "Í"   ,   "Ó"   ,   "Ú"   ,    "Ü"  ,	 "ñ"   ,   "Ñ"	 ,   "ç"   ,   "Ç"   ,   "€"   ,    "º"  ,    "ª"  );
$cd = array('&amp;', '&quot;', "&#225;", "&#233;", "&#237;", "&#243;", "&#250;", "&#252;", "&#193;", "&#201;", "&#205;", "&#211;", "&#218;", "&#220;", "&#241;", "&#209;", "&#231;", "&#199;", "&#128;", "&#186;", "&#170;");
if( $code ){
$as[] = CHR92.'n';
$cd[] = "<br>";
return str_replace($as, $cd, $txt);
}else{
return str_replace($cd, $as, $txt);
}
}
function eReplace($subject){
$search = [];
$replace = [];
$numargs = func_num_args();
for($n=1; $n<$numargs; $n+=2){
array_push($search , func_get_arg($n));
array_push($replace, func_get_arg($n+1));
}
return str_replace($search, $replace, $subject);
}
function eReplaceVar($txt){
$numargs = func_num_args();
$cambiar = (eSubstrCount($txt, "&#")>0);
if( $cambiar ) $txt = str_replace("&#", "&~23~", $txt);
for($n=1; $n<$numargs; $n+=2){
$v = func_get_arg($n+1);
if( ((int)$v)==(int)$v && $v>999 ) $v = eNumberFormat($v);
$txt = str_replace(func_get_arg($n), $v, $txt);
}
if( $cambiar ) $txt = str_replace("&~23~", "&#", $txt);
return $txt;
}
function eReplaceAll($esto, $por, $aqui){
if( gettype($esto)=="string" ){
$esto = array($esto);
}
for($i=0; $i<count($esto); $i++){
while( eSubstrCount($aqui, $esto[$i])>0 ){
$aqui = str_replace($esto[$i], $por[$i], $aqui);
}
}
return $aqui;
}
function _NomFields($campo){
$campo = trim($campo);
if( eSubstrCount($campo,'{') ) list($campo) = explode('{',$campo);
if( eSubstrCount($campo,':') ) list($campo) = explode(':',$campo);
if( eSubstrCount($campo,' ') ){
$tmp = explode(' ',$campo);
$campo = $tmp[count($tmp)-1];
}
return trim($campo);
}
function _QueNmField($Form, $i){
$NomCampo = $Form[1];
if( $Form[0]=='-' ){
$NomCampo = '';
}else if( $NomCampo=='' && $Form[0][0]=='{' ){
$NomCampo = '';
}else if( $Form[0][0]=='{' ){
return $i;
}else if( eSubstrCount($NomCampo, '{')>0 ){
list($NomCampo) = explode('}',$NomCampo);
$tmp = explode(',',$NomCampo);
$NomCampo = trim($tmp[2]);
if( count($tmp)==5 ){
if( $tmp[3][0]=='"' || $tmp[3][0]=="'" ){
$NomCampo = trim($tmp[4]);
if( eSubstrCount($NomCampo, ' ')==0 ){
list($NomCampo) = explode('{',$Form[1]);
return trim($NomCampo);
}
}
}else if( count($tmp)==3 ){
if( eSubstrCount($NomCampo, ' ')==0 ){
list($NomCampo) = explode('{',$Form[1]);
return trim($NomCampo);
}else{
return trim(mb_substr($NomCampo, mb_strrpos($NomCampo,' ')+1));
}
}else{
list($NomCampo) = explode('{',$NomCampo);
return trim($NomCampo);
}
if( eSubstrCount($NomCampo, ' ')>0 ){
$NomCampo = trim(mb_substr($NomCampo, mb_strrpos($NomCampo,' ')+1));
}
}else if( eSubstrCount($NomCampo, ':')>0 ){
list(,$NomCampo) = explode(':',$NomCampo);
$NomCampo = trim($NomCampo);
}else if( eSubstrCount($NomCampo, ' ')>0 ){
$NomCampo = trim(mb_substr($NomCampo, mb_strrpos($NomCampo,' ')+1));
}
if( $NomCampo=='' ) $NomCampo = $i;
return $NomCampo;
}
function _FileDeleteTemp(){
$tmp = explode('|',$_POST["_FIELDSWITHFILES"]);
for( $n=0; $n<count($tmp)-1; $n++ ){
if( $_POST[$tmp[$n]]!='' ){
$FileTmp = '../_tmp/zip/'.S::$_User.'_'.$_POST[$tmp[$n]];
if( file_exists($FileTmp) ) @unlink( $FileTmp );
}
}
}
function qGetWhere($Prefijo="", $Transforma=true, &$Dim=NULL){
$withWhere = false;
if( $Prefijo!='' && $Prefijo[0]=="+" ){
$Prefijo = mb_substr($Prefijo, 1);
$withWhere = true;
}
if( $Prefijo!='' && mb_substr($Prefijo,-1)!='.' ) $Prefijo .= '.';
if( gettype($Transforma)=="array" ){
$Busca = "";
GetCondicion($Prefijo, $Busca, true, $Dim, $Transforma);
if( $withWhere && !empty($Busca) ) $Busca = " where {$Busca}";
return $Busca;
}
$Busca = $GLOBALS['_DBADDFILTER'];
if( $GLOBALS['_DBADDFILTEREXTRA']!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $GLOBALS['_DBADDFILTEREXTRA'];
}
GetCondicion($Prefijo, $Busca, $Transforma, $Dim);
if( $withWhere && !empty($Busca) ) $Busca = " where {$Busca}";
return $Busca;
}
function GetCondicion($Prefijo, &$Busca, $Transforma=true, &$DimFilter=NULL, $NewDim=false){
global $_Sql, $_ConDBRange, $_SqlPDOType, $_FILTER, $MemDBRange, $_DeleteWhereFields;
$DimFilter = array();
if( $NewDim==false ){
if( trim($_FILTER)!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $_FILTER;
}
$TotalCondi = count($_POST);
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
}else{
$TotalCondi = 0;
$DimNomVar = array();
$DimValor  = array();
foreach($NewDim as $k=>$v){
$TotalCondi++;
$DimNomVar[] = $k;
$DimValor[]  = $v;
}
}
if( mb_substr($Busca,-5)==" and " ) $Busca = mb_substr($Busca,0,-5);
if( mb_substr($Busca,0,5)==" and " ) $Busca = trim(mb_substr($Busca,5));
for($n=0; $n<$TotalCondi; $n++){
$DimNomVar[$n] = trim($DimNomVar[$n]);
if( isset($_DeleteWhereFields) && in_array($DimNomVar[$n], $_DeleteWhereFields) ) continue;
if( mb_substr(trim($DimNomVar[$n]), 0, 1)=='_' ) continue;
$DimValor[$n] = trim(stripslashes($DimValor[$n]));
if( $DimValor[$n]=='*' ) continue;
if( mb_substr($DimValor[$n],0,5)=='&#62;' ){
$DimValor[$n] = str_replace('&#62;', '>', $DimValor[$n]);
}
if( mb_substr($DimValor[$n],0,5)=='&#60;' ){
$DimValor[$n] = str_replace('&#60;', '<', $DimValor[$n]);
}
if( mb_substr($DimNomVar[$n],0,4)=='dct_' && $DimValor[$n]!='' ){
global $_DCT, $_DCT_SUFFIX;
$_DCT = $DimNomVar[$n];
$xBusca = '';
$tmp = explode(',', str_replace('  ', ' ', trim($DimValor[$n])));
for($p=0; $p<count($tmp); $p++){
if( $xBusca!='' ) $xBusca .= ' or ';
if( eSubstrCount($tmp[$p], '*')>0 ){
$xBusca .= "zz.dct_work like '".str_replace('*', '%', trim($tmp[$p]))."'";
}else{
$xBusca .= "zz.dct_work='".trim($tmp[$p])."'";
}
}
$xBusca = "zz.dct_field='{$DimNomVar[$n]}{$_DCT_SUFFIX}' and (".$xBusca.')';
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
$DimValor[$n] = '';
continue;
}
if( mb_strlen($DimValor[$n])>0 ){
$ConRange = false;
if( $_ConDBRange[$DimNomVar[$n]] ){
if( eSubstrCount($DimValor[$n], ' and ')>0 ){
$ConRange = true;
$DimValor[$n] = str_replace(' and '.$DimNomVar[$n], ' and '.$Prefijo.$DimNomVar[$n], $DimValor[$n]);
}
}
if( !eSqlType('oracle') && mb_strlen($DimValor[$n])==10 && mb_substr($DimValor[$n],2,1)=='-' && mb_substr($DimValor[$n],5,1)=='-' ){
if( !eSqlType('pdo.informix') ){
$DimValor[$n] = mb_substr($DimValor[$n],6,4).mb_substr($DimValor[$n],2,4).mb_substr($DimValor[$n],0,2);
}
}
if( $ConRange ){
if( eSubstrCount($DimValor[$n], '>=')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. ">='".str_replace('"',"'",mb_substr($DimValor[$n],2))."' ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. ">'" .str_replace('"',"'",mb_substr($DimValor[$n],1))."' ";
}
}else if( eSubstrCount($DimValor[$n],'*')>0 || eSubstrCount($DimValor[$n],'?')>0 ){
$xBuscar = str_replace("*", "%", $DimValor[$n]);
$xBuscar = str_replace("?", "_", $xBuscar);
$xBusca = $Prefijo.$DimNomVar[$n]. " like '" .$xBuscar. "'";
}elseif( $DimValor[$n]=='=' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}elseif( $DimValor[$n]=='<' || mb_strtoupper($DimValor[$n])=='NULL' || $DimValor[$n]=='<=' ){
$xBusca = '('.$Prefijo.$DimNomVar[$n]." is null or ".$Prefijo.$DimNomVar[$n]."='')";
}elseif( $DimValor[$n]=='>' ){
$xBusca = $Prefijo.$DimNomVar[$n].">' ' ";
}elseif( $DimValor[$n]=='<=' ){
if( !eSqlType('oracle') ){
$xBusca = '('.$Prefijo.$DimNomVar[$n]. " is null or ".$Prefijo.$DimNomVar[$n]."='') ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}
}elseif( $DimValor[$n]=='<>' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is not null ";
}elseif( $DimValor[$n][0]=='[' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " matches '" .$DimValor[$n]."' ";
}elseif( $DimValor[$n][0]=='(' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' in ' .str_replace('.',',',$DimValor[$n]). ' ';
}elseif( $DimValor[$n][0]==')' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' not in (' .str_replace('.',',',mb_substr($DimValor[$n],1,mb_strlen($DimValor[$n])-2)). ') ';
}else{
if( eSubstrCount($DimValor[$n],'||')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. " in ('" .str_replace('||',"','",$DimValor[$n]). "') ";
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
continue;
}
$xBusca = '';
$Campo = $Prefijo.$DimNomVar[$n];
$Valor = trim($DimValor[$n]);
$uc = false;
$nc = 0;
$nValor = '';
for($i=0; $i<mb_strlen($Valor); $i++){
$c = mb_substr($Valor,$i,1);
if( eSubstrCount('<>=*',$c)==0 ){
if( $uc ) $nValor .= '|';
$uc = false;
}else{
if( !$uc ) $nValor .= '|';
$uc = true;
$nc++;
}
$nValor .= $c;
}
$DimPar = array();
$nValor = trim($nValor);
if( $nValor[0]=='|' ) $nValor = mb_substr($nValor,1);
$par = explode('|',$nValor);
for($i=0 ; $i<count($par); $i++){
$par[$i] = trim($par[$i]);
if( !eSqlType('informix') ){
if( !eSqlType('oracle') && mb_strlen($par[$i])==10 && mb_substr($par[$i],2,1)=='-' && mb_substr($par[$i],5,1)=='-' ){
$par[$i] = mb_substr($par[$i],6,4).mb_substr($par[$i],2,4).mb_substr($par[$i],0,2);
}
}
if( $par[$i]!='' ) $DimPar[] = $par[$i];
}
$Comilla = "'";
switch( count($DimPar) ){
case 1:
if( $nc > 0 ){
$xBusca = $Campo . $DimPar[0] .$Comilla.$Comilla.' ';
}else{
$xBusca = $Campo . '='.$Comilla.$Valor.$Comilla.' ';
}
break;
case 2:
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1] .$Comilla.' ';
break;
case 4:
if( !eSqlType('oracle', 'pdo.informix') ){
$xFecha = mb_substr($DimPar[1],0,10);
if( mb_strlen($xFecha)==10 && mb_substr($xFecha,2,1)=='-' && mb_substr($xFecha,5,1)=='-' ){
$xFecha = mb_substr($xFecha,6,4).mb_substr($xFecha,2,4).mb_substr($xFecha,0,2);
$DimPar[1] = $xFecha . mb_substr($DimPar[1],10);
}
$xFecha = mb_substr($DimPar[3],1,10);
if( mb_strlen($xFecha)==10 && mb_substr($xFecha,2,1)=='-' && mb_substr($xFecha,5,1)=='-' ){
$xFecha = mb_substr($xFecha,6,4).mb_substr($xFecha,2,4).mb_substr($xFecha,0,2);
$DimPar[3] = $DimPar[3][0].$xFecha;
}
}
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1].$Comilla.' and '. $Campo.$DimPar[2].$Comilla.$DimPar[3].$Comilla.' ';
break;
default:
$xBusca = '';
$BuscaAnd = '';
$BuscaOr = '';
$NumAnd = 0;
$NumOr = 0;
$ConMayor = false;
$ConMenor = false;
for($i=0; $i<count($DimPar); $i+=2){
if( eSubstrCount($DimPar[$i], '>')>0 ){
$ConMayor = true;
if( $ConMenor ){
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}else{
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}
}else if( eSubstrCount($DimPar[$i], '<')>0 ){
$ConMenor = true;
if( $ConMayor ){
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}
if( $BuscaAnd!='' && $BuscaOr!='' ){
$xBusca = '(';
if( $NumAnd>1 ){
$xBusca .= '( '.$BuscaAnd.' )';
}else{
$xBusca .= $BuscaAnd;
}
$xBusca .= ' or '.$BuscaOr.')';
}else if( $BuscaOr!='' ){
$xBusca = '( '.$BuscaOr.' )';
}else if( $BuscaAnd!='' ){
$xBusca = $BuscaAnd;
}
break;
}
}
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
}
}
}
function _CondiRepetida($esto, $aqui){
if( eSubstrCount(" ".$aqui, " ".$esto)>0 ||
eSubstrCount(" ".$aqui, ".".$esto)>0 ||
eSubstrCount(" ".$aqui, ".".str_replace("'",'"',$esto))>0 ||
eSubstrCount(" ".$aqui, ".".str_replace('"',"'",$esto))>0 ||
eSubstrCount(" ".$aqui, " ".str_replace("'",'"',$esto))>0 ||
eSubstrCount(" ".$aqui, " ".str_replace('"',"'",$esto))>0 ){
return true;
}
return false;
}
function _qBuscar($txt, $Tabla){
global $_DBADDFILTEREXTRA;
$Alias = '';
$Dim = explode(' ',trim(str_replace('  ',' ',$Tabla)));
for( $n=0; $n<count($Dim); $n++ ) if( mb_strlen($Dim[$n])==1 ) $Alias = 'A.';
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
$_DBADDFILTEREXTRA = str_replace('#.','',$_DBADDFILTEREXTRA);
}
if( trim($_DBADDFILTEREXTRA)!='' ){
$txt = (( trim($txt)!='' ) ? $txt.' and ':'' ).str_replace('#.',$Alias,$_DBADDFILTEREXTRA);
}
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
}else{
$txt = str_replace('#.','A.',$txt);
}
return $txt;
}
function _NmFileConPrefijo($xNomFile, $pre=""){
if( $pre=='' || $pre[0]!='_' ){
$xNomFile = $pre.$xNomFile;
}else{
if( mb_substr($xNomFile, -1)=="." ){
$xNomFile = mb_substr($xNomFile, 0, -1).$pre;
}else{
$pp = mb_strrpos($xNomFile, '.');
$xNomFile = mb_substr($xNomFile, 0, $pp).$pre.mb_substr($xNomFile, $pp);
}
}
return mb_strtolower($xNomFile);
}
function eSplitPath($Nom, $Dir=""){
if( $Dir=='' ) $Dir = $Nom;
$n = eSubstrCount($Dir,'!');
if( $n>0 ){
list($Nom) = explode('.',$Nom);
$Nom = mb_substr(str_repeat('0',$n).$Nom,-$n);
$Dir = str_replace( str_repeat('!',$n), $Nom, $Dir );
$oDir = eScript($Dir);
if( !file_exists($oDir) ) mkdir($oDir,0777);
}
return $Dir;
}
function eExplodeTrim($div, $txt){
$dim = explode($div, $txt);
for($n=0; $n<count($dim); $n++) $dim[$n] = trim($dim[$n]);
return $dim;
}
function _SubListGetImg($img, $conContext=false, $nmFile="", $opcional=false){
global $__Lng;
$class = array(
"i"=>$__Lng[181],
"d"=>$__Lng[182],
"v"=>$__Lng[183],
"u"=>$__Lng[184],
"f"=>$__Lng[185],
"ti"=>$__Lng[181],
"td"=>$__Lng[182],
"tv"=>$__Lng[183],
"tu"=>$__Lng[184],
"tf"=>$__Lng[185],
);
$img = trim($img);
$na = eSubstrCount($img,"[");
if( $na==0 || $na!=eSubstrCount($img,"]") ) return $img;
$dim = explode("[", str_replace("]", "[", $img));
$img = "";
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" && ($n%2)==1 ){
$img .= '<i class="ICONINPUT ICONVIEW" style="visibility:hidden">V</i>';
}else if( $txt[0]=="<" ){
$img .= $dim[$n];
}else{
list($op, $tit) = eExplodeTrim(",", $dim[$n]);
$op = trim(mb_strtolower($op));
if( $op=="" ) continue;
if( $tit=="" ) $tit = $class["t".$op];
$tit = str_replace('"', '&#34;', $tit);
$img .= '<i class="ICONINPUT ICON'.$class[$op].'" onclick="eSubList(\''.$op.'\')"';
if(  mb_strtoupper($op)=="F" && $opcional ){
$img .= ' title="Ver fichero"';
}else if( $conContext && mb_strtoupper($op)=="F" && preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/iu', $nmFile) ){
$img .= ' oncontextmenu="eSubList(\''.$op.'\')"';
$img .= ' title="Click Izq: Ver fichero'."\n".'Click Dch: Descargar Fichero"';
}else{
$img .= ' title="'.$tit.'"';
}
$sStyle = "";
if( $img=="" ) $sStyle .= 'margin-left:0px;';
if( $sStyle!="" ) $sStyle = " style='{$sStyle}'";
$img .= $sStyle.'>'.mb_strtoupper($op).'</i>';
}
}
return $img;
}
function eIcon($icon, $interior="", $class="", $campo=""){
$icon = trim($icon);
$sicon = $icon;
$icon = mb_strtoupper($icon);
$dim = array(
"I"=>"I", "D"=>"D", "U"=>"U", "V"=>"V", "L"=>"&#306;", "X"=>"R",
"S"=>"S", "DOC"=>"F", "M"=>"}", "MENU"=>"}", "="=>"=", "C"=>",", "CALENDAR"=>",", "FILTER"=>"f",
"INSERT"=>"I", "DELETE"=>"D", "UPDATE"=>"U", "VIEW"=>"V", "SEEK"=>"S",
"PRINT"=>"8", "SETUP"=>"Y",
"HELP"=>"?", "HELP2"=>"@", "INFO"=>"&#162;",
"USER"=>"q", "USERS"=>"&#241;",
"DOWNLOAD"=>"v", "UPLOAD"=>"w",
"W"=>"&#251;", "WEB"=>"&#251;", "@"=>"n", "EMAIL"=>"n",
"FACEBOOK"=>"&#163;", "TWITTER"=>"&#164;",
"OFF"=>"i", "ON"=>"j",
"TOOLS"=>"T", "COPY"=>"C", "PASTE"=>"P",
"OPEN"=>"&#170;", "CLOSE"=>"&#169;", "HOME"=>"&#209;",
"PDF"=>"&#202;", "EXCEL"=>"&#203;", "WORD"=>"&#204;", "FILE"=>"&#234;",
"EXP"=>"&#178;", "EXPORT"=>"&#178;", "IMP"=>"&#179;", "IMPORT"=>"&#179;",
"STAR"=>"Z", "PIN"=>"/", "GPS"=>"&#167;", "EXE"=>"&#124;"
);
if( preg_match('/^\&\#[0-9]{2,3};$/u', $icon) ) $dim[$icon] = $icon;
else if( mb_substr($icon,0,2)=="==" ) $dim[$icon] = mb_substr($sicon,2);
$interior = str_replace('\\n', "\n", $interior);
if( $campo!="" ) $interior .= " eFilled='{$campo}'";
if( $class!="" && $dim[$icon]!="" ) return '<i class="'.$class.'" '.$interior.'>'.$dim[$icon].'</i>';
if( $dim[$icon]!="" ){
return '<i class="ICONINPUT" '.$interior.'>'.$dim[$icon].'</i>';
}else{
$sicon = (eSubstrCount($sicon,"/") ? "" : "g/").$sicon;
if( mb_substr($sicon,-4)==".svg" ){
return @file_get_contents($sicon);
}else if( mb_strpos($sicon, ".")!==false ){
return "<img src='{$sicon}' {$interior}>";
}else{
return "";
}
}
}
function eIconShow($ext=null, $inner=""){
if( preg_match('/\./u', $ext) ) $ext = eFileType($ext);
$dim = array(
"pdf"=>202
,"xls"=>203, "xlsx"=>203, "xml"=>410
,"doc"=>204, "docx"=>204
,"txt"=>411
,"csv"=>412
,"htm"=>314, "html"=>314
,"png"=>206, "jpeg"=>206, "jpg"=>206, "gif"=>206, "tif"=>206, "tiff"=>206, "bmp"=>206
,"avi"=>229, "mpeg"=>229, "mp4"=>229
,"mp3"=>228, "wav"=>228
,"zip"=>345, "rar"=>345
);
$ext = mb_strtolower($ext);
$ext = (($dim[$ext]!="") ? $dim[$ext] : 234);
return "<i class='ICONINPUT' {$inner}>&#{$ext};</i>";
}
function eImg64($file){
$file = eScript($file);
$ext = pathinfo($file, PATHINFO_EXTENSION);
return "data:image/{$ext};base64,".base64_encode(file_get_contents($file));
}
function eCallSrvRow($file){
if( !function_exists("_eCallSrvRow") ) include($GLOBALS["Dir_"]."itm/callsrvrow.php");
return _eCallSrvRow($file);
}
function eFormPrint($Registro, $DimReplace=array(), $TotalCopias=1, $DescargarPDF=true, $CopiarComo=""){
if( !function_exists("_eFormPrint") ) include($GLOBALS["Dir_"]."form_pdf.php");
return _eFormPrint($Registro, $DimReplace, $TotalCopias, $DescargarPDF, $CopiarComo);
}
function eProgress($Realizado, $Titulo='', $TextoEnBarra='', $TextoDetalle='', $Sonido='M'){
if( gettype($Realizado)=="string" && eSubstrCount($Realizado,'/')==1 ){
$tmp = explode('/',$Realizado);
$Realizado = round(($tmp[0]/$tmp[1])*100);
if( $TextoEnBarra=='%' ) $TextoEnBarra = $Realizado.'%';
}else{
if( $TextoEnBarra=='%' ) $TextoEnBarra = $Realizado.'%';
}
if( $Realizado==0 ){
set_time_limit(0);
ignore_user_abort(0);
ob_end_clean(); ob_start();
eHTML("");
echo str_repeat(' ',1024).'</head><body>';
}
echo "<script type='text/javascript'>top.eProgress(window,{$Realizado},'{$Titulo}','{$TextoEnBarra}','{$TextoDetalle}')</script>";
if( $Realizado==100 ) echo '</body></html>';
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
if( $Realizado==100 ){
eEnd();
}
ob_flush(); flush();
ob_end_clean(); ob_start();
}
function eProgressHidden($Sonido='M'){
$Contenido = ob_get_contents();
ob_end_clean();
echo "<script type='text/javascript'>";
echo "top.eProgress(window,100);";
echo "top.eLoading(0,window)</script>";
ob_flush(); flush();
ob_end_clean(); ob_start();
}
function eZipFile($FileZip, $Files){
if( !function_exists("_eZipFile") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipFile($FileZip, $Files);
}
function eZipDirectory($Dir, $FileZip, $Ext=NULL, $NoExt=NULL){
if( !function_exists("_eZipDirectory") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipDirectory($Dir, $FileZip, $Ext, $NoExt);
}
function eZipDir($file){
if( !function_exists("_eZipDir") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipDir($file);
}
function eUnZip($Zip, $Dir, $Files=""){
if( !function_exists("_eUnZip") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eUnZip($Zip, $Dir, $Files);
}
function eLink($File, $FileToCopy=''){
$File = eFileName($File);
if( $FileToCopy!='' && $FileToCopy[0]=='+' && !file_exists(SESS::$_PathCSS."/{$File}.css") ) copy(SESS::$_PathCSS."/".mb_substr($FileToCopy,1).".css", SESS::$_PathCSS."/{$File}.css");
$suf = "?".rand(1000, 9999);
echo "<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/{$File}.css{$suf}' TYPE='text/css'>";
if( file_exists(SESS::$_PathCSS."/{$File}_off.css") ){
echo "<LINK REL='off' id='CssOffWindow' HREF='".SESS::$_PathCSS."/{$File}_off.css{$suf}' TYPE='text/css'>";
}
for($i=1; $i<func_num_args(); $i++){
$File = eFileName(func_get_arg($i));
if( $File[0]=='+' ) continue;
echo "<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/{$File}.css{$suf}' TYPE='text/css'".((eSubstrCount($File,'_print.')==0) ? '':" MEDIA='print'").">";
}
}
function eLinkPrint($File){
$suf = "?".rand(1000, 9999);
for($i=1; $i<func_num_args(); $i++) echo "<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/".eFileName(func_get_arg($i)).".css{$suf}' TYPE='text/css' MEDIA='print'>";
}
function _FileNoCache($file, $inner=''){        // devuelve el nombre del script con un parámetro para evitar la cache hasta que el fichero cambie
$fileUp = $file;
if( gettype($file)=="array" ){
$fileUp = "temp/".md5(implode(",", $file)).".js";
$fileName = DIREDES.$fileUp;
$createFile = !file_exists($fileName);
if( !$createFile ){
$newTime = filemtime($fileName);
for($n=0; $n<count($file); $n++){
if( filemtime(DIREDES.$file[$n])>$newTime ){
@unlink($fileName);
$createFile = true;
break;
}
}
}
if( $createFile ){
for($n=0; $n<count($file); $n++){
file_put_contents($fileName, file_get_contents(DIREDES.$file[$n])."\n", FILE_APPEND);
}
}
}
$para = mb_substr(filemtime(DIREDES.$fileUp), -3); // parametro para que cachee si no ha cambiado su contenido, la primera vez lo carga
echo '<SCRIPT '.$inner.' SRC="edes.php?R:$'.$fileUp.'&j='.$para.eSessionAddUrl().'" charset="UTF-8"></SCRIPT>'."\n";
}
function isDate($v){
if( mb_strlen((string)$v)!=10 ) return false;
return preg_match('/^([1-2]{1}[0-9]{3})\-([0-1]{1}[0-9]{1})\-([0-3]{1}[0-9]{1})$/u', (string)$v);
}
function eYmd2Dmy($f){
if( mb_strlen($f)==8 ){
return mb_substr($f,6,2).'-'.mb_substr($f,4,2).'-'.mb_substr($f,0,4);
}else{
return mb_substr($f,8,2).'-'.mb_substr($f,5,2).'-'.mb_substr($f,0,4);
}
}
function eDmy2Ymd($f){
if( mb_strlen($f)==8 ){
return mb_substr($f,4,4).'-'.mb_substr($f,2,2).'-'.mb_substr($f,0,2);
}else{
return mb_substr($f,6,4).'-'.mb_substr($f,3,2).'-'.mb_substr($f,0,2);
}
}
function eDateOk($a, $m, $d){
$d = str_pad($d,2,'0',STR_PAD_LEFT);
$m = str_pad($m,2,'0',STR_PAD_LEFT);
return("{$a}{$m}{$d}"==date("Ymd",mktime(0,0,0, $m,$d,$a)));
}
function eDateSql($date=""){
$date = date("d-m-Y");
if( !eSqlType('oracle') && mb_strlen($date)==10 && mb_substr($date,2,1)=='-' && mb_substr($date,5,1)=='-' ){
$date = mb_substr($date,6,4).mb_substr($date,2,4).mb_substr($date,0,2);
}
return $date;
}
function eAge($fecha){
list($Y,$m,$d) = explode("-", $fecha);
return( date("md")<$m.$d ? date("Y")-$Y-1 : date("Y")-$Y );
}
function _AgeToDate($txt, $field="", $showCondition=true){
$hoy = date("Y-m-d");
$dimResult = array();
$dimShowResult = array();
list($year, $month, $day) = explode('-', date("Y-m-d"));
$year  = (int)$year;
$month = (int)$month;
$day   = (int)$day;
$tmp = preg_split('/(<>|<=|>=|!=|<|>|===|==|=)/u', $txt, null, PREG_SPLIT_DELIM_CAPTURE);
if( count($tmp)==1 ) $tmp = array("", "=", $tmp[0]);
for($n=2; $n<count($tmp); $n+=2){
$years = (int)$tmp[$n];
if( $tmp[$n-1]=="=" ){
$dateIni = date("Y-m-d", mktime(0,0,0, $month, $day, $year-$years-1));
$dateEnd = date("Y-m-d", mktime(0,0,0, $month, $day, $year-$years+0));
array_push($dimResult,  ">={$dateIni}' and {$field}<'{$dateEnd}");
$tmp[$n-1] = "";
}else if( mb_substr_count($tmp[$n-1], ">")>0 ){
if( mb_substr_count($tmp[$n-1], "=")>0 ){
$years+=1;
}
$dateEnd = date("Y-m-d", mktime(0,0,0, $month, $day, $year-$years));
array_push($dimResult, "<{$dateEnd}");
}else if( mb_substr_count($tmp[$n-1], "<")>0 ){
if( mb_substr_count($tmp[$n-1], "=")>0 ){
$years+=1;
}
$dateEnd = date("Y-m-d", mktime(0,0,0, $month, $day, $year-$years));
array_push($dimResult, ">{$dateEnd}");
}
array_push($dimShowResult, $tmp[$n-1]." ".$tmp[$n]);
}
if( $showCondition && $field!="" && function_exists("eDelShowFilter") ){
eDelShowFilter($field);
eAddShowFilter("EDAD: ".implode(" Y ",$dimShowResult)." AÑOS");
}
return $dimResult;
}
function _imgTypeToFunction($file){
$typeFile = pathinfo($file, PATHINFO_EXTENSION);
$typeImg = array(
"gif" =>"gif"
,"jpg" =>"jpeg"
,"jpeg"=>"jpeg"
,"png" =>"png"
,"bmp" =>"wbmp"
);
$type = $typeImg[$typeFile];
return (isset($type)) ? $type : false;
}
function _eImgOpen($oImg){
clearstatcache();
if( preg_match('/\.gif$/iu',$oImg) ) $fuente = @imageCreatefromGIF($oImg);
if( preg_match('/\.jpg$/iu',$oImg) ) $fuente = @imageCreateFromJPEG($oImg);
if( preg_match('/\.png$/iu',$oImg) ) $fuente = @imageCreateFromPNG($oImg);
if( preg_match('/\.bmp$/iu',$oImg) ) $fuente = @imageCreateFromWBMP($oImg);
return $fuente;
}
function _eImgSave($oImg, $nImg){
if( preg_match('/\.gif$/iu',$nImg) ) imageGIF($oImg, $nImg);
if( preg_match('/\.jpg$/iu',$nImg) ) imageJPEG($oImg, $nImg);
if( preg_match('/\.png$/iu',$nImg) ) imagePNG($oImg, $nImg);
if( preg_match('/\.bmp$/iu',$nImg) ) imageWBMP($oImg, $nImg);
}
function _eImgHeader($oImg){
if( preg_match('/\.gif$/iu',$oImg) ) header('Content-type: image/gif');
if( preg_match('/\.jpg$/iu',$oImg) ) header('Content-type: image/jpeg');
if( preg_match('/\.png$/iu',$oImg) ) header('Content-type: image/png');
if( preg_match('/\.bmp$/iu',$oImg) ) header('Content-type: image/bmp');
}
function eFieldName($tmp){
if( eSubstrCount($tmp, ':')>0 ){
$tmp = mb_substr($tmp, 0, mb_strpos($tmp,':'));
}else if( eSubstrCount($tmp, '{')>0 ){
$tmp = mb_substr($tmp, 0, mb_strpos($tmp,'{'));
}else if( eSubstrCount($tmp, ' as ')>0 ){
list(,$tmp) = explode(" as ",$tmp);
}
return trim($tmp);
}
function eFileClearGet($file){
list($nmFile) = preg_split('/(\?|\&)/u', $file.'&');
return $nmFile;
}
function eFileExtension($nmFile, &$viewOnline=false){
$nmFile = eFileClearGet($nmFile);
$viewOnline = preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/iu', $nmFile);
return pathinfo($nmFile, PATHINFO_EXTENSION);
}
function eFileType($nmFile, &$viewOnline=false){
return eFileExtension($nmFile, $viewOnline);
}
function eFileName($nmFile){
list($nmFile) = preg_split('/(\?|\&)/u', $nmFile);
return pathinfo($nmFile, PATHINFO_FILENAME);
}
function eFileFullName($nmFile){
list($nmFile) = preg_split('/(\?|\&)/u', $nmFile);
return pathinfo($nmFile, PATHINFO_BASENAME);
}
function eFileByLanguage($file, $dim=[]){
$file = eScript($file);
$lang = [
SESS::$_LANGUAGE_SUFFIX
,"_".SESS::$_LanguageDefault
,""
];
for($i=0; $i<3; $i++){
$fileLang = str_replace("@LNGFILE@", $lang[$i], $file);
if( file_exists($fileLang) ){
$txt = file_get_contents($fileLang);
foreach($dim as $k=>$v){
$txt = str_replace($k, $v, $txt);
}
return $txt;
}
}
return "";
}
function eFileCheckType($file){
}
function eFileCheck($file, $salir=false){
$file	  = eFileClearGet($file);
$oFile    = $file;
$file     = eScript($file, $bak);
$realPath = str_replace(DIRSERVER, "../../", realpath($file));
if( $file==$realPath ){
if( $ver )eTron("SIIIIIIIIIII");
return true;
}
if( $oFile[0]=="=" ){                                   // dir paralelo
if( $realPath==DIRAPP.mb_substr($oFile,1) ){
return true;
}
}else if( mb_substr($oFile,0,2)==REM ){                    // .file
if( $realPath==DIRAPPFILE.mb_substr($oFile,2) ){
return true;
}
}else if( $oFile[0]=='/' ){                             // raiz app
if( $realPath==DIRAPP.mb_substr($oFile,1) ){
return true;
}
}else if( $oFile[0]=='$' ){                             // raiz edes
if( $realPath==DIREDES.mb_substr($oFile,1) ){
return true;
}
}else{                                                  // en "d"
if( $realPath==DIRAPP.'d/'.$oFile ){
return true;
}
}
if( $salir ){
if( empty($realPath) ){
eEnd();
}
_hackerLog("ReadFile: 6");
}
return false;
}
function eIsXML(){
return($_GET['_gs_formato_']=='M' || $_POST['_gs_formato_']=='M' || (SETUP::$System["XMLASXLS"]==true && ($_GET['_gs_formato_']=='X' || $_POST['_gs_formato_']=='X') ));
}
function eIsPDF(){
return _IsExport('P');
}
function eIsXLS(){
return _IsExport('X');
}
function eIsMDB(){
return _IsExport('A');
}
function eIsTXT(){
return _IsExport('T');
}
function eIsCSV(){
return _IsExport('V');
}
function _IsExport($type){
return($_GET['_gs_formato_']==$type || $_POST['_gs_formato_']==$type);
}
function eIsHTM(){
$v = "";
if( isset($_GET['_gs_formato_'] ) ) $v = $_GET['_gs_formato_'];
if( isset($_POST['_gs_formato_']) ) $v = $_POST['_gs_formato_'];
return($v=="" && !eIsPaging());
}
function eIsHTML(){ return eIsHTM(); }
function eIsPaging(){
return($_GET['_REG_']!='');
}
function _IpSet($IP, $tmpSession){
$xIp = str_replace(".", mb_substr($tmpSession, 7, 3), $IP);
$xIp = dechex(crc32($xIp));
return $xIp;
}
function _IpCheck($IP, $key, $sess){
$tmpSession = $sess;
$xIp = str_replace(".", mb_substr($tmpSession, 7, 3), $IP);
$xIp = dechex(crc32($xIp));
if( $key!=$xIp ){
if(S::$__tronSession) eTronSession("3- % ERROR _SESS_ [{$_GET['_SESS_']}]");
SYS::sessionLog(__FUNCTION__, "{$IP} - {$key} - {$sess}");
eLogError("SESS", "{$IP} - {$key} - {$sess}");
exit;
}
}
function _SessionCheck($calcSess="", $check=false){
if( empty($calcSess) ){
eExplodeOne($_GET['_SESS_'], "-", $NO, $varSess);
}else{
$varSess = $calcSess;
}
$cadena = S::$sessionChars;
$pos = 23;
if( mb_strlen($varSess)<$pos ){
eTron("Error en _SessionCheck() longitud insuficiente [{$pos}] leng[".mb_strlen($varSess)."] [{$varSess}]");
return false;
}
$newChar = ceil((mb_ord($varSess[0])+mb_ord($varSess[1]))*3.75);
if( $newChar>=mb_strlen($cadena) ){
$newChar = $newChar % mb_strlen($cadena);
}
$posString = mb_strlen($cadena)-$newChar;
if( $posString==mb_strlen($cadena) ) $posString--;
if( $posString<0 || $posString>=mb_strlen($cadena) ){
eTron("Error en _SessionCheck() posición fuera de rango [{$pos}] [{$posString}] [{$cadena}]");
}
$okChr = mb_substr($cadena, $newChar, 1);
if( empty($calcSess) || $check ){
$okChr = ($varSess[$pos]==$okChr);
}else{
$calcSess[$pos] = $okChr;
$okChr = $calcSess;
}
return $okChr;
}
function _CheckServer(){
if( file_exists('../_tmp/err/stop.total') ){
if( (filemtime('../_tmp/err/stop.total')+(15*60))<time() ){
$txt = date("H:m", filemtime('../_tmp/err/stop.total'));
die("<script type='text/javascript'>if(top.S)top.S.exitNow('{$txt}');else top.document.write('Sistema parado por mantenimiento.<br>Se avisó a las {$txt}.');</script>");
}
}else if( file_exists('../_tmp/err/stop.access') && !file_exists("../_tmp/err/".S::$_User.".ord") ){
if( (filemtime('../_tmp/err/stop.access')+(15*60))<time() ){
$txt = date("H:m", filemtime('../_tmp/err/stop.access'));
die("<script type='text/javascript'>if(top.S)top.S.exitNow('{$txt}');else top.document.write('Sistema parado por mantenimiento.<br>Se avisó a las {$txt}.');</script>");
}
}else if( file_exists('../_datos/config/closeprogram.cdi') ){
if( SESS::$_LoginTime<trim(file_get_contents('../_datos/config/closeprogram.cdi')) ){
die("<script type='text/javascript'>top.document.write('Lo sentimos, la sesión ha caducado, vuelva a entrar.');</script>");
}
}
}
function _TraceDevelopment(){
_CheckServer();
if( SESS::$_D_=='' ) return;
$Dim = explode('-',date('y-m-d-H-i'));
$Dia = '';
for( $n=0; $n<3; $n++ ){
$v = base_convert($Dim[$n]+17,10,36);
if( mb_strlen($v)==1 ) $v = '0'.$v;
$Dia .= $v;
}
$Hora = '';
for( $n=3; $n<5; $n++ ){
$v = base_convert($Dim[$n]+17,10,36);
if( mb_strlen($v)==1 ) $v = '0'.$v;
$Hora .= $v;
}
$File = '../_d_/usr/'.date('Y').'.'.S::$_User;
if( file_exists($File) ){
$fp = @fopen($File,"r");
fseek($fp, 0, SEEK_END);
$LongFile = ftell( $fp );
fseek($fp, -4, SEEK_END);
$UltimaHora = fgets($fp,5);
$Ayadir = '';
if( $UltimaHora!=$Hora ){
if( $LongFile>5000 ){
fseek($fp, -5000, SEEK_END);
}else{
fseek($fp, 0, SEEK_SET);
}
while( !feof($fp) ) $Linea = fgets($fp);
$UltimoDia = mb_substr($Linea,0,6);
if( $UltimoDia!=$Dia ){
$Ayadir = 'D';
}else{
$Ayadir = 'H';
}
}
fclose($fp);
if( $Ayadir!='' ){
$fp = @fopen($File,"a");
if( $Ayadir=='D' ) fwrite($fp,CHR13.CHR10.$Dia);
fwrite($fp,",".$Hora);
fclose($fp);
}
}else{
file_put_contents($File,$Dia.','.$Hora);
}
}
function eDivide($a, $b){
return ($a!=0 ? $a/$b : 0);
}
function eGraphGet($TIPO, $usuCursor, $Form, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda='', $Var=array()){
if( !function_exists('eGraf') ) eInclude('graph');
$sForm = array();
$sCOLSOP = array();
for( $n=0; $n<count($Form); $n++ ){
$Tipo = (( $Form[$n][1]==0 ) ? '-':'-,' );
$Long = (( $Form[$n][1]==0 ) ? '10':'10,'.$Form[$n][1] );
$sForm[] = array($Form[$n][0],"Campo_{$n}",$Tipo,'T',$Long,'','-','','','','','',"Campo_{$n}");
$sCOLSOP[] = $Form[$n][2];
}
$res = eGraph( $TIPO, $usuCursor, $sForm, $sCOLSOP, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda, $Var );
if( count($res)==2 ){
return false;
}else{
return array($res[0], $res[1],$res[4], $res[3]);
}
}
function _CodigoScript( $txt='' ){
global $_SourceScript;
return mb_substr(md5($_SourceScript),-6);
}
function _arrayToPHP($dim, $indice, $conPHP=false){
$txt = '$'."_ENV['".$indice."']=[\n"._arrayToPHP2($dim).';';
if( $conPHP ) $txt = '<'."?PHP\n\n".$txt."\n\n?".'>';
return $txt;
}
function _arrayToPHP2($dim){
$n = 0;
$txt = '';
foreach($dim as $k=>$v){
if( $n>0 ) $txt .= ",\n";
if( gettype($v)=='array' ){
$txt .= "'{$k}'=>["._arrayToPHP2($v);
}else{
if( gettype($v)=='boolean' ){
$v = ($v)? 'true':'false';
}else if( $v!='' ){
if( !is_numeric($v) || ($v[0]=="0" && mb_substr($v, 1, 1)!='.') ){
$v = "'".addslashes(stripslashes($v))."'";
}
}else $v = "''";
$txt .= "'{$k}'=>{$v}";
}
$n++;
}
$txt .= "]";
return $txt;
}
function eTest(){
if( !function_exists('_eTest') ) include_once(__DIR__.'/itm/etest.php');
$Dim = array();
$txt = 'call_user_func("_eTest"';
for( $i=0; $i<func_num_args(); $i++ ){
$Dim[$i] = func_get_arg($i);
$txt .= ',$Dim['.$i.']';
}
eval($txt.');');
}
function eTXTLOG($_TXTLOG, $_DBINDEX, $mode){
global $_Mode;
if( $mode=='' ) $mode = $_Mode;
$pkIndex = (($_TXTLOG[1]<>"") ? $_TXTLOG[1].'|' : '');
$tmp = explode(",", $_DBINDEX);
for($n=0; $n<count($tmp); $n++) $pkIndex .= $_POST[$tmp[$n]];
$query = str_replace('&_PSOURCE=WWORK','',$_SERVER['QUERY_STRING']);
$txt = "\n~[".$pkIndex."]".S::$_User."|{$mode}|".SESS::$_Node."|".date('YmdHis')."|{$query}\n";
foreach($_POST as $k=>$v){
if( $k!='_MD5' ) $txt .= $k.'='.$v."\n";
}
if( $_TXTLOG[2]<>"" ) $_TXTLOG[0] .= '_'.date($_TXTLOG[2]);
error_log($txt, 3, eScript($_TXTLOG[0].'.log'));
}
function eUpload($file, $nom=""){
include(__DIR__.'/m/eupload.inc');
}
function _classAndStyle($txt, $inner){
if( empty($txt) ) $txt = "red";
if( !empty($inner) ) $inner = " ".$inner;
$type = array("background-color:", "color:", "border-color:1px solid ");
$classDim = array();
$styleDim = array();
$tmp = explode(",", $txt);
for($i=0; $i<count($tmp); $i++){
$value = trim($tmp[$i]);
if( empty($value) ) continue;
if( $value[0]=="." ){
array_push($classDim, substr($value, 1, strlen($value)));
continue;
}
array_push($styleDim, $type[$i].$value);
}
$class = implode(" ", $classDim);
$style = implode(";", $styleDim);
if( !empty($class) ) $class = " ".$class;
if( !empty($style) ) $style = " style='{$style}'";
return [$class, $style, $inner];
}
function eShell($tipo, $txt="", $inner=""){
if( empty($txt) ) return "";
list($class, $style, $inner) = _classAndStyle($tipo, $inner);
return "<span class='SHELL{$class}'{$style}{$inner}>{$txt}</span>";
}
function eBadge($tipo, $inicial="", $inner=""){
list($class, $style, $inner) = _classAndStyle($tipo, $inner);
return "<span class='BADGE{$class}'{$style}{$inner}>{$inicial}</span>";
}
function eBar($d){
if( gettype($d)!="array" ) $d = ["value"=>$d];
if( !isset($d["value"])  ) return "ERROR eBar()";
if( !isset($d["title"])  ) $d["title"] = "";
if( !isset($d["view"] )  ) $d["view"] = "";
$styleBox = "";
$styleBar = "";
if( isset($d["colors"] ) ){
$tmp = explode(",", $d["colors"]);
if( isset($tmp[0]) ) $styleBar .= "background-color:{$tmp[0]};";
if( isset($tmp[1]) ) $styleBar .= "color:{$tmp[1]};";
if( isset($tmp[2]) ) $styleBox .= "background-color:{$tmp[2]};";
if( isset($tmp[3]) ) $styleBox .= "border:1px solid {$tmp[3]};";
}
if( isset($d["width"]) ){
$styleBox .= "width:{$d['width']}px;";
}
if( !empty($styleBox) ){
$styleBox = " style='{$styleBox}'";
}
$vDecimal = 0;
$tDecimal = 2;
if( !empty($d["view"]) ){
$vDecimal = preg_replace('/[^0-9]+/', '', $d["view"])*1;
$d["view"] = preg_replace('/[^%N]+/', '', mb_strtoupper($d["view"]));
}else{
$d["view"] = "%";
}
if( !empty($d["title"]) ){
$tDecimal = preg_replace('/[^0-9]+/', '', $d["title"])*1;
$d["title"] = preg_replace('/[^Y]+/', '', mb_strtoupper($d["title"]));
}
$title = "";
$mas = (($d["value"]>=0)? "+":"-");
$d["value"] = abs($d["value"]);
if( !isset($d["total"]) ){
$tpc = $d["value"];
$xNum = eNumberFormat($tpc, $vDecimal)."%";
}else if( isset($d["value"]) && isset($d["total"]) ){
$tpc = ($d["value"]*100)/$d["total"];
if( $d["view"]=="N" ){
$xNum = eNumberFormat($d["value"], $vDecimal);
if( $d["title"]=="Y" ){
$title = eNumberFormat($tpc, $tDecimal)."%";
$title = " title='{$title}'";
}
}else if( $d["view"]=="%" ){
$xNum = eNumberFormat($tpc, $vDecimal)."%";
if( $d["title"]=="Y" ){
$title = eNumberFormat($d["value"], $tDecimal);
$title = " title='{$title}'";
}
}
}
return "<div class='BAR'{$styleBox}{$title}><div s-type='{$mas}' style='{$styleBar}width:{$tpc}%'>{$xNum}</div></div>";
}
function eAddButton($icon="", $label="", $click="", $title="", $inner="", $addClass=""){
$class = 'AddButton';
if( gettype($icon)=="array" ){
$label = $icon["label"];
$click = $icon["click"];
$title = $icon["title"];
$inner = $icon["inner"];
$classArray = $icon["class"];
$addClass = $icon["addClass"];
$icon = $icon["icon"];
}
$icon = trim($icon);
if( $icon!="" && !preg_match('/^<i.{1,}<\/i>$/iu', $icon) && !preg_match('/^<img.{1,}>$/iu', $icon) ){
$icon = eIcon($icon);
}
$click = str_replace('"', '&#34;', $click);
$title = str_replace('"', '&#34;', $title);
if( $click!="" ){
if( eSubstrCount($click, "(")==0 ) $click .= "()";
$click = _AddPublic("", $click);
}
if( $classArray!="" ){
$class = $classArray;
}else if( is_numeric($addClass) ){
if( $addClass=="1" ) $addClass = "";
else $addClass = " AddButton{$addClass}";
}else if( $addClass!="" ){
$addClass = " ".trim($addClass);
}else{
$addClass = " AddButton2";
}
echo "<span class='{$class}{$addClass}' onclick=\"{$click}\" title=\"{$title}\" {$inner}>{$icon}{$label}</span>";
}
function eButtonList($dim){
$txt = "<span style='display:inline-block;margin-bottom:9px;'>";
for($n=0; $n<count($dim); $n++){
$css = trim($dim[$n][2]);
if( !preg_match('/margin\-left\:/iu', $css) && $n>0 ) $css .= ";margin-left:5px;";
$txt .= eButton4($css, $dim[$n][0], $dim[$n][1], $dim[$n][3]." e-ButtonList=".$n, $dim[$n][4]);
}
$txt .= "</span>";
$GLOBALS["_BUTTONLIST"] = $txt;
}
function eButton4($tipo, $txt="", $click="", $inner="", $on=false){
if( $click!="" ) $click = " onclick='".str_replace(array('"', "'"), array("&#34;", "&#39;"), $click)."'";
eExplodeOne($tipo, ";", $class, $css);
if( trim($css)!="" ) $css = " style='{$css}'";
if( $on ){
$class .= " Activated";
$GLOBALS["_EVENTFIRE"] = $txt;
}
return "<span class='AddButton4 {$class}'{$css}{$click}{$inner}>{$txt}</span>";
}
function _AddPublic($ev, $txt){
if($txt[0]=="-") return mb_substr($txt,1);
preg_match("/on{$ev}(=| =|	=)('| '|\"| \"|)/iu", $txt, $xclick);
$ci = 'S.public(1);';
$cf = ';S.public();';
if( $ev=="" || count($xclick)==0 ){
if( trim($txt)[0]<>"<" ){
$txt = "{$ci}{$txt}{$cf}";
}
}else{
$i = mb_strpos($txt, $xclick[0])+mb_strlen($xclick[0]);
$c = mb_substr(trim($xclick[0]), -1);
if( $c=="=" ){
$f = mb_strpos($txt, " ", $i);
$centro = mb_substr($txt, $i, $f-$i);
$txt = mb_substr($txt,0,$i)."{{$ci}{$centro}{$cf}}".mb_substr($txt,$f);
}else{
$f = mb_strpos($txt, $c, $i);
$centro = mb_substr($txt, $i, $f-$i);
$txt = mb_substr($txt,0,$i)."{$ci}{$centro}{$cf}".mb_substr($txt,$f);
}
}
return $txt;
}
function GrabaTmp($NomEti, $Contenido, &$Long, $NomFile='', $NomFuncCall=''){
global $_Include, $_TmpInclude, $php_errormsg, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_DEBUG, $_TRACELABEL, $_TmpPhpFile, $_DebugParseador;
if($_DebugParseador) eTron("{$NomEti}: ini");
$__iSCRIPT__ .= $NomEti.', ';
$_Include = $NomEti;
if( func_num_args()==3 ) $Long = mb_strlen(ob_get_contents());
if( SESS::$_Development && !preg_match("/FUNCTION_EXISTS/iu", $Contenido) ){
$Dim = explode("\n", trim($Contenido));
for($n=0; $n<count($Dim); $n++){
if( preg_match("/^FUNCTION /iu", trim($Dim[$n])) ){
list($NomFunc) = explode('(', mb_substr(trim($Dim[$n]),8));
if( function_exists(trim($NomFunc)) ){
list(,$NomEti) = explode('_',$NomEti);
$php_errormsg = ' Función "'.trim($NomFunc).'()" ya definida.';
_ExitPHP();
}
}
}
}
if( $NomFuncCall=='' ){
$Contenido = '<'.'?PHP /'.'/ '.$NomEti.CHR10.$Contenido.CHR10.'?'.'>';
}else{
$Contenido = '<'.'?PHP '							.CHR10.
"function {$NomFuncCall}(){"	.CHR10.
$Contenido					.CHR10.
'}'								.CHR10.
'?'.'>';
}
if( $NomFile=='' ){
$_TmpPhpFile++;
$_TmpInclude = '../_tmp/lcl/'.S::$_User.'_'.$_TmpPhpFile;
}else{
$_TmpInclude = '../_tmp/lcl/'.$NomFile;
}
list(,$Eti) = explode('_',$NomEti);
if( $_DEBUG==2 && mb_strtoupper($Eti)==$_TRACELABEL ){
$__eLINE__ = 2;
$Contenido = '<'.'?PHP '.'$__iniSCRIPT__ = "'.$_Include.'";'.' ?'.'>'."\n".$Contenido."\n";
file_put_contents($_TmpInclude.'.php', $Contenido);
$Dim = explode("\n", trim($Contenido));
$Contenido = '';
$EnPHP = false;
for($n=0; $n<count($Dim)-1; $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=='?'.'>' ) $EnPHP = false;
if( $EnPHP ){
$__eLINE__++;
if( $Old!='switch(' ) $Contenido .= '$__eLINE__='.$__eLINE__.";" . 'if( $php_errormsg!="" ){ eInit(); die("LINEA: ".$__eLINE__."   ERROR: ".$php_errormsg); }'."\n";
}
$Contenido .= $Dim[$n]."\n";
if( $Dim[$n]=='<'.'?' ) $EnPHP = true;
$Old = mb_substr($Dim[$n],0,7);
}
}
file_put_contents($_TmpInclude, $Contenido);
if( $GLOBALS['_DEBUG']==2 ){
file_put_contents('../_tmp/log/'.S::$_User.'_'.$NomEti.'.'.$GLOBALS['Opcion'], $_TmpInclude."\n".$Contenido);
}
$php_errormsg = '';
ini_set('track_errors', _TRACK_ERRORS);
error_reporting(_ERROR_REPORTING);
if($_DebugParseador) eTron("{$NomEti}: end");
return $_TmpInclude;
}
function _HeaderAdd(){
$charset = SETUP::$_Charset;
header("Content-Type: text/html; charset={$charset}");
}
function eOpCkeck($OpAChequear){
include_once(__DIR__.'/opcheck.inc');
return _eOpCkeck( $OpAChequear );
}
function eVarSave($NomVar, $dir){
file_put_contents(eScript($dir), serialize($NomVar));
}
function eVarGet($dir){
return unserialize(file_get_contents(eScript($dir)));
}
function px($v){
if( !preg_match('/px$/iu', $v) ) $v.='px';
return $v;
}
function _IsLabel($txt){
$txt = ltrim($txt);
if( $txt[0]=="[" ){
if( !preg_match('/(\])/u', $txt) ) return false;
$txt = eMid($txt, "[", "]");
}else if( $txt[0]=="{" ){
if( !preg_match('/(\})/u', $txt) ) return false;
$txt = eMid($txt, "{", "}");
}else return false;
return !preg_match('/([0-9]|\s|\t|\.|\,|\;|\:|\=|\-|\+|_|\'|\")/u', $txt);
}
function _AtomizaLabel($Opcion, $buffer, &$Etiqueta, &$bufferData, &$tmp, &$OkModo, &$TipoEntrada="#", &$JsHtm=false, &$Comando="_", $_SubModo=""){
$i = mb_strpos($buffer,']');
$Etiqueta = mb_strtoupper(mb_substr($buffer, 1, $i-1));
$bufferData = mb_substr($buffer, $i+1);
$tmp = explode('|', str_replace('\|', '&#124;', $bufferData));
for($n=0; $n<count($tmp); $n++) $tmp[$n] = str_replace('&#124;', '|', trim($tmp[$n]));
$OkModo = eOkMode($Opcion, $tmp[0], $_SubModo);
$TipoEntrada = '#';
$JsHtm = false;
$Comando = '_'.$Etiqueta;
}
function _Atomizar($txt, &$tmp=array(), &$ok=false){
$i = mb_strpos($txt, ']');
if( $i!==false ) $txt = mb_substr($txt, $i+1);
$tmp = explode('|', str_replace('\|', '&#124;', $txt));
for($n=0; $n<count($tmp); $n++) $tmp[$n] = str_replace('&#124;', '|', trim($tmp[$n]));
$ok = eOkMode($GLOBALS["Opcion"], $tmp[0]);
}
function eCall_DBGATEWAYONE($ok, $buffer=NULL, $tmp=NULL){
$GLOBALS["_DBGATEWAYONE"][] = $buffer;
}
function eCall_JSGATEWAYONE($ok, $buffer=NULL, $tmp=NULL){
$GLOBALS["_JSGATEWAYONE"][] = $buffer;
}
function eCall_ADDBUTTON($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDBUTTON";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$GLOBALS["_ADDBUTTON"][] = array($tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5], $tmp[6]);
}
}
}
function eCall_ONCHANGE($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ONCHANGE";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$tmp[2] = str_replace("'", '"', $tmp[2]);
$stmp = explode(',',eNsp($tmp[1]));
if( mb_substr($tmp[2],-1)==';' ) $tmp[2] = mb_substr($tmp[2],0,-1);
$tmp[4] = ((isset($tmp[4])) ? !(mb_strtoupper($tmp[4])=='FALSE'||$tmp[4]=='0') : true);
for($n=0; $n<count($stmp); $n++){
$tmp[2] = str_replace('?','&',str_replace("'",'"',$tmp[2]));
$tmp[2] = str_replace('edes.php&','edes.php?',$tmp[2]);
if( eSubstrCount($tmp[2],'.sdf&')>0 ) $tmp[2] = '_SelInfo(this.value,'.$tmp[2].');';
if( $tmp[2]!='' && mb_substr($tmp[2],-1)!=';' ) $tmp[2] .= ';';
array_push($GLOBALS["_ONCHANGE"], array($stmp[$n], $tmp[2], $tmp[3], $tmp[4]));
if( $tmp[4] ) $GLOBALS["_EXEONCHANGE"][] = array($stmp[$n], str_replace('&#63;','?',$tmp[2]));
if( $tmp[5]<>"" ){
list($txt) = explode(".sdf", $tmp[2]);
$txt .= ".sdf";
$txt = mb_substr($txt,max(mb_strrpos($txt,"'"),mb_strrpos($txt,'"'))+1);
$GLOBALS["_ADDCODE"][$stmp[$n]]["A"] = eIcon($tmp[5], 'onclick=_IconSDF("'.$txt.'","'.$stmp[$n].'");');
}
}
}
}
}
function eCall_ADDCODE($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDCODE";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
if( count($tmp)>4 ) for($n=4; $n<count($tmp); $n++) $tmp[3] .= '|'.$tmp[$n];
$tmp[2] = mb_strtoupper($tmp[2]);
if( $tmp[2]=='I' ) $tmp[3] = ' '.$tmp[3];
if( eSubstrCount($tmp[3], "[")>0 && eSubstrCount($tmp[3], "]")>0 ){
while( eSubstrCount($tmp[3], "[")>0 && eSubstrCount($tmp[3], "]")>0 ){
$txt = "";
$desde = mb_strpos($tmp[3],"[");
$hasta = mb_strpos($tmp[3],"]");
$Macro = trim(mb_substr($tmp[3], $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
$txt = eIcon(trim($icono), _InVar($dentro));
$tmp[3] = mb_substr($tmp[3],0,$desde).$txt.mb_substr($tmp[3],$hasta+1);
}
}
$stmp = explode(',', eNsp($tmp[1]));
for($n=0; $n<count($stmp); $n++){
if( $tmp[2]=="I" ){
if( trim($tmp[3])=="NUMBERS" ){
$GLOBALS["_ADDCODE"][$stmp[$n]]["F"] = "NUMBERS";
continue;
}else{
$tmp[3] = " pp=1 ".$tmp[3];
}
}else{
$tmp[3] = str_replace(" onclick=", " pp=1 onclick=", $tmp[3]);
}
$GLOBALS["_ADDCODE"][$stmp[$n]][$tmp[2]] .= str_replace('\\n', "\n", $tmp[3]);
if( $tmp[2]=='I' && eSubstrCount($tmp[3], " e-async")>0 ){
$GLOBALS["_ADDCODE"][$stmp[$n]][$tmp[2]] .= " e-async-id='".(microtime(true)-1702808000)."'";
}
if( $tmp[2]=='I' && eSubstrCount($tmp[3], " eAccent=")>0 ){
$GLOBALS["_EACCENT"][$stmp[$n]] = 1;
}
}
}
}
}
function eCall_TAB($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=='' ) $GLOBALS['_CallLabel'] = 'TAB';
else{
global $Opcion, $_ZoneHide, $DOpcion, $DFichero, $DTitle, $TOpcion, $DFunction, $DSubOpcion, $TOpcion, $_BinaryMode;
if( $tmp==NULL ){
_Atomizar($buffer, $tmp, $ok);
$opNew = $_BinaryMode[$Opcion[0]];
if( $opNew!='' ) $opNew = '|'.$opNew;
$ok = preg_match('/('.$Opcion[0].$opNew.')/iu', $tmp[0]);
}else{
$opNew = $_BinaryMode[$Opcion[0]];
if( $opNew!='' ) $opNew = "|".$opNew;
$ok = preg_match('/('.$Opcion[0].$opNew.')/iu', $tmp[0]);
}
if( $ok ){
if( preg_match('/-NoZone/iu',$tmp[count($tmp)-1]) ){
$tmp[count($tmp)-1] = trim(preg_replace('/-NoZone/i','',$tmp[count($tmp)-1]));
$_ZoneHide .= ',1';
}else{
$_ZoneHide .= ',0';
}
if( eSubstrCount($tmp[2], ".")==0 ) $tmp[2] .= '.edf';
$DOpcion[$TOpcion] = $tmp[1];
$DFichero[$TOpcion] = $tmp[2];
if( $tmp[3]!='' ) $DTitle[$TOpcion] = ' title="'.eQuote($tmp[3]).'"';
if( $tmp[4]!='' ) $DFunction[$TOpcion] = $tmp[4];
$DSubOpcion[$TOpcion][0] = $tmp[5];
$DSubOpcion[$TOpcion][1] = $tmp[6];
$DSubOpcion[$TOpcion][2] = $tmp[7];
if( $TOpcion==0 && ($Opcion=='cR' || $Opcion=='mR' || $Opcion=='bR') ){
$txt = _RecuperarDBRange($tmp[2], $Opcion);
}
$TOpcion++;
}
}
}
function eCall_ADDOPTION($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDOPTION";
else{
if( $tmp==NULL ){
if( trim($buffer)=="" ) return;
_Atomizar($buffer, $tmp, $ok);
$dim = explode(",", $GLOBALS["_CallLabelField"]);
for($n=0; $n<count($dim); $n++){
if( $GLOBALS["_ADDOPTION"][$dim[$n]]!='' ) $GLOBALS["_ADDOPTION"][$dim[$n]] .= ";";
$GLOBALS["_ADDOPTION"][$dim[$n]] .= _InVar(trim($buffer));
}
}
if( $ok ){
if( preg_match("/^SELECT /iu", $tmp[2]) ){
if( !empty($tmp[3]) ){
if( mb_strtoupper($tmp[3])=="BLANK" ){
$tmp[3] = '';
$GLOBALS["_ADDOPTIONBLANK"][$tmp[1]] = true;
}
}
}else if( !empty($tmp[2][0]) && $tmp[2][0]==">" ){
}else if( !eIn([",", ";"], $tmp[2]) && eIn(".", $tmp[2]) ){
$tmp[2] = eFileGetVar($tmp[2]);
}else if( !empty($tmp[1]) && empty($tmp[2]) ){
$tmp[1] = eNsp($tmp[1]);
$GLOBALS["_CallLabel"] = "ADDOPTION";
$GLOBALS["_CallLabelField"] = $tmp[1];
$dim = explode(",", eNsp($tmp[1]));
for($n=0; $n<count($dim); $n++){
$GLOBALS["_ADDOPTION"][$dim[$n]] = "";
}
return;
}else{
}
if( !empty($tmp[3]) ){
$tmp2 = explode(';', eNsp($tmp[3]));
for($n=0; $n<count($tmp2); $n++){
if( !empty($tmp2[$n]) ){
$tmp3 = explode(',',$tmp2[$n]);
$txt = '';
for($i=0; $i<count($tmp3); $i++){
if( empty($tmp3[$i]) ) continue;
switch( $i ){
case 0:
$txt .= 'color:'.$tmp3[$i].';';
break;
case 1:
$txt .= 'background-color:'.$tmp3[$i].';';
break;
case 2:
$txt .= 'font-weight:'.$tmp3[$i].';';
break;
}
}
$tmp2[$n] = $txt;
}else $tmp2[$n] = '';
}
}
$tmp1 = explode(',', eNsp($tmp[1]));
for($n=0; $n<count($tmp1); $n++){
$GLOBALS["_ADDOPTION"][$tmp1[$n]] = $tmp[2];
if( !empty($tmp[3]) ){
for($i=0; $i<eSubstrCount($tmp[3], ';')+1; $i++){
if( !empty($tmp2[$i]) ){
$GLOBALS["_ADDOPTIONSTYLE"][$tmp1[$n]][$i] = $tmp2[$i];
}
}
}
}
}
}
}
function eCall_DELOPTION($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "DELOPTION";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$GLOBALS["_DELOPTION"][] = array($tmp[1], $tmp[2]);
if( mb_strtoupper($tmp[3])=='NOEMPTY' ) $GLOBALS["_FILLOPTION"][$tmp[1]] = true;
}
}
}
function eCall_ICON($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ICON";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$stmp = explode(',', str_replace(array(' ',"\t"), array('',''), $tmp[1]));
for($n=0; $n<count($stmp); $n++){
$GLOBALS["_ADDCODE"][$stmp[$n]]["E"] .= eIcon($tmp[2], " pp=1 ".$tmp[3], "", ((mb_strtoupper($tmp[4])=="FILLED")? $stmp[$n]:""));
}
}
}
}
function eCall_RELATIONFIELDS($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "RELATIONFIELDS";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
$tmp[0] = eNsp($tmp[0]);
array_push($GLOBALS["_RELATIONFIELDS"], ','.$tmp[0].',');
if( eIn(",", $tmp[1]) ){
$tmp[1] = eNsp($tmp[1]);
$tmp1 = explode(",", $tmp[1]);
$tmp0 = explode(",", $tmp[0]);
if( $tmp0[0]==$tmp1[0] ){
$tmp[1] = mb_substr($tmp[1], mb_strlen($tmp1[0])+1);
$GLOBALS["_SELECTFREE"][$tmp0[1]] = $tmp1[0];
}
}
if( $tmp[1]!='' ){
$GLOBALS["_RELATIONJUMP"][$tmp[1]] = 1;
$tmp2 = explode(',', $tmp[0]);
if( $tmp[2]!='' && (mb_strtoupper($tmp[2])=='FALSE' || $tmp[2]=='0') ){
$GLOBALS["_RELATIONJUMP"][$tmp[1]] = 2;
for($i=0; $i<count($tmp2); $i++) if( $tmp2[$i]==$tmp[1] ){
$GLOBALS["_RELATIONJUMP"][$tmp[1].'Jump'] = $tmp2[$i+1];
break;
}
}
for($i=0; $i<count($tmp2); $i++) if( $tmp2[$i]==$tmp[1] ){
$GLOBALS["_ADDOPTIONVALUE"][$tmp2[$i+1]] = $tmp[1];
break;
}
}
if( $tmp[3]!='' ){
if( $tmp[3]=='*' ) $tmp[3] = $tmp[0];
$tmp = explode(',', eNsp($tmp[3]));
for($i=0; $i<count($tmp); $i++) $GLOBALS["_SUBSELECTMEMORY"][$tmp[$i]] = true;
}
}
}
function eCall_SHOWFIELDS($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "SHOWFIELDS";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$p = mb_strpos($buffer, "|", mb_strpos($buffer, "|")+1);
$GLOBALS["_SHOWFIELDS"][$tmp[1]] = trim(mb_substr($buffer,$p+1));
}
}
}
function eCall_WHERESELECT($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "WHERESELECT";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
array_push($GLOBALS["_WHERESELECT"], array($tmp[1], $tmp[2]));
$GLOBALS["_pWHERESELECT"][$tmp[1]] = $tmp[2];
}
}
}
function eCall_SANITIZE($ok=true, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ){
$GLOBALS["_CallLabel"] = "SANITIZE";
}else if( !empty($buffer) ){
eExplodeOne($buffer, "=", $izq, $dch);
if( !isset($GLOBALS["_SANITIZE"]) ) $GLOBALS["_SANITIZE"] = array();
$GLOBALS["_SANITIZE"][trim($izq)] = trim($dch);
}
}
function eCurl($url, $dim, $eDesKey=null, $header=null){
if( $eDesKey!=null ){
$dataJson = json_encode($dim);
}
$ch = curl_init();
if( $ch===false ){
return false;
}else{
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
if( $eDesKey!=null ){
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
"eDesKey: ".$eDesKey,
"Content-Type: application/json",
"Content-Length: ".mb_strlen($dataJson))
);
}else{
curl_setopt($ch, CURLOPT_POSTFIELDS, $dim);
if( $header!=null ){
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
}
}
curl_setopt($ch, CURLOPT_TIMEOUT, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$res = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if( $httpCode!=200 ) return "ERROR: ".$httpCode;
return $res;
}
}
function eHexToRGB($c){
$rgb=array();
if( $c[0]=="#" ) $c = mb_substr($c,1);
for($n=0; $n<=2; $n++) $rgb[$n] = intval(mb_substr($c,$n*2,2),16);
return $rgb;
}
function eColorLuma($c){
$c = eHexToRGB($c);
return(0.2126*$c[0]) + (0.7152*$c[1]) + (0.0722*$c[2]);
}
function eColorContrastBW2($c){
return(eColorLuma($c)>=165)?"#000000":"#FFFFFF";
}
function isObfuscated($pass){
return mb_strlen($pass) > 25 && preg_match('/^[0-9a-f]{8}/i', $pass);
}
function ePassword($pass){
if( mb_strlen($pass)>25 ){
$igual = 4-(mb_strlen($pass)-8)%4;
if( $igual>3 ) $igual = 0;
$xPass = $pass . str_repeat("=", $igual);
$crc = str_pad(dechex(crc32(mb_substr($xPass, 8))), 8, "0", STR_PAD_LEFT);
if( mb_substr($xPass,0,8)==$crc ){
$pass = mb_substr(gzuncompress(base64_decode(mb_substr($xPass, 8))), 5);
}
}
return $pass;
}
function eCreatePassword($pass){
if( mb_strlen($pass)>25 ){
$igual = 4-(mb_strlen($pass)-8)%4;
if( $igual>3 ) $igual = 0;
$xPass = $pass . str_repeat("=", $igual);
$crc = str_pad(dechex(crc32(mb_substr($xPass, 8))), 8, "0", STR_PAD_LEFT);
if( mb_substr($xPass,0,8)==$crc ){
return $pass;
}
}
$dim = [47,57,65,90,97,122];
$txt = mb_chr(43);
for($i=0; $i<6; $i+=2){
for($p=$dim[$i]; $p<=$dim[$i+1]; $p++){
$txt .= mb_chr($p);
}
}
$add = "";
for($i=0; $i<5; $i++) $add .= $txt[rand(0,mb_strlen($txt)-1)];
$xPass = base64_encode(gzcompress($add.$pass));
$crc = str_pad(dechex(crc32($xPass)), 8, "0", STR_PAD_LEFT);
return str_replace("=", "", $crc.$xPass);
}
function setFileWatermark($file, $sMode, $df){
$key = eCreatePassword(date("Y-m-d H:i:s").",{$_ENV['user']},{$sMode}:{$df}");
if( $file===NULL ){
return $key;
}
$handle = fopen(eScript($file), 'ab');
fwrite($handle, chr(0).$key.chr(0));
fclose($handle);
}
function eGlobalsEval($content_){
if( trim($content_)[0]=="<" ){
$content_ = mb_substr(trim($content_), 5, -2);
}
eval($content_);
foreach(get_defined_vars() as $key_=>$value_){
if( mb_substr($key_,-1)=="_" ) continue;
$GLOBALS[$key_] = $value_;
}
}
function eFile64($file){
if( mb_strpos($file, ".")===false ) $file = base64_decode($file);
return $file;
}
function eFileEncode($content, $file=DKEYB){
$content = call_user_func(base64_decode("Z3plbmNvZGU"), $content, 9);
$move	 = ceil(mb_strlen($content)*0.2);
$content = mb_substr($content, $move).mb_substr($content, 0, $move);
file_put_contents(eFile64($file), $content);
}
function eFileDecode($file=DKEYB){
$content = file_get_contents(eFile64($file));
if( $content[0]=="<" ){
return $content;
}
$move	 = ceil(mb_strlen($content)*0.2);
$content = mb_substr($content, -$move).mb_substr($content, 0, -$move);
return call_user_func(base64_decode("Z3pkZWNvZGU"),	$content);
}
function eLoadVar($file=DKEYB){
$content = eFileDecode(eFile64($file));
eGlobalsEval($content);
}
function eSaveVar($content, $file=DKEYB){
$file = eFile64($file);
if( trim($content)[0]=="<" ){
file_put_contents($file, $content);
}else{
eFileEncode($content, $file);
}
}
function eUUID($data = null){
return eUUIDV4($data);
}
function eUUIDV4($data = null){
$data = $data ?? random_bytes(16);
assert(mb_strlen($data) == 16);
$data[6] = mb_chr(mb_ord($data[6]) & 0x0f | 0x40);
$data[8] = mb_chr(mb_ord($data[8]) & 0x3f | 0x80);
return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
function _UserExport(&$dimMenu, $_Mode, $_SubMode, $_FileDF){
global $_ExportSetup, $_NOTOOLS, $_ADDTOOLS, $_EXPORTSCOPE;
if( !isset(SETUP::$System["ExportFormats"]) || SETUP::$System["ExportFormats"]=="*" ){
$format = "print, pdf, xls, xml, csv, txt";
}else{
$format = strtolower(SETUP::$System["ExportFormats"]);
}
$format = explode(",", eNsp($format));
$binary = [
"print"=>"p"
,"pdf"=>"P"
,"xls"=>"X"
,"xml"=>"M"
,"txt"=>"T"
,"csv"=>"V"
];
$withPrint = false;
$dimExp = [];
$sufijo = ( $_EXPORTSCOPE=="public" ) ? "_public" : "_private";
foreach($binary as $type=>$value){
if( !in_array($type, $format) ) continue;
$inicial = $type[0];
$nameVar = $type.$sufijo;
$value = SESS::$$nameVar;
$dimExp[$type] = $value && ($_NOTOOLS=='' || similar_text('*'.strtolower($inicial), $_NOTOOLS)==0) || (isset($_ADDTOOLS) && in_array(strtoupper($type), $_ADDTOOLS));
if( $type=="xml" ){
$dimExp[$type] = $dimExp[$type] && !SETUP::$System["XMLASXLS"];
}
if( $dimExp[$type] ){
$inicial = $binary[$type];
if( $type=="print" ){
$withPrint = true;
}
$dimMenu[] = $_ExportSetup[$inicial];
$dimMenu[$type] = true;
}
}
$withPrint = true;
if( !SESS::$UserExport ){
return $withPrint;
}
return $withPrint;
}
class SYS {
private static $dimMethod = array();
static function __callStatic($method, $args){
if( !key_exists($method, self::$dimMethod) ){
$nameFile = S::unCapitalize($method, "_", "strToLower");
$file	  = DIREDES."sys/{$nameFile}.php";
if( !file_exists($file) ){
die("The [{$method}()] method does not exist in class [SYS]");
}
self::sandBoxInclude($file);
}
return call_user_func_array(self::$dimMethod[$method], $args);
}
static function sandBoxInclude($file_){
include($file_);
$dim_ = get_defined_vars();
foreach($dim_ as $method_=>$v_){
if( mb_substr($method_, -1)=="_" ){
continue;
}
self::$dimMethod[$method_] = ${$method_};
}
}
public static $fileToTron = null;
public static $edesTables = ["gs_dct","gs_mailfrom","gs_node","gs_user","gs_rol","gs_office","gs_position","gs_theme"];
public static $PID = 0;
public static $sessionLogLeng = 0;
static function define(){
define('_ERROR_REPORTING', 5);
define('_TRACK_ERRORS'	 , false);
define('SYS'  , '!' );
define('SETUP', '.' );
define('DF'   , '_' );
$DIRAPP = "../../".array_reverse(explode('/', eGetCWD()))[1];
define('DIRAPP'		, $DIRAPP."/");
define('DIREDES'	, "../../".basename(__DIR__)."/");
define('DIRAPPFILE'	, $DIRAPP.".file/");
define('DIRAPPDATA'	, $DIRAPP.".data/");
define('DIRSERVER'	, mb_substr(__DIR__, 0, -mb_strlen(basename(__DIR__))));
define('DIRTMP'		, "../_tmp/php/");
define('ISCLI', PHP_SAPI === 'cli');
define('DKEYB', 'Li4vX2RhdG9zL2NvbmZpZy9zcWwuaW5p');
define('LINUX_OS', mb_strtoupper(mb_substr(PHP_OS,0,3))!="WIN");
define('WINDOW_OS', !LINUX_OS);
define('REM'   , '/'.'/');
define('REMINI', '/'.'*');
define('REMEND', '*'.'/');
define('CHR10', mb_chr(10));
define('CHR13', mb_chr(13));
define('CHR92', mb_chr(92));
define('CHR124', "|");
define('CHR126', "~");
define('QUESTIONINI', "¿");
define('QUESTIONEND', "?");
SYS::$PID = getmypid();
}
static function iniSet(){
error_reporting(_ERROR_REPORTING);
ini_set('display_errors', 1);
ini_set('track_errors'  , false);
ini_set('allow_url_include', false);
ini_set('log_errors', 1);
ini_set('error_log' , '../_tmp/err/_log_php.'.date('ym'));
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
mb_language('uni');
mb_regex_encoding('UTF-8');
}
static function createClassSession($fileToSave){
$fileDef = "../_datos/config/session.def";
if( file_exists($fileDef) ){
$dimDef = file($fileDef);
}else{
$dimDef = array();
}
$dim = array_merge(
array("<"."?PHP", "class SESS {")
,file(DIREDES."class/session.php")
,$dimDef
,array("}", "?".">")
);
for($i=0; $i<count($dim); $i++){
$dim[$i] = rtrim($dim[$i]);
}
file_put_contents($fileToSave, implode("\n", $dim));
$_ENV[SYS]['MD5Session'] = null;
SYS::sessionLog(__FUNCTION__, $fileToSave);
}
static function sessionToMD5(){
$txtSession = self::classToString('SESS', true);
$_ENV[SYS]['MD5Session'] = md5(serialize($txtSession));
}
static function readSession(){
SYS::sessionLog(__FUNCTION__, "bloquear el fichero de session");
while( true ){
if( $_ENV[SYS]['fpFileSession']===false ){
$_ENV[SYS]['fpFileSession'] = @fopen($_ENV[SYS]['fileSession'], "r+");
}
if( $_ENV[SYS]['fpFileSession']===false ){
SYS::sessionLog(__FUNCTION__, "fichero de sesiones bloqueado ".microtime(true));
usleep(100);
continue;
}
if( flock($_ENV[SYS]['fpFileSession'], LOCK_EX | LOCK_NB) ){
$txt = fread($_ENV[SYS]['fpFileSession'], 99999);
eval(mb_substr($txt, 5, -2));
S::$sessionOn = true;
S::$_User = SESS::$_User;
$_ENV['user'] = SESS::$_User;
SYS::sessionLog(__FUNCTION__, "sesion cargada: ".SESS::$_User);
break;
}
}
}
static function sessionSave(){
$txtSession = self::classToString('SESS', true);
if( $_ENV[SYS]['fpFileSession']===false ){
SYS::sessionLog(__FUNCTION__, "No hay session abierta");
return;
}
if( $_ENV[SYS]['MD5Session']!=md5(serialize($txtSession)) ){
fseek($_ENV[SYS]['fpFileSession'], 0);
fwrite($_ENV[SYS]['fpFileSession'], $txtSession);
ftruncate($_ENV[SYS]['fpFileSession'], mb_strlen($txtSession));
SYS::sessionLog(__FUNCTION__, "Graba Session ".mb_strlen($txtSession));
}else{
SYS::sessionLog(__FUNCTION__, "La session no ha cambiado");
}
SYS::sessionClose();
}
static function sessionClose(){
if( $_ENV[SYS]['fpFileSession']===false ){
SYS::sessionLog(__FUNCTION__, "No hay session");
return;
}
flock($_ENV[SYS]['fpFileSession'], LOCK_UN);
fclose($_ENV[SYS]['fpFileSession']);
clearstatcache();
$_ENV[SYS]['fpFileSession'] = false;
SYS::sessionLog(__FUNCTION__, "Cierra y libera SESSION");
}
static function sessionRemove(){
setcookie(SESS::$nameSeedKey, '', time()-100);
SYS::sessionClose();
@unlink($_ENV[SYS]['fileSession']);
@unlink($_ENV[SYS]['fileSession'].".seed");
exit;
}
static function seedKey(){
$file = $_ENV[SYS]['fileSession'].".seed";
$currentSeedKey = $_COOKIE[SESS::$nameSeedKey];
$seedKey = rand(1, 999999);
setcookie(SESS::$nameSeedKey, $seedKey, time() + 86400*2);
$dim = file($file);
if( empty($dim) ){
$oldSeed = "";
}else{
if( !(trim($dim[0])==$currentSeedKey || empty($dim[1])) ){
list($time, $pk) = explode(",", $dim[1]);
if( !(trim($pk)==$currentSeedKey && time()<$time) ){
$user = S::$_User;
$log = date('Y-m-d H:i:s|')."seedKey|{$user}|{$currentSeedKey}|".trim(implode("|", $dim));
error_log($log."\r\n", 3, '../_tmp/err/_log.err');
SYS::sessionRemove();
}
}
$oldSeed = (time()+3).",".$currentSeedKey;
}
file_put_contents($file, "{$seedKey}\n{$oldSeed}", LOCK_EX);
}
static function classToFile($nameClass, $fileSave, $conPHP=true){
$txtSession = self::classToString($nameClass, $conPHP);
file_put_contents($fileSave, $txtSession);
}
static function classToString($nameClass, $conPHP=false){
$dimSess = get_class_vars($nameClass);
$totalIndices = 0;
$coma = " ";
$newVar = array();
if( $conPHP ){
$newVar[] = "<"."?PHP";
}
$newVar[] = "class {$nameClass} {";
foreach($dimSess as $key=>$value){
$value = $nameClass::${$key};
if( getType($value)!="array" ){
if( gettype($value)=="boolean" ){
$value = ($value) ? "true":"false";
}else if( $value=='0' ){
$value = '0';
}else if( $value=='-1' ){
$value = '-1';
}else if( empty($value) ){
$value = "''";
}else{
if( !preg_match('/^[0-9]{1,20}$/u', $value) && !preg_match('/^(true|false)$/iu', $value) ){   //if( !is_numeric($value) ){
$value = "'".addslashes($value)."'";
}
}
$newVar[] = "\t".'public static $'.$key.'='.$value.';';
continue;
}
$newVar[] = "\t".'public static $'.$key.'=[';
$totalIndices = 0;
$coma = " ";
foreach($value as $key2=>$value2){
$value2 = $value[$key2];
if( getType($value2)!="array" ){
if( $totalIndices>0 ) $coma = ",";
if( gettype($value2)=="boolean" ){
$value2 = ($value2) ? "true":"false";
}else if( $value2=='0' ){
$value2 = '0';
}else if( $value2=='-1' ){
$value2 = '-1';
}else if( empty($value2) ){
$value2 = "''";
}else{
if( !preg_match('/^[0-9]{1,20}$/u', $value2) && !preg_match('/^(true|false)$/iu', $value2) ){   //if( !is_numeric($value) ){
$value2 = "'".addslashes($value2)."'";
}
}
$newVar[] = "\t\t{$coma}'".$key2."'=>".$value2;
$totalIndices++;
}else{
if( $totalIndices>0 ) $coma = ",";
$coma2 = " ";
$newVar[] = "\t\t{$coma}'".$key2."'=>[";
foreach($value2 as $key3=>$value3){
$newVar[] = "\t\t\t{$coma2}'{$key3}'=>'".addslashes($value3)."'";
$coma2 = ",";
}
$newVar[] = "\t\t]";
$totalIndices++;
}
}
$newVar[] = "\t];";
}
$newVar[] = "}";
if( $conPHP ){
$newVar[] = "?".">";
}
$txtSession = implode("\n", $newVar);
return $txtSession;
}
static function arrayToClass($nameClass, $dimSess, $conPHP=true){
$totalIndices = 0;
$coma = " ";
$newVar = array();
if( $conPHP ){
$newVar[] = "<"."?PHP";
}
$newVar[] = "class {$nameClass} {";       // $dim = file("../_datos/config/group.var");         // echo "<pre>"; print_r($dim); echo "</pre>"; exit;
foreach($dimSess as $key=>$value){
if( getType($value)!="array" ){
if( gettype($value)=="boolean" ){
$value = ($value) ? "true":"false";
}else if( $value=='0' ){
$value = '0';
}else if( empty($value) ){
$value = "''";
}else{
if( !preg_match('/^[0-9]{1,20}$/u', $value) && !preg_match('/^(true|false)$/iu', $value) ){   //if( !is_numeric($value) ){
$value = "'".addslashes($value)."'";
}
}
$newVar[] = "\t".'public static $'.$key.'='.$value.';';
continue;
}
$newVar[] = "\t".'public static $'.$key.' = [';
$totalIndices = 0;
$coma = " ";
foreach($value as $key2=>$value2){
if( getType($value2)!="array" ){
if( $totalIndices>0 ) $coma = ",";
if( gettype($value2)=="boolean" ){
$value2 = ($value2) ? "true":"false";
}else if( $value2=='0' ){
$value2 = '0';
}else if( empty($value2) ){
$value2 = "''";
}else{
if( !preg_match('/^[0-9]{1,20}$/u', $value2) && !preg_match('/^(true|false)$/iu', $value2) ){   //if( !is_numeric($value) ){
$value2 = "'".addslashes($value2)."'";
}
}
$newVar[] = "\t\t{$coma}'".$key2."' => ".$value2;
$totalIndices++;
}else{
$coma2 = " ";
$newVar[] = "\t\t{$coma}'".$key2."' => [";
foreach($value2 as $key3=>$value3){
$newVar[] = "\t\t\t{$coma2}'{$key3}'=>'".addslashes($value3)."'";
$coma2 = ",";
}
$newVar[] = "\t\t]";
}
}
$newVar[] = "\t];";
}
$newVar[] = "}";
if( $conPHP ){
$newVar[] = "?".">";
}
$txtSession = implode("\n", $newVar);
return $txtSession;
}
static function permissionSys(){
$permission = "";
$user  = getenv('APACHE_RUN_USER');
$group = getenv('APACHE_RUN_GROUP');
if( !empty($user) && !empty($group) ){
return array("permission"=>"", "user"=>$user, "group"=>$group);
}
$file = "_nobody_nogroup.txt";
$path = "../_tmp/php/{$file}";
file_put_contents($path, "file temporal");
$output = null;
$retval = null;
exec('ls -lt ../_tmp/php/', $output, $retval);
if( $retval===false ){
return array("permission"=>"", "user"=>$user, "group"=>$group);
}
for($i=1; $i<count($output); $i++){
$txt = trim($output[$i]);
for($n=0; $n<9; $n++){
$txt = str_replace("  ", " ", $txt);
}
$dim = explode(" ", $txt);
if( $dim[8]!=$file ){
continue;
}
$permission = $dim[0];
$user  = $dim[2];
$group = $dim[3];
@unlink($path);
break;
}
return array("permission"=>$permission, "user"=>$user, "group"=>$group);
}
static function addSysDictionary(&$table){
if( in_array($table, SYS::$edesTables) ){
$table = $_ENV['eDesDictionary'].$table;
}
}
static function sessionLog($func, $txt){;
}
}
class S {
private static $dimMethod = array();
private static $pk = 0;
public static $runBackground = 0;
static function __callStatic($method, $args){
if( !key_exists($method, self::$dimMethod) ){
$nameFile = self::unCapitalize($method, "_", "strToLower");
$file	  = DIREDES."method/{$nameFile}.php";
if( !file_exists($file) ){
die("The [{$method}()] method does not exist in class [S]");
}
self::sandBoxInclude($file);
}
return call_user_func_array(self::$dimMethod[$method], $args);
}
static function sandBoxInclude($file_){
include($file_);
$dim_ = get_defined_vars();
foreach($dim_ as $method_=>$v_){
if( mb_substr($method_, -1)=="_" ){
continue;
}
self::$dimMethod[$method_] = ${$method_};
}
}
public static $sessionChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_";
public static $sessionOn = false;
public static $__tronSession = false;
public static $__tronEntrar = false;
static function unCapitalize($txt, $separador="_", $func=null){
preg_match_all('/[A-Z]/u', $txt, $matches);
for($n=0; $n<count($matches[0]); $n++){
$txt = str_replace($matches[0][$n], $separador.mb_strtolower($matches[0][$n]), $txt);
}
if( $txt[0]==$separador ) $txt = mb_substr($txt, 1);
if( $func!=null ){
$txt = $func($txt);
}
return $txt;
}
static function getClientIP(){
$dim = array('HTTP_X_FORWARDED_FOR', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR', 'HTTP_HOST');
for($i=0; $i<6; $i++){
if( isset($_SERVER[$dim[$i]]) ){
return $_SERVER[$dim[$i]];
}
}
return 'UNKNOWN';
}
static function encryptPass($email, $pass){
if( !preg_match('/^[a-fA-F0-9]{32}$/', $pass) ){
$pass = mb_strtoupper(md5($pass));
}
$pass = trim($email).$pass;
$pass = mb_strtoupper(md5($pass));
return $pass;
}
static function lastDay($date){
return date("t", strtotime($date));
}
static function dateDiff($d1, $d2){
$dias = (strtotime($d1)-strtotime($d2))/86400;
return floor($dias);
}
public static $handleSys = null;
static function qConnect($nomSql='', $fileIni='', $GetPuntero=false){
if( S::$handleSys!=null ){
return;
}
qConnectSystem($nomSql, $fileIni, $GetPuntero);
}
static function qQuery($sql){
S::qConnect();
S::$handleSys->qQuery($sql);
}
static function qArray($Puntero=NULL){
S::qConnect();
return S::$handleSys->qArray($Puntero);
}
static function qRow($Puntero=NULL){
S::qConnect();
return S::$handleSys->qRow($Puntero);
}
static function qCount($Tabla, $Condicion=NULL, &$Puntero=NULL){
S::qConnect();
return S::$handleSys->qCount($Tabla, $Condicion, $Puntero);
}
static function qId($Tabla=''){
return S::$handleSys->qId($Tabla);
}
static function qTranOn(){
S::qConnect();
S::$handleSys->qTranOn();
}
static function qTranOff(){
S::$handleSys->qTranOff();
}
static function qTranBack(){
S::$handleSys->qTranBack();
}
static function qFree(&$puntero=NULL){
S::qConnect();
S::$handleSys->qFree($puntero);
}
static function qEnd(){
S::qConnect();
S::$handleSys->qEnd();
}
public static $_User = -1;
public static $md5Session = '';
static function fileToClass($nameClass, $fileLoad, $fileSave){
$totalIndices = 0;
$coma = " ";
$newVar = array("<"."?PHP", "class {$nameClass} {");
$dim = file($fileLoad);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( empty($txt) || $txt[0]=="." || $txt[0]=="/" ) continue;
list($txt) = explode(REM, $txt);
list($key, $value) = explode("=", trim($txt));
$key = trim($key);
$value = trim($value);
if( mb_substr($key,-1)==":" ){
$key = trim(mb_substr($key,0,-1));
if( count($newVar)>2 ){
$newVar[] = "\t);";
}
$newVar[] = "\t".'public static $'.$key.' = [';
$totalIndices = 0;
$coma = " ";
}else{
if( empty($value) ){
$value = "''";
}else{
if( !preg_match('/^[0-9]{1,20}$/u', $value) && !preg_match('/^(true|false)$/iu', $value) ){   //if( !is_numeric($value) ){
$value = "'".$value."'";
}
}
if( $totalIndices>0 ) $coma = ",";
$newVar[] = "\t\t{$coma}".'"'.$key.'" => '.$value;
$totalIndices++;
}
}
if( $totalIndices>0 ){
$newVar[] = "\t];";
}
$newVar[] = "}";
$newVar[] = "?".">";
file_put_contents($fileSave, implode("\n", $newVar));
}
public static function triggerGlobal(){
$shm_id = shmop_open(0xff3, "c", 0644, 20);
if( !$shm_id ){
eTron("No se pudo crear el segmento de memoria compartida");
return;
}
shmop_write($shm_id, str_pad(microtime(true), 20), 0);
}
}
class eDes {
public function __construct(){}
public function __destruct(){}
public function check($exe){
if( !isset($_ENV[DF][$exe]) ){
return;
}
list($op, $type) = explode('.', $exe);
if( !method_exists('eDes', $op) ){
spl_autoload_register(function($op){
$file = DIREDES.'class/class.'.$op.'.inc.php';
if( file_exists($file) ){
include($file);
}else{
eEnd('El metodo "eDes.'.$op.'" no existe');
}
});
return $op::exe($_ENV[DF][$exe]);
}
eDes::toHtml($exe);
return eDes::$op($exe, $type);
}
private function button($op, $type){
$res = '';
for($n=0; $n<count($_ENV[DF][$op]); $n++){
$var = $_ENV[DF][$op][$n];
if( $var['click']=='' && $var['options'] ){
if( $var['type']=='multiple' ){
$txt = '[';
$dim = $var['options'];
$t = count($dim);
for($i=0; $i<$t; $i++){
$txt .= ($i>0? ',':'').'["'.join('","', $dim[$i]).'"]';
}
$txt .= ']';
$var['click'] = ' onclick=\'eFilterSelect('.$var['field'].','.$var['titleWin'].','.$txt.')\'';
}else if( $var['type']=='simple' ){
$txt = '[["-'.mb_substr($var['titleWin'],1,-1).'"]';
$dim = $var['options'];
$t = count($dim);
for($i=0; $i<$t; $i++){
$txt .= ',["'.$dim[$i][1].'","","'.$dim[$i][0].'"]';
}
$txt .= ']';
$var['click'] = ' onclick=\'S(this).menu('.$txt.',{function:eFilterOne, scroll:true}, '.$var['field'].')\'';
}
}
if( $type=='bar' ){
$txt = '<span class="Button ROUNDED2 SHADOW"'.$var['click'].$var['inner'].'>'.
'<span class="ButtonIn ROUNDED2">'.
$var['icon'].
$var['label'].
'</span></span>';
}
if( $var['return'] ){
$res .= $txt;
}else{
if( $n>0 ) echo ' ';
echo $txt;
}
}
unset($_ENV[DF][$op]);
return $res;
}
private function toHtml($op){
if( count($_ENV[DF][$op][0])==0 ) $_ENV[DF][$op] = [$_ENV[DF][$op]];
$t = count($_ENV[DF][$op]);
for($n=0; $n<$t; $n++){
$var = &$_ENV[DF][$op][$n];
$icon = $var['icon'] ?? '';
if( $icon!='' ) $icon = eIcon($icon,'','ICONWINDOW').' ';
$var['icon'] = $icon;
$var['label'] = $var['label'] ?? '';
$type = $var['type'] ?? 'simple';
if( $type=="function" ){
$var['onclick'] = str_replace(array('"',"'"), array('&#34;','&#39;'), $var['onclick']);
if( preg_match('/[\(\)]/u', $var['onclick']) ){
$var['click'] = ' onclick="'.$var['onclick'].';"';
}else{
$var['click'] = ' onclick="'.$var['onclick'].'();"';
}
}else{
if( !preg_match('/^(multiple|simple)$/iu', $type) ) $type = "";
else $type = mb_strtolower($type);
$click = $var['click'] ?? '';
if( $click!='' ) $click = ' onclick='.$click;
$var['click'] = $click;
}
$inner = $var['inner'] ?? '';
if( $inner!='' ) $inner = ' '.$inner;
$var['inner'] = $inner;
$title = $var['title'] ?? '';
if( $title!='' ) $title = ' title="'.addslashes($title).'"';
$var['inner'] .= $title;
$titleWin = $var['titleWin'] ?? '';
$var['titleWin'] = '"'.str_replace(array('"',"'"), array('&#34;','&#39;'), $titleWin).'"';
$field = $var['field'] ?? '';
$var['field'] = '"'.$field.'"';
$return = $var['return'] ?? false;
$var['return'] = $return;
$options = $var['options'] ?? '';
if( $options!='' ){
$options = trim($options);
if( preg_match('/\;/u', $options) ){
$tmp = explode(";", $options);
$dim = [];
for($i=0; $i<count($tmp); $i++){
$item = explode(",", $tmp[$i]);
$dim[] = [trim($item[0]), trim($item[1])];
}
$options = $dim;
}else{
if( !preg_match('/(\ |\:)/u', $options) ) $options = ":".$options;
if( preg_match('/\:/u', $options) ){
$cmp = mb_substr(trim(explode(":", $options)[1]),3);
$options = "select cd_{$cmp},nm_{$cmp} from {$cmp} order by nm_{$cmp}";
}
if( preg_match('/^[\s\t]*select\b/iu', $options) ){
$dim = [];
qQuery($options, $p);
while($r=qRow($p)){
$r[1] = addslashes($r[1]);
$dim[] = $r;
}
$options = $dim;
}
}
}
$var['options'] = $options;
}
}
}
function gsAvisos($OtraDB, $DesdeMain=false){
}
?>