<?PHP
function _PedirLogin_(){
eInit();
echo '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"></HEAD><BODY><SCRIPT type="text/javascript">';
echo "setTimeout(function(){top.location.href='".SESS::$_DIRWEB."';}, 100);";
echo '</SCRIPT></BODY></HTML>';
eSessionClose(12);
exit;
eEnd();
}
function _getURL($s, $use_forwarded_host=false){
$ssl = (!empty($s['HTTPS']) && $s['HTTPS']=='on')? true : false;
$sp = mb_strtolower($s['SERVER_PROTOCOL']);
$protocol = mb_substr($sp, 0, mb_strpos($sp, '/')).(($ssl)? "s" : "");
$port = $s['SERVER_PORT'];
$port = ((! $ssl && $port=='80') || ($ssl && $port=='443'))? "" : ":".$port;
$host = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST']))? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
$host = isset($host) ? $host : $s['SERVER_NAME'].$port;
return $protocol.'://'.$host.$s['REQUEST_URI'];
}
?>