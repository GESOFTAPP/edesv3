<?PHP
include("edes.php");
exit;
if( $_SERVER["REDIRECT_STATUS"]!=404 && $_SERVER["REQUEST_METHOD"]!="GET" ){
exit;
}
$txt = $_SERVER["REDIRECT_URL"];
$p = mb_strrpos($txt, "/");
if( $p!==false ){
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
$tenan = trim(mb_substr($txt, $p+1));
$url = mb_substr($txt, 0, $p);
$domain = $_SERVER['SERVER_NAME'];
if( !preg_match('/\./u', $tenan) ){
if( isset($_GET['_SESS_']) ){
unset($_GET['_SESS_']);
}
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
include(DIREDES."{$_Sql}.inc");
$_ENV['eDesDictionary'] = $_SqlDiccionario;
qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (db_path=('{$tenan}'))");
$r = qArray();
if( trim($r["db_path"])!=$tenan ){
sleep(30);
exit;
}
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
die("Empresa de baja en el servicio desde ".$r["dt_delete"]);
}
foreach($r as $k=>$v) $r[$k] = trim($v);
$tmp = explode("/", $_SERVER["REDIRECT_URL"]);
$n = count($tmp)-1;
if( $n>2 && $tmp[$n]==$tmp[$n-1] ){
$url = str_replace("/".$tmp[$n]."/".$tmp[$n], "/".$tmp[$n], $_SERVER["REDIRECT_URL"]);
header("Location: {$url}");
exit;
}
include(DIREDES."edes.php");
}
}
}
?>