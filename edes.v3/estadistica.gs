<?PHP
eLngLoad(DIREDES.'lng/estadistica.gs', '', 1);
if( isset($_GET["extendSession"]) && $_GET["extendSession"]=="3" ){
SESS::$SessionMaxLife = time() + (25*60);
echo "S.exitMaxLife(".(SESS::$SessionMaxLife-date("U")-(10*60)).", S.lng(303));";
echo "clearInterval(S.session.exitInterval);";
echo 'if( S("#EXISTSG").exists() ) S("#EXISTSG").nodeRemove();';
echo 'S(".TOOLBAR").nodeRemove();';
echo "S('#ExtendSession').info(S.lng(374), 2);";
echo 'if( document.body.getAttribute("title")!=null ) document.title = document.body.getAttribute("title");';
eEnd();
}
if( isset($_GET["F"]) && $_GET["F"]=="toExpire" ){
$_SqlSysDiccionario = "";
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
if( $php_errormsg!='' ){
if( $_gsTron ) eTron("{$file}: {$php_errormsg}");
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
SESS::$share = [
'file'=>'share',
'driver'=>$_Sql,
'hostname'=>$_SqlHostName,
'database'=>$_SqlDiccionario,
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>$_SqlUsuario,
'password'=>$_SqlPassword,
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'isMultitenan'=>true,
'db_path'=>SESS::$share['db_path']
];
$_HndShared = qConnectSystem($_Sql, 'share');
if( !$_HndShared ) _MensajeJS("Mensaje('{$__Lng[144]}')");
if( SESS::$share['db_path']=='' ){
$tenan = trim($_POST[SESS::$_Path_]);
}else{
$tenan = SESS::$share['db_path'];
}
if( !preg_match('/^[A-ZÑÇÜa-zñçü0-9ºª€+&,/'.'áéíóúâêîôûàèìòùäëïöüãõÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ'.'"\' _\.\-]{1,45}$/u', $tenan) ){
_MensajeJS("Mensaje('{$__Lng[145]}')");
}
$_HndShared->qQuery("select * from {$_ENV['eDesDictionary']}gs_sharedb where (db_path=('{$tenan}'))");
$r = $_HndShared->qArray();
$_HndShared->qFree();
if( trim($r["db_path"])!=$tenan || $tenan=='' ){
if( SESS::$_PassError_>=3 ){
SESS::$_PassTime_ = (time()+(10*60));
_MensajeJS("Terminar('{$__Lng[146]}');");
}else{
SESS::$_PassError_++;
if( SESS::$share['isMultitenan'] && SESS::$share['db_path']=='' ){
_MensajeJS("Terminar('{$__Lng[147]}');");
}else{
_MensajeJS("Mensaje('{$__Lng[140]}');".$randomREM);
}
}
}
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
_MensajeJS("Mensaje('".str_replace("#", "dt_delete", $__Lng[148])."')");
}
foreach($r as $k=>$v) $r[$k] = trim($v);
SESS::$pk_login = $r["pk"];
SESS::$pk_share = $r["pk"];
SESS::$db_path  = $r["db_path"];
SESS::$sql = [
'file'=>'sql',
'driver'=>$_Sql,
'hostname'=>$r["db_hostname"],
'database'=>$r["db_dictionary"],
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>$r["db_user"],
'password'=>$r["dt_password"],
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'default'=>$_SqlDiccionario.'.',
'statistics'=>$_Estadistica
];
$buscar = '';
if( $_PedirEmpresa || !$_ENV[SETUP]['System']['Multitenancy'] ){
$buscar = 'g/logo_desktop.*';
SESS::$pk_login = glob('g/logo_desktop.*')[0];
}else if( SESS::$pk_login[0]=="g" ){
$buscar = SESS::$pk_login;
}else{
$buscar = 'g/logos/'.SESS::$pk_login.'_login.*';
SESS::$pk_login = glob('g/logos/'.SESS::$pk_login.'_login.*')[0];
}
if( SESS::$pk_login=='' ){
_MensajeJS("Mensaje('".str_replace("#", $buscar, $__Lng[149])."')");
}
}else{
eLoadVar();
if( !empty($php_errormsg) ){
if( $_gsTron ) eTron($file.': '.$php_errormsg);
_MensajeJS('Terminar("'.$file.': '.$php_errormsg.'")');
}
SESS::$sql = [
'file'=>'sql',
'driver'=>$_Sql,
'hostname'=>$_SqlHostName,
'database'=>$_SqlDiccionario,
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>$_SqlUsuario,
'password'=>$_SqlPassword,
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'default'=>'',
'statistics'=>$_Estadistica
];
}
if( !empty($_SqlSysDiccionario) ) $_SqlSysDiccionario .= ".";
S::qConnect();
$sql = "update {$_ENV['eDesDictionary']}gs_conexion set cdi_fin='".date('Y-m-d H:i:s')."' where conexion=".SESS::$_Connection_;
S::$handleSys->qQuery($sql);
if( SETUP::$System['ContextActivate'] ){
S::$handleSys->qQuery("delete from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_);
}
S::$handleSys->qEnd();
$file = "../_datos/config/exit".SESS::$_LANGUAGE_SUFFIX.".html";
if( !file_exists($file) ){
$file = "../_datos/config/exit_es.html";
}
if( file_exists($file) ){
include($file);
}else{
echo $__Lng["Aplicación cerrada"];
}
eSessionClose(13);
exit;
}
if( S::$_User==-1 ){
echo $__Lng["Sesión caducada"];
?>
<SCRIPT type="text/javascript">
try{
history.replaceState({foo:'bar'}, '-*-', location.origin+location.pathname);
}catch(e){}
</SCRIPT>
<?PHP
exit;
}
if( isset($_GET["F"]) && $_GET["F"]=="Login" ){
grabarSalirDeLaApp(false);
if( SETUP::$Desktop['ExitToLogin'] ){
echo "top._infoExitCancel=true; top.location.href='".SESS::$_DIRWEB."';";
}else{
$file = "../_datos/config/exit".SESS::$_LANGUAGE_SUFFIX.".html";
if( !file_exists($file) ){
$file = "../_datos/config/exit_es.html";
}
if( file_exists($file) ){
include($file);
}else{
echo $__Lng["Aplicación cerrada"];
}
}
eSessionClose(13);
qEnd();
exit;
}
if( isset($_GET["F"]) && $_GET["F"]=="InLogin" ){
grabarSalirDeLaApp(false);
eSessionClose(13);
qEnd();
exit;
}
if( isset($_GET["CacheIMG"]) && ((int)$_GET["CacheIMG"])>0 ){
$TamayoImg = $_GET["CacheIMG"];
$OkFile = array('GIF','PNG','JPG','JPEG');
$DirBase = 'g';
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir( "{$DirBase}/{$file}" ) ){
$NomFile = $DirBase.'/'.$file;
$Ext = explode('.',$file);
$Ext = mb_strtoupper($Ext[count($Ext)-1]);
if( in_array($Ext,$OkFile) && filesize($NomFile)<$TamayoImg ){
echo "<img src='{$NomFile}'>";
}
}
}
}
closedir( $di );
eEnd();
}
if( isset($_POST["PathLoad"]) ){
eTrace( 'Source..: '.$_POST["Source"] );
eTrace( 'PathLoad: '.$_POST["PathLoad"] );
eTrace( 'DefaultPathFile: '.$_POST["DefaultPathFile"] );
$_DefaultPathType = eFileGetVar('/_datos/config/sql.ini->$_DefaultPathType');
if( trim($_POST["DefaultPathFile"])!='' ){
$Source = '../_datos/usr/path_'.eStrtr(trim($_POST["DefaultPathFile"]), '$/', '__').'.'.S::$_User;
}else if( mb_strtoupper($_DefaultPathType)==$_ENV['ON'] ){
$Source = '../_datos/usr/path_'.eStrtr($_POST["Source"], '$/', '__').'.'.S::$_User;
}else{
$Source = '../_datos/usr/path.'.S::$_User;
}
include_once($Source);
$txt = '<'.'?PHP'."\n".'$PathLoad="'.$_POST["PathLoad"].'";'."\n".'$PathSave="'.$PathSave.'";'."\n?>";
file_put_contents($Source,$txt);
echo '<SCRIPT type="text/javascript">top.eInfo(window, S.lng(223));</SCRIPT>';
eEnd();
}
if( $_GET["CargaHTM"]=='1' ){
CargaHtmlSeguridad();
eEnd();
}
if( empty($_SERVER['QUERY_STRING']) ) exit;
if( isset($_GET["YES"]) ){
SESS::$_SP_ = 'production';
echo '<SCRIPT type="text/javascript">top.eInfo(window,"'.$__Lng["ACTIVADA Ejecución en DDBB de Procesos"].'",-1);</SCRIPT>';
eEnd();
}
if( isset($_GET["NO"]) ){
if( !empty(SESS::$_SP_) ){
SESS::$_SP_ = "";
echo '<SCRIPT type="text/javascript">top.eInfo(window,"'.$__Lng["DESACTIVADA Ejecución en DDBB de Procesos"].'");</SCRIPT>';
}
eEnd();
}
if( isset($_GET["SESION"]) ){
$tmp = explode(',', $_POST['NOEXTENSION']);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]!='' ){
if( $tmp[$n][0]=='_' ){
SESS::${$tmp[$n]} = '';
}else{
SESS::${'_'.$tmp[$n].'_'} = '';
}
if( $tmp[$n]=='PDF' || $tmp[$n]=='_PDF_' ) SESS::$_notools_ .= 'p';
}
}
clearstatcache();
eEnd();
}
if( isset($_GET["Loading"]) ){
eHTML('$estadistica.gs');
?>
<LINK REL='stylesheet' HREF='<?=$_PathCSS?>/ficha.css' TYPE='text/css'>
</HEAD>
<BODY onhelp="return false" oncontextmenu="return false" onclick="window.external.eWebToBack(<?=$_GET['IdWeb']?>)">
<table style='width:100%;height:100%;background-color:transparent'><tr><td valign=middle align=center style='background-color:transparent'>
<?PHP
$_FileLoading = 'g/loading_d5_1.gif';
if( $_FileLoading!='' ){
if( mb_substr($_FileLoading,0,2)=='g/' ){
$_FileLoading = $_PathIMG.mb_substr($_FileLoading,1);
}
}
echo "<img src='{$_FileLoading}'>";
echo '</td></tr></table>';
echo '</BODY>';
echo '</HTML>';
eEnd();
}
if( isset($_GET["SWOPENCSS"]) ){
include('../_datos/config/empty_page.htm');
?>
<script type="text/javascript">
top.S.edes(window);
var _Source = 'SWOPENCSS<?=$_GET['TIPO']?>';
window.frameElement.onactivate = function anonymous(){ return false; }
top.eSWSetStatus( window, 'TEXT' );
var Obj = window.frameElement.id.replace('swI_','swV_');
try{
top.DGI(Obj).setAttribute( 'NoChangeClass', true );
}catch(e){}
setTimeout('top.eSWResize(window,250,200);top.eSWFocus(window.frameElement.WOPENER);',500);
function LoadingView(){
var Obj = window.frameElement.id.replace('swI_','swV_');
var el = S("IMG",Obj).dim;
for( var n=0; n<el.length; n++ ) if( el[n].src.indexOf('swloading.gif')>-1 ){
el[n].parentNode.style.display = 'block';
break;
}
}
function PonColor(){
var Obj = window.frameElement.id.replace('swI_','swV_');
top.DGI(Obj).className = top.DGI(Obj).className.replace('SWOpenON','SWOpenOFF');
}
<?PHP
if( $_GET['TIPO']=='WOFF' ) echo 'setTimeout("PonColor()",1000);';
echo 'setTimeout("LoadingView()",1100);';
echo '</SCRIPT>';
eEnd();
}
if( isset($_GET["Cookies"]) ){
?>
<script type="text/javascript">
var txt = document.cookie.replace(/=/g,' = ').replace(/; /g,"\n");
top.eAlert('<?=$__Lng["LISTADO DE COOKIES"]?>', txt.replace(/\|/g,"\n"), 'A', 'I');
</script>
<?PHP
eEnd();
}
if( isset($_GET["LOPD"]) ){
$Campo = 'dt_confidential';
qQuery("select {$Campo} from {$_ENV['eDesDictionary']}gs_user where cd_gs_user='".S::$_User."'");
list($Fecha) = qRow();
$File = '';
if( file_exists( '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.pdf' ) ){
$File = '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.pdf';
}else if( file_exists( '../_datos/config/docsecurity.pdf' ) ){
$File = '../_datos/config/docsecurity.pdf';
}
if( $File<>'' ){
?>
<style>
BODY {
margin:0px;
padding:0px;
scroll:no;
overflow:hidden;
}
</style>
<TABLE border=0px width=100% height=100% cellspacing=0px cellpadding=0px>
<TR height=100%>
<TD align=center>
<embed src='edes.php?R:<?=$File?>#toolbar=0&navpanes=0&scrollbar=1' width='100%' height='100%' style='border-bottom:1 solid #000000'>
<TR height=1>
<TD rowspan=2 align=center style='padding-top:5px'>
Leido y aceptado el día: <?=eDataFormat($Fecha,"F4")?>
</TABLE>
<?PHP
}else{
$File = '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.htm';
readFile($File);
echo '<br><center>';
echo str_replace("#", eDataFormat($Fecha,"F4"), $__Lng["Leido y aceptado el día #"]);
echo '</center>';
}
echo '<script type="text/javascript">top.eLoading(0,window); if( top.eIsWindow(window) ){ top.eSWResize(window); top.eSWView(window); }</script>';
eEnd();
}
if( qCount("{$_ENV['eDesDictionary']}gs_conexion", "conexion='".SESS::$_Connection_."'")>0 ){
grabarSalirDeLaApp(true);
}else if( $_GET["F"]=="1" && ($_SERVER["QUERY_STRING"]=="F=1" || mb_substr($_SERVER["QUERY_STRING"],0,4)=="F=1&") ){
?>
<script type="text/javascript">
top.document.write(
"<"+`script>function pedirLogin(){top.location.href = '<?=SESS::$_DIRWEB?>';} top.document.body.style.padding = '20px'; top.document.body.innerHTML = "<?=$__Lng["Aplicación cerrada"]?><br><br><span onclick='pedirLogin()' style='cursor:var(--cPointer)'>Login</span>";<`+"/script>"
);
</script>
<?PHP
eSessionClose(14);
qEnd();
exit;
}
if( ( SESS::$_Development || SESS::$_D_!='' ) && isset($C) ){
?>
<!DOCTYPE HTML><HTML>
<HEAD>
<script type="text/javascript">
<?PHP
gsAvisos();
?>
if( top.DGI('SgCarga')!=null ){
top.DGI('SgCarga').title = top.DGI('SgCarga').title +' / <?= SESS::$_Connection_; ?>';
}
<?PHP
?>
setTimeout('location.href="about:blank"',100);
</SCRIPT>
</HEAD>
<BODY></BODY>
</HTML>
<?PHP
}
eEnd();
function _SortNormal($a,$b){
$_SortNumCol = 0;
$_SortOrderUp = true;
if( $_SortOrderUp ){
return( $a[$_SortNumCol] <= $b[$_SortNumCol] );
}else{
return( $a[$_SortNumCol] > $b[$_SortNumCol] );
}
}
function _QSortMultiArray( &$array ){
usort( $array, '_SortNormal');
}
function CargaHtmlSeguridad(){
$txt = file_get_contents('../_datos/config/docsecurity_es.htm');
$txt = mb_substr( $txt, mb_strpos(mb_strtoupper($txt),'<BODY') );
$txt = mb_substr( $txt, mb_strpos($txt,'>')+1 );
$txt = mb_substr( $txt, 0, mb_strpos(mb_strtoupper($txt),'</BODY>') );
$txt = str_replace('"','&#34;',$txt);
$txt = str_replace(CHR10,'',$txt);
$txt = str_replace(CHR13,'',$txt);
?>
<script type="text/javascript">
var Obj = window.frameElement.WOPENER;
Obj.DGI('DOCHTML').innerHTML = "<?=$txt?>";
</script>
<?PHP
}
function grabarSalirDeLaApp($conJS){
global $__Lng;
if( isset($_GET['C']) ){
$C = $_GET['C'];
sql_Modifica("{$_ENV['eDesDictionary']}gs_conexion", "sg_carga='{$C}'", "conexion='".SESS::$_Connection_."'" );
}
if( isset($_GET['F']) ){
if( isset($_POST['UOP']) ){
}
if( isset($_POST['LM']) ){
$FrecuntyOptions = '';
$xMenu = trim($_POST['FO']);
if( $xMenu!='' ){
$tmp = explode(';', $xMenu);
$_RecentOptions = eFileGetVar("Desktop.RecentOptions");
$MaxOp = $_RecentOptions;
$DimOp = array();
for($n=1; $n<count($tmp); $n++) $DimOp[] = explode(',',$tmp[$n]);
_QSortMultiArray( $DimOp );
$txt = '';
for( $n=0; $n<count($DimOp) && $n<$MaxOp; $n++ ) if( $DimOp[$n][0]>0 ) $txt .= $DimOp[$n][0].','.$DimOp[$n][1]."\n";
$FrecuntyOptions = ">FO:\n".$txt;
}
$LastMenu = '>LM:'.trim($_POST['LM']);
$TabFixed = '>TF:'.trim($_POST['TF']);
$txt = $LastMenu."\n".$TabFixed."\n".$FrecuntyOptions;
file_put_contents( "../_datos/usr/fo.".S::$_User, $txt );
}
if( SESS::$_D_!='' && SESS::$_gsACCESO['LOGEAR']==1 ){
gsLogear('FW', 'E', '');
}
if( SESS::$_Connection_>0 ){
if( SESS::$sql['statistics'] ){
$_SAVETRACE = true;
Estadistica('EXT', 0);
}
sql_Modifica("{$_ENV['eDesDictionary']}gs_conexion", "cdi_fin='".date('Y-m-d H:i:s')."'", "conexion=".SESS::$_Connection_);
if( SETUP::$System['ContextActivate'] ){
S::qQuery("delete from {$_ENV['eDesDictionary']}gs_context where cd_gs_conexion=".SESS::$_Connection_);
}
eSessionClose(15);
}
qEnd();
@unlink("../_tmp/sess/".$_GET['_SESS_']);
@unlink("../_tmp/sess/".$_GET['_SESS_'].".seed");
if( !$conJS ){
return;
}
if( isset($_GET['JS']) && $_GET['JS']==1 ){
$file = "../_datos/config/exit".SESS::$_LANGUAGE_SUFFIX.".html";
if( !file_exists($file) ){
$file = "../_datos/config/exit_es.html";
}
if( file_exists($file) ){
include($file);
}else{
?>
try{
history.replaceState({foo:'bar'}, '-*-', location.origin+location.pathname);
}catch(e){}
document.write("<?=$__Lng["Aplicación cerrada"]?>");
<?PHP
}
}else{
$file = "../_datos/config/exit".SESS::$_LANGUAGE_SUFFIX.".html";
if( !file_exists($file) ){
$file = "../_datos/config/exit_es.html";
}
if( file_exists($file) ){
include($file);
}else{
echo $__Lng["Aplicación cerrada"];
}
?>
<SCRIPT type="text/javascript">
try{
history.replaceState({foo:'bar'}, '-*-', location.origin+location.pathname);
}catch(e){}
</SCRIPT>
<?PHP
}
exit;
}
}
?>