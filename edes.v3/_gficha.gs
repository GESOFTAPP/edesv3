<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
if( !$_ENV[SYS]['RegisterShutdown'] ){
register_shutdown_function('_ExitPHP');
$_ENV[SYS]['RegisterShutdown'] = true;
}
$_FORMTYPEMENU = 2;
$_IconMenu = '';
eLngLoad(DIREDES.'lng/tab', '', 1);
include_once($Dir_.'formulario.inc');
include_once($Dir_.'message.inc');
@include("../_datos/config/width_css".SESS::$cssSufijo.".php");
if( !isset($NomFile) ){
list($Opcion, $Fichero) = explode(':', $_Accion);
$NomFile = mb_substr(mb_strrchr($_SERVER['PHP_SELF'],'/'), 1);
}
if( $_BinaryMode[$Opcion]<>"" ) $Opcion = $_BinaryMode[$Opcion];
$_OpcionBak = $Opcion;
if( $Opcion=='o' ) $Opcion = 'c';
$SoloQue = false;
if( $Opcion=='a' ){
$SoloQue = false;
}elseif( $Opcion=='m' || $Opcion=='c' || $Opcion=='b' ){
$SoloQue = true;
}elseif( ($Opcion=='mR' || $Opcion=='cR' || $Opcion=='bR') && !isset($_SEEK) ){
$SoloQue = false;
$tDatos = 0;
$DimValor = array_values($_POST);
for($n=0; $n<count($_POST); $n++){
$tDatos += mb_strlen($DimValor[$n]);
}
}
if( SESS::$_CacheSrv && eSubstrCount(',a,c,m,b,', ",{$Opcion},")==1 ){
header("Expires: ".gmdate("D, d M Y ".SESS::$_CachePc." T"));
header("Cache-Control: max-age");
}
$_TargetUrl = (SETUP::$List['SubWindowInIWork'] ? '&_IWORK=2' : '');
if( $_GET['_PSOURCE']=='WWORK' ) $_TargetUrl = '';
$OriFichero = $Fichero;
$_FileDF = $OriFichero;
$Fichero = eScript($Fichero);
$FicheroD = $Fichero;
$_X = -1;
$_Y = -1;
$_Forma = 'D';
$_gsObjeto = 'G';
$_Modo = $Opcion;
$_Mode = &$_Modo;
$_ModeSeek = false;
$_SubModo = $Opcion;
$_SubMode = &$Opcion;
$_SubModoAlta = array();
$_pF = array();
$_ConRespuesta = false;
$_Fichero = array();
$_UPLOADFILE = array();
$_SELECT_DDBB = array();
$_MIRROR = '';
$_EDITMIRROR = '';
$_EDITMIRRORMEM = array();
$_RELATIONFIELDS	= array();
$_RELATIONJUMP = array();
$_SELECTFILL = array();
$_DELFILTER = array();
$_TitleDelFilter = '';
$_TITLEICON = array();
$_OTHERDF = array();
$_DimPaste = array();
$_DefaultPaste = array();
$_SELINFO = array();
$_SELINFONOEVENT = array();
$_SHOWFIELDS = array();
$_ADDOPTION = array();
$_ADDOPTIONVALUE = array();
$_NM_ATRIBUTE = array();
$_DELOPTION = array();
$_FILLOPTION = array();
$_LOCALSELECT = array();
$_ISubListTotal = 0;
$_RELATIONSUBLIST = array();
$_RELATIONSUBLISTFUNC = array();
$SubJS = true;
$nf = $nc = $TOpcion = 0;
$tmp = array();
$DOpcion = array();
$DFichero = array();
$DTitle = array();
$_ZoneHide = '0';
$_TITLE = $_DBORDER = '';
$_TABTITLE = array();
$_Condi = array();
$_Form = array();
$_Field = array();
$_pField = array();
$_ASSIGN = false;
$tmp3 = $tmp4 = '';
$DSubOpcion = array();
$_DBTABLE = '';
$_DBINDEX = '';
$_DBINDEX2 = '';
$_DBINDEX3 = '';
$_CheckDBIndex = '';
$_DimCheckDBIndex = array();
$_CSS = 'ficha';
$_CSSADD = '';
$_CSSPRINT = '';
$_DBINI = '';
$_DBEND = '';
$_DBSERIAL = array();
$_DBFILTERIN = "";
$_nSerial = 0;
$_Id = '';
$_WHERESELECT = array();
$_JSDIM = array();
$_ONCHANGE = array();
$_EXEONCHANGE = array();
$_WINCLOSE = false;
$_DBADDFILTER = '';
$_BUTTON = array('','');
$_ADDBUTTON = array();
$_TipoBoton = '';
$_DBINSERT = '';
$_OkDBINSERT = false;
$_NOEDIT = array();
$_NOEDITFILLED = false;
$_NOEDITFILLEDSESSION = false;
$_NOEDITFILLEDFIELD = array();
$_DBLOG = array();
$_DBLOGINCLUDE = '';
$_DBMEMO = array();
$_MemoContenido = array();
$_DBMemoTable = '';
$_MSGANSWER = array();
$_MSGANSWEROK = false;
$_MSGSUBMIT = array();
$_SubVentana = array();
$SubJsHtm = true;
$_ONLOAD = '';
$_LOCATION = '';
$_WINTITLE = '';
$_REQFILTER = false;
$_WIDTH = array();
$_CHR = array();
$_GPFIELDS = array();
$_DEFAUX = array();
$_DBRANGE = array();
$DimDBRange = array();
$_ConDBRange = array();
$_COUNT = '-1';
$_eAlign = array();
$_ConFicheros = false;
$_DEFAULTVAL = array();
$_FORMWIDTHS = array();
$_Objeto = array();
$_ObjetoSQL = array();
$_RADIO = array();
$_Etiqueta = array();
$_FIELDSET = array();
$_FIELDSETON = false;
$_SKIPTD = array();
$_TDSTYLE = array();
$_MSGTIME = array('','');
$_DEFAULT = array();
$_SUBTAB = 1;
$_SUBTABFORM = '';
$_CONTEXTFREE = array();
$_CONTEXTSUBSELECT = array();
if( !isset($_NOTOOLS) ) $_NOTOOLS = '';
$_EnLinea = array();
$_TmpEnLinea = array('','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');// Temporal para en Columna
$_NewNColumnas = array();
$_TmpNColumnas = array('','','','');// Temporal para nueva estructura de tabla
$_FIELDBROWSER = array();
$_HELP = CodeHELP($OriFichero, $Opcion);
$_OtroDiccionario = false;
$_AUTOMENU = 0;
$_ADDCODE = array();
$_SinUrlDecode = array();
$_Variable = array();
$_CC = &$_Variable;
$_FORMACTION = '';
$_DimInclude = array();
$_NombreInclude = '';
$_BCP = array();
$_JSINCLUDE = array();
$_CalcularAnchos = array();
$_ZonaFija = false;
$Hay_fPHP = false;
$_SaveList = array();
$_SaveOnLine = array();
$_OnLineIMG = array();
$_OnLineOP = array();
$_SUBLISTWIN = array();
$_DimChildrenData = array();
$_DBBAKDELETE = false;
$_DBBakDeleteUpdate = '';
$_OPTIONS = array();
$_LANGUAGE = array();
$_LNGCOL = 1;
$_LNGCOLDEFAULT = 1;
$_FIELDSPAN = array();
$_ISUBLISTSERIAL = '';
$_nObjeto = 0;
$_FieldsMix = false;
$_SUBMITHIDDEN = false;
$_PERSISTENTVAR = '';
$_xPERSISTENTVAR = '';
$_EXPORTSCOPE = SETUP::$System["ExportScope"];
$_JSCHECK = '';
$_PHPFORM = '';
$_HTMHEAD = $_HTMINI = $_HTMEND = '';
$_JSHEAD  = $_JSINI  = $_JSEND  = '';
$_PHPHEAD = $_PHPINI = $_PHPEND = $_PHPSTART = '';
$_PHPMENUICONS = '';
$_JSSYSTEM = "";
$_DimRecalc = array();
$_ANACTION = false;
$_Id = mb_substr($FicheroD, mb_strrpos($FicheroD, '/' )+1);
if( isset($_GET['_NOEDITFILLED']) ) $_NOEDITFILLED = true;
if( isset($_GET['_NOBUTTON']) ) $_NOBUTTON = true;
if( $Opcion=='cR' && isset($_STOP) && $_STOP ) $_NOBUTTON = true;
$TipoEntrada = '#';
$SaltarLinea = false;
$_ModCampoIndice = false;
$_CalColumnaUno = array(0);
$_URL_IN_MENU = eGetOpcions();
$OpcionFields = $Opcion;
if( eSubstrCount(',A,B,M,', ",{$Opcion},")==1 ){
$OpcionFields = mb_strtolower($Opcion[0])."R";
}
$DimOpcion = array($Opcion,'*');
if( eSubstrCount(',c,b,m,', ",{$Opcion},")>0 ) array_push($DimOpcion, '?');
if( eSubstrCount(',c,b,m,a,cR,bR,mR,?R,*R,', ",{$Opcion},")>0 ) array_push($DimOpcion, 'F');
if( eSubstrCount(',cR,bR,mR,', ",{$Opcion},")>0 ){
array_push($DimOpcion, '?R');
array_push($DimOpcion, '*R');
}
if( eSubstrCount(',cl,bl,ml,', ",{$_SubModo},")>0 ){
array_push($DimOpcion, '?l');
array_push($DimOpcion, '*l');
}
array_push($DimOpcion, 'u'.$_User, 'n'.$_Node);
if( SESS::$_TreeList!='' ){
$tmp = explode(',',SESS::$_TreeList);
for($n=0; $n<count($tmp); $n++) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( SESS::$_Development!='' ) array_push($DimOpcion, 'd');
if( SESS::$_WebMaster==$_ENV['ON'] ) array_push($DimOpcion, 'w');
if(	SESS::$_SystemUser==$_ENV['ON'] ) array_push($DimOpcion, 'S');
if( SESS::$_D_!="" ) array_push($DimOpcion, 'D');
$_ePermission = $DimOpcion;
if( file_exists(eScript("{$_FileDF}.lng")) ){
eLngLoad(eScript("{$_FileDF}.lng"), '', 2);
}
$_DimEDF = @OpenDF($FicheroD);
include(DIREDES."parse_begin.php");
$_CallLabel = "";
$ElPuntoEsRem = true;
$sElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
if( $_CallLabel<>"" && $Chr_1<>'[' ){
call_user_func("eCall_".$_CallLabel, true, $buffer);
continue;
}
$_CallLabel = "";
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
list($buffer, $VerError) = explode('|',$buffer);
while( eSubstrCount($buffer,'{$')>0 ){
$p = mb_strpos($buffer, '{$');
$tmp = mb_substr($buffer, $p, mb_strpos($buffer, '}')-$p+1);
if( $GLOBALS[mb_substr($tmp,2,-1)]!='' ){
$buffer = str_replace($tmp,$GLOBALS[mb_substr($tmp,2,-1)],$buffer);
}else{
$buffer = str_replace($tmp, SESS::${mb_substr($tmp,2,-1)},$buffer);
}
}
list( $cModo, $DirFile ) = explode(')',eNsp($buffer));
$DirFile = mb_strtolower($DirFile);
if( eOkMode($Opcion, mb_substr($cModo,9)) ){
if( trim(mb_strtoupper($DirFile)=='LNG') ){
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
switch( mb_ord($buffer[0]) ){
case 91:
$ElPuntoEsRem = true;
$sElPuntoEsRem = true;
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('gf_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
}
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'CC':
eExplodeOne($buffer, '|', $txt1, $txt2);
$_Variable[$tmp[0]] = _ExeEval($txt2, $buffer);
break;
case 'PHPSESSION':
if( $_Mode=='c' || $_Mode=='b' || $_Mode=='m' || $_Mode=='a' ) break;
if( $tmp[1]<>'' ) $_PHPSESSIONMSG = $tmp[1];
$tmp2 = explode(',',eNsp($tmp[0]));
for( $n=0; $n<count($tmp2); $n++ ){
list($vCkeck,$vSession) = explode('=',$tmp2[$n]);
if( SESS::${$vSession}<>'' ) $_PHPSESSION[$vCkeck] = SESS::${$vSession};
}
break;
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval( $tmp[1], $buffer, 1 );
break;
case 'ADDBUTTON':
case 'TAB':
call_user_func('eCall_'.$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'DBLIMIT':
list($L, $XP, $PP) = explode(',', str_replace('.','',$tmp[0]));
if( $L<0 ){
$L = $XP;
$XP = '';
$PP = '';
}
$_DBLIMIT = (int)$L;
if( $XP!='' ) $_MAXREC = (int)$XP;
if( $PP!='' ){
$_MinPaginar = (int)$PP;
}else{
$_MinPaginar = $XP*2;
}
break;
case 'TITLE':
for($n=1; $n<3; $n++){
if( $tmp[$n]!='' ){
if( preg_match('/IWORK/iu', $tmp[$n]) ){
$tmp[$n] = trim(preg_replace('/IWORK/i', '', $tmp[$n]));
if( !preg_match('/^(b|c|m)$/u', $_Mode) ){
$_TargetUrl = '&_IWORK=2';
}
}
if( preg_match('/WINDOW/iu', $tmp[$n]) ){
$tmp[$n] = trim(preg_replace('/WINDOW/i', '', $tmp[$n]));
if( !preg_match('/^(b|c|m)$/u', $_Mode) ){
$_TargetUrl = '';
}
}
}
}
$_TITLE = $_oTITLE = $tmp[0];
$GLOBALS["_LOGREQUEST"]["title"] = $_TITLE;
if( mb_strtoupper($_TITLE)=='NOTITLE' ){
$_TITLE = '';
if( isset($_PSOURCE) && $_PSOURCE!='WWORK' ) $_NOTITLE = true;
}else if( $_PSOURCE!='WWORK' && mb_strtoupper($tmp[3])=='NOTITLE' ){
$_WINCAPTION = '#';
}
break;
case 'TITLEICON':
if( $OkModo ){
if( eSubstrCount($tmp[1], "[")>0 && eSubstrCount($tmp[1], "]")>0 ){
while( eSubstrCount($tmp[1], "[")>0 && eSubstrCount($tmp[1], "]")>0 ){
$txt = "";
$desde = mb_strpos($tmp[1],"[");
$hasta = mb_strpos($tmp[1],"]");
$Macro = trim(mb_substr($tmp[1], $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
$txt = eIcon(trim($icono), _InVar($dentro));
$tmp[1] = mb_substr($tmp[1],0,$desde).$txt.mb_substr($tmp[1],$hasta+1);
}
}
if( $tmp[2]!='' && $tmp[2]!='mark' && eSubstrCount($tmp[2],$_PSOURCE)==0 && mb_strtoupper($tmp[2])!='ELSE' ) break;
if( mb_strlen($tmp[1])<=4 ){
$tmp[1] = mb_strtoupper($tmp[1]);
if( $tmp[1]=='*' ) $tmp[1] = 'HPVC';
$txt = "";
if( $tmp[3]=="" ){
$hMode = _ModeHelp($tmp[0]);
$txt = " iMark='{$tmp[2]}' iHelp='TITLEICON' iMode='{$hMode}' iType='{$tmp[1]}'";
if( $tmp[2]!="" ) $tmp[2] = ".".$tmp[2];
$tmp[3] = str_replace("/","_",$OriFichero).".".$hMode.$tmp[2];
if( mb_strlen($tmp[1])==1 ){
if( $tmp[1]=="H" ){
$click = "top.gsHelp(\"{$tmp[3]}\", event)";
}else{
$click = "_HelpMenu(\"{$tmp[1]}\", null, this, null, null, \"{$tmp[3]}\")";
}
}else{
$click = "gsHelp(\"{$tmp[3]}\", \"{$tmp[1]}\", event)";
}
unset($hMode);
$_TITLEICON[] = "<i class='ICONHEADER'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick='{$click}' title='Ayuda' style='cursor:var(--cPointer)'>@</i>";
break;
}
$img = "<i class='ICONHEADER' title='Ayuda' style='cursor:var(--cPointer)'{$txt} oncontextmenu='_SetDownload()' onclick=\"";
$tmp[3] = str_replace(array("'", '"'), array("\\'", '&#34;'), $tmp[3]);
if( mb_strlen($tmp[1])==1 ){
if( $tmp[4]=='' ){
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, '".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."'";
}else{
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, new Array('".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."')";
}
$img .= ')"';
$img .= ' _TypeHelp="_HelpMenu"';
}else{
$img .= "top.eMenu(window, this, {'-':'Ayuda'";
if( eSubstrCount($tmp[1],'H')>0 ) $img .= ",'H':'[g/help_htm.png]Ver ayuda'";
if( eSubstrCount($tmp[1],'P')>0 ) $img .= ",'P':'[g/help_pdf.png]Ayuda en formato PDF'";
if( eSubstrCount($tmp[1],'V')>0 ) $img .= ",'V':'[g/help_avi.png]Video tutorial'";
if( eSubstrCount($tmp[1],'C')>0 ) $img .= ",'C':'[g/help_chm.png]Ayuda en formato CHM'";
$img .= "}, _HelpMenu";
$img .= ",0,0,Array('".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."')";
$img .= ', null, _SetDownload)"';
$img .= ' _TypeHelp="eMenu"';
}
$tmp[1] = $img.">@</i>";
}
$_TITLEICON[] = $tmp[1];
}
break;
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$_sDBTABLE = $tmp[0];
case 'WINTITLE':
case 'DBORDER':
case 'DBADDFILTER':
case 'CLEARTOCOUNT':
${$Comando} = $tmp[0];
break;
case 'DBFILTERIN':
if( eSubstrCount(",l,cR,mR,bR,", ",{$Opcion},")==0 ) break;
$tmp = explode(",", eNsp($tmp[0]));
$fiField = $tmp[0];
$fiTabla = $tmp[1];
$fiWhere = "";
for($n=2; $n<count($tmp); $n++){
$txt = str_replace("&#44;",",",$tmp[$n]);
while( eSubstrCount($txt, "{") > 0 && eSubstrCount($txt, "}")>0 ){
$desde = mb_strpos($txt,"{");
$hasta = mb_strpos($txt,"}");
$Macro = trim(mb_substr($txt, $desde+1, $hasta-$desde-1));
$vMacro = _ExeEval($Macro, $txt);
if( $vMacro=="" ){
$txt = "";
}else{
$txt = mb_substr($txt, 0, $desde). $vMacro .mb_substr($txt, $hasta+1);
}
}
if( $txt!="" ){
if( $fiWhere!="" ) $fiWhere .= " and ";
$fiWhere .= $txt;
}
}
if( $fiWhere!="" ) $fiWhere = " where ".$fiWhere;
$_DBFILTERIN = " {$fiField} in (select {$fiField} from {$fiTabla} {$fiWhere})";
break;
case 'FORMBUTTONS':
${$Comando} = $tmp[0];
if( $tmp[1]!='' ) $_FORMBUTTONSDELETE = $tmp[1];
break;
case 'DBSEQUENCE':
case 'PERSISTENTVAR':
${$Comando} = eNsp($tmp[0]);
break;
case 'DBRLOCK':
if( $tmp[0]!="" && mb_strtoupper($tmp[0])=="NO" ){
${$Comando} = false;
}else{
${$Comando} = true;
if( $tmp[0]!="" ) $_DBRLOCKNOFIELD = ','.eNsp($tmp[0]).',';
}
break;
case 'STOP':
case 'REQFILTER':
${$Comando} = true;
break;
case 'DBBAKDELETE':
${$Comando} = true;
$_DBBakDeleteUpdate = $tmp[0];
break;
case 'WINCLOSE':
if( $tmp[0]!='' && eSubstrCount($tmp[0], $_PSOURCE)==0 ) break;
${$Comando} = true;
break;
case 'ASSIGN':
if( $OkModo && $tmp[1]!='' ){
$tmp = explode( ',', $tmp[1] );
for( $i=0; $i<count($tmp); $i++ ) $_ASSIGNFIELD[trim($tmp[$i])] = true;
}else{
${$Comando} = $OkModo;
}
break;
case 'NOBUTTON':
if( $tmp[0]=='' ) $OkModo = true;
if( $tmp[1]!='' && mb_strtoupper($tmp[1])=="OFF" ) $_NOBUTTONCLOSE = true;
case 'SAVETRACE':
${$Comando} = $OkModo;
break;
case 'AUTOMENU':
if( $OkModo && !SETUP::$Desktop['MenuAutoHidden'] ) ${$Comando} = ($tmp[1]!='') ? $tmp[1] : 1;
break;
case 'ONLOAD':
if( $OkModo ) ${$Comando} = $tmp[1].";";
break;
case 'WINTOOLS':
if( $OkModo ) ${$Comando} = $tmp[1];
break;
case 'MSGSUBMIT':
if( $OkModo ){
if( $tmp[1][0]=='>' ){
$tmp[1] = trim(mb_substr($tmp[1],1));
if( mb_substr($tmp[1],-4)=='.LNG' ) $tmp[1] = mb_substr($tmp[1],0,-3).SESS::$_LANGUAGE_;
$sFile = str_replace('\\','/',$Fichero);
if( $tmp[1][0]=='*' ) $tmp[1] = mb_substr($sFile,0,-3).mb_substr($tmp[1],2);
$tmp[1] = file_get_contents( eScript($tmp[1]) );
if( trim($tmp[1])=="" ){
$tmp[1] = file_get_contents(eScript(mb_substr($tmp[1],0,-2).SESS::$_LanguageDefault));
$tmp[1] = str_replace("{COMPANY}", eFileGetVar("System.Company"), $tmp[1]);
}
$tmp[1] = str_replace( CHR10, '<br>', str_replace( CHR13, '', $tmp[1] ));
}
$_MSGSUBMIT = array( $tmp[1], $tmp[2], $tmp[3], $tmp[4] );
}
break;
case 'DEBUG':
if( $OkModo ) _Debug($tmp);
break;
case "CARD":
$_CARDWIDTH = [];
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(",", eNsp($tmp[$n]));
if( count($tmp2)==1 ) $tmp2 = array("",$tmp2[0],"");
for($i=0; $i<count($tmp2); $i++){
if( preg_match('/%$/iu', $tmp2[$i]) ){
}else if( preg_match('/px$/iu', $tmp2[$i]) ){
$tmp2[$i] *= 1;
}else if( preg_match('/c$/iu', $tmp2[$i]) ){
$tmp2[$i] = $tmp2[$i]*1*$_DefaultSize['TT']['uM'];
}
}
$_CARDWIDTH[] = $tmp2;
}
$_CARDSHOW = true;
break;
case 'ITOOLS':
if( $OkModo ){
array_shift( $tmp );
$_iToolsAdd = implode( '|', $tmp );
}
break;
case 'FORMCHECK':
$TipoEntrada = $Comando;
break;
case 'JPCHECK':
$xOp = str_replace("R","",mb_strtoupper($Opcion));
$xLab = str_replace("R","",mb_strtoupper($tmp[0]));
if( !in_array($Opcion, explode(",","m,b,c")) && eOkMode($xOp, $xLab) ){
$NoExePHPInterno = false;
$TipoEntrada = $Comando;
if( $tmp[1]!='' ) $_CHECKSESSION = explode(",", eNsp($tmp[1]));
}
break;
case 'DBEND':
if( $Opcion=='M' && $tmp[2]!='' ) $_LastValue = $tmp[2];
$tmp[2] = "";
case 'JSCHECK':
if( $Etiqueta=='JSCHECK' && $tmp[2]!='' ) $_xMarkFieldRequired = $tmp[2];
case 'DBINI':
case 'DBINSERT':
case 'DBSQL':
case 'HTMEND':
case 'HTMHEAD':
case 'HTMINI':
case 'JSEND':
case 'JSHEAD':
case 'JSINI':
case 'JSRECALC':
case 'JSONLOAD':
case 'phpstart-no':
case 'PHPCHECK':
case 'PHPEND':
case 'PHPFORM':
case 'PHPHEAD':
case 'PHPINI':
case 'PHPMENUICONS':
case 'OPTIONS':
if( $tmp[2]!='' && mb_strtoupper($tmp[2])!='UNIQUE' && $Comando<>"JSONCLICKROW" && $Comando<>"DBEND" ){
if( $tmp[2][0]=="#" ){
if( !$_Variable[$tmp[2]] ) break;
}else{
if( !eval("return {$tmp[2]};") ) break;
}
}
if( $tmp[1]!='' && eSubstrCount($tmp[1], $_PSOURCE)==0 && !(${$Comando}=='' && mb_strtoupper($tmp[1])=='ELSE') ) break;
$TipoEntrada = (($OkModo) ? $Comando : '#');
$JsHtm = ($Etiqueta[0]=='J' || $Etiqueta[0]=='H');
if( $OkModo && mb_strtoupper($tmp[2])=='UNIQUE' ){
$NewVar = '_FILE'.$Comando;
$GLOBALS[$NewVar] = $Comando.'_'.$nDimFCH.'_'.$_User;
}
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', eNsp($tmp[0]));
if( $Opcion=='mR' || $Opcion=='M' ){
$_ModCampoIndice = (mb_strtoupper($tmp[1])=='EDIT');
if( $_ModCampoIndice && eSubstrCount($_DBINDEX, ',')>0 ) eMessage(str_replace('#','Edit',$__Lng[57]),'EHS');
}
if( $tmp[4]!='' && eSubstrCount($tmp[4],'\\')>0 ) $tmp[4] = str_replace(CHR92, CHR92.CHR92, $tmp[4]);
if( $Opcion=='a' && $tmp[2]!='' && mb_strtoupper($tmp[2][0])=='T' ){
$_CheckDBIndex = eNsp($tmp[0]).'|'.eNsp($tmp[3]).'|'.$tmp[4];
if( $tmp[6]!='' ) $_CheckDBIndexDB = $tmp[6];
}
if( ($Opcion=='a' || $Opcion=='mR') && $tmp[5]!='' ) $_CheckDBIndexFunc = $tmp[5];
break;
case 'DBINSERTONLY';
eMessage("[DBInsertOnly] Etiqueta no disponible para multifichas", "EHS");
break;
case 'DBSERIAL':
$_DBSERIAL = array($_DBTABLE, $tmp[0], '');
if( $tmp[1]!='' ) $_DBSEQUENCE = $tmp[1];
if( $_DBINDEX=="" ) $_DBINDEX = $tmp[0];
break;
case 'DELFILTER':
if( $OkModo ){
$_DELFILTER = array( $tmp[1], explode( ',', $tmp[2] ), $tmp[3], $tmp[4], $tmp[5], $tmp[6] );
$_TitleDelFilter = $tmp[3];
}
break;
case 'TXTLOG':
if( $OkModo ) $_TXTLOG = array($tmp[1],$tmp[2],$tmp[3]);
break;
case 'DBLOG':
if( preg_match('/^FULL$/iu',$tmp[0]) ){
$GLOBALS["_LOGREQUEST"] = array("object"=>$GLOBALS["_Object"], "mode"=>$_Mode, "script"=>$GLOBALS["_DF"], "get"=>$_GET, "post"=>$_POST);
$GLOBALS["_LOGFULLSTATUS"] = true;
$GLOBALS["_LOGFULLTYPE"] = 2;
break;
}
$_DBLOG = explode(',', $tmp[0]);
$_DBLOGTXT = $tmp[0];
$_DBLOGINCLUDE = $tmp[1];
$_DBLOGTABLE = $tmp[2];
break;
case 'DBMEMO':
$tmp = explode(',', $tmp[0]);
for($n=0; $n<count($tmp); $n++) $_DBMEMO[ trim($tmp[$n]) ] = true;
break;
case 'SUBWIN':
$tmp = explode( ']', $buffer );
$tmp = explode( '|', $tmp[1] );
$tmp[1] = trim($tmp[1]);
if( eOkMode($Opcion, trim($tmp[0])) ){
if( !in_array($tmp[1], $_SubVentana) ) array_push($_SubVentana, $tmp[1]);
}
break;
case 'MSGANSWER':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
break;
case 'OTHERDF':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2]);
break;
case 'BUTTON':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2], mb_strtoupper($tmp[3]));
break;
case 'MSGTIME':
list($_MSGTIME[0], $_MSGTIME[1]) = explode(',', $tmp[0]);
break;
case 'NOEDITFILLED':
${$Comando} = $OkModo;
if( $OkModo && mb_strtoupper($tmp[1])=='SESSION' ){
$_NOEDITFILLEDSESSION = true;
$_NOEDITFILLED = false;
}
if( $tmp[2]!='' ){
$tmp1 = explode( ',', eNsp($tmp[2]) );
for( $n=0; $n<count($tmp1); $n++ ) $_NOEDITFILLEDFIELD[ trim($tmp1[$n]) ] = 1;
}
break;
case 'CSSADD':
$ElPuntoEsRem = false;
$sElPuntoEsRem = false;
if( $OkModo && $tmp[2]!="" ){
$tmp2 = mb_strtolower($tmp[2]);
if( preg_match('/paddingSmall/iu', $tmp2) ){
$tmp2 = str_replace("paddingsmall", "", $tmp2);
$_PaddingList = 2;
}else if( preg_match('/paddingBig/iu', $tmp2) ){
$tmp2 = str_replace("paddingbig", "", $tmp2);
$_PaddingList = 15;
}
$_CSSFontSize = trim($tmp2);
if( !preg_match('/^(big|small|tlf)$/iu', $_CSSFontSize) ){
$_CSSADDFILE .= ",all_".$_CSSFontSize.",tab_".$_CSSFontSize;
$_CSSFontSize = "";
$_CSSNO = true;
}else{
@include("../_datos/config/width_css_{$_CSSFontSize}.php");
}
}
case 'CSS':
case 'CSSPRINT':
if( $OkModo ){
if( $tmp[1]=='' && $Comando=='_CSSADD' ){
if( $_CSSADD=='' ) $_CSSADD = '>';
$TipoEntrada = $Comando;
$JsHtm = false;
}else{
if( $tmp[1] == '/' ) $tmp[1] = str_replace('/','_',mb_substr($FicheroD,0,mb_strrpos($FicheroD,'/')));
$_CSSADDFILE = $tmp[1];
}
if( $Etiqueta=="CSS" ) $_CSSNO = true;
}
break;
case 'EXPIRE':
$_EXPIRE = (($tmp[0]=='') ? 0 : $tmp[0]);
set_time_limit($_EXPIRE);
break;
case 'NOABORT':
ignore_user_abort(0);
break;
case 'WINTITLE':
$tmp = explode(']', $buffer);
$_WINTITLE = trim($tmp[1]);
break;
case 'WINFORM':
$_WINFORM = explode( ',', $tmp[0] );
for( $i=0; $i<count($_WINFORM); $i++ ) $_WINFORM[$i] = trim($_WINFORM[$i]);
if( $_WINFORM[3]!='' ) $_WINTITLE = $_WINFORM[3];
break;
case 'HEADER':
header($tmp[0]);
break;
case 'FORMACTION':
if( $OkModo ){
if( mb_strtoupper($tmp[1])=='SUBLIST' ){
$_SUBLISTACTION = true;
}else{
${$Comando} = str_replace("'",'"',$tmp[1]);
$_FORMBUTTONS = '';
}
if( mb_strtoupper($tmp[2])=='ANACTION' ) $_ANACTION = true;
}
break;
case 'OPTIONSINLIST':
$GLOBALS["_OptionsInListOn"] = true;
break;
case 'JSDIM':
if( $OkModo ) $_JSDIM[] = array( $tmp[1], $tmp[2], $tmp[3] );
break;
case 'JSINCLUDE':
if( $OkModo ){
$tmp1 = explode(',',eNsp(mb_strtolower($tmp[1])));
for($n=0; $n<count($tmp1); $n++) $_JSINCLUDE[$tmp1[$n]] = 1;
}
break;
case 'FIXZONE':
$_ZonaFija = $OkModo;
break;
case 'DB':
break;
case 'GPFIELDS':
if( SESS::$_Development || SESS::$_D_!='' ) $_GPFIELDS[$tmp[0]] = $tmp[1];
break;
case 'NOTE':
break 3;
case 'BACKGROUNDIMAGE':
if( $OkModo && ( $tmp[4]=='false' || (($tmp[4]=='' || $tmp[4]=='true') && $_PSOURCE=='WWORK')) ) $_BACKGROUNDIMAGE = '<style>body{background-image:url("'.$tmp[1].'");background-repeat:'.(($tmp[2]=='')?'no-repeat':$tmp[2]).';background-position:'.(($tmp[3]=='')?'bottom right':$tmp[3]).';background-attachment:fixed;}</style>';
break;
case 'FORUSERS':
if( $OkModo ){
if( $tmp[2]=='' ) $tmp[2] = 'ACCESO DENEGADO';
if( eSubstrCount(eNsp($tmp[1]), 'selectcount(*)')==1 ){
$OkModo = _ExeEval($tmp[1], $buffer);
if( $OkModo!=1 ) eMessage($tmp[2],'HS');
}else if( eSubstrCount($tmp[1], '$')==0 ){
if( eSubstrCount(','.eNsp($tmp[1]).',', ",{$_User},")==0 ){
eMessage($tmp[2], 'HS');
}
}else if( $tmp[2][0]=="#" ){
$permission = substr($tmp[2], 1);
qQuery("select cd_gs_tpermission from gs_tpermission where nm_gs_tpermission='{$permission}'");
list($cd_gs_permission) = qRow();
if( qQuery("gs_permission", "cd_gs_user='{$_ENV['user']}' and cd_gs_tpermission='{$cd_gs_permission}'")==0 ){
eMessage($tmp[2], 'HS');
}
}else{
if( !_ExeEval($tmp[1], $buffer) ) eMessage($tmp[2], 'HS');
}
}
break;
case 'HELP':
if( $OkModo ){
if( $tmp[1]==''  ) $tmp[1] = mb_strtolower( "{$OriFichero}_{$_Modo}" );
$tmp[1] = str_replace('#',$_Modo,$tmp[1]);
$_HELP = 'top.gsHelp("'.eStrtr( $tmp[1], array('/'=>'_','\\'=>'_',' '=>'_')).'",event);';
}
break;
case 'JUMP':
$Fichero = $tmp[0];
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
$tmp = explode('.',$Fichero); $tmp = $tmp[count($tmp)-1];
if( eSubstrCount(',edf,gdf,ldf,fdf',",{$tmp}," ) > 0 ){
$_DimEDF = @OpenDF($FicheroD);
}else{
eInit();
include( $FicheroD );
eEnd();
}
$nDimFCH = -1;
continue;
case 'H':
case 'J':
case 'P':
$_NombreInclude = $tmp[0];
$TipoEntrada = 'Inc'.$Etiqueta;
break;
case 'LANGUAGE':
$tmp2 = explode( ',', trim(eNsp($tmp[0])) );
for( $n=0; $n<count($tmp2); $n++ ){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
break;
case 'ENTER':
$_ENTER = $tmp;
break;
case 'TIPFORM':
if( !$OkModo || in_array($tmp[0], ['A','B','M']) || isset($_GET['_IMPORT']) ) break;
$tmp[1] = mb_strtoupper($tmp[1]);
if( $tmp[3]!='' ){
$_TIPFORM[$tmp[2]]['S'] = 'L';
$buffer = $tmp[3];
}else{
$_TIPFORM[$tmp[2]]['S'] = 'W';
$buffer = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
if( mb_substr(ltrim($_DimEDF[$i]),0,1)=='.' || mb_substr(ltrim($_DimEDF[$i]),0,2)==REM ) continue;
if( mb_substr(ltrim($_DimEDF[$i]),0,1)=='[' ){
$i--;
break;
}else{
$buffer .= $_DimEDF[$i];
}
}
$nDimFCH = $i;
}
$buffer = _InFunction(_InVar($buffer));
if( $tmp[1]=='*' || $tmp[1]=='' ) $_TIPFORM[$tmp[2]]['L'] = $_TIPFORM[$tmp[2]]['F'] = $buffer;
else $_TIPFORM[$tmp[2]][$tmp[1]] = $buffer;
if( $tmp[1]=='E' ) $_TIPFORM[$tmp[2]]['M'] = _ModeHelp($tmp[0]);
if( $tmp[4]!='' ) $_TIPFORM[$tmp[2]]['W'] = $tmp[4];
if( $tmp[5]!='' ) $_TIPFORM[$tmp[2]]['T'] = $tmp[5]*1000;
break;
case 'SETVAR':
list( $k, $v ) = explode('=',$tmp[0]);
$v = trim($v);
if( mb_substr($v,-1)==';' ) $v = mb_substr($v,0,-1);
if( $v[0]==mb_substr($v,-1) && ($v[0]=='"' || $v[0]=="'") ) $v = mb_substr($v,1,-1);
if( $k[0]=='$' ) $k = mb_substr($k,1);
$GLOBALS[trim($k)] = ( (eSubstrCount($v,',')>0) ? explode(',',$v) : $v );
break;
case 'WINCLOSEESC':
$_WINCLOSEESC = true;
break;
case 'CACHE':
if( SETUP::$System['Cache'] && $OkModo && mb_substr($_oAccion,-2)=="df" && SESS::$_D_=='' ){
$_ENV[DF]["cache"] = eScriptToCache();
}
break;
case 'SUBMITHIDDEN':
$_SUBMITHIDDEN = $OkModo && eSubstrCount(',a,mR,bR,cR,',",{$Opcion},") > 0;
break;
case 'IMPORT':
$_Import[] = $tmp;
break;
case 'ADDTOOLS':
if( !$OkModo ) break;
if( mb_strtoupper($tmp[2])=='ECOLORSELECT' || mb_strtoupper($tmp[2])=='ETONESELECT' ){
global $_JSEND, $_JSINCLUDE;
if( $Opcion=='a' || $Opcion=='mR' ){
if( !empty($tmp[3]) ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$tmp[2] = mb_strtoupper($tmp[2])=='ECOLORSELECT' ? "eColorSelect":"eToneSelect";
if( mb_strlen($tmp[4])<2 ){
if( $tmp[4]=="" || mb_strtoupper($tmp[4])=="P" ) $tmp1 = 61442;
else if( mb_strtoupper($tmp[4])=="C" ) $tmp1 = 184;
else if( mb_strtoupper($tmp[4])=="B" ) $tmp1 = 185;
$_ADDCODE[$tmp[1]]['A'] .= '<I class="ICONINPUT" onclick="eSelectRGB(null,1,'.$tmp[2].')'.$tmp[3].'" title="'.$__Lng[189].'">&#'.$tmp1.';</I>';
}else{
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/t_color.png').'" onclick="eSelectRGB(null,1,'.$tmp[2].')'.$tmp[3].'" title="'.$__Lng[189].'">';
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
array_push($_ONCHANGE, array($tmp[1], '_SetColor("'.$tmp[1].'");', '', ''));
$_JSINCLUDE['$itm/'.mb_strtolower($tmp[2]).'.js'] = 1;
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
$_JSEND .= "if( eGF('{$tmp[1]}')!='' ) eGO('{$tmp[1]}').style.backgroundColor = eGF('{$tmp[1]}');";
}elseif( mb_strtoupper($tmp[2])=='ELABELSELECT' ){
if( mb_strtolower($tmp[1])=='button' ) $tmp[1] = 'button';
if( $tmp[3]!='' ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/label_sel.png').'" onclick="eLabelSelect()'.$tmp[3].'" title="'.$__Lng[188].'">';
$_PDFLABELTOOLS = true;
}elseif( mb_strtoupper($tmp[2])=='INSERTAUX' ){
if( $tmp[3]=='' ) $tmp[3] = $__Lng[187];
$_ADDCODE[$tmp[1]]['A'] .= '<img id="'.$tmp[1].'_" src="g/t_op_insert_sel.png" onclick="_InsertSelect()" title="'.$tmp[3].'">';
}elseif( mb_strtoupper($tmp[2])=='EDEFAULTS' && eSubstrCount(',a,b,c,m,',",{$_Mode},")>0 ){
if( $_DEFAULTALL ) break;
if( $tmp[3]=='' ) $tmp[3] = $__Lng[186];
if( $tmp[5]=="" ) $tmp[5] = "false";
if( $tmp[1]<>"" ) $GLOBALS['_ADDTOOLSCP'] = ",'".eNsp(trim($tmp[1]))."'";
$_TITLEICON[] = '<i id="_eDefaults_" style="font-size:70%" class="ICONTITLE OFF" onclick="eDefaults('.$tmp[5].$GLOBALS['_ADDTOOLSCP'].')" title="'.$tmp[3].'">h</i>';
$GLOBALS['_DEFAULTALL'] = true;
$GLOBALS['_DEFAULTBYMODE'] = (mb_strtoupper($tmp[5])=='TRUE' || $tmp[5]==1);
}elseif( mb_strtoupper($tmp[2])=='3CX' && !preg_match('/^(m|c|b)$/u', $Opcion) ){
$GLOBALS["_3CX"] = array();
$tmp[1] = eNsp($tmp[1]);
if( preg_match('/^(NO|OFF)$/iu', $tmp[1]) ) $tmp[1] = "_NO_";
$tmp = explode(',', $tmp[1]);
for($i=0; $i<count($tmp); $i++){
$GLOBALS["_3CX"][$tmp[$i]] = true;
}
}
break;
case 'BR':
if( $OkModo ) $_BR = true;
break;
case 'FREEFIELDS':
if( $OkModo ){
$tmp = explode(',', eNsp($tmp[1]));
for($i=0; $i<count($tmp); $i++) $_CONTEXTFREE[$tmp[$i]] = true;
}
break;
case 'INSERTTOSEEK':
if( $_Mode=="a" || $_Mode=="cR" ){
if( $tmp[0][0]=="[" && eSubstrCount($tmp[0],']')==1 ){
list($izq,$dch) = explode("]",mb_substr($tmp[0],1));
$tmp[0] = eIcon($izq).$dch;
}
$__INSERTTOSEEK = $tmp;
}
break;
case "UNSET":
if( $Opcion!="M" ) break;
if( $tmp[1]<>"" ){
if( $tmp[1][0]<>"_" ) $tmp[1] = "_".$tmp[1];
$tmp2 = explode(",", eNsp($tmp[0]));
for($i=0; $i<count($tmp2); $i++){
$_POST[$tmp[1].$tmp2[$i]] = $_POST[$tmp2[$i]];
}
}
eUnset($tmp[0]);
break;
case 'RANDOM':
$_RANDOM[] = explode(",", eNsp($tmp[0]));
break;
case 'SANITIZE':
call_user_func("eCall_".$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'EXPORTSCOPE':
$_EXPORTSCOPE = strtolower($tmp[0]);
break;
default:
if( $TipoEntrada=='_FIELDS' ){
$buffer = trim($buffer);
if( eSubstrCount('{H}{J}{P}{F}{I}{ISUBLIST}', mb_strtoupper(trim(mb_substr($buffer, 0,mb_strpos($buffer,'}')+1))) )==1 ){
if( mb_strtoupper(trim(mb_substr($buffer, 0, mb_strpos($buffer,'}')+1)))=='{ISUBLIST}' ){
$tmp = explode('|', mb_substr($buffer, mb_strpos($buffer,'}')+1));
if( !eOkMode($Opcion, $tmp[0]) ) break;
}
array_push($_Form, array($buffer));
}
}
}
break;
case  0:
case 10:
$ElPuntoEsRem = $sElPuntoEsRem;
break;
default:
$NoExePHPInterno = false;
switch( $TipoEntrada ){
case '_FORMCHECK':
list( $_Condi[$nc][0], $_Condi[$nc][1], $_Condi[$nc][2] ) = explode( '|', $buffer );
$_Condi[$nc][0] = trim( mb_strtoupper($_Condi[$nc][0]) );
$_Condi[$nc][1] = trim( $_Condi[$nc][1] );
$_Condi[$nc][2] = trim( $_Condi[$nc][2] );
$_Condi[$nc][3] = 1;
$_Condi[$nc][4] = 'D';
$nc++;
break;
case '_CSSADD':
$ElPuntoEsRem = false;
$sElPuntoEsRem = false;
case '_PHPSTART':
case '_PHPCHECK':
case '_PHPEND':
case '_PHPFORM':
case '_PHPHEAD':
case '_PHPINI':
case '_PHPMENUICONS':
case '_DBEND':
case '_DBINI':
case '_DBINSERT':
case '_DBSQL':
$NoExePHPInterno = true;
case '_HTMEND':
case '_HTMHEAD':
case '_HTMINI':
case '_PntHelpHTM':
case '_PntHelpMARK':
case '_JSCHECK':
case '_JSEND':
case '_JSHEAD':
case '_JSINI':
case '_JSRECALC':
case '_JSONLOAD':
case '_JPCHECK':
if( $buffer=='' && $_DEBUG<>2 ) continue;
${$TipoEntrada} .= $buffer.$__Enter;
break;
break;
case 'IncH':
case 'IncJ':
case 'IncP':
$_DimInclude[$TipoEntrada][$_NombreInclude] .= $buffer.$__Enter;
break;
case '_OPTIONS';
$_OPTIONS[] = explode('|',$buffer);
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
}
}
}
unset($_DimEDF);
_SanitizeGET($_pField);
if( $_DBINDEX=="" && count($_DBSERIAL)>0 ) $_DBINDEX = $_DBSERIAL[1];
if( $_DBORDER=="" ) $_DBORDER = $_DBINDEX;
if( $_FORMACTION!="" && $_OptionsInListOn ){
eMessage('ERROR: Etiquetas incompatibles "FormAction" y "OptionsInList"', "HES");
$_FORMACTION = "";
}
if($_GET["_TRANSPARENT"]){
if(eSubstrCount($_PERSISTENTVAR,"_TRANSPARENT")==0){
if($_PERSISTENTVAR<>"") $_PERSISTENTVAR.=",";
$_PERSISTENTVAR .= "_TRANSPARENT";
}
}
if( $_ConDelFilter ){
$_ICONSPIEOFF = true;
$_FORMACTION = $_DelFilterURL;
if( $_FORMACTION=='' ) $_NOBUTTON = true;
}
if( $Opcion=='cR' && $_GET['_WSList']==1 ) $_NOBUTTON = true;
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'gf_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPSTART );
}
if( count($DimDBRange)>0 ){
$MemDBRange = array();
for($i=0; $i<count($DimDBRange); $i++){
$Campo = $DimDBRange[$i][0];
if( empty($Campo) ) continue;
if( isset($DimDBRange[$i][6]) && !empty($DimDBRange[$i][7]) ){
$tmp = _AgeToDate($DimDBRange[$i][7], $Campo);
$_POST[$Campo] = $tmp[0];
$MemDBRange[$Campo] = $Campo.$tmp[0];
if( $_DBADDFILTER!="" ) $_DBADDFILTER .= " and ";
$_DBADDFILTER .= "{$Campo} is not null";
if( eSqlType('mysql,mysqli') ){
$_DBADDFILTER .= " and {$Campo}<>'0000-00-00'";
}
$__DBADDFILTER = $_DBADDFILTER;
continue;
}
$ValorINI = $VarIni = stripcslashes($DimDBRange[$i][1]);
$ValorFIN = $VarFin = stripcslashes($DimDBRange[$i][2]);
$Inclusive = (eSubstrCount(',TRUE,!FALSE,1,,', ','.mb_strtoupper($DimDBRange[$i][3]).',')==1 );
$_ConDBRange[$Campo] = true;
$Si = false;
$sTipo = 'T';
for($c=0; $c<count($_Form); $c++){
if( $_Form[$c][1]==$Campo ){
$sTipo = $_Form[$c][2];
$Si = true;
break;
}
}
if( !$Si && (mb_substr($Campo,0,3)=='fe_' || mb_substr($Campo,0,4)=='_fe_') ) $sTipo = 'F4';
if( !$Si && (mb_substr($Campo,0,3)=='dt_' || mb_substr($Campo,0,4)=='_dt_') ) $sTipo = 'F4';
if( !$Si ){
if( isDate($ValorINI) ) $sTipo = 'F4';
if( isDate($ValorFIN) ) $sTipo = 'F4';
}
if( isset($_POST[$DimDBRange[$i][4].'_hours']) || mb_substr($DimDBRange[$i][0],0,3)=="cdi" ) $sTipo = 'CDI';
if( $sTipo=='F4' || $sTipo=='F2' ){
if( isDate($VarIni) ){
$VarIni = str_replace( '\\', '', $VarIni );
$ValorINI = $VarIni;
}
if( isDate($VarFin) ){
$VarFin = str_replace( '\\', '', $VarFin );
$ValorFIN = $VarFin;
}
}else if( eSubstrCount('|+|-|+,|-,|',"|{$sTipo}|" ) ){
if( $ValorINI!='' ) $ValorINI *= 1;
if( $ValorFIN!='' ) $ValorFIN *= 1;
}else if( $sTipo == 'CDI' ){
if( mb_strlen($VarIni)==10 ){
$VarIni = str_replace( '\\', '', $VarIni );
if( $_POST[$DimDBRange[$i][4].'_hours']!='' ){
$VarIni = $ValorINI = $VarIni.' '.$_POST[$DimDBRange[$i][4].'_hours'];
}else{
$VarIni = $ValorINI = $VarIni.' 00:00:00';
}
}
if( mb_strlen($VarFin)==10 ){
$VarFin = str_replace( '\\', '', $VarFin );
if( $_POST[$DimDBRange[$i][5].'_hours']!='' ){
$VarFin = $ValorFIN = $VarFin.' '.$_POST[$DimDBRange[$i][5].'_hours'];
}else{
$VarFin = $ValorFIN = $VarFin.' 23:59:59';
}
}
}
if(		 $ValorINI=='' && $ValorFIN=='' ){
}else if( $ValorINI=='' && $ValorFIN!='' ){
${$Campo} = '<'.(($Inclusive)?'=':'').$VarFin;
}else if( $ValorINI!='' && $ValorFIN=='' ){
${$Campo} = '>'.(($Inclusive)?'=':'').$VarIni;
}else if( $ValorINI!='' && $ValorFIN!='' ){
if( $ValorINI!=$ValorFIN ){
if( $_COUNT!='-1' && eSubstrCount(",cR,mR,bR,", ",{$Opcion},")>0 ){
if( $Inclusive ){
if( $ValorINI < $ValorFIN ){
${$Campo} = ">={$VarIni}<={$VarFin}";
}else{
${$Campo} = ">={$VarFin}<={$VarIni}";
}
}else{
if( $ValorINI < $ValorFIN ){
${$Campo} = ">{$VarIni}<{$VarFin}";
}else{
${$Campo} = ">{$VarFin}<{$VarIni}";
}
}
}else{
if( $Inclusive ){
if( $ValorINI < $ValorFIN ){
${$Campo} = ">={$VarIni}<={$VarFin}";
}else{
${$Campo} = ">={$VarFin}<={$VarIni}";
}
}else{
if( $ValorINI < $ValorFIN ){
${$Campo} = ">{$VarIni}<{$VarFin}";
}else{
${$Campo} = ">{$VarFin}<{$VarIni}";
}
}
}
}else{
${$Campo} = $VarFin;
}
}
if( !eSqlType('oracle') ) ${$Campo} = str_replace( "'", '"', ${$Campo} );
$_POST[$Campo] = ${$Campo};
$MemDBRange[$Campo] = $Campo.''.${$Campo};
}
}
if( $Opcion=='cR' && $_PSOURCE=='MAIN' && $_STOP ) $_NOBUTTON = true;
if( count($_DBMEMO)>0 ) $_DBMemoTable = $_DBTABLE;
_EsIntruso();
$_WINTITLE = _InVar($_WINTITLE);
if( $_PERSISTENTVAR!='' ){
$tmp = explode(',', $_PERSISTENTVAR);
$_xPERSISTENTVAR = $_PERSISTENTVAR;
$_PERSISTENTVAR = '';
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.${$tmp[$i]}.'"';
if( $_GET[$tmp[$i]]!='' || $_POST[$tmp[$i]]!='' ){
if( $tmp[$i][0]=='_' ){
array_push($_Form, array('',$tmp[$i],'X','T','30','','*Q*',${$tmp[$i]},'','',1));
$_DEFAULTVAL[$tmp[$i]] = ${$tmp[$i]};
$_ASSIGNFIELD[$tmp[$i]] = true;
}else{
$_DEFAULTVAL[$tmp[$i]] = ${$tmp[$i]};
}
}
}
}
if( $_FORMACTION!='' ){
if( $_REMOTE_!='' ) $_FORMACTION = str_replace( 'edes.php?', 'redes.php?', $_FORMACTION );
$_FORMACTION = str_replace( "'", CHR92."'", $_FORMACTION );
if( eSubstrCount( $_FORMACTION, '{' ) > 0 ){
$tmp = explode( '{',$_FORMACTION );
$tmp1 = explode( '}',$tmp[1] );
if( $tmp1[0][0]=='$' ) $tmp1[0] = mb_substr($tmp1[0],1);
$_FORMACTION = $tmp[0].$GLOBALS[$tmp1[0]].$tmp1[1];
}else if( mb_substr($_FORMACTION,-1)==':' ){
$_FORMACTION .= $OriFichero;
if( eSubstrCount( $_FORMACTION, 'edes.php?' ) == 0 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
}else if( mb_strtoupper($_FORMACTION)=='DOWNLOAD' ){
$_FORMACTION = 'edes.php?B:$extraer.gs';
}else{
list($tmp) = explode(':',$_FORMACTION);
if( mb_strlen($tmp)<5 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
}
}
if( isset($_GET['_IMPORT']) && $_PSOURCE!='WWORK' ) eMessage($__Lng[140],'HES',10);
_genContext();
eHTML("G:{$OriFichero}", $Opcion, $_TITLE);
echo '<SCRIPT type="text/javascript" name=eDes>';
if( ISCLI ){
echo REM.$_GET["_SESS_"]."\n";
}
echo $__Enter;
echo 'document.title = "GTAB";';
if( $_CARDSHOW ){
echo 'top.S.init(window,"all,tab");';
}else if( $_CSSNO ){
echo 'top.S.init(window);';
}else if( $_CSSFontSize=="" ){
echo 'top.S.init(window,"all,tab");';
}else if( $_CSSFontSize=="big" ){
echo "top.S.init(window,'all_big,tab_big');";
}else{
echo "top.S.init(window);";
}
$_DimMenuExp = [];
if( !_UserExport($_DimMenuExp, $_Mode, $_SubMode, $_FileDF) ){
echo 'S.sheetCopyOne(window, "print");';
}
echo '</SCRIPT>';
if( !$_CARDSHOW && !$_CSSNO && $_CSSFontSize!="" && $_CSSFontSize!="big" ){
echo "<LINK REL='stylesheet' HREF='css/all_{$_CSSFontSize}.css' TYPE='text/css' title='tab'>";
echo "<LINK REL='stylesheet' HREF='css/tab_{$_CSSFontSize}.css' TYPE='text/css' title='tab'>";
}
if( $_CSSBEFORE!='' ) echo $_CSSBEFORE;
if( $_CSSADDFILE!='' ){
$tmp = explode(',',$_CSSADDFILE);
for($n=0; $n<count($tmp); $n++){
if( eSubstrCount(mb_strtoupper($tmp[$n]), '.CSS')==1 ) list($tmp[$n],) = explode('.',$tmp[$n]);
$tmp[$n] = _InVar(trim($tmp[$n])).".css";
if( file_exists($_PathCSS."/".$tmp[$n]) ){
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/".$tmp[$n]."' TYPE='text/css'>".$__Enter;
}
}
}
if( $_CSSADD!='' ){
if( $_CSSADD[0]=='>' ) echo '<style>'.$__Enter.mb_substr($_CSSADD,1).'</style>';
}
?>
<style>
s-spinner {
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: #eeeeee;
cursor: pointer;
z-index: 999999;
--opacity: 0.9;
}
s-spinner span {
width: 3rem;
height: 3rem;
border: 0.5ch solid #FFF;
border-bottom-color: #aaaaaa;
border-radius: 50%;
display: inline-block;
animation: spinnerRotation 2s linear infinite;
position: absolute;
inset: 0;
margin: auto;
}
@keyframes spinnerRotation {
0% { transform: rotate(  0deg); }
100% { transform: rotate(360deg); }
}
s-spinner-point {
width: 1.5rem;
height: 1.5rem;
border: 0.4ch solid #FFF;
border-bottom-color: #5497cb;
border-radius: 50%;
display: inline-block;
cursor: pointer;
animation: spinnerRotation 2s linear infinite;
position: absolute;
left: 0;
top: 0;
inset: 0;
}
</style>
<?PHP
if( $_CSSAFTER!='' ) echo $_CSSAFTER;
if( isset($_GET['_IMPORT']) ){
if( $_DBINDEX==$_DBSERIAL[1] && $_DBINDEX2=='' ){
eMessage('Para importar un Excel hace falta definir un indice adicional al serial','HES');
}
$_NOBUTTON = true;
$_ADDBUTTON = array();
$_ADDBUTTON[] = array('<i class=ICONWINDOW>&#170;</i> Seleccionar Excel a Importar', '', 'S(":__csv").file()', '');
$_ADDBUTTON[] = array('<i class=ICONWINDOW>&#230;</i> Chequear Importación', '', '_ImportConfirm(-1)', '');
$_ADDBUTTON[] = array('<i class=ICONWINDOW>&#203;</i> Importar Excel', '', '_ImportConfirm(1)', '');
array_push($_SubVentana, '_ImportDATA');
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/lista.css' TYPE='text/css' disabled Import=1>";
echo '<style disabled Import=1>#BROWSE TH {font-size:18px;} #BROWSE TD {font-size:16px;}</style>';
$_TIPFORM["AddButton1"] = array("S"=>"L", "I"=>'Seleccione un fichero en formato "CSV" con los campos separados<br>por ";" y en la primera linea con el nombre de cada columna.');
$_TIPFORM["AddButton2"] = array("S"=>"L", "I"=>'Solo chequeará los datos a importar mostrando<br>un informe del resultado de la importación.');
$_TIPFORM["AddButton3"] = array("S"=>"L", "I"=>'Ejecuta la importación añadiendo<br>los registros a la base de datos.');
}
if( $_HTMHEAD!='' ) _IncludeJsHtml($_HTMHEAD, "HTMHead");
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
if( $_DEBUG==99 ) echo 'top.eTron();top.eTron("INICIO");';
echo 'var _DimRecalc = new Array();';
if( isset($_WINCLOSEESC) && $_WINCLOSEESC && $_NOBUTTON ){
echo 'S.windowCloseWithEsc(window);';
}
echo 'if( !window.frameElement.WOPENER ) window.frameElement.WOPENER = window.parent;';
if( $_DEBUG==13 || ( $_DEBUG > 19 && $_DEBUG < 30 ) ){
echo "var _DEBUG = {$_DEBUG};".$__Enter;
}else{
echo "var _DEBUG = 0;".$__Enter;
}
if( $_OtroDiccionario ) echo 'var _DB="'.$_DB.'";';
if( SESS::$_Development || SESS::$_D_!='' ){
echo 'var _GPFIELDS = new Array();';
foreach( $_GPFIELDS as $key=>$value ) echo "_GPFIELDS['{$key}'] = '{$value}';";
if( isset($_iToolsAdd) ) echo "var _iToolsAdd = '{$_iToolsAdd}';";
}else{
echo 'document.oncontextmenu = new Function("return false");';
}
if( $_DEBUG==2 ) echo 'var _ShowError = 1;';
$_SourceScript = $OriFichero;
echo 'var _Source=_DESDE_=_FCH_="'.eQuote($OriFichero).'",_SourceOne="'.$DFichero[0].'",';
echo '_BYPHONE = '.((SESS::$_BYPHONE) ? 'true' : 'false').',';
echo '_PRINT_STATUS = '.(( SESS::${"print_tab".(($_EXPORTSCOPE=="public") ? "_public" : "_private")} ) ? 'true' : 'false').',';
echo '_CARD = '.(($_CARDSHOW)? 'true' : 'false').',';
echo "_Obj='G', _Mode='{$Opcion}', _oMode='{$_OpcionBak}', _NmGDF='', _ModeSubList='',";
if( !isset($_PSOURCE) ) $_PSOURCE='';
echo "_PSOURCE='{$_PSOURCE}',";
echo "_CONTEXT=".eContextPKMain().",";
if( $_COUNT!=-1 && eSubstrCount(',c,m,b,', ",{$Opcion},")>0 ) $_FORMBUTTONS = '';
if( $_COUNT || eSubstrCount(',c,m,b,l,s,q,', ",{$Opcion},")>0 ) $_ModeQuestion = true;
echo "_FORMBUTTONS='{$_FORMBUTTONS}',";
echo '_STOP='.(($_STOP) ? 'true' : 'false').','.$__Enter;
echo '_pOBJ_ = _WOPENER = window.frameElement.WOPENER,';
echo '_pFCH_ = _WOPENER._Source,';
echo '_eID = new Date().getTime(),';
echo '_pID = _WOPENER._eID,';
if( $_DBLOGINCLUDE!="" ) '_DBLOGINCLUDE = "'.$_DBLOGINCLUDE.'",';
echo '_WinCaption = '.((isset($_WINCAPTION))?'true;':'false;');
if( !SETUP::$Desktop['MenuAutoHidden'] ) echo "if(window.name=='IWORK') top.eAutoMenu({$_AUTOMENU});".$__Enter;
echo "var _ymd=_D2S=_Hoy='".date('Ymd')."',_Time='".date('H:i:s')."',_iEDes={$_ENV[SYS]['iEDes']},_Connection_=".SESS::$_Connection_.",_User={$_User},_Node={$_Node},".$__Enter;
if( isset($_GET['_IMPORT']) ) $_NOBUTTON = true;
echo "_TABGroupEmpty='TABHeader',";
echo 'ConF10 = '.(($_NOBUTTON)? '0' : '1').',';
echo '_CountType = 0,';
echo '_Zona = '.(($_ZonaFija) ? 'true':'false').',';
if( isset($_WINFORM) ){
echo "_AutoSize=new Array({$_WINFORM[0]},{$_WINFORM[1]},'{$_WINFORM[2]}','{$_WINFORM[3]}'),";
}else{
echo "_AutoSize=new Array(0,0,'','{$_WINTITLE}'),";
}
$_ShowZero = SETUP::$Tab['ShowZero'];
echo '_ShowZero='.$_ShowZero.',';
echo '_ShowZeroFields={';
$n=0;
foreach($_ShowZeroFields as $k=>$v){
if( $n++>0 ) echo ",";
echo "{$k}:{$v}";
}
echo "},".$__Enter;
echo '_3CXTab = '._PrintBoolean(!preg_match('/^(m|c|b)$/u', $Opcion) && SETUP::$System['Call3CXTab'] && !$GLOBALS["_3CX"]["_NO_"]).",";
echo "_DBRange = new Array(),";
if( isset($_CLOSE_) || isset($_CLOSE) ) echo "_CLOSE_ = '{$_CLOSE_}',";
echo '_Remote = '.((isset($_REMOTE_))? 'true' : 'false' ).','.$__Enter;
echo '_FormStatic = false,'.$__Enter;
echo '_ChildrenData = new Array(),';
echo '_DimChildrenData = new Array(),';
echo '_SaveList = new Array(),';
echo '_SaveOnLine = new Array(),';
echo '_OnLineIMG = new Array();';
$n = 0;
foreach($_RADIO as $key=>$value){
foreach($value as $k=>$v){
if( $k=='DEL' && $v ){
if( $n++==0 ) echo 'var _Radio = new Array();';
echo "_Radio['__{$key}'] = true;";
}
}
}
$okTitulo = EnPlural($_TITLE, "", false);
$Titulo = '';
$SubOp  = '';
switch( $Opcion ){
case 'bR': $SubOp = 'B' ; $Titulo=$__Lng[80]; break;
case 'cR': $SubOp = 'c' ; $Titulo=$__Lng[80]; break;
case 'mR': $SubOp = 'M' ; $Titulo=$__Lng[80]; break;
case 'a' : $SubOp = 'A' ;
if( isset($_GET['_IMPORT']) ){
$Titulo = $__Lng[139];
$okTitulo = $Titulo;
$_TITLEICON[] = '<img src=g/l_d_xls.gif style="margin-left:10px;curs-or:default" onclick=top.gsHelp("$import_xls") title="Ayuda">';
$_HELP .= 'top.gsHelp("$import_xls");';
}else{
$Titulo = $__Lng[80];
}
break;
case 'b' : $SubOp = 'bR'; $Titulo=$__Lng[85]; break;
case 'c' : $SubOp = 'cR'; $Titulo=$__Lng[82]; break;
case 'm' : $SubOp = 'mR'; $Titulo=$__Lng[83]; break;
case 'A' : $SubOp = 'a' ; $Titulo=$__Lng[84]; break;
case 'B' : $SubOp = 'b' ; $Titulo=$__Lng[85]; break;
case 'M' : $SubOp = 'm' ; $Titulo=$__Lng[83]; break;
default:
eMessage(str_replace('#',$Opcion,$__Lng[53]), 'HES');
}
$xOpcion = ','.$Opcion.',';
if( SETUP::$System['CleanTitle'] ) $Titulo = $okTitulo;
echo "_Accion='{$SubOp}';";
echo 'var _SelectMaxRows='.((isset($_SelectMaxRows)) ? $_SelectMaxRows : 11).',';
echo '_EnterForSubmit='.((isset(SETUP::$Tab['EnterForSubmit']) && SETUP::$Tab['EnterForSubmit']) ? 'true' : 'false').',';
echo "_CheckBoxSave=new Array('{$_CheckBoxSave[0]}','{$_CheckBoxSave[1]}','{$_CheckBoxSave[2]}'),";
if( isset($_CheckDBIndexFunc) ) echo "_CheckDBIndexFunc='{$_CheckDBIndexFunc}',";
if( isset($_CheckDBIndexDB) ) echo "_CheckDBIndexDB='{$_CheckDBIndexDB}',";
echo "_TargetUrl='{$_TargetUrl}',";
echo "_FORMTYPEMENU='{$_FORMTYPEMENU}';";
echo 'S(window).rule("+.SELECTMULTIPLEBOX {min-height:'.($_DefaultSize['TT']['H']+($_DefaultSize['CSS']['inputPaddingV']*2+1)).'px !important;}");';
echo '</SCRIPT>';
$dimJS = [
'binary.js'
,'edicion.js'
,"gficha{$_FORMTYPEMENU}.js"
,'ed.js'
,'sublist.js'
];
_FileNoCache($dimJS); unset($dimJS);
echo '<script type="text/javascript" name=eDes>';
echo 'var _SubmitHidden = '.(($_SUBMITHIDDEN) ? 'true':'false').';'.$__Enter;
if( isset($_SelectMultiple) ) echo '_SelectMultiple='.(($_SelectMultiple)?'true':'false').';';
echo '</script>';
if( count($_JSINCLUDE)>0 ){
foreach($_JSINCLUDE as $k=>$v){
if( mb_substr($k,-3)!='.js' ) $k .= '.js';
if( $k[0]=='$' ) $k = 'edes.php?R:'.$k.eSessionAddUrl();
if( SESS::$spider['opcion']!="" && function_exists("__Spider") ){
__Spider($k);
}
echo '<SCRIPT src="'.$k.'" name=JSInclude></SCRIPT>'.$__Enter;
}
unset($_JSINCLUDE);
}
if( $_JSHEAD!='' ) _IncludeJsHtml($_JSHEAD, "JSHead");
if( !empty($_PHPHEAD) ){
$tmpFile = GrabaTmp('g_phphead', $_PHPHEAD, $LenDoc, $_FILE_PHPHEAD);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPHEAD);
}
$_HELP = 'top.gsHelpErr(window);'.$_HELP;
$gsEdition = '';
if( SETUP::$System['WaterMarking']!='' ) $_WaterMarkingCSS = "background-image:url(".SETUP::$System['WaterMarking']."); background-repeat:no-repeat; background-attachment:fixed;";
if( isset($_JSONLOAD) ) $_ONLOAD .= '_JsOnLoad();';
if( eSubstrCount('AMB',$Opcion)>0 ){
echo "</HEAD><BODY onload='{$gsEdition}{$_ONLOAD}'";
}else{
if( eSubstrCount(',c,b,m,a,mR,', ",{$Opcion},")==1 ){
if( $_ONLOAD!='' && mb_substr($_ONLOAD, -1)!=';') $_ONLOAD .= ';';
$_ONLOAD .= '_FrmCopy();';
}
echo "</HEAD><BODY onload='{$gsEdition}OkChange();{$_ONLOAD}' onclick='S.selectNone(window)'";
}
echo " class='BODYTAB SCROLLBAR'",
" style='v-isibility:hidden; display:inline-table; margin:0px; padding:0px;{$_WaterMarkingCSS}'",
" onbeforeunload='OkSalir()'",
" ondragstart='return false'",
" onmousemove='S.inactivity()'",
" ontouchstart='S.inactivity()'";
if( $_TIPFORM['BODY']['F']!='' ){
$bTitle = $_TIPFORM['BUTTON']['F'];
if( $bTitle=='>' ){
echo " eHelp='#_TIP_F_BODY'";
}else{
echo " eHelp='{$bTitle}'";
}
}
if( SESS::$_D_!='' && !($OriFichero[0]=="$" && SESS::$_D_!="~") ){
echo " oncontextmenu='top.gsEdit(window)'";
}
echo " onkeydown='S.help(window,event)'>".$__Enter;
?>
<s-spinner onclick="this.style.display='none'">
<span></span>
</s-spinner>
<?PHP
if( SETUP::$System['commandJS']!='' || SESS::$commandJS!='' ){
eJS(SESS::$commandJS.SETUP::$System['commandJS']);
}
if( $_JSINI!='' ) _IncludeJsHtml($_JSINI, "JSIni");
if( isset($_JSONLOAD) ){
$_JSONLOAD = 'function _JsOnLoad(){'.$__Enter.$_JSONLOAD.'}'.$__Enter;
_IncludeJsHtml($_JSONLOAD, "JSOnload");
}
if( !empty($_PHPINI) ){
$tmpFile = GrabaTmp('g_phpini', $_PHPINI, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
$TablaWH = '100%';
if( $_TITLE!='' && $_oTITLE!='' ){
$_TITLE = EnPlural($_TITLE, $Titulo, false, $_oTITLE);
$_TITLE = eTitleTransform($_TITLE);
$_LOGREQUEST["title"] = $_TITLE;
}
if( $_TargetUrl=="" ){
if( SETUP::$System['WinNoTitle'] && $_PSOURCE!='WWORK' && $_PSOURCE!="" && $_GET["_NEWIFRAME"]!="1" ) $_WINCAPTION = '#';
if( $_WINCAPTION=='#' ){
$_WINCAPTION = $_TITLE;
$_TITLE = '';
$_NOTITLE = true;
}
}else if( $_GET['_IWORK']==2 && !isset($_GET["_ISUBLIST"]) ){
$_ADDBUTTON[] = array("<i class=ICONINPUT op='ReturnIWORK'>F</i> ".$__Lng[176], "", "_ReturnIWORK()", "", "", "");
}
$Fila = '';
$Mandar = (eSubstrCount($Opcion, 'R')==1);
if( $_GET['_ADDFILTER']!='' ){
$_NmGDF = $OriFichero;
$Fichero = $DFichero[0];
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
eInit();
$__='{#}eDes{#}';
$_Accion='L'; include($Dir_.'_lista.gs');
eEnd();
}
if( $_JPCHECK<>"" && eSubstrCount(",A,B,M,", $Opcion)>0 ){
include(DIREDES."jpcheck.inc");
}
$filePField = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.snt";
if( eSubstrCount(',A,B,M,', $Opcion)==1 ){
list($_pField, $_CHR, $_EACCENT, $_UPLOADFILE, $_FILELOG, $_DBRANGEINSERT) = unserialize(file_get_contents($filePField));
}
if( eSubstrCount(',A,B,M,bR,cR,mR,', $xOpcion)==1 ){
$_ABM = (eSubstrCount('ABM',$Opcion)==1);
if( $_ABM && isset($_TXTLOG) ) eTXTLOG($_TXTLOG,$_DBINDEX);
include($Dir_.'abcm_g.inc');
if( $_ABM ) $_Form = array();
}else{
Estadistica('gFi', 0, '', $_DBTABLE);
}
if( count($_OPTIONS)>0 ){
include_once($Dir_.'options.inc');
_GenMenu($_OPTIONS);
}
if( count($_SubVentana)>0 ) GenVentanas($_SubVentana);
if( !empty($_PHPFORM) ){
$Hay_fPHP = true;
if( !function_exists('ModFormulario') ){
$_PHPFORM = 'function ModFormulario(&$_Form, $Opcion, $Fichero, $nHoja, &$_vF, $_pField){'.CHR10. $_PHPFORM . '}';
$tmpFile = GrabaTmp('g_phpform', $_PHPFORM, $LenDoc, $_FILE_PHPFORM);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPFORM);
}
}
echo $__Enter;
foreach($_TIPFORM as $k=>$v){
foreach($v as $k2=>$v2){
if( $v['M']<>"" ) continue;
if( $v2[0]=='>' ){
$v2 = file_get_contents(eScript(mb_substr($v2,1)));
$v['S'] = 'W';
}else{
if( mb_substr($v2,-3)=='();' ) $v2 = mb_substr($v2,0,-1);
if( mb_substr($v2,-2)=='()' ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$v2.';');
$v2 = eval('return '.$v2.';');
$v['S'] = 'W';
}
}
if( $v['S']=='W' ){
echo '<span id="_TIP_'.$k2.'_'.$k.'" style="display:none;'.(($_TIPFORM[$k]['W']!='')?'width:'.$_TIPFORM[$k]['W']:'').'">'.rtrim($v2).'</span>';
$v2 = '>';
$_TIPFORM[$k][$k2] = $v2;
}else{
$v2 = str_replace(array('"',"'"), array('&34;','&39;'), $v2);
$_TIPFORM[$k][$k2] = $v2;
}
}
}
echo "<table id=PAGINA style='border-collapse:collapse; background:transparent; display:".(($_ConRespuesta)? 'none':'table'). "' valign='bottom' width='{$TablaWH}' height='{$TablaWH}' border=0px cellspacing=0px cellpadding=0px>";
echo '<tr><td id=Papel'.(($_X>-1)? '>':' align=center>');
if( $_HTMINI!='' ) _IncludeJsHtml($_HTMINI, "HTMIni");
$SolapaON = 0;
$TSolapaON = 0;
for($nc=0; $nc<count($DOpcion); $nc++){
if( $DFichero[$nc][0]!='-' && $DFichero[$nc][0]!='*' ){
$TSolapaON++;
if( $SolapaON==0 ) $SolapaON = $nc + 1;
}
}
$LTitle = '';
if( $_TIPFORM['TITLE']['L']!='' ){
$LTitle = $_TIPFORM['TITLE']['L'];
if( $LTitle=='>' ){
$LTitle = " onmouseenter=\"S(this).tip('#_TIP_L_TITLE',-1)\"";
}else{
$LTitle = str_replace(array('"',"'"), array('&34;',"&39;"), $LTitle);
$LTitle = " onmouseenter=\"S(this).tip('{$LTitle}',-1)\"";
}
if( $_TIPFORM['TITLE']['T']!='' ) $LTitle .= ' TimeOff="'.$_TIPFORM['TITLE']['T'].'"';
}
echo '<div id="TABContainer" on-mousewheel="return false;" style="display:inline-table;text-align:left;vertical-align:top;'.(($_NOTITLE==true)?'margin:0px;':'').'">';
if( eSubstrCount($SubOp,'R')==0 ){
?>
<TABLE id='TABBorder' border=0px cellspacing=0px cellpadding=0px style="display:inline-table;<?=(($_NOTITLE==true)?'border:0px;':'')?>"<?=(($_NOTITLE==true)?" class='NO_SHADOW'":"")?>>
<TR>
<?PHP if( $_FORMTYPEMENU=='' ){ ?>
<TD class='TABGroupOuter' rowspan=3 width=1px onmousewheel='_TabWheel()' style="vertical-align:top;">
<TABLE border=0px cellspacing=0px cellpadding=0px height='100%' id='TABGroupInner'>
<TR><TD id='TABGroupEmpty'>&nbsp;</TD></TR>
<TR><TD valign=top>
<?=_MenuGFicha($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction)?>
</TD></TR>
<TR><TD id='TABMenuIcons' height=100%>
<?PHP
if( !empty($_PHPMENUICONS) ){
$tmpFile = GrabaTmp('g_phpmenuicons', $_PHPMENUICONS, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPMENUICONS);
}
?>
</TD></TR>
<TR><TD class='TABGroupFootIcons'>
<?= _IconosPie($Opcion) ?>
</TD></TR>
</TABLE>
</TD>
<?PHP } ?>
<TD id='TABHeader' valign=top style="<?=(($_NOTITLE==true)?'display:none;':'')?>padding:0px">
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%>
<TR>
<TD a=1 class='TABHeaderTitle' id='TABHeaderTitle' onclick='_SetCaption("TD")'<?=$LTitle?>>
<?PHP
$icono = $_URL_IN_MENU[$_Mode[0]];
if( $icono!="" ){
echo '<TABLE border=0px cellspacing=0px cellpadding=0px width=100%><TR>';
echo "<td width=1px id='ICONTITLE' a=4>";
echo eIcon($icono, null, "WINDOWTITLEICON");
echo '<td id="LABELTITLE">'.$_TITLE;
echo '</table>';
}else{
echo $_TITLE;
}
?>
</TD>
<TD class='TABHeaderIcons' id='TABHeaderIcons' width=1px><?=_IconosTitle($_TITLEICON)?></TD>
</TR>
</TABLE>
</TD>
</TR>
<?PHP if( $_FORMTYPEMENU==1 ){ ?>
<TR>
<TD class='TABGroupOuter' width=1px style="text-align:left;vertical-align:top;">
<?=_MenuGFicha($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction)?>
</TD>
</TR>
<?PHP } ?>
<?PHP if( $_FORMTYPEMENU == 2 ){ ?>
<TR>
<TD class='TABGroupOuter' style="text-align:left;vertical-align:top;">
<?=_MenuGFicha2($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction)?>
</TD>
</TR>
<?PHP } ?>
<TR><TD id='TABBody' style='width:1px'>
<TABLE border=0px cellspacing=0px cellpadding=0px class='TABMiddle' id='TABBodyForm' style='border-collapse:collapse;width:1px'>
<TR><TD style='text-align:left;vertical-align:top;margin-bottom:0px;padding-bottom:0px;width:1px'>
<?PHP
}else{
?>
<TABLE border=0px cellspacing=0px cellpadding=0px id='TABBorder' style="width:1px;<?=(($_NOTITLE==true)?'border:0px;':'')?>"<?=(($_NOTITLE==true)?" class='NO_SHADOW'":"")?>>
<TR><TD id='TABHeader' valign=top style="<?=(($_NOTITLE==true)?'display:none;':'')?>padding:0px;">
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%<?=(($_NOTITLE==true)?' style="display:none"':'')?>>
<TR>
<?PHP
$icono = $_URL_IN_MENU[$_Mode[0]];
if( $icono!="" ){
echo "<TD a=2 class='TABHeaderTitle' onclick='_SetCaption(\"TD\")'{$LTitle}>";
echo '<TABLE border=0px cellspacing=0px cellpadding=0px width=100%><TR>';
echo "<td a=3 width=1px id='ICONTITLE'>";
echo "<td a=4 id='TABHeaderTitle'>{$_TITLE}";
echo '</table>';
}else{
echo "<TD a=5 class='TABHeaderTitle' id='TABHeaderTitle' onclick='_SetCaption(\"TD\")'{$LTitle}>{$_TITLE}";
}
?>
</TD>
<TD class='TABHeaderIcons' id='TABHeaderIcons' width=1px><?=_IconosTitle($_TITLEICON)?></TD>
</TR>
</TABLE>
</TD></TR>
<TR><TD id='TABBody' style='width:1px'>
<TABLE border=0px cellspacing=0px cellpadding=0px class='TABMiddle' id='TABBodyForm' style='border-collapse:collapse;width:1px'>
<TR><TD style='text-align:left;vertical-align:top;margin-bottom:0px;padding-bottom:0px;width:1px'>
<?PHP
}
$CreaSubForm = array();
$Campo1 = array();
$xCampo1 = "_CmpHoja = new Array('',";
$xHoja1 = 'Hojas = new Array(-1,';
$xHojaV = 0;
$TotalHojas = count($DOpcion);
if( eSubstrCount($SubOp, 'R')>0 ) $TotalHojas = 1;
if( $_CheckDBIndex!='' ){
$tmp = explode('|',$_CheckDBIndex);
if( count($_DBSERIAL)>0 ){
if( eSubstrCount($tmp[0], $_DBSERIAL[1])>0 ){
$tmp2 = explode(';',$tmp[0]);
if( $tmp2[0]==$_DBSERIAL[1] ) $tmp[0] = $tmp2[1];
$_CheckDBIndex = '';
for($n=0; $n<count($tmp); $n++) $_CheckDBIndex .= $tmp[$n].'|';
}
}else{
$tmp[0] = str_replace(';',',',$tmp[0]);
$_CheckDBIndex .= '|';
}
$tmp2 = explode('|',$_DBTABLE);
if( mb_substr($_CheckDBIndex,-1)!='|' ) $_CheckDBIndex .= '|';
$_CheckDBIndex .= $tmp2[0];
if( $_CheckDBIndex[0]=='|' ){
$_CheckDBIndex = '';
}else{
$tmp2 = explode(';',$tmp[0]);
$tmp2 = explode(',',$tmp2[0]);
for($n=0; $n<count($tmp2); $n++) $_DimCheckDBIndex[$tmp2[$n]] = true;
}
}
if( $_PERSISTENTVAR!='' && eSubstrCount($_PERSISTENTVAR,'_GetValue_(')>0 ){
$tmp = explode('_GetValue_(', $_PERSISTENTVAR);
for($n=1; $n<count($tmp); $n++){
list($k) = explode( ')', $tmp[$n] );
if( ${$k}!='' ) $v = ${$k};
elseif( $_vF[$k]!='' ) $v = $_vF[$k];
elseif( $_POST[$k]!='' ) $v = $_POST[$k];
else $v = '';
$_PERSISTENTVAR = str_replace("_GetValue_({$k})", $v, $_PERSISTENTVAR);
}
}
if( $_PDFLABELTOOLS && !$_PDFLABEL ){
$_PDFLABELTOOLS = false;
foreach($_ADDCODE as $k=>$v) if( eSubstrCount($_ADDCODE[$k]['A'], 'g/label_sel.')>0 ) unset($_ADDCODE[$k]['A']);
}
$TotalFRM = 0;
$Form_1 = -1;
$Campo_1 = -1;
$NomSolapa = 'var _NomSolapa = new Array(""';
if( $_Mode=='a' ) SESS::$_InsertToSeek = '';
$_ConED = false;
$Con_SAVEDATALIST = true;
$_HIDDENFIELDS = array();
$file = null;
for($nc=0; $nc<$TotalHojas; $nc++){
$_OnlyVisibleGroup = false;
$xNomSolapa = $DOpcion[$nc];
if( $xNomSolapa[0]=='[' ) list(,$xNomSolapa) = explode(']', $xNomSolapa);
if( eSubstrCount($xNomSolapa,"}")>0 ) list(,$xNomSolapa) = explode('}', $xNomSolapa);
$NomSolapa .= ',"'.trim($xNomSolapa).'"';
if( $_DEBUG==9 || $_DEBUG==11 ) $_DimDebug[] = '[#] '.$_Modo.' : '.$DOpcion[$nc].' [#]';
echo $__Enter;
$TotalFRM++;
$_CalColumnaUno[$TotalFRM] = 0;
$sc = '#';
switch( $DFichero[$nc][0] ){
case '*':
echo "<table id=TABNumber{$TotalFRM} class='TABMiddle' cellspacing=0px cellpadding=0px border=".(($GLOBALS[_DEBUG]==3) ? '1':'0').'px>'.'<TR style="FONT-SIZE:1px"><TD width=1px><SPAN></SPAN></TD></TR>';
$Oculto = (eSubstrCount($Opcion, 'R')==1 || $Opcion=='a') ? 0 : 1;
$xHoja1 .= '0,';
$xHojaV++;
$_Action = "{$NomFile}?G{$SubOp}:{$OriFichero}";
$_AccionDIR = "{$NomFile}?G{$Opcion}:{$OriFichero}";
echo "\n<FORM accept-charset='utf-8' eType='Constante' style='margin-bottom:0px;padding-bottom:0px' NAME='FRM{$TotalFRM}' METHOD='POST'{$_AutoCompletForm} spellcheck='false'>";
$sc = CreaHOJA($nc+1, $Opcion, $DFichero[$nc], $Mandar, true, $TotalFRM, $Oculto);
echo '</tr>';
echo '</table>';
echo '</form>';
$DimTipoForm[$nc] = 'F';
break;
case '>':
echo "<table id=TABNumber{$TotalFRM} class='TABMiddle' cellspacing=0px cellpadding=0px border=";
if( $GLOBALS['_DEBUG']==3 ){ echo '1px'; }else{ echo '0px'; }
echo '>'.'<TR style="FONT-SIZE:1px"><TD width=1px><SPAN></SPAN></TD></TR>';
echo '<TR><TD align=center>';
include(eScript(mb_substr($DFichero[$nc], 1)));
$DimTipoForm[$nc] = 'I';
$xHoja1 .= '1,';
$xHojaV++;
if( $Form_1==-1 ){
$Form_1 = $TotalFRM;
$Campo_1 = $nc;
}
echo '</td></tr>';
echo '</table>';
break;
case '=':
echo "<table id=TABNumber{$TotalFRM} class='TABMiddle' cellspacing=0px cellpadding=0px border=".(($GLOBALS[_DEBUG]==3) ? '1px':'0px');
if( $nc!=0 ) echo " style='display:none'";
echo '>'.'<TR style="FONT-SIZE:1px"><TD width=1px><SPAN></SPAN></TD></TR>';
echo '<tr><td>';
$DFichero[$nc] = trim(mb_substr($DFichero[$nc],1));
echo "<IFRAME src='edes.php?E:{$DFichero[$nc]}&_Mode={$SubOp}' eNORESIZE=true width='{$DSubOpcion[$nc][0]}px' height='{$DSubOpcion[$nc][1]}px' FRAMEBORDER='{$DSubOpcion[$nc][1]}' name='FRAME{$TotalFRM}'></iframe>";
echo '</table>';
if( $Form_1==-1 ){
$Form_1 = $TotalFRM;
$Campo_1 = $nc;
}
break;
default:
if( $_ZonaFija && $TotalFRM==1 && $TotalHojas>1 ){
$NomHoja = 'HOJAzona';
echo "<table id='HOJAzona' class='TABMiddle' width='100%' border='";
}else{
$tmp = (count($_FORMWIDTHS)==0) ? '100%':'1px';
$NomHoja = "TABNumber{$TotalFRM}";
echo "<table id='TABNumber{$TotalFRM}' class='TABMiddle' width='{$tmp}' border='";
}
echo (($GLOBALS['_DEBUG']==3) ? '1px':'0px')."'";
if( $DFichero[$nc][0]=='-' ){
echo " style='display:none'";
}else{
echo " style='border-collapse:collapse; display:table-row'";
}
echo ' cellspacing=0px cellpadding=0px>';
if( $DFichero[$nc][0]=='-' ){
$Oculto = 1;
$DFichero[$nc] = trim(mb_substr($DFichero[$nc], 1));
echo "\n<FORM accept-charset='utf-8' eType='Oculto' style='margin-bottom:0px; padding-bottom:0px' spellcheck='false' NAME='FRM{$TotalFRM}' METHOD='POST'{$_AutoCompletForm} spellcheck='false'><TR><TD>";
$xHoja1 .= '0,';
}else{
$Oculto = 0;
$xHoja1 .= '1,';
$xHojaV++;
$_Action = "{$NomFile}?G{$SubOp}:{$OriFichero}{$_PERSISTENTVAR}";
$_AccionDIR = "{$NomFile}?G{$Opcion}:{$OriFichero}{$_PERSISTENTVAR}";
echo "\n<FORM accept-charset='utf-8' eType='Directo' style='margin-bottom:0px;padding-bottom:0px' spellcheck='false' NAME='FRM{$TotalFRM}' METHOD='POST'{$_AutoCompletForm} spellcheck='false'>";
if( isset($_GET['_IMPORT']) && $TotalFRM==1 ){
echo '<input type="text" name="__csv" efilename="Array" size="80" maxlength="80" eext="csv" ebyts="90000000" style="display:none">';
echo '<input type="file" name="_FILE___csv" style="display:none">';
}
if( $Form_1 == -1 ){
$Form_1 = $TotalFRM;
$Campo_1 = $nc;
}
}
$sc = CreaHOJA($nc+1, $Opcion, $DFichero[$nc], $Mandar, true, $TotalFRM, $Oculto, $NomHoja);
if( $nc==0 ){
_GeneraInputMD5($_DBRLOCK, $_Mode);
}
echo '</tr>';
echo $__Enter.'</div></table>'.$__Enter;
if( ($nc+1)==$TotalHojas && preg_match('/^(c|m|b)$/u', $_Mode) && count($_HIDDENFIELDS)>0 )  echo "<INPUT TYPE='hidden' NAME='_HIDDENFIELDS' value='".implode(",", $_HIDDENFIELDS)."'>";
if( $Con_SAVEDATALIST ){
echo "<TEXTAREA NAME='_SAVEDATALIST' ID='_SAVEDATALIST' COLS=80 ROWS=10 MAXLENGTH=2000 style='display:none'></TEXTAREA>";
$Con_SAVEDATALIST = false;
}
if( $nc==0 && $_MemorizeFields && preg_match('/^(mR|bR|a)$/u', $_Mode) ){
$file = time();
echo "<INPUT TYPE='hidden' NAME='_PFIELD' VALUE='{$file}'>";
}
echo '</form>';
$DimTipoForm[$nc] = 'F';
}
$Campo1[$nc] = $sc;
$xCampo1 .= "'".$sc."',";
if( $nc==0 ) eContextGet();
}
$NomSolapa .= ');';
$xCampo1 .= "'' );";
$xHoja1 .= "-1);";
if( $file!=null && $_MemorizeFields && preg_match('/^(mR|bR|a)$/u', $_Mode) ){
file_put_contents('../_tmp/php/'.S::$_User."_".$file.".pf", serialize($_pField));
}
if( eSubstrCount(',a,bR,mR,', ",{$Opcion},")==1 ){
file_put_contents($filePField, serialize(array($_pField,$_CHR,$_EACCENT, $_UPLOADFILE, $_FILELOG, $_DBRANGEINSERT)));
}
if( eSubstrCount($SubOp, 'R')==0 ){
?>
</TD></TR>
</TABLE>
</TD></TR>
<TR style='height:1px'><TD class='TABFoot' style='vertical-align:top; height:1px'>
<TABLE class='TABBottom' border=0px cellspacing=0px cellpadding=0px width=100%<?= (($_NOBUTTON)?' class=noButton':'') ?> style="border-collapse:collapse;">
<TR>
<TD class='TABFootIcons' width='1px'><?=(($_FORMTYPEMENU=="")? '&nbsp;' : _IconosPie($Opcion))?></TD>
<TD class='TABFootButton'>
<?PHP $ConSubListado = _IconoSubmit($Opcion) ?>
</TD>
</TR>
</TABLE>
</TD></TR>
</TABLE>
<?PHP
}else{
?>
</TD></TR>
</TABLE>
</TD></TR>
<TR style='height:1px'><TD class='TABFoot' style='vertical-align:top; height:1px; padding:0px'>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%<?=(($_NOBUTTON)?' class=noButton':'')?> style="border-collapse:collapse;">
<TR>
<TD class='TABFootIcons' width='1px'>
<?= _IconosPie($Opcion) ?>
</TD>
<?PHP if( $_FORMTYPEMENU!='' && !empty($_PHPMENUICONS) ){
echo '<TD id="TABMenuIcons">';
$tmpFile = GrabaTmp('g_phpmenuicons', $_PHPMENUICONS, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPMENUICONS);
echo '</TD>';
} ?>
<TD class='TABFootButton'>
<?PHP $ConSubListado = _IconoSubmit($Opcion) ?>
</TD>
</TR>
</TABLE>
</TD></TR>
</TABLE>
<?PHP
}
echo '</div>';
if( $_HTMEND!='' ) _IncludeJsHtml($_HTMEND, "HTMEnd");
echo '</table>';
$n = 0;
foreach($_SUBSELECTMEMORY as $k=>$v){
if( $n==0 ) echo '<script type="text/javascript">';
$n=1;
echo "_SSMemory['{$k}'] = true;";
}
if( $n==1 ) echo '</script>';
if( count($_FIELDBROWSER)>0 ){
_FileNoCache('fieldbrowser.js');
echo '<DIV id="SelBROWSER" class="SELECT EDITABLE SCROLLBAR" style="position:absolute" onmouseleave=_SelBrowseOut()><TABLE INIT=0 Pnt=0></TABLE></DIV>';
echo "<SCRIPT type='text/javascript'>SelBROWSER=DGI('SelBROWSER');</SCRIPT>".$__Enter;
}
echo '<SCRIPT type="text/javascript" name=eDes>';
if( isset($_SelectMultiple) || isset($_SELECTMULTIPLEFIELD) ){
if( isset($_SelectMultiple) )	echo '_SelectMultiple='.(($_SelectMultiple)?'true':'false').';';
if( isset($_SELECTMULTIPLEFIELD) ) foreach($_SELECTMULTIPLEFIELD as $k=>$v) echo "_SelectMultipleField['{$k}']=true;";
}
echo 'var _ENTER = new Array();';
if( isset($_ENTER) ){
for($n=0; $n<count($_ENTER); $n++){
$tmp2 = explode(',',eNsp($_ENTER[$n]));
echo '_ENTER["'.$tmp2[0].'"]="'.$tmp2[1];
for( $i=2; $i<count($tmp2); $i++ ) echo ','.$tmp2[$i];
echo '";';
}
}
echo "var _FORMBUTTONS='";
if( preg_match('/^(c|m|b)$/u', $Opcion) ){
$dim = array("a","b","c","m");
foreach($_URL_IN_MENU as $k=>$v){
if( in_array($k, $dim) ) echo $k;
}
}
echo "';";
if( $TotalHojas==1 ) $_TABTITLE[1] = EnPlural($_TABTITLE[1], $Titulo, false, $_TABTITLE[1]);
$_TabTITLE = array();
echo 'var _DimTITLE = new Array(""';
for($n=0; $n<count($DOpcion); $n++){
if( $_TABTITLE[$n+1]=='' ) $_TABTITLE[$n+1] = $_TITLE;
if( $_TABTITLE[$n+1]=='' ) $_TABTITLE[$n+1] = $_TABTITLE[1];
$_TABTITLE[$n+1] = eQuote(EnPlural($_TABTITLE[$n+1], $Titulo, false, $_oTITLE));
echo ',"'.$_TABTITLE[$n+1].'"';
$_TabTITLE[] = $_TABTITLE[$n];
}
echo ');';
$xIcono = eIcon($icono, null, "WINDOWTITLEICON");
?>
var titulo = _DimTITLE[1];
if( S("#ICONTITLE").length>0 ){
var xIcono = `<?=$xIcono?>`;
titulo = "<table style='display:-webkit-inline-box;' a=5><tr>"
+"<td class='WINDOWTITLEICON'>"+xIcono
+"<td class='WINDOWTITLETEXT'>"+titulo
+"</table>";
}
S("#TABHeaderTitle").html(titulo);
top.eSWSetCaption(window, titulo);
<?PHP
if( count($_TITLEICON)>0 ){
echo 'S(".TABHeaderTitle").obj.parentNode.cells[1].innerHTML = "'.str_replace('"','&quot;', _IconosTitle($_TITLEICON, false)).'".replace(/&quot;/g,\'"\');';
}
if( $Opcion!='A' && $Opcion!='B' && $Opcion!='M' ){
foreach($_Objeto as $k=>$v){
if( trim($_Objeto[$k]['SLMENU'])=='' && $_Objeto[$k]['nSLMENU']>0 ){
eMessage('Falta en el objeto "'.$k.'" la etiqueta "{SlMenu}"', 'HES'); eEnd();
}
}
}
for($n=0; $n<count($_DBRANGE); $n++) echo "_DBRange['{$_DBRANGE[$n]}']=0;";
if( count($_SaveList)>0 ) for($n=0; $n<count($_SaveList); $n++) echo '_SaveList[_SaveList.length] = "'.str_replace(', ',',',str_replace(' ,',',',$_SaveList[$n]) ).'";';
if( count($_SaveOnLine)>0 ) for($n=0; $n<count($_SaveOnLine); $n++){
$txt = '';
list($txt2, $tmp) = explode('|',$_SaveOnLine[$n]);
$txt2 = trim($txt2).'|';
$tmp = explode(',',$tmp);
for($i=0; $i<count($tmp); $i++){
list( $tmp2 ) = explode('=',$tmp[$i]);
$tmp2 = trim($tmp2);
if( $txt!='' ) $txt .= ',';
$txt .= $tmp2;
}
$txt = $txt2.$txt;
echo '_SaveOnLine[_SaveOnLine.length] = "'.$txt.'";';
}
foreach($_OnLineIMG as $k=>$v){
echo '_OnLineIMG["'.$k.'"] = "'.str_replace('"','\"',$v).'";';
}
$_SetTTR = array();
for($i=0; $i<count($_DimChildrenData); $i++){
for($n=0; $n<5; $n++) $_DimChildrenData[$i][$n] = trim($_DimChildrenData[$i][$n]);
$dCampos = '';
$oCampos = '';
$_Objeto[$_DimChildrenData[$i][0]]['THSORT'] = false;
if( $_Objeto[$_DimChildrenData[$i][0]]['SLSORT']!="" ){
list($tmp1,$tmp2) = explode("|",$_Objeto[$_DimChildrenData[$i][0]]['SLSORT']);
$_Objeto[$_DimChildrenData[$i][0]]['SLSORT'] = trim($tmp1);
$_Objeto[$_DimChildrenData[$i][0]]['THSORT'] = (mb_strtoupper(trim($tmp2))=="MANUAL");
}
$ok = false;
$_DimChildrenData[$i][1] = str_replace(', ',',',str_replace(' ,',',',$_DimChildrenData[$i][1]) );
$tmp = explode(',',$_DimChildrenData[$i][1]);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode('=',$tmp[$n]);
if( $dCampos!='' ) $dCampos .= ',';
$dCampos .= trim($tmp2[0]);
if( $tmp2[1]=='' ) $tmp2[1] = $tmp2[0];
if( $oCampos!='' ) $oCampos .= ',';
$tmp2[1] = trim($tmp2[1]);
$oCampos .= $tmp2[1];
if( $tmp2[1][0]=='_' ){
if( !$ok ) $_SetTTR[$tmp2[1]] = true;
$ok = true;
$_SubModoAlta[$tmp2[1]] = true;
for($j=0; $j<count($_Form); $j++) if( $_Form[$j][1]==$tmp2[1] && $_Form[$j][3]=='F' ){
}
}
}
$ConPieLista = '';
foreach($_Objeto as $kk=>$vv){
if( $_DimChildrenData[$i][0]==$kk ){
$ConPieLista = eNsp($_Objeto[$kk]['SLCOLSOP']);
}
}
if( $_DimChildrenData[$i][1]=='' ){
list( ,,$tmp2,,,$tmp5 ) = explode('|', $_Objeto[$_DimChildrenData[$i][0]]['SLMENU']);
$_DimChildrenData[$i][1] = trim($tmp2);
if( trim($oCampos)=='' ){
$tmp4 = '';
$tmp3 = '';
$DimTmp = explode(',',$tmp2);
for($p=0; $p<count($DimTmp); $p++){
list($izq,$dch) = explode('=',$DimTmp[$p]);
if( $tmp4!='' ){
$tmp3 .= ',';
$tmp4 .= ',';
}
$tmp3 .= trim($izq);
$tmp4 .= trim($dch);
}
$oCampos = eNsp(trim($tmp4));
$dCampos = eNsp(trim($tmp3));
}
}
echo '_DimChildrenData[_DimChildrenData.length] = new Array("'.
$_DimChildrenData[$i][0].'","'.
eNsp($_DimChildrenData[$i][1]).'","'.
$_DimChildrenData[$i][2].'","'.
$dCampos.'","'.
$oCampos.'","'.
$_DimChildrenData[$i][2].'","'.
$_DimChildrenData[$i][3].'","'.
$_DimChildrenData[$i][4].'","'.
trim(str_replace('"','\"',$_DimChildrenData[$i][5])).'","'.
$ConPieLista.'");';
}
foreach( $_OnLineOP as $k=>$v ){
if( is_numeric($k) ){
list(,,$tmp2) = explode('|',$_Objeto['['.mb_substr($v,4).']']['SLMENU']);
$tmp = explode(',',$tmp2);
for( $n=0; $n<count($tmp); $n++ ){
list( $tmp1, $tmp2 ) = explode('=',$tmp[$n]);
$tmp2 = trim($tmp2);
if( $tmp2=='' ) $tmp2 = trim($tmp1);
if( $tmp2[0]!="'" || $tmp2[0]!='"' ){
$uCampo = '_op_'.mb_substr($_ObjetoID,1,-1);
}
}
unset($_OnLineOP[$k] );
if( $tmp2[0]=='*' ){
$_OnLineOP[mb_substr($tmp2,1)] = $v;
}else{
$_OnLineOP[$tmp2] = $v;
}
}
}
echo $NomSolapa;
echo $xHoja1;
if( eSubstrCount($Opcion,'R')==0 && $Opcion!='a' ) $xHojaV = 0;
echo "HojasV = {$xHojaV};";
echo "_Accion = '{$SubOp}';";
if( eSubstrCount($_AccionDIR, '&_PSOURCE')==0 ) $_AccionDIR .= "&_PSOURCE={$_PSOURCE}";
if( eSubstrCount($_AccionDIR, '&_FORMBUTTONS')==0 ) $_AccionDIR .= "&_FORMBUTTONS={$_FORMBUTTONS}";
if( $_FORMACTION!='' ){
if( mb_substr($_FORMACTION,-1)==':' ){
$_FORMACTION .= $OriFichero;
if( eSubstrCount($_FORMACTION, 'edes.php?')==0 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
}
if( $_REMOTE_!='' ) $_FORMACTION = str_replace('edes.php?', 'redes.php?', $_FORMACTION);
$_FORMACTION = str_replace("'", CHR92."'", $_FORMACTION);
if( mb_substr($_FORMACTION,-1)!=')' && mb_substr($_FORMACTION,-2)!=');' ){
list($tmp) = explode(':', $_FORMACTION);
if( mb_strlen($tmp)<5 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
echo "_Action = '{$_FORMACTION}{$_TargetUrl}";
if( isset($_GET['_PERSISTENTDB']) ) echo '&_PERSISTENTDB='.$_GET['_PERSISTENTDB'];
if( eSubstrCount($_FORMACTION, '&_FORMBUTTONS')==0 ) echo "&_FORMBUTTONS={$_FORMBUTTONS}";
if( eSubstrCount($_FORMACTION, '&_PSOURCE')==0 ) echo "&_PSOURCE={$_PSOURCE}";
if( $_STOP ) echo '&_STOP';
if( $Opcion=='a' && isset($_GET['_ISUBLIST']) ) echo "&_ISUBLIST=1";
echo "';";
}else{
echo "_Action = '{$_FORMACTION}";
echo "';";
}
}else{
$_Action = addslashes($_Action);
if( mb_substr($_Action,-1)!=')' ){
echo "_Action = '{$_Action}{$_TargetUrl}";
if( isset($_GET['_PERSISTENTDB']) ) echo '&_PERSISTENTDB='.$_GET['_PERSISTENTDB'];
if( $_GET["_SUBINSERT"]==1 ) echo '&_SUBINSERT=1';
if( eSubstrCount($_Action, '&_FORMBUTTONS')==0 ) echo "&_FORMBUTTONS={$_FORMBUTTONS}";
if( eSubstrCount($_Action, '&_PSOURCE')==0 ) echo "&_PSOURCE={$_PSOURCE}";
if( $_STOP ) echo '&_STOP';
if( $Opcion=='a' && isset($_GET['_ISUBLIST']) ) echo "&_ISUBLIST=1";
echo "';";
}else{
echo "_Action = '{$_Action}{$_TargetUrl}';";
if( isset($_GET['_PERSISTENTDB']) ) echo '&_PERSISTENTDB='.$_GET['_PERSISTENTDB'];
echo "';";
}
}
eContextPut($_Action);
if( eSubstrCount(',c,b,m,',",{$Opcion},")>0 ){
if( $ConSubListado && eSubstrCount($_Action,"edes.php?{$_gsObjeto}{$Opcion}R:")==0 ) echo 'OpExe.title=""; OpExe.oncontextmenu=""; eCLEAR.style.display="none";';
}
if( $_REQFILTER ) echo '_Filtrar = true;';
echo "\n";
?>
function Oculta_Respuesta(){
<?PHP
if( $_WINCLOSE ){
if( !empty($_DBINSERT) && $_OkDBINSERT ){
$tmpFile = GrabaTmp('g_dbinsert', $_DBINSERT, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_DBINSERT);
}
?>
if( top.eIsWindow(window) ){
try{ top.eSWClose(window); }catch(e){}
}else{
top.eLoading(true,window);
window.location.href = top.S.urlAdd('<?= $_AccionDIR; ?>');
}
<?PHP
}else{
?>
top.eLoading(true,window);
window.location.href = top.S.urlAdd('<?= $_AccionDIR; ?>');
<?PHP
}
?>
}
<?PHP
echo 'var _SubMenu = new Array();';
for( $nf=0; $nf<count($CreaSubForm); $nf++ ){
echo "_SubMenu[{$nf}] = '{$CreaSubForm[$nf]}';";
}
echo "var tHojas={$TotalHojas},";
echo "x={$_X}, y={$_Y}, Forma='{$_Forma}',";
echo 'sx=sy=2000;';
_AjustaTamposToJS($_CalcularAnchos, $_eAlign, $_Form, $_CARDSHOW, $_DEBUG);
for($n=0; $n<count($_Form); $n++) if( $_Form[$n][7]!='' ){
if( $_Form[$n][1]!='' && eSubstrCount(",{$oCampos},", ",{$_Form[$n][1]},")>0 ) echo "S.public(1); ePF('{$_Form[$n][1]}', '{$_Form[$n][7]}'); S.public();";
}
echo 'function sortNumberAsc(a,b){ return a-b; }';
echo 'var _SeCalculoForma = 0,';
echo "_ZoneHide = new Array({$_ZoneHide}), _ZoneHideHeight = new Array(0);";
echo "_DimRecalc.push(\"CalculoForma('{$_Forma}',{$_X}, {$_Y}, {$_SUBTAB}, '{$_SUBTABFORM}', '{$_TABFormType[0]}', '{$_WINCAPTION}', '".implode(",",$_CalColumnaUno).",0');\");";
$_Campo1 = '';
if( $Campo1[ $Campo_1 ]!='#' && !$_ConRespuesta ){
$_Campo1 = $Campo1[$Campo_1];
}
echo $xCampo1;
echo "var _INDICE = '{$_DBINDEX}';";
echo '_nSolapa = '.($Campo_1+1).';';
if( isset($_GESAUX) ) include(DIREDES.'gesaux.js');
if( isset($_WINCAPTION) ){
}
echo '</SCRIPT>';
include( $Dir_.'gen_condi.inc' );
eEnd();
function CreaHOJA($nHoja, $Opcion, $Fichero, $Mandar, $ConEsquinas, $TotalFRM, $FrmOculto, $NomHoja){
global $_Condi, $_Form, $_TITLE, $_oTITLE, $_TABTITLE, $_RELATIONFIELDS, $__Lng, $_ConED, $_PSOURCE, $_Sql, $_DBMEMO;
global $_MIRROR, $_EDITMIRROR, $_EDITMIRRORMEM, $SolapaON, $Hay_fPHP, $_Id, $_WHERESELECT, $_SELINFO, $_SELINFONOEVENT, $_ONCHANGE, $_EXEONCHANGE;
global $_DBADDFILTER, $argv, $_SHOWFIELDS, $_Modo, $_LOCALSELECT, $_ADDOPTION, $_DELOPTION, $_FILLOPTION, $_FORMWIDTHS, $_WIDTH;
global $_Fila, $_vF, $_NOEDITFILLED, $_NOEDITFILLEDSESSION, $_NOEDIT, $_NOEDITFILLEDFIELD, $_CHR, $_DEFAUX, $_DEFAULTVAL, $_Objeto, $_ObjetoSQL;
global $_DBINDEX, $_DBINDEX2, $_DBINDEX3, $_RADIO, $_SKIPTD, $_ADDCODE, $_TITLEICON, $_TIPFORM, $_Etiqueta, $_TITLE_DELFILTER, $_ModCampoIndice, $_SELECTMULTIPLE;
global $_FIELDSET, $_DimInclude, $_NombreInclude, $_BCP, $_EnLinea, $_EnColumna, $_TmpNColumnas, $_NewNColumnas, $_Fichero, $_UPLOADFILE, $_FILELOG;
global $_JSDIM, $__Enter, $_DEBUG, $_DimDebug, $_TDSTYLE, $_DBRANGE, $_DBRANGEADD, $_ConDelFilter, $_DEFAULT, $_SaveOnLine, $_OnLineIMG, $_FIELDSPAN, $_xPERSISTENTVAR;
global $DimOpcion, $_User, $_Node, $_Tree, $_ADDOPTIONVALUE, $_RELATIONJUMP, $_ModeSeek, $OpcionFields;
global $_Field, $_pField, $_CallLabel, $_SELINFOMODE, $_Variable, $_ADDOPTIONCOLLABEL, $_DimRecalc, $_PREVIEW;
$_ObjetoID = '';
$_FORMWIDTHS = array();
$FicheroD = eScript(trim(str_replace('*','',$Fichero)));
if( eSubstrCount($FicheroD,'.')==0 ) $FicheroD .= '.edf';
$Condi = array();
$Form = array();
$nc = 0;
$_RELATIONFIELDS = array();
$_RELATIONJUMP = array();
$_MIRROR = $_EDITMIRROR = '';
$_TCol = 1;
$_WHERESELECT = array();
$_SELINFO = array();
$_SELINFONOEVENT = array();
$_SHOWFIELDS = array();
$_LABEL = array();
$_TmpFieldSet = array('','','','');
$_TmpEnLinea = array('','','','');
$_TmpEnColumna = array('','','','');
$_Id = mb_substr( $FicheroD, mb_strrpos($FicheroD,'/')+1 );
$TipoEntrada = '#';
$SaltarLinea = false;
$ElPuntoEsRem = true;
$_CallLabel = "";
$_DimEDF = @OpenDF($FicheroD);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line, $nHoja) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( $_CallLabel<>"" && $Chr_1<>'[' ){
call_user_func("eCall_".$_CallLabel, true, $buffer);
continue;
}
$_CallLabel = "";
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'f_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
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
global $_PLUGIN;
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
list($buffer, $VerError) = explode('|',$buffer);
while( eSubstrCount($buffer,'{$')>0 ){
$p = mb_strpos($buffer, '{$');
$tmp = mb_substr($buffer,$p,mb_strpos($buffer, '}')-$p+1);
$index = mb_substr($tmp,2,-1);
if( $GLOBALS[$index]!='' ){
$buffer = str_replace($tmp,$GLOBALS[$index],$buffer);
}else{
$buffer = str_replace($tmp, SESS::${$index},$buffer);
}
}
list( $cModo, $DirFile ) = explode(')',eNsp($buffer));
$DirFile = mb_strtolower($DirFile);
if( eOkMode($Opcion, mb_substr($cModo,9)) ){
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
$sElPuntoEsRem = true;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'CC':
eExplodeOne($buffer, '|', $txt1, $txt2);
$_Variable[$tmp[0]] = _ExeEval($txt2, $buffer);
break;
case 'CREATEVAR':
global $_CREATEVAR;
$_CREATEVAR[$tmp[0]] = _ExeEval($tmp[1], $buffer, 1);
break;
case 'TITLE':
$_TABTITLE[$nHoja] = $tmp[0];
if( $nHoja==1 ){
global $_NOTITLE, $_WINCAPTION, $_PSOURCE;
$_TITLE = $_oTITLE = $tmp[0];
if( mb_strtoupper($_TITLE)=='NOTITLE' ){
$_TITLE = '';
if( isset($_PSOURCE) && $_PSOURCE!='WWORK' ) $_NOTITLE = true;
}else if( $_PSOURCE!='WWORK' && mb_strtoupper($tmp[3])=='NOTITLE' ){
$_WINCAPTION = '#';
}
}
break;
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$GLOBALS['_sDBTABLE'] = $tmp[0];
${$Comando} = $tmp[0];
break;
case 'NOEDIT':
if( $OkModo ){
$tmp1 = explode( ',', $tmp[1] );
for( $n=0; $n<count($tmp1); $n++ ) $_NOEDIT[ trim($tmp1[$n]) ] = 1;
}
break;
case 'NOEDITFILLED':
${$Comando} = $OkModo;
if( $OkModo && mb_strtoupper($tmp[1])=='SESSION' ){
$_NOEDITFILLEDSESSION = true;
$_NOEDITFILLED = false;
}
if( $tmp[2]!='' ){
if( $tmp[1]=='' ) $_NOEDITFILLED = false;
$tmp1 = explode( ',', eNsp($tmp[2]) );
for( $n=0; $n<count($tmp1); $n++ ) $_NOEDITFILLEDFIELD[ trim($tmp1[$n]) ] = 1;
}
break;
case 'FORMCHECK':
$TipoEntrada = $Comando;
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', $tmp[0]);
$_DBINDEX  = eNsp($_DBINDEX);
$_DBINDEX2 = eNsp($_DBINDEX2);
$_DBINDEX3 = eNsp($_DBINDEX3);
break;
case 'MIRROR':
if( $_MIRROR=='' ) $_MIRROR = ',';
$_MIRROR .= eNsp($tmp[0]).',';
break;
case 'EDITMIRROR':
if( $_EDITMIRROR=='' ) $_EDITMIRROR = ',';
$_EDITMIRROR .= str_replace( ' ', '', $tmp[0] ).',';
$_EDITMIRRORMEM[] = $_EDITMIRROR;
break;
case 'FORMWIDTHS':
break;
case 'SUBSELECTMEMORY':
global $_SUBSELECTMEMORY;
$tmp = explode(',',eNsp($tmp[0]));
for( $i=0; $i<count($tmp); $i++ ) $_SUBSELECTMEMORY[$tmp[$i]] = true;
break;
case 'RELATIONSUBLIST':
global $_RELATIONSUBLIST, $_RELATIONSUBLISTFUNC;
$tmp[0] = eNsp($tmp[0]);
$tmp2 = explode(',',$tmp[0]);
$_RELATIONSUBLIST[$tmp2[1]] = str_replace(" ","",$tmp2);
$_RELATIONSUBLISTFUNC[$tmp2[0]] = $tmp[1];
break;
case 'FIELDS':
if( count($Form)>0 ) break;
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( $tmp[0][0]=='$' ){
if( _ExeEval( $tmp[0], $buffer ) ){
$TipoEntrada = $Comando;
if( mb_ord($tmp[1][0])>48 && mb_ord($tmp[1][0])<58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}
break;
}
}
if( !empty($tmp[0]) ){
if( mb_ord($tmp[0][0])>48 && mb_ord($tmp[0][0])<58 ){
$_TCol = $tmp[0] * 1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[0]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( mb_strtoupper($tmp[0])=='ELSE' && count($Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( mb_ord($tmp[1][0])>48 && mb_ord($tmp[1][0])<58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[1]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( mb_strtoupper($tmp[1])=='ELSE' && count($Form)==0 ) $OkModo = true;
}
}
if( $OkModo || $OpcionFields==$Opcion ){
if( in_array($tmp[0], ['c','m','b','?']) ) $_ModeSeek = true;
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
case 'WIDTH':
$tmp[0] = str_replace(['l','f'], ['e','c'], mb_strtolower($tmp[0]));
$tmp[1] = eNsp($tmp[1]);
$tmp[2] = str_replace('px', '', $tmp[2]);
if( $tmp[2]=='=' || (string)($tmp[2]*1)<>$tmp[2] ){
if( $tmp[2]!='=' && $tmp[2]*1!==$tmp[2] ){
$tmp[3] = $tmp[2];
$tmp[2] = "=";
}
$GLOBALS["_WIDTHGROUP"][] = array($tmp[0], $tmp[1], $tmp[3], $tmp[2]);
}else{
$stmp = explode(',', $tmp[1]);
for($n=0; $n<count($stmp); $n++) $_WIDTH[$tmp[0]][$stmp[$n]] = $tmp[2];
}
break;
case 'SELINFO':
if( !$OkModo ) break;
if( eSubstrCount($tmp[2], ":")>0 ){
$tmp[4] = $tmp[3];
list($tmp[2], $tmp[3]) = explode(":", $tmp[2]);
}else if( $tmp[2]<>"" && eSubstrCount($tmp[2], "=")>0 ){
}else if( $tmp[2]=="" ){
}else{
$tmp[4] = $tmp[3];
$tmp[3] = $tmp[2];
$tmp[2] = "";
}
SESS::$_SELINO = [];
if( $tmp[2]<>"" ){
$_SELINFO[$tmp[1]] = $tmp[2];
}else{
$dim = array();
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = trim($_DimEDF[$i]);
switch( $buffer[0] ){
case '.': case '/':
continue;
case '':
case '¿': case '#':
case '[':
$nDimFCH = $i-1;
$i = count($_DimEDF);
break;
default:
$dim[] = $buffer.";";
}
$_SELINFO[$tmp[1]] = $tmp[1];
SESS::$_SELINO[$tmp[1]] = implode("\n", $dim);
}
}
if( $tmp[3]<>"" ) $_SELINFO[$tmp[1]] .= ":".$tmp[3];
if( $tmp[4]<>"" ){
$tmp[4] = " ".$tmp[4]." ";
if( preg_match("/( TAB | T )/iu", $tmp[4]) ) $_SELINFOMODE[$tmp[1]] = "B";
if( preg_match("/( LIST | L )/iu", $tmp[4]) ) $_SELINFOMODE[$tmp[1]] = "b";
if( preg_match("/( NOEVENT )/iu", $tmp[4]) ) $_SELINFONOEVENT[$tmp[1]]=',1';
}
$_SELINFO[$tmp[1]] = str_replace("''", "", $_SELINFO[$tmp[1]]);
break;
case 'ADDCODE':
case 'ADDOPTION':
case 'DELOPTION':
case 'ICON':
case 'ONCHANGE':
case 'RELATIONFIELDS':
case 'SHOWFIELDS':
case 'WHERESELECT':
call_user_func("eCall_".$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'SDF':
if( $tmp[1]=="" ) $tmp[1] = $tmp[0];
if( eSubstrCount($tmp[1],".")==0 ) $tmp[1].=".sdf";
if( $tmp[3]=="" ) $tmp[3] = $tmp[0];
$_ONCHANGE[] = array($tmp[0], '_SelInfo(this.value,"'.$tmp[1].'&'.$tmp[3].'="+this.value);', "", 1);
$tmp[4] = ($tmp[4]<>"") ? str_replace(array('"',"'"," "), array('\"','&#39;','&#32;'), $tmp[4]) : "#";
if( $tmp[2]<>"" ) $_ADDCODE[$tmp[0]]["A"] = eIcon($tmp[2], 'onclick=_IconSDF("'.$tmp[1].'","'.$tmp[0].'","'.$tmp[4].'") '.$tmp[5]);
break;
case 'ADDOPTIONVALUE':
$_ADDOPTIONVALUE[$tmp[0]] = $tmp[1];
if( $tmp[2]!='' ) $GLOBALS['_ADDOPTIONIMG'][$tmp[0]] = $tmp[2];
if( $tmp[3]!='' ) $_ADDOPTIONCOLLABEL[$tmp[0]] = $tmp[3];
break;
case 'SELECTCOLLABEL':
$tmp2 = explode(",", eNsp($tmp[0]));
$_ADDOPTIONVALUE[$tmp2[1]] = $tmp[1];
$_ADDOPTIONCOLLABEL[$tmp2[1]] = '$'.$tmp2[0].'=="'.$tmp[2].'"';
break;
case 'UPLOADFILE':
$tmp[1] = _InVar($tmp[1]);
if( gettype($_Fichero)=="NULL" ) $_Fichero = array();
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' ){
$_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
}
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' && $_Objeto['['.$uNomFile.']']['SUBDIR']<>'' ){
$_UPLOADFILE[$uNomFile]['oDIR'] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
$tmp[1] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
}
if( $tmp[1]<>"" ) $tmp[1] = eScript($tmp[1]);
if( $_UPLOADFILE[$uNomFile]['DIR']=='' ) $_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = str_replace('.','',str_replace(',','',$tmp[3]));
if( $_UPLOADFILE[$uNomFile]['BYTS'] < 0 ) $_UPLOADFILE[$uNomFile]['BYTS'] = $_UPLOADFILE[$uNomFile]['BYTS']*-1;
$_UPLOADFILE[$uNomFile]['TITLE'] = (($tmp[4]=='') ? '' : $tmp[4] );
if( $tmp[5]=='' || $tmp[5]=='*.*' ) $tmp[5] = '*';
if( $tmp[5]!='' ) $_UPLOADFILE[$uNomFile]['EXT'] = eNsp($tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$uNomFile]['TAMAÑOS'] = $tmp[7];
$_UPLOADFILE[$uNomFile]['PREFIJOS'] = $tmp[8];
if( $tmp[9]!='' ){
if( mb_substr($tmp[9],-1)=='/' ) $tmp[9] = mb_substr($tmp[9],0,-1);
$_UPLOADFILE[$uNomFile]['COPY'] = eScript($tmp[9]);
}
$_UPLOADFILE[$GLOBALS['_sDBTABLE'].".".$uNomFile] = $_UPLOADFILE[$uNomFile];
break;
case 'FILELOG':
$buffer = _InVar(eNsp($_DimEDF[$nDimFCH]));
$tmp = explode(",",$buffer);
list(,$tmp[0]) = explode("]",$tmp[0]);
if( count($tmp)<5 ) $tmp[4] = -1;
$tmp[4] *= 1;
$_FILELOG[$tmp[0]] = 1;
$_FILELOG[$tmp[0].".".$tmp[1]] = $tmp;
break;
case 'HELPHTML':
global $_HELPHTML, $_PntHelpHTM;
$_HELPHTML[$tmp[0]] = "";
$_PntHelpHTM = &$_HELPHTML[$tmp[0]];
$TipoEntrada = "_PntHelpHTM";
break;
case 'HELPMARKDOWN':
global $_HELPMARK, $_PntHelpMARK;
$_HELPMARK[$tmp[0]] = "";
$_PntHelpMARK = &$_HELPMARK[$tmp[0]];
$TipoEntrada = "_PntHelpMARK";
break;
case 'DBADDFILTER':
$_DBADDFILTER = $tmp[0];
break;
case 'LOCALSELECT':
$tmp = explode( ',', $tmp[0] );
for( $n=0; $n<count($tmp); $n++ ){
$Elemento = explode( '=', $tmp[$n] );
$_LOCALSELECT[ trim($Elemento[0]) ] = trim($Elemento[1]);
}
break;
case 'DEFAULTVAL':
if( $OkModo ) $_DEFAULTVAL[$tmp[1]] = $tmp[2];
break;
case 'CHECKLIST':
global $_CHECKLIST;
$_CHECKLIST[$tmp[0]] = array( $tmp[1], $tmp[2], mb_strtoupper($tmp[3]), $tmp[4], $tmp[5] );
break;
case 'RADIOLIST':
global $_RADIOLIST;
$_RADIOLIST[$tmp[0]] = array( $tmp[1], $tmp[2], mb_strtoupper($tmp[3]), $tmp[4] );
break;
case 'CHR':
$_CHR[] = $tmp;
$_CHR[$tmp[0]] = $tmp;
break;
case 'DEFAUX':
$_DEFAUX[$tmp[0]] = $tmp[1];
break;
case 'NOTE':
break 3;
case 'SUBLIST':
if( ( $OkModo || eSubstrCount('ABM',$Opcion) > 0 ) && eSubstrCount('bcm',$Opcion) == 0 ){
$TipoEntrada = $Comando;
$_ObjetoID = '['.$tmp[1].']';
$_Objeto[$_ObjetoID]['TIPO'] = 'SubLista';
$_Objeto[$_ObjetoID]['SLTITLE'] = $tmp[2];
$_Objeto[$_ObjetoID]['SLWTITLE'] = str_replace("'",'"',$tmp[3]);
$_Objeto[$_ObjetoID]['NOBR'] = (mb_strtoupper($tmp[4])=="NOBR");
$_Objeto[$_ObjetoID]['TTR'] = -1;
}else{
$TipoEntrada = '#';
}
break;
case 'RADIO':
$tmp[1] = str_replace('L','E',mb_strtoupper($tmp[1]));
$_RADIO[$tmp[0]]['C'] = $tmp[1];
$_RADIO[$tmp[0]]['D'] = $tmp[2];
if( count($tmp) >= 4 ) $_RADIO[$tmp[0]]['T'] = $tmp[3];
if( count($tmp) >= 5 ) $_RADIO[$tmp[0]]['A'] = $tmp[4];
if( count($tmp) >= 6 ) $_RADIO[$tmp[0]]['DEL'] = (mb_strtoupper($tmp[5])=='TRUE');
break;
case 'FIELDSET':
if( $OkModo ){
$tmp = explode( ',', $tmp[1] );
for( $i=0; $i<4; $i++ ) $tmp[$i] = trim($tmp[$i]);
$_FIELDSET[$tmp[0]]['I'] = $_FIELDSET[$tmp[1]]['F'] = true;
$_FIELDSET[$tmp[0]]['T'] = $tmp[2];
$_FIELDSET[$tmp[0]]['S'] = $tmp[3];
}
break;
case 'SKIPTD':
if( $OkModo ){
$tmp = explode( ',', $tmp[1] );
for( $i=0; $i<count($tmp); $i++ ) $_SKIPTD[trim($tmp[$i])] = true;
}
break;
case 'BCP':
if( $OkModo ){
$tmp2 = explode( ',', $tmp[2] );
for( $n=0; $n<count($tmp2); $n++ ) $_BCP[ trim($tmp2[$n]) ] = eNsp($tmp[1]);
}
break;
case 'ADDTOOLS':
if( !$OkModo ) break;
if( mb_strtoupper($tmp[2])=='ECOLORSELECT' || mb_strtoupper($tmp[2])=='ETONESELECT' ){
global $_JSEND, $_JSINCLUDE;
$tmp2 = explode(",",eNsp($tmp[1]));
for($n=0; $n<count($tmp2); $n++){
$tmp[1] = $tmp2[$n];
if( $Opcion=='a' || $Opcion=='mR' ){
if( $tmp[3]!='' ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$tmp[2] = mb_strtoupper($tmp[2])=='ECOLORSELECT' ? "eColorSelect":"eToneSelect";
if( mb_strlen($tmp[4])<2 ){
if( $tmp[4]=="" ) $tmp1 = 61442;
else if( mb_strtoupper($tmp[4])=="C" ) $tmp1 = 184;
else if( mb_strtoupper($tmp[4])=="B" ) $tmp1 = 185;
$_ADDCODE[$tmp[1]]['A'] .= '<I class="ICONINPUT" onclick="eSelectRGB(null,1,'.$tmp[2].')'.$tmp[3].'" title="'.$__Lng[189].'">&#'.$tmp1.';</I>';
}else{
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/t_color.png').'" onclick="eSelectRGB(null,1,'.$tmp[2].')'.$tmp[3].'" title="'.$__Lng[189].'">';
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
array_push($_ONCHANGE, array($tmp[1], '_SetColor("'.$tmp[1].'");', '', ''));
$_JSINCLUDE['$itm/'.mb_strtolower($tmp[2]).'.js'] = 1;
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
$_JSEND .= "if( eGF('{$tmp[1]}')!='' ) eGO('{$tmp[1]}').style.backgroundColor = eGF('{$tmp[1]}');";
}
}elseif( mb_strtoupper($tmp[2])=='ELABELSELECT' ){
if( mb_strtolower($tmp[1])=='button' ) $tmp[1] = 'button';
if( $tmp[3]!='' ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/label_sel.png').'" onclick="eLabelSelect()'.$tmp[3].'" title="'.$__Lng[188].'">';
$_PDFLABELTOOLS = true;
}elseif( mb_strtoupper($tmp[2])=='INSERTAUX' ){
if( $tmp[3]=='' ) $tmp[3] = $__Lng[187];
$_ADDCODE[$tmp[1]]['A'] .= '<img id="'.$tmp[1].'_" src="g/t_op_insert_sel.png" onclick="_InsertSelect()" title="'.$tmp[3].'">';
}elseif( mb_strtoupper($tmp[2])=='EDEFAULTS' && eSubstrCount(',a,b,c,m,',",{$_Mode},")>0 ){
if( $_DEFAULTALL ) break;
if( $tmp[3]=='' ) $tmp[3] = $__Lng[186];
if( $tmp[5]=="" ) $tmp[5] = "false";
if( $tmp[1]<>"" ) $GLOBALS['_ADDTOOLSCP'] = ",'".eNsp(trim($tmp[1]))."'";
$_TITLEICON[] = '<i id="_eDefaults_" style="font-size:70%" class="ICONTITLE OFF" onclick="eDefaults('.$tmp[5].$GLOBALS['_ADDTOOLSCP'].')" title="'.$tmp[3].'">h</i>';
$GLOBALS['_DEFAULTALL'] = true;
$GLOBALS['_DEFAULTBYMODE'] = (mb_strtoupper($tmp[5])=='TRUE' || $tmp[5]==1);
}elseif( mb_strtoupper($tmp[2])=='3CX' ){
$para = ((mb_strtoupper($tmp[3])=="EMPTY") ? "E":"F");
if( !isset($GLOBALS["_3CX"]) ) $GLOBALS["_3CX"] = array();
$tmp = explode(',', eNsp($tmp[1]));
for($i=0; $i<count($tmp); $i++){
$GLOBALS["_3CX"][$tmp[$i]."F"] = true;
if( $para=="E" ) $GLOBALS["_3CX"][$tmp[$i]."E"] = true;
}
}
break;
case 'ADDICON':
if( $OkModo ) $GLOBALS['_ADDICON'] .= $tmp[1];
break;
case 'TDSTYLE':
if( $OkModo ){
$tmp2 = explode( ',', eNsp($tmp[1]) );
for( $n=0; $n<count($tmp2); $n++ ) $_TDSTYLE[$tmp2[$n]] = $tmp[2];
}
break;
case 'FIELDBROWSER':
global $_FIELDBROWSER;
eExplodeOne($buffer, "]", $iz, $dch);
$dch = str_replace('||', '{#~#}', $dch);
$tmp = explode("|", $dch);
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
$tmp[2] = str_replace('{#~#}', '||', $tmp[2]);
$stmp = array($tmp[0], $tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5]);
$stmp[2] = str_replace("'", '&#39;', _InVar($stmp[2]));
$_FIELDBROWSER[$tmp[0]] = $stmp;
file_put_contents("../_tmp/php/{$_ENV['user']}_{$stmp[6]}.sql", $stmp[2]);
break;
case 'LABEL':
if( eSubstrCount($tmp[1], "[")>0 && eSubstrCount($tmp[1], "]")>0 ){
while( eSubstrCount($tmp[1], "[")>0 && eSubstrCount($tmp[1], "]")>0 ){
$txt = "";
$desde = mb_strpos($tmp[1],"[");
$hasta = mb_strpos($tmp[1],"]");
$Macro = trim(mb_substr($tmp[1], $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
$txt = eIcon(trim($icono), _InVar($dentro));
$tmp[1] = mb_substr($tmp[1],0,$desde).$txt.mb_substr($tmp[1],$hasta+1);
}
}
$_LABEL[$tmp[0]] = $tmp[1];
break;
case 'TIPFORM':
if( !$OkModo || in_array($tmp[0], ['A','B','M']) || isset($_GET['_IMPORT']) ) break;
$tmp[1] = mb_strtoupper($tmp[1]);
$tmp2 = explode(",", eNsp($tmp[2]));
for($n=0; $n<count($tmp2); $n++){
$campo = $tmp2[$n];
if( $tmp[3]!='' ){
$_TIPFORM[$campo]['S'] = 'L';
$buffer = $tmp[3];
}else{
$_TIPFORM[$campo]['S'] = 'W';
$buffer = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
if( mb_substr(ltrim($_DimEDF[$i]),0,1)=='.' || mb_substr(ltrim($_DimEDF[$i]),0,2)=='//' ) continue;
if( mb_substr(ltrim($_DimEDF[$i]),0,1)=='[' ){
$i--;
break;
}else{
$buffer .= $_DimEDF[$i];
}
}
$nDimFCH = $i;
}
$buffer = _InFunction(_InVar($buffer));
if( $tmp[1]=='*' || $tmp[1]=='' ) $_TIPFORM[$campo]['L'] = $_TIPFORM[$campo]['F'] = $buffer;
else $_TIPFORM[$campo][$tmp[1]] = $buffer;
if( $tmp[1]=='E' ) $_TIPFORM[$campo]['M'] = _ModeHelp($tmp[0]);
if( $tmp[4]!='' ) $_TIPFORM[$campo]['W'] = $tmp[4];
if( $tmp[5]!='' ) $_TIPFORM[$campo]['T'] = $tmp[5]*1000;
}
break;
case 'JSDIM':
if( $OkModo ) $_JSDIM[] = array( $tmp[1], $tmp[2], $tmp[3] );
break;
case 'H':
case 'J':
case 'P':
$_NombreInclude = $tmp[0];
$TipoEntrada = 'Inc'.$Etiqueta;
break;
case 'ERRORLABEL':
for( $i=0; $i<count($tmp); $i++ ){
$sTmp = explode( '=', $tmp[$i] );
$_Etiqueta[trim($sTmp[1])] = trim($sTmp[0]);
}
break;
case 'DBRANGE':
if( $Opcion=="a" ){
global $_DBRANGEINSERT;
$_DBRANGEINSERT[] = $tmp;
}else if( eSubstrCount(",c,m,b,", ",{$Opcion},")>0 ){
$_DBRANGE[] = $tmp[2];
$_DBRANGE[] = $tmp[3];
$_DBRANGEADD[$tmp[1]] = 1;
$GLOBALS['_DBRANGEDUO'][$tmp[2]] = $tmp[3];
$GLOBALS['_DBRANGEDUO'][$tmp[3]] = $tmp[2];
$_ADDCODE[$tmp[2]]['I'] = ' noConditions'.(($tmp[5]=="=" || $tmp[5]=="true")?' copyValue':'');
$_ADDCODE[$tmp[3]]['I'] = ' noConditions';
$_ADDCODE[$tmp[6]]['I'] .= " eCalculateAge='{$tmp[1]},{$tmp[2]},{$tmp[3]},{$tmp[6]}'";
}else if( eSubstrCount(",cR,mR,bR,", ",{$Opcion},")>0 ){
global $DimDBRange;
$DimDBRange[] = array($tmp[1], $_POST[$tmp[2]], $_POST[$tmp[3]], $tmp[4], $tmp[2], $tmp[3]);
$_DBRANGEADD[$tmp[1]] = 1;
}
break;
case 'FIELDSPAN':
if( $tmp[1]!='' ){
$tmp1 = explode(',',eNsp($tmp[1]));
for( $n=0; $n<count($tmp1); $n++ ) $_FIELDSPAN['C'][$tmp1[$n]] = ' colspan='.$tmp[0];
}
if( $tmp[2]!='' ){
$tmp1 = explode(',',eNsp($tmp[3]));
for( $n=0; $n<count($tmp1); $n++ ) $_FIELDSPAN['R'][$tmp1[$n]] = ' rowspan='.$tmp[2];
}
if( $tmp[4]!='' ){
$tmp1 = explode(',',eNsp($tmp[4]));
for( $n=0; $n<count($tmp1); $n++ ) $_FIELDSPAN['S'][$tmp1[$n]] = true;
}
break;
case 'SELECTMULTIPLE':
if( $OkModo ){
global $_SELECTMULTIPLE, $_SELECTMULTIPLEBOX, $_SELECTMULTIPLESORT, $_SELECTMULTIPLEMAX;
if( preg_match('/BOX$/u', $tmp[2]) ){
$_SELECTMULTIPLEBOX[$tmp[1]] = 1;
$tmp[2] = trim(preg_replace('/BOX/i', '$1', $tmp[2]));
}
if( preg_match('/,/u', $tmp[2]) ){
$_SELECTMULTIPLEMAX[$tmp[1]] = trim(explode(",",$tmp[2])[1]);
$tmp[2] = trim(explode(",",$tmp[2])[0]);
}
$_SELECTMULTIPLE[$tmp[1]] = (($tmp[2]<>"")? $tmp[2] : 20);
if( $tmp[3]!='' ) $_ADDOPTION[$tmp[1]] = $tmp[3];
if( mb_strtoupper($tmp[4])=='TRUE' || $tmp[4]=='1' ) $_SELECTMULTIPLESORT[$tmp[1]] = true;
}
break;
case 'LANGUAGE':
global $_LANGUAGE, $_LNGCOL, $_LNGCOLDEFAULT, $_LngPublic, $_LanguageTron;
$tmp2 = explode( ',', trim(eNsp($tmp[0])) );
for( $n=0; $n<count($tmp2); $n++ ){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && $GLOBALS['_Development'] ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
break;
case 'SELECTTREE':
if( !$OkModo ) return;
global $_SELECTTREE;
$Ind = $tmp[1];
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = trim($_DimEDF[$i]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ) continue;
if( $buffer[0]=='[' || $buffer[0]=='#' ){
$nDimFCH = --$i;
break;
}
list($pk,$v) = explode(':',eNsp($buffer));
$_SELECTTREE[$Ind][trim($pk)] = trim($v);
}
if( $_SELECTTREE[$Ind]['load_level']=='' ) $_SELECTTREE[$Ind]['load_level'] = 1;
if( $_SELECTTREE[$Ind]['load_view']=='' ) $_SELECTTREE[$Ind]['load_view'] = 1;
$_SELECTTREE[$Ind]['multiple'] = (mb_strtoupper($_SELECTTREE[$Ind]['multiple'])=='TRUE' || $_SELECTTREE[$Ind]['multiple']=="1");
$_SELECTTREE[$Ind]['folder'] = (mb_strtoupper($_SELECTTREE[$Ind]['folder'])=='TRUE' || $_SELECTTREE[$Ind]['folder']=="1");
$_SELECTTREE[$Ind]['static'] = (mb_strtoupper($_SELECTTREE[$Ind]['static'])=='TRUE' || $_SELECTTREE[$Ind]['static']=="1");
break;
case 'ENTER':
$GLOBALS['_ENTER'] = $tmp;
break;
case 'TITLEICON':
if( $OkModo ){
$tmp[1] = _InVar($tmp[1], $no, true);
global $_PSOURCE, $OriFichero;
if( $tmp[2]!='' && $tmp[2]!='mark' && eSubstrCount($tmp[2],$_PSOURCE)==0 && mb_strtoupper($tmp[2])!='ELSE' ) break;
if( mb_strlen($tmp[1])<=4 ){
$tmp[1] = mb_strtoupper($tmp[1]);
if( $tmp[1]=='*' ) $tmp[1] = 'HPVC';
$txt = "";
if( $tmp[3]=="" ){
$hMode = _ModeHelp($tmp[0]);
$txt = " iMark='{$tmp[2]}' iHelp='TITLEICON' iMode='{$hMode}' iType='{$tmp[1]}'";
if( $tmp[2]!="" ) $tmp[2] = ".".$tmp[2];
$tmp[3] = str_replace("/","_",$Fichero).".".$hMode.$tmp[2];
if( mb_strlen($tmp[1])==1 ){
if( $tmp[1]=="H" ){
$click = "top.gsHelp(\"{$tmp[3]}\", event)";
}else{
$click = "_HelpMenu(\"{$tmp[1]}\", null, this, null, null, \"{$tmp[3]}\")";
}
}else{
$click = "gsHelp(\"{$tmp[3]}\", \"{$tmp[1]}\", event)";
}
unset($hMode);
$_TITLEICON[] = "<i class='ICONHEADER'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick='{$click}' title='Ayuda' style='cursor:var(--cPointer)'>@</i>";
break;
}
$img = "<i class='ICONHEADER' iHelp='TITLEICON' title='Ayuda' style='cursor:var(--cPointer)'{$txt} oncontextmenu='_SetDownload()' onclick=\"";
$tmp[3] = str_replace(array("'", '"'), array("\\'", '&#34;'), $tmp[3]);
if( mb_strlen($tmp[1])==1 ){
if( $tmp[4]=='' ){
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, '".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."'";
}else{
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, ['".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."']";
}
$img .= ')"';
$img .= ' _TypeHelp="_HelpMenu"';
}else{
$img .= "top.eMenu(window, this, {'-':'Ayuda'";
if( eSubstrCount($tmp[1],'H')>0 ) $img .= ",'H':'[g/help_htm.png]Ver ayuda'";
if( eSubstrCount($tmp[1],'P')>0 ) $img .= ",'P':'[g/help_pdf.png]Ayuda en formato PDF'";
if( eSubstrCount($tmp[1],'V')>0 ) $img .= ",'V':'[g/help_avi.png]Video tutorial'";
if( eSubstrCount($tmp[1],'C')>0 ) $img .= ",'C':'[g/help_chm.png]Ayuda en formato CHM'";
$img .= "}, _HelpMenu";
$img .= ",0,0,['".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."']";
$img .= ', null, _SetDownload)"';
$img .= ' _TypeHelp="eMenu"';
}
$tmp[1] = $img.">@</i>";
}
$_TITLEICON[] = $tmp[1];
}
break;
case 'GESAUX':
global $_Mode;
if( $OkModo && eSubstrCount(',a,mR,',",{$_Mode},")==1 ) $GLOBALS['_GESAUX'][$tmp[1]] = array( $tmp[2], $tmp[3] );
break;
case 'NOSELECTFILL':
ePrintR("the [NoSelectFill] tag is deprecated, use [SelectFill]");
break;
case 'SELECTFILL':
$tmp2 = explode(',', eNsp($tmp[0]));
for($n=0; $n<count($tmp2); $n++){
$_SELECTFILL[trim($tmp2[$n])] = true;
if( $_Mode==$tmp2[$n] ){
$_SELECTFILL["*"] = true;
}
}
break;
case 'FORMBUTTONS':
$GLOBALS['_FORMBUTTONS'] = $tmp[0];
if( $tmp[1]!='' ) $GLOBALS['_FORMBUTTONSDELETE'] = $tmp[1];
break;
case 'LINK':
$GLOBALS['_LINK'][] = $tmp[0];
break;
case 'NOTOOLS':
$GLOBALS["_NOTOOLS"] = eNsp($tmp[0]);
break;
case 'SETUP':
if( !$OkModo ) break;
$tmp = explode(",", $tmp[1]);
for($i=0; $i<count($tmp); $i++){
list($key, $value) = explode("=", $tmp[$i]."=");
$key = trim($key);
$value = trim($value);
if( empty($value) ){
$value = true;
}else if( is_numeric($value) ){
if( is_float($value) ) $value = (float)$value;
if( is_int($value) ) $value = (int)$value;
}else if( preg_match('/^(true|false)$/iu', $value) ){
$value = preg_match('/^true$/iu', $value);
}
$_ENV[$key] = $value;
}
break;
case "PREVIEW":
if( !$OkModo ) break;
$_PREVIEW[$tmp[1]] = array_splice($tmp, 2);
break;
}
break;
case  0:
case 10:
$ElPuntoEsRem = $sElPuntoEsRem;
break;
case 123:
switch( $TipoEntrada ){
case '_SUBLIST':
$buffer = trim($buffer);
$SubEtiqueta = trim(mb_substr($buffer, 1, mb_strpos($buffer,'}')-1));
$buffer = trim(str_replace('{'.$SubEtiqueta.'}', '', $buffer));
$oBuffer = $buffer;
$tmp = mb_strtoupper($SubEtiqueta);
if( 	  $tmp=='SLSUBMENU' ){
$sTmp = explode('|',$buffer);
if( !eOkMode( $Opcion, $sTmp[0] ) ) continue;
$sObjetoID = mb_substr($_ObjetoID,1,-1);
$DimNomOp = array( 'i'=>'Insertar', 'u'=>'Modificar', 'd'=>'Borrar', 'v'=>'Consultar', 'F'=>'Ver documento', 'E'=>'Editar documento', 'FE'=>"Ver documento\\nEditar documento" );
$DimImgOp = array( 'i'=>'insert', 'u'=>'update', 'd'=>'delete', 'v'=>'view', 'F'=>'doc', 'E'=>'doc', 'FE'=>'doc' );
for( $i=0; $i<count($sTmp); $i++ ) $sTmp[$i] = trim($sTmp[$i]);
$buffer = '{slMenu}'.$sTmp[0].'|';
$sTmp[1] = eNsp($sTmp[1]);
$Tmp2 = explode(',',$sTmp[1]);
for( $i=0; $i<count($Tmp2); $i++ ){
if( $i>0 ) $buffer .= ',';
$buffer .= $DimNomOp[$Tmp2[$i]].':'.$Tmp2[$i];
}
if( $sTmp[5]=='' ) $sTmp[5] = 'FormOnLine';
$buffer .= "|#||{$sTmp[5]}|";
if( $sTmp[2]!='' ){
if( eSubstrCount($sTmp[1],'F')>0 && eSubstrCount($sTmp[1],'E')>0 ){
$sTmp[1] = str_replace('E,','',str_replace(',E','',$sTmp[1]));
$sTmp[1] = str_replace('F','FE',$sTmp[1]);
$Tmp2 = explode(',',$sTmp[1]);
}
$sTmp[2] = mb_strtoupper($sTmp[2][0]);
$_Objeto[$_ObjetoID]['BeforeAfter'] = $sTmp[2];
$BeforeAfter = $sTmp[2];
$ImgCol = ''; $ConOpDeAlta = false;
for( $i=0; $i<count($Tmp2); $i++ ){
if( $DimImgOp[$Tmp2[$i]]=='' ) continue;
if( $Tmp2[$i]=='FE' ){
$ImgCol .= "<IMG SRC='g/l_op_{$DimImgOp[$Tmp2[$i]]}.gif' title='{$DimNomOp[$Tmp2[$i]]}' onclick=eSLAction('{$sObjetoID}','F') oncontextmenu=eSLAction('{$sObjetoID}','E') style='cursor:url(g/right.cur)'>";
}else if( $Tmp2[$i]!='i' ){
$ImgCol .= "<IMG SRC='g/l_op_{$DimImgOp[$Tmp2[$i]]}.gif' title='{$DimNomOp[$Tmp2[$i]]}' onclick=eSLAction('{$sObjetoID}','{$Tmp2[$i]}')>";
}else if( $Tmp2[$i]=='i' ){
$ConOpDeAlta = true;
}
}
if( $sTmp[3]!='' ) $ImgCol .= $sTmp[3];
$buffer .= $ImgCol;
$_PHPINI .= 'function _ImgSubList'.$sObjetoID.'(){ echo "'.$ImgCol.'";}';
}
if( $sTmp[6]!='' ) $buffer .= '|'. $sTmp[6];
if( !$ConOpDeAlta ){
$i = mb_strpos($_Objeto[$_ObjetoID]['SLTH'],'l_op_insert.gif');
$f = mb_strpos($_Objeto[$_ObjetoID]['SLTH'],'>',$i)+1;
$i = mb_strrpos(mb_substr($_Objeto[$_ObjetoID]['SLTH'],0,$i),'<');
$_Objeto[$_ObjetoID]['SLTH'] = mb_substr($_Objeto[$_ObjetoID]['SLTH'],0,$i).mb_substr($_Objeto[$_ObjetoID]['SLTH'],$f);
}
$SubEtiqueta = trim(mb_substr( $buffer, 1, mb_strpos($buffer,'}')-1 ));
$buffer = trim(str_replace( '{'.$SubEtiqueta.'}', '', $buffer ));
$tmp = mb_strtoupper($SubEtiqueta);
break;
}else if( $tmp=='SLJSCHECK' ){
if( !eOkMode($Opcion, $buffer) ) break;
$LeeDFEsRem = false;
$SubEti = $tmp;
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = ___Lng(trim($_DimEDF[$i]));
if( $buffer=="?" ) continue;
list($buffer) = explode(REM, $buffer);
if( mb_substr($buffer,0,2)=='/'.'*' && eSubstrCount( $buffer, '*'.'/' )==0 ){
$LeeDFEsRem = true;
}else if( $LeeDFEsRem && eSubstrCount( $buffer, '*'.'/' )>0 ){
$LeeDFEsRem = false;
$buffer = trim(mb_substr($buffer,mb_strpos($buffer, '*'.'/')+2 ));
if( $buffer=='' ) continue;
}
if( $LeeDFEsRem ) continue;
if( $buffer[0]=="#" || _IsLabel($buffer) ) break;
if( $buffer=='' || eSubstrCount('./',$buffer[0])>0 ) continue;
$Inicio = '<'.'?';
$Final = '?'.'>';
if( eSubstrCount($buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
for($n=0; $n<2; $n++){
$Inicio = ($n==0)? '<'.'?=' : '<'.'?';
while( eSubstrCount( $buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
$desde = mb_strpos($buffer,$Inicio);
$hasta = mb_strpos($buffer,$Final);
$Macro = trim(mb_substr($buffer, $desde+mb_strlen($Inicio), $hasta-$desde-mb_strlen($Inicio)));
$oEti = _ExeEval($Macro, $buffer);
if( mb_substr($Macro,0,11)=='ePermission' || mb_substr($Macro,0,12)=='!ePermission' ) $oEti = (($oEti)?'true':'false');
$buffer = mb_substr($buffer, 0, $desde). $oEti .mb_substr($buffer, $hasta+2);
}
}
$_Objeto[$_ObjetoID][$SubEti] .= $buffer.$__Enter;
}else if( mb_strtoupper(mb_substr($buffer,0,8))=='INCLUDE(' ){
$tmp = explode('(', $buffer);
list($tmp) = explode(')', $tmp[1]);
$tmp = str_replace("'", '', trim($tmp));
$tmp = str_replace('"', '', $tmp );
$_Objeto[$_ObjetoID][$SubEti] .= file_get_contents(trim($tmp));
}else{
$_Objeto[$_ObjetoID][$SubEti] .= $buffer.$__Enter;
}
}
break;
}else if( $tmp=='SLGROUPLABELS' || $tmp=='SLGL' ){
$DimLabel = explode('|',mb_strtoupper($buffer));
for( $i=0; $i<count($DimLabel); $i++ ){
$DimLabel[$i] = trim($DimLabel[$i]);
if( mb_substr($DimLabel[$i],0,2)!='SL' ) $DimLabel[$i] = 'SL'.$DimLabel[$i];
if( $DimLabel[$i]=='SLFIELDS' ) $DimLabel[$i] = 'SLMENU';
if( $DimLabel[$i]=='SLSQL' ) $iSql = $i;
if( $DimLabel[$i]=='SLALIGN' ) $iAlign = $i;
}
$BeforeAfter = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
$buffer = ___Lng(trim($_DimEDF[$i]));
if( $buffer[0]=='[' ) break;
if( mb_strtoupper(mb_substr($buffer,0,11))=='{SLSUBMENU}' ){
list(,$sTmp) = explode('}',$buffer);
$sTmp = explode('|',$sTmp);
if( eOkMode( $Opcion, $sTmp[0] ) ){
$BeforeAfter = mb_strtoupper(trim($sTmp[2]));
$BeforeAfter = $BeforeAfter[0];
$THAddIcon = trim($sTmp[4]);
break;
}
}
}
$LineaGroup = $nDimFCH;
$buffer = ___Lng(trim($_DimEDF[$LineaGroup]));
$tmp = explode('|',$buffer);
$ConComa = false;
if( $BeforeAfter=='B' ){
for( $p=0; $p<count($tmp); $p++ ){
if(		  $DimLabel[$p]=='SLALIGN' ){
$tmp[$p] = 'C';
}else if( $DimLabel[$p]=='SLSQL' ){
$tmp[$p] = "''";
}else if( $DimLabel[$p]=='SLMENU' ){
$tmp[$p] = "''=IMG";
}else if( $DimLabel[$p]=='SLFORMAT' ){
$tmp[$p] = '_ImgSubList'.mb_substr($_ObjetoID,1,-1).'()';
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = '';
}else if( $DimLabel[$p]=='SLTH' ){
if( eSubstrCount($tmp[$p],CHR92)>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode(CHR92, $tmp[$p]);
}else{
list($tmp[$p]) = explode(CHR92, $tmp[$p]);
}
}
$tmp[$p] = _SubListGetImg($tmp[$p]);
$tmp[$p] = str_replace(',', '&#44;', "<IMG SRC='g/l_op_insert.gif' title=".'"'.$__Lng[19].'"'." onclick=eSLAction('".mb_substr($_ObjetoID,1,-1)."'&#44;'i')>".str_replace(',', '&#44;', $THAddIcon));
}else{
$tmp[$p] = '';
}
if( $ConComa ) $_Objeto[$_ObjetoID][$DimLabel[$p]] .= ',';
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= trim($tmp[$p]);
}
$ConComa = true;
}
$ConSelect = false;
$LetraAlias = 66;
$MasFrom = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
$buffer = ___Lng(trim($_DimEDF[$i]));
list($buffer) = explode(REM, $buffer);
$Chr_1 = $buffer[0];
if( $Chr_1 == '¿' ){
list( $tmp9 ) = explode('?',$buffer);
$tmp9 = trim(mb_substr( $tmp9, 1 ));
$buffer = trim( mb_substr( $buffer, mb_strpos( $buffer, '?' )+1 ) );
if( mb_substr($tmp9,0,2) == '#(' ){
list( $tmp9 ) = explode(')',mb_substr($tmp9,2));
$tmp9 = trim($tmp9);
$cModo = explode(',',$tmp9 );
$acc = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( mb_substr($tmp9,0,3) == '#!(' ){
list( $tmp9 ) = explode(')',mb_substr($tmp9,3));
$tmp9 = trim($tmp9);
$cModo = explode(',',$tmp9 );
$acc = !( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( mb_substr($tmp9,0,2) == '#!' ){
$acc = !( $_Variable[str_replace('!','',$tmp9)] );
}else if( $tmp9[0] == '#' ){
$acc = ( $_Variable[$tmp9] );
}else{
$acc = _ExeEval( $tmp9, $buffer );
if( !$acc ) continue;
}
}
if( eSubstrCount('{[',$buffer[0]) > 0 ) break;
if( $buffer=='' || $buffer[0]=='.' || mb_substr($buffer,0,2)==REM ) continue;
$ConSelect = false;
$tmp = explode('|',$buffer);
for( $p=0; $p<count($tmp); $p++ ){
$tmp[$p] = trim($tmp[$p]);
if( $DimLabel[$p]=='SLALIGN' && eSubstrCount( $tmp[$p], CHR92 ) > 0 ){
if( eSubstrCount( ',a,mR,', ",{$Opcion}," ) > 0 ){
list( $tmp[$p] ) = explode( CHR92, $tmp[$p] );
}else{
list( ,$tmp[$p] ) = explode( CHR92, $tmp[$p] );
}
}else if( $DimLabel[$p]=='SLMENU' ){
if( $tmp[$p]=='' ) continue;
$tmp[$p] = trim($tmp[$iSql]).'='.$tmp[$p];
}else if( $DimLabel[$p]=='SLTH' ){
if( eSubstrCount($tmp[$p],CHR92)>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode( CHR92, $tmp[$p] );
}else{
list($tmp[$p]) = explode( CHR92, $tmp[$p] );
}
}
$tmp[$p] = _SubListGetImg($tmp[$p]);
$tmp[$p] = str_replace(',', '&#44;', str_replace('·','<BR>',$tmp[$p]));
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = str_replace( ',', '&#44;', $tmp[$p] );
if( $tmp[$p]=='S' ){
if( eSubstrCount($_Objeto[$_ObjetoID][$DimLabel[$iAlign]],',')==0 ){
$_Objeto[$_ObjetoID][$DimLabel[$iAlign]] = 'H';
}else{
$_Objeto[$_ObjetoID][$DimLabel[$iAlign]] = mb_substr( $_Objeto[$_ObjetoID][$DimLabel[$iAlign]], 0, mb_strrpos($_Objeto[$_ObjetoID][$DimLabel[$iAlign]], ',' )+1 ).'H';
}
$ConSelect = true;
}
}
if( $ConComa ) $_Objeto[$_ObjetoID][$DimLabel[$p]] .= ',';
$tmp[$p] = trim($tmp[$p]);
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= $tmp[$p];
}
if( $ConSelect ){
for( $p=0; $p<count($tmp); $p++ ){
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= ',';
if( $DimLabel[$p]=='SLSQL' ){
if( $LetraAlias == 66 ) $MasFrom .= ' as A';
$MasFrom .= ' left join '.mb_substr($tmp[$p],3).' as '.mb_chr($LetraAlias).' on A.'.$tmp[$p].'='.mb_chr($LetraAlias).'.'.$tmp[$p];
$tmp[$p] = mb_chr($LetraAlias).'.nm_'.mb_substr($tmp[$p],3);
}else if( $DimLabel[$p]=='SLMENU' ){
list(,$tmp2) = explode('=',$tmp[$p]);
$tmp[$p] = trim($tmp[$iSql]).'=*'.$tmp2;
}
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= $tmp[$p];
}
$LetraAlias++;
$ConSelect = false;
}
$ConComa = true;
}
if( $LetraAlias > 66 ){
$txt = '';
$tmp = explode(',', $_Objeto[$_ObjetoID]['SLMENU']);
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( eSubstrCount( $tmp[$p], '.' )==0 ){
if( $tmp[$p][0]!='"' && $tmp[$p][0]!="'" ) $tmp[$p] = 'A.'.$tmp[$p];
}
$txt .= $tmp[$p];
}
$_Objeto[$_ObjetoID]['SLMENU'] = $txt;
$txt = '';
$tmp = explode( ',', $_Objeto[$_ObjetoID]['SLSQL'] );
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( eSubstrCount( $tmp[$p], '.' )==0 ){
if( $tmp[$p][0]!='"' && $tmp[$p][0]!="'" ) $tmp[$p] = 'A.'.$tmp[$p];
}
$txt .= $tmp[$p];
}
$_Objeto[$_ObjetoID]['SLSQL'] = $txt;
}
$nDimFCH = $i-2;
if( $BeforeAfter=='A' ){
$buffer = ___Lng(trim($_DimEDF[$LineaGroup]));
$tmp = explode('|',$buffer);
for( $p=0; $p<count($tmp); $p++ ){
if(		  $DimLabel[$p]=='SLALIGN' ){
$tmp[$p] = 'C';
}else if( $DimLabel[$p]=='SLSQL' ){
$tmp[$p] = "''";
}else if( $DimLabel[$p]=='SLMENU' ){
$tmp[$p] = "''=IMG";
}else if( $DimLabel[$p]=='SLFORMAT' ){
$tmp[$p] = '_ImgSubList'.mb_substr($_ObjetoID,1,-1).'()';
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = '';
}else if( $DimLabel[$p]=='SLTH' ){
if( eSubstrCount($tmp[$p],CHR92)>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode( CHR92, $tmp[$p] );
}else{
list($tmp[$p]) = explode( CHR92, $tmp[$p] );
}
}
$tmp[$p] = _SubListGetImg($tmp[$p]);
$tmp[$p] = str_replace(',', '&#44;', "<IMG SRC='g/l_op_insert.gif' title=".'"'.$__Lng[19].'"'." onclick=eSLAction('".mb_substr($_ObjetoID,1,-1)."'&#44;'i')>".str_replace(',', '&#44;', $THAddIcon));
}else{
$tmp[$p] = '';
}
if( $ConComa ) $_Objeto[$_ObjetoID][$DimLabel[$p]] .= ',';
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= trim($tmp[$p]);
}
}
break;
}else if( $tmp=='SLICON' ){
list($mod, $buffer) = explode('|', $buffer);
if( !eOkMode($Opcion, $mod) ) break;
$_Objeto[$_ObjetoID][$tmp] = ___Lng(trim($buffer));
}else if( $tmp=='SLSQL' ){
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$tmp2 = trim($_DimEDF[$i]);
list($tmp2) = explode(REM, $tmp2);
if( $tmp2[0]=="{" || $tmp2[0]=="[" ){
$nDimFCH = $i-1;
break;
}else if( $tmp2=="" ){
}else if( !($tmp2[0]=="." || mb_substr($tmp2,0,2)==REM) ){
$buffer .= ' '.$tmp2;
}
}
$_Objeto[$_ObjetoID]['sSLSQL'] = $buffer;
list($buffer,,$_Objeto[$_ObjetoID]['SLFILE'],$_Objeto[$_ObjetoID]['SLFILECONTENT']) = explode('|',$buffer);
$_Objeto[$_ObjetoID]['SLFILE'] = trim($_Objeto[$_ObjetoID]['SLFILE']);
if( $LetraAlias > 66 ){
list( $iz, $dch ) = explode( ' where ', $buffer );
$buffer = $iz.$MasFrom.' where A.'.$dch;
list( $iz, $dch ) = explode( ' order by ', $buffer );
$buffer = $iz.' order by A.'.$dch;
}
$buffer = str_replace('  ',' ',$buffer);
if( mb_strtoupper(mb_substr($buffer,0,9))=='SELECT # ' || mb_strtoupper(mb_substr($buffer,0,9))=='SELECT * ' ){
$buffer = 'select '.$_Objeto[$_ObjetoID][$tmp].' '.mb_substr($buffer,9);
}else{
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace( '|'.$Cambiar.'|', '|'.$_Objeto[$_ObjetoID][$tmp].'|', $buffer );
}
if( $Opcion=='A' ) $_ObjetoSQL[] = $buffer;
$_Objeto[$_ObjetoID][$tmp] = $buffer;
$tmp = explode(' ',str_replace("  "," ",str_replace(","," ",$buffer)));
for($n=0; $n<count($tmp); $n++){
if( mb_strtoupper($tmp[$n])=='FROM' ){
if( mb_strtoupper($tmp[$n+2])=="AS" ){
if( mb_substr($tmp[$n+3],-1)=="," ) $tmp[$n+3] = mb_substr($tmp[$n+3],0,-1);
$_Objeto[$_ObjetoID]["ALIAS"] = $tmp[$n+3].".";
}else if( mb_strlen($tmp[$n+2])==1 ){
$_Objeto[$_ObjetoID]["ALIAS"] = $tmp[$n+2].".";
}else if( mb_strlen($tmp[$n+2])==2 && mb_substr($tmp[$n+2],-1)=="," ){
$_Objeto[$_ObjetoID]["ALIAS"] = mb_substr($tmp[$n+2],0,-1).".";
}else{
$_Objeto[$_ObjetoID]["ALIAS"] = "";
}
break;
}
}
break;
}else if( $tmp=='SLMENU' ){
global $_nObjeto;
$_nObjeto++;
$_Objeto[$_ObjetoID]['nSLMENU']++;
$sMenu = $_Objeto[$_ObjetoID]['SLMENU'];
$buffer = str_replace('  ',' ',$buffer);
list($SubOpciones,,$FSFile,,$tmp,$slIMG) = explode('|',$buffer);
$SubOpciones = eNsp($SubOpciones);
$tmp = trim($tmp);
if( mb_strtoupper(trim($tmp))=="FORMSTATIC" && ((eSubstrCount(",{$SubOpciones},",",mR,")>0 && $Opcion=="M") || (eSubstrCount(",{$SubOpciones},",",a,")>0 && $Opcion=="A")) ){
global $_SUBLISTWIN;
$_SUBLISTWIN[mb_substr($_ObjetoID,1,-1)] = $FSFile;
}
if( !eOkMode($Opcion, $SubOpciones, '') ) break;
if( mb_strtoupper(trim($tmp))=='FORMONLINE' ){
$DimCampos = $_Objeto[$_ObjetoID]['SLSQL'];
if( mb_strtoupper(mb_substr($DimCampos,0,6))=='SELECT' ) $DimCampos = mb_substr($DimCampos,7);
list( $DimCampos ) = explode( ' from ', $DimCampos );
$DimCampos = str_replace('  ',' ',$DimCampos);
$FSFile = $DimCampos;
}
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace( '|'.$Cambiar.'|', '|'.$sMenu.'|', $buffer );
$_Objeto[$_ObjetoID]['SLMENU'] = $buffer;
global $_SaveList;
if( $slIMG!='' ){
$slIMG = _SubListGetImg($slIMG, true, "", true);
$slIMG = str_replace("\n","<br>",$slIMG);
$_OnLineIMG[$_ObjetoID] = $slIMG;
}
if( mb_strtoupper(trim($tmp))=='FORMSTATIC' ){
$_Objeto[$_ObjetoID]['FORMSTATIC'] = 1;
$FSFile = trim($FSFile);
if( eSubstrCount($FSFile,'.')==0 ) $FSFile .= '.edf';
include_once($GLOBALS['Dir_'].'formstatic.inc');
$tmp = LeerFormStatic( eScript($FSFile), $_ObjetoID );
$_Objeto[$_ObjetoID]['FieldSubList'] = $tmp[1];
$tmp = $tmp[0];
$tmp = str_replace('|#|',"|{$_DBINDEX}|",$tmp);
$_SaveList[] = $tmp;
}else if( mb_strtoupper(trim($tmp))=='FORMONLINE' ){
$_Objeto[$_ObjetoID]['FORMSTATIC'] = 0;
global $_OnLineOP, $_DimChildrenData, $_SubModoAlta;
$_SaveOnLine[] = mb_substr($_ObjetoID,1,-1).'|'.$FSFile;
$tmp = explode(',',$sMenu);
$uCampo = '';
for( $i=0; $i<count($tmp)-(($BeforeAfter=='A')?1:0); $i++ ){
list( $tmp1, $tmp2 ) = explode('=',$tmp[$i]);
$tmp2 = trim($tmp2);
if( $tmp2[0]=='_' ) $_SubModoAlta[$tmp2] = true;
if( $tmp2=='' ) $tmp2 = trim($tmp1);
if( $tmp2[0]!="'" || $tmp2[0]!='"' ){
$uCampo = '_op_'.mb_substr($_ObjetoID,1,-1);
}
}
if( $tmp2[0]=='*' ){
$_OnLineOP[mb_substr($tmp2,1)] = $uCampo;
}else{
if( trim($tmp2)=='' ){
$_OnLineOP[$_nObjeto] = $uCampo;
}else{
$_OnLineOP[$tmp2] = $uCampo;
}
}
$dCampos = ''; $oCampos = '';
$tmp = explode(',',$FSFile);
for( $n=0; $n<count($tmp); $n++ ){
list($tmp2) = explode('=',$tmp[$n]);
if( $tmp2[0]!='"' && $tmp2[0]!="'" && $tmp2[0]!='_' ){
if( $LetraAlias > 66 ){
}
$oCampos .= trim($tmp3).',';
$dCampos .= trim($tmp2).',';
}
}
$dCampos = mb_substr($dCampos,0,-1);
list( , $slIndex, $slFile ) = explode( '|', $_Objeto[$_ObjetoID]['sSLSQL'] );
list( $_Objeto[$_ObjetoID]['SLSQL'] ) = explode( '|', $_Objeto[$_ObjetoID]['SLSQL'] );
$tmp = str_replace( '  ', ' ', $_Objeto[$_ObjetoID]['SLSQL'] );
$tmp = explode(' ',$tmp);
for( $n=0; $n<count($tmp); $n++ ){
if( mb_strtoupper($tmp[$n])=='FROM' ){
$slTable = $tmp[$n+1];
if( $tmp[$n+2] == 'as' ) $slTable .= ' '.$tmp[$n+3];
else if( mb_strlen($tmp[$n+2])==1 ) $slTable .= ' '.$tmp[$n+2];
}
if( mb_strtoupper($tmp[$n])=='WHERE' ){
$txt = $_Objeto[$_ObjetoID]['SLSQL'];
$txt = mb_substr( $txt, mb_stripos($txt,' where ') );
$f = mb_strrpos(mb_substr($txt,0,mb_strpos($txt,'{')),'=')-1;
$ca = mb_substr($txt,$f,1);
while( $ca==' ' && $f>0 ) $ca = mb_substr($txt,--$f,1);
$slIndice = '';
while( $ca<>' ' && $ca<>',' && $f>0 ){
$slIndice = $ca.$slIndice;
$ca = mb_substr($txt,--$f,1);
}
break;
}
}
$_SaveList[] = $_ObjetoID.'|'.$slTable.'|'.$slIndice.'|'.trim($dCampos).'|'.trim($slIndex).'|'.$oCampos;
$_DimChildrenData[] = array($_ObjetoID, $sMenu, '','','', $slIMG);
}
}else if( $tmp=='SLGREENBAR' ){
$_Objeto[$_ObjetoID][$tmp] = true;
}else{
$_Objeto[$_ObjetoID][$tmp] = $buffer;
if( $tmp=="SLFORMAT" || $tmp=="SLFORMATTOTAL" ){
$txt = "";
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
list($buffer) = explode(REM, $_DimEDF[$i]);
$buffer = trim($buffer);
if( empty($buffer) || $buffer[0]=="." ) continue;
if( $buffer[0]=="{" || $buffer[0]=="[" ){
if( !empty($txt) ){
$nDimFCH = $i-1;
}
break;
}
$txt .= $buffer."\n";
}
if( !empty($txt) ){
$_Objeto[$_ObjetoID]["{$tmp}EXE"] = $txt;
}
}
}
break;
default:
if( $TipoEntrada=='_FIELDS' ){
if( eSubstrCount('{H}{J}{P}{F}{I}{Z}{ISUBLIST}{TAB}', mb_strtoupper(trim(mb_substr($buffer, 0, mb_strpos($buffer,'}')+1))))==1 ){
$xEti = mb_strtoupper(trim(mb_substr( $buffer, 0, mb_strpos($buffer,'}')+1 )));
if( $xEti=='{TAB}' ){
array_push( $Form, array_merge( array($xEti), explode('|',mb_substr($buffer,mb_strpos($buffer,'}')+1)) ) );
$Form[count($Form)-1][10] = $nHoja;
break;
}else if( $xEti=='{ISUBLIST}' ){
$tmp = explode('|', mb_substr( $buffer, mb_strpos($buffer,'}')+1) );
if( !eOkMode( $Opcion, $tmp[0] ) ) break;
}
if( mb_strtoupper(mb_substr($buffer,0,3))=='{Z}' && eSubstrCount('bcmsq',$Opcion) > 0 ){
}else{
array_push($Form, array($buffer));
}
}
break;
}
if( empty($buffer) && $_DEBUG!=2 ) break;
${$TipoEntrada} .= $buffer.$__Enter;
if( preg_match('/^(_HTMINI|_HTMEND)$/u', $TipoEntrada) && preg_match('/top\.eNewIFrame\(/u', $buffer) ) $_WithNewIFrame = true;
}
break;
default:
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm('F', $Opcion, $buffer, $Form, $_DEFAUX, $nHoja) ){
if( $_TmpFieldSet[1] =='+' ) $_TmpFieldSet[1]  = NombreCampo($Form[count($Form)-1][1]);
if( $_TmpEnLinea[1]	 =='+' ) $_TmpEnLinea[1]   = NombreCampo($Form[count($Form)-1][1]);
if( $_TmpEnColumna[1]=='+' ) $_TmpEnColumna[1] = NombreCampo($Form[count($Form)-1][1]);
if( $_TmpNColumnas[1]=='+' ) $_TmpNColumnas[1] = NombreCampo($Form[count($Form)-1][1]);
$nf = count($Form)-1;
if( $Form[$nf][2]!="" && $Form[$nf][1][0]!="[" ){
$tmp = NombreCampo($Form[$nf][1]);
$_Field[$tmp] = true;
$_pField[$tmp] = $Form[$nf];
}
}
break;
case '_FORMCHECK':
list($Condi[$nc][0], $Condi[$nc][1], $Condi[$nc][2]) = explode('|', $buffer);
$Condi[$nc] = array(trim(mb_strtoupper($Condi[$nc][0])), trim($Condi[$nc][1]), trim($Condi[$nc][2]), $nHoja, ($ConEsquinas)?'D':'I');
$nc++;
break;
case 'IncH':
case 'IncJ':
case 'IncP':
$_DimInclude[$TipoEntrada][$_NombreInclude] .= $buffer.$__Enter;
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
}
}
}
if( $_TITLE[0]=='#' ) $_TITLE = trim(mb_substr($_TITLE,1));
if( $_TITLE_DELFILTER!='' ) $_TITLE = $_TITLE_DELFILTER;
if( $_ConDelFilter ){
global $_TitleDelFilter;
if( $_TitleDelFilter!='' && $_TITLE!='' ) $_TITLE = $_TitleDelFilter;
}
if( isset($_ADDOPTIONCOLLABEL) ){
foreach($_ADDOPTIONCOLLABEL as $k=>$v){
$cmp = eMid($v, "$", "=");
$ok = false;
for($n=0; $n<count($_ONCHANGE); $n++){
if( $_ONCHANGE[$n][0]==$cmp ){
$_ONCHANGE[$n][1] .= "S(\":{$k}\").selectColLabel(".str_replace("'", '"', $v).");";
}
}
if( !$ok ) $_ONCHANGE[] = array($cmp, "S(\":{$k}\").selectColLabel(".str_replace("'", '"', $v).");", "", 1);
}
}
_CreateVar($Form);
$FormSeek = (eSubstrCount(',c,m,b,', ",{$Opcion},")>0);
if( isset($_WIDTH["e"]["*"]) ){
for($n=0; $n<count($Form); $n++){
$_WIDTH["e"][_NomFields($Form[$n][1])] = $_WIDTH["e"]["*"];
}
unset($_WIDTH["e"]["*"]);
}
$_y2s = date('Y-m-d H:i:s');
for($nf=0; $nf<count($Form); $nf++){
if( !eSqlType('mysql,mysqli') && eSubstrCount(',c,b,m,', ",{$Opcion}," )>0 && $_DBMEMO[$Form[$nf][1]] ){
$Form[$nf][6] = '*Q';
if( $Form[$nf][3]=='H' ) $Form[$nf][3] = 'A';
}
if( $Form[$nf][3]=='H' ) $_ConED = true;
if( $Form[$nf][7][0]=='@' ){
$Form[$nf][7] = trim(mb_substr( $Form[$nf][7], 1 ));
if( SESS::$_WebMaster==$_ENV['ON'] && eSubstrCount( ',c,b,m,', ",{$Opcion}," ) > 0 ) $Form[$nf][6] = 'Q';
}
if( $Form[$nf][0][0]==',' ){
if( $nf==0 || $Form[$nf-1][0]=='-' ) $Form[$nf][0] = mb_substr($Form[$nf][0],1);
}
list($sCampo) = explode('{', $Form[$nf][1]);
list($sCampo) = explode(':', $sCampo);
if( $_SELINFOMODE[$sCampo]<>"" ) $Form[$nf][6] .= $_SELINFOMODE[$sCampo];
if( $_RELATIONJUMP[$sCampo]==1 ){
if( eSubstrCount($Form[$nf+1][1], ':')>0 ){
list($ssCampo,$cReal) = explode(':', $Form[$nf+1][1]);
global $_NM_ATRIBUTE;
$_ADDOPTIONVALUE[$ssCampo] = $sReal;
$_NM_ATRIBUTE[$ssCampo] = $sCampo;
}
}
if( $_LABEL[$sCampo]!='' ){
list($Form[$nf][0], $MsgList, $MsgError) = explode(CHR92, $_LABEL[$sCampo]);
if( $MsgError!='' ) $_Etiqueta[$sCampo] = trim($MsgError);
}
switch( $Form[$nf][7] ){
case '#today#': $Form[$nf][7] = date('Y-m-d'); break;
case '#y2m#': $Form[$nf][7] = date('Y-m'); break;
case '#clock#':
$Form[$nf][7] = mb_substr($_y2s, 11, $Form[$nf][4]);
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
unset($_ENV[DF]["cache"]);
break;
case '#sy2s#':
$Form[$nf][7] = '>='.date('Y-m-d 00:00:00');
if( $Opcion!='a' && $Opcion!='A' ) break;
case '#y2s#':
$Form[$nf][7] = $_y2s;
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
unset($_ENV[DF]["cache"]);
break;
case '#default#': $_DEFAULT[] = 'default_'.$Form[$nf][1]; $Form[$nf][7] = ''; break;
default:
if( empty($Form[$nf][7]) ){
}else if( mb_substr($Form[$nf][7],0,1)=="=" ){
$Form[$nf][7] = mb_substr($Form[$nf][7],1);
}else if( eSubstrCount($Form[$nf][7], '\\')==1 ){
list($t, $c) = explode('\\', $Form[$nf][7]);
if( eSubstrCount(',c,cR,', ",{$Opcion},")==1 ){
$Form[$nf][7] = trim($c);
}else{
$Form[$nf][7] = trim($t);
}
}else if( mb_substr($Form[$nf][7],0,1)=='_' ){
$EsVarSesion = isset(SESS::${$Form[$nf][7]});
$Form[$nf][7] = SESS::${$Form[$nf][7]};
if( $_NOEDITFILLEDSESSION && trim($Form[$nf][7])!='' ){
if( $EsVarSesion ){
$_NOEDIT[$sCampo] = 1;
if( $Opcion=='a' ){
if( SESS::$_InsertToSeek!='' ) SESS::$_InsertToSeek .= ',';
SESS::$_InsertToSeek .= $sCampo;
}
}
}
}else if( mb_substr($Form[$nf][7],0,1)=='$' ){
$Form[$nf][7] = _ExeEval( $Form[$nf][7], $Form[$nf][7] );
}else if( mb_substr($Form[$nf][7],0,1)==">" ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.mb_substr($Form[$nf][7],1).';');
$Form[$nf][7] = @eval('return '.mb_substr($Form[$nf][7],1).';');
}else if( mb_strtoupper(mb_substr($Form[$nf][7],0,7))=='SELECT ' ){
qQuery($Form[$nf][7]);
list($Form[$nf][7]) = qRow();
}else{
$dimProp = array('SETUP::$', 'SESS::$', 'S::$');
for($n=0; $n<3; $n++){
if( eSubstrCount($_Form[$nf][7], $dimProp[$n])>0  ){
$nomPropiedad = $_Form[$nf][7];
$_Form[$nf][7] = trim(eval("return {$nomPropiedad};"));
}
}
}
}
if( $Form[$nf][7]!='' ){
$_pField[$sCampo][7] = $Form[$nf][7];
$tmp = str_replace("-Q", "", $Form[$nf][_MODE]);
if( $Opcion=="mR" && preg_match('/a/u',$tmp) && preg_match('/(A|-)/u',$tmp) ){
global $_ASSIGNFIELD;
$_ASSIGNFIELD[$Form[$nf][1]] = true;
}
}
if( $_NOEDITFILLEDFIELD[ $Form[$nf][_OFIELD] ] ){
if( $Form[$nf][7]!='' ){
$_NOEDIT[$Form[$nf][_OFIELD]] = 1;
if( $Opcion=='a' ){
if( SESS::$_InsertToSeek!='' ) SESS::$_InsertToSeek .= ',';
SESS::$_InsertToSeek .= $Form[$nf][_OFIELD];
}
}else{
unset($_NOEDIT[$Form[$nf][_OFIELD]]);
}
}
if( $_ModeSeek ){
$Form[$nf][19] = $Form[$nf][8];
}else{
list($CondiNormal, $CondiSeek) = explode('\\', $Form[$nf][8]);
$Form[$nf][8] = (($FormSeek) ? trim($CondiSeek) : trim($CondiNormal));
$Form[$nf][19] = $CondiNormal;
}
if( isset($_DEFAULTVAL[$sCampo]) && $_DEFAULTVAL[$sCampo]!='' && $Form[$nf][7]!='' ) $Form[$nf][6] = $_DEFAULTVAL[$sCampo];
}
foreach($_DBRANGEADD as $k=>$v){
$ok = true;
for($i=0; $i<count($Form); $i++){
if( $Form[$i][1]==$k ){
$ok = false;
break;
}
}
if( $ok ){
$Form[] = explode("|", ",|".$k."|X|T|30||*Q*||||{$nHoja}|I||||||||");
}
}
unset($_y2s);
if( $_xPERSISTENTVAR!='' ){
global $_DEFAULTVAL, $_ASSIGNFIELD;
$tmp = explode( ',', $_xPERSISTENTVAR );
$_xPERSISTENTVAR = '';
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $_GET[$tmp[$i]]!='' || $_POST[$tmp[$i]]!='' ){
$v = $GLOBALS[$tmp[$i]];
if( $v!='' ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.$v.'"';
}elseif( $_vF[$tmp[$i]]!='' ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.$_vF[$tmp[$i]].'"';
}elseif( $_POST[$tmp[$i]]!='' ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.$_POST[$tmp[$i]].'"';
}elseif( $_GET[$tmp[$i]]!='' ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="_GetValue_('.$_GET[$tmp[$i]].')"';
}else{
}
if( $v[0]==CHR92 ) $v = str_replace( mb_substr($v,0,2), mb_substr($v,1,1), $v );
if( ($v[0]=='"' || $v[0]=="'") && $v[0]==mb_substr($v,-1) ) $v = mb_substr($v,1,-1);
if( $tmp[$i][0] == '_' ){
array_push( $Form, array( '',$tmp[$i],'X','T','30','','*Q*',$v,'','',1 ) );
$_DEFAULTVAL[$tmp[$i]] = $v;
$_ASSIGNFIELD[$tmp[$i]] = true;
}else{
for( $p=0; $p<count($Form); $p++ ){
if( $Form[$p][1]==$tmp[$i] ){
if( eSubstrCount( $Form[$p][6], '*' ) == 0 ){
$Form[$p][6] = str_replace('A','-',$Form[$p][6]);
$Form[$p][6] = str_replace('M','-',$Form[$p][6]);
break;
}
}
}
$_DEFAULTVAL[$tmp[$i]] = $v;
}
for( $n=0; $n<count($Form); $n++ ) if( $Form[$n][1] == $tmp[$i] ) $Form[$n][7] = $v;
}
}
}
$Titulo = '';
switch( $Opcion ){
case 'bR': $Titulo='FICHA DE #'; break;
case 'cR': $Titulo='FICHA DE #'; break;
case 'mR': $Titulo='FICHA DE #'; break;
case 'aR': $Titulo='FICHA DE #'; break;
case 'a' : $Titulo='FICHA DE #'; break;
case 'b' : $Titulo='BORRAR #'; break;
case 'c' : $Titulo='CONSULTAR #'; break;
case 'm' : $Titulo='MODIFICAR #'; break;
}
foreach($_TIPFORM as $k=>$v){
foreach($v as $k2=>$v2){
if( $v['M']<>"" ) continue;
if( $v2[0]=='>' ){
$v2 = file_get_contents(eScript(mb_substr($v2,1)));
$v['S'] = 'W';
}else{
if( mb_substr($v2,-3)=='();' ) $v2 = mb_substr($v2,0,-1);
if( mb_substr($v2,-2)=='()' ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$v2.';');
$v2 = eval('return '.$v2.';');
$v['S'] = 'W';
}
}
if( $v['S']=='W' ){
echo '<span id="_TIP_'.$k2.'_'.$k.'" style="display:none;'.(($_TIPFORM[$k]['W']!='')?'width:'.$_TIPFORM[$k]['W']:'').'">'.rtrim($v2).'</span>';
$v2 = '>';
$_TIPFORM[$k][$k2] = $v2;
}else{
$v2 = str_replace('"','&34;',str_replace("'",'&39;',$v2));
$_TIPFORM[$k][$k2] = $v2;
}
}
}
if( $_TITLE!='' ){
$_TITLE = EnPlural($_TITLE, $Titulo, false, $_oTITLE);
$_LOGREQUEST["title"] = $_TITLE;
}
if( eSubstrCount($argv[0], '_ASSIGN='.$Opcion)==1 ){
$tmp = explode('&', urldecode($argv[0]));
for($n=2; $n<count($tmp); $n++){
$tmp1 = explode( '=', $tmp[$n] );
if( trim($tmp1)!='_PSOURCE' ){
for($nc=0; $nc<count($Form); $nc++){
list($Campo) = explode('{',$Form[$nc][1]);
list($Campo) = explode(':',$Campo);
if( $Campo == $tmp1[0] && str_replace('"','',str_replace("'",'',$tmp1[1]))!='' ){
if( eSubstrCount( $Form[$nc][6], '*' ) == 0 ){
if( $_GET['_BAK']!='1' ) $Form[$nc][6] = str_replace('A','-',str_replace('M','-',str_replace('Q','-Q-',$Form[$nc][6])));
}
if( ($tmp1[1][0]=='"' || $tmp1[1][0]=="'" ) && (mb_substr($tmp1[1],-1)=='"' || mb_substr($tmp1[1],-1)=="'" ) ){
$tmp1[1] = mb_substr($tmp1[1],1,-1);
}
$Form[$nc][7] = $tmp1[1];
}
}
}
}
}
if( $Hay_fPHP ){
global $_PHPFORMIN;
$DimForm = array();
for($i=0; $i<count($Form); $i++){
$DimForm[_QueNmField($Form[$i], $i)] = $Form[$i];
}
$_PHPFORMIN = true;
ModFormulario($DimForm, $Opcion, $Fichero, $nHoja, $_vF, $_pField);
$_PHPFORMIN = false;
$Form = array(); $n = 0;
foreach($DimForm as $key=>$Valor){
if( count($DimForm[$key])>=11 || $Valor[0][0]=='{' ) $Form[$n++] = $Valor;
}
}
if( $nHoja==1 && $Opcion=='mR' && $_ModCampoIndice ) $Form[] = array('_unique_','_UNIQUE_', 'X','T',60,'','Q*','','','', 1);
$Campo1 = GenControles($nHoja, $Form, $_TITLE, $Opcion, $_TCol, $Mandar, $ConEsquinas, $TotalFRM, $SolapaON, $FrmOculto, $NomHoja);
$_Form  = array_merge($_Form , $Form );
$_Condi = array_merge($_Condi, $Condi);
return $Campo1;
}
function ExtraeCampos(){
global $DFichero, $_SinUrlDecode, $_Modo, $Opcion, $_Variable, $_ObjetoSQL, $DimOpcion, $__Lng;
$TotalFRM = 0;
$nf = 0;
$nForm = array();
$Form = array();
for($nc=0; $nc<count($DFichero); $nc++){
if( eSubstrCount('=>', $DFichero[$nc][0])==0 ){
$TotalFRM++;
$FicheroD = '../d/'.trim(str_replace('-', '', $DFichero[$nc]));
$FicheroD = str_replace('*', '', $FicheroD);
$SaltarLinea = false;
$TipoEntrada = '#';
$ElPuntoEsRem = true;
$_DimEDF = @OpenDF($FicheroD);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( $Chr_1=='[' ){
if( mb_substr(mb_strtoupper($buffer),0,8)=='[PLUGIN]' ){
$tmp = explode('|', mb_substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$tmp[1] = str_replace(CHR92,'/',$tmp[1]); $sTmp = explode('/',$tmp[1]); $tmp[1] = $sTmp[count($sTmp)-1];
global $_PLUGIN;
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
if( $buffer[0]=='#' ){
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
list($cModo, $DirFile) = explode(')', eNsp($buffer));
$DirFile = mb_strtolower($DirFile);
if( eOkMode($Opcion, mb_substr($cModo,9)) ){
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
switch( mb_ord($buffer[0]) ){
case 91:
$sElPuntoEsRem = true;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'FIELDS':
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( $tmp[0][0]=='$' ){
if( _ExeEval( $tmp[0], $buffer ) ){
$TipoEntrada = $Comando;
if( mb_ord($tmp[1][0]) > 48 && mb_ord($tmp[1][0]) < 58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}
break;
}
}
if( !empty($tmp[0]) ){
if( mb_ord($tmp[0][0]) > 48 && mb_ord($tmp[0][0]) < 58 ){
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[0] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( mb_strtoupper($tmp[0])=='ELSE' && count($Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( mb_ord($tmp[1][0]) > 48 && mb_ord($tmp[1][0]) < 58 ){
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[1] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( mb_strtoupper($tmp[1])=='ELSE' && count($Form)==0 ) $OkModo = true;
}
}
if( $OkModo ) $TipoEntrada = '_FIELDS';
break;
case 'CC':
eExplodeOne( $buffer, '|', $txt1, $txt2 );
$_Variable[$tmp[0]] = _ExeEval( $txt2, $buffer );
break;
case 'NOTE':
break 3;
case 'BACKGROUNDIMAGE':
if( $OkModo ){
global $_PSOURCE, $_BACKGROUNDIMAGE;
if(  $tmp[4]=='false' || (($tmp[4]=='' || $tmp[4]=='true') && $_PSOURCE=='WWORK') ){
$_BACKGROUNDIMAGE = '<style>body{background-image:url("'.$tmp[1].'");background-repeat:'.(($tmp[2]=='')?'no-repeat':$tmp[2]).';background-position:'.(($tmp[3]=='')?'bottom right':$tmp[3]).';background-attachment:fixed;}</style>';
}
}
break;
default:
$TipoEntrada = '#';
}
break;
case  0:
case 10:
case 123:
$ElPuntoEsRem = $sElPuntoEsRem;
break;
default:
if( $TipoEntrada=='_FIELDS'){
$Saltar = false;
if( $buffer[0] == '-' || $buffer[0] == '>' ){
if( eSubstrCount( $buffer, '|' ) == 1 ){
list( $Form[$nf][0], $Form[$nf][1] ) = explode( '|', $buffer );
list( $Form[$nf][2], $Form[$nf][3], $Form[$nf][4], $Form[$nf][5], $Form[$nf][6], $Form[$nf][7], $Form[$nf][8], $Form[$nf][9] ) = array( '','','','','','','','' );
}else{
list( $Form[$nf][0], $Form[$nf][1], $Form[$nf][2], $Form[$nf][3], $Form[$nf][4], $Form[$nf][5], $Form[$nf][6], $Form[$nf][7], $Form[$nf][8], $Form[$nf][9] ) = explode ( '|', $buffer );
if( trim( $Form[$nf][6] ) == 'Q' ) $Saltar = true;
}
}else{
list( $Form[$nf][0], $Form[$nf][1], $Form[$nf][2], $Form[$nf][3], $Form[$nf][4], $Form[$nf][5], $Form[$nf][6], $Form[$nf][7], $Form[$nf][8], $Form[$nf][9] ) = explode ( '|', $buffer );
}
$Form[$nf][1] = trim($Form[$nf][1]);
if( $Form[$nf][1][0]=='#' ){
global $_MacroField;
if( count($_MacroField)==0 ) CargaMacroField();
$Form[$nf][1] = $_MacroField[$Form[$nf][1]];
}
$nForm[$nf] = $nc+1;
if( !$Saltar ){
if( (mb_strlen($Form[$nf][2])==0 AND $Form[$nf][0][0]!='-' AND $Form[$nf][0][0]!='>') OR ( eSubstrCount('mcb',$Opcion)>0 AND ( eSubstrCount($Form[$nf][6],'Q')==0 OR $Form[$nf][0][0]=='-') ) ){
$Form = array_splice( $Form, 0, count($Form)-1 );
$nf--;
}
}
if( trim($Form[$nf][3])=='G' || $Form[$nf][1][0]=='[' || mb_substr(trim($Form[$nf][1]),0,2)=='__' ){
$Form = array_splice( $Form, 0, count($Form)-1 );
$nf--;
}
$nf++;
break;
}
if( empty($buffer) && $GLOBALS["_DEBUG"]!=2 ) break;
${$TipoEntrada} .= $buffer.$__Enter;
if( preg_match('/^(_HTMINI|_HTMEND)$/u', $TipoEntrada) && preg_match('/top\.eNewIFrame\(/u', $buffer) ) $_WithNewIFrame = true;
}
}
}
}
$DimCampos = array();
$DimHoja = array();
$TCampos = '';
for($nf=0; $nf<count($Form); $nf++){
$Form[$nf][1] = trim($Form[$nf][1]);
if( trim($Form[$nf][2])=='#' ) $_SinUrlDecode[$Form[$nf][1]] = 1;
if( !empty($Form[$nf][1]) && $Form[$nf][1][0]!='_' && $Form[$nf][0][0]!='>' && $Form[$nf][0][0]!='-' && $Form[$nf][1][0]!='[' ){
$NomCampo = $Form[$nf][1];
if( eSubstrCount($NomCampo, ':')>0 ){
list($NomCampo) = explode(':', $NomCampo);
}else if( eSubstrCount($NomCampo, '{')>0 ){
list($tmp) = explode('{', $NomCampo);
$NomCampo = trim($tmp);
}
$NomCampo = trim($NomCampo);
if( !in_array($NomCampo, $DimCampos) ){
array_push($DimCampos, $NomCampo);
array_push($DimHoja, $nForm[$nf]);
if( !empty($TCampos) ) $TCampos .= ',';
$TCampos .= mb_chr(64+$nForm[$nf]).'.'.$NomCampo;
}
}
}
return $TCampos;
}
function _MenuGFicha($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction){
global $_IconMenu, $_FORMTYPEMENU;
if( $TSolapaON<2 ) return;
if( $_FORMTYPEMENU=='' ){
echo '<TABLE border=0px cellspacing=1px cellpadding=2px id="TABMenu" onclick="_TabMenu()" onmousewheel="_TabWheel()" style="border-collapse:collapse;">';
}else if( $_FORMTYPEMENU==1 ){
echo '<TABLE border=0px cellspacing=0px cellpadding=0px id="TABMenu" onclick="_TabMenu()" onmousewheel="_TabWheel()" style="border-collapse:collapse;">';
}else{
return;
}
$n0 = 'On';
$ConSolapa = false;
$nc = 0;
if( $TSolapaON==1 ) $nc = 100;
for($nc=0; $nc<count($DOpcion); $nc++){
if( empty($DOpcion[$nc]) ) continue;
$n = $nc+1;
if( !$ConSolapa ) $n0 = 'On';
$SeVe = "";
if( $DFichero[$nc][0]=='*' ) continue;
if( $DFichero[$nc][0]=='-' || $DFichero[$nc][0]=='*' ){
$SeVe = " style='display:none;'";
$n0 = 'Off';
}
if( $nc>0 ) $n0 = 'Off';
if( $n0=='On' ) $ConSolapa = true;
$IconoTab = '';
$DOpcion[$nc] = trim($DOpcion[$nc]);
if( $DOpcion[$nc][0]=='{' ){
list($IconoTab, $DOpcion[$nc]) = explode('}', $DOpcion[$nc]);
$DOpcion[$nc] = trim($DOpcion[$nc]);
}else if( $DOpcion[$nc][0]=='[' ){
list($IconoTab, $DOpcion[$nc]) = explode(']', $DOpcion[$nc]);
}
if( $_FORMTYPEMENU=='' || $nc==0 ) echo "<TR{$SeVe}>";
if( $_FORMTYPEMENU=='' ){
echo "<TD class='TABMenu{$n0}' nowrap nOp={$n}{$DTitle[$nc]} Func='{$DFunction[$nc]}'>";
}else{
echo "<TD nowrap nOp={$n}{$DTitle[$nc]} Func='{$DFunction[$nc]}'>";
echo "<div class='TABMenu{$n0}'>";
}
if( $_IconMenu!='' || $IconoTab!='' ){
if( $IconoTab!='' ){
echo eIcon($IconoTab);
}else{
echo eIcon($_IconMenu);
}
echo '&nbsp;';
}
echo $DOpcion[$nc];
if( $_FORMTYPEMENU==1 ) echo '</div>';
echo '</TD>';
if( $_FORMTYPEMENU=='' ) echo '</TR>';
}
if( $_FORMTYPEMENU==1 ) echo '</TR>';
echo '</TABLE>';
}
function _MenuGFicha2($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction){
global $_IconMenu;
if( $TSolapaON<2 ) return;
echo '<TABLE a=6 id="TABMenu" style="border-spacing:0px; width:100%; border-collapse:collapse;" border=0px cellspacing=0px cellpadding=0px onclick="_TabMenu()" onmousewheel="_TabWheel()"><tr>';
echo '<TD class="TABMenuSeparator">&nbsp;</TD>';
$n0 = 'On';
$ConSolapa = false;
$nc = 0;
if( $TSolapaON==1 ) $nc = 100;
for($nc=0; $nc<count($DOpcion); $nc++){
if( empty($DOpcion[$nc]) ) continue;
$n = $nc+1;
if( !$ConSolapa ) $n0 = 'On';
$SeVe = '';
if( $DFichero[$nc][0]=='*' ) continue;
if( $DFichero[$nc][0]=='-' || $DFichero[$nc][0]=='*' ){
$SeVe = "display:none;";
$n0 = 'Off';
}
if( $nc > 0 ) $n0 = 'Off';
if( $n0 == 'On' ) $ConSolapa = true;
$IconoTab = '';
$DOpcion[$nc] = trim($DOpcion[$nc]);
if( $DOpcion[$nc][0]=='{' ){
list($IconoTab, $DOpcion[$nc]) = explode('}', $DOpcion[$nc]);
$DOpcion[$nc] = trim($DOpcion[$nc]);
}else if( $DOpcion[$nc][0]=='[' ){
list($IconoTab, $DOpcion[$nc]) = explode(']', $DOpcion[$nc]);
}
echo "<TD class='TABMenu{$n0}' nowrap nOp={$n}{$DTitle[$nc]} Func='{$DFunction[$nc]}' style='white-space:nowrap;{$SeVe}'>";
if( $_IconMenu!='' || $IconoTab!='' ){
if( $IconoTab!='' ){
echo eIcon($IconoTab);
}else{
echo eIcon($_IconMenu);
}
echo '&nbsp;';
}
echo $DOpcion[$nc];
echo '</TD>';
echo '<TD class="TABMenuSeparator">&nbsp;</TD>';
}
echo '<TD class="TABMenuSeparator" style="width:100%">&nbsp;</TD>';
echo '</TR></TABLE>';
}
function _RecuperarDBRange($File, $Opcion){
global $DimDBRange;
$ElPuntoEsRem = true;
$_DimEDF = @OpenDF(eScript($File));
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( mb_ord($buffer[0])==91 ){
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
if( $Etiqueta=='DBRANGE' ){
if( eSubstrCount( ',c,m,b,', ",{$Opcion}," ) > 0 ){
$_DBRANGE[] = $tmp[2];
$_DBRANGE[] = $tmp[3];
}
if( eSubstrCount( ',cR,mR,bR,', ",{$Opcion}," ) > 0 ){
$Campo		= $tmp[1];
$VarIni		= $_POST[$tmp[2]];
$VarFin		= $_POST[$tmp[3]];
$Inclusive	= ( eSubstrCount( ',TRUE,!FALSE,1,,', ','.mb_strtoupper($tmp[4]).',' ) == 1 );
if(		 $VarIni=='' && $VarFin=='' ){
}else if( $VarIni=='' && $VarFin!='' ){
$_POST[$Campo] = $VarFin;
}else if( $VarIni!='' && $VarFin=='' ){
$_POST[$Campo] = $VarIni;
}else if( $VarIni!='' && $VarFin!='' ){
if( $VarIni!=$VarFin ){
if( $Inclusive ){
if( $VarIni < $VarFin ){
$_POST[$Campo] = '>='.$VarIni.' <='.$VarFin;
}else{
$_POST[$Campo] = '>='.$VarFin.' <='.$VarIni;
}
}else{
if( $VarIni < $VarFin ){
$_POST[$Campo] = '>'.$VarIni.' <'.$VarFin;
}else{
$_POST[$Campo] = '>'.$VarFin.' <'.$VarIni;
}
}
}else{
$_POST[$Campo] = $VarFin;
}
}
$_POST[$Campo] = $_POST[$Campo];
$_POST[$Campo] = $_POST[$Campo];
$DimDBRange[] = array( $tmp[1], $_POST[$tmp[2]], $_POST[$tmp[3]], $tmp[4], $tmp[2], $tmp[3] );
}
continue;
}else if( $Etiqueta=='DB' ){
global $_Sql, $_SqlPDOType, $_SqlInit, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect, $_OtroDiccionario, $_SqdDefinitionFile, $_DBSEQUENCE, $_DBRLOCK;
unset( $_DBSEQUENCE );
unset( $_DBRLOCK );
$_SqlInit = array();
$_OtroDiccionario = true;
$tmp[0] = eNsp($tmp[0]);
if( eSubstrCount($tmp[0],',') == 0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(mb_substr($tmp[0],1));
$_DB = $tmp[0];
if( eSubstrCount(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( eSubstrCount($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
if( $tmp[0][0]=='~' ){
$GLOBALS['_SqdDefinitionFile'] = str_replace('~','../..',$tmp[0]);
}else{
$GLOBALS['_SqdDefinitionFile'] = eScript($tmp[0]);
}
include( $GLOBALS['_SqdDefinitionFile'] );
}else{
list( $_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect ) = explode( ',',$tmp[0]);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = $GLOBALS[$_SqlHostName];
}
list( $_Sql, $_SqlPDOType ) = explode( ':', eNsp($_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
}
}
}
?>