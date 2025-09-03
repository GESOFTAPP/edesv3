<?PHP
if( $_SERVER["QUERY_STRING"][0]=="~" ){
list($txt) = explode("&_CONTEXT=", $_SERVER["QUERY_STRING"]);
if( mb_strlen($txt)==64 && $txt[0]=="~" && mb_substr($txt,-1)=="~" ){
if( file_exists("../_datos/config/".mb_substr($txt,1,-1).".edes") ){
$tmp = explode('/', eGetCWD());
die(file_get_contents(DIREDES."web/aplication/_datos/config/version_edes.cdi")." > ".$tmp[count($tmp)-2]);
}
}
}
exit;
?>