<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
ob_end_clean(); ob_start();
define('DIREDES', __DIR__.'/');
$Dir_ = DIREDES;
eLngLoad( DIREDES.'lng/list', '', 1 );
include_once(DIREDES.'formulario.inc');
$_NOEVENT = 0;
if( eSubstrCount( $_SERVER['HTTP_REFERER'], '&_SEL_=' ) > 0 ){
$_SEL_ = urldecode( mb_substr( $_SERVER['HTTP_REFERER'], mb_strpos($_SERVER['HTTP_REFERER'],'&_SEL_=')+7 ) );
$_AUX_ = 'C';
if( eSubstrCount( $_SERVER['HTTP_REFERER'], '&_NOEVENT=1' ) > 0 ) $_NOEVENT = 1;
}
if( isset($_GET['_NOEVENT']) ) $_NOEVENT = $_GET['_NOEVENT'];
if( !isset($_AUX_)		) $_AUX_ = '';
if( !isset($_ORDEN_)	) $_ORDEN_ = '';
if( !isset($_DESTINO_)	) $_DESTINO_ = '';
$_JS_ = (!isset($_JS_)? '' : stripslashes($_JS_));
$_MaxVisibleRows = SETUP::$List['MaxVisibleRows'];
if( !isset($_GET['_ADDFILTER']) ){
$_FILTER = '';
}else{
$_FILTER = _AddFilterSql();
}
$_oFILTER = $_FILTER;
$_DownloadPDF = $_gs_formato_;
$ElPuntoEsRem = true;
$_gsObjetoAnterior = $_gsObjeto;
if( !isset($NomFile) ){
$_DELFILTER = array();
list( $Opcion, $Fichero ) = explode( ':', $_Accion );
$NomFile = mb_substr( mb_strrchr($_SERVER['PHP_SELF'],'/'), 1 );
$VieneDeFicha = false;
$_SubModo = $Opcion;
$_SubMode = &$Opcion;
if( mb_substr($Fichero,-4)=='.gdf' ){
$_oSourceParent = 'G';
$_SourceParent = $Fichero;
$_DimEDF = @OpenDF('../d/'.$Fichero);
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
$buffer = trim($_DimEDF[$nDimFCH]);
if( @LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( mb_strtoupper(mb_substr($buffer,0,5))=='[TAB]' ){
$tmp = explode( '|', mb_substr( $buffer, mb_strpos($buffer,']')+1 ) );
$tmp[2] = trim($tmp[2]);
if( eSubstrCount( $tmp[2], '.' ) == 0 ) $tmp[2] .= '.edf';
$Fichero = $tmp[2];
break;
}
}
}
}
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
}else{
$_SubModo = str_replace('R','l',$Opcion);
$_TituloSubVentana = str_replace('&nbsp;',' ',$_TITLE);
$VieneDeFicha = true;
$Opcion = 'l';
}
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
if( eSubstrCount($_gs_formato_,'&BW=') > 0 ) list( ,$BW ) = explode('&BW=',$_gs_formato_);
$_gs_formato_ = $_gs_formato_[0];
if( isset($_GET['_gs_formato_']) ) $_GET['_gs_formato_'] = $_gs_formato_;
if( isset($_POST['_gs_formato_']) ) $_POST['_gs_formato_'] = $_gs_formato_;
}
if( !isset($_ExportType) ) $_ExportType = &$_gs_formato_;
$EmptyList = false;
$row = array();
$_gsINI_='';
$_DBTABLE  = '';
$_oDBTABLE = '';
$_DBINDEX = '';
$_DBSERIAL = array();
$_DBGROUPBY = '';
$_DBTABLERELATION = array();
$_DBEND = '';
$_DBLOG = array();
$_PAGTITLE = '';
$_PAGROTATE = false;
$_PAGMARGIN = '0.3,0.2,0.2,0.4';
$_COLSWIDTH = array();
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
$_EDITLIST = array();
$_LISTCHECKBOX = array();
$_CHR = array();
$_MSGANSWER = array();
$_MSGANSWEROK = false;
$_TITLEICON = array();
$_WINCAPTION = '';
$_NOTITLE = false;
$_CURSOR = SETUP::$List['Cursor'];
$_GREENBAR = SETUP::$List['Greenbar'];
if( !isset($_CURSOR) ) $_CURSOR = false;
if( !isset($_GREENBAR) ) $_GREENBAR = false;
if( $_CURSOR && $_GREENBAR ) $_GREENBAR = false;
$_TopMaxRec = SETUP::$List['MaxRec'];
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
$_TmpEnColumna = array('','','','');// Temporal para en Columna
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
if( $_ISUBLIST ) $EmptyList = true;
$_TienePaginacion = false;
$_PERSISTENTVAR = '';
$_HayRadio = false;
$_TIPTH = array();
$_TIPTHTOP = array();
$SubJsHtm = true;
$_ConLToos = true;
$_PDFPHP = '';
$_PDFCOL = array();
$_PDFCOLBORDER = array();
$_PDFWRAP = array(1,true);
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
$_OtroDiccionario = false;
$_JSDIM = array();
$_JSINCLUDE = array();
$_JSONCLICKROW='';
$_JSSELROW= '';
$_PHPFORM = '';
$_JSHEAD  = $_JSINI  = $_JSEND  = '';
$_HTMHEAD = $_HTMINI = $_HTMEND = '';
$_PHPHEAD = $_PHPINI = $_PHPEND = $_PHPSTART = '';
$_SORTLIST = '';
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
$HaySelect = false;
$_SelectReal = array();
$_CellsStyle = array();
$_CellsClass = array();
$_RowStyle = '';
$_RowClass = '';
if( !isset($_SummaryType) ) $_SummaryType = -1;
$_SummaryData =  true;
$_SummaryTotal = true;
$_SummaryGroupLabel = array( 1,1,1,1,1 );
$_SummaryGroupTotal = array( 1,1,1,1,1,1 );
$_SummaryCol = 0;
$_SummaryGroup = -1;
$_RowsOnPageBak = $_RowsOnPage;
$_gsFIN_='';
if( isset($_POST['_gs_formato_']) && !isset($_REG_) ){
$tmp = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.";
@unlink( $tmp.'cur' );
@unlink( $tmp.'sql' );
@unlink( $tmp.'var' );
}
$TipoEntrada = '#';
$SaltarLinea = false;
$DimOpcion =  array($Opcion,'*');
if( $_SubModo != $Opcion ){
array_push( $DimOpcion, $_SubModo );
}else{
array_push( $DimOpcion, 'L' );
array_push( $DimOpcion, 'l' );
}
if( eSubstrCount( ',cl,bl,ml,', ",{$_SubModo}," )>0 ){
array_push( $DimOpcion, '?l' );
array_push( $DimOpcion, '*l' );
if( $_GET['_gs_formato_']!='' ){
array_push( $DimOpcion, $_GET['_gs_formato_'] );
if( $_GET['_gs_formato_']=='X' ) array_push( $DimOpcion, 'XLS' );
if( $_GET['_gs_formato_']=='P' ) array_push( $DimOpcion, 'PDF' );
if( $_GET['_gs_formato_']=='A' ) array_push( $DimOpcion, 'MDB' );
}else{
array_push( $DimOpcion, 'H' );
array_push( $DimOpcion, 'HTM' );
}
}
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
$_DimEDF = @OpenDF($FicheroD);
$_CallLabel = "";
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
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
if( $Chr_1=='[' ){
if( preg_match('/^\[DB\]/iu', $buffer) ){
$_OtroDiccionario = true;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
$_DBBuffer = $tmp[0];
}else if( preg_match('/^(\[NOTE\]|\[EXIT\])$/iu', $buffer) ){
break;
}
}
}
if( $_GET['_DB']<>"NO" && !function_exists("qQuery") ){
if( $_DBBuffer!="" ){
$tmp[0] = eNsp($_DBBuffer);
if( eSubstrCount($tmp[0], ',')==0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(mb_substr($tmp[0],1));
$_DB = $tmp[0];
if( eSubstrCount(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( eSubstrCount($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
if( $tmp[0][0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$tmp[0]);
}else{
$_SqdDefinitionFile = eScript($tmp[0]);
}
include($_SqdDefinitionFile);
}else{
list($_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect) = explode(',', $tmp[0]);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list($_Sql, $_SqlPDOType) = explode(':', eNsp($_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
unset($_DBBuffer);
}
include_once($Dir_.$_Sql.'.inc');
}
$_CallLabel = "";
$ElPuntoEsRem = true;
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
$ElPuntoEsRem = true;
if( $_CallLabel<>"" && $Chr_1<>'[' ){
call_user_func("eCall_".$_CallLabel, null, $buffer);
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
list( $cModo, $DirFile ) = explode(')',eNsp($buffer));
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
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPSTART );
}
}
if( $TipoEntrada=='_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
switch( $Etiqueta ){
case 'CC':
eExplodeOne( $buffer, '|', $txt1, $txt2 );
$_Variable[$tmp[0]] = _ExeEval( $txt2, $buffer );
break;
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval( $tmp[1], $buffer, 1 );
break;
case 'AUTOMENU':
break;
case 'ONLOAD':
if( $OkModo ) ${$Comando} = str_replace("'",'&#39;',$tmp[1]);
break;
case 'DEBUG':
if( $OkModo ){
if( $tmp[2]=='' ){
${$Comando} = $tmp[1];
}else{
if( $tmp[2]==$_User ) ${$Comando} = $tmp[1];
}
if( $_DEBUG*1 == 0 ){
$_DEBUG = mb_strtoupper(trim($_DEBUG));
if( $_DEBUG=='PHPINFO' ){ eInit(); phpInfo();echo '<pre>GET:<br>'.print_r($_GET,1).'<br>POST:<br>'.print_r($_POST,1).'</pre>'; die('<script type="text/javascript">top.eLoading(0,window)</script>'); }
$DimDebug = array('OFF'=>0,'SQL'=>1,'TMP'=>2,'BORDER'=>3,'SAVESQL'=>4,'INOUT'=>5,'WINOUT'=>6,'NOZIP'=>7,'FLAG'=>8,'DF'=>9,'SAVESQLH'=>10,'SAVEDF'=>11,'PHPINFO'=>12,'VIEWFIELDS'=>13,'EVAL'=>14,'SELINFO'=>20,'ERRSQL'=>30,'HTM'=>31);
$_DEBUG	 = $DimDebug[$_DEBUG];
}
if( $_DEBUG==4 || $_DEBUG==10 ){
if( $_DEBUG==10 ) if( date('Y-m-d', filemtime("../_tmp/log/sql.{$_User}"))!=date('Y-m-d')) $_DEBUG = 4;
if( $_DEBUG==4 && !$VieneDeFicha ) @unlink('../_tmp/log/sql.'.$_User);
eLogDebugIni('['.$Opcion.']');
$_DEBUG = 4;
}
if( $_DEBUG==9 || $_DEBUG==11 ) $_DimDebug[] = '[#] '.$_Modo.' : '.$OriFichero.' [#]';
if( $tmp[3]!='' ){
$tmp = explode(",", mb_strtoupper(str_replace(" ","",$tmp[3])));
for($i=0; $i<count($tmp); $i++){
if( $tmp[$i]=="CONSOLE" ) $_TRACECONSOLE = true;
else $_TRACELABEL = $tmp[$i];
}
}
}
break;
case 'TITLEICON':
case 'ITOOLS':
break;
case 'DBREADROW':
if( $OkModo ) $_DBREADROW = $tmp[1];
break;
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$_sDBTABLE = $tmp[0];
case 'TITLE2':
case 'DBORDER':
case 'DBGROUPBY':
case 'WINTITLE':
case 'PAGTITLE':
${$Comando} = $tmp[0];
break;
case 'FORMBUTTONS':
${$Comando} = $tmp[0];
if( $tmp[1]!='' ) $_FORMBUTTONSDELETE = $tmp[1];
break;
case 'CHARTGRID':
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
$_SHOWFILTER = ( $tmp[0]=='' || eSubstrCount( ",{$tmp[0]},", ",{$_SubModo}," ) > 0 || eSubstrCount( ",{$tmp[0]},", ",{$Opcion}," ) > 0 || $tmp[0]=='*' );
break;
case 'TITLE':
$_TITLE = $_oTITLE = $tmp[0];
$_TITLETOEXTRACT = $_TITLE;
$txt = $tmp[1];
if( count($tmp)==3 ){
$_TITLE = $_oTITLE = $tmp[1];
$txt = $tmp[2];
}else if( mb_strlen($tmp[1]) > 2 ){
if( mb_substr($txt,-1)==')' || mb_substr($txt,-2)==');' ){
$txt = $tmp[1];
}else{
$_TITLE = $_oTITLE = $tmp[1];
}
}
if( $txt!='' ){
if( mb_substr($txt,-1)==')' || mb_substr($txt,-2)==');' ){
list( $_VerUserCondiciones ) = explode('(',$txt);
}else{
$_SHOWFILTER = ( eSubstrCount( ",{$txt},", ",{$_SubModo}," ) > 0 || eSubstrCount( ",{$txt},", ",{$Opcion}," ) > 0 || $txt=='*' );
}
}
if( mb_strtoupper($_TITLE)=='NOTITLE' ){
$_TITLE = '';
if( isset($_PSOURCE) && $_PSOURCE!='WWORK' ) $_NOTITLE = true;
}else if( $_PSOURCE!='WWORK' && mb_strtoupper($tmp[3])=='NOTITLE' ){
$_WINCAPTION = '#';
}
break;
case 'DBLIMIT':
if( $_NOTITLE==true ){
list( $L ) = explode(',', $tmp[0]);
$_DBLIMIT = (int)$L;
break;
}else{
list( $L, $XP, $PP, $_PrimerosRegTxt ) = explode(',',$tmp[0]);
if( isset($_GET['_ISLBlankRecords']) && $XP > 0 ) $_GET['_ISLBlankRecords'] = $XP;
}
if( $XP < 0 ){
$_LimitOn = true;
$_PrimerosReg = $XP;
$XP = '';
$PP = '';
if( $_PrimerosRegTxt=='' ) $_PrimerosRegTxt = 'Muestra de # Registros';
}
$_DBLIMIT = (int)$L;
if( trim($XP)!='' ){
unset($_MaxVisibleRows);
$_RowsOnPage = (int)$XP;
if( trim($PP)!='' ) $_MaxRowsOnPage = (int)$PP;
}
break;
case 'MAXREC':
list( $sMAXREC, $sMaxRowsOnPage ) = explode(',',$tmp[0]);
if( trim(mb_strtoupper($sMAXREC))=='FULL' ){
$_MAXRECFULL = true;
if( $sMaxRowsOnPage > 0 ) $_MaxVisibleRows = $sMaxRowsOnPage;
break;
}
if( $_NOTITLE==true ) break;
if( $tmp[2]!='' ){
$_FunctionNextPage = $tmp[2];
if( $_FunctionNextPage!='' && mb_substr($_FunctionNextPage,-1)!=')' ) $_FunctionNextPage .= '()';
}
if( $tmp[1]!='' ){
$_FunctionLastPage = $tmp[1];
if( $_FunctionLastPage!='' && mb_substr($_FunctionLastPage,-1)!=')' ) $_FunctionLastPage .= '()';
}
$_MAXRECINCREMENT = (mb_strtoupper($tmp[3])=='INCREMENT');
if( $tmp[0]=='' ) break;
unset($_MaxVisibleRows);
list( $_MAXREC, $sMaxRowsOnPage ) = explode(',',$tmp[0]);
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
if( $sMaxRowsOnPage!='' ){
$_MaxRowsOnPage = (int)$sMaxRowsOnPage;
}else{
$_MaxRowsOnPage = $_RowsOnPage*2;
}
break;
case 'DBSERIAL':
$_DBSERIAL = array( $_DBTABLE, $tmp[0], '' );
break;
case 'SAVETRACE':
${$Comando} = $OkModo;
break;
case 'TIPTH':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
if( !isset($_TIPTHCALC) ) $_TIPTHCALC = array();
$stmp = explode(',',$tmp[0]);
for( $n=0; $n<count($stmp); $n++ ) $_TIPTHCALC[] = $stmp[$n];
}else{
$_TIPTH = $tmp;
}
break;
case 'CHANGEFILTER':
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
${$Comando} = $tmp;
break;
case 'THCOLSPAN':
if( count($_THCOLSPAN)==0 ){
$_THCOLSPAN = $tmp;
}else{
$_THCOLSPAN = array_merge($_THCOLSPAN,$tmp);
}
break;
case 'LISTCHECKBOX':
$_LISTCHECKBOX[mb_strtoupper($tmp[0])] = array($tmp[1],$tmp[2]);
break;
case 'CHART':
$_CHART[] = mb_substr( $buffer, $i+1 );
$tmp = explode('|', mb_substr( $buffer, $i+1 ) );
for( $i=0; $i<count($tmp); $i++ ) $tmp[$i] = trim($tmp[$i]);
if( $tmp[0]=='*' || eSubstrCount($tmp[0],',') >0 || $tmp[0]==($tmp[0]*1).'' ){
$_DefChartMS[] = $tmp;
$TipoEntrada = '_CHARTJS';
if( $_CHARTJS!='' ) $_CHARTJS .= "\n[CHARTJS:nl]\n";
$JsHtm = true;
}else{
$_DefChartSWF[] = $tmp;
$TipoEntrada = '_CHARTSWF';
if( $_CHARTSWF!='' ) $_CHARTSWF .= "\n[CHARTSWF:nl]\n";
$JsHtm = false;
$_ConChartSWF = true;
}
break;
case 'GRAPH':
$_GRAPH = $tmp;
break;
case 'DBLOG':
$_DBLOG = explode( ',', $tmp[0] );
break;
case 'NOSORT':
$_NOSORT = true;
break;
case 'PROGRESS':
break;
case 'NOJS':
case 'STOP':
case 'PAGROTATE':
case 'TOTALSROWS':
case 'NOSELECTROW':
${$Comando} = true;
break;
case 'JSONCLICKROW':
case 'SLIDECOL':
break;
case 'JSONLOAD':
if( isset($_JSONLOAD) ) break;
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
case 'PHPSTART':
case 'PHPEND':
case 'PHPFORM':
case 'PHPHEAD':
case 'PHPINI':
case 'PHPNEXTPAGE':
if( $tmp[1]!='' && eSubstrCount($tmp[1],$_PSOURCE)==0 && !(${$Comando}=='' && mb_strtoupper($tmp[1])=='ELSE') ) break;
$TipoEntrada = (( $OkModo ) ? $Comando : '#' );
$JsHtm = ( $Etiqueta[0] == 'J' || $Etiqueta[0] == 'H' );
if( mb_strtoupper($tmp[2])=='UNIQUE' ){
$NewVar = '_FILE'.$Comando;
if( $GLOBALS[$NewVar] == $Comando.'_'.$nDimFCH.'_'.$_User ){
$TipoEntrada = '#';
}else{
$GLOBALS[$NewVar] = $Comando.'_'.$nDimFCH.'_'.$_User;
}
}
break;
case 'PDFINCLUDE':
if( $tmp[1]!='' ) $_PDFADDMARGENTOP = $tmp[1];
$_PDFCCode = mb_strtoupper($tmp[0]);
if( in_array( $_PDFCCode, explode(',','START,S,FIRST-BEGIN,FB,FIRST-AFTER,FA,EACH-BEGIN,EB,EACH-AFTER,EA,LAST-BEGIN,LB,LAST-AFTER,LA,END,E') )){
if( mb_strlen($_PDFCCode)>2 ){
$tmp = explode('-',$_PDFCCode);
$_PDFCCode = $_PDFCCode[0];
if( $tmp[1]!='' ) $_PDFCCode .= $tmp[1];
}
$TipoEntrada = '_PDFCode';
$JsHtm = false;
}
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', eNsp($tmp[0]));
$_DBINDEX = eNsp($_DBINDEX);
$_DBINDEX2 = eNsp($_DBINDEX2);
$_DBINDEX3 = eNsp($_DBINDEX3);
break;
case 'FIELDS':
if( $Opcion=='l' && ($tmp[0]=='?' || $tmp[0][0]=='c' || $tmp[0][0]=='b' || $tmp[0][0]=='m' || $tmp[0][0]=='*') ){
$TipoEntrada = '_FIELDSQUESTION';
break;
}
if( mb_strtoupper($tmp[0])=='XLS' && $_POST['_gs_formato_']!='X' ) break;
if( mb_strtoupper($tmp[0])=='XML' && $_POST['_gs_formato_']!='M' ) break;
if( mb_strtoupper($tmp[0])=='PDF' && $_POST['_gs_formato_']!='P' ) break;
if( mb_strtoupper($tmp[0])=='MDB' && $_POST['_gs_formato_']!='A' ) break;
if( mb_strtoupper($tmp[0])=='TXT' && $_POST['_gs_formato_']!='T' ) break;
if( mb_strtoupper($tmp[0])=='CSV' && $_POST['_gs_formato_']!='C' ) break;
if( mb_strtoupper($tmp[0])=='XLS' || mb_strtoupper($tmp[0])=='XML' || mb_strtoupper($tmp[0])=='PDF' || mb_strtoupper($tmp[0])=='MDB' || mb_strtoupper($tmp[0])=='TXT' || mb_strtoupper($tmp[0])=='CSV' ){
$_Form = array();
$tmp[0] = '1';
}
if( count($_Form) > 0 ) break;
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
$TipoEntrada = $Comando;
}
break;
case 'DBADDFILTER':
$_DBADDFILTER = $tmp[0];
if( $_DBADDFILTER[0]=='=' ){
$_DBADDFILTEREXTRA = mb_substr($_DBADDFILTER,1);
if( mb_substr($_DBADDFILTEREXTRA,-1)==')' || mb_substr($_DBADDFILTEREXTRA,-1)==';' ){
list( $NomFunc ) = explode('(',$_DBADDFILTEREXTRA);
if( function_exists($NomFunc) ){
$_DBADDFILTEREXTRA = eval('return '.$_DBADDFILTEREXTRA.';');
}
}
$_DBADDFILTER = '';
}
if( $tmp[1]!='' ){
$tmp2 = explode(',',$tmp[1]);
for( $n=0; $n<count($tmp2); $n++ ) $_PDFLABELHIDDEN[trim($tmp2[$n])] = 'NotToShow';
}
if( count($tmp)>2 ) for( $n=2; $n<count($tmp); $n++ ) $_PDFCONDITIONHIDDEN[] = str_replace("'",'',str_replace('"','',trim($tmp[$n])));
break;
case 'COLSWIDTH':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
$_COLSWIDTHCALC = explode( ',', eNsp($tmp[0]) );
}else{
$_COLSWIDTH = explode( ',', eNsp($tmp[0]) );
}
$_DimColumnas = true;
if( $tmp[1]!='' ) $_COLSWIDTHJS = $tmp[1];
break;
case 'PAGMARGIN':
case 'TITLETOEXTRACT':
${$Comando} = $tmp[0];
break;
case 'FORMAT':
$tmp[0] = gsCambiaComa($tmp[0]);
if( eSubstrCount($tmp[0], '=')>0 ){
$_FORMATCALC = explode(',', $tmp[0]);
break;
}
${$Comando} = explode(',', $tmp[0]);
$TipoEntrada = '_FORMATPHP';
$JsHtm = false;
for($n=0; $n<count($_FORMAT); $n++) $_FORMAT[$n] = _CalcFormato($_FORMAT[$n], $n);
break;
case 'FORMATTOTALS':
${$Comando} = explode( ',', gsCambiaComa($tmp[0]) );
$TipoEntrada = '_FORMATTOTALSPHP';
$JsHtm = false;
if( $tmp[1]>0 ) $_FORMATTOTALSCS = $tmp[1];
for( $n=0; $n<count($_FORMATTOTALS); $n++ ){
$_FORMATTOTALS[$n] = str_replace( '&#44;',',',trim($_FORMATTOTALS[$n]) );
if( !empty($_FORMATTOTALS[$n]) && mb_strlen($_FORMATTOTALS[$n])<4 ){
$_FORMATTOTALS[$n] = str_replace( 'I','' ,$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'C','c',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'D','d',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'L','' ,$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'R','d',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'B','b',$_FORMATTOTALS[$n] );
if( eSubstrCount( $_FORMATTOTALS[$n], 'b' ) == 1 ){
$_NOZEROFORMATTOTALS[$n] = 'S';
$_FORMATTOTALS[$n] = str_replace( 'b','',$_FORMATTOTALS[$n]);
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
}else if( eSubstrCount( $_FORMATTOTALS[$n], 'N' ) == 1 ){
$_FORMATTOTALS[$n] = str_replace( 'N','',$_FORMATTOTALS[$n]);
if( mb_strlen($_FORMATTOTALS[$n])==1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}else{
$_FORMATTOTALS[$n] = "eNumberFormat(#,0)";
}
}
if( eSubstrCount( '0123456789', $_FORMATTOTALS[$n] ) == 1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}
}
}
break;
case 'ALIGN':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
$_ALIGNCALC = explode( ',', $tmp[0] );
}else{
$tmp[0] = eStrtr( mb_strtolower($tmp[0]), 'lrh', 'ido' );
$_ALIGN = explode( ',', $tmp[0] );
for( $n=0; $n<count($_ALIGN); $n++ ){
$_ALIGN[$n] = trim($_ALIGN[$n]);
if( $_ALIGN[$n] != '' ) $_ALIGN[$n] = ' id='.$_ALIGN[$n];
}
}
break;
case 'COLSCOLOR':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
$_COLSCOLORCALC = explode( ',', eNsp($tmp[0]) );
}else{
$_COLSCOLOR = explode( ',', eNsp($tmp[0]) );
for( $n=0; $n<count($_COLSCOLOR); $n++ ){
if( mb_substr($_COLSCOLOR[$n],0,2)=="'#" || mb_substr($_COLSCOLOR[$n],0,2)=='"#' ) $_COLSCOLOR[$n] = mb_substr($_COLSCOLOR[$n],1,-1);
if( $_COLSCOLOR[$n] == '' ){
$_COLSCOLOR[$n] = "class='Celda'";
}else if( $_COLSCOLOR[$n][0] == '#' ){
$_COLSCOLOR[$n] = "bgcolor='{$_COLSCOLOR[$n]}'";
}else{
$_COLSCOLOR[$n] = "class='{$_COLSCOLOR[$n]}'";
}
}
}
break;
case 'GRID':
$_GRID[] = array( $tmp[0], $tmp[1], $tmp[2] );
$TipoEntrada = '_PHPGRID';
if( $_PHPGRID != '' ) $_PHPGRID .= '}function ExeGRID( $Value ){';
$JsHtm = false;
break;
case 'COLSOP':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
$_COLSOPCALC = explode( ',', eNsp($tmp[0]) );
for( $n=0; $n<count($_COLSOPCALC); $n++ ){
if( eSubstrCount($_COLSOPCALC[$n],'=')==0 ){
$_COLSOPCALC[$n+1] = $_COLSOPCALC[$n].','.$_COLSOPCALC[$n+1];
unset($_COLSOPCALC[$n]);
}
}
$_COLSOPCALC = array_values($_COLSOPCALC);
break;
}
$_COLSOP = explode( ',', $tmp[0] );
for( $n=0; $n<count($_COLSOP); $n++ ){
$_OpCol[$n] = 0;
$_COLSOP[$n] = mb_strtoupper(trim($_COLSOP[$n]));
if( $_COLSOP[$n]=='S' ){
if( isset($_TOOLSCMP) ) unset($_TOOLSCMP);
$_NOSELECTROW = true;
$_TGrupos++;
}
if( $_COLSOP[$n]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$n] = $_COLSOP[$n];
if( eSubstrCount( '+C#', $_COLSOP[$n] ) > 0 ) $_InfSinTotales = false;
}
for( $n=0; $n<$_TGrupos; $n++ ){
if( $_COLSOP[$n]!='S' ) die('ERROR: En [ColsOp] los grupos de datos tienen que estar seguidos');
$_OldValGrupo[$n] = '~';
}
if( $_TGrupos > 0 ){
$_NOSORT = true;
$_TextGrupo = explode( ',', $tmp[1] );
for( $n=0; $n<count($_TextGrupo); $n++ ){
$_TextGrupo[$n] = trim($_TextGrupo[$n]);
if( mb_strtoupper($_TextGrupo[$n])=='c' || mb_strtoupper($_TextGrupo[$n])=='v' ) $_TextGrupo[$n] = '{'.$_TextGrupo[$n].'}';
$_TextGrupo[$n] = str_replace( '{c}', '{C}', $_TextGrupo[$n] );
$_TextGrupo[$n] = str_replace( '{v}', '{V}', $_TextGrupo[$n] );
}
if( $tmp[2]!='' ) $_GrupoColSpan = $tmp[2];
}
if( $tmp[3]!='' ) $_PDFAlignCabecera = explode(',',eNsp(mb_strtoupper($tmp[3])));
if( $tmp[4]!='' ) $_PDFGrisCabecera = explode(',',eNsp($tmp[4]));
if( $tmp[5]!='' ) $_PDFGrisSubTotal = explode(',',eNsp($tmp[5]));
if( $tmp[6]!='' ) $_PDFSepGrupoUno = $tmp[6];
break;
case 'ROWSOP':
if( $tmp[1]<>'' ){
$_ROWSOPCALC = $tmp;
}else{
$_ROWSOP = explode( ',', $tmp[0] );
for( $n=0; $n<count($_ROWSOP); $n++ ) $_ROWSOP[$n] = trim($_ROWSOP[$n]);
}
break;
case 'WINLIST':
break;
case 'EXPIRE':
$_EXPIRE = ( ($tmp[0]=='') ? 0 : $tmp[0] );
set_time_limit( $_EXPIRE );
break;
case 'NOABORT':
ignore_user_abort( 0 );
break;
case 'ROWCOLOR':
$_ROWCOLOR = $tmp;
$_HayROWCOLOR = true;
if( $_ROWCOLOR[1]=='' && mb_substr($_ROWCOLOR[0],-1)==';' ) $_ROWCOLOR[0] = trim(mb_substr($_ROWCOLOR[0],0,-1));
break;
case 'CURSOR':
if( $tmp[0]=='-' || mb_strtoupper($tmp[0])=='NO' ){
$_CURSOR = false;
}else{
$_CURSOR = true;
$_GREENBAR = false;
}
break;
case 'GREENBAR':
if( $tmp[0]=='-' || mb_strtoupper($tmp[0])=='NO' ){
$_CURSOR = true;
}else{
$_CURSOR = false;
$_GREENBAR = true;
}
break;
case 'CSSADD':
$ElPuntoEsRem = false;
$sElPuntoEsRem = false;
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
$_SELECTMULTIPLE[$tmp[1]] = (($tmp[2]<>"")? $tmp[2] : 20);
if( $tmp[3]!='' ) $_SELECTMULTIPLESQL[$tmp[1]] = $tmp[3];
}
break;
case 'TIPTD':
array_push($_TIPTD, $tmp[0].'|'.$tmp[1].'|'.$tmp[2].'|'.$tmp[3].'|'.$tmp[4]);
break;
case 'WHERESELECT':
if( $OkModo ) array_push( $_WHERESELECT, array( $tmp[1], $tmp[2] ) );
break;
case 'DB':
break;
case 'RELATIONFIELDS':
case 'ADDOPTION':
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
$_EDITLIST[] = ','.eNsp($tmp[0]).',';
if( eSubstrCount( $tmp[1],'(' ) ) list( $tmp[1] ) = explode('(',$tmp[1]);
$_EDITLIST[] = eNsp($tmp[1]);
$_EDITLIST[] = $tmp[2];
switch( mb_strtoupper($tmp[3]) ){
case 'NOSAVE':	$_EDITLIST[] = -1; break;
case 'CELL':	$_EDITLIST[] =  0; break;
default:		$_EDITLIST[] =  0; break;
}
if( eSubstrCount( $tmp[4],'(' ) ) list( $tmp[4] ) = explode('(',$tmp[4]);
$_EDITLIST[] = eNsp($tmp[4]);
$_EDITLIST[] = $tmp[5];
$_EDITLIST[] = $tmp[6];
break;
case 'RADIO':
$sCampo = $tmp[0];
$tmp[2] = str_replace( '&nbsp;','',$tmp[2]);
$tmp = explode(';', $tmp[2] );
for( $n=0; $n<count($tmp); $n++ ){
$tmpD = explode( ',', $tmp[$n] );
list( $txt, $txt2 ) = explode(CHR92, $tmpD[1] );
$txt2 = trim($txt2);
if( $txt2 != '' ) $txt = trim($txt2);
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
if( $tmp[3]!='' ){
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
if( $tmp[1]!='*' ) $_TIPFORM[$tmp[2]][$tmp[1]] = $buffer;
else $_TIPFORM[$tmp[2]]['L'] = $_TIPFORM[$tmp[2]]['F'] = $buffer;
if( $tmp[1]=='E' ) $_TIPFORM[$tmp[2]]['M'] = _ModeHelp($tmp[0]);
if( $tmp[4]!='' ) $_TIPFORM[$tmp[2]]['W'] = $tmp[4];
if( $tmp[5]!='' ) $_TIPFORM[$tmp[2]]['T'] = $tmp[5]*1000;
}
break;
case 'WINNEW':
$_EnVentana = true;
$_dEnVentana = explode( ',', $tmp[0] );
if( trim($_dEnVentana[0]) == '' ) $_dEnVentana[0] = 400;
if( trim($_dEnVentana[1]) == '' ) $_dEnVentana[1] = 300;
if( trim($_dEnVentana[2]) == '' ) $_dEnVentana[2] = 0;
break;
case 'NOTE':
break 3;
case 'PDFVAR':
if( $tmp[0][0]!='$' ) $tmp[0] = '$'.$tmp[0];
if( mb_substr($tmp[0],-1)!=';' ) $tmp[0] = $tmp[0].';';
$_PDFVAR[] = $tmp[0];
break;
case 'PDFCOLSSHADE':
$tmp[0] = str_replace('%','',$tmp[0]);
case 'PDFCOLBORDER':
case 'PDFCOL':
if( eSubstrCount( $tmp[0], '=' ) > 0 ){
$Comando .= 'CALC';
${$Comando} = explode( ',', eNsp($tmp[0]) );
}else{
${$Comando} = explode( ',', eNsp($tmp[0]) );
}
break;
case 'PDFWRAP':
list( $_PDFWRAP[0], $_PDFWRAP[1], $sPDFVar ) = explode(',',eNsp($tmp[0]));
if( $_PDFWRAP[1]=='' ){
$_PDFWRAP[1] = true;
}else{
$_PDFWRAP[1] = (mb_strtoupper(trim($_PDFWRAP[1]))=='TRUE');
}
if( $sPDFVar!='' ) $_PDFVAR[] = '$PDF_Grid = '.((mb_strtoupper(trim($sPDFVar))=='TRUE' || mb_strtoupper(trim($sPDFVar))=='1' )?'true':'false').';';
if( $tmp[1]!='' ) $_PDFWRAPFIELDS = explode(',',eNsp($tmp[1]));
break;
case 'LISTCOMPARETH':
case 'PDFLISTCOMPARETH':// PDFTH-Compara dos listados
if( trim($tmp[0])!='' ){
${$Comando} = explode( ',', $tmp[0] );
for( $n=0; $n<count(${$Comando}); $n++ ) ${$Comando[$n]} = trim(${$Comando[$n]});
}
break;
case 'PDFTH':
if( trim($tmp[0])!='' ){
if( eSubstrCount($tmp[0],'=') > 0 ){
$_xPDFTH = explode( ',', $tmp[0] );
for( $n=0; $n<count($_xPDFTH); $n++ ) $_xPDFTH[$n] = trim($_xPDFTH[$n]);
}else{
$_PDFTH = explode( ',', $tmp[0] );
for( $n=0; $n<count($_PDFTH); $n++ ) $_PDFTH[$n] = trim($_PDFTH[$n]);
}
}
$tmp2 = explode( ',', $tmp[1] );
for( $n=0; $n<count($tmp2); $n++ ){
list( $Campo, $Valor ) = explode( '=', trim($tmp2[$n]) );
$_PDFLABELHIDDEN[trim($Campo)] = trim($Valor);
}
if( $tmp[2]!='' ){
if( mb_substr($tmp[2],-1)==';' ) $tmp[2] = mb_substr($tmp[2],0,-1);
$tmp2 = explode( ';', $tmp[2] );
for( $n=0; $n<count($tmp2); $n++ ){
$tmp3 = explode( '=', eNsp($tmp2[$n]) );
$_PDFVALUELHIDDEN[$tmp3[0]] = $tmp3[1];
}
}
break;
case 'PDFPHP':
if( $tmp[0] == 'F' ) $_PDFPHP = $tmp[1];
break;
case 'PDFSAVEVAR':
$_PDFSAVEVAR = eNsp($tmp[0]);
break;
case 'PDFBREAKPAGE':
$_PDFBREAKPAGE = explode(',',eNsp(str_replace('+',',',$tmp[0])));
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
break;
case 'FORUSERS':
if( $OkModo ){
if( $tmp[2]=='' ) $tmp[2] = 'ACCESO DENEGADO';
if( eSubstrCount( eNsp($tmp[1]), 'selectcount(*)' )==1 ){
$OkModo = _ExeEval($tmp[1], $buffer);
if( $OkModo!=1 ) eMessageBG($tmp[2], 'HS');
}else if( eSubstrCount($tmp[1], '$')==0 ){
if( eSubstrCount(','.eNsp($tmp[1]).',', ",{$_User},")==0 ){
eMessageBG($tmp[2], 'HS');
}
}else if( $tmp[2][0]=="#" ){
$permission = substr($tmp[2], 1);
qQuery("select cd_gs_tpermission from gs_tpermission where nm_gs_tpermission='{$permission}'");
list($cd_gs_permission) = qRow();
if( qQuery("gs_permission", "cd_gs_user='{$_ENV['user']}' and cd_gs_tpermission='{$cd_gs_permission}'")==0 ){
eMessage($tmp[2], 'HS');
}
}else{
if( !_ExeEval($tmp[1], $buffer) ) eMessageBG($tmp[2], 'HS');
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
$_LABEL[ $tmp[0] ] = $tmp[1];
break;
case 'CHECKLIST':
$tmp[3] = mb_strtoupper($tmp[3]);
if( eSubstrCount( ',WRAP,NOWRAP,', ",{$tmp[3]}," ) == 0 ) $tmp[3] = '';
$_CHECKLIST[$tmp[0]] = array( $tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5] );
if( $tmp[3]!='' ){
if( $tmp[4] > 0 ) $_PDFWRAP = array($tmp[4],true);
$Sql = $tmp[2];
if( eSubstrCount($Sql,'()')==1 ){
$DimCheck = eval("return {$Sql};");
}else if( preg_match("/^SELECT /iu",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount( $Tabla );
}
qQuery( $Sql );
}else if( preg_match("/^CD_/iu",$Sql) ){
$Tabla = mb_substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount( $Tabla );
qQuery( "select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2" );
}else if( eSubstrCount($Sql,',')==eSubstrCount($Sql,';')+1 && eSubstrCount($Sql,',')>1 ){
$DimCheck = explode(';',$Sql);
for( $n=0; $n<count($DimCheck); $n++ ) $DimCheck[$n] = explode(',',$DimCheck[$n]);
}else{
eMessageBG( 'ERROR: Definición de [CheckList] no soportada', 'HSE' );
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
if( $tmp[3]!='' ){
$Sql = $tmp[2];
if( eSubstrCount($Sql,'()')==1 ){
$DimRadio = eval("return {$Sql};");
}else if( preg_match("/^SELECT /iu",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount( $Tabla );
}
qQuery( $Sql );
}else if( preg_match("/^CD_/iu",$Sql) ){
$Tabla = mb_substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount( $Tabla );
qQuery( "select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2" );
}else if( eSubstrCount($Sql,',')==eSubstrCount($Sql,';')+1 && eSubstrCount($Sql,',')>1 ){
$DimRadio = explode(';',$Sql);
for( $n=0; $n<count($DimRadio); $n++ ) $DimRadio[$n] = explode(',',$DimRadio[$n]);
}else{
eMessageBG('ERROR: Definición de [RadioList] no soportada', 'HSE');
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
if( eSubstrCount(',edf,gdf,ldf,fdf',",{$tmp}," ) > 0 ){
$_DimEDF = @OpenDF($FicheroD);
}else{
eInit();
include( $FicheroD );
eEnd();
}
$nDimFCH = -1;
continue;
case 'DBRANGE':
if( !$VieneDeFicha || $_gsObjetoAnterior=='G' ){
$DimDBRange[] = array( $tmp[1], ${$tmp[2]}, ${$tmp[3]}, $tmp[4], $tmp[2], $tmp[3] );
}
break;
case 'PDFLABEL':
$_PDFLABEL[] = explode( '|', $buffer );
$TipoEntrada = $Comando;
$_gs_formato_ = 'L';
break;
case 'CHR':
$_CHR[] = $tmp;
$_CHR[$tmp[0]] = $tmp;
break;
case 'MSGANSWER':
if( $OkModo ) ${$Comando} = array($tmp[1], $tmp[2]);
break;
case 'UPLOADFILE':
$tmp[1] = _InVar($tmp[1]);
if( gettype($_Fichero)=="NULL" ) $_Fichero = array();
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
list( $uNomFile ) = explode(' ', $tmp[0]);
$_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
$tmp[1] = eScript($tmp[1]);
$_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = str_replace('.','',str_replace(',','',$tmp[3]));
if( $_UPLOADFILE[$uNomFile]['BYTS'] < 0 ) $_UPLOADFILE[$uNomFile]['BYTS'] = $_UPLOADFILE[$uNomFile]['BYTS']*-1;
$_UPLOADFILE[$uNomFile]['TITLE'] = (($tmp[4]=='') ? $__Lng[59] : $tmp[4] );
if( $tmp[5]=='*.*' ) $tmp[5] = '*';
if( $tmp[5]!='' ) $_UPLOADFILE[$uNomFile]['EXT'] = eNsp($tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$_sDBTABLE.".".$uNomFile] = $_UPLOADFILE[$uNomFile];
break;
case 'JSDIM':
if( $OkModo ) $_JSDIM[] = array( $tmp[1], $tmp[2], $tmp[3] );
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
include( $Dir_.'remotesrv.inc' );
exit;
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
case 'DBGATEWAY':
if( $OkModo ) ${$Comando} = $tmp[1];
break;
case 'WINCLOSEESC':
$_WINCLOSEESC = true;
break;
case 'CACHE':
if( SETUP::$System['Cache'] && $OkModo && mb_substr($_oAccion,-2)=="df" && SESS::$_D_=='' ){
$_ENV[DF]["cache"] = eScriptToCache();
}
break;
case 'EXIT':
break 3;
case 'BACKGROUNDIMAGE':
if( $OkModo && ( $tmp[4]=='false' || (($tmp[4]=='' || $tmp[4]=='true') && $_PSOURCE=='WWORK')) ) $_BACKGROUNDIMAGE = '<style>body{background-image:url("'.$tmp[1].'");background-repeat:'.(($tmp[2]=='')?'no-repeat':$tmp[2]).';background-position:'.(($tmp[3]=='')?'bottom right':$tmp[3]).';background-attachment:fixed;}</style>';
break;
case 'P':
$_NombreInclude = $tmp[0];
$TipoEntrada = 'Inc'.$Etiqueta;
break;
case 'NOTOOLS':
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
}
break;
case  0:
case 10:
break;
default:
$NoExePHPInterno = false;
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm('L', $Opcion, $buffer, $_Form, $_DEFAUX, 1) ){
$nf = count($_Form)-1;
$_Field[$_Form[$nf][1]] = true;
$_pField[$_Form[$nf][1]] = $_Form[$nf];
if( $_Form[$nf][1]=='_gs_formato_' && $_Form[$nf][7]=='P' ) $PDF_Formato = 'L';
}elseif( mb_strtoupper(mb_substr(trim($buffer),0,3))=='{P}' ){
$NomSubEti = trim(mb_substr(trim($buffer),3));
if( $_DimInclude['IncP'][$NomSubEti]=='' ) _CargarSubEti($nDimFCH, 'P', $NomSubEti);
$tmpFile = GrabaTmp('l_php_'.mb_strtolower($NomSubEti), $_DimInclude['IncP'][$NomSubEti], $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
}
break;
case '_FIELDSQUESTION':
if( IncluirEnForm('L', 'c', $buffer, $buffer, $_DEFAUX, 1, true) ){
}
break;
case '_CSSADD':
$ElPuntoEsRem = false;
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
case '_JSEND':
case '_JSHEAD':
case '_JSINI':
case '_JSONLOAD':
case '_JSONCLICKROW':
case '_JSSELROW':
if( $buffer=='' && $_DEBUG<>2 ) continue;
${$TipoEntrada} .= $buffer.$__Enter;
break;
break;
case '_GROUPLABELS':
$_Grupo[] = explode( '|', $buffer );
break;
case '_PDFLABEL':
$_PDFLABEL[] = explode( '|', $buffer );
break;
case '_NAN':
$SubEtiqueta = trim(mb_substr( $buffer, 1, mb_strpos($buffer,'}')-1 ));
$buffer = trim(str_replace( '{'.$SubEtiqueta.'}', '', $buffer ));
$_Objeto[$_ObjetoID][mb_strtoupper($SubEtiqueta)] = $buffer;
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
case 'IncP':
$_DimInclude[$TipoEntrada][$_NombreInclude] .= $buffer.$__Enter;
break;
}
}
}
unset($_DimEDF);
if( isset($_GET['_SHOWFILTER']) ) $_SHOWFILTER = $_GET['_SHOWFILTER'];
if( $OriFichero[0]=='$' ){
$AddFile = '../_datos/config/'.mb_substr($OriFichero,mb_strrpos($OriFichero,'/')+1,-3).'ini';
if( file_exists($AddFile) ) include($AddFile);
unset($AddFile);
}
function eAddForm( $buffer ){
global $Opcion, $_Form, $_DEFAUX;
global $_Field, $_pF, $PDF_Formato, $_PDFTH;
list( ,$Campo ) = explode( '|', $buffer );
$Campo = trim($Campo);
$i = -1;
for( $n=0; $n<count($_Form); $n++ ){
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
if( IncluirEnForm( 'L', $Opcion, $buffer, $_Form, $_DEFAUX, 1 ) ){
if( $ModCampo ){
$nf = $i;
$sForm[$i] = $_Form[0];
$_Form = $sForm;
}else{
$nf = count($_Form)-1;
}
$_Field[$_Form[$nf][1]] = true;
if( $_Form[$nf][1] == '_gs_formato_' && $_Form[$nf][7] == 'P' ) $PDF_Formato = 'L';
$_pF[$_Form[$nf][1]] = count($_Form)-1;
$_PDFTH[$nf] = $_Form[$nf][0];
}
}
function eTHColSpan( $buffer ){
$tmp = explode( '|', $buffer );
for( $n=0; $n<count($tmp); $n++ ) $tmp[$n] = trim($tmp[$n]);
$GLOBALS['_THCOLSPAN'] = $tmp;
}
function eColsOp( $buffer ){
global $_COLSOP, $_OpCol, $_NOSELECTROW, $_NOSORT;
global $_GrupoColSpan, $_InfSinTotales, $_OldValGrupo, $_TGrupos, $_TantoPorCiento, $_TextGrupo, $_oCOLSOP;
global $_PDFAlignCabecera, $_PDFGrisCabecera, $_PDFGrisSubTotal, $_PDFSepGrupoUno;
$_COLSOP = explode( ',', $buffer );
for( $n=0; $n<count($_COLSOP); $n++ ){
$_OpCol[$n] = 0;
$_COLSOP[$n] = mb_strtoupper(trim($_COLSOP[$n]));
if( $_COLSOP[$n]=='S' ){
$_NOSELECTROW = true;
$_TGrupos++;
}
if( $_COLSOP[$n]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$n] = $_COLSOP[$n];
if( eSubstrCount( '+C#', $_COLSOP[$n] ) > 0 ){
$_InfSinTotales = false;
}
}
for( $n=0; $n<$_TGrupos; $n++ ){
if( $_COLSOP[$n]!='S' ) die('ERROR: En [ColsOp] los grupos de datos tienen que estar seguidos');
$_OldValGrupo[$n] = '~';
}
if( $_TGrupos > 0 ){
$_NOSORT = true;
$_TextGrupo = explode( ',', $tmp[1] );
for( $n=0; $n<count($_TextGrupo); $n++ ){
$_TextGrupo[$n] = trim($_TextGrupo[$n]);
if( mb_strtoupper($_TextGrupo[$n])=='c' || mb_strtoupper($_TextGrupo[$n])=='v' ) $_TextGrupo[$n] = '{'.$_TextGrupo[$n].'}';
$_TextGrupo[$n] = str_replace( '{c}', '{C}', $_TextGrupo[$n] );
$_TextGrupo[$n] = str_replace( '{v}', '{V}', $_TextGrupo[$n] );
}
if( $tmp[2]!='' ) $_GrupoColSpan = $tmp[2];
}
if( $tmp[3]!='' ) $_PDFAlignCabecera = explode(',',eNsp(mb_strtoupper($tmp[3])));
if( $tmp[4]!='' ) $_PDFGrisCabecera = explode(',',eNsp($tmp[4]));
if( $tmp[5]!='' ) $_PDFGrisSubTotal = explode(',',eNsp($tmp[5]));
if( $tmp[6]!='' ) $_PDFSepGrupoUno = $tmp[6];
}
function eRowsOp( $buffer ){
global $_ROWSOPCALC, $_ROWSOP;
$txt = str_replace( '\|', '&#124;', $buffer );
$tmp = explode( '|', $txt );
for( $n=0; $n<count($tmp); $n++ ) $tmp[$n] = str_replace( '&#124;', '|', trim($tmp[$n]) );
if( $tmp[1]<>'' ){
global $_Form;
$_ROWSOPCALC = $tmp;
$tmp = str_replace('+',',+',eNsp('+'.$_ROWSOPCALC[0]));
$tmp = str_replace('-',',-',$tmp);
$tmp = str_replace('*',',*',$tmp);
$tmp = explode( ',', $tmp );
for( $n=0; $n<count($_Form); $n++ ) $_ROWSOP[$n] = '';
for( $n=0; $n<count($tmp); $n++ ){
$o = mb_substr($tmp[$n],0,1);
if( $o<>'' ){
$c = mb_substr($tmp[$n],1);
$_ROWSOP[ $_pF[trim($c)] ] = $o;
}
}
$_ROWSOP[count($_Form)] = trim($_ROWSOPCALC[1]);
}else{
$_ROWSOP = explode( ',', $tmp[0] );
for( $n=0; $n<count($_ROWSOP); $n++ ) $_ROWSOP[$n] = trim($_ROWSOP[$n]);
}
}
function eChartCol( $Long=100, $pCol=-1 ){
if( $pCol==-1 ) $pCol = count($GLOBALS['_Form']);
$GLOBALS['_CHARTCOL'] = array( $pCol, $Long );
}
function eChartRow( $DefCampos, $Ancho=100, $Alto=100 ){
global $_CHARTROW;
$_CHARTROW[0] = $DefCampos;
$_CHARTROW[1] = $Ancho;
$_CHARTROW[2] = $Alto;
}
function eFormat( $buffer ){
global $_FORMATCALC, $_FORMAT, $TipoEntrada, $JsHtm;
$buffer = gsCambiaComa($buffer);
if( eSubstrCount($buffer, '=' ) > 0 ){
$_FORMATCALC = explode( ',', $buffer );
break;
}
$_FORMAT = explode( ',', $buffer );
$JsHtm = false;
for( $n=0; $n<count($_FORMAT); $n++ ) $_FORMAT[$n] = _CalcFormato( $_FORMAT[$n], $n );
}
function eFormatTotals( $buffer ){
global $_FORMATTOTALS, $TipoEntrada, $JsHtm, $_FORMATTOTALSCS, $_NOZEROFORMATTOTALS;
$_FORMATTOTALS = explode(',', gsCambiaComa($buffer));
$JsHtm = false;
if( $tmp[1]>0 ) $_FORMATTOTALSCS = $tmp[1];
for( $n=0; $n<count($_FORMATTOTALS); $n++ ){
$_FORMATTOTALS[$n] = str_replace( '&#44;',',',trim($_FORMATTOTALS[$n]) );
if( !empty($_FORMATTOTALS[$n]) && mb_strlen($_FORMATTOTALS[$n])<4 ){
$_FORMATTOTALS[$n] = str_replace( 'I','' ,$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'C','c',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'D','d',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'L','' ,$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'R','d',$_FORMATTOTALS[$n] );
$_FORMATTOTALS[$n] = str_replace( 'B','b',$_FORMATTOTALS[$n] );
if( eSubstrCount( $_FORMATTOTALS[$n], 'b' ) == 1 ){
$_NOZEROFORMATTOTALS[$n] = 'S';
$_FORMATTOTALS[$n] = str_replace( 'b','',$_FORMATTOTALS[$n]);
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
}else if( eSubstrCount( $_FORMATTOTALS[$n], 'N' ) == 1 ){
$_FORMATTOTALS[$n] = str_replace( 'N','',$_FORMATTOTALS[$n]);
if( mb_strlen($_FORMATTOTALS[$n])==1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}else{
$_FORMATTOTALS[$n] = "eNumberFormat(#,0)";
}
}
if( eSubstrCount( '0123456789', $_FORMATTOTALS[$n] ) == 1 ){
$_FORMATTOTALS[$n] = "eNumberFormat(#,".$_FORMATTOTALS[$n].")";
}
}
}
}
function eAlign( $buffer ){
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
include_once( $Dir_.$_Sql.'.inc' );
$_sMaxVisibleRows = $_MaxVisibleRows;
$_DownloadUrl = ( (isset($_DownloadFile)) ? $_DownloadFile : $_DownloadUrl );
if( isset($_ALIGNCALC) ){
for( $n=0; $n<count($_ALIGNCALC); $n++ ){
$tmp = explode('=',eNsp($_ALIGNCALC[$n]));
$_ALIGN[ $_pF[$tmp[0]] ] = ' id='.eStrtr( mb_strtolower($tmp[1]), 'lrh', 'ido' );
}
}
if( isset($_FORMATCALC) ){
for( $n=0; $n<count($_FORMATCALC); $n++ ){
$tmp = explode( '=', $_FORMATCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_FORMAT[$p] = _CalcFormato( $tmp[1], $p );
}
}
if( isset($_COLSOPCALC) ){
for( $n=0; $n<count($_COLSOPCALC); $n++ ){
$tmp = explode( '=', $_COLSOPCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_COLSOP[ $p ] = mb_strtoupper($tmp[1]);
$_OpCol[$p] = 0;
if( $_COLSOP[$p]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$p] = $_COLSOP[$p];
if( eSubstrCount( '+C#', $_COLSOP[$p] ) > 0 ) $_InfSinTotales = false;
}
}
if( isset($_COLSWIDTHCALC) ){
for( $n=0; $n<count($_COLSWIDTHCALC); $n++ ){
$tmp = explode( '=', $_COLSWIDTHCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_COLSWIDTH[ $p ] = $tmp[1];
}
}
if( isset($_ROWSOPCALC) ){
$tmp = str_replace('+',',+',eNsp('+'.$_ROWSOPCALC[0]));
$tmp = str_replace('-',',-',$tmp);
$tmp = str_replace('*',',*',$tmp);
$tmp = explode( ',', $tmp );
for( $n=0; $n<count($_Form); $n++ ) $_ROWSOP[$n] = '';
for( $n=0; $n<count($tmp); $n++ ){
$o = mb_substr($tmp[$n],0,1);
if( $o<>'' ){
$c = mb_substr($tmp[$n],1);
$_ROWSOP[ $_pF[trim($c)] ] = $o;
}
}
$_ROWSOP[count($_Form)] = trim($_ROWSOPCALC[1]);
}
if( isset($_COLSCOLORCALC) ){
for( $n=0; $n<count($_COLSCOLORCALC); $n++ ){
$tmp = explode( '=', $_COLSCOLORCALC[$n] );
$p = $_pF[trim($tmp[0])];
if( $tmp[1][0] == '#' ){
$_COLSCOLOR[$p] = "bgcolor='{$tmp[1]}'";
}else{
$_COLSCOLOR[$p] = "class='{$tmp[1]}'";
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
foreach( $_pF as $k=>$v ) eTron( $k.'='.$v );
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
if( $_JSONCLICKCOL!='' ){
$tmp = explode(',',$_JSONCLICKCOL);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]==(string)($tmp[$n]*1) ){
$_COLSCOLOR[$tmp[$n]] = 'class=JSOnClickRow';
}else{
$_COLSCOLOR[$_pF[$tmp[$n]]] = 'class=JSOnClickRow';
}
}
}
if( isset($_TIPTHCALC) ){
for( $n=0; $n<count($_TIPTHCALC); $n++ ){
$tmp = explode( '=', $_TIPTHCALC[$n] );
$_TIPTH[ $_pF[trim($tmp[0])] ] = trim($tmp[1]);
}
}
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPSTART );
}
if( $_TITLE[0]=='#' ) $_TITLE = trim(mb_substr($_TITLE,1));
if( $_TITLE_DELFILTER!='' ) $_TITLE = $_TITLE_DELFILTER;
_CreateVar( $_Form );
TrimRelationFields();
if( $_SummaryType > 0 ){
$_SummaryCol = $_TGrupos+1-$_SummaryType;
}
if( $TipoEntrada == '_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
if( $_PHPGRID != '' ) $_PHPGRID = 'function ExeGRID( $Value ){'.$_PHPGRID.'}';
if( $_ConChartSWF && $_CHARTGRID=='' ) $_CHARTGRID = '1';
if( $_FORMATTOTALSPHP!='' ){
$_NameField = array();
for($n=0; $n<count($_Form); $n++) $_NameField[$n] = $_Form[$n][1];
}
if( $_CHARTGRID != '' ){
if( count($_CHART) < $_CHARTGRID ){
$_CHARTGRID = count($_CHART);
}else if( count($_CHART) > $_CHARTGRID ){
for( $n=$_CHARTGRID; $n<count($_CHART); $n++ ) unset($_CHART[$n-1]);
}
}
if( $_SqlPDOConnect!='' ) list( $_SqlPDOType ) = explode( ':', $_SqlPDOConnect );
if( count($DimDBRange) > 0 ){
$MemDBRange = array();
for( $i=0; $i<count($DimDBRange); $i++ ){
$Campo = $DimDBRange[$i][0];
$ValorINI = $VarIni = stripcslashes($DimDBRange[$i][1]);
$ValorFIN = $VarFin = stripcslashes($DimDBRange[$i][2]);
$Inclusive = ( eSubstrCount( ',TRUE,!FALSE,1,,', ','.mb_strtoupper($DimDBRange[$i][3]).',' ) == 1 );
$_ConDBRange[$Campo] = true;
$Si = false;
$sTipo = 'T';
for( $c=0; $c<count($_Form); $c++ ){
if( $_Form[$c][1] == $Campo ){
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
if( isset($_POST[$DimDBRange[$i][4].'_hours']) ) $sTipo = 'CDI';
if( $sTipo == 'F4' || $sTipo == 'F2' ){
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
if( isDate($VarIni) ){
$VarIni = str_replace( '\\', '', $VarIni );
if( $_POST[$DimDBRange[$i][4].'_hours']!='' ){
$VarIni = $ValorINI = $VarIni.' '.$_POST[$DimDBRange[$i][4].'_hours'];
}else{
$VarIni = $ValorINI = $VarIni.' 00:00:00';
}
}
if( isDate($VarFin) ){
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
if( count($_LISTCOMPARE) > 0 ) ${$Campo} = ' '.${$Campo};
}
}
if( !eSqlType('oracle') ) ${$Campo} = str_replace( "'", '"', ${$Campo} );
$_POST[$Campo] = ${$Campo};
$MemDBRange[$Campo] = $Campo.''.${$Campo};
}
if( count($_LISTCOMPARE)>0 ) $_PDFSAVEVAR = eNsp($_LISTCOMPARE[1]);
}
$_NOTOOLS = $_NOTOOLS . SESS::$_notools_;
if( $_NOTOOLS!='' ){
if( eSubstrCount($_NOTOOLS,'S')>0 ){
$_NOSORT = true;
$_NOTOOLS = str_replace('S','',$_NOTOOLS);
}
if( similar_text('*',$_NOTOOLS)==1 ) $_NOTOOLS = '*';
}
if( $_SORTLIST != '' ){
$_CURSOR = false;
$_GREENBAR = false;
$_oDBTABLE = $_DBTABLE;
$_MAXREC = 0;
}
$_PosSerial = -1;
$_ConSelectVirtual = false;
for( $nf=0; $nf<count($_Form); $nf++ ){
list($sCampo,$xTabla) = explode( '{', $_Form[$nf][1] );
list($sCampo,$sReal) = explode( ':', $sCampo );
if( $_SELECTMULTIPLE[$sCampo]!='' ){
if( $_Form[$nf][3]=='SV' && $_ADDOPTION[ $_Form[$nf][1] ]!='' ){
if( eSubstrCount( $_ADDOPTION[ $_Form[$nf][1] ], '()' ) == 1 ){
$_ADDOPTION[ $_Form[$nf][1] ] = trim($_ADDOPTION[ $_Form[$nf][1] ]);
if( mb_substr($_ADDOPTION[ $_Form[$nf][1] ],-1)!=';' ) $_ADDOPTION[ $_Form[$nf][1] ] .= ';';
$tmp1 = @eval( 'return '.$_ADDOPTION[ $_Form[$nf][1] ] );
for( $i=0; $i<count($tmp1); $i++ ){
$tmp1[$i][1] = trim($tmp1[$i][1]);
$tmp1[$i][0] = trim($tmp1[$i][0]);
$_SelVirtual[ $_Form[$nf][1] ][$tmp1[$i][0]] = trim($tmp1[$i][1]);
}
}else{
$tmp = explode( ';', $_ADDOPTION[$_Form[$nf][1]] );
for( $i=0; $i<count($tmp); $i++ ){
$tmp1 = explode( ',', $tmp[$i] );
$tmp1[0] = trim($tmp1[0]);
$tmp1[1] = trim($tmp1[1]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[0]] = trim($tmp1[1]);
}
}
}else if( $_Form[$nf][3]=='S' ){
if( $xTabla!='' ){
$tmp = str_replace( '{', ',', $_Form[$nf][1] );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$Tabla = $tmp[1];
$NomCampo = $tmp[0];
$Campos = $tmp[2];
$tCampos = count($tmp);
for( $i=3; $i<$tCampos; $i++ ) $Campos .= ','.$tmp[$i];
}else if( $sReal!='' ){
$Tabla = mb_substr($sReal,3);
$Campos = $sReal.', nm_'.$Tabla;
}
list( $Campo1, $Campo2 ) = explode(',',$Campos);
qQuery( "select {$Campos} from {$Tabla}" );
while( $r=qRow() ) $_SelVirtual[$sCampo][trim($r[0])] = trim($r[1]);
}
$_SelVirtualType[$sCampo] = $_Form[$nf][3];
$_Form[$nf][3] = 'T';
$_Form[$nf][1] = $sCampo;
}
if( mb_strtoupper($_Form[$nf][3])=='R' && $_EDITLIST[0]!='' && eSubstrCount($_EDITLIST[0],','.$_Form[$nf][1].',')>0 ){
$_Form[$nf][3] = 'SV';
$txt = '';
foreach( $_RADIO[$_Form[$nf][1]] as $k=>$v ){
if( $txt!='' ) $txt .= ';';
$txt .= $k.','.$v;
}
$_ADDOPTION[ $_Form[$nf][1] ] = $txt;
}
if( $_Form[$nf][3]=='I' ){
$_FORMAT[$nf] = 'IMG';
$_ALIGN[$nf] = ' id=c';
}
if( $_Form[$nf][3]=='C' && $_ALIGN[$nf]=='' ) $_ALIGN[$nf] = ' id=c';
list( $_Form[$nf][_OFIELD] ) = explode( ' ', $_Form[$nf][1] );
list( $_Form[$nf][_OFIELD] ) = explode( ':', $_Form[$nf][_OFIELD] );
list( $_Form[$nf][_OFIELD] ) = explode( '{', $_Form[$nf][_OFIELD] );
$_Form[$nf][_OFIELD] = trim($_Form[$nf][_OFIELD]);
if( $_Form[$nf][_OFIELD] == $_DBSERIAL[1] ) $_PosSerial = $nf;
if( mb_substr($_Form[$nf][1],0,4)=='dct_' && $_POST[$_Form[$nf][1]]!='' ) $_DCT[] = $_Form[$nf][1];
$_ColVirtual[$nf] = false;
if( $_Form[$nf][0][0]==',' ){
if( $nf==0 || $_Form[$nf-1][0]=='-' ) $_Form[$nf][0] = mb_substr($_Form[$nf][0],1);
}
if( $_LABEL[$_Form[$nf][1]] != '' ){
list( $_Form[$nf][0], $MsgList, $MsgError ) = explode( CHR92, $_LABEL[$_Form[$nf][1]] );
if( $MsgList!='' ) $_Form[$nf][0] = $MsgList;
if( $MsgError!= '' ) $_Etiqueta[$_Form[$nf][1]] = trim($MsgError);
}
if( $_Form[$nf][3]=='SV' && !empty( $_ADDOPTION[ $_Form[$nf][1] ] ) ){
$_ConSelectVirtual = true;
if( eSubstrCount( $_ADDOPTION[$_Form[$nf][1]], '()' ) == 1 ){
$_ADDOPTION[$_Form[$nf][1]] = trim($_ADDOPTION[$_Form[$nf][1]]);
if( mb_substr($_ADDOPTION[$_Form[$nf][1]],-1) != ';' ) $_ADDOPTION[$_Form[$nf][1]] = trim($_ADDOPTION[$_Form[$nf][1]]).';';
$tmp = eval( 'return '.$_ADDOPTION[$_Form[$nf][1]] );
if( count($tmp[0]) >= 2 ){
for( $i=0; $i<count($tmp); $i++ ) $_SelVirtual[$_Form[$nf][1]][$tmp[$i][0]] = trim($tmp[$i][1]);
}else{
foreach( $tmp as $k=>$v ) $_SelVirtual[$_Form[$nf][1]][$k] = trim($v);
}
}elseif( mb_substr( mb_strtoupper($_ADDOPTION[$_Form[$nf][1]]),0,7)=='SELECT ' ){
qQuery( $_ADDOPTION[$_Form[$nf][1]], $p1 );
while( $r=qRow($p1) ){
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
$_SelVirtual[$_Form[$nf][1]][$r[0]] = ( ($r[1]=='') ? $r[0] : $r[1] );
}
}else{
$tmp = explode( ';', $_ADDOPTION[$_Form[$nf][1]] );
for( $i=0; $i<count($tmp); $i++ ){
$tmp1 = explode( ',', $tmp[$i] );
$tmp1[0] = trim($tmp1[0]);
$tmp1[1] = trim($tmp1[1]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[0]] = trim($tmp1[1]);
$_SelVirtualStyle[$_Form[$nf][1]][$tmp1[0]] = $_ADDOPTIONSTYLE[ $_Form[$nf][1] ][$i];
}
}
}
if( eSubstrCount( 'MSSsX.SL.SV.', $_Form[$nf][3] ) > 0 ){
$HaySelect = true;
}else{
if( !empty( $_ADDOPTION[ $_Form[$nf][1] ] ) && $_Form[$nf][3]!='SV' ) unset($_ADDOPTION[ $_Form[$nf][1] ]);
}
}
if( count($_Grupo) > 0 ){
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
$_Grupo[$nf][$p] = str_replace( 'i','i',$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'l','i',$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'r','d',$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'h','o',$_Grupo[$nf][$p] );
if( $_Grupo[$nf][$p] != '' ) $_ALIGN[$i] = ' id='.$_Grupo[$nf][$p];
break;
case 'FORMAT':
$_Grupo[$nf][$p] = str_replace( '&#44;',',',trim($_Grupo[$nf][$p]) );
if( !empty($_Grupo[$nf][$p]) && mb_strlen($_Grupo[$nf][$p])<4 ){
$_Grupo[$nf][$p] = str_replace( 'I','' ,$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'C','c',$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'D','d',$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'L','' ,$_Grupo[$nf][$p] );
$_Grupo[$nf][$p] = str_replace( 'R','d',$_Grupo[$nf][$p] );
if( eSubstrCount( $_Grupo[$nf][$p], 'b' ) == 1 ){
$_NOZERO[$i] = 'S';
$_ALIGN[$i] = ' id=d';
$_Grupo[$nf][$p] = str_replace( 'b','',$_Grupo[$nf][$p]);
}
if( eSubstrCount( $_Grupo[$nf][$p], 'c' ) == 1 ){
$_ALIGN[$i] = ' id=c';
$_Grupo[$nf][$p] = str_replace( 'c','',$_Grupo[$nf][$p]);
}else if( eSubstrCount( $_Grupo[$nf][$p], 'd' ) == 1 ){
$_ALIGN[$i] = ' id=d';
$_Grupo[$nf][$p] = str_replace( 'd','',$_Grupo[$nf][$p]);
}
if( eSubstrCount( $_Grupo[$nf][$p], 'M' ) == 1 ){
$_Grupo[$nf][$p] = str_replace( 'M','',$_Grupo[$nf][$p]);
$_ALIGN[$i] = ' id=d';
if( mb_strlen($_Grupo[$nf][$p])==1 ){
$_FORMAT[$i] = "eNumberFormat(#,".$_Grupo[$nf][$p].")";
}else{
$_FORMAT[$i] = "eNumberFormat(#,0)";
}
}else if( eSubstrCount( $_Grupo[$nf][$p], 'N' ) == 1 ){
$_Grupo[$nf][$p] = str_replace( 'N','',$_Grupo[$nf][$p]);
$_ALIGN[$i] = ' id=d';
if( mb_strlen($_Grupo[$nf][$p])==1 ){
$_FORMAT[$i] = "eNumberFormat(#,".$_Grupo[$nf][$p].")";
}else{
$_FORMAT[$i] = "eNumberFormat(#,0)";
}
}
if( eSubstrCount( '0123456789', $_Grupo[$nf][$p] ) == 1 ){
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
if( $_Grupo[$nf][$p] != '' ) $_Form[$i][0] = $_Grupo[$nf][$p];
break;
case 'COLSWIDTH':
if( $_Grupo[$nf][$p] != '' ){
$_COLSWIDTH[$i] = $_Grupo[$nf][$p];
$_DimColumnas = true;
}
break;
case 'COLSCOLOR':
if( $_Grupo[$nf][$p] == '' ){
$_COLSCOLOR[$i] = "class='Celda'";
}else if( $_Grupo[$nf][$p][0] == '#' ){
$_COLSCOLOR[$i] = "bgcolor='{$_Grupo[$nf][$p]}'";
}else{
$_COLSCOLOR[$i] = "class='{$_Grupo[$nf][$p]}'";
}
break;
}
}
}
}
}
}
if( count($_ROWSOP)>0 && $_FORMAT[count($_Form)]=='' ){
$md=0;
for( $n=0; $n<count($_Form); $n++ ){
if( $_ROWSOP[$n]!='' ){
list( ,$d ) = explode(',',$_Form[$n][4]);
if( $d>$md ) $md = ($d*1);
}
}
if( $_ALIGN[count($_Form)] == '' ) $_ALIGN[count($_Form)] = ' id=d';
$_FORMAT[count($_Form)] = "eNumberFormat(#,".$md.")";
if( $_FORMATTOTALS[count($_Form)]=='' ) $_FORMATTOTALS[count($_Form)] = "eNumberFormat(#,".$md.")";
}
if( $_DimColumnas && count($_Form)<>count($_COLSWIDTH) ){
$Dif = count($_Form)-count($_COLSWIDTH);
for( $n=0; $n<$Dif; $n++ ) array_push( $_COLSWIDTH, 0 );
}
if( isset( $_xPDFTH) ){
for( $n=0; $n<count($_xPDFTH); $n++ ){
list( $xCampo, $xTH ) = explode('=',$_xPDFTH[$n]);
$xCampo = trim($xCampo);
$xTH = trim($xTH);
for( $i=0; $i<count($_Form); $i++ ){
if( $xCampo==$_Form[$i][1] ){
$_PDFTH[$i] = $xTH;
break;
}
}
}
}
for( $n=0; $n<count($_Form); $n++ ){
if( !isset($_ALIGN[$n]) ){
if( $_Form[$n][8]=='=' || $_Form[$n][8]=='%' ) $_ALIGN[$n] = ' id=c';
}
if( $_PDFTH[$n]=='=' || !isset($_PDFTH[$n]) ) $_PDFTH[$n] = trim($_Form[$n][0]);
switch( $_Form[$n][2] ){
case '+,': case '-,':
$tmp = explode(',',$_Form[$n][4]);
if( trim($tmp[1])=='' ) $tmp[1]='0';
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=d';
if( $_FORMAT[$n]=='' ) $_FORMAT[$n] = "eNumberFormat(#,".$tmp[1].")";
if( $_COLSOP[$n]!='' && $_FORMATTOTALS[$n]=='' ) $_FORMATTOTALS[$n] = $_FORMAT[$n];
break;
case '+': case '-': case '*':
if( $_Form[$n][3][0]!='S' ){
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=d';
if( $_FORMAT[$n]=='' ) $_FORMAT[$n] = "eNumberFormat(#,0)";
if( $_COLSOP[$n]!='' && $_FORMATTOTALS[$n]=='' ) $_FORMATTOTALS[$n] = $_FORMAT[$n];
}
break;
case 'F4': case 'P4': case 'CP': case 'T': case 'CDI': case 'H':
case 'DC': case 'CCC': case 'NAF': case 'DNI': case 'NIF': case 'CIF': case 'NSS':
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=c';
break;
default:
if( $_Form[$n][3]!='A' && eSubstrCount( $_Form[$n][4], ',' ) > 0 ){
list( $Ancho, $Decimales ) = explode(',',$_Form[$n][4]);
$_Form[$n][4] = ( $_gs_formato_ == 'P' ) ? $Decimales : $Ancho;
}else if( $_Form[$n][3][0]!='S' && ( $_Form[$n][8]=='=' || $_Form[$n][8]=='%' ) ){
if( $_ALIGN[$n]=='' ) $_ALIGN[$n] = ' id=c';
}
}
}
if( isset($_GET['_VISIBLE_ROWS_']) ) $_MaxVisibleRows = $_GET['_VISIBLE_ROWS_'];
if( $_MaxVisibleRows==0 ) $_MaxVisibleRows = $_sMaxVisibleRows;
if( isset($_MaxVisibleRows) ) $_RowsOnPage = $_MaxVisibleRows;
if( !isset($_MaxRowsOnPage) ) $_MaxRowsOnPage = $_RowsOnPage*2;
if( $_SummaryType > -1 ){
$_DBLIMIT = 1000000;
$_RowsOnPage = 1000000;
$_PrimerosReg = 1000000;
$_MaxRowsOnPage = 1000000;
}
if( count($_GRID)>0 ) include($Dir_.'grid_1.inc');
$_WINTITLE = _InVar($_WINTITLE);
eHTML("F:{$OriFichero}", $Opcion, $_TITLE);
echo '<style>';
include(SESS::$_PathCSS."/{$_CSS}.css");
echo '</style>';
if( $_NOSORT ) echo '<style>TH{cursor:var(--cAuto);}</style>'.$__Enter;
if( $_SubModo!='l' || $_JSSELROW!='' ) $_CURSORTYPE = 'cursor:var(--cPointer);';
if( $_HTMHEAD!='' ) _IncludeJsHtml($_HTMHEAD, "HTMHead");
$_SourceScript = $OriFichero;
if( !isset($_PSOURCE) ) $_PSOURCE='';
if( $_MAXREC<>'' ) $_MAXRECFULL = false;
if( $_MAXRECFULL ) $_THCOLSPAN = array();
if( $VieneDeFicha ){
$_DELFILTER = array();
}else{
if( !empty($_DELFILTER) && eSubstrCount( mb_strtoupper($_DELFILTER[0]), '{OP}' ) > 0 ){
$_DELFILTER[0] = mb_substr($_DELFILTER[0],0,mb_strpos($_DELFILTER[0],'{')). 'cR' .mb_substr($_DELFILTER[0],mb_strpos($_DELFILTER[0],'}')+1);
}
}
if( mb_strstr($FicheroD,'.ldf') || isset($_GET['_SEL_']) ){
}else if( !$VieneDeFicha || $_NOSELECTROW ){
$_EnVentana = false;
}else{
$_EnVentana = true;
}
if( isset($_TituloSubVentana) ){
$tmp = str_replace( '"', '\"', EnPlural('',$_TITLE, false) );
if( $tmp[0]=='=' ) $tmp = mb_substr($tmp,1);
$tmp = '';
}
$_sEDITLIST = $_EDITLIST[0];
if( $_EDITLIST[0]!='' && $_EDITLIST[3]=='' ) $_EDITLIST[3] = 0;
if( $_HayROWCOLOR && mb_substr($_ROWCOLOR[0],-1)!=')' ){
$tmp = array();
for( $nf=0; $nf<count($_Form); $nf++ ){
$tmp[] = mb_chr(48+mb_strlen($_Form[$nf][1])).'|'.$_Form[$nf][1].'|'.$nf;
}
sort($tmp);
for( $nf=count($_Form)-1; $nf>=0; $nf-- ){
$tmp2 = explode('|',$tmp[$nf]);
if( eSubstrCount( $_ROWCOLOR[0], $tmp2[1] ) > 0 ){
$_ROWCOLOR[0] = str_replace( $tmp2[1], '$row['.$tmp2[2].']', $_ROWCOLOR[0] );
}
}
}
if( !empty($_PHPHEAD) ){
$tmpFile = GrabaTmp('l_phphead', $_PHPHEAD, $LenDoc, $_FILE_PHPHEAD);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPHEAD);
}
$gsEdition = '';
if( SETUP::$System['WaterMarking']!='' ) $_WaterMarkingCSS = "background-image:url(".SETUP::$System['WaterMarking']."); background-repeat:no-repeat; background-attachment:fixed;";
if( isset($_JSONLOAD) ) $_ONLOAD .= '_JsOnLoad();';
if( $_GET['_FILEPDF']!='' ){
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
@unlink($tmpCursor);
@unlink(str_replace('.cur','.sql',$tmpCursor));
}
if( isset($_GET['_SORTTYPE_']) ) $_SORTTYPE_ = $_GET['_SORTTYPE_'];
if( eSubstrCount( 'PXFA', $_gs_formato_ ) > 0 ){
if( $_DBSQL!='' ){
$LeerCur = 1;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
if( (isset($_REG_) || eSubstrCount ( 'PXA', $_gs_formato_ ) > 0 ) && file_exists( $tmpCursor ) ){
}else{
$LeerCur = 2;
}
}
if( $LeerCur==1 && $_PDFSAVEVAR!='' ){
$_SERIALIZE = unserialize( file_get_contents( '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var" ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
unset($_SERIALIZE);
}
}
if( $_HTMINI!='' ) _IncludeJsHtml($_HTMINI, "HTMIni");
if( $_JSINI!='' ) _IncludeJsHtml($_JSINI, "JSIni");
if( isset($_JSONLOAD) ){
$_JSONLOAD = 'function _JsOnLoad(){'.$__Enter.$_JSONLOAD.'}'.$__Enter;
_IncludeJsHtml($_JSONLOAD, "JSOnload");
}
if( $_PHPINI!='' ){
$tmpFile = GrabaTmp('l_phpini', $_PHPINI, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
if( $_PHPGRID!='' ){
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
if( !empty( $_PHPFORM ) ){
if( !function_exists('ModFormulario') ){
$_PHPFORM = 'function ModFormulario( &$_Form, $Opcion, $Fichero, $nHoja, &$_vF, $_pField ){'.CHR10. $_PHPFORM . '}';
$tmpFile = GrabaTmp( 'l_phpform', $_PHPFORM, $LenDoc, $_FILE_PHPFORM );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPFORM );
}
$DimForm = array();
for( $i=0; $i<count($_Form); $i++ ){
$DimForm[ _QueNmField( $_Form[$i], $i ) ] = $_Form[$i];
}
ModFormulario( $DimForm, $Opcion, $Fichero, 1, $_vF, $_pField );
$_Form = array(); $n = 0;
foreach( $DimForm as $key => $Valor ){
if( count( $DimForm[$key] ) >= 11 || $Valor[0][0]=='{' ) $_Form[$n++] = $Valor;
}
}
$Campos  = '';
$sCampos = '';
$NCampos = count($_Form);
$FormDel = array();
$DimAlias = array();
$_EditListValue = array();
$_EditListSql = array();
$_EditListNCampos = 0;
if( count($_RELATIONFIELDS) > 0 ){
for( $n=0; $n<count($_RELATIONFIELDS); $n++ ){
$tmp = explode(',',$_RELATIONFIELDS[$n]);
for( $i=1; $i<count($tmp); $i++ ){
if( eSubstrCount( ','.$_EDITLIST[0].',', ','.$tmp[$i].',' ) == 1 ){
$_EditListValue[$tmp[$i]] = 'EL';
for( $p=$i-1; $p>0; $p-- ) $_EditListValue[$tmp[$p]] = 'EL';
}
}
}
}
if( $HaySelect ){
$DifCampos = count($_Form);
$CamposAEliminar = array();
for( $n=0; $n<$NCampos; $n++ ){
if( $_ColVirtual[$n] ) continue;
$_Form[$n][_OOFIELD] = $_Form[$n][_FIELD];
if( eSubstrCount('MSSsX.SL.', $_Form[$n][3] ) > 0 ){
if( eSubstrCount( $_Form[$n][1], ':' ) > 0 ){
$tmp = $_Form[$n][1];
$_Form[$n][1] = trim(mb_substr( $_Form[$n][1], 0, mb_strpos($_Form[$n][1],':') ));
array_push( $_Form, $_Form[$n] );
$_Form[$n][1] = $tmp;
$_Field[$tmp] = false;
}else if( eSubstrCount( $_Form[$n][1], '{' ) > 0 ){
$sTmp = $_Form[$n][1];
$tmp = str_replace( '{', ',', $_Form[$n][1] );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$_Form[$n][1] = $tmp[0];
$_Field[$tmp[0]] = false;
array_push( $_Form, $_Form[$n] );
$_Form[$n][1] = $sTmp;
}else{
array_push( $_Form, $_Form[$n] );
$_Field[$_Form[$n][1]] = false;
}
$_Form[$n][2] = 'D';
$c = count($_Form)-1;
$_Form[$c][3] = 'T';
$_Form[$c][6] = '*';
if( eSubstrCount(",{$_DBINDEX},", ','.$_Form[$c][1].',' ) == 0 ){
for( $i=0; $i<$c; $i++ ){
if( $_Form[$i][1] == $_Form[$c][1] ){
if( $_EditListValue[$_Form[count($_Form)-1][1]]!='EL' ){
$New = array();
for( $o=0; $o<count($_Form)-1; $o++ ) $New[] = $_Form[$o];
$_Form = $New; unset($New);
}else{
$_EditListSql[$_Form[count($_Form)-1][1]] = count($_Form)-1;
if( $_EditListValue[$_Form[$c][1]]!='EL' ) $CamposAEliminar[] = $c;
}
break;
}
}
}else{
for( $i=0; $i<$c; $i++ ){
if( $_Form[$i][1] == $_Form[$c][1] && $_Form[$i][3][0] == $_Form[$c][3][0] ){
if( count($_EDITLIST) > 0 ){
$_EditListValue[$_Form[count($_Form)-1][1]] = '';
$_EDITLIST[0] = str_replace( ",{$_Form[count($_Form)-1][1]},", ',', $_EDITLIST[0] );
}
$New = array();
for( $o=0; $o<count($_Form)-1; $o++ ) $New[] = $_Form[$o];
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
for( $i=0; $i<count($sForm); $i++ ) if( !in_array( $i, $CamposAEliminar ) ) $_Form[] = $sForm[$i];
}
$NCampos = count($_Form);
$CodAlias = 65;
$alias = 'A';
if( eSubstrCount( $_DBTABLE, ' ' ) == 0 ){
$DimAlias[$_DBTABLE] = $alias;
$_DBTABLE = $_DBTABLE.' A';
}else{
$tmp = explode(' ',$_DBTABLE);
$DimAlias[$tmp[0]] = $alias;
$_DBTABLE = str_replace( $tmp[0].' ', $tmp[0].' A ',$_DBTABLE );
}
for( $n=0; $n<$NCampos; $n++ ){
if( $_ColVirtual[$n] ) continue;
$_SelectReal[$_Form[$n][1]] = $_Form[$n][1];
$alias = 'A';
if( eSubstrCount('MSSsX.SL.', $_Form[$n][3] ) > 0 ){
$ssCampo = $_Form[$n][1];
$CodAlias++;
$alias = mb_chr($CodAlias);
$_DBTABLE .= ' left join ';
if( eSubstrCount( $_Form[$n][1], ':' ) > 0 ){
$aCampo = '';
if( eSubstrCount( $_Form[$n][1], ' ' ) > 0 ){
$tmp = explode(' ',$_Form[$n][1]);
$oCampo = $tmp[0];
$aCampo = $tmp[count($tmp)-1];
$_Form[$n][1] = $oCampo;
}
$OriCampo = trim(mb_substr( $_Form[$n][1], 0, mb_strpos( $_Form[$n][1], ':') ));
$_Form[$n][1] = trim(mb_substr( $_Form[$n][1], mb_strpos( $_Form[$n][1], ':')+1 ));
if( mb_substr( $_Form[$n][1],0,3 ) == 'cd_' ){
$_pF[$_Form[$n][1]] = $n;
$_DBTABLE .= mb_substr( $_Form[$n][1], 3 ) . " {$alias} on {$alias}.{$_Form[$n][1]}=A.{$OriCampo}";
$DimAlias[mb_substr( $_Form[$n][1], 3 )] = $alias;
if( mb_strtoupper($_Form[$n][3]) == 'SS' ){
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
if( $OriCampo == $xTmp[$p] ) $Anadir = true;
}
break;
}
}
}
$FormDel[] = $OriCampo;
$_Form[$n][1] = 'nm_'.mb_substr( $_Form[$n][1], 3 );
if( $aCampo=='' ){
$_pF['*'.$_Form[$n][1]] = $n;
}else{
$_Form[$n][1] .= ' '.$aCampo;
$_pF[$aCampo] = $n;
$_pF['*'.$aCampo] = $n;
}
}
if( eSubstrCount( $_FILTER, "A.{$OriCampo}" ) == 0 ){
$_FILTER = str_replace( $OriCampo, "A.{$OriCampo}", $_FILTER );
}
}else if( eSubstrCount( $_Form[$n][1], '{' ) > 0 ){
$txt = $_Form[$n][1];
list( $iz,$dr ) = explode('}',$_Form[$n][1]);
if( $dr!='' ) $_Form[$n][1] = $txt = $iz.' '.trim($dr).'}';
$txt = str_replace( '{', ',', $txt );
$txt = str_replace( '}', '', $txt );
$tmp = array();
$ni = 0;
$tmp[$ni] = '';
$Apostrofe = '';
for( $i=0; $i<mb_strlen($txt); $i++ ){
$c = mb_substr($txt,$i,1);
if( $c == '"' || $c == "'" ) $Apostrofe = ( $Apostrofe=='' ) ? mb_substr($txt,$i,1) : '';
if( $c==',' && $Apostrofe=='' ){
$ni++;
$tmp[$ni] = '';
continue;
}
$tmp[$ni] .= $c;
}
for( $i=0; $i<count($tmp); $i++ ) $tmp[$i] = trim($tmp[$i]);
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
$tmp = array_splice( $tmp, 0, 4 );
$OriCampo = $tmp[0];
$_DBTABLE .= $tmp[1];
$_DBTABLE .= " {$alias} on {$alias}.{$tmp[2]}=A.{$OriCampo}";
$DimAlias[$tmp[1]] = $alias;
$FormDel[] = $OriCampo;
$_Form[$n][1] = $tmp[3];
if( isset($tmp[4]) ) $_Form[$n][1] .= ' '.$tmp[4];
if( eSubstrCount($_Form[$n][1],' ')> 0 ){
$tmp2 = explode(' ',$_Form[$n][1]);
$_pF['*'.$tmp2[count($tmp2)-1]] = $n;
}
$alias = '';
}else{
$OriCampo = $tmp[0];
$_DBTABLE .= $tmp[1];
$_DBTABLE .= " {$alias} on {$alias}.{$tmp[2]}=A.{$OriCampo}";
$DimAlias[$tmp[1]] = $alias;
if( mb_strtoupper($_Form[$n][3]) == 'SS' ){
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( eSubstrCount( ','.$_RELATIONFIELDS[$i].',', ','.$tmp[0].',' ) == 1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for( $p=count($xTmp); $p>0; $p-- ){
if( $Anadir ){
for( $x=0; $x<count($_Form); $x++ ){
if( eSubstrCount( $_Form[$x][_OOFIELD], ':' ) > 0 ){
list($oNewCampo) = explode(':',$_Form[$x][_OFIELD]);
$NewCampo = trim(mb_substr( $_Form[$x][_OFIELD], mb_strpos( $_Form[$x][_OFIELD], ':')+1 ));
}else if( eSubstrCount( $_Form[$x][_OOFIELD], '{' ) > 0 ){
$oNewCampo = $_Form[$x][_FIELD];
list(,$NewCampo) = explode(',',$_Form[$x][_OOFIELD]);
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
if( eSubstrCount($_Form[$n][1],' ')> 0 ){
$tmp2 = explode(' ',$_Form[$n][1]);
$_pF['*'.$tmp2[count($tmp2)-1]] = $n;
$_pF[$tmp2[count($tmp2)-1]] = $n;
}else{
$_pF[$_Form[$n][1]] = $n;
}
if( eSubstrCount( $_FILTER, "A.{$OriCampo}" ) == 0 ){
$_FILTER = str_replace( $OriCampo, "A.{$OriCampo}", $_FILTER );
}
}
}else if( eSubstrCount( $_Form[$n][1], ' ' ) > 0 ){
$tmp = explode(' ',$_Form[$n][1]);
$oCampo = $tmp[0];
$aCampo = $tmp[count($tmp)-1];
if( eSubstrCount( $_FILTER, "{$aCampo}" ) == 0 ){
$_FILTER = str_replace( $_Form[$n][1], "{$aCampo}", $_FILTER );
}
$_DBTABLE .= mb_substr( $oCampo, 3 );
$_DBTABLE .= " {$alias} on {$alias}.{$oCampo}=A.{$oCampo}";
$DimAlias[mb_substr($oCampo,4)] = $alias;
if( mb_strtoupper($_Form[$n][3]) == 'SS' ){
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( eSubstrCount( ','.$_RELATIONFIELDS[$i].',', ','.$_Form[$n][1].',' ) == 1 ){
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
}else{
if( eSubstrCount( $_FILTER, "A.{$_Form[$n][1]}" ) == 0 ){
$_FILTER = str_replace( $_Form[$n][1], "A.{$_Form[$n][1]}", $_FILTER );
}
$_DBTABLE .= mb_substr( $_Form[$n][1], 3 );
$_DBTABLE .= " {$alias} on {$alias}.{$_Form[$n][1]}=A.{$_Form[$n][1]}";
$DimAlias[mb_substr( $_Form[$n][1], 4 )] = $alias;
if( mb_strtoupper($_Form[$n][3]) == 'SS' ){
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( eSubstrCount( ','.$_RELATIONFIELDS[$i].',', ','.$_Form[$n][1].',' ) == 1 ){
$xTmp = explode(',',$_RELATIONFIELDS[$i]);
$Anadir = false;
for( $p=count($xTmp); $p>0; $p-- ){
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
}else if( 'SV' == $_Form[$n][3] ){
$_SelectReal[$_Form[$n][1]] = $_Form[$n][1];
$_pF['*'.$_Form[$n][1]] = $n;
}
if( $n > 0 ){
$Campos .= ',';
$sCampos .= ',';
}
switch( $_Form[$n][2] ){
case 'F4':
if( eSubstrCount($_Form[$n][1], ' ')==0 ){
$Campos .= " ".$alias.'.'.$_Form[$n][1];
}else{
$xTmp = explode(' ', $_Form[$n][1]);
$Campos .= " ".$alias.'.'.$xTmp[0]." ".$xTmp[1];
}
break;
default:
if( mb_substr($_Form[$n][1],0,7) == 'extend(' ){
$_Form[$n][1] = str_replace( 'extend(', 'extend('.$alias.'.', $_Form[$n][1] );
$Campos .= $_Form[$n][1];
}else if( mb_substr($_Form[$n][1],0,4) == 'sum(' ){
$_Form[$n][1] = str_replace( 'sum(', 'sum('.$alias.'.', $_Form[$n][1] );
$Campos .= $_Form[$n][1];
}else if( mb_substr($_Form[$n][1],0,7) == 'count(*' ){
$Campos .= $_Form[$n][1];
}else if( mb_substr($_Form[$n][1],0,6) == 'count(' ){
$_Form[$n][1] = str_replace( 'count(', 'count('.$alias.'.', $_Form[$n][1] );
$Campos .= $_Form[$n][1];
}else{
if( $alias!='' ){
if( $_Form[$n][1][0]!='"' && $_Form[$n][1][0]!="'" ){
if( eSubstrCount( $_Form[$n][1], '.' ) == 0 ){
$Campos .= $alias.'.'.$_Form[$n][1];
}else{
$Campos .= $_Form[$n][1];
}
}else{
$Campos .= $_Form[$n][1];
}
}else{
$Campos .= $_Form[$n][1];
}
}
}
if( eSubstrCount( 'MSSsX', $_Form[$n][3] ) == 0 ){
$sCampos .= $_Form[$n][1];
}else{
$sCampos .= '*';
}
}
$DifCampos = count($_Form)-$DifCampos;
if( count($_ROWSOP)> 0 && $DifCampos>0 && count($_GRID)==0 ){
for( $i=count($_Form)-$DifCampos; $i<count($_Form); $i++ ){
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
$_oFILTER = str_replace('#.','A.',$_oFILTER);
$Busca = str_replace('#.','A.',$Busca);
}else{
for( $n=0; $n<$NCampos; $n++ ){
if( $_ColVirtual[$n] ) continue;
if( eSubstrCount( $_Form[$n][1], ':' ) > 0 ){
$_Form[$n][1] = mb_substr( $_Form[$n][1], 0, mb_strpos( $_Form[$n][1], ':') );
}
if( $n>0 ){
$Campos .= ',';
$sCampos .= ',';
}
switch( $_Form[$n][2] ){
case 'F4':
$Campos .= $_Form[$n][1];
break;
default:
$Campos .= $_Form[$n][1];
}
$sCampos .= $_Form[$n][1];
}
$_DBADDFILTER = str_replace('#.','',$_DBADDFILTER);
$_FILTER = str_replace('#.','',$_FILTER);
$_oFILTER = str_replace('#.','',$_oFILTER);
$Busca = str_replace('#.','',$Busca);
}
if( isset($_ALIGNCALC) ){
for( $n=0; $n<count($_ALIGNCALC); $n++ ){
$tmp = explode('=',eNsp($_ALIGNCALC[$n]));
if( eSubstrCount( $_ALIGN[ $_pF[$tmp[0]] ],' id=' )==0 ) $_ALIGN[ $_pF[$tmp[0]] ] = ' id='.eStrtr( mb_strtolower($tmp[1]), 'lrh', 'ido' );
}
}
if( isset($_FORMATCALC) ){
for( $n=0; $n<count($_FORMATCALC); $n++ ){
$tmp = explode( '=', $_FORMATCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_FORMAT[$p] = _CalcFormato( $tmp[1], $p );
}
}
if( isset($_COLSOPCALC) ){
for( $n=0; $n<count($_COLSOPCALC); $n++ ){
$tmp = explode( '=', $_COLSOPCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_COLSOP[ $p ] = mb_strtoupper($tmp[1]);
$_OpCol[$p] = 0;
if( $_COLSOP[$p]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$p] = $_COLSOP[$p];
if( eSubstrCount( '+C#', $_COLSOP[$p] ) > 0 ) $_InfSinTotales = false;
switch( $_Form[$p][2] ){
case '+,': case '-,':
$tmp = explode(',',$_Form[$p][4]);
if( trim($tmp[1])=='' ) $tmp[1] = '0';
if( $_ALIGN[$p]=='' ) $_ALIGN[$p] = ' id=d';
if( $_FORMAT[$p]=='' ) $_FORMAT[$p] = "eNumberFormat(#,".$tmp[1].")";
if( $_COLSOP[$p]!='' && $_FORMATTOTALS[$p]=='' ) $_FORMATTOTALS[$p] = $_FORMAT[$p];
break;
case '+': case '-':
if( $_Form[$p][3][0]!='S' ){
if( $_ALIGN[$p]=='' ) $_ALIGN[$p] = ' id=d';
if( $_FORMAT[$p]=='' ) $_FORMAT[$p] = "eNumberFormat(#,0)";
if( $_COLSOP[$p]!='' && $_FORMATTOTALS[$p]=='' ) $_FORMATTOTALS[$p] = $_FORMAT[$p];
}
break;
}
}
}
if( isset($_COLSWIDTHCALC) ){
for( $n=0; $n<count($_COLSWIDTHCALC); $n++ ){
$tmp = explode( '=', $_COLSWIDTHCALC[$n] );
$p = $_pF[trim($tmp[0])];
$_COLSWIDTH[ $p ] = $tmp[1];
}
}
if( isset($_ROWSOPCALC) ){
$tmp = str_replace('+',',+',eNsp('+'.$_ROWSOPCALC[0]));
$tmp = str_replace('-',',-',$tmp);
$tmp = str_replace('*',',*',$tmp);
$tmp = explode( ',', $tmp );
for( $n=0; $n<count($_Form); $n++ ) $_ROWSOP[$n] = '';
for( $n=0; $n<count($tmp); $n++ ){
$o = mb_substr($tmp[$n],0,1);
if( $o<>'' ){
$c = mb_substr($tmp[$n],1);
$_ROWSOP[ $_pF[trim($c)] ] = $o;
}
}
$_ROWSOP[count($_Form)] = trim($_ROWSOPCALC[1]);
}
if( isset($_COLSCOLORCALC) ){
for( $n=0; $n<count($_COLSCOLORCALC); $n++ ){
$tmp = explode( '=', $_COLSCOLORCALC[$n] );
$p = $_pF[trim($tmp[0])];
if( $tmp[1][0] == '#' ){
$_COLSCOLOR[$p] = "bgcolor='{$tmp[1]}'";
}else{
$_COLSCOLOR[$p] = "class='{$tmp[1]}'";
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
if( $_JSONCLICKCOL!='' ){
$tmp = explode(',',$_JSONCLICKCOL);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]==(string)($tmp[$n]*1) ){
$_COLSCOLOR[$tmp[$n]] = 'class=JSOnClickRow';
}else{
$_COLSCOLOR[$_pF[$tmp[$n]]] = 'class=JSOnClickRow';
}
}
}
if( isset($_TIPTHCALC) ){
for( $n=0; $n<count($_TIPTHCALC); $n++ ){
$tmp = explode( '=', $_TIPTHCALC[$n] );
$_TIPTH[ $_pF[trim($tmp[0])] ] = trim($tmp[1]);
}
}
if( $_ConSelectVirtual ){
$_DBORDER = str_replace('  ',' ', $_DBORDER );
$_DBORDER = str_replace(', ',',', $_DBORDER );
$_DBORDER = str_replace(' ,',',', $_DBORDER );
$_DBORDER = ','.$_DBORDER.',';
$NuevosCampos = 0;
for( $n=0; $n<$NCampos; $n++ ){
if( $_Form[$n][3] == 'SV' ){
if( eSubstrCount(",{$_DBINDEX},", ",{$_Form[$n][1]}," ) == 1 ){
$Campos = str_replace($_Form[$n][1], $_Form[$n][1].' field'.$n, $Campos );
$Campos .= ','.$_Form[$n][1];
$_Form[] = array('', $_Form[$n][1], '0', 'T', '3', '', '*','','','' );
$NuevosCampos++;
if( eSubstrCount($_DBORDER, ",{$_Form[$n][1]}," ) == 1 ){
$_DBORDER = str_replace(",{$_Form[$n][1]},", ",{$_Form[$n][1]} field{$n},", $_DBORDER );
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
$_DBORDER = mb_substr($_DBORDER,1,-1);
$NCampos += $NuevosCampos;
}
if( $_FORMATPHP!='' || $_FORMATTOTALSPHP!='' ){
if( $_FORMATPHP!='' ) $_FORMATPHP = 'function _ExeFormato( &$_vF, &$_CellsStyle, &$_CellsClass, $RowNumber, &$_RowStyle, &$_RowClass ){'.CHR10. $_FORMATPHP . '}';
if( $_FORMATTOTALSPHP!='' ) $_FORMATTOTALSPHP = 'function _ExeFormatoTotal( &$_vF, $NumberGroup, $NameGroup, &$_OpSubCol ){'.CHR10. $_FORMATTOTALSPHP . '}';
$tmpFile = GrabaTmp('l_formatphp', $_FORMATPHP."\n".$_FORMATTOTALSPHP, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_FORMATPHP = '#';
}
if( mb_strlen($_ORDEN_) > 0 ){
$_ORDEN_ = trim($_ORDEN_);
$_ORDEN_ = str_replace('+',',',$_ORDEN_);
if( $_ORDEN_[0] == '*' && eSubstrCount( $_ORDEN_, ' ' ) == 1 ){
$tmp = explode( ' ', $_ORDEN_ );
$_ORDEN_ = trim($tmp[1]);
}
if( $_Form[$_ORDEN_-1][2]=='F4' ){
$Ord = $_Form[$_ORDEN_-1][1];
if( $_SORTTYPE_==1 ) $Ord .= ' desc';
$_DBORDERBAK = $Ord;
}
$_DBORDER = $_ORDEN_;
if( $_SORTTYPE_==1 ) $_DBORDER .= ' desc';
$_GET['_ORDEN_'] = $_ORDEN_;
}
for( $nf=0; $nf<count($_Form); $nf++ ){
if( eSubstrCount( $_ADDOPTION[ $_Form[$nf][1] ], '()' ) == 1 ){
@eval( '$tmp = '.$_ADDOPTION[ $_Form[$nf][1] ] );
if( count($tmp[0]) >= 2 ){
for( $i=0; $i<count($tmp); $i++ ) $_SelVirtual[$_Form[$nf][1]][$tmp[$i][0]] = trim($tmp[$i][1]);
}else{
foreach( $tmp as $k=>$v ) $_SelVirtual[$_Form[$nf][1]][$k] = trim($v);
}
}
}
if( $_POST['_gs_formato_']!='' || $_GET['_gs_formato_']!='' ){
if( $_POST['_gs_formato_']=='P' || $_GET['_gs_formato_']=='P' ) $_DBLIMIT = max($_DBLIMIT, $_PDFLIMIT);
if( $_POST['_gs_formato_']=='X' || $_GET['_gs_formato_']=='X' ) $_DBLIMIT = max($_DBLIMIT, $_XLSLIMIT);
}
if( $_DBGROUPBY!='' ) $_DBGROUPBY = ' group by '.$_DBGROUPBY;
if( eSubstrCount($_DBADDFILTER, '{')>0 && eSubstrCount($_DBADDFILTER, '}')>0 ){
$_DBADDFILTER = eval('return "'.$_DBADDFILTER.'";');
}else if( (eSubstrCount($_DBADDFILTER, '()')==1 || eSubstrCount($_DBADDFILTER, '( )')==1) && eSubstrCount($_DBADDFILTER, 'now()')==0 ){
$_DBADDFILTER = eval('return '.$_DBADDFILTER.';');
}
$LeerCur = 0;
if( $_GET['_LISTEMPTY']==1 ){
}else if( isset($_SQLExecute) ){
if( $_DEBUG==100 ){ eInit(); die('_SQLExecute'); }
if( !isset($_CountExecute) ){
$_SQLExecute = str_replace(CHR10,' ',str_replace(CHR13,' ',str_replace(mb_chr(9),' ',$_SQLExecute)));
$tmp = ' '.$_SQLExecute;
$Clave = explode(',','select,from,where,group by,order by');
$VClave = array();
for( $n=count($Clave)-1; $n>=0; $n-- ){
if( eSubstrCount( $tmp, $Clave[$n] ) > 0 ) list( $tmp, $VClave[$n] ) = explode(" {$Clave[$n]} ", $tmp );
}
$xSelect = $VClave[0];
$xFrom = $VClave[1];
$xWhere = $VClave[2];
$xGroupBy = $VClave[3];
$xOrder = $VClave[4];
if( $xGroupBy!='' ){
qQuery("select count(*) from ( {$_SQLExecute} ) SoloContar");
list( $_TReg ) = qRow();
}else{
$_TReg = qCount( $xFrom, $xWhere );
}
}else{
qQuery( $_CountExecute );
list( $_TReg ) = qRow();
}
if( $_TReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|'.$_TReg, 'HS', $ExeSg, $ExeJS, 'LE' );
}
$TotalReg = $_TReg;
qQuery( $_SQLExecute );
$_TReg = $TotalReg;
$_FILTER = $xWhere;
}else if( $_DBSQL!='' ){
if( $_DEBUG==100 ){ eInit(); die('_DBSQL'); }
$LeerCur = 1;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.cur";
if( (isset($_REG_) || eSubstrCount( 'PXA', $_gs_formato_ ) > 0 ) && file_exists( $tmpCursor ) ){
$usuCursor = unserialize( file_get_contents($tmpCursor) );
if( isset($_GET['_ORDEN_']) ){
if( is_numeric($_GET['_ORDEN_']) ){
_QSortMultiArray( $usuCursor, ($_GET['_ORDEN_']-1), (($_SORTTYPE_==0)?'ASC':'DESC'), $_Form[($_GET['_ORDEN_']-1)][2] );
}else{
if( !isset($_GET['_SORTTYPE_']) ) $_SORTTYPE_ = 0;
for( $n=0; $n<count($_Form); $n++ ){
if( $_Form[$n][1]==$_GET['_ORDEN_'] ){
_QSortMultiArray( $usuCursor, $n, (($_SORTTYPE_==0)?'ASC':'DESC'), $_Form[$n][2] );
break;
}
}
}
}
}else{
$LeerCur = 2;
$tmpSQL = GrabaTmp('l_dbsql', '$usuCursor=array();'."\n".$_DBSQL, $LenDoc );
include( $tmpSQL );
_ShowError( $php_errormsg, $tmpSQL, $LenDoc );
unset( $_DBSQL );
}
if( isset($usuCursor) ){
$TotalReg = count($usuCursor);
}else{
if( !isset($_TReg) ){
$usuCursor = array();
while( $row = qRow() ) array_push( $usuCursor, $row );
$_TReg = count($usuCursor);
}
$TotalReg = $_TReg;
}
if( $TotalReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|'.$TotalReg, 'HS', $ExeSg, $ExeJS, 'LE' );
}else if( $TotalReg == 0 && !$EmptyList ){
eMessageBG( '~NR', 'HS', $ExeSg, $ExeJS, 'NR' );
}
if( !isset($usuCursor) && !isset($_REG_) ){
$usuCursor = array();
while( $row = qRow() ) array_push( $usuCursor, $row );
$_TReg = count($usuCursor);
$TotalReg = $_TReg;
}
if( $LeerCur==2 && !isset($_REG_) && isset($usuCursor) ){
if( $ConPaginacion && count($_EDITLIST)>0 ) eMessageBG('La paginación con "usuCursor" y [EditList] son incompatibles','HSE');
file_put_contents( $tmpCursor, serialize($usuCursor) );
file_put_contents( str_replace('.cur','.sql',$tmpCursor), serialize(array( '_SQL_'=>$_SQL_ )) );
if( $_PDFSAVEVAR<>'' && eSubstrCount($_PDFSAVEVAR,'_PDFLABELHIDDEN')==0 ){
$_PDFSAVEVAR .= ',_PDFLABELHIDDEN';
}
if( $_PDFSAVEVAR != '' ){
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
if( $TotalReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|'.$TotalReg, 'HS', $ExeSg, $ExeJS, 'LE' );
}else if( $TotalReg == 0 && !$EmptyList ){
eMessageBG( '~NR', 'HS', $ExeSg, $ExeJS, 'NR' );
}
}else{
if( $_DEBUG==100 ){ eInit(); die('Cursor Normal'); }
if( $VieneDeFicha ){
if( $_FILTER != '' && eSubstrCount( $Busca, $_FILTER ) == 0 ){
$Busca = $_FILTER;
}
if( $_DBADDFILTER != '' && eSubstrCount( $Busca, $_DBADDFILTER ) == 0 ){
if( $Busca != '' ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
}
}else{
$Busca = '';
GetCondicion( '', $Busca, false );
if( $_DBADDFILTER != '' && eSubstrCount( $Busca, $_DBADDFILTER ) == 0 && eSubstrCount( $Busca, $xDBADDFILTER ) == 0 ){
if( $Busca != '' ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
}
}
if( $_DBGROUPBY!='' ){
$_DBGROUPBY = str_replace('  ',' ',trim($_DBGROUPBY));
$txt = mb_substr($_DBGROUPBY,9);
$txt = OrdenConAlias( $txt, $HaySelect, $Campos, $FormDel );
$_DBGROUPBY = ' group by '.$txt;
}
if( count($_DBTABLERELATION)==0 ){
if( count($_DCT)>0 ){
$_DBTABLE .= ", {$_ENV['eDesDictionary']}gs_dct zz ";
$Campos .= ',zz.dct_serial, count(*) _count';
}
if( $HaySelect ) $Busca = BuscaConAlias( $Busca, $Campos );
$_DBORDER = OrdenConAlias( $_DBORDER, $HaySelect, $Campos, $FormDel );
if( count($_DCT)>0 ){
$_DBORDER = '_count desc group by 1';
for( $n=2; $n<=count($_Form); $n++ ) $_DBORDER .= ','.$n;
$_DBORDER .= ',zz.dct_serial';
$_DBORDER .= ' group by zz.dct_serial';
}
}else{
if( $_gs_formato_ == 'P' || $_gs_formato_ == 'X' || $_gs_formato_ == 'A' || isset($_REG_) ){
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
$_SERIALIZE = unserialize( file_get_contents( $tmpCursor ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
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
foreach( $DimAlias as $key => $valor ){
$Busca = str_replace( ' '.$key.'.', ' '.$valor.'.', $Busca );
$Busca = str_replace( '='.$key.'.', '='.$valor.'.', $Busca );
}
$_DBTABLE = ' '.$_DBTABLE;
if( eSqlType('mysql,mysqli') ){
foreach( $DimAlias as $key => $valor ){
$_DBTABLE = str_replace( ' '.$key.'.', ' '.$valor.'.', $_DBTABLE );
$_DBTABLE = str_replace( '='.$key.'.', '='.$valor.'.', $_DBTABLE );
}
}
$Campos = ','.$Campos;
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
$tmp = explode(',',eNsp($_DBTABLERELATION[$e][1]));
for( $n=0; $n<count($tmp); $n++ ){
$Campos = str_replace( ',A.'.$tmp[$n], ','.$DimAlias[$_DBTABLERELATION[$e][0]].'.'.$tmp[$n], $Campos );
}
foreach( $DimAlias as $key => $valor ){
for( $n=0; $n<count($tmp); $n++ ){
$Campos = str_replace( ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n], ','.$valor.'.'.$tmp[$n], $Campos );
}
}
}
$Campos = mb_substr($Campos,1);
$_DBORDER = ','.$_DBORDER.',';
for( $n=0; $n<count($_Form); $n++ ){
$_DBORDER = str_replace( ','.$_Form[$n][1].',', ',A.'.$_Form[$n][1].',', $_DBORDER );
}
$tmp = explode(',',$_DBORDER);
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace( ','.$tmp[$n].',', ',A.'.$tmp[$n].',', $_DBORDER );
}
$_DBORDER = mb_substr($_DBORDER,1,-1);
foreach( $DimAlias as $key => $valor ) $_DBTABLE = str_replace( ' '.$valor.' '.$valor, ' '.$valor, $_DBTABLE );
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
file_put_contents( $tmpCursor, serialize(array(
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
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
$Busca  = str_replace( ' '.$tmp[$n].'="'			  , ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].'="'				, $Busca  );
$Busca  = str_replace( ' '.$tmp[$n].' like '		  , ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].' like '		, $Busca  );
$Campos = str_replace( ','.$tmp[$n].','			  , ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].','				, $Campos );
}
}
for( $n=0; $n<count($_Form); $n++ ){
$Busca = str_replace( ' '.$_Form[$n][1].'="'				 , ' '.$_DBTABLE.'.'.$_Form[$n][1].'="'			 , $Busca );
$Busca = str_replace( ' '.$_Form[$n][1].' like '		 , ' '.$_DBTABLE.'.'.$_Form[$n][1].' like '		 , $Busca );
$Campos = str_replace( ','.$_Form[$n][1].','				 , ','.$_DBTABLE.'.'.$_Form[$n][1].','				 , $Campos );
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
for( $n=0; $n<count($_Form); $n++ ){
$_DBORDER = str_replace( ','.$_Form[$n][1].',', ','.$_DBTABLE.'.'.$_Form[$n][1].',', $_DBORDER );
}
$tmp = explode(',',$_DBORDER);
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace( ','.$tmp[$n].',', ','.$_DBTABLE.'.'.$tmp[$n].',', $_DBORDER );
}
$_DBORDER = mb_substr($_DBORDER,1,-1);
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
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
file_put_contents( $tmpCursor, serialize(array(
'_DBTABLE'=>$_DBTABLE,
'Campos'=>$Campos,
'Busca'=>$Busca,
'_DBORDER'=>$_DBORDER
)) );
}
}
}
if( isset($_GET['_ORDEN_']) && $_GET['_ORDEN_']!='' ) $_DBORDER = $_GET['_ORDEN_'];
if( isset($_GET['_SORTTYPE_']) && $_GET['_SORTTYPE_']=='1' ) $_DBORDER .= ' desc';
if( isset($_DBORDERBAK) ) $_DBORDER = $_DBORDERBAK;
if( $_DBSQLFUNCTION != '' ) eval($_DBSQLFUNCTION.';');
if( eSubstrCount( $Busca, 'zz.dct_work like "' ) > 0 || eSubstrCount( $Busca, 'zz.dct_work="' ) > 0 ){
if( eSubstrCount( $_DBTABLE, ", {$_ENV['eDesDictionary']}gs_dct zz " ) == 0 ) $_DBTABLE .= ", {$_ENV['eDesDictionary']}gs_dct zz ";
$_DBORDER .= ' group by 1';
for( $n=2; $n<=count($_Form); $n++ ) $_DBORDER .= ','.$n;
}
if( eSubstrCount(mb_strtoupper($_DBORDER),' LIMIT ')==1 ){
list( $_TReg, $Salta ) = explode(',',mb_substr($_DBORDER,mb_strpos(mb_strtoupper($_DBORDER),' LIMIT ')+7));
if( $Salta!='' ) $_TReg += $Salta;
}else{
if( $_DBGROUPBY=='' ){
if( eSubstrCount( mb_strtoupper($Busca), ' GROUP BY ' )==0 ){
$_TReg = qCount( $_DBTABLE, _qBuscar($Busca,$_DBTABLE) );
}else{
$_TReg = -1;
}
}else{
$_TReg = 1;
}
}
$_DBADDFILTER = $Busca;
$_FILTER = $Busca;
if( $_TReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|'.$_TReg, 'HS', $ExeSg, $ExeJS, 'LE' );
}else if( $_TReg == 0 && !$EmptyList ){
eMessageBG( '~NR', 'HS', $ExeSg, $ExeJS, 'NR' );
}
$TotalReg = $_TReg;
if( $_DBADDFILTER=='' ){
$PDF_SQL = "select {$Campos} from {$_DBTABLE}";
}else{
$PDF_SQL = "select {$Campos} from {$_DBTABLE} where {$_DBADDFILTER}";
}
$sOrder = $_DBORDER;
if( $sOrder!='' ){
$tmp = trim(str_replace(' DESC','',mb_strtoupper($sOrder)));
if( mb_strlen($tmp)==1 && $tmp*1 > 0 && isset($_GET['_ORDEN_']) ){
if( $_Form[$tmp-1][2]=='F4' ){
$Dim = _DivideCampos( $PDF_SQL );
$Campo = _ExtraeCampo( $Dim[$tmp-1] );
$sOrder = $Campo;
}
}
$PDF_SQL .= " order by {$sOrder}";
if( mb_substr(mb_strtoupper($sOrder),-4)=='DESC' ) $PDF_SQL .= ' desc';
}
if( eSqlType('informix') && eSubstrCount(mb_strtoupper($sOrder),' LIMIT ')==1 ){
$sOrder = mb_substr($sOrder,0,mb_strpos(mb_strtoupper($sOrder),' LIMIT '));
qSelect( $_DBTABLE, 'FIRST '.($_TReg+$Salta).' '.$Campos, _qBuscar($_DBADDFILTER,$_DBTABLE), $sOrder.$_DBGROUPBY );
}else{
qSelect( $_DBTABLE, $Campos, _qBuscar($_DBADDFILTER,$_DBTABLE), $sOrder.$_DBGROUPBY );
}
$_TReg = $TotalReg;
if( $_TReg==-1 ){
$usuCursor = array();
while( $row = qRow() ) $usuCursor[] = $row;
$TotalReg = count($usuCursor);
$_TReg = $TotalReg;
}elseif( isset($_GRAPH) && !isset($usuCursor) ){
$usuCursor = array();
while( $row = qRow() ) $usuCursor[] = $row;
$TotalReg = count($usuCursor);
$_TReg = $TotalReg;
}
if( count($_LISTCOMPARE) > 0 ) include( $Dir_.'listcompare.inc' );
if( count($_GRID)>0 ) include( $Dir_.'grid_2.inc' );
}
if( $_MaxRecFull>=$_TReg && count($_THCOLSPAN)==0 ){
$_MAXRECFULL = true;
echo '<script type="text/javascript">_MAXRECFULL = true;</script>';
}
if( $_DBEND != '' ){
$tmpFile = GrabaTmp( 'l_dbend', $_DBEND, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
$_DBEND = '';
}
if( $LeerCur == 0 && $_DBSQL=='' && $_PDFSAVEVAR != '' ){
$_SERIALIZE = array();
$tmp = explode(',',$_PDFSAVEVAR);
for( $n=0; $n<count($tmp); $n++ ) $_SERIALIZE[$tmp[$n]] = ${$tmp[$n]};
file_put_contents( str_replace('.cur','.var',$tmpCursor), serialize($_SERIALIZE) );
unset($_SERIALIZE);
}else if( $_PDFSAVEVAR != '' || $_gs_formato_=='P' ){
$_SERIALIZE = unserialize( file_get_contents( '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var" ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
unset($_SERIALIZE);
}
if( $TotalReg <= $_MaxRowsOnPage ){
$_RowsOnPage = $_MaxRowsOnPage;
}else{
$_SORTLIST = '';
}
if( count($_CHART) > 0 ){
for( $n=0; $n<count($_DefChartSWF); $n++ ){
if( $_DefChartSWF[$n][5] < 0 ){
$_DefChartSWF[$n][5] *= -1;
if( $TotalReg > $_DefChartSWF[$n][5] ){
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
$sSeek = '';
$_DBINDEX = str_replace( ' ', '', $_DBINDEX );
$DimIndice = explode( ',', $_DBINDEX );
for( $n=0; $n<count($_Form); $n++ ){
for( $i=0; $i<count($DimIndice); $i++ ){
if( $DimIndice[$i] == $_Form[$n][1] ){
if( !empty($sSeek) ) $sSeek .= ',';
$sSeek .= $DimIndice[$i] .':'. $n;
break;
}
}
}
if( !isset($usuCursor) && ( $_TGrupos > 0 || $_TantoPorCiento ) ){
$_TReg = 0;
$usuCursor = array();
while( $row = qRow() ){
$usuCursor[] = $row;
if( ++$_TReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|', 'HS', $ExeSg, $ExeJS, 'LE' );
}
}
for( $n=0; $n<count($_Form); $n++ ){
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
for( $i=0; $i<count($usuCursor); $i++ ){
$usuCursor[$i][$n] = $_SelVirtual[$_Form[$n][1]][ $usuCursor[$i][$n] ];
}
$_Form[$n][1] = 'sv';
}
}
if( $_TantoPorCiento ){
for( $n=0; $n<count($_COLSOP); $n++ ){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for( $l=0; $l<count($usuCursor); $l++ ) $total += $usuCursor[$l][$n];
for( $l=0; $l<count($usuCursor); $l++ ) $usuCursor[$l][$n] = ($usuCursor[$l][$n]*100)/$total;
}
}
}
}else if( isset($usuCursor) && $_TantoPorCiento ){
for( $n=0; $n<count($_COLSOP); $n++ ){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for( $l=0; $l<count($usuCursor); $l++ ) $total += $usuCursor[$l][$n];
for( $l=0; $l<count($usuCursor); $l++ ) $usuCursor[$l][$n] = ($usuCursor[$l][$n]*100)/$total;
}
}
}
if( $_DBGROUPBY!='' && !isset($usuCursor) ){
$_TReg = 0;
$usuCursor = array();
while( $row = qRow() ){
$usuCursor[] = $row;
if( ++$_TReg > $_DBLIMIT && !$_LimitOn ){
eMessageBG( '~LE|', 'HS', $ExeSg, $ExeJS, 'LE' );
}
}
}
$THColPuntero = array();
$THCol = array();
if( count($_THCOLSPAN)>0 ) _CalcTHColSpan( $_THCOLSPAN, $THColPuntero, $THCol, $_Form, $NCampos );
function _CalcTHColSpan( &$_THCOLSPAN, &$THColPuntero, &$THCol, $_Form, $NCampos ){
for( $n=0; $n<$NCampos; $n++ ) $THCol[$n] = array('',0,3);
for( $n=0; $n<count($_THCOLSPAN); $n++ ){
$tmp = explode(',',$_THCOLSPAN[$n]);
for( $i=3; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
$tmp[2] .= ','.$tmp[$i];
}
for( $i=0; $i<3; $i++ ) $tmp[$i] = trim($tmp[$i]);
for( $i=0; $i<$NCampos; $i++ ){
$xTmp = explode(' ',$_Form[$i][1]);
$iz = trim($xTmp[0]);
$de = trim($xTmp[count($xTmp)-1]);
if( $_Form[$i][1] == $tmp[0] || ( mb_strtoupper($_Form[$i][3][0]) == 'S' && ($_Form[$i][1] == 'nm_'.mb_substr($tmp[0],4) || $_Form[$i][1] == 'nm_'.mb_substr($tmp[0],3)) ) || $de == $tmp[0] ){
$THCol[$i][0] = $tmp[2];
$THCol[$i][1] = 1;
$THCol[$i][2] = 2;
for( $p=$i+1; $p<$NCampos; $p++ ){
$THCol[$i][1]++;
$THCol[$p][1] = 1;
$THCol[$p][2] = 0;
$xTmp = explode(' ',$_Form[$p][1]);
$iz = trim($xTmp[0]);
$de = trim($xTmp[count($xTmp)-1]);
if( $_Form[$p][1] == $tmp[1] || ( mb_strtoupper($_Form[$p][3][0]) == 'S' && ($_Form[$p][1] == 'nm_'.mb_substr($tmp[1],4) || $_Form[$p][1] == 'nm_'.mb_substr($tmp[1],3)) ) || $de == $tmp[1] ){
break;
}
}
break;
}
}
}
}
$_TITLE = eStrtr( $_TITLE, "áéíóúÁÉÍÓÚñãõ", "AEIOUAEIOUÑAO");
$_TITLE = eStrtr( $_TITLE, "äëÿöüÄËÏÖ"  , "AEIOÜAEIO"  );
$_TITLE = eStrtr( $_TITLE, "àèìòùÀÈÌÒÙ" , "AEIOUAEIOU" );
$_TITLE = eStrtr( $_TITLE, "âêîôûÂÊÎÔÛ" , "AEIOUAEIOU" );
if( eSubstrCount( 'PXFA', $_gs_formato_ ) > 0 ){
if( eSubstrCount( eNsp($_TITLE), '()' )==1 ){
$n = mb_strlen(ob_get_contents());
call_user_func( trim(mb_substr($_TITLE,0,mb_strpos($_TITLE,'('))), $Opcion );
$_TITLE = mb_substr( ob_get_contents(), $n );
}
if( $LeerCur==1 && $_PDFSAVEVAR!='' ){
$_SERIALIZE = unserialize( file_get_contents( '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.var" ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
unset($_SERIALIZE);
}
}
if( isset($_DBGATEWAY) && $_DBGATEWAY!='' ){
eInit();
include( eScript($_DBGATEWAY) );
eEnd();
}
if( count($_COLSOP)>0 ){
foreach($_FORMAT as $k=>$v) if( $_FORMATTOTALS[$k]=='' ) $_FORMATTOTALS[$k] = $_FORMAT[$k];
}
if( count($_ROWSOP)>0 && $_FORMAT[count($_ROWSOP)-1]=='' ){
$p = -1; $nf = -1; $uk = -1;
foreach( $_ROWSOP as $k=>$v ){
if( $k>$uk ) $uk = $k;
if( $v!='' && eSubstrCount($_FORMAT[$k],'eNumberFormat')>0 ){
list($dec) = explode(',',$v);
$dec *= 1;
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
if( $_gs_formato_!='' || $PDF_Formato=='F' ) $_TITLETOEXTRACT = str_replace( '&#47;','/', EnPlural( $_TITLETOEXTRACT, '', true ) );
if( $PDF_Formato == 'F' ){
eInit();
if( $_PDFPHP != '' ){
error_reporting(_ERROR_REPORTING); include( '../d/'.$_PDFPHP ); error_reporting(5);
}
include_once( $Dir_.'pdf_ficha.gs' );
eEnd();
}
if( $_gs_formato_ == 'P' ){
eInit();
$FicheroPDF = '../_datos/config/pdf.ini';
@include( $FicheroPDF );
if( !isset($PDF_Lib) ) $PDF_Lib = 'pdf_lista.gs';
include_once( $Dir_.$PDF_Lib );
eEnd();
}
if( $_gs_formato_ == 'M' || (isset($_XMLASXLS) && $_XMLASXLS==true && $_gs_formato_=='X' ) ){
eInit();
include_once( $Dir_.'xml_lista.gs' );
eEnd();
}
if( $_gs_formato_ == 'X' ){
eInit();
include_once( $Dir_.'xls_lista.gs' );
eEnd();
}
if( $_gs_formato_ == 'A' ){
eInit();
include_once( $Dir_.'mdb_lista.gs' );
eEnd();
}
if( $_gs_formato_ == 'L' ){
eInit();
include_once( $Dir_.'pdf_label.gs' );
eEnd();
}
if( $_gs_formato_ == 'T' ){
eInit();
include_once( $Dir_.'txt_lista.gs' );
eEnd();
}
if( $_gs_formato_ == 'V' ){
eInit();
include_once( $Dir_.'csv_lista.gs' );
eEnd();
}
for( $n=0; $n<count($_Form); $n++ ) if( $_Form[$n][1] == 'sv' ) $_Form[$n][1] = 'SV';
if( !(mb_strpos($_SEL_,',')>0 && mb_strpos($_SEL_,'(') > mb_strpos($_SEL_,',')) && eSubstrCount( $_SEL_, '(' ) > 0 ){
list( $Form, $NomFunc ) = explode( ';', $_SEL_ );
}else{
}
if( $_TEMPLATE != '' ) include( $Dir_.'template.inc' );
if( $_SUBLISTADO_==1 ){
}else if( eSubstrCount( eNsp($_TITLE), '()' )==1 ){
$n = mb_strlen(ob_get_contents());
call_user_func( trim(mb_substr($_TITLE,0,mb_strpos($_TITLE,'('))), $Opcion );
$_TITLE = mb_substr( ob_get_contents(), $n );
}else{
$_TITLE = str_replace(CHR13.CHR10,'<BR>',$_TITLE);
if( !$VieneDeFicha || $_NOSELECTROW ){
$_TITLE = EnPlural( $_TITLE, $__Lng[6], true, $_oTITLE );
}else{
if( mb_substr($_sDBTABLE,-4)!='_dlt' ){
switch( $_SubModo ){
case 'ml':
$_TITLE = EnPlural( $_TITLE, $__Lng[7], false, $_oTITLE );
break;
case 'cl':
$_TITLE = EnPlural( $_TITLE, $__Lng[8], false, $_oTITLE );
break;
case 'bl':
$_TITLE = EnPlural( $_TITLE, $__Lng[9], false, $_oTITLE );
break;
}
}else{
$_TITLE = EnPlural( $_TITLE, $__Lng[10], false, $_oTITLE );
}
}
if( SETUP::$System['WinNoTitle'] && $_PSOURCE!='WWORK' && $_PSOURCE!='' ) $_WINCAPTION = '#';
if( $_WINCAPTION=='#' ){
$_WINCAPTION = $_TITLE;
$_TITLE = '';
$_NOTITLE = true;
}
if( $_TITLE!='' ){
echo '<center><TABLE class=TITULO id=GROUPTITLE border=0 cellspacing=0 cellpadding=0 style="background:transparent"'.(($_NOTITLE)?' style="display:none"':'').'>';
$tmp = explode('<BR>',$_TITLE);
for( $l=0; $l<count($tmp); $l++ ){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr><td id=TITULO align=center nowrap style='cursor:var(--cAuto);background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo "</TABLE></center>";
}
}
echo '<center><div id=CONTENEDOR style="height:1;">';
if( $_NOTITLE==false ){
if( $_TITLE2!='' ){
echo '<span class=Titulo2 id=Titulo2 style="white-space:nowrap;text-align:left;width:100%;">'.$_TITLE2.'</span>';
}
}
PintaCondiciones( $_DBADDFILTER );
if( isset($_VerUserCondiciones) ) eShowFilter( call_user_func( trim($_VerUserCondiciones) ) );
$OrdCampo = array();
$tmp = explode( ',', $_DBORDER );
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
if( eSubstrCount( $tmp[$n], '.' ) > 0 ){
list(,$c) = explode( '.', $tmp[$n] );
$OrdCampo[] = trim($c);
}else{
$OrdCampo[] = $tmp[$n];
}
}
$OrdASC = array();
$OrdDESC = array();
for( $n=0; $n<count($OrdCampo); $n++ ){
if( eSubstrCount( $OrdCampo[$n], ' ' ) > 0 ){
list($Campo,$Ord) = explode( ' ', $OrdCampo[$n] );
$Campo = trim($Campo);
switch( trim(mb_strtoupper($Ord)) ){
case 'ASC':
$OrdASC[$Campo] = 1;
if( mb_substr($Campo,0,3)=='cd_' ) $OrdASC['nm_' +mb_substr($Campo,3)] = 1;
break;
case 'DESC':
$OrdDESC[$Campo] = 1;
if( mb_substr($Campo,0,3)=='cd_' ) $OrdDESC['nm_' +mb_substr($Campo,3)] = 1;
break;
case 'EXTEND':
break;
default:
}
}else{
$OrdASC[$OrdCampo[$n]] = 1;
if( mb_substr($OrdCampo[$n],0,3)=='cd_' ) $OrdASC['nm_' +mb_substr($OrdCampo[$n],3)] = 1;
}
}
if( isset($_SUBTITLE) ){
echo $__Enter;
echo "<table id=SubTitle cellspacing=0 cellpadding=0 border=0 style='background-color:transparent'><tr><td>";
if( $_SUBTITLE=='' ){
echo "<table width=100% cellspacing=0 cellpadding=0 border=0><tr><td id='sT'>".date('d-m-Y')."</td><td align='right' id='sT'>".date('H:i:s')."</td></tr></table>";
}else{
@eval($_SUBTITLE.';');
}
echo '</td></tr></table>';
}
$_FILTER = str_replace('"',"'", $_FILTER);
$NCampos -= $_EditListNCampos;
$tColumnas = $NCampos;
if( count($_ROWSOP) > 0 ) $tColumnas++;
$SoloDatos = isset($_REG_);
if( $SoloDatos ){
eInit();
if( $_PHPNEXTPAGE!='' ){
$tmpFile = GrabaTmp( 'l_phpnextpage', $_PHPNEXTPAGE, $LenDoc, $_FILE_PHPINI );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPNEXTPAGE );
}
echo '<HTML><HEAD></HEAD><BODY style="text-align:center;display:none">';
}
echo $__Enter;
$_EmbeddedImages = true;
$_DimImg = array(); $DimImg = array('n','p','vn','vp');
for( $n=0; $n<count($DimImg); $n++ ){
$NomFileImg = 'g/chart_'.$DimImg[$n].'.jpg';
$_DimImg[$DimImg[$n]] = 'data:image/jpg;base64,'.base64_encode( file_get_contents( $NomFileImg ) );
}
$DefColsOp = '';
if( $_NOSELECTROW && count($_COLSOP) > 0 ){
for( $n=0; $n<count($_COLSOP); $n++ ){
if( $DefColsOp=='' ) $DefColsOp = ' DefColsOp="|';
$DefColsOp .= $_COLSOP[$n].'|';
}
if( $_SummaryType > 0 ){
$DefColsOp = str_replace( 'S|S|', 'S|', $DefColsOp );
}else{
$DefColsOp = str_replace( 'S|', '', $DefColsOp );
}
if( $DefColsOp!='' ) $DefColsOp .= '"';
}
if( $_SORTLIST!='' ){
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$_SORTLIST ){
$_FORMAT[$n] = "'<i class=\'ICONINPUT\'>".mb_chr(124)."</i>'";
$_ALIGN[$n] = ' id=c';
break;
}
}
}
foreach($_UPLOADFILE as $k=>$v){
if( $_UPLOADFILE[$k]['oDIR'][0]=='$' ){
$_UPLOADFILE[$k]['oDIR'] = _ExeEval($_UPLOADFILE[$k]['oDIR'], $_UPLOADFILE[$k]['oDIR']);
$tmp = eScript($_UPLOADFILE[$k]['oDIR']);
$_UPLOADFILE[$k]['DIR'] = $tmp;
}
}
if( $_NOJS ){
}else if( isset($_ILIST_) ){
}else{
for( $n=$_SummaryType-1; $n<$_TGrupos && $_SummaryType!=-1; $n++ ){
$_SummaryData = false;
if( $n>=0 ) $_SummaryGroupLabel[$n] = 0;
$_SummaryGroupTotal[$n+1] = 0;
}
if( $_SummaryType!=-1 ){
}
echo '<table id=BROWSE SeekCampos="'.$sSeek.'" FiltroTabla="'.$_FILTER.'" '.$DefColsOp.' cellspacing=1px cellpadding=2px border=0 eCols='.($tColumnas-$_TGrupos+((count($_CHARTCOL)==0)?0:1));
if( isset($_GET['_ORDEN_']) && $_GET['_ORDEN_']>0 ){
echo ' ord='.( ($_SORTTYPE_==1) ? 'null':1 );
echo ' SortType='.$_SORTTYPE_;
echo ' SortCol='.($_GET['_ORDEN_']-1);
}
if( $_NOTITLE==true ) echo ' style="border:0px"';
echo ' AltoTH='.((count($_THCOLSPAN)==0)?'0':'1').$_SORTLISTCND.'>';
}
$_THRowAdd = count($_THCOLSPAN);
echo $__Enter;
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
$CursorType = '';
if( $_COLSCOLOR[$n] == '' ){
$_COLSCOLOR[$n] = "class='Celda'";
$CursorType = $_CURSORTYPE;
}
if( count($_EDITLIST)>0 ){
if( eSubstrCount( $_EDITLIST[0], ",{$_SelectReal[$_Form[$n][1]]},") == 1 || eSubstrCount( $_EDITLIST[0], ",{$_Form[$n][1]},") == 1 ){
if( $_EDITLIST[2] != '' ){
$_COLSCOLOR[$n] = $_EDITLIST[2];
}else{
$_COLSCOLOR[$n] = 'class=EditList';
}
}
}
$_ALIGN[$n] = mb_strtolower($_ALIGN[$n]);
switch( $_ALIGN[$n] ){
case ' id=i':
$_ALIGN[$n] = " style='text-align:left;{$CursorType}'";
break;
case ' id=c':
$_ALIGN[$n] = " style='text-align:center;{$CursorType}'";
break;
case ' id=d':
$_ALIGN[$n] = " style='text-align:right;{$CursorType}'";
break;
case ' id=o':
$_ALIGN[$n] = ' style="display:none"';
break;
default:
if( $CursorType!='' ) $_ALIGN[$n] = " style='{$CursorType}'";
}
if( eSubstrCount($_Form[$n][6],'*' ) > 0 || ( $_SummaryType > 0 && $n >= $_SummaryType && $n < $_TGrupos ) ){
continue;
}else{
echo "<COL{$_ALIGN[$n]} {$_COLSCOLOR[$n]}";
if( $_DimColumnas && $_COLSWIDTH[$n] > 0 ){
echo ' style="word-break:break-all;width:'.$_COLSWIDTH[$n].'px"';
}else{
echo ' style="white-space:nowrap"';
if( mb_strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[ $_Form[$n][1] ] = true;
if( $_LISTCHECKBOX['H']=='' ){
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]] = $_CheckBox['H']['ON'];
$_SelVirtual[$_Form[$n][1]][trim($_CheckBoxSave[1])]  = $_CheckBox['H']['OFF'];
}else{
$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]] = $_LISTCHECKBOX['H'][0];
$_SelVirtual[$_Form[$n][1]][trim($_CheckBoxSave[1])]  = $_LISTCHECKBOX['H'][1];
}
echo ' CheckON="'.str_replace('"',"'",$_SelVirtual[$_Form[$n][1]][$_CheckBoxSave[0]]).'"';
echo ' CheckOFF="'.str_replace('"',"'",$_SelVirtual[$_Form[$n][1]][trim($_CheckBoxSave[1])]).'"';
}
}
}
if( mb_strtoupper($_Form[$n][3])=='R' ){
echo ' DimRadio="';
foreach( $_RADIO[$_Form[$n][1]] as $k=>$v ) echo $k.'|'.$v.'|';
echo '"';
}
$cCampo = $_Form[$n][1];
if( eSubstrCount($cCampo,' ')>0 ){
if( eSubstrCount($cCampo,' as ')>0 ){
list(,$cCampo) = explode(' as ',$cCampo);
}else{
list(,$cCampo) = explode(' ',$cCampo);
}
}
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3] ) == 0 ){
echo " CAMPO='".str_replace("'","\\'",$cCampo)."'";
}else{
echo " CAMPO='*".str_replace("'","\\'",$cCampo)."'";
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo " oCAMPO='".str_replace("'","\\'",$_SelectReal[$_Form[$n][1]])."'";
if( $_SORTLIST==$_SelectReal[$_Form[$n][1]] ) $_SORTLISTNCOL = $n ;
}else{
echo " oCAMPO='".str_replace("'","\\'",$_Form[$n][1])."'";
if( $_SORTLIST==$_Form[$n][1] ) $_SORTLISTNCOL = $n ;
}
if( $OrdASC[  $_Form[$n][1] ]==1 ) echo ' ord="U"';
if( $OrdDESC[ $_Form[$n][1] ]==1 ) echo ' ord="D"';
$ConDecimales = '';
if( eSubstrCount( $_Form[$n][2],',' ) > 0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd={$nd} DCM={$nd}";
}
echo " NC=".($n-$_TGrupos)." td='".(($_Form[$n][3][0]=='S')?'N':$_Form[$n][2])."'{$ConDecimales} te='".$_Form[$n][3]."'";
if( count($_EDITLIST)>0 ) echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
echo " id=RDCol{$n}>";
}
if( count($_ROWSOP) > 0 ) echo '<COL style="text-align:right" oCAMPO="_TOTAL_">';
if( count($_CHARTCOL) > 0 ){
if( $_COLSCOLOR[$NCampos]!='' ){
echo "<COL style='width:{$_CHARTCOL[1]}' ".$_COLSCOLOR[$NCampos].">";
}else{
echo "<COL class='Celda' style='width:{$_CHARTCOL[1]}'>";
}
}
if( $_GET['_ORDEN_']!='' || $_POST['_ORDEN_']!='' ){
unset($OrdDESC);
unset($OrdASC);
if( is_numeric($_ORDEN_) ){
if( $_SORTTYPE_==0 ){
$OrdASC[  $_Form[$_ORDEN_-1][1] ] = 1;
}else{
$OrdDESC[ $_Form[$_ORDEN_-1][1] ] = 1;
}
}else{
$tmp = explode(',',$_ORDEN_);
for( $n=0; $n<count($tmp); $n++ ){
if( $_SORTTYPE_==0 ){
$OrdASC[  trim($tmp[$n]) ] = 1;
}else{
$OrdDESC[ trim($tmp[$n]) ] = 1;
}
}
}
}
$ConPaginacion = false;
if( $_LimitOn ){
}else if( $_PrimerosReg < 0 && $TotalReg > $_PrimerosReg*-1 ){
}else if( $TotalReg > $_DBLIMIT ){
}else if( $TotalReg > $_RowsOnPage ){
$ConPaginacion = true;
}else if( isset(SETUP::$List['ShowTotalRecords']) && SETUP::$List['ShowTotalRecords'] && $TotalReg>1 ){
}
if( count($_THCOLSPAN)>0 ){
$_THCOLSPANDEF = array();
$snc = -1;
echo $__Enter.'<tr>';
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
if( $THCol[$n][2] == 3 ){
$rs = ' style="text-align:center" rowspan=2';
$_DimTHText[1][$n] = trim($_Form[$n][0]);
}else if( $THCol[$n][2] == 2 ){
$snc++;
if( $n+$THCol[$n][1]==$NCampos && count($_CHARTCOL) > 0 && $_CHARTCOL[2] == '' && count($_ROWSOP)==0 ) $THCol[$n][1]++;
echo '<th style="cursor:var(--cAuto); text-align:center" colspan='.$THCol[$n][1];
if( $_GRID[0][0]==$_Form[$n][1] ){
if( $OrdASC[  $_Form[$n][1] ]==1 ) echo ' ord=null style="text-Decoration:underline;"';
if( $OrdDESC[ $_Form[$n][1] ]==1 ) echo ' ord=1 style="text-Decoration:overline;"';
}
if( $_TIPTHTOP[$n] != '' ) echo " title='".str_replace('\\t',mb_chr(9),str_replace('\\n',CHR13,trim($_TIPTHTOP[$n])))."'";
echo '>'.$THCol[$n][0];
$_THCOLSPANDEF[] = array($THCol[$n][1],$THCol[$n][0]);
for( $i=$snc; $i<$snc+$THCol[$n][1]; $i++ )	$THColPuntero[$i] = $snc;
for( $i=$n; $i<$n+$THCol[$n][1]; $i++ ) $_DimTHText[1][$i] = trim($THCol[$n][0]);
continue;
}
$_Form[$n][2] = trim( $_Form[$n][2] );
if( $THCol[$n][2] == 0 ){
continue;
}
$snc++;
if( eSubstrCount( $_Form[$n][6], '*' ) > 0 ){
continue;
echo "<th CAMPO='{$_Form[$n][1]}'{$rs} NC=".($n-$_TGrupos);
echo " oCAMPO='".$_Form[$n][1]."'";
$ConDecimales = '';
if( eSubstrCount( $_Form[$n][2],',' ) > 0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd='{$nd}' DCM='{$nd}'";
}
echo " td='".$_Form[$n][2]."'{$ConDecimales}";
echo ' style="display:none">';
$_THCOLSPANDEF[] = array(1,'');
}else{
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3] ) == 0 ){
echo "<th CAMPO='".str_replace("'","\\'",$_Form[$n][1])."'";
}else{
echo "<th CAMPO='*".str_replace("'","\\'",$_Form[$n][1])."'";
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo " oCAMPO='".str_replace("'","\\'",$_SelectReal[$_Form[$n][1]])."'";
}else{
echo " oCAMPO='*".str_replace("'","\\'",$_Form[$n][1])."'";
}
if( $OrdASC[  $_Form[$n][1] ]==1 ) echo ' ord=1 style="text-Decoration:underline;"';
if( $OrdDESC[ $_Form[$n][1] ]==1 ) echo ' style="text-Decoration:overline;"';
$ConDecimales = '';
if( eSubstrCount( $_Form[$n][2],',' ) > 0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd={$nd} DCM={$nd}";
}
echo "{$rs} NC=".($n-$_TGrupos)." td='".$_Form[$n][2]."'{$ConDecimales}";
if( count($_EDITLIST)>0 ) echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
if( $_TIPTH[$n] != '' ) echo " title='".str_replace('\\t',mb_chr(9),str_replace('\\n',CHR13,trim($_TIPTH[$n])))."'";
if( $rs=='' ) echo ' style="text-align:center"';
if( empty($_Form[$n][0]) ){
echo '>';
$_THCOLSPANDEF[] = array(1,'');
}else{
echo ">{$_Form[$n][0]}";
$_THCOLSPANDEF[] = array(1,$_Form[$n][0]);
if( $_ConChartSWF ) $_DimChartSWF[0][] = $_Form[$n][0];
}
}
$_TH_td[$n] = $_Form[$n][2];
}
if( count($_ROWSOP)>0 ){
$tmp = $_ROWSOP[$NCampos];
if( $tmp=='' ) $tmp = 'Total';
if( $_CHARTCOL[2]!='' ) $tmp = $_CHARTCOL[2];
list(,$nd) = explode(',',$_FORMAT[$NCampos]);
echo '<th rowspan=2 style="'.((count($_CHARTCOL)>0)?'text-align:center':'').'"'.((count($_ROWSOP)==0)?'':' colspan=2').' oCAMPO="_TOTAL_" CAMPO="_TOTAL_" td="+'.(($nd>0)?',':'').'" te="T" DCM="'.$nd.'" NC='.$NCampos.'>'.$tmp;
}else if( count($_CHARTCOL)>0 && $_CHARTCOL[2]!='' ) echo '<TH rowspan=2 colspan=2 oCAMPO="" CAMPO="" td="+," NC='.$_CHARTCOL[0].' te=G>'.$_CHARTCOL[2];
}else{
for( $n=0; $n<$NCampos; $n++ ) $THCol[$n][2] = 1;
}
if( $TotalReg<2 ) $_CHARTCOL = array();
$i=0;
for( $n=0; $n<count($_COLSOP); $n++ ) if( $_COLSOP[$n]=='+' ) $i++;
if( $i<2 ) $_CHARTROW = array();
echo $__Enter.'<tr>';
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
$_Form[$n][4] = eNsp($_Form[$n][4]);
$_DimTHText[0][$n] = trim($_Form[$n][0]);
$_Form[$n][2] = trim( $_Form[$n][2] );
if( $THCol[$n][2] == 3 ) continue;
if( eSubstrCount( $_Form[$n][6], '*' ) > 0 ){
continue;
echo "<th CAMPO='{$_Form[$n][1]}' NC=".($n-$_TGrupos);
echo " oCAMPO='".$_Form[$n][1]."'";
$ConDecimales = '';
if( eSubstrCount( $_Form[$n][2],',' ) > 0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd={$nd} DCM={$nd}";
}
echo " td='".$_Form[$n][2]."'{$ConDecimales}";
echo ' style="display:none">';
}else{
if( !$HaySelect || eSubstrCount('MSSsX', $_Form[$n][3] ) == 0 ){
echo "<th CAMPO='{$_Form[$n][1]}'";
}else{
echo "<th CAMPO='*{$_Form[$n][1]}'";
}
if( $_SelectReal[$_Form[$n][1]]!='' ){
echo " oCAMPO='".$_SelectReal[$_Form[$n][1]]."'";
}else{
echo " oCAMPO='".$_Form[$n][1]."'";
}
if( $_GRID[0][0]!=$_Form[$n][1] ){
if( $OrdASC[  $_Form[$n][1] ]==1 ) echo ' ord=1 style="text-Decoration:underline;"';
if( $OrdDESC[ $_Form[$n][1] ]==1 ) echo ' style="text-Decoration:overline;"';
}
$ConDecimales = '';
if( eSubstrCount( $_Form[$n][2],',' ) > 0 ){
list(,$nd) = explode(',',$_Form[$n][4]);
$ConDecimales = " nd={$nd} DCM={$nd}";
}
echo " NC=".($n-$_TGrupos)." td='".(($_Form[$n][3][0]=='S')?'N':$_Form[$n][2])."'{$ConDecimales} te='".$_Form[$n][3]."'";
if( count($_EDITLIST)>0 ) echo " Cond='{$_Form[$n][8]}' Long='{$_Form[$n][4]}'";
if( $_TIPTH[$n] != '' ) echo " title='".str_replace('\\t',mb_chr(9),str_replace('\\n',CHR13,trim($_TIPTH[$n])))."'";
echo ' style="text-align:center"';
if( $n == $NCampos-1 ){
if( count($_CHARTCOL) > 0 && $_CHARTCOL[2] == '' && count($_ROWSOP)==0 ) echo ' colspan=2';
}
echo ' pCS="'.$THColPuntero[$n].'"';
if( empty($_Form[$n][0]) ){
echo '>';
}else{
if( $_DimColumnas && $_COLSWIDTH[$n]>0 && count($_THCOLSPAN)>0 ){
echo "><span style='width:{$_COLSWIDTH[$n]}'>{$_Form[$n][0]}</span>";
}else{
echo ">{$_Form[$n][0]}";
}
if( $_ConChartSWF ) $_DimChartSWF[0][] = $_Form[$n][0];
}
}
$_TH_td[$n] = $_Form[$n][2];
}
if( count($_ROWSOP)>0 && count($_THCOLSPAN)==0 ){
$tmp = $_ROWSOP[$NCampos];
if( $tmp=='' ) $tmp = 'Total';
if( $_CHARTCOL[2]!='' ) $tmp = $_CHARTCOL[2];
list(,$nd) = explode(',',$_FORMAT[$NCampos]);
echo '<th style="'.((count($_CHARTCOL)>0)?'text-align:center':'').'"'.((count($_ROWSOP)==0)?'':' colspan=2').' oCAMPO="_TOTAL_" CAMPO="_TOTAL_" td="+'.(($nd>0)?',':'').'" te="T" DCM="'.$nd.'" NC='.$NCampos.'>'.$tmp;
}else if( count($_THCOLSPAN)==0 && count($_CHARTCOL)>0 && $_CHARTCOL[2]!='' ) echo '<TH CAMPO="" td="+," NC='.$_CHARTCOL[0].' te=G>'.$_CHARTCOL[2];
if( isset($usuCursor) ) $TotalReg = count($usuCursor);
if( !isset($_TopMaxRec) ) $_TopMaxRec = 1000;
if( $_RowsOnPage > $_TopMaxRec && !isset($_MaxRowsOnPage) ) $_RowsOnPage = $_TopMaxRec;
if( $_RowsOnPage > $TotalReg ) $_RowsOnPage = $TotalReg;
$MaxReg = ( ( $TotalReg <= $_RowsOnPage ) ? $TotalReg : $_RowsOnPage );
$ntReg = 0;
$Pintar = true;
if( isset($_REG_) ){
$_TIPO_=mb_substr($_REG_,0,1);
$_ACCION_=mb_substr($_REG_,1,1);
$_REG_=mb_substr($_REG_,2);
if( $_TIPO_=='P' ){
$_REG_ = ($_REG_+0) * $_RowsOnPage;
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
if( $_REG_ < 0 ){
$_REG_ = $_RowsOnPage;
}else if( $_REG_ > $TotalReg ) $_REG_ = $TotalReg-$_RowsOnPage;
break;
case '>':
$_REG_ += $_RowsOnPage;
if( $_REG_ >= $TotalReg ){
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
if( $_REG_ < 0 ) $_REG_ = 0;
if( $_TIPO_=='R' ){
$DesdeList = $_REG_+1;
$HastaList = $TotalReg;
}else{
$DesdeList = floor($_REG_ / $_RowsOnPage) + 1;
if( $DesdeList < 1 ) $DesdeList = 1;
if( $_ACCION_=='?' && $DesdeList*$_RowsOnPage > $TotalReg ){
$DesdeList = 1;
$_REG_ = 0;
}
$HastaList = ceil($TotalReg/$_RowsOnPage);
}
if( $_REG_ > 0 ) $Pintar = false;
$LenINPUT = mb_strlen($TotalReg.'')*11;
$SeVe = ( ( $TotalReg <= $_RowsOnPage || $TotalReg == 0 ) ? 'id=o' : '' );
$_ChartMin = $_ChartMax = null;
if( count($_CHARTCOL)>0 && $_CHARTCOL[0]=='' ) $_CHARTCOL[0] = $NCampos+((count($_ROWSOP)>0)?0:-1);
if( count($_CHARTROW)>0 ){
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
for( $n=0; $n<$NCampos; $n++ ) $NumField[$_Form[$n][1]] = $n;
if( $_PrimerosReg < 0 ) $MaxReg = $_PrimerosReg*-1;
$sMaxReg = $MaxReg;
$TROcultar = '';
if( $TotalReg==0 ){
}else if( !isset($usuCursor) ){
if( isset($_GRAPH) ) $usuCursor = array();
$LineaPar = false;
while( $row = qRow() ){
$_vF = &$row;
if( isset($_DBREADROW) ) if( !call_user_func( $_DBREADROW, $_vF ) ) continue;
if( isset($_GRAPH) ) $usuCursor[$ntReg] = array();
$ntReg++;
$_OpLin = 0;
$_RowStyle = $_RowClass = '';
for( $n=0; $n<$NCampos; $n++ ) $_CellsStyle[$n] = $_CellsClass[$n] = '';
if( $_FORMATPHP!='' ) _ExeFormato( $row, $_CellsStyle, $_CellsClass, $ntReg+$_THRowAdd, $_RowStyle, $_RowClass );
if( $Pintar ){
if( $_RowStyle!='' ) $_RowStyle = ' style="'.$_RowStyle.'"';
if( $_RowClass!='' ) $_RowClass = ' class="'.$_RowClass.'"';
echo $__Enter;
if( $_GREENBAR ){
if( $LineaPar ){
echo "<tr id=P{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
$LineaPar = !$LineaPar;
}else{
if( $_HayROWCOLOR ){
if( $_ROWCOLOR[1]=='' ){
$txt = @eval( 'return ('.$_ROWCOLOR[0].');' );
echo "<tr {$txt}{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else if( @eval( 'return ('.$_ROWCOLOR[0].');' ) ){
echo "<tr {$_ROWCOLOR[1]}{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
}
}
for( $n=0; $n<$NCampos; $n++ ){
$Celda = trim($row[$n]);
$StyleTDAddOption = '';
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$StyleTDAddOption = $_SelVirtualStyle[$_Form[$n][1]][$Celda];
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][3]=='H' ){
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = '<table style="background:transparent" border=0 cellspacing=0 cellpadding=0><tr><td id=CNT'.(($_COLSWIDTH[$n]>0)?' style="width:'.$_COLSWIDTH[$n].'"':'').'>'.$Celda.'</td></tr></table>';
}else if( $_Form[$n][2]=='#' && $_Form[$n][3]!='H' ){
$Celda = urldecode( $Celda );
$Celda = str_replace("\n",'{#}ENTER{#}',$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#39;',"'",$Celda);
$Celda = str_replace('&#34;','"',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
$Celda = str_replace('&amp;','&',$Celda);
}else if( $_Form[$n][2] == 'o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
}else if( isset($_RADIOLIST[ $_Form[$n][1] ]) ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]!='' ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]=='' ){
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='TEXT' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='ALL' ){
$Celda .= '·'.$_SelVirtual[$_Form[$n][1]][$Celda];
}
}
}
}
}else if( $_SELECTMULTIPLE[ $_Form[$n][1] ] > 0 && $Celda!='' ){
if( $_SelVirtualType[ $_Form[$n][1] ] != 'T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= '<br>';
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}else $Celda = mb_substr($Celda,1,-1);
}
$Celda = trim($Celda);
if( $_HayRadio && isset($_RADIO[$_Form[$n][1]]) ){
if( count($_RADIO[$_Form[$n][1]])>0 ) $Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
if( isset($_GRAPH) ) $usuCursor[$ntReg-1][] = $Celda;
if( $Pintar ){
if( eSubstrCount($_Form[$n][6],'*') > 0 ) continue;
if( $_EditListSql[$_SelectReal[$_Form[$n][1]]]!='' ){
echo '<td v="'.trim( $row[ $_EditListSql[$_SelectReal[$_Form[$n][1]]] ] ).'"';
}else{
echo '<td';
}
if( $_CellsStyle[$n]!='' ) echo ' style="'.$_CellsStyle[$n].'"';
if( $_CellsClass[$n]!='' ) echo ' class="'.$_CellsClass[$n].'"';
echo $StyleTDAddOption;
if( eSubstrCount($_Form[$n][6],'*') > 0 ) echo ' style="display:none"';
echo '>';
$Celda = str_replace('&lt;br&gt;','<br>',$Celda);
if( eSubstrCount($_Form[$n][6],'*')>0 ){
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
}else{
echo $Celda;
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='#' && isZero($Celda) ) $_OpCol[$n]++;
if( $_COLSOP[$n]=='C' ) $_OpCol[$n]++;
}
}else{
if( empty($_FORMAT[$n]) ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_Form[$n][2]=='#' && $_Form[$n][3]!='H' ){
if( !$_HTMLENTITIES[$_Form[$n][1]] ) $Celda = str_replace('<','&lt;',str_replace('>','&gt;',$Celda));
$Celda = str_replace( '{#}ENTER{#}', '<br>', $Celda );
$Celda = str_replace('&amp;quot;','"',$Celda);
$Celda = str_replace('&#34;','"',$Celda);
}
echo $Celda;
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( eSubstrCount($_FORMAT[$n],'@' ) > 0 ){
if( mb_strrpos($Celda,'.') !== false ){
$Celda = mb_substr( $Celda, mb_strrpos($Celda,'.')+1);
}else{
$Celda = '';
}
$Formato = 'echo '.str_replace( '@', $Celda, $_FORMAT[$n] ).';';
if( $Celda == '' ) $Formato = 'echo "";';
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = '';
}else if( $_FORMAT[$n]=='IMG' ){
if( $Celda!='' ){
$tmp = explode('.',$Celda);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $row[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$xCampo]['PREFIJO'] );
}else{
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $Celda, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
$NomIcono = 'g/l_d_'.$tmp[count($tmp)-1].'.gif';
if( !file_exists($NomIcono) ) $NomIcono = 'g/l_d_.gif';
echo "<img src='{$NomIcono}' onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='".$_UPLOADFILE[$xCampo]['TITLE']."'>";
}
$Formato = '';
}else if( $_FORMAT[$n]=='ICON' ){
if( $Celda!='' ){
$tmp = explode('.',$Celda);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $row[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$xCampo]['PREFIJO'] );
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$tmp[count($tmp)-1];
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $Celda, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( $sNomFile[0]=='/' || $sNomFile[0]==CHR92 ) $sNomFile = mb_substr($sNomFile,6);
echo "<img src='{$sNomFile}' title='".$_UPLOADFILE[$xCampo]['TITLE']."'>";
}
$Formato = '';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func( mb_substr($Formato,5,-3), $n, $Celda );
}else{
@eval( $Formato );
}
}
}
if( count($_COLSOP) > 0 ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ) $_OpCol[$n] += (integer)$Celda;
if( $_COLSOP[$n]=='#' && isZero($Celda) ) $_OpCol[$n]++;
if( $_COLSOP[$n]=='C' ) $_OpCol[$n]++;
}
if( count($_ROWSOP)>0 ){
if(      $_ROWSOP[$n]=='+' ) $_OpLin += (integer)$Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= (integer)$Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= (integer)$Celda;
}
}
}else{
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ) $_OpCol[$n] += (integer)$Celda;
if( $_COLSOP[$n]=='#' && isZero($Celda) ) $_OpCol[$n]++;
if( $_COLSOP[$n]=='C' ) $_OpCol[$n]++;
}
if( count($_ROWSOP)>0 ){
if(      $_ROWSOP[$n]=='+' ) $_OpLin += (integer)$Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= (integer)$Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= (integer)$Celda;
}
}
}
if( count($_ROWSOP)>0 ){
if( $Pintar ){
echo "<td id=D class=PieLista>";
if( empty($_FORMAT[$NCampos]) ){
echo $_OpLin;
}else{
$Formato = 'echo '.str_replace('#', $_OpLin, $_FORMAT[$NCampos]).';';
@eval($Formato);
}
}
$_OpLinCol += $_OpLin;
}
if( count($_CHARTCOL)>0 ){
$v = ((( $_CHARTCOL[0]==$NCampos ) ? $_OpLin : $row[$_CHARTCOL[0]]))*1;
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v > $_ChartMax ){
$_ChartMax = $v;
}else if( $v < $_ChartMin ){
$_ChartMin = $v;
}
if( $Pintar ){
echo '<td>';
echo '<img style="" SRC="'.$_DimImg['p'].'" HEIGHT='.(($_CHARTCOL[5]=='')? '12':$_CHARTCOL[5]).'>';
}
}
if( $Pintar ){
$MaxReg--;
if( $MaxReg<1 ){
if( $_MAXRECFULL ){
$TROcultar = ' style="display:none"';
}else{
if( count($_CHARTCOL)>0 ){
while( $row=qRow() ){
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $row[$_CHARTCOL[0]];
if( $row[$_CHARTCOL[0]]>$_ChartMax ){
$_ChartMax = $row[$_CHARTCOL[0]];
}else if( $row[$_CHARTCOL[0]]<$_ChartMin ){
$_ChartMin = $row[$_CHARTCOL[0]];
}
}
}
break;
}
}
}else{
if( $ntReg==$_REG_ && $_REG_>0 ) $Pintar = true;
}
}
$TipoCursor = true;
if( $_DBGROUPBY!='' ){
$TotalReg = $ntReg+$_REG_;
while( $row = qArray() ) $TotalReg++;
if( $ntReg == 0 && !$EmptyList ) eMessageBG( '~NR', 'HS', $ExeSg, $ExeJS, 'NR' );
}
}else{
$NomGrupo = array();
if( $_DBGROUPBY!='' ){
if( count($usuCursor) == 0 && !$EmptyList ) eMessageBG( '~NR', 'HS', $ExeSg, $ExeJS, 'NR' );
}
$TipoCursor = false;
$LineaPar = false;
for( $g=0; $g<$_TGrupos; $g++ ) for( $n=0; $n<$NCampos; $n++ ){
$_OpSubCol[$g][$n] = 0;
$_OpRegMedia[$g][$n] = 0;
}
$_OpDeGrupo = false;
for( $n=$_TGrupos; $n<$NCampos; $n++ ) if( $_COLSOP[$n] != '' && $_COLSOP[$n] != '%' && $_COLSOP[$n] != 'L' ) $_OpDeGrupo = true;
$ConChartCol = 0;
if( count($_CHARTCOL)>0 ){
$ConChartCol++;
$_CHARTCOL[0] += $_TGrupos;
}
$_SaltarGrupo = array( false, false );
for($l=0; $l<count($usuCursor); $l++){
$_vF = &$usuCursor[$l];
if( $_TGrupos > 0 ){
for( $g=0; $g<$_TGrupos; $g++ ){
if( $_OldValGrupo[$g] != $usuCursor[$l][$g] ){
$_OldValGrupo[$g] = $usuCursor[$l][$g];
for( $sg=$g; $sg<$_TGrupos; $sg++ ){
if( $_SummaryGroupLabel[$sg] && $Pintar ){
if( $_ADDOPTION[ $_Form[$sg][1] ] == '' ){
$dato = trim($usuCursor[$l][$sg]);
}else{
$dato = $_SelVirtual[ $_Form[$sg][1] ][ $usuCursor[$l][$sg] ];
}
if( $g==1 || $dato!='' ){
if( $dato=='' ) $dato .= '&nbsp;';
echo $__Enter;
$Ajuste = ( $_SummaryType>0 ) ? 1:0;
echo '<tr'.$TROcultar.'><td colspan='.($NCampos-$_TGrupos+$ConChartCol+$Ajuste+((count($_ROWSOP)==0)?0:1)).' id=GC'.($sg+1);
echo ' title="'.strip_tags(str_replace( "'", '&#39;', $_Form[$sg][0] )).'"';
echo '>'.$dato;
$NomGrupo[$sg] = strip_tags(str_replace( "'", '&#39;', $dato ));
$_SaltarGrupo[$sg] = false;
}else{
$_SaltarGrupo[$sg] = true;
echo '<tr'.$TROcultar.'><td colspan='.($NCampos-$_TGrupos+$ConChartCol+$Ajuste+((count($_ROWSOP)==0)?0:1)).' id=GC'.($sg+1).'>&nbsp;';
}
}
$_OldValGrupo[$sg] = $usuCursor[$l][$sg];
}
$_OldValGrupo[$g] = $usuCursor[$l][$g];
break;
}
}
for( $g=$_TGrupos; $g<count($usuCursor[$l]); $g++ ) $_OldValGrupo[$g] = $usuCursor[$l][$g];
}
$ntReg++;
$_OpLin = 0;
$_RowStyle = $_RowClass = '';
for( $n=0; $n<$NCampos; $n++ ) $_CellsStyle[$n] = $_CellsClass[$n] = '';
if( $_FORMATPHP!='' ) _ExeFormato( $usuCursor[$l], $_CellsStyle, $_CellsClass, $ntReg+$_THRowAdd, $_RowStyle, $_RowClass );
if( $Pintar && $_SummaryData ){
if( $_RowStyle!='' ) $_RowStyle = ' style="'.$_RowStyle.'"';
if( $_RowClass!='' ) $_RowClass = ' class="'.$_RowClass.'"';
$row = $usuCursor[$l];
echo $__Enter;
if( $_GREENBAR ){
if( $LineaPar ){
echo "<tr id=P{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
$LineaPar = !$LineaPar;
}else{
if( $_HayROWCOLOR ){
if( $_ROWCOLOR[1]=='' ){
$txt = @eval( 'return ('.$_ROWCOLOR[0].');' );
echo "<tr {$txt}{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else if( @eval( 'return( '.$_ROWCOLOR[0].');' ) ){
echo "<tr {$_ROWCOLOR[1]}{$_RowStyle}{$_RowClass}{$TROcultar}>";
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
}else{
echo "<tr{$_RowStyle}{$_RowClass}{$TROcultar}>";
}
}
}
$PrimeraCol = ( $_TGrupos != 0 );
for( $n=$_TGrupos; $n<$NCampos; $n++ ){
$Celda = trim($usuCursor[$l][$n]);
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][3]=='H' ){
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = '<table style="background:transparent" border=0 cellspacing=0 cellpadding=0><tr><td id=CNT'.(($_COLSWIDTH[$n]>0)?' style="width:'.$_COLSWIDTH[$n].'"':'').'>'.$Celda.'</td></tr></table>';
}else if( $_Form[$n][2]=='#' && $_Form[$n][3]!='H' ){
$Celda = urldecode( $Celda );
$Celda = str_replace("\n",'{#}ENTER{#}',$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#39;',"'",$Celda);
$Celda = str_replace('&#34;','"',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
$Celda = str_replace('&amp;','&',$Celda);
}else if( $_Form[$n][2] == 'o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
}else if( isset($_RADIOLIST[ $_Form[$n][1] ]) ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]!='' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}
}
}
}else if( $_SELECTMULTIPLE[ $_Form[$n][1] ] > 0 && $Celda!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= '<br>';
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
$Celda = trim( $Celda );
if( $_HayRadio && isset($_RADIO[$_Form[$n][1]]) ){
if( count($_RADIO[$_Form[$n][1]])>0 ) $Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
if( $Pintar ){
if( eSubstrCount($_Form[$n][6],'*') > 0 ){
if( $_SummaryData ) continue;
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( $_SummaryData ){
if( $PrimeraCol ){
echo '<td id=GRCOL'.$n;
$PrimeraCol = false;
}else{
echo '<td';
}
if( $_CellsStyle[$n]!='' ) echo ' style="'.$_CellsStyle[$n].'"';
if( $_CellsClass[$n]!='' ) echo ' class="'.$_CellsClass[$n].'"';
echo $_ALIGN[$n];
echo '>';
}
if( ($_Form[$n][2] == 'F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
if( count($_COLSOP)>0 ){
if( $_COLSOP[$n]=='#' && isZero($Celda) ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
if( $_COLSOP[$n]=='C' || $_COLSOP[$n]=='S' ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
}
}else{
if( $_FORMAT[$n]=='' ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_SummaryData ){
if( $_Form[$n][2]=='#' && $_Form[$n][3]!='H' ){
if( !$_HTMLENTITIES[$_Form[$n][1]] ) $Celda = str_replace('<','&lt;',str_replace('>','&gt;',$Celda));
$Celda = str_replace( '{#}ENTER{#}', '<br>', $Celda );
$Celda = str_replace('&amp;quot;','"',$Celda);
$Celda = str_replace('&#34;','"',$Celda);
}
echo $Celda;
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}else{
if( eSubstrCount($_FORMAT[$n],'@' ) > 0 ){
if( mb_strrpos($Celda, '.') !== false ){
$Celda = mb_substr( $Celda, mb_strrpos($Celda, '.')+1);
}else{
$Celda = '';
}
$Formato = 'echo '.str_replace( '@', $Celda, $_FORMAT[$n] ).';';
}else if( $_FORMAT[$n]=='IMG' ){
if( $Celda!='' ){
$tmp = explode('.',$Celda);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $row[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$xCampo]['PREFIJO'] );
}else{
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $Celda, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
$NomIcono = 'g/l_d_'.$tmp[count($tmp)-1].'.gif';
if( !file_exists($NomIcono) ) $NomIcono = 'g/l_d_.gif';
echo "<img src='{$NomIcono}' onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='".$_UPLOADFILE[$xCampo]['TITLE']."'>";
}
$Formato = '';
}else if( $_FORMAT[$n]=='ICON' ){
if( $Celda!='' ){
$tmp = explode('.',$Celda);
$xCampo = $_Form[$n][_OFIELD];
if( $_UPLOADFILE[$xCampo]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $row[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$xCampo]['PREFIJO'] );
}else{
$Celda = $row[$NumField[$_UPLOADFILE[$xCampo]['NOMBRE']]].'.'.$tmp[count($tmp)-1];
$NomFile = $_UPLOADFILE[$xCampo][oDIR].'/'._NmFileConPrefijo( $Celda, $_UPLOADFILE[$xCampo]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
$sNomFile = $NomFile;
if( $sNomFile[0]=='/' || $sNomFile[0]==CHR92 ) $sNomFile = mb_substr($sNomFile,6);
echo "<img src='{$sNomFile}' title='".$_UPLOADFILE[$xCampo]['TITLE']."'>";
}
$Formato = '';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
if( $_ConChartSWF ) $_DimChartSWF[$ntReg+1][] = $Celda;
}
if( $_SummaryData ){
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func( mb_substr($Formato,5,-3), $n, $Celda );
}else{
@eval( $Formato );
}
}
}
if( count($_COLSOP) > 0 ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ){
$_OpCol[$n] += $Celda;
for( $g=0; $g<$_TGrupos; $g++ ){
$_OpSubCol[$g][$n] += $Celda;
$_OpRegMedia[$g][$n]++;
}
}
if( $_COLSOP[$n]=='#' && isZero($Celda) ){
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
}
if( $_COLSOP[$n]=='C' || $_COLSOP[$n]=='S' ){
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
}
}
if( count($_ROWSOP)>0 ){
if(      $_ROWSOP[$n]=='+' ) $_OpLin += $Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= $Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= $Celda;
}
}
}
}else{
if( count($_COLSOP) > 0 ){
if( $_COLSOP[$n]=='+' || $_COLSOP[$n]=='M' ){
$_OpCol[$n] += (integer)$Celda;
for( $g=0; $g<$_TGrupos; $g++ ){
$_OpSubCol[$g][$n] += (integer)$Celda;
$_OpRegMedia[$g][$n]++;
}
}
if( $_COLSOP[$n]=='#' && isZero($Celda) ){
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
}
if( $_COLSOP[$n]=='C' || $_COLSOP[$n]=='S' ){
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
}
}
if( count($_ROWSOP)>0 ){
if(      $_ROWSOP[$n]=='+' ) $_OpLin += (integer)$Celda;
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= (integer)$Celda;
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= (integer)$Celda;
}
}
}
$Todo = $usuCursor[$l];
if( count($_ROWSOP)>0 ){
if( $Pintar ){
echo '<td id=D class=PieLista style="text-align:right">';
if( empty($_FORMAT[$NCampos]) ){
$TotalRowSopP = $_OpLin;
$TotalRowSop = $_OpLin;
}else{
$Formato = '$TotalRowSopP = '.str_replace('#', $_OpLin, $_FORMAT[$NCampos]).';';
@eval( $Formato );
$TotalRowSop = $_OpLin;
}
echo $TotalRowSopP;
}
$_OpLinCol += $_OpLin;
$Todo[$_CHARTCOL[0]] = $TotalRowSop;
}
if( count($_CHARTCOL)>0 ){
$v = (integer)$Todo[$_CHARTCOL[0]];
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v > $_ChartMax ){
$_ChartMax = $v;
}else if( $v < $_ChartMin ){
$_ChartMin = $v;
}
if( $Pintar && $_SummaryData ){
echo '<td>';
echo '<img style="" SRC="'.$_DimImg['p'].'" HEIGHT='.(($_CHARTCOL[5]=='')? '12':$_CHARTCOL[5]).'>';
}
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
if( $_FORMATTOTALSPHP!='' ) _ExeFormatoTotal($_OpCol, $g, $_NameField[$g], $_OpSubCol);
if( $_SummaryGroupTotal[$g] ){
echo $__Enter;
echo '<tr id=GR'.($g+1).$TROcultar.'>';
}
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
$Celda = $_OpSubCol[$g][$n];
if( $n == $_TGrupos ){
if( $_SummaryGroupTotal[$g] ){
if( $_TextGrupo[$g]=='{C}' ){
echo '<td align=right';
}else{
if( $_Form[$n][2][0] == '+' || $_Form[$n][2][0] == '-' ){
echo '<td align=right';
}else{
echo '<td align=left';
}
}
}
echo ' title="'.strip_tags(str_replace( "'", '&#39;', $_Form[$g][0] )).(($NomGrupo[$g]=='')?'':': '.$NomGrupo[$g]).'"';
if( $_GrupoColSpan > 1 ){
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1)." colspan={$_GrupoColSpan}>";
$n += $_GrupoColSpan-1;
}else{
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1).">";
}
if( $_TextGrupo[$g]!='' ){
$tmp = str_replace( '{C}', eNumberFormat($_OpSubCol[$g][0]), $_TextGrupo[$g] );
if( $_SummaryGroupTotal[$g] ){
if( !empty( $_ADDOPTION[ $_Form[$g][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$g][1]][$usuCursor[$l][$g]];
echo str_replace( '{V}', trim($Celda), $tmp );
}else{
echo str_replace( '{V}', trim($usuCursor[$l][$g]), $tmp );
}
}
continue;
}
}else{
if( $_SummaryGroupTotal[$g] ){
if( $_Form[$n][2][0] == '+' || $_Form[$n][2][0] == '-' ){
echo '<td align=right>';
}else{
echo '<td align=left>';
}
if( $_SummaryCol > 0 && $n==$g ){
echo $_OldValGrupo[$g];
}
}
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
$Formato = 'echo '.str_replace( '@', $Celda, $_FORMATTOTALS[$n] ).';';
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = 'echo "";';
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMATTOTALS[$n] ).';';
}
}else{
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMATTOTALS[$n] ).';';
}
}
if( $_SummaryGroupTotal[$g] ){
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func( mb_substr($Formato,5,-3), $n, $_OpSubCol[$g] );
}else{
@eval( $Formato );
}
}
}
}
}
if( count($_ROWSOP) > 0 ){
echo '<td';
if( $_GrupoColSpan > 1 ){
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1)." colspan={$_GrupoColSpan}>";
}else{
if( $_SummaryGroupTotal[$g] ) echo " id=GRTD".($g+1).">";
}
if( empty($_FORMAT[$NCampos]) ){
$TotalRowSop = $_OpLin;
}else{
$Formato = '$TotalRowSop =  '.str_replace( '#', $_OpLin, $_FORMAT[$NCampos] ).';';
@eval( $Formato );
}
echo $TotalRowSop;
}
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ) $_OpSubCol[$g][$n] = 0;
if( $_SummaryGroupTotal[$g] && $ConChartCol==1 ) echo '<td>';
}
}
for( $g=0; $g<$_TGrupos; $g++ ){
if( $_OldValGrupo[$g] != $usuCursor[$l+1][$g] ){
for( $n=$_TGrupos; $n<$NCampos; $n++ ){
for( $sg=$g; $sg<$_TGrupos; $sg++ ) $_OpSubCol[$sg][$n] = 0;
}
break;
}
}
}
if( $Pintar ){
$MaxReg--;
if( $MaxReg < 1 ){
if( $_MAXRECFULL ){
$TROcultar = ' style="display:none"';
}else{
if( count($_CHARTCOL) > 0 ){
$v = $Todo[$_CHARTCOL[0]]*1;
if( is_null($_ChartMin) ) $_ChartMin = $_ChartMax = $v;
if( $v > $_ChartMax ){
$_ChartMax = $v;
}else if( $v < $_ChartMin ){
$_ChartMin = $v;
}
}
break;
}
}
}else{
if( $ntReg == $_REG_ && $_REG_ > 0 ) $Pintar = true;
}
}
}
if( !$_InfSinTotales && $_SummaryTotal && count($_COLSOP) > 0 && (( !isset($_REG_) || ( isset($_REG_) && (ceil($_REG_/$_RowsOnPage)+1) == ceil($TotalReg/$_RowsOnPage) ) ) || ($EmptyList && $TotalReg==0) ) ){
$_SummaryGroup = -1;
if( count($_GRID)>0 ){
$t = 0;
for( $n=$_TGrupos; $n<$NCampos; $n++ ) if( $_COLSOP[$n]=='<' ) $t += $_OpCol[$n-1];
for( $n=$_TGrupos; $n<$NCampos; $n++ ) if( $_COLSOP[$n]=='<' ) $_OpCol[$n] = ($_OpCol[$n-1]*100)/$t;
}
$xColSpan = '';
if( $_FORMATTOTALSCS > 1 ) $xColSpan = ' colspan='.$_FORMATTOTALSCS;
if( $_FORMATTOTALSPHP!='' ) _ExeFormatoTotal( $_OpCol, -1, '', $_OpSubCol );
$_OpLin = 0;
echo "<tr class=PieLista{$TROcultar}>";
if( $EmptyList && $NCampos == 0 ) $NCampos = $tColumnas;
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
$Celda = trim( $_OpCol[$n] );
if( $_COLSOP[$n]=='M' ) $Celda = $Celda/$ntReg;
if( eSubstrCount($_Form[$n][6],'*') > 0 ) continue;
if( $TipoCursor && eSubstrCount($_Form[$n][6],'*') > 0 ){
echo "<td{$xColSpan}>".$Celda;
}else{
if( $_COLSOP[$n]=='' && $_FORMATTOTALS[$n]=='' ){
echo "<td{$xColSpan} id=d style='text-align:right'>";
}else{
if( $_FORMATTOTALS[$n]=='' ){
if( $_COLSOP[$n]=='C' ){
if( $_ALIGN[$n]=='' ){
echo "<td{$xColSpan} id=i>";
}else{
echo "<td{$xColSpan} id={$_ALIGN[$n]}>";
}
}else if( eSubstrCount('<=>"'."'",$_COLSOP[$n][0] ) > 0 ){
echo "<TD{$xColSpan}";
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
echo ">";
if( $_COLSOP[$n][0]=='"' || $_COLSOP[$n][0]=="'" ) echo mb_substr($_COLSOP[$n],1,-1);
continue;
}elseif( $_COLSOP[$n]=='#' ){
echo "<td{$xColSpan} id=i>";
}else{
echo "<td{$xColSpan} id=d style='text-align:right'>";
}
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_oCOLSOP[$n]!='%' ){
if( $_COLSOP[$n]!='S' ){
if( mb_strtoupper($_COLSOP[$n])=='C' ){
echo eNumberFormat($Celda);
}else{
echo $Celda;
}
}
}else{
if( $Celda!='' ) echo '100%';
}
}else{
if( $_Form[$n][2][0]=='+' || $_Form[$n][2][0]=='-' ){
echo "<td{$xColSpan} id=d style='text-align:right'>";
}else{
echo "<td{$xColSpan} id=i>";
}
if( $_oCOLSOP[$n]=='' && $_FORMATTOTALS[$n]=='' ) continue;
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_oCOLSOP[$n]!='%' ){
$Formato = 'echo '.str_replace( '#', $Celda, $_FORMATTOTALS[$n] ).';';
if( mb_substr($Formato,-3)=='();' ){
echo call_user_func( mb_substr($Formato,5,-3), $n, $_OpCol );
}else{
@eval($Formato);
}
}else{
if( $Celda[0]=='>' ){
echo mb_substr($Celda,1);
}else if( $Celda!='' ) echo '100%';
}
}
if( count($_ROWSOP)>0 ){
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
if( count($_ROWSOP) > 0 ){
echo '<td id=D class="PieLista">';
if( empty($_FORMATTOTALS[$NCampos]) ){
echo $_OpLinCol;
}else{
$Formato = 'echo '.str_replace( '#', $_OpLinCol, $_FORMATTOTALS[$NCampos] ).';';
@eval( $Formato );
}
}
if( count($_CHARTCOL) > 0 ) echo '<td> ';
if( $_ISLOPTD!='' ) echo '<td>';
if( count($_CHARTROW)>1 ){
$MaxValor = null;
$MinValor = null;
for( $n=0; $n<$NCampos; $n++ ){
if( $_CHARTROW[0][$n] ){
if( $MaxValor==null ){
$MaxValor = $_OpCol[$n];
$MinValor = $_OpCol[$n];
}else{
$MaxValor = max( $MaxValor, $_OpCol[$n] );
$MinValor = min( $MinValor, $_OpCol[$n] );
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
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ){
if( eSubstrCount($_Form[$n][6],'*') > 0 ) continue;
if( $TipoCursor && eSubstrCount($_Form[$n][6],'*' ) > 0 ){
echo "<td{$xColSpan}>";
}else{
if( $_CHARTROW[0][$n] ){
list(,$nd) = explode(',',$_Form[$n][4]);
echo "<td style='vertical-align:top;text-align:center' title='".eNumberFormat($_OpCol[$n],$nd)."'>";
if( $MinValor>=0 ){
$v = ceil(($_OpCol[$n]*$_CHARTROW[2])/$MaxValor);
if( $v<1 ) $v = 1;
$mt = $MarginTop - $v;
echo '<img SRC="'.$_DimImg['vp'].'" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:top;margin-top:'.$mt.'px;">';
}else{
if( $_OpCol[$n] >= 0 ){
$v = ceil(($_OpCol[$n]*$_CHARTROW[2])/$MaxValor);
if( $v<1 ) $v = 1;
$mt = $MarginTop-$v;
echo '<img SRC="'.$_DimImg['vp'].'" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:top;margin-top:'.$mt.'px;">';
}else{
$v = abs(ceil((($_OpCol[$n]*$_CHARTROW[2])/$MaxValor)));
if( $v<1 ) $v = 1;
$mt = $MarginTop;
echo '<img SRC="'.$_DimImg['vn'].'" HEIGHT="'.$v.'px" width="'.$_CHARTROW[1].'px" style="vertical-align:top;margin-top:'.$mt.'px;">';
}
}
}else{
echo '<td>';
}
}
}
if( count($_ROWSOP)>0 ) echo '<td class=Celda colspan='.((count($_CHARTCOL)>0)?2:1).'>&nbsp;';
}
}else{
}
echo '</table>'.$__Enter;
if( count($_CHARTCOL) > 0 ){
if( $_TGrupos > 0 ){
$_CHARTCOL[0] -= $_TGrupos;
$NCampos -= $_TGrupos;
}
if( count($_COLSOP)==0 && $_TOTALSROWS ){
if( (ceil($_REG_/$_RowsOnPage)+1) == ceil($TotalReg/$_RowsOnPage) ){
}
}
}
if( count($_CHARTCOL) > 0 && !$SoloDatos ){
if( count($_ROWSOP)>0 ) $NCampos++;
$sNCampos = $NCampos;
for( $n=$_TGrupos-$_SummaryCol; $n<$NCampos; $n++ ) if( eSubstrCount($_Form[$n][6],'*') > 0 ){
$sNCampos--;
$_CHARTCOL[0]--;
}
$NCampos = $sNCampos;
if( $_ChartMin < 0 ){
?>
<SCRIPT type="text/javascript" name=eDes>
function ChartWidth(Max,Min){
var m,n, Valor;
for( n=<?=((count($_THCOLSPAN)==0)?'1':'2')?>; n<BROWSE.rows.length; n++ ){
try{
Valor = S.thousandsClear(BROWSE.rows[n].cells[<?= $_CHARTCOL[0] ?>].textContent);
if( Valor==0 ){
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].style.marginLeft = (<?= $_CHARTCOL[1] ?>*Min*-1)/(Max-Min);
m=1;
}else if( Valor<0 ){
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].src = BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].src.replace('<?= (($_CHARTCOL[3]=='')? 'chart_p.jpg':$_CHARTCOL[3]); ?>','<?= (($_CHARTCOL[4]=='')? 'chart_n.jpg':$_CHARTCOL[4]); ?>');
m = (<?= $_CHARTCOL[1] ?>*Valor*-1)/(Max-Min);
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].style.marginLeft = (<?= $_CHARTCOL[1] ?>*Min*-1)/(Max-Min)-m;
}else{
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].style.marginLeft = (<?= $_CHARTCOL[1] ?>*Min*-1)/(Max-Min);
m = (<?= $_CHARTCOL[1] ?>*Valor*1)/(Max-Min);
}
if( m>0 && m<1 ) m=1;
if( m<0 && m>-1 ) m=1;
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].width = m+"px";
BROWSE.rows[n].cells[<?= $NCampos ?>].title = Valor;
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
var m,n;
for( n=<?=((count($_THCOLSPAN)==0)?'1':'2')?>; n<BROWSE.rows.length; n++ ){
try{
m = (<?= $_CHARTCOL[1] ?>*S.thousandsClear(BROWSE.rows[n].cells[<?= $_CHARTCOL[0] ?>].textContent))/Max;
if( m<1 ) m=1;
BROWSE.rows[n].cells[<?= $NCampos ?>].children[0].width = m+"px";
BROWSE.rows[n].cells[<?= $NCampos ?>].title = BROWSE.rows[n].cells[<?= $_CHARTCOL[0] ?>].textContent;
}catch(e){}
}
}
<?PHP if( !$SoloDatos ) echo "ChartWidth({$_ChartMax},{$_ChartMin});"; ?>
</SCRIPT>
<?PHP
}
}
if( isset($_VerUserCondiciones) ){
?>
<SCRIPT type="text/javascript" name=eDes>
if( DGI('CONDICIONES')!=null ){
DGI("CONDICIONES").style.width = DGI("BROWSE").offsetWidth+"px";
if( DGI("CONDICIONES").style.width != DGI("BROWSE").offsetWidth ) DGI("CONDICIONES").style.width = DGI("BROWSE").offsetWidth+"px";
}
</SCRIPT>
<?PHP
}
$xTotalReg = eNumberFormat($TotalReg);
$ConPaginacion = false;
$SeVePie = (($_ISUBLIST) ? ' style="display:none"' : '');
if( $_WINCAPTION!='' ) $SeVePie = ' style="display:none"';
if( $_LimitOn ){
}else if( $_PrimerosReg < 0 && $TotalReg > $_PrimerosReg*-1 ){
$__Lng[18] = str_replace( '#1', ($_PrimerosReg*-1), $__Lng[18] );
$__Lng[18] = str_replace( '#2', $xTotalReg, $__Lng[18] );
}else if( $TotalReg > $_DBLIMIT ){
$__Lng[19] = str_replace( '#1', $_DBLIMIT, $__Lng[19] );
$__Lng[19] = str_replace( '#2', $xTotalReg, $__Lng[19] );
}else if( $TotalReg > $_RowsOnPage ){
$ConPaginacion = true;
$__Lng[20] = str_replace( '#1', '<span id=_Pie>'.(ceil($_REG_/$_RowsOnPage)+1).'</span>', $__Lng[20] );
$__Lng[20] = str_replace( '#2', '<span id=_Pie2>'.ceil($TotalReg/$_RowsOnPage).'</span>', $__Lng[20] );
$__Lng[20] = str_replace( '#3', $xTotalReg, $__Lng[20] );
}else if( isset(SETUP::$List['ShowTotalRecords']) && SETUP::$List['ShowTotalRecords'] && $TotalReg>1 ){
}
unset($SeVePie);
$_NOTOOLS .= $_DEFAULTNOTOOLS;
if( $_HTMEND!='' ) _IncludeJsHtml($_HTMEND, "HTMEnd");
if( !empty($_PHPEND) ){
$tmpFile = GrabaTmp( 'l_phpend', $_PHPEND, $LenDoc, $_FILE_PHPEND );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPEND );
}
if( isset($_GRAPH) ){
include(DIREDES.'graph.inc');
$TituloGraph = '';
$TipoGraph = mb_strtoupper(str_replace('*', 'P,C,R,G', (($_GRAPH[0]=='')?'*':$_GRAPH[0]) ));
if( isset($_THCOLSPAN[0]) ){
list(,,$TituloCol) = explode(',',$_THCOLSPAN[count($_THCOLSPAN)-1]);
}else{
$TituloCol = $_Form[$_TotalColIzq-1][0];
}
$DimVar = array();
if( $_GRAPH[6]!='' ){
$tmp = explode(',',$_GRAPH[6]);
for( $n=0; $n<count($tmp); $n++ ){
list($k,$v) = explode('=',$tmp[$n]);
$k = trim($k);
if( $k[0]=='$' ) $k = mb_substr($k,1);
$v = trim($v);
if( $v[0]==mb_substr($v,-1) && ($v[0]=="'" || $v[0]=='"') ) $v = mb_substr($v,1,-1);
$DimVar[trim($k)] = trim($v);
}
}
if( $_GRAPH[1]!='' ) $TituloFila = $_GRAPH[1];
if( $_GRAPH[2]!='' ) $TituloCol = $_GRAPH[2];
if( eSubstrCount($TipoGraph,'P')>0 ) $xGraphP = eGraph( 'P', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar );
if( eSubstrCount($TipoGraph,'C')>0 ) $xGraphC = eGraph( 'C', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar );
$TituloCol2 = $_Form[0][0];
if( !isset($_THCOLSPAN[0]) && count($_ROWSOP)==0 ){
$_ROWSOP = array();
for( $n=0; $n<count($_Form)-1; $n++ ) $_ROWSOP[$n] = 'C';
$_ROWSOP[count($_Form)-1] = '+';
}
if( $_GRAPH[3]!='' ) $TituloCol2 = $_GRAPH[3];
if( eSubstrCount($TipoGraph,'R')>0 ) $xGraphR = eGraph( 'R', $usuCursor, $_Form, $_ROWSOP, $TituloGraph, $TituloCol2, $TituloFila, '', $DimVar );
if( $_GRAPH[4]!='' ) $TituloCol = $_GRAPH[4];
$TituloLeyenda = ''; if( $_GRAPH[5]!='' ) $TituloLeyenda = trim($_GRAPH[5]);
if( eSubstrCount($TipoGraph,'G')>0 ) $xGraphG = eGraph( 'G', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, $TituloLeyenda, $DimVar );
$xGraph = array( $xGraphP, $xGraphC, $xGraphR, $xGraphG );
$xGraphSi = 0;
for( $n=0; $n<count($xGraph); $n++ ){
$xGraphSi += (($xGraph[$n][0]!='') ? 1:0);
}
if( $xGraphSi ) echo '<table border=0 style="background:transparent" id=_GraphSite>';
$Ancho = 0; $TCol = 0;
echo '<tr>';
for( $n=0; $n<count($xGraph); $n++ ){
if( $xGraph[$n][0]!='' ){
if( $xGraph[$n][1] + $Ancho < (SESS::$_pxW_-15-15-10) ){
$TCol++;
$Ancho += $xGraph[$n][1];
echo '<td align=center valign=top>'.$xGraph[$n][0].'</td>';
$xGraph[$n][0] = '';
}
}
}
echo '</tr>';
for( $i=0; $i<2; $i++ ){
$Ancho = 0;
for( $n=0; $n<count($xGraph); $n++ ){
if( $xGraph[$n][0]!='' ){
if( $xGraph[$n][1] + $Ancho < (SESS::$_pxW_-15-15-10) ){
$Ancho += $xGraph[$n][1];
echo "<tr><td align=center valign=top colspan={$TCol}>".$xGraph[$n][0].'</td></tr>';
$xGraph[$n][0] = '';
}
}
}
}
if( $xGraphSi ) echo '</table>';
}
echo '</div></center>';
echo '</BODY></HTML>';
$Fichero = '../_tmp/log/'.$_CdGsExpFile.'.htm';
file_put_contents($Fichero,ob_get_contents());
_DownloadEnd( $Fichero, eScript($_DownloadPath).$_CdGsExpFile.'.zip' );
eEnd();
function BuscaConAlias( $txt, &$Campos ){
global $_Form, $HaySelect, $FormDel, $_DBGROUPBY;
if( mb_strlen($txt) == 0 ) return $txt;
$SubSelect = array(); $n=0;
while( ( eSubstrCount( mb_strtoupper($txt), ' IN(' ) > 0 || eSubstrCount( mb_strtoupper($txt), ' IN (' ) > 0 ) && eSubstrCount( $txt, ')' )>0 ){
$i = max( mb_strpos( mb_strtoupper($txt), ' IN(' ), mb_strpos( mb_strtoupper($txt), ' IN (' ) );
if( $i > -1 ){
$f = mb_strpos( mb_strtoupper($txt), ')', $i );
$SubSelect[$n] = mb_substr( $txt, $i, $f-$i+1 );
$txt = str_replace( $SubSelect[$n], '{#SubSelect#'.$n.'}', $txt );
}
$n++;
}
$txt = trim($txt);
if( $txt[0]=='(' ) $txt = '( '.mb_substr($txt,1);
$txt = _FieldInWhere( $txt, true );
if( !$HaySelect ){
if( count($SubSelect)>0 ) for($n=0; $n<count($SubSelect); $n++) $txt = str_replace( '{#SubSelect#'.$n.'}', $SubSelect[$n], $txt );
return $txt;
}
$TipoCondi = array( '<>','>=','<=','!=','=','>','<',' like',' is ',' ' );
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
if( trim($txt)!='' && mb_substr(trim($txt),0,1) !='(' && mb_substr(trim($txt),1,1)!='.' ){
if( mb_substr(trim($txt),0,7) == 'extend(' ){
$txt = str_replace( 'extend(', 'extend( A.', $txt );
}else if( mb_substr(trim($txt),0,9) == 'group by ' ){
}else{
$txt = ' A.'.trim($txt);
}
}
if( count($SubSelect)>0 ) for($n=0; $n<count($SubSelect); $n++) $txt = str_replace( '{#SubSelect#'.$n.'}', $SubSelect[$n], $txt );
$txt = str_replace( 'A.(', '(', $txt );
return rtrim($txt);
}
function OrdenConAlias( $txt, $HaySelect, &$Campos, $FormDel=NULL ){
global $_COL_, $_Form;
$tmp = explode( ' ', trim($txt) );
if( is_numeric( $tmp[0] ) ) return $txt;
list( $txt, $GroupBy ) = explode(' group by ',$txt);
if( trim($GroupBy)!='' ) $GroupBy = ' group by '.$GroupBy;
if( eSubstrCount( $txt, '*' ) > 0 ){
$cTmp = explode( ',', $Campos );
$tmp = explode( ' ', trim($txt) );
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i][0] == '*' ){
$txt = str_replace( $tmp[$i], $cTmp[$_COL_], $txt );
}
}
}else if( $HaySelect && $txt != '' ){
$stxt = '';
$tmp = explode( ',', str_replace('  ',' ',$txt) );
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $i > 0 ) $stxt .= ', ';
if( eSubstrCount( $tmp[$i], '.' ) == 0 ){
if( eSubstrCount( $tmp[$i], ' ' ) == 0 ){
if( in_array( $tmp[$i], $FormDel ) ){
$stxt .= 'A.'.$tmp[$i];
}else{
list( $p1, $p2 ) = explode(' ',$tmp[$i]);
if( !is_numeric($p1) ){
if( eSubstrCount( $Campos, '.'.$tmp[$i] ) > 0 ){
$stxt .= mb_substr( $Campos, mb_strpos($Campos,'.'.$tmp[$i])-1, 2 ).$tmp[$i];
}else{
$stxt .= 'A.'.$tmp[$i];
}
}
}
}else{
list( $sNombre, $sAlias ) = explode( ' ', $tmp[$i] );
if( mb_strtoupper($sAlias)!='ASC' && mb_strtoupper($sAlias)!='DESC' ){
$stxt .= trim($sAlias);
}else{
$stxt .= 'A.'.$sNombre.' '.$sAlias;
}
}
}else{
$stxt .= $tmp[$i];
}
$txt = $stxt;
}
}
if( trim($Campos) != '*' ){
$DimAlias = array();
for( $i=0; $i<count($_Form); $i++ ){
$tmp2 = explode( ' ', trim($_Form[$i][1]) );
$DimAlias[trim($tmp2[count($tmp2)-1])] = 'X';
}
$stxt = $txt.' ';
$stxt = preg_replace('/ DESC /i',' ',$stxt);
$stxt = preg_replace('/ ASC /i',' ',$stxt);
$stxt = preg_replace('/ DESC, /i',', ',$stxt);
$stxt = preg_replace('/ ASC, /i',', ',$stxt);
if( preg_match('/ LIMIT /iu',$stxt) ){
$stxt = preg_replace('/ LIMIT /i',' LIMIT ',$stxt);
list( $stxt ) = explode(' LIMIT ',$stxt);
}
$stxt = trim($stxt);
$tmp = explode(',',$stxt);
for( $i=0; $i<count($tmp); $i++ ){
$tmp2 = explode( ' ', trim($tmp[$i]) );
$xAlias = trim($tmp2[count($tmp2)-1]);
$tmp2[0] = trim($tmp2[0]);
if( mb_substr($tmp2[0],0,7)=='decode(' ){
for( $p=$i+1; $p<count($tmp); $p++ ){
if( mb_substr(trim($tmp[$p]),-1)==')' ){
$i = $p;
break;
}
}
continue;
}
if( !is_numeric( $tmp2[0] ) ){
if( $HaySelect ){
if( $tmp2[0]!= '' && eSubstrCount( trim($Campos).',', $tmp2[0].',' ) == 0 && eSubstrCount( ' '.trim($Campos).',', ' '.$tmp2[0].',' ) == 0 ){
if( $DimAlias[$xAlias] != 'X' ) $Campos .= ','.$tmp2[0];
}
}else{
if( $tmp2[0]!= '' && eSubstrCount( ','.trim($Campos).',', ','.$tmp2[0].',' ) == 0 && eSubstrCount( '('.trim($Campos).',', ','.$tmp2[0].',' ) == 0 ){
if( $DimAlias[$xAlias] != 'X' ) $Campos .= ','.$tmp2[0];
}
}
}
}
}
$txt = $txt.$GroupBy;
if( eSubstrCount( $txt, ' ') > 0 ){
$tmp = explode(',',$txt);
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( eSubstrCount( $tmp[$i], ' ') > 0 ){
$tmp2 = explode(' ',$tmp[$i]);
if( mb_strtoupper($tmp2[1])!='ASC' && mb_strtoupper($tmp2[1])!='DESC' ) $tmp[$i] = $tmp2[1];
}
}
$txt = '';
for( $i=0; $i<count($tmp); $i++ ){
if( $txt!='' ) $txt .= ',';
$txt .= $tmp[$i];
}
}
return $txt;
}
function GetCampos( &$Campos ){
global $_Form;
for( $n=0; $n<count($_Form); $n++ ){
if( !empty($Campos) ) $Campos .= ', ';
$Campos .= $_Form[$n][1];
}
}
function qGetSelect(){
global $_Form;
$Campos = '';
for( $n=0; $n<count($_Form); $n++ ){
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
function _QSortMultiArray( &$array, $num=0, $order='ASC', $Tipo='C' ){
$GLOBALS['_SortNumCol'] = $num;
$GLOBALS['_SortOrderUp'] = ($order!='ASC');
switch( $Tipo ){
case 'F4':
usort( $array, '_SortFechas');
return;
case '+':  case '-': case '*':
case '+,': case '-,':
case '0': case 'P4':
usort( $array, '_SortNormal');
return;
default:
usort( $array, '_SortToUpper');
return;
}
}
function gsCambiaComa( $Valor ){
if( eSubstrCount( $Valor, '(' ) == 0 ) return $Valor;
$txt = '';
$Cambiar = false;
for( $n=0; $n<mb_strlen($Valor); $n++ ){
$c = mb_substr($Valor,$n,1);
if( $c == '(' ) $Cambiar = true;
if( $c == ')' ) $Cambiar = false;
$txt .= ( $Cambiar && $c==',' ) ? '&#44;' : $c;
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
for( $n=0; $n < count($DimOrden); $n++ ){
if( !empty($_Orden) ) $_Orden .= ',';
$_Orden .= 'A.'.trim($DimOrden[$n]);
}
}
function eAddShowFilter( $Condi, $Antes=true, $MaxRows=null, $HV=null ){
global $_AddShowFilter, $_AddShowFilterTop, $_RowsMaxShowFilter, $_ClearShowFilter, $_OrientationShowFilter, $_SHOWFILTER;
if( $Antes===2 ){
$_ClearShowFilter = true;
$Antes = true;
}
if( is_array( $Condi ) ){
$_AddShowFilter = $Condi;
}else{
$_AddShowFilter[] = $Condi;
}
$_AddShowFilterTop = $Antes;
if( $MaxRows!=null ) $_RowsMaxShowFilter = $MaxRows;
if( $HV!=null ) $_OrientationShowFilter = mb_strtoupper($HV);
$_SHOWFILTER = true;
}
function eDelShowFilter( $Campos ){
global $_PDFLABELHIDDEN, $_SHOWFILTER;
if( trim($Campos)=='*' ){
foreach( $_POST as $k=>$v ) $_PDFLABELHIDDEN[$k] = 'NOTTOSHOW';
foreach( $_GET as $k=>$v ) $_PDFLABELHIDDEN[$k] = 'NOTTOSHOW';
$_SHOWFILTER = false;
}else{
$tmp = explode(',',$Campos);
for( $n=0; $n<count($tmp);$n++ ){
$_PDFLABELHIDDEN[trim($tmp[$n])] = 'NOTTOSHOW';
}
}
}
function _GetForm( $sModo, $File, &$_Form ){
include_once(DIREDES.'getform.inc');
}
function PintaCondiciones( $_DBADDFILTER ){
if( $GLOBALS['_ISUBLIST'] ) return array();
global $_PDFTH, $_Form, $_TIPTH, $_AddShowFilter, $_AddShowFilterTop, $_RowsMaxShowFilter, $_ClearShowFilter, $_PDFLABELHIDDEN;
global $_RowsMaxShowFilter, $_OrientationShowFilter, $DimDBRange, $__Lng, $_LABELCONDITION, $_CHANGEFILTER, $_PSCRIPT, $_NOTITLE;
$sql = trim($_DBADDFILTER);
eDelShowFilter( '_ReportAll,_ReportCol,_ReportRow, _ReportAgeRange, _ORDEN_, _PDFBREAKPAGE, _gs_formato_' );
if( $_PSCRIPT!='' ){
global $_SourceScript;
$File = mb_substr($_PSCRIPT,2);
$tmp = explode('/',$File);
if( eSubstrCount($_SourceScript,$tmp[count($tmp)-1])==0 && eIsHTML() ) _GetForm( $_PSCRIPT[0], $File, $_Form );
}
for( $n=0; $n<count($DimDBRange); $n++ ){
$_PDFLABELHIDDEN[$DimDBRange[$n][4]] = 'NOTTOSHOW';
$_PDFLABELHIDDEN[$DimDBRange[$n][5]] = 'NOTTOSHOW';
}
$_PDFCONDITION = array();
if( $_GET['_PSCRIPT']!='' ){
list($sOp,$sScr) = explode(':',$_GET['_PSCRIPT']);
_OpenDF( $_PDFCONDITION );
}
foreach( $_PDFLABELHIDDEN as $k=>$l ){
$v = '';
if( $_POST[$k]!='' ) $v = $_POST[$k];
if( $_GET[$k]!='' ) $v = $_GET[$k];
if( $v[0]=='"' || $v[0]=="'" ) $v = mb_substr($v,1,-1);
if( $v<>'' && mb_strtoupper($_PDFCONDITION[$k])<>'NOTTOSHOW' ){
$_PDFCONDITION[$k] = array( $l, $v );
}
}
foreach( $_POST as $k=>$v ){
if( $v<>'' ){
if( mb_strtoupper($_PDFLABELHIDDEN[$k])=='NOTTOSHOW' ) continue;
if( mb_substr($k,0,7)=='_INPUT_' ) $k = mb_substr($k,7);
$_PDFCONDITION[$k][1] = $v;
}
}
global $_oFILTER;
if( $_oFILTER!='' ){
$_oFILTER = str_replace(' and ',' AND ',$_oFILTER);
$Dim = explode(' AND ',$_oFILTER);
for( $n=0; $n<count($Dim); $n++ ){
list( $k, $v ) = explode('=',$Dim[$n]);
$k = trim($k);
$v = trim($v);
$_GET[$k] = $v;
if( $v[0]=='"' || $v[0]=="'" ) $v = mb_substr($v,1,-1);
if( $v<>'' && mb_strtoupper($_PDFCONDITION[$k])<>'NOTTOSHOW' ){
$_PDFCONDITION[$k][1] = $v;
}
list( $k ) = explode(' ',trim($k));
if( $v<>'' && mb_strtoupper($_PDFCONDITION[$k])<>'NOTTOSHOW' ){
if( $_LABELCONDITION[$k]!='' ) $k = $_LABELCONDITION[$k];
if( $_PDFCONDITION[$k]=='' ) $_PDFCONDITION[$k] = array( $k, $v );
}
}
}
if( $_ClearShowFilter ) $_PDFCONDITION = array();
$_DimCondicion = array();
if( count($_AddShowFilter) > 0 ) if( $_AddShowFilterTop ) $_DimCondicion = $_AddShowFilter;
$_DimChangeFilter = array();
foreach( $_PDFCONDITION as $k=>$v ){
if( mb_strtoupper($_PDFLABELHIDDEN[$k])=='NOTTOSHOW' ) continue;
$xLabel = trim(strip_tags($v[0]));
$Valor = trim($v[1]);
if( $Valor=='' ) continue;
for( $n=0; $n<count($_Form); $n++ ){
if( $_Form[$n][1]==$k ){
$xLabel = trim($_Form[$n][0]);
if( $_PDFTH[$n]!='' ) $xLabel = $_PDFTH[$n];
if( $_Form[$n][3]=='C' ){
if( $Valor=='S' ) $Valor = $__Lng[41];
if( $Valor=='N' ) $Valor = $__Lng[42];
if( $Valor=='<>S' ) $Valor = '<>'.$__Lng[41];
}
if( $_LABELCONDITION[$_Form[$n][1]]!='' ) $xLabel = $_LABELCONDITION[$_Form[$n][1]];
break;
}
}
if( $_PDFLABELHIDDEN[$k]!='' ) $xLabel = $_PDFLABELHIDDEN[$k];
if( $xLabel=='' ){
if( $k[0]=='_' ) continue;
$xLabel = _GetLabel( $k );
if( $xLabel=='' ) continue;
}
if( $xLabel[0]=='<' && eSubstrCount( $xLabel, '<' ) != eSubstrCount( $xLabel, '>' ) ) $xLabel = trim(mb_substr($xLabel,1));
if( $xLabel[0]==',' || $xLabel[0]=='+' ) $xLabel = trim(mb_substr($xLabel,1));
if( is_numeric($xLabel[0]) ) $xLabel = trim(mb_substr($xLabel,1));
if( $xLabel[0]==']' ) $xLabel = trim(mb_substr($xLabel,1));
$Etiqueta = eStrUpper($xLabel);
$Etiqueta = str_replace('&nbsp;',' ',$Etiqueta);
$Etiqueta = str_replace('&NBSP;',' ',$Etiqueta);
$Etiqueta = str_replace('<BR>',' ',$Etiqueta);
$Etiqueta = str_replace('<br>',' ',$Etiqueta);
$Etiqueta = str_replace('<Br>',' ',$Etiqueta);
$Etiqueta = str_replace('<bR>',' ',$Etiqueta);
$Valor = DivideValor( $Valor, $k );
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
if( count($_AddShowFilter) > 0 ){
if( !$_AddShowFilterTop ) $_DimCondicion = array_merge( $_DimCondicion, $_AddShowFilter );
}
if( count($_DimCondicion)==0 ) return array();
if( function_exists('eChangeListCondition') ){
$_DimCondicion = eChangeListCondition( $_DimCondicion );
}
echo '<span style="width:100%;text-align:left"'.(($_NOTITLE)?' class=CondiNoTitle':'').'>';
echo '<table id=CONDICIONES cellspacing=0 cellpadding=0 border=0>';
if( $_RowsMaxShowFilter > -1 && count($_DimCondicion) > $_RowsMaxShowFilter ){
$t = count($_DimCondicion);
$c = ceil($t/$_RowsMaxShowFilter);
$s = ceil($t/$c);
echo '<TR><TH colspan='.$c.'>'.$__Lng[43].':';
$n = 0; $p = 0; $rr = 0;
if( $_OrientationShowFilter!='V' ){
while( $rr<count($_DimCondicion) ){
echo '<TR>';
for( $i=0; $i<$c; $i++ ){
if( $_DimCondicion[$p]!='' ){
if( $i==0 ){
echo '<TD><LI>'.$_DimCondicion[$p].'</LI>';
}else{
echo '<TD style="padding-left:12px"><LI>'.$_DimCondicion[$p].'</LI>';
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
if( $_DimCondicion[$p]=='' ) break;
if( $i==0 ){
echo '<TD><LI>'.$_DimCondicion[$p].'</LI>';
}else{
echo '<TD style="padding-left:12px"><LI>'.$_DimCondicion[$p].'</LI>';
}
$p++;
}
}
}
}else{
echo '<TR><TH>'.$__Lng[43].':';
echo '<TR><TD>';
for( $n=0; $n<count($_DimCondicion); $n++ ){
if( $_CHANGEFILTER[$_DimChangeFilter[$n]][0]!='' ){
$Sql = $_CHANGEFILTER[$_DimChangeFilter[$n]][0];
if( mb_substr($Sql,-1)==';' ) $Sql = trim(mb_substr($Sql,0,-1));
$Dim = array();
if( mb_substr($Sql,-1)!=')' ){
$tmp = explode(' ',$Sql);
if( mb_strtoupper(trim($tmp[0]))=='SELECT' ){
if( $_CHANGEFILTER[$_DimChangeFilter[$n]][1]!='' && mb_strtoupper($_CHANGEFILTER[$_DimChangeFilter[$n]][1])=='TRUE' ) $Dim[] = array('','&nbsp;');
qQuery($Sql,$p1);
while( $r=qRow($p1) ) $Dim[] = array( $r[0], $r[1] );
}else{
$tmp = explode(';',$Sql);
for( $i=0; $i<count($tmp); $i++ ) $Dim[] = explode(',',$tmp[$i]);
}
}else{
list($tmp) = explode('(',$Sql);
$Dim = call_user_func( trim($tmp) );
}
echo '<script type="text/javascript">';
echo 'var _DIM_'.$_DimChangeFilter[$n].'={'; for( $i=0; $i<count($Dim); $i++ ) echo (($i==0)?'':',')."'{$Dim[$i][0]}':'{$Dim[$i][1]}'"; echo '};';
echo '</script>';
echo '<LI onclick=_ChangeFilter("'.$_DimChangeFilter[$n].'")>'.$_DimCondicion[$n].' <img src="g/t_op_update.gif"></LI>';
}else{
echo '<LI>'.$_DimCondicion[$n].'</LI>';
}
}
}
echo '</TABLE>';
echo '</span>';
return $_DimCondicion;
}
function eShowFilter( $Condi ){
if( gettype($Condi)!='array' ) return;
if( count($Condi)==0 ) return;
echo '<style>#TITULO { PADDING-BOTTOM: 2px; }</style>';
echo '<span style="width:100%;text-align:left;">';
echo '<table id=CONDICIONES cellspacing=0 cellpadding=0 border=0>';
if( count($Condi[0])==1 ){
echo '<TR><TH colspan=2>'.$Condi[0][0].':';
$i = 1;
}else{
echo '<TR><TH colspan=2>'.$GLOBALS['__Lng'][43].':';
$i = 0;
}
echo '<TR><TD>';
for( $n=$i; $n<count($Condi); $n++ ){
if( eSubstrCount( '<>=*', $Condi[$n][1][0] ) == 0 ){
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
echo '<LI>'.$Condi[$n][0].'<span style="margin-left:7px;white-space:normal;'.$Condi[$n][2].'">'.$Condi[$n][1].'</span></LI>';
}
echo '</TABLE>';
echo '</span>';
}
function _OpenDF( &$Condi ){
global $_PDFLABELHIDDEN;
list($sOp,$sScr) = explode(':',$_GET['_PSCRIPT']);
$DimOpcion = array( $sOp );
$Form = array();
$OnCampos = false;
$ElPuntoEsRem = true;
$_DimEDF = @OpenDF($sScr,0);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF( $buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line ) ){
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
IncluirEnForm( 'F', $sOp, $buffer, $Form, $_DEFAUX, 1 );
}else if( $TipoEntrada=='_LANGUAGE' ){
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
}
}
}
for( $n=0; $n<count($Form); $n++ ){
if( trim($_POST[$Form[$n][1]])!='' && $_PDFLABELHIDDEN[$Form[$n][1]]!='NOTTOSHOW' ){
$Condi[$Form[$n][1]] = array( $Form[$n][0], $_POST[$Form[$n][1]] );
}
}
}
function eImgName( $NmField, $Prefijo='', $Titulo='', $OnClick='' ){
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
function eImgDocType( $NmField, $Titulo='', $OnClick='' ){
global $_vF, $_pF;
$NmImg = trim($_vF[ $_pF[ $NmField ] ]);
$tmp = explode('.',$NmImg);
if( $Titulo!='' ) $Titulo = ' title="'.str_replace('"',"''",$Titulo).'"';
if( $OnClick!='' ) $OnClick = ' OnClick='.str_replace('"','"',$OnClick).';eClearEvent();';
return '<img src="g/l_d_'.$tmp[count($tmp)-1].'.gif"'.$OnClick.$Titulo.'>';
}
function _DocVE( $NmField, $NmFunc, $Titulo ){
global $_UPLOADFILE, $_vF, $_pF, $_DBSERIAL, $_PosSerial;
$NmImg = $_vF[ $_pF[ $NmField ] ];
$tmp = explode('.',$NmImg);
if( $_UPLOADFILE[$NmField]['NOMBRE'] == $_DBSERIAL[1] ){
$NomFile = $_UPLOADFILE[$NmField][oDIR].'/'._NmFileConPrefijo( $_vF[$_PosSerial].'.'.$tmp[count($tmp)-1], $_UPLOADFILE[$NmField]['PREFIJO'] );
}else{
$NomFile = $_UPLOADFILE[$NmField][oDIR].'/'._NmFileConPrefijo( $NmImg, $_UPLOADFILE[$NmField]['PREFIJO'] );
}
$NomFile = mb_strtolower($NomFile);
return '<img src="g/l_d_'.$tmp[count($tmp)-1].'.gif" onclick='.$NmFunc.'("'.$NomFile.'") title="'.$Titulo.'">';
}
function eDocView( $NmField ){
global $__Lng;
return _DocVE( $NmField, 'eVD', $__Lng[44] );
}
function eDocEdit( $NmField ){
global $__Lng;
return _DocVE( $NmField, 'eUD', $__Lng[45] );
}
function _CalcFormato($Formato, $n){
global $_ALIGN, $_NOZERO;
$Formato = str_replace( '&#44;',',',trim($Formato) );
if( mb_strtoupper($Formato)=='IMG' || mb_strtoupper($Formato)=='ICON' ){
$_ALIGN[$n] = ' id=c';
$Formato = mb_strtoupper($Formato);
}else if( !empty($Formato) && mb_strlen($Formato)<4 ){
$Formato = str_replace( 'I','' ,$Formato );
$Formato = str_replace( 'C','c',$Formato );
$Formato = str_replace( 'D','d',$Formato );
$Formato = str_replace( 'L','' ,$Formato );
$Formato = str_replace( 'R','d',$Formato );
$Formato = str_replace( 'B','b',$Formato );
if( eSubstrCount( $Formato, 'b' ) == 1 ){
$_NOZERO[$n] = 'S';
$_ALIGN[$n] = ' id=d';
$Formato = str_replace('b','',$Formato);
}
if( eSubstrCount( $Formato, 'c' ) == 1 ){
$_ALIGN[$n] = ' id=c';
$Formato = str_replace('c','',$Formato);
}else if( eSubstrCount( $Formato, 'd' ) == 1 ){
$_ALIGN[$n] = ' id=d';
$Formato = str_replace( 'd','',$Formato);
}
if( eSubstrCount( $Formato, 'M' ) == 1 ){
$Formato = str_replace('M','',$Formato);
$_ALIGN[$n] = ' id=d';
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.")";
}else{
$Formato = "eNumberFormat(#,0)";
}
}else if( eSubstrCount( $Formato, 'N' ) == 1 ){
$Formato = str_replace('N','',$Formato);
$_ALIGN[$n] = ' id=d';
if( mb_strlen($Formato)==1 ){
$Formato = "eNumberFormat(#,".$Formato.")";
}else{
$Formato = "eNumberFormat(#,0)";
}
}
if( eSubstrCount( '0123456789', $Formato ) == 1 ){
$_ALIGN[$n] = ' id=d';
$Formato = "eNumberFormat(#,".$Formato.")";
}
}
return $Formato;
}
function eIsPDF(){
return( $_GET['_gs_formato_'][0]=='P' || $_POST['_gs_formato_'][0]=='P' );
}
function eIsXLS(){
return( $_GET['_gs_formato_']=='X' || $_POST['_gs_formato_']=='X' );
}
function eIsXML(){
global $_XMLASXLS;
return( $_GET['_gs_formato_']=='M' || $_POST['_gs_formato_']=='M' || (isset($_XMLASXLS) && $_XMLASXLS==true && ($_GET['_gs_formato_']=='X' || $_POST['_gs_formato_']=='X') ));
}
function eIsMDB(){
return( $_GET['_gs_formato_']=='A' || $_POST['_gs_formato_']=='A' );
}
function eIsTXT(){
return( $_GET['_gs_formato_']=='T' || $_POST['_gs_formato_']=='T' );
}
function eIsCSV(){
return( $_GET['_gs_formato_']=='V' || $_POST['_gs_formato_']=='V' );
}
function eIsHTML(){
$v='';
if( isset($_GET['_gs_formato_']) ) $v = $_GET['_gs_formato_'];
if( isset($_POST['_gs_formato_']) ) $v = $_POST['_gs_formato_'];
return( $v!='X' && $v!='P' && $v!='A' && !eIsPaging() );
}
function eIsPaging(){
return( $_GET['_REG_']!='' );
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
$GLOBALS[$k] = unserialize( rtrim($v) );
}
}
}
function ePutFileVar( $txt='' ){
global $OriFichero, $_User;
$df = fopen( '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.uv", 'w' );
fwrite( $df, "_GET:\n" );
foreach( $_GET as $k=>$v ) fwrite( $df, '|'.$k.'|'.$v."\n" );
fwrite( $df, "_POST:\n" );
foreach( $_POST as $k=>$v ) fwrite( $df, '|'.$k.'|'.$v."\n" );
if( $txt!='' ){
fwrite( $df, "GLOBALS:\n" );
$tmp = explode(',',$txt);
for( $n=0; $n<count($tmp); $n++ ) fwrite( $df, '|'.$tmp[$n].'|'.serialize($GLOBALS[$tmp[$n]])."\n" );
}
fclose( $df );
}
function _DivideCampos( $sql ){
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
$Deli = array( 'AND', 'OR' );
$Cond = array( 'MATCHES', 'LIKE', 'IN', 'IS', '>', '<', '<>', '!=', '>=', '<=', '=' );
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
function _FieldInWhere( $txt, $PonAlias=false ){
$EsUnaCadena = false;
$TipoCadena = '';
$uc = '';
$Campo = '';
$DimCampos = array();
for( $n=0; $n<mb_strlen($txt); $n++ ){
$c = mb_substr($txt,$n,1);
switch( $c ){
case ',':
if( $EsUnaCadena ) break;
$DimCampos[] = array( $Campo, 'F', $n );
$Campo='';
$c = '';
break;
case ')':
$Campo = trim($Campo);
if( $Campo!='' ){
if( $Campo[0]=='"' || $Campo[0]=="'" ){
$DimCampos[] = array( $Campo, 'V', $n );
}else{
$DimCampos[] = array( $Campo, 'F', $n );
}
}
$Campo='';
$c = '';
break;
case '(':
if( $EsUnaCadena ) break;
$Campo = trim($Campo);
if( $Campo!='' ){
$DimCampos[] = array( $Campo, 'Func-3', $n );
}else{
if( $DimCampos[count($DimCampos)-1][1] != 'C' ) $DimCampos[count($DimCampos)-1][1] == 'Func';
}
$Campo='';
$c = '';
break;
case ' ': case mb_chr(9): case CHR13:
if( $EsUnaCadena ) break;
$Campo = trim($Campo);
if( $Campo!='' ){
_FieldInWhereTipo( $Campo, $DimCampos, $n, '' );
$Campo='';
$c = '';
}
break;
case '=': case '>': case '<': case '!':
if( $EsUnaCadena ) break;
if( eSubstrCount( '<>=!', $uc ) > 0 ){
$uc = '';
$c = '';
$Campo='';
break;
}
if( $Campo!='') {
$DimCampos[] = array( $Campo, 'F', $n );
}else{
$DimCampos[count($DimCampos)-1][1] == 'F';
}
if( eSubstrCount( '<>=!', $uc )==0 && eSubstrCount( '<>=!', mb_substr($txt,$n+1,1) )==0 ){
$DimCampos[] = array( $c, 'C', $n );
$Campo='';
$uc = '';
$c = '';
break;
}
if( eSubstrCount( '<>=!', $uc )==0 && eSubstrCount( '<>=!', mb_substr($txt,$n+1,1) )>0 ){
$DimCampos[] = array( $c.mb_substr($txt,$n+1,1), 'C', $n );
$uc=''; $c='';
$Campo='';
$n++;
break;
}
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
if( trim($Campo)!='' ) _FieldInWhereTipo( $Campo, $DimCampos, $n, '' );
$t = -1;
for( $n=0; $n<count($DimCampos); $n++ ) if( $DimCampos[$n][1]=='F' ) $t++;
$Resultado = ( $t==-1 ) ? array() : array($t);
for( $n=0; $n<count($DimCampos); $n++ ){
if( mb_strtoupper($DimCampos[$n][0])=='NULL' ){
$DimCampos[$n][1] = 'C';
}else if( $DimCampos[$n][1]=='F' ){
$Resultado[$t--] = array( trim($DimCampos[$n][0]), $DimCampos[$n][2]-mb_strlen(trim($DimCampos[$n][0])) );
}
}
if( $PonAlias ){
for( $n=0; $n<count($Resultado); $n++ ){
if( $Resultado[$n][0]<>'' && eSubstrCount($Resultado[$n][0],'.')==0 ){
if( mb_strtoupper($Resultado[$n][0])=='NOT' || mb_substr(mb_strtoupper($Resultado[$n][0]),0,15)=='NOT{#SUBSELECT#' ){
$txt = mb_substr($txt,0,$Resultado[$n][1])   .    $Resultado[$n][0] . mb_substr($txt,$Resultado[$n][1]+mb_strlen($Resultado[$n][0]));
}else if( $Resultado[$n][0][0]=='"' || $Resultado[$n][0][0]=="'" || $Resultado[$n][0][0]=='{' ){
$txt = mb_substr($txt,0,$Resultado[$n][1])   .    $Resultado[$n][0] . mb_substr($txt,$Resultado[$n][1]+mb_strlen($Resultado[$n][0]));
}else if( is_numeric( $Resultado[$n][0] ) ){
$txt = mb_substr($txt,0,$Resultado[$n][1]) .      $Resultado[$n][0] . mb_substr($txt,$Resultado[$n][1]+mb_strlen($Resultado[$n][0]));
}else{
$txt = mb_substr($txt,0,$Resultado[$n][1]) .'A.'. $Resultado[$n][0] . mb_substr($txt,$Resultado[$n][1]+mb_strlen($Resultado[$n][0]));
}
}
}
return $txt;
}
return $Resultado;
}
function DivideValor( $Valor, $Campo ){
global $__Lng;
$Valor = str_replace( '&gt;', '>', $Valor );
$Valor = str_replace( '&lt;', '<', $Valor );
$Valor = str_replace( '||', ' o ', $Valor );
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
for( $n=1; $n<7; $n++ ){
$Valor = str_replace( "' and {$Campo}{".$n."}'", '{'.$n.'}', $Valor );
$Valor = str_replace( '" and '.$Campo.'{'.$n.'}"', '{'.$n.'}', $Valor );
}
$Valor = str_replace( '{1}', ' '.$__Lng[50].' >= ', $Valor );
$Valor = str_replace( '{2}', ' '.$__Lng[50].' <= ', $Valor );
$Valor = str_replace( '{3}', ' '.$__Lng[50].' <> ', $Valor );
$Valor = str_replace( '{4}', ' '.$__Lng[50].' > ' , $Valor );
$Valor = str_replace( '{5}', ' '.$__Lng[50].' < ' , $Valor );
$Valor = str_replace( '{6}', ' '.$__Lng[51].' '   , $Valor );
return ' '.$Condi.' '.$Valor;
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
function _GetLabel( $k ){
$xLabel = '';
$pScript = $GLOBALS['_PSCRIPT'];
if( mb_strtoupper(mb_substr($pScript,0,2))=='C:' ) $pScript = mb_substr($pScript,2);
if( mb_strtoupper(mb_substr($pScript,0,2))=='C:' ) $pScript = mb_substr($pScript,2);
$_DimEDF = file(eScript($GLOBALS['_FileDF']));
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
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
$_DimEDF = explode( "\n", gzuncompress(mb_substr($txt,5)) );
}else{
$_DimEDF = explode( "\n", $txt );
}
$txt = '';
}else{
$_DimEDF = file($pScript);
}
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
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
$tmp = str_replace('·',' ',$tmp);
$tmp = str_replace('<br>',' ',$tmp);
$tmp = str_replace('<BR>',' ',$tmp);
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
if( $tmp[0]=='¿' ){
list(,$tmp) = explode('?',$tmp);
$tmp = trim($tmp);
}
if( eSubstrCount($tmp,'@')>1 ){
global $_LANGUAGE, $_LngPublic;
for( $n=0; $n<count($_LANGUAGE); $n++ ) $tmp = str_replace( $_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $tmp );
foreach( $_LngPublic as $k=>$v ) $tmp = str_replace( $k, $v, $tmp );
}
return $tmp;
}
function eMessageBG( $eTexto, $eAccion, $sgMensage=2000, $eEXE='', $_MessageType='OK' ){
global $_CdGsExpFile, $_DownloadPath, $_CSS;
eInit();
eHTML();
?>
<STYLE>
<?PHP include( SESS::$_PathCSS."/{$_CSS}.css" ); ?>
body { background-image: url(""); }
</STYLE>
</HEAD><BODY>
<TABLE id='PAGINA' style='background:transparent' WIDTH=100% HEIGHT=100%>
<TR><TD align="center">
<DIV id="TABContainer" style="height:0px">
<TABLE id=BROWSE border=0 cellspacing=1px cellpadding=2px>
<TR><TH>
MENSAJE
</TD></TR>
<TR><TD class='Celda' style='padding:30px'>
No hay datos para generar el Informe
</TD></TR>
</TABLE>
</DIV>
</TD></TR>
</TABLE>
</BODY></HTML>
<?PHP
$Fichero = '../_tmp/log/'.$_CdGsExpFile.'.htm';
file_put_contents($Fichero,ob_get_contents());
_DownloadEnd( $Fichero, eScript($_DownloadPath).$_CdGsExpFile.'.zip' );
eEnd();
}
?>