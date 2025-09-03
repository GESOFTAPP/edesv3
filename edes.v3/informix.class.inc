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
class eInformix {
private $NumSqlError_ = false;
private $_ErrReportBCc='';
private $_ErrReportCc='';
private $_ErrReportFrom='';
private $_ErrReportMessage='';
private $_ErrReportTo='';
private $_ErrReportUserNode='';
private $_Sql='';
private $_SqlDiccionario='';
private $_SqlHostName='';
private $_SqlInit=array();
private $_SqlPassword='';
private $_SqlTransaction='';
private $_SqlUsuario='';
private $_HndDB='';
private $_Result='';
private $_TReg='';
private $_IdInsert=array();
private $_IdRegistro=array();
function qConnect($NomDef){
if( !empty(getenv('MAIL_KEYCODE')) ){
global $_Sql, $_SqlHostName, $_SqlPort, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit, $_SqlTransaction, $_SqlPDOType, $_SqlPDOConnect;
}else if( $NomDef=='.' ){
$sql = SESS::$sql;
$_Sql = $sql['driver'];
$_SqlHostName = $sql['hostname'];
$_SqlDiccionario = $sql['database'];
$_SqlUsuario = $sql['user'];
$_SqlPassword = $sql['password'];
$_SqlTransaction = $sql['transaction'];
$_SqlInit = $sql['init'];
$_SqlPDOType = $sql['pdoType'];
$_SqlPDOConnect = $sql['pdoConnect'];
}else if( $NomDef!='' ){
$_PathAdd = '';
$_PathCurrent = str_replace('\\', '/', getCWD());
$_PathCurrent = mb_substr($_PathCurrent, mb_strrpos($_PathCurrent, '/')+1);
if( $_PathCurrent=='cron' ) $_PathAdd = '../';
$NomDef = str_replace(CHR92, '/', $NomDef);
if( eSubstrCount($NomDef, '.')==0 ) $NomDef .= '.ini';
if( eSubstrCount($NomDef, '/')==0 ) $NomDef = "{$_PathAdd}../_datos/config/{$NomDef}";
include($NomDef);
}else{
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit;
}
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$_SqlHostName = ePassword($_SqlHostName);
$_SqlDiccionario = ePassword($_SqlDiccionario);
$_SqlPasswordOri = $_SqlPassword;
$_SqlPassword = ePassword($_SqlPassword);
$_SqlUsuario = ePassword($_SqlUsuario);
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlInit = $_SqlInit;
global $_DEBUG;
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$_SqlPasswordOri} | Diccionario: {$this->_SqlDiccionario}]");
$Dir = getenv('INFORMIXDIR');
putenv( "PATH=".getenv("PATH").":{$Dir}/bin" );
putenv( "LD_LIBRARY_PATH={$Dir}/lib:{$Dir}/lib/esql" );
putenv( "INFORMIXSERVER={$this->_SqlHostName}" );
putenv( "GL_DATE=%Y-%m-%d" );
putenv( "DBDATE=YMD4-" );
$aux = $this->_SqlDiccionario."@".getenv( "INFORMIXSERVER" );
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario}]");
if( $_DEBUG==1 ){
eTrace("[Diccionario: '{$this->_SqlDiccionario}' Diccionario: '{$aux}']");
eTrace("[$aux, $this->_SqlUsuario, $this->_SqlPassword]");
}
$Pass = $this->_SqlPassword;
if( mb_strlen($Pass)>8 && mb_substr($Pass,0,8)==dechex(crc32(mb_substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(mb_substr($Pass,8)));
$this->_HndDB = false;
$HastaSg = time()+10;
while( $HastaSg > time() && !$this->_HndDB ){
$this->_HndDB = ifx_connect( $aux, $this->_SqlUsuario, $Pass );
}
if( !$this->_HndDB ){
if( $_DEBUG==30 ) return -1;
eTrace("ERROR connecting to DDBB");
eEnd();
}
$_ENV["_SqlStartSystem"] = true;
if( $_DEBUG==4 ) eLogDebug('[ClassSQL:connected]');
if( $_DEBUG==1 ) eTrace('[ClassSQL:connected]');
ifx_textasvarchar(1);
ifx_byteasvarchar(1);
ifx_nullformat(0);
for( $n=0; $n<count($this->_SqlInit); $n++ ){
if( $this->_SqlInit[$n]=="<" ){
$this->qRow();
}else{
$this->qQuery($this->_SqlInit[$n]);
}
}
if( $this->_SqlTransaction=='' ) $this->_SqlTransaction = false;
if( $this->_SqlTransaction ) $this->qTranOn();
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
function qFree( &$Puntero=NULL ){
global $_MemoContenido;
$_MemoContenido = array();
if( func_num_args() == 0 ){
ifx_free_result( $this->_Result );
}else{
ifx_free_result( $Puntero );
$Puntero = null;
}
}
function qEnd(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace("[ClassDesconectado]");
if( $this->_SqlTransaction ) $this->qTranOff();
ifx_close( $this->_HndDB );
$this->_HndDB = false;
}
function qError($sql=''){
global $_User,$_Node,$NumSqlError_,$REQUEST_METHOD,$_DEBUG;
$xError = ifx_error();
list(,$nError) = explode('SQLCODE=',$xError);
$nError = str_replace(']','',trim($nError));
$SQLError = '';
exec('finderr '.$nError,$cad);
for( $i=0;$i<count($cad);$i++ ){
if( $SQLError!='' ) $SQLError .= '<br>';
$SQLError .= trim($cad[$i]);
}
while( mb_strtoupper(mb_substr($SQLError,-4))=='<BR>' ) $SQLError = mb_substr($SQLError,0,-4);
if( $_DEBUG==-1 ) eTrace('ERROR:[ '.$xError.' : '.$SQLError.' ]');
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$xError.' : '.$SQLError."]");
if( $GLOBALS['php_errormsg']=='parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
$TxtError = qErrorFile(trim($xError).' : '.$SQLError, $sql, $pkError);
$cd = "";
if( $this->_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$this->_ErrReportCc."\r\n";
if( $this->_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$this->_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail( $this->_ErrReportTo, $this->_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras );
}
eInit();
_ShowCallSrv();
$NumSqlError_ = _ErrorToUser($sql, $TxtError, $ScriptSys, $NumSqlError_);
$DimText[] = ifx_create_blob( 1, 0, "{$TxtError}\n\n{$sql}" );
if( eSubstrCount( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sql = trim(eEntityEncode($sql));
$TxtError = trim(eEntityEncode($TxtError));
$sqlError = "insert into {$_ENV['eDesDictionary']}gs_error (    cdi  ,cd_gs_user,tipo, desde,            fichero        , linea, texto, trace) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',    0  ,   '' ,   ?  )";
if( !ifx_query($sqlError, $this->_HndDB, $DimText) ) eTrace('ERROR: gs_error');
eEnd();
}
function qQueryMemo( $sql, $Memo ){
$DimText[] = ifx_create_blob( 1, 0, "{$Memo}" );
if( !ifx_query( $sql, $this->_HndDB, $DimText ) ) eTrace('ERROR: gs_error');
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
global $_DEBUG,$_SQL_;
$sql = trim($sql);
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Query[{$sql}]");
$this->_TReg = -1;
_SlowSqlWarning();
if( func_num_args() == 1 ){
$this->_Result = ifx_query( $sql, $this->_HndDB );
if( !$this->_Result ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = (int)ifx_affected_rows( $this->_Result );
}
}else{
$Puntero = ifx_query( $sql, $this->_HndDB );
if( !$Puntero ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = (int)ifx_affected_rows( $Puntero );
}
}
_SlowSqlWarning($sql);
if( mb_strtoupper(mb_substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), $this->qId() ) );
$this->_IdRegistro[trim($Tabla)] = $this->qId();
}else if( mb_substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace( "[Reg.Query: {$this->_TReg}]" );
return $this->_TReg;
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
global $_DEBUG;
if( eSubstrCount( $Tabla, ' left join ' ) > 0 ){
$DBTR = '';
if( eSubstrCount( $Tabla, ',' ) > 0 ){
$p = mb_strpos( $Tabla, ',' );
$DBTR = mb_substr($Tabla,$p+1);
if( eSubstrCount( $DBTR, ' left join ' ) > 0 ){
$DBTR = '';
}else{
$Tabla = str_replace(','.$DBTR,'',$Tabla);
}
}
$Tabla = trim($Tabla).' ';
while( eSubstrCount( $Tabla, '  ' ) > 0 ) $Tabla = str_replace( '  ', ' ', $Tabla );
while( eSubstrCount( $Tabla, ' left join ' ) > 0 ) $Tabla = str_replace( ' left join ', ', outer ', $Tabla );
$WhereJoin = '';
$tmp = explode(', outer ',$Tabla);
$Tabla = $tmp[0];
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode(' on ',$tmp[$n]);
$Tabla .= ', outer '.$tmp2[0];
if( $WhereJoin!='' ) $WhereJoin .= ' and ';
$WhereJoin .= $tmp2[1];
}
if( trim($Condicion)=='' )
$Condicion = $WhereJoin;
else{
if( $WhereJoin!='' ) $Condicion = $Condicion .' and '.$WhereJoin;
}
if( $DBTR!='' ) $Tabla .= ','.$DBTR;
}
if( trim($Condicion)!='' ) $Condicion = 'where '.$Condicion.'';
$sql = "select count(*) as n from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Cuenta:[{$sql}]");
_SlowSqlWarning();
if( func_num_args() < 3 ){
$this->_Result = ifx_query( $sql, $this->_HndDB );
if(!$this->_Result ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$row = ifx_fetch_row( $this->_Result, IFX_SCROLL );
}else{
$Puntero = ifx_query( $sql, $this->_HndDB );
if(!$Puntero ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$row = ifx_fetch_row( $Puntero, IFX_SCROLL );
}
_SlowSqlWarning($sql);
$this->_TReg = (int)$row[n];
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( $Puntero=NULL ){
if( func_num_args() == 0 ){
$row = ifx_fetch_row( $this->_Result, 'NEXT' );
}else{
$row = ifx_fetch_row( $Puntero, 'NEXT' );
}
$i = 0;
foreach($row as $v=>$w){
$aux[$i]=$w;
$i++;
}
return $aux;
}
function qArray( $Puntero=NULL ){
if( func_num_args() == 0 ){
return ifx_fetch_row( $this->_Result, 'NEXT' );
}else{
return ifx_fetch_row( $Puntero, 'NEXT' );
}
}
function qId(){
$sqlca = ifx_getsqlca( $this->_Result );
return $sqlca['sqlerrd1'];
}
function qTranOn(){
}
function qTranOff(){
}
function qTranBack(){
}
function qLog( $Log, $sOpe, $sTabla, $sSql ){
global $_DEBUG,$_User,$_DBSERIAL;
$sClave = '';
for( $n=0; $n<count($Log); $n++ ){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[ $Log[$n] ];
}
}
$txt = ifx_create_blob( 1, 0, $sSql );
$DimText[] = $txt;
$sql = "insert into {$_ENV['eDesDictionary']}gs_log ( cdi, operacion, cd_gs_user, tabla, clave, sqlexe ) values ( '".date('Y-m-d H:i:s')."', '{$sOpe}', '{$_User}', '{$sTabla}', '{$sClave}', ? )";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
$this->_Result = ifx_query( $sql, $this->_HndDB, $DimText );
if(!$this->_Result ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}
function sql_Seek( $i ){
for( $n=0; $n<$i; $n++ ) $this->qRow();
}
function sql_NombreCampo( $i ){
$nombres = ifx_fieldproperties( $this->_Result );
$j = 0;
foreach($nombres as $v=>$w){
if($j == $i){
break;
}
$j++;
}
return $v;
}
function sql_TipoCampo( $i ){
$tipos = ifx_fieldtypes($this->_Result);
$j=0;
foreach($tipos as $v=>$w){
if($j == $i){
break;
}
$j++;
}
return $w;
}
function sql_LongitudCampo( $i ){
$nombres = ifx_fieldproperties( $this->_Result );
$j=0;
foreach($nombres as $v=>$w){
if($j == $i){
break;
}
$j++;
}
$j=mb_strpos($w,';');
$k=strpos ($w,';',$j+1);
return mb_substr( $w, $j+1, $k-$j-1 );
}
function sql_FlagsCampo( $i ){
$nombres=ifx_fieldproperties($this->_Result);
$j=0;
foreach($nombres as $v=>$w){
if($j == $i){
break;
}
$j++;
}
return str_replace(';', ' ', $w);
}
function sql_TotalCampos(){
return ifx_num_fields( $this->_Result );
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
}
?>