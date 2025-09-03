<?PHP
list(,$_Script_) = explode(':', $_SERVER['QUERY_STRING']);
list($_Script_) = explode("&", $_Script_);
SESS::$spider['opcion'] = "E";
if( !function_exists("__SpiderScript") ) include($Dir_."itm/spider.php");
$filePnt = str_replace(
array("_1.edf","../_tmp/log/"),
array("_0.pnt","../d/_spider/"),
$_Script_
);
$dim = file(eScript($filePnt));
SESS::$spider['file'] = array();
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])<>"" ){
list($md, $fl) = explode("=", $dim[$n]);
SESS::$spider['file'][$md] = trim($fl);
}
}
$_Sql = "spider";
?>