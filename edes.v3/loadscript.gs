<?PHP
if( S::$_User==-1 ){
include( 'index.html' );
exit;
}
include(DIREDES.mb_strtolower($_GET['ScriptJS']).'.js');
?>