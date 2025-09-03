<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
if(!$_ENV[SYS]['RegisterShutdown']){
register_shutdown_function('_ExitPHP');
$_ENV[SYS]['RegisterShutdown'] = true;
}
eLngLoad(DIREDES.'lng/tab', '', 1);
include_once(DIREDES.'formulario.inc');
include_once(DIREDES.'message.inc');
@include("../_datos/config/width_css".SESS::$cssSufijo.".php");
if( !isset($NomFile) ){
list($Opcion, $Fichero) = explode(':', $_Accion);
$NomFile = mb_substr(mb_strrchr($_SERVER['PHP_SELF'],'/'), 1);
if( $Fichero=='$_SessionEDF.edf' ){
if( !empty(SESS::$_SessionEDF) ){
$Fichero = SESS::$_SessionEDF;
}else{
$Fichero = "/_datos/config/_sessionedf.edf";
}
}
$OriFichero = $Fichero;
$Fichero = eScript($Fichero);
$FicheroD = $Fichero;
}
$_FORMACTION = '';
$_RoyalMode = $Opcion;
if( $Opcion=="r" ){
$Opcion = "c";
$_FORMACTION = "Ll:";
}
if( $Opcion=="l" ){
$Opcion = "c";
$_FORMACTION = "Ll:";
}
if( !empty($_BinaryMode[$Opcion]) ) $Opcion = $_BinaryMode[$Opcion];
$_OpcionBak = $Opcion;
if( $Opcion=='o' ) $Opcion = 'c';
$_IconMenu = '';
if( SESS::$_CacheSrv && eSubstrCount(',a,c,m,b,', ",{$Opcion},")==1 ){
header("Expires: ".gmdate("D, d M Y ".SESS::$_CachePc." T"));
header("Cache-Control: max-age");
}
$_TargetUrl = (SETUP::$List['SubWindowInIWork'] ? '&_IWORK=2' : '');
if( $_GET['_PSOURCE']=='WWORK' ) $_TargetUrl = '';
$_gsObjeto = 'F';
$_Modo = $Opcion;
$_Mode = &$_Modo;
$_ModeSeek = false;
$_SubModo = $Opcion;
$_SubMode = &$Opcion;
$_SubModoAlta = array();
$_pF = array();
$_ConRespuesta = false;
$_DBTABLE = '';
$_DBINDEX = '';
$_DBINDEX2 = '';
$_DBINDEX3 = '';
$_CheckDBIndex = '';
$_DimCheckDBIndex = array();
$_DBORDER = '';
$_DBTABLERELATION = array();
$_DBFILTERIN = "";
$_SUBSELECTMEMORY = array();
$DimTipoForm[0] = 'F';
$nc = 0;
$_TCol = 1;
$_TAB = $_TITLE = '';
$_TITLEICON = array();
$_Form = array();
$_Condi = array();
$_Field = array();
$_pField = array();
$_SELECT_DDBB = array();
$_RELATIONFIELDS = array();
$_RELATIONJUMP = array();
$_SELECTFILL = array();
$_WHERESELECT = array();
$_LOCALSELECT = array();
$_EXTFORM = '';
$_MSGANSWER = array();
$_MSGANSWEROK = false;
$_MSGSUBMIT = array();
$_BUTTON = array('','');
$_ADDBUTTON = array();
$_ASSIGN = false;
$_NOEDIT = array();
$_NOEDITFILLED = false;
$_NOEDITFILLEDSESSION = false;
$_NOEDITFILLEDFIELD = array();
$_DEFAULTVAL = array();
$_WINCLOSE = false;
$_CSS = 'ficha';
$_CSSADD = '';
$_CSSPRINT = '';
$_ISubListTotal = 0;
$_RELATIONSUBLIST = array();
$_RELATIONSUBLISTFUNC = array();
if( !isset($_NOTOOLS) ) $_NOTOOLS = '';
$_PERSISTENTVAR = '';
if( !empty($_GET['_REFRESH']) ) $_PERSISTENTVAR = '_REFRESH';
$_X = $_Y = -1;
$_REQFILTER = false;
$_DELFILTER = array();
$_TitleDelFilter = '';
$_nSerial = 0;
$_DimPaste = array();
$_DefaultPaste = array();
$_WINTITLE = '';
$_SubVentana = array();
$_SELINFO = array();
$_SELINFONOEVENT = array();
$_ONCHANGE = array();
$_EXEONCHANGE = array();
$_SHOWFIELDS = array();
$_ADDOPTION = array();
$_DELOPTION = array();
$_FILLOPTION = array();
$_ADDOPTIONVALUE = array();
$_NM_ATRIBUTE = array();
$_ADDCODE = array();
$_LABEL = array();
$_DBADDFILTER = '';
$_EXPORT = array();
$_DBJOINTABLE = array();
$_DBLOG = array();
$_DBLOGINCLUDE = '';
$_DBMEMO = array();
$_DBRANGE = array();
$_COUNT = '-1';
$_MemoContenido = array();
$_DBMemoTable = '';
$_ONLOAD = '';
$_LOCATION = '';
$_TIPFORM = array();
$_NOJS = false;
$_WIDTH = array();
$_CHR = array();
$_GPFIELDS = array();
$_DEFAUX = array();
$_FORMWIDTHS = array();
$_Objeto = array();
$_Etiqueta = array();
$_RADIO = array();
$_TDSTYLE = array();
$_DEFAULT = array();
$_eAlign = array();
$_ConFicheros = false;
$_ISUBLISTSERIAL = '';
$_CONTEXTFREE = array();
$_CONTEXTSUBSELECT = array();
$_MSGTIME = array('','');
$_FIELDSET = array();
$_FIELDSETON = false;
$_TmpFieldSet = array('','','','');
$_EnLinea = array();
$_TmpEnLinea = array('','','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');// Temporal para en Columna
$_NewNColumnas = array();
$_TmpNColumnas = array('','','','');// Temporal para nueva estructura de tabla
$_SKIPTD = array();
$_Variable = array();
$_CC = &$_Variable;
$_VarSesion = false;
$_VarFile = '';
$_Fichero = array();
$_UPLOADFILE = array();
$PDF_Formato = '';
$_PDFLABEL = false;
$_DimInclude = array();
$_NombreInclude = '';
$_BCP = array();
$_DBADDFIELDS = array();
$_DBADDSQL = array();
$_FIELDBROWSER = array();
$_HELP = CodeHELP($OriFichero, $Opcion);
$_CalcularAnchos = array();
$DimDBRange = array();
$_ConDBRange = array();
$_ObjetoID = '';
$_FORMSTATIC = false;
$_SaveList = array();
$_SaveOnLine = array();
$_OnLineIMG = array();
$_OnLineOP = array();
$_SUBLISTDF = array();
$_SUBLISTWIN = array();
$_DimChildrenData = array();
$_AltoSelect = array();
$_OtroDiccionario = false;
$_LineForm = 0;
$_ReorderForm = array();
$_SUBTAB = 1;
$_SUBTABFORM = '';
$_AUTOMENU = 0;
$_SAVEFORM = '';
$_DCT = array();
$_JSDIM = array();
$_JSINCLUDE = array();
$_JSCHECK = '';
$_DBSERIAL = array();
$_DBGATEWAY = '';
$_DBGATEWAYONE = '';
$_DBINI = '';
$_DBEND = '';
$_DBSELREC = '';
$_DBREAD = '';
$_DBINSERT = '';
$_OkDBINSERT = false;
$_DBSQL = '';
$_DBBAKDELETE = false;
$_DBBakDeleteUpdate = '';
$_OPTIONS = array();
$_SUBMITHIDDEN = false;
$_EXPORTSCOPE = SETUP::$System["ExportScope"];
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
if( !isset($_LNGCOL) ) $_LNGCOL = 1;
if( !isset($_LNGCOLDEFAULT) ) $_LNGCOLDEFAULT = 1;
$_FIELDSPAN = array();
$_nObjeto = 0;
$_FieldsMix = false;
$_PHPFORM = '';
$_JSHEAD  = $_JSINI  = $_JSEND  = '';
$_HTMHEAD = $_HTMINI = $_HTMEND = '';
$_PHPHEAD = $_PHPINI = $_PHPEND = $_PHPSTART = '';
$_JSSYSTEM = "";
$_DimRecalc = array();
$_ANACTION = false;
if( isset($_GET['_NOEDITFILLED']) ) $_NOEDITFILLED = true;
if( isset($_GET['_NOBUTTON']) ) $_NOBUTTON = true;
$TipoEntrada = '#';
$SaltarLinea = false;
$_ModCampoIndice = false;
if( mb_substr($FicheroD,-4)=='.ini' && eSubstrCount(',cR,mR,M,', ",{$Opcion},")>0 ){
if( $_SERVER['PHP_SELF']=='/edes.v3/http/edes.php' ){
if( !empty($_Web_) ) chdir("../../{$_Web_}/http/");
}
$_DimEDF = array();
if( $OriFichero[0]=='*' ){
$Fichero = $OriFichero;
}else{
$Fichero = str_replace( '..','',$Fichero );
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
}
$FicheroD = $Fichero;
$_VarFile = $OriFichero;
$_STOP = true;
if( $Opcion=='cR' ) $_NOBUTTON = true;
$_gsCreate_ = true;
}else{
if( mb_substr($FicheroD,-4)=='.tbl' ){
include_once("{$Dir_}t/credf.inc");
$FicheroD = str_replace('\\','/',$FicheroD);
$_AddCreateEDF = '';
error_reporting(_ERROR_REPORTING);
include_once('../_d_/cfg/edes.ini');
error_reporting(5);
if( !empty($_AddCreateEDF) ) $_AddCreateEDF .= "\n";
$xFicheroD = str_replace('.tbl','',str_replace('../d/','',$FicheroD));
$_DimEDF = CreaFCH($_Sql, $_SqlPDOType, $_AddCreateEDF, $xFicheroD, $Opcion);
$_ModCampoIndice = true;
}else{
$_DimEDF = @OpenDF($FicheroD);
}
$_gsCreate_ = false;
}
$_FileDF = $OriFichero;
$_gsCreate_ = (eSubstrCount($_SERVER["SCRIPT_NAME"], '/edes.v3/http/edes.php')>0 );
if( file_exists(eScript("{$_FileDF}.lng")) ){
eLngLoad(eScript("{$_FileDF}.lng"), '', 2);
}
if( $Opcion=='cR' && isset($_STOP) && $_STOP ) $_NOBUTTON = true;
$_URL_IN_MENU = eGetOpcions();
$OpcionFields = $Opcion;
if( eSubstrCount(',A,B,M,', ",{$Opcion},")==1 ){
$OpcionFields = mb_strtolower($Opcion[0])."R";
}
$DimOpcion = array($Opcion,'*');
if( eSubstrCount(',c,b,m,l,q,s,', ",{$Opcion},")>0 ) array_push($DimOpcion, '?');
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
if( !empty(SESS::$_TreeList) ){
$tmp = explode(',',SESS::$_TreeList);
for($n=0; $n<count($tmp); $n++) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( !empty(SESS::$_Development) ) array_push($DimOpcion, 'd');
if( SESS::$_WebMaster==$_ENV['ON']  ) array_push($DimOpcion, 'w');
if(	SESS::$_SystemUser==$_ENV['ON'] ) array_push($DimOpcion, 'S');
if( !empty(SESS::$_D_) ) array_push($DimOpcion, 'D');
$_ePermission = $DimOpcion;
if( $_Mode=='cR' && isset($_GET['_COUNT']) ) $_COUNT = '';
include(DIREDES."parse_begin.php");
$NomFileBAK = $NomFile;
$_CallLabel = '';
$ElPuntoEsRem = true;
$sElPuntoEsRem = true;
$OriginalOpcion = $Opcion;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
if( !empty($_CallLabel) && $Chr_1!='[' ){
call_user_func("eCall_".$_CallLabel, true, $buffer);
continue;
}
$_CallLabel = '';
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('f_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
$nDimFCH--;
$buffer = '';
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
$tmp = mb_substr($buffer,$p,mb_strpos($buffer, '}')-$p+1);
$index = mb_substr($tmp,2,-1);
if( !empty($GLOBALS[$index]) ){
$buffer = str_replace($tmp,$GLOBALS[$index],$buffer);
}else{
$buffer = str_replace($tmp, SESS::${$index},$buffer);
}
}
list($cModo, $DirFile) = explode(')',eNsp($buffer));
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
for($i=$n; $i<count($iDimEDF); $i++) $iDimEDF[$i] = '';
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
$ElPuntoEsRem = true;
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('f_phpstart-'.$_FileDF, $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
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
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval($tmp[1], $buffer, 1);
break;
case 'DEBUG':
if( $OkModo ) _Debug($tmp);
break;
case 'PHPSESSION':
if( $_Mode=='c' || $_Mode=='b' || $_Mode=='m' || $_Mode=='a' ) break;
if( !empty($tmp[1]) ) $_PHPSESSIONMSG = $tmp[1];
$tmp2 = explode(',', eNsp($tmp[0]));
for($n=0; $n<count($tmp2); $n++){
list($vCkeck, $vSession) = explode('=',$tmp2[$n]);
if( SESS::${$vSession}<>'' ) $_PHPSESSION[$vCkeck] = SESS::${$vSession};
}
break;
case 'ITOOLS':
if( !$OkModo ) break;
array_shift($tmp);
$_iToolsAdd = implode('|', $tmp);
break;
case 'DBLIMIT':
list($L, $XP, $PP) = explode(',', str_replace('.','',$tmp[0]).',,');
if( $L<0 ){
$L = $XP;
$XP = '';
$PP = '';
}
$_DBLIMIT = (int)$L;
if( !empty($XP) ) $_MAXREC = (int)$XP;
if( !empty($PP) ){
$_MinPaginar = (int)$PP;
}else{
$_MinPaginar = (int)$XP*2;
}
break;
case 'TITLE':
for($n=1; $n<3; $n++){
if( !empty($tmp[$n]) ){
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
$_LOGREQUEST["title"] = $_TITLE;
if( mb_strtoupper($_TITLE)=='NOTITLE' ){
$_TITLE = '';
if( isset($_PSOURCE) && $_PSOURCE!='WWORK' ) $_NOTITLE = true;
}else if( $_PSOURCE!='WWORK' && mb_strtoupper($tmp[3])=='NOTITLE' ){
$_WINCAPTION = '#';
}
break;
case 'TITLEICON':
if( $OkModo ){
$tmp[1] = _InVar($tmp[1], $no, true);
if( !empty($tmp[2]) && $tmp[2]!='mark' && eSubstrCount($tmp[2],$_PSOURCE)==0 && mb_strtoupper($tmp[2])!='ELSE' ) break;
if( mb_strlen($tmp[1])<=4 ){
$tmp[1] = mb_strtoupper($tmp[1]);
if( $tmp[1]=='*' ) $tmp[1] = 'HPVC';
$txt = "";
if( $tmp[3]=="" ){
$hMode = _ModeHelp($tmp[0]);
$txt = " iMark='{$tmp[2]}' iHelp='TITLEICON' iMode='{$hMode}' iType='{$tmp[1]}'";
if( !empty($tmp[2]) ) $tmp[2] = ".".$tmp[2];
$tmp[3] = str_replace("/", "_", $OriFichero).".".$hMode.$tmp[2];
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
$_TITLEICON[] = "<i class='ICONTITLE'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick='{$click}' title='Ayuda' style='cursor:var(--cPointer)'>@</i>";
break;
}
$img = "<i class='ICONTITLE' iHelp='TITLEICON' title='Ayuda' style='cursor:var(--cPointer)'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick=\"";
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
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
eMultitenancy($tmp[0]);
$_sDBTABLE = $tmp[0];
if( isset($tmp[1]) ) $_ISUBLISTSUFIJO = $tmp[1];
case 'DBORDER':
case 'WINTITLE':
case 'DBLIMIT':
case 'COUNT':
case 'DBADDFILTER':
case 'CLEARTOCOUNT':
case 'WINTITLE':
${$Comando} = $tmp[0];
break;
case 'FORMBUTTONS':
${$Comando} = $tmp[0];
if( !empty($tmp[1]) ) $_FORMBUTTONSDELETE = $tmp[1];
break;
case 'HELPHTML':
$_HELPHTML[$tmp[0]] = "";
$_PntHelpHTM = &$_HELPHTML[$tmp[0]];
$TipoEntrada = "_PntHelpHTM";
break;
case 'HELPMARKDOWN':
$_HELPMARK[$tmp[0]] = "";
$_PntHelpMARK = &$_HELPMARK[$tmp[0]];
$TipoEntrada = "_PntHelpMARK";
break;
case 'DBSEQUENCE':
case 'PERSISTENTVAR':
${$Comando} = eNsp($tmp[0]);
break;
case 'DBBAKDELETE':
$_DBBakDeleteUpdate = $tmp[0];
case 'NOJS':
case 'STOP':
case 'REQFILTER':
${$Comando} = true;
break;
case 'DBRLOCK':
if( !empty($tmp[0]) && mb_strtoupper($tmp[0])=="NO" ){
${$Comando} = false;
}else{
${$Comando} = true;
if( !empty($tmp[0]) ) $_DBRLOCKNOFIELD = ','.eNsp($tmp[0]).',';
}
break;
case 'WINCLOSE':
if( !empty($tmp[0]) && eSubstrCount($tmp[0], $_PSOURCE)==0 ) break;
${$Comando} = true;
break;
case 'FORMSTATIC':
if( count($tmp)>1 ){
$_ChildrenData = $tmp;
}else{
$_FORMSTATIC = true;
}
break;
case 'ASSIGN':
if( $OkModo && !empty($tmp[1]) ){
$tmp = explode(',', $tmp[1]);
for($i=0; $i<count($tmp); $i++) $_ASSIGNFIELD[trim($tmp[$i])] = true;
}else{
${$Comando} = $OkModo;
}
break;
case 'NOEDIT':
if( !$OkModo ) break;
$tmp1 = explode(',', $tmp[1]);
for($n=0; $n<count($tmp1); $n++) $_NOEDIT[trim($tmp1[$n])] = 1;
break;
case 'NOEDITFILLED':
${$Comando} = $OkModo;
if( $OkModo && mb_strtoupper($tmp[1])=='SESSION' ){
$_NOEDITFILLEDSESSION = true;
$_NOEDITFILLED = false;
}
if( !empty($tmp[2]) ){
if( empty($tmp[1]) ) $_NOEDITFILLED = false;
$tmp1 = explode(',', eNsp($tmp[2]));
for($n=0; $n<count($tmp1); $n++) $_NOEDITFILLEDFIELD[trim($tmp1[$n])] = 1;
}
break;
case 'NOBUTTON':
if( empty($tmp[0]) ) $OkModo = true;
if( !empty($tmp[1]) && mb_strtoupper($tmp[1])=="OFF" ) $_NOBUTTONCLOSE = true;
case 'SAVETRACE':
${$Comando} = $OkModo;
break;
case 'EXPORT':
case 'FORMCHECK':
$TipoEntrada = $Comando;
break;
case 'JPCHECK':
$xOp = str_replace("R","",mb_strtoupper($Opcion));
$xLab = str_replace("R","",mb_strtoupper($tmp[0]));
if( !in_array($Opcion, explode(",","m,b,c")) && eOkMode($xOp, $xLab) ){
$NoExePHPInterno = false;
$TipoEntrada = $Comando;
if( !empty($tmp[1]) ) $_CHECKSESSION = explode("," ,eNsp($tmp[1]));
}
break;
case 'DBEND':
if( $Opcion=='M' && !empty($tmp[2]) ) $_LastValue = $tmp[2];
$tmp[2] = "";
case 'JSCHECK':
if( $Etiqueta=='JSCHECK' && !empty($tmp[2]) ) $_xMarkFieldRequired = $tmp[2];
case 'DBINI':
case 'DBINSERT':
case 'DBREAD':
case 'DBSELREC':
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
case 'OPTIONS':
if( !empty($tmp[2]) && mb_strtoupper($tmp[2])!='UNIQUE' && $Comando!="JSONCLICKROW" && $Comando!="DBEND" ){
if( $tmp[2][0]=="#" ){
if( !$_Variable[$tmp[2]] ) break;
}else{
if( !eval("return {$tmp[2]};") ) break;
}
}
if( !empty($tmp[1]) && eSubstrCount($tmp[1],$_PSOURCE)==0 && !(empty(${$Comando}) && mb_strtoupper($tmp[1])=='ELSE') ) break;
$TipoEntrada = (($OkModo) ? $Comando : '#');
$JsHtm = ($Etiqueta[0]=='J' || $Etiqueta[0]=='H');
if( $OkModo && !empty($tmp[2]) && mb_strtoupper($tmp[2])=='UNIQUE' ){
$NewVar = '_FILE'.$Comando;
if( $GLOBALS[$NewVar]==$Comando.'_'.$nDimFCH.'_'.$_User ){
$TipoEntrada = '#';
}else{
$GLOBALS[$NewVar] = $Comando.'_'.$nDimFCH.'_'.$_User;
}
}
break;
case 'FORMACTION':
if( !$OkModo ) break;
$_RoyalMode = $Opcion;
if( mb_strtoupper($tmp[1])=='SUBLIST' ){
$_SUBLISTACTION = true;
}else if( mb_strtoupper($tmp[1])=='NOSUBLIST' ){
$_NOSUBLIST = true;
}else{
${$Comando} = str_replace("'",'"',$tmp[1]);
$_FORMBUTTONS = '';
}
if( mb_strtoupper($tmp[2])=='ANACTION' ) $_ANACTION = true;
break;
case 'OPTIONSINLIST':
$_OptionsInListOn = true;
break;
case 'ONLOAD':
$tmp[1] .= ";";
case 'DBGATEWAY':
case 'SAVEFORM':
case 'EXTFORM':
case 'WINTOOLS':
case 'ADDICON':
if( $OkModo ) ${$Comando} = $tmp[1];
break;
case 'AUTOMENU':
if( $OkModo && !SETUP::$Desktop['MenuAutoHidden'] ) ${$Comando} = (!empty($tmp[1])) ? $tmp[1] : 1;
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
if( !empty($txt) ){
if( !empty($fiWhere) ) $fiWhere .= " and ";
$fiWhere .= $txt;
}
}
if( !empty($fiWhere) ) $fiWhere = " where ".$fiWhere;
$_DBFILTERIN = " {$fiField} in (select {$fiField} from {$fiTabla} {$fiWhere})";
break;
case 'ONCHANGE':
case 'ADDBUTTON':
case 'ADDCODE':
case 'ADDOPTION':
case 'DELOPTION':
case 'ICON':
case 'RELATIONFIELDS':
case 'SHOWFIELDS':
case 'WHERESELECT':
case 'SANITIZE':
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
case 'DBGATEWAYONE':
if( !$OkModo ) break;
if( $tmp[1]=="" ){
$_CallLabel = "DBGATEWAYONE";
$_DBGATEWAYONE = array();
}else{
${$Comando} = $tmp[1];
}
break;
case 'JSGATEWAYONE':
if( !$OkModo ) break;
$_CallLabel = "JSGATEWAYONE";
$_JSGATEWAYONE = array();
break;
case 'MSGSUBMIT':
if( !$OkModo ) break;
if( $tmp[1][0]=='>' ){
$tmp[1] = trim(mb_substr($tmp[1],1));
if( mb_substr($tmp[1],-4)=='.LNG' ) $tmp[1] = mb_substr($tmp[1],0,-3).SESS::$_LANGUAGE_;
$sFile = str_replace('\\','/',$Fichero);
if( $tmp[1][0]=='*' ) $tmp[1] = mb_substr($sFile,0,-3).mb_substr($tmp[1],2);
$tmp[1] = file_get_contents(eScript($tmp[1]));
if( trim($tmp[1])=="" ){
$tmp[1] = file_get_contents(eScript(mb_substr($tmp[1],0,-2).SESS::$_LanguageDefault));
$tmp[1] = str_replace("{COMPANY}", eFileGetVar("System.Company"), $tmp[1]);
}
$tmp[1] = str_replace(CHR10, '<br>', str_replace(CHR13, '', $tmp[1]));
}
$_MSGSUBMIT = array($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
break;
case 'CSSADD':
$ElPuntoEsRem = false;
$sElPuntoEsRem = false;
if( $OkModo && !empty($tmp[2]) ){
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
if( !$OkModo ) break;
if( $tmp[1]=="" && $Comando=='_CSSADD' ){
if( $_CSSADD=="" ) $_CSSADD = ">";
$TipoEntrada = $Comando;
$JsHtm = false;
}else{
if( $tmp[1]=='/' ) $tmp[1] = str_replace('/','_',mb_substr($FicheroD,0,mb_strrpos($FicheroD,'/')));
$_CSSADDFILE = $tmp[1];
}
if( $Etiqueta=="CSS" ) $_CSSNO = true;
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', eNsp($tmp[0]).';;');
if( $Opcion=='mR' || $Opcion=='M' ){
$_ModCampoIndice = (mb_strtoupper($tmp[1])=='EDIT');
if( $_ModCampoIndice && eSubstrCount($_DBINDEX, ',')>0 ) eMessage(str_replace('#','Edit',$__Lng[57]),'EHS');
}
if( !empty($tmp[4]) && eSubstrCount($tmp[4],'\\')>0 ) $tmp[4] = str_replace( CHR92, CHR92.CHR92, $tmp[4] );
if( ($Opcion=='a' || $Opcion=='mR') && !empty($tmp[2]) && mb_strtoupper($tmp[2][0])=='T' ){
$_CheckDBIndex = eNsp($tmp[0]).'|'.eNsp($tmp[3]).'|'.$tmp[4];
if( !empty($tmp[6]) ) $_CheckDBIndexDB = $tmp[6];
}
if( ($Opcion=='a' || $Opcion=='mR') && !empty($tmp[5]) ) $_CheckDBIndexFunc = $tmp[5];
break;
case 'DBINSERTONLY';
if( count($_DBSERIAL)>0 ) $_DBINSERTONLY = true;
break;
case 'CARD':
if( !$OkModo ) break;
$_CARDWIDTH = [];
for($n=1; $n<count($tmp); $n++){
if( preg_match('/^default$/iu', $tmp[$n]) ){
$tmp[$n] = SETUP::$Tab['CardDefault'];
}
$unique = false;
if( preg_match('/u/iu', $tmp[$n]) ){
$tmp[$n] = preg_replace('/u/i', '', $tmp[$n]);
$unique = true;
}
$tmp2 = explode(',', eNsp($tmp[$n]));
if( count($tmp2)==1 ) $tmp2 = array('',$tmp2[0],'');
for($i=0; $i<count($tmp2); $i++){
if( preg_match('/%/u', $tmp2[$i]) ){
$tmp2[$i] = str_replace('%', '', $tmp2[$i]);
}
if( preg_match('/px$/iu', $tmp2[$i]) ){
$tmp2[$i] *= 1;
}else if( preg_match('/c$/iu', $tmp2[$i]) ){
$tmp2[$i] = $tmp2[$i]*1*$_DefaultSize['TT']['uM'];
}
}
if( $tmp2[0]=='' || $tmp2[1]=='' ) eMessage('ERROR en la definición:<br>'.$buffer, 'HSE');
if( !isset($tmp2[2]) ) $tmp2[2] = '';
$tmp2[3] = ($unique ? 1:0);
$_CARDWIDTH[] = $tmp2;
}
$_CARDSHOW = true;
break;
case 'FIELDS':
if( count($_Form)>0 ) break;
if( empty($tmp[0]) ){
}else if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( $tmp[0][0]=='$' ){
if( _ExeEval($tmp[0], $buffer) ){
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
if( mb_strtoupper($tmp[0])=='ELSE' && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( mb_ord($tmp[1][0])>48 && mb_ord($tmp[1][0])<58 ){
$_TCol = $tmp[1]*1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[1]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( mb_strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
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
case 'FORMWIDTHS':
break;
case 'DEFAULTVAL':
if( $OkModo ) $_DEFAULTVAL[$tmp[1]] = $tmp[2];
break;
case 'GESAUX':
if( $OkModo && eSubstrCount(",a,mR,", ",{$_Mode},")==1 ) $_GESAUX[$tmp[1]] = array($tmp[2], $tmp[3]);
break;
case 'CHECKLIST':
$_CHECKLIST[$tmp[0]] = array( $tmp[1], $tmp[2], mb_strtoupper($tmp[3]), $tmp[4], $tmp[5], $tmp[6], $tmp[7], mb_strtoupper($tmp[8]) );
break;
case 'RADIOLIST':
$_RADIOLIST[$tmp[0]] = array( $tmp[1], $tmp[2], mb_strtoupper($tmp[3]), $tmp[4] );
break;
case 'DBVIEW':
$_DBVIEW = explode(',', eNsp($tmp[0]));
break;
case 'SUBSELECTMEMORY':
$tmp = explode(',',eNsp($tmp[0]));
for($i=0; $i<count($tmp); $i++) $_SUBSELECTMEMORY[$tmp[$i]] = true;
break;
case 'RELATIONSUBLIST':
$tmp[0] = eNsp($tmp[0]);
$tmp2 = explode(',',$tmp[0]);
$_RELATIONSUBLIST[$tmp2[1]] = str_replace(" ","",$tmp2);
$_RELATIONSUBLISTFUNC[$tmp2[0]] = $tmp[1];
break;
case 'SUBWIN':
$tmp = explode(']', $buffer);
$tmp = explode('|', $tmp[1]);
$tmp[1] = trim($tmp[1]);
if( eOkMode($Opcion, trim($tmp[0])) ){
if( !in_array($tmp[1], $_SubVentana) ) array_push($_SubVentana, $tmp[1]);
}
break;
case 'MSGANSWER':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
break;
case 'BUTTON':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2], mb_strtoupper($tmp[3]));
break;
case 'DBSERIAL':
$_DBSERIAL = array($_DBTABLE, $tmp[0], '');
if( !empty($tmp[1]) ) $_DBSEQUENCE = $tmp[1];
if( empty($_DBINDEX) ) $_DBINDEX = $tmp[0];
break;
case 'DELFILTER':
if( $OkModo ){
$_DELFILTER = array($tmp[1], explode(',', $tmp[2]), $tmp[3], $tmp[4], $tmp[5], $tmp[6]);
$_TitleDelFilter = $tmp[3];
}
break;
case 'JSDIM':
if( $OkModo ) $_JSDIM[] = array($tmp[1], $tmp[2], $tmp[3]);
break;
case 'WINFORM':
$_WINFORM = explode(',', $tmp[0]);
for($i=0; $i<count($_WINFORM); $i++) $_WINFORM[$i] = trim($_WINFORM[$i]);
if( !empty($_WINFORM[3]) ) $_WINTITLE = $_WINFORM[3];
break;
case 'LOCALSELECT':
$tmp = explode(',', $tmp[0]);
for($n=0; $n<count($tmp); $n++){
$Elemento = explode('=', $tmp[$n]);
$_LOCALSELECT[trim($Elemento[0])] = trim($Elemento[1]);
}
break;
case 'ADDOPTIONVALUE':
$_ADDOPTIONVALUE[$tmp[0]] = $tmp[1];
if( !empty($tmp[2]) ) $_ADDOPTIONIMG[$tmp[0]] = $tmp[2];
if( !empty($tmp[3]) ) $_ADDOPTIONCOLLABEL[$tmp[0]] = $tmp[3];
break;
case 'SELECTCOLLABEL':
$tmp2 = explode(",", eNsp($tmp[0]));
$_ADDOPTIONVALUE[$tmp2[1]] = $tmp[1];
$_ADDOPTIONCOLLABEL[$tmp2[1]] = '$'.$tmp2[0].'=="'.$tmp[2].'"';
break;
case 'SELECTMULTIPLE':
if( !$OkModo ) break;
if( preg_match('/BOX$/u', $tmp[2]) ){
$_SELECTMULTIPLEBOX[$tmp[1]] = 1;
$tmp[2] = trim(preg_replace('/BOX/i', '$1', $tmp[2]));
}else{
if( !empty($tmp[5]) ) $GLOBALS['_SELECTMULTIPLEHEIGHT'][$tmp[1]] = $tmp[5];
}
if( preg_match('/,/u', $tmp[2]) ){
$_SELECTMULTIPLEMAX[$tmp[1]] = trim(explode(",",$tmp[2])[1]);
$tmp[2] = trim(explode(",",$tmp[2])[0]);
}
$_SELECTMULTIPLE[$tmp[1]] = (($tmp[2]<>"")? $tmp[2] : 20);
if( !empty($tmp[3]) ) $_ADDOPTION[$tmp[1]] = $tmp[3];
if( mb_strtoupper($tmp[4])=='TRUE' || $tmp[4]=='1' ) $_SELECTMULTIPLESORT[$tmp[1]] = true;
break;
case 'JSINCLUDE':
if( !$OkModo ) break;
$tmp1 = explode(',', eNsp(mb_strtolower($tmp[1])));
for($n=0; $n<count($tmp1); $n++) $_JSINCLUDE[$tmp1[$n]] = 1;
break;
case 'UPLOADFILE':
$tmp[1] = _InVar($tmp[1]);
if( gettype($_Fichero)=="NULL" ) $_Fichero = array();
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' ) $_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' && $_Objeto['['.$uNomFile.']']['SUBDIR']<>'' ){
$_UPLOADFILE[$uNomFile]['oDIR'] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
$tmp[1] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
}
if( $tmp[1]<>"" ) $tmp[1] = eScript($tmp[1]);
if( $_UPLOADFILE[$uNomFile]['DIR']=='' ) $_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = str_replace('.','',str_replace(',','',$tmp[3]));
if( $_UPLOADFILE[$uNomFile]['BYTS']<0 ) $_UPLOADFILE[$uNomFile]['BYTS'] = $_UPLOADFILE[$uNomFile]['BYTS']*-1;
$_UPLOADFILE[$uNomFile]['TITLE'] = (($tmp[4]=='') ? '' : $tmp[4] );
if( empty($tmp[5]) || $tmp[5]=='*.*' ) $tmp[5] = '*';
if( !empty($tmp[5]) ) $_UPLOADFILE[$uNomFile]['EXT'] = eNsp($tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$uNomFile]['TAMAÑOS'] = $tmp[7];
$_UPLOADFILE[$uNomFile]['PREFIJOS'] = $tmp[8];
if( !empty($tmp[9]) ){
if( mb_substr($tmp[9],-1)=='/' ) $tmp[9] = mb_substr($tmp[9],0,-1);
$_UPLOADFILE[$uNomFile]['COPY'] = eScript($tmp[9]);
}
$_UPLOADFILE[$_sDBTABLE.".".$uNomFile] = $_UPLOADFILE[$uNomFile];
break;
case 'FILEMULTIPLE':
if( $Opcion=="a" ){
$_FILEMULTIPLE = $tmp;
$_FORMSTATIC = true;
}else if( $Opcion=="A" ){
$_FORMSTATIC = true;
}
break;
case 'FILELOG':
$buffer = _InVar(eNsp($_DimEDF[$nDimFCH]));
$tmp = explode(",", $buffer);
list(,$tmp[0]) = explode("]",$tmp[0]);
if( count($tmp)<5 ) $tmp[4] = -1;
$tmp[4] *= 1;
$_FILELOG[$tmp[0]] = 1;
$_FILELOG[$tmp[0].".".$tmp[1]] = $tmp;
break;
case 'DBJOINTABLE':
$tmp[0] = str_replace(' =','=',$tmp[0]);
$tmp[0] = str_replace('= ','=',$tmp[0]);
$tmp1 = explode(',', $tmp[1]);
for($n=0; $n<count($tmp1); $n++){
array_push($_DBJOINTABLE, array(trim($tmp1[$n]), $tmp[0]));
}
break;
case 'DBADDFIELDS':
if( eSubstrCount($tmp[1], '{')>0 ){
$tmp[1] = str_replace('"',"'",$tmp[1]);
$tmp[1] = str_replace('}',']}',$tmp[1]);
$tmp[1] = str_replace('{','{$_Fila[',$tmp[1]);
}
$_DBADDFIELDS[] = array($tmp[0], $tmp[1]);
break;
case 'DBADDSQL':
$_DBADDSQL[] = $tmp[0];
break;
case 'DBLOG':
if( preg_match('/^FULL$/iu',$tmp[0]) ){
$_LOGREQUEST = array("object"=>$_Object, "mode"=>$_Mode, "script"=>$_DF, "get"=>$_GET, "post"=>$_POST);
$_LOGFULLSTATUS = true;
$_LOGFULLTYPE = 2;
break;
}
$_DBLOG = explode(',', $tmp[0]);
$_DBLOGTXT = $tmp[0];
$_DBLOGINCLUDE = $tmp[1];
$_DBLOGTABLE = $tmp[2];
break;
case 'TXTLOG':
if( $OkModo ) $_TXTLOG = array($tmp[1],$tmp[2],$tmp[3]);
break;
case 'DBMEMO':
$tmp = explode(',', $tmp[0]);
for($n=0; $n<count($tmp); $n++) $_DBMEMO[trim($tmp[$n])] = true;
break;
case 'TDSTYLE':
if( !$OkModo ) break;
$tmp2 = explode(',', eNsp($tmp[1]));
for($n=0; $n<count($tmp2); $n++) $_TDSTYLE[$tmp2[$n]] = $tmp[2];
break;
case 'FIELDBROWSER':// [FieldBrowser] Field | ListFieldsAsign | SQL/Function | NRowsVisible | NColsVisible | Parametros,...  /   [FieldBrowser] nm_persona | dni | select nm_persona,dni from persona where nm_persona like # order by 1 | OnChange | 10 .... | FiltroAdicionalYDinamico
eExplodeOne($buffer, "]", $iz, $dch);
$dch = str_replace('||', '{#~#}', $dch);
$tmp = explode("|", $dch);
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
$tmp[2] = str_replace('{#~#}', '||', $tmp[2]);
$stmp = array($tmp[0], $tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5], microtime(true));
$stmp[2] = str_replace("'", '&#39;', _InVar($stmp[2]));
$_FIELDBROWSER[$tmp[0]] = $stmp;
file_put_contents("../_tmp/php/{$_ENV['user']}_{$stmp[6]}.sql", $stmp[2]);
break;
case 'DB':
break;
case 'EXPIRE':
$_EXPIRE = (($tmp[0]=='') ? 0 : $tmp[0]);
set_time_limit($_EXPIRE);
break;
case 'NOABORT':
ignore_user_abort(0);
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
unset(SESS::$_SELINO[$tmp[1]]);
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
if( preg_match("/( TAB | T )/iu", $tmp[4]) ) $GLOBALS["_SELINFOMODE"][$tmp[1]] = "B";
if( preg_match("/( LIST | L )/iu", $tmp[4]) ) $GLOBALS["_SELINFOMODE"][$tmp[1]] = "b";
if( preg_match("/( NOEVENT )/iu", $tmp[4]) ) $_SELINFONOEVENT[$tmp[1]]=',1';
}
$_SELINFO[$tmp[1]] = str_replace("''", "", $_SELINFO[$tmp[1]]);
break;
case 'TIPFORM':
if( !$OkModo || in_array($tmp[0], ['A','B','M']) || isset($_GET['_IMPORT']) ) break;
$tmp[1] = mb_strtoupper($tmp[1]);
$tmp2 = explode(",", eNsp($tmp[2]));
for($n=0; $n<count($tmp2); $n++){
$campo = $tmp2[$n];
if( !empty($tmp[3]) ){
$_TIPFORM[$campo]['S'] = 'L';
$buffer = $tmp[3];
}else{
$_TIPFORM[$campo]['S'] = 'W';
$buffer = '';
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
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
if( $tmp[1]=='*' || $tmp[1]=='' ) $_TIPFORM[$campo]['L'] = $_TIPFORM[$campo]['F'] = $buffer;
else $_TIPFORM[$campo][$tmp[1]] = $buffer;
if( $tmp[1]=='E' ) $_TIPFORM[$campo]['M'] = _ModeHelp($tmp[0]);
if( !empty($tmp[4]) ) $_TIPFORM[$campo]['W'] = $tmp[4];
if( !empty($tmp[5]) ) $_TIPFORM[$campo]['T'] = $tmp[5]*1000;
}
break;
case 'CHR':
$_CHR[] = $tmp;
$_CHR[$tmp[0]] = $tmp;
break;
case 'GPFIELDS':
if( SESS::$_Development || !empty(SESS::$_D_) ) $_GPFIELDS[$tmp[0]] = $tmp[1];
break;
case 'HEADER':
header($tmp[0]);
break;
case 'SESSIONVAR':
if( eSubstrCount(',cR,mR,M,', ",{$Opcion},")>0 ){
$_VarSesion = true;
$_STOP = true;
if( $Opcion=='cR' ) $_NOBUTTON = true;
}
break;
case 'FILEVAR':
if( eSubstrCount(',cR,mR,M,', ",{$Opcion}," )>0 ){
$_VarFile = $tmp[0];
$_STOP = true;
if( $Opcion=='cR' ) $_NOBUTTON = true;
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
case 'DEFAUX':
$_DEFAUX[$tmp[0]] = $tmp[1];
break;
case 'RADIO':
$tmp[1] = str_replace('L','E',mb_strtoupper($tmp[1]));
$_RADIO[$tmp[0]]['C'] = $tmp[1];
$_RADIO[$tmp[0]]['D'] = $tmp[2];
if( count($tmp)>=4 ) $_RADIO[$tmp[0]]['T'] = $tmp[3];
if( count($tmp)>=5 ) $_RADIO[$tmp[0]]['A'] = $tmp[4];
if( count($tmp)>=6 ) $_RADIO[$tmp[0]]['DEL'] = (mb_strtoupper($tmp[5])=='TRUE');
break;
case 'SUBLIST':
if( ($OkModo || eSubstrCount('ABM',$Opcion)>0) && eSubstrCount('bcm',$Opcion)==0 ){
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
case 'SUBLISTDF':
for($i=0; $i<count($tmp); $i++) $_SUBLISTDF[$i] = $tmp[$i];
if( eSubstrCount($_SUBLISTDF[1], '.')==0 ) $_SUBLISTDF[1] .= '.edf';
$_SUBLISTDF[1] = eScript($_SUBLISTDF[1]);
break;
case 'MSGTIME':
list($_MSGTIME[0], $_MSGTIME[1]) = explode(',', $tmp[0]);
break;
case 'FIELDSET':
if( !$OkModo ) break;
$tmp = explode(',', $tmp[1]);
for($i=0; $i<4; $i++) $tmp[$i] = trim($tmp[$i]);
$_FIELDSET[$tmp[0]]['I'] = $_FIELDSET[$tmp[1]]['F'] = true;
$_FIELDSET[$tmp[0]]['T'] = $tmp[2];
$_FIELDSET[$tmp[0]]['S'] = $tmp[3];
break;
case 'SKIPTD':
if( !$OkModo ) break;
$tmp = explode(',', $tmp[1]);
for($i=0; $i<count($tmp); $i++) $_SKIPTD[trim($tmp[$i])] = true;
break;
case 'BCP':
if( !$OkModo ) break;
$tmp2 = explode(',', $tmp[2]);
for($n=0; $n<count($tmp2); $n++) $_BCP[ trim($tmp2[$n]) ] = eNsp($tmp[1]);
break;
case 'FORUSERS':
if( !$OkModo ) break;
if( $tmp[2]=='' ) $tmp[2] = 'ACCESO DENEGADO';
if( eSubstrCount(eNsp($tmp[1]), 'selectcount(*)')==1 ){
$OkModo = _ExeEval($tmp[1], $buffer);
if( $OkModo!=1 ) eMessage($tmp[2], 'HS');
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
break;
case 'WINSEL':
if( !$OkModo ) break;
$tmp = explode(',', $tmp[1]);
for($i=0; $i<count($tmp); $i++) $_SKIPTD[trim($tmp[$i])] = true;
break;
case 'PDFFORM':
$PDF_Formato = 'F';
break;
case 'PDFLIST':
$PDF_Formato = 'L';
break;
case 'H':
case 'J':
case 'P':
$_NombreInclude = $tmp[0];
$TipoEntrada = 'Inc'.$Etiqueta;
break;
case 'ERRORLABEL':
for($i=0; $i<count($tmp); $i++){
$sTmp = explode('=', $tmp[$i]);
$_Etiqueta[trim($sTmp[1])] = trim($sTmp[0]);
}
break;
case 'HELP':
if( !$OkModo ) break;
if( $tmp[1]=='' ) $tmp[1] = mb_strtolower( "{$OriFichero}_{$_Modo}" );
$tmp[1] = str_replace('#',$_Modo,$tmp[1]);
$_HELP = 'top.gsHelp("'.eStrtr( $tmp[1], array('/'=>'_','\\'=>'_',' '=>'_')).'",event);';
break;
case 'NOTE':
break 3;
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
case 'DBRANGE':
if( eSubstrCount(",c,m,b,", ",{$Opcion},")>0 ){
$_DBRANGE[] = $tmp[2];
$_DBRANGE[] = $tmp[3];
$_DBRANGEADD[$tmp[1]] = 1;
$_DBRANGEDUO[$tmp[2]] = $tmp[3];
$_DBRANGEDUO[$tmp[3]] = $tmp[2];
$_ADDCODE[$tmp[2]]['I'] .= ' noConditions'.(($tmp[5]=="=" || $tmp[5]=="true")?' copyValue':'');
$_ADDCODE[$tmp[3]]['I'] .= ' noConditions';
$_ADDCODE[$tmp[6]]['I'] .= " eCalculateAge='{$tmp[1]},{$tmp[2]},{$tmp[3]},{$tmp[6]}'";
}else if( eSubstrCount(",cR,mR,bR,", ",{$Opcion},")>0 ){
$DimDBRange[] = array($tmp[1], $_POST[$tmp[2]], $_POST[$tmp[3]], $tmp[4], $tmp[2], $tmp[3]);
if( isset($tmp[6]) ){
$n = count($DimDBRange)-1;
array_push($DimDBRange[$n], $tmp[6]);
if( isset($_POST[$tmp[6]]) ){
array_push($DimDBRange[$n], $_POST[$tmp[6]]);
}
}
$_DBRANGEADD[$tmp[1]] = 1;
}
break;
case 'DBTABLERELATION':
if( eSubstrCount(',a,A,', ",{$Opcion},")==0 ) $_DBTABLERELATION[] = array($tmp[0], $tmp[1], $tmp[2]);
break;
case 'JUMP':
$Fichero = $tmp[0];
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
$tmp = explode('.',$Fichero); $tmp = $tmp[count($tmp)-1];
if( eSubstrCount(',edf,gdf,ldf,fdf',",{$tmp},")>0 ){
$_DimEDF = @OpenDF($FicheroD);
}else{
eInit();
include($FicheroD);
eEnd();
}
$nDimFCH = -1;
continue;
case 'PDFLABEL':
$_PDFLABEL = true;
$_PDFLABELCF = explode(',', $tmp[4]);
break;
case 'REMOTESRV':
include($Dir_.'remotesrv.inc');
eEnd();
case 'JSSELROW':
if( $Opcion=='c' || $Opcion=='b' || $Opcion=='m' ){
if( !empty($tmp[1]) && eSubstrCount($tmp[1],$_PSOURCE)==0 && !(empty($_JSSELROW) && mb_strtoupper($tmp[1])=='ELSE') ){
break;
}
$_NOSUBLIST = true;
}
break;
case 'FIELDSPAN':
if( !empty($tmp[1]) ){
$tmp1 = explode(',',eNsp($tmp[1]));
for($n=0; $n<count($tmp1); $n++) $_FIELDSPAN['C'][$tmp1[$n]] = ' colspan='.$tmp[0];
}
if( !empty($tmp[2]) ){
$tmp1 = explode(',',eNsp($tmp[3]));
for($n=0; $n<count($tmp1); $n++) $_FIELDSPAN['R'][$tmp1[$n]] = ' rowspan='.$tmp[2];
}
if( !empty($tmp[4]) ){
$tmp1 = explode(',',eNsp($tmp[4]));
for($n=0; $n<count($tmp1); $n++) $_FIELDSPAN['S'][$tmp1[$n]] = true;
}
break;
case 'LANGUAGE':
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
$tmp2 = explode(',', trim(eNsp($tmp[0])));
for($n=0; $n<count($tmp2); $n++){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad('../_datos/config/language.lng', '', 2);
break;
case 'SELECTTREE':
if( !$OkModo ) return;
$Ind = $tmp[1];
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = trim($_DimEDF[$i]);
if( !@LeeDF( $buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line ) ) continue;
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
case 'SETVAR':
list($k, $v) = explode('=',$tmp[0]);
$v = trim($v);
if( mb_substr($v,-1)==';' ) $v = mb_substr($v,0,-1);
if( $v[0]==mb_substr($v,-1) && ($v[0]=='"' || $v[0]=="'") ) $v = mb_substr($v,1,-1);
if( $k[0]=='$' ) $k = mb_substr($k,1);
$GLOBALS[trim($k)] = ((eSubstrCount($v,',')>0) ? explode(',',$v) : $v);
break;
case 'ADDTOOLS':
if( !$OkModo ) break;
if( mb_strtoupper($tmp[2])=='ECOLORSELECT' || mb_strtoupper($tmp[2])=='ETONESELECT' ){
global $_JSEND, $_JSINCLUDE;
$tmp2 = explode(",",eNsp($tmp[1]));
for($n=0; $n<count($tmp2); $n++){
$tmp[1] = $tmp2[$n];
if( $Opcion=='a' || $Opcion=='mR' ){
if( !empty($tmp[3]) ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$tmp[2] = mb_strtoupper($tmp[2])=='ECOLORSELECT' ? "eColorSelect":"eToneSelect";
if( mb_strlen($tmp[4])<2 ){
if( $tmp[4]=="" || mb_strtoupper($tmp[4])=="P" ) $tmp1 = 61442;
else if( mb_strtoupper($tmp[4])=="C" ) $tmp1 = 184;
else if( mb_strtoupper($tmp[4])=="B" ) $tmp1 = 185;
$_ADDCODE[$tmp[1]]['A'] .= '<I class="ICONINPUT" oncontextmenu="eSelectRGB(null,1,_listColor,'.$tmp1.')" onclick="eSelectRGB(null,1,'.$tmp[2].','.$tmp1.')'.$tmp[3].'" title="'.$__Lng[189].'">&#'.$tmp1.';</I>';
}else{
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.((!empty($tmp[4])) ? $tmp[4] : 'g/t_color.png').'" onclick="eSelectRGB(null,1,'.$tmp[2].')'.$tmp[3].'" title="'.$__Lng[189].'">';
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
if( !empty($tmp[3]) ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.((!empty($tmp[4])) ? $tmp[4] : 'g/label_sel.png').'" onclick="eLabelSelect()'.$tmp[3].'" title="'.$__Lng[188].'">';
$_PDFLABELTOOLS = true;
}elseif( mb_strtoupper($tmp[2])=='INSERTAUX' ){
if( $tmp[3]=='' ) $tmp[3] = $__Lng[187];
$_ADDCODE[$tmp[1]]['A'] .= '<img id="'.$tmp[1].'_" src="g/t_op_insert_sel.png" onclick="_InsertSelect()" title="'.$tmp[3].'">';
}elseif( mb_strtoupper($tmp[2])=='EDEFAULTS' && eSubstrCount(',a,b,c,m,', ",{$_Mode},")>0 ){
if( $_DEFAULTALL ) break;
if( empty($tmp[3]) ) $tmp[3] = $__Lng[186];
if( empty($tmp[5]) ) $tmp[5] = "false";
if( !empty($tmp[1]) ) $_ADDTOOLSCP = ",'".eNsp(trim($tmp[1]))."'";
$_TITLEICON[] = '<i id="_eDefaults_" style="font-size:70%" class="ICONTITLE OFF" a=1 onclick="eDefaults('.$tmp[5].$_ADDTOOLSCP.')" title="'.$tmp[3].'">h</i>';
$_DEFAULTALL = true;
$_DEFAULTBYMODE = (mb_strtoupper($tmp[5])=='TRUE' || $tmp[5]==1);
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
case 'DATATYPETO':
case 'ENTER':
${$Comando} = $tmp;
break;
case 'WINCLOSEESC':
$_WINCLOSEESC = true;
break;
case 'PROGRESS':
$_ProgressFields = eNsp($tmp[0]);
$_ProgressTitle = $tmp[1];
$_ProgressDetail = $tmp[2];
break;
case 'CACHE':
if( SETUP::$System['Cache'] && $OkModo && mb_substr($_oAccion,-2)=="df" && SESS::$_D_=='' ){
$_ENV[DF]["cache"] = eScriptToCache();
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
case 'EXIT':
break 3;
case 'SUBMITHIDDEN':
$_SUBMITHIDDEN = $OkModo && eSubstrCount(',a,mR,bR,cR,',",{$Opcion},") > 0;
break;
case 'BACKGROUNDIMAGE':
if( $OkModo && ( $tmp[4]=='false' || (($tmp[4]=='' || $tmp[4]=='true') && $_PSOURCE=='WWORK')) ){
$_BACKGROUNDIMAGE = '<style>body{background-image:url("'.$tmp[1].'");background-repeat:'.(($tmp[2]=='')?'no-repeat':$tmp[2]).';background-position:'.(($tmp[3]=='')?'bottom right':$tmp[3]).';background-attachment:fixed;}</style>';
}
break;
case 'IMPORT':
$_Import[] = $tmp;
break;
case 'BR':
if( $OkModo ) $_BR = true;
break;
case 'FREEFIELDS':
if( $OkModo ){
$tmp = explode(',',eNsp($tmp[1]));
for($i=0; $i<count($tmp); $i++) $_CONTEXTFREE[$tmp[$i]] = true;
}
break;
case 'LINK':
$_LINK[] = $tmp[0];
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
case 'NOTOOLS':
$_NOTOOLS = eNsp($tmp[0]);
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
case 'EXPORTSCOPE':
$_EXPORTSCOPE = strtolower($tmp[0]);
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
if(		  $tmp=='SLSUBMENU' ){
$sTmp = explode('|', $buffer);
if( empty($sTmp[0]) || !eOkMode($Opcion, $sTmp[0]) ) continue;
$sObjetoID = mb_substr($_ObjetoID,1,-1);
$DimNomOp = array('i'=>'Insertar', 'u'=>'Modificar', 'd'=>'Borrar', 'v'=>'Consultar', 'F'=>'Ver documento', 'E'=>'Editar documento', 'FE'=>"Ver documento\\nEditar documento");
$DimImgOp = array('i'=>'insert', 'u'=>'update', 'd'=>'delete', 'v'=>'view', 'F'=>'doc', 'E'=>'doc', 'FE'=>'doc');
for($i=0; $i<count($sTmp); $i++) $sTmp[$i] = trim($sTmp[$i]);
$buffer = '{slMenu}'.$sTmp[0].'|';
$sTmp[1] = eNsp($sTmp[1]);
$Tmp2 = explode(',',$sTmp[1]);
for($i=0; $i<count($Tmp2); $i++){
if( $i>0 ) $buffer .= ',';
$buffer .= $DimNomOp[$Tmp2[$i]].':'.$Tmp2[$i];
}
if( $sTmp[5]=='' ) $sTmp[5] = 'FormOnLine';
$buffer .= "|#||{$sTmp[5]}|";
if( !empty($sTmp[2]) ){
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
if( !empty($sTmp[3]) ) $ImgCol .= $sTmp[3];
$buffer .= $ImgCol;
$_PHPINI .= 'function _ImgSubList'.$sObjetoID.'(){ echo "'.$ImgCol.'";}';
}
if( !empty($sTmp[6]) ) $buffer .= '|'. $sTmp[6];
if( !$ConOpDeAlta ){
$i = mb_strpos($_Objeto[$_ObjetoID]['SLTH'],'l_op_insert.gif');
$f = mb_strpos($_Objeto[$_ObjetoID]['SLTH'],'>',$i)+1;
$i = mb_strrpos(mb_substr($_Objeto[$_ObjetoID]['SLTH'],0,$i),'<');
$_Objeto[$_ObjetoID]['SLTH'] = mb_substr($_Objeto[$_ObjetoID]['SLTH'],0,$i).mb_substr($_Objeto[$_ObjetoID]['SLTH'],$f);
}
$SubEtiqueta = trim(mb_substr($buffer, 1, mb_strpos($buffer,'}')-1));
$buffer = trim(str_replace('{'.$SubEtiqueta.'}', '', $buffer));
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
if( mb_substr($buffer,0,2)=='/'.'*' && eSubstrCount($buffer, '*'.'/')==0 ){
$LeeDFEsRem = true;
}else if( $LeeDFEsRem && eSubstrCount($buffer, '*'.'/')>0 ){
$LeeDFEsRem = false;
$buffer = trim(mb_substr($buffer,mb_strpos($buffer, '*'.'/')+2));
if( $buffer=='' ) continue;
}
if( $LeeDFEsRem ) continue;
if( $buffer[0]=="#" || _IsLabel($buffer) ) break;
if( $buffer=='' || eSubstrCount('./',$buffer[0])>0 ) continue;
$Inicio = '<'.'?';
$Final = '?'.'>';
if( eSubstrCount($buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
for($n=0; $n<2; $n++){
$Inicio = ($n==0) ? '<'.'?=' : '<'.'?';
while( eSubstrCount($buffer, $Inicio)>0 && eSubstrCount($buffer, $Final)>0 ){
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
$DimLabel = explode('|', mb_strtoupper($buffer));
for($i=0; $i<count($DimLabel); $i++){
$DimLabel[$i] = trim($DimLabel[$i]);
if( mb_substr($DimLabel[$i],0,2)!='SL' ) $DimLabel[$i] = 'SL'.$DimLabel[$i];
if( $DimLabel[$i]=='SLFIELDS' ) $DimLabel[$i] = 'SLMENU';
if( $DimLabel[$i]=='SLSQL' ) $iSql = $i;
if( $DimLabel[$i]=='SLALIGN' ) $iAlign = $i;
}
$BeforeAfter = '';
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = ___Lng(trim($_DimEDF[$i]));
if( $buffer[0]=='[' ) break;
if( mb_strtoupper(mb_substr($buffer, 0, 11))=='{SLSUBMENU}' ){
list(,$sTmp) = explode('}', $buffer);
$sTmp = explode('|',$sTmp);
if( eOkMode($Opcion, $sTmp[0]) ){
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
for($p=0; $p<count($tmp); $p++){
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
$tmp[$p] = str_replace(',', '&#44;', "<IMG SRC='g/l_op_insert.gif' title=".'"'.$__Lng[19].'"'." onclick=eSLAction('".mb_substr($_ObjetoID,1,-1)."'&#44;'i')>".str_replace(',','&#44;',$THAddIcon));
$tmp[$p] = '[i,'.$__Lng[19].']';
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
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$buffer = ___Lng(trim($_DimEDF[$i]));
list($buffer) = explode(REM, $buffer);
$Chr_1 = $buffer[0];
if( $Chr_1=='¿' ){
list( $tmp9 ) = explode('?', $buffer);
$tmp9 = trim(mb_substr($tmp9, 1));
$buffer = trim(mb_substr($buffer, mb_strpos($buffer, '?')+1));
if( mb_substr($tmp9, 0, 2)=='#(' ){
list($tmp9) = explode(')', mb_substr($tmp9,2));
$tmp9 = trim($tmp9);
$cModo = explode(',', $tmp9);
$acc = (count(array_intersect($cModo, $DimOpcion))>0 );
}else if( mb_substr($tmp9,0,3)=='#!(' ){
list($tmp9) = explode(')', mb_substr($tmp9,3));
$tmp9 = trim($tmp9);
$cModo = explode(',', $tmp9);
$acc = !(count(array_intersect($cModo, $DimOpcion))>0 );
}else if( mb_substr($tmp9,0,2)=='#!' ){
$acc = !($_Variable[str_replace('!', '', $tmp9)]);
}else if( $tmp9[0]=='#' ){
$acc = ($_Variable[$tmp9]);
}else{
$acc = _ExeEval($tmp9, $buffer);
if( !$acc ) continue;
}
}
if( eSubstrCount('{[',$buffer[0])>0 ) break;
if( $buffer=='' || $buffer[0]=='.' || mb_substr($buffer,0,2)==REM ) continue;
$ConSelect = false;
$tmp = explode('|', $buffer);
for($p=0; $p<count($tmp); $p++){
$tmp[$p] = trim($tmp[$p]);
if( $DimLabel[$p]=='SLALIGN' && eSubstrCount($tmp[$p], CHR92)>0 ){
if( eSubstrCount(',a,mR,', ",{$Opcion},")>0 ){
list($tmp[$p]) = explode(CHR92, $tmp[$p]);
}else{
list(,$tmp[$p]) = explode(CHR92, $tmp[$p]);
}
}else if( $DimLabel[$p]=='SLMENU' ){
if( $tmp[$p]=='' ) continue;
$tmp[$p] = trim($tmp[$iSql]).'='.$tmp[$p];
}else if( $DimLabel[$p]=='SLTH' ){
if( eSubstrCount($tmp[$p],CHR92)>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode(CHR92, $tmp[$p]);
}else{
list($tmp[$p]) = explode(CHR92, $tmp[$p]);
}
}
$tmp[$p] = _SubListGetImg($tmp[$p]);
$tmp[$p] = str_replace(',', '&#44;', str_replace('·','<BR>',$tmp[$p]));
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = str_replace(',', '&#44;', $tmp[$p]);
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
for($p=0; $p<count($tmp); $p++){
$_Objeto[$_ObjetoID][$DimLabel[$p]] .= ',';
if( $DimLabel[$p]=='SLSQL' ){
if( $LetraAlias==66 ) $MasFrom .= ' as A';
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
if( $LetraAlias>66 ){
$txt = '';
$tmp = explode(',', $_Objeto[$_ObjetoID]['SLMENU']);
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( eSubstrCount($tmp[$p], '.')==0 ){
if( $tmp[$p][0]!='"' && $tmp[$p][0]!="'" ) $tmp[$p] = 'A.'.$tmp[$p];
}
$txt .= $tmp[$p];
}
$_Objeto[$_ObjetoID]['SLMENU'] = $txt;
$txt = '';
$tmp = explode(',', $_Objeto[$_ObjetoID]['SLSQL']);
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( eSubstrCount($tmp[$p], '.')==0 ){
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
for($p=0; $p<count($tmp); $p++){
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
$tmp[$p] = '[i,'.$__Lng[19].']';
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
if( $LetraAlias>66 ){
list($iz, $dch) = explode(' where ', $buffer);
$buffer = $iz.$MasFrom.' where A.'.$dch;
list($iz, $dch) = explode(' order by ', $buffer);
$buffer = $iz.' order by A.'.$dch;
}
$buffer = str_replace('  ',' ',$buffer);
if( mb_strtoupper(mb_substr($buffer,0,9))=='SELECT # ' || mb_strtoupper(mb_substr($buffer,0,9))=='SELECT * '){
$buffer = 'select '.$_Objeto[$_ObjetoID][$tmp].' '.mb_substr($buffer,9);
}else{
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace('|'.$Cambiar.'|', '|'.$_Objeto[$_ObjetoID][$tmp].'|', $buffer);
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
$_nObjeto++;
$_Objeto[$_ObjetoID]['nSLMENU']++;
$sMenu = $_Objeto[$_ObjetoID]['SLMENU'];
$buffer = str_replace('  ',' ',$buffer);
list($SubOpciones,$NO,$FSFile,,$tmp,$slIMG) = explode('|',$buffer);
$SubOpciones = eNsp($SubOpciones);
$tmp = trim($tmp);
if( mb_strtoupper(trim($tmp))=="FORMSTATIC" && ((eSubstrCount(",{$SubOpciones},",",mR,")>0 && $Opcion=="M") || (eSubstrCount(",{$SubOpciones},",",a,")>0 && $Opcion=="A")) ){
$_SUBLISTWIN[mb_substr($_ObjetoID,1,-1)] = $FSFile;
}
if( !eOkMode($Opcion, $SubOpciones, '') ) break;
if( mb_strtoupper(trim($tmp))=='FORMONLINE' ){
$DimCampos = $_Objeto[$_ObjetoID]['SLSQL'];
if( mb_strtoupper(mb_substr($DimCampos,0,6))=='SELECT' ) $DimCampos = mb_substr($DimCampos,7);
list( $DimCampos ) = explode(' from ', $DimCampos);
$DimCampos = str_replace('  ',' ',$DimCampos);
$FSFile = $DimCampos;
}
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace('|'.$Cambiar.'|', '|'.$sMenu.'|', $buffer);
$_Objeto[$_ObjetoID]['SLMENU'] = $buffer;
global $_SaveList;
if( !empty($slIMG) ){
$slIMG = _SubListGetImg($slIMG, true, "", true);
$slIMG = str_replace("\n","<br>",$slIMG);
$_OnLineIMG[$_ObjetoID] = $slIMG;
}
if( mb_strtoupper(trim($tmp))=='FORMSTATIC' ){
$_Objeto[$_ObjetoID]['FORMSTATIC'] = 1;
$FSFile = trim($FSFile);
if( eSubstrCount($FSFile,'.')==0 ) $FSFile .= '.edf';
include_once($GLOBALS['Dir_'].'formstatic.inc');
$tmp = LeerFormStatic(eScript($FSFile), $_ObjetoID);
$_Objeto[$_ObjetoID]['FieldSubList'] = $tmp[1];
$tmp = $tmp[0];
$tmp = str_replace('|#|',"|{$_DBINDEX}|",$tmp);
$_SaveList[] = $tmp;
}else if( mb_strtoupper(trim($tmp))=='FORMONLINE' ){
$_Objeto[$_ObjetoID]['FORMSTATIC'] = 0;
global $_OnLineOP, $_DimChildrenData;
$_SaveOnLine[] = mb_substr($_ObjetoID,1,-1).'|'.$FSFile;
$tmp = explode(',',$sMenu);
$uCampo = '';
for( $i=0; $i<count($tmp)-(($BeforeAfter=='A')?1:0); $i++ ){
list( $tmp1, $tmp2 ) = explode('=',$tmp[$i]);
$tmp2 = trim($tmp2);
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
for($n=0; $n<count($tmp); $n++){
list($tmp2) = explode('=',$tmp[$n]);
if( $tmp2[0]!='"' && $tmp2[0]!="'" && $tmp2[0]!='_' ){
if( $LetraAlias > 66 ){
}
$oCampos .= trim($tmp3).',';
$dCampos .= trim($tmp2).',';
}
}
$dCampos = mb_substr($dCampos,0,-1);
list(, $slIndex, $slFile) = explode('|', $_Objeto[$_ObjetoID]['sSLSQL']);
list($_Objeto[$_ObjetoID]['SLSQL']) = explode('|', $_Objeto[$_ObjetoID]['SLSQL']);
$tmp = str_replace('  ', ' ', $_Objeto[$_ObjetoID]['SLSQL']);
$tmp = explode(' ',$tmp);
for($n=0; $n<count($tmp); $n++){
if( mb_strtoupper($tmp[$n])=='FROM' ){
$slTable = $tmp[$n+1];
if( $tmp[$n+2]=='as' ) $slTable .= ' '.$tmp[$n+3];
else if( mb_strlen($tmp[$n+2])==1 ) $slTable .= ' '.$tmp[$n+2];
}
if( mb_strtoupper($tmp[$n])=='WHERE' ){
$txt = $_Objeto[$_ObjetoID]['SLSQL'];
$txt = mb_substr( $txt, mb_stripos($txt,' where ') );
$f = mb_strrpos(mb_substr($txt,0,mb_strpos($txt,'{')),'=')-1;
$ca = mb_substr($txt,$f,1);
while($ca==' ' && $f>0) $ca = mb_substr($txt,--$f,1);
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
case '_OPTIONS':
$_OPTIONS[] = explode('|',$buffer);
break;
default:
if( $TipoEntrada=='_FIELDS' ){
$buffer = trim($buffer);
if( eSubstrCount('{H}{J}{P}{F}{I}{ISUBLIST}{TAB}{CARD}', mb_strtoupper(trim(mb_substr($buffer, 0, mb_strpos($buffer,'}')+1))))==1 ){
$xEti = mb_strtoupper(trim(mb_substr($buffer, 0, mb_strpos($buffer,'}')+1)));
if( $xEti=='{TAB}' ){
array_push($_Form, array_merge(array($xEti), explode('|',mb_substr($buffer,mb_strpos($buffer,'}')+1))));
$_Form[count($_Form)-1][10] = 1;
break;
}else if( $xEti=='{ISUBLIST}' ){
$tmp = explode('|', mb_substr($buffer, mb_strpos($buffer,'}')+1));
if( !eOkMode($Opcion, $tmp[0]) ) break;
}else if( $xEti=='{CARD}' ){
$_CARDNEW[count($_Form)-1] = true;
break;
}
array_push($_Form, array($buffer));
}
break;
}
if( empty($buffer) && $_DEBUG!=2 ) break;
${$TipoEntrada} .= $buffer.$__Enter;
if( preg_match('/^(_HTMINI|_HTMEND)$/u', $TipoEntrada) && preg_match('/top\.eNewIFrame\(/u', $buffer) ) $_WithNewIFrame = true;
}
break;
default:
$NoExePHPInterno = false;
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm('F', $Opcion, $buffer, $_Form, $_DEFAUX, 1) ){
if( $_TmpFieldSet[1] =='+' ) $_TmpFieldSet[1]  = NombreCampo($_Form[count($_Form)-1][1]);
if( $_TmpEnLinea[1]  =='+' ) $_TmpEnLinea[1]   = NombreCampo($_Form[count($_Form)-1][1]);
if( $_TmpEnColumna[1]=='+' ) $_TmpEnColumna[1] = NombreCampo($_Form[count($_Form)-1][1]);
if( $_TmpNColumnas[1]=='+' ) $_TmpNColumnas[1] = NombreCampo($_Form[count($_Form)-1][1]);
$nf = count($_Form)-1;
if( eSubstrCount($_Form[$nf][1], "[")>0 && $_Form[$nf][1][0]!="[" && !preg_match('/^(A|B|M)$/u', $_Mode) ){
list($ExtObj, $ExtField) = explode("[", str_replace("]","[",$_Form[$nf][1]));
if( $ExtObj[0]=='$' ){
@include_once(DIREDES."itm/{$ExtObj}.plugin");
}else{
@include_once("../_datos/config/{$ExtObj}.plugin");
}
$_Form[$nf][1] = $ExtField;
$_Form[$nf][19] = $ExtObj;
call_user_func($ExtObj, $_Mode, $_Form[$nf]);
}
if( $_Form[$nf][2]!="" && $_Form[$nf][1][0]!="[" ){
$tmp = NombreCampo($_Form[$nf][1]);
$_Field[$tmp] = true;
$_pField[$tmp] = $_Form[$nf];
}
}
break;
case '_FORMCHECK':
list($_Condi[$nc][0], $_Condi[$nc][1], $_Condi[$nc][2]) = explode('|', $buffer);
$_Condi[$nc] = array(trim(mb_strtoupper($_Condi[$nc][0])), trim($_Condi[$nc][1]), trim($_Condi[$nc][2]), 1, 'D');
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
case '_DBEND':
case '_DBINI':
case '_DBINSERT':
case '_DBREAD':
case '_DBSELREC':
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
if( empty($buffer) && $_DEBUG!=2 ) break;
${$TipoEntrada} .= $buffer.$__Enter;
if( preg_match('/^(_HTMINI|_HTMEND)$/u', $TipoEntrada) && preg_match('/top\.eNewIFrame\(/u', $buffer) ) $_WithNewIFrame = true;
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
case '_EXPORT':
if( $buffer[0]!='.' ) array_push($_EXPORT, explode('|', $buffer));
break;
case '_LANGUAGE':
list($buffer) = explode('~', $buffer);
$tmp = explode('|', $buffer);
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array('@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron);
break;
}
}
}
unset($_DimEDF);
_SanitizeGET($_pField);
_CheckMD5($_Mode);
if( $_DBINSERTONLY ){
if( !empty($_DBADDFILTER) ) $_DBADDFILTER .= " and ";
$_DBADDFILTER = "status is null";
}
$NomFile = $NomFileBAK;
if( empty($_DBINDEX) && count($_DBSERIAL)>0 ) $_DBINDEX = $_DBSERIAL[1];
if( empty($_DBORDER) ) $_DBORDER = $_DBINDEX;
if( !empty($_FORMACTION) && $_OptionsInListOn ){
eMessage('ERROR: Etiquetas incompatibles "FormAction" y "OptionsInList"', "HES");
$_FORMACTION = "";
}
if( isset($_DBVIEW) && count($_DBVIEW)>0 ){
if( eSubstrCount(",A,B,M,", ",{$Opcion},")>0 ){
for($n=1; $n<count($_DBVIEW); $n++) eUnSet($_DBVIEW[$n]);
}else{
$_DBVIEWTABLE = $_DBTABLE;
$_DBTABLE = $_DBVIEW[0];
}
}
if( isset($_GET['_ISUBLIST']) && isset($_ISUBLISTSUFIJO) ){
list($tmp) = explode(",", $_DBINDEX);
if( $_GET[$tmp]==S::$_User*-1 || $_POST[$tmp]==S::$_User*-1 ){
$_DBTABLE .= $_ISUBLISTSUFIJO;
$_DBSERIAL[0] .= $_ISUBLISTSUFIJO;
}
}
if( isset($_GET["_TRANSPARENT"]) && $_GET["_TRANSPARENT"] ){
if(eSubstrCount($_PERSISTENTVAR,"_TRANSPARENT")==0){
if( !empty($_PERSISTENTVAR) ) $_PERSISTENTVAR.=",";
$_PERSISTENTVAR .= "_TRANSPARENT";
}
}
if( isset($_ConDelFilter) && $_ConDelFilter ){
$_ICONSPIEOFF = true;
$_FORMACTION = $_DelFilterURL;
if( $_FORMACTION=='' ) $_NOBUTTON = true;
}
if( $OriFichero[0]=='$' && $OriFichero!='$a/config.edf' ){
$AddFile = '../_datos/config/'.mb_substr($OriFichero, mb_strrpos($OriFichero, '/')+1, -3).'ini';
if( file_exists($AddFile) ) include($AddFile);
unset($AddFile);
}
if( $Opcion=='cR' && isset($_GET['_WSList']) && $_GET['_WSList']==1 ) $_NOBUTTON = true;
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('f_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
if( $_TITLE[0]=='#' ) $_TITLE = trim(mb_substr($_TITLE, 1));
if( isset($_TITLE_DELFILTER) && !empty($_TITLE_DELFILTER) ){
$_TITLE = $_TITLE_DELFILTER;
$_LOGREQUEST["title"] = $_TITLE;
}
if( $Opcion=='cR' && $_PSOURCE=='MAIN' && $_STOP ) $_NOBUTTON = true;
if( $_FORMSTATIC && mb_strtoupper($Opcion)!='A' ) $_FORMSTATIC = false;
if( count($_DBMEMO)>0 ) $_DBMemoTable = $_DBTABLE;
if( isset($_FchXPg_) && ($_FchXPg_=='m' || $_FchXPg_=='b') ){
$_Form[] = array('', '_FchXPg_', 'X', 'T', '1', '', '*', '', '', '', '1');
}
if( isset($_DATATYPETO) ){
include(DIREDES."datatypeto.php");
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
if( !empty($_DBADDFILTER) ) $_DBADDFILTER .= " and ";
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
$VarIni = str_replace('\\', '', $VarIni);
$ValorINI = $VarIni;
}
if( isDate($VarFin) ){
$VarFin = str_replace('\\', '', $VarFin);
$ValorFIN = $VarFin;
}
}else if( eSubstrCount('|+|-|+,|-,|',"|{$sTipo}|" ) ){
if( !empty($ValorINI) ) $ValorINI *= 1;
if( !empty($ValorFIN) ) $ValorFIN *= 1;
}else if( $sTipo=='CDI' ){
if( mb_strlen($VarIni)==10 ){
$VarIni = str_replace('\\', '', $VarIni.'\\');
if( !empty($_POST[$DimDBRange[$i][4].'_hours']) ){
$VarIni = $ValorINI = $VarIni.' '.$_POST[$DimDBRange[$i][4].'_hours'];
}else{
$VarIni = $ValorINI = $VarIni.' 00:00:00';
}
}
if( mb_strlen($VarFin)==10 ){
$VarFin = str_replace('\\', '', $VarFin.'\\');
if( !empty($_POST[$DimDBRange[$i][5].'_hours']) ){
$VarFin = $ValorFIN = $VarFin.' '.$_POST[$DimDBRange[$i][5].'_hours'];
}else{
$VarFin = $ValorFIN = $VarFin.' 23:59:59';
}
}
}
if(		  empty($ValorINI) &&  empty($ValorFIN) ){
}else if( empty($ValorINI) && !empty($ValorFIN) ){
${$Campo} = '<'.(($Inclusive)?'=':'').$VarFin;
}else if( !empty($ValorINI) &&  empty($ValorFIN) ){
${$Campo} = '>'.(($Inclusive)?'=':'').$VarIni;
}else if( !empty($ValorINI) && !empty($ValorFIN) ){
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
$_POST[$Campo] = ${$Campo};
$MemDBRange[$Campo] = $Campo.''.${$Campo};
}
}
if( $Opcion=='mR' && $_ModCampoIndice ){
$_Form[] = array('_unique_','_UNIQUE_', 'X','T',60,'','Q*','','','', 1);
}
if( isset($_ADDOPTIONCOLLABEL) ){
foreach($_ADDOPTIONCOLLABEL as $k=>$v){
$cmp = eMid($v, "$", "=");
$ok = false;
for($n=0; $n<count($_ONCHANGE); $n++){
if( $_ONCHANGE[$n][0]==$cmp ){
$_ONCHANGE[$n][1] .= "S(\":{$k}\").selectColLabel(".str_replace("'", '"', $v).");";
$ok = true;
}
}
if( !$ok ) $_ONCHANGE[] = array($cmp, "S(\":{$k}\").selectColLabel(".str_replace("'", '"', $v).");", "", 1);
}
}
_CreateVar($_Form);
$FormSeek = (eSubstrCount(',c,m,b,',",{$Opcion},")>0);
if( isset($_WIDTH["e"]["*"]) ){
for($n=0; $n<count($_Form); $n++){
$_WIDTH["e"][_NomFields($_Form[$n][1])] = $_WIDTH["e"]["*"];
}
unset($_WIDTH["e"]["*"]);
}
if( $_Mode=='a' ) SESS::$_InsertToSeek = '';
$_y2s = date('Y-m-d H:i:s');
$_ConED = false;
if( isset($_GET["_ISUBLIST"]) && isset($_GET["_ADDFILTER"]) ){
$condi = eAddFilterGet("where", $_GET["_ADDFILTER"]);
unset($_GET["_ADDFILTER"]);
list($xField, $xValue) = explode("=", $condi);
$xValue = mb_substr($xValue, 1, -1);
$_Form[$_pF[$xField]][_DEFAULT] = $xValue;
$_ASSIGNFIELD[$xField] = true;
$_GET["_SEEK"] = $_Mode;
$_SEEK = $_Mode;
$_GET[$xField] = $xValue;
}
for($nf=0; $nf<count($_Form); $nf++){
list($sCampo) = explode('{', $_Form[$nf][1].'{');
list($sCampo, $sReal) = explode(':', $sCampo.':');
if( !empty($_SELINFOMODE[$sCampo]) ){
$_Form[$nf][6] .= $_SELINFOMODE[$sCampo];
}
if( $_Form[$nf][3]=='H' ) $_ConED = true;
if( mb_substr($_Form[$nf][1],0,4)=='dct_' && eSubstrCount(',A,B,M,', ",{$Opcion},")==1 && !empty($_POST[$_Form[$nf][1]]) ){
$_DCT[] = $_Form[$nf][1];
}
if( mb_substr($_Form[$nf][7],0,1)=='@' ){
$_Form[$nf][7] = trim(mb_substr( $_Form[$nf][7], 1 ));
if( SESS::$_WebMaster==$_ENV['ON'] && eSubstrCount(',c,b,m,', ",{$Opcion},")>0 ) $_Form[$nf][6] = 'Q';
}
if( $Opcion=='mR' && $_ModCampoIndice ) $_Form[$nf][6] = str_replace('A','M',$_Form[$nf][6]);
if( $_Form[$nf][0][0]==',' ){
if( $nf==0 || $_Form[$nf-1][0]=='-' ) $_Form[$nf][0] = mb_substr($_Form[$nf][0],1);
}
list($sCampo) = explode('{', $_Form[$nf][1]);
list($sCampo,$sReal) = explode(':', $sCampo.":");
if( !empty($_RELATIONJUMP[$sCampo]) && $_RELATIONJUMP[$sCampo]>=1 ){
if( eSubstrCount($_Form[$nf+1][1], ':')>0 ){
list($ssCampo, $cReal) = explode(':', $_Form[$nf+1][1].":");
$_ADDOPTIONVALUE[$ssCampo] = $sReal;
$_NM_ATRIBUTE[$ssCampo] = $sCampo;
}
}
if( !empty($_LABEL[$sCampo]) ){
list( $_Form[$nf][0], $MsgList, $MsgError ) = explode( CHR92, $_LABEL[$sCampo] );
if( $MsgError!= '' ) $_Etiqueta[$sCampo] = trim($MsgError);
}
$_Form[$nf][7] = trim($_Form[$nf][7]);
switch( $_Form[$nf][7] ){
case '#today#': $_Form[$nf][7] = date('Y-m-d'); break;
case '#y2m#': $_Form[$nf][7] = date('Y-m'); break;
case '#clock#':
$_Form[$nf][7] = mb_substr($_y2s, 11, $_Form[$nf][4]);
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
unset($_ENV[DF]["cache"]);
break;
case '#sy2s#':
$_Form[$nf][7] = '>='.date('Y-m-d 00:00:00');
if( $Opcion!='a' && $Opcion!='A' ) break;
case '#y2s#':
$_Form[$nf][7] = $_y2s;
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
unset($_ENV[DF]["cache"]);
break;
case '#default#':
$_DEFAULT[] = 'default_'.$_Form[$nf][1];
$_Form[$nf][7] = '';
break;
default:
if( empty($_Form[$nf][7]) ){
}else if( mb_substr($_Form[$nf][7],0,1)=="=" ){
$_Form[$nf][7] = mb_substr($_Form[$nf][7],1);
}else if( eSubstrCount($_Form[$nf][7], '\\')==1 ){
list($t, $c) = explode('\\', $_Form[$nf][7].'\\');
if( eSubstrCount(',c,cR,', ",{$Opcion},") == 1 ){
$_Form[$nf][7] = trim($c);
}else{
$_Form[$nf][7] = trim($t);
}
}else if( mb_substr($_Form[$nf][7],0,1)=='_' ){
$EsVarSesion = isset(SESS::${$_Form[$nf][7]});
$_Form[$nf][7] = SESS::${$_Form[$nf][7]};
if( $_NOEDITFILLEDSESSION && !empty($_Form[$nf][7]) ){
if( $EsVarSesion ){
$_NOEDIT[$sCampo] = 1;
if( $_Mode=='a' ){
if( !empty(SESS::$_InsertToSeek) ) SESS::$_InsertToSeek .= ',';
SESS::$_InsertToSeek .= $sCampo;
}
}
}
}else if( mb_substr($_Form[$nf][7],0,1)=='$' ){
$_Form[$nf][7] = _ExeEval( $_Form[$nf][7], $_Form[$nf][7] );
}else if( mb_substr($_Form[$nf][7],0,1)=='>' ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.mb_substr($_Form[$nf][7],1).';');
$_Form[$nf][7] = @eval('return '.mb_substr($_Form[$nf][7],1).';');
}else if( mb_strtoupper(mb_substr($_Form[$nf][7],0,7))=='SELECT ' ){
qQuery($_Form[$nf][7]);
list($_Form[$nf][7]) = qRow();
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
if( !empty($_Form[$nf][7]) ){
$_pField[$sCampo][7] = $_Form[$nf][7];
$tmp = str_replace("-Q", "", $_Form[$nf][_MODE]);
if( $_Mode=="mR" && preg_match('/a/u',$tmp) && preg_match('/(A|-)/u',$tmp) ){
$_ASSIGNFIELD[$_Form[$nf][1]] = true;
}
}
if( isset($_NOEDITFILLEDFIELD[$_Form[$nf][_OFIELD]]) && $_NOEDITFILLEDFIELD[$_Form[$nf][_OFIELD]] ){
if( !empty($_Form[$nf][7]) ){
$_NOEDIT[$_Form[$nf][_OFIELD]] = 1;
if( $_Mode=='a' ){
if( !empty(SESS::$_InsertToSeek) ) SESS::$_InsertToSeek .= ',';
SESS::$_InsertToSeek .= $_Form[$nf][_OFIELD];
}
}else{
unset($_NOEDIT[$_Form[$nf][_OFIELD]]);
}
}
if( $_ModeSeek ){
$_Form[$nf][19] = $_Form[$nf][8];
}else{
list($CondiNormal, $CondiSeek) = explode('\\', $_Form[$nf][8].'\\');
$_Form[$nf][8] = (($FormSeek) ? trim($CondiSeek) : trim($CondiNormal));
$_Form[$nf][19] = $CondiNormal;
}
if( isset($_DEFAULTVAL[$sCampo]) && !empty($_DEFAULTVAL[$sCampo]) && !empty($_Form[$nf][7]) ){
$_Form[$nf][6] = $_DEFAULTVAL[$sCampo];
}
}
if( isset($_DBRANGEADD) ){
foreach($_DBRANGEADD as $k=>$v){
$ok = true;
for($i=0; $i<count($_Form); $i++){
if( $_Form[$i][1]==$k ){
$ok = false;
break;
}
}
if( $ok ){
$_Form[] = explode("|", ",|{$k}|X|T|30||*Q*||||1|I||||||||");
}
}
}
unset($_y2s);
if( isset($_ConDelFilter) && $_ConDelFilter ){
global $_TitleDelFilter;
if( !empty($_TitleDelFilter) && !empty($_TITLE) ) $_TITLE = $_TitleDelFilter;
}
$_TabTITLE = array($_TITLE);
if( isset($_xPERSISTENTVAR) ) $_PERSISTENTVAR = $_xPERSISTENTVAR;
if( !empty($_PERSISTENTVAR) ){
$tmp = explode(',', $_PERSISTENTVAR);
$_PERSISTENTVAR = '';
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( !empty(${$tmp[$i]}) ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.${$tmp[$i]}.'"';
}elseif( !empty($_vF[$tmp[$i]]) ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.$_vF[$tmp[$i]].'"';
}elseif( !empty($_POST[$tmp[$i]]) ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="'.$_POST[$tmp[$i]].'"';
}elseif( !empty($_GET[$tmp[$i]]) ){
$_PERSISTENTVAR .= '&'.$tmp[$i].'="_GetValue_('.$_GET[$tmp[$i]].')"';
}else{
}
if( !empty($_GET[$tmp[$i]]) || !empty($_POST[$tmp[$i]]) ){
if( $tmp[$i][0] == '_' ){
array_push($_Form, array('', $tmp[$i],'X','T','30','','*Q*',${$tmp[$i]},'','',1));
$_DEFAULTVAL[$tmp[$i]] = ${$tmp[$i]};
$_ASSIGNFIELD[$tmp[$i]] = true;
}else{
for( $p=0; $p<count($_Form); $p++ ){
if( $_Form[$p][1]==$tmp[$i] ){
if( eSubstrCount( $_Form[$p][6], '*' ) == 0 ){
$_Form[$p][6] = str_replace('A','-',$_Form[$p][6]);
$_Form[$p][6] = str_replace('M','-',$_Form[$p][6]);
break;
}
}
}
$_DEFAULTVAL[$tmp[$i]] = ${$tmp[$i]};
}
for( $n=0; $n<count($_Form); $n++ ) if( $_Form[$n][1] == $tmp[$i] ) $_Form[$n][7] = ${$tmp[$i]};
}
}
}
_EsIntruso();
if( $_ConED && !eSqlType('mysql,mysqli') && eSubstrCount(',c,b,m,', ",{$Opcion},")>0 ){
$_ConED = false;
for($nf=0; $nf<count($_Form); $nf++){
list($sCampo) = explode('{', $_Form[$nf][1]);
list($sCampo,$sReal) = explode(':', $sCampo);
if( $_DBMEMO[$sCampo] ){
$_Form[$nf][6] = '*Q';
if( $_Form[$nf][3]=='H' ) $_Form[$nf][3] = 'A';
}
}
}
$_WINTITLE = _InVar($_WINTITLE);
if( !empty($_FORMACTION) ){
if( !empty($_REMOTE_) ) $_FORMACTION = str_replace('edes.php?', 'redes.php?', $_FORMACTION);
$_FORMACTION = str_replace("'", CHR92."'", $_FORMACTION);
if( eSubstrCount($_FORMACTION, '{')>0 ){
$tmp = explode('{', $_FORMACTION);
$tmp1 = explode('}', $tmp[1]);
if( $tmp1[0][0]=='$' ) $tmp1[0] = mb_substr($tmp1[0],1);
$_FORMACTION = $tmp[0].$GLOBALS[$tmp1[0]].$tmp1[1];
}else if( mb_substr($_FORMACTION,-1)==':' ){
$_FORMACTION .= $OriFichero;
if( eSubstrCount($_FORMACTION, 'edes.php?')==0 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
}else if( mb_strtoupper($_FORMACTION)=='DOWNLOAD' ){
$_FORMACTION = 'edes.php?B:$extraer.gs';
}else{
list($tmp) = explode(':',$_FORMACTION);
if( mb_strlen($tmp)<5 ) $_FORMACTION = 'edes.php?'.$_FORMACTION;
}
}
if( $_COUNT!='-1' && eSubstrCount(',cR,mR,bR,', ",{$Opcion},")>0 ){
include_once($Dir_.'count.inc');
}
if( isset($_GET['_IMPORT']) && $_PSOURCE!='WWORK' ){
eMessage($__Lng[140],'HES',10);
}
eContextGet();
_genContext();
eHTML("F:{$OriFichero}", $Opcion, $_TITLE);
echo '<SCRIPT type="text/javascript" name=eDes>';
if( ISCLI ){
echo REM.$_GET["_SESS_"]."\n";
}
echo $__Enter;
echo 'document.title = "TAB";';
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
if( !$_CARDSHOW && !$_CSSNO && !empty($_CSSFontSize) && $_CSSFontSize!="big" ){
echo "<LINK REL='stylesheet' HREF='css/all_{$_CSSFontSize}.css' TYPE='text/css' title='tab'>";
echo "<LINK REL='stylesheet' HREF='css/tab_{$_CSSFontSize}.css' TYPE='text/css' title='tab'>";
}
if( !empty($_CSSBEFORE) ) echo $_CSSBEFORE;
if( !empty($_CSSADDFILE) ){
$tmp = explode(",", $_CSSADDFILE);
for($n=0; $n<count($tmp); $n++){
if( eSubstrCount(mb_strtoupper($tmp[$n]), '.CSS')==1 ) list($tmp[$n],) = explode('.',$tmp[$n]);
$tmp[$n] = _InVar(trim($tmp[$n])).".css";
if( file_exists($_PathCSS."/".$tmp[$n]) ){
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/".$tmp[$n]."' TYPE='text/css'>".$__Enter;
}
}
}
if( !empty($_CSSADD) ){
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
if( !empty($_CSSAFTER) ) echo $_CSSAFTER;
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
if( !empty($_HTMHEAD) ) _IncludeJsHtml($_HTMHEAD, "HTMHead");
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
echo 'var _DimRecalc = new Array();';
if( isset($_WINCLOSEESC) && $_WINCLOSEESC && $_NOBUTTON ){
echo 'S.windowCloseWithEsc(window);';
}
echo 'if( !window.frameElement.WOPENER ) window.frameElement.WOPENER = window.parent;';
if( $_DEBUG==13 || ($_DEBUG>19 && $_DEBUG<30) ){
echo "var _DEBUG = {$_DEBUG};".$__Enter;
}else{
echo "var _DEBUG = 0;".$__Enter;
}
if( $_OtroDiccionario ) echo 'var _DB="'.$_DB.'";';
if( SESS::$_Development || !empty(SESS::$_D_) ){
echo 'var _GPFIELDS = new Array();';
foreach( $_GPFIELDS as $key=>$value ) echo "_GPFIELDS['{$key}'] = '{$value}';";
if( isset($_iToolsAdd) ) echo "var _iToolsAdd = '{$_iToolsAdd}';";
}else{
echo 'document.oncontextmenu = new Function("return false");';
}
if( $_DEBUG==2 ) echo 'var _ShowError = 1;';
$_SourceScript = $OriFichero;
echo 'var _Source=_DESDE_=_FCH_="'.eQuote($OriFichero).'",';
echo '_BYPHONE = '.((SESS::$_BYPHONE) ? 'true' : 'false').',';
echo '_PRINT_STATUS = '.(( SESS::${"print_tab".(($_EXPORTSCOPE=="public") ? "_public" : "_private")} ) ? 'true' : 'false').',';
echo '_CARD = '.(($_CARDSHOW)? 'true' : 'false').',';
echo "_Obj='F', _Mode='{$Opcion}', _oMode='{$_OpcionBak}', _NmGDF='', _ModeSubList='',";
if( !isset($_PSOURCE) ) $_PSOURCE='';
echo "_PSOURCE='{$_PSOURCE}',";
echo "_CONTEXT=".eContextPKMain().",";
if( $_COUNT!=-1 && eSubstrCount(",c,m,b,", ",{$Opcion},")>0 ) $_FORMBUTTONS = '';
if( $_COUNT || eSubstrCount(",c,m,b,l,s,q,", ",{$Opcion},")>0 ) $_ModeQuestion = true;
echo "_FORMBUTTONS='{$_FORMBUTTONS}',";
echo '_STOP='.(($_STOP) ? 'true' : 'false').','.$__Enter;
echo '_pOBJ_ = _WOPENER = window.frameElement.WOPENER,';
echo '_pFCH_ = _WOPENER._Source,';
echo '_eID = new Date().getTime(),';
echo '_pID = _WOPENER._eID,';
if( !empty($_DBLOGINCLUDE) ) '_DBLOGINCLUDE = "'.$_DBLOGINCLUDE.'",';
echo '_ISubList = ';
if( isset($_GET['_ISUBLIST']) && isset($_ISUBLISTSUFIJO) ){
list($tmp) = explode(",", $_DBINDEX);
if( $_GET[$tmp]==S::$_User*-1 || $_POST[$tmp]==S::$_User*-1 ){
echo "true,";
}else echo "false,";
}else echo "false,";
echo '_WinCaption = '.((isset($_WINCAPTION))?'true;':'false;');
if( !SETUP::$Desktop['MenuAutoHidden'] ) echo "if(window.name=='IWORK') top.eAutoMenu({$_AUTOMENU});".$__Enter;
echo "var _ymd=_D2S=_Hoy='".date('Ymd')."',_Time='".date('H:i:s')."',_iEDes={$_ENV[SYS]['iEDes']},_Connection_=".SESS::$_Connection_.",_User={$_User},_Node={$_Node},".$__Enter;
echo 'ConF10 = '.(($_NOBUTTON)? '0' : '1').','.$__Enter;
echo '_CountType = '.(($_COUNT!='-1' && eSubstrCount(',c,m,b,', ",{$Opcion},")>0) ? '1,':'0,');
if( eSubstrCount($_COUNT, '(')>0 ) echo '_CountType = 2,';
if( isset($_WINFORM) ){
echo "_AutoSize=new Array({$_WINFORM[0]},{$_WINFORM[1]},'{$_WINFORM[2]}','{$_WINFORM[3]}'),";
}else{
echo "_AutoSize=new Array(0,0,'','{$_WINTITLE}'),";
}
$_ShowZero = SETUP::$Tab['ShowZero'];
if( mb_substr($FicheroD,-4)=='.ini' ){
echo '_ShowZero=1,'.$__Enter;
$_ShowZero = 1;
}else{
echo '_ShowZero='.$_ShowZero.','.$__Enter;
}
echo '_ShowZeroFields={';
if( isset($_ShowZeroFields) ){
$n=0;
foreach($_ShowZeroFields as $k=>$v){
if( $n++>0 ) echo ",";
echo "{$k}:{$v}";
}
}
echo "},".$__Enter;
if( isset($_ProgressFields) ){
if( $_ProgressFields=='' ){
qQuery("select seconds from {$_ENV['eDesDictionary']}gs_progress where script='{$OriFichero}' and md5=''");
list($n) = qRow();
if( $n>0 ) echo "_Progress={$n},";
}
echo "_ProgressTitle='{$_ProgressTitle}', _ProgressDetail='{$_ProgressDetail}', _ProgressFields='{$_ProgressFields}',";
}
echo '_3CXTab = '._PrintBoolean(!preg_match('/^(m|c|b)$/u', $Opcion) && SETUP::$System['Call3CXTab'] && !$GLOBALS["_3CX"]["_NO_"]).",";
echo '_ENTER = new Array();';
if( isset($_ENTER) ){
for($n=0; $n<count($_ENTER); $n++){
$tmp2 = explode(',', eNsp($_ENTER[$n]));
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
$n = 0;
foreach($_RADIO as $key=>$value){
foreach($value as $k=>$v){
if( $k=='DEL' && $v ){
if( $n++==0 ) echo 'var _Radio = new Array();';
echo "_Radio['__{$key}'] = true;";
}
}
}
echo "var _DBRange = new Array();";
for( $n=0; $n<count($_DBRANGE); $n++ ) echo "_DBRange['{$_DBRANGE[$n]}']=0;";
echo 'var _SaveList = new Array();';
if( $Opcion!='A' && $Opcion!='B' && $Opcion!='M' ){
foreach($_Objeto as $k=>$v){
$_Objeto[$k]['THSORT'] = false;
if( !empty($_Objeto[$k]['SLSORT']) ){
list($tmp1,$tmp2) = explode("|",$_Objeto[$k]['SLSORT']);
$_Objeto[$k]['SLSORT'] = trim($tmp1);
$_Objeto[$k]['THSORT'] = (mb_strtoupper(trim($tmp2))=="MANUAL");
}
if( empty($_Objeto[$k]['SLMENU']) && $_Objeto[$k]['nSLMENU']>0 ){
eMessage('Falta en el objeto "'.$k.'" la etiqueta "{SlMenu}"', 'HES'); eEnd();
}
}
}
if( count($_SaveList)>0 ){
for($n=0; $n<count($_SaveList); $n++){
$sSql = $_SaveList[$n];
while( eSubstrCount($sSql, '{')>0 ){
$ini = mb_strpos($sSql,'{')+1;
$fin = mb_strpos($sSql,'}');
$sCampo = trim(mb_substr($sSql, $ini, $fin-$ini));
$NewCampo = $sCampo;
if( $NewCampo[0]=='$' ) $NewCampo = mb_substr($sCampo,1);
if( $NewCampo[0]!='_' ){
$sSql = str_replace('{'.$sCampo.'}', $Fila[$NewCampo], $sSql);
}else{
$sSql = str_replace('{'.$sCampo.'}', $GLOBALS[$NewCampo], $sSql);
}
}
$_SaveList[$n] = $sSql;
echo '_SaveList[_SaveList.length] = "'.str_replace(', ',',',str_replace(' ,',',',$_SaveList[$n])).'";';
}
}
if( isset($_CLOSE_) || isset($_CLOSE) ) echo "var _CLOSE_ = '{$_CLOSE_}';";
echo 'var _Remote = '.( (isset($_REMOTE_)) ? 'true' : 'false' ).','.$__Enter;
echo '_FormStatic = '.( ($_FORMSTATIC) ? 'true' : 'false' ).';'.$__Enter;
if( $_gsCreate_ ) echo 'top._UltimaURL="";';
if( isset($_ChildrenData) ){
for($n=0; $n<5; $n++) $_ChildrenData[$n] = str_replace(', ',',',str_replace(' ,',',',$_ChildrenData[$n]));
$dCampos = '';
$oCampos = '';
$tmp = explode(',',$_ChildrenData[1]);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode('=',trim($tmp[$n]));
$dCampos .= $tmp2[0].',';
if( $tmp2[1]=='' ) $tmp2[1] = $tmp2[0];
$oCampos .= $tmp2[1].',';
}
$_ChildrenData[5] = _SubListGetImg($_ChildrenData[5]);
echo 'var _ChildrenData = new Array("'.$_ChildrenData[0].'","'.$_DBTABLE.'","'.$_DBINDEX.'","'.$dCampos.'","'.$oCampos.'","'.$_ChildrenData[2].'","'.$_ChildrenData[3].'","'.$_ChildrenData[4].'","'.trim(str_replace('"','\"',$_ChildrenData[5])).'"),';
}else{
echo 'var _ChildrenData = new Array(),';
}
echo '_DimChildrenData = new Array(),';
echo '_SaveOnLine = new Array(),';
echo '_OnLineIMG = new Array();';
if( count($_SaveOnLine)>0 ) for($n=0; $n<count($_SaveOnLine); $n++){
$txt = '';
list($txt2, $tmp) = explode('|', $_SaveOnLine[$n]);
$txt2 = trim($txt2).'|';
$tmp = explode(',',$tmp);
for($i=0; $i<count($tmp); $i++){
list($tmp2) = explode('=', $tmp[$i]);
$tmp2 = trim($tmp2);
if( !empty($txt) ) $txt .= ',';
$txt .= $tmp2;
}
$txt = $txt2.$txt;
echo '_SaveOnLine[_SaveOnLine.length] = "'.$txt.'";';
}
foreach($_OnLineIMG as $k=>$v) echo '_OnLineIMG["'.$k.'"] = "'.str_replace('"','\"',$v).'";';
$_SetTTR = array();
for($i=0; $i<count($_DimChildrenData); $i++){
for($n=0; $n<5; $n++) $_DimChildrenData[$i][$n] = trim($_DimChildrenData[$i][$n]);
$dCampos = '';
$oCampos = '';
$ok = false;
$_DimChildrenData[$i][1] = str_replace(', ',',',str_replace(' ,',',',$_DimChildrenData[$i][1]) );
$tmp = explode(',',$_DimChildrenData[$i][1]);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode('=',$tmp[$n]);
if( !empty($dCampos) ) $dCampos .= ',';
$dCampos .= trim($tmp2[0]);
if( empty($tmp2[1]) ) $tmp2[1] = $tmp2[0];
if( !empty($oCampos) ) $oCampos .= ',';
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
list( ,,$tmp2,,,$tmp5 ) = explode('|',$_Objeto[$_DimChildrenData[$i][0]]['SLMENU']);
$_DimChildrenData[$i][1] = trim($tmp2);
if( trim($oCampos)=='' ){
$tmp4 = '';
$tmp3 = '';
$DimTmp = explode(',',$tmp2);
for( $p=0; $p<count($DimTmp); $p++ ){
list($izq,$dch) = explode('=',$DimTmp[$p]);
if( !empty($tmp4) ){
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
trim(str_replace('"','\"',$_DimChildrenData[$i][5])).'","'.$ConPieLista.'");';
}
foreach($_OnLineOP as $k=>$v){
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
case 'b' :
$SubOp = 'bR';
$Titulo = $__Lng[85];
if( mb_substr($_sDBTABLE,-4)=='_dlt' ){
$Titulo = $__Lng[81];
$okTitulo = $Titulo;
}
break;
case 'c' : $SubOp = 'cR'; $Titulo=$__Lng[82]; break;
case 'm' : $SubOp = 'mR'; $Titulo=$__Lng[83]; break;
case 'A' : $SubOp = 'a' ; $Titulo=$__Lng[84]; break;
case 'B' : $SubOp = 'b' ; $Titulo=$__Lng[85]; break;
case 'M' : $SubOp = 'm' ; $Titulo=$__Lng[83]; break;
case 'l' : $SubOp = 'L' ; $Opcion='c'; $Titulo=$_TITLE; break;
case 'L' : break;
case 'q' : $SubOp = 'Q' ; $Titulo=$_TITLE; break;
case 'Q' : break;
case 's' : $SubOp = 'S' ; $Titulo=$_TITLE; break;
case 'S' : break;
default:
eMessage(str_replace('#',$Opcion,$__Lng[53]), 'HES');
}
if( SETUP::$System['CleanTitle'] ) $Titulo = $okTitulo;
echo "var _Accion='{$SubOp}',";
echo '_SelectMaxRows='.((isset($_SelectMaxRows)) ? $_SelectMaxRows : 11).',';
echo '_EnterForSubmit='.((isset(SETUP::$Tab['EnterForSubmit']) && SETUP::$Tab['EnterForSubmit']) ? 'true' : 'false').',';
echo "_CheckBoxSave=new Array('{$_CheckBoxSave[0]}','{$_CheckBoxSave[1]}','{$_CheckBoxSave[2]}'),";
if( isset($_CheckDBIndexFunc) ) echo "_CheckDBIndexFunc='{$_CheckDBIndexFunc}',";
if( isset($_CheckDBIndexDB) ) echo "_CheckDBIndexDB='{$_CheckDBIndexDB}',";
echo "_TargetUrl='{$_TargetUrl}';";
echo 'S(window).rule("+.SELECTMULTIPLEBOX {min-height:'.($_DefaultSize['TT']['H']+($_DefaultSize['CSS']['inputPaddingV']*2+1)).'px !important;}");';
if( isset($_GESAUX) ) include(DIREDES.'gesaux.js');
if( isset($_PDFLABELTOOLS) && $_PDFLABELTOOLS && count($_PDFLABELCF)==2 ){
?>
function eLabelSelect(){
S("#ETIQUETAS").css("display:block;zIndex:10;");
S(S.event(window)).around("#ETIQUETAS",null,true);
}
function _LabelSelect(){
var obj = S.event(window), c,f, o;
if( obj.tagName!='TD' ) return;
S("TD",S("#ETIQUETAS")).class("");
S(obj).class("EtiSel");
if( !S(":_PDFLabelCol").exists() ){
FRM1.appendChild( S.createHTML("<INPUT name='_PDFLabelCol' type='text' style='display:none'>") );
}
if( !S(":_PDFLabelRow").exists() ){
FRM1.appendChild( S.createHTML("<INPUT name='_PDFLabelRow' type='text' style='display:none'>") );
}
S.values({
_PDFLabelCol:obj.cellIndex,
_PDFLabelRow:obj.parentNode.rowIndex
});
S("#ETIQUETAS").none();
}
<?PHP
}
echo '</SCRIPT>';
$dimJS = ['binary.js', 'edicion.js'];
if( count($_FIELDBROWSER)>0 ) array_push($dimJS, 'fieldbrowser.js');
if( isset($_ChildrenData) || count($_SaveOnLine)>0 || count($_SaveList)>0 || !empty($_ObjetoID) ) array_push($dimJS, 'sublist.js');
if( $_ConED ) array_push($dimJS, 'ed.js');
if( $_CARDSHOW ) array_push($dimJS, 'card_tab.js');
_FileNoCache($dimJS); unset($dimJS);
echo '<script type="text/javascript" name=eDes>';
echo 'var _SubmitHidden = '.(($_SUBMITHIDDEN)? 'true':'false').';'.$__Enter;
if( !empty(SETUP::$System['TabListType']) ) echo "_TabListType='".SETUP::$System['TabListType']."';".$__Enter;
echo '</script>';
$n = 0;
foreach($_SUBSELECTMEMORY as $k=>$v){
if( $n==0 ) echo '<script type="text/javascript">';
$n=1;
echo "_SSMemory['{$k}'] = true;";
}
if( $n==1 ) echo '</script>';
if( !empty($_DCT_SUFFIX) ){
echo '<script type="text/javascript" name=eDes>';
echo "var _DCT_SUFFIX = '{$_DCT_SUFFIX}';";
echo '</script>';
}
if( isset($_SelectMultiple) || isset($_SELECTMULTIPLEFIELD) ){
echo '<script type="text/javascript" name=eDes>';
if( isset($_SelectMultiple) ) echo '_SelectMultiple='.(($_SelectMultiple)?'true':'false').';';
if( isset($_SELECTMULTIPLEFIELD) ) foreach( $_SELECTMULTIPLEFIELD as $k=>$v ) echo "_SelectMultipleField['{$k}']=true;";
echo '</script>';
}
if( count($_JSINCLUDE)>0 ){
foreach($_JSINCLUDE as $k=>$v){
if( mb_substr($k,-3)!='.js' ) $k .= '.js';
if( $k[0]=='$' ) $k = 'edes.php?R:'.$k.eSessionAddUrl();
if( !empty(SESS::$spider['opcion']) && function_exists("__Spider") ){
__Spider($k);
}
echo '<SCRIPT src="'.$k.'" name=JSInclude></SCRIPT>'.$__Enter;
}
unset($_JSINCLUDE);
}
if( !empty($_JSHEAD) ) _IncludeJsHtml($_JSHEAD, "JSHead");
if( !empty($_PHPHEAD) ){
$tmpFile = GrabaTmp('f_phphead', $_PHPHEAD, $LenDoc, $_FILE_PHPHEAD);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPHEAD);
}
$_HELP = 'top.gsHelpErr(window);'.$_HELP;
$gsEdition = '';
if( eSubstrCount(',c,b,m,a,mR,',",{$Opcion},")==1 ){
if( !empty($_ONLOAD) && mb_substr($_ONLOAD,-1)!=';') $_ONLOAD .= ';';
$_ONLOAD .= '_FrmCopy();';
}
if( !empty(SETUP::$System['WaterMarking']) ) $_WaterMarkingCSS = "background-image:url(".SETUP::$System['WaterMarking']."); background-repeat:no-repeat; background-attachment:fixed;";
if( isset($_JSONLOAD) ) $_ONLOAD .= '_JsOnLoad();';
if( !isset($_WaterMarkingCSS) ) $_WaterMarkingCSS = "";
echo "</HEAD><BODY class='BODYTAB SCROLLBAR' onclick='S.selectNone(window)' style='display:inline-table;";
echo "v-isibility:hidden; margin:0px; padding:0px;{$_WaterMarkingCSS}'";
if( $_CARDSHOW ){
echo " onresize='eCardResize()'";
$_ONLOAD .= 'eCardResizeWin();';
}
echo " onload='{$gsEdition}OkChange();{$_ONLOAD}'",
" onbeforeunload='OkSalir()'",
" ondragstart='return false'";
if( !empty($_TIPFORM['BODY']['F']) ){
$bTitle = $_TIPFORM['BUTTON']['F'];
if( $bTitle=='>' ){
echo " eHelp='#_TIP_F_BODY'";
}else{
echo " eHelp='{$bTitle}'";
}
}
if( !empty(SESS::$_D_) && !($OriFichero[0]=="$" && SESS::$_D_!="~") ){
echo " oncontextmenu='top.gsEdit(window)'";
}
echo " onmousemove='S.inactivity()'",
" ontouchstart='S.inactivity()'";
echo " onkeydown='S.help(window, event)'>".$__Enter;
?>
<s-spinner onclick="this.style.display='none'">
<span></span>
</s-spinner>
<?PHP
if( isset($_PDFLABELTOOLS) && $_PDFLABELTOOLS && count($_PDFLABELCF)==2 ){
echo "<TABLE id=ETIQUETAS border=0 cellspacing=1px cellpadding=0 onclick='_LabelSelect()' onmouseleave='this.style.display=\"none\"' style='display:none'>";
for( $f=0; $f<$_PDFLABELCF[1]; $f++ ){
echo '<TR>';
for( $c=0; $c<$_PDFLABELCF[0]; $c++ ){
if( $f==0 && $c==0 ){
echo '<TD class="EtiSel"></TD>';
}else{
echo '<TD></TD>';
}
}
echo '</TR>';
}
echo '</TABLE>';
}
if( !empty(SETUP::$System['commandJS']) || !empty(SESS::$commandJS) ){
eJS(SETUP::$System['commandJS'].SESS::$commandJS);
}
if( !empty($_JSINI) ) _IncludeJsHtml($_JSINI, "JSIni");
if( isset($_JSONLOAD) ){
$_JSONLOAD = 'function _JsOnLoad(){'.$__Enter.$_JSONLOAD.'}'.$__Enter;
_IncludeJsHtml($_JSONLOAD, "JSOnload");
}
if( !empty($_PHPINI) ){
$tmpFile = GrabaTmp('f_phpini', $_PHPINI, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
foreach($_TIPFORM as $k=>$v){
foreach($v as $k2=>$v2){
if( !empty($v['M']) ) continue;
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
echo '<span id="_TIP_'.$k2.'_'.$k.'" style="display:none;'.((!empty($_TIPFORM[$k]['W'])) ? 'width:'.$_TIPFORM[$k]['W'] : '').'">'.rtrim($v2).'</span>';
$v2 = '>';
$_TIPFORM[$k][$k2] = $v2;
}else{
$v2 = str_replace(array('"',"'"), array('&34;','&39;'), $v2);
$_TIPFORM[$k][$k2] = $v2;
}
}
}
$_TITLE = EnPlural($_TITLE, $Titulo, false, $_oTITLE);
$_TITLE = eTitleTransform($_TITLE);
$_LOGREQUEST['title'] = $_TITLE;
if( empty($_TargetUrl) ){
if( !empty($_PSOURCE) && SETUP::$System['WinNoTitle'] && $_PSOURCE!='WWORK' && $_GET["_NEWIFRAME"]!="1" ){
$_WINCAPTION = '#';
}
if( !empty($_WINCAPTION) && $_WINCAPTION=='#' ){
$_WINCAPTION = $_TITLE;
$_TITLE = '';
$_NOTITLE = true;
}
}else if( $_GET['_IWORK']==2 && !isset($_GET["_ISUBLIST"]) ){
$_ADDBUTTON[] = array("<i class=ICONINPUT op='ReturnIWORK'>F</i> ".$__Lng[176], "", "_ReturnIWORK()", "", "", "");
}
if( eSubstrCount($argv[0], '_ASSIGN='.$Opcion)==1 ){
$tmp = explode('&', urldecode($argv[0]));
for($n=2; $n<count($tmp); $n++){
$tmp1 = explode('=', $tmp[$n]);
if( trim($tmp1[0])!='_PSOURCE' ){
for($nc=0; $nc<count($_Form); $nc++){
list($Campo) = explode('{',$_Form[$nc][1]);
list($Campo) = explode(':',$Campo);
if( $Campo==$tmp1[0] && !empty(str_replace('"', '', str_replace("'", '', $tmp1[1]))) ){
if( eSubstrCount($_Form[$nc][6], '*')==0 ){
if( $_GET['_BAK']!='1' ) $_Form[$nc][6] = str_replace('A', '-', str_replace('M', '-', str_replace('Q', '-Q-', $_Form[$nc][6])));
}
if( ($tmp1[1][0]=='"' || $tmp1[1][0]=="'" ) && (mb_substr($tmp1[1],-1)=='"' || mb_substr($tmp1[1],-1)=="'" ) ){
$tmp1[1] = mb_substr($tmp1[1],1,-1);
}
$_Form[$nc][7] = $tmp1[1];
}
}
}
}
}
$Fila = '';
$Mandar = (eSubstrCount($Opcion, 'R')==1);
if( $Opcion=='q' || $Opcion=='s' ) $_ASSIGN = true;
if( !empty($_GET['_ADDFILTER']) ){
eInit();
$__='{#}eDes{#}';
include(DIREDES.'_lista.gs');
eEnd();
}
if( !empty($_JPCHECK) && eSubstrCount(",A,B,M,", $Opcion)>0 ){
include(DIREDES."jpcheck.inc");
}
$filePField = '../_tmp/php/'.str_replace('/', '_', $OriFichero).".{$_User}.snt";
if( eSubstrCount(',A,B,M,', $Opcion)==1 ){
list($_pField, $_CHR, $_EACCENT, $_UPLOADFILE, $_FILELOG) = unserialize(file_get_contents($filePField));
}else if( eSubstrCount(',a,bR,mR,', ",{$Opcion},")==1 ){
file_put_contents($filePField, serialize(array($_pField, $_CHR, $_EACCENT, $_UPLOADFILE, $_FILELOG)));
}
if( (eSubstrCount($Opcion, 'R')>0 || eSubstrCount('ABCMLQS', $Opcion)==1) ){
$_ABM = (eSubstrCount('ABM', $Opcion)==1);
if( $_ABM && isset($_TXTLOG) ) eTXTLOG($_TXTLOG, $_DBINDEX);
if( count($_DELFILTER)==0 ){
include_once(DIREDES.'abcm_f.inc');
}else{
include_once(DIREDES.'abcm_f2.inc');
}
if( function_exists("eAlterData") ){
eAlterData($_vF);
}
if( $_ABM ) $_Form = array();
if( !empty($_DBGATEWAY) ){
if( eSubstrCount($_DBGATEWAY, '?')>0 ){
$tmp = explode('?', $_DBGATEWAY);
$_sPasarela = eScript($tmp[0]);
}else if( eSubstrCount($_DBGATEWAY, '&')>0 ){
$tmp = explode('&', $_DBGATEWAY);
$_sPasarela = eScript($tmp[0]);
}else{
$_sPasarela = eScript($_DBGATEWAY);
}
$_DBGATEWAY = str_replace('= $', '=$', $_DBGATEWAY);
if( eSubstrCount($_DBGATEWAY, '=$')>0 ){
$tmp = explode('=', $_DBGATEWAY);
$tmp[1] = 'return ('.$tmp[1].');';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$tmp[1]);
$_DBGATEWAY = $tmp[0].'='.eval($tmp[1]);
$NomVar = explode('?', $tmp[0]);
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$tmp[1]);
${$NomVar[1]} = @eval($tmp[1]);
}
eInit();
include($_sPasarela);
eEnd();
}
}else{
Estadistica('Fic', 0, '', $_DBTABLE);
}
if( count($_OPTIONS)>0 ){
include_once(DIREDES.'options.inc');
_GenMenu($_OPTIONS);
}
if( count($_SubVentana)>0 ) GenVentanas($_SubVentana);
if( !empty($_PHPFORM) ){
if( !function_exists('ModFormulario') ){
$_PHPFORM = 'function ModFormulario(&$_Form, $Opcion, $Fichero, $nHoja, &$_vF, $_pField){'.CHR10.$_PHPFORM.'}';
$tmpFile = GrabaTmp('f_phpform', $_PHPFORM, $LenDoc, $_FILE_PHPFORM);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPFORM);
}
$DimForm = array();
for($i=0; $i<count($_Form); $i++){
$DimForm[_QueNmField($_Form[$i], $i)] = $_Form[$i];
}
if( function_exists('ModFormulario') ){
$_PHPFORMIN = true;
ModFormulario($DimForm, $Opcion, $Fichero, 1, $_vF, $_pField);
$_PHPFORMIN = false;
}else{
eTrace('ERROR en [PHPForm]');exit;
}
$_Form = array(); $n = 0;
foreach($DimForm as $key => $Valor){
if( count($DimForm[$key])>=11 || $Valor[0][0]=='{' ) $_Form[$n++] = $Valor;
}
}
echo $__Enter;
?>
<style>
*, INPUT, TEXTAREA {
box-sizing:content-box;
}
</style>
<?PHP
if( $_CARDSHOW ){
}else if( !SESS::$_BYPHONE ){
echo "<table id='PAGINA' style='border-collapse:collapse; width:100%; height:100%; background:transparent; display:".(($_ConRespuesta) ? 'none':'inline-table')."' valign='bottom' border=0px cellspacing=0px cellpadding=0px>";
echo '<tr><td'.(($_X>-1) ? '':' align=center').' id="Papel">';
}else{
?>
<style>
* {
box-sizing:content-box;
}
BODY {
padding:20px !important;
}
INPUT, LABEL, #LD {
margin-left:0px;
}
.TABFootButton {
text-align:left;
}
.AddButton {
margin-left:0px;
margin-top:15px;
}
</style>
<?PHP
}
if( !empty($_HTMINI) ) _IncludeJsHtml($_HTMINI, "HTMIni");
if( $_NOJS ){
eInit();
eHTML("F:{$OriFichero}", $Opcion, $_TITLE);
eLink($_CSS);
if( !empty($_CSSADD) ){
if( $_CSSADD[0]=='>' ){
echo '<style>'.$__Enter.mb_substr($_CSSADD,1).'</style>';
}else{
$tmp = explode(',',$_CSSADD);
for( $n=0; $n<count($tmp); $n++ ) echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/"._InVar(trim($tmp[$n])).".css' TYPE='text/css'>".$__Enter;
}
}
if( !empty($_CSSPRINT) ){
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/{$_CSSPRINT}.css' TYPE='text/css'>".$__Enter;
}else{
if( file_exists( "{$_PathCSS}/{$_CSS}_print.css" ) ) echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/{$_CSS}_print.css' TYPE='text/css' MEDIA='print'>".$__Enter;
}
if( !empty(SESS::$_D_) && SESS::$_D_!='D' && !$_gsCreate_ ) echo '<LINK REL="stylesheet" HREF="edes.php?R:$t/css/00.css'.eSessionAddUrl().'" TYPE="text/css">';
echo '</head><body>';
echo "<table id='PAGINA' style='display:inline-table; background:transparent;' WIDTH='100%' HEIGHT='100%' cellspacing=0px cellpadding=0px>";
echo '<tr><td align=center valign=middle>';
}
$LTitle = '';
if( !empty($_TIPFORM['TITLE']['L']) ){
$LTitle = $_TIPFORM['TITLE']['L'];
if( $LTitle=='>' ){
$LTitle = " onmouseenter=\"S(this).tip('#_TIP_L_TITLE',-1)\"";
}else{
$LTitle = str_replace(array('"',"'"), array('&34;',"&39;"), $LTitle);
$LTitle = " onmouseenter=\"S(this).tip('{$LTitle}',-1)\"";
}
if( !empty($_TIPFORM['TITLE']['T']) ) $LTitle .= ' TimeOff="'.$_TIPFORM['TITLE']['T'].'"';
}
?>
<?PHP
while( eSubstrCount($OriFichero,'{$')>0 ){
$p = mb_strpos($OriFichero, '{$');
$tmp = mb_substr($OriFichero, $p, mb_strpos($OriFichero, '}')-$p+1);
$OriFichero = str_replace($tmp, $GLOBALS[mb_substr($tmp,2,-1)], $OriFichero);
}
if( $_CARDSHOW ){
echo "\n<FORM accept-charset='utf-8' eType='Directo' NAME='FRM1' METHOD='POST'{$TipoAccion}{$_AutoCompletForm} spellcheck='false'>";
if( $_FORMACTION=='' ){
$_Action = "{$NomFile}?F{$SubOp}:{$OriFichero}";
$_AccionDIR = "{$NomFile}?F{$Opcion}:{$OriFichero}";
if( !empty($_GET["_SEL_"]) ) $_Action .= '&_SEL_='.$_GET["_SEL_"];
if( !empty($_GET["_AUX_"]) ) $_Action .= '&_AUX_='.$_GET["_AUX_"];
}else{
if( mb_strtoupper(mb_substr($_FORMACTION, mb_strlen($_FORMACTION)-4))=='.php' ) $_FORMACTION .= '?'.$SubOp.':';
$_Action = $_FORMACTION;
$_AccionDIR = $_FORMACTION;
}
echo "<div class='CARDBOX' e-padding='".implode(',',end($_CARDWIDTH))."'>";
function eCardWidth(){
global $_CARDWIDTH;
$txt = '';
$txt2 = '';
$n = 0;
for($i=0; $i<count($_CARDWIDTH); $i++) if( $_CARDWIDTH[$i]!=null ){
$n = $i;
break;
}
if( !empty($_CARDWIDTH[$n][1]) ) $txt2 .= "min-width:".($_CARDWIDTH[$n][1]*1)."px;";
if( !empty($_CARDWIDTH[$n][2]) ) $txt2 .= "max-width:".($_CARDWIDTH[$n][2]*1)."px;";
if( !empty($_CARDWIDTH[$n][0]) ) $txt .= " style='{$txt2}' eWidth='".$_CARDWIDTH[$n][0]."'";
if( !empty($_CARDWIDTH[$n][1]) ) $txt .= " eMinWidth='".$_CARDWIDTH[$n][1]."'";
if( !empty($_CARDWIDTH[$n][2]) ) $txt .= " eMaxWidth='".$_CARDWIDTH[$n][2]."'";
if( !empty($_CARDWIDTH[$n][3]) ) $txt .= " eUnique='".$_CARDWIDTH[$n][3]."'";
$_CARDWIDTH[$n] = null;
return $txt;
}
echo "<DIV class='card-header'{$LTitle}>";
$icono = $_URL_IN_MENU[$_Mode[0]];
if( !empty($icono) ){
echo '<TABLE border=0px cellspacing=0px cellpadding=0px width=100%><TR>';
echo "<td width=1px id='ICONTITLE' a=2>";
echo eIcon($icono, null, "WINDOWTITLEICON");
echo '<td>'.$_TITLE;
echo '</table>';
}else{
echo $_TITLE;
}
echo "</DIV>";
echo "<DIV class='card'".eCardWidth().">";
}else if( !SESS::$_BYPHONE ){
?>
<DIV id="TABContainer" on-mousewheel="return false;" style="display:inline-table;text-align:left;vertical-align:top;<?=(($_NOTITLE==true)?'margin:0px;':'')?>">
<TABLE id='TABBorder' border=0px cellspacing=0px cellpadding=0px class='TABStyle<?=(($_NOTITLE==true)?" NO_SHADOW":"")?>' style="<?=(($_NOTITLE==true)?'border:0px;':'')?>">
<TR<?=(($_NOTITLE==true || $_TITLE=="") ? ' style="display:none"' : '')?>>
<TD id='TABHeader' valign=top>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%>
<TR>
<TD a=1 class='TABHeaderTitle' id='TABHeaderTitle' onclick='_SetCaption("TD")'<?=$LTitle?>>
<?PHP
$icono = $_URL_IN_MENU[$_Mode[0]];
if( !empty($icono) && mb_strpos($icono, ".")!==false ){
echo '<TABLE border=0px cellspacing=0px cellpadding=0px width=100%><TR>';
echo "<td width=1px id='ICONTITLE' a=3>";
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
<TR><TD id='TABBody'>
<TABLE border=0px cellspacing=0px cellpadding=0px class='TABMiddle' id='TABBodyForm' style='border-collapse:collapse;'>
<TR><TD style='text-align:left;vertical-align:top;'>
<?PHP
}else{
echo "<DIV a=2 class='TABHeaderTitle' id='TABHeaderTitle'>{$_TITLE}</DIV>";
}
if( !empty($_CheckDBIndex) ){
$tmp = explode('|', $_CheckDBIndex);
if( count($_DBSERIAL)>0 ){
if( eSubstrCount($tmp[0], $_DBSERIAL[1])>0 ){
$tmp2 = explode(';', $tmp[0]);
if( $tmp2[0]==$_DBSERIAL[1] ) $tmp[0] = $tmp2[1];
$_CheckDBIndex = '';
for($n=0; $n<count($tmp); $n++) $_CheckDBIndex .= $tmp[$n].'|';
}
}else{
$tmp[0] = str_replace(';', ',', $tmp[0]);
$_CheckDBIndex .= '|';
}
$tmp2 = explode('|', $_DBTABLE);
if( mb_substr($_CheckDBIndex, -1)!='|' ) $_CheckDBIndex .= '|';
$_CheckDBIndex .= $tmp2[0];
if( $_CheckDBIndex[0]=='|' ){
$_CheckDBIndex = '';
}else{
$tmp2 = explode(';', $tmp[0]);
$tmp2 = explode(',', $tmp2[0]);
for($n=0; $n<count($tmp2); $n++) $_DimCheckDBIndex[$tmp2[$n]] = true;
}
}
if( $_PDFLABELTOOLS && !$_PDFLABEL ){
$_PDFLABELTOOLS = false;
foreach($_ADDCODE as $k=>$v) if( eSubstrCount($_ADDCODE[$k]['A'], 'g/label_sel.')>0 ) unset($_ADDCODE[$k]['A']);
}
if( !empty($_PERSISTENTVAR) && eSubstrCount($_PERSISTENTVAR, '_GetValue_(')>0 ){
$tmp = explode('_GetValue_(', $_PERSISTENTVAR);
for($n=1; $n<count($tmp); $n++){
list($k) = explode(')', $tmp[$n]);
if( !empty(${$k}) ) $v = ${$k};
elseif( !empty($_vF[$k]) ) $v = $_vF[$k];
elseif( !empty($_POST[$k]) ) $v = $_POST[$k];
else $v = '';
$_PERSISTENTVAR = str_replace("_GetValue_({$k})", $v, $_PERSISTENTVAR);
}
}else if( !empty($_GET[$_PERSISTENTVAR]) ){
$_pField[eMid($_PERSISTENTVAR, "&", "=")][_DEFAULT] = $_GET[$_PERSISTENTVAR];
}
if( empty($_EXTFORM) ){
if( !empty($_SAVEFORM) ) $SaveFormIni = mb_strlen(ob_get_contents());
$TipoAccion = '';
if( !$_CARDSHOW ){
echo "\n<FORM accept-charset='utf-8' style='margin-bottom:0px;padding-bottom:0px' eType='Directo' NAME='FRM1' METHOD='POST'{$TipoAccion}{$_AutoCompletForm} spellcheck='false'>";
if( $_FORMACTION=='' ){
$_Action = "{$NomFile}?F{$SubOp}:{$OriFichero}";
$_AccionDIR = "{$NomFile}?F{$Opcion}:{$OriFichero}";
if( $_GET["_SEL_"]<>"" ) $_Action .= '&_SEL_='.$_GET["_SEL_"];
if( $_GET["_AUX_"]<>"" ) $_Action .= '&_AUX_='.$_GET["_AUX_"];
}else{
if( mb_strtoupper(mb_substr($_FORMACTION, mb_strlen($_FORMACTION)-4))=='.php' ) $_FORMACTION .= '?'.$SubOp.':';
$_Action = $_FORMACTION;
$_AccionDIR = $_FORMACTION;
}
}
if( isset($_GET['_IMPORT']) ){
echo '<input type="text" name="__csv" efilename="Array" size="80" maxlength="80" eext="csv" ebyts="90000000" style="display:none">';
echo '<input type="file" name="_FILE___csv" style="display:none" onchange="_ImportFileSel()">';
}
if( $_CARDSHOW ){
}else if( SESS::$_BYPHONE ){
echo '<DIV id=TABNumber1 class="TABMiddle" cellspacing=0px cellpadding=0px border='.(($GLOBALS['_DEBUG']==3) ? '1px>':'0px>');
}else{
echo '<TABLE id="TABNumber1" class="TABMiddle" style="display:table; border-collapse:collapse;" cellspacing=0px cellpadding=0px border='.(($GLOBALS['_DEBUG']==3) ? '1px>':'0px>');
}
$_OnlyVisibleGroup = false;
$_HIDDENFIELDS = array();
$Campo1 = GenControles(1, $_Form, $_TITLE, $Opcion, $_TCol, $Mandar, true, 1, 1, 0, "TABNumber1");
if( preg_match('/^(c|m|b)$/u', $_Mode) && count($_HIDDENFIELDS)>0 ){
echo "<INPUT TYPE='hidden' NAME='_HIDDENFIELDS' value='".implode(",", $_HIDDENFIELDS)."'>";
}
if( count($_SaveList)>0 ){
echo "<TEXTAREA NAME='_SAVEDATALIST' COLS=80 ROWS=10 MAXLENGTH=2000 style='display:none'></TEXTAREA>";
}
if( isset($_SUBLISTDF) && count($_SUBLISTDF)>0 ){
echo '<INPUT TYPE="hidden" NAME="_PARENT_SUBLIST">';
}
_GeneraInputMD5($_DBRLOCK, $_Mode);
if( $_MemorizeFields && preg_match('/^(mR|bR|a)$/u', $_Mode) ){
$file = time();
file_put_contents('../_tmp/php/'.S::$_User."_".$file.".pf", serialize($_pField));
echo "<INPUT TYPE='hidden' NAME='_PFIELD' VALUE='{$file}'>";
}
if( $_CARDSHOW ){
}else if( SESS::$_BYPHONE ){
echo '</DIV>';
}else{
echo '</tr>';
echo '</table>';
}
if( !$_CARDSHOW ) echo '</form>';
if( $_CARDSHOW ){
?>
</div>
<div class="card-foot">
<?PHP $ConSubListado = _IconoSubmit($Opcion) ?>
</div>
<?PHP
echo '</div>';
echo "</div>";
echo '</form>';
}else if( !SESS::$_BYPHONE ){
?>
</TD></TR>
</TABLE>
</TD></TR>
<TR><TD class='TABFoot' width=100% style='vertical-align:top;height:1px;padding:0px;'>
<TABLE class='TABBottom' border=0px cellspacing=0px cellpadding=0px width=100%<?=(($_NOBUTTON)?' class=noButton':'')?> style="border-collapse:collapse;">
<TR>
<TD class='TABFootIcons' width=1px><?= _IconosPie($Opcion) ?></TD>
<TD class='TABFootButton'><?PHP $ConSubListado = _IconoSubmit($Opcion) ?></TD>
</TR>
</TABLE>
</TD></TR>
</TABLE>
</div>
<?PHP
}else{
echo "<DIV class='TABFootButton'>";
$ConSubListado = _IconoSubmit( $Opcion );
echo "</DIV>";
}
if( !empty($_SAVEFORM) ){
$fp = fopen( eScript($_SAVEFORM), 'w' );
fwrite( $fp, mb_substr(ob_get_contents(), $SaveFormIni )."\n<".'? $_PrimerCampo="'.$Campo1.'";'."\n" );
for($n=0; $n<count($_Form); $n++) if( !empty($_Form[$n][16]) ) fwrite( $fp, '$_Form['.$n.'][16]="'.$_Form[$n][16].'";'. "\n" );
fwrite( $fp, '?'.'>');
fclose( $fp );
}
}else{
if( empty($_FORMACTION) ){
$_Action = "{$NomFile}?F{$SubOp}:{$OriFichero}";
$_AccionDIR = "{$NomFile}?F{$Opcion}:{$OriFichero}";
}else{
if( mb_strtoupper(mb_substr($_FORMACTION, mb_strlen($_FORMACTION)-4))=='.php' ) $_FORMACTION .= '?'.$SubOp.':';
$_Action = $_FORMACTION;
}
include(eScript($_EXTFORM));
$Campo1 = $_PrimerCampo;
}
if( $_NOJS ){
echo '</center>';
echo '</td></tr></table>';
eEnd();
}
if( !empty($_HTMEND) ) _IncludeJsHtml($_HTMEND, "HTMEnd");
if( !SESS::$_BYPHONE ) echo '</table>';
if( count($_FIELDBROWSER)>0 ){
echo '<DIV id="SelBROWSER" class="SELECT EDITABLE SCROLLBAR" style="position:absolute" onmouseleave=_SelBrowseOut() onclick=_SelBrowseClick()><TABLE INIT=0 Pnt=0></TABLE></DIV>';
echo "<SCRIPT type='text/javascript'>SelBROWSER=DGI('SelBROWSER');</SCRIPT>".$__Enter;
}
echo '<SCRIPT type="text/javascript" name=eDes>';
_AjustaTamposToJS($_CalcularAnchos, $_eAlign, $_Form, $_CARDSHOW, $_DEBUG);
echo '</SCRIPT>';
echo '<SCRIPT type="text/javascript" name=eDes>';
for($n=0; $n<count($_Form); $n++) if( !empty($_Form[$n][7]) ){
if( !empty($_Form[$n][1]) && eSubstrCount(",{$oCampos},", ",{$_Form[$n][1]},")>0 ) echo "S.public(1); ePF('{$_Form[$n][1]}', '{$_Form[$n][7]}'); S.public();";
}
$xHojaV = 0;
echo 'HojasV = 0;';
echo "_Accion = '{$SubOp}';";
if( eSubstrCount($_AccionDIR, '&_PSOURCE')==0 ) $_AccionDIR .= "&_PSOURCE={$_PSOURCE}";
if( eSubstrCount($_AccionDIR, '&_FORMBUTTONS')==0 ) $_AccionDIR .= "&_FORMBUTTONS={$_FORMBUTTONS}";
$_Action = addslashes($_Action);
if( mb_substr($_Action,-1)!=')' && mb_substr($_Action,-2)!=');' ){
if( !empty($_PERSISTENTVAR) ) $_Action .= $_PERSISTENTVAR;
echo "_Action = '{$_Action}{$_TargetUrl}";
if( isset($_GET['_PERSISTENTDB']) ) echo '&_PERSISTENTDB='.$_GET['_PERSISTENTDB'];
if( $_GET["_SUBINSERT"]==1 ) echo '&_SUBINSERT=1';
if( !empty($_FORMACTION) ) echo '&_PSCRIPT='.$Opcion.':'.str_replace("../d/", "", $FicheroD);
if( eSubstrCount($_Action, '&_FORMBUTTONS')==0 ) echo "&_FORMBUTTONS={$_FORMBUTTONS}";
if( eSubstrCount($_Action, '&_PSOURCE')==0 ) echo "&_PSOURCE={$_PSOURCE}";
if( $_STOP ) echo '&_STOP';
if( $Opcion=='a' && isset($_GET['_ISUBLIST']) ) echo "&_ISUBLIST=1";
if( $Opcion=='a' && isset($_GET['_INSERTAUX']) ) echo "&_INSERTAUX=".$_GET['_INSERTAUX'];
echo "';";
}else{
echo "_Action = '{$_Action}";
echo "';";
}
eContextPut($_Action);
if( $_REQFILTER ) echo '_Filtrar = true;';
echo $__Enter;
$_Campo1 = '';
if( $Campo1!="#" && !$_ConRespuesta ){
if( eSubstrCount($Campo1,'[]')>0 ){
$Campo1 = mb_substr($Campo1, 0, mb_strlen($Campo1)-2);
}
$_Campo1 = $Campo1;
}
?>
function Oculta_Respuesta(){
<?PHP
if( $_WINCLOSE ){
if( !empty($_DBINSERT) && $_OkDBINSERT ){
$tmpFile = GrabaTmp('f_dbinsert', $_DBINSERT, $LenDoc);
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
echo 'top.eLoading(true,window);';
if( !empty($_PERSISTENTVAR) ) $_AccionDIR .= $_PERSISTENTVAR;
echo "window.location.href = top.S.urlAdd('{$_AccionDIR}');";
}
?>
}
<?PHP
if( $_X > -1 ){
echo 'with(vFICHA.style){';
echo 'position = "absolute";';
echo "left = px({$_X});";
echo "top  = px({$_Y});";
echo '}';
}
echo $__Enter;
?>
function eTabResize(){
S(".SELECT",window).none();
<?PHP
for($c=0; $c<count($_Form); $c++){
if( isset($_Objeto[$_Form[$c][1]]) && count($_Objeto[$_Form[$c][1]])>0 ){
if( $_Objeto[$_Form[$c][1]]['TTR']>-1 ){
echo "var Obj = DGI('c{$_Form[$c][1]}');";
echo "if( null!=Obj && Obj.offsetHeight>0 ) Obj.style.height = AltoNFilas('{$_Form[$c][1]}',".$_Objeto[$_Form[$c][1]]['TTR'].")+'px';";
}
}
}
?>
}
<?PHP  if( isset($_FchXPg_) && $_FchXPg_ ){ ?>
with(top.DGI("zFichaAux")){
rows[1].style.display = 'block';
rows[0].style.display = 'none';
}
<?PHP  } ?>
eTabResize();
<?PHP
echo '</SCRIPT>';
include_once($Dir_.'gen_condi.inc');
eEnd();
?>