<?PHP
$multiplePage = function(){
global $_MULTIPLEPAGE;
$_MULTIPLEPAGE = func_get_args();
include(DIREDES."iworkmulti.php");
eEnd();
}
?>