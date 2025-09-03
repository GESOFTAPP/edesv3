<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
if(!$_ENV[SYS]['RegisterShutdown']){
register_shutdown_function('_ExitPHP');
$_ENV[SYS]['RegisterShutdown'] = true;
}
eInit();
$_DBLIMIT  = SETUP::$List['DBLimit'];
$_PDFLIMIT = SETUP::$List['PDFLimit'];
$_XLSLIMIT = SETUP::$List['XLSLimit'];
if( !isset($_SUBLISTADO_) ) $_SUBLISTADO_ = "";
if( !isset($_DEBUG) ) $_DEBUG = "";
if( !isset($_FieldsISubList) ) $_FieldsISubList = false;
if( !isset($_OPTIONSINLISTALL) ) $_OPTIONSINLISTALL = false;
$_DefaultSizeCols = false;
eLngLoad(DIREDES.'lng/list', '', 1);
include_once(DIREDES.'formulario.inc');
include_once(DIREDES.'message.inc');
if( empty($_GET["_CSSBIG"]) ){
@include("../_datos/config/width_css".SESS::$cssSufijo.".php");
}else{
$_CSSFontSize = $_GET["_CSSBIG"];
@include("../_datos/config/width_css_{$_CSSFontSize}.php");
}
if( !empty($_CACHEFILESRV) && file_exists( eScript($_CACHEFILESRV) ) ){
eMessage('~PDF', 'HS', '', 'try{_WOPENER.eHideBusy();}catch(e){}location.href=top.S.urlAdd("edes.php?D:'.$_CACHEFILESRV.'&_Source='.$OriFichero.'&_SubMode='.$_SubModo.'");');
exit;
}
if( isset($_REG_) ){
$_REG_ = str_replace(
array('&#60;', '&#62;', '%3E'),
array(  '<'  ,   '>'  ,  '>' ),
$_REG_
);
}
$_TargetUrl = (SETUP::$List['SubWindowInIWork'] ? '&_IWORK=2' : '');
$_NOEVENT = 0;
if( eSubstrCount($_SERVER['HTTP_REFERER'], 'df&_CAMPO_=')>0 && eSubstrCount($_SERVER['HTTP_REFERER'], '&_SEL_=')>0 ){
$url = $_SERVER['HTTP_REFERER'];
}else if( eSubstrCount($_SERVER['QUERY_STRING'], 'df&_CAMPO_=')>0 && eSubstrCount($_SERVER['QUERY_STRING'], '&_SEL_=')>0 ){
$url = $_SERVER['QUERY_STRING'];
}else $url='';
if( !empty($url) ){
$_SEL_ = urldecode(mb_substr($url, mb_strpos($url,'&_SEL_=')+7));
$_AUX_ = 'C';
if( eSubstrCount($url, '&_NOEVENT=1')>0 ) $_NOEVENT = 1;
}
if( isset($_GET['_ORDEN_']) ) $_ORDEN_ = $_GET['_ORDEN_'];
else if( isset($_POST['_ORDEN_']) ) $_ORDEN_ = $_POST['_ORDEN_'];
else $_ORDEN_ = "";
if( isset($_GET['_NOEVENT']) ) $_NOEVENT = $_GET['_NOEVENT'];
if( !isset($_AUX_) ) $_AUX_ = '';
if( !isset($_DESTINO_) ) $_DESTINO_ = '';
$_JS_ = (!isset($_JS_) ? '' : stripslashes($_JS_));
$_LToolsType = SETUP::$List['TypePaging'];
$_OptionsInListDefault = SETUP::$List['OptionsInListDefault'];
$_NOZEROALL = SETUP::$List['NoZeroAll'];
$_MaxVisibleRows = SETUP::$List['MaxVisibleRows'];
$_TopMaxRec = SETUP::$List['MaxRec'];
$_CURSOR = SETUP::$List['Cursor'];
$_GREENBAR = SETUP::$List['Greenbar'];
if( !isset(SETUP::$List['TitleInToolsvar']) ){
SETUP::$List['TitleInToolsvar'] = false;
}
$_TitleInToolsvar = SETUP::$List['TitleInToolsvar'];
if( !isset($_GET['_ADDFILTER']) ){
if( !isset($_FILTER) ) $_FILTER = '';
$_FILTER = str_replace(
array('&#34;', '&#39;'),
array(  '"'  ,   "'"  ),
$_FILTER
);
}else{
include_once(DIREDES.'condicion.inc');
$tmp = explode(" and ", $_GET['_ADDFILTER']);
list($campo, $valor) = explode("=", $tmp[0]);
$campo = trim($campo);
$valor = trim(eEntityDecode($valor));
if( $valor[0]=="'" || $valor[0]=='"' ){
$_POST[$campo] = mb_substr($valor,1,-1);
}else{
$_POST[$campo] = $valor;
}
}
if( isset($_POST["_EXPORTLIST"]) || isset($_GET["_EXPORTLIST"]) ){
$_gs_formato_ = array('XLS'=>'X', 'XML'=>'M', 'PDF'=>'P', 'PDFBW'=>'P&BW=1', 'MDB'=>'A', 'TXT'=>'T', 'CSV'=>'V')[mb_strtoupper($_POST["_EXPORTLIST"].$_GET["_EXPORTLIST"])];
}
$_DownloadPDF = $_gs_formato_;
$ElPuntoEsRem = true;
$EmptyList = false;
if( isset($_GET["_EMPTYLIST"]) ) $EmptyList = $_GET["_EMPTYLIST"];
$_gsObjetoAnterior = $_gsObjeto;
if( $Objeto=="Lv" ){
$VieneDeFicha = false;
$Opcion = "l";
$_SubModo = $Opcion;
$_OpcionReal = "v";
$FicheroD = eScript("/_tmp/pdf/".$_DF.'.def');
}else if( !isset($NomFile) ){
$_DELFILTER = array();
list($Opcion, $Fichero) = explode(':', $_Accion);
if( $_BinaryMode[$Opcion]<>"" ) $Opcion = $_BinaryMode[$Opcion];
$_OpcionReal = $Opcion;
$NomFile = mb_substr(mb_strrchr($_SERVER['PHP_SELF'],'/'), 1);
$VieneDeFicha = false;
if( $Opcion=="gl" ){
$Opcion = "cl";
$_SERVER["QUERY_STRING"] = str_replace("Lgl:", "Lcl:", $_SERVER["QUERY_STRING"]);
$EmptyList = true;
$_OPTIONSINLISTALL = true;
$_LToolsType = '';
}
$_SubModo = $Opcion;
$_SubMode = &$Opcion;
if( mb_substr($Fichero,-4)=='.gdf' ){
$_oSourceParent = 'G';
$_SourceParent = $Fichero;
$tmp2 = false;
$i = 0;
$_DimEDF = @OpenDF('../d/'.$Fichero);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( @LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( mb_strtoupper(mb_substr($buffer,0,5))=='[TAB]' && !$tmp2 ){
if( mb_strtoupper(trim($buffer))=="[TAB]" ){
$buffer = $_DimEDF[$nDimFCH+1];
}
$tmp = explode('|', mb_substr($buffer, mb_strpos($buffer,']')+1));
$tmp[2] = trim($tmp[2]);
if( eSubstrCount($tmp[2], '.')==0 ) $tmp[2] .= '.edf';
$Fichero = $tmp[2];
$tmp2 = true;
$i++;
}else if( mb_strtoupper(mb_substr($buffer,0,7))=='[TITLE]' ){
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
for($n=1; $n<3; $n++){
if( $tmp[$n]!="" && preg_match('/IWORK/iu', $tmp[$n]) ){
$tmp[$n] = trim(preg_replace('/IWORK/i',"",$tmp[$n]));
if( !preg_match('/^(b|c|m)$/u', $_Mode) ){
$_TargetUrl = '&_IWORK=2';
}
}
}
$i++;
}
if( $i>=2 ) break;
}
}
}
$OriFichero = $Fichero;
$Fichero = eScript($Fichero);
$FicheroD = $Fichero;
}else{
$OpcionBAK = $Opcion;
$_SubModo = str_replace('R', 'l', $Opcion);
$_TituloSubVentana = str_replace('&nbsp;', ' ', $_TITLE);
$VieneDeFicha = true;
$Opcion = 'l';
}
if( $_PSOURCE==$OriFichero ) $_PSOURCE = "WWORK";
$_FileDF = $OriFichero;
$_SubMode = &$_SubModo;
if( $Opcion=='ml' || $Opcion=='cl' ) $Opcion = 'l';
if( !isset($_DBSQL) ) $_DBSQL = '';
$_gsObjeto = 'L';
$_Modo = $Opcion;
$_Mode = &$_Modo;
$row = array();
$_vF = &$row;
$_pF = array();
$_TReg = 0;
if( !isset($_gs_formato_) ){
$_gs_formato_ = '';
}else{
if( eSubstrCount($_gs_formato_,'&BW=')>0 ){
list(,$BW) = explode('&BW=',$_gs_formato_);
list($BW) = explode('&',$BW);
}
$_gs_formato_ = $_gs_formato_[0];
if( isset($_GET['_gs_formato_']) ) $_GET['_gs_formato_'] = $_gs_formato_;
if( isset($_POST['_gs_formato_']) ) $_POST['_gs_formato_'] = $_gs_formato_;
}
if( !isset($_ExportType) ) $_ExportType = &$_gs_formato_;
$row = array();
$_gsINI_='';
$_DBTABLE  = '';
$_oDBTABLE = '';
$_DBINDEX = '';
$_DBSERIAL = array();
$_DBGROUPBY = '';
$_DBTABLERELATION = array();
$_DBFILTERIN = "";
$_DBEND = '';
$_DBLOG = array();
$_PAGTITLE = '';
$_PAGROTATE = false;
$_PAGMARGIN = '0.3,0.2,0.2,0.4';
$_COLSWIDTH = array();
$_userSetCOLSWIDTH = array();
$_ALIGN = array();
$_COLSCOLOR = array();
$_FORMAT = array();
$_FORMATPHP = '';
$_FORMATTOTALSPHP = '';
$_NOZERO = array();
$_NOZEROFORMATTOTALS = array();
$_Form = array();
$_Field = array();
$_pField = array();
$_pCol = array();
$_WINTITLE = '';
$_SHOWFILTER = false;
$_FOOTTITLE = '';
$_NOSORT = false;
$_ONLOAD = '';
$_TIPTD = array();
$_SLIDECOL = 0;
$_TOTALSROWS = false;
$_COLSOP = array();
$_oCOLSOP = array();
$_OpCol		= array();
$_OpSubCol	= array();
$_OpRegMedia = array();
$_TGrupos	= 0;
$_TantoPorCiento = false;
$_ColVirtual = array();
$_InfSinTotales = true;
$_GRID = array();
$_PHPGRID = '';
$_LISTCOMPARE = array();
$_LISTCOMPARETH = array();
$_PDFLISTCOMPARETH = array();
$_UPLOADFILE = array();
$_NOJS = false;
$_OldValGrupo= array();
$_TextGrupo = array();
$_GrupoColSpan = 1;
$_FORMATTOTALS = array();
$_FORMATTOTALSCS = 0;
$_ROWSOP = array();
$_OpLin		= 0;
$_OpLinCol	= 0;
$_EDITLIST = array('','','','','','','','');
$_LISTCHECKBOX = array();
$_CHR = array();
$_MSGANSWER = array();
$_MSGANSWEROK = false;
$_TITLEICON = array();
$_TITLENOUPPER = false;
$_WINCAPTION = '';
$_NOTITLE = false;
if( !isset($_CURSOR) ) $_CURSOR = false;
if( !isset($_GREENBAR) ) $_GREENBAR = false;
$_CSS = 'lista';
$_CSSADD = '';
$_CSSPRINT = '';
$_NOSELECTROW = false;
$_CHART = array();
$_CHARTGRID = '';
$_CHARTSWF = '';
$_CHARTJS = '';
$_CHARTCOL = array();
$_DefChartMS = array();
$_DimChartSWF = array();
$_DefChartSWF = array();
$_ConChartSWF = false;
$_CURSORTYPE = '';
$_EnLinea = array();
$_TmpEnLinea = array('','','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');
$_RELATIONFIELDS = array();
$_WHERESELECT = array();
$_MAXREC = '';
if( !isset($_NOTOOLS) ) $_NOTOOLS = '';
$_USERFUNCTION = '';
$_USERFILTERFUNCTION = '';
$_ADDOPTION = array();
$_SelVirtual = array();
$_SelVirtualStyle = array();
$_DEFAUX = array();
$_RADIO = array();
$_ISUBLIST = isset($_GET['_ISUBLIST']);
if( $_ISUBLIST==true ) $EmptyList = true;
$_TienePaginacion = false;
$_PERSISTENTVAR = '';
$_VIEWCOL = array();
$_HayRadio = false;
$_TIPTH = array();
$_TIPTHTOP = array();
$_HELP = CodeHELP($OriFichero, $Opcion);// Calcula la llamada de ayuda
$SubJsHtm = true;
$_ConLToos = true;
$_PDFPHP = '';
$_PDFCOL = array();
$_PDFCOLBORDER = array();
$_PDFWRAP = array(1,true,'');
$_PDFTH = array();
$_PDFCOLSSHADE = array();
$_PDFLABELHIDDEN = array();
$_PDFCONDITIONHIDDEN = array();
$_PDFVALUELHIDDEN = array();
$_PDFLABEL = array();
$_PDFCode = '';
$_PDFCCode = '';
$_PDFINCLUDE = array();
$_Variable = array();
$_CC = &$_Variable;
$_HayROWCOLOR = false;
$_ROWCOLOR = array();
$_EnVentana = false;
$_dEnVentana = array();
$_TEMPLATE = '';
$_Grupo = array();
$_PDFVAR = array();
$_PDFSAVEVAR = '';
$_THCOLSPAN = array();
$_DimTHText = array();
$_TH_td = array();
$_PrimerosReg = 0;
$_LABEL = array();
$_TIPFORM = array();
if( !isset($_DCT) ) $_DCT = array();
$_AddShowFilter = array();
$_AddShowFilterTop = true;
$_ClearShowFilter = false;
$_RowsMaxShowFilter = -1;
$_OrientationShowFilter = 'V';
$_DimInclude = array();
$_NombreInclude = '';
$_WORDBREAK = 'break-all';
$_OtroDiccionario = false;
$_JSDIM = array();
$_JSINCLUDE = array();
$_JSONCLICKROW='';
$_JSSELROW= '';
$_PHPFORM = '';
$_JSHEAD  = $_JSINI  = $_JSEND  = '';
$_HTMHEAD = $_HTMINI = $_HTMEND = '';
$_PHPHEAD = $_PHPINI = $_PHPEND = $_PHPSTART = '';
$_JSSYSTEM = "";
$_SORTLIST = '';
$_FieldsMix = false;
if( empty($_GET["_CSSBIG"]) ) $_CSSFontSize = "";
if( !$VieneDeFicha ) $DimDBRange = array();
$_ConDBRange = array();
$_HTMLENTITIES = array();
if( !isset($_LANGUAGE)	  ) $_LANGUAGE = array();
if( !isset($_LNGCOL) ) $_LNGCOL = 1;
if( !isset($_LNGCOLDEFAULT) ) $_LNGCOLDEFAULT = 1;
$_AUTOMENU = 0;
$_DimColumnas = false;
$_TITLE = $_TITLE2 = $_DBORDER = '';
if( !isset($_DBADDFILTER) ) $_DBADDFILTER = '';
$_TITLECONDI = &$_TITLE2;
$_ObjetoID = '';
$_Objeto = array();
$_ListTypeFormat = SETUP::$List['TypeFormat'];
$_ColsTrim = SETUP::$List['ColsTrim'];
$_OptionsInListMenuRow = SETUP::$List['OptionsInListMenuRow'];
$_ListToolsMenuType = SETUP::$List['ToolsMenuType'];
$_WideListing = ((SETUP::$List['WideListing']!="") ? SETUP::$List['WideListing']:0);
if( $_WideListing>0 ) $_ColsTrim = false;
$_OptionsInListLimit = SETUP::$List['OptionsInListLimit'];
$_OptionsInListMode = "";
$HaySelect = false;
$_SelectReal = array();
$_CellsStyle = array();
$_CellsClass = array();
$_ColsClass = array();
$_RowStyle = '';
$_RowClass = '';
$_RowDisabled = false;
$OrdASC = array();
$OrdDESC = array();
$_dimAling = array(""=>"left;", "l"=>"left;", "c"=>"center;", "r"=>"right;", "L"=>"left;", "C"=>"center;", "R"=>"right;");
$_EXPORTSCOPE = SETUP::$System["ExportScope"];
if( !isset($_SummaryType) ) $_SummaryType = -1;
$_SummaryData =  true;
$_SummaryTotal = true;
$_SummaryGroupLabel = array(1,1,1,1,1);
$_SummaryGroupTotal = array(1,1,1,1,1,1);
$_SummaryGroupTitle = array('','','','','','');
$_SummaryNoHeaders = false;
$_SummaryCol = 0;
$_SummaryGroup = -1;
if( !isset($_RowsOnPage) ) $_RowsOnPage = "";
$_RowsOnPageBak = $_RowsOnPage;
if( SETUP::$System["CheckboxShowUnChecked"] ){
$_LISTCHECKBOX['H'] = "";
$_LISTCHECKBOX['H'][1] = true;
}
$_gsFIN_='';
if( !isset($_REG_) ){
$tmp = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.";
if( file_exists($tmp.'cur') ) @unlink($tmp.'cur');
if( file_exists($tmp.'sql') ) @unlink($tmp.'sql');
if( file_exists($tmp.'var') ) @unlink($tmp.'var');
}
$TipoEntrada = '#';
$SaltarLinea = false;
$_URL_IN_MENU = eGetOpcions();
$DimOpcion =  array($Opcion, '*');
if( $_ISUBLIST ){
array_push($DimOpcion, 'iSubList');
array_push($DimOpcion, "isl");
$_ListToolsMenuType = "";
$_WideListing = 0;
}
if( eSubstrCount(',l,cl,bl,ml,', ",{$Opcion},")>0 ) array_push($DimOpcion, 'L');
if( $_SubModo!=$Opcion ){
array_push($DimOpcion, $_SubModo);
}else{
array_push($DimOpcion, 'L');
array_push($DimOpcion, 'l');
}
if( eSubstrCount(',cl,bl,ml,', ",{$_SubModo},")>0 ){
array_push($DimOpcion, '?l');
array_push($DimOpcion, '*l');
if( !empty($_GET['_gs_formato_']) ){
array_push($DimOpcion, $_GET['_gs_formato_']);
if( $_GET['_gs_formato_']=='X' ) array_push($DimOpcion, 'XLS');
if( $_GET['_gs_formato_']=='P' ) array_push($DimOpcion, 'PDF');
if( $_GET['_gs_formato_']=='A' ) array_push($DimOpcion, 'MDB');
if( $_GET['_gs_formato_']=='T' ) array_push($DimOpcion, 'TXT');
if( $_GET['_gs_formato_']=='M' ) array_push($DimOpcion, 'XML');
}else{
array_push($DimOpcion, 'H');
array_push($DimOpcion, 'HTM');
}
}
array_push($DimOpcion, 'u'.$_User, 'n'.$_Node);
if( !empty(SESS::$_TreeList) ){
$tmp = explode(',',SESS::$_TreeList);
for($n=0; $n<count($tmp); $n++) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( !empty(SESS::$_Development) ) array_push($DimOpcion, 'd');
if( SESS::$_WebMaster==$_ENV['ON'] ) array_push($DimOpcion, 'w');
if(	SESS::$_SystemUser==$_ENV['ON'] ) array_push($DimOpcion, 'S');
if( SESS::$_D_!="" ) array_push($DimOpcion, 'D');
$_ePermission = $DimOpcion;
$_FixList = SETUP::$List['FixList'];
if( (!empty($_POST['_dynamic_generation']) && $_POST['_dynamic_generation']==$_ENV['ON'])
||
(!empty($_GET['_dynamic_generation'])  && $_GET['_dynamic_generation']==$_ENV['ON'])
){
$_GET['_dynamic_generation'] = $_ENV['ON'];
include_once( $Dir_.'a/d/list_gen.php' );
}else if( mb_substr($FicheroD,-4)=='.tbl' ){
include_once("{$Dir_}t/credf.inc");
$FicheroD = str_replace('\\', '/', $FicheroD);
$_AddCreateEDF = '';
error_reporting(_ERROR_REPORTING);
include_once('../_d_/cfg/edes.ini');
error_reporting(5);
if( $_AddCreateEDF!="" ) $_AddCreateEDF .= "\n";
if( empty($_Sql) ){
include("../_datos/config/sql.ini");
$_SqdDefinitionFile = "../_datos/config/sql.ini";
}
$_DimEDF = CreaFCH($_Sql, $_SqlPDOType, $_AddCreateEDF, str_replace('.tbl','',str_replace('../d/','',$FicheroD )), $Opcion);
}else{
$_DimEDF = @OpenDF($FicheroD);
}
if( file_exists(eScript("{$_FileDF}.lng")) ){
eLngLoad(eScript("{$_FileDF}.lng"), '', 2);
}elseif( file_exists(eScript("{$_ENV[SYS]['DF']}.lng")) ){
eLngLoad(eScript("{$_ENV[SYS]['DF']}.lng"), '', 2);
}
include(DIREDES."parse_begin.php");
$_SanitizarGet = array();
$_CallLabel = "";
$ElPuntoEsRem = true;
$sElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
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
list( $buffer, $VerError ) = explode('|', $buffer);
while( eSubstrCount($buffer, '{$') > 0 ){
$p = mb_strpos( $buffer, '{$' );
$tmp = mb_substr($buffer,$p,mb_strpos($buffer, '}')-$p+1);
$index = mb_substr($tmp,2,-1);
if( !empty($GLOBALS[$index]) ){
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
$ordChar = (empty($Chr_1)) ? 32 : mb_ord($Chr_1);
switch( $ordChar ){
case 91:
$sElPuntoEsRem = true;
$ElPuntoEsRem = true;
if( $TipoEntrada=='_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
}
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
switch( $Etiqueta ){
case 'WINSPLITE':
if( !$OkModo ) break;
$_WINSPLITE = explode(",", eNsp($tmp[1]).",uIFRAME".str_replace(".","",(string)microtime(true)));
$_HTMINI .= "<table border=0 cellspacing=0 cellpadding=0 style='width:100%; height:99.9%; display:inline-table;'>
<tr><td style='width:{$_WINSPLITE[0]}; text-align:center; vertical-align:top'>";
$_HTMEND .= "</td><td>&nbsp;&nbsp;</td>
<td id='_{$_WINSPLITE[2]}' style='width:{$_WINSPLITE[1]}; text-align:center; vertical-align:top'>
<SCRIPT>
top.eNewIframe(window, '_{$_WINSPLITE[2]}', '{$_WINSPLITE[2]}', 'edes.php?R:/_datos/config/empty_page.htm');
</SCRIPT>
</td>
</tr>
</table>";
$_WINSPLITE[3] = (isset($tmp[2]) && strtolower($tmp[2])=="autorun");
$_WINSPLITE[4] = $tmp[3];
$_WideListing = 0;
break;
case 'CC':
eExplodeOne($buffer, '|', $txt1, $txt2);
$_Variable[$tmp[0]] = _ExeEval($txt2, $buffer);
break;
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval($tmp[1], $buffer, 1);
break;
case 'PHPSESSION':
if( !empty($tmp[1]) ) $_PHPSESSIONMSG = $tmp[1];
$tmp2 = explode(',', eNsp($tmp[0]));
for($n=0; $n<count($tmp2); $n++){
list($vCkeck,$vSession) = explode('=',$tmp2[$n]);
if( !empty(SESS::${$vSession}) ) $_PHPSESSION[$vCkeck] = SESS::${$vSession};
}
break;
case 'AUTOMENU':
if( $OkModo && !SETUP::$Desktop['MenuAutoHidden'] ) ${$Comando} = (!empty($tmp[1])) ? $tmp[1] : 1;
break;
case 'ONLOAD':
if( $OkModo ) ${$Comando} = $tmp[1].";";
break;
case 'DEBUG':
if( $OkModo ) _Debug($tmp);
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
if( $tmp[2]!="" ) $tmp[2] = ".".$tmp[2];
$tmp[3] = str_replace("/", "_", $OriFichero).".".$hMode.$tmp[2];
if( mb_strlen($tmp[1])==1 ){
if( $tmp[1]=="H" ){
$click = "top.gsHelp(\"{$tmp[3]}\", event, this.getAttribute(\"eCtrlKey\"))";
}else{
$click = "_HelpMenu(\"{$tmp[1]}\", null, this, null, null, \"{$tmp[3]}\")";
}
}else{
$click = "gsHelp(\"{$tmp[3]}\", \"{$tmp[1]}\", event)";
}
unset($hMode);
$_TITLEICON[] = "<i id=ListHelpIcons class='ICONINPUT'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick='{$click}' title='Ayuda' style='cursor:var(--cPointer)'>&#162;</i>";
break;
}
$img = "<i class='ICONINPUT' id=ListHelpIcons title='Ayuda' style='cursor:var(--cPointer)'{$txt} ".((mb_strlen($tmp[1])==1)? "oncontextmenu='_SetDownload()' ":"")." onclick=\"";
$tmp[3] = str_replace(array("'", '"'), array("\\'", '&#34;'), $tmp[3]);
if( mb_strlen($tmp[1])==1 ){
if( $tmp[4]=='' ){
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, '".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."'";
}else{
$img .= "_HelpMenu('".$tmp[1]."', 0,0,0,null, ['".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."']";
}
}else{
$img .= "top.eMenu(window, this, {'-':'Ayuda'";
if( eSubstrCount($tmp[1],'H')>0 ) $img .= ",'H':'[g/help_htm.png]Ver ayuda'";
if( eSubstrCount($tmp[1],'P')>0 ) $img .= ",'P':'[g/help_pdf.png]Ayuda en formato PDF'";
if( eSubstrCount($tmp[1],'V')>0 ) $img .= ",'V':'[g/help_avi.png]Video tutorial'";
if( eSubstrCount($tmp[1],'C')>0 ) $img .= ",'C':'[g/help_chm.png]Ayuda en formato CHM'";
$img .= "}, _HelpMenu";
$img .= ",0,0,['".(($tmp[3]=='') ? mb_strtolower("{$OriFichero}_{$_Modo}") : $tmp[3])."','".$tmp[4]."'], null, _SetDownload";
}
$tmp[1] = $img.')">&#162;</i>';
}
$_TITLEICON[] = $tmp[1];
}
break;
case 'ITOOLS':
if( $OkModo ){
array_shift($tmp);
$_iToolsAdd = implode('|', $tmp);
}
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
case 'DBREADROW':
if( $OkModo ) $_DBREADROW = $tmp[1];
break;
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
eMultitenancy($tmp[0]);
$_sDBTABLE = $tmp[0];
if( isset($tmp[1]) ) $_ISUBLISTSUFIJO = $tmp[1];
case 'TITLE2':
case 'DBORDER':
case 'DBGROUPBY':
case 'WINTITLE':
case 'PAGTITLE':
${$Comando} = $tmp[0];
break;
case 'FORMBUTTONS':
${$Comando} = $tmp[0];
if( !empty($tmp[1]) ) $_FORMBUTTONSDELETE = $tmp[1];
break;
case 'CHARTGRID':
$_CHARTGRID = $tmp[0];
break;
case 'FOOTTITLE':
case 'SUBTITLE':
if( $_NOTITLE==true ) break;
${$Comando} = $tmp[0];
break;
case 'PERSISTENTVAR':
${$Comando} = eNsp($tmp[0]);
break;
case 'SHOWFILTER':
$_SHOWFILTER = ($tmp[0]=='' || eSubstrCount(",{$tmp[0]},", ",{$_SubModo},")>0 || eSubstrCount(",{$tmp[0]},", ",{$Opcion},")>0 || $tmp[0]=='*' );
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
$_TITLETOEXTRACT = $_TITLE;
$_LOGREQUEST['title'] = $_TITLE;
$i = count($tmp);
if( $i>2 && mb_strlen($tmp[2])<3 ){
$_SHOWFILTER = eOkMode($Opcion, $tmp[2], $_SubModo);
$tmp[2] = '';
}else if( $i>1 && mb_strlen($tmp[1])<3 ){
$_SHOWFILTER = eOkMode($Opcion, $tmp[1], $_SubModo);
$tmp[1] = '';
}
if( $i>2 && !empty($tmp[2]) && mb_strlen($tmp[2])>2 ){
$txt = $tmp[2];
if( mb_substr($txt,-1)==')' || mb_substr($txt,-2)==');' ){
list( $_VerUserCondiciones ) = explode('(',$txt);
$_VerUserCondiciones = trim($_VerUserCondiciones);
}else if( mb_strtoupper($tmp[2])!='NOTITLE' ){
$_TITLE = $_oTITLE = $tmp[2];
}
}else if( $i>1 && !empty($tmp[1]) && mb_strlen($tmp[1])>2 ){
$txt = $tmp[1];
if( mb_substr($txt,-1)==')' || mb_substr($txt,-2)==');' ){
list( $_VerUserCondiciones ) = explode('(',$txt);
$_VerUserCondiciones = trim($_VerUserCondiciones);
}else if( mb_strtoupper($tmp[1])!='NOTITLE' ){
$_TITLE = $_oTITLE = $tmp[1];
}
}
if( mb_strtoupper($_TITLE)=='NOTITLE' ){
$_TITLE = '';
if( !empty($_PSOURCE) && $_PSOURCE!='WWORK' ) $_NOTITLE = true;
}else if( !empty($_PSOURCE) && $_PSOURCE!='WWORK' && mb_strtoupper($tmp[$i-1])=='NOTITLE' ){
$_WINCAPTION = '#';
}
break;
case 'DBLIMIT':
for($i=0; $i<count($tmp); $i++) $tmp[$i] = str_replace('.', '', $tmp[$i]);
if( $_NOTITLE==true ){
list($L) = explode(',', $tmp[0]);
$_DBLIMIT = (int)$L;
break;
}else{
list($L, $XP, $PP, $_PrimerosRegTxt) = explode(',', $tmp[0].",,,");
if( $_MAXRECFULL ){
$_DBLIMIT = (int)$L;
break;
}
}
if( $XP<0 ){
$_LimitOn = true;
$_PrimerosReg = $XP;
$XP = '';
$PP = '';
if( $_PrimerosRegTxt=='' ) $_PrimerosRegTxt = 'Muestra de # Registros';
}
$_DBLIMIT = (int)$L;
if( !empty($XP) ){
unset($_MaxVisibleRows);
$_RowsOnPage = (int)$XP;
if( !empty($PP) ) $_MaxRowsOnPage = (int)$PP;
}
break;
case 'MAXREC':
list($sMAXREC, $sMaxRowsOnPage) = explode(',', $tmp[0]);
if( trim(mb_strtoupper($sMAXREC))=='FULL' ){
$_MAXRECFULL = true;
if( $sMaxRowsOnPage>0 ) $_MaxVisibleRows = $sMaxRowsOnPage;
if( $tmp[1]==-1 )$_LimitOn = true;
break;
}
if( $_NOTITLE==true ) break;
if( !empty($tmp[2]) ){
$_FunctionNextPage = $tmp[2];
if( !empty($_FunctionNextPage) && mb_substr($_FunctionNextPage,-1)!=')' ) $_FunctionNextPage .= '()';
}
if( !empty($tmp[1]) ){
$_FunctionLastPage = $tmp[1];
if( !empty($_FunctionLastPage) && mb_substr($_FunctionLastPage,-1)!=')' ) $_FunctionLastPage .= '()';
}
$_MAXRECINCREMENT = (mb_strtoupper($tmp[3])=='INCREMENT');
if( empty($tmp[0]) ) break;
unset($_MaxVisibleRows);
list($_MAXREC, $sMaxRowsOnPage) = explode(',',$tmp[0]);
$_MAXREC = trim($_MAXREC);
$_RowsOnPage = $_RowsOnPageBak;
if( $_MAXREC[0]=='-' || $_MAXREC[0]=='+' ){
$_RowsOnPage = $_RowsOnPage+(1*$_MAXREC);
}else if( $_MAXREC==0 ){
$_RowsOnPage = $_DBLIMIT;
}else{
$_RowsOnPage = $_MAXREC;
}
$sMaxRowsOnPage = trim($sMaxRowsOnPage);
if( $sMaxRowsOnPage[0]=='-' || $sMaxRowsOnPage[0]=='+' ) $sMaxRowsOnPage = $_MaxRowsOnPage+(1*$sMaxRowsOnPage);
if( !empty($sMaxRowsOnPage) ){
$_MaxRowsOnPage = (int)$sMaxRowsOnPage;
}else{
$_MaxRowsOnPage = $_RowsOnPage*2;
}
break;
case 'DBSERIAL':
$_DBSERIAL = array($_DBTABLE, $tmp[0], '');
if( $_DBINDEX=='') $_DBINDEX = $tmp[0];
break;
case 'SAVETRACE':
${$Comando} = $OkModo;
break;
case 'TIPTH':
if( eSubstrCount($tmp[0], '=')>0 ){
if( !isset($_TIPTHCALC) ) $_TIPTHCALC = array();
$stmp = explode(',',$tmp[0]);
for($n=0; $n<count($stmp); $n++) $_TIPTHCALC[] = $stmp[$n];
}else{
$_TIPTH = $tmp;
}
break;
case 'SANITIZE':
call_user_func("eCall_".$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'CHANGEFILTER':
if( !isset($tmp[2]) ) $tmp[2] = "";
if( !isset($tmp[3]) ) $tmp[3] = "";
if( !isset($tmp[4]) ) $tmp[4] = "";
$_CHANGEFILTER[$tmp[0]] = array($tmp[1], $tmp[2], mb_strtoupper($tmp[3]), $tmp[4]);
if( $_CHANGEFILTER[$tmp[0]][2]=="MEMORY" ){
$_CHANGEFILTERMEMORY = $tmp[0];
$_CHANGEFILTERDATA = $tmp[1];
$_CHANGEFILTERFULL = (mb_strtoupper($tmp[4])=="FULL");
$_CHANGEDIM = array();
}
break;
case 'CHARTCOL':
if( $tmp[1]=='' ) $tmp[1] = 100;
${$Comando} = $tmp;
break;
case 'CHARTROW':
if( $tmp[2]=='' ) $tmp[2] = 100;
case 'TIPTHTOP':
case 'ACCESSFIELDS':
case 'LISTCOMPARE':
case 'VIEW':
${$Comando} = $tmp;
break;
case 'THCOLSPAN':
if( count($_THCOLSPAN)==0 ){
$_THCOLSPAN = $tmp;
}else{
$_THCOLSPAN = array_merge($_THCOLSPAN, $tmp);
}
for($n=count($_THCOLSPAN)-1; $n>=0; $n--){
if( trim($_THCOLSPAN[$n])=="" ) unset($_THCOLSPAN[$n]);
}
break;
case 'LISTCHECKBOX':
$_LISTCHECKBOX[mb_strtoupper($tmp[0])] = array($tmp[1],$tmp[2]);
break;
case 'CHARTGOOGLE':
$tmp[2] = eNsp($tmp[2]);
if( count($tmp)>9 ) $_CHARTGOOGLE[] = implode("|",$tmp);
break;
case 'CHART':
$_CHART[] = mb_substr( $buffer, $i+1 );
$tmp = explode('|', mb_substr( $buffer, $i+1 ) );
for( $i=0; $i<count($tmp); $i++ ) $tmp[$i] = trim($tmp[$i]);
if( $tmp[0]=='*' || eSubstrCount($tmp[0],',') >0 || $tmp[0]==((float)$tmp[0]).'' ){
$_DefChartMS[] = $tmp;
$TipoEntrada = '_CHARTJS';
if( !empty($_CHARTJS) ) $_CHARTJS .= "\n[CHARTJS:nl]\n";
$JsHtm = true;
}else{
$_DefChartSWF[] = $tmp;
$TipoEntrada = '_CHARTSWF';
if( !empty($_CHARTSWF) ) $_CHARTSWF .= "\n[CHARTSWF:nl]\n";
$JsHtm = false;
$_ConChartSWF = true;
}
break;
case 'GRAPH':
$_GRAPH = $tmp;
break;
case 'DBLOG':
if( preg_match('/^FULL$/iu',$tmp[0]) ){
$_LOGREQUEST = array("object"=>$_Object, "mode"=>$_Mode, "script"=>$_DF, "get"=>$_GET, "post"=>$_POST);
$_LOGFULLSTATUS = true;
$_LOGFULLTYPE = 3;
break;
}
$_DBLOG = explode(',', $tmp[0]);
break;
case 'NOSORT':
$_NOSORT = true;
break;
case 'PROGRESS':
$_ProgressFields = eNsp($tmp[0]);
$_ProgressTitle = $tmp[1];
$_ProgressDetail = $tmp[2];
break;
case 'NOJS':
case 'STOP':
case 'PAGROTATE':
case 'TOTALSROWS':
case 'NOSELECTROW':
${$Comando} = true;
break;
case 'SLIDECOL':
$_SLIDECOL = abs(((float)$tmp[0]==0)? 1 : (float)$tmp[0]);
if( $_SLIDECOL<1 ) $_SLIDECOL = 1;
break;
case 'JSONLOAD':
if( isset($_JSONLOAD) ) break;
case 'JSONCLICKROW':
if( !empty($tmp[1]) && eSubstrCount($tmp[1], $_PSOURCE)==0 && !($_JSONCLICKROW=='' && mb_strtoupper($tmp[1])=='ELSE') ) break;
if( !$OkModo ) break;
$_JSONCLICKCOL = eNsp($tmp[2]);
case 'DBSELREC':
case 'DBSQL':
case 'DBEND':
case 'HTMEND':
case 'HTMHEAD':
case 'HTMINI':
case 'JSEND':
case 'JSHEAD':
case 'JSINI':
case 'JSSELROW':
case 'phpstart-no':
case 'PHPEND':
case 'PHPFORM':
case 'PHPHEAD':
case 'PHPINI':
case 'PHPNEXTPAGE':
if( !empty($tmp[2]) && mb_strtoupper($tmp[2])!='UNIQUE' && $Comando<>"_JSONCLICKROW" && $Comando<>"_DBEND" ){
if( $tmp[2][0]=="#" ){
if( !$_Variable[$tmp[2]] ) break;
}else{
if( !eval("return {$tmp[2]};") ) break;
}
}
if( !empty($tmp[1]) && eSubstrCount($tmp[1],$_PSOURCE)==0 && !(${$Comando}=='' && mb_strtoupper($tmp[1])=='ELSE') ) break;
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
case 'PDFINCLUDE':
if( !empty($tmp[1]) ) $_PDFADDMARGENTOP = $tmp[1];
$_PDFCCode = mb_strtoupper($tmp[0]);
if( in_array($_PDFCCode, explode(',','MAIN,M,START,S,FIRST-BEGIN,FB,FIRST-AFTER,FA,EACH-BEGIN,EB,EACH-AFTER,EA,LAST-BEGIN,LB,LAST-AFTER,LA,END,E,FIRST-HEADER,FH,EACH-HEADER,EH') )){
if( mb_strlen($_PDFCCode)>2 ){
$tmp = explode('-', $_PDFCCode);
$_PDFCCode = $_PDFCCode[0];
if( !empty($tmp[1]) ) $_PDFCCode .= $tmp[1];
}
$TipoEntrada = '_PDFCode';
$JsHtm = false;
}
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', eNsp($tmp[0]).";;");
$_DBINDEX  = eNsp($_DBINDEX);
$_DBINDEX2 = eNsp($_DBINDEX2);
$_DBINDEX3 = eNsp($_DBINDEX3);
break;
case 'DBINSERTONLY';
if( count($_DBSERIAL)>0 ) $_DBINSERTONLY = true;
break;
case 'FIELDS':
if( mb_strtoupper($tmp[0])=='CARD' ){
if( SETUP::$List['CardSwitch'] ){
$_CARDSHOW = true;
$dimCard = array();
$_FormCard = array();
$_pFieldCard = array();
$TipoEntrada = '_FIELDSCARD';
if( mb_strtoupper($tmp[1])=='DEFAULT' ){
$_CARDLISTDEFAULT = true;
}
}
break;
}
if( !empty($tmp[2]) ){
if( preg_match('/GRID/iu', $tmp[2]) ){
$_SET_BORDER_LEFT = true;
}
if( preg_match('/TFOOT/iu', $tmp[2]) ){
$_SET_TFOOT = true;
}
}
if( !isset($tmp[0]) ) $tmp[0] = "";
if( !isset($tmp[1]) ) $tmp[1] = "";
if( !isset($tmp[2]) ) $tmp[2] = "";
if( !empty($tmp[0]) && !preg_match('/(XLS|XML|PDF|MDB|TXT|CSV)/iu', $tmp[0]) && $Opcion=='l' && ($tmp[0]=='?' || $tmp[0][0]=='c' || $tmp[0][0]=='b' || $tmp[0][0]=='m') && eSubstrCount(',cl,bl,ml,',",{$tmp[0]},")==0 ){
$TipoEntrada = '_FIELDSQUESTION';
break;
}
if( !empty($_POST['_gs_formato_']) && preg_match('/(XLS|XML|PDF|MDB|TXT|CSV)/iu', $tmp[0]) ){
$formato = ['X'=>'XLS', 'M'=>'XML', 'P'=>'PDF', 'A'=>'MDB', 'T'=>'TXT', 'V'=>'CSV'][mb_strtoupper($_POST['_gs_formato_'])];
if( !preg_match('/('.$formato.')/iu', $tmp[0]) ){
break;
}else{
if( !empty($tmp[1]) ){
$_DBORDEREXP = $tmp[1];
}
$_Form = array();
$tmp[0] = '1';
$OkModo = true;
$TipoEntrada = $Comando;
}
}
if( count($_Form)>0 ) break;
if( !empty($tmp[0][0]) && $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( !empty($tmp[0][0]) && $tmp[0][0]=='$' ){
if( _ExeEval($tmp[0], $buffer) ){
$TipoEntrada = $Comando;
break;
}
}
if( !empty($tmp[0]) ){
if( mb_ord($tmp[0][0])>48 && mb_ord($tmp[0][0])<58 ){
$_TCol = (int)$tmp[0];
$OkModo = true;
}else{
$cModo = explode(',', $tmp[0]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( (mb_strtoupper($tmp[0])=='ELSE' || ($_ISUBLIST && mb_strtoupper($tmp[0])=='ISUBLIST')) && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( mb_ord($tmp[1][0])>48 && mb_ord($tmp[1][0])<58 ){
$_TCol = (int)$tmp[1];
$OkModo = true;
}else{
$cModo = explode(',', $tmp[1]);
$OkModo = (count(array_intersect( $cModo, $DimOpcion))>0 );
if( mb_strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
}
}
if( $OkModo ){
$TipoEntrada = $Comando;
$tmp[2] = mb_strtoupper($tmp[2]);
$_FieldsMix = ($tmp[2]=="MIX");
if( $tmp[2]=="TRIM" ){
$_ColsTrim = true;
$_WideListing = 0;
}
if( mb_strtoupper($tmp[0])=="ISUBLIST" ){
$_FieldsMix = true;
$_FieldsISubList = true;
$_ColsTrim = false;
$_WideListing = 0;
}
}
break;
case 'DBADDFILTER':
$_DBADDFILTER = $tmp[0];
if( $_DBADDFILTER[0]=='=' ){
$_DBADDFILTEREXTRA = mb_substr($_DBADDFILTER,1);
if( mb_substr($_DBADDFILTEREXTRA,-1)==')' || mb_substr($_DBADDFILTEREXTRA,-1)==';' ){
list($NomFunc) = explode('(',$_DBADDFILTEREXTRA);
if( function_exists($NomFunc) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTEREXTRA.';');
$_DBADDFILTEREXTRA = eval('return '.$_DBADDFILTEREXTRA.';');
}
}
$_DBADDFILTER = '';
}
if( !empty($tmp[1]) ){
$tmp2 = explode(',',$tmp[1]);
for($n=0; $n<count($tmp2); $n++) $_PDFLABELHIDDEN[trim($tmp2[$n])] = 'NotToShow';
}
if( count($tmp)>2 ) for($n=2; $n<count($tmp); $n++) $_PDFCONDITIONHIDDEN[] = str_replace("'",'',str_replace('"','',trim($tmp[$n])));
break;
case 'COLSWIDTH':
if( eSubstrCount($tmp[0], '=')>0 ){
$_COLSWIDTHCALC = explode(',', eNsp($tmp[0]));
}else{
$_COLSWIDTH = explode(',', eNsp($tmp[0]));
$_userCOLSWIDTH = $_COLSWIDTH;
}
$_DimColumnas = true;
if( !empty($tmp[1]) ) $_COLSWIDTHJS = $tmp[1];
if( !empty($tmp[2]) ) $_WORDBREAK = $tmp[2];
break;
case 'LISTWIDTH';
case 'PAGMARGIN':
case 'TITLETOEXTRACT':
${$Comando} = $tmp[0];
break;
case 'FORMAT':
if( isset($_ISUBLISTFORMAT) && $_ISUBLISTFORMAT ){
$TipoEntrada = null;
break;
}
if( eSubstrCount(mb_strtoupper($tmp[1]), "ISUBLIST") ){
if( $_ISUBLIST ){
$_ISUBLISTFORMAT = true;
$p = mb_strpos(mb_strtoupper($tmp[1]), "ISUBLIST");
$tmp[1] = trim(mb_substr($tmp[1],0,$p).mb_substr($tmp[1],$p+8));
}else{
$TipoEntrada = null;
break;
}
}
if( eSubstrCount(mb_strtoupper($tmp[1]), "NOZERO") ){
$_NOZEROALL = true;
}else if( eSubstrCount(mb_strtoupper($tmp[1]), "ZERO") ){
$_NOZEROALL = false;
}
$tmp[0] = gsCambiaComa($tmp[0]);
if( eSubstrCount($tmp[0], '=')>0 ){
$_FORMATCALC = explode(',', $tmp[0]);
}
${$Comando} = explode(',', $tmp[0]);
$TipoEntrada = '_FORMATPHP';
$JsHtm = false;
for($n=0; $n<count($_FORMAT); $n++) $_FORMAT[$n] = _CalcFormato($_FORMAT[$n], $n);
break;
case 'FORMATTOTALS':
if( isset($_ISUBLISTFORMATTOTALS) && $_ISUBLISTFORMATTOTALS ){
$TipoEntrada = null;
break;
}
if( eSubstrCount(mb_strtoupper($tmp[0]),"ISUBLIST") ){
if( $_ISUBLIST ){
$_ISUBLISTFORMATTOTALS = true;
$p = mb_strpos(mb_strtoupper($tmp[0]), "ISUBLIST");
$tmp[0] = trim(mb_substr($tmp[0],0,$p).mb_substr($tmp[0],$p+8));
}else{
$TipoEntrada = null;
break;
}
}
$tmp[0] = gsCambiaComa($tmp[0]);
if( eSubstrCount($tmp[0], '=')>0 ){
$_FORMATTOTALSCALC = explode(',', $tmp[0]);
break;
}
${$Comando} = explode(',', gsCambiaComa($tmp[0]));
$TipoEntrada = '_FORMATTOTALSPHP';
$JsHtm = false;
if( $tmp[1]>0 ) $_FORMATTOTALSCS = $tmp[1];
if( !empty($tmp[2]) ) $_FORMATTOTALSALIGN = eStrtr(mb_strtoupper($tmp[2]), "LCR","ICD");
for($n=0; $n<count($_FORMATTOTALS); $n++){
$_FORMATTOTALS[$n] = _CalcFormatTotals($_FORMATTOTALS[$n], $n);
}
break;
case 'ALIGN':
if( eSubstrCount($tmp[0], '=')>0 ){
$_ALIGNCALC = explode(',', $tmp[0]);
}else{
$tmp[0] = eStrtr(mb_strtolower($tmp[0]), 'lrh', 'ido');
$_ALIGN = explode(',', $tmp[0]);
for( $n=0; $n<count($_ALIGN); $n++ ){
$_ALIGN[$n] = trim($_ALIGN[$n]);
if( !empty($_ALIGN[$n]) ) $_ALIGN[$n] = ' id='.$_ALIGN[$n];
}
}
break;
case 'COLSCOLOR':
if( eSubstrCount($tmp[0], '=')>0 ){
$_COLSCOLORCALC = explode(',', eNsp($tmp[0]));
}else{
$_COLSCOLOR = explode(',', eNsp($tmp[0]));
for($n=0; $n<count($_COLSCOLOR); $n++){
if( mb_substr($_COLSCOLOR[$n],0,2)=="'#" || mb_substr($_COLSCOLOR[$n],0,2)=='"#' ){
$_COLSCOLOR[$n] = mb_substr($_COLSCOLOR[$n],1,-1);
}else{
if( $_COLSCOLOR[$n]!="" && preg_match('/^(\+|\-)/u', $_COLSCOLOR[$n][0]) ){
$_ColorNumeric[$n] = $_COLSCOLOR[$n];
unset($_COLSCOLOR[$n]);
}
}
}
}
break;
case 'GRID':
$_GRID[] = array($tmp[0], $tmp[1], $tmp[2]);
$TipoEntrada = '_PHPGRID';
if( !empty($_PHPGRID) ) $_PHPGRID .= '}function ExeGRID( $Value ){';
$JsHtm = false;
break;
case 'COLSOPPREFIX':
$_COLSOPPREFIX = $tmp;
break;
case 'COLSOP':
if( eSubstrCount($tmp[0], '=')>0 ){
$_COLSOPCALC = explode(',', eNsp($tmp[0]));
for($n=0; $n<count($_COLSOPCALC); $n++){
if( eSubstrCount($_COLSOPCALC[$n],'=')==0 ){
$_COLSOPCALC[$n+1] = $_COLSOPCALC[$n].','.$_COLSOPCALC[$n+1];
unset($_COLSOPCALC[$n]);
}
}
$_COLSOPCALC = array_values($_COLSOPCALC);
break;
}
$_COLSOP = explode(',', $tmp[0]);
for($n=0; $n<count($_COLSOP); $n++){
$_OpCol[$n] = 0;
$_COLSOP[$n] = mb_strtoupper(trim($_COLSOP[$n]));
if( $_COLSOP[$n]=='S' ){
if( isset($_TOOLSCMP) ) unset($_TOOLSCMP);
$_NOSELECTROW = true;
$_TGrupos++;
}
if( $_COLSOP[$n]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$n] = $_COLSOP[$n];
if( eSubstrCount('+C#', $_COLSOP[$n])>0 ) $_InfSinTotales = false;
}
for($n=0; $n<$_TGrupos; $n++){
if( $_COLSOP[$n]!='S' ) die('ERROR: Los grupos de datos tienen que estar seguidos [ColsOp] '.implode(',',$_COLSOP));
$_OldValGrupo[$n] = '~';
}
if( $_TGrupos>0 ){
$_NOSORT = true;
$_TextGrupo = explode(',', $tmp[1]);
for($n=0; $n<count($_TextGrupo); $n++){
$_TextGrupo[$n] = trim($_TextGrupo[$n]);
if( mb_strtoupper($_TextGrupo[$n])=='c' || mb_strtoupper($_TextGrupo[$n])=='v' ) $_TextGrupo[$n] = '{'.$_TextGrupo[$n].'}';
$_TextGrupo[$n] = str_replace(array('{c}','{v}'), array('{C}','{V}'), $_TextGrupo[$n]);
}
if( !empty($tmp[2]) ) $_GrupoColSpan = $tmp[2];
}
if( !empty($tmp[3]) ) $_PDFAlignCabecera = explode(',', eNsp(mb_strtoupper($tmp[3])));
if( !empty($tmp[4]) ) $_PDFGrisCabecera = explode(',', eNsp($tmp[4]));
if( !empty($tmp[5]) ) $_PDFGrisSubTotal = explode(',', eNsp($tmp[5]));
if( !empty($tmp[6]) ) $_PDFSepGrupoUno = $tmp[6];
if( $_COLSOP[0]=="SUMMARY" ){
if( empty($tmp[1]) ) $tmp[1] = "";
if( empty($tmp[2]) ) $tmp[2] = 7;
$_SUMMARY = array($tmp[1], $tmp[2], $tmp[3]);
}
break;
case 'ROWSOP':
$t = count($tmp)-1;
if( is_numeric(str_replace(",",".",$tmp[$t])) ){
$_ROWSOPUD = $tmp[$t];
unset($tmp[$t]);
}
if( $tmp[1]<>'' ){
$tmp[1] = str_replace("ÃÂ·", "<BR>", $tmp[1]);
$_ROWSOPCALC = $tmp;
}else{
$tmp[0] = str_replace("ÃÂ·", "<BR>", $tmp[0]);
$_ROWSOP = explode(',', $tmp[0]);
}
break;
case 'WINLIST':
$_WINLIST = explode(',', $tmp[0]);
for($i=0; $i<count($_WINLIST); $i++) $_WINLIST[$i] = trim($_WINLIST[$i]);
if( !empty($_WINLIST[3]) ) $_WINTITLE = $_WINLIST[3];
break;
case 'EXPIRE':
$_EXPIRE = ((empty($tmp[0])) ? 0 : $tmp[0]);
set_time_limit($_EXPIRE);
break;
case 'NOABORT':
ignore_user_abort(0);
break;
case 'ROWCOLOR':
$_ROWCOLOR = $tmp;
$_HayROWCOLOR = true;
if( $_ROWCOLOR[1]=='' && mb_substr($_ROWCOLOR[0],-1)==';' ) $_ROWCOLOR[0] = trim(mb_substr($_ROWCOLOR[0],0,-1));
break;
case 'CURSOR':
case 'GREENBAR':
if( $tmp[0]<>"" && $tmp[0]<>'-' && mb_strtoupper($tmp[0])<>'NO' ){
$_GREENBARCOL = $tmp[0];
}else{
${$Comando} = !($tmp[0]=='-' || mb_strtoupper($tmp[0])=='NO');
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
$ElPuntoEsRem = false;
if( $tmp[1]=='' && $Comando=='_CSSADD' ){
if( $_CSSADD=='' ) $_CSSADD = '>';
$TipoEntrada = $Comando;
$JsHtm = false;
}else{
if( $tmp[1] == '/' ) $tmp[1] = str_replace('/','_',mb_substr($FicheroD,0,mb_strrpos($FicheroD,'/')));
$_CSSADDFILE = $tmp[1];
}
if( $Etiqueta=="CSS" ){
$_CSSNO = true;
}
}
break;
case 'TEMPLATE':
if( $OkModo ) $_TEMPLATE = $tmp[1];
break;
case 'JSINCLUDE':
if( $OkModo ){
$tmp1 = explode(',',eNsp(mb_strtolower($tmp[1])));
for($n=0; $n<count($tmp1); $n++) $_JSINCLUDE[$tmp1[$n]] = 1;
}
break;
case 'SELECTMULTIPLE':
if( $OkModo ){
if( preg_match('/BOX$/u', $tmp[2]) ){
$_SELECTMULTIPLEBOX[$tmp[1]] = 1;
$tmp[2] = trim(preg_replace('/BOX/i', '$1', $tmp[2]));
}
if( preg_match('/,/u', $tmp[2]) ){
$_SELECTMULTIPLEMAX[$tmp[1]] = trim(explode(",",$tmp[2])[1]);
$tmp[2] = trim(explode(",",$tmp[2])[0]);
}
$_SELECTMULTIPLE[$tmp[1]] = (($tmp[2]<>"")? $tmp[2] : 20);
if( !empty($tmp[3]) ) $_ADDOPTION[$tmp[1]] = $tmp[3];
}
break;
case 'TIPTD':
array_push($_TIPTD, $tmp[0].'|'.$tmp[1].'|'.$tmp[2].'|'.$tmp[3].'|'.$tmp[4]);
break;
case 'RELATIONFIELDS':
array_push($_RELATIONFIELDS, ','.$tmp[0].',');
break;
case 'WHERESELECT':
if( $OkModo ) array_push($_WHERESELECT, array($tmp[1], $tmp[2]));
break;
case 'DB':
break;
case 'ADDOPTION':
case 'PDFVAR':
case 'RELATIONFIELDS':
call_user_func("eCall_".$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'HEADER':
header($tmp[0]);
break;
case 'DEFAUX':
$_DEFAUX[$tmp[0]] = $tmp[1];
break;
case 'EDITLIST':
if( $_SubModo!='l' && $_SubModo!='ml' ) break;
$_EDITLIST = array();
$_EDITLIST[] = ','.eNsp($tmp[0]).',';
if( eSubstrCount($tmp[1],'(' )) list($tmp[1]) = explode('(', $tmp[1]);
$_EDITLIST[] = eNsp($tmp[1]);
$_EDITLIST[] = $tmp[2];
switch( mb_strtoupper($tmp[3]) ){
case 'NOSAVE':	$_EDITLIST[] = -1; break;
case 'CELL':	$_EDITLIST[] =  0; break;
case 'ROW':		$_EDITLIST[] =  1; break;
case 'TABLE':	$_EDITLIST[] =  2;
$_EDITLISTCLICK = true;
break;
case 'BOARD':	$_EDITLIST[] =  3; break;
default:		$_EDITLIST[] =  0; break;
}
if( eSubstrCount($tmp[4],'(') ) list($tmp[4]) = explode('(',$tmp[4]);
$_EDITLIST[] = eNsp($tmp[4]);
$_EDITLIST[] = $tmp[5];
$_EDITLIST[] = $tmp[6];
break;
case 'RADIO':
$sCampo = $tmp[0];
$tmp[2] = str_replace('&nbsp;','',$tmp[2]);
$tmp = explode(';', $tmp[2]);
for($n=0; $n<count($tmp); $n++){
$tmpD = explode(',', $tmp[$n]);
list( $txt, $txt2 ) = explode(CHR92, $tmpD[1]);
$txt2 = trim($txt2);
if( !empty($txt2) ) $txt = trim($txt2);
$_RADIO[$sCampo][trim($tmpD[0])] = trim($txt);
}
$_HayRadio = true;
break;
case 'TIPFORM':
if( $OkModo ){
if( mb_strlen($tmp[1])!=1 ){
for( $n=count($tmp); $n>1; $n-- ) $tmp[$n] = $tmp[$n-1];
$tmp[1] = 'F';
}
if( $tmp[2]=='TITLE' || $tmp[2]=='BUTTON' ) $tmp[1] = 'L';
$tmp[1] = mb_strtoupper($tmp[1]);
if( !empty($tmp[3]) ){
$_TIPFORM[$tmp[2]]['S'] = 'L';
$buffer = $tmp[3];
}else{
$_TIPFORM[$tmp[2]]['S'] = 'W';
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
if( $tmp[1]!='*' ) $_TIPFORM[$tmp[2]][$tmp[1]] = $buffer;
else $_TIPFORM[$tmp[2]]['L'] = $_TIPFORM[$tmp[2]]['F'] = $buffer;
if( $tmp[1]=='E' ) $_TIPFORM[$tmp[2]]['M'] = _ModeHelp($tmp[0]);
if( !empty($tmp[4]) ) $_TIPFORM[$tmp[2]]['W'] = $tmp[4];
if( !empty($tmp[5]) ) $_TIPFORM[$tmp[2]]['T'] = ((float)$tmp[5])*1000;
}
break;
case 'WINNEW':
$_EnVentana = true;
$_dEnVentana = explode(',', $tmp[0].',,');
if( empty($_dEnVentana[0]) ) $_dEnVentana[0] = 400;
if( empty($_dEnVentana[1]) ) $_dEnVentana[1] = 300;
if( empty($_dEnVentana[2]) ) $_dEnVentana[2] = 0;
break;
case 'ADDLTOOLS':
$_ADDLTOOLS[] = $tmp;
break;
case 'NOTE':
break 3;
case 'COLSNOREPEAT';
if( $tmp[1]<>"" ){
if( preg_match("/NOEMPTY/iu", $tmp[1], $res) ){
$tmp[1] = str_replace("  ", " ", trim(str_replace($res[0], "", $tmp[1])));
$_COLSNOREPEATFILL = true;
}
$_COLSNOREPEATCLASS = $tmp[1];
}
case 'PDFCOLSSHADE':
$tmp[0] = str_replace('%','',$tmp[0]);
case 'PDFCOLBORDER':
case 'PDFCOL':
if( eSubstrCount($tmp[0], '=')>0 ){
$Comando .= 'CALC';
${$Comando} = explode(',', eNsp($tmp[0]));
}else{
${$Comando} = explode(',', eNsp($tmp[0]));
}
break;
case 'PDFWRAP':
list( $_PDFWRAP[0], $_PDFWRAP[1], $sPDFVar ) = explode(',', eNsp($tmp[0]).',,');
if( $_PDFWRAP[1]=='' ){
$_PDFWRAP[1] = true;
}else{
$_PDFWRAP[1] = (mb_strtoupper(trim($_PDFWRAP[1]))=='TRUE');
}
if( !empty($sPDFVar) ) $_PDFVAR[] = '$PDF_Grid = '.((mb_strtoupper(trim($sPDFVar))=='TRUE' || mb_strtoupper(trim($sPDFVar))=='1' )?'true':'false').';';
if( !empty($tmp[1]) ) $_PDFWRAPFIELDS = explode(',',eNsp($tmp[1]));
if( $_PDFWRAP[0]<0 ) $_PDFWRAP[2] = $_PDFWRAP[0] = $_PDFWRAP[0]*-1;
break;
case 'LISTCOMPARETH':
case 'PDFLISTCOMPARETH':// PDFTH-Compara dos listados
if( !empty($tmp[0]) ){
${$Comando} = explode( ',', $tmp[0] );
for($n=0; $n<count(${$Comando}); $n++) ${$Comando[$n]} = trim(${$Comando[$n]});
}
break;
case 'PDFTH':
if( !empty($tmp[0]) ){
if( eSubstrCount($tmp[0],'=')>0 ){
$_xPDFTH = explode(',', $tmp[0]);
for($n=0; $n<count($_xPDFTH); $n++) $_xPDFTH[$n] = trim($_xPDFTH[$n]);
}else{
$_PDFTH = explode(',', $tmp[0]);
for($n=0; $n<count($_PDFTH); $n++) $_PDFTH[$n] = trim($_PDFTH[$n]);
}
}
$tmp2 = explode(',', $tmp[1]);
for($n=0; $n<count($tmp2); $n++){
list($Campo, $Valor) = explode('=', trim($tmp2[$n]));
$_PDFLABELHIDDEN[trim($Campo)] = trim($Valor);
}
if( !empty($tmp[2]) ){
if( mb_substr($tmp[2],-1)==';' ) $tmp[2] = mb_substr($tmp[2],0,-1);
$tmp2 = explode(';', $tmp[2]);
for($n=0; $n<count($tmp2); $n++){
$tmp3 = explode('=', eNsp($tmp2[$n]));
$_PDFVALUELHIDDEN[$tmp3[0]] = $tmp3[1];
}
}
break;
case 'PDFPHP':
if( $tmp[0]=='F' ) $_PDFPHP = $tmp[1];
break;
case 'PDFSAVEVAR':
$_PDFSAVEVAR = eNsp($tmp[0]);
break;
case 'PDFBREAKPAGE':
$_PDFBREAKPAGE = explode(',', eNsp(str_replace('+',',',$tmp[0])));
break;
case 'HIDDENCONDITIONS':
foreach(explode(',', eNsp($tmp[0])) as $k=>$v) $_PDFLABELHIDDEN[$v] = 'NOTTOSHOW';
break;
case 'DBVIEW':
$_DBVIEW = explode(',', eNsp($tmp[0]));
break;
case 'PDFFORM':
$PDF_Formato = 'F';
break;
case 'PDFLIST':
$PDF_Formato = 'L';
break;
case 'GROUPLABELS':
$_Grupo[] = $tmp;
$TipoEntrada = $Comando;
break;
case 'HELP':
if( $OkModo ){
if( $tmp[1]==''  ) $tmp[1] = mb_strtolower("{$OriFichero}_{$_Modo}");
$tmp[1] = str_replace('#', $_Modo, $tmp[1]);
$_HELP = 'top.gsHelp("'.eStrtr( $tmp[1], array('/'=>'_','\\'=>'_',' '=>'_')).'",event);';
}
break;
case 'FORUSERS':
if( $OkModo ){
if( $tmp[2]=='' ) $tmp[2] = 'ACCESO DENEGADO';
if( eSubstrCount( eNsp($tmp[1]), 'selectcount(*)' )==1 ){
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
}
break;
case 'SORTLIST':
if( isset($_GET['_ISUBLIST']) && isset($_GET['_ISLOP']) ){
list($c) = explode(',',$_GET['_ISLOP']);
$OkModo = ($c=='mR');
}
if( $OkModo ){
$_SORTLIST = $tmp[1];
$_SORTLISTCND = ($tmp[2]=='') ? '' : ' SORTCND="'.eNsp($tmp[2]).'"';
}
break;
case 'LABEL':
$_LABEL[$tmp[0]] = $tmp[1];
break;
case 'CHECKLIST':
$tmp[3] = mb_strtoupper($tmp[3]);
if( eSubstrCount( ',WRAP,NOWRAP,', ",{$tmp[3]}," ) == 0 ) $tmp[3] = '';
$_CHECKLIST[$tmp[0]] = array( $tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5] );
if( !empty($tmp[3]) ){
if( $tmp[4] > 0 ) $_PDFWRAP = array($tmp[4],true,$_PDFWRAP[2]);
$Sql = $tmp[2];
if( eSubstrCount($Sql,'()')==1 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '."return {$Sql};");
$DimCheck = eval("return {$Sql};");
}else if( preg_match("/^SELECT /iu",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount($Tabla);
}
qQuery( $Sql );
}else if( preg_match("/^CD_/iu",$Sql) ){
$Tabla = mb_substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount($Tabla);
qQuery( "select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2" );
}else if( eSubstrCount($Sql,',')==eSubstrCount($Sql,';')+1 && eSubstrCount($Sql,',')>1 ){
$DimCheck = explode(';',$Sql);
for( $n=0; $n<count($DimCheck); $n++ ) $DimCheck[$n] = explode(',',$DimCheck[$n]);
}else{
eMessage('ERROR: Definición de [CheckList] no soportada', 'HSE');
}
if( !isset($DimCheck) ){
while( $r=qRow() ) $_SelVirtual[$tmp[0]][trim($r[0])] = trim($r[1]);
}else{
for( $n=0; $n<count($DimCheck); $n++ ){
$_SelVirtual[$tmp[0]][trim($DimCheck[$n][0])] = trim($DimCheck[$n][1]);
}
}
}
break;
case 'RADIOLIST':
$tmp[3] = mb_strtoupper($tmp[3]);
$_RADIOLIST[$tmp[0]] = array( $tmp[1], $tmp[2], $tmp[3], $tmp[4] );
if( !empty($tmp[3]) ){
$Sql = $tmp[2];
if( eSubstrCount($Sql,'()')==1 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '."return {$Sql};");
$DimRadio = eval("return {$Sql};");
}else if( preg_match("/^SELECT /iu",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount($Tabla);
}
qQuery($Sql);
}else if( preg_match("/^CD_/iu",$Sql) ){
$Tabla = mb_substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount($Tabla);
qQuery("select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2");
}else if( eSubstrCount($Sql,',')==eSubstrCount($Sql,';')+1 && eSubstrCount($Sql,',')>1 ){
$DimRadio = explode(';',$Sql);
for( $n=0; $n<count($DimRadio); $n++ ) $DimRadio[$n] = explode(',',$DimRadio[$n]);
}else{
eMessage('ERROR: Definición de [RadioList] no soportada', 'HSE');
}
if( !isset($DimRadio) ){
while( $r=qRow() ) $_SelVirtual[$tmp[0]][trim($r[0])] = trim($r[1]);
}else{
for( $n=0; $n<count($DimRadio); $n++ ){
$_SelVirtual[$tmp[0]][trim($DimRadio[$n][0])] = trim($DimRadio[$n][1]);
}
}
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
break;
case 'DBRANGE':
if( !$VieneDeFicha || $_gsObjetoAnterior=='G' ){
$DimDBRange[] = array($tmp[1], ${$tmp[2]}, ${$tmp[3]}, $tmp[4], $tmp[2], $tmp[3]);
$_DBRANGEADD[$tmp[1]] = 1;
}
break;
case 'PDFLABEL':
$_PDFLABEL[] = explode("|", $buffer);
$TipoEntrada = $Comando;
$_gs_formato_ = 'L';
break;
case 'CHR':
$_CHR[] = $tmp;
$_CHR[$tmp[0]] = $tmp;
break;
case 'CALLSRVROW':
$_CALLSRVROW = $tmp;
break;
case 'MSGANSWER':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2]);
break;
case 'UPLOADFILE':
$tmp[1] = _InVar($tmp[1]);
if( !isset($_Fichero) ) $_Fichero = array();
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
list($uNomFile) = explode(' ', $tmp[0]);
$_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
$tmp[1] = eScript($tmp[1]);
$_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = str_replace('.','',str_replace(',','',$tmp[3]));
if( $_UPLOADFILE[$uNomFile]['BYTS'] < 0 ) $_UPLOADFILE[$uNomFile]['BYTS'] = $_UPLOADFILE[$uNomFile]['BYTS']*-1;
$_UPLOADFILE[$uNomFile]['TITLE'] = ((empty($tmp[4])) ? $__Lng[59] : $tmp[4] );
if( $tmp[5]=='*.*' ) $tmp[5] = '*';
if( !empty($tmp[5]) ) $_UPLOADFILE[$uNomFile]['EXT'] = eNsp($tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$_sDBTABLE.".".$uNomFile] = $_UPLOADFILE[$uNomFile];
break;
case 'JSDIM':
if( $OkModo ) $_JSDIM[] = array($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
break;
case 'NAN':
if( $OkModo ){
$TipoEntrada = $Comando;
$_ObjetoID = $tmp[1];
$_Objeto[$_ObjetoID]['STATUS'] = true;
$_Objeto[$_ObjetoID]['BOTTON'] = $tmp[2];
$_Objeto[$_ObjetoID]['TITLE'] = $tmp[3];
}else{
$TipoEntrada = '#';
}
break;
case 'REMOTESRV':
include($Dir_.'remotesrv.inc');
eEnd();
case 'LANGUAGE':
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
$tmp2 = explode( ',', trim(eNsp($tmp[0])) );
for( $n=0; $n<count($tmp2); $n++ ){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
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
$_SELECTTREE[$Ind][trim($pk)] = $v;
}
if( $_SELECTTREE[$Ind]['load_level']=='' ) $_SELECTTREE[$Ind]['load_level'] = 1;
if( $_SELECTTREE[$Ind]['load_view']=='' ) $_SELECTTREE[$Ind]['load_view'] = 1;
$_SELECTTREE[$Ind]['multiple'] = (mb_strtoupper($_SELECTTREE[$Ind]['multiple'])=='TRUE' || $_SELECTTREE[$Ind]['multiple']=="1");
$_SELECTTREE[$Ind]['folder'] = (mb_strtoupper($_SELECTTREE[$Ind]['folder'])=='TRUE' || $_SELECTTREE[$Ind]['folder']=="1");
$_SELECTTREE[$Ind]['static'] = (mb_strtoupper($_SELECTTREE[$Ind]['static'])=='TRUE' || $_SELECTTREE[$Ind]['static']=="1");
break;
case 'WINTOOLS':
case 'DBGATEWAY':
if( $OkModo ) ${$Comando} = $tmp[1];
break;
case 'DBUNION':
$tmp = explode(',', eNsp($tmp[0]));
$_DBUNION = array();
$n1 = (date("Y")+((int)$tmp[2])*1);
$n2 = (date("Y")+((int)$tmp[3])*1);
if( $n2>$n1 ) list($n1,$n2) = array($n2,$n1);
for($i=$n1; $i>=$n2; $i--) $_DBUNION[] = $tmp[0].mb_substr($i."", (($tmp[1]=="y")? 2: 0));
break;
case 'EDITLISTCLICK':
case 'WINCLOSEESC':
${$Comando} = true;
break;
case 'CACHE':
if( SETUP::$System['Cache'] && $OkModo && mb_substr($_oAccion,-2)=="df" && SESS::$_D_=='' ){
$_ENV[DF]["cache"] = eScriptToCache();
}
break;
case 'EXIT':
break 3;
case 'LISTMULTISELECT':
$_LISTMULTISELECT = $tmp;
break;
case 'BACKGROUNDIMAGE':
if( $OkModo && ( $tmp[4]=='false' || (($tmp[4]=='' || $tmp[4]=='true') && $_PSOURCE=='WWORK')) ) $_BACKGROUNDIMAGE = '<style>body{background-image:url("'.$tmp[1].'");background-repeat:'.(($tmp[2]=='')?'no-repeat':$tmp[2]).';background-position:'.(($tmp[3]=='')?'bottom right':$tmp[3]).';background-attachment:fixed;}</style>';
break;
case 'P':
$_NombreInclude = $tmp[0];
$TipoEntrada = 'Inc'.$Etiqueta;
break;
case 'JSSELROWS':
if( empty($tmp[2]) ){
$tmp[2] = "Enviar Selección";
}else{
$tmp[2] = _InVar($tmp[2]);
}
$_JSSELROWS = $tmp;
if( empty($_JSSELROWS[1]) ){
$_JSSELROWS[1] = "<i class='ICONINPUT ICONSEEK CHECKON' style='font-size:50%'>j</i>";
}else if( $_JSSELROWS[1][0]!="<" ){
$_JSSELROWS[1] = "<img src='{$_JSSELROWS[1]}'>";
}else{
$_JSSELROWS[1] = str_replace('"', CHR92.'"', $_JSSELROWS[1]);
}
break;
case 'FREEFIELDS':
if( $OkModo ){
$tmp = explode(',',eNsp($tmp[1]));
for($i=0; $i<count($tmp); $i++) $_CONTEXTFREE[$tmp[$i]] = true;
}
break;
case 'LOGFILE':
$_LOGFILE = array(explode(",", mb_strtoupper(eNsp($tmp[0]))), (int)$tmp[1]);
break;
case 'OPTIONSINLIST';
if( mb_strlen($_SubMode)!=2 ) break;
if( count($_Form)>0 ) _Error(1);
if( eSubstrCount($tmp[0], "*")>0 ){
if( gettype($_URL_IN_MENU)!="NULL" ){
$newOp = "fu";
$opDefault = "";
$dim = array("a","b","c","m");
foreach($_URL_IN_MENU as $k=>$v){
if( mb_strlen($k)==2 && mb_substr($k,-1)=="l" ) $k = $k[0];
if( in_array($k, $dim) ){
$newOp .= $k;
}
}
$dim = "fabcmu";
for($n=0; $n<mb_strlen($dim); $n++) if( eSubstrCount($tmp[0],"-".$dim[$n])>0 ){
$newOp = str_replace(array("-".$dim[$n],$dim[$n]), array("",""), $newOp);
$tmp[0] = str_replace(array("-".$dim[$n],$dim[$n]), array("",""), $tmp[0]);
}
$tmp[0] = str_replace("*", $newOp, $tmp[0]);
if( $_OptionsInListDefault<>"" ){
for($n=0; $n<mb_strlen($_OptionsInListDefault); $n++) if( eSubstrCount($newOp, $_OptionsInListDefault[$n])>0 ){
$opDefault = $_OptionsInListDefault[$n];
$_SERVER["QUERY_STRING"] = str_replace("L{$_SubMode}:", "L{$opDefault}l:", $_SERVER["QUERY_STRING"]);
$_SubMode = "{$opDefault}l";
break;
}
}
if( $opDefault=="" ){
$dim = "cmb";
for($n=0; $n<mb_strlen($dim); $n++) if( preg_match('/'.$dim[$n].'/u',$newOp) ){
$opDefault = $dim[$n];
$_SERVER["QUERY_STRING"] = str_replace("L{$_SubMode}:", "L{$opDefault}l:", $_SERVER["QUERY_STRING"]);
$_SubMode = "{$opDefault}l";
break;
}
}
}else{
$tmp[0] = "fuabcm";
}
}
$p = ((count($tmp)+3-1)%3)>0 ? count($tmp)-1 : -1;
$_OPTIONSINLIST = $tmp;
$EmptyList = true;
if( $p>-1 ){
if( preg_match('/(\(\)|\(\)\;)$/u', $tmp[$p]) ){
$_OPTIONSINLISTRANGE = $tmp[$p];
}else{
$_OPTIONSINLISTRANGE = "";
$tmp = explode(",", $tmp[$p]);
for($n=0; $n<count($tmp); $n++){
if( trim($tmp[$n])!="" ){
if( $_OPTIONSINLISTRANGE!="" ) $_OPTIONSINLISTRANGE .= " and ";
$_OPTIONSINLISTRANGE .= "A.".$tmp[$n];
}
}
}
unset($_OPTIONSINLIST[$p]);
}
if( $_OPTIONSINLISTALL ){
if( $_DBINDEX=="" ) _Error(2);
if( $_DBTABLE=="" ) _Error(3);
$_OPTIONSINLISTINSERT = false;
$masFilter = "";
if( $_GET[$_PERSISTENTVAR]!="" && $_PERSISTENTVAR[0]!="_" ) $masFilter = " and A.".$_PERSISTENTVAR.'='.$_GET[$_PERSISTENTVAR];
if( $_OPTIONSINLISTRANGE!="" ){
$_OPTIONSINLISTRANGE = _InVar($_OPTIONSINLISTRANGE);
if( preg_match('/\(\)/u',$_OPTIONSINLISTRANGE) ){
eval('$_OPTIONSINLISTRANGE = '.$_OPTIONSINLISTRANGE.';');
}
if( $_OPTIONSINLISTRANGE!="" && mb_substr($_OPTIONSINLISTRANGE,-1)!="=" ){
if( eSubstrCount(trim($_DBTABLE), " ")>0 ){
$_OPTIONSINLISTRANGE = BuscaConAlias($_OPTIONSINLISTRANGE);
}
$masFilter .= " and ".$_OPTIONSINLISTRANGE;
}
}
$sSql = $GLOBALS["_SQL_"];
$n = 0;
$dimValorLast = array();
qQuery("select * from {$_ENV['eDesDictionary']}gs_last where cd_gs_user=".S::$_User." and script='{$_FileDF}' and db_value in (select {$_DBINDEX} from {$_DBTABLE} A where {$_DBINDEX}={$_ENV['eDesDictionary']}gs_last.db_value{$masFilter}) order by cdi");
while($r=qArray()){
if( !isset($dimValorLast[$r["db_value"]]) && mb_strtoupper($r["action"])<>"B" ) $n++;
$dimValorLast[$r["db_value"]] = $r;
}
$GLOBALS["_SQL_"] = $sSql;
if( $n>0 ) $_OptionsInListMode = "LR";
}
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
case 'ADDOPTIONVALUE':
$_ADDOPTIONVALUE[$tmp[0]] = $tmp[1];
if( !empty($tmp[2]) ) $_ADDOPTIONIMG[$tmp[0]] = $tmp[2];
if( !empty($tmp[3]) ){
$_ADDOPTIONCOLLABEL[$tmp[0]] = $tmp[3];
$_SelVirtualCol = array();
$_SelVirtualExel = array();
}
break;
case 'SELECTCOLLABEL':
$tmp2 = explode(",", eNsp($tmp[0]).',');
$_ADDOPTIONVALUE[$tmp2[1]] = $tmp[1];
$_ADDOPTIONCOLLABEL[$tmp2[1]] = '$'.$tmp2[0].'=="'.$tmp[2].'"';
$_SelVirtualCol = array();
$_SelVirtualExel = array();
break;
case 'ADDTOOLS':
if( mb_strtoupper($tmp[2])=='3CX' ){
$GLOBALS["_3CX"] = array();
$tmp[1] = eNsp($tmp[1]);
if( preg_match('/^(NO|OFF)$/iu', $tmp[1]) ) $tmp[1] = "_NO_";
$tmp = explode(',', $tmp[1]);
for($i=0; $i<count($tmp); $i++){
$GLOBALS["_3CX"][$tmp[$i]] = true;
}
}
break;
case 'FORMACTION':
$_FORMACTION = $tmp;
break;
case 'TARGET':
$dim = explode(",", str_replace(".", "", mb_strtoupper($tmp[0])));
$lastRec = 0;
$_TARGET = [];
for($i=count($dim)-1; $i>=0; $i--){
list($format, $rec) = explode(":", $dim[$i].":");
$tmp = [];
if( mb_strpos($format, "/")!==false ){
$tmp = explode("/", $format);
}else{
$tmp = [$format];
}
for($n=0; $n<count($tmp); $n++){
if( $tmp[$n]=="XML" ) $tmp[$n] = "M";
if( $tmp[$n]=="CSV" ) $tmp[$n] = "V";
$tmp[$n] = $tmp[$n][0];
if( empty($rec) ) $rec = $lastRec-1;
$_TARGET[$tmp[$n]] = $rec;
$lastRec = $rec;
}
}
break;
case 'NOTOOLS':
$_NOTOOLS = eNsp($tmp[0]);
$_USERFUNCTION = $tmp[1];
$_USERFILTERFUNCTION = $tmp[2];
if( $tmp[3]<>'' ) $_ADDTOOLS = explode(',', eNsp(mb_strtoupper($tmp[3])));
if( isset($_ADDTOOLS) && in_array("CMP", $_ADDTOOLS) && $tmp[4]>0 ){
if( count($_COLSOP)==0 ){
$_TOOLSCMP = $tmp[4];
}elseif( mb_strtoupper(trim($_COLSOP[0]))!='S' ) $_TOOLSCMP = $tmp[4];
}
if( $_NOTOOLS=="-" ) $_ListToolsMenuType = "";
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
case 'EXPORTSCOPE':
$_EXPORTSCOPE = strtolower($tmp[0]);
break;
}
break;
case  0:
case 10:
$ElPuntoEsRem = $sElPuntoEsRem;
break;
default:
$NoExePHPInterno = false;
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm('L', $Opcion, $buffer, $_Form, $_DEFAUX, 1) ){
$nf = count($_Form)-1;
if( eSubstrCount($_Form[$nf][1], "[")>0 && $_Form[$nf][1][0]!="[" ){
list($ExtObj, $ExtField) = explode("[",str_replace("]","[",$_Form[$nf][1]));
if( $ExtObj[0]=='$' ){
@include_once("../_datos/config/{$ExtObj}.plugin");
}else{
@include_once(DIREDES."itm/{$ExtObj}.plugin");
}
$_Form[$nf][1] = $ExtField;
call_user_func($ExtObj, $_Mode, $_Form[$nf]);
}
$txt = eFieldName($_Form[$nf][1]);
$_Field[$txt] = true;
$_pField[$txt] = $_Form[$nf];
eExplodeLast(" ".$txt, " ", $txt1, $txt);
$_pCol[$txt] = $nf;
if( $_Form[$nf][1]=='_gs_formato_' && $_Form[$nf][7]=='P' ) $PDF_Formato = 'L';
}elseif( mb_strtoupper(mb_substr(trim($buffer),0,3))=='{P}' ){
$NomSubEti = trim(mb_substr(trim($buffer),3));
if( $_DimInclude['IncP'][$NomSubEti]=='' ) _CargarSubEti($nDimFCH, 'P', $NomSubEti);
$tmpFile = GrabaTmp('l_php_'.mb_strtolower($NomSubEti), $_DimInclude['IncP'][$NomSubEti], $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
}
break;
case '_FIELDSCARD':
if( IncluirEnForm('FC', "cR", $buffer, $_FormCard, $_DEFAUX, 1) ){
}
break;
case '_FIELDSQUESTION':
if( IncluirEnForm('L', 'c', $buffer, $buffer, $_DEFAUX, 1, true) ){
}
break;
case '_CSSADD':
$ElPuntoEsRem = false;
$sElPuntoEsRem = false;
case '_PDFCode':
case '_PHPSTART':
case '_PHPEND':
case '_PHPFORM':
case '_PHPGRID':
case '_PHPHEAD':
case '_PHPINI':
case '_PHPNEXTPAGE':
case '_DBSELREC':
case '_DBSQL':
case '_DBEND':
$NoExePHPInterno = true;
case '_CHARTJS':
case '_CHARTSWF':
case '_FORMATPHP':
case '_FORMATTOTALSPHP':
case '_HTMEND':
case '_HTMHEAD':
case '_HTMINI':
case '_PntHelpHTM':
case '_PntHelpMARK':
case '_JSEND':
case '_JSHEAD':
case '_JSINI':
case '_JSONLOAD':
case '_JSONCLICKROW':
case '_JSSELROW':
if( empty($buffer) && $_DEBUG!=2 ) break;
${$TipoEntrada} .= $buffer.$__Enter;
break;
break;
case '_GROUPLABELS':
$_Grupo[] = explode('|', $buffer);
break;
case '_PDFLABEL':
$_PDFLABEL[] = explode("|", $buffer);
break;
case '_NAN':
$SubEtiqueta = trim(mb_substr($buffer, 1, mb_strpos($buffer,'}')-1));
$buffer = trim(str_replace('{'.$SubEtiqueta.'}', '', $buffer));
$_Objeto[$_ObjetoID][mb_strtoupper($SubEtiqueta)] = $buffer;
break;
case '_LANGUAGE':
list($buffer) = explode('~', $buffer);
$tmp = explode('|', $buffer);
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
break;
case 'IncP':
$_DimInclude[$TipoEntrada][$_NombreInclude] .= $buffer.$__Enter;
break;
}
}
}
unset($_DimEDF);
_SanitizeGET($_pField, $_SanitizarGet);
if( !empty($_EDITLIST[0]) && $_EDITLIST[0]==",*," && count($_DBSERIAL)>0 ){
$txt = ",";
for($n=0; $n<count($_Form); $n++) $txt .= $_Form[$n][1].",";
$_EDITLIST[0] = $txt;
$EmptyList = true;
$_COLSOP = array();
}
if( $_DBINSERTONLY && eSubstrCount($_DBADDFILTER, "status is null")==0 ){
if( !empty($_DBADDFILTER) ) $_DBADDFILTER .= " and ";
$_DBADDFILTER = "status is null";
}
if( empty($_DBINDEX) && count($_DBSERIAL)>0 ) $_DBINDEX = $_DBSERIAL[1];
if( empty($_DBORDER) ) $_DBORDER = $_DBINDEX;
if( !empty($_ORDEN_) ){
if( mb_substr($_ORDEN_, 0, 8)=="*concat(" ){
$_ORDEN_ = str_replace(
array('&#39;', '&#34;', 'concat(', 'trim(', ")", ",' '"),
array("'", '"', "", "", "", ""),
$_ORDEN_
);
if( $_DBORDER[0]=="*" ) $_DBORDER = mb_substr($_DBORDER,1);
}
$_DBORDER = $_ORDEN_;
}
if( !empty($_POST["_ORDER"]) ) $_DBORDER = $_POST["_ORDER"];
if( !empty($_DBORDEREXP) ) $_DBORDER = $_DBORDEREXP;
if( isset($_DBVIEW) && count($_DBVIEW)>0 ){
$_DBTABLE = $_DBVIEW[0];
}
if( isset($_LISTMULTISELECT) ){
$_MAXRECFULL = true;
$_MaxVisibleRows = 0;
}
eContextGet();
_genContext();
if( isset($_GET["_TRANSPARENT"]) && $_GET["_TRANSPARENT"] ){
if(eSubstrCount($_PERSISTENTVAR,"_TRANSPARENT")==0){
if($_PERSISTENTVAR!="") $_PERSISTENTVAR.=",";
$_PERSISTENTVAR .= "_TRANSPARENT";
}
}
$conIgual = false;
for($n=0; $n<count($_FORMAT); $n++){
if( preg_match('/=/u', $_FORMAT[$n]) ){
$conIgual = true;
list($c,$v) = explode("=", eNsp($_FORMAT[$n]));
$_FORMAT[$_pCol[$c]] = _CalcFormato($Formato, $_pCol[$c]);
}
}
if( $conIgual ){
for($n=0; $n<count($_FORMAT); $n++)	if( preg_match('/=/u', $_FORMAT[$n]) ) $_FORMAT[$n] = "";
}
if( isset($_PHPSESSION) ){
foreach($_PHPSESSION as $k=>$v){
if( $_POST[$k]!=$v && $_GET[$k]!=$v ) eMessage((($_PHPSESSIONMSG=='')?"(L{$_SubMode}) Error de Sessión":$_PHPSESSIONMSG),'HSE');
}
}
if( isset($_GET['_SHOWFILTER']) ) $_SHOWFILTER = $_GET['_SHOWFILTER'];
if( $OriFichero[0]=='$' && $OriFichero!='$a/config.edf' ){
$AddFile = '../_datos/config/'.mb_substr($OriFichero,mb_strrpos($OriFichero,'/')+1,-3).'ini';
if( file_exists($AddFile) ) include($AddFile);
unset($AddFile);
}
function eAddForm($buffer){
global $Opcion, $_Form, $_DEFAUX;
global $_Field, $_pF, $_pField, $_pCol, $PDF_Formato, $_PDFTH;
list(,$Campo) = explode('|', $buffer);
$Campo = trim($Campo);
$i = -1;
for($n=0; $n<count($_Form); $n++){
if( $Campo==$_Form[$n][1] ){
$ModCampo = true;
$i = $n;
break;
}
}
if( $ModCampo ){
$sForm = $_Form;
$_Form = array();
}
if( IncluirEnForm('L', $Opcion, $buffer, $_Form, $_DEFAUX, 1) ){
if( $ModCampo ){
$nf = $i;
$sForm[$i] = $_Form[0];
$_Form = $sForm;
}else{
$nf = count($_Form)-1;
}
$txt = eFieldName($_Form[$nf][1]);
$_Field[$txt] = true;
$_pField[$txt] = $_Form[$nf];
eExplodeLast(" ".$txt, " ", $txt1, $txt);
$_pCol[$txt] = $nf;
if( $txt=='_gs_formato_' && $_Form[$nf][7]=='P' ) $PDF_Formato = 'L';
$_pF[$txt] = count($_Form)-1;
$_PDFTH[$nf] = $_Form[$nf][0];
}
}
function eTHColSpan($buffer){
$tmp = explode('|', $buffer);
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
$GLOBALS['_THCOLSPAN'] = $tmp;
}
function eColsOp($buffer){
global $_COLSOP, $_OpCol, $_NOSELECTROW, $_NOSORT;
global $_GrupoColSpan, $_InfSinTotales, $_OldValGrupo, $_TGrupos, $_TantoPorCiento, $_TextGrupo, $_oCOLSOP;
global $_PDFAlignCabecera, $_PDFGrisCabecera, $_PDFGrisSubTotal, $_PDFSepGrupoUno;
$_COLSOP = explode(',', $buffer);
for($n=0; $n<count($_COLSOP); $n++){
$_OpCol[$n] = 0;
$_COLSOP[$n] = mb_strtoupper(trim($_COLSOP[$n]));
if( $_COLSOP[$n]=='S' ){
$_NOSELECTROW = true;
$_TGrupos++;
}
if( $_COLSOP[$n]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$n] = $_COLSOP[$n];
if( eSubstrCount('+C#', $_COLSOP[$n])>0 ){
$_InfSinTotales = false;
}
}
for($n=0; $n<$_TGrupos; $n++){
if( $_COLSOP[$n]!='S' ) die('ERROR: Los grupos de datos tienen que estar seguidos [ColsOp] '.implode(',',$_COLSOP));
$_OldValGrupo[$n] = '~';
}
if( $_TGrupos>0 ){
$_NOSORT = true;
$_TextGrupo = explode(',', $tmp[1]);
for($n=0; $n<count($_TextGrupo); $n++){
$_TextGrupo[$n] = trim($_TextGrupo[$n]);
if( mb_strtoupper($_TextGrupo[$n])=='c' || mb_strtoupper($_TextGrupo[$n])=='v' ) $_TextGrupo[$n] = '{'.$_TextGrupo[$n].'}';
$_TextGrupo[$n] = str_replace( '{c}', '{C}', $_TextGrupo[$n] );
$_TextGrupo[$n] = str_replace( '{v}', '{V}', $_TextGrupo[$n] );
}
if( !empty($tmp[2]) ) $_GrupoColSpan = $tmp[2];
}
if( !empty($tmp[3]) ) $_PDFAlignCabecera = explode(',',eNsp(mb_strtoupper($tmp[3])));
if( !empty($tmp[4]) ) $_PDFGrisCabecera = explode(',',eNsp($tmp[4]));
if( !empty($tmp[5]) ) $_PDFGrisSubTotal = explode(',',eNsp($tmp[5]));
if( !empty($tmp[6]) ) $_PDFSepGrupoUno = $tmp[6];
}
function eRowsOp($buffer){
global $_ROWSOPCALC, $_ROWSOP;
$txt = str_replace('\|', '&#124;', $buffer);
$tmp = explode('|', $txt);
for($n=0; $n<count($tmp); $n++) $tmp[$n] = str_replace('&#124;', '|', trim($tmp[$n]));
if( $tmp[1]<>'' ){
global $_Form;
$_ROWSOPCALC = $tmp;
$tmp = str_replace('+',',+',eNsp('+'.$_ROWSOPCALC[0]));
$tmp = str_replace('-',',-',$tmp);
$tmp = str_replace('*',',*',$tmp);
$tmp = explode( ',', $tmp );
for($n=0; $n<count($_Form); $n++) $_ROWSOP[$n] = '';
for($n=0; $n<count($tmp); $n++){
$o = mb_substr($tmp[$n],0,1);
if( $o<>'' ){
$c = mb_substr($tmp[$n],1);
$_ROWSOP[ $_pF[trim($c)] ] = $o;
}
}
$_ROWSOP[count($_Form)] = trim($_ROWSOPCALC[1]);
}else{
$_ROWSOP = explode(',', $tmp[0]);
for($n=0; $n<count($_ROWSOP); $n++) $_ROWSOP[$n] = trim($_ROWSOP[$n]);
}
}
function eChartCol($Long=100, $pCol=-1){
if( $pCol==-1 ) $pCol = count($GLOBALS['_Form']);
$GLOBALS['_CHARTCOL'] = array( $pCol, $Long );
}
function eChartRow($DefCampos, $Ancho=100, $Alto=100){
global $_CHARTROW;
$_CHARTROW[0] = $DefCampos;
$_CHARTROW[1] = $Ancho;
$_CHARTROW[2] = $Alto;
}
function eFormat($buffer){
global $_FORMATCALC, $_FORMAT, $TipoEntrada, $JsHtm;
$buffer = gsCambiaComa($buffer);
if( eSubstrCount($buffer, '=')>0 ){
$_FORMATCALC = explode(',', $buffer);
return;
}
$_FORMAT = explode( ',', $buffer );
$JsHtm = false;
for($n=0; $n<count($_FORMAT); $n++) $_FORMAT[$n] = _CalcFormato($_FORMAT[$n], $n);
}
function eFormatTotals($buffer){
global $_FORMATTOTALS, $TipoEntrada, $JsHtm, $_FORMATTOTALSCS, $_NOZEROFORMATTOTALS;
$_FORMATTOTALS = explode(',', gsCambiaComa($buffer));
$JsHtm = false;
$tmp = explode("|", $buffer);
if( $tmp[1]>0 ) $_FORMATTOTALSCS = $tmp[1];
for($n=0; $n<count($_FORMATTOTALS); $n++){
$_FORMATTOTALS[$n] = str_replace('&#44;', ',', trim($_FORMATTOTALS[$n]));
if( !empty($_FORMATTOTALS[$n]) && mb_strlen($_FORMATTOTALS[$n])<4 ){
$_FORMATTOTALS[$n] = str_replace('I','' ,$_FORMATTOTALS[$n]);
$_FORMATTOTALS[$n] = str_replace('C','c',$_FORMATTOTALS[$n]);
$_FORMATTOTALS[$n] = str_replace('D','d',$_FORMATTOTALS[$n]);
$_FORMATTOTALS[$n] = str_replace('L','' ,$_FORMATTOTALS[$n]);
$_FORMATTOTALS[$n] = str_replace('R','d',$_FORMATTOTALS[$n]);
$_FORMATTOTALS[$n] = str_replace('B','b',$_FORMATTOTALS[$n]);
if( eSubstrCount($_FORMATTOTALS[$n], 'b')==1 ){
$_NOZEROFORMATTOTALS[$n] = 'S';
$_FORMATTOTALS[$n] = str_replace('b', '', $_FORMATTOTALS[$n]);
}
if( eSubstrCount( $_FORMATTOTALS[$n], 'c' ) == 1 ){
$_FORMATTOTALS[$n] = str_replace( 'c','',$_FORMATTOTALS[$n]);
}else if( eSubstrCount( $_FORMATTOTALS[$n], 'd' ) == 1 ){
$_FORMATTOTALS[$n] = str_replace( 'd','',$_FORMATTOTALS[$n]);
}
if( eSubstrCount( $_FORMATTOTALS[$n], 'M' ) == 1 ){
$_FORMATTOTALS[$n] = str_replace( 'M','',$_FORMATTOTALS[$n]);
if( mb_strlen($_FORMATTOTALS[$n])==1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}else{
$_FORMATTOTALS[$n] = "eNumberFormat(#,0)";
}
}else if( eSubstrCount($_FORMATTOTALS[$n], 'N')==1 ){
$_FORMATTOTALS[$n] = str_replace('N','',$_FORMATTOTALS[$n]);
if( mb_strlen($_FORMATTOTALS[$n])==1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].", false)";
}else{
$_FORMATTOTALS[$n] = "eNumberFormat(#,0, false)";
}
}
if( eSubstrCount('0123456789', $_FORMATTOTALS[$n])==1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}
}
}
}
function eAlign($buffer){
global $_ALIGN, $_ALIGNCALC;
if( eSubstrCount( $buffer, '=' ) > 0 ){
$_ALIGNCALC = explode( ',', $buffer );
}else{
$tmp[0] = eStrtr( mb_strtolower($buffer), 'lrh','ido' );
$_ALIGN = explode( ',', $buffer );
for( $n=0; $n<count($_ALIGN); $n++ ){
$_ALIGN[$n] = trim($_ALIGN[$n]);
if( $_ALIGN[$n] != '' ) $_ALIGN[$n] = ' id='.$_ALIGN[$n];
}
}
}
if( $_ISUBLIST==true ){
}
if( isset($_MaxVisibleRows) ){
$_sMaxVisibleRows = $_MaxVisibleRows;
}
if( isset($_CHANGEFILTERMEMORY) && $_CHANGEFILTERMEMORY ){
$_MAXRECFULL = true;
$_MAXREC = 0;
$_LimitOn = true;
$_GREENBAR = false;
}
if( SETUP::$System['SearchWithLike'] && !$VieneDeFicha ){
if( !isset($_SearchNotLike) ){
$_SearchNotLike = [];
}else if( gettype($_SearchNotLike)=="string" ){
$_SearchNotLike = explode(',', eNsp($_SearchNotLike));
}
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][3]=="T" && !preg_match('/^(F4|P4|CDI|\+|\-|\+,|\-,|C|\*)$/u', $_Form[$n][2]) ){
if( $_POST[$_Form[$n][1]]!="" && mb_strlen($_POST[$_Form[$n][1]])<$_Form[$n][4] && !preg_match('/^(<|>|=)/u', $_POST[$_Form[$n][1]][0]) ){
if( !isset($_POST["_INPUT_".$_Form[$n][1]]) && !in_array($_Form[$n][1], $_SearchNotLike) ){
if( $_POST[$_Form[$n][1]][0]!="*" ) $_POST[$_Form[$n][1]] = "*".$_POST[$_Form[$n][1]];
if( mb_substr($_POST[$_Form[$n][1]],-1)!="*" ) $_POST[$_Form[$n][1]] = $_POST[$_Form[$n][1]]."*";
}
}
}
}
}
_EsIntruso();
if( count($_Objeto)>0 ){
include($Dir_.'nan.inc');
eEnd();
}
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
if( $_TITLE[0]=='#' ) $_TITLE = trim(mb_substr($_TITLE,1));
if( !empty($_TITLE_DELFILTER) ) $_TITLE = $_TITLE_DELFILTER;
if( isset($_ADDOPTIONCOLLABEL) ){
foreach($_ADDOPTIONCOLLABEL as $k=>$v){
$cmp = eMid($v, "$", "=");
$val = str_replace(array("'",'"'), array("",""), explode("==", $v)[1]);
$NomCampo = $_Form[$_pCol[$k]][1];
if( eSubstrCount($NomCampo, "{")>0 ){
$tmp = explode(',', str_replace(array('{','}',' '), array(',','',''), $NomCampo));
$Tabla = $tmp[1];
$NomCampo = trim($tmp[0]);
$Campos = $tmp[2].','.$tmp[3];
}else if( eSubstrCount($NomCampo, ":")>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$Tabla = mb_substr($nNomCampo, 3);
$Campos = $nNomCampo.', nm_'.$Tabla;
}else if( mb_substr($NomCampo,3)=="cd_" ){
$Tabla = mb_substr($NomCampo,3);
$Campos = $NomCampo.', nm_'.$Tabla;
}else{
eMessage("Definición de campo no soportada para ''{$k}''", "HSE");
}
$Campos .= ','.$_ADDOPTIONVALUE[$k];
qQuery("select {$Campos} from {$Tabla}");
while($r=qRow()) $_SelVirtualCol[$k][trim($r[0])] = array(trim($r[1]), trim($r[2]));
$_SelVirtualExel[$NomCampo] = 'return $row['.$_pCol[$cmp].']=="'.$val.'";';
$_Form[$_pCol[$k]][1] = $NomCampo;
$_Form[$_pCol[$k]][2] = "o";
$_Form[$_pCol[$k]][3] = "SV";
}
}
_CreateVar($_Form);
TrimRelationFields();
if( $_SummaryType>0 ){
$_SummaryCol = $_TGrupos+1-$_SummaryType;
}
if( $TipoEntrada=='_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
if( !empty($_PHPGRID) ) $_PHPGRID = 'function ExeGRID($Value){'.$_PHPGRID.'}';
if( $_ConChartSWF && $_CHARTGRID=='' ) $_CHARTGRID = '1';
if( !empty($_FORMATTOTALSPHP) ){
$_NameField = array();
for($n=0; $n<count($_Form); $n++) $_NameField[$n] = $_Form[$n][1];
}
if( !empty($_CHARTGRID) ){
if( count($_CHART)<$_CHARTGRID ){
$_CHARTGRID = count($_CHART);
}else if( count($_CHART)>$_CHARTGRID ){
for($n=$_CHARTGRID; $n<count($_CHART); $n++) unset($_CHART[$n-1]);
}
}
if( !empty($_SqlPDOConnect) ) list($_SqlPDOType) = explode(':', $_SqlPDOConnect);
$_POSTBak = [];
if( count($DimDBRange)>0 ){
$MemDBRange = array();
for($i=0; $i<count($DimDBRange); $i++){
if( $_POST[$DimDBRange[$i][0]]!="" ) continue;
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
$Inclusive = (eSubstrCount(',TRUE,!FALSE,1,,', ','.mb_strtoupper($DimDBRange[$i][3]).',')==1);
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
}else if( eSubstrCount('|+|-|+,|-,|',"|{$sTipo}|") ){
if( !empty($ValorINI) ) $ValorINI *= 1;
if( !empty($ValorFIN) ) $ValorFIN *= 1;
}else if( $sTipo=='CDI' ){
if( mb_strlen($VarIni)==10 ){
$VarIni = str_replace( '\\', '', $VarIni );
if( !empty($_POST[$DimDBRange[$i][4].'_hours']) ){
$VarIni = $ValorINI = $VarIni.' '.$_POST[$DimDBRange[$i][4].'_hours'];
}else{
$VarIni = $ValorINI = $VarIni.' 00:00:00';
}
}
if( mb_strlen($VarFin)==10 ){
$VarFin = str_replace('\\', '', $VarFin);
if( !empty($_POST[$DimDBRange[$i][5].'_hours']) ){
$VarFin = $ValorFIN = $VarFin.' '.$_POST[$DimDBRange[$i][5].'_hours'];
}else{
$VarFin = $ValorFIN = $VarFin.' 23:59:59';
}
}
}
if(		 empty($ValorINI) && empty($ValorFIN) ){
}else if( empty($ValorINI) && !empty($ValorFIN) ){
${$Campo} = '<'.(($Inclusive) ? '=' : '').$VarFin;
}else if( !empty($ValorINI) && empty($ValorFIN) ){
${$Campo} = '>'.(($Inclusive)?'=':'').$VarIni;
}else if( !empty($ValorINI) && !empty($ValorFIN) ){
if( $ValorINI != $ValorFIN ){
if( $Inclusive ){
if( $ValorINI < $ValorFIN ){
${$Campo} = '>='.$VarIni."' and ".$Campo."<='".$VarFin;
}else{
${$Campo} = '>='.$VarFin."' and ".$Campo."<='".$VarIni;
}
}else{
if( $ValorINI < $ValorFIN ){
${$Campo} = '>'.$VarIni."' and ".$Campo."<'".$VarFin;
}else{
${$Campo} = '>'.$VarFin."' and ".$Campo."<'".$VarIni;
}
}
}else{
${$Campo} = $VarFin;
if( count($_LISTCOMPARE)>0 ) ${$Campo} = ' '.${$Campo};
}
}
if( $_Sql!='oracle' ) ${$Campo} = str_replace("'", '"', ${$Campo});
$_POSTBak[$Campo] = $_POST[$Campo];
$_POST[$Campo] = ${$Campo};
$MemDBRange[$Campo] = $Campo.''.${$Campo};
}
if( count($_LISTCOMPARE)>0 ) $_PDFSAVEVAR = eNsp($_LISTCOMPARE[1]);
}
$_NOTOOLS = $_NOTOOLS.SESS::$_notools_;
if( !empty($_NOTOOLS) ){
if( eSubstrCount($_NOTOOLS,'S')>0 ){
$_NOSORT = true;
$_NOTOOLS = str_replace('S', '', $_NOTOOLS);
}
if( similar_text('*', $_NOTOOLS)==1 ) $_NOTOOLS = '*';
}
if( !empty($_SORTLIST) ){
$_oDBTABLE = $_DBTABLE;
$_MAXREC = 0;
}
$_PosSerial = -1;
$_PosDBIndex = -1;
$_ConSelectVirtual = false;
$p = (($_ISUBLIST==true) ? "I":"L");
if( $_OPTIONSINLISTALL && $_GET["_SUBINSERT"]!=1 && !empty($dimValorLast) ){
$_Form[] = explode("|", "Instante|#1# cdi__|CDI|T|19||-|||");
$_Form[] = explode("|", "Acción|#2# action__|#|T|10||-|||");
$_pF["cdi__"] = count($_Form)-2;
$_pF["action__"] = count($_Form)-1;
}
for($nf=0; $nf<count($_Form); $nf++){
if( $_SLIDECOL>0 && $_SLIDECOL>$nf && preg_match("/^(\*|\*Q\*)$/u", $_Form[$nf][6]) ){
eMessage('ERROR: Las columnas definidas en [SlideCol] tienen que ser visibles en el listado', 'HSE');
}
if( !empty($_Form[$nf][5][0]) && $_Form[$nf][5][0]=="=" && empty($_COLSWIDTH[$nf]) ){
$_COLSWIDTH[$nf] = mb_substr($_Form[$nf][5],1);
$_userCOLSWIDTH[$nf] = mb_substr($_Form[$nf][5],1);
}
if( !empty($_Form[$nf][5]) && empty($_COLSWIDTH[$nf]) ){
if( $_FieldsMix || $_FieldsISubList || $_ISUBLIST || preg_match("/^(F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/u", $_Form[$nf][2]) ){
$_COLSWIDTH[$nf] = $_Form[$nf][5];
}else if( !$_ColsTrim && ($_Form[$nf][3]=="H" || $_Form[$nf][3]=="A")){
list(,$ancho) = explode(",", $_Form[$nf][4]);
$_COLSWIDTH[$nf] = $_Form[$nf][5];
}
}
if( $_FieldsMix ){
if( !empty($_Form[$nf][7]) && empty($_COLSCOLOR[$nf]) ){
$_COLSCOLOR[$nf] = $_Form[$nf][7];
}
if( !empty($_Form[$nf][8]) && empty($_COLSOP[$nf]) && eSubstrCount('+Cc#', $_Form[$nf][8])>0 ){
$_OpCol[$nf] = 0;
$_COLSOP[$nf] = mb_strtoupper($_Form[$nf][8]);
$_oCOLSOP[$nf] = $_COLSOP[$nf];
$_InfSinTotales = false;
}
}
if( ($_DefaultSizeCols==true || $_ISUBLIST==true) && empty($_COLSWIDTH[$nf]) ){
}
list($sCampo, $xTabla) = explode('{', $_Form[$nf][1]."{");
list($sCampo, $sReal ) = explode(':', $sCampo.":");
if( isset($_SELECTTREE[$sCampo]) ){
$_Form[$nf][1] = $sCampo.'{'.$_SELECTTREE[$sCampo]['table'].','.$_SELECTTREE[$sCampo]['index'].','.$_SELECTTREE[$sCampo]['caption'].'}';
$_Form[$nf][3] = 'S';
}
if( !empty($_SELECTMULTIPLE[$sCampo]) ){
if( $_Form[$nf][3]=='SV' && !empty($_ADDOPTION[$_Form[$nf][1]]) ){
if( eSubstrCount($_ADDOPTION[$_Form[$nf][1]], '()')==1 ){
$_ADDOPTION[$_Form[$nf][1]] = trim($_ADDOPTION[$_Form[$nf][1]]);
if( mb_substr($_ADDOPTION[$_Form[$nf][1]], -1)!=';' ) $_ADDOPTION[$_Form[$nf][1]] .= ';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_ADDOPTION[$_Form[$nf][1]]);
$tmp1 = @eval('return '.$_ADDOPTION[$_Form[$nf][1]]);
for($i=0; $i<count($tmp1); $i++){
$tmp1[$i][1] = trim($tmp1[$i][1]);
$tmp1[$i][0] = trim($tmp1[$i][0]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[$i][0]] = trim($tmp1[$i][1]);
}
}else if( preg_match('/^select /u', $_ADDOPTION[$_Form[$nf][1]]) ){
if( $oValor[0]=="," ) $oValor = mb_substr($oValor, 1, -1);
$tmp1 = explode(",", $oValor);
$dim = array();
for($i=0; $i<count($tmp1); $i++) $dim[$tmp1[$i]] = true;
eMultitenancy($_ADDOPTION[$_Form[$nf][1]]);
qQuery($_ADDOPTION[$_Form[$nf][1]]);
while( $r=qRow() ){
$_SelVirtual[$_Form[$nf][1]][$r[0]] = trim($r[1]);
}
}else{
$tmp = explode(';', $_ADDOPTION[$_Form[$nf][1]]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = explode(',', $tmp[$i]);
$tmp1[0] = trim($tmp1[0]);
$tmp1[1] = trim($tmp1[1]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[0]] = trim($tmp1[1]);
}
}
}else if( $_Form[$nf][3]=='S' ){
if( !empty($xTabla) ){
$tmp = str_replace('{', ',', $_Form[$nf][1]);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$NomCampo = $tmp[0];
$Campos = $tmp[2];
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.$tmp[$i];
}else if( !empty($sReal) ){
$Tabla = mb_substr($sReal,3);
$Campos = $sReal.', nm_'.$Tabla;
}
list($Campo1, $Campo2) = explode(',', $Campos);
eMultitenancy($Tabla);
qQuery("select {$Campos} from {$Tabla}");
while($r=qRow()) $_SelVirtual[$sCampo][trim($r[0])] = trim($r[1]);
}
$_SelVirtualType[$sCampo] = $_Form[$nf][3];
$_Form[$nf][3] = 'T';
$_Form[$nf][1] = $sCampo;
}
if( mb_strtoupper($_Form[$nf][3])=='R' && !empty($_EDITLIST[0]) && eSubstrCount($_EDITLIST[0], ','.$_Form[$nf][1].',')>0 ){
$_Form[$nf][3] = 'SV';
$txt = '';
foreach($_RADIO[$_Form[$nf][1]] as $k=>$v){
if( !empty($txt) ) $txt .= ';';
$txt .= $k.','.$v;
}
$_ADDOPTION[$_Form[$nf][1]] = $txt;
}
if( preg_match('/(IMG|ICON)/u', $_Form[$nf][3]) ){
$_FORMAT[$nf] = $_Form[$nf][3];
$_ALIGN[$nf] = ' id=c';
}
if( $_Form[$nf][3]=='C' && $_ALIGN[$nf]=='' ) $_ALIGN[$nf] = ' id=c';
if( eSubstrCount('+,-,', $_Form[$nf][2])>0 && isset($_NOZEROALL) && $_NOZEROALL ) $_NOZERO[$nf] = 'S';
list($_Form[$nf][_OFIELD]) = explode(' ', $_Form[$nf][1]);
list($_Form[$nf][_OFIELD]) = explode(':', $_Form[$nf][_OFIELD]);
list($_Form[$nf][_OFIELD]) = explode('{', $_Form[$nf][_OFIELD]);
$_Form[$nf][_OFIELD] = trim($_Form[$nf][_OFIELD]);
if( isset($_DBSERIAL[1]) && $_Form[$nf][_FIELD]==$_DBSERIAL[1] ){
$_PosSerial = $nf;
}
if( $_Form[$nf][_FIELD]==$_DBINDEX ){
$_PosDBIndex = $nf;
}
if( mb_substr($_Form[$nf][1],0,4)=='dct_' && !empty($_POST[$_Form[$nf][1]]) ) $_DCT[] = $_Form[$nf][1];
$_ColVirtual[$nf] = false;
if( $_Form[$nf][0][0]==',' ){
if( $nf==0 || $_Form[$nf-1][0]=='-' ) $_Form[$nf][0] = mb_substr($_Form[$nf][0],1);
}
if( !empty($_LABEL[$_Form[$nf][1]]) ){
list($_Form[$nf][0], $MsgList, $MsgError) = explode(CHR92, $_LABEL[$_Form[$nf][1]]);
if( !empty($MsgList) ) $_Form[$nf][0] = $MsgList;
if( !empty($MsgError) ) $_Etiqueta[$_Form[$nf][1]] = trim($MsgError);
}
if( $_Form[$nf][3]=='SV' && !empty($_ADDOPTION[$_Form[$nf][1]]) ){
$_ConSelectVirtual = true;
if( eSubstrCount($_ADDOPTION[$_Form[$nf][1]], '()')==1 ){
$_ADDOPTION[$_Form[$nf][1]] = trim($_ADDOPTION[$_Form[$nf][1]]);
if( mb_substr($_ADDOPTION[$_Form[$nf][1]],-1) != ';' ) $_ADDOPTION[$_Form[$nf][1]] = trim($_ADDOPTION[$_Form[$nf][1]]).';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_ADDOPTION[$_Form[$nf][1]]);
$tmp = eval('return '.$_ADDOPTION[$_Form[$nf][1]]);
if( count($tmp[0]) >= 2 ){
for($i=0; $i<count($tmp); $i++) $_SelVirtual[$_Form[$nf][1]][$tmp[$i][0]] = trim($tmp[$i][1]);
}else{
foreach($tmp as $k=>$v) $_SelVirtual[$_Form[$nf][1]][$k] = trim($v);
}
}elseif( mb_substr(mb_strtoupper($_ADDOPTION[$_Form[$nf][1]]),0,7)=='SELECT ' ){
eMultitenancy($_ADDOPTION[$_Form[$nf][1]]);
qQuery($_ADDOPTION[$_Form[$nf][1]], $p1);
while( $r=qRow($p1) ){
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
$_SelVirtual[$_Form[$nf][1]][$r[0]] = (($r[1]=='') ? $r[0] : $r[1]);
}
}elseif( $_ADDOPTION[$_Form[$nf][1]][0]==">" ){
$dim = include(eScript(mb_substr($_ADDOPTION[$_Form[$nf][1]],1)));
for($n=0; $n<count($dim); $n++){
$r = $dim[$n];
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
$_SelVirtual[$_Form[$nf][1]][$r[0]] = (($r[1]=='') ? $r[0] : $r[1]);
}
}else{
$tmp = explode(';', $_ADDOPTION[$_Form[$nf][1]]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = explode(',', $tmp[$i]);
$tmp1[0] = trim($tmp1[0]);
$tmp1[1] = trim($tmp1[1]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[0]] = trim($tmp1[1]);
if( isset($_ADDOPTIONSTYLE[$_Form[$nf][1]][$i]) ){
$_SelVirtualStyle[$_Form[$nf][1]][$tmp1[0]] = $_ADDOPTIONSTYLE[$_Form[$nf][1]][$i];
}else{
$_SelVirtualStyle[$_Form[$nf][1]][$tmp1[0]] = "";
}
}
}
}
if( eSubstrCount('MSSsX.SL.SV.', $_Form[$nf][3])>0 ){
$HaySelect = true;
}else{
if( !empty($_ADDOPTION[$_Form[$nf][1]]) && $_Form[$nf][3]!='SV' ) unset($_ADDOPTION[$_Form[$nf][1]]);
}
if( $_CARDSHOW && gettype($_FormCard)=="array" ){
for($i=0; $i<count($_FormCard); $i++){
if( $_Form[$nf][1]==$_FormCard[$i][1] ){
$_pFieldCard[$i] = $nf;
continue;
}
}
}
}
if( $_PosSerial==-1 && $_PosDBIndex>-1 ) $_PosSerial = $_PosDBIndex;
if( count($_Grupo)>0 ){
for( $n=0; $n<count($_Grupo[0]); $n++ ) $_Grupo[0][$n] = mb_strtoupper(trim($_Grupo[0][$n]));
for( $nf=1; $nf<count($_Grupo); $nf++ ){
for( $i=0; $i<count($_Grupo[$nf]); $i++ ) $_Grupo[$nf][$i] = trim($_Grupo[$nf][$i]);
$_Grupo[$nf][0] = trim($_Grupo[$nf][0]);
for( $n=0; $n<count($_Grupo[$nf]); $n++ ){
$p = $n+1;
for( $i=0; $i<count($_Form); $i++ ){
if( $_Grupo[$nf][0] == $_Form[$i][1] ){
switch( $_Grupo[0][$n] ){
case 'ALIGN':
$_Grupo[$nf][$p] = mb_strtolower(trim($_Grupo[$nf][$p]));
$_Grupo[$nf][$p] = str_replace('i','i',$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('l','i',$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('r','d',$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('h','o',$_Grupo[$nf][$p]);
if( !empty($_Grupo[$nf][$p]) ) $_ALIGN[$i] = ' id='.$_Grupo[$nf][$p];
break;
case 'FORMAT':
$_Grupo[$nf][$p] = str_replace('&#44;', ',', trim($_Grupo[$nf][$p]));
if( !empty($_Grupo[$nf][$p]) && mb_strlen($_Grupo[$nf][$p])<4 ){
$_Grupo[$nf][$p] = str_replace('I','' ,$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('C','c',$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('D','d',$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('L','' ,$_Grupo[$nf][$p]);
$_Grupo[$nf][$p] = str_replace('R','d',$_Grupo[$nf][$p]);
if( eSubstrCount($_Grupo[$nf][$p], 'b')==1 ){
$_NOZERO[$i] = 'S';
$_ALIGN[$i] = ' id=d';
$_Grupo[$nf][$p] = str_replace('b', '', $_Grupo[$nf][$p]);
}
if( eSubstrCount($_Grupo[$nf][$p], 'c')==1 ){
$_ALIGN[$i] = ' id=c';
$_Grupo[$nf][$p] = str_replace('c', '', $_Grupo[$nf][$p]);
}else if( eSubstrCount($_Grupo[$nf][$p], 'd')==1 ){
$_ALIGN[$i] = ' id=d';
$_Grupo[$nf][$p] = str_replace('d', '', $_Grupo[$nf][$p]);
}
if( eSubstrCount($_Grupo[$nf][$p], 'M')==1 ){
$_Grupo[$nf][$p] = str_replace('M', '', $_Grupo[$nf][$p]);
$_ALIGN[$i] = ' id=d';
if( mb_strlen($_Grupo[$nf][$p])==1 ){
$_FORMAT[$i] = "eNumberFormat(#,".$_Grupo[$nf][$p].")";
}else{
$_FORMAT[$i] = "eNumberFormat(#,0)";
}
}else if( eSubstrCount($_Grupo[$nf][$p], 'N')==1 ){
$_Grupo[$nf][$p] = str_replace('N', '', $_Grupo[$nf][$p]);
$_ALIGN[$i] = ' id=d';
if( mb_strlen($_Grupo[$nf][$p])==1 ){
$_FORMAT[$i] = "eNumberFormat(#,".$_Grupo[$nf][$p].",false)";
}else{
$_FORMAT[$i] = "eNumberFormat(#,0,false)";
}
}
if( eSubstrCount('0123456789', $_Grupo[$nf][$p])==1 ){
$_ALIGN[$n] = ' id=d';
$_FORMAT[$n] = "eNumberFormat(#,".$_Grupo[$nf][$p].")";
}
}else{
$_FORMAT[$i] = $_Grupo[$nf][$p];
}
break;
case 'TIPTH':
$_TIPTH[$i] = $_Grupo[$nf][$p];
break;
case '\\\\':
if( !empty($_Grupo[$nf][$p]) ) $_Form[$i][0] = $_Grupo[$nf][$p];
break;
case 'COLSWIDTH':
if( !empty($_Grupo[$nf][$p]) ){
$_COLSWIDTH[$i] = $_Grupo[$nf][$p];
$_DimColumnas = true;
}
break;
case 'COLSCOLOR':
if( $_Grupo[$nf][$p]=='' ){
$_COLSCOLOR[$i] = "";
}else if( $_Grupo[$nf][$p][0] == '#' ){
$_COLSCOLOR[$i] = $_Grupo[$nf][$p];
}else{
$_COLSCOLOR[$i] = $_Grupo[$nf][$p];
}
break;
}
}
}
}
}
}
function _recalcRowsOp(){
global $_Form, $_ALIGN, $_FORMAT, $_FORMATTOTALS, $_ROWSOP, $_ROWSOPFORM, $_exeROWSOPCALC;
$mu = 0;
$md = 0;
$_ROWSOPFORM = array();
$t = count($_Form);
$txt = '';
for($n=0; $n<$t; $n++){
if( !isset($_ROWSOP[$n]) ) $_ROWSOP[$n] = "";
$_ROWSOP[$n] = trim($_ROWSOP[$n]);
if( !empty($_ROWSOP[$n]) ){
if( count($_ROWSOPFORM)==0 ) $_ROWSOPFORM = $_Form[$n];
list($u,$d) = explode(',', $_Form[$n][4]);
$u = (float)$u;
$d = (float)$d;
if( $u>$mu ) $mu = $u;
if( $d>$md ) $md = $d;
$txt .= $_ROWSOP[$n].'$_vF['.$n.']';
}
}
if( empty($_ALIGN[$t]) ) $_ALIGN[$t] = ' id=d';
if( !empty($_ROWSOPUD) ) list(,$md) = explode(',', $_ROWSOPUD);
$_FORMAT[$t] = "eNumberFormat(#,".$md.")";
if( empty($_FORMATTOTALS[$t]) ) $_FORMATTOTALS[$t] = "eNumberFormat(#,".$md.")";
if( isset($_ROWSOPFORM) && count($_ROWSOPFORM)>0 ){
$_ROWSOPFORM[0] = trim(str_replace("ÃÂ·", "<BR>", $_ROWSOP[count($_ROWSOP)-1]));
$_ROWSOPFORM[1] = '_TOTAL_';
if( $md>0 ){
$_ROWSOPFORM[4] = "{$mu},{$md}";
}else{
$_ROWSOPFORM[4] = $mu;
}
if( $_ROWSOPUD!="" ) $_ROWSOPFORM[4] = $_ROWSOPUD;
}
if( !empty($txt) ){
$_exeROWSOPCALC = 'return('.$txt.');';
$_exeROWSOPCALC = str_replace('$_vF[', '(float)$_vF[', $_exeROWSOPCALC);
}
}
if( count($_ROWSOP)>0 ){
_recalcRowsOp();
}
if( $_DimColumnas && count($_Form)!=count($_COLSWIDTH) ){
$Dif = count($_Form)-count($_COLSWIDTH);
for($n=0; $n<$Dif; $n++) array_push($_COLSWIDTH, 0);
}
if( isset($_xPDFTH) ){
for($n=0; $n<count($_xPDFTH); $n++){
list($xCampo, $xTH) = explode('=', $_xPDFTH[$n]);
$xCampo = trim($xCampo);
$xTH = trim($xTH);
for($i=0; $i<count($_Form); $i++){
if( $xCampo==$_Form[$i][1] ){
$_PDFTH[$i] = $xTH;
break;
}
}
}
}
$_pCol = array();
$_COLSOPFORM = array();
for($n=0; $n<count($_Form); $n++){
$_pCol[_QueNmField($_Form[$n], $n)] = $n;
if( !isset($_ALIGN[$n]) ){
$_ALIGN[$n] = '';
if( $_Form[$n][8]=='=' || $_Form[$n][8]=='%' ) $_ALIGN[$n] = ' id=c';
}
if( !isset($_PDFTH[$n]) || $_PDFTH[$n]=='=' ) $_PDFTH[$n] = trim($_Form[$n][0]);
switch( $_Form[$n][2] ){
case '+,': case '-,':
$tmp = explode(',',$_Form[$n][4]);
if( empty($tmp[1]) ) $tmp[1]='0';
if( empty($_ALIGN[$n]) ) $_ALIGN[$n] = ' id=d';
if( empty($_FORMAT[$n]) ) $_FORMAT[$n] = "eNumberFormat(#,".$tmp[1].")";
if( !empty($_COLSOP[$n]) && empty($_FORMATTOTALS[$n]) ) $_FORMATTOTALS[$n] = $_FORMAT[$n];
break;
case '+': case '-': case '*':
if( $_Form[$n][3][0]!='S' ){
if( empty($_ALIGN[$n]) ) $_ALIGN[$n] = ' id=d';
if( empty($_FORMAT[$n]) ) $_FORMAT[$n] = "eNumberFormat(#,0)";
if( !empty($_COLSOP[$n]) && empty($_FORMATTOTALS[$n]) ) $_FORMATTOTALS[$n] = $_FORMAT[$n];
}
break;
case 'F4': case 'P4': case 'CP': case 'T': case 'CDI': case 'H':
case 'DC': case 'CCC': case 'NAF': case 'DNI': case 'NIF': case 'CIF': case 'NSS':
case 'H8': case 'H5': case 'H2':
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=c';
break;
default:
if( $_Form[$n][3]!='A' && eSubstrCount($_Form[$n][4], ',')>0 ){
list($Ancho, $Decimales) = explode(',',$_Form[$n][4]);
$_Form[$n][4] = ($_gs_formato_=='P') ? $Decimales : $Ancho;
}else if( $_Form[$n][3][0]!='S' && ($_Form[$n][8]=='=' || $_Form[$n][8]=='%') ){
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=c';
}
}
if( isset($_COLSOP[$n]) && $_COLSOP[$n]=='S' ) $_COLSOPFORM[] = $_Form[$n];
}
if( $_DownloadPDF=='' ){
if( !$VieneDeFicha ){
Estadistica('Lis', 0, '', $_DBTABLE);
}else{
Estadistica('sLi', 0, '', $_DBTABLE, $_SubModo);
}
}
if( isset($_GET['_VISIBLE_ROWS_']) ) $_MaxVisibleRows = $_GET['_VISIBLE_ROWS_'];
if( !empty($_sMaxVisibleRows) && (!isset($_MaxVisibleRows) || $_MaxVisibleRows==0) ){
$_MaxVisibleRows = $_sMaxVisibleRows;
}
if( isset($_MaxVisibleRows) ) $_RowsOnPage = $_MaxVisibleRows;
if( $_SummaryType>-1 ){
$_DBLIMIT = 1000000;
$_RowsOnPage = 1000000;
$_PrimerosReg = 1000000;
$_MaxRowsOnPage = 1000000;
}
if( count($_GRID)>0 ) include($Dir_.'grid_1.inc');
$_WINTITLE = _InVar($_WINTITLE);
$_DimMenuExp = array();
$_ExportSetup = array(
"P"=> array("PDFc", "[&#202;]", $__Lng[79])
,"X"=> array("XLSt", "[&#203;]", $__Lng[65])
,"M"=> array("XML" , "[&#410;]", $__Lng[61])
,"T"=> array("TXT" , "[&#411;]", $__Lng[60])
,"V"=> array("CSV" , "[&#412;]", $__Lng[72])
,"p"=> array("IMP" , "8"	   , $__Lng[37])
);
eHTML("L:{$OriFichero}", $Opcion, $_TITLE);
echo '<SCRIPT type="text/javascript" name=eDes>';
if( ISCLI ){
echo REM.$_GET["_SESS_"]."\n";
}
echo $__Enter;
echo 'document.title = "LIST";';
if( isset($_CSSNO) && $_CSSNO ){
echo 'top.S.init(window);';
}else if( $_CSSFontSize=="" ){
echo 'top.S.init(window,"all,list");';
}else if( $_CSSFontSize=="big" ){
echo "top.S.init(window,'all_big,list_big');";
}else{
echo "top.S.init(window);";
}
if( !_UserExport($_DimMenuExp, $_Mode, $_SubMode, $_FileDF) ){
echo 'S.sheetCopyOne(window, "print");';
}
echo '</SCRIPT>';
if( (isset($_CSSNO) && !$_CSSNO) && $_CSSFontSize!="" && $_CSSFontSize!="big" ){
echo "<LINK REL='stylesheet' HREF='css/all_{$_CSSFontSize}.css' TYPE='text/css' title='list'>";
echo "<LINK REL='stylesheet' HREF='css/list_{$_CSSFontSize}.css' TYPE='text/css' title='list'>";
}
if( !empty($_CSSADDFILE) ){
$tmp = explode(',',$_CSSADDFILE);
for($n=0; $n<count($tmp); $n++){
if( eSubstrCount(mb_strtoupper($tmp[$n]), '.CSS')==1 ) list($tmp[$n],) = explode('.',$tmp[$n]);
$tmp[$n] = _InVar(trim($tmp[$n])).".css";
if( file_exists($_PathCSS."/".$tmp[$n]) ){
eLink($tmp[$n]);
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
if( $_NOSORT ) echo '<style>TH{cursor:var(--cAuto);}</style>'.$__Enter;
if( $_SubModo!='l' || !empty($_JSSELROW) ) $_CURSORTYPE = 'cursor:var(--cPointer);';
if( !empty($_HTMHEAD) ) _IncludeJsHtml($_HTMHEAD, "HTMHead");
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
if( isset($_WINCLOSEESC) && $_WINCLOSEESC ){
echo 'S.windowCloseWithEsc(window);';
}
echo 'if( !window.frameElement.WOPENER ) window.frameElement.WOPENER = window.parent;';
if( $_DEBUG==13 || ( $_DEBUG>19 && $_DEBUG<30 ) ){
echo "var _DEBUG = {$_DEBUG},".$__Enter;
}else{
echo "var _DEBUG = 0,".$__Enter;
}
if( $_OtroDiccionario ) echo '_DB = "'.$_DB.'",';
if( SESS::$_Development || !empty(SESS::$_D_) ){
if( isset($_iToolsAdd) ) echo "_iToolsAdd = '{$_iToolsAdd}',";
}
if( isset($_xPERSISTENTVAR) ) $_PERSISTENTVAR = $_xPERSISTENTVAR;
if( !empty($_PERSISTENTVAR) ){
$txt = '_PERSISTENTVAR = new Array(';
$tmp = explode(",", $_PERSISTENTVAR);
$n = 0;
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
if( isset(${$tmp[$i]}) ){
if( $tmp[$i][0]=='_' ){
if( $n>0 ) $txt .= ',';
$txt .= "'{$tmp[$i]}',".'"'.eQuote(${$tmp[$i]}).'"';
$n++;
}
}
}
$txt .= ');';
if( $n>0 ) echo $txt.$__Enter;
}
if( !$_SUBLISTADO_ && $_FixList && mb_strlen($_SubMode)==2 && isset($_OPTIONSINLIST) ) $_SUBLISTADO_ = 1;
if( count($_COLSOP)>0 && $_COLSOP[0]=="S" && isset($_OPTIONSINLIST) ) unset($_OPTIONSINLIST, $_OPTIONSINLISTALL, $_OPTIONSINLISTRANGE);
echo '_PAGTITLE = "'.((empty($_PAGTITLE))? SETUP::$System['CopyRight'] : $_PAGTITLE).'",';
echo '_PAGFOOT = "'.((empty($_PAGFOOT))? '&b&bPág. &p/&P' : $_PAGFOOT).'",';
echo '_PAGROTATE = '.(($_PAGROTATE)? 'true':'false').',';
echo '_PAG = ['.$_PAGMARGIN.'],';
echo '_LogImprimir = '.((SETUP::$LogTrace["D*"] || SETUP::$LogTrace["DPRN"])? 'true':'false').',';
echo '_USERFUNCTION = "'.$_USERFUNCTION.'",';
echo '_SUBLISTADO_ = '.(($_SUBLISTADO_==1)? 'true':'false').',';
echo '_INSUBWIN_ = '.((isset($_OPTIONSINLIST))? 'true':'false').',';
echo '_WINSPLITE='.((isset($_WINSPLITE)) ? '"'.$_WINSPLITE[2].'"' : 'null').',';
echo '_WINSPLITEURL='.((isset($_WINSPLITE[4])) ? '"'.$_WINSPLITE[4].'"' : 'null').',';
echo '_CARDSHOW = '.(($_CARDSHOW)? 'true':'false').',';
echo '_ModeCard = false,';
echo "_TargetUrl = '{$_TargetUrl}',";
echo '_ListMenuRow = '.(($_OptionsInListMenuRow)? 'true':'false').',';
if( !isset($_NmGDF) ){
$_NmGDF = "";
}
if( !isset($_CHANGEFILTERMEMORY) ){
$_CHANGEFILTERMEMORY = false;
}
$_SourceScript = $OriFichero;
echo '_Source=_DESDE_=_FCH_="'.eQuote($OriFichero).'",';
if( isset($DFichero[0]) ) echo '_SourceOne="'.$DFichero[0].'",';
echo '_BYPHONE = '.((SESS::$_BYPHONE) ? 'true' : 'false').',';
echo '_PRINT_STATUS = '.(( SESS::${"print".(($_EXPORTSCOPE=="public") ? "_public" : "_private")} ) ? 'true' : 'false').',';
echo "_Obj='L', _Mode='{$Opcion}', _SubMode='{$_SubMode}', _NmGDF='{$_NmGDF}',";
if( !isset($_PSOURCE) ) $_PSOURCE='';
echo "_PSOURCE='{$_PSOURCE}',";
echo "_CONTEXT=".eContextPKMain().",";
echo '_STOP='.(($_STOP) ? 'true' : 'false').','.$__Enter;
echo "_FORMBUTTONS='{$_FORMBUTTONS}',";
echo '_pOBJ_ = _WOPENER = window.frameElement.WOPENER,';
echo '_pFCH_ = _WOPENER._Source,';
echo '_eID = new Date().getTime(),';
echo '_pID = _WOPENER._eID,';
echo '_WinCaption = '._PrintBoolean(isset($_WINCAPTION)).",";
echo '_Mover = false,';
echo '_SortListSave = false,';
echo '_ChangeFilterMemory = '._PrintBoolean($_CHANGEFILTERMEMORY).",";
if( !isset(SETUP::$System['Call3CXList']) ){
SETUP::$System['Call3CXList'] = false;
}
if( isset($GLOBALS["_3CX"]["_NO_"]) && $GLOBALS["_3CX"]["_NO_"] ){
echo '_3CXList=false,_3CXCols={},';
}else{
echo '_3CXList = '._PrintBoolean(SETUP::$System['Call3CXList']).",";
echo '_3CXCols = {';
if( isset($GLOBALS["_3CX"]) ){
$n = 0;
foreach($GLOBALS["_3CX"] as $k=>$v){
if( (++$n)>1 ) echo ",";
echo "'{$k}':true";
}
}
echo "},";
}
if( $_DEBUG==2 ) echo '_ShowError=1,';
echo "_WideListing={$_WideListing},";
if( isset($_GET['_SEL_']) ) echo "_Assign='c',";
echo '_ListTypeFormat = "'.$_ListTypeFormat.'",';
echo '_MaxVisibleRows='.((isset($_MaxVisibleRows) && $_MaxVisibleRows>0) ? $_MaxVisibleRows : 0).',_VisibleRows=0;';
if( !SETUP::$Desktop['MenuAutoHidden'] ) echo "if(window.name=='IWORK') top.eAutoMenu({$_AUTOMENU});".$__Enter;
echo "var _ymd=_D2S=_Hoy='".date('Ymd')."',_Time='".date('H:i:s')."',_iEDes={$_ENV[SYS]['iEDes']},_Connection_=".SESS::$_Connection_.",_User={$_User},_Node={$_Node};".$__Enter;
if( !$_CURSOR ) echo 'S(window).rule("-.BROWSE TBODY TR:hover > TD");';
if( $_GREENBAR ){
echo 'var _GREENBAR = 2,';
}else{
echo 'var _GREENBAR = 0,';
}
if( !isset($_MAXRECFULL) ) $_MAXRECFULL = false;
if( !empty($_MAXREC) ) $_MAXRECFULL = false;
echo '_MAXRECFULL = '.(($_MAXRECFULL)?'true':'false').';'.$__Enter;
if( $VieneDeFicha ){
$_DELFILTER = array();
if( isset($_GET['_CAMPO_']) ){
echo "var _GetCampo = '{$_GET["_CAMPO_"]}';";
echo 'document.title = "Ventana selección";';
}else{
echo "var _GetCampo = '#';";
}
}else{
if( !empty($_DELFILTER) && eSubstrCount(mb_strtoupper($_DELFILTER[0]), '{OP}')>0 ){
$_DELFILTER[0] = mb_substr($_DELFILTER[0],0,mb_strpos($_DELFILTER[0],'{')).'cR'.mb_substr($_DELFILTER[0],mb_strpos($_DELFILTER[0],'}')+1);
}
echo "var _GetCampo = '#';";
}
echo 'var _NOTITLE = '.(($_NOTITLE==true)?'1':'0').';';
echo 'var _ConImpresora = '.(( $_NOTOOLS=='' || similar_text('*P',$_NOTOOLS)==0 ) ? 'true':'false').';';
if( !SESS::$_Development && SESS::$_D_=='' ){
echo 'document.oncontextmenu = new Function("return false");';
echo 'document.onselectstart = new Function("return false");';
}
if( mb_strstr($FicheroD,'.ldf') || isset($_GET['_SEL_']) ){
echo 'var _SelectON = true;';
}else if( !$VieneDeFicha || $_NOSELECTROW ){
echo 'var _SelectON = false;';
$_EnVentana = false;
}else{
echo 'var _SelectON = true;';
$_EnVentana = true;
}
if( isset($_TituloSubVentana) ){
$tmp = str_replace('"', '\"', EnPlural('', $_TITLE, false));
if( !empty($tmp[0]) && $tmp[0]=='=' ) $tmp = mb_substr($tmp,1);
$tmp = '';
echo 'var _SWTitle = "'.$tmp.'";';
}
if( !empty($_JS_) ){
$tmp = explode('|', $_JS_);
for( $n=0; $n<count($tmp); $n++ ) echo "\nvar ".$tmp[$n].';';
}
if( isset($_WINLIST) ){
echo "var _AutoSize = new Array({$_WINLIST[0]},{$_WINLIST[1]},'{$_WINLIST[2]}','{$_WINLIST[3]}');";
}else{
echo "var _AutoSize = new Array(0,0,'','{$_WINTITLE}');";
}
if( $_TGrupos>0 ){
$_RD = '';
}else{
$_RD = ' onmousemove=_RDCursorOver() onmouseleave=_RDCursorOut() onmousedown=_RDDown()';
}
$_RD = '';
$_sEDITLIST = $_EDITLIST[0];
if( !empty($_EDITLIST[0]) && empty($_EDITLIST[3]) ) $_EDITLIST[3] = 0;
echo "var _CmpAEditar = '{$_EDITLIST[0]}',";
echo "_FuncChkEd = '{$_EDITLIST[1]}',";
echo "_FuncIniEd = '{$_EDITLIST[4]}',";
echo "_ScriptEd = '|".((isset($_DBLOG) && count($_DBLOG)>0)?'L':'')."|{$_EDITLIST[5]}|{$_EDITLIST[6]}',";
echo "_DBExt = '".((empty($_EDITLIST[6]))?'':'&_DB='.$_EDITLIST[6])."',";
if( !empty($_EDITLIST[0]) ) echo "_DBTABLE='{$_DBTABLE}',";
echo '_EditMode = '.((empty($_EDITLIST[3]))? 0:$_EDITLIST[3]).',';
if( !$_ConChartSWF ) echo '_CHARTGRID='.(($_CHARTGRID=='')?'false':'true').',';
echo '_Remote='.((isset($_REMOTE_)) ? 'true' : 'false').','.$__Enter;
echo '_ShowZero=1,';
echo '_ShowZeroFields={';
if( isset($_ShowZeroFields) ){
$n = 0;
foreach($_ShowZeroFields as $k=>$v){
if( $n++>0 ) echo ",";
echo "{$k}:{$v}";
}
}
echo "},".$__Enter;
echo '_SortList=-1,'.$__Enter;
echo '_RD='.(($_RD=='')?'false':'true').','.$__Enter;
echo '_PagIncremental='.((isset($_PAGINCR))?'true':'false').',';
if( isset($_TOOLSCMP) ) echo "_ToolsCMP={$_TOOLSCMP},";
if( isset($_COLSWIDTHJS) ) echo '_ColsWidthJs="'.eNsp($_COLSWIDTHJS),'",';
echo 'ISCLI='.((ISCLI)? 'true':'false').',';
echo "_MarkVisited='Visited';";
if( count($_COLSOPFORM)>0 ){
echo 'var _InformeTH = new Array();';
for($n=0; $n<count($_COLSOPFORM); $n++){
echo '_InformeTH.push([-'.($n+1).', "'.$_COLSOPFORM[$n][2].'", "'.eClearAccent(eQuote($_COLSOPFORM[$n][0]), 1).'", 0, '.$_COLSOPFORM[$n][4].', null]);';
}
}
echo '</SCRIPT>';
if( $_HayROWCOLOR && mb_substr($_ROWCOLOR[0],-1)!=')' ){
$tmp = array();
for( $nf=0; $nf<count($_Form); $nf++ ){
$campo = _NomFields($_Form[$nf][1]);
$tmp[] = mb_chr(48+mb_strlen($_Form[$nf][1])).'|'.$campo.'|'.$nf;
}
sort($tmp);
for( $nf=count($_Form)-1; $nf>=0; $nf-- ){
$tmp2 = explode('|',$tmp[$nf]);
if( eSubstrCount($_ROWCOLOR[0], $tmp2[1])>0 ){
$_ROWCOLOR[0] = str_replace($tmp2[1], '$row['.$tmp2[2].']', $_ROWCOLOR[0]);
}
}
}
$dimJS = ['binary.js', 'lista.js', 'lista_sel.js'];
if( !empty($_EDITLIST[0]) ) array_push($dimJS, 'editlist.js');
if( !empty($_RD) ) array_push($dimJS, 'rdcolumn.js');
_FileNoCache($dimJS); unset($dimJS);
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
if( !empty($_JSHEAD) ) _IncludeJsHtml($_JSHEAD, "JSHead");
if( !empty($_PHPHEAD) ){
$tmpFile = GrabaTmp('l_phphead', $_PHPHEAD, $LenDoc, $_FILE_PHPHEAD);
include($tmpFile);
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset($_PHPHEAD);
}
$_HELP = 'top.gsHelpErr(window);'.$_HELP;
$gsEdition = '';
if( !empty(SETUP::$System['WaterMarking']) ) $_WaterMarkingCSS = "background-image:url(".SETUP::$System['WaterMarking']."); background-repeat:no-repeat; background-attachment:fixed;";
if( isset($_JSONLOAD) ) $_ONLOAD .= '_JsOnLoad();';
if( !isset($_WaterMarkingCSS) ) $_WaterMarkingCSS = "";
echo "</HEAD><BODY class='".((isset($_ISUBLIST) && $_ISUBLIST==true)?'ISubListBODY':'BODYLIST')." SCROLLBAR'";
echo " style='v-isibility:hidden; display:inline-table;";
echo "text-align:".((isset($_ISUBLIST) && $_ISUBLIST==true)? "left;" : "center; v-isibility:visible;");
echo "margin:0px;padding:0px;{$_WaterMarkingCSS}".((isset($_NOTITLE) && $_NOTITLE==true)?';border:0px':'')."'";
echo " onclick='S.selectNone(window)'",
" onresize='MovTitulos()'",
" onscroll='MovTitulos()'",
" onbeforeunload='Cerrar()'",
" onwheel='_MovBody()'",
" onload='eCardLoad();Recalcula();WidthSubTitle();CondicionesLeft();{$gsEdition}{$_ONLOAD}'",
" ondragstart='return false'",
" onmousemove='S.inactivity()'",
" ontouchstart='S.inactivity()'",
" onkeydown='S.help(window,event)'";
if( !empty(SESS::$_D_) && !($OriFichero[0]=="$" && SESS::$_D_<>"~") ){
echo " oncontextmenu=top.gsEdit(window)";
}
if( !empty($_TIPFORM['BODY']['F']) ){
$bTitle = $_TIPFORM['BUTTON']['F'];
if( $bTitle=='>' ){
echo " eHelp='#_TIP_F_BODY'";
}else{
echo " eHelp='{$bTitle}'";
}
}
if( $_ListToolsMenuType=="H" ) echo " onmouseleave='_LToolsView()'";
echo ">".$__Enter;
?>
<s-spinner onclick="this.style.display='none'">
<span></span>
</s-spinner>
<?PHP
if( isset($_LISTMULTISELECT) ){
if( count($_COLSOP)>0 ) eMessage("ERROR: la etiqueta [ColsOp] es incompatible con [ListMultiSelect]", "HSE");
$_GREENBAR = false;
if( $_LISTMULTISELECT[0]=="" ) $_LISTMULTISELECT[0] = "Terminar selección";
$_LISTMULTISELECT[1] = _InVar($_LISTMULTISELECT[1]);
if( eSubstrCount($_LISTMULTISELECT[1], ".")>0 ){
$tmp = $_LISTMULTISELECT[1];
$_LISTMULTISELECT[1] = "";
eContextPut("E:".$tmp);
}else $tmp = "";
if( !(mb_substr($tmp,0,3)=="FC:" && $_LISTMULTISELECT[1]=="") ){
?>
<table class="AddButton" onclick="eListMultiSelectOk()" title="" border="0px" cellspacing="0px" cellpadding="0px" style="display:table;position:fixed;left:2px;bottom:10px;padding-right:5px;"><tbody><tr>
<td onclick="eListMultiSelecMenu()"><i class="ICONBUTTON ICONSEEK">'</i></td>
<td style="padding-left:4px"><?=$_LISTMULTISELECT[0]?></td>
<td id="MOVER" style="width:1px;padding-left:5px;cursor:move;"><i class="ICONBUTTON ICONMOVE" style="cursor:move">~</i></td>
</tr></tbody>
</table>
<form accept-charset="utf-8" name="LISTMULTISELECT" METHOD="POST" ACTION="edes.php?E:<?=$tmp."&sufijo=".$_DBINDEX.eContextAddUrl()?>" eJS="<?=$_LISTMULTISELECT[1]?>" eUserFunction="<?=$_LISTMULTISELECT[2]?>" eTR="<?=mb_strtoupper($_LISTMULTISELECT[3])?>" style="display:none">
<input name="_PK_MULTISELECT_" value="">
</form>
<?PHP
}
}
if( !empty($_OPTIONSINLISTRANGE) && empty($_DBADDFILTER) ){
$_DBADDFILTER = $_OPTIONSINLISTRANGE;
}
$_OptionsInListOps = array();
if( isset($_OPTIONSINLIST) ){
?>
<table class="MENUFOOTLIST" title="" border="0px" cellspacing="0px" cellpadding="0px" style="display:<?=(($_OptionsInListMenuRow)?"none":"table")?>; position:fixed; width:100%; z-index:3;"><tbody><tr>
<?PHP
$_DimOptionList = array(
"f"=>'<td class=OP op="f" onclick=_ModeFilter() eTitle="'.$__Lng[108].'"><i class="ICONINPUT">S</i> '.$__Lng[108].'</td>',
"a"=>'<td class=OP op="a" onclick=_ModeChange("a") eTitle="'.$__Lng[1].'"><i class="ICONINPUT ICONINSERT">I</i> '.$__Lng[1].'</td>',
"b"=>'<td class=OP op="b" onclick=_ModeChange("b") eTitle="'.$__Lng[127].'"><i class="ICONINPUT ICONDELETE">D</i> '.$__Lng[128].'</td>',
"c"=>'<td class=OP op="c" onclick=_ModeChange("c") eTitle="'.$__Lng[3].'"><i class="ICONINPUT ICONVIEW">V</i> '.$__Lng[129].'</td>',
"m"=>'<td class=OP op="m" onclick=_ModeChange("m") eTitle="'.$__Lng[2].'"><i class="ICONINPUT ICONUPDATE">U</i> '.$__Lng[130].'</td>',
"u"=>'<td class=OP op="u" onclick=_ModeChange("u") eTitle="'.$__Lng[89].'"><i class="ICONINPUT ICONUPDATE">&#222;</i> '.$__Lng[89].'</td>',
"o"=>'<td class=OP op="o" onclick=_ModeUserFunction("#2#","o") uFunc="#2#" eTitle="#3#">#1#</td>',
","=>'<td class=SEPARATOR></td>',
);
$dim = "auf";
for($n=0; $n<3; $n++){
if( eSubstrCount($_OPTIONSINLIST[0],$dim[$n])>0 ) $_OPTIONSINLIST[0] = $dim[$n].str_replace($dim[$n],"",$_OPTIONSINLIST[0]);
}
if( $_OPTIONSINLISTALL ) $_OPTIONSINLIST[0] = str_replace("u","",$_OPTIONSINLIST[0]);
for($n=0; $n<mb_strlen($_OPTIONSINLIST[0]); $n++){
$c = mb_substr($_OPTIONSINLIST[0],$n,1);
if( $c=="o" ){
for($p=1; $p<count($_OPTIONSINLIST); $p+=3){
if( $_OPTIONSINLIST[$p+1]<>"" ){
list($_OPTIONSINLIST[$p+1]) = explode("(",$_OPTIONSINLIST[$p+1]);
$txt = $_DimOptionList[$c];
if( $_OPTIONSINLIST[$p+1][0]==">" ){
$txt = '<td class=OP op="o" onclick="'.trim(mb_substr($_OPTIONSINLIST[$p+1],1)).'(this)" uFunc="#2#" eTitle="#3#">#1#</td>';
}else{
$txt = str_replace('"o"', '"o'.(($p==1)?"":(($p-1)/3)).'"', $txt);
}
if( $_OPTIONSINLIST[$p+1][0]==">" ){
$txt = str_replace("#2#", mb_substr($_OPTIONSINLIST[$p+1],1), $txt);
}else{
$txt = str_replace("#2#", $_OPTIONSINLIST[$p+1], $txt);
}
if( $_OPTIONSINLIST[$p]=="" ) $_OPTIONSINLIST[$p] = "==&#230;";
if( eSubstrCount($_OPTIONSINLIST[$p+1],"(")>0 ) $_OPTIONSINLIST[$p+1] = explode("(",$_OPTIONSINLIST[$p+1])[0];
$txt = str_replace("#3#", $_OPTIONSINLIST[$p+2], $txt);
$txt = str_replace("#1#", eIcon($_OPTIONSINLIST[$p], 'class="ICONINPUT ICONUPDATE"')." ".str_replace('"',"&#34;",$_OPTIONSINLIST[$p+2]), $txt);
echo $txt;
}
}
}else{
echo $_DimOptionList[$c];
$_OptionsInListOps[] = $c;
}
}
?>
<td style="width:100%"></td>
</tr></tbody>
</table>
<i id="MenuFootLeft" class="ICONINPUT" onclick="_ModeScroll(0)" style="display:none;position:fixed;bottom:0px;left:-2px;z-index:5;"><</i>
<i id="MenuFootRight" class="ICONINPUT" onclick="_ModeScroll(1)" style="display:none;position:fixed;bottom:0px;right:0px;z-index:5;">></i>
<script type='text/javascript'>
var _SubModeOptionsInList = _SubMode[0];
_SelectON = true;
_InSubWin = true;
function _ModeScroll(tipo){
var o = S(".MENUFOOTLIST"),
i = o.css("left"),
td=S(".MENUFOOTLIST TD").dim, n,p;
if(tipo==0){
if( i<0 ){
for(n=td.length-1; n>=0; n--){
if( td[n].offsetLeft<(i*-1) ){
if( n==0 ){
o.css("left",0);
S("#MenuFootLeft").none();
break;
}
p = td[n].offsetLeft-S("#MenuFootLeft").obj.offsetWidth;
o.css("left",-p);
break;
}
}
}
S("#MenuFootRight").block();
}else{
S("#MenuFootLeft").block();
for(n=td.length-1; n>0; n--){
if( (td[n].offsetLeft+i)<document.body.clientWidth ){
p = td[n].offsetLeft-S("#MenuFootLeft").obj.offsetWidth;
o.css("left",-p);
if( (document.body.clientWidth-o.obj.offsetWidth+p)>0 ){
o.css("left", -(o.obj.offsetWidth-document.body.clientWidth));
}
break;
}
}
if( (document.body.clientWidth+p)>=o.obj.offsetWidth ){
S("#MenuFootRight").none();
}
}
}
function _ModeFilter(){
<?PHP
$url = $_SERVER["QUERY_STRING"];
if( eSubstrCount($url, "&_PSOURCE=")==0 ) $url .= "&_PSOURCE=".eQuote($_FileDF);
?>
var url = 'edes.php?<?=$url?>';
url = S.replace(url, "?"+S.mid(url,"?",":")+":", "?L:");
if( S.is(".gdf", url.split("&")[0]) ){
url = 'edes.php'+S.replace(url, '?L:', '?G'+_SubMode[0]+':').split('edes.php')[1];
}else{
url = 'edes.php'+S.replace(url, '?L:', '?F'+_SubMode[0]+':').split('edes.php')[1];
}
eBusy()
setTimeout(function(){
top.eSWOpen(window, url+'&_SUBINSERT=1&_PSOURCE='+_Source, "", true);
}, 1);
}
function _ModeUserFunction(fun, op){
if( op=="o" ){
eval(fun+"();");
return;
}
_InSubWinURL = "-"+fun;
<?PHP if( $_OptionsInListMenuRow ){ ?>
if( event!=undefined ){
var o = S.event(event);
S(o).info("<?=$__Lng[131]?>: <b>"+o.title+"</b>", 2);
S.eventFire(o.parentNode["eTR"].cells[0], "click");
}
<?PHP } ?>
var o = S.event(window);
S("TD[op]", ".MENUFOOTLIST").class("-MENUFOOTLIST_ON");
S("TD[op='"+op+"']", ".MENUFOOTLIST").class("+MENUFOOTLIST_ON");
}
function _ModeChange(Op){
if( S("TD[op='"+Op+"']", ".MENUFOOTLIST").length==0 ){
S(".MENUFOOTLIST").none();
delete _SelectON;
delete _InSubWin;
S.error('La etiqueta [OptionsInList] no tiene definido el modo "'+_SubMode[0]+'"');
return;
}
_SubModeOptionsInList = Op;
if( !/^(a|f|u)$/.test(Op) ){
S("TD[op]", ".MENUFOOTLIST").class("-MENUFOOTLIST_ON");
S("TD[op='"+Op+"']", ".MENUFOOTLIST").class("+MENUFOOTLIST_ON");
}
<?PHP
$url = $_SERVER["QUERY_STRING"];
if( eSubstrCount($url, "&_PSOURCE=")==0 ) $url .= "&_PSOURCE=".eQuote($_FileDF);
?>
var url = 'edes.php?<?=$url?>';
url = S.replace(url, "?"+S.mid(url,"?",":")+":", "?L:");
if( Op=="a" ){
if( typeof(_OptionsInListFunction)=="function" ){
_OptionsInListFunction("a");
return;
}
if( S.is(".edf", url.split("&")[0]) ){
url = 'edes.php'+S.replace(url, '?L:', '?Fa:').split('edes.php')[1];
}else{
url = 'edes.php'+S.replace(url, '?L:', '?Ga:').split('edes.php')[1];
}
eBusy();
setTimeout(function(){
top.eSWOpen(window, url+'&_CLOSE_=1&_SUBINSERT=1<?=$_TargetUrl?>&_PSOURCE='+_Source, "", true);
}, 1);
}else if( Op=="u" ){
url = 'edes.php'+S.replace(url, '?L:', '?Lgl:').split('edes.php')[1];
location.href = top.S.urlAdd(url);
}else{
if( S.is(".gdf", url.split("&")[0]) ){
_InSubWinURL = 'edes.php'+S.replace(url, '?L:', '?G'+Op+'R:').split('edes.php')[1];
}else{
_InSubWinURL = 'edes.php'+S.replace(url, '?L:', '?F'+Op+'R:').split('edes.php')[1];
}
<?PHP if( $_OptionsInListMenuRow ){ ?>
if( event!=undefined ){
var o = S.event(event), td;
_WasPulse = o;
if( o.parentNode.id!="MENUCARDFLOAT" ){
td = o.parentNode["eTR"].cells[0];
if( td.children.length>0 ) td = o.parentNode["eTR"].cells[1];
else if( S("TH[nc='0']", S.toTag(td,"TABLE")).attr("campo")=="icon" ) td = td.parentNode.cells[1];
}else{
td = S("#BROWSE TBODY TR:nth-child("+(parseInt(o.parentNode["eTR"])+1)+") TD:nth-child(1)").obj;
if( S("#MENUCARDFLOAT").length ) S("#MENUCARDFLOAT").hidden();
}
S(o).info("<?=$__Lng[131]?>: <b>"+o.title+"</b>", 2);
S.eventFire(td, "click");
}
<?PHP }	?>
}
}
_ModeChange(_SubMode[0]);
</script>
<?PHP
}
if( isset($_VIEW) ){
global $_VIEWCOL;
for($i=0; $i<count($_Form); $i++){
$tmp = $_Form[$i];
$numeros = preg_replace('/[^0-9]/', '', $tmp[6]);
if( empty($numeros) ){
$_VIEWCOL[0][] = $i;
}else{
for($j=0; $j<strlen($numeros); $j++){
$_VIEWCOL[$numeros[$j]][] = $i;
}
}
}
$total = count($_VIEW);
if( strtolower($_VIEW[$total-1])=="type=button" ){
unset( $_VIEW[$total-1] );
$_VIEWTYPEBUTTON = true;
}
if( $_ListToolsMenuType!='B' ){
echo '<span class="VIEWCONTAINER" style="position:absolute;left:4px;top:4px;">';
for($n=0; $n<count($_VIEW); $n++){
echo "<i class='ICONINPUT".(($n>0)?" OFF":"")."' onclick='eViewCSS({$n})' onmouseenter=\"S(this).tip('{$_VIEW[$n]}',0,null,1)\" style='cursor:var(--cPointer);margin-left:3px;'>b</i>";
}
echo '</span>';
}
}
echo '<div id="PAGINA" style="border-collapse:collapse; display:inline-table; text-align:-webkit-center; background:transparent;'.((isset($_WINCAPTION))? 'padding:0px;':'').'">';
echo '<form accept-charset="utf-8" name="FieldCondi" METHOD="POST" target="TLF" style="display:none">';
$Enter = '';
$DinNewImp = array();
foreach($_GET as $k=>$v){
if( $k=="_SESS_" || $k=="_MD5" ) continue;
if( $k=="_CONTEXT" ){
echo '<input k="get" type=hidden name='.$k.' value="'.eContextPKMain().'">';
continue;
}
if( eSubstrCount($k,':')==0 ){
$v = trim(stripslashes($v));
if( !empty($v) ){
if( $v[0]==CHR92 ) $v = str_replace( mb_substr($v,0,2), mb_substr($v,1,1), $v );
if( ($v[0]=='"' || $v[0]=="'") && $v[0]==mb_substr($v,-1) ) $v = mb_substr($v,1,-1);
}
echo '<input k="get" type=hidden name='.$k.' value="'.str_replace('"', '&quot;', $v).'">'.$Enter;
$DinNewImp[$k] = 1;
}
}
foreach($_POST as $k=>$v){
if( $k=="_SESS_" || $k=="_MD5" ) continue;
if( eSubstrCount($k,':')==0 && !isset($DinNewImp[$k]) ){
if( isset($_POSTBak[$k]) ){
$v = $_POSTBak[$k];
}
$v = trim(stripslashes($v));
if( !empty($v) ){
if( $v[0]==CHR92 ) $v = str_replace( mb_substr($v,0,2), mb_substr($v,1,1), $v);
if( ($v[0]=='"' || $v[0]=="'") && $v[0]==mb_substr($v,-1) ) $v = mb_substr($v,1,-1);
}
$v = str_replace('"', '&quot;', $v);
$v = str_replace('"', '&#34;' , $v);
$v = str_replace("'", '&#39;' , $v);
echo '<input k="post" type=hidden name='.$k.' value="'.$v.'">'.$Enter;
}
}
unset($DinNewImp);
if( !isset($_POST['_gs_formato_']) && !isset($_GET['_gs_formato_']) ) echo '<input type=hidden name="_gs_formato_" id="_gs_formato_" value="">'.$Enter;
echo '<input type=hidden name="_CACHEFILESRV" id="_CACHEFILESRV" value="">'.$Enter;
echo '<input type=hidden name="_FILEPDF" id="_FILEPDF" value="">'.$Enter;
echo '<input type=hidden name="_GRAPHS" id="_GRAPHS" value="">'.$Enter;
if( empty($_ORDEN_) ) echo '<input type=hidden name="_ORDEN_" id="_ORDEN_" value="">'.$Enter;
if( isset($_CHANGEFILTERMEMORY) && $_CHANGEFILTERMEMORY ) echo '<input type=hidden name="_Filter_View_" id="_Filter_View_" value="">'.$Enter;
if( empty($_gs_formato_) ){
$_ENV[SYS]["MD5Pag"] = _GeneraInputMD5(null, $_Mode);
}
echo '</form>';
if( !empty($_GET['_FILEPDF']) ){
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
@unlink($tmpCursor);
@unlink(str_replace('.cur','.sql',$tmpCursor));
}
if( eSubstrCount('PXFA', $_gs_formato_)>0 ){
if( !empty($_DBSQL) ){
$LeerCur = 1;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
if( (isset($_REG_) || eSubstrCount('PXA', $_gs_formato_)>0 ) && file_exists($tmpCursor) ){
}else{
$LeerCur = 2;
}
}
if( isset($LeerCur) && $LeerCur==1 && !empty($_PDFSAVEVAR) ){
$_SERIALIZE = unserialize(file_get_contents( '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var" ));
foreach($_SERIALIZE as $k=>$v) ${$k} = $v;
unset($_SERIALIZE);
}
}
if( !empty($_HTMINI) ) _IncludeJsHtml($_HTMINI, "HTMIni");
if( !empty(SETUP::$System['commandJS']) || !empty(SESS::$commandJS) ){
eJS(SESS::$commandJS.SETUP::$System['commandJS']);
}
if( !empty($_JSINI) ) _IncludeJsHtml($_JSINI, "JSIni");
if( isset($_JSONLOAD) ){
$_JSONLOAD = 'function _JsOnLoad(){'.$__Enter.$_JSONLOAD.'}'.$__Enter;
_IncludeJsHtml($_JSONLOAD, "JSOnload");
}
if( !empty($_PHPINI) ){
$tmpFile = GrabaTmp('l_phpini', $_PHPINI, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
if( $_CHANGEFILTER ){
function _ChangeFilterGet($sql){
$dim = array();
if( eSubstrCount($sql, "(")>0 ){
list($func) = explode("(",$sql);
$dim = call_user_func($func);
}else if( eSubstrCount($sql, ";")>0 ){
$tmp = explode(';',$sql);
for($i=0; $i<count($tmp); $i++){
list($pk, $txt) = explode(',',$tmp[$i]);
$dim[] = array(trim($pk), trim($txt));
}
}else{
qQuery($sql,$p1);
while($r=qRow($p1)) $dim[] = $r;
}
return $dim;
}
if( isset($_CHANGEFILTERMEMORY) && $_CHANGEFILTERMEMORY ){
$_CHANGEDIM = _ChangeFilterGet($_CHANGEFILTERDATA);
}
}
if( !empty($_PHPGRID) ){
$tmpFile = GrabaTmp('l_phpgrid', $_PHPGRID, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_PHPGRID = '#';
}
if( $_STOP ){
$ExeJS = '';
$ExeSg = 5000;
}else{
$ExeJS = '';
$ExeSg = 2000;
}
echo $__Enter;
if( !empty($_PHPFORM) ){
if( !function_exists('ModFormulario') ){
$_PHPFORM = 'function ModFormulario(&$_Form, $Opcion, $Fichero, $nHoja, &$_vF, $_pField){'.CHR10.$_PHPFORM.'}';
$tmpFile = GrabaTmp('l_phpform', $_PHPFORM, $LenDoc, $_FILE_PHPFORM);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPFORM);
}
$DimForm = array();
for($i=0; $i<count($_Form); $i++){
$DimForm[_QueNmField($_Form[$i], $i)] = $_Form[$i];
}
ModFormulario($DimForm, $Opcion, $Fichero, 1, $_vF, $_pField);
$_Form = array(); $n = 0;
foreach($DimForm as $key=>$Valor){
if( count($DimForm[$key])>=11 || $Valor[0][0]=='{' ) $_Form[$n++] = $Valor;
}
if( count($_ROWSOP)>0 ){
_recalcRowsOp();
}
}
foreach($_POST as $k=>$v){
if( mb_substr($k,0,8)=="_FILTER_" && isset($_POST[mb_substr($k,8)]) ){
if( $_POST[mb_substr($k,8)]!="" && $_POST[$k] ){
$_POST["_INPUT_".mb_substr($k,8)] = '(Lista de selección)';
}
}
}
$Campos  = '';
$sCampos = '';
$NCampos = count($_Form);
$FormDel = array();
$DimAlias = array();
$DimAliasField = array();
$_EditListValue = array();
$_EditListSql = array();
$_EditListNCampos = 0;
if( count($_RELATIONFIELDS)>0 ){
for($n=0; $n<count($_RELATIONFIELDS); $n++){
$tmp = explode(',',$_RELATIONFIELDS[$n]);
for($i=1; $i<count($tmp); $i++){
if( eSubstrCount(','.$_EDITLIST[0].',', ','.$tmp[$i].',')==1 ){
$_EditListValue[$tmp[$i]] = 'EL';
for($p=$i-1; $p>0; $p--) $_EditListValue[$tmp[$p]] = 'EL';
}
}
}
}
if( $HaySelect ){
$DifCampos = count($_Form);
$CamposAEliminar = array();
for($n=0; $n<$NCampos; $n++){
if( $_ColVirtual[$n] ) continue;
$_Form[$n][_OOFIELD] = $_Form[$n][_FIELD];
if( eSubstrCount('MSSsX.SL.', $_Form[$n][3])>0 ){
if( eSubstrCount($_Form[$n][1], ':')>0 ){
$tmp = $_Form[$n][1];
$_Form[$n][1] = trim(mb_substr($_Form[$n][1], 0, mb_strpos($_Form[$n][1],':')));
array_push($_Form, $_Form[$n]);
$_Form[$n][1] = $tmp;
$_Field[$tmp] = false;
}else if( eSubstrCount($_Form[$n][1], '{')>0 ){
$sTmp = $_Form[$n][1];
$tmp = str_replace('{', ',', $_Form[$n][1]);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$_Form[$n][1] = $tmp[0];
$_Field[$tmp[0]] = false;
array_push($_Form, $_Form[$n]);
$_Form[$n][1] = $sTmp;
}else if( $_Form[$n][3]=="Ss" && mb_substr($_Form[$n][1],0,3)!="cd_" ){
continue;
}else{
array_push($_Form, $_Form[$n]);
$_Field[$_Form[$n][1]] = false;
}
$_Form[$n][2] = 'D';
$c = count($_Form)-1;
$_Form[$c][3] = 'T';
$_Form[$c][6] = '*';
if( eSubstrCount(",{$_DBINDEX},", ','.$_Form[$c][1].',' )==0 ){
for($i=0; $i<$c; $i++){
if( $_Form[$i][1]==$_Form[$c][1] ){
if( $_EditListValue[$_Form[count($_Form)-1][1]]!='EL' ){
$New = array();
for($o=0; $o<count($_Form)-1; $o++) $New[] = $_Form[$o];
$_Form = $New; unset($New);
}else{
$_EditListSql[$_Form[count($_Form)-1][1]] = count($_Form)-1;
if( $_EditListValue[$_Form[$c][1]]!='EL' ) $CamposAEliminar[] = $c;
}
break;
}
}
}else{
for($i=0; $i<$c; $i++){
if( $_Form[$i][1]==$_Form[$c][1] && $_Form[$i][3][0]==$_Form[$c][3][0] ){
if( !empty($_EDITLIST[0]) ){
$_EditListValue[$_Form[count($_Form)-1][1]] = '';
$_EDITLIST[0] = str_replace(",{$_Form[count($_Form)-1][1]},", ',', $_EDITLIST[0]);
}
$New = array();
for($o=0; $o<count($_Form)-1; $o++) $New[] = $_Form[$o];
$_Form = $New; unset($New);
break;
}
}
}
}
}
if( count($CamposAEliminar)>0 ){
$sForm = $_Form;
$_Form = array();
for($i=0; $i<count($sForm); $i++) if( !in_array($i, $CamposAEliminar) ) $_Form[] = $sForm[$i];
}
$NCampos = count($_Form);
$CodAlias = 65;
$alias = 'A';
if( eSubstrCount($_DBTABLE, ' ')==0 ){
$DimAlias[$_DBTABLE] = $alias;
$_DBTABLE = $_DBTABLE.' A';
}else{
$tmp = explode(' ',$_DBTABLE);
$DimAlias[$tmp[0]] = $alias;
$_DBTABLE = str_replace($tmp[0].' ', $tmp[0].' A ',$_DBTABLE);
}
for($n=0; $n<$NCampos; $n++){
if( $_ColVirtual[$n] ) continue;
$_SelectReal[$_Form[$n][1]] = $_Form[$n][1];
$alias = 'A';
if( eSubstrCount('MSSsX.SL.', $_Form[$n][3])>0 ){
$ssCampo = $_Form[$n][1];
$CodAlias++;
$alias = mb_chr($CodAlias);
$_DBTABLE .= ' left join ';
if( eSubstrCount($_Form[$n][1], ':')>0 ){
$aCampo = '';
if( eSubstrCount($_Form[$n][1], ' ')>0 ){
$tmp = explode(' ',$_Form[$n][1]);
$oCampo = $tmp[0];
$aCampo = $tmp[count($tmp)-1];
$_Form[$n][1] = $oCampo;
}
$OriCampo = trim(mb_substr($_Form[$n][1], 0, mb_strpos($_Form[$n][1], ':')));
$_Form[$n][1] = trim(mb_substr($_Form[$n][1], mb_strpos($_Form[$n][1], ':')+1 ));
if( mb_substr($_Form[$n][1],0,3)=='cd_' ){
$_pF[$_Form[$n][1]] = $n;
$_DBTABLE .= mb_substr($_Form[$n][1], 3)." {$alias} on {$alias}.{$_Form[$n][1]}=A.{$OriCampo}";
$DimAlias[mb_substr($_Form[$n][1], 3)] = $alias;
if( mb_strtoupper($_Form[$n][3])=='SS' ){
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( eSubstrCount( ','.$_RELATIONFIELDS[$i].',', ','.$OriCampo.',' ) == 1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for( $p=count($xTmp)-1; $p>0; $p-- ){
if( $Anadir ){
for( $x=0; $x<count($_Form); $x++ ){
if( eSubstrCount( $_Form[$x][_OOFIELD], ':' ) > 0 ){
list($NewCampo,$oNewCampo) = explode(':',$_Form[$x][_OOFIELD]);
}else if( eSubstrCount( $_Form[$x][_OOFIELD], '{' ) > 0 ){
list($oNewCampo) = explode('{',$_Form[$x][_OOFIELD]);
$NewCampo = str_replace('{',',',$_Form[$x][_OFIELD]);
$NewCampo = str_replace('}',',',$NewCampo);
list(,,$NewCampo) = explode(',',$NewCampo);
}else{
$oNewCampo = $_Form[$x][_OFIELD];
$NewCampo = $_Form[$x][_OFIELD];
}
$oNewCampo = trim($oNewCampo);
$NewCampo = trim($NewCampo);
if( $oNewCampo==$xTmp[$p] ){
$_DBTABLE .= " and {$alias}.{$NewCampo}=A.{$xTmp[$p]}";
break;
}
}
}
if( $OriCampo==$xTmp[$p] ) $Anadir = true;
}
break;
}
}
}
$FormDel[] = $OriCampo;
$_Form[$n][1] = 'nm_'.mb_substr($_Form[$n][1], 3);
if( $aCampo=='' ){
$_pF['*'.$_Form[$n][1]] = $n;
}else{
$_Form[$n][1] .= ' '.$aCampo;
$_pF[$aCampo] = $n;
$_pF['*'.$aCampo] = $n;
}
}
if( eSubstrCount($_FILTER, "A.{$OriCampo}")==0 ){
$_FILTER = str_replace($OriCampo, "A.{$OriCampo}", $_FILTER);
}
}else if( eSubstrCount($_Form[$n][1], '{')>0 ){
$txt = $_Form[$n][1];
list($iz,$dr) = explode('}',$_Form[$n][1]);
if( !empty($dr) ) $_Form[$n][1] = $txt = $iz.' '.trim($dr).'}';
$txt = str_replace('{', ',', $txt);
$txt = str_replace('}', '', $txt);
$tmp = array();
$ni = 0;
$tmp[$ni] = '';
$Apostrofe = '';
for($i=0; $i<mb_strlen($txt); $i++){
$c = mb_substr($txt,$i,1);
if( $c=='"' || $c=="'" ) $Apostrofe = ($Apostrofe=='') ? mb_substr($txt,$i,1) : '';
if( $c==',' && $Apostrofe=='' ){
$ni++;
$tmp[$ni] = '';
continue;
}
$tmp[$ni] .= $c;
}
for($i=0; $i<count($tmp); $i++) $tmp[$i] = trim($tmp[$i]);
if( count($tmp)>4 ){
if( eSqlType('mysql,mysqli') ){
list( $tmp[3] ) = explode(' ',$tmp[3]);
$tmp[3] = 'concat(trim('.$alias.'.'.$tmp[3].')';
for( $i=4; $i<count($tmp); $i++ ){
if( mb_substr($tmp[$i],0,1) == '"' || mb_substr($tmp[$i],0,1) == "'" ){
$tmp[3] .= ','.$tmp[$i];
}else{
if( eSubstrCount($tmp[$i], ' ')==1 ){
list( $tmp[$i] ) = explode(' ',$tmp[$i]);
}
$tmp[3] .= ',trim('.$alias.'.'.$tmp[$i].')';
}
}
$tmp[3] .= ')';
}else if( eSqlType('informix,oracle') ){
list( $tmp[3] ) = explode(' ',$tmp[3]);
$tmp[3] = "trim(nvl(".$alias.'.'.$tmp[3].",''))";
for( $i=4; $i<count($tmp); $i++ ){
if( $i>3 ) $tmp[3] .= ' || ';
if( mb_substr($tmp[$i],0,1) == '"' || mb_substr($tmp[$i],0,1) == "'" ){
$tmp[3] .= $tmp[$i];
}else{
if( eSubstrCount($tmp[$i], ' ')==1 ){
list( $tmp[$i] ) = explode(' ',$tmp[$i]);
$tmp[3] .= "trim(nvl(".$alias.'.'.$tmp[$i].",''))";
}else{
$tmp[3] .= "trim(nvl(".$alias.'.'.$tmp[$i].",''))";
}
}
}
}
$tmp = array_splice($tmp, 0, 4);
$OriCampo = $tmp[0];
$_DBTABLE .= $tmp[1];
$_DBTABLE .= " {$alias} on {$alias}.{$tmp[2]}=A.{$OriCampo}";
$DimAlias[$tmp[1]] = $alias;
$FormDel[] = $OriCampo;
$_Form[$n][1] = $tmp[3];
if( isset($tmp[4]) ) $_Form[$n][1] .= ' '.$tmp[4];
if( eSubstrCount($_Form[$n][1], ' ')>0 ){
$tmp2 = explode(' ', $_Form[$n][1]);
$_pF['*'.$tmp2[count($tmp2)-1]] = $n;
}
$alias = '';
}else{
$OriCampo = $tmp[0];
$_DBTABLE .= $tmp[1];
$_DBTABLE .= " {$alias} on {$alias}.{$tmp[2]}=A.{$OriCampo}";
$DimAlias[$tmp[1]] = $alias;
if( mb_strtoupper($_Form[$n][3])=='SS' ){
for($i=0; $i<count($_RELATIONFIELDS); $i++){
if( eSubstrCount(','.$_RELATIONFIELDS[$i].',', ','.$tmp[0].',')==1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for($p=count($xTmp); $p>0; $p--){
if( $Anadir ){
for($x=0; $x<count($_Form); $x++){
if( eSubstrCount( $_Form[$x][_OOFIELD], ':' )>0 ){
list($oNewCampo) = explode(':',$_Form[$x][_OFIELD]);
$NewCampo = trim(mb_substr( $_Form[$x][_OFIELD], mb_strpos( $_Form[$x][_OFIELD], ':')+1 ));
}else if( eSubstrCount( $_Form[$x][_OOFIELD], '{')>0 ){
$oNewCampo = $_Form[$x][_FIELD];
list(,$NewCampo) = explode(',', $_Form[$x][_OOFIELD]);
}else{
$oNewCampo = $_Form[$x][_OFIELD];
$NewCampo = $_Form[$x][_OFIELD];
$NewCampo = $_Form[$n][1];
}
$oNewCampo = trim($oNewCampo);
$NewCampo = trim($NewCampo);
if( $oNewCampo==$xTmp[$p] ){
$_DBTABLE .= " and {$alias}.{$NewCampo}=A.{$xTmp[$p]}";
break;
}
}
}
if( $tmp[0] == $xTmp[$p] ) $Anadir = true;
}
break;
}
}
}
$FormDel[] = $OriCampo;
$_Form[$n][1] = $tmp[3];
if( isset($tmp[4]) ) $_Form[$n][1] .= ' '.$tmp[4];
if( eSubstrCount($_Form[$n][1],' ')>0 ){
$tmp2 = explode(' ', $_Form[$n][1]);
$_pF['*'.$tmp2[count($tmp2)-1]] = $n;
$_pF[$tmp2[count($tmp2)-1]] = $n;
}else{
$_pF[$_Form[$n][1]] = $n;
}
if( eSubstrCount($_FILTER, "A.{$OriCampo}")==0 ){
$_FILTER = str_replace($OriCampo, "A.{$OriCampo}", $_FILTER);
}
}
}else if( eSubstrCount($_Form[$n][1], ' ')>0 ){
$tmp = explode(' ',$_Form[$n][1]);
$oCampo = $tmp[0];
$aCampo = $tmp[count($tmp)-1];
if( eSubstrCount($_FILTER, "{$aCampo}")==0 ){
$_FILTER = str_replace($_Form[$n][1], "{$aCampo}", $_FILTER);
}
$_DBTABLE .= mb_substr($oCampo, 3);
$_DBTABLE .= " {$alias} on {$alias}.{$oCampo}=A.{$oCampo}";
$DimAlias[mb_substr($oCampo,4)] = $alias;
if( mb_strtoupper($_Form[$n][3])=='SS' ){
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( eSubstrCount(','.$_RELATIONFIELDS[$i].',', ','.$_Form[$n][1].',')==1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for( $p=count($xTmp); $p>0; $p-- ){
if( $Anadir ) $_DBTABLE .= " and {$alias}.{$xTmp[$p]}=A.{$xTmp[$p]}";
if( $oCampo == $xTmp[$p] ) $Anadir = true;
}
break;
}
}
}
$FormDel[] = $oCampo;
if( mb_substr($oCampo,0,3)=='cd_' ){
$xTabla = mb_substr($oCampo,3);
$_Form[$n][1] = str_replace( $oCampo, 'nm_' .mb_substr($oCampo,3), $oCampo ).' '.$aCampo;
if( !(mb_strpos($_LanguageTables,",{$xTabla},")===false) ){
$_Form[$n][1] = $_Form[$n][1].'_'.SESS::$_LANGUAGE_;
}
}
$_pF[$aCampo] = $n;
$_pF['*'.$aCampo] = $n;
}else if( $_Form[$n][3]=="Ss" && mb_substr($_Form[$n][1],0,3)!="cd_" ){
$alias = 'A';
$_DBTABLE = mb_substr($_DBTABLE,0,-11);
$sCampos .= $_Form[$n][1];
}else{
if( eSubstrCount($_FILTER, "A.{$_Form[$n][1]}")==0 ){
$_FILTER = str_replace($_Form[$n][1], "A.{$_Form[$n][1]}", $_FILTER);
}
$nmTabla = mb_substr($_Form[$n][1], 3);
eMultitenancy($nmTabla);
$_DBTABLE .= $nmTabla;
$_DBTABLE .= " {$alias} on {$alias}.{$_Form[$n][1]}=A.{$_Form[$n][1]}";
$DimAlias[mb_substr($_Form[$n][1], 4)] = $alias;
if( mb_strtoupper($_Form[$n][3])=='SS' ){
for($i=0; $i<count($_RELATIONFIELDS); $i++){
if( eSubstrCount(','.$_RELATIONFIELDS[$i].',', ','.$_Form[$n][1].',')==1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for($p=count($xTmp); $p>0; $p--){
if( $Anadir ) $_DBTABLE .= " and {$alias}.{$xTmp[$p]}=A.{$xTmp[$p]}";
if( $_Form[$n][1] == $xTmp[$p] ) $Anadir = true;
}
break;
}
}
}
$FormDel[] = $_Form[$n][1];
if( mb_substr($_Form[$n][1],0,3)=='cd_' ){
$xTabla = mb_substr($_Form[$n][1],3);
$_pF[$_Form[$n][1]] = $n;
$_Form[$n][1] = str_replace( $_Form[$n][1], 'nm_' .mb_substr($_Form[$n][1],3), $_Form[$n][1] );
if( !(mb_strpos($_LanguageTables,",{$xTabla},")===false) ){
$_Form[$n][1] = $_Form[$n][1].'_'.SESS::$_LANGUAGE_;
}
}
}
$_SelectReal[$_Form[$n][1]] = $ssCampo;
$_pF['*'.$_Form[$n][1]] = $n;
}else if( 'SV'==$_Form[$n][3] ){
$_SelectReal[$_Form[$n][1]] = $_Form[$n][1];
$_pF['*'.$_Form[$n][1]] = $n;
}
if( $n>0 ){
$Campos .= ',';
$sCampos .= ',';
}
if( preg_match('/^(F4|P4|CDI)$/iu', $_Form[$n][2]) ){
$Campos .= 'A.'.$_Form[$n][1];
}else{
if( mb_substr($_Form[$n][1],0,7)=='extend(' ){
$_Form[$n][1] = str_replace('extend(', 'extend('.$alias.'.', $_Form[$n][1]);
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}else if( mb_substr($_Form[$n][1],0,4)=='sum(' ){
$_Form[$n][1] = str_replace('sum(', 'sum('.$alias.'.', $_Form[$n][1]);
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}else if( mb_substr($_Form[$n][1],0,7)=='count(*' ){
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}else if( mb_substr($_Form[$n][1],0,6)=='count(' ){
$_Form[$n][1] = str_replace('count(', 'count('.$alias.'.', $_Form[$n][1]);
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}else{
if( !empty($alias) ){
if( $_Form[$n][1][0]!='"' && $_Form[$n][1][0]!="'" ){
if( eSubstrCount($_Form[$n][1], '(')>0 ){
if( $_Form[$n][1][0]=='(' ){
$Campos .= $_Form[$n][1];
break;
}
list(,$tmp2) = explode('(', $_Form[$n][1]);
$tmp2 = explode(',', str_replace(')', ',', $tmp2));
for($i=0; $i<count($tmp2); $i++){
$tmp2[$i] = trim($tmp2[$i]);
if( $tmp2[$i]=='' ) continue;
if( $tmp2[$i][0]=="'" || $tmp2[$i][0]=='"' ){
}else if( (string)((float)$tmp2[$i])==$tmp2[$i] ){
}else{
$iCampo = $tmp2[$i];
$_Form[$n][1] = str_replace($iCampo, $alias.'.'.$iCampo, $_Form[$n][1]);
break;
}
}
$Campos .= $_Form[$n][1];
$DimAliasField[$iCampo] = $alias;
}else if( eSubstrCount($_Form[$n][1], '.')==0 ){
$Campos .= $alias.'.'.$_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}else{
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}
}else{
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}
}else{
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}
}
}
if( eSubstrCount('MSSsX', $_Form[$n][3])==0 ){
$sCampos .= $_Form[$n][1];
}else{
$sCampos .= '*';
}
}
$DifCampos = count($_Form)-$DifCampos;
if( count($_ROWSOP)>0 && $DifCampos>0 && count($_GRID)==0 ){
for($i=count($_Form)-$DifCampos; $i<count($_Form); $i++){
$d = $i+$DifCampos;
$_ColVirtual[$d] = $_ColVirtual[$i];
$_ALIGN[$d] = $_ALIGN[$i];
if( count($_COLSOP)>0 ) $_COLSOP[$d] = $_COLSOP[$i];
$_PDFCOL[$d] = $_PDFCOL[$i];
$_PDFCOLBORDER[$d] = $_PDFCOLBORDER[$i];
$_ROWCOLOR[$d] = $_ROWCOLOR[$i];
$_COLSCOLOR[$d] = $_COLSCOLOR[$i];
$_COLSWIDTH[$d] = $_COLSWIDTH[$i];
$_FORMAT[$d] = $_FORMAT[$i];
$_FORMATTOTALS[$d] = $_FORMATTOTALS[$i];
$_NOZERO[$d] = $_NOZERO[$i] ;
$_NOZEROFORMATTOTALS[$d] = $_NOZEROFORMATTOTALS[$i];
$_oCOLSOP[$d] = $_oCOLSOP[$i];
$_OpCol[$d] = $_OpCol[$i];
$_OpSubCol[$d] = $_OpSubCol[$i];
$_PDFCOLSSHADE[$d] = $_PDFCOLSSHADE[$i];
$_PDFTH[$d] = $_PDFTH[$i];
$_TIPTH[$d] = $_TIPTH[$i];
$i++;
}
}
$_DBADDFILTER = str_replace('#.','A.',$_DBADDFILTER);
$_FILTER = str_replace('#.','A.',$_FILTER);
if( !empty($_oFILTER) ) $_oFILTER = str_replace('#.','A.',$_oFILTER);
$Busca = str_replace('#.','A.',$Busca);
}else{
for($n=0; $n<$NCampos; $n++){
if( $_ColVirtual[$n] ) continue;
if( eSubstrCount($_Form[$n][1], ':')>0 ){
$_Form[$n][1] = mb_substr($_Form[$n][1], 0, mb_strpos($_Form[$n][1], ':'));
}
if( $n>0 ){
$Campos .= ',';
$sCampos .= ',';
}
if( preg_match('/^(F4|P4|CDI)$/iu', $_Form[$n][2]) ){
$Campos .= $_Form[$n][1];
}else{
$Campos .= $_Form[$n][1];
$DimAliasField[$_Form[$n][1]] = $alias;
}
$sCampos .= $_Form[$n][1];
}
$_DBADDFILTER = str_replace('#.','',$_DBADDFILTER);
$_FILTER = str_replace('#.','',$_FILTER);
$_oFILTER = str_replace('#.','',$_oFILTER);
$Busca = str_replace('#.','',$Busca);
}
if( isset($_ALIGNCALC) ){
for($n=0; $n<count($_ALIGNCALC); $n++){
$tmp = explode('=',eNsp($_ALIGNCALC[$n]));
$_ALIGN[ $_pF[$tmp[0]] ] = ' id='.eStrtr(mb_strtolower($tmp[1]), 'lrh', 'ido');
}
}
if( isset($_FORMATCALC) ){
for($n=0; $n<count($_FORMATCALC); $n++){
$tmp = explode('=', $_FORMATCALC[$n]);
$p = $_pF[trim($tmp[0])];
$_FORMAT[$p] = _CalcFormato($tmp[1], $p);
}
}
if( isset($_FORMATTOTALSCALC) ){
for($n=0; $n<count($_FORMATTOTALSCALC); $n++){
$tmp = explode('=', $_FORMATTOTALSCALC[$n]);
$p = $_pF[trim($tmp[0])];
$_FORMATTOTAL[$p] = _CalcFormatTotals($tmp[1], $p);
}
}
if( isset($_COLSOPCALC) ){
for($n=0; $n<count($_COLSOPCALC); $n++){
$tmp = explode('=', $_COLSOPCALC[$n]);
$p = $_pF[trim($tmp[0])];
$_COLSOP[$p] = mb_strtoupper($tmp[1]);
$_OpCol[$p] = 0;
if( $_COLSOP[$p]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$p] = $_COLSOP[$p];
if( eSubstrCount('+C#', $_COLSOP[$p])>0 ) $_InfSinTotales = false;
switch( $_Form[$p][2] ){
case '+,': case '-,':
$tmp = explode(',',$_Form[$p][4]);
if( empty($tmp[1]) ) $tmp[1] = '0';
if( empty($_ALIGN[$p]) ) $_ALIGN[$p] = ' id=d';
if( empty($_FORMAT[$p]) ) $_FORMAT[$p] = "eNumberFormat(#,".$tmp[1].")";
if( !empty($_COLSOP[$p]) && empty($_FORMATTOTALS[$p]) ) $_FORMATTOTALS[$p] = $_FORMAT[$p];
break;
case '+': case '-':
if( $_Form[$p][3][0]!='S' ){
if( empty($_ALIGN[$p]) ) $_ALIGN[$p] = ' id=d';
if( empty($_FORMAT[$p]) ) $_FORMAT[$p] = "eNumberFormat(#,0)";
if( !empty($_COLSOP[$p]) && empty($_FORMATTOTALS[$p]) ) $_FORMATTOTALS[$p] = $_FORMAT[$p];
}
break;
}
}
}
if( isset($_COLSNOREPEAT) && $_COLSNOREPEAT ){
$txt = str_replace([" ",",","true","false","TRUE","FALSE", "1","="], ["","","","","","","",""], implode("",$_COLSNOREPEAT));
if( !empty($txt) ){
$_COLSNOREPEATCALC = $_COLSNOREPEAT;
$_COLSNOREPEAT = array();
for($n=0; $n<count($_Form); $n++) $_COLSNOREPEAT[$n] = false;
if( isset($_COLSNOREPEATCALC) ){
for($n=0; $n<count($_COLSNOREPEATCALC); $n++){
$tmp = explode('=', $_COLSNOREPEATCALC[$n]);
$tmp[0] = trim($tmp[0]);
if( $tmp[0]<>"" ){
$p = $_pF[$tmp[0]];
$_COLSNOREPEAT[$p] = true;
$_COLSBAK[$p] = null;
}
}
}
}
}
if( isset($_COLSWIDTHCALC) ){
for($n=0; $n<count($_COLSWIDTHCALC); $n++){
$tmp = explode('=', $_COLSWIDTHCALC[$n]);
$p = $_pF[trim($tmp[0])];
$_COLSWIDTH[$p] = $tmp[1];
$_userCOLSWIDTH[$p] = $tmp[1];
$_userSetCOLSWIDTH[$p] = $tmp[1];
}
}
if( isset($_ROWSOPCALC) ){
$_exeROWSOPCALC = $_ROWSOPCALC[0];
$tmp = str_replace('+',',+',eNsp('+'.$_ROWSOPCALC[0]));
$tmp = str_replace('-',',-',$tmp);
$tmp = str_replace('*',',*',$tmp);
$tmp = explode(',', $tmp);
for($n=0; $n<count($_Form); $n++) $_ROWSOP[$n] = '';
for($n=0; $n<count($tmp); $n++){
$o = mb_substr(trim($tmp[$n]),0,1);
if( !empty($o) ){
$c = mb_substr($tmp[$n],1);
$_ROWSOP[$_pF[trim($c)]] = $o;
}
}
$_ROWSOP[count($_Form)] = trim($_ROWSOPCALC[1]);
$Dim = array();
for($n=0; $n<count($_Form); $n++){
$tmp = _QueNmField($_Form[$n], $n);
if( !is_numeric($tmp) ) $Dim[] = $tmp;
}
function cmp($a, $b){
if( mb_strlen($a)==mb_strlen($b) ) return 0;
return (mb_strlen($a)>mb_strlen($b)) ? -1 : 1;
}
uasort($Dim, "cmp");
foreach($Dim as $k=>$v) $_exeROWSOPCALC = str_replace($v, '$_vF['.$k.']', $_exeROWSOPCALC);
$_exeROWSOPCALC = 'return('.$_exeROWSOPCALC.');';
$_exeROWSOPCALC = str_replace('$_vF[', '(float)$_vF[', $_exeROWSOPCALC);
$mu = 0;
$md = 0;
$_ROWSOPFORM = array();
$t = count($_Form);
for($n=0; $n<$t; $n++){
$_ROWSOP[$n] = trim($_ROWSOP[$n]);
if( !empty($_ROWSOP[$n]) ){
if( count($_ROWSOPFORM)==0 ) $_ROWSOPFORM = $_Form[$n];
list($u,$d) = explode(',', $_Form[$n][4]);
$u = (float)$u;
$d = (float)$d;
if( $u>$mu ) $mu = $u;
if( $d>$md ) $md = $d;
}
}
if( empty($_ALIGN[$t]) ) $_ALIGN[$t] = ' id=d';
if( !empty($_ROWSOPUD) ) list(,$md) = explode(',', $_ROWSOPUD);
$_FORMAT[$t] = "eNumberFormat(#,{$md})";
if( empty($_FORMATTOTALS[$t]) ) $_FORMATTOTALS[$t] = "eNumberFormat(#,{$md})";
if( isset($_ROWSOPFORM) && count($_ROWSOPFORM)>0 ){
$_ROWSOPFORM[0] = trim(str_replace('ÃÂ·', '<BR>', $_ROWSOP[count($_ROWSOP)-1]));
$_ROWSOPFORM[1] = '_TOTAL_';
if( $md>0 ){
$_ROWSOPFORM[4] = "{$mu},{$md}";
}else{
$_ROWSOPFORM[4] = $mu;
}
if( $_ROWSOPUD!="" ) $_ROWSOPFORM[4] = $_ROWSOPUD;
}
}
if( isset($_ROWSOP) && count($_ROWSOP)>0 ){
for($n=0; $n<count($_ROWSOP); $n++) $_ROWSOP[$n] = trim($_ROWSOP[$n]);
}
if( isset($_COLSCOLORCALC) ){
for($n=0; $n<count($_COLSCOLORCALC); $n++){
$tmp = explode('=', $_COLSCOLORCALC[$n]);
$p = $_pF[trim($tmp[0])];
if( $tmp[1][0]=='#' ){
$_COLSCOLOR[$p] = $tmp[1];
}else if( $tmp[1]!="" && preg_match('/^(\+|\-)/u', $tmp[1][0]) ){
$_ColorNumeric[$p] = $tmp[1];
}else{
$_COLSCOLOR[$p] = $tmp[1];
}
}
}
if( isset($_PDFCOLBORDERCALC) ){
for( $n=0; $n<count($_PDFCOLBORDERCALC); $n++ ){
$tmp = explode( '=', $_PDFCOLBORDERCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_PDFCOLBORDER[ $p ] = $tmp[1];
}
}
if( isset($_PDFCOLCALC) ){
for( $n=0; $n<count($_PDFCOLCALC); $n++ ){
$tmp = explode( '=', $_PDFCOLCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_PDFCOL[ $p ] = $tmp[1];
}
}
if( isset($_PDFCOLSSHADECALC) ){
for( $n=0; $n<count($_PDFCOLSSHADECALC); $n++ ){
$tmp = explode( '=', $_PDFCOLSSHADECALC[$n] );
$p = $_pF[trim($tmp[0])];
$_PDFCOLSSHADE[ $p ] = $tmp[1];
}
}
if( !empty($_JSONCLICKCOL) || $_JSONCLICKCOL=="0" ){
$tmp = explode(',',$_JSONCLICKCOL);
for($n=0; $n<count($tmp); $n++){
if( $tmp[$n]==(string)((float)$tmp[$n]) ){
$_COLSCOLOR[$tmp[$n]] = 'JSOnClickRow';
}else{
$_COLSCOLOR[$_pF[$tmp[$n]]] = 'JSOnClickRow';
}
}
}
if( isset($_TIPTHCALC) ){
for($n=0; $n<count($_TIPTHCALC); $n++){
$tmp = explode('=', $_TIPTHCALC[$n]);
$_TIPTH[$_pF[trim($tmp[0])]] = trim($tmp[1]);
}
}
if( !empty($_EDITLIST[0]) ){
$tmp = explode(',', $_EDITLIST[0]);
for($i=0; $i<count($tmp); $i++){
if( eSubstrCount(",{$_DBINDEX},", ','.$tmp[$i].',' )==1 ){
$_EditListValue[$_Form[count($_Form)-1][1]] = '';
$_EDITLIST[0] = str_replace( ",{$tmp[$i]},", ',', $_EDITLIST[0] );
}else if( !empty($_pField[$tmp[$i]][3]) && preg_match('/^(?:A|H|F|f|P|ICON)$/iu', $_pField[$tmp[$i]][3]) ){
$_EDITLIST[0] = str_replace(",{$tmp[$i]},", ",", $_EDITLIST[0]);
}else if( !empty($_SELECTMULTIPLE[$tmp[$i]]) ){
$_EDITLIST[0] = str_replace(",{$tmp[$i]},", ",", $_EDITLIST[0]);
}
}
$_EDITLIST[0] = str_replace(',,', ',', $_EDITLIST[0]);
if( $_EDITLIST[0]==',' ) $_EDITLIST[0] = '';
}
if( $_ConSelectVirtual ){
$_DBORDER = str_replace(
array('  ', ', ', ' ,'),
array(' ' , ',' , ',' ),
$_DBORDER
);
$_DBORDER = ','.$_DBORDER.',';
$NuevosCampos = 0;
for($n=0; $n<$NCampos; $n++){
if( $_Form[$n][3]=='SV' ){
if( eSubstrCount(",{$_DBINDEX},", ",{$_Form[$n][1]},")==1 ){
$Campos = str_replace($_Form[$n][1], $_Form[$n][1].' field'.$n, $Campos);
$Campos .= ','.$_Form[$n][1];
$_Form[] = array('', $_Form[$n][1], '0', 'T', '3', '', '*','','','');
$NuevosCampos++;
if( eSubstrCount($_DBORDER, ",{$_Form[$n][1]},")==1 ){
$_DBORDER = str_replace(",{$_Form[$n][1]},", ",{$_Form[$n][1]} field{$n},", $_DBORDER);
}
$oSelVir = $_SelVirtual[$_Form[$n][1]];
$sOption = $_ADDOPTION[$_Form[$n][1]];
$_ADDOPTION[ $_Form[$n][1] ] = '';
$_Form[$n][1] = 'field'.$n;
$_ADDOPTION[ 'field'.$n ] = $sOption;
$_SelVirtual['field'.$n] = $oSelVir;
}
}
}
$_DBORDER = mb_substr($_DBORDER, 1, -1);
$NCampos += $NuevosCampos;
}
if( !empty($_FORMATPHP) || !empty($_FORMATTOTALSPHP) ){
$_FORMATPHP = 'function _ExeFormato(&$_vF, &$_CellsStyle=NULL, &$_CellsClass=NULL, $RowNumber=NULL, &$_RowStyle=NULL, &$_RowClass=NULL, &$_RowDisabled=NULL, &$_RowAdd=NULL, &$_CellsAdd=NULL, &$_PDFColor=NULL, &$_PDFBackgroundColor=NULL, &$_PDFLineRows=NULL, &$_PDFRowShadow=false, $_pCol=array(), $_pF=array()){'.CHR10. $_FORMATPHP . '}';
if( !empty($_FORMATTOTALSPHP) ) $_FORMATTOTALSPHP = 'function _ExeFormatoTotal(&$_vF, $NumberGroup, $NameGroup, &$_OpSubCol){'.CHR10. $_FORMATTOTALSPHP . '}';
if( function_exists("_ExeFormato") ) eMessage('ERROR función "_ExeFormato" ya declarada', 'HSE');
if( function_exists("_ExeFormatoTotal") ) eMessage('ERROR función "_ExeFormatoTotal" ya declarada', 'HSE');
$tmpFile = GrabaTmp('l_formatphp', $_FORMATPHP."\n".$_FORMATTOTALSPHP, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_FORMATPHP = '#';
}
if( $_ORDEN_!="" ){
$_ORDEN_ = str_replace('+', ',', trim($_ORDEN_));
echo "<script type='text/javascript'>DGI('_ORDEN_').value='".addslashes($_ORDEN_)."';</script>";
}
$ConChart = false;
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][6]!="*" && $_Form[$nf][3]=="T" && eSubstrCount("+,-,", $_Form[$nf][2])==1 ) $ConChart = true;
if( !empty($_ADDOPTION[$_Form[$nf][1]]) && eSubstrCount($_ADDOPTION[$_Form[$nf][1]], '()')==1 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'$tmp = '.$_ADDOPTION[$_Form[$nf][1]]);
@eval('$tmp = '.$_ADDOPTION[$_Form[$nf][1]]);
if( count($tmp[0])>=2 ){
for($i=0; $i<count($tmp); $i++) $_SelVirtual[$_Form[$nf][1]][trim($tmp[$i][0])] = trim($tmp[$i][1]);
}else{
foreach($tmp as $k=>$v) $_SelVirtual[$_Form[$nf][1]][trim($k)] = trim($v);
}
}
}
if( !$ConChart ) $_NOTOOLS.="C";
if( !empty($_POST['_gs_formato_']) ){
if( $_POST['_gs_formato_']=='P' ) $_DBLIMIT = $_PDFLIMIT = max($_DBLIMIT, $_PDFLIMIT);
if( $_POST['_gs_formato_']=='X' ) $_DBLIMIT = $_XLSLIMIT = max($_DBLIMIT, $_XLSLIMIT);
}
if( !empty($_GET['_gs_formato_']) ){
if( $_GET['_gs_formato_']=='P' ) $_DBLIMIT = $_PDFLIMIT = max($_DBLIMIT, $_PDFLIMIT);
if( $_GET['_gs_formato_']=='X' ) $_DBLIMIT = $_XLSLIMIT = max($_DBLIMIT, $_XLSLIMIT);
}
if( !empty($_DBGROUPBY) ) $_DBGROUPBY = ' group by '.$_DBGROUPBY;
if( eSubstrCount($_DBADDFILTER, '{')>0 && eSubstrCount($_DBADDFILTER, '}')>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return "'.$_DBADDFILTER.'";');
$_DBADDFILTER = _InVar(str_replace('"', "\\'",$_DBADDFILTER));
$_DBADDFILTER = eval('return "'.$_DBADDFILTER.'";');
$_DBADDFILTER = str_replace("\\'", "'",$_DBADDFILTER);
}else if( (eSubstrCount($_DBADDFILTER, '()')==1 || eSubstrCount($_DBADDFILTER, '( )')==1) && eSubstrCount($_DBADDFILTER, 'now()')==0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTER.';');
$_DBADDFILTER = _InVar(str_replace('"', "\\'",$_DBADDFILTER));
$_DBADDFILTER = eval('return '.$_DBADDFILTER.';');
$_DBADDFILTER = str_replace("\\'", "'",$_DBADDFILTER);
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
$v2 = str_replace('"','&34;',str_replace("'",'&39;',$v2));
$_TIPFORM[$k][$k2] = $v2;
}
}
}
foreach($_HELPHTML as $k=>$v){
echo "<span id='HELP_{$k}' style='display:none'><span class='HELP'>";
echo $v;
echo "</span></span>";
}
$ok = false;
foreach($_HELPMARK as $k=>$v){
if( !$ok ) include_once(DIREDES."markdown.inc");
$ok = true;
echo "<span id='HELP_{$k}' style='display:none'><span class='HELP'>";
echo eMarkdown($v);
echo "</span></span>";
}
if( $_ISUBLIST==true ){
list($FModo, $_ISLOP) = explode(',', $_GET['_ISLOP']);
$_ISUBLISTMODE = $FModo;
if( trim($FModo)=='a' ){
$condition = _AddFilterSql();
qQuery("delete from {$_sDBTABLE}{$_ISUBLISTSUFIJO} where {$condition}");
}
}
$LeerCur = 0;
$_OPTIONSINLISTTYPE = 0;
if( isset($_OPTIONSINLISTALL) && $_OPTIONSINLISTALL ){
$_COLSOP = array();
$_oCOLSOP = array();
$_ROWSOP = array();
$n = 0;
if( !empty($dimValorLast) ){
$n = count($dimValorLast);
}
if( $n>0 ){
$_OptionsInListMode = "LR";
$dim = array(1,12,17);
for($n=0; $n<count($dim); $n++){
$_Form[$_pF["cdi__"]][$n] = str_replace("#1#", $_DBINDEX, $_Form[$_pF["cdi__"]][$n]);
$_Form[$_pF["action__"]][$n] = str_replace("#2#", $_DBINDEX, $_Form[$_pF["action__"]][$n]);
}
if( !empty($Busca) ) $Busca .= ' and ';
$Campos = str_replace(array("#1#","#2#"), array($_DBINDEX,$_DBINDEX), $Campos);
$Busca .= $_DBINDEX." in (select db_value from {$_ENV['eDesDictionary']}gs_last where cd_gs_user=".S::$_User." and script='{$_FileDF}'{$masFilter})";
if( !empty($_DBADDFILTER) && eSubstrCount($Busca, $_DBADDFILTER)==0 && eSubstrCount($Busca, $xDBADDFILTER)==0 ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
}
if( $HaySelect ) $Busca = BuscaConAlias($Busca, $Campos);
$_DBORDER = OrdenConAlias($_DBORDER, $HaySelect, $Campos, $FormDel);
if( !empty($_ORDEN_) ){
$_DBORDER = str_replace("*", "", $_ORDEN_);
$_DBORDER = _qOrder($_DBORDER, $Campos);
}
if( isset($_DBORDERBAK) ) $_DBORDER = $_DBORDERBAK;
if( empty($_DBGROUPBY) ){
if( eSubstrCount(mb_strtoupper($Busca), ' GROUP BY ')==0 ){
$where = _qBuscar($Busca, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
$_TReg = qCount($_DBTABLE, $where);
}else{
$_TReg = -1;
}
}
$_DBADDFILTER = $Busca;
$_FILTER = $Busca;
if( $_TReg>0 ){
}else if( $_TReg==0 && !$EmptyList ){
}
$TotalReg = $_TReg;
$sOrder = $_DBORDER;
$sOrder = _qOrder($sOrder, $Campos);
if( $HaySelect ) $sOrder = OrdenConAlias($sOrder, $HaySelect, $Campos, $FormDel);
$where = _qBuscar($_DBADDFILTER, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qSelect($_DBTABLE, $Campos, $where, $sOrder.$_DBGROUPBY);
$dimTxt = array("M"=>$__Lng[132], "B"=>$__Lng[133], "A"=>$__Lng[134], "b"=>$__Lng[135], "c"=>$__Lng[135], "m"=>$__Lng[135]);
$_TReg = $TotalReg;
$usuCursor = array();
while($r=qRow()){
$r[$_pF["action__"]] = $dimTxt[$dimValorLast[$r[0]]["action"]];
$r[$_pF["cdi__"]] = $dimValorLast[$r[0]]["cdi"];
$usuCursor[] = $r;
}
if( $_ORDEN_=="" ){
_QSortMultiArray($usuCursor);
}
if( SETUP::$List['OptionsInListHidden'] ){
$_Form[$_pF["cdi__"]][6] = "*";
$_Form[$_pF["action__"]][6] = "*";
$_OPTIONSINLISTALL = false;
$_OPTIONSINLISTTYPE = 3;
}else{
$_OPTIONSINLISTALL = false;
$_FOOTTITLE = 'echo "<div style=\'color:red\' align=left>últimos registros gestionados</div>";';
$_OPTIONSINLISTTYPE = 1;
}
}else{
$_OPTIONSINLISTALL = false;
$_OPTIONSINLISTTYPE = 2;
if( $HaySelect ) $_OPTIONSINLISTRANGE = BuscaConAlias($_OPTIONSINLISTRANGE, $Campos);
$n = qCount($_DBTABLE, $_OPTIONSINLISTRANGE);
$TotalReg = $n;
if( $n==0 ){
$_OptionsInListMode = "NLR-NR";
$_OPTIONSINLISTINSERT = true;
?>
<script type='text/javascript'>
S(".MENUFOOTLIST").none();
if( S("TD[op='a']", ".MENUFOOTLIST").length==1 ){
if( typeof(_OptionsInListFunction)=="function" ){
_OptionsInListFunction("ini");
}else{
S("TD[op='a']", ".MENUFOOTLIST").eventFire("click");
}
}else{
S.error("No hay registros");
}
</script>
<?PHP
}else if( $n<=$_OptionsInListLimit ){
$_OptionsInListMode = "NLR-L";
if( !empty($_DBADDFILTER) ) $_DBADDFILTER .= " and ";
$_DBADDFILTER .= $_OPTIONSINLISTRANGE;
if( !empty($_DBADDFILTER) && eSubstrCount($Busca, $_DBADDFILTER)==0 && eSubstrCount($Busca, $xDBADDFILTER)==0 ){
if( !empty($Busca) ) $Busca .= " and ";
$Busca .= $_DBADDFILTER;
}
if( $HaySelect ) $Busca = BuscaConAlias($Busca, $Campos);
if( mb_substr(rtrim($Busca),-4)==" and" ) $Busca = mb_substr(rtrim($Busca),0,-4);
$_DBORDER = OrdenConAlias($_DBORDER, $HaySelect, $Campos, $FormDel);
if( !empty($_ORDEN_) ){
$_DBORDER = str_replace("*", "", $_ORDEN_);
$_DBORDER = _qOrder($_DBORDER, $Campos);
}
if( isset($_DBORDERBAK) ) $_DBORDER = $_DBORDERBAK;
$_DBADDFILTER = $Busca;
$_FILTER = $Busca;
if( $_TReg>0 ){
}else if( $_TReg==0 && !$EmptyList ){
}
$TotalReg = $_TReg;
$sOrder = $_DBORDER;
$sOrder = _qOrder($sOrder, $Campos);
if( $HaySelect ) $sOrder = OrdenConAlias($sOrder, $HaySelect, $Campos, $FormDel);
$where = _qBuscar($_DBADDFILTER, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qSelect($_DBTABLE, $Campos, $where, $sOrder.$_DBGROUPBY);
$_TReg = $TotalReg;
$usuCursor = array();
while($r=qRow()){
$usuCursor[] = $r;
}
}else{
$_OptionsInListMode = "NLR-AF";
$_OptionsInListButton = true;
echo '<table class="BODYLIST" style="position:absolute;left:0px;top:0px;z-index:99999;display:table;width:100%;height:100%"><tr><td align=center valign:middle>';
echo '<table style="border:0px solid red;display:table;">';
echo '<tr><td colspan=5 align=center>'.$__Lng[126].'<br><br>';
echo '<tr><td>&nbsp;';
echo '<td align=right>';
eAddButton("S", $__Lng[108], "_ModeFilter()");
echo '<td style="width:30px">&nbsp;';
echo "<td align=left>";
eAddButton("I", $__Lng[1], "_ModeChange('a')");
echo '<td>&nbsp;';
echo '</table>';
echo '</tr></td></table>';
?>
<script type='text/javascript'>
if( S(".MENUFOOTLIST").length ){
var o = S("TD[op='f'], TD[op='a']", ".MENUFOOTLIST");
if( o.length==1 ){
S("TABLE[class=BODYLIST] TBODY").none();
S(o).eventFire("click");
}
}else{
S.error("Falta definir la etiqueta [OptionsInList]");
}
</script>
<?PHP
$_SinListado = true;
}
}
}
$_MultiSort = false;
if( isset($_SUMMARY) ){
$_Form[1] = array($_SUMMARY[0], "total_", "+", "T", $_SUMMARY[1], "", "-", "", "", "", 1, "E", "total_", "", "", "", "", "total_");
$_COLSOP[0] = "C";
$_COLSOP[1] = "+";
$_oCOLSOP[0] = "C";
$_oCOLSOP[1] = "+";
$_OpCol[0] = 0;
$_OpCol[1] = 0;
$_ALIGN[1] = " id=d";
$where = qGetWhere("+");
list(, $alias) = explode(" ", $_DBTABLE);
$campo = $_Form[0][1];
if( !empty($alias) ) $alias = "{$alias}.";
list($xCampo) = explode(",", qGetSelect());
if( mb_substr_count($_DBTABLE, "=")>0 ){
$campo = "B.".$xCampo;
}else{
$campo = $alias.$campo;
}
$sql = "select {$campo}, count(*) from {$_DBTABLE} {$where} group by {$campo} order by {$campo}";
$conSV = !empty($_SelVirtual);
if( $conSV ){
list(,$campo) = explode(".", $campo);
}
$usuCursor = array();
qQuery($sql);
while($r=qRow()){
$r[0] = trim($r[0]);
array_push($usuCursor, array($r[0], $r[1]));
}
$TotalReg = count($usuCursor);
$NCampos = 2;
if( $conSV && mb_strtoupper($_SUMMARY[2])=="EMPTY" ){
foreach($_SelVirtual[$campo] as $k=>$v){
if( empty($k) ){
continue;
}
$ayadir = true;
for($i=0; $i<$TotalReg; $i++){
if( $k==$usuCursor[$i][0] ){
$ayadir = false;
break;
}
}
if( $ayadir ){
array_push($usuCursor, array($k, 0));
}
}
$TotalReg = count($usuCursor);
sort($usuCursor);
}
}else if( (isset($_OPTIONSINLISTALL) && $_OPTIONSINLISTALL) || (isset($_SinListado) && $_SinListado) ){
}else if( !empty($_BrowseInTemporary) ){
$_TReg = $TotalReg;
}else if( !empty($_NotInTemporary) ){
$txt = $_pField[$_NotInTemporary][0];
if( $txt=="" ) $txt = "Valor";
unset($_Field, $_pField, $_Form, $_ALIGN, $_FORMAT,$_FORMATPHP,$_FORMATTOTALS);
eAddField($txt."| valor_ | # | T | 80 ||-|||");
$AliasNotIn = "";
if( !empty($sAlias) ) $AliasNotIn = $sAlias.".";
qQuery("select count(*) from _seek where valor not in (select {$AliasNotIn}{$_NotInTemporary} from {$_DBTABLE})");
$r=qRow();
if( $r[0]==0 ){
eMessage('~NR', 'HS');
}
$usuCursor = array();
qQuery("select valor from _seek where valor not in (select {$AliasNotIn}{$_NotInTemporary} from {$_DBTABLE})");
while( $r=qRow() ){
$usuCursor[] = array($r[0]);
}
$TotalReg = count($usuCursor);
$NCampos = 1;
$_TITLE .= ' (no encontrados)';
$_SHOWFILTER = false;
$PDF_ShowFilter = false;
}else if( !empty($_GET['_LISTEMPTY']) && $_GET['_LISTEMPTY']==1 ){
if( $_DEBUG==100 ){ eInit(); die('_LISTEMPTY'); }
if( count($_GRID)>0 ){
if( isset($usuCursor) ) include( $Dir_.'grid_3.inc' );
else include( $Dir_.'grid_2.inc' );
}
}else if( isset($_SQLExecute) ){
if( $_DEBUG==100 ){ eInit(); die('_SQLExecute'); }
if( !isset($_CountExecute) ){
$_SQLExecute = str_replace(CHR10,' ',str_replace(CHR13,' ',str_replace(mb_chr(9),' ',$_SQLExecute)));
$tmp = ' '.$_SQLExecute;
$Clave = explode(',','select,from,where,group by,order by');
$VClave = array();
for($n=count($Clave)-1; $n>=0; $n--){
if( eSubstrCount( $tmp, $Clave[$n] ) > 0 ) list( $tmp, $VClave[$n] ) = explode(" {$Clave[$n]} ", $tmp );
}
$xSelect = $VClave[0];
$xFrom = $VClave[1];
$xWhere = $VClave[2];
$xGroupBy = $VClave[3];
$xOrder = $VClave[4];
if( !empty($xGroupBy) ){
qQuery("select count(*) from ( {$_SQLExecute} ) SoloContar");
list($_TReg) = qRow();
}else{
$_TReg = qCount( $xFrom, $xWhere );
}
}else{
qQuery( $_CountExecute );
list($_TReg) = qRow();
}
if( $_TReg>$_DBLIMIT && !$_LimitOn ){
eMessage('~LE|'.$_TReg, 'HS', $ExeSg, $ExeJS, 'LE');
}
$TotalReg = $_TReg;
qQuery($_SQLExecute);
$_TReg = $TotalReg;
$_FILTER = $xWhere;
}else if( $_DBSQL!="" ){
if( $_DEBUG==100 ){ eInit(); die('_DBSQL'); }
$LeerCur = 1;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
$dimEnter = array();
$conEnter = 0;
for($r=0; $r<count($_Form); $r++){
if( $_Form[$r][2][0]=="#" ){
$dimEnter[] = $r;
$conEnter++;
}
}
if( (isset($_REG_) || eSubstrCount('PXA', $_gs_formato_)>0 ) && file_exists($tmpCursor) ){
$usuCursor = array();
$p = -1;
if($fh = fopen($tmpCursor, "r")){
while( !feof($fh) ){
$txt = fgets($fh, 50000);
if($txt<>""){
$usuCursor[++$p] = explode("~", $txt);
if( $conEnter ){
for($n=0; $n<$conEnter; $n++){
$usuCursor[$p][$dimEnter[$n]] = str_replace("{#}ENTER{#}", CHR10, $usuCursor[$p][$dimEnter[$n]]);
}
}
}
}
fclose($fh);
}
if( $_ORDEN_!="" ) $newOrden = $_ORDEN_;
if( isset($newOrden) ){
list($newOrden) = explode(",", $newOrden);
$newOrden = trim($newOrden);
if( isset($_SORTTYPE_) ){
$newAscDesc = $_SORTTYPE_;
}else if( preg_match('/ desc$/iu', $newOrden) ){
$newAscDesc = 1;
$newOrden = trim(mb_substr($newOrden,0,-5));
}
if( is_numeric($newOrden) ){
_QSortMultiArray($usuCursor, ($newOrden-1), (($newAscDesc==0)?'ASC':'DESC'), $_Form[($newOrden-1)][2]);
}else{
$newOrden = str_replace("*", "", $newOrden);
for( $n=0; $n<count($_Form); $n++ ){
if( $_Form[$n][1]==$newOrden ){
_QSortMultiArray($usuCursor, $n, (($newAscDesc==0)?'ASC':'DESC'), $_Form[$n][2]);
break;
}
}
}
$_DBORDER = $newOrden;
}
}else{
$LeerCur = 2;
$tmpSQL = GrabaTmp('l_dbsql', '$usuCursor=array();'."\n".$_DBSQL, $LenDoc);
include($tmpSQL);
_ShowError($php_errormsg, $tmpSQL, $LenDoc);
unset($_DBSQL);
}
if( count($usuCursor)==0 && (empty($_TReg) || count($usuCursor)!=$_TReg) ){
while( $row=qRow() ) array_push($usuCursor, $row);
$_TReg = count($usuCursor);
$TotalReg = $_TReg;
}else{
$_TReg = count($usuCursor);
$TotalReg = $_TReg;
}
if( $TotalReg>$_DBLIMIT && !$_LimitOn ){
eMessage('~LE|'.$TotalReg, 'HS', $ExeSg, $ExeJS, 'LE');
}else if( $TotalReg == 0 && !$EmptyList ){
eMessage('~NR', 'HS', $ExeSg, $ExeJS, 'NR');
}
if( !isset($usuCursor) && !isset($_REG_) ){
$usuCursor = array();
while( $row=qRow() ) array_push($usuCursor, $row);
$_TReg = count($usuCursor);
$TotalReg = $_TReg;
}
if( $LeerCur==2 && !isset($_REG_) && isset($usuCursor) ){
if( $ConPaginacion && !empty($_EDITLIST[0]) ){
eMessage('La paginación con "usuCursor" y [EditList] son incompatibles','HSE');
}
$t = count($usuCursor);
for($r=0; $r<$t; $r++){
if( $conEnter ){
for($n=0; $n<$conEnter; $n++){
$usuCursor[$r][$dimEnter[$n]] = str_replace(CHR10, "{#}ENTER{#}", $usuCursor[$r][$dimEnter[$n]]);
}
}
error_log(implode("~", $usuCursor[$r])."\n", 3, $tmpCursor);
}
file_put_contents(str_replace('.cur','.sql',$tmpCursor), serialize(array('_SQL_'=>$_SQL_)));
if( $_PDFSAVEVAR!='' && eSubstrCount($_PDFSAVEVAR,'_PDFLABELHIDDEN')==0 ){
$_PDFSAVEVAR .= ',_PDFLABELHIDDEN';
}
if( !empty($_PDFSAVEVAR) ){
$_SERIALIZE = array();
$tmp = explode(',',$_PDFSAVEVAR);
for( $n=0; $n<count($tmp); $n++ ) $_SERIALIZE[$tmp[$n]] = ${$tmp[$n]};
file_put_contents( str_replace('.cur','.var',$tmpCursor), serialize($_SERIALIZE) );
unset($_SERIALIZE);
}
}
if( isset($usuCursor) ) $_TReg = count($usuCursor);
}else if( isset($usuCursor) ){
if( $_DEBUG==100 ){ eInit(); die('usuCursor'); }
$_TReg = count($usuCursor);
$TotalReg = $_TReg;
if( $TotalReg>$_DBLIMIT && !$_LimitOn ){
eMessage('~LE|'.$TotalReg, 'HS', $ExeSg, $ExeJS, 'LE');
}else if( $TotalReg==0 && !$EmptyList ){
eMessage('~NR', 'HS', $ExeSg, $ExeJS, 'NR');
}
}else{
$_MultiSort = true;
if( $_DEBUG==100 ){ eInit(); die('Cursor Normal'); }
if( $VieneDeFicha ){
$Busca = "";
GetCondicion("", $Busca, false);
if( !empty($_FILTER) && eSubstrCount($Busca, $_FILTER)==0 ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $_FILTER;
}
if( !empty($_DBADDFILTER) && eSubstrCount($Busca, $_DBADDFILTER)==0 ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
}
}else{
$Busca = '';
GetCondicion("", $Busca, false);
if( !empty($_DBADDFILTER) && eSubstrCount($Busca, $_DBADDFILTER)==0 && eSubstrCount($Busca, $xDBADDFILTER)==0 ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
}
}
if( !empty($_DBGROUPBY) ){
$_DBGROUPBY = str_replace('  ',' ',trim($_DBGROUPBY));
$txt = mb_substr($_DBGROUPBY,9);
$txt = OrdenConAlias($txt, $HaySelect, $Campos, $FormDel);
$_DBGROUPBY = ' group by '.$txt;
}
if( count($_DBTABLERELATION)==0 ){
if( count($_DCT)>0 ){
$_DBTABLE .= ", {$_ENV['eDesDictionary']}gs_dct zz ";
$Campos .= ', count(*) _count';
}
if( $HaySelect ) $Busca = BuscaConAlias($Busca, $Campos);
$_DBORDER = OrdenConAlias($_DBORDER, $HaySelect, $Campos, $FormDel);
if( count($_DCT)>0 ){
$txt = "1";
for($n=2; $n<=count($_Form); $n++) $txt .= ','.$n;
$_DBGROUPBY = ' group by '.$txt;
$_DBORDER = (count($_Form)+1).' desc, '.$_DBORDER;
if( $Busca!="" ){
$Busca = "A.cd_gs_poll_img=zz.dct_serial and ".$Busca;
}else{
$Busca = "A.cd_gs_poll_img=zz.dct_serial ";
}
}
}else{
if( $_gs_formato_=='P' || $_gs_formato_=='X' || $_gs_formato_=='A' || isset($_REG_) ){
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
$_SERIALIZE = unserialize(file_get_contents( $tmpCursor ));
foreach($_SERIALIZE as $k=>$v) ${$k} = $v;
unset($_SERIALIZE);
}else{
if( $HaySelect ){
if( $VieneDeFicha ){
$TieneAlias = false;
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
if( eSqlType('mysql,mysqli') ){
$txt = ' left join '.$_DBTABLERELATION[$e][0].' on '.$_DBTABLERELATION[$e][2];
if( eSubstrCount( $_DBTABLE, ' left join '.$_DBTABLERELATION[$e][0].' ' ) == 0 ) $_DBTABLE .= $txt;
}else{
$_DBTABLE .= ', '.$_DBTABLERELATION[$e][0];
}
foreach( $DimAlias as $key => $valor ){
if( $_DBTABLERELATION[$e][0]==$key ) $TieneAlias = true;
}
if( !$TieneAlias ){
$DimAlias[$_DBTABLERELATION[$e][0]] = mb_chr(mb_ord($valor)+1);
if( eSqlType('mysql,mysqli') ){
$_DBTABLE = str_replace( ' left join '.$_DBTABLERELATION[$e][0],' left join '.$_DBTABLERELATION[$e][0].' '.$DimAlias[$_DBTABLERELATION[$e][0]], $_DBTABLE );
}else{
$_DBTABLE = str_replace( ', '.$_DBTABLERELATION[$e][0],', '.$_DBTABLERELATION[$e][0].' '.$DimAlias[$_DBTABLERELATION[$e][0]], $_DBTABLE );
}
}
}
$Busca = ' '.$Busca;
foreach($DimAlias as $key=>$valor){
$Busca = str_replace(' '.$key.'.', ' '.$valor.'.', $Busca);
$Busca = str_replace('='.$key.'.', '='.$valor.'.', $Busca);
}
$_DBTABLE = ' '.$_DBTABLE;
if( eSqlType('mysql,mysqli') ){
foreach($DimAlias as $key=>$valor){
$_DBTABLE = str_replace(' '.$key.'.', ' '.$valor.'.', $_DBTABLE);
$_DBTABLE = str_replace('='.$key.'.', '='.$valor.'.', $_DBTABLE);
}
}
$Campos = ','.$Campos;
for($e=0; $e<count($_DBTABLERELATION); $e++){
$tmp = explode(',',eNsp($_DBTABLERELATION[$e][1]));
for($n=0; $n<count($tmp); $n++){
$Campos = str_replace( ',A.'.$tmp[$n], ','.$DimAlias[$_DBTABLERELATION[$e][0]].'.'.$tmp[$n], $Campos );
}
foreach($DimAlias as $key=>$valor){
for($n=0; $n<count($tmp); $n++){
$Campos = str_replace( ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n], ','.$valor.'.'.$tmp[$n], $Campos );
}
}
}
$Campos = mb_substr($Campos,1);
$_DBORDER = ','.$_DBORDER.',';
for( $n=0; $n<count($_Form); $n++ ){
$_DBORDER = str_replace(','.$_Form[$n][1].',', ',A.'.$_Form[$n][1].',', $_DBORDER);
}
$tmp = explode(',',$_DBORDER);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace(','.$tmp[$n].',', ',A.'.$tmp[$n].',', $_DBORDER);
}
$_DBORDER = mb_substr($_DBORDER,1,-1);
foreach($DimAlias as $key=>$valor) $_DBTABLE = str_replace(' '.$valor.' '.$valor, ' '.$valor, $_DBTABLE);
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
file_put_contents($tmpCursor, serialize(array(
'_DBTABLE'=>$_DBTABLE,
'Campos'=>$Campos,
'Busca'=>$Busca,
'_DBORDER'=>$_DBORDER
)) );
}
}else{
$Busca = ' '.$Busca;
$Campos = ','.$Campos.',';
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
$tmp = explode(',',$_DBTABLERELATION[$e][1]);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
$Busca  = str_replace(' '.$tmp[$n].'="'		, ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].'="'	, $Busca );
$Busca  = str_replace(' '.$tmp[$n].' like '	, ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].' like ', $Busca );
$Campos = str_replace(','.$tmp[$n].','		, ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].','		, $Campos);
}
}
for($n=0; $n<count($_Form); $n++){
$Busca  = str_replace(' '.$_Form[$n][1].'="'	, ' '.$_DBTABLE.'.'.$_Form[$n][1].'="'	  , $Busca );
$Busca  = str_replace(' '.$_Form[$n][1].' like ', ' '.$_DBTABLE.'.'.$_Form[$n][1].' like ', $Busca );
$Campos = str_replace(','.$_Form[$n][1].','		, ','.$_DBTABLE.'.'.$_Form[$n][1].','	  , $Campos);
}
$Campos = mb_substr($Campos,1,-1);
$_DBORDER = ','.$_DBORDER.',';
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
$tmp = explode(',',$_DBTABLERELATION[$e][1]);
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace( ','.$tmp[$n].',', ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].',', $_DBORDER );
}
}
for($n=0; $n<count($_Form); $n++){
$_DBORDER = str_replace( ','.$_Form[$n][1].',', ','.$_DBTABLE.'.'.$_Form[$n][1].',', $_DBORDER );
}
$tmp = explode(',',$_DBORDER);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace( ','.$tmp[$n].',', ','.$_DBTABLE.'.'.$tmp[$n].',', $_DBORDER );
}
$_DBORDER = mb_substr($_DBORDER,1,-1);
for($e=0; $e<count($_DBTABLERELATION); $e++){
if( eSqlType('mysql,mysqli') ){
$txt = ' left join '.$_DBTABLERELATION[$e][0].' on '.$_DBTABLERELATION[$e][2];
$_DBTABLE .= $txt;
}else{
$_DBTABLE .= ', '.$_DBTABLERELATION[$e][0];
if( trim($Busca)=='' ) $Busca = $_DBTABLERELATION[$e][2];
}
}
$Ficha_DBTABLE = $_DBTABLE;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
file_put_contents($tmpCursor, serialize(array(
'_DBTABLE'=>$_DBTABLE,
'Campos'=>$Campos,
'Busca'=>$Busca,
'_DBORDER'=>$_DBORDER
)) );
}
}
}
if( !empty($_ORDEN_) && empty($_DBORDEREXP) ){
$_DBORDER = str_replace("*", "", $_ORDEN_);
$_DBORDER = _qOrder($_DBORDER, $Campos);
}
if( isset($_DBORDERBAK) ) $_DBORDER = $_DBORDERBAK;
if( !empty($_DBSQLFUNCTION) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_DBSQLFUNCTION.';');
eval($_DBSQLFUNCTION.';');
}
if( eSubstrCount($Busca, 'zz.dct_work like "')>0 || eSubstrCount($Busca, 'zz.dct_work="')>0 ){
if( eSubstrCount($_DBTABLE, ", {$_ENV['eDesDictionary']}gs_dct zz ")==0 ) $_DBTABLE .= ", {$_ENV['eDesDictionary']}gs_dct zz ";
$_DBORDER .= ' group by 1';
for($n=2; $n<=count($_Form); $n++) $_DBORDER .= ','.$n;
}
if( eSubstrCount(mb_strtoupper($_DBORDER),' LIMIT ')==1 ){
list($_TReg, $Salta) = explode(',', mb_substr($_DBORDER, mb_strpos(mb_strtoupper($_DBORDER), ' LIMIT ')+7));
if( !empty($Salta) ) $_TReg += $Salta;
}else{
if( $_DBGROUPBY=='' ){
if( isset($_DBUNION) ){
$where = _qBuscar($Busca,$_DBTABLE);
$sql = "select count(*) _cuenta from {$_DBTABLE} where {$where}";
$sqlbak = $sql;
for($i=1; $i<count($_DBUNION); $i++){
$t = $_sDBTABLE.$_DBUNION[$i];
if( qExists( $t ) ){
$sqlUnion = str_replace(" {$_sDBTABLE} ", " {$t} ", $sqlbak);
$sql = $sql.' union '.$sqlUnion;
}
}
$sql = 'select sum(_cuenta) from ('.$sql.') x';
qQuery($sql);
list($_TReg) = qRow();
}else{
if( eSubstrCount(mb_strtoupper($Busca), ' GROUP BY ')==0 ){
$where = _qBuscar($Busca, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
$_TReg = qCount($_DBTABLE, $where);
}else{
$_TReg = -1;
}
}
}else{
$_TReg = 1;
}
}
$_DBADDFILTER = $Busca;
$_FILTER = $Busca;
if( $_TReg>$_DBLIMIT && !$_LimitOn ){
if( !empty($_OPTIONSINLIST) ){
$_LimitOn = true;
$_PrimerosReg = -$_DBLIMIT;
if( $_PrimerosRegTxt=='' ) $_PrimerosRegTxt = 'Muestra de # Registros';
}else{
eMessage('~LE|'.$_TReg, 'HS', $ExeSg, $ExeJS, 'LE');
}
}else if( $_TReg==0 && !$EmptyList ){
eMessage('~NR', 'HS', $ExeSg, $ExeJS, 'NR');
}
$TotalReg = $_TReg;
if( $_DBADDFILTER=='' ){
$PDF_SQL = "select {$Campos} from {$_DBTABLE}";
}else{
$PDF_SQL = "select {$Campos} from {$_DBTABLE} where {$_DBADDFILTER}";
}
$sOrder = $_DBORDER;
$sOrder = _qOrder($sOrder, $Campos);
if( $HaySelect ) $sOrder = OrdenConAlias($sOrder, $HaySelect, $Campos, $FormDel);
if( eSqlType('informix') && eSubstrCount(mb_strtoupper($sOrder),' LIMIT ')==1 ){
$sOrder = mb_substr($sOrder,0,mb_strpos(mb_strtoupper($sOrder),' LIMIT '));
qSelect($_DBTABLE, 'FIRST '.($_TReg+$Salta).' '.$Campos, _qBuscar($_DBADDFILTER,$_DBTABLE), $sOrder.$_DBGROUPBY);
}else{
if( isset($_DBUNION) ){
$where = _qBuscar($_DBADDFILTER,$_DBTABLE);
$sql = "select {$Campos} from {$_DBTABLE} where {$where}";
$sqlbak = $sql;
for( $i=1; $i<count($_DBUNION); $i++ ){
$t = $_sDBTABLE.$_DBUNION[$i];
if( qExists( $t ) ){
$sqlUnion = str_replace( " {$_sDBTABLE} ", " {$t} ", $sqlbak );
$sql = $sql.' union '.$sqlUnion;
}
}
if( trim($sOrder.$_DBGROUPBY)!="" ) $sql .= ' order by '.$sOrder.$_DBGROUPBY;
qQuery($sql);
}else{
$where = _qBuscar($_DBADDFILTER, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qSelect($_DBTABLE, $Campos, $where, $sOrder.$_DBGROUPBY);
}
}
$_TReg = $TotalReg;
if( $_TReg==-1 ){
$usuCursor = array();
while( $row=qRow() ) $usuCursor[] = $row;
$TotalReg = count($usuCursor);
$_TReg = $TotalReg;
}elseif( isset($_GRAPH) && !isset($usuCursor) ){
$usuCursor = array();
while( $row=qRow() ) $usuCursor[] = $row;
$TotalReg = count($usuCursor);
$_TReg = $TotalReg;
}
if( count($_LISTCOMPARE)>0 ) include($Dir_.'listcompare.inc');
if( count($_GRID)>0 ) include($Dir_.'grid_2.inc');
}
if( !empty($_TARGET) ){
$_gs_formato_ = "";
foreach($_TARGET as $key=>$value){
$value = (int)$value;
if( $value==-1 || $_TReg<=$value ){
if( $key=="P" && isset($_DimMenuExp["pdf"]) ) $_gs_formato_ = $key;
if( $key=="X" && isset($_DimMenuExp["xls"]) ) $_gs_formato_ = $key;
if( $key=="M" && isset($_DimMenuExp["xml"]) ) $_gs_formato_ = $key;
if( $key=="T" && isset($_DimMenuExp["txt"]) ) $_gs_formato_ = $key;
if( $key=="V" && isset($_DimMenuExp["csv"]) ) $_gs_formato_ = $key;
if( $key=='X' && SETUP::$System["XMLASXLS"]==true ){
$_gs_formato_ = "M";
}
}
}
}
if( !empty($_EDITLIST[3]) && $_EDITLIST[3]==3 ){
eInit();
include(DIREDES."plg_board.php");
eEnd();
}
$_TotalRecords = $_TReg;
if( isset($_MaxRecFull) && $_MaxRecFull>=$_TReg && count($_THCOLSPAN)==0 ){
$_MAXRECFULL = true;
echo '<script type="text/javascript">_MAXRECFULL = true;</script>';
}
if( !empty($_DBEND) ){
$tmpFile = GrabaTmp('l_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = "";
}
if( $LeerCur==0 && empty($_DBSQL) && !empty($_PDFSAVEVAR) && !empty($tmpCursor) ){
$_SERIALIZE = array();
$tmp = explode(',', $_PDFSAVEVAR);
for($n=0; $n<count($tmp); $n++) $_SERIALIZE[$tmp[$n]] = ${$tmp[$n]};
file_put_contents(str_replace('.cur','.var',$tmpCursor), serialize($_SERIALIZE));
unset($_SERIALIZE);
}else if( !empty($_PDFSAVEVAR) || $_gs_formato_=='P' ){
$nameFile = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var";
if( file_exists($nameFile) ){
$_SERIALIZE = unserialize(file_get_contents($nameFile));
if( gettype($_SERIALIZE)!="boolean" ){
foreach($_SERIALIZE as $k=>$v) ${$k} = $v;
}
unset($_SERIALIZE);
}
}
if( !empty($_MaxRowsOnPage) && $TotalReg<=$_MaxRowsOnPage ){
$_RowsOnPage = $_MaxRowsOnPage;
}else{
}
if( isset($_CHART) && count($_CHART)>0 ){
for($n=0; $n<count($_DefChartSWF); $n++){
if( $_DefChartSWF[$n][5]<0 ){
$_DefChartSWF[$n][5] *= -1;
if( $TotalReg>$_DefChartSWF[$n][5] ){
$_CHART = array();
$_DefChartSWF = array();
$_CHARTGRID  = '';
$_ConChartSWF  = false;
$_CHARTSWF = '';
break;
}
}
}
for( $n=0; $n<count($_DefChartMS); $n++ ){
if( $_DefChartMS[$n][5] < 0 ){
$_DefChartMS[$n][5] *= -1;
if( $TotalReg > $_DefChartMS[$n][5] ){
$_CHART = array();
$_DefChartMS = array();
$_CHARTGRID  = '';
$_ConChartSWF  = false;
$_CHARTJS = '';
break;
}
}
}
}
$_PosIndex = -1;
$sSeek = '';
$_DBINDEX = eNsp($_DBINDEX);
$DimIndice = explode(",", $_DBINDEX);
for($n=0; $n<count($_Form); $n++){
for($i=0; $i<count($DimIndice); $i++){
if( $DimIndice[$i]==$_Form[$n][1] ){
if( !empty($sSeek) ) $sSeek .= ',';
$sSeek .= $DimIndice[$i] .':'.($n-$_TGrupos);
$_PosIndex = $n;
break;
}
}
}
if( $_ISUBLIST==true ){
if( eSubstrCount(mb_strtoupper($_GET['_OFFLABEL']),'-TITLE')>0 ) $_TITLE = '';
list($FModo, $_ISLOP) = explode(',', $_GET['_ISLOP']);
if( trim($FModo)=='a' ){
$_GET['_FILTER'] = str_replace(CHR92."'", "'", $_GET['_FILTER']);
list($k,$v) = explode('=', $_GET['_FILTER']);
$k = trim($k);
if( mb_substr($k, 1, 1)=='.' ) list(, $k) = explode('.', $k);
}
$_ISLOP = eNsp($_ISLOP);
if( $_ISLOP=='' ) $_ISUBLIST = false;
$_ISLOPMenu = '';
$_ISLOPTH = '';
$_ISLOPTD = '';
if( eSubstrCount($_ISLOP,'(')>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.str_replace('(', '("TH"',$_ISLOP).';');
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.str_replace('(', '("TD"',$_ISLOP).';');
$_ISLOPTH = eval('return '.str_replace('(', '("TH"',$_ISLOP).';');
$_ISLOPTD = eval('return '.str_replace('(', '("TD"',$_ISLOP).';');
$_ISLOP = '';
}
$_ISLOP = mb_strtoupper($_ISLOP);
list(,$url) = explode(":",$_SERVER["QUERY_STRING"]);
$tob = ((eSubstrCount($url,".edf")>0)?"F":"G");
if( preg_match("/I/iu",$_ISLOP) ) eContextPut($tob.'a:'.$url);
if( preg_match("/U/iu",$_ISLOP) ) eContextPut($tob.'mR:'.$url);
if( preg_match("/V/iu",$_ISLOP) ) eContextPut($tob.'cR:'.$url);
if( preg_match("/D/iu",$_ISLOP) ) eContextPut($tob.'bR:'.$url);
eContextPut('Ll:'.$OriFichero);
if( eSubstrCount($_ISLOP,'M')==0 ) $_ISLOPMenu = '-';
if( eSubstrCount($_ISLOP,'I')>0 ){
$_ISLOPTH .= '<i class="ICONINPUT ICONINSERT" onclick=_ModeChange("a")>I</i>';
$_ISLOP = str_replace('I','',$_ISLOP);
$_ISLOPMenu .= '"I":"[I] '.$__Lng[1].'"';
}
$Dim = array(
'U'=>'<i class="ICONINPUT ICONUPDATE" onclick=_ModeChange("m")>U</i>',
'V'=>'<i class="ICONINPUT ICONVIEW" onclick=_ModeChange("c")>V</i>',
'D'=>'<i class="ICONINPUT ICONDELETE" onclick=_ModeChange("b")>D</i>',
'T'=>'<i class="ICONINPUT ICONFILE" onclick=eShowLTools() gsHelp>F</i>'
);
$DimTools = array(
'U'=>'[U] '.$__Lng[2],
'V'=>'[V] '.$__Lng[3],
'D'=>'[D] '.$__Lng[4],
'T'=>'[F] '.$__Lng[5]
);
$conFile = false;
while( mb_strlen($_ISLOP)>0 ){
if( $_ISLOP[0]=='-' ){
if( !empty($_ISLOPMenu) ) $_ISLOPMenu .= ', ';
$_ISLOPMenu .= '"-'.mb_strlen($_ISLOP).'":""';
}else if( $_ISLOP[0]=='M' ){
}else{
if( $_ISLOP[0]=='T' && $TotalReg>0 ){
$_ISLOPTH .= '<i class="ICONINPUT ICONUPDATE" id="UtilListICO" gsHelp onclick=eShowLTools() title="'.$__Lng[5].'">}</i>';
$_ConLToos = false;
}else if( $_ISLOP[0]=='F' ){
$conFile = true;
$_ISLOP = mb_substr($_ISLOP,1);
continue;
}else if( $_ISLOP[0]!='T' ){
$_ISLOPTD .= $Dim[$_ISLOP[0]];
}
if( !empty($_ISLOPMenu) ) $_ISLOPMenu .= ', ';
$_ISLOPMenu .= '"'.mb_substr($_ISLOP,0,1).'":"'.$DimTools[mb_substr($_ISLOP,0,1)].'"';
}
$_ISLOP = mb_substr($_ISLOP,1);
}
if( $conFile && count($_UPLOADFILE)>0 ){
foreach($_UPLOADFILE as $kk=>$vv){
if( eSubstrCount($kk,".")>0 ) continue;
$Prefijo = $_UPLOADFILE[$kk]['PREFIJO'];
$_ISLOPTD .= '<i class="ICONINPUT ICONFILE" title="Ver Documento" onclick=_ViewFile("'.$_DBSERIAL[1].'","'.$kk.'","'.$_UPLOADFILE[$kk]['oDIR'].'","'.$Prefijo.'")>F</i>';
}
}
if( !empty($_ISLOPTD) && empty($_ISLOPTH) ) $_ISLOPTH = ' ';
if( eSubstrCount(mb_strtoupper($_GET['_OFFLABEL']),'-ICONS')>0 ) $_ISLOPTH = $_ISLOPTD = '';
if( $_ISLOPMenu[0]=='-' ) $_ISLOPMenu = '';
list($ISLAncho, $ISLAlto) = explode(',',$_GET['_SIZE']);
?>
<SCRIPT type="text/javascript" name=eDes>
<?PHP
if( $_TITLE=='' ) echo '_NOTITLE=true;';
?>
<?PHP if( trim($FModo)=='a' ){ ?>
if( _WOPENER.DGI("_ISUBLISTSERIAL").value.indexOf('<?=$OriFichero?>,')==-1 ){
_WOPENER.DGI("_ISUBLISTSERIAL").value += '<?= $OriFichero.','.$_sDBTABLE.','.$k.','.str_replace("'","\\'",$v).','.$_ISUBLISTSUFIJO.'|' ?>';
}
<?PHP } ?>
window.name = "_ISUBLIST";
var _ISLOPTD = '<?= str_replace( "'", "\\'", $_ISLOPTD ) ?>',
_WISubList = '<?= $ISLAncho ?>', _HISubList = '<?= $ISLAlto ?>',
_Fila;
function _ModeChange(Op, el){
Op = Op.toLowerCase();
var stxt = window.location.href.replace(/%27/g,""),
o = S.event(window);
if( o.disabled ){
S.info("La fila está deshabilitada", 3);
return eClearEvent();
}
var oTR = S.toTag(o, "TR");
if( oTR.style.textDecoration=="line-through" ){
S.info("La fila está borrada", 3);
return eClearEvent();
}
stxt = stxt.substring(0,stxt.indexOf('&_ISLOP='));
<?PHP if( $_oSourceParent=='G' ){ ?>
stxt = stxt.replace('?Ll:', '?G'+Op+((Op=='a')?':':'R:'));
<?PHP }else{ ?>
stxt = stxt.replace('?Ll:', '?F'+Op+((Op=='a')?':':'R:'));
<?PHP } ?>
if( Op!='a' ){
if( el==undefined ) _Fila = S.toTag(o, 'TR');
else _Fila = el;
if( S(_Fila).attr("LIBRE") ){
return;
}
stxt = stxt.replace('&_FILTER=', '&_SEEK&');
var Index = '<?= $_DBINDEX ?>'.split(','),
tmp = stxt.split('&_ISUBLIST'), n, d;
stxt = tmp[0];
for(n=0; n<Index.length; n++){
d = '&'+Index[n]+"='"+eGF(Index[n],_Fila)+"'";
if( stxt.indexOf(d)==-1 ) stxt += d;
}
stxt += '&_ISUBLIST'+tmp[1];
}else{
stxt += "&_ASSIGN=a";
}
if( S.url(window,"_CONTEXT") ){
stxt = stxt.replace("&_CONTEXT="+S.url(window, "_CONTEXT"), "&_CONTEXT="+_CONTEXT);
}else{
stxt += "&_CONTEXT="+_CONTEXT;
}
top.eSWOpen(window, stxt+'&_CLOSE_=1<?=$_TargetUrl?>&_PSOURCE='+_Source, '', true);
}
function _ViewFile(Serial, File, Dir, Prefijo){
if( (ext = S.fileType(eGF(File))) ){
var NomSrv = Dir+'/'+((Prefijo!=undefined)?Prefijo:'')+eGF(Serial)+'.'+ext.toLowerCase();
top.eCallSrv(window, 'edes.php?D:'+NomSrv+'&FILE='+eGF(File)+"&_CONTEXT="+_CONTEXT);
}else{
top.eInfo(window,'No hay documento');
}
}
</script>
<?PHP
}
if( !isset($usuCursor) && ($_TGrupos>0 || $_TantoPorCiento) ){
$_TReg = 0;
$usuCursor = array();
while( $row = qRow() ){
$usuCursor[] = $row;
if( ++$_TReg > $_DBLIMIT && !$_LimitOn ){
eMessage('~LE|', 'HS', $ExeSg, $ExeJS, 'LE');
}
}
for($n=0; $n<count($_Form); $n++){
if( !empty( $_ADDOPTION[$_Form[$n][1]] ) ){
for($i=0; $i<count($usuCursor); $i++){
$usuCursor[$i][$n] = $_SelVirtual[$_Form[$n][1]][ $usuCursor[$i][$n] ];
}
$_Form[$n][1] = 'sv';
}
}
if( $_TantoPorCiento ){
for($n=0; $n<count($_COLSOP); $n++){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for($l=0; $l<count($usuCursor); $l++) $total += $usuCursor[$l][$n];
for($l=0; $l<count($usuCursor); $l++) $usuCursor[$l][$n] = ((float)$usuCursor[$l][$n]*100)/$total;
}
}
}
}else if( isset($usuCursor) && $_TantoPorCiento ){
for($n=0; $n<count($_COLSOP); $n++){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for($l=0; $l<count($usuCursor); $l++) $total += $usuCursor[$l][$n];
for($l=0; $l<count($usuCursor); $l++) $usuCursor[$l][$n] = ((float)$usuCursor[$l][$n]*100)/$total;
}
}
}
if( !empty($_DBGROUPBY) && !isset($usuCursor) ){
$_TReg = 0;
$usuCursor = array();
while($row=qRow()){
$usuCursor[] = $row;
if( ++$_TReg>$_DBLIMIT && !$_LimitOn ){
eMessage('~LE|', 'HS', $ExeSg, $ExeJS, 'LE');
}
}
$TotalReg = count($usuCursor);
}
if( !empty($_BrowseInTemporary) ){
$TotalReg = $tmpTotalReg;
$HastaList = $tmpTotalReg;
}
if( isset($usuCursor) ) $TotalReg = count($usuCursor);
if( !isset($_TopMaxRec) ) $_TopMaxRec = 1000;
if( $_RowsOnPage>$_TopMaxRec && !isset($_MaxRowsOnPage) ) $_RowsOnPage = $_TopMaxRec;
if( $_RowsOnPage>$TotalReg ) $_RowsOnPage = $TotalReg;
if( $_RowsOnPage==0 ) $_RowsOnPage = $_DBLIMIT;
if( isset($_GET['_ISLBlankRecords']) && $_GET['_ISLBlankRecords']>0 ){
$_RowsOnPage = $_GET['_ISLBlankRecords'];
}
$MaxReg = (($TotalReg<=$_RowsOnPage) ? $TotalReg : $_RowsOnPage);
$ConPaginacion = false;
if( $_LimitOn ){
}else if( $_PrimerosReg<0 && $TotalReg>$_PrimerosReg*-1 ){
}else if( $TotalReg>$_DBLIMIT ){
}else if( $TotalReg>$_RowsOnPage ){
if( isset($_MAXRECFULL) && !$_MAXRECFULL && !empty($_SORTLIST) ){
$ConPaginacion = true;
$_Form[$_pCol[$_SORTLIST]][6] = "*";
$_SORTLIST = '';
}
}else if( isset(SETUP::$List['ShowTotalRecords']) && SETUP::$List['ShowTotalRecords'] && $TotalReg>1 ){
}
$THColPuntero = array();
$THCol = array();
$_VisibleDflt = [];
$_VisibleDfltBak = [];
for($i=0; $i<count($_Form); $i++){
$_VisibleDflt[$i] = ($_Form[$i][6]=="*Q*" || $_Form[$i][6]=="*") ? "*" : "-";
$_VisibleDfltBak[$i] = $_VisibleDflt[$i];
}
$cngUser = array();
$file = "../_datos/usr/".str_replace("/", "_", $_SourceScript).".lst.".S::$_User;
if( file_exists($file) ){
$cngUser = unserialize(file_get_contents($file));
foreach($cngUser as $k=>$v){
$i = $_pCol[$k];
if( $v==0 ){
$_Form[$i][6] = "*";
$_VisibleDfltBak[$i] = "*";
continue;
}
if( $_Form[$i][6]=="*" ){
$_Form[$i][6] = "-";
$_VisibleDfltBak[$i] = "-";
}
}
$borrarFile = true;
for($i=0; $i<count($_Form); $i++){
if( $_VisibleDfltBak[$i]!=$_VisibleDflt[$i] ){
$borrarFile = false;
break;
}
}
if( $borrarFile ){
@unlink($file);
unset($borrarFile);
}
}
unset($_VisibleDfltBak);
if( count($_THCOLSPAN)>0 ){
_CalcTHColSpan($_THCOLSPAN, $THColPuntero, $THCol, $_Form, $NCampos);
}
function _CalcTHColSpan(&$_THCOLSPAN, &$THColPuntero, &$THCol, $_Form, $NCampos){
$dimOk = array();
for($n=0; $n<$NCampos; $n++) $THCol[$n] = array('',0,3,'',$_Form[$n][1].' - '.$_Form[$n][0]);
for($n=0; $n<count($_THCOLSPAN); $n++){
$tmp = explode(',', $_THCOLSPAN[$n]);
for($i=3; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
$tmp[2] .= ','.$tmp[$i];
}
$ok = false;
for($i=0; $i<3; $i++) $tmp[$i] = trim($tmp[$i]);
for($i=0; $i<$NCampos; $i++){
$xTmp = explode(' ',$_Form[$i][1]);
$iz = trim($xTmp[0]);
$de = trim($xTmp[count($xTmp)-1]);
$ConLLaves = "";
if( eSubstrCount($_Form[$i][17],'{')==1 ){
$tmp2 = str_replace('{', ',', $_Form[$i][17]);
$tmp2 = str_replace('}', '', $tmp2);
$tmp2 = explode(',', $tmp2);
$ConLLaves = trim($tmp2[count($tmp2)-1]);
}
if( $ConLLaves==$tmp[0] || (is_numeric($tmp[0]) && $i==$tmp[0]) || $_Form[$i][1]==$tmp[0] || (mb_strtoupper($_Form[$i][3][0])=='S' && ($_Form[$i][1]=='nm_'.mb_substr($tmp[0],4) || $_Form[$i][1] == 'nm_'.mb_substr($tmp[0],3))) || $de==$tmp[0] ){
$THCol[$i][0] = $tmp[2];
$THCol[$i][1] = 1;
$THCol[$i][2] = 2;
$THCol[$i][3] = 0;
if( $_Form[$i][1]<>$tmp[1] ){
for($p=$i+1; $p<$NCampos; $p++){
$ConLLaves2 = "";
if( eSubstrCount($_Form[$p][17],'{')==1 ){
$tmp2 = str_replace('{', ',', $_Form[$p][17]);
$tmp2 = str_replace('}', '', $tmp2);
$tmp2 = explode(',', $tmp2);
$ConLLaves2 = trim($tmp2[count($tmp2)-1]);
}
if( eSubstrCount($_Form[$p][6], "*")==0 ) $THCol[$i][1]++;
$THCol[$p][1] = 1;
$THCol[$p][2] = 0;
$THCol[$p][3] = 0;
$xTmp = explode(' ', $_Form[$p][1]);
$iz = trim($xTmp[0]);
$de = trim($xTmp[count($xTmp)-1]);
if( $ConLLaves2==$tmp[1] ){
$ok = true;
break;
}
if( (is_numeric($tmp[1]) && $p==$tmp[1]) || $_Form[$p][1]==$tmp[1] || (mb_strtoupper($_Form[$p][3][0])=='S' && "cd_"==mb_substr($tmp[1],0,3) && ($_Form[$p][1]=='nm_'.mb_substr($tmp[1],4) || $_Form[$p][1]=='nm_'.mb_substr($tmp[1],3)) ) || $de==$tmp[1] ){
$ok = true;
break;
}
}
}
break;
}
}
if( $ok ){
$dimOk[] = $_THCOLSPAN[$n];
}
}
$_THCOLSPAN = $dimOk;
}
$dim = preg_split('/\<br\>/iu', $_TITLE);
$_TITLE = implode('Â·', $dim);
$_TITLE = eTitleTransform($_TITLE);
if( eSubstrCount('PXFA', $_gs_formato_)>0 ){
if( eSubstrCount(eNsp($_TITLE), '()')==1 ){
$n = mb_strlen(ob_get_contents());
call_user_func(trim(mb_substr($_TITLE, 0, mb_strpos($_TITLE,'('))), $Opcion);
$_TITLE = mb_substr(ob_get_contents(), $n);
}
if( $LeerCur==1 && !empty($_PDFSAVEVAR) ){
$_SERIALIZE = unserialize(file_get_contents('../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var"));
foreach($_SERIALIZE as $k=>$v) ${$k} = $v;
unset($_SERIALIZE);
}
}
if( isset($_DBGATEWAY) && !empty($_DBGATEWAY) ){
eInit();
include(eScript($_DBGATEWAY));
eEnd();
}
if( count($_COLSOP)>0 ){
foreach($_FORMAT as $k=>$v){
if( !empty($_COLSOP[$k]) && empty($_FORMATTOTALS[$k]) ){
$_FORMATTOTALS[$k] = $_FORMAT[$k];
}
}
}
if( count($_ROWSOP)>0 && $_FORMAT[count($_ROWSOP)-1]=='' ){
$p = -1; $nf = -1; $uk = -1;
foreach($_ROWSOP as $k=>$v){
if( $k>$uk ) $uk = $k;
if( !empty($v) && eSubstrCount($_FORMAT[$k],'eNumberFormat')>0 ){
list($dec) = explode(',',$v);
$dec = (float)$dec;
if( $p<$dec ){
$p = $dec;
$nf = $k;
}
}
}
if( $p>-1 ){
$_FORMAT[$uk] = $_FORMAT[$nf];
if( empty($_FORMATTOTALS[$uk]) ) $_FORMATTOTALS[$uk] = $_FORMAT[$nf];
}
}
if( !empty($_DocLabelUserTo) ){
$_DocLabelUserTo = eLngReplaze( $_DocLabelUserTo );
}
if( !empty($_DocLabelUserFrom) ){
$_DocLabelUserFrom = eLngReplaze( $_DocLabelUserFrom );
}
if( !empty($_gs_formato_) || $PDF_Formato=='F' ){
$_TITLETOEXTRACT = str_replace('&#47;', '/', EnPlural($_TITLETOEXTRACT, '', true));
}
if( !empty($_gs_formato_) ){
foreach($_POST as $k=>$v){
if( mb_substr($k,0,7)=='_E_X_P_' ){
while( eSubstrCount($v,'  ')>0 ) $v = str_replace('  ',' ',trim($v));
$_POST[mb_substr($k,7)] = $v;
unset($_POST[$k]);
}
}
if( !empty($_POST['__doc_to_int_']) ){
$_POST['_doc_to_'] = $_POST['__doc_to_int_'].$_POST['_doc_to_ext_'];
}
if( !empty($_POST['_email_to_int_']) || !empty($_POST['_email_to_ext_']) ){
$_POST['_SendDocByMail'] = 1;
}
if( !empty($_POST["_Filter_View_"]) ){
if( isset($usuCursor) ){
$bakUsuCursor = array();
$t = count($usuCursor);
for($n=0; $n<$t; $n++){
if( $usuCursor[$n][0]==$_POST["_Filter_View_"] ) $bakUsuCursor[] = $usuCursor[$n];
}
$bakUsuCursor = $bakUsuCursor;
}else{
$usuCursor = array();
while( $r=qRow() ){
if( $r[0]==$_POST["_Filter_View_"] ) $usuCursor[] = $r;
}
}
for($n=0; $n<count($_CHANGEDIM); $n++){
if( $_CHANGEDIM[$n][0]==$_POST["_Filter_View_"] ){
$_POST["_Filter_View_"] = $_CHANGEDIM[$n][1];
break;
}
}
$txt = trim(str_replace("<BR>", " ", mb_strtoupper($_pField[$_CHANGEFILTERMEMORY][0])));
eAddShowFilter($txt.": ".$_POST["_Filter_View_"]);
}
}
if( preg_match('/^(X|A|T|V|M|P|L|F)$/u', $_gs_formato_) ){
eInit();
if( $_gs_formato_=='X' ){
include_once($Dir_.'xls_lista.gs');
}
if( $_gs_formato_=='A' ){
include_once($Dir_.'mdb_lista.gs');
}
if( $_gs_formato_=='T' ){
include_once($Dir_.'txt_lista.gs');
}
if( $_gs_formato_=='V' ){
include_once($Dir_.'csv_lista.gs');
}
if( $_gs_formato_=='M' || (SETUP::$System["XMLASXLS"]==true && $_gs_formato_=='X' ) ){
include_once($Dir_.'xml_lista.gs');
}
if( $_gs_formato_=='P' ){
_PDFColVIEW();
$FicheroPDF = '../_datos/config/pdf.ini';
@include($FicheroPDF);
if( SETUP::$List['TCPDF'] ){
include($Dir_.'pdf_lista_tc.gs');
}else{
if( !isset($PDF_Lib) ) $PDF_Lib = 'pdf_lista.gs';
include_once($Dir_.$PDF_Lib);
}
}
if( $_gs_formato_=='L' ){
$FicheroPDF = '../_datos/config/pdf.ini';
@include($FicheroPDF);
if( SETUP::$List['TCPDF'] ){
include_once($Dir_.'pdf_label_tc.gs');
}else{
include_once($Dir_.'pdf_label.gs');
}
}
if( $PDF_Formato=='F' ){
if( !empty($_PDFPHP) ){
error_reporting(_ERROR_REPORTING);
include('../d/'.$_PDFPHP);
error_reporting(5);
}
include_once($Dir_.'pdf_ficha.gs');
}
eEnd();
}
$_ColViewDefault = array();
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]=='sv' ) $_Form[$n][1] = 'SV';
$_ColViewDefault[$n] = !preg_match("/\*/u", $_Form[$n][6]);
}
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
if( $_sEDITLIST!=$_EDITLIST[0] ) echo "_CmpAEditar = '{$_EDITLIST[0]}';";
echo "var _Aux = '{$_AUX_}',";
echo "_Destino = '{$_DESTINO_}',";
echo '_NOSORT = '.(($_NOSORT)?'true':'false').',';
echo '_CambiaURL_ = '.((!empty($_CambiaURL_))? 'true':'false').',';
echo '_Filtrado = "'.((!empty($_DELFILTER))? trim($_DELFILTER[0]) :'').'",';
list($_SEL_) = explode('&_PSOURCE=', $_SEL_);
echo '_Sel ="'.$_SEL_.'", _SelFunc="", _NoEvent='.$_NOEVENT.';';
if( !(mb_strpos($_SEL_,',')>0 && mb_strpos($_SEL_,'(')>mb_strpos($_SEL_, ',')) && eSubstrCount($_SEL_, '(')>0 ){
list($Form, $NomFunc) = explode(';', $_SEL_);
echo '_SelFunc = "'.str_replace('()','(Obj)',$NomFunc).'";';
}else{
echo 'var DimObj = new Array();';
echo 'function Rellena(DimObj, Obj){'.$__Enter;
if( $_DEBUG==20 ) echo "debugger;".$__Enter;
if( $_AUX_=='C' ){
$pk = mb_substr($_SEL_, 5, mb_strlen($_SEL_));
if( SESS::$_SELINO[$pk]<>"" ){
echo SESS::$_SELINO[$pk];
}else{
$_SEL_ = str_replace('+', '&#43;', $_SEL_);
$_SEL_ = str_replace('&#43;', '+', $_SEL_);
list($Form, $ExeList, $ExeFicha) = explode(';', $_SEL_);
$Form = urldecode($Form);
$ExeFicha = urldecode($ExeFicha);
$Form = trim($Form).'.';
$sForm = $Form;
$tmpC = explode(',', $ExeList);
for($n=0; $n<count($tmpC); $n++){
$tmpD = explode('=', $tmpC[$n]);
$tmpD[0] = trim($tmpD[0]);
$tmpD[1] = trim($tmpD[1]);
if( $tmpD[1]=='onchange' ){
echo '_WOPENER.S(":'.$tmpD[0].'").eventChange();';
continue;
}else if( $tmpD[1]=='' ){
if( eSubstrCount($tmpD[0],'(')>0 && eSubstrCount($tmpD[0],')')>0 ){
echo '_WOPENER.'.$tmpD[0].';';
echo '_WOPENER.eClearEvent();';
continue;
}
}
if( mb_substr($tmpD[1],-9)=='&_PSOURCE' ) $tmpD[1] = mb_substr($tmpD[1],0,mb_strpos($tmpD[1],'&_PSOURCE'));
$Form = $sForm;
if( $Form=='' || $tmpD[1]=='' ) eMessage(str_replace('#2', $_SEL_, str_replace('#1', '_SEL_', $__Lng[56])), 'HES', 10000);
if( eSubstrCount($tmpD[0], '.')>0 ) $Form = '';
if( $_DEBUG==20 ) echo 'try{';
if( $ExeFicha=='' ){
$tmpD[1] = str_replace( "\\'", "'", $tmpD[1] );
$tmpD[1] = str_replace( ".' '.", '")+" "+eGF("', $tmpD[1] );
$SegundaParte = 'eGF("'.$tmpD[1].'")';
$cDestino = 'eGF("'.$tmpD[1].'")';
}else{
if( $tmpD[1]<>'' ){
if( (string)((float)$tmpD[1])!=$tmpD[1] ){
$SegundaParte = 'Obj['.$tmpD[1].'].textContent';
$cDestino = 'Obj['.$tmpD[1].'].textContent';
}else{
$SegundaParte = 'Obj[eGCol("'.$tmpD[1].'")].textContent';
$cDestino1 = 'eGCol("'.$tmpD[1].'")';
$cDestino  = 'Obj[eGCol("'.$tmpD[1].'")].textContent';
}
}else{
$SegundaParte .= "''";
}
}
if( eSubstrCount($SegundaParte, "||")>0 ){
$SegundaParte = eNSP(str_replace(" || ", '") || eGF("', $SegundaParte));
}
echo '_WOPENER.ePFS("'.$tmpD[0].'",'.$SegundaParte.');'.$__Enter;
if( $_DEBUG==20 ){
?>
}catch(e){
alert('Campo destino "<?=$tmpD[0]?>": '+_WOPENER.DGI("<?=$tmpD[0]?>"));
<?PHP
if( $cDestino1!='' ){
?>
alert('Nº columna listado del campo "<?=$tmpD[1]?>": '+<?=$cDestino1?>);
<?PHP
}
?>
alert('Campo Origen "<?=$tmpD[1]?>": '+<?=$cDestino?>);
}
<?PHP
}
echo "DimObj[{$n}] = _WOPENER.eGO('".$tmpD[0]."');".$__Enter;
}
}
}
echo '}'.$__Enter;
}
echo "var _dEnVentana = new Array('{$_dEnVentana[0]}','{$_dEnVentana[1]}','{$_dEnVentana[2]}'),".$__Enter;
echo '_sJS = '.((!empty($_JSSELROW) || !empty($_JSONCLICKROW))? 'true':'false').','.$__Enter;
echo '_TH_td = new Array(),';
echo '_ChartCol = '.((count($_CHARTCOL)>0) ? 'true':'false').',';
echo "_DefaultOffset = '{$_PaddingList}',";
echo '_objClick=null, _ColNumber=null, _RowNumber=null, _PaginarFullFilter=false;';
$tmp = @file_get_contents("../_datos/usr/".str_replace("/","_",$_SourceScript).".offset.".S::$_User);
if( $tmp!="" ) echo "_DefaultOffset = '{$tmp}';";
if( $_JSSELROW!="" ){
?>
function SelecUsu(o, field){
if( top._DimEvent.length>0 ){
top.eInfoError(window, S.lng(220));
return eClearEvent();
}
var ColNumber = _oTD.cellIndex, ret,
RowNumber = _oTR.rowIndex;
_ColNumber = ColNumber;
_RowNumber = RowNumber;
_objClick = o;
<?=(($_GET["_PSOURCE"]!="WDESKTOP" && $_GET["_PSOURCE"]!="WWORK")? "S.ppublic(window,1);":"")?>
ePublic(1);
function _SelecUsu(obj, field){
<?=_InVar($_JSSELROW);?>
}
ret = _SelecUsu(o, field);
eClearEvent();
ePublic();
<?=(($_GET["_PSOURCE"]!="WDESKTOP" && $_GET["_PSOURCE"]!="WWORK")? "S.ppublic(window);":"")?>
if( S(window).windowIs() ){
top.eSWClose(window);
}else if( ret===false ){
top.eLoading(true, window);
}
return ret || false;
}
<?PHP  }elseif( $_JSONCLICKROW!="" ){ ?>
function SelecUsu(o, field){
if( top._DimEvent.length>0 ){
top.eInfoError(window, S.lng(220));
return eClearEvent();
}
var ColNumber = _oTD.cellIndex, ret,
RowNumber = _oTR.rowIndex,
_ColName = _NomCol[ColNumber];
_ColNumber = ColNumber;
_RowNumber = RowNumber;
_objClick = o;
ePublic(1);
<?PHP if( $_JSONCLICKCOL!="" ){ ?>
if( ',<?=$_JSONCLICKCOL?>,'.indexOf(','+_ColNumber+',')==-1 && ',<?=$_JSONCLICKCOL?>,'.indexOf(','+_ColName+',')==-1 ){
return true;
}
<?PHP } ?>
SePulso();
function _SelecUsu(obj, field){
<?=_InVar($_JSONCLICKROW);?>
}
ret = _SelecUsu(o, field);
eHideBusy();
eClearEvent();
ePublic();
return ret || false;
}
<?PHP
}
if( isset($_CambiaURL_) ){
echo 'var _oDir = "'.$ListOriFichero.'",';
echo '_dDir = "'.$_CambiaURL_.'";';
}
echo '</SCRIPT>';
if( !empty($_TEMPLATE) ){
include($Dir_.'template.inc');
}
$okTitulo = EnPlural($_TITLE, "", true);
if( $_TITLE[0]=="=" && SETUP::$System['CleanTitle'] ){
$_TITLE = trim(mb_substr($_TITLE, 1));
}
if( isset($_OPTIONSINLIST) && $_PSOURCE=="WDESKTOP" ){
if( $_OPTIONSINLISTALL && isset($_OPTIONSINLIST) && ($_OPTIONSINLISTTYPE==2 || $_OPTIONSINLISTTYPE==3) && SETUP::$List['OptionsInListHidden'] ){
$_WINCAPTION = "<span class='LastGetions'>{$__Lng[82]}</span> ";
if( SETUP::$System['CleanTitle'] ){
$_WINCAPTION .= $_TITLE;
}else{
$_WINCAPTION .= EnPlural($_TITLE, "#", true, $_oTITLE);
}
$_FOOTTITLE = "";
}else{
if( SETUP::$System['CleanTitle'] ){
$_WINCAPTION = $_TITLE;
}else{
$_WINCAPTION = EnPlural($_TITLE, $__Lng[6], true, $_oTITLE);
}
}
$_TITLE = '';
$_NOTITLE = true;
}else if( $_SUBLISTADO_==1 && !isset($_OPTIONSINLIST) && !$_FixList ){
}else if( eSubstrCount(eNsp($_TITLE), '()')==1 ){
$n = mb_strlen(ob_get_contents());
call_user_func(trim(mb_substr($_TITLE,0,mb_strpos($_TITLE,'('))), $Opcion);
$_TITLE = mb_substr(ob_get_contents(), $n);
}else{
$_TITLE = str_replace(CHR13.CHR10, '<BR>', $_TITLE);
if( !$VieneDeFicha || $_NOSELECTROW ){
if( isset($_OPTIONSINLIST) && ($_OPTIONSINLISTTYPE==2 || $_OPTIONSINLISTTYPE==3) && SETUP::$List['OptionsInListHidden'] ){
if( SETUP::$System['CleanTitle'] ){
$_TITLE = "<span class='LastGetions'>{$__Lng[82]}</span> ".$_TITLE;
}else{
$_TITLE = "<span class='LastGetions'>{$__Lng[82]}</span> ".EnPlural($_TITLE, "#", true, $_oTITLE);
}
$_FOOTTITLE = "";
}else{
if( SETUP::$System['CleanTitle'] ){
$_TITLE = $okTitulo;
}else{
$_TITLE = EnPlural($_TITLE, $__Lng[6], true, $_oTITLE);
}
}
}else{
if( mb_substr($_sDBTABLE,-4)!='_dlt' ){
switch( $_SubModo ){
case 'ml':
$__Lng[8] = str_replace("# ","# <span id='eSubAction'>",$__Lng[8]).'</span>';
$_TITLE = EnPlural($_TITLE, $__Lng[7], false, $_oTITLE);
break;
case 'cl':
$__Lng[8] = str_replace("# ","# <span id='eSubAction'>",$__Lng[8]).'</span>';
$_TITLE = EnPlural($_TITLE, $__Lng[8], false, $_oTITLE);
break;
case 'bl':
$__Lng[8] = str_replace("# ","# <span id='eSubAction'>",$__Lng[8]).'</span>';
$_TITLE = EnPlural($_TITLE, $__Lng[9], false, $_oTITLE);
break;
}
if( SETUP::$System['CleanTitle'] ) $_TITLE = $okTitulo;
}else{
$_TITLE = EnPlural($_TITLE, $__Lng[10], false, $_oTITLE);
}
}
if( SETUP::$System['WinNoTitle'] && $_PSOURCE!='WWORK' && $_PSOURCE!="" && $_GET["_NEWIFRAME"]!="1" ) $_WINCAPTION = '#';
if( $_SUBLISTADO_==1 && $_FixList && mb_strlen($_SubMode)==2 && isset($_OPTIONSINLIST) ){
}else if( $_WINCAPTION=='#' && !isset($_OPTIONSINLIST) ){
$_WINCAPTION = $_TITLE;
$_TITLE = '';
$_NOTITLE = true;
}
if( $_TITLE!='' && !$_TitleInToolsvar ){
echo '<TABLE class="TITULO" id="GROUPTITLE" border=0px cellspacing=0px cellpadding=0px style="text-align:'.$_dimAling[SETUP::$List['AlignTitle']].'background:transparent;display:'.(($_NOTITLE)?'none':'block').';" onclick="_SetCaption(\'TD\')">';
echo '<TBODY style="display:inline">';
$tmp = explode('<BR>', $_TITLE);
for($l=0; $l<count($tmp); $l++){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr>";
$icono = $_URL_IN_MENU[$_SubMode[0]];
if( $icono!="" ){
echo "<td id='ICONTITLE' a=6>";
echo eIcon($icono, null, "WINDOWTITLEICON");
}
echo "<td id=TITULO nowrap style='cursor:var(--cAuto);background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo '</TBODY>';
echo "</TABLE>";
}
}
if( $_ListToolsMenuType=="B" ){ ?>
<div class="ToolsBar ROUNDED2 SHADOW">
<table width=100% cellspacing=0px cellpadding=0px border=0px><tr>
<?PHP if( $_TitleInToolsvar ){
echo '<td><TABLE class="TITULO" id="GROUPTITLE" border=0px cellspacing=0px cellpadding=0px style="text-align:'.$_dimAling[SETUP::$List['AlignTitle']].'background:transparent;display:'.(($_NOTITLE)?'none':'block').';margin-right:20px;" onclick="_SetCaption(\'TD\')">';
echo '<TBODY style="display:inline">';
$tmp = explode('<BR>', $_TITLE);
for($l=0; $l<count($tmp); $l++){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr>";
$icono = $_URL_IN_MENU[$_SubMode[0]];
if( $icono!="" ){
echo "<td id='ICONTITLE' a=7>";
echo eIcon($icono, null, "WINDOWTITLEICON");
}
echo "<td id=TITULO nowrap style='cursor:var(--cAuto);background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo '</TBODY>';
echo "</TABLE></td>";
} ?>
<td class="ToolsTDIZQ">
<i class="ICONINPUT" style="margin-left:0px;" title="<?=$__Lng[1]?>" onclick="_ModeChange('a')" op="insert">&#406;</i>
<i class="ICONINPUT" style="margin-left:15px;" title="<?=$__Lng[108]?>" onclick="_ModeFilter()" op="seek">S</i>
<?PHP if( $_MAXRECFULL && (count($_COLSOP)==0 || $_COLSOP[0]!="S") ){ ?>
<span id="spanFilterTR">
<input id="filterTR" leng="50" maxlength="50" size="50" tc="#" placeholder="<?=$__Lng[85]?>" type="search" s-help="373"
<?PHP if( $TotalReg>5000 ){ ?>
onmouseenter="S(this).tip('<?=$__Lng[125]?>', 3)"
<?PHP } ?>
onfocus="S.key('#',50,0,'_filterTR', <?=($TotalReg>5000 ? "true":"false")?>)"
onsearch="S.pagination('', 'start', _VisibleRows)">
</span>
<?PHP } ?>
<td class="ToolsTDDCH">
<?PHP
if( isset($_VIEW) ){
echo '<span class="VIEWCONTAINER" style="left:4px; top:4px;';
if( isset($_VIEWTYPEBUTTON) ){
echo "display:inline-flex";
}
echo '">';
for($n=0; $n<count($_VIEW); $n++){
if( isset($_VIEWTYPEBUTTON) ){
echo eAddButton("", $_VIEW[$n], "eViewCSS({$n})");
}else{
echo "<i class='ICONINPUT".(($n>0)?" OFF":"")."' onclick='eViewCSS({$n})' onmouseenter=\"S(this).tip('{$_VIEW[$n]}',0,null,1)\" style='cursor:var(--cPointer);margin-left:3px;'>b</i>";
}
}
echo '</span>';
}
if( isset($_CHANGEDIM) && !$_CHANGEFILTERFULL ){
?>
<span class="Button ROUNDED2 SHADOW" onclick="_ChangeMenu()" id='_ChangeValue' eFilter='<?=$_CHANGEFILTERMEMORY?>' title="Seleccionar los datos a visualizar">
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">V</i> <?=str_replace("<br>", " ", $_pField[$_CHANGEFILTERMEMORY][0])?></span>
</span>
<?PHP
}
(isset($_ENV[DF]['button.bar']) ? $eDes->check('button.bar'):'');
?>
<span class="Button ROUNDED2 SHADOW" onclick="_LToolsMenuUser(this)" id='_ToolsOpsUser'>
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">&#376;</i> <?=$__Lng[86]?></span>
</span>
<span class="Button ROUNDED2 SHADOW" id='_ToolsVerCondition' onmouseenter='S(this).tip("#CONDICIONES",-2)' style="display:none">
<span class="ButtonIn ROUNDED2"><i class="ICONINPUT">f</i> <?=$__Lng[87]?></span>
</span>
<?PHP if( $_CARDSHOW && $_PSOURCE=="WWORK" && count($_COLSOP)==0 ){ ?>
<span class="Button ROUNDED2 SHADOW" id="_ToolsCardList" onclick="_uMenuLTools('CARD', this)">
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">&#89;</i> <?=$__Lng[88]?></span>
</span>
<?PHP } ?>
<?PHP if( $_NOTOOLS!="*" ){ ?>
<span class="Button ROUNDED2 SHADOW" on-click="_LToolsTree(this, '<?=$__Lng[89]?>')" onmouseover="_LToolsTree(this, '<?=$__Lng[89]?>')" onmouseleave="_LToolsTreeHidden()">
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">&#376;</i> <?=$__Lng[5]?></span>
</span>
<?PHP } ?>
<?PHP if( SETUP::$List["TitleIconView"] && count($_TITLEICON)>0 ){
echo $_TITLEICON[0];
?>
<script>
S(".ToolsBar").css("padding-right:7px")
</script>
<?PHP } ?>
</table>
</div>
<?PHP }
echo '<span id="CONTENEDOR" style="height:1px;display:inline-table;width:max-content;text-align:center;text-align:-webkit-center;">';
if( $_NOTITLE==false ){
if( $_TITLE2!='' ){
echo '<span class="Titulo2" id="Titulo2" style="display:block;white-space:nowrap;text-align:left;width:100%;">'.$_TITLE2.'</span>'."\n";
}
}
if( !isset($_GET['_ISUBLIST']) ){
if( isset($_CHANGEFILTER) && count($_CHANGEFILTER)>0 ) $_SHOWFILTER = true;
$tmp = false;
if( $_SHOWFILTER ){
PintaCondiciones($_DBADDFILTER);
$tmp = true;
}else{
if( $_VerUserCondiciones!='' && function_exists($_VerUserCondiciones) ){
eShowFilter(call_user_func(trim($_VerUserCondiciones)));
$tmp = true;
}
if( isset($_eShowFilterHTML) ) echo $_eShowFilterHTML;
}
?>
<SCRIPT type="text/javascript" name=eDes>
let oCONDICIONES = S("#CONDICIONES");
if( oCONDICIONES.length && S("#_ToolsVerCondition").length ){
S("#_ToolsVerCondition").display("");
S("#CONDICIONES").none();
}
</SCRIPT>
<?PHP
}
if( isset($_GET['_ISUBLIST']) && isset($_GET['_ISLOP']) ){
unset($_JSSELROWS);
}else if( isset($_JSSELROWS) ){
$_RowsOnPageBak = $_RowsOnPage = $_DBLIMIT;
$_SORTLIST = $_SORTLISTCND = '';
?>
<span style="width:100%;text-align:center">
<table><tr>
<td>
<table class="AddButton" onclick="SeleccionInvertir()" oncontextmenu="SeleccionInvertir(1)" title="Click Izq: Invierte selección\nClick Dcha: Limpia selección" border="0px" cellspacing="0px" cellpadding="0px" style="display:table;margin-left:0px;"><tbody><tr>
<td style="padding-left:4px">Invertir Selección</td></tr></tbody>
</table>
<td>
<table class="AddButton" onclick="SeleccionEnviar()" title="" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr>
<td style="padding-left:4px"><?=$_JSSELROWS[2]?></td></tr></tbody>
</table>
</table>
</span>
<?PHP
}
$xOrden = $_DBORDER;
while( eSubstrCount($xOrden, '(')>0 && eSubstrCount($xOrden, ')')>0 ){
$i = mb_strpos($xOrden,"(");
$f = mb_strpos($xOrden,")", $i);
for($n=$i; $n>=0; $n--){
$i = $n;
if( mb_substr($xOrden,$n,1)=="," ){
$i++;
break;
}
}
$tmp = explode(",", eMid($xOrden,"(",")"));
for($n=0; $n<count($tmp); $n++){
if( !is_numeric($tmp[$n]) && $tmp[$n][0]!="'" && $tmp[$n][0]!='"' ){
$xOrden = str_replace(mb_substr($xOrden, $i, $f-$i+1), $tmp[$n], $xOrden);
break;
}
}
}
$sOrden = '';
$OrdCampo = array();
$tmp = explode(',', $xOrden);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
if( eSubstrCount($tmp[$n], '.')>0 ){
list(,$c) = explode('.', $tmp[$n]);
$tmp[$n] = trim($c);
}
$OrdCampo[] = $tmp[$n];
list($Campo, $Ord) = explode(' ', $tmp[$n]);
if( is_numeric($Campo) ){
}else{
for($i=0; $i<count($_Form); $i++) if( $Campo==$_Form[$i][1] ){
$Campo = $i+1;
break;
}
}
if( $sOrden<>'' ) $sOrden .= ',';
$sOrden .= $Campo;
if( $Ord<>'' ) $sOrden .= ' '.$Ord;
}
if( $_ORDEN_=="" ){
echo "<script type='text/javascript'>DGI('_ORDEN_').value='".addslashes($sOrden)."';</script>";
}
for($n=0; $n<count($OrdCampo); $n++){
if( eSubstrCount($OrdCampo[$n], ' ')>0 ){
list($Campo, $Ord) = explode(' ', $OrdCampo[$n]);
$Campo = trim($Campo);
switch( trim(mb_strtoupper($Ord)) ){
case 'ASC':
$OrdASC[$Campo] = 1;
if( mb_substr($Campo,0,3)=='cd_' ) $OrdASC['nm_'.mb_substr($Campo,3)] = 1;
break;
case 'DESC':
$OrdDESC[$Campo] = 1;
if( mb_substr($Campo,0,3)=='cd_' ) $OrdDESC['nm_'.mb_substr($Campo,3)] = 1;
break;
case 'EXTEND':
break;
default:
}
}else{
$OrdASC[$OrdCampo[$n]] = 1;
if( mb_substr($OrdCampo[$n],0,3)=='cd_' ) $OrdASC['nm_'.mb_substr($OrdCampo[$n],3)] = 1;
}
}
if( !empty($_ISUBLISTTOOLS) && $_ISUBLIST==true ){
$_LToolsType = "";
}
if( $_LToolsType[0]=='S' ){
_LToolsPagination();
}
if( $_LToolsType[0]=='s' ){
$ConPaginacion = true;
if( $_ISUBLISTMODE=="" ){
$__Lng[20] = eAsciiToCode($__Lng[20], false);
$__Lng[20] = str_replace('#1', '<span id=_Pie>'.(ceil($_REG_/$_RowsOnPage)+1).'</span>', $__Lng[20]);
$__Lng[20] = str_replace('#2', '<span id=_Pie2>'.ceil($TotalReg/$_RowsOnPage).'</span>', $__Lng[20]);
$__Lng[20] = str_replace('#3', $xTotalReg, $__Lng[20]);
$xShowTotalRecords = "<center class=Pie{$SeVePie}>".$__Lng[20].'</center>';
$xShowTotalRecords = str_replace("<center ","<center style='margin-top:0px' ",$xShowTotalRecords);
?>
<center>
<TABLE id="ToolsPaginate" cellspacing=0px cellpadding=0px border=0px style="display:table;border-collapse:collapse;margin-top:7px;"><TR>
<TD style='padding-left:1px'><I class="ICONINPUT" title="<?=$__Lng[25]?>" id=_KEY36 onclick='_PagNormal();Paginar("I");'>%</I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[26]?>" id=_KEY33 onclick='_PagNormal();Paginar("<");'><</I></TD>
<TD><?=$xShowTotalRecords?></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[27]?>" id=_KEY34 onclick='_PagNormal();Paginar(">");'>></I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[28]?>" id=_KEY35 onclick='_PagNormal();Paginar("F");'>&</I></TD>
</TABLE>
</center>
<?PHP
$xShowTotalRecords = "";
}
}
if( isset($_SUBTITLE) || !empty($_BUTTONLIST) ){
echo $__Enter;
echo "<table id='SubTitle' cellspacing=0px cellpadding=0px border=0px style='width:100%; w-idth:max-content;background-color:transparent;display:block;border-collapse:collapse;'><tbody style='display:block;'><tr style='display:block;width:100%'><td style='display:block;width:100%;padding:0px'>";
if( $_BUTTONLIST!="" ){
echo $_BUTTONLIST;
}else if( $_SUBTITLE=="" ){
echo "<table width=100% cellspacing=0px cellpadding=0px border=0px style='display:table;border-collapse:collapse;'><tbody style='display:block'><tr><td align='left' id='sT' style='width:100%'>".date('d-m-Y')."</td><td align='right' id='sT'>".date('H:i:s')."</td></tr></tbody></table>";
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_SUBTITLE.';');
@eval($_SUBTITLE.';');
}
echo '</td></tr></table>';
}
$_FILTER = str_replace('"', "'", $_FILTER);
$NCampos -= $_EditListNCampos;
$tColumnas = $NCampos;
if( count($_ROWSOP)>0 ) $tColumnas++;
$SoloDatos = isset($_REG_);
if( $SoloDatos ){
eInit();
echo '<HTML><HEAD></HEAD><script type="text/javascript">function WidthSubTitle(){}</script>';
echo '<BODY onload="WidthSubTitle()" style="text-align:center;">';
}
echo $__Enter;
$DefColsOp = '';
if( $_NOSELECTROW && count($_COLSOP)>0 ){
for($n=0; $n<count($_COLSOP); $n++){
if( $DefColsOp=='' ) $DefColsOp = ' DefColsOp="|';
$DefColsOp .= $_COLSOP[$n].'|';
}
if( $_SummaryType>0 ){
$DefColsOp = str_replace('S|S|', 'S|', $DefColsOp);
}else{
$DefColsOp = str_replace('S|', '', $DefColsOp);
}
if( $DefColsOp!='' ) $DefColsOp .= '"';
}
if( !empty($_SORTLIST) ){
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$_SORTLIST ){
$_FORMAT[$n] = '"<i class=\"ICONINPUT\">&#294;</i>"';
$_ALIGN[$n] = ' id=c';
break;
}
}
}
foreach($_UPLOADFILE as $k=>$v){
if( $_UPLOADFILE[$k]['oDIR'][0]=='$' ){
$_UPLOADFILE[$k]['oDIR'] = _ExeEval( $_UPLOADFILE[$k]['oDIR'], $_UPLOADFILE[$k]['oDIR'] );
$tmp = eScript( $_UPLOADFILE[$k]['oDIR'] );
$_UPLOADFILE[$k]['DIR'] = $tmp;
}
}
$_ColVisibles = 0;
$_BorderLeft = false;
echo '<style id="configCSS" name="configCSS">';
if( mb_strlen($_SubMode)==2 && !$_NOSELECTROW ){
echo ".BROWSE TD {cursor:var(--cContext);}";
}
if( $_ListTypeFormat=="S" ){
echo ".BROWSE { border-collapse:collapse; margin:0px 0px 1px 0px !important; }";
echo ".BROWSE TH, .BROWSE TD { border-bottom: 1px solid ".SETUP::$CSSDynamic['cListGrid']."; }";
}else{
echo ".BROWSE { border-collapse:collapse; margin:0px 0px 1px 1px !important; }";
echo ".BROWSE TH, .BROWSE TD { border-bottom: 1px solid ".SETUP::$CSSDynamic['cListGrid']."; border-left:1px solid ".SETUP::$CSSDynamic['cListGrid']."; }";
}
if( file_exists("../_datos/usr/".str_replace("/", "_", $_SourceScript).".bleft.".S::$_User) ){
$_BorderLeft = true;
echo ".BROWSE TH, .BROWSE TD { border-left:1px solid ".SETUP::$CSSDynamic['cListGrid']."}";
}
for($i=0; $i<count($_Form); $i++){
if( $_Form[$i][3]=="CHAR" && $_Form[$i][4]==1 ){
$n = $i+1;
echo ".BROWSE TD:nth-child({$n}) { font-family:eDes; }";
}
}
$_ColsColorInf = array();
$cssSubTotal = array();
$_AlignTH = array();
if( !$_NOJS ){
$cssBrowse = "";
$cssBak = "";
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
$CursorType = '';
if( $_COLSCOLOR[$n]=='' ){
$CursorType = $_CURSORTYPE;
}else if( count($_COLSOPFORM)>0 ){
if( $_COLSCOLOR[$n][0]=="#" ){
$_ColsColorInf[$n] = "background-color:".$_COLSCOLOR[$n];
}else{
}
}
if( preg_match("/^(\+|\+,|\-|\-,)$/u", $_Form[$n][2]) ){
$_AlignTH[$n] = "text-align:".$_dimAling[SETUP::$List['AlignNumericTH']];
}else if( preg_match("/^(F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/u", $_Form[$n][2]) || preg_match("/^(C|c)$/u", $_Form[$n][3]) ){
$_AlignTH[$n] = "text-align:".$_dimAling[SETUP::$List['AlignFillTH']];
}else{
$_AlignTH[$n] = "text-align:".$_dimAling[SETUP::$List['AlignTextTH']];
}
$i = $n-$_TGrupos;
if( eSubstrCount($_Form[$n][6], '*')>0 || ($_SummaryType>0 && $n>=$_SummaryType && $n<$_TGrupos) ){
$cssSubTotal[$n] = " style='display:none;'";
if( preg_match("/^(F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/u", $_Form[$n][2]) || preg_match("/^(C|c)$/u", $_Form[$n][3]) ){
$tmp = "c";
}else if( !preg_match("/^(\+|\+,|\-|\-,)$/u", $_Form[$n][2]) || $_Form[$n][3][0]=="S" ){
$tmp = "l";
}else{
$tmp = "r";
}
$cssBak .= " col_{$i}{$tmp}";
if( $cngUser[$_Form[$n][1]]!="1" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}{$tmp}";
$_Form[$n][6] = "-";
}
}else{
switch( mb_strtolower($_ALIGN[$n]) ){
case ' id=i':
$cssSubTotal[$n] = " style='text-align:left;width:1px;'";
if( $cngUser[$_Form[$n][1]]=="0" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}".mb_strtolower(SETUP::$List['AlignTextTD']);
}
$cssBak .= " col_{$i}".mb_strtolower(SETUP::$List['AlignTextTD']);
if( $_COLSCOLOR[$n]!="" ) $DimCss["col_{$i}l"] = $_COLSCOLOR[$n];
$_ColVisibles++;
if( empty($_AlignTH[$n]) ){
$_AlignTH[$n] = 'text-align:left;';
}
break;
case ' id=c':
$cssSubTotal[$n] = " style='text-align:center;width:1px;'";
if( $cngUser[$_Form[$n][1]]=="0" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}".mb_strtolower(SETUP::$List['AlignFillTD']);
}
$cssBak .= " col_{$i}".mb_strtolower(SETUP::$List['AlignFillTD']);
if( $_COLSCOLOR[$n]!="" ) $DimCss["col_{$i}c"] = $_COLSCOLOR[$n];
$_ColVisibles++;
if( empty($_AlignTH[$n]) ){
$_AlignTH[$n] = 'text-align:center;';
}
break;
case ' id=d':
$cssSubTotal[$n] = " style='text-align:right;width:1px;'";
if( $cngUser[$_Form[$n][1]]=="0" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}".mb_strtolower(SETUP::$List['AlignNumericTD']);
}
$cssBak .= " col_{$i}".mb_strtolower(SETUP::$List['AlignNumericTD']);
if( $_COLSCOLOR[$n]!="" ) $DimCss["col_{$i}r"] = $_COLSCOLOR[$n];
$_ColVisibles++;
if( empty($_AlignTH[$n]) ){
$_AlignTH[$n] = 'text-align:right;';
}
break;
case ' id=o':
$cssSubTotal[$n] = " style='display:none;'";
if( preg_match("/^(F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/u", $_Form[$n][2]) || preg_match("/^(C|c)$/u", $_Form[$n][3]) ){
$tmp = "c";
}else if( preg_match("/^(\+|\+,|\-|\-,)$/u", $_Form[$n][2]) ){
$tmp = "l";
}else{
$tmp = "r";
}
$cssBak .= " col_{$i}{$tmp}";
if( $cngUser[$_Form[$n][1]]=="0" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}{$tmp}";
$_Form[$n][6] = "-";
}
if( $_COLSCOLOR[$n]!="" ) $DimCss["col_{$i}n"] = $_COLSCOLOR[$n];
break;
default:
$cssSubTotal[$n] = " style='text-align:left;width:1px;'";
if( $cngUser[$_Form[$n][1]]=="0" || $_Form[$n][0]=="" ){
$cssBrowse .= " col_{$i}n";
$_Form[$n][6] = "*";
}else{
$cssBrowse .= " col_{$i}l";
}
$cssBak .= " col_{$i}l";
if( $_COLSCOLOR[$n]!="" ) $DimCss["col_{$i}l"] = $_COLSCOLOR[$n];
$_ColVisibles++;
}
}
if( preg_match("/^(\+|\+,|\-|\-,|\*|F4|P4|CP|T|CDI|H8|H5|H2|CLR|IP|DNI|NIF|CIF|NSS|0)$/u", $_Form[$n][2]) ){
$cssBrowse .= " col_{$i}ff";
}
}
unset($dim);
$cssBak = trim($cssBak);
if( count($_CHARTCOL)>0 ){
$cssSubTotal[count($_Form)] = " style='text-align:left;width:1px;'";
$cssBrowse .= " col_".count($_Form)."l";
}else if( isset($_JSSELROWS) ){
$cssBrowse .= " col_".count($_Form)."c";
}
if( count($_COLSCOLOR)>0 && count($_COLSOPFORM)==0 ){
foreach($DimCss as $k=>$v){
$n = mb_substr(mb_substr($k,0,-1),4)+1-$_TGrupos;
if( $v[0]=="#" ){
echo ".{$k} TBODY TD:nth-child({$n}) {background-color:{$v};}";
}else{
$_ColsClass[$n-1] = $v;
}
}
}
if( $_TGrupos==0 ) $cssSubTotal = array();
}
if( count($_COLSWIDTH)>0 ){
for($n=0; $n<count($_Form); $n++){
$_COLSWIDTH[$n] = trim($_COLSWIDTH[$n]);
if( (!$_ColsTrim && $_COLSWIDTH[$n]!="" && $_COLSWIDTH[$n]!="0") || ($_ColsTrim && $_userSetCOLSWIDTH[$n]>0) ){
$pk = "c".rand(1000,9000);
$ClassBrowse .= " ".$pk;
echo $__Enter.".{$pk} TBODY td:nth-child(".($n+1-$_TGrupos)."){";
echo "width:".px($_COLSWIDTH[$n]).';';
$dataFixed = preg_match('/(\+|\-|0|F4|P4|CDI)/u', $_Form[$n][2]);
if( isset($_userSetCOLSWIDTH[$n]) && !$dataFixed ){
?>
max-width: <?=px($_userSetCOLSWIDTH[$n])?>;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
<?PHP
}else if( $dataFixed ){
echo 'white-space: nowrap;';
}else{
echo 'white-space:pre; white-space:pre-wrap; white-space:pre-line; white-space:-pre-wrap; white-space:-o-pre-wrap; white-space:-moz-pre-wrap; white-space:-hp-pre-wrap; word-wrap:break-word;';
}
if( $_COLSCOLOR[$n]=='JSOnClickRow' ){
unset($_COLSCOLOR[$n], $_ColsClass[$n]);
echo eGetStyle("css/list.css", ".JSOnClickRow");
}
echo "}";
}else{
$_COLSWIDTH[$n] = "";
}
}
}else $ClassBrowse = "";
$_AltoImgHidden = array();
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][20]!="" ){
$tmp = explode(",", $_Form[$n][20]);
echo '.BROWSE td:nth-child('.($n+1).') SPAN {';
echo 'overflow:hidden;display:block;';
echo "width:{$tmp[0]}px;height:{$tmp[1]}px;";
echo '}';
echo '.BROWSE td:nth-child('.($n+1).') SPAN IMG {';
echo "width:auto;height:100%;";
echo '}';
$_AltoImgHidden[$n] = "{$tmp[1]}px";
}
}
if( isset($_LISTMULTISELECT) || $_EDITLIST[3]==2 ){
$ClassMultSelect = "m".rand(1000,9000);
echo $__Enter.".{$ClassMultSelect} td:nth-child(".(count($_Form)+1)."){";
echo "font-family:eDes;";
echo "font-size:50%;";
echo "text-align:center;";
echo "}";
$ClassMultSelect = " ".$ClassMultSelect;
}
if( !empty($_EDITLIST[2]) ){
$txt = "";
list($cssImp, $cssPar) = explode("/", $_EDITLIST[2]."/".$_EDITLIST[2]);
$tmp = explode(",", $_EDITLIST[0]);
for($n=1; $n<count($tmp)-1; $n++){
$i = $_pCol[$tmp[$n]]+1;
$txt .= ".BROWSE td:nth-child({$i}){".$cssImp."}";
$txt .= ".BROWSE TBODY tr:nth-child(2n) td:nth-child({$i}){".$cssPar."}";
}
echo $txt;
}
echo '</style>';
if( !empty($_EDITLIST[0]) ){
if( empty($sSeek) ){
eMessage("El listado tiene que contener una columna con el campo í­ndice para ejecutar un [EditList]", "HSE", 5);
}
$tmp = array();
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
if( eSubstrCount($_EDITLIST[0], ",{$_SelectReal[$_Form[$n][1]]},")==1 || eSubstrCount(",".$_EDITLIST[0].",", ",{$_Form[$n][1]},")==1 ){
$i = $n-$_TGrupos;
if( rtrim($_ALIGN[$n])!="" ){
$c = mb_substr(rtrim($_ALIGN[$n]),-1);
if($c=="d") $c="r";
else if($c=="i") $c="l";
$tmp[] = $i.$c;
}else if( $_Form[$n][3][0]=="S" ){
$tmp[] = $i."l";
}else if( preg_match("/^(F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/u", $_Form[$n][2]) || preg_match("/^(C|c)$/u", $_Form[$n][3]) ){
$tmp[] = $i."c";
}else if( preg_match("/^(\+|\+,|\-|\-,)$/u", $_Form[$n][2]) ){
$tmp[] = $i."r";
}else{
$tmp[] = $i."l";
}
}
}
?>
<script type="text/javascript">
!function(){
var EditList = top.S.ruleGet(window, ".EditList"),
EditListGreenBar = top.S.ruleGet(window, ".EditListGreenBar"),
dim = "<?=implode(",",$tmp)?>".split(","), n;
for(n=0; n<dim.length; n++){
top.S(window).rule("+.col_"+dim[n]+" td:nth-child("+(top.S.mid(dim[n],0,-1)*1+1)+"){"+EditList+"}", "list");
<?PHP if( $_GREENBAR ){ ?>
top.S(window).rule("+.col_"+dim[n]+" TBODY TR:nth-child(even) td:nth-child("+(top.S.mid(dim[n],0,-1)*1+1)+"){"+EditListGreenBar+"}", "list");
<?PHP } ?>
}
}();
</script>
<?PHP
}
if( $_ISUBLIST==true ){
$_GREENBAR = $_SLGREENBAR;
}
if( isset($_GREENBARCOL) ){
$_GREENBAR = false;
if( !is_numeric($_GREENBARCOL) ) $_GREENBARCOL = $_pCol[$_GREENBARCOL];
if( !is_numeric($_GREENBARCOL) ) unset($_GREENBARCOL);
$_GREENBARLAST = null;
}
$cssBrowse = 'BROWSE'.(($_GREENBAR)?' GREENBAR':'').$cssBrowse.$ClassBrowse.$ClassMultSelect;
if( $_ISUBLIST ) $cssBrowse .= " NO_SHADOW";
if( $_TGrupos>0 ) $cssBrowse .= " GrupoPieLista";
if( isset($_VIEW) ){
$tmp = explode(" ", $cssBrowse);
$tmp2 = array();
$tmpa = array();
for($n=0; $n<count($tmp); $n++){
$ok = false;
for($i=0; $i<count($tmp); $i++){
if( preg_match("/^col_{$i}(l|c|r|n)/iu", $tmp[$n]) ){
$tmp2[$n] = "col_{$i}n";
$tmpa[$i] = mb_substr($tmp[$n],-1);
$ok = true;
break;
}
}
if( !$ok ) $tmp2[$n] = $tmp[$n];
}
$cssBrowseOFF = implode(" ",$tmp2);
$_VIEWCSS = array();
for($n=0; $n<count($_VIEWCOL); $n++){
$_VIEWCSS[$n] = $cssBrowseOFF." ";
}
for($n=0; $n<count($_VIEWCOL); $n++){
if( isset($_VIEWCOL[$n]) ){
for($i=0; $i<count($_VIEWCOL[$n]); $i++){
$p = $_VIEWCOL[$n][$i];
$_VIEWCSS[$n] = str_replace("col_{$p}n ", "col_{$p}{$tmpa[$p]} ", $_VIEWCSS[$n]);
}
}
}
$cssBrowse = $_VIEWCSS[(isset($_GET["_VIEWFORMAT"])) ? $_GET["_VIEWFORMAT"] : 0];
}
if( isset($_CHANGEDIM) ){
if( $_CHANGEFILTERFULL ){
?>
<script type="text/javascript">
function _ChangePagina(pk){
S(".ButtonMultiple TD").css({fontWeight:"normal"});
var o = S.event(window);
S(o).css({fontWeight:"bold"});
_PaginarFilter(S(S.toTag(o,"TABLE")).attr("ePK"));
_CalculatorClose();
}
function _ModeScroll(tipo){
var oBox = S(".ButtonMultiple SPAN").obj,
max = oBox.offsetWidth,
left = oBox.scrollLeft,
hayMas = false,
lastObj = null;
if( tipo==undefined ) tipo = (event.wheelDelta>0)?0:1;
if( tipo==1 ){
S(".ButtonMultiple").obj.rows[0].cells[0].style.visibility = "visible";
S(".ButtonMultiple .AddButton").each(function(k,o){
if( (o.offsetParent.offsetLeft-left)>max ){
hayMas = true;
return null;
}
lastObj = o;
});
if( lastObj!=null ) S.scrollSet(oBox, {left:lastObj.offsetParent.offsetLeft, top:0});
left = oBox.scrollLeft;
hayMas = false;
S(".ButtonMultiple .AddButton").each(function(k,o){
if( (o.offsetParent.offsetLeft-left)>max ){
hayMas = true;
return null;
}
});
if( !hayMas ) S(".ButtonMultiple").obj.rows[0].cells[2].style.visibility = "hidden";
}else{
left -= oBox.clientWidth
S(".ButtonMultiple").obj.rows[0].cells[2].style.visibility = "visible";
S(".ButtonMultiple .AddButton").each(function(k,o){
if( o.offsetParent.offsetLeft>left ){
S.scrollSet(oBox, {left:o.offsetParent.offsetLeft, top:0});
if( k==0 ) S(".ButtonMultiple").obj.rows[0].cells[0].style.visibility = "hidden";
return null;
}
});
}
}
</script>
<?PHP
echo '<table class="ButtonMultiple" style="display:block;width:100%;" onmousewheel=_ModeScroll()><tr>';
echo "<td onclick='_ModeScroll(0)' style='visibility:hidden;'><i class='ICONWINDOW'><</i>&nbsp;</td>";
echo "<td>";
echo '<span style="display:block;overflow:hidden;width:1px;">';
echo '<table><tr>';
for($n=0; $n<count($_CHANGEDIM); $n++){
echo '<td>';
eAddButton("", $_CHANGEDIM[$n][1], '_ChangePagina()', '', " ePK='".$_CHANGEDIM[$n][0]."'");
echo '</td>';
}
echo '</tr></table>';
echo "</span>";
echo "</td>";
echo "<td onclick='_ModeScroll(1)'>&nbsp;<i class='ICONINPUT'>></i></td>";
echo '</tr></table>';
}else{
?>
<script type="text/javascript">
<?PHP
echo 'var _ChangeDIM = [["-MENU"]';
for($n=0; $n<count($_CHANGEDIM); $n++) echo ',["'.$_CHANGEDIM[$n][1].'","","'.$_CHANGEDIM[$n][0].'"]';
echo '];';
?>
function _ChangeMenu(){
if( S("#_ChangeValue").class("?AddButton") || S("#_ChangeValue").class("?Button") ){
var cmpFilter = S("#_ChangeValue").attr("eFilter"),
valFilter = S(":"+cmpFilter).val();
}else{
var txt = S("td:nth-child(2)", "#_ChangeValue").text();
}
if( S("#_ChangeValue").obj["eMenu"]!=undefined ){
S(S("#_ChangeValue").obj["eMenu"]).nodeRemove();
}
S("#_ChangeValue").obj["eMenu"] = S(S.event(window)).menu(_ChangeDIM, {function:_ChangePagina, drop:true, out:true, nohide:true, opBold:valFilter});
}
function _ChangePagina(pk, txt, trigger, tr, table){
var n, text, filterPk;
if( !txt ){
for(n=0; n<_ChangeDIM.length; n++) if( _ChangeDIM[n].length>2 && _ChangeDIM[n][2]==pk ){
txt = _ChangeDIM[n][0];
break;
}
}else{
S("TR[op]", table).each(function(k, oTR){
text = S.trim(S(oTR.cells[1]).html());
if( S(oTR).attr("op")==pk ){
var cmpFilter = S("#_ChangeValue").attr("eFilter"), o, xFilter;
if( S("LI[eFilterField='"+cmpFilter+"']").length ){
o = S("LI[eFilterField='"+cmpFilter+"']").obj;
xFilter = S.mid(S(o).html(), ":", "<");
if( xFilter=="" ) xFilter = S.mid(S(o).html(), ":", 0);
xFilter = S.trim(xFilter);
if( S.is("<", S(o).html()) ){
S(o).html(S.replace(S(o).html(), ": "+xFilter+" <", ": "+text+" <"));
}else{
S(o).html(S(o).html().split(":")[0]+": "+text);
}
}
}
});
}
filterPk = pk;
if( S("#_ChangeValue").class("?AddButton") ){
var cmpFilter = S("#_ChangeValue").attr("eFilter");
S(":"+cmpFilter).val(filterPk);
}else if( S("td:nth-child(2)", "#_ChangeValue").length ){
S("td:nth-child(2)", "#_ChangeValue").text(txt);
}else{
S(":"+S("#_ChangeValue").attr("eFilter")).val(filterPk);
}
_PaginarFilter(pk);
_CalculatorClose();
}
</script>
<?PHP
if( $_ListToolsMenuType!='B' ){
echo '<table><tr>';
echo "<td class='CHANGEFILTER'>".str_replace("<br>", " ", $_pField[$_CHANGEFILTERMEMORY][0])."</td>";
echo '<td>';
eAddButton("v", "Filtrar", "_ChangeMenu()", "Seleccionar los datos a visualizar", " id='_ChangeValue' eFilter='{$_CHANGEFILTERMEMORY}'");
echo '</td>';
echo '</tr></table>';
}
}
}
$_xDBORDER = "";
$tmp = explode(",",$_DBORDER);
for($n=0; $n<count($tmp); $n++){
list($ali,$cam) = explode(".",trim($tmp[$n]));
if($cam=="") $cam = $ali;
if($_xDBORDER!="") $_xDBORDER .= ",";
$_xDBORDER .= trim($cam);
}
for($n=0; $n<count($_TIPTHTOP); $n++){
if( $_TIPTHTOP[$n]!="" ){
$_TIPTHTOP[$n] = str_replace(
array('\\t', '\\n'),
array("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "<br>"),
trim($_TIPTHTOP[$n])
);
echo '<span id="_TIP_HT_'.$n.'" style="display:none;text-align:left">'.$_TIPTHTOP[$n].'</span>';
}
}
foreach($_TIPTH as $n=>$v){
if( $_TIPTH[$n]!="" ){
$_TIPTH[$n] = str_replace(
array('\\t', '\\n'),
array("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "<br>"),
trim($_TIPTH[$n])
);
echo '<span id="_TIP_H_'.$n.'" style="display:none;text-align:left">'.$_TIPTH[$n].'</span>';
}
}
$_xDBORDER = $_DBORDER;
if( !ISCLI && isset($_ENV["activateFlush"]) && $_ENV["activateFlush"] ){
$Contents = ob_get_contents();
ob_get_clean();
echo $Contents;
unset($Contents);
$_ENV["_CompressedPages"] = false;
}
if( $_NOJS ){
eInit();
eHTML("L:{$OriFichero}", $Opcion, $_TITLE);
eLink($_CSS);
if( $_CSSADDFILE!='' ){
$tmp = explode(',', $_CSSADDFILE);
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
if( $_CSSPRINT!='' ) echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/{$_CSSPRINT}.css' TYPE='text/css'>";
if( SESS::$_D_!='' && SESS::$_D_!='D' && !$_gsCreate_ ) echo '<LINK REL="stylesheet" HREF="edes.php?R:$t/css/00.css'.eSessionAddUrl().'" TYPE="text/css">';
echo '<style>';
echo 'TH {cursor:var(--cAuto);}';
if( $_SubModo=='l' ) echo 'TD {cursor:var(--cAuto);}';
echo '</style>'.$__Enter;
echo '</head><body style="text-align:center">';
if( $_TITLE!='' ){
echo '<TABLE cellspacing=0px cellpadding=0px style="background:transparent">';
$tmp = explode('<BR>', $_TITLE);
for($l=0; $l<count($tmp); $l++){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr><td id=TITULO align=center nowrap style='cursor:var(--cAuto);background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo "</TABLE>";
}
echo '<table id="BROWSE" class="'.$cssBrowse.'" classBak="'.$cssBak.'" eOrder="'.$_xDBORDER.'"'.((!$_MultiSort)?" eMultiSort=0":"").' eOrderBak="'.$_xDBORDER.'" cellspacing=1px border=0px eCols='.($tColumnas-$_TGrupos+1).$_SORTLISTCND.'>';
}else if( isset($_ILIST_) ){
echo '<table id="BROWSE" class="'.$cssBrowse.'" classBak="'.$cssBak.'" eOrder="'.$_xDBORDER.'" eOrderBak="'.$_xDBORDER.'"'.((!$_MultiSort)?" eMultiSort=0":"").' SeekCampos="'.$sSeek.'" FiltroTabla="'.(empty($_FILTER)?"":"*").'" onresize="WidthSubTitle();'.$DefColsOp.' cellspacing=1px border=0px eCols='.($tColumnas-$_TGrupos);
if( $_ISUBLIST==true && $_ISLOPMenu!='' ){
echo ' onclick="opISubList()"';
echo ' oncontextmenu="opISubList()"';
}else{
if( !$_NOSELECTROW ){
echo ' onclick="SeleccionaLinea()"';
}
}
if( $_ORDEN_>0 ){
echo ' SortCol='.($_ORDEN_-1);
}
if( isset($_LISTMULTISELECT) ){
echo " onselectstart='return false;'";
}
echo " oncontextmenu='gsIMenu(\"\")' style='display:inline-table;cursor:var(--cPointer)' AltoTH='".((count($_THCOLSPAN)==0)?'0':'1')."'".$_SORTLISTCND.">";
}else{
for($n=$_SummaryType-1; $n<$_TGrupos && $_SummaryType!=-1; $n++){
$_SummaryData = false;
if( $n>=0 ) $_SummaryGroupLabel[$n] = 0;
$_SummaryGroupTotal[$n+1] = 0;
}
if( $_SummaryType!=-1 ){
?>
<SCRIPT type="text/javascript" name=eDes>
function _SummaryCSS( R ){
var Estilo = document.styleSheets, st,r,i, cssGR1, cssGR2, cssCelda, cssPieLista;
for(r=0; r<Estilo.length; r++){
if( Estilo[r].href.indexOf( '<?=SESS::$_PathCSS?>/lista.css' ) > -1 ){
for(i=0; i<Estilo[r].rules.length; i++){
st = Estilo[r].rules[i].selectorText;
if( st=='#GR1' ) cssGR1 = Estilo[r].rules[i].style;
if( st=='#GR2' ) cssGR2 = Estilo[r].rules[i].style;
if( st=='.Celda' ) cssCelda = Estilo[r].rules[i].style;
if( st=='.PieLista' ) cssPieLista = Estilo[r].rules[i].style;
}
}
}
switch( R ){
case 0: cssPieLista.backgroundColor = cssCelda.backgroundColor; cssPieLista.color = cssCelda.color; break;
case 1: cssGR1.backgroundColor = cssCelda.backgroundColor; cssGR1.color = cssCelda.color; break;
case 2: cssGR2.backgroundColor = cssCelda.backgroundColor; cssGR2.color = cssCelda.color; break;
}
}
_SummaryCSS(<?=$_SummaryType?>);
</SCRIPT>
<?PHP
}
if( $_pCol["action__"]==1 ) $_MultiSort = true;
echo '<table id="BROWSE" class="'.$cssBrowse.'" classBak="'.$cssBak.'" eOrder="'.$_xDBORDER.'" eOrderBak="'.$_xDBORDER.'"'.(isset($_GREENBARCOL)?" eMark":"").((!$_MultiSort)?" eMultiSort=0":"").' SeekCampos="'.$sSeek.'" FiltroTabla="'.(empty($_FILTER)?"":"*").'" onresize="WidthSubTitle()"'.$DefColsOp.' eCols='.($tColumnas-$_TGrupos+((count($_CHARTCOL)==0)?0:1)+((isset($_JSSELROWS))?1:0));
if( $_ISUBLIST==true && $_ISLOPMenu!='' ){
echo ' onclick="opISubList()"';
echo ' oncontextmenu="opISubList()"';
}else{
if( !$_NOSELECTROW ){
echo ' onclick="SeleccionaLinea()"';
}
}
foreach($_UPLOADFILE as $k=>$v) if( !preg_match('/\./u',$k) ){
echo " down_{$k}='{$v['oDIR']}' pre_{$k}='{$v['PREFIJO']}'";
}
for($n=0; $n<count($_Form); $n++) if( $_AltoImgHidden[$n]!="" ){
echo "height_{$_Form[$n][1]}='height:{$_AltoImgHidden[$n]}'";
}
if( $_ORDEN_!="" ){
echo " SortCol='{$_ORDEN_}'";
}
if( isset($_LISTMULTISELECT) ){
echo " onselectstart='return false;'";
}
if( $_NOTITLE==true ){
echo ' style="border:0px;display:inline-table"';
}else{
echo ' style="display:inline"';
}
echo ' AltoTH='.((count($_THCOLSPAN)==0)?'0':'1').$_SORTLISTCND.'>';
}
$_THRowAdd = count($_THCOLSPAN);
echo $__Enter;
echo '<colgroup>';
for($n=($_TGrupos-$_SummaryCol); $n<$NCampos; $n++){
$CursorType = '';
if( $_COLSCOLOR[$n]=='' ){
$CursorType = $_CURSORTYPE;
}
if( !empty($_EDITLIST[0]) ){
if( eSubstrCount($_EDITLIST[0], ",{$_SelectReal[$_Form[$n][1]]},")==1 || eSubstrCount($_EDITLIST[0], ",{$_Form[$n][1]},")==1 ){
if( !empty($_EDITLIST[2]) ){
$_COLSCOLOR[$n] = $_EDITLIST[2];
}else{
$_COLSCOLOR[$n] = 'class=EditList';
}
}
}
$align = "";
$_ALIGN[$n] = mb_strtolower($_ALIGN[$n]);
switch( $_ALIGN[$n] ){
case ' id=i':
$align = "text-align:left;{$CursorType}";
break;
case ' id=c':
$align = "text-align:center;{$CursorType}";
break;
case ' id=d':
$align = "text-align:right;{$CursorType}";
break;
case ' id=o':
$align = "display:none;";
break;
default:
if( $CursorType!='' ) $align = "{$CursorType}";
}
if( eSubstrCount($_Form[$n][6], '*')>0 || ($_SummaryType>0 && $n>=$_SummaryType && $n<$_TGrupos) ){
echo "<COL style='display:none;{$align}'";
if( mb_strtoupper($_Form[$n][3])=='C' ){
echo ' CheckON="'.$_ENV['ON']  .'"';
echo ' CheckOFF="'.$_ENV['OFF'].'"';
}
}else{
echo "<COL {$_COLSCOLOR[$n]}";
if( $_DimColumnas && $_COLSWIDTH[$n]>0 ){
echo " style='word-break:{$_WORDBREAK};width:".px($_COLSWIDTH[$n]).";{$align}'";
}else{
echo " style='white-space:nowrap;{$align}'";
}
if( mb_strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[$_Form[$n][1]] = true;
$_CheckBoxSave[1] = trim($_CheckBoxSave[1]);
if( $_LISTCHECKBOX['H']=="" ){
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]] = '<i class="ICONINPUT DEFAULT CHECKON">j</i>';
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]] = '<i class="ICONINPUT DEFAULT CHECKOFF OFF">i</i>';
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]] = "";
}else{
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]] = '<i class="ICONINPUT DEFAULT CHECKON">j</i>';
if( $_LISTCHECKBOX['H'][1]=="" ){
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]] = "";
}else{
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]] = '<i class="ICONINPUT DEFAULT CHECKOFF OFF">i</i>';
}
}
if( $_CheckBox['H']['OFF']=="-" ) $_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]] = '';
echo ' CheckON="' .str_replace('"', "'", $_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]]).'"';
echo ' CheckOFF="'.str_replace('"', "'", $_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[1]]).'"';
}
}
if( mb_strtoupper($_Form[$n][3])=='R' ){
echo ' DimRadio="';
foreach($_RADIO[$_Form[$n][1]] as $k=>$v) echo $k.'|'.$v.'|';
echo '"';
}
$cCampo = $_Form[$n][1];
if( eSubstrCount($cCampo,' ')>0 ){
if( eSubstrCount($cCampo,' as ')>0 ){
list(,$cCampo) = explode(' as ',$cCampo);
}else if( eSubstrCount($cCampo,',')==0 ){
list(,$cCampo) = explode(' ',$cCampo);
}
}
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3])==0 ){
echo ' CAMPO="'.str_replace('"',"'",$cCampo).'"';
}else{
echo ' CAMPO="*'.str_replace('"',"'",$cCampo).'"';
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo " oCAMPO='".str_replace("'","\\'",$_SelectReal[$_Form[$n][1]])."'";
if( $_SORTLIST==$_SelectReal[$_Form[$n][1]] ) $_SORTLISTNCOL = $n ;
}else{
echo " oCAMPO='".str_replace("'","\\'",$_Form[$n][1])."'";
if( $_SORTLIST==$_Form[$n][1] ) $_SORTLISTNCOL = $n ;
}
$ConDecimales = '';
if( eSubstrCount($_Form[$n][2], ',')>0 ){
list(,$nd) = explode(',', $_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}
echo " nc='".($n-$_TGrupos)."' td='".(($_Form[$n][3][0]=='S')?'N':$_Form[$n][2])."'{$ConDecimales} te='".(($_Form[$n][1]==$_SORTLIST)? "SORT" : $_Form[$n][3])."'";
echo " e-dflt=".$_VisibleDflt[$n-$_TGrupos];
if( ($_Form[$n][2]=="T" && SETUP::$System['Call3CXList']) || $GLOBALS["_3CX"][$_Form[$n][1]] ){
echo " e3CX=1";
}
if( $_SELECTMULTIPLE[$cCampo]<>"" ) echo " eSelMultiple=".$_SELECTMULTIPLE[$cCampo];
if( !empty($_EDITLIST[0]) ) echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
if( mb_strtoupper($_Form[$n][3])=='SS' ){
EditListSS($_Form[$n], $n);
}else if( $_Form[$n][3]=='S' ){
EditListSS($_Form[$n], $n);
}
if( count($_COLSOP)>0 ) echo " eColsOp='{$_COLSOP[$n]}'";
echo " id='RDCol{$n}'>";
}
if( $_JSSELROWS ) echo "<COL class='CUR-POINTER' style='text-align:center;' CAMPO='JsOnClick'>";
if( count($_ROWSOP)>0 ) echo '<COL style="text-align:center" oCAMPO="_TOTAL_" td="+">';
if( count($_CHARTCOL)>0 ){
if( $_COLSCOLOR[$NCampos]!='' ){
echo "<COL style='width:{$_CHARTCOL[1]}' ".$_COLSCOLOR[$NCampos].">";
}else{
echo "<COL style='width:{$_CHARTCOL[1]}'>";
}
}
if( isset($_LISTMULTISELECT) ) echo '<COL>';
if( $_EDITLIST[3]==2 ) echo '<COL>';
echo '</colgroup>';
if( count($_COLSOP)>0 && $_COLSOP[0]=="S" ){
echo '<thead class="report">';
}else{
echo '<thead>';
}
if( !empty($_ORDEN_) ){
$tmp = explode(',', $_ORDEN_);
for($n=0; $n<count($tmp); $n++){
list($nc, $or) = explode(' ',$tmp[$n]);
if( is_numeric($nc) ){
if( mb_strtoupper($or)=='DESC' ){
$OrdDESC[$_Form[$nc-1][1]] = 1;
}else{
$OrdASC[$_Form[$nc-1][1]] = 1;
}
}else{
$nc = trim($nc);
if( mb_strtoupper($or)=='DESC' ){
$OrdDESC[$nc] = 1;
if( $nc[0]=="*" ) $OrdDESC[mb_substr($nc, 1)] = 1;
else if( preg_match('/\./u', $nc) ) $OrdDESC[explode(".",$nc)[1]];
}else{
$OrdASC[$nc] = 1;
if( $nc[0]=="*" ) $OrdASC[mb_substr($nc, 1)] = 1;
else if( preg_match('/\./u', $nc) ) $OrdASC[explode(".",$nc)[1]];
}
}
}
}
$dimTipoSort = array("+"=>"N", "+,"=>"N", "-"=>"N", "-,"=>"N", "F4"=>"D", "P4"=>"P");
if( count($_THCOLSPAN)>0 ){
$_THCOLSPANDEF = array();
$snc = -1;
$nd2 = -1;
echo $__Enter.'<tr>';
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
$dimRS = array();
if( $THCol[$n][2]==3 ){
$rs = ' rowspan=2';
if( ($n+1)==$NCampos && count($_CHARTCOL)>0 && $_CHARTCOL[1]>0 ) $rs.= ' colspan=2';
$_DimTHText[1][$n] = trim($_Form[$n][0]);
}else if( $THCol[$n][2]==2 ){
$snc++;
$nd2++;
if( $n+$THCol[$n][1]==$NCampos && count($_CHARTCOL)>0 && $_CHARTCOL[2]=='' && count($_ROWSOP)==0 ) $THCol[$n][1]++;
echo '<th style="text-align:center;cursor:var(--cAuto);display:table-cell;';
if( $_GRID[0][0]==$_Form[$n][1] ){
if( 	 $OrdASC[$_Form[$n][1]] ==1 ) echo 'text-Decoration:underline;';
else if( $OrdDESC[$_Form[$n][1]]==1 ) echo 'text-Decoration:overline;';
}
echo '" colspan='.$THCol[$n][1];
echo " cv='{$_ColViewDefault[$n]}'";
if( $_TIPTHTOP[$nd2]!="" ){
echo " onmouseenter=S(this).tip('#_TIP_HT_".$nd2."',-2)";
}
echo " thcs={$n}>{$THCol[$n][0]}";
$_THCOLSPANDEF[] = array($THCol[$n][1], $THCol[$n][0]);
for($i=$snc; $i<$snc+$THCol[$n][1]; $i++) $THColPuntero[$i] = $snc;
for($i=$n; $i<$n+$THCol[$n][1]; $i++) $_DimTHText[1][$i] = trim($THCol[$n][0]);
continue;
}
$_Form[$n][2] = trim($_Form[$n][2]);
if( $THCol[$n][2]==0 ){
continue;
}
$snc++;
eExplodeLast(" ".$_Form[$n][1], " ", $txt1, $NmField);
if( eSubstrCount($_Form[$n][6], '*')>0 ){
echo "<th CAMPO='{$NmField}'";
$dimRS[] = 'display:none';
$dimRS[] = $_AlignTH[$n];
echo " style='".implode(";",$dimRS)."'";
echo "{$rs} nc=".($n-$_TGrupos);
echo " e-dflt=".$_VisibleDflt[$n-$_TGrupos];
$iconTLF = "";
if( ($_Form[$n][2]=="T" && SETUP::$System['Call3CXList']) || $GLOBALS["_3CX"][$_Form[$n][1]] ){
echo " e3CX=1";
$iconTLF = "<i a=1 class='ICONINPUT' style='margin-left:5px;vertical-align:text-top;'>&#308</i>";
}
echo " oCAMPO='".$_Form[$n][1]."'";
$ConDecimales = '';
if( eSubstrCount($_Form[$n][2], ',')>0 ){
list(,$nd) = explode(',', $_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}
echo $_RD;
echo " td='".$_Form[$n][2]."'{$ConDecimales}>";
echo $_Form[$n][0];
$_THCOLSPANDEF[] = array(1,'');
}else{
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3])==0 ){
echo "<th CAMPO='".str_replace("'","\\'",$NmField)."'";
}else{
echo "<th CAMPO='*".str_replace("'","\\'",$NmField)."'";
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo " oCAMPO='".str_replace("'","\\'",$_SelectReal[$_Form[$n][1]])."'";
}else{
echo " oCAMPO='*".str_replace("'","\\'",$_Form[$n][1])."'";
}
$dimRS[] = 'display:'.(($_ALIGN[$n]==' id=o')? 'none':'table-cell');
if( 	 $OrdASC[$_Form[$n][1]] ==1 ) $dimRS[] = 'text-Decoration:underline';
else if( $OrdDESC[$_Form[$n][1]]==1 ) $dimRS[] = 'text-Decoration:overline';
$dimRS[] = $_AlignTH[$n];
echo " style='".implode(";", $dimRS)."'";
$ConDecimales = '';
if( eSubstrCount($_Form[$n][2], ',')>0 ){
list(,$nd) = explode(',', $_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}
if( !empty($_EDITLIST[0]) ){
echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
}
if( $_TIPTH[$n]!='' ){
echo " onmouseenter=S(this).tip('#_TIP_H_".$n."',-2)";
}
if( !(!empty($_EDITLIST[0]) && (eSubstrCount($_EDITLIST[0], ",{$_SelectReal[$_Form[$n][1]]},")==1 || eSubstrCount($_EDITLIST[0], ",{$_Form[$n][1]},")==1 )) ){
if( $_SLIDECOL-1<($n-$_TGrupos) ) echo $_RD;
}
if( $_TGrupos==0 ){
if( !($_ISUBLIST==true && ($_ISUBLISTMODE=='a' || $_ISUBLISTMODE=='mR')) ){
echo ' oncontextmenu=_MenuTH(this) class="CUR-CONTEXT"';
}else if( $_ISUBLIST==true && ($_ISUBLISTMODE=='cR' || $_ISUBLISTMODE=='bR') ){
echo ' oncontextmenu=_MenuTH(this) class="CUR-CONTEXT"';
}
}
echo "{$rs}";
echo " nc=".($n-$_TGrupos)." td='".(($_Form[$n][3][0]=='S')?'N':$_Form[$n][2])."'{$ConDecimales} te='".$_Form[$n][3]."' ts='".$dimTipoSort[$_Form[$n][2]]."'";
echo " e-dflt=".$_VisibleDflt[$n-$_TGrupos];
$iconTLF = "";
if( ($_Form[$n][2]=="T" && SETUP::$System['Call3CXList']) || $GLOBALS["_3CX"][$_Form[$n][1]] ){
echo " e3CX=1";
$iconTLF = "<i a=2 class='ICONINPUT' style='margin-left:5px;vertical-align:text-top;'>&#308</i>";
}
if( $_SELECTMULTIPLE[$NmField]<>"" ) echo " eSelMultiple=".$_SELECTMULTIPLE[$NmField];
echo " cv='{$_ColViewDefault[$n]}'";
if( empty($_Form[$n][0]) ){
echo '>';
$_THCOLSPANDEF[] = array(1,'');
}else{
echo ">{$_Form[$n][0]}{$iconTLF}";
$_THCOLSPANDEF[] = array(1, $_Form[$n][0]);
if( $_ConChartSWF ) $_DimChartSWF[0][] = $_Form[$n][0];
}
}
$_TH_td[$n] = $_Form[$n][2];
}
if( $_JSSELROWS ){
echo "<TH rowspan=2 td='ICON' te='ICON' nc='{$NCampos}' campo='_JSSELROWS_' title='Columna de Selección'><i class='ICONINPUT ICONSEEK CHECKON' style='font-size:50%'>j</i>";
}
if( $_ISUBLIST==true && count($_THCOLSPAN)>0 && $_ISLOPTH!='' ){
echo '<TH rowspan=2 style="white-space:nowrap;display:table-cell">'.$_ISLOPTH;
if( $ConPaginacion || $_REG_!='' ){
$ver = ($_ISUBLISTTOOLS=="E") ? " style='visibility:hidden'":"";
}else{
$ver = " style='visibility:hidden'";
}
echo '<i id=islPageUp class="ICONINPUT OFF" onclick=\'Paginar("<")\' title="Página anterior"'.$ver.'>&#178;</i>';
echo '<i id=islPageDown class="ICONINPUT" onclick=\'Paginar(">")\' title="Siguiente página"'.$ver.'>&#179;</i>';
}
if( count($_ROWSOP)>0 ){
$tmp = $_ROWSOP[count($_ROWSOP)-1];
if( mb_strlen($tmp)<2 ) $tmp = 'Total';
if( $_CHARTCOL[2]!='' ) $tmp = $_CHARTCOL[2];
list(,$nd) = explode(',',$_FORMAT[$NCampos]);
echo '<th rowspan=2 style="display:table-cell;text-align:center;'.((count($_CHARTCOL)>0)?';text-align:center':'').'"'.((count($_ROWSOP)==0)?'':' colspan=2').' oCAMPO="_TOTAL_" CAMPO="_TOTAL_" td="+'.(($nd>0)?',':'').'" te="T" DCM="'.$nd.'" NC='.$NCampos.'>'.$tmp;
}else if( count($_CHARTCOL)>0 && $_CHARTCOL[2]!='' ){
echo '<TH rowspan=2 colspan=2 oCAMPO="" CAMPO="" td="+," NC='.$_CHARTCOL[0].' te=G style="text-align:center;display:table-cell;">'.$_CHARTCOL[2];
}
if( isset($_LISTMULTISELECT) ){
echo '<th rowspan=2 style="display:table-cell;text-align:center" colspan=2 oCAMPO="_LISTMULTISELECT_" CAMPO="_LISTMULTISELECT_" td="ICON"" te="ICON" NC="'.($NCampos).'" oncontextmenu="return S.eventClear(window);" title="Columna de Selección"><i class="ICONINPUT ICONSEEK CHECKON" style="font-size:50%">j</i>';
}
if( $_EDITLIST[3]==2 ){
echo '<th rowspan=2 style="display:table-cell;text-align:center" onclick="elRowNew()"><i class="ICONINPUT ICONSEEK" style="font-size:50%">I</i>';
}
}else{
for($n=0; $n<$NCampos; $n++) $THCol[$n][2] = 1;
}
if( $_TReg<2 ) $_CHARTCOL = array();
$i=0;
for($n=0; $n<count($_COLSOP); $n++) if( $_COLSOP[$n]=='+' ) $i++;
if( $i<2 ) $_CHARTROW = array();
echo $__Enter.'<tr>';
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
$_Form[$n][4] = eNsp($_Form[$n][4]);
$_DimTHText[0][$n] = trim($_Form[$n][0]);
$_Form[$n][2] = trim($_Form[$n][2]);
if( $THCol[$n][2]==3 ) continue;
$cCampo = str_replace('"', "'", $_Form[$n][1]);
eExplodeLast(" ".$cCampo, " ", $txt1, $NmField);
if( eSubstrCount($_Form[$n][6], '*')>0 ){
echo "<th CAMPO='{$NmField}' nc=".($n-$_TGrupos);
echo " te='".$_Form[$n][3]."'";
echo " e-dflt=".$_VisibleDflt[$n-$_TGrupos];
$iconTLF = "";
if( ($_Form[$n][2]=="T" && SETUP::$System['Call3CXList']) || $GLOBALS["_3CX"][$_Form[$n][1]] ){
echo " e3CX=1";
$iconTLF = "<i a=3 class='ICONINPUT' style='margin-left:5px;vertical-align:text-top;'>&#308</i>";
}
echo " oCAMPO='".$_Form[$n][1]."'";
$ConDecimales = '';
if( eSubstrCount($_Form[$n][2], ',')>0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}
echo " td='".$_Form[$n][2]."'{$ConDecimales}";
echo " cv='{$_ColViewDefault[$n]}'";
echo $_RD;
echo ' style="display:none">';
echo $_Form[$n][0];
}else{
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3])==0 ){
echo '<th CAMPO="'.$NmField.'"';
}else{
echo '<th CAMPO="*'.$NmField.'"';
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo ' oCAMPO="'.$_SelectReal[$_Form[$n][1]].'"';
}else{
echo ' oCAMPO="'.$_Form[$n][1].'"';
}
$ConDecimales = '';
if( eSubstrCount($_Form[$n][2], ',')>0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}else if( preg_match('/^(F4|P4|CDI)$/iu', $_Form[$n][2]) ){
}
echo " nc=".($n-$_TGrupos)." td='".(($_Form[$n][3][0]=='S')?'N':$_Form[$n][2])."'{$ConDecimales} te='".$_Form[$n][3]."' ts='".$dimTipoSort[$_Form[$n][2]]."'";
echo " e-dflt=".$_VisibleDflt[$n-$_TGrupos];
$iconTLF = "";
if( ($_Form[$n][2]=="T" && SETUP::$System['Call3CXList']) || $GLOBALS["_3CX"][$_Form[$n][1]] ){
echo " e3CX=1";
$iconTLF = "<i a=4 class='ICONINPUT' style='margin-left:5px;vertical-align:text-top;'>&#308</i>";
}
if( $_SELECTMULTIPLE[$NmField]!="" ){
echo " eSelMultiple=".$_SELECTMULTIPLE[$NmField];
}
if( !empty($_EDITLIST[0]) ){
echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
}
if( $_Form[$n][3]=='Ss' ){
EditListSS( $_Form[$n], $n );
}else if( $_Form[$n][3]=='S' ){
EditListSS( $_Form[$n], $n );
}
if( $_TIPTH[$n]!="" ){
echo " onmouseenter=S(this).tip('#_TIP_H_".$n."',-2)";
}
echo ' style="'.$_AlignTH[$n].'display:table-cell;';
if( $_GRID[0][0]!=$_Form[$n][1] ){
eExplodeLast($_Form[$n][1], " ", $izq, $dch);
if( 	 $OrdASC[$_Form[$n][1]] ==1 || (!empty($dch) && $OrdASC[$dch] ==1) ) echo 'text-decoration:underline;';
else if( $OrdDESC[$_Form[$n][1]]==1 || (!empty($dch) && $OrdDESC[$dch]==1) ) echo 'text-decoration:overline;';
}
if( $_ALIGN[$n]==' id=o' ) echo 'display:none;';
if( $_COLSWIDTH[$n]>0 && !$_ColsTrim ){
echo "width:".px($_COLSWIDTH[$n]);
}
echo '"';
if( $n==$NCampos-1 ){
if( count($_CHARTCOL)>0 && $_CHARTCOL[2]=='' && count($_ROWSOP)==0 ) echo ' colspan=2';
}
echo ' pCS="'.$THColPuntero[$n].'"';
if( !(!empty($_EDITLIST[0]) && (eSubstrCount($_EDITLIST[0], ",{$_SelectReal[$_Form[$n][1]]},")==1 || eSubstrCount($_EDITLIST[0], ",{$_Form[$n][1]},")==1)) ){
if( $_SLIDECOL-1<($n-$_TGrupos) ) echo $_RD;
}
if( $_TGrupos==0 ){
if( !($_ISUBLIST==true && ($_ISUBLISTMODE=='a' || $_ISUBLISTMODE=='mR')) ){
echo ' pk=1 oncontextmenu=_MenuTH(this) class="CUR-CONTEXT"';
}else if( $_ISUBLIST==true && ($_ISUBLISTMODE=='cR' || $_ISUBLISTMODE=='bR') ){
echo ' pk=2 oncontextmenu=_MenuTH(this) class="CUR-CONTEXT"';
}
}
echo " cv='{$_ColViewDefault[$n]}'";
if( empty($_Form[$n][0]) ){
echo '>';
}else{
if( $_DimColumnas && $_COLSWIDTH[$n]>0 && count($_THCOLSPAN)>0 ){
echo "><span style='width:".px($_COLSWIDTH[$n])."'>{$_Form[$n][0]}{$iconTLF}</span>";
}else{
echo ">{$_Form[$n][0]}{$iconTLF}";
}
if( $_ConChartSWF ) $_DimChartSWF[0][] = $_Form[$n][0];
}
}
$_TH_td[$n] = $_Form[$n][2];
}
if( $_ISUBLIST==true && count($_THCOLSPAN)==0 && $_ISLOPTH!='' ){
echo '<TH style="white-space:nowrap">'.$_ISLOPTH;
if( $ConPaginacion || $_REG_!='' ){
$ver = ($_ISUBLISTTOOLS=="E") ? " style='visibility:hidden'":"";
}else{
$ver = " style='visibility:hidden'";
}
echo '<i id=islPageUp class="ICONINPUT OFF" onclick=\'Paginar("<")\' title="Página anterior"'.$ver.'>&#178;</i>';
echo '<i id=islPageDown class="ICONINPUT" onclick=\'Paginar(">")\' title="Siguiente página"'.$ver.'>&#179;</i>';
}
if( $_JSSELROWS && count($_THCOLSPAN)==0 ){
echo "<TH td='ICON' te='ICON' nc='{$NCampos}' campo='_JSSELROWS_' title='Columna de Selección'><i class='ICONINPUT ICONSEEK CHECKON' style='font-size:50%'>j</i>";
}
if( count($_ROWSOP)>0 && count($_THCOLSPAN)==0 ){
$tmp = $_ROWSOP[count($_ROWSOP)-1];
if( mb_strlen($tmp)<2 ) $tmp = 'Total';
if( $_CHARTCOL[2]!='' ) $tmp = $_CHARTCOL[2];
list(,$nd) = explode(',',$_FORMAT[$NCampos]);
echo '<th style="text-align:center"'.((count($_ROWSOP)==0)?'':' colspan=2').' oCAMPO="_TOTAL_" CAMPO="_TOTAL_" td="+'.(($nd>0)?',':'').'" te="T" DCM="'.$nd.'" NC='.$NCampos.'>'.$tmp;
}else if( count($_THCOLSPAN)==0 && count($_CHARTCOL)>0 && $_CHARTCOL[2]!='' ){
echo '<TH style="text-align:center;display:table-cell;" CAMPO="" td="+," NC='.$_CHARTCOL[0].' te=G>'.$_CHARTCOL[2];
}
if( isset($_LISTMULTISELECT) && count($_THCOLSPAN)==0 ){
echo '<th style="display:table-cell;text-align:center" colspan=2 oCAMPO="_LISTMULTISELECT_" CAMPO="_LISTMULTISELECT_" td="ICON"" te="ICON" NC="'.($NCampos).'" oncontextmenu="return S.eventClear(window);" title="Columna de Selección"><i class="ICONINPUT ICONSEEK CHECKON" style="font-size:50%">j</i>';
}
if( $_EDITLIST[3]==2 && count($_THCOLSPAN)==0 ){
echo '<th style="display:table-cell;text-align:center" onclick="elRowNew()"><i class="ICONINPUT ICONSEEK" style="font-size:50%">I</i>';
}
echo '</thead>';
echo '<tbody>';
$ntReg = 0;
$nRegShow = 0;
$Pintar = true;
if( isset($_GET['_ISLBlankRecords'])&& !$_InfSinTotales && $_SummaryTotal && count($_COLSOP)>0 && (( !isset($_REG_) || ( isset($_REG_) && (ceil($_REG_/$_RowsOnPage)+1)==ceil($TotalReg/$_RowsOnPage) ) ) || ($EmptyList && $TotalReg==0) ) ){
$_GET['_ISLBlankRecords']--;
}
if( isset($_REG_) ){
$_REG_ = str_replace(
array('&#60;', '&#62;', '%3E'),
array(  '<'  ,   '>'  ,  '>' ),
$_REG_
);
$_TIPO_ = mb_substr($_REG_,0,1);
$_ACCION_ = mb_substr($_REG_,1,1);
$_REG_ = (int)mb_substr($_REG_,2);
$_REG_ = (int)$_REG_;
$_RowsOnPage = (int)$_RowsOnPage;
if( $_TIPO_=='P' ){
$_REG_ = ($_REG_+0)*$_RowsOnPage;
}else{
$__Lng[13] = $__Lng[14];
$__Lng[11] = $__Lng[12];
$__Lng[15] = $__Lng[16];
}
switch( $_ACCION_ ){
case 'I':
$_REG_ = 0;
break;
case '<':
$_REG_ -= $_RowsOnPage;
if( $_REG_<0 ){
$_REG_ = $_RowsOnPage;
}else if( $_REG_>$TotalReg ) $_REG_ = $TotalReg-$_RowsOnPage;
break;
case '>':
$_REG_ += $_RowsOnPage;
if( $_REG_>=$TotalReg ){
if( $_TIPO_=='R' ){
$_REG_ = $TotalReg-$_RowsOnPage;
}else{
$_REG_ = (ceil($TotalReg/$_RowsOnPage)-1)*$_RowsOnPage;
}
}
break;
case 'F':
if( $_TIPO_=='R' ){
$_REG_ = $TotalReg-$_RowsOnPage;
}else{
$_REG_ = (ceil($TotalReg/$_RowsOnPage)-1)*$_RowsOnPage;
}
break;
default:
}
}else{
$_TIPO_='P';
$_REG_ = 0;
}
if( $_REG_<0 ) $_REG_ = 0;
$_RowsOnPage = (int)$_RowsOnPage;
if( $_RowsOnPage==0 ) $_RowsOnPage = 1;
$TotalReg = (int)$TotalReg;
if( $_TIPO_=='R' ){
$DesdeList = $_REG_+1;
$HastaList = $TotalReg;
}else{
$DesdeList = floor($_REG_/$_RowsOnPage)+1;
if( $DesdeList<1 ) $DesdeList = 1;
if( $_ACCION_=='?' && ((($DesdeList-1)*$_RowsOnPage)+1)>$TotalReg ){
$DesdeList = 1;
$_REG_ = 0;
}
$HastaList = ceil($TotalReg/$_RowsOnPage);
}
if( $_REG_>0 ) $Pintar = false;
$LenINPUT = (int)mb_strlen($TotalReg.'');
$SeVe = (($TotalReg<=$_RowsOnPage || $TotalReg==0) ? 'id=o' : '');
$_ChartMin = $_ChartMax = null;
if( count($_CHARTCOL)>0 && empty($_CHARTCOL[0]) ){
$_CHARTCOL[0] = $NCampos+((count($_ROWSOP)>0) ? 0 : -1);
}
if( isset($_CHARTROW) && count($_CHARTROW)>0 ){
if( gettype($_CHARTROW[0])<>'array' ){
$tmp = explode(',',$_CHARTROW[0]);
$_CHARTROW[0] = array();
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]=='*' || $tmp[$n]=='' ){
for( $i=$n; $i<$NCampos; $i++ ) $_CHARTROW[0][$i] = true;
break;
}else{
$_CHARTROW[0][abs($tmp[$n])] = ( $tmp[$n][0]<>'-' );
}
}
}
}
$NumField = array();
for($n=0; $n<$NCampos; $n++){
$NumField[$_Form[$n][1]] = $n;
if( !isset($_OpCol[$n]) ) $_OpCol[$n] = 0;
}
if( !empty($_PrimerosReg) && $_PrimerosReg<0 ){
$MaxReg = (int)$_PrimerosReg*-1;
}
$sMaxReg = $MaxReg;
$TROcultar = "";
if( (SETUP::$System['ContextActivate'] || isset($_CALLSRVROW)) && $_PosSerial>-1 && $_VISIBLE_ROWS_=="" ){
$NomCampoPK = $_Form[$_PosSerial][_FIELD];
$_SerialFile = "../_tmp/php/".S::$_User."_".eContextPK().".srl.{$NomCampoPK}";
@unlink($_SerialFile);
$_SerialFileTxt = $_Form[$_PosSerial][_FIELD]."\n";
}
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==3 ) $_LOGANSWER["fields"] = $_pCol;
$_with_eVD = false;
if( $TotalReg==0 ){
if( $_EDITLIST[3]==2 && $_TReg==0 && $_SubMode=="ml" ){
echo '<tr>';
for($n=0; $n<$NCampos; $n++) echo '<td>&nbsp;';
echo '<TD onclick="elRowKill()">D</TD>';
}
}else if( !empty($_BrowseInTemporary) ){
$tc = count($_Form);
$File = fopen($_BrowseInTemporary.'.dat', 'r');
for($ntReg=0; $ntReg<$TotalReg; $ntReg++){
if( $Pintar ){
$nRegShow++;
$tmp = explode("|", rtrim(fgets($File)));
echo '<tr>';
for($n=0; $n<$tc; $n++){
echo '<td>'.$tmp[$n];
}
$MaxReg--;
if( $MaxReg<1 ){
break;
}
}else{
fgets($File);
if( $ntReg==$_REG_ && $_REG_>0 ) $Pintar = true;
}
}
fclose($File);
}else if( !isset($usuCursor) ){
if( isset($_GRAPH) ) $usuCursor = array();
while( $row=qRow() ){
$_vF = &$row;
if( $Pintar ){
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==3 ) $_LOGANSWER["list"][] = $row;
}
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( isset($_LISTMULTISELECT) ) $_vF[$NCampos] = "";
if( $_CHANGEFILTERMEMORY ){
$TROcultar = "";
}
if( isset($_DBREADROW) ) if( !call_user_func($_DBREADROW, $_vF) ) continue;
if( isset($_GRAPH) ) $usuCursor[$ntReg] = array();
$ntReg++;
$_OpLin = 0;
$_RowStyle = $_RowClass = $_RowAdd = '';
$_RowDisabled = false;
$_PDFRowShadow = false;
if( !empty($_FORMATPHP) ){
foreach($_pCol as $k=>$v){
$_CellsStyle[$v] = $_CellsClass[$v] = $_CellsAdd[$v] = '';
$_CellsStyle[$k] = &$_CellsStyle[$v];
$_CellsClass[$k] = &$_CellsClass[$v];
$_CellsAdd[$k] = &$_CellsAdd[$v];
}
_ExeFormato($row, $_CellsStyle, $_CellsClass, $ntReg+$_THRowAdd, $_RowStyle, $_RowClass, $_RowDisabled, $_RowAdd, $_CellsAdd, $_PDFColor, $_PDFBackgroundColor, $_PDFLineRows, $_PDFRowShadow, $_pCol, $_pF);
for($n=0; $n<$NCampos; $n++){
$row[$n] = str_replace(" onclick=", " pp=1 onclick=", $row[$n]);
}
}
if( $Pintar ){
if( (SETUP::$System['ContextActivate'] || isset($_CALLSRVROW)) && $_PosSerial>-1 && $_VISIBLE_ROWS_=="" ){
$_SerialFileTxt .= $row[$_PosSerial]."\n";
}
$nRegShow++;
if( $_RowStyle!='' ) $_RowStyle = ' style="'.$_RowStyle.'"';
if( $_RowClass!='' ) $_RowClass = ' class="'.$_RowClass.'"';
if( $_RowDisabled ) $_RowDisabled = ' disabled=true';
echo $__Enter;
if( $_GREENBAR ){
echo "<tr{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else{
if( $_HayROWCOLOR ){
if( $_ROWCOLOR[1]=='' ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return ('.$_ROWCOLOR[0].');');
$txt = @eval('return ('.$_ROWCOLOR[0].');');
echo "<tr {$txt}{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else if( @eval( 'return ('.$_ROWCOLOR[0].');' ) ){
echo "<tr {$_ROWCOLOR[1]}{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}
}else{
if( isset($_GREENBARCOL) ){
if( $_vF[$_GREENBARCOL]!=$_GREENBARLAST ){
$greenGrp = ($greenGrp=="")?" eMark":"";
$_GREENBARLAST = $_vF[$_GREENBARCOL];
}
}
echo "<tr{$greenGrp}{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}
}
if( $_RowAdd!="" ) echo " ".$_RowAdd;
echo ">";
}
for($n=0; $n<$NCampos; $n++){
$Celda = trim($row[$n]);
$StyleTDAddOption = '';
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$StyleTDAddOption = $_SelVirtualStyle[$_Form[$n][1]][$Celda];
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][3]=='H' ){
$Celda = eHtmlToList($Celda);
}else if( $_Form[$n][3]=='A' ){
$Celda = eTextToList($Celda);
}else if( $_Form[$n][2]=='o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[$_Form[$n][1]]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][trim($tmp[$i])];
}
}
}else if( isset($_RADIOLIST[$_Form[$n][1]]) ){
if( $_RADIOLIST[$_Form[$n][1]][2]!='' ){
if( $_RADIOLIST[$_Form[$n][1]][2]=='' ){
}else if( $_RADIOLIST[$_Form[$n][1]][2]=='TEXT' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else if( $_RADIOLIST[$_Form[$n][1]][2]=='ALL' ){
$Celda .= 'ÃÂ·'.$_SelVirtual[$_Form[$n][1]][$Celda];
}
}
}else if( isset($_SelVirtualCol[$_Form[$n][1]]) ){
$Celda = $_SelVirtualCol[$_Form[$n][1]][$Celda][ eval($_SelVirtualExel[$_Form[$n][1]]) ];
}
}
}else if( $_SELECTMULTIPLE[$_Form[$n][1]]>0 && $Celda!='' ){
if( $_SelVirtualType[$_Form[$n][1]]!='T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for($i=1; $i<count($tmp)-1; $i++){
if( $i>1 ) $Celda .= '<br>';
$Celda .= $_SelVirtual[$_Form[$n][1]][trim($tmp[$i])];
}
}else $Celda = mb_substr($Celda,1,-1);
}
$Celda = trim($Celda);
if( $_HayRadio ){
if( isset($_RADIO[$_Form[$n][1]]) && count($_RADIO[$_Form[$n][1]])>0 ) $Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
if( isset($_GRAPH) ) $usuCursor[$ntReg-1][] = $Celda;
if( $Pintar ){
if( $_COLSNOREPEAT[$n] ){
if( $_COLSBAK[$n]===$Celda ){
if( !$_COLSNOREPEATFILL ) $Celda = '';
if( $_COLSNOREPEATCLASS<>"" ){
if( $_CellsClass[$n]<>"" ) $_CellsClass[$n] = $_CellsClass[$n]." ".$_COLSNOREPEATCLASS;
else $_CellsClass[$n] = $_COLSNOREPEATCLASS;
}
}else{
$_COLSBAK[$n] = $Celda;
for($i=$n+1; $i<count($_COLSNOREPEAT); $i++) if( $_COLSNOREPEAT[$i] ) $_COLSBAK[$i] = null;
}
}
if( $_EditListSql[$_SelectReal[$_Form[$n][1]]]!='' ){
echo '<td v="'.trim($row[$_EditListSql[$_SelectReal[$_Form[$n][1]]]]).'"';
}else{
echo '<td';
}
if( !empty($_CellsStyle[$n]) && strpos($_CellsStyle[$n], ":")===false ){
$Celda = eShell($_CellsStyle[$n], $Celda);
$_CellsStyle[$n] = "";
}
$xStyle = "";
if( $_CellsStyle[$n]!="" ) $xStyle .= $_CellsStyle[$n].";";
if( $_ColsColorInf[$n]!="" ) $xStyle .= $_ColsColorInf[$n].";";
if( $StyleTDAddOption!="" ) $xStyle .= $StyleTDAddOption.";";
if( $xStyle!="" ) echo " style='{$xStyle}'";
if( $_ColorNumeric[$n] && preg_match('/^(\+|\-)/u', $_Form[$n][2]) ){
if( $Celda>0 && preg_match('/\+/u', $_ColorNumeric[$n]) ) $_CellsClass[$n] = "numPositive";
else if( $Celda<0 && preg_match('/\-/u', $_ColorNumeric[$n]) ) $_CellsClass[$n] = "numNegative";
else $_CellsClass[$n] = "";
}
if( $_CellsClass[$n]!='' ){
echo ' class="'.$_CellsClass[$n].'"';
}else if( $_ColsClass[$n]!='' ){
echo ' class="'.$_ColsClass[$n].'"';
}
if( $_CellsAdd[$n]!="" ) echo " ".$_CellsAdd[$n];
echo '>';
$dato = "";
if( eSubstrCount($_Form[$n][6], '*')>0 ){
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
}else{
if( $_FORMAT[$n]=='IMG' && $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$NomFile = _NmFileConPrefijo($row[$_PosSerial].'.'.$ext, $_UPLOADFILE[$xCampo]['PREFIJO']);
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$ext;
$NomFile = _NmFileConPrefijo($Celda, $_UPLOADFILE[$xCampo]['PREFIJO']);
}
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( eSubstrCount($sNomFile, "/http/")==0 ){
$sNomFile = "edes.php?R:{$sNomFile}&_SESS_={$_GET['_SESS_']}";
}else{
$sNomFile = mb_substr($sNomFile,6);
}
echo "<img src='{$sNomFile}' style='height:{$_AltoImgHidden[$n]}' pk=1>";
}else{
echo $Celda;
}
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='#' && !isZero($Celda) ) $_OpCol[$n]++;
if( $_COLSOP[$n]=='C' ) $_OpCol[$n]++;
}
}else if( preg_match('/^(P4|F4|CDI|T)$/u', $_Form[$n][2]) ){
$dato = eDataFormat($Celda, $_Form[$n][2], "u");
$_vF[$n] = $dato;
echo $dato;
}else{
if( $_Form[$n][3]=='CHAR' ){
if( $Celda=='' ){
}else if( $_Form[$n][4]>1 ){
$dim = explode(",", $Celda);
for($i=0; $i<count($dim); $i++){
echo "<i class='OP'>".$dim[$i]."</i>";
}
}else{
echo $Celda;
}
}else if( empty($_FORMAT[$n]) ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
echo $Celda;
$_vF[$n] = $Celda;
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( eSubstrCount($_FORMAT[$n],'@')>0 ){
if( mb_strrpos($Celda,'.')!==false ){
$Celda = mb_substr($Celda, mb_strrpos($Celda,'.')+1);
}else{
$Celda = '';
}
$Formato = 'echo '.str_replace('@', $Celda, $_FORMAT[$n]).';';
if( $Celda=='' ) $Formato = 'echo "";';
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = '';
}else if( $_FORMAT[$n]=='ICON' ){
if( $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$pk = $row[$_PosSerial].'.'.$ext;
}else{
$pk = $Celda;
}
$CampoNomFile = "";
if( mb_substr($GLOBALS["_DBTABLE"],0,11)=="gs_log_doc " ){
$_UPLOADFILE[$_Form[$n][12]]['oDIR'] = SETUP::$LogHistory['LogPathFileVersion'];
$pk = $row[0].'.'.$ext;
$CampoNomFile = "nm_file";
}
if( $_UPLOADFILE[$_Form[$n][12]]['oDIR']!="" ){
$NomFile = _NmFileConPrefijo($pk, $_UPLOADFILE[$xCampo]['PREFIJO']);
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
if( !$_with_eVD ){
eExplodeLast($NomFile, "/", $iz, $dr);
$_with_eVD_json = array("_SERIAL_"=>$_DBSERIAL[1], "_DIR_"=>"{$iz}/", "_FIELD_"=>$xCampo, "_NAME_FIELD_"=>$CampoNomFile);
}
}else{
$b64 = base64_encode($_UPLOADFILE[$_Form[$n][12]]['NOMBRE'].','.$GLOBALS['_DBTABLE'].','.$GLOBALS['_DBINDEX'].','.$row[$_PosIndex].','.$ext.','.$Celda);
$b64 = mb_substr($b64,0,10).mb_substr(md5(time()),0,10).mb_substr($b64,10);
$NomFile = '!'.$b64;
}
$_with_eVD = true;
$dato = eIconShow($ext, "onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='{$__Lng[81]}'");
echo $dato;
$_vF[$n] = $dato;
}
$Formato = '';
}else if( $_FORMAT[$n]=='IMG' ){
if( $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$NomFile = _NmFileConPrefijo($row[$_PosSerial].'.'.$ext, $_UPLOADFILE[$xCampo]['PREFIJO']);
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$ext;
$NomFile = _NmFileConPrefijo($Celda, $_UPLOADFILE[$xCampo]['PREFIJO']);
}
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( !$_with_eVD ){
eExplodeLast($NomFile, "/", $iz, $dr);
$_with_eVD_json = array("_SERIAL_"=>$_DBSERIAL[1], "_DIR_"=>"{$iz}/", "_FIELD_"=>$xCampo, "_NAME_FIELD_"=>$CampoNomFile);
}
if( eSubstrCount($sNomFile, "/http/")==0 ){
if( file_exists(eScript($sNomFile)) ){
$sNomFile = "edes.php?R:{$sNomFile}&_SESS_={$_GET['_SESS_']}";
}else{
$sNomFile = '';
}
}else{
$sNomFile = mb_substr($sNomFile, 6);
if( !file_exists($sNomFile) ){
$sNomFile = '';
}
}
if( $_Form[$n][20]!="" ) echo "<span>";
if( $sNomFile!="" ){
$_with_eVD = true;
echo "<img src='{$sNomFile}' onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='{$__Lng[81]}' pk=2>";
}
if( $_Form[$n][20]!="" ) echo "</span>";
}
$Formato = '';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
if( preg_match('/^eNumberFormat\(/u', $_FORMAT[$n]) ){
if( is_numeric($Celda) ){
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}else{
$Formato = 'echo $Celda;';
}
}else{
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}
}
}else{
if( $Celda=="" ) $Celda = 0;
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func(mb_substr($Formato,5,-3), $n, $Celda);
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
$dato = "";
@eval(str_replace(array("eNumberFormat(,", "echo "), array("eNumberFormat(0,", '$dato = '), $Formato));
echo $dato;
}
}
}
}
}
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ) $_OpCol[$n] += (float)$Celda;
if( $_COLSOP[$n]=='#' && !isZero($Celda) ) $_OpCol[$n]++;
if( $_COLSOP[$n]=='C' ) $_OpCol[$n]++;
}
if( count($_ROWSOP)>0 && isset($_ROWSOP[$n]) ){
$Celda = (float)$Celda;
if(      $_ROWSOP[$n]=='+' ) $_OpLin += $Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= $Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= $Celda;
}
}
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_exeROWSOPCALC);
$_OpLin = eval($_exeROWSOPCALC);
}
if( $Pintar ){
echo "<td id=D class=PieLista>";
if( empty($_FORMAT[$NCampos]) ){
list(,$Deci) = explode('.',$_OpLin);
echo eNumberFormat($_OpLin, mb_strlen($Deci));
}else{
$Formato = 'echo '.str_replace('#', $_OpLin, $_FORMAT[$NCampos]).';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
}
$_OpLinCol += $_OpLin;
}
if( count($_CHARTCOL)>0 ){
$v = ((( $_CHARTCOL[0]==$NCampos ) ? $_OpLin : (float)$row[$_CHARTCOL[0]]));
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v > $_ChartMax ){
$_ChartMax = $v;
}else if( $v < $_ChartMin ){
$_ChartMin = $v;
}
if( $Pintar ){
echo '<td>';
echo '<img style="" SRC="g/'.(($_CHARTCOL[3]=='')? 'chart_p.jpg':$_CHARTCOL[3]).'" HEIGHT='.(($_CHARTCOL[5]=='')? '12':$_CHARTCOL[5]).'>';
}
}
if( $_JSSELROWS ){
echo "<TD>&nbsp;";
}
if( isset($_LISTMULTISELECT) ){
if( $_vF[$NCampos] ){
echo '<TD>j</TD>';
}else{
echo '<TD> ';
}
}
if( $_EDITLIST[3]==2 ){
echo '<TD onclick="elRowKill()">D</TD>';
}
if( $Pintar ){
if( $_CARDSHOW ) $dimCard[] = $_vF;
if( $_ISUBLIST==true ){
if(      !empty($_ISLOPTD) ) echo '<td c-lass=Celda style="text-decoration:none">'.$_ISLOPTD;
else if( !empty($_ISLOPTH) ) echo '<td c-lass=Celda style="text-decoration:none">&nbsp;';
}
$MaxReg--;
if( $MaxReg<1 ){
if( $_MAXRECFULL ){
if( count($_COLSOP)==0 || $MaxReg==-1 ){
$TROcultar = ' _';
}
}else{
if( count($_CHARTCOL)>0 ){
while( $row=qRow() ){
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $row[$_CHARTCOL[0]];
if( $row[$_CHARTCOL[0]]>$_ChartMax ){
$_ChartMax = (float)$row[$_CHARTCOL[0]];
}else if( $row[$_CHARTCOL[0]]<$_ChartMin ){
$_ChartMin = (float)$row[$_CHARTCOL[0]];
}
}
}
break;
}
}
}else{
if( $ntReg==$_REG_ && $_REG_>0 ){
$Pintar = true;
}
}
}
$TipoCursor = true;
if( (SETUP::$System['ContextActivate'] || isset($_CALLSRVROW)) && $_PosSerial>-1 && empty($_VISIBLE_ROWS_) ){
while($row=qRow()){
$_SerialFileTxt .= $row[$_PosSerial]."\n";
}
error_log($_SerialFileTxt, 3, $_SerialFile);
}
if( !empty($_DBGROUPBY) ){
$TotalReg = $ntReg+$_REG_;
while( $row=qArray() ) $TotalReg++;
if( $ntReg==0 && !$EmptyList ) eMessage('~NR', 'HS', $ExeSg, $ExeJS, 'NR');
}
}else{
$NomGrupo = array();
if( !empty($_DBGROUPBY) ){
if( count($usuCursor)==0 && !$EmptyList ) eMessage('~NR', 'HS', $ExeSg, $ExeJS, 'NR');
}
$TipoCursor = false;
for($g=0; $g<$_TGrupos; $g++) for($n=0; $n<$NCampos; $n++){
$_OpSubCol[$g][$n] = 0;
$_OpRegMedia[$g][$n] = 0;
}
$_OpDeGrupo = false;
for($n=$_TGrupos; $n<$NCampos; $n++) if( $_COLSOP[$n]!='' && $_COLSOP[$n]!='%' && $_COLSOP[$n]!='L' ) $_OpDeGrupo = true;
$ConChartCol = 0;
if( count($_CHARTCOL)>0 ){
$ConChartCol++;
$_CHARTCOL[0] += $_TGrupos;
}
if( $_TGrupos>0 ){
$idGrupo = " eDetail=1";
$idDetalle = " eDetail=2";
}else{
$idGrupo = "";
$idDetalle = "";
}
$_SaltarGrupo = array(false, false);
$totalCursor = count($usuCursor);
for($l=0; $l<$totalCursor; $l++){
$_vF = &$usuCursor[$l];
if( $Pintar && $_SummaryData ){
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==3 ) $_LOGANSWER["list"][] = $usuCursor[$l];
}
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( isset($_LISTMULTISELECT) ) $_vF[$NCampos] = "";
if( $_TGrupos>0 ){
for($g=0; $g<$_TGrupos; $g++){
if( $_OldValGrupo[$g]!=$usuCursor[$l][$g] ){
$_OldValGrupo[$g] = $usuCursor[$l][$g];
for($sg=$g; $sg<$_TGrupos; $sg++){
if( $_SummaryGroupLabel[$sg] && $Pintar ){
if( $_ADDOPTION[$_Form[$sg][1]] == '' ){
$dato = trim($usuCursor[$l][$sg]);
}else{
$dato = $_SelVirtual[$_Form[$sg][1]][$usuCursor[$l][$sg]];
}
if( $g==1 || $dato!='' ){
if( $dato=='' ) $dato .= '&nbsp;';
echo $__Enter;
$Ajuste = ($_SummaryType>0) ? 1:0;
if( !$_SummaryNoHeaders ){
echo '<tr'.$TROcultar.(($_SummaryNoHeaders)?' style="display:none"':'')."{$idGrupo}><td colspan=".($NCampos-$_TGrupos+$ConChartCol+$Ajuste+((count($_ROWSOP)==0)?0:1)).' id=GC'.($sg+1);
echo ' title="'.strip_tags(str_replace("'", '&#39;', $_Form[$sg][0] )).'"';
if( $_COLSOPPREFIX[$g]<>'' ){
echo '>'.$_COLSOPPREFIX[$sg].' '.$dato;
}else{
echo ">{$dato}";
}
}
$_SummaryGroupTitle[$sg] = $_Form[$sg][0].': '.$dato;
$NomGrupo[$sg] = strip_tags(str_replace( "'", '&#39;', $dato ));
$_SaltarGrupo[$sg] = false;
}else{
$_SaltarGrupo[$sg] = true;
if( !$_SummaryNoHeaders ){
echo '<tr'.$TROcultar.(($_SummaryNoHeaders)?' style="display:none"':'')."{$idGrupo}><td colspan=".($NCampos-$_TGrupos+$ConChartCol+$Ajuste+((count($_ROWSOP)==0)?0:1)).' id=GC'.($sg+1).'>&nbsp;';
}
$_SummaryGroupTitle[$sg] = ">&nbsp;";
}
}
$_OldValGrupo[$sg] = $usuCursor[$l][$sg];
}
$_OldValGrupo[$g] = $usuCursor[$l][$g];
break;
}
}
for($g=$_TGrupos; $g<count($usuCursor[$l]); $g++) $_OldValGrupo[$g] = $usuCursor[$l][$g];
}
$ntReg++;
$_OpLin = 0;
$_RowStyle = $_RowClass = $_RowAdd = "";
$_RowDisabled = false;
$_PDFRowShadow = false;
if( $_FORMATPHP!='' ){
foreach($_pCol as $k=>$v){
$_CellsStyle[$v] = $_CellsClass[$v] = $_CellsAdd[$v] = '';
$_CellsStyle[$k] = &$_CellsStyle[$v];
$_CellsClass[$k] = &$_CellsClass[$v];
$_CellsAdd[$k] = &$_CellsAdd[$v];
}
_ExeFormato($usuCursor[$l], $_CellsStyle, $_CellsClass, $ntReg+$_THRowAdd, $_RowStyle, $_RowClass, $_RowDisabled, $_RowAdd, $_CellsAdd, $_PDFColor, $_PDFBackgroundColor, $_PDFLineRows, $_PDFRowShadow, $_pCol, $_pF);
for($n=0; $n<$NCampos; $n++){
$usuCursor[$n] = str_replace(" onclick=", " pp=1 onclick=", $usuCursor[$n]);
}
}
if( $_CHANGEFILTERMEMORY ){
$TROcultar = "";
}
if( $Pintar && $_SummaryData ){
if( (SETUP::$System['ContextActivate'] || isset($_CALLSRVROW)) && $_PosSerial>-1 && $_VISIBLE_ROWS_=="" ){
$_SerialFileTxt .= $usuCursor[$l][$_PosSerial]."\n";
}
$nRegShow++;
if( $_RowStyle!='' ) $_RowStyle = ' style="'.$_RowStyle.'"';
if( $_RowClass!='' ) $_RowClass = ' class="'.$_RowClass.'"';
if( $_RowDisabled ) $_RowDisabled = ' disabled';
$row = $usuCursor[$l];
echo $__Enter;
if( $_GREENBAR ){
echo "<tr{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else{
if( $_HayROWCOLOR ){
if( $_ROWCOLOR[1]=='' ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return ('.$_ROWCOLOR[0].');');
$txt = @eval('return ('.$_ROWCOLOR[0].');');
echo "<tr {$txt}{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else if( @eval('return( '.$_ROWCOLOR[0].');') ){
echo "<tr {$_ROWCOLOR[1]}{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$_RowDisabled}{$TROcultar}";
}
}
if( $_RowAdd!="" ) echo " ".$_RowAdd;
echo "{$idDetalle}>";
}
$PrimeraCol = ($_TGrupos!=0);
for($n=$_TGrupos; $n<$NCampos; $n++){
$Celda = trim($usuCursor[$l][$n]);
if( $_COLSNOREPEAT[$n] ){
if( $_COLSBAK[$n]===$Celda ){
if( !$_COLSNOREPEATFILL ) $Celda = '';
if( $_COLSNOREPEATCLASS<>"" ){
if( $_CellsClass[$n]<>"" ) $_CellsClass[$n] = $_CellsClass[$n]." ".$_COLSNOREPEATCLASS;
else $_CellsClass[$n] = $_COLSNOREPEATCLASS;
}
}else{
$_COLSBAK[$n] = $Celda;
for($i=$n+1; $i<count($_COLSNOREPEAT); $i++) if( $_COLSNOREPEAT[$i] ) $_COLSBAK[$i] = null;
}
}
$StyleTDAddOption = '';
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$StyleTDAddOption = $_SelVirtualStyle[$_Form[$n][1]][$Celda];
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][3]=='H' ){
$Celda = eHtmlToList($Celda);
}else if( $_Form[$n][3]=='A' ){
$Celda = eTextToList($Celda);
}else if( $_Form[$n][2]=='o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[$_Form[$n][1]]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][trim($tmp[$i])];
}
}
}else if( isset($_RADIOLIST[$_Form[$n][1]]) ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]!='' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}
}else if( isset($_SelVirtualCol[$_Form[$n][1]]) ){
$Celda = $_SelVirtualCol[$_Form[$n][1]][$Celda][ eval($_SelVirtualExel[$_Form[$n][1]]) ];
}
}
}else if( $_SELECTMULTIPLE[$_Form[$n][1]]>0 && $Celda!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for($i=1; $i<count($tmp)-1; $i++){
if( $i>1 ) $Celda .= '<br>';
$Celda .= $_SelVirtual[$_Form[$n][1]][trim($tmp[$i])];
}
}
$Celda = trim($Celda);
if( $_HayRadio ){
if( isset($_RADIO[$_Form[$n][1]]) && count($_RADIO[$_Form[$n][1]])>0 ) $Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
if( $Pintar ){
$dato = "";
if( eSubstrCount($_Form[$n][6], '*')>0 ){
if( $_SummaryData ){
echo '<td>';
if( $_FORMAT[$n]=='IMG' && $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$NomFile = _NmFileConPrefijo($row[$_PosSerial].'.'.$ext, $_UPLOADFILE[$xCampo]['PREFIJO']);
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$ext;
$NomFile = _NmFileConPrefijo($Celda, $_UPLOADFILE[$xCampo]['PREFIJO']);
}
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( eSubstrCount($sNomFile, "/http/")==0 ){
$sNomFile = "edes.php?R:{$sNomFile}&_SESS_={$_GET['_SESS_']}";
}else{
$sNomFile = mb_substr($sNomFile,6);
}
echo "<img src='{$sNomFile}' style='height:{$_AltoImgHidden[$n]}' pk=3>";
}else{
echo $Celda;
}
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( $_SummaryData ){
if( $PrimeraCol ){
echo '<td id=GRCOL'.$n;
$PrimeraCol = false;
}else{
echo '<td';
}
if( !empty($_CellsStyle[$n]) && strpos($_CellsStyle[$n], ":")===false ){
$Celda = eShell($_CellsStyle[$n], $Celda);
$_CellsStyle[$n] = "";
}
$xStyle = "";
if( $_CellsStyle[$n]!="" ) $xStyle .= $_CellsStyle[$n].";";
if( $_ColsColorInf[$n]!="" ) $xStyle .= $_ColsColorInf[$n].";";
if( $StyleTDAddOption!="" ) $xStyle .= $StyleTDAddOption.";";
if( $xStyle!="" ) echo " style='{$xStyle}'";
if( $_ColorNumeric[$n] && preg_match('/^(\+|\-)/u', $_Form[$n][2]) ){
if( $Celda>0 && preg_match('/\+/u', $_ColorNumeric[$n]) ) $_CellsClass[$n] = "numPositive";
else if( $Celda<0 && preg_match('/\-/u', $_ColorNumeric[$n]) ) $_CellsClass[$n] = "numNegative";
else $_CellsClass[$n] = "";
}
if( $_CellsClass[$n]!='' ){
echo ' class="'.$_CellsClass[$n].'"';
}else if( $_ColsClass[$n]!='' ){
echo ' class="'.$_ColsClass[$n].'"';
}
if( $_CellsAdd[$n]!="" ) echo " ".$_CellsAdd[$n];
echo '>';
}
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='#' && !isZero($Celda) ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
if( $_COLSOP[$n]=='C' || $_COLSOP[$n]=='S' ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
}
}else if( preg_match('/^(P4|F4|CDI|T)$/u',$_Form[$n][2]) ){
$dato = eDataFormat($Celda, $_Form[$n][2], "u");
$_vF[$n] = $dato;
echo $dato;
}else{
if( $_Form[$n][3]=='CHAR' ){
if( $Celda=='' ){
}else if( $_Form[$n][4]>1 ){
$dim = explode(",", $Celda);
for($i=0; $i<count($dim); $i++){
echo "<i class='OP'>".$dim[$i]."</i>";
}
}else{
echo $Celda;
}
}else if( $_FORMAT[$n]=='' ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_SummaryData ){
echo $Celda;
$_vF[$n] = $Celda;
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( eSubstrCount($_FORMAT[$n], '@')>0 ){
if( mb_strrpos($Celda, '.') !== false ){
$Celda = mb_substr($Celda, mb_strrpos($Celda, '.')+1);
}else{
$Celda = '';
}
$Formato = 'echo '.str_replace('@', $Celda, $_FORMAT[$n]).';';
}else if( $_FORMAT[$n]=='ICON' ){
if( $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$pk = $row[$_PosSerial].'.'.$ext;
}else{
$pk = $Celda;
}
$CampoNomFile = "";
if( mb_substr($GLOBALS["_DBTABLE"],0,11)=="gs_log_doc " ){
$_UPLOADFILE[$_Form[$n][12]]['oDIR'] = SETUP::$LogHistory['LogPathFileVersion'];
$pk = $row[0].'.'.$ext;
$CampoNomFile = "nm_file";
}
if( $_UPLOADFILE[$_Form[$n][12]]['oDIR']!='' ){
$NomFile = _NmFileConPrefijo($pk, $_UPLOADFILE[$xCampo]['PREFIJO']);
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
if( !$_with_eVD ){
eExplodeLast($NomFile, "/", $iz, $dr);
$_with_eVD_json = array("_SERIAL_"=>$_DBSERIAL[1], "_DIR_"=>"{$iz}/", "_FIELD_"=>$xCampo, "_NAME_FIELD_"=>$CampoNomFile);
}
}else{
$b64 = base64_encode($_UPLOADFILE[$_Form[$n][12]]['NOMBRE'].','.$GLOBALS['_DBTABLE'].','.$GLOBALS['_DBINDEX'].','.$row[$_PosIndex].','.$ext.','.$Celda);
$b64 = mb_substr($b64,0,10).mb_substr(md5(time()),0,10).mb_substr($b64,10);
$NomFile = '!'.$b64;
}
$_with_eVD = true;
$dato = eIconShow($ext, "onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='{$__Lng[81]}'");
echo $dato;
$_vF[$n] = $dato;
}
$Formato = '';
}else if( $_FORMAT[$n]=='IMG' ){
if( $Celda!='' ){
$ext = eFileExtension($Celda, $viewOnline);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE']==$_DBSERIAL[1] ){
$NomFile = _NmFileConPrefijo( $row[$_PosSerial].'.'.$ext, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$ext;
$NomFile = _NmFileConPrefijo( $Celda, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}
$NomFile = eSplitPath($NomFile, $_UPLOADFILE[$xCampo]['oDIR']).'/'.mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( !$_with_eVD ){
eExplodeLast($NomFile, "/", $iz, $dr);
$_with_eVD_json = array("_SERIAL_"=>$_DBSERIAL[1], "_DIR_"=>"{$iz}/", "_FIELD_"=>$xCampo, "_NAME_FIELD_"=>$CampoNomFile);
}
if( eSubstrCount($sNomFile, "/http/")==0 ){
if( file_exists(eScript($sNomFile)) ){
$sNomFile = "edes.php?R:{$sNomFile}&_SESS_={$_GET['_SESS_']}";
}else{
$sNomFile = '';
}
}else{
$sNomFile = mb_substr($sNomFile, 6);
if( !file_exists($sNomFile) ){
$sNomFile = '';
}
}
if( $_Form[$n][20]!="" ) echo "<span>";
if( $sNomFile!="" ){
$_with_eVD = true;
echo "<img src='{$sNomFile}' onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='{$__Lng[81]}' pk=4>";
}else{
echo "<img>";
}
if( $_Form[$n][20]!="" ) echo "</span>";
}
$Formato = '';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
if( preg_match('/^eNumberFormat\(/u',$_FORMAT[$n]) ){
if( is_numeric($Celda) ){
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}else{
$Formato = 'echo $Celda;';
}
}else{
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}
}
}else{
if( $Celda=="" ) $Celda = 0;
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMAT[$n]).';';
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}
if( $_SummaryData ){
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func(mb_substr($Formato,5,-3), $n, $Celda);
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
$dato = "";
@eval(str_replace(array("eNumberFormat(,", "echo "), array("eNumberFormat(0,", '$dato = '), $Formato));
echo $dato;
}
}
}
}
}
}else{
}
if( count($_COLSOP)>0 && isset($_COLSOP[$n]) ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ){
$Celda = (float)$Celda;
$_OpCol[$n] += $Celda;
for($g=0; $g<$_TGrupos; $g++){
$_OpSubCol[$g][$n] += $Celda;
$_OpRegMedia[$g][$n]++;
}
}
if( $_COLSOP[$n]=='#' && !isZero($Celda) ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
if( $_COLSOP[$n]=='C' || $_COLSOP[$n]=='S' ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
}
if( count($_ROWSOP)>0 && isset($_ROWSOP[$n]) ){
$Celda = (float)$Celda;
if(      $_ROWSOP[$n]=='+' ) $_OpLin += $Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= $Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= $Celda;
}
}
$Todo = $usuCursor[$l];
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_exeROWSOPCALC);
$_OpLin = eval($_exeROWSOPCALC);
}
if( $Pintar ){
echo '<td id=D class=PieLista>';
if( empty($_FORMAT[$NCampos]) ){
list(,$Deci) = explode('.',$_OpLin);
$TotalRowSopP = eNumberFormat($_OpLin, mb_strlen($Deci));
$TotalRowSop = $_OpLin;
}else{
$TotalRowSop = $_OpLin;
$Formato = '$TotalRowSopP = '.str_replace('#', $_OpLin, $_FORMAT[$NCampos]).';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
echo $TotalRowSopP;
}
$_OpLinCol += $_OpLin;
$Todo[$_CHARTCOL[0]] = $TotalRowSop;
}
if( isset($_CHARTCOL) && count($_CHARTCOL)>0 ){
$v = (float)$Todo[$_CHARTCOL[0]];
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v > $_ChartMax ){
$_ChartMax = $v;
}else if( $v < $_ChartMin ){
$_ChartMin = $v;
}
if( $Pintar && $_SummaryData ){
echo '<td><img style="" src="g/'.(($_CHARTCOL[3]=='')? 'chart_p.jpg':$_CHARTCOL[3]).'" HEIGHT="'.(($_CHARTCOL[5]=='')? '12':$_CHARTCOL[5]).'px">';
}
}
if( $_JSSELROWS ){
echo "<TD>&nbsp;";
}
if( isset($_LISTMULTISELECT) ){
if( $_vF[$NCampos] ){
echo '<TD>j</TD>';
}else{
echo '<TD> ';
}
}
if( $Pintar && $_ISUBLIST==true ){
if( $_ISLOPTD!='' ) echo '<td style="text-decoration:none">'.$_ISLOPTD;
else if( $_ISLOPTH!='' ) echo '<td style="text-decoration:none">&nbsp;';
}
if( $_TGrupos>0 && $_OpDeGrupo ){
for($g=$_TGrupos-1; $g>=0; $g--){
$_SummaryGroup = $g;
$_OpSubCol[$g][0]++;
$Old = ''; $New = '';
for($i=$g; $i>=0; $i--){
$Old .= $_OldValGrupo[$i];
$New .= $usuCursor[$l+1][$i];
}
if( $Old!=$New || ($l+1)==count($usuCursor) ){
if( $_SaltarGrupo[$g] ) continue;
if( !$Pintar ){
for($n=$_TGrupos; $n<$NCampos; $n++){
for($sg=$_TGrupos-1; $sg>=$g; $sg--) $_OpSubCol[$sg][$n] = 0;
}
$_OpSubCol[$g][0] = 0;
continue;
}
if( count($_GRID)>0 ){
$t = 0;
for($n=$_TGrupos; $n<$NCampos; $n++) if( $_COLSOP[$n]=='<' ) $t += $_OpSubCol[$g][$n-1];
for($n=$_TGrupos; $n<$NCampos; $n++) if( $_COLSOP[$n]=='<' ) $_OpSubCol[$g][$n] = ($_OpSubCol[$g][$n-1]*100)/$t;
}
if( $_FORMATTOTALSPHP!='' ){
_ExeFormatoTotal($_OpCol, $g, $_NameField[$g], $_OpSubCol);
}
if( $_SummaryGroupTotal[$g] ){
echo $__Enter;
echo '<tr id=GR'.($g+1).$TROcultar."{$idGrupo}>";
}
$_OpLin = 0;
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
$Celda = $_OpSubCol[$g][$n];
if( $_ROWSOP[$n]=='+' )	$_OpLin += $Celda;
if( $n==$_TGrupos ){
if( $_SummaryGroupTotal[$g] ){
if( $_TextGrupo[$g]=='{C}' ){
echo '<td align=right';
}else{
if( $_Form[$n][2][0]=='+' || $_Form[$n][2][0]=='-' ){
echo '<td align=right';
}else{
echo '<td align=left';
}
}
}
echo ' title="'.strip_tags(str_replace("'", '&#39;', $_Form[$g][0])).(($NomGrupo[$g]=='')?'':': '.$NomGrupo[$g]).'"';
if( $_GrupoColSpan>1 ){
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1)." colspan={$_GrupoColSpan}>";
$n += $_GrupoColSpan-1;
}else{
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1).">";
}
if( $_TextGrupo[$g]!='' ){
$tmp = str_replace('{C}', $_OldValGrupo[$g], $_TextGrupo[$g]);
if( $_SummaryGroupTotal[$g] ){
if( !empty($_ADDOPTION[$_Form[$g][1]]) ){
$Celda = $_SelVirtual[$_Form[$g][1]][$Celda];
echo str_replace('{V}', trim($Celda), $tmp);
}else{
echo str_replace('{V}', $Celda, $tmp);
}
}
continue;
}
}else{
if( $_SummaryGroupTotal[$g] ){
if( $_Form[$n][2][0]=='+' || $_Form[$n][2][0]=='-' ){
echo '<td align=right';
}else{
echo '<td align=left';
}
echo $cssSubTotal[$n];
echo '>';
if( $_SummaryCol>0 && $n==$g ){
echo $_OldValGrupo[$g];
}
}
}
if( $_SummaryNoHeaders && $n==($_TGrupos-$_SummaryCol) ){
echo $_SummaryGroupTitle[$g];
$_SummaryGroupTitle[$g] = '';
}
if( eSubstrCount('+#C%<M', $_COLSOP[$n])==1 ){
if( $_COLSOP[$n]=='M' ){
$Celda = $Celda/$_OpRegMedia[$g][$n];
$_OpRegMedia[$g][$n] = 0;
}
if( empty($_FORMATTOTALS[$n]) ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_SummaryGroupTotal[$g] ) echo $Celda;
}else{
if( eSubstrCount($_FORMATTOTALS[$n], '@')>0 ){
if( mb_strrpos($Celda, '.')!==false ){
$Celda = mb_substr($Celda, mb_strrpos($Celda, '.')+1);
}else{
$Celda = '';
}
$Formato = 'echo '.str_replace('@', $Celda, $_FORMATTOTALS[$n]).';';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMATTOTALS[$n]).';';
}
}else{
$Formato = 'echo '.str_replace(array("&#","#","{*:*}"), array("{*:*}",$Celda,"&#"), $_FORMATTOTALS[$n]).';';
}
}
if( $_SummaryGroupTotal[$g] ){
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func(mb_substr($Formato,5,-3), $n, $_OpSubCol[$g]);
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
}
}
}
}
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ){
for($n=0; $n<count($_OpSubCol[$g]); $n++) $_vF[$n] = $_OpSubCol[$g][$n];
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_exeROWSOPCALC);
$_OpLin = eval($_exeROWSOPCALC);
}
echo '<td style="text-align:right"';
if( $_GrupoColSpan>1 ){
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1)." colspan={$_GrupoColSpan}>";
}else{
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1).">";
}
if( empty($_FORMATTOTALS[$NCampos]) ){
$TotalRowSopP = $_OpLin;
$TotalRowSop = $_OpLin;
}else{
$TotalRowSop = $_OpLin;
$Formato = '$TotalRowSopP =  '.str_replace('#', $_OpLin, $_FORMATTOTALS[$NCampos]).';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
echo $TotalRowSopP;
}
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ) $_OpSubCol[$g][$n] = 0;
if( $_SummaryGroupTotal[$g] && $ConChartCol==1 ) echo '<td>';
}
}
for($g=0; $g<$_TGrupos; $g++){
if( $_OldValGrupo[$g]!=$usuCursor[$l+1][$g] ){
for($n=$_TGrupos; $n<$NCampos; $n++){
for($sg=$g; $sg<$_TGrupos; $sg++) $_OpSubCol[$sg][$n] = 0;
}
break;
}
}
}
if( $Pintar ){
if( $_CARDSHOW ) $dimCard[] = $_vF;
$MaxReg--;
if( $MaxReg<1 ){
if( $_MAXRECFULL ){
if( count($_COLSOP)==0 || $MaxReg==-1 ){
$TROcultar = ' _';
}
}else{
if( count($_CHARTCOL)>0 ){
$v = (float)$Todo[$_CHARTCOL[0]];
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v>$_ChartMax ){
$_ChartMax = $v;
}else if( $v<$_ChartMin ){
$_ChartMin = $v;
}
}
if( (SETUP::$System['ContextActivate'] || isset($_CALLSRVROW)) && $_PosSerial>-1 && $_VISIBLE_ROWS_=="" ){
for($nl=$l+1; $nl<count($usuCursor); $nl++){
$_SerialFileTxt .= $usuCursor[$nl][$_PosSerial]."\n";
}
error_log($_SerialFileTxt, 3, $_SerialFile);
}
break;
}
}
}else{
if( $ntReg==$_REG_ && $_REG_>0 ) $Pintar = true;
}
}
}
if( $_with_eVD ){
eExplodeOne($_SQL_, " from ", $iz, $dr);
list($dr) = explode(" order by ", $dr);
$sql = "select ";
$alias = "";
if( $HaySelect || !empty($_OPTIONSINLIST) ) $alias = "A.";
$sql .= "{$alias}{$_DBINDEX}, {$alias}{$_with_eVD_json['_FIELD_']} {$dr}";
$_with_eVD_json["IMG"] = "(int)";
$_with_eVD_json["_IN_SQL_"] = $sql;
$_with_eVD_json["_ALIAS_"] = $alias;
_contextAdd('edes.php?E:$img.php', $_with_eVD_json);
$_with_eVD_json["_DOWN"] = 1;
}
$_PintoTotales = false;
$ok = (!$_InfSinTotales && $_SummaryTotal && count($_COLSOP)>0 && ((!isset($_REG_) || (isset($_REG_) && (ceil($_REG_/$_RowsOnPage)+1)==ceil($TotalReg/$_RowsOnPage))) || ($EmptyList && $TotalReg==0)));
if( isset($_SUMMARY) ) $ok = true;
if( !$ok && $_MAXRECFULL && count($_COLSOP)>0 ) $ok = true;
if( $ok ){
$_PintoTotales = true;
if( $_GET['_ISLBlankRecords']>0 && $nRegShow<$_GET['_ISLBlankRecords'] ){
for($i=0; $i<$_GET['_ISLBlankRecords']-$nRegShow; $i++){
echo '<tr LIBRE=1>';
for($n=0; $n<$NCampos; $n++){
echo '<td>&nbsp;';
}
if( $_ISLOPTH!='' ) echo '<td>&nbsp;';
}
}
echo '</tbody>';
echo '<tfoot>';
$_SummaryGroup = -1;
if( count($_GRID)>0 ){
$t = 0;
for($n=$_TGrupos; $n<$NCampos; $n++) if( $_COLSOP[$n]=='<' ) $t += $_OpCol[$n-1];
for($n=$_TGrupos; $n<$NCampos; $n++) if( $_COLSOP[$n]=='<' ) $_OpCol[$n] = ($_OpCol[$n-1]*100)/$t;
}
$xColSpan = '';
if( $FormatTotals>1 ) $xColSpan = ' colspan='.$_FORMATTOTALSCS;
if( $_FORMATTOTALSPHP!='' ){
$_OpSubCol[-1] = array();
for($i=0; $i<count($_OpCol); $i++){
$_OpSubCol[-1][$i] = $_OpCol[$i];
}
_ExeFormatoTotal($_OpCol, -1, '', $_OpSubCol);
$_OpCol = $_OpSubCol[-1];
}
$_OpLin = 0;
unset($_vF);
$_vF = array();
echo "<tr class=PieLista{$TROcultar}>";
if( $EmptyList && $NCampos==0 ) $NCampos = $tColumnas;
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
if( $_FORMATTOTALS[$n]=='IMG' ) $_FORMATTOTALS[$n] = "";
$Celda = trim($_OpCol[$n]);
$_vF[$n] = $Celda;
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( $_COLSOP[$n]=='M' ) $Celda = $Celda/$ntReg;
if( $TipoCursor && eSubstrCount($_Form[$n][6], '*')>0 ){
echo "<td{$xColSpan}>".$Celda;
}else{
if( $_COLSOP[$n]=='' ){
echo "<td{$xColSpan} id=d>";
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ) continue;
}
if( $_FORMATTOTALS[$n]!='' ){
$Formato = 'echo '.str_replace('#', $Celda, $_FORMATTOTALS[$n]).';';
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func(mb_substr($Formato,5,-3), $n, $_OpCol);
}else{
if( $GLOBALS['_DEBUG']==14 ){
eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
}
}else{
if( $_FORMATTOTALS[$n]=='' ){
if( $_COLSOP[$n]=='C' ){
if( $_ALIGN[$n]=='' ){
echo "<td{$xColSpan} id=i>";
}else{
echo "<td{$xColSpan} {$_ALIGN[$n]}>";
}
}else if( eSubstrCount('<=>"'."'", $_COLSOP[$n][0])>0 ){
echo "<TD{$xColSpan}>";
switch( $_COLSOP[$n][0] ){
case '<':
echo ' style="text-align:left"';
$_COLSOP[$n] = trim(mb_substr($_COLSOP[$n],1));
break;
case '=':
echo ' style="text-align:center"';
$_COLSOP[$n] = trim(mb_substr($_COLSOP[$n],1));
break;
case '>':
echo ' style="text-align:right"';
$_COLSOP[$n] = trim(mb_substr($_COLSOP[$n],1));
break;
}
if( $_COLSOP[$n][0]=='"' || $_COLSOP[$n][0]=="'" ) echo mb_substr($_COLSOP[$n],1,-1);
continue;
}elseif( $_COLSOP[$n]=='#' ){
echo "<td{$xColSpan} id=i>";
}else{
echo "<td{$xColSpan} id=d>";
}
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ){
continue;
}
}
if( $_oCOLSOP[$n]!='%' ){
if( $_COLSOP[$n]!='S' ){
if( mb_strtoupper($_COLSOP[$n])=='C' ){
echo eNumberFormat($Celda,0);
}else{
echo $Celda;
}
}
}else{
if( $Celda!='' ) echo '100%';
}
}else{
if( ($_FORMATTOTALS[$n][0]=='"' || $_FORMATTOTALS[$n][0]=="'") && $_FORMATTOTALSALIGN<>"" ){
echo "<td{$xColSpan} id={$_FORMATTOTALSALIGN}>";
}else  if( $_Form[$n][2][0]=='+' || $_Form[$n][2][0]=='-' ){
echo "<td{$xColSpan} id=D>";
}else{
echo "<td{$xColSpan} id=I>";
}
if( $_oCOLSOP[$n]=="" && $_FORMATTOTALS[$n]=="" ) continue;
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ) continue;
}
if( $_oCOLSOP[$n]!='%' ){
$Formato = 'echo '.str_replace('#', $Celda, $_FORMATTOTALS[$n]).';';
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func(mb_substr($Formato,5,-3), $n, $_OpCol);
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
if( $Formato=="echo ICON;" ){
echo eNumberFormat($_OpCol[$n], 0);
}else{
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
}
}else{
if( $Celda[0]=='>' ){
echo mb_substr($Celda, 1);
}else if( $Celda!='' ) echo '100%';
}
}
if( count($_ROWSOP)>0 && isset($_ROWSOP[$n]) ){
$Celda = (float)$Celda;
if(      $_ROWSOP[$n]=='+' ) $_OpLin += $Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= $Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= $Celda;
}
}
}
if( $xColSpan!='' ){
$xColSpan = '';
$n += $_FORMATTOTALSCS-1;
}
}
if( $_JSSELROWS ) echo "<TD>&nbsp;";
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_exeROWSOPCALC);
$_OpLin = eval($_exeROWSOPCALC);
}
echo '<td id=D class="PieLista">';
if( empty($_FORMATTOTALS[$NCampos]) ){
echo $_OpLinCol;
}else{
$Formato = 'echo '.str_replace('#', $_OpLinCol, $_FORMATTOTALS[$NCampos]).';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
}
}
if( isset($_CHARTCOL) && count($_CHARTCOL)>0 ) echo '<td> ';
if( $_ISLOPTD!='' ) echo '<td>';
if( isset($_CHARTROW) && count($_CHARTROW)>1 ){
$MaxValor = null;
$MinValor = null;
for($n=0; $n<$NCampos; $n++){
if( $_CHARTROW[0][$n] ){
if( $MaxValor==null ){
$MaxValor = $_OpCol[$n];
$MinValor = $_OpCol[$n];
}else{
$MaxValor = max($MaxValor, $_OpCol[$n]);
$MinValor = min($MinValor, $_OpCol[$n]);
}
}
}
$MarginTop = 0;
if( $_CHARTROW[2]=='' ) $_CHARTROW[2] = 100;
$MaxValor = ceil($MaxValor);
$MinValor = ceil($MinValor);
if( $MinValor<0 ){
$sMaxValor = $MaxValor;
$MaxValor = $MaxValor+abs($MinValor);
$MarginTop = (($sMaxValor*$_CHARTROW[2])/$MaxValor);
}else{
$MarginTop = $_CHARTROW[2];
}
echo "<tr class=PieListaGraf{$TROcultar}>";
$AltoChart = $MaxValor;
if( $MinValor<0 ) $AltoChart += abs($MinValor);
for($n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++){
if( $TipoCursor && eSubstrCount($_Form[$n][6],'*')>0 ){
echo "<td{$xColSpan}>";
}else{
if( $_CHARTROW[0][$n] ){
list(,$nd) = explode(',',$_Form[$n][4]);
echo "<td style='vertical-align:bottom;text-align:center' title='".eNumberFormat($_OpCol[$n],$nd)."'>";
if( $MinValor>=0 ){
$v = ceil(($_OpCol[$n]*$_CHARTROW[2])/$AltoChart);
if( $v<1 ) $v = 1;
echo '<img src="g/chart_vp.jpg" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:bottom">';
}else{
if( $_OpCol[$n]>=0 ){
$v = ceil(($_OpCol[$n]*$_CHARTROW[2])/$AltoChart);
if( $v<1 ) $v = 1;
$mt = 0;
if( $MinValor<0 ){
$mt = ceil((abs($MinValor)*$_CHARTROW[2])/$AltoChart);
}
echo '<img src="g/chart_vp.jpg" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:bottom;margin-bottom:'.$mt.'px;">';
}else{
$v = abs(ceil((($_OpCol[$n]*$_CHARTROW[2])/$AltoChart)));
if( $v<1 ) $v = 1;
$mt = 0;
if( $MinValor<0 ){
$mt = ceil(((abs($MinValor)-abs($_OpCol[$n]))*$_CHARTROW[2])/abs($MinValor));
}
echo '<img src="g/chart_vn.jpg" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:bottom;margin-bottom:'.$mt.'px;">';
}
}
}else{
if( ($n+1)==$NCampos && count($_CHARTCOL)>0 && $_CHARTCOL[1]>0 ){
echo '<td colspan=2>';
}else{
echo '<td>';
}
}
}
}
if( count($_ROWSOP)>0 ) echo '<td cl-ass=Celda colspan='.((count($_CHARTCOL)>0)?2:1).'>&nbsp;';
if( count($_CHARTCOL)>0 ) echo '<td> ';
}
echo '</tfoot>';
}else{
if( $_ISUBLIST==true && $nRegShow<$_GET['_ISLBlankRecords'] ){
for($i=0; $i<$_GET['_ISLBlankRecords']-$nRegShow; $i++){
echo '<tr LIBRE=1>';
for($n=0; $n<$NCampos; $n++) echo '<td>&nbsp;';
echo '<td>&nbsp;';
}
}
echo '</tbody>';
}
echo '</table>'.$__Enter;
if( $_CARDSHOW && $_ISUBLIST==false && gettype($dimCard)=="array" &&  gettype($_FormCard)=="array"){
echo "<DIV class='CONTENEDORCARD' onclick='_CardClick(this)'>";
$tr = count($dimCard);
$tc = count($_FormCard);
for($n=0; $n<$tr; $n++){
$i = 0;
echo "<DIV class='card' ePK='".$dimCard[$n][$_PosDBIndex]."' eTR='{$n}'>";
if( $_FormCard[$i][0][0]==">" ){
call_user_func(mb_substr($_FormCard[$i][0],1), $dimCard[$n]);
$i++;
}else if( $_FormCard[$i][0]=="-" && $_FormCard[$i][1]!="" ){
echo "<DIV class='card-title'>".$_FormCard[$i][1]."</div>";
$i++;
}else if( $_FormCard[$i][0]=="=" ){
echo "<DIV class='card-title' i='".$_pFieldCard[$i]."'>".$dimCard[$n][$_pFieldCard[$i]]."</div>";
$i++;
}
if( $_FormCard[$i][0]=="-" ){
echo "<DIV class='card-separator'></div>";
$i++;
}
echo '<table>';
for($c=$i; $c<$tc; $c++){
if( $_FormCard[$c][0]=="-" ){
echo '<tr><td colspan=2 class="card-line"></td></tr>';
}else{
echo '<tr'.(($_FormCard[$c][6]!="*")? '':' id=o').'><td>'.$_FormCard[$c][0].':</td>';
echo '<td i="'.$_pFieldCard[$c].'">';
echo $dimCard[$n][$_pFieldCard[$c]].'</td></tr>';
}
}
echo '</table>';
echo "</DIV>";
}
echo "</DIV>";
}
if( $_NOJS ){
echo '</body></html>';
eEnd();
}
if( count($_CHARTCOL)>0 ){
if( $_TGrupos>0 ){
$_CHARTCOL[0] -= $_TGrupos;
$NCampos -= $_TGrupos;
}
if( count($_COLSOP)==0 && $_TOTALSROWS ){
if( (ceil($_REG_/$_RowsOnPage)+1)==ceil($TotalReg/$_RowsOnPage) ){
?>
<SCRIPT type="text/javascript" name=eDes>
S(BROWSE.rows[BROWSE.rows.length-1].cells[<?= $NCampos ?>].children[0]).nodeRemove();
</SCRIPT>
<?PHP
}
}
}
if( count($_CHARTCOL)>0 && !$SoloDatos ){
if( count($_ROWSOP)>0 ) $NCampos++;
$_ChartMin = (float)$_ChartMin;
if( $_ChartMin<0 ){
?>
<SCRIPT type="text/javascript" name=eDes>
function ChartWidth(Max,Min){
var Ancho=<?=$_CHARTCOL[1]?>, NCol=<?=$_CHARTCOL[0]?>, NCampo=<?=$NCampos?>, Valor, Total=Max-Min,
m,n,Margin=0,s;
for(n=<?=((count($_THCOLSPAN)==0)?'1':'2')?>; n<BROWSE.rows.length; n++){
try{
Valor = S.thousandsClear(BROWSE.rows[n].cells[NCol].textContent);
if( Valor==0 ){
Margin = (Ancho*Min*-1)/(Total);
m = 1;
}else if( Valor<0 ){
BROWSE.rows[n].cells[NCampo].children[0].src = BROWSE.rows[n].cells[NCampo].children[0].src.replace('<?= (($_CHARTCOL[3]=='')? 'chart_p.jpg':$_CHARTCOL[3]); ?>','<?= (($_CHARTCOL[4]=='')? 'chart_n.jpg':$_CHARTCOL[4]); ?>');
m = (Valor*-1*Ancho)/Total;
Margin = (Ancho*Min*-1)/(Total)-m;
}else{
Margin = (Ancho*Min*-1)/(Total);
m = (Valor*Ancho)/Total;
}
if( m>0 && m<1 ) m=1;
if( m<0 && m>-1 ) m=1;
v = BROWSE.rows[n].cells[NCampo].children[0].style;
v.width = px(m);
v.marginLeft = px(Margin);
BROWSE.rows[n].cells[NCampo].title = BROWSE.rows[n].cells[NCol].textContent;
}catch(e){}
}
}
<?PHP if( !$SoloDatos ) echo "ChartWidth({$_ChartMax},{$_ChartMin});"; ?>
</SCRIPT>
<?PHP
}else{
?>
<SCRIPT type="text/javascript" name=eDes>
function ChartWidth(Max,Min){
var m,n,Ancho = <?= $_CHARTCOL[1] ?>, NCol = <?= $_CHARTCOL[0] ?>, NCampo = <?= $NCampos ?>;
for( n=<?=((count($_THCOLSPAN)==0)?'1':'2')?>; n<BROWSE.rows.length; n++ ){
try{
m = (Ancho*S.thousandsClear(BROWSE.rows[n].cells[NCol].textContent))/Max;
if( m<1 ) m=1;
BROWSE.rows[n].cells[NCampo].children[0].style.width = m+"px";
BROWSE.rows[n].cells[NCampo].title = BROWSE.rows[n].cells[NCol].textContent;
}catch(e){}
}
}
<?PHP if( !$SoloDatos ) echo "ChartWidth({$_ChartMax},{$_ChartMin});"; ?>
</SCRIPT>
<?PHP
}
}
if( !empty($_VerUserCondiciones) && function_exists($_VerUserCondiciones) ){
?>
<SCRIPT type="text/javascript" name=eDes>
if( DGI("CONDICIONES")!=null ){
DGI("CONDICIONES").style.width = px(DGI("BROWSE").offsetWidth);
if( (DGI("CONDICIONES").style.width*1)!=DGI("BROWSE").offsetWidth ) DGI("CONDICIONES").style.width = px(DGI("BROWSE").offsetWidth);
}
</SCRIPT>
<?PHP
}
if( isset($_OPTIONSINLIST) && ($_OPTIONSINLISTTYPE==2 || $_OPTIONSINLISTTYPE==3) && SETUP::$List['OptionsInListHidden'] ){
if( $_OPTIONSINLISTTYPE==3 ){
array_push($_TIPTD, '*|cdi__,action__|||');
}
?>
<script type="text/javascript">
top.S("#BROWSE",window).class("-col_<?=$_pF["cdi__"]?>l,+col_<?=$_pF["cdi__"]?>n");
top.S("#BROWSE",window).class("-col_<?=$_pF["action__"]?>l,+col_<?=$_pF["action__"]?>n");
top.S(["#BROWSE TH[nc='<?=$_pF["cdi__"]?>']", "#BROWSE TH[nc='<?=$_pF["action__"]?>']"],window).none();
</script>
<?PHP
}
if( $SoloDatos ){
$pagActual = $DesdeList;
$PagMultiploDe = $_RowsOnPage;
$TPaginas = $HastaList;
$PagMultiploDe = 5;
$PrimerBoton = ceil(($pagActual/$PagMultiploDe)-1)*$PagMultiploDe+1;
$UltimoBoton = $PrimerBoton+$PagMultiploDe-1;
if( $UltimoBoton>$TPaginas ) $UltimoBoton = $TPaginas;
$box = _ListaBotonesBox($PrimerBoton, $UltimoBoton, $DesdeList, $HastaList);
?>
<script type="text/javascript" name=eDes>
var _WOPENER = window.frameElement.WOPENER;
_WOPENER._CONTEXT = <?=eContextPKMain()?>;
_WOPENER.S(":_CONTEXT").val(_WOPENER._CONTEXT);
_WOPENER.S(":_MD5").val("<?=$_ENV[SYS]["MD5Pag"]?>");
_WOPENER._NuevaPaginaIni(window, {
DesdeList: <?=((int)$DesdeList)?>,
HastaList: <?=$HastaList?>,
TotalReg: <?=$TotalReg?>,
TotalReg_RowsOnPage: <?=ceil($TotalReg/$_RowsOnPage)?>,
_CARDSHOW: <?=(($_CARDSHOW)?"true":"false")?>,
_CHARTCOL: <?=(count($_CHARTCOL))?>,
_ChartMax: <?=((float)$_ChartMax)?>,
_ChartMin: <?=((float)$_ChartMin)?>,
_FunctionLastPage: '<?=$_FunctionLastPage?>',
_FunctionNextPage: '<?=$_FunctionNextPage?>',
_ISLOPMenu: '<?=$_ISLOPMenu?>',
_ISUBLIST: <?=(($_ISUBLIST)?"true":"false")?>,
_ISUBLISTTOOLS: '<?=$_ISUBLISTTOOLS?>',
_LToolsType: '<?=$_LToolsType?>',
_OnClickEditList: <?=((!empty($_EDITLIST[0]) && ($_EDITLIST[3]==-1 || $_EDITLISTCLICK || $Objeto=="Lml"))?"true":"false")?>,
_PAGINCR: <?=(($_PAGINCR)?"true":"false")?>,
_RD: '<?=$_RD?>',
_REG_: <?=((int)$_REG_)?>,
_REG_RowsOnPage_1: <?=(ceil($_REG_/$_RowsOnPage)+1)?>,
_REG_TotalReg_RowsOnPage: <?=(((ceil($_REG_/$_RowsOnPage)+1)==ceil($TotalReg/$_RowsOnPage))?"true":"false")?>,
_RowsOnPage: <?=(int)$_RowsOnPage?>,
_TGrupos: <?=((int)$_TGrupos)?>,
_TIPO_: '<?= $_TIPO_ ?>',
_TIPTD: <?=count($_TIPTD)?>,
_TOTALSROWS: <?=((int)$_TOTALSROWS)?>,
_VIEW__VIEWFORMAT: <?=((isset($_VIEW) && isset($_GET["_VIEWFORMAT"]))? "false":"true")?>,
_WINCAPTION: <?=(($_WINCAPTION!="")?"true":"false")?>,
box: "<?=$box?>",
floor_REG_RowsOnPage_1: <?=(floor($_REG_/$_RowsOnPage)+1)?>
});
</script>
<?PHP
if( $_PHPNEXTPAGE!='' ){
$tmpFile = GrabaTmp('l_phpnextpage', $_PHPNEXTPAGE, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPNEXTPAGE);
}
?>
<script type="text/javascript">
_WOPENER._NuevaPaginaEnd(window, <?=((int)$_TGrupos)?>);
</script>
<?PHP
eEnd();
?>
<script type="text/javascript" name=eDes>
function DGI(a){
var o = document.getElementById(a);
if( o==null ) o = document.getElementsByName(a)[0] || null;
return o;
}
var _WOPENER = window.frameElement.WOPENER,
oCard = top.S(".CONTENEDORCARD", window),
viewCard = oCard.length;
var _WOPENER = window.frameElement.WOPENER,
Destino = _WOPENER.DGI("BROWSE"),
Origen = DGI("BROWSE"),
TRec = Destino.rows.length,
nl = parseInt(Destino.getAttribute("AltoTH"))+1,
oAnchoCOL, oAnchoTD, dAnchoCOL, dAnchoTD, n,
slt = _WOPENER.S.scrollGet(_WOPENER.S("BODY").obj);
Origen.className = Destino.className;
try{
<?PHP if( SESS::$_D_!="" ){ ?>
var oTH = top.S("#BROWSE TH", window).dim,
dTH = top.S("#BROWSE TH", _WOPENER).dim, bak;
bak = top.S("#BROWSE", _WOPENER).attr("classbak");
if( bak==null ){
top.S("#BROWSE", window).obj.removeAttribute("classbak");
}else{
top.S("#BROWSE", window).attr("classbak", (bak!=null )? bak:null);
}
top.S("#BROWSE", window).obj.className = top.S("#BROWSE", _WOPENER).class();
for(n=0; n<oTH.length; n++){
bak = dTH[n].getAttribute("displayBak");
if( bak==null ){
oTH[n].removeAttribute("displayBak");
}else{
oTH[n].setAttribute("displayBak", bak);
}
oTH[n].style.display = dTH[n].style.display;
}
<?PHP } ?>
while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
if( TRec>nl && _WOPENER._AnchoCols.length==0 ){
for(n=0; n<Destino.getAttribute("eCols"); n++) _WOPENER._AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
}
}catch(e){}
function _RDPaginar(){
var xSpan = '<SPAN style="overflow-x:hidden; float:left; white-space:nowrap; text-overflow:ellipsis; width:100%;">',
oDIV = _WOPENER.DGI('_RDColDIV'),
oTABLA = DGI("BROWSE"),
rh, r, c;
for(rh=0; rh<=parseInt(oTABLA.getAttribute("AltoTH")); rh++) for(c=0; c<oTABLA.rows[rh].cells.length; c++){
if( oTABLA.rows[rh].cells[c].NC!=undefined && oDIV.getAttribute('IniCol'+c)!=undefined ){
oTABLA.rows[rh].cells[c].innerHTML = _WOPENER.DGI("BROWSE").rows[rh].cells[c].innerHTML;
for(r=parseInt(oTABLA.AltoTH)+1; r<oTABLA.rows.length; r++) oTABLA.rows[r].cells[c].innerHTML = xSpan+oTABLA.rows[r].cells[c].innerHTML+'</SPAN>';
}
}
}
<?PHP
if( $_RD!='' ) echo '_RDPaginar();';
?>
DGI("BROWSE").setAttribute('FilterON', _WOPENER.DGI("BROWSE").getAttribute('FilterON'));
DGI("BROWSE").setAttribute('eOrder', _WOPENER.DGI("BROWSE").getAttribute('eOrder'));
DGI("BROWSE").style.display = "inline-table";
<?PHP if( isset($_PAGINCR) ){ ?>
var oRows = Origen.rows,
oTotal = oRows.length,
dTotal = Destino.rows.length;
for(n=Origen.getAttribute("AltoTH")+1; n<oTotal; n++) S(Destino.insertRow(dTotal++)).nodeSwap(oRows[n]);
<?PHP }else{ ?>
var eMenu = _WOPENER.DGI("BROWSE")["eMenu"],
eFunc = _WOPENER.DGI("BROWSE")["func"];
Destino.outerHTML = Origen.outerHTML;
if( eMenu!=undefined ){
top.S(_WOPENER).menuRow("#BROWSE", eMenu, eFunc);
top.S(eMenu, _WOPENER).hidden();
top.S("*[op]", eMenu).css({visibility:""});
}
<?PHP } ?>
_WOPENER.S.scrollSet(_WOPENER.S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});
Destino = _WOPENER.DGI("BROWSE");
Destino.style.width = '';
var TRec = Destino.rows.length;
nl = parseInt(Destino.getAttribute("AltoTH"))+1;
try{
while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
if( TRec>nl ){
for(n=0; n<Destino.getAttribute("eCols"); n++){
if( _WOPENER._AnchoCols[n]>Destino.rows[nl].cells[n].offsetWidth <?=((isset($_VIEW) && isset($_GET["_VIEWFORMAT"]))? "&& false":"")?> ){
Destino.style.width = (parseInt(Destino.offsetWidth) + _WOPENER._AnchoCols[n] - Destino.rows[nl].cells[n].offsetWidth)+"px";
Destino.rows[nl].cells[n].style.width = Destino.children[0].children[n].style.width = _WOPENER._AnchoCols[n]+"px";
}else{
_WOPENER._AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
}
}
}
}catch(e){}
_WOPENER.document.body.setAttribute('SePagino',1);
if(_WOPENER.DGI("_Pie")) _WOPENER.DGI("_Pie").textContent = <?=(ceil($_REG_/$_RowsOnPage)+1)?>;
if(_WOPENER.DGI("_Pie2")) _WOPENER.DGI("_Pie2").textContent = <?=ceil($TotalReg/$_RowsOnPage)?>;
_WOPENER.DGI("DESDE").setAttribute("OldValue", <?=$DesdeList?>);
_WOPENER.DGI("DESDE").value = <?=$DesdeList?>;
_WOPENER.DGI("DESDE").setAttribute('NREG', <?=($_REG_+1)?>);
_WOPENER.DGI("DESDE").setAttribute('NPAG', <?=(floor($_REG_/$_RowsOnPage)+1)?>);
_WOPENER.DGI("TIPO").value = '<?= $_TIPO_ ?>';
_WOPENER.DGI("HASTA").value = <?=$HastaList?>;
_WOPENER.DGI("HASTA").setAttribute("TPAG", <?=$HastaList?>);
_WOPENER.DGI("MAXREC").value = <?=$_RowsOnPage?>;
if( _WOPENER.DGI("oMAXREC")!=null ) _WOPENER.DGI("oMAXREC").value = <?=$_RowsOnPage?>;
<?PHP  if( $_CURSOR && empty($_EDITLIST[0]) ){ ?>
<?PHP  } ?>
if( _WOPENER.DGI('islPageUp')!=null ){
<?PHP if( $_REG_==0 ){ ?>
top.S("#islPageUp",_WOPENER).class("+OFF");
top.S("#islPageDown",_WOPENER).class("-OFF");
<?PHP }else if( $HastaList==(floor($_REG_/$_RowsOnPage)+1) ){ ?>
top.S("#islPageUp",_WOPENER).class("-OFF");
top.S("#islPageDown",_WOPENER).class("+OFF");
<?PHP } ?>
}
<?PHP if( $_WINCAPTION!='' ){ ?>
if( _WOPENER.DGI("_Pie")!=null ){
top.eSWSetStatus(_WOPENER, _WOPENER.DGI("_Pie").parentNode.textContent);
}
<?PHP } ?>
if( _WOPENER.DGI("DESDE").getAttribute('CS')==1 ){
_WOPENER.DGI("DESDE").select();
_WOPENER.DGI("DESDE").setAttribute("CS",0);
}
<?PHP  if( $_LToolsType=='E' || $_LToolsType=='S' || $_LToolsType=='b' || $_ISUBLISTTOOLS=="E" ){ ?>
if( _WOPENER.DGI("oDESDE") ){
_WOPENER.DGI("oDESDE").setAttribute("OldValue", <?=$DesdeList?>);
if(DGI("oDESDE")) DGI("oDESDE").value = <?=$DesdeList?>;
_WOPENER.DGI("oDESDE").setAttribute('NREG', <?=($_REG_+1)?>);
_WOPENER.DGI("oDESDE").setAttribute('NPAG', <?=(floor($_REG_/$_RowsOnPage)+1)?>);
_WOPENER.DGI('oDESDE').value = <?=$DesdeList?>;
_WOPENER.DGI("oHASTA").value = <?=$HastaList?>;
if(DGI("oHASTA")) DGI("oHASTA").setAttribute("TPAG", <?=$HastaList?>);
_WOPENER.DGI("oMAXREC").value = <?=$_RowsOnPage?>;
if( _WOPENER.DGI("oDESDE").getAttribute('CS')==1 ){
if( _WOPENER.DGI("oDESDE").offsetWidth>0 ) _WOPENER.DGI("oDESDE").select();
_WOPENER.DGI("oDESDE").setAttribute("CS",0);
}
<?PHP if( $_LToolsType=='b' ){
if( $DesdeList==1 ) echo 'top.S("#PaginationBarIZ", _WOPENER).class("=ButtonInNO OFF ROUNDED2 NoRight MasMargin");';
else echo 'top.S("#PaginationBarIZ", _WOPENER).class("=ButtonIn ROUNDED2 NoRight MasMargin");';
if( $HastaList==$DesdeList ) echo 'top.S("#PaginationBarDR", _WOPENER).class("=ButtonInNO OFF ROUNDED2 NoLeft MasMargin");';
else echo 'top.S("#PaginationBarDR", _WOPENER).class("=ButtonIn ROUNDED2 NoLeft MasMargin");';
?>
var tabla = top.S("#oDESDE_TABLE", _WOPENER).obj,
tr = tabla.rows, ntr=tr.length, total=<?=$HastaList?>, n, borrar, oTR, oTD;
if( ntr<total ){
for(n=ntr+1; n<=total; n++){
oTR = tabla.insertRow();
oTR.insertCell().innerText = n;
oTR.insertCell().innerText = n;
}
}else if( ntr>total ){
borrar = ntr-total;
for(n=0; n<borrar; n++){
tabla.deleteRow(total);
}
}
var oPaginationBar = top.S(".PaginationBar", _WOPENER).obj;
for(n=0; n<=5; n++){
oPaginationBar.children[n].style.display = "<?=(($_RowsOnPage==$TotalReg)? "none":"inline-flex")?>";
}
<?PHP
echo "top.S(\".Button SPAN[eSelectSpan='oDESDE'] SPAN\", _WOPENER).text('{$DesdeList}');";
$pagActual = $DesdeList;
$PagMultiploDe = $_RowsOnPage;
$TPaginas = $HastaList;
$PagMultiploDe = 5;
$PrimerBoton = ceil(($pagActual/$PagMultiploDe)-1)*$PagMultiploDe+1;
$UltimoBoton = $PrimerBoton+$PagMultiploDe-1;
if( $UltimoBoton>$TPaginas ) $UltimoBoton = $TPaginas;
$box = _ListaBotonesBox($PrimerBoton, $UltimoBoton, $DesdeList, $HastaList);
echo 'top.S("#PaginationBarBT", _WOPENER).html("'.$box.'");';
} ?>
}
<?PHP } ?>
<?PHP if( $_CARDSHOW && $_ISUBLIST==false ){ ?>
_WOPENER._CardEvents();
<?PHP } ?>
if( viewCard ){
top.S(".CONTENEDORCARD",_WOPENER).HTML(oCard.HTML());
if( _WOPENER._ModeCard ) _WOPENER.eCard(1);
}
top.S('.SELECT', _WOPENER).none();
_WOPENER.eHideBusy();
with( _WOPENER ){
MovTitulos();
TitulosON();
MovTitulos();
eHideBusy();
_RecalcSlideTH();
WidthSubTitle();
}
<?PHP
if( $_ISUBLIST==true && $_ISLOPMenu!='' ){
?>
_WOPENER.DGI("BROWSE").onclick = _WOPENER.opISubList;
_WOPENER.DGI("BROWSE").oncontextmenu = _WOPENER.opISubList;
_WOPENER.DGI("BROWSE").style.cursor = 'pointer';
<?PHP
}else{
?>
<?PHP
}
if( count($_CHARTCOL)>0 ) echo "_WOPENER.ChartWidth({$_ChartMax},{$_ChartMin});";
if( $_TOTALSROWS && (ceil($_REG_/$_RowsOnPage)+1)==ceil($TotalReg/$_RowsOnPage) ) echo '_WOPENER.ColorFilaTotales();';
if( !empty($_EDITLIST[0]) ){
echo '_WOPENER.DGI("BROWSE").oncontextmenu = _WOPENER.elEdit;';
if( $_EDITLIST[3]==-1 || $_EDITLISTCLICK || $Objeto=="Lml" ) echo '_WOPENER.DGI("BROWSE").onclick = elEdit;';
}
if( count($_TIPTD)>0 ){
echo "_WOPENER._MasInfoEvent();";
}
if( isset($_FunctionNextPage) && $_FunctionNextPage!='' ) echo '_WOPENER.'.$_FunctionNextPage.';';
?>
<?PHP  if( !$_ISUBLIST ){ ?>
_WOPENER.Recalcula(1, true);
_WOPENER.eDelHelp();
<?PHP  } ?>
<?PHP  if( !isset($_PAGINCR) ){ ?>
_WOPENER.MovTitulos();
<?PHP  } ?>
if( _WOPENER.ChartReload!=undefined ) _WOPENER.ChartReload();
<?PHP
if( isset($_FunctionLastPage) && $_FunctionLastPage!='' && (ceil($_REG_/$_RowsOnPage)+1) == ceil($TotalReg/$_RowsOnPage) ) echo '_WOPENER.'.$_FunctionLastPage.';';
?>
if( _WOPENER.PAGINA.style.width=="" ) _WOPENER.PAGINA.style.width = "";
try{
S.loading(_WOPENER, 0);
}catch(e){}
_WOPENER._MovTitulos();
if( _WOPENER.DGI('BUSCAR')!=null && _WOPENER.DGI('BUSCAR').offsetWidth>0 ) _WOPENER.eBuscarFoco();
_WOPENER.eVisitedPut();
</script>
<?PHP
if( $_PHPNEXTPAGE!='' ){
$tmpFile = GrabaTmp('l_phpnextpage', $_PHPNEXTPAGE, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPNEXTPAGE);
}
?>
<script type="text/javascript">
_WOPENER.TitulosON();
_WOPENER.S.scrollSet(_WOPENER.S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});
<?= (($_TGrupos==0)?'_WOPENER._FilterExeNewPag();':'') ?>
_WOPENER.S.scrollSet(_WOPENER, {left:0, top:0});
_WOPENER._toPublic();
_WOPENER._3CXClear();
top.eClearPag(window);
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}else if( $TotalReg==$nRegShow && $_ISUBLIST==true && $_ISLOPTH!='' ){ ?>
<SCRIPT type="text/javascript" name=eDes>
if( DGI('islPageDown')!=null ){
<?PHP if( $_ISUBLISTMODE=='cR' || $_ISUBLISTMODE=='bR' ){ ?>
DGI('islPageUp').style.visibility = 'hidden';
DGI('islPageDown').style.visibility = 'hidden';
<?PHP }else{ ?>
DGI('islPageDown').disabled = true;
DGI('islPageDown').className = "OFF";
<?PHP } ?>
}
</SCRIPT>
<?PHP
}
if( $_CARDSHOW && $_ISUBLIST==false ){
?>
<script type="text/javascript">
_CardEvents();
</script>
<?PHP
}
if( !empty($_PrimerosReg) && $_PrimerosReg<0 && !empty($_PrimerosRegTxt) && $TotalReg>abs((int)$_PrimerosReg) ){
echo "<table id=Paginacion border=0 cellspacing=0 cellpadding=0 style='width:100%;background:transparent; margin-top:9px'><tr><td style='background:transparent;'>";
echo str_replace('#', eNumberFormat((int)$_PrimerosReg*-1,0), $_PrimerosRegTxt);
echo '</td></tr></table>';
}
if( !empty($_FOOTTITLE) ){
echo "<table id=FootTitle border=0 cellspacing=0 cellpadding=0 style='width:100%;background:transparent;display:table;'><tr><td style='background:transparent;'>";
$Long = mb_strlen(ob_get_contents());
$php_errormsg = '';
if( mb_substr($_FOOTTITLE,-1)!=';' ) $_FOOTTITLE .= ';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_FOOTTITLE);
@eval($_FOOTTITLE);
_ShowError( $php_errormsg, '_FOOTTITLE', $LenDoc, $_FOOTTITLE );
echo '</td></tr></table>';
}
if( $_LToolsType=='E' ) _LToolsPagination();
if( $_ISUBLIST==true && $_ISUBLISTTOOLS=="E" ){
_LToolsPagination(true);
}
if( $_SORTLIST!="" ){
?>
<SCRIPT type="text/javascript" name=eDes>
_SortList = '<?=$_SORTLISTNCOL?>';
var _NumOCAMPO = new Array(),
Obj = DGI("BROWSE").children[0].children, n;
for(n=0; n<Obj.length; n++) _NumOCAMPO[Obj[n].getAttribute("oCAMPO")] = n;
var _smFila = 0;
function MovCampo(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return eClearEvent();
Obj = Obj.parentNode;
if( Obj.className=='PieLista' ) return eClearEvent();
if( _Mover ){
if( Obj.className=='SelectON' ){
S.info(234, .7, "warning");
_Mover = false;
Obj.className = '';
return eClearEvent();
}
try{
eval('FUNCTION_SortList')('S', BROWSE.rows[_smFila], Obj);
}catch(e){}
if( BROWSE.SORTCND!=null ){
var CndCol = BROWSE.SORTCND.split(','), n;
for(n=0; n<CndCol.length; n++){
if( eTrim(BROWSE.rows[_smFila].cells[_NumOCAMPO[CndCol[n]]].textContent)!=eTrim(Obj.cells[_NumOCAMPO[CndCol[n]]].textContent) ){
top.eAlert('',"<?= $__Lng[54] ?>",'A','I');
return eClearEvent();
}
}
}
S.info(235, .7);
BROWSE.rows[_smFila].className = '';
if( Obj.rowIndex>_smFila ){
<?PHP if( $_SLIDECOL>0 ){ ?>
var row = TablaTV.children[0].insertRow(Obj.rowIndex+1-1-S("#BROWSE.AltoTH"));
row.outerHTML = BROWSE.rows[_smFila-1-S("#BROWSE.AltoTH")].outerHTML;
TablaTV.children[0].deleteRow( Obj.rowIndex+1-1-S("#BROWSE.AltoTH") );
TablaTV.children[0].rows[_smFila-1-S("#BROWSE.AltoTH")].className = '';
<?PHP } ?>
var row = BROWSE.insertRow(Obj.rowIndex+1);
row.outerHTML = BROWSE.rows[_smFila].outerHTML;
BROWSE.deleteRow( _smFila );
}else{
<?PHP if( $_SLIDECOL>0 ){ ?>
var row = TablaTV.children[0].insertRow(Obj.rowIndex-1-S("#BROWSE.AltoTH"));
row.outerHTML = BROWSE.rows[_smFila+1-1-S("#BROWSE.AltoTH")].outerHTML;
TablaTV.children[0].deleteRow( _smFila+1-1-S("#BROWSE.AltoTH") );
TablaTV.children[0].rows[Obj.rowIndex-1-S("#BROWSE.AltoTH")].className = '';
<?PHP } ?>
var row = BROWSE.insertRow(Obj.rowIndex);
row.outerHTML = BROWSE.rows[_smFila+1].outerHTML;
BROWSE.deleteRow(_smFila+1);
}
row.className = '';
Obj.className = '';
_SortListSave = true;
try{
eval('FUNCTION_SortList')('E', cTR, Obj);
}catch(e){}
}else{
S.info(233, .7, "ok");
Obj.className = 'SelectON';
_smFila = Obj.rowIndex;
<?PHP if( $_SLIDECOL>0 ){ ?>
TablaTV.children[0].rows[_smFila-1-S("#BROWSE.AltoTH")].className = 'SelectON';
<?PHP } ?>
}
_Mover = !_Mover;
return  eClearEvent();
}
_GetNumCol();
function GrabarSort(){
var rows = BROWSE.rows,
SCol = '<?= $_DBINDEX; ?>',
COrden = '<?= $_SORTLIST; ?>',
nc = eGCol(COrden),
tmp = SCol.split(','),
tipo = SCol.split(','), c, o, txt='';
for(c=0; c<tmp.length; c++){
tipo[c] = _NumCol[tmp[c]];
tmp[c] = eGCol(tmp[c]);
switch( BROWSE.children[parseInt(tipo[c])+1].td ){
case "*": case "+": case "-": case "+,": case "-,":
tipo[c] = 'N';
break;
default:
tipo[c] = '';
}
}
for(c=1+(S("#BROWSE.AltoTH")*1); c<rows.length; c++){
if( rows[c].getAttribute("libre")!="1" && rows[c].className!='PieLista' ){
for(o=0; o<tmp.length; o++){
if( tipo[o]=='N' ){
txt += S.thousandsClear(rows[c].cells[tmp[o]].textContent);
}else{
txt += rows[c].cells[tmp[o]].textContent+',';
}
}
txt += (c-(S("#BROWSE.AltoTH")*1))+'|';
}
}
top.eCallSrv(window, 'edes.php?E:$lsort.inc&T=<?=$_oDBTABLE?>&I=<?=$_DBINDEX?>&S=<?=$_SORTLIST?>&R='+txt+((typeof(_DB)!='undefined' )? "&_DB='"+_DB+"'":""));
}
</SCRIPT>
<?PHP if( $_ISUBLIST==false ){ ?>
<br><br>
<table class=AddButton onclick="GrabarSort()" title="" border="0px" cellspacing="0px" cellpadding="0px" style="position:fixed; left:50%; transform:translateX(-50%); display:inherit"><tbody><tr>
<td class="ICONSUBMIT"><i class="ICONINPUT ICONUPDATE">U</i></td>
<td style="padding-left:4px"><?= $__Lng[17] ?></td></tr></tbody>
</table>
<?PHP } ?>
<?PHP
}
$xTotalReg = eNumberFormat($TotalReg, 0);
$ConPaginacion = false;
$xShowTotalRecords = "";
$SeVePie = (($_ISUBLIST==true)? ' style="display:none"' : '');
if( $_WINCAPTION!='' ) $SeVePie = ' style="display:none"';
if( $_LimitOn ){
}else if( $_PrimerosReg<0 && $TotalReg>$_PrimerosReg*-1 ){
$__Lng[18] = eReplaceVar($__Lng[18],
'#1', ($_PrimerosReg*-1),
'#2', $xTotalReg
);
$xShowTotalRecords = "<center class=Pie{$SeVePie}>".$__Lng[18].'</center>';
}else if( $TotalReg>$_DBLIMIT ){
$__Lng[19] = eReplaceVar($__Lng[19],
'#1', $_DBLIMIT,
'#2', $xTotalReg
);
$xShowTotalRecords = "<center class=Pie{$SeVePie}>".$__Lng[19].'</center>';
}else if( $TotalReg>$_RowsOnPage ){
$ConPaginacion = true;
if( $_ISUBLISTMODE=="" ){
$__Lng[20] = eReplaceVar(eAsciiToCode($__Lng[20], false),
'#1', '<span id=_Pie>'.(ceil($_REG_/$_RowsOnPage)+1).'</span>',
'#2', '<span id=_Pie2>'.ceil($TotalReg/$_RowsOnPage).'</span>',
'#3', $xTotalReg
);
$xShowTotalRecords = "<center class=Pie{$SeVePie}>".$__Lng[20].'</center>';
if( $_LToolsType=="e" || ($_LToolsType=="" && $SeVe=="" && !$_LimitOn) ){
$xShowTotalRecords = str_replace("<center ","<center style='margin-top:0px' ",$xShowTotalRecords);
?>
<center>
<TABLE id="ToolsPaginate" cellspacing=0px cellpadding=0px border=0px style="display:table;border-collapse:collapse;margin-top:7px;"><TR>
<TD style='padding-left:1px'><I class="ICONINPUT" title="<?=$__Lng[25]?>" id=_KEY36 onclick='_PagNormal();Paginar("I");'>%</I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[26]?>" id=_KEY33 onclick='_PagNormal();Paginar("<");'><</I></TD>
<TD><?=$xShowTotalRecords?></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[27]?>" id=_KEY34 onclick='_PagNormal();Paginar(">");'>></I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[28]?>" id=_KEY35 onclick='_PagNormal();Paginar("F");'>&</I></TD>
</table>
</center>
<?PHP
$xShowTotalRecords = "";
}else if( $_LToolsType=="b" || ($_LToolsType=="" && $SeVe=="" && !$_LimitOn) ){
$PrimerBoton = $DesdeList;
$UltimoBoton = $HastaList;
$PagMultiploDe = $_RowsOnPage;
$TPaginas = $HastaList;
$pagActual = 1;
$PagMultiploDe = 5;
$UltimoBoton = $PrimerBoton+$PagMultiploDe-1;
if( $UltimoBoton>$TPaginas ) $UltimoBoton = $TPaginas;
?>
<div class="PaginationBar ROUNDED2 SHADOW">
<span class="Button ROUNDED2 SHADOW">
<span id="PaginationBarIZ" class="ButtonIn<?=(($pagActual==1)?"NO OFF":"")?> ROUNDED2 NoRight MasMargin" onclick="_PagNormal();Paginar('<');"><i class="ICONINPUT">&#395;</i> <?=$__Lng[121]?></span>
<span id="PaginationBarDR" class="ButtonIn<?=(($pagActual==$TPaginas)?"NO OFF":"")?> ROUNDED2 NoLeft MasMargin" onclick="_PagNormal();Paginar('>');"><?=$__Lng[122]?> <i class="ICONINPUT">&#396;</i></span>
</span>
<span class="ButtonMargin"></span>
<span class="Button ROUNDED2 SHADOW" id="PaginationBarBT" onclick="_PaginationBar()">
<?PHP
echo _ListaBotonesBox($PrimerBoton, $UltimoBoton, $pagActual, $TPaginas);
?>
</span>
<span class="ButtonMargin"></span>
<span class="Button ROUNDED2 SHADOW">
<span class="ButtonIn ROUNDED2" eSelectSpan="oDESDE" e-SelectRows=20 onclick="S.selectClick(this, '_PaginationBar');"><?=$__Lng[123]?><span eValue>1</span> <i class="ICONINPUT">&#365;</i></span>
<input name="oDESDE" style="display:none">
<input name="oHASTA" style="display:none">
<?php
$dim = array();
for($n=1; $n<=$TPaginas; $n++) $dim[]=$n;
eSelectTable("oDESDE", $dim, false, true);
?>
</span>
<span class="ButtonMargin"></span>
<span class="Button ROUNDED2 SHADOW" eSelectSpan="oMAXREC" e-SelectRows=20 onclick="S.selectClick(this, '_PaginationBar');">
<span class="ButtonIn ROUNDED2"><?=$__Lng[124]?><span eValue>5</span> <i class="ICONINPUT">&#365;</i></span>
<input name="oMAXREC" style="display:none" pk=1>
<?php
$sTotalReg = $TotalReg+($_PintoTotales? 1:0);
$tmp = array(5,10,25,50,100,500,1000);
$dim = array();
for($n=0; $n<count($tmp); $n++){
if( $tmp[$n]<=$sTotalReg ) $dim[] = $tmp[$n];
}
if( $sTotalReg!=$dim[count($dim)-1] && $sTotalReg<1000 ) $dim[] = $sTotalReg;
$alFinal = array();
if( $sTotalReg>1000 ) $alFinal = array($sTotalReg, $sTotalReg, $__Lng[77]." ".eNumberFormat($sTotalReg));
eSelectTable("oMAXREC", $dim, false, true, $alFinal);
?>
</span>
</div>
<?PHP
}
}
}else if( isset(SETUP::$List['ShowTotalRecords']) && SETUP::$List['ShowTotalRecords'] && $TotalReg>1 ){
if( !in_array("#", $_COLSOP) ){
$xShowTotalRecords = "<center class=Pie{$SeVePie}>".eReplaceVar($__Lng[21], '#', ($TotalReg-(($_TOTALSROWS)?1:0))).'</center>';
}
}
if( empty($_LToolsType) && !empty($xShowTotalRecords) ){
echo $xShowTotalRecords;
}
unset($SeVePie, $xShowTotalRecords);
echo '</span>';
echo "<SPAN id='UtilSeek' class='TOOLBAR' gsHelp style='position:absolute;display:none;height:1px;'>";
echo "<TABLE gsHelp cellspacing=0px cellpadding=0px border=0px style='display:table;border-collapse:collapse;'>";
echo "<TR>";
echo '<TH class=TITULO colspan=2 style="cursor:move">'.$__Lng[29].'</TH>';
echo '<TH class=TITULO style="padding-right:0px;"><i class="ICONWINDOW" onclick="S(this).help(\'$seek\')" ww="S.info(\'Ayuda\')" title="'.$__Lng[105].'">@</I></TH>';
echo '<TH class=TITULO style="padding-left:0px;"><i class="ICONWINDOW" onclick="S(\'.SEEK\').class(\'-SEEK\');S(\'#UtilSeek\',window).none();" title="'.$__Lng[67].'">5</I></TH>';
echo '</TR><TR>';
echo '<TD><INPUT TYPE="text" NAME="BUSCAR" class="EDITABLE" onfocus=S.key("#",15) onclick="this.select()" VALUE="" SIZE=15 MAXLENGTH=30 style="width:100px" onkeydown="aBuscar(this.value)" onblur="_tSeek=-1" onchange="BROWSE.removeAttribute(\'SeekFC\')" title="'.$__Lng[29].'"></TD>';
echo '<TD><i class="ICONINPUT" onclick="Buscar(DGI(\'BUSCAR\').value,-1)" oncontextmenu="Buscar(DGI(\'BUSCAR\').value,-1)" title="'.$__Lng[30].'"><</i></TD>';
echo '<TD><i class="ICONINPUT" onclick="Buscar(DGI(\'BUSCAR\').value,0)" oncontextmenu="Buscar(DGI(\'BUSCAR\').value,0)" title="'.$__Lng[31].'">S</i></TD>';
echo '<TD><i class="ICONINPUT" onclick="Buscar(DGI(\'BUSCAR\').value,1)" oncontextmenu="Buscar(DGI(\'BUSCAR\').value,1)" title="'.$__Lng[32].'">></i></TD>';
echo '</TR></TABLE>';
echo '</SPAN>';
echo "<SPAN id='oUtilFilter' TC=1 class='TOOLBAR' gsHelp style='position:absolute;display:none;height:1px;z-index:1;'>";
echo "<TABLE gsHelp cellspacing=0px cellpadding=0px border=0px>";
echo "<TR>";
echo '<TH class=TITULO style="cursor:movewidth:100%">'.$__Lng[33].'</TH>';
echo '<TH class=TITULO style="text-align:right; display:-webkit-box; margin-top:0;">';
echo '<i class="ICONWINDOW" onclick="_FilterHelp()" title="'.$__Lng[105].'" style="margin-right:5px;">@</i>';
echo "<i class='ICONWINDOW' onclick='_FilterMini()' oncontextmenu='_FilterSort()' title='{$__Lng[119]}'>2</I>";
echo "<i class='ICONWINDOW' onclick='_FilterClose()' oncontextmenu='_FilterCloseAll()' title='{$__Lng[120]}'>5</I>";
echo '</TH>';
echo '</TR>';
echo '<TR>';
echo '<TD colspan=1 class=FilterSubTitle></TD><td></td>';
echo '</TR>';
echo '<TR>';
echo '<TD colspan=2>';
echo "<TABLE cellspacing=0px cellpadding=0px border=0px>";
echo '<TR>';
echo '<td><INPUT TYPE="text" id="ColFilter" class="EDITABLE" onclick="this.select()" VALUE="" SIZE=30 MAXLENGTH=60 eRequired=false style="width:200px;margin-left:5px" onkeydown="_FilterExe(this.value)" onkeypress="_FilterKey()" on-focusout="_FilterExe(this.value,1)" title="'.$__Lng[73].'"></TD>';
echo '<td><img src="g/t_group.png" onclick="_FilterGroup(this)" title="'.$__Lng[115].'"></TD>';
echo '<td><img src="g/l_filter_0.png" style="margin-right:5px" onclick=_FilterSet() title="'.$__Lng[114].'"></TD>';
echo '<td><img src="g/t_op_delete.gif" style="visibility:hidden" onclick=_FilterDel() title="'.$__Lng[116].'"></TD>';
echo '<td><img src="g/t_op_insert.gif" style="margin-right:5px" onclick=_FilterAdd() title="'.$__Lng[113].'"></TD>';
echo '</TR>';
echo '</TABLE>';
echo '</TD>';
echo '</TR>';
echo '<TR>';
echo '<TD align=center>';
echo '<table border=0px cellspacing=0px cellpadding=0px width="1px">';
echo '<tr>';
echo '<td>';
eAddButton("&#183;", $__Lng[109], "_FilterExe('',-1)", $__Lng[110], "", "ZOOM90");
echo '</td>';
echo '<td>&nbsp;&nbsp;&nbsp;</td>';
echo '<td>';
eAddButton("&#278;", $__Lng[111], "_FilterExe('',1)", $__Lng[112], "", "ZOOM90");
echo '</td>';
if( isset($_JSSELROWS) ){
echo '<td>&nbsp;&nbsp;&nbsp;</td>';
echo '<td>';
eAddButton("&#106;", "Marcar", "_FilterExe('',1,0)", $__Lng[117], "", "ZOOM90");
echo '</td>';
}
echo '</tr>';
echo '</table>';
echo '</TD>';
echo '<TD align=right>';
echo '</TD>';
echo '</TR>';
echo '</TABLE>';
echo '</SPAN>';
if( $_ISUBLIST==false ){
$ocultar = $_NOTITLE;
if( $_SUBLISTADO_==1 && $_FixList ) $ocultar = false;
?>
<table id="BoxUtilListICO" border=0 width=1px cellspacing=0 cellpadding=0 style="display:<?=(($_ListToolsMenuType=="H" || $_ListToolsMenuType=="B")?"none":"table")?>;background:transparent;position:fixed;top:3px;right:32px;z-index:999;<?=($ocultar==true ? 'display:none':'')?>"><tr>
<?PHP
for($n=0; $n<count($_TITLEICON); $n++){
echo '<td style="background:transparent">'.$_TITLEICON[$n];
}
echo '<td style="background:transparent">';
?>
<i class='ICONINPUT' id='UtilListICO' out='0' gsHelp onclick='eShowLTools()' title="<?=$__Lng[22]?>">=</i>
<?PHP
echo '</tr></table>';
eJS('S("#BoxUtilListICO").css("right", S("#BoxUtilListICO").obj.offsetWidth+3);');
}
$ok = count($_DimMenuExp);
if( $ok ){
eContextPut('Fa:$a/d/export_doc.edf');
}
$_DimMenu = array();
if( count($_DimMenuExp)>0 ){
if( $_ExportExtras ){
$_DimMenuExp[] = array("","","-");
if( !$_KeyRequired ){
$_DimMenuExp[] = array("ExpPass", "g", $__Lng[101],'','',' class=OFF');
}
$_DimMenuExp[] = array("ExpMail", "n", $__Lng[102],'','',' class=OFF');
}
$_DimMenu[] = array("Exportar", "v", $__Lng[103]);
}
if( $_DimMenuExp[0][0]=="IMP" ){
$_DimMenu[] = $_DimMenuExp[0];
}
unset($_ExportSetup);
if( $_ISUBLIST==false && $SeVe=='' && !$_LimitOn && !$_OptionsInListButton ){
$_DimMenu[] = array('PAG', '(', $__Lng[99]);
}
if( ($_FixList || ($_SUBLISTADO_!=1 && $_SubMode!='l')) && count($_COLSOP)==0 && !isset($_OPTIONSINLIST) ){
if( similar_text('*W',$_NOTOOLS)==0 && $_SubMode!='l' ) $_DimMenu[] = array('ModoSub', 'E', $__Lng[71]);
}
if( $_TOOLSCMP!='' && !$_TienePaginacion ) $_DimMenu[] = array("CMP", "g/l_cmp.gif", $__Lng[100]);
if( $_ISUBLIST==false && (count($_COLSOP)==0 || $_COLSOP[0]!="S") ) $_DimMenu[] = array('COLSVIEW', '&#29;', $__Lng[83]);
if( $_ISUBLIST==false ) $_DimMenu[] = array('OFFSET', '&#313;', $__Lng[84]);
if( $_ISUBLIST==false ) $_DimMenu[] = array('BORDERLEFT', '&#413;', $__Lng[106]);
if( !$_CARD_OFF && $_ColVisibles>1 && SETUP::$List['CardSwitch'] && $_ISUBLIST==false && (count($_COLSOP)==0 || $_COLSOP[0]!="S") && $_PSOURCE=="WWORK" ){
$_DimMenu[] = array("CARD", "Y", $__Lng[88]);
}
if( count($_COLSOP)>0 && $_COLSOP[0]=="S" && $TotalReg>1 ){
$_DimMenu[] = array('Resumen', '&#187;', $__Lng[80]);
}
if( !isset($_GET["_ISUBLIST"]) && ($_SubMode=="l" || $_SubMode=="cl") ){
$i=0;
for($n=0; $n<count($_Form); $n++){
if( !(eSubstrCount($_Form[$n][6], '*')>0 || $_ALIGN[$n]==' id=o') && preg_match('/^(\+|\+\,|\-|\-\,)$/u', $_Form[$n][2]) ) $i++;
}
if( $i>0 ){
if( SESS::$_D_<>"" ){
if( $_NOTOOLS=='' || similar_text('*C',$_NOTOOLS)==0 ){
$_DimMenu[] = array("CHARTSYSTEM", "&#91;", $__Lng[76], "class=ICONDEVELOPMENT");
}
}
if( $_ChartDefinitionUser ){
if( $_NOTOOLS=='' || similar_text('*C',$_NOTOOLS)==0 ){
$_DimMenu[] = array("CHART", "[", $__Lng[75]);
}
}
}
}
if( $_EDITLIST[3]==2 ){
$_DimMenu[] = array('UnKill', '&#275;', $__Lng[104]);
}
if( isset($_ADDLTOOLS) ){
for($n=0; $n<count($_ADDLTOOLS); $n++){
$icon = "";
$txt = $_ADDLTOOLS[$n][0];
if( $txt[0]=="[" ){
list($icon, $txt) = explode("]", $txt);
$icon = eIcon(mb_substr($icon,1));
}else if( $txt[0]=="<" ){
eExplodeLast($txt, ">", $icon, $txt);
}else{
$icon = "<i class='ICONWINDOW'>b</i>";
}
$icon = str_replace('"', "'", $icon);
$txt = str_replace('"', "'", $txt);
$func = str_replace('"', "'", $_ADDLTOOLS[$n][1]);
$_DimMenu[] = array($func, $icon, trim($txt));
}
}
if( $_GET['_BAK']=='1' ){
eExplodeOne(str_replace('&_BAK=1','',$_SERVER['QUERY_STRING']), ':', $url1, $url2);
$URL = str_replace('"', '\\"', mb_substr($url1,0,-1).':'.$url2);
?>
<script type="text/javascript">
function _Back2(){
var t = document.FieldCondi.elements, n, Datos = '&_BAK=1&_ASSIGN=c';
for(n=0; n<t.length; n++){
if( t[n].name.substr(0,1)!='_' && t[n].value!='' ) Datos += '&'+t[n].name+'="'+t[n].value+'"';
}
location.href = "edes.php?<?= $URL ?>"+Datos+eSessionAddUrl();
}
function _Back(){
top.eLoading(1, window);
setTimeout('_Back2()', 100);
}
</script>
<?PHP
}
?>
<script type="text/javascript">
var _ExportPassword=_ExportMail=false, _ExportRecipient=<?=(($_DocLabelUserTo!='' || $_DocSeeUser)?'true':'false')?>,
_DocExportOutside = <?=eBoolean($_DocExportOutside)?>,
_KeyDocuments = <?=eBoolean($_KeyDocuments)?>,
_TitleIconView = <?=eBoolean(SETUP::$List["TitleIconView"])?>,
_eUserName = '<?=eQuote(SESS::$_UserName)?>',
_cListGrid = '<?=SETUP::$CSSDynamic['cListGrid']?>',
_ToolsMenuType = '<?=SETUP::$List['ToolsMenuType']?>',
_lng107 = "<?=$__Lng[107]?>",
_lng80 = "<?=$__Lng[80]?>",
_lng38 = "<?=$__Lng[38]?>",
_lng88 = "<?=$__Lng[88]?>",
_LToolsIcons=[["-Menú"]<?PHP
for($n=0; $n<count($_DimMenu); $n++){
if( count($_DimMenu[$n])==1 ){
echo ",['".$_DimMenu[$n][0]."']";
}else{
echo ',["'.$_DimMenu[$n][2].'","'.$_DimMenu[$n][1].'",';
if( $_DimMenu[$n][0]=="Exportar" ){
echo "[";
echo "['-".$_DimMenu[$n][2]."']";
foreach($_DimMenuExp as $key=>$value){
if( gettype($key)=="string" ) continue;
$i = $key;
if( $_DimMenuExp[$i][0]=="IMP" ){
continue;
}
if( count($_DimMenuExp[$i])==6 ){
echo ',["'.$_DimMenuExp[$i][2].'","'.$_DimMenuExp[$i][1].'","'.$_DimMenuExp[$i][0].'","'.$_DimMenuExp[$i][3].'","'.$_DimMenuExp[$i][4].'","'.$_DimMenuExp[$i][5].'", 1]';
}else if( count($_DimMenuExp[$i])==4 ){
echo ',["'.$_DimMenuExp[$i][2].'","'.$_DimMenuExp[$i][1].'","'.$_DimMenuExp[$i][0].'","'.$_DimMenuExp[$i][3].'"]';
}else{
echo ',["'.$_DimMenuExp[$i][2].'","'.$_DimMenuExp[$i][1].'","'.$_DimMenuExp[$i][0].'"]';
}
}
echo "]";
}else{
echo '"'.$_DimMenu[$n][0].'"';
if( count($_DimMenu[$n])==4 ) echo ',"","","'.$_DimMenu[$n][3].'"';
}
echo ']';
}
}
echo '];';
if( $_WINCAPTION!='' || $_WINTITLE!="" ){
global $_TITLE;
if( ($_WINCAPTION=='' || $_WINCAPTION=='#') && $_TITLE!='' ) $_WINCAPTION = $_TITLE;
if( $_WINCAPTION!="" && $_WINTITLE!="" ) $_WINCAPTION = $_WINTITLE;
}
echo "\nRecalc_LToolsIcons();\n";
echo "Recalc_WinHeader({";
echo "SWMenuAdd:".eBoolean( (count($_TITLEICON)>0 || count($_DimMenu)>0) && SETUP::$List['ToolsMenuType']!="B" );
echo ", winCaption:'".str_replace('&#183;', ' ', str_replace("'", "\'", $_WINCAPTION))."'";
echo ", Paginacion:".eBoolean( $_PrimerosReg<0 && !empty($_PrimerosRegTxt) && $TotalReg>abs((int)$_PrimerosReg) );
echo "});\n";
echo "</SCRIPT>";
echo $__Enter;
echo '<DIV id=TablaTH STYLE="z-index:2; display:none; position:absolute;"></DIV>';
echo '<DIV id=TablaTV STYLE="z-index:1; display:none; position:absolute;"></DIV>';
echo '<DIV id=TablaTE STYLE="z-index:3; display:none; position:absolute;"></DIV>';
echo '<SCRIPT type="text/javascript" name=eDes>';
if( isset($_WINSPLITE[3]) ){
echo 'setTimeout(function(){S.eventFire(S("#BROWSE TBODY TR TD").obj, "click");}, 1);';
}
if( $_TOTALSROWS && $TotalReg<=$_RowsOnPage ) echo 'ColorFilaTotales();';
if($_LISTWIDTH!=""){
echo "S('#BROWSE').css('width:{$_LISTWIDTH}').attr({widthFixed:1});";
}
?>
S("#BROWSE").css("display:table");
var _TotalRec = <?= ((int)$TotalReg)+($_PintoTotales? 1:0) ?>,
_Grafica = new Array();
_cDeslizante = <?= $_SLIDECOL ?>;
_ColorOrigen = BROWSE.style.background;
if( _MAXRECFULL ){
_cDeslizante = 0;
}
<?PHP if( $_CHANGEFILTERMEMORY ){ ?>
S("TH[nc]", "#BROWSE").each(function(k, o){
o.style.width = o.offsetWidth+"px";
});
S("#BROWSE").css({width:BROWSE.offsetWidth});
S("#BROWSE TBODY TR").each(function(k, o){
<?PHP
if( $_CHANGEFILTERFULL ){
echo 'S(".ButtonMultiple TABLE[ePK=\'"+o.cells[0].innerText+"\'] TD").css({fontWeight:"bold"});';
echo '_PaginarFilter(o.cells[0].innerText);';
echo 'S(":_Filter_View_").val(o.cells[0].innerText);';
}else{
if( $_POST[$_CHANGEFILTERMEMORY]!='' ){
$filtrarRec = "'".mb_substr($_POST[$_CHANGEFILTERMEMORY],1,-1)."'";
}else{
$filtrarRec = 'o.cells[0].innerText';
}
echo "_ChangePagina({$filtrarRec});";
echo "S(':_Filter_View_').val({$filtrarRec});";
}
?>
return null;
});
<?PHP } ?>
<?PHP
if( !$_ConChartSWF ){
for( $n=0; $n<count($_CHART); $n++ ) echo '_Grafica['.$n.'] = "'.$_CHART[$n].'";';
echo 'var _TituloGraf = "'.str_replace('"','\"',str_replace('&NBSP;',' ',str_replace('<BR>',' ',str_replace(CHR13.CHR10,'<BR>',$_TITLE)))).'";';
}
for($n=0; $n<count($_TH_td); $n++) echo "_TH_td[{$n}]='{$_TH_td[$n]}';";
?>
var _FilaConTotales = <?= (count($_COLSOP)>0) ? 'true':'false'; ?>;
<?PHP
if( count($_TIPTD)>0 ){
$DimMaxInfo = array();
$_vCol = array();
for($n=0; $n<$NCampos; $n++) $_vCol[$n] = '0';
for($i=0; $i<count($_TIPTD); $i++){
$x_pCol = '';
$tmpT = explode('|', $_TIPTD[$i]);
$tmpT[0] = trim($tmpT[0]);
$tmpT[3] = trim($tmpT[3]);
$tmp = explode(',', $tmpT[0] );
if( $tmpT[0]=='*' ){
for($n=0; $n<$NCampos; $n++) $_vCol[$n] = ($i+1)."";
}else{
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
if( is_string($tmp[$n]) ){
$_vCol[$_pCol[$tmp[$n]]] = ($i+1)."";
}else{
$_vCol[$tmp[$n]] = ($i+1)."";
}
}
}
$txt = '';
$tmp = explode(',', $tmpT[1]);
for($n=0; $n<count($tmp); $n++){
if( $x_pCol!='' ) $x_pCol .= ",";
$x_pCol .= 'eGCol("'.trim($tmp[$n]).'")';
if( $txt!='' ){
$txt .= '+"<br>"+';
}
$txt .= "_TextArea(obj.cells[_pCol{$i}[{$n}]].innerHTML)";
}
$tmpT[2] = trim($tmpT[2]);
if( $tmpT[2]!='' ){
$tmpT[2] = '"<center>'.str_replace(' ','&nbsp;',$tmpT[2]).'</center><div id=MasInfoDIV>"+'.$txt.'+"</div>";';
}else{
$tmpT[2] = '"<div id=MasInfoDIV>"+'.$txt.'+"</div>";';
}
array_push($DimMaxInfo, str_replace('<br><br>','<br>',$tmpT[2]));
echo "var _pCol{$i} = new Array({$x_pCol}, 0, '{$tmpT[3]}');";
}
$x_vCol = '';
for($n=0; $n<$NCampos; $n++){
if( $x_vCol!='' ) $x_vCol .= ',';
$x_vCol .= $_vCol[$n];
}
echo 'var _vCol = new Array('.$x_vCol.');';
echo 'document.write("<span id=MasInfo style=\'z-index:5;\'></span>");';
echo $__Enter;
?>
function MasInfoOn(){
var el = S.event(window);
if( el.tagName!='TD' || _vCol[el.cellIndex]==0 ) return;
var obj = el.parentNode,
Inf = DGI("MasInfo"), p, w="";
if( TablaTV.contains(el) ) obj = BROWSE.rows[el.parentNode.rowIndex+1];
try{
switch( _vCol[el.cellIndex] ){
<?PHP
for($i=0; $i<count($DimMaxInfo); $i++){
echo 'case '.($i+1).":\n";
echo 'Inf.innerHTML = '.$DimMaxInfo[$i]."\n";
echo "p = _pCol{$i}.length-1;\n";
echo "w = _pCol{$i}[p];\n";
echo "break;\n";
}
?>
}
}catch(e){}
if( !/<img /i.test(S(Inf).html()) && S(Inf).text()=="" ) return;
if( w=="" ){
Inf.style.width = "auto";
}else{
S(Inf).css("width", w);
}
S(el).around(Inf, {display:"block"});
var a = S(Inf).css("width,height"),
s = S.screen(window);
if( s.w<(a.width*0.9) || s.h<(a.height*0.9) ){
if( s.w/a.width > s.h/a.height ){
S("img",Inf).obj.style.height = (s.h*0.9)+"px";
}else{
S("img",Inf).obj.style.width = (s.h*0.9)+"px";
}
S(el).around(Inf, {display:"block"});
}
}
_MasInfoEvent();
<?PHP  } ?>
</SCRIPT>
<I id="PROCESANDO" class="ICONLOADING" onclick='this.style.display="none"'>r</I>
<?PHP
$_NOTOOLS .= $_DEFAULTNOTOOLS;
if( $_SUBLISTADO_==1 ){
echo '<i id="SubVentana" class="ICONMENU" style="display:none">E</i>';
}else{
echo '<i id="SubVentana" class="ICONMENU" style="display:none">A</i>';
}
if( $SeVe=='' && !$_LimitOn ){
echo '<SPAN id="UtilList" class="TOOLBAR" gsHelp style="position:absolute;display:none;padding:0px;border:0px">';
echo '<TABLE cellspacing=0px cellpadding=0px border=0px style="display:table;border-collapse:collapse">';
echo '<TR><TD>';
echo '<TABLE cellspacing=0px cellpadding=0px border=0px style="width:100%;display:table;border-collapse:collapse">';
echo '<TR>';
echo '<TH class=TITULO style="cursor:move">'.$__Lng[99].'</TH>';
echo '<TH class=TITULO style="width:1px" onclick="S(\'#UtilList\',window).none();" title="'.$__Lng[67].'"><I class=ICONWINDOW>5</I></TH>';
echo '</TR>';
echo '</TABLE>';
echo '</TD></TR>';
echo '<TR><TD>';
echo '<TABLE cellspacing=0px cellpadding=0px border=0px style="display:table;border-collapse:collapse;"><TR>';
if( $_SubModo!='l' ){
if( $_MAXRECINCREMENT ) echo '<TD id=LstSetup><IMG SRC="g/l_cnf_1.png" title="Paginación incremental" onclick="LstSetup(1)"><IMG SRC="g/l_cnf_0.png" onclick="LstSetup(0)" title="Paginación por sustitución" style="display:none"></TD>';
}
if( !$_LimitOn ){
$_TienePaginacion = true;
$LenINPUT *= $_DefaultSize['LC']['0'];
?>
<TD><INPUT type='text' name='MAXREC' class="EDITABLE"
onfocus="S.key('+',4);this.select();"
onkeydown='if(S.eventCode(event)==13){this.CS=1;PaginarDesde();}'
on-change="top.eKey(window,'#><?=$TotalReg?>','<?=$_RowsOnPage?>');CalcTPag();"
VALUE='<?=(($_MaxVisibleRows>0)?"":$_RowsOnPage)?>'
onchange='CalcTPag();'
bakMAXREC='<?=$_RowsOnPage?>'
style='width:<?=(($_DefaultSize['LC']['0']*4)+$_DefaultSize['LC']['uP'])?>px;text-align:right;cursor:var(--cAuto)' title="<?= $__Lng[24] ?>" MAXLENGTH=4
></TD>
<TD style='padding-left:1px'><I class="ICONINPUT" title="<?=$__Lng[25]?>" id=_KEY36 onclick='_PagNormal();Paginar("I");'>%</I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[26]?>" id=_KEY33 onclick='_PagNormal();Paginar("<");'><</I></TD>
<TD><INPUT TYPE='text' NAME='DESDE' class="EDITABLE" VALUE='<?=$DesdeList?>' onfocus="S.key('+',5)" onkeydown='if(S.eventCode(event)==13){this.CS=1;PaginarDesde();}' style='width:<?=$LenINPUT?>px;text-align:right' title='<?=$__Lng[13]?>' onblur='PaginarDesde();' onfocus='this.select();' <?= "NREG='".($_REG_+1)."' NPAG='".(floor($_REG_/$_RowsOnPage)+1)."'"; ?> OldValue=1 CS=0></TD>
<?PHP if( $_MAXRECFULL ){ ?>
<TD><INPUT TYPE='text' NAME='TIPO' class="EDITABLE" VALUE='<?=$_TIPO_?>' style='width:16px;text-align:center;cursor:var(--cAuto);font-weight:bold;' title='<?=$__Lng[11]?>' readonly disabled onclick='this.blur()'></TD>
<?PHP }else{ ?>
<TD><INPUT TYPE='text' NAME='TIPO' class="EDITABLE" VALUE='<?=$_TIPO_?>' style='width:16px;text-align:center;cursor:var(--cPointer);font-weight:bold;' title='<?=$__Lng[11]?>' readonly onclick='PagReg(this)'></TD>
<?PHP } ?>
<TD><INPUT TYPE='text' NAME='HASTA' VALUE='<?=$HastaList?>' style='width:<?=$LenINPUT?>px;text-align:right;cursor:var(--cAuto)' title='<?=$__Lng[15]?>' class="READONLY" disabled <?= "TREG='{$TotalReg}' TPAG='".ceil($TotalReg/$_RowsOnPage)."'"; ?>></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[27]?>" id=_KEY34 onclick='_PagNormal();Paginar(">");'>></I></TD>
<TD><I class="ICONINPUT" title="<?=$__Lng[28]?>" id=_KEY35 onclick='_PagNormal();Paginar("F");'>&</I></TD>
<?PHP
}
echo '</TR></TABLE>';
echo '</TD></TR></TABLE>';
echo '</SPAN>';
}
if( $SeVe!='' && eSubstrCount($_NOTOOLS,'*')>0 ){
echo '<SCRIPT type="text/javascript" name=eDes>if(DGI("UtilListICO")!=null)UtilListICO.style.display="none";</SCRIPT>';
}
if( count($_JSDIM)>0 ){
echo '<SCRIPT name=JSDim>';
for( $i=0; $i<count($_JSDIM); $i++ ){
$n = 0;
if( eSubstrCount($_JSDIM[$i][1], '{')>0 ){
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for( $ii=0; $ii<count($_POST); $ii++ ){
${$DimNomVar[$ii]} = $DimValor[$ii];
}
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return ("'.$_JSDIM[$i][1].'");');
$_JSDIM[$i][1] = @eval('return ("'.$_JSDIM[$i][1].'");');
}
$hash = preg_match('/HASH/iu', $_JSDIM[$i][2]);
qQuery($_JSDIM[$i][1]);
echo "\nvar ".$_JSDIM[$i][0].'='.(($hash)? "{":"new Array(");
if( sql_TotalCampos()==1 ){
while( $row = qRow() ) {
if( $n > 0 ) echo ',';
$row[0] = trim($row[0]);
echo "'{$row[0]}'";
$n++;
}
}else{
while( $row=qRow() ){
if( $n>0 ) echo ',';
if( $hash ){
echo "'{$row[0]}':";
if( count($row)==2 ){
echo "'{$row[1]}'";
}else{
echo "[";
for($p=1; $p<count($row); $p++){
if( $p>1 ) echo ',';
$row[$p] = trim($row[$p]);
echo "'{$row[$p]}'";
}
echo "]";
}
}else{
echo 'Array(';
for($p=0; $p<count($row); $p++){
if( $p>0 ) echo ',';
$row[$p] = trim($row[$p]);
echo "'{$row[$p]}'";
}
echo ')';
}
$n++;
}
}
echo (($hash)? "};" : ");");
qFree();
}
echo "\n</SCRIPT>";
}
if( (($_LToolsType=='E' || $_LToolsType=='S') && $ConPaginacion) || $_ISUBLISTTOOLS=="E" ){
?>
<script type="text/javascript">
setPaginationEnd();
</script>
<?PHP
}
if( $_ConChartSWF ){
$Chart = array();
error_reporting(_ERROR_REPORTING); include( "{$Dir_}a/chart/setup.php" ); error_reporting(5);
$DimTmpChart = explode( "\n[CHARTSWF:nl]\n", $_CHARTSWF );
$tmp = explode(',',eNsp($_CHARTGRID));
$Max = 0; $ng = 0; $FunAExe = '';
for( $f=0; $f<count($tmp); $f++ ) if( $tmp[$f] > $Max ) $Max = $tmp[$f];
echo '<BR><TABLE id=GRILL border='.(($_DEBUG==3)?'1':'0').' cellspacing=0 cellpadding=0 width=100% style="background:transparent">';
for( $f=0; $f<count($tmp); $f++ ){
echo '<TR>';
$sMax = $Max;
for( $c=0; $c<$tmp[$f]; $c++ ){
if( $sMax > $tmp[$f] ){
echo '<TD align=center valign=middle colspan='.($sMax-$tmp[$f]+1).'>';
$sMax=0;
}else{
echo '<TD align=center valign=middle>';
}
$TR = count($_DimChartSWF);
if( $_TOTALSROWS ) $TR--;
if( $_DefChartSWF[$f][5]!='' && $_DefChartSWF[$f][5] < $TR ) $TR = $_DefChartSWF[$f][5] + 1;
$_CHARTSWF = $DimTmpChart[$f];
$sCHARTSWF = $_CHARTSWF;
$_CHARTSWF  = "include('{$Dir_}a/chart/setup.php');\n";
$_CHARTSWF .= "include('{$Dir_}a/chart/".str_replace(' ','_',mb_strtolower($_DefChartSWF[$ng][0])).".php');\n";
$_CHARTSWF .= '$_User='.$_User.";\n";
$_CHARTSWF .= '$Chart["chart_type"] = "'.$_DefChartSWF[$ng][0].'";'."\n";
$_CHARTSWF .= '$Chart["chart_data"] = array(array("",';
for( $i=2; $i<=$TR; $i++ ){
if( $i>2 ) $_CHARTSWF .= ', ';
$_CHARTSWF .= '"'.$_DimChartSWF[$i][$_DefChartSWF[$ng][2]].'"';
}
$_CHARTSWF .= "),\n";
$Serie = explode(',',eNsp($_DefChartSWF[$ng][1]));
for( $s=0; $s<count($Serie); $s++ ){
if( $s>0 ) $_CHARTSWF .= ",\n";
$n = $Serie[$s];
$sLeyenda = $_DimTHText[0][$n];
if( count($_DimTHText)==2 ){
if( $_DimTHText[0][$n] != $_DimTHText[1][$n] ) $sLeyenda = $_DimTHText[1][$n].' ('.$_DimTHText[0][$n].')';
}
$_CHARTSWF .= 'array("'.preg_replace('/<BR>/i','\n',$sLeyenda).'"';
for( $i=2; $i<=$TR; $i++ ){
$_CHARTSWF .= ', '.$_DimChartSWF[$i][$n].'';
}
$_CHARTSWF .= ")\n";
}
$_CHARTSWF .= ");\n";
if( mb_strtoupper($_DefChartSWF[$ng][8])=='VALUE' ){
$_CHARTSWF .= '$Chart["chart_value_text"] = array( ';
for( $s=0; $s<count($Serie); $s++ ){
if( $s>0 ) $_CHARTSWF .= ",\n";
$n = $Serie[$s];
for( $i=2; $i<=$TR; $i++ ){
if( $i>2 ) $_CHARTSWF .= ', ';
$_CHARTSWF .= $_DimChartSWF[$i][$n].'';
}
}
$_CHARTSWF .= ");\n";
}
if( $_DefChartSWF[$ng][10]!='' ) $_CHARTSWF .= '$Chart["draw"][0]["text"] = "'.$_DefChartSWF[$ng][10].'";';
if( $_DefChartSWF[$ng][12]=='' ) $_DefChartSWF[$ng][12] = 500;
if( $_DefChartSWF[$ng][13]=='' ) $_DefChartSWF[$ng][13] = 300;
$_CHARTSWF .= '$Chart["draw"][0]["width"] = '.$_DefChartSWF[$ng][12].';';
$_CHARTSWF .= '$Chart["draw"][0]["y"] = '.($_DefChartSWF[$ng][13]-$Chart["draw"][0]["size"]*1.5).';';
$_CHARTSWF .= $sCHARTSWF;
$tmpFile = GrabaTmp('l_chartswf', $_CHARTSWF);
unset($_CHARTSWF);
if( !isset($_PHPSWFCharts) ) $_PHPSWFCharts = null;
include_once($Dir_.'chart_swf.inc');
if( WINDOW_OS ){
list(,$tmpFile ) = explode(':', $tmpFile);
echo InsertChart('charts/charts.swf', 'charts', 'edes.php?ChartXML='.$tmpFile, $_DefChartSWF[$ng][12], $_DefChartSWF[$ng][13], 'FFFFFF', true, $_PHPSWFCharts);
}else{
list(,$tmpFile) = explode('/_tmp/php/',$tmpFile);
echo InsertChart( 'charts/charts.swf', 'charts', 'edes.php?ChartXML='.$tmpFile, $_DefChartSWF[$ng][12], $_DefChartSWF[$ng][13], 'FFFFFF', true, $_PHPSWFCharts );
}
$ng++;
echo '</TD>';
}
echo '</TR>';
}
echo '</TABLE>';
}
if( $_CHARTGRID!='' ){
?>
<div id=ExePDF onclick=gsExpor('P') style='display:none'></div>
<?PHP
}
if( isset($_GRAPH) ){
include(DIREDES.'graph.inc');
$TituloGraph = '';
$TipoGraph = mb_strtoupper(str_replace('*', 'P,C,R,G', (($_GRAPH[0]=='')?'*':$_GRAPH[0])));
if( isset($_THCOLSPAN[0]) ){
list(,,$TituloCol) = explode(',', $_THCOLSPAN[count($_THCOLSPAN)-1]);
}else{
$TituloCol = $_Form[$_TotalColIzq-1][0];
}
$DimVar = array();
if( $_GRAPH[6]!='' ){
$tmp = explode(',',$_GRAPH[6]);
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode('=',$tmp[$n]);
$k = trim($k);
if( $k[0]=='$' ) $k = mb_substr($k,1);
$v = trim($v);
if( $v[0]==mb_substr($v,-1) && ($v[0]=="'" || $v[0]=='"') ) $v = mb_substr($v,1,-1);
$DimVar[trim($k)] = trim($v);
}
}
if( $_GRAPH[1]!='' ) $TituloFila = $_GRAPH[1];
if( $_GRAPH[2]!='' ) $TituloCol  = $_GRAPH[2];
if( eSubstrCount($TipoGraph,'P')>0 ) $xGraphP = eGraph('P', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar);
if( eSubstrCount($TipoGraph,'C')>0 ) $xGraphC = eGraph('C', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar);
$TituloCol2 = $_Form[0][0];
if( !isset($_THCOLSPAN[0]) && count($_ROWSOP)==0 ){
$_ROWSOP = array();
for( $n=0; $n<count($_Form)-1; $n++ ) $_ROWSOP[$n] = 'C';
$_ROWSOP[count($_Form)-1] = '+';
}
if( $_GRAPH[3]!='' ) $TituloCol2 = $_GRAPH[3];
if( eSubstrCount($TipoGraph,'R')>0 ) $xGraphR = eGraph('R', $usuCursor, $_Form, $_ROWSOP, $TituloGraph, $TituloCol2, $TituloFila, '', $DimVar);
if( $_GRAPH[4]!='' ) $TituloCol = $_GRAPH[4];
$TituloLeyenda = ''; if( $_GRAPH[5]!='' ) $TituloLeyenda = trim($_GRAPH[5]);
if( eSubstrCount($TipoGraph,'G')>0 ) $xGraphG = eGraph('G', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, $TituloLeyenda, $DimVar);
$xGraph = array($xGraphP, $xGraphC, $xGraphR, $xGraphG);
$xGraphSi = 0;
for($n=0; $n<count($xGraph); $n++) $xGraphSi += (($xGraph[$n][0]!='') ? 1:0);
if( $xGraphSi ) echo '<table border="0px" style="background:transparent;display:table" id="_GraphSite">';
$Ancho = 0; $TCol = 0;
echo '<tr>';
for($n=0; $n<count($xGraph); $n++){
if( $xGraph[$n][0]!='' ){
if( ($xGraph[$n][1]+$Ancho) < (SESS::$_pxW_-15-15-10) ){
$TCol++;
$Ancho += $xGraph[$n][1];
echo '<td align=center valign=top>'.$xGraph[$n][0].'</td>';
$xGraph[$n][0] = '';
}
}
}
echo '</tr>';
for($i=0; $i<2; $i++){
$Ancho = 0;
for($n=0; $n<count($xGraph); $n++){
if( $xGraph[$n][0]!='' ){
if( ($xGraph[$n][1]+$Ancho) < (SESS::$_pxW_-15-15-10) ){
$Ancho += $xGraph[$n][1];
echo "<tr><td align=center valign=top colspan={$TCol}>".$xGraph[$n][0].'</td></tr>';
$xGraph[$n][0] = '';
}
}
}
}
if( $xGraphSi ) echo '</table>';
}
if( $_EDITLIST[3]==1 ){
echo "<span id='EditListButtons' style='display:none;position:absolute'>";
eAddButton("X", "Cancelar", 'elAnulaRec()', "Cancelar", "id='EditListButtonCancel'");
eAddButton("U", "Grabar", 'elGrabaRec()', "Grabar fila", "id='EditListButtonSave'", 1);
echo "</span>";
}
if( $_EDITLIST[3]==2 ){
echo '<form accept-charset="utf-8" id="FORMEDITLIST" METHOD="POST" action="edes.php?E:$mod_tb.gs&_DF='.$OriFichero.'" style="display:none">';
echo '<textarea id="_DATAEDITLIST" name="_DATAEDITLIST"></textarea>';
echo '</form>';
echo "<div id='EditListButtons' style='margin-top:7px'>";
eAddButton("U", "Grabar", 'elGrabaTable()', "Grabar Tabla", "", 1);
echo "</div>";
}
if( $_JSEND!='' ) _IncludeJsHtml($_JSEND, "JSEnd");
if( $_HTMEND!='' ) _IncludeJsHtml($_HTMEND, "HTMEnd");
if( !empty($_PHPEND) ){
$tmpFile = GrabaTmp('l_phpend', $_PHPEND, $LenDoc, $_FILE_PHPEND);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPEND);
}
echo '<SCRIPT type="text/javascript" name=eDes>';
if( isset($_OPTIONSINLIST) ){
?>
S("#CONTENEDOR").css("margin-bottom", S(".MENUFOOTLIST").css("height")+5);
S(".BROWSE TBODY .ICONINPUT").on("click",function(o){
if( o.toElement && o.toElement.parentNode && o.toElement.parentNode.parentNode ){
S(o.toElement.parentNode.parentNode).eventFire("click");
}
});
<?PHP
if( $TotalReg==0 ){
if( qCount($_DBTABLE)==0 ){
?>
S("TD[op]", ".MENUFOOTLIST").each(function(k,o){
if( !/(a)/.test(S(o).attr("op")) ){
S(o).none();
}
});
S(["#TITULO", "#BROWSE", "#UtilListICO"]).none();
if( S("#FootTitle").length ) S("#FootTitle").none();
<?PHP if( !$_OPTIONSINLISTINSERT ){ ?>
var o = S("TD[op=a]", ".MENUFOOTLIST");
if( o.length ){
_ModeChange("a");
}
<?PHP } ?>
<?php
}
if( $_SERVER["REQUEST_METHOD"]=="POST" ) echo 'S.info("No hay registros", 0);';
}
}
if( isset($_CALLSRVROW) ){
SESS::$tmp['CALLSRVROW'] = $_CALLSRVROW;
unset(SESS::$tmp['_CALLSRVROW']);
echo "function ".$_CALLSRVROW[1]."(n){";
echo 'if(n==undefined)n=0;';
echo 'var dim="'.str_replace("\n", "", implode(",",file($_SerialFile))).'".split(",");';
echo 'S.progressUpload(((n+1)/(dim.length-1))*100, "'.$_CALLSRVROW[2].' "+(n+1)+" de "+(dim.length-1));';
echo 'if(n==0)S("body").modal();';
echo 'top.eCallSrv(window, "'.$_CALLSRVROW[0].'&"+dim[0]+"="+dim[n+1]+"&_CALLSRVROW="+(n+1)+","+(dim.length-1));';
echo "}";
}
echo 'var _ActivePaginate = '.((!$ConPaginacion)?"true;":"false;");
if($_GET["_TRANSPARENT"]){
echo 'document.body.style.backgroundColor = "transparent";';
}
if( $_NotInTemporary<>"" ){
echo "_SelectON = false;";
}else if( $_ISUBLIST==true && $_ISLOPMenu!='' ){
echo $__Enter;
?>
function _opISubList(Op, OpTextContent, oTD, oTR){
if( Op==null ) return;
Obj = oTD.parentNode;
switch( Op ){
case "I": _ModeChange('a',Obj); break;
case "D": _ModeChange('b',Obj); break;
case "V": _ModeChange('c',Obj); break;
case "U": _ModeChange('m',Obj); break;
case "T": eShowLTools(); break;
}
}
function opISubList(){
var Obj = S.event(window);
if( Obj.tagName=='TD' && Obj.parentNode.className!='PieLista' && event.type=='contextmenu' ){
top.eMenu(window, Obj, {<?= $_ISLOPMenu ?>}, _opISubList, true);
return eClearEvent();
}
if( Obj.tagName=='TH' && event.type=='click' ){
SeleccionaLinea();
}else if( _SortList ){
if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
if( _SortList==Obj.cellIndex && Obj.parentNode.getAttribute("libre")!="1" ) MovCampo();
}
}
DGI("BROWSE").onclick = opISubList;
DGI("BROWSE").oncontextmenu = opISubList;
DGI("BROWSE").style.cursor = 'pointer';
<?PHP if( eSubstrCount($ISLAlto, 'R')>0 ){ ?>
if( BROWSE.rows.length > parseInt(_HISubList) ){
var h = top.eXY(BROWSE.rows[parseInt(_HISubList)])[1]+BROWSE.rows[parseInt(_HISubList)].offsetHeight+1;
document.body.scroll = 'auto';
window.frameElement.style.height = h+"px";
var d = S(window.frameElement.contentWindow.document.body).scrollSet(S("#BROWSE").obj);
if( d.sw ){
d = S.screen(window.frameElement.contentWindow.document.body);
window.frameElement.style.height = (h+d.ch-d.oh)+"px";
}
}else{
window.frameElement.style.height = (BROWSE.offsetHeight+BROWSE.offsetTop+top.eXY(BROWSE)[1])+"px";
}
<?PHP }else{
}
}else{
if( isset($_JSSELROWS) ){
?>
function SeleccionaMarca(TR){
if( TR.disabled ) return eClearEvent();
_OkChange = 1;
if( TR.getAttribute("SEL")==1 ){
TR.cells[TR.cells.length-1].innerHTML = '';
TR.removeAttribute("SEL");
<?PHP if( $_JSSELROWS[2]<>'' ){ ?>
TR.className = '';
<?PHP }else if( $_JSSELROWS[3]<>'' ){ ?>
TR.style.backgroundColor = '';
<?PHP } ?>
}else{
TR.cells[TR.cells.length-1].innerHTML = "<?=$_JSSELROWS[1]?>";
TR.setAttribute("SEL",1);
<?PHP if( $_JSSELROWS[2]<>'' ){ ?>
TR.className = '<?=$_JSSELROWS[2]?>';
<?PHP }else if( $_JSSELROWS[3]<>'' ){ ?>
TR.style.backgroundColor = '<?=$_JSSELROWS[3]?>';
<?PHP } ?>
}
}
function SeleccionaFila(){
var el = S.event(window);
if( el.tagName=='IMG' || el.tagName=='I' ) el = el.parentNode;
if( el.tagName=='TD' && el.cellIndex==parseInt(S(S.toTag(el,'TABLE')).attr("eCols"))-1 && el.parentNode.className!='PieLista' ){
SeleccionaMarca( el.parentNode );
}else SeleccionaLinea();
return eClearEvent();
}
function SeleccionInvertir(limpiar){
_OkChange = 1;
limpiar || (limpiar=false);
var TABLA = DGI('BROWSE'),
TR = TABLA.rows,
TReg = TR.length, n;
for(n=0; n<TReg; n++){
if( TR[n].cells[0].tagName=='TD' && TR[n].className!='PieLista' ){
if( limpiar ) TR[n].setAttribute("SEL",1);
SeleccionaMarca( TR[n] );
}
}
return eClearEvent();
}
function SeleccionEnviar(){
var TABLA = DGI('BROWSE'),
TR = TABLA.rows,
TReg = TR.length, n, pk=[], pos=[],
nc = eGCol('<?= $_DBINDEX; ?>');
_OkChange = null;
for(n=0; n<TReg; n++){
if( TR[n].cells[0].tagName=='TD' && TR[n].className!='PieLista' && TR[n].getAttribute("SEL")==1 ){
pk.push(TR[n].cells[nc].textContent);
pos.push(n);
}
}
<?PHP if( $_JSSELROWS[0]<>"" ){ ?>
if( _WOPENER.<?=$_JSSELROWS[0]?> ){
if( _WOPENER.<?=$_JSSELROWS[0]?>(pk,pos) ) top.eSWClose(window);
}else{
<?=$_JSSELROWS[0]?>(pk,pos);
}
<?PHP }else{ ?>
DGI('_DATAJSSELROWS').value = pk.join(",");
DGI('FORMSELECT').submit();
<?PHP } ?>
}
<?PHP
echo 'DGI("BROWSE").onclick = SeleccionaFila;';
}else{
if( isset($_LISTMULTISELECT) ){
echo 'DGI("BROWSE").onclick = eListMultiSelec;';
echo 'S(".AddButton").move(false,"#MOVER");';
}else{
if( !$_NOSELECTROW ){
echo 'DGI("BROWSE").onclick = SeleccionaLinea;';
}
if( mb_strlen($_SubMode)==2 && !$_NOSELECTROW ){
echo 'DGI("BROWSE").oncontextmenu = SeleccionaLineaPor;';
}
}
}
}
if( isset($_FunctionNextPage) && $_FunctionNextPage!='' ) echo $_FunctionNextPage.';';
if( isset($_FunctionLastPage) && $_FunctionLastPage!='' && (ceil($_REG_/$_RowsOnPage)+1) == ceil($TotalReg/$_RowsOnPage) ) echo $_FunctionLastPage.';';
if( isset($_eShowLTools) && $_eShowLTools ){
echo 'if(!top.eIsWindow(window))eShowLTools(undefined, true);';
echo 'S("#UtilListICO").attr("out",true);';
}
echo '</SCRIPT>';
if( !empty($_EDITLIST[0]) ) include($Dir_.'editlist.inc');
if( isset($_JSSELROWS) ){
echo '<form accept-charset="utf-8" id="FORMSELECT" METHOD="POST" action="edes.php?FM:'.$OriFichero.'" style="display:none">';
echo '<textarea id="_DATAJSSELROWS" name="_DATAJSSELROWS"></textarea>';
echo '</form>';
}
echo '<script type="text/javascript">';
if( isset($_VIEW) && isset($_VIEWCSS) ){
echo 'var _VIEWCSS=[';
for($n=0; $n<count($_VIEWCSS); $n++){
if( $n>0 ) echo ",";
echo '"'.$_VIEWCSS[$n].'"';
}
echo "];";
}
gsAvisos($_OtroDiccionario);
if( $_SUBLISTADO_==1 ){
echo "S('body',_WOPENER).visible();";
}
if( function_exists("eDataOrigin") ){
echo 'document.body.onkeydown = null;';
echo 'document.body.onmousewheel = null;';
}
echo '_toPublic();';
if( $_CARDLISTDEFAULT ){
echo '_uMenuLTools("CARD", S("#_ToolsCardList").obj);';
}
echo '</SCRIPT>';
if( !isset($_GET["_ISUBLIST"]) && ($_ChartDefinitionUser || (isset($_CHARTGOOGLE) && count($_CHARTGOOGLE)>0)) && ($_SubMode=="l" || $_SubMode=="cl")){
echo '<div class="CHART_STORE" style="display:none;text-align:center">';
for($n=0; $n<count($_CHARTGOOGLE); $n++){
$_CHARTGOOGLE[$n] = str_replace(["'",'"'], ["&#39;","&#34;"], $_CHARTGOOGLE[$n]);
echo '<div class="CHART_SYSTEM" style="text-align:-webkit-center;" Definition="'.$_CHARTGOOGLE[$n].'"></div>';
}
if( $_ChartDefinitionUser ){
qQuery("select definition from {$_ENV['eDesDictionary']}gs_chart where script='{$_FileDF}' and cd_gs_user='".S::$_User."'" );
$row = qRow();
if( $row[0]<>"" ){
$dim = explode("~", $row[0]);
for( $n=0; $n<count($dim); $n++ ){
echo '<div class="CHART_USER" style="text-align:-webkit-center;" Definition="'.$dim[$n].'"></div>';
}
}else $dim = array();
}
echo '</div>';
if( gettype($dim)=='NULL' ) $dim = [];
if( (count($dim)+count($_CHARTGOOGLE))>0 ){
echo '<script type="text/javascript">';
echo "var _ChartDynamic=".(($_ChartDynamic)?"true":"false").";";
echo 'S(".CHART_STORE").display("grid");';
for($n=0; $n<count($_CHARTGOOGLE); $n++){
echo 'S.chartDraw(S(".CHART_SYSTEM").dim['.$n.']);';
}
for($n=0; $n<count($dim); $n++){
echo 'S.chartDraw(S(".CHART_USER").dim['.$n.']);';
}
echo '</SCRIPT>';
}
}
if( isset($_ProgressFields) ){
$txt = '';
if( $_ProgressFields=='' ){
}elseif( $_ProgressFields=='*' ){
foreach( $_POST as $k=>$v ) if( $k[0]!='_' ) $txt .= $k.'='.$v."\n";
}elseif( $_ProgressFields[0]=='-' ){
$_ProgressFields = trim(mb_substr($_ProgressFields,1));
$Dim = explode(',',$_ProgressFields);
$DimCampo = array();
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n][0]=='-' ) $Dim[$n] = trim(mb_substr($Dim[$n],1));
$DimCampo[$Dim[$n]] = true;
}
foreach( $_POST as $k=>$v ) if( $k[0]!='_' && !$DimCampo[$k] ) $txt .= $k.'='.$v."\n";
}else{
$Dim = explode(',',$_ProgressFields);
for( $n=0; $n<count($Dim); $n++ ) $txt .= $Dim[$n].'='.$_POST[$Dim[$n]]."\n";
}
$Md5 = md5($txt);
if( $_ProgressFields=='' ) $Md5='';
qQuery("select seconds from {$_ENV['eDesDictionary']}gs_progress where script='{$GLOBALS['OriFichero']}' and md5='{$Md5}'");
list($ns) = qRow();
$Sg = round((eGetMicrotime()-$_ENV[SYS]['IniSg']));
if( trim($ns)=='' ){
qQuery("insert into {$_ENV['eDesDictionary']}gs_progress (script,md5,seconds) values ('{$OriFichero}','{$Md5}','{$Sg}')");
}else{
qQuery("update {$_ENV['eDesDictionary']}gs_progress set seconds='{$Sg}' where script='{$GLOBALS['OriFichero']}' and md5='{$Md5}'");
}
}
if( $_POST['_dynamic_generation']==$_ENV['ON'] || $_GET['_dynamic_generation']==$_ENV['ON'] ){
if( $_POST['cd_gs_list_store']>0 ){
$Sg = round((eGetMicrotime()-$_ENV[SYS]['IniSg']));
S::qQuery("select time from {$_ENV['eDesDictionary']}gs_list_store where cd_gs_list_store={$_POST['cd_gs_list_store']}");
list($aSg) = S::qRow();
if( trim($aSg)!='' ){
list($m,$s) = explode(':',$aSg);
$Sg = ($Sg+($s+($m*60)))/2;
}
$Sg = date('i:s', $Sg);
S::qQuery("update {$_ENV['eDesDictionary']}gs_list_store set time='{$Sg}' where cd_gs_list_store={$_POST['cd_gs_list_store']}");
echo '<script type="text/javascript">top.eLoading(0,window);</script>';
}
}
echo '</DIV>';
if( ($_ListToolsMenuType=="H" || $_ListToolsMenuType=="B") && $_NOTOOLS!="*" ){
echo '<table onclick="_LToolsViewClick(event)" class="MENULTOOLS SUBMENU col_1l, col_1n" onmouseover="_LToolsView(1)" onmouseleave=this.style.visibility="hidden" style="z-index:1000"><tbody>';
for($n=0; $n<count($_DimMenu); $n++){
echo "<tr eArg='{$_DimMenu[$n][0]}'><td><i class='ICONWINDOW'>{$_DimMenu[$n][1]}</i> </td><td>{$_DimMenu[$n][2]}</td></tr>";
}
for($n=0; $n<count($_TITLEICON); $n++){
if( SETUP::$List["TitleIconView"] && $n==0 ) continue;
echo "<tr><td>".$_TITLEICON[$n]." </td><td>Ayuda</td></tr>";
}
echo '</tbody></table>';
}
echo '<script type="text/javascript">';
if( isset($_OPTIONSINLIST) && $_OptionsInListMenuRow && $_ISUBLIST==false ){ ?>
S("I,IMG", ".MENUFOOTLIST").each(function(k,o){
o.onclick = o.parentElement.onclick;
o.title = o.parentElement.getAttribute("eTitle");
o.setAttribute("op", o.parentElement.getAttribute("op"));
});
setTimeout(function(){
S(window).menuRow("#BROWSE", S("I,IMG", ".MENUFOOTLIST").del(["*[op='f']","*[op='a']","*[op='u']","*[op^='o']"]).dim, typeof(FUNCTION_OptionsInList)=="undefined" ? null:FUNCTION_OptionsInList);
}, 100);
<?PHP }
if( isset($_OPTIONSINLIST) && $_ListToolsMenuType=="B" && $_ISUBLIST==false ){ ?>
var obj = S("TD[op^='o']", ".MENUFOOTLIST");
if( obj.length==0 ){
S("#_ToolsOpsUser").none();
}else if( obj.length==1 ){
var uTools = S("#_ToolsOpsUser").obj.children[0];
S(uTools.children[0]).HTML(obj.obj.children[0].outerHTML);
uTools.childNodes[1].textContent = obj.obj.childNodes[1].textContent;
uTools.parentElement.onclick = obj.obj.onclick;
}
if( !S("TD[op='a']", ".MENUFOOTLIST").length ){
S(S(".ToolsBar .ToolsTDIZQ I").dim[0]).none();
S(S(".ToolsBar .ToolsTDIZQ I").dim[1]).css("margin-left:0");
}
<?PHP }
if( !isset($_OPTIONSINLIST) && $_ListToolsMenuType=="B" && $_ISUBLIST==false ){
echo 'S("#_ToolsOpsUser").none();';
}
if( $_ColVisibles<2 || $_TotalRecords==0 ){
echo 'if( S("#_ToolsCardList").length ) S("#_ToolsCardList").none();';
}
?>
if( typeof(_ModeChange)=="undefined" && S(".ToolsTDIZQ").length ){
S(S(".ToolsTDIZQ").obj.children).each(function(k,o){
if( o.id!="spanFilterTR" ) S(o).none();
});
if( S("#spanFilterTR").length ) S(".ToolsBar").css("padding-left:0px;");
}
if( S(".ToolsBar").length && S(".ToolsBar").width() > S.screen(window).w ){
var right = 0;
S.each( S(".ToolsTDDCH .Button, .VIEWCONTAINER").add("#ListHelpIcons").dim, function(k,o){
if( o.offsetWidth==0 || o.id=="_ToolsOpsUser" ) return;
S(o).css(`position:sticky; right:${right}px;`);
right += o.offsetWidth+5;
}, true);
}
<?PHP
if( $_BorderLeft ){
echo 'S("I").each(function(k,o){ if( S.code(o.innerHTML)==413 ) S(o).class("+OFF"); });';
}
if( isset($_SET_TFOOT) && $_SET_TFOOT && (int)$TotalReg > 20 && $_COLSOP[0]!='S' ){
?>
let oTFoot = S("#CONTENEDOR .BROWSE TFOOT TR");
if( oTFoot.length ){
let oTR = S("#CONTENEDOR .BROWSE TBODY").obj.insertRow(0);
oTR.outerHTML = oTFoot.HTML();
}
<?PHP
}
if( isset($_SET_BORDER_LEFT) && $_SET_BORDER_LEFT ){
?>
S(window).rule("+.BROWSE TH, .BROWSE TD { border-left: 1px solid "+_cListGrid+"; }", "configCSS");
setTimeout(function(){
S("I").each(function(k,o){
if( S.code(S.trim(o.innerHTML))==413 ){
S(S.toTag(o, "TR")).none();
}
});
}, 500);
<?PHP
}
echo '</script>';
echo '</BODY></HTML>';
eEnd();
function BuscaConAlias($txt, &$Campos=NULL){
global $_Form, $HaySelect, $FormDel, $_DBGROUPBY;
if( mb_strlen($txt) == 0 ) return $txt;
$SubSelect = array();
$n=0;
while( (eSubstrCount(mb_strtoupper($txt), ' IN(')>0 || eSubstrCount(mb_strtoupper($txt), ' IN (')>0) && eSubstrCount($txt, ')')>0 ){
$i = max(mb_strpos(mb_strtoupper($txt), ' IN('), mb_strpos(mb_strtoupper($txt), ' IN ('));
if( $i>-1 ){
$f = mb_strpos(mb_strtoupper($txt), ')', $i);
$SubSelect[$n] = mb_substr($txt, $i, $f-$i+1);
$txt = str_replace($SubSelect[$n], '{#SubSelect#'.$n.'}', $txt);
}
$n++;
}
$txt = trim($txt);
if( $txt[0]=='(' ) $txt = '( '.mb_substr($txt,1);
$txt = _FieldInWhere($txt, true);
if( !$HaySelect ){
if( count($SubSelect)>0 ){
for($n=0; $n<count($SubSelect); $n++){
$txt = str_replace('{#SubSelect#'.$n.'}', $SubSelect[$n], $txt);
}
}
return $txt;
}
$TipoCondi = array('<>', '>=', '<=', '!=', '=', '>', '<', ' like', ' is ', ' ');
$txt = ' '.$txt;
for( $n=0; $n<count($_Form); $n++ ){
for( $i=0; $i<count($TipoCondi); $i++ ){
if( eSubstrCount( $txt, ' '.$_Form[$n][1].$TipoCondi[$i] ) > 0 ){
$txt = str_replace( ' '.$_Form[$n][1].$TipoCondi[$i], ' A.'.$_Form[$n][1].$TipoCondi[$i], $txt );
}
if( eSubstrCount( $txt, '('.$_Form[$n][1].$TipoCondi[$i] ) > 0 ){
$txt = str_replace( '('.$_Form[$n][1].$TipoCondi[$i], ' (A.'.$_Form[$n][1].$TipoCondi[$i], $txt );
}
}
}
for( $n=0; $n<count($FormDel); $n++ ){
for( $i=0; $i<count($TipoCondi); $i++ ){
if( eSubstrCount( $txt, ' '.$FormDel[$n][1].$TipoCondi[$i] ) > 0 ){
$txt = str_replace( ' '.$FormDel[$n][1].$TipoCondi[$i], ' A.'.$FormDel[$n][1].$TipoCondi[$i], $txt );
}
if( eSubstrCount( $txt, '('.$FormDel[$n][1].$TipoCondi[$i] ) > 0 ){
$txt = str_replace( '('.$FormDel[$n][1].$TipoCondi[$i], '(A.'.$FormDel[$n][1].$TipoCondi[$i], $txt );
}
}
}
if( trim($txt)!='' && mb_substr(trim($txt),0,1)!='(' && mb_substr(trim($txt),1,1)!='.' && mb_substr(trim($txt),2,1)!='.' ){
if( mb_substr(trim($txt),0,7) == 'extend(' ){
$txt = str_replace( 'extend(', 'extend( A.', $txt );
}else if( mb_substr(trim($txt),0,9) == 'group by ' ){
}else{
$txt = ' A.'.trim($txt);
}
}
if( count($SubSelect)>0 ){
for($n=0; $n<count($SubSelect); $n++){
$txt = str_replace('{#SubSelect#'.$n.'}', $SubSelect[$n], $txt);
}
}
$txt = str_replace('A.(', '(', $txt);
return rtrim($txt);
}
function _explodePorComa($txt){
$sql = trim($txt);
$txt = '';
$IniParentesis = 0;
$IniComillaSencilla = 0;
$IniComillaDoble = 0;
$Dim = array();
for( $n=0; $n<mb_strlen($sql); $n++ ){
$c = mb_substr($sql,$n,1);
switch( $c ){
case ',':
if( $IniParentesis==0 && $IniComillaSencilla==0 && $IniComillaDoble==0 ){
$txt = trim($txt);
$Dim[] = $txt;
$c = $txt = '';
}
break;
case '(':
if( $IniComillaSencilla || $IniComillaDoble ) break;
$IniParentesis++;
break;
case ')':
if( $IniComillaSencilla || $IniComillaDoble ) break;
$IniParentesis--;
break;
case "'":
if( $IniComillaDoble ) break;
if( $IniComillaSencilla > 0 ){
if( mb_substr($sql,$n-1,1)==CHR92 ) break;
$IniComillaSencilla--;
break;
}
$IniComillaSencilla++;
break;
case '"':
if( $IniComillaSencilla ) break;
if( $IniComillaDoble ){
if( mb_substr($sql,$n-1,1)==CHR92 ) break;
$IniComillaDoble--;
break;
}
$IniComillaDoble++;
break;
default:
}
$txt .= $c;
}
if( trim($txt)<>"" ) $Dim[] = trim($txt);
return $Dim;
}
function OrdenConAlias($txt, $HaySelect, &$Campos, $FormDel=NULL){
global $_COL_, $_Form;
$txt = str_replace(array("&#39;","&#34;"), array("'",'"'), $txt);
if( trim($txt)=="" ) return "";
$Campos = trim($Campos);
$tmp = explode(' ', trim($txt));
if( is_numeric($tmp[0]) ) return $txt;
if( preg_match('/ LIMIT /iu', $txt) ){
$txt = preg_replace('/ LIMIT /iu',' LIMIT ',$txt);
list($txt) = explode(' LIMIT ',$txt);
}
$GroupBy = "";
if( mb_strpos($txt, ' group by ')!==false ){
list($txt, $GroupBy) = explode(' group by ', $txt);
}
if( !empty($GroupBy) ) $GroupBy = ' group by '.$GroupBy;
if( eSubstrCount($txt, '*')>0 ){
global $OrdASC, $OrdDESC;
$cTmp = array();
$dim = _SelectGetFields($txt);
for($c=0; $c<count($dim); $c++){
$cTmp[$c] = $dim[$c][0];
}
$cOrd = explode(',', str_replace('  ',' ',trim($txt)));
for($c=0; $c<count($cOrd); $c++){
list($cam, $or) = explode(' ', trim($cOrd[$c]));
if( $cam[0]=='*' ){
$cambio = false;
$cam = trim(mb_substr($cam,1));
for($i=0; $i<count($cTmp); $i++){
if( eSubstrCount($cTmp[$i], ".".$cam)==1 ){
$txt = str_replace($cOrd[$c], mb_substr($cTmp[$i],0,2).mb_substr($cOrd[$c],1), $txt);
if( !empty($or) ){
$OrdDESC[$cam] = 1;
}else{
$OrdASC[$cam] = 1;
}
$cambio = true;
break;
}
}
if( !$cambio ){
$tmp = explode(' ', trim($txt));
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i][0]=='*' ){
$txt = str_replace($tmp[$i], $cTmp[$_COL_], $txt);
}
}
}
}
}
}else if( $HaySelect && $txt!='' ){
$stxt = '';
$tmp = _explodePorComa($txt);
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
$campoSinDir = preg_replace('/ desc$/i', '', $tmp[$i]);
if( $i>0 ) $stxt .= ', ';
if( $tmp[$i]=='cdi__' ){
$stxt .= $tmp[$i];
}else if( $tmp[$i]=='A.cdi__' ){
$stxt .= mb_substr($tmp[$i],2);
}else if( $tmp[$i]=='action__' ){
$stxt .= $tmp[$i];
}else if( $tmp[$i]=='A.action__' ){
$stxt .= mb_substr($tmp[$i],2);
}else if( mb_strpos("{$Campos},", " {$campoSinDir}," )!==false ){
$stxt .= $tmp[$i];
}else if( eSubstrCount($tmp[$i], '.')==0 ){
if( eSubstrCount($tmp[$i], ' ')==0 ){
if( in_array($tmp[$i], $FormDel) ){
$stxt .= 'A.'.$tmp[$i];
}else{
list($p1, $p2, $p3, $p4) = explode(' ',$tmp[$i]);
$tmp2 = explode(' ',$tmp[$i]);
$ult = count($tmp2)-1;
$tipoOrden = (mb_strtoupper($tmp[$ult])=='ASC' || mb_strtoupper($tmp[$ult])=='DESC') ?  ' '.$tmp[$ult] : '';
if( !is_numeric($p1) ){
if( eSubstrCount($Campos, '.'.$tmp[$i])>0 ){
$stxt .= mb_substr($Campos.",", mb_strpos($Campos.",",'.'.$tmp[$i].",")-1, 2).$tmp[$i];
}else{
if( $tmp[$i][0]=="'" || $tmp[$i][0]=='"' ){
$stxt .= $tmp[$i];
}else if( eSubstrCount($tmp[$i],'(')>0 ){
list(,$tmp2) = explode("(", $tmp[$i]);
$tmp2 = explode(",", str_replace(")",",",$tmp2));
for($p=0; $p<count($tmp2); $p++){
$tmp2[$p] = trim($tmp2[$p]);
if( $tmp2[$p][0]=="'" || $tmp2[$p][0]=='"' ){
}else if( ((float)$tmp2[$p])===$tmp2[$p] ){
}else{
$iCampo = $tmp2[$p];
$stxt .= str_replace($iCampo, 'A.'.$iCampo, $tmp[$i]);
break;
}
}
}else if( is_numeric($tmp[$i]) ){
$stxt .= $tmp[$i];
}else{
$Campos = trim($Campos);
$p = mb_strpos($Campos, $tmp[$i]);
if( $p!==false ){
if( mb_substr($Campos, $p-1, 1)=="." ){
$stxt .= mb_substr($Campos, $p-2, 2).$tmp[$i];
}else{
$stxt .= "A.".$tmp[$i];
}
}
}
}
}else{
$stxt .= $tmp[$i];
}
}
}else{
$CampoOriginal = $tmp[$i];
$tmp[$i] = preg_replace('/ as /', ' ', $tmp[$i]);
list($sNombre,$sAlias,$AscDesc) = explode(' ', $tmp[$i]);
$tmp3 = explode(" ", trim($tmp[$i]));
$ult = count($tmp3)-1;
$tipoOrden = (mb_strtoupper($tmp3[$ult])=="ASC" || mb_strtoupper($tmp3[$ult])=="DESC") ?  " ".$tmp3[$ult] : "";
if( $AscDesc!="" ){
$stxt .= trim($sAlias).$tipoOrden;
}else if( mb_strtoupper($sAlias)!='ASC' && mb_strtoupper($sAlias)!='DESC' ){
$stxt .= trim($sAlias).$tipoOrden;
}else{
if( $sNombre[0]=="'" || $sNombre[0]=='"' ){
$stxt .= $sNombre.' '.$sAlias;
}else if( is_numeric($sNombre) ){
$stxt .= $sNombre.' '.$sAlias;
}else if( eSubstrCount($sNombre,')')>0 ){
list(,$tmp2) = explode("(",$sNombre);
$tmp2 = explode(",",str_replace(")",",",$tmp2));
for($p=0; $p<count($tmp2); $p++){
$tmp2[$p] = trim($tmp2[$p]);
if( $tmp2[$p][0]=="'" || $tmp2[$p][0]=='"' ){
}else if( ((float)$tmp2[$p])===$tmp2[$p] ){
}else{
$iCampo = $tmp2[$p];
$stxt .= str_replace($iCampo, 'A.'.$iCampo, $sNombre);
if( $sAlias<>"" ) $stxt .= " ".$sAlias;
break;
}
}
}else{
if( $Campos!="" ){
if( $tipoOrden!="" ) $CampoOriginal = trim(mb_substr($CampoOriginal,0,-mb_strlen($tipoOrden)));
$p = mb_strpos($Campos, $CampoOriginal);
$CampoOriginal = preg_replace('/ asc$/i', "", $CampoOriginal);
$CampoOriginal = preg_replace('/ desc$/i', "", $CampoOriginal);
$tmp4 = explode(" ", $CampoOriginal);
$ult = count($tmp4);
if( $ult==1 ){
if( $p!==false ){
if( mb_substr($Campos, $p-1, 1)=="." ){
$stxt .= mb_substr($Campos, $p-2, 2).$tmp4[0];
}else{
$stxt .= "A.".$tmp4[0];
}
}else{
$stxt .= "A.".$tmp4[$i];
}
}else{
$stxt .= $tmp4[1];
}
$stxt .= $tipoOrden;
}
}
}
}
}else{
$stxt .= $tmp[$i];
}
$txt = $stxt;
}
}
if( trim($Campos)!='*' ){
$DimAlias = array();
for($i=0; $i<count($_Form); $i++){
$tmp2 = explode(' ', trim($_Form[$i][1]));
$DimAlias[trim($tmp2[count($tmp2)-1])] = 'X';
}
$stxt = $txt.' ';
$stxt = preg_replace('/ DESC /iu' ,' ',$stxt);
$stxt = preg_replace('/ ASC /iu'  ,' ',$stxt);
$stxt = preg_replace('/ DESC, /iu',', ',$stxt);
$stxt = preg_replace('/ ASC, /iu' ,', ',$stxt);
$stxt = trim($stxt);
$tmp = _explodePorComa($stxt);
for($i=0; $i<count($tmp); $i++){
$tmp2 = explode(' ', trim($tmp[$i]));
$xAlias = trim($tmp2[count($tmp2)-1]);
$tmp2[0] = trim($tmp2[0]);
if( mb_substr($tmp2[0],0,7)=='decode(' ){
for($p=$i+1; $p<count($tmp); $p++){
if( mb_substr(trim($tmp[$p]),-1)==')' ){
$i = $p;
break;
}
}
continue;
}
if( !is_numeric($tmp2[0]) && mb_substr($tmp2[0],0,7)<>"mb_substr(" ){
if( $HaySelect ){
if( $tmp2[0]!='' && eSubstrCount(trim($Campos).',', $tmp2[0].',')==0 && eSubstrCount(' '.trim($Campos).',', ' '.$tmp2[0].',')==0 ){
if( $DimAlias[$xAlias]!='X' && $tmp2[0][0]!="*" ) $Campos .= ','.$tmp2[0];
}
}else{
if( $tmp2[0]!='' && eSubstrCount(','.trim($Campos).',', ','.$tmp2[0].',')==0 && eSubstrCount('('.trim($Campos).',', ','.$tmp2[0].',')==0 ){
if( $DimAlias[$xAlias]!='X' && $tmp2[0][0]!="*" ) $Campos .= ','.$tmp2[0];
}
}
}
}
}
if( $Campos[0]=="," ) $Campos = mb_substr($Campos,1);
$txt = $txt.$GroupBy;
if( eSubstrCount($txt, ' ')>0 ){
$tmp = explode(',',$txt);
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
if( eSubstrCount($tmp[$i], ' ')>0 ){
$tmp2 = explode(' ',$tmp[$i]);
$t = count($tmp2)-1;
if( mb_strtoupper($tmp2[$t])!='ASC' && mb_strtoupper($tmp2[$t])!='DESC' ) $tmp[$i] = $tmp2[1];
}
}
$txt = implode(",", $tmp);
}
return $txt;
}
function _qOrder($order, $Campos=""){
global $DimAliasField, $HaySelect;
if( !$HaySelect || trim($order)=="" ) return $order;
$Campos = trim($Campos);
$txt  = "";
$stxt = "";
$order = preg_replace('/ as /', ' ', $order);
$Dim = explode(",", trim(str_replace("  ", " ", trim($order))));
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
$CampoOriginal = $Dim[$n];
$tmp = explode(" ", $Dim[$n]);
$ult = count($tmp)-1;
$tipoOrden = (mb_strtoupper($tmp[$ult])=="ASC" || mb_strtoupper($tmp[$ult])=="DESC") ?  " ".$tmp[$ult] : "";
if( !empty($txt) ) $txt .= ",";
if( is_numeric($tmp[0]) ){
$txt .= $tmp[0];
}else{
$campoSinDir = preg_replace("/ desc$/i", "", $tmp[0]);
$i = 0;
if( $tmp[$i]=="cdi__" ){
$txt .= $tmp[0];
}else if( $tmp[$i]=="A.cdi__" ){
$stxt .= mb_substr($tmp[$i],2);
}else if( $tmp[$i]=="action__" ){
$stxt .= $tmp[$i];
}else if( $tmp[$i]=="A.action__" ){
$stxt .= mb_substr($tmp[$i],2);
}else if( mb_strpos("{$Campos},", " {$campoSinDir}," )!==false ){
$txt .= $tmp[0];
}else if( eSubstrCount($tmp[0], ".")==0 ){
if( mb_substr($tmp[0],-1)==")" && is_numeric(mb_substr($tmp[0],0,-1)) ){
$txt .= $tmp[0];
}else if( !empty($tipoOrden) && count($tmp)==3 ){
$txt .= $tmp[1];
}else if( !empty($tipoOrden) && count($tmp)==2 ){
if( !empty($DimAliasField[$tmp[0]]) ) $txt .= $DimAliasField[$tmp[0]].".";
$txt .= $tmp[0];
}else if( !empty($DimAliasField[$tmp[0]]) ){
$txt .= $DimAliasField[$tmp[0]].".".$tmp[0];
}else{
if( !empty($Campos) ){
if( !empty($tipoOrden) ) $CampoOriginal = trim(mb_substr($CampoOriginal,0,-mb_strlen($tipoOrden)));
$p = mb_strpos($Campos, $CampoOriginal);
if( $p!==false ){
if( mb_substr($Campos, $p-1, 1)=="." ){
$stxt .= mb_substr($Campos, $p-2, 2).$tmp[0];
}else{
$stxt .= "A.".$tmp[$i];
}
}else{
$stxt .= "A.".$tmp[$i];
}
}
}
}else{
$txt .= $tmp[0];
}
}
$txt .= $tipoOrden;
}
return $txt;
}
function GetCampos(&$Campos){
global $_Form;
for($n=0; $n<count($_Form); $n++){
if( !empty($Campos) ) $Campos .= ', ';
$Campos .= $_Form[$n][1];
}
}
function qGetSelect(){
global $_Form;
$Campos = '';
for($n=0; $n<count($_Form); $n++){
if( $Campos!='' ) $Campos .= ', ';
$Campos .= $_Form[$n][1];
}
return $Campos;
}
$_SortNumCol = 0;
$_SortOrderUp = true;
function _SortNumeros($a,$b){
global $_SortNumCol, $_SortOrderUp;
if( $_SortOrderUp ){
return( str_replace( '.', '',$a[$_SortNumCol]) <= str_replace( '.', '',$b[$_SortNumCol]) );
}else{
return( str_replace( '.', '',$a[$_SortNumCol]) >  str_replace( '.', '',$b[$_SortNumCol]) );
}
}
function _SortDecimales($a,$b){
global $_SortNumCol, $_SortOrderUp;
if( $_SortOrderUp ){
return( str_replace( ',', '.', str_replace( '.', '',$a[$_SortNumCol])) <= str_replace( ',', '.', str_replace( '.', '',$b[$_SortNumCol])) );
}else{
return( str_replace( ',', '.', str_replace( '.', '',$a[$_SortNumCol])) >  str_replace( ',', '.', str_replace( '.', '',$b[$_SortNumCol])) );
}
}
function _SortFechas($a,$b){
global $_SortNumCol, $_SortOrderUp;
if( $_SortOrderUp ){
return( mb_substr($a[$_SortNumCol],6,4).mb_substr($a[$_SortNumCol],3,2).mb_substr($a[$_SortNumCol],0,2) <= mb_substr($b[$_SortNumCol],6,4).mb_substr($b[$_SortNumCol],3,2).mb_substr($b[$_SortNumCol],0,2) );
}else{
return( mb_substr($a[$_SortNumCol],6,4).mb_substr($a[$_SortNumCol],3,2).mb_substr($a[$_SortNumCol],0,2) >  mb_substr($b[$_SortNumCol],6,4).mb_substr($b[$_SortNumCol],3,2).mb_substr($b[$_SortNumCol],0,2) );
}
}
function _SortNormal($a,$b){
global $_SortNumCol, $_SortOrderUp;
if( $_SortOrderUp ){
return( $a[$_SortNumCol] <= $b[$_SortNumCol] );
}else{
return( $a[$_SortNumCol] > $b[$_SortNumCol] );
}
}
function _SortToUpper($a,$b){
global $_SortNumCol, $_SortOrderUp;
if( $_SortOrderUp ){
return( mb_strtoupper($a[$_SortNumCol]) <= mb_strtoupper($b[$_SortNumCol]) );
}else{
return( mb_strtoupper($a[$_SortNumCol]) >  mb_strtoupper($b[$_SortNumCol]) );
}
}
function _QSortMultiArray(&$array, $num=0, $order='ASC', $Tipo='C'){
$GLOBALS['_SortNumCol'] = $num;
$GLOBALS['_SortOrderUp'] = ($order!='ASC');
switch( $Tipo ){
case 'F4':
usort($array, '_SortFechas');
return;
case '+':  case '-': case '*':
case '+,': case '-,':
case '0': case 'P4':
usort($array, '_SortNormal');
return;
default:
usort($array, '_SortToUpper');
return;
}
}
function gsCambiaComa( $Valor ){
if( eSubstrCount($Valor, '(')==0 ) return $Valor;
$txt = '';
$Cambiar = false;
for($n=0; $n<mb_strlen($Valor); $n++){
$c = mb_substr($Valor,$n,1);
if( $c=='(' ) $Cambiar = true;
if( $c==')' ) $Cambiar = false;
$txt .= ($Cambiar && $c==',') ? '&#44;' : $c;
}
return $txt;
}
function DbJoinTable( $_DBJOINTABLE, $HaySelect ){
$cAlias = '';
$nAlias = 65;
if( $nAlias > 90 ){
$cAlias = 'A';
$nAlias = 65;
}
$DimTabla = array();
$DimBusca = array();
$DimTabla[$_DBTABLE] = $cAlias.mb_chr($nAlias);
$sTabla = $_DBTABLE;
$_DBTABLE = $_DBTABLE.' '.$cAlias.mb_chr($nAlias);
if( trim($Busca) != '' ) $DimBusca = explode( ' and ', $Busca );
$Busca = '';
for( $n=0; $n < count($DimBusca); $n++ ){
if( !empty($Busca) ) $Busca .= ' and ';
$saltar = false;
for( $i=0; $i < count($_DBJOINTABLE); $i++ ){
$cmp = explode( '=', $DimBusca[$n] );
if( $_DBJOINTABLE[$i][0] == trim($cmp[0]) ){
$saltar = true;
$pTabla = trim(mb_substr( $_DBJOINTABLE[$i][1],0,mb_strpos( $_DBJOINTABLE[$i][1],'.')));
if( eSubstrCount( $_DBTABLE, $pTabla ) == 0 ){
$nAlias++;
if( $nAlias > 90 ){
$cAlias = 'A';
$nAlias = 65;
}
$_DBTABLE .= ', ' . $pTabla.' '.$cAlias.mb_chr($nAlias);
$DimTabla[$pTabla] = $cAlias.mb_chr($nAlias);
}
$tmp1 = str_replace( $sTabla.'.', 'A.', $_DBJOINTABLE[$i][1] );
$tmp2 = mb_substr( $_DBJOINTABLE[$i][1],0,mb_strpos( $_DBJOINTABLE[$i][1],'.') ).'.' . trim($DimBusca[$n]);
$tmp1 = str_replace( $pTabla.'.', $cAlias.mb_chr($nAlias).'.', $tmp1 );
$tmp2 = str_replace( $pTabla.'.', $cAlias.mb_chr($nAlias).'.', $tmp2 );
$Busca .= $tmp1 . ' and ' . $tmp2;
$Extraer .= ', '.mb_substr( $_DBJOINTABLE[$i][1],0,mb_strpos( $_DBJOINTABLE[$i][1],'.') ).$_DBJOINTABLE[$i][0];
break;
}
}
if( !$saltar ) $Busca .= $cAlias.mb_chr($nAlias).'.'.trim($DimBusca[$n]);
}
if( !empty($_estructura) ){
$DimDef = file( '../_datos/exp/'.$_estructura );
for( $n=0; $n < count($DimDef); $n++ ){
$DimDef[$n] = trim($DimDef[$n]);
if( $DimDef[$n][0] != '.' && $DimDef[$n][0] != '-' && !empty($DimDef[$n]) && $DimDef[$n][0] != '|' ){
if( $DimDef[$n][0] == '[' ){
list( $tmpEti, $tmp ) = explode( "]", $DimDef[$n] );
$tmpEti = str_replace( '[', '', $tmpEti );
if( $tmpEti == 'Orden' ) $_Orden = trim( $tmp );
}else{
array_push( $_EXPORT, explode( '|', $DimDef[$n] ) );
}
}
}
}
$DimOrden = explode( ',', $_Orden );
$_Orden = '';
for($n=0; $n < count($DimOrden); $n++){
if( !empty($_Orden) ) $_Orden .= ',';
$_Orden .= 'A.'.trim($DimOrden[$n]);
}
}
function eAddShowFilter($Condi, $Antes=true, $MaxRows=null, $HV=null){
global $_AddShowFilter, $_AddShowFilterTop, $_RowsMaxShowFilter, $_ClearShowFilter, $_OrientationShowFilter, $_SHOWFILTER;
if( $Antes===2 ){
$_ClearShowFilter = true;
$Antes = true;
}
if( is_array($Condi) ){
$_AddShowFilter = $Condi;
}else{
$_AddShowFilter[] = $Condi;
}
$_AddShowFilterTop = $Antes;
if( $MaxRows!=null ) $_RowsMaxShowFilter = $MaxRows;
if( $HV!=null ) $_OrientationShowFilter = mb_strtoupper($HV);
$_SHOWFILTER = true;
}
function eDelShowFilter($Campos){
global $_PDFLABELHIDDEN, $_SHOWFILTER;
if( trim($Campos)=='*' ){
foreach($_POST as $k=>$v) $_PDFLABELHIDDEN[$k] = 'NOTTOSHOW';
foreach($_GET as $k=>$v) $_PDFLABELHIDDEN[$k] = 'NOTTOSHOW';
$_SHOWFILTER = false;
}else{
$tmp = explode(',', eNsp($Campos));
for($n=0; $n<count($tmp); $n++){
$_PDFLABELHIDDEN[$tmp[$n]] = 'NOTTOSHOW';
}
}
}
function _GetForm( $sModo, $File, &$_Form ){
include_once(DIREDES.'getform.inc');
}
function PintaCondiciones($_DBADDFILTER){
if( $GLOBALS['_ISUBLIST'] ) return array();
global $_PDFTH, $_Form, $_TIPTH, $_AddShowFilter, $_AddShowFilterTop, $_RowsMaxShowFilter, $_ClearShowFilter, $_PDFLABELHIDDEN;
global $_RowsMaxShowFilter, $_OrientationShowFilter, $DimDBRange, $__Lng, $_LABELCONDITION, $_CHANGEFILTER, $_PSCRIPT, $_NOTITLE;
global $_TextOverride, $_HIDDENFIELDS, $_ListToolsMenuType;
$sql = trim($_DBADDFILTER);
eDelShowFilter('_ReportAll,_ReportCol,_ReportRow, _ReportAgeRange, _ORDEN_, _PDFBREAKPAGE, _gs_formato_, _MD5, '.$_HIDDENFIELDS);
if( $_PSCRIPT!='' ){
global $_SourceScript;
$File = mb_substr($_PSCRIPT, 2);
$tmp = explode('/', $File);
if( eSubstrCount($_SourceScript, $tmp[count($tmp)-1])==0 && eIsHTML() ) _GetForm($_PSCRIPT[0], $File, $_Form);
}
for($n=0; $n<count($DimDBRange); $n++){
$_PDFLABELHIDDEN[$DimDBRange[$n][4]] = 'NOTTOSHOW';
$_PDFLABELHIDDEN[$DimDBRange[$n][5]] = 'NOTTOSHOW';
}
$_PDFCONDITION = array();
if( !empty($_GET['_PSCRIPT']) ){
list($sOp, $sScr) = explode(':', $_GET['_PSCRIPT']);
_OpenDF($_PDFCONDITION);
}
foreach($_PDFLABELHIDDEN as $k=>$l){
list($l) = explode('\\',$l);
$_PDFLABELHIDDEN[$k] = $l;
$v = '';
if( !empty($_POST[$k]) ) $v = $_POST[$k];
if( !empty($_GET[$k])  ) $v = $_GET[$k];
if( !empty($v) && ($v[0]=='"' || $v[0]=="'") ) $v = mb_substr($v,1,-1);
if( !empty($v) && isset($_PDFCONDITION[$k]) && gettype($_PDFCONDITION[$k])=='string' && mb_strtoupper($_PDFCONDITION[$k])!='NOTTOSHOW' ){
$_PDFCONDITION[$k] = array($l, $v);
}
}
foreach($_POST as $k=>$v){
$v = trim($v);
if( !empty($v) ){
if( isset($_PDFLABELHIDDEN[$k]) && mb_strtoupper($_PDFLABELHIDDEN[$k])=='NOTTOSHOW' ) continue;
if( mb_substr($k,0,7)=='_INPUT_' ){
$k = mb_substr($k,7);
}else if( $k[0]=='_' ) continue;
$_PDFCONDITION[$k][1] = $v;
}
}
global $_oFILTER;
if( !empty($_oFILTER) ){
$Dim = explode(' and ',$_oFILTER);
for($n=0; $n<count($Dim); $n++){
$tmp = trim($Dim[$n]);
if( $tmp[0]=="(" && mb_substr($tmp,-1)==")" ){
$tmp = mb_substr($tmp, 1, -1);
}
list($k, $v) = explode('=', $tmp);
if( is_numeric($k) ) continue;
$k = trim($k);
$v = trim($v);
$_GET[$k] = $v;
if( $v[0]=='"' || $v[0]=="'" ) $v = mb_substr($v,1,-1);
if( mb_substr($k,0,7)!='_INPUT_' && $_POST["_INPUT_{$k}"]!="" ){
$v = $_POST["_INPUT_{$k}"];
}
if( !empty($v) && mb_strtoupper($_PDFCONDITION[$k])!='NOTTOSHOW' ){
$_PDFCONDITION[$k][1] = $v;
}
list($k) = explode(' ', trim($k));
if( !empty($k) && $v!='' && gettype($_PDFCONDITION[$k])=='string' && mb_strtoupper($_PDFCONDITION[$k])!='NOTTOSHOW' ){
if( $_LABELCONDITION[$k]!='' ) $k = $_LABELCONDITION[$k];
if( $_PDFCONDITION[$k]=='' ) $_PDFCONDITION[$k] = array($k, $v);
}
}
}
if( $_ClearShowFilter ) $_PDFCONDITION = array();
$_DimCondicion = array();
if( count($_AddShowFilter)>0 && $_AddShowFilterTop ){
$_DimCondicion = $_AddShowFilter;
}
$_DimChangeFilter = array();
$ie = -1; $DimTitle = array();
foreach($_PDFCONDITION as $k=>$v){
$ie++;
if( mb_strtoupper($_PDFLABELHIDDEN[$k])=='NOTTOSHOW' ) continue;
$xLabel = trim(strip_tags($v[0]));
$Valor = trim($v[1]);
if( $Valor=="" ) continue;
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]!=$k ) continue;
$xLabel = trim($_Form[$n][0]);
if( !empty($_TIPTH[$n]) ){
$DimTitle[$ie] = " (".$_TIPTH[$n].")";
}
if( $_PDFTH[$n]!='' ) $xLabel = $_PDFTH[$n];
if( $_Form[$n][3]=='C' ){
if( $Valor==$_ENV['ON'] ) $Valor = $__Lng[41];
if( $Valor==$_ENV['OFF'] ) $Valor = $__Lng[42];
if( $Valor=='<>'.$_ENV['ON'] ) $Valor = '<>'.$__Lng[41];
}else if( $Valor<>'' && ($_Form[$n][2][0]=='-' || $_Form[$n][2][0]=='+') ){
$xValor = str_replace(array('>','<','='),'#',$Valor);
$xDim = explode('#',str_replace('##','#',$xValor));
for( $i=0; $i<count($xDim); $i++ ) if( trim($xDim[$i])<>'' ){
$Decimales = 0;
if( eSubstrCount($_Form[$n][4], ',')>0 ){
list(,$Decimales) = explode(',', $_Form[$n][4]);
}
$NewValor = eNumberFormat($xDim[$i], $Decimales);
$Valor = str_replace($xDim[$i], $NewValor, $Valor);
}
}
if( $_LABELCONDITION[$_Form[$n][1]]!='' ) $xLabel = $_LABELCONDITION[$_Form[$n][1]];
break;
}
if( $_PDFLABELHIDDEN[$k]!='' ) $xLabel = $_PDFLABELHIDDEN[$k];
if( $k[0]=='_' || is_numeric($k) ) continue;
if( $xLabel=='' ){
$xLabel = _GetLabel($k);
if( $xLabel=='' ) continue;
}
if( $xLabel[0]=='<' && eSubstrCount($xLabel, '<')!=eSubstrCount($xLabel, '>') ) $xLabel = trim(mb_substr($xLabel,1));
if( $xLabel[0]==',' || $xLabel[0]=='+' ) $xLabel = trim(mb_substr($xLabel,1));
if( is_numeric($xLabel[0]) ) $xLabel = trim(mb_substr($xLabel,1));
if( $xLabel[0]==']' ) $xLabel = trim(mb_substr($xLabel,1));
if( $xLabel[0]=="@" && mb_substr($xLabel,-1)=="@" ){
$xLabel = eLng(mb_substr($xLabel,1,-1));
}
$Etiqueta = eStrUpper($xLabel);
if( mb_strlen($Etiqueta)<=2 && $DimTitle[$ie]<>"" ) $Etiqueta .= $DimTitle[$ie];
$Etiqueta = str_replace('&nbsp;',' ',$Etiqueta);
$Etiqueta = str_replace('&NBSP;',' ',$Etiqueta);
$Etiqueta = str_replace('<BR>',' ',$Etiqueta);
$Etiqueta = str_replace('<br>',' ',$Etiqueta);
$Etiqueta = str_replace('<Br>',' ',$Etiqueta);
$Etiqueta = str_replace('<bR>',' ',$Etiqueta);
$Etiqueta = str_replace('ÃÂ·',' ',$Etiqueta);
$oValor = $Valor;
if( ($Valor[0]=="(" && mb_substr($Valor,-1)==")") || ($Valor[0]==")" && mb_substr($Valor,-1)=="(") ){
$Valor = str_replace(array("'",'"'),array('',''),mb_substr($Valor,1,-1));
}
$Valor = DivideValor($Valor, $k);
if( mb_substr($k,0,3)=="cd_" ){
if( is_numeric($oValor) ){
$nmTabla = mb_substr($k,3);
$r = qQuery("select nm_{$nmTabla} from {$nmTabla} where {$k}='{$oValor}'", $p1, true);
if( $r!=-1 ){
$r = qRow($p1);
if( $r[0]!="" ) $Valor = ": ".$r[0];
}
}else if( $oValor[0]=='(' && mb_substr($oValor,-1)==')' ){
$izq = ""; $mid = ""; $dch = "";
if( SETUP::$List['ToolsMenuType']=="B" ){
$mid = "<br>";
$izq = '<span style="margin-left:50px">';
$dch = '</span>';
}
$txt = "";
$nmTabla = mb_substr($k,3);
$r = qQuery("select nm_{$nmTabla} from {$nmTabla} where {$k} in {$oValor} order by nm_{$nmTabla}", $p1, true);
if( $r!=-1 ){
while( $r=qRow($p1) ){
if( $txt!='' ) $txt .= ', '.$mid;
$txt .= $izq.$r[0].$dch;
}
if( $txt!="" ) $Valor = ":".$mid.$txt;
}
}
}
$Valor = str_replace('&amp;' ,'&',$Valor);
$Valor = str_replace('&quot;','"',$Valor);
$Valor = str_replace('&#34;','"',$Valor);
$Valor = str_replace('&#39;',"'",$Valor);
$Valor = str_replace('&#43;','+',$Valor);
$Valor = str_replace('&#92;','\\',$Valor);
$Valor = str_replace(CHR92.'"','"',$Valor);
$Valor = str_replace(CHR92."'","'",$Valor);
$Valor = str_replace(CHR92.CHR92,CHR92,$Valor);
$_DimCondicion[] = trim($Etiqueta).$Valor;
$_DimChangeFilter[count($_DimCondicion)-1] = $k;
}
if( count($_AddShowFilter)>0 ){
if( !$_AddShowFilterTop ) $_DimCondicion = array_merge($_DimCondicion, $_AddShowFilter);
}
if( count($_DimCondicion)==0 && !empty($_POST["_ChangeFilter_"]) ){
}else if( count($_DimCondicion)==0 ) return array();
if( function_exists('eChangeListCondition') ){
$_DimCondicion = eChangeListCondition($_DimCondicion);
}
echo '<span style="display:block;width:100%;text-align:left"'.(($_NOTITLE)?' class=CondiNoTitle':'').'>';
echo '<table id="CONDICIONES" cellspacing=0px cellpadding=0px border=0px onclick="_SetCaption(\'LI\')">';
$txt = $__Lng[count($_DimCondicion)<=1 ? 78:43];
if( !empty($_TextOverride['condition']) ) $txt = $_TextOverride['condition'];
if( $_RowsMaxShowFilter>-1 && count($_DimCondicion)>$_RowsMaxShowFilter ){
$t = count($_DimCondicion);
$c = ceil($t/$_RowsMaxShowFilter);
$s = ceil($t/$c);
if( $txt!='-' ) echo '<TR><TH colspan='.$c.'>'.$txt.':';
$n = 0; $p = 0; $rr = 0;
if( $_OrientationShowFilter!='V' ){
while( $rr<count($_DimCondicion) ){
echo '<TR>';
for($i=0; $i<$c; $i++){
if( !empty($_DimCondicion[$p]) ){
if( $i==0 ){
echo '<TD style="text-align:left"><LI>'.$_DimCondicion[$p].'</LI>';
}else{
echo '<TD style="text-align:left;padding-left:12px"><LI>'.$_DimCondicion[$p].'</LI>';
}
}
$p += $s;
$rr++;
}
$p -= ($c*$s)-1;
}
}else{
while( $p<count($_DimCondicion) ){
echo '<TR>';
for( $i=0; $i<$c; $i++ ){
if( empty($_DimCondicion[$p]) ) break;
if( $i==0 ){
echo '<TD style="text-align:left"><LI>'.$_DimCondicion[$p].'</LI>';
}else{
echo '<TD style="text-align:left;padding-left:12px"><LI>'.$_DimCondicion[$p].'</LI>';
}
$p++;
}
}
}
}else{
if( $txt!='-' ) echo '<TR><TH>'.$txt.':';
echo '<TR><TD style="text-align:left">';
if( !empty($_POST["_ChangeFilter_"]) ){
list($campo, $label) = explode("|", $_POST["_ChangeFilter_"]);
$Dim = _ChangeFilterGet($_CHANGEFILTER[$campo][0]);
echo '<script type="text/javascript">';
echo 'var _DIM_'.$campo.'={';
for($i=0; $i<count($Dim); $i++){
if( trim($Dim[$i][1])=="" ) $Dim[$i][1] = "&nbsp;";
echo (($i==0)?'':',')."'.{$Dim[$i][0]}':'{$Dim[$i][1]}'";
}
echo '};';
echo '</script>';
echo '<LI title="'.$__Lng[118].'" eFilterField="'.$campo.'" onclick=_ChangeFilter("'.$campo.'")>'.$label.' <i class="ICONINPUT ICONUPDATE">V</i></LI>';
}
for($n=0; $n<count($_DimCondicion); $n++){
if( !empty($_CHANGEFILTER[$_DimChangeFilter[$n]][0]) ){
$Dim = _ChangeFilterGet($_CHANGEFILTER[$_DimChangeFilter[$n]][0]);
echo '<script type="text/javascript">';
echo 'var _DIM_'.$_DimChangeFilter[$n].'={';
for($i=0; $i<count($Dim); $i++){
if( empty(trim($Dim[$i][1])) ) $Dim[$i][1] = "&nbsp;";
echo (($i==0)?'':',')."'.{$Dim[$i][0]}':'{$Dim[$i][1]}'";
}
echo '};';
echo '</script>';
echo '<LI title="'.$__Lng[118].'" eFilterField="'.$_DimChangeFilter[$n].'" onclick=_ChangeFilter("'.$_DimChangeFilter[$n].'")>'.$_DimCondicion[$n];
echo ' <i class="ICONINPUT ICONUPDATE">V</i>';
echo '</LI>';
}else{
echo '<LI>'.$_DimCondicion[$n].'</LI>';
}
}
foreach($_CHANGEFILTER as $k=>$v){
if( $k[0]!='_' || empty($_POST[$k]) || empty($_CHANGEFILTER[$k][0]) ) continue;
$Dim = _ChangeFilterGet($_CHANGEFILTER[$k][0]);
echo '<script type="text/javascript">';
echo 'var _DIM_'.$k.'={';
for($i=0; $i<count($Dim); $i++){
if( empty(trim($Dim[$i][1])) ) $Dim[$i][1] = "&nbsp;";
echo (($i==0)?'':',')."'.{$Dim[$i][0]}':'{$Dim[$i][1]}'";
}
echo '};';
echo '</script>';
$xValor = '';
for($n=0; $n<count($Dim); $n++) if( $_POST[$k]==$Dim[$n][0] ){
$xValor = $Dim[$n][1];
break;
}
echo '<LI title="'.$__Lng[118].'" eFilterField="'.$k.'" onclick=_ChangeFilter("'.$k.'")>'._GetLabel($k).': '.$xValor.' <i class="ICONINPUT ICONUPDATE">V</i>';
}
}
echo '</TABLE>';
echo '</span>';
return $_DimCondicion;
}
function eShowFilter($Condi){
if( gettype($Condi)!='array' ) return;
if( count($Condi)==0 ) return;
global $_eShowFilter, $_eShowFilterHTML, $_NOTITLE;
$txt  = '';
$txt .= '<span style="display:block;width:100%;text-align:left;"'.(($_NOTITLE)?' class=CondiNoTitle':'').'>';
$txt .= '<table id="CONDICIONES" cellspacing=0px cellpadding=0px border=0px onclick="_SetCaption(\'LI\')">';
if( count($Condi[0])==1 ){
$txt .= '<TR><TH colspan=2>'.$Condi[0].':';
$_eShowFilter[] = $Condi[0];
$i = 1;
}else{
$txt .= '<TR><TH colspan=2>'.$GLOBALS['__Lng'][43].':';
$_eShowFilter[] = $GLOBALS['__Lng'][43];
$i = 0;
}
$txt .= '<TR><TD style="text-align:left">';
for($n=$i; $n<count($Condi); $n++){
if( $Condi[$n][0][0]=="_" ) continue;
if( eSubstrCount('<>=*', $Condi[$n][1][0])==0 ){
$Condi[$n][1] = '= '.$Condi[$n][1];
}else{
switch( mb_substr($Condi[$n][1],0,2) ){
case '>=':
case '<=':
case '<>':
$Condi[$n][1] = mb_substr($Condi[$n][1],0,2).' '.mb_substr($Condi[$n][1],2);
break;
default:
switch( $Condi[$n][1][0] ){
case '>':
case '<':
case '=':
$Condi[$n][1] = $Condi[$n][1][0].' '.mb_substr($Condi[$n][1],1);
break;
default:
}
}
}
$txt .= '<LI>'.$Condi[$n][0].'<span style="margin-left:7px;white-space:normal;'.$Condi[$n][2].'">'.$Condi[$n][1].'</span></LI>';
$_eShowFilter[] = array($Condi[$n][0].' '.$Condi[$n][2], $Condi[$n][1]);
}
$txt .= '</TABLE></span>';
$_eShowFilterHTML = $txt;
}
function _OpenDF(&$Condi){
global $_PDFLABELHIDDEN;
list($sOp, $sScr) = explode(':', $_GET['_PSCRIPT']);
$DimOpcion = array($sOp);
$Form = array();
$OnCampos = false;
$ElPuntoEsRem = true;
if( mb_substr($sScr, 0, mb_strlen(DIREDES))!=DIREDES ){
$sScr = eScript($sScr);
}
$_DimEDF = @OpenDF($sScr, 0);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && mb_substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/iu',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( mb_ord($buffer[0])==91 ){
$Etiqueta = mb_strtoupper(mb_substr($buffer, 1, mb_strpos($buffer,']')-1));
switch( $Etiqueta ){
case 'FIELDS':
$TipoEntrada = '';
$OnCampos = true;
break;
case 'LANGUAGE';
global $_LANGUAGE, $_LNGCOLDEFAULT, $_LanguageTron;
$_LANGUAGE = array();
$tmp2 = explode( ',', trim(eNsp($tmp[0])) );
for( $n=0; $n<count($tmp2); $n++ ){
if( $tmp2[$n]==SESS::$_LANGUAGE_ ) $_LNGCOL = $n+1;
if( $tmp2[$n]==SESS::$_LanguageDefault ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (mb_strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && SESS::$_Development ) $_LanguageTron = '~';
if( mb_strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
$OnCampos = false;
break;
case 'NOTE':
case 'EXIT':
break 2;
default:
$OnCampos = false;
}
}else{
if( $OnCampos ){
IncluirEnForm('F', $sOp, $buffer, $Form, $_DEFAUX, 1);
}else if( $TipoEntrada=='_LANGUAGE' ){
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array('@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron);
}
}
}
for($n=0; $n<count($Form); $n++){
if( trim($_POST[$Form[$n][1]])!='' && $_PDFLABELHIDDEN[$Form[$n][1]]!='NOTTOSHOW' ){
$Condi[$Form[$n][1]] = array($Form[$n][0], $_POST[$Form[$n][1]]);
}
}
}
function EditListSS($Form, $lin){
global $_RELATIONFIELDS, $_SelectReal, $_Form;
$ca = '';
$NomCampo = $_SelectReal[$Form[1]];
for( $n=0; $n<count($_RELATIONFIELDS); $n++ ){
$sCampo = $NomCampo;
if( eSubstrCount( $NomCampo, ':' ) > 0 ){
list($sCampo,) = explode( ':', $NomCampo );
}else if( eSubstrCount( $NomCampo, '{' ) > 0 ){
list($sCampo,) = explode( '{', $NomCampo );
}
$sCampo = trim($sCampo);
if( eSubstrCount( $_RELATIONFIELDS[$n], ','.$sCampo.',' ) ){
$tmp = mb_substr($_RELATIONFIELDS[$n],mb_strpos( $_RELATIONFIELDS[$n], ','.$sCampo.',' )+1);
$stmp = explode(',',mb_substr($tmp,0,-1));
for( $i=1; $i<count($stmp); $i++ ){
for( $p=0; $p<count($_Form); $p++ ){
if( $stmp[$i] == $_SelectReal[$_Form[$p][1]] ){
if( $ca!='' ) $ca .= '|';
$ca .= $p.'';
break;
}
}
}
}
}
if( $ca!='' ) echo ' CA="'.$ca.'"';
$sf = '';
$NomCampo = $_SelectReal[$Form[1]];
for($n=0; $n<count($_RELATIONFIELDS); $n++){
$sCampo = $NomCampo;
if( eSubstrCount( $NomCampo, ':' ) > 0 ){
list($sCampo,) = explode( ':', $NomCampo );
}else if( eSubstrCount( $NomCampo, '{' ) > 0 ){
list($sCampo,) = explode( '{', $NomCampo );
}
$sCampo = trim($sCampo);
if( eSubstrCount( $_RELATIONFIELDS[$n], ','.$sCampo.',' ) && mb_strpos( $_RELATIONFIELDS[$n], ','.$sCampo.',' ) > 0 ){
$tmp = mb_substr($_RELATIONFIELDS[$n],0,mb_strpos( $_RELATIONFIELDS[$n], ','.$sCampo.',' )+1);
$stmp = explode(',',mb_substr($tmp,1,-1));
for($i=0; $i<count($stmp); $i++){
for($p=0; $p<count($_Form); $p++){
if( $stmp[$i]==$_SelectReal[$_Form[$p][1]] ){
if( $sf!='' ) $sf .= '|';
$sf .= $p.'';
break;
}
}
}
}
}
if( $sf!='' ) echo ' SF="'.$sf.'"';
if( mb_strtoupper($Form[3])=='SS' ){
global $_WHERESELECT;
for( $i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0] == $_SelectReal[$Form[1]] ){
echo ' ConFiltro="'.str_replace( '"', "'",$_WHERESELECT[$i][1]).'"';
}
}
}
return;
}
function eImgName($NmField, $Prefijo='', $Titulo='', $OnClick=''){
global $_UPLOADFILE, $_vF, $_pF;
$NmImg = $_vF[ $_pF[ $NmField ] ];
if( $Prefijo=='' ) $Prefijo = $_UPLOADFILE[$NmField]['PREFIJO'];
if( $Titulo!='' ) $Titulo = ' title="'.str_replace('"',"''",$Titulo).'"';
if( $OnClick!='' ) $OnClick = ' OnClick='.str_replace('"','"',$OnClick).';eClearEvent();';
$txt =	'<img src="edes.php?R:'.
$_UPLOADFILE[$NmField]['oDIR'].'/'.
_NmFileConPrefijo( $_vF[ $_pF[ $_UPLOADFILE[$NmField]['NOMBRE'] ] ].mb_substr($NmImg, mb_strrpos($NmImg,'.') ), $Prefijo ). '"'.
$Titulo.
$OnClick.
'>';
return $txt;
}
function eImgDocType($NmField, $Titulo='', $OnClick=''){
global $_vF, $_pF;
$NmImg = trim($_vF[ $_pF[ $NmField ] ]);
$tmp = explode('.',$NmImg);
if( $Titulo!='' ) $Titulo = ' title="'.str_replace('"',"''",$Titulo).'"';
if( $OnClick!='' ) $OnClick = ' OnClick='.str_replace('"','"',$OnClick).';eClearEvent();';
return '<img src="g/l_d_'.$tmp[count($tmp)-1].'.gif"'.$OnClick.$Titulo.'>';
}
function _DocVE($NmField, $NmFunc, $Titulo){
global $_UPLOADFILE, $_vF, $_pF, $_DBSERIAL, $_PosSerial;
$NmImg = $_vF[ $_pF[ $NmField ] ];
$tmp = explode('.',$NmImg);
if( $_UPLOADFILE[$NmField]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$NmField]['oDIR'].'/'._NmFileConPrefijo( $_vF[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$NmField]['PREFIJO'] );
}else{
$NomFile = $_UPLOADFILE[$NmField]['oDIR'].'/'._NmFileConPrefijo( $NmImg, $_UPLOADFILE[$NmField]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
return '<img src="g/l_d_'.$tmp[count($tmp)-1].'.gif" onclick='.$NmFunc.'("'.$NomFile.'") title="'.$Titulo.'">';
}
function eDocView($NmField){
global $__Lng;
return _DocVE( $NmField, 'eVD', $__Lng[44] );
}
function eDocEdit($NmField){
global $__Lng;
return _DocVE( $NmField, 'eUD', $__Lng[45] );
}
function _CalcFormato($Formato, $n){
global $_ALIGN, $_NOZERO;
$Formato = str_replace('&#44;',',',trim($Formato));
if( mb_strtoupper($Formato)=='IMG' || mb_strtoupper($Formato)=='ICON' ){
$_ALIGN[$n] = ' id=c';
$Formato = mb_strtoupper($Formato);
}else if( !empty($Formato) && mb_strlen($Formato)<4 ){
$Formato = str_replace('I','' ,$Formato);
$Formato = str_replace('C','c',$Formato);
$Formato = str_replace('D','d',$Formato);
$Formato = str_replace('L','' ,$Formato);
$Formato = str_replace('R','d',$Formato);
$Formato = str_replace('B','b',$Formato);
if( eSubstrCount($Formato, 'b')==1 ){
$_NOZERO[$n] = 'S';
$Formato = str_replace('b','',$Formato);
}
if( eSubstrCount($Formato, 'c')==1 ){
$_ALIGN[$n] = ' id=c';
$Formato = str_replace('c','',$Formato);
}else if( eSubstrCount($Formato, 'd')==1 ){
$_ALIGN[$n] = ' id=d';
$Formato = str_replace('d','',$Formato);
}
if( eSubstrCount($Formato, 'M')==1 ){
$Formato = str_replace('M','',$Formato);
$_ALIGN[$n] = ' id=d';
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.")";
}else{
$Formato = "eNumberFormat(#,0)";
}
}else if( eSubstrCount($Formato, 'N')==1 ){
$Formato = str_replace('N','',$Formato);
$_ALIGN[$n] = ' id=d';
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.",false)";
}else{
$Formato = "eNumberFormat(#,0,false)";
}
}
if( eSubstrCount('0123456789', $Formato)==1 ){
$_ALIGN[$n] = ' id=d';
$Formato = "eNumberFormat(#,".$Formato.")";
}
}
return $Formato;
}
function _CalcFormatTotals($Formato, $n){
global $_NOZEROFORMATTOTALS;
$Formato = str_replace('&#44;',',',trim($Formato));
if( !empty($Formato) && mb_strlen($Formato)<4 ){
$Formato = str_replace('I','' ,$Formato);
$Formato = str_replace('C','c',$Formato);
$Formato = str_replace('D','d',$Formato);
$Formato = str_replace('L','' ,$Formato);
$Formato = str_replace('R','d',$Formato);
$Formato = str_replace('B','b',$Formato);
if( eSubstrCount($Formato, 'b')==1 ){
$_NOZEROFORMATTOTALS[$n] = 'S';
$Formato = str_replace('b','',$Formato);
}
if( eSubstrCount($Formato, 'c')==1 ){
$Formato = str_replace('c','',$Formato);
}else if( eSubstrCount($Formato, 'd')==1 ){
$Formato = str_replace('d','',$Formato);
}
if( eSubstrCount($Formato, 'M')==1 ){
$Formato = str_replace('M','',$Formato);
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.")";
}else{
$Formato = "eNumberFormat(#,0)";
}
}else if( eSubstrCount($Formato, 'N')==1 ){
$Formato = str_replace('N','',$Formato);
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.",false)";
}else{
$Formato = "eNumberFormat(#,0,false)";
}
}
if( eSubstrCount('0123456789', $Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.")";
}
}
return $Formato;
}
function eGetFileVar(){
global $OriFichero, $_User;
$FileInfo = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.uv";
$EsGet = false;
$EsPost = false;
$EsGlobals = false;
$Dim = file($FileInfo);
for( $n=0; $n<count($Dim); $n++ ){
if( trim($Dim[$n])=='_GET:' ){
$EsGet = true;
$EsPost = false;
$EsGlobals = false;
continue;
}else if( trim($Dim[$n])=='_POST:' ){
$EsGet = false;
$EsPost = true;
$EsGlobals = false;
continue;
}else if( trim($Dim[$n])=='GLOBALS:' ){
$EsGet = false;
$EsPost = false;
$EsGlobals = true;
continue;
}
if( $EsGet && $Dim[$n][0]=='|' ){
list(,$k,$v) = explode('|',$Dim[$n]);
$_GET[$k] = rtrim($v);
}else if( $EsPost && $Dim[$n][0]=='|' ){
list(,$k,$v) = explode('|',$Dim[$n]);
$_POST[$k] = rtrim($v);
}else if( $EsGlobals ){
list(,$k,$v) = explode('|',$Dim[$n]);
$GLOBALS[$k] = unserialize(rtrim($v));
}
}
}
function ePutFileVar( $txt='' ){
global $OriFichero, $_User;
$df = fopen('../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.uv", 'w');
fwrite($df, "_GET:\n");
foreach($_GET as $k=>$v) fwrite($df, '|'.$k.'|'.$v."\n");
fwrite( $df, "_POST:\n" );
foreach( $_POST as $k=>$v ) fwrite( $df, '|'.$k.'|'.$v."\n" );
if( $txt!='' ){
fwrite( $df, "GLOBALS:\n" );
$tmp = explode(',',$txt);
for( $n=0; $n<count($tmp); $n++ ) fwrite( $df, '|'.$tmp[$n].'|'.serialize($GLOBALS[$tmp[$n]])."\n" );
}
fclose( $df );
}
function _DivideCampos($sql){
$sql = trim($sql);
if( mb_strtoupper(mb_substr($sql,0,6))=='SELECT' ) $sql = trim(mb_substr($sql,7));
$txt = '';
$IniParentesis = 0;
$IniComillaSencilla = 0;
$IniComillaDoble = 0;
$Dim = array();
for( $n=0; $n<mb_strlen($sql); $n++ ){
$c = mb_substr($sql,$n,1);
switch( $c ){
case ' ': case mb_chr(9): case CHR10: case CHR13:
if( $IniParentesis==0 && $IniComillaSencilla==0 && $IniComillaDoble==0 ){
if( mb_strtoupper(mb_substr($txt,-4))=='FROM' ){
$Dim[] = trim(mb_substr($txt,0,-4));
$c = $txt = '';
break;
}
}
break;
case ',':
if( $IniParentesis==0 && $IniComillaSencilla==0 && $IniComillaDoble==0 ){
$txt = trim($txt);
$Dim[] = $txt;
$c = $txt = '';
}
break;
case '(':
if( $IniComillaSencilla || $IniComillaDoble ) break;
$IniParentesis++;
break;
case ')':
if( $IniComillaSencilla || $IniComillaDoble ) break;
$IniParentesis--;
break;
case "'":
if( $IniComillaDoble ) break;
if( $IniComillaSencilla > 0 ){
if( mb_substr($sql,$n-1,1)==CHR92 ) break;
$IniComillaSencilla--;
break;
}
$IniComillaSencilla++;
break;
case '"':
if( $IniComillaSencilla ) break;
if( $IniComillaDoble ){
if( mb_substr($sql,$n-1,1)==CHR92 ) break;
$IniComillaDoble--;
break;
}
$IniComillaDoble++;
break;
default:
}
$txt .= $c;
}
return $Dim;
}
function _ExtraeCampo( $sql ){
$sql = trim($sql);
while( eSubstrCount( $sql, '(' ) > 0 ){
$sql = trim(mb_substr( $sql, mb_strpos($sql,'(')+1 ));
if( eSubstrCount( $sql, ')' ) > 0 ) $sql = trim(mb_substr( $sql, 0,mb_strrpos($sql,')') ));
}
$sql = str_replace('"',"'",$sql);
while( eSubstrCount( $sql, "'" ) > 1 ){
$Ini = mb_strpos($sql,"'");
$Fin = mb_strrpos($sql,"'")+1;
$sql = trim( mb_substr( $sql, 0, $Ini ).mb_substr( $sql, $Fin ) );
if( $sql[0]==',' ) $sql = mb_substr( $sql, 1 );
if( mb_substr($sql,-1)==',' ) $sql = mb_substr( $sql, 0, -1 );
$sql = trim($sql);
}
return $sql;
}
function _FieldInWhereTipo( $Campo, &$DimCampos, $n, $Rastro=NULL ){
$Deli = array('AND', 'OR');
$Cond = array('MATCHES', 'LIKE', 'IN', 'IS', '>', '<', '<>', '!=', '>=', '<=', '=');
$Campo = trim($Campo);
$tf = count($DimCampos);
if( in_array( mb_strtoupper($Campo), $Deli ) ){
$DimCampos[] = array( $Campo, '+'.$Rastro, $n );
}else if( in_array( mb_strtoupper($Campo), $Cond ) ){
$DimCampos[$tf-1][1] = 'F';
if( mb_strtoupper($Campo)=='NULL' && mb_strtoupper($DimCampos[$tf-1][0])=='NOT' ){
$DimCampos[$tf-1][0] = $DimCampos[$tf-1][0].' '.$Campo;
}else{
$DimCampos[] = array( $Campo, 'C'.$Rastro, $n );
}
}else if( mb_strtoupper($Campo)=='NULL' ){
if( mb_strtoupper($DimCampos[$tf-1][0])=='NOT' ){
$DimCampos[$tf-1][0] = $DimCampos[$tf-1][0].' '.$Campo;
}else{
$DimCampos[] = array( $Campo, 'V'.$Rastro, $n );
}
}else if( mb_strtoupper($Campo)=='NOT' ){
$DimCampos[] = array( $Campo, 'V'.$Rastro, $n );
}else{
if( $tf>0 && $DimCampos[$tf-1][1] == 'C' ){
$DimCampos[] = array( $Campo, 'V'.$Rastro, $n );
}else{
$DimCampos[] = array( $Campo, 'F'.$Rastro, $n );
}
}
}
function _FieldInWhere($txt, $PonAlias=false){
$EsUnaCadena = false;
$TipoCadena = '';
$uc = '';
$Campo = '';
$DimCampos = array();
for($n=0; $n<mb_strlen($txt); $n++){
$c = mb_substr($txt,$n,1);
switch( $c ){
case ',':
if( $EsUnaCadena ) break;
$DimCampos[] = array($Campo, 'F', $n);
$Campo='';
$c = '';
break;
case ')':
$Campo = trim($Campo);
if( $Campo!='' ){
if( $Campo[0]=='"' || $Campo[0]=="'" ){
$DimCampos[] = array($Campo, 'V', $n);
}else{
$DimCampos[] = array($Campo, 'F', $n);
}
}
$Campo='';
$c = '';
break;
case '(':
if( $EsUnaCadena ) break;
$Campo = trim($Campo);
if( $Campo!='' ){
$DimCampos[] = array($Campo, 'Func-3', $n);
}else{
if( $DimCampos[count($DimCampos)-1][1]!='C' ) $DimCampos[count($DimCampos)-1][1] == 'Func';
}
$Campo='';
$c = '';
break;
case " ": case mb_chr(9): case CHR13:
if( $EsUnaCadena ) break;
$Campo = trim($Campo);
if( $Campo!='' ){
_FieldInWhereTipo($Campo, $DimCampos, $n, '');
$Campo = '';
$c = '';
}
break;
case '=': case '>': case '<': case '!':
if( $EsUnaCadena ) break;
if( eSubstrCount('<>=!', $uc)>0 ){
$uc = '';
$c = '';
$Campo='';
break;
}
if( $Campo!='') {
$DimCampos[] = array($Campo, 'F', $n);
}else{
$DimCampos[count($DimCampos)-1][1] == 'F';
}
if( eSubstrCount('<>=!', $uc)==0 && eSubstrCount('<>=!', mb_substr($txt,$n+1,1))==0 ){
$DimCampos[] = array($c, 'C', $n);
$Campo='';
$uc = '';
$c = '';
break;
}
if( eSubstrCount('<>=!', $uc)==0 && eSubstrCount('<>=!', mb_substr($txt,$n+1,1))>0 ){
$DimCampos[] = array($c.mb_substr($txt,$n+1,1), 'C', $n);
$uc=''; $c='';
$Campo='';
$n++;
break;
}
break;
case "'": case '"': case CHR92:
if( $uc==CHR92 ) break;
if( !$EsUnaCadena ){
$EsUnaCadena = true;
$TipoCadena = $c;
}else if( $EsUnaCadena && $TipoCadena==$c ){
$EsUnaCadena = false;
$TipoCadena = '';
}
break;
}
$Campo .= $c;
$uc = $c;
}
if( trim($Campo)!='' ) _FieldInWhereTipo($Campo, $DimCampos, $n, '');
$Resultado = array();
$t = 0;
for($n=0; $n<count($DimCampos); $n++){
if( mb_strtoupper($DimCampos[$n][0])=='NULL' ){
$DimCampos[$n][1] = 'C';
}else if( $DimCampos[$n][1]=='F' ){
$Resultado[$t++] = array(trim($DimCampos[$n][0]), $DimCampos[$n][2]-mb_strlen(trim($DimCampos[$n][0])));
}
}
if( $PonAlias ){
for($n=count($Resultado)-1; $n>-1; $n--){
if( $Resultado[$n][0]<>'' && eSubstrCount($Resultado[$n][0],'.')==0 ){
$iz = mb_substr($txt,0,$Resultado[$n][1]);
$cen = $Resultado[$n][0];
$dch = mb_substr($txt,$Resultado[$n][1]+mb_strlen($Resultado[$n][0]));
if( mb_strtoupper($Resultado[$n][0])=='NOT' || mb_substr(mb_strtoupper($Resultado[$n][0]),0,15)=='NOT{#SUBSELECT#' ){
}else if( $Resultado[$n][0][0]=='"' || $Resultado[$n][0][0]=="'" || $Resultado[$n][0][0]=='{' ){
}else if( is_numeric( $Resultado[$n][0] ) ){
}else{
$cen = "A.".$cen;
}
$txt = $iz.$cen.$dch;
}
}
return $txt;
}
return $Resultado;
}
function DivideValor($Valor, $Campo){
global $__Lng;
$Valor = str_replace('&gt;', '>', $Valor);
$Valor = str_replace('&lt;', '<', $Valor);
$Valor = str_replace('||', ' o ', $Valor);
if( $Valor[0]==',' && mb_substr($Valor,-1)==',' && $Valor!=',' ){
$Valor = mb_substr($Valor,1,-1);
$Valor = str_replace(',',' o ',$Valor);
}
if( eSubstrCount($Valor,'>')+eSubstrCount($Valor,'<')+eSubstrCount($Valor,'=')==0 ) return ': '.str_replace( '=', ' o ', $Valor );
switch( $Valor ){
case '=':
return ': ('.$__Lng[46].')';
case '>':
return ': ('.$__Lng[47].')';
case '<':
return ': ('.$__Lng[48].')';
case '<>':
return ': ('.$__Lng[49].')';
}
switch( mb_substr($Valor,0,2) ){
case '>=': case '<=': case '<>':
$Condi = mb_substr($Valor,0,2);
$Valor = mb_substr($Valor,2);
break;
default:
switch( $Valor[0] ){
case '>': case '<': case '=':
$Condi = $Valor[0];
$Valor = mb_substr($Valor,1);
break;
default:
return ': '.$Valor;
}
}
$Valor = str_replace( '>=', '{1}', $Valor );
$Valor = str_replace( '<=', '{2}', $Valor );
$Valor = str_replace( '<>', '{3}', $Valor );
$Valor = str_replace( '!=', '{3}', $Valor );
$Valor = str_replace( '>' , '{4}', $Valor );
$Valor = str_replace( '<' , '{5}', $Valor );
$Valor = str_replace( '=' , '{6}', $Valor );
for($n=1; $n<7; $n++){
$Valor = str_replace( "' and {$Campo}{".$n."}'", '{'.$n.'}', $Valor );
$Valor = str_replace( '" and '.$Campo.'{'.$n.'}"', '{'.$n.'}', $Valor );
}
$Valor = str_replace( '{1}', ' '.$__Lng[50].' >= ', $Valor );
$Valor = str_replace( '{2}', ' '.$__Lng[50].' <= ', $Valor );
$Valor = str_replace( '{3}', ' '.$__Lng[50].' <> ', $Valor );
$Valor = str_replace( '{4}', ' '.$__Lng[50].' > ' , $Valor );
$Valor = str_replace( '{5}', ' '.$__Lng[50].' < ' , $Valor );
$Valor = str_replace( '{6}', ' '.$__Lng[51].' '   , $Valor );
$Valor = preg_replace('/([0-9]{4})\-([0-9]{2})\-([0-9]{2}) ([0-9]{2})\:([0-9]{2})\:([0-9]{2})/', SETUP::$System["_FormatCDITKNuser"], $Valor);
$Valor = preg_replace('/([0-9]{4})\-([0-9]{2})\-([0-9]{2})/', SETUP::$System["_FormatF4TKNuser"], $Valor);
$Valor = preg_replace('/([0-9]{4})\-([0-9]{2})/', SETUP::$System["_FormatP4TKNuser"], $Valor);
return ' '.$Condi.' '.$Valor;
}
function _SelectGetFields($txt){
$EsUnaCadena = false;
$NumeroDeParentesis = 0;
$TipoCadena = '';
$uc = '';
$Campo = '';
$Func = "";
$Cadena = "";
$DimFunc = array();
$DimCadena = array();
$DimCampos = array();
for($n=0; $n<mb_strlen($txt); $n++){
$c = mb_substr($txt,$n,1);
switch( $c ){
case ',':
if( $EsUnaCadena || $NumeroDeParentesis>0 ) break;
$DimCampos[] = trim($Campo);
$Campo = '';
$c = '';
$Func = "";
break;
case ')':
if( $EsUnaCadena ) break;
$NumeroDeParentesis--;
$Func = "";
break;
case '(':
if( $EsUnaCadena ) break;
$NumeroDeParentesis++;
$Func = trim($Func);
if( $Func!="" ) $DimFunc[] = $Func."(";
$Func = "";
break;
case "'": case '"': case CHR92:
if( $uc==CHR92 ) break;
if( !$EsUnaCadena ){
$EsUnaCadena = true;
$TipoCadena = $c;
$Cadena = "";
}else if( $EsUnaCadena && $TipoCadena==$c ){
$DimCadena[] = 	$Cadena.$TipoCadena;
$Cadena = "";
$EsUnaCadena = false;
$TipoCadena = "";
}
$Func = "";
break;
case "+": case "-": case "*": case "/": case "=": case ">": case "<": case "!":
if( $EsUnaCadena ) break;
$Func = "";
break;
default:
$Func .= $c;
}
$Campo .= $c;
$uc = $c;
if( $EsUnaCadena ){
$Cadena .= $c;
}
}
$DimCampos[] = trim($Campo);
$DimField = array();
for($i=0; $i<count($DimCampos); $i++){
$rCampo = str_replace($DimFunc, "", $DimCampos[$i]);
$rCampo = str_replace($DimCadena, "", $rCampo);
$rCampo = str_replace("  ", " ", $rCampo);
$rCampo = str_replace(array("(",")",mb_chr(9)), "", $rCampo);
$rCampo = eStrtr($rCampo, "+-*/,", "~~~~~");
$dim = explode("~", $rCampo);
$oCampo = "";
$Alias = null;
for($c=0; $c<count($dim); $c++) if( $dim[$c]<>"" && !is_numeric($dim[$c]) ){
$oCampo = trim($dim[$c]);
$tmp = explode(" ",$oCampo);
$Alias = $tmp[0];
$oCampo = $tmp[count($tmp)-1];
if( mb_strtoupper($oCampo)=="ASC" || mb_strtoupper($oCampo)=="DESC" ){
$oCampo = $tmp[count($tmp)-2];
}
if( $Alias==$oCampo ) $Alias = null;
}
$DimField[] = array($oCampo, $DimCampos[$i], $Alias);
}
return $DimField;
}
function _LToolsPagination($ocultaMaxRec=false){
global $TotalReg, $_RowsOnPage, $__Lng, $_TienePaginacion, $_TotalRecords, $DesdeList, $HastaList, $_ISUBLISTTOOLS;
if( $TotalReg<=$_RowsOnPage ) return;
$Long = mb_strlen($_TotalRecords."");
$_TienePaginacion = true;
$css = (($ocultaMaxRec)? "display:none;":"");
?>
<center<?=(($_ISUBLISTTOOLS=="E")?"":' id="o"')?><?=(($HastaList<1)?" style='display:none'":"")?>>
<table id="ToolsPaginate" border="0px" cellspacing="0px" cellpadding="0px" style="background:transparent;display:table-caption;"><tr>
<td><I class="ICONINPUT" title="<?=$__Lng[25]?>" id=_KEY36 onclick='_PagNormal();Paginar("I");'>%</I>
<td><I class="ICONINPUT" title="<?=$__Lng[26]?>" id=_KEY33 onclick='_PagNormal();Paginar("<");'><</I>
<td><?= $__Lng[57] ?>
<td><input type=text name="oDESDE" value="<?=$DesdeList?>" size=<?=$Long?> title="<?=$__Lng[52]?>"
onfocus="S.key('+',5)" onkeydown='if(S.eventCode(event)==13){this.CS=1;DGI("DESDE").value=DGI("oDESDE").value;PaginarDesde();this.select();}' onblur='PaginarDesde();' onfocus='this.select();' OldValue=1 CS=0 style='text-align:right;'>
<td><?= $__Lng[58] ?>
<td><input type=text name="oHASTA" value="<?=$HastaList?>" size=<?=$Long?> title="<?=$__Lng[53]?>" class="READONLY" readOnly style='padding-left:2px;-text-align:right;'>
<td><I class="ICONINPUT" title="<?=$__Lng[27]?>" id=_KEY34 onclick='_PagNormal();Paginar(">");'>></I>
<td><I class="ICONINPUT" title="<?=$__Lng[28]?>" id=_KEY35 onclick='_PagNormal();Paginar("F");'>&</I>
<td style='padding-left:20px;<?=$css?>' nowrap><?=$__Lng[24]?>
<td style='<?=$css?>'><input type=text name="oMAXREC" value="<?=$_RowsOnPage?>" size=<?=$Long?> title="<?= $__Lng[24] ?>" style='text-align:right;'
onfocus="S.key('+',4);this.select();" onkeydown='if(S.eventCode(event)==13){this.CS=1;PaginarDesde();}'
onchange='DGI("MAXREC").value=DGI("oMAXREC").value;CalcTPag();'
on-focusout='DGI("MAXREC").value=DGI("oMAXREC").value;CalcTPag();'
>
<td style='padding-left:20px' nowrap><?=$__Lng[77]?>
<td><input type=text name="oTOTALREC" value="<?=$TotalReg?>" size=<?=$Long?> title="<?= $__Lng[24] ?>" class="READONLY" readOnly style='text-align:right;'>
</tr></table>
</center>
<?PHP
}
function _CargarSubEti($ni, $Eti, $NomSubEti){
global $_DimEDF, $_DimInclude;
$Ok = false;
for($nDimFCH=$ni+1; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( $Ok ){
if( $buffer[0]=='.' ) continue;
if( $buffer[0]=='[' ) return;
if( $Eti=='P' && $buffer[0]=='/' ) continue;
$_DimInclude["Inc{$Eti}"][$NomSubEti] .= $buffer;
$_DimEDF[$nDimFCH] = '';
continue;
}elseif( mb_strtoupper(mb_substr($buffer,0,3))=="[{$Eti}]" ){
list($buffer) = explode(REM,$buffer);
if( trim(mb_substr($buffer,3))==$NomSubEti ) $Ok = true;
}
}
}
function _AddTableToField($txt, $Tabla){
$EsUnaCadena = false;
$TipoCadena = '';
$uc = '';
$Campo = '';
$DimCampos = array('');
for( $n=0; $n<mb_strlen($txt); $n++ ){
$c = mb_substr($txt,$n,1);
switch( $c ){
case ',':
if( $EsUnaCadena ) break;
$DimCampos[] = trim($Campo);
$Campo = '';
$c = '';
break;
case ')':
$Campo = trim($Campo);
if( $Campo!='' ) $DimCampos[] = $Campo;
$DimCampos[] = $c;
$Campo = '';
$c = '';
break;
case '(':
if( $EsUnaCadena ) break;
$Campo = trim($Campo);
if( $Campo!='' ) $DimCampos[] = $Campo.$c;
$Campo = '';
$c = '';
break;
case ' ':
if( $EsUnaCadena ) break;
break;
case "'": case '"': case CHR92:
if( $uc==CHR92 ) break;
if( !$EsUnaCadena  ){
$EsUnaCadena = true;
$TipoCadena = $c;
}else if( $EsUnaCadena && $TipoCadena == $c ){
$EsUnaCadena = false;
$TipoCadena = '';
}
break;
}
$Campo .= $c;
$uc = $c;
}
if( $Campo!='' ) $DimCampos[] = $Campo;
$txt = '';
for( $n=1; $n<count($DimCampos); $n++ ){
if( trim($DimCampos[$n])=='' ) continue;
if( $n>1 && $DimCampos[$n]!='' && $DimCampos[$n]!=')' && mb_substr($DimCampos[$n-1],-1)!='(' ){
$txt .= ',';
}
if( $DimCampos[$n][0]!='"' && $DimCampos[$n][0]!="'" && $DimCampos[$n][0]!=')' && mb_substr($DimCampos[$n],-1)!='(' ){
if( !is_numeric($DimCampos[$n]) ) $txt .= $Tabla.'.';
}
$txt .= $DimCampos[$n];
}
return $txt;
}
function _GetLabel($k){
global $OriFichero, $Opcion;
$xLabel = '';
$pScript = $GLOBALS['_PSCRIPT'];
if( mb_strtoupper(mb_substr($pScript,0,2))=='C:' ) $pScript = mb_substr($pScript,2);
if( mb_strtoupper(mb_substr($pScript,0,2))=='C:' ) $pScript = mb_substr($pScript,2);
$_DimEDF = file(eScript($GLOBALS['_FileDF']));
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( $buffer[0]=='.' ) continue;
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
list( $cModo, $DirFile ) = explode(')',eNsp($buffer));
$DirFile = mb_strtolower($DirFile);
if( true || eOkMode( $Opcion, mb_substr($cModo,9) ) ){
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
if( eSubstrCount($buffer,$k)>0 && eSubstrCount($buffer,'|')>=9 ){
$tmp = explode('|',$buffer);
if( eSubstrCount($tmp[1],$k)==0 ) continue;
$tmp = _CalculaLabel($tmp[0]);
if( $tmp!='' ) return $tmp;
}
}
if( eSubstrCount($pScript,'/edes.v3/a/d/report_filter.edf')==1 ) $pScript = DIREDES.'a/d/report_filter.edf';
$txt = file_get_contents($pScript);
if( mb_substr($pScript,-4)=='.zdf' ){
if( mb_substr($txt,0,5)=='eDes ' ){
$_DimEDF = explode("\n", gzuncompress(mb_substr($txt,5)));
}else{
$_DimEDF = explode("\n", $txt);
}
$txt = '';
}else{
$_DimEDF = file($pScript);
}
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( $buffer[0]=='.' ) continue;
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
list( $cModo, $DirFile ) = explode(')',eNsp($buffer));
$DirFile = mb_strtolower($DirFile);
if( true || eOkMode( $Opcion, mb_substr($cModo,9) ) ){
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
if( eSubstrCount($buffer,$k)>0 && eSubstrCount($buffer,'|')>=9 ){
$tmp = explode('|',$buffer);
if( eSubstrCount($tmp[1],$k)==0  ) continue;
$tmp = _CalculaLabel($tmp[0]);
if( $tmp!='' ) return $tmp;
}
}
return '';
}
function _CalculaLabel($tmp){
$tmp = trim($tmp);
$tmp = str_replace(
array('ÃÂ·', '<br>', '<BR>'),
array(' ',  ' '  ,  ' '  ),
$tmp
);
list($tmp) = explode('\\',$tmp);
$tmp = trim($tmp);
if( $tmp[0]=='<' ) $tmp = trim(mb_substr($tmp,1));
if( $tmp[0]==',' ) $tmp = trim(mb_substr($tmp,1));
if( $tmp[0]=='+' ) $tmp = trim(mb_substr($tmp,1));
if( $tmp[0]==']' ) $tmp = trim(mb_substr($tmp,1));
if( $tmp[0]=='=' ) $tmp = trim(mb_substr($tmp,1));
if( is_numeric($tmp[0]) ) $tmp = trim(mb_substr($tmp,1));
if( $tmp[0]=='#' ){
list(,$tmp) = explode(')',$tmp);
$tmp = trim($tmp);
}
if( $tmp[0]=='ÃÂ¿' ){
list(,$tmp) = explode('?',$tmp);
$tmp = trim($tmp);
}
if( eSubstrCount($tmp, '@')>1 ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++) $tmp = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $tmp);
foreach($_LngPublic as $k=>$v) $tmp = str_replace($k, $v, $tmp);
}
return $tmp;
}
function eTextToList($Celda){
$Celda = str_replace('%','&#37;',$Celda);
$Celda = urldecode($Celda);
$Celda = str_replace(
array('&#43;', '&#39;', '&#34;', '&#92;', '&amp;', "\r",  "\n" , "&lt;br&gt;"),
array(  '+'  ,   "'"  ,   '"'  ,   '\\' ,  '&'   ,  '' , '<br>',    "<br>"   ),
$Celda
);
return $Celda;
}
function eHtmlToList($Celda){
$Celda = str_replace(
array('&#39;', '&quot;', "&lt;br&gt;"),
array(  "'"	 ,   '"'   ,    "<br>"   ),
$Celda
);
$dim = array("b", "i", "u", "br", "div", "span", "ol", "ul", "li");
for($n=0; $n<count($dim); $n++){
$Celda = str_replace(
array("&#60;".$dim[$n]."&#62;", "&#60;/".$dim[$n]."&#62;"),
array(    "<".$dim[$n].">"    ,     "</".$dim[$n].">"    ),
$Celda
);
}
$dim = array("font", "div", "span", "blockquote");
for($n=0; $n<count($dim); $n++){
$Celda = str_replace(
array("&#60;".$dim[$n]." ", "&#60;/".$dim[$n]."&#62;"),
array(    "<".$dim[$n]." ",     "</".$dim[$n].">"    ),
$Celda
);
$i = 0;
while( ($i=mb_strpos($Celda, "<".$dim[$n]." ", $i))!==false ){
$oi = $i;
$i2 = mb_strpos($Celda, "<", $i+1);
$f2 = mb_strpos($Celda, ">", $i);
$i = mb_strpos($Celda, "&#62;", $i);
if( $i!==false ){
if( $i2!==false && $oi>$i2 ){
$i++;
continue;
}
if( $f2!==false && $oi>$f2 ){
$i++;
continue;
}
$Celda = mb_substr($Celda,0,$i).">".mb_substr($Celda,$i+5);
}else break;
}
}
$Celda = '<table class="HTML_IN_TD" border=0px cellspacing=0px cellpadding=0px><tr><td id=CNT'.(($_COLSWIDTH[$n]>0)?' style="width:'.px($_COLSWIDTH[$n]).'"':'').'>'.$Celda.'</td></tr></table>';
return $Celda;
}
function eSelectTable($campo, $dim, $empty=true, $right=false, $alFinal=array()){
echo '<div class="SELECT EDITABLE SCROLLBAR" onclick="S.selectClick(this, event)">'.
"<table id='{$campo}_TABLE' cols='2'".(($right)?" class='col_1r MONOSPACE'":"")."><tbody>";
if($empty) echo '<tr><td></td><td>&nbsp;</td></tr>';
if(gettype($dim)=="string"){
qQuery($dim);
while($r=qRow()) echo '<tr><td>'.trim($r[0]).'</td><td>'.trim($r[1]).'</td></tr>';
}else{
$t = count($dim);
if( gettype($dim[0])=="array" ){
for($n=0; $n<$t; $n++) echo '<tr><td>'.$dim[$n][0].'</td><td>'.$dim[$n][1].'</td></tr>';
}else{
for($n=0; $n<$t; $n++) echo '<tr><td>'.$dim[$n].'</td><td>'.$dim[$n].'</td></tr>';
}
if( count($alFinal) ) echo '<tr class="NoSelected" title="'.$alFinal[2].'"><td>'.$alFinal[0].'</td><td>'.$alFinal[1].'</td></tr>';
}
echo '</tbody></table></div>';
}
function _ListaBotonesBox($PrimerBoton, $UltimoBoton, $pagActual, $TPaginas){
$txt = "";
if( $PrimerBoton>1 ){
$n = $PrimerBoton-1;
if( $n<1 ) $n=1;
$txt .= "<span class='ButtonIn ROUNDED2 NoRight' eGroup='{$n}'>...</span>";
}
for($n=$PrimerBoton; $n<=$UltimoBoton; $n++){
$txt .= "<span class='ButtonIn ROUNDED2";
if( $pagActual==$n ) $txt .= " Activated";
if( $PrimerBoton==$n && $n==1 ) $txt .= " NoRight";
else if( $TPaginas==$n ) $txt .= " NoLeft";
else $txt .= " NoCenter";
$txt .= "'>{$n}</span>";
}
if( $UltimoBoton<$TPaginas ){
$n = $UltimoBoton+1;
if( $n>$TPaginas) $n = $TPaginas;
$txt .= "<span class='ButtonIn ROUNDED2 NoLeft' eGroup='{$n}'>...</span>";
}
return $txt;
}
function eCall_PDFVAR($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ){
$GLOBALS["_CallLabel"] = "PDFVAR";
}else{
if( $tmp<>null ) $buffer=trim($tmp[0]);
if( $buffer[0]!='$' ) $buffer = '$'.trim($buffer);
if( mb_substr($buffer,-1)!=';' ) $buffer .= ';';
if( !preg_match('/PDF_/u', $buffer) ) $buffer = str_replace('$', '$PDF_', $buffer);
$GLOBALS["_PDFVAR"][] = $buffer;
}
}
function _PDFColVIEW(){
global $_PDFCOL, $_Form;
$dim = explode(" ", $_POST["_VIEW_"]);
for($i=0; $i<count($dim); $i++){
$col = trim($dim[$i]);
if( empty($col) || substr($col,-2)=="ff" ){
continue;
}
if( substr($col,0,4)=="col_" ){
if( substr($col,-1)=="n" ){
$nCol = (int)eMid($col, "col_", "n");
$_PDFCOL[$nCol] = 0;
}else if( empty($_PDFCOL[$nCol]) ){
$nCol = (int)substr($col, 4);
$_PDFCOL[$nCol] = $_Form[$nCol][4];
}
}
}
}
?>