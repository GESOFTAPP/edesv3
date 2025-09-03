<?PHP
$triggerBackground = function(){
list($oUrl) = explode("&", $_SERVER["QUERY_STRING"]);
$n = 0;
$dim = [];
foreach($_GET as $key=>$value){
$n++;
if( $n==1 ){
$dim[$oUrl] = "";
continue;
}
$dim[$key] = $value;
}
$_GET = $dim;                                                           // echo "<pre>"; print_r($_GET); echo "</pre>"; exit;
unset($_GET["_RUNBACKGROUND"]);
$_ENV[SYS]['context'] = $_GET["_CONTEXT"];		                        //SYS::sessionClose();
S::runBackground();								                        //echo "<pre>"; print_r($_GET); echo "</pre>"; exit;
include(DIREDES."message.inc");
$lng = eLngLoad(DIREDES.'lng/texts', '*', 1);                           //echo "<pre>"; print_r($lng[SESS::$_LANGUAGE_][1]); echo "</pre>"; exit;
eMessage($lng[SESS::$_LANGUAGE_][1], "HS", 1, "<S.infoBackground();");
}
?>