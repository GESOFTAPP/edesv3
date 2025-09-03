<?PHP
include("edes.php");
exit;
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
if( !defined('SYS')   ) define('SYS'  , '!' );
if( !defined('SETUP') ) define('SETUP', '.' );
if( !defined('DF') 	  ) define('DF'   , '_' );
$domain = $_SERVER['SERVER_NAME'];
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
include(DIREDES."{$_Sql}.inc");
qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (domain=('{$domain}'))");
$r = qArray();
$_ENV['eDesDictionary'] = $_SqlDiccionario;
if( isset($_GET['_SESS_']) ){
unset($_GET['_SESS_']);
}
if( trim($r["domain"])!=$domain ){
sleep(30);
exit;
}
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
die("Empresa de baja en el servicio desde ".$r["dt_delete"]);
}
foreach($r as $k=>$v) $r[$k] = trim($v);
include("edes.php");
}
?>
<script type="text/javascript">
location.href = location.href+"edes.php";
</script>