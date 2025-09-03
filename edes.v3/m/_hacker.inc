<?PHP
$dim = array();
$dim[] = date('Y-m-d H:i:s').' [Hacker]';
$dim[] = "ERROR.......: {$mesagge}";
$dim[] = "USER........: ".S::$_User;
$dim[] = "QUERY_STRING: ".$_SERVER['QUERY_STRING'];
$dim[] = "REQUEST_URI.: ".$_SERVER['REQUEST_URI'];
$dim[] = "HTTP_REFERER: ".$_SERVER['HTTP_REFERER'];
$dim[] = "REMOTE_ADDR.: ".$_SERVER['REMOTE_ADDR'];
$txt = implode("\r\n\t", $dim);
eErrorToFile($txt);
if( $salir ){
eInit();
sleep(7);
exit;
}
?>