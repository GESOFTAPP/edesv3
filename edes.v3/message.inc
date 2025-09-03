<?PHP
function eMessage($eTexto, $eAccion, $sgMensage=1000, $eEXE='', $_MessageType='OK'){
$eAccion = mb_strtoupper($eAccion);
global $__Lng;
if( eSubstrCount($eAccion, 'E')==0 ){
global $_WINCLOSE, $_DBINSERT, $_OkDBINSERT, $_AccionDIR, $_PERSISTENTVAR, $_PSOURCE, $_FORMBUTTONS, $_JSMESSAGE, $_JSINCLUDEFILE;
global $_EXTFORM, $_FORMACTION, $SubOp, $NomFile, $Opcion, $_SubModo, $OriFichero, $_gsObjeto;
global $_MSGANSWER, $_MSGANSWEROK, $_nSerial, $_FchXPg_, $_CLOSE_, $_STOP, $_HTMEND, $_PHPEND, $_JSEND, $_CSS, $_CSSADD, $__Enter;
global $_EMESSAGE, $_LOGANSWER, $_LOGFULLSTATUS, $_LOGFULLTYPE, $_TargetUrl, $_JSSTART;
}
$cssAdicional = '';
if( eSubstrCount($eAccion, '.')==1 ){
list($eAccion, $_CSSADD) = explode('.', $eAccion);
$_CSSADD = mb_strtolower($_CSSADD);
$cssAdicional = '<style>html, body{height:100%;}</style>';
}
global $_vF, $_Fila, $_nSerial, $_IdInsert, $_InsertId, $_IdRegistro;
foreach($_POST as $key=>$value) global ${$key};
foreach($_GET  as $key=>$value) global ${$key};
eLngLoad(DIREDES.'lng/message', '', 1);
if( $sgMensage=='' ) $sgMensage = 1000;
if( $sgMensage<100 ) $sgMensage = (float)$sgMensage*1000;
if( eSubstrCount($eAccion, 'L')>0 ) $sgMensage = 5000;
if( eSubstrCount(',A,B,M,', ",{$Opcion},")==0 ) $_HTMEND = $_PHPEND = $_JSEND = '';
$EsperaF10 = false;
$Opcion = $SubOp;
switch($Opcion){
case 'bR': case 'B': case 'bl':
$Opcion = 'b';
break;
case 'cR': case 'C': case 'cl':
$Opcion = 'c';
break;
case 'mR': case 'M': case 'ml':
$Opcion = 'm';
break;
case 'A':
$Opcion = 'a';
break;
}
if( empty($_EXTFORM) ){
if( empty($_FORMACTION) ){
$_AccionDIR = "{$NomFile}?{$_gsObjeto}{$Opcion}:{$OriFichero}";
}else{
if( gettype($_FORMACTION)=="array" ) $_FORMACTION = $_FORMACTION[1];
if( mb_strtoupper(mb_substr($_FORMACTION, mb_strlen($_FORMACTION)-4))=='.php' ) $_FORMACTION .= '?'.$SubOp.':';
$_AccionDIR = $_FORMACTION;
if( mb_substr($_AccionDIR,-2)=='()' || mb_substr($_AccionDIR,-3)=='();' ) $_AccionDIR = '';
}
}else{
if( $_FORMACTION=='' ){
$_AccionDIR = "{$NomFile}?F{$Opcion}:{$OriFichero}";
}
}
if( $_AccionDIR!='' && eSubstrCount($_AccionDIR, '&_PSOURCE')==0 ) $_AccionDIR .= "&_PSOURCE={$_PSOURCE}";
if( $_AccionDIR!='' && eSubstrCount($_AccionDIR, '&_FORMBUTTONS')==0 ) $_AccionDIR .= "&_FORMBUTTONS={$_FORMBUTTONS}";
if( $_AccionDIR!='' && $_PERSISTENTVAR!='' ) $_AccionDIR .= $_PERSISTENTVAR;
if( eSubstrCount($eAccion, 'E')==0 ){
$ClaseError = 'MESSAGE_OK';
}else{
$ClaseError = 'MESSAGE_ERROR';
}
if( eSubstrCount($eAccion, 'S')==1 ){
$_JSEND = '';
$_PHPEND = '';
}
$BorrarRegISubList = false;
$HistoryGo = false;
list($eTextoBak) = explode('|', $eTexto);
if( $eTextoBak[0]=='~' && mb_strlen($eTextoBak)<=4 ){
$eTexto = mb_substr($eTexto,1);
if( eSubstrCount($eTexto, '|')==1 ) list($eTexto, $TReg) = explode('|', $eTexto);
$_eTexto = $eTexto;
for($n=60; $n<80; $n++){
$__Lng[$n] = eAsciiToCode($__Lng[$n], 0);
}
if( $eTexto=='DR' ){
$BorrarRegISubList = true;
}
switch( $eTexto ){
case 'LE':
if( $TReg!='' ){
$HistoryGo = true;
$eTexto = str_replace('#2', eNumberFormat($GLOBALS['_DBLIMIT']), str_replace('#1', eNumberFormat($TReg), $__Lng[60]));
}else{
$eTexto = str_replace('#', eNumberFormat($GLOBALS['_DBLIMIT']), $__Lng[61]);
}
break;
case 'LEA':
if( $TReg!='' ){
$eTexto = str_replace('#2', eNumberFormat($GLOBALS['_DBLIMIT']), str_replace('#1', eNumberFormat($TReg), $__Lng[62]));
}else{
$eTexto = str_replace('#', eNumberFormat($GLOBALS['_DBLIMIT']), $__Lng[63]);
}
break;
case 'O':
$eTexto = str_replace('#', $TReg, $__Lng[64]);
break;
default:
$oTexto = $eTexto;
$DimMensaje = array(
'DR' =>$__Lng[65],
'NR' =>$__Lng[66],
'NRC'=>$__Lng[67],
'S'  =>$__Lng[68],
'U'  =>$__Lng[69],
'D'  =>$__Lng[70],
'R'  =>$__Lng[71],
'PDF'=>$__Lng[72],
'XLS'=>$__Lng[73],
'XML'=>$__Lng[81],
'TXT'=>$__Lng[80],
'MDB'=>$__Lng[74],
'ZIP'=>$__Lng[82],
'F1' =>$__Lng[75],
'F2' =>$__Lng[76],
'F3' =>$__Lng[77],
'F4' =>$__Lng[78]
);
$eTexto = $DimMensaje[$eTexto];
if( $oTexto=='D' ){
global $_DBBAKDELETE;
if( $_DBBAKDELETE ) $eTexto = $__Lng[79];
}
}
}
if( isset($_EMESSAGE) ) $eTexto = $_EMESSAGE;
global $_EMESSAGE, $_LOGANSWER, $_LOGFULLSTATUS, $_LOGFULLTYPE;
if( $_LOGFULLSTATUS && $_LOGFULLTYPE>=2 ) $_LOGANSWER["answer"] = $eTexto;
if( $_MSGANSWER[2]!='' ) $MsgOnClick = _InVar($_MSGANSWER[2]);
$_Time = $_MSGANSWER[3];
if( $_MessageType!='OK' ){
$_MSGANSWER = $_MSGANSWER[1];
}else{
$_MSGANSWER = $_MSGANSWER[0];
}
if( eSubstrCount($eAccion, 'H')>0 || $eAccion=="" ) eInit();
if( mb_strlen($_MSGANSWER)>0 && $_MSGANSWEROK ){
if( eSubstrCount($eAccion, 'E')>0 ){
$_MSGANSWER = '';
}else if( eSubstrCount($_MSGANSWER,'()')==1 && eSubstrCount($_MSGANSWER,' ')==0 ){
if( mb_substr($_MSGANSWER,-1)!=';' ) $_MSGANSWER .= ';';
$Linea = $_MSGANSWER;
$CadenaABuscar = '';
while( eSubstrCount($Linea,'{$')>0 && eSubstrCount($Linea,'}')>0 ){
$p = mb_strpos( $Linea, '{$' );
$tmp = mb_substr($Linea,$p,mb_strpos($Linea, '}')-$p+1);
$Variable = mb_substr($tmp,2,-1);
if( mb_substr($Variable,-1)==']' ){
list($Variable,$Indice) = explode('[',$Variable);
list($Indice) = explode(']',$Indice);
$Indice = trim($Indice);
if( $Indice[0]=="'" || $Indice[0]=='"' ) $Indice = mb_substr($Indice,1,-1);
if( $Indice=='' ) $Indice = 0;
$CadenaABuscar .= ''.$GLOBALS[$Variable][$Indice];
$Linea = str_replace($tmp, $GLOBALS[ $Variable ][$Indice], $Linea);
}else{
$CadenaABuscar .= ''.$GLOBALS[$Variable];
$Linea = str_replace($tmp, $GLOBALS[ $Variable ], $Linea);
}
}
$_MSGANSWER = $Linea;
$_MSG_ = '';
eval('$_MSG_ = '.$_MSGANSWER);
$_MSGANSWER = $_MSG_;
}else if( $_MSGANSWER[0]=='>' ){
include( eScript(mb_substr($_MSGANSWER,1)) );
eEnd();
}else{
$Linea = $_MSGANSWER;
$CadenaABuscar = '';
while( eSubstrCount($Linea,'{$')>0 && eSubstrCount($Linea,'}')>0 ){
$p = mb_strpos($Linea, '{$');
$tmp = mb_substr($Linea,$p,mb_strpos($Linea, '}')-$p+1);
$Variable = mb_substr($tmp,2,-1);
if( mb_substr($Variable,-1)==']' ){
list($Variable,$Indice) = explode('[',$Variable);
list($Indice) = explode(']',$Indice);
$Indice = trim($Indice);
if( $Indice[0]=="'" || $Indice[0]=='"' ) $Indice = mb_substr($Indice,1,-1);
if( $Indice=='' ) $Indice = 0;
$CadenaABuscar .= ''.$GLOBALS[$Variable][$Indice];
$Linea = str_replace($tmp, $GLOBALS[ $Variable ][$Indice], $Linea);
}else{
$CadenaABuscar .= ''.$GLOBALS[$Variable];
$Linea = str_replace($tmp, $GLOBALS[ $Variable ], $Linea);
}
}
$_MSGANSWER = $Linea;
}
}
global $OriFichero, $Opcion, $_WINTITLE;
if( $OriFichero=='' ){
$tmp = explode('edes.php?',$_SERVER['HTTP_REFERER']);
list($Opcion, $OriFichero) = explode(':',$tmp[1]);
$Opcion = mb_substr($Opcion,1);
}
if( $_GET['_SubmitHidden']==1 ){
eInit();
$url = str_replace(
array('FM:'.$OriFichero,'FA:'.$OriFichero,'FB:'.$OriFichero,'GM:'.$OriFichero,'GA:'.$OriFichero,'GB:'.$OriFichero,'&_SubmitHidden=1'),
array('Fm:'.$OriFichero,'Fa:'.$OriFichero,'Fb:'.$OriFichero,'Gm:'.$OriFichero,'Ga:'.$OriFichero,'Gb:'.$OriFichero,''),
$_SERVER['QUERY_STRING']
);
if( eSubstrCount($eAccion,'E')==0 ){
?>
<script type="text/javascript">
var W = window.frameElement.WOPENER;
W.SubmitError(true,"<?= eQuote($eTexto) ?>");
<?PHP
eContextPut("edes.php?{$url}");
?>
W.location.href = "edes.php?<?=$url.eContextAddUrl()?>";
</script>
<?PHP
}else{
?>
<script type="text/javascript">
var W = window.frameElement.WOPENER;
W.SubmitError(false, "<?= eQuote($eTexto) ?>");
W.eDisableButton(0);
top.eLoading(false,W);
top.eInfoError(W, "<?= eQuote($eTexto) ?>");
</script>
<?PHP
}
eEnd();
}
if( $_WINTITLE!='?' && $_WINTITLE!='' ){
$_TITLE = $_WINTITLE;
}else{
$_TITLE = SETUP::$System['ApplicationName'];
}
eHTML("{$_gsObjeto}:{$OriFichero}", $Opcion, $_TITLE);
if( $_CSSADD!='' ){
if( $_CSSADD[0]=='>' ){
echo '<style>'.$__Enter.mb_substr($_CSSADD, 1).'</style>';
}else{
$tmp = explode(',', $_CSSADD);
for($n=0; $n<count($tmp); $n++) echo "<LINK REL='stylesheet' HREF='".SESS::$_PathCSS."/"._InVar(trim($tmp[$n])).".css' TYPE='text/css'>".$__Enter;
}
}
echo $cssAdicional;
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
echo 'document.title = "MESSAGE";';
echo 'top.S.init(window,"all,message");';
include(DIREDES."binary.js");
echo 'var _CONTEXT='.eContextPK().";";
if( $_JSSTART!='' ) echo $_JSSTART;
if( !empty($eEXE) && $eEXE[0]=="<" ){
echo mb_substr($eEXE, 1);
$eEXE = "";
}
if( S::$runBackground>0 ){
echo 'S.infoBackground('.S::$runBackground.');';
echo 'top.frames["IEVENTSORCE"].location.href = top.S.urlAdd("edes.php?E:$info2plano.php&time='.time().'");';
}
if( isset($_ENV["SendSerialFile"]) && ($Opcion=="a" || $Opcion=="m") ){
global $_DBTABLE, $_IdRegistro;
$id = "-";
if( $Opcion=="a" ){
if( isset($_IdRegistro[$_DBTABLE]) ){
$id = $_IdRegistro[$_DBTABLE];
}else{
$id = $_IdRegistro[$_ENV['eDesDictionary'].$_DBTABLE];
}
}
?>
function asyncSetSerial(pk, serial){
if( pk.indexOf(",")>-1 ){
pk = pk.split(",");
}else{
pk = [pk];
}
for(let n=0; n<top.S.asynchroFile.length; n++){
if( top.S.asynchroFile[n][0]==null ){
continue;
}
if( pk.indexOf(top.S.asynchroFile[n][2].pk+"")==-1 ){
continue;
}
if( serial!="-" ){
top.S.asynchroFile[n][2].serial = serial;
}
}
top.S.upload();
}
asyncSetSerial("<?=$_POST["_FILE_ASYNCHRO_"]?>", "<?=$id?>");
<?PHP
}
echo '</SCRIPT>';
echo '</HEAD>';
if( SESS::$_D_!='' && SESS::$_D_!='D' && !$_gsCreate_ && eSubstrCount($eAccion, 'L')==0 ){
echo '<BODY class="BODYMESSAGE" style="margin:0px" onhelp="return false;"';
if( SESS::$_D_!='' && !($OriFichero[0]=="$" && SESS::$_D_<>"~") ) echo " oncontextmenu='top.gsEdit(window)'";
echo '>';
}else{
echo '<BODY class="BODYMESSAGE" style="margin:0px" onhelp="return false;" oncontextmenu="return false;" onselectstart="return false;">';
}
if( !isset($_PSOURCE) ) $_PSOURCE='';
if( $_POST['_REFRESH']!='' ){
qQuery('select '.$_POST['_REFRESH'].', nm_'.mb_substr($_POST['_REFRESH'],3).' from '.mb_substr($_POST['_REFRESH'],3).' order by nm_'.mb_substr($_POST['_REFRESH'],3));
echo "<TABLE INIT=0 id='{$_POST['_REFRESH']}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL id=o><COL>';
echo '<tr><td></td><td>&nbsp;</td></tr>';
while( $r=qRow() ) echo '<tr><td>'.trim($r[0]).'</td><td>'.trim($r[1]).'</td></tr>';
echo '</table>';
}
?>
<SCRIPT type="text/javascript">
var _Source=_DESDE_=_FCH_="<?= eQuote($OriFichero) ?>", _Obj='M', _Mode='<?= $Opcion ?>', _Accion = '<?= $SubOp ?>', _eCloseExe=false,
_PSOURCE='<?=$_PSOURCE?>',
_WOPENER=(window.frameElement!=null) ? window.frameElement.WOPENER : null,
_sgMsgOnClick=null, _sgOcultaRespuesta=null, _sgRecalcula=null, _sgFuncionEXE=null;
document.title = "Message";
<?PHP
echo 'var _DesdeLogin = '.((eSubstrCount($eAccion, 'L')>0) ? 'true;':'false;');
if( $sgMensage>0 && eSubstrCount($eAccion, 'V')==0 ){
?>_sgFuncionEXE = setTimeout(function(){
FuncionEXE();
}, <?=$sgMensage?> );<?PHP
}else{
echo '_sgFuncionEXE = null;';
}
if( $_POST['_REFRESH']!='' ){
echo "window.frameElement.WOPENER.CopySubSelect( Array('{$_POST['_REFRESH']}={$_POST['_REFRESH']}'), DGI(\"{$_POST['_REFRESH']}_TABLE\"), '' );";
if( $_eTexto=='D' ) echo "window.frameElement.WOPENER.ePF('{$_POST['_REFRESH']}','');";
}
?>
function eWOpen(sURL, sCondi, sMensa, sIframe){ try { top.eWOpen(sURL, sCondi, sMensa, sIframe); }catch(e){} }
function eAutoMenu(n){ if( window.name=='IWORK' ) top.eAutoMenu(n); }
function OcultaRespuesta(){
if( _sgMsgOnClick!=null ) clearTimeout(_sgMsgOnClick);
if( _sgOcultaRespuesta!=null ) clearTimeout(_sgOcultaRespuesta);
if( !top.eReadyState(window) ){
_sgOcultaRespuesta = setTimeout(function(){
OcultaRespuesta();
}, 250);
}else{
if( _sgFuncionEXE!=null ) clearTimeout(_sgFuncionEXE);
<?PHP
if( !empty($_TargetUrl) ){ ?>
S("#MESSAGE_OK, #MESSAGE_ERROR").none();
if( typeof(top._AplicationEDES)=="undefined" ){
top.frames["IWORK2"].frameElement.style.display = "none";
top.frames["IWORK"].frameElement.style.display = "block";
}
<?PHP }
if( $_AccionDIR!='' && eSubstrCount($_AccionDIR, '&_PASTE=1')==0 ) $_AccionDIR = $_AccionDIR.'&_PASTE=1';
if( $_SubModo=='l' ) echo 'return;';
if( $_WINCLOSE ){
if( !empty($_DBINSERT) && $_OkDBINSERT ){
$tmpFile = GrabaTmp(mb_strtolower($_gsObjeto).'_dbinsert', $_DBINSERT, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc );
unset($_DBINSERT);
}
?>
if( _DesdeLogin || top.eIsWindow(window) ){
try{
if( !_eCloseExe ) top.eSWClose(window);
_eCloseExe = true;
}catch(e){}
}else{
top.eLoading(true,window);
<?PHP  if( $_AccionDIR!='' && $_AccionDIR[0]!='?' ){ ?>
<?PHP
eContextPut($_AccionDIR);
?>
window.location.href = '<?=$_AccionDIR.eContextAddUrl().eSessionAddUrl()?>';
<?PHP  } ?>
}
<?PHP  }else{ ?>
top.eLoading(true,window);
<?PHP  if( $_AccionDIR!='' && $_AccionDIR[0]!='?' ){ ?>
<?PHP
eContextPut($_AccionDIR);
?>
window.location.href = '<?=$_AccionDIR.eContextAddUrl().eSessionAddUrl()?>';
<?PHP  } ?>
<?PHP  } ?>
<?PHP  if( eSubstrCount($eAccion, 'L')==1 ){ ?>
top.Terminar();
<?PHP  }else{ ?>
if( (_Accion=='mR' || _Accion=='bR') && _WOPENER._Obj=='L' && _WOPENER._SUBLISTADO_ ){
if( !_eCloseExe ) top.eSWClose(window);
_eCloseExe = true;
}
<?PHP  } ?>
}
}
function Continuar(){
switch( S.eventCode(event) ){
case 121: case 34: case 33: case 13: case 32:
OcultaRespuesta();
break;
}
return S.eventClear(window);
}
function gsClose(){
<?PHP  if( eSubstrCount($eAccion, 'V')>0 ){ ?>
return;
<?PHP  } ?>
<?PHP  if( eSubstrCount($eAccion, 'L')>0 ){ ?>
top.Terminar();
<?PHP  }else{ ?>
if( _DesdeLogin || top.eIsWindow(window) ){
if( !_eCloseExe ) top.eSWClose(window);
_eCloseExe = true;
}else if( window.name=='LOGIN' ) top.Terminar();
<?PHP  } ?>
}
<?PHP
if( !isset($_GET['_STOP']) && eSubstrCount($eAccion, 'V')==0 ) echo 'document.onkeydown = Continuar;';
if( $MsgOnClick!='' ){
echo 'function _msgOnClick(){';
echo 'if( _sgMsgOnClick!=null ) clearTimeout(_sgMsgOnClick);';
echo $MsgOnClick;
echo ";";
if( eSubstrCount($MsgOnClick, 'location.href')==0 && eSubstrCount($MsgOnClick, 'location.replace')==0 && eSubstrCount($MsgOnClick, 'eUrl(')==0 && eSubstrCount($MsgOnClick, 'eIWorkLocation(')==0 ){
echo 'OcultaRespuesta();';
}
echo '}';
$MsgOnClick = '_msgOnClick();';
if( $_Time>0 ){
?>
_sgMsgOnClick = setTimeout(function(){
_msgOnClick();
}, <?=((float)$_Time*1000)?>);
<?PHP
}
}
?>
</SCRIPT>
<?PHP
echo '<table id="RESPUESTA" style="display:table;background-color:transparent" WIDTH="100%" HEIGHT="100%" cellspacing=0px cellpadding=0px>';
echo '<tr><td align="center" valign="middle" style="background-color:transparent">';
if( $eTexto!="" ){
if( $BorrarRegISubList ){
?>
<script type="text/javascript">
try{
if( _WOPENER.name=='_ISUBLIST' ){
_WOPENER.BROWSE.deleteRow(_WOPENER._FilaLastInsert.rowIndex);
}else if( _WOPENER && _WOPENER._FilaLastInsert && S(".MENUFOOTLIST", _WOPENER).length ){
_WOPENER._FilaLastInsert.style.textDecoration = "line-through";
}
}catch(e){}
</script>
<?PHP
}
if( $_GET["_RECALCOPTIONSINLIST"]==1 ){
?>
<script type="text/javascript">
S(window).windowIcon("CLOSE", null, _WOPENER._RecalcOptionsInList);
</script>
<?PHP
}
echo "<table id={$ClaseError} cellspacing=0px cellpadding=0px><tr><td nowrap d='{$eAccion}'";
if( !isset($_GET['_STOP']) ){
if( $MsgOnClick!='' ){
echo " a=1 onclick='{$MsgOnClick}' style='cursor:var(--cPointer)'";
}else{
if( eSubstrCount(mb_strtoupper($_MSGANSWER), 'ONCLICK=')==0 && $eAccion=='' && !$EsperaF10 ){
echo " a=2 onclick='OcultaRespuesta();' style='cursor:var(--cPointer)'";
}else if( $eEXE!='' ){
echo " a=3 onclick='FuncionEXE();' style='cursor:var(--cPointer)'";
}else if( eSubstrCount($eAccion, 'S')>0 ){
echo " a=4 onclick='gsClose();' style='cursor:var(--cPointer)'";
}
}
}
echo ' id=ContenidoMensaje>';
if( mb_strlen($_MSGANSWER)>0 ){
if( $_MSG_=='' ){
while( eSubstrCount($_MSGANSWER,'{') > 0 && eSubstrCount($_MSGANSWER,'}') > 0 && eSubstrCount($_MSGANSWER,'{') == eSubstrCount($_MSGANSWER,'}') ){
$var = mb_substr( $_MSGANSWER, mb_strpos($_MSGANSWER,'{')+1, mb_strpos($_MSGANSWER,'}')-mb_strpos($_MSGANSWER,'{')-1 );
if( eSubstrCount($var, '[')>0 ){
$NomVar = mb_substr($var, 0, mb_strpos($var,'['));
$IndiceVar = mb_substr($var, mb_strpos($var,'['));
@eval('$x = $GLOBALS["'.$NomVar.'"]'.$IndiceVar.';');
$_MSGANSWER = str_replace('{'.$var.'}', $x, $_MSGANSWER);
}else{
$xvar = str_replace('$', '', $var);
$_MSGANSWER = str_replace('{'.$var.'}', $GLOBALS[$xvar], $_MSGANSWER);
}
}
}
echo $_MSGANSWER;
if( eSubstrCount(mb_strtoupper($_MSGANSWER), 'ONCLICK=')>0 ) $EsperaF10 = true;
}else{
echo $eTexto;
}
echo '</td></tr></table>';
}
if( $_HTMEND!='' ) _IncludeJsHtml($_HTMEND, "HTMEnd");
echo '</td></tr></table>';
echo '<SCRIPT type="text/javascript">';
echo 'S.loading(window, false);';
echo "if( window.frameElement.className=='ISubList' ){ _WOPENER.ISubListCargada(window); }";
if( isset($_GET['_FILEPDF']) && isset($_GET['_gs_formato_']) ){
?>
var Func = window.frameElement.eEXE;
window.frameElement.removeAttribute("eEXE");
Func();
</script>
</body></html>
<?PHP
eEnd();
}
?>
if( (window.frameElement.id=="ICALL" || window.name=="TLF" || document.body.offsetHeight==0) && S("#ContenidoMensaje").exists() ){
top.eInfo(_WOPENER, S("#ContenidoMensaje").html());
}
<?PHP
echo 'function FuncionEXE(){'.$__Enter;
echo "if( _sgMsgOnClick!=null ) clearTimeout(_sgMsgOnClick);";
echo "if( _sgOcultaRespuesta!=null ) clearTimeout(_sgOcultaRespuesta);";
echo "if( _sgRecalcula!=null ) clearTimeout(_sgRecalcula);";
echo 'if( _sgFuncionEXE!=null ) clearTimeout(_sgFuncionEXE);';
if( eSubstrCount($eAccion, 'V')>0 ) echo 'return;';
if( $eEXE[0]=='>' ){
include(eScript(mb_substr($eEXE, 1)));
}else{
echo 'if( window.name!="Mensaje" && window.name!="_SUBLISTADO" ){';
if( $eEXE==-1 ){
$eEXE = '';
if( $_AccionDIR!='' && eSubstrCount($_AccionDIR, '&_PASTE=1')==0 ) $_AccionDIR = $_AccionDIR.'&_PASTE=1';
if( $_AccionDIR!='' && $_AccionDIR[0]!='?' ){
eContextPut($_AccionDIR);
echo "window.location.href = '{$_AccionDIR}".eContextAddUrl().eSessionAddUrl()."';";
}
}
echo $eEXE;
if( isset($_FchXPg_) ){
echo 'if( window.name=="FichaAux" ){';
echo 'if( top.window.IWORK._UltimoReg ) top.DGI("zFichaAux").style.display="none";';
echo '}';
}
echo '}';
}
if( eSubstrCount($eAccion, 'C')>0 || eSubstrCount($eAccion, 'S')>0 ){
?>
try{
if( window.name=='LOGIN' || window.name=='Visor' ) top.eClearPag(top);
if( _DesdeLogin || top.eIsWindow(window) ){
<?PHP
if( !$HistoryGo ){
echo "if( !_eCloseExe ) top.eSWClose(window);";
}else{
echo "history.go(-1);";
}
?>
_eCloseExe = true;
}
}catch(e){}
top.S.eventClear(window);
<?PHP
}
echo '}';
if( eSubstrCount($eAccion, 'C')>0 ){
?>
if( FuncionEXE && top.eIsWindow(window) ){
_sgFuncionEXE = setTimeout('FuncionEXE();', <?=$sgMensage?>);
}
<?PHP
}
if( $_JSINCLUDEFILE!="" ){
include(eScript($_JSINCLUDEFILE));
}
echo '<'.'/SCRIPT>';
if( $_JSMESSAGE!='' ) _IncludeJsHtml($_JSMESSAGE, "JSMessage");
if( $_JSEND!='' ) _IncludeJsHtml($_JSEND, "JSEnd");
if( $_PHPEND!='' ){
$tmpFile = GrabaTmp('fg_phpend', $_PHPEND, $LenDoc, $_FILE_PHPEND);
$_PHPEND = '';
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
}
echo '<script type="text/javascript">';
if( isset($_CLOSE_) ){
?>
if( window.frameElement!=null && window.name!="IWORK" && window.name!="IWORK2" && window.name!="FichaAux" && (window.frameElement.eNORESIZE==undefined || !window.frameElement.eNORESIZE) ){
<?PHP if( $sgMensage>0 ){ ?>
setTimeout(function(){
if( !_eCloseExe ){
top.eSWClose(window);
}
_eCloseExe = true;
}, <?= $sgMensage ?>);
<?PHP } ?>
}
function Recalcula(){
try{
_WOPENER.eHideBusy();
}catch(e){}
if( document.body.scrollHeight>document.body.clientHeight || document.body.scrollWidth>document.body.clientWidth ){
document.body.scroll = 'auto';
var Alto = document.body.scrollHeight+30,
Ancho = document.body.scrollWidth+30;
top.eSWIResize(window, Ancho, Alto);
}
}
if( _DesdeLogin || top.eIsWindow(window) ){
if( !_DesdeLogin ) top.eSWLoadingHidden(window,false);
setTimeout('Recalcula()', 1000);
}
if( window.name=="IWORK2" ){
setTimeout(function(){
OcultaRespuesta();
}, 2000);
}
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
?>
if( window.name=='IWORK' || window.name=='IWORK2' ){
top.eLoading(false, window);
}else if( window.name=='_SUBLISTADO' ){
_WOPENER.DGI('_Div_SUBLISTADO').style.display = 'none';
var txt = S(document.body).css("filter")+"";
if( txt.indexOf('startcolorstr')>-1 && txt.indexOf('endcolorstr')>-1 ){
var iColor = txt.mb_substr(txt.indexOf('startcolorstr')+14,7),
fColor = txt.mb_substr(txt.indexOf('endcolorstr')+12,7);
parent.document.body.style.filter = txt.replace(fColor,iColor);
}
top.eLoading(0,window.parent);
}else{
if( S.windowIs(window) ) S.windowView(window);
}
<?PHP
if( eSubstrCount($eAccion, 'L')>0 ){
echo 'if(_sgFuncionEXE!=null) clearTimeout(_sgFuncionEXE);';
if( $sgMensage>0 ){
echo "setTimeout('top.eClearPag(top);', {$sgMensage});";
}
}
if( eSubstrCount($eAccion, 'C')>0 && $eEXE=='' ){
?>
if( window.name=="Visor" ) top.close();
if( window.frameElement!=null && window.name!="IWORK" && window.name!="IWORK2" && window.name!="FichaAux" && (window.frameElement.eNORESIZE==undefined || !window.frameElement.eNORESIZE) ){
if( !_eCloseExe ){
top.eSWClose(window);
}
_eCloseExe = true;
}
<?PHP
}
if( $_SubModo=='l' ){
?>
if( window.frameElement!=null && window.name!="IWORK" && window.name!="IWORK2" && window.name!="FichaAux" && window.name!="LOGIN" && window.name!="TLF" && (window.frameElement.eNORESIZE==undefined || !window.frameElement.eNORESIZE) ){
top.eSWIResize(window, document.body.scrollWidth+50, document.body.scrollHeight+50);
}
<?PHP
}else if( eSubstrCount($eAccion, 'X')>0 || eSubstrCount($eAccion, 'S')>0 ){
?>
if( window.name=="Visor" ){
if( _sgFuncionEXE=null ) clearTimeout(_SgMensa);
<?PHP
if( $sgMensage>0 ){
?>_SgMensa = setTimeout("top.close();", <?=$sgMensage?>);<?PHP
}else{
echo '_SgMensa = null;';
}
?>
}
if( window.frameElement!=null && window.name!="IWORK" && window.name!="IWORK2" && window.name!="FichaAux" && window.name!="LOGIN" && window.name!="TLF" && (window.frameElement.eNORESIZE==undefined || !window.frameElement.eNORESIZE) ){
if( _sgFuncionEXE=null ) clearTimeout(_sgFuncionEXE);
if( document.body.clientWidth<document.body.scrollWidth || document.body.clientHeight<document.body.scrollHeight ){
top.eSWIResize(window, document.body.scrollWidth+50, document.body.scrollHeight+50);
}
<?PHP
if( $sgMensage>0 ){
echo "_sgFuncionEXE = setTimeout('FuncionEXE();', {$sgMensage});";
}else{
echo '_sgFuncionEXE = null;';
}
?>
}
<?PHP
}
if( mb_strlen($_MSGANSWER)==0 && $eAccion=='' && !$EsperaF10 && eSubstrCount($eAccion, 'S')==0 ){
?>
<?PHP if( $eTexto=='' ){ ?>
<?=$ClaseError?>.style.display = 'none';
top.eInfo(window, '<?= $eTexto ?>', <?= $sgMensage/1000 ?>);
<?PHP } ?>
OcultaRespuesta();
<?PHP
}
if( isset($_GET['_EXECUTE']) ) echo "_WOPENER.{$_GET['_EXECUTE']}();";
echo 'try{document.body.focus();}catch(e){}';
?>
function Recalcula(){
try{
_WOPENER.eHideBusy();
}catch(e){}
if( document.body.scrollHeight>document.body.clientHeight || document.body.scrollWidth>document.body.clientWidth ){
document.body.scroll = 'auto';
var Alto = document.body.scrollHeight+30,
Ancho = document.body.scrollWidth+30;
top.eSWIResize(window, Ancho, Alto);
}
}
if( _DesdeLogin || top.eIsWindow(window) ){
if( !_DesdeLogin ) top.eSWLoadingHidden(window,false);
setTimeout('Recalcula()', 1000);
}
<?PHP
echo '</SCRIPT>';
echo '</BODY></HTML>';
eEnd();
}
?>