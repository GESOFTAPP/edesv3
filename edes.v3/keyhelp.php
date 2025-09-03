<?PHP
list(, $file) = explode("/", $_SERVER["QUERY_STRING"]);
if( mb_strpos($file, "_es.")!==false ){
$_SERVER['QUERY_STRING'] = '$a/g/key_help/'.$file;         // IMG src="edes.php?E:$icolng.php&amp;$a/g/key_help/avpag.jpg"
include(DIREDES."icolng.php");
}
$file = '$a/g/key_help/'.$file;
readfile(eScript($file));
eEnd();
?>