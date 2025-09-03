<?PHP
function eFileToLog($eFile, $_TReg, $Password, $Path){
global $_TITLETOEXTRACT, $_Connection_, $OriFichero;
global $_User, $_Node, $_SubMode, $Extension, $_TITLE, $_DBTABLE;
$TipoFile = mb_strtolower(mb_substr($eFile,-3));
if( SETUP::$LogHistory['LogGsAccessFile']=='' ){
$sTitle = eEntityEncode($_TITLE, false);
list($sTable) = explode(" ", trim($_DBTABLE));
$sTable = trim($sTable);
$Extension = mb_strtolower($Extension);
if( $sTitle[0]=="=" ) $sTitle = trim(mb_substr($sTitle,1));
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_log_file (cdi, type_file, script, records, cd_gs_node, cd_gs_user, title, nm_table) values('".date('Y-m-d H:i:s')."', '{$Extension}','{$OriFichero}', '{$_TReg}', '{$_Node}', '{$_User}', '{$sTitle}', '{$sTable}')");
$SerialDOC = S::qId();
}else{
$SerialDOC = 't_'.time();
}
if( $Path!='' ){
if( mb_substr($Path,-1)!='/' ) $Path .= '/';
if( $TipoFile!="zip" ){
$Dir = eGetCWD();
$pass = "";
if( $Password<>"" ){
$pass = " -P ".gzuncompress(base64_decode(mb_substr($Password,3)));
}
if( LINUX_OS ){
$ExeZip = "zip";
}else{
$ExeZip = eScript('$win/zip.exe');
}
$ExeZip .= "{$pass} -9 -j -b {$Dir} ".eScript($Path).$SerialDOC." ".eScript($eFile);
$Dim = array();
exec($ExeZip, $Dim);
}else{
copy(eScript($eFile), eScript($Path).$SerialDOC.'.'.$TipoFile);
}
}
if( SETUP::$LogHistory['LogGsAccessFile']!='' ){
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|".SESS::$_Connection_."|{$_SERVER['QUERY_STRING']}|".eScript($Path)."{$SerialDOC}.zip\n", 3, SETUP::$LogHistory['LogGsAccessFile']);
}
}
function _transformaClave($clave){
$str = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ1234567890";
$prefijo = "";
for($i=0; $i<3; $i++){
$prefijo .= mb_substr($str,rand(0,mb_strlen($str)-1),1);
}
$encodado = base64_encode(gzcompress($clave, 9));
while( mb_substr($encodado,-1)=="=" ) $encodado = mb_substr($encodado,0,-1);
$newClave = $prefijo.$encodado;
return $newClave;
}
?>