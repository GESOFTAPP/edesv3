<?PHP
if( S::$_User==-1 ) exit;
$Login = trim($_SERVER['PHP_AUTH_USER']);
$Pass = mb_strtoupper(md5($_SERVER['PHP_AUTH_PW']));
if( !empty(SESS::$_P_) ){
$Pass = SESS::$_P_;
}
$_gsPrefijo = '';
LeerLP($Login, $Pass, $_TipoUsu, $NumBak, $_gsNomUser);
function LeerLP(&$Login, &$Pass, &$_TipoUsu, &$NumBak, &$_gsNomUser){
global $Dir_, $_gsPrefijo;
if( $Login=='' ) $Login = SESS::$_L_;
if( $Pass =='' ) $Pass  = SESS::$tmp['_PSDV'];
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
if( eSubstrCount($_SERVER['SCRIPT_FILENAME'], '/edesweb2/http/edes.php')==0 ){
$fd = @fopen($Dir_.'t/'.'e'.'d.l'.'p','r');
}else{
$fd = @fopen(DIREDES.'web/edesweb/_d_/cfg/'.'e'.'d.l'.'p','r');
}
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for($n=0; $n<$LongDeLong; $n++){
$LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
}
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for($n=$Basura; $n<$Basura+($LenCadena*2); $n++){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10), gzuncompress($txt));
if( 212940319!=crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_',trim($tmp[1]));
$NumBak = trim($tmp[2]);
$NewUser = isset(SESS::$_gsACCESO['EMAIL']) ? SESS::$_gsACCESO['EMAIL'] : SESS::$_UserLogin;
$IncLongin = '';
if( substr($NewUser,0,2)=='C#' ){
$NewUser = substr($NewUser,2);
}
if( eSubstrCount($NewUser,'#')==1 ){
list($NewUser, $_gsPrefijo) = explode('#', $NewUser);
$_gsPrefijo = trim($_gsPrefijo).'/';
}
SESS::$_gsACCESO = array();
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(chr(9), $tmp[$n]);
if( $n==3 ) $NomCampo = $tmp2;
if( $n>3 && eSubstrCount($tmp[$n], chr(9).$NewUser.chr(9))==1 ){
if( trim($tmp2[2])=="" && chr(9).$tmp2[5].chr(9)==chr(9).$NewUser.chr(9) ){
$Login = $IncLongin.$NewUser;
$_TipoUsu = $tmp2[0];
$_gsNomUser = $Login;
$GLOBALS['_eDesUSU'] = $n-3;
$ValCampo = $tmp2;
SESS::$_gsACCESO = array();
for($y=0; $y<count($NomCampo); $y++){
$NomCampo[$y] = trim($NomCampo[$y]);
if( !preg_match('/^(\-|LOGIN|CLAVE|EMAIL|Excel|Flow|Fronts|Html|Word|DocBox|Table|Foldes)$/', $NomCampo[$y]) ){
SESS::$_gsACCESO[$NomCampo[$y]] = $ValCampo[$y];
}
}
$_RecentFiles = eFileGetVar('../_d_/cfg/edes.ini->$_RecentFiles');
if( $_RecentFiles=='' ) $_RecentFiles = 25;
SESS::$_RecentFiles = $_RecentFiles;
$txt = gzuncompress($txt);
$txt = str_replace(
chr(9).$tmp2[2].chr(9).$tmp2[3].chr(9).$tmp2[4].chr(9).$Login.chr(9)
,chr(9).$Pass   .chr(9).$tmp2[3].chr(9).$tmp2[4].chr(9).$Login.chr(9)
,$txt
);
GrabarLP($txt);
return;
}else if( chr(9).$tmp2[5].chr(9).$tmp2[2].chr(9)==chr(9).$NewUser.chr(9).$Pass.chr(9) ){
$Login = $IncLongin.$NewUser;
$_TipoUsu = $tmp2[0];
$_gsNomUser = $IncLongin.$NewUser;
$GLOBALS['_eDesUSU'] = $n-3;
$ValCampo = $tmp2;
SESS::$_gsACCESO = array();
for($y=0; $y<count($NomCampo); $y++){
$NomCampo[$y] = trim($NomCampo[$y]);
if( $NomCampo[$y]=='EMAIL' ){
SESS::$_L_ = $ValCampo[$y];
SESS::$_gsACCESO[$NomCampo[$y]] = $ValCampo[$y];
}
if( !preg_match('/^(\-|LOGIN|CLAVE|EMAIL|Excel|Flow|Fronts|Html|Word|DocBox|Table|Foldes)$/', $NomCampo[$y]) ){
SESS::$_gsACCESO[$NomCampo[$y]] = $ValCampo[$y];
}
}
$_RecentFiles = eFileGetVar('../_d_/cfg/edes.ini->$_RecentFiles');
if( $_RecentFiles=='' ) $_RecentFiles = 25;
SESS::$_RecentFiles = $_RecentFiles;
return;
}
}
}
return;
}
function GrabarLP( $txt ){
global $Dir_;
$Buffer = '';
$tmp = explode(chr(10),$txt);
$txt = gzcompress($txt, 1);
$Basura = rand(50,250);
$Buffer .= chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$Buffer .= chr(count($tmp));
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
for( $n=0; $n<$lf; $n++ ){
$Buffer .= substr($txt,$n,1);
$Buffer .= chr(rand(0,255));
}
$nb = ( ceil( strlen($Buffer) / 1959 ) * 1959 ) - strlen($Buffer);
for( $n=0; $n<$nb; $n++ ) $Buffer .= chr(rand(0,255));
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$pnt = @fopen('../_d_/cfg/e'.'d.l'.'p','w');
}else{
if( eSubstrCount( $_SERVER['SCRIPT_FILENAME'], '/edesweb2/http/edes.php' ) == 0 ){
$pnt = @fopen($Dir_.'t/'.'e'.'d.l'.'p','w');
}else{
$pnt = @fopen(DIREDES.'web/edesweb/_d_/cfg/'.'e'.'d.l'.'p','w');
}
}
if( !$pnt ) die('');
fputs( $pnt, $Buffer );
fclose( $pnt );
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
touch('../_d_/cfg/e'.'d.l'.'p', mktime(3,1,0, 01,03,2007) );
}else{
if( eSubstrCount( $_SERVER['SCRIPT_FILENAME'], '/edesweb2/http/edes.php' ) == 0 ){
touch($Dir_.'t/'.'e'.'d.l'.'p', mktime(3,1,0, 01,03,2007) );
}else{
touch(DIREDES.'web/edesweb/_d_/cfg/'.'e'.'d.l'.'p', mktime(3,1,0, 01,03,2007) );
}
}
return $Buffer;
}
function CheckLP($login=""){
global $Dir_, $_gsPrefijo;
if( empty($login) ){
$login = SESS::$_UserLogin;
}
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
if( eSubstrCount($_SERVER['SCRIPT_FILENAME'], '/edesweb2/http/edes.php')==0 ){
$fd = @fopen($Dir_.'t/'.'e'.'d.l'.'p','r');
}else{
$fd = @fopen(DIREDES.'web/edesweb/_d_/cfg/'.'e'.'d.l'.'p','r');
}
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for($n=0; $n<$LongDeLong; $n++) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for($n=$Basura; $n<$Basura+($LenCadena*2); $n++){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319!=crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_',trim($tmp[1]));
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(chr(9), $tmp[$n]);
if( $n>3 && chr(9).$tmp2[5].chr(9)==chr(9).$login.chr(9) ){
return true;
}
}
return false;
}
include( $Dir_.'t/store.inc' );
?>