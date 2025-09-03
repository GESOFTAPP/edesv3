<?PHP
if( S::$_User==-1 || $_gsID != getmypid() ) exit;
if( $_GET['Desktop']=='' ) exit;
$_TreeFromOp = $_GET['Desktop'];
eLngLoad(DIREDES.'lng/desktop', '', 1);
$php_errormsg = '';
include( $Dir_.'message.inc' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
die( eTrace('message.ini: '.$php_errormsg) );
}
include( $Dir_.$_Sql.'.inc' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron($_Sql.'.ini: '.$php_errormsg);
die( eTrace($_Sql.'.ini: '.$php_errormsg) );
}
include( '../_datos/config/desktop.ini' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('desktop.ini: '.$php_errormsg);
die( eTrace('desktop.ini: '.$php_errormsg) );
}
if( file_exists("../_datos/usr/{$xUsuario}") ){
}
if( file_exists( '../_tmp/err/stop.access' ) ){
}
qQuery("select * from {$_ENV['eDesDictionary']}gs_user where cd_gs_user=".S::$_User);
$row = qArray();
$_aUser = $row;
$_Node = $row['cd_gs_node'];
$_User = $row['cd_gs_user'];
if( !isset($row['user_surname']) ) $row['user_surname']='';
$_usuNombre = mb_strtoupper(trim($row['user_name']).' '.trim($row['user_surname']));
$_userLP = trim($row['email']);
$_UserLogin = $_userLP;
$_userName = str_replace(' ','',mb_strtoupper(trim($row['user_name'])));
$_DesktopType = ( ($row['desktop_type']!=-1) ? $row['desktop_type'] : $_DesktopType );
$row['cd_gs_tree'] = 0;
$_Util = array();
$_Util['warnings'] = '';
$_Util['news'] = $_ENV['ON'];
$_Util['dt_access_last'] = $row['dt_access_last'];
$_Util['system_user'] = $row['system_user'];
$_Util['task_status'] = $row['task_status'];
$_Util['view_desktop'] = $row['view_desktop'];
$_Util['view_desktop_with'] = ((qCount('gs_user',"view_desktop='{$_ENV['ON']}'") > 0) ? $_ENV['ON']:'');
$_Util['email'] = trim($row['email']);
$_Util['username'] = trim($row['user_name']).' '.trim($row['user_surname']);
if( trim($row['cd_gs_language'])!='' ){
SESS::$_LANGUAGE_ = trim($row['cd_gs_language']);
}
$_AllLanguages = qCount("{$_ENV['eDesDictionary']}gs_language", "tf_translation='{$_ENV['ON']}'");
eLngLoad(DIREDES.'lng/desktop', SESS::$_LANGUAGE_, 1);
if( !isset($row['pc_with_id']) ) $row['pc_with_id']='';
if( !isset($row['ip_from']) ) $row['ip_from']='';
if( !isset($row['ip_to']) ) $row['ip_to']='';
if( !isset($row['ip2']) ) $row['ip2']='';
if( !isset($row['ip']) ) $row['ip']='';
if( !isset($row['log_user']) ) $row['log_user']='';
if( !isset($row['log_history']) ) $row['log_history']='';
$_novedades_ = trim($row['ys_news']);
if( SETUP::$System['ReportsNews'] ){
if( $_novedades_=='' ) $_novedades_ = '2005-05-18 00:00:00';
}else{
$_novedades_ = '';
}
$_HaceUnMes = date('Y-m-d H:i:s', mktime( date('H'),date('i'),date('s'), date('m')-1, date('d'), date('Y')));
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
if( SETUP::$Desktop['DesktopTreeType']=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}
if( $_TypeTree=='P' ){
}else{
eMessage($__Lng[52], 'HELS', 10);
}
if( trim($_UserTree)=='' ) eMessage(' ['.$_UserTree.']['.$_TypeTree.']', 'HELS', 10);
$_Tree = 0;
$_TreeList = '';
qQuery("select cd_gs_tree from {$_ENV['eDesDictionary']}gs_user_tree where cd_gs_user=".$row['cd_gs_user']);
while( $r=qRow() ){
if( $_TreeList!='' ) $_TreeList .= ',';
$_TreeList .= $r[0];
}
}
$Hoy = date('Y-m-d');
$_gsMaster = SESS::$_D_;
$_D_ = $_gsMaster;
$_L_ = '';
if( $_gsMaster!='' ){
$_PSDV = $_gsMaster;
$_gsMaster = LeerLP( ((!isset($_userLPDesa)) ? $_userLP : $_userLPDesa ), $_gsMaster, $_gsNomUser, trim($row['email']) );
if( $_gsMaster != '' ){
$sExt = str_replace(' ','',mb_strtoupper(trim($row['user_name'])));
if( file_exists( '../tree/__personal.'.$sExt ) ){
@rename( '../tree/__personal.'.$sExt, '../tree/__personal.'.str_replace(' ','',mb_strtolower($_gsNomUser)) );
}
unset($sExt);
if( SESS::$_gsACCESO['LOGEAR'] ){
gsLogear( 'FW', 'S', '' );
}
}
if( isset($_GsEdit) && !$_GsEdit ) SESS::$_gsACCESO['Edit'] = 0;
if( isset($_eDesDevelopment) && !$_eDesDevelopment ){
unset(SESS::$_gsACCESO);
$_gsMaster = '';
}
}else{
$_PSDV = '';
$_gsMaster = '';
}
if( isset($xClaveDesa) ) unset($xClaveDesa);
if( isset($_userLPDesa) ) unset($_userLPDesa);
if( SESS::$_Development && $_gsMaster=='' && file_exists('../_d_/cfg/permission.ini') ){
if( !in_array( $row['cd_gs_user'], explode(',',str_replace(' ','',file_get_contents('../_d_/cfg/permission.ini'))) ) ) eMessage( $__Lng[53], 'HELS', 10 );
}
$_Util['print'] = (SESS::$print_tab==$_ENV['ON'] || SESS::$print_list==$_ENV['ON'] || SESS::$print_report==$_ENV['ON']) ? $_ENV['ON'] : $_ENV['OFF'];
if( filesize('../_datos/config/session.ini') > 25 ){
include( '../_datos/config/session.ini' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('session.ini: '.$php_errormsg);
die( eTrace('session.ini: '.$php_errormsg) );
}
}
function eAddSelect( $oCampo, $oCampoLen, $oCampoPx, $Valor, $OnChange ){
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" style='display:none' ALTO=1>";
if( $OnChange!='' ){
${$OnChange} = str_replace( "'", '"', ${$OnChange} );
$OnChange = " onchange='{$OnChange}'";
}
echo "<INPUT NAME='_INPUT_{$oCampo}' IND=-1 TMPIND=-1{$OnChange}";
echo " onmousewheel='_SelSlider()' onfocusin='_SelMemValue(this)' onfocusout='_SelPutValue(this)' onkeypress='_SelNewChar(this)' onkeydown='_SelDelChar(this)' onclick='_SelShow(this)'";
echo " style='background-image:url(g/sel.gif); background-position-x:100%; background-position-y:100%; background-repeat:no-repeat; cursor:var(--cPointer);'";
if( $oCampoPx > 0 ) echo " style='width:{$oCampoPx};'";
echo " TYPE='TEXT' SIZE={$oCampoLen} MAXLENGTH={$oCampoLen} VALUE=''>";
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='this.style.display=\"none\"' id=Select class='SELECT EDITABLE'>";
echo "<TABLE INIT=0 id='{$oCampo}_TABLE' width=1 onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL style="display:none"><COL>';
echo '<TR><TD><TD>&nbsp;';
$textContent = '';
while( $row=qArray() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
if( $Valor == trim($row[0]) ) $textContent = trim($row[1]);
}
echo '</TABLE></DIV>';
if( $textContent!='' ) echo "\n<script type='text/javascript'>DGI('{$oCampo}').value=".'"'.$Valor.'";'."DGI('_INPUT_{$oCampo}').value=".'"'.$textContent.'";</script>';
}
function _HayAddSelect(){
$Fichero = '../_datos/config/desktop_user.ini';
$fd = fopen( $Fichero, 'r' );
$txt = fread( $fd, filesize($Fichero) );
fclose($fd);
return( eSubstrCount( $txt, 'eAddSelect(' ) > 0 || eSubstrCount( $txt, 'eAddSelect (' ) > 0 );
}
$_HayAddSelect = _HayAddSelect();
if( !isset(SESS::$_Development) ) SESS::$_Development = false;
if( !isset($_Test) ) $_Test = false;
if( !isset($_ErrImg) ) $_ErrImg = false;
if( SESS::$_Desktop==4 ){
include( '../_datos/config/desktop.php' );
}else if( SESS::$_Desktop==2 || SESS::$_Desktop==3 ){
include( $Dir_.'main2.gs' );
}else if( SESS::$_Desktop==0 || SESS::$_Desktop==1 ){
include( $Dir_.'main.gs' );
}else if( SESS::$_Desktop==5 ){
include( $Dir_."desktop{$_DesktopType}.php" );
}else{
include( "../_datos/config/desktop{$_DesktopType}.php" );
}
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
die( eTrace('message.ini: '.$php_errormsg) );
}
eEnd();
function _LngLoad( $File ){
$tmp = file( $File.'.lng' );
list(,$Lngs) = explode(']',$tmp[0]);
list($Lngs) = explode('|',$Lngs);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==SESS::$_LANGUAGE_ ){
$uCol = $i+1;
}
if( $tmp4[$i]==SESS::$_LanguageDefault ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode('|',$tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"','&quot;',trim($txt));
$k = $k*1;
$mk = max( $mk, $k );
$Dim[$k] = $v;
}
$txt = ''; for( $n=0; $n<$mk+1; $n++ ) $txt .= $Dim[$n].'|';
return $txt;
}
function _GetEmptyPage(){
$Leer = true;
$Dim = file('../_datos/config/empty_page.htm');
$PagVacia = '';
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( eSubstrCount(mb_strtoupper($Dim[$i]),'<'.'/SCRIPT>')>0 && eSubstrCount(mb_strtoupper($Dim[$i]),'<SCRIPT')>0 ){
continue;
}else if( mb_strtoupper($Dim[$i])=='<'.'/SCRIPT>' || mb_strtoupper(mb_substr($Dim[$i],0,7))=='<SCRIPT' ){
$Leer = !$Leer;
continue;
}
if( $Leer ) $PagVacia .= $Dim[$i];
}
return $PagVacia;
}
function eAddMenuOption( $Label, $HR='', $Icon='', $Title='', $Activo=true ){
if( SESS::$_DesktopType == 2 || SESS::$_DesktopType == 3 ){
if( $Label=='-' ){
echo '<TR><TD class=Linea colspan=3>';
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ) $Icon = "<img src='{$Icon}'>";
if( $Title!='' ) $Title = " title='{$Title}'";
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<TR{$HR}{$Title}{$Activo}><TD>{$Icon}<TD>{$Label}<TD>";
}
}else if( SESS::$_DesktopType < 2 ){
if( $Label=='-' ){
echo "<tr id=o><td id=2 LIN=1 style='font-size:1px;vertical-align:middle;' HR=''><IMG SRC='g/linea.gif' width=100% height=1>";
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ){
$Icon = "<img src='{$Icon}'>";
}else{
$Icon = "<IMG SRC='g/doc_0.gif'>";
}
if( $Title!='' ){
$Title = str_replace( '&#92;n', CHR10, $Title );
$Title = " title='{$Title}'";
}
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<tr id=o{$Title}><td id=2 {$HR}>{$Icon}{$Label}";
}
}
}
?>