<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
if(!$_ENV[SYS]['RegisterShutdown']){
register_shutdown_function('_ExitPHP');
$_ENV[SYS]['RegisterShutdown'] = true;
}
$test = false;
$i = mb_strpos($argv[0],'CallSrv=')+8;
$f = mb_strpos($argv[0],'&');
$Fichero = mb_substr($argv[0], $i, $f-$i);
include_once($Dir_.$_Sql.'.inc');
list( $_SqlPDOType ) = explode(':', $_SqlPDOConnect);
$argv[0] = mb_substr($argv[0],mb_strpos($argv[0],'|')+1);
$_SERVER['QUERY_STRING'] = $argv[0];
$__EXE = '';
unset($_REQUEST['E:CallSrv']);
unset($_GET['E:CallSrv']);
foreach($_GET as $k=>$v){
$v = stripslashes(urldecode($v));
if( mb_strlen($v)>=2 ){
if( ($v[0]=='"' || $v[0]=="'" ) and mb_substr($v,-1)==$v[0] ) $v = mb_substr($v,1,-1);
}
$_REQUEST[$k] = $v;
$_GET[$k] = $v;
${$k} = $v;
if( $__EXE=='' ) $__EXE = $k;
}
if( $test ){
eTrace( 'Fichero: '.$Fichero ); eTrace('QUERY_STRING: '.$_SERVER['QUERY_STRING']);
for( $i=0; $i<count($argv); $i++ ) eTrace('Argv['.$i.']: '.$argv[$i]);
}
$oFichero = $Fichero;
$Fichero = eScript($Fichero);
if( $test ){
eTrace( 'Fichero: '.$Fichero );
eTrace( '$argv[0]: '.$argv[0] );
eTrace( '$argv[0].Valor: '.$__EXE );
eTrace( '' );
}
if( mb_substr($Fichero,-4)=='.php' ) $Fichero = mb_substr($Fichero,0,-4).'_callsrv.gs';
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
if( !isset($_LNGCOL) ) $_LNGCOL = 1;
if( !isset($_LNGCOLDEFAULT) ) $_LNGCOLDEFAULT = 1;
$_CALLSRV = '';
$NO = '';
$txt = '';
$Ok = false;
$TipoEntrada = '#';
$Chr_1 = '';
$_DimEDF = @OpenDF($Fichero);
$ElPuntoEsRem = true;
for($n=0; $n<count($_DimEDF); $n++){
$buffer = trim($_DimEDF[$n]);
if( !@LeeDF($buffer, array('#NO#'), $_Variable, $NO, $NO, $Chr_1, $NO, $NO, $NO, $NO, $NO, $NO, $TipoEntrada, $NO, $NO) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
if( $_CallLabel!="" && $Chr_1!='[' ){
call_user_func("eCall_".$_CallLabel, null, $buffer);
continue;
}
$_CallLabel = "";
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
$nDimFCH--;
$buffer='';
}
if( $Chr_1=='[' ){
if( mb_substr(mb_strtoupper($buffer),0,8)=='[PLUGIN]' ){
$tmp = explode('|', mb_substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$tmp[1] = str_replace(CHR92,'/',$tmp[1]); $sTmp = explode('/',$tmp[1]); $tmp[1] = $sTmp[count($sTmp)-1];
if( count($tmp)==3 ){
$_PLUGIN[trim($tmp[1])] = trim($tmp[2]);
}else if( count($tmp)>3 ){
for($i=2; $i<count($tmp); $i++) $_PLUGIN[trim($tmp[1])][$i-2] = trim($tmp[$i]);
}
$Chr_1 = '#';
}else if( $buffer=="[" || mb_substr($buffer,1,1)=="'" || mb_substr($buffer,1,1)=='"' || (((int)mb_substr($buffer,1,1))."")===mb_substr($buffer,1,1) ){
$Chr_1=' ';
}else if( !preg_match('/^[A-Za-z]{0,}[2]{0,1}$/u', mb_substr($buffer, 1, mb_strpos($buffer,']')-1)) ){
$Chr_1 = '#';
}
}
if( $Chr_1=='#' ){
if( mb_substr(mb_strtoupper($buffer),0,9)=='#INCLUDE(' ){
list( $buffer, $VerError ) = explode('|',$buffer);
while( eSubstrCount($buffer,'{$') > 0 ){
$p = mb_strpos( $buffer, '{$' );
$tmp = mb_substr($buffer,$p,mb_strpos($buffer, '}')-$p+1);
$index = mb_substr($tmp,2,-1);
if( $GLOBALS[$index]!='' ){
$buffer = str_replace($tmp,$GLOBALS[$index],$buffer);
}else{
$buffer = str_replace($tmp, SESS::${$index},$buffer);
}
}
list( $cModo, $DirFile ) = explode(')',str_replace(' ','',$buffer));
$DirFile = mb_strtolower($DirFile);
if( true || eOkMode( $Opcion, mb_substr($cModo,9) ) ){
if( trim(mb_strtoupper($DirFile)=='LNG' ) ){
$tmp = explode('/',str_replace(CHR92,'/',$oFichero));
$DirFile = (($oFichero[0]=='$')?'$':'').'lng/'.$tmp[count($tmp)-1].'.lng';
}
$tmp = eScript(trim($DirFile));
if( file_exists($tmp) ){
$txt = file_get_contents($tmp);
if( mb_substr($tmp,-4)=='.zdf' ){
if( mb_substr($txt,0,5)=='eDes ' ){
$iDimEDF = explode( "\n", gzuncompress(mb_substr($txt,5)) );
}else{
$iDimEDF = explode( "\n", $txt );
}
$txt = '';
}else{
$iDimEDF = file($tmp);
}
if( trim(mb_strtoupper($DirFile)=='LNG' ) ) $iDimEDF[] = '[.]';
for( $c=0; $c<count($iDimEDF); $c++ ){
$tmp = ltrim($iDimEDF[$c]);
if( $tmp[0]=='[' && mb_substr(mb_strtoupper($tmp),0,6)=='[NOTE]' ){
for( $i=$c; $i<count($iDimEDF); $i++ ) $iDimEDF[$i] = '';
break;
}
}
$tDim = array_slice($_DimEDF,0,$n);
$tDim = array_merge($tDim,$iDimEDF);
$tDim = array_merge($tDim,array_slice($_DimEDF,$n+1));
$_DimEDF = $tDim;
unset($tDim);
}else if( mb_strtoupper(trim($VerError))!='TRUE' ) eTrace("ERROR: Fichero {$tmp} no encontrado");
}
continue;
}
}
$ordChar = (empty($Chr_1)) ? 32 : mb_ord($Chr_1);
switch( $ordChar ){
case 91:
$sElPuntoEsRem = true;
$ElPuntoEsRem = true;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'CC':
eExplodeOne($buffer, '|', $txt1, $txt2);
$_Variable[$tmp[0]] = _ExeEval($txt2, $buffer);
break;
case 'LANGUAGE':
$_LANGUAGE = array();
$tmp2 = explode( ',', trim(str_replace(' ','',$tmp[0])) );
for( $i=0; $i<count($tmp2); $i++ ){
if( $tmp2[$i]==SESS::$_LANGUAGE_ ) $_LNGCOL = $i+1;
if( $tmp2[$i]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $i+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad('../_datos/config/language.lng', '', 2);
break;
case 'CALLSRV':
list(,$Tipo) = explode(']',$buffer);
if( $__EXE==trim($Tipo) ) $TipoEntrada = '_CALLSRV';
break;
case 'NOTE':
case 'EXIT':
break 3;
case 'PLUGIN':
$tmp = explode('|', mb_substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$_DimEDF[$n] = $buffer;
$n--;
continue;
}
break;
case   0:
case  10:
case 123:
break;
default:
switch( $TipoEntrada ){
case '#':
break;
case '_LANGUAGE':
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
break;
case '_CALLSRV':
$_CALLSRV .= $buffer.$__Enter;
break;
}
}
}
if( !$test ) eInit();
$tmpFile = GrabaTmp('callsrv_'.$argv[0], $_CALLSRV, $LenDoc);
$callSrvKO = (trim($_CALLSRV)=="");
unset( $n );
unset( $i );
unset( $f );
unset( $NO );
unset( $Chr_1 );
unset( $_CALLSRV );
unset( $TipoEntrada );
unset( $_DimEDF );
unset( $test );
unset( $tmp );
unset( $Clave );
eHTML("E:{$oFichero}", $__EXE);
echo '</head><body>';
if( isset($_GET["_FILTERSUBLIST"]) ){
$_ENV["indexUsuCursor"] = -1;
$data = json_decode(html_entity_decode($_GET["_FILTERSUBLIST"]));
foreach($_GET as $key=>$value){
$ReloadSubList = $value;
break;
}
foreach($data as $key=>$value){
$$key = $value;
}
}
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
if( isset($_GET["_FILTERSUBLIST"]) ){
$total = 0;
echo "<script>";
echo "var  _WOPENER = window.frameElement.WOPENER";
echo ",id = '{$ReloadSubList}', i,t";
echo ",data = [";
while( $r=eGetRow() ){
if( $total>0 ) echo ",";
for($n=0; $n<count($r); $n++){
$r[$n] = addslashes($r[$n]);
}
echo '["'.implode('","', $r).'"]';
$total++;
}
echo "];";
?>
t = data.length;
for(i=0; i<t; i++){
_WOPENER.eSubListInsert(id, data[i]);
}
<?PHP
echo "</script>";
}
echo '</body></html>';
eEnd();
function eGetRow(){
global $usuCursor;
if( isset($usuCursor) ){
$_ENV["indexUsuCursor"]++;
return $usuCursor[$_ENV["indexUsuCursor"]];
}else{
return qRow();
}
}
?>