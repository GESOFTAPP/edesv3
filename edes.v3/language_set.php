<?PHP
if( $_GET["_LANG"]!="" ){
SESS::$_LANGUAGE_ = $_GET["_LANG"];
}
$file = eScript($_JSINCLUDEFILE);
if( file_exists($file) ) @unlink($file);
if( $_GET["_LANG"]!="" ){
echo "top._FIELDS=[]; if(top.S('#eIDIOMA').length)top._setLanguage('".SESS::$_LANGUAGE_."');";
qQuery("update {$_ENV['eDesDictionary']}gs_user set cd_gs_language='{$_GET['_LANG']}' where cd_gs_user='{$_ENV['user']}'");
}else{
error_log("top._FIELDS=[]; if(top.S('#eIDIOMA').length)top._setLanguage('".SESS::$_LANGUAGE_."');", 3, $file);
}
setCookie("e-language", SESS::$_LANGUAGE_, time()+(86400*365));
echo "if( top.S('HTML').length ){";
echo "top.S('HTML').attr('lang', '".SESS::$_LANGUAGE_."');";
echo "}";
$campo = "text_".SESS::$_LANGUAGE_;
qQuery("select * from {$_ENV['eDesDictionary']}gs_storage where type_storage='x' order by cdi");
while($r=qArray()){
$text = addslashes($r[$campo]);
if( $text=="" ) $text = addslashes($r["text_es"]);
$text = str_replace(array(CHR10, CHR13), array("&#0A;", "&#0D;"), $text);
if( $_GET["_LANG"]!="" ){
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
}else{
error_log("localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');", 3, $file);
}
}
if( $_GET["_LANG"]!="" ){
echo "localStorage.setItem('e-language', '".SESS::$_LANGUAGE_."');";
}else{
error_log("localStorage.setItem('e-language', '".SESS::$_LANGUAGE_."');", 3, $file);
}
if( $_GET["_LANG"]!="" ){
$idioma = qRecord("select * from {$_ENV['eDesDictionary']}gs_language where tf_translation='{$_ENV['ON']}' and cd_gs_language='".SESS::$_LANGUAGE_."'")['nm_gs_language'];
echo "top.S.setup.language = '_".SESS::$_LANGUAGE_."';";
echo "top.S.info(top.S.lng(302, '<b>{$idioma}</b>'));";
eEnd();
}
?>