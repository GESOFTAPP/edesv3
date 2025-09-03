<?php
function _checkRequestExists(){
return;
list($script) = preg_split('/[\?\&]/u', $_ENV[SYS]['queryString']);
$sql = "select	*
from	{$_ENV['eDesDictionary']}gs_context
where
type='url'
and cd_gs_conexion='".SESS::$_Connection_."'
and context='{$_GET['_CONTEXT']}'
and script='{$script}'
";
S::qQuery($sql);
$r = S::qArray();
if( $r["type"]!="url" ){
die("ERROR: record not found");
}
$r["data"] = trim($r["data"]);
if( mb_substr($r["data"], -1)!="}" ){
return get2array($r["data"]);
}
$r["data"] = json_decode($r["data"]);
if( json_last_error()==0 ){
return $r["data"];
}
switch(json_last_error()) {
case JSON_ERROR_NONE:
$error = 'Sin errores';
break;
case JSON_ERROR_DEPTH:
$error = 'Excedido tamaño máximo de la pila';
break;
case JSON_ERROR_STATE_MISMATCH:
$error = 'Desbordamiento de buffer o los modos no coinciden';
break;
case JSON_ERROR_CTRL_CHAR:
$error = 'Encontrado carácter de control no esperado';
break;
case JSON_ERROR_SYNTAX:
$error = 'Error de sintaxis, JSON mal formado';
break;
case JSON_ERROR_UTF8:
$error = 'Caracteres UTF-8 malformados, posiblemente están mal codificados';
break;
default:
$error = 'Error desconocido';
break;
}
die("ERROR: ".$error);
}
function eContextReset(){
$cdiDeleteTemp = date('Y-m-d H:i:s', date('U')-(SETUP::$System['SessionMaxLife']*2));
S::qQuery("
delete from {$_ENV['eDesDictionary']}gs_serial
where
cd_gs_conexion in (select conexion from {$_ENV['eDesDictionary']}gs_conexion where cdi<'{$cdiDeleteTemp}')
");
S::qQuery("
delete from {$_ENV['eDesDictionary']}gs_context
where
cd_gs_conexion in (select conexion from {$_ENV['eDesDictionary']}gs_conexion where cdi<'{$cdiDeleteTemp}')
");
}
function eContextInit(){
return;
SESS::$context += rand(1, 99);
$_ENV[SYS]['context']   = SESS::$context;
S::qQuery("
insert into {$_ENV['eDesDictionary']}gs_serial
(cd_gs_conexion, pk)
values
(".SESS::$_Connection_.", ".SESS::$context.")
");
SESS::$context = 0;
}
function eSerialAdd(){
S::qQuery("select pk from {$_ENV['eDesDictionary']}gs_serial where cd_gs_conexion='".SESS::$_Connection_."'");
list($_ENV[SYS]['context']) = S::qRow();
$_ENV[SYS]['context']++;
S::qQuery("update {$_ENV['eDesDictionary']}gs_serial set pk='{$_ENV[SYS]['context']}' where cd_gs_conexion='".SESS::$_Connection_."'");
return $_ENV[SYS]['context'];
}
function eContextPK($main=false){
return $_ENV[SYS]['context'];
}
function eContextPKMain(){
if( empty($_ENV[SYS]['contextMain']) ){
if( empty($_ENV[SYS]['context']) ) $_ENV[SYS]['context'] = 1;
$_ENV[SYS]['contextMain'] = $_ENV[SYS]['context'];
}
return $_ENV[SYS]['contextMain'];
}
function eContextAddUrl(){
return '&_CONTEXT='.eContextPK();
}
function _contextAdd($script, $condition=array()){
return;
list(,$script) = preg_split('/[\?\&]/u', $script);
foreach($condition as $k=>$v){                      // eTrace(gettype($v)); if( gettype($v)=="array" ){
foreach($v as $k2=>$v2){                        // $v2 = utf8_encode($v2);
$condition[$k][$k2] = $v2;
}
}
$condition = str_replace("'", "\\'", $condition);
if( json_last_error()>0 ){
die("_contextAdd: con errores");
}
$type = "url";
$sql = "insert into {$_ENV['eDesDictionary']}gs_context (cd_gs_conexion, context, type, script, data) values ('".SESS::$_Connection_."', '{$_ENV[SYS]['context']}', '{$type}', '{$script}', '{$condition}')";
qQuery($sql);
}
function eSessionAddUrl(){
return "&_SESS_={$_GET['_SESS_']}";
}
function _urlGet($url){
return $url.eSessionAddUrl();
}
function get2array($txt){
if( gettype($txt)=="array" ){
return $txt;
}
$dim = array();
$tmp = explode("&", $txt);
for($i=0; $i<count($tmp); $i++){
if( trim($tmp[$i])=="" ) continue;
eExplodeOne($tmp[$i], "=", $k, $v);
if( preg_match('/^(_CONTEXT|_SESS)$/u', $k) ) continue;
$dim[$k] = $v;
}
return $dim;
}
function eCacheSqlPut($type, $sql, $script=""){
if( $type=="md5" ){
$pk = $_ENV[SYS]['contextMain'];
}else{
eSerialAdd();
$pk = $_ENV[SYS]['context'];
}
if( empty($pk) ) $pk = 1;
$sql = addslashes($sql);
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_context (cd_gs_conexion,context,type,script,data) value (".SESS::$_Connection_.", {$pk}, '{$type}', '{$script}', '{$sql}')");
return $_ENV[SYS]['context'];
}
function eCacheSqlGet($type, $context){
if( !preg_match('/^[0-9]*$/u', $context) ){
_hackerLog("_CONTEXT no valido");
}
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_." and context={$context} and type='{$type}'");
$r = S::qArray();
return $r;
}
function eAddFilterGet($type, $addFilter){
list($context, $addFilter) = explode("|", $addFilter);
if( !preg_match('/^[0-9]*$/u', $context) ){
_hackerLog("_CONTEXT no valido");
}
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_." and context={$context} and type='{$type}'");
$r = S::qArray();
return $r["data"];
}
function _GeneraInputMD5($_DBRLOCK, $_Mode, $generar=true){
if( isset($_DBRLOCK) && $_DBRLOCK && ($_Mode=="mR" || $_Mode=="bR") ){
$md5 = $_DBRLOCK;
}else{
$md5 = eContextPKMain().".".md5(SETUP::$System['EncryptionKey'].time());
eCacheSqlPut("md5", $md5, $_ENV[SYS]["Object"].":".$_ENV[SYS]["DF"]);
}
if( $generar ){
echo "<INPUT TYPE='hidden' NAME='_MD5' VALUE='{$md5}'>";
}
return $md5;
}
function _CheckMD5($mode){
return;
if( preg_match('/^(c|m|b|r|M|B)$/u', $mode) ){
return;
}
if( $_SERVER['REQUEST_METHOD']!="POST" ){
return;
}
try {
if( isset($_POST["_E_X_P__MD5"]) ){
if( $mode=="cR" ) return;
list($pk) = explode(".", $_POST["_E_X_P__MD5"]);
$result = eCacheSqlGet("md5", $pk);
throw new Exception(7);
}
if( !isset($_POST["_MD5"]) ){
throw new Exception(1);
}
list($pk) = explode(".", $_POST["_MD5"]);
if( $_GET["_CONTEXT"]!=$pk ){
throw new Exception(2);
}
$result = eCacheSqlGet("md5", $pk);
if( $result==NULL ){
throw new Exception(3);
}
eExplodeOne($result["script"], ":", $xMode, $xScript);
if( $result["data"]!=$_POST["_MD5"] ){
throw new Exception(4);
}
if( $_ENV[SYS]["DF"]!=$xScript ){
throw new Exception(5);
}
if( ($xMode."R")!=$_ENV[SYS]["Object"] ){
if( !isset($GLOBALS["_FORMACTION"]) && !isset($GLOBALS["_OPTIONSINLIST"]) ){
throw new Exception(6);
}
}
}catch( Exception $e ){
_hackerLog("_CheckMD5({$e->getMessage()})", false);
eMessage("Indeterminate error".((SESS::$_D_=='~')?" {$pk} - {$e->getMessage()}":""), 'HSE');
}
}
function eContext2FilePut($file, $xGet="", $title=""){
return;
$get = array("get"=>get2array($xGet), "title"=>$title);
$get = serialize($get);
$get = str_replace("'", "\\'", $get);
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_context (cd_gs_conexion,context,type,script,data) value (".SESS::$_Connection_.", {$_ENV[SYS]['context']}, 'file', '{$file}','{$get}')");
return $_ENV[SYS]['context'].eContextAddUrl().eSessionAddUrl();
}
function eGetUrl($url){
return;
$pos = mb_strpos($url, ":");
if( $pos<4 ){
$url = "edes.php?".$url;
}
$obj = eMid($url, "?", ":");
if( $obj=="D" ){
eExplodeOne($url, ":", $no, $para);
$dim = get2array("_NO_=".$para);
$dim["_DOWN"] = "1";
if( empty($dim["_FILENAME"]) && !empty($dim["FILE"]) ) $dim["_FILENAME"] = $dim["FILE"];
unset($dim[""]);
$para = explode("&", $para);
$file = $para[0];
return "edes.php?D:".eContext2FilePut($file, $dim);
}
$url = eContextUrl($url);
return $url;
}
function eContext2FileGet($pk){
return;
if( !preg_match('/^[0-9]*$/u', $pk) ){
_hackerLog("_CONTEXT no valido");
}
S::qQuery("select * from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_." and context={$pk} and type='file'");
$r = S::qArray();
if( $r["cd_gs_conexion"]!=SESS::$_Connection_ ){
_hackerLog("Registro no encontrado");
}
$data = unserialize($r["data"]);
foreach($data["get"] as $k=>$v){
$_GET[$k] = $v;
}
return $r["script"];
}
function eContextUrl($url){
return;
eContextPut($url);
if( eSubstrCount($url, "_CONTEXT=")==0 ){
$url .= ((eSubstrCount($url, "?"))? "&": "?").'_CONTEXT='.eContextPK();
}
return $url;
}
function eContextPut($script, $data=""){
return;
if(mb_substr($script,-2)=="()" || mb_substr($script,-3)=="();" ) return;
$type = "url";
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $script);
if( mb_substr($script,0,9)=="edes.php?" ){
$script = mb_substr($script, 9);
}
if( mb_strpos($script, "&")!==false ){
list($script, $data) = explode("&", $script);
}
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_context
(		    cd_gs_conexion    ,			     context   ,    type  ,    script  ,   data   ) values
(".SESS::$_Connection_.", {$_ENV[SYS]['context']}, '{$type}', '{$script}', '{$data}')");
}
function eContextPut_NO($script, $PKSeek="", $ConPost=true){
return;
if( !SETUP::$System['ContextActivate'] ) return;
if(mb_substr($script,-2)=="()" || mb_substr($script,-3)=="();" ) return;
if( SESS::$_D_!='' ) eTron("original: {$script}");
global $Dir_, $_Sql, $_ContextReadOnly, $_ContextFieldsMD5, $_ContextFieldsADD, $_DBSERIAL, $_Mode;
if( $_GET["_REG_"]!="" && $_Mode=="l" ) return;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
include( $Dir_.$_Sql.'.inc' );
_ShowError( $php_errormsg, $tmpFile );
}
$dim = array();
if( $ConPost ){
foreach($_ContextFieldsMD5 as $k=>$v) $dim[]=$k;
foreach($_ContextFieldsADD as $k=>$v) $dim[]=$k;
$dim = array_unique($dim, SORT_STRING);
sort($dim);
$ReadOnly = $_ContextReadOnly;
}else{
$ReadOnly = "";
}
$ListaFields = implode(';', $dim);
$md5fields = ($ListaFields!='' ? md5($ListaFields) : "");
$DebugMd5 = (SESS::$_D_!='') ? $ListaFields : "";
if( isset($_DBSERIAL) ) $FieldGet = $_DBSERIAL[1];
if(mb_substr($script,0,9)=="edes.php?") $script = mb_substr($script, 9);
if(mb_substr($script,0,3)=="Fa:" || mb_substr($script,0,3)=="Ga:") $FieldGet = "";
if( eSubstrCount($script,"&_SEEK&")>0 ){
list(,$seek) = explode("&_SEEK&",$script);
$ReadOnly = str_replace("&",";",$seek);
}
list($script) = explode("&",$script);
if( (mb_substr($script,2,1)==":" || mb_substr($script,3,1)==":") && eSubstrCount($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $script);
if( SESS::$_D_!='' ){
eTron("memoriza: {$_ENV[SYS]['context']} - {$script} - {$ListaFields} - {$DebugMd5} - {$PKSeek}");
}
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_context
(		    cd_gs_conexion    ,			    context   ,    script  ,   pk_seek  , fields_readonly,   md5_fields ,     field_get ,    debug_md5 ) values
(".SESS::$_Connection_.", {$_ENV[SYS]['context']}, '{$script}', '{$PKSeek}',  '{$ReadOnly}' , '{$md5fields}', '{$FieldGet}', '{$DebugMd5}')");
}
function eContextGet($Seek=""){
return;
if( !SETUP::$System['ContextActivate'] ) return;
global $Dir_, $_Sql, $_Mode, $_CONTEXTFREE, $_ContextFieldsADD;
$error = 'Operación no permitida';
if( $_Sql=='' ){
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
list($script,$no) = explode('&', $_SERVER["QUERY_STRING"]);
if( preg_match("/(E:CallSrv=)/u", $_SERVER['QUERY_STRING']) ){
list($no) = explode("=", $no);
$script .= "&{$no}=";
}
if( mb_substr($_SERVER["QUERY_STRING"],0,2)=="S:" && $_GET["xSELECT"]!="" ){
$script = $_GET["xSELECT"];
}
if( mb_substr($script,2,1)==":" && eSubstrCount($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$script = str_replace(["'",'"','|'], ["&#39;","&#34;","&#124;"], $script);
if( $_GET['_CONTEXT']=="" ) $_GET['_CONTEXT'] = 1;
if( mb_substr($script,0,2)=="D:" && $_GET["SUBLIST"]==1 ){
$tmp = explode("/",$script);
$file = $tmp[count($tmp)-1];
$dir = str_replace($file, "", $script);
$sql = "select * from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_." and context='{$_GET['_CONTEXT']}' and script like '{$dir}%'";
S::qQuery($sql);
$r = S::qArray();
list($pk) = explode(".", $file);
list(,$sufijo) = explode("{", $r["script"]);
$file = "../_tmp/php/".S::$_User."_".$_GET["_CONTEXT"].".srl.{$sufijo}";
$dim = file($file, FILE_IGNORE_NEW_LINES);
$t = count($dim);
for($n=0; $n<$t; $n++){
if( $dim[$n]==$pk ){
return true;
}
}
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-DOC:<br>[{$r['pk_seek']}]<>[{$Seek}]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
return false;
}
$sql = "select * from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_." and context='{$_GET['_CONTEXT']}' and script='{$script}'";
if( SESS::$_D_!='' ){
eTron($_SERVER["QUERY_STRING"]);
eTron($sql.' - ['.$Seek.']');
}
S::qQuery($sql);
$r = S::qArray();
if( $Seek!="" && $r["pk_seek"]!="" && $r["pk_seek"]!=$Seek ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-1:<br>[{$r['pk_seek']}]<>[{$Seek}]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
if( trim($r["script"])=="" || $r['context']!=$_GET['_CONTEXT'] ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-2:".'<br>Mode: ['.$_Mode.']<br>Script: ['.$r["script"].']<br>Context DB: ['.$r['context'].'] <> Context GET: ['.$_GET['_CONTEXT'].']<br>sql: ['.$sql.']<br>QUERY_STRING: ['.str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
if( trim($r["md5_fields"])!="" && $_SERVER["REQUEST_METHOD"]=="POST" ){
$dim2 = array();
foreach($_POST as $k=>$v) if( $k[0]!='_' ) $dim2[] = $k;
foreach($_ContextFieldsADD as $k=>$v) $dim2[] = $k;
$dim = array();
$dim = array_unique($dim2, SORT_STRING);
sort($dim);
$dim = implode(";",$dim);
if( trim($r["md5_fields"])!=md5($dim) ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-3 (error MD5 POST)".'<br>Mode: ['.$_Mode.']<br>fields: ['.$dim.']<br>debug_md5: ['.$r["debug_md5"].']<br>sql: ['.$sql.']<br>QUERY_STRING: ['.$_SERVER["QUERY_STRING"].']<br>Context DB: ['.$r['context'].'] <> Context GET: ['.$_GET['_CONTEXT'].']';
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
}
if( trim($r['fields_readonly'])!="" && $_SERVER["REQUEST_METHOD"]=="POST" ){
$tmp = explode(";",trim($r['fields_readonly']));
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
if( $_POST[$k]<>$v ){
if( $_CONTEXTFREE[$k] ) continue;
if( $_POST[$k]=="" && preg_replace('[0,.]','',$v)=="" ) continue;
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-4".'<br>method: '.$_SERVER["REQUEST_METHOD"].'<br>fields_readonly: '.$r['fields_readonly'].'<br>campo: "'.$k.'" = ['.$_POST[$k].']<>['.$v.']<br>sql: '.$sql;
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
}
}
if( $_SERVER["REQUEST_METHOD"]=="GET" && (trim($r['field_get'])!="" || preg_match("/(edes.php\?[DRr]:)/iu", $_SERVER['QUERY_STRING'])) ){
global $_DBSERIAL, $_DBINDEX;
$sufijo = trim($r["field_get"]);
if( $sufijo!="" ) $sufijo = ".{$sufijo}";
$file = "../_tmp/php/".S::$_User."_".$_GET["_CONTEXT"].".srl{$sufijo}";
$dim = file($file, FILE_IGNORE_NEW_LINES);
$t = count($dim);
if( $t==1 ) return;
if( $dim[0]==$_DBSERIAL[1] ){
$valor = $_GET[$_DBSERIAL[1]];
}else if( $dim[0]==$_DBINDEX ){
$valor = $_GET[$_DBINDEX];
}
for($n=1; $n<$t; $n++){
if( $dim[$n]==$valor ){
return $r;
}
}
if( SESS::$_D_!='' ){
$error = "NoPKSeek-5".'<br>field_get ['.$r['field_get'].']<br>serial ['.$valor.']<br>file seriales ['.$file.']<br>sql ['.$sql.']<br>QUERY_STRING ['.$_SERVER['QUERY_STRING'].']';
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
if( $_Mode=="l" && $r["pk_seek"]!="" && $r["pk_seek"]!=str_replace("'", "", $_GET["_FILTER"]) ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-6:<br>[{$r['pk_seek']}]<>[".str_replace("'","",$_GET["_FILTER"])."]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
if( trim($r['fields_readonly'])!="" && $_SERVER["REQUEST_METHOD"]=="GET" && mb_substr($_SERVER['QUERY_STRING'],0,3)!="Fa:" && mb_substr($_SERVER['QUERY_STRING'],0,3)!="Ga:" ){
$tmp = explode(";",trim($r['fields_readonly']));
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
if( $_GET[$k]<>$v ){
if( $_CONTEXTFREE[$k] ) continue;
if( $_POST[$k]=="" && isZero($v) ) continue;
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( SESS::$_D_!='' ){
$error = "NoPKSeek-7".'<br>method: '.$_SERVER["REQUEST_METHOD"].'<br>fields_readonly: '.$r['fields_readonly'].'<br>campo: "'.$k.'" = ['.$_POST[$k].']<>['.$v.']<br>sql: '.$sql;
eTron("\n".str_replace("<br>", "\n", $error));
}
eMessage("".$error, 'HSE');
}
}
}
return $r;
}
function _genContext(){
return;
global $_vF, $_ADDCODE, $_ADDBUTTON, $_ONCHANGE, $_DimInclude, $DimInsert;
$DimCheck = array();
if( !empty($_ADDBUTTON) ) for($n=0; $n<count($_ADDBUTTON); $n++) $DimCheck[] = $_ADDBUTTON[$n][2];
if( !empty($_ONCHANGE)  ) for($n=0; $n<count($_ONCHANGE) ; $n++) $DimCheck[] = $_ONCHANGE[$n][1];
if( !empty($_ADDCODE)   ) foreach($_ADDCODE as $k=>$v) foreach($v as $k2=>$v2){
$DimCheck[] = $v2;
}
if( !empty($_ONCHANGE)  ){
for($n=0; $n<count($_ONCHANGE); $n++){
$DimCheck[] = $_ONCHANGE[$n][1];
}
}
foreach($_DimInclude as $k2=>$v2){
if( $k2=="IncJ" ) continue;
foreach($v2 as $k=>$v){
if( $v!="" && (eSubstrCount($v,' src="')>0 || eSubstrCount($v," src='")>0) ){
$Comilla = ((eSubstrCount($v," src='")>0) ? "'":'"');
$p = mb_strpos($v," src=".$Comilla);
$ini = mb_strpos($v, $Comilla, $p)+1;
$fin = mb_strpos($v, $Comilla, $ini);
$url = mb_substr($v, $ini, $fin-$ini);
$v = str_replace(" src=".$Comilla.$url.$Comilla, " src=".$Comilla.$url.eContextAddUrl().$Comilla, $v);
$_DimInclude[$k2][$k] = $v;
if( $url!="" && $DimInsert[$url]=="" ){
eContextPut($url);
$DimInsert[$url] = 1;
}
}
}
}
$Dim = ['_JSHEAD', '_JSINI', '_JSEND', '_JSSELROW', '_JSONCLICKROW', '_PHPINI', '_PHPEND', '_HTMINI', '_HTMEND'];
for($i=0; $i<count($Dim); $i++){
$pk = trim($Dim[$i]);
if( empty($GLOBALS[$pk]) ) continue;
$dim = explode("\n", $GLOBALS[$pk]);
for($n=0; $n<count($dim); $n++){
$txt = $dim[$n];
if( eSubstrCount($txt, 'S.window(')>0		||
eSubstrCount($txt, 'top.eSWOpen(')>0	||
eSubstrCount($txt, 'eCallSrv(')>0		||
eSubstrCount($txt, 'location.href')>0	||
eSubstrCount($txt, 'location.replace(')	||
eSubstrCount($txt, 'location.assign(')	||
eSubstrCount($txt, 'eUrl(')
){
$DimCheck[] = $txt;
}
}
while( eSubstrCount($GLOBALS[$pk],'location.href')>0 ){
$txt = $GLOBALS[$pk];
$i  = mb_strpos($txt, 'location.href');
$i2 = mb_strpos($txt, '=', $i)+1;
$f  = mb_strpos($txt, ';', $i);
$textBegin = mb_substr($txt,0,$i);
$p = mb_strrpos(mb_substr($txt,0,$i), "\n");
if( $p!==false ){
$prefijo = mb_substr($txt, $p, $i-$p);
if( mb_substr($prefijo,-1)=="." ){
$prefijo = trim(mb_substr($txt,$p,$i-$p-1));
$textBegin = trim(mb_substr($txt,0,$p));
}else{
$p = false;
}
}
if( $p===false ){
$GLOBALS[$pk] = $textBegin."eUrl(".trim(mb_substr($txt, $i2, $f-$i2)).")".mb_substr($txt,$f);
}else{
$GLOBALS[$pk] = $textBegin."eUrlWindow({$prefijo}, ".trim(mb_substr($txt, $i2, $f-$i2)).")".mb_substr($txt,$f);
}
}
$txt = $GLOBALS[$pk];
if( eSubstrCount($txt, '<iframe ')>0 ){
$Comilla = ((eSubstrCount($txt," src='")>0)? "'":'"');
$p = mb_strpos($txt," src=".$Comilla);
$ini = mb_strpos($txt, $Comilla, $p)+1;
$fin = mb_strpos($txt, $Comilla, $ini);
$url = mb_substr($txt, $ini, $fin-$ini);
$txt = str_replace(" src=".$Comilla.$url.$Comilla, " src=".$Comilla.$url.eContextAddUrl().$Comilla, $txt);
$GLOBALS[$pk] = $txt;
if( $url!="" && $DimInsert[$url]=="" ){
eContextPut($url);
$DimInsert[$url] = 1;
}
}
}
$DimInsert = array();
for($n=0; $n<count($DimCheck); $n++ ){
$txt = trim($DimCheck[$n]);
$func = "";
if( eSubstrCount($txt,'top.eSWOpen(')>0 ){
$txt = _SustituyeGF($txt);
$txt = mb_substr($txt,mb_strpos($txt,'top.eSWOpen('));
$txt = trim(mb_substr($txt,mb_strpos($txt,",")+1));
$pComilla = mb_strpos(mb_substr($txt,1),$txt[0]);
$pParentesis = mb_strpos(mb_substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = mb_substr($txt,1, $pComilla);
}else if( eSubstrCount($txt,'eCallSrv(')>0 ){
$txt = _SustituyeGF($txt);
$txt = mb_substr($txt,mb_strpos($txt,'eCallSrv('));
$txt = trim(mb_substr($txt,mb_strpos($txt,",")+1));
$pComilla = mb_strpos(mb_substr($txt,1),$txt[0]);
$pParentesis = mb_strpos(mb_substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = mb_substr($txt,1, $pComilla);
if( eSubstrCount($func,".php")==1 && eSubstrCount($func,"edes.php")==0 && mb_substr($func,0,2)<>"E:" ){
$func = "E:".$func;
}
}else if( eSubstrCount($txt,'location.href')>0 ){
$p = mb_strpos($txt,'location.href');
$p = mb_strpos($txt,"=",$p)+1;
$Comilla = trim(mb_substr($txt,$p))[0];
$ini = mb_strpos($txt,$Comilla,$p)+1;
$fin = mb_strpos($txt,$Comilla,$ini);
$func = mb_substr($txt, $ini, $fin-$ini);
}else if( eSubstrCount($txt,'location.replace(')>0 || eSubstrCount($txt,'location.assign(')>0 || eSubstrCount($txt,'eUrl(')>0 ){
if( eSubstrCount($txt,'location.replace(')>0 ){
$p =  mb_strpos($txt,'location.replace(');
}else if( eSubstrCount($txt,'location.assign(')>0 ){
$p = 		mb_strpos($txt,'location.assign(');
}else{
$p = mb_strpos($txt, 'eUrl(');
}
$p = mb_strpos($txt, "(", $p)+1;
$Comilla = trim(mb_substr($txt, $p))[0];
$ini  = mb_strpos($txt, $Comilla, $p)+1;
$fin  = mb_strpos($txt, $Comilla, $ini);
$func = mb_substr($txt, $ini, $fin-$ini);
}else if( eSubstrCount($txt,'S.window(')>0 ){
$p = mb_strpos($txt,'S.window(')+9;
$Comilla = trim(mb_substr($txt,$p))[0];
$ini = mb_strpos($txt,$Comilla,$p)+1;
$fin = mb_strpos($txt,$Comilla,$ini);
$func = mb_substr($txt, $ini, $fin-$ini);
list($func) = explode("&",$func);
}
if( $func!="" && empty($DimInsert[$func]) ){
if( $func=="edes.php?" ){
if( SESS::$_D_!='' ) eTron('>>>>ERROR CALCULO>>> ['.trim($DimCheck[$n]).']['.$func.']');
continue;
}
eContextPut($func);
$DimInsert[$func] = 1;
}
}
global $_CONTEXTSUBSELECT;
if( !empty($_CONTEXTSUBSELECT) ){
$type = "url";
$data = "";
for($n=0; $n<count($_CONTEXTSUBSELECT); $n++ ){
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $_CONTEXTSUBSELECT[$n]);
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_context
(	   cd_gs_conexion   ,			   context   ,    type  ,    script  ,   data   ) values
(".SESS::$_Connection_.", {$_ENV[SYS]['context']}, '{$type}', '{$script}', '{$data}')");
}
}
}
function _DelimitadorGF($txt, $desde, $sumar){
return;
if( $sumar>0 ){
$t = mb_strlen($txt);
$desde = mb_strpos($txt,")",$desde);
for($n=$desde+1; $n<$t; $n++){
if( mb_substr($txt,$n,1)=="'" || mb_substr($txt,$n,1)=='"' ){
return $n;
}else if( mb_substr($txt,$n,1)==')' ){
return $n-1;
}
}
}else{
for($n=$desde-1; $n>0; $n--){
if( mb_substr($txt,$n,1)=="'" || mb_substr($txt,$n,1)=='"' ){
return $n;
}
}
}
return -1;
}
function _SustituyeGF($txt){
return;
if( eSubstrCount($txt, 'eGF(')==0 ){
return $txt;
}
global $_vF;
$i = mb_strpos($txt, 'eGF(');
do {
$x = mb_substr($txt, $i+4);
$deli = ltrim($x)[0];
$pi = mb_strpos($txt, $deli, $i);
$pf = mb_strpos($txt, $deli, $pi+1);
$iDeli = _DelimitadorGF($txt, $pi, -1);
$fDeli = _DelimitadorGF($txt, $pf,  1);
$old = mb_substr($txt, $iDeli, $fDeli-$iDeli+1);
$x = mb_substr($x, 1);
$x = mb_substr($x, 0, mb_strpos($x, $deli));
$txt = str_replace($old, $_vF[$x], $txt);
if( $i>=mb_strlen($txt) ){
return $txt;
}
$i = mb_strpos($txt, 'eGF(', $i+1);
} while($i>0);
return $txt;
}
?>