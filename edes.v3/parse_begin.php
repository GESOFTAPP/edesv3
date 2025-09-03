<?PHP
$_ENV["mode"] = $_Mode;
@include("../_datos/config/include.php");
$getPhpStart = false;
$ElPuntoEsRem = true;
$phpStartUnique = false;
$xPhpStart = "";
$total = count($_DimEDF);
for($nDimFCH=0; $nDimFCH<$total; $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
$_DimEDF[$nDimFCH] = $buffer;
$oldNextLine = $next_Line;
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
$_DimEDF[$nDimFCH] = "";
continue;
}
$_DimEDF[$nDimFCH] = $buffer;
if( $Chr_1=="[" ){
if( $buffer=="[" || mb_substr($buffer,1,1)=="'" || mb_substr($buffer,1,1)=='"' || (((int)mb_substr($buffer,1,1))."")===mb_substr($buffer,1,1) ){
$Chr_1=' ';
continue;
}
$ElPuntoEsRem = true;
if( $getPhpStart ){
if( !($phpStartUnique && in_array(md5($xPhpStart), $_FILE_PHPSTART)) ){
array_push($_FILE_PHPSTART, md5($xPhpStart));
$_PHPSTART .= $xPhpStart.$__Enter;
if( $_PHPSTART!="" ){
$tmpFile = GrabaTmp(mb_strtolower($_gsObjeto).'_phpstart', $_PHPSTART, $LenDoc, end($_FILE_PHPSTART));
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_PHPSTART = "";
}
}
$xPhpStart = "";
$phpStartUnique = false;
}
$getPhpStart = false;
if(		  preg_match('/^\[PHPSTART\]/iu', $buffer) ){
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
if( !$OkModo ) continue;
if( $tmp[2]!='' && mb_strtoupper($tmp[2])!='UNIQUE' ){
if( $tmp[2][0]=="#" ){
if( !$_Variable[$tmp[2]] ) continue;
}else{
if( !eval("return {$tmp[2]};") ) continue;
}
}
if( $tmp[1]!='' && eSubstrCount($tmp[1], $_PSOURCE)==0 && !($_PHPSTART=='' && mb_strtoupper($tmp[1])=='ELSE') ){
continue;
}
if( mb_strtoupper($tmp[2])=='UNIQUE' ){
if( isset($_getPhpStart[$nDimFCH.$buffer]) ){
continue;
}else{
$_getPhpStart[$nDimFCH.$buffer] = true;
}
$phpStartUnique = true;
}
$getPhpStart = true;
$_DimEDF[$nDimFCH] = "";
}else if( preg_match('/^\[DB\]/iu', $buffer) ){
if( $_GET['_DB']=='NO' ){
$_DimEDF[$nDimFCH] = "";
continue;
}
$_OtroDiccionario = true;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
$_DBBuffer = $tmp[0];
$_DimEDF[$nDimFCH] = "";
$defaultSql = false;
if( $_DBBuffer!='' ){
$tmp[0] = eNsp($_DBBuffer);
if( eSubstrCount($tmp[0], ',')==0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(mb_substr($tmp[0],1));
$_DB = $tmp[0];
if( SESS::$sql['file']!=$_DB ){
if( eSubstrCount(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( eSubstrCount($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
if( $tmp[0][0]=='~' ){
$_SqdDefinitionFile = str_replace('~', '../..', $tmp[0]);
}else{
$_SqdDefinitionFile = eScript($tmp[0]);
}
include($_SqdDefinitionFile);
}else{
$defaultSql = true;
}
}else{
list($_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect) = explode(',', $tmp[0]);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list($_Sql, $_SqlPDOType) = explode(':', eNsp($_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
unset($_DBBuffer);
}else{
if( $_GET["_SPIDER_"]=="E" ){
SESS::$spider['opcion'] = "E";
if( !function_exists("__SpiderScript") ) include($Dir_."itm/spider.php");
$filePnt = str_replace(
array("_1.edf", "../_tmp/log/"),
array("_0.pnt", "../d/_spider/"),
$_Script_
);
$dim = file($filePnt);
SESS::$spider['file'] = array();
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])<>"" ){
list($md, $fl) = explode("=", $dim[$n]);
SESS::$spider['file'][$md] = trim($fl);
}
}
$_Sql = "spider";
}else{
$defaultSql = true;
}
}
if( $defaultSql ){
$_Sql 				= SESS::$sql['driver'];
$_SqlHostName 		= SESS::$sql['hostname'];
$_SqlDiccionario 	= SESS::$sql['database'];
$_SqlUsuario 		= SESS::$sql['user'];
$_SqlPassword 		= SESS::$sql['password'];
$_SqlTransaction 	= SESS::$sql['transaction'];
$_SqlInit 			= SESS::$sql['init'];
$_SqlPDOType 		= SESS::$sql['pdoType'];
$_SqlPDOConnect 	= SESS::$sql['pdoConnect'];
}
if( function_exists('qQuery') ){
if( eSqlType('mysql,mysqli') ){
mysqli_select_db($_HndDB, $_SqlDiccionario);
}else{
ePrintR("Error: 73PW");
}
}else{
include_once(DIREDES.$_Sql.'.inc');
}
}else if( preg_match('/^\[PLUGIN\]/iu', $buffer) ){
$tmp = explode('|', mb_substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$tmp[1] = str_replace(CHR92,'/',$tmp[1]); $sTmp = explode('/',$tmp[1]); $tmp[1] = $sTmp[count($sTmp)-1];
if( count($tmp)==3 ){
$_PLUGIN[trim($tmp[1])] = trim($tmp[2]);
}else if( count($tmp)>3 ){
for($i=2; $i<count($tmp); $i++){
$_PLUGIN[trim($tmp[1])][$i-2] = trim($tmp[$i]);
}
}
$Chr_1 = '#';
$_DimEDF[$nDimFCH] = $buffer;
$nDimFCH--;
continue;
}else if( preg_match('/^\[CC\]/iu', $buffer) ){
eExplodeOne($buffer, '|', $txt1, $txt2);
list(,$txt1) = explode("]", $txt1);
$_Variable[trim($txt1)] = _ExeEval($txt2, $buffer);
$_DimEDF[$nDimFCH] = "";
}else if( preg_match('/^\[LANGUAGE\]/iu', $buffer) ){
eExplodeOne($buffer, "]", $label, $parameter);
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
$tmp2 = explode(',', trim(eNsp($parameter)));
for($n=0; $n<count($tmp2); $n++){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( !empty($tmp[2]) && (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ){
$_LanguageTron = '~';
}
if( !empty($tmp[1]) && (mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1') ){
eLngLoad('../_datos/config/language.lng', '', 2);
}
$_DimEDF[$nDimFCH] = "";
for($n=$nDimFCH+1; $n<count($_DimEDF); $n++){
$buffer = trim($_DimEDF[$n]);
if( empty($buffer) || $buffer[0]=="." || mb_substr($buffer,0,2)==REM ){
continue;
}
if( $buffer[0]=="[" || $buffer[0]=="#" || $buffer[0]=="¿" ){
$nDimFCH = $n-1;
break;
}
$_DimEDF[$n] = "";
list($buffer) = explode('~', $buffer);
$tmp = explode('|', $buffer);
$Clave = trim($tmp[0]);
$txt = (!empty($tmp[$_LNGCOL])) ? trim($tmp[$_LNGCOL]) : "";
if( empty($txt) ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'", '&amp;', str_replace('"', '&quot;', $txt));
$_LANGUAGE[] = array('@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron);
}
}else if( preg_match('/^\[NOTE\]/iu', $buffer) ){
for($i=$nDimFCH; $i<count($_DimEDF); $i++){
$_DimEDF[$i] = '';
}
break;
}else if( preg_match('/^\[(LOADINI|LOADSEL)\]/iu', $buffer) ){
$_DimEDF[$nDimFCH] = "";
}else if( preg_match('/^\[CSSADD\]/iu', $buffer) ){
$ElPuntoEsRem = false;
}else if( preg_match('/^\[POINTNOTREM\]/iu', $buffer) ){
$_ENV[SYS]["NOREM"] = true;
}else if( preg_match('/^\[EXIT\]/iu', $buffer) ){
break;
}
}else if( $getPhpStart ){
if( $buffer=="" && $_DEBUG!=2 ) continue;
if( $Chr_1=='#' && mb_substr(mb_strtoupper($buffer),0,9)=='#INCLUDE(' ){
$getPhpStart = false;
$nDimFCH--;
continue;
}
$xPhpStart .= $buffer.$__Enter;
$_DimEDF[$nDimFCH] = "";
}else if( $Chr_1=='#' && mb_substr(mb_strtoupper($buffer),0,9)=='#INCLUDE(' ){
list($buffer, $VerError) = explode('|', $buffer."");
$buffer = _InVar($buffer);
list($cModo, $DirFile) = explode(')', eNsp($buffer));
list(, $cModo) = explode('(', $cModo);
$DirFile = trim(mb_strtolower($DirFile));
if( !eOkMode($Opcion, $cModo) ){
$_DimEDF[$nDimFCH] = "";
continue;
}
if( trim(mb_strtoupper($DirFile)=='LNG' ) ){
if( $OriFichero[0]=='$' ){
$tmp = explode('/', str_replace(CHR92, '/', $OriFichero));
$DirFile = '$lng/'.$tmp[count($tmp)-1].'.lng';
}else{
$DirFile = $OriFichero.'.lng';
}
}
if( trim($DirFile)=='' ){
continue;
}
$tmp = eScript(trim($DirFile));
if( !file_exists($tmp) ){
if( mb_strtoupper(trim($VerError))!='TRUE' ){
eTrace("ERROR: Fichero {$tmp} no encontrado");
}
continue;
}
if( mb_substr($tmp,-4)=='.zdf' ){
$txt = file_get_contents($tmp);
if( mb_substr($txt,0,5)=='eDes ' ){
$iDimEDF = explode("\n", gzuncompress(mb_substr($txt,5)));
}else{
$iDimEDF = explode("\n", $txt);
}
$txt = '';
}else{
$iDimEDF = file($tmp);
}
for($n=0; $n<count($iDimEDF); $n++){
$tmp = ltrim($iDimEDF[$n]);
if( $tmp[0]=='[' && (mb_substr(mb_strtoupper($tmp),0,6)=='[NOTE]' || mb_substr(mb_strtoupper($tmp),0,6)=='[EXIT]') ){
if( preg_match('/^\[EXIT\]/iu', $tmp) ) $n++;
for($i=$n; $i<count($iDimEDF); $i++) $iDimEDF[$i] = '';
break;
}
}
$tDim = array_slice($_DimEDF, 0, $nDimFCH);
$tDim = array_merge($tDim, $iDimEDF);
$tDim = array_merge($tDim, array_slice($_DimEDF, $nDimFCH+1));
$_DimEDF = $tDim;
$total = count($_DimEDF);
unset($tDim);
$nDimFCH--;
continue;
}
}
if( !empty($xPhpStart) ){
$tmpFile = GrabaTmp('l_phpstart', $xPhpStart, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($xPhpStart);
}
?>