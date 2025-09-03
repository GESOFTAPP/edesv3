<?PHP
if( $GLOBALS['_gsID']!=getmypid() ) exit;
global $Dir_, $_Sql, $_User, $_Node, $_Connection_, $_Tree;
if( $_Sql=='' ){
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
S::qQuery("update {$_ENV['eDesDictionary']}gs_conexion set cdi_fin='".date('Y-m-d H:i:s')."' where conexion='".SESS::$_Connection_."'");
eInit();
echo '<script type="text/javascript">top.Terminar();</script>';
eEnd();
?>