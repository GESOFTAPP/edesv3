<?PHP
$tmp = explode('/',str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']));
if( $tmp[count($tmp)-2]!='http' || eSubstrCount(str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']), '/edes.v3/edes.php')==1 ){
if( $_gsTron ) eTron('<01>');
die('ERROR: Ejecución no permitida');
}
if( $_gsTron ) eTron('Open:[t/ma.gs]');
_LoadSqlIni('_');
$_User = -1; $_Tree = -1; $_Node = -1; $_Connection_ = 0;
SESS::$_User = $_User;
S::$_User = SESS::$_User;
SESS::$_Node = $_Node;
SESS::$_Connection_ = $_Connection_;
SESS::$_Tree = $_Tree;
include($Dir_.'t/ma.gs');
exit;
?>