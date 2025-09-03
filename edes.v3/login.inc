<?PHP
botsStop();
function botsStop(){
if( empty($_SERVER['HTTP_USER_AGENT']) ){
header("HTTP/1.0 404 Not Found");
_hackerLog("ROBOTS: ".$_SERVER['HTTP_USER_AGENT']);
exit;
}
$dim = file(DIREDES."data/bots.txt");
for($i=0; $i<count($dim); $i++) $dim[$i] = trim($dim[$i]);
$bots = implode("|", $dim);
if( preg_match('/^('.$bots.')/iu', $_SERVER['HTTP_USER_AGENT']) ){
header("HTTP/1.0 404 Not Found");
_hackerLog("ROBOTS: ".$_SERVER['HTTP_USER_AGENT']);
exit;
}
}
function deleteCookiesWithPrefix($prefix){
if( isset($_COOKIE["remove-seedkey"]) ){
return;
}
foreach($_COOKIE as $name => $value){
if (strpos($name, $prefix) === 0) {
setcookie($name, '', time() - 3600, '/');
setcookie($name, '', time() - 3600);
}
}
}
deleteCookiesWithPrefix('seedKey');
if( file_exists('../_tmp/err/stop.total') ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.total'));
if( $txt=="" ) $txt = "Sistema parado por mantenimiento";
die("{$txt}");
}
if( !file_exists('../_datos/config/setup.inc') ){
}
if( $_SERVER["REQUEST_METHOD"]=="GET" ){
$bak = "";
$db_path = '';
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
if( $php_errormsg!='' ){
if( $_gsTron ) eTron($file.': '.$php_errormsg);
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
include(DIREDES."{$_Sql}.inc");
qConnectSystem($_Sql, $file);
if( $_SERVER["REDIRECT_STATUS"]==404 ){
$url = $_SERVER["REDIRECT_URL"];
if( $url[0]=='/' ) $url = mb_substr($url, 1);
}else if( $_SERVER["REDIRECT_STATUS"]==403 ){
}else{
$domain = $_SERVER['SERVER_NAME'];
}
if( $domain!='' ){
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (domain=('{$domain}'))");
$r = S::qArray();
}else if( $url!='' ){
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (db_path=('{$url}'))");
$r = S::qArray();
}else{
$r = [];
}
$isMultitenan = true;
$db_path = trim($r["db_path"]);
if( $db_path!='' ){
if( $r["status"]=='D' || $r["dt_delete"]!='' ){
die("Empresa de baja en el servicio desde ".$r["dt_delete"]);
}
}else{
}
}else{
$isMultitenan = false;
$file = "../_datos/config/sql.ini";
if( file_exists($file) ){
include($file);
if( $php_errormsg!='' ){
if( $_gsTron ) eTron($file.': '.$php_errormsg);
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
include(DIREDES."{$_Sql}.inc");
qConnectSystem($_Sql, $file);
}else{
ePrintR('ERROR: Falta el fichero "/_datos/config/sql.ini"');
}
}
if(S::$__tronSession) eTronSession("   login ================(1)");
if(S::$__tronSession) eTronSession("   login ================(2)");
$IP = S::getClientIP();
do{
mt_srand(microtime(true));
$cadena = str_shuffle(S::$sessionChars);
$cadenaLeng = mb_strlen($cadena)-1;
$eDesSession = "";
while( mb_strlen($eDesSession)<40 ){
$eDesSession .= $cadena[rand(0,$cadenaLeng)];
}
$tmpSession = _SessionCheck($eDesSession);
$xIp = _IpSet($IP, $tmpSession);
$eDesSession = $xIp."-".$tmpSession;
$file = '../_tmp/sess/'.$eDesSession;
}while( file_exists($file) && _SessionCheck($eDesSession, true) );
$_ENV[SYS]['eDesSession'] = $eDesSession;
$_ENV[SYS]['fileSession'] = '../_tmp/sess/'.$eDesSession;
$_GET['_SESS_'] = $eDesSession;
if(S::$__tronSession) eTronSession("   >>>> inicializa _SESS_ ".$_GET['_SESS_']);
if(S::$__tronSession) eTronSession("   login ================(3)");
if(S::$__tronSession) eTronSession("   login ================(4)");
$_ENV[SYS]['context'] = 1;
SYS::createClassSession($_ENV[SYS]['fileSession']);
chmod($_ENV[SYS]['fileSession'], 0666);
SYS::readSession();
SESS::$MyExplorer = md5($IP.$_SERVER['HTTP_USER_AGENT']);
SESS::$share['isMultitenan'] = $isMultitenan;
SESS::$share['db_path'] = $db_path;
SESS::$SessionMaxLife = SETUP::$System["SessionMaxLife"];
if( SESS::$SessionMaxLife!=-1 ){
SESS::$SessionMaxLife = date("U")+(1000*1800);
}
SESS::$nameSeedKey = "seedKey".rand(1, 9999);
$seedKey = rand(1, 999999);
$_COOKIE[SESS::$nameSeedKey] = $seedKey;
setcookie(SESS::$nameSeedKey, $seedKey, time() + 86400*2);
setcookie("remove-seedkey", '1', 0, '/');
$_COOKIE["remove-seedkey"] = "1";
file_put_contents($_ENV[SYS]['fileSession'].".seed", "{$seedKey}\n", LOCK_EX);
_SaveSessionDDBB();
}else{
}
if( (isset($_POST['context'])		  && $_POST['context']=='closed') ||
(isset($_POST[SESS::$_Remember_]) && $_POST[SESS::$_Remember_]=='RecordarClave')
){
include($Dir_.'login_ser_web.php');
eEnd();
}
if( $_SERVER['QUERY_STRING']=='' ){
SESS::$context = 1;
SESS::$_TMP_ = 1;
SESS::$QueryString = $_SERVER['QUERY_STRING'];
include($Dir_.'navegador.php');
}else if( $_SERVER['QUERY_STRING']=='login1' ){
SESS::$context = 2;
SESS::$_TMP_ = 2;
$_SERVER['QUERY_STRING'] = SESS::$QueryString ;
SESS::$QueryString = "";
include($Dir_.'login_web.php');
}else if( $_SERVER['QUERY_STRING']=='login2' ){
SESS::$context = 3;
SESS::$_TMP_ = 3;
include($Dir_.'login_ser_web.php');
}else{
eJS('try{top.S.theSessionHasExpired();}catch(e){document.write("La sessión ha expirado");}');
eSessionClose(1);
}
eEnd();
?>