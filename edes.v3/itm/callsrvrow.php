<?PHP
function _eCallSrvRow($file){
eInit();
list($desde, $hasta) = explode(",", $_GET["_CALLSRVROW"]);
if( $desde==1 ) SESS::$tmp['_CALLSRVROW'] = array();
if( $file!="" ) SESS::$tmp['_CALLSRVROW'][] = $file;
if( $desde==$hasta ){
if( SESS::$tmp['CALLSRVROW'][3]!="" ){
$dim = array();
for($n=0; $n<count(SESS::$tmp['_CALLSRVROW']); $n++){
$dim[] = SESS::$tmp['_CALLSRVROW'][$n];
}
if( count($dim)>0 ) eZipFile("../_tmp/php/callsrv_".S::$_User.".zip", $dim);
}
echo "<script>";
echo "top.S.modalDelete(window.frameElement.WOPENER); top.S.progressUpload();";
if( SESS::$tmp['CALLSRVROW'][3]!="" ){
if( count($dim)>0 ){
echo "top.eCallSrv(window, 'edes.php?D:/_tmp/php/callsrv_".S::$_User.".zip&FILE=".SESS::$tmp['CALLSRVROW'][3]."');";
}else{
echo "top.S.info('No hay ningún archivo para descargar', -1);";
}
}else{
echo "top.S.info('PROCESO TERMINADO', -1);";
}
echo "</script>";
}else{
echo "<script>";
echo "window.frameElement.WOPENER.".SESS::$tmp['CALLSRVROW'][1]."({$desde});";
echo "</script>";
}
eEnd();
}
?>