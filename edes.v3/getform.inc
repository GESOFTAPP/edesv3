<?PHP
if( S::$_User==-1 || $GLOBALS['_gsID']!=getmypid() ) exit;
$Opcion = $sModo;
global $_User, $_Node;
$_DimEDF = @OpenDF($File);
$_gsCreate_ = false;
$DimOpcion = array($sModo,'?','l');
array_push( $DimOpcion, 'u'.$_User, 'n'.$_Node );
if( SESS::$_TreeList!='' ){
$tmp = explode(',',SESS::$_TreeList);
for( $n=0; $n<count($tmp); $n++ ) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( SESS::$_Development!='' ) array_push( $DimOpcion, 'd' );
if( SESS::$_WebMaster==$_ENV['ON'] ) array_push( $DimOpcion, 'w' );
if(	SESS::$_SystemUser==$_ENV['ON'] ) array_push($DimOpcion, 'S');
if( SESS::$_D_!="" ) array_push($DimOpcion, 'D');
$_ePermission = $DimOpcion;
$TipoEntrada = '#';
$ElPuntoEsRem = true;
$OriginalOpcion = $Opcion;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
$ElPuntoEsRem = true;
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('f_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
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
if( eOkMode( $Opcion, mb_substr($cModo,9) ) ){
if( trim(mb_strtoupper($DirFile)=='LNG' ) ){
if( $OriFichero[0]=='$' ){
$tmp = explode('/',str_replace(CHR92,'/',$OriFichero));
$DirFile = '$lng/'.$tmp[count($tmp)-1].'.lng';
}else $DirFile = $OriFichero.'.lng';
}
$tmp = eScript(trim($DirFile));
if( file_exists($tmp) ){
if( mb_substr($tmp,-4)=='.zdf' ){
$txt = file_get_contents($tmp);
if( mb_substr($txt,0,5)=='eDes ' ){
$iDimEDF = explode( "\n", gzuncompress(mb_substr($txt,5)) );
}else{
$iDimEDF = explode( "\n", $txt );
}
$txt = '';
}else{
$iDimEDF = file($tmp);
}
for( $n=0; $n<count($iDimEDF); $n++ ){
$tmp = ltrim($iDimEDF[$n]);
if( $tmp[0]=='[' && mb_substr(mb_strtoupper($tmp),0,6)=='[NOTE]' ){
for( $i=$n; $i<count($iDimEDF); $i++ ) $iDimEDF[$i] = '';
break;
}
}
$tDim = array_slice($_DimEDF,0,$nDimFCH);
$tDim = array_merge($tDim,$iDimEDF);
$tDim = array_merge($tDim,array_slice($_DimEDF,$nDimFCH+1));
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
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'CC':
eExplodeOne( $buffer, '|', $txt1, $txt2 );
$_Variable[$tmp[0]] = _ExeEval( $txt2, $buffer );
break;
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval( $tmp[1], $buffer, 1 );
break;
case 'FIELDS':
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}
if( !empty($tmp[0]) ){
if( mb_ord($tmp[0][0]) > 48 && mb_ord($tmp[0][0]) < 58 ){
$_TCol = $tmp[0] * 1;
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[0] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( mb_strtoupper($tmp[0])=='ELSE' && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( mb_ord($tmp[1][0]) > 48 && mb_ord($tmp[1][0]) < 58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[1] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( mb_strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
}
}
if( $OkModo ){
$_TmpFieldSet = array('','','','');
$_EnLinea = array();
$_TmpEnLinea = array('','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');
$_NewNColumnas = array();
$_TmpNColumnas = array('','','','');
$TipoEntrada = $Comando;
}
break;
}
break;
case  0:
case 10:
break;
default:
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm( 'F', $Opcion, $buffer, $_Form, $_DEFAUX, 1 ) ){
if( $_TmpFieldSet[1] == '+' ) $_TmpFieldSet[1]	= NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpEnLinea[1]	 == '+' ) $_TmpEnLinea[1]	= NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpEnColumna[1]== '+' ) $_TmpEnColumna[1] = NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpNColumnas[1]== '+' ) $_TmpNColumnas[1] = NombreCampo( $_Form[count($_Form)-1][1] );
}
break;
case '_LANGUAGE':
global $_LANGUAGE, $_LanguageTron, $_LNGCOL;
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
break;
}
}
}
unset($_DimEDF);
?>