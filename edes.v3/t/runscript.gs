<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
$_DirG = ''; //include_once($Dir_.'t/lp.gs');
include_once('../_d_/cfg/edes.ini');
if( eSubstrCount(',mysqli,mysql,mysqli,informix,oracle,pdo,',"{$_Sql},")==0 ) die("ERROR: Controlador '{$_Sql}' no implantado");
$Todo = file_get_contents( '../_d_/usr/runscript.'.$_User );
$Todo = str_replace( '{#ENTER#}','\n', $Todo );
$Todo = str_replace('&gt;','>', $Todo );
$Todo = str_replace('&lt;','<', $Todo );
$Todo = str_replace('&quot;','"', $Todo );
$Todo = str_replace('&#39;',"'", $Todo );
$Todo = str_replace('&#92;',"\\", $Todo );
$Todo = str_replace('&#43;',"+", $Todo );
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$xSql = 'sql';
$Dim = explode("\n",$Todo);
if( mb_substr(mb_strtoupper(trim($Dim[0])),0,3)=='DB:' ){
list(,$xSql) = explode(':',$Dim[0]);
$xSql = trim($xSql);
if( mb_substr($xSql,-1)==';' ) $xSql = mb_substr($xSql,0,-1);
$xSql = trim($xSql);
$Todo = str_replace($Dim[0],'',$Todo);
}
$tmpFile = "../_datos/config/{$xSql}.ini";
include($tmpFile);
include( $Dir_.$_Sql.'.inc' );
}
file_put_contents( '../_d_/usr/runscript.'.$_User.'.source', $Todo );
if( trim($Todo)=='' ) exit;
if( mb_substr(ltrim($Todo),0,2)=='<'.'?' ){
eTrace('PHP');
include( '../_d_/usr/runscript.'.$_User.'.source' );
?>
<script>
top.S.info('RunScript Ejecutado', 3);
</script>
<?PHP
eEnd();
}else{
eTrace('SQL');
}
$FUENTE = str_replace(CHR13 ,'' , $Todo);
$Dim = explode("\n", $FUENTE);
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n][0] == '.' ){
$Dim[$n] = '';
}else if( mb_substr($Dim[$n],0,2) == REM ){
$Dim[$n] = '';
}else if( mb_substr($Dim[$n],0,2) == '/'.'*' ){
for( $i=$n; $i<count($Dim); $i++ ){
if( mb_substr($Dim[$i],0,2) == '*'.'/' ){
$Dim[$i] = '';
break;
}else{
$Dim[$i] = '';
}
}
}else if( mb_strtoupper(mb_substr($Dim[$n],0,6)) == '[NOTE]' ){
for( $i=$n; $i<count($Dim); $i++ ) $Dim[$i] = '';
}
}
$FUENTE = '';
for( $n=0; $n<count($Dim); $n++ ) if( $Dim[$n]!='' ) $FUENTE .= $Dim[$n].' ';
if( $FUENTE!='' ){
$exe_sql = str_replace("\t",' ',$FUENTE);
$exe_sql = stripslashes($exe_sql);
$tmp = split_sql($exe_sql);
$ExeSQL = stripslashes($tmp[0]);
}
$_ToExcel = false;
$_ToPDF = false;
$_TH = array();
$_EditStructure = '';
$_MemCursor = false;
$_DirEDes = $Dir_;
$Limit = '';
if( $FUENTE!='' ){
$IniSQL = true;
for( $w=0; $w<count($tmp); $w++ ){
$ExeSQL = trim(stripslashes($tmp[$w]));
if( preg_match("/^DB:/u",$ExeSQL) ){
$IniSQL = false;
break;
}
}
if( $IniSQL ){
include_once($_DirEDes.$_Sql.'.inc');
list($_SqlPDOType) = explode(':', $_SqlPDOConnect);
}
$_Variable = array();
for($w=0; $w<count($tmp); $w++){
$_SaveSQL = false;
$_SQLUpdate = false;
$ExeSQL = trim(stripslashes($tmp[$w]));
if( mb_substr($ExeSQL,-1)==';' ) $ExeSQL = trim(mb_substr($ExeSQL,0,-1));
$SinLimit = ($ExeSQL[0]=='=');
if( $SinLimit ) $ExeSQL = trim( mb_substr($ExeSQL,1) );
if( trim($ExeSQL)=='' ) continue;
if( $w > 0 && !preg_match("/^TH:/u", $ExeSQL)==false ) echo '<br>';
if( $ExeSQL=='-' ){
echo '<HR>';
continue;
}
$GLOBALS['_DEBUG'] = -1;
foreach($_Variable as $key=>$value){
if( is_array($value) ){
foreach($value as $k2=>$v2){
if( eSubstrCount($ExeSQL,'{'.$key.'['.$k2.']}')>0 ) $ExeSQL = str_replace('{'.$key.'['.$k2.']}', $v2, $ExeSQL);
}
}else{
if( eSubstrCount($ExeSQL,'{'.$key.'}')>0 ) $ExeSQL = str_replace('{'.$key.'}', $value, $ExeSQL);
}
}
if( preg_match("/^TH:/u", $ExeSQL) ){
$_TH = explode(',',mb_substr($ExeSQL,3));
continue;
}
$_VerBlob = false;
$_WidthBlob = 400;
if( preg_match("/^BLOB:/u", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,5));
$_VerBlob = true;
}else if( preg_match("/^BLOB,/u", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,5));
$_WidthBlob = (int)mb_substr( $ExeSQL,0,mb_strpos($ExeSQL,':') );
$ExeSQL = trim(mb_substr( $ExeSQL,mb_strpos($ExeSQL,':')+1 ));
$_VerBlob = true;
}
$ExeSQL = trim($ExeSQL);
if( preg_match("/^SELECT /iu", $ExeSQL) || ( preg_match("/SELECT /iu",$ExeSQL) && (preg_match("/^EXCEL:/iu",$ExeSQL) || preg_match("/^XLS:/iu",$ExeSQL) || preg_match("/^PDF:/iu",$ExeSQL) || preg_match("/^XML:/iu",$ExeSQL) || preg_match("/^CSV:/iu",$ExeSQL) || preg_match("/^TXT:/iu",$ExeSQL)) ) ){
if(		  preg_match("/^EXCEL:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,6));
$_ToExcel = true;
}else if( preg_match("/^XLS:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,4));
$_ToExcel = true;
}else if( preg_match("/^XML:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,4));
$_ToXML = true;
}else if( preg_match("/^CSV:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,4));
$_ToCSV = true;
}else if( preg_match("/^TXT:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,4));
$_ToTXT = true;
}else if( preg_match("/^PDF:/iu", $ExeSQL) ){
$ExeSQL = trim(mb_substr($ExeSQL,4));
$_ToPDF = true;
}
if( $_MemCursor ){
sql_Query($ExeSQL);
$_Variable[$Nombre] = qArray();
$_MemCursor = false;
}
sql_Query($ExeSQL);
}else if( preg_match("/^UPDATE /iu", $ExeSQL) || preg_match("/^DELETE /iu", $ExeSQL) || preg_match("/^INSERT /iu", $ExeSQL) ){
$_SQLUpdate = true;
sql_Query($ExeSQL);
}else if( preg_match("/^CREATE /iu", $ExeSQL) || preg_match("/^DROP /iu", $ExeSQL) || preg_match("/^ALTER /iu", $ExeSQL) || preg_match("/^RENAME /iu", $ExeSQL) ){
set_time_limit( 0 );
$_SQLUpdate = true;
if( $_Sql=='oracle' && preg_match("/^CREATE /iu", $ExeSQL) && eSubstrCount(mb_strtoupper($ExeSQL), ' SERIAL')>0 ){
CreaSerial( $ExeSQL );
}
if( eSqlType('mysql,mysqli') && preg_match("/^DROP /iu", $ExeSQL) && !preg_match("/ IF EXISTS /u", $ExeSQL) ) $ExeSQL = 'DROP TABLE IF EXISTS '.mb_substr($ExeSQL,mb_strrpos($ExeSQL,' ')+1);
sql_Query( $ExeSQL );
}else if( $ExeSQL[0]=='$' ){
$i = mb_strpos( $ExeSQL, '=' );
$Nombre = trim(mb_substr($ExeSQL,0,$i));
$Valor = trim(mb_substr($ExeSQL,$i+1));
if( mb_substr($Valor,-1)==';' ) $Valor = trim(mb_substr($Valor,0,-1));
if( $Valor[0]=='"' || $Valor[0]=="'" ) $Valor = mb_substr($Valor,1,-1);
$_Variable[$Nombre] = $Valor;
if( preg_match("/^SELECT /iu",$Valor) ){
$tmp[$w] = $Valor;
$w--;
$_MemCursor = true;
}
}else{
die( 'ERROR: '.$ExeSQL );
}
}
}
?>
<script>
top.S.info('RunScript Ejecutado', 3);
</script>
<?PHP
eEnd();
function split_sql( $sql ){
$sql = trim($sql);
$buffer = array();
$ret = array();
$in_string = false;
for($i=0; $i<mb_strlen($sql); $i++){
if( $sql[$i]==';' && !$in_string ){
$ret[] = trim(mb_substr($sql, 0, $i));
$sql = mb_substr($sql, $i+1);
$i = 0;
}
if( mb_substr($sql,$i,2)=='=;' ){
$ret[] = '=;';
$sql = mb_substr($sql, $i+2);
$i = 0;
$in_string = true;
}
if( $in_string && ($sql[$i]==$in_string) && $buffer[0]!="\\" ){
$in_string = false;
}else if( !$in_string && ($sql[$i]=="\"" || $sql[$i]=="'") && (!isset($buffer[0]) || $buffer[0]!="\\") ){
$in_string = $sql[$i];
}
if( isset($buffer[1]) ) $buffer[0] = $buffer[1];
$buffer[1] = $sql[$i];
}
if( $sql<>"" ){
$ret[] = trim($sql);
}
return($ret);
}
function CreaSerial( &$sql ){
global $_SqlUsuario;
$NomTabla = '';
$tabla = '';
list($tabla) = explode('(',$sql);
$tabla = trim($tabla);
$tabla = str_replace('  ',' ',$tabla);
$tmp = explode(' ',$tabla);
$NomTabla = $tmp[count($tmp)-1];
if( eSubstrCount($NomTabla,'.')==1 ) list(,$NomTabla) = explode('.',$NomTabla);
$f = mb_strpos( mb_strtoupper($sql), ' SERIAL' );
$xSerial = mb_substr($sql,$f,7);
$sql = str_replace($xSerial,'',$sql);
if( $NomTabla!='' ){
$uSqlUsuario = mb_strtoupper($_SqlUsuario);
$uNomTabla = mb_strtoupper($NomTabla);
if( sql_Cuenta('all_sequences', "SEQUENCE_NAME='SQ{$uNomTabla}' and SEQUENCE_OWNER='{$uSqlUsuario}'" ) == 1 ){
sql_Query( "drop sequence {$_SqlUsuario}.SQ".$uNomTabla );
}
$Secuencia = "CREATE SEQUENCE {$_SqlUsuario}.sq{$NomTabla} START WITH 1 INCREMENT BY 1 MINVALUE 0 CACHE 4 NOCYCLE ORDER";
sql_Query( $Secuencia );
echo "Ok sequence {sq{$NomTabla}}<br>";
}
}
function AMayusculas( $txt ){
$Letras = array( array('á','A'),array('é','E'),array('í','I'),array('ó','O'),array('ú','U'),array('ü','Ü'),array('ñ','Ñ'), array('&EURO;','EUR') );
$txt = mb_strtoupper( $txt );
for( $i=0; $i<count($Letras); $i++ ) $txt = str_replace( $Letras[$i][0], $Letras[$i][1], $txt );
return $txt;
}
function EnPlural( $Titulo, $Delante, $EnPlural ){
if( $Titulo[0]=='$' ){
$Titulo = $GLOBALS[mb_substr($Titulo,1)];
}
while( eSubstrCount($Titulo,'{$') > 0 ){
$p = mb_strpos( $Titulo, '{$' );
$tmp = mb_substr($Titulo,$p,mb_strpos($Titulo, '}')-$p+1);
$Titulo = str_replace($tmp,$GLOBALS[mb_substr($tmp,2,-1)],$Titulo);
}
$Titulo = str_replace('"',"'",$Titulo);
if( eSubstrCount( $Titulo, '/' ) > 0 ){
$sTitulo = '';
$sc = '';
if( $EnPlural ){
for( $i=0; $i<mb_strlen($Titulo); $i++ ){
$c = mb_substr( $Titulo,$i, 1 );
if( !($sc != '<' && $c=='/') ) $sTitulo .= $c;
$sc = $c;
}
}else{
$Mem = true;
for( $i=0; $i<mb_strlen($Titulo); $i++ ){
$c = mb_substr( $Titulo,$i, 1 );
if( $sc != '<' && $c=='/' ){
$Mem = false;
}else if( eSubstrCount(' .,:;()',$c) > 0 ){
$Mem = true;
}
if( $Mem ) $sTitulo .= $c;
$sc = $c;
}
}
$Titulo = $sTitulo;
}
$Pregunta = false;
$pos = mb_strpos($Titulo,'#');
if( $pos === false ){
}else{
if( mb_substr($Titulo,$pos-1,1)!='&' || $pos==0 ){
$Titulo = mb_substr($Titulo,0,$pos).$Delante.mb_substr($Titulo,$pos+1);
$Pregunta = true;
}
}
if( ($Delante=='QUE' || $Delante=='SELECCIONA') && $Pregunta ){
if( $Titulo[0]!='<' ){
$Titulo = '¿&nbsp;'.$Titulo;
}else{
for( $i=0; $i<mb_strlen($Titulo); $i++ ){
if( mb_substr( $Titulo,$i, 1 )=='>' ){
$Titulo = mb_substr( $Titulo,0,$i+1 ).'¿&nbsp;'.mb_substr( $Titulo,$i+1 );
break;
}
}
}
if( mb_substr($Titulo,-1)!='>' ){
$Titulo .= '&nbsp;?';
}else{
for( $i=mb_strlen($Titulo)-1; $i>0; $i-- ){
if( mb_substr( $Titulo,$i, 1 )=='<' ){
$Titulo = '&nbsp;?'.mb_substr( $Titulo, $i );
break;
}
}
}
}
$sTitulo = $Titulo;
$Titulo = '';
$ok = true;
for( $i=0; $i<mb_strlen($sTitulo); $i++ ){
$c = mb_substr( $sTitulo,$i, 1 );
if( $c=='<' && $ok ){
$ok = false;
}else if( $c=='>' && !$ok ){
$ok = true;
}else if( $ok ){
if( $c==' ' ) $c = '&nbsp;';
}
$Titulo .= $c;
}
return $Titulo;
}
function Mensaje( $texto, $Accion, $sgMensage, $exe='', $_MessageType='OK' ){
eMessage( $texto, $Accion, $sgMensage, $exe='', $_MessageType='OK' );
}
function eMessage( $texto, $Accion, $sgMensage, $exe='', $_MessageType='OK' ){
global $_User;
eInit();
?>
<script>
location.href = "edes.php?D:/_tmp/pdf/lst_<?= $_User ?>.xls";
</script>
<?PHP
eEnd();
}
function getMicrotime() {
list($milisegundos,$segundos) = explode(" ",microtime());
return ( (float)$milisegundos + (float)$segundos );
}
?>