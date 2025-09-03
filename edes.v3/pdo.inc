<?PHP
if( !function_exists("ePassword") ){
function ePassword($pass){
if( mb_strlen($pass)>25 ){
$igual = 4-(mb_strlen($pass)-8)%4;
if( $igual>3 ) $igual = 0;
$xPass = $pass . str_repeat("=", $igual);
$crc = str_pad(dechex(crc32(mb_substr($xPass, 8))), 8, "0", STR_PAD_LEFT);
if( mb_substr($xPass,0,8)==$crc ){
$pass = mb_substr(gzuncompress(base64_decode(mb_substr($xPass, 8))), 5);
}
}
return $pass;
}
}
$_PathCurrent = str_replace('\\','/',getCWD());
$_PathCurrent = mb_substr($_PathCurrent,mb_strrpos($_PathCurrent,'/')+1);
if( $_PathCurrent=='cron' ){
define('DIREDES', __DIR__.'/');
}
function qSelect( $Tabla, $Campos, $Condicion='', $Ordenacion='', &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() < 5 ){
sql_Busca( $Tabla, $Campos, $Condicion, $Ordenacion );
}else{
sql_Busca( $Tabla, $Campos, $Condicion, $Ordenacion, $Puntero );
}
}
function qQuery( $sql, &$Puntero, $Continuar=false ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() == 1 ){
return sql_Query( $sql );
}else if( func_num_args() == 2 ){
return sql_Query( $sql, $Puntero );
}else{
return sql_Query( $sql, $Puntero, $Continuar );
}
}
function qCount( $Tabla, $Condicion, &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() == 2 ){
return sql_Cuenta( $Tabla, $Condicion );
}else{
return sql_Cuenta( $Tabla, $Condicion, $Puntero );
}
}
function qRow( $Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() == 0 ){
return sql_Fila();
}else{
return sql_Fila( $Puntero );
}
}
function qArray( $Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() == 0 ){
return sql_Array();
}else{
return sql_Array( $Puntero );
}
}
function qFree( &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( func_num_args() == 0 ){
return sql_Libera();
}else{
return sql_Libera( $Puntero );
}
}
function qEnd(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
sql_Desconecta();
}
function qConnect(){
sql_Conecta();
}
function qRecord($sql, $arrayNum=false, $all=false){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
qQuery($sql, $_Puntero_);
if( $all ){
$dim = array();
while( $r=(($arrayNum)? qRow($_Puntero_) : qArray($_Puntero_)) ) $dim[] = $r;
return $dim;
}
return (($arrayNum)? qRow($_Puntero_) : qArray($_Puntero_));
}
function qId($Tabla=''){
if( $Tabla!='' ) return $GLOBALS['_IdRegistro'][$Tabla];
return sql_Id();
}
function qQueryLog( $sql, $xTabla, $xWhere, $xClave='', $xUser='' ){
global $_DEBUG, $_IdRegistro;
if( $xUser=='' ) $xUser = S::$_User;
if( preg_match("/^UPDATE/iu",trim($sql)) ){
qQuery( "select * from {$xTabla} where {$xWhere}", $P1 ); $Old = qArray( $P1 );
$Alta = false;
$xOp = 'M';
}else{
$Alta = true;
$xOp = 'A';
$xIdRegistro = $_IdRegistro[$xTabla];
}
qQuery( $sql );
if( $Alta && $xClave=='' ){
$xClave = $_IdRegistro[$xTabla];
$xWhere .= $xClave;
}
qQuery( "select * from {$xTabla} where {$xWhere}", $P2 ); $New = qArray( $P2 );
$Log = '';
foreach( $New as $key=>$val ) if( !is_numeric($key) ){
if( ($Alta && $val!='') || (!$Alta && $val!=$Old[$key]) ){
if( $Log!='' ) $Log .= ',';
$Log .= $key.'="'.str_replace( '"', '&#34;', str_replace( "'", '&#39;', $val )).'"';
}
}
if( $Log!='' ){
qQuery("insert into {$_ENV['eDesDictionary']}gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ('".date('Y-m-d H:i:s')."', '".$xOp."', '".$xUser."', '".$xTabla."', '".$xClave."', '".$Log."')");
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
}
function qGetArray( $sql ){
$Dim = array();
qQuery( $sql, $_p1 );
while( $r=qRow($_p1) ) $Dim[$r[0]] = $r;
return $Dim;
}
function sql_Conecta(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_HndDB, $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit, $_SqlTransaction, $_SqlPDOConnect;
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
if( $_HndDB!='' ) return;
if( $_DEBUG==4 ){
eLogDebug("[ SQL:{$_SqlDiccionario} ]");
if( $GLOBALS['_DEBUGPARAMETERS'] ){
$FileInfo = '../_tmp/log/sql.'.S::$_User;
$Espacio  = '               ';
$Espacio2 = '        ';
error_log( $Espacio2."argv\n", 3, $FileInfo );
foreach( $argv as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_SERVER\n", 3, $FileInfo );
foreach( $_SERVER as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_ENV\n", 3, $FileInfo );
foreach( $_ENV as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_GLOBALS\n", 3, $FileInfo );
foreach( $_GLOBALS as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_GET\n", 3, $FileInfo );
foreach( $_GET as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_POST\n", 3, $FileInfo );
foreach( $_POST as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_FILE\n", 3, $FileInfo );
foreach( $_FILE as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
error_log( $Espacio2."_REQUEST\n", 3, $FileInfo );
foreach( $_REQUEST as $k=>$v ) error_log( $Espacio.$k.': '.$v."\n", 3, $FileInfo );
}
}
if( $_DEBUG==1 ) eTrace("Conecta[Sql: {$_Sql} | HostName: {$_SqlHostName} | Usuario: {$_SqlUsuario} | Password: {$_SqlPassword} | Diccionario: {$_SqlDiccionario}]");
putenv("INFORMIXDIR=/opt/informix");
putenv("PATH=".getenv("PATH").":$INFORMIXDIR/bin");
putenv("LD_LIBRARY_PATH=$INFORMIXDIR/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/cli");
putenv("INFORMIXSERVER={$_SqlHostName}");
putenv("GL_DATE=%Y-%m-%d");
putenv("DBDATE=YMD4-");
try{
if( $_DEBUG==1 ) eTrace( $_SqlPDOConnect.' | '.$_SqlUsuario.' | '.$_SqlPassword );
if( $_DEBUG==4 ) eLogDebug(" > Ini");
$_SqlHostName = ePassword($_SqlHostName);
$_SqlDiccionario = ePassword($_SqlDiccionario);
$Pass = ePassword($_SqlPassword);
$_SqlUsuario = ePassword($_SqlUsuario);
$_HndDB = new PDO($_SqlPDOConnect, $_SqlUsuario, $Pass);
if( $_DEBUG==4 ) eLogDebug(" > Connet");
$_HndDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$_HndDB->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
$_HndDB->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING);
$_HndDB->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, true);
$GLOBALS["_SqlStart"] = true;
}catch( PDOException $e ){
eTrace("ERROR connecting to DDBB");
eTron('ERROR al conectar con DB ('.$e->getMessage().')');
eEnd();
}
$_HndDB->cursorType			 = PDO::CURSOR_SCROLL;
$_HndDB->cursorOrientation	 = PDO::FETCH_ORI_NEXT;
if( $_SqlTransaction=='' ) $_SqlTransaction = false;
if( $_SqlTransaction ) sql_TranOn();
if( $_DEBUG==4 ) eLogDebug(" > End");
for( $n=0; $n<count($_SqlInit); $n++ ){
if( $_SqlInit[$n]=="<" ){
qRow($p);
}else{
sql_Query($_SqlInit[$n], $p, true);
}
}
if( SESS::$spider['opcion']=='S' ) __SpiderDDBB();
}
function sql_Busca( $Tabla, $Campos, $Condicion='', $Ordenacion='', &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_Result, $_HndDB, $_DEBUG, $_DBLIMIT, $_SQL_, $_DBADDFILTER;
$Condicion = trim($Condicion);
$Limit = '';
if( !empty($Ordenacion) ){
if( eSubstrCount ( $Ordenacion, ' group by ' ) > 0 ){
$tmp = explode(' group by ', $Ordenacion );
$Ordenacion = ' group by '.$tmp[1]. ' order by '.$tmp[0];
}else{
$Ordenacion = 'order by '.$Ordenacion;
}
}
if( !empty($_DBLIMIT)  ) $Limit     = 'limit '.$_DBLIMIT;
if( !empty($Condicion) ){
$sql = "select {$Campos} from {$Tabla} where ({$Condicion}) {$Ordenacion}";
$_SQL_ = "select {$Campos} from {$Tabla} where {$Condicion} {$Ordenacion}";
}else{
$sql = "select {$Campos} from {$Tabla} {$Ordenacion}";
$_SQL_ = $sql;
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Busca[{$sql}]");
_SlowSqlWarning();
if( func_num_args() < 5 ){
try{
$_Result = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' ) __SpiderDataDef($_Result, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
}else{
try{
$Puntero = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' ) __SpiderDataDef($Puntero, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
}
_SlowSqlWarning($sql);
}
function sql_Inserta($Tabla, $Campos, $Valores, $Serial='', $blobs=null){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_Result, $_TReg, $_IdInsert, $_DEBUG, $_HndDB, $_IdRegistro, $_DBMemoTable, $_MemoContenido, $_SqlPDOType, $_DBMEMO;
if( $_SqlPDOType=='informix' && $Tabla==$_DBMemoTable && $blobs==null && count($_MemoContenido)>0 ){
$sql = "insert into {$Tabla} ({$Campos}) values ({$Valores})";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Inserta[{$sql}]");
try{
$pnt = $_HndDB->prepare( $sql );
foreach($_MemoContenido as $k=>$v) $pnt->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$_Result = $pnt->execute();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
array_push($_IdInsert, array(trim($Tabla), sql_Id()));
$_IdRegistro[trim($Tabla)] = sql_Id();
}elseif( $_SqlPDOType=='informix' && $blobs!=null ){
try{
$pnt = $_HndDB->prepare( $sql );
foreach($blobs as $k=>$v)
$pnt->bindParam(($k*1+1), $blobs[$k], PDO::PARAM_STR);
$_Result=$pnt->execute();
}catch( PDOException $e){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
array_push( $_IdInsert, array( trim($Tabla), sql_Id() ) );
$_IdRegistro[trim($Tabla)] = sql_Id();
}else{
$sql = "insert into {$Tabla} ({$Campos}) values ({$Valores})";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Inserta[{$sql}]");
try{
$pnt = $_HndDB->prepare( $sql );
$_Result = $pnt->execute();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
array_push( $_IdInsert, array( trim($Tabla), sql_Id() ) );
$_IdRegistro[trim($Tabla)] = sql_Id();
}
}
function sql_Modifica($Tabla, $Grabar, $Condicion, $blobs=null){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_Result, $_TReg, $_DEBUG, $_HndDB, $_DBMemoTable, $_MemoContenido, $_SqlPDOType, $_DBMEMO, $DimNomVar;
if( !empty($Condicion) ) $Condicion = 'where ('.$Condicion.')';
if( $_SqlPDOType=='informix' && $Tabla==$_DBMemoTable && count($_MemoContenido)>0 ){
$ix=0;
for($n=0; $n<count($DimNomVar); $n++ ){
if( $_DBMEMO[$DimNomVar[$n]]!=1 ) continue;
$r = $DimNomVar[$n].'="'. $_MemoContenido[$ix].'"';
$ix++;
$Grabar = str_replace($r, $DimNomVar[$n].'=?', $Grabar);
}
$sql = "update {$Tabla} set {$Grabar} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Modifica[$sql]");
try{
$pnt = $_HndDB->prepare( $sql );
foreach($_MemoContenido as $k=>$v) $pnt->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$_Result = $pnt->execute();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error($sql, $e);
}
}elseif( $_SqlPDOType=='informix' && $blobs!=null ){
$sql = "update {$Tabla} set {$Grabar} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Modifica[$sql]");
try{
$pnt = $_HndDB->prepare( $sql );
foreach($blobs as $k=>$v)	$pnt->bindParam(($k*1+1), $blobs[$k], PDO::PARAM_STR);
$_Result=$pnt->execute();
}catch( PDOException $e){
if( $_DEBUG==30 ) return -1;
sql_Error($sql, $e);
}
}else{
$sql = "update {$Tabla} set {$Grabar} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Modifica[$sql]");
try{
$pnt = $_HndDB->prepare( $sql );
$_Result = $pnt->execute();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error($sql, $e);
}
}
}
function sql_Borra( $Tabla, $Condicion ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_Result, $_TReg, $_DEBUG, $_HndDB;
if( !empty($Condicion)  ) $Condicion = 'where ('.$Condicion.')';
$sql = "delete from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Borra[$sql]");
try{
$_Result = $_HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
}
function sql_Libera( &$puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_MemoContenido;
$_MemoContenido = array();
if( $_DEBUG==1 ) eTrace( "Libera[]" );
if( func_num_args() == 0 ){
$GLOBALS['_Result'] = null;
}else{
$puntero = null;
}
}
function sql_Desconecta(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_HndDB, $_DEBUG, $_SqlTransaction;
if( $_DEBUG==4 ) eLogDebug("[Desconectado]");
if( $_SqlTransaction ) sql_TranOff();
if( $_DEBUG==1 ) eTrace("Desconecta[Desconectado]");
$_HndDB = null;
}
$NumSqlError_ = false;
function sql_Error( $sql='', $e=null ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_User, $_Node, $NumSqlError_, $_DEBUG, $_ErrReportTo, $_ErrReportToDev, $_HndDB, $_MemoContenido, $_ErrReportUserNode;
global $_ErrReportMessage, $_ErrReportFrom, $_ErrReportCc, $_ErrReportBCc, $_SqlPDOType;
if( $_DEBUG==1 ) eTrace( "Error[]" );
if( $_DEBUG==-1 ){
if( $e!=null ){
eTrace( 'ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]' );
}else{
eTrace( 'ERROR:[ '.$sql.' ]' );
}
}
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$e->getCode().' : '.$e->getMessage()." ]");
if( $GLOBALS['php_errormsg'] == 'parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
if( $e!=null ){
$TxtError = qErrorFile(trim($e->getCode()).' : '.trim($e->getMessage()), $sql, $pkError);
}else{
$TxtError = qErrorFile("Error", $sql, $pkError);
}
$cd = "";
if( $_ErrReportToDev!='' && (in_array( 'u'.$_User, $_ErrReportUserNode ) || in_array( 'n'.$_Node, $_ErrReportUserNode )) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
mail($_ErrReportToDev, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}else if( $_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
if( $_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$_ErrReportFrom."\r\n";
if( $_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$_ErrReportCc."\r\n";
if( $_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail($_ErrReportTo, $_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}
eInit();
_ShowCallSrv();
if( SESS::$_Development || SESS::$_D_!='' ){
$Dim = debug_backtrace();
for( $n=0; $n<count($Dim); $n++ ) $Dim[$n]['file'] = str_replace( '\\', '/', $Dim[$n]['file'] );
$EsBarra = 0;
$EsIgual = true;
$nPrefijo = 0;
while( $EsIgual ){
for( $n=1; $n<count($Dim); $n++ ){
if( mb_substr($Dim[$n]['file'],$nPrefijo,1)!=mb_substr($Dim[0]['file'],$nPrefijo,1) ){
$EsIgual = false;
$nPrefijo--;
break;
}else{
if( mb_substr($Dim[0]['file'],$nPrefijo,1)=='/' ) $EsBarra = $nPrefijo;
}
}
$nPrefijo++;
}
$nPrefijo = $EsBarra;
$SQLError = 'Objeto[ '.$GLOBALS['_gsObjeto'].' ]';
eTrace('[SCRIPT]'); eTrace( $GLOBALS['OriFichero'] );
echo '<hr>'; eTrace('[SQL]'); eTrace($sql); eTrace('[ERROR]'); eTrace( $TxtError );
if( $e!=null ){
eTrace( 'ErrorCode[ '.$e->getCode().' ]' );
eTrace( 'ErrorMessage[ '.$e->getMessage().' ]' );
}
echo '<hr>'; eTrace('[_GET]' ); foreach( $_GET  as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>'; eTrace('[_POST]'); foreach( $_POST as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>';
if( SESS::$_D_=='~' ){
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre><hr>';
}
if( function_exists('KeyEditFile') ) KeyEditFile( $GLOBALS['OriFichero'] );
echo '<pre>';
for( $n=0; $n<count($Dim); $n++ ){
if( (eSubstrCount($Dim[$n]['file'],'/edes.v3/')==0 && eSubstrCount($Dim[$n]['file'],'/http/edes.php')==0 ) || SESS::$_D_=='~' ){
echo mb_substr($Dim[$n]['file'],$nPrefijo).':'.$Dim[$n]['line'];
echo '<br>';
echo '   '.$Dim[$n]['function'].'(';
if( is_array( $Dim[$n]['args'] ) ){
echo '<br>';
for( $i=0; $i<count($Dim[$n]['args']); $i++ ){
echo '      '.$i.': '.str_replace("\n","\n         ",$Dim[$n]['args'][$i]).'<br>';
}
}
echo '   )';
echo '<br>';
}
}
echo '</pre>';
if( SESS::$_D_=='~' ){
global $_DimDebug;
echo "\n<div>";
for( $i=0; $i<count($_DimDebug); $i++ ){
if( mb_substr($_DimDebug[$i],0,3) == '[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1 solid #00009C;"><A HREF="javascript:{}">'; //echo '</div><BR>'.'<div><A HREF="javascript:{}">';
eTrace( $_DimDebug[$i] );
echo '</A>';
}else{
eTrace( $_DimDebug[$i], 1 );
}
}
echo '</div>';
}
}else{
if($ScriptSys){
eTrace('[SQL]');eTrace($sql.'<br>');eTrace('[ERROR]');eTrace($TxtError);
}else eTrace('[ ERROR SQL ]');
echo '<script type="text/javascript">top.eLoading(false,window);if(top.eIsWindow(window))top.eSWView(window);</SCRIPT>';
}
if( $NumSqlError_ ) eEnd();
$NumSqlError_ = true;
if( eSubstrCount( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sqlError = "insert into {$_ENV['eDesDictionary']}gs_error (   cdi  ,cd_gs_user,tipo, desde,       fichero             , linea,texto, trace) values ".
"('{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  , ''  ,   ?  )";
switch( SESS::$sql['driver'] ){
case 'mysql':
include_once(DIREDES.'mysql.class.inc');
$db = new eMySql();
break;
case 'mysqli':
include_once(DIREDES.'mysqli.class.inc');
$db = new eMySqli();
break;
case 'informix':
include_once(DIREDES.'informix.class.inc');
$db = new eInformix();
break;
case 'oracle':
include_once(DIREDES.'oracle.class.inc');
$db = new eOracle();
break;
case 'pdo':
include_once(DIREDES.'pdo.class.inc');
$db = new ePdo();
break;
}
$db->qConnect('sql');
$db->qQueryMemo($sqlError, "pdo/{$_SqlPDOType}: "."{$TxtError}\n\n{$sql}");
$db->qEnd();
eEnd();
}
function sql_Query($sql, &$Puntero, $Continuar=false){
$sql = trim($sql);
if( isset($GLOBALS['_CheckFieldInWhere']) ){
$xSql = eStrtr(mb_strtolower($sql),CHR10.CHR13.mb_chr(9),'   ');
list(,$Tabla) = explode(' from ',$xSql);
list($Tabla) = explode(' ',trim($Tabla));
if( preg_match("/^select /iu", $sql) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".$GLOBALS['_CheckFieldInWhere']."/iu", $xSql) ){
eEnd('select "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}else if( preg_match("/^insert /iu", $sql) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".mb_substr($GLOBALS['_CheckFieldInWhere'],0,-1)."/iu", $xSql) ){
eEnd('Insert "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}
}
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_Result, $_TReg, $_DEBUG, $_HndDB, $_SQL_, $_DBMemoTable, $_MemoContenido;
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Query[{$sql}]");
$_TReg = -1;
_SlowSqlWarning();
if( func_num_args()==1 ){
try{
$_Result = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' && !preg_match("/set/iu", $sql) ) __SpiderDataDef($_Result, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
}else{
try{
$Puntero = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' && !preg_match("/set/iu", $sql) ) __SpiderDataDef($Puntero, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
}
_SlowSqlWarning($sql);
if( mb_strtoupper(mb_substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = trim($tmp[2]);
global $_IdInsert, $_IdRegistro;
array_push($_IdInsert, array($Tabla, sql_Id()));
$_IdRegistro[$Tabla] = sql_Id();
}else if( mb_substr($sql,0,6)=='select' ) $_SQL_ = $sql;
}
function sql_Cuenta( $Tabla, $Condicion, &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_HndDB, $_Result, $_TReg, $_DEBUG;
if( trim($Condicion)!='' ){
$Condicion = 'where ('.$Condicion.')';
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Cuenta[{$sql}]");
_SlowSqlWarning();
if( func_num_args() < 3 ){
try{
$_HndDB->cursorType = PDO::CURSOR_FWDONLY;
$_Result = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' ) __SpiderDataDef($_Result, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
list( $_TReg ) = $_Result->fetch(PDO::FETCH_NUM);
}else{
try{
$Puntero = $_HndDB->query( $sql );
if( SESS::$spider['opcion']=='S' ) __SpiderDataDef($Puntero, $sql);
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql, $e );
}
list( $_TReg ) = $Puntero->fetch(PDO::FETCH_NUM);
}
_SlowSqlWarning($sql);
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$_TReg}]" );
return $_TReg;
}
function sql_Fila( &$Puntero ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_Result;
if( $_DEBUG==1 ) eTrace("Fila[]");
if( func_num_args()==0 ){
$r = $_Result->fetch(PDO::FETCH_NUM);
}else{
$r = $Puntero->fetch(PDO::FETCH_NUM);
}
foreach($r as $k=>$v){
if( mb_strlen($v)==10 && mb_substr($v,4,1)=='-' && mb_substr($v,7,1)=='-' ){
$r[$k] = mb_substr($v,8,2).'-'.mb_substr($v,5,2).'-'.mb_substr($v,0,4);
}
}
if( SESS::$spider['opcion']=='S' ){
if( func_num_args()==0 ){
__SpiderDataPut($GLOBALS['_Result'], $r);
}else{
__SpiderDataPut($Puntero, $r);
}
}
return $r;
}
function sql_Array($Puntero){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_Result, $_HndDB;
if( $_DEBUG==1 ) eTrace( "Array[]" );
if( func_num_args()==0 ){
$r = $_Result->fetch(PDO::FETCH_ASSOC, $_HndDB->cursorOrientation);
}else{
$r = $Puntero->fetch(PDO::FETCH_ASSOC, $_HndDB->cursorOrientation);
}
foreach($r as $k=>$v){
if( mb_strlen($v)==10 && mb_substr($v,4,1)=='-' && mb_substr($v,7,1)=='-' ){
$r[$k] = mb_substr($v,8,2).'-'.mb_substr($v,5,2).'-'.mb_substr($v,0,4);
}
}
return $r;
}
function sql_Id($Tabla=""){
if( $Tabla!="" ) return $GLOBALS['_IdRegistro'][$Tabla];
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_HndDB, $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Id[]" );
return $_HndDB->lastInsertId();
}
function sql_getColumnMeta(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_HndDB, $_Result, $_DEBUG;
if( $_DEBUG==1 ) eTrace( "getColumnMeta[]" );
foreach( range( 0, $_Result->columnCount() - 1 ) as $column_index ){
$meta[] = $_Result->getColumnMeta($column_index);
}
return $meta;
}
function sql_getColumnMetaEx(){
$r = sql_getColumnMeta();
$meta = array();
foreach( $r as $index=>$arrai ){
$meta[ $arrai['name'] ]= array();
foreach( $arrai as $k1=>$v1 ){
$meta[ $arrai['name'] ][$k1] = $v1;
}
}
return $meta;
}
function sql_TotalCampos(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "TotalCampos[]" );
return mysqli_num_fields( $GLOBALS['_Result'] );
}
function sql_Bloquea(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
function sql_Desbloquea(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
function sql_TranOn(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_HndDB, $_Result, $_SqlTransaction;
if( !$_SqlTransaction ) return;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
try{
$_HndDB->beginTransaction();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( 'START TRANSACTION', $e );
}
}
function sql_TranOff(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_HndDB, $_Result, $_SqlTransaction;
if( !$_SqlTransaction ) return;
if( $_DEBUG==4 ) eLogDebug("ROLLBACK");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
try{
$_HndDB->rollback();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( 'ROLLBACK', $e );
}
}
function sql_TranBack(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG, $_HndDB, $_Result;
if( $_DEBUG==4 ) eLogDebug("COMMIT");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
try{
$_HndDB->rollback();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
sql_Error( 'ROLLBACK', $e );
}
}
function sql_Log($Log, $sOpe, $sTabla, $sSql, $xClave=''){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_SqlPDOType, $_DEBUG, $_HndDB, $_Result, $_TReg, $_User, $_DBSERIAL;
if( $xClave!='' ){
$sClave = $xClave;
}else{
$sClave = '';
for($n=0; $n<count($Log); $n++){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[$Log[$n]];
}
}
}
if( $_SqlPDOType=="informix" ){
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", ?)';
}else{
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", "'.str_replace('"',"'",trim(stripslashes( $sSql ))).'")';
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log[{$sql}]");
try{
if( $_SqlPDOType=="informix" ){
$_MemoContenido = array();
$_MemoContenido[] = str_replace('"',"'",trim(stripslashes( $sSql )));
$p = $_HndDB->prepare($sql);
foreach($_MemoContenido as $k=>$v) $p->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$p->execute();
}else{
$p = $_HndDB->query($sql);
}
}catch(PDOException $e){
if( $_DEBUG==30 ) return -1;
sql_Error($sql, $e);
}
if(!$p ) sql_Error($sql);
}
function sql_Informa($sql, &$DimCondicion, &$TxtOrdenacion, $_PDFTH, $_Form, $_TIPTH, $_sGRID=null){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_PDFLABELHIDDEN, $_RELATIONFIELDS, $_gs_formato_, $PDF_TxtOrderBy, $_PDFVALUELHIDDEN, $_PDFCONDITIONHIDDEN, $_TReg, $_DEBUG, $OriFichero, $_User;
global $_ClearShowFilter;
if( $_DEBUG==1 ) eTrace( "Informa[]" );
$sTReg = $_TReg;
$CondicionOriginal = array();
$sql = str_replace( "\n", ' ', $sql );
if( trim($sql)=='' ){
global $OriFichero, $_User;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
if( file_exists( $tmpCursor ) ){
$_SERIALIZE = unserialize( file_get_contents( $tmpCursor ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
unset($_SERIALIZE);
$sql = $_SQL_;
}
}
if( trim($sql)=='' ){
global $_SQL_;
$sql = $_SQL_;
}
$Depurar = false;
if( $Depurar ) eTrace( '|'.$sql.'|' );
$DimCampoCondi = array();
$DimCondicion = array();
$TxtOrdenacion = '';
$sql = trim($sql);
if( mb_strtoupper(mb_substr($sql,0,6)) == 'WHERE ' ){
$sql = ' '.$sql;
}
$Cambio = array( ' from ', ' where ',' order by ', ' group by ',' like ', ' and ', ' or ', ' extend(', ' matches' );
for( $i=0; $i<count($Cambio); $i++ ){
$sql = str_replace( $Cambio[$i], mb_strtoupper($Cambio[$i]), $sql );
}
if( $Depurar ) eTrace( '|'.$sql.'|' );
$Cambio = array( array('%','*'), array('_','?'), array(' LIKE ','='), array(' MATCHES ','=') );
for($i=0; $i<count($Cambio); $i++){
$sql = str_replace( $Cambio[$i][0], $Cambio[$i][1], $sql );
}
if( $Depurar ) eTrace( 'REPLACE|'.$sql.'|' );
$DimCampos = sql_DimFields( $sql );
if( eSubstrCount( $sql, ' FROM ' ) > 0 ){
$sql = explode( ' FROM ', $sql );
$sql = $sql[1];
}
if( $Depurar ) eTrace( 'FROM|'.$sql.'|' );
if( eSubstrCount( $sql, ' WHERE ' ) > 0 ){
$sql = explode( ' WHERE ', $sql );
$sql = $sql[1];
}
if( $Depurar ) eTrace( 'WHERE|'.$sql.'|' );
if( isset($PDF_TxtOrderBy) ){
$TxtOrdenacion = $PDF_TxtOrderBy;
}else if( eSubstrCount( $sql, ' ORDER BY ') > 0 ){
$sql = explode( ' ORDER BY ', $sql );
$TxtOrdenacion = $sql[1];
$sql = $sql[0];
if( eSubstrCount( $TxtOrdenacion, ' GROUP BY ' ) > 0 ){
$TxtOrdenacion = explode( ' GROUP BY ', $TxtOrdenacion );
$TxtOrdenacion = $TxtOrdenacion[0];
}
$tmp = explode( ',',$TxtOrdenacion );
$TxtOrdenacion = '';
for( $i=0; $i<count($tmp); $i++ ){
$campo = $atributo = '';
list( $campo, $atributo ) = explode( ' ',trim($tmp[$i]) );
$campo = trim($campo);
if( is_int($campo*1) && $campo*1 > 0 ){
$campo = $DimCampos[$campo*1-1];
list( $campo, $atributo ) = explode( ' ',$campo );
$campo = trim($campo);
}
if( eSubstrCount( $campo, '.' ) > 0 ) list(,$campo) = explode('.',$campo);
$campo = trim($campo);
if( $TxtOrdenacion!='' ) $TxtOrdenacion .= ', ';
$puntero = null;
if( sql_Cuenta("{$_ENV['eDesDictionary']}gs_campo", "tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero ) > 0 ){
sql_Query( "select etiqueta, label_tab from {$_ENV['eDesDictionary']}gs_campo where tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero );
$row = sql_Fila( $puntero );
if( trim($row[1])!='' ){
$TxtOrdenacion .= trim($row[1]);
}else{
$TxtOrdenacion .= trim($row[0]);
}
$sEti='';
if( $_PDFLABELHIDDEN[$campo]!='' ) $sEti = $_PDFLABELHIDDEN[$campo];
if( $sEti == '' ){
for($c=0;$c<count($_Form);$c++){
if( $_Form[$c][1]==$campo ){
if( $sEti=='' && $_PDFTH[$c]!=''		) $sEti = $_PDFTH[$c];
if( $sEti=='' && $_Form[$c][0]!=''	) $sEti = $_Form[$c][0];
if( $sEti=='' && $_TIPTH[$c]!=''		) $sEti = $_TIPTH[$c];
break;
}
}
}
if( $_sGRID!=null ){
for( $n=0; $n<count($_sGRID); $n++ ){
if( $campo == $_sGRID[$n][0] ){
$sEti = '';
break;
}
}
}
if( $sEti=='' ){
}else{
$sEti = str_replace('&nbsp;',' ',$sEti);
$sEti = str_replace('&NBSP;',' ',$sEti);
$sEti = str_replace('<BR>',' ',$sEti);
$sEti = str_replace('<br>',' ',$sEti);
$sEti = str_replace('<Br>',' ',$sEti);
$sEti = str_replace('<bR>',' ',$sEti);
$TxtOrdenacion .= $sEti;
}
}
}
$TxtOrdenacion = trim($TxtOrdenacion);
if( mb_substr($TxtOrdenacion,-1)==',') $TxtOrdenacion = mb_substr($TxtOrdenacion,0,-1);
}
if( $Depurar ) eTrace( '|'.$sql.'|' );
if( eSubstrCount( $sql, ' GROUP BY ' ) > 0 ){
$sql = explode( ' GROUP BY ', $sql );
$sql = $sql[0];
}
if( $Depurar ) eTrace( 'GROUP BY|'.$sql.'|' );
while( eSubstrCount( $sql, ' EXTEND(' ) > 0 ){
$ei = mb_strpos( $sql, ' EXTEND(' );
$ci = $ei+8;
$cf = mb_strpos( $sql, ',', $ei+1 );
$ef = mb_strpos( $sql, ')', $ei+1 );
$sql = mb_substr( $sql, 0, $ei+1 ).
mb_substr( $sql, $ei+8, $cf-$ei-8 ).
mb_substr( $sql, $ef+1 );
}
if( $Depurar ) eTrace( 'CALCULA CONDICIONES|'.$sql.'|' );
$tmp = explode( ' AND ', trim($sql) );
for($i=0; $i<count($tmp); $i++){
$dato = trim($tmp[$i]);			if( $Depurar ) eTrace( $i.'.CONDICION |'.$dato.'|' );
if( trim($dato) == '' ) continue;
$etiqueta = $campo = $valor = $condi = $sCondi = '';
$FuncSql = '';
$sp = 0;
for( $p=$sp; $p<mb_strlen($dato); $p++ ){
$c = mb_substr( $dato, $p, 1 );
if( $c=='(' ){
$FuncSql = mb_strtoupper(trim(mb_substr($dato,0,$p)));
if( mb_substr( $dato, $p+1, 1 )==' ' ) $p++;
continue;
}
if( eSubstrCount( '<>=! '.mb_chr(9), $c ) > 0 ){
$sp = $p;
break;
}else{
$campo .= $c;
}
}
$campo = trim($campo);
if( eSubstrCount( $campo, '.' ) > 0 ){
list(,$campo ) = explode('.',$campo);
$campo = trim($campo);
}
if( eSubstrCount($campo,' ')>0 ) list($campo) = explode(' ',$campo);
if( $FuncSql!='' ){
list($campo) = explode(',',$campo);
$campo = trim($campo);
for( $p=$sp; $p<mb_strlen($dato); $p++ ){
if( mb_substr($dato,$p,1)==')' ){
$sp = $p+1;
break;
}
}
}
if( mb_substr($campo,-1)==']' && eSubstrCount($campo,']')>0 ) $campo = trim(mb_substr($campo,0,mb_strpos($campo,'[')));
if( $Depurar ) eTrace( $i.'.CAMPO |'.$campo.'| '.$FuncSql );
$tmp2 = mb_strtoupper(trim(mb_substr($dato,$sp)));
if( mb_substr($tmp2,0,7)=='NOT IN ' ){
$condi = '<>'; $sCondi = 'NOT IN';
$sp += 7;
}else if( mb_substr($tmp2,0,3)=='IN ' ){
$condi = '='; $sCondi = 'IN';
$sp += 3;
}else if( mb_substr($tmp2,0,5)=='LIKE ' ){
$condi = '='; $sCondi = 'LIKE';
$sp += 5;
}else if( mb_substr($tmp2,0,8)=='IS NULL ' ){
$condi = '='; $sCondi = 'IS NULL';
$sp += 8;
}else if( mb_substr($tmp2,0,12)=='IS NOT NULL ' ){
$condi = '='; $sCondi = 'IS NOT NULL';
$sp += 12;
}else{
$Ini = false;
for( $p=$sp; $p<mb_strlen($dato); $p++ ){
$c = mb_substr( $dato, $p, 1 );
if( $c==' ' && !$Ini ) continue;
$Ini = true;
if( eSubstrCount( '<>=!', $c ) > 0 ){
$condi .= $c;
}else{
$sp = $p;
break;
}
}
if( $c == ' ' ) {
for( $p=$sp; $p<mb_strlen($dato); $p++ ){
$c = mb_substr( $dato, $p, 1 );
if( $c!=' ' ) break;
}
}
}
if( $Depurar ) eTrace($i.'.RELACION |'.$condi.'|'.$sCondi);
$valor = trim(mb_substr( $dato, $sp ));
$c = $valor[0];
if( $c=='(' && mb_substr($valor,-1)==')' && ($sCondi == 'NOT IN' || $sCondi == 'IN') ){
$valor = mb_substr($valor,1,-1);
$tmp2 = ''; $pc = '';
$Cadena = false;
for( $p=0; $p<mb_strlen($valor); $p++ ){
$l = mb_substr( $valor, $p, 1 );
if( $l=='"' || $l== "'" ){
if( !$Cadena ){
$pc = $l;
$Cadena = true;
}else if( $pc == $l ) $Cadena = false;
}else if( $l==',' && !$Cadena ){
if( $sCondi!='NOT IN' ){
$l = ' o ';
}else{
$l = ' y ';
}
}
$tmp2 .= $l;
}
$valor = $tmp2;
}else if( $c == '"' || $c== "'" ){
for( $p=1; $p<mb_strlen($valor); $p++ ){
$l = mb_substr( $valor, $p, 1 );
if( $l==$c ){
if( ($p+1)!=mb_strlen($valor) ){
$tmp2 = trim(mb_substr( $valor, $p+1 ));
if( mb_substr($tmp2,0,3)=='OR ' ) $tmp2 = trim(mb_substr($tmp2,3));
$valor = mb_substr( $valor, 0, $p+1 );
if( $tmp2!=')' ){
$tmp[] = $tmp2; if( $Depurar ) eTrace($i.' ---> NewCampo |'.$tmp2);
}
}
break;
}
}
}
if( $Depurar ){
eTrace($i.'.VALOR |'.$valor.'|');
eTrace($i.' ['.$campo.']['.$condi.']['.$valor.']<br>' );
}
if( $valor!='' && $valor[0]!='"' && $valor[0]!="'" && !is_numeric($valor) ){
if( $Depurar ) eTrace($i.' ---> Condicion anulada<br>');
continue;
}
$puntero = null;
$etiqueta = '';
if( $_PDFLABELHIDDEN[$campo]!='' ) $etiqueta = $_PDFLABELHIDDEN[$campo];
if( $etiqueta == '' ){
for($p=0;$p<count($_Form);$p++){
if( $_Form[$p][1]==$campo ){
if( $etiqueta=='' && $_PDFTH[$p]!=''		) $etiqueta = $_PDFTH[$p];
if( $etiqueta=='' && $_Form[$p][0]!=''	) $etiqueta = $_Form[$p][0];
if( $etiqueta=='' && $_TIPTH[$p]!=''		) $etiqueta = $_TIPTH[$p];
break;
}
}
}
if( $etiqueta == '' ){
if( sql_Cuenta("{$_ENV['eDesDictionary']}gs_campo", "tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero ) > 0 ){
sql_Query( "select etiqueta, label_tab from {$_ENV['eDesDictionary']}gs_campo where tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero );
$row = sql_Fila( $puntero );
if( trim($row[1])!='' ){
$etiqueta .= trim($row[1]);
}else{
$etiqueta .= trim($row[0]);
}
}
}
if( $etiqueta == '' && mb_substr($campo,0,3)=='cd_' ){
for($p=0;$p<count($_Form);$p++){
if( mb_substr($campo,0,3)=='cd_' && $_Form[$p][1]=='nm_' .mb_substr($campo,3) ){
if( $etiqueta=='' && $_PDFTH[$p]!=''		) $etiqueta = $_PDFTH[$p];
if( $etiqueta=='' && $_Form[$p][0]!=''	) $etiqueta = $_Form[$p][0];
if( $etiqueta=='' && $_TIPTH[$p]!=''		) $etiqueta = $_TIPTH[$p];
break;
}
}
}
$etiqueta = eStrUpper($etiqueta);
if( mb_strtoupper($_PDFLABELHIDDEN[$campo])=='NOTTOSHOW' ) continue;
if( $Depurar ) eTrace( $i.' |'.trim($etiqueta).'|'.$condi.'|'.$valor.'| > |'.$campo.'|'.$dato.'|' );
$etiqueta = str_replace('&nbsp;',' ',$etiqueta);
$etiqueta = str_replace('&NBSP;',' ',$etiqueta);
$etiqueta = str_replace('<BR>',' ',$etiqueta);
$etiqueta = str_replace('<br>',' ',$etiqueta);
$etiqueta = str_replace('<Br>',' ',$etiqueta);
$etiqueta = str_replace('<bR>',' ',$etiqueta);
$etiqueta = trim($etiqueta);
if( $etiqueta!='' ){
$valor = trim($valor);
$ExisteTabla = false;
if( mb_substr($campo,0,3)=='cd_' ){
$sDEBUG = $_DEBUG;
$_DEBUG = 30;
if( mb_substr($campo,0,3)=='cd_' ) $SeekTabla = mb_substr($campo,3);
if( sql_Query( 'show columns from '.$SeekTabla, $p )!=-1 ){
$row = sql_Fila($p);
$ExisteTabla = ($row[0]!='');
}
$_DEBUG = $sDEBUG;
}
if( mb_substr($campo,0,3)=='cd_' && $ExisteTabla ){
$MasWhere = '';
for( $p=0; $p<count($_RELATIONFIELDS); $p++ ){
if( eSubstrCount( $_RELATIONFIELDS[$p], ','.$campo.',' ) == 1 ){
$pi = mb_strpos($_RELATIONFIELDS[$p],','.$campo.',');
if( $i>0 ){
$tmpCondi = explode(',',mb_substr($_RELATIONFIELDS[$p],1,$pi-1));
for( $p2=0; $p2<count($tmpCondi); $p2++ ){
if( $MasWhere!='' ) $MasWhere .= ' and ';
$MasWhere .= $CondicionOriginal[$tmpCondi[$p2]];
}
}
}
}
if( $MasWhere!='' ) $MasWhere = ' and '.$MasWhere;
if( mb_substr($campo,0,3)=='cd_' ){
$xTabla = mb_substr($campo,3);
$xCampos = "cd_{$xTabla},nm_{$xTabla}";
sql_Busca( $xTabla, $xCampos, $campo.$condi.$valor.$MasWhere, "nm_{$xTabla}", $p );
}
$row = sql_Fila( $p );
if( trim($row[1])!='' ){
$CondicionOriginal[$campo] = $campo.$condi.$valor;
$valor = trim($row[1]);
}else{
if( $_PDFVALUELHIDDEN[$campo]!='' ) $valor = ( @eval( 'return ('.str_replace('()',"({$valor})",$_PDFVALUELHIDDEN[$campo]).');' ) );
$CondicionOriginal[$campo] = $campo.$condi.$valor;
if( $valor[0]=='"' || $valor[0]=="'" ) $valor = mb_substr($valor,1,-1);
}
}else{
if( $_PDFVALUELHIDDEN[$campo]!='' ) $valor = ( @eval( 'return ('.str_replace('()',"({$valor})",$_PDFVALUELHIDDEN[$campo]).');' ) );
$CondicionOriginal[$campo] = $campo.$condi.$valor;
if( $valor[0]=='"' || $valor[0]=="'" ) $valor = mb_substr($valor,1,-1);
}
if( mb_strlen($valor)==10 && mb_substr($valor,4,1)=='-' && mb_substr($valor,7,1)=='-' && eSubstrCount($valor,'-')==2 ) $valor = mb_substr($valor,8,2).'-'.mb_substr($valor,5,2).'-'.mb_substr($valor,0,4);
if( ( mb_substr($campo,0,3)=='dt_' || mb_substr($campo,0,4)=='_dt_' ) && mb_strlen($valor)==8 ) $valor = mb_substr($valor,6,2).'-'.mb_substr($valor,4,2).'-'.mb_substr($valor,0,4);
$Saltar = false;
for( $h=0; $h<count($_PDFCONDITIONHIDDEN); $h++ ) if( $_PDFCONDITIONHIDDEN[$h]==$campo.$condi.$valor ) $Saltar = true;
if( $Saltar ) continue;
$Sumar = true;
if( count($DimCondicion) > 0 ){
if( $DimCampoCondi[count($DimCampoCondi)-1][0] == $etiqueta ){
if( $condi=='=' ){
$DimCondicion[count($DimCondicion)-1] .= ' o '.$valor;
}else{
$DimCondicion[count($DimCondicion)-1] .= ' y '.$condi.' '.$valor;
}
$Sumar = false;
}
}
if( $Sumar ){
array_push( $DimCondicion, $etiqueta.' '.$condi.' '.$valor );
array_push( $DimCampoCondi, array($etiqueta,$campo) );
}
}
}
global $_LISTCOMPARE;
if( $_LISTCOMPARE[1]!='' ){
list( $oCmp, $dCmp ) = explode(',',$_LISTCOMPARE[1]);
$oCmp = trim($oCmp);
global ${$oCmp}, ${$dCmp};
if( $_gs_formato_!='P' ){
for( $p=0; $p<count($DimCampoCondi); $p++ ){
if( $DimCampoCondi[$p][1] == $oCmp ){
$tmp = str_replace('"','',${$oCmp});
$tmp = TransformaFecha( $tmp );
$tmp = str_replace($oCmp,'',$tmp);
$FechasIguales = ( eSubstrCount( $tmp,' and ') == 0 );
$tmp = str_replace(' and ',' y ',$tmp);
$tmp = str_replace('=','= ',$tmp);
$ss = str_replace( $etiqueta, mb_strtoupper($_PDFLABELHIDDEN[$dCmp]), $DimCondicion[$p] );
if( $FechasIguales ){
$xoCmp = TransformaFecha( ${$oCmp} );
$xdCmp = TransformaFecha( ${$dCmp} );
$ss = str_replace( $xoCmp, $xdCmp, $ss );
if( eSubstrCount( $tmp,'=') == 0 && eSubstrCount( $tmp,'<') == 0 && eSubstrCount( $tmp,'>') == 0 ) $tmp = '='.$tmp;
}
$DimCondicion[$p] = $etiqueta.' '.$tmp;
array_push( $DimCondicion, $ss );
}
}
}else{
for( $p=0; $p<count($DimCampoCondi); $p++ ){
if( $DimCampoCondi[$p][1] == $oCmp ){
$tmp = str_replace('"','',${$dCmp});
$tmp = TransformaFecha( $tmp );
$tmp = str_replace($dCmp,'',$tmp);
$FechasIguales = ( eSubstrCount( $tmp,' and ') == 0 );
$tmp = str_replace(' and ',' y ',$tmp);
$tmp = str_replace('=','= ',$tmp);
if( $FechasIguales ){
if( eSubstrCount( $tmp,'=') == 0 && eSubstrCount( $tmp,'<') == 0 && eSubstrCount( $tmp,'>') == 0 ) $tmp = '='.$tmp;
}
$etiqueta = mb_strtoupper($_PDFLABELHIDDEN[$dCmp]);
array_push( $DimCondicion, $etiqueta.' '.$tmp );
}
}
}
}
mysqli_data_seek( $GLOBALS['_Result'], 0 );
if( $_ClearShowFilter ) $DimCondicion = array();
$_TReg = $sTReg;
if( function_exists('eChangeListCondition') ) $DimCondicion = eChangeListCondition( $DimCondicion );
}
function TransformaFecha( $tmp ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
for( $c=0; $c<mb_strlen($tmp); $c++ ){
if( eSubstrCount('0123456789',mb_substr($tmp,$c,1)) == 1 ){
if( mb_substr($tmp,7+$c,1) == '-' && mb_substr($tmp,4+$c,1)=='-' ){
$tmp = mb_substr($tmp,0,$c).mb_substr($tmp,8+$c,2).'-'.mb_substr($tmp,5+$c,2).'-'.mb_substr($tmp,0+$c,4) . mb_substr($tmp,10+$c);
$c += 10;
}
}
}
return $tmp;
}
function sql_DimFields( $sql ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "DimFields[]" );
$DimCampo = array();
$sql = trim($sql);
if( mb_strtoupper(mb_substr($sql,0,7)) == 'SELECT ' ) $sql = mb_substr($sql,7);
if( eSubstrCount( mb_strtoupper($sql), ' FROM ' ) > 0 ){
$sql = mb_substr($sql,0,mb_strpos(mb_strtoupper($sql), ' FROM ') );
}
$Expresion = false;
$NomCampo = '';
for( $c=0; $c<mb_strlen($sql); $c++ ){
$ca = mb_substr($sql,$c,1);
switch( $ca ){
case '[':
case '(':
$Expresion = true;
$NomCampo .= $ca;
break;
case ']':
case ')':
$Expresion = false;
$NomCampo .= $ca;
break;
case ',':
if( $Expresion ){
$NomCampo .= $ca;
}else{
$DimCampo[] = $NomCampo;
$NomCampo = '';
}
break;
default:
$NomCampo .= $ca;
}
}
$DimCampo[] = $NomCampo;
for( $c=0; $c<count($DimCampo); $c++ ){
if( eSubstrCount($DimCampo[$c],' as ') > 0 ){
list( , $txt ) = explode(' as ',$DimCampo[$c]);
$DimCampo[$c] = trim($txt);
}else if( eSubstrCount($DimCampo[$c],'(') > 0 ){
list( $comando, $txt ) = explode('(',$DimCampo[$c]);
if( $comando!='COUNT' ){
list( $txt ) = explode(',',$txt);
$DimCampo[$c] = trim($txt);
}
}
}
return $DimCampo;
}
function sql_Memo( $Tabla, $Text1, $Text2, $Text3, $Text4, $Text5 ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_MemoContenido, $_DBMemoTable;
$_DBMemoTable = $Tabla;
switch( func_num_args() ){
case 2:
$_MemoContenido = array( $Text1 );
break;
case 3:
$_MemoContenido = array( $Text1, $Text2 );
break;
case 4:
$_MemoContenido = array( $Text1, $Text2, $Text3 );
break;
case 5:
$_MemoContenido = array( $Text1, $Text2, $Text3, $Text4 );
break;
case 6:
$_MemoContenido = array( $Text1, $Text2, $Text3, $Text4, $Text5 );
break;
}
}
function qExists( $Tabla ){
global $_SqlPDOType;
switch( mb_strtoupper($_SqlPDOType) ){
case 'ORACLE':
global $_SqlUsuario; $SqlUsuario = mb_strtoupper($_SqlUsuario);
$uTabla = mb_strtoupper($Tabla);
$lTabla = mb_strtolower($Tabla);
$sql = "SELECT TABLE_NAME FROM ALL_TABLES where (TABLE_NAME='{$uTabla}' or TABLE_NAME='{$lTabla}')";
qQuery( $sql, $p1 );
$r=qRow($p1);
if( $uTabla==mb_strtoupper($r[0]) ) return true;
$sql = "SELECT VIEW_NAME FROM ALL_VIEWS where (VIEW_NAME='{$uTabla}' or VIEW_NAME='{$lTabla}')";
qQuery( $sql, $p1 );
$r=qRow($p1);
return( $uTabla==mb_strtoupper($r[0]) );
case 'INFORMIX':
qQuery( "select tabname from systables where tabname='{$Tabla}' and tabid>100", $p1 );
$r=qRow($p1);
return( $Tabla==$r[0] );
break;
case 'MYSQL': case 'MYSQLI':
qQuery( "show tables like '{$Tabla}'", $p1 );
$r=qRow($p1);
return( $Tabla==$r[0] );
break;
default:
}
}
sql_Conecta();
?>