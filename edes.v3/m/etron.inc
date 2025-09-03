<?PHP
$user = '-1';
if( class_exists('SESS') ){
$user = S::$_User;
}
if( SYS::$fileToTron!=null ){
$user = SYS::$fileToTron;
}
if( $_SERVER['PHP_SELF']=='/edes.v3/http/edes.php' ){
$NomFile = $GLOBALS["Dir_"]."web/edesweb/_tmp/__tron.{$user}";
}else{
$NomFile = mb_substr($_SERVER['SCRIPT_FILENAME'], 0, mb_strrpos($_SERVER['SCRIPT_FILENAME'], '/'));
$NomFile = mb_substr($NomFile, 0, mb_strrpos($NomFile, '/'))."/_tmp/__tron.{$user}";
}
if( preg_match('/SQL/iu', $borrar) ){
$NomFile = str_replace('/_tmp/__tron.', '/_tmp/log/sql.', $NomFile);
}
if( $para==null ){
@unlink($NomFile);
error_log("Clear log ".date('Y-m-d H:i:s')."\n", 3, $NomFile);
return;
}
if( gettype($para)!="array" ) $para = array($para);
for($n=0; $n<count($para); $n++){
$txt = $para[$n];
if( $caja ) $txt = '['.$txt.']';
error_log("{$txt}\n", 3, $NomFile);
}
?>