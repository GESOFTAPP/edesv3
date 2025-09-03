<?PHP
function __SpiderDDBB(){
global $_Sql, $_SqlPDOType;
$VersionPHP = file_get_contents(DIREDES."data/version");
$txt = file_get_contents(SESS::$spider['prefijo']."0.def");
$txt = str_replace("{#SQL#}", "{$_Sql}|{$_SqlPDOType}|{$VersionPHP}", $txt);
file_put_contents(SESS::$spider['prefijo']."0.def", $txt);
}
function __SpiderScript(&$File){
if( SESS::$spider['opcion']=='S' ){
if( SESS::$spider['pk']==0 ){
SETUP::$System['ContextActivate'] = false;
SESS::$spider['file'] = array();
$txt = str_replace($_SERVER["PHP_SELF"], "", $_SERVER["REQUEST_URI"])."\n".
":SYS\n{#SQL#}|".S::$_User."|".SESS::$_WebMaster."|".SESS::$_SystemUser."|".SESS::$_D_."|".$_SERVER["HTTP_REFERER"]."\n";
$txt .= ":GET\n"; foreach($_GET as $k=>$v) $txt .= $k.'='.$v."\n";
$txt .= ":POST\n"; foreach($_POST as $k=>$v) $txt .= $k.'='.$v."\n";
if( $txt[0]=="?" ) $txt = trim(mb_substr($txt,1));
file_put_contents(SESS::$spider['prefijo']."0.def", $txt);
}
eExplodeLast($File, ".", $xFile, $xExt);
$spider = SESS::$spider['prefijo'].(++SESS::$spider['pk']).".".$xExt;
error_log($File.' >>> '.$spider."\n", 3, SESS::$spider['prefijo']."0.dim");
file_put_contents($spider, file_get_contents($File));
}
return $File;
}
function __SpiderDataDef($result, $sql){
$pnt = (gettype($result)=="object" && $result->queryString)? $result->queryString : $result;
$spider = SESS::$spider['prefijo'].(++SESS::$spider['pk']).".dt";
SESS::$spider['file'][md5(serialize($pnt))] = $spider;
$sql = str_replace(array(CHR10,CHR13), array(" "," "), trim($sql));
error_log($spider.' >>> '.$sql."\n", 3, SESS::$spider['prefijo']."0.sql");
}
function __SpiderDataPut($puntero, $row){
if( $row ){
$pnt = (gettype($puntero)=="object" && $puntero->queryString)? $puntero->queryString : $puntero;
error_log(serialize($row)."\n", 3, SESS::$spider['file'][md5(serialize($pnt))]);
}
}
function __SpiderDataUnDef($sql){
$sql = str_replace(array(CHR10,CHR13), array(" "," "), trim($sql));
$md = md5(trim($sql));
SESS::$spider['line'][$md] = 0;
}
function __SpiderDataGet($sql){
$sql = str_replace(array(CHR10,CHR13), array(" "," "), trim($sql));
$md = md5(trim($sql));
$file = SESS::$spider['file'][$md];
$pk = SESS::$spider['line'][$md];
$datos = trim(file($file)[$pk]);
SESS::$spider['line'][$md]++;
return unserialize($datos);
}
function __SpiderSaveHtml($file){
file_put_contents(SESS::$spider['prefijo'].SESS::$spider['pk']."_0.htm", ob_get_contents());
}
if( $_GET["STOP"]=="SPIDER" ){
SESS::$spider = [];
die("delete top._Spider;");
}
?>