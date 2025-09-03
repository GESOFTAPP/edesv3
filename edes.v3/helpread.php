<?PHP
if( mb_substr($_POST["file"],-8,-2)==".mark_" ){
$_POST["file"] = mb_substr($_POST["file"],0,-8).mb_substr($_POST["file"],-3);
}
if( $_POST["file"][0]=="$" ){
$_POST["file"] = DIREDES."lng/help/".mb_substr($_POST["file"],1);
}else{
$_POST["file"] = "../help/doc/".$_POST["file"];
}
if( file_exists($_POST["file"]) ){
}else if( file_exists($_POST["file"]."_".SESS::$_LANGUAGE_) ){
$_POST["file"] .= "_".SESS::$_LANGUAGE_;
}else if( !file_exists($_POST["file"]) ){
$_POST["file"] = mb_substr($_POST["file"],0 ,-2).SESS::$_LanguageDefault;
}
readfile($_POST["file"]);
?>