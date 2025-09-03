<?PHP
$nmBalanceo = "";
if( file_exists("../_datos/config/balancer.on") ){
$tmp = file("../_datos/config/balancer.on");
$ips = [];
$balancerType = "rand";
$keycode = "";
for($n=0; $n<count($tmp); $n++){
$line = trim($tmp[$n]);
if( empty($line) || $line[0]=="." ) continue;
if( preg_match("/^(rand|uptime)$/", $line) ){
$balancerType = trim($line);
continue;
}
if( preg_match('/^[a-f0-9]{32}$/i', $line) ){
$keycode = trim($line);
continue;
}
$ips[] = $line;
}
if( count($ips)>0 ){
if( $balancerType=="rand" ){
$nmBalanceo = $ips[rand(0, count($ips)-1)];
}else if( $balancerType=="uptime" ){
include(DIREDES."method/load_average.php");
$totalSrvs = 0;
$dimRet = [];
$minCPU = 999;
shuffle($ips);
for($n=0; $n<count($ips); $n++){
$url = $ips[$n];
if( $_SERVER["HTTP_REFERER"]!="{$url}edes.php" ){
$ret = eCurl($url, ["balancer"=>microtime(true)], $keycode);
}else{
$ret = implode(",", $loadAverage());
}
if( !preg_match('/^[0-9\.\,\s]{5,20}$/', $ret) || preg_match('/^ERROR\: /', $ret) ){
continue;
}
$totalSrvs++;
$ret = eNsp($ret);
$dimRet[] = $ret;
$tmp = explode(",", $ret);
if( count($tmp)==3 ){
$tmp[2] = (float)$tmp[2];
if( $tmp[2]<$minCPU ){
$nmBalanceo = $url;
$minCPU = $tmp[2];
}
}
}
}
}
if( $_SERVER["HTTP_REFERER"]!="{$nmBalanceo}edes.php" ){
?>
<script>
top.location.href = "<?= $nmBalanceo; ?>edes.php";
</script>
<?PHP
exit;
}
}
if( mb_substr($_SERVER['HTTP_REFERER'],-8)!="edes.php" ){
exit;
}
if( !isset(SESS::$_BYPHONE) ){
SESS::$_BYPHONE = false;
}
SESS::$_DIRWEB = $_POST["dirweb"];
if( !isset($_POST["platform"]) || !isset($_POST["explorer"]) || !isset($_POST["resolution"]) ){
_PedirLogin();
exit;
}
exec("php -h", $output);
if( count($output)==0 ){
die("Falta dar acceso a PHP mediante la linea de comandos");
}
$Dir_ = dirname(__FILE__).'/';
if( WINDOW_OS ) $Dir_ = str_replace('\\', '/', $Dir_);
SESS::$_Platform_	  = $_POST["platform"];
SESS::$_Explorer_	  = $_POST["explorer"];
SESS::$_Resolution_	  = $_POST["resolution"];
SESS::$_NavigatorLng_ = $_POST["idioma"];
SESS::$versionLocal	  = $_POST["versionLocal"];
$Desencadenante = '';
if( $_SERVER['QUERY_STRING']!='' ){
$Desencadenante = $_SERVER['QUERY_STRING'];
}
if( empty($_Language) ) $_Language = 'es';
$uLanguage = $_COOKIE["e-language"];
if( empty($uLanguage ) ) $uLanguage = $_Language;
if( empty($_PathCSS) ) $_PathCSS = "css";
include_once('../_datos/config/desktop.ini');
eLngLoad(DIREDES.'lng/login'	, $uLanguage, 1);
eLngLoad(DIREDES.'lng/login_web', $uLanguage, 1);
$file = '../_datos/config/login.lng';
if( file_exists($file) ){
eLngLoad($file, $uLanguage, 1);
}
function GetImage($Nombre, $Sufijo){
$File = $Nombre.$Sufijo;
if( file_exists($File.'.gif') ){
$File .= '.gif';
}else if( file_exists($File.'.png') ){
$File .= '.png';
}else if( file_exists($File.'.jpg') ){
$File .= '.jpg';
}else{
$File = $Nombre;
if( file_exists($File.'.gif') ){
$File .= '.gif';
}else if( file_exists($File.'.png') ){
$File .= '.png';
}else if( file_exists($File.'.jpg') ){
$File .= '.jpg';
}else{
return "";
}
}
return $File;
}
$_ImageLoginBackground	= GetImage("{$_PathIMG}/login"			, "_{$uLanguage}");
$_ImageBotonAccept		= GetImage("{$_PathIMG}/login_accept"	, "_{$uLanguage}");
$_ImageBotonCancel		= GetImage("{$_PathIMG}/login_cancel"	, "_{$uLanguage}");
$_ImageBotonRemember	= GetImage("{$_PathIMG}/login_remember"	, "_{$uLanguage}");
$_LoginReal = (SESS::$_User==-1);
$_NoCache = "?".rand(1000, 9999);
$AuthenticationRequired = (mb_strtoupper(eFileGetVar()['Login']['AuthenticationRequired'])=="YES");
$_CanMemorizeLogin = (SETUP::$_DevelopmentSrv || canMemorizeLogin());
function canMemorizeLogin(){
$file = "../_datos/config/login_ip.txt";
if( !file_exists($file) ){
return false;
}
$ip = trim(S::getClientIP());
if( empty($ip) ){
return false;
}
$dim = file($file);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])==$ip ){
return true;
}
}
return false;
}
function getImagenLogin(){
global $_PedirEmpresa;
$buscar = '';
$imgCurrent = SESS::$pk_login;
$imgLogin = '';
if( $_PedirEmpresa || !SETUP::$System['Multitenancy'] ){
$buscar = 'g/logo_desktop.*';
$imgLogin = glob($buscar)[0];
}else if( $imgCurrent[0]=='g' ){
$buscar = $imgCurrent;
}else{
$buscar = 'g/logos/'.$imgCurrent.'_login.*';
$imgLogin = glob($buscar)[0];
}
if( empty($imgLogin) ){
eInit();
die('Falta el fichero "'.$buscar.'"');
}
SESS::$pk_login = $imgLogin;
return $imgLogin;
}
if( !isset($_LoginSecondImg) ) $_LoginSecondImg = "";
if( file_exists(str_replace('.', '_'.$uLanguage.'.', $_LoginSecondImg)) ){
$_LoginSecondImg = str_replace('.', '_'.$uLanguage.'.', $_LoginSecondImg);
}
$language = ((SESS::$_LANGUAGE_SUFFIX!="")? SESS::$_LANGUAGE_SUFFIX : "_".$_COOKIE['e-language']);
$file = "../_datos/config/cookies_short{$language}.html";
if( !file_exists($file) ){
copy("../_datos/config/cookies_short.html", $file);
}
$fileLong = str_replace("short", "long", $file);
if( !file_exists($fileLong) ){
copy("../_datos/config/cookies_long.html", $fileLong);
}
if( $_LoginSecondImg!='' && mb_strlen($_LoginSecondFrom)==5 && mb_strlen($_LoginSecondTo)==5 && file_exists($_LoginSecondImg) ){
list($d, $m) = explode('-', $_LoginSecondFrom);
$_LoginSecondFrom = "{$m}{$d}";
list($d, $m) = explode('-', $_LoginSecondTo);
$_LoginSecondTo = "{$m}{$d}";
if( $_LoginSecondFrom>$_LoginSecondTo ){
if( date('md')>=$_LoginSecondFrom || date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}else{
if( date('md')>=$_LoginSecondFrom && date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}
}
$gsEdition = '';
$charset =	"abcdefghijklmnopqrstuvwxyz".
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".
"1234567890"				;
$charset = str_shuffle($charset);
$letra = '';
for($i=65; $i<=90; $i++) $letra .= mb_chr($i);
$c = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$l = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$p = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$r = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$k = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$b = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$cs = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$is = mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
for($i=97; $i<=122; $i++) $letra .= mb_chr($i);
for($i=48; $i<=57; $i++) $letra .= mb_chr($i);
for($i=1; $i<64; $i++){
$c .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$l .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$p .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$r .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$k .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$b .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$cs .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
$is .= mb_substr($letra,rand(0,mb_strlen($letra)-1),1);
}
$_PedirEmpresa = false;
SESS::$_Path_ = $c;
if( SESS::$share['isMultitenan'] && trim(SESS::$share['db_path'])=='' ){
$_PedirEmpresa = true;
}
SESS::$_Login_		= $l;
SESS::$_Password_	= $p;
SESS::$_Remember_	= $r;
SESS::$_CheckCode_	= $k;
SESS::$_Birthday_	= $b;
SESS::$_LoginTime_	= time();
SESS::$_ImgSignature_= $is;
SESS::$_CharSignature_ = $cs;
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
SETUP::$_DevelopmentSrv = $_Development;
include(DIREDES."itm/encrypt_easy.php");
SESS::$encryptKey = encryptHex::key(32);
if( isset(SETUP::$Login['SSO']) ){
$sso = explode(",", str_replace(" ", "", SETUP::$Login['SSO']));
$ssoCheck = 0;
foreach($_COOKIE as $pk=>$val) if( in_array($pk, $sso) ) $ssoCheck++;
if( $ssoCheck>0 && $ssoCheck==count($sso) ){
if( !function_exists("qQuery") ){
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
$login = eEntityEncode($_COOKIE[$sso[0]], false);
qQuery("select * from {$_ENV['eDesDictionary']}gs_user where login='{$login}'");
$r = qArray();
$pass = $r["pass"];
$user = $r["cd_gs_user"];
}
eInit();
echo '<script type="text/javascript">location.href = "edes.php?E:$login_ser_web.php";</script>';
SESS::$_User = -$user;
S::$_User = SESS::$_User;
SESS::$_x_y_z_ = "{$login}|{$pass}|{$user}";
eEnd();
}
}
$_keyCase = SETUP::$Login['key_case'];
$xLogin = "";
$xPass = "";
$ParametroSrv = $_SERVER['QUERY_STRING'];
if( $ParametroSrv!='' && eSubstrCount($ParametroSrv, "&")==1 ){
list($xLogin, $xPass) = explode('&', $ParametroSrv);
}
$_Cookie = SETUP::$Login['CookieName'];
if( $_Cookie=='' ) $_Cookie = "eDes";
$_CookieExpire = SETUP::$Login['CookieDaysExpire'];
if( $_CookieExpire=='' ) $_CookieExpire = 365;
$_CookieExpire = (60*60*24*$_CookieExpire);
if( !isset($_SubTituloApli) ) $_SubTituloApli = "";
$sNom_gs_navegador	= trim(SESS::$_Platform_);
if( eSubstrCount($sNom_gs_navegador, ' ') ){
if( preg_match_all('/(Windows|Macintosh|Linux|Android|iPhone)/iu', $sNom_gs_navegador, $matches) ){
$sNom_gs_navegador = $matches[0][0];
}
}
SESS::$_Platform_ = $sNom_gs_navegador;
SESS::$OS = (mb_strpos(mb_strtoupper($sNom_gs_navegador), "WINDOW") ? "WIN":"MAC");
_HeaderAdd();
eHTML('$login_web.php', '', eFileGetVar('System.TabTitle'));
$logo = '';
if( file_exists("g/logo.ico") ) $logo = 'logo';
if( SESS::$_Development && file_exists("g/logo_development.ico") ) $logo = "logo_development";
if( $logo!='' ) echo "<link id='FAVICON' rel='icon' href='g/{$logo}.ico' type='image/x-icon'>";
?>
<title><?= eFileGetVar("System.TabTitle") ?></title>
<style>
<?PHP if( SESS::$OS=="MAC" ){ ?>
:root {
--cText	  : text;
--cAuto   : cell;
--cPointer: default;
--cContext: context-menu;
}
<?PHP }else{ ?>
:root {
--cText	  : text;
--cAuto   : crosshair;
--cPointer: default;
--cContext: copy;
}
<?PHP }
include("{$_PathCSS}/login_web.css");
?>
<?PHP if( SESS::$_BYPHONE ){ ?>
.OPBUTTON {
cursor:var(--cContext);
BACKGROUND-COLOR:#fefefd;
COLOR:#000000;
BORDER:#96CFDA 1px outset;
padding:10px 30px 10px 30px;
margin-right:10px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px;
box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
-moz-box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
-webkit-box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
}
.OPBUTTON:hover {
BACKGROUND-COLOR:#F0F0F0;
}
*, INPUT, DIV, #LabelPath, #LabelLogin, #LabelPassword, #Login, #Password {
font-size: 50px;
}
#LabelTitle {
font-size: 60px;
}
<?PHP } ?>
.mostrar {
display: none;
}
.cLOGIN div:nth-child(1) {
visibility:hidden;
position:absolute;
left:0;
top:0;
font-family:numbers;
}
textarea {
overflow: hidden;
white-space: nowrap;
resize: none;
}
.ocultar span {
width: 20px;
display: inline-block;
vertical-align: top;
padding-top: 8px;
}
.OFF {
opacity :0.5;
filter: alpha(opacity:50);
cursor: var(--cAuto);
pointer-events: none;
}
#RECIPIENTE {
-webkit-transition: 1s linear;
transition: 1s linear;
visibility:hidden;
}
.rotateSubmit {
-webkit-transform: perspective(150px) rotateX(25deg);
transform		 : perspective(150px) rotateX(25deg);
opacity: 0.5;
pointer-events: none;
}
#LoginToExpire {
position:absolute;
right:10px;
bottom:10px;
z-index:9;
color: #999999;
}
</style>
<script type="text/javascript">
if( !/(Chrome|Google|Opera|Vivaldi|Safari)/i.test(navigator.userAgent) ){
setTimeout(function(){
top.location.href = "edes.php?r:$nocompatible.htm";
}, 1);
}
if( !window.localStorage ){
setTimeout(function(){
document.write("La verisón del navegador no es compatible.");
}, 10);
}
top.document.title = "<?= eFileGetVar("System.TabTitle") ?>";
<?PHP
@include_once('../_datos/config/desktop.ini');
if( SETUP::$System['UrlStatus']!="" ){
echo "try{ history.replaceState({foo:'bar'}, '-*-', '".SETUP::$System['UrlStatus']."'); }catch(e){}";
}
?>
var PK = "<?=str_repeat(' ', date('s'))?>", _entrar = false;
<?PHP
include($Dir_."_e.js");
?>
if( window!=top && !window.frameElement.getAttribute("eNORESIZE")==null ) setTimeout(function(){
top.location.href = location.href;
}, 1);
function DGI(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
function EventClear(){
if( !window.event ) return false;
window.event.preventDefault  ? window.event.preventDefault()  : (window.event.returnValue = false);
window.event.stopPropagation ? window.event.stopPropagation() : (window.event.cancelBubble = true);
return false;
}
function eTrim(txt){
return txt.replace(/^\s+|\s+$/g,'').replace(/\s\s/g,' ');
}
function eventCode(ev){
return typeof ev.which=="number" ? ev.which : ev.keyCode;
}
function Init(){
setTimeout(function(){
document.forms[0].elements[0].type = "text";
}, 1);
document.forms[0].elements[0].focus();
<?PHP
if( $xLogin!='' ){
echo "Entrar();";
}else{
}
if( SETUP::$_DevelopmentSrv || $_CanMemorizeLogin ){
?>
if( GetCookie("eDesAutoRun")=="on" ){
loginSave();
Entrar();
}
<?PHP
}
?>
}
<?PHP
encryptHex::javascriptOn();
?>
function dataToPng(data){
var charset ="<?=$charset?>"
,index, i, hex, ctx
,canvas = document.createElement('canvas');
canvas.width  = 1;
canvas.height = data.length;
ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
for(i=0; i<data.length; i++){
index = charset.indexOf(data[i]);
if( index==-1 ){
hex = ((255).toString(16)).padStart(2, "0");
}else{
hex = ((index+1).toString(16)).padStart(2, "0");
}
ctx.beginPath();
ctx.fillStyle = `#${hex}0000`;
ctx.fillRect(0, i, 1, 1)
ctx.fill();
}
return canvas.toDataURL("image/png").substring(22);
}
var $Desencadenante = "";
function getPass(){
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
var pass = eTrim(document.forms[0].elements["Password"].getAttribute("valueReal")), pass2="", tmp;
<?PHP }else{ ?>
var pass = eTrim(document.forms[0].elements["Password"].value), pass2="", tmp;
<?PHP } ?>
<?PHP if( !isset(SETUP::$Login["TriggerCharOff"]) || SETUP::$Login["TriggerCharOff"]==false ){ ?>
if( pass.indexOf('~')>-1 ){
tmp = pass.split('~');
pass = tmp[1];
}
<?PHP } ?>
<?PHP
if( $_keyCase==0 ){
echo "pass = pass.toUpperCase();";
}else if( $_keyCase==1 ){
echo "pass = pass.toLowerCase();";
}else{
}
?>
pass = eTrim(document.forms[0].elements["Login"].value)+_e_(pass);
return encryptHex(_e_(pass), "<?= SESS::$encryptKey ?>")+pass2;
}
function Button(visible){
DGI("IconAccept").style.visibility = visible;
DGI("infRemember").parentNode.style.visibility = visible;
}
function Entrar(){
if( !_entrar ){
setTimeout(function(){
Entrar();
}, 100);
return;
}
if( <?= (($_LoginReal)? 'false':'true') ?> ) return;
Button("hidden");
var xError = "",
login = eTrim(document.forms[0].elements["Login"].value),
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
pass = eTrim(document.forms[0].elements["Password"].getAttribute("valueReal")),
<?PHP }else{ ?>
pass = eTrim(document.forms[0].elements["Password"].value),
<?PHP } ?>
verifySave = (document.forms[0].elements["verifySave"].checked ? '<?=$_ENV['ON']?>' : '<?=$_ENV['OFF']?>');
if( pass=="" ) xError = '<?= $__Lng[5] ?>';
if( login=="" ) xError = '<?= $__Lng[2] ?>';
<?PHP if( $_PedirEmpresa ){ ?>
if( eTrim(document.forms[0].elements["Path"].value)=="" ) xError = '<?= $__Lng[16] ?>';
<?PHP } ?>
if( xError!="" ){
Mensaje(xError.replace(/&quot;/g,'"'));
EventClear();
Button("visible");
return false;
}
<?PHP
$dimField = [
SESS::$_Path_.": eTrim(document.forms[0].elements['Path'].value)"
,SESS::$_Login_.": login"
,SESS::$_Password_.": getPass()"
,SESS::$_Remember_.": ''"
,SESS::$_CheckCode_."_1: document.forms[0].elements['".SESS::$_CheckCode_."_1'].value"
,SESS::$_CheckCode_."_2: document.forms[0].elements['".SESS::$_CheckCode_."_2'].value"
,SESS::$_CheckCode_."_3: document.forms[0].elements['".SESS::$_CheckCode_."_3'].value"
,SESS::$_CheckCode_."_4: document.forms[0].elements['".SESS::$_CheckCode_."_4'].value"
,SESS::$_CheckCode_."_5: document.forms[0].elements['".SESS::$_CheckCode_."_5'].value"
,SESS::$_CheckCode_."_6: document.forms[0].elements['".SESS::$_CheckCode_."_6'].value"
,SESS::$_Birthday_.": document.forms[0].elements['".SESS::$_Birthday_."'].value"
,SESS::$_ImgSignature_.": dataToPng(login+getPass())"
,SESS::$_CharSignature_.": '".$charset."'"
,"verifySave:verifySave"
,"verifyCookie:localStorage.getItem('e-verifyCookie')||''"
,"e_cdi:localStorage.getItem('e-cdi')||''"
,"e_language:localStorage.getItem('e-language')||'".SETUP::$System["LanguageDefault"]."'"
,"context:document.forms[0].elements['context'].value"
,"_SESS_:'{$_POST['_SESS_']}'"
];
$pntField = [];
for($n=0; $n<=16+2; $n++) $pntField[$n] = $n;
shuffle($pntField);
$newField = [];
$listFields = [];
for($n=0; $n<17+2; $n++){
$newField[$n] = $dimField[$pntField[$n]];
$listFields[] = explode(":", $newField[$n])[0];
}
sort($listFields);
$listFields = implode(",", $listFields);
SESS::$md5ListFields = md5($listFields.SESS::$_LoginTime_);
?>
call("edes.php?login2", { <?=implode(",\n", $newField)?> });
return EventClear();
}
<?PHP if( SETUP::$Login["RememberLogin"] ){ ?>
if( GetCookie("eDesLogin") ){
setTimeout(function(){
document.forms[0].elements["Login"].value = GetCookie("eDesLogin");
document.forms[0].elements["Password"].focus();
}, 500);
}
<?PHP } ?>
function eSubmitAction(){
<?PHP if( SETUP::$Login["RememberLogin"] ){ ?>
var expires = new Date();
expires.setTime(expires.getTime() + 1000*60*60*24*32);
document.cookie = "eDesLogin="+document.forms[0].elements["Login"].value+"; expires="+expires.toUTCString();
<?PHP } ?>
window["_infoExitCancel"] = true;
document.forms[0]["act"+"ion"]='<?=$nmBalanceo?>edes'+'.php?login2';
document.forms[0]["sub"+"mit"]();
}
function eSubmit(verifyCookie){
DGI("RECIPIENTE").className = "rotateSubmit";
var login = eTrim(document.forms[0].elements["Login"].value);
document.onkeydown = null;
document.forms[0].elements["Password"].value = getPass();
document.forms[0].elements["Password"].parentNode.style.visibility = "hidden";
document.forms[0].elements["<?=SESS::$_ImgSignature_?>"].value = dataToPng(login+getPass());
eSubmitAction();
}
function eCheckInput(message){
DGI("waitEmail").style.display = "block";
DGI("IconAccept").style.display = "none";
document.forms[0].elements["Login"].readOnly = true;
document.forms[0].elements["Password"].readOnly = true;
var exe = setTimeout(function(){
Entrar();
}, 3000);
if( message!=undefined ){
clearTimeout(exe);
Terminar(message);
Button("hidden");
DGI("waitEmail").style.display = "none";
}
}
function Cerrar(){
document.onkeydown = null;
document.forms[0].elements['context'].value = "closed";
eSubmitAction();
}
function stripTags(x){
return x.replace(/<\/?[^>]+>/gi,"");
}
var _prueba = {};
function call(url, datos){
var xhr = new XMLHttpRequest(),
data = new FormData(), v;
xhr.open("PUT", url);
for(v in datos){
data.append(v, datos[v]);
}
for(v in _prueba){
data.append(v, _prueba[v]);
}
xhr.onload = function(){
if( xhr.status===200 ){
document.forms[0].elements['context'].value = document.forms[0].elements['context'].value*1+1;
var res = eTrim(xhr.responseText);
if( res[0]=="<" ){
Mensaje(stripTags(res));
}else{
if( res[0]=="_" ){
DGI("RECIPIENTE").style.visibility = "visible";
}
eval(res);
}
if(    res.substr(0, 9)!="Terminar("
&& res.substr(0,10)!="CheckShow("
&& res.substr(0,12)!="eCheckInput("
&& res.substr(0,22)!="RefreshForConfirmation"
){
Button("visible");
}
}else{
Mensaje("Error en la conexión");
}
};
xhr.send(data);
}
var WaitinConfirmation = false;
function RefreshForConfirmation(){
if( !WaitinConfirmation ){
WaitinConfirmation = true;
Mensaje("<?=$__Lng["waitingForEmail"]?>");
DGI("MENSAJE").onclick = function(){
return false;
}
timeToCompleteTask.active = false;
}
setTimeout(function(){
Entrar();
}, 4000)
}
setTimeout(function(){
call('edes.php', {"_SESS_":"<?=$_POST["_SESS_"]?>"});
});
function RecordarClave(){
if( <?= (($_LoginReal)? 'false':'true') ?> ) return;
var xError = "";
if( eTrim(document.forms[0].elements["Login"].value)=="" ) xError = '<?= $__Lng[2] ?>';
if( xError!="" ){
Mensaje(xError.replace(/&quot;/g,'"'));
event.returnValue = false;
return false;
}
var login = eTrim(document.forms[0].elements["Login"].value);
DGI("RECIPIENTE").className = "rotateSubmit";
document.onkeydown = null;
document.forms[0].elements["<?=SESS::$_Remember_?>"].value = "RecordarClave";
document.forms[0].elements["<?=SESS::$_ImgSignature_?>"].value = dataToPng(login);
eSubmitAction();
}
function Mensaje(txt){
DGI("TEXTO_MEN").innerHTML = txt;
DGI("MENSAJE").style.display = 'inline-table';
}
function Terminar(txt){
DGI("TEXTO_FIN").innerHTML = txt;
DGI("TERMINAR").style.display = 'inline-table';
document.forms[0].elements["Login"].value = "";
document.forms[0].elements["Password"].value = "";
for(var k in document.forms[0].elements){
document.forms[0].elements[k].readOnly = true;
document.forms[0].elements[k].disabled = true;
}
}
function documentWrite(txt){
document.body.innerHTML = txt;
}
function focusCheck1(){
document.getElementsByClassName("CheckChar")[0].focus();
}
document.onkeydown = function(){
var k = eventCode(event),
obj = document.activeElement, nc;
if( obj.maxLength==1 ){
if( k==8 || k==46 ){
obj.value = "";
return true;
}
if( k<48 || k>57 ){
return EventClear();
}
nc = obj.name.substr(-1);
obj.value = k-48;
if( nc!="6" ){
setTimeout(function(){
DGI(obj.name.substr(0, obj.name.length-1)+(nc*1+1)).focus();
}, 0);
return true;
}
setTimeout(function(){
Entrar();
}, 0);
return true;
}
if( k==121 ) Entrar();
else if( k==13 || k==9 ){
var campo = "";
switch( obj.id ){
case 'Login':
campo = "Password";
break;
case 'Password':
if( DGI("Path")!=null ){
campo = "Path";
}else{
campo = "Login";
}
break;
case 'Path':
campo = "Login";
break;
}
DGI(campo).focus();
return EventClear();
}
return true;
}
function cookieAcept(){
document.getElementsByClassName("cFOOT")[0].style.display = "none";
document.cookie = "<?=$_Cookie?>=S;max-age=<?=$_CookieExpire?>";
}
function verCookies(){
document.getElementsByClassName('cookieLongBoxExt')[0].style.display='block';
}
function _ViewPass(icon, pass){
if( icon.innerText=="y" ){
icon.innerText = "z";
document.forms[0].elements[pass].type = "text";
}else{
icon.innerText = "y";
document.forms[0].elements[pass].type = "password";
}
}
function CheckShow(){
var dim = document.getElementsByClassName("ocultar"), i;
for(i=0; i<dim.length; i++){
dim[i].style.display = "none";
}
dim = document.getElementsByClassName("mostrar");
for(i=0; i<dim.length; i++){
dim[i].style.display = "block";
}
<?PHP if( $AuthenticationRequired ){ ?>
document.forms[0].elements["<?=SESS::$_CheckCode_?>_1"].focus();
<?PHP }else{ ?>
document.forms[0].elements["verifySave"].focus();
<?PHP } ?>
}
function GetCookie(nameCookie){
var dim = document.cookie.split(";"), data=[], n;
for(n=0; n<dim.length; n++){
data = eTrim(dim[n]).split("=");
if( data[0]==nameCookie ) return data[1];
}
return "";
}
function viewPasswmb_ord(icon, pass){
pass = DGI(pass);
if( pass.getAttribute("viewReal")==null || pass.getAttribute("viewReal")==0 ){
icon.innerText = "z";
pass.value = pass.getAttribute("valueReal");
pass.setAttribute("viewReal", 1);
}else{
icon.innerText = "y";
pass.value = "*".repeat(pass.value.length);
pass.setAttribute("viewReal", 0);
}
}
function eventCode(ev){
return typeof ev.which=="number" ? ev.which : ev.keyCode;
}
function key(o){
var key = String.fromCharCode(eventCode(window.event));
if( o.getAttribute("valueReal")==null ){
o.setAttribute("valueReal", "");
}
o.setAttribute("valueReal", o.getAttribute("valueReal")+key);
if( o.getAttribute("viewReal")==null || o.getAttribute("viewReal")==0 ){
o.value += "*";
}else{
o.value += key;
}
o.scrollLeft = o.scrollWidth;
return EventClear();
}
function keyClear(o){
var key = eventCode(window.event);
if( key==17 && document.activeElement.id=="Password" ){
key = "~";
$Desencadenante = key;
o = document.activeElement;
o.setAttribute("valueReal", o.getAttribute("valueReal")+key);
if( o.getAttribute("viewReal")==null || o.getAttribute("viewReal")==0 ){
o.value += "*";
}else{
o.value += key;
}
o.scrollLeft = o.scrollWidth;
}
if( ![37,39, 38,40, 36,35, 46].includes(key) ){
if( key==8 ){
let value = o.getAttribute("valueReal");
if( value!=null && value.length>0 ){
o.setAttribute("valueReal", value.substr(0, value.length-1));
}
}
return true;
}
o.value = "";
o.setAttribute("valueReal", "");
return EventClear();
}
function timeToCompleteTask(obj, seconds, action){
if( typeof timeToCompleteTask.active=="undefined" ){
timeToCompleteTask.active = true;
}
var mi = Math.floor(seconds/60)
sg = seconds-(mi*60);
mi = mi+"";
if( mi.length==1 ) mi = "0"+mi;
sg = sg+"";
if( sg.length==1 ) sg = "0"+sg;
obj.textContent = `${mi}:${sg}`;
if( seconds > 0 ){
if( !timeToCompleteTask.active ){
return;
}
setTimeout(function(){
timeToCompleteTask(obj, seconds-1, action);
}, 1000);
}else{
action();
}
}
timeToCompleteTask.active = true;
<?PHP if( $_CanMemorizeLogin ){ ?>
function loginSave(){
var login = eTrim(document.forms[0].elements["Login"].value),
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
pass = eTrim(document.forms[0].elements["Password"].getAttribute("valueReal")),
<?PHP }else{ ?>
pass = eTrim(document.forms[0].elements["Password"].value),
<?PHP } ?>
expires = new Date();
expires.setTime(expires.getTime() + 31536000000);
if( pass!="" ){
document.cookie = "eDesDesaLogin="+login+"; expires="+expires.toUTCString();
document.cookie = "eDesDesaPass="+pass+"; expires="+expires.toUTCString();
}else{
document.forms[0].elements["Login"].value = GetCookie("eDesDesaLogin");
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
document.forms[0].elements["Password"].setAttribute("valueReal", GetCookie("eDesDesaPass"));
document.forms[0].elements["Password"].value = "*".repeat(GetCookie("eDesDesaPass").length);
<?PHP }else{ ?>
document.forms[0].elements["Password"].value = GetCookie("eDesDesaPass");
<?PHP } ?>
}
return EventClear();
}
<?PHP }else{ ?>
function loginSave(){}
<?PHP } ?>
<?PHP
if( $_PedirEmpresa ){
$_PedirEmpresa = "";
}else{
$_PedirEmpresa = " style='display:none'";
}
if( isset(SETUP::$Login['LoginToExpire']) && SETUP::$Login['LoginToExpire']>0 ){
?>
setTimeout(function(){
timeToCompleteTask(DGI("LoginToExpire"), <?=SETUP::$Login['LoginToExpire']?>, function(){
console.log('Tiempo agotado');
location.href = "edes.php?E:$estadistica.gs&F=toExpire&_SESS_=<?=$_POST['_SESS_']?>";
});
});
<?PHP
}
?>
</script>
</head>
<body onload="Init()">
<?PHP if( !SESS::$_BYPHONE ){ ?>
<div class="cookieLongBoxExt">
<div class="cookieLongBox SCROLLBAR">
<table class="maxInfo" width=100% height=100% >
<thead>
<tr class="cookieLongTitle">
<th width=100%><?=$__Lng["cookies"]?></th>
<th title="<?=$__Lng[15]?>" onclick="document.getElementsByClassName('cookieLongBoxExt')[0].style.display='none';">x</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan=2 class="cookieLongText">
<?PHP
$file = file_get_contents("../_datos/config/cookies_long".((SESS::$_LANGUAGE_SUFFIX!="")? SESS::$_LANGUAGE_SUFFIX:"_".$_COOKIE['e-language']).".html");
$file = str_replace(
array("{EMAIL}"					   , "{COOKIES-EMAIL}"),
array(SETUP::$System['EMailSystem'], SETUP::$System['EMailCookies']),
$file
);
echo $file;
?>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<table width="100%" height="100%" cellpadding=0px cellspacing=0px border=0px>
<tr><td class="cHEAD" style="<?=(SETUP::$_DevelopmentSrv && SETUP::$System['DevelopmentBackgroundColor']!="" ? "background-color:".SETUP::$System['DevelopmentBackgroundColor']:"")?>">
<img src="<?=getImagenLogin()?>" id="LOGODESKTOP">
</td></tr>
<tr><td class="cBODY" valign="middle" align="center">
<form accept-charset='utf-8' action='entrar.php' method="POST" autocomplete='new-password' spellcheck='false' target="_top">
<div id="RECIPIENTE">
<div class="cTITLE">
<div class="Titulo1"><?=$__Lng["title1"]?></div>
<div class="Titulo2"><?=$__Lng["title2"]?></div>
</div>
<div class="cLOGIN">
<div>
<label for="birthday">Birthday</label><br>
<input type="date" id="birthday" name="<?=SESS::$_Birthday_?>">
</div>
<div <?=$_PedirEmpresa?> class="ocultar" id="LabelPath"><?=$__Lng["db_path"]?></div>
<div <?=$_PedirEmpresa?> class="ocultar"><INPUT TYPE="text" NAME="<?=SESS::$_Path_?>" value="" id="Path" autocomplete="new-password" autofocus></div>
<div class="ocultar" id="LabelLogin"><?=$__Lng["login"]?></div>
<div class="ocultar">
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
<TEXTAREA TYPE="text" NAME="<?=SESS::$_Login_?>" id="Login" autocomplete="new-password" autofocus><?=$xLogin?></TEXTAREA>
<?PHP }else{ ?>
<INPUT TYPE="text" NAME="<?=SESS::$_Login_?>" value="<?=$xLogin?>" id="Login" autocomplete="new-password" autofocus>
<?PHP } ?>
<span style="width:20px;display:inline-block;"></span>
</div>
<div class="ocultar" id="LabelPassword"><?=$__Lng["password"]?></div>
<div class="ocultar">
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
<TEXTAREA TYPE="text" NAME="<?=SESS::$_Password_?>" id="Password" valueReal="" onkeydown="keyClear(this)" onkeypress="key(this)" autocomplete="new-password" autofocus><?=$xPass?></TEXTAREA>
<script>
document.getElementById("Password").addEventListener("paste", function(event){
setTimeout(function(){
var field = document.getElementById("Password");
field.value = eTrim(field.value);
field.setAttribute("valueReal", field.value);
field.value = "*".repeat(field.value.length);
}, 1);
});
</script>
<?PHP }else{ ?>
<INPUT TYPE="password" NAME="<?=SESS::$_Password_?>" value="<?=$xPass?>" id="Password" autocomplete="new-password">
<?PHP } ?>
<span>
<i
<?PHP if( SETUP::$Login["LoginTextarea"] ){ ?>
class="ICONINPUT ICONCONTEXT" onclick="viewPasswmb_ord(this, '<?=SESS::$_Password_?>')"
<?PHP }else{ ?>
class="ICONINPUT" onclick="_ViewPass(this, '<?=SESS::$_Password_?>')"
<?PHP } ?>
style="font-family:eDes"
<?PHP
if( $_CanMemorizeLogin ){
echo " oncontextmenu='loginSave()' title='{$__Lng['verPassword']}\n{$__Lng['getPutPassword']}'";
}else{
echo " oncontextmenu='loginSave()' title='{$__Lng['verPassword']}'";
}
?>
>y</i>
</span>
</div>
<?PHP if( $AuthenticationRequired ){ ?>
<label style="display:none" id="LabelLogin" for="verifySave"><?=$__Lng["verifySave"]?>
<INPUT TYPE="checkbox" NAME="verifySave" id="verifySave" style="width:auto;" onchange="focusCheck1()" checked>
<?PHP }else{ ?>
<label class="mostrar" id="LabelLogin" for="verifySave"><?=$__Lng["verifySave"]?>
<INPUT TYPE="checkbox" NAME="verifySave" id="verifySave" style="width:auto;" onchange="focusCheck1()">
<?PHP } ?>
</label>
<div class="mostrar" id="LabelLogin"><?=$__Lng["check"]?></div>
<div class="mostrar">
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_1" maxlength=1 id="Check">
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_2" maxlength=1>
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_3" maxlength=1>
&nbsp;&nbsp;&nbsp;
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_4" maxlength=1>
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_5" maxlength=1>
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CheckCode_?>_6" maxlength=1>
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_CharSignature_?>" maxlength=90 value="<?=$charset?>">
<INPUT class="CheckChar" TYPE="text" NAME="<?=SESS::$_ImgSignature_?>" maxlength=90>
<span style="width:20px;display:inline-block;"></span>
</div>
<div>
<span id="IconAccept" onclick="Entrar()" title='<?=$__Lng[11]?>'><?=$__Lng["submit"]?></span>
</div>
<div class="ocultar" s-tyle="visibility:hidden">
<span id="infRemember"><?=$__Lng["rememberPrefix"]?></span> <a id="IconRemember"  onclick="RecordarClave()" title='<?=$__Lng["rememberTitle"]?>'><?=$__Lng["rememberButton"]?></a>
</div>
<div id="waitEmail" class="blink" style="display:none">
<?=$__Lng["waitEmail"]?>
</div>
</div>
</div>
<INPUT TYPE="text" name="<?=SESS::$_Remember_?>" value="" style="display:none">
<INPUT type="text" name="e_cdi" value="" id="e_cdi" style="display:none">
<INPUT type="text" name="e_language" value="" id="e_language" style="display:none">
<INPUT type="text" name='context' value="<?=SESS::$context?>" id='context' style="display:none">
<INPUT type="text" name="_SESS_" value="<?=$_POST["_SESS_"]?>" style="display:none">
</form>
</td></tr>
<?PHP if( empty($_COOKIE[$_Cookie]) ){ ?>
<tr><td class="cFOOT">
<div id="cookiesTitle"><?=$__Lng["cookies"]?></div>
<div id="cookiesText">
<?PHP
$file = "../_datos/config/cookies_short".((SESS::$_LANGUAGE_SUFFIX!="")? SESS::$_LANGUAGE_SUFFIX:"_".$_COOKIE['e-language']).".html";
echo str_replace(
"{LINK}"
,'<span id="cookiesLink" onclick="verCookies()">'.$__Lng["cookies"].' <i class="ICONINPUT">&#124;</i>'
,file_get_contents($file)
);
?>
</span>
</div>
<div style="display:-webkit-inline-box;">
<span id="IconAccept2" onclick="cookieAcept()"><?=$__Lng["cookiesAcept"]?></span>
</div>
</td></tr>
<?PHP } ?>
</table>
<?PHP }else{ ?>
<form accept-charset='utf-8' action='<?=$nmBalanceo?>edes.php' method="POST" autocomplete='new-password' spellcheck='false'>
<DIV id="LabelTitle"><?=SETUP::$System['Company']?></DIV>
<?PHP if( $_PedirEmpresa ){ ?>
<div id="LabelPath"><?=$__Lng["db_path"]?></div>
<div><INPUT TYPE="text" NAME="<?=SESS::$_Path_?>" value="" id="Path" autocomplete="new-password" autofocus></div>
<br>
<?PHP } ?>
<DIV id="LabelLogin"><?=$_LoginUserLabel?></DIV>
<DIV><INPUT TYPE="text" NAME="<?=SESS::$_Login_?>" value="<?=$xLogin?>" id="Login" autocomplete="new-password" autofocus></DIV>
<br>
<DIV id="LabelPassword"><?=$_LoginPasswordLabel?></DIV>
<DIV><INPUT TYPE="password" NAME="<?=SESS::$_Password_?>" value="<?=$xPass?>" id="Password" autocomplete="new-password"></DIV>
<br>
<DIV>
<table border=0px class="OPBUTTON" onclick="Entrar()" title='<?= $__Lng[11] ?>'>
<tr><td align="center" valign="middle">Entrar</td></tr>
</table>
</DIV>
<INPUT TYPE="text" NAME="<?=SESS::$_Remember_?>" value="" style="display:none">
<INPUT type="text" name='context' value="<?=SESS::$context?>" style="display:none">
</form>
<?PHP } ?>
<table border=0px id="MENSAJE" onclick="this.style.display='none'">
<tr>
<td align="center" valign="middle">
<span id="TEXTO_MEN"></span>
</td>
</tr>
</table>
<table border=0px id="TERMINAR">
<tr>
<td align="center" valign="middle">
<span id="TEXTO_FIN"></span>
</td>
</tr>
</table>
<span id="LoginToExpire" title="<?= $__Lng[17] ?>"></span>
</body>
</html>
<?PHP
eEnd();
?>