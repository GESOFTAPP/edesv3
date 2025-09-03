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
class eMySqli {
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
private $fields = [];
private $values = [];
private $where	= "";
private $order	= "";
private $field	= "";
private $in		= "";
private $notIn	= "";
private $index	= 0;
private $join	= [];
private $group	= "";
private $limit	= "";
function qConnect($NomDef=''){
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
$_SqlPasswordOld = $_SqlPassword;
$_SqlPassword = ePassword($_SqlPassword);
$_SqlUsuario = ePassword($_SqlUsuario);
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlInit = $_SqlInit;
global $_DEBUG;
if( $this->_HndDB!='' ) return;
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario}]");
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$_SqlPasswordOld} | Diccionario: {$this->_SqlDiccionario}]");
$Pass = $this->_SqlPassword;
if( mb_strlen($Pass)>8 && mb_substr($Pass,0,8)==dechex(crc32(mb_substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(mb_substr($Pass,8)));
$this->_HndDB = mysqli_connect($this->_SqlHostName, $this->_SqlUsuario, $Pass, $_SqlDiccionario);
if( !$this->_HndDB ){
eTrace("ERROR connecting to DDBB");
eTron('ERROR al conectar con DB '.mysqli_connect_error()." [2|".$this->_SqlHostName."|".$this->_SqlUsuario."|".$Pass."|".$_SqlDiccionario."]");
eEnd();
}
$_ENV["_SqlStartSystem"] = true;
if( $_DEBUG==4 ) eLogDebug('[ClassSQL:connected]');
if( $_DEBUG==1 ) eTrace('[ClassSQL:connected]');
$this->_HndDB->select_db($this->_SqlDiccionario);
if( mysqli_errno( $this->_HndDB ) ){
if( $_DEBUG==30 ) return -1;
$this->qError();
}
$this->qQuery("set names 'utf8'");
$this->qQuery("set character set 'utf8'");
if( empty($this->_SqlInit) ){
$this->_SqlInit = [];
}
if( gettype($this->_SqlInit)=="string" ){
$this->_SqlInit = [$this->_SqlInit];
}
for($n=0; $n<count($this->_SqlInit); $n++){
$this->_SqlInit[$n] = trim($this->_SqlInit[$n]);
if( $this->_SqlInit[$n]=="<" ){
$this->qRow($p);
}else if( mb_strpos($this->_SqlInit[$n], " ")===false ){
mysqli_set_charset($this->_HndDB, $this->_SqlInit[$n]);
}else{
$this->qQuery($this->_SqlInit[$n], $p, true);
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
function qFree(&$puntero=NULL){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug('[ClassSQL:Libera]');
if( $_DEBUG==1 ) eTrace("[ClassSQL:Libera]");
if( func_num_args()==0 ){
mysqli_free_result($this->_Result);
}else{
mysqli_free_result($puntero);
$puntero = null;
}
}
function qEnd(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace("[ClassDesconectado]");
if( $this->_SqlTransaction ) $this->qTranOff();
mysqli_close($this->_HndDB);
$this->_HndDB = false;
}
function qError($sql=''){
global $_User, $_Node, $NumSqlError_, $REQUEST_METHOD, $_DEBUG;
if( $_DEBUG==-1 ) eTrace('ERROR:[ '.mysqli_errno($this->_HndDB).' : '.mysqli_error($this->_HndDB).' ]');
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.mysqli_errno($this->_HndDB).' : '.mysqli_error($this->_HndDB)." ]");
if( $GLOBALS['php_errormsg'] == 'Parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
$TxtError = qErrorFile(trim(mysqli_errno($this->_HndDB)).' : '.trim(mysqli_error($this->_HndDB)), $sql, $pkError);
$cd = "";
if( $this->_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$this->_ErrReportCc."\r\n";
if( $this->_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$this->_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail($this->_ErrReportTo, $this->_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}
eInit();
_ShowCallSrv();
$NumSqlError_ = _ErrorToUser($sql, $TxtError, $ScriptSys, $NumSqlError_);
if( eSubstrCount($_SERVER['REQUEST_URI'],'edes.php?')==1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sql = trim(eEntityEncode($sql));
$TxtError = trim(eEntityEncode($TxtError));
$sqlError = "insert into {$_ENV['eDesDictionary']}gs_error (    cdi  ,cd_gs_user, tipo, desde,             fichero       , linea, texto, trace ) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  ,   '' , '{$TxtError}\n\n{$sql}' )";
mysqli_query($this->_HndDB, $sqlError);
if( mysqli_errno($this->_HndDB) ) eTrace('ERROR: gs_error');
eEnd();
}
function qQuery($sql, &$Puntero=NULL, $Continuar=NULL){
global $_DEBUG, $_SQL_;
$sql = trim($sql);
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
$this->_TReg = -1;
_SlowSqlWarning();
if( $Puntero==NULL ){
$this->_Result = mysqli_query($this->_HndDB, $sql);
if( mysqli_errno($this->_HndDB) ){
if( $Continuar==NULL || !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = mysqli_affected_rows($this->_HndDB);
}
}else{
$Puntero = mysqli_query($this->_HndDB, $sql);
if( mysqli_errno($this->_HndDB) ){
if( $Continuar==NULL || !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = mysqli_affected_rows($this->_HndDB);
}
}
_SlowSqlWarning($sql);
if( mb_strtoupper(mb_substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ', $tmp);
$Tabla = $tmp[2];
array_push($this->_IdInsert, array(trim($Tabla), mysqli_insert_id($this->_HndDB)));
$this->_IdRegistro[trim($Tabla)] = mysqli_insert_id($this->_HndDB);
}else if( mb_substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace("[Reg.Query: {$this->_TReg}]");
return $this->_TReg;
}
function qCount($Tabla, $Condicion=NULL, &$Puntero=NULL){
global $_DEBUG;
if( trim($Condicion)!='' ){
$Condicion = 'where '.$Condicion.'';
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
_SlowSqlWarning();
if( func_num_args()<3 ){
$this->_Result = mysqli_query($this->_HndDB, $sql);
if( mysqli_errno($this->_HndDB) ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$this->_TReg = mysqli_fetch_row($this->_Result)[0];
}else{
$Puntero = mysqli_query($this->_HndDB, $sql);
if( mysqli_errno($this->_HndDB) ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$this->_TReg = mysqli_fetch_row($Puntero)[0];
}
_SlowSqlWarning($sql);
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow($Puntero=NULL){
$r = mysqli_fetch_row(($Puntero==NULL) ? $this->_Result : $Puntero);
return $r;
}
function qArray($Puntero=NULL){
$r = mysqli_fetch_array(($Puntero==NULL) ? $this->_Result : $Puntero, MYSQLI_ASSOC);
return $r;
}
function qId($Tabla=''){
if( $Tabla!='' ) return $GLOBALS['_IdRegistro'][$Tabla];
return mysqli_insert_id($this->_HndDB);
}
function qTranOn(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
mysqli_autocommit($this->_HndDB, false);
$this->_Result = mysqli_begin_transaction($this->_HndDB);
if( mysqli_errno( $this->_HndDB ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('START TRANSACTION');
}
}
function qTranOff(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("COMMIT");
if( $_DEBUG==1 ) eTrace('[COMMIT]');
$this->_Result = mysqli_commit($this->_HndDB);
if( mysqli_errno( $this->_HndDB ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('COMMIT');
}
}
function qTranBack(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("ROLLBACK");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
$this->_Result = mysqli_rollback($this->_HndDB);
if( mysqli_errno( $this->_HndDB ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('ROLLBACK');
}
}
function qLog($Log, $sOpe, $sTabla, $sSql){
global $_DEBUG,$_User,$_DBSERIAL;
$sClave = '';
for( $n=0; $n<count($Log); $n++ ){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[$Log[$n]];
}
}
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", "'.str_replace('"','\"',trim(stripslashes($sSql))).'")';
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
$this->_Result = mysqli_query($this->_HndDB, $sql);
if(!$this->_Result ) $this->qError( $sql );
}
function sql_Seek($i){
return mysqli_data_seek($this->_Result, $i);
}
function sql_NombreCampo($i){
return mysqli_field_name($this->_Result, $i);
}
function sql_TipoCampo($i){
return mysqli_field_type($this->_Result, $i);
}
function sql_LongitudCampo($i){
return mysqli_field_len($this->_Result, $i);
}
function sql_FlagsCampo($i){
return mysqli_field_flags($this->_Result, $i);
}
function sql_TotalCampos(){
return mysqli_num_fields($this->_Result);
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
function select($table, &$puntero=NULL, $continuar=NULL){
$fields = implode(",", $this->fields);
if( empty($fields) ) $fields = "*";
$join = implode(" ", $this->join);
if( !empty($this->limit) ){
if( $this->_Sql=="oracle" ){
if( empty($this->where) ){
$this->where = " where {$this->limit}";
}else{
$this->where .= " and {$this->limit}";
}
$this->limit = "";
}
if( $this->_Sql=="sqlserver" ){
$fields = "{$this->limit}{$fields}";
}
}
$sql = "select {$fields} from {$table}{$join}{$this->where}{$this->group}{$this->having}{$this->order}{$this->limit}";
$this->reset();
eTrace($sql);
return $this->qQuery($sql, $puntero, $continuar);
}
function insert($table, &$puntero=NULL, $continuar=NULL){
$fields = implode(",", $this->fields);
$values = "'".implode("','", $this->values)."'";
$sql = "insert into {$table} ($fields) values ($values)";
$this->reset();
eTrace($sql);
return $this->qQuery($sql, $puntero, $continuar);
}
function update($table, &$puntero=NULL, $continuar=NULL){
$update = [];
$numArgs = count($this->fields);
for($i=0; $i<$numArgs; $i++){
if( gettype($this->values[$i])=="string" ){
$value = "'{$this->values[$i]}'";
}else if( gettype($this->values[$i])=="NULL" ){
$value = "NULL";
}else{
$value = $this->values[$i];
}
array_push($update, "{$this->fields[$i]}={$value}");
}
$update = implode(", ", $update);
$sql = "update {$table} set {$update} {$this->where}";
$this->reset();
eTrace($sql);
return $this->qQuery($sql, $puntero, $continuar);
}
function delete($table, &$puntero=NULL, $continuar=NULL){
$sql = "delete from {$table} {$this->where}";
$this->reset();
eTrace($sql);
return $this->qQuery($sql, $puntero, $continuar);
}
function count($table, &$puntero=NULL, $continuar=NULL){
$join = implode(" ", $this->join);
$sql = "select count(*) from {$table}{$join}{$this->where}{$this->group}{$this->having}";
$this->reset();
eTrace($sql);
$this->qQuery($sql, $puntero, $continuar);
return $this->qRow($puntero)[0];
}
function eachArray($table, $func){
$this->select($table, $pointer_);
if( gettype($func)=="string" ){
$txt_ = "";
$func_ = str_replace('"', '\\"', $func);
while($r_=$this->qArray($pointer_)){
foreach($r_ as $k_=>$v_){
${$k_} = $v_;
}
eval('$txt_.='."\"{$func_}\";");
}
return $txt_;
}
while($r=$this->qArray($pointer)){
$func($r);
}
}
function eachRow($table, $func){
$this->select($table, $pointer);
if( gettype($func)=="string" ){
$txt = "";
$func = str_replace(['"', '{$', '}'], ['\\"', '{$r[', ']}'], $func);
while($r=$this->qRow($pointer)){
eval('$txt.='."\"{$func}\";");
}
return $txt;
}
while($r=$this->qRow($pointer)){
$func($r);
}
}
function selectToArray($table, $field=null){
$dim = [];
$this->select($table, $pointer);
if( $field==null ){
while($r=$this->qRow($pointer)){
array_push($dim, $r);
}
return $dim;
}
while($r=$this->qArray($pointer)){
$pk = $r[$field];
unset($r[$field]);
$dim[$pk] = $r;
}
return $dim;
}
function values(){
$numArgs = func_num_args();
$valArgs = func_get_args();
$fields = [];
$values = [];
if( gettype($valArgs[0])=="array" ){
$numArgs = 0;
$dim = [];
foreach($valArgs[0] as $k=>$v){
if( $k[0]=="_" ){
continue;
}
array_push($dim, $k, $v);
$numArgs+=2;
}
$valArgs = $dim;
}
for($i=0; $i<$numArgs; $i+=2){
array_push($fields, $valArgs[$i+0]);
if( gettype($valArgs[$i+1])=="string" ){
$valArgs[$i+1] = $this->string($valArgs[$i+1]);
}else if( gettype($valArgs[$i+1])=="NULL" ){
$valArgs[$i+1] = NULL;
}
array_push($values, $valArgs[$i+1]);
}
$this->fields = $fields;
$this->values = $values;
return $this;
}
function where(){
$numArgs = func_num_args();
$valArgs = func_get_args();
if( $numArgs==1 ){
$type = gettype($valArgs[0]);
if( $type=="string" ){
$this->where = " where {$valArgs[0]}";
return $this;
}
if( $type=="array" ){
$numArgs = 0;
$dim = [];
foreach($valArgs[0] as $k=>$v){
if( $k[0]=="_" ){
continue;
}
array_push($dim, $k, "=", $v);
$numArgs+=2;
}
$valArgs = $dim;
}
}
$values = [];
$values[0] = [];
$index = 0;
for($i=0; $i<$numArgs; $i+=3){
if( gettype($valArgs[$i+0])=="array" ){
$dim = [];
for($n=0; $n<count($valArgs[$i]); $n+=3){
$type1 = gettype($valArgs[$i][$n+1]);
if( $type1=="array" ){
$dim2 = [];
for($j=0; $j<count($valArgs[$i][$n+1]); $j+=2){
$condition = $this->condition($valArgs[$i][$n+1][$j+0], $valArgs[$i][$n+1][$j+1]);
array_push($dim2, "{$valArgs[$i][$n+0]}{$condition}");
}
array_push($dim, implode(" or ", $dim2));
$n--;
continue;
}
$condition = $this->condition($valArgs[$i][$n+1], $valArgs[$i][$n+2]);
array_push($dim, "{$valArgs[$i][$n+0]}{$condition}");
}
array_push($values[$index], "(".implode(" or ", $dim).")");
$i-=2;
continue;
}
if( $valArgs[$i]=="or" ){
$index++;
$values[$index] = [];
$i-=2;
continue;
}
$type1 = gettype($valArgs[$i+1]);
if( $type1=="array" ){
$dim = [];
for($n=0; $n<count($valArgs[$i+1]); $n+=2){
$condition = $this->condition($valArgs[$i+1][$n+0], $valArgs[$i+1][$n+1]);
array_push($dim, "{$valArgs[$i+0]}{$condition}");
}
array_push($values[$index], "(".implode(" or ", $dim).")");
$i--;
continue;
}
if( $type1=="object" ){
array_push($values[$index], "{$valArgs[$i+0]}{$valArgs[$i+1]->scalar}");
$i--;
continue;
}
$condition = $this->condition($valArgs[$i+1], $valArgs[$i+2]);
array_push($values[$index], "{$valArgs[$i+0]}{$condition}");
}
for($i=0; $i<=$index; $i++){
$values[$i] = implode(" and ", $values[$i]);
}
if( $index>0 ){
$this->where = "(".implode(") or (", $values).")";
}else{
$this->where = $values[0];
}
if( !empty($this->where) ){
$this->where = " where ".$this->where;
}
return $this;
}
function join($table){
$numArgs = func_num_args();
$valArgs = func_get_args();
$values = [];
for($i=1; $i<$numArgs; $i+=2){
array_push($values, "{$valArgs[$i+0]}={$valArgs[$i+1]}");
}
$this->join[] = " left join {$table} on ".implode(" and ", $values);
return $this;
}
function order(){
$order = implode(", ", func_get_args());
if( !empty($order) ){
$order = " order by ".$order;
}
$this->order = $order;
return $this;
}
function group(){
$group = implode(", ", func_get_args());
if( !empty($group) ){
$group = " group by ".$group;
}
$this->group = $group;
return $this;
}
function having(){
$having = implode(" and ", func_get_args());
if( !empty($having) ){
$having = " having ".$having;
}
$this->having = $having;
return $this;
}
function limit($leng){
if( $this->_Sql=="mysqli" ){
$this->limit = " limit {$leng}";
}
if( $this->_Sql=="informix" ){
$this->limit = " limit {$leng}";
}
if( $this->_Sql=="oracle" ){
$this->limit = " rownum<={$leng}";
}
if( $this->_Sql=="sqlserver" ){
$this->limit = "TOP {$leng} ";
}
return $this;
}
function field($field){
$this->field = $field;
return $this;
}
function in($table){
return (object)" in (select {$this->field} from {$table}{$this->where})";
}
function notIn($table){
return (object)" not in (select {$this->field} from {$table}{$this->where})";
}
private function reset(){
$this->fields = [];
$this->values = [];
$this->where  = "";
$this->order  = "";
$this->field  = "";
$this->notIn  = "";
$this->index  = 0;
$this->join   = [];
$this->group  = "";
$this->having = "";
$this->limit  = "";
}
private function string($txt){
if( $this->_Sql=="oracle" ){
return str_replace("'", "''", $txt);
}else{
return str_replace("'", "\'", $txt);
}
}
private function condition($condition, $value){
$type = gettype($value);
if( $type=="NULL" ){
if( $condition=="=" || $condition=="is" ){
$condition = " is ";
}else if( $condition=="is not" ){
$condition = " is not ";
}
$condition = "{$condition}NULL";
}else if( $condition=="like" || $condition=="not like" ){
$value = str_replace(
["*", "?"]
,["%", "_"]
,$value
);
$condition = " {$condition} '{$value}')";
}else if( $condition=="in" || $condition=="not in" ){
$condition = " {$condition} ({$value})";
}else if( $type!="string" ){
$condition = "{$condition}{$value}";
}else{
$value = $this->string($value);
$condition = "{$condition}'{$value}'";
}
return $condition;
}
}
?>